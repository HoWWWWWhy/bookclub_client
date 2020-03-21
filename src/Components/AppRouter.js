import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "./ComponentStyle.css";
import Home from "../Routes/Home";
import Create from "../Routes/Create";
import Read from "../Routes/Read";
import MyPage from "../Routes/MyPage";
import AccessControl from "../Routes/AccessControl";
import NotFound from "../Routes/NotFound";

const LogInRoutes = () => {
  console.log("login_routes");
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/create/:book_id" component={Create}></Route>
      <Route path="/read/:book_id" component={Read}></Route>
      <Route path="/mypage" component={MyPage}></Route>
      <Route
        path="/logout"
        render={props => <AccessControl {...props} logOutCmd={true} />}
      ></Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  );
};

const LogOutRoutes = () => {
  console.log("logout_routes");
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/home" component={Home}></Route>
      <Route
        path="/login"
        render={props => <AccessControl {...props} logOutCmd={false} />}
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
          <LogInRoutes />
          <Redirect exact path from="/login" to="/" />
        </>
      ) : (
        <>
          <Redirect from="/logout" to="/" />
          <LogOutRoutes />
        </>
      )}
    </Router>
  );
};

export default AppRouter;
