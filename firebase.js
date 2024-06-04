// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSApFB_NI2AEBJ09wB1c_xOwxRb63qQic",
  authDomain: "custompicks-9c348.firebaseapp.com",
  projectId: "custompicks-9c348",
  storageBucket: "custompicks-9c348.appspot.com",
  messagingSenderId: "960132071890",
  appId: "1:960132071890:web:24e3a47f9dcc6dbc7bc80b",
  measurementId: "G-HGPV42FQNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
