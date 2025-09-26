// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCISHyGtNcDN-lBcK2HACt2BpaFen-quv4',
    authDomain: 'note-app-phuoc.firebaseapp.com',
    projectId: 'note-app-phuoc',
    storageBucket: 'note-app-phuoc.firebasestorage.app',
    messagingSenderId: '414810768523',
    appId: '1:414810768523:web:40b16bf6edfde0fe90808e',
    measurementId: 'G-Q61NR3G9PD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
