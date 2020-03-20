import React, { useEffect } from "react";
import "../Routes/RouteStyle.css";

const ReviewCard = props => {
  const nickname = props.nickname;
  const title = props.title;
  const contents = props.contents;

  useEffect(() => {
    console.log("ReviewCard Mounted");

    return () => {
      console.log("ReviewCard unmounted");
    };
  }, []);

  return (
    <>
      <article className="reviewCard">
        <div>{title}</div>
        <div>by {nickname}</div>
        <div>{contents}</div>
      </article>
    </>
  );
};

export default ReviewCard;
