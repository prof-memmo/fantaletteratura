window.fanta_db = window.fanta_db || {};

window.fanta_db.login = (email, password) => {
    return window.auth.signInWithEmailAndPassword(email, password);
};

window.fanta_db.loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    // Usiamo signInWithPopup per evitare i blocchi di Cross-Site Tracking (ITP) su Safari/iOS
    return window.auth.signInWithPopup(provider);
};
