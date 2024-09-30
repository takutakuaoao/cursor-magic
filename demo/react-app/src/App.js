import logo from "./logo.svg";
import "./App.css";
import ReactCursorMagic from "cursor-magic/react";

function App() {
  return (
    <div className="App">
      <ReactCursorMagic
        cursorStyle={{
          backgroundColor: "#b02d2de3",
          border: "solid 2px #000000",
          zIndex: "100",
        }}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
