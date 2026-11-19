import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import {
  FaBoxOpen,
  FaCreditCard,
  FaUserCheck,
  FaTruckFast,
  FaCircleCheck,
  FaCopy,
  FaCheck,
  FaMagnifyingGlass,
  FaClock,
  FaLocationDot,
  FaMotorcycle,
} from "react-icons/fa6";

// ---------- Config ----------
const STAGES = [
  { key: "paid", label: "Paid", icon: FaCreditCard },
  { key: "rider-assigned", label: "Assigned", icon: FaMotorcycle },
  { key: "rider-accepted", label: "Accepted", icon: FaUserCheck },
  { key: "picked-up", label: "Picked Up", icon: FaTruckFast },
  { key: "delivered", label: "Delivered", icon: FaCircleCheck },
];

const STATUS_META = {
  paid: { label: "Paid", badge: "badge-ghost" },
  "rider-assigned": { label: "Rider Assigned", badge: "badge-warning" },
  "rider-accepted": { label: "Rider Accepted", badge: "badge-info" },
  "picked-up": { label: "Picked Up", badge: "badge-primary" },
  delivered: { label: "Delivered", badge: "badge-success" },
};

// ---------- Helpers ----------
const normalize = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

// deliveris string / array / object-array, যেটাই হোক
const getDeliveries = (value) => {
  if (!value) return [];
  const list = Array.isArray(value) ? value : [value];
  return list
    .map((item) =>
      typeof item === "object" && item !== null
        ? {
            status: normalize(item.status || item.deliveryStatus),
            time: item.time || item.createdAt || item.date || null,
          }
        : { status: normalize(item), time: null },
    )
    .filter((d) => d.status);
};

// ---------- Component ----------
const ParcelTrack = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxios();
  const [input, setInput] = useState(trackingId || "");
  const [copied, setCopied] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["parcel-track", trackingId],
    enabled: !!trackingId,
    retry: false,
    refetchInterval: 15000,
    queryFn: async () => {
      const res = await axiosPublic.get(`/tracking/${trackingId}/log`);
      return res.data;
    },
  });

  // Array বা { parcel, logs } দুইটাই সামলায়
  const logs = Array.isArray(data) ? data : data?.logs || [];
  const parcel = Array.isArray(data) ? null : data?.parcel || null;

  // নতুন update আগে
  const timeline = useMemo(() => [...logs].reverse(), [logs]);

  // Current status: শেষ log-এর শেষ deliveris, না থাকলে parcel থেকে
  const currentStatus = useMemo(() => {
    for (let i = logs.length - 1; i >= 0; i--) {
      const list = getDeliveries(logs[i].deliveris);
      if (list.length) return list[list.length - 1].status;
    }
    if (parcel?.deliveryStatus) return normalize(parcel.deliveryStatus);
    if (parcel?.paymentStatus === "paid") return "paid";
    return "";
  }, [logs, parcel]);

  const currentIndex = STAGES.findIndex((s) => s.key === currentStatus);
  const meta = STATUS_META[currentStatus];
  const isDelivered = currentStatus === "delivered";
  const notFound = error?.response?.status === 404;

  const handleSearch = (e) => {
    e.preventDefault();
    const id = input.trim();
    if (id) navigate(`/track/${id}`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard অনুমতি না থাকলে চুপ */
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
          <FaBoxOpen className="text-3xl text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Track Your Parcel</h1>
        <p className="text-base-content/70 mt-1">
          Enter your tracking ID to see the latest updates.
        </p>
      </div>

      {/* Search */}
      {/* <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <label className="input input-bordered flex items-center gap-2 grow">
          <FaMagnifyingGlass className="text-base-content/50" />
          <input
            type="text"
            className="grow"
            placeholder="e.g. ZS-20260101-A1B2C3D4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Track
        </button>
      </form> */}

      {/* States */}
      {!trackingId && (
        <div className="text-center py-12 text-base-content/60">
          Your parcel's journey will appear here.
        </div>
      )}

      {trackingId && isLoading && (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {trackingId && isError && (
        <div className="alert alert-error">
          <span>
            {notFound
              ? "No parcel found with this tracking ID."
              : "Failed to load tracking info. Please try again."}
          </span>
        </div>
      )}

      {trackingId && !isLoading && !isError && (
        <>
          {/* Summary card */}
          <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/50">
                  Tracking ID
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-lg font-semibold">
                    {trackingId}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="btn btn-ghost btn-xs"
                    title="Copy tracking ID"
                  >
                    {copied ? <FaCheck className="text-success" /> : <FaCopy />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-base-content/50">
                  Current Status
                </p>
                <span
                  className={`badge badge-lg font-medium mt-1 ${
                    meta?.badge || "badge-ghost"
                  }`}
                >
                  {meta?.label || currentStatus || "Processing"}
                </span>
              </div>
            </div>

            {parcel && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-base-200">
                <div>
                  <p className="text-xs text-base-content/50">Parcel</p>
                  <p className="font-semibold">{parcel.parcelName || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-base-content/50">Route</p>
                  <p className="font-semibold flex items-center gap-1">
                    <FaLocationDot className="text-primary size-3" />
                    {parcel.senderDistrict || "-"} →{" "}
                    {parcel.receiverDistrict || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-base-content/50">Rider</p>
                  <p className="font-semibold">
                    {parcel.riderName || "Not assigned yet"}
                  </p>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="mt-8">
              <div className="flex items-center">
                {STAGES.map((stage, i) => {
                  const done = i <= currentIndex;
                  const Icon = stage.icon;
                  return (
                    <React.Fragment key={stage.key}>
                      <div className="flex flex-col items-center w-14 shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            done
                              ? isDelivered
                                ? "bg-success text-success-content"
                                : "bg-primary text-primary-content"
                              : "bg-base-200 text-base-content/40"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <span
                          className={`text-[11px] mt-2 text-center leading-tight ${
                            done ? "font-semibold" : "text-base-content/50"
                          }`}
                        >
                          {stage.label}
                        </span>
                      </div>
                      {i < STAGES.length - 1 && (
                        <div
                          className={`h-1 grow rounded -mt-6 ${
                            i < currentIndex
                              ? isDelivered
                                ? "bg-success"
                                : "bg-primary"
                              : "bg-base-200"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <FaClock className="text-primary" /> Tracking History
            </h2>

            {timeline.length === 0 ? (
              <p className="text-center py-6 text-base-content/60">
                No tracking updates yet.
              </p>
            ) : (
              <ol className="relative border-l-2 border-base-200 ml-3 space-y-6">
                {timeline.map((log, i) => {
                  const isLatest = i === 0;
                  const deliveries = getDeliveries(log.deliveris);
                  return (
                    <li key={log._id} className="ml-6">
                      <span
                        className={`absolute -left-[9px] flex w-4 h-4 rounded-full ring-4 ring-base-100 ${
                          isLatest
                            ? isDelivered
                              ? "bg-success"
                              : "bg-primary"
                            : "bg-base-300"
                        }`}
                      />
                      <div
                        className={`rounded-xl p-4 ${
                          isLatest
                            ? "bg-primary/5 border border-primary/20"
                            : "bg-base-200/40"
                        }`}
                      >
                        <p
                          className={isLatest ? "font-semibold" : "font-medium"}
                        >
                          {log.details || "Status updated"}
                        </p>

                        {deliveries.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {deliveries.map((d, idx) => (
                              <span
                                key={idx}
                                className={`badge badge-sm ${
                                  STATUS_META[d.status]?.badge || "badge-ghost"
                                }`}
                                title={d.time ? formatDate(d.time) : ""}
                              >
                                {STATUS_META[d.status]?.label || d.status}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-base-content/50 mt-2">
                          {formatDate(log.createdAt || log.time || log.date)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ParcelTrack;
