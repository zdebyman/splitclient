import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../AppState.jsx";

const Nav = (props) => {
  const { state, dispatch } = useAppState();

  return (
    <header>
      <h1>Split</h1>
      <nav>
        {!state.token ? (
          <>
            <Link to="/">
              <div>Home</div>
            </Link>
            <Link to="/auth/signup">
              <div>Signup</div>
            </Link>
            <Link to="/auth/login">
              <div>Login</div>
            </Link>
          </>
        ) : null}
        {state.token ? (
          <>
            <Link to="/Dashboard">
              <div>Dashboard</div>
            </Link>

            <Link to="/balances">
              <div>Balances</div>
            </Link>

            <Link to="/expenses/new">
              <div>Add Expense</div>
            </Link>

            <Link to="/users">
              <div>Users</div>
            </Link>

            <div
              onClick={() => {
                dispatch({ type: "logout" });
                props.history.push("/");
              }}
            >
              Logout
            </div>
          </>
        ) : null}
      </nav>
    </header>
  );
};

export default Nav;
