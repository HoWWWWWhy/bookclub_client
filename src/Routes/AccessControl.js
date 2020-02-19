import React, { useState, useEffect }  from 'react';
import './AccessControl.css';

const AccessControl = (props) => {
  const [currentUserName, setCurrentUserName] = useState("");
  console.log(props);
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
    
    return () => {
      console.log("unmount");
    };
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
      console.log(window.myGoogleAuth);
      console.log(window.myGoogleAuth.isSignedIn.get());
      if(window.myGoogleAuth.isSignedIn.get()) {
        window.currentUser = window.myGoogleAuth.currentUser.get();
        const currentUserName = window.currentUser.getBasicProfile().getName();
        props.onChangeLogInStatus(true, currentUserName);
      }
    });    
  }


  const logOut = () => {
    console.log("try log out");
    console.log(props);
    /*
    window.myGoogleAuth.disconnect().then(() => {
      console.log("signOut");
      console.log(window.myGoogleAuth);
      console.log(window.myGoogleAuth.isSignedIn.get());
      props.onChangeLogInStatus(false);
      setCurrentUserName("");
    });
    */
    
    window.myGoogleAuth.signOut().then(() => {
      console.log("signOut");
      console.log(window.myGoogleAuth);
      console.log(window.myGoogleAuth.isSignedIn.get());
      if(!window.myGoogleAuth.isSignedIn.get()) {
        console.log("Log Out Success");
        props.onChangeLogInStatus(false, "");
        //setCurrentUserName("");
      }
    });
    
    console.log("log out finish");
    

   
  }

  return (
    <div className="AccessControl">
      { props.logInStatus === false ? 
        <button className="googleLoginButton"
          onClick={ logIn }>
        </button> :
        //<p>Hello! {currentUserName}</p>
        
        ( props.logOutCmd === true ? 
          logOut()  :
          //<p>Log Out</p> :
          <p>Hello! {currentUserName}</p>
        )
        
        
        
      }
    </div>
  );
}

export default AccessControl;
