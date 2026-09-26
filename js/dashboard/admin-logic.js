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

    let currentAdminDocentiFilter = 'tutti';
    
    function getCanonicalEmail(emailOrId) {
        if (!emailOrId) return '';
        let em = String(emailOrId).toLowerCase().trim();
        if (em.endsWith('@gmail.com')) {
            const parts = em.split('@');
            em = parts[0].replace(/\./g, '') + '@gmail.com';
        }
        return em;
    }

    window.setAdminDocentiFilter = function(f) {
        currentAdminDocentiFilter = f;
        const searchInput = document.getElementById('admin-docenti-search');
        if(searchInput) searchInput.value = '';
        window.renderAdminDocenti();
    };

    window.filtraDocentiPerScuola = function(schoolName) {
        window.setAdminDocentiFilter('teacher');
        const searchInput = document.getElementById('admin-docenti-search');
        if (searchInput) {
            searchInput.value = schoolName;
        }
        window.renderAdminDocenti(schoolName);
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
        
        // Fetch all users and deduplicate canonical accounts
        const snapshotAll = await window.db.collection('fanta_users').get();
        const userMap = new Map();
        snapshotAll.docs.forEach(doc => {
            const data = doc.data();
            const rawEmail = (data.email || doc.id || '').trim();
            const key = getCanonicalEmail(rawEmail);
            if (!key) return;

            if (!userMap.has(key)) {
                userMap.set(key, {
                    id: doc.id,
                    docIds: [doc.id],
                    ...data,
                    email: data.email || (doc.id.includes('@') ? doc.id : rawEmail)
                });
            } else {
                const existing = userMap.get(key);
                existing.docIds.push(doc.id);
                userMap.set(key, {
                    ...existing,
                    ...data,
                    id: existing.id,
                    docIds: existing.docIds,
                    email: existing.email || data.email,
                    name: (data.name && data.name !== 'Senza Nome') ? data.name : (existing.name || 'Senza Nome'),
                    school: (data.school || data.scuola || existing.school || existing.scuola || '').trim(),
                    scuola: (data.school || data.scuola || existing.school || existing.scuola || '').trim(),
                    role: (data.role || existing.role || 'student'),
                    createdAt: existing.createdAt || data.createdAt,
                    joinedAt: existing.joinedAt || data.joinedAt
                });
            }
        });
        const allUsers = Array.from(userMap.values());
        
        const isTeacher = (u) => u.role === 'teacher' || u.role === 'docente' || u.role === 'admin';
        const isGuest = (u) => u.role === 'guest';
        const isArchived = (u) => u.status === 'archived' || !!u.archivedYear;
        const isStudentActive = (u) => !isTeacher(u) && !isGuest(u) && !isArchived(u);
        const isStudentArchived = (u) => !isTeacher(u) && !isGuest(u) && isArchived(u);

        const scuoleSet = new Set();
        allUsers.forEach(u => {
            if (!isArchived(u)) {
                let sc = (u.school || u.scuola || '').trim();
                if (sc && sc.toUpperCase() !== 'N/A' && sc.toUpperCase() !== 'N/D') scuoleSet.add(sc.toLowerCase());
            }
        });

        const counts = {
            tutti: allUsers.filter(u => !isArchived(u)).length,
            teacher: allUsers.filter(u => isTeacher(u)).length,
            student: allUsers.filter(u => isStudentActive(u)).length,
            guest: allUsers.filter(u => isGuest(u) && !isArchived(u)).length,
            archived: allUsers.filter(u => isArchived(u)).length,
            scuole: scuoleSet.size
        };
        
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'tutti' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('tutti')">
                    <div class="stat-value">${counts.tutti}</div>
                    <div class="stat-label">TUTTI ATTIVI</div>
                </div>
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'teacher' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('teacher')">
                    <div class="stat-value">${counts.teacher}</div>
                    <div class="stat-label">DOCENTI</div>
                </div>
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'student' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('student')">
                    <div class="stat-value">${counts.student}</div>
                    <div class="stat-label">STUDENTI ATTIVI</div>
                </div>
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'archived' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('archived')">
                    <div class="stat-value" style="color: #94a3b8;">${counts.archived}</div>
                    <div class="stat-label">ARCHIVIATI (READ-ONLY)</div>
                </div>
                <div class="admin-stat-card ${currentAdminDocentiFilter === 'scuole' ? 'active' : ''}" onclick="window.setAdminDocentiFilter('scuole')">
                    <div class="stat-value">${counts.scuole}</div>
                    <div class="stat-label">SCUOLE ATTIVE</div>
                </div>
            `;
        }

        list.innerHTML = '<p class="text-center">Caricamento...</p>';
        
        // --- VISTA DEDICATA SCUOLE ATTIVE ---
        if (currentAdminDocentiFilter === 'scuole') {
            let allTeams = [];
            try {
                if (typeof getAllTeams === 'function') {
                    allTeams = await getAllTeams();
                }
            } catch (e) {
                console.warn("Recupero squadre per scuole:", e);
            }

            const schoolGroups = {};
            allUsers.forEach(u => {
                if (!isArchived(u)) {
                    let sc = (u.school || u.scuola || '').trim();
                    if (sc && sc.toUpperCase() !== 'N/A' && sc.toUpperCase() !== 'N/D') {
                        const normKey = sc.toLowerCase();
                        if (!schoolGroups[normKey]) {
                            schoolGroups[normKey] = {
                                name: sc,
                                docenti: [],
                                studenti: [],
                                teams: []
                            };
                        }
                        if (isTeacher(u)) {
                            schoolGroups[normKey].docenti.push(u);
                        } else {
                            schoolGroups[normKey].studenti.push(u);
                        }
                    }
                }
            });

            // Associa squadre alle scuole tramite docenti
            allTeams.forEach(t => {
                const ownerEmail = (t.ownerEmail || '').toLowerCase();
                const teacherMatch = allUsers.find(u => (u.email || '').toLowerCase() === ownerEmail);
                if (teacherMatch) {
                    const sc = (teacherMatch.school || teacherMatch.scuola || '').trim().toLowerCase();
                    if (schoolGroups[sc]) {
                        schoolGroups[sc].teams.push(t);
                    }
                }
            });

            let schoolsList = Object.values(schoolGroups);

            if (filterText) {
                const q = filterText.toLowerCase();
                schoolsList = schoolsList.filter(s => {
                    const nameMatch = s.name.toLowerCase().includes(q);
                    const docMatch = s.docenti.some(d => (d.name || '').toLowerCase().includes(q) || (d.email || '').toLowerCase().includes(q));
                    return nameMatch || docMatch;
                });
            }

            if (schoolsList.length === 0) {
                list.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">Nessuna scuola attiva trovata con i filtri correnti.</p>';
                return;
            }

            list.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:2px solid var(--accent-gold); font-size:0.8rem; text-transform:uppercase; color:var(--accent-gold);">
                    <div style="display:flex; gap:15px; width:100%;">
                        <div style="flex: 2;">Scuola</div>
                        <div style="flex: 3;">Docenti Coinvolti</div>
                        <div style="flex: 2;">Squadre / Attività</div>
                        <div style="flex: 1; text-align:right;">Azioni</div>
                    </div>
                </div>
            `;

            schoolsList.forEach(s => {
                const docentiHtml = s.docenti.length > 0
                    ? s.docenti.map(d => `
                        <div style="margin-bottom: 4px; display:flex; align-items:center; gap:6px;">
                            <i class="fa-solid fa-chalkboard-user" style="color:var(--accent-gold); font-size:0.75rem;"></i>
                            <span style="font-weight:600; color:#fff; font-size:0.85rem;">${d.name || 'Docente'}</span>
                            <span style="font-size:0.75rem; color:#888;">(${d.email})</span>
                        </div>
                    `).join('')
                    : '<i style="color:#888; font-size:0.8rem;">Nessun docente registrato</i>';

                const teamsCount = s.teams.length;
                const docEmails = s.docenti.map(d => d.email).filter(Boolean).join(',');

                list.innerHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                        <div style="display:flex; gap:15px; width:100%; align-items:center;">
                            <div style="flex: 2;">
                                <div style="font-weight: 700; color: #fff; font-size: 0.95rem; display:flex; align-items:center; gap:8px;">
                                    <i class="fa-solid fa-school" style="color:var(--primary-color);"></i>
                                    ${s.name}
                                </div>
                                <div style="font-size:0.75rem; color:#888; margin-top:4px;">
                                    ${s.docenti.length} ${s.docenti.length === 1 ? 'Docente' : 'Docenti'} &bull; ${s.studenti.length} Studenti Attivi
                                </div>
                            </div>
                            <div style="flex: 3;">
                                ${docentiHtml}
                            </div>
                            <div style="flex: 2;">
                                <span class="badge" style="background: rgba(141,160,63,0.15); color: var(--primary-color); border: 1px solid var(--primary-color); padding: 4px 10px; border-radius: 12px; font-size: 0.78rem; font-weight:600;">
                                    <i class="fa-solid fa-users-rectangle"></i> ${teamsCount} ${teamsCount === 1 ? 'Squadra' : 'Squadre'}
                                </span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; flex: 1; justify-content:flex-end;">
                                ${docEmails ? `<a href="mailto:${docEmails}" title="Scrivi ai docenti di ${s.name}" class="btn btn-secondary" style="padding:4px 8px; font-size:0.8rem; width:auto; text-decoration:none;"><i class="fa-solid fa-envelope"></i></a>` : ''}
                                <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem; width:auto;" onclick="window.filtraDocentiPerScuola('${s.name.replace(/'/g, "\\'")}')" title="Vedi i docenti">
                                    <i class="fa-solid fa-users"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            return;
        }
        
        let users = allUsers;
        if (currentAdminDocentiFilter === 'tutti') {
            users = allUsers.filter(u => !isArchived(u));
        } else if (currentAdminDocentiFilter === 'student') {
            users = allUsers.filter(u => isStudentActive(u));
        } else if (currentAdminDocentiFilter === 'teacher') {
            users = allUsers.filter(u => isTeacher(u));
        } else if (currentAdminDocentiFilter === 'guest') {
            users = allUsers.filter(u => isGuest(u) && !isArchived(u));
        } else if (currentAdminDocentiFilter === 'archived') {
            users = allUsers.filter(u => isArchived(u));
        }
        
        list.innerHTML = '';
        let filteredUsers = users.filter(u => {
            const q = filterText.toLowerCase();
            return (u.email || '').toLowerCase().includes(q) || (u.name || '').toLowerCase().includes(q) || (u.school || u.scuola || '').toLowerCase().includes(q) || (u.archivedYear || '').toLowerCase().includes(q);
        });

        if (filteredUsers.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">Nessun iscritto trovato per questo filtro.</p>';
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
                    <div style="cursor:pointer; flex: 1;" onclick="window.sortAdminDocenti('role')">Ruolo / Stato <i class="fa-solid fa-sort" style="margin-left:5px; color:#888;"></i></div>
                    <div style="cursor:pointer; flex: 2;" onclick="window.sortAdminDocenti('email')">Utente <i class="fa-solid fa-sort" style="margin-left:5px; color:#888;"></i></div>
                    <div style="cursor:pointer; flex: 1;" onclick="window.sortAdminDocenti('date')">Data Iscrizione <i class="fa-solid fa-sort" style="margin-left:5px; color:#888;"></i></div>
                    <div style="flex: 1; text-align:right;">Azioni</div>
                </div>
            </div>
        `;

        filteredUsers.forEach(u => {
            let dataIsc = u.createdAt || u.joinedAt;
            let dataStr = dataIsc ? (dataIsc.toDate ? dataIsc.toDate().toLocaleDateString() : new Date(dataIsc).toLocaleDateString()) : 'N/D';
            const userEmail = (u.email || u.id || '').toLowerCase();
            const schoolBadge = (u.school || u.scuola) ? `<span style="font-size:0.7rem; color:#888; display:block;"><i class="fa-solid fa-school"></i> ${u.school || u.scuola}</span>` : '';
            const isSuperAdminUser = getCanonicalEmail(userEmail) === 'profmemmo@gmail.com' || userEmail === 'guglielmo.piersanti@padregemelli.net';
            const userIsArchived = isArchived(u);
            const archiveYearLabel = u.archivedYear ? `Archivio ${u.archivedYear}` : 'Archiviato';
            const archiveBadge = userIsArchived 
                ? `<span class="badge" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); font-size: 0.68rem; padding: 2px 7px; border-radius: 10px; font-weight: 700; margin-left: 6px; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-lock"></i> ${archiveYearLabel} (Read-Only)</span>`
                : '';

            let roleControlHtml = '';
            if (userIsArchived) {
                roleControlHtml = `
                    <select class="input-field" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 8px; background: rgba(0,0,0,0.25); color: #888; border: 1px dashed rgba(255,255,255,0.15); cursor: not-allowed;" disabled title="Account archiviato in sola lettura">
                        <option selected>🔒 Studente (Archiviato)</option>
                    </select>
                `;
            } else {
                roleControlHtml = `
                    <select class="input-field" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 8px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2);" onchange="window.cambiaRuoloFantaUser('${userEmail}', this.value)" ${isSuperAdminUser ? 'disabled' : ''}>
                        <option value="student" ${!isTeacher(u) && !isGuest(u) ? 'selected' : ''}>Studente</option>
                        <option value="teacher" ${isTeacher(u) ? 'selected' : ''}>Docente</option>
                        <option value="guest" ${isGuest(u) ? 'selected' : ''}>Fantamico</option>
                    </select>
                `;
            }

            list.innerHTML += `<div style="display:flex; justify-content:space-between; align-items:center; padding:12px 10px; border-bottom:1px solid rgba(255,255,255,0.05); ${userIsArchived ? 'opacity: 0.85; background: rgba(255,255,255,0.01);' : ''}">
                <div style="display:flex; gap:15px; width:100%; align-items:center;">
                    <div style="flex: 1;">
                        ${roleControlHtml}
                    </div>
                    <div style="flex: 2;">
                        <span style="font-weight: 700; color: #fff;">${u.name || 'Senza Nome'}</span>
                        ${archiveBadge}
                        <div style="font-size:0.8rem; color:#aaa;">${userEmail}</div>
                        ${schoolBadge}
                    </div>
                    <div style="flex: 1;"><span style="font-size:0.75rem; color:#888;"><i class="fa-solid fa-calendar-days"></i> ${dataStr}</span></div>
                    <div style="display:flex; align-items:center; gap:10px; flex: 1; justify-content:flex-end;">
                        <a href="mailto:${userEmail}" title="Scrivi a ${u.name || 'Senza Nome'}" style="color:var(--accent-gold); text-decoration:none; font-size: 1rem;"><i class="fa-solid fa-envelope"></i></a>
                        ${!isSuperAdminUser ? `
                            <button class="btn btn-secondary text-danger" style="padding:4px 8px; font-size:0.75rem; width:auto; background:var(--bg-card); border-color:var(--danger-color); cursor:pointer;" onclick="eliminaDocente('${userEmail}')" title="Elimina Utente"><i class="fa-solid fa-trash"></i></button>
                        ` : ''}
                    </div>
                </div>
            </div>`;
        });
    };

    window.cambiaRuoloFantaUser = async function(email, newRole) {
        try {
            const canonical = getCanonicalEmail(email);
            const snapshotAll = await window.db.collection('fanta_users').get();
            const batch = window.db.batch();
            let matched = 0;
            snapshotAll.docs.forEach(doc => {
                const data = doc.data();
                const rawEmail = (data.email || doc.id || '').trim();
                if (getCanonicalEmail(rawEmail) === canonical || doc.id.toLowerCase() === email.toLowerCase()) {
                    batch.update(doc.ref, {
                        role: newRole,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    matched++;
                }
            });
            if (matched > 0) {
                await batch.commit();
            } else {
                await window.db.collection('fanta_users').doc(email.toLowerCase()).set({
                    role: newRole,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            }
            window.renderAdminDocenti();
        } catch(e) {
            console.error("Errore cambio ruolo:", e);
            alert("Errore durante l'aggiornamento del ruolo.");
        }
    };

    window.eliminaDocente = async function(email) {
        if(!confirm(`Sei sicuro di voler eliminare l'account ${email}?`)) return;
        try {
            const canonical = getCanonicalEmail(email);
            const snapshotAll = await window.db.collection('fanta_users').get();
            const batch = window.db.batch();
            let matched = 0;
            snapshotAll.docs.forEach(doc => {
                const data = doc.data();
                const rawEmail = (data.email || doc.id || '').trim();
                if (getCanonicalEmail(rawEmail) === canonical || doc.id.toLowerCase() === email.toLowerCase()) {
                    batch.delete(doc.ref);
                    matched++;
                }
            });
            if (matched > 0) {
                await batch.commit();
            } else {
                await window.db.collection('fanta_users').doc(email.toLowerCase()).delete();
            }
            window.renderAdminDocenti();
        } catch (e) {
            console.error(e);
            alert("Errore durante l'eliminazione del docente.");
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
                                <div style="font-weight: bold; color: var(--accent-gold);">${studentiDiQuesta.length}/5</div>
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
                                    <i class="fa-solid fa-users"></i> Studenti Iscritti (${studentiDiQuesta.length}/5)
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
            if (targetId === 'admin-view-calendario') window.renderAdminCalendario();
            if (targetId === 'admin-view-imprevisti') window.renderAdminImprevisti();
            if (targetId === 'admin-view-docenti') window.renderAdminDocenti();
            if (targetId === 'admin-view-squadre') window.renderAdminSquadre();
            if (targetId === 'admin-view-missioni') { window.renderAdminMissioni(); window.renderAdminMissioniPending(); }
            if (targetId === 'admin-view-classifica') window.renderAdminClassifica();
            if (targetId === 'admin-view-tornei') window.renderAdminTornei();
            if (targetId === 'admin-view-regolamento') window.renderAdminRegolamento();
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
        await window.renderAdminCalendario();
        await window.renderAdminImprevisti();
        await window.renderAdminDocenti();
        await window.renderAdminSquadre();
        await window.renderAdminMissioni();
        await window.renderAdminMissioniPending();
        await window.renderAdminClassifica();
        await window.renderAdminTornei();
        await window.renderAdminRegolamento();
        await window.renderAdminImpostazioni();
    }
}

// Global hook per render regolamento
window.renderAdminRegolamento = function() {
    if (window.RulesService) {
        window.RulesService.renderAdminEditor('admin-regolamento-container');
    }
};

// =========================================================
// GESTIONE CALENDARIO USCITE & AUTO-VALIDAZIONI ADMIN
// =========================================================
window.currentCalendarFilter = 'all';
window.calendarViewMode = 'grid'; // 'grid' | 'list'
window.calendarCurrentYear = 2026;
window.calendarCurrentMonth = 8; // Settembre (0-indexed)

const CALENDAR_MONTH_NAMES = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

window.switchCalendarView = function(viewMode) {
    window.calendarViewMode = viewMode;
    const btnGrid = document.getElementById('btn-view-cal-grid');
    const btnList = document.getElementById('btn-view-cal-list');
    const monthWrapper = document.getElementById('admin-calendar-month-wrapper');
    const listWrapper = document.getElementById('admin-calendar-releases-list');

    if (viewMode === 'grid') {
        if (btnGrid) {
            btnGrid.classList.add('active');
            btnGrid.style.background = 'var(--primary-color)';
            btnGrid.style.color = 'var(--bg-dark)';
            btnGrid.style.fontWeight = 'bold';
        }
        if (btnList) {
            btnList.classList.remove('active');
            btnList.style.background = 'transparent';
            btnList.style.color = '#fff';
            btnList.style.fontWeight = 'normal';
        }
        if (monthWrapper) monthWrapper.style.display = 'block';
        if (listWrapper) listWrapper.style.display = 'none';
        window.renderMonthlyCalendar();
    } else {
        if (btnList) {
            btnList.classList.add('active');
            btnList.style.background = 'var(--primary-color)';
            btnList.style.color = 'var(--bg-dark)';
            btnList.style.fontWeight = 'bold';
        }
        if (btnGrid) {
            btnGrid.classList.remove('active');
            btnGrid.style.background = 'transparent';
            btnGrid.style.color = '#fff';
            btnGrid.style.fontWeight = 'normal';
        }
        if (monthWrapper) monthWrapper.style.display = 'none';
        if (listWrapper) listWrapper.style.display = 'flex';
        window.renderAdminCalendarioList();
    }
};

window.prevCalendarMonth = function() {
    window.calendarCurrentMonth--;
    if (window.calendarCurrentMonth < 0) {
        window.calendarCurrentMonth = 11;
        window.calendarCurrentYear--;
    }
    window.renderMonthlyCalendar();
};

window.nextCalendarMonth = function() {
    window.calendarCurrentMonth++;
    if (window.calendarCurrentMonth > 11) {
        window.calendarCurrentMonth = 0;
        window.calendarCurrentYear++;
    }
    window.renderMonthlyCalendar();
};

window.filterCalendarView = function(modeFilter) {
    window.currentCalendarFilter = modeFilter || 'all';
    document.querySelectorAll('#admin-view-calendario .admin-mode-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`#admin-view-calendario .admin-mode-filter-btn[onclick*="'${window.currentCalendarFilter}'"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    if (window.calendarViewMode === 'grid') {
        window.renderMonthlyCalendar();
    } else {
        window.renderAdminCalendarioList();
    }
};

window.renderMonthlyCalendar = function() {
    const gridEl = document.getElementById('admin-calendar-month-grid');
    const titleEl = document.getElementById('admin-calendar-month-title');
    if (!gridEl) return;

    const year = window.calendarCurrentYear;
    const month = window.calendarCurrentMonth;

    if (titleEl) {
        titleEl.innerText = `${CALENDAR_MONTH_NAMES[month]} ${year}`;
    }

    if (!window.CalendarService) return;

    const allReleases = window.CalendarService.getReleases();
    const filter = window.currentCalendarFilter || 'all';

    const filteredReleases = allReleases.filter(r => {
        if (filter === 'all') return true;
        if (filter === 'seconde') return r.mode === 'seconde';
        if (filter === 'terze_avanzato') return r.mode === 'terze_avanzato' || r.mode === 'terze' || r.mode === 'avanzato';
        return true;
    });

    // Mappa uscite per data: 'YYYY-MM-DD' -> [releases]
    const releasesByDate = {};
    filteredReleases.forEach(r => {
        if (!releasesByDate[r.effectiveDate]) releasesByDate[r.effectiveDate] = [];
        releasesByDate[r.effectiveDate].push(r);
    });

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Giorno della settimana dell'1 del mese (0=Dom, 1=Lun, ..., 6=Sab)
    // Convertiamo a 0=Lun, ..., 6=Dom
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6;

    const totalDays = lastDayOfMonth.getDate();

    // Data odierna in stringa
    const todayStr = window.CalendarService.getTodayDateString();

    let gridHtml = '';

    // Giorni del mese precedente per riempire la prima settimana
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const d = prevMonthLastDay - i;
        gridHtml += `
            <div class="admin-cal-day-cell other-month">
                <div class="admin-cal-day-header">
                    <span class="admin-cal-day-num">${d}</span>
                </div>
            </div>
        `;
    }

    // Giorni del mese corrente
    for (let day = 1; day <= totalDays; day++) {
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateKey = `${year}-${monthStr}-${dayStr}`;

        const isToday = dateKey === todayStr;
        const dayEvents = releasesByDate[dateKey] || [];
        const hasEvent = dayEvents.length > 0;

        let eventsHtml = '';
        dayEvents.forEach(rel => {
            const isOrange = rel.mode === 'seconde';
            const colorClass = isOrange ? 'mode-orange' : 'mode-green';
            const iconEmoji = isOrange ? '📙' : '📘';

            let statusIcon = '⏳';
            if (rel.status === 'released') statusIcon = '🟢';
            else if (rel.status === 'forced') statusIcon = '⚡';
            else if (rel.status === 'blocked') statusIcon = '🔒';

            eventsHtml += `
                <div class="admin-cal-event-pill ${colorClass}" onclick="window.openCalendarEventDetails('${rel.id}')" title="${rel.title} - Clicca per dettagli">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span>${iconEmoji} ${rel.groupTitle.split(':')[0]}</span>
                        <span>${statusIcon}</span>
                    </div>
                    <div style="font-size:0.68rem; opacity:0.95; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${rel.groupTitle.split(':')[1] || rel.title}
                    </div>
                    ${rel.hazardText ? `
                        <div style="font-size:0.63rem; color: #fde047; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display: flex; align-items: center; gap: 3px;" title="${rel.hazardText.replace(/"/g, '&quot;')}">
                            <i class="fa-solid fa-scroll"></i> ${rel.hazardText}
                        </div>
                    ` : ''}
                    ${rel.isMarketOpen ? `
                        <div style="font-size:0.63rem; color: #93c5fd; font-weight: bold; display: flex; align-items: center; gap: 3px;">
                            <i class="fa-solid fa-repeat"></i> Mercato Attivo
                        </div>
                    ` : ''}
                    <div class="admin-cal-event-status">
                        <span>${rel.authorIds ? rel.authorIds.length : 0} Autori</span> &bull; 
                        <span>${rel.isReleased ? 'Sbloccato' : 'In attesa'}</span>
                    </div>
                </div>
            `;
        });

        gridHtml += `
            <div class="admin-cal-day-cell ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">
                <div class="admin-cal-day-header">
                    <span class="admin-cal-day-num">${day}</span>
                    ${hasEvent ? `<span style="font-size:0.65rem; color:var(--accent-gold); font-weight:bold;">${dayEvents.length} Reel</span>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:4px; overflow-y:auto;">
                    ${eventsHtml}
                </div>
            </div>
        `;
    }

    // Giorni del mese successivo per completare la griglia a multiplo di 7
    const totalRendered = startDayOfWeek + totalDays;
    const remaining = (7 - (totalRendered % 7)) % 7;
    for (let nextDay = 1; nextDay <= remaining; nextDay++) {
        gridHtml += `
            <div class="admin-cal-day-cell other-month">
                <div class="admin-cal-day-header">
                    <span class="admin-cal-day-num">${nextDay}</span>
                </div>
            </div>
        `;
    }

    gridEl.innerHTML = gridHtml;
};

window.renderAdminCalendario = function() {
    if (window.calendarViewMode === 'grid') {
        window.renderMonthlyCalendar();
    } else {
        window.renderAdminCalendarioList();
    }
};

window.renderAdminCalendarioList = function() {
    const listContainer = document.getElementById('admin-calendar-releases-list');
    if (!listContainer) return;

    if (!window.CalendarService) {
        listContainer.innerHTML = '<p class="text-muted" style="text-align:center;">Servizio Calendario in caricamento...</p>';
        return;
    }

    const allReleases = window.CalendarService.getReleases();
    const filter = window.currentCalendarFilter || 'all';

    const filtered = allReleases.filter(r => {
        if (filter === 'all') return true;
        if (filter === 'seconde') return r.mode === 'seconde';
        if (filter === 'terze_avanzato') return r.mode === 'terze_avanzato' || r.mode === 'terze' || r.mode === 'avanzato';
        return true;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = '<p class="text-muted" style="text-align:center;">Nessuna uscita trovata per questo filtro.</p>';
        return;
    }

    const allAuthorsMap = {};
    const collectAuthors = (list) => {
        if (Array.isArray(list)) {
            list.forEach(a => { allAuthorsMap[a.id] = a; });
        }
    };
    if (typeof AUTHORS !== 'undefined') collectAuthors(AUTHORS);
    if (typeof AUTHORS_SECONDE !== 'undefined') collectAuthors(AUTHORS_SECONDE);
    if (typeof AUTHORS_INTERNAZIONALI !== 'undefined') collectAuthors(AUTHORS_INTERNAZIONALI);

    listContainer.innerHTML = filtered.map(rel => {
        let statusBadge = '';
        let borderStyle = '1px solid rgba(255,255,255,0.1)';
        let bgStyle = 'rgba(255,255,255,0.03)';

        if (rel.status === 'released') {
            statusBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; display: inline-flex; align-items: center; gap: 5px;"><i class="fa-solid fa-circle-check"></i> Validato (Data Raggiunta)</span>`;
            borderStyle = '1px solid rgba(34, 197, 94, 0.4)';
        } else if (rel.status === 'forced') {
            statusBadge = `<span style="background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid #eab308; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; display: inline-flex; align-items: center; gap: 5px;"><i class="fa-solid fa-bolt"></i> Forzato Manualmente</span>`;
            borderStyle = '1px solid rgba(234, 179, 8, 0.4)';
        } else if (rel.status === 'blocked') {
            statusBadge = `<span style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; display: inline-flex; align-items: center; gap: 5px;"><i class="fa-solid fa-lock"></i> Bloccato dall'Admin</span>`;
            borderStyle = '1px solid rgba(239, 68, 68, 0.4)';
        } else {
            statusBadge = `<span style="background: rgba(59, 130, 246, 0.15); color: #93c5fd; border: 1px solid #3b82f6; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; display: inline-flex; align-items: center; gap: 5px;"><i class="fa-solid fa-clock"></i> Programmato (${rel.effectiveDate})</span>`;
        }

        const modeBadge = rel.mode === 'seconde'
            ? `<span style="background: rgba(212, 114, 26, 0.2); color: #fb923c; border: 1px solid #d4721a; padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: bold;">📙 Età Medievale e Moderna</span>`
            : `<span style="background: rgba(141, 160, 63, 0.2); color: #bef264; border: 1px solid #8da03f; padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: bold;">📘 Contemporanea &amp; Internazionali</span>`;

        // Render lista autori nel gruppo
        const authorsHtml = (rel.authorIds || []).map(aid => {
            const author = allAuthorsMap[aid] || { id: aid, name: aid, image: 'avatar_autori/default.png' };
            const isVal = rel.isReleased;
            return `
                <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.25); padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                    <img src="${author.image || 'avatar_autori/default.png'}" style="width: 26px; height: 26px; border-radius: 50%; object-fit: cover; background: #fff;">
                    <span style="font-size: 0.8rem; font-weight: 600; color: #fff;">${author.name}</span>
                    <span style="font-size: 0.7rem; color: ${isVal ? '#4ade80' : '#94a3b8'}; margin-left: auto;">${isVal ? '✅ Sbloccato' : '⏳ In attesa'}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="glass" style="padding: 16px; border-radius: 14px; border: ${borderStyle}; background: ${bgStyle};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px;">
                            ${modeBadge}
                            ${statusBadge}
                        </div>
                        <h3 style="margin: 0; font-size: 1.05rem; color: var(--accent-gold);">${rel.title}</h3>
                        <p style="margin: 3px 0 0 0; font-size: 0.85rem; color: var(--text-light); font-weight: bold;">${rel.groupTitle}</p>
                    </div>

                    <!-- Controlli Data e Azioni Rapide -->
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15);">
                            <label style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-calendar"></i> Data:</label>
                            <input type="date" value="${rel.effectiveDate}" style="background: transparent; border: none; color: #fff; font-size: 0.85rem; font-family: monospace; outline: none; cursor: pointer;" onchange="window.updateCalendarReleaseDate('${rel.id}', this.value)">
                        </div>

                        ${rel.isForced ? `
                            <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 6px 10px; border-radius: 8px;" onclick="window.resetCalendarRelease('${rel.id}')" title="Ripristina al controllo automatico per data">
                                <i class="fa-solid fa-rotate-left"></i> Ripristina Auto
                            </button>
                        ` : `
                            <button class="btn" style="background: #eab308; color: #000; font-weight: bold; font-size: 0.75rem; padding: 6px 10px; border-radius: 8px; border: none; cursor: pointer;" onclick="window.toggleForceCalendarRelease('${rel.id}', true)" title="Sblocca e valida subito gli autori del gruppo">
                                <i class="fa-solid fa-bolt"></i> Sblocca Ora
                            </button>
                        `}

                        ${rel.isBlocked ? `
                            <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 6px 10px; border-radius: 8px;" onclick="window.toggleBlockCalendarRelease('${rel.id}', false)" title="Rimuovi blocco">
                                <i class="fa-solid fa-lock-open"></i> Sblocca
                            </button>
                        ` : `
                            <button class="btn" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid #ef4444; font-size: 0.75rem; padding: 6px 10px; border-radius: 8px; cursor: pointer;" onclick="window.toggleBlockCalendarRelease('${rel.id}', true)" title="Blocca e nascondi validazione">
                                <i class="fa-solid fa-lock"></i> Blocca
                            </button>
                        `}
                    </div>
                </div>

                <!-- Sezione Imprevisto Ufficiale & Mercato -->
                <div style="margin-top: 10px; background: rgba(0,0,0,0.25); padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(212,175,55,0.25);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
                        <label style="font-size: 0.8rem; font-weight: bold; color: var(--accent-gold); display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-scroll"></i> Carta Imprevisto del Turno:
                        </label>
                        <select style="background: rgba(20,20,30,0.9); color: var(--text-light); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; font-size: 0.75rem; padding: 3px 8px; cursor: pointer;" onchange="window.selectCalendarPresetHazard('${rel.id}', this.value); this.selectedIndex=0;">
                            <option value="">⚡ Inserisci imprevisto classico...</option>
                            ${((window.CalendarService && window.CalendarService.CLASSIC_HAZARDS) || []).map(h => `<option value="${h.replace(/"/g, '&quot;')}">${h}</option>`).join('')}
                        </select>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                        <input type="text" id="hazard-input-${rel.id}" value="${(rel.hazardText || '').replace(/"/g, '&quot;')}" placeholder="Nessun imprevisto per questo turno (es. Crisi d'ispirazione: -2 pt)" style="flex: 1; min-width: 240px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 6px 10px; border-radius: 8px; font-size: 0.82rem;" onchange="window.updateCalendarReleaseHazard('${rel.id}', this.value)">
                        
                        <label style="display: inline-flex; align-items: center; gap: 6px; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); padding: 5px 10px; border-radius: 8px; font-size: 0.75rem; color: #93c5fd; cursor: pointer; user-select: none;">
                            <input type="checkbox" ${rel.isMarketOpen ? 'checked' : ''} onchange="window.updateCalendarReleaseMarket('${rel.id}', this.checked)" style="cursor: pointer;">
                            <i class="fa-solid fa-repeat"></i> Finestra Mercato (1 Cambio)
                        </label>
                    </div>
                </div>

                <!-- Autori inclusi -->
                <div style="margin-top: 10px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 6px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                        Autori Coinvolti (${(rel.authorIds || []).length}):
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 6px;">
                        ${authorsHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

window.openCalendarEventDetails = function(releaseId) {
    // Switch rapido alla vista elenco posizionandosi sull'evento o aprendo il dettaglio
    window.switchCalendarView('list');
    setTimeout(() => {
        const element = document.querySelector(`input[onchange*="'${releaseId}'"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const card = element.closest('.glass');
            if (card) {
                card.style.outline = '2px solid var(--accent-gold)';
                setTimeout(() => { card.style.outline = 'none'; }, 2000);
            }
        }
    }, 100);
};

window.generaCalendarioNuovoAnno = async function() {
    const inputDate = document.getElementById('input-smart-calendar-start');
    if (!inputDate || !inputDate.value) {
        alert("Inserisci la data del primo martedì di avvio del nuovo anno scolastico.");
        return;
    }

    const startDate = inputDate.value;
    if (!confirm(`Sei sicuro di voler rigenerare tutte le 18 uscite del Calendario a partire da Martedì ${startDate}?\nLe date verranno aggiornate a cascata ogni 14 giorni per tutte le classi.`)) {
        return;
    }

    try {
        if (!window.CalendarService) throw new Error("Servizio Calendario non disponibile.");
        await window.CalendarService.generateScheduleForSchoolYear(startDate);

        // Imposta il mese del calendario visualizzato sul mese di inizio
        const startParts = startDate.split('-').map(Number);
        window.calendarCurrentYear = startParts[0];
        window.calendarCurrentMonth = startParts[1] - 1;

        alert(`✅ Calendario del Nuovo Anno Scolastico generato con successo a partire dal ${startDate}!`);
        
        // Se siamo in admin, aggiorna e naviga al tab calendario
        const calTab = document.querySelector('.admin-tab-btn[data-target="admin-view-calendario"]');
        if (calTab) calTab.click();
    } catch (e) {
        console.error("Errore generazione calendario:", e);
        alert("Errore generazione calendario: " + e.message);
    }
};

window.updateCalendarReleaseDate = async function(releaseId, newDate) {
    if (!newDate || !window.CalendarService) return;
    await window.CalendarService.updateReleaseDate(releaseId, newDate);
};

window.toggleForceCalendarRelease = async function(releaseId, forceState) {
    if (!window.CalendarService) return;
    await window.CalendarService.forceRelease(releaseId, forceState);
};

window.toggleBlockCalendarRelease = async function(releaseId, blockState) {
    if (!window.CalendarService) return;
    await window.CalendarService.blockRelease(releaseId, blockState);
};

window.resetCalendarRelease = async function(releaseId) {
    if (!window.CalendarService) return;
    await window.CalendarService.resetRelease(releaseId);
};

window.updateCalendarReleaseHazard = async function(releaseId, text) {
    if (!window.CalendarService) return;
    await window.CalendarService.updateReleaseHazard(releaseId, text);
};

window.updateCalendarReleaseMarket = async function(releaseId, isMarketOpen) {
    if (!window.CalendarService) return;
    await window.CalendarService.updateReleaseMarket(releaseId, isMarketOpen);
};

window.selectCalendarPresetHazard = async function(releaseId, presetText) {
    if (!presetText || !window.CalendarService) return;
    const input = document.getElementById(`hazard-input-${releaseId}`);
    if (input) input.value = presetText;
    await window.CalendarService.updateReleaseHazard(releaseId, presetText);
};

// =========================================================
// GESTIONE DEDICATA TAB IMPREVISTI & MERCATO ADMIN (SUPER-ADMIN ONLY)
// =========================================================

window.currentImprevistiTimelineFilter = 'all';

window.filterImprevistiTimeline = function(filter) {
    window.currentImprevistiTimelineFilter = filter;
    document.querySelectorAll('#admin-view-imprevisti .admin-mode-filter-btn').forEach(btn => btn.classList.remove('active'));
    const btnId = `btn-timeline-filter-${filter}`;
    const activeBtn = document.getElementById(btnId);
    if (activeBtn) activeBtn.classList.add('active');
    window.renderAdminImprevisti();
};

window.renderAdminImprevisti = function() {
    if (!window.ImprevistiService) return;

    // 1. Render Mazzo di Carte (Lore Deck)
    const deckGrid = document.getElementById('admin-deck-cards-grid');
    const deckCountBadge = document.getElementById('deck-count-badge');
    if (deckGrid) {
        const deck = window.ImprevistiService.getDeck() || [];
        if (deckCountBadge) deckCountBadge.innerText = `${deck.length} Carte Disponibili`;

        deckGrid.innerHTML = deck.map(card => {
            const isMalus = card.effectType === 'malus';
            const isMarket = card.isMarket === true;
            
            let effectBadge = '';
            if (isMarket) {
                effectBadge = `<span style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #38bdf8; padding: 2px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: bold;"><i class="fa-solid fa-repeat"></i> Mercato (1 Cambio)</span>`;
            } else if (isMalus) {
                effectBadge = `<span style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; padding: 2px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: bold;">${card.points} Punti</span>`;
            } else {
                effectBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; padding: 2px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: bold;">+${card.points} Punti</span>`;
            }

            const authorObj = card.authorId && window.ImprevistiService ? window.ImprevistiService.getAuthorById(card.authorId) : null;
            const authorDisplayName = authorObj ? authorObj.name : card.authorName;
            const authorImg = authorObj && authorObj.image ? authorObj.image : null;

            return `
                <div class="glass" style="padding: 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between; gap: 10px; transition: transform 0.2s, border-color 0.2s;" onmouseenter="this.style.borderColor='var(--accent-gold)'" onmouseleave="this.style.borderColor='rgba(255,255,255,0.1)'">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px; margin-bottom: 6px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <i class="${card.icon}" style="color: ${card.color || 'var(--accent-gold)'}; font-size: 1.1rem;"></i>
                                <strong style="font-size: 0.88rem; color: #fff;">${card.title}</strong>
                            </div>
                        </div>
                        <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px; flex-wrap: wrap;">
                            ${effectBadge}
                            ${authorDisplayName ? `
                                <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.72rem; color: #e2e8f0; background: rgba(255,255,255,0.08); padding: 2px 7px; border-radius: 6px;">
                                    ${authorImg ? `<img src="${authorImg}" style="width: 16px; height: 16px; border-radius: 50%; object-fit: cover;">` : '<i class="fa-solid fa-user-pen"></i>'}
                                    Target: <strong>${authorDisplayName}</strong>
                                </span>
                            ` : `<span style="font-size: 0.72rem; color: #94a3b8; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">Target: Globale (Tutte le squadre)</span>`}
                        </div>
                        <p style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.35; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;" title="${card.lore}">
                            ${card.lore}
                        </p>
                    </div>
                    <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 5px 10px; border-radius: 8px; width: 100%; border: 1px solid rgba(212,175,55,0.4); color: var(--accent-gold); font-weight: 600;" onclick="window.programmaCardFromDeck('${card.cardId}')">
                        <i class="fa-solid fa-calendar-plus"></i> Programma nel Calendario
                    </button>
                </div>
            `;
        }).join('');
    }

    // 2. Render Timeline degli Imprevisti Programmati
    const timelineList = document.getElementById('admin-imprevisti-timeline-list');
    if (timelineList) {
        const allEvents = window.ImprevistiService.getEvents() || [];
        const filter = window.currentImprevistiTimelineFilter || 'all';

        const filtered = allEvents.filter(ev => {
            if (filter === 'all') return true;
            if (filter === 'active') return ev.status === 'active';
            if (filter === 'scheduled') return ev.status === 'scheduled';
            if (filter === 'archived') return ev.status === 'archived';
            return true;
        });

        if (filtered.length === 0) {
            timelineList.innerHTML = `
                <div style="text-align: center; padding: 30px; color: var(--text-muted);">
                    <i class="fa-solid fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 10px; display: block; opacity: 0.5;"></i>
                    Nessun imprevisto programmato per questo filtro.<br>
                    <span style="font-size: 0.8rem;">Seleziona una carta dal mazzo in alto oppure clicca su <strong>"🪄 Distribuisci a Tutto l'Anno"</strong>.</span>
                </div>
            `;
            return;
        }

        timelineList.innerHTML = filtered.map(ev => {
            let statusBadge = '';
            if (ev.isBlocked) {
                statusBadge = `<span style="background: rgba(100, 116, 139, 0.2); color: #94a3b8; border: 1px solid #64748b; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: bold;">🚫 Disattivato</span>`;
            } else if (ev.status === 'active') {
                statusBadge = `<span style="background: rgba(34, 197, 94, 0.25); color: #4ade80; border: 1px solid #22c55e; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: bold; animation: pulse 2s infinite;"><i class="fa-solid fa-bolt"></i> ATTIVO OGGI</span>`;
            } else if (ev.status === 'scheduled') {
                statusBadge = `<span style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; border: 1px solid #3b82f6; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: bold;"><i class="fa-regular fa-clock"></i> In Programma</span>`;
            } else {
                statusBadge = `<span style="background: rgba(255, 255, 255, 0.08); color: var(--text-muted); border: 1px solid rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 6px; font-size: 0.72rem;">📜 Storico</span>`;
            }

            let effectBadge = '';
            if (ev.isMarket) {
                effectBadge = `<span style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #38bdf8; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold;"><i class="fa-solid fa-repeat"></i> Mercato Aperto (1 Cambio)</span>`;
            } else if (ev.effectType === 'malus') {
                effectBadge = `<span style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold;">${ev.points} Punti</span>`;
            } else if (ev.points > 0) {
                effectBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold;">+${ev.points} Punti</span>`;
            }

            const authorObj = ev.authorId && window.ImprevistiService ? window.ImprevistiService.getAuthorById(ev.authorId) : null;
            const authorDisplayName = authorObj ? authorObj.name : ev.authorName;
            const authorImg = authorObj && authorObj.image ? authorObj.image : null;

            const borderStyle = ev.status === 'active' ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255,255,255,0.08)';
            const bgStyle = ev.status === 'active' ? 'rgba(34, 197, 94, 0.04)' : 'rgba(0,0,0,0.25)';

            return `
                <div class="glass" style="padding: 14px 16px; border-radius: 12px; border: ${borderStyle}; background: ${bgStyle}; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <!-- Data & Info -->
                    <div style="display: flex; align-items: center; gap: 14px; flex: 1; min-width: 280px;">
                        <div style="background: rgba(0,0,0,0.5); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); text-align: center; min-width: 105px;">
                            <span style="font-size: 0.68rem; color: var(--text-muted); display: block; text-transform: uppercase;">Data Evento</span>
                            <span style="font-family: monospace; font-size: 0.95rem; color: #fff; font-weight: bold;">${ev.date}</span>
                        </div>

                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                                ${statusBadge}
                                ${effectBadge}
                                ${authorDisplayName && authorDisplayName !== 'Globale' ? `
                                    <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.72rem; color: #e2e8f0; background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 6px;">
                                        ${authorImg ? `<img src="${authorImg}" style="width: 16px; height: 16px; border-radius: 50%; object-fit: cover;">` : '<i class="fa-solid fa-user-pen"></i>'}
                                        Target: <strong>${authorDisplayName}</strong>
                                    </span>
                                ` : ''}
                            </div>
                            <h4 style="margin: 0; font-size: 1rem; color: var(--accent-gold);">${ev.title}</h4>
                            ${ev.lore ? `<p style="margin: 3px 0 0 0; font-size: 0.8rem; color: var(--text-light); line-height: 1.35;">${ev.lore}</p>` : ''}
                        </div>
                    </div>

                    <!-- Azioni Super-Admin -->
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 6px 10px; border-radius: 8px; ${ev.isForcedActive ? 'background: rgba(34,197,94,0.3); border-color: #22c55e;' : ''}" onclick="window.toggleForceActiveImprevisto('${ev.id}')" title="${ev.isForcedActive ? 'Disattiva forzatura' : 'Forza attivo subito'}">
                            <i class="fa-solid fa-bolt"></i> ${ev.isForcedActive ? 'Attivo Forzato' : 'Forza Attivo'}
                        </button>
                        <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 6px 10px; border-radius: 8px;" onclick="window.openCustomImprevistoModal('${ev.id}')" title="Modifica data o dettagli">
                            <i class="fa-solid fa-pen"></i> Modifica
                        </button>
                        <button class="btn btn-secondary text-danger" style="font-size: 0.75rem; padding: 6px 10px; border-radius: 8px; border-color: rgba(239,68,68,0.3);" onclick="window.deleteImprevistoEvent('${ev.id}')" title="Elimina dalla timeline">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
};

window.populateAuthorDropdown = function(selectedAuthorId = '') {
    const select = document.getElementById('imp-form-author');
    if (!select) return;

    const allAuthors = window.ImprevistiService ? window.ImprevistiService.getAllAuthors() : [];

    select.innerHTML = '<option value="">-- Evento Globale / Nessuno --</option>' + 
        allAuthors.map(a => `<option value="${a.id}" ${a.id === selectedAuthorId ? 'selected' : ''}>${a.name} (${a.modeGroup || 'Autore'})</option>`).join('');
};

window.programmaCardFromDeck = function(cardId) {
    if (!window.ImprevistiService) return;
    const card = window.ImprevistiService.getCardById(cardId);
    if (!card) return;

    window.populateAuthorDropdown(card.authorId || '');

    document.getElementById('imp-form-id').value = '';
    document.getElementById('imp-form-card-id').value = card.cardId;
    document.getElementById('imp-form-date').value = window.ImprevistiService.getTodayString();
    document.getElementById('imp-form-title').value = card.title;
    document.getElementById('imp-form-subtitle').value = card.subtitle || '';
    document.getElementById('imp-form-lore').value = card.lore || '';
    document.getElementById('imp-form-effect-type').value = card.effectType || 'bonus';
    document.getElementById('imp-form-points').value = card.points !== undefined ? card.points : 0;
    document.getElementById('imp-form-is-market').checked = card.isMarket === true;

    document.getElementById('imprevisto-modal-title').innerText = `Programma: ${card.title}`;
    const modal = document.getElementById('modal-imprevisto-editor');
    if (modal) modal.style.display = 'flex';
};

window.openCustomImprevistoModal = function(editEventId = '') {
    window.populateAuthorDropdown();
    const modal = document.getElementById('modal-imprevisto-editor');

    if (editEventId && window.ImprevistiService) {
        const events = window.ImprevistiService.getEvents();
        const ev = events.find(e => e.id === editEventId);
        if (ev) {
            document.getElementById('imp-form-id').value = ev.id;
            document.getElementById('imp-form-card-id').value = ev.cardId || 'custom';
            document.getElementById('imp-form-date').value = ev.date || window.ImprevistiService.getTodayString();
            document.getElementById('imp-form-title').value = ev.title || '';
            document.getElementById('imp-form-subtitle').value = ev.subtitle || '';
            document.getElementById('imp-form-lore').value = ev.lore || '';
            window.populateAuthorDropdown(ev.authorId || '');
            document.getElementById('imp-form-effect-type').value = ev.effectType || 'bonus';
            document.getElementById('imp-form-points').value = ev.points !== undefined ? ev.points : 0;
            document.getElementById('imp-form-is-market').checked = ev.isMarket === true;
            document.getElementById('imprevisto-modal-title').innerText = 'Modifica Imprevisto Programmato';
            if (modal) modal.style.display = 'flex';
            return;
        }
    }

    // Nuovo custom
    document.getElementById('imp-form-id').value = '';
    document.getElementById('imp-form-card-id').value = 'custom';
    document.getElementById('imp-form-date').value = (window.ImprevistiService && window.ImprevistiService.getTodayString()) || new Date().toISOString().split('T')[0];
    document.getElementById('imp-form-title').value = '';
    document.getElementById('imp-form-subtitle').value = '';
    document.getElementById('imp-form-lore').value = '';
    document.getElementById('imp-form-effect-type').value = 'bonus';
    document.getElementById('imp-form-points').value = 2;
    document.getElementById('imp-form-is-market').checked = false;
    document.getElementById('imprevisto-modal-title').innerText = 'Crea Nuovo Imprevisto Personalizzato';
    if (modal) modal.style.display = 'flex';
};

window.closeImprevistoModal = function() {
    const modal = document.getElementById('modal-imprevisto-editor');
    if (modal) modal.style.display = 'none';
};

window.submitImprevistoModal = async function(event) {
    if (event) event.preventDefault();
    if (!window.ImprevistiService) return;

    const eventId = document.getElementById('imp-form-id').value;
    const date = document.getElementById('imp-form-date').value;
    const title = document.getElementById('imp-form-title').value;
    const subtitle = document.getElementById('imp-form-subtitle').value;
    const lore = document.getElementById('imp-form-lore').value;
    const authorSelect = document.getElementById('imp-form-author');
    const authorId = authorSelect ? authorSelect.value : null;
    const authorName = (authorSelect && authorSelect.options[authorSelect.selectedIndex]) ? (authorId ? authorSelect.options[authorSelect.selectedIndex].text : 'Globale') : 'Globale';
    const effectType = document.getElementById('imp-form-effect-type').value;
    const points = parseInt(document.getElementById('imp-form-points').value, 10) || 0;
    const isMarket = document.getElementById('imp-form-is-market').checked;
    const cardId = document.getElementById('imp-form-card-id').value || 'custom';

    try {
        if (eventId) {
            // Modifica
            await window.ImprevistiService.updateEvent(eventId, {
                date,
                title,
                subtitle,
                lore,
                authorId: authorId || null,
                authorName,
                effectType,
                points,
                isMarket
            });
        } else {
            // Nuovo inserimento
            await window.ImprevistiService.addEvent({
                cardId,
                date,
                title,
                subtitle,
                lore,
                authorId: authorId || null,
                authorName,
                effectType,
                points,
                isMarket
            });
        }

        window.closeImprevistoModal();
        window.renderAdminImprevisti();
    } catch (e) {
        alert("Errore salvataggio imprevisto: " + e.message);
    }
};

window.deleteImprevistoEvent = async function(eventId) {
    if (!confirm("Sei sicuro di voler eliminare questo imprevisto dalla timeline?")) return;
    if (window.ImprevistiService) {
        await window.ImprevistiService.deleteEvent(eventId);
        window.renderAdminImprevisti();
    }
};

window.toggleForceActiveImprevisto = async function(eventId) {
    if (window.ImprevistiService) {
        await window.ImprevistiService.toggleForceActive(eventId);
        window.renderAdminImprevisti();
    }
};

window.distribuisciImprevistiStagionali = async function() {
    if (!window.ImprevistiService) return;
    
    const today = window.ImprevistiService.getTodayString();
    const startDate = prompt("Inserisci la data di inizio della stagione scolastica (YYYY-MM-DD):", today);
    if (!startDate) return;

    if (!confirm("Vuoi distribuire l'intero mazzo di imprevisti e finestre di mercato lungo l'anno scolastico a partire dal " + startDate + "?")) return;

    try {
        await window.ImprevistiService.generateSeasonalSchedule(startDate);
        window.renderAdminImprevisti();
        alert("✅ Imprevisti e Finestre di Mercato distribuiti con successo per tutta la stagione!");
    } catch (e) {
        alert("Errore: " + e.message);
    }
};

window.renderAdminImpostazioni = async function() {
    const emailField = document.getElementById('admin-impostazioni-email') || document.getElementById('admin-profilo-email');
    const currentEmail = (typeof currentUserEmail !== 'undefined' && currentUserEmail) || window.currentUserEmail || (window.auth && window.auth.currentUser && window.auth.currentUser.email) || '';
    if (emailField && currentEmail) emailField.value = currentEmail;

    // Renderizza pannello Live Editor Didattico
    if (window.LiveEditor && typeof window.LiveEditor.renderAdminPanel === 'function') {
        window.LiveEditor.renderAdminPanel('admin-live-editor-container');
    }

    const masterArea = document.getElementById('admin-master-area');
    const archivesArea = document.getElementById('admin-historical-archives-area');
    if (masterArea) {
        masterArea.style.display = 'block';
    }
    if (archivesArea) {
        archivesArea.style.display = 'block';
        if (window.loadHistoricalArchives) {
            await window.loadHistoricalArchives();
        }
    }
};
window.renderAdminProfilo = window.renderAdminImpostazioni;

    window.cachedArchiveTeams = [];

    window.openArchiveSelectionModal = async function() {
        const modal = document.getElementById('selective-archive-modal');
        const listDiv = document.getElementById('archive-teams-selector-list');
        const nameInput = document.getElementById('archive-name-input');
        if (!modal || !listDiv) {
            console.error("Selective archive modal not found in DOM");
            alert("Errore: Finestra di archiviazione non trovata.");
            return;
        }

        const currentYear = new Date().getFullYear();
        if (nameInput) {
            nameInput.value = `Archivio_${currentYear - 1}_${currentYear}`;
        }

        modal.style.display = 'flex';
        modal.classList.add('active');
        listDiv.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted);"><i class="fa-solid fa-spinner fa-spin"></i> Caricamento squadre attive...</div>';

        try {
            const teamsSnapshot = await window.db.collection('fanta_teams').get();
            const activeTeams = teamsSnapshot.docs
                .map(d => {
                    const data = d.data();
                    let createdDate = null;
                    if (data.createdAt) {
                        createdDate = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
                    }
                    return { docId: d.id, id: data.id || d.id, createdDate, ...data };
                })
                .filter(t => t.status !== 'archived' && !t.archivedYear);

            window.cachedArchiveTeams = activeTeams;

            if (activeTeams.length === 0) {
                listDiv.innerHTML = '<p style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:15px;">Nessuna squadra attiva trovata da archiviare.</p>';
                return;
            }

            const now = new Date();
            const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

            listDiv.innerHTML = activeTeams.map(t => {
                const teamId = t.docId || t.id;
                const teamName = t.name || 'Squadra';
                const teamClass = t.classe || t.className || '-';
                const teamOwner = t.ownerEmail || 'Docente';
                const teamPoints = t.points || 0;
                
                let isCreatedToday = false;
                let dateStr = 'Anno precedente';
                if (t.createdDate && !isNaN(t.createdDate.getTime())) {
                    isCreatedToday = (t.createdDate.getTime() >= todayMidnight);
                    dateStr = t.createdDate.toLocaleDateString('it-IT') + ' ' + t.createdDate.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'});
                }

                // Per impostazione predefinita, deseleziona le squadre create oggi e seleziona quelle storiche
                const isChecked = !isCreatedToday ? 'checked' : '';
                const badgeNew = isCreatedToday 
                    ? `<span style="font-size:0.7rem; background:rgba(34,197,94,0.2); color:#4ade80; border:1px solid #16a34a; padding:2px 6px; border-radius:4px; font-weight:bold; margin-left:6px;">🟢 Creata Oggi (Nuova)</span>`
                    : `<span style="font-size:0.7rem; background:rgba(212,175,55,0.15); color:var(--accent-gold); padding:2px 6px; border-radius:4px;">Anno Trascorso</span>`;

                return `
                    <label style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.03); padding:10px 12px; border:1px solid rgba(255,255,255,0.1); border-radius:8px; cursor:pointer;">
                        <input type="checkbox" class="archive-team-cb" value="${teamId}" data-is-today="${isCreatedToday}" ${isChecked} style="accent-color:var(--accent-gold); width:18px; height:18px;">
                        <div style="flex:1;">
                            <div style="display:flex; align-items:center; justify-content:space-between;">
                                <span style="font-weight:bold; color:var(--text-light); font-size:0.95rem;">${teamName}</span>
                                <span style="color:var(--accent-gold); font-weight:700; font-size:0.85rem;">${teamPoints} pt</span>
                            </div>
                            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;">
                                Classe: <strong style="color:#ddd;">${teamClass}</strong> | Docente: ${teamOwner} | ${dateStr} ${badgeNew}
                            </div>
                        </div>
                    </label>
                `;
            }).join('');

        } catch (e) {
            console.error("Errore caricamento squadre per archiviazione:", e);
            listDiv.innerHTML = '<p style="color:red; font-size:0.85rem; padding:15px; text-align:center;">Errore caricamento squadre: ' + e.message + '</p>';
        }
    };

    window.selectAllArchiveTeams = function(checked) {
        document.querySelectorAll('.archive-team-cb').forEach(cb => {
            cb.checked = checked;
        });
    };

    window.selectOnlyOldArchiveTeams = function() {
        document.querySelectorAll('.archive-team-cb').forEach(cb => {
            cb.checked = (cb.dataset.isToday !== 'true');
        });
    };

    window.confirmSelectiveArchive = async function() {
        const nameInput = document.getElementById('archive-name-input');
        const backupName = (nameInput ? nameInput.value.trim() : '') || `Archivio_${new Date().getFullYear()}`;

        const checkedBoxes = document.querySelectorAll('.archive-team-cb:checked');
        if (checkedBoxes.length === 0) {
            alert("Seleziona almeno una squadra da archiviare.");
            return;
        }

        const selectedTeamIds = new Set(Array.from(checkedBoxes).map(cb => cb.value));
        const totalActive = (window.cachedArchiveTeams || []).length;
        const remainingCount = totalActive - selectedTeamIds.size;

        const confirmMsg = `Confermi l'archiviazione di ${selectedTeamIds.size} squadre nell'archivio "${backupName}"?\n\n` +
            `• ${selectedTeamIds.size} squadre verranno congelate nell'Archivio Storico.\n` +
            `• ${remainingCount} squadre (es. create oggi) rimarranno ATTIVE per il nuovo anno scolastico.`;

        if (!confirm(confirmMsg)) return;

        try {
            const teamsSnapshot = await window.db.collection('fanta_teams').get();
            const usersSnapshot = await window.db.collection('fanta_users').get();

            // 1. Prepara classifica finale per l'archivio (solo squadre selezionate)
            const archivedTeamsData = [];
            teamsSnapshot.docs.forEach(d => {
                if (selectedTeamIds.has(d.id) || selectedTeamIds.has(d.data().id)) {
                    archivedTeamsData.push({ docId: d.id, id: d.data().id || d.id, ...d.data() });
                }
            });

            archivedTeamsData.sort((a, b) => (b.points || 0) - (a.points || 0));

            const leaderboard = archivedTeamsData.map(t => ({
                name: t.name || 'Squadra',
                classRoom: t.classe || t.className || '-',
                school: t.school || t.istituto || '-',
                points: t.points || 0
            }));

            let batch = window.db.batch();

            // 2. Salva documento in fanta_archives (inclusa la fotografia degli imprevisti e mercato dell'anno)
            const currentImprevisti = (window.ImprevistiService && Array.isArray(window.ImprevistiService._events)) 
                ? window.ImprevistiService._events 
                : [];

            const archiveDocRef = window.db.collection('fanta_archives').doc();
            batch.set(archiveDocRef, {
                yearName: backupName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                totalTeams: archivedTeamsData.length,
                leaderboard: leaderboard,
                imprevistiSnapshot: currentImprevisti
            });

            // 3. Archivia le sole squadre selezionate
            teamsSnapshot.docs.forEach(doc => {
                if (selectedTeamIds.has(doc.id) || selectedTeamIds.has(doc.data().id)) {
                    batch.update(doc.ref, { archivedYear: backupName, status: 'archived' });
                }
            });

            // 4. Archivia gli studenti appartenenti alle squadre selezionate
            usersSnapshot.docs.forEach(doc => {
                const data = doc.data();
                const studentTeam = data.teamId || data.teamCode;
                const belongsToArchivedTeam = selectedTeamIds.has(data.teamId) || (data.teamCode && archivedTeamsData.some(t => t.joinCode === data.teamCode));

                if (data.role !== 'admin' && data.role !== 'docente' && belongsToArchivedTeam) {
                    batch.update(doc.ref, { 
                        archivedYear: backupName, 
                        status: 'archived', 
                        archivedTeamId: data.teamId || null, 
                        archivedTeamCode: data.teamCode || null,
                        teamId: null, 
                        teamCode: null 
                    });
                }
            });

            await batch.commit();

            alert(`Archiviazione "${backupName}" completata!\n${selectedTeamIds.size} squadre archiviate nello storico.\n${remainingCount} squadre nuove sono rimaste attive nel campionato!`);
            window.location.reload();

        } catch (e) {
            console.error("Errore durante l'archiviazione selettiva:", e);
            alert("Errore archiviazione: " + e.message);
        }
    };

    window.archiviaAnnoCorrente = window.openArchiveSelectionModal;

    window.ripristinaAnnoArchiviato = async function(backupName) {
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


