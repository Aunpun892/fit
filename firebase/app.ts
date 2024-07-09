// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4JSdg9aiMGjjZrrTPP3W743fG12-_0bQ",
  authDomain: "grubin-aa6ff.firebaseapp.com",
  databaseURL: "https://grubin-aa6ff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "grubin-aa6ff",
  storageBucket: "grubin-aa6ff.appspot.com",
  messagingSenderId: "256273152162",
  appId: "1:256273152162:web:72fa4ffb419867e4f23ffb",
  measurementId: "G-LFJLQSCP85"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp