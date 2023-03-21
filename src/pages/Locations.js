import React from 'react';
import Layout from "./Layout";

const Locations = () => {
    return (
        <div>
            <Layout />
            <h1>Locations Page Works</h1>
            <input id="locationInput" placeholder='Type a location here...'></input>
            <button onClick={callAPI}>Submit Location</button> 
            <div id="locationData" style={{display: "none"}}>
            <h1 className="holder"> Data: </h1>

            {/* TODO: improve this layout */}
            <ul>
                <li>Date: <span id="date-holder"></span></li>
                <li>Air Quality Index: <span id="aqi-holder"></span></li>
                <li>Gas Components: <span id="gas-holder"></span></li>
            </ul>
            </div>
        </div>
    ); 
};

// var date = "";
// var aqi = "";
// var gas = "";
function callAPI() {
    document.getElementById("locationData").style.display = "block";
    const locationSubmission = document.getElementById("locationInput").value;
    fetch(`http://ecoventures-server.vercel.app/location/${locationSubmission}`, { method: 'GET' })
        .then(data => data.json())
        .then(json => { 
            console.log(json);
            document.getElementById("date-holder").innerHTML = json.date;  
            document.getElementById("aqi-holder").innerHTML = JSON.stringify(json.aqi);
            document.getElementById("gas-holder").innerHTML = JSON.stringify(json.gas);
        });
}

export default Locations;