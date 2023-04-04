import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import './Locations.css'
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
           allCitiesReturn.push(<div className="city">{property}, {cities[property]["country"]}</div>);
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

    const [animationView, setAnimationView] = useState(false);

    const [typing, setTyping] = useState(0.9);
    const [typingPos, setTypingPos] = useState(0);
    // useEffect(() => {
    //     setAnimationView(false);
    //     console.log("setting it false :(")
    // }, [allCities])
    
    useEffect(()=>{
        
        // fix this with settyping pos, and fix the other parts of the code with pos instead of the main setytping
        setTimeout(()=> {
            setTyping(typing-1);
            console.log(typing);
            if (typing > 0) {
                setAnimationView(true);
            }
            else {
                setTyping(0)
                setAnimationView(false);
            }
        }, 2000)
    
    },[typing])

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
                       
                        setTypingPos(0.3)
                        console.log("incrementing typing: " + typing)
                        setStringPercentArray(stringPercentArray.map(item => {
                            
                            return [item[0], stringSimilarity.compareTwoStrings(e.target.value.toLowerCase(), item[0].toLowerCase()), item[2]];
                        }).sort((a,b) => {
                            return b[1]-a[1]
                        }))
                        setAllCities(allCities.map(item => {
                            return <div className="city">{stringPercentArray[allCities.indexOf(item)][0]}, {stringPercentArray[allCities.indexOf(item)][2]}</div>
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
                       
                        setTypingPos(0.3)
                        console.log("incrementing typing: " + typing)

                        setStringPercentArray(stringPercentArray.map(item => {
                            
                            return [item[0], stringSimilarity.compareTwoStrings(e.target.value.toLowerCase(), item[2].toLowerCase()), item[2]];
                        }).sort((a,b) => {
                            return b[1]-a[1]
                        }))
                        setAllCities(allCities.map(item => {
                            return <div className="city">{stringPercentArray[allCities.indexOf(item)][0]}, {stringPercentArray[allCities.indexOf(item)][2]}</div>
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
            {animationView == true ? <Animation /> : null}
            <div id="locationsContainer">
                {allCities}    
            </div>            
        
        </div>
    ); 
    
    
}

const Animation = () => {
    return (
        <div id="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    )
}
// async function finishCall(inputValue) {
//     const data = await callAPI(inputValue);
//     return data;
// }

// function callAPI(inputValue) {
//     console.log("this function ran")
//     if (inputValue == '') {
//         inputValue = "Dhaka";
//     }
//     return new Promise((resolve, reject) => (
//         fetch(`http://localhost:3001/location/${inputValue}`, { method: 'GET' })
//         .then(data => data.json())
//         .then(json => { 
//             console.log(json);
//             return resolve([json.date,JSON.stringify(json.aqi),JSON.stringify(json.gas)]);
//         })
        
//         ))
//     return ;
// };
export default Locations;