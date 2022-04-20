// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkfzmelEoI-qm5eL4TiKDklOX6XizrGbg",
    authDomain: "help-potatoes.firebaseapp.com",
    projectId: "help-potatoes",
    storageBucket: "help-potatoes.appspot.com",
    messagingSenderId: "11463795081",
    appId: "1:11463795081:web:c699941c72cd05d539c158"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initilize FireStore
export const db = getFirestore(app);