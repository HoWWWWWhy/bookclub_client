import React, { useEffect, useContext } from "react";
import "./AccessControl.css";
import Store from "../store";

const AccessControl = props => {
  console.log(props);

  const { logIn, setLogIn } = useContext(Store);

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

  const googleLogIn = () => {
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
        const currentUserEmail = window.currentUser
          .getBasicProfile()
          .getEmail();
        const currentUserInfo = JSON.stringify([
          currentUserName,
          currentUserEmail
        ]);
        //props.onChangeLogInStatus(true, JSON.parse(currentUserInfo));
        setLogIn({
          status: true,
          text: "Log Out",
          userInfo: JSON.parse(currentUserInfo)
        });
        localStorage.setItem("currentUserInfo", currentUserInfo);
      }
    });
  };

  const googleLogOut = () => {
    console.log("try log out");
    //props.onChangeLogInStatus(false, "");
    setLogIn({
      status: false,
      text: "Log In",
      userInfo: ""
    });
    localStorage.removeItem("currentUserInfo");
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
        {logIn.status === false ? (
          <button className="googleLoginButton" onClick={googleLogIn}></button>
        ) : props.logOutCmd ? (
          googleLogOut()
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default AccessControl;
