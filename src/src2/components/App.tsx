import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav.tsx";
import Home from "../pages/Home.tsx";
import Auth from "../pages/Auth.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Users from "../pages/Users.tsx";
import User from "../pages/User.tsx";
import ExpenseForm from "./ExpenseForm.tsx";
import { useAppState } from "../AppState.tsx";

export const App = (props) => {
  const { state, dispatch } = useAppState();
  React.useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth) {
      dispatch({ type: "auth", payload: auth });
      props.history.push("/expenses/new");
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
