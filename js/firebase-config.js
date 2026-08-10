
// Inizializzazione Firebase (Compat Version for non-module app.js)
const firebaseConfig = {
  apiKey: "AIzaSyD-n2m-kYEuzGXPMKclZTggf4Y5Zm8_cdM",
  authDomain: "prof-memmo-hub.firebaseapp.com",
  projectId: "prof-memmo-hub",
  storageBucket: "prof-memmo-hub.firebasestorage.app",
  messagingSenderId: "839149485689",
  appId: "1:839149485689:web:04ee4fa6237d94d0b71ea8"
};

// Carichiamo Firebase Compat tramite CDN nel file HTML e poi inizializziamo qui
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    window.auth = firebase.auth();
    console.log("Firebase Global initialized successfully.");
} else {
    console.warn("Firebase scripts not loaded yet. Make sure they are in index.html");
}
