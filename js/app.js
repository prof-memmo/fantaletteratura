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

    loadGameState();

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

        [...pool].sort((a,b) => a.name.localeCompare(b.name)).forEach(author => {
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

    window.renderAdminSquadre = async function(modeFilter) {
        const list = document.getElementById('admin-squadre-list');
        if (!list) return;
        list.innerHTML = '<p class="text-center">Caricamento squadre...</p>';
        
        let teams = await getAllTeams();
        if (modeFilter && modeFilter !== 'all') {
            teams = teams.filter(t => (t.mode || 'terze') === modeFilter);
        }
        
        // Carica tutti gli studenti una volta sola per efficienza
        const allUsersSnap = await window.db.collection("users").where("role", "==", "studente").get();
        const allStudents = allUsersSnap.docs.map(d => d.data());

        list.innerHTML = '';
        if (teams.length === 0) list.innerHTML = '<i>Nessuna squadra trovata.</i>';
        
        teams.forEach(t => {
            const modeInfo = t.mode ? GAME_MODES[t.mode] : null;
            const badge = modeInfo ? `<span class="mode-badge ${modeInfo.colorClass}">${modeInfo.emoji} ${modeInfo.shortLabel}</span>` : '';
            const collaboratori = (t.collaboratori || []);
            const collBadge = collaboratori.length > 0
                ? `<span style="font-size:0.7rem; color:var(--accent-gold);"><i class="fa-solid fa-users-gear"></i> ${collaboratori.length} collaboratore/i</span>`
                : '';

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
                <div class="glass" style="padding:12px; margin-bottom:8px; border-radius:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                        <div>
                            <strong>${t.name}</strong> ${badge}<br>
                            <small style="color:var(--text-muted);">${t.ownerEmail || 'N/D'} &mdash; ${t.classe || ''}</small><br>
                            ${collBadge}
                        </div>
                        <div style="display:flex; gap:6px; flex-shrink:0;">
                            <button class="btn btn-secondary" title="Gestisci Collaboratori" style="padding:4px 8px; font-size:0.75rem; width:auto; background:rgba(141,160,63,0.15); border-color:var(--primary-color);"
                                onclick="apriCollaboratori('${t.id}', '${t.name}', ${JSON.stringify(collaboratori).replace(/"/g, '&quot;')})">
                                <i class="fa-solid fa-user-plus"></i>
                            </button>
                            <button class="btn btn-secondary text-danger" style="padding:4px 8px; font-size:0.75rem; width:auto; background:transparent;" onclick="eliminaSquadra('${t.id}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <details style="margin-top:4px;">
                        <summary style="font-size:0.8rem; cursor:pointer; color:var(--text-muted); user-select:none;">
                            <i class="fa-solid fa-users"></i> Studenti (${studentiDiQuesta.length})
                        </summary>
                        <div style="margin-top:8px; padding-left:4px;">
                            ${studentiHtml}
                        </div>
                    </details>
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
            window.renderAdminSquadre();
        } catch (e) {
            console.error(e);
            alert('Errore durante lo spostamento: ' + e.message);
        }
    };

    // ── COLLABORATORI DOCENTI ───────────────────────────────────
    window.apriCollaboratori = function(teamId, teamName, collaboratori) {
        const modal = document.getElementById('modal-collaboratori');
        if (!modal) return;
        document.getElementById('collaboratori-team-id').value = teamId;
        document.getElementById('collaboratori-team-nome').textContent = `Squadra: ${teamName}`;
        document.getElementById('collaboratori-new-email').value = '';
        window._renderCollaboratoriLista(teamId, collaboratori);
        modal.style.display = 'flex';
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
        } catch (e) {
            console.error(e);
            alert('Errore: ' + e.message);
        }
    };

    window.renderAdminMissioniPending = async function() {
        const list = document.getElementById('admin-missioni-pending-list');
        if(!list) return;
        list.innerHTML = '<p class="text-center">Caricamento missioni...</p>';
        
        const pending = await fanta_db.getPendingMissions();
        const allTeams = await fanta_db.getTeams();
        
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
    };

    window.renderAdminMissioni = function() {
        const list = document.getElementById('admin-missioni-list');
        if(!list) return;
        list.innerHTML = '';
        getAllTeams().filter(t => (t.missionsCompleted || 0) > 0).forEach(team => {
            list.innerHTML += `<div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <span>${team.name}</span><span style="font-weight:bold; color:var(--primary-color);">+${team.missionsCompleted * 5} pt</span>
            </div>`;
        });
    };

    window.renderAdminClassifica = function(modeFilter) {
        const list = document.getElementById('admin-classifica-list');
        if (!list) return;
        list.innerHTML = '';

        let teams = getAllTeams();
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

    window.renderAdminTornei = function() {
        const list = document.getElementById('admin-tornei-admin-list');
        if(!list) return;
        list.innerHTML = '<i>Nessun torneo globale attivo.</i>';
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
                const a = pool.find(x => x.id === aid);
                if(a && a.isPointsRevealed) authPts += (a.points || 0);
            });
            let misPts = (t.missionsCompleted || 0) * 5;
            sqList.innerHTML += `<div class="glass" style="padding:15px; margin-bottom:15px; border-left:4px solid var(--primary-color);">
                <div style="font-weight:bold; font-size:1.1rem; margin-bottom:10px;">${t.name}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:0.85rem;">
                    <div><span class="text-muted">Autori:</span> <span class="text-primary">${authPts} pt</span></div>
                    <div><span class="text-muted">Missioni:</span> <span class="text-primary">${misPts} pt</span></div>
                    <div style="grid-column: span 2; padding-top:5px; border-top:1px solid rgba(255,255,255,0.05); font-weight:bold;">
                        Totale: <span style="color:var(--primary-hover)">${authPts + misPts} pt</span>
                    </div>
                </div>
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
            const newCount = (team.missionsCompleted || 0) + 1;
            await window.db.collection("teams").doc(tid).update({ missionsCompleted: newCount });
        }
        await fanta_db.approveMission(mid);
        if(typeof window.renderAdminMissioni === 'function') window.renderAdminMissioni();
        if(typeof window.renderAdminMissioniPending === 'function') window.renderAdminMissioniPending();
    } catch (e) {
        console.error("Errore approvazione missione:", e);
    }
};

window.rifiutaMissione = async function(mid) {
    try {
        await window.db.collection("missions").doc(mid).delete();
        if(typeof window.renderAdminMissioniPending === 'function') window.renderAdminMissioniPending();
    } catch (e) {
        console.error("Errore rifiuto missione:", e);
    }
};

window.approvaTutteMissioni = async function() {
    if(!confirm('Approvare tutte le missioni in attesa?')) return;
    const pending = await fanta_db.getPendingMissions();
    for (const m of pending) {
        await window.approvaMissione(m.id, m.teamId);
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
        grid.innerHTML = '<p class="text-muted" style="grid-column: 1/-1;">In attesa della prima scheda... i professori le pubblicheranno a breve!</p>';
        return;
    }

    revealedAuthors.forEach(author => {
        let content = '';
        let titleStyle = '';
        let onclickAttr = '';

        if (author.schedaHTML) {
            titleStyle = 'cursor:pointer; color:var(--primary-color); display:inline-block; border-bottom:1px solid currentColor; margin-bottom:5px;';
            onclickAttr = `onclick="openAuthorSchedaModal('${author.id}', '${modeKey}')"`;
            content = `<div class="puntata-author"><button class="btn" style="padding: 4px 10px; font-size: 0.8rem; width: auto;" ${onclickAttr}><i class="fa-solid fa-eye"></i> Apri Scheda</button></div>`;
        } else {
            content = `<div class="puntata-author"><a href="schede/${author.id}.pdf" target="_blank" style="color:var(--primary-color); text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> Vedi PDF</a></div>`;
        }
        
        const isInternationalClass = author.isInternational ? 'card-international' : '';

        const card = `
            <div class="puntata-card ${isInternationalClass}" style="align-items:flex-start; overflow:hidden;">
                <img src="${author.image}" alt="${author.name}" class="puntata-img" style="background:#fff; margin-top:5px; flex-shrink:0; ${author.schedaHTML ? 'cursor:pointer;' : ''}" ${onclickAttr}>
                <div class="puntata-info" style="width:100%;">
                    <div class="puntata-title" style="${titleStyle}" ${onclickAttr}>${author.name}</div>
                    ${content}
                </div>
            </div>
        `;
        // Put the newest ones at the top/bottom depending on preference, we'll append.
        grid.insertAdjacentHTML('afterbegin', card); 
    });
}

/* =========================================
   MULTIPLE TEAMS (STORAGE) & AUTHENTICATION
========================================= */

let currentUserEmail = null;
let currentUserRole = null;

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
            const author = pool.find(a => a.id === aid);
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
            const a = currentPool.find(x => x.id === aid);
            if(a && a.isPointsRevealed) authPts += (a.points || 0);
        });
        let misPts = (team.missionsCompleted || 0) * 5;
        const modeBadgeHtml = `<span class="mode-badge ${modeCfg.colorClass}">${modeCfg.emoji} ${modeCfg.shortLabel}</span>`;
        const collabBadge = isCollaborated
            ? `<span style="font-size:0.72rem; background:rgba(141,160,63,0.2); color:var(--primary-color); border-radius:8px; padding:2px 8px; margin-left:4px;"><i class="fa-solid fa-users-gear"></i> Collaboratore</span>`
            : '';

        // Studenti iscritti a questa squadra
        const studentiArr = allStudentsMap[team.id] || [];
        let studentiSection = '';
        if (studentiArr.length > 0) {
            const studentiRows = studentiArr.map(s => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.04);">
                    <span style="font-size:0.8rem;">${s.email}</span>
                    <button class="btn btn-secondary" style="padding:2px 6px; font-size:0.7rem; width:auto; border-radius:10px;"
                        onclick="profiloSpostaStudente('${s.email}', '${team.id}', '${team.name}')">
                        <i class="fa-solid fa-right-left"></i> Sposta
                    </button>
                </div>`).join('');
            studentiSection = `
                <details style="margin-top:4px; margin-bottom:6px; width:100%;">
                    <summary style="font-size:0.78rem; cursor:pointer; color:var(--text-muted); user-select:none; margin-bottom:4px;">
                        <i class="fa-solid fa-users"></i> Studenti iscritti (${studentiArr.length})
                    </summary>
                    <div style="padding-left:4px;">${studentiRows}</div>
                </details>`;
        }

        // Sezione codice (solo per squadre proprie)
        const codiceSection = !isCollaborated ? `
            <div style="width:100%; margin-bottom:8px; padding:8px 10px; border-radius:8px; background:rgba(141, 160, 63, 0.04); border:1px dashed rgba(141, 160, 63, 0.3); display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div style="display:flex; flex-direction:column; gap:4px; flex-grow:1;">
                    <span style="font-size:0.68rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; letter-spacing:0.5px;">Codice Studenti</span>
                    <span class="join-code-badge" style="margin:0; font-size:1rem; padding:3px 8px; width:fit-content; text-align:center; font-weight:bold;">${team.joinCode || '---'}</span>
                </div>
                <button class="btn" style="width:auto; padding:6px 12px; font-size:0.75rem; border-radius:12px; height:fit-content;" onclick="shareInvite({type:'student', code:'${team.joinCode}', teamName:'${team.name}'})">
                    <i class="fa-solid fa-share-nodes"></i> Condividi
                </button>
            </div>` : '';

        // Sezione Azioni (Modifica / Elimina)
        const azioniSection = !isCollaborated ? `
            <div style="display:flex; gap:8px; width:100%; margin-top:4px; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                <button class="btn btn-secondary" style="flex:1; padding:5px 8px; font-size:0.72rem; border-radius:8px; background:rgba(255,255,255,0.03);" 
                    onclick="docenteModificaSquadra('${team.id}', '${team.name.replace(/'/g, "\\'")}', '${(team.classe || '').replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-pen-to-square"></i> Modifica
                </button>
                <button class="btn btn-danger" style="flex:1; padding:5px 8px; font-size:0.72rem; border-radius:8px; background:rgba(230, 57, 70, 0.1); border:1px solid rgba(230, 57, 70, 0.2); color:#e63946;" 
                    onclick="docenteEliminaSquadra('${team.id}', '${team.name.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-trash-can"></i> Elimina
                </button>
            </div>` : '';

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
        const myPending = await fanta_db.getInvites(currentUserEmail);
        const pendingInvites = myPending.filter(i => i.status === 'pending');
        
        // Aggiorna Badge Campanella
        if(badge) {
            if(pendingInvites.length > 0) {
                badge.textContent = pendingInvites.length;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
        
        if(list) {
            list.innerHTML = '';
            if(pendingInvites.length === 0) {
                list.innerHTML = '<i style="display:block; text-align:center; padding:15px 0;">Nessuna nuova notifica.</i>';
                return;
            }
            
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
    } catch (e) {
        console.error("Errore caricamento notifiche:", e);
        if(list) list.innerHTML = '<i>Errore nel caricamento delle notifiche.</i>';
    }
}

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

