import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import './Locations.css';
import './countryCards.css';
import { useParams } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
const stringSimilarity = require("string-similarity");
const cities = require("./locations/world_cities.json")
const cityFlags = require("./locations/country-flag-true.json")
const countryColors = require("./locations/country-colors-true-single.json")

const Locations = () => {
    

    const {userLocation} = useParams();
    //const [showDist, setShowDist] = useState(true);

    const userLocationCoords = (() => {
        if (userLocation == "nothing") {
            
            return [cities["Tokyo"]["lat"], cities["Tokyo"]["lng"]]
        }
        else {
            const endIndex = userLocation.indexOf(',')
            return [cities[userLocation.substring(0, endIndex)]["lat"], cities[userLocation.substring(0, endIndex)]["lng"]]
        }
    })()

    
    const [inputValue, setInputValue] = useState('')
    const [countryValue, setCountryValue] = useState('')
    
    const [allCities, setAllCities] = useState(() => {
        const interval = 200
        const availableValue = Math.random() * (39000-interval);
        const maxCitiesAvailable = availableValue;
        let allCitiesReturn = []
        let maxCitiesDisplayed = 0;
        let iterator = 0
        for (let property in cities) {
            if (maxCitiesDisplayed > 200) {
                break;
            }
            else if (maxCitiesDisplayed > 0) {
                let bg;
                let txtColor;
                let countryLinkClass;
                let countryTextClass;
                let countryDistClass;
                let color = countryColors[cities[property]["country"]]
                if (color == undefined) {
                    bg = "#FFFFFF"
                    txtColor = "black"
                    countryLinkClass = "generalCountry"
                    countryTextClass = "generalCountryText"
                    countryDistClass = "generalDist"
                    
                }
                else {
                    bg = color[0]
                    txtColor = color[1]
                    countryLinkClass = `${cities[property]["country"]}-country`
                    countryLinkClass = countryLinkClass.replace(" ", '');
                    countryLinkClass = countryLinkClass.replace("(", '');
                    countryLinkClass = countryLinkClass.replace(")", '');
                    countryLinkClass = countryLinkClass.replace("'", '');
                    
    
                    countryTextClass = `${cities[property]["country"]}-text`
                    countryTextClass = countryTextClass.replace(" ", '')
                    countryTextClass = countryTextClass.replace("(", '');
                    countryTextClass = countryTextClass.replace(")", '');
                    countryTextClass = countryTextClass.replace("'", '');

                    countryDistClass = `${cities[property]["country"]}-dist`
                    countryDistClass = countryDistClass.replace(" ", '')
                    countryDistClass = countryDistClass.replace("(", '');
                    countryDistClass = countryDistClass.replace(")", '');
                    countryDistClass = countryDistClass.replace("'", '');
                    
                }
                    
                    //let txt = countryColors[cities[property]["country"]][1]
                    // const txt = countryColors[cities[property]["country"]][1]
                    allCitiesReturn.push(<Link className={`cityLink ${countryLinkClass}`} to={`/location/${property}`}> <div style={{color: returnRGB(getDistanceFromLatLonInKm(userLocationCoords[0], userLocationCoords[1], cities[property]["lat"], cities[property]["lng"]))}} className={`distanceFromHome ${countryDistClass}`}>{getDistanceFromLatLonInKm(userLocationCoords[0], userLocationCoords[1], cities[property]["lat"], cities[property]['lng'])} km</div><div className={`loc-link ${countryTextClass}`}>{property}, <br /> {cities[property]["country"]}</div> <img className="flag" src={cityFlags[cities[property]["country"]]} alt='NOT HERE'></img> </Link>);
                
              

            }
            maxCitiesDisplayed++;

        }
        return allCitiesReturn;
    })

    const [stringPercentArray, setStringPercentArray] = useState(() => {
        let listOfCountries = []
        let allStringPercentReturn = []
        for (let property in cities) {
            let dist = getDistanceFromLatLonInKm(userLocationCoords[0], userLocationCoords[1], cities[property]["lat"], cities[property]["lng"])
            let bg;
            let txtColor;
            let countryLinkClass;
            let countryTextClass;
            let countryDistClass;

            let color = countryColors[cities[property]["country"]]
            if (color == undefined) {
                bg = "#FFFFFF"
                txtColor = "black"
                countryLinkClass = "generalCountry"
                countryTextClass = "generalCountryText"
                countryDistClass = "generalDist"
                
            }
            else {
                bg = color[0]
                txtColor = color[1]
                countryLinkClass = `${cities[property]["country"]}-country`
                countryLinkClass = countryLinkClass.replace(" ", '');
                countryLinkClass = countryLinkClass.replace("(", '');
                countryLinkClass = countryLinkClass.replace(")", '');
                countryLinkClass = countryLinkClass.replace("'", '');
                

                countryTextClass = `${cities[property]["country"]}-text`
                countryTextClass = countryTextClass.replace(" ", '')
                countryTextClass = countryTextClass.replace("(", '');
                countryTextClass = countryTextClass.replace(")", '');
                countryTextClass = countryTextClass.replace("'", '');

                countryDistClass = `${cities[property]["country"]}-dist`
                countryDistClass = countryDistClass.replace(" ", '')
                countryDistClass = countryDistClass.replace("(", '');
                countryDistClass = countryDistClass.replace(")", '');
                countryDistClass = countryDistClass.replace("'", '');
                
            }
            allStringPercentReturn.push([property, 0, cities[property]["country"], dist, returnRGB(dist), countryLinkClass, countryTextClass, countryDistClass]);
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
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return Math.round(d);
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      function returnRGB(distance) {
        const equatedValue = Math.min(distance/35, 510) 
        const darkFactor = 0.9;
        const otherValue = 255 * darkFactor;
        const blueVal = 96 * darkFactor;
        if (equatedValue<=255) {
            return `rgba(${equatedValue * 0.5}, ${otherValue}, ${blueVal}, 1)`
        }
        else {
            return `rgba(${otherValue}, ${(510-equatedValue) * 0.5}, ${blueVal}, 1)`
        }
    }

    return (
        <div id="locations">
            <Layout userLoc={userLocation}/>
            
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
                            setAllCities(allCities.map(item => {
                                
                                return <Link className={`cityLink ${stringPercentArray[allCities.indexOf(item)][5]}`} to={`/location/${stringPercentArray[allCities.indexOf(item)][0]}`}><div style={{color: stringPercentArray[allCities.indexOf(item)][4]}} className={`distanceFromHome ${stringPercentArray[allCities.indexOf(item)][7]}`}> {stringPercentArray[allCities.indexOf(item)][3]} km</div><div className={`loc-link ${stringPercentArray[allCities.indexOf(item)][6]}`}>{stringPercentArray[allCities.indexOf(item)][0]}, <br /> {stringPercentArray[allCities.indexOf(item)][2]}</div> <img className="flag" src={cityFlags[stringPercentArray[allCities.indexOf(item)][2]]} alt='Flag Unavailable'></img></Link>
                               
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
                            setAllCities(allCities.map(item => {
                                
                                return <Link className={`cityLink ${stringPercentArray[allCities.indexOf(item)][5]}`} to={`/location/${stringPercentArray[allCities.indexOf(item)][0]}`}><div style={{color: stringPercentArray[allCities.indexOf(item)][4]}} className={`distanceFromHome ${stringPercentArray[allCities.indexOf(item)][7]}`}> {stringPercentArray[allCities.indexOf(item)][3]} km</div><div className={`loc-link ${stringPercentArray[allCities.indexOf(item)][6]}`}>{stringPercentArray[allCities.indexOf(item)][0]}, <br /> {stringPercentArray[allCities.indexOf(item)][2]}</div> <img className="flag" src={cityFlags[stringPercentArray[allCities.indexOf(item)][2]]} alt='Flag Unavailable'></img></Link>
                                
                               
                        }))}}>

                    </input>
                </div>
                <button onClick={() => {
                    fetch(`https://ecoventures-server.vercel.app/location/${inputValue}`, { method: 'GET' })
                        .then(data => data.json())
                        .catch((e) => {
                            console.error(e.message);
                        })
                        .then(json => {
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
            <div className='backToTopContainer'>
                <Link className='backToTop' to="#locations">Return To Top</Link>
            </div>
        <Outlet />
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

export default Locations;