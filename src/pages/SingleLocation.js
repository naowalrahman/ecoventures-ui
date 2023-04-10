import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import './SingleLocation.css';

const SingleLocation = () => {

    const {city} = useParams();
    const [date, setDate] = useState('');
    const [aqi, setAqi] = useState('');
    const [gas, setGas] = useState('');

    fetch(`https://ecoventures-server.vercel.app/location/${city}`)
        .then(data => data.json())
        .catch(e => console.error(e.message))
        .then(json => {
            setDate(json.date);
            setAqi(json.aqi);
            setGas(json.gas);
        });
    return (
        <div id="city-info-wrapper">
            <h1>{city}</h1>
            <p>With an air quality index of <span className="city-info">{aqi}</span>, and an average gas concentration of <span className="city-info">X (TBA)</span>, this place is <span className="city-info">something (TBA)</span>to visit!</p>
        </div>
    );
};

export default SingleLocation;