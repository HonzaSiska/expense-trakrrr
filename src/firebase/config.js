
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB7LGiIYj45FXmTTuViS-OBU1wt8j0Uf48",
  authDomain: "expense-trakrrr.firebaseapp.com",
  projectId: "expense-trakrrr",
  storageBucket: "expense-trakrrr.appspot.com",
  messagingSenderId: "582192833419",
  appId: "1:582192833419:web:42f1199b714c30feff458e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore()

//init firebase auth
const auth = getAuth()

// init storage 
const storage = getStorage(app)

export { db, auth, storage }