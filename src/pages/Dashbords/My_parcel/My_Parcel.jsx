import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const My_Parcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcel = [] } = useQuery({
    queryKey: ["my-parcel", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel?email=${user.email}`);
      return res.data;
    },

    // user-এর email পাওয়া না পর্যন্ত API call করবে না
    enabled: !!user?.email,
  });

  return (
    <div>
      <h1 className="text-center font-bold">
        My Parcels length is {parcel.length}
      </h1>
    </div>
  );
};

export default My_Parcel;
