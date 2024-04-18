/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

*/

import React from "react";
import ReactDOM from "react-dom/client";
//import "./styles.css";
import { App } from "./src2/components/App.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppState } from "./src2/AppState.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppState>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </AppState>
)


/*ReactDOM.render(
  <AppState>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </AppState>,
  document.querySelector("#root")
);
*/