import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Upcoming from "./components/Upcoming";
import Nearest from "./components/Nearest";
import Past from "./components/Past";
import axios from "axios";
function App() {
  const [active, setactive] = useState(false);
  const [route, setroute] = useState("Nearest");
  const [userdata, setUserData] = useState("");
  const [data, setdata] = useState([]);
  const [selCity, setSelCity] = useState("");
  const [selPCity, setSelPCity] = useState("");
  const [selUCity, setSelUCity] = useState("");
  const [selState, setSelState] = useState("");
  const [selPState, setSelPState] = useState("");
  const [selUState, setSelUState] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  //fetching rides
  useEffect(() => {
    axios
      .get("https://assessment.api.vweb.app/rides")
      .then((data) => {
        data.data.forEach((e) => {
          setCities((old) => [...old, e.city]);
          setStates((old) => [...old, e.state]);
        });
        setdata(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //fetching userdata
  useEffect(() => {
    axios
      .get("https://assessment.api.vweb.app/user")
      .then((data) => setUserData(data.data))
      .catch((err) => console.log(err));
  }, []);

  useState(() => {
    console.log(route, "route");
  }, [route]);

  return (
    <div className="App">
      {/* Navbar component */}
      <Navbar userdata={userdata} />
      <div style={{ marginLeft: 25, marginRight: 25, marginBottom: 20 }}>
        <div className="rides-container">
          <div className="ride-container">
            <h1
              className={
                route == "Nearest" ? "ride-name-selected" : "ride-name"
              }
              onClick={() => setroute("Nearest")}
            >
              Nearest rides
            </h1>
            <h1
              className={
                route == "Upcoming" ? "ride-name-selected" : "ride-name"
              }
              onClick={() => setroute("Upcoming")}
            >
              Upcoming rides
            </h1>
            <h1
              className={route == "Past" ? "ride-name-selected" : "ride-name"}
              onClick={() => setroute("Past")}
            >
              Past rides
            </h1>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
            onClick={() => setactive(!active)}
          >
            <img
              src={require("./assets/images/filter.png")}
              className="filter-icon-head"
              alt="loading"
            />
            <h1 className="filter-name">Filters</h1>
          </div>
        </div>
        {/* Checking for the filter component */}
        {active ? (
          // State,City as well as both can be filtered as per user requirements
          <Filter
            cities={cities}
            states={states}
            setSelCity={setSelCity}
            setSelState={setSelState}
            setSelPCity={setSelPCity}
            setSelPState={setSelPState}
            setSelUCity={setSelUCity}
            setSelUState={setSelUState}
            route={route}
          />
        ) : (
          <></>
        )}
        {/* Upcoming,nearest or past components rendered according to the actions */}
        {route == "Upcoming" ? (
          <Upcoming
            userdata={userdata}
            data={data}
            selUCity={selUCity}
            selUState={selUState}
          />
        ) : route == "Nearest" ? (
          <Nearest
            userdata={userdata}
            data={data}
            selCity={selCity}
            selState={selState}
          />
        ) : (
          <Past
            userdata={userdata}
            data={data}
            selPCity={selPCity}
            selPState={selPState}
          />
        )}
      </div>
    </div>
  );
}

export default App;
