/**
 * LIVE EDITOR DIDATTICO (Quick-Edit al Volo) - FantaLetteratura
 * Consente al Docente / Amministratore (prof.memmo@gmail.com) di correggere al volo
 * schede autore, testi e missioni di FantaLetteratura direttamente dal gioco o dal pannello Impostazioni.
 */

(function() {
    function htmlToPlainText(html) {
        if (!html) return '';
        if (typeof html !== 'string') return String(html);
        if (!/<[a-z][\s\S]*>/i.test(html)) return html;

        return html
            .replace(/<br\s*[\/]?>/gi, '\n')
            .replace(/<\/p>/gi, '\n\n')
            .replace(/<\/div>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .trim();
    }

    function plainTextToHtml(text, originalHtml) {
        if (!text) return '';
        const trimmed = text.trim();
        if (trimmed.startsWith('<') && trimmed.endsWith('>')) return trimmed;
        if (originalHtml && (originalHtml.includes('<br>') || originalHtml.includes('<p>'))) {
            return trimmed.split('\n').join('<br>');
        }
        return trimmed;
    }

    window.LiveEditor = {
        platformKey: 'fantaletteratura',
        platformName: 'FantaLetteratura',
        overrides: {},
        isLoaded: false,
        _originalCache: {},

        init: async function() {
            const db = window.fbDb || window.db || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
            if (!db) return;
            try {
                const snapshot = await db.collection('hub_didactic_overrides')
                    .where('platform', '==', this.platformKey)
                    .get();
                
                this.overrides = {};
                snapshot.forEach(doc => {
                    this.overrides[doc.id] = { docId: doc.id, ...doc.data() };
                });
                this.isLoaded = true;
                console.log(`✏️ Live Editor [FantaLetteratura]: ${Object.keys(this.overrides).length} override caricati.`);
            } catch (e) {
                console.warn("Live Editor Fanta cloud error:", e);
            }
        },

        isAdmin: function() {
            // Se siamo nella pagina admin.html, l'utente è amministratore
            if (typeof window !== 'undefined' && window.location && window.location.pathname.includes('admin')) {
                return true;
            }

            // Controllo Firebase Auth
            if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                const fbUser = firebase.auth().currentUser;
                if (fbUser.email && fbUser.email.toLowerCase() === 'prof.memmo@gmail.com') return true;
            }

            if (window.auth && window.auth.currentUser) {
                const fbUser = window.auth.currentUser;
                if (fbUser.email && fbUser.email.toLowerCase() === 'prof.memmo@gmail.com') return true;
            }

            // Controllo Auth object
            let u = null;
            if (typeof Auth !== 'undefined' && Auth.getUser) u = Auth.getUser();
            if (u) {
                if (u.email && u.email.toLowerCase() === 'prof.memmo@gmail.com') return true;
                if (u.role === 'admin' || u.role === 'docente') return true;
            }

            // Controllo variabili globali
            if (typeof currentUserEmail !== 'undefined' && currentUserEmail && currentUserEmail.toLowerCase() === 'prof.memmo@gmail.com') return true;
            if (window.currentUserEmail && window.currentUserEmail.toLowerCase() === 'prof.memmo@gmail.com') return true;
            if (window.currentUser && window.currentUser.email && window.currentUser.email.toLowerCase() === 'prof.memmo@gmail.com') return true;

            // Controllo localStorage
            try {
                const storedRole = localStorage.getItem('fanta_user_role');
                if (storedRole === 'docente' || storedRole === 'admin') return true;

                for (let k of ['fanta_user', 'hub_user_session', 'gym_user', 'rotta_user_session', 'corte_user_session', 'hub_user']) {
                    const raw = localStorage.getItem(k);
                    if (raw) {
                        const parsed = JSON.parse(raw);
                        if (parsed.email && parsed.email.toLowerCase() === 'prof.memmo@gmail.com') return true;
                        if (parsed.role === 'admin' || parsed.role === 'docente') return true;
                    }
                }
            } catch(e){}
            return false;
        },

        apply: function(itemKey, originalItem) {
            if (!originalItem) return originalItem;
            const key = String(itemKey);
            this._originalCache[key] = originalItem;
            const override = this.overrides[key];
            if (!override || !override.data) return originalItem;
            return { ...originalItem, ...override.data, _isOverridden: true };
        },

        scanAndInjectPencils: function() {
            if (!this.isAdmin()) return;

            // Inietta matite su schede autore in pagina
            document.querySelectorAll('.author-card, .scheda-autore-card, .scheda-card, .author-detail-box').forEach(card => {
                const titleEl = card.querySelector('.author-name, .scheda-title, h2, h3, h4');
                if (titleEl && !titleEl.querySelector('.live-edit-quick-btn')) {
                    const authorName = card.getAttribute('data-author') || titleEl.textContent.trim();
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'live-edit-quick-btn';
                    btn.innerHTML = '✏️';
                    btn.title = `Modifica scheda ${authorName}`;
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        window.LiveEditor.openModal(`author_${authorName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, '');
                    };
                    titleEl.appendChild(btn);
                }
            });

            // Inietta matite su minigiochi, quiz e sfide
            document.querySelectorAll('.minigame-card, .quiz-card, .quiz-box, .game-item, .mission-card, .sfida-box').forEach((game, idx) => {
                const titleEl = game.querySelector('.minigame-title, .quiz-question, h3, h4, .mission-title');
                if (titleEl && !titleEl.querySelector('.live-edit-quick-btn')) {
                    const gId = game.getAttribute('data-game-id') || game.getAttribute('data-id') || `minigame_${idx}`;
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'live-edit-quick-btn';
                    btn.innerHTML = '✏️';
                    btn.title = 'Modifica testo di questo minigioco/sfida';
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        window.LiveEditor.openModal(`game_${gId}`, '');
                    };
                    titleEl.appendChild(btn);
                }
            });
        },

        renderBtn: function(itemKey, rawItemJson) {
            if (!this.isAdmin()) return '';
            const safeKey = String(itemKey).replace(/'/g, "\\'");
            let encodedData = '';
            try {
                encodedData = btoa(encodeURIComponent(JSON.stringify(rawItemJson)));
            } catch(e) { encodedData = ''; }

            return `
                <button type="button" class="live-edit-quick-btn" onclick="event.stopPropagation(); LiveEditor.openModal('${safeKey}', '${encodedData}')" title="Modifica al volo questo testo didattico (Solo Docente/Admin)">
                    ✏️
                </button>
            `;
        },

        openModal: function(itemKey, encodedData) {
            let item = null;
            if (encodedData) {
                try {
                    item = JSON.parse(decodeURIComponent(atob(encodedData)));
                } catch(e) {}
            }
            if (!item && this._originalCache[itemKey]) {
                item = this._originalCache[itemKey];
            }

            const existingOverride = this.overrides[itemKey] || {};
            const currentData = existingOverride.data || item || {};

            let rawText = currentData.schedaHTML || currentData.schedaHtml || currentData.text || currentData.q || currentData.frase || '';
            const cleanText = htmlToPlainText(rawText);
            const currentTitle = currentData.name || currentData.title || itemKey;

            let modal = document.getElementById('live-editor-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'live-editor-modal';
                modal.className = 'modal-overlay';
                modal.style.cssText = 'display: none; align-items: center; justify-content: center; z-index: 100000; background: rgba(15,23,42,0.85); backdrop-filter: blur(6px); position: fixed; inset: 0; padding: 20px;';
                document.body.appendChild(modal);
            }

            modal.innerHTML = `
                <div class="modal-content" style="background: #1e293b; color: #f8fafc; border-radius: 20px; border: 1.5px solid rgba(245,158,11,0.4); width: 100%; max-width: 640px; padding: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); font-family: inherit; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
                        <h3 style="margin: 0; color: #f59e0b; font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
                            ✏️ Modifica al Volo (${currentTitle})
                        </h3>
                        <button onclick="document.getElementById('live-editor-modal').style.display='none'" style="background: transparent; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; line-height: 1;">&times;</button>
                    </div>

                    <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0; margin-bottom: 14px;">
                        Modifica il testo didattico in modo semplice. Sarà visibile immediatamente a tutti gli studenti dell'Ecosistema.
                    </p>

                    <form onsubmit="event.preventDefault(); LiveEditor.save('${itemKey}', '${btoa(encodeURIComponent(rawText))}');">
                        <div style="margin-bottom: 14px;">
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 6px;">Testo o Descrizione:</label>
                            <textarea id="live-edit-text" class="form-control" rows="8" style="width: 100%; background: #0f172a; color: white; border: 1.5px solid rgba(245,158,11,0.3); border-radius: 10px; padding: 10px 12px; font-size: 0.95rem; font-family: inherit; resize: vertical;" required>${cleanText}</textarea>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px;">
                            ${existingOverride.docId ? `
                                <button type="button" onclick="LiveEditor.remove('${itemKey}')" style="background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid #ef4444; padding: 8px 14px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
                                    🔄 Ripristina Originale
                                </button>
                            ` : '<div></div>'}

                            <div style="display: flex; gap: 10px;">
                                <button type="button" onclick="document.getElementById('live-editor-modal').style.display='none'" style="background: rgba(255,255,255,0.1); color: #cbd5e1; border: none; padding: 9px 16px; border-radius: 8px; font-weight: 700; cursor: pointer;">
                                    Annulla
                                </button>
                                <button type="submit" style="background: #f59e0b; color: #0f172a; border: none; padding: 9px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(245,158,11,0.3);">
                                    💾 Salva Modifica
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            `;

            modal.style.display = 'flex';
        },

        save: async function(itemKey, encodedOriginal) {
            const textInput = document.getElementById('live-edit-text');
            const rawText = textInput ? textInput.value.trim() : '';

            if (!rawText) {
                alert("Il testo non può essere vuoto.");
                return;
            }

            let originalHtml = '';
            try { originalHtml = decodeURIComponent(atob(encodedOriginal)); } catch(e){}
            const formattedText = plainTextToHtml(rawText, originalHtml);

            const docId = `${this.platformKey}_${itemKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            const overridePayload = {
                platform: this.platformKey,
                platformName: this.platformName,
                itemKey: itemKey,
                data: {
                    schedaHTML: formattedText,
                    schedaHtml: formattedText,
                    text: formattedText,
                    frase: formattedText
                },
                updatedAt: new Date().toISOString(),
                author: 'prof.memmo@gmail.com',
                status: 'pending_github_sync'
            };

            const db = window.fbDb || window.db || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
            try {
                await db.collection('hub_didactic_overrides').doc(docId).set(overridePayload);
                this.overrides[itemKey] = { docId: docId, ...overridePayload };
                const modal = document.getElementById('live-editor-modal');
                if (modal) modal.style.display = 'none';
                alert("✅ Modifica salvata con successo!");
                this.refreshAdminPanels();
            } catch (e) {
                console.error("Errore salvataggio override Fanta:", e);
                alert("Errore durante il salvataggio: " + e.message);
            }
        },

        remove: async function(itemKey) {
            if (!confirm("Sei sicuro di voler ripristinare il testo originale?")) return;
            const docId = `${this.platformKey}_${itemKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            const db = window.fbDb || window.db || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
            try {
                await db.collection('hub_didactic_overrides').doc(docId).delete();
                delete this.overrides[itemKey];
                const modal = document.getElementById('live-editor-modal');
                if (modal) modal.style.display = 'none';
                alert("✅ Ripristinato il testo originale!");
                this.refreshAdminPanels();
            } catch (e) {
                console.error("Errore ripristino override:", e);
                alert("Errore: " + e.message);
            }
        },

        refreshAdminPanels: function() {
            if (document.getElementById('admin-live-editor-container')) {
                this.renderAdminPanel('admin-live-editor-container');
            }
        },

        /**
         * Renderizza il pannello completo all'interno della pagina Impostazioni / Admin
         */
        renderAdminPanel: function(containerId = 'admin-live-editor-container') {
            const container = document.getElementById(containerId);
            if (!container) return;

            const overrideList = Object.values(this.overrides);
            const count = overrideList.length;

            let rowsHtml = '';
            if (count === 0) {
                rowsHtml = `
                    <div style="text-align: center; padding: 25px 15px; color: var(--text-muted); background: rgba(0,0,0,0.2); border-radius: 10px; border: 1px dashed rgba(255,255,255,0.1);">
                        <i class="fa-solid fa-check-circle" style="color: #10b981; font-size: 1.8rem; margin-bottom: 8px; display: block;"></i>
                        <strong>Nessuna modifica al volo attiva al momento.</strong>
                        <p style="font-size: 0.85rem; margin: 5px 0 0 0;">Tutte le schede autore e i minigiochi utilizzano i testi didattici originali di fabbrica.</p>
                    </div>
                `;
            } else {
                rowsHtml = `
                    <div style="display: flex; flex-direction: column; gap: 10px; max-height: 380px; overflow-y: auto; padding-right: 5px;">
                        ${overrideList.map(item => {
                            const snippet = (item.data && (item.data.schedaHTML || item.data.schedaHtml || item.data.text || ''))
                                .replace(/<[^>]+>/g, ' ')
                                .slice(0, 110);
                            const dateStr = item.updatedAt ? new Date(item.updatedAt).toLocaleString('it-IT') : 'N/D';
                            const keyClean = item.itemKey || item.docId || '';

                            return `
                                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(245,158,11,0.25); border-radius: 10px; padding: 12px 16px; gap: 15px; flex-wrap: wrap;">
                                    <div style="flex: 1; min-width: 220px;">
                                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                            <span style="background: rgba(245,158,11,0.2); color: #f59e0b; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase;">${keyClean}</span>
                                            <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-regular fa-clock"></i> ${dateStr}</span>
                                        </div>
                                        <div style="font-size: 0.85rem; color: #e2e8f0; line-height: 1.4;">
                                            "${snippet}..."
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 8px;">
                                        <button type="button" class="btn" style="background: #f59e0b; color: #0f172a; padding: 6px 12px; font-size: 0.8rem; font-weight: bold; border-radius: 6px; border: none; cursor: pointer;" onclick="LiveEditor.openModal('${keyClean}', '')">
                                            ✏️ Modifica
                                        </button>
                                        <button type="button" class="btn" style="background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid #ef4444; padding: 6px 12px; font-size: 0.8rem; font-weight: bold; border-radius: 6px; cursor: pointer;" onclick="LiveEditor.remove('${keyClean}')">
                                            🔄 Ripristina
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }

            container.innerHTML = `
                <div style="margin-bottom: 25px; padding: 20px; border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 12px; background: rgba(245, 158, 11, 0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <h3 style="color: #f59e0b; margin: 0; font-size: 1.15rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-pen-to-square"></i> Live Editor Didattico (Correzioni al Volo)
                            </h3>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 4px 0 0 0;">
                                Modifica in tempo reale schede autore e testi senza toccare il codice sorgente.
                            </p>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span style="background: ${count > 0 ? '#f59e0b' : 'rgba(255,255,255,0.1)'}; color: ${count > 0 ? '#0f172a' : '#cbd5e1'}; font-weight: 800; font-size: 0.8rem; padding: 4px 12px; border-radius: 20px;">
                                ${count} ${count === 1 ? 'override attivo' : 'override attivi'}
                            </span>
                            <button type="button" class="btn" style="background: #3498db; color: white; padding: 6px 14px; font-size: 0.8rem; font-weight: bold; border-radius: 6px; border: none; cursor: pointer;" onclick="LiveEditor.init().then(() => LiveEditor.renderAdminPanel('${containerId}'))">
                                <i class="fa-solid fa-arrows-rotate"></i> Aggiorna
                            </button>
                            <button type="button" class="btn" style="background: #f59e0b; color: #0f172a; padding: 6px 14px; font-size: 0.8rem; font-weight: bold; border-radius: 6px; border: none; cursor: pointer;" onclick="const k = prompt('✏️ Inserisci la chiave dell\\'autore o del minigioco (es. author_a1, author_a2):', 'author_'); if(k) LiveEditor.openModal(k.trim(), '');">
                                <i class="fa-solid fa-plus"></i> Modifica Nuovo
                            </button>
                        </div>
                    </div>

                    ${rowsHtml}
                </div>
            `;
        }
    };

    // Stile CSS per il pulsante matitina
    const style = document.createElement('style');
    style.textContent = `
        .live-edit-quick-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(245, 158, 11, 0.15);
            color: #f59e0b;
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 6px;
            padding: 2px 6px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
            vertical-align: middle;
            margin-left: 6px;
        }
        .live-edit-quick-btn:hover {
            background: #f59e0b;
            color: #0f172a;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(async () => {
            await window.LiveEditor.init();
            if (document.getElementById('admin-live-editor-container')) {
                window.LiveEditor.renderAdminPanel('admin-live-editor-container');
            }
            window.LiveEditor.scanAndInjectPencils();
        }, 500);
    });

    setInterval(() => {
        if (window.LiveEditor && typeof window.LiveEditor.scanAndInjectPencils === 'function') {
            window.LiveEditor.scanAndInjectPencils();
        }
    }, 2500);
})();
