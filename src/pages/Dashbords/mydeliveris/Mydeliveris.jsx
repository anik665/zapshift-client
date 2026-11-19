import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTruckFast, FaMagnifyingGlass, FaPhone } from "react-icons/fa6";

const STATUS_FLOW = {
  "rider-assigned": {
    label: "New Task",
    badge: "badge-warning",
    active: true,
    actions: [
      {
        key: "accept",
        label: "Accept",
        btn: "btn-success",
        title: "Accept this task?",
        done: "Task accepted",
      },
      {
        key: "reject",
        label: "Reject",
        btn: "btn-error btn-outline",
        title: "Reject this task?",
        done: "Task rejected",
        danger: true,
      },
    ],
  },
  "rider-accepted": {
    label: "Accepted",
    badge: "badge-info",
    active: true,
    actions: [
      {
        key: "pickup",
        label: "Confirm Pickup",
        btn: "btn-primary",
        title: "Confirm pickup?",
        done: "Marked as picked up",
      },
    ],
  },
  "picked-up": {
    label: "Picked Up",
    badge: "badge-primary",
    active: true,
    actions: [
      {
        key: "deliver",
        label: "Confirm Delivery",
        btn: "btn-success",
        title: "Confirm delivery?",
        done: "Marked as delivered",
      },
    ],
  },
  delivered: {
    label: "Delivered",
    badge: "badge-success",
    active: false,
    actions: [],
  },
};

const pick = (obj, keys) => keys.map((k) => obj?.[k]).find(Boolean) || "";

const getParty = (p, side) => {
  const a = side === "sender" ? "sender" : "receiver";
  const b = side === "sender" ? "sender" : "recipient";
  return {
    name:
      pick(p, [`${a}Name`, `${b}Name`]) ||
      (side === "sender" ? p.senderEmail : ""),
    phone: pick(p, [`${a}Phone`, `${b}Phone`, `${a}Contact`, `${b}Contact`]),
    location: [
      pick(p, [`${a}Address`, `${b}Address`]),
      pick(p, [`${a}District`, `${b}District`]),
    ]
      .filter(Boolean)
      .join(", "),
  };
};

const formatDate = (d) => (d ? new Date(d).toLocaleString() : "");

const Mydeliveris = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-deliveries", user?.email],
    enabled: !!user?.email,
    refetchInterval: 15000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel/rider", {
        params: { riderEmail: user.email },
      });
      return res.data;
    },
  });

  const actionMutation = useMutation({
    mutationFn: ({ id, trackingId, action }) =>
      axiosSecure.patch(`/parcel/${id}/rider-action`, { action, trackingId }),
    onSuccess: (res, { doneText }) => {
      queryClient.invalidateQueries({ queryKey: ["my-deliveries"] });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: doneText,
          timer: 1300,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Not updated",
          text: "This parcel's status has already changed.",
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

  const handleAction = (parcel, act) => {
    Swal.fire({
      title: act.title,
      text: parcel.parcelName,
      icon: act.danger ? "warning" : "question",
      showCancelButton: true,
      confirmButtonColor: act.danger ? "#d33" : "#16a34a",
      confirmButtonText: `Yes, ${act.label.toLowerCase()}`,
    }).then((result) => {
      if (result.isConfirmed) {
        actionMutation.mutate({
          id: parcel._id,
          trackingId: parcel.trackingId,
          action: act.key,
          doneText: act.done,
        });
      }
    });
  };

  const counts = useMemo(() => {
    const c = { all: parcels.length };
    Object.keys(STATUS_FLOW).forEach((s) => (c[s] = 0));
    parcels.forEach((p) => {
      if (c[p.deliveryStatus] !== undefined) c[p.deliveryStatus] += 1;
    });
    return c;
  }, [parcels]);

  const activeCount = parcels.filter(
    (p) => STATUS_FLOW[p.deliveryStatus]?.active,
  ).length;

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return parcels.filter((p) => {
      if (tab !== "all" && p.deliveryStatus !== tab) return false;
      if (!term) return true;
      const s = getParty(p, "sender");
      const r = getParty(p, "receiver");
      return [p.trackingId, p.parcelName, s.name, r.name]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term));
    });
  }, [parcels, tab, search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>
          Failed to load your deliveries. Please check your login or server.
        </span>
      </div>
    );
  }

  const busy = actionMutation.isPending;

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FaTruckFast className="text-3xl text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Deliveries</h1>
            <p className="text-sm text-base-content/70 mt-1">
              Accept or reject tasks, confirm pickup and delivery.
            </p>
          </div>
        </div>

        <div className="stats shadow bg-base-200">
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Active</div>
            <div className="stat-value text-2xl text-primary">
              {activeCount}
            </div>
          </div>
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Delivered</div>
            <div className="stat-value text-2xl text-success">
              {counts.delivered || 0}
            </div>
          </div>
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Total</div>
            <div className="stat-value text-2xl">{counts.all}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        <div className="tabs tabs-box w-fit flex-wrap">
          <button
            className={`tab ${tab === "all" ? "tab-active" : ""}`}
            onClick={() => setTab("all")}
          >
            All ({counts.all})
          </button>
          {Object.entries(STATUS_FLOW).map(([key, cfg]) => (
            <button
              key={key}
              className={`tab ${tab === key ? "tab-active" : ""}`}
              onClick={() => setTab(key)}
            >
              {cfg.label} ({counts[key]})
            </button>
          ))}
        </div>

        <label className="input input-bordered flex items-center gap-2 w-full lg:w-80">
          <FaMagnifyingGlass className="text-base-content/50" />
          <input
            type="text"
            className="grow"
            placeholder="Search tracking ID, parcel, name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="overflow-x-auto border border-base-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Parcel</th>
              <th>Pickup (Sender)</th>
              <th>Deliver To</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-base-content/60"
                >
                  {parcels.length === 0
                    ? "No tasks assigned to you yet."
                    : "No tasks match your filter."}
                </td>
              </tr>
            ) : (
              visible.map((parcel, index) => {
                const cfg = STATUS_FLOW[parcel.deliveryStatus];
                const sender = getParty(parcel, "sender");
                const receiver = getParty(parcel, "receiver");

                return (
                  <tr key={parcel._id} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-mono text-xs">
                      {parcel.trackingId || "-"}
                    </td>
                    <td>
                      <div className="font-semibold">
                        {parcel.parcelName || "-"}
                      </div>
                      {parcel.assignedAt && (
                        <div className="text-xs text-base-content/50">
                          Assigned: {formatDate(parcel.assignedAt)}
                        </div>
                      )}
                    </td>

                    {[sender, receiver].map((party, i) => (
                      <td key={i} className="text-xs">
                        <div className="font-medium">{party.name || "-"}</div>
                        <div className="text-base-content/60">
                          {party.location || "-"}
                        </div>
                        {party.phone && (
                          <a
                            href={`tel:${party.phone}`}
                            className="link link-primary inline-flex items-center gap-1 mt-0.5"
                          >
                            <FaPhone className="size-3" /> {party.phone}
                          </a>
                        )}
                      </td>
                    ))}

                    <td>
                      <span
                        className={`badge font-medium ${cfg?.badge || "badge-ghost"}`}
                      >
                        {cfg?.label || parcel.deliveryStatus}
                      </span>
                    </td>

                    <td className="text-right">
                      {cfg?.actions.length ? (
                        <div className="flex gap-2 justify-end">
                          {cfg.actions.map((act) => (
                            <button
                              key={act.key}
                              className={`btn btn-xs ${act.btn}`}
                              disabled={busy}
                              onClick={() => handleAction(parcel, act)}
                            >
                              {act.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-base-content/50">
                          {parcel.deliveredAt
                            ? formatDate(parcel.deliveredAt)
                            : "Completed"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mydeliveris;
