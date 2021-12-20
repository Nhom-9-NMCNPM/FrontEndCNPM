import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyB3AOAaqyFPTSWK-270F9mFs11s1HiS6sE",
    authDomain: "evadeeva-97b37.firebaseapp.com",
    projectId: "evadeeva-97b37",
    storageBucket: "evadeeva-97b37.appspot.com",
    messagingSenderId: "1006278611171",
    appId: "1:1006278611171:web:c288d71d18565ded7835d6",
    measurementId: "G-MEGGEZJBS4"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage().ref();
const providerFaceBook = new firebase.auth.FacebookAuthProvider();
export { firebase, database, provider, providerFaceBook, storageRef };
