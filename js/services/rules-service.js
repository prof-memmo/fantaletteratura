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

    const DEFAULT_FANTA_RULES_TEXT = `1. Cos'è FantaLetteratura e Profilo Centrale
Come tutti i giochi dell'ecosistema Prof. Memmo, FantaLetteratura nasce da una libera interpretazione e ha scopo puramente ludico e culturale. Il gioco permette a scuole, classi, docenti e Viandanti (appassionati, lettori e partecipanti esterni) di formare la propria squadra ideale acquistando 5 grandi autori della storia letteraria per sfidarsi nel corso dell'anno scolastico. L'accesso, la gestione del proprio account, dei piani e delle classi avvengono tramite il Profilo Centrale unico nel portale vetrina dell'ecosistema.

2. Formazione Squadre, Classi e Docenti Collaboratori
Le classi e gli elenchi studenti vengono creati e gestiti dal Profilo Docente Centrale e sincronizzati automaticamente nel gioco. In base al piano attivo, il docente titolare può comporre le squadre della propria classe, avviare il draft alla LIM e aggiungere Docenti Collaboratori tramite email per condividere la gestione didattica. I Viandanti possono iscrivere e gestire autonomamente la propria squadra personale. Ogni squadra dispone di un budget iniziale proporzionato alla modalità scelta per acquistare e schierare la propria rosa di 5 autori.

3. Schede Autore, Bonus/Malus e Calendario Social
Per ogni autore schierato saranno attribuiti bonus e malus legati alla vita, alle opere e alle vicende biografiche dell'autore, pubblicate dal Game Master da ottobre a giugno. I relativi punti saranno attribuiti e visibili nella pagina "Schede" al momento della pubblicazione e sblocco da parte del Game Master. I giocatori riceveranno apposita notifica sul sito ed è possibile seguire ogni uscita passo dopo passo anche attraverso i canali social ufficiali del Prof. Memmo.

4. ⚡ Imprevisti Letterari e 🔁 Finestre di Mercato
Durante l'anno scolastico verranno pubblicati eventi speciali e imprevisti storici/letterari autentici tramite il Bollettino della Gazzetta (annunciati anche sui canali social), che assegneranno bonus o malus dinamici agli autori schierati nelle rose. Sono inoltre previste sessioni ufficiali di riparazione (sessione autunnale e sessione primaverile) in cui ogni squadra potrà effettuare 1 cambio nella propria rosa di 5 autori per ottimizzare la propria strategia di gioco.

5. Missioni Didattiche (+5 Punti)
Esistono bonus dinamici che possono essere caricati in "Missioni" (riservati esclusivamente a docenti e studenti) e formeranno un'apposita graduatoria. I bonus dinamici sono legati ad attività di classe, approfondimenti, performance e scoperte e hanno un valore standard di 5 punti per ogni missione approvata.

6. Minigiochi Didattici in Classe
I docenti possono sfidare le squadre della classe tramite appositi minigiochi interattivi (Quiz, Impiccato, Cloze, Puzzle e Versi) proiettabili alla LIM o giocabili dagli studenti. Le manche consentono di verificare le conoscenze sugli autori e sulle opere studiate, accumulando punti extra per la classe e tenendo traccia dei progressi nello storico delle sfide.

7. Tornei Interscolastici e Privati
Docenti e Viandanti possono creare o partecipare ai tornei. I docenti possono invitare colleghi tramite Codice Invito per gareggiare tra classi o istituti scolastici diversi, mentre i Viandanti possono creare tornei dedicati per sfidarsi tra loro e scalare graduatorie riservate!

8. Classifiche e Vittoria Finale
Il gioco si articola in Classifiche ufficiali: Classifica Autori (calcolata sui punti dei 5 autori e aperta a tutti), Classifica Missioni (riservata alle sole attività didattiche scolastiche) e Classifica Globale (che somma autori e missioni per decretare le classi campionesse, con graduatorie distinte per le scuole e per i Viandanti). Vince chi, nella prima settimana di Giugno alla chiusura dell'anno scolastico, ha totalizzato il maggior numero di punti.

9. Benessere degli Studenti e Riposo Digitale
A tutela del benessere visivo e cognitivo degli studenti, dopo 45 minuti di permanenza sulla piattaforma ogni sessione verrà temporaneamente bloccata per una Pausa obbligatoria di 15 minuti (Diritto al riposo digitale). Agli studenti non è permesso completare più di 2 sessioni di studio giornaliere (max 90 minuti al giorno complessivi). Questa limitazione oraria non si applica ai profili dei docenti né a quelli dei Viandanti.

10. Codice Etico e Aggiornamenti del Regolamento
Questo regolamento deve essere interpretato con l'intento ludico e didattico, ma sempre rispettoso, che anima il gioco. Nessun bonus o malus può essere interpretato come un'esortazione a compiere atti illeciti o irrispettosi nei confronti di altri individui o della collettività. Il regolamento potrà subire variazioni e integrazioni ufficiali da parte del Team.`;

    const RulesService = {
        _gameKey: 'fanta',
        _collectionName: 'fanta_settings',
        _docId: 'official_rules',
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
            const fbUserEmail = (window.auth && window.auth.currentUser && window.auth.currentUser.email) || 
                                (window.firebase && window.firebase.auth && window.firebase.auth().currentUser && window.firebase.auth().currentUser.email);
            const userEmail = (email || fbUserEmail || (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail || '').toLowerCase();
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
            const fbUserEmail = (window.auth && window.auth.currentUser && window.auth.currentUser.email) || 
                                (window.firebase && window.firebase.auth && window.firebase.auth().currentUser && window.firebase.auth().currentUser.email);
            const userEmail = (fbUserEmail || (window.currentUser && window.currentUser.email) || (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || window.currentUserEmail || '').toLowerCase();
            
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

                let firstLine = lines[0].replace(/^[\u2022\*\-]\s*/, '').trim();
                let title = '';
                let content = '';

                // Rimuovi eventuale numerazione iniziale (es. "1. Titolo" o "1) Titolo")
                const matchNumbered = firstLine.match(/^(\d+[\.\)]\s*)(.*)$/);
                if (matchNumbered) {
                    firstLine = matchNumbered[2].trim();
                }

                if (lines.length > 1) {
                    title = firstLine;
                    content = lines.slice(1).join(' ').trim();
                } else {
                    // Se è su una singola riga, controlla se c'è un "TITOLO: Testo"
                    const colonMatch = firstLine.match(/^([^:]{3,60}):\s*(.+)$/);
                    if (colonMatch) {
                        title = colonMatch[1].trim();
                        content = colonMatch[2].trim();
                    } else {
                        content = firstLine;
                    }
                }

                if (title) {
                    title = title.replace(/:\s*$/, '').trim();
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
                <div class="glass" style="padding: 28px 24px; border-radius: 16px; max-width: 900px; margin: 0 auto;">
                    <div class="text-center mb-4">
                        <img src="https://gestionesiti.profmemmo.it/shared/assets/branding/games/fantaletteratura-badge.png" alt="Logo Fantaletteratura" class="fanta-logo-glow" style="max-height: 120px; width: auto; display: block; margin: 0 auto 14px; filter: drop-shadow(0 0 15px rgba(212,175,55,0.4));">
                        <h2 style="font-size: 1.6rem; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 4px 0; color: #fff; font-weight: 700;">Regolamento</h2>
                    </div>

                    <ul style="list-style-type: disc; padding-left: 24px; margin: 20px 0 0 0; line-height: 1.85; font-size: 0.95rem; color: #f1f5f9;">
                        ${items.map(item => `
                            <li style="margin-bottom: 16px; text-align: left;">
                                ${item.title ? `<strong style="color: #fff; text-transform: uppercase;">${item.title}:</strong> ` : ''}<span>${item.text}</span>
                            </li>
                        `).join('')}
                    </ul>
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
                <div class="glass" style="padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
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

                    <ul style="list-style-type: disc; padding-left: 20px; margin: 0; line-height: 1.8; font-size: 0.9rem; color: #e2e8f0;">
                        ${items.map(item => `
                            <li style="margin-bottom: 14px; text-align: left;">
                                ${item.title ? `<strong style="color: #fff; text-transform: uppercase;">${item.title}:</strong> ` : ''}<span>${item.text}</span>
                            </li>
                        `).join('')}
                    </ul>
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
            const fbUser = (window.auth && window.auth.currentUser) || 
                           (window.firebase && window.firebase.auth && window.firebase.auth().currentUser);
            const userEmail = fbUser ? (fbUser.email || '') : (window.currentUserEmail || '');
            const isAuthAdmin = userEmail.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();

            container.innerHTML = `
                <div class="glass" style="padding: 24px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.12); margin-bottom: 25px;">
                    <!-- Intestazione in stile Live Editor -->
                    <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <h3 style="margin: 0 0 6px 0; font-size: 1.15rem; color: #6366f1; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-lock"></i> Regolamento Ufficiale (Testo Modifica Live)
                            </h3>
                            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
                                Modifica il contenuto del Regolamento in testo semplice. Sarà formattato automaticamente con titoli e paragrafi eleganti sui siti.
                            </p>
                        </div>
                        <div>
                            ${isAuthAdmin ? `
                                <span style="font-size: 0.75rem; background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fa-solid fa-circle-check"></i> Super-Admin Autenticato (${userEmail})
                                </span>
                            ` : `
                                <span style="font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fa-solid fa-triangle-exclamation"></i> ${userEmail ? `Accesso: ${userEmail}` : 'Non autenticato (Effettua il Login)'}
                                </span>
                            `}
                        </div>
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

            const fbUser = (window.auth && window.auth.currentUser) || 
                           (window.firebase && window.firebase.auth && window.firebase.auth().currentUser);
            const userEmail = (fbUser && fbUser.email ? fbUser.email : (window.currentUserEmail || '')).toLowerCase();

            if (!fbUser || userEmail !== SUPER_ADMIN_EMAIL.toLowerCase()) {
                alert(`⚠️ Attenzione: per salvare le modifiche nel Cloud devi essere autenticato come Super-Admin (${SUPER_ADMIN_EMAIL}).\n\nAttualmente connesso come: ${userEmail || 'Nessun account (fai login nella home o ricarica la pagina)'}`);
                return;
            }

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
                alert("✅ Regolamento salvato e sincronizzato con successo nel Cloud!");
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
