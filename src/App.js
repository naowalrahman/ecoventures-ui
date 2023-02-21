import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={callApi}>Call API</button>
                <p id="first-paragraph"></p>
                <p>Hello world!</p>
            </header>
        </div>
    );
}

function callApi() {
    fetch('http://localhost:3001/details', { method: 'GET' })
        .then(data => data.json())
        .then(json => (document.getElementById("first-paragraph").innerHTML = json["data"]))
}

export default App;
