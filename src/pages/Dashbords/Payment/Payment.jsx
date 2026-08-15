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
    };

    console.log("Payment Info:", paymentInfo);

    const res = await axiosSecure.post("/create-checkout-session", {
      paymentInfo,
    });

    console.log("Stripe Response:", res.data);

    // Stripe checkout page-এ যাওয়ার জন্য
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Parcel Data:", data);

  return (
    <div>
      <h2>Payment Details</h2>

      <p>Parcel Name: {data?.parcelName}</p>
      <p>Cost: ৳{data?.cost}</p>

      <button className="bg-primary text-black btn " onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
