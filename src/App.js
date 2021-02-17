import React from "react";
import "./App.css";
import Pomodoro from "./pomodoro/Pomodoro";

function App() {
  return (
    <div className="App">
      <div className="container vh-100 d-flex flex-column justify-content-center">
        <div className="row">
          <div className="col">
            <header className="App-header container mb-5">
              <h1>Pomodoro Timer</h1>
            </header>
            <Pomodoro />
          </div>  
        </div>
      </div>
    </div>
  );
}

export default App;
