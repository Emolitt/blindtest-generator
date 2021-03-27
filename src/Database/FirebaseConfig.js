import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCc6i9P3LgnWccwerba9czccMpSLk_nUIY",
    authDomain: "blindtest-generator-v4.firebaseapp.com",
    projectId: "blindtest-generator-v4",
    storageBucket: "blindtest-generator-v4.appspot.com",
    messagingSenderId: "557555686086",
    appId: "1:557555686086:web:4ff48d30ee9c2d65cad5c7",
    measurementId: "G-QVSHBRHZES"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;