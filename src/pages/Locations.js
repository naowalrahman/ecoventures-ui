import React from 'react';
import Layout from "./Layout";

const Locations = () => {
    return (
        <div>
            <Layout />
            <h1>Locations Page Works</h1>
            <input id="locationInput" placeholder='Type a location here...'></input>
            <button onClick={callAPI}>Submit Location</button> 
            <h1 className="holder"> 
                <span id="date-holder"></span>
                <span id="aqi-holder"></span>
                <span id="gas-holder"></span> 
            </h1>
        </div>
    ); 
};

// var date = "";
// var aqi = "";
// var gas = "";
function callAPI() {
    const locationSubmission = document.getElementById("locationInput").value;
    fetch(`http://localhost:3001/location/${locationSubmission}`, { method: 'GET' })
        .then(data => data.json())
        .then(json => { 
            console.log(json);
            document.getElementById("date-holder").innerHTML = json.date;  
            document.getElementById("aqi-holder").innerHTML = JSON.stringify(json.aqi);
            document.getElementById("gas-holder").innerHTML = JSON.stringify(json.gas);
        });
}

export default Locations;