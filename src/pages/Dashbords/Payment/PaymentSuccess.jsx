import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setPaymentStatus({
              transactionId: res.data.transactionId,
              trackingId: res.data.trackingId,
            });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [sessionId]); // axiosSecure-কে dependency array থেকে সরিয়ে নিন

  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl text-green-500 font-bold mb-4">
        The payment is successful
      </h1>
      <p className="text-lg">Transaction ID: {paymentStatus.transactionId}</p>
      <p className="text-lg">Tracking ID: {paymentStatus.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
