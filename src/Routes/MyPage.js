import React, { useState, useContext } from "react";
import Store from "../store";
import * as firebase from "firebase/app";
import "firebase/firestore";

const MyPage = () => {
  /*
  const key1 = 10;
  const key2 = 20;
  const API_URL = `https://bbjhvqyxq1.execute-api.ap-northeast-2.amazonaws.com/test/hello-lambda?key1=${key1}&key2=${key2}`;

  const callApi = async () => {
    const response = await fetch(API_URL, {
      method: "GET"
    });
    console.log(await response.json());
  };
  callApi();
*/

  const { logIn, setLogIn, setToastMessage } = useContext(Store);

  const name = logIn.userInfo[0];
  const email = logIn.userInfo[1];

  const [nickname, setNickname] = useState(logIn.userInfo[2]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    console.log("nickname:", nickname);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("User is signed in.");
        const db = firebase.firestore();
        const usersRef = db.collection("users");
        const userDoc = usersRef.doc(user.uid);
        userDoc
          .update({
            nickname
          })
          .then(function() {
            console.log("Document successfully updated!");
            const currentUserInfo = JSON.stringify([name, email, nickname]);
            setLogIn(prevState => ({
              ...prevState,
              userInfo: JSON.parse(currentUserInfo)
            }));
            localStorage.setItem("currentUserInfo", currentUserInfo);
            setIsSubmitted(true);
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } else {
        // No user is signed in.
        console.log("No user is signed in.");
      }
    });
  };

  return (
    <>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            value={nickname}
            onChange={event => {
              setIsSubmitted(false);
              setNickname(event.target.value);
            }}
          />
        </label>
        <input type="submit" value="Apply" />
      </form>

      {isSubmitted && setToastMessage("success", "닉네임이 변경되었습니다!")}
    </>
  );
};

export default MyPage;
