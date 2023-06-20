import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Credits from './pages/Credits';
import Locations from './pages/Locations';
import ContactUs from './pages/ContactUs';
import SingleLocation from './pages/SingleLocation';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <BrowserRouter>
    <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="locations/:userLocation" element={<Locations />} />
        <Route path="credits/:userLocation" element={<Credits />} />
        <Route path="contactus/:userLocation" element={<ContactUs />} />
        <Route path="location/:userLocation" element={<SingleLocation />}/>
      </Routes>
    </BrowserRouter>
    
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
