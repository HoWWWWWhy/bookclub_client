import React, { useState, useEffect }  from 'react';

/*
import './App.css';
import AppRouter from './AppRouter.js';
import AccessControl from '../Routes/AccessControl.js';

const App = () => {
  const [logInMenuText, setLogInMenuText] = useState("Log In");
  const [logInStatus, setLogInStatus] = useState(false);

  useEffect(() => {
  },[]);
  
  const changeLogInStatus = (status) => {
    console.log("login status:", status);
    if(status) {
      setLogInMenuText("Log Out");     
    } else {
      setLogInMenuText("Log In");
    }
    
    setLogInStatus(status);
  }

  return (
    <Router>
        
      <h1 className="banner">Book Club</h1>
      <nav>
        <ul>
          { logInStatus ?
            <li className="menu_right"><Link to="/logout">{logInMenuText}</Link></li> :
            <li className="menu_right"><Link to="/login">{logInMenuText}</Link></li>
          }
          
          <li className="menu_left"><Link to="/create">Write Review</Link></li>
          <li className="menu_left"><Link to="/read">View Reviews</Link></li>

        </ul>
      </nav>
      
      <Switch>
        <Route exact path = "/">
          HOME
        </Route>
        <Route exact path = "/login">
          <AccessControl 
            logInStatus = {logInStatus}
            onChangeLogInStatus = {changeLogInStatus} 
            logOutCmd = {false}
          />
        </Route>
        <Route exact path = "/logout">
          <AccessControl 
            logInStatus = {logInStatus}
            onChangeLogInStatus = {changeLogInStatus} 
            logOutCmd = {true}
          />
          <Redirect from = "/logout" to = "/" />
        </Route>        
      </Switch>
    </Router>
    
  );
}

export default App;
*/