window.fanta_db = window.fanta_db || {};

// --- MISSIONS ---
window.fanta_db.saveMission = async (missionData) => {
    const docRef = await window.db.collection("missions").add({
        ...missionData,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
};

window.fanta_db.getPendingMissions = async () => {
    const snapshot = await window.db.collection("missions").where("status", "==", "pending").get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

window.fanta_db.approveMission = async (missionId) => {
    await window.db.collection("missions").doc(missionId).update({ status: 'approved' });
};

// --- TOURNAMENTS ---
window.fanta_db.saveTournament = async (tournamentData) => {
    const docRef = await window.db.collection("tournaments").add({
        ...tournamentData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
};

window.fanta_db.getTournaments = async () => {
    const snapshot = await window.db.collection("tournaments").get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

window.fanta_db.deleteTournament = async (tournamentId) => {
    await window.db.collection("tournaments").doc(tournamentId).delete();
};

// --- INVITES ---
window.fanta_db.saveInvite = async (inviteData) => {
    await window.db.collection("invites").add({
        ...inviteData,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};

window.fanta_db.getInvites = async (email) => {
    const snapshot = await window.db.collection("invites").where("toEmail", "==", email).get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

window.fanta_db.updateInviteStatus = async (inviteId, status) => {
    await window.db.collection("invites").doc(inviteId).update({ status });
};

window.fanta_db.deleteInvite = async (inviteId) => {
    await window.db.collection("invites").doc(inviteId).delete();
};

// --- MINIGAME LOGS ---
window.fanta_db.saveMinigameLog = async (logData) => {
    try {
        const docRef = window.db.collection('minigame_logs').doc();
        await docRef.set({
            ...logData,
            timestamp: logData.timestamp || new Date().toISOString()
        });
        return true;
    } catch (e) {
        console.error("Error saving minigame log", e);
        return false;
    }
};

window.fanta_db.getMinigameLogs = async () => {
    try {
        const snap = await window.db.collection('minigame_logs').orderBy('timestamp', 'desc').get();
        return snap.docs.map(d => d.data());
    } catch (e) {
        console.error("Error getting minigame logs", e);
        return [];
    }
};

window.fanta_db.clearMinigameLogs = async () => {
    try {
        const snap = await window.db.collection('minigame_logs').get();
        const batch = window.db.batch();
        snap.docs.forEach(d => batch.delete(d.ref));
        await batch.commit();
        return true;
    } catch (e) {
        console.error("Error clearing minigame logs", e);
        return false;
    }
};
