import React, { useEffect, useContext } from "react";
import BookCard from "../Components/BookCard.js";
import "./Style.css";
import Store from "../store";

const booklist = ["서툰 감정", "내 생애의 아이들", "Night Flight"];

const Home = () => {
  const logInStore = useContext(Store);

  useEffect(() => {
    console.log("Home Mounted");
  }, []);

  return (
    <>
      {logInStore.status ? (
        <h1>Welcome {logInStore.username}</h1>
      ) : (
        <h1>Welcome Everyone</h1>
      )}
      <h3>StoreProps: {JSON.stringify(logInStore)}</h3>
      <h2>지금까지 읽은 도서리스트</h2>
      {
        <div className="bookCardContainer">
          {booklist.map(title => (
            <BookCard key={title} bookTitle={title} />
          ))}
        </div>
      }
    </>
  );
};

export default Home;
