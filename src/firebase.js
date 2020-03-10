import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "bookclub-d1f9c.firebaseapp.com",
  databaseURL: "https://bookclub-d1f9c.firebaseio.com",
  projectId: "bookclub-d1f9c",
  storageBucket: "bookclub-d1f9c.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase;
