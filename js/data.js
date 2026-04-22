// Dati Mockati - Fantaletteratura

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POOL AUTORI — CLASSI TERZE (attivo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS = [
    { 
        id: 'a1',  name: 'Ugo Foscolo', cost: 4500, points: 30, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Foscolo.png',
        schedaHTML: `<p class="scheda-intro">Ugo Foscolo, sicuramente un viaggiatore che passa buona parte della vita in esilio tra Inghilterra, Svizzera e Italia. Appoggia Napoleone ma poi viene illuso dal Trattato di Campoformio con cui cadono le speranze di una liberazione del Veneto dagli Austriaci. Fortemente neoclassico ma di spirito ribelle, parla di dolore, morte e lontananza nelle sue poesie e ci regala pagine d'amore e sofferenza nel suo romanzo epistolare <em>Le ultime lettere di Jacopo Ortis</em> che lo introduce nel Preromanticismo.</p>
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
        schedaHTML: `<p class="scheda-intro">Giacomo Leopardi è uno degli autori più proficui della letteratura italiana che trae ispirazione dai classici latini e greci, dai trattati filosofici e dai numerosi libri della sua sconfinata biblioteca. Ha un modo di scrivere poesia del tutto innovativo con il famoso verso libero. Tra tutte le sue poesie è impossibile dimenticare <em>L'Infinito</em> che richiama tutte le sue idee più romantiche in poche semplici parole: la vita è un cammino difficile ma possiamo farcela insieme se ci prendiamo cura gli uni degli altri. Moderno, cosmopolita ed ecologista?</p>
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
        schedaHTML: `<p class="scheda-intro">Alessandro Manzoni è il Vasco Rossi di Milano. Patriottico e cosmopolita, amico di grandi scrittori in Europa. Innovatore linguistico che decide di scrivere più in fiorentino che in milanese. Pagine e pagine in prosa e poesia, drammi e commedie teatrali a tratti complicatissime da mettere in scena. Quarantotto capitoli di <em>Promessi sposi</em> in cui anche le dita di Don Abbondio hanno un preciso significato nella storia quando allargano il colletto del curato poco coraggioso. Significati nascosti e descrizioni particolareggiate che portano il lettore dentro il «sugo» della storia!</p>
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
        schedaHTML: `<p class="scheda-intro">Giosuè Carducci è il professore-poeta che avrebbe voluto vivere nell'antica Roma. Prima è il poeta maledetto che va contro la Chiesa e celebra gli dei pagani, poi diventa senatore del regno e primo italiano a vincere il Nobel per la letteratura nel 1906. Le sue <em>Odi Barbare</em> sono costruite come i versi di Orazio e Virgilio, scritte però in italiano: un'impresa tecnica straordinaria. Patriota ardente, polemista feroce, insegnante severo che formò generazioni di studenti, ha cantato l'Italia unita con la passione di un uomo che crede in tutto ciò che fa.</p>
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
        schedaHTML: `<p class="scheda-intro">Giovanni Verga è il narratore che decide di sparire. Nato in Sicilia e trasferitosi dapprima a Firenze poi a Milano, frequenta i salotti e scrive romanzi alla moda — poi cambia tutto. Torna all'isola, abbassa lo sguardo verso i pescatori di Aci Trezza e i braccianti della campagna catanese e inventa il Verismo: storie raccontate con le parole dei protagonisti, senza giudizi, come se la realtà si raccontasse da sola. <em>I Malavoglia</em> e <em>Mastro don Gesualdo</em> sono i capolavori di questo metodo rivoluzionario. Verga si nasconde dietro le sue storie come un regista dietro la macchina da presa.</p>
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
        schedaHTML: `<p class="scheda-intro">Giovanni Pascoli è il poeta del nido. Una tragedia lo segna per sempre: a soli dodici anni, il padre viene ucciso a fucilate sul calesse di ritorno dalla fiera. Non si saprà mai chi fu il colpevole. Da quel momento Pascoli costruisce il «fanciullino» — quel bambino interiore che ogni poeta porta dentro di sé e che sa scorgere il meraviglioso nelle piccole cose: un nido, un tuono, una rondine. Il suo linguaggio è ricco di onomatopee e suoni della natura: le poesie sembrano musica prima ancora di essere parole.</p>
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
        schedaHTML: `<p class="scheda-intro">Gabriele D'Annunzio non ha scelto di essere un personaggio storico: lo è nato. Costruisce tutto della propria vita come fosse un romanzo: gli amori con attrici celebri, i debiti stratosferici, l'occupazione di Fiume, il Vittoriale sulle rive del Garda dove vive come un re decaduto. <em>Il piacere</em>, <em>La pioggia nel pineto</em>, le <em>Laudi</em> — tutto scritto con una lingua lussuosa e musicale che suona anche quando non la capisci. Estetismo puro: il bello sopra tutto. Provocatore a vita: impossibile ignorarlo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VITA MOLTO COSMOPOLITA TRA ITALIA, FRANCIA E ALTRI PAESI. DA PESCARA A PARIGI, E POI SUL GARDA.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; ATTIVO POLITICAMENTE, INFLUENZA POLITICA E CULTURALE. IMPRESA DI FIUME E PROPAGANDA.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, NARRATIVA, TEATRO, GIORNALISMO.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; INFLUENZE CLASSICHE VISIBILI NELLA RETORICA E NELLO STILE. IMITA GLI ANTICHI IN MODO RAFFINATO.</li>
            <li><strong>🔋 SOLITARIO 🏡 0</strong> &rarr; VITA SOCIALE INTENSA, NON ISOLATO.</li>
            <li><strong>🤬 SCANDALOSO 🧨 -10</strong> &rarr; SCANDALI, POLEMICHE, VITA PUBBLICA CONTROVERSA. AMORI, LUSSO E SCANDALI INFINITI.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; VISIONE ESTETICA PIÙ EDONISTICA QUE CUPA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; SPERIMENTAZIONE STILISTICA E LINGUISTICA. REINVENTA LA LINGUA ITALIANA MODERNA.</li>
        </ul>`
    },
    { id: 'a8',  name: 'Luigi Pirandello', cost: 4500, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Pirandello.png',
        schedaHTML: `<p class="scheda-intro">Luigi Pirandello fa una domanda semplice che nessuno riesce a rispondere: chi sei veramente? Nato in Sicilia, scrive romanzi, novelle e opere teatrali che mettono a nudo la distanza tra come ci vediamo noi stessi e come ci vedono gli altri. Il risultato è il teatro del paradosso: personaggi che cercano un autore, mariti che non sanno se la moglie è morta, persone che vogliono sapere «come la pensi». <em>Il fu Mattia Pascal</em> è il romanzo di un uomo che finge di morire per ricominciare — e scopre che ricominciare è impossibile. Nobel nel 1934. Ancora attualissimo.</p>
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
        schedaHTML: `<p class="scheda-intro">Filippo Tommaso Marinetti è nato in Egitto, ha vissuto a Parigi e ha deciso di distruggere tutto: i musei, i libri, le biblioteche, la sintassi, la punteggiatura. Il suo <em>Manifesto del Futurismo</em> del 1909 è il documento più provocatorio della letteratura italiana moderna: abolire l'aggettivo, bruciare i violini, celebrare le macchine, la velocità, la guerra. <em>Zang Tumb Tumb</em> è pura musica onomatopeica di battaglia. Il Futurismo nasce come rivolta assoluta contro la tradizione — e finisce abbracciando il fascismo. Un genio contraddittorio che ha cambiato per sempre i confini dell'arte.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI E TOURNÉE EUROPEE.</li>
            <li><strong>🏛️ POLITICO 🗳️ +10</strong> &rarr; FONDATORE DEL FUTURISMO, COINVOLTO POLITICAMENTE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; POESIA, MANIFESTI, TEATRO, NARRATIVA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; INTERESSE MARGINALE PER IL CLASSICO.</li>
            <li><strong>🔋 SOLITARIO 🏡 0</strong> &rarr; VITA SOCIALE ATTIVA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 -10</strong> &rarr; POLEMICHE E PROVOCAZIONI CONTINUE. DISTRUGGE MUSEI E REGOLE.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ 0</strong> &rarr; VISIONE OTTIMISTICA PER LA MODERNITÀ E LA TECNOLOGIA.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; RIVOLUZIONARIO LINGUISTICO E STILISTICO. INVENTORE DELLE PAROLE IN LIBERTÀ.</li>
        </ul>`
    },
    { id: 'a10', name: 'Giuseppe Ungaretti',          cost: 4000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Ungaretti.png',
        schedaHTML: `<p class="scheda-intro">Giuseppe Ungaretti nasce ad Alessandria d'Egitto, figlio di emigranti toscani, e vive la Grande Guerra nelle trincee del Carso come soldato semplice. Lì scrive su pezzi di carta i versi più essenziali della poesia italiana del Novecento. <em>M'illumino / d'immenso</em> — due parole che contengono tutto. La sua è una poesia purissima: elimina il superfluo, cerca la parola esatta, quella che pesa come una pietra e splende come un frammento di luce. L'<em>Allegria</em> è un diario di guerra scritto ai margini dell'abisso.</p>
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
        schedaHTML: `<p class="scheda-intro">Eugenio Montale è il poeta del grigio e del meraviglioso nascosto. Ligure di nascita, trova i suoi simboli nella costa aspra della Liguria: i limoni, le ossa di seppia, i muri screpolati. La vita, per lui, è spesso difficile e oscura — «il male di vivere» — ma ogni tanto qualcosa brilla: un'anguilla nel fango, un gesto di una donna amata. Premio Nobel nel 1975. Le sue poesie sono dense, difficili, ma quando le capisci ti cambiano. Tra le sue raccolte, <em>Ossi di seppia</em>, <em>Le Occasioni</em> e <em>La Bufera</em> sono tappe fondamentali della lirica moderna.</p>
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
        schedaHTML: `<p class="scheda-intro">Salvatore Quasimodo nasce in Sicilia, porta nel cuore l'isola calda e misteriosa, ma la sua poesia diventa voce civile dopo l'esperienza devastante della guerra. Prima fase: ermetismo puro, simboli densi, parole rare. <em>Ed è subito sera</em> — quattro parole, una vita. Seconda fase: dopo Auschwitz e le macerie, la poesia non può più guardare solo dentro se stessa. Quasimodo sceglie di urlare contro la guerra e l'ingiustizia. Premio Nobel nel 1959. Traduttore insuperabile dei lirici greci: in lui antichità e modernità si abbracciano.</p>
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
        schedaHTML: `<p class="scheda-intro">Italo Svevo è un uomo d'affari triestino che scrive romanzi nel cassetto. Nome vero: Ettore Schmitz. Lavora in banca, poi nella fabbrica di vernici di famiglia. Incontra James Joyce a Trieste — e tutto cambia. Joyce capisce che Svevo è un genio che nessuno ha ancora scoperto. Arriva <em>La coscienza di Zeno</em>: il romanzo di un fumatore che vuole smettere ma non ci riesce, trasformato in una straordinaria analisi psicologica dell'inetto moderno. Ironia, leggerezza, psicanalisi: la letteratura europea non è mai più stata la stessa.</p>
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
        schedaHTML: `<p class="scheda-intro">Italo Calvino è il giocatore serissimo. Nato a Cuba da genitori botanici, cresce in Liguria, partecipa alla Resistenza, lavora all'Einaudi. Ogni suo libro è un'avventura formale: i <em>Cosmicomics</em> raccontano la creazione del cosmo con ironia, <em>Le città invisibili</em> sono conversazioni tra Marco Polo e Kublai Khan, <em>Se una notte d'inverno un viaggiatore</em> è un romanzo che ti parla direttamente a te, lettore. Il suo stile è cristallino, la sua immaginazione infinita. Nelle <em>Lezioni americane</em> teorizza il futuro della letteratura come se fosse una scienza esatta dei sogni.</p>
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
        schedaHTML: `<p class="scheda-intro">Elsa Morante è la narratrice degli ultimi e dell'amore assoluto. Scrive <em>L'isola di Arturo</em> — l'estate dell'infanzia su un'isola magica — poi ti travolge con <em>La Storia</em>: Roma durante la Seconda Guerra Mondiale, una maestra sola con un bambino figlio di uno stupro, la guerra che distrugge tutto. Epica degli umili, lingua che sa essere magica e cruda insieme. Sposò Moravia ma fu autonoma e originale come pochi. Amò i gatti, i bambini, i disperati. La sua letteratura è una forma di amore totale per chi soffre.</p>
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
        schedaHTML: `<p class="scheda-intro">Primo Levi è il testimone che non doveva esistere. Chimico torinese, deportato ad Auschwitz nel 1944, sopravvive per una serie di circostanze fortuite. Torna, lavora alla sua fabbrica di vernici, e scrive. Con la precisione del chimico e la dolcezza del poeta racconta l'orrore del Lager in <em>Se questo è un uomo</em> — un libro necessario, onesto, impossibile da dimenticare. <em>Il sistema periodico</em> racconta la vita attraverso gli elementi chimici: è uno dei libri più belli mai scritti in italiano. La sua domanda fondamentale: cosa rimane dell'uomo dopo Auschwitz?</p>
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
        schedaHTML: `<p class="scheda-intro">Cesare Pavese è il poeta delle Langhe e della solitudine. Piemontese, traduttore straordinario di letteratura americana (Faulkner, Melville, Steinbeck), ha portato il romanzo americano in Italia. Nei suoi libri — <em>La luna e i falò</em>, <em>Paesi tuoi</em>, il diario <em>Il mestiere di vivere</em> — tornano sempre le stesse ossessioni: la terra, il mito, la donna inaccessibile, la morte. Si suicidò a 41 anni, lasciando un biglietto: «Perdono tutti e a tutti chiedo perdono. Va bene? Non fate troppi pettegolezzi.»</p>
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
        schedaHTML: `<p class="scheda-intro">Alberto Moravia (vero cognome Pincherle) è il narratore del corpo e dell'alienazione. Romano, figlio di architetto, a sedici anni si ammala di tubercolosi e passa tre anni immobile a letto — in quel periodo legge tutto. <em>Gli indifferenti</em> esce nel 1929 quando ha solo 22 anni ed è già un capolavoro: la storia di una famiglia borghese romana incapace di sentire, di agire, di amare. Da lì una lunga carriera a esplorare sessualità, solitudine e potere con una prosa diretta e asciutta che anticipa il minimalismo contemporaneo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈️ +10</strong> &rarr; VIAGGI FREQUENTI IN EUROPA E AMERICA. CONOSCE IL MONDO E LO RACCONTA.</li>
            <li><strong>🏛️ POLITICO 🏟️ +5</strong> &rarr; NON ATTIVO POLITICAMENTE. CRITICO VERSO LA SOCIETÀ BORGHESE.</li>
            <li><strong>✍️ POLIEDRICO ✒️ +10</strong> &rarr; ROMANZI, SAGGI, REPORTAGE GIORNALISTICO, CINEMA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; RIFERIMENTI CLASSICI LIMITATI.</li>
            <li><strong>🔋 SOLITARIO 🏡 -5</strong> &rarr; VITA RIFLESSIVA E RISERVATA.</li>
            <li><strong>🤬 SCANDALOSO 🧨 0</strong> &rarr; NESSUNO SCANDALO SIGNIFICATIVO.</li>
            <li><strong>🌀 PESSIMISTA 🌫️ -5</strong> &rarr; VISIONE CRITICA E SPESSO CUPA DELLA SOCIETÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡️ +10</strong> &rarr; ANALISI PSICOLOGICA E SOCIALE INNOVATIVA.</li>
        </ul>`
    },
    { id: 'a19', name: 'Beppe Fenoglio',              cost: 3000, points: 20, isPointsRevealed: false, isSchedaRevealed: false, image: 'avatar_autori/Fenoglio.png',
        schedaHTML: `<p class="scheda-intro">Beppe Fenoglio non ha avuto il tempo che meritava: muore a 40 anni nel 1963, lasciando alcune cose incompiute. Ma quello che ha scritto basta. Partigiano nelle Langhe durante la Resistenza, ha trasformato quell'esperienza in epica: <em>Una questione privata</em> (la storia d'amore di Milton il partigiano) e <em>Il partigiano Johnny</em>, scritto in una prosa meravigliosa mescolata di italiano e inglese. Le sue colline sono al tempo stesso reali e mitiche. Calvino lo definì il più grande narratore italiano del Novecento.</p>
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
        schedaHTML: `<p class="scheda-intro">Pier Paolo Pasolini non ha mai smesso di litigare con l'Italia intera. Friulano di nascita, romano d'adozione, poeta in dialetto e in italiano, regista geniale, romanziere, polemista televisivo. <em>Ragazzi di vita</em> e <em>Una vita violenta</em> raccontano le borgate romane con occhi da antropologo e cuore da poeta. I suoi film — <em>Il Vangelo secondo Matteo</em>, <em>Accattone</em> — sono visioni potenti e sconvolgenti. Omosessuale dichiarato, cattolico ateo, comunista eretico: tutto in lui è contraddizione. Assassinato all'Idroscalo di Ostia nel 1975. Un'icona senza pace.</p>
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
        schedaHTML: `<p class="scheda-intro">Natalia Ginzburg ha scritto i libri più importanti della sua vita con parole semplici, quasi banali. <em>Lessico famigliare</em> recupera le espressioni e i tic linguistici della sua famiglia torinese ebrea — e ne fa letteratura pura. Suo marito Leone Ginzburg, antifascista militante, muore in carcere durante la guerra. Lei rimane sola con i figli e continua a scrivere. Poi si risposa, diventa deputata, traduce Proust. Una vita come un romanzo, raccontata con la lucidità di chi sa che la vita vera è sempre nei dettagli.</p>
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
        schedaHTML: `<p class="scheda-intro">Leonardo Sciascia è il siciliano che ha usato il romanzo giallo come bisturi per operare alla sicilianità e all'Italia intera. <em>Il giorno della civetta</em> (1961) è il primo romanzo italiano a prendere la mafia sul serio come sistema di potere, non come folklore. I suoi sono romanzi-inchiesta in cui la verità non emerge mai del tutto, perché in Sicilia — e in Italia — i poteri si proteggono a vicenda. Pessimista lucido, illuminista senza illusioni, ha creduto nella forza della ragione sapendo che la ragione spesso perde.</p>
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
        schedaHTML: `<p class="scheda-intro">Nata a Milano nel 1931, comincia a scrivere poesie da adolescente e viene notata da Quasimodo. A 26 anni viene internata in manicomio, dove passerà anni spezzati tra elettroshock e lunghi silenzi. Quando ne esce, la sua voce è diventata più potente e visionaria che mai: trasforma il dolore in canto d'amore, la gabbia in libertà. Vive in una piccola casa di Porta Ticinese, povera e generosa — la "piccola ape furibonda" che fa del veleno miele.</p>
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
        schedaHTML: `<p class="scheda-intro">Nasce a Trieste nel 1883 da famiglia ebraica, con un padre che abbandona la madre prima ancora della nascita. Cresce con una balia slovena che amerà per tutta la vita e ricorderà nei versi. Gestisce una libreria antiquaria a Trieste per decenni, e la città è il suo mondo: la canta con una semplicità apparente che nasconde una raffinatezza psicologica straordinaria. Il <em>Canzoniere</em>, la sua opera totale, è un diario in versi di una vita intera — e Trieste ne è il cuore.</p>
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
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS_SECONDE = [
    {
        id: 'primi-documenti',
        name: 'I Primi Documenti in Volgare',
        role: 'Le Origini',
        cost: 300,
        image: 'avatar_autori/primi_documenti.png',
        description: 'Dal Placito Capuano alle prime testimonianze scritte della lingua italiana.',
        schedaHTML: `<p class="scheda-intro">Immaginate di essere un notaio nell'anno 960 a Capua. Dovete mettere per iscritto una testimonianza sui confini di una terra — e lo fate, per la prima volta nella storia, non in latino ma nella lingua che la gente parla ogni giorno. Così nasce il <em>Placito Capuano</em>: il documento più antico della lingua italiana. Non è poesia, non è letteratura — è burocrazia. Ma da quella formula giuridica balbuziante nascerà Dante, Petrarca, Leopardi. Il latino cede il posto lentamente, testardamente, alla voce viva del popolo.</p>
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
        cost: 300,
        image: 'avatar_autori/scuola_siciliana.png',
        description: 'La nascita della lirica d’amore alla corte di Federico II.',
        schedaHTML: `<p class="scheda-intro">Alla corte di Federico II di Svevia — l'imperatore che parlava sei lingue e discuteva di matematica con i sapienti arabi — nascono le prime poesie d'amore in italiano. I poeti siciliani non erano pazzi solitari: erano funzionari, giuristi, diplomatici che nel tempo libero componevano sonetti. Il genio assoluto è Giacomo da Lentini, che <strong>inventa il sonetto</strong>: quattordici versi che cambieranno la poesia mondiale per secoli. Da loro discendono Dante, Petrarca, Shakespeare e tutti i poeti moderni.</p>
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
        cost: 300,
        image: 'avatar_autori/francesco_assisi.png',
        description: 'Il Santo che parlava agli uccelli e scrisse il primo grande testo in volgare.',
        schedaHTML: `<p class="scheda-intro">Francesco Bernardone nasce in famiglia ricca, fa il soldato, viene catturato in guerra — e durante la prigionia ha una visione. Torna ad Assisi, restituisce tutto al padre, si veste di stracci e comincia a predicare la pace tra gli uomini e con la natura. Il <em>Cantico delle creature</em> — Fratello Sole, Sorella Luna, Fratello Vento — è il primo grande poema della letteratura italiana: scritto non in latino ma nella lingua del popolo, canta il creato come una grande famiglia. Ancora oggi suona come una melodia improvvisa nel mezzo di un bosco.</p>
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
        cost: 300,
        image: 'avatar_autori/francesco_petrarca.png',
        description: 'Il poeta dell’interiorità, incoronato in Campidoglio.',
        schedaHTML: `<p class="scheda-intro">Francesco Petrarca vuole tutto: la gloria, l'amore, la pace interiore, la benedizione di Dio. E non riesce ad averli completamente. Vede Laura il 6 aprile 1327 nella chiesa di Santa Chiara ad Avignone — e da quel momento le dedica 366 poesie in cui celebra un amore impossibile tra estasi e disperazione. Nel frattempo raccoglie manoscritti antichi in tutta Europa, scala il Monte Ventoux per puro piacere (cosa inaudita per l'epoca!) e viene incoronato poeta a Roma in Campidoglio. Padre dell'Umanesimo: ogni poeta europeo dei secoli successivi deve qualcosa a lui.</p>
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
        cost: 300,
        image: 'avatar_autori/lorenzo_medici.png',
        description: 'Signore di Firenze e mecenate dei più grandi artisti del Rinascimento.',
        schedaHTML: `<p class="scheda-intro">Lorenzo de' Medici è il CEO più colto del Rinascimento. Governa Firenze tra intrighi, congiure e guerre — sopravvive all'attentato dei Pazzi nella cattedrale dove gli uccidono il fratello Giuliano — e nel tempo libero scrive poesie, finanzia Botticelli, Michelangelo e Leonardo, e fa di Firenze la capitale culturale del mondo. <em>«Quant'è bella giovinezza / che si fugge tuttavia!»</em> — il suo Trionfo celebra il piacere della vita con la malinconia di chi sa che tutto passa. La mente politica più sofisticata del suo secolo.</p>
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
        cost: 300,
        image: 'avatar_autori/cesare_beccaria.png',
        description: 'L’Illuminista che cambiò la giustizia nel mondo.',
        schedaHTML: `<p class="scheda-intro">Cesare Beccaria ha ventisei anni quando scrive <em>Dei delitti e delle pene</em> nel 1764. Un libretto di cento pagine che cambia la storia della giustizia mondiale. Dice cose che sembrano ovvie oggi e che allora sembravano rivoluzionarie: non si tortura, non si condanna a morte, le pene devono essere proporzionate ai reati e rapide. Il libro viene subito messo all'indice dalla Chiesa e tradotto in tutte le lingue d'Europa. Beccaria, timido e ansioso, non vuole nemmeno andare a Parigi a incontrare i suoi ammiratori. Ma il suo coraggio intellettuale è senza pari.</p>
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
        cost: 250,
        image: 'avatar_autori/dante_modern.png',
        description: 'L’autore della Divina Commedia, il viaggio nell’oltretomba.',
        schedaHTML: `<p class="scheda-intro">Dante Alighieri entra in politica a Firenze in un momento sbagliato: la città è divisa tra guelfi bianchi e guelfi neri. Nel 1301, mentre è in missione diplomatica a Roma, i guelfi neri prendono il potere e lo condannano a morte in contumacia. Non tornerà mai più in città. In esilio, accolto di corte in corte, scrive la <em>Divina Commedia</em>: un viaggio nell'Inferno, nel Purgatorio e nel Paradiso che è insieme teologia medievale, regolamento di conti con i nemici politici e creazione della lingua italiana moderna. Mette all'Inferno papi e imperatori. Porta in Paradiso Beatrice. Storia, amore e vendetta — tutto in terzine perfette.</p>
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
        cost: 250,
        image: 'avatar_autori/ludovico_ariosto.png',
        description: 'L’autore dell’Orlando Furioso, tra magia, cavalieri e amore.',
        schedaHTML: `<p class="scheda-intro">Ludovico Ariosto vorrebbe tanto stare a casa. Ama il suo piccolo giardino a Ferrara, ama i suoi libri, ama la pace. Invece deve fare il diplomatico per gli Este, governare la Garfagnana piena di briganti, viaggiare per tutta Italia. E nel mezzo di tutto questo scrive <em>L'Orlando Furioso</em> per quarant'anni, correggendo e riscrivendo senza sosta. Il risultato: il più fantastico poema cavalleresco della letteratura italiana — paladini, maghe, ippogrifo, isole incantate — e soprattutto Orlando che perde il senno per amore. Un meraviglioso gioco di specchi tra serietà e ironia.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA MOLTO PER LAVORO AL SERVIZIO DEGLI ESTE.</li>
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
        cost: 200,
        image: 'avatar_autori/giovanni_boccaccio.png',
        description: 'L’autore del Decameron, cento novelle su amore e astuzia.',
        schedaHTML: `<p class="scheda-intro">Giovanni Boccaccio scrive il <em>Decameron</em> nel 1348, subito dopo la Peste Nera che ha ucciso metà della popolazione di Firenze. Sette donne e tre giovani si rifugiano in una villa fuori città e per dieci giorni si raccontano cento novelle: d'amore, di furbizia, di fortuna, di malizia. È la più gioiosa risposta alla morte che la letteratura abbia mai scritto. Boccaccio esalta la vita contro la peste, il piacere contro la paura, l'intelligenza contro la sorte cieca. La radice di tutto il racconto europeo moderno.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; VIAGGIA TRA FIRENZE e NAPOLI PER AFFARI E CULTURA.</li>
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
        cost: 200,
        image: 'avatar_autori/niccolo_machiavelli.png',
        description: 'L’autore del Principe, che spiegò come funziona il potere.',
        schedaHTML: `<p class="scheda-intro">Niccolò Machiavelli fa il segretario della Repubblica Fiorentina per quindici anni, gestisce eserciti e ambascerie, conosce i principi più potenti d'Europa. Poi i Medici tornano a Firenze, lui viene arrestato, torturato, e mandato in esilio nella sua campagna. Lì, di sera, si mette l'abito di gala, entra nel suo studio e «conversa» con i grandi storici dell'antichità. E scrive <em>Il Principe</em>: come si conquista il potere, come lo si mantiene. Parla della politica com'è, non come dovrebbe essere. Per questo è ancora il manuale di ogni uomo di potere.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA PER TUTTA EUROPA COME DIPLOMATICO.</li>
            <li><strong>🏛 POLITICO 🏟 +15</strong> &rarr; DEDICA TUTTA LA VITA ALLA POLITICA E ALLO STATO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; POLITICO, STORICO e SCRITTORE di TEATRO.</li>
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
        cost: 200,
        image: 'avatar_autori/galileo_galilei.png',
        description: 'Il padre del metodo scientifico moderno e il primo a guardare la luna con il cannocchiale.',
        schedaHTML: `<p class="scheda-intro">Galileo Galilei inventa il metodo scientifico e lo paga caro. Osserva la luna col cannocchiale, scopre le lune di Giove, dimostra che la Terra gira intorno al Sole — e viene convocato dall'Inquisizione nel 1633. Abiura. Ma la leggenda dice che mormorò: <em>«Eppur si muove»</em>. I suoi libri — <em>Dialogo sopra i due massimi sistemi del mondo</em>, <em>Discorsi e dimostrazioni matematiche</em> — sono scritti in un italiano limpido e ironico. Il suo Simplicio che difende Aristotele fa la figura dello sciocco: è un libro di scienza ma anche un romanzo umoristico.</p>
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
        cost: 200, 
        image: 'avatar_autori/giuseppe_parini.png',
        description: 'L’autore del Giorno, che criticò la nobiltà pigra del suo tempo.',
        schedaHTML: `<p class="scheda-intro">Giuseppe Parini è un prete povero che fa il precettore nelle famiglie nobili milanesi — e da quella posizione privilegiata osserva i suoi datori di lavoro con occhio tagliente. <em>Il Giorno</em> è un poema in quattro parti che racconta la giornata perfetta del «Giovin Signore» aristocratico: si sveglia tardi, fa colazione, va dalla sua dama, gioca, va a teatro. Tutto descritto con un'ironia raffinatissima che maschera la critica sociale sotto l'elogio. Uno dei fondatori della tradizione civile italiana: la letteratura come strumento di riforma.</p>
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
        cost: 200,
        image: 'avatar_autori/carlo_goldoni.png',
        description: 'L’autore che tolse le maschere agli attori e raccontò la vita vera.',
        schedaHTML: `<p class="scheda-intro">Carlo Goldoni ha scritto 120 commedie in italiano, veneziano e francese, riformando il teatro dall'interno. Prima di lui la Commedia dell'Arte viveva di maschere fisse e improvvisazione: Pantalone, Arlecchino, Dottore sempre uguali. Goldoni dice basta e scrive personaggi veri con psicologie precise: la bottegaia, il borghese onesto, il nobile che non ha un soldo. La vita vera in scena. Le sue commedie sono ancora oggi freschissime: <em>La locandiera</em>, <em>I Rusteghi</em>, <em>Le baruffe chiozzotte</em> — genio puro travestito da commedia.</p>
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
        id: 'torquato-tasso', 
        name: 'Torquato Tasso', 
        role: 'Il Poeta Inquieto', 
        cost: 150,
        image: 'avatar_autori/torquato_tasso.png',
        description: 'L’autore della Gerusalemme Liberata, tra battaglie e tormenti religiosi.',
        schedaHTML: `<p class="scheda-intro">Torquato Tasso porta la guerra santa in ottave perfette. La <em>Gerusalemme Liberata</em> racconta la Prima Crociata con l'intensità di un thriller: guerrieri, maghe, amori impossibili, battaglie. Ma Tasso è anche un uomo distrutto dall'ansia: sospetta di essere spiato, pensa che la sua opera sia eretica, chiede di essere processato dall'Inquisizione. Il duca di Ferrara lo fa rinchiudere nell'ospedale di Sant'Anna per sette anni. Leopardi e Byron lo piangeranno come il poeta maledetto per eccellenza: il genio che spezza sé stesso prima di poter spiccare il volo.</p>
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
        cost: 150,
        image: 'avatar_autori/cecco_angiolieri.png',
        description: 'Il poeta del "S\'i\' fosse foco", ribelle e dissacrante.',
        schedaHTML: `<p class="scheda-intro">Cecco Angiolieri è il poeta che voleva incendiare il mondo. Senese del Duecento, figlio di ricca famiglia bancaria, dilapida tutto tra taverne e donne, litiga col padre, si inchina alla crudele Becchina che non lo vuole. I suoi sonetti sono rabbiosi, comici, scandalosi: <em>«S'i' fosse foco, arderei 'l mondo»</em> è un piano di distruzione universale scritto in quattordici versi perfetti. È l'anti-Dante: mentre l'Alighieri eleva la poesia al cielo, Cecco la scaraventa nel fango con una gioia liberatoria. Il primo poeta «punk» della letteratura italiana.</p>
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
        cost: 150,
        image: 'avatar_autori/iacopone_todi.png',
        description: 'L’autore del "Pianto della Madonna", tra misticismo e ribellione.',
        schedaHTML: `<p class="scheda-intro">Iacopone da Todi è un notaio agiato che durante un banchetto di nozze vede la propria moglie morire per il crollo di un palco. Sotto il vestito da ballo trova un cilicio con cui si flagellava in segreto per penitenza. Quel momento lo trasforma: vende tutto, diventa laico francescano, inizia a vagare cantando laude in dialetto umbro. La sua poesia oscilla tra estasi mistica e feroce satira politica: attacca papa Bonifacio VIII con versi al vetriolo e finisce in carcere. <em>Donna de Paradiso</em> è tra le più belle poesie religiose del Medioevo italiano.</p>
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
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AUTHORS_INTERNAZIONALI = [
    {
        id: 'victor-hugo',
        name: 'Victor Hugo',
        role: 'Il Gigante del Romanticismo',
        cost: 5000,
        image: 'avatar_autori/victor_hugo.png',
        description: 'L’autore de I Miserabili e il difensore dei diritti umani.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Victor Hugo è il monumento vivente della letteratura francese. A vent'anni pubblica i primi romanzi, a trent'anni è il capo del Romanticismo francese, a cinquanta viene esiliato da Napoleone III — e dall'isola di Guernsey scrive <em>I Miserabili</em>: Jean Valjean, Cosette, Javert, Gavroche. La storia degli ultimi raccontata con la potenza di un'epopea. Hugo crede nella giustizia, nella bontà umana, nel progresso — e lo dimostra con ogni pagina. Quando torna in Francia, dopo diciannove anni d'esilio, una folla immensa lo accoglie come un re.</p>
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
        cost: 5000,
        image: 'avatar_autori/gabriel_garcia_marquez.png',
        description: 'L’autore di Cent’anni di solitudine, dove la magia incontra la realtà.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Gabriel García Márquez nasce ad Aracataca, Colombia, in una casa piena di zie e fantasmi. I nonni gli raccontano storie in cui i morti camminano e gli anni durano cent'anni. Da queste storie nasce <em>Cent'anni di solitudine</em> (1967): la saga dei Buendía a Macondo, dove realtà e magia sono la stessa cosa. Il libro viene tradotto in cinquanta lingue, fonda il Realismo Magico come categoria letteraria, cambia il romanzo mondiale. Gabo — così lo chiamano tutti — vince il Nobel nel 1982 e diventa l'amico di presidenti e rivoluzionari.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA E VIVE TRA COLOMBIA, MESSICO, EUROPA E CUBA.</li>
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
        cost: 5000,
        image: 'avatar_autori/edgar_allan_poe.png',
        description: 'L’inventore del racconto poliziesco e maestro del genere horror.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Edgar Allan Poe è il maestro del brivido che non riesce a tenersi a bada. Perde i genitori da bambino, viene adottato, litiga col padre adottivo, passa dalla povertà alla genialità e torna alla povertà. Inventa il racconto poliziesco con Dupin, il detective razionale che precede Sherlock Holmes di sessant'anni. Scrive horror psicologici perfetti: <em>La caduta della casa Usher</em>, <em>Il cuore rivelatore</em>, <em>Il pozzo e il pendolo</em>. E nel mezzo di tutto, <em>Il corvo</em> — una delle poesie più memorabili mai scritte. Muore a Baltimora nel 1849 in circostanze misteriose. Aveva quarant'anni. Anche la sua morte sembra un suo racconto.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; SI SPOSTA TRA DIVERSE CITTÀ AMERICANE IN CERCA DI FORTUNA.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; NON SI INTERESSA ALLA VITA POLITICA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETA, CRITICO E SCRITTORE DI RACCONTI.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA AL TRADIZIONE GOTICA EUROPEA.</li>
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
        cost: 4000,
        image: 'avatar_autori/fedor_dostoevskij.png',
        description: 'L’autore di Delitto e castigo, che esplorò i tormenti della coscienza.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Fëdor Dostoevskij viene condannato a morte a 28 anni per attività politica. Già davanti al plotone d'esecuzione arriva la grazia dello zar: quattro anni di lavori forzati in Siberia, poi l'esilio. Torna e scrive <em>Delitto e castigo</em>, <em>L'idiota</em>, <em>I fratelli Karamazov</em>. Nei suoi romanzi ci sono assassini che ragionano, santi che soffrono, bambini che muoiono, Dio che tace. Dostoevskij non descrive la psicologia umana: la seziona. Aveva visto in faccia la morte, l'umiliazione totale, la grazia improvvisa. Per questo i suoi personaggi sembrano più vivi di qualsiasi persona reale.</p>
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
        cost: 4000,
        image: 'avatar_autori/lev_tolstoj.png',
        description: 'Il grande narratore della storia e dell’animo russo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Lev Tolstoj è il conte russo che non riesce a godersi il suo privilegio. Proprietario terriero con migliaia di servi, scrive <em>Guerra e Pace</em> e <em>Anna Karenina</em> — i due romanzi più grandi del mondo — e poi decide che tutto è sbagliato. Distribuisce le terre ai contadini, si veste come loro, lavora i campi, diventa vegetariano, si converte a una versione personalissima del Vangelo che gli vale la scomunica dalla Chiesa ortodossa. Ispira Gandhi con la sua filosofia della non-violenza. Muore ottantaduenne in una stazione ferroviaria di provincia, in fuga da sé stesso.</p>
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
        cost: 4000,
        image: 'avatar_autori/george_orwell.png',
        description: 'Il visionario che mise in guardia contro i totalitarismi.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">George Orwell si chiama in realtà Eric Arthur Blair, e ha vissuto tutto ciò di cui scrive. Poliziotto coloniale in Birmania, mendicante a Londra e Parigi, combattente nella Guerra Civile Spagnola dove viene ferito alla gola. Da tutto questo nasce la sua lucidità assoluta sui meccanismi del potere. <em>La fattoria degli animali</em> racconta la Rivoluzione Russa con i maiali. <em>1984</em> inventa il Grande Fratello, la Neolingua, il Doppio Pensiero. Muore di tubercolosi nel 1950, a quarantasei anni, ancora troppo poco famoso in vita.</p>
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
        cost: 4000,
        image: 'avatar_autori/ernest_hemingway.png',
        description: 'L’autore della Lost Generation, amante dell’avventura e della sintesi.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Ernest Hemingway è uno scrittore che si prende molto sul serio — e ha ragione. Ex-ambulanziere nella Prima Guerra Mondiale, corrispondente di guerra in Spagna e nella Seconda Guerra, cacciatore in Africa, pescatore di marlin a Cuba — e scrive di tutto questo con una prosa secca e muscolare che sembra impossibile imitarla. La sua «teoria dell'iceberg» dice che il significato più importante è sempre sotto la superficie. <em>Il vecchio e il mare</em>, <em>Addio alle armi</em>, <em>Per chi suona la campana</em>. Nobel nel 1954. Si suicida nel 1961.</p>
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
        cost: 4000,
        image: 'avatar_autori/charles_dickens.png',
        description: 'Il grande narratore delle ingiustizie sociali dell’Inghilterra vittoriana.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Charles Dickens conosce la povertà per esperienza personale: a dodici anni lavora in una fabbrica di lucido da scarpe mentre il padre è in prigione per debiti. Questa memoria non lo abbandona mai. I suoi romanzi — <em>Oliver Twist</em>, <em>David Copperfield</em>, <em>Grandi speranze</em>, <em>Canto di Natale</em> — sono pieni di bambini poveri, orfani sfruttati, villain spietati e, alla fine, una redenzione possibile. Dickens pubblica a puntate sui giornali: milioni di lettori aspettano ogni settimana il nuovo capitolo, come una serie televisiva. I suoi personaggi sono diventati archetipi universali.</p>
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
        cost: 4000,
        image: 'avatar_autori/herman_melville.png',
        description: 'L’autore della balena bianca, il viaggio estremo tra mare e ossessione.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Herman Melville naviga davvero sulle baleniere del Pacifico, vive tra i cannibali della Polinesia, diserta, viene arrestato, torna in America e scrive. <em>Moby Dick</em> (1851) è il libro più ambizioso della letteratura americana: la caccia alla balena bianca è insieme romanzo d'avventura, enciclopedia della baleneria e meditazione metafisica sull'ossessione e su Dio. Il pubblico dell'epoca non lo capisce. Melville muore dimenticato nel 1891. Solo vent'anni dopo il mondo si accorge di aver ignorato un capolavoro assoluto.</p>
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
        cost: 4000,
        image: 'avatar_autori/oscar_wilde.png',
        description: 'L’autore de Il ritratto di Dorian Gray e maestro dell’aforisma.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Oscar Wilde è brillante come un diamante e fragile come il vetro. Dublinese a Oxford, poeta in America, commediografo trionfante a Londra — la sua vita è un salotto infinito dove scintillano aforismi (<em>«Posso resistere a tutto tranne alle tentazioni»</em>). <em>Il ritratto di Dorian Gray</em>, <em>Lady Windermere's Fan</em>, <em>L'importanza di chiamarsi Ernesto</em>: tutto è eleganza, ironia, paradosso. Poi la catastrofe: condannato per «gross indecency» trascorre due anni ai lavori forzati. Muore povero a Parigi nel 1900. Aveva quarantasei anni. La storia gli ha restituito tutto.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA IN EUROPA E TOUR DI CONFERENZE IN AMERICA.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; RIFIUTA LA POLITICA TRADIZIONALE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; POETA, DRAMMATURGO E SAGGISTA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA AL BELLEZZA DELL’ANTICA GRECIA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -10</strong> &rarr; IL CARCERE LO PORTA A UNA TRAGICA SOLITUDINE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; PROTAGONISTA DI UNO SCANDALO SOCIALE E GIUDIZIARIO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; IRONIA QUE NASCONDE UNA TRAGICA VISIONE DELLA VITA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; SIMBOLO DELL'ESTETISMO E DELLA LIBERTÀ INDIVIDUALE.</li>
        </ul>`
    },
    {
        id: 'emile-zola',
        name: 'Émile Zola',
        role: 'Il Naturalismo',
        cost: 3000,
        image: 'avatar_autori/emile_zola.png',
        description: 'Il teorico del naturalismo e l’autore del celebre J’Accuse.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Émile Zola porta la letteratura nelle miniere e nei mercati. La sua serie <em>I Rougon-Macquart</em> è l'epopea naturalista di una famiglia attraverso cinque generazioni: venti romanzi, tra cui <em>Germinal</em> (le miniere del nord), <em>Nana</em> (la prostituzione), <em>L'Ammazzatoio</em> (l'alcolismo operaio). Descrive tutto con la precisione di un documentarista. Nel 1898 pubblica <em>J'accuse</em>: la lettera aperta al Presidente della Repubblica in difesa del capitano Dreyfus, falsamente accusato di spionaggio perché ebreo. Uno dei più grandi atti di coraggio intellettuale della storia.</p>
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
        cost: 3000,
        image: 'avatar_autori/franz_kafka.png',
        description: 'L’autore de La metamorfosi, che raccontò l’alienazione moderna.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Franz Kafka lavora di giorno come impiegato nelle assicurazioni a Praga, di notte scrive storie in cui gli impiegati si trasformano in insetti, vengono processati senza sapere l'accusa, tentano di entrare in un Castello che forse non esiste. <em>La metamorfosi</em>, <em>Il processo</em>, <em>Il castello</em> — tutti incompiuti o pubblicati contro la sua volontà. Prima di morire di tubercolosi nel 1924, chiede al suo amico Max Brod di bruciare tutto. Brod disobbedisce. Così sopravvive uno scrittore che ha dato un aggettivo alla lingua mondiale: <em>kafkiano</em>.</p>
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
        cost: 3000,
        image: 'avatar_autori/virginia_woolf.png',
        description: 'La pioniera della modernità e dell’analisi interiore femminile.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Virginia Woolf reinventa il modo in cui il romanzo racconta il tempo. <em>Mrs Dalloway</em> si svolge in un solo giorno a Londra, ma dentro ci sono decenni di memoria, desiderio e dolore. <em>Gita al faro</em> fa della luce su un faro lontano una meditazione sull'arte e sulla morte. <em>Orlando</em> è una commedia fantastica su un personaggio che cambia sesso attraverso i secoli. Nel saggio <em>Una stanza tutta per sé</em> rivendica con chiarezza assoluta che le donne non hanno potuto scrivere letteratura perché non avevano soldi né spazio privato. Voce del femminismo moderno, pioniera della modernità letteraria.</p>
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
        cost: 3000,
        image: 'avatar_autori/james_joyce.png',
        description: 'L’autore di Ulisse, che rivoluzionò il linguaggio del romanzo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">James Joyce lascia l'Irlanda a vent'anni e non torna quasi mai, ma ci pensa sempre. Vive a Trieste (dove insegna inglese e conosce Svevo), a Parigi, a Zurigo. Scrive <em>Dublinesi</em> con la tecnica dell'epifania: piccole rivelazioni nella vita quotidiana. Poi <em>Ulisse</em> (1922): un solo giorno a Dublino — il 16 giugno 1904 — raccontato seguendo il flusso di coscienza di tre personaggi con ogni stile letterario mai esistito. Il libro più difficile e rivoluzionario del Novecento. <em>Finnegans Wake</em> è l'ultimo passo: un sogno scritto in una lingua inventata.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIVE IN ESILIO VOLONTARIO A TRIESTE, PARIGI E ZURIGO.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; DISTANTE DALLA POLITICA ATTIVA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETA E ROMANZIERE SPERIMENTALE.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; RISCRIVE IL MITO DI OMERO NELLA MODERNITÀ.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; DEDIZIONE TOTALE ALLA SCRITTURA COMPLESSA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; IL SUO ULISSE VIENE CENSURATO PER ANNI PER OSCENITÀ.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; IRONIA E COMPLESSITÀ QUE SUPERANO IL PESSIMISMO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +20</strong> &rarr; PORTA LA SPERIMENTAZIONE LINGUISTICA AL LIMITE.</li>
        </ul>`
    },
    {
        id: 'mark-twain',
        name: 'Mark Twain',
        role: 'L’Anima dell’America',
        cost: 3000,
        image: 'avatar_autori/mark_twain.png',
        description: 'L’autore di Tom Sawyer e Huckleberry Finn, maestro dell’umorismo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Mark Twain nasce Samuel Langhorne Clemens sulle rive del Mississippi e non se ne libera mai. Pilota di battello, cercatore d'oro, giornalista, umorista — il nome «Mark Twain» viene dal grido dei marinai che scandagliavano il fiume: due braccia di profondità, si può navigare. <em>Le avventure di Tom Sawyer</em> e <em>Le avventure di Huckleberry Finn</em> fondano la letteratura americana moderna: Huck Finn è il primo grande romanzo scritto in vernacolo americano, con la voce autentica di un ragazzo del Sud che affronta le contraddizioni della schiavitù. Hemingway disse: «Tutta la letteratura americana moderna viene da un libro di Mark Twain.»</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIA PER TUTTO IL MONDO COME CONFERENZIERE.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; CRITICO DELL'IMPERIALISMO E DEL RAZZISMO.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; GIORNALISTA, SCRITTORE E INVENTORE.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; CREA UNA LETTERATURA AMERICANA AUTENTICA.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; FIGURA PUBBLICA MOLTO AMATA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; I SUOI LIBRI SPESSO DISCUSSI PER IL LINGUAGGIO DIRETTO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; UMORISMO QUE NASCONDE UNA VISIONE CINICA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; PADRE DELLA LETTERATURA AMERICANA MODERNA.</li>
        </ul>`
    },
    {
        id: 'anton-cechov',
        name: 'Anton Čechov',
        role: 'Maestro del Sottotono',
        cost: 3000,
        image: 'avatar_autori/anton_cechov.png',
        description: 'Il medico scrittore che rivoluzionò il racconto e il dramma.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Anton Čechov è medico e scrittore, e fa entrambe le cose con la stessa compassione. Nato nel 1860 nella Russia del sud, si laurea in medicina, visita la colonia penale di Sakhalin attraverso tutta la Siberia per denunciarne le condizioni, cura i contadini gratis. E contemporaneamente scrive 600 racconti e quattro grandi pièce: <em>Il gabbiano</em>, <em>Tre sorelle</em>, <em>Lo zio Vanja</em>, <em>Il giardino dei ciliegi</em>. Il suo teatro non ha eroi né cattivi: ha persone normali che desiderano cose che non riescono ad avere, che parlano senza ascoltarsi. La vita com'è, non come vorremmo.</p>
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
        cost: 3000,
        image: 'avatar_autori/henrik_ibsen.png',
        description: 'L’autore di Casa di bambola, che scosse le fondamenta della famiglia borghese.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Henrik Ibsen è il norvegese che ha fatto tremare i salotti di tutta Europa. Lascia la Norvegia per vivere in Italia e Germania per ventisette anni — e da lì scrive le sue bombe teatrali: <em>Casa di bambola</em> (1879), in cui Nora sbatte la porta e se ne va lasciando marito e figli; <em>Spettri</em>, in cui una vedova scopre la vita segreta del defunto marito rispettabile; <em>Hedda Gabler</em>, in cui una donna brillante viene soffocata dalla mediocrità borghese. Ogni suo dramma apre uno scandalo. Ogni scandalo dura finché il mondo capisce che aveva ragione.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIVE MOLTI ANNI IN ITALIA E GERMANIA IN ESILIO VOLONTARIO.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; LE SUE OPERE SONO UN ATTO POLITICO CONTRO L'IPOCRISIA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; DRAMMATURGO e POETA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA AL RIGORE TEATRALE CON TEMI MODERNI.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; CARATTERE DIFFICILE E SOLITARIO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; LE SUE OPERE SCATENANO DISORDINI E CENSURE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; SCOPRE I SEGRETI OSCURI DI OGNI FAMIGLIA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; PADRE DEL DRAMMA MODERNO BORGHESE.</li>
        </ul>`
    },
    {
        id: 'rainer-maria-rilke',
        name: 'Rainer Maria Rilke',
        role: 'Il Poeta degli Angeli',
        cost: 3000,
        image: 'avatar_autori/rainer_maria_rilke.png',
        description: 'Il grande lirico delle Elegie duinesi e dei Sonetti a Orfeo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Rainer Maria Rilke è il poeta che ha fatto dell'esistenza la sua materia prima. Nasce a Praga nel 1875, non riesce a fare nessuna vita normale — studia, lavora come segretario di Rodin, viaggia in Russia, in Italia, in Egitto — e scrive poesie di una bellezza vertiginosa. <em>Le elegie duinesi</em> le inizia nel 1912 nel castello di Duino sul golfo di Trieste quando sente una voce nel vento — <em>«Chi, se gridassi, mi udirebbe, tra le schiere degli angeli?»</em> — e le termina dieci anni dopo in un turbine di ispirazione. I <em>Sonetti a Orfeo</em> li scrive in meno di una settimana. Muore nel 1926 lasciando la poesia europea trasformata per sempre.</p>
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
    },
    {
        id: 'hermann-hesse',
        name: 'Hermann Hesse',
        role: 'Il Viandante dell’Anima',
        cost: 4000,
        image: 'avatar_autori/hermann_hesse.png',
        description: 'L’autore di Siddharta e Il lupo della steppa, cercatore di verità e armonia tra gli opposti.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Hermann Hesse è il viaggiatore incallito dello spirito. Tedesco naturalizzato svizzero, passa la vita a cercare di conciliare gli opposti: natura e spirito, corpo e mente, Occidente e Oriente. Il suo viaggio in India segna profondamente la sua scrittura. <em>Siddharta</em> è un breviario di saggezza che ha incantato generazioni di giovani; <em>Il lupo della steppa</em> seziona la solitudine dell’intellettuale moderno; <em>Narciso e Boccadoro</em> celebra l'amicizia tra il monaco e l'artista. Premio Nobel nel 1946. La sua prosa è una musica calma che invita a guardarsi dentro.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGIO IN INDIA E VITA NOMADE TRA GERMANIA E SVIZZERA.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; PACIFISTA CONVINTO, SI OPPONE AL NAZISMO E ALLA GUERRA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; ROMANZIERE, POETA E PITTORE DI ACQUERELLI.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA ALLA FILOSOFIA ORIENTALE E ALLA PSICOLOGIA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; RICERCA DI ISOLAMENTO PER LA MEDITAZIONE E LA SCRITTURA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; RISPETTATO COMUNA UNA GUIDA SPIRITUALE PER I GIOVANI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; VISIONE CRITICA DELLA SOCIETÀ INDUSTRIALE.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; INTRODUCE TEMI PSICOLOGICI E SPIRITUALI NEL ROMANZO EUROPEO.</li>
        </ul>`
    },
    {
        id: 'sigmund-freud',
        name: 'Sigmund Freud',
        role: 'Il Padre della Psicanalisi',
        cost: 5000,
        image: 'avatar_autori/sigmund_freud.png',
        description: 'Il rivoluzionario dell’inconscio che ha svelato i segreti più profondi della mente umana.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Sigmund Freud non è solo un medico: è il cartografo dei nostri sogni. A Vienna, tra la fine dell'Ottocento e l'inizio del Novecento, inventa la psicanalisi — un modo per curare le malattie dell'anima semplicemente parlando. <em>L'interpretazione dei sogni</em> (1900) è il libro che cambia la percezione dell'uomo: sotto la nostra coscienza pulita c'è l'Inconscio, un mare di desideri e paure che ci governa. Es, Io, Super-io sono le sue bussole. Senza di lui, la letteratura e l'arte del Novecento non sarebbero state le stesse. Ha dato un nome ai nostri mostri interiori.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; VIAGGI DI STUDIO E ESILIO FINALE A LONDRA PER SFUGGIRE AI NAZISTI.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; NON IMPEGNATO POLITICAMENTE, MA VITTIMA DELLE PERSECUZIONI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; SCRITTORE SCIENTIFICO DI GRANDE VALORE LETTERARIO.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; UTILIZZA MITI GRECI (EDIPO) PER SPIEGARE LA MENTE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; VITA DEDICATA ALLO STUDIO E ALLA PRATICA CLINICA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +15</strong> &rarr; LE SUE TEORIE SULLA SESSUALITÀ SCIOCCANO IL MONDO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; VISIONE DISILLUSA SULLA CIVILTÀ E SUI SUOI DISAGI.</li>
            <li><strong>🧠 INNOVATORE ⚡ +20</strong> &rarr; INVENTA LA PSICANALISI E SCOPRE L'INCONSCIO.</li>
        </ul>`
    },
    {
        id: 'johann-wolfgang-goethe',
        name: 'Johann Wolfgang Goethe',
        role: 'Il Genio Universale',
        cost: 5000,
        image: 'avatar_autori/johann_wolfgang_goethe.png',
        description: 'Il gigante della letteratura tedesca, autore del Faust e de I dolori del giovane Werther.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Johann Wolfgang von Goethe non è solo uno scrittore: è un'epoca intera. Poeta, drammaturgo, scienziato, statista — la sua mente abbraccia ogni campo del sapere. Con <em>I dolori del giovane Werther</em> scatena la prima grande ondata di romanticismo europeo; con il <em>Faust</em> scrive il dramma assoluto della modernità, la sfida dell'uomo che vende l'anima per la conoscenza. Il suo <em>Viaggio in Italia</em> è la celebrazione della luce e della bellezza classica. È il punto di riferimento ineludibile per tutta la cultura occidentale.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; IL SUO VIAGGIO IN ITALIA È UN MITO CULTURALE.</li>
            <li><strong>🏛 POLITICO 🏟 +15</strong> &rarr; MINISTRO E CONSIGLIERE ALLA CORTE DI WEIMAR.</li>
            <li><strong>📝 POLIEDRICO 🪶 +20</strong> &rarr; POETA, SCIENZIATO, PITTORE E FILOSOFO.</li>
            <li><strong>📚 CLASSICO 🏺 +15</strong> &rarr; MASSIMO ESPONENTE DEL CLASSICISMO DI WEIMAR.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; FIGURA CENTRALE DELLA VITA SOCIALE E CULTURALE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; IL WERTHER SCATENA UNA VERA MANIA IN TUTTA EUROPA.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; EQUILIBRIO TRA PASSIONE E RAGIONE.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL CONCETTO DI "LETTERATURA MONDIALE".</li>
        </ul>`
    },
    {
        id: 'marcel-proust',
        name: 'Marcel Proust',
        role: 'Il Cercatore del Tempo Perduto',
        cost: 4000,
        image: 'avatar_autori/marcel_proust.png',
        description: 'L’autore che ha esplorato la memoria e il tempo attraverso una tazzina di tè e una madeleine.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Marcel Proust vive gli ultimi anni della sua vita in una stanza foderata di sughero a Parigi, scrivendo la cattedrale della letteratura moderna: <em>Alla ricerca del tempo perduto</em>. Sette volumi per raccontare come un sapore o un profumo possano spalancare i cancelli della memoria. La sua frase è lunga e sinuosa come un pensiero che non vuole finire. Esplora l'alta società parigina con la precisione di un entomologo, rivelando le gelosie, le ambizioni e la tragica fuga del tempo che solo l'arte può fermare.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ 0</strong> &rarr; VITA SPESA QUASI INTERAMENTE A PARIGI.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; DISTANTE DALLA POLITICA ATTIVA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SAGGISTA E CRITICO OLTRE CHE ROMANZIERE.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI CONFRONTA CON I CLASSICI FRANCESI DEL SEICENTO.</li>
            <li><strong>🪫 SOLITARIO 🏡 -15</strong> &rarr; ISOLAMENTO TOTALE PER COMPLETARE LA SUA OPERA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; ANALISI SPIETATA E NUOVA DEI SENTIMENTI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; MALINCONIA PER IL TEMPO CHE DIVORA TUTTO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +20</strong> &rarr; RIVOLUZIONA IL CONCETTO DI TEMPO NEL ROMANZO.</li>
        </ul>`
    },
    {
        id: 'albert-camus',
        name: 'Albert Camus',
        role: 'Il Filosofo dell’Assurdo',
        cost: 3500,
        image: 'avatar_autori/albert_camus.png',
        description: 'Premio Nobel per la letteratura, autore de Lo straniero e La peste.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Albert Camus nasce in Algeria e porta nella sua scrittura il sole accecante del Mediterraneo e il senso dell'assurdo. In un mondo che sembra non avere senso, l'uomo deve ribellarsi: non con la violenza, ma con la solidarietà e la dignità. <em>Lo straniero</em> racconta l'indifferenza del mondo; <em>La peste</em> diventa la metafora della resistenza contro ogni male. Premio Nobel a soli 44 anni, muore tragicamente in un incidente d'auto. È la voce di un'umanità che cerca la luce pur sapendo che l'oscurità esiste.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; TRA ALGERIA E FRANCIA, VIAGGI IN TUTTA EUROPA.</li>
            <li><strong>🏛 POLITICO 🏟 +15</strong> &rarr; IMPEGNATO NELLA RESISTENZA FRANCESE E NEL DIBATTITO CIVILE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; FILOSOFO, DRAMMATURGO E GIORNALISTA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; STILE LIMPIDO E RIGOROSO, QUASI CLASSICO.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VITA ATTIVA MA SPIRITO INDIPENDENTE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; ROTTURA CON SARTRE E POLEMICHE INTELLETTUALI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -10</strong> &rarr; AFFRONTA L'ASSURDO SENZA ILLUSIONI.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; CREA LA FILOSOFIA DELLA RIVOLTA E DELL'ASSURDO.</li>
        </ul>`
    },
    {
        id: 'antoine-saint-exupery',
        name: 'Antoine de Saint-Exupéry',
        role: 'Il Pilota del Piccolo Principe',
        cost: 3000,
        image: 'avatar_autori/antoine_saint_exupery.png',
        description: 'L’autore che ha insegnato al mondo a guardare con il cuore.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Antoine de Saint-Exupéry è un aviatore che scrive o uno scrittore che vola? Entrambe le cose. Pionere dell'aviazione postale, vola sopra il Sahara e le Ande, rischiando la vita più volte. Da queste esperienze nascono <em>Volo di notte</em> e <em>Terra degli uomini</em>. Ma è con <em>Il Piccolo Principe</em> che entra nel cuore di ogni generazione: una favola eterna sull'amicizia, l'amore e la capacità di vedere l'essenziale che è invisibile agli occhi. Scompare in volo nel 1944, diventando lui stesso leggenda.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +20</strong> &rarr; PILOTA PIONIERE IN AFRICA E SUDAMERICA.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; COMBATTE PER LA FRANCIA DURANTE LA GUERRA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCRITTORE E TECNICO AERONAUTICO.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; CREA UN CLASSICO MODERNO UNIVERSALE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; SOLITUDINE DEL VOLO NOTTURNO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; AMATO PER LA SUA UMANITÀ LIMPIDA.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; FIDUCIA NEI LEGAMI UMANI.</li>
            <li><strong>🧠 INNOVATORE ⚡ +5</strong> &rarr; UNISCE AZIONE AVVENTUROSA E RIFLESSIONE POETICA.</li>
        </ul>`
    },
    {
        id: 'jk-rowling',
        name: 'J.K. Rowling',
        role: 'La Madre di Harry Potter',
        cost: 4500,
        image: 'avatar_autori/jk_rowling.png',
        description: 'L’autrice che ha riportato la magia nel mondo moderno con la saga di Hogwarts.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">J.K. Rowling scrive la prima storia di Harry Potter su un treno e nei caffè di Edimburgo, quando era una madre single in difficoltà. Da lì nasce il fenomeno editoriale più grande della storia: sette libri che hanno fatto leggere milioni di bambini e adulti in tutto il mondo. La sua capacità di costruire un universo magico coerente, con le sue leggi, la sua storia e i suoi eroi, ha ridefinito il genere fantasy. Oltre a Harry Potter, scrive gialli con lo pseudonimo di Robert Galbraith, confermandosi maestra dell'intreccio narrativo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +5</strong> &rarr; VITA TRA INGHILTERRA, PORTOGALLO E SCOZIA.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; ATTIVA NELLA BENEFICENZA E NEI DIBATTITI PUBBLICI.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; PASSA DAL FANTASY AL GIALLO.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA ALLA TRADIZIONE DEL ROMANZO INGLESE.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; DALLE DIFFICOLTÀ INIZIALI AL SUCCESSO GLOBALE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; PROTAGONISTA DI ACCESI DIBATTITI SUI SOCIAL.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; LA LUCE CHE VINCE SULL'OSCURITÀ.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL PIÙ GRANDE FENOMENO LETTERARIO CONTEMPORANEO.</li>
        </ul>`
    },
    {
        id: 'stephen-king',
        name: 'Stephen King',
        role: 'Il Re del Brivido',
        cost: 4000,
        image: 'avatar_autori/stephen_king.png',
        description: 'Il maestro dell’orrore e del fantastico, autore di It, Shining e La torre nera.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Stephen King ha trasformato le paure quotidiane in capolavori della letteratura. Dal Maine, dove vive e ambienta quasi tutte le sue storie, ha scritto oltre sessanta libri. <em>Carrie</em>, <em>Shining</em>, <em>It</em>, <em>Misery</em>: King non racconta solo mostri e fantasmi, ma scava nelle crepe della società americana e nell'animo umano. La sua serie <em>La Torre Nera</em> è un'epopea che fonde fantasy, western e fantascienza. È un narratore instancabile che ha dimostrato che il genere "horror" può raggiungere vette letterarie altissime.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ 0</strong> &rarr; RADICATO NEL SUO MAINE.</li>
            <li><strong>🏛 POLITICO 🏟 +5</strong> &rarr; SPESSO INTERVIENE SULLA REALTÀ POLITICA AMERICANA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +10</strong> &rarr; ORRORE, FANTASY, DRAMMA E SAGGI SULLA SCRITTURA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; EREDE MODERNO DI POE E LOVECRAFT.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; LAVORATORE INSTANCABILE (SCRIVE 2000 PAROLE AL GIORNO).</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; SPESSO CRITICATO DAI PURISTI DELLA "GRANDE LETTERATURA".</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; ESPLORA IL LATO OSCURO DELLA NATURA UMANA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; PADRE DEL MODERNO ROMANZO POPOLARE DI QUALITÀ.</li>
        </ul>`
    },
    {
        id: 'haruki-murakami',
        name: 'Haruki Murakami',
        role: 'Il Surrealista del Sol Levante',
        cost: 3500,
        image: 'avatar_autori/haruki_murakami.png',
        description: 'L’autore giapponese che fonde realtà e sogno in atmosfere malinconiche e magiche.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Haruki Murakami corre maratone e scrive libri dove i gatti parlano, le persone spariscono nei pozzi e la musica jazz accompagna solitudini metropolitane. Da <em>Norwegian Wood</em> a <em>L'uccello che girava le viti</em> fino a <em>1Q84</em>, il suo stile è inconfondibile: una miscela di realismo quotidiano e surrealismo magico. I suoi protagonisti sono spesso uomini comuni che si trovano coinvolti in misteri metafisici. Murakami ha creato un ponte tra la cultura giapponese e quella occidentale, diventando uno degli autori più letti e amati del pianeta.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; HA VISSUTO IN EUROPA E NEGLI STATI UNITI.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; DISTANTE DALLA POLITICA MILITANTE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SAGGISTA E TRADUTTORE.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; APPASSIONATO DI LETTERATURA OCCIDENTALE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -10</strong> &rarr; VITA DISCIPLINATA E SCHIVA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; CELEBRATO COME UN GENIO CONTEMPORANEO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; MALINCONIA E SENSO DI SMARRIMENTO.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; CREA IL "REALISMO MAGICO" GIAPPONESE.</li>
        </ul>`
    },
    {
        id: 'paulo-coelho',
        name: 'Paulo Coelho',
        role: 'L’Alchimista delle Parole',
        cost: 3000,
        image: 'avatar_autori/paulo_coelho.png',
        description: 'L’autore brasiliano che racconta il viaggio alla ricerca della propria Leggenda Personale.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Paulo Coelho è l'autore brasiliano che ha trasformato la letteratura in un cammino spirituale. Dopo una giovinezza ribelle e un pellegrinaggio a Santiago di Compostela, scrive <em>L'Alchimista</em>, un libro che diventa un caso mondiale tradotto in ottanta lingue. Le sue storie parlano di sogni, di segni del destino e del coraggio di seguire il proprio cuore. Attraverso parabole semplici e profonde, invita i lettori di tutto il mondo a cercare la propria "Leggenda Personale". È uno degli autori più influenti e seguiti sui social media, una guida per milioni di persone.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +15</strong> &rarr; PELLEGRINAGGI E VIAGGI IN TUTTO IL MONDO.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; MESSAGGI DI PACE E SPIRITUALITÀ UNIVERSALE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; PAROLIERE MUSICALE E GIORNALISTA.</li>
            <li><strong>📚 CLASSICO 🏺 0</strong> &rarr; UTILIZZA IL LINGUAGGIO DEL MITO E DELLA FIABA.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; MOLTO ATTIVO NELLA COMUNICAZIONE CON I LETTORI.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; SPESSO AL CENTRO DI POLEMICHE PER IL SUO STILE DIRETTO.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; OTTIMISMO SPIRITUALE E SPERANZA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +5</strong> &rarr; CREA IL GENERE DEL "ROMANZO ISPIRAZIONALE".</li>
        </ul>`
    },
    {
        id: 'agatha-christie',
        name: 'Agatha Christie',
        role: 'La Regina del Giallo',
        cost: 4000,
        image: 'avatar_autori/agatha_christie.png',
        description: 'La creatrice di Hercule Poirot e Miss Marple, maestra insuperabile dell’enigma.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Agatha Christie è la scrittrice più venduta di tutti i tempi dopo la Bibbia e Shakespeare. Ha inventato meccanismi narrativi perfetti che ancora oggi sfidano i lettori di tutto il mondo. Da <em>Assassinio sull'Orient Express</em> a <em>Dieci piccoli indiani</em>, i suoi libri sono enigmi logici ambientati in ville inglesi o su siti archeologici in Medio Oriente. Ha creato personaggi immortali come il pignolo Hercule Poirot e la sagace Miss Marple. La sua vita stessa è stata un mistero, segnata da una sparizione di undici giorni che non è mai stata del tutto spiegata.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ +10</strong> &rarr; VIAGGI IN MEDIO ORIENTE (IRAQ, EGITTO) AL SEGUITO DEL MARITO ARCHEOLOGO.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; DISTANTE DALLA POLITICA ATTIVA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCRITTRICE DI GIALLI, ROMANZI ROSA E TEATRO (TRAPPOLA PER TOPI).</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; FONDATRICE DEL GIALLO CLASSICO AD ENIGMA.</li>
            <li><strong>🪫 SOLITARIO 🏡 0</strong> &rarr; VITA RISERVATA MA RICCA DI ESPERIENZE.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; IL GIALLO "L'ASSASSINIO DI ROGER ACKROYD" SCIOCCA PER IL FINALE.</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; FIDUCIA NELLA LOGICA E NELLA GIUSTIZIA.</li>
            <li><strong>🧠 INNOVATORE ⚡ +10</strong> &rarr; RIVOLUZIONA LA STRUTTURA DEL ROMANZO POLIZIESCO.</li>
        </ul>`
    },
    {
        id: 'jane-austen',
        name: 'Jane Austen',
        role: 'La Maestra dell’Ironia',
        cost: 4000,
        image: 'avatar_autori/jane_austen.png',
        description: 'L’autrice di Orgoglio e pregiudizio, che ha raccontato con arguzia e precisione la società inglese del suo tempo.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Jane Austen osserva il mondo dalla finestra di un tranquillo cottage nella campagna inglese, ma vede tutto. Con un'ironia sottile e una precisione chirurgica, racconta le dinamiche sociali, i balli, i pettegolezzi e la ricerca dell'amore e dell'indipendenza delle donne della sua epoca. <em>Orgoglio e pregiudizio</em>, <em>Ragione e sentimento</em>, <em>Emma</em>: i suoi romanzi sono commedie umane perfette dove ogni dialogo è una lezione di intelligenza. Ha dimostrato che si può parlare dell'universo intero anche descrivendo "due pollici d'avorio".</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ 0</strong> &rarr; VITA TRASCORSA QUASI INTERAMENTE NELLA CAMPAGNA INGLESE.</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; NON SI OCCUPA DI POLITICA, MA LE SUE OPERE SONO UN ATTO DI CRITICA SOCIALE.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; SCRITTRICE DI ROMANZI E LETTERE BRILLANTI.</li>
            <li><strong>📚 CLASSICO 🏺 +10</strong> &rarr; MASSIMO EREDE DELLA TRADIZIONE NARRATIVA SETTECENTESCA.</li>
            <li><strong>🪫 SOLITARIO 🏡 -5</strong> &rarr; VITA FAMILIARE TRANQUILLA E SCHIVA.</li>
            <li><strong>🤯 SCANDALOSO 🧨 0</strong> &rarr; PUBBLICA ANONIMAMENTE ("BY A LADY").</li>
            <li><strong>🌀 PESSIMISTA 🌫 0</strong> &rarr; IRONIA CHE PORTA ALL'EQUILIBRIO E ALLA LIETO FINE.</li>
            <li><strong>🧠 INNOVATORE ⚡ +15</strong> &rarr; INVENTA IL DISCORSO INDIRETTO LIBERO NEL ROMANZO.</li>
        </ul>`
    },
    {
        id: 'emily-dickinson',
        name: 'Emily Dickinson',
        role: 'La Poetessa del Silenzio',
        cost: 3500,
        image: 'avatar_autori/emily_dickinson.png',
        description: 'Una delle più grandi voci della poesia mondiale, che ha racchiuso l’universo in poche, intense righe.',
        isInternational: true,
        schedaHTML: `<p class="scheda-intro">Emily Dickinson vive gran parte della sua vita nella casa paterna ad Amherst, nel Massachusetts, spesso vestita di bianco e rifiutando di vedere estranei. Ma nella sua stanza scrive quasi duemila poesie che sono esplosioni di pensiero. Parla di Dio, di morte, di natura e d'amore con un linguaggio rivoluzionario, fatto di trattini, maiuscole improvvise e immagini folgoranti. Quasi nulla è stato pubblicato mentre era in vita; la sua "lettera al mondo" è stata aperta solo dopo la sua morte, rivelando una delle voci più originali e potenti della letteratura di ogni tempo.</p>
        <ul class="scheda-list">
            <li><strong>🌍 VIAGGIATORE ✈ 0</strong> &rarr; "NON C'È UN VASCELLO CHE COME UN LIBRO POSSA PORTARCI IN TERRE LONTANE".</li>
            <li><strong>🏛 POLITICO 🏟 0</strong> &rarr; COMPLETAMENTE ESTRANEA ALLA VITA PUBBLICA.</li>
            <li><strong>📝 POLIEDRICO 🪶 +5</strong> &rarr; POETESSA E APPASSIONATA DI BOTANICA.</li>
            <li><strong>📚 CLASSICO 🏺 +5</strong> &rarr; SI ISPIRA AI TESTI BIBLICI E A SHAKESPEARE.</li>
            <li><strong>🪫 SOLITARIO 🏡 -20</strong> &rarr; SCELTA DI ISOLAMENTO QUASI TOTALE DAL MONDO.</li>
            <li><strong>🤯 SCANDALOSO 🧨 +5</strong> &rarr; STILE TROPPO AVANZATO PER I SUOI CONTEMPORANEI.</li>
            <li><strong>🌀 PESSIMISTA 🌫 -5</strong> &rarr; CONFRONTO DIRETTO E SENZA PAURA CON LA MORTE.</li>
            <li><strong>🧠 INNOVATORE ⚡ +20</strong> &rarr; RIVOLUZIONA IL LINGUAGGIO POETICO MODERNO.</li>
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
        budget: 1000,
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
