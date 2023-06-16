import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import './Locations.css';
import './countryCards.css';
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
    // const server = 'https://localhost:3001'; // for dev only

    const [inputValue, setInputValue] = useState('')
    const [countryValue, setCountryValue] = useState('')
    const [stringPercentArray, setStringPercentArray] = useState(() => {
        fetch(`${server}/allDistance/${userLocation.substring(0, userLocation.indexOf(','))}`)
            .then(data => data.json())
            .catch(e => console.error(e.message))
            .then((json) => {
                console.log(json)
                let iteratorVal = -1;
                setStringPercentArray(stringPercentArray.map((item) => {
                    iteratorVal++;
                    return [item[0], item[1], item[2], json["dcList"][iteratorVal][1], json["dcList"][iteratorVal][2], item[5], item[6]];

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
        console.log("finished loop")
        return allStringPercentReturn;
    })
    const [allCities, setAllCities] = useState(() => {
        let allCitiesReturn = []
        let iterator = 0
        while (iterator < interval) {
            allCitiesReturn.push(
                <Card infoArray = {stringPercentArray[iterator]}/>
            )
            iterator++
        }
        console.log("finished all cities")
        return allCitiesReturn;
    })

    useEffect(() => {
        setAllCities(allCities.map(item => {
            return <Card infoArray = {stringPercentArray[allCities.indexOf(item)]} />
        }))
    }, [stringPercentArray])

    const [typing, setTyping] = useState(0);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        setInterval(() => {
            setTyping(typing => {
                if (typing == 0) {
                    setTrigger(trigger => !trigger);
                    return 0;
                }
                else {
                    return Math.max(typing - (typing / 2 + 0.05), 0)
                }
            })

        }, 300)
    }, [])

    return (
        <div id="locations">
            <Layout userLoc={userLocation} />

            <div id="inputArea">
                <div>
                    <label htmlFor="locationInput">City: </label>

                    <input
                        id="locationInput"
                        placeholder='Search through over 39,000 cities'
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            setTyping(typing => typing + 0.2);


                            setStringPercentArray(stringPercentArray.map(item => {
                                return [item[0], stringSimilarity.compareTwoStrings(e.target.value.toLowerCase(), item[0].toLowerCase()), item[2], item[3], item[4], item[5], item[6], item[7]];
                            }).sort((a, b) => {
                                return b[1] - a[1]
                            }))
                           

                        }}>

                    </input>
                </div>
                <div>
                    <label htmlFor="countryInput">Country: </label>

                    <input
                        id="countryInput"
                        placeholder='Search by country'
                        type="text"
                        value={countryValue}
                        onChange={(e) => {
                            setCountryValue(e.target.value)
                            setTyping(typing => typing + 0.2);


                            setStringPercentArray(stringPercentArray.map(item => {

                                return [item[0], stringSimilarity.compareTwoStrings(e.target.value.toLowerCase(), item[2].toLowerCase()), item[2], item[3], item[4], item[5], item[6], item[7]];
                            }).sort((a, b) => {
                                return b[1] - a[1]
                            }))
                            
                        }}>

                    </input>
                </div>
            </div>
            <Animation isVisible={typing > 0} />
            <div id="locationsContainer">
                {allCities}
            </div>
            {/* <div className='backToTopContainer'>
                <Link className='backToTop' id="returnback" to="#inputArea">Return To Top</Link>
            </div> */}
        </div>
    );


}

const Animation = (props) => {

    const [opacityState, setOpacity] = useState(0);
    useEffect(() => {

        if (props.isVisible) {
            setTimeout(() => {
                setOpacity(opacityState => Math.min(opacityState + 0.1, 1))
            }, 50)
        }
        else {
            setTimeout(() => {
                setOpacity(opacityState => Math.max(opacityState - 0.1, 0))
            }, 50)

        }
    }, [props.isVisible, opacityState])

    return (
        <div id="loader" style={{ opacity: opacityState }}>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    )
}

const Card = (props) => {
    const arr = props.infoArray;
    return (
        <Link className={`cityLink ${arr[5]}`} to={`/location/${arr[0]}, ${arr[2]}`}><div style={{ color: arr[4], fontWeight: "bolder" }} className={`distanceFromHome`}> {arr[3]} km</div><div className={`loc-link ${arr[6]}`}>{arr[0]}, <br /> {arr[2]}</div> <img className="flag" src={cityFlags[arr[2]]} alt='Flag Unavailable'></img></Link>
    )

}
export default Locations;