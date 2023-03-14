import './App.css';

function App() {
    return (
        <div className="App">
            <div className="main-search">
                <div className="header-container"> 
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
                </div>
            
                <div className="main-search-title">
                    Eco<br></br>Ventures
                </div>
                <div className="main-search-text">
                    Here to provide the best, cost-effective, eco friendly vacation areas.
                </div>
                <div className="main-search-bar">
                    <button>Find Locations Now</button>
                </div>
            </div>



            {/* <header className="App-header">
                <button onClick={callApi}>Call API</button>
                <p id="first-paragraph"></p>
                <p>Hello world!</p>
            </header> */}
        </div>
    );
}

// function callApi() {
//     fetch('http://localhost:3001/details', { method: 'GET' })
//         .then(data => data.json())
//         .then(json => (document.getElementById("first-paragraph").innerHTML = json["data"]))
// }

export default App;
