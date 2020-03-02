import React, { useEffect, useContext } from "react";
import BookCard from "../Components/BookCard.js";
import "./Style.css";
import Store from "../store";

const Home = () => {
  const logInStore = useContext(Store)["logIn"];
  const bookListStore = useContext(Store)["bookList"];

  useEffect(() => {
    console.log("Home Mounted");
  }, []);

  return (
    <>
      {logInStore.status ? (
        <h1>Welcome {logInStore.userInfo[0]}</h1>
      ) : (
        <h1>Welcome Everyone</h1>
      )}
      <h3>logInStore: {JSON.stringify(logInStore)}</h3>
      <h3>bookListStore: {JSON.stringify(bookListStore)}</h3>
      <h2>지금까지 읽은 도서리스트</h2>
      {
        <div className="bookCardContainer">
          {bookListStore.map(title => (
            <BookCard key={title} bookTitle={title} />
          ))}
        </div>
      }
    </>
  );
};

export default Home;
