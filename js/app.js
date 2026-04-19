// Fantaletteratura Web App - Main Application Logic

const STORAGE_KEY = 'fanta_state_v1';

// ── GAME MODE STATE ──────────────────────────────────────────
let currentTeamMode = null;       // modalità scelta nel form "Crea Squadra"
let currentLeaderboardMode = null; // modalità selezionata nelle classifiche
let isInitialStateLoaded = false;  // Guardia per evitare sovrascritture accidentali

async function loadGameState() {
    fanta_db.getSnapshotSettings((state) => {
        if(state) {
            console.log("Stato caricato da Firebase:", state);
            // Nuova logica: se pointsRevealed esiste, usiamolo
            if(state.pointsRevealed !== undefined) {
                AUTHORS.forEach(a => {
                    a.isPointsRevealed = state.pointsRevealed.includes(a.id);
                });
            } else if (state.revealedAuthors) {
                // Fallback retrocompatibilità
                AUTHORS.forEach(a => {
                    a.isPointsRevealed = state.revealedAuthors.includes(a.id);
                });
            }

            // Stessa cosa per schedaRevealed
            if(state.schedaRevealed !== undefined) {
                AUTHORS.forEach(a => {
                    a.isSchedaRevealed = state.schedaRevealed.includes(a.id);
                });
            }

            isInitialStateLoaded = true; // Sblocchiamo il salvataggio
            console.log("Sistema sincronizzato con successo.");

            // Rimuoviamo l'overlay di caricamento se presente
            const syncOverlay = document.getElementById('sync-overlay');
            if (syncOverlay) {
                syncOverlay.style.opacity = '0';
                setTimeout(() => syncOverlay.remove(), 500);
            }

            // Aggiorniamo le viste
            if (typeof populateSchede === 'function') populateSchede();
            if (typeof renderAdminAutori === 'function') renderAdminAutori();
            
            // Forziamo il refresh delle classifiche se aperte
            if (window.location.pathname.includes('admin.html')) {
                if(typeof window.renderAdminClassifica === 'function') window.renderAdminClassifica();
            }
        }
    });
}

async function saveGameState() {
    if (!isInitialStateLoaded) {
        console.warn("Salvataggio ignorato: lo stato iniziale non è ancora stato caricato.");
        return;
    }

    // Feedback visivo temporaneo
    const feedback = document.createElement('div');
    feedback.id = 'save-indicator';
    feedback.style = 'position:fixed; top:20px; right:20px; background:var(--primary-color); color:var(--bg-dark); padding:10px 20px; border-radius:30px; font-weight:bold; z-index:10000; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-size:0.85rem; pointer-events:none;';
    feedback.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Salvataggio...';
    document.body.appendChild(feedback);

    try {
        let ptsRevealed = AUTHORS.filter(a => a.isPointsRevealed).map(a => a.id);
        let schRevealed = AUTHORS.filter(a => a.isSchedaRevealed).map(a => a.id);
        let state = {
            pointsRevealed: ptsRevealed,
            schedaRevealed: schRevealed,
            revealedAuthors: ptsRevealed // manteniamo per compatibilità
        };

        await fanta_db.saveSettings(state);
        
        feedback.style.background = '#4caf50';
        feedback.innerHTML = '<i class="fa-solid fa-check"></i> Salvato!';
        setTimeout(() => { if(feedback.parentNode) feedback.remove(); }, 2000);
    } catch (e) {
        console.error("Errore salvataggio game state:", e);
        feedback.style.background = 'var(--danger-color)';
        feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Errore!';
        alert("Errore critico durante il salvataggio.\nErrore: " + e.message);
        setTimeout(() => { if(feedback.parentNode) feedback.remove(); }, 5000);
    }
}

function initApp() {
    loadGameState();

    // Mostra il container dell'app immediatamente
    const container = document.getElementById('app-container');
    if (container) {
        container.style.display = 'block';
    }

    // Aggiungi overlay di sincronizzazione database per l'admin
    if (window.location.pathname.includes('admin.html')) {
        const overlay = document.createElement('div');
        overlay.id = 'sync-overlay';
        overlay.style = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(10,10,15,0.9); z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; transition: opacity 0.5s;';
        overlay.innerHTML = `
            <div style="font-size:2rem; color:var(--primary-color); margin-bottom:20px;"><i class="fa-solid fa-cloud-arrow-down fa-bounce"></i></div>
            <div style="color:white; font-weight:bold; letter-spacing:1px;">SINCRONIZZAZIONE DATABASE...</div>
            <div style="color:rgba(255,255,255,0.5); font-size:0.8rem; margin-top:10px;">Attendere il caricamento dei dati aggiornati</div>
        `;
        document.body.appendChild(overlay);
    }

    // 1. Navigation setup
    setupNavigation();
    
    // 2. Data Initialization
    populateAuthorSelects();
    populateSchede();
    
    // 3. Event Listeners
    setupBudgetCalculator();
    setupAdminPanel();
    setupTeamSave();
    
    checkLoginSession();
    
    // Check hash for direct navigation from external pages (like admin)
    if (window.location.hash) {
        const viewId = window.location.hash.substring(1);
        if (document.getElementById(viewId)) {
            navigateTo(viewId, false);
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
    const menuBtn = document.getElementById('open-menu');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabItems = document.querySelectorAll('.tab-item');

    // Open side menu
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (sideMenu) sideMenu.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
        });
    }

    // Close side menu function
    const closeMenu = () => {
        if (sideMenu) sideMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
    };

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Handle menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const viewId = link.getAttribute('data-view');
            if (viewId) {
                e.preventDefault();
                navigateTo(viewId);
                closeMenu();
            }
        });
    });

    // Handle bottom tabs
    tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = tab.getAttribute('data-view');
            navigateTo(viewId);
        });
    });
}

function navigateTo(viewId, pushHistory = true) {
    if (!viewId) return;

    // STUDENT CODE GUARD
    const isStudentProtected = ['view-classifiche', 'view-schede'].includes(viewId);
    const hasStudentCode = localStorage.getItem('fanta_active_team_code');
    const isDocente = !!currentUserEmail;

    if (isStudentProtected && !hasStudentCode && !isDocente) {
        // Se non è loggato come docente e non ha un codice studente, 
        // lo mandiamo alla sezione studenti per inserire il codice
        alert("Per accedere a questa sezione devi inserire il codice fornito dal tuo docente.");
        navigateTo('view-studenti', pushHistory);
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
    const mode = modeId ? GAME_MODES[modeId] : GAME_MODES['terze'];
    const pool = (mode && mode.authors && mode.authors.length > 0) ? mode.authors : AUTHORS;
    
    grid.innerHTML = '';
    const sortedAuthors = [...pool].sort((a, b) => b.cost - a.cost);
    
    sortedAuthors.forEach(author => {
        const card = document.createElement('div');
        card.className = 'author-card glass';
        card.dataset.id = author.id;
        card.innerHTML = `
            <div class="author-image-wrapper">
                <img src="${author.image}" alt="${author.name}">
            </div>
            <div style="font-family: var(--font-heading); font-weight:bold; font-size:1.1rem; color:var(--accent-gold);">${author.name}</div>
            <div class="text-primary" style="font-size:0.9rem; font-weight:600;">${author.cost} lire</div>
        `;
        card.addEventListener('click', () => {
            selectAuthorForSlot(author.id, modeId);
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
                const name = card.querySelector('div')?.textContent?.toLowerCase() || '';
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
    
    // Update button UI
    const btn = document.querySelector(`.author-slot-btn[data-slot="${activeSlot}"]`);
    if(btn) {
        btn.innerHTML = `<div style="display:flex; align-items:center; gap:10px;">
                            <img src="${author.image}" style="width:30px; height:30px; object-fit:cover; border-radius:50%; background:#fff;"> 
                            <span>${author.name}</span>
                         </div> 
                         <span class="text-primary">${author.cost} lire</span>`;
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
    const saveBtn = document.getElementById('btn-save-team');

    if(!budgetBar) return;

    // Use the right author pool
    const mode = currentTeamMode ? GAME_MODES[currentTeamMode] : null;
    const pool = (mode && mode.authors && mode.authors.length > 0) ? mode.authors : AUTHORS;

    let totalCost = 0;
    let selectedCount = 0;
    
    Object.values(teamSelection).forEach(authorId => {
        if(authorId) {
            const author = pool.find(a => a.id === authorId);
            if(author) {
                totalCost += author.cost;
                selectedCount++;
            }
        }
    });

    const remaining = MAX_BUDGET - totalCost;
    
    // Update Text
    if(remaining >= 0) {
        budgetText.textContent = `${remaining} lire`;
        budgetStatus.textContent = `Hai ancora ${remaining} lire da spendere!`;
        budgetStatus.style.color = "inherit";
    } else {
        budgetText.textContent = "BUDGET SUPERATO";
        budgetStatus.textContent = "Il tuo budget non è illimitato! Hai solo 20000 lire. Scegli altre star!";
        budgetStatus.style.color = "var(--danger-color)";
    }

    // Update Progress Bar
    const percent = Math.min((totalCost / MAX_BUDGET) * 100, 100);
    budgetBar.style.width = `${percent}%`;
    
    if (totalCost > MAX_BUDGET) {
        budgetBar.classList.add('over');
        if (saveBtn) saveBtn.disabled = true;
    } else {
        budgetBar.classList.remove('over');
        if (saveBtn) saveBtn.disabled = (selectedCount !== 5);
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

    window.renderAdminAutori = function(modeFilter) {
        if (!autoriList) return;
        autoriList.innerHTML = '';

        // Determine author pool based on filter
        let pool = AUTHORS;
        if (modeFilter && modeFilter !== 'all' && GAME_MODES[modeFilter]) {
            pool = GAME_MODES[modeFilter].authors;
        }

        if (!pool || pool.length === 0) {
            autoriList.innerHTML = '<p class="text-muted" style="grid-column:1/-1; text-align:center;"><i>Nessun autore in questa modalità ancora.</i></p>';
            return;
        }

        [...pool].sort((a,b) => a.name.localeCompare(b.name)).forEach(author => {
            const isRevealed = author.isPointsRevealed;
            const isSchedaRevealed = author.isSchedaRevealed;
            let viewSchedaHtml = '';
            let titleStyle = '';
            let onclickAttr = '';
            
            if (author.schedaHTML) {
                onclickAttr = `onclick="openAuthorSchedaModal('${author.id}')"`;
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

            autoriList.innerHTML += `
                <div class="glass" style="padding:15px; text-align:center; border: 1px solid ${isRevealed ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}; display:flex; flex-direction:column; align-items:center;">  
                    <img src="${author.image}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; background:#fff; margin-bottom:10px;">
                    <div style="font-weight:bold; font-size:0.9rem; margin-bottom:5px;">${author.name}</div>
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--primary-color);">${author.points} pt</div>
                    <div style="margin-top:15px; display:flex; flex-direction:column; gap:8px; align-items:center; width:100%;">
                        <label style="font-size:0.75rem; cursor:pointer; display:flex; align-items:center; gap:5px;">
                            <input type="checkbox" ${isRevealed ? 'checked' : ''} onchange="toggleAuthorPoints('${author.id}', 'punti')"> Valida Punteggio
                        </label>
                        <label style="font-size:0.75rem; cursor:pointer; display:flex; align-items:center; gap:5px;">
                            <input type="checkbox" ${isSchedaRevealed ? 'checked' : ''} onchange="toggleAuthorPoints('${author.id}', 'scheda')"> Pubblica Scheda
                        </label>
                    </div>
                    ${viewSchedaHtml}
                </div>
            `;
        });
    };

    window.toggleAuthorPoints = async function(id, type) {
        if (!isInitialStateLoaded) {
            alert("Database in fase di caricamento. Attendi un istante prima di modificare i dati.");
            return;
        }
        const author = AUTHORS.find(a => a.id === id);
        if (author) {
            if (type === 'punti') author.isPointsRevealed = !author.isPointsRevealed;
            if (type === 'scheda') author.isSchedaRevealed = !author.isSchedaRevealed;
            
            await saveGameState();
            
            // Refresh immediato UI
            window.renderAdminAutori();
            window.renderAdminClassifica();
            if (typeof populateSchede === 'function') populateSchede();
            console.log(`Toggle ${type} per ${id} completato e salvato.`);
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

    window.renderAdminDocenti = async function(filterText = '') {
        const list = document.getElementById('admin-docenti-list');
        if (!list) return;
        list.innerHTML = '<p class="text-center">Caricamento docenti...</p>';
        
        const snapshot = await window.db.collection("users").where("role", "==", "teacher").get();
        let users = snapshot.docs.map(doc => doc.data());
        
        list.innerHTML = '';
        let filteredUsers = users.filter(u => {
            const query = filterText.toLowerCase();
            return u.email.toLowerCase().includes(query) || u.name.toLowerCase().includes(query);
        });

        if (filteredUsers.length === 0) list.innerHTML = '<i>Nessun docente trovato.</i>';
        filteredUsers.forEach(u => {
            let log = u.approvedAt ? `<br><small class="text-muted">Approvato: ${u.approvedAt.toDate ? u.approvedAt.toDate().toLocaleString() : u.approvedAt}</small>` : '';
            list.innerHTML += `<div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div><span>${u.email}</span> &mdash; <strong>${u.name}</strong>${log}</div>
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
        
        list.innerHTML = '';
        if (teams.length === 0) list.innerHTML = '<i>Nessuna squadra trovata.</i>';
        teams.forEach(t => {
            const modeInfo = t.mode ? GAME_MODES[t.mode] : null;
            const badge = modeInfo ? `<span class="mode-badge ${modeInfo.colorClass}">${modeInfo.emoji} ${modeInfo.shortLabel}</span>` : '';
            list.innerHTML += `<div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div>
                    <strong>${t.name}</strong> ${badge}<br>
                    <small>${t.ownerEmail || 'Globale'} &mdash; ${t.classe || ''}</small>
                </div>
                <button class="btn btn-secondary text-danger" style="padding:4px 8px; font-size:0.75rem; width:auto; background:transparent;" onclick="eliminaSquadra('${t.id}')"><i class="fa-solid fa-trash"></i></button>
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
            t.authors.forEach(aid => {
                const a = AUTHORS.find(x => x.id === aid);
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
window.openAuthorSchedaModal = function(authorId) {
    const author = AUTHORS.find(a => a.id === authorId);
    if (!author || !author.schedaHTML) return;
    document.getElementById('scheda-autore-title').innerHTML = `Scheda di <strong>${author.name}</strong>`;
    document.getElementById('scheda-autore-content').innerHTML = `
        <div style="text-align:center; margin-bottom:15px;">
            <img src="${author.image}" style="width:80px; height:80px; border-radius:50%; object-fit:cover; background:#fff;">
        </div>
        <div style="font-size:0.95rem; line-height:1.6; color:#e0e0e0; margin-bottom:10px;">${author.schedaHTML}</div>
    `;
    document.getElementById('scheda-autore-modal').style.display = 'block';
};

function populateSchede() {
    const grid = document.getElementById('schede-grid');
    if(!grid) return;
    
    grid.innerHTML = '';

    const revealedAuthors = AUTHORS.filter(a => a.isSchedaRevealed);

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
            onclickAttr = `onclick="openAuthorSchedaModal('${author.id}')"`;
            content = `<div class="puntata-author"><button class="btn" style="padding: 4px 10px; font-size: 0.8rem; width: auto;" ${onclickAttr}><i class="fa-solid fa-eye"></i> Apri Scheda</button></div>`;
        } else {
            content = `<div class="puntata-author"><a href="schede/${author.id}.pdf" target="_blank" style="color:var(--primary-color); text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> Vedi PDF</a></div>`;
        }
        
        const card = `
            <div class="puntata-card" style="align-items:flex-start; overflow:hidden;">
                <img src="${author.image}" alt="${author.name}" class="puntata-img" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background:#fff; margin-top:5px; flex-shrink:0; ${author.schedaHTML ? 'cursor:pointer;' : ''}" ${onclickAttr}>
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

function checkLoginSession() {
    fanta_db.onAuthStateChanged(async (user) => {
        if (user) {
            const email = user.email.toLowerCase();
            
            if (window.location.pathname.includes('admin.html')) {
                if (email !== "prof.memmo@gmail.com") {
                    alert("Accesso negato. Solo l'amministratore può accedere al pannello di controllo.");
                    window.location.href = 'index.html';
                    return;
                } else {
                    const container = document.getElementById('app-container');
                    if (container) container.style.display = 'block';
                }
            }

            if (email === "prof.memmo@gmail.com") {
                setLoggedIn(email);
                if (window.location.hash === '#view-welcome' && !window.location.pathname.includes('admin.html')) {
                    navigateTo('view-prof');
                }
                return;
            }
            
            // Verifichiamo se è approvato
            const usersRef = window.db.collection("users");
            const doc = await usersRef.doc(email).get();
            
            if (doc.exists) {
                setLoggedIn(email);
                if (window.location.hash === '#view-welcome') {
                    navigateTo('view-prof');
                }
            } else {
                // Non approvato - verifichiamo se ha una richiesta
                const requests = await fanta_db.getTeacherRequests();
                const pending = requests.find(r => r.email.toLowerCase() === email);
                if (pending) {
                    setLoggedIn(email); // Fondamentale per non essere bloccati dalla navigazione
                    alert("Il tuo account è in attesa di approvazione dal Game Master. Ti avviseremo via mail appena sarai attivo!");
                    navigateTo('view-welcome');
                } else {
                    // Loggato ma senza richiesta: attiviamo il login interno per permettere la navigazione
                    setLoggedIn(email); 
                    localStorage.setItem('fanta_temp_email', email);
                    navigateTo('view-iscrizione');
                }
            }
        } else {
            setLoggedOut();
            if (window.location.pathname.includes('admin.html')) {
                window.location.href = 'index.html';
            }
        }
    });
}

async function loginDocente(event) {
    if(event) event.preventDefault();
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

async function loginGoogle() {
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
    const name = document.querySelector('#view-iscrizione input[placeholder="Nome docente"]').value.trim();
    const school = document.querySelector('#view-iscrizione input[placeholder="Nome scuola"]').value.trim();
    const city = document.querySelector('#view-iscrizione input[placeholder="Citta"]').value.trim();
    const password = document.getElementById('iscrizione-password').value.trim();

    const isDocente = document.getElementById('teacher-check-docente').checked;
    const acceptedPrivacy = document.getElementById('teacher-check-privacy').checked;

    if (!name || !school || !city || !email) {
        alert("Completa tutti i campi (e inserisci l'email nella home se necessario).");
        return;
    }

    if (password && password.length < 6) {
        alert("La password deve essere di almeno 6 caratteri.");
        return;
    }

    if (!hasReadPrivacy || !hasReadTermini) {
        alert("Per proseguire è necessario aprire e leggere la Privacy Policy e i Termini e Condizioni cliccando sui rispettivi link.");
        return;
    }

    if (!isDocente || !acceptedPrivacy) {
        alert("Devi dichiarare di essere docente e accettare la Privacy Policy per iscriverti.");
        return;
    }

    try {
        // 1. Creiamo l'account su Firebase Auth solo se NON è Google
        const currentUser = window.auth.currentUser;
        const isGoogleUser = currentUser && currentUser.email.toLowerCase() === email;

        if (!isGoogleUser && password) {
            try {
                await window.auth.createUserWithEmailAndPassword(email, password);
            } catch (authError) {
                if (authError.code !== 'auth/email-already-in-use') {
                    throw authError;
                }
            }
        }

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
            password, 
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

        // Salviamo il codice e lo stato dello studente
        localStorage.setItem('fanta_active_team_code', codeInput);
        localStorage.setItem('fanta_active_team_id', team.id);
        
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
    if(!confirm("Vuoi davvero azzerare tutte le spunte e ricominciare il gioco?")) return;
    AUTHORS.forEach(a => {
        a.isPointsRevealed = false;
        a.isSchedaRevealed = false;
    });
    saveGameState();
    if (typeof window.renderAdminAutori === 'function') window.renderAdminAutori();
    alert("Tutte le spunte sono state rimosse!");
}

async function logoutDocente() {
    await fanta_db.logout();
    localStorage.removeItem('fanta_temp_email'); // Pulizia opzionale
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

function setLoggedIn(email) {
    currentUserEmail = email;
    const loginSec = document.getElementById('login-section');
    const loggedSec = document.getElementById('logged-in-section');
    if(loginSec) loginSec.style.display = 'none';
    if(loggedSec) loggedSec.style.display = 'block';
    
    const loggedWelc = document.getElementById('logged-in-welcome');
    if(loggedWelc) loggedWelc.textContent = "Bentornato, Prof!";
    
    // Show Profile tabs/links
    const pLink = document.getElementById('menu-link-profilo');
    const pTab = document.getElementById('tab-item-profilo');
    if(pLink) pLink.classList.remove('hidden');
    if(pTab) pTab.classList.remove('hidden');

    const profEmail = document.getElementById('profilo-email');
    if(profEmail) profEmail.value = email;
    const profAdminEmail = document.getElementById('admin-profilo-email');
    if(profAdminEmail) profAdminEmail.value = email;
    
    const appContainer = document.getElementById('app-container');
    if(appContainer) appContainer.style.display = 'block';

    renderProfilo();
}

function setLoggedOut() {
    currentUserEmail = null;
    const loginSec = document.getElementById('login-section');
    const loggedSec = document.getElementById('logged-in-section');
    if(loginSec) loginSec.style.display = 'block';
    if(loggedSec) loggedSec.style.display = 'none';
    
    const pLink = document.getElementById('menu-link-profilo');
    const pTab = document.getElementById('tab-item-profilo');
    if(pLink) pLink.classList.add('hidden');
    if(pTab) pTab.classList.add('hidden');
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
            alert("Squadra creata con successo! Caricamento in corso...");
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
    
    const squadreList = document.getElementById('profilo-squadre-list');
    if(!squadreList) return;

    // Calcoliamo i punteggi globali per determinare le posizioni
    let calculatedLeaderboard = allTeams.map(t => {
        let authPoints = 0;
        t.authors.forEach(aid => {
            const author = AUTHORS.find(a => a.id === aid);
            if(author && author.isPointsRevealed) authPoints += (author.points || 0);
        });
        return {
            id: t.id,
            points: authPoints + ((t.missionsCompleted || 0) * 5)
        };
    });
    calculatedLeaderboard.sort((a, b) => b.points - a.points);

    squadreList.innerHTML = ''; // Reset prima di popolare
    if(myTeams.length === 0) {
        squadreList.innerHTML = '<div class="glass" style="padding:20px; text-align:center;"><i>Nessuna squadra creata. Premi il tasto sopra per iniziare!</i></div>';
    } else {
        myTeams.forEach(team => {
            let authorsNames = team.authors.map(aid => {
                let a = AUTHORS.find(x => x.id === aid);
                return a ? a.name : aid;
            }).join(', ');

             // Troviamo posizione e punteggio per QUESTA squadra
             let rank = calculatedLeaderboard.findIndex(s => s.id === team.id) + 1;
             
             let authPts = 0;
             team.authors.forEach(aid => {
                 const a = AUTHORS.find(x => x.id === aid);
                 if(a && a.isPointsRevealed) authPts += (a.points || 0);
             });
             let misPts = (team.missionsCompleted || 0) * 5;

             // Badge modalità
             const modeInfo = team.mode ? GAME_MODES[team.mode] : null;
             const modeBadgeHtml = modeInfo 
                 ? `<span class="mode-badge ${modeInfo.colorClass}">${modeInfo.emoji} ${modeInfo.shortLabel}</span>` 
                 : '';

             squadreList.innerHTML += `
                <div class="card" style="margin-bottom:20px; flex-direction:column; align-items:flex-start;">
                     <div style="display:flex; justify-content:space-between; align-items:center; width:100%; border-bottom:1px solid rgba(75, 93, 22, 0.2); padding-bottom:8px; margin-bottom:10px;">
                         <div style="font-family: var(--font-heading); font-weight:bold; color:var(--accent-gold); font-size:1.4rem;">${team.name}</div>
                         ${modeBadgeHtml}
                     </div>
                     <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:12px;"><i class="fa-solid fa-users"></i> Classe: ${team.classe || 'N/A'}</div>
                     
                     <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; width:100%; margin-bottom:15px; font-size:0.85rem; padding: 0 5px;">
                        <div style="background:rgba(255,255,255,0.03); padding:8px; border-radius:8px;">
                            <span style="color:var(--text-muted); display:block; font-size:0.7rem; text-transform:uppercase;">Punti Autori</span>
                            <span style="font-weight:bold; color:var(--primary-color); font-size:1.1rem;">${authPts} pt</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.03); padding:8px; border-radius:8px;">
                            <span style="color:var(--text-muted); display:block; font-size:0.7rem; text-transform:uppercase;">Punti Missioni</span>
                            <span style="font-weight:bold; color:var(--primary-color); font-size:1.1rem;">${misPts} pt</span>
                        </div>
                     </div>

                     <div style="width:100%; margin-bottom:15px; padding:10px; border-radius:12px; background:rgba(141, 160, 63, 0.05); border:1px dashed var(--primary-color); display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <span style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); display:block;">Codice Studenti</span>
                            <span class="join-code-badge" style="margin:0;">${team.joinCode || '---'}</span>
                        </div>
                        <button class="btn" style="width:auto; padding:6px 12px; font-size:0.75rem; border-radius:20px;" onclick="shareInvite({type:'student', code:'${team.joinCode}', teamName:'${team.name}'})">
                            <i class="fa-solid fa-share-nodes"></i> Condividi
                        </button>
                     </div>

                     <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(75, 93, 22, 0.05); padding:12px; border-radius:12px; width:100%; border:1px solid rgba(75, 93, 22, 0.1);">
                         <div>
                             <div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:1px;">Totale Globale</div>
                             <div style="font-weight:bold; font-size:1.4rem; color:var(--primary-color);">${authPts + misPts} pt</div>
                         </div>
                         <div style="text-align:right;">
                             <div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:1px;">Posizione</div>
                             <div style="font-weight:bold; font-size:1.4rem; color:var(--accent-gold);">#${rank}</div>
                         </div>
                     </div>
                </div>
             `;
        });
    }

    renderNotifiche();
    renderTornei();
}

async function renderNotifiche() {
    const list = document.getElementById('profilo-notifiche-list');
    if(!list || !currentUserEmail) return;
    
    list.innerHTML = '<p class="text-center">Caricamento notifiche...</p>';
    
    try {
        const myPending = await fanta_db.getInvites(currentUserEmail);
        list.innerHTML = '';
        
        if(myPending.length === 0) {
            list.innerHTML = '<i>Nessuna nuova notifica.</i>';
            return;
        }
        
        const tourneys = await fanta_db.getTournaments();
        
        myPending.filter(i => i.status === 'pending').forEach(inv => {
            let t = tourneys.find(x => x.id === inv.tournamentId);
            let tName = t ? t.name : "Torneo Sconosciuto";
            
            list.innerHTML += `
                <div style="background:rgba(255,193,7,0.1); padding:10px; border-radius:8px; border-left:3px solid #ffc107; font-size:0.9rem; margin-bottom:10px;">
                    <p style="margin:0 0 10px 0;"><b>${inv.fromEmail}</b> ti ha invitato al torneo <b>${tName}</b>.</p>
                    <div style="display:flex; gap:10px;">
                        <button class="btn" style="padding:4px 10px; font-size:0.75rem; width:auto; background:var(--primary-color);" onclick="openJoinTorneoModal('${inv.tournamentId}', '${inv.id}')">Accetta e Iscrivi Squadre</button>
                        <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.75rem; width:auto;" onclick="rifiutaInvito('${inv.id}')">Rifiuta</button>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        console.error("Errore caricamento notifiche:", e);
        list.innerHTML = '<i>Errore nel caricamento delle notifiche.</i>';
    }
}

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
                tObj.authors.forEach(aid => {
                    let a = AUTHORS.find(x => x.id === aid);
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
                    <div class="glass" style="padding:15px; margin-bottom:10px; border-left:4px solid var(--accent-gold); display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div style="font-weight:bold; font-size:1rem; margin-bottom:2px;">${m.titolo}</div>
                            <div style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-users"></i> ${teamName}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:0.65rem; color:var(--accent-gold); font-weight:800; text-transform:uppercase; background:rgba(212, 175, 55, 0.1); padding:4px 8px; border-radius:10px; border:1px solid rgba(212, 175, 55, 0.2);">
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

// --- AUTO-INITIALIZATION ---
// Garantisce che il motore dell'app si avvii su ogni pagina (incluso admin.html)
document.addEventListener('DOMContentLoaded', () => {
    // Se non è già stata avviata tramite onload (fallback), avviala ora
    if (typeof initApp === 'function') {
        initApp();
    }
});
