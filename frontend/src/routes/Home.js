import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useAuthContext();

  useEffect(() => {
    const getUsers = async () => {
      console.log("Home.js getUsers");
      try {
        const response = await axios.get("/users");
        setUsers(response.data.users);
      } catch (err) {
        console.log(err);
        logout();
      }
    };
    getUsers();
  }, [logout]);
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user._id}>
              Name:{user.name}/Email:{user.email}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
