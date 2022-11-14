import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  //Variable for displaying date
  const [currentDate, setCurrentDate] = useState("");
  //Variable for refreshing the date
  const [refresh, setRefresh] = useState({num:0})

  //Captures data from API every 10 secs
  useEffect(() => {
    fetch('http://worldtimeapi.org/api/timezone/America/New_York')
      .then((response) => response.json())
      .then((json) => setCurrentDate(json.datetime));
    const timer = setTimeout(() => setRefresh({num: refresh.num + 1}), 10000);
    return () => clearTimeout(timer);
  },[refresh]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Current Time is {currentDate}
        </p>
      </header>
    </div>
  );
}

export default App;
