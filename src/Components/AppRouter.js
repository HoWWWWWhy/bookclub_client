import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "./AppRouter.css";
import Home from "../Routes/Home";
import Create from "../Routes/Create";
import Read from "../Routes/Read";
import MyPage from "../Routes/MyPage";
import AccessControl from "../Routes/AccessControl";
import NotFound from "../Routes/NotFound";

const LogInRoutes = props => {
  console.log("login_routes");
  console.log(props);
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/create" component={Create}></Route>
      <Route path="/read" component={Read}></Route>
      <Route path="/mypage" component={MyPage}></Route>
      <Route
        path="/logout"
        render={myprops => (
          <AccessControl
            {...myprops}
            logInStatus={props.logInStatus}
            onChangeLogInStatus={props.onChangeLogInStatus}
            logOutCmd={true}
          />
        )}
      ></Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  );
};

const LogOutRoutes = props => {
  console.log(props);
  console.log("logout_routes");
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/home" component={Home}></Route>
      <Route
        path="/login"
        render={myprops => (
          <AccessControl
            {...myprops}
            logInStatus={props.logInStatus}
            onChangeLogInStatus={props.onChangeLogInStatus}
            logOutCmd={false}
          />
        )}
      ></Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  );
};

const AppRouter = props => {
  console.log(props);
  return (
    <Router>
      <nav>
        <ul>
          {props.logInStatus ? (
            <>
              <li className="menu_left">
                <NavLink to="/home" activeClassName="selected">
                  HOME
                </NavLink>
              </li>
              <li className="menu_left">
                <NavLink to="/create" activeClassName="selected">
                  Write
                </NavLink>
              </li>
              <li className="menu_left">
                <NavLink to="/read" activeClassName="selected">
                  View
                </NavLink>
              </li>
              <li className="menu_right">
                <NavLink to="/logout" activeClassName="selected">
                  {props.logInMenuText}
                </NavLink>
              </li>
              <li className="menu_right">
                <NavLink to="/mypage" activeClassName="selected">
                  My Page
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="menu_left">
                <NavLink to="/home" activeClassName="selected">
                  HOME
                </NavLink>
              </li>
              <li className="menu_right">
                <NavLink to="/login" activeClassName="selected">
                  {props.logInMenuText}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {props.logInStatus ? (
        <>
          <LogInRoutes
            logInStatus={props.logInStatus}
            onChangeLogInStatus={props.onChangeLogInStatus}
          />
          <Redirect from="/login" to="/" />
        </>
      ) : (
        <>
          <Redirect from="/logout" to="/" />
          <LogOutRoutes
            logInStatus={props.logInStatus}
            onChangeLogInStatus={props.onChangeLogInStatus}
          />
        </>
      )}
    </Router>
  );
};

export default AppRouter;
