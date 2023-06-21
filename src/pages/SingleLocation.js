import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {TextField} from '@mui/material'
//import './cssSingleLocation/SingleLocation.css'
import {Button} from '@mui/material'
import styled from 'styled-components';
import './cssSingleLocation/GASESGraphs.css'
import './cssSingleLocation/AQIGraph.css'
import './cssSingleLocation/Header.css';
import './cssSingleLocation/graphs.css'
import './cssSingleLocation/submitButton.css'
import Layout from './Layout';
const countryColors = require("./locations/country-colors-true-single.json")
const cityFlags = require("./locations/country-flag-true.json")

const LoadingHeader = styled.div`

    color: #7ed974;
    background-color: aliceblue;
    `

const SingleLocation = () => {

    const { userLocation } = useParams();
    const [city, setCity] = useState(() => userLocation.substring(0, userLocation.indexOf(',')))
    const [country, setCountry] = useState(() => userLocation.substring(userLocation.indexOf(',') + 2, userLocation.indexOf('&')))
    const [userLoc, setUserLoc] = useState(() => userLocation.substring(userLocation.indexOf('&') + 1))
    const [isFinished, setIsFinished] = useState(false);
    const server = 'https://ecoventures-server.vercel.app';
    //const server = 'http://localhost:3001'; // for dev only
    
    
    const [apiInfo, setApiInfo] = useState(() => {
        fetch(`${server}/location/${city}`)
        .then(data => data.json())
        .then(json => {
            setApiInfo([json.date, json.aqi, json.gas])
            // console.log(json.gas);
        })
        return [new Date(), 0, null]
    })
    const [reviewData, setReviewData] = useState(async () => {
        const variable = await fetch("https://api.github.com/users/xiaotian/repos");
        const json = await variable.json()
        console.log(json);
        
    })
    const [userName, setUserName] = useState(async () => {
        
    })

    useEffect(() => {
        // console.log("useEffect Ran and apiInfo[2] is " + apiInfo[2])
        if (apiInfo[2] != null) {
            // console.log("notnull");
            setIsFinished(true)
        }
    }, [apiInfo])
    

    return (

        <div id="singlelocation">
            <Layout userLocExtra = {userLocation.substring(0, userLocation.indexOf('&'))} userLoc={userLocation.substring(userLocation.indexOf('&') + 1)} specific="Location"/>
            {/* <BackDiv cityName = {city} countryName = {country} userLoc = {userLoc} /> */}
            <Header cityName = {city} countryName = {country} finished = {isFinished} Review = {false}/>
            <div className='pt-4 container-fluid'>
                {apiInfo[2] == null ? (
                    <div className='row gx-3'>
                    <div className='gasGraph col-lg-3'>
                        <GASESGraphs gases = {apiInfo[2]}/>
                    </div>
                    <div className='col-lg-6'>
                    </div>
                    <div className='aqiGraph col-lg-3'>
                        <AQIGraph AQI = {apiInfo[1]} />

                    </div>
                </div>
                ) : (
                    <div className='row gx-3'>
                        <div className='gasGraph col-lg-9'>
                            <GASESGraphs gases = {apiInfo[2]}/>
                        </div>
                        <div className='aqiGraph col-lg-3'>
                            <AQIGraph AQI = {apiInfo[1]} />

                        </div>
                    </div>
                )}
                
            </div>
            <div className='container-fluid pt-4'>
                    <Header cityName = {city} countryName = {country} finished = {isFinished} Review = {true}>
                        
                    </Header>
            </div>
            <div className='container pt-4'>
                <div className='row pb-4'>
                    <div className='col-lg-12'>
                        <TextField 
                        value=""
                        label="Name"
                        placeholder='Enter your name'
                        color='primary' 
                        variant='outlined' 
                        size='large' 
                        className='submitButton'></TextField>
                    </div>
                </div>
                <div className='row pb-4'>
                    <div className='col-lg-12'>
                        <TextField 
                        multiline
                        label="Review"
                        placeholder='Review this location'
                        color='primary' 
                        variant='outlined' 
                        size='large' 
                        className='submitButton'></TextField>
                    </div>
                </div>
                <div className='row pb-4'> 
                    <div className='col-12'>
                        <Button 
                        size='large' 
                        variant="contained" 
                        className='submitButton'
                        onClick={() => {
                            fetch(`https://ecoventures-server.vercel.app/location/${city}`)
                            .then(data => data.json())
                            .then(json => {
                                setApiInfo([json.date, json.aqi, json.gas])
                                // console.log(json.gas);
                            })
                        }}>hello</Button>
                    </div>
                </div>
            </div>
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

    
    if (props.finished) {
        if (props.Review) {
            return (
                <SpecialHeader className="container-fluid p-4 header finished">
                    
                    <div className='row align-items-center justify-content-center'>
                        <div className='col-12 text-start'>
                            Write a Review
                        </div>
                    </div>
                </SpecialHeader>
            )
        }
        return (
            <SpecialHeader className="container-fluid p-4 header finished">
                
                <div className='row align-items-center justify-content-center'>
                    <div className='col-2'>
                        <img className='flagHeader' src={flag}></img>
                    </div>
                    <div className='col'>
                        Welcome to {props.cityName}, {props.countryName}
                    </div>
                    <div className='col-2'>
                        <img className='flagHeader' src={flag}></img>
                    </div>
                </div>
                
                
            </SpecialHeader>
        )
    }
    else {
        return (
        <LoadingHeader className='loading'>
            Loading...
        </LoadingHeader>)
    }
        
}
const GASESGraphs = (props) => {
    let severity = "gasindex";
    let gas = props.GAS;
    const svgWidth = 1000
    const barHeight = 20
    const barDisplace = 45
    const initialOffset = 15;
    const dxOffset = ".35em";
    const dyOffset = ".25em";
    const fsize = 30;
    const g = props.gases
    if (props.gases == null) {
        let severity = `aqitype0`
        let textLabel = `aqiText aqitext0`
        return (
            <div className='aqiGraph'>
                <svg viewBox='0 0 360 360' className={severity}>
                    <circle cx='180' cy='180' r='170' className='back' fill='none'/>
                    <circle cx='180' cy='180' r='170' className='front' fill='none'/>

                    <g className={textLabel}>
                        <text fontSize="50" x='180' y='230' textAnchor="middle" id='percentage'>Loading</text>
                    </g>
                </svg>
            </div>
        )
        
    }
    else {
        const barMaxs = [15400, 100, 200, 180, 350, 75, 200, 200]
        const barIntervals = [
            [4400, 9400, 12400, 15400],
            [25, 50, 75, 100],
            [40, 70, 150, 200],
            [60, 100, 140, 180],
            [20, 80, 250, 350],
            [10, 25, 50, 75],
            [20, 50, 100, 200],
            [50, 100, 150, 200]
        ]
        let bars = []
        let iterator = 0
        for (const property in props.gases) {
            bars.push(
                <Bar 
                barInterval = {barIntervals[iterator]}
                barMax = {barMaxs[iterator]}
                property = {property}
                gas = {g[property]} 
                svgWidth = {svgWidth} 
                barHeight = {barHeight} 
                barDisplace = {barDisplace}
                barDisplaceExtent = {iterator} 
                fsize = {fsize}
                initialOffset = {initialOffset}
                dyOffset = {dyOffset}
                dxOffset = {dxOffset}
                />
            )
            iterator++;
        }
        // console.log("done");
        // console.log(bars);
        return  (
        
        <svg className="chart"  viewBox={`0 0 ${svgWidth + 250} ${barDisplace * 8}`}>
            {bars}
        </svg>

        )
    }
    
    
}

const Bar = (props) => {
    
    const green = "#43e23e"
    const orange = "#ee6d22"
    const yellow = "#ebee22"
    const red = "#ee2121"
    const pink = "#ee36d5"
    const colorArray = [green, orange, yellow, red, pink]
    const intervals = props.barInterval
    let name;
    let color;

    switch (props.property) {
        case 'co':
            name = 'CO';
            break;
        case 'no':
            name = 'NO';
            break;
        case 'no2':
            name = 'NO₂';
            break;
        case 'o3':
            name = 'O₃';
            break;
        case 'so2':
            name = 'SO₂';
            break;
        case 'pm2_5':
            name = 'PM2.5';
            break;
        case 'pm10':
            name = 'PM₁₀';
            break;
        case 'nh3':
            name = 'NH₃';
            break;
    } 
    let i = 0
    for (const el of intervals) {
        if (props.gas < el) {
            break;
        }
        i++;
    }
    color = colorArray[i]
    return (
        <g className="bar">
            <rect fill={color} width={props.gas/props.barMax * props.svgWidth} height={props.barHeight} y={props.barDisplace * props.barDisplaceExtent}>
            <animate attributeName="width" 
                from="0" 
                to={props.gas/props.barMax * props.svgWidth}
                dur="2s" fill='freeze'/>
            </rect>
            <text fontSize={props.fsize} x={props.gas/props.barMax * props.svgWidth} y={props.initialOffset + props.barDisplace * props.barDisplaceExtent} dy={props.dyOffset} dx={props.dxOffset}>{name} {props.gas} μg/m³</text>
        </g>
    )
}
const AQIGraph = (props) => {
    let severity = `aqiindex aqitype${props.AQI}`;
    let textLabel = `aqiText aqitext${props.AQI}`;
    let label;
    switch (props.AQI) {
        case 0:
            label = "Loading"
            severity = `aqitype${props.AQI}`
            break;
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
        <svg  viewBox='0 0 360 360'className={severity}>

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