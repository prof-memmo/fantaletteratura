// Dati Mockati - Fantaletteratura

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — CLASSI TERZE (attivo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS = [
    { 
        id: 'a1',  name: 'Ugo Foscolo', cost: 4500, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Foscolo.png',
        schedaHTML: `<p class="scheda-intro">Il poeta dell'eroismo e della bellezza classica, che visse il tormento delle passioni e l'amarezza dell'esilio, cercando nell'arte una forma di eternità.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">La voce più profonda e malinconica del pensiero italiano, capace di trasformare il dolore dell'esistenza in una poesia pura e universale che esplora i confini dell'infinito.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il padre del romanzo moderno in Italia, che ha saputo raccontare la storia degli umili intrecciandola con le grandi questioni del destino, della morale e della fede.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il 'vate' dell'Italia unita, classicista rigoroso e appassionato, che ha celebrato con forza la storia e il paesaggio italiano, diventando il primo premio Nobel per la letteratura nel nostro paese.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il maestro del Verismo, che con occhio quasi scientifico e cuore partecipe ha ritratto il destino dei 'vinti', portando la lingua italiana a contatto con la realtà cruda e verace della sua Sicilia.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il poeta del 'fanciullino', capace di scorgere il mistero e la poesia nelle piccole cose e nei simboli della natura, avvolgendo il dolore della perdita in una lingua musicale e innovativa.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">L'esteta supremo e l'uomo d'azione che ha fatto della propria vita un'opera d'arte, dominando la scena culturale italiana tra lusso, scandali, imprese eroiche e una ricerca incessante della bellezza assoluta.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il genio che ha messo a nudo le maschere dell'uomo moderno, esplorando l'abisso tra l'essere e l'apparire in un teatro che ha rivoluzionato il modo di guardare alla verità e all'identità.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">L'incendiario del Futurismo, che ha sfidato il passato per celebrare la velocità, la macchina e il movimento, rivoluzionando il linguaggio e l'arte con una forza travolgente e provocatoria.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il poeta che ha scavato nel silenzio della guerra per trovare la parola pura, capace di illuminare l'infinito in un solo verso e di restituire all'uomo la sua dignità nel dolore.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">L'osservatore della 'disfatta del vivere', che ha cercato nelle crepe della realtà un segnale di speranza, consegnando alla poesia del Novecento un linguaggio scarno, preciso e indimenticabile.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il lirico che ha fuso la memoria della sua terra con le ferite della storia, trasformando la parola in un canto civile ed elegiaco che gli è valso il premio Nobel.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">L'intellettuale triestino che ha introdotto la psicanalisi nella letteratura italiana, scandagliando con ironia e onestà le debolezze e le 'inettitudini' dell'uomo moderno di fronte alla complessità della vita.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il maestro della leggerezza e dell'immaginazione, che ha esplorato mondi fantastici e strutture narrative perfette per raccontare la complessità del reale con la precisione di uno scienziato e l'incanto di un favolista.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">La narratrice della fiaba tragica e della potenza dei sentimenti, che ha saputo dar voce all'innocenza dei bambini e alla sofferenza degli umili in una scrittura magica, epica e profondamente umana.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il testimone dell'indicibile che ha trasformato l'orrore del lager in una riflessione lucida e necessaria sulla natura umana, unendo la precisione del chimico alla sensibilità del poeta per difendere la memoria e la dignità.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il poeta delle Langhe e della solitudine esistenziale, che ha cantato con strazio e rigore il mito della terra, il mistero del sangue e la difficoltà di essere vivi, lasciando un'impronta indelebile nella cultura del dopoguerra.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">L'analista spietato della borghesia e dei suoi disincanti, che con una prosa asciutta e diretta ha esplorato l'alienazione, il sesso e il potere, diventando uno dei testimoni più lucidi della società contemporanea.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il partigiano scrittore che ha raccontato la Resistenza con una lingua barbara e magnifica, fatta di realtà e di epica, trasformando la collina piemontese in un teatro universale di coraggio e di destino.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Il profeta scomodo e l'intellettuale totale che ha sfidato ogni conformismo, difendendo la sacralità del passato contadino contro il consumismo e gridando la propria verità attraverso la poesia, il cinema e la polemica.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">La voce del lessico familiare e delle verità sottaciute, che con una scrittura essenziale e purissima ha saputo intrecciare la cronaca del quotidiano con i grandi traumi della storia e degli affetti.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">La coscienza critica della Sicilia e d'Italia, che attraverso il genere giallo ha indagato i meccanismi occulti del potere e della mafia, rivendicando sempre la forza della ragione e della giustizia.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">La 'piccola ape furibonda' della poesia italiana, che ha trasformato il dolore del manicomio e dell'emarginazione in un canto d'amore e di libertà, celebrando la vita con una lingua visionaria e prepotente.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">L'antico e moderno poeta di Trieste, che con una 'onesta' semplicità ha cantato le strade della sua città, i dolori dell'anima e la 'nuova aurora' della vita, cercando sempre la verità nelle pieghe dell'esistenza.</p>
        <ul class="scheda-list">
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
        schedaHTML: `<p class="scheda-intro">Le fondamenta della nostra identità: frammenti di giuramenti e testimonianze che segnano il passaggio dal latino al volgare, rivelando la nascita di una nuova coscienza linguistica e sociale.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; Testi che nascono dal movimento di notai e religiosi in diverse aree.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; Documenti legati all'amministrazione della giustizia e delle terre.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; Getta le basi per diversi usi della scrittura.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; Transizione dal latino alle lingue vernacolari.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; Spesso documenti d'archivio isolati.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; Valore storico-documentario.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; Neutralità dei testi giuridici.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; Rompe il monopolio del latino nella scrittura ufficiale.</li>
        </ul>`
    },
    {
        id: 'scuola-siciliana',
        name: 'La Scuola Siciliana',
        role: 'Poeti di Corte',
        points: 30,
        image: 'avatar_autori/scuola_siciliana.png',
        description: 'La nascita della lirica d’amore alla corte di Federico II.',
        schedaHTML: `<p class="scheda-intro">I raffinati poeti della corte di Federico II che, tra burocrazia e cortesia, hanno inventato il sonetto e trasformato il siciliano in una lingua d'arte, dando inizio alla tradizione lirica italiana.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; Mobilità dei poeti-funzionari nella Magna Curia.</li>
            <li><strong>🏛 POLITICO 🏟 +10</strong> &rarr; Al servizio dell'imperatore Federico II.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; Poeti che sono anche giuristi e burocrati.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; Ripresa della tradizione trobadorica provenzale.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; Vissuti nella fastosa ma chiusa corte imperiale.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; L'amore cortese è un tema raffinato, mai volgare.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; Idealizzazione positiva del sentimento amoroso.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; Inventano il sonetto e creano il primo volgare illustre.</li>
        </ul>`
    },
    { 
        id: 'francesco-assisi', 
        name: 'Francesco d’Assisi', 
        role: 'Poverello d’Assisi', 
        points: 30, 
        image: 'avatar_autori/francesco_assisi.png',
        description: 'Il Santo che parlava agli uccelli e scrisse il primo grande testo in volgare.',
        schedaHTML: `<p class="scheda-intro">Il 'giullare di Dio' che ha rivoluzionato la spiritualità medievale, scrivendo il primo grande inno alla creazione in una lingua semplice e luminosa, capace di parlare al cuore di tutti.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; PREDICA E VIAGGIA PER L’ITALIA DIFFONDENDO PACE E FRATERNITÀ.</li>
            <li><strong>🏛️ POLITICO 🏟️ +0</strong> &rarr; NON PARTECIPA ALLA VITA POLITICA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; COMPONE PREGHIERE E POESIE IN VOLGARE (“CANTICO DELLE CREATURE”).</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA ALLA BIBBIA, TESTO FONDAMENTALE DELLA TRADIZIONE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; SCEGLIE LA POVERTÀ E LA VITA RITIRATA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; FIGURA SPIRITUALE, MAI COINVOLTA IN POLEMICHE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; VISIONE POSITIVA DELLA VITA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; PRIMO AD USARE IL VOLGARE PER SCRIVERE DI DIO E DELLA NATURA.</li>
        </ul>`
    },
    { 
        id: 'francesco-petrarca', 
        name: 'Francesco Petrarca', 
        role: 'Padre dell’Umanesimo', 
        points: 30, 
        image: 'avatar_autori/francesco_petrarca.png',
        description: 'Il poeta dell’interiorità, incoronato in Campidoglio.',
        schedaHTML: `<p class="scheda-intro">Il poeta dell'interiorità e il primo grande umanista, che ha esplorato i labirinti del cuore umano e la gloria della letteratura, consegnando ai posteri un modello di perfezione lirica insuperato.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; PASSA LA VITA IN MOVIMENTO TRA AVIGNONE, L’ITALIA E L’EUROPA.</li>
            <li><strong>🏛️ POLITICO 🏟️ +5</strong> &rarr; AMICO DEI POTENTI, SVOLGE MOLTE MISSIONI DIPLOMATICHE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETA IN VOLGARE E GRANDE STUDIOSO IN LATINO.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; MODELLO PER TUTTA LA POESIA EUROPEA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; AMA LA VITA TRANQUILLA E RITIRATA (VALCHIUSA).</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; POETA RISPETTATO E CELEBRATO DA TUTTI.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; LA SUA POESIA È PIENA DI DUBBI, PENTIMENTO E DISPIACERE.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; FONDATORE DELL’UMANESIMO E DEL SONETTO MODERNO.</li>
        </ul>`
    },
    { 
        id: 'lorenzo-medici', 
        name: 'Lorenzo de’ Medici', 
        role: 'L’Ago della Bilancia', 
        points: 30, 
        image: 'avatar_autori/lorenzo_medici.png',
        description: 'Signore di Firenze e mecenate dei più grandi artisti del Rinascimento.',
        schedaHTML: `<p class="scheda-intro">Il signore poeta che ha incarnato l'ideale del Rinascimento, trasformando Firenze nella capitale della cultura e celebrando la bellezza fugace della giovinezza con i suoi celebri canti.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +0</strong> &rarr; RESTA QUASI SEMPRE A FIRENZE E NELLE SUE VILLE.</li>
            <li><strong>🏛 POLITICO 🏟 +15</strong> &rarr; IL PIÙ GRANDE POLITICO DEL SUO TEMPO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; SIGNORE DI FIRENZE, POETA E GRANDE MECENATE.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; PROMUOVE LO STUDIO DELLA CULTURA GRECA E LATINA.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VIVE CIRCONDATO DA ARTISTI, FILOSOFI E AMICI.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; VITA PUBBLICA RISPETTATA, ANCHE SE VITTIMA DI CONGIURE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; LA SUA POESIA CELEBRA LA GIOIA E LA GIOVINEZZA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; RENDE FIRENZE LA CAPITALE MONDIALE DELLA CULTURA.</li>
        </ul>`
    },
    { 
        id: 'cesare-beccaria', 
        name: 'Cesare Beccaria', 
        role: 'Contro la Pena di Morte', 
        points: 30, 
        image: 'avatar_autori/cesare_beccaria.png',
        description: 'L’Illuminista che cambiò la giustizia nel mondo.',
        schedaHTML: `<p class="scheda-intro">L'illuminista coraggioso che con un solo, lucido trattato ha sfidato i secoli di barbarie legale, chiedendo giustizia e dignità per ogni uomo e ispirando l'abolizione della pena di morte in tutto il mondo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ -5</strong> &rarr; AMA POCO VIAGGIARE E RESTA QUASI SEMPRE A MILANO.</li>
            <li><strong>🏛 Politico 🏟 +10</strong> &rarr; LE SUE IDEE CAMBIANO LE LEGGI DI MOLTI STATI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; GIURISTA, ECONOMISTA E LETTERATO.</li>
            <li><strong>📚 CLASSICO 🏺 +0</strong> &rarr; SI ISPIRA ALLE NUOVE IDEE DELLA RAGIONE PIÙ CHE AL PASSATO.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; CARATTERE TIMIDO E SCHIVO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; IL SUO LIBRO VIENE PROIBITO DALLA CHIESA.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; CREDE NEL PROGRESSO E NELLA FELICITÀ UMANA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; PROMETTE L’ABOLIZIONE DELLA TORTURA E DELLA PENA DI MORTE.</li>
        </ul>`
    },
    { 
        id: 'dante-alighieri-sec', 
        name: 'Dante Alighieri', 
        role: 'Il Sommo Poeta', 
        points: 25, 
        image: 'avatar_autori/dante_modern.png',
        description: 'L’autore della Divina Commedia, il viaggio nell’oltretomba.',
        schedaHTML: `<p class="scheda-intro">Il Sommo Poeta che ha racchiuso l'intero universo medievale in un viaggio ultraterreno senza precedenti, creando una lingua e un immaginario che sono ancora oggi la radice profonda della cultura italiana.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; PASSA MOLTI ANNI IN ESILIO GIRANDO PER L’ITALIA.</li>
            <li><strong>🏛 Politico 🏟 +10</strong> &rarr; IMPEGNATO NELLA POLITICA DI FIRENZE, PAGHERÀ CON L’ESILIO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; SCRIVE DI AMORE, FILOSOFIA, POLITICA E RELIGIONE.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; CONSIDERA VIRGILIO LA SUA GUIDA E IL SUO MODELLO.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VIVE TRA LA GENTE, NELLE CORTI CHE LO OSPITANO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; NON HA PAURA DI METTERE PAPI E RE ALL’INFERNO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; IL SUO VIAGGIO FINISCE NELLA LUCE DI DIO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA LA LINGUA ITALIANA CON UN CAPOLAVORO ASSOLUTO.</li>
        </ul>`
    },
    { 
        id: 'ludovico-ariosto', 
        name: 'Ludovico Ariosto', 
        role: 'Il Poeta del Furioso', 
        points: 25, 
        image: 'avatar_autori/ludovico_ariosto.png',
        description: 'L’autore dell’Orlando Furioso, tra magia, cavalieri e amore.',
        schedaHTML: `<p class="scheda-intro">Il creatore di un mondo fantastico fatto di cavalieri, maghi e passioni travolgenti, che ha guardato alle follie dell'uomo con l'ironia e la saggezza di chi sa che la luna ospita tutto ciò che perdiamo in terra.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGI MOLTO PER LAVORO AL SERVIZIO DEGLI ESTE.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; AMMINISTRA TERRE DIFFICILI COME LA GARFAGNANA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; POETA, SCRITTORE DI TEATRO E DIPLOMATICO.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; RIPRENDE I MITI ANTICHI E I POEMI CAVALLERESCHI.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; SOGNA UNA VITA TRANQUILLA NEL SUO PICCOLO GIARDINO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; POETA DI CORTE SEMPRE EDUCO E MISURATO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; VEDE IL MONDO COME UN LUOGO DI FOLLIA E ILLUSIONI.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; CREA UN POEMA MODERNO PIENO DI IRONIA E FANTASIA.</li>
        </ul>`
    },
    { 
        id: 'giovanni-boccaccio', 
        name: 'Giovanni Boccaccio', 
        role: 'Il Maestro del Racconto', 
        points: 20, 
        image: 'avatar_autori/giovanni_boccaccio.png',
        description: 'L’autore del Decameron, cento novelle su amore e astuzia.',
        schedaHTML: `<p class="scheda-intro">Il maestro del racconto che ha celebrato l'intelligenza umana e la vitalità delle passioni, intrecciando storie di beffe, amori e fortuna per offrire conforto e intrattenimento in un mondo segnato dalla peste.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; VIAGGI TRA FIRENZE e NAPOLI PER AFFARI E CULTURA.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; SVOLGE COMPITI DIPLOMATICI PER IL COMUNE DI FIRENZE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; SCRIVE POESIE, ROMANZI E RACCONTI.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; RITROVA E STUDIA IMPORTANTI TESTI ANTICHI.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; AMA LA COMPAGNIA E LA VITA SOCIALE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; LE SUE NOVELLE SONO SPESSO MOLTO AUDACI E LIBERE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; HA UNA VISIONE PRAGMATICA E VITALE DELL’ESISTENZA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; FONDATORE DELLA MODERNA NARRATIVA EUROPEA.</li>
        </ul>`
    },
    { 
        id: 'niccolo-machiavelli', 
        name: 'Niccolò Machiavelli', 
        role: 'Il Segretario Fiorentino', 
        points: 20, 
        image: 'avatar_autori/niccolo_machiavelli.png',
        description: 'L’autore del Principe, che spiegò come funziona il potere.',
        schedaHTML: `<p class="scheda-intro">Lo scienziato della politica che ha analizzato la natura del potere con spietata onestà, insegnando che per governare gli uomini serve la forza del leone e l'astuzia della volpe.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGI PER TUTTA EUROPA COME DIPLOMATICO.</li>
            <li><strong>🏛 POLITICO 🏟 +15</strong> &rarr; DEDICA TUTTA LA VITA ALLA POLITICA E ALLO STATO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; POLITICO, STORICO e SCRITTORE DI TEATRO.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; STUDIA GLI ANTICHI ROMANI PER CAPIRE IL PRESENTE.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VIVE CIRCONDATO DA ARTISTI, STORICI E OSTERIE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; IL SUO PENSIERO VIENE CONSIDERATO “DIABOLICO” DALLA CHIESA.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; PENSA CHE GLI UOMINI SIANO SPESSO CATTIVI E INGRATI.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA LA SCIENZA POLITICA MODERNA.</li>
        </ul>`
    },
    { 
        id: 'galileo-galilei', 
        name: 'Galileo Galilei', 
        role: 'Eppur si muove', 
        points: 20, 
        image: 'avatar_autori/galileo_galilei.png',
        description: 'Il padre del metodo scientifico moderno e il primo a guardare la luna con il cannocchiale.',
        schedaHTML: `<p class="scheda-intro">Il padre della scienza moderna che ha sfidato i dogmi del passato con la forza dell'osservazione e della ragione, aprendo gli occhi dell'umanità sull'universo infinito ed 'eppur muovendosi' verso la verità.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +5</strong> &rarr; SI MUOVE TRA PISA, PADOVA E FIRENZE.</li>
            <li><strong>🏛️ POLITICO 🏟️ +5</strong> &rarr; AMICO DI PRINCIPI E CARDINALI, MA VITTIMA DEL POTERE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCIENZIATO, SCRITTORE E MUSICISTA.</li>
            <li><strong>📚 CLASSICO 🏺 +0</strong> &rarr; PREFERISCE L’OSSERVAZIONE DELLA NATURA AI VECCHI LIBRI.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VIVE CIRCONDATO DA ALLIEVI E AMICI SCIENZIATI.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; VIENE PROCESSATO DALLA CHIESA PER LE SUE IDEE RIVOLUZIONARIE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; CREDE NELLA FORZA DELLA RAGIONE E DELLA VERITÀ SPERIMENTALE.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +15</strong> &rarr; INVENTA IL METODO SCIENTIFICO SPERIMENTALE E IL CANNOCCHIALE.</li>
        </ul>`
    },
    { 
        id: 'giuseppe-parini', 
        name: 'Giuseppe Parini', 
        role: 'Il Poeta Educatore', 
        points: 20, 
        image: 'avatar_autori/giuseppe_parini.png',
        description: 'L’autore del Giorno, che criticò la nobiltà pigra del suo tempo.',
        schedaHTML: `<p class="scheda-intro">L'autore del Giorno, che con ironia tagliente e impegno civile ha criticato la nobiltà pigra del suo tempo, cercando di educare la società ai valori della ragione e del bene comune.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ 0</strong> &rarr; RESTA QUASI SEMPRE A MILANO, LA SUA CITTÀ.</li>
            <li><strong>🏛 POLITICO 🏟 +10</strong> &rarr; IMPEGNATO NELLE RIFORME DELLA SCUOLA E DELLO STATO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETA E IMPORTANTE INSEGNANTE.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; USA UNO STILE ELEGANTE BASATO SUI MODELLI ANTICHI.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VIVE IMMERSO NELLA VITA CULTURALE MILANESE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; CRITICA DURAMENTE I NOBILI PIÙ POTENTI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; DELUSO DAI CAMBIAMENTI VIOLENTI DELLA STORIA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; UNISCE POESIA E IMPEGNO CIVILE PER CAMBIARE LA SOCIETÀ.</li>
        </ul>`
    },
    { 
        id: 'carlo-goldoni', 
        name: 'Carlo Goldoni', 
        role: 'Il Riformatore del Teatro', 
        points: 20, 
        image: 'avatar_autori/carlo_goldoni.png',
        description: 'L’autore che tolse le maschere agli attori e raccontò la vita vera.',
        schedaHTML: `<p class="scheda-intro">Il genio che ha strappato le maschere alla Commedia dell'Arte per raccontare la vita operosa e verace della borghesia veneziana, creando un teatro moderno fatto di caratteri reali e umanità.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; GIRA L’ITALIA E PASSA GLI ULTIMI ANNI A PARIGI.</li>
            <li><strong>🏛 POLITICO 🏟 +0</strong> &rarr; SI OCCUPA SOLO DI TEATRO E SPETTACOLO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCRIVE CENTINAIA DI COMMEDIE IN ITALIANO E VENEZIANO.</li>
            <li><strong>📚 CLASSICO 🏺 +0</strong> &rarr; SI ISPIRA AL “MONDO” E AL “TEATRO” PIÙ CHE AI LIBRI.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; AMA LA CONFUSIONE E LA VITA DEI TEATRI.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; LE SUE RIFORME SCATENANO MOLTE POLEMICHE TRA I TRADIZIONALISTI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; LE SUE STORIE SONO PIENE DI OTTIMISMO E BUON SENSO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL TEATRO MODERNO BASATO SUI CARATTERI REALI.</li>
        </ul>`
    },
    {
        id: 'commedia-arte',
        name: 'Commedia dell\'Arte',
        role: 'Il Teatro delle Maschere',
        points: 15,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'La forma di teatro basata sull\'improvvisazione e sulle maschere.',
        schedaHTML: `<p class="scheda-intro">La Commedia dell'Arte nasce nelle piazze italiane del Cinquecento. Non ci sono copioni scritti, ma "canovacci" su cui attori professionisti improvvisano. Nascono così le maschere che tutti conosciamo: Arlecchino servo imbroglione, Pantalone vecchio avaro, Balanzone dottore pedante. È il trionfo del corpo, della fisicità, della battuta pronta. Per due secoli dominerà l'Europa, prima che Goldoni le tolga la maschera per mostrare il vero volto della società.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +15</strong> &rarr; COMPAGNIE GIROVAGHE CHE PORTANO IL TEATRO IN TUTTA EUROPA.</li>
            <li><strong>🏛 POLITICO 🏟 -5</strong> &rarr; SPESSO CENSURATI O CONTROLLATI DAL POTERE PER IRRIVERENZA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; ATTORI, ACROBATI, MUSICISTI E IMPROVVISATORI.</li>
            <li><strong>📚 CLASSICO 🏺 -10</strong> &rarr; RIFIUTANO LE REGOLE DEL TEATRO COLTO.</li>
            <li><strong>🪫 SOLITARIO 🏡 -10</strong> &rarr; LAVORANO SEMPRE IN GRUPPO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; PRIMI A FAR RECITARE LE DONNE, SPESSO CONSIDERATI IMMORALI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; IL FINE È LA RISATA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; INVENTANO IL PROFESSIONISMO TEATRALE.</li>
        </ul>`
    },
    { 
        id: 'torquato-tasso', 
        name: 'Torquato Tasso', 
        role: 'Il Poeta Inquieto', 
        points: 15, 
        image: 'avatar_autori/torquato_tasso.png',
        description: 'L’autore della Gerusalemme Liberata, tra battaglie e tormenti religiosi.',
        schedaHTML: `<p class="scheda-intro">Il poeta malinconico che ha vissuto in bilico tra la gloria delle corti e il tormento dell'anima, cercando di conciliare l'eroismo cavalleresco con la profonda inquietudine religiosa del suo tempo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGI SENZA PACE TRA LE CORTI DI TUTTA ITALIA.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; POETA DI CORTE, MA SEMPRE IN LOTTA CON I POTENTI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; SCRIVE POEMI, POESIE E DIALOGHI FILOSOFICI.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; CERCA DI UNIRE I MODELLI ANTICHI CON LA FEDE CRISTIANA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; PASSA MOLTI ANNI CHIUSO IN UN OSPEDALE PER MALATI DI MENTE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; LA SUA VITA INQUIETA DIVENTA UN MITO PER I ROMANTICI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; LA SUA VISIONE DEL MONDO È PIENA DI DOLORE E TRISTEZZA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; PORTA NELLA POESIA UNA NUOVA SENSIBILITÀ DRAMMATICA.</li>
        </ul>`
    },
    {
        id: 'cecco-angiolieri',
        name: 'Cecco Angiolieri',
        role: 'Il Poeta Maledetto',
        points: 15,
        image: 'avatar_autori/cecco_angiolieri.png',
        description: 'Il poeta del "S\'i\' fosse foco", ribelle e dissacrante.',
        schedaHTML: `<p class="scheda-intro">Il poeta ribelle e 'maledetto' del Duecento, che con i suoi sonetti arrabbiati e dissacranti ha celebrato il gioco, le taverne e l'odio verso l'ipocrisia del suo tempo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; Frequenti spostamenti, spesso per sfuggire a debiti o problemi.</li>
            <li><strong>🏛 POLITICO 🏟 -5</strong> &rarr; Atteggiamento anti-istituzionale e ribelle.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; Maestro della poesia comico-realistica.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; Conosce bene la tradizione ma se ne fa beffe.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; Amante delle taverne e della vita sregolata.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; Desidera la morte del padre e l'incendio del mondo.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; Rabbia e risentimento verso la propria condizione.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; Introduce un registro pop e arrabbiato nella lirica.</li>
        </ul>`
    },
    {
        id: 'iacopone-todi',
        name: 'Iacopone da Todi',
        role: 'Il Poeta del Fango e del Cielo',
        points: 15,
        image: 'avatar_autori/iacopone_todi.png',
        description: 'L’autore del "Pianto della Madonna", tra misticismo e ribellione.',
        schedaHTML: `<p class="scheda-intro">Il cavaliere che si fece 'matto per Cristo' dopo un dolore immenso, portando nella poesia la cruda realtà del corpo e del fango intrecciata con la ricerca disperata dell'amore divino.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; Predicazione e vagabondaggio spirituale.</li>
            <li><strong>🏛 POLITICO 🏟 +10</strong> &rarr; Feroce oppositore di Bonifacio VIII per motivi religiosi.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; Le laudi incorporano elementi teatrali e popolari.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; Conoscenza della Bibbia e della cultura giuridica.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; Vissuto in povertà estrema e solitudine ascetica.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; I suoi attacchi al Papa lo portarono alla prigionia.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; Visione dispregiativa del corpo e del mondo materiale.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; Crea uno stile espressionistico e crudo assolutamente unico.</li>
        </ul>`
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
        schedaHTML: `<p class="scheda-intro">Il gigante del Romanticismo francese, autore di opere monumentali che hanno dato voce agli oppressi e celebrato la forza indomabile dello spirito umano contro l'ingiustizia.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIVE IN ESILIO E VIAGGIA TRA FRANCIA E ISOLE DEL CANALE DOPO CONTRASTI POLITICI.</li>
            <li><strong>🏛 POLITICO 🏟 +10</strong> &rarr; IMPEGNATO NELLA POLITICA FRANCESE E NELLA DIFESA DEI DIRITTI CIVILI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; POETA, ROMANZIERE E DRAMMATURGO.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; UTILIZZA GRANDI MODELLI STORICI E MITICI.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; L’ESILIO LO PORTA A LUNGHI PERIODI DI RIFLESSIONE SOLITARIA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; LE SUE OPERE E LE SUE IDEE SPESSO CONTRO IL POTERE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; DESCRIVE LE SOFFERENZE DEGLI ULTIMI E LA DUREZZA DELLA SOCIETÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; GUIDA IL ROMANTICISMO FRANCESE VERSO NUOVE FORME ESPRESSIVE.</li>
        </ul>`
    },
    {
        id: 'gabriel-garcia-marquez',
        name: 'G. García Márquez',
        role: 'Realismo Magico',
        points: 30,
        image: 'avatar_autori/gabriel_garcia_marquez.png',
        description: 'L’autore di Cent’anni di solitudine, dove la magia incontra la realtà.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il tessitore del 'realismo magico' che ha trasformato la sua Colombia in un mito universale, raccontando la solitudine e le passioni di intere generazioni in una prosa incantata e senza tempo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGI E VIVE TRA COLOMBIA, MESSICO, EUROPA E CUBA.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; AMICO DI LEADER POLITICI E IMPEGNATO SOCIALMENTE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; GIORNALISTA E SCRITTORE DI FAMA MONDIALE.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; CREA UN NUOVO CANONE LETTERARIO SUDAMERICANO.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; IL TEMA DELLA SOLITUDINE È CENTRALE NELLA SUA OPERA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; RISPETTATO GLOBALMENTE COME UN MAESTRO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; VEDE IL DESTINO COME UN CICLO CHE SPESSO SI RIPETE.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; PRINCIPALE ESPONENTE DEL REALISMO MAGICO.</li>
        </ul>`
    },
    {
        id: 'edgar-allan-poe',
        name: 'Edgar Allan Poe',
        role: 'Maestro del Brivido',
        points: 30,
        image: 'avatar_autori/edgar_allan_poe.png',
        description: 'L’inventore del racconto poliziesco e maestro del genere horror.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il maestro del brivido e del mistero, che ha esplorato gli abissi più oscuri dell'animo umano, inventando il genere poliziesco e dando forma ai nostri incubi più profondi.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; SI SPOSTA TRA DIVERSE CITTÀ AMERICANE IN CERCA DI FORTUNA.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; NON SI INTERESSA ALLA VITA POLITICA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETA, CRITICO E SCRITTORE DI RACCONTI.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA ALLA TRADIZIONE GOTICA EUROPEA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -10</strong> &rarr; VISSUTO IN POVERTÀ E SPESSO ISOLATO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; VITA TORMENTATA E POLEMICHE CON I CONTEMPORANEI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -15</strong> &rarr; LA SUA OPERA È IMMERSA NELL’OSCURITÀ E NELL’ANGOSCIA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; INVENTA IL GENERE DETECTIVE E MODERNA L’HORROR.</li>
        </ul>`
    },
    {
        id: 'fedor-dostoevskij',
        name: 'Fëdor Dostoevskij',
        role: 'L’Abisso dell’Anima',
        points: 25,
        image: 'avatar_autori/fedor_dostoevskij.png',
        description: 'L’autore di Delitto e castigo, che esplorò i tormenti della coscienza.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">L'esploratore delle 'memorie del sottosuolo', che ha messo a nudo i conflitti morali e le inquietudini più estreme dell'uomo, cercando la luce della fede nel cuore delle tenebre.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA IN EUROPA, MA SOPRATTUTTO L’ESILIO IN SIBERIA.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; IDEE CHE CAMBIANO NEL TEMPO, SEMPRE PROFONDO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; ROMANZIERE E FILOSOFO DELL'ESISTENZA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI CONFRONTA CON I GRANDI TEMI DELLA MORALE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; LA SOFFERENZA LO PORTA A UNA CHIUSURA INTERIORE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; CONDANNATO A MORTE, POI GRAZIATO, VITA AL LIMITE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; VEDE IL PECCATO E IL DOLORE COME PARTE DELL'UOMO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL ROMANZO PSICOLOGICO MODERNO.</li>
        </ul>`
    },
    {
        id: 'lev-tolstoj',
        name: 'Lev Tolstoj',
        role: 'Guerra e Pace',
        points: 25,
        image: 'avatar_autori/lev_tolstoj.png',
        description: 'Il grande narratore della storia e dell’animo russo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il cronista epico dell'anima russa e della storia universale, che ha saputo intrecciare i grandi eventi del mondo con la ricerca incessante di una verità morale e spirituale.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; VIAGGIA IN EUROPA MA È LEGATISSIMO ALLA SUA TERRA.</li>
            <li><strong>🏛 POLITICO 🏟 +10</strong> &rarr; LE SUE IDEE SULLA NON-VIOLENZA ISPIRANO GANDHI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; SCRITTORE, FILOSOFO E RIFORMATORE SOCIALE.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; MODELLO DI RIFERIMENTO PER IL REALISMO MONDIALE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; RICERCA UNA VITA SEMPLICE E RURALE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; SCOMUNICATO DALLA CHIESA ORTODOSSA.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; VISIONE DRAMMATICA DELLA STORIA E DEL DESTINO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; PORTA IL REALISMO A LIVELLI DI DETTAGLIO MAI VISTI.</li>
        </ul>`
    },
    {
        id: 'george-orwell',
        name: 'George Orwell',
        role: '1984 e il Grande Fratello',
        points: 25,
        image: 'avatar_autori/george_orwell.png',
        description: 'Il visionario che mise in guardia contro i totalitarismi.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">L'occhio vigile della coscienza civile e politica, che ha messo in guardia l'umanità contro i pericoli del totalitarismo e della manipolazione del linguaggio in visioni profetiche e agghiaccianti.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIVE IN INDIA, BIRMANIA, SPAGNA E FRANCIA.</li>
            <li><strong>🏛 POLITICO 🏟 +15</strong> &rarr; TUTTA LA SUA OPERA È UNA CRITICA AL POTERE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SAGGISTA E ROMANZIERE POLITICO.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; SI CONCENTRA SUL PRESENTE E SUL FUTURO DISTOPICO.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; ISOLAMENTO PER SCRIVERE IL SUO ULTIMO CAPOLAVORO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; I SUOI LIBRI SONO STATI SPESSO CENSURATI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; VISIONE CUPA DEL FUTURO DELL'UMANITÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA UN LINGUAGGIO PER DESCRIVERE IL CONTROLLO SOCIALE.</li>
        </ul>`
    },
    {
        id: 'ernest-hemingway',
        name: 'Ernest Hemingway',
        role: 'Il Vecchio e il Mare',
        points: 25,
        image: 'avatar_autori/ernest_hemingway.png',
        description: 'L’autore della Lost Generation, amante dell’avventura e della sintesi.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">L'uomo d'azione e lo scrittore del silenzio, che con una prosa essenziale e scolpita ha celebrato il coraggio di fronte alla sconfitta e la ricerca di un senso nel caos del mondo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +15</strong> &rarr; VIAGGIA TRA EUROPA, AFRICA, CUBA E STATI UNITI.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; CORRISPONDENTE DI GUERRA IN MOLTI CONFLITTI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; GIORNALISTA E ROMANZIERE.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; STILE ESSENZIALE CHE ROMPE CON IL PASSATO.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; RICERCA DI SFIDE INDIVIDUALI CONTRO LA NATURA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; VITA AVVENTUROSA E SPESSO AL CENTRO DELLA CRONACA.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; TEMI DELLA SCONFITTA E DEL CORAGGIO TRAGICO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CAMBIA PER SEMPRE LA PROSA INGLESE.</li>
        </ul>`
    },
    {
        id: 'charles-dickens',
        name: 'Charles Dickens',
        role: 'La Londra degli Ultimi',
        points: 25,
        image: 'avatar_autori/charles_dickens.png',
        description: 'Il grande narratore delle ingiustizie sociali dell’Inghilterra vittoriana.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il cuore palpitante della Londra vittoriana, che con i suoi indimenticabili personaggi ha denunciato le crudeltà sociali del suo tempo, offrendo speranza e dignità agli umili e agli indifesi.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; VIAGGIA IN AMERICA E EUROPA PER TOUR DI LETTURE.</li>
            <li><strong>🏛 POLITICO 🏟 +10</strong> &rarr; DENUNCIA COSTANTE DELLE CONDIZIONI DEI POVERI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; ROMANZIERE E GIORNALISTA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; CREA PERSONAGGI CHE DIVENTANO ARCHETIPI.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VIVE CIRCONDATO DAL SUCCESSO E DA UNA GRANDE FAMIGLIA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; CELEBRATO COME UN EROE NAZIONALE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; DESCRIVE L'OSCURITÀ DELLE CITTÀ INDUSTRIALI.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; PADRE DEL ROMANZO SOCIALE MODERNO.</li>
        </ul>`
    },
    {
        id: 'herman-melville',
        name: 'Herman Melville',
        role: 'Moby Dick',
        points: 25,
        image: 'avatar_autori/herman_melville.png',
        description: 'L’autore della balena bianca, il viaggio estremo tra mare e ossessione.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">L'esploratore del mare e dell'ignoto, che ha trasformato la caccia alla balena bianca in un'epopea filosofica sulla lotta eterna dell'uomo contro il destino e il male assoluto.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +15</strong> &rarr; NAVIGA PER ANNI NEI MARI DEL SUD.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; NON PARTECIPA ALLA VITA POLITICA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCRITTORE DI MARE E POETA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI CONFRONTA CON MITI E TESTI BIBLICI.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; DIMENTICATO DALLA CRONACA NEGLI ULTIMI ANNI.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; RIVALUTATO COME GENIO SOLO DOPO LA MORTE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; LOTTA IMPOSSIBILE CONTRO LE FORZE DELLA NATURA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; UNISCE AVVENTURA E METAFISICA PROFONDA.</li>
        </ul>`
    },
    {
        id: 'oscar-wilde',
        name: 'Oscar Wilde',
        role: 'L’Esteta Ribelle',
        points: 25,
        image: 'avatar_autori/oscar_wilde.png',
        description: 'L’autore de Il ritratto di Dorian Gray e maestro dell’aforisma.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">L'esteta brillante e lo spirito ribelle che ha fatto dell'ironia un'arma e della bellezza una religione, sfidando l'ipocrisia della società con aforismi fulminanti e un destino tragico.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGI IN EUROPA E TOUR DI CONFERENZE IN AMERICA.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; RIFIUTA LA POLITICA TRADIZIONALE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; POETA, DRAMMATURGO E SAGGISTA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA AL BELLEZZA DELL’ANTICA GRECIA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -10</strong> &rarr; IL CARCERE LO PORTA A UNA TRAGICA SOLITUDINE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; PROTAGONISTA DI UNO SCANDALO SOCIALE E GIUDIZIARIO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; IRONIA CHE NASCONDE UNA TRAGICA VISIONE DELLA VITA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; SIMBOLO DELL'ESTETISMO E DELLA LIBERTÀ INDIVIDUALE.</li>
        </ul>`
    },
    {
        id: 'emile-zola',
        name: 'Émile Zola',
        role: 'Il Naturalismo',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'Il teorico del naturalismo e l’autore del celebre J’Accuse.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il padre del Naturalismo, che con occhio implacabile ha documentato la realtà sociale della Francia di fine Ottocento, denunciando le ingiustizie e i vizi del potere in un vasto affresco umano.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; ESILIATO IN INGHILTERRA PER LE SUE IDEE.</li>
            <li><strong>🏛 POLITICO 🏟 +15</strong> &rarr; DIFENSORE DELLA VERITÀ E DEI DIRITTI CIVILI (AFFARE DREYFUS).</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; ROMANZIERE, CRITICO E GIORNALISTA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; APPLICA IL METODO SCIENTIFICO ALLA LETTERATURA.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VITA ATTIVA NEL DIBATTITO PUBBLICO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +10</strong> &rarr; I SUOI ROMANZI CRUDI SCIOCCANO LA SOCIETÀ.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; ANALISI SPIETATA DEI DETERMINISMI SOCIALI.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL ROMANZO SPERIMENTALE.</li>
        </ul>`
    },
    {
        id: 'franz-kafka',
        name: 'Franz Kafka',
        role: 'Il Labirinto dell’Inquietudine',
        points: 20,
        image: 'avatar_autori/franz_kafka.png',
        description: 'L’autore de La metamorfosi, che raccontò l’alienazione moderna.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">L'interprete dell'angoscia moderna e dell'assurdo, che ha descritto mondi labirintici e burocrazie spietate in cui l'uomo si ritrova smarrito, vittima di colpe misteriose e incomprensibili.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; SOGGIORNI IN DIVERSE CITTÀ EUROPEE PER MOTIVI DI SALUTE.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; ESTRANEO ALLA POLITICA MILITANTE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCRITTORE DI RACCONTI E ROMANZI INCOMPIUTI.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; CREA UN UNIVERSO COMPLETAMENTE NUOVO E SURREALE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -10</strong> &rarr; VITA INTERIORE TORTUOSA E ISOLATA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; PUBBLICATO QUASI TUTTO POSTUMO CONTRO LA SUA VOLONTÀ.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -20</strong> &rarr; MASSIMA ESPRESSIONE DELL'ASSURDO E DELL'ANGOSCIA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL CONCETTO DI "KAFKAIANO".</li>
        </ul>`
    },
    {
        id: 'virginia-woolf',
        name: 'Virginia Woolf',
        role: 'Il Flusso di Coscienza',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'La pioniera della modernità e dell’analisi interiore femminile.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">La pioniera del 'flusso di coscienza', che ha esplorato l'interiorità più profonda delle donne e degli uomini, catturando l'essenza fugace del tempo e della percezione in una prosa lirica e innovativa.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGI IN EUROPA E SPOSTAMENTI NELL'INGHILTERRA DEL GRUPPO DI BLOOMSBURY.</li>
            <li><strong>🏛 POLITICO 🏟 +10</strong> &rarr; ATTENTA ALLE QUESTIONI FEMMINISTE E SOCIALI DEL SUO TEMPO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; ROMANZIERA, SAGGISTA E CRITICA LETTERARIA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI CONFRONTA CON LA TRADIZIONE PER SUPERARLA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; RICERCA DI "UNA STANZA TUTTA PER SÉ".</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; RICEVE CRITICHE PER IL SUO STILE SPERIMENTALE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; LOTTA COSTANTE CONTRO IL DOLORE MENTALE.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; MAESTRA DEL FLUSSO DI COSCIENZA.</li>
        </ul>`
    },
    {
        id: 'james-joyce',
        name: 'James Joyce',
        role: 'L’Ulisse Moderno',
        points: 20,
        image: 'avatar_autori/james_joyce.png',
        description: 'L’autore di Ulisse, che rivoluzionò il linguaggio del romanzo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">L'architetto del linguaggio moderno, che con il suo 'Ulisse' ha rivoluzionato il romanzo del Novecento, racchiudendo l'intera esperienza umana nel giro di una singola, indimenticabile giornata.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIVE IN ESILIO VOLONTARIO A TRIESTE, PARIGI E ZURIGO.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; DISTANTE DALLA POLITICA ATTIVA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETA E ROMANZIERE SPERIMENTALE.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; RISCRIVE IL MITO DI OMERO NELLA MODERNITÀ.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; DEDIZIONE TOTALE ALLA SCRITTURA COMPLESSA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; IL SUO ULISSE VIENE CENSURATO PER ANNI PER OSCENITÀ.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; IRONIA E COMPLESSITÀ CHE SUPERANO IL PESSIMISMO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +20</strong> &rarr; PORTA LA SPERIMENTAZIONE LINGUISTICA AL LIMITE.</li>
        </ul>`
    },
    {
        id: 'mark-twain',
        name: 'Mark Twain',
        role: 'L’Anima dell’America',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'L’autore di Tom Sawyer e Huckleberry Finn, maestro dell’umorismo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">La voce autentica e ironica dell'America, che ha raccontato con umorismo e acume la libertà del fiume Mississippi e le contraddizioni della società umana, diventando il padre della letteratura moderna del suo paese.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA PER TUTTO IL MONDO COME CONFERENZIERE.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; CRITICO DELL'IMPERIALISMO E DEL RAZZISMO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; GIORNALISTA, SCRITTORE E INVENTORE.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; CREA UNA LETTERATURA AMERICANA AUTENTICA.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; FIGURA PUBBLICA MOLTO AMATA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; I SUOI LIBRI SPESSO DISCUSSI PER IL LINGUAGGIO DIRETTO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; UMORISMO CHE NASCONDE UNA VISIONE CINICA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; PADRE DELLA LETTERATURA AMERICANA MODERNA.</li>
        </ul>`
    },
    {
        id: 'anton-cechov',
        name: 'Anton Čechov',
        role: 'Maestro del Sottomono',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'Il medico scrittore che rivoluzionò il racconto e il dramma.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il medico dell'anima che con infinita delicatezza ha ritratto le speranze e le delusioni della vita quotidiana, insegnando che la vera grandezza si nasconde nei piccoli gesti e nei silenzi del cuore.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA FINO ALL’ISOLA DI SAKHALIN PER STUDIARE I PRIGIONIERI.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; IMPEGNO SOCIALE COME MEDICO GRATUITO PER I POVERI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCRITTORE DI RACCONTI E DRAMMATURGO.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA ALLA REALTÀ QUOTIDIANA SENZA EROISMI.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; MALATTIA CHE LO PORTA A PERIODI DI RITIRO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; RISPETTATO PER LA SUA UMILTÀ E PROFONDITÀ.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; TRISTEZZA PER L'IMPOSSIBILITÀ DI COMUNICARE.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL TEATRO DELL'ATMOSFERA.</li>
        </ul>`
    },
    {
        id: 'henrik-ibsen',
        name: 'Henrik Ibsen',
        role: 'Il Dramma Borghese',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'L’autore di Casa di bambola, che scosse le fondamenta della famiglia borghese.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il padre del dramma moderno, che ha infranto il silenzio delle stanze borghesi per gridare la verità, indagando con forza le ferite della società e la ricerca tormentata della libertà individuale.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIVE MOLTI ANNI IN ITALIA E GERMANIA IN ESILIO VOLONTARIO.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; LE SUE OPERE SONO UN ATTO POLITICO CONTRO L'IPOCRISIA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; DRAMMATURGO e POETA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA AL RIGORE TEATRALE CON TEMI MODERNI.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; CARATTERE DIFFICILE E SOLITARIO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; LE SUE OPERE SCATENANO DISORDINI E CENSURE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; SCOPRE I SEGRETI OSCURI DI OGNI FAMIGLIA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; PADRE DEL DRAMMA MODERNO BORGUESE.</li>
        </ul>`
    },
    {
        id: 'rainer-maria-rilke',
        name: 'Rainer Maria Rilke',
        role: 'Il Poeta degli Angeli',
        points: 20,
        image: 'avatar_autori/avatar_placeholder.png',
        description: 'Il grande lirico delle Elegie duinesi e dei Sonetti a Orfeo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Il poeta delle 'cose' e dell'invisibile, che ha cercato il divino nella solitudine e nella bellezza, trasformando la parola in una preghiera laica che interroga il mistero dell'esistenza e dell'angelo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA COSTANTEMENTE TRA RUSSIA, FRANCIA, ITALIA E SVIZZERA.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; DISTANTE DALLA VITA PUBBLICA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETA E SCRITTORE DI PROSA LIRICA.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; SI ISPIRA ALL'ARTE E ALLA SCULTURA (RODIN).</li>
            <li><strong>🪫 SOLITARIO 🏡 -10</strong> &rarr; RICERCA DI ISOLAMENTO TOTALE PER LA SCRITTURA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; CELEBRATO COME IL MASSIMO POETA LIRICO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; SENSO DELLA MORTE E DELLA TRANSITORIETÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; RENDE LA POESIA UNO STRUMENTO DI CONOSCENZA ESTREMA.</li>
        </ul>`
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
