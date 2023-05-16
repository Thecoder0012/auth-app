// Import the functions you need from the SDKs you need
// import * as firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import {API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,SENDER_ID,APP_ID} from '@env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket:STORAGE_BUCKET,
    messagingSenderId: SENDER_ID,
    appId: APP_ID
  };
  
  

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
export {auth};