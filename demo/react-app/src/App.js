import logo from "./logo.svg";
import "./App.css";
import ReactCursorMagic from "cursor-magic/react";
import Button from "./Button";

function App() {
  return (
    <div className="App">
      <ReactCursorMagic />
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
        <Button />
      </header>
    </div>
  );
}

export default App;
