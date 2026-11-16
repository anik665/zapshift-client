import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan, FaUserCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

const AppropeRiders = () => {
  const axioscecure = useAxiosSecure();

  const { data: riders } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axioscecure.get("/rider");

      return res.data;
    },
  });
  const handleApprove = (id) => {
    console.log("approve the user", id);

    const updateInfo = {
      status: "approved",
    };
    axioscecure.patch(`/rider/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Rider Approved",
          text: "The rider has been approved successfully.",
        });
      }
    });
  };
  const handleReject = (id) => {
    console.log("reject the user", id);
    const updateInfo = {
      status: "rejected",
    };
    axioscecure.patch(`/rider/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Rider Rejected",
          text: "The rider has been rejected successfully.",
        });
      }
    });
  };

  return (
    <>
      <div>
        <h1 className=" text-5xl "> Approve Riders</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders?.map((res, index) => (
              <tr key={res._id}>
                <td>{index + 1}</td>
                <td>{res.riderName}</td>
                <td>{res.riderEmail}</td>
                <td>{res.riderDistrict}</td>

                <td>
                  <p
                    className={`badge ${res.status === "approved" ? "badge-success" : res.status === "rejected" ? "badge-error" : "badge-warning"}`}
                  >
                    {res.status}
                  </p>
                </td>
                <td>
                  <button
                    className="btn "
                    onClick={() => handleApprove(res._id)}
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    className="btn "
                    onClick={() => handleReject(res._id)}
                  >
                    <IoPersonRemoveSharp />
                  </button>{" "}
                  <button className="btn ">
                    <FaTrashCan />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppropeRiders;
