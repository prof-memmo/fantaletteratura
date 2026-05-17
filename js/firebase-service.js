
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
    mapTeamDoc: (doc) => {
        const data = doc.data();
        return {
            ...data,
            docId: doc.id,
            id: data.id || doc.id
        };
    },
    getTeamDocRef: async (teamId) => {
        // 1. Cerca per ID del documento diretto (se coincide con teamId)
        const docRef = window.db.collection("teams").doc(teamId);
        const docSnap = await docRef.get();
        if (docSnap.exists) return docRef;
        
        // 2. Altrimenti, cerca un documento dove il campo "id" è uguale a teamId
        const querySnap = await window.db.collection("teams").where("id", "==", teamId).get();
        if (!querySnap.empty) {
            return querySnap.docs[0].ref;
        }
        return docRef;
    },
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
        return snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
    },
    getTeamByCode: async (code) => {
        const snapshot = await window.db.collection("teams").where("joinCode", "==", code.toUpperCase()).get();
        if (snapshot.empty) return null;
        return window.fanta_db.mapTeamDoc(snapshot.docs[0]);
    },
    getUserTeams: async (email) => {
        const snapshot = await window.db.collection("teams").where("ownerEmail", "==", email).get();
        return snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
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
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    },
    approveMission: async (missionId) => {
        await window.db.collection("missions").doc(missionId).update({ status: 'approved' });
    },

    // --- SETTINGS / GLOBAL STATE ---
    saveSettings: async (mode, settings) => {
        const docId = mode ? `game_state_${mode}` : "game_state";
        await window.db.collection("settings").doc(docId).set(settings);
    },

    getSnapshotSettings: (mode, cb) => {
        const docId = mode ? `game_state_${mode}` : "game_state";
        return window.db.collection("settings").doc(docId).onSnapshot(doc => {
            if (doc.exists) cb(doc.data());
            else cb(null);
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
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    },

    // --- ADMIN / CLEANUP ---
    deleteUser: async (email) => {
        await window.db.collection("users").doc(email).delete();
    },
    deleteTeam: async (teamId) => {
        const ref = await window.fanta_db.getTeamDocRef(teamId);
        await ref.delete();
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
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
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
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    },
    updateInviteStatus: async (inviteId, status) => {
        await window.db.collection("invites").doc(inviteId).update({ status });
    },
    deleteInvite: async (inviteId) => {
        await window.db.collection("invites").doc(inviteId).delete();
    },

    // --- COLLABORATORI DOCENTI ---
    addCollaboratore: async (teamId, email) => {
        const ref = await window.fanta_db.getTeamDocRef(teamId);
        await ref.update({
            collaboratori: firebase.firestore.FieldValue.arrayUnion(email.toLowerCase())
        });
    },
    removeCollaboratore: async (teamId, email) => {
        const ref = await window.fanta_db.getTeamDocRef(teamId);
        await ref.update({
            collaboratori: firebase.firestore.FieldValue.arrayRemove(email.toLowerCase())
        });
    },
    getCollaboratedTeams: async (email) => {
        const snapshot = await window.db.collection("teams")
            .where("collaboratori", "array-contains", email.toLowerCase()).get();
        return snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
    },

    // --- STUDENTI IN SQUADRA ---
    getStudentsInTeam: async (teamId) => {
        const snapshot = await window.db.collection("users")
            .where("teamId", "==", teamId)
            .where("role", "==", "studente").get();
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    },
    moveStudent: async (studentEmail, newTeamId, newTeamCode) => {
        await window.db.collection("users").doc(studentEmail.toLowerCase()).update({
            teamId: newTeamId,
            teamCode: newTeamCode,
            movedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    updateTeam: async (teamId, data) => {
        const ref = await window.fanta_db.getTeamDocRef(teamId);
        await ref.update(data);
    }
};
