import React from "react";
import logo from "./logo.svg";
import Axios from 'axios';
import "./App.css";
import FHIR from "fhirclient"

function App() {
  const [data, setData] = React.useState(null);

  const onSubmit = () => {
    Axios.get('http://localhost:8080/')
    .then(res => console.log(res))
    .catch(err => {
      if (err.response.status === 401) {
        //Auth failed
        //Call reentry function
        return;
      }
      return console.log(err)
    })
}

  return (
    <div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <button onClick={onSubmit}>Good</button>
      </header>
    </div>
  );
}

export default App;