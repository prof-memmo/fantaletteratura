window.fanta_db = window.fanta_db || {};

// --- USERS / STUDENTS ---
window.fanta_db.deleteUser = async (email) => {
    await window.db.collection('fanta_users').doc(email).delete();
};

window.fanta_db.getStudentsInTeam = async (teamId) => {
    const snapshot = await window.db.collection('fanta_users')
        .where("teamId", "==", teamId)
        .where("role", "==", "studente").get();
    return snapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(u => u.status !== 'archived');
};

window.fanta_db.moveStudent = async (studentEmail, newTeamId, newTeamCode) => {
    await window.db.collection('fanta_users').doc(studentEmail.toLowerCase()).update({
        teamId: newTeamId,
        teamCode: newTeamCode,
        movedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};
