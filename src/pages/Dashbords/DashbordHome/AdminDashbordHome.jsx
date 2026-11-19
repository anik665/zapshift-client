import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
// import { RechartsDevtools } from "@recharts/devtools";

const AdminDashbordHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: deliveryState = [] } = useQuery({
    queryKey: ["delivery-status-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel/delivery-status/stat");
      return res.data;
    },
  });

  const getChartData = (data) => {
    const chartData = data.map((item) => {
      return {
        name: item._id,
        value: item.count,
      };
    });
    return chartData;
  };
  const COLORS = ["#f59e0b", "#3b82f6", "#8b5cf6", "#22c55e", "#ef4444"];

  return (
    <div>
      <h1 className="text-7xl">Admin Home</h1>

      <div className="stats shadow">
        {deliveryState.map((state, index) => (
          <div key={index} className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-2xl text-[#6b7280] ">
              {state._id}
            </div>
            <div className="stat-value">{state.count}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        ))}
      </div>
      <div className="">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 2,
          }}
          responsive
        >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={getChartData(deliveryState)}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            label
            isAnimationActive={true}
          >
            {getChartData(deliveryState).map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* <RechartsDevtools /> */}

          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashbordHome;
