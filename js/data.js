// Dati Mockati - Fantaletteratura

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — CLASSI TERZE (attivo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS = [
    { 
        id: 'a1',  name: 'Ugo Foscolo', cost: 4500, points: 30, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Foscolo.png',
        schedaHTML: `<ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; PASSA BUONA PARTE DELLA VITA IN ESILIO TRA INGHILTERRA, SVIZZERA E ITALIA.</li>
            <li><strong>🏛️ POLITICO 🏟️ +5</strong> &rarr; COINVOLGIMENTO POLITICO LIMITATO, SOPRATTUTTO COME INTELLETTUALE, PATRIOTA DELUSO, MA IMPEGNATO.</li>
            <li><strong>🥖 POLIEDRICO 🪶 +10</strong> &rarr; SCRIVE POESIA, SAGGI E ROMANZI EPISTOLARI.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; FORTE ISPIRAZIONE DAI CLASSICI GRECI E LATINI.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA SPESSO ISOLATA E SEGNATA DA DIFFICOLTÀ ECONOMICHE.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NON PARTICOLARMENTE POLEMICO O CENSURATO IN VITA.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE SPESSO MALINCONICA E CRITICA DELLA VITA. TEMI DI DOLORE, NOSTALGIA E MORTE.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INTRODUCE FORME LIRICHE MODERNE E ACCENTI EMOTIVI.</li>
        </ul>`
    },
    { 
        id: 'a2',  name: 'Giacomo Leopardi', cost: 5000, points: 15, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Leopardi.png',
        schedaHTML: `<ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ 0</strong> &rarr; VIAGGI LIMITATI ALL'ITALIA, MA IMPORTANTI PER LA CULTURA.</li>
            <li><strong>🏛️ POLITICO 🏟️ 0</strong> &rarr; NON COINVOLTO IN POLITICA ATTIVA.</li>
            <li><strong>🥖 POLIEDRICO 🪶 +10</strong> &rarr; SCRIVE POESIE, SAGGI FILOSOFICI E PROSE VARIE.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; INFLUENZA COSTANTE DAI CLASSICI LATINI E GRECI.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA ESTREMAMENTE RITIRATA E SEDENTARIA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO PUBBLICO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; CREDE CHE LA VITA SIA SOFFERENZA. TRASFORMA LA NOIA E IL DOLORE IN POESIA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INNOVAZIONI STILISTICHE NELLA POESIA LIRICA E FILOSOFICA.</li>
        </ul>`
    },
    { 
        id: 'a3',  name: 'Alessandro Manzoni', cost: 4500, points: 45, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Manzoni.png',
        schedaHTML: `<ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN EUROPA, INCLUSO UN PERIODO A PARIGI.</li>
            <li><strong>🏛️ POLITICO 🏟️ +10</strong> &rarr; ATTIVO NELLA POLITICA CULTURALE E MORALE, INFLUENZA EDUCATIVA, SIMPATIZZA PER L'ITALIA UNITA.</li>
            <li><strong>🥖 POLIEDRICO 🪶 +10</strong> &rarr; ROMANZI, SAGGI, POESIA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; INFLUENZE CLASSICHE NEI CONTENUTI E NELLA FORMA.</li>
            <li><strong>🔋 SOLITARIO 🏡 0</strong> &rarr; VITA RELATIVAMENTE STABILE E TRANQUILLA, MA NON ISOLATA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; VISIONE MORALE MA NON CUPA. TEMI DI DOLORE PRESENTI MA NON OSSESSIVI.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO INNOVATIVO, ITALIANO MODERNO STANDARDIZZATO, MODELLO DI LINGUA E MORALE.</li>
        </ul>`
    },
    { 
        id: 'a4',  name: 'Giosuè Carducci', cost: 4000, points: 45, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Carducci.png',
        schedaHTML: `<ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN TUTTA EUROPA PER CONFERENZE E STUDIO.</li>
            <li><strong>🏛️ POLITICO 🏟️ +10</strong> &rarr; DEPUTATO, SENATORE E ATTIVO POLITICAMENTE.</li>
            <li><strong>🥖 POLIEDRICO 🪶 +10</strong> &rarr; POESIA, CRITICA, SAGGISTICA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; GRANDE CLASSICISTA, RICHIAMI CONTINUI ALL'ANTICHITÀ.</li>
            <li><strong>🔋 SOLITARIO 🏡 0</strong> &rarr; VITA SOCIALE ATTIVA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO RILEVANTE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; POESIA PATRIOTTICA, MENO CUPA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INNOVAZIONE METRICO-STILISTICA, MODERNIZZAZIONE DEL VERSO.</li>
        </ul>`
    },
    { id: 'a5',  name: 'Giovanni Verga', cost: 4000, points: 0, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Verga.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ 0</strong> &rarr; VITA PREVALENTEMENTE IN SICILIA.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON IMPEGNATO POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ 0</strong> &rarr; PRINCIPALMENTE NARRATIVA, POCHI SAGGI.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; NON PARTICOLARMENTE CLASSICO.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA E CONCENTRATA NELLA SCRITTURA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE CRUDA E SPESSO TRAGICA DELLA VITA; IL PROGRESSO NON PORTA FELICITÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; FONDATORE DEL VERISMO, NUOVA TECNICA NARRATIVA, IMPERSONALITÀ.</li>
        </ul>`
    },
    { id: 'a6',  name: 'Giovanni Pascoli', cost: 3500, points: 15, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Pascoli.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ 0</strong> &rarr; ALCUNI VIAGGI DI STUDIO, MA VITA DOMESTICA PREVALENTE.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON COINVOLTO POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, CRITICA, SAGGISTICA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; INFLUENZA CLASSICA NEI TEMI E NELLE FORME, AMA IL LATINO E I MITI.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA, LUTTI FAMILIARI, VIVE NEI SUOI "NIDI" FAMILIARI.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO RILEVANTE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE MALINCONICA E DOLOROSA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INNOVAZIONI METRICHE E SIMBOLICHE.</li>
        </ul>`
    },
    { id: 'a7',  name: "Gabriele D'Annunzio", cost: 3500, points: 35, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/D_annunzio.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VITA MOLTO COSMOPOLITA TRA ITALIA, FRANCIA E ALTRI PAESI. DA PESCARA A PARIGI, E POI SUL GARDA.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; ATTIVO POLITICAMENTE, INFLUENZA POLITICA E CULTURALE. IMPRESA DI FIUME E PROPAGANDA.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, NARRATIVA, TEATRO, GIORNALISMO.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; INFLUENZE CLASSICHE VISIBILI NELLA RETORICA E NELLO STILE. IMITA GLI ANTICHI IN MODO RAFFINATO.</li>
            <li><strong>🔋 SOLITARIO 🏡 0</strong> &rarr; VITA SOCIALE INTENSA, NON ISOLATO.</li>
            <li><strong>🤬 SCANDALOSO 🧨 -10</strong> &rarr; SCANDALI, POLEMICHE, VITA PUBBLICA CONTROVERSA. AMORI, LUSSO E SCANDALI INFINITI.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; VISIONE ESTETICA PIÙ EDONISTICA CHE CUPA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; SPERIMENTAZIONE STILISTICA E LINGUISTICA. REINVENTA LA LINGUA ITALIANA MODERNA.</li>
        </ul>`
    },
    { id: 'a8',  name: 'Luigi Pirandello', cost: 4500, points: 20, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Pirandello.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN ITALIA E ALL'ESTERO PER TEATRO E CONFERENZE.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON COINVOLTO ATTIVAMENTE IN POLITICA.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; NARRATIVA, TEATRO, SAGGI.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; RIFERIMENTI AL CLASSICO MARGINALI.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA PRIVATA RISERVATA, TORMENTATA E CHIUSA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO PUBBLICO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE ESISTENZIALE E TRAGICA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INNOVAZIONI TEATRALI E NARRATIVE.</li>
        </ul>`
    },
    { id: 'a9',  name: 'Filippo Tommaso Marinetti', cost: 3000, points: 30, isPointsRevealed: false, isSchedaRevealed: true, image: 'avatar_autori/Marinetti.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI E TOURNÉE EUROPEE.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; FONDATORE DEL FUTURISMO, COINVOLTO POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, MANIFESTI, TEATRO, NARRATIVA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INTERESSE MARGINALE PER IL CLASSICO.</li>
            <li><strong>🔋 SOLITARIO 🏡 0</strong> &rarr; VITA SOCIALE ATTIVA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 -10</strong> &rarr; POLEMICHE E PROVOCAZIONI CONTINUE. DISTRUGGE MUSEI E REGOLE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; VISIONE OTTIMISTICA PER LA MODERNITÀ E LA TECNOLOGIA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; RIVOLUZIONARIO LINGUISTICO E STILISTICO. INVENTORE DELLA PAROLA IN LIBERTÀ.</li>
        </ul>`
    },
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
    { id: 'a22', name: 'Leonardo Sciascia',           cost: 3000, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Leonardo Sciascia.png' },
    { id: 'a23', name: 'Alda Merini',                 cost: 3000, points: 10, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Alda Merini.png' },
    { id: 'a24', name: 'Umberto Saba',                cost: 3500, points: 10, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Umberto Saba.png' }
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
