import './Home.css';
import { Outlet, Link } from "react-router-dom";

function Home() {
    return (
        
        <div className="Home">
            <div className="main-search-background"></div>
            <div className="main-search">
                {/* <div className="header-container"> 
                    <div className="header-container-left">
                        EcoVacations
                    </div>
                    <div className="header-container-line">

                    </div>
                    <div className="header-container-right">
                        <div>
                            Locations
                        </div>
                        <div>
                            About Us
                        </div>
                        <div>
                            Contact Us
                        </div>
                    </div>
                </div> */}
            
                <div className="main-search-title">
                    Eco<br></br>Ventures
                </div>
                <div className="main-search-text">
                    Here to provide the best, cost-effective, eco friendly vacation areas.
                </div>
                <div className="main-search-bar">
                    <button className="main-search-bar-button" onClick={send}>Find Locations Now</button>
                    
                </div>
            </div>

            
            
            
        </div>
        
        
    );
}
function send() {
    window.location.href = "locations";
}
/* <header className="App-header">
                <button onClick={callApi}>Call API</button>
                <p id="first-paragraph"></p>
                <p>Hello world!</p>
            </header> */
// function callApi() {
//     fetch('http://localhost:3001/details', { method: 'GET' })
//         .then(data => data.json())
//         .then(json => (document.getElementById("first-paragraph").innerHTML = json["data"]))
// }

export default Home;
