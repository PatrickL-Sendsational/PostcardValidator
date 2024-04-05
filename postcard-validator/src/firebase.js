// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKrult32hcXRJ0ZRag7gamhNj6dhOidMA",
  authDomain: "postcardvalidator.firebaseapp.com",
  projectId: "postcardvalidator",
  storageBucket: "postcardvalidator.appspot.com",
  messagingSenderId: "363093175642",
  appId: "1:363093175642:web:e718abf16ff5fba6a3d763",
  measurementId: "G-XVP9XMPMJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase Auth and get a reference to the service
const auth = getAuth(app);

export { auth };