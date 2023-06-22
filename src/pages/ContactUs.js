import React from 'react';
import Layout from "./Layout";
import { useParams } from 'react-router-dom';

const ContactUs = () => {

  const {userLocation} = useParams();
  return (
    <div>
    <Layout userLoc={userLocation} specific = "ContactUs"/>
    
      <h1 className='container-fluid p-4'>TBD</h1>
    </div>
  );
};
  
export default ContactUs;