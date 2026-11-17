import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan, FaUserCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiossecure = useAxiosSecure();

  const { refetch, data: riders } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiossecure.get("/rider");
      return res.data;
    },
  });

  // Unified function to handle both approve and reject status updates with email
  const handleUpdateStatus = (id, status, email) => {
    const actionText = status === "approved" ? "approved" : "rejected";

    const updateInfo = {
      status: status,
      email: email, // Passing email along with status
    };

    axiossecure.patch(`/rider/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch(); // Refresh the riders list
        Swal.fire({
          icon: "success",
          title: `Rider ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
          text: `The rider has been ${actionText} successfully.`,
        });
      }
    });
  };

  const handleDelete = (id) => {
    // Add delete logic here if needed
    console.log("delete rider", id);
  };

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold mb-6">Approve Riders</h1>
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
            {riders?.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderDistrict}</td>

                <td>
                  <p
                    className={`badge ${
                      rider.status === "approved"
                        ? "badge-success"
                        : rider.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {rider.status || "pending"}
                  </p>
                </td>
                <td className="space-x-2">
                  {/* Approve Button */}
                  <button
                    className="btn btn-sm btn-success text-white"
                    onClick={() =>
                      handleUpdateStatus(
                        rider._id,
                        "approved",
                        rider.riderEmail,
                      )
                    }
                    title="Approve Rider"
                  >
                    <FaUserCheck />
                  </button>

                  {/* Reject Button */}
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() =>
                      handleUpdateStatus(
                        rider._id,
                        "rejected",
                        rider.riderEmail,
                      )
                    }
                    title="Reject Rider"
                  >
                    <IoPersonRemoveSharp />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-ghost text-red-500"
                    onClick={() => handleDelete(rider._id)}
                    title="Delete Rider"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApproveRiders;
