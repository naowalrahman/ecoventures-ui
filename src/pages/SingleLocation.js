import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleLocation.css';

const SingleLocation = () => {

    const { city } = useParams();
    const [date, setDate] = useState('');
    const [aqi, setAqi] = useState('');
    const [gas, setGas] = useState('');

    const getData = () => {
        fetch(`https://ecoventures-server.vercel.app/location/${city}`)
            .then(data => data.json())
            .catch(e => console.error(e.message))
            .then(json => {
                setDate(json.date);
                setAqi(json.aqi);
                setGas(json.gas);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    window.addEventListener("beforeunload", (event) => { getData(); });


    return (
        <div id="city-info-wrapper">
            <h1>{city}</h1>
            <p>With an air quality index of <span className='city-info'>{aqi}{/* <sub className='city-info-descriptor'>aqi<sup>*</sup></sub>*/}</span>, and an average gas concentration of <span className='city-info'>X (TBA){/*<sub className='city-info-descriptor'>avg gas<sup>*</sup></sub>*/}</span>, this place is <span className='city-info'>something (TBA){/*<sub className='city-info-descriptor'>rec<sup>*</sup></sub>*/}</span> to visit!</p>

            <table id='aqi-desc'>
                <thead>
                    <tr>
                        <th>Qualitative name</th>
                        <th>Index</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Good</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Fair</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Moderate</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Poor</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Very Poor</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SingleLocation;