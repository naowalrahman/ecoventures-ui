import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import {Slider} from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import {CircularProgress} from '@mui/material';
import './cssLocations/locationIntro.css'
import './cssLocations/inputArea.css';
import './cssLocations/Locations.css';
import './cssLocations/selector.css';
import './cssLocations/slider.css';
import './cssLocations/countryCards.css';
import './cssLocations/Progress.css';
import './cssLocations/columns.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const cityFlags = require("./locations/country-flag-true.json")


const valid_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-' "

const Locations = () => {
    const { userLocation } = useParams();

    //const start = Math.floor(Math.random() * (39000 - interval));
    const mainserver = 'https://ecoventures-server.vercel.app';
    const server = 'http://localhost:3001'; // for dev only
    const [citySubmitted, setCitySubmitted] = useState(false)
    const [countrySubmitted, setCountrySubmitted] = useState(false)
    const [cityFailure, setCityFailure] = useState(false)
    const [countryFailure, setCountryFailure] = useState(false)
    const [limit, setLimit] = useState(100);
    const [inputValue, setInputValue] = useState('')
    const [countryValue, setCountryValue] = useState('')
    const [stringPercentArray, setStringPercentArray] = useState(() => {
        fetch(`${mainserver}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}&closest&nothing`)
            .then(data => data.json())
            .catch(e => console.error(e.message))
            .then((json) => {
                setStringPercentArray(json["dcList"]);
            });
        return null;
    })
    
    const [allCities, setAllCities] = useState()

 

    useEffect(() => {
        setAllCities(
                () => {
                    if (stringPercentArray == null) {
                        return (
                            <div className='progress-extra container-fluid d-flex align-items-center justify-content-center m-5 p-5'>
                                <CircularProgress />
                            </div> 
                        )
                        
                    }
                    else {
                        let allCitiesReturn = []
                        let iterator = 0
                        while (iterator < limit) {
                            allCitiesReturn.push(
                                <Card infoArray = {stringPercentArray[iterator]} params = {userLocation}/>
                            )
                            iterator++
                        }
                        return allCitiesReturn;
                    }
                    
                }
            )
        
    }, [stringPercentArray, limit])


    return (
        <div id="locations">
            <Layout userLoc={userLocation} specific="Locations"/>
            
            <Intro />
            

                <div className="container-fluid p-4">
                <div className='row gx-5'>
                        <div id="locationInput" className='col-lg-3 loc'>
                        <TextField
                        inputProps={{enterKeyHint: "done"}}
                        helperText={cityFailure ? "Error, invalid characters" : (citySubmitted ? "Submitted!" : "Search a city, then press enter")}
                        color={cityFailure ? 'error' : (citySubmitted ? 'success' : 'primary')}
                            label="City"
                            variant= 'outlined'
                            placeholder='Search +39,000 cities'
                            value={inputValue}
                            
                            onKeyDown={e => {
                                if (e.key == "Enter") {
                                    if ((() => {
                                        for (let character of inputValue) {
                                            if (!valid_chars.includes(character)) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    })()) {
                                        setCityFailure(true)
                                        setTimeout(() => {
                                            setCityFailure(false);
                                        }, 2000)
                                    }
                                    else {
                                        setCitySubmitted(true);
                                        setTimeout(() => {
                                            setCitySubmitted(false);
                                        }, 2000)
                                        fetch(`${mainserver}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}&city&${encodeURIComponent(inputValue)}`)
                                        .then(data => data.json())
                                        .catch(e => console.error(e.message))
                                        .then((json) => {
                                            setStringPercentArray(json["dcList"]);
                                        });
                                    }
                                    setInputValue('')
                                }
                            }}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                            }}>

                        </TextField>
                        </div>
                        
                        <div id="countryInput" className='col-lg-3 con'>
                        <TextField
                            inputProps={{enterKeyHint: "done"}}
                            helperText={countryFailure ? "Error, invalid characters" : (countrySubmitted ? "Submitted!" : "Search a country, then press enter")}
                            color={countryFailure ? 'error' : (countrySubmitted ? 'success' : 'primary')}
                            placeholder='Search by country'
                            label="Country"
                            variant= 'outlined'
                            value={countryValue}
                            onKeyDown={e => {
                                if (e.key == "Enter") {

                                    if ((() => {
                                        for (let character of countryValue) {
                                            if (!valid_chars.includes(character)) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    })()) {
                                        setCountryFailure(true)
                                        setTimeout(() => {
                                            setCountryFailure(false);
                                        }, 2000)
                                    }
                                    else {
                                        setCountrySubmitted(true);
                                        setTimeout(() => {
                                            setCountrySubmitted(false);
                                        }, 2000)
                                        fetch(`${mainserver}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}&country&${encodeURIComponent(countryValue)}`)
                                            .then(data => data.json())
                                            .catch(e => console.error(e.message))
                                            .then((json) => {
                                                setStringPercentArray(json["dcList"]);
                                            });
                                    }
                                    setCountryValue('')
                                }
                            }}
                            onChange={(e) => {
                                setCountryValue(e.target.value)
                            }}>

                        </TextField>
                        </div>
                        
                    <div className='col-lg-2 but'>
                        <Selector  setValue = {setStringPercentArray} currentValue = {stringPercentArray} mainserver = {mainserver} userLocation = {userLocation}/>

                    </div>
                    <div className='col-lg-4 slid'>
                        <SliderMain setLimit = {setLimit} limit={limit} />

                    </div>
                    </div>
                </div>
            <div id="locationsContainer" className="py-4 container-fluid">
                {allCities}
            </div>
            {/*39187*/}
        </div>
    );


}
/*
  
 
*/

const SliderMain = (props) => {

    return (
        <div className='location-slider'>
            <div className='location-slider-desc'>
                Locations Displayed
            </div>
            
                <Slider 
                
                size="medium"
                min={10}
                max={1000}
                defaultValue={props.limit} 
                value={props.limit}
                valueLabelDisplay="on"
                onChange={(e) => {
                    props.setLimit(e.target.value); 
                }
                }/>   
            
        </div>
        
    )
    
}


const Selector = (props) => {
    return (
        <div className='selector'>
            <Button size="large" variant="contained" onClick={() =>{

                fetch(`${props.mainserver}/allDistance/${props.userLocation.substring(0, props.userLocation.indexOf(','))}&closest&nothing`)
                .then(data => data.json())
                .catch(e => console.error(e.message))
                .then((json) => {
                    let iteratorVal = -1;
                    props.setValue(props.currentValue.map((item) => {
                        iteratorVal++;
                        const current = json["dcList"][iteratorVal];
                        return [current[0], current[1], current[2], current[3], current[4], current[5], current[6]];
    
                        }))
                    });
                }}>
                closest
            </Button>
            <Button size="large" variant='contained' onClick={() =>{
                fetch(`${props.mainserver}/allDistance/${props.userLocation.substring(0, props.userLocation.indexOf(','))}&farthest&nothing`)
                .then(data => data.json())
                .catch(e => console.error(e.message))
                .then((json) => {
                    let iteratorVal = -1;
                    props.setValue(props.currentValue.map((item) => {
                        iteratorVal++;
                        const current = json["dcList"][iteratorVal];
                        return [current[0], current[1], current[2], current[3], current[4], current[5], current[6]];
    
                        }))
                    });
                }}>
                farthest
            </Button>
        </div>
    )
}

const Intro = (props) => {
    return (
        <div className='d-flex flex-column gap-3 container pb-4'>
            <div className='container mt-4 py-2 intro-desc'>
                Welcome to the Locations Page!
            </div>
            <div className='container mt-4 py-2 intro-desc'>
                Here you can search through more than 39,000 cities and areas, either by city or country (not both).
            </div>
            <div className='container mt-4 py-2 intro-desc'>
                Click the closest or farthest button to get the closest or farthest locations from you!
            </div>
            <div className='container mt-4 py-2 intro-desc'>
                To reset your location, simply go back to the home page and select another one.
            </div>
            
        </div>
        
    )
}

const Card = (props) => {
    const arr = props.infoArray;
    const userLocation = props.params;
    return (
        <Link className={`cityLink ${arr[5]}`} to={`/location/${arr[0]}, ${arr[2]}&${userLocation}`}>
            <div style={{ color: arr[4], fontWeight: "bolder", backgroundColor: "rgb(30, 30, 30)"}} className={`distanceFromHome`}> {arr[3]} km
            </div>
            
            <div className={`loc-link ${arr[6]}`}>{arr[0]}, <br /> {arr[2]}
            </div> 
            
            <img className="flag" src={cityFlags[arr[2]]} alt='Flag Unavailable'>
            </img>
        </Link>
    )

}
export default Locations;
