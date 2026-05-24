// Fantaletteratura Web App - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

const STORAGE_KEY = 'fanta_state_v1';
let pendingInitialView = null;

// ── GAME MODE STATE ──────────────────────────────────────────
let currentTeamMode = 'terze';        // modalità scelta nel form "Crea Squadra"
let currentLeaderboardMode = 'terze'; // modalità selezionata nelle classifiche
window.currentAdminMode = 'terze';    // modalità selezionata nel pannello admin


async function loadGameState(specificMode = null) {
    const mode = specificMode || window.currentAdminMode || 'terze';
    
    // Pulizia sottoscrizione precedente se necessario (non implementato qui per semplicità Compat)
    fanta_db.getSnapshotSettings(mode, (state) => {
        // Fallback: se il documento specifico non esiste, proviamo quello globale per compatibilità
        if (!state && mode === 'terze') {
            fanta_db.getSnapshotSettings(null, (s) => processState(s, mode));
        } else {
            processState(state, mode);
        }
    });
}

function processState(state, mode) {
    const modeCfg = GAME_MODES[mode] || GAME_MODES.terze;
    const pool = modeCfg.authors;

    if(state) {
        // Reset completo del pool specifico prima di applicare lo stato da Firestore
        pool.forEach(a => {
            a.isPointsRevealed = false;
            a.isSchedaRevealed = false;
        });

        // Applica pointsRevealed
        if(state.pointsRevealed) {
            pool.forEach(a => {
                if(state.pointsRevealed.includes(a.id)) a.isPointsRevealed = true;
            });
        }
        // Applica schedaRevealed
        if(state.schedaRevealed) {
            pool.forEach(a => {
                if(state.schedaRevealed.includes(a.id)) a.isSchedaRevealed = true;
            });
        }
        
        // Retrocompatibilità
        if(state.revealedAuthors && !state.pointsRevealed) {
            pool.forEach(a => {
                if(state.revealedAuthors.includes(a.id)) {
                    a.isPointsRevealed = true;
                    a.isSchedaRevealed = true;
                }
            });
        }
        
        if (typeof populateSchede === 'function') populateSchede(mode);
        if (typeof renderAdminAutori === 'function') renderAdminAutori(mode);
        if (typeof renderNotifiche === 'function') renderNotifiche();
    }
}

async function saveGameState(specificMode = null) {
    const mode = specificMode || window.currentAdminMode || 'terze';
    const modeCfg = GAME_MODES[mode] || GAME_MODES.terze;
    const pool = modeCfg.authors;

    // Feedback visivo
    const existing = document.getElementById('save-indicator');
    if (existing) existing.remove();
    const feedback = document.createElement('div');
    feedback.id = 'save-indicator';
    feedback.style = 'position:fixed; top:20px; right:20px; background:var(--primary-color); color:var(--bg-dark); padding:10px 20px; border-radius:30px; font-weight:bold; z-index:10000; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-size:0.85rem; pointer-events:none;';
    feedback.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Salvataggio ${modeCfg.label}...`;
    document.body.appendChild(feedback);

    try {
        let ptsRevealed = pool.filter(a => a.isPointsRevealed).map(a => a.id);
        let schRevealed = pool.filter(a => a.isSchedaRevealed).map(a => a.id);
        let state = {
            pointsRevealed: ptsRevealed,
            schedaRevealed: schRevealed,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await fanta_db.saveSettings(mode, state);
        feedback.style.background = '#4caf50';
        feedback.innerHTML = '<i class="fa-solid fa-check"></i> Salvato!';
        setTimeout(() => { if(feedback.parentNode) feedback.remove(); }, 2000);
    } catch (e) {
        console.error("Errore salvataggio:", e);
        feedback.style.background = 'var(--danger-color)';
        feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Errore!';
        alert("Errore salvataggio: " + e.message);
        setTimeout(() => { if(feedback.parentNode) feedback.remove(); }, 5000);
    }
}

function initApp() {
    // Visibilità immediata — previene la schermata grigia nella HOME
    // Nel pannello admin aspettiamo la verifica di checkLoginSession per sicurezza
    const isLoginPage = window.location.pathname.includes('admin.html');
    const _c = document.getElementById('app-container');
    if (_c && !isLoginPage) _c.style.display = 'block';

    // Migrazione unica per pulire fanta_seen_schede inquinato dal vecchio bug di auto-lettura in background
    if (!localStorage.getItem('fanta_seen_schede_migrated_v3')) {
        localStorage.removeItem('fanta_seen_schede');
        localStorage.setItem('fanta_seen_schede_migrated_v3', 'true');
        console.log("Migration: cleared old fanta_seen_schede auto-read pollution.");
    }

    // Sottoscrivi real-time a tutti i campionati per raccogliere notifiche e schede in tempo reale
    loadGameState('terze');
    loadGameState('seconde');
    loadGameState('avanzato');

    // 1. Navigation setup
    setupNavigation();
    
    // 2. Data Initialization
    populateAuthorSelects(window.currentAdminMode || 'terze');
    populateSchede(window.currentAdminMode || 'terze');
    
    // 3. Event Listeners
    setupBudgetCalculator();
    setupAdminPanel();
    setupTeamSave();
    
    checkLoginSession();
    
    // Check hash for direct navigation from external pages (like admin)
    if (window.location.hash) {
        const viewId = window.location.hash.substring(1);
        if (document.getElementById(viewId)) {
            pendingInitialView = viewId;
        }
    }
    
    // Handle browser back button (popstate mapping to hash changes)
    window.addEventListener('popstate', (e) => {
        if(window.location.hash) {
            const viewId = window.location.hash.substring(1);
            if(document.getElementById(viewId)) {
                navigateTo(viewId, false);
            }
        } else {
            navigateTo('view-welcome', false);
        }
    });
    
    console.log("App Initialized successfully!");
}

/* =========================================
   NAVIGATION & VIEW ROUTING
========================================= */
function setupNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');

    // Handle bottom navigation
    tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetView = tab.getAttribute('data-view');
            if (targetView) {
                e.preventDefault();
                navigateTo(targetView);
            }
        });
    });
}

function navigateTo(viewId, pushHistory = true) {
    if (!viewId) return;

    // ACCESSO E PROTEZIONE NAVIGAZIONE
    const isPublicView = ['view-welcome', 'view-onboarding', 'view-iscrizione', 'view-regolamento', 'view-contatti'].includes(viewId);
    const hasStudentCode = localStorage.getItem('fanta_active_team_code');
    const isDocente = !!currentUserEmail;

    // Restrizioni per Studenti
    const isRestrictedForStudents = ['view-profilo', 'view-squadra', 'view-missioni'].includes(viewId);
    const userRole = (typeof currentUserRole !== 'undefined' ? currentUserRole : '') || localStorage.getItem('fanta_user_role') || (hasStudentCode && !isDocente ? 'studente' : '');

    if (isRestrictedForStudents && (userRole === 'studente' || (hasStudentCode && !isDocente))) {
        alert("Questa sezione è riservata ai docenti e fantamici.");
        navigateTo('view-welcome', pushHistory);
        return;
    }

    if (!isPublicView && !hasStudentCode && !isDocente) {
        // Blocco totale per utenti non loggati che provano ad accedere a sezioni riservate
        alert("Devi prima effettuare l'accesso per visitare questa sezione.");
        navigateTo('view-welcome', pushHistory);
        return;
    }

    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.add('active');
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Dynamic refresh
    if(viewId === 'view-missioni' && typeof renderMissioniUtente === 'function') {
        renderMissioniUtente();
    }
    if(viewId === 'view-profilo') {
        renderProfilo();
    }
    if(viewId === 'view-schede') {
        if(typeof window.segnaTuttiAutoriRivelatiComeVisti === 'function') {
            window.segnaTuttiAutoriRivelatiComeVisti();
        }
    }

    // Hightlight side-menu active link
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('data-view') === viewId) {
            link.classList.add('active');
        }
    });

    // Hightlight bottom-bar active tab
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
        if(tab.getAttribute('data-view') === viewId) {
            tab.classList.add('active');
        }
    });
    
    // Update Browser History if requested
    if(pushHistory && viewId !== 'view-welcome') {
        window.history.pushState({view: viewId}, '', '#' + viewId);
    } else if (pushHistory && viewId === 'view-welcome') {
        window.history.pushState({view: viewId}, '', window.location.pathname);
    }
}

/* =========================================
   TEAM CREATION & BUDGET (CORE LOGIC)
   - Avatars Modal Selection
========================================= */
const MAX_BUDGET = 20000;
let teamSelection = { 1: null, 2: null, 3: null, 4: null, 5: null };
let activeSlot = null;

/* ─────────────────────────────────────────────────────────────
   GAME MODE SELECTION (team registration)
───────────────────────────────────────────────────────────── */
function selectTeamMode(modeId) {
    const mode = GAME_MODES[modeId];
    if (!mode) return;

    // If mode not available → show WIP modal and abort
    if (!mode.available) {
        openWipModal(`La modalità <strong>${mode.label}</strong> non è ancora disponibile. Stiamo preparando gli autori!`);
        return;
    }

    currentTeamMode = modeId;

    // Update button styles
    const colorClassMap = { terze: 'active-green', seconde: 'active-orange', avanzato: 'active-gold' };
    ['terze', 'seconde', 'avanzato'].forEach(id => {
        const btn = document.getElementById('mode-btn-' + id);
        if (btn) {
            btn.classList.remove('active-green', 'active-orange', 'active-gold');
            if (id === modeId) btn.classList.add(colorClassMap[id]);
        }
    });

    // Show budget bar and author slots
    const budgetContainer = document.getElementById('budget-container');
    const slotsSection = document.getElementById('author-slots-section');
    if (budgetContainer) budgetContainer.style.display = 'block';
    if (slotsSection) slotsSection.style.display = 'block';

    // Reset any previous selection
    teamSelection = { 1: null, 2: null, 3: null, 4: null, 5: null };
    document.querySelectorAll('.author-slot-btn').forEach(btn => {
        const ord = ['1ª','2ª','3ª','4ª','5ª'];
        const slot = btn.dataset.slot;
        btn.innerHTML = `<span class="slot-name"><i class="fa-solid fa-plus"></i> Scegli la ${ord[slot-1]} star</span> <span class="slot-cost text-primary"></span>`;
    });
    document.querySelectorAll('.author-remove-btn').forEach(b => b.classList.remove('visible'));
    calculateBudget();

    // Re-populate author grid for this mode
    populateAuthorSelects(modeId);
}

/* ─────────────────────────────────────────────────────────────
   WIP MODAL
───────────────────────────────────────────────────────────── */
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

    if (!mode.available) {
        openWipModal(`La classifica <strong>${mode.label}</strong> non è ancora disponibile. Stiamo preparando gli autori!`);
        return;
    }

    currentLeaderboardMode = modeId;

    // Update tab styles
    const colorClassMap = { terze: 'active-green', seconde: 'active-orange', avanzato: 'active-gold' };
    ['terze', 'seconde', 'avanzato'].forEach(id => {
        const tab = document.getElementById('lb-tab-' + id);
        if (tab) {
            tab.classList.remove('active-green', 'active-orange', 'active-gold');
            if (id === modeId) tab.classList.add(colorClassMap[id]);
        }
    });

    // Show type buttons and update styling
    const typeDiv = document.getElementById('lb-type-buttons');
    if (typeDiv) typeDiv.style.display = 'flex';

    // Update button colors based on mode
    const btnColor = mode.colorPrimary;
    ['lb-btn-autori','lb-btn-missioni','lb-btn-globale'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.style.background = btnColor + ' !important';
    });

    // Update label
    const label = document.getElementById('lb-mode-selected-label');
    if (label) label.textContent = `${mode.emoji} ${mode.label}`;
}


function populateAuthorSelects(modeId) {
    const grid = document.getElementById('author-grid');
    if(!grid) return;

    // Determine which author pool to use
    const modeKey = modeId || currentTeamMode || 'terze';
    const modeCfg = GAME_MODES[modeKey] || GAME_MODES.terze;
    const pool = modeCfg.authors || AUTHORS;
    const currency = modeCfg.currencyLabel || 'lire';
    
    grid.innerHTML = '';
    // Sort logic update: use cost or points
    const sortedAuthors = [...pool].sort((a, b) => (b.cost || b.points || 0) - (a.cost || a.points || 0));
    
    sortedAuthors.forEach(author => {
        const card = document.createElement('div');
        const isInternationalClass = author.isInternational ? 'card-international' : '';
        card.className = `author-card glass ${isInternationalClass}`;
        card.dataset.id = author.id;
        card.innerHTML = `
            <div class="author-image-wrapper">
                <img src="${author.image}" alt="${author.name}">
            </div>
            <div class="author-name" style="font-family: var(--font-heading); font-weight:bold; font-size:1.1rem; color:#f5c53c;">${author.name}</div>
            <div class="text-primary" style="font-size:0.9rem; font-weight:600;">${author.cost || author.points} ${currency}</div>
        `;
        card.addEventListener('click', () => {
            selectAuthorForSlot(author.id, modeKey);
        });
        grid.appendChild(card);
    });

    // Setup slot buttons — attach once, track current modeId via closure later
    document.querySelectorAll('.author-slot-btn').forEach(btn => {
        // Remove old listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            activeSlot = newBtn.dataset.slot;
            document.getElementById('author-selector-modal').style.display = 'block';
            updateGridDisabledState();
        });
    });

    // Search filter
    const searchInput = document.getElementById('search-author');
    if (searchInput) {
        const newInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newInput, searchInput);
        newInput.addEventListener('input', () => {
            const q = newInput.value.toLowerCase();
            document.querySelectorAll('.author-card').forEach(card => {
                const nameDiv = card.querySelector('.author-name');
                const name = nameDiv ? nameDiv.textContent.toLowerCase() : '';
                card.style.display = name.includes(q) ? '' : 'none';
            });
        });
    }

    const closeBtn = document.getElementById('close-author-modal');
    if(closeBtn) {
        const newClose = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newClose, closeBtn);
        newClose.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('author-selector-modal').style.display = 'none';
            activeSlot = null;
        });
    }
}

function updateGridDisabledState() {
    // Disable authors already selected in other slots
    const selectedIds = Object.values(teamSelection).filter(val => val !== null);
    document.querySelectorAll('.author-card').forEach(card => {
        if (selectedIds.includes(card.dataset.id)) {
            card.style.opacity = '0.3';
            card.style.pointerEvents = 'none';
        } else {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        }
    });
}

function selectAuthorForSlot(authorId, modeId) {
    if (!activeSlot) return;
    teamSelection[activeSlot] = authorId;

    // Determine which author pool
    const mode = modeId ? GAME_MODES[modeId] : (currentTeamMode ? GAME_MODES[currentTeamMode] : null);
    const pool = (mode && mode.authors && mode.authors.length > 0) ? mode.authors : AUTHORS;
    const author = pool.find(a => a.id === authorId);
    if (!author) return;
    
    // Determine mode configuration for currency
    const modeKey = modeId || currentTeamMode || 'terze';
    const modeCfg = GAME_MODES[modeKey] || GAME_MODES.terze;
    const currency = modeCfg.currencyLabel || 'lire';
    const price = author.cost || author.points || 0;
    
    // Update button UI
    const btn = document.querySelector(`.author-slot-btn[data-slot="${activeSlot}"]`);
    if(btn) {
        btn.innerHTML = `<div style="display:flex; align-items:center; gap:10px;">
                            <img src="${author.image}" style="width:30px; height:30px; object-fit:cover; border-radius:50%; background:#fff;"> 
                            <span>${author.name}</span>
                         </div> 
                         <span class="text-primary">${price} ${currency}</span>`;
    }

    // Show remove button for this slot
    const removeBtn = document.querySelector(`.author-remove-btn[data-slot="${activeSlot}"]`);
    if (removeBtn) removeBtn.classList.add('visible');

    document.getElementById('author-selector-modal').style.display = 'none';
    calculateBudget();
}

function removeAuthorFromSlot(slot) {
    teamSelection[slot] = null;
    const ord = ['1ª','2ª','3ª','4ª','5ª'];
    const btn = document.querySelector(`.author-slot-btn[data-slot="${slot}"]`);
    if (btn) {
        btn.innerHTML = `<span class="slot-name"><i class="fa-solid fa-plus"></i> Scegli la ${ord[slot-1]} star</span> <span class="slot-cost text-primary"></span>`;
    }
    const removeBtn = document.querySelector(`.author-remove-btn[data-slot="${slot}"]`);
    if (removeBtn) removeBtn.classList.remove('visible');
    calculateBudget();
}

function setupBudgetCalculator() {
    calculateBudget();
}

function calculateBudget() {
    const budgetBar = document.getElementById('budget-bar');
    const budgetText = document.getElementById('budget-text');
    const budgetStatus = document.getElementById('budget-status');

    if(!budgetBar) return;

    // Use current mode or default to 'terze'
    const modeId = currentTeamMode || 'terze';
    const modeCfg = GAME_MODES[modeId] || GAME_MODES.terze;
    const pool = modeCfg.authors || AUTHORS;
    const totalBudget = modeCfg.budget || 20000;
    const currency = modeCfg.currencyLabel || 'lire';

    let spent = 0;
    
    Object.values(teamSelection).forEach(authorId => {
        if(authorId) {
            const author = pool.find(a => a.id === authorId);
            if(author) {
                // Support both 'cost' (legacy) and 'points' (new)
                spent += (author.cost || author.points || 0);
            }
        }
    });

    const remaining = totalBudget - spent;
    
    // Update Text
    if(budgetText) {
        if(remaining >= 0) {
            budgetText.textContent = `${remaining.toLocaleString()} ${currency}`;
        } else {
            budgetText.textContent = "BUDGET SUPERATO";
        }
    }

    if(budgetStatus) {
        if(remaining >= 0) {
            budgetStatus.textContent = `Hai ancora ${remaining.toLocaleString()} ${currency} da spendere!`;
            budgetStatus.style.color = "inherit";
        } else {
            budgetStatus.textContent = `Sei fuori budget di ${Math.abs(remaining).toLocaleString()} ${currency}!`;
            budgetStatus.style.color = "var(--danger-color)";
        }
    }

    // Update Progress Bar
    if(budgetBar) {
        const percent = Math.min((spent / totalBudget) * 100, 100);
        budgetBar.style.width = `${percent}%`;
        
        if (spent > totalBudget) {
            budgetBar.classList.add('over');
            budgetBar.style.background = 'var(--danger-color)';
        } else {
            budgetBar.classList.remove('over');
            budgetBar.style.background = 'var(--primary-color)';
        }
    }

    // Update Save Team Button
    const saveBtn = document.getElementById('btn-save-team');
    if (saveBtn) {
        let allSlotsFilled = true;
        for (let i = 1; i <= 5; i++) {
            if (!teamSelection[i]) {
                allSlotsFilled = false;
                break;
            }
        }
        if (allSlotsFilled && remaining >= 0) {
            saveBtn.disabled = false;
        } else {
            saveBtn.disabled = true;
        }
    }
}

// ── SPOSTAMENTO STUDENTI ────────────────────────────────────
window.apriSpostaStudente = async function(studentEmail, currentTeamId, currentTeamName) {
    const modal = document.getElementById('modal-sposta-studente');
    if (!modal) return;

    document.getElementById('sposta-studente-email').value = studentEmail;
    document.getElementById('sposta-studente-nome').textContent =
        `Studente: ${studentEmail} — attualmente in: ${currentTeamName}`;

    // Popola select con tutte le altre squadre
    const allTeams = await getAllTeams();
    const select = document.getElementById('sposta-studente-select');
    select.innerHTML = allTeams
        .filter(t => t.id !== currentTeamId)
        .map(t => `<option value="${t.id}" data-code="${t.joinCode || ''}">${t.name} (${t.classe || ''})</option>`)
        .join('');

    modal.style.display = 'flex';
};

window.confermaSposta = async function() {
    const email = document.getElementById('sposta-studente-email').value;
    const select = document.getElementById('sposta-studente-select');
    const newTeamId = select.value;
    const newTeamCode = select.selectedOptions[0]?.dataset.code || '';
    if (!newTeamId) { alert('Seleziona una squadra di destinazione.'); return; }

    try {
        await fanta_db.moveStudent(email, newTeamId, newTeamCode);
        document.getElementById('modal-sposta-studente').style.display = 'none';
        alert('Studente spostato con successo!');
        if (window.location.pathname.includes('admin.html')) {
            if (typeof window.renderAdminSquadre === 'function') window.renderAdminSquadre();
        } else {
            if (typeof renderProfilo === 'function') renderProfilo();
        }
    } catch (e) {
        console.error(e);
        alert('Errore durante lo spostamento: ' + e.message);
    }
};

// ── COLLABORATORI DOCENTI ───────────────────────────────────
window.apriCollaboratori = async function(teamId, teamName) {
    const modal = document.getElementById('modal-collaboratori');
    if (!modal) return;
    document.getElementById('collaboratori-team-id').value = teamId;
    document.getElementById('collaboratori-team-nome').textContent = `Squadra: ${teamName}`;
    document.getElementById('collaboratori-new-email').value = '';
    modal.style.display = 'flex';

    // Renderizza uno stato di caricamento provvisorio
    const lista = document.getElementById('collaboratori-lista');
    if (lista) {
        lista.innerHTML = '<i style="font-size:0.85rem; color:var(--text-muted);">Caricamento collaboratori...</i>';
    }

    try {
        const teamDoc = await window.db.collection('teams').doc(teamId).get();
        const colList = teamDoc.data()?.collaboratori || [];
        window._renderCollaboratoriLista(teamId, colList);
    } catch (e) {
        console.error(e);
        if (lista) {
            lista.innerHTML = '<i style="font-size:0.85rem; color:var(--danger-color);">Errore caricamento.</i>';
        }
    }
};

window._renderCollaboratoriLista = function(teamId, collaboratori) {
    const lista = document.getElementById('collaboratori-lista');
    if (!lista) return;
    if (!collaboratori || collaboratori.length === 0) {
        lista.innerHTML = '<i style="font-size:0.85rem; color:var(--text-muted);">Nessun collaboratore aggiunto.</i>';
        return;
    }
    lista.innerHTML = collaboratori.map(email => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:0.85rem;">${email}</span>
            <button class="btn btn-secondary text-danger" style="padding:3px 8px; font-size:0.72rem; width:auto;"
                onclick="rimuoviCollaboratore('${teamId}', '${email}')">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>`).join('');
};

window.aggiungiCollaboratore = async function() {
    const teamId = document.getElementById('collaboratori-team-id').value;
    const email = document.getElementById('collaboratori-new-email').value.trim().toLowerCase();
    if (!email) { alert('Inserisci un\'email valida.'); return; }

    try {
        // Verifica che l'email sia un docente approvato
        const userDoc = await window.db.collection('users').doc(email).get();
        if (!userDoc.exists || (userDoc.data().role !== 'teacher' && userDoc.data().role !== 'docente')) {
            alert('Email non trovata o non corrisponde a un docente approvato.');
            return;
        }
        await fanta_db.addCollaboratore(teamId, email);
        document.getElementById('collaboratori-new-email').value = '';
        alert('Collaboratore aggiunto!');
        // Aggiorna la lista
        const teamDoc = await window.db.collection('teams').doc(teamId).get();
        window._renderCollaboratoriLista(teamId, teamDoc.data()?.collaboratori || []);
        if (window.location.pathname.includes('admin.html')) {
            if (typeof window.renderAdminSquadre === 'function') window.renderAdminSquadre();
        } else {
            if (typeof renderProfilo === 'function') renderProfilo();
        }
    } catch (e) {
        console.error(e);
        alert('Errore: ' + e.message);
    }
};

window.rimuoviCollaboratore = async function(teamId, email) {
    if (!confirm(`Rimuovere ${email} dai collaboratori?`)) return;
    try {
        await fanta_db.removeCollaboratore(teamId, email);
        const teamDoc = await window.db.collection('teams').doc(teamId).get();
        window._renderCollaboratoriLista(teamId, teamDoc.data()?.collaboratori || []);
        if (window.location.pathname.includes('admin.html')) {
            if (typeof window.renderAdminSquadre === 'function') window.renderAdminSquadre();
        } else {
            if (typeof renderProfilo === 'function') renderProfilo();
        }
    } catch (e) {
        console.error(e);
        alert('Errore: ' + e.message);
    }
};

/* =========================================
   ADMIN PANEL
========================================= */
async function setupAdminPanel() {
    const autoriList = document.getElementById('admin-autori-list');
    const adminTabs = document.querySelectorAll('.admin-tab-btn');
    const adminViews = document.querySelectorAll('.admin-view');
    const pageTitle = document.getElementById('page-title');

    if (!autoriList && adminTabs.length === 0) return;

    // --- RENDERING FUNCTIONS (GLOBAL) ---

    window.renderAdminAutori = function(modeFilter = null) {
        if (!autoriList) return;
        
        const mode = modeFilter || window.currentAdminMode || 'terze';
        window.currentAdminMode = mode;
        
        // Aggiorna stile bottoni filtro
        document.querySelectorAll('.admin-mode-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`.admin-mode-filter-btn[onclick*="'${mode}'"]`);
        if(activeBtn) activeBtn.classList.add('active');

        autoriList.innerHTML = '';

        let pool = [];
        let modeCfgForLabel = GAME_MODES.terze;

        if (mode === 'all') {
            // Unione di tutti i pool univoci per visualizzazione globale
            const seen = new Set();
            Object.keys(GAME_MODES).forEach(m => {
                const mCfg = GAME_MODES[m];
                (mCfg.authors || []).forEach(a => {
                    if (!seen.has(a.id)) {
                        pool.push({ ...a, activeMode: m });
                        seen.add(a.id);
                    }
                });
            });
        } else {
            modeCfgForLabel = GAME_MODES[mode] || GAME_MODES.terze;
            pool = (modeCfgForLabel.authors || AUTHORS).map(a => ({ ...a, activeMode: mode }));
        }

        if (pool.length === 0) {
            autoriList.innerHTML = '<p class="text-muted" style="grid-column:1/-1; text-align:center;"><i>Nessun autore trovato.</i></p>';
            return;
        }

        pool.forEach(author => {
            const currentMode = author.activeMode;
            const modeCfg = GAME_MODES[currentMode] || GAME_MODES.terze;
            const isRevealed = author.isPointsRevealed;
            const isSchedaRevealed = author.isSchedaRevealed;
            const price = author.cost || author.points || 0;
            let viewSchedaHtml = '';
            let titleStyle = '';
            let onclickAttr = '';
            
            if (author.schedaHTML) {
                onclickAttr = `onclick="openAuthorSchedaModal('${author.id}', '${currentMode}')"`;
                titleStyle = 'cursor:pointer; color:var(--primary-color); border-bottom:1px solid currentColor;';
                viewSchedaHtml = `
                    <div style="margin-top:10px; width:100%;">
                        <button class="btn" style="padding: 4px 10px; font-size: 0.8rem; width: auto;" ${onclickAttr}><i class="fa-solid fa-eye"></i> Apri Scheda</button>
                    </div>
                `;
            } else {
                viewSchedaHtml = `
                    <div style="margin-top:10px;">
                        <a href="schede/${author.id}.pdf" target="_blank" class="text-primary" style="font-size:0.75rem; text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> Visualizza PDF</a>
                    </div>
                `;
            }

            const isInternationalClass = author.isInternational ? 'card-international' : '';
            const modeBadge = mode === 'all' ? `<div class="mode-badge ${modeCfg.colorClass}" style="font-size:0.6rem; margin-bottom:5px;">${modeCfg.emoji} ${modeCfg.shortLabel}</div>` : '';

            autoriList.innerHTML += `
                <div class="glass ${isInternationalClass}" style="padding:12px; text-align:center; border: 1px solid ${isRevealed ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}; display:flex; flex-direction:column; align-items:center;">  
                    ${modeBadge}
                    <img src="${author.image}" style="width:45px; height:45px; border-radius:50%; object-fit:cover; background:#fff; margin-bottom:10px; ${author.schedaHTML ? 'cursor:pointer;' : ''}" ${onclickAttr}>
                    <div style="font-weight:bold; font-size:0.85rem; margin-bottom:5px; ${titleStyle}" ${onclickAttr}>${author.name}</div>
                    <div style="font-size:1.1rem; font-weight:bold; color:var(--primary-color);">${price} ${modeCfg.currencyLabel || 'pt'}</div>
                    <div style="margin-top:12px; display:flex; flex-direction:column; gap:5px; align-items:center; width:100%;">
                        <label style="font-size:0.7rem; cursor:pointer; display:flex; align-items:center; gap:5px;">
                            <input type="checkbox" ${isRevealed ? 'checked' : ''} onchange="toggleAuthorPoints('${author.id}', 'punti', '${currentMode}')"> Valida Punti
                        </label>
                        <label style="font-size:0.7rem; cursor:pointer; display:flex; align-items:center; gap:5px;">
                            <input type="checkbox" ${isSchedaRevealed ? 'checked' : ''} onchange="toggleAuthorPoints('${author.id}', 'scheda', '${currentMode}')"> Scheda
                        </label>
                    </div>
                    ${viewSchedaHtml}
                </div>
            `;
        });
    };

    window.toggleAuthorPoints = function(id, type, mode = 'terze') {
        const pool = GAME_MODES[mode] ? GAME_MODES[mode].authors : AUTHORS;
        const author = pool.find(a => a.id === id);
        if (author) {
            if (type === 'punti') author.isPointsRevealed = !author.isPointsRevealed;
            if (type === 'scheda') author.isSchedaRevealed = !author.isSchedaRevealed;
            
            // Salva nel documento specifico per la modalità
            saveGameState(mode);
            
            // Refresh UI
            window.renderAdminAutori(mode);
            if (typeof window.renderAdminClassifica === 'function') window.renderAdminClassifica(mode);
            if (typeof populateSchede === 'function') populateSchede(mode);
        }
    };

    window.renderAdminRichieste = async function() {
        const list = document.getElementById('admin-requests-list');
        if (!list) return;
        list.innerHTML = '<p class="text-center">Caricamento richieste...</p>';
        
        let requests = await fanta_db.getTeacherRequests();
        list.innerHTML = '';
        if (requests.length === 0) {
            list.innerHTML = '<i>Nessuna richiesta in sospeso.</i>';
        } else {
            requests.forEach(req => {
                let consentLog = req.createdAt ? `<div style="font-size:0.7rem; color:var(--accent-gold); margin-top:5px;"><i class="fa-solid fa-clock"></i> Ricevuta: ${req.createdAt.toDate ? req.createdAt.toDate().toLocaleString() : req.createdAt}</div>` : '';
                list.innerHTML += `
                    <div class="glass" style="padding:15px; margin-bottom:10px; border-left:4px solid var(--accent-gold);">
                        <div style="font-weight:bold; color:var(--primary-color); font-size:1.1rem;">${req.name}</div>
                        <div style="font-size:0.85rem; margin-top:5px; color:var(--text-muted);">${req.email} | ${req.school} (${req.city})</div>
                        ${consentLog}
                        <div style="display:flex; gap:10px; margin-top:15px;">
                            <button class="btn" style="flex:1; padding:8px; font-size:0.8rem;" onclick="approvaRichiesta('${req.email}')">Approva</button>
                            <button class="btn btn-secondary" style="flex:1; padding:8px; font-size:0.8rem; color: #ff5f5f; border-color: #ff5f5f;" onclick="rifiutaRichiesta('${req.id}')">Rifiuta</button>
                        </div>
                    </div>
                `;
            });
        }
    };

    window.approvaRichiesta = async function(email) {
        let requests = await fanta_db.getTeacherRequests();
        let req = requests.find(r => r.email === email);
        if(!req) return;

        // Aggiungiamo alla collezione 'users' su Firestore
        await window.db.collection("users").doc(email).set({
            email: email,
            name: req.name,
            school: req.school,
            city: req.city,
            role: 'teacher',
            approvedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Rimuoviamo dalla collezione 'pending_requests'
        await window.db.collection("pending_requests").doc(req.id).delete();
        
        alert("Docente approvato con successo! Invio della mail in corso...");
        const appUrl = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
        const nomeDocente = req.name || 'Prof';
        const emailSubject = encodeURIComponent('✅ Benvenuto in Fantaletteratura!');
        const emailBody = encodeURIComponent(
            `Ciao ${nomeDocente}!\n\n` +
            `La tua richiesta di iscrizione a Fantaletteratura è stata APPROVATA. 🎉\n` +
            `Da adesso puoi accedere alla piattaforma con la tua email: ${email}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `📚 CHE COS'È FANTALETTERATURA?\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Fantaletteratura è un gioco didattico ispirato al Fantasanremo che trasforma lo studio della letteratura in una sfida a squadre creativa, cooperativa e coinvolgente.\n\n` +
            `Ogni classe forma una o più SQUADRE. Ogni squadra sceglie 5 AUTORI letterari rispettando un budget iniziale di 20.000 lire (unità di misura del gioco). ` +
            `Gli autori accumulano punti in base alle loro schede segrete — bonus e malus legati alla loro vita e alle loro opere.\n\n` +
            `Le squadre possono guadagnare punti extra completando MISSIONI DIDATTICHE: attività di classe, letture, performance, approfondimenti e scoperte letterarie ` +
            `(ogni missione vale 5 punti).\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🏆 LE CLASSIFICHE\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Esistono tre classifiche:\n` +
            `• Classifica Autori — basata sui punti accumulati dagli autori scelti\n` +
            `• Classifica Missioni — basata sui bonus dinamici delle attività svolte\n` +
            `• Classifica Globale — la somma di entrambe\n\n` +
            `I punteggi vengono aggiornati periodicamente dal Game Master (il prof referente).\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🎯 COSA PUOI FARE COME DOCENTE\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `• Creare e gestire le squadre della tua classe\n` +
            `• Caricare le missioni completate dagli studenti\n` +
            `• Consultare le classifiche in tempo reale\n` +
            `• Invitare colleghi a partecipare con le loro classi\n` +
            `• Creare tornei privati tra classi o scuole diverse\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🔗 ACCEDI ORA\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Entra nella piattaforma qui:\n` +
            `👉 ${appUrl}\n\n` +
            `Usa la tua email (${email}) per accedere come Docente dalla Home.\n\n` +
            `Per qualsiasi dubbio o supporto, scrivi a prof.memmo@gmail.com\n\n` +
            `Buon Fantaletteratura! 📖🔥\n\n` +
            `— Il Team di Fantaletteratura`
        );
        window.location.href = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
        
        await window.renderAdminRichieste();
        await window.renderAdminDocenti();
    };

    window.rifiutaRichiesta = async function(id) {
        if(!confirm("Cancellare richiesta?")) return;
        try {
            await window.db.collection("pending_requests").doc(id).delete();
            await window.renderAdminRichieste();
        } catch(e) {
            console.error(e);
            alert("Errore durante la cancellazione.");
        }
    };

    let currentAdminDocentiFilter = 'tutti';
    window.setAdminDocentiFilter = function(f) {
        currentAdminDocentiFilter = f;
        const searchInput = document.getElementById('admin-docenti-search');
        if(searchInput) searchInput.value = '';
        window.renderAdminDocenti();
    };

    window.renderAdminDocenti = async function(filterText = '') {
        const list = document.getElementById('admin-docenti-list');
        const statsContainer = document.getElementById('admin-docenti-stats');
        if (!list) return;
        
        // Fetch all users to get counts
        const snapshotAll = await window.db.collection("users").get();
        const allUsers = snapshotAll.docs.map(doc => doc.data());
        
        const counts = {
            tutti: allUsers.length,
            teacher: allUsers.filter(u => u.role === 'teacher').length,
            guest: allUsers.filter(u => u.role === 'guest').length
        };
        
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'tutti' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('tutti')">
                    <div class="stat-value">${counts.tutti}</div>
                    <div class="stat-label">TUTTI</div>
                </div>
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'teacher' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('teacher')">
                    <div class="stat-value">${counts.teacher}</div>
                    <div class="stat-label">DOCENTI</div>
                </div>
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'guest' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('guest')">
                    <div class="stat-value">${counts.guest}</div>
                    <div class="stat-label">FANTAMICI</div>
                </div>
            `;
        }

        list.innerHTML = '<p class="text-center">Caricamento iscritti...</p>';
        
        let users = allUsers;
        if (currentAdminDocentiFilter !== 'tutti') {
            users = allUsers.filter(u => u.role === currentAdminDocentiFilter);
        }
        
        list.innerHTML = '';
        let filteredUsers = users.filter(u => {
            const q = filterText.toLowerCase();
            return (u.email || '').toLowerCase().includes(q) || (u.name || '').toLowerCase().includes(q);
        });

        if (filteredUsers.length === 0) list.innerHTML = '<i>Nessun iscritto trovato.</i>';
        filteredUsers.forEach(u => {
            let roleLabel = u.role === 'teacher' ? '<span style="color:#3498db; font-size:0.7rem; font-weight:800; text-transform:uppercase;">[Docente]</span>' : '<span style="color:#e67e22; font-size:0.7rem; font-weight:800; text-transform:uppercase;">[Fantamico]</span>';
            let log = u.approvedAt ? `<br><small class="text-muted">Approvato: ${u.approvedAt.toDate ? u.approvedAt.toDate().toLocaleString() : u.approvedAt}</small>` : '';
            list.innerHTML += `<div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div>${roleLabel} <span>${u.email}</span> &mdash; <strong>${u.name}</strong>${log}</div>
                <button class="btn btn-secondary text-danger" style="padding:4px 8px; font-size:0.75rem; width:auto; background:var(--bg-card); border-color:var(--danger-color);" onclick="eliminaDocente('${u.email}')"><i class="fa-solid fa-trash"></i></button>
            </div>`;
        });
    };

    window.eliminaDocente = async function(email) {
        if(!confirm('Eliminare account?')) return;
        try {
            await fanta_db.deleteUser(email);
            window.renderAdminDocenti();
        } catch (e) {
            console.error(e);
            alert("Errore durante l'eliminazione del docente.");
        }
    };

    window.renderAdminRichieste = async function() {
        const list = document.getElementById('admin-requests-list');
        if (!list) return;
        list.innerHTML = '<p class="text-center">Caricamento richieste...</p>';
        
        let requests = await fanta_db.getTeacherRequests();
        list.innerHTML = '';
        if (requests.length === 0) {
            list.innerHTML = '<i>Nessuna richiesta in sospeso.</i>';
        } else {
            requests.forEach(req => {
                let consentLog = req.createdAt ? `<div style="font-size:0.7rem; color:var(--accent-gold); margin-top:5px;"><i class="fa-solid fa-clock"></i> Ricevuta: ${req.createdAt.toDate ? req.createdAt.toDate().toLocaleString() : req.createdAt}</div>` : '';
                list.innerHTML += `
                    <div class="glass" style="padding:15px; margin-bottom:10px; border-left:4px solid var(--accent-gold);">
                        <div style="font-weight:bold; color:var(--primary-color); font-size:1.1rem;">${req.name}</div>
                        <div style="font-size:0.85rem; margin-top:5px; color:var(--text-muted);">${req.email} | ${req.school} (${req.city})</div>
                        ${consentLog}
                        <div style="display:flex; gap:10px; margin-top:15px;">
                            <button class="btn" style="flex:1; padding:8px; font-size:0.8rem;" onclick="approvaRichiesta('${req.email}')">Approva</button>
                            <button class="btn btn-secondary" style="flex:1; padding:8px; font-size:0.8rem; color: #ff5f5f; border-color: #ff5f5f;" onclick="rifiutaRichiesta('${req.id}')">Rifiuta</button>
                        </div>
                    </div>
                `;
            });
        }
    };

    window.currentAdminTeamsCategoryFilter = 'all';
    window.currentAdminTeamsModeFilter = 'all';
    
    window.setAdminTeamsCategoryFilter = function(filter) {
        window.currentAdminTeamsCategoryFilter = filter;
        window.renderAdminSquadre();
    };

    window.renderAdminSquadre = async function(modeFilter) {
        const list = document.getElementById('admin-squadre-list');
        const statsContainer = document.getElementById('admin-squadre-stats');
        if (!list) return;

        if (modeFilter !== undefined) {
            window.currentAdminTeamsModeFilter = modeFilter;
        }
        const activeMode = window.currentAdminTeamsModeFilter || 'all';

        // Aggiorna stile bottoni filtro modalità
        const squadreSection = document.getElementById('admin-view-squadre');
        if (squadreSection) {
            squadreSection.querySelectorAll('.admin-mode-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = squadreSection.querySelector(`.admin-mode-filter-btn[onclick*="'${activeMode}'"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }

        list.innerHTML = '<p class="text-center">Caricamento squadre...</p>';
        
        let allTeams = await getAllTeams();
        
        // Carica tutti gli utenti per associare ruoli e scuole
        const snapshotAllUsers = await window.db.collection("users").get();
        const allUsers = snapshotAllUsers.docs.map(doc => doc.data());
        const userMap = {};
        allUsers.forEach(u => {
            if (u.email) {
                userMap[u.email.toLowerCase()] = u;
            }
        });

        // 1. Calcolo Statistiche (basato su tutte le squadre, non filtrate)
        const counts = {
            tutti: allTeams.length,
            partecipanti: new Set(
                allTeams
                    .filter(t => {
                        const u = userMap[(t.ownerEmail || '').toLowerCase()];
                        return u && u.role === 'teacher';
                    })
                    .map(t => (t.ownerEmail || '').toLowerCase())
            ).size,
            scuole: new Set(
                allTeams
                    .filter(t => {
                        const u = userMap[(t.ownerEmail || '').toLowerCase()];
                        return u && u.role === 'teacher';
                    })
                    .map(t => {
                        const u = userMap[t.ownerEmail.toLowerCase()];
                        return u ? (u.school || '').trim() : '';
                    })
                    .filter(s => s !== '')
            ).size,
            fantamici: allTeams.filter(t => {
                const u = userMap[(t.ownerEmail || '').toLowerCase()];
                return !u || u.role === 'guest';
            }).length
        };

        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="admin-stat-card ${window.currentAdminTeamsCategoryFilter === 'all' ? 'active' : ''}" onclick="window.setAdminTeamsCategoryFilter('all')">
                    <div class="stat-value" style="color: var(--primary-color);">${counts.tutti}</div>
                    <div class="stat-label">SQUADRE</div>
                </div>
                <div class="admin-stat-card ${window.currentAdminTeamsCategoryFilter === 'partecipanti' ? 'active' : ''}" onclick="window.setAdminTeamsCategoryFilter('partecipanti')">
                    <div class="stat-value" style="color: #3498db;">${counts.partecipanti}</div>
                    <div class="stat-label">PARTECIPANTI (DOCENTI)</div>
                </div>
                <div class="admin-stat-card ${window.currentAdminTeamsCategoryFilter === 'scuole' ? 'active' : ''}" onclick="window.setAdminTeamsCategoryFilter('scuole')">
                    <div class="stat-value" style="color: var(--accent-gold);">${counts.scuole}</div>
                    <div class="stat-label">SCUOLE COINVOLTE</div>
                </div>
                <div class="admin-stat-card ${window.currentAdminTeamsCategoryFilter === 'fantamici' ? 'active' : ''}" onclick="window.setAdminTeamsCategoryFilter('fantamici')">
                    <div class="stat-value" style="color: #e67e22;">${counts.fantamici}</div>
                    <div class="stat-label">FANTAMICI</div>
                </div>
            `;
        }

        // Applicazione filtri
        let teams = allTeams;
        
        // A. Filtro modalità
        if (activeMode !== 'all') {
            teams = teams.filter(t => (t.mode || 'terze') === activeMode);
        }

        // B. Filtro categoria
        if (window.currentAdminTeamsCategoryFilter === 'partecipanti') {
            teams = teams.filter(t => {
                const u = userMap[(t.ownerEmail || '').toLowerCase()];
                return u && u.role === 'teacher';
            });
        } else if (window.currentAdminTeamsCategoryFilter === 'fantamici') {
            teams = teams.filter(t => {
                const u = userMap[(t.ownerEmail || '').toLowerCase()];
                return !u || u.role === 'guest';
            });
        } else if (window.currentAdminTeamsCategoryFilter === 'scuole') {
            teams = teams.filter(t => {
                const u = userMap[(t.ownerEmail || '').toLowerCase()];
                return u && u.role === 'teacher' && (u.school || '').trim() !== '';
            });
        }

        // C. Filtro di ricerca testuale
        const query = (document.getElementById('admin-squadre-search')?.value || '').toLowerCase().trim();
        if (query) {
            teams = teams.filter(t => {
                const nameMatch = (t.name || '').toLowerCase().includes(query);
                const emailMatch = (t.ownerEmail || '').toLowerCase().includes(query);
                const collMatch = (t.collaboratori || []).some(email => email.toLowerCase().includes(query));
                return nameMatch || emailMatch || collMatch;
            });
        }

        // Carica tutti gli studenti una volta sola per efficienza
        const allUsersSnap = await window.db.collection("users").where("role", "==", "studente").get();
        const allStudents = allUsersSnap.docs.map(d => d.data());

        list.innerHTML = '';
        if (teams.length === 0) {
            list.innerHTML = '<i>Nessuna squadra trovata con i filtri correnti.</i>';
            return;
        }

        teams.forEach(t => {
            const modeInfo = t.mode ? GAME_MODES[t.mode] : null;
            const badge = modeInfo ? `<span class="mode-badge ${modeInfo.colorClass}">${modeInfo.emoji} ${modeInfo.shortLabel}</span>` : '';
            const pool = (modeInfo && modeInfo.authors && modeInfo.authors.length > 0) ? modeInfo.authors : AUTHORS;
            const collaboratori = (t.collaboratori || []);
            const collBadge = collaboratori.length > 0
                ? `<span style="font-size:0.7rem; color:var(--accent-gold);"><i class="fa-solid fa-users-gear"></i> ${collaboratori.length} collaboratore/i</span>`
                : '';

            const ownerUser = userMap[(t.ownerEmail || '').toLowerCase()];
            const schoolName = ownerUser ? (ownerUser.school || '') : '';
            const schoolLabel = schoolName ? ` &bull; <i class="fa-solid fa-school"></i> ${schoolName}` : '';

            // Autori in questa squadra
            let autoriRows = '';
            if (t.authors && t.authors.length > 0) {
                autoriRows = t.authors.map(aid => {
                    let author = pool.find(x => x.id === aid);
                    if (!author) {
                        Object.values(GAME_MODES).forEach(modeCfg => {
                            if (!author && modeCfg.authors) {
                                author = modeCfg.authors.find(x => x.id === aid);
                            }
                        });
                    }
                    if (!author) {
                        author = AUTHORS.find(x => x.id === aid);
                    }
                    if (!author) return '';
                    
                    const ptsLabel = author.isPointsRevealed 
                        ? `<span style="font-weight:bold; color:var(--primary-color);">${author.points} pt</span>`
                        : `<span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-eye-slash" title="Punti non ancora rivelati"></i> ? pt</span>`;
                    
                    return `
                        <div style="display:flex; align-items:center; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.03); font-size:0.8rem;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <img src="${author.image}" alt="${author.name}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; border:1px solid var(--primary-color); background:#fff;">
                                <span style="font-weight:500; color:var(--text-main);">${author.name}</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span style="font-size:0.7rem; color:var(--text-muted);">${author.cost || author.points || 0} €</span>
                                ${ptsLabel}
                            </div>
                        </div>
                    `;
                }).join('');
            }

            // Studenti iscritti a questa squadra
            const studentiDiQuesta = allStudents.filter(s => s.teamId === t.id);
            let studentiHtml = '';
            if (studentiDiQuesta.length === 0) {
                studentiHtml = '<i style="font-size:0.8rem; color:var(--text-muted);">Nessuno studente iscritto</i>';
            } else {
                studentiHtml = studentiDiQuesta.map(s => `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.04);">
                        <span style="font-size:0.82rem;">${s.email}</span>
                        <button class="btn btn-secondary" style="padding:3px 8px; font-size:0.72rem; width:auto; border-radius:12px;"
                            onclick="apriSpostaStudente('${s.email}', '${t.id}', '${t.name}')">
                            <i class="fa-solid fa-right-left"></i> Sposta
                        </button>
                    </div>`).join('');
            }

            list.innerHTML += `
                <div class="glass" style="padding: 8px 12px; margin-bottom: 6px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px;">
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <strong style="font-size: 0.9rem; color: var(--text-main);">${t.name}</strong>
                                ${badge}
                                ${collBadge ? `<span style="font-size: 0.75rem; color: var(--accent-gold);" title="Ha collaboratori"><i class="fa-solid fa-users-gear"></i></span>` : ''}
                            </div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                                <i class="fa-solid fa-graduation-cap"></i> ${t.classe || 'N/D'}${schoolLabel} &bull; 
                                <i class="fa-solid fa-user-tie"></i> ${t.ownerEmail || 'N/D'}
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 15px; flex-shrink: 0;">
                            <div style="font-size: 0.8rem; text-align: center; min-width: 45px;">
                                <div style="font-weight: bold; color: var(--primary-color);">${t.authors ? t.authors.length : 0}/5</div>
                                <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Autori</div>
                            </div>
                            <div style="font-size: 0.8rem; text-align: center; min-width: 45px;">
                                <div style="font-weight: bold; color: var(--accent-gold);">${studentiDiQuesta.length}</div>
                                <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Studenti</div>
                            </div>
                            <div style="display: flex; gap: 4px;">
                                <button class="btn btn-secondary" title="Dettagli Autori/Studenti" style="padding: 4px 8px; font-size: 0.75rem; width: auto;" onclick="const panel = this.closest('.glass').querySelector('.details-panel'); panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; this.querySelector('i').classList.toggle('fa-chevron-down'); this.querySelector('i').classList.toggle('fa-chevron-up');">
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>
                                <button class="btn btn-secondary" title="Gestisci Collaboratori" style="padding: 4px 8px; font-size: 0.75rem; width: auto; background: rgba(141,160,63,0.15); border-color: var(--primary-color);"
                                    onclick="window.apriCollaboratori('${t.id}', '${t.name.replace(/'/g, "\\'")}')">
                                    <i class="fa-solid fa-user-plus"></i>
                                </button>
                                <button class="btn btn-secondary text-danger" style="padding: 4px 8px; font-size: 0.75rem; width: auto; background: transparent; border-color: transparent;" onclick="eliminaSquadra('${t.id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="details-panel" style="display: none; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05);">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 15px;">
                            <div>
                                <h4 style="font-size: 0.8rem; color: var(--primary-color); margin-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 3px;">
                                    <i class="fa-solid fa-feather-pointed"></i> Autori Schierati (${t.authors ? t.authors.length : 0}/5)
                                </h4>
                                ${autoriRows || '<i>Nessun autore schierato</i>'}
                            </div>
                            <div>
                                <h4 style="font-size: 0.8rem; color: var(--accent-gold); margin-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 3px;">
                                    <i class="fa-solid fa-users"></i> Studenti Iscritti (${studentiDiQuesta.length})
                                </h4>
                                ${studentiHtml}
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    };

    window.eliminaSquadra = async function(tid) {
        if(!confirm('Eliminare squadra?')) return;
        try {
            await fanta_db.deleteTeam(tid);
            window.renderAdminSquadre();
        } catch (e) {
            console.error(e);
            alert("Errore durante l'eliminazione della squadra.");
        }
    };


    window.renderAdminMissioniPending = async function() {
        const list = document.getElementById('admin-missioni-pending-list');
        const statsContainer = document.getElementById('admin-missioni-stats');
        if(!list) return;
        list.innerHTML = '<p class="text-center">Caricamento missioni...</p>';
        
        try {
            const pending = await fanta_db.getPendingMissions();
            const allTeams = await fanta_db.getTeams();
            
            // Per il conteggio delle statistiche
            const approvedSnap = await window.db.collection("missions").where("status", "==", "approved").get();
            const approvedCount = approvedSnap.size;
            
            const rejectedSnap = await window.db.collection("missions").where("status", "==", "rejected").get();
            const rejectedCount = rejectedSnap.size;
            
            const pendingCount = pending.length;
            const totalCount = pendingCount + approvedCount + rejectedCount;
            
            if (statsContainer) {
                statsContainer.innerHTML = `
                    <div class="admin-stat-card">
                        <div class="stat-value" style="color: var(--primary-color);">${totalCount}</div>
                        <div class="stat-label">TOTALE MISSIONI</div>
                    </div>
                    <div class="admin-stat-card">
                        <div class="stat-value" style="color: var(--accent-gold);">${pendingCount}</div>
                        <div class="stat-label">DA CONVALIDARE</div>
                    </div>
                    <div class="admin-stat-card">
                        <div class="stat-value" style="color: #2ecc71;">${approvedCount}</div>
                        <div class="stat-label">CONVALIDATE</div>
                    </div>
                    <div class="admin-stat-card">
                        <div class="stat-value" style="color: #e74c3c;">${rejectedCount}</div>
                        <div class="stat-label">RESPINTE</div>
                    </div>
                `;
            }
            
            list.innerHTML = '';
            if(pending.length === 0) {
                list.innerHTML = '<i>Nessuna missione in attesa.</i>';
                if(document.getElementById('btn-approva-tutte')) document.getElementById('btn-approva-tutte').disabled = true;
            } else {
                if(document.getElementById('btn-approva-tutte')) document.getElementById('btn-approva-tutte').disabled = false;
                pending.forEach(m => {
                    let t = allTeams.find(x => x.id === m.teamId);
                    list.innerHTML += `<div class="glass" style="padding:10px; margin-bottom:10px; border-left:3px solid var(--accent-gold);">
                        <div style="font-weight:bold;">${m.titolo}</div><small>${t?t.name:'Squadra Sconosciuta'}</small>
                        <div style="display:flex; gap:10px; margin-top:8px;">
                            <button class="btn" style="padding:4px; font-size:0.75rem; width:auto;" onclick="approvaMissione('${m.id}', '${m.teamId}')">Ok</button>
                            <button class="btn btn-secondary" style="padding:4px; font-size:0.75rem; width:auto;" onclick="rifiutaMissione('${m.id}')">No</button>
                        </div>
                    </div>`;
                });
            }
        } catch (e) {
            console.error("Errore pending missioni:", e);
            list.innerHTML = `<i>Errore nel caricamento delle missioni in attesa: ${e.message}</i>`;
            if (statsContainer) {
                statsContainer.innerHTML = `<div style="color:var(--danger-color); padding:10px; font-size:0.85rem;">Errore caricamento statistiche: ${e.message}</div>`;
            }
        }
    };

    window.renderAdminMissioni = async function() {
        const list = document.getElementById('admin-missioni-list');
        if(!list) return;
        list.innerHTML = '<p class="text-center">Caricamento storico...</p>';
        
        try {
            const allTeams = await getAllTeams();
            const snap = await window.db.collection("missions").where("status", "==", "approved").get();
            const approvedMissions = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            list.innerHTML = '';
            if (approvedMissions.length === 0) {
                list.innerHTML = '<i>Nessuna missione convalidata.</i>';
            } else {
                approvedMissions.forEach(m => {
                    const team = allTeams.find(t => t.id === m.teamId);
                    const teamName = team ? team.name : 'Squadra Sconosciuta (Eliminata)';
                    list.innerHTML += `
                        <div class="glass" style="padding: 10px; border-left: 3px solid var(--primary-color); display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <div>
                                <span style="font-weight: bold; color: var(--text-main);">${m.titolo}</span><br>
                                <small style="color: var(--text-muted);"><i class="fa-solid fa-users"></i> ${teamName}</small>
                            </div>
                            <span style="font-weight: bold; color: var(--primary-color);">+5 pt</span>
                        </div>
                    `;
                });
            }
        } catch(e) {
            console.error("Errore storico missioni:", e);
            list.innerHTML = `<i>Errore nel caricamento dello storico: ${e.message}</i>`;
        }
    };

    window.renderAdminClassifica = async function(modeFilter) {
        const list = document.getElementById('admin-classifica-list');
        if (!list) return;
        list.innerHTML = '';

        let teams = await getAllTeams();
        if (modeFilter && modeFilter !== 'all') {
            teams = teams.filter(t => (t.mode || 'terze') === modeFilter);
        }

        let calc = teams.map(team => {
            // Use the right author pool for this team's mode
            const tm = team.mode ? GAME_MODES[team.mode] : null;
            const pool = (tm && tm.authors && tm.authors.length > 0) ? tm.authors : AUTHORS;
            let authPts = 0;
            team.authors.forEach(aid => {
                const a = pool.find(x => x.id === aid);
                if(a && a.isPointsRevealed) authPts += a.points;
            });
            const modeInfo = team.mode ? GAME_MODES[team.mode] : null;
            const badge = modeInfo ? `<span class="mode-badge ${modeInfo.colorClass}">${modeInfo.emoji}</span>` : '';
            return { name: team.name, badge, total: authPts + (team.missionsCompleted * 5) };
        }).sort((a,b) => b.total - a.total);

        if (calc.length === 0) {
            list.innerHTML = '<i>Nessuna squadra in questa modalità.</i>';
            return;
        }

        calc.forEach((t, i) => {
            list.innerHTML += `<div style="display:flex; justify-content:space-between; padding:8px 10px; font-size:0.9rem;">
                <span>${i + 1}. ${t.badge} ${t.name}</span><span style="font-weight:bold; color:var(--primary-color);">${t.total} pt</span>
            </div>`;
        });
    };

    window.renderAdminTornei = async function() {
        const list = document.getElementById('admin-tornei-admin-list');
        const statsContainer = document.getElementById('admin-tornei-stats');
        if(!list) return;
        
        list.innerHTML = '<p class="text-center">Caricamento tornei...</p>';
        
        try {
            const tourneys = await fanta_db.getTournaments();
            const allTeams = await fanta_db.getTeams();
            
            const totalTourneys = tourneys.length;
            let totalTeamsInTourneys = 0;
            tourneys.forEach(t => {
                totalTeamsInTourneys += (t.teams || []).length;
            });
            
            if (statsContainer) {
                statsContainer.innerHTML = `
                    <div class="admin-stat-card">
                        <div class="stat-value" style="color: var(--primary-color);">${totalTourneys}</div>
                        <div class="stat-label">TOTALE TORNEI</div>
                    </div>
                    <div class="admin-stat-card">
                        <div class="stat-value" style="color: var(--accent-gold);">${totalTeamsInTourneys}</div>
                        <div class="stat-label">ISCRIZIONI SQUADRE</div>
                    </div>
                `;
            }
            
            list.innerHTML = '';
            if (tourneys.length === 0) {
                list.innerHTML = '<i>Nessun torneo globale attivo.</i>';
                return;
            }
            
            tourneys.forEach(tour => {
                let calculated = (tour.teams || []).map(tid => {
                    let tObj = allTeams.find(x => x.id === tid);
                    if(!tObj) return null;
                    let authPts = 0;
                    const teamMode = tObj.mode || 'terze';
                    const modeCfg = GAME_MODES[teamMode] || GAME_MODES.terze;
                    const pool = modeCfg.authors || AUTHORS;
                    
                    tObj.authors.forEach(aid => {
                        let a = pool.find(x => x.id === aid);
                        if(a && a.isPointsRevealed) authPts += a.points;
                    });
                    return {
                        team: tObj.name,
                        totale: authPts + ((tObj.missionsCompleted || 0) * 5)
                    };
                }).filter(x => x !== null);
                
                calculated.sort((a,b) => b.totale - a.totale);
                
                let rankHtml = calculated.map((item, idx) => `
                    <div style="display:flex; justify-content:space-between; font-size:0.9rem; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                        <span>${idx+1}. ${item.team}</span>
                        <span class="text-primary" style="font-weight:bold">${item.totale} pt</span>
                    </div>
                `).join('');
                
                list.innerHTML += `
                    <div class="glass" style="padding:15px; border-left:3px solid var(--primary-color); margin-bottom:15px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                            <div style="font-weight:bold; font-size:1.1rem; color:var(--primary-color);"> <i class="fa-solid fa-trophy"></i> ${tour.name}</div>
                            <button class="btn btn-secondary text-danger" style="padding:4px 8px; font-size:0.75rem; width:auto; background:transparent;" onclick="window.eliminaTorneo('${tour.id}')">
                                <i class="fa-solid fa-trash"></i> Elimina
                            </button>
                        </div>
                        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:10px;">
                            Creato da: <strong>${tour.ownerEmail || 'N/D'}</strong>
                        </div>
                        ${rankHtml || '<i>Nessuna squadra iscritta.</i>'}
                    </div>
                `;
            });
        } catch (e) {
            console.error("Errore caricamento tornei admin:", e);
            list.innerHTML = `<i>Errore nel caricamento dei tornei: ${e.message}</i>`;
            if (statsContainer) {
                statsContainer.innerHTML = `<div style="color:var(--danger-color); padding:10px; font-size:0.85rem;">Errore: ${e.message}</div>`;
            }
        }
    };

    window.eliminaTorneo = async function(tourId) {
        if(!confirm("Sei sicuro di voler eliminare questo torneo?")) return;
        try {
            await fanta_db.deleteTournament(tourId);
            alert("Torneo eliminato con successo!");
            window.renderAdminTornei();
        } catch (e) {
            console.error("Errore eliminazione torneo:", e);
            alert("Errore durante l'eliminazione: " + e.message);
        }
    };

    // --- NAVIGATION LOGIC ---

    adminTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-target');
            if (!targetId) return;

            // Reset active states
            adminTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll(`.admin-tab-btn[data-target="${targetId}"]`).forEach(t => t.classList.add('active'));

            adminViews.forEach(v => {
                v.classList.remove('active');
                v.style.display = 'none';
            });

            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
                targetView.style.display = 'block';
                if(pageTitle) pageTitle.innerText = targetView.querySelector('h2') ? targetView.querySelector('h2').innerText : 'Pannello Admin';
            }

            // Specific renders
            if (targetId === 'admin-view-autori') window.renderAdminAutori();
            if (targetId === 'admin-view-requests') window.renderAdminRichieste();
            if (targetId === 'admin-view-docenti') window.renderAdminDocenti();
            if (targetId === 'admin-view-squadre') window.renderAdminSquadre();
            if (targetId === 'admin-view-missioni') { window.renderAdminMissioni(); window.renderAdminMissioniPending(); }
            if (targetId === 'admin-view-classifica') window.renderAdminClassifica();
            if (targetId === 'admin-view-tornei') window.renderAdminTornei();
            if (targetId === 'admin-view-profilo') window.renderAdminProfilo();
            if (targetId === 'admin-view-presentazioni') window.initPresentazioniTab();
            if (targetId === 'admin-view-locandine') { window.apriLocandine(); return; }
            if (targetId === 'admin-view-attestati') { window.apriAttestati(); return; }

            // Mobile menu close
            const sideMenu = document.getElementById('side-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            if (sideMenu && window.innerWidth < 1024) { sideMenu.classList.remove('active'); if(menuOverlay) menuOverlay.classList.remove('active'); }
        });
    });

    // --- INITIAL STARTUP ---
    if (window.location.pathname.includes('admin.html')) {
        await window.renderAdminAutori();
        await window.renderAdminDocenti();
        await window.renderAdminSquadre();
        await window.renderAdminMissioni();
        await window.renderAdminMissioniPending();
        await window.renderAdminClassifica();
        await window.renderAdminRichieste();
        await window.renderAdminTornei();
        await window.renderAdminProfilo();
        await window.initPresentazioniTab();
    }
}

window.renderAdminProfilo = async function() {
    const sqList = document.getElementById('admin-profilo-squadre-list');
    const trList = document.getElementById('admin-profilo-tornei-list');
    const emailField = document.getElementById('admin-profilo-email');
    if(!sqList || !currentUserEmail) return;

    if(emailField) emailField.value = currentUserEmail;

    // Render Squadre
    let teams = (await getAllTeams()).filter(t => t.ownerEmail === currentUserEmail);
    sqList.innerHTML = '';
    if(teams.length === 0) {
        sqList.innerHTML = '<i>Nessuna squadra creata.</i>';
    } else {
        teams.forEach(t => {
            let authPts = 0;
            const teamMode = t.mode || 'terze';
            const modeCfg = GAME_MODES[teamMode] || GAME_MODES.terze;
            const pool = modeCfg.authors || AUTHORS;
            
            t.authors.forEach(aid => {
                let a = pool.find(x => x.id === aid);
                if (!a) {
                    Object.values(GAME_MODES).forEach(modeCfg => {
                        if (!a && modeCfg.authors) {
                            a = modeCfg.authors.find(x => x.id === aid);
                        }
                    });
                }
                if (!a) {
                    a = AUTHORS.find(x => x.id === aid);
                }
                if(a && a.isPointsRevealed) authPts += (a.points || 0);
            });
            let misPts = (t.missionsCompleted || 0) * 5;

            // Autori in questa squadra
            let autoriSection = '';
            if (t.authors && t.authors.length > 0) {
                const autoriRows = t.authors.map(aid => {
                    let author = pool.find(x => x.id === aid);
                    if (!author) {
                        Object.values(GAME_MODES).forEach(modeCfg => {
                            if (!author && modeCfg.authors) {
                                author = modeCfg.authors.find(x => x.id === aid);
                            }
                        });
                    }
                    if (!author) {
                        author = AUTHORS.find(x => x.id === aid);
                    }
                    if (!author) return '';
                    
                    const ptsLabel = author.isPointsRevealed 
                        ? `<span style="font-weight:bold; color:var(--primary-color);">${author.points} pt</span>`
                        : `<span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-eye-slash" title="Punti non ancora rivelati"></i> ? pt</span>`;
                    
                    return `
                        <div style="display:flex; align-items:center; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.03); font-size:0.8rem;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <img src="${author.image}" alt="${author.name}" style="width:24px; height:24px; border-radius:50%; object-fit:cover; border:1px solid var(--primary-color); background:#fff;">
                                <span style="font-weight:500; color:var(--text-main);">${author.name}</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span style="font-size:0.7rem; color:var(--text-muted);">${author.cost || author.points || 0} €</span>
                                ${ptsLabel}
                            </div>
                        </div>
                    `;
                }).join('');

                autoriSection = `
                    <details style="margin-top:8px; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px; width:100%;">
                        <summary style="font-size:0.78rem; cursor:pointer; color:var(--primary-color); font-weight:600; user-select:none; margin-bottom:4px;">
                            <i class="fa-solid fa-feather-pointed"></i> Autori Schierati (${t.authors.length}/5)
                        </summary>
                        <div style="padding-left:4px; max-height:200px; overflow-y:auto;">
                            ${autoriRows}
                        </div>
                    </details>
                `;
            } else {
                autoriSection = `
                    <div style="font-size:0.75rem; color:var(--text-muted); padding-top:8px; border-top:1px solid rgba(255,255,255,0.05); width:100%;">
                        <i>Nessun autore schierato</i>
                    </div>
                `;
            }

            sqList.innerHTML += `<div class="glass" style="padding:15px; margin-bottom:15px; border-left:4px solid var(--primary-color);">
                <div style="font-weight:bold; font-size:1.1rem; margin-bottom:10px;">${t.name}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:0.85rem;">
                    <div><span class="text-muted">Autori:</span> <span class="text-primary">${authPts} pt</span></div>
                    <div><span class="text-muted">Missioni:</span> <span class="text-primary">${misPts} pt</span></div>
                    <div style="grid-column: span 2; padding-top:5px; border-top:1px solid rgba(255,255,255,0.05); font-weight:bold;">
                        Totale: <span style="color:var(--primary-hover)">${authPts + misPts} pt</span>
                    </div>
                </div>
                ${autoriSection}
            </div>`;
        });
    }

    if(trList) trList.innerHTML = '<i>Funzionalità tornei in aggiornamento...</i>';
};

window.approvaMissione = async function(mid, tid) {
    try {
        const allTeams = await fanta_db.getTeams();
        const team = allTeams.find(t => t.id === tid);
        if(team) {
            const newCount = parseInt(team.missionsCompleted || 0, 10) + 1;
            const ref = await window.fanta_db.getTeamDocRef(tid);
            await ref.update({ missionsCompleted: newCount });
        }
        await fanta_db.approveMission(mid);
        if(typeof window.renderAdminMissioni === 'function') await window.renderAdminMissioni();
        if(typeof window.renderAdminMissioniPending === 'function') await window.renderAdminMissioniPending();
    } catch (e) {
        console.error("Errore approvazione missione:", e);
        alert("Errore durante l'approvazione: " + e.message);
    }
};

window.rifiutaMissione = async function(mid) {
    try {
        await window.db.collection("missions").doc(mid).update({ status: 'rejected' });
        if(typeof window.renderAdminMissioniPending === 'function') window.renderAdminMissioniPending();
    } catch (e) {
        console.error("Errore rifiuto missione:", e);
        alert("Errore durante il rifiuto: " + e.message);
    }
};

window.approvaTutteMissioni = async function() {
    if(!confirm('Approvare tutte le missioni in attesa?')) return;
    
    // Mostra un caricamento per feedback immediato
    const list = document.getElementById('admin-missioni-pending-list');
    if(list) list.innerHTML = '<p class="text-center">Approvazione di tutte le missioni in corso...</p>';
    
    try {
        const pending = await fanta_db.getPendingMissions();
        if(pending.length === 0) return;
        
        const allTeams = await fanta_db.getTeams();
        
        // Calcola i nuovi conteggi cumulati delle missioni per squadra
        const teamUpdates = {};
        pending.forEach(m => {
            const team = allTeams.find(t => t.id === m.teamId);
            if(team) {
                const currentCount = teamUpdates[m.teamId] !== undefined ? teamUpdates[m.teamId] : parseInt(team.missionsCompleted || 0, 10);
                teamUpdates[m.teamId] = currentCount + 1;
            }
        });
        
        // Esegui tutte le scritture in parallelo
        const promises = [];
        
        // 1. Aggiorna i conteggi dei team esistenti
        for (const tid of Object.keys(teamUpdates)) {
            const ref = await window.fanta_db.getTeamDocRef(tid);
            promises.push(ref.update({ missionsCompleted: teamUpdates[tid] }));
        }
        
        // 2. Approva tutte le missioni
        pending.forEach(m => {
            promises.push(fanta_db.approveMission(m.id));
        });
        
        // Attendi il completamento di tutte le operazioni
        await Promise.all(promises);
        
        alert("Tutte le missioni sono state approvate con successo!");
    } catch (e) {
        console.error("Errore approvazione totale missioni:", e);
        alert("Errore durante l'approvazione di tutte le missioni: " + e.message);
    } finally {
        // Refresh delle view esattamente una volta
        if(typeof window.renderAdminMissioni === 'function') await window.renderAdminMissioni();
        if(typeof window.renderAdminMissioniPending === 'function') await window.renderAdminMissioniPending();
    }
};


/* =========================================
   LEADERBOARDS DINAMICHE
========================================= */
async function showLeaderboard(type) {
    const listContainer = document.getElementById('leaderboard-list');
    const title = document.getElementById('leaderboard-title');
    listContainer.innerHTML = '<p class="text-center">Caricamento classifica...</p>';

    // Determine current mode
    const modeId = currentLeaderboardMode || 'terze';
    const mode = GAME_MODES[modeId];
    const pool = (mode && mode.authors && mode.authors.length > 0) ? mode.authors : AUTHORS;
    const modeBadge = mode ? `<span class="mode-badge ${mode.colorClass}" style="font-size:0.75rem; margin-left:8px;">${mode.emoji} ${mode.shortLabel}</span>` : '';

    // Filter teams by mode
    let allTeams = (await getAllTeams()).filter(t => (t.mode || 'terze') === modeId);
    listContainer.innerHTML = '';

    // Calcola punteggi
    let calculated = allTeams.map(team => {
        let authPoints = 0;
        team.authors.forEach(aid => {
            const author = pool.find(a => a.id === aid);
            if(author && author.isPointsRevealed) {
                authPoints += author.points;
            }
        });
        let missionPoints = (team.missionsCompleted || 0) * 5;
        return {
            team: team.name + ' (' + (team.classe || '') + ')',
            autori: authPoints,
            missioni: missionPoints,
            totale: authPoints + missionPoints,
            mode: team.mode || 'terze'
        };
    });

    let data = [];
    if(type === 'globale') {
        title.innerHTML = 'Classifica <span class="text-primary">Globale</span>' + modeBadge;
        calculated.sort((a,b) => b.totale - a.totale);
        data = calculated.map((t, idx) => ({ rank: idx+1, team: t.team, points: t.totale }));
    } else if(type === 'autori') {
        title.innerHTML = 'Classifica <span class="text-primary">Autori</span>' + modeBadge;
        calculated.sort((a,b) => b.autori - a.autori);
        data = calculated.map((t, idx) => ({ rank: idx+1, team: t.team, points: t.autori }));
    } else if(type === 'missioni') {
        title.innerHTML = 'Classifica <span class="text-primary">Missioni</span>' + modeBadge;
        calculated.sort((a,b) => b.missioni - a.missioni);
        data = calculated.map((t, idx) => ({ rank: idx+1, team: t.team, points: t.missioni }));
    }

    if (data.length === 0) {
        listContainer.innerHTML = '<p class="text-muted" style="text-align:center; padding:20px;"><i>Nessuna squadra in questa modalità ancora.</i></p>';
    } else {
        data.forEach(item => {
            const template = `
                <div class="rank-item">
                    <div class="rank-num">${item.rank}</div>
                    <div class="rank-name">${item.team}</div>
                    <div class="rank-points">${item.points} pt</div>
                </div>
            `;
            listContainer.insertAdjacentHTML('beforeend', template);
        });
    }

    navigateTo('view-classifica-dettaglio');
}

/* =========================================
   SCHEDE DIARIO
========================================= */
window.openAuthorSchedaModal = function(authorId, modeKey = null) {
    const mode = modeKey || currentTeamMode || 'terze';
    const pool = (GAME_MODES[mode] && GAME_MODES[mode].authors) ? GAME_MODES[mode].authors : AUTHORS;
    const author = pool.find(a => a.id === authorId);
    
    if (!author || !author.schedaHTML) return;
    document.getElementById('scheda-autore-title').innerHTML = `Scheda di <strong>${author.name}</strong>`;
    document.getElementById('scheda-autore-content').innerHTML = `
        <div style="text-align:center; margin-bottom:15px;">
            <img src="${author.image}" onclick="if(window.openImageModal) window.openImageModal('${author.image}')" style="width:80px; height:80px; border-radius:50%; object-fit:cover; background:#fff; cursor:pointer; border: 2px solid var(--accent-gold); box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" title="Clicca per ingrandire">
        </div>
        <div style="font-size:0.95rem; line-height:1.6; color:#e0e0e0; margin-bottom:10px;">${author.schedaHTML}</div>
    `;
    document.getElementById('scheda-autore-modal').style.display = 'block';
};

window.openImageModal = function(src) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '3000';
    modal.style.cursor = 'zoom-out';
    
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '15px';
    img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
    img.style.objectFit = 'contain';
    img.style.backgroundColor = '#fff';
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.onclick = function() {
        document.body.removeChild(modal);
    };
};

function populateSchede(modeId = null) {
    const grid = document.getElementById('schede-grid');
    if(!grid) return;
    
    grid.innerHTML = '';

    const modeKey = modeId || currentTeamMode || 'terze';
    const modeCfg = GAME_MODES[modeKey] || GAME_MODES.terze;
    const pool = modeCfg.authors || AUTHORS;
    const revealedAuthors = pool.filter(a => a.isSchedaRevealed);

    if(revealedAuthors.length === 0) {
        grid.innerHTML = '<p class="text-muted" style="grid-column: 1/-1; text-align: center; padding: 20px 0;">In attesa della prima scheda... i professori le pubblicheranno a breve!</p>';
        return;
    }

    revealedAuthors.forEach(author => {
        let content = '';
        let onclickAttr = '';

        if (author.schedaHTML) {
            onclickAttr = `onclick="openAuthorSchedaModal('${author.id}', '${modeKey}')"`;
            content = `<button class="btn btn-secondary" style="padding: 5px 12px; font-size: 0.72rem; width: 100%; border-radius: 12px; margin: 0; pointer-events: none;"><i class="fa-solid fa-eye"></i> Apri Scheda</button>`;
        } else {
            onclickAttr = `onclick="window.open('schede/${author.id}.pdf', '_blank')"`;
            content = `<button class="btn" style="padding: 5px 12px; font-size: 0.72rem; width: 100%; border-radius: 12px; margin: 0; background: var(--primary-color); color: var(--bg-dark); font-weight: bold; pointer-events: none;"><i class="fa-solid fa-file-pdf"></i> Vedi PDF</button>`;
        }
        
        const isInternationalClass = author.isInternational ? 'card-international' : '';

        const card = `
            <div class="author-card glass ${isInternationalClass}" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding: 12px !important; min-height: 200px; text-align: center;" ${onclickAttr}>
                <div class="author-image-wrapper" style="margin-bottom: 8px; width: 80px; height: 80px; aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid var(--primary-color); background: #fff; flex-shrink: 0;">
                    <img src="${author.image}" alt="${author.name}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="flex-grow:1; display:flex; flex-direction:column; justify-content:center; width:100%; margin-bottom: 8px;">
                    <div style="font-family: var(--font-heading); font-weight:bold; font-size:0.95rem; color:#f5c53c; line-height:1.2; text-shadow:0 1px 3px rgba(0,0,0,0.3);">${author.name}</div>
                </div>
                <div style="width:100%;">
                    ${content}
                </div>
            </div>
        `;
        // Conserva l'ordine cronologico (dal primo autore studiato all'ultimo)
        grid.insertAdjacentHTML('beforeend', card); 
    });
}

/* =========================================
   MULTIPLE TEAMS (STORAGE) & AUTHENTICATION
========================================= */

let currentUserEmail = null;
let currentUserRole = null;

window.selfHealMissionsCount = async function() {
    try {
        if (!currentUserEmail) return;
        
        // 1. Recupera tutte le missioni approvate
        const missionsSnap = await window.db.collection("missions").where("status", "==", "approved").get();
        const approvedMissions = missionsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        
        // 2. Recupera i team in base al ruolo dell'utente
        let teams = [];
        if (currentUserEmail === "prof.memmo@gmail.com") {
            // Admin vede tutto e corregge tutto
            teams = await fanta_db.getTeams();
        } else {
            // Docente/studente vede e corregge solo le proprie squadre
            teams = await fanta_db.getUserTeams(currentUserEmail);
            // Più quelle in collaborazione
            const collTeams = await fanta_db.getCollaboratedTeams(currentUserEmail);
            teams = [...teams, ...collTeams];
            // Rimuovi eventuali duplicati
            const ids = new Set();
            teams = teams.filter(t => {
                if (ids.has(t.id)) return false;
                ids.add(t.id);
                return true;
            });
        }
        
        // 3. Verifica per ciascuna squadra se il conteggio coincide con le missioni approvate realmente presenti
        let hasChanges = false;
        for (const team of teams) {
            const actualCount = approvedMissions.filter(m => m.teamId === team.id).length;
            const expectedCount = parseInt(team.missionsCompleted || 0, 10);
            
            if (actualCount !== expectedCount) {
                console.log(`Self-Healing: Correzione missionsCompleted per il team ${team.name} (ID: ${team.id}) da ${expectedCount} a ${actualCount}`);
                const ref = await window.fanta_db.getTeamDocRef(team.id);
                await ref.update({ missionsCompleted: actualCount });
                hasChanges = true;
            }
        }
        
        // Se ci sono stati aggiornamenti, ricarica la visualizzazione profilo o classifiche
        if (hasChanges) {
            if (typeof window.renderProfilo === 'function') window.renderProfilo();
            if (typeof window.renderAdminSquadre === 'function') window.renderAdminSquadre();
            if (typeof window.renderAdminMissioni === 'function') await window.renderAdminMissioni();
        }
    } catch (e) {
        console.error("Errore durante il self-healing dei conteggi missioni:", e);
    }
};

function checkLoginSession() {
    // Ripristina modalità se salvata
    const savedMode = localStorage.getItem('fanta_active_mode');
    if (savedMode) {
        currentTeamMode = savedMode;
        currentLeaderboardMode = savedMode;
    }

    fanta_db.onAuthStateChanged(async (user) => {
        if (user) {
            const email = user.email.toLowerCase();
            currentUserEmail = email;
            
            // Protezione pannello admin
            if (window.location.pathname.includes('admin.html')) {
                if (email !== "prof.memmo@gmail.com") {
                    alert("Accesso negato. Solo l'amministratore può accedere al pannello di controllo.");
                    window.location.href = 'index.html';
                    return;
                }
            }

            // Prof Memmo ha accesso diretto
            if (email === "prof.memmo@gmail.com") {
                currentUserRole = 'docente';
                setLoggedIn(email, 'docente');
                
                // Forza visualizzazione container nel pannello admin dopo la verifica
                if (window.location.pathname.includes('admin.html')) {
                    const _c = document.getElementById('app-container');
                    if (_c) _c.style.display = 'block';
                    
                    // Se siamo in admin, rendiamo certi ricaricamenti forzati
                    if(typeof window.renderAdminAutori === 'function') window.renderAdminAutori();
                    if(typeof window.renderAdminRichieste === 'function') window.renderAdminRichieste();
                    if(typeof renderNotifiche === 'function') renderNotifiche();
                }

                // Mostra il link al pannello admin nel menù
                const adminMenuItem = document.getElementById('menu-admin-item');
                if (adminMenuItem) adminMenuItem.style.display = 'block';
                
                if (!window.location.pathname.includes('admin.html')) {
                    if (pendingInitialView) {
                        const target = pendingInitialView;
                        pendingInitialView = null;
                        navigateTo(target, false);
                    } else if (window.location.hash === '#view-welcome' || window.location.hash === '') {
                        navigateTo('view-welcome');
                    }
                }
                
                // Esegui allineamento punteggi a caldo
                window.selfHealMissionsCount();
                return;
            }
            
            // Verifica ruolo su Firestore
            try {
                const doc = await window.db.collection("users").doc(email).get();
                
                if (doc.exists && doc.data().role) {
                    // Utente approvato e ha un ruolo
                    const role = doc.data().role;
                    currentUserRole = role;
                    setLoggedIn(email, role);
                    
                    if (pendingInitialView) {
                        const target = pendingInitialView;
                        pendingInitialView = null;
                        navigateTo(target, false);
                    } else if (window.location.hash === '#view-welcome' || window.location.hash === '') {
                        navigateTo('view-welcome');
                    }
                    
                    // Esegui allineamento punteggi a caldo
                    window.selfHealMissionsCount();
                } else {
                    // Nuovo utente o senza ruolo: mandiamo a onboarding
                    setLoggedIn(email);
                    if (pendingInitialView) {
                        const target = pendingInitialView;
                        pendingInitialView = null;
                        navigateTo(target, false);
                    } else {
                        navigateTo('view-onboarding');
                    }
                }
            } catch(e) {
                console.error("Errore checkLoginSession Firestore:", e);
                // In caso di errore (es: regole Firestore), mandiamo comunque al form onboarding
                setLoggedIn(email);
                if (pendingInitialView) {
                    const target = pendingInitialView;
                    pendingInitialView = null;
                    navigateTo(target, false);
                } else {
                    navigateTo('view-onboarding');
                }
            }
        } else {
            setLoggedOut();
            if (window.location.pathname.includes('admin.html')) {
                alert("Devi effettuare l'accesso per visualizzare il pannello admin.");
                window.location.href = 'index.html';
            } else if (pendingInitialView) {
                const target = pendingInitialView;
                pendingInitialView = null;
                navigateTo(target, false);
            }
        }
    });
}

async function loginDocente(event) {
    if(event) event.preventDefault();
    
    const checkAge = document.getElementById('welcome-check-age')?.checked;
    const checkPrivacy = document.getElementById('welcome-check-privacy')?.checked;
    if (!checkAge || !checkPrivacy) {
        alert("Devi confermare l'età e accettare Privacy Policy e Termini per continuare.");
        return;
    }

    const emailInput = document.getElementById('docente-email-input').value.trim().toLowerCase();
    const passwordInput = document.getElementById('docente-password-input').value.trim();

    if (!emailInput || !passwordInput) {
        alert("Inserisci email e password.");
        return;
    }

    try {
        await fanta_db.login(emailInput, passwordInput);
    } catch (error) {
        console.error("Login fallito:", error);
        alert("Accesso fallito. Verifica email e password o assicurati di essere stato approvato.");
    }
}

window.selectOnboardingRole = async function(role) {
    const user = window.auth.currentUser;
    if (!user) {
        alert("Devi prima accedere con Google.");
        navigateTo('view-welcome');
        return;
    }
    const email = user.email.toLowerCase();
    
    if (role === 'docente' || role === 'teacher') {
        // Ripristina flusso di iscrizione manuale per i docenti
        localStorage.setItem('fanta_temp_email', email);
        await fanta_db.logout();
        navigateTo('view-iscrizione');
    } else if (role === 'studente') {
        navigateTo('view-studenti');
    } else if (role === 'fantamico') {
        try {
            await window.db.collection("users").doc(email).set({
                email: email,
                role: role,
                name: user.displayName || email.split('@')[0],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            currentUserEmail = email;
            navigateTo('view-welcome');
        } catch (e) {
            console.error("Errore salvataggio ruolo:", e);
            alert("Si è verificato un errore durante la configurazione del tuo account. Verifica la tua connessione.");
        }
    }
};

async function loginGoogle() {
    const checkAge = document.getElementById('welcome-check-age')?.checked;
    const checkPrivacy = document.getElementById('welcome-check-privacy')?.checked;
    if (!checkAge || !checkPrivacy) {
        alert("Devi confermare l'età e accettare Privacy Policy e Termini per continuare.");
        return;
    }

    try {
        const result = await fanta_db.loginWithGoogle();
        const user = result.user;
        const email = user.email.toLowerCase();

        // checkLoginSession gestirà la logica di approvazione/reindirizzamento
    } catch (error) {
        console.error("Google Login Error:", error);
        alert("Errore durante l'accesso con Google.");
    }
}

async function inviaRichiestaIscrizione(event) {
    if(event) event.preventDefault();
    const email = (localStorage.getItem('fanta_temp_email') || document.querySelector('#docente-email-input')?.value || "").toLowerCase();
    const name = (document.getElementById('iscrizione-nome')?.value || "").trim();
    const school = (document.getElementById('iscrizione-scuola')?.value || "").trim();
    const city = (document.getElementById('iscrizione-citta')?.value || "").trim();

    if (!name || !school || !city || !email) {
        alert("Completa tutti i campi (e inserisci l'email nella home se necessario).");
        return;
    }

    try {
        const requests = await fanta_db.getTeacherRequests();
        if (requests.some(r => r.email.toLowerCase() === email)) {
            alert("Hai già inviato una richiesta di iscrizione con questa email. Attendi l'approvazione.");
            return;
        }

        const now = new Date();
        const timestamp = now.toLocaleDateString('it-IT') + ' ' + now.toLocaleTimeString('it-IT');

        const requestData = {
            email,
            name,
            school,
            city,
            status: 'pending',
            createdAt: timestamp,
            isDocente: true
        };

        await fanta_db.saveTeacherRequest(requestData);
        alert("Account creato e richiesta inviata con successo! Potrai accedere non appena il Game Master avrà approvato il tuo profilo.");
        
        await fanta_db.logout(); 
        navigateTo('view-welcome');
        if(document.getElementById('form-iscrizione')) document.getElementById('form-iscrizione').reset();
    } catch (err) {
        console.error("Errore registrazione:", err);
        alert("Errore durante la registrazione: " + (err.message || "riprova più tardi."));
    }
}

async function checkStudentConsent() {
    const codeInput = document.getElementById('student-code-input').value.trim().toUpperCase();
    const ageCheck = document.getElementById('student-check-age').checked;
    const privacyCheck = document.getElementById('student-check-privacy').checked;

    if (!codeInput) {
        alert("Inserisci il codice della tua squadra per continuare.");
        return;
    }

    if (!hasReadPrivacy || !hasReadTermini) {
        alert("Per proseguire è necessario aprire e leggere la Privacy Policy e i Termini e Condizioni cliccando sui rispettivi link.");
        return;
    }

    if (!ageCheck || !privacyCheck) {
        alert("Devi dichiarare l'età e accettare la Privacy Policy per procedere.");
        return;
    }

    try {
        const team = await fanta_db.getTeamByCode(codeInput);
        if (!team) {
            alert("Codice non valido. Verifica con il tuo docente.");
            return;
        }

        // Salviamo il ruolo per i futuri login, se l'utente è autenticato tramite Google
        const user = window.auth.currentUser;
        if (user) {
            try {
                await window.db.collection("users").doc(user.email.toLowerCase()).set({
                    email: user.email.toLowerCase(),
                    role: 'studente',
                    teamId: team.id,
                    teamCode: codeInput,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            } catch (roleErr) {
                console.error("Errore salvataggio ruolo studente:", roleErr);
            }
        }

        // Salviamo il codice e lo stato dello studente localmente
        localStorage.setItem('fanta_active_team_code', codeInput);
        localStorage.setItem('fanta_active_team_id', team.id);
        
        // Imposta automaticamente il campionato della squadra
        if (team.mode) {
            localStorage.setItem('fanta_active_mode', team.mode);
            currentTeamMode = team.mode;
            currentLeaderboardMode = team.mode;
            // Se eravamo in un'altra vista, forziamo il refresh dei dati prima di navigare
            if (typeof populateAuthorSelects === 'function') populateAuthorSelects(team.mode);
            if (typeof populateSchede === 'function') populateSchede(team.mode);
        }

        const now = new Date();
        const timestamp = now.toLocaleDateString('it-IT') + ' ' + now.toLocaleTimeString('it-IT');
        localStorage.setItem('fanta_student_consent', timestamp);

        alert(`Benvenuto! Accesso effettuato per la squadra: ${team.name}`);
        navigateTo('view-classifiche');
    } catch (e) {
        console.error("Errore validazione codice:", e);
        alert("Si è verificato un errore durante la verifica del codice. Riprova tra poco.");
    }
}

function inviaMessaggioContatto(event) {
    if(event) event.preventDefault();
    const privacyCheck = document.getElementById('contact-check-privacy').checked;
    const messaggio = document.getElementById('contatti-messaggio').value.trim();

    if (!messaggio) {
        alert("Inserisci un messaggio.");
        return;
    }

    if (!hasReadPrivacy) {
        alert("Per proseguire è necessario aprire e leggere la Privacy Policy cliccando sul relativo link.");
        return;
    }

    if (!privacyCheck) {
        alert("Devi accettare la Privacy Policy per inviare il messaggio.");
        return;
    }

    alert("Messaggio inviato con successo! Ti risponderemo al più presto.");
    // Logica di invio mail simulata o reale verrebbe qui
    navigateTo('view-welcome');
}

function eliminaAccountTotale() {
    if (confirm("ATTENZIONE: Se procedi, verranno rimossi DEFINITIVAMENTE tutti i tuoi dati locali e verrai disconnesso. Vuoi continuare?")) {
        fanta_db.logout().finally(() => {
            localStorage.clear();
            alert("Dati locali rimossi. Verrai reindirizzato alla Home.");
            window.location.reload();
        });
    }
}

function azzeraTutteSpunte() {
    const mode = window.currentAdminMode || 'terze';
    const modeCfg = GAME_MODES[mode] || GAME_MODES.terze;
    
    if(!confirm(`Vuoi davvero azzerare tutte le spunte della modalità ${modeCfg.label} e ricominciare il gioco?`)) return;
    
    const pool = modeCfg.authors || AUTHORS;
    pool.forEach(a => {
        a.isPointsRevealed = false;
        a.isSchedaRevealed = false;
    });
    
    saveGameState(mode);
    if (typeof window.renderAdminAutori === 'function') window.renderAdminAutori(mode);
    alert(`Tutte le spunte della modalità ${modeCfg.label} sono state rimosse!`);
}

window.testConnessioneAdmin = async function() {
    const feedback = document.createElement('div');
    feedback.style = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#3498db; color:white; padding:15px 30px; border-radius:12px; font-weight:bold; z-index:20000; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-size:0.9rem;';
    feedback.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifica connessione in corso...';
    document.body.appendChild(feedback);

    try {
        // Tentiamo di leggere la configurazione globale come test
        await fanta_db.getSettings('terze');
        feedback.style.background = '#27ae60';
        feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Connessione Firebase OK!';
        setTimeout(() => feedback.remove(), 3000);
    } catch (e) {
        console.error("Errore test connessione:", e);
        feedback.style.background = '#e74c3c';
        feedback.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Errore connessione: ' + e.message;
        setTimeout(() => feedback.remove(), 5000);
    }
};

async function logoutDocente() {
    await fanta_db.logout();
    currentUserEmail = null;
    const loginSec = document.getElementById('login-section');
    const loggedSec = document.getElementById('logged-in-section');
    if(loginSec) loginSec.style.display = 'block';
    if(loggedSec) loggedSec.style.display = 'none';
    
    // Hide Profile tabs/links
    const pLink = document.getElementById('menu-link-profilo');
    const pTab = document.getElementById('tab-item-profilo');
    if(pLink) pLink.classList.add('hidden');
    if(pTab) pTab.classList.add('hidden');
    
    const profEmail = document.getElementById('profilo-email');
    const profAdminEmail = document.getElementById('admin-profilo-email');
    const profSqList = document.getElementById('profilo-squadre-list');
    const profMisList = document.getElementById('profilo-missioni-list');
    const profTornei = document.getElementById('profilo-tornei-list');
    
    if(profEmail) profEmail.value = "";
    if(profSqList) profSqList.innerHTML = '<i>Nessuna squadra caricata. Entra nella home e iscrivi una classe.</i>';
    if(profMisList) profMisList.innerHTML = '<i>Ancora nessuna missione...</i>';
    if(profTornei) profTornei.innerHTML = '<i>Nessun torneo creato.</i>';
    
    navigateTo('view-welcome');
}

/* =========================================
   LEGAL MODALS
========================================= */

let hasReadPrivacy = false;
let hasReadTermini = false;

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
            document.body.style.overflow = 'auto';
        }
    }
}

// Chiudi modali cliccando fuori dal contenuto
window.onclick = function(event) {
    if (event.target.classList.contains('modal-legal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (event.target.id === 'share-modal') event.target.style.display = 'none';
    if (event.target.id === 'torneo-modal') event.target.style.display = 'none';
    if (event.target.id === 'join-torneo-modal') event.target.style.display = 'none';
    if (event.target.id === 'invite-torneo-modal') event.target.style.display = 'none';
}

function setLoggedIn(email, role = '') {
    currentUserEmail = email;
    if (role) {
        localStorage.setItem('fanta_user_role', role);
        currentUserRole = role;
    } else {
        currentUserRole = localStorage.getItem('fanta_user_role') || '';
    }
    
    // Sidebar and menu-btn removed
    
    const loginSec = document.getElementById('login-section');
    const loggedSec = document.getElementById('logged-in-section');
    if(loginSec) loginSec.style.display = 'none';
    if(loggedSec) loggedSec.style.display = 'block';
    
    const loggedWelc = document.getElementById('logged-in-welcome');
    const loggedInNormalContent = document.getElementById('logged-in-normal-content');
    
    const isTeacher = currentUserRole === 'docente' || currentUserRole === 'teacher' || email === 'prof.memmo@gmail.com';
    const isFantamico = currentUserRole === 'fantamico' || currentUserRole === 'guest';
    const isStudent = currentUserRole === 'studente';
    
    if (loggedWelc) {
        if (isTeacher) loggedWelc.textContent = "Bentornato, Prof!";
        else if (isFantamico) loggedWelc.textContent = "Ciao, Fantamico!";
        else if (isStudent) loggedWelc.textContent = "Ciao, Studente!";
        else loggedWelc.textContent = "Benvenuto!";
    }
    
    if (loggedInNormalContent) {
        if (isStudent) {
            const teamCode = localStorage.getItem('fanta_active_team_code') || '';
            loggedInNormalContent.innerHTML = `
                <h3 class="text-center mb-1 text-primary">Area Studente</h3>
                <p class="text-center" style="font-size: 0.9rem; margin-bottom:20px;">Hai effettuato l'accesso come studente.${teamCode ? `<br>Codice Squadra attivo: <b>${teamCode}</b>` : ''}</p>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button class="btn" style="width:100%;" onclick="navigateTo('view-classifiche')">Vedi le Classifiche</button>
                    <button class="btn btn-secondary" style="width:100%; border-width:2px;" onclick="navigateTo('view-schede')">Esplora le Schede Autore</button>
                </div>
            `;
        } else if (isFantamico) {
            loggedInNormalContent.innerHTML = `
                <h3 class="text-center mb-1 text-primary">Ciao, Fantamico!</h3>
                <p class="text-center" style="font-size: 0.9rem; margin-bottom:20px;">Hai effettuato l'accesso all'area personale Fantamico.</p>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button class="btn" style="width:100%;" onclick="navigateTo('view-profilo')">Vai al tuo Profilo / Squadre</button>
                    <button class="btn btn-secondary" style="width:100%; border-width:2px;" onclick="navigateTo('view-squadra')">Crea una Nuova Squadra</button>
                </div>
            `;
        } else {
            loggedInNormalContent.innerHTML = `
                <h3 class="text-center mb-1 text-primary">Bentornato, Prof!</h3>
                <p class="text-center" style="font-size: 0.9rem; margin-bottom:20px;">Hai effettuato l'accesso all'area personale.</p>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button class="btn" style="width:100%;" onclick="navigateTo('view-profilo')">Vai alle tue Squadre / Profilo</button>
                    <button class="btn btn-secondary" style="width:100%; border-width:2px;" onclick="navigateTo('view-squadra')">Iscrivi una Nuova Classe</button>
                </div>
            `;
        }
    }
    
    // Show Profile and Admin tabs only if not a student
    const pTab = document.getElementById('tab-item-profilo');
    if(pTab) {
        if (isStudent) pTab.classList.add('hidden');
        else pTab.classList.remove('hidden');
    }

    const adminTab = document.getElementById('tab-item-admin');
    if (adminTab) {
        if (email === 'prof.memmo@gmail.com') adminTab.classList.remove('hidden');
        else adminTab.classList.add('hidden');
    }

    const profEmail = document.getElementById('profilo-email');
    if(profEmail) profEmail.value = email;
    const profAdminEmail = document.getElementById('admin-profilo-email');
    if(profAdminEmail) profAdminEmail.value = email;
    
    const appContainer = document.getElementById('app-container');
    if(appContainer) appContainer.style.display = 'block';

    if (!isStudent) {
        renderProfilo();
    }
    
    if (typeof renderNotifiche === 'function') {
        renderNotifiche();
    }
}

function setLoggedOut() {
    currentUserEmail = null;
    currentUserRole = null;
    localStorage.removeItem('fanta_user_role');
    
    // Sidebar and menu-btn removed
    
    const loginSec = document.getElementById('login-section');
    const loggedSec = document.getElementById('logged-in-section');
    if(loginSec) loginSec.style.display = 'block';
    if(loggedSec) loggedSec.style.display = 'none';
    
    const pLink = document.getElementById('menu-link-profilo');
    const pTab = document.getElementById('tab-item-profilo');
    if(pLink) pLink.classList.add('hidden');
    if(pTab) pTab.classList.add('hidden');

    // Nascondi link pannello admin
    const adminMenuItem = document.getElementById('menu-admin-item');
    if (adminMenuItem) adminMenuItem.style.display = 'none';
}

async function getAllTeams() {
    try {
        const dbTeams = await fanta_db.getTeams();
        return dbTeams;
    } catch (e) {
        console.error("Errore recupero squadre da Firebase:", e);
        return [];
    }
}

/* =========================================
   TEAM CREATION & PROFILO UTENTE
========================================= */

function setupTeamSave() {
    const saveBtn = document.getElementById('btn-save-team');
    if (!saveBtn) return;
    
    saveBtn.addEventListener('click', () => {
        if (!currentUserEmail) {
            alert("Devi identificarti nella Home prima di salvare una squadra!");
            navigateTo('view-welcome');
            return;
        }

        if (!currentTeamMode) {
            alert("Scegli la modalità di gioco prima di salvare la squadra!");
            return;
        }

        const teamNameInput = document.querySelector('#view-squadra input[placeholder="Es: I Promessi Sposi"]').value.trim();
        const teamClasseInput = document.getElementById('team-classe-input').value.trim();
        
        if(!teamNameInput || !teamClasseInput) {
            alert("Inserisci il nome e la classe della squadra!");
            return;
        }

        const authorsSelected = Object.values(teamSelection).filter(a => a !== null);
        if(authorsSelected.length !== 5) {
            alert("Devi selezionare esattamente 5 autori.");
            return;
        }

        const newTeam = {
            id: 't' + Date.now(),
            name: teamNameInput,
            classe: teamClasseInput,
            ownerEmail: currentUserEmail,
            authors: authorsSelected,
            missionsCompleted: 0,
            mode: currentTeamMode
        };

        // Salvataggio su Firebase
        fanta_db.saveTeam(newTeam).then(() => {
            alert("Squadra creata con successo!");
            // Reset form
            document.querySelector('#view-squadra input[placeholder="Es: I Promessi Sposi"]').value = "";
            document.getElementById('team-classe-input').value = "";
            teamSelection = { 1: null, 2: null, 3: null, 4: null, 5: null };
            calculateBudget();
            
            renderProfilo();
            navigateTo('view-profilo');
        }).catch(err => {
            console.error("Errore Firebase:", err);
            alert("Errore durante il salvataggio. Verifica la tua connessione.");
        });
        
        // Reset form
        document.querySelector('#view-squadra input[placeholder="Es: I Promessi Sposi"]').value = "";
        document.getElementById('team-classe-input').value = "";
        currentTeamMode = null;
        teamSelection = { 1: null, 2: null, 3: null, 4: null, 5: null };

        // Reset mode buttons
        ['terze','seconde','avanzato'].forEach(id => {
            const btn = document.getElementById('mode-btn-' + id);
            if (btn) btn.classList.remove('active-green','active-orange','active-gold');
        });

        // Hide budget + slots
        const budgetContainer = document.getElementById('budget-container');
        const slotsSection = document.getElementById('author-slots-section');
        if (budgetContainer) budgetContainer.style.display = 'none';
        if (slotsSection) slotsSection.style.display = 'none';

        document.querySelectorAll('.author-slot-btn').forEach(btn => {
            const ord = ['1ª','2ª','3ª','4ª','5ª'];
            const slot = btn.dataset.slot;
            btn.innerHTML = `<span class="slot-name"><i class="fa-solid fa-plus"></i> Scegli la ${ord[slot-1]} star</span> <span class="slot-cost text-primary"></span>`;
        });
        document.querySelectorAll('.author-remove-btn').forEach(b => b.classList.remove('visible'));
        calculateBudget();
        
        renderProfilo();
        navigateTo('view-profilo');
    });
}

async function renderProfilo() {
    if(!currentUserEmail) return;
    
    const allTeams = await getAllTeams();
    const myTeams = allTeams.filter(t => t.ownerEmail === currentUserEmail);
    
    // Carica anche i team dove il docente è collaboratore
    let collabTeams = [];
    try {
        collabTeams = await fanta_db.getCollaboratedTeams(currentUserEmail);
    } catch(e) { /* Query non disponibile se non ci sono indici, ignora silenziosamente */ }

    const squadreList = document.getElementById('profilo-squadre-list');
    if(!squadreList) return;

    // Carica tutti gli studenti una volta sola
    let allStudentsMap = {};
    try {
        const snap = await window.db.collection("users").where("role", "==", "studente").get();
        snap.docs.forEach(d => { allStudentsMap[d.data().teamId] = allStudentsMap[d.data().teamId] || []; allStudentsMap[d.data().teamId].push(d.data()); });
    } catch(e) { /* ignora */ }

    // Calcoliamo i punteggi globali per determinare le posizioni
    let calculatedLeaderboard = allTeams.map(t => {
        let authPoints = 0;
        const teamMode = t.mode || 'terze';
        const modeCfg = GAME_MODES[teamMode] || GAME_MODES.terze;
        const pool = modeCfg.authors || AUTHORS;

        t.authors.forEach(aid => {
            let author = pool.find(a => a.id === aid);
            if (!author) {
                Object.values(GAME_MODES).forEach(modeCfg => {
                    if (!author && modeCfg.authors) {
                        author = modeCfg.authors.find(x => x.id === aid);
                    }
                });
            }
            if (!author) {
                author = AUTHORS.find(x => x.id === aid);
            }
            if(author && author.isPointsRevealed) authPoints += (author.points || 0);
        });
        return {
            id: t.id,
            points: authPoints + ((t.missionsCompleted || 0) * 5)
        };
    });
    calculatedLeaderboard.sort((a, b) => b.points - a.points);

    // Helper: renderizza una singola card squadra
    function renderTeamCard(team, isCollaborated) {
        const teamMode = team.mode || 'terze';
        const modeCfg = GAME_MODES[teamMode] || GAME_MODES.terze;
        const currentPool = modeCfg.authors || AUTHORS;

        let rank = calculatedLeaderboard.findIndex(s => s.id === team.id) + 1;
        let authPts = 0;
        team.authors.forEach(aid => {
            let a = currentPool.find(x => x.id === aid);
            if (!a) {
                Object.values(GAME_MODES).forEach(modeCfg => {
                    if (!a && modeCfg.authors) {
                        a = modeCfg.authors.find(x => x.id === aid);
                    }
                });
            }
            if (!a) {
                a = AUTHORS.find(x => x.id === aid);
            }
            if(a && a.isPointsRevealed) authPts += (a.points || 0);
        });
        let misPts = (team.missionsCompleted || 0) * 5;
        const modeBadgeHtml = `<span class="mode-badge ${modeCfg.colorClass}">${modeCfg.emoji} ${modeCfg.shortLabel}</span>`;
        const collabBadge = isCollaborated
            ? `<span style="font-size:0.72rem; background:rgba(141,160,63,0.2); color:var(--primary-color); border-radius:8px; padding:2px 8px; margin-left:4px;"><i class="fa-solid fa-users-gear"></i> Collaboratore</span>`
            : '';

        // Autori in questa squadra
        let autoriSection = '';
        if (team.authors && team.authors.length > 0) {
            const autoriRows = team.authors.map(aid => {
                let author = currentPool.find(x => x.id === aid);
                if (!author) {
                    Object.values(GAME_MODES).forEach(modeCfg => {
                        if (!author && modeCfg.authors) {
                            author = modeCfg.authors.find(x => x.id === aid);
                        }
                    });
                }
                if (!author) {
                    author = AUTHORS.find(x => x.id === aid);
                }
                if (!author) return '';
                
                const ptsLabel = author.isPointsRevealed 
                    ? `<span style="font-weight:bold; color:var(--primary-color);">${author.points} pt</span>`
                    : `<span style="font-size:0.75rem; color:var(--text-muted);"><i class="fa-solid fa-eye-slash" title="Punti non ancora rivelati"></i> ? pt</span>`;
                
                return `
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.03);">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <img src="${author.image}" alt="${author.name}" style="width:28px; height:28px; border-radius:50%; object-fit:cover; border:1px solid var(--primary-color); background:#fff;">
                            <span style="font-size:0.8rem; font-weight:500; color:var(--text-main);">${author.name}</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span style="font-size:0.7rem; color:var(--text-muted);">${author.cost || author.points || 0} €</span>
                            ${ptsLabel}
                        </div>
                    </div>
                `;
            }).join('');

            autoriSection = `
                <details style="margin-top:6px; margin-bottom:6px; width:100%; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                    <summary style="font-size:0.78rem; cursor:pointer; color:var(--primary-color); font-weight:600; user-select:none; margin-bottom:6px; display:flex; align-items:center; gap:5px;">
                        <i class="fa-solid fa-feather-pointed"></i> Autori Schierati (${team.authors.length}/5)
                    </summary>
                    <div style="padding-left:4px; max-height: 250px; overflow-y: auto;">
                        ${autoriRows}
                    </div>
                </details>
            `;
        } else {
            autoriSection = `
                <div style="font-size:0.75rem; color:var(--text-muted); padding:8px 0; border-top:1px solid rgba(255,255,255,0.05); width:100%;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Nessun autore ancora schierato in questa squadra.
                </div>
            `;
        }

        // Docenti di questa squadra (Proprietario + Collaboratori)
        const docentiArr = [];
        if (team.ownerEmail) {
            docentiArr.push({ email: team.ownerEmail, role: 'Proprietario' });
        }
        if (team.collaboratori && team.collaboratori.length > 0) {
            team.collaboratori.forEach(email => {
                docentiArr.push({ email: email, role: 'Collaboratore' });
            });
        }

        let docentiSection = '';
        if (docentiArr.length > 0) {
            const docentiRows = docentiArr.map(d => {
                const isOwner = d.role === 'Proprietario';
                const roleBadge = isOwner 
                    ? `<span style="font-size:0.65rem; background:rgba(245, 197, 60, 0.15); color:#f5c53c; border: 1px solid rgba(245, 197, 60, 0.25); border-radius:6px; padding:1px 6px; font-weight:600;">Proprietario</span>`
                    : `<span style="font-size:0.65rem; background:rgba(141,160,63,0.15); color:var(--primary-color); border: 1px solid rgba(141,160,63,0.25); border-radius:6px; padding:1px 6px; font-weight:600;">Collaboratore</span>`;
                
                return `
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.03);">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <i class="fa-solid fa-chalkboard-user" style="color:var(--text-muted); font-size:0.8rem;"></i>
                            <span style="font-size:0.8rem; font-weight:500; color:var(--text-main);">${d.email}</span>
                        </div>
                        ${roleBadge}
                    </div>
                `;
            }).join('');

            docentiSection = `
                <details style="margin-top:6px; margin-bottom:6px; width:100%; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                    <summary style="font-size:0.78rem; cursor:pointer; color:var(--primary-color); font-weight:600; user-select:none; margin-bottom:6px; display:flex; align-items:center; gap:5px;">
                        <i class="fa-solid fa-user-tie"></i> Docenti Gestori (${docentiArr.length})
                    </summary>
                    <div style="padding-left:4px; max-height: 150px; overflow-y: auto;">
                        ${docentiRows}
                    </div>
                </details>
            `;
        }

        // Studenti iscritti a questa squadra
        const studentiArr = allStudentsMap[team.id] || [];
        let studentiSection = '';
        if (studentiArr.length > 0) {
            const studentiRows = studentiArr.map(s => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.03);">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i class="fa-solid fa-graduation-cap" style="color:var(--text-muted); font-size:0.8rem;"></i>
                        <span style="font-size:0.8rem; font-weight:500; color:var(--text-main);">${s.email}</span>
                    </div>
                    <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.7rem; width:auto; border-radius:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1);"
                        onclick="profiloSpostaStudente('${s.email}', '${team.id}', '${team.name}')">
                        <i class="fa-solid fa-right-left"></i> Sposta
                    </button>
                </div>`).join('');

            studentiSection = `
                <details style="margin-top:6px; margin-bottom:6px; width:100%; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                    <summary style="font-size:0.78rem; cursor:pointer; color:var(--primary-color); font-weight:600; user-select:none; margin-bottom:6px; display:flex; align-items:center; gap:5px;">
                        <i class="fa-solid fa-users"></i> Studenti Iscritti (${studentiArr.length})
                    </summary>
                    <div style="padding-left:4px; max-height: 200px; overflow-y: auto;">
                        ${studentiRows}
                    </div>
                </details>
            `;
        } else {
            studentiSection = `
                <div style="font-size:0.75rem; color:var(--text-muted); padding:8px 0; border-top:1px solid rgba(255,255,255,0.05); width:100%;">
                    <i class="fa-solid fa-circle-info"></i> Nessuno studente ancora iscritto a questa squadra.
                </div>
            `;
        }

        // Sezione codice (mostrata sia per proprietario che per collaboratore)
        const codiceSection = `
            <div style="width:100%; margin-bottom:8px; padding:8px 10px; border-radius:8px; background:rgba(141, 160, 63, 0.04); border:1px dashed rgba(141, 160, 63, 0.3); display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div style="display:flex; flex-direction:column; gap:4px; flex-grow:1;">
                    <span style="font-size:0.68rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; letter-spacing:0.5px;">Codice Studenti</span>
                    <span class="join-code-badge" style="margin:0; font-size:1rem; padding:3px 8px; width:fit-content; text-align:center; font-weight:bold;">${team.joinCode || '---'}</span>
                </div>
                <button class="btn" style="width:auto; padding:6px 12px; font-size:0.75rem; border-radius:12px; height:fit-content;" onclick="shareInvite({type:'student', code:'${team.joinCode}', teamName:'${team.name.replace(/'/g, "\\'")}'})">
                    <i class="fa-solid fa-share-nodes"></i> Condividi
                </button>
            </div>`;

        // Sezione Azioni (Modifica / Collaboratori / Elimina)
        const azioniSection = `
            <div style="display:flex; flex-wrap:wrap; gap:8px; width:100%; margin-top:4px; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                <button class="btn btn-secondary" style="flex:1; min-width:80px; padding:5px 8px; font-size:0.72rem; border-radius:8px; background:rgba(255,255,255,0.03);" 
                    onclick="docenteModificaSquadra('${team.id}', '${team.name.replace(/'/g, "\\'")}', '${(team.classe || '').replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-pen-to-square"></i> Modifica
                </button>
                <button class="btn btn-secondary" style="flex:1.2; min-width:110px; padding:5px 8px; font-size:0.72rem; border-radius:8px; background:rgba(141,160,63,0.15); border-color:var(--primary-color);"
                    onclick="window.apriCollaboratori('${team.id}', '${team.name.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-user-plus"></i> Collaboratori
                </button>
                <button class="btn btn-danger" style="flex:1; min-width:80px; padding:5px 8px; font-size:0.72rem; border-radius:8px; background:rgba(230, 57, 70, 0.1); border:1px solid rgba(230, 57, 70, 0.2); color:#e63946;" 
                    onclick="docenteEliminaSquadra('${team.id}', '${team.name.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-trash-can"></i> Elimina
                </button>
            </div>`;

        return `
            <div class="card" style="margin:0; padding:12px; flex-direction:column; align-items:flex-start; gap:8px; width:100%;">
                <div style="width:100%;">
                    <div style="font-family: var(--font-heading); font-weight:bold; color:#f5c53c; font-size:1.35rem; line-height:1.2; text-shadow: 0 1px 4px rgba(0,0,0,0.4); width:100%;">${team.name}${collabBadge}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px; line-height:1.35;">
                        <div style="color:var(--text-main); font-weight:500;"><i class="fa-solid fa-users" style="font-size:0.68rem; margin-right:4px;"></i> Classe: <strong>${team.classe || 'N/A'}</strong></div>
                        <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">Campionato: ${modeCfg.emoji} ${modeCfg.shortLabel}</div>
                    </div>
                </div>
                
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%; background:rgba(255, 255, 255, 0.02); border:1px solid rgba(255, 255, 255, 0.05); padding:6px 10px; border-radius:8px; margin-bottom:4px; font-size:0.8rem;">
                    <div style="text-align:left; flex:1;">
                        <span style="color:var(--text-muted); display:block; font-size:0.6rem; text-transform:uppercase; letter-spacing:0.5px;">Autori</span>
                        <span style="font-weight:bold; color:var(--text-main); font-size:0.95rem;">${authPts} pt</span>
                    </div>
                    <div style="text-align:left; flex:1; border-left:1px solid rgba(255,255,255,0.08); padding-left:10px;">
                        <span style="color:var(--text-muted); display:block; font-size:0.6rem; text-transform:uppercase; letter-spacing:0.5px;">Missioni</span>
                        <span style="font-weight:bold; color:var(--text-main); font-size:0.95rem;">${misPts} pt</span>
                    </div>
                    <div style="text-align:left; flex:1.2; border-left:1px solid rgba(255,255,255,0.08); padding-left:10px;">
                        <span style="color:var(--text-muted); display:block; font-size:0.6rem; text-transform:uppercase; letter-spacing:0.5px;">Totale</span>
                        <span style="font-weight:bold; color:var(--primary-color); font-size:0.95rem;">${authPts + misPts} pt</span>
                    </div>
                    <div style="text-align:right; flex:1; border-left:1px solid rgba(255,255,255,0.08); padding-left:10px;">
                        <span style="color:var(--text-muted); display:block; font-size:0.6rem; text-transform:uppercase; letter-spacing:0.5px;">Posizione</span>
                        <span style="font-weight:bold; color:#f5c53c; font-size:0.95rem;">#${rank}</span>
                    </div>
                </div>

                ${autoriSection}
                ${docentiSection}
                ${studentiSection}
                ${codiceSection}
                ${azioniSection}
            </div>`;
    }

    squadreList.innerHTML = '';
    if(myTeams.length === 0 && collabTeams.length === 0) {
        squadreList.innerHTML = '<div class="glass" style="padding:20px; text-align:center; grid-column: 1 / -1; width: 100%;"><i>Nessuna squadra creata. Premi il tasto sopra per iniziare!</i></div>';
    } else {
        myTeams.forEach(team => { squadreList.innerHTML += renderTeamCard(team, false); });
        collabTeams.forEach(team => { squadreList.innerHTML += renderTeamCard(team, true); });
    }

    // Aggiorna le missioni convalidate del profilo docente
    const profMisList = document.getElementById('profilo-missioni-list');
    if(profMisList) {
        profMisList.innerHTML = '<i>Caricamento missioni convalidate...</i>';
        try {
            // Ottieni tutte le missioni convalidate
            const snap = await window.db.collection("missions").where("status", "==", "approved").get();
            const approvedMissions = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // Filtra solo quelle delle squadre dell'utente (proprietario o collaboratore)
            const myTeamIds = [...myTeams, ...collabTeams].map(t => t.id);
            const myApproved = approvedMissions.filter(m => myTeamIds.includes(m.teamId));
            
            if(myApproved.length === 0) {
                profMisList.innerHTML = '<i>Nessuna missione convalidata.</i>';
            } else {
                profMisList.innerHTML = '';
                myApproved.forEach(m => {
                    const t = [...myTeams, ...collabTeams].find(x => x.id === m.teamId);
                    const teamName = t ? t.name : 'Squadra Sconosciuta';
                    profMisList.innerHTML += `
                        <div class="glass" style="padding:10px; margin-bottom:8px; border-left:3px solid var(--primary-color); display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <div style="font-weight:bold; font-size:0.9rem;">${m.titolo}</div>
                                <small style="color:var(--text-muted);"><i class="fa-solid fa-users"></i> ${teamName}</small>
                            </div>
                            <div style="font-size:0.75rem; color:var(--primary-color); font-weight:bold;"><i class="fa-solid fa-circle-check"></i> Convalidata (+5 pt)</div>
                        </div>
                    `;
                });
            }
        } catch(e) {
            console.error("Errore nel caricamento delle missioni convalidate:", e);
            profMisList.innerHTML = '<i>Errore nel caricamento delle missioni.</i>';
        }
    }

    renderNotifiche();
    renderTornei();
}

window.docenteModificaSquadra = async function(teamId, currentName, currentClasse) {
    const newName = prompt("Modifica il nome della squadra:", currentName);
    if (newName === null) return;
    if (!newName.trim()) { alert("Il nome della squadra non può essere vuoto."); return; }
    
    const newClasse = prompt("Modifica la classe (es: 3D):", currentClasse);
    if (newClasse === null) return;
    
    try {
        await fanta_db.updateTeam(teamId, {
            name: newName.trim(),
            classe: newClasse.trim()
        });
        alert("Squadra modificata con successo!");
        renderProfilo();
    } catch (e) {
        console.error(e);
        alert("Errore durante la modifica della squadra: " + e.message);
    }
};

window.docenteEliminaSquadra = async function(teamId, teamName) {
    if (!confirm(`Sei sicuro di voler eliminare definitivamente la squadra "${teamName}"? Questa azione non può essere annullata.`)) return;
    try {
        await fanta_db.deleteTeam(teamId);
        alert("Squadra eliminata con successo!");
        renderProfilo();
    } catch (e) {
        console.error(e);
        alert("Errore durante l'eliminazione della squadra: " + e.message);
    }
};

// Associazione collaboratore via codice squadra (es. ALFA24)
window.uniscitiComeCollaboratore = async function() {
    const input = document.getElementById('unisciti-squadra-codice');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (!code) {
        alert("Per favore, inserisci un codice squadra.");
        return;
    }

    if (!currentUserEmail) {
        alert("Devi essere autenticato come docente per eseguire questa azione.");
        return;
    }

    try {
        const snap = await window.db.collection('teams').where('joinCode', '==', code).get();
        if (snap.empty) {
            alert("Nessuna squadra trovata con il codice specificato.");
            return;
        }

        const teamDoc = snap.docs[0];
        const teamData = teamDoc.data();
        
        if (teamData.ownerEmail && teamData.ownerEmail.toLowerCase() === currentUserEmail.toLowerCase()) {
            alert("Sei già il proprietario di questa squadra!");
            return;
        }

        const collaboratori = teamData.collaboratori || [];
        if (collaboratori.map(e => e.toLowerCase()).includes(currentUserEmail.toLowerCase())) {
            alert("Fai già parte dei collaboratori di questa squadra!");
            return;
        }

        await window.db.collection('teams').doc(teamDoc.id).update({
            collaboratori: firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
        });

        alert(`Sei stato aggiunto come collaboratore alla squadra "${teamData.name}"!`);
        input.value = '';
        
        renderProfilo();
    } catch (e) {
        console.error(e);
        alert("Errore durante l'associazione: " + e.message);
    }
};

// Sposta studente da pagina profilo docente (usa stessa modal dell'admin se disponibile)
window.profiloSpostaStudente = async function(studentEmail, currentTeamId, currentTeamName) {
    // Se siamo in admin.html usa la modal admin, altrimenti usa prompt
    const modal = document.getElementById('modal-sposta-studente');
    if (modal) {
        window.apriSpostaStudente(studentEmail, currentTeamId, currentTeamName);
        return;
    }
    // Fallback semplice per index.html (senza modal dedicata)
    const allTeams = await getAllTeams();
    const altre = allTeams.filter(t => t.id !== currentTeamId);
    if (altre.length === 0) { alert('Nessun\'altra squadra disponibile.'); return; }
    const opzioni = altre.map((t, i) => `${i + 1}. ${t.name} (${t.classe || ''})`).join('\n');
    const scelta = prompt(`Sposta ${studentEmail} da "${currentTeamName}" a quale squadra?\n\n${opzioni}\n\nInserisci il numero:`);
    const idx = parseInt(scelta) - 1;
    if (isNaN(idx) || idx < 0 || idx >= altre.length) { alert('Scelta non valida.'); return; }
    const dest = altre[idx];
    try {
        await fanta_db.moveStudent(studentEmail, dest.id, dest.joinCode || '');
        alert(`Studente spostato in "${dest.name}"!`);
        renderProfilo();
    } catch (e) {
        alert('Errore: ' + e.message);
    }
};

async function renderNotifiche() {
    const list = document.getElementById('profilo-notifiche-list');
    const badge = document.getElementById('notification-badge');
    if(!currentUserEmail) return;
    
    if(list) list.innerHTML = '<p class="text-center">Caricamento notifiche...</p>';
    
    try {
        const allTeams = await fanta_db.getTeams();
        
        let pendingInvites = [];
        try {
            const myPending = await fanta_db.getInvites(currentUserEmail);
            pendingInvites = myPending.filter(i => i.status === 'pending');
        } catch (err) {
            console.warn("getInvites failed or permission denied: ", err);
        }

        let pendingMissions = [];
        if (currentUserEmail === 'prof.memmo@gmail.com') {
            try {
                pendingMissions = await fanta_db.getPendingMissions();
            } catch (err) {
                console.warn("getPendingMissions failed: ", err);
            }
        }

        // Rileva le notifiche di convalida/rifiuto missioni per i docenti/fantamici
        let unseenMissions = [];
        if (currentUserEmail !== 'prof.memmo@gmail.com') {
            const myTeams = allTeams.filter(t => t.ownerEmail === currentUserEmail);
            const myTeamIds = myTeams.map(t => t.id);
            let collabTeams = [];
            try {
                collabTeams = await fanta_db.getCollaboratedTeams(currentUserEmail);
            } catch(e) {}
            const allMyTeamIds = [...myTeamIds, ...collabTeams.map(t => t.id)];

            if (allMyTeamIds.length > 0) {
                try {
                    const snap = await window.db.collection("missions")
                        .where("teamId", "in", allMyTeamIds.slice(0, 30))
                        .get();
                    const myMissions = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                        .filter(m => m.status === 'approved' || m.status === 'rejected');
                    
                    const seenMissionsStr = localStorage.getItem('fanta_seen_missions') || '[]';
                    let seenMissions = [];
                    try {
                        seenMissions = JSON.parse(seenMissionsStr);
                    } catch(e) {
                        seenMissions = [];
                    }
                    
                    myMissions.forEach(m => {
                        if (!seenMissions.includes(m.id)) {
                            unseenMissions.push(m);
                        }
                    });
                } catch (err) {
                    console.warn("getMissions for notifications failed: ", err);
                }
            }
        }
        
        // Rileva le nuove schede autore non lette
        const unseenSchede = [];
        const seenSchedeStr = localStorage.getItem('fanta_seen_schede') || '[]';
        let seenSchede = [];
        try {
            seenSchede = JSON.parse(seenSchedeStr);
        } catch(e) {
            seenSchede = [];
        }
        
        // Raccogli tutte le schede revealed in tutte le modalità attive
        if (typeof GAME_MODES !== 'undefined') {
            Object.keys(GAME_MODES).forEach(modeKey => {
                const modeCfg = GAME_MODES[modeKey];
                if (modeCfg && modeCfg.authors) {
                    modeCfg.authors.forEach(author => {
                        if (author.isSchedaRevealed && !seenSchede.includes(author.id)) {
                            // Evita duplicati se lo stesso autore è in più modalità
                            if (!unseenSchede.find(x => x.id === author.id)) {
                                unseenSchede.push({
                                    id: author.id,
                                    name: author.name,
                                    modeLabel: modeCfg.label,
                                    modeKey: modeKey,
                                    image: author.image,
                                    schedaHTML: !!author.schedaHTML
                                });
                            }
                        }
                    });
                }
            });
        }
        
        const totalNotifications = pendingInvites.length + unseenSchede.length + pendingMissions.length + unseenMissions.length;
        
        // Aggiorna Badge Campanella
        if(badge) {
            if(totalNotifications > 0) {
                badge.textContent = totalNotifications;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }

        // Aggiorna Badge Tab Profilo
        const tabBadge = document.getElementById('tab-notification-badge');
        if(tabBadge) {
            if(totalNotifications > 0) {
                tabBadge.style.display = 'block';
            } else {
                tabBadge.style.display = 'none';
            }
        }
        
        if(list) {
            list.innerHTML = '';
            if(totalNotifications === 0) {
                list.innerHTML = '<i style="display:block; text-align:center; padding:15px 0;">Nessuna nuova notifica.</i>';
                return;
            }
            
            // 1. Mostra gli inviti ai tornei
            if (pendingInvites.length > 0) {
                const tourneys = await fanta_db.getTournaments();
                pendingInvites.forEach(inv => {
                    let t = tourneys.find(x => x.id === inv.tournamentId);
                    let tName = t ? t.name : "Torneo Sconosciuto";
                    
                    list.innerHTML += `
                        <div style="background:rgba(255,193,7,0.1); padding:12px; border-radius:8px; border-left:3px solid #ffc107; font-size:0.85rem; margin-bottom:10px;">
                            <p style="margin:0 0 10px 0;"><b>${inv.fromEmail}</b> ti ha invitato al torneo <b>${tName}</b>.</p>
                            <div style="display:flex; gap:10px;">
                                <button class="btn" style="padding:5px 12px; font-size:0.75rem; width:auto; background:var(--primary-color);" onclick="document.getElementById('notifiche-modal').style.display='none'; openJoinTorneoModal('${inv.tournamentId}', '${inv.id}')">Accetta e Iscrivi Squadre</button>
                                <button class="btn btn-secondary" style="padding:5px 12px; font-size:0.75rem; width:auto;" onclick="rifiutaInvito('${inv.id}')">Rifiuta</button>
                            </div>
                        </div>
                    `;
                });
            }
            
            // 2. Mostra le nuove schede autore pubblicate
            unseenSchede.forEach(item => {
                let actionAttr = '';
                let actionBtn = '';
                if (item.schedaHTML) {
                    actionAttr = `onclick="document.getElementById('notifiche-modal').style.display='none'; segnaSchedaComeVisto('${item.id}'); openAuthorSchedaModal('${item.id}', '${item.modeKey}')"`;
                    actionBtn = `<button class="btn" style="padding:5px 12px; font-size:0.75rem; width:auto; background:var(--primary-color);">Apri Scheda</button>`;
                } else {
                    actionAttr = `onclick="document.getElementById('notifiche-modal').style.display='none'; segnaSchedaComeVisto('${item.id}'); window.open('schede/${item.id}.pdf', '_blank')"`;
                    actionBtn = `<button class="btn" style="padding:5px 12px; font-size:0.75rem; width:auto; background:var(--primary-color);"><i class="fa-solid fa-file-pdf"></i> Apri PDF</button>`;
                }
                
                list.innerHTML += `
                    <div style="background:rgba(141, 160, 63, 0.1); padding:12px; border-radius:8px; border-left:3px solid var(--primary-color); font-size:0.85rem; margin-bottom:10px;">
                        <p style="margin:0 0 10px 0;">🔔 <b>Nuova Scheda!</b> È stata pubblicata la scheda di <b>${item.name}</b> in <i>${item.modeLabel}</i>.</p>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <div ${actionAttr} style="display:inline-block;">
                                ${actionBtn}
                            </div>
                            <button class="btn btn-secondary" style="padding:5px 12px; font-size:0.75rem; width:auto;" onclick="segnaSchedaComeVisto('${item.id}')"><i class="fa-solid fa-check"></i> Letta</button>
                        </div>
                    </div>
                `;
            });

            // 3. Mostra le missioni in attesa per l'admin
            if (currentUserEmail === 'prof.memmo@gmail.com' && pendingMissions.length > 0) {
                const allTeams = await fanta_db.getTeams();
                pendingMissions.forEach(m => {
                    const t = allTeams.find(x => x.id === m.teamId);
                    const teamName = t ? t.name : 'Squadra Sconosciuta';
                    list.innerHTML += `
                        <div style="background:rgba(245, 197, 60, 0.1); padding:12px; border-radius:8px; border-left:3px solid var(--accent-gold); font-size:0.85rem; margin-bottom:10px;">
                            <p style="margin:0 0 10px 0;">🚀 <b>Nuova Missione!</b> La squadra <b>${teamName}</b> ha caricato la missione: "<i>${m.titolo}</i>"</p>
                            <div style="display:flex; gap:10px;">
                                <button class="btn" style="padding:5px 12px; font-size:0.75rem; width:auto; background:var(--accent-gold); color:var(--bg-dark);" onclick="document.getElementById('notifiche-modal').style.display='none'; window.approvaMissioneDaNotifica('${m.id}', '${m.teamId}')">Approva</button>
                                <button class="btn btn-secondary" style="padding:5px 12px; font-size:0.75rem; width:auto;" onclick="document.getElementById('notifiche-modal').style.display='none'; window.rifiutaMissioneDaNotifica('${m.id}')">Rifiuta</button>
                            </div>
                        </div>
                    `;
                });
            }

            // 4. Mostra le notifiche di convalida/rifiuto missioni per il docente/fantamico
            if (currentUserEmail !== 'prof.memmo@gmail.com' && unseenMissions.length > 0) {
                unseenMissions.forEach(m => {
                    const t = allTeams.find(x => x.id === m.teamId);
                    const teamName = t ? t.name : 'Squadra Sconosciuta';
                    const isApproved = m.status === 'approved';
                    const bg = isApproved ? 'rgba(141, 160, 63, 0.1)' : 'rgba(230, 57, 70, 0.1)';
                    const border = isApproved ? 'var(--primary-color)' : '#e63946';
                    const titleText = isApproved 
                        ? `✅ <b>Missione Convalidata!</b> La missione "<i>${m.titolo}</i>" per la squadra <b>${teamName}</b> è stata approvata! (+5 punti)` 
                        : `❌ <b>Missione Respinta!</b> La missione "<i>${m.titolo}</i>" per la squadra <b>${teamName}</b> non è stata approvata.`;
                    
                    list.innerHTML += `
                        <div style="background:${bg}; padding:12px; border-radius:8px; border-left:3px solid ${border}; font-size:0.85rem; margin-bottom:10px;">
                            <p style="margin:0 0 10px 0;">${titleText}</p>
                            <button class="btn btn-secondary" style="padding:5px 12px; font-size:0.75rem; width:auto;" onclick="window.segnaMissioneNotificaVisto('${m.id}')"><i class="fa-solid fa-check"></i> Ho capito</button>
                        </div>
                    `;
                });
            }
        }
    } catch (e) {
        console.error("Errore caricamento notifiche:", e);
        if(list) list.innerHTML = '<i>Errore nel caricamento delle notifiche.</i>';
    }
}

window.segnaSchedaComeVisto = function(authorId) {
    const seenSchedeStr = localStorage.getItem('fanta_seen_schede') || '[]';
    let seenSchede = [];
    try {
        seenSchede = JSON.parse(seenSchedeStr);
    } catch(e) {
        seenSchede = [];
    }
    if(!seenSchede.includes(authorId)) {
        seenSchede.push(authorId);
        localStorage.setItem('fanta_seen_schede', JSON.stringify(seenSchede));
    }
    renderNotifiche();
    if(typeof populateSchede === 'function') populateSchede();
};

window.resetNotificheLette = function() {
    localStorage.removeItem('fanta_seen_schede');
    alert("Notifiche resettate con successo! Ora le schede pubblicate verranno mostrate di nuovo come non lette.");
    renderNotifiche();
    if(typeof populateSchede === 'function') populateSchede();
};

window.segnaTuttiAutoriRivelatiComeVisti = function() {
    const seenSchedeStr = localStorage.getItem('fanta_seen_schede') || '[]';
    let seenSchede = [];
    try {
        seenSchede = JSON.parse(seenSchedeStr);
    } catch(e) {
        seenSchede = [];
    }
    
    let updated = false;
    if (typeof GAME_MODES !== 'undefined') {
        Object.keys(GAME_MODES).forEach(modeKey => {
            const modeCfg = GAME_MODES[modeKey];
            if (modeCfg && modeCfg.authors) {
                modeCfg.authors.forEach(a => {
                    if (a.isSchedaRevealed && !seenSchede.includes(a.id)) {
                        seenSchede.push(a.id);
                        updated = true;
                    }
                });
            }
        });
    }
    
    if (updated) {
        localStorage.setItem('fanta_seen_schede', JSON.stringify(seenSchede));
        renderNotifiche();
    }
};

window.approvaMissioneDaNotifica = async function(mid, tid) {
    if(typeof window.approvaMissione === 'function') {
        await window.approvaMissione(mid, tid);
        if (typeof renderNotifiche === 'function') renderNotifiche();
    }
};

window.rifiutaMissioneDaNotifica = async function(mid) {
    if(typeof window.rifiutaMissione === 'function') {
        await window.rifiutaMissione(mid);
        if (typeof renderNotifiche === 'function') renderNotifiche();
    }
};

window.segnaMissioneNotificaVisto = function(mid) {
    const seenMissionsStr = localStorage.getItem('fanta_seen_missions') || '[]';
    let seenMissions = [];
    try {
        seenMissions = JSON.parse(seenMissionsStr);
    } catch(e) {
        seenMissions = [];
    }
    if(!seenMissions.includes(mid)) {
        seenMissions.push(mid);
        localStorage.setItem('fanta_seen_missions', JSON.stringify(seenMissions));
    }
    renderNotifiche();
    if(typeof renderProfilo === 'function') renderProfilo();
};

window.segnaTutteNotificheComeLette = async function() {
    // 1. Segna tutti gli autori rivelati come letti
    if (typeof window.segnaTuttiAutoriRivelatiComeVisti === 'function') {
        window.segnaTuttiAutoriRivelatiComeVisti();
    }

    // 2. Segna tutte le missioni convalidate/rifiutate come lette
    if (currentUserEmail && currentUserEmail !== 'prof.memmo@gmail.com') {
        try {
            const allTeams = await fanta_db.getTeams();
            const myTeams = allTeams.filter(t => t.ownerEmail === currentUserEmail);
            const myTeamIds = myTeams.map(t => t.id);
            let collabTeams = [];
            try {
                collabTeams = await fanta_db.getCollaboratedTeams(currentUserEmail);
            } catch(e) {}
            const allMyTeamIds = [...myTeamIds, ...collabTeams.map(t => t.id)];

            if (allMyTeamIds.length > 0) {
                const snap = await window.db.collection("missions")
                    .where("teamId", "in", allMyTeamIds.slice(0, 30))
                    .get();
                const myMissions = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(m => m.status === 'approved' || m.status === 'rejected');
                
                const seenMissionsStr = localStorage.getItem('fanta_seen_missions') || '[]';
                let seenMissions = [];
                try {
                    seenMissions = JSON.parse(seenMissionsStr);
                } catch(e) {
                    seenMissions = [];
                }
                
                myMissions.forEach(m => {
                    if (!seenMissions.includes(m.id)) {
                        seenMissions.push(m.id);
                    }
                });
                localStorage.setItem('fanta_seen_missions', JSON.stringify(seenMissions));
            }
        } catch (e) {
            console.error("Errore segna tutte come lette:", e);
        }
    }

    renderNotifiche();
    if(typeof renderProfilo === 'function') renderProfilo();
};

window.apriNotificheModal = function() {
    const modal = document.getElementById('notifiche-modal');
    if (modal) {
        modal.style.display = 'flex';
        renderNotifiche();
    }
};

async function openTorneoModal() {
    const modal = document.getElementById('torneo-modal');
    if(!modal) return;
    
    const checkboxes = document.getElementById('torneo-squadre-checkboxes');
    checkboxes.innerHTML = '<p class="text-center">Caricamento squadre...</p>';
    
    const myTeams = (await getAllTeams()).filter(t => t.ownerEmail === currentUserEmail);
    
    checkboxes.innerHTML = '';
    if(myTeams.length < 2) {
        checkboxes.innerHTML = '<p class="text-danger">Devi creare almeno 2 squadre per organizzare un torneo privato!</p>';
    } else {
        myTeams.forEach(team => {
            checkboxes.innerHTML += `
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                    <input type="checkbox" class="torneo-team-chk" value="${team.id}" style="width:16px; height:16px;">
                    <span style="font-size:1rem;">${team.name}</span>
                </label>
            `;
        });
    }
    
    document.getElementById('torneo-nome-input').value = '';
    modal.style.display = 'block';
}

async function creaTorneo(event) {
    if(event) event.preventDefault();
    const nome = document.getElementById('torneo-nome-input').value.trim();
    if(!nome) { alert("Inserisci il nome del torneo."); return; }
    
    const selectedIds = Array.from(document.querySelectorAll('.torneo-team-chk:checked')).map(chk => chk.value);
    if(selectedIds.length < 2) { alert("Seleziona almeno 2 squadre per creare il torneo."); return; }
    
    try {
        await fanta_db.saveTournament({
            name: nome,
            ownerEmail: currentUserEmail,
            teams: selectedIds
        });
        
        document.getElementById('torneo-modal').style.display = 'none';
        renderTornei();
    } catch (e) {
        console.error("Errore creazione torneo:", e);
        alert("Errore durante la creazione del torneo.");
    }
}

async function openJoinTorneoModal(tourId, inviteId) {
    const modal = document.getElementById('join-torneo-modal');
    if(!modal) return;
    
    document.getElementById('join-torneo-id').value = tourId;
    document.getElementById('join-invite-id').value = inviteId;
    
    const checkboxes = document.getElementById('join-torneo-squadre');
    checkboxes.innerHTML = '<p class="text-center">Caricamento squadre...</p>';
    
    const myTeams = (await getAllTeams()).filter(t => t.ownerEmail === currentUserEmail);
    
    checkboxes.innerHTML = '';
    if(myTeams.length === 0) {
        checkboxes.innerHTML = '<p class="text-danger">Non hai ancora creato squadre!</p>';
    } else {
        myTeams.forEach(team => {
            checkboxes.innerHTML += `
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                    <input type="checkbox" class="join-team-chk" value="${team.id}" style="width:16px; height:16px;">
                    <span style="font-size:1rem;">${team.name}</span>
                </label>
            `;
        });
    }
    modal.style.display = 'block';
}

async function joinTorneo(event) {
    if(event) event.preventDefault();
    const tourId = document.getElementById('join-torneo-id').value;
    const invId = document.getElementById('join-invite-id').value;
    
    try {
        const tourneys = await fanta_db.getTournaments();
        const tournament = tourneys.find(t => t.id === tourId);
        if(!tournament) { alert("Torneo non trovato."); return; }
        
        const selectedIds = Array.from(document.querySelectorAll('.join-team-chk:checked')).map(chk => chk.value);
        if(selectedIds.length === 0) { alert("Seleziona almeno una tua squadra da iscrivere."); return; }
        
        const updatedTeams = [...new Set([...(tournament.teams || []), ...selectedIds])];
        await window.db.collection("tournaments").doc(tourId).update({ teams: updatedTeams });
        await fanta_db.updateInviteStatus(invId, 'accepted');
        
        document.getElementById('join-torneo-modal').style.display = 'none';
        alert("Squadre iscritte con successo!");
        renderProfilo(); 
    } catch (e) {
        console.error("Errore partecipazione torneo:", e);
        alert("Errore durante la partecipazione al torneo.");
    }
}

async function rifiutaInvito(invId) {
    if(!confirm("Vuoi rimuovere questo invito?")) return;
    try {
        await fanta_db.deleteInvite(invId);
        renderProfilo();
    } catch (e) {
        console.error("Errore rifiuto invito:", e);
    }
}

async function shareInvite(options = {}) {
    // options: { type: 'general'|'tournament'|'student', tourId, code, teamName }
    const appUrl = window.location.origin + window.location.pathname;
    let shareTitle = "Fantaletteratura";
    let shareText = "Partecipa anche tu a Fantaletteratura, la sfida tra capolavori della letteratura!";
    
    if (options.type === 'student') {
        shareTitle = `Unisciti alla squadra ${options.teamName}`;
        shareText = `Ciao! Unisciti alla mia squadra ${options.teamName} su Fantaletteratura. \nUsa il codice: ${options.code}\nEntra qui: ${appUrl}`;
    } else if (options.type === 'tournament') {
        shareTitle = "Invito al Torneo";
        shareText = `Partecipa al mio torneo privato su Fantaletteratura! Iscrivi le tue squadre usando questo link: ${appUrl}`;
    }

    // Se disponibile API di sistema (Mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: shareTitle,
                text: shareText,
                url: appUrl
            });
            return;
        } catch (err) {
            console.log("Share API fallita o annullata", err);
        }
    }

    // Fallback: Modale Custom (Desktop)
    const modal = document.getElementById('share-modal');
    if (!modal) return;

    document.getElementById('share-modal-title').textContent = shareTitle;
    document.getElementById('share-modal-desc').textContent = shareText;

    // Configura i link
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(appUrl);

    document.getElementById('share-wa').href = `https://wa.me/?text=${encodedText}`;
    document.getElementById('share-classroom').href = `https://classroom.google.com/u/0/share?url=${encodedUrl}`;
    document.getElementById('share-teams').href = `https://teams.microsoft.com/share?href=${encodedUrl}&msgText=${encodedText}`;
    
    window.currentShareText = shareText; // Per copia link
    modal.style.display = 'block';
}

function copyShareLink() {
    const textToCopy = window.currentShareText || "Fantaletteratura: " + window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Link e messaggio copiati negli appunti!");
    });
}

function openInviteModal(tourId) {
    shareInvite({ type: tourId ? 'tournament' : 'general', tourId: tourId });
}

async function inviaInvitoTorneo(event) {
    if(event) event.preventDefault();
    const tourId = document.getElementById('invite-torneo-id').value;
    const targetEmail = document.getElementById('invite-collega-email').value.trim();
    
    if(!targetEmail) { alert("Inserisci l'email!"); return; }
    if(targetEmail === currentUserEmail) { alert("Non puoi autoinvitarti!"); return; }

    const isGeneral = !tourId;
    
    try {
        const requests = await fanta_db.getTeacherRequests();
        const snapshotUsers = await window.db.collection("users").where("email", "==", targetEmail).get();
        const isRegistered = !snapshotUsers.empty;

        if(!isRegistered) {
            const subject = encodeURIComponent("Benvenuto in Fantaletteratura!");
            let bodyPlain = `Ciao! \n\nHai ricevuto un invito a partecipare a Fantaletteratura, la sfida tra capolavori! \n\n` +
                `Fantaletteratura è un gioco didattico dove classi e studenti creano squadre di autori letterari per sfidarsi a colpi di missioni e punteggi. \n\n`;
                
            if (isGeneral) {
                bodyPlain += `Un tuo collega ti ha appena invitato a iscriverti come docente. Accedi subito per registrare la tua classe e iniziare la sfida!\n\n`;
            } else {
                bodyPlain += `Un tuo collega ti ha appena invitato ad un torneo privato. Accedi subito per registrare la tua classe e iniziare la sfida!\n\n`;
            }
            
            bodyPlain += `Puoi accedere qui: ${window.location.origin}${window.location.pathname}\n\nBuona fortuna!`;
            
            const body = encodeURIComponent(bodyPlain);
            window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        }
        
        await fanta_db.saveInvite({
            tournamentId: tourId || 'general',
            fromEmail: currentUserEmail,
            toEmail: targetEmail
        });
        
        document.getElementById('invite-torneo-modal').style.display = 'none';
        alert(isGeneral ? "Invito generico spedito!" : "Invito al torneo spedito!");
    } catch (e) {
        console.error("Errore invio invito:", e);
        alert("Errore durante l'invio dell'invito.");
    }
}

async function renderTornei() {
    const tourneysList = document.getElementById('profilo-tornei-list');
    if(!tourneysList || !currentUserEmail) return;
    
    tourneysList.innerHTML = '<p class="text-center">Caricamento tornei...</p>';
    
    try {
        const tourneys = await fanta_db.getTournaments();
        const allTeams = await fanta_db.getTeams();
        const myTeamsIds = allTeams.filter(t => t.ownerEmail === currentUserEmail).map(t => t.id);

        // Mostra il torneo se il docente lo ha creato O se ci ha iscritto delle sue squadre
        let myTourneys = tourneys.filter(t => {
            return t.ownerEmail === currentUserEmail || (t.teams && t.teams.some(teamId => myTeamsIds.includes(teamId)));
        });
        
        tourneysList.innerHTML = '';
        if(myTourneys.length === 0) {
            tourneysList.innerHTML = '<i>Nessun torneo. Creane uno o unisciti tramite invito.</i>';
            return;
        }
        
        myTourneys.forEach(tour => {
            let calculated = (tour.teams || []).map(tid => {
                let tObj = allTeams.find(x => x.id === tid);
                if(!tObj) return null;
                let authPts = 0;
                const teamMode = tObj.mode || 'terze';
                const modeCfg = GAME_MODES[teamMode] || GAME_MODES.terze;
                const pool = modeCfg.authors || AUTHORS;

                tObj.authors.forEach(aid => {
                    let a = pool.find(x => x.id === aid);
                    if(a && a.isPointsRevealed) authPts += a.points;
                });
                return {
                    team: tObj.name,
                    totale: authPts + ((tObj.missionsCompleted || 0) * 5)
                };
            }).filter(x => x !== null);
            
            calculated.sort((a,b) => b.totale - a.totale);
            
            let rankHtml = calculated.map((item, idx) => `
                <div style="display:flex; justify-content:space-between; font-size:0.9rem; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                    <span>${idx+1}. ${item.team}</span>
                    <span class="text-primary" style="font-weight:bold">${item.totale} pt</span>
                </div>
            `).join('');
            
            let btnInvita = `<button class="btn btn-secondary" style="font-size:0.75rem; padding:4px 8px; width:auto; float:right;" onclick="openInviteModal('${tour.id}')"><i class="fa-solid fa-paper-plane"></i> Invita Collega</button>`;

            tourneysList.innerHTML += `
                <div style="background:rgba(255,255,255,0.05); padding:10px 15px; border-radius:8px; border-left:3px solid var(--primary-color); margin-bottom:15px;">
                    ${btnInvita}
                    <div style="font-weight:bold; font-size:1.1rem; margin-bottom:10px; color:var(--primary-color);"> <i class="fa-solid fa-trophy"></i> ${tour.name}</div>
                    ${rankHtml}
                </div>
            `;
        });
    } catch (e) {
        console.error("Errore caricamento tornei:", e);
        tourneysList.innerHTML = '<i>Errore nel caricamento dei tornei.</i>';
    }
}

/* =========================================
   MISSIONI (USER SIDE)
========================================= */

async function renderMissioniUtente() {
    if(!currentUserEmail) return;
    
    // 1. Popola la select delle squadre nel modale
    const select = document.getElementById('missione-squadra-select');
    const allTeams = await getAllTeams();
    const myTeams = allTeams.filter(t => t.ownerEmail === currentUserEmail);
    
    if(select) {
        select.innerHTML = '<option value="">-- Seleziona una squadra --</option>';
        myTeams.forEach(t => {
            select.innerHTML += `<option value="${t.id}">${t.name} (${t.classe})</option>`;
        });
    }
    
    // 2. Render missioni in attesa (pending) per le squadre dell'utente loggato
    const list = document.getElementById('missioni-pending-list');
    if(list) {
        list.innerHTML = '';
        const pending = await fanta_db.getPendingMissions();
        const myTeamsIds = myTeams.map(t => t.id);
        const myPending = pending.filter(m => myTeamsIds.includes(m.teamId));
        
        if(myPending.length === 0) {
            list.innerHTML = '<div class="glass" style="padding:15px; text-align:center; color:var(--text-muted); font-size:0.85rem;"><i>Nessuna missione in coda. Inviandone una apparirà qui!</i></div>';
        } else {
            myPending.forEach(m => {
                let teamObj = myTeams.find(t => t.id === m.teamId);
                let teamName = teamObj ? teamObj.name : "Squadra Sconosciuta";
                list.innerHTML += `
                    <div class="glass" style="padding:15px; margin-bottom:10px; border-left:4px solid #f5c53c; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div style="font-weight:bold; font-size:1rem; margin-bottom:2px;">${m.titolo}</div>
                            <div style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-users"></i> ${teamName}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:0.65rem; color:#f5c53c; font-weight:800; text-transform:uppercase; background:rgba(212, 175, 55, 0.1); padding:4px 8px; border-radius:10px; border:1px solid rgba(212, 175, 55, 0.2);">
                                <i class="fa-solid fa-clock"></i> In attesa
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    }
}

function openNuovaMissioneModal() {
    const modal = document.getElementById('nuova-missione-modal');
    if(modal) {
        modal.style.display = 'block';
        renderMissioniUtente(); // Popola/Aggiorna select
    }
}

async function inviaMissione(event) {
    if(event) event.preventDefault();
    const select = document.getElementById('missione-squadra-select');
    const input = document.getElementById('missione-titolo-input');
    
    if(!select || !input) return;
    
    if(!select.value) { alert("Seleziona la squadra che ha svolto l'attività!"); return; }
    if(!input.value.trim()) { alert("Inserisci una breve descrizione della missione svolta!"); return; }
    
    const missionData = {
        teamId: select.value,
        titolo: input.value.trim(),
        ownerEmail: currentUserEmail
    };

    try {
        await fanta_db.saveMission(missionData);
        alert("Missione inviata! Riceverai 5 punti sulla classifica missioni non appena il Game Master l'avrà verificata.");
        
        // Reset form e chiudi modale
        input.value = "";
        document.getElementById('nuova-missione-modal').style.display = 'none';
        
        await renderMissioniUtente();
    } catch (e) {
        console.error("Errore invio missione:", e);
        alert("Errore durante l'invio della missione.");
    }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CINEMATIC PRESENTATION SYSTEM (LIM)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let presSlides = [];
let presCurrentIndex = 0;
let presLeaderboardRevealIndex = 0;
let presAuthorBonusIndex = 0;

window.initPresentazioniTab = async function() {
    await window.aggiornaCampiPresentazione();
    
    // Carica i tornei e popolali nella griglia
    const torneiContainer = document.getElementById('pres-tornei-container');
    if (torneiContainer) {
        torneiContainer.innerHTML = '<div class="glass" style="padding:10px; text-align:center; color:var(--text-muted); grid-column:1/-1;"><i class="fa-solid fa-spinner fa-spin"></i> Caricamento tornei...</div>';
        
        try {
            const tuttiTornei = await window.fanta_db.getTournaments();
            const tutteSquadre = await window.fanta_db.getTeams();
            
            // Determina le squadre associate a questo utente
            const currentUserEmail = firebase.auth().currentUser ? firebase.auth().currentUser.email : null;
            const isAdmin = currentUserEmail === 'prof.memmo@gmail.com';
            
            let myTeamIds = [];
            if (!isAdmin && currentUserEmail) {
                myTeamIds = tutteSquadre.filter(t => t.createdBy === currentUserEmail || (t.collaborators && t.collaborators.includes(currentUserEmail))).map(t => t.id);
            }
            
            // Filtra i tornei: admin vede tutti, docenti vedono tornei in cui c'è almeno una loro squadra (o creati da loro)
            const torneiMostrati = tuttiTornei.filter(t => {
                if (isAdmin) return true;
                if (t.createdBy === currentUserEmail) return true;
                if (!t.teams) return false;
                return t.teams.some(teamId => myTeamIds.includes(teamId));
            });
            
            if (torneiMostrati.length === 0) {
                torneiContainer.innerHTML = '<div class="glass" style="padding:10px; text-align:center; color:var(--text-muted); grid-column:1/-1;">Nessun torneo interno disponibile.</div>';
                return;
            }
            
            torneiContainer.innerHTML = '';
            torneiMostrati.forEach(t => {
                const numSquadre = (t.teams || []).length;
                const div = document.createElement('div');
                div.className = 'pres-card';
                div.setAttribute('data-type', 'torneo');
                div.setAttribute('data-value', t.id);
                div.onclick = function() { window.togglePresOption(this); };
                
                div.innerHTML = `
                    <div class="pres-card-icon"><i class="fa-solid fa-trophy"></i></div>
                    <div class="pres-card-title">${t.name}</div>
                    <div class="pres-card-desc">${numSquadre} squadre iscritte</div>
                `;
                torneiContainer.appendChild(div);
            });
            
        } catch (error) {
            console.error("Errore nel caricamento dei tornei per le presentazioni:", error);
            torneiContainer.innerHTML = '<div class="glass" style="padding:10px; text-align:center; color:#e74c3c; grid-column:1/-1;">Errore nel caricamento tornei.</div>';
        }
    }
};

window.selectPresOption = function(element) {
    const type = element.getAttribute('data-type');
    const cards = element.parentNode.querySelectorAll(`.pres-card[data-type="${type}"]`);
    cards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    window.aggiornaCampiPresentazione();
};

window.togglePresOption = function(element) {
    element.classList.toggle('active');
    window.aggiornaCampiPresentazione();
};

window.aggiornaCampiPresentazione = async function() {
    const selectedCamps = Array.from(document.querySelectorAll('.pres-card[data-type="campionato"].active')).map(el => el.getAttribute('data-value'));
    
    // Aggiorna contenitore Autori
    const autoriContainer = document.getElementById('pres-autori-container');
    if (autoriContainer) {
        autoriContainer.innerHTML = '';
        
        if (selectedCamps.length > 0) {
            selectedCamps.forEach(camp => {
                const modeCfg = GAME_MODES[camp] || GAME_MODES.terze;
                const pool = modeCfg.authors || AUTHORS;
                
                // Intestazione gruppo campionato
                const header = document.createElement('div');
                header.style.gridColumn = '1 / -1';
                header.style.fontWeight = '800';
                header.style.color = 'var(--primary-color)';
                header.style.marginTop = '12px';
                header.style.marginBottom = '6px';
                header.style.fontSize = '0.9rem';
                header.style.borderBottom = '1px solid rgba(141, 160, 63, 0.25)';
                header.style.paddingBottom = '3px';
                header.textContent = (modeCfg.label || modeCfg.shortLabel || camp).toUpperCase();
                autoriContainer.appendChild(header);
                
                pool.forEach(a => {
                    const label = document.createElement('label');
                    label.className = 'checkbox-container';
                    label.style.paddingLeft = '30px';
                    label.style.marginBottom = '8px';
                    label.style.fontSize = '0.85rem';
                    
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = 'pres-autori';
                    input.value = `${camp}:${a.id}`;
                    // Spuntato se la scheda è già uscita nel campionato
                    input.checked = !!a.isSchedaRevealed;
                    
                    const span = document.createElement('span');
                    span.className = 'checkmark';
                    span.style.top = '1px';
                    span.style.height = '18px';
                    span.style.width = '18px';
                    
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(a.name));
                    label.appendChild(span);
                    autoriContainer.appendChild(label);
                });
            });
        } else {
            autoriContainer.innerHTML = '<div style="color: var(--text-muted); font-size:0.85rem; padding: 5px;">Seleziona almeno un campionato per visualizzare gli autori.</div>';
        }
    }
};

window.gestisciAugurioCustom = function(val) {
    const customInput = document.getElementById('pres-augurio-custom');
    if (!customInput) return;
    if (val === 'custom') {
        customInput.style.display = 'block';
    } else {
        customInput.style.display = 'none';
    }
};

window.avviaPresentazioneLIM = async function() {
    const selectedCamps = Array.from(document.querySelectorAll('.pres-card[data-type="campionato"].active')).map(el => el.getAttribute('data-value'));
    const selectedClassifiche = Array.from(document.querySelectorAll('.pres-card[data-type="classifica"].active')).map(el => el.getAttribute('data-value'));
    const selectedTipo = document.querySelector('.pres-card[data-type="tipo"].active') ? document.querySelector('.pres-card[data-type="tipo"].active').getAttribute('data-value') : 'intermedia';
    const customGreetingSelect = document.getElementById('pres-augurio-select').value;
    
    if (selectedCamps.length === 0) {
        alert("Seleziona almeno un campionato / girone da includere nella presentazione!");
        return;
    }
    
    if (selectedClassifiche.length === 0) {
        alert("Seleziona almeno una classifica da mostrare!");
        return;
    }
    
    let augurioVal = customGreetingSelect;
    if (customGreetingSelect === 'custom') {
        augurioVal = document.getElementById('pres-augurio-custom').value.trim() || "Buon anno scolastico!";
    }
    augurioVal = augurioVal.toUpperCase();
    
    document.body.style.overflow = 'hidden';
    
    const overlay = document.getElementById('presentation-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
    
    const bgVideo = document.getElementById('pres-bg-video');
    const bgImage = document.getElementById('pres-bg-image');
    if (bgVideo) {
        bgVideo.src = 'Sfondi e animazioni/Video 1.mp4';
        bgVideo.style.display = 'block';
        bgVideo.play().catch(e => {
            console.log("Autoplay video bloccato, uso immagine statica:", e);
            bgVideo.style.display = 'none';
            if (bgImage) {
                bgImage.style.backgroundImage = "url('Sfondi e animazioni/sfondo 1.png')";
                bgImage.style.display = 'block';
            }
        });
    }
    
    presSlides = [];
    presCurrentIndex = 0;
    
    try {
        const tourneys = await window.fanta_db.getTournaments();
        const presentationTypeName = selectedTipo === 'finale' ? 'FINALE' : (selectedTipo === 'semifinale' ? 'SEMIFINALE' : 'INTERMEDIA');
        
        presSlides.push({
            type: 'intro',
            subtitle: `Fantaletteratura • PRESENTAZIONE ${presentationTypeName}`.toUpperCase(),
            text: `Benvenuti alla presentazione dei risultati di oggi!<br>Scopriamo l'andamento delle classifiche.`
        });
        

        
        // Costruisci le slide per ogni campionato spuntato in sequenza
        for (const camp of selectedCamps) {
            const modeCfg = GAME_MODES[camp] || GAME_MODES.terze;
            const pool = modeCfg.authors || AUTHORS;
            const allTeamsGlobal = await window.fanta_db.getTeams(camp);
            
            // Slide di Suspense del Girone
            presSlides.push({
                type: 'suspense',
                subtitle: `GIRONE`.toUpperCase(),
                text: (modeCfg.label || modeCfg.shortLabel || camp).toUpperCase()
            });
            
            // Aggiungi gli autori selezionati per questo girone (in ordine cronologico)
            const checkedAutori = Array.from(document.querySelectorAll('input[name="pres-autori"]:checked')).map(el => el.value);
            pool.forEach(author => {
                if (checkedAutori.includes(`${camp}:${author.id}`)) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = author.schedaHTML;
                    
                    const introText = tempDiv.querySelector('.scheda-intro') ? tempDiv.querySelector('.scheda-intro').innerText : '';
                    const listItems = tempDiv.querySelectorAll('li');
                    
                    const bonuses = Array.from(listItems).map(li => {
                        const strong = li.querySelector('strong');
                        const strongText = strong ? strong.innerText : '';
                        let desc = li.innerHTML;
                        if (strong) {
                            desc = desc.replace(strong.outerHTML, '').replace(/&rarr;/g, '→').replace(/->/g, '→').trim();
                        }
                        desc = desc.replace(/^→/, '').trim();
                        
                        let type = 'neutral';
                        if (strongText.includes('+')) type = 'positive';
                        else if (strongText.includes('-')) type = 'negative';
                        
                        return { title: strongText, desc: desc, type: type };
                    });
                    
                    presSlides.push({
                        type: 'author',
                        author: author,
                        intro: introText,
                        bonuses: bonuses,
                        totalPts: (author.isPointsRevealed || checkedAutori.includes(`${camp}:${author.id}`)) ? author.points : 0
                    });
                }
            });
            
            // Calcolo punteggi per le squadre di questo girone
            const calculatedTeams = allTeamsGlobal.map(t => {
                let authPts = 0;
                t.authors.forEach(aid => {
                    let a = pool.find(x => x.id === aid);
                    if (a && (a.isPointsRevealed || checkedAutori.includes(`${camp}:${a.id}`))) {
                        authPts += a.points;
                    }
                });
                const missPts = (t.missionsCompleted || 0) * 5;
                const totPts = authPts + missPts;
                
                return {
                    id: t.id,
                    name: t.name,
                    authPoints: authPts,
                    missPoints: missPts,
                    totPoints: totPts
                };
            });
            
            // 1. Classifica Autori
            if (selectedClassifiche.includes('autori')) {
                const sorted = [...calculatedTeams].sort((a,b) => a.authPoints - b.authPoints);
                const teamsForRank = sorted.map(t => ({ id: t.id, name: t.name, points: t.authPoints }));
                const torneoName = `CLASSIFICA AUTORI - ${(modeCfg.label || modeCfg.shortLabel || camp).toUpperCase()}`;
                
                presSlides.push({
                    type: 'suspense',
                    subtitle: `ED ORA...`,
                    text: `SCOPRIAMO LA CLASSIFICA AUTORI:<br>${(modeCfg.label || modeCfg.shortLabel || camp).toUpperCase()}`
                });
                presSlides.push({
                    type: 'leaderboard-list',
                    torneoName: torneoName,
                    teams: teamsForRank
                });
                presSlides.push({
                    type: 'podium',
                    torneoName: torneoName,
                    teams: teamsForRank
                });
            }
            
            // 2. Classifica Missioni
            if (selectedClassifiche.includes('missioni')) {
                const sorted = [...calculatedTeams].sort((a,b) => a.missPoints - b.missPoints);
                const teamsForRank = sorted.map(t => ({ id: t.id, name: t.name, points: t.missPoints }));
                const torneoName = `CLASSIFICA MISSIONI - ${(modeCfg.label || modeCfg.shortLabel || camp).toUpperCase()}`;
                
                presSlides.push({
                    type: 'suspense',
                    subtitle: `ED ORA...`,
                    text: `SCOPRIAMO LA CLASSIFICA MISSIONI:<br>${(modeCfg.label || modeCfg.shortLabel || camp).toUpperCase()}`
                });
                presSlides.push({
                    type: 'leaderboard-list',
                    torneoName: torneoName,
                    teams: teamsForRank
                });
                presSlides.push({
                    type: 'podium',
                    torneoName: torneoName,
                    teams: teamsForRank
                });
            }
            
            // 3. Classifica Globale
            if (selectedClassifiche.includes('globale')) {
                const sorted = [...calculatedTeams].sort((a,b) => a.totPoints - b.totPoints);
                const teamsForRank = sorted.map(t => ({ id: t.id, name: t.name, points: t.totPoints }));
                const torneoName = `CLASSIFICA GLOBALE - ${(modeCfg.label || modeCfg.shortLabel || camp).toUpperCase()}`;
                
                presSlides.push({
                    type: 'suspense',
                    subtitle: `ED ORA...`,
                    text: `SCOPRIAMO LA CLASSIFICA GLOBALE:<br>${(modeCfg.label || modeCfg.shortLabel || camp).toUpperCase()}`
                });
                presSlides.push({
                    type: 'leaderboard-list',
                    torneoName: torneoName,
                    teams: teamsForRank
                });
                presSlides.push({
                    type: 'podium',
                    torneoName: torneoName,
                    teams: teamsForRank
                });
            }
        }
        
        // 4. Aggiungi i Tornei Interni selezionati
        const checkedTornei = Array.from(document.querySelectorAll('.pres-card[data-type="torneo"].active')).map(el => el.getAttribute('data-value'));
        
        if (checkedTornei.length > 0) {
            const allTeams = await window.fanta_db.getTeams();
            const checkedAutori = Array.from(document.querySelectorAll('input[name="pres-autori"]:checked')).map(el => el.value);
            
            for (const tId of checkedTornei) {
                const torneo = tourneys.find(t => t.id === tId);
                if (!torneo) continue;
                
                const tournamentTeams = allTeams.filter(t => (torneo.teams || []).includes(t.id));
                const calcTTeams = tournamentTeams.map(t => {
                    const modeCfg = GAME_MODES[t.campionato] || GAME_MODES.terze;
                    const pool = modeCfg.authors || AUTHORS;
                    
                    let authPts = 0;
                    t.authors.forEach(aid => {
                        let a = pool.find(x => x.id === aid);
                        if (a && (a.isPointsRevealed || checkedAutori.includes(`${t.campionato}:${a.id}`))) {
                            authPts += a.points;
                        }
                    });
                    const missPts = (t.missionsCompleted || 0) * 5;
                    const totPts = authPts + missPts;
                    
                    return { id: t.id, name: t.name, totPoints: totPts };
                });
                
                const sorted = calcTTeams.sort((a,b) => a.totPoints - b.totPoints);
                const teamsForRank = sorted.map(t => ({ id: t.id, name: t.name, points: t.totPoints }));
                
                presSlides.push({
                    type: 'suspense',
                    subtitle: `TORNEO INTERNO`,
                    text: `SCOPRIAMO LA CLASSIFICA:<br>${torneo.name.toUpperCase()}`
                });
                presSlides.push({
                    type: 'leaderboard-list',
                    torneoName: `TORNEO INTERNO - ${torneo.name.toUpperCase()}`,
                    teams: teamsForRank
                });
                presSlides.push({
                    type: 'podium',
                    torneoName: `TORNEO INTERNO - ${torneo.name.toUpperCase()}`,
                    teams: teamsForRank
                });
            }
        }
        
        presSlides.push({
            type: 'outro',
            text: augurioVal
        });
        
        window.renderPresentationSlide();
        
        document.addEventListener('keydown', window.presKeydownHandler);
        overlay.addEventListener('click', window.presClickHandler);
        
    } catch (e) {
        console.error("Errore nell'avvio della presentazione:", e);
        alert("Errore durante l'elaborazione dei dati per la presentazione.");
        window.chiudiPresentazioneLIM();
    }
};

window.renderPresentationSlide = function() {
    const container = document.getElementById('pres-content');
    const slideNum = document.getElementById('pres-slide-num');
    if (!container || !slideNum) return;
    
    const slide = presSlides[presCurrentIndex];
    if (!slide) return;
    
    slideNum.innerText = `SLIDE ${presCurrentIndex + 1}/${presSlides.length}`;
    container.innerHTML = '';
    
    if (slide.type === 'intro' || slide.type === 'rules' || slide.type === 'premi' || slide.type === 'suspense') {
        container.innerHTML = `
            <div class="pres-slide-subtitle">${slide.subtitle}</div>
            <div class="pres-slide-text">${slide.text}</div>
        `;
    } else if (slide.type === 'author') {
        presAuthorBonusIndex = 0;
        
        const bonusesHtml = slide.bonuses.map((b, idx) => `
            <div class="pres-bonus-item ${b.type}" id="pres-bonus-${idx}" style="display: none;">
                <strong>${b.title}</strong>
                <span>${b.desc}</span>
            </div>
        `).join('');
        
        container.innerHTML = `
            <div class="pres-slide-author">
                <div class="pres-author-left">
                    <img src="${slide.author.image}" class="pres-author-avatar" onerror="this.src='avatar_autori/default.png'">
                    <div class="pres-author-name">${slide.author.name}</div>
                    <div class="pres-author-role">${slide.author.role || ''}</div>
                    <div class="pres-author-points-badge" id="pres-author-pts-badge" style="visibility: hidden;">
                        ${slide.totalPts} PUNTI
                    </div>
                </div>
                <div class="pres-author-right">
                    <div class="pres-author-intro">${slide.intro}</div>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${bonusesHtml}
                    </div>
                </div>
            </div>
        `;
    } else if (slide.type === 'leaderboard-list') {
        const teams = slide.teams || [];
        const listTeams = teams.slice(0, Math.max(0, teams.length - 3));
        presLeaderboardRevealIndex = 0;
        
        if (listTeams.length === 0) {
            setTimeout(() => window.avanzaPresentazione(), 50);
            return;
        }
        
        const rowsHtml = listTeams.map((t, idx) => {
            const rank = teams.length - idx;
            return `
                <div class="pres-leaderboard-row" id="pres-row-${idx}" style="display: none;">
                    <div class="pres-row-left">
                        <span class="pres-row-rank">#${rank}</span>
                        <span class="pres-row-name">${t.name}</span>
                    </div>
                    <span class="pres-row-points">${t.points} PT</span>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="pres-slide-subtitle">CLASSIFICA: ${slide.torneoName}</div>
            <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); text-transform: uppercase;">Dalle retrovie verso il podio...</h2>
            <div class="pres-leaderboard-list">
                ${rowsHtml}
            </div>
        `;
    } else if (slide.type === 'podium') {
        presLeaderboardRevealIndex = 0;
        
        const teams = slide.teams || [];
        const len = teams.length;
        const p3 = len >= 3 ? teams[len - 3] : { name: "Non assegnato", points: 0 };
        const p2 = len >= 2 ? teams[len - 2] : { name: "Non assegnato", points: 0 };
        const p1 = len >= 1 ? teams[len - 1] : { name: "Non assegnato", points: 0 };
        
        container.innerHTML = `
            <div class="pres-slide-subtitle">🏆 IL PODIO FINALE: ${slide.torneoName} 🏆</div>
            <div class="pres-podium-container">
                <div class="pres-podium-col p2" id="podium-p2" style="visibility: hidden;">
                    <div class="pres-podium-team-name">${p2.name}</div>
                    <div class="pres-podium-step">
                        <div class="pres-podium-num">2</div>
                        <div class="pres-podium-pts">${p2.points} PT</div>
                    </div>
                </div>
                
                <div class="pres-podium-col p1" id="podium-p1" style="visibility: hidden;">
                    <div class="pres-podium-team-name">${p1.name}</div>
                    <div class="pres-podium-step">
                        <div class="pres-podium-num">1</div>
                        <div class="pres-podium-pts">${p1.points} PT</div>
                    </div>
                </div>
                
                <div class="pres-podium-col p3" id="podium-p3" style="visibility: hidden;">
                    <div class="pres-podium-team-name">${p3.name}</div>
                    <div class="pres-podium-step">
                        <div class="pres-podium-num">3</div>
                        <div class="pres-podium-pts">${p3.points} PT</div>
                    </div>
                </div>
            </div>
        `;
    } else if (slide.type === 'outro') {
        container.innerHTML = `
            <div class="pres-slide-subtitle">FANTALETTERATURA</div>
            <div class="pres-slide-text" style="font-size: 3.5rem; color: var(--primary-color);">${slide.text}</div>
            <button class="btn" style="width: auto; margin-top: 40px; background: var(--primary-color) !important; color:#000 !important; font-weight:800;" onclick="window.chiudiPresentazioneLIM()">Chiudi Presentazione</button>
        `;
    }
};

window.avanzaPresentazione = function() {
    const slide = presSlides[presCurrentIndex];
    if (!slide) return;
    
    if (slide.type === 'author') {
        const bonusItems = document.querySelectorAll('.pres-bonus-item');
        if (presAuthorBonusIndex < bonusItems.length) {
            const item = document.getElementById(`pres-bonus-${presAuthorBonusIndex}`);
            if (item) {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.classList.add('revealed');
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 20);
            }
            presAuthorBonusIndex++;
            return; 
        } else if (presAuthorBonusIndex === bonusItems.length) {
            const badge = document.getElementById('pres-author-pts-badge');
            if (badge) {
                badge.style.visibility = 'visible';
                badge.style.animation = 'pulseGlow 1.5s infinite';
            }
            presAuthorBonusIndex++;
            return;
        }
    }
    
    if (slide.type === 'leaderboard-list') {
        const teams = slide.teams || [];
        const listTeamsCount = Math.max(0, teams.length - 3);
        if (presLeaderboardRevealIndex < listTeamsCount) {
            const row = document.getElementById(`pres-row-${presLeaderboardRevealIndex}`);
            if (row) {
                row.style.display = 'flex';
                setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
            }
            presLeaderboardRevealIndex++;
            return; 
        }
    }
    
    if (slide.type === 'podium') {
        if (presLeaderboardRevealIndex === 0) {
            const p3Col = document.getElementById('podium-p3');
            if (p3Col) p3Col.style.visibility = 'visible';
            presLeaderboardRevealIndex++;
            return;
        } else if (presLeaderboardRevealIndex === 1) {
            const p2Col = document.getElementById('podium-p2');
            if (p2Col) p2Col.style.visibility = 'visible';
            presLeaderboardRevealIndex++;
            return;
        } else if (presLeaderboardRevealIndex === 2) {
            const p1Col = document.getElementById('podium-p1');
            if (p1Col) p1Col.style.visibility = 'visible';
            
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }
            presLeaderboardRevealIndex++;
            return;
        }
    }
    
    if (presCurrentIndex < presSlides.length - 1) {
        presCurrentIndex++;
        window.renderPresentationSlide();
    } else {
        window.chiudiPresentazioneLIM();
    }
};

window.chiudiPresentazioneLIM = function() {
    document.body.style.overflow = '';
    
    const overlay = document.getElementById('presentation-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    const bgVideo = document.getElementById('pres-bg-video');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.src = '';
    }
    
    document.removeEventListener('keydown', window.presKeydownHandler);
    if (overlay) {
        overlay.removeEventListener('click', window.presClickHandler);
    }
};

window.indietroPresentazione = function() {
    const slide = presSlides[presCurrentIndex];
    if (!slide) return;
    
    if (slide.type === 'author' && presAuthorBonusIndex > 0) {
        presAuthorBonusIndex = 0;
        window.renderPresentationSlide();
        return;
    }
    
    if ((slide.type === 'leaderboard-list' || slide.type === 'podium') && presLeaderboardRevealIndex > 0) {
        presLeaderboardRevealIndex = 0;
        window.renderPresentationSlide();
        return;
    }
    
    if (presCurrentIndex > 0) {
        presCurrentIndex--;
        window.renderPresentationSlide();
    }
};

window.presKeydownHandler = function(e) {
    if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        window.avanzaPresentazione();
    } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        window.indietroPresentazione();
    } else if (e.code === 'Escape') {
        window.chiudiPresentazioneLIM();
    }
};

window.presClickHandler = function(e) {
    if (e.target.closest('.pres-close-btn') || e.target.closest('button')) return;
    window.avanzaPresentazione();
};


/* =========================================
   LOCANDINE TAB
   ========================================= */

(function() {
    let _currentPoster = 'inizio';  // poster attualmente selezionato
    let _posterImage = null;        // HTMLImageElement caricato
    let _posterLoading = false;

    const POSTER_PATHS = {
        inizio:     'assets/locandine/locandina_inizio.jpg',
        semifinali: 'assets/locandine/locandina_semifinali.jpg',
        finali:     'assets/locandine/locandina_finali.jpg'
    };

    // Apre l'overlay Locandine
    window.apriLocandine = function() {
        const overlay = document.getElementById('admin-view-locandine');
        if (!overlay) return;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Carica anteprima iniziale
        _currentPoster = 'inizio';
        _caricaImmagineEDisegna();
    };

    window.chiudiLocandine = function() {
        const overlay = document.getElementById('admin-view-locandine');
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    // Selezione della locandina (click sulle type cards)
    window.selezionaLocandina = function(el) {
        document.querySelectorAll('.locandine-type-card').forEach(c => c.classList.remove('active'));
        el.classList.add('active');
        _currentPoster = el.getAttribute('data-poster');
        _posterImage = null;
        _caricaImmagineEDisegna();
    };

    // Chiamata ad ogni modifica nei campi testo
    window.aggiornaAnteprimaLocandina = function() {
        if (_posterImage) {
            _disegna(_posterImage);
        }
    };

    // Carica l'immagine e poi disegna
    function _caricaImmagineEDisegna() {
        if (_posterLoading) return;
        _posterLoading = true;
        const canvas = document.getElementById('locandina-canvas');
        const ctx = canvas.getContext('2d');
        // Mostra placeholder loading
        canvas.width = 400; canvas.height = 566;
        ctx.fillStyle = '#1a1f10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = '18px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Caricamento...', canvas.width / 2, canvas.height / 2);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            _posterImage = img;
            _posterLoading = false;
            _disegna(img);
        };
        img.onerror = function() {
            _posterLoading = false;
            console.error('Errore caricamento immagine locandina:', POSTER_PATHS[_currentPoster]);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#1a1f10';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#e63946';
            ctx.font = '14px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Immagine non trovata', canvas.width / 2, canvas.height / 2);
        };
        img.src = POSTER_PATHS[_currentPoster] + '?v=' + Date.now();
    }

    // Disegna sul canvas: immagine + eventuale barra bianca con testo
    function _disegna(img) {
        const canvas = document.getElementById('locandina-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // 2. Raccogli i testi dai campi
        const dataVal   = (document.getElementById('locandina-data')   || {}).value  || '';
        const luogoVal  = (document.getElementById('locandina-luogo')  || {}).value  || '';
        const orarioVal = (document.getElementById('locandina-orario') || {}).value  || '';
        const noteVal   = (document.getElementById('locandina-note')   || {}).value  || '';

        const parti = [dataVal, luogoVal, orarioVal, noteVal].filter(s => s.trim() !== '');
        
        let barHeight = 0;
        if (parti.length > 0) {
            barHeight = _calcolaAltezzaBarra(ctx, parti, img.naturalWidth);
        }

        // Dimensioni del canvas = proporzioni originali dell'immagine + eventuale barra sotto
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight + barHeight;

        // 1. Disegna la locandina (usando l'altezza originaria dell'immagine)
        ctx.drawImage(img, 0, 0, canvas.width, img.naturalHeight);

        if (parti.length === 0) return; // nessun testo, fine.

        // 4. Disegna la barra bianca SOTTO la locandina
        const barY = img.naturalHeight;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, barY, canvas.width, barHeight);

        // 5. Scrivi il testo in maiuscolo, centrato, bold, colore scuro
        const fontSize = Math.round(canvas.width * 0.042); // ~42px su 1000px wide
        ctx.fillStyle = '#1a1a1a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lineH = fontSize * 1.55;
        const totalTextH = parti.length * lineH;
        const startY = barY + (barHeight - totalTextH) / 2 + lineH / 2;

        parti.forEach((riga, i) => {
            ctx.font = `800 ${fontSize}px 'Outfit', 'Arial Black', sans-serif`;
            ctx.fillText(riga.toUpperCase(), canvas.width / 2, startY + i * lineH);
        });
    }

    // Calcola altezza minima per la barra bianca
    function _calcolaAltezzaBarra(ctx, parti, canvasWidth) {
        const fontSize = Math.round(canvasWidth * 0.042);
        ctx.font = `800 ${fontSize}px 'Outfit', 'Arial Black', sans-serif`;
        const lineH  = fontSize * 1.55;
        const padding = fontSize * 1.2;
        return Math.round(parti.length * lineH + padding * 2);
    }

    // Scarica la locandina come JPEG
    window.scaricaLocandina = function() {
        const canvas = document.getElementById('locandina-canvas');
        if (!canvas) return;
        if (!_posterImage) {
            alert('Attendi il caricamento della locandina.');
            return;
        }
        // Ridisegna ad alta qualità prima del download
        _disegna(_posterImage);

        const link = document.createElement('a');
        link.download = `locandina_${_currentPoster}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
    };

})(); // fine IIFE Locandine
(function() {
    let _attestatoImage = null;
    let _logoProfImage = null;
    let _logoFantaImage = null;

    window.apriAttestati = function() {
        const overlay = document.getElementById('admin-view-attestati');
        if (!overlay) return;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        _caricaRisorseEDisegna();
    };

    window.chiudiAttestati = function() {
        const overlay = document.getElementById('admin-view-attestati');
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    function _caricaRisorseEDisegna() {
        if (!_attestatoImage) {
            _attestatoImage = new Image();
            _attestatoImage.crossOrigin = "anonymous";
            _attestatoImage.src = 'assets/locandine/attestato_bg_white.png';
            _attestatoImage.onload = () => _disegnaAttestato();
            _attestatoImage.onerror = () => {
                console.warn("Nessuno sfondo attestato trovato.");
                _disegnaAttestato();
            }
        }
        if (!_logoProfImage) {
            _logoProfImage = new Image();
            _logoProfImage.crossOrigin = "anonymous";
            _logoProfImage.src = 'assets/avatar.png';
            _logoProfImage.onload = () => _disegnaAttestato();
        }
        if (!_logoFantaImage) {
            _logoFantaImage = new Image();
            _logoFantaImage.crossOrigin = "anonymous";
            _logoFantaImage.src = 'assets/logo.png';
            _logoFantaImage.onload = () => _disegnaAttestato();
        }
        if (_attestatoImage && _logoProfImage && _logoFantaImage) {
            _disegnaAttestato();
        }
    }

    window.aggiornaAnteprimaAttestato = function() {
        _disegnaAttestato();
    };

    function _disegnaAttestato() {
        const canvas = document.getElementById('attestato-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Imposta dimensioni in base all'immagine o un default (es. 1024x1024)
        if (_attestatoImage && _attestatoImage.complete && _attestatoImage.naturalHeight !== 0) {
            canvas.width = _attestatoImage.naturalWidth;
            canvas.height = _attestatoImage.naturalHeight;
            ctx.drawImage(_attestatoImage, 0, 0, canvas.width, canvas.height);
        } else {
            canvas.width = 1024;
            canvas.height = 1024;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#f1c40f";
            ctx.lineWidth = 10;
            ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
        }

        const nome = (document.getElementById('attestato-nome') || {}).value || '';
        const campionato = (document.getElementById('attestato-campionato') || {}).value || '';
        const anno = (document.getElementById('attestato-anno') || {}).value || '';
        const classificazione = (document.getElementById('attestato-classificazione') || {}).value || '';

        // Fantaletteratura Logo top center
        let logoBottomY = 120;
        if (_logoFantaImage && _logoFantaImage.complete && _logoFantaImage.naturalHeight !== 0) {
            const logoW = 140;
            const logoH = (_logoFantaImage.height / _logoFantaImage.width) * logoW;
            const logoY = 70;
            
            ctx.save();
            ctx.globalCompositeOperation = "multiply";
            ctx.drawImage(_logoFantaImage, (canvas.width - logoW)/2, logoY, logoW, logoH);
            ctx.restore();
            
            logoBottomY = logoY + logoH;
            
            // Disegna scritta Fantaletteratura dritta
            ctx.fillStyle = "#1e1e1e";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "bold 24px Arial";
            ctx.fillText("Fantaletteratura", canvas.width / 2, logoBottomY + 25);
        }

        ctx.fillStyle = "#1e1e1e"; // Testo scuro su base bianca
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 45px Arial";
        ctx.fillText("TARGA DI RICONOSCIMENTO", canvas.width / 2, 280);

        ctx.font = "28px Arial";
        ctx.fillText("Si attesta che", canvas.width / 2, 340);

        ctx.fillStyle = "#d4af37"; // Oro leggibile su bianco
        ctx.font = "bold 55px Arial";
        if (nome) {
            ctx.fillText(nome.toUpperCase(), canvas.width / 2, 420);
        } else {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 200, 435);
            ctx.lineTo(canvas.width / 2 + 200, 435);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.stroke();
        }

        ctx.fillStyle = "#1e1e1e";
        ctx.font = "28px Arial";
        
        if (classificazione) {
            ctx.fillText("si classifica come", canvas.width / 2, 500);
            
            ctx.fillStyle = "#d4af37";
            ctx.font = "bold 45px Arial";
            ctx.fillText(classificazione.toUpperCase(), canvas.width / 2, 560);
            
            ctx.fillStyle = "#1e1e1e";
            ctx.font = "26px Arial";
            if (campionato) {
                ctx.fillText(`nel campionato: ${campionato}`, canvas.width / 2, 610);
            }
        } else {
            ctx.fillText("ha partecipato con successo a", canvas.width / 2, 500);
            
            ctx.fillStyle = "#d4af37";
            ctx.font = "bold 40px Arial";
            if (campionato) {
                ctx.fillText(campionato, canvas.width / 2, 570);
            } else {
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2 - 180, 585);
                ctx.lineTo(canvas.width / 2 + 180, 585);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                ctx.stroke();
            }
        }

        ctx.fillStyle = "#1e1e1e";
        ctx.font = "26px Arial";
        const yAnno = classificazione ? 670 : 640;
        if (anno) {
            ctx.fillText("Anno Scolastico " + anno, canvas.width / 2, yAnno);
        } else {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 100, yAnno + 15);
            ctx.lineTo(canvas.width / 2 + 100, yAnno + 15);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.stroke();
            ctx.fillText("Anno Scolastico", canvas.width / 2, yAnno - 15);
        }

        if (_logoProfImage && _logoProfImage.complete && _logoProfImage.naturalHeight !== 0) {
            const logoW = 160;
            const logoH = (_logoProfImage.height / _logoProfImage.width) * logoW;
            
            ctx.save();
            ctx.globalCompositeOperation = "multiply";
            ctx.drawImage(_logoProfImage, canvas.width - logoW - 60, canvas.height - logoH - 60, logoW, logoH);
            ctx.restore();
        }
    }

    window.scaricaAttestato = function() {
        const canvas = document.getElementById('attestato-canvas');
        if (!canvas) return;
        const link = document.createElement('a');
        const nome = (document.getElementById('attestato-nome') || {}).value || 'vuoto';
        link.download = `attestato_${nome.replace(/\s+/g, '_').toLowerCase()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
    };
})();
