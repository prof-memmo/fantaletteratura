// Dati Mockati - Fantaletteratura

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — CLASSI TERZE (attivo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS = [
    { 
        id: 'a1',  name: 'Ugo Foscolo', cost: 4500, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Foscolo.png',
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
        id: 'a2',  name: 'Giacomo Leopardi', cost: 5000, points: 15, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Leopardi.png',
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
        id: 'a3',  name: 'Alessandro Manzoni', cost: 4500, points: 45, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Manzoni.png',
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
        id: 'a4',  name: 'Giosuè Carducci', cost: 4000, points: 45, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Carducci.png',
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
    { id: 'a5',  name: 'Giovanni Verga', cost: 4000, points: 0, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Verga.png',
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
    { id: 'a6',  name: 'Giovanni Pascoli', cost: 3500, points: 15, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pascoli.png',
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
    { id: 'a7',  name: "Gabriele D'Annunzio", cost: 3500, points: 35, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/D_annunzio.png',
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
    { id: 'a8',  name: 'Luigi Pirandello', cost: 4500, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pirandello.png',
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
    { id: 'a9',  name: 'Filippo Tommaso Marinetti', cost: 3000, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Marinetti.png',
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
    { id: 'a10', name: 'Giuseppe Ungaretti',          cost: 4000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Ungaretti.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; NATO IN EGITTO. MILITANTE IN GUERRA, VIAGGI IN EUROPA E AFRICA.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON COINVOLTO POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, SAGGISTICA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; RIFERIMENTI CLASSICI MINIMI. POESIA PURA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA E INTENSA CONCENTRAZIONE SULLA POESIA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE DELLA GUERRA, DELLA SOLITUDINE E DELLA SOFFERENZA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO ERMETICO INNOVATIVO. POESIA.</li>
        </ul>`
    },
    { id: 'a11', name: 'Eugenio Montale', cost: 4500, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Montale.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN ITALIA E ALL’ESTERO.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON POLITICAMENTE ATTIVO, MA COINVOLTO CULTURALMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, CRITICA, SAGGISTICA E TRADUZIONI.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; ALCUNI RIFERIMENTI ALL’ANTICO E MITOLOGIA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RISERVATA E CONCENTRATA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE SPESSO MALINCONICA E PESSIMISTA. IL MALE DI VIVERE È OVUNQUE.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO POETICO, SIMBOLICO, INNOVATIVO E COMPLESSO.</li>
        </ul>`
    },
    { id: 'a12', name: 'Salvatore Quasimodo', cost: 4000, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Quasimodo.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN EUROPA E SOGGIORNI ALL’ESTERO.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON DIRETTAMENTE COINVOLTO IN POLITICA.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, TRADUZIONI, SAGGI.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; INFLUENZE GRECO-LATINE E CLASSICHE NELLA POESIA. TRADUTTORE DEI LIRICI GRECI.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA E MEDITATIVA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE SPESSO CUPA E DOLOROSA. SOFFERENZA E GUERRA NEI VERSI.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO ERMETICO INNOVATIVO. RINNOVA LA METRICA E LO STILE.</li>
        </ul>`
    },
    { id: 'a13', name: 'Italo Svevo', cost: 5000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Svevo.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN EUROPA, CONTATTI CON JOYCE A TRIESTE.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON COINVOLTO POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI E SAGGI PSICOLOGICI.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA MINIMA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA, LAVORO IN BANCA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE IRONICA E MALINCONICA DELLA VITA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; PSICOLOGIA DEI PERSONAGGI E MODERNITÀ NARRATIVA. INTRODUCE LA PSICANALISI IN LETTERATURA.</li>
        </ul>`
    },
    { id: 'a14', name: 'Italo Calvino',               cost: 5000, points: 45, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Calvino.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN EUROPA E AMERICA LATINA. AMA IL MONDO E LA FANTASIA.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; IMPEGNO POLITICO E CULTURALE, MEMBRO DEL PCI PER UN PERIODO.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, RACCONTI, SAGGI, FIABE.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; RIFERIMENTI AL MONDO ANTICO E MITOLOGICO.</li>
            <li><strong>🔋 SOLITARIO 🏡 0</strong> &rarr; VITA SOCIALE MODERATA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; VISIONE PREVALENTEMENTE FANTASTICA E IRONICA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO E STRUTTURE NARRATIVE ALTAMENTE INNOVATIVE. LEGGEREZZA, IRONIA E STRUTTURA MODERNA.</li>
        </ul>`
    },
    { id: 'a15', name: 'Elsa Morante',                cost: 5000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Morante.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN ITALIA E EUROPA.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON IMPEGNATA DIRETTAMENTE IN POLITICA.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, POESIE, SAGGI.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA LIMITATA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA E RIFLESSIVA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO RILEVANTE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE DRAMMATICA DELLA VITA E DELLA GUERRA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INNOVAZIONI NARRATIVE E STILISTICHE.</li>
        </ul>`
    },
    { id: 'a16', name: 'Primo Levi',                  cost: 4000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Primo_Levi.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI DI STUDIO E TESTIMONIANZE INTERNAZIONALI. DEPORTATO, MA ANCHE TESTIMONE DEL RITORNO.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON POLITICAMENTE ATTIVO, MA TESTIMONIANZA CIVILE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, MEMORIALISTICA, SAGGI SCIENTIFICI.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZE CLASSICHE MINIME.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RISERVATA, CONCENTRATA SUL LAVORO.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; ESPERIENZA DELL'OLOCAUSTO E PESSIMISMO MORALE.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; STILE CHIARO E RIGOROSO, INNOVAZIONE NARRATIVA NELLA TESTIMONIANZA. LINGUA CHIARA E PRECISA COME UN ESPERIMENTO.</li>
        </ul>`
    },
    { id: 'a17', name: 'Cesare Pavese',               cost: 4000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pavese.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN FRANCIA E IN ITALIA.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON DIRETTAMENTE POLITICO.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, POESIA, DIARIO, CRITICA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA MINIMA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA E MALINCONICA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO PUBBLICO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE CUPA DELLA VITA E DELLA SOLITUDINE. VITA COME SCONFITTA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; STILE REALISTICO, INNOVAZIONE NARRATIVA.</li>
        </ul>`
    },
    { id: 'a18', name: 'Alberto Moravia',             cost: 3000, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Moravia.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI FREQUENTI IN EUROPA E AMERICA. CONOSCE IL MONDO E LO RACCONTA.</li>
            <li><strong>🏛️ POLITICO 🗳️ +5</strong> &rarr; NON ATTIVO POLITICAMENTE. CRITICO VERSO LA SOCIETÀ BORGHESE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, SAGGI, REPORTAGE GIORNALISTICO, CINEMA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; RIFERIMENTI CLASSICI LIMITATI.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RIFLESSIVA E RISERVATA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO SIGNIFICATIVO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE CRITICA E SPESSO CUPA DELLA SOCIETÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; ANALISI PSICOLOGICA E SOCIALE INNOVATIVA.</li>
        </ul>`
    },
    { id: 'a19', name: 'Beppe Fenoglio',              cost: 3000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Fenoglio.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; ESPERIENZE NELLA RESISTENZA E VIAGGI IN PIEMONTE.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON POLITICAMENTE ATTIVO, MA TEMA POLITICO NEI ROMANZI.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; NARRATIVA, REPORTAGE.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA MINIMA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA E RIFLESSIVA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE CRUDA DELLA GUERRA E DELLA RESISTENZA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO REALISTICO E INNOVATIVO NELLA NARRATIVA.</li>
        </ul>`
    },
    { id: 'a20', name: 'Pier Paolo Pasolini',         cost: 3500, points: 25, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pasolini.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN EUROPA E PERIODI DI RESIDENZA ALL'ESTERO.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; IMPEGNO POLITICO E POLEMICHE CULTURALI.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, NARRATIVA, CINEMA, SAGGISTICA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; INFLUENZA CLASSICA, RIFERIMENTI AL MONDO ANTICO E ALLA BIBBIA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA COMPLESSA, MOMENTI DI ISOLAMENTO.</li>
            <li><strong>🤬 SCANDALOSO 🧨 -10</strong> &rarr; POLEMICHE CONTINUE E SCANDALI.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE CRITICA E DISINCANTATA DELLA SOCIETÀ. NOSTALGIA E RABBIA PER IL PRESENTE.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INNOVAZIONI NEL CINEMA, POESIA E NARRATIVA. LINGUAGGIO UNICO E RIVOLUZIONARIO.</li>
        </ul>`
    },
    { id: 'a21', name: 'Natalia Ginzburg',            cost: 4000, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Ginzburg.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI IN ITALIA E ALL'ESTERO PER CULTURA E CONFERENZE.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; IMPEGNO POLITICO E SOCIALE, ATTIVA NEI PARTITI ANTIFASCISTI.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, SAGGI, NARRATIVA BREVE, TEATRO.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA MINIMA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RIFLESSIVA, MA CON LEGAMI FAMILIARI FORTI.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO RILEVANTE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE REALISTICA E CRITICA DELLA SOCIETÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO CHIARO E INNOVATIVO NELLA NARRATIVA DOMESTICA.</li>
        </ul>`
    },
    { id: 'a22', name: 'Leonardo Sciascia',           cost: 3000, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Leonardo Sciascia.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI CULTURALI IN ITALIA E EUROPA.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; ATTIVO COME INTELLETTUALE IMPEGNATO E COMMENTATORE POLITICO.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, SAGGI, REPORTAGE GIORNALISTICO.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA MINIMA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RIFLESSIVA E RISERVATA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO PERSONALE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE CRITICA DELLA SOCIETÀ E DELLA POLITICA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; STILE INNOVATIVO NEL RACCONTO SOCIALE E POLITICO. GIALLO ETICO E CIVILE.</li>
        </ul>`
    },
    { id: 'a23', name: 'Alda Merini',                 cost: 3000, points: 10, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Alda Merini.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ 0</strong> &rarr; VITA PREVALENTEMENTE A MILANO, POCHI VIAGGI.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON COINVOLTA POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, NARRATIVA, AUTOBIOGRAFIA, AFORISMI.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA MINIMA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA SEGNATA DA RICOVERI E ISOLAMENTO.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO RILEVANTE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE SPESSO DRAMMATICA E DOLOROSA. ANTICONFORMISTA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; INNOVAZIONI STILISTICHE NELLA POESIA CONTEMPORANEA.</li>
        </ul>`
    },
    { id: 'a24', name: 'Umberto Saba', cost: 3500, points: 10, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Umberto Saba.png',
        schedaHTML: `<ul style="list-style-type:none; padding-left:0; margin:0;">
            <li><strong>🌍 VIAGGIATORE ✈️ 0</strong> &rarr; VITA PREVALENTEMENTE A TRIESTE, QUALCHE VIAGGIO IN ITALIA.</li>
            <li><strong>🏛️ POLITICO 🗳️ 0</strong> &rarr; NON IMPEGNATO POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, AUTOBIOGRAFIA IN VERSI, CRITICA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INFLUENZA CLASSICA LIMITATA.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RITIRATA E RIFLESSIVA. VITA INTROSPETTIVA E DIFFICILE.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE MALINCONICA DELLA VITA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; LINGUAGGIO POETICO SEMPLICE MA INTENSO, INNOVATIVO.</li>
        </ul>`
    }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — ETÀ MODERNA
// Aggiungi qui gli autori quando disponibili
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS_SECONDE = [
    {
        id: 'primi-documenti',
        name: 'I Primi Documenti in Volgare',
        role: 'Le Origini',
        points: 30,
        image: 'avatar_autori/primi_documenti.png',
        description: 'Dal Placito Capuano alle prime testimonianze scritte della lingua italiana.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – Testi che nascono dal movimento di notai e religiosi in diverse aree.\n🏛 Politico 🏟 +5 – Documenti legati all'amministrazione della giustizia e delle terre.\n📝 Poliedrico 🪶 +5 – Getta le basi per diversi usi della scrittura.\n📚 Classico 🏺 +5 – Transizione dal latino alle lingue vernacolari.\n🪫 Solitario 🏡 -5 – Spesso documenti d'archivio isolati.\n🤯 Scandaloso 🧨 0 – Valore storico-documentario.\n🌀 Pessimista 🌫 0 – Neutralità dei testi giuridici.\n🧠 Innovatore ⚡ +15 – Rompe il monopolio del latino nella scrittura ufficiale.`
    },
    {
        id: 'scuola-siciliana',
        name: 'La Scuola Siciliana',
        role: 'Poeti di Corte',
        points: 30,
        image: 'avatar_autori/scuola_siciliana.png',
        description: 'La nascita della lirica d’amore alla corte di Federico II.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – Mobilità dei poeti-funzionari nella Magna Curia.\n🏛 Politico 🏟 +10 – Al servizio dell'imperatore Federico II.\n📝 Poliedrico 🪶 +5 – Poeti che sono anche giuristi e burocrati.\n📚 Classico 🏺 +10 – Ripresa della tradizione trobadorica provenzale.\n🪫 Solitario 🏡 -5 – Vissuti nella fastosa ma chiusa corte imperiale.\n🤯 Scandaloso 🧨 0 – L'amore cortese è un tema raffinato, mai volgare.\n🌀 Pessimista 🌫 0 – Idealizzazione positiva del sentimento amoroso.\n🧠 Innovatore ⚡ +10 – Inventano il sonetto e creano il primo volgare illustre.`
    },
    { 
        id: 'francesco-assisi', 
        name: 'Francesco d’Assisi', 
        role: 'Poverello d’Assisi', 
        points: 30, 
        image: 'avatar_autori/francesco_assisi.jpg',
        description: 'Il Santo che parlava agli uccelli e scrisse il primo grande testo in volgare.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – PREDICA E VIAGGIA PER L’ITALIA DIFFONDENDO PACE E FRATERNITÀ.\n🏛 Politico 🏟 +0 – NON PARTECIPA ALLA VITA POLITICA.\n📝 Poliedrico 🪶 +10 – COMPONE PREGHIERE E POESIE IN VOLGARE (“CANTICO DELLE CREATURE”).\n📚 Classico 🏺 +5 – SI ISPIRA ALLA BIBBIA, TESTO FONDAMENTALE DELLA TRADIZIONE.\n🪫 Solitario 🏡 -5 – SCEGLIE LA POVERTÀ E LA VITA RITIRATA.\n🤯 Scandaloso 🧨 0 – FIGURA SPIRITUALE, MAI COINVOLTA IN POLEMICHE.\n🌀 Pessimista 🌫 0 – VISIONE POSITIVA DELLA VITA.\n🧠 Innovatore ⚡ +10 – PRIMO AD USARE IL VOLGARE PER SCRIVERE DI DIO E DELLA NATURA.`
    },
    { 
        id: 'francesco-petrarca', 
        name: 'Francesco Petrarca', 
        role: 'Padre dell’Umanesimo', 
        points: 30, 
        image: 'avatar_autori/francesco_petrarca.jpg',
        description: 'Il poeta dell’interiorità, incoronato in Campidoglio.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – PASSA LA VITA IN MOVIMENTO TRA AVIGNONE, L’ITALIA E L’EUROPA.\n🏛 Politico 🏟 +5 – AMICO DEI POTENTI, SVOLGE MOLTE MISSIONI DIPLOMATICHE.\n📝 Poliedrico 🪶 +5 – POETA IN VOLGARE E GRANDE STUDIOSO IN LATINO.\n📚 Classico 🏺 +10 – MODELLO PER TUTTA LA POESIA EUROPEA.\n🪫 Solitario 🏡 -5 – AMA LA VITA TRANQUILLA E RITIRATA (VALCHIUSA).\n🤯 Scandaloso 🧨 0 – POETA RISPETTATO E CELEBRATO DA TUTTI.\n🌀 Pessimista 🌫 -5 – LA SUA POESIA È PIENA DI DUBBI, PENTIMENTO E DISPIACERE.\n🧠 Innovatore ⚡ +10 – FONDATORE DELL’UMANESIMO E DEL SONETTO MODERNO.`
    },
    { 
        id: 'lorenzo-medici', 
        name: 'Lorenzo de’ Medici', 
        role: 'L’Ago della Bilancia', 
        points: 30, 
        image: 'avatar_autori/lorenzo_medici.jpg',
        description: 'Signore di Firenze e mecenate dei più grandi artisti del Rinascimento.',
        schedaHTML: `🌍 Viaggiatore ✈ +0 – RESTA QUASI SEMPRE A FIRENZE E NELLE SUE VILLE.\n🏛 Politico 🏟 +15 – IL PIÙ GRANDE POLITICO DEL SUO TEMPO.\n📝 Poliedrico 🪶 +10 – SIGNORE DI FIRENZE, POETA E GRANDE MECENATE.\n📚 Classico 🏺 +5 – PROMUOVE LO STUDIO DELLA CULTURA GRECA E LATINA.\n🪫 Solitario 🏡 0 – VIVE CIRCONDATO DA ARTISTI, FILOSOFI E AMICI.\n🤯 Scandaloso 🧨 0 – VITA PUBBLICA RISPETTATA, ANCHE SE VITTIMA DI CONGIURE.\n🌀 Pessimista 🌫 0 – LA SUA POESIA CELEBRA LA GIOIA E LA GIOVINEZZA.\n🧠 Innovatore ⚡ +10 – RENDE FIRENZE LA CAPITALE MONDIALE DELLA CULTURA.`
    },
    { 
        id: 'cesare-beccaria', 
        name: 'Cesare Beccaria', 
        role: 'Contro la Pena di Morte', 
        points: 30, 
        image: 'avatar_autori/cesare_beccaria.jpg',
        description: 'L’Illuminista che cambiò la giustizia nel mondo.',
        schedaHTML: `🌍 Viaggiatore ✈ -5 – AMA POCO VIAGGIARE E RESTA QUASI SEMPRE A MILANO.\n🏛 Politico 🏟 +10 – LE SUE IDEE CAMBIANO LE LEGGI DI MOLTI STATI.\n📝 Poliedrico 🪶 +5 – GIURISTA, ECONOMISTA E LETTERATO.\n📚 Classico 🏺 +0 – SI ISPIRA ALLE NUOVE IDEE DELLA RAGIONE PIÙ CHE AL PASSATO.\n🪫 Solitario 🏡 -5 – CARATTERE TIMIDO E SCHIVO.\n🤯 Scandaloso 🧨 +10 – IL SUO LIBRO VIENE PROIBITO DALLA CHIESA.\n🌀 Pessimista 🌫 0 – CREDE NEL PROGRESSO E NELLA FELICITÀ UMANA.\n🧠 Innovatore ⚡ +15 – PROMETTE L’ABOLIZIONE DELLA TORTURA E DELLA PENA DI MORTE.`
    },
    { 
        id: 'dante-alighieri-sec', 
        name: 'Dante Alighieri', 
        role: 'Il Sommo Poeta', 
        points: 25, 
        image: 'avatar_autori/dante_alighieri.jpg',
        description: 'L’autore della Divina Commedia, il viaggio nell’oltretomba.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – PASSA MOLTI ANNI IN ESILIO GIRANDO PER L’ITALIA.\n🏛 Politico 🏟 +10 – IMPEGNATO NELLA POLITICA DI FIRENZE, PAGHERÀ CON L’ESILIO.\n📝 Poliedrico 🪶 +10 – SCRIVE DI AMORE, FILOSOFIA, POLITICA E RELIGIONE.\n📚 Classico 🏺 +10 – CONSIDERA VIRGILIO LA SUA GUIDA E IL SUO MODELLO.\n🪫 Solitario 🏡 0 – VIVE TRA LA GENTE, NELLE CORTI CHE LO OSPITANO.\n🤯 Scandaloso 🧨 +5 – NON HA PAURA DI METTERE PAPI E RE ALL’INFERNO.\n🌀 Pessimista 🌫 0 – IL SUO VIAGGIO FINISCE NELLA LUCE DI DIO.\n🧠 Innovatore ⚡ +15 – CREA LA LINGUA ITALIANA CON UN CAPOLAVORO ASSOLUTO.`
    },
    { 
        id: 'ludovico-ariosto', 
        name: 'Ludovico Ariosto', 
        role: 'Il Poeta del Furioso', 
        points: 25, 
        image: 'avatar_autori/ludovico_ariosto.jpg',
        description: 'L’autore dell’Orlando Furioso, tra magia, cavalieri e amore.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA MOLTO PER LAVORO AL SERVIZIO DEGLI ESTE.\n🏛 Politico 🏟 +5 – AMMINISTRA TERRE DIFFICILI COME LA GARFAGNANA.\n📝 Poliedrico 🪶 +10 – POETA, SCRITTORE DI TEATRO E DIPLOMATICO.\n📚 Classico 🏺 +10 – RIPRENDE I MITI ANTICHI E I POEMI CAVALLERESCHI.\n🪫 Solitario 🏡 -5 – SOGNA UNA VITA TRANQUILLA NEL SUO PICCOLO GIARDINO.\n🤯 Scandaloso 🧨 0 – POETA DI CORTE SEMPRE EDUCO E MISURATO.\n🌀 Pessimista 🌫 -5 – VEDE IL MONDO COME UN LUOGO DI FOLLIA E ILLUSIONI.\n🧠 Innovatore ⚡ +10 – CREA UN POEMA MODERNO PIENO DI IRONIA E FANTASIA.`
    },
    { 
        id: 'giovanni-boccaccio', 
        name: 'Giovanni Boccaccio', 
        role: 'Il Maestro del Racconto', 
        points: 20, 
        image: 'avatar_autori/giovanni_boccaccio.jpg',
        description: 'L’autore del Decameron, cento novelle su amore e astuzia.',
        schedaHTML: `🌍 Viaggiatore ✈ +5 – VIAGGIA TRA FIRENZE E NAPOLI PER AFFARI E CULTURA.\n🏛 Politico 🏟 +5 – SVOLGE COMPITI DIPLOMATICI PER IL COMUNE DI FIRENZE.\n📝 Poliedrico 🪶 +10 – SCRIVE POESIE, ROMANZI E RACCONTI.\n📚 Classico 🏺 +5 – RITROVA E STUDIA IMPORTANTI TESTI ANTICHI.\n🪫 Solitario 🏡 0 – AMA LA COMPAGNIA E LA VITA SOCIALE.\n🤯 Scandaloso 🧨 +10 – LE SUE NOVELLE SONO SPESSO MOLTO AUDACI E LIBERE.\n🌀 Pessimista 🌫 0 – HA UNA VISIONE PRAGMATICA E VITALE DELL’ESISTENZA.\n🧠 Innovatore ⚡ +10 – FONDATORE DELLA MODERNA NARRATIVA EUROPEA.`
    },
    { 
        id: 'niccolo-machiavelli', 
        name: 'Niccolò Machiavelli', 
        role: 'Il Segretario Fiorentino', 
        points: 20, 
        image: 'avatar_autori/niccolo_machiavelli.jpg',
        description: 'L’autore del Principe, che spiegò come funziona il potere.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA PER TUTTA EUROPA COME DIPLOMATICO.\n🏛 Politico 🏟 +15 – DEDICA TUTTA LA VITA ALLA POLITICA E ALLO STATO.\n📝 Poliedrico 🪶 +10 – POLITICO, STORICO E SCRITTORE DI TEATRO.\n📚 Classico 🏺 +10 – STUDIA GLI ANTICHI ROMANI PER CAPIRE IL PRESENTE.\n🪫 Solitario 🏡 0 – AMA LA VITA DELLE CORTI MA ANCHE LE OSTERIE.\n🤯 Scandaloso 🧨 +15 – IL SUO PENSIERO VIENE CONSIDERATO “DIABOLICO” DALLA CHIESA.\n🌀 Pessimista 🌫 -5 – PENSA CHE GLI UOMINI SIANO SPESSO CATTIVI E INGRATI.\n🧠 Innovatore ⚡ +15 – CREA LA SCIENZA POLITICA MODERNA.`
    },
    { 
        id: 'galileo-galilei', 
        name: 'Galileo Galilei', 
        role: 'Eppur si muove', 
        points: 20, 
        image: 'avatar_autori/galileo_galilei.jpg',
        description: 'Il padre del metodo scientifico moderno e il primo a guardare la luna con il cannocchiale.',
        schedaHTML: `🌍 Viaggiatore ✈ +5 – SI MUOVE TRA PISA, PADOVA E FIRENZE.\n🏛 Politico 🏟 +5 – AMICO DI PRINCIPI E CARDINALI.\n📝 Poliedrico 🪶 +5 – SCIENZIATO, SCRITTORE E MUSICISTA.\n📚 Classico 🏺 +0 – PREFERISCE L’OSSERVAZIONE DELLA NATURA AI VECCHI LIBRI.\n🪫 Solitario 🏡 0 – VIVE CIRCONDATO DA ALLIEVI E AMICI SCIENZIATI.\n🤯 Scandaloso 🧨 +15 – VIENE PROCESSATO DALLA CHIESA PER LE SUE IDEE.\n🌀 Pessimista 🌫 0 – CREDE NELLA FORZA DELLA RAGIONE E DELLA VERITÀ.\n🧠 Innovatore ⚡ +15 – INVENTA IL METODO SCIENTIFICO SPERIMENTALE.`
    },
    { 
        id: 'giuseppe-parini', 
        name: 'Giuseppe Parini', 
        role: 'Il Poeta Educatore', 
        points: 20, 
        image: 'avatar_autori/giuseppe_parini.jpg',
        description: 'L’autore del Giorno, che criticò la nobiltà pigra del suo tempo.',
        schedaHTML: `🌍 Viaggiatore ✈ 0 – RESTA QUASI SEMPRE A MILANO, LA SUA CITTÀ.\n🏛 Politico 🏟 +10 – IMPEGNATO NELLE RIFORME DELLA SCUOLA E DELLO STATO.\n📝 Poliedrico 🪶 +5 – POETA E IMPORTANTE INSEGNANTE.\n📚 Classico 🏺 +10 – USA UNO STILE ELEGANTE BASATO SUI MODELLI ANTICHI.\n🪫 Solitario 🏡 0 – VIVE IMMERSO NELLA VITA CULTURALE MILANESE.\n🤯 Scandaloso 🧨 +5 – CRITICA DURAMENTE I NOBILI PIÙ POTENTI.\n🌀 Pessimista 🌫 -5 – DELUSO DAI CAMBIAMENTI VIOLENTI DELLA STORIA.\n🧠 Innovatore ⚡ +10 – UNISCE POESIA E IMPEGNO CIVILE PER CAMBIARE LA SOCIETÀ.`
    },
    { 
        id: 'carlo-goldoni', 
        name: 'Carlo Goldoni', 
        role: 'Il Riformatore del Teatro', 
        points: 20, 
        image: 'avatar_autori/carlo_goldoni.jpg',
        description: 'L’autore che tolse le maschere agli attori e raccontò la vita vera.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – GIRA L’ITALIA E PASSA GLI ULTIMI ANNI A PARIGI.\n🏛 Politico 🏟 +0 – SI OCCUPA SOLO DI TEATRO E SPETTACOLO.\n📝 Poliedrico 🪶 +5 – SCRIVE CENTINAIA DI COMMEDIE IN ITALIANO E VENEZIANO.\n📚 Classico 🏺 +0 – SI ISPIRA AL “MONDO” E AL “TEATRO” PIÙ CHE AI LIBRI.\n🪫 Solitario 🏡 0 – AMA LA CONFUSIONE E LA VITA DEI TEATRI.\n🤯 Scandaloso 🧨 +5 – LE SUE RIFORME SCATENANO MOLTE POLEMICHE TRA I TRADIZIONALISTI.\n🌀 Pessimista 🌫 0 – LE SUE STORIE SONO PIENE DI OTTIMISMO E BUON SENSO.\n🧠 Innovatore ⚡ +15 – CREA IL TEATRO MODERNO BASATO SUI CARATTERI REALI.`
    },
    { 
        id: 'torquato-tasso', 
        name: 'Torquato Tasso', 
        role: 'Il Poeta Inquieto', 
        points: 15, 
        image: 'avatar_autori/torquato_tasso.jpg',
        description: 'L’autore della Gerusalemme Liberata, tra battaglie e tormenti religiosi.',
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA SENZA PACE TRA LE CORTI DI TUTTA ITALIA.\n🏛 Politico 🏟 +5 – POETA DI CORTE, MA SEMPRE IN LOTTA CON I POTENTI.\n📝 Poliedrico 🪶 +10 – SCRIVE POEMI, POESIE E DIALOGHI FILOSOFICI.\n📚 Classico 🏺 +10 – CERCA DI UNIRE I MODELLI ANTICHI CON LA FEDE CRISTIANA.\n🪫 Solitario 🏡 -5 – PASSA MOLTI ANNI CHIUSO IN UN OSPEDALE PER MALATI DI MENTE.\n🤯 Scandaloso 🧨 +5 – LA SUA VITA INQUIETA DIVENTA UN MITO PER I ROMANTICI.\n🌀 Pessimista 🌫 -10 – LA SUA VISIONE DEL MONDO È PIENA DI DOLORE E TRISTEZZA.\n🧠 Innovatore ⚡ +10 – PORTA NELLA POESIA UNA NUOVA SENSIBILITÀ DRAMMATICA.`
    },
    {
        id: 'cecco-angiolieri',
        name: 'Cecco Angiolieri',
        role: 'Il Poeta Maledetto',
        points: 15,
        image: 'avatar_autori/cecco_angiolieri.png',
        description: 'Il poeta del "S\'i\' fosse foco", ribelle e dissacrante.',
        schedaHTML: `🌍 Viaggiatore ✈ +5 – Frequenti spostamenti, spesso per sfuggire a debiti o problemi.\n🏛 Politico 🏟 -5 – Atteggiamento anti-istituzionale e ribelle.\n📝 Poliedrico 🪶 +5 – Maestro della poesia comico-realistica.\n📚 Classico 🏺 +5 – Conosce bene la tradizione ma se ne fa beffe.\n🪫 Solitario 🏡 -5 – Amante delle taverne e della vita sregolata.\n🤯 Scandaloso 🧨 +15 – Desidera la morte del padre e l'incendio del mondo.\n🌀 Pessimista 🌫 -10 – Rabbia e risentimento verso la propria condizione.\n🧠 Innovatore ⚡ +10 – Introduce un registro pop e arrabbiato nella lirica.`
    }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — CONTEMPORANEA + STRANIERI
// Per ora usa gli stessi autori italiani.
// Aggiungi qui gli autori stranieri quando disponibili,
// poi imposta available: true in GAME_MODES.avanzato
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS_INTERNAZIONALI = [
    {
        id: 'victor-hugo',
        name: 'Victor Hugo',
        role: 'Il Gigante del Romanticismo',
        points: 30,
        image: 'avatar_autori/victor_hugo.png',
        description: 'L’autore de I Miserabili e il difensore dei diritti umani.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIVE IN ESILIO E VIAGGIA TRA FRANCIA E ISOLE DEL CANALE DOPO CONTRASTI POLITICI.\n🏛 Politico 🏟 +10 – IMPEGNATO NELLA VITA POLITICA FRANCESE E NELLA DIFESA DEI DIRITTI CIVILI.\n📝 Poliedrico 🪶 +10 – POETA, ROMANZIERE E DRAMMATURGO.\n📚 Classico 🏺 +5 – UTILIZZA GRANDI MODELLI STORICI E MITICI.\n🪫 Solitario 🏡 -5 – L’ESILIO LO PORTA A LUNGHI PERIODI DI RIFLESSIONE SOLITARIA.\n🤯 Scandaloso 🧨 +10 – LE SUE OPERE E LE SUE IDEE SPESSO CONTRO IL POTERE.\n🌀 Pessimista 🌫 -5 – DESCRIVE LE SOFFERENZE DEGLI ULTIMI E LA DUREZZA DELLA SOCIETÀ.\n🧠 Innovatore ⚡ +10 – GUIDA IL ROMANTICISMO FRANCESE VERSO NUOVE FORME ESPRESSIVE.`
    },
    {
        id: 'gabriel-garcia-marquez',
        name: 'G. García Márquez',
        role: 'Realismo Magico',
        points: 30,
        image: 'avatar_autori/gabriel_garcia_marquez.png',
        description: 'L’autore di Cent’anni di solitudine, dove la magia incontra la realtà.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA E VIVE TRA COLOMBIA, MESSICO, EUROPA E CUBA.\n🏛 Politico 🏟 +5 – AMICO DI LEADER POLITICI E IMPEGNATO SOCIALMENTE.\n📝 Poliedrico 🪶 +10 – GIORNALISTA E SCRITTORE DI FAMA MONDIALE.\n📚 Classico 🏺 +5 – CREA UN NUOVO CANONE LETTERARIO SUDAMERICANO.\n🪫 Solitario 🏡 -5 – IL TEMA DELLA SOLITUDINE È CENTRALE NELLA SUA OPERA.\n🤯 Scandaloso 🧨 0 – RISPETTATO GLOBALMENTE COME UN MAESTRO.\n🌀 Pessimista 🌫 -5 – VEDE IL DESTINO COME UN CICLO CHE SPESSO SI RIPETE.\n🧠 Innovatore ⚡ +15 – PRINCIPALE ESPONENTE DEL REALISMO MAGICO.`
    },
    {
        id: 'edgar-allan-poe',
        name: 'Edgar Allan Poe',
        role: 'Maestro del Brivido',
        points: 30,
        image: 'avatar_autori/edgar_allan_poe.png',
        description: 'L’inventore del racconto poliziesco e maestro del genere horror.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +5 – SI SPOSTA TRA DIVERSE CITTÀ AMERICANE IN CERCA DI FORTUNA.\n🏛 Politico 🏟 0 – NON SI INTERESSA ALLA VITA POLITICA.\n📝 Poliedrico 🪶 +5 – POETA, CRITICO E SCRITTORE DI RACCONTI.\n📚 Classico 🏺 +5 – SI ISPIRA ALLA TRADIZIONE GOTICA EUROPEA.\n🪫 Solitario 🏡 -10 – VISSUTO IN POVERTÀ E SPESSO ISOLATO.\n🤯 Scandaloso 🧨 +10 – VITA TORMENTATA E POLEMICHE CON I CONTEMPORANEI.\n🌀 Pessimista 🌫 -15 – LA SUA OPERA È IMMERSA NELL’OSCURITÀ E NELL’ANGOSCIA.\n🧠 Innovatore ⚡ +15 – INVENTA IL GENERE DETECTIVE E MODERNA L’HORROR.`
    },
    {
        id: 'fedor-dostoevskij',
        name: 'Fëdor Dostoevskij',
        role: 'L’Abisso dell’Anima',
        points: 25,
        image: 'avatar_autori/fedor_dostoevskij.png',
        description: 'L’autore di Delitto e castigo, che esplorò i tormenti della coscienza.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA IN EUROPA, MA SOPRATTUTTO L’ESILIO IN SIBERIA.\n🏛 Politico 🏟 +5 – IDEE CHE CAMBIANO NEL TEMPO, SEMPRE PROFONDO.\n📝 Poliedrico 🪶 +5 – ROMANZIERE E FILOSOFO DELL'ESISTENZA.\n📚 Classico 🏺 +5 – SI CONFRONTA CON I GRANDI TEMI DELLA MORALE.\n🪫 Solitario 🏡 -5 – LA SOFFERENZA LO PORTA A UNA CHIUSURA INTERIORE.\n🤯 Scandaloso 🧨 +10 – CONDANNATO A MORTE, POI GRAZIATO, VITA AL LIMITE.\n🌀 Pessimista 🌫 -10 – VEDE IL PECCATO E IL DOLORE COME PARTE DELL'UOMO.\n🧠 Innovatore ⚡ +15 – CREA IL ROMANZO PSICOLOGICO MODERNO.`
    },
    {
        id: 'lev-tolstoj',
        name: 'Lev Tolstoj',
        role: 'Guerra e Pace',
        points: 25,
        image: 'avatar_autori/lev_tolstoj.png',
        description: 'Il grande narratore della storia e dell’animo russo.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +5 – VIAGGIA IN EUROPA MA È LEGATISSIMO ALLA SUA TERRA.\n🏛 Politico 🏟 +10 – LE SUE IDEE SULLA NON-VIOLENZA ISPIRANO GANDHI.\n📝 Poliedrico 🪶 +10 – SCRITTORE, FILOSOFO E RIFORMATORE SOCIALE.\n📚 Classico 🏺 +10 – MODELLO DI RIFERIMENTO PER IL REALISMO MONDIALE.\n🪫 Solitario 🏡 -5 – RICERCA UNA VITA SEMPLICE E RURALE.\n🤯 Scandaloso 🧨 +10 – SCOMUNICATO DALLA CHIESA ORTODOSSA.\n🌀 Pessimista 🌫 -5 – VISIONE DRAMMATICA DELLA STORIA E DEL DESTINO.\n🧠 Innovatore ⚡ +10 – PORTA IL REALISMO A LIVELLI DI DETTAGLIO MAI VISTI.`
    },
    {
        id: 'george-orwell',
        name: 'George Orwell',
        role: '1984 e il Grande Fratello',
        points: 25,
        image: 'avatar_autori/george_orwell.png',
        description: 'Il visionario che mise in guardia contro i totalitarismi.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIVE IN INDIA, BIRMANIA, SPAGNA E FRANCIA.\n🏛 Politico 🏟 +15 – TUTTA LA SUA OPERA È UNA CRITICA AL POTERE.\n📝 Poliedrico 🪶 +5 – SAGGISTA E ROMANZIERE POLITICO.\n📚 Classico 🏺 0 – SI CONCENTRA SUL PRESENTE E SUL FUTURO DISTOPICO.\n🪫 Solitario 🏡 0 – ISOLAMENTO PER SCRIVERE IL SUO ULTIMO CAPOLAVORO.\n🤯 Scandaloso 🧨 +10 – I SUOI LIBRI SONO STATI SPESSO CENSURATI.\n🌀 Pessimista 🌫 -10 – VISIONE CUPA DEL FUTURO DELL'UMANITÀ.\n🧠 Innovatore ⚡ +15 – CREA UN LINGUAGGIO PER DESCRIVERE IL CONTROLLO SOCIALE.`
    },
    {
        id: 'ernest-hemingway',
        name: 'Ernest Hemingway',
        role: 'Il Vecchio e il Mare',
        points: 25,
        image: 'avatar_autori/ernest_hemingway.png',
        description: 'L’autore della Lost Generation, amante dell’avventura e della sintesi.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +15 – VIAGGIA TRA EUROPA, AFRICA, CUBA E STATI UNITI.\n🏛 Politico 🏟 +5 – CORRISPONDENTE DI GUERRA IN MOLTI CONFLITTI.\n📝 Poliedrico 🪶 +5 – GIORNALISTA E ROMANZIERE.\n📚 Classico 🏺 0 – STILE ESSENZIALE CHE ROMPE CON IL PASSATO.\n🪫 Solitario 🏡 -5 – RICERCA DI SFIDE INDIVIDUALI CONTRO LA NATURA.\n🤯 Scandaloso 🧨 +5 – VITA AVVENTUROSA E SPESSO AL CENTRO DELLA CRONACA.\n🌀 Pessimista 🌫 -10 – TEMI DELLA SCONFITTA E DEL CORAGGIO TRAGICO.\n🧠 Innovatore ⚡ +15 – CAMBIA PER SEMPRE LA PROSA INGLESE.`
    },
    {
        id: 'charles-dickens',
        name: 'Charles Dickens',
        role: 'La Londra degli Ultimi',
        points: 25,
        image: 'avatar_autori/charles_dickens.png',
        description: 'Il grande narratore delle ingiustizie sociali dell’Inghilterra vittoriana.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +5 – VIAGGIA IN AMERICA E EUROPA PER TOUR DI LETTURE.\n🏛 Politico 🏟 +10 – DENUNCIA COSTANTE DELLE CONDIZIONI DEI POVERI.\n📝 Poliedrico 🪶 +5 – ROMANZIERE E GIORNALISTA.\n📚 Classico 🏺 +5 – CREA PERSONAGGI CHE DIVENTANO ARCHETIPI.\n🪫 Solitario 🏡 0 – VIVE CIRCONDATO DAL SUCCESSO E DA UNA GRANDE FAMIGLIA.\n🤯 Scandaloso 🧨 0 – CELEBRATO COME UN EROE NAZIONALE.\n🌀 Pessimista 🌫 -5 – DESCRIVE L'OSCURITÀ DELLE CITTÀ INDUSTRIALI.\n🧠 Innovatore ⚡ +10 – PADRE DEL ROMANZO SOCIALE MODERNO.`
    },
    {
        id: 'herman-melville',
        name: 'Herman Melville',
        role: 'Moby Dick',
        points: 25,
        image: 'avatar_autori/herman_melville.png',
        description: 'L’autore della balena bianca, il viaggio estremo tra mare e ossessione.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +15 – NAVIGA PER ANNI NEI MARI DEL SUD.\n🏛 Politico 🏟 0 – NON PARTECIPA ALLA VITA POLITICA.\n📝 Poliedrico 🪶 +5 – SCRITTORE DI MARE E POETA.\n📚 Classico 🏺 +5 – SI CONFRONTA CON MITI E TESTI BIBLICI.\n🪫 Solitario 🏡 -5 – DIMENTICATO DALLA CRONACA NEGLI ULTIMI ANNI.\n🤯 Scandaloso 🧨 0 – RIVALUTATO COME GENIO SOLO DOPO LA MORTE.\n🌀 Pessimista 🌫 -10 – LOTTA IMPOSSIBILE CONTRO LE FORZE DELLA NATURA.\n🧠 Innovatore ⚡ +10 – UNISCE AVVENTURA E METAFISICA PROFONDA.`
    },
    {
        id: 'oscar-wilde',
        name: 'Oscar Wilde',
        role: 'L’Esteta Ribelle',
        points: 25,
        image: 'avatar_autori/oscar_wilde.png',
        description: 'L’autore de Il ritratto di Dorian Gray e maestro dell’aforisma.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA TRA EUROPA E AMERICA PER CONFERENZE.\n🏛 Politico 🏟 0 – RIFIUTA LA POLITICA TRADIZIONALE.\n📝 Poliedrico 🪶 +10 – POETA, DRAMMATURGO E SAGGISTA.\n📚 Classico 🏺 +5 – SI ISPIRA ALLA BELLEZZA DELL’ANTICA GRECIA.\n🪫 Solitario 🏡 -10 – IL CARCERE LO PORTA A UNA TRAGICA SOLITUDINE.\n🤯 Scandaloso 🧨 +15 – PROTAGONISTA DI UNO SCANDALO SOCIALE E GIUDIZIARIO.\n🌀 Pessimista 🌫 -5 – IRONIA CHE NASCONDE UNA TRAGICA VISIONE DELLA VITA.\n🧠 Innovatore ⚡ +15 – SIMBOLO DELL'ESTETISMO E DELLA LIBERTÀ INDIVIDUALE.`
    },
    {
        id: 'emile-zola',
        name: 'Émile Zola',
        role: 'Il Naturalismo',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'Il teorico del naturalismo e l’autore del celebre J’Accuse.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +5 – ESILIATO IN INGHILTERRA PER LE SUE IDEE.\n🏛 Politico 🏟 +15 – DIFENSORE DELLA VERITÀ E DEI DIRITTI CIVILI (AFFARE DREYFUS).\n📝 Poliedrico 🪶 +5 – ROMANZIERE, CRITICO E GIORNALISTA.\n📚 Classico 🏺 0 – APPLICA IL METODO SCIENTIFICO ALLA LETTERATURA.\n🪫 Solitario 🏡 0 – VITA ATTIVA NEL DIBATTITO PUBBLICO.\n🤯 Scandaloso 🧨 +10 – I SUOI ROMANZI CRUDRY SCIOCCANO LA SOCIETÀ.\n🌀 Pessimista 🌫 -5 – ANALISI SPIETATA DEI DETERMINISMI SOCIALI.\n🧠 Innovatore ⚡ +15 – CREA IL ROMANZO SPERIMENTALE.`
    },
    {
        id: 'franz-kafka',
        name: 'Franz Kafka',
        role: 'Il Labirinto dell’Inquietudine',
        points: 20,
        image: 'avatar_autori/franz_kafka.png',
        description: 'L’autore de La metamorfosi, che raccontò l’alienazione moderna.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +5 – SOGGIORNI IN DIVERSE CITTÀ EUROPEE PER MOTIVI DI SALUTE.\n🏛 Politico 🏟 0 – ESTRANEO ALLA POLITICA MILITANTE.\n📝 Poliedrico 🪶 +5 – SCRITTORE DI RACCONTI E ROMANZI INCOMPIUTI.\n📚 Classico 🏺 0 – CREA UN UNIVERSO COMPLETAMENTE NUOVO E SURREALE.\n🪫 Solitario 🏡 -10 – VITA INTERIORE TORTUOSA E ISOLATA.\n🤯 Scandaloso 🧨 0 – PUBBLICATO QUASI TUTTO POSTUMO CONTRO LA SUA VOLONTÀ.\n🌀 Pessimista 🌫 -20 – MASSIMA ESPRESSIONE DELL'ASSURDO E DELL'ANGOSCIA.\n🧠 Innovatore ⚡ +15 – CREA IL CONCETTO DI "KAFKAIANO".`
    },
    {
        id: 'virginia-woolf',
        name: 'Virginia Woolf',
        role: 'Il Flusso di Coscienza',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'La pioniera della modernità e dell’analisi interiore femminile.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +5 – VIAGGI IN EUROPA, MA SOPRATTUTTO IL CIRCOLO DI BLOOMSBURY.\n🏛 Politico 🏟 +10 – IMPORTANTE VOCE PER IL MOVIMENTO FEMMINISTA.\n📝 Poliedrico 🪶 +10 – SAGGISTA, ROMANZIERA E EDITRICE.\n📚 Classico 🏺 +5 – SI CONFRONTA CON LA TRADIZIONE PER SUPERARLA.\n🪫 Solitario 🏡 -5 – RICERCA DI "UNA STANZA TUTTA PER SÉ".\n🤯 Scandaloso 🧨 +5 – RICEVE CRITICHE PER IL SUO STILE SPERIMENTALE.\n🌀 Pessimista 🌫 -10 – LOTTA CONSTANTE CONTRO IL DOLORE MENTALE.\n🧠 Innovatore ⚡ +15 – MAESTRA DEL FLUSSO DI COSCIENZA.`
    },
    {
        id: 'james-joyce',
        name: 'James Joyce',
        role: 'L’Ulisse Moderno',
        points: 20,
        image: 'avatar_autori/james_joyce.png',
        description: 'L’autore di Ulisse, che rivoluzionò il linguaggio del romanzo.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIVE IN ESILIO VOLONTARIO A TRIESTE, PARIGI E ZURIGO.\n🏛 Politico 🏟 0 – DISTANTE DALLA POLITICA ATTIVA.\n📝 Poliedrico 🪶 +5 – POETA E ROMANZIERE SPERIMENTALE.\n📚 Classico 🏺 +10 – RISCRIVE IL MITO DI OMERO NELLA MODERNITÀ.\n🪫 Solitario 🏡 -5 – DEDIZIONE TOTALE ALLA SCRITTURA COMPLESSA.\n🤯 Scandaloso 🧨 +15 – IL SUO ULISSE VIENE CENSURATO PER ANNI PER OSCENITÀ.\n🌀 Pessimista 🌫 0 – IRONIA E COMPLESSITÀ CHE SUPERANO IL PESSIMISMO.\n🧠 Innovatore ⚡ +20 – PORTA LA SPERIMENTAZIONE LINGUISTICA AL LIMITE.`
    },
    {
        id: 'mark-twain',
        name: 'Mark Twain',
        role: 'L’Anima dell’America',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'L’autore di Tom Sawyer e Huckleberry Finn, maestro dell’umorismo.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA PER TUTTO IL MONDO COME CONFERENZIERE.\n🏛 Politico 🏟 +5 – CRITICO DELL'IMPERIALISMO E DEL RAZZISMO.\n📝 Poliedrico 🪶 +5 – GIORNALISTA, SCRITTORE E INVENTORE.\n📚 Classico 🏺 0 – CREA UNA LETTERATURA AMERICANA AUTENTICA.\n🪫 Solitario 🏡 0 – FIGURA PUBBLICA MOLTO AMATA.\n🤯 Scandaloso 🧨 +5 – I SUOI LIBRI SPESSO DISCUSSI PER IL LINGUAGGIO DIRETTO.\n🌀 Pessimista 🌫 -5 – UMORISMO CHE NASCONDE UNA VISIONE CINICA.\n🧠 Innovatore ⚡ +10 – PADRE DELLA LETTERATURA AMERICANA MODERNA.`
    },
    {
        id: 'anton-cechov',
        name: 'Anton Čechov',
        role: 'Maestro del Sottomono',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'Il medico scrittore che rivoluzionò il racconto e il dramma.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA FINO ALL’ISOLA DI SAKHALIN PER STUDIARE I PRIGIONIERI.\n🏛 Politico 🏟 +5 – IMPEGNO SOCIALE COME MEDICO GRATUITO PER I POVERI.\n📝 Poliedrico 🪶 +5 – SCRITTORE DI RACCONTI E DRAMMATURGO.\n📚 Classico 🏺 +5 – SI ISPIRA ALLA REALTÀ QUOTIDIANA SENZA EROISMI.\n🪫 Solitario 🏡 -5 – MALATTIA CHE LO PORTA A PERIODI DI RITIRO.\n🤯 Scandaloso 🧨 0 – RISPETTATO PER LA SUA UMILTÀ E PROFONDITÀ.\n🌀 Pessimista 🌫 -5 – TRISTEZZA PER L'IMPOSSIBILITÀ DI COMUNICARE.\n🧠 Innovatore ⚡ +15 – CREA IL TEATRO DELL'ATMOSFERA.`
    },
    {
        id: 'henrik-ibsen',
        name: 'Henrik Ibsen',
        role: 'Il Dramma Borghese',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'L’autore di Casa di bambola, che scosse le fondamenta della famiglia borghese.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIVE MOLTI ANNI IN ITALIA E GERMANIA IN ESILIO VOLONTARIO.\n🏛 Politico 🏟 +5 – LE SUE OPERE SONO UN ATTO POLITICO CONTRO L'IPOCRISIA.\n📝 Poliedrico 🪶 +5 – DRAMMATURGO E POETA.\n📚 Classico 🏺 +5 – SI ISPIRE AL RIGORE TESSUTO CON I TEMI MODERNI.\n🪫 Solitario 🏡 -5 – CARATTERE DIFFICILE E SOLITARIO.\n🤯 Scandaloso 🧨 +15 – LE SUE OPERE SCATENANO DISORDINI E CENSURE.\n🌀 Pessimista 🌫 -5 – SCOPRE I SEGRETI OSCURI DI OGNI FAMIGLIA.\n🧠 Innovatore ⚡ +15 – PADRE DEL DRAMMA MODERNO BORGUESE.`
    },
    {
        id: 'rainer-maria-rilke',
        name: 'Rainer Maria Rilke',
        role: 'Il Poeta degli Angeli',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'Il grande lirico delle Elegie duinesi e dei Sonetti a Orfeo.',
        isInternational: true,
        schedaHTML: `🌍 Viaggiatore ✈ +10 – VIAGGIA COSTANTEMENTE TRA RUSSIA, FRANCIA, ITALIA E SVIZZERA.\n🏛 Politico 🏟 0 – DISTANTE DALLA VITA PUBBLICA.\n📝 Poliedrico 🪶 +5 – POETA E SCRITTORE DI PROSA LIRICA.\n📚 Classico 🏺 +10 – SI ISPIRA ALL'ARTE E ALLA SCULTURA (RODIN).\n🪫 Solitario 🏡 -10 – RICERCA DI ISOLAMENTO TOTALE PER LA SCRITTURA.\n🤯 Scandaloso 🧨 0 – CELEBRATO COME IL MASSIMO POETA LIRICO.\n🌀 Pessimista 🌫 -5 – SENSO DELLA MORTE E DELLA TRANSITORIETÀ.\n🧠 Innovatore ⚡ +10 – RENDE LA POESIA UNO STRUMENTO DI CONOSCENZA ESTREMA.`
    }
];

const AUTHORS_AVANZATO = [...AUTHORS, ...AUTHORS_INTERNAZIONALI];

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
        budget: 20000,
        currencyLabel: 'lire',
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
        budget: 500,
        currencyLabel: 'fiorini',
        available: true
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
        budget: 20000,
        currencyLabel: 'lire',
        available: true
    }
};

const MOCK_DOCENTI = [];

// Mock database squadre iscritte (futuro: Firebase)
const MOCK_TEAMS = [];

let MOCK_SCHEDE = [];
const MISSIONS = [];
