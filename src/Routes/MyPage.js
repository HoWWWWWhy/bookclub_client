import React, { useContext } from "react";
import Store from "../store";

const MyPage = () => {
  /*
  const key1 = 10;
  const key2 = 20;
  const API_URL = `https://bbjhvqyxq1.execute-api.ap-northeast-2.amazonaws.com/test/hello-lambda?key1=${key1}&key2=${key2}`;

  const callApi = async () => {
    const response = await fetch(API_URL, {
      method: "GET"
    });
    console.log(await response.json());
  };
  callApi();
*/

  const { logIn } = useContext(Store);

  const username = logIn.userInfo[0];
  const email = logIn.userInfo[1];
  return (
    <>
      <h1>이름: {username}</h1>
      <h1>Email: {email}</h1>
    </>
  );
};

export default MyPage;
