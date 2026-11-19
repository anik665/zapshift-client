import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashbordHome from "./AdminDashbordHome";
import RiderDashbordHome from "./RiderDashbordHome";
import UserDashbordHome from "./UserDashbordHome";

const DashbordHome = () => {
  const { role, roleroleLoading } = useRole();
  if (roleroleLoading) {
    return <div className="flex justify-center items-center h-screen"></div>;
  }
  if (role === "admin") {
    return <AdminDashbordHome />;
  } else if (role === "rider") {
    return <RiderDashbordHome />;
  } else return <UserDashbordHome />;
};

export default DashbordHome;
