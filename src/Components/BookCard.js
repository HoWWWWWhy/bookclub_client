import React, { useState, useEffect } from 'react';

const BookCard = (props) => {
    
    const [bookInfo, setBookInfo] = useState([]);
    
    useEffect(() => {
        const APP_KEY = "KakaoAK 1f698c0e878c26fc60d8ea76d57c8b87";
        const API_URL = `https://dapi.kakao.com/v3/search/book?query=${props.bookTitle}&title=${props.bookTitle}`;
        //console.log("BookCard Mounted");

        const searchBook = async() => {
            const options = {
                headers: {
                    'Authorization': APP_KEY,
                }
            }
            //const url = API_URL + "query=" + booklist[0] + "&title=" + booklist[0];
        
            const response = await fetch(API_URL, options);
            const data = await response.json();
            //console.log(data.documents[0]);
            setBookInfo(data.documents[0]);
            /*
            fetch(API_URL, options).then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    const result = data;
                });
            }).catch((error) => {
                console.log(error)
            });*/
        }        
        searchBook();
        
    },[]);
    
    
    
    return (
        <div>
            <p>{props.bookTitle}</p>
            <img
                src = {bookInfo.thumbnail} 
                alt = {bookInfo.title}
            />
        </div>
        
    );
}

export default BookCard;