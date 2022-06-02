import React, { useState, useEffect } from "react";
import "../stylesheets/Filter.css";
export default function Filter({
  cities,
  states,
  setSelCity,
  setSelState,
  setSelPCity,
  setSelPState,
  setSelUCity,
  setSelUState,
  route,
}) {
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [dcity, setDCity] = useState("");
  const [dstate, setDState] = useState("");
  // Removing duplicate cities
  useEffect(() => {
    var uniq = [...new Set(cities)];
    setOptions1(uniq);
  }, [cities]);
  //Removing duplicate states
  useEffect(() => {
    var uniq = [...new Set(states)];
    setOptions2(uniq);
  }, [states]);

  var changeState = (event) => {
    setDState(event.target.value);
    route == "Past"
      ? setSelPState(event.target.value)
      : route == "Upcoming"
      ? setSelUState(event.target.value)
      : setSelState(event.target.value);
  };
  var changeCity = (event) => {
    setDCity(event.target.value);
    route == "Past"
      ? setSelPCity(event.target.value)
      : route == "Upcoming"
      ? setSelUCity(event.target.value)
      : setSelCity(event.target.value);
  };

  return (
    <div className="filter-cont">
      <p className="filter-text">Filters</p>
      <div className="underline"></div>
      <select
        className="dropdown"
        value={dcity}
        onChange={(event) => {
          changeCity(event);
        }}
      >
        {/* displaying the dropdown */}
        {options1.length > 0 &&
          options1.map((data) => {
            return (
              <option value={data} className="dropdown-option" key={data}>
                {data}
              </option>
            );
          })}
      </select>
      <select
        className="dropdown"
        style={{ marginTop: 10 }}
        value={dstate}
        onChange={(event) => {
          changeState(event);
        }}
      >
        {options2.length > 0 &&
          options2.map((data) => {
            return (
              <option value={data} className="dropdown-option" key={data}>
                {data}
              </option>
            );
          })}
      </select>
    </div>
  );
}
