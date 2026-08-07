window.fanta_db = window.fanta_db || {};

window.fanta_db.onAuthStateChanged = (cb) => {
    return window.auth.onAuthStateChanged(cb);
};
