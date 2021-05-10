import firebase from 'firebase/app';
import 'firebase/firebase-storage';

var firebaseConfig = {
    apiKey: "AIzaSyDzHBv230JyEQOI38v1XIW-C3sjsPNXdFU",
    authDomain: "foodreviewproject-cec8f.firebaseapp.com",
    projectId: "foodreviewproject-cec8f",
    storageBucket: "foodreviewproject-cec8f.appspot.com",
    messagingSenderId: "834322042838",
    appId: "1:834322042838:web:7869d6b334c39200899e77"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;