import React from "react";
import Img from "../../../assets/live-tracking.png";

const HelpsCards = ({ data }) => {
  console.log(data);
  return (
    <div className="w-200  p-5 my-5 bg-[#f1e8e8] flex items-center gap-2.5 justify-center ">
      <img src={Img} alt="" className="" />
      <div className=" border  h-40 border-secondary border-dashed border-l-0 bo   "></div>

      <div className="">
        <h2 className="">{data.title}</h2>
        <p className="">{data.des}</p>
      </div>
    </div>
  );
};

export default HelpsCards;
