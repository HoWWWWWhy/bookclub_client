import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import Home from '../Routes/Home.js';
import Create from '../Routes/Create.js';
import Update from '../Routes/Update.js';
import Read from '../Routes/Read.js';
import AccessControl from '../Routes/AccessControl.js';

const LogInRoutes = (props) => {
    console.log("login_routes");
    console.log(props);
    return (
        <>
            <Route exact path = "/" render={
                (myprops) => <Home
                    {...myprops}
                    username = {props.userName}
                />}>
            </Route>
            <Route path = "/home" component={Home}></Route>
            <Route path = "/create" component={Create}></Route>
            <Route path = "/update" component={Update}></Route>
            <Route path = "/read" component={Read}></Route>
            
            <Route exact path = "/logout" render={
                (myprops) => <AccessControl 
                    {...myprops}
                    logInStatus = {props.logInStatus}
                    onChangeLogInStatus = {props.onChangeLogInStatus}
                    logOutCmd = {true}
                />}>
            </Route>     
        </>
    );
}

const LogOutRoutes = (props) => {
    console.log(props)
    console.log("logout_routes");
    return (
        <>
            <Route exact path = "/" render={
                (myprops) => <Home
                    {...myprops}
                    username = {props.userName}
                />}>
            </Route>
            <Route path = "/home" component={Home}></Route>
            <Route path = "/login" render={
                (myprops) => <AccessControl 
                    {...myprops}
                    logInStatus = {props.logInStatus}
                    onChangeLogInStatus = {props.onChangeLogInStatus}
                    logOutCmd = {false}
                />}>
            </Route>
            {/*<Redirect from = "/login" to = "/" />*/}
            

        </>
    );
}

const AppRouter = (props) => {
  console.log(props);
  return (
    <Router>
        <nav>
        <ul>
          { props.logInStatus ?
            <>
            <li className="menu_left"><Link to="/home">HOME</Link></li>
            <li className="menu_left"><Link to="/create">Write</Link></li>
            <li className="menu_left"><Link to="/read">View</Link></li>
            <li className="menu_right"><Link to="/logout">{props.logInMenuText}</Link></li>
            <li className="menu_right"><Link to="/mypage">My Page</Link></li>
            </> :
            <>
              <li className="menu_left"><Link to="/home">HOME</Link></li>
              <li className="menu_right"><Link to="/login">{props.logInMenuText}</Link></li>
            </>
          }

          
          

        </ul>
        </nav>         
    
        <Switch>
            
        { props.logInStatus ? 
            <>
            <LogInRoutes 
                userName = {props.userName}
            />
            <Redirect from = "/login" to = "/" />
            </>:
            <>
            <LogOutRoutes 
                logInStatus = {props.logInStatus}
                onChangeLogInStatus = {props.onChangeLogInStatus}
                userName = {props.userName}
            />
            
            </>
        }
        
        </Switch>
    </Router>
  );
}

export default AppRouter;