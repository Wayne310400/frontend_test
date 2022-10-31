import React from "react";
import logo from "./logo.svg";
import Axios from 'axios';
import "./App.css";
import FHIR from "fhirclient"
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState([]);

  const onSubmit = (e) => {
    fetch('http://hapi.fhir.org/baseR4/Patient/45276')
    .then((res) => res.json())
    .then((data) => {
       console.log(data);
       setPosts(data);
       setData(data.resourceType);
    })
    .catch((err) => {
       console.log(err.message);
    });
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