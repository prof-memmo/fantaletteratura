// Fantaletteratura Web App - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

const STORAGE_KEY = 'fanta_state_v1';

// ── GAME MODE STATE ──────────────────────────────────────────
let currentTeamMode = null;       // modalità scelta nel form "Crea Squadra"
let currentLeaderboardMode = null; // modalità selezionata nelle classifiche


function loadGameState() {
    let saved = localStorage.getItem(STORAGE_KEY);
    if(saved) {
        try {
            let state = JSON.parse(saved);
            if(state.revealedAuthors) {
                AUTHORS.forEach(a => {
                    if(state.revealedAuthors.includes(a.id)) {
                        a.isPointsRevealed = true;
                        a.isSchedaRevealed = true;
                    }
                });
            }
            if(state.pointsRevealed) {
                AUTHORS.forEach(a => {
                    if(state.pointsRevealed.includes(a.id)) a.isPointsRevealed = true;
                });
            }
            if(state.schedaRevealed) {
                AUTHORS.forEach(a => {
                    if(state.schedaRevealed.includes(a.id)) a.isSchedaRevealed = true;
                });
            }
        } catch(e) { }
    }
}

function saveGameState() {
    let ptsRevealed = AUTHORS.filter(a => a.isPointsRevealed).map(a => a.id);
    let schRevealed = AUTHORS.filter(a => a.isSchedaRevealed).map(a => a.id);
    let state = {
        pointsRevealed: ptsRevealed,
        schedaRevealed: schRevealed
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function initApp() {
    loadGameState();

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
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            navigateTo(viewId);
            closeMenu();
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
function setupAdminPanel() {
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
            autoriList.innerHTML += `
                <div class="glass" style="padding:15px; text-align:center; border: 1px solid ${isRevealed ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'};">  
                    <img src="${author.image}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; background:#fff; margin-bottom:10px;">
                    <div style="font-weight:bold; font-size:0.9rem; margin-bottom:5px;">${author.name}</div>
                    <div style="font-size:1.2rem; font-weight:bold; color:var(--primary-color);">${author.points} pt</div>
                    <div style="margin-top:15px; display:flex; flex-direction:column; gap:8px; align-items:center;">
                        <label style="font-size:0.75rem; cursor:pointer; display:flex; align-items:center; gap:5px;">
                            <input type="checkbox" ${isRevealed ? 'checked' : ''} onchange="toggleAuthorPoints('${author.id}', 'punti')"> Valida Punteggio
                        </label>
                        <label style="font-size:0.75rem; cursor:pointer; display:flex; align-items:center; gap:5px;">
                            <input type="checkbox" ${isSchedaRevealed ? 'checked' : ''} onchange="toggleAuthorPoints('${author.id}', 'scheda')"> Pubblica Scheda
                        </label>
                    </div>
                </div>
            `;
        });
    };

    window.toggleAuthorPoints = function(id, type) {
        const author = AUTHORS.find(a => a.id === id);
        if (author) {
            if (type === 'punti') author.isPointsRevealed = !author.isPointsRevealed;
            if (type === 'scheda') author.isSchedaRevealed = !author.isSchedaRevealed;
            saveGameState();
            window.renderAdminAutori();
            window.renderAdminClassifica();
            if (typeof populateSchede === 'function') populateSchede();
        }
    };

    window.renderAdminRichieste = function() {
        const list = document.getElementById('admin-requests-list');
        if (!list) return;
        list.innerHTML = '';
        let requests = JSON.parse(localStorage.getItem('fanta_pending_requests')) || [];
        if (requests.length === 0) {
            list.innerHTML = '<i>Nessuna richiesta in sospeso.</i>';
        } else {
            requests.forEach(req => {
                list.innerHTML += `
                    <div class="glass" style="padding:15px; margin-bottom:10px; border-left:4px solid var(--accent-gold);">
                        <div style="font-weight:bold; color:var(--primary-color); font-size:1.1rem;">${req.name}</div>
                        <div style="font-size:0.85rem; margin-top:5px; color:var(--text-muted);">${req.email} | ${req.school} (${req.city})</div>
                        <div style="display:flex; gap:10px; margin-top:15px;">
                            <button class="btn" style="flex:1; padding:8px; font-size:0.8rem;" onclick="approvaRichiesta('${req.email}')">Approva</button>
                            <button class="btn btn-secondary" style="flex:1; padding:8px; font-size:0.8rem; color: #ff5f5f; border-color: #ff5f5f;" onclick="rifiutaRichiesta('${req.email}')">Rifiuta</button>
                        </div>
                    </div>
                `;
            });
        }
    };

    window.approvaRichiesta = function(email) {
        let requests = JSON.parse(localStorage.getItem('fanta_pending_requests')) || [];
        let req = requests.find(r => r.email === email);
        if(!req) return;
        
        // Salviamo il log del consenso prima di rimuovere la richiesta
        let logs = JSON.parse(localStorage.getItem('fanta_pending_requests_logs')) || {};
        logs[email] = { timestamp: req.consentTimestamp || 'N/A' };
        localStorage.setItem('fanta_pending_requests_logs', JSON.stringify(logs));

        let approved = JSON.parse(localStorage.getItem('fanta_approved_users')) || [];
        if(!approved.includes(email)) {
            approved.push(email);
            localStorage.setItem('fanta_approved_users', JSON.stringify(approved));
        }
        
        let registered = JSON.parse(localStorage.getItem('fanta_registered_users')) || [];
        if(!registered.includes(email)) {
            registered.push(email);
            localStorage.setItem('fanta_registered_users', JSON.stringify(registered));
        }

        requests = requests.filter(r => r.email !== email);
        localStorage.setItem('fanta_pending_requests', JSON.stringify(requests));
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
        window.renderAdminRichieste();
        window.renderAdminDocenti();
    };

    window.rifiutaRichiesta = function(email) {
        if(!confirm("Cancellare richiesta?")) return;
        let requests = JSON.parse(localStorage.getItem('fanta_pending_requests')) || [];
        requests = requests.filter(r => r.email !== email);
        localStorage.setItem('fanta_pending_requests', JSON.stringify(requests));
        window.renderAdminRichieste();
    };

    window.renderAdminDocenti = function(filterText = '') {
        const list = document.getElementById('admin-docenti-list');
        if (!list) return;
        list.innerHTML = '';
        let users = JSON.parse(localStorage.getItem('fanta_registered_users')) || [];
        // Supporto per log di accettazione se presente
        let requestsLogs = JSON.parse(localStorage.getItem('fanta_pending_requests_logs')) || {};
        
        let filteredUsers = users.filter(email => {
            const query = filterText.toLowerCase();
            return email.toLowerCase().includes(query);
        });

        if (filteredUsers.length === 0) list.innerHTML = '<i>Nessun docente trovato.</i>';
        filteredUsers.forEach(email => {
            let log = requestsLogs[email] ? `<br><small class="text-muted">Accettato: ${requestsLogs[email].timestamp}</small>` : '';
            list.innerHTML += `<div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div><span>${email}</span>${log}</div>
                <button class="btn btn-secondary text-danger" style="padding:4px 8px; font-size:0.75rem; width:auto; background:var(--bg-card); border-color:var(--danger-color);" onclick="eliminaDocente('${email}')"><i class="fa-solid fa-trash"></i></button>
            </div>`;
        });
    };

    window.eliminaDocente = function(email) {
        if(!confirm('Eliminare account?')) return;
        let users = JSON.parse(localStorage.getItem('fanta_registered_users')) || [];
        users = users.filter(u => u !== email);
        localStorage.setItem('fanta_registered_users', JSON.stringify(users));
        window.renderAdminDocenti();
    };

    window.renderAdminRichieste = function() {
        const list = document.getElementById('admin-requests-list');
        if (!list) return;
        list.innerHTML = '';
        let requests = JSON.parse(localStorage.getItem('fanta_pending_requests')) || [];
        if (requests.length === 0) {
            list.innerHTML = '<i>Nessuna richiesta in sospeso.</i>';
        } else {
            requests.forEach(req => {
                let consentLog = req.consentTimestamp ? `<div style="font-size:0.7rem; color:var(--accent-gold); margin-top:5px;"><i class="fa-solid fa-clock"></i> Consenso: ${req.consentTimestamp}</div>` : '';
                list.innerHTML += `
                    <div class="glass" style="padding:15px; margin-bottom:10px; border-left:4px solid var(--accent-gold);">
                        <div style="font-weight:bold; color:var(--primary-color); font-size:1.1rem;">${req.name}</div>
                        <div style="font-size:0.85rem; margin-top:5px; color:var(--text-muted);">${req.email} | ${req.school} (${req.city})</div>
                        ${consentLog}
                        <div style="display:flex; gap:10px; margin-top:15px;">
                            <button class="btn" style="flex:1; padding:8px; font-size:0.8rem;" onclick="approvaRichiesta('${req.email}')">Approva</button>
                            <button class="btn btn-secondary" style="flex:1; padding:8px; font-size:0.8rem; color: #ff5f5f; border-color: #ff5f5f;" onclick="rifiutaRichiesta('${req.email}')">Rifiuta</button>
                        </div>
                    </div>
                `;
            });
        }
    };

    window.renderAdminSquadre = function(modeFilter) {
        const list = document.getElementById('admin-squadre-list');
        if (!list) return;
        list.innerHTML = '';
        let teams = getAllTeams();
        if (modeFilter && modeFilter !== 'all') {
            teams = teams.filter(t => (t.mode || 'terze') === modeFilter);
        }
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

    window.eliminaSquadra = function(tid) {
        if(!confirm('Eliminare squadra?')) return;
        let locals = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
        locals = locals.filter(t => t.id !== tid);
        localStorage.setItem('fanta_local_teams', JSON.stringify(locals));
        window.renderAdminSquadre();
    };

    window.renderAdminMissioniPending = function() {
        const list = document.getElementById('admin-missioni-pending-list');
        if(!list) return;
        list.innerHTML = '';
        let pending = JSON.parse(localStorage.getItem('fanta_missioni_pending')) || [];
        if(pending.length === 0) {
            list.innerHTML = '<i>Nessuna missione in attesa.</i>';
            if(document.getElementById('btn-approva-tutte')) document.getElementById('btn-approva-tutte').disabled = true;
        } else {
            if(document.getElementById('btn-approva-tutte')) document.getElementById('btn-approva-tutte').disabled = false;
            pending.forEach(m => {
                let t = getAllTeams().find(x => x.id === m.teamId);
                list.innerHTML += `<div class="glass" style="padding:10px; margin-bottom:10px; border-left:3px solid var(--accent-gold);">
                    <div style="font-weight:bold;">${m.titolo}</div><small>${t?t.name:'Squadra Errata'}</small>
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
        window.renderAdminAutori();
        window.renderAdminDocenti();
        window.renderAdminSquadre();
        window.renderAdminMissioni();
        window.renderAdminMissioniPending();
        window.renderAdminClassifica();
        window.renderAdminRichieste();
        window.renderAdminTornei();
        window.renderAdminProfilo();
    }
}

window.renderAdminProfilo = function() {
    const sqList = document.getElementById('admin-profilo-squadre-list');
    const trList = document.getElementById('admin-profilo-tornei-list');
    const emailField = document.getElementById('admin-profilo-email');
    if(!sqList || !currentUserEmail) return;

    if(emailField) emailField.value = currentUserEmail;

    // Render Squadre
    let teams = getAllTeams().filter(t => t.ownerEmail === currentUserEmail);
    sqList.innerHTML = '';
    if(teams.length === 0) {
        sqList.innerHTML = '<i>Nessuna squadra creata.</i>';
    } else {
        teams.forEach(t => {
            let authPts = 0;
            t.authors.forEach(aid => {
                const a = AUTHORS.find(x => x.id === aid);
                if(a && a.isPointsRevealed) authPts += a.points;
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

    // Reuse renderTornei logic but for admin-view
    const tourneysList = document.getElementById('admin-profilo-tornei-list');
    if(!tourneysList) return;
    
    let tourneys = JSON.parse(localStorage.getItem('fanta_tournaments')) || [];
    let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
    let myTeamsIds = localTeams.filter(t => t.ownerEmail === currentUserEmail).map(t => t.id);
    let myTourneys = tourneys.filter(t => t.ownerEmail === currentUserEmail || t.teams.some(teamId => myTeamsIds.includes(teamId)));
    
    tourneysList.innerHTML = '';
    if(myTourneys.length === 0) {
        tourneysList.innerHTML = '<i>Nessun torneo privato.</i>';
    } else {
        myTourneys.forEach(tour => {
            let btnInvita = `<button class="btn btn-secondary" style="font-size:0.7rem; padding:4px 8px; width:auto; border-radius:15px;" onclick="openInviteModal('${tour.id}')"><i class="fa-solid fa-paper-plane"></i> Invita</button>`;
            tourneysList.innerHTML += `<div class="glass" style="padding:10px; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <strong class="text-primary">${tour.name}</strong>
                    ${btnInvita}
                </div>
                <small>${tour.teams.length} squadre partecipanti</small>
            </div>`;
        });
    }
};

window.approvaMissione = function(mid, tid) {
    let locals = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
    let tIdx = locals.findIndex(t => t.id === tid);
    if(tIdx > -1) { locals[tIdx].missionsCompleted = (locals[tIdx].missionsCompleted || 0) + 1; localStorage.setItem('fanta_local_teams', JSON.stringify(locals)); }
    window.rifiutaMissione(mid); 
    if(typeof window.renderAdminMissioni === 'function') window.renderAdminMissioni();
};

window.rifiutaMissione = function(mid) {
    let pending = JSON.parse(localStorage.getItem('fanta_missioni_pending')) || [];
    pending = pending.filter(m => m.id !== mid);
    localStorage.setItem('fanta_missioni_pending', JSON.stringify(pending));
    if(typeof window.renderAdminMissioniPending === 'function') window.renderAdminMissioniPending();
};

window.approvaTutteMissioni = function() {
    if(!confirm('Approvare tutte?')) return;
    let pending = JSON.parse(localStorage.getItem('fanta_missioni_pending')) || [];
    pending.forEach(m => window.approvaMissione(m.id, m.teamId));
};


/* =========================================
   LEADERBOARDS DINAMICHE
========================================= */
function showLeaderboard(type) {
    const listContainer = document.getElementById('leaderboard-list');
    const title = document.getElementById('leaderboard-title');
    listContainer.innerHTML = '';

    // Determine current mode
    const modeId = currentLeaderboardMode || 'terze';
    const mode = GAME_MODES[modeId];
    const pool = (mode && mode.authors && mode.authors.length > 0) ? mode.authors : AUTHORS;
    const modeBadge = mode ? `<span class="mode-badge ${mode.colorClass}" style="font-size:0.75rem; margin-left:8px;">${mode.emoji} ${mode.shortLabel}</span>` : '';

    // Filter teams by mode
    let allTeams = getAllTeams().filter(t => (t.mode || 'terze') === modeId);

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
        const card = `
            <div class="puntata-card">
                <img src="${author.image}" alt="${author.name}" class="puntata-img" style="background:#fff;">
                <div class="puntata-info">
                    <div class="puntata-title">Scheda di ${author.name}</div>
                    <div class="puntata-author"><a href="schede/${author.id}.pdf" target="_blank" style="color:var(--primary-color); text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> Vedi Scheda</a></div>
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
    const savedEmail = localStorage.getItem('fanta_docente_email');
    if (savedEmail) {
        setLoggedIn(savedEmail);
    }
}

function loginDocente(event) {
    if(event) event.preventDefault();
    const emailInput = document.getElementById('docente-email-input').value.trim();
    if (!emailInput) {
        alert("Inserisci un'email valida.");
        return;
    }

    // Verifica se l'utente è approvato
    let approved = JSON.parse(localStorage.getItem('fanta_approved_users')) || [];
    if (!approved.includes(emailInput)) {
        // Nessun alert qui come richiesto, l'utente viene solo reindirizzato
        navigateTo('view-iscrizione');
        // Pre-popoliamo l'email nella pagina di iscrizione se possibile o la salviamo temporaneamente
        localStorage.setItem('fanta_temp_email', emailInput);
        return;
    }

    localStorage.setItem('fanta_docente_email', emailInput);
    setLoggedIn(emailInput);
    navigateTo('view-prof'); // Reindirizza subito alla pagina Buongiorno Prof
}

function inviaRichiestaIscrizione(event) {
    if(event) event.preventDefault();
    const email = localStorage.getItem('fanta_temp_email') || "";
    const name = document.querySelector('#view-iscrizione input[placeholder="Nome docente"]').value.trim();
    const school = document.querySelector('#view-iscrizione input[placeholder="Nome scuola"]').value.trim();
    const city = document.querySelector('#view-iscrizione input[placeholder="Citta"]').value.trim();

    const isDocente = document.getElementById('teacher-check-docente').checked;
    const acceptedPrivacy = document.getElementById('teacher-check-privacy').checked;

    if (!name || !school || !city || !email) {
        alert("Completa tutti i campi e inserisci l'email nella home.");
        if(!email) navigateTo('view-welcome');
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

    let requests = JSON.parse(localStorage.getItem('fanta_pending_requests')) || [];
    if (requests.some(r => r.email === email)) {
        alert("Hai già inviato una richiesta di iscrizione. Attendi l'approvazione.");
        return;
    }

    const now = new Date();
    const timestamp = now.toLocaleDateString('it-IT') + ' ' + now.toLocaleTimeString('it-IT');

    requests.push({ 
        email, 
        name, 
        school, 
        city, 
        status: 'pending', 
        id: 'req_' + Date.now(),
        consentTimestamp: timestamp
    });
    localStorage.setItem('fanta_pending_requests', JSON.stringify(requests));

    alert("Richiesta inviata con successo! Riceverai una e-mail dal Game Master in caso di approvazione.");
    navigateTo('view-welcome');
}

function checkStudentConsent() {
    const ageCheck = document.getElementById('student-check-age').checked;
    const privacyCheck = document.getElementById('student-check-privacy').checked;

    if (!hasReadPrivacy || !hasReadTermini) {
        alert("Per proseguire è necessario aprire e leggere la Privacy Policy e i Termini e Condizioni cliccando sui rispettivi link.");
        return;
    }

    if (!ageCheck || !privacyCheck) {
        alert("Devi dichiarare l'età e accettare la Privacy Policy per procedere.");
        return;
    }

    // Salviamo il consenso dello studente nel localStorage (anonimo)
    const now = new Date();
    const timestamp = now.toLocaleDateString('it-IT') + ' ' + now.toLocaleTimeString('it-IT');
    localStorage.setItem('fanta_student_consent', timestamp);

    navigateTo('view-classifiche');
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
    if (confirm("ATTENZIONE: Se procedi, verranno rimossi DEFINITIVAMENTE tutti i tuoi dati, le squadre che hai creato e i tuoi tornei da questo dispositivo. Vuoi continuare?")) {
        localStorage.clear();
        alert("Tutti i dati sono stati rimossi. Verrai reindirizzato alla Home.");
        window.location.reload();
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

function logoutDocente() {
    localStorage.removeItem('fanta_docente_email');
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
        document.body.style.overflow = 'auto'; // Ripristina scroll del body
    }
}

// Chiudi modali cliccando fuori dal contenuto
window.onclick = function(event) {
    if (event.target.classList.contains('modal-legal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    // Mantieni logica modali esistenti se necessario
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
    
    renderProfilo();
}

function getAllTeams() {
    let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
    let globalTeams = (typeof MOCK_TEAMS !== 'undefined' ? MOCK_TEAMS : []);
    return [...globalTeams, ...localTeams];
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

        let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
        
        const newTeam = {
            id: 'local_' + Date.now(),
            name: teamNameInput,
            classe: teamClasseInput,
            ownerEmail: currentUserEmail,
            authors: authorsSelected,
            missionsCompleted: 0,
            mode: currentTeamMode   // ← salva la modalità
        };

        localTeams.push(newTeam);
        localStorage.setItem('fanta_local_teams', JSON.stringify(localTeams));

        alert("Squadra creata con successo! Vai al profilo per vederla.");
        
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

function renderProfilo() {
    if(!currentUserEmail) return;
    
    let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
    let myTeams = localTeams.filter(t => t.ownerEmail === currentUserEmail);
    
    const squadreList = document.getElementById('profilo-squadre-list');
    if(!squadreList) return;

    
    // Calcoliamo i punteggi globali per determinare le posizioni
    let allTeams = getAllTeams();
    let calculatedLeaderboard = allTeams.map(t => {
        let authPoints = 0;
        t.authors.forEach(aid => {
            const author = AUTHORS.find(a => a.id === aid);
            if(author && author.isPointsRevealed) authPoints += author.points;
        });
        return {
            id: t.id,
            points: authPoints + (t.missionsCompleted * 5)
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
             let stats = calculatedLeaderboard.find(s => s.id === team.id);
             let rank = calculatedLeaderboard.findIndex(s => s.id === team.id) + 1;
             
             let authPts = 0;
             team.authors.forEach(aid => {
                 const a = AUTHORS.find(x => x.id === aid);
                 if(a && a.isPointsRevealed) authPts += a.points;
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

function renderNotifiche() {
    const list = document.getElementById('profilo-notifiche-list');
    if(!list || !currentUserEmail) return;
    
    let invites = JSON.parse(localStorage.getItem('fanta_invites')) || [];
    let myPending = invites.filter(i => i.toEmail === currentUserEmail && i.status === 'pending');
    
    list.innerHTML = '';
    if(myPending.length === 0) {
        list.innerHTML = '<i>Nessuna nuova notifica.</i>';
        return;
    }
    
    let tourneys = JSON.parse(localStorage.getItem('fanta_tournaments')) || [];
    
    myPending.forEach(inv => {
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
}

function openTorneoModal() {
    const modal = document.getElementById('torneo-modal');
    if(!modal) return;
    
    const checkboxes = document.getElementById('torneo-squadre-checkboxes');
    checkboxes.innerHTML = '';
    
    let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
    let myTeams = localTeams.filter(t => t.ownerEmail === currentUserEmail);
    
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

function creaTorneo(event) {
    if(event) event.preventDefault();
    const nome = document.getElementById('torneo-nome-input').value.trim();
    if(!nome) {
        alert("Inserisci il nome del torneo.");
        return;
    }
    
    const selectedIds = Array.from(document.querySelectorAll('.torneo-team-chk:checked')).map(chk => chk.value);
    if(selectedIds.length < 2) {
        alert("Seleziona almeno 2 squadre per creare il torneo.");
        return;
    }
    
    let tourneys = JSON.parse(localStorage.getItem('fanta_tournaments')) || [];
    tourneys.push({
        id: 'tour_' + Date.now(),
        name: nome,
        ownerEmail: currentUserEmail,
        teams: selectedIds
    });
    localStorage.setItem('fanta_tournaments', JSON.stringify(tourneys));
    
    document.getElementById('torneo-modal').style.display = 'none';
    renderTornei();
}

function openJoinTorneoModal(tourId, inviteId) {
    const modal = document.getElementById('join-torneo-modal');
    if(!modal) return;
    
    document.getElementById('join-torneo-id').value = tourId;
    document.getElementById('join-invite-id').value = inviteId;
    
    const checkboxes = document.getElementById('join-torneo-squadre');
    checkboxes.innerHTML = '';
    
    let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
    let myTeams = localTeams.filter(t => t.ownerEmail === currentUserEmail);
    
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

function joinTorneo(event) {
    if(event) event.preventDefault();
    const tourId = document.getElementById('join-torneo-id').value;
    const invId = document.getElementById('join-invite-id').value;
    
    let tourneys = JSON.parse(localStorage.getItem('fanta_tournaments')) || [];
    let tourIdx = tourneys.findIndex(t => t.id === tourId);
    if(tourIdx === -1) {
        alert("Torneo non trovato.");
        return;
    }
    
    const selectedIds = Array.from(document.querySelectorAll('.join-team-chk:checked')).map(chk => chk.value);
    if(selectedIds.length === 0) {
        alert("Seleziona almeno una tua squadra da iscrivere.");
        return;
    }
    
    tourneys[tourIdx].teams = [...new Set([...tourneys[tourIdx].teams, ...selectedIds])];
    localStorage.setItem('fanta_tournaments', JSON.stringify(tourneys));
    
    let invites = JSON.parse(localStorage.getItem('fanta_invites')) || [];
    let invIdx = invites.findIndex(i => i.id === invId);
    if(invIdx > -1) {
        invites[invIdx].status = 'accepted';
        localStorage.setItem('fanta_invites', JSON.stringify(invites));
    }
    
    document.getElementById('join-torneo-modal').style.display = 'none';
    alert("Squadre iscritte con successo!");
    renderProfilo(); 
}

function rifiutaInvito(invId) {
    if(!confirm("Vuoi rimuovere questo invito?")) return;
    let invites = JSON.parse(localStorage.getItem('fanta_invites')) || [];
    invites = invites.filter(i => i.id !== invId); 
    localStorage.setItem('fanta_invites', JSON.stringify(invites));
    renderProfilo();
}

function openInviteModal(tourId) {
    const modal = document.getElementById('invite-torneo-modal');
    if(!modal) return;
    
    document.getElementById('invite-torneo-id').value = tourId || '';
    document.getElementById('invite-collega-email').value = '';
    
    // Aggiornamento dei testi se è un invito generico o un torneo
    const modalTitle = modal.querySelector('h3');
    const modalText = modal.querySelector('p');
    
    if(!tourId) {
        if(modalTitle) modalTitle.textContent = "Invita un Collega";
        if(modalText) modalText.textContent = "Inserisci l'email del docente che vuoi invitare a iscriversi a Fantaletteratura.";
    } else {
        if(modalTitle) modalTitle.textContent = "Invita al Torneo";
        if(modalText) modalText.textContent = "Inserisci l'email del docente che vuoi invitare a partecipare a questo torneo privato.";
    }
    
    modal.style.display = 'block';
}

function inviaInvitoTorneo(event) {
    if(event) event.preventDefault();
    const tourId = document.getElementById('invite-torneo-id').value;
    const targetEmail = document.getElementById('invite-collega-email').value.trim();
    
    if(!targetEmail) { alert("Inserisci l'email!"); return; }
    if(targetEmail === currentUserEmail) { alert("Non puoi autoinvitarti!"); return; }

    const isGeneral = !tourId;
    
    let users = JSON.parse(localStorage.getItem('fanta_registered_users')) || [];
    if(!users.includes(targetEmail)) {
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
        // we still record the invite
    }
    
    let invites = JSON.parse(localStorage.getItem('fanta_invites')) || [];
    // Evita duplicati pendenti
    if(!isGeneral && invites.some(i => i.toEmail === targetEmail && i.tournamentId === tourId && i.status === 'pending')) {
        alert("Hai già inviato un invito a questa persona per questo torneo!");
        return;
    }
    
    invites.push({
        id: 'inv_' + Date.now(),
        tournamentId: tourId || 'general',
        fromEmail: currentUserEmail,
        toEmail: targetEmail,
        status: 'pending'
    });
    localStorage.setItem('fanta_invites', JSON.stringify(invites));
    
    document.getElementById('invite-torneo-modal').style.display = 'none';
    alert(isGeneral ? "Invito generico spedito!" : "Invito al torneo spedito!");
}

function renderTornei() {
    const tourneysList = document.getElementById('profilo-tornei-list');
    if(!tourneysList || !currentUserEmail) return;
    
    let tourneys = JSON.parse(localStorage.getItem('fanta_tournaments')) || [];
    
    let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
    let myTeamsIds = localTeams.filter(t => t.ownerEmail === currentUserEmail).map(t => t.id);

    // Mostra il torneo se il docente lo ha creato O se ci ha iscritto delle sue squadre
    let myTourneys = tourneys.filter(t => {
        return t.ownerEmail === currentUserEmail || t.teams.some(teamId => myTeamsIds.includes(teamId));
    });
    
    tourneysList.innerHTML = '';
    if(myTourneys.length === 0) {
        tourneysList.innerHTML = '<i>Nessun torneo. Creane uno o unisciti tramite codice.</i>';
        return;
    }
    
    myTourneys.forEach(tour => {
        let allTeams = getAllTeams();
        
        let calculated = tour.teams.map(tid => {
            let tObj = allTeams.find(x => x.id === tid);
            if(!tObj) return null;
            let authPts = 0;
            tObj.authors.forEach(aid => {
                let a = AUTHORS.find(x => x.id === aid);
                if(a && a.isPointsRevealed) authPts += a.points;
            });
            return {
                team: tObj.name,
                totale: authPts + (tObj.missionsCompleted * 5)
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
            <div style="background:rgba(255,255,255,0.05); padding:10px 15px; border-radius:8px; border-left:3px solid var(--primary-color);">
                ${btnInvita}
                <div style="font-weight:bold; font-size:1.1rem; margin-bottom:10px; color:var(--primary-color);"> <i class="fa-solid fa-trophy"></i> ${tour.name}</div>
                ${rankHtml}
            </div>
        `;
    });
}

/* =========================================
   MISSIONI (USER SIDE)
========================================= */

function renderMissioniUtente() {
    if(!currentUserEmail) return;
    
    // 1. Popola la select delle squadre nel modale
    const select = document.getElementById('missione-squadra-select');
    if(select) {
        select.innerHTML = '<option value="">-- Seleziona una squadra --</option>';
        let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
        let myTeams = localTeams.filter(t => t.ownerEmail === currentUserEmail);
        
        myTeams.forEach(t => {
            select.innerHTML += `<option value="${t.id}">${t.name} (${t.classe})</option>`;
        });
    }
    
    // 2. Render missioni in attesa (pending) per le squadre dell'utente loggato
    const list = document.getElementById('missioni-pending-list');
    if(list) {
        list.innerHTML = '';
        let pending = JSON.parse(localStorage.getItem('fanta_missioni_pending')) || [];
        let localTeams = JSON.parse(localStorage.getItem('fanta_local_teams')) || [];
        let myTeamsIds = localTeams.filter(t => t.ownerEmail === currentUserEmail).map(t => t.id);
        
        let myPending = pending.filter(m => myTeamsIds.includes(m.teamId));
        
        if(myPending.length === 0) {
            list.innerHTML = '<div class="glass" style="padding:15px; text-align:center; color:var(--text-muted); font-size:0.85rem;"><i>Nessuna missione in coda. Inviandone una apparirà qui!</i></div>';
        } else {
            myPending.forEach(m => {
                let teamObj = localTeams.find(t => t.id === m.teamId);
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

function inviaMissione(event) {
    if(event) event.preventDefault();
    const select = document.getElementById('missione-squadra-select');
    const input = document.getElementById('missione-titolo-input');
    
    if(!select || !input) return;
    
    if(!select.value) { alert("Seleziona la squadra che ha svolto l'attività!"); return; }
    if(!input.value.trim()) { alert("Inserisci una breve descrizione della missione svolta!"); return; }
    
    let pending = JSON.parse(localStorage.getItem('fanta_missioni_pending')) || [];
    pending.push({
        id: 'mis_' + Date.now(),
        teamId: select.value,
        titolo: input.value.trim(),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('fanta_missioni_pending', JSON.stringify(pending));
    
    // Reset form e chiudi modale
    input.value = "";
    document.getElementById('nuova-missione-modal').style.display = 'none';
    
    alert("Missione inviata! Riceverai 5 punti sulla classifica missioni non appena il Game Master l'avrà verificata.");
    renderMissioniUtente();
}

