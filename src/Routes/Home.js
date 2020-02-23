import React from 'react';
import BookCard from '../Components/BookCard.js';

const booklist = ['서툰 감정', '내 생애의 아이들'];

const Home = (props) => {
    console.log('Home');
    return (
        <>
        { props.username ?
        <h1>Welcome {props.username}</h1> :
        <h1>Welcome Everyone</h1>
        }
        
        <h2>지금까지 읽은 도서리스트</h2>
        {
            booklist.map((title) => (
                <BookCard 
                    bookTitle = {title}
                />
            ))
        }
        
        </>
    );
}

export default Home;