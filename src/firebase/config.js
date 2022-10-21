// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB2n7jbNFCrNHoq8JfzzbrmEtZN5bOOu1Y',
  authDomain: 'react-app-f75ca.firebaseapp.com',
  projectId: 'react-app-f75ca',
  storageBucket: 'react-app-f75ca.appspot.com',
  messagingSenderId: '846543175822',
  appId: '1:846543175822:web:32b6fae1a71cfaaf3949df',
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
