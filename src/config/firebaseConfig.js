// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCc6i9P3LgnWccwerba9czccMpSLk_nUIY",
    authDomain: "blindtest-generator-v4.firebaseapp.com",
    databaseURL: "https://blindtest-generator-v4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blindtest-generator-v4",
    storageBucket: "blindtest-generator-v4.appspot.com",
    messagingSenderId: "557555686086",
    appId: "1:557555686086:web:4ff48d30ee9c2d65cad5c7",
    measurementId: "G-QVSHBRHZES"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

