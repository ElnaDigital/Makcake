/**
 * MAK CAKE — Firebase Client SDK Configuration & Initialization
 * Project: mak-cake-app
 * Spark Free Tier: Firestore Database + Google Authentication (Web SDK v9 compat)
 */

const firebaseConfig = {
  apiKey: "AIzaSyBIW6EULB7hhbWoCyWJdcPaPhne2cB3Wkk",
  authDomain: "mak-cake-app.firebaseapp.com",
  projectId: "mak-cake-app",
  storageBucket: "mak-cake-app.firebasestorage.app",
  messagingSenderId: "455663438477",
  appId: "1:455663438477:web:e0a430b065c8e3ce3130c4",
  measurementId: "G-6X2YGNGZPV"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

// Global references for Firestore & Auth
const firebaseApp = typeof firebase !== 'undefined' ? firebase.app() : null;
const firestoreDb = typeof firebase !== 'undefined' ? firebase.firestore() : null;
const firebaseAuth = typeof firebase !== 'undefined' ? firebase.auth() : null;

// Initial Authorized Owner Email
const DEFAULT_OWNER_EMAIL = "natnaelagizew27@gmail.com";
