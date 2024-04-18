import React from "react";
import { useAppState } from "../AppState.tsx";
import { Route, Link } from "react-router-dom";

const Users = (props) => {
  const { state, dispatch } = useAppState();
  const { token, url, users, username } = state;

  const getUsers = async () => {
    const response = await fetch(url + "/users/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const fetchedUsers = await response.json();
    dispatch({ type: "getUsers", payload: fetchedUsers });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const loaded = () => {
    return (
      <div className="users">
        <h1>All Users</h1>

        <ul>
          {state.users.map((user) => (
            <Link to={`/users/${user.id}`}>
              <div className="user" key={user.id}>
                <h2>{user.username} id: {user.id}</h2>
              </div>
            </Link>
          ))}
        </ul>

      </div>
    );
  };

  return users ? loaded() : <h1>Loading...</h1>;
};

export default Users