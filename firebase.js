  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import {getFirestore , doc, setDoc, getDoc ,getDocs ,collection, addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyBMg-do4kVyRVO7K-rxkS5vHoRlTiKIdxI",
    authDomain: "hackhaton-d2c61.firebaseapp.com",
    projectId: "hackhaton-d2c61",
    storageBucket: "hackhaton-d2c61.appspot.com",
    messagingSenderId: "481572071833",
    appId: "1:481572071833:web:0428f4d420cc6c41ee0b08",
    measurementId: "G-C1WGSFS4LW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth()
  const db = getFirestore()
  const storage = getStorage()

  export{auth,createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, db, doc, setDoc, getDocs , getDoc,  collection, addDoc, storage, ref, uploadBytesResumable, getDownloadURL}
