import React, { useEffect } from "react";
import "../stylesheets/Ride.css";
export default function Ride({ data, dis }) {
  useEffect(() => {}, [data]);
  return (
    <div>
      <div className="ride">
        <div>
          <img src={data.map_url} className="ride-img" alt="loading" />
        </div>
        <div className="ride-right">
          <div className="ride-rl-cont">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p className="ride-text">Ride id : </p>
              <p className="ride-text">{data.id}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p className="ride-text">Origin Station : </p>
              <p className="ride-text">{data.origin_station_code}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p className="ride-text">Station path : </p>
              <p className="ride-text">[{data.station_path.toString()}]</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p className="ride-text">Date : </p>
              <p className="ride-text">{data.date}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p className="ride-text">Distance :</p>
              <p className="ride-text">{dis}</p>
            </div>
          </div>
          <div className="ride-rr-cont">
            <div className="btn">
              <p className="btn-name">{data.city}</p>
            </div>
            <div className="btn">
              <p className="btn-name">{data.state}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
