import React from "react";
import { useAppState } from "../AppState.jsx";
import { useParams } from "react-router-dom";

const User = () => {
  const { state, dispatch } = useAppState();
  const { token, url, user } = state;
  const { id } = useParams();

  const getUser = async () => {
    const response = await fetch(`${url}/users/${id}`, {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const fetchedUser = await response.json();
    dispatch({ type: "getUser", payload: fetchedUser });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const loaded = () => {
    return (
      <div className="user">
        <h1>{user.username} id: {user.id}</h1>
      </div>
    );
  };

  return user ? loaded() : <h1>Loading...</h1>;
};

export default User