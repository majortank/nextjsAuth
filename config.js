// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const auth = getAuth(app);

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC04dUi5ughQOoC8Oy-oeolSL8hymB6Qhs',
  authDomain: 'mitherapyspace.firebaseapp.com',
  projectId: 'mitherapyspace',
  storageBucket: 'mitherapyspace.appspot.com',
  messagingSenderId: '248795565780',
  appId: '1:248795565780:web:1cbeac07811a0aff863541',
  measurementId: 'G-9ZTM20QL3Q',
};

// Initialize Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firestore instance
const db = firebase.firestore();

export { firebase, db };
