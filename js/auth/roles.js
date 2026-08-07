window.fanta_db = window.fanta_db || {};

window.fanta_db.isAdmin = (email) => {
    return email === 'prof.memmo@gmail.com';
};

window.fanta_db.hasRole = (userDocData, expectedRole) => {
    if (!userDocData) return false;
    return userDocData.role === expectedRole;
};
