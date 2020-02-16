import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import './App.css';
import AccessControl from './AccessControl.js';

const App = () => {
  const [logInMenuText, setLogInMenuText] = useState("Log In");
  const [logInStatus, setLogInStatus] = useState(0);

  useEffect(() => {

  },[]);
  
  const changeLogInStatus = (status) => {
    if(status === 0) {
      setLogInMenuText("Log In");     
    } else {
      setLogInMenuText("Log Out");
    }
    
    setLogInStatus(status);
  }

  return (
    <Router basename="/bookclub">
      <div className="App">
        MAIN MENU
        
      </div>
      <Link to="/login">{logInMenuText}</Link> 
      <Route path="/login">
        <AccessControl 
          logInStatus = {logInStatus}
          onChangeLogInStatus = {changeLogInStatus} 
        />
      </Route>
    </Router>
    
  );
}

export default App;
