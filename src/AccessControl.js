import React, { useState, useEffect }  from 'react';
import './AccessControl.css';

const AccessControl = (props) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [logInButtonText, setLogInButtonText] = useState("Log In with Google");
  

  useEffect(() => {
    console.log('useEffect');
    const init = () => {
      console.log("init");
      window.gapi.load('auth2', function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        const clientId = {
          client_id: CLIENT_ID
        }
        window.myGoogleAuth = window.gapi.auth2.init(clientId);
        window.myGoogleAuth.then(onInit, onError);
        
      });
    }
        
    const appendGoogleAuthScript = () => {
      let script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js"
      script.onload = init;
      script.async = true;
      script.defer = true;
      
      document.body.appendChild(script);
    }    
    appendGoogleAuthScript();  
  },[]);

  const SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';
  const CLIENT_ID = '656710910908-gqama28gdl4tm4d8cqke1ei94jm5nq38.apps.googleusercontent.com';

  const onInit = () => {
    console.log("initialized");
  }
  const onError = () => {
    console.log("Error");
  }

  const logIn = () => {
    console.log("try log in");
    const logInOptions = {
      scope: SCOPE
    }
    window.myGoogleAuth.signIn(logInOptions).then(() => {
      console.log("Log In Success")
      if(window.myGoogleAuth.isSignedIn.get()) {
        window.currentUser = window.myGoogleAuth.currentUser.get();
        props.onChangeLogInStatus(1);
        setCurrentUserName(window.currentUser.getBasicProfile().getName());
        setLogInButtonText("Log Out");
      }
    });    
    
  }

  const logOut = () => {
    console.log("try log out");
    window.myGoogleAuth.signOut().then(() => {
      console.log("Log Out Success")
      if(!window.myGoogleAuth.isSignedIn.get()) {
        props.onChangeLogInStatus(0);
        setCurrentUserName("");
        setLogInButtonText("Log In with Google");
      }
    });
  }
  
  return (
    <div className="AccessControl">
      <button className="googleLoginButton" 
        onClick={
          props.logInStatus === 0 ? logIn : logOut
        }>{logInButtonText}
      </button>
      <p>
        Hello! {currentUserName}
      </p>
    </div>
  );
}

export default AccessControl;
