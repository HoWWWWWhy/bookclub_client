import React, { useEffect, useContext } from "react";
import BookCard from "../Components/BookCard.js";
import "./RouteStyle.css";
import Store from "../store";

const Home = () => {
  const { logIn, bookList } = useContext(Store);

  useEffect(() => {
    console.log("Home Mounted");
  }, []);

  return (
    <>
      {logIn.status ? (
        <h1>Welcome {logIn.userInfo[0]}</h1>
      ) : (
        <h1>Welcome Everyone</h1>
      )}
      <h3>logIn: {JSON.stringify(logIn)}</h3>
      <h3>bookList: {JSON.stringify(bookList)}</h3>
      <h2>지금까지 읽은 도서리스트</h2>
      {
        <div className="bookCardContainer">
          {bookList.map(title => (
            <BookCard key={title} bookTitle={title} />
          ))}
        </div>
      }
    </>
  );
};

export default Home;
