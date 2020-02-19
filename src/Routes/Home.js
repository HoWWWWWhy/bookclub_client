import React from 'react';

const Home = (props) => {
    return (
        props.username ?
            <h1>Welcome {props.username}</h1> :
            <h1>Welcome Everyone</h1>
    );
}

export default Home;