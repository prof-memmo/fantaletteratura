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
        await window.db.collection('fanta_users').doc(email).set({
            email: email,
            name: req.name,
            school: req.school,
            city: req.city,
            role: 'teacher',
            approvedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Rimuoviamo dalla collezione 'pending_requests'
        await window.db.collection('fanta_pending_requests').doc(req.id).delete();
        
        alert("Docente approvato con successo! Invio della mail in corso...");
        const appUrl = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
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
            `Puoi effettuare il login da qui:\n${appUrl}\n\n` +
            `Buon divertimento e che la letteratura sia con te!\n` +
            `Il team di Prof. Memmo`
        );

        // --- INTEGRAZIONE HUB ---
        try {
            const configHub = {
                apiKey: "AIzaSyD-n2m-kYEuzGXPMKclZTggf4Y5Zm8_cdM",
                authDomain: "prof-memmo-hub.firebaseapp.com",
                projectId: "prof-memmo-hub",
                storageBucket: "prof-memmo-hub.firebasestorage.app",
                messagingSenderId: "839149485689",
                appId: "1:839149485689:web:531776ce3cf495a6f23697"
            };
            let hubApp;
            if (!firebase.apps.find(a => a.name === 'Hub')) {
                hubApp = firebase.initializeApp(configHub, 'Hub');
            } else {
                hubApp = firebase.app('Hub');
            }
            await hubApp.firestore().collection("hub_posta_inviata").add({
                destinatarioEmail: email,
                destinatarioNome: nomeDocente,
                gioco: 'Fantaletteratura',
                oggetto: '✅ Benvenuto in Fantaletteratura!',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch(e) {
            console.warn("Errore salvataggio log nell'Hub:", e);
        }

        // Lancia il client di posta
        window.location.href = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
        
        // Ricarica la tabella dopo un breve delay
        setTimeout(() => {
            loadTeacherRequests();
        }, 1500);
        
        await window.renderAdminRichieste();
        await window.renderAdminDocenti();
    };

    window.rifiutaRichiesta = async function(id) {
        if(!confirm("Cancellare richiesta?")) return;
        try {
            await window.db.collection('fanta_pending_requests').doc(id).delete();
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

    window.sortAdminDocenti = function(col) {
        if (!window.adminDocentiSortObj) window.adminDocentiSortObj = { col: 'date', asc: false };
        if (window.adminDocentiSortObj.col === col) {
            window.adminDocentiSortObj.asc = !window.adminDocentiSortObj.asc;
        } else {
            window.adminDocentiSortObj.col = col;
            window.adminDocentiSortObj.asc = true;
        }
        window.renderAdminDocenti();
    };

    window.renderAdminDocenti = async function(filterText = '') {
        const list = document.getElementById('admin-docenti-list');
        const statsContainer = document.getElementById('admin-docenti-stats');
        if (!list) return;
        
        // Fetch all users to get counts
        const snapshotAll = await window.db.collection('fanta_users').get();
        const allUsers = snapshotAll.docs.map(doc => doc.data());
        
        const counts = {
            tutti: allUsers.length,
            teacher: allUsers.filter(u => u.role === 'teacher').length,
            guest: allUsers.filter(u => u.role === 'guest').length,
            student: allUsers.filter(u => u.role !== 'teacher' && u.role !== 'guest').length
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
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'student' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('student')">
                    <div class="stat-value">${counts.student}</div>
                    <div class="stat-label">STUDENTI</div>
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
            if (currentAdminDocentiFilter === 'student') {
                users = allUsers.filter(u => u.role !== 'teacher' && u.role !== 'guest');
            } else {
                users = allUsers.filter(u => u.role === currentAdminDocentiFilter);
            }
        }
        
        list.innerHTML = '';
        let filteredUsers = users.filter(u => {
            const q = filterText.toLowerCase();
            return (u.email || '').toLowerCase().includes(q) || (u.name || '').toLowerCase().includes(q);
        });

        if (filteredUsers.length === 0) {
            list.innerHTML = '<i>Nessun iscritto trovato.</i>';
            return;
        }

        const state = window.adminDocentiSortObj || { col: 'date', asc: false };
        filteredUsers.sort((a, b) => {
            let valA, valB;
            if (state.col === 'email') { valA = (a.email || '').toLowerCase(); valB = (b.email || '').toLowerCase(); }
            else if (state.col === 'role') { valA = (a.role || '').toLowerCase(); valB = (b.role || '').toLowerCase(); }
            else if (state.col === 'date') { 
                let dA = a.createdAt || a.joinedAt;
                let dB = b.createdAt || b.joinedAt;
                valA = dA ? (dA.toMillis ? dA.toMillis() : new Date(dA).getTime()) : 0; 
                valB = dB ? (dB.toMillis ? dB.toMillis() : new Date(dB).getTime()) : 0; 
            }
            else { valA = (a.email || '').toLowerCase(); valB = (b.email || '').toLowerCase(); }
            
            if (valA < valB) return state.asc ? -1 : 1;
            if (valA > valB) return state.asc ? 1 : -1;
            return 0;
        });

        list.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:2px solid var(--accent-gold); font-size:0.8rem; text-transform:uppercase; color:var(--accent-gold);">
                <div style="display:flex; gap:15px; width:100%;">
                    <div style="cursor:pointer; flex: 1;" onclick="window.sortAdminDocenti('role')">Ruolo <i class="fa-solid fa-sort" style="margin-left:5px; color:#888;"></i></div>
                    <div style="cursor:pointer; flex: 2;" onclick="window.sortAdminDocenti('email')">Utente <i class="fa-solid fa-sort" style="margin-left:5px; color:#888;"></i></div>
                    <div style="cursor:pointer; flex: 1;" onclick="window.sortAdminDocenti('date')">Data Iscrizione <i class="fa-solid fa-sort" style="margin-left:5px; color:#888;"></i></div>
                    <div style="flex: 1; text-align:right;">Azioni</div>
                </div>
            </div>
        `;

        filteredUsers.forEach(u => {
            let roleLabel = '';
            if (u.role === 'teacher') roleLabel = '<span style="color:#3498db; font-size:0.7rem; font-weight:800; text-transform:uppercase;">[Docente]</span>';
            else if (u.role === 'guest') roleLabel = '<span style="color:#e67e22; font-size:0.7rem; font-weight:800; text-transform:uppercase;">[Fantamico]</span>';
            else roleLabel = '<span style="color:#2ecc71; font-size:0.7rem; font-weight:800; text-transform:uppercase;">[Studente]</span>';
            
            let log = u.approvedAt ? `<br><small class="text-muted">Approvato: ${u.approvedAt.toDate ? u.approvedAt.toDate().toLocaleString() : u.approvedAt}</small>` : '';
            let dataIsc = u.createdAt || u.joinedAt;
            let dataStr = dataIsc ? (dataIsc.toDate ? dataIsc.toDate().toLocaleDateString() : new Date(dataIsc).toLocaleDateString()) : 'N/D';

            list.innerHTML += `<div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; gap:15px; width:100%; align-items:center;">
                    <div style="flex: 1;">${roleLabel}</div>
                    <div style="flex: 2;"><span>${u.email}</span> &mdash; <strong>${u.name || 'Senza Nome'}</strong>${log}</div>
                    <div style="flex: 1;"><span style="font-size:0.75rem; color:#888;"><i class="fa-solid fa-calendar-days"></i> ${dataStr}</span></div>
                    <div style="display:flex; align-items:center; gap:10px; flex: 1; justify-content:flex-end;">
                        <a href="mailto:${u.email}" title="Scrivi a ${u.name || 'Senza Nome'}" style="color:var(--accent-gold); text-decoration:none;"><i class="fa-solid fa-envelope"></i></a>
                        <button class="btn btn-secondary text-danger" style="padding:4px 8px; font-size:0.75rem; width:auto; background:var(--bg-card); border-color:var(--danger-color);" onclick="eliminaDocente('${u.email}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
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
        const snapshotAllUsers = await window.db.collection('fanta_users').get();
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
        const allUsersSnap = await window.db.collection('fanta_users').where("role", "==", "studente").get();
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
            const approvedSnap = await window.db.collection('fanta_missions').where("status", "==", "approved").get();
            const approvedCount = approvedSnap.size;
            
            const rejectedSnap = await window.db.collection('fanta_missions').where("status", "==", "rejected").get();
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
            const snap = await window.db.collection('fanta_missions').where("status", "==", "approved").get();
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
            if (targetId === 'admin-view-impostazioni' || targetId === 'admin-view-profilo') window.renderAdminImpostazioni();

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
        await window.renderAdminImpostazioni();
    }
}

window.renderAdminImpostazioni = async function() {
    const emailField = document.getElementById('admin-impostazioni-email') || document.getElementById('admin-profilo-email');
    if (emailField && currentUserEmail) emailField.value = currentUserEmail;

    // Renderizza pannello Live Editor Didattico
    if (window.LiveEditor && typeof window.LiveEditor.renderAdminPanel === 'function') {
        window.LiveEditor.renderAdminPanel('admin-live-editor-container');
    }

    const masterArea = document.getElementById('admin-master-area');
    const archivesArea = document.getElementById('admin-historical-archives-area');
    if (masterArea) {
        masterArea.style.display = (currentUserEmail === 'prof.memmo@gmail.com') ? 'block' : 'none';
    }
    if (archivesArea) {
        archivesArea.style.display = (currentUserEmail === 'prof.memmo@gmail.com') ? 'block' : 'none';
        if (currentUserEmail === 'prof.memmo@gmail.com' && window.loadHistoricalArchives) {
            await window.loadHistoricalArchives();
        }
    }
};
window.renderAdminProfilo = window.renderAdminImpostazioni;

    window.archiviaAnnoCorrente = async function() {
        if(currentUserEmail !== 'prof.memmo@gmail.com') return;
        const currentYear = new Date().getFullYear();
        if(!confirm(`Sei ASSOLUTAMENTE sicuro di voler archiviare l'anno ${currentYear}?`)) return;
        try {
            const backupName = prompt("Inserisci un nome per l'archivio (es: Fantaletteratura_2025_2026):", `Archivio_${currentYear}`);
            if(!backupName) return;
            
            const usersSnapshot = await window.db.collection('fanta_users').get();
            const teamsSnapshot = await window.db.collection('fanta_teams').get();
            
            let batch = window.db.batch();
            
            usersSnapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.role !== 'admin' && data.role !== 'docente') {
                    batch.update(doc.ref, { archivedYear: backupName, status: 'archived', teamId: null, teamCode: null });
                }
            });

            teamsSnapshot.docs.forEach(doc => {
                batch.update(doc.ref, { archivedYear: backupName, status: 'archived' });
            });

            if (window.fanta_db && window.fanta_db.clearMinigameLogs) {
                await window.fanta_db.clearMinigameLogs();
            }

            await batch.commit();
            alert(`Archiviazione "${backupName}" completata con successo. Studenti e squadre sono stati archiviati.`);
            window.location.reload();
        } catch(e) {
            console.error(e);
            alert("Errore archiviazione: " + e.message);
        }
    };

    window.ripristinaAnnoArchiviato = async function(backupName) {
        if(currentUserEmail !== 'prof.memmo@gmail.com') return;
        if(!confirm(`Sei ASSOLUTAMENTE sicuro di voler RIPRISTINARE l'anno archiviato "${backupName}"?\nQuesta operazione rimetterà in gioco tutte le squadre e gli studenti di quell'anno.`)) return;
        try {
            const usersSnapshot = await window.db.collection('fanta_users').where('archivedYear', '==', backupName).get();
            const teamsSnapshot = await window.db.collection('fanta_teams').where('archivedYear', '==', backupName).get();
            const archivesSnapshot = await window.db.collection('fanta_archives').where('yearName', '==', backupName).get();
            
            let batch = window.db.batch();
            
            usersSnapshot.docs.forEach(doc => {
                const data = doc.data();
                batch.update(doc.ref, { 
                    status: 'active', 
                    teamId: data.archivedTeamId || null, 
                    teamCode: data.archivedTeamCode || null,
                    archivedYear: firebase.firestore.FieldValue.delete(),
                    archivedTeamId: firebase.firestore.FieldValue.delete(),
                    archivedTeamCode: firebase.firestore.FieldValue.delete()
                });
            });

            teamsSnapshot.docs.forEach(doc => {
                batch.update(doc.ref, { 
                    status: 'approved',
                    archivedYear: firebase.firestore.FieldValue.delete()
                });
            });

            archivesSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            alert(`Ripristino dell'anno "${backupName}" completato con successo!`);
            window.location.reload();
        } catch(e) {
            console.error(e);
            alert("Errore durante il ripristino: " + e.message);
        }
    };

    window.loadHistoricalArchives = async function() {
        if(currentUserEmail !== 'prof.memmo@gmail.com') return;
        try {
            const snapshot = await window.db.collection('fanta_archives').orderBy('timestamp', 'desc').get();
            const container = document.getElementById('admin-historical-archives-list');
            if(!container) return;
            
            if(snapshot.empty) {
                container.innerHTML = '<p style="color:var(--text-muted); font-size: 0.9rem;">Nessun anno archiviato trovato.</p>';
                return;
            }
            
            let html = '<div style="display: flex; flex-direction: column; gap: 15px;">';
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const d = data.timestamp ? data.timestamp.toDate().toLocaleDateString() : 'Data Sconosciuta';
                
                let lbHtml = '<div style="margin-top:10px; display:none; background:rgba(0,0,0,0.2); padding:10px; border-radius:6px;" id="archive-lb-'+doc.id+'">';
                lbHtml += '<h4 style="margin-bottom:10px; color:var(--gold); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">Classifica Finale</h4>';
                
                if(data.leaderboard && data.leaderboard.length > 0) {
                    data.leaderboard.forEach((t, i) => {
                        let badge = '';
                        if(i===0) badge = '🥇';
                        else if(i===1) badge = '🥈';
                        else if(i===2) badge = '🥉';
                        else badge = (i+1)+'°';
                        
                        lbHtml += `<div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px dashed rgba(255,255,255,0.05); font-size:0.9rem;">
                            <span>${badge} <strong>${t.name}</strong> <span style="color:var(--text-muted); font-size:0.8rem;">(${t.classRoom} - ${t.school})</span></span>
                            <span style="color:var(--gold); font-weight:bold;">${t.points} pt</span>
                        </div>`;
                    });
                } else {
                    lbHtml += '<p style="font-size:0.85rem; color:var(--text-muted);">Classifica non disponibile o vuota.</p>';
                }
                lbHtml += '</div>';

                html += `
                <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <h4 style="margin: 0; color: var(--text-light); font-size: 1.1rem;"><i class="fa-solid fa-box-archive" style="color:var(--accent-gold);"></i> ${data.yearName}</h4>
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Archiviato il: ${d}</div>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="const el = document.getElementById('archive-lb-${doc.id}'); el.style.display = el.style.display === 'none' ? 'block' : 'none';"><i class="fa-solid fa-eye"></i> Classifica</button>
                            <button class="btn text-danger" style="background: rgba(231, 76, 60, 0.1); border: 1px solid var(--danger-color); padding: 6px 12px; font-size: 0.8rem;" onclick="window.ripristinaAnnoArchiviato('${data.yearName}')"><i class="fa-solid fa-rotate-left"></i> Ripristina</button>
                        </div>
                    </div>
                    ${lbHtml}
                </div>`;
            });
            html += '</div>';
            container.innerHTML = html;
        } catch(e) {
            console.error("Errore caricamento archivio storico:", e);
        }
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
        await window.db.collection('fanta_missions').doc(mid).update({ status: 'rejected' });
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


