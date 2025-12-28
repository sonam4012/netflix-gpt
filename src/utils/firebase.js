// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD409H6ZonTYDs8SzoRUPif6csui7QqWzs",
  authDomain: "netflixgpt-b1681.firebaseapp.com",
  projectId: "netflixgpt-b1681",
  storageBucket: "netflixgpt-b1681.firebasestorage.app",
  messagingSenderId: "1015403224496",
  appId: "1:1015403224496:web:2de036ecff2563da76ca75",
  measurementId: "G-68S6PMX6VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();