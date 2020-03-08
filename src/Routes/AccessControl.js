import React, { useEffect, useContext } from "react";
import "./RouteStyle.css";
import Store from "../store";

import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw4y0iPW_zTWcWp_gs5cHi20on9_5E96o",
  authDomain: "bookclub-d1f9c.firebaseapp.com",
  databaseURL: "https://bookclub-d1f9c.firebaseio.com",
  projectId: "bookclub-d1f9c",
  storageBucket: "bookclub-d1f9c.appspot.com",
  messagingSenderId: "16730901666",
  appId: "1:16730901666:web:7d3566a11ca78a88501bfb",
  measurementId: "G-64SQ8NXPD5"
};

const initFirebaseGoogleAuth = () => {
  // Initialize Firebase
  window.firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
};

const AccessControl = props => {
  console.log(props);

  const { logIn, setLogIn } = useContext(Store);
  /*
  const SCOPE = "https://www.googleapis.com/auth/calendar.readonly";
  const CLIENT_ID =
    "656710910908-gqama28gdl4tm4d8cqke1ei94jm5nq38.apps.googleusercontent.com";
*/
  useEffect(() => {
    console.log("AccessControl Mounted");
    /*
    const init = () => {
      console.log("init");
      //if(!props.logOutCmd) {
      window.gapi.load("auth2", function() {
        //Ready. Make a call to gapi.auth2.init or some other API
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
*/
    if (typeof window.firebaseApp === "undefined") {
      console.log("try firebase init");
      initFirebaseGoogleAuth();
    }

    return () => {
      console.log("AccessControl Unmounted");
    };
  }, []);

  /*
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

    
    //window.myGoogleAuth.disconnect().then(() => {
    //  console.log("signOut");
    //  console.log(window.myGoogleAuth);
    //  console.log(window.myGoogleAuth.isSignedIn.get());
    //  //props.onChangeLogInStatus(false);
    //});
    
    if (window.myGoogleAuth) {
      window.myGoogleAuth.signOut().then(() => {
        console.log("signOut");
        console.log(window.myGoogleAuth);
        console.log(window.myGoogleAuth.isSignedIn.get());
        if (!window.myGoogleAuth.isSignedIn.get()) {
          console.log("Log Out Success");
          //props.onChangeLogInStatus(false, "");
          setLogIn({
            status: false,
            text: "Log In",
            userInfo: ""
          });
          localStorage.removeItem("currentUserInfo");
        }
      });
    }
    console.log("log out finish");
  };
*/
  const firebaseGoogleLogIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const token = result.credential.accessToken;
        // The signed-in user info.
        //const user = result.user;
        //console.log(user);
        const user = firebase.auth().currentUser;

        if (user != null) {
          const name = user.displayName;
          const email = user.email;

          //const photoUrl = user.photoURL;
          //const emailVerified = user.emailVerified;
          //const uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          console.log(user);

          const db = firebase.firestore();
          const usersRef = db.collection("users");
          const userDoc = usersRef.doc(name);

          const getNickname = async () => {
            try {
              const doc = await userDoc.get();
              console.log(doc);
              let nickname = "";
              if (doc.exists) {
                console.log("Document data:", doc.data());
                nickname = doc.data()["nickname"];
              } else {
                // doc.data() will be undefined in this case
                console.log("Add document!");
                nickname = name;

                usersRef.doc(name).set({
                  name,
                  email,
                  nickname
                });
              }
              const currentUserInfo = JSON.stringify([name, email, nickname]);
              setLogIn({
                status: true,
                text: "Log Out",
                userInfo: JSON.parse(currentUserInfo)
              });
              localStorage.setItem("currentUserInfo", currentUserInfo);
            } catch (error) {
              console.log("Error getting document:", error);
            }
          };

          getNickname();
        }
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // The email of the user's account used.
        //const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        //const credential = error.credential;
      });
  };

  const firebaseGoogleLogOut = () => {
    if (typeof window.firebaseApp === "undefined") {
      console.log("try firebase init");
      initFirebaseGoogleAuth();
    }

    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        console.log("Firebase signOut");
        setLogIn({
          status: false,
          text: "Log In",
          userInfo: ""
        });
        localStorage.removeItem("currentUserInfo");
      })
      .catch(function(error) {
        // An error happened.
      });
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
          <button
            className="googleLoginButton"
            //onClick={googleLogIn}
            onClick={firebaseGoogleLogIn}
          ></button>
        ) : props.logOutCmd ? (
          //googleLogOut()
          firebaseGoogleLogOut()
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default AccessControl;
