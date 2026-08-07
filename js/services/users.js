window.fanta_db = window.fanta_db || {};

// --- TEACHER REQUESTS ---
window.fanta_db.saveTeacherRequest = async (requestData) => {
    await window.db.collection("pending_requests").add({
        ...requestData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};

window.fanta_db.getTeacherRequests = async () => {
    const snapshot = await window.db.collection("pending_requests").get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

// --- USERS / STUDENTS ---
window.fanta_db.deleteUser = async (email) => {
    await window.db.collection("users").doc(email).delete();
};

window.fanta_db.getStudentsInTeam = async (teamId) => {
    const snapshot = await window.db.collection("users")
        .where("teamId", "==", teamId)
        .where("role", "==", "studente").get();
    return snapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(u => u.status !== 'archived');
};

window.fanta_db.moveStudent = async (studentEmail, newTeamId, newTeamCode) => {
    await window.db.collection("users").doc(studentEmail.toLowerCase()).update({
        teamId: newTeamId,
        teamCode: newTeamCode,
        movedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};
