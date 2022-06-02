import React from "react";
import "../stylesheets/Navbar.css";
export default function navbar({ userdata }) {
  return (
    <div className="navbar-container">
      <div>
        <h1 className="edvora-name">Edvora</h1>
      </div>
      <div className="navbar-profile-container">
        <h1 className="navbar-name">{userdata.name}</h1>
        <img
          src="https://picsum.photos/200"
          alt="Loading"
          className="navbar-img"
        />
      </div>
    </div>
  );
}
