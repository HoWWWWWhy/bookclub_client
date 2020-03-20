import React, { useState, useEffect, useContext } from "react";
import "./ComponentStyle.css";
import { Link } from "react-router-dom";
import Store from "../store";

const APP_KEY = process.env.REACT_APP_KAKAO_APP_KEY;

const BookCard = props => {
  const { logIn } = useContext(Store);
  const [bookInfo, setBookInfo] = useState([]);
  const bookTitle = props.bookTitle;
  const bookId = props.bookId;

  useEffect(() => {
    let isMounted = true;

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
    if (isMounted) {
      searchBook();
    }

    return () => {
      isMounted = false;
      console.log("BookCard unmounted");
    };
  }, [bookTitle]);

  return (
    <>
      <article className="bookCard">
        <div className="bookCardTitle">
          {logIn.status ? (
            <Link to={"/read/" + bookId}>{bookTitle}</Link>
          ) : (
            <span>{bookTitle}</span>
          )}
        </div>

        <div>by {bookInfo.authors}</div>

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
      </article>
    </>
  );
};

export default BookCard;
