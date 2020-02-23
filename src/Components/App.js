import React, { useState, useEffect }  from 'react';

import './App.css';
import AppRouter from './AppRouter.js';

const checkLogInStatus = () => localStorage.getItem('currentUserName');

const App = () => {
  
  const [logIn, setLogIn] = useState({
    status: false,
    text: "Log In",
    username: ""
  });

  useEffect(() => {
    console.log("App Mounted");
    const currentUserName = checkLogInStatus();
    if(currentUserName) {
      setLogIn({
        status: true,
        text: "Log Out",
        username: currentUserName
      });  
    }
  },[]);

  const changeLogInStatus = (status, username) => {
    console.log("login status:", status);
    if(status) { 
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

  }

  const { status, text, username } = logIn;

  return (
    <>
      <h1 className="banner">Book Club</h1>
 
      <AppRouter 
        logInStatus = {status}
        logInMenuText = {text}
        onChangeLogInStatus = {changeLogInStatus} 
        userName = {username}
      />
      
    </>
  );
}

export default App;
