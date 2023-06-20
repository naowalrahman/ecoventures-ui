import { useEffect, useState } from 'react';
import './Home.css';
import {InputLabel, TextField} from '@mui/material'
const cities = require("./locations/world_cities.json");
const stringSimilarity = require("string-similarity");

function Home() {

    const [isSelected, setIsSelected] = useState(false);

    const [userLocation, setUserLocation] = useState('')



    const [stringPercentArray, setStringPercentArray] = useState(() => {
        let allStringPercentReturn = []
        for (let property in cities) {
            allStringPercentReturn.push([property, 0, cities[property]["country"]]);
        }
        return allStringPercentReturn;
    })
    const [locationList, setLocationList] = useState(() => {
        const interval = 200
        const start = Math.floor(Math.random() * (39000 - interval));
        let allCitiesReturn = []
        let iterator = 0
        for (const element of stringPercentArray) {
            if (iterator > 1000) {
                break;
            }
            let cityCountryPair = `${element[0]}, ${element[2]}`;
                allCitiesReturn.push(<li onClick={() => {
                    setUserLocation(cityCountryPair);
                    setIsSelected(true);
                }}>{cityCountryPair}</li>)
            }
            iterator++;
            return allCitiesReturn;
        })
    useEffect(() => {
        setLocationList(() => {
            let newList = []
            let iterator = 0
            for (const element of stringPercentArray) {
                if (iterator > 1000) {
                    break;
                }
                let cityCountryPair = `${element[0]}, ${element[2]}`;
                //console.log(element[0] + " " + element[2])

                if (cityCountryPair.toLowerCase().includes(userLocation.toLowerCase())) {
                    // console.log(element[0] + " " + element[2]);
                    // console.log(cityCountryPair)
                    // console.log(cityCountryPair)
                    let startIndex = cityCountryPair.toLowerCase().indexOf(userLocation.toLowerCase());
                    let endIndex = cityCountryPair.toLowerCase().indexOf(userLocation.toLowerCase()) + userLocation.length;

                    newList.push(<li onClick={() => {
                        setUserLocation(cityCountryPair)
                        setIsSelected(true);
                    }}>{cityCountryPair.substring(0, startIndex)}<span style={{ color: 'darkorchid', fontWeight: "bolder" }}>{cityCountryPair.substring(startIndex, endIndex)}</span>{cityCountryPair.substring(endIndex)}</li>)
                }
                iterator++;
            }
            return newList;
        }
        )
    }, [stringPercentArray])
    

    return (

        <div className="Home">
            <div className="main-search">


                <div className="main-search-title">
                    Eco<br></br>Ventures
                </div>
                <div className="main-search-text">
                    Here to provide the best, cost-effective, eco friendly vacation areas.
                </div>

                <div className="main-search-bar">
                    <InputLabel shrink={false} />
                    <TextField
                        variant='filled'
                        color='secondary'
                        label="Location"
                        className="main-search-bar-input"
                        placeholder='Enter the [city, country] you live in'
                        value={userLocation}
                        onChange={(e) => {
                            setUserLocation(e.target.value)
                            setIsSelected(false)
                            setStringPercentArray(stringPercentArray.map(item => {
                                //    console.log(`${item[0]}, ${item[2]}`)
                                return [item[0], stringSimilarity.compareTwoStrings(userLocation.toLowerCase(), item[0].toLowerCase() + ", " + item[2].toLowerCase()), item[2]];
                            }).sort((a, b) => {
                                return b[1] - a[1]
                            }))
                            

                        }}
                    >
                    </TextField>
                    <ul className='listOfLocations'>
                        {locationList}
                    </ul>
                    <button className="main-search-bar-button" onClick={() => {
                        if (isSelected) {
                            window.location.href = `locations/${userLocation}`
                        }
                        else if (userLocation == "") {
                            alert("No location chosen at all, setting location to Tokyo, Japan")
                            window.location.href = "locations/Tokyo, Japan"
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
