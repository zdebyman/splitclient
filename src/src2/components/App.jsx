import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav.jsx";
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Users from "../pages/Users.jsx";
import User from "../pages/User.jsx";
import ExpenseForm from "./ExpenseForm.jsx";
import { useAppState } from "../AppState.jsx";

export const App = (props) => {
  const { state, dispatch } = useAppState();
  React.useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth) {
      dispatch({ type: "auth", payload: auth });
      props.history.push("/users");
    } else {
      props.history.push("/");
    }
  }, []);

  return (
    <>
      <Route path="/" component={Nav}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth/:form" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users/:id" component={User} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/expenses/:action" component={ExpenseForm} />
      </Switch>
    </>
  );
};
