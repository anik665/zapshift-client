import React from "react";
import BookingImg from "../../../assets/bookingIcon.png";

const Card = ({ r }) => {
  console.log(r.title);
  return (
    <div className={`w-65  bg-gray-100 shadow-lg p-3 mb-25 rounded-lg`}>
      <img src={BookingImg} alt="" className="" />
      <h3 className="text-[20px] text-secondary my-2 font-bold">{r.title}</h3>
      <p className=" text-[#606060] font-medium ">{r.des}</p>
    </div>
  );
};

export default Card;
