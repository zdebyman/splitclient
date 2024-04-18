import React, { useContext, useReducer } from "react";

//////////////////////
// INITIAL STATE
//////////////////////

const initialState = {
  //url: "https://splitbackend-125e8fa10c4d.herokuapp.com/",
  url: "http://127.0.0.1:3000",
  token: null,
  username: null,
  notes: null,

  new: {
    title: "",
    body: "",

    total_amount: "10",
    description: "init des",
    date: "2024-04-17",
    payer_id: "1",
    splits_attributes: [
      {"payee_id": 2, "value": 2.2}, 
      {"payee_id": 1, "value": 1.1},
      {"payee_id": 3, "value": 3.3}
    ],

    split_type: "amount", // or "percentage"
  },

  edit: {
    id: 0,
    title: "",
    body: "",
  },
};

///////////////////////
// REDUCER
///////////////////////
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "auth":
      newState = { ...state, ...action.payload };
      return newState;
      break;
    case "logout":
      newState = { ...state, token: null, username: null };
      window.localStorage.removeItem("auth");
      return newState;
      break;
    case "getNotes":
      newState = { ...state, notes: action.payload };
      return newState;
      break;
    case "getUsers":
      newState = { ...state, users: action.payload };
      return newState;
      break;
    case "getUser":
      newState = { ...state, user: action.payload };
      return newState;
      break;
    case "select":
      newState = { ...state, edit: action.payload };
      return newState;
      break;
    default:
      return state;
      break;
  }
};

////////////////////
// AppContext
////////////////////
const AppContext = React.createContext(null);

////////////////////
// AppState Component
////////////////////
export const AppState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

////////////////////
//useAppState hook
////////////////////

export const useAppState = () => {
  return React.useContext(AppContext);
};
