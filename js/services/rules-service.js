/**
 * ===================================================================
 * RULES-SERVICE.JS - Modulo Centralizzato e Dinamico del Regolamento
 * Ecosistema Didattico Prof. Memmo (FantaLetteratura, Rotta degli Eroi, ecc.)
 * ===================================================================
 * 
 * Formato semplice in stile Live Editor:
 * - Testo semplice modificabile in textarea unica
 * - Parsing automatico intelligente in paragrafi/punti numerati sui siti
 * - Sincronizzazione Firestore realtime (lettura pubblica, scrittura super-admin)
 * - Fallback offline e zero-flicker
 */

(function(window) {
    'use strict';

    const SUPER_ADMIN_EMAIL = 'prof.memmo@gmail.com';

    const DEFAULT_FANTA_RULES_TEXT = `1. Scopo del Gioco
Il gioco nasce da una libera interpretazione e ha scopo puramente ludico e didattico.

2. Diritto al riposo digitale
Dopo 45 minuti di permanenza sulla piattaforma, ogni studente verrà bloccato e forzato a una Pausa di 15 minuti per tutelare il benessere visivo e cognitivo.

3. Limite Sessioni Giornaliere
Non è permesso completare più di 2 sessioni di studio giornaliere (max 90 minuti/giorno complessivi).

4. Formazione Squadre
Ogni classe/scuola forma una o più squadre. Anche i Fantamici possono iscrivere e gestire le proprie squadre personali.

5. Budget Iniziale
Ogni squadra ha un budget iniziale proporzionato alla modalità scelta (es. 100 FantaCrediti) per acquistare 5 autori nella propria rosa.

6. Bonus e Malus Autori
Per ogni autore schierato saranno attribuiti bonus e malus calcolati in base alla scheda autore e agli avvenimenti storici/letterari.

7. Aggiornamenti Mensili
I punteggi vengono aggiornati mensilmente per uno o più autori e per il completamento delle missioni.

8. Scheda Segretissima
I bonus e i malus sono fissi e legati alla vita e alle opere dell'autore raccolte in una scheda segretissima redatta dal Game Master.

9. Sblocco delle Schede
La scheda di ogni autore sarà mostrata nel riepilogo mensile nella sezione "Schede" non appena il Game Master la sbloccherà assieme ai punti.

10. Bonus Dinamici & Missioni
Esistono bonus dinamici che possono essere caricati in "Missioni" (riservati a docenti e studenti) che alimentano la speciale Classifica Missioni.

11. Valore Attività di Classe
I bonus dinamici sono legati ad attività didattiche di classe, approfondimenti, performance e scoperte e hanno un valore standard di 5 punti.

12. Tre Classifiche Ufficiali
Esistono tre Classifiche distinte: Classifica Autori, Classifica Missioni e Classifica Globale. La classifica Missioni e i relativi bonus dinamici sono riservati a docenti e studenti.

13. Tornei Interscolastici e Privati
Docenti e Fantamici possono creare o partecipare ai tornei. I docenti possono invitare colleghi tramite Codice Invito per gareggiare tra classi o scuole diverse, mentre i Fantamici possono creare tornei dedicati per sfidarsi tra loro!

14. ⚡ Imprevisti Letterari
Durante l'anno scolastico vengono pubblicati eventi speciali e imprevisti storici/letterari autentici tramite il Bollettino della Gazzetta, che assegnano bonus o malus dinamici agli autori schierati nelle rose delle squadre.

15. 🔁 Finestre di Mercato
Sono previste due sessioni ufficiali di riparazione (sessione autunnale e sessione primaverile) durante le quali ogni squadra può effettuare 1 cambio nella propria rosa di 5 autori per ottimizzare la strategia di gioco.

16. Vittoria Finale
Vince chi, nella prima settimana di Giugno alla chiusura dell'anno scolastico, ha totalizzato il maggior numero di punti nella classifica finale.

17. Spirito Etico e Didattico
Questo regolamento deve essere interpretato con l'intento ludico e didattico, ma sempre rispettoso che anima il gioco. Nessun bonus o malus può essere interpretato come un'esortazione a compiere atti illeciti o irrispettosi nei confronti di altri individui o della collettività.

18. Aggiornamenti del Regolamento
Il regolamento potrà subire variazioni e integrazioni ufficiali da parte del Super-Admin per garantire equilibrio e divertimento.`;

    const RulesService = {
        _gameKey: 'fanta',
        _collectionName: 'fanta_rules',
        _docId: 'official',
        _storageKey: 'fanta_rules_official_text',
        _rawText: '',
        _lastUpdated: null,
        _updatedBy: '',
        _isInitialized: false,
        _listeners: [],
        _unsubscribeFirestore: null,

        getDefaultText() {
            return DEFAULT_FANTA_RULES_TEXT.trim();
        },

        isSuperAdmin(email) {
            const userEmail = (email || (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail || '').toLowerCase();
            return userEmail === SUPER_ADMIN_EMAIL.toLowerCase();
        },

        getRawText() {
            return (this._rawText && this._rawText.trim().length > 0) ? this._rawText : this.getDefaultText();
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
            const text = this.getRawText();
            this._listeners.forEach(cb => {
                try {
                    cb(text);
                } catch (e) {
                    console.error("Errore listener RulesService:", e);
                }
            });
        },

        async init() {
            // 1. Carica istantaneamente da cache locale o default (Zero-flicker)
            try {
                const cached = localStorage.getItem(this._storageKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed && parsed.text) {
                        this._rawText = parsed.text;
                        this._lastUpdated = parsed.lastUpdated || null;
                        this._updatedBy = parsed.updatedBy || '';
                    }
                }
            } catch (e) {
                console.warn("Errore lettura cache regolamento:", e);
            }

            if (!this._rawText) {
                this._rawText = this.getDefaultText();
            }

            this._notify();

            // 2. Setup listener Firestore
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
                console.warn("Firestore non ancora pronto per RulesService.");
                return;
            }

            try {
                if (this._unsubscribeFirestore) this._unsubscribeFirestore();

                this._unsubscribeFirestore = db.collection(this._collectionName).doc(this._docId)
                    .onSnapshot(async (doc) => {
                        if (doc && doc.exists) {
                            const data = doc.data() || {};
                            if (typeof data.text === 'string' && data.text.trim()) {
                                this._rawText = data.text.trim();
                                this._lastUpdated = data.lastUpdated || null;
                                this._updatedBy = data.updatedBy || '';

                                try {
                                    localStorage.setItem(this._storageKey, JSON.stringify({
                                        text: this._rawText,
                                        lastUpdated: this._lastUpdated,
                                        updatedBy: this._updatedBy
                                    }));
                                } catch (e) {}

                                this._notify();
                            }
                        } else if (doc && !doc.exists) {
                            const userEmail = (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail;
                            if (this.isSuperAdmin(userEmail)) {
                                try {
                                    await db.collection(this._collectionName).doc(this._docId).set({
                                        text: this.getDefaultText(),
                                        lastUpdated: new Date().toISOString(),
                                        updatedBy: userEmail || SUPER_ADMIN_EMAIL
                                    }, { merge: true });
                                } catch (errInit) {}
                            }
                        }
                    }, (err) => {
                        console.warn("Errore listener Firestore regole:", err);
                    });
            } catch (err) {
                console.warn("Setup listener Firestore fallito:", err);
            }
        },

        async saveToCloud(text) {
            const userEmail = (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail;
            
            if (!this.isSuperAdmin(userEmail)) {
                throw new Error("Accesso negato: solo il Super-Admin (" + SUPER_ADMIN_EMAIL + ") può salvare il regolamento.");
            }

            const cleanText = (text || '').trim();
            if (!cleanText) {
                throw new Error("Il testo del regolamento non può essere vuoto.");
            }

            const db = this._getFirestoreDb();
            if (!db) {
                throw new Error("Database non connesso.");
            }

            const nowIso = new Date().toISOString();
            await db.collection(this._collectionName).doc(this._docId).set({
                text: cleanText,
                lastUpdated: nowIso,
                updatedBy: userEmail || SUPER_ADMIN_EMAIL
            }, { merge: true });

            this._rawText = cleanText;
            this._lastUpdated = nowIso;
            this._updatedBy = userEmail || SUPER_ADMIN_EMAIL;

            try {
                localStorage.setItem(this._storageKey, JSON.stringify({
                    text: this._rawText,
                    lastUpdated: this._lastUpdated,
                    updatedBy: this._updatedBy
                }));
            } catch (e) {}

            this._notify();
            return { success: true, lastUpdated: nowIso };
        },

        // Parsing automatico intelligente del testo in sezioni o punti
        parseTextToItems(text) {
            const src = (text || this.getRawText()).trim();
            if (!src) return [];

            // Dividi per blocchi di doppio a capo o per numerazione standard (es: "1. Titolo", "2. Titolo")
            const blocks = src.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
            const items = [];

            blocks.forEach((block, index) => {
                const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
                if (lines.length === 0) return;

                const firstLine = lines[0];
                let title = '';
                let content = '';

                // Se la prima linea è un titolo numerato (es. "1. Titolo" o "1) Titolo")
                const matchNumbered = firstLine.match(/^(\d+[\.\)]\s*)(.*)$/);
                if (matchNumbered) {
                    title = matchNumbered[2].trim();
                    content = lines.slice(1).join(' ').trim();
                    if (!content) {
                        // Se c'è solo una riga, il contenuto è la riga stessa
                        content = title;
                        title = '';
                    }
                } else if (lines.length > 1) {
                    title = firstLine;
                    content = lines.slice(1).join(' ').trim();
                } else {
                    content = firstLine;
                }

                items.push({
                    index: index + 1,
                    title: title,
                    text: content || title,
                    fullText: block
                });
            });

            return items;
        },

        // ===================================================================
        // VISTA PUBBLICA / STUDENTI (index.html#view-regolamento)
        // ===================================================================
        renderPublicView(containerId = 'view-regolamento-content') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            const items = this.parseTextToItems();

            container.innerHTML = `
                <div class="glass" style="padding: 24px; border-radius: 16px;">
                    <div class="text-center mb-3">
                        <img src="https://prof-memmo.github.io/prof-memmo-gestione-siti/shared/assets/branding/games/fantaletteratura-badge.png" alt="Logo Fantaletteratura" class="fanta-logo-glow" style="max-height: 120px; width: auto; display: block; margin: 0 auto 15px; filter: drop-shadow(0 0 15px rgba(212,175,55,0.4));">
                        <h2 style="margin: 0 0 8px 0;">Regolamento Ufficiale<br>Fantaletteratura</h2>
                        <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0 auto; max-width: 550px;">
                            Norme ufficiali, imprevisti letterari, finestre di mercato e linee guida didattiche.
                        </p>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 20px;">
                        ${items.map(item => {
                            const isSpecial = item.title.includes('Imprevisti') || item.title.includes('Mercato') || item.text.includes('Imprevisti') || item.text.includes('Mercato');
                            const bgStyle = isSpecial 
                                ? 'background: linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(0,0,0,0.3) 100%); border: 1px solid rgba(234, 179, 8, 0.4);' 
                                : 'background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);';

                            return `
                                <div class="glass" style="padding: 16px; border-radius: 12px; ${bgStyle}">
                                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                                        <span style="flex-shrink: 0; font-size: 0.8rem; font-weight: bold; background: rgba(212,175,55,0.2); color: var(--accent-gold); padding: 3px 9px; border-radius: 6px;">
                                            #${item.index}
                                        </span>
                                        <div style="flex: 1;">
                                            ${item.title ? `<div style="font-weight: 700; font-size: 0.95rem; color: #fff; margin-bottom: 4px;">${item.title}</div>` : ''}
                                            <div style="font-size: 0.88rem; line-height: 1.5; color: #e2e8f0;">
                                                ${item.text}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        },

        // ===================================================================
        // VISTA DOCENTI READ-ONLY (Dashboard Docenti in index.html)
        // ===================================================================
        renderDocenteTab(containerId = 'docente-regolamento-container') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            const userEmail = (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail;
            
            // Se l'utente è il Super-Admin, mostra l'editor live
            if (this.isSuperAdmin(userEmail)) {
                this.renderAdminEditor(container);
                return;
            }

            const items = this.parseTextToItems();

            container.innerHTML = `
                <div class="glass" style="padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
                        <div>
                            <h3 style="margin: 0; color: var(--accent-gold); display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-book-open"></i> Regolamento Ufficiale (Sincronizzato)
                            </h3>
                            <p style="font-size: 0.82rem; color: var(--text-muted); margin: 4px 0 0 0;">
                                Consulta le norme ufficiali didattiche e ludiche sempre aggiornate dal Super-Admin.
                            </p>
                        </div>
                        <span style="font-size: 0.75rem; background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Cloud Sync Attivo
                        </span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${items.map(item => `
                            <div class="glass" style="padding: 14px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
                                <div style="display: flex; align-items: flex-start; gap: 10px;">
                                    <span style="flex-shrink: 0; font-size: 0.75rem; font-weight: bold; color: var(--accent-gold); background: rgba(212,175,55,0.15); padding: 2px 7px; border-radius: 4px;">
                                        #${item.index}
                                    </span>
                                    <div>
                                        ${item.title ? `<strong style="color: #fff; display: block; margin-bottom: 3px; font-size: 0.9rem;">${item.title}</strong>` : ''}
                                        <span style="color: #e2e8f0; font-size: 0.85rem; line-height: 1.4;">${item.text}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // ===================================================================
        // VISTA SUPER-ADMIN: EDITOR LIVE SEMPLICE (Esattamente come screen 2)
        // ===================================================================
        renderAdminEditor(containerId = 'admin-regolamento-container') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            const text = this.getRawText();

            container.innerHTML = `
                <div class="glass" style="padding: 24px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.12); margin-bottom: 25px;">
                    <!-- Intestazione in stile Live Editor -->
                    <div style="margin-bottom: 16px;">
                        <h3 style="margin: 0 0 6px 0; font-size: 1.15rem; color: #6366f1; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-lock"></i> Regolamento Ufficiale (Testo Modifica Live)
                        </h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
                            Modifica il contenuto del Regolamento in testo semplice. Sarà formattato automaticamente con titoli e paragrafi eleganti sui siti.
                        </p>
                    </div>

                    <!-- Textarea Semplice a Schermo Intero -->
                    <div style="margin-bottom: 18px;">
                        <textarea id="rules-live-textarea" rows="18" style="width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; color: #fff; padding: 16px; font-size: 0.9rem; line-height: 1.6; font-family: inherit; resize: vertical; outline: none; transition: border-color 0.2s;" placeholder="Inserisci qui i punti del regolamento numerati o separati da una riga vuota...">${text}</textarea>
                    </div>

                    <!-- Pulsanti di Azione -->
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <button type="button" id="btn-save-rules-live" onclick="window.RulesService.handleSaveButton()" style="background: #4f46e5; color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); text-transform: uppercase; letter-spacing: 0.5px; transition: transform 0.15s, background 0.15s;">
                            <i class="fa-solid fa-floppy-disk"></i> SALVA REGOLAMENTO
                        </button>
                        
                        <button type="button" onclick="window.RulesService.handleResetButton()" style="background: transparent; color: #aaa; border: 1px solid rgba(255,255,255,0.2); padding: 10px 18px; border-radius: 8px; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-rotate-left"></i> Ripristina Predefinito
                        </button>
                    </div>
                </div>
            `;
        },

        async handleSaveButton() {
            const textarea = document.getElementById('rules-live-textarea');
            if (!textarea) return;

            const btn = document.getElementById('btn-save-rules-live');
            const originalHtml = btn ? btn.innerHTML : '';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> SALVATAGGIO...`;
            }

            try {
                await this.saveToCloud(textarea.value);
                if (btn) {
                    btn.innerHTML = `<i class="fa-solid fa-check"></i> SALVATO CON SUCCESSO!`;
                    btn.style.background = '#16a34a';
                }
                setTimeout(() => {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalHtml;
                        btn.style.background = '#4f46e5';
                    }
                }, 2000);
            } catch (err) {
                alert("Errore salvataggio: " + (err.message || err));
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = originalHtml;
                }
            }
        },

        handleResetButton() {
            if (!confirm("Vuoi ripristinare il testo del regolamento a quello predefinito ufficiale?")) return;
            const textarea = document.getElementById('rules-live-textarea');
            if (textarea) {
                textarea.value = this.getDefaultText();
            }
        }
    };

    window.RulesService = RulesService;

})(typeof window !== 'undefined' ? window : this);
