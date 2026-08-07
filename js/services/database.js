window.fanta_db = window.fanta_db || {};

// --- SETTINGS / GLOBAL STATE ---
window.fanta_db.saveSettings = async (mode, settings) => {
    const docId = mode ? `game_state_${mode}` : "game_state";
    await window.db.collection("settings").doc(docId).set(settings);
};

window.fanta_db.getSnapshotSettings = (mode, cb) => {
    const docId = mode ? `game_state_${mode}` : "game_state";
    return window.db.collection("settings").doc(docId).onSnapshot(doc => {
        if (doc.exists) cb(doc.data());
        else cb(null);
    });
};
