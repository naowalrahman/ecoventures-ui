import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import './cssSingleLocation/SingleLocation.css'
import styled from 'styled-components';
import './cssSingleLocation/GASESGraphs.css'
import './cssSingleLocation/AQIGraph.css'
import './cssSingleLocation/Header.css';
const countryColors = require("./locations/country-colors-true-single.json")
const cityFlags = require("./locations/country-flag-true.json")

const SingleLocation = () => {

    const { userLocation } = useParams();
    const [city, setCity] = useState(() => userLocation.substring(0, userLocation.indexOf(',')))
    const [country, setCountry] = useState(() => userLocation.substring(userLocation.indexOf(',') + 2))
    

    
    
    const [apiInfo, setApiInfo] = useState(async () => {
        const data = await fetch(`https://ecoventures-server.vercel.app/location/${city}`)
        const json = await data.json()
        return [json.date, json.aqi, json.gas];
        
    })
    
    const [reviewData, setReviewData] = useState(async () => {
        return 0; //implement mongodb access, need to npm install this and also npm install styled components
    })

    return (
        <div id="singlelocation">
           <Header cityName = {city} countryName = {country}/>
            <AQIGraph AQI = {apiInfo[1]} />
            <GASESGraphs />
            {/* <h1>{city}</h1>
            <p>
                With an air quality index of <span className='city-info'>{aqi}</span>, and an average gas concentration of <span className='city-info'>X (TBA)</span>, this place is <span className='city-info'>something (TBA)</span> to visit!
            </p>

            <table id='aqi-desc'>
                <thead>
                    <tr>
                        <th>Qualitative name</th>
                        <th>Index</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Good</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Fair</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Moderate</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Poor</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Very Poor</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
};


const Header = (props) => {
    // console.log(props.countryName + " is country")
    // console.log(props.cityName + " is city")
    const cityColor = countryColors[props.countryName][1]
    const countryColor = countryColors[props.countryName][0]
    const flag = cityFlags[props.countryName];

    const SpecialHeader = styled.div`
    color: ${cityColor};
    background-color: ${countryColor};
    `
    
    
    return (
        <SpecialHeader className='header'>
            <img className='flagHeader' src={flag}></img>
            Welcome to {props.cityName}, {props.countryName}
        </SpecialHeader>
    )
}
const GASESGraphs = (props) => {
    let severity = "gasindex";
    let gas = props.GAS;
    const barHeight = 20
    const barDisplace = 45
    const initialOffset = 15;
    const dxOffset = ".35em";
    const dyOffset = ".35em";
    const fsize = 30;
    return  (
        <div className='gasGraph'>
            <svg className="chart" width="420" height={barDisplace * 5}>
                
                    <g className="bar">
                        <rect width="40" height={barHeight}></rect>
                        <text fontSize={fsize} x="45" y={initialOffset} dy={dyOffset} dx={dxOffset}>4 apples</text>
                    </g>
                    <g className="bar">
                        <rect width="80" height={barHeight} y={barDisplace}></rect>
                        <text fontSize={fsize} x="85" y={initialOffset + barDisplace} dy={dyOffset} dx={dxOffset}>8 bananas</text>
                    </g>
                    <g className="bar">
                        <rect width="150" height={barHeight} y={barDisplace * 2}></rect>
                        <text fontSize={fsize} x="150" y={initialOffset + barDisplace * 2} dy={dyOffset} dx={dxOffset}>15 kiwis</text>
                    </g>
                    <g className="bar">
                        <rect width="160" height={barHeight} y={barDisplace * 3}></rect>
                        <text fontSize={fsize} x="161" y={initialOffset + barDisplace * 3} dy={dyOffset} dx={dxOffset}>16 oranges</text>
                    </g>
                    <g className="bar">
                        <rect width="230" height={barHeight} y={barDisplace * 4}></rect>
                        <text fontSize={fsize} x="235" y={initialOffset + barDisplace * 4} dy={dyOffset} dx={dxOffset}>23 lemons</text>
                    </g>
            </svg>
        </div>
    )
    
}
const AQIGraph = (props) => {
    let severity = `aqiindex aqitype${props.AQI}`;
    let textLabel = `aqiText aqitext${props.AQI}`;
    let label;
    switch (props.AQI) {
        case 1:
            label = "Good"
            break;
        case 2:
            label = "Fair"
            break;
        case 3:
            label = "Moderate"
            break;
        case 4:
            label = "Poor"
            break;
        case 5:
            label = "Very Poor"
            break;


    }
    // include image api
    return (
        <div className='aqiGraph'>
        <svg width='360' height='360' className={severity}>

            <circle cx='180' cy='180' r='170' className='back' fill='none'/>
            <circle cx='180' cy='180' r='170' className='front' fill='none'/>

            <g className={textLabel}>
                <text fontSize="30" x='180' y='150'  textAnchor="middle" id='percentage'>Air Quality Index: {props.AQI}</text>
                <text fontSize="50" x='180' y='230'  textAnchor="middle" id='percentage'>{label}</text>
            </g>
        </svg>
        </div>
        
    )
    
}
export default SingleLocation;