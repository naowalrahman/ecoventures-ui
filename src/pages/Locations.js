import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import {Slider} from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import './cssLocations/locationIntro.css'
import './cssLocations/inputArea.css';
import './cssLocations/Locations.css';
import './cssLocations/selector.css';
import './cssLocations/slider.css';
import './cssLocations/countryCards.css';
import './cssLocations/Progress.css';
import './cssLocations/columns.css'
import styled from 'styled-components'; //utilize later
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const stringSimilarity = require("string-similarity");
const cities = require("./locations/world_cities.json")
const cityFlags = require("./locations/country-flag-true.json")
const countryColors = require("./locations/country-colors-true-single.json")


const Locations = () => {
    const { userLocation } = useParams();

    const interval = 1000
    //const start = Math.floor(Math.random() * (39000 - interval));
    const server = 'https://ecoventures-server.vercel.app';
    //const server = 'http://localhost:3001'; // for dev only

    const [limit, setLimit] = useState(100);
    const [inputValue, setInputValue] = useState('')
    const [countryValue, setCountryValue] = useState('')
    const [stringPercentArray, setStringPercentArray] = useState(() => {
        // console.log(`${server}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}&closest&nothing`);
        fetch(`${server}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}&closest&nothing`)
            .then(data => data.json())
            .catch(e => console.error(e.message))
            .then((json) => {
                let iteratorVal = -1;
                setStringPercentArray(stringPercentArray.map((item) => {
                    iteratorVal++;
                    const current = json["dcList"][iteratorVal];
                    return [current[0], current[1], current[2], current[3], current[4], current[5], current[6]];

                }))
            });

        let allStringPercentReturn = []
        for (let property in cities) {
            let countryLinkClass;
            let countryTextClass;
            countryLinkClass = `${cities[property]["country"]}-country`
                .replace(/ /g, '')
                .replace(/\(/g, '')
                .replace(/\)/g, '')
                .replace(/'/g, '')
                .replace(/\./g, '')
                .replace(/,/g, '');

            countryTextClass = `${cities[property]["country"]}-text`
                .replace(/ /g, '')
                .replace(/\(/g, '')
                .replace(/\)/g, '')
                .replace(/'/g, '')
                .replace(/,/g, '');

            allStringPercentReturn.push([property, 0, cities[property]["country"], 0, "rgba(0,0,0,1)", countryLinkClass, countryTextClass]);
        }
        return allStringPercentReturn;
    })
    const [allCities, setAllCities] = useState(() => {
        let allCitiesReturn = []
        let iterator = 0
        while (iterator < limit) {
            allCitiesReturn.push(
                <Card infoArray = {stringPercentArray[iterator]} params = {userLocation}/>
            )
            iterator++
        }
        return allCitiesReturn;
    })


    useEffect(() => {
        setAllCities(
                () => {
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
            )
        
    }, [stringPercentArray, limit])


    return (
        <div id="locations">
            <Layout userLoc={userLocation} specific="Locations"/>
            
            <Intro finished = {stringPercentArray[0][4]}/>
            

                <div className="container-fluid p-4">
                <div className='row gx-5'>
                        <div className='col-lg-3 loc'>
                        <TextField
                        helperText="Search a city, then press enter"
                        color="success"
                            label="City"
                            variant='outlined'
                            id="locationInput"
                            placeholder='Search over +39,000 cities'
                            value={inputValue}
                            onKeyDown={e => {
                                if (e.key == "Enter") {
                                    fetch(`${server}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}&city&${inputValue}`)
                                    .then(data => data.json())
                                    .catch(e => console.error(e.message))
                                    .then((json) => {
                                        let iteratorVal = -1;
                                        setStringPercentArray(stringPercentArray.map((item) => {
                                            iteratorVal++;
                                            const current = json["dcList"][iteratorVal];
                                            return [current[0], current[1], current[2], current[3], current[4], current[5], current[6]];

                                        }))
                                    });
                                }
                            }}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                            }}>

                        </TextField>
                        </div>
                        
                        <div className='col-lg-3 con'>
                        <TextField
                            
                            helperText="Search a country, then press enter"

                            color='success'
                            id="countryInput"
                            placeholder='Search by country'
                            label="Country"
                            variant='outlined'
                            value={countryValue}
                            onKeyDown={e => {
                                if (e.key == "Enter") {
                                    fetch(`${server}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}&country&${countryValue}`)
                                    .then(data => data.json())
                                    .catch(e => console.error(e.message))
                                    .then((json) => {
                                        let iteratorVal = -1;
                                        setStringPercentArray(stringPercentArray.map((item) => {
                                            iteratorVal++;
                                            const current = json["dcList"][iteratorVal];
                                            return [current[0], current[1], current[2], current[3], current[4], current[5], current[6]];

                                        }))
                                    });
                                }
                            }}
                            onChange={(e) => {
                                setCountryValue(e.target.value)
                            }}>

                        </TextField>
                        </div>
                        
                    <div className='col-lg-2 but'>
                        <Selector  setValue = {setStringPercentArray} currentValue = {stringPercentArray} server = {server} userLocation = {userLocation}/>

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

                fetch(`${props.server}/allDistance/${props.userLocation.substring(0, props.userLocation.indexOf(','))}&closest&nothing`)
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
                fetch(`${props.server}/allDistance/${props.userLocation.substring(0, props.userLocation.indexOf(','))}&farthest&nothing`)
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
            <div className='container intro-desc'>
                Welcome to the Locations Page!
            </div>
            <div className='container intro-desc'>
                Here you can search through more than 39,000 cities and areas, either by city or country (not both).
            </div>
            <div className='container intro-desc'>
                Click the closest or farthest button to get the closest or farthest locations from you!
            </div>
            <div className='container intro-desc'>
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


// if (countryColors[arr[2]][0] == "#fff") {
    //     bgdistreg = "#000";
    //     bgdisthover = "#fff";
    // }
    // else {
    //     bgdistreg = "#fff";
    //     bgdisthover = "#000";
    // }

    // const DistDiv = styled.div`
    // font-weight: 600;
    // background-color: ${bgdistreg};
    // color: ${arr[4]};
    // transition: 0.3s
    // `
    // const LocationLink = styled.div`
    // color: ${countryColors[arr[2]][1]};
    // transition: 0.3s;
    // `

    // const MyLink = styled(Link)`
    // background-color: ${countryColors[arr[2]][0]};
    // &:hover {
    //     background-color: ${countryColors[arr[2]][1]};
	//     transition: 0.3s;
    // }

    // &:hover ${LocationLink} {
    //     color: ${countryColors[arr[2]][0]};
	//     transition: 0.3s;
    // }
    // &:hover ${DistDiv} {
    //     background-color: ${bgdisthover};
    //     transition: 0.3s;
    // }
    // `