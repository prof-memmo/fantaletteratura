/**
 * LIVE EDITOR DIDATTICO (FantaLetteratura)
 * Consente all'Amministratore (prof.memmo@gmail.com) di correggere al volo
 * schede autore, testi e quiz di FantaLetteratura direttamente dal browser,
 * salvandoli su Firestore senza toccare i file sorgente su GitHub.
 */

(function() {
    window.LiveEditor = {
        platformKey: 'fantaletteratura',
        platformName: 'FantaLetteratura',
        overrides: {},
        isLoaded: false,

        init: async function() {
            const db = window.fbDb || window.db;
            if (!db) return;
            try {
                const snapshot = await db.collection('hub_didactic_overrides')
                    .where('platform', '==', this.platformKey)
                    .get();
                
                snapshot.forEach(doc => {
                    this.overrides[doc.id] = { docId: doc.id, ...doc.data() };
                });
                this.isLoaded = true;
                console.log(`✏️ Live Editor FantaLetteratura: Caricati ${Object.keys(this.overrides).length} override.`);
            } catch (e) {
                console.warn("Live Editor FantaLetteratura cloud error:", e);
            }
        },

        isAdmin: function() {
            if (typeof Auth !== 'undefined' && Auth.getUser) {
                const u = Auth.getUser();
                if (u && u.email && u.email.toLowerCase() === 'prof.memmo@gmail.com') return true;
            }
            if (typeof currentUserEmail !== 'undefined' && currentUserEmail && currentUserEmail.toLowerCase() === 'prof.memmo@gmail.com') return true;
            if (window.currentUser && window.currentUser.email && window.currentUser.email.toLowerCase() === 'prof.memmo@gmail.com') return true;
            return false;
        },

        apply: function(itemKey, originalItem) {
            if (!originalItem) return originalItem;
            const key = String(itemKey);
            const override = this.overrides[key];
            if (!override || !override.data) return originalItem;
            return { ...originalItem, ...override.data, _isOverridden: true };
        },

        renderBtn: function(itemKey, rawItemJson) {
            if (!this.isAdmin()) return '';
            const safeKey = String(itemKey).replace(/'/g, "\\'");
            let encodedData = '';
            try {
                encodedData = btoa(encodeURIComponent(JSON.stringify(rawItemJson)));
            } catch(e) { encodedData = ''; }

            return `
                <button type="button" class="live-edit-quick-btn" onclick="event.stopPropagation(); LiveEditor.openModal('${safeKey}', '${encodedData}')" title="Modifica al volo questo contenuto (Solo Admin)">
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
            const existingOverride = this.overrides[itemKey] || {};
            const currentData = existingOverride.data || item || {};

            let modal = document.getElementById('live-editor-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'live-editor-modal';
                modal.className = 'modal-overlay';
                modal.style.cssText = 'display: none; align-items: center; justify-content: center; z-index: 100000; background: rgba(15,23,42,0.8); backdrop-filter: blur(6px); position: fixed; inset: 0; padding: 20px;';
                document.body.appendChild(modal);
            }

            const currentText = currentData.schedaHTML || currentData.text || currentData.q || currentData.frase || '';
            const currentTitle = currentData.name || currentData.title || itemKey;

            modal.innerHTML = `
                <div class="modal-content" style="background: #1e293b; color: #f8fafc; border-radius: 20px; border: 1px solid rgba(245,197,60,0.3); width: 100%; max-width: 650px; padding: 25px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); font-family: inherit; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
                        <h3 style="margin: 0; color: #f5c53c; font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
                            ✏️ Modifica al Volo (${currentTitle})
                        </h3>
                        <button onclick="document.getElementById('live-editor-modal').style.display='none'" style="background: transparent; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; line-height: 1;">&times;</button>
                    </div>

                    <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 0; margin-bottom: 15px;">
                        Le correzioni salvate saranno attive <strong>immediatamente per tutti gli studenti</strong> tramite cloud.
                    </p>

                    <form onsubmit="event.preventDefault(); LiveEditor.save('${itemKey}');">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-weight: 700; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 5px;">Testo Contenuto / Scheda HTML:</label>
                            <textarea id="live-edit-text" class="input-field" rows="6" style="width: 100%; padding: 12px; border-radius: 10px; border: 1.5px solid #475569; background: #0f172a; color: white; font-size: 0.95rem;" required>${currentText}</textarea>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
                            ${existingOverride.docId ? `
                                <button type="button" onclick="LiveEditor.remove('${itemKey}')" style="background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid #ef4444; padding: 8px 16px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
                                    🔄 Ripristina Originale
                                </button>
                            ` : '<div></div>'}

                            <div style="display: flex; gap: 10px;">
                                <button type="button" onclick="document.getElementById('live-editor-modal').style.display='none'" style="background: rgba(255,255,255,0.1); color: #e2e8f0; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer;">
                                    Annulla
                                </button>
                                <button type="submit" style="background: #f5c53c; color: #0f172a; border: none; padding: 10px 22px; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(245,197,60,0.3);">
                                    💾 Salva Modifica
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            `;

            modal.style.display = 'flex';
        },

        save: async function(itemKey) {
            const db = window.fbDb || window.db;
            const textInput = document.getElementById('live-edit-text');
            const text = textInput ? textInput.value.trim() : '';

            if (!text) {
                alert("Il testo non può essere vuoto.");
                return;
            }

            const docId = `${this.platformKey}_${itemKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            const overridePayload = {
                platform: this.platformKey,
                platformName: this.platformName,
                itemKey: itemKey,
                data: {
                    schedaHTML: text,
                    text: text,
                    q: text
                },
                updatedAt: new Date().toISOString(),
                author: 'prof.memmo@gmail.com',
                status: 'pending_github_sync'
            };

            try {
                await db.collection('hub_didactic_overrides').doc(docId).set(overridePayload);
                this.overrides[itemKey] = { docId: docId, ...overridePayload };
                document.getElementById('live-editor-modal').style.display = 'none';
                alert("✅ Modifica salvata con successo!");
                
                // Ricarica la scheda se aperta
                if (itemKey.startsWith('author_') && typeof openAuthorSchedaModal === 'function') {
                    const authorId = itemKey.replace('author_', '');
                    openAuthorSchedaModal(authorId);
                }
            } catch (e) {
                console.error("Errore salvataggio override FantaLetteratura:", e);
                alert("Errore durante il salvataggio: " + e.message);
            }
        },

        remove: async function(itemKey) {
            if (!confirm("Sei sicuro di voler ripristinare il testo originale di base?")) return;
            const db = window.fbDb || window.db;
            const docId = `${this.platformKey}_${itemKey.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            try {
                await db.collection('hub_didactic_overrides').doc(docId).delete();
                delete this.overrides[itemKey];
                document.getElementById('live-editor-modal').style.display = 'none';
                alert("✅ Ripristinato il testo originale!");
                if (itemKey.startsWith('author_') && typeof openAuthorSchedaModal === 'function') {
                    const authorId = itemKey.replace('author_', '');
                    openAuthorSchedaModal(authorId);
                }
            } catch (e) {
                console.error("Errore ripristino override:", e);
                alert("Errore: " + e.message);
            }
        }
    };

    // Stile CSS per il pulsante matitina
    const style = document.createElement('style');
    style.textContent = `
        .live-edit-quick-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(245, 197, 60, 0.15);
            color: #f5c53c;
            border: 1px solid rgba(245, 197, 60, 0.3);
            border-radius: 8px;
            padding: 4px 8px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s ease;
            vertical-align: middle;
            margin-left: 8px;
        }
        .live-edit-quick-btn:hover {
            background: #f5c53c;
            color: #0f172a;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => window.LiveEditor.init(), 100);
    });
})();
