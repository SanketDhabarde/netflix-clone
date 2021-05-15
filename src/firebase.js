import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWfdjNEiTxo_BQ9ECXkMBW592JXoCGXjU",
  authDomain: "movie-app-1c1e7.firebaseapp.com",
  projectId: "movie-app-1c1e7",
  storageBucket: "movie-app-1c1e7.appspot.com",
  messagingSenderId: "517035231558",
  appId: "1:517035231558:web:d7cd3957e962ef13c77d47",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;