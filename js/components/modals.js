function openWipModal(customDesc) {
    const modal = document.getElementById('modal-wip');
    if (!modal) return;
    if (customDesc) {
        const desc = document.getElementById('wip-modal-desc');
        if (desc) desc.innerHTML = customDesc;
    }
    modal.classList.add('active');
}

function closeWipModal() {
    const modal = document.getElementById('modal-wip');
    if (modal) modal.classList.remove('active');
}

/* ─────────────────────────────────────────────────────────────
   LEADERBOARD MODE SELECTION
───────────────────────────────────────────────────────────── */
function selectLeaderboardMode(modeId) {
    const mode = GAME_MODES[modeId];
    if (!mode) return;


function openLegalModal(type) {
    if (type === 'privacy') hasReadPrivacy = true;
    if (type === 'termini') hasReadTermini = true;
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Previeni scroll del body
    }
}

function closeLegalModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.style.display = 'none';
        // Non ripristiniamo l'overflow se un'altra modale è aperta
        if (!document.querySelector('.modal-legal[style*="display: flex"]') && 
            !document.querySelector('.modal-legal[style*="display: block"]')) {
