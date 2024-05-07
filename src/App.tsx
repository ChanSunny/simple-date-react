import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  //Variable for displaying date
  const [currentDate, setCurrentDate] = useState("");
  const [nowDate, setNowDate] = useState(new Date())
  const [nodeDate, setNodeDate] = useState(new Date());
  //Variable for refreshing the date
  const [refresh, setRefresh] = useState({num:0});
  const [currentError, setCurrentError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => setNodeDate(data.datetime.slice(0, 19)));
  },[]);

  //Captures data from API every 10 secs
  useEffect(() => {
    (async () => {
      await fetch("https://worldtimeapi.org/api/timezone/America/New_York")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network error");
          }
          else {
            setCurrentError("");
          }
          return response.json();
        })
        .then((json) => setCurrentDate(json.datetime.slice(0,19)))
        .catch((error) => {
          setCurrentError("There was a problem with the Fetch operation");
        });
      setNowDate(new Date());
      const timer = setTimeout(
        () => setRefresh({ num: refresh.num + 1 }),
        10000
      );
      return () => clearTimeout(timer);
    })()
  },[refresh]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Nodejs, Current Date is {nodeDate.toTimeString()}!</p>
        <p>Current Date is {currentDate}</p>
        <p>Now Date is {nowDate.toTimeString()}</p>
        <p>Number of refreshes: {refresh.num}</p>
        <p>Current Error: {currentError}</p>
      </header>
    </div>
  );
}

export default App;
