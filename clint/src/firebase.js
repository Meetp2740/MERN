import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOptfOB0q9YmsyjFYzRvjMvlw42wTptbo",
  authDomain: "mern-868b7.firebaseapp.com",
  projectId: "mern-868b7",
  storageBucket: "mern-868b7.appspot.com",
  messagingSenderId: "556574462571",
  appId: "1:556574462571:web:8de5d1777cd5890547d72e"
};

export const app = initializeApp(firebaseConfig);