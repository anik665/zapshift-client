import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { PiMagnifyingGlassPlus } from "react-icons/pi";
import Swal from "sweetalert2";
import { Link } from "react-router";

const My_Parcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcel = [], refetch } = useQuery({
    queryKey: ["my-parcel", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel?email=${user.email}`);
      return res.data;
    },

    enabled: !!user?.email,
  });

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Your parcel  has been deleted.",
              icon: "success",
            });
          }
        });

      //
    });
  };

  return (
    <div>
      <h1 className="text-center font-bold">
        My Parcels length is {parcel.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcel.map((p, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{p.parcelName}</td>
                <td>{p.cost}</td>
                <td>{p.createdAt}</td>
                <td>
                  {p.paymentStatuse === "paid" ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <Link to={`/dashbord/payment${p._id}`}>Pay</Link>
                  )}
                </td>
                <td>
                  <button className="btn btn-square hover:bg-primary ">
                    <FiEdit />
                  </button>
                  <button
                    className="btn btn-square hover:bg-primary mx-2 "
                    onClick={() => handelDelete(p._id)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                  <button className="btn btn-square hover:bg-primary ">
                    <PiMagnifyingGlassPlus />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default My_Parcel;
