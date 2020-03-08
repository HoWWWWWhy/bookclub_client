import React, { useState, useEffect } from "react";

import "./App.css";
import AppRouter from "./AppRouter";
import Store from "../store";

import firebase from "../firebase";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

//temporary test booklist
//const booklist = ["서툰 감정", "내 생애의 아이들", "예감은 틀리지 않는다"];

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

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    console.log("App Mounted");
    const getBooks = async () => {
      const db = firebase.firestore();
      const books = await db.collection("books").get();
      books.docs.map(doc => console.log(doc.data()));

      setBookList(books.docs.map(doc => doc.data()["title"]));
    };

    getBooks();
  }, []);

  const { status, text } = logIn;

  const providerValues = {
    logIn,
    setLogIn,
    bookList
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
