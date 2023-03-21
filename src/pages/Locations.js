import React from 'react';
import Layout from "./Layout";

const Locations = () => {
  let apiData = callAPI();

  return (
    <div>
      <Layout />
      <h1>Locations Page Works</h1>
      <input id="locationInput" placeholder='Type a location here...'></input>
      <button onClick={callAPI}>Submit Location</button>
      <h1 className="holder"> {apiData.date},{apiData.aqi},{apiData.gas}</h1>
    </div>
  );
};

var date = "";
var aqi = "";
var gas = "";
function callAPI() {
  const locationSubmission = document.getElementById("locationInput").value;
  fetch(`http://localhost:3001/location/${locationSubmission}`, { method: 'GET' })

  .then(data => data.json())
  .then(json => {
    console.log(json);
    return {
      date: date,
      aqi: aqi,
      gas: gas
    }
  })
}

export default Locations;