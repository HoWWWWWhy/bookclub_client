import React, { useState, useEffect } from "react";

import "./App.css";
import AppRouter from "./AppRouter";
import Store from "../store";

const booklist = ["서툰 감정", "내 생애의 아이들", "Night Flight"];

const checkLogInStatus = () =>
  JSON.parse(localStorage.getItem("currentUserInfo"));

const App = () => {
  const [logIn, setLogIn] = useState(() => {
    const currentUser = checkLogInStatus();

    if (currentUser) {
      return {
        status: true,
        text: "Log Out",
        userInfo: currentUser
      };
    } else {
      return {
        status: false,
        text: "Log In",
        userInfo: ""
      };
    }
  });

  useEffect(() => {
    console.log("App Mounted");
  }, []);

  const { status, text } = logIn;

  const providerValues = {
    logIn,
    setLogIn,
    bookList: booklist
  };

  return (
    <>
      <h1 className="banner">Book Club</h1>
      <Store.Provider value={providerValues}>
        <AppRouter logInStatus={status} logInMenuText={text} />
      </Store.Provider>
    </>
  );
};

export default App;
