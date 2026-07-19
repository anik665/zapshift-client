import React from "react";
import Logo from "../../components/logo/logo";
import { Outlet } from "react-router";
import AuthImg from "../../assets/authimage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <Logo />
      <div className="flex items-center p-3 w-full mx-auto ">
        <div className="flex-1">
          {" "}
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={AuthImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
