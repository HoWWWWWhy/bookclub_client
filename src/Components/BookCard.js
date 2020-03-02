import React, { useState, useEffect } from "react";
import "../Routes/Style.css";

const APP_KEY = "KakaoAK 1f698c0e878c26fc60d8ea76d57c8b87";

const BookCard = props => {
  const [bookInfo, setBookInfo] = useState([]);
  const bookTitle = props.bookTitle;

  useEffect(() => {
    //const abortController = new AbortController();

    const API_URL = `https://dapi.kakao.com/v3/search/book?query=${bookTitle}&title=${bookTitle}`;
    //console.log("BookCard Mounted");

    const searchBook = async () => {
      const options = {
        headers: {
          Authorization: APP_KEY
        }
      };
      //const url = API_URL + "query=" + booklist[0] + "&title=" + booklist[0];
      const response = await fetch(API_URL, options);
      /*
      const response = await fetch(API_URL, options, {
        signal: abortController.signal
      });
      */
      const data = await response.json();
      //console.log(data.documents[0]);
      setBookInfo(data.documents[0]);
    };
    searchBook();

    return () => {
      console.log("BookCard unmounted");
      //abortController.abort();
    };
  }, [bookTitle]);

  return (
    <div className="bookCard">
      <div className="bookCardTitle">
        <a href="naver.com">{bookTitle}</a>
      </div>
      <a
        className="bookCardLink"
        href={bookInfo.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="bookCardThumbnail"
          src={bookInfo.thumbnail}
          alt={bookInfo.title}
        />
      </a>
    </div>
  );
};

export default BookCard;
