// =========================================================
// SERVIZIO CALENDARIO USCITE & AUTO-VALIDAZIONE FANTALETTERATURA
// =========================================================

window.CalendarService = {
    _overrides: {}, // { [releaseId]: { date: 'YYYY-MM-DD', forced: boolean, blocked: boolean } }
    _isInitialized: false,

    async init() {
        if (this._isInitialized) return;
        this._isInitialized = true;

        // 1. Carica configurazione locale/cache
        try {
            const cached = localStorage.getItem('fanta_calendar_overrides');
            if (cached) this._overrides = JSON.parse(cached);
        } catch (e) {}

        // 2. Ascolta modifiche in tempo reale da Firestore
        if (window.fbDb) {
            try {
                window.fbDb.collection('fanta_calendar').doc('releases_config')
                    .onSnapshot((doc) => {
                        if (doc && doc.exists) {
                            const data = doc.data() || {};
                            this._overrides = data.overrides || {};
                            try {
                                localStorage.setItem('fanta_calendar_overrides', JSON.stringify(this._overrides));
                            } catch (e) {}
                            
                            // Applica subito le validazioni
                            this.applyCalendarValidations();
                            
                            // Notifica la UI admin se aperta
                            if (typeof window.renderAdminCalendario === 'function') {
                                window.renderAdminCalendario();
                            }
                        }
                    }, (err) => {
                        console.warn("Errore listener Firestore calendario:", err);
                    });
            } catch (e) {
                console.warn("Inizializzazione listener calendario fallita:", e);
            }
        }

        // Applica le validazioni iniziali
        this.applyCalendarValidations();
    },

    getReleases() {
        const baseReleases = typeof CALENDAR_RELEASES !== 'undefined' ? CALENDAR_RELEASES : [];
        const todayStr = this.getTodayDateString();

        return baseReleases.map(rel => {
            const ov = this._overrides[rel.id] || {};
            const effectiveDate = ov.date || rel.date;
            const isForced = ov.forced === true;
            const isBlocked = ov.blocked === true;
            
            // Un'uscita è rilasciata se forzata, oppure se oggi >= data e NON è bloccata
            const isDateReached = todayStr >= effectiveDate;
            const isReleased = (isForced || isDateReached) && !isBlocked;

            let status = 'scheduled'; // 'scheduled' | 'released' | 'forced' | 'blocked'
            if (isBlocked) status = 'blocked';
            else if (isForced) status = 'forced';
            else if (isDateReached) status = 'released';

            return {
                ...rel,
                effectiveDate,
                isForced,
                isBlocked,
                isReleased,
                status
            };
        });
    },

    getTodayDateString() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    applyCalendarValidations() {
        const releases = this.getReleases();
        const releasedAuthorIds = new Set();

        releases.forEach(rel => {
            if (rel.isReleased && Array.isArray(rel.authorIds)) {
                rel.authorIds.forEach(id => releasedAuthorIds.add(id));
            }
        });

        // Applica a tutte le pool di autori in GAME_MODES
        if (typeof GAME_MODES !== 'undefined') {
            Object.keys(GAME_MODES).forEach(modeKey => {
                const mode = GAME_MODES[modeKey];
                if (mode && Array.isArray(mode.authors)) {
                    mode.authors.forEach(a => {
                        if (releasedAuthorIds.has(a.id)) {
                            a.isPointsRevealed = true;
                            a.isSchedaRevealed = true;
                        }
                    });
                }
            });
        }

        // Applica ad AUTHORS globale se presente
        if (typeof AUTHORS !== 'undefined' && Array.isArray(AUTHORS)) {
            AUTHORS.forEach(a => {
                if (releasedAuthorIds.has(a.id)) {
                    a.isPointsRevealed = true;
                    a.isSchedaRevealed = true;
                }
            });
        }
        if (typeof AUTHORS_SECONDE !== 'undefined' && Array.isArray(AUTHORS_SECONDE)) {
            AUTHORS_SECONDE.forEach(a => {
                if (releasedAuthorIds.has(a.id)) {
                    a.isPointsRevealed = true;
                    a.isSchedaRevealed = true;
                }
            });
        }
        if (typeof AUTHORS_INTERNAZIONALI !== 'undefined' && Array.isArray(AUTHORS_INTERNAZIONALI)) {
            AUTHORS_INTERNAZIONALI.forEach(a => {
                if (releasedAuthorIds.has(a.id)) {
                    a.isPointsRevealed = true;
                    a.isSchedaRevealed = true;
                }
            });
        }

        console.log(`📅 CalendarService: validate ${releasedAuthorIds.size} entità autore in base al calendario.`);
    },

    async updateReleaseDate(releaseId, newDate) {
        if (!newDate) return;
        if (!this._overrides[releaseId]) this._overrides[releaseId] = {};
        this._overrides[releaseId].date = newDate;
        await this._saveOverrides();
    },

    async forceRelease(releaseId, forcedState) {
        if (!this._overrides[releaseId]) this._overrides[releaseId] = {};
        this._overrides[releaseId].forced = forcedState;
        if (forcedState) this._overrides[releaseId].blocked = false;
        await this._saveOverrides();
    },

    async blockRelease(releaseId, blockedState) {
        if (!this._overrides[releaseId]) this._overrides[releaseId] = {};
        this._overrides[releaseId].blocked = blockedState;
        if (blockedState) this._overrides[releaseId].forced = false;
        await this._saveOverrides();
    },

    async resetRelease(releaseId) {
        if (this._overrides[releaseId]) {
            delete this._overrides[releaseId];
            await this._saveOverrides();
        }
    },

    async generateScheduleForSchoolYear(startDateStr) {
        if (!startDateStr) throw new Error("Data di inizio non valida.");
        
        const baseReleases = typeof CALENDAR_RELEASES !== 'undefined' ? CALENDAR_RELEASES : [];
        if (baseReleases.length === 0) throw new Error("Nessuna uscita configurata.");

        const startParts = startDateStr.split('-').map(Number);
        let curDate = new Date(startParts[0], startParts[1] - 1, startParts[2], 12, 0, 0);

        const newOverrides = {};

        baseReleases.forEach((rel, index) => {
            const y = curDate.getFullYear();
            const m = String(curDate.getMonth() + 1).padStart(2, '0');
            const d = String(curDate.getDate()).padStart(2, '0');
            const dateFormatted = `${y}-${m}-${d}`;

            newOverrides[rel.id] = {
                date: dateFormatted,
                forced: false,
                blocked: false
            };

            // Avanza di 14 giorni per la prossima uscita bisettimanale
            curDate.setDate(curDate.getDate() + 14);
        });

        this._overrides = newOverrides;
        await this._saveOverrides();
        return this.getReleases();
    },

    async _saveOverrides() {
        try {
            localStorage.setItem('fanta_calendar_overrides', JSON.stringify(this._overrides));
            if (window.fbDb) {
                await window.fbDb.collection('fanta_calendar').doc('releases_config').set({
                    overrides: this._overrides,
                    lastUpdated: new Date().toISOString(),
                    updatedBy: (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || 'admin'
                }, { merge: true });
            }
            this.applyCalendarValidations();
            if (typeof window.renderAdminCalendario === 'function') window.renderAdminCalendario();
            if (typeof window.renderAdminAutori === 'function') window.renderAdminAutori();
        } catch (e) {
            console.error("Errore salvataggio modifiche calendario:", e);
            alert("Errore salvataggio su Cloud: " + e.message);
        }
    }
};

// Auto-inizializzazione al caricamento dello script
document.addEventListener('DOMContentLoaded', () => {
    window.CalendarService.init();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.CalendarService.init();
}
