import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import './Locations.css';
import { Outlet, Link } from 'react-router-dom';
const stringSimilarity = require("string-similarity");
const cities = require("./locations/world_cities.json")

const Locations = () => {
    const [inputValue, setInputValue] = useState('')
    const [countryValue, setCountryValue] = useState('')

    const [allCities, setAllCities] = useState(() => {
        let allCitiesReturn = []
        let maxCitiesDisplayed = 0;
        for (let property in cities) {
            if (maxCitiesDisplayed > 1000) {
                break;
            }
            else {  
                allCitiesReturn.push(<Link className="loc-link" to={`/location/${property}`}> <div className="city">{property}, {cities[property]["country"]}</div></Link>);
                maxCitiesDisplayed++;
            }
        }
        return allCitiesReturn;
    })

    const [stringPercentArray, setStringPercentArray] = useState(() => {
        let allStringPercentReturn = []
        for (let property in cities) {
            allStringPercentReturn.push([property, 0, cities[property]["country"]]);
        }
        return allStringPercentReturn;
    })

    const [date, setDate] = useState('');
    const [aqi, setAqi] = useState('');
    const [gas, setGas] = useState('');

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

    // useEffect(() => {
    //     console.log(typing);

    // }, [typing, trigger])
    return (
        <div id="locations">
            <Layout />

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
                            console.log("incremented typing... typing is " + typing);


                            setStringPercentArray(stringPercentArray.map(item => {

                                return [item[0], stringSimilarity.compareTwoStrings(e.target.value.toLowerCase(), item[0].toLowerCase()), item[2]];
                            }).sort((a, b) => {
                                return b[1] - a[1]
                            }))
                            setAllCities(allCities.map(item => {
                                return <Link className="loc-link" to={`/location/${stringPercentArray[allCities.indexOf(item)][0]}`}><div className="city">{stringPercentArray[allCities.indexOf(item)][0]}, {stringPercentArray[allCities.indexOf(item)][2]}</div></Link>
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

                            console.log("incrementing typing: " + typing)

                            setStringPercentArray(stringPercentArray.map(item => {

                                return [item[0], stringSimilarity.compareTwoStrings(e.target.value.toLowerCase(), item[2].toLowerCase()), item[2]];
                            }).sort((a, b) => {
                                return b[1] - a[1]
                            }))
                            setAllCities(allCities.map(item => {
                                return <Link className="loc-link" to={`/location/${stringPercentArray[allCities.indexOf(item)][0]}`}><div className="city">{stringPercentArray[allCities.indexOf(item)][0]}, {stringPercentArray[allCities.indexOf(item)][2]}</div></Link>
                            }))


                        }}>

                    </input>
                </div>
                <button onClick={() => {
                    fetch(`https://ecoventures-server/location/${inputValue}`, { method: 'GET' })
                        .then(data => data.json())
                        .catch((e) => {
                            console.error(e.message);
                        })
                        .then(json => {
                            console.log(json);
                            setDate(json.date);
                            setAqi(JSON.stringify(json.aqi));
                            setGas(JSON.stringify(json.gas));
                        })
                }}>Submit Location</button>



                {/* <h1>{inputValue}</h1> */}

            </div>
            <h1 className="holder">
                <span id="date-holder">{date}</span>
                <span id="aqi-holder">{aqi}</span>
                <span id="gas-holder">{gas}</span>
            </h1>
            <Animation isVisible={typing > 0} />
            <div id="locationsContainer">
                {allCities}
            </div>

        </div>
    );


}

const Animation = (props) => {

    const [opacityState, setOpacity] = useState(0);
    useEffect(() => {
        console.log("is running")
        if (props.isVisible) {
            setTimeout(() => {
                setOpacity(opacityState => Math.min(opacityState + 0.1, 1))
            }, 70)
        }
        else {
            setTimeout(() => {
                setOpacity(opacityState => Math.max(opacityState - 0.1, 0))
            }, 70)

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

export default Locations;