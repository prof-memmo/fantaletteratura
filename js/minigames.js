// Eroi in Viaggio - Mini-giochi Interattivi (v2)
// Impiccato, Puzzle, Cloze, Riordina i versi — con contenuti tematici per missione

(function() {

  // =====================================================
  // DATABASE TEMATICO PER MISSIONE
  // =====================================================

  
  
  const MISSION_DATA = {
    'a1': { // Foscolo
      topic: "Ugo Foscolo",
      impiccato: [
        { word: "SEPOLCRI", hint: "Famoso carme dedicato a Pindemonte" },
        { word: "ORTIS", hint: "Cognome del protagonista delle sue ultime lettere" },
        { word: "ESILIO", hint: "Condizione in cui vive l'ultima parte della vita" },
        { word: "ZACINTO", hint: "Isola greca natale del poeta" }
      ],
      puzzle: [
        { words: ["Né", "più", "mai", "toccherò", "le", "sacre", "sponde"], solution: "Né più mai toccherò le sacre sponde", source: "A Zacinto" },
        { words: ["All'ombra", "de'", "cipressi", "e", "dentro", "l'urne", "confortate", "di", "pianto"], solution: "All'ombra de' cipressi e dentro l'urne confortate di pianto", source: "Dei Sepolcri" },
        { words: ["Il", "sacrificio", "della", "patria", "nostra", "è", "consumato"], solution: "Il sacrificio della patria nostra è consumato", source: "Ultime lettere di Jacopo Ortis" }
      ],
      cloze: [
        {
          text: "Né più mai toccherò le sacre ___ , ove il mio corpo fanciulletto ___.",
          blanks: ["sponde", "giacque"],
          source: "A Zacinto"
        },
        {
          text: "All'ombra de' cipressi e dentro l'urne confortate di ___ è forse il sonno della ___ men duro?",
          blanks: ["pianto", "morte"],
          source: "Dei Sepolcri"
        }
      ],
      versi: [
        {
          title: "A Zacinto",
          lines: [
            "Né più mai toccherò le sacre sponde",
            "ove il mio corpo fanciulletto giacque,",
            "Zacinto mia, che te specchi nell'onde",
            "del greco mar da cui vergine nacque"
          ],
          hint: "Foscolo si rivolge alla sua amata isola natale ricordando la giovinezza e la nascita di Venere."
        }
      ],
      quiz: [
        { q: "Chi è l'autore de 'Le ultime lettere di Jacopo Ortis'?", o: ["Giacomo Leopardi", "Ugo Foscolo", "Alessandro Manzoni", "Giosuè Carducci"], a: 1 },
        { q: "A chi è dedicato il carme 'Dei Sepolcri'?", o: ["Ippolito Pindemonte", "Alessandro Manzoni", "Giacomo Leopardi", "Vincenzo Monti"], a: 0 },
        { q: "Qual è il tema principale di 'A Zacinto'?", o: ["L'esilio", "La guerra", "L'amore non corrisposto", "La morte"], a: 0 },
        { q: "Quale movimento letterario anticipa Foscolo con l'Ortis?", o: ["Neoclassicismo", "Illuminismo", "Romanticismo", "Verismo"], a: 2 },
        { q: "Quale trattato deluse profondamente Foscolo?", o: ["Trattato di Versailles", "Trattato di Campoformio", "Pace di Vienna", "Trattato di Parigi"], a: 1 }
      ]
    },
    'a2': { // Leopardi
      topic: "Giacomo Leopardi",
      impiccato: [
        { word: "INFINITO", hint: "Sempre caro mi fu quest'ermo colle..." },
        { word: "PESSIMISMO", hint: "Visione della vita tipica del poeta" },
        { word: "RECANATI", hint: "Città natale nelle Marche" },
        { word: "ZIBALDONE", hint: "Diario intellettuale e filosofico" }
      ],
      puzzle: [
        { words: ["Sempre", "caro", "mi", "fu", "quest'ermo", "colle"], solution: "Sempre caro mi fu quest'ermo colle", source: "L'Infinito" },
        { words: ["E", "il", "naufragar", "m'è", "dolce", "in", "questo", "mare"], solution: "E il naufragar m'è dolce in questo mare", source: "L'Infinito" },
        { words: ["Silvia", "rimembri", "ancora", "quel", "tempo", "della", "tua", "vita", "mortale"], solution: "Silvia rimembri ancora quel tempo della tua vita mortale", source: "A Silvia" }
      ],
      cloze: [
        {
          text: "Sempre caro mi fu quest'ermo ___ , e questa siepe, che da tanta parte dell'ultimo ___ il guardo esclude.",
          blanks: ["colle", "orizzonte"],
          source: "L'Infinito"
        },
        {
          text: "Silvia, rimembri ancora quel tempo della tua vita mortale, quando beltà splendea negli occhi tuoi ___ e schivi?",
          blanks: ["ridenti"],
          source: "A Silvia"
        }
      ],
      versi: [
        {
          title: "L'Infinito",
          lines: [
            "Sempre caro mi fu quest'ermo colle,",
            "e questa siepe, che da tanta parte",
            "dell'ultimo orizzonte il guardo esclude.",
            "Ma sedendo e mirando, interminati spazi"
          ],
          hint: "Leopardi contempla la siepe sull'ermo colle che stimola l'immaginazione verso gli spazi sconfinati."
        }
      ],
      quiz: [
        { q: "Dove nacque Leopardi?", o: ["Firenze", "Roma", "Recanati", "Napoli"], a: 2 },
        { q: "Qual è la raccolta più celebre di Leopardi?", o: ["I Promessi Sposi", "I Canti", "Le Odi", "I Sepolcri"], a: 1 },
        { q: "Chi è 'Silvia' in 'A Silvia'?", o: ["Sua sorella", "Teresa Fattorini", "Paolina Leopardi", "Silvia Monti"], a: 1 },
        { q: "Come viene definito il pessimismo finale di Leopardi?", o: ["Storico", "Cosmico", "Individuale", "Illusorio"], a: 1 },
        { q: "Quale tra queste NON è un'opera di Leopardi?", o: ["Zibaldone", "Operette morali", "I Malavoglia", "Canti"], a: 2 }
      ]
    },
    'a5': { // Verga
      topic: "Giovanni Verga",
      impiccato: [
        { word: "VERISMO", hint: "Corrente letteraria italiana fondata sull'impersonalità" },
        { word: "MALAVOGLIA", hint: "Romanzo sulla famiglia Toscano di Aci Trezza" },
        { word: "SICILIA", hint: "Regione in cui sono ambientate le opere verghiane" },
        { word: "MALPELO", hint: "Ragazzo dai capelli rossi che lavora nella cava" }
      ],
      puzzle: [
        { words: ["Il", "mare", "non", "ha", "paese", "nemmeno", "lui"], solution: "Il mare non ha paese nemmeno lui", source: "I Malavoglia" },
        { words: ["Malpelo", "si", "chiamava", "così", "perché", "aveva", "i", "capelli", "rossi"], solution: "Malpelo si chiamava così perché aveva i capelli rossi", source: "Rosso Malpelo" },
        { words: ["Tutti", "quelli", "del", "paese", "vivevano", "della", "loro", "fatica"], solution: "Tutti quelli del paese vivevano della loro fatica", source: "Novelle rusticane" }
      ],
      cloze: [
        {
          text: "I ___ sono una famiglia di pescatori che vive nel paese di ___ Trezza.",
          blanks: ["Malavoglia", "Aci"],
          source: "I Malavoglia"
        },
        {
          text: "Malpelo lavorava nella cava di ___ e tutti lo schivavano come un cane ___.",
          blanks: ["rena", "rognoso"],
          source: "Rosso Malpelo"
        }
      ],
      versi: [
        {
          title: "Rosso Malpelo (Incipit)",
          lines: [
            "Malpelo si chiamava così perché aveva i capelli rossi;",
            "ed aveva i capelli rossi perché era un ragazzo malizioso",
            "e cattivo, che prometteva di riescire un fior di birbone."
          ],
          hint: "L'incipit celebre di Rosso Malpelo con la visione corale popolare basata sui pregiudizi."
        }
      ],
      quiz: [
        { q: "Quale corrente letteraria fondò Verga in Italia?", o: ["Neorealismo", "Verismo", "Romanticismo", "Decadentismo"], a: 1 },
        { q: "Come si chiamava la barca dei Malavoglia?", o: ["La Provvidenza", "La Speranza", "Il Destino", "La Fortuna"], a: 0 },
        { q: "Chi scrisse Rosso Malpelo?", o: ["Luigi Pirandello", "Gabriele D'Annunzio", "Giovanni Verga", "Italo Svevo"], a: 2 },
        { q: "In quale paese della Sicilia è ambientato 'I Malavoglia'?", o: ["Palermo", "Catania", "Aci Trezza", "Siracusa"], a: 2 },
        { q: "Quale tecnica narrativa è tipica di Verga?", o: ["Flusso di coscienza", "Impersonalità e regressione", "Monologo interiore", "Prosa poetica"], a: 1 }
      ]
    },
    'a7': { // D'Annunzio
      topic: "Gabriele D'Annunzio",
      impiccato: [
        { word: "ESTETISMO", hint: "Il culto della bellezza come regola di vita" },
        { word: "PIACERE", hint: "Celebre romanzo con protagonista Andrea Sperelli" },
        { word: "VATE", hint: "Soprannome con cui era chiamato D'Annunzio" },
        { word: "PANISMO", hint: "Fusione dell'uomo con la natura circostante" }
      ],
      puzzle: [
        { words: ["Ascolta", "piove", "dalle", "nuvole", "sparse", "sui", "mirti", "divini"], solution: "Ascolta piove dalle nuvole sparse sui mirti divini", source: "La pioggia nel pineto" },
        { words: ["Bisogna", "fare", "della", "propria", "vita", "un'opera", "d'arte"], solution: "Bisogna fare della propria vita un'opera d'arte", source: "Il Piacere" },
        { words: ["Taci", "su", "le", "soglie", "del", "bosco", "non", "odo", "parole", "umane"], solution: "Taci su le soglie del bosco non odo parole umane", source: "La pioggia nel pineto" }
      ],
      cloze: [
        {
          text: "Taci. Su le soglie del ___ , non odo parole che dici ___ ma odo parole più nuove.",
          blanks: ["bosco", "umane"],
          source: "La pioggia nel pineto"
        },
        {
          text: "Andrea Sperelli era un giovane gentiluomo che voleva fare della propria vita un'opera d' ___ .",
          blanks: ["arte"],
          source: "Il Piacere"
        }
      ],
      versi: [
        {
          title: "La pioggia nel pineto",
          lines: [
            "Taci. Su le soglie",
            "del bosco non odo",
            "parole che dici umane;",
            "ma odo parole più nuove"
          ],
          hint: "L'inizio dell'incantesimo naturale tra il poeta ed Ermione nella pineta della Versilia."
        }
      ],
      quiz: [
        { q: "Come era soprannominato D'Annunzio?", o: ["Il Vate", "Il Maestro", "Il Profeta", "Il Sommo"], a: 0 },
        { q: "Quale romanzo introduce l'Estetismo in Italia?", o: ["Il Piacere", "I Malavoglia", "La Coscienza di Zeno", "Il fu Mattia Pascal"], a: 0 },
        { q: "A chi è dedicata 'La pioggia nel pineto'?", o: ["Beatrice", "Laura", "Ermione", "Silvia"], a: 2 },
        { q: "Dove costruì la sua dimora monumentale, il Vittoriale?", o: ["Pescara", "Gardone Riviera", "Roma", "Fiume"], a: 1 },
        { q: "Qual è il tema principale dell'Estetismo?", o: ["Il culto della scienza", "Il culto della bellezza", "L'impegno politico", "La denuncia sociale"], a: 1 }
      ]
    },
    'a8': { // Pirandello
      topic: "Luigi Pirandello",
      impiccato: [
        { word: "MASCHERA", hint: "Rappresenta le diverse forme che assumiamo in società" },
        { word: "PASCAL", hint: "Il fu Mattia..." },
        { word: "UMORISMO", hint: "Il sentimento del contrario teorizzato dallo scrittore" },
        { word: "GIRGENTI", hint: "Città natale in Sicilia (attuale Agrigento)" }
      ],
      puzzle: [
        { words: ["Imparerai", "che", "incontrerai", "tante", "maschere", "e", "pochi", "volti"], solution: "Imparerai che incontrerai tante maschere e pochi volti", source: "Uno, nessuno e centomila" },
        { words: ["La", "vita", "non", "conclude", "e", "non", "sa", "di", "nomi"], solution: "La vita non conclude e non sa di nomi", source: "Uno, nessuno e centomila" },
        { words: ["Ciascuno", "di", "noi", "crede", "d'essere", "uno", "ma", "è", "centomila"], solution: "Ciascuno di noi crede d'essere uno ma è centomila", source: "Uno, nessuno e centomila" }
      ],
      cloze: [
        {
          text: "Imparerai a tue spese che nel lungo tragitto della vita incontrerai tante ___ e pochi ___.",
          blanks: ["maschere", "volti"],
          source: "Uno, nessuno e centomila"
        },
        {
          text: "L'umorismo consiste nel sentimento del ___ , nato dalla riflessione.",
          blanks: ["contrario"],
          source: "L'Umorismo"
        }
      ],
      versi: [
        {
          title: "Uno, nessuno e centomila (Finale)",
          lines: [
            "La vita non conclude.",
            "E non sa di nomi, la vita.",
            "Quest'albero, respiro trèmulo di foglie nuove.",
            "Io sono quest'albero, quest'albero, nuvola; fiumicello;"
          ],
          hint: "Il protagonista Vitangelo Moscarda abbandona ogni identità per rinascere ogni attimo nella natura."
        }
      ],
      quiz: [
        { q: "Quale premio Nobel ricevette Pirandello?", o: ["Medicina", "Pace", "Letteratura", "Fisica"], a: 2 },
        { q: "Quale concetto è fondamentale nella poetica pirandelliana?", o: ["La fanciullezza", "La maschera", "La natura", "L'esilio"], a: 1 },
        { q: "Chi è il protagonista di 'Uno, nessuno e centomila'?", o: ["Mattia Pascal", "Vitangelo Moscarda", "Zeno Cosini", "Andrea Sperelli"], a: 1 },
        { q: "Cosa si intende per 'Umorismo' in Pirandello?", o: ["Una barzelletta", "Il sentimento del contrario", "La parodia", "La commedia dell'arte"], a: 1 },
        { q: "Quanti sono i personaggi in cerca d'autore nella famosa opera teatrale?", o: ["Due", "Quattro", "Sei", "Otto"], a: 2 }
      ]
    },
    'mixed': {
      topic: "Sfida Casuale Mista",
      impiccato: [],
      puzzle: [],
      cloze: [],
      versi: [],
      quiz: []
    }
  };

  // Contenuto di default per missioni senza dati specifici
  const DEFAULT_DATA = {
    topic: "Epica Classica e Medievale",
    impiccato: [
      { word: "ACHILLE", hint: "Il più forte guerriero greco dell'Iliade" },
      { word: "ODISSEA", hint: "Poema omerico sul ritorno di Ulisse" },
      { word: "ILIADE", hint: "Poema omerico sulla guerra di Troia" },
      { word: "ENEIDE", hint: "Poema epico latino di Virgilio" },
      { word: "ULISSE", hint: "Re di Itaca dal multiforme ingegno" },
      { word: "ETTORE", hint: "Il più grande eroe troiano" },
      { word: "OMERO", hint: "Il leggendario aedo greco cieco" },
      { word: "VIRGILIO", hint: "Il sommo poeta romano autore dell'Eneide" },
      { word: "ENEA", hint: "L'eroe troiano fondatore della stirpe romana" },
      { word: "DIDONE", hint: "La regina fenicia di Cartagine" },
      { word: "TROIA", hint: "La città assediata per dieci anni dagli Achei" },
      { word: "ORLANDO", hint: "Il più valoroso paladino di Carlo Magno" },
      { word: "DURENDAL", hint: "La spada indistruttibile di Orlando" },
      { word: "CAMELOT", hint: "Il regno di Re Artù e la Tavola Rotonda" },
      { word: "EXCALIBUR", hint: "La spada leggendaria di Re Artù" },
      { word: "PROMETEO", hint: "Il titano che donò il fuoco agli uomini" },
      { word: "POSEIDONE", hint: "Dio del mare e nemico di Ulisse" },
      { word: "GALAHAD", hint: "Il cavaliere puro che trovò il Santo Graal" },
      { word: "MINOTAURO", hint: "Il mostro metà uomo metà toro del labirinto" },
      { word: "PENELOPE", hint: "La moglie fedele che tesse e distesse la tela" }
    ],
    puzzle: [
      { words: ["Cantami", "o", "Diva", "del", "pelide", "Achille", "l'ira", "funesta"], solution: "Cantami o Diva del pelide Achille l'ira funesta", source: "Proemio dell'Iliade" },
      { words: ["Canto", "le", "armi", "e", "l'uomo", "che", "per", "primo", "giunse", "in", "Italia"], solution: "Canto le armi e l'uomo che per primo giunse in Italia", source: "Proemio dell'Eneide" },
      { words: ["Dimmi", "o", "Musa", "dell'eroe", "dai", "mille", "artifici", "che", "a", "lungo", "errò"], solution: "Dimmi o Musa dell'eroe dai mille artifici che a lungo errò", source: "Proemio dell'Odissea" },
      { words: ["Ulisse", "legò", "se", "stesso", "all'albero", "per", "ascoltare", "le", "Sirene", "senza", "morire"], solution: "Ulisse legò se stesso all'albero per ascoltare le Sirene senza morire", source: "L'Odissea" },
      { words: ["Enea", "fuggì", "da", "Troia", "portando", "il", "padre", "Anchise", "sulle", "spalle"], solution: "Enea fuggì da Troia portando il padre Anchise sulle spalle", source: "L'Eneide" }
    ],
    cloze: [
      { text: "Cantami, o ___ , del pelide ___ l'ira ___ che infiniti addusse lutti agli ___.", blanks: ["Diva", "Achille", "funesta", "Achei"], source: "Proemio dell'Iliade" },
      { text: "Ulisse era re di ___ ed era famoso per il suo ___ ingegno. Tornò a casa dopo ___ anni di viaggio.", blanks: ["Itaca", "multiforme", "dieci"], source: "L'Odissea" },
      { text: "Enea fuggì da ___ in fiamme portando sulle spalle il padre ___ e tenendo per mano il figlio ___.", blanks: ["Troia", "Anchise", "Ascanio"], source: "L'Eneide" },
      { text: "Il ___ è un racconto tramandato che spiega l'origine di eventi naturali. La ___ invece mescola elementi di fantasia con la ___.", blanks: ["mito", "leggenda", "realtà"], source: "Definizioni" }
    ],
    versi: [
      { title: "Proemio dell'ILIADE", lines: ["Cantami, o Diva, del pelide Achille", "l'ira funesta che infiniti addusse", "lutti agli Achei, molte anzi tempo all'Orco", "generose travolse alme d'eroi."], hint: "Il proemio annuncia il tema: l'ira di Achille. Inizia con l'invocazione alla Musa." },
      { title: "Proemio dell'ODISSEA", lines: ["Dimmi, o Musa, dell'eroe multiforme,", "che tanto vagò, dopo che distrusse", "la rocca sacra di Troia:", "di molti uomini vide le città e conobbe i costumi."], hint: "Il proemio enuncia il viaggio dell'eroe astuto. Il tema è il nostos, il ritorno." },
      { title: "Proemio dell'ENEIDE", lines: ["Canto le armi e l'uomo che per primo", "dalle coste di Troia, profugo per decreto del fato,", "giunse in Italia e al lido di Lavinio;", "molto fu sballottato per terra e per mare."], hint: "Il proemio dell'Eneide: armi, uomo, destino, Roma." }
    ]
  };

  function getData(missionId) {
      if (missionId === 'mixed') {
          // Build mixed data dynamically from MISSION_DATA and window.revealedAuthors
          let mixedData = {
              topic: "Sfida Casuale Mista",
              impiccato: [],
              puzzle: [],
              cloze: [],
              versi: [],
              quiz: []
          };
          
          let validAuthors = window.revealedAuthors ? window.revealedAuthors.map(a => a.id) : Object.keys(MISSION_DATA);
          if(validAuthors.length === 0) validAuthors = ['a1', 'a2', 'a3', 'a4', 'a5']; // Fallback
          
          for(let aid of validAuthors) {
              if(MISSION_DATA[aid] && aid !== 'mixed') {
                  if(MISSION_DATA[aid].impiccato) mixedData.impiccato.push(...MISSION_DATA[aid].impiccato);
                  if(MISSION_DATA[aid].puzzle) mixedData.puzzle.push(...MISSION_DATA[aid].puzzle);
                  if(MISSION_DATA[aid].cloze) mixedData.cloze.push(...MISSION_DATA[aid].cloze);
                  if(MISSION_DATA[aid].versi) mixedData.versi.push(...MISSION_DATA[aid].versi);
                  if(MISSION_DATA[aid].quiz) mixedData.quiz.push(...MISSION_DATA[aid].quiz);
              }
          }
          
          // Shuffle them so it's really random
          const shuffle = (array) => {
              for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
              }
          };
          shuffle(mixedData.impiccato);
          shuffle(mixedData.puzzle);
          shuffle(mixedData.cloze);
          shuffle(mixedData.versi);
          shuffle(mixedData.quiz);
          
          return mixedData;
      }
      return MISSION_DATA[missionId] || MISSION_DATA['a1'];
  }

  // =====================================================
  // STATO CORRENTE
  // =====================================================
  let currentMinigame = null;
  let currentMissionId = null;
  let impiccatoState = {};
  let puzzleState = {};
  let clozeState = {};
  let versiState = {};


  // =====================================================
  // API PUBBLICA
  // =====================================================
  window.EroiMinigames = {
    isMancheMode: false,
    mancheGames: [],
    mancheScore: 0,
    quizState: { questions: [], current: 0, score: 0 },
    
    // Nuove variabili per coda turni squadre
    gameQueue: [],
    currentTurnIndex: 0,
    tempSelectedType: null,
    tempMissionId: null,

    openTeamSelection: async function(type, missionId) {
        this.tempSelectedType = type;
        this.tempMissionId = missionId;
        
        const listDiv = document.getElementById('team-selector-list');
        const modal = document.getElementById('team-selector-modal');
        if (!listDiv || !modal) {
            // Fallback se la UI manca
            if (type === 'manche') this.startMancheLegacy(missionId);
            else this.startMinigameDirect(type, missionId);
            return;
        }

        modal.style.display = 'flex';
        listDiv.innerHTML = '<div style="text-align:center; padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Caricamento...</div>';

        try {
            const allTeams = window.fanta_db ? await window.fanta_db.getTeams() : [];
            const myTeams = allTeams.filter(t => t.ownerEmail === window.currentUserEmail);
            
            if (myTeams.length === 0) {
                listDiv.innerHTML = '<p style="font-size:0.8rem; color:var(--text-muted); text-align:center;">Nessuna squadra disponibile. Crea una squadra dal tuo profilo per poter giocare.</p>';
                return;
            }

            listDiv.innerHTML = myTeams.map(t => `
                <label style="display:flex; align-items:center; gap:10px; background:rgba(212,175,55,0.05); padding:10px; border:1px solid rgba(212,175,55,0.2); border-radius:8px; cursor:pointer;">
                    <input type="checkbox" class="team-selector-checkbox" value="${t.id}" data-name="${t.name}" checked>
                    <span style="font-weight:bold; color:var(--text-light);">${t.name}</span>
                </label>
            `).join('');

        } catch (e) {
            console.error("Errore caricamento squadre per minigioco", e);
            listDiv.innerHTML = '<p style="color:red; font-size:0.8rem;">Errore caricamento squadre.</p>';
        }
    },

    confirmTeamSelection: function() {
        const checkboxes = document.querySelectorAll('.team-selector-checkbox:checked');
        if (checkboxes.length === 0) {
            alert("Seleziona almeno una squadra per iniziare.");
            return;
        }

        const selectedTeams = Array.from(checkboxes).map(cb => ({
            id: cb.value,
            name: cb.dataset.name
        }));

        document.getElementById('team-selector-modal').style.display = 'none';
        this.buildGameQueue(this.tempSelectedType, this.tempMissionId, selectedTeams);
    },

    buildGameQueue: function(type, missionId, teams) {
        this.gameQueue = [];
        this.currentTurnIndex = 0;
        this.isMancheMode = (type === 'manche');

        if (type === 'manche') {
            const games = ['quiz', 'impiccato', 'cloze', 'puzzle', 'versi'];
            teams.forEach(t => {
                games.forEach(g => {
                    this.gameQueue.push({ teamId: t.id, teamName: t.name, game: g, missionId: missionId });
                });
            });
        } else {
            teams.forEach(t => {
                this.gameQueue.push({ teamId: t.id, teamName: t.name, game: type, missionId: missionId });
            });
        }

        // Shuffle queue
        for (let i = this.gameQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.gameQueue[i], this.gameQueue[j]] = [this.gameQueue[j], this.gameQueue[i]];
        }

        this.playNextInQueue();
    },

    playNextInQueue: function() {
        if (this.currentTurnIndex >= this.gameQueue.length) {
            this.isMancheMode = false;
            const content = document.getElementById('minigame-content');
            if (content) {
                content.innerHTML = `<div style="text-align:center; padding: 30px;">
                    <h2 style="color:var(--accent-gold); font-size:2rem; margin-bottom:15px;">🎉 TUTTI I TURNI COMPLETATI!</h2>
                    <p style="font-size:1.2rem; color:#fff;">Le squadre hanno terminato i minigiochi.</p>
                    <button class="btn" style="background:#16a34a; color:#fff; margin-top:20px;" onclick="window.EroiMinigames.closeMinigame()">Chiudi</button>
                </div>`;
            }
            const banner = document.getElementById('minigame-turn-banner');
            if (banner) banner.style.display = 'none';
            return;
        }

        const turn = this.gameQueue[this.currentTurnIndex];
        
        const banner = document.getElementById('minigame-turn-banner');
        const bannerTeam = document.getElementById('minigame-turn-team');
        if (banner && bannerTeam) {
            banner.style.display = 'block';
            bannerTeam.textContent = turn.teamName;
        }

        this.mancheScore = 0; // reset
        this.startMinigameDirect(turn.game, turn.missionId);
    },

    startMinigame: function(type, missionId) {
        if (window.currentUserRole !== 'docente' && window.currentUserRole !== 'admin') {
            this.startMinigameDirect(type, missionId);
            return;
        }
        this.openTeamSelection(type, missionId);
    },

    startManche: function(authorId) {
        if (window.currentUserRole !== 'docente' && window.currentUserRole !== 'admin') {
            this.startMancheLegacy(authorId);
            return;
        }
        this.openTeamSelection('manche', authorId);
    },

    startMinigameDirect: function(type, missionId) {
      currentMissionId = missionId || null;
      const data = getData(missionId);

      const container = document.getElementById('minigame-container');
      const content = document.getElementById('minigame-content');
      const title = document.getElementById('minigame-title');
      if (!container || !content) return;

      content.innerHTML = '';
      container.style.display = 'flex';
      currentMinigame = type;
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Label del topic
      const topicBadge = data.topic ? `<span style="font-size:0.75rem; background:rgba(141,160,63,0.15); border:1px solid rgba(141,160,63,0.4); padding:3px 10px; border-radius:6px; color:#f5c53c; font-weight:600; text-transform:none;">${data.topic}</span>` : '';

      const typeLabels = {
        quiz: '❓ Quiz Letterario',
        impiccato: '🎭 L\'Impiccato',
        puzzle: '🧩 Ricostruisci la Citazione',
        cloze: '📝 Testo Bucato (Cloze)',
        versi: '📜 Riordina i Versi'
      };
      title.innerHTML = `<span style="color:#f5c53c;">${this.isMancheMode ? '🏆 MANCHE COMPLETA - ' : ''}${typeLabels[type] || type}</span> ${topicBadge}`;

      switch(type) {
        case 'impiccato': this.initImpiccato(content, data); break;
        case 'puzzle':    this.initPuzzle(content, data); break;
        case 'cloze':     this.initCloze(content, data); break;
        case 'versi':     this.initVersi(content, data); break;
        case 'quiz':      this.initQuiz(content, data); break;
      }
    },

    startMancheLegacy: function(authorId) {
      this.isMancheMode = true;
      this.mancheGames = ['quiz', 'impiccato', 'cloze', 'puzzle', 'versi'];
      this.mancheScore = 0;
      this.nextMancheGame(authorId);
    },

    nextMancheGame: function(authorId) {
      if (this.mancheGames.length === 0) {
        this.isMancheMode = false;
        const xp = Math.min(20, this.mancheScore);
        
        const content = document.getElementById('minigame-content');
        if (content) {
            content.innerHTML = `
                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:25px; padding: 25px 15px; text-align:center;">
                    <img src="assets/maestro.png" alt="Il Maestro" style="max-height:220px; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.6));">
                    <div style="max-width:450px;">
                        <h2 style="color:#f5c53c; font-size:1.8rem; margin-bottom:10px; font-family:var(--font-heading);">🎉 MANCHE COMPLETATA!</h2>
                        <p style="font-size:1.05rem; color:#f5f5f0; line-height:1.4; margin-bottom:15px;">Congratulazioni! Hai completato tutte le prove letterarie di questa manche.</p>
                        <div style="font-size:2.6rem; font-weight:bold; color:#16a34a; margin:15px 0;">+${xp} PUNTI</div>
                        <button class="btn" style="background:#16a34a !important; color:#fff !important; width:auto; padding:10px 24px; border-radius:10px;" onclick="EroiMinigames.finalizeMancheReward(${xp})">Riscuoti Punti Squadra</button>
                    </div>
                </div>`;
        }
        return;
      }
      const nextGame = this.mancheGames.shift();
      this.startMinigameDirect(nextGame, authorId);
    },

    finalizeMancheReward: function(xp) {
        this.assignPointsToTeamLegacy(xp);
        this.closeMinigame();
    },

    assignPointsToTeam: async function(xp) {
        const isQueueActive = (this.gameQueue && this.gameQueue.length > 0 && this.currentTurnIndex < this.gameQueue.length);

        if (isQueueActive) {
            const currentTurn = this.gameQueue[this.currentTurnIndex];
            
            if (currentTurn.game === 'versi') {
                alert(`Hai terminato il minigioco 'Versi'. Assegna MANUALMENTE i punti alla ${currentTurn.teamName} dal tuo pannello LIM.`);
                if (window.fanta_db && window.fanta_db.saveMinigameLog) {
                    window.fanta_db.saveMinigameLog({
                        teamId: currentTurn.teamId,
                        teamName: currentTurn.teamName,
                        game: currentTurn.game,
                        points: 0
                    });
                }
            } else {
                try {
                    const doc = await window.db.collection('fanta_teams').doc(currentTurn.teamId).get();
                    if(doc.exists) {
                        const t = doc.data();
                        await window.db.collection('fanta_teams').doc(currentTurn.teamId).update({
                            points: (t.points || 0) + xp
                        });
                        alert(`+${xp} Punti assegnati AUTOMATICAMENTE a ${currentTurn.teamName}!`);
                        
                        // Salva nel log
                        if (window.fanta_db && window.fanta_db.saveMinigameLog) {
                            window.fanta_db.saveMinigameLog({
                                teamId: currentTurn.teamId,
                                teamName: currentTurn.teamName,
                                game: currentTurn.game,
                                points: xp
                            });
                        }
                    }
                } catch(e) {
                    console.error("Errore aggiornamento punti", e);
                    alert(`Errore nell'assegnazione automatica a ${currentTurn.teamName}. Assegnali manualmente.`);
                }
            }
            
            this.currentTurnIndex++;
            this.playNextInQueue();
            return;
        }

        this.assignPointsToTeamLegacy(xp);
    },

    assignPointsToTeamLegacy: function(xp) {
        if (window.currentUserRole === 'studente' && window.currentUserTeamId && window.db) {
            window.db.collection('fanta_teams').doc(window.currentUserTeamId).get().then(doc => {
                if(doc.exists) {
                    const t = doc.data();
                    window.db.collection('fanta_teams').doc(t.id).update({
                        points: (t.points || 0) + xp
                    });
                    if(window.showToast) {
                        window.showToast(`+${xp} Punti guadagnati per la tua squadra!`, 'success');
                    } else {
                        alert(`+${xp} Punti guadagnati per la tua squadra!`);
                    }
                }
            });
        } else if (window.currentUserRole === 'docente' || window.currentUserRole === 'admin') {
            alert(`+${xp} Punti per la squadra selezionata. (Assegnali manualmente dal pannello LIM).`);
        }
    },

    closeMinigame: function() {
      const container = document.getElementById('minigame-container');
      if (container) container.style.display = 'none';
      const content = document.getElementById('minigame-content');
      if (content) content.innerHTML = '';
      const banner = document.getElementById('minigame-turn-banner');
      if (banner) banner.style.display = 'none';
      
      currentMinigame = null;
      this.isMancheMode = false;
      this.gameQueue = [];
      this.currentTurnIndex = 0;
    },

    // =====================================================
    // QUIZ
    // =====================================================
    initQuiz: function(container, data) {
        let pool = data.quiz || [];
        if (pool.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-muted);">Nessun quiz disponibile per questo autore.</p>';
            return;
        }
        
        // Take up to 10 questions
        this.quizState.questions = pool.slice(0, 10);
        this.quizState.current = 0;
        this.quizState.score = 0;
        
        this.renderQuizQuestion(container);
    },
    
    renderQuizQuestion: function(container) {
        if (this.quizState.current >= this.quizState.questions.length) {
            this.endQuiz(container);
            return;
        }
        
        let qData = this.quizState.questions[this.quizState.current];
        const missionKey = `quiz_${currentMissionId || 'general'}_q${this.quizState.current}`;
        if (window.LiveEditor && typeof window.LiveEditor.apply === 'function') {
            qData = window.LiveEditor.apply(missionKey, qData);
        }
        const editBtn = (window.LiveEditor && typeof window.LiveEditor.renderBtn === 'function')
            ? window.LiveEditor.renderBtn(missionKey, { q: qData.q })
            : '';

        const progress = `Domanda ${this.quizState.current + 1} di ${this.quizState.questions.length}`;
        
        const optionsHtml = qData.o.map((opt, idx) => `
            <button class="btn btn-secondary" style="display:block; width:100%; text-align:left; margin-bottom:10px; padding:12px 16px; font-size:0.95rem; white-space:normal; height:auto; line-height:1.4; border-radius:10px; background:rgba(35,40,25,0.7) !important;" onclick="EroiMinigames.answerQuiz(${idx})">
                <span style="display:inline-block; width:24px; height:24px; line-height:22px; text-align:center; border-radius:50%; background:rgba(141,160,63,0.2); border:1px solid #8da03f; color:#f5f5f0; font-size:0.75rem; margin-right:8px; font-weight:bold;">${String.fromCharCode(65 + idx)}</span>
                ${opt}
            </button>
        `).join('');
        
        container.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:25px; align-items:center; justify-content:center; max-width:900px; margin:0 auto;">
                <div style="text-align:center; min-width:140px; max-width:180px; flex-shrink:0;">
                    <img src="assets/maestro.png" alt="Il Maestro" style="max-height:240px; width:auto; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.6));">
                </div>
                <div style="flex:1; min-width:280px;">
                    <div style="font-size:0.8rem; color:#f5c53c; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">${progress}</div>
                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(141,160,63,0.2); border-radius:12px; padding:16px; margin-bottom:16px;">
                        <h3 style="color:#fff; font-size:1.15rem; margin:0; line-height:1.45; font-family:var(--font-heading);">${qData.q} ${editBtn}</h3>
                    </div>
                    <div>${optionsHtml}</div>
                </div>
            </div>
        `;
    },
    
    answerQuiz: function(selectedIdx) {
        const qData = this.quizState.questions[this.quizState.current];
        if (selectedIdx === qData.a) {
            this.quizState.score++;
        }
        this.quizState.current++;
        this.renderQuizQuestion(document.getElementById('minigame-content'));
    },
    
    endQuiz: function(container) {
        const total = this.quizState.questions.length;
        const correct = this.quizState.score;
        let points = (correct >= total / 2) ? 2 : 0;
        if (this.isMancheMode) points = Math.round((correct / total) * 5); // up to 5 points for manche
        
        container.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:25px; padding:20px; text-align:center;">
                <img src="assets/maestro.png" alt="Il Maestro" style="max-height:220px; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.6));">
                <div style="max-width:400px;">
                    <h3 style="color:#f5c53c; font-size:1.6rem; margin-bottom:10px; font-family:var(--font-heading);">Quiz Terminato!</h3>
                    <p style="font-size:1.1rem; color:#fff; margin-bottom:15px;">Hai risposto correttamente a <strong>${correct}</strong> domande su ${total}.</p>
                    ${points > 0 ? `<div style="color:#16a34a; font-weight:bold; font-size:1.15rem; margin-bottom:18px;">🎉 Ottima prova! Punti guadagnati: +${points}</div>` : `<div style="color:#ef4444; font-weight:bold; font-size:1.1rem; margin-bottom:18px;">Non hai superato il punteggio minimo. Riprova!</div>`}
                    <button class="btn" style="width:auto; padding:10px 24px; border-radius:8px;" onclick="EroiMinigames.rewardAndNext('quiz', ${points}, 0)">Continua</button>
                </div>
            </div>
        `;
    },
    // =====================================================
    // IMPICCATO
    // =====================================================
    initImpiccato: function(container, data) {
      const pool = data.impiccato && data.impiccato.length ? data.impiccato : DEFAULT_DATA.impiccato;
      const wordData = pool[Math.floor(Math.random() * pool.length)];
      impiccatoState = { word: wordData.word, hint: wordData.hint, guessed: new Set(), wrongGuesses: 0, maxWrong: 7 };
      this.renderImpiccato(container);
    },

    renderImpiccato: function(container) {
      const s = impiccatoState;
      const word = s.word;

      // Tratti SVG definiti con colore oro brillante e spessore solido
      const parts = [
        '',
        '<line x1="20" y1="135" x2="130" y2="135" stroke="#8da03f" stroke-width="4" stroke-linecap="round"/>',
        '<line x1="45" y1="135" x2="45" y2="15" stroke="#8da03f" stroke-width="4" stroke-linecap="round"/>',
        '<line x1="45" y1="15" x2="105" y2="15" stroke="#8da03f" stroke-width="4" stroke-linecap="round"/><line x1="45" y1="35" x2="65" y2="15" stroke="#8da03f" stroke-width="3"/>',
        '<line x1="105" y1="15" x2="105" y2="35" stroke="#f5c53c" stroke-width="3" stroke-linecap="round"/>',
        '<circle cx="105" cy="48" r="13" stroke="#f5c53c" stroke-width="3" fill="none"/>',
        '<line x1="105" y1="61" x2="105" y2="95" stroke="#f5c53c" stroke-width="3" stroke-linecap="round"/><line x1="105" y1="72" x2="88" y2="88" stroke="#f5c53c" stroke-width="3" stroke-linecap="round"/><line x1="105" y1="72" x2="122" y2="88" stroke="#f5c53c" stroke-width="3" stroke-linecap="round"/>',
        '<line x1="105" y1="95" x2="88" y2="120" stroke="#f5c53c" stroke-width="3" stroke-linecap="round"/><line x1="105" y1="95" x2="122" y2="120" stroke="#f5c53c" stroke-width="3" stroke-linecap="round"/>'
      ];

      let svg = '';
      for (let i = 0; i <= s.wrongGuesses && i < parts.length; i++) svg += parts[i];

      const wordDisplay = word.split('').map(l => 
        s.guessed.has(l)
          ? `<span style="display:inline-block; min-width:28px; font-size:1.8rem; font-family:var(--font-heading); color:#f5c53c; border-bottom:3px solid #f5c53c; margin:0 4px; font-weight:bold;">${l}</span>`
          : `<span style="display:inline-block; min-width:28px; font-size:1.8rem; color:var(--text-muted); border-bottom:3px solid rgba(255,255,255,0.3); margin:0 4px;">&nbsp;</span>`
      ).join('');

      const wrongLetters = [...s.guessed].filter(l => !word.includes(l));
      const won = word.split('').every(l => s.guessed.has(l));
      const lost = s.wrongGuesses >= s.maxWrong;

      const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      let kb = '<div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:16px;">';
      alpha.forEach(l => {
        const isGuessed = s.guessed.has(l);
        const isWrong = isGuessed && !word.includes(l);
        const isOk = isGuessed && word.includes(l);
        let st = 'min-width:38px; height:38px; border-radius:8px; font-weight:bold; font-size:0.9rem; cursor:pointer; border:1px solid; transition:all 0.2s;';
        if (isWrong)   st += 'background:rgba(239,68,68,0.25); border-color:#ef4444; color:#ef4444;';
        else if (isOk) st += 'background:rgba(22,163,74,0.25); border-color:#16a34a; color:#16a34a;';
        else           st += 'background:rgba(255,255,255,0.05); border-color:rgba(141,160,63,0.3); color:#f5f5f0;';
        kb += `<button style="${st}" ${isGuessed||won||lost?'disabled':''} onclick="EroiMinigames.guessLetter('${l}')">${l}</button>`;
      });
      kb += '</div>';

      let result = '';
      if (won) {
        result = `<div style="background:rgba(22,163,74,0.15); border:1px solid #16a34a; border-radius:12px; padding:16px; text-align:center; margin-top:16px;">
          <div style="color:#16a34a; font-weight:bold; font-size:1.2rem; font-family:var(--font-heading);">🎉 Complimenti! Hai indovinato la parola!</div>
          <button class="btn" style="margin-top:12px; width:auto; padding:8px 20px;" onclick="EroiMinigames.rewardAndNext('impiccato',20,10)">Nuova parola</button>
        </div>`;
      } else if (lost) {
        result = `<div style="background:rgba(239,68,68,0.12); border:1px solid #ef4444; border-radius:12px; padding:16px; text-align:center; margin-top:16px;">
          <div style="color:#ef4444; font-weight:bold; font-size:1.1rem;">💀 Peccato! La parola era: <strong style="color:#f5c53c; letter-spacing:1px;">${word}</strong></div>
          <button class="btn btn-secondary" style="margin-top:12px; width:auto; padding:8px 20px;" onclick="EroiMinigames.retryImpiccato()">Riprova</button>
        </div>`;
      }

      container.innerHTML = `
        <div style="display:grid; grid-template-columns: minmax(160px, 200px) 1fr; gap:20px; align-items:center;">
          <div style="text-align:center; background:rgba(0,0,0,0.4); border-radius:12px; padding:15px; border:1px solid rgba(141,160,63,0.3);">
            <svg width="150" height="150" viewBox="0 0 150 150" style="display:block; margin:0 auto;">${svg}</svg>
            <div style="margin-top:10px; font-size:0.85rem; font-weight:bold; color:${s.wrongGuesses >= 5 ? '#ef4444' : '#f5c53c'};">Errori: ${s.wrongGuesses}/${s.maxWrong}</div>
          </div>
          <div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(141,160,63,0.3); border-radius:10px; padding:12px 16px; margin-bottom:15px; font-size:0.9rem; color:#f5f5f0; display:flex; justify-content:space-between; align-items:center;">
              <div>💡 Indizio: <em>${s.hint}</em></div>
              ${(window.LiveEditor && typeof window.LiveEditor.renderBtn === 'function') ? window.LiveEditor.renderBtn(`impiccato_${currentMissionId || 'general'}`, { word: s.word, hint: s.hint, text: s.hint }) : ''}
            </div>
            <div style="text-align:center; padding:16px 0; letter-spacing:4px; margin-bottom:8px;">${wordDisplay}</div>
            ${wrongLetters.length ? `<div style="font-size:0.82rem; color:#ef4444; margin-bottom:8px; text-align:center; font-weight:600;">Lettere errate: ${wrongLetters.join(', ')}</div>` : ''}
            ${kb}
          </div>
        </div>
        ${result}`;
    },

    guessLetter: function(l) {
      if (!impiccatoState.word) return;
      impiccatoState.guessed.add(l);
      if (!impiccatoState.word.includes(l)) impiccatoState.wrongGuesses++;
      const c = document.getElementById('minigame-content');
      if (c) this.renderImpiccato(c);
    },

    retryImpiccato: function() {
      const data = getData(currentMissionId);
      const c = document.getElementById('minigame-content');
      if (c) this.initImpiccato(c, data);
    },

    // =====================================================
    // PUZZLE (riordina frase)
    // =====================================================
    initPuzzle: function(container, data) {
      const pool = data.puzzle && data.puzzle.length ? data.puzzle : DEFAULT_DATA.puzzle;
      const ex = pool[Math.floor(Math.random() * pool.length)];
      const wordsList = ex.words && ex.words.length ? ex.words : (ex.solution ? ex.solution.split(' ') : ['Letteratura', 'Italiana']);
      const shuffled = [...wordsList].sort(() => Math.random() - 0.5);
      puzzleState = { ex: { ...ex, words: wordsList, solution: ex.solution || wordsList.join(' ') }, shuffled, selected: [], remaining: [...shuffled] };
      this.renderPuzzle(container);
    },

    renderPuzzle: function(container) {
      const s = puzzleState;
      const correct = s.selected.join(' ').toLowerCase() === s.ex.solution.toLowerCase();

      const sel = s.selected.length
        ? s.selected.map((w,i) => `<span style="display:inline-block; background:rgba(141,160,63,0.25); border:1px solid #8da03f; border-radius:8px; padding:6px 14px; margin:4px; font-weight:bold; cursor:pointer; color:#f5f5f0; box-shadow:0 2px 6px rgba(0,0,0,0.3);" onclick="EroiMinigames.puzzleRemove(${i})">${w} <i class="fa-solid fa-xmark" style="font-size:0.7rem; opacity:0.7; margin-left:4px;"></i></span>`).join('')
        : '<span style="color:var(--text-muted); font-style:italic;">Clicca le parole in basso nell\'ordine corretto per ricostruire la citazione...</span>';

      const rem = s.remaining.map((w,i) =>
        `<button class="btn btn-secondary" style="display:inline-block; width:auto; background:rgba(255,255,255,0.05) !important; border:1px solid rgba(141,160,63,0.3) !important; border-radius:8px; padding:7px 14px; margin:4px; font-weight:bold; color:#f5f5f0; cursor:pointer; font-size:0.9rem;"
         onclick="EroiMinigames.puzzleAdd(${i})">${w}</button>`
      ).join('');

      const resultHtml = correct ? `
        <div style="background:rgba(22,163,74,0.15); border:1px solid #16a34a; border-radius:12px; padding:16px; text-align:center; margin-top:16px;">
          <div style="color:#16a34a; font-weight:bold; font-size:1.15rem; font-family:var(--font-heading);">✅ Perfetto! Citazione ricostruita!</div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-top:5px;">Fonte: <em>${s.ex.source || 'Opera Letteraria'}</em></div>
          <button class="btn" style="margin-top:12px; width:auto; padding:8px 20px;" onclick="EroiMinigames.rewardAndNext('puzzle',15,8)">Nuova citazione</button>
        </div>` : '';

      container.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; gap:25px; align-items:center; justify-content:center;">
          <div style="text-align:center; min-width:140px; max-width:180px; flex-shrink:0;">
            <img src="assets/maestro.png" alt="Il Maestro" style="max-height:240px; width:auto; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.6));">
          </div>
          <div style="flex:1; min-width:280px;">
            <div style="font-size:0.88rem; color:#f5c53c; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; font-weight:bold;">
              <div>📖 <em>${s.ex.source || 'Citazione'}</em></div>
              ${(window.LiveEditor && typeof window.LiveEditor.renderBtn === 'function') ? window.LiveEditor.renderBtn(`puzzle_${currentMissionId || 'general'}`, { text: s.ex.solution }) : ''}
            </div>
            <div style="min-height:65px; border:1.5px dashed rgba(141,160,63,0.4); border-radius:10px; padding:12px; margin-bottom:14px; background:rgba(0,0,0,0.3);">${sel}</div>
            <div style="margin-bottom:8px; font-size:0.82rem; color:var(--text-muted); font-weight:600;">Parole disponibili:</div>
            <div style="min-height:55px; margin-bottom:12px;">${rem}</div>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn btn-secondary" style="width:auto; padding:6px 16px; font-size:0.85rem;" onclick="EroiMinigames.puzzleReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
            </div>
          </div>
        </div>
        ${resultHtml}`;
    },

    puzzleAdd: function(i) {
      const w = puzzleState.remaining[i];
      puzzleState.selected.push(w);
      puzzleState.remaining.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderPuzzle(c);
    },
    puzzleRemove: function(i) {
      const w = puzzleState.selected[i];
      puzzleState.remaining.push(w);
      puzzleState.selected.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderPuzzle(c);
    },
    puzzleReset: function() {
      puzzleState.selected = [];
      puzzleState.remaining = [...puzzleState.shuffled];
      const c = document.getElementById('minigame-content');
      if (c) this.renderPuzzle(c);
    },

    // =====================================================
    // CLOZE
    // =====================================================
    initCloze: function(container, data) {
      const pool = data.cloze && data.cloze.length ? data.cloze : DEFAULT_DATA.cloze;
      const ex = pool[Math.floor(Math.random() * pool.length)];
      const blanks = ex.blanks || ex.words || [];
      clozeState = { ex: { ...ex, blanks: blanks }, answers: new Array(blanks.length).fill('') };
      this.renderCloze(container);
    },

    renderCloze: function(container) {
      const s = clozeState;
      let idx = 0;
      const textHtml = s.ex.text.replace(/_+/g, () => {
        const i = idx++;
        return `<input type="text" id="cloze-${i}" value="${s.answers[i]||''}"
          style="width:130px; background:rgba(141,160,63,0.15); border:1.5px solid rgba(141,160,63,0.5); border-radius:6px; padding:4px 8px; color:#f5f5f0; font-weight:bold; text-align:center; font-size:0.95rem;"
          oninput="EroiMinigames.updateCloze(${i},this.value)" placeholder="___">`;
      });

      container.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; gap:25px; align-items:center; justify-content:center;">
          <div style="text-align:center; min-width:140px; max-width:180px; flex-shrink:0;">
            <img src="assets/maestro.png" alt="Il Maestro" style="max-height:240px; width:auto; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.6));">
          </div>
          <div style="flex:1; min-width:280px;">
            <div style="background:rgba(0,0,0,0.35); border:1.5px solid rgba(141,160,63,0.3); border-radius:12px; padding:18px; margin-bottom:16px;">
              <div style="font-size:0.85rem; color:#f5c53c; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; font-weight:bold;">
                <div>📖 <em>${s.ex.source || 'Testo'}</em></div>
                ${(window.LiveEditor && typeof window.LiveEditor.renderBtn === 'function') ? window.LiveEditor.renderBtn(`cloze_${currentMissionId || 'general'}`, { text: s.ex.text }) : ''}
              </div>
              <div style="font-size:1.05rem; line-height:2.4; color:#f5f5f0; font-weight:500;">${textHtml}</div>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn" style="width:auto; padding:8px 20px; border-radius:8px;" onclick="EroiMinigames.verifyCloze()"><i class="fa-solid fa-check"></i> Verifica</button>
              <button class="btn btn-secondary" style="width:auto; padding:8px 20px; border-radius:8px;" onclick="EroiMinigames.retryCurrentCloze()"><i class="fa-solid fa-dice"></i> Nuovo esercizio</button>
            </div>
            <div id="cloze-result" style="margin-top:14px;"></div>
          </div>
        </div>`;
    },

    updateCloze: function(i, v) { if (clozeState.answers) clozeState.answers[i] = v; },

    verifyCloze: function() {
      const s = clozeState;
      const blanks = s.ex.blanks || [];
      // Prendi valori dagli input
      blanks.forEach((_, i) => {
        const inp = document.getElementById(`cloze-${i}`);
        if (inp) s.answers[i] = inp.value.trim();
      });

      let correct = 0;
      blanks.forEach((blank, i) => {
        const ok = (s.answers[i] || '').toLowerCase() === blank.toLowerCase();
        if (ok) correct++;
        const inp = document.getElementById(`cloze-${i}`);
        if (inp) {
          inp.style.borderColor = ok ? '#16a34a' : '#ef4444';
          inp.style.background = ok ? 'rgba(22,163,74,0.2)' : 'rgba(239,68,68,0.15)';
          if (!ok) { inp.value = blank; inp.style.color = '#f5c53c'; }
        }
      });

      const res = document.getElementById('cloze-result');
      if (!res) return;
      if (correct === blanks.length && blanks.length > 0) {
        res.innerHTML = `<div style="background:rgba(22,163,74,0.15); border:1px solid #16a34a; border-radius:12px; padding:16px; text-align:center;">
          <div style="color:#16a34a; font-weight:bold; font-size:1.15rem; font-family:var(--font-heading);">🎉 Perfetto! Tutte le parole inserite correttamente!</div>
          <button class="btn" style="margin-top:10px; width:auto; padding:8px 20px;" onclick="EroiMinigames.rewardAndNext('cloze',25,12)">Nuovo esercizio</button>
        </div>`;
      } else {
        res.innerHTML = `<div style="background:rgba(245,158,11,0.12); border:1px solid #f59e0b; border-radius:12px; padding:16px; text-align:center;">
          <div style="color:#f5c53c; font-weight:bold;">${correct}/${blanks.length} corrette. Le risposte corrette sono rivelate in oro.</div>
          <button class="btn btn-secondary" style="margin-top:10px; width:auto; padding:8px 20px;" onclick="EroiMinigames.retryCurrentCloze()">Riprova con nuovo testo</button>
        </div>`;
      }
    },

    retryCurrentCloze: function() {
      const data = getData(currentMissionId);
      const c = document.getElementById('minigame-content');
      if (c) this.initCloze(c, data);
    },

    // =====================================================
    // RIORDINA I VERSI
    // =====================================================
    initVersi: function(container, data) {
      const pool = data.versi && data.versi.length ? data.versi : DEFAULT_DATA.versi;
      const ex = pool[Math.floor(Math.random() * pool.length)];
      const shuffled = [...ex.lines].sort(() => Math.random() - 0.5);
      versiState = { ex: { ...ex, hint: ex.hint || ex.title || 'Riordina i versi nell\'ordine poetico originale.' }, shuffled, ordered: [], remaining: [...shuffled] };
      this.renderVersi(container);
    },

    renderVersi: function(container) {
      const s = versiState;
      const isComplete = s.ordered.length === s.ex.lines.length;
      const isCorrect = isComplete && s.ordered.every((l, i) => l === s.ex.lines[i]);

      const orderedHtml = s.ordered.length
        ? s.ordered.map((l, i) => {
            const ok = isComplete ? l === s.ex.lines[i] : null;
            const chk = isComplete ? (ok ? 'border-color:#16a34a;background:rgba(22,163,74,0.15);' : 'border-color:#ef4444;background:rgba(239,68,68,0.1);') : '';
            return `<div style="display:flex; align-items:center; gap:10px; padding:10px 14px; border:1px solid rgba(141,160,63,0.3); border-radius:8px; margin-bottom:6px; ${chk} cursor:pointer; background:rgba(255,255,255,0.03);" onclick="EroiMinigames.versiRemove(${i})">
              <span style="color:#f5c53c; font-weight:bold; min-width:22px;">${i+1}.</span>
              <span style="color:#f5f5f0; font-style:italic;">"${l}"</span>
            </div>`;
          }).join('')
        : '<div style="color:var(--text-muted); font-style:italic; padding:15px; text-align:center;">Clicca i versi a destra nell\'ordine corretto...</div>';

      const remainingHtml = s.remaining.map((l, i) =>
        `<div style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:rgba(141,160,63,0.08); border:1px solid rgba(141,160,63,0.3); border-radius:8px; margin-bottom:7px; cursor:pointer; transition:all 0.2s;"
         onmouseover="this.style.background='rgba(141,160,63,0.2)'" onmouseout="this.style.background='rgba(141,160,63,0.08)'"
         onclick="EroiMinigames.versiAdd(${i})">
          <i class="fa-solid fa-grip-lines" style="color:#f5c53c; font-size:0.75rem;"></i>
          <span style="color:#f5f5f0; font-style:italic;">"${l}"</span>
        </div>`
      ).join('');

      let resultHtml = '';
      if (isComplete) {
        if (isCorrect) {
          resultHtml = `<div style="background:rgba(22,163,74,0.15); border:1px solid #16a34a; border-radius:12px; padding:16px; text-align:center; margin-top:14px;">
            <div style="color:#16a34a; font-weight:bold; font-size:1.15rem; font-family:var(--font-heading);">🏆 Eccellente! Versi nell'ordine corretto!</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:5px;"><em>${s.ex.title}</em></div>
            <button class="btn" style="margin-top:12px; width:auto; padding:8px 20px;" onclick="EroiMinigames.rewardAndNext('versi',30,15)">Nuovo componimento</button>
          </div>`;
        } else {
          resultHtml = `<div style="background:rgba(245,158,11,0.12); border:1px solid #f59e0b; border-radius:12px; padding:14px; margin-top:14px; text-align:center;">
            <div style="color:#f5c53c; font-weight:bold; margin-bottom:8px;">Quasi! L'ordine corretto era:</div>
            ${s.ex.lines.map((l,i)=>`<div style="font-size:0.85rem; color:var(--text-muted); font-style:italic; margin-bottom:4px;">${i+1}. "${l}"</div>`).join('')}
            <button class="btn btn-secondary" style="margin-top:10px; width:auto; padding:6px 18px;" onclick="EroiMinigames.versiReset()">Riprova</button>
          </div>`;
        }
      }

      container.innerHTML = `
        <div style="background:rgba(141,160,63,0.1); border:1px solid rgba(141,160,63,0.3); border-radius:10px; padding:14px; margin-bottom:16px;">
          <div style="font-weight:bold; color:#f5c53c; margin-bottom:4px; font-family:var(--font-heading);">📜 ${s.ex.title || 'Opera Poetica'}</div>
          <div style="font-size:0.85rem; color:#f5f5f0;">💡 ${s.ex.hint || 'Riordina i versi per completare la poesia.'}</div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px;">
          <div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:8px; font-weight:600;">🔢 Il tuo ordine <span style="opacity:0.6;">(clicca per rimuovere)</span>:</div>
            <div style="min-height:160px; border:1.5px dashed rgba(141,160,63,0.4); border-radius:10px; padding:10px; background:rgba(0,0,0,0.3);">${orderedHtml}</div>
          </div>
          <div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:8px; font-weight:600;">📋 Versi disponibili <span style="opacity:0.6;">(clicca per aggiungere)</span>:</div>
            <div>${remainingHtml}</div>
          </div>
        </div>
        <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
          <button class="btn btn-secondary" style="width:auto; padding:6px 16px; font-size:0.85rem;" onclick="EroiMinigames.versiReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        </div>
        ${resultHtml}`;
    },

    versiAdd: function(i) {
      const l = versiState.remaining[i];
      versiState.ordered.push(l);
      versiState.remaining.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderVersi(c);
    },
    versiRemove: function(i) {
      const l = versiState.ordered[i];
      versiState.remaining.push(l);
      versiState.ordered.splice(i, 1);
      const c = document.getElementById('minigame-content');
      if (c) this.renderVersi(c);
    },
    versiReset: function() {
      versiState.ordered = [];
      versiState.remaining = [...versiState.shuffled];
      const c = document.getElementById('minigame-content');
      if (c) this.renderVersi(c);
    },

    // =====================================================
    // RICOMPENSE
    // =====================================================
    
    rewardAndNext: function(type, baseXP, dracme) {
      try {
        const isQueueActive = (this.gameQueue && this.gameQueue.length > 0 && this.currentTurnIndex < this.gameQueue.length);

        if (isQueueActive) {
            let xp = 0;
            if (this.isMancheMode) {
                 xp = (type === 'quiz') ? baseXP : 4; 
            } else {
                 xp = (type === 'quiz') ? baseXP : 2; 
                 if (xp > 2) xp = 2;
            }
            
            if (xp > 0 || type === 'versi') { 
                this.assignPointsToTeam(xp); 
            } else {
                this.currentTurnIndex++;
                this.playNextInQueue();
            }
            return;
        }

        // Legacy (Studente)
        if (this.isMancheMode) {
            let manchePts = (type === 'quiz') ? baseXP : 4;
            this.mancheScore += manchePts;
            this.nextMancheGame(currentMissionId);
        } else {
            let xp = 2;
            if (type === 'quiz') xp = baseXP;
            if (xp > 2) xp = 2;
            if (xp > 0) {
                this.assignPointsToTeamLegacy(xp);
            }
            this.startMinigameDirect(type, currentMissionId);
        }
      } catch(e) { console.warn('Reward error:', e); }
    }
  };

})();
