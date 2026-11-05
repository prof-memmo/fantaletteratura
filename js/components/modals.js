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

function openLegalModal(type) {
    if (type === 'privacy') {
        if (typeof hasReadPrivacy !== 'undefined') hasReadPrivacy = true;
        window.hasReadPrivacy = true;
    }
    if (type === 'termini') {
        if (typeof hasReadTermini !== 'undefined') hasReadTermini = true;
        window.hasReadTermini = true;
    }
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Previeni scroll del body
    }
}

// Assicura che anche openSharedModal registri la lettura per le viste studente
const origOpenSharedModal = window.openSharedModal;
window.openSharedModal = function(type) {
    if (type === 'privacy') {
        if (typeof hasReadPrivacy !== 'undefined') hasReadPrivacy = true;
        window.hasReadPrivacy = true;
    }
    if (type === 'termini') {
        if (typeof hasReadTermini !== 'undefined') hasReadTermini = true;
        window.hasReadTermini = true;
    }
    if (typeof origOpenSharedModal === 'function') {
        origOpenSharedModal(type);
    } else {
        openLegalModal(type);
    }
};

function closeLegalModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.style.display = 'none';
        // Non ripristiniamo l'overflow se un'altra modale è aperta
        if (!document.querySelector('.modal-legal[style*="display: flex"]') && 
            !document.querySelector('.modal-legal[style*="display: block"]')) {
            document.body.style.overflow = '';
        }
    }
}
