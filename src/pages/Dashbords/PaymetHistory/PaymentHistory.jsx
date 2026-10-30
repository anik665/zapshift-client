import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  console.log(user.email);
  const axiosSecure = useAxiosSecure();
  const { data: payment = [] } = useQuery({
    queryKey: ["payment-history", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`,
      );
      return res.data;
    },
  });
  console.log(payment);

  return (
    <div>
      <h2 className=" p-4 text-5xl font-extrabold text-secondary">
        Payment History
      </h2>
      <h3 className="text-lg font-semibold">Payment Details</h3>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Parcel Info</th>
              <th>Recipent Info</th>
              <th>Tracking id</th>
              <th>Payment Info</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.parcelName}</td>
                <td>{item.recipientName}</td>
                <td>{item.trackingId}</td>
                <td>{item.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
