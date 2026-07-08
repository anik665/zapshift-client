import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../shere/Navber/Navbar";
import Footer from "../../shere/footer/Footer";

const RootLayOut = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default RootLayOut;
