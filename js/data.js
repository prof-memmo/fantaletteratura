// Dati Mockati - Fantaletteratura

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — CLASSI TERZE (attivo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS = [
    { id: 'a1',  name: 'Ugo Foscolo',                cost: 4500, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Foscolo.png' },
    { id: 'a2',  name: 'Giacomo Leopardi',            cost: 5000, points: 15, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Leopardi.png' },
    { id: 'a3',  name: 'Alessandro Manzoni',          cost: 4500, points: 45, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Manzoni.png' },
    { id: 'a4',  name: 'Giosuè Carducci',             cost: 4000, points: 45, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Carducci.png' },
    { id: 'a5',  name: 'Giovanni Verga',              cost: 4000, points: 0,  isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Verga.png' },
    { id: 'a6',  name: 'Giovanni Pascoli',            cost: 3500, points: 15, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pascoli.png' },
    { id: 'a7',  name: "Gabriele D'Annunzio",         cost: 3500, points: 35, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/D_annunzio.png' },
    { id: 'a8',  name: 'Luigi Pirandello',            cost: 4500, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pirandello.png' },
    { id: 'a9',  name: 'Filippo Tommaso Marinetti',   cost: 3000, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Marinetti.png' },
    { id: 'a10', name: 'Giuseppe Ungaretti',          cost: 4000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Ungaretti.png' },
    { id: 'a11', name: 'Eugenio Montale',             cost: 4500, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Montale.png' },
    { id: 'a12', name: 'Salvatore Quasimodo',         cost: 4000, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Quasimodo.png' },
    { id: 'a13', name: 'Italo Svevo',                 cost: 5000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Svevo.png' },
    { id: 'a14', name: 'Italo Calvino',               cost: 5000, points: 45, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Calvino.png' },
    { id: 'a15', name: 'Elsa Morante',                cost: 5000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Morante.png' },
    { id: 'a16', name: 'Primo Levi',                  cost: 4000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Primo_Levi.png' },
    { id: 'a17', name: 'Cesare Pavese',               cost: 4000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pavese.png' },
    { id: 'a18', name: 'Alberto Moravia',             cost: 3000, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Moravia.png' },
    { id: 'a19', name: 'Beppe Fenoglio',              cost: 3000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Fenoglio.png' },
    { id: 'a20', name: 'Pier Paolo Pasolini',         cost: 3500, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pasolini.png' },
    { id: 'a21', name: 'Natalia Ginzburg',            cost: 4000, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Ginzburg.png' },
    { id: 'a22', name: 'Leonardo Sciascia',           cost: 3000, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'https://via.placeholder.com/150/111/fff?text=Sciascia' },
    { id: 'a23', name: 'Alda Merini',                 cost: 3000, points: 10, isPointsRevealed: false, isSchedaRevealed: false, image: 'https://via.placeholder.com/150/111/fff?text=Merini' },
    { id: 'a24', name: 'Umberto Saba',                cost: 3500, points: 10, isPointsRevealed: false, isSchedaRevealed: false, image: 'https://via.placeholder.com/150/111/fff?text=Saba' }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — ETÀ MODERNA
// Aggiungi qui gli autori quando disponibili
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS_SECONDE = [];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — CONTEMPORANEA + STRANIERI
// Per ora usa gli stessi autori italiani.
// Aggiungi qui gli autori stranieri quando disponibili,
// poi imposta available: true in GAME_MODES.avanzato
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS_AVANZATO = AUTHORS; // stessi autori italiani per ora

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEFINIZIONE MODALITÀ DI GIOCO
// available: true = attiva, false = in arrivo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GAME_MODES = {
    terze: {
        id: 'terze',
        label: 'Contemporanea: Autori Italiani',
        shortLabel: 'Contemporanea: Autori Italiani',
        emoji: '📘',
        description: "Autori italiani dell'Ottocento e del Novecento",
        colorPrimary: '#8da03f',
        colorDark:    '#3e4b12',
        colorClass:   'mode-green',
        authors: AUTHORS,
        available: true
    },
    seconde: {
        id: 'seconde',
        label: 'Età Moderna',
        shortLabel: 'Moderna',
        emoji: '📙',
        description: 'Autori dalle origini della letteratura italiana fino al Settecento',
        colorPrimary: '#d4721a',
        colorDark:    '#7a3d08',
        colorClass:   'mode-orange',
        authors: AUTHORS_SECONDE,
        available: false   // → true quando gli autori vengono aggiunti
    },
    avanzato: {
        id: 'avanzato',
        label: 'Contemporanea: Autori Italiani e Internazionali',
        shortLabel: 'Contemporanea: Autori Italiani e Internazionali',
        emoji: '📒',
        description: 'Autori italiani e internazionali',
        colorPrimary: '#c9a227',
        colorDark:    '#7a5e10',
        colorClass:   'mode-gold',
        authors: AUTHORS_AVANZATO,
        available: false   // → true quando gli autori vengono aggiunti
    }
};

const MOCK_DOCENTI = [];

// Mock database squadre iscritte (futuro: Firebase)
const MOCK_TEAMS = [];

let MOCK_SCHEDE = [];
const MISSIONS = [];
