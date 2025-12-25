// js/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDoBtFtFEs6Cd-uU6dNvwXNAuXOd1R1r10",
  authDomain: "post-58eb6.firebaseapp.com",
  projectId: "post-58eb6",
  storageBucket: "post-58eb6.firebasestorage.app",
  messagingSenderId: "448356917822",
  appId: "1:448356917822:web:8251dc0ecff7fcd0efe76f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();
const storage = firebase.storage();

// Make available globally
window.db = db;
window.firebaseStorage = storage;