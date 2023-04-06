import React from 'react';
import { useParams } from 'react-router-dom';

const SingleLocation = () => {

    const {city} = useParams();
    
    return (
        <div>
            
            <h1>City is {city}</h1>
        </div>
    );
};

export default SingleLocation;