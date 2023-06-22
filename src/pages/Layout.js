import { Outlet, Link } from "react-router-dom";
import './cssLayout/Grid.css'
import './cssLayout/Layout.css';
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

const cityFlags = require("./locations/country-flag-true.json")

const urlStrList = ["Home", "Locations", "Credits", "ContactUs", "Location"]
const Layout = (props) => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
        <div className="container-fluid">
            <img width="50px" height="50px" src={require('./images/treeHere.png')} />

            <span className="navbar-brand">EcoVentures</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${props.specific == urlStrList[0] ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${props.specific == urlStrList[1] ? "active" : ""}`} aria-current="page" to={`/locations/${props.userLoc}`}>Locations</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${props.specific == urlStrList[2] ? "active" : ""}`} aria-current="page" to={`/credits/${props.userLoc}`}>Credits</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${props.specific == urlStrList[3] ? "active" : ""}`} aria-current="page" to={`/contactus/${props.userLoc}`}>Contact Us</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${props.specific == urlStrList[4] ? "active" : "disabled"}`} aria-current="page" to={`/location/${props.userLocExtra}`}>
                    {props.userLocExtra == undefined ? "Location To Be Determined" : props.userLocExtra.substring(0, props.userLocExtra.indexOf('&'))}
                </Link>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item d-flex align-items-center">
                    <span> {props.userLoc} </span>
                </li>
                <li className="nav-item spacer">
                    <span>&nbsp;&nbsp;</span>
                </li>
                <li className="nav-item">
                    <img className="iconImage" height="50px" src={cityFlags[props.userLoc.substring(props.userLoc.indexOf(',') + 2)]} />
                </li>
            </ul>
            </div>
            


        </div>
        </nav>

    )

    
  
};

export default Layout;
/*
{/* 
/* <div className="header-container"> 
        <div className="header-container-left">
            <Link className="link" to="/">EcoVacations</Link>
        </div>
        <div className="header-container-line">
          
        </div>
        <div className="header-container-right">
            <div>
                <Link className="link" to={`/locations/${props.userLoc}`}>Locations</Link>
            </div>
            <div>
                <Link className="link" to={`/review/${props.userLoc}`}>Write a Review</Link>
            </div>
            <div>
            <Link className="link" to={`/contactus/${props.userLoc}`}>Contact Us</Link>
                
            </div>
        </div>
    </div>
     

  //  <Outlet />  } 
  */