import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import './cssSingleLocation/SingleLocation.css'
import {Button} from '@mui/material'
import {TextField} from '@mui/material'
import styled from 'styled-components';
import './cssSingleLocation/GASESGraphs.css'
import './cssSingleLocation/AQIGraph.css'
import './cssSingleLocation/Header.css';
import './cssSingleLocation/BackLink.css';
import './cssSingleLocation/graphs.css'
import './cssSingleLocation/SingleLocation.css'
import Layout from './Layout';
const countryColors = require("./locations/country-colors-true-single.json")
const cityFlags = require("./locations/country-flag-true.json")

const valid_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=\n "

const LoadingHeader = styled.div`

    color: #7ed974;
    background-color: aliceblue;
    `

const SingleLocation = () => {

    const { userLocation } = useParams();
    const [buttonSuccessOrFailure, setButtonSuccessOrFailure] = useState('primary')
    const [buttonMSG, setButtonMSG] = useState('Submit Comment')
    const [city, setCity] = useState(() => userLocation.substring(0, userLocation.indexOf(',')))
    const [country, setCountry] = useState(() => userLocation.substring(userLocation.indexOf(',') + 2, userLocation.indexOf('&')))
    const [userLoc, setUserLoc] = useState(() => userLocation.substring(userLocation.indexOf('&') + 1))
    const [isFinished, setIsFinished] = useState(false);
    const mainserver = 'https://ecoventures-server.vercel.app';
    const server = 'http://localhost:3001'; // for dev only
    
    
    const [apiInfo, setApiInfo] = useState(() => {
        console.log(userLocation);
        fetch(`${mainserver}/location/${city}`)
        .then(data => data.json())
        .then(json => {
            setApiInfo([json.date, json.aqi, json.gas])
        })
        return [new Date(), 0, null]
    })
    const [reviewData, setReviewData] = useState(() => {
        fetch(`${mainserver}/reviewData/${process.env.REACT_APP_MONGODB_PASSWORD}/${city}`, { method: 'POST' })
        .then(data => data.json())
        .then(json => {
            setReviewData(json)
        })
        return null;
    })

    const [userName, setUserName] = useState('')

    const [reviewSubmission, setReviewSubmission] = useState('')

    const [userNameEdited, setUserNameEdited] = useState(false)

    const [reviewSubmissionEdited, setReviewSubmissionEdited] = useState(false)

    useEffect(() => {
        document.documentElement.scrollTo( {
            top:0,
            behavior: 'instant'
        })
    }, [])


    return (

        <div id="singlelocation">
            <Layout userLocExtra = {userLocation} userLoc={userLoc} specific="Location"/>
            <Header cityName = {city} countryName = {country} finished = {apiInfo[2] != null} Review = {null} userNameEdited = {userNameEdited} reviewSubmissionEdited = {reviewSubmissionEdited}/>
            <div className='p-2 container-fluid'>
                {apiInfo[2] == null ? (
                    <div className='row align-items-center justify-content-between gx-3'>
                    <div className='col-md-3 d-flex justify-content-center m-1'>
                        <GASESGraphs gases = {apiInfo[2]}/>
                    </div>
                    
                    <div className='col-md-3 d-flex justify-content-center m-1'>
                        <AQIGraph AQI = {apiInfo[1]} />

                    </div>
                </div>
                ) : (
                    <div className='row align-items-center justify-content-around gx-4'>
                        <div className='col-md-9 d-flex'>
                            <GASESGraphs gases = {apiInfo[2]}/>
                        </div>
                        <div className='col-md-3 d-flex justify-content-center'>
                            <AQIGraph AQI = {apiInfo[1]} />

                        </div>
                    </div>
                )}
                
            </div>
            <Header cityName = {city} countryName = {country} finished = {apiInfo[2] != null} Review = {'ReviewShow'} userNameEdited = {userNameEdited} reviewSubmissionEdited = {reviewSubmissionEdited}/>
            <ReviewDataList reviewDataFinished = {reviewData != null} reviewData = {reviewData}/> 
            <Header cityName = {city} countryName = {country} finished = {apiInfo[2] != null} Review = {'ReviewSubmit'} userNameEdited = {userNameEdited} reviewSubmissionEdited = {reviewSubmissionEdited} />

            <div className='container pt-4'>
                <div className='row pb-4'>
                    <div className='col-lg-12'>
                        <TextField 
                        id="username"
                        value={userName}
                        label="Name"
                        placeholder='Enter your name'
                        color='primary' 
                        variant='outlined' 
                        size='large' 
                        className='submitButton'
                        onChange={(e) => {
                            setUserNameEdited(true)
                            setUserName(e.target.value)
                        }}>

                        </TextField>
                    </div>
                </div>
                
                <div className='row pb-4'>
                    <div className='col-lg-12'>
                        <TextField 
                        id = "reviewsubmission"
                        multiline
                        value = {reviewSubmission}
                        label="Comment"
                        placeholder='Comment on this location'
                        color= 'primary'
                        variant='outlined' 
                        size='large' 
                        className='submitButton'
                        onChange={(e) => {
                            setReviewSubmissionEdited(true)
                            setReviewSubmission(e.target.value)
                        }}
                        ></TextField>
                    </div>
                </div>
                <div className='row pb-4'> 
                    <div className='col-12 mb-5'>
                        <Button 
                        size='large' 
                        variant="contained" 
                        color = {buttonSuccessOrFailure}
                        className='submitButton'
                        onClick={() => {
                            const userNameFailure = (userName == '')
                            const reviewSubmissionFailure = (reviewSubmission == '')
                            const userNameIllegal = (() => {    
                                for (let character of userName) {
                                    if (!valid_chars.includes(character)) {
                                        return true;
                                    }
                                }
                                return false;
                                })()
                            const reviewSubmissionIllegal = (() => {
                                for (let character of reviewSubmission) {
                                    if (!valid_chars.includes(character)) {
                                        return true;
                                    }
                                }
                                return false;
                            })()
                            if (userNameFailure || reviewSubmissionFailure) {
                                if (!userNameEdited) {
                                    setUserNameEdited(true)
                                }
                                if (!reviewSubmissionEdited) {
                                    setReviewSubmissionEdited(true)
                                }
                                if (userNameFailure && reviewSubmissionFailure) {
                                    setButtonMSG("Error: name and review have not been filled out")
                                }
                                else {
                                    setButtonMSG(`Error: ${userNameFailure ? 'name' : 'review'} field has not been filled out`)
                                }
                                setButtonSuccessOrFailure('error')
                                
                            }
                            else if (userNameIllegal || reviewSubmissionIllegal) {
                                if (userNameIllegal && reviewSubmissionIllegal) {
                                    setButtonMSG(`Error: illegal characters in name and review`)
                                    setButtonSuccessOrFailure('error')
                                }
                                else {
                                    setButtonMSG(`Error: illegal ${userNameIllegal ? "name" : "review"}`)
                                    setButtonSuccessOrFailure('error')
                                }
                                
                            }
                            else {
                                
                                setButtonSuccessOrFailure('success')
                                setButtonMSG('Review Submitted!')
                                setUserName('')
                                setReviewSubmission('')
                                setTimeout(() => {
                                    
                                    fetch(`${mainserver}/submitreview/${process.env.REACT_APP_MONGODB_PASSWORD}/${city}/${encodeURIComponent(userName)}/${encodeURIComponent(reviewSubmission)}`, { method: 'POST' })
                                    .then(() => {
                                        fetch(`${mainserver}/reviewData/${process.env.REACT_APP_MONGODB_PASSWORD}/${city}`, { method: 'POST' })
                                        .then(data => data.json())
                                        .then(json => {
                                            setReviewData(json)
                                        })
                                    })
                                }, 3000)   
                            }
                        setTimeout(() => {
                            setButtonSuccessOrFailure('primary')
                            setButtonMSG('Submit Comment')
                        }, 2000)    
                        }}>{buttonMSG}</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

const ReviewDataList = (props) => {

    if (props.reviewData != null) {
        let reviewBoxes = []
        let iterator = 1
        for (const property of props.reviewData) {
            reviewBoxes.push(
            <ReviewDataElement 
            reviewNum = {iterator}
            user = {property["user"]} 
            timeSubmitted = {property["timeSubmitted"]} 
            review = {property["review"]} 
            />)

            iterator++
        }
        return (
            <div className='container mb-4'>
                <div className="accordion" id="reviewContainer">
                
                    {reviewBoxes}
                </div>
            </div>
            
        )
    }
    else {
        return (
            <LoadingHeader className='loading'>
                Loading...
            </LoadingHeader> 
        )
            
    }
}

const ReviewDataElement = (props) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={`review${props.reviewNum}`}>
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${props.reviewNum}`} aria-expanded="false" aria-controls={`collapse${props.reviewNum}`}>
                <div className='container-fluid p-0 d-flex justify-content-between align-items-center'>
                    
                        <div className='ps-2'>
                        Written by: {props.user}
                        </div>
                        <div className='pe-3'>      
                        Submitted on {props.timeSubmitted}
                        </div>
                    
                </div>
            </button>
            </h2>
                <div id={`collapse${props.reviewNum}`} className="accordion-collapse collapse" aria-labelledby={`review${props.reviewNum}`} data-bs-parent="#reviewContainer">
                <div className="accordion-body">
                    {props.review}
                </div>
            </div>
        </div>
                    
    )
}


const Header = (props) => {
    const cityColor = countryColors[props.countryName][1]
    const countryColor = countryColors[props.countryName][0]
    const flag = cityFlags[props.countryName];

    const SpecialHeader = styled.div`
    color: ${cityColor};
    background-color: ${countryColor};
    `
    let typing = (props.userNameEdited || props.reviewSubmission)
    
    if (props.finished) {
        if (props.Review == 'ReviewShow') {
            if (typing) {
                return (
                    <SpecialHeader className="container-fluid py-2 mb-4 subHeader header typingHeader">
                        
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-12 text-start'>
                                Comments
                            </div>
                        </div>
                    </SpecialHeader>
                )
            }
            else {
                return (
                    <SpecialHeader className="container-fluid py-2 mb-4 subHeader header finished">
                        
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-12 text-start'>
                                Comments
                            </div>
                        </div>
                    </SpecialHeader>
                )
            }
        }
        else if (props.Review == 'ReviewSubmit') {
            if (typing) {
                return (
                    <SpecialHeader className="container-fluid py-2 mb-4 subHeader header typingHeader">
                        
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-12 text-start'>
                                Write a Comment
                            </div>
                        </div>
                    </SpecialHeader>
                )
            }
            else {
                return (
                    <SpecialHeader className="container-fluid py-2 mb-4 subHeader header finished">
                        
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-12 text-start'>
                                Write a Comment
                            </div>
                        </div>
                    </SpecialHeader>
                )
            }
            
        }
        else {
            if (typing) {
                return (
                    <SpecialHeader className="container-fluid py-2 header typingHeader">
                        
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-2'>
                                <img className='flagHeader' src={flag}></img>
                            </div>
                            <div className='col-8'>
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
                    <SpecialHeader className="container-fluid py-2 header finished">
                        
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-2'>
                                <img className='flagHeader' src={flag}></img>
                            </div>
                            <div className='col-8'>
                                Welcome to {props.cityName}, {props.countryName}
                            </div>
                            <div className='col-2'>
                                <img className='flagHeader' src={flag}></img>
                            </div>
                        </div>
                        
                        
                    </SpecialHeader>
                    )
            }
            
        }
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
    const initialOffset = 25;
    const initialBarOffset = 15;
    const dxOffset = ".35em";
    const dyOffset = ".25em";
    const fsize = 20;
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
                        <text fontSize="50" x='180' y='190' textAnchor="middle" id='percentage'>Loading</text>
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
                initialBarOffset = {initialBarOffset}
                dyOffset = {dyOffset}
                dxOffset = {dxOffset}
                />
            )
            iterator++;
        }

        return  (
        <div className='gasGraph'>
            <svg className="chart"  viewBox={`0 0 ${svgWidth} ${barDisplace * 8}`}>
                {bars}
            </svg>
        </div>
        

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
    const realWidth = props.gas/props.barMax * props.svgWidth
    const barWidth = Math.min(Math.max(realWidth, 0), props.svgWidth-270);
    return (
        <g className='bar'>
            
            <rect className='gasindexbar' fill={color} width={barWidth} height={props.barHeight} y={props.initialBarOffset + props.barDisplace * props.barDisplaceExtent}>
            <animate attributeName="width" 
                from="0" 
                to={barWidth}
                dur="2s" fill='freeze'/>
            </rect>
            <text fontSize={props.fsize} x={barWidth} y={props.initialOffset + props.barDisplace * props.barDisplaceExtent} dy={props.dyOffset} dx={props.dxOffset}>{name}: {props.gas} μg/m³</text>
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
