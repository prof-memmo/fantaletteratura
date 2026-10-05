/**
 * ===================================================================
 * MINIGUIDA-SERVICE.JS - Modulo Dinamico per Tutorial / Miniguida
 * Progetto: Fantaletteratura (Ecosistema Prof. Memmo)
 * ===================================================================
 */

(function(window) {
    'use strict';

    const SUPER_ADMIN_EMAIL = 'prof.memmo@gmail.com';

    const DEFAULT_MINIGUIDA = {
        title: "Come si gioca?",
        themeColor: "#8b5cf6",
        steps: [
            {
                icon: "fa-pen-nib",
                title: "Crea la tua Rosa di 5 Autori",
                text: "✍️ <strong>Crea la tua Rosa di 5 Autori:</strong><br>Scegli e acquista i tuoi 5 autori preferiti della storia letteraria (<em>da Dante a Pirandello, da Calvino a Leopardi</em>)."
            },
            {
                icon: "fa-dice",
                title: "Bonus, Malus & Imprevisti",
                text: "🎲 <strong>Bonus, Malus &amp; Imprevisti:</strong><br>Guadagna o perdi punti durante l'anno scolastico in base agli eventi storici e alle vicende biografiche degli autori."
            },
            {
                icon: "fa-puzzle-piece",
                title: "Minigiochi Letterari alla LIM",
                text: "🧩 <strong>Minigiochi Letterari alla LIM:</strong><br>Sfida le altre squadre della classe con <em>Quiz, Cloze, Versi e Puzzle</em> per conquistare punti extra."
            },
            {
                icon: "fa-trophy",
                title: "Scala la Classifica",
                text: "🏆 <strong>Scala la Classifica:</strong><br>Completa le missioni didattiche del docente e porta la tua fanta-squadra in vetta al <strong>Campionato Letterario</strong>!"
            }
        ]
    };

    const MiniguidaService = {
        _gameKey: 'fanta',
        _collectionName: 'fanta_settings',
        _docId: 'miniguida',
        _storageKey: 'fanta_miniguida_data',
        _data: null,
        _currentStep: 0,
        _isInitialized: false,
        _listeners: [],

        getDefaultData() {
            return JSON.parse(JSON.stringify(DEFAULT_MINIGUIDA));
        },

        getData() {
            return this._data || this.getDefaultData();
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
            const data = this.getData();
            this._listeners.forEach(cb => {
                try { cb(data); } catch (e) { console.error("Errore listener Fanta MiniguidaService:", e); }
            });
            this.renderModal();
        },

        async init() {
            try {
                const cached = localStorage.getItem(this._storageKey);
                if (cached) {
                    this._data = JSON.parse(cached);
                }
            } catch (e) {
                console.warn("Errore lettura cache miniguida fanta:", e);
            }

            if (!this._data) {
                this._data = this.getDefaultData();
            }

            this._notify();

            if (this._isInitialized) return;
            this._isInitialized = true;

            const db = window.fbDb || (window.firebase && window.firebase.firestore ? window.firebase.firestore() : null);
            if (!db) return;

            try {
                db.collection(this._collectionName).doc(this._docId)
                    .onSnapshot(docSnap => {
                        if (docSnap.exists) {
                            const data = docSnap.data();
                            if (data && data.steps && Array.isArray(data.steps)) {
                                this._data = data;
                                try { localStorage.setItem(this._storageKey, JSON.stringify(data)); } catch (e) {}
                                this._notify();
                            }
                        }
                    }, err => {
                        console.warn("Firestore snapshot miniguida fanta (offline ok):", err.message);
                    });
            } catch (e) {
                console.warn("Init Firestore miniguida fanta fallita:", e);
            }
        },

        async saveToCloud(newData) {
            const db = window.fbDb || (window.firebase && window.firebase.firestore ? window.firebase.firestore() : null);
            this._data = newData;
            try { localStorage.setItem(this._storageKey, JSON.stringify(newData)); } catch (e) {}
            this._notify();

            if (!db) return true;

            const payload = {
                title: newData.title || DEFAULT_MINIGUIDA.title,
                themeColor: newData.themeColor || DEFAULT_MINIGUIDA.themeColor,
                steps: newData.steps || DEFAULT_MINIGUIDA.steps,
                lastUpdated: new Date().toISOString(),
                updatedBy: SUPER_ADMIN_EMAIL
            };

            await db.collection(this._collectionName).doc(this._docId).set(payload, { merge: true });
            return true;
        },

        // Gestione Modal Gioco
        openModal() {
            this._currentStep = 0;
            this.renderModal();
            const modal = document.getElementById('modal-miniguida');
            if (modal) {
                modal.style.display = 'flex';
            }
        },

        closeModal() {
            const modal = document.getElementById('modal-miniguida');
            if (modal) {
                modal.style.display = 'none';
            }
        },

        nextStep() {
            const total = (this._data && this._data.steps) ? this._data.steps.length : DEFAULT_MINIGUIDA.steps.length;
            if (this._currentStep < total - 1) {
                this._currentStep++;
                this.updateView();
            } else {
                this.closeModal();
            }
        },

        updateView() {
            const data = this.getData();
            const total = data.steps.length;
            for (let i = 0; i < total; i++) {
                const el = document.getElementById('miniguida-step-' + i);
                if (el) el.style.display = (i === this._currentStep) ? 'flex' : 'none';
                const dotsEl = document.getElementById('miniguida-dots');
                if (dotsEl && dotsEl.children[i]) {
                    dotsEl.children[i].style.background = (i === this._currentStep) ? 'var(--primary-color)' : '#e2e8f0';
                }
            }
            const nextBtn = document.getElementById('miniguida-next-btn');
            if (nextBtn) {
                nextBtn.innerText = (this._currentStep === total - 1) ? 'GIOCA!' : 'AVANTI';
            }
        },

        renderModal() {
            const data = this.getData();
            const titleEl = document.getElementById('miniguida-title');
            if (titleEl) titleEl.innerText = data.title || "Come si gioca?";

            // Rigenera step dinamicamente se necessario
            const stepsContainer = document.querySelector('#modal-miniguida .modal-content > div:nth-child(2)');
            if (!stepsContainer) return;

            data.steps.forEach((step, idx) => {
                let stepEl = document.getElementById('miniguida-step-' + idx);
                if (stepEl) {
                    const iconEl = stepEl.querySelector('i');
                    const textEl = stepEl.querySelector('p');
                    if (iconEl && step.icon) {
                        iconEl.className = step.icon.startsWith('fa-') ? `fa-solid ${step.icon}` : 'fa-solid fa-feather';
                    }
                    if (textEl && step.text) {
                        textEl.innerHTML = step.text;
                    }
                }
            });
            this.updateView();
        },

        // Render Live Editor nella Dashboard Admin (admin.html)
        renderAdminEditor(containerId = 'fanta-miniguida-editor-container') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            const data = this.getData();

            container.innerHTML = `
                <div class="glass" style="padding: 20px; margin: 0 15px 20px 15px; border-radius: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                        <div>
                            <h2 style="margin: 0; color: var(--accent-gold);"><i class="fa-solid fa-chalkboard-user"></i> Miniguida Gioco • Live Editor</h2>
                            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">Modifica i passi del tutorial visibile agli studenti alla LIM o da casa.</p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
                        <!-- Form Modifica -->
                        <div>
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">Titolo Miniguida:</label>
                                <input type="text" id="admin-fanta-miniguida-title" value="${data.title || 'Come si gioca?'}" class="input-field" style="width: 100%; padding: 10px 14px; border-radius: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); color: #fff;" oninput="window.FantaMiniguidaService.updatePreviewFromForm()">
                            </div>

                            <div id="admin-fanta-steps-list">
                                ${data.steps.map((step, idx) => `
                                    <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; margin-bottom: 12px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                            <strong style="color: var(--accent-gold); font-size: 0.85rem;">Passo ${idx + 1}</strong>
                                            <div style="display: flex; gap: 6px; align-items: center;">
                                                <input type="text" class="fanta-step-icon" value="${step.icon || 'fa-feather'}" style="width: 110px; padding: 4px 8px; background: #070a13; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; font-size: 0.8rem;" title="Classe Icona FontAwesome" oninput="window.FantaMiniguidaService.updatePreviewFromForm()">
                                                <button type="button" onclick="window.FantaMiniguidaService.removeStep(${idx})" style="background: #ef4444; color: #fff; border: none; border-radius: 6px; padding: 4px 8px; font-size: 0.75rem; cursor: pointer;">✕</button>
                                            </div>
                                        </div>
                                        <input type="text" class="fanta-step-title" value="${step.title || ''}" placeholder="Titolo passo..." style="width: 100%; padding: 6px 10px; background: #070a13; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; font-size: 0.85rem; margin-bottom: 6px;" oninput="window.FantaMiniguidaService.updatePreviewFromForm()">
                                        <textarea class="fanta-step-text" rows="3" style="width: 100%; padding: 8px 10px; background: #070a13; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; font-size: 0.85rem; line-height: 1.4; resize: vertical;" placeholder="Testo descrittivo..." oninput="window.FantaMiniguidaService.updatePreviewFromForm()">${step.text || ''}</textarea>
                                    </div>
                                `).join('')}
                            </div>

                            <button type="button" onclick="window.FantaMiniguidaService.addStep()" class="btn btn-secondary" style="width: 100%; margin-bottom: 15px; border-radius: 8px;">
                                <i class="fa-solid fa-plus"></i> Aggiungi Passo
                            </button>

                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                <button type="button" id="btn-save-fanta-miniguida" onclick="window.FantaMiniguidaService.handleSaveButton()" class="btn btn-primary" style="padding: 10px 20px; font-weight: 700; border-radius: 20px;">
                                    <i class="fa-solid fa-floppy-disk"></i> Salva Miniguida
                                </button>
                                <button type="button" onclick="window.FantaMiniguidaService.handleResetButton()" class="btn btn-secondary" style="border-radius: 20px;">
                                    <i class="fa-solid fa-rotate-left"></i> Ripristina Predefiniti
                                </button>
                            </div>
                        </div>

                        <!-- Live Preview -->
                        <div>
                            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">Anteprima Live (Come appare agli studenti):</label>
                            <div style="background: white; border-radius: 20px; padding: 20px; color: #1e293b; display: flex; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); min-height: 420px; position: relative;">
                                <div style="width: 35%; background: #f8fafc; display: flex; align-items: flex-end; justify-content: center; border-right: 1.5px solid #f1f5f9; padding-top: 15px;">
                                    <img src="assets/prof_memmo_full.jpg" onerror="this.src='https://gestionesiti.profmemmo.it/shared/assets/branding/prof-memmo/prof-memmo-full.jpg';" alt="Prof Memmo" style="width: 120%; object-fit: contain; mix-blend-mode: multiply;">
                                </div>
                                <div style="flex: 1; padding: 15px 20px; display: flex; flex-direction: column; justify-content: space-between;">
                                    <div>
                                        <h3 id="preview-fanta-modal-title" style="color: #8b5cf6; margin: 0 0 15px 0; font-size: 1.3rem; font-weight: 900; text-transform: uppercase; text-align: center;">${data.title || 'Come si gioca?'}</h3>
                                        <div style="text-align: center; margin-top: 15px;">
                                            <div id="preview-fanta-step-icon" style="font-size: 3.5rem; margin-bottom: 10px; color: #8b5cf6;">
                                                <i class="fa-solid ${data.steps[0]?.icon || 'fa-pen-nib'}"></i>
                                            </div>
                                            <h4 id="preview-fanta-step-title" style="margin: 0 0 8px 0; color: #0f172a; font-size: 1.05rem; font-weight: 800;">1. ${data.steps[0]?.title || ''}</h4>
                                            <div id="preview-fanta-step-text" style="color: #475569; font-size: 0.95rem; line-height: 1.5;">${data.steps[0]?.text || ''}</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
                                        <span id="preview-fanta-step-num" style="font-size: 0.75rem; font-weight: 700; color: #94a3b8;">Passo 1 di ${data.steps.length}</span>
                                        <div style="display: flex; gap: 6px;">
                                            <button type="button" onclick="window.FantaMiniguidaService.previewStepPrev()" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.8rem; border-radius: 6px;">◀</button>
                                            <button type="button" onclick="window.FantaMiniguidaService.previewStepNext()" class="btn btn-primary" style="padding: 4px 14px; font-size: 0.8rem; font-weight: 700; border-radius: 6px;">Avanti ▶</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        _previewIndex: 0,

        getFormData() {
            const titleInput = document.getElementById('admin-fanta-miniguida-title');
            const stepBlocks = document.querySelectorAll('#admin-fanta-steps-list > div');
            const steps = [];

            stepBlocks.forEach(block => {
                const icon = block.querySelector('.fanta-step-icon')?.value || 'fa-feather';
                const title = block.querySelector('.fanta-step-title')?.value || '';
                const text = block.querySelector('.fanta-step-text')?.value || '';
                steps.push({ icon, title, text });
            });

            return {
                title: titleInput ? titleInput.value : 'Come si gioca?',
                themeColor: '#8b5cf6',
                steps: steps.length > 0 ? steps : this.getDefaultData().steps
            };
        },

        updatePreviewFromForm() {
            const data = this.getFormData();
            const total = data.steps.length;
            if (this._previewIndex >= total) this._previewIndex = total - 1;
            if (this._previewIndex < 0) this._previewIndex = 0;

            const curr = data.steps[this._previewIndex] || data.steps[0];
            const titleEl = document.getElementById('preview-fanta-modal-title');
            const iconEl = document.getElementById('preview-fanta-step-icon');
            const stepTitleEl = document.getElementById('preview-fanta-step-title');
            const textEl = document.getElementById('preview-fanta-step-text');
            const numEl = document.getElementById('preview-fanta-step-num');

            if (titleEl) titleEl.innerText = data.title;
            if (iconEl) {
                const iconClass = curr?.icon || 'fa-feather';
                iconEl.innerHTML = iconClass.startsWith('fa-') ? `<i class="fa-solid ${iconClass}"></i>` : iconClass;
            }
            if (stepTitleEl) stepTitleEl.innerHTML = `${this._previewIndex + 1}. ${curr?.title || ''}`;
            if (textEl) textEl.innerHTML = curr?.text || '';
            if (numEl) numEl.innerText = `Passo ${this._previewIndex + 1} di ${total}`;
        },

        previewStepNext() {
            const data = this.getFormData();
            if (this._previewIndex < data.steps.length - 1) {
                this._previewIndex++;
                this.updatePreviewFromForm();
            }
        },

        previewStepPrev() {
            if (this._previewIndex > 0) {
                this._previewIndex--;
                this.updatePreviewFromForm();
            }
        },

        addStep() {
            const data = this.getFormData();
            data.steps.push({
                icon: 'fa-star',
                title: 'Nuovo Passo',
                text: 'Descrivi la nuova regola o funzionalità...'
            });
            this._data = data;
            this.renderAdminEditor();
        },

        removeStep(idx) {
            const data = this.getFormData();
            if (data.steps.length <= 1) {
                alert("La miniguida deve avere almeno un passo!");
                return;
            }
            data.steps.splice(idx, 1);
            this._data = data;
            this.renderAdminEditor();
        },

        async handleSaveButton() {
            const data = this.getFormData();
            const btn = document.getElementById('btn-save-fanta-miniguida');
            const orig = btn ? btn.innerHTML : '';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Salvataggio...`;
            }

            try {
                await this.saveToCloud(data);
                if (btn) {
                    btn.innerHTML = `<i class="fa-solid fa-check"></i> Salvato!`;
                    btn.style.background = '#22c55e';
                }
                setTimeout(() => {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = orig;
                        btn.style.background = '';
                    }
                }, 2000);
            } catch (err) {
                alert("Errore salvataggio: " + (err.message || err));
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = orig;
                }
            }
        },

        handleResetButton() {
            if (!confirm("Vuoi ripristinare la miniguida ai valori predefiniti?")) return;
            this._data = this.getDefaultData();
            this.renderAdminEditor();
        }
    };

    window.MiniguidaService = MiniguidaService;
    window.FantaMiniguidaService = MiniguidaService;

    // Inizializzazione automatica
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => MiniguidaService.init());
    } else {
        MiniguidaService.init();
    }
})(window);
