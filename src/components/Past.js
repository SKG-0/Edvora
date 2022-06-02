import React, { useState, useEffect } from "react";
import Ride from "./Ride";
export default function Past({ userdata, data, selPCity, selPState }) {
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    var lengths = [];
    var filteredData = [];
    filteredData = data.filter((item) => {
      return Date.now() > new Date(item.date).getTime(); //filtering data according to current time
    });
    filteredData.map((data) => {
      //sorting data based on distance
      let mnUp = userdata.station_code;
      let mnDown = 0;
      let shortPath;
      let count = 0;
      data.station_path.length > 0 &&
        data.station_path.map((path) => {
          if (path < userdata.station_code) {
            mnDown = path;
          }
          if (path > userdata.station_code && count == 0) {
            mnUp = path;
            count++;
          }
          if (path == userdata.station_code) {
            mnUp = userdata.station_code;
            mnDown = userdata.station_code;
          }
        });
      if (mnDown == 0) {
        shortPath = mnUp - userdata.station_code;
      } else {
        shortPath = Math.min(
          mnUp - userdata.station_code,
          userdata.station_code - mnDown
        );
      }

      lengths.push({ data: data, path: shortPath });
    });

    lengths.sort(function (a, b) {
      return a.path - b.path;
    });

    setSortedData(lengths);
  }, [data]);

  useEffect(() => {
    //filtering data according to filters
    if (selPCity != "" || selPState != "") {
      var lengths = [];
      data.map((data) => {
        let mnUp = userdata.station_code;
        let mnDown = 0;
        let shortPath;
        let count = 0;
        data.station_path.length > 0 &&
          data.station_path.map((path) => {
            if (path < userdata.station_code) {
              mnDown = path;
            }
            if (path > userdata.station_code && count == 0) {
              mnUp = path;
              count++;
            }
            if (path == userdata.station_code) {
              mnUp = userdata.station_code;
              mnDown = userdata.station_code;
            }
          });
        if (mnDown == 0) {
          shortPath = mnUp - userdata.station_code;
        } else {
          shortPath = Math.min(
            mnUp - userdata.station_code,
            userdata.station_code - mnDown
          );
        }
        lengths.push({ data: data, path: shortPath });
      });
      lengths.sort(function (a, b) {
        return a.path - b.path;
      });
      var filteredData2 = [];
      filteredData2 = lengths.filter((item) => {
        return item.data.city == selPCity || item.data.state == selPState;
      });
      setSortedData(filteredData2);
    }
  }, [selPCity, selPState]);

  return (
    <div>
      {sortedData.length > 0 ? (
        sortedData.map((data) => {
          return <Ride data={data.data} key={data.data.date} dis={data.path} />;
        })
      ) : (
        <h1 style={{ color: "white", marginTop: 50 }}>No rides available</h1>
      )}
    </div>
  );
}
