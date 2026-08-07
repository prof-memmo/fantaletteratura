window.fanta_db = window.fanta_db || {};

window.fanta_db.logout = () => {
    return window.auth.signOut();
};
