(function() {
    const GAME_ID = window.HUB_GAME_ID || "fantaletteratura";
    
    // Default allowed plans if DB fails or is missing
    let allowedPlans = {
        base: true,
        viandante: true,
        docente_didattico: true,
        docente_ecosistema: true
    };

    const FantaPermissions = {
        init: function() {
            // Listen to Hub Firebase for allowedPlans
            const checkInterval = setInterval(() => {
                if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
                    const hubApp = firebase.apps.find(a => a.name === "HubGuardApp");
                    if (hubApp) {
                        clearInterval(checkInterval);
                        hubApp.firestore().collection('games_status').doc(GAME_ID).onSnapshot(doc => {
                            if (doc.exists) {
                                const data = doc.data();
                                if (data.allowedPlans) {
                                    allowedPlans = data.allowedPlans;
                                } else if (data.isFreeBaseVersion !== undefined) {
                                    allowedPlans.base = data.isFreeBaseVersion;
                                }
                                // Re-evaluate access if user is already logged in
                                if (window.currentUserPiano) {
                                    this.checkAccess(window.currentUserPiano);
                                    this.lockUI();
                                }
                            }
                        });
                    }
                }
            }, 500);
            
            // Inietta CSS per i lucchetti
            const style = document.createElement('style');
            style.innerHTML = `
                .permission-locked {
                    position: relative;
                    opacity: 0.6;
                    cursor: not-allowed !important;
                    pointer-events: none; /* Prevents clicking */
                }
                .permission-locked::after {
                    content: '🔒';
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    font-size: 1.2rem;
                    background: rgba(255,255,255,0.8);
                    border-radius: 50%;
                    padding: 2px;
                }
                #plan-block-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(255,255,255,0.98); z-index: 999999;
                    display: none; flex-direction: column; align-items: center; justify-content: center;
                    font-family: 'Outfit', sans-serif; text-align: center;
                }
                #plan-block-overlay h2 { font-size: 2.5rem; color: #ef4444; margin-bottom: 1rem; }
                #plan-block-overlay p { font-size: 1.2rem; color: #6b7280; max-width: 500px; line-height: 1.5; margin-bottom: 2rem; }
                #plan-block-overlay .btn-upgrade {
                    background: linear-gradient(135deg, #8b5cf6, #d946ef); color: white;
                    padding: 15px 30px; font-size: 1.2rem; border-radius: 50px; font-weight: bold;
                    text-decoration: none; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
                }
            `;
            document.head.appendChild(style);

            // Inietta overlay blocco piano
            const overlay = document.createElement('div');
            overlay.id = 'plan-block-overlay';
            overlay.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 1rem;">⛔</div>
                <h2>Accesso non incluso</h2>
                <p>Il tuo abbonamento attuale (<span id="user-current-plan-display"></span>) non include l'accesso a questo gioco.</p>
                <a href="https://prof-memmo-hub.web.app" class="btn-upgrade">Passa a un Piano Superiore</a>
            `;
            document.documentElement.appendChild(overlay);
        },

        checkAccess: function(userPlanStr) {
            // Normalizza la stringa del piano per usarla come chiave
            let planKey = 'base';
            if (userPlanStr) {
                const p = userPlanStr.toLowerCase();
                if (p.includes('viandante')) planKey = 'viandante';
                else if (p.includes('docente') && p.includes('ecosistema')) planKey = 'docente_ecosistema';
                else if (p.includes('docente')) planKey = 'docente_didattico';
            }
            
            const overlay = document.getElementById('plan-block-overlay');
            if (allowedPlans[planKey] === false) {
                // Access blocked
                document.getElementById('user-current-plan-display').textContent = userPlanStr || 'Base';
                overlay.style.display = 'flex';
            } else {
                // Access granted
                overlay.style.display = 'none';
            }
        },

        can: function(action) {
            let planKey = 'base';
            if (window.currentUserPiano) {
                const p = window.currentUserPiano.toLowerCase();
                if (p.includes('viandante')) planKey = 'viandante';
                else if (p.includes('docente') && p.includes('ecosistema')) planKey = 'docente_ecosistema';
                else if (p.includes('docente')) planKey = 'docente_didattico';
            }

            // Regole specifiche per FantaLetteratura
            if (planKey === 'docente_didattico' || planKey === 'docente_ecosistema') return true;

            if (planKey === 'base') {
                if (action === 'create_team') {
                    // Controlliamo il numero di squadre max da fuori (in app.js)
                    return true; 
                }
                if (action === 'use_tornei' || action === 'use_missioni') return false;
            }

            if (planKey === 'viandante') {
                // Viandante = no funzioni classe/docente
                if (action === 'create_class' || action === 'gestione_studenti' || action === 'tornei_classe') return false;
            }

            return true;
        },

        lockUI: function() {
            // Rimuove lock vecchi
            document.querySelectorAll('.permission-locked').forEach(el => {
                el.classList.remove('permission-locked');
                el.onclick = el.dataset.originalOnclick ? new Function(el.dataset.originalOnclick) : null;
            });

            // Selezioniamo i pulsanti/tab da bloccare
            if (!this.can('use_tornei')) {
                const torneiBtn = document.querySelector('[onclick*="view-torneo"]');
                const torneiTab = document.querySelector('[data-view="view-torneo"]');
                if (torneiBtn) this.applyLock(torneiBtn);
                if (torneiTab) this.applyLock(torneiTab);
            }

            if (!this.can('use_missioni')) {
                const missioniBtn = document.querySelector('[onclick*="view-missioni"]');
                const missioniTab = document.querySelector('[data-view="view-missioni"]');
                if (missioniBtn) this.applyLock(missioniBtn);
                if (missioniTab) this.applyLock(missioniTab);
            }
        },

        applyLock: function(element) {
            element.classList.add('permission-locked');
            if (element.getAttribute('onclick')) {
                element.dataset.originalOnclick = element.getAttribute('onclick');
                element.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    alert("Funzionalità non disponibile nel tuo piano attuale.");
                };
            }
        }
    };

    window.FantaPermissions = FantaPermissions;
    document.addEventListener('DOMContentLoaded', () => FantaPermissions.init());
})();
