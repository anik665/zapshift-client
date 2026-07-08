import React from "react";
import Logos from "../../assets/logo.png";

const Logo = () => {
  return (
    <div>
      <div className=" flex items-end  ">
        <img src={Logos} alt="Logo" />
        <h2 className="font-extrabold -ms-2.5 text-3xl">Zapshift</h2>
      </div>
    </div>
  );
};

export default Logo;
