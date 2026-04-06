
// Inizializzazione Firebase (Compat Version for non-module app.js)
const firebaseConfig = {
  apiKey: "AIzaSyB3wKx8ssbZVMtbiH5vbDDvAEgwzZcfRVQ",
  authDomain: "fantaletteratura-a7ff1.firebaseapp.com",
  projectId: "fantaletteratura-a7ff1",
  storageBucket: "fantaletteratura-a7ff1.firebasestorage.app",
  messagingSenderId: "358353594988",
  appId: "1:358353594988:web:07d26d2f4439e9116b8649",
  measurementId: "G-C5XZSY72DF"
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
