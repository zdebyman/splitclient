import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./src2/components/App.tsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppState } from "./src2/AppState.tsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppState>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </AppState>
)
