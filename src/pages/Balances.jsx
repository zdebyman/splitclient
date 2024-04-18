import React from "react";
import { useAppState } from "../AppState.jsx";

const Balances = () => {
  const { state, dispatch } = useAppState();
  const { token, url, balances } = state;

  const getBalances = async () => {
    const response = await fetch(url + "/balances", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const fetchedBalances = await response.json();
    dispatch({ type: "getBalances", payload: fetchedBalances });
  };

  React.useEffect(() => {
    getBalances();
  }, [getBalances]);

  const loaded = () => {
    return (
      <div className="users">
        <h1>All Balances</h1>
        <ul>
        {
        balances.map((curr_balance) => (
            <li key={curr_balance.username}>
            {
                curr_balance.balance > 0
                ? `${curr_balance.username} owes $${curr_balance.balance}`
                : `${curr_balance.username} is owed $${Math.abs(curr_balance.balance)}`
            }
            </li>
        ))}
        </ul>
      </div>
    );
  };

  return balances && balances.length > 0 ? loaded() : <h1>Loading...</h1>;
};

export default Balances;
