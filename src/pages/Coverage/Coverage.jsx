import React from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const coverageData = useLoaderData();
  console.log(coverageData);
  console.log(Array.isArray(coverageData));
  return (
    <div>
      {" "}
      <h2 className="my-10">All dristricts Map</h2>{" "}
      <div className="my-30">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[800px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coverageData?.map((district) => (
            <Marker
              key={district.district}
              position={[district.latitude, district.longitude]}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <strong>{district.district} :</strong>
                <br />
                {district.covered_area.map((area) => area).join(",")}
              </Tooltip>
              */
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
