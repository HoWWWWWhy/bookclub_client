import React, { useState, useEffect } from "react";

import "./App.css";
import AppRouter from "./AppRouter";
import Store from "../store";

const checkLogInStatus = () => localStorage.getItem("currentUserName");

const App = () => {
  const [logIn, setLogIn] = useState(() => {
    const currentUser = checkLogInStatus();
    if (currentUser) {
      return {
        status: true,
        text: "Log Out",
        username: currentUser
      };
    } else {
      return {
        status: false,
        text: "Log In",
        username: ""
      };
    }
  });

  useEffect(() => {
    console.log("App Mounted");
  }, []);

  const changeLogInStatus = (status, username) => {
    console.log("login status:", status);
    if (status) {
      setLogIn({
        status,
        text: "Log Out",
        username
      });
    } else {
      setLogIn({
        status,
        text: "Log In",
        username
      });
    }
  };

  const { status, text } = logIn;

  return (
    <>
      <h1 className="banner">Book Club</h1>
      <Store.Provider value={logIn}>
        <AppRouter
          logInStatus={status}
          logInMenuText={text}
          onChangeLogInStatus={changeLogInStatus}
        />
      </Store.Provider>
    </>
  );
};

export default App;
