/**
 * ===================================================================
 * RULES-SERVICE.JS - Modulo Centralizzato e Dinamico del Regolamento
 * Ecosistema Prof. Memmo (Fantaletteratura, Rotta degli Eroi, ecc.)
 * ===================================================================
 * 
 * Specifiche:
 * 1. Database Firestore: collezione fanta_rules / doc 'official'
 * 2. Super-Admin (prof.memmo@gmail.com): Scrittura, Editor visuale, Pubblicazione cloud, Reset
 * 3. Docenti: Consultazione dinamica READ-ONLY, aggiornata in tempo reale
 * 4. Studenti (index.html): Zero-flicker, fallback istantaneo locale e offline, listener realtime
 */

(function(window) {
    'use strict';

    const SUPER_ADMIN_EMAIL = 'prof.memmo@gmail.com';

    // Regolamento Ufficiale Predefinito per Fantaletteratura
    const DEFAULT_FANTA_RULES = [
        {
            id: 'rule_intro',
            title: 'Scopo del Gioco',
            text: 'Il gioco nasce da una libera interpretazione e ha scopo puramente ludico e didattico.',
            icon: 'fa-solid fa-book-open',
            category: 'Generale'
        },
        {
            id: 'rule_riposo',
            title: 'Diritto al riposo digitale',
            text: 'Dopo 45 minuti di permanenza sulla piattaforma, ogni studente verrà bloccato e forzato a una Pausa di 15 minuti per tutelare il benessere visivo e cognitivo.',
            icon: 'fa-solid fa-hourglass-half',
            badge: '45 min',
            category: 'Benessere Digitale'
        },
        {
            id: 'rule_sessioni',
            title: 'Limite Sessioni Giornaliere',
            text: 'Non è permesso completare più di 2 sessioni di studio giornaliere (max 90 minuti/giorno complessivi).',
            icon: 'fa-solid fa-clock',
            badge: 'Max 90 min/gg',
            category: 'Benessere Digitale'
        },
        {
            id: 'rule_squadre',
            title: 'Formazione Squadre',
            text: 'Ogni classe/scuola forma una o più squadre. Anche i Fantamici possono iscrivere e gestire le proprie squadre personali.',
            icon: 'fa-solid fa-users',
            category: 'Regole Base'
        },
        {
            id: 'rule_budget',
            title: 'Budget Iniziale',
            text: 'Ogni squadra ha un budget iniziale proporzionato alla modalità scelta (es. 100 FantaCrediti) per acquistare 5 autori nella propria rosa.',
            icon: 'fa-solid fa-coins',
            category: 'Regole Base'
        },
        {
            id: 'rule_schede',
            title: 'Bonus e Malus Autori',
            text: 'Per ogni autore schierato saranno attribuiti bonus e malus calcolati in base alla scheda autore e agli avvenimenti storici/letterari.',
            icon: 'fa-solid fa-feather-pointed',
            category: 'Punteggi'
        },
        {
            id: 'rule_aggiornamenti',
            title: 'Aggiornamenti Mensili',
            text: 'I punteggi vengono aggiornati mensilmente per uno o più autori e per il completamento delle missioni.',
            icon: 'fa-solid fa-calendar-check',
            category: 'Punteggi'
        },
        {
            id: 'rule_punti_fissi',
            title: 'Scheda Segretissima',
            text: 'I bonus e i malus sono fissi e legati alla vita e alle opere dell\'autore raccolte in una scheda segretissima redatta dal Game Master.',
            icon: 'fa-solid fa-user-secret',
            category: 'Punteggi'
        },
        {
            id: 'rule_sblocco_schede',
            title: 'Sblocco delle Schede',
            text: 'La scheda di ogni autore sarà mostrata nel riepilogo mensile nella sezione "Schede" non appena il Game Master la sbloccherà assieme ai punti.',
            icon: 'fa-solid fa-unlock-keyhole',
            category: 'Punteggi'
        },
        {
            id: 'rule_missioni',
            title: 'Bonus Dinamici & Missioni',
            text: 'Esistono bonus dinamici che possono essere caricati in "Missioni" (riservati a docenti e studenti) che alimentano la speciale Classifica Missioni.',
            icon: 'fa-solid fa-scroll',
            category: 'Missioni'
        },
        {
            id: 'rule_valore_missioni',
            title: 'Valore Attività di Classe',
            text: 'I bonus dinamici sono legati ad attività didattiche di classe, approfondimenti, performance e scoperte e hanno un valore standard di 5 punti.',
            icon: 'fa-solid fa-star',
            badge: '+5 pt',
            category: 'Missioni'
        },
        {
            id: 'rule_classifiche',
            title: 'Tre Classifiche Ufficiali',
            text: 'Esistono tre Classifiche distinte: Classifica Autori, Classifica Missioni e Classifica Globale. La classifica Missioni e i relativi bonus dinamici sono riservati a docenti e studenti.',
            icon: 'fa-solid fa-trophy',
            category: 'Classifiche'
        },
        {
            id: 'rule_tornei',
            title: 'Tornei Interscolastici e Privati',
            text: 'Docenti e Fantamici possono creare o partecipare ai tornei. I docenti possono invitare colleghi tramite Codice Invito per gareggiare tra classi o scuole diverse, mentre i Fantamici possono creare tornei dedicati per sfidarsi tra loro!',
            icon: 'fa-solid fa-shield-halved',
            category: 'Competizione'
        },
        {
            id: 'rule_imprevisti',
            title: '⚡ Imprevisti Letterari (Novità)',
            text: 'Durante l\'anno scolastico vengono pubblicati eventi speciali e imprevisti storici/letterari autentici tramite il Bollettino della Gazzetta, che assegnano bonus o malus dinamici agli autori schierati nelle rose delle squadre.',
            icon: 'fa-solid fa-bolt',
            badge: 'Novità',
            category: 'Eventi Speciali'
        },
        {
            id: 'rule_mercato',
            title: '🔁 Finestre di Mercato (Novità)',
            text: 'Sono previste due sessioni ufficiali di riparazione (sessione autunnale e sessione primaverile) durante le quali ogni squadra può effettuare 1 cambio nella propria rosa di 5 autori per ottimizzare la strategia di gioco.',
            icon: 'fa-solid fa-arrows-rotate',
            badge: '1 Cambio',
            category: 'Eventi Speciali'
        },
        {
            id: 'rule_vincitore',
            title: 'Vittoria Finale',
            text: 'Vince chi, nella prima settimana di Giugno alla chiusura dell\'anno scolastico, ha totalizzato il maggior numero di punti nella classifica finale.',
            icon: 'fa-solid fa-crown',
            category: 'Classifiche'
        },
        {
            id: 'rule_etica',
            title: 'Spirito Etico e Didattico',
            text: 'Questo regolamento deve essere interpretato con l\'intento ludico e didattico, ma sempre rispettoso che anima il gioco. Nessun bonus o malus può essere interpretato come un\'esortazione a compiere atti illeciti o irrispettosi nei confronti di altri individui o della collettività.',
            icon: 'fa-solid fa-scale-balanced',
            category: 'Etica'
        },
        {
            id: 'rule_variazioni',
            title: 'Aggiornamenti del Regolamento',
            text: 'Il regolamento potrà subire variazioni e integrazioni ufficiali da parte del Super-Admin per garantire equilibrio e divertimento.',
            icon: 'fa-solid fa-pen-ruler',
            category: 'Generale'
        }
    ];

    const RulesService = {
        _gameKey: 'fanta',
        _collectionName: 'fanta_rules',
        _docId: 'official',
        _storageKey: 'fanta_rules_official_data',
        _rules: [],
        _metadata: {
            title: 'Regolamento Fantaletteratura',
            subtitle: 'Norme ufficiali, dinamiche di gioco e linee guida per docenti e studenti',
            lastUpdated: null,
            updatedBy: 'Prof. Memmo',
            version: '2.0'
        },
        _isInitialized: false,
        _listeners: [],
        _unsubscribeFirestore: null,

        // Configurazione flessibile per poter riutilizzare il servizio su tutti i giochi dell'ecosistema
        configure(config) {
            if (config.gameKey) this._gameKey = config.gameKey;
            if (config.collectionName) this._collectionName = config.collectionName;
            if (config.docId) this._docId = config.docId;
            if (config.storageKey) this._storageKey = config.storageKey;
            if (config.defaultRules) this._defaultRules = config.defaultRules;
            if (config.metadata) this._metadata = { ...this._metadata, ...config.metadata };
        },

        getDefaultRules() {
            return JSON.parse(JSON.stringify(this._defaultRules || DEFAULT_FANTA_RULES));
        },

        isSuperAdmin(email) {
            const userEmail = (email || (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail || '').toLowerCase();
            return userEmail === SUPER_ADMIN_EMAIL.toLowerCase();
        },

        getRules() {
            if (!this._rules || this._rules.length === 0) {
                return this.getDefaultRules();
            }
            return JSON.parse(JSON.stringify(this._rules));
        },

        getMetadata() {
            return { ...this._metadata };
        },

        subscribe(callback) {
            if (typeof callback === 'function' && !this._listeners.includes(callback)) {
                this._listeners.push(callback);
            }
            return () => {
                this._listeners = this._listeners.filter(cb => cb !== callback);
            };
        },

        _notify() {
            const rules = this.getRules();
            const meta = this.getMetadata();
            this._listeners.forEach(cb => {
                try {
                    cb(rules, meta);
                } catch (e) {
                    console.error("Errore listener RulesService:", e);
                }
            });
        },

        async init(customConfig) {
            if (customConfig) this.configure(customConfig);

            // 1. CARICAMENTO IMMEDIATO DA CACHE LOCALE O DEFAULTS (Zero Flicker)
            try {
                const cached = localStorage.getItem(this._storageKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed && Array.isArray(parsed.rules) && parsed.rules.length > 0) {
                        this._rules = parsed.rules;
                        if (parsed.metadata) this._metadata = { ...this._metadata, ...parsed.metadata };
                    } else if (Array.isArray(parsed) && parsed.length > 0) {
                        this._rules = parsed;
                    }
                }
            } catch (e) {
                console.warn("Errore lettura cache locale regolamento:", e);
            }

            if (!this._rules || this._rules.length === 0) {
                this._rules = this.getDefaultRules();
            }

            // Notifica iniziale immediata con cache
            this._notify();

            // 2. AGGANCIO LISTENER REALTIME A FIRESTORE
            if (this._isInitialized) return;
            this._isInitialized = true;

            this._setupFirestoreListener();
        },

        _getFirestoreDb() {
            return window.db || window.fbDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
        },

        _setupFirestoreListener() {
            const db = this._getFirestoreDb();
            if (!db) {
                console.warn("Firestore non ancora pronto per RulesService. Ritento all'occorrenza.");
                return;
            }

            try {
                if (this._unsubscribeFirestore) {
                    this._unsubscribeFirestore();
                }

                this._unsubscribeFirestore = db.collection(this._collectionName).doc(this._docId)
                    .onSnapshot(async (doc) => {
                        if (doc && doc.exists) {
                            const data = doc.data() || {};
                            if (Array.isArray(data.rules) && data.rules.length > 0) {
                                this._rules = data.rules;
                            }
                            if (data.metadata) {
                                this._metadata = { ...this._metadata, ...data.metadata };
                            }
                            if (data.lastUpdated) this._metadata.lastUpdated = data.lastUpdated;
                            if (data.updatedBy) this._metadata.updatedBy = data.updatedBy;

                            // Aggiorna cache locale
                            try {
                                localStorage.setItem(this._storageKey, JSON.stringify({
                                    rules: this._rules,
                                    metadata: this._metadata
                                }));
                            } catch (e) {}

                            this._notify();
                        } else if (doc && !doc.exists) {
                            // Se il documento non esiste ancora su Firestore, il Super-Admin lo inizializza
                            const userEmail = (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail;
                            if (this.isSuperAdmin(userEmail)) {
                                try {
                                    await db.collection(this._collectionName).doc(this._docId).set({
                                        rules: this.getDefaultRules(),
                                        metadata: this._metadata,
                                        lastUpdated: new Date().toISOString(),
                                        updatedBy: userEmail || SUPER_ADMIN_EMAIL
                                    }, { merge: true });
                                } catch (errInit) {
                                    console.warn("Inizializzazione doc rules su Firestore fallita:", errInit);
                                }
                            }
                        }
                    }, (err) => {
                        console.warn("Errore listener Firestore regole:", err);
                    });
            } catch (err) {
                console.warn("Setup listener Firestore regole fallito:", err);
            }
        },

        // SALVATAGGIO NEL CLOUD (ESCLUSIVO SUPER-ADMIN)
        async saveToCloud(newRules, customMeta = {}) {
            const userEmail = (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail;
            
            if (!this.isSuperAdmin(userEmail)) {
                throw new Error("Accesso negato: solo il Super-Admin (" + SUPER_ADMIN_EMAIL + ") può modificare e pubblicare il regolamento ufficiale.");
            }

            if (!Array.isArray(newRules) || newRules.length === 0) {
                throw new Error("Il regolamento deve contenere almeno una regola valida.");
            }

            const cleanRules = newRules.map((r, index) => ({
                id: r.id || `rule_${Date.now()}_${index}`,
                title: (r.title || '').trim(),
                text: (r.text || r.content || '').trim(),
                icon: (r.icon || 'fa-solid fa-scroll').trim(),
                badge: (r.badge || '').trim(),
                category: (r.category || 'Generale').trim()
            }));

            const nowIso = new Date().toISOString();
            const updatedMeta = {
                ...this._metadata,
                ...customMeta,
                lastUpdated: nowIso,
                updatedBy: userEmail || SUPER_ADMIN_EMAIL
            };

            const db = this._getFirestoreDb();
            if (!db) {
                throw new Error("Database non connesso. Impossibile salvare nel cloud.");
            }

            await db.collection(this._collectionName).doc(this._docId).set({
                rules: cleanRules,
                metadata: updatedMeta,
                lastUpdated: nowIso,
                updatedBy: userEmail || SUPER_ADMIN_EMAIL
            }, { merge: true });

            this._rules = cleanRules;
            this._metadata = updatedMeta;

            try {
                localStorage.setItem(this._storageKey, JSON.stringify({
                    rules: this._rules,
                    metadata: this._metadata
                }));
            } catch (e) {}

            this._notify();
            return { success: true, count: cleanRules.length, lastUpdated: nowIso };
        },

        // RIPRISTINO PREDEFINITO NEL CLOUD
        async resetToDefaults() {
            const userEmail = (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail;
            
            if (!this.isSuperAdmin(userEmail)) {
                throw new Error("Accesso negato: solo il Super-Admin può ripristinare il regolamento predefinito.");
            }

            const defaults = this.getDefaultRules();
            return await this.saveToCloud(defaults, {
                lastUpdated: new Date().toISOString(),
                updatedBy: userEmail || SUPER_ADMIN_EMAIL
            });
        },

        // ===================================================================
        // RENDERING: VISTA STUDENTI / PUBBLICA (index.html)
        // ===================================================================
        renderPublicView(containerId = 'view-regolamento-content') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            const rules = this.getRules();
            const meta = this.getMetadata();

            let formattedDate = '';
            if (meta.lastUpdated) {
                try {
                    const d = new Date(meta.lastUpdated);
                    formattedDate = d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
                } catch (e) {}
            }

            const html = `
                <div class="rules-public-container">
                    <div class="rules-header-card glass text-center mb-3" style="padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.15); background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);">
                        <img src="https://prof-memmo.github.io/prof-memmo-gestione-siti/shared/assets/branding/games/fantaletteratura-badge.png" alt="Logo Fantaletteratura" class="fanta-logo-glow" style="max-height: 110px; width: auto; display: block; margin: 0 auto 12px; filter: drop-shadow(0 0 15px rgba(212,175,55,0.4));">
                        <h2 style="font-size: 1.6rem; margin: 0 0 6px 0; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">Regolamento Ufficiale</h2>
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0 auto 12px auto; max-width: 600px;">
                            ${meta.subtitle || 'Norme ufficiali, dinamiche di gioco, imprevisti e finestre di mercato per docenti e studenti.'}
                        </p>
                        
                        <div style="display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                            <span style="font-size: 0.75rem; background: rgba(212,175,55,0.15); color: #fde047; border: 1px solid rgba(212,175,55,0.3); padding: 3px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                <i class="fa-solid fa-cloud-check"></i> Ufficiale &amp; Sincronizzato
                            </span>
                            ${formattedDate ? `
                                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.08); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.12); padding: 3px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fa-solid fa-calendar-day"></i> Aggiornato al ${formattedDate}
                                </span>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Search Bar Regolamento -->
                    <div style="margin-bottom: 18px; position: relative;">
                        <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--accent-gold); font-size: 0.9rem;"></i>
                        <input type="text" id="rules-search-input" placeholder="Cerca una regola, parola chiave o bonus/malus..." oninput="window.RulesService.filterPublicRules(this.value)" style="width: 100%; box-sizing: border-box; padding: 12px 16px 12px 42px; border-radius: 12px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 0.9rem; outline: none; transition: border-color 0.2s;">
                    </div>

                    <!-- Lista Regole Renderizzate -->
                    <div id="rules-rendered-list" class="rules-list-grid" style="display: flex; flex-direction: column; gap: 12px;">
                        ${this._generateRulesCardsHtml(rules)}
                    </div>
                </div>
            `;

            container.innerHTML = html;
        },

        _generateRulesCardsHtml(rules) {
            if (!rules || rules.length === 0) {
                return `<div class="glass text-center" style="padding: 25px; color: var(--text-muted);">Nessuna regola trovata.</div>`;
            }

            return rules.map((rule, idx) => {
                const num = idx + 1;
                const icon = rule.icon || 'fa-solid fa-scroll';
                const isHighlight = rule.badge === 'Novità' || (rule.title && (rule.title.includes('Imprevisti') || rule.title.includes('Mercato')));
                const borderStyle = isHighlight ? 'border: 1px solid rgba(234, 179, 8, 0.4); background: linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(0,0,0,0.3) 100%);' : 'border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03);';
                
                return `
                    <div class="rule-card glass" data-rule-idx="${num}" data-rule-title="${(rule.title || '').replace(/"/g, '&quot;')}" data-rule-text="${(rule.text || '').replace(/"/g, '&quot;')}" style="padding: 16px; border-radius: 12px; display: flex; align-items: flex-start; gap: 14px; transition: transform 0.2s ease, border-color 0.2s ease; ${borderStyle}">
                        <div style="flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.3); display: flex; align-items: center; justify-content: center; color: var(--accent-gold); font-size: 1rem; font-weight: bold;">
                            <i class="${icon}"></i>
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 0.75rem; font-weight: bold; color: var(--accent-gold); opacity: 0.8;">#${num}</span>
                                    ${rule.title ? `<h4 style="margin: 0; font-size: 0.98rem; color: #fff; font-weight: 600;">${rule.title}</h4>` : ''}
                                </div>
                                <div style="display: flex; gap: 6px; align-items: center;">
                                    ${rule.badge ? `<span style="font-size: 0.7rem; font-weight: bold; background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.4); padding: 2px 7px; border-radius: 6px;">${rule.badge}</span>` : ''}
                                    ${rule.category && rule.category !== 'Generale' ? `<span style="font-size: 0.68rem; background: rgba(255,255,255,0.06); color: var(--text-muted); padding: 2px 6px; border-radius: 4px;">${rule.category}</span>` : ''}
                                </div>
                            </div>
                            <div style="font-size: 0.88rem; line-height: 1.5; color: #e2e8f0;">
                                ${rule.text || ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        },

        filterPublicRules(query) {
            const list = document.getElementById('rules-rendered-list');
            if (!list) return;
            const cards = list.querySelectorAll('.rule-card');
            const q = (query || '').toLowerCase().trim();

            cards.forEach(card => {
                const title = (card.getAttribute('data-rule-title') || '').toLowerCase();
                const text = (card.getAttribute('data-rule-text') || '').toLowerCase();
                if (!q || title.includes(q) || text.includes(q)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        },

        // ===================================================================
        // RENDERING: VISTA DOCENTI READ-ONLY (Dashboard Docenti)
        // ===================================================================
        renderDocenteTab(containerId = 'docente-regolamento-container') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            const userEmail = (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail;
            const isSuperAdmin = this.isSuperAdmin(userEmail);

            // Se l'utente è Super-Admin, gli offriamo la scelta o l'editor diretto
            if (isSuperAdmin) {
                this.renderAdminEditor(container);
                return;
            }

            const rules = this.getRules();
            const meta = this.getMetadata();

            let formattedDate = 'Oggi';
            if (meta.lastUpdated) {
                try {
                    const d = new Date(meta.lastUpdated);
                    formattedDate = d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                } catch (e) {}
            }

            container.innerHTML = `
                <div class="glass" style="padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px;">
                        <div>
                            <h3 style="margin: 0; color: var(--accent-gold); display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-book-open"></i> Regolamento Ufficiale del Gioco
                            </h3>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 4px 0 0 0;">
                                Consulta le norme ufficiali didattiche e ludiche sempre sincronizzate in tempo reale con il Cloud.
                            </p>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <span style="font-size: 0.75rem; background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                <i class="fa-solid fa-cloud-arrow-up"></i> Sincronizzato con Cloud (${formattedDate})
                            </span>
                            <button class="btn btn-secondary" style="width: auto; margin: 0; font-size: 0.75rem; padding: 5px 12px; border-radius: 20px;" onclick="window.RulesService.init(); window.RulesService.renderDocenteTab('${containerId}');">
                                <i class="fa-solid fa-rotate"></i> Aggiorna
                            </button>
                        </div>
                    </div>

                    <!-- Search Input -->
                    <div style="margin-bottom: 15px; position: relative;">
                        <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--accent-gold); font-size: 0.85rem;"></i>
                        <input type="text" placeholder="Filtra le regole per parola chiave..." oninput="window.RulesService.filterDocenteRules(this.value, '${containerId}')" style="width: 100%; box-sizing: border-box; padding: 10px 14px 10px 38px; border-radius: 10px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 0.85rem; outline: none;">
                    </div>

                    <!-- Elenco Regole Read-Only -->
                    <div id="${containerId}-list" style="display: flex; flex-direction: column; gap: 10px;">
                        ${this._generateRulesCardsHtml(rules)}
                    </div>
                </div>
            `;
        },

        filterDocenteRules(query, containerId) {
            const container = document.getElementById(`${containerId}-list`);
            if (!container) return;
            const cards = container.querySelectorAll('.rule-card');
            const q = (query || '').toLowerCase().trim();

            cards.forEach(card => {
                const title = (card.getAttribute('data-rule-title') || '').toLowerCase();
                const text = (card.getAttribute('data-rule-text') || '').toLowerCase();
                if (!q || title.includes(q) || text.includes(q)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        },

        // ===================================================================
        // RENDERING: EDITOR VISUALE SUPER-ADMIN (admin.html e Docente Super-Admin)
        // ===================================================================
        _editorState: {
            rules: [],
            isDirty: false
        },

        renderAdminEditor(containerId = 'admin-regolamento-container') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            // Inizializza stato editor dalle regole attuali se vuoto
            if (!this._editorState.isDirty || this._editorState.rules.length === 0) {
                this._editorState.rules = this.getRules();
                this._editorState.isDirty = false;
            }

            const meta = this.getMetadata();
            const rules = this._editorState.rules;

            let formattedDate = 'Mai';
            if (meta.lastUpdated) {
                try {
                    const d = new Date(meta.lastUpdated);
                    formattedDate = d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                } catch (e) {}
            }

            container.innerHTML = `
                <div class="glass" style="padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15);">
                    <!-- Header Super-Admin -->
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                <span style="background: rgba(234, 179, 8, 0.15); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.3); font-size: 0.7rem; font-weight: bold; padding: 2px 8px; border-radius: 6px; text-transform: uppercase;">
                                    <i class="fa-solid fa-crown"></i> Super-Admin Editor
                                </span>
                                <span style="font-size: 0.75rem; color: #4ade80; display: inline-flex; align-items: center; gap: 4px;">
                                    <i class="fa-solid fa-circle-check"></i> Cloud Live Sync (${formattedDate})
                                </span>
                            </div>
                            <h2 style="margin: 0; font-size: 1.3rem; color: #fff; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-scroll" style="color: var(--accent-gold);"></i> Gestione Regolamento Dinamico
                            </h2>
                            <p style="font-size: 0.82rem; color: var(--text-muted); margin: 4px 0 0 0;">
                                Modifica, aggiungi o riordina i punti del regolamento. Le modifiche salvate saranno immediatamente visibili in tempo reale a tutti gli studenti e docenti.
                            </p>
                        </div>
                        
                        <!-- Azioni Principali Super Admin -->
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <button type="button" class="btn btn-secondary" onclick="window.RulesService.addRuleItem('${containerId}')" style="width: auto; margin: 0; font-size: 0.8rem; padding: 7px 14px; border-radius: 20px; border: 1px solid var(--accent-gold); color: var(--accent-gold); display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-plus"></i> Nuova Regola
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="window.RulesService.confirmResetDefaults('${containerId}')" style="width: auto; margin: 0; font-size: 0.8rem; padding: 7px 14px; border-radius: 20px; color: #f87171; border: 1px solid rgba(239,68,68,0.3); display: inline-flex; align-items: center; gap: 6px;" title="Ripristina le regole ufficiali di fabbrica">
                                <i class="fa-solid fa-rotate-left"></i> Ripristina Predefinito
                            </button>
                            <button type="button" id="btn-save-cloud-rules" class="btn" onclick="window.RulesService.saveEditorToCloud('${containerId}')" style="width: auto; margin: 0; background: var(--accent-gold); color: var(--bg-dark); font-weight: bold; font-size: 0.8rem; padding: 7px 16px; border-radius: 20px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(212,175,55,0.3);">
                                <i class="fa-solid fa-cloud-arrow-up"></i> Salva e Pubblica nel Cloud
                            </button>
                        </div>
                    </div>

                    <!-- Split Layout: Editor a Sinistra / Anteprima Live a Destra -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; align-items: start;">
                        
                        <!-- Colonna Sinistra: Lista Elementi Editor -->
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <h4 style="margin: 0; font-size: 0.95rem; color: var(--accent-gold); display: flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-pen-to-square"></i> Punti del Regolamento (${rules.length})
                                </h4>
                                <span style="font-size: 0.72rem; color: var(--text-muted);">Usa le frecce per riordinare</span>
                            </div>

                            <div id="${containerId}-editor-items" style="display: flex; flex-direction: column; gap: 12px; max-height: 650px; overflow-y: auto; padding-right: 6px;">
                                ${this._renderEditorItemsHtml(rules, containerId)}
                            </div>
                        </div>

                        <!-- Colonna Destra: Anteprima Live Utente -->
                        <div class="glass" style="padding: 18px; border-radius: 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); position: sticky; top: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                                <h4 style="margin: 0; font-size: 0.95rem; color: #fff; display: flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-eye" style="color: var(--accent-gold);"></i> Anteprima Live Studenti
                                </h4>
                                <span style="font-size: 0.72rem; background: rgba(59, 130, 246, 0.2); color: #93c5fd; padding: 2px 7px; border-radius: 4px;">
                                    Rendering Istantaneo
                                </span>
                            </div>
                            
                            <div id="${containerId}-live-preview" style="max-height: 600px; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: column; gap: 10px;">
                                ${this._generateRulesCardsHtml(rules)}
                            </div>
                        </div>

                    </div>
                </div>
            `;
        },

        _renderEditorItemsHtml(rules, containerId) {
            if (!rules || rules.length === 0) {
                return `<div class="glass text-center" style="padding: 20px; color: var(--text-muted);">Nessun punto configurato. Clicca su "+ Nuova Regola" per iniziare.</div>`;
            }

            return rules.map((rule, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === rules.length - 1;

                return `
                    <div class="glass rule-editor-row" data-idx="${idx}" style="padding: 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.02);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 0.8rem; font-weight: bold; background: rgba(212,175,55,0.2); color: var(--accent-gold); padding: 2px 8px; border-radius: 6px;">
                                    #${idx + 1}
                                </span>
                                <input type="text" placeholder="Titolo (opzionale, es. Imprevisti)" value="${(rule.title || '').replace(/"/g, '&quot;')}" oninput="window.RulesService.updateEditorRule(${idx}, 'title', this.value, '${containerId}')" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 4px 8px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; width: 180px;">
                            </div>
                            
                            <!-- Controlli: Sposta su, Sposta giù, Elimina -->
                            <div style="display: flex; gap: 4px; align-items: center;">
                                <button type="button" class="btn btn-secondary" onclick="window.RulesService.moveRule(${idx}, -1, '${containerId}')" ${isFirst ? 'disabled style="opacity:0.3; padding: 4px 8px;"' : 'style="padding: 4px 8px;"'} title="Sposta su">
                                    <i class="fa-solid fa-arrow-up"></i>
                                </button>
                                <button type="button" class="btn btn-secondary" onclick="window.RulesService.moveRule(${idx}, 1, '${containerId}')" ${isLast ? 'disabled style="opacity:0.3; padding: 4px 8px;"' : 'style="padding: 4px 8px;"'} title="Sposta giù">
                                    <i class="fa-solid fa-arrow-down"></i>
                                </button>
                                <button type="button" class="btn btn-danger" onclick="window.RulesService.deleteRule(${idx}, '${containerId}')" style="padding: 4px 8px; background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.4); color: #f87171;" title="Elimina regola">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Testo Regola -->
                        <div style="margin-bottom: 8px;">
                            <textarea rows="3" placeholder="Testo dettagliato della regola (supporta HTML come <strong>, <em>)..." oninput="window.RulesService.updateEditorRule(${idx}, 'text', this.value, '${containerId}')" style="width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); color: #e2e8f0; padding: 8px; border-radius: 8px; font-size: 0.83rem; line-height: 1.4; resize: vertical;">${rule.text || ''}</textarea>
                        </div>

                        <!-- Metadati Opzionali: Icona, Badge, Categoria -->
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 120px;">
                                <input type="text" placeholder="Icona FontAwesome (es. fa-solid fa-scroll)" value="${(rule.icon || '').replace(/"/g, '&quot;')}" oninput="window.RulesService.updateEditorRule(${idx}, 'icon', this.value, '${containerId}')" style="width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #ccc; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">
                            </div>
                            <div style="flex: 1; min-width: 100px;">
                                <input type="text" placeholder="Badge (es. Novità, +5 pt)" value="${(rule.badge || '').replace(/"/g, '&quot;')}" oninput="window.RulesService.updateEditorRule(${idx}, 'badge', this.value, '${containerId}')" style="width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #ccc; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">
                            </div>
                            <div style="flex: 1; min-width: 100px;">
                                <input type="text" placeholder="Categoria (es. Punteggi)" value="${(rule.category || '').replace(/"/g, '&quot;')}" oninput="window.RulesService.updateEditorRule(${idx}, 'category', this.value, '${containerId}')" style="width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #ccc; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        },

        updateEditorRule(index, field, value, containerId) {
            if (!this._editorState.rules[index]) return;
            this._editorState.rules[index][field] = value;
            this._editorState.isDirty = true;

            // Aggiorna solo l'anteprima live per massima reattività senza perdere il focus del cursore
            const previewContainer = document.getElementById(`${containerId}-live-preview`);
            if (previewContainer) {
                previewContainer.innerHTML = this._generateRulesCardsHtml(this._editorState.rules);
            }
        },

        addRuleItem(containerId) {
            const newRule = {
                id: `rule_custom_${Date.now()}`,
                title: 'Nuova Regola',
                text: 'Inserisci qui la descrizione e le indicazioni ufficiali per questa regola.',
                icon: 'fa-solid fa-circle-info',
                badge: '',
                category: 'Generale'
            };
            this._editorState.rules.push(newRule);
            this._editorState.isDirty = true;
            this.renderAdminEditor(containerId);
            
            // Scroll to bottom
            setTimeout(() => {
                const editorItems = document.getElementById(`${containerId}-editor-items`);
                if (editorItems) editorItems.scrollTop = editorItems.scrollHeight;
            }, 50);
        },

        deleteRule(index, containerId) {
            if (!confirm(`Sei sicuro di voler eliminare la regola #${index + 1}?`)) return;
            this._editorState.rules.splice(index, 1);
            this._editorState.isDirty = true;
            this.renderAdminEditor(containerId);
        },

        moveRule(index, direction, containerId) {
            const targetIdx = index + direction;
            if (targetIdx < 0 || targetIdx >= this._editorState.rules.length) return;

            const temp = this._editorState.rules[index];
            this._editorState.rules[index] = this._editorState.rules[targetIdx];
            this._editorState.rules[targetIdx] = temp;
            this._editorState.isDirty = true;
            this.renderAdminEditor(containerId);
        },

        async confirmResetDefaults(containerId) {
            if (!confirm("Attenzione: Vuoi ripristinare il regolamento alle impostazioni ufficiali di fabbrica? Tutte le modifiche locali non salvate o personalizzazioni verranno reimpostate.")) {
                return;
            }

            this._editorState.rules = this.getDefaultRules();
            this._editorState.isDirty = true;
            this.renderAdminEditor(containerId);
            alert("Regolamento reimpostato sui valori predefiniti! Clicca su 'Salva e Pubblica nel Cloud' se desideri propagarlo su Firestore.");
        },

        async saveEditorToCloud(containerId) {
            const btn = document.getElementById('btn-save-cloud-rules');
            const originalHtml = btn ? btn.innerHTML : '';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Pubblicazione...`;
            }

            try {
                const res = await this.saveToCloud(this._editorState.rules);
                this._editorState.isDirty = false;
                
                if (btn) {
                    btn.innerHTML = `<i class="fa-solid fa-check"></i> Pubblicato!`;
                    btn.style.background = '#22c55e';
                    btn.style.color = '#fff';
                }

                setTimeout(() => {
                    this.renderAdminEditor(containerId);
                }, 1000);

                if (typeof window.showToast === 'function') {
                    window.showToast("Regolamento pubblicato con successo nel Cloud!", "success");
                } else {
                    alert("Regolamento pubblicato con successo in tempo reale per tutti i docenti e gli studenti!");
                }
            } catch (err) {
                console.error("Errore salvataggio regole cloud:", err);
                alert("Errore durante il salvataggio nel Cloud: " + (err.message || err));
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = originalHtml;
                }
            }
        }
    };

    window.RulesService = RulesService;

})(window);
