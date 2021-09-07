import React from "react";
import Header from "../components/header/header";
import Nodes from "../components/nodes/nodes";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
      </header>
      <div className="app-content">
        <Nodes></Nodes>
      </div>
    </div>
  );
}

export default App;
