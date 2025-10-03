import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GameBoard from "./components/game-board";

function App() {
  return (
    <div className="App">
      <header className="App-header" title="RPSSL">
        <title>RPSSL</title>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <GameBoard />
      </header>
    </div>
  );
}

export default App;
