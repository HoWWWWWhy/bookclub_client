import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCw4y0iPW_zTWcWp_gs5cHi20on9_5E96o",
  authDomain: "bookclub-d1f9c.firebaseapp.com",
  databaseURL: "https://bookclub-d1f9c.firebaseio.com",
  projectId: "bookclub-d1f9c",
  storageBucket: "bookclub-d1f9c.appspot.com",
  messagingSenderId: "16730901666",
  appId: "1:16730901666:web:7d3566a11ca78a88501bfb",
  measurementId: "G-64SQ8NXPD5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
