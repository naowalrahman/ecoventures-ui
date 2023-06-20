import React from 'react';
import Layout from "./Layout";
import { useParams } from 'react-router-dom';

const AboutUs = () => {
  
  const {userLocation} = useParams();
  return (
    <div>
    <Layout userLoc={userLocation} specific = "Credits"/>
    
      <h1>Credits</h1>
    </div>
  );
};
  
export default AboutUs;