import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { ParcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["parcel", ParcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${ParcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: data?.cost,
      parcelName: data?.parcelName,
      senderEmail: data?.senderEmail,
      parcelId: data?._id,
      recipientName: data?.receiverName,
      recipientPhone: data?.receiverPhone,
      recipientAddress: data?.receiverAddress,
    };

    console.log("Payment Info:", paymentInfo);

    const res = await axiosSecure.post("/payment-cheakout-session", {
      paymentInfo,
    });

    console.log("Stripe Response:", res.data);

    if (res.data?.url) {
      window.location.href = res.data.url;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Payment Details</h2>
      <p>Parcel Name: {data?.parcelName}</p>
      <p>Cost: ৳{data?.cost}</p>

      <button
        className={
          data?.paymentStatus === "paid"
            ? "bg-primary text-black btn"
            : "bg-gray-500 text-white btn"
        }
        onClick={handlePayment}
        disabled={data?.paymentStatus === "paid"}
      >
        {data?.paymentStatus === "paid" ? "Paid" : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
