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

window.fanta_db.getTeams = async (mode = 'all', includeArchived = false) => {
    let query = window.db.collection('fanta_teams');
    if (mode !== 'all') query = query.where("mode", "==", mode);
    const snapshot = await query.get();
    const teams = snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
    if (!includeArchived) {
        return teams.filter(t => t.status !== 'archived' && !t.archivedYear);
    }
    return teams;
};

window.fanta_db.getTeamByCode = async (code) => {
    if (!code) return null;
    const cleanCode = String(code).trim();
    const upperCode = cleanCode.toUpperCase();
    const lowerCode = cleanCode.toLowerCase();

    // 1. Prova per joinCode (retrocompatibilità codici legacy FL-XXXX)
    try {
        const snapshot = await window.db.collection('fanta_teams').where("joinCode", "==", upperCode).get();
        if (!snapshot.empty) {
            const team = window.fanta_db.mapTeamDoc(snapshot.docs[0]);
            if (team.status !== 'archived' && !team.archivedYear) {
                return team;
            }
        }
    } catch (e) {
        console.warn("getTeamByCode joinCode search error:", e);
    }

    // 2. Ricerca squadre per Codice Classe in fanta_teams (se utente/studente autorizzato)
    try {
        let matchingDocs = [];

        // 2a. Query per classCode (es. "3B" o "3b")
        const snapClassCode = await window.db.collection('fanta_teams').where("classCode", "==", upperCode).get();
        snapClassCode.forEach(d => matchingDocs.push(d));

        if (snapClassCode.empty && upperCode !== cleanCode) {
            const snapClassCodeRaw = await window.db.collection('fanta_teams').where("classCode", "==", cleanCode).get();
            snapClassCodeRaw.forEach(d => matchingDocs.push(d));
        }

        // 2b. Query per classId (es. "classe_3b" o "3b")
        if (matchingDocs.length === 0) {
            const snapClassId = await window.db.collection('fanta_teams').where("classId", "==", lowerCode).get();
            snapClassId.forEach(d => matchingDocs.push(d));

            if (snapClassId.empty && !lowerCode.startsWith('classe_')) {
                const snapClassIdPrefixed = await window.db.collection('fanta_teams').where("classId", "==", 'classe_' + lowerCode).get();
                snapClassIdPrefixed.forEach(d => matchingDocs.push(d));
            }
        }

        // Filtra escludendo archiviate
        const activeTeams = matchingDocs
            .map(d => window.fanta_db.mapTeamDoc(d))
            .filter(t => t.status !== 'archived' && !t.archivedYear);

        if (activeTeams.length > 0) {
            // Cerca se lo studente loggato è già associato a una squadra specifica di questa classe
            const user = window.auth ? window.auth.currentUser : null;
            const userEmail = (user && user.email ? user.email : (localStorage.getItem('hub_user_email') || localStorage.getItem('fanta_user_email') || '')).toLowerCase().trim();
            const userName = (user && user.displayName ? user.displayName : (localStorage.getItem('hub_user_name') || localStorage.getItem('pm_student_name') || '')).toLowerCase().trim();

            if (userEmail || userName) {
                const assignedTeam = activeTeams.find(t => {
                    if (!Array.isArray(t.members)) return false;
                    return t.members.some(m => {
                        if (!m) return false;
                        if (typeof m === 'string') {
                            const mStr = m.toLowerCase().trim();
                            return (userEmail && mStr === userEmail) || (userName && mStr === userName);
                        }
                        const mEmail = (m.email || '').toLowerCase().trim();
                        const mName = (m.name || m.displayName || m.nome || '').toLowerCase().trim();
                        const mId = (m.studentId || m.uid || m.id || '').toLowerCase().trim();
                        return (userEmail && (mEmail === userEmail || mId === userEmail)) || (userName && mName === userName);
                    });
                });
                if (assignedTeam) return assignedTeam;
            }

            // Se lo studente non è associato a una squadra specifica, assegna la prima squadra attiva della classe
            return activeTeams[0];
        }
    } catch (e) {
        console.warn("getTeamByCode fanta_teams search error:", e);
    }

    // 3. Risoluzione Classe Ecosistema Hub (hub_classes - lettura pubblica per studenti)
    try {
        let snapHubClass = await window.db.collection('hub_classes').where("code", "==", upperCode).limit(1).get();
        if (snapHubClass.empty) {
            snapHubClass = await window.db.collection('hub_classes').where("name", "==", upperCode).limit(1).get();
        }
        if (snapHubClass.empty && upperCode !== cleanCode) {
            snapHubClass = await window.db.collection('hub_classes').where("name", "==", cleanCode).limit(1).get();
        }
        if (snapHubClass.empty && lowerCode) {
            const directDoc = await window.db.collection('hub_classes').doc(lowerCode).get();
            if (directDoc.exists) snapHubClass = { empty: false, docs: [directDoc] };
        }
        if (snapHubClass.empty && lowerCode && !lowerCode.startsWith('classe_')) {
            const directDoc = await window.db.collection('hub_classes').doc('classe_' + lowerCode).get();
            if (directDoc.exists) snapHubClass = { empty: false, docs: [directDoc] };
        }

        if (!snapHubClass.empty) {
            const classData = snapHubClass.docs[0].data() || {};
            const resolvedClassCode = classData.code || upperCode;
            const resolvedClassName = classData.name || `Classe ${upperCode}`;
            return {
                id: snapHubClass.docs[0].id,
                name: resolvedClassName,
                classCode: resolvedClassCode,
                className: resolvedClassName,
                classId: snapHubClass.docs[0].id,
                ownerEmail: (classData.teacherEmail || '').toLowerCase(),
                isClassOnly: true
            };
        }
    } catch (e) {
        console.warn("getTeamByCode hub_classes search error:", e);
    }

    return null;
};

window.fanta_db.getUserTeams = async (email, includeArchived = false) => {
    const snapshot = await window.db.collection('fanta_teams').where("ownerEmail", "==", email).get();
    const teams = snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
    if (!includeArchived) {
        return teams.filter(t => t.status !== 'archived' && !t.archivedYear);
    }
    return teams;
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

window.fanta_db.getCollaboratedTeams = async (email, includeArchived = false) => {
    const snapshot = await window.db.collection('fanta_teams')
        .where("collaboratori", "array-contains", email.toLowerCase()).get();
    const teams = snapshot.docs.map(doc => window.fanta_db.mapTeamDoc(doc));
    if (!includeArchived) {
        return teams.filter(t => t.status !== 'archived' && !t.archivedYear);
    }
    return teams;
};
