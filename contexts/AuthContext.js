import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBUBNaoFAOwg6aDSxUt-oBbwQpjdPMCIfw',
  authDomain: 'newsmanagementportal.firebaseapp.com',
  projectId: 'newsmanagementportal',
  storageBucket: 'newsmanagementportal.appspot.com',
  messagingSenderId: '1045348417119',
  appId: '1:1045348417119:web:662932e22f530346fc25ea',
  measurementId: 'G-7S4JKVJGR8',
};

// Initialize Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Create auth context
const AuthContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Firebase auth state change listener
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Firebase sign up function
  const signUp = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase login function
  const login = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Logged in with Email');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase login with Google function
  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      console.log('Logged in with Google');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase logout function
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook for child components to get the auth object and re-render when it changes.
export function useAuth() {
  return useContext(AuthContext);
}
