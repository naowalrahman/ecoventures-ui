import React, {useState} from 'react';
import Layout from "./Layout";
import './Locations.css'
const stringSimilarity = require("string-similarity");

const cities = require("./locations/world_cities.json")


const Locations = () => {

    const [inputValue, setInputValue] = useState('')

    const [allCities, setAllCities] = useState(() => {
        let allCitiesReturn = []
        for (let property in cities) {
           allCitiesReturn.push(<div className="city">{property}</div>);
           
        }
        console.log(allCitiesReturn.length)
           return allCitiesReturn;
    })
    const [stringPercentArray, setStringPercentArray] = useState(() => {
        let allStringPercentReturn = []
        for (let property in cities) {
            allStringPercentReturn.push([property, 0]);
        }
        return allStringPercentReturn;
    })

    return (
        <div id="locations">
            <Layout />
            <h1>Locations Page Works</h1>
            <div id="inputArea">
                <label for="locationInput">Location:</label>
                
                <input 
                    id="locationInput" 
                    placeholder='Search through over 39,000 locations'
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        setStringPercentArray(stringPercentArray.map(item => {
                            return[item[0], stringSimilarity.compareTwoStrings(e.target.value, item[0])];
                        }).sort((a,b) => {
                            return b[1]-a[1]
                        }))
                        setAllCities(allCities.map(item => {
                            return <div className="city">{stringPercentArray[allCities.indexOf(item)][0]}</div>
                        }))
                        console.log(e.target.value + " vs " + stringPercentArray[0])
                    }}>
                        
                </input>
                <button onClick={callAPI}>Submit Location</button> 
            </div>

            <h1 className="holder"> 
                <span id="date-holder"></span>
                <span id="aqi-holder"></span>
                <span id="gas-holder"></span> 
            </h1>
            <h1>{inputValue}</h1>
            <div id="locationsContainer">
                {allCities}    
            </div>            
        </div>
    ); 
};

// var date = "";
// var aqi = "";
// var gas = "";
function callAPI() {
    const locationSubmission = document.getElementById("locationInput").value;
    fetch(`https://ecoventures-server.vercel.app/location/${locationSubmission}`, { method: 'GET' })
        .then(data => data.json())
        .then(json => { 
            console.log(json);
            document.getElementById("date-holder").innerHTML = json.date;  
            document.getElementById("aqi-holder").innerHTML = JSON.stringify(json.aqi);
            document.getElementById("gas-holder").innerHTML = JSON.stringify(json.gas);
        });
}
document.body.addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
        callAPI();
    }
    
})
// function mergeSort(array) { // returns array
//     if (array.length == 1) {
//         return array;
//     }
//     else {
//         // split array, call merge sorts on those arrays, and then merge theM
//         let leftSide = splitL(array);
//         let rightSide = splitR(array);
//         let destination = merge(mergeSort(leftSide), mergeSort(rightSide));
    
//         return destination;
//     }
// }

// function splitL(data) { // returns array
//     let splitLeftEnd = [];

//     for (let i = 0; i < Math.floor(data.length/2); i++) {
//         splitLeftEnd.push(data[i]);
//     }
//     return splitLeftEnd;
// }

// function splitR(data) { //returns array
//     let splitRightEnd = [];
//     // if (data.length % 2 == 0) {
//     //     splitRightEnd = new int[data.length/2];
//     // }
//     // else {
//     //     splitRightEnd = new int[data.length/2+1];
//     // }
//     for (let i = Math.floor(data.length/2); i < data.length; i++) {
//         splitRightEnd.push(data[i]);
//     }
//     return splitRightEnd;
// }

// function merge(left, right) { //returns array
//     let destination = []; //leftlength + right length
//     let generalIncrement = 0;
//     let leftIncrement = 0;
//     let rightIncrement = 0;
//     while(leftIncrement < left.length && rightIncrement < right.length && generalIncrement < (left.length + right.length)) {
//         console.log(left);
//         console.log(right);
//         if (left[leftIncrement][1] >= right[rightIncrement][1]) {
//             destination.push(right[rightIncrement]);
//             rightIncrement++;
//         }
//         else {
//             destination.push(left[leftIncrement]);
//             leftIncrement++;
//         }
//         generalIncrement++;
//     }

//     if (leftIncrement < left.length) {
//         for (let i = leftIncrement; i < left.length; i++) {
//             destination.push(left[i]);
//             generalIncrement++;
//         }
//     }
//     else if (rightIncrement < right.length) {
//         for (let i = rightIncrement; i < right.length; i++) {
//             destination.push(right[i]);
//             generalIncrement++;
//         }
//     }

//     return destination;

// }

export default Locations;