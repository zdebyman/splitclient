import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { App } from "./components/App.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppState } from "./AppState.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppState>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </AppState>
)
