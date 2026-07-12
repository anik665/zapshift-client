import React from "react";
import Logo from "../../components/logo/logo";
import { Link, NavLink } from "react-router";
import { MdArrowOutward } from "react-icons/md";

const Navbar = () => {
  const links = (
    <>
      <li>
        {" "}
        <NavLink to={"/service"}> Service </NavLink>{" "}
      </li>
      <li>
        {" "}
        <NavLink to={"/coverage"}>Coverage </NavLink>{" "}
      </li>
      <li>
        {" "}
        <NavLink to={"/about"}>About us </NavLink>{" "}
      </li>
      <li>
        {" "}
        <NavLink to={"/pricing"}> Pricing </NavLink>{" "}
      </li>
      <li>
        {" "}
        <NavLink to={"contact"}>Contact </NavLink>{" "}
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content text-[#606060] font-medium bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-[#606060] font-medium px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-2 ">
        <div className=" flex gap-2">
          <button className=" bg-white border-gray-700  text-[20px] font-bold px-4 lg:px-8 py-2 lg:py-4  shadow-lg   rounded-lg">
            Sign In
          </button>
          <div className="flex gap-2 items-end">
            <button className="bg-primary font-bold text-[20px]   px-4 lg:px-8 py-2 lg:py-4  rounded-lg mr-2">
              Sign Up
            </button>
            <button className=" bg-black text-[#ffffff] text-xl -ms-3.5  flex items-center justify-center rounded-full w-11 h-11  ">
              <MdArrowOutward className=" text-3xl  " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
