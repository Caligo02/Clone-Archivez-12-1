import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDLT7wpS07VpOPwLxWKTG3dOeoLH26aoJo",
  authDomain: "senior-project-b820a.firebaseapp.com",
  projectId: "senior-project-b820a",
  storageBucket: "senior-project-b820a.firebasestorage.app",
  messagingSenderId: "40786060524",
  appId: "1:40786060524:web:e89f38ee2a9ae6cdd471c9",
  measurementId: "G-NPJCJC3Z3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// check if the user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is logged in, show model buttons and welcome message
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('model-buttons').style.display = 'flex';
    document.getElementById('user-info').innerText = `Welcome, ${user.email}`;
  } else {
    // If the user is not logged in, show login form and hide model buttons
    document.getElementById('login-form').style.display = 'flex';
    document.getElementById('model-buttons').style.display = 'none';
  }
});

// Login function
window.logIn = function() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in:', userCredential.user);
      // page will automatically update and show model buttons on successful login
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};

// Sign Up function
window.signUp = function() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User signed up:', userCredential.user);
    })
    .catch((error) => {
      alert("Sign Up failed: " + error.message);
    });
};

// Log Out function
window.logOut = function() {
  signOut(auth).then(() => {
    console.log("User logged out");
  }).catch((error) => {
    console.error("Error logging out:", error);
  });
};

// Reset Password function
window.resetPassword = function() {
  const email = document.getElementById('reset-email').value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      alert("Error resetting password: " + error.message);
    });
};
