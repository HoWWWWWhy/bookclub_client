import React, { useEffect, useContext } from "react";
import BookCard from "../Components/BookCard.js";
import "./RouteStyle.css";
import Store from "../store";

const Home = () => {
  const { logIn, bookList, bookIdList } = useContext(Store);
  const nickname = logIn.userInfo[2];

  useEffect(() => {
    console.log("Home Mounted");
  }, []);

  return (
    <>
      {logIn.status ? <h1>Welcome {nickname}</h1> : <h1>Welcome Everyone</h1>}
      <h3>logIn: {JSON.stringify(logIn)}</h3>
      <h3>bookList: {JSON.stringify(bookList)}</h3>
      <h2>지금까지 읽은 도서리스트</h2>
      {
        <div className="bookCardContainer">
          {bookList.map((title, i) => (
            <BookCard key={title} bookTitle={title} bookId={bookIdList[i]} />
          ))}
        </div>
      }
    </>
  );
};

export default Home;
