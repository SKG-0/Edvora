import React, { useState, useEffect } from "react";
import Ride from "./Ride";

export default function Nearest({ userdata, data, selCity, selState }) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    var lengths = [];
    data.map((data) => {
      let mnUp = userdata.station_code;
      let mnDown = 0;
      let shortPath;
      let count = 0;
      //algorithm for finding shortest distance
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
      //creating an object of data and the shortest path
      lengths.push({ data: data, path: shortPath });
    });
    //sorting according to the shortest path
    lengths.sort(function (a, b) {
      return a.path - b.path;
    });
    lengths.map((data) => {
      setSortedData((old) => [...old, data]);
    });
  }, [data]);

  useEffect(() => {
    //data filtering according to the filters selected
    if (selCity != "" || selState != "") {
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
        return item.data.city == selCity || item.data.state == selState;
      });

      setSortedData(filteredData2);
    }
  }, [selCity, selState]);

  return (
    <div>
      {sortedData.length > 0 &&
        sortedData.map((data) => {
          return <Ride data={data.data} key={data.data.date} dis={data.path} />;
        })}
    </div>
  );
}
