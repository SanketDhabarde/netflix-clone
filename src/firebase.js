import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCMIrPIG9RmPki67HPXtP-APntaX-JzHik",
    authDomain: "netflix-clone-cc91b.firebaseapp.com",
    projectId: "netflix-clone-cc91b",
    storageBucket: "netflix-clone-cc91b.appspot.com",
    messagingSenderId: "54436329460",
    appId: "1:54436329460:web:2db02c95654f9b50d82ba1",
    measurementId: "G-5YK4YMXQ3G"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};

export default db;