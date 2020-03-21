import React, { useEffect, useContext } from "react";
import "./RouteStyle.css";
import Store from "../store";

import firebase from "../firebase";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const AccessControl = props => {
  console.log(props);

  const { logIn, setLogIn } = useContext(Store);

  useEffect(() => {
    console.log("AccessControl Mounted");

    return () => {
      console.log("AccessControl Unmounted");
    };
  }, []);

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
          const uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          console.log(user);

          const db = firebase.firestore();
          const usersRef = db.collection("users");
          const userDoc = usersRef.doc(uid);

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

                usersRef.doc(uid).set({
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

  return (
    <>
      <div className="AccessControl">
        {logIn.status === false ? (
          <button
            className="googleLoginButton"
            onClick={firebaseGoogleLogIn}
          ></button>
        ) : (
          firebaseGoogleLogOut()
        )}
      </div>
    </>
  );
};

export default AccessControl;
