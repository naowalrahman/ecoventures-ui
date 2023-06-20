import React from 'react';
import Layout from "./Layout";
import { useParams } from 'react-router-dom';

const ContactUs = () => {

  const {userLocation} = useParams();
  return (
    <div>
    <Layout userLoc={userLocation} specific = "ContactUs"/>
    
      <h1>ContactUs</h1>
    </div>
  );
};
  
export default ContactUs;