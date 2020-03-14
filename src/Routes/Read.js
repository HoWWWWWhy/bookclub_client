import React from "react";
import { useParams } from "react-router-dom";

import firebase from "../firebase";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const Read = () => {
  const { book_id } = useParams();
  console.log(book_id);
  const getReviews = async userId => {
    const bookTitle = "서툰 감정";
    const db = firebase.firestore();
    const bookDoc = await db.collection("books").doc(bookTitle);
    const reviews = await bookDoc.collection("reviews").get();
    reviews.docs.map(doc => console.log(doc.data()));
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("Read: User is signed in.");
      getReviews();
    } else {
      // No user is signed in.
      console.log("Read: No user is signed in.");
    }
  });

  return <>read {book_id}</>;
};

export default Read;
