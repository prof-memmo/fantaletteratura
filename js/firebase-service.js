
// Service Layer for Firebase Firestore & Auth (Compat Version)
window.fanta_db = {
    // --- AUTH ---
    login: (email, password) => window.auth.signInWithEmailAndPassword(email, password),
    loginWithGoogle: () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return window.auth.signInWithPopup(provider);
    },
    logout: () => window.auth.signOut(),
    onAuthStateChanged: (cb) => window.auth.onAuthStateChanged(cb),

    // --- TEAMS ---
    saveTeam: async (teamData) => {
        // Genera un codice univoco di 6 caratteri (es: FL-A1B2)
        const generateCode = () => {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No O, 0, I, 1 to avoid confusion
            let result = '';
            for (let i = 0; i < 4; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return 'FL-' + result;
        };

        const docRef = await window.db.collection("teams").add({
            ...teamData,
            joinCode: generateCode(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    },
    getTeams: async (mode = 'all') => {
        let query = window.db.collection("teams");
        if (mode !== 'all') query = query.where("mode", "==", mode);
        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getTeamByCode: async (code) => {
        const snapshot = await window.db.collection("teams").where("joinCode", "==", code.toUpperCase()).get();
        if (snapshot.empty) return null;
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    },
    getUserTeams: async (email) => {
        const snapshot = await window.db.collection("teams").where("ownerEmail", "==", email).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // --- MISSIONS ---
    saveMission: async (missionData) => {
        const docRef = await window.db.collection("missions").add({
            ...missionData,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    },
    getPendingMissions: async () => {
        const snapshot = await window.db.collection("missions").where("status", "==", "pending").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    approveMission: async (missionId) => {
        await window.db.collection("missions").doc(missionId).update({ status: 'approved' });
    },

    // --- SETTINGS / GLOBAL STATE ---
    saveSettings: async (settings) => {
        await window.db.collection("settings").doc("game_state").set(settings, { merge: true });
    },
    getSnapshotSettings: (cb) => {
        return window.db.collection("settings").doc("game_state").onSnapshot(doc => {
            if (doc.exists) cb(doc.data());
        });
    },

    // --- TEACHER REQUESTS ---
    saveTeacherRequest: async (requestData) => {
        await window.db.collection("pending_requests").add({
            ...requestData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    getTeacherRequests: async () => {
        const snapshot = await window.db.collection("pending_requests").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // --- ADMIN / CLEANUP ---
    deleteUser: async (email) => {
        await window.db.collection("users").doc(email).delete();
    },
    deleteTeam: async (teamId) => {
        await window.db.collection("teams").doc(teamId).delete();
    },

    // --- TOURNAMENTS ---
    saveTournament: async (tournamentData) => {
        const docRef = await window.db.collection("tournaments").add({
            ...tournamentData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    },
    getTournaments: async () => {
        const snapshot = await window.db.collection("tournaments").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    deleteTournament: async (tournamentId) => {
        await window.db.collection("tournaments").doc(tournamentId).delete();
    },

    // --- INVITES ---
    saveInvite: async (inviteData) => {
        await window.db.collection("invites").add({
            ...inviteData,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    getInvites: async (email) => {
        const snapshot = await window.db.collection("invites").where("toEmail", "==", email).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    updateInviteStatus: async (inviteId, status) => {
        await window.db.collection("invites").doc(inviteId).update({ status });
    },
    deleteInvite: async (inviteId) => {
        await window.db.collection("invites").doc(inviteId).delete();
    }
};
