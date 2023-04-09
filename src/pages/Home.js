import { useState } from 'react';
import './Home.css';
import { Outlet, Link } from "react-router-dom";
const cities = require("./locations/world_cities.json");
const stringSimilarity = require("string-similarity");

function Home() {

    const [isSelected, setIsSelected] = useState(false);

    const [userLocation, setUserLocation] = useState('')
    const [cityVal, setCityVal] = useState('')
    const [countryVal, setCountryVal] = useState('')



    const [locationList, setLocationList] = useState(() => {
        const maxCitiesAvailable = 0;
        console.log("maxCitiesAvailable is " + maxCitiesAvailable);
        let allCitiesReturn = []
        let maxCitiesDisplayed = 0;
        for (let property in cities) {
            if (maxCitiesDisplayed > maxCitiesAvailable + 1000) {
                break;
            }
            else if (maxCitiesDisplayed > maxCitiesAvailable) {
                
                allCitiesReturn.push(<li onClick={() => {
                    setUserLocation(`${property}, ${cities[property]["country"]}`)
                    setIsSelected(true)
                }
            }> {property}, {cities[property]["country"]}</li>);
            // maxCitiesDisplayed++;
            }
            maxCitiesDisplayed++;

        }
        console.log(maxCitiesDisplayed)
        return allCitiesReturn;
        }
    )

    const [stringPercentArray, setStringPercentArray] = useState(() => {
        let allStringPercentReturn = []
        for (let property in cities) {
            allStringPercentReturn.push([property, 0, cities[property]["country"]]);
        }
        console.log(allStringPercentReturn)
        return allStringPercentReturn;
    })

    return (
        /*
        onResize={() => {
            const resolution = (window.screen.width)/(window.screen.height) 
            if (resolution < 1) {
                document.getElementsByClassName("main-search-bar")[0].placeholder = "Enter your city and country";
            }
            document.getElementsByClassName("main-search-bar")[0].placeholder = ""
        }} 
        */
        <div className="Home">
            <div className="main-search">
                
            
                <div className="main-search-title">
                    Eco<br></br>Ventures
                </div>
                <div className="main-search-text">
                    Here to provide the best, cost-effective, eco friendly vacation areas.
                </div>
                
                <div className="main-search-bar">
                    <textarea 
                    className="main-search-bar-input" 
                    placeholder='Enter the city, country you live in'
                    value={userLocation}
                    onChange={(e) => {
                        setUserLocation(e.target.value)
                        setIsSelected(false)
                        setStringPercentArray(stringPercentArray.map(item => {
                        //    console.log(`${item[0]}, ${item[2]}`)
                            return [item[0], stringSimilarity.compareTwoStrings(e.target.value.toLowerCase(), item[0].toLowerCase() + ", " + item[2].toLowerCase()), item[2]];
                        }).sort((a, b) => {
                            return b[1] - a[1]
                        }))
                        setLocationList(() => {
                            let newList = []
                                let iterator = 0
                                for (const element of stringPercentArray) {
                                    if (iterator > 1000) {
                                        break;
                                    }
                                    let cityCountryPair = `${element[0]}, ${element[2]}`;
                                    //console.log(element[0] + " " + element[2])
                                    
                                    if (cityCountryPair.toLowerCase().includes(e.target.value.toLowerCase())) {
                                       // console.log(element[0] + " " + element[2]);
                                      // console.log(cityCountryPair)
                                      console.log(cityCountryPair)
                                      let startIndex = cityCountryPair.toLowerCase().indexOf(e.target.value.toLowerCase());
                                      let endIndex = cityCountryPair.toLowerCase().indexOf(e.target.value.toLowerCase()) + e.target.value.length;

                                        newList.push(<li onClick={() => {
                                            setUserLocation(cityCountryPair)
                                            setIsSelected(true);
                                        }}>{cityCountryPair.substring(0, startIndex)}<span style={{color: 'darkorchid'}}>{cityCountryPair.substring(startIndex, endIndex)}</span>{cityCountryPair.substring(endIndex)}</li>)
                                    }
                                    iterator++;
                                }
                                return newList;
                            }
                        )
                        
                    }}
                    >
                    </textarea>
                    <ul className='listOfLocations'>
                        {locationList}
                    </ul>
                    <button className="main-search-bar-button" onClick={() => {
                        if (isSelected) {
                            window.location.href = `locations/${userLocation}`
                        }
                        else if (userLocation == "") {
                            alert("No location chosen at all, setting location to Tokyo, Japan")
                            window.location.href ="locations/nothing"
                        }
                            else {
                                alert("Error: location not selected, please search for your location again")
                                setUserLocation("");
                            }
                        
                    }}>Find Locations Now</button>
                    
                </div>
            </div>

            
            
            
        </div>
        
        
    );
}


export default Home;
