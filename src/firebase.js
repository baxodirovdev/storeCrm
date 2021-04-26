import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBuSwevZfvAyyayP6qkvVWToZ_7oVS7qw",
  authDomain: "storecrm-3fe74.firebaseapp.com",
  projectId: "storecrm-3fe74",
  storageBucket: "storecrm-3fe74.appspot.com",
  messagingSenderId: "151403815914",
  appId: "1:151403815914:web:6bbfc1c8d6e317456b0893",
  measurementId: "G-35KDDVSF6T",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
