window.fanta_db = window.fanta_db || {};

window.fanta_db.mapTeamDoc = (doc) => {
    const data = doc.data();
    return {
        ...data,
        docId: doc.id,
        id: data.id || doc.id
    };
};

window.fanta_db.getTeamDocRef = async (teamId) => {
    // 1. Cerca per ID del documento diretto (se coincide con teamId)
    const docRef = window.db.collection('fanta_teams').doc(teamId);
    const docSnap = await docRef.get();
    if (docSnap.exists) return docRef;
    
    // 2. Altrimenti, cerca un documento dove il campo "id" è uguale a teamId
    const querySnap = await window.db.collection('fanta_teams').where("id", "==", teamId).get();
    if (!querySnap.empty) {
        return querySnap.docs[0].ref;
    }
    return docRef;
};

window.fanta_db.saveTeam = async (teamData) => {
    // Genera un codice univoco di 6 caratteri (es: FL-A1B2)
    const generateCode = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No O, 0, I, 1 to avoid confusion
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return 'FL-' + result;
    };

    const docRef = await window.db.collection('fanta_teams').add({
        ...teamData,
        joinCode: generateCode(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
};

window.fanta_db.getTeams = async (mode = 'all') => {
    let query = window.db.collection('fanta_teams');
    if (mode !== 'all') query = query.where("mode", "==", mode);
    const snapshot = await query.get();
    return snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
};

window.fanta_db.getTeamByCode = async (code) => {
    const snapshot = await window.db.collection('fanta_teams').where("joinCode", "==", code.toUpperCase()).get();
    if (snapshot.empty) return null;
    return window.fanta_db.mapTeamDoc(snapshot.docs[0]);
};

window.fanta_db.getUserTeams = async (email) => {
    const snapshot = await window.db.collection('fanta_teams').where("ownerEmail", "==", email).get();
    return snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
};

window.fanta_db.deleteTeam = async (teamId) => {
    const ref = await window.fanta_db.getTeamDocRef(teamId);
    await ref.delete();
};

window.fanta_db.updateTeam = async (teamId, data) => {
    const ref = await window.fanta_db.getTeamDocRef(teamId);
    await ref.update(data);
};

window.fanta_db.addCollaboratore = async (teamId, email) => {
    const ref = await window.fanta_db.getTeamDocRef(teamId);
    await ref.update({
        collaboratori: firebase.firestore.FieldValue.arrayUnion(email.toLowerCase())
    });
};

window.fanta_db.removeCollaboratore = async (teamId, email) => {
    const ref = await window.fanta_db.getTeamDocRef(teamId);
    await ref.update({
        collaboratori: firebase.firestore.FieldValue.arrayRemove(email.toLowerCase())
    });
};

window.fanta_db.getCollaboratedTeams = async (email) => {
    const snapshot = await window.db.collection('fanta_teams')
        .where("collaboratori", "array-contains", email.toLowerCase()).get();
    return snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
};
