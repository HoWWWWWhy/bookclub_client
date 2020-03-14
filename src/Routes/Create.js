import React, { useState, useContext } from "react";
import "./RouteStyle.css";
import Store from "../store";
import { Redirect } from "react-router-dom";
import Notification from "../Components/Notification";
import firebase from "../firebase";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const Create = () => {
  const { logIn, bookList, bookIdList } = useContext(Store);
  console.log(bookList);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookId, setBookId] = useState(bookIdList[0]);
  const [bookTitle, setBookTitle] = useState(bookList[0]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const setBookIdAndTitle = selectedBookTitle => {
    setBookTitle(selectedBookTitle);
    setBookId(bookIdList[bookList.IndexOf(selectedBookTitle)]);
  };

  const setReviews = async userId => {
    const db = firebase.firestore();
    const bookDoc = await db.collection("books").doc(bookId);
    const reviewsRef = await bookDoc.collection("reviews");
    reviewsRef.doc(userId).set({
      nickname,
      title,
      contents
    });
    /*
    const doc = await reviewDoc.get();
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No document!");
    }*/
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log("bookTitle:", bookTitle);
    console.log("title:", title);
    console.log("contents:", contents);

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
              onChange={event => setBookIdAndTitle(event.target.value)}
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
              onChange={event => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            독후감 작성:
            <textarea
              className="reviewEdit"
              value={contents}
              onChange={event => setContents(event.target.value)}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      {isSubmitted && <Redirect from="/create" to="/" />}
    </>
  );
};

export default Create;
