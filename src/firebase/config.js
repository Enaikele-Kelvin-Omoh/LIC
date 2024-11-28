// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyCVZB-8IqigB4p4xlH3Y6YKsRq6H6xBYaU',
  authDomain: 'learn-in-comfort.firebaseapp.com',
  projectId: 'learn-in-comfort',
  storageBucket: 'learn-in-comfort.firebasestorage.app',
  messagingSenderId: '840297023552',
  appId: '1:840297023552:web:dd561495ae5b928adef7a5',
  measurementId: 'G-GMYJ7M1JNQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const appForStorage = initializeApp(firebaseConfigForStorage);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
