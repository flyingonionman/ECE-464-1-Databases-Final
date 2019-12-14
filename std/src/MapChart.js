import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";

//Data available at NYC open data
const geoUrl = "https://raw.githubusercontent.com/flyingonionman/ECE-464-1-Databases-Final/master/NTAmap.json";

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);

const MapChart = () => {
  const [data, setData] = useState([]);

 /*  useEffect(() => {
    // https://www.bls.gov/lau/
    csv("/unemp.csv").then(counties => {
      setData(counties);
    });
  }, []); */

  return (
    <div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({geographies}) => geographies.map(geo =>
            <Geography key={geo.rsmKey} geography={geo} />
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
