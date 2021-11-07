import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDLANZQZIZIWPicGd1WBkRQRHDaQV4In4A",
    authDomain: "pizza-hust.firebaseapp.com",
    projectId: "pizza-hust",
    storageBucket: "pizza-hust.appspot.com",
    messagingSenderId: "729247665316",
    appId: "1:729247665316:web:2732785dc9d4e005de6a31",
    measurementId: "G-1741G6EDXB"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, provider };
