import React from "react";
import datas from "./service.json";
import ServiceCards from "./ServiceCards";

const Service = () => {
  console.log(datas);
  return (
    <div className="h-250  bg-secondary pt-15 rounded-4xl">
      <h2 className=" text-center text-[#ffffff] mt-10 text-4xl font-extrabold">
        Our Service
      </h2>
      <p className="text-[#DADADA] font-medium text-center">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to <br /> business shipments — we deliver
        on time, every time.
      </p>
      <div className=" mt-10 grid grid-cols-3 pt-0 px-30">
        {datas.map((r) => (
          <ServiceCards r={r} key={r.title} />
        ))}
      </div>
    </div>
  );
};

export default Service;
