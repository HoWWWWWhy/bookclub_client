import React, { useState, useContext } from "react";
import "./RouteStyle.css";
import Store from "../store";
import { Redirect } from "react-router-dom";

import firebase from "../firebase";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const Create = () => {
  const { logIn, bookList, bookIdList, setToastMessage } = useContext(Store);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [bookId, setBookId] = useState(bookIdList[0]);
  const [bookTitle, setBookTitle] = useState(bookList[0]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const setBookIdAndTitle = selectedBookTitle => {
    setBookTitle(selectedBookTitle);
    setBookId(bookIdList[bookList.indexOf(selectedBookTitle)]);
  };

  const setReviews = async userId => {
    const db = firebase.firestore();
    const bookDoc = db.collection("books").doc(bookId);
    const reviewsRef = bookDoc.collection("reviews");
    reviewsRef.doc(userId).set({
      title,
      contents
    });

    const userDoc = db.collection("users").doc(userId);
    const doc = await userDoc.get();
    if (doc.exists) {
      userDoc.set(
        {
          reviews: firebase.firestore.FieldValue.arrayUnion(bookId)
        },
        { merge: true }
      );
    } else {
      console.log("No Document data");
    }
  };

  const toastCloseFcn = () => {
    setIsSubmitted(false);
    setIsRedirect(true);
  };

  const handleSubmit = event => {
    event.preventDefault();

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("Create: User is signed in.");
        setReviews(user.uid);
        setIsSubmitted(true);

        //books.docs.map(doc => console.log(doc.data()));
      } else {
        // No user is signed in.
        console.log("Create: No user is signed in.");
      }
    });
  };

  const nickname = logIn.userInfo[2];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            도서명:
            <select
              className="selectBox"
              value={bookTitle}
              onChange={event => {
                setIsSubmitted(false);
                setBookIdAndTitle(event.target.value);
              }}
            >
              {bookList.map(title => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>작성자: {nickname}</label>
        </div>

        <div>
          <label>
            제목:
            <input
              className="titleEdit"
              type="text"
              value={title}
              onChange={event => {
                setIsSubmitted(false);
                setTitle(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            독후감 작성:
            <textarea
              className="reviewEdit"
              value={contents}
              onChange={event => {
                setIsSubmitted(false);
                setContents(event.target.value);
              }}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      {/*isSubmitted && <ToastMessage type="success" message="등록되었습니다!" />*/}
      {isSubmitted &&
        setToastMessage("success", "등록되었습니다!", toastCloseFcn)}
      {isRedirect && <Redirect from="/create" to="/" />}
    </>
  );
};

export default Create;
