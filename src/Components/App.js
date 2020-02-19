import React, { useState, useEffect }  from 'react';

import './App.css';
import AppRouter from './AppRouter.js';

const App = () => {
  
  //const [logInStatus, setLogInStatus] = useState(false);
  //const [logInMenuText, setLogInMenuText] = useState("Log In");
  const [logIn, setLogIn] = useState({
    status: false,
    text: "Log In",
    username: ""
  });
  //setUserRequest({ loading: true });
  //const { loading, user } = userRequest;

  useEffect(() => {
    console.log("App.js");
  });

  const changeLogInStatus = (status, username) => {
    console.log("login status:", status);
    if(status) {
      //setLogInMenuText("Log Out");   
      setLogIn({
        status,
        text: "Log Out",
        username
      });  
    } else {
      //setLogInMenuText("Log In");
      setLogIn({
        status,
        text: "Log In",
        username
      }); 
    }
    
    //setLogInStatus(status);
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
