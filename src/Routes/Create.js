import React, { useState, useContext } from "react";
import "./Style.css";
import Store from "../store";

const Create = () => {
  const { logIn, bookList } = useContext(Store);

  const [bookTitle, setBookTitle] = useState(bookList[1]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    console.log("bookTitle:", bookTitle);
    console.log("title:", title);
    console.log("review:", review);
  };

  const username = logIn.userInfo[0];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            도서명:
            <select
              className="selectBox"
              value={bookTitle}
              onChange={event => setBookTitle(event.target.value)}
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
          <label>작성자: {username}</label>
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
              value={review}
              onChange={event => setReview(event.target.value)}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Create;
