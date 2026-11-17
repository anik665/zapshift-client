import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Paid parcels without a rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["unassigned-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/unassigned");
      return res.data;
    },
  });

  // Approved riders of the parcel's district (only fetched when modal is open)
  const district = selectedParcel?.senderDistrict;
  console.log(district, "district");

  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["approved-riders", district],
    enabled: !!selectedParcel && !!district,
    queryFn: async () => {
      const res = await axiosSecure.get("/rider", {
        params: { status: "approved", district },
      });
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: ({ parcelId, rider }) =>
      axiosSecure.patch(`/parcel/${parcelId}/assign`, {
        riderId: rider._id,
        riderName: rider.riderName,
        riderEmail: rider.riderEmail,
      }),
    onSuccess: (res, { rider }) => {
      if (res.data.modifiedCount > 0) {
        queryClient.invalidateQueries({ queryKey: ["unassigned-parcels"] });
        setSelectedParcel(null);
        Swal.fire({
          icon: "success",
          title: "Rider Assigned",
          text: `${rider.riderName} will deliver this parcel.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Not updated",
          text: "This parcel may already have a rider.",
        });
      }
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleAssign = (rider) => {
    Swal.fire({
      title: "Assign this rider?",
      text: `${rider.riderName} (${rider.riderEmail})`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      confirmButtonText: "Yes, assign",
    }).then((result) => {
      if (result.isConfirmed) {
        assignMutation.mutate({ parcelId: selectedParcel._id, rider });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-sm">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Assign Rider</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Paid parcels waiting for a rider: {parcels.length}
        </p>
      </div>

      <div className="overflow-x-auto border border-base-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Parcel</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-base-content/60"
                >
                  No parcels waiting for a rider.
                </td>
              </tr>
            ) : (
              parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-mono text-xs">
                    {parcel.trackingId || "-"}
                  </td>
                  <td className="font-semibold">{parcel.parcelName || "-"}</td>
                  <td className="text-sm">{parcel.senderEmail}</td>
                  <td className="text-sm">
                    {parcel.receiverName || parcel.recipientName || "-"}
                  </td>
                  <td>৳{parcel.cost}</td>
                  <td className="text-right">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Rider selection modal */}
      {selectedParcel && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">
              Select a rider for "{selectedParcel.parcelName}"
            </h3>

            <div className="mt-4 max-h-80 overflow-y-auto">
              {ridersLoading ? (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : riders.length === 0 ? (
                <p className="text-center py-6 text-base-content/60">
                  No approved riders available.
                </p>
              ) : (
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {riders.map((rider) => (
                      <tr key={rider._id}>
                        <td className="font-semibold">{rider.riderName}</td>
                        <td className="text-xs">{rider.riderEmail}</td>
                        <td className="text-xs">
                          {rider.riderPhone ||
                            rider.phone ||
                            rider.contact ||
                            "-"}
                        </td>
                        <td className="text-right">
                          <button
                            className="btn btn-xs btn-success"
                            disabled={assignMutation.isPending}
                            onClick={() => handleAssign(rider)}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedParcel(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRider;
