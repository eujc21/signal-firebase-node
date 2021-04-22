import { createApp } from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/analytics'

const app = createApp(App);


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "XXXXXXXX",
    authDomain: "signal-firebase-98015.firebaseapp.com",
    projectId: "signal-firebase-98015",
    storageBucket: "signal-firebase-98015.appspot.com",
    messagingSenderId: "XXXX",
    appId: "1:XXXXXX:web:XX",
    measurementId: "G-XXXXXX-X"
};
// Initialize Firebase

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const fireanalytics = firebase.analytics();



app.mount('#app');