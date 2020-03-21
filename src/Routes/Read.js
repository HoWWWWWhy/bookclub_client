import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import firebase from "../firebase";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import Store from "../store";

import ReviewCard from "../Components/ReviewCard";

const Read = () => {
  const { book_id } = useParams();
  const { bookList, bookIdList } = useContext(Store);
  const [bookId, setBookId] = useState(bookIdList[0]);
  const [bookTitle, setBookTitle] = useState(bookList[0]);

  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const db = firebase.firestore();

    const setBookIdAndTitle = selectedBookId => {
      setBookId(selectedBookId);
      setBookTitle(bookList[bookIdList.indexOf(selectedBookId)]);
    };

    const getNickname = async userId => {
      const userDoc = db.collection("users").doc(userId);
      const doc = await userDoc.get();
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const nickname = doc.data()["nickname"];
        return nickname;
      }
    };
    const getReviews = async () => {
      const bookDoc = db.collection("books").doc(book_id);
      const reviews = await bookDoc.collection("reviews").get();

      if (reviews.docs.length > 0) {
        //setReviewList(reviews.docs.map(doc => doc.data()));
        reviews.docs.forEach(async doc => {
          const { title, contents } = doc.data();
          const nickname = await getNickname(doc.id);
          const reviewInfo = {
            nickname,
            title,
            contents
          };
          setReviewList(prevState => [...prevState, reviewInfo]);
        });
      } else {
        console.log("No Review is in this book");
      }
    };

    setBookIdAndTitle(book_id);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("Read: User is signed in.");
        if (isMounted) {
          getReviews();
        }
      } else {
        // No user is signed in.
        console.log("Read: No user is signed in.");
      }
    });

    return () => {
      isMounted = false;
      console.log("Read unmounted");
    };
  }, [book_id, bookList, bookIdList]);

  return (
    <>
      <h1>{bookTitle}</h1>

      <div>
        {reviewList.length > 0 ? (
          JSON.stringify(reviewList)
        ) : (
          <div>Loading</div>
        )}
      </div>
      {
        <div className="reviewCardContainer">
          {reviewList.map((review, i) => (
            <ReviewCard
              key={review.title}
              nickname={review.nickname}
              title={review.title}
              contents={review.contents}
            />
          ))}
        </div>
      }
    </>
  );
};

export default Read;
