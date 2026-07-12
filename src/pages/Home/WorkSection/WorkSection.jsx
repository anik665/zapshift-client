import React, { useState } from "react";
import data from "./cards.json";
import Card from "./Card";

const WorkSection = () => {
  return (
    <div className="mt-16 max-w-6xl mx-auto ">
      <h2 className="text-secondary my-10 text-3xl font-bold ">
        How its Works
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {" "}
        {data.map((r) => (
          <Card r={r} key={r.title} />
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
