import './App.css';

function App() {
    return (
        <div className="App">
            <nav>
                <div className="header-container"> 
                    <div className="header-container-left">
                        EcoVacations
                    </div>
                    <div className="header-container-line">

                    </div>
                    <div className="header-container-right">
                        <div>
                            My Favorites
                        </div>
                        <div>
                            Menu
                        </div>
                        <div>
                            About Us
                        </div>
                        <div>
                            Account Name
                        </div>
                    </div>
                </div>
            </nav>
            <div className="main-search">
                <div className="main-search-title">

                </div>
                <div className="main-search-text">

                </div>
                <div className="main-search-bar">

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
