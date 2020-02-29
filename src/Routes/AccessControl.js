import React, { useEffect } from "react";
import "./AccessControl.css";

const AccessControl = props => {
  console.log(props);

  const SCOPE = "https://www.googleapis.com/auth/calendar.readonly";
  const CLIENT_ID =
    "656710910908-gqama28gdl4tm4d8cqke1ei94jm5nq38.apps.googleusercontent.com";

  useEffect(() => {
    console.log("AccessControl Mounted");
    const init = () => {
      console.log("init");
      //if(!props.logOutCmd) {
      window.gapi.load("auth2", function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        const clientId = {
          client_id: CLIENT_ID
        };
        window.myGoogleAuth = window.gapi.auth2.init(clientId);
        window.myGoogleAuth.then(onInit, onError);
      });
      //}
    };

    const appendGoogleAuthScript = () => {
      let script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js";
      script.onload = init;
      script.async = true;
      script.defer = true;

      document.body.appendChild(script);
    };

    appendGoogleAuthScript();

    return () => {
      console.log("unmount");
    };
  }, []);

  const onInit = () => {
    console.log("initialized");
  };
  const onError = () => {
    console.log("Error");
  };

  const logIn = () => {
    console.log("try log in");
    const logInOptions = {
      scope: SCOPE
    };
    window.myGoogleAuth.signIn(logInOptions).then(() => {
      console.log("Log In Success");
      console.log(window.myGoogleAuth);
      console.log(window.myGoogleAuth.isSignedIn.get());
      if (window.myGoogleAuth.isSignedIn.get()) {
        window.currentUser = window.myGoogleAuth.currentUser.get();
        const currentUserName = window.currentUser.getBasicProfile().getName();
        props.onChangeLogInStatus(true, currentUserName);
        localStorage.setItem("currentUserName", currentUserName);
      }
    });
  };

  const logOut = () => {
    console.log("try log out");
    props.onChangeLogInStatus(false, "");
    localStorage.removeItem("currentUserName");
    /*
    window.myGoogleAuth.disconnect().then(() => {
      console.log("signOut");
      console.log(window.myGoogleAuth);
      console.log(window.myGoogleAuth.isSignedIn.get());
      //props.onChangeLogInStatus(false);
    });
    */
    if (window.myGoogleAuth) {
      window.myGoogleAuth.signOut().then(() => {
        console.log("signOut");
        console.log(window.myGoogleAuth);
        console.log(window.myGoogleAuth.isSignedIn.get());
        if (!window.myGoogleAuth.isSignedIn.get()) {
          console.log("Log Out Success");
          //props.onChangeLogInStatus(false, "");
        }
      });
    }
    console.log("log out finish");
  };

  /*
  (
          props => {
            if (props.logOutCmd) {
              logOut();
            }
          }
        )
        */
  return (
    <>
      <div className="AccessControl">
        {props.logInStatus === false ? (
          <button className="googleLoginButton" onClick={logIn}></button>
        ) : props.logOutCmd ? (
          logOut()
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default AccessControl;
