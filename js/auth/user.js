window.fanta_db = window.fanta_db || {};

window.fanta_db.getCurrentUser = () => {
    if (typeof firebase !== 'undefined' && window.auth) {
        return window.auth.currentUser;
    }
    return null;
};

window.fanta_db.getCurrentUserEmail = () => {
    const user = window.fanta_db.getCurrentUser();
    return user ? user.email : null;
};
