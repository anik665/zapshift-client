import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const coverageData = useLoaderData();
  console.log(coverageData);
  console.log(Array.isArray(coverageData));
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = coverageData.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const coordinates = [district.latitude, district.longitude];
      console.log(district, coordinates);
      mapRef.current.flyTo(coordinates, 12);
    }
  };
  return (
    <div>
      {" "}
      <h2 className="my-10">All dristricts Map</h2>{" "}
      <form action="" className="my-2" onSubmit={handleSearch}>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" name="location" />
        </label>
      </form>
      <div className="my-30">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[800px] w-full"
          ref={mapRef}
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
