import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Template from "./pages/template/Template";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/template">
          <Template></Template>
        </Route>
        <Route path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
