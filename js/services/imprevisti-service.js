// =========================================================
// SERVIZIO IMPREVISTI & MERCATO INDIPENDENTE (SUPER-ADMIN ONLY)
// =========================================================

window.ImprevistiService = {
    _events: [], // Array di eventi programmati { id, date, cardId, title, subtitle, lore, authorId, authorName, effectType, points, isMarket, icon, isForcedActive, isBlocked }
    _isInitialized: false,

    // DECK UFFICIALE: Lore Letterario Reale Autentico
    // DECK UFFICIALE: Lore Letterario Reale Autentico con ID Autori Esatti
    LORE_DECK: [
        {
            cardId: 'dante_esilio',
            title: '⚜️ Dante cacciato da Firenze',
            subtitle: "L'esilio e la condanna al rogo",
            lore: "Nel 1302 i Guelfi Neri condannano Dante all'esilio perpetuo. Il poeta inizia il suo doloroso peregrinare per le corti d'Italia lontano dalla sua amata Firenze.",
            authorId: 'dante-alighieri-sec',
            authorName: 'Dante Alighieri',
            effectType: 'malus',
            points: -2,
            isMarket: false,
            icon: 'fa-solid fa-feather-pointed',
            color: '#ef4444'
        },
        {
            cardId: 'manzoni_arno',
            title: '🌊 Manzoni sciacqua i panni in Arno',
            subtitle: 'La svolta linguistica fiorentina',
            lore: "Nel 1827 Manzoni si reca a Firenze per risciacquare la lingua de 'I Promessi Sposi' nel fiorentino colto, creando il modello della lingua italiana unita.",
            authorId: 'a3',
            authorName: 'Alessandro Manzoni',
            effectType: 'bonus',
            points: 3,
            isMarket: false,
            icon: 'fa-solid fa-water',
            color: '#3b82f6'
        },
        {
            cardId: 'foscolo_londra',
            title: '🎲 Foscolo perde tutto a Londra',
            subtitle: 'Debiti e gioco nei circoli inglesi',
            lore: "Nell'esilio londinese Ugo Foscolo conduce una vita dispendiosa nei circoli aristocratici, accumulando pesanti debiti che lo costringono a nascondersi sotto falso nome.",
            authorId: 'a1',
            authorName: 'Ugo Foscolo',
            effectType: 'malus',
            points: -2,
            isMarket: false,
            icon: 'fa-solid fa-dice',
            color: '#f97316'
        },
        {
            cardId: 'carducci_nobel',
            title: '🏆 Carducci vince il Nobel',
            subtitle: 'Primo italiano a trionfare a Stoccolma',
            lore: "Nel 1906 Giosuè Carducci è il primo autore italiano a vincere il Premio Nobel per la Letteratura, celebrato per la forza plastica e classica delle sue Odi Barbare.",
            authorId: 'a4',
            authorName: 'Giosuè Carducci',
            effectType: 'bonus',
            points: 4,
            isMarket: false,
            icon: 'fa-solid fa-trophy',
            color: '#f59e0b'
        },
        {
            cardId: 'petrarca_alloro',
            title: "👑 Petrarca incoronato d'Alloro",
            subtitle: 'Trionfo solenne in Campidoglio',
            lore: "L'8 aprile 1341 a Roma, Francesco Petrarca viene incoronato Poeta Laureato sul colle del Campidoglio, consacrando la sua gloria umanistica imperitura.",
            authorId: 'francesco-petrarca',
            authorName: 'Francesco Petrarca',
            effectType: 'bonus',
            points: 4,
            isMarket: false,
            icon: 'fa-solid fa-crown',
            color: '#eab308'
        },
        {
            cardId: 'leopardi_studio',
            title: '🌙 Leopardi e lo Studio Matto',
            subtitle: 'Notti insonni nella biblioteca di Recanati',
            lore: "Sette anni di studio matto e disperatissimo nella biblioteca paterna logorano il corpo del giovane Giacomo, ma generano la lirica più sublime della poesia moderna.",
            authorId: 'a2',
            authorName: 'Giacomo Leopardi',
            effectType: 'bonus',
            points: 2,
            isMarket: false,
            icon: 'fa-solid fa-moon',
            color: '#8b5cf6'
        },
        {
            cardId: 'boccaccio_censura',
            title: '🔥 Boccaccio sotto Censura',
            subtitle: "Le novelle del Decameron all'Indice",
            lore: "La vivacità terrena e le beffe anticlericali del Decameron attirano le ire dei predicatori e la censura moralista, costringendo Boccaccio a dolorose ritrattazioni morali.",
            authorId: 'giovanni-boccaccio',
            authorName: 'Giovanni Boccaccio',
            effectType: 'malus',
            points: -3,
            isMarket: false,
            icon: 'fa-solid fa-fire',
            color: '#dc2626'
        },
        {
            cardId: 'pirandello_teatro',
            title: '🎭 Pirandello e i Sei Personaggi',
            subtitle: 'Rivoluzione scenica mondiale',
            lore: "La prima di 'Sei personaggi in cerca d'autore' fa scalpore al Teatro Valle di Roma: il pubblico grida 'Manicomio!', ma nasce il teatro moderno che conquista Broadway e Parigi.",
            authorId: 'a8',
            authorName: 'Luigi Pirandello',
            effectType: 'bonus',
            points: 3,
            isMarket: false,
            icon: 'fa-solid fa-masks-theater',
            color: '#10b981'
        },
        {
            cardId: 'ariosto_estensi',
            title: "🏰 Ariosto alla Corte di Ferrara",
            subtitle: "L'Orlando Furioso tra i duchi",
            lore: "Ludovico Ariosto presenta l'Orlando Furioso alla corte estense: 'Messer Ludovico, dove mai avete trovato tante corbellerie?', esclama il cardinale Ippolito, ma il poema diventa leggenda.",
            authorId: 'ludovico-ariosto',
            authorName: 'Ludovico Ariosto',
            effectType: 'bonus',
            points: 3,
            isMarket: false,
            icon: 'fa-solid fa-chess-rook',
            color: '#06b6d4'
        },
        {
            cardId: 'verga_verismo',
            title: '🌾 Verga e la Vita dei Campi',
            subtitle: 'Ritorno alla terra e Verismo',
            lore: "Verga abbandona i romanzi mondani milanesi per immergersi nelle passioni tragiche della Sicilia rurale con 'Vita dei Campi' e 'I Malavoglia', inaugurando la poetica dell'impersonalità.",
            authorId: 'a5',
            authorName: 'Giovanni Verga',
            effectType: 'bonus',
            points: 2,
            isMarket: false,
            icon: 'fa-solid fa-wheat-awn',
            color: '#d97706'
        },
        {
            cardId: 'calvino_antenati',
            title: '🌲 Calvino e il Barone Rampante',
            subtitle: 'La trilogia dei nostri antenati',
            lore: "Cosimo Piovasco di Rondò sale sugli alberi e non ne scenderà mai più: Calvino pubblica 'Il Barone Rampante', celebrato per il connubio perfetto tra favola morale e illuminismo.",
            authorId: 'a14',
            authorName: 'Italo Calvino',
            effectType: 'bonus',
            points: 3,
            isMarket: false,
            icon: 'fa-solid fa-tree',
            color: '#16a34a'
        },
        {
            cardId: 'dannunzio_vienna',
            title: '✈️ D\'Annunzio e il Volo su Vienna',
            subtitle: 'Gesto audace e gloria patriottica',
            lore: "Il 9 agosto 1918 Gabriele D'Annunzio lancia 400.000 volantini tricolori su Vienna con la squadriglia Serenissima, compiendo un'impresa propagandistica e letteraria senza precedenti.",
            authorId: 'a7',
            authorName: "Gabriele D'Annunzio",
            effectType: 'bonus',
            points: 3,
            isMarket: false,
            icon: 'fa-solid fa-plane',
            color: '#6366f1'
        },
        {
            cardId: 'montale_ossi',
            title: '🌊 Montale e gli Ossi di Seppia',
            subtitle: 'La poesia scabra del Novecento',
            lore: "Nel 1925 Eugenio Montale pubblica 'Ossi di seppia': la pietra lavica della Liguria e il 'male di vivere' diventano pietre miliari della lirica novecentesca.",
            authorId: 'a11',
            authorName: 'Eugenio Montale',
            effectType: 'bonus',
            points: 3,
            isMarket: false,
            icon: 'fa-solid fa-water',
            color: '#0284c7'
        },
        {
            cardId: 'ungaretti_carso',
            title: '🪖 Ungaretti al Fronte del Carso',
            subtitle: 'Versi essenziali tra le trincee',
            lore: "Foglietti di carta scritti nel fango delle trincee durante la Grande Guerra: nasce 'Il Porto Sepolto', rivoluzionando per sempre la metrica e la brevità della poesia.",
            authorId: 'a10',
            authorName: 'Giuseppe Ungaretti',
            effectType: 'bonus',
            points: 3,
            isMarket: false,
            icon: 'fa-solid fa-pen-nib',
            color: '#84cc16'
        },
        {
            cardId: 'mercato_autunno',
            title: '🔁 Finestra di Mercato: Sessione Autunnale',
            subtitle: '1 Cambio Rosa per tutte le squadre',
            lore: "I presidenti di lega e gli studenti possono effettuare 1 sostituzione strategica nella propria rosa di autori per riallineare la formazione prima delle grandi sfide.",
            authorId: null,
            authorName: null,
            effectType: 'market',
            points: 0,
            isMarket: true,
            icon: 'fa-solid fa-repeat',
            color: '#38bdf8'
        },
        {
            cardId: 'mercato_primavera',
            title: '🔁 Finestra di Mercato: Sessione Primaverile',
            subtitle: '1 Cambio Rosa per la volata finale',
            lore: "Sessione di riparazione primaverile: si apre la finestra per 1 cambio di formazione prima del gran finale del campionato di FantaLetteratura.",
            authorId: null,
            authorName: null,
            effectType: 'market',
            points: 0,
            isMarket: true,
            icon: 'fa-solid fa-arrows-rotate',
            color: '#38bdf8'
        }
    ],

    // Mappa di tutti gli autori registrati nel database del gioco
    getAllAuthors() {
        const authors = [];
        const seen = new Set();
        const collect = (list, modeName) => {
            if (Array.isArray(list)) {
                list.forEach(a => {
                    if (a && a.id && !seen.has(a.id)) {
                        seen.add(a.id);
                        authors.push({ ...a, modeGroup: modeName });
                    }
                });
            }
        };
        if (typeof AUTHORS !== 'undefined') collect(AUTHORS, 'Contemporanea');
        if (typeof AUTHORS_SECONDE !== 'undefined') collect(AUTHORS_SECONDE, 'Medievale e Moderna');
        if (typeof AUTHORS_INTERNAZIONALI !== 'undefined') collect(AUTHORS_INTERNAZIONALI, 'Internazionali');
        return authors;
    },

    getAuthorById(authorId) {
        if (!authorId) return null;
        const all = this.getAllAuthors();
        return all.find(a => a.id === authorId || a.id === authorId.toLowerCase()) || null;
    },

    async init() {
        if (this._isInitialized) return;
        this._isInitialized = true;

        // 1. Carica da cache locale
        try {
            const cached = localStorage.getItem('fanta_imprevisti_events');
            if (cached) {
                this._events = JSON.parse(cached);
            }
        } catch (e) {
            console.warn("Errore lettura cache imprevisti:", e);
        }

        // 2. Realtime listener da Firestore
        const db = window.db || window.fbDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
        if (db) {
            try {
                db.collection('fanta_imprevisti').doc('timeline_config')
                    .onSnapshot(async (doc) => {
                        if (doc && doc.exists) {
                            const data = doc.data() || {};
                            this._events = Array.isArray(data.events) ? data.events : [];
                            try {
                                localStorage.setItem('fanta_imprevisti_events', JSON.stringify(this._events));
                            } catch (e) {}

                            // Aggiorna UI Admin se aperta
                            if (typeof window.renderAdminImprevisti === 'function') {
                                window.renderAdminImprevisti();
                            }
                            // Aggiorna vista Studenti se presente
                            if (typeof window.renderStudentImprevistiNotice === 'function') {
                                window.renderStudentImprevistiNotice();
                            }
                        } else if (doc && !doc.exists) {
                            // Inizializza su Firestore con la lista eventi corrente (o vuota)
                            try {
                                await db.collection('fanta_imprevisti').doc('timeline_config').set({
                                    events: this._events || [],
                                    deckCount: (this.LORE_DECK || []).length,
                                    lastUpdated: new Date().toISOString(),
                                    updatedBy: (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || 'admin'
                                }, { merge: true });
                            } catch (errInit) {
                                // Se l'utente non è Super-Admin, ignora
                            }
                        }
                    }, (err) => {
                        console.warn("Errore listener Firestore imprevisti:", err);
                    });
            } catch (e) {
                console.warn("Inizializzazione listener imprevisti fallita:", e);
            }
        }
    },

    getTodayString() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    getDeck() {
        return this.LORE_DECK;
    },

    getCardById(cardId) {
        return this.LORE_DECK.find(c => c.cardId === cardId) || null;
    },

    getEvents() {
        const todayStr = this.getTodayString();
        // Ordina cronologicamente per data
        return [...this._events].sort((a, b) => (a.date || '').localeCompare(b.date || '')).map(ev => {
            const isToday = ev.date === todayStr;
            const isPast = (ev.date || '') < todayStr;
            const isFuture = (ev.date || '') > todayStr;
            
            let status = 'scheduled'; // 'scheduled' | 'active' | 'archived'
            if (ev.isBlocked) {
                status = 'blocked';
            } else if (ev.isForcedActive || isToday) {
                status = 'active';
            } else if (isPast) {
                status = 'archived';
            } else {
                status = 'scheduled';
            }

            return {
                ...ev,
                isToday,
                isPast,
                isFuture,
                status
            };
        });
    },

    getActiveEvents() {
        return this.getEvents().filter(ev => ev.status === 'active' && !ev.isBlocked);
    },

    isMarketOpenToday() {
        const active = this.getActiveEvents();
        return active.some(ev => ev.isMarket === true);
    },

    async addEvent(eventData) {
        if (!eventData.date) throw new Error("Data evento obbligatoria.");
        const newEvent = {
            id: 'imp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            date: eventData.date,
            cardId: eventData.cardId || 'custom',
            title: (eventData.title || 'Nuovo Imprevisto').trim(),
            subtitle: (eventData.subtitle || '').trim(),
            lore: (eventData.lore || '').trim(),
            authorId: eventData.authorId || null,
            authorName: eventData.authorName || 'Globale',
            effectType: eventData.effectType || 'bonus',
            points: typeof eventData.points === 'number' ? eventData.points : (parseInt(eventData.points, 10) || 0),
            isMarket: eventData.isMarket === true,
            icon: eventData.icon || 'fa-solid fa-scroll',
            color: eventData.color || '#d4af37',
            isForcedActive: false,
            isBlocked: false,
            createdAt: new Date().toISOString()
        };

        this._events.push(newEvent);
        await this._saveEvents();
        return newEvent;
    },

    async updateEvent(eventId, updateData) {
        const idx = this._events.findIndex(e => e.id === eventId);
        if (idx === -1) throw new Error("Evento non trovato.");

        this._events[idx] = {
            ...this._events[idx],
            ...updateData
        };

        await this._saveEvents();
        return this._events[idx];
    },

    async deleteEvent(eventId) {
        this._events = this._events.filter(e => e.id !== eventId);
        await this._saveEvents();
    },

    async toggleForceActive(eventId) {
        const ev = this._events.find(e => e.id === eventId);
        if (!ev) return;
        ev.isForcedActive = !ev.isForcedActive;
        if (ev.isForcedActive) ev.isBlocked = false;
        await this._saveEvents();
    },

    async toggleBlock(eventId) {
        const ev = this._events.find(e => e.id === eventId);
        if (!ev) return;
        ev.isBlocked = !ev.isBlocked;
        if (ev.isBlocked) ev.isForcedActive = false;
        await this._saveEvents();
    },

    async generateSeasonalSchedule(startDateStr) {
        if (!startDateStr) throw new Error("Seleziona una data di inizio valida.");
        
        const startParts = startDateStr.split('-').map(Number);
        let curDate = new Date(startParts[0], startParts[1] - 1, startParts[2], 12, 0, 0);

        const newEvents = [];
        const deckCopy = [...this.LORE_DECK];

        deckCopy.forEach((card, index) => {
            const y = curDate.getFullYear();
            const m = String(curDate.getMonth() + 1).padStart(2, '0');
            const d = String(curDate.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${d}`;

            newEvents.push({
                id: 'imp_' + (Date.now() + index) + '_' + Math.random().toString(36).substring(2, 7),
                date: dateStr,
                cardId: card.cardId,
                title: card.title,
                subtitle: card.subtitle,
                lore: card.lore,
                authorId: card.authorId,
                authorName: card.authorName,
                effectType: card.effectType,
                points: card.points,
                isMarket: card.isMarket,
                icon: card.icon,
                color: card.color,
                isForcedActive: false,
                isBlocked: false,
                createdAt: new Date().toISOString()
            });

            // Distanzia ogni evento di 18-21 giorni lungo l'anno scolastico
            curDate.setDate(curDate.getDate() + 20);
        });

        this._events = newEvents;
        await this._saveEvents();
        return this.getEvents();
    },

    async _saveEvents() {
        try {
            localStorage.setItem('fanta_imprevisti_events', JSON.stringify(this._events));
            const db = window.db || window.fbDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
            if (db) {
                await db.collection('fanta_imprevisti').doc('timeline_config').set({
                    events: this._events,
                    lastUpdated: new Date().toISOString(),
                    updatedBy: (window.Auth && window.Auth.getUser && window.Auth.getUser().email) || 'admin'
                }, { merge: true });
            }
            if (typeof window.renderAdminImprevisti === 'function') window.renderAdminImprevisti();
            if (typeof window.renderStudentImprevistiNotice === 'function') window.renderStudentImprevistiNotice();
        } catch (e) {
            console.error("Errore salvataggio Imprevisti:", e);
            alert("Errore salvataggio su Cloud: " + e.message);
        }
    }
};

// =========================================================
// RENDERING READ-ONLY PER STUDENTI & UTENTI (index.html)
// =========================================================

window.renderStudentImprevistiNotice = function() {
    const banner = document.getElementById('student-imprevisti-banner');
    if (!banner) return;

    banner.style.display = 'block';

    const activeEvents = (window.ImprevistiService && typeof window.ImprevistiService.getActiveEvents === 'function') 
        ? window.ImprevistiService.getActiveEvents() 
        : [];

    if (!activeEvents || activeEvents.length === 0) {
        banner.innerHTML = `
            <div style="position: relative; width: 100%; aspect-ratio: 1524 / 1024; background: url('assets/branding/pergamena-imprevisti.png') no-repeat center center; background-size: 100% 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 13% 18%; box-sizing: border-box; filter: drop-shadow(0 8px 22px rgba(0,0,0,0.5)); text-align: center; pointer-events: none; user-select: none;">
                <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.85rem; font-weight: 800; color: #4a2c0c; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 2px;">
                    📜 Bando della Gazzetta
                </div>
                <div id="fanta-pergamena-title" style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.12rem; font-weight: 700; color: #2c1a06; line-height: 1.25; margin-bottom: 3px;">
                    Gli Imprevisti del Regno
                </div>
                <p id="fanta-pergamena-desc" style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.86rem; font-style: italic; color: #3f2710; line-height: 1.35; margin: 0; max-width: 270px;">
                    In questa bacheca appariranno gli Imprevisti Letterari e il Mercato durante il Campionato.
                </p>
            </div>
        `;
        return;
    }

    banner.innerHTML = activeEvents.map(ev => {
        let badgeHtml = '';
        if (ev.isMarket) {
            badgeHtml = `<span style="background:#0284c7; color:white; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:4px; margin-top:4px; display:inline-block;">Mercato Aperto</span>`;
        } else if (ev.effectType === 'malus') {
            badgeHtml = `<span style="background:#b91c1c; color:white; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:4px; margin-top:4px; display:inline-block;">Malus: ${ev.points} Punti</span>`;
        } else if (ev.points > 0) {
            badgeHtml = `<span style="background:#15803d; color:white; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:4px; margin-top:4px; display:inline-block;">Bonus: +${ev.points} Punti</span>`;
        }

        let loreText = ev.lore || '';
        if (loreText.length > 95) loreText = loreText.substring(0, 92) + '...';

        return `
            <div style="position: relative; width: 100%; aspect-ratio: 1524 / 1024; background: url('assets/branding/pergamena-imprevisti.png') no-repeat center center; background-size: 100% 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 13% 18%; box-sizing: border-box; filter: drop-shadow(0 8px 22px rgba(0,0,0,0.5)); text-align: center; pointer-events: none; user-select: none;">
                <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.82rem; font-weight: 800; color: #4a2c0c; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 2px;">
                    📜 Bando Ufficiale
                </div>
                <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.12rem; font-weight: 700; color: #2c1a06; line-height: 1.25; margin-bottom: 3px;">
                    ${ev.title || 'Nuovo Imprevisto'}
                </div>
                <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.86rem; font-style: italic; color: #3f2710; line-height: 1.35; margin: 0; max-width: 270px;">
                    ${loreText}
                </p>
                ${badgeHtml}
            </div>
        `;
    }).join('');
};

// Inizializzazione immediata
document.addEventListener('DOMContentLoaded', () => {
    window.ImprevistiService.init();
    if (typeof window.renderStudentImprevistiNotice === 'function') {
        window.renderStudentImprevistiNotice();
    }
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.ImprevistiService.init();
    if (typeof window.renderStudentImprevistiNotice === 'function') {
        window.renderStudentImprevistiNotice();
    }
}
