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
    'a3': { // Manzoni
      topic: "Alessandro Manzoni",
      impiccato: [
        { word: "PROMESSI", hint: "I celebri sposi Renzo e Lucia" },
        { word: "ABBONDIO", hint: "Il curato poco coraggioso" },
        { word: "PROVVIDENZA", hint: "La guida divina nelle vicende umane" },
        { word: "LUCIA", hint: "La giovane sposa insidiata da Don Rodrigo" }
      ],
      puzzle: [
        { words: ["Quel", "ramo", "del", "lago", "di", "Como", "che", "volge", "a", "mezzogiorno"], solution: "Quel ramo del lago di Como che volge a mezzogiorno", source: "I Promessi Sposi (Incipit)" },
        { words: ["Il", "coraggio", "uno", "non", "se", "lo", "può", "dare"], solution: "Il coraggio uno non se lo può dare", source: "I Promessi Sposi (Don Abbondio)" },
        { words: ["Fu", "vera", "gloria", "ai", "posteri", "l'ardua", "sentenza"], solution: "Fu vera gloria ai posteri l'ardua sentenza", source: "Il Cinque Maggio" }
      ],
      cloze: [
        {
          text: "Quel ramo del lago di ___ , che volge a mezzogiorno, tra due catene non interrotte di ___...",
          blanks: ["Como", "monti"],
          source: "I Promessi Sposi"
        },
        {
          text: "Fu vera gloria? Ai ___ l'ardua sentenza: nui chiniam la fronte al Massimo ___.",
          blanks: ["posteri", "Fattore"],
          source: "Il Cinque Maggio"
        }
      ],
      versi: [
        {
          title: "Il Cinque Maggio",
          lines: [
            "Ei fu. Siccome immobile,",
            "dato il mortal sospiro,",
            "stette la spoglia immemore",
            "orba di tanto spiro,"
          ],
          hint: "La celebre ode per la scomparsa di Napoleone Bonaparte."
        }
      ],
      quiz: [
        { q: "Qual è il capolavoro narrativo di Alessandro Manzoni?", o: ["I Malavoglia", "I Promessi Sposi", "I Sepolcri", "Le Odi"], a: 1 },
        { q: "Chi è il curato impaurito ne 'I Promessi Sposi'?", o: ["Padre Cristoforo", "Don Abbondio", "Federigo Borromeo", "Fra Galdino"], a: 1 },
        { q: "Per la morte di quale personaggio storico fu scritta l'ode 'Il Cinque Maggio'?", o: ["Garibaldi", "Napoleone Bonaparte", "Cavour", "Vittorio Emanuele II"], a: 1 },
        { q: "In quale città lombarda Manzoni trascorse gran parte della vita?", o: ["Venezia", "Torino", "Milano", "Bergamo"], a: 2 },
        { q: "Quale tragedia manzoniana contiene il celebre coro 'Dagli atrii muscosi'?", o: ["Il Conte di Carmagnola", "Adelchi", "Saul", "Mirra"], a: 1 }
      ]
    },
    'a4': { // Carducci
      topic: "Giosuè Carducci",
      impiccato: [
        { word: "BARBARE", hint: "Le sue celebri Odi con metrica classica" },
        { word: "MAREMMA", hint: "La terra toscana dell'infanzia aspra e selvaggia" },
        { word: "NOBEL", hint: "Primo italiano a vincere il prestigioso premio nel 1906" },
        { word: "BOLOGNA", hint: "La città dove fu professore per decenni" }
      ],
      puzzle: [
        { words: ["L'albero", "a", "cui", "tendevi", "la", "pargoletta", "mano"], solution: "L'albero a cui tendevi la pargoletta mano", source: "Pianto antico" },
        { words: ["La", "nebbia", "agli", "irti", "colli", "piovigginando", "sale"], solution: "La nebbia agli irti colli piovigginando sale", source: "San Martino" },
        { words: ["Sei", "de'", "ribelli", "spirito", "prometeo"], solution: "Sei de' ribelli spirito prometeo", source: "Inno a Satana" }
      ],
      cloze: [
        {
          text: "La nebbia a gl'irti colli piovigginando ___ , e sotto il maestrale urla e biancheggia il ___.",
          blanks: ["sale", "mare"],
          source: "San Martino"
        },
        {
          text: "Tu fior della mia pianta percossa e inaridita, tu de l'inutil vita estremo unico ___.",
          blanks: ["fiore"],
          source: "Pianto antico"
        }
      ],
      versi: [
        {
          title: "San Martino",
          lines: [
            "La nebbia a gl'irti colli",
            "piovigginando sale,",
            "e sotto il maestrale",
            "urla e biancheggia il mare;"
          ],
          hint: "I primi quattro versi sul borgo toscano e il ribollir dei tini in autunno."
        }
      ],
      quiz: [
        { q: "In quale anno Carducci vinse il Premio Nobel per la Letteratura?", o: ["1901", "1906", "1926", "1934"], a: 1 },
        { q: "A chi è dedicata la dolorosa poesia 'Pianto antico'?", o: ["Alla madre", "Al piccolo figlio Dante scomparso prematuramente", "Alla moglie Elvira", "A un allievo"], a: 1 },
        { q: "Cosa caratterizza le 'Odi barbare'?", o: ["Il verso libero", "L'imitazione dei metri greci e latini in lingua italiana", "Il dialetto toscano", "La rima baciata"], a: 1 },
        { q: "Quale bevanda ribolle nei tini nella poesia 'San Martino'?", o: ["Il sidro", "Il vino novello", "La birra", "L'idromele"], a: 1 },
        { q: "In quale università Carducci insegnò letteratura italiana per oltre quarant'anni?", o: ["Pisa", "Firenze", "Bologna", "Padova"], a: 2 }
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
    'a6': { // Pascoli
      topic: "Giovanni Pascoli",
      impiccato: [
        { word: "FANCIULLINO", hint: "La teoria del fanciullo interiore che scopre la poesia" },
        { word: "MYRICAE", hint: "La sua prima e celebre raccolta di poesie" },
        { word: "NIDO", hint: "Il rifugio familiare simbolo di protezione" },
        { word: "AGOSTO", hint: "La notte delle stelle cadenti (X Agosto)" }
      ],
      puzzle: [
        { words: ["San", "Lorenzo", "io", "lo", "so", "perché", "tanto", "di", "stelle"], solution: "San Lorenzo io lo so perché tanto di stelle", source: "X Agosto" },
        { words: ["C'è", "un", "fanciullino", "in", "ciascuno", "di", "noi"], solution: "C'è un fanciullino in ciascuno di noi", source: "Il fanciullino" },
        { words: ["Nel", "campo", "mezzo", "grigio", "e", "mezzo", "nero", "resta", "un", "aratro"], solution: "Nel campo mezzo grigio e mezzo nero resta un aratro", source: "Lavandare" }
      ],
      cloze: [
        {
          text: "San Lorenzo, io lo so perché tanto di stelle per l'aria tranquilla arde e ___ , perché sì gran pianto nel concavo cielo ___.",
          blanks: ["cade", "sfavilla"],
          source: "X Agosto"
        },
        {
          text: "Nel campo mezzo grigio e mezzo nero resta un ___ senza buoi che pare dimenticato tra il ___ leggero.",
          blanks: ["aratro", "vapor"],
          source: "Lavandare"
        }
      ],
      versi: [
        {
          title: "X Agosto",
          lines: [
            "San Lorenzo, io lo so perché tanto",
            "di stelle per l'aria tranquilla",
            "arde e cade, perché sì gran pianto",
            "nel concavo cielo sfavilla."
          ],
          hint: "La celebre quartina di apertura sulla notte delle stelle cadenti in ricordo del padre."
        }
      ],
      quiz: [
        { q: "Cosa rappresenta il 'fanciullino' secondo Pascoli?", o: ["Un gioco infantile", "La capacità del poeta di meravigliarsi delle piccole cose", "Uno studente delle elementari", "Un ricordo inventato"], a: 1 },
        { q: "Quale tragico evento segnò per sempre l'infanzia di Pascoli?", o: ["Un naufragio", "L'assassinio impunito del padre Ruggero", "Un terremoto", "L'esilio forzato"], a: 1 },
        { q: "Cosa significa il titolo della raccolta 'Myricae'?", o: ["Stelle luminose", "Tamerici (piante umili citate da Virgilio)", "Canti notturni", "Campanelle"], a: 1 },
        { q: "Di quale animale si parla nella poesia 'La cavallina storna'?", o: ["Della cavalla che riportò il padre morente a casa", "Di un cavallo da corsa", "Di un puledro selvaggio", "Del destriero di un re"], a: 0 },
        { q: "Quale figura retorica di suono è usatissima da Pascoli (es. 'chiù', 'fru fru', 'don don')?", o: ["Metafora", "Onomatopea", "Iperbole", "Chiasmo"], a: 1 }
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
    'a9': { // Marinetti
      topic: "Filippo Tommaso Marinetti",
      impiccato: [
        { word: "FUTURISMO", hint: "Movimento d'avanguardia nato nel 1909" },
        { word: "VELOCITA", hint: "Il culto moderno dei motori e del dinamismo" },
        { word: "MANIFESTO", hint: "Il celebre testo programmatico uscito su Le Figaro" },
        { word: "AUTOMOBILE", hint: "Più bella della Nike di Samotracia per i futuristi" }
      ],
      puzzle: [
        { words: ["Un", "automobile", "da", "corsa", "è", "più", "bella", "della", "Vittoria", "di", "Samotracia"], solution: "Un automobile da corsa è più bella della Vittoria di Samotracia", source: "Manifesto del Futurismo" },
        { words: ["Vogliamo", "cantare", "l'amor", "del", "pericolo", "l'abitudine", "all'energia"], solution: "Vogliamo cantare l'amor del pericolo l'abitudine all'energia", source: "Manifesto del Futurismo" },
        { words: ["Zang", "tumb", "tumb", "parole", "in", "totale", "libertà"], solution: "Zang tumb tumb parole in totale libertà", source: "Zang Tumb Tumb" }
      ],
      cloze: [
        {
          text: "Noi affermiamo che la magnificenza del mondo si è arricchita di una bellezza nuova: la bellezza della ___ .",
          blanks: ["velocità"],
          source: "Manifesto del Futurismo"
        },
        {
          text: "Zang Tumb Tumb: parole in ___ per distruggere la sintassi e la punteggiatura ___ .",
          blanks: ["libertà", "tradizionale"],
          source: "Zang Tumb Tumb"
        }
      ],
      versi: [
        {
          title: "Manifesto del Futurismo (Punto 4)",
          lines: [
            "Noi affermiamo che la magnificenza del mondo",
            "si è arricchita di una bellezza nuova:",
            "la bellezza della velocità.",
            "Un automobile da corsa col suo cofano adorno di grossi tubi"
          ],
          hint: "L'esaltazione della macchina e del dinamismo moderno contro l'arte passata."
        }
      ],
      quiz: [
        { q: "In quale anno fu pubblicato il 'Manifesto del Futurismo'?", o: ["1899", "1909", "1919", "1929"], a: 1 },
        { q: "Su quale prestigioso quotidiano parigino apparve il primo Manifesto?", o: ["Le Monde", "Le Figaro", "Times", "Corriere della Sera"], a: 1 },
        { q: "Cosa intendevano i futuristi con 'parole in libertà'?", o: ["Poesie recitate a memoria", "Abolizione della punteggiatura e della sintassi tradizionale", "Traduzioni in latino", "Rime baciate obbligatorie"], a: 1 },
        { q: "Qual è il titolo dell'opera parolibera di Marinetti sulla battaglia di Adrianopoli?", o: ["Zang Tumb Tumb", "Il Piacere", "Ossi di Seppia", "L'Allegria"], a: 0 },
        { q: "Quale celeberrima statua greca classica i futuristi consideravano inferiore a un'auto da corsa?", o: ["La Venere di Milo", "Il Discobolo", "La Nike di Samotracia", "I Bronzi di Riace"], a: 2 }
      ]
    },
    'a10': { // Ungaretti
      topic: "Giuseppe Ungaretti",
      impiccato: [
        { word: "ALLEGRIA", hint: "La celebre raccolta 'L'Allegria di naufragi'" },
        { word: "ERMETISMO", hint: "Corrente poetica essenziale e simbolica" },
        { word: "CARSO", hint: "L'altopiano delle trincee della Grande Guerra" },
        { word: "IMMENSO", hint: "M'illumino d'..." }
      ],
      puzzle: [
        { words: ["M'illumino", "d'immenso"], solution: "M'illumino d'immenso", source: "Mattina" },
        { words: ["Si", "sta", "come", "d'autunno", "sugli", "alberi", "le", "foglie"], solution: "Si sta come d'autunno sugli alberi le foglie", source: "Soldati" },
        { words: ["Di", "queste", "case", "non", "è", "rimasto", "che", "qualche", "brandello"], solution: "Di queste case non è rimasto che qualche brandello", source: "San Martino del Carso" }
      ],
      cloze: [
        {
          text: "M'illumino d' ___ .",
          blanks: ["immenso"],
          source: "Mattina"
        },
        {
          text: "Si sta come d'autunno sugli alberi le ___ .",
          blanks: ["foglie"],
          source: "Soldati"
        }
      ],
      versi: [
        {
          title: "Soldati",
          lines: [
            "Si sta",
            "come",
            "d'autunno",
            "sugli alberi",
            "le foglie."
          ],
          hint: "I versi essenziali che esprimono la fragilità e il pericolo costante dei soldati al fronte."
        }
      ],
      quiz: [
        { q: "In quale città egiziana nacque Giuseppe Ungaretti?", o: ["Il Cairo", "Alessandria d'Egitto", "Suez", "Giza"], a: 1 },
        { q: "Qual è il testo completo della celeberrima poesia 'Mattina'?", o: ["Si sta come d'autunno", "M'illumino d'immenso", "Ed è subito sera", "Spesso il male di vivere"], a: 1 },
        { q: "Dove scrisse le sue prime poesie di guerra?", o: ["Nei caffè di Parigi", "Nelle trincee del Carso su pezzetti di carta", "In biblioteca", "In Senato a Roma"], a: 1 },
        { q: "Come si intitola il componimento che paragona il cuore del poeta a un paese devastato?", o: ["San Martino del Carso", "I fiumi", "Veglia", "Fratelli"], a: 0 },
        { q: "Ne 'I fiumi', quali corsi d'acqua ripercorrono le tappe della vita di Ungaretti?", o: ["Po, Tevere, Arno", "Isonzo, Serchio, Nilo, Senna", "Danubio, Reno, Tamigi", "Adige, Piave, Brenta"], a: 1 }
      ]
    },
    'a11': { // Montale
      topic: "Eugenio Montale",
      impiccato: [
        { word: "OSSI", hint: "La raccolta '... di seppia'" },
        { word: "LIMONI", hint: "I frutti gialli simbolo di luce e speranza" },
        { word: "CORRELATIVO", hint: "Oggettivo: esprimere un'emozione attraverso un oggetto reale" },
        { word: "LIGURIA", hint: "La terra natale aspra e marina" }
      ],
      puzzle: [
        { words: ["Spesso", "il", "male", "di", "vivere", "ho", "incontrato"], solution: "Spesso il male di vivere ho incontrato", source: "Ossi di seppia" },
        { words: ["Non", "chiederci", "la", "parola", "che", "squadri", "da", "ogni", "lato"], solution: "Non chiederci la parola che squadri da ogni lato", source: "Non chiederci la parola" },
        { words: ["Meriggiare", "pallido", "e", "assorto", "presso", "un", "rovente", "muro", "d'orto"], solution: "Meriggiare pallido e assorto presso un rovente muro d'orto", source: "Meriggiare pallido e assorto" }
      ],
      cloze: [
        {
          text: "Spesso il male di vivere ho incontrato: era il rivo strozzato che gorgoglia, era l'incartocciarsi della ___ secca, era il cavallo ___.",
          blanks: ["foglia", "stramazzato"],
          source: "Ossi di seppia"
        },
        {
          text: "Ascoltami, i poeti laureati si muovono solo fra piante dai nomi poco usati. Io amo le strade dei fossi: i ___.",
          blanks: ["limoni"],
          source: "I Limoni"
        }
      ],
      versi: [
        {
          title: "Spesso il male di vivere ho incontrato",
          lines: [
            "Spesso il male di vivere ho incontrato:",
            "era il rivo strozzato che gorgoglia,",
            "era l'incartocciarsi de la foglia",
            "secca, era il cavallo stramazzato."
          ],
          hint: "La prima strofa con i tre celebri correlativi oggettivi della sofferenza universale."
        }
      ],
      quiz: [
        { q: "Quale prestigioso premio internazionale vinse Montale nel 1975?", o: ["Premio Strega", "Premio Campiello", "Premio Nobel per la Letteratura", "Premio Viareggio"], a: 2 },
        { q: "Qual è il titolo della sua prima fondamentale raccolta poetica del 1925?", o: ["Canti", "Ossi di seppia", "Le Occasioni", "La bufera e altro"], a: 1 },
        { q: "Cosa intende Montale per 'correlativo oggettivo'?", o: ["Una rima perfetta", "Esprimere uno stato d'animo interiore attraverso oggetti concreti", "Una figura geometrica", "Un racconto in prosa"], a: 1 },
        { q: "Quali alberi profumati simboleggiano la gioia improvvisa nella celebre poesia?", o: ["I cipressi", "I limoni", "I pini", "I salici"], a: 1 },
        { q: "Quale celebre verso esprime il rifiuto di certezze assolute?", o: ["M'illumino d'immenso", "Non chiederci la parola", "Sempre caro mi fu quest'ermo colle", "Taci su le soglie"], a: 1 }
      ]
    },
    'a12': { // Quasimodo
      topic: "Salvatore Quasimodo",
      impiccato: [
        { word: "SERA", hint: "Ed è subito..." },
        { word: "SALICI", hint: "Alle fronde dei..." },
        { word: "MODICA", hint: "Città natale in Sicilia" },
        { word: "NOBEL", hint: "Premio prestigioso vinto nel 1959" }
      ],
      puzzle: [
        { words: ["Ognuno", "sta", "solo", "sul", "cuor", "della", "terra"], solution: "Ognuno sta solo sul cuor della terra", source: "Ed è subito sera" },
        { words: ["E", "come", "potevamo", "noi", "cantare", "con", "il", "piede", "straniero", "sopra", "il", "cuore"], solution: "E come potevamo noi cantare con il piede straniero sopra il cuore", source: "Alle fronde dei salici" },
        { words: ["Trafitto", "da", "un", "raggio", "di", "sole", "ed", "è", "subito", "sera"], solution: "Trafitto da un raggio di sole ed è subito sera", source: "Ed è subito sera" }
      ],
      cloze: [
        {
          text: "Ognuno sta solo sul cuor della terra trafitto da un raggio di ___ : ed è subito ___.",
          blanks: ["sole", "sera"],
          source: "Ed è subito sera"
        },
        {
          text: "Alle fronde dei salici, per voto, anche le nostre cetre erano ___ , oscillavano lievi al triste ___.",
          blanks: ["appese", "vento"],
          source: "Alle fronde dei salici"
        }
      ],
      versi: [
        {
          title: "Ed è subito sera",
          lines: [
            "Ognuno sta solo sul cuor della terra",
            "trafitto da un raggio di sole:",
            "ed è subito sera."
          ],
          hint: "I tre versi memorabili sulla solitudine umana, la luce effimera e la morte improvvisa."
        }
      ],
      quiz: [
        { q: "Quanti versi compongono la celeberrima poesia 'Ed è subito sera'?", o: ["Due", "Tre", "Quattro", "Cinque"], a: 1 },
        { q: "In quale anno Quasimodo fu insignito del Premio Nobel per la Letteratura?", o: ["1906", "1934", "1959", "1975"], a: 2 },
        { q: "Quale popolo e testi antichi Quasimodo tradusse con maestria straordinaria?", o: ["I filosofi tedeschi", "I lirici greci", "I poeti francesi", "I miti nordici"], a: 1 },
        { q: "A cosa erano appese le cetre dei poeti durante l'occupazione della guerra?", o: ["Alle querce", "Alle fronde dei salici", "Agli ulivi", "Ai cipressi"], a: 1 },
        { q: "In quale regione italiana nacque Quasimodo?", o: ["Calabria", "Sicilia", "Puglia", "Campania"], a: 1 }
      ]
    },
    'a13': { // Svevo
      topic: "Italo Svevo",
      impiccato: [
        { word: "ZENO", hint: "Il protagonista della celebre Coscienza" },
        { word: "INETTO", hint: "L'antieroe moderno incapace di decidersi" },
        { word: "FUMO", hint: "L'ultima sigaretta rimandata all'infinito" },
        { word: "TRIESTE", hint: "La città cosmopolita di Svevo e Joyce" }
      ],
      puzzle: [
        { words: ["Adesso", "che", "sono", "qui", "analizzato", "la", "mia", "salute", "è", "perfetta"], solution: "Adesso che sono qui analizzato la mia salute è perfetta", source: "La coscienza di Zeno" },
        { words: ["Il", "fumo", "era", "la", "mia", "grande", "passione", "e", "la", "mia", "malattia"], solution: "Il fumo era la mia grande passione e la mia malattia", source: "La coscienza di Zeno" },
        { words: ["La", "vita", "attuale", "è", "inquinata", "alle", "radici"], solution: "La vita attuale è inquinata alle radici", source: "La coscienza di Zeno" }
      ],
      cloze: [
        {
          text: "Zeno Cosini decide di scrivere la propria autobiografia su invito del suo psicanalista, il Dottor ___ .",
          blanks: ["S."],
          source: "La coscienza di Zeno"
        },
        {
          text: "La sigaretta con la data e la celebre sigla ___ (Ultima Sigaretta) che non sarà mai l'ultima.",
          blanks: ["U.S."],
          source: "La coscienza di Zeno"
        }
      ],
      versi: [
        {
          title: "La profezia finale di Zeno",
          lines: [
            "La vita attuale è inquinata alle radici.",
            "Qualunque sforzo di darci la salute è vano.",
            "Ci sarà un'esplosione enorme che nessuno udrà",
            "e la terra ritornata alla forma di nebulosa errerà nei cieli."
          ],
          hint: "La celebre visione apocalittica che chiude il capolavoro sveviano."
        }
      ],
      quiz: [
        { q: "Qual era il vero nome all'anagrafe di Italo Svevo?", o: ["Ettore Schmitz", "Alberto Pincherle", "Giacomo Debenedetti", "Emilio Brentani"], a: 0 },
        { q: "Quale grande scrittore irlandese fu amico di Svevo a Trieste e ne valorizzò il talento?", o: ["Oscar Wilde", "James Joyce", "Samuel Beckett", "George Orwell"], a: 1 },
        { q: "Quale disciplina scientifico-medica innovativa influenza 'La coscienza di Zeno'?", o: ["La neurologia", "La psicanalisi freudiana", "L'omeopatia", "La fisiologia"], a: 1 },
        { q: "Cosa indicava la sigla 'U.S.' che Zeno annotava ovunque?", o: ["Unione Sovietica", "Ultima Sigaretta", "Unico Scopo", "Uomo Sano"], a: 1 },
        { q: "Chi sposa alla fine Zeno tra le quattro figlie di Giovanni Malfenti?", o: ["Ada, la più bella", "Augusta, la meno attraente ma devota", "Alberta", "Anna"], a: 1 }
      ]
    },
    'a14': { // Calvino
      topic: "Italo Calvino",
      impiccato: [
        { word: "BARONE", hint: "Cosimo Piovasco che sale sugli alberi e non scende più" },
        { word: "INVISIBILI", hint: "Le città poetiche descritte a Kublai Khan" },
        { word: "VIAGGIATORE", hint: "Se una notte d'inverno un..." },
        { word: "RESISTENZA", hint: "L'esperienza partigiana ne 'Il sentiero dei nidi di ragno'" }
      ],
      puzzle: [
        { words: ["Chi", "vuole", "guardare", "bene", "la", "terra", "deve", "tenersi", "alla", "distanza", "necessaria"], solution: "Chi vuole guardare bene la terra deve tenersi alla distanza necessaria", source: "Il barone rampante" },
        { words: ["D'una", "città", "non", "godi", "le", "sette", "o", "settantasette", "meraviglie"], solution: "D'una città non godi le sette o settantasette meraviglie", source: "Le città invisibili" },
        { words: ["La", "leggerezza", "per", "me", "si", "associa", "con", "la", "precisione"], solution: "La leggerezza per me si associa con la precisione", source: "Lezioni americane" }
      ],
      cloze: [
        {
          text: "Pin è un bambino ligure che scopre dove fanno il nido i ___ e ruba la pistola a un soldato tedesco.",
          blanks: ["ragni"],
          source: "Il sentiero dei nidi di ragno"
        },
        {
          text: "Cosimo Piovasco di Rondò all'età di dodici anni salì su un albero di ___ e decise di non scendere mai più.",
          blanks: ["elce"],
          source: "Il barone rampante"
        }
      ],
      versi: [
        {
          title: "Le città invisibili (Finale)",
          lines: [
            "L'inferno dei viventi non è qualcosa che sarà;",
            "se ce n'è uno, è quello che è già qui,",
            "l'inferno che abitiamo tutti i giorni,",
            "cercare e saper riconoscere chi e cosa, in mezzo all'inferno, non è inferno, e farlo durare."
          ],
          hint: "La memorabile conclusione sul senso del vivere e riconoscere il bello nel mondo."
        }
      ],
      quiz: [
        { q: "Qual è il primo romanzo pubblicato da Italo Calvino sulla Resistenza?", o: ["Il barone rampante", "Il sentiero dei nidi di ragno", "Il visconte dimezzato", "Marcovaldo"], a: 1 },
        { q: "Come si intitola la celebre trilogia araldica e fantastica di Calvino?", o: ["I nostri antenati", "Le città invisibili", "Cosmicomiche", "Palomar"], a: 0 },
        { q: "Cosa decide di fare Cosimo nel romanzo 'Il barone rampante'?", o: ["Vivere per sempre sugli alberi", "Farsi monaco", "Diventare pirata", "Esplorare l'America"], a: 0 },
        { q: "Chi dialoga ne 'Le città invisibili' raccontando città immaginarie?", o: ["Dante e Virgilio", "Marco Polo e il Gran Khan Kublai", "Ulisse e Telemaco", "Don Chisciotte e Sancho Panza"], a: 1 },
        { q: "In quale Paese caraibico nacque Italo Calvino da genitori botanici?", o: ["Giamaica", "Cuba (Santiago de Las Vegas)", "Messico", "Portorico"], a: 1 }
      ]
    },
    'a15': { // Morante
      topic: "Elsa Morante",
      impiccato: [
        { word: "STORIA", hint: "Il grandioso romanzo del 1974 sulla Seconda Guerra Mondiale" },
        { word: "ARTURO", hint: "L'isola di... ambientata a Procida" },
        { word: "USEPPE", hint: "Il dolcissimo e fragile bambino protagonista" },
        { word: "PROCIDA", hint: "L'isola magica dell'infanzia di Arturo" }
      ],
      puzzle: [
        { words: ["Uno", "dei", "miei", "primi", "vanti", "era", "stato", "il", "mio", "nome"], solution: "Uno dei miei primi vanti era stato il mio nome", source: "L'isola di Arturo" },
        { words: ["Tutti", "i", "semi", "sono", "falliti", "eccetto", "uno", "l'amore"], solution: "Tutti i semi sono falliti eccetto uno l'amore", source: "La Storia" },
        { words: ["Solo", "l'amore", "può", "salvare", "il", "mondo", "dalla", "distruzione"], solution: "Solo l'amore può salvare il mondo dalla distruzione", source: "Il mondo salvato dai ragazzini" }
      ],
      cloze: [
        {
          text: "L'isola di Arturo è ambientata nella splendida e aspra isola di ___ nel golfo di Napoli.",
          blanks: ["Procida"],
          source: "L'isola di Arturo"
        },
        {
          text: "La maestra Ida Ramundo e il piccolo ___ affrontano la miseria e i bombardamenti di Roma durante la guerra.",
          blanks: ["Useppe"],
          source: "La Storia"
        }
      ],
      versi: [
        {
          title: "Il mondo salvato dai ragazzini",
          lines: [
            "La grazia è la luce che ride negli occhi dei bambini.",
            "Solo chi resta fedele all'innocenza",
            "potrà guarire la terra dalle sue ferite.",
            "Ascoltate il canto degli umili."
          ],
          hint: "La visione poetica di Elsa Morante sull'innocenza come salvezza del mondo."
        }
      ],
      quiz: [
        { q: "Quale romanzo di Elsa Morante vinse il prestigioso Premio Strega nel 1957?", o: ["Menzogna e sortilegio", "L'isola di Arturo", "La Storia", "Aracoeli"], a: 1 },
        { q: "Quale isola campana fa da sfondo alle avventure del giovane Arturo?", o: ["Capri", "Ischia", "Procida", "Ventotene"], a: 2 },
        { q: "Chi è la protagonista femminile del capolavoro 'La Storia'?", o: ["Ida Ramundo", "Nunziata", "Silvia", "Lucia"], a: 0 },
        { q: "Quale celebre scrittore italiano fu marito di Elsa Morante?", o: ["Cesare Pavese", "Alberto Moravia", "Italo Calvino", "Pier Paolo Pasolini"], a: 1 },
        { q: "Quale sottotitolo provocatorio e universale accompagna il romanzo 'La Storia'?", o: ["Un dramma romano", "Uno scandalo che dura da diecimila anni", "Canti di gioventù", "La memoria degli umili"], a: 1 }
      ]
    },
    'a16': { // Primo Levi
      topic: "Primo Levi",
      impiccato: [
        { word: "UOMO", hint: "Se questo è un..." },
        { word: "TREGUA", hint: "Il lungo viaggio di ritorno attraverso l'Europa" },
        { word: "CHIMICO", hint: "La sua professione originaria a Torino" },
        { word: "PERIODICO", hint: "Il sistema... che unisce scienza e narrazione" }
      ],
      puzzle: [
        { words: ["Meditate", "che", "questo", "è", "stato", "vi", "comando", "queste", "parole"], solution: "Meditate che questo è stato vi comando queste parole", source: "Se questo è un uomo" },
        { words: ["Se", "comprendere", "è", "impossibile", "conoscere", "è", "necessario"], solution: "Se comprendere è impossibile conoscere è necessario", source: "I sommersi e i salvati" },
        { words: ["Il", "lavoro", "fatto", "bene", "è", "la", "dignità", "dell'uomo"], solution: "Il lavoro fatto bene è la dignità dell'uomo", source: "La chiave a stella" }
      ],
      cloze: [
        {
          text: "Considerate se questo è un ___ che lavora nel fango, che non conosce pace, che muore per un sì o per un no.",
          blanks: ["uomo"],
          source: "Se questo è un uomo (Shemà)"
        },
        {
          text: "Il sistema ___ contiene ventuno racconti intitolati ciascuno a un elemento chimico come il Carbonio e lo Zinco.",
          blanks: ["periodico"],
          source: "Il sistema periodico"
        }
      ],
      versi: [
        {
          title: "Shemà (Incipit di Se questo è un uomo)",
          lines: [
            "Voi che vivete sicuri",
            "Nelle vostre tiepide case,",
            "Voi che trovate tornando a sera",
            "Il cibo caldo e visi amici:",
            "Considerate se questo è un uomo."
          ],
          hint: "La solenne poesia-monito che apre la testimonianza del Lager di Auschwitz."
        }
      ],
      quiz: [
        { q: "Quale professione scientifica permise a Primo Levi di essere impiegato nel laboratorio del Lager?", o: ["Medico", "Chimico", "Ingegnere", "Fisico"], a: 1 },
        { q: "In quale città italiana è nato e vissuto Primo Levi?", o: ["Milano", "Torino", "Genova", "Bologna"], a: 1 },
        { q: "Qual è il titolo del libro che racconta la sua drammatica prigionia ad Auschwitz?", o: ["La tregua", "Se questo è un uomo", "I sommersi e i salvati", "La chiave a stella"], a: 1 },
        { q: "Quale libro narra la lunga odissea del rientro in Italia attraverso l'Europa dell'Est?", o: ["La tregua", "Il sistema periodico", "Se non ora, quando?", "Storie naturali"], a: 0 },
        { q: "Quale romanzo di Levi celebra la passione per il proprio mestiere con l'operaio Faussone?", o: ["La chiave a stella", "Il sistema periodico", "La tregua", "I sommersi e i salvati"], a: 0 }
      ]
    },
    'a17': { // Pavese
      topic: "Cesare Pavese",
      impiccato: [
        { word: "LANGHE", hint: "Le colline piemontesi della memoria e dell'infanzia" },
        { word: "FALO", hint: "La luna e i..." },
        { word: "MESTIERE", hint: "Il... di vivere (il suo celebre diario)" },
        { word: "AMERICA", hint: "La letteratura d'oltreoceano che tradusse con passione" }
      ],
      puzzle: [
        { words: ["Un", "paese", "vuol", "dire", "non", "essere", "soli"], solution: "Un paese vuol dire non essere soli", source: "La luna e i falò" },
        { words: ["Lavorare", "stanca", "ma", "è", "il", "nostro", "destino"], solution: "Lavorare stanca ma è il nostro destino", source: "Lavorare stanca" },
        { words: ["Verrà", "la", "morte", "e", "avrà", "i", "tuoi", "occhi"], solution: "Verrà la morte e avrà i tuoi occhi", source: "Verrà la morte e avrà i tuoi occhi" }
      ],
      cloze: [
        {
          text: "Un paese ci vuole, non fosse che per il gusto di andarsene via. Un paese vuol dire non essere ___ .",
          blanks: ["soli"],
          source: "La luna e i falò"
        },
        {
          text: "Verrà la morte e avrà i tuoi ___ , questa morte che ci accompagna dal mattino alla sera.",
          blanks: ["occhi"],
          source: "Verrà la morte e avrà i tuoi occhi"
        }
      ],
      versi: [
        {
          title: "Verrà la morte e avrà i tuoi occhi",
          lines: [
            "Verrà la morte e avrà i tuoi occhi -",
            "questa morte che ci accompagna",
            "dal mattino alla sera, insonne,",
            "sorda, come un vecchio rimorso."
          ],
          hint: "I versi struggenti scritti nel 1950 poco prima della scomparsa del poeta a Torino."
        }
      ],
      quiz: [
        { q: "In quale suggestiva zona collinare del Piemonte è ambientata 'La luna e i falò'?", o: ["Monferrato", "Le Langhe (Santo Stefano Belbo)", "Canavese", "Val di Susa"], a: 1 },
        { q: "Come si chiama il protagonista de 'La luna e i falò' che torna arricchito dall'America?", o: ["Nuto", "Anguilla", "Cinto", "Milton"], a: 1 },
        { q: "Quale celebre autore americano di 'Moby Dick' Pavese tradusse in italiano?", o: ["Ernest Hemingway", "Herman Melville", "John Steinbeck", "William Faulkner"], a: 1 },
        { q: "Qual è il titolo del diario intimo e filosofico di Cesare Pavese?", o: ["Zibaldone", "Il mestiere di vivere", "Diario postumo", "Taccuino segreto"], a: 1 },
        { q: "Qual è la raccolta poetica di Pavese che introduce il 'verso-racconto'?", o: ["Lavorare stanca", "Ossi di seppia", "Myricae", "Canti"], a: 0 }
      ]
    },
    'a18': { // Moravia
      topic: "Alberto Moravia",
      impiccato: [
        { word: "INDIFFERENTI", hint: "Il suo fulmineo romanzo d'esordio del 1929" },
        { word: "CIOCIARA", hint: "Il dramma della guerra con Cesira e Rosetta" },
        { word: "CONFORMISTA", hint: "Il romanzo sull'adesione passiva al regime" },
        { word: "NOIA", hint: "La condizione esistenziale del pittore Dino" }
      ],
      puzzle: [
        { words: ["Tutti", "erano", "immersi", "nella", "più", "completa", "indifferenza"], solution: "Tutti erano immersi nella più completa indifferenza", source: "Gli indifferenti" },
        { words: ["La", "noia", "è", "la", "mancanza", "di", "rapporto", "con", "le", "cose"], solution: "La noia è la mancanza di rapporto con le cose", source: "La noia" },
        { words: ["Le", "cose", "non", "hanno", "alcun", "senso", "fuori", "di", "noi"], solution: "Le cose non hanno alcun senso fuori di noi", source: "Gli indifferenti" }
      ],
      cloze: [
        {
          text: "Michele e Carla Ardengo sono i giovani fratelli protagonisti del romanzo Gli ___ .",
          blanks: ["indifferenti"],
          source: "Gli indifferenti"
        },
        {
          text: "La Ciociara racconta la fuga drammatica di Cesira e della figlia ___ durante i bombardamenti della guerra.",
          blanks: ["Rosetta"],
          source: "La Ciociara"
        }
      ],
      versi: [
        {
          title: "Gli indifferenti (Riflessione di Michele)",
          lines: [
            "Io non provo nulla, non sento nulla.",
            "Tutto mi scivola addosso senza lasciare traccia.",
            "Vorrei avere una fede, una passione sincera,",
            "ma sono soltanto un indifferente."
          ],
          hint: "Il monologo interiore che definisce la crisi morale della gioventù borghese."
        }
      ],
      quiz: [
        { q: "A che età Alberto Moravia scrisse il capolavoro 'Gli indifferenti'?", o: ["A soli 22 anni", "A 35 anni", "A 45 anni", "A 50 anni"], a: 0 },
        { q: "In quale città è ambientata la maggior parte dei romanzi di Moravia?", o: ["Milano", "Roma", "Napoli", "Firenze"], a: 1 },
        { q: "Quale attrice vinse l'Oscar per il film 'La ciociara' tratto dal romanzo di Moravia?", o: ["Gina Lollobrigida", "Sophia Loren", "Anna Magnani", "Claudia Cardinale"], a: 1 },
        { q: "Qual è il tema centrale del romanzo 'La noia'?", o: ["Il gioco d'azzardo", "L'incapacità di stabilire un contatto autentico con la realtà", "La vita militare", "L'amore cortese"], a: 1 },
        { q: "Quale rivista culturale fondò Moravia insieme ad Alberto Carocci nel 1953?", o: ["La Voce", "Nuovi Argomenti", "Il Politecnico", "Lacerba"], a: 1 }
      ]
    },
    'a19': { // Fenoglio
      topic: "Beppe Fenoglio",
      impiccato: [
        { word: "JOHNNY", hint: "Il partigiano protagonista del capolavoro postumo" },
        { word: "ALBA", hint: "I ventitré giorni della città di..." },
        { word: "MILTON", hint: "Il partigiano innamorato di Fulvia in Una questione privata" },
        { word: "RESISTENZA", hint: "La lotta partigiana sulle colline piemontesi" }
      ],
      puzzle: [
        { words: ["Over", "the", "rainbow", "canticchiava", "Johnny", "nella", "nebbia"], solution: "Over the rainbow canticchiava Johnny nella nebbia", source: "Il partigiano Johnny" },
        { words: ["L'amore", "era", "una", "questione", "privata", "in", "mezzo", "alla", "guerra"], solution: "L'amore era una questione privata in mezzo alla guerra", source: "Una questione privata" },
        { words: ["Partirono", "all'alba", "per", "la", "collina", "con", "il", "fucile"], solution: "Partirono all'alba per la collina con il fucile", source: "I ventitré giorni della città di Alba" }
      ],
      cloze: [
        {
          text: "I ventitré giorni della città di ___ racconta la prima liberazione della cittadina piemontese da parte dei partigiani.",
          blanks: ["Alba"],
          source: "I ventitré giorni della città di Alba"
        },
        {
          text: "Milton corre disperato attraverso le colline delle Langhe per scoprire la verità sull'amore di ___ .",
          blanks: ["Fulvia"],
          source: "Una questione privata"
        }
      ],
      versi: [
        {
          title: "Il partigiano Johnny (Incipit)",
          lines: [
            "Johnny era un giovane alto e magro,",
            "innamorato della lingua inglese e della libertà.",
            "Salì sulle colline delle Langhe",
            "quando la scelta divenne inevitabile."
          ],
          hint: "L'introduzione all'epopea partigiana raccontata con stile solenne e moderno."
        }
      ],
      quiz: [
        { q: "In quale città piemontese nacque e visse Beppe Fenoglio?", o: ["Cuneo", "Alba", "Torino", "Asti"], a: 1 },
        { q: "Quale lingua straniera Fenoglio amava profondamente e mescolava alla prosa italiana?", o: ["Il francese", "L'inglese (fenglese)", "Il tedesco", "Lo spagnolo"], a: 1 },
        { q: "Come si chiama il protagonista di 'Una questione privata'?", o: ["Johnny", "Milton", "Giorgio", "Ivan"], a: 1 },
        { q: "Quale celebre autore definì 'Una questione privata' il romanzo perfetto sulla Resistenza?", o: ["Eugenio Montale", "Italo Calvino", "Alberto Moravia", "Pier Paolo Pasolini"], a: 1 },
        { q: "Quanti giorni durò la Repubblica partigiana di Alba raccontata nella sua raccolta?", o: ["Dieci giorni", "Ventitré giorni", "Cento giorni", "Un mese"], a: 1 }
      ]
    },
    'a20': { // Pasolini
      topic: "Pier Paolo Pasolini",
      impiccato: [
        { word: "RAGAZZI", hint: "... di vita (il romanzo del 1955 sulle borgate romane)" },
        { word: "ACCATTONE", hint: "Il suo primo e folgorante film da regista" },
        { word: "BORGATE", hint: "Le periferie romane teatro delle sue storie" },
        { word: "CENERI", hint: "Le... di Gramsci (famoso poemetto civile)" }
      ],
      puzzle: [
        { words: ["Il", "mondo", "delle", "borgate", "viveva", "fuori", "dalla", "storia"], solution: "Il mondo delle borgate viveva fuori dalla storia", source: "Ragazzi di vita" },
        { words: ["Lo", "scandalo", "del", "contraddirmi", "dell'essere", "con", "te", "e", "contro", "te"], solution: "Lo scandalo del contraddirmi dell'essere con te e contro te", source: "Le ceneri di Gramsci" },
        { words: ["La", "passione", "per", "la", "vita", "è", "più", "forte", "della", "morte"], solution: "La passione per la vita è più forte della morte", source: "Una vita violenta" }
      ],
      cloze: [
        {
          text: "Il Riccetto è il giovane protagonista che si muove tra il Tevere e le borgate romane in Ragazzi di ___ .",
          blanks: ["vita"],
          source: "Ragazzi di vita"
        },
        {
          text: "Pasolini diresse capolavori del cinema come Accattone, Mamma Roma e Il Vangelo secondo ___ .",
          blanks: ["Matteo"],
          source: "Filmografia pasoliniana"
        }
      ],
      versi: [
        {
          title: "Le ceneri di Gramsci",
          lines: [
            "Non è di maggio questa impura aria",
            "che il buio giardino straniero",
            "fa ancora più buio, o l'abbaglia",
            "con cieche schiarite..."
          ],
          hint: "L'inizio del celebre poemetto civile ambientato al Cimitero Acattolico di Roma."
        }
      ],
      quiz: [
        { q: "In quale lingua o dialetto Pasolini scrisse le sue prime poesie giovanili (Poesie a Casarsa)?", o: ["Romano", "Friulano", "Veneto", "Napoletano"], a: 1 },
        { q: "Qual è il primo celeberrimo romanzo ambientato nelle borgate romane pubblicato nel 1955?", o: ["Una vita violenta", "Ragazzi di vita", "Petrolio", "Teorema"], a: 1 },
        { q: "Come si chiamava il giovane protagonista di 'Ragazzi di vita'?", o: ["Il Riccetto", "Tommaso Puzzilli", "Accattone", "Stracci"], a: 0 },
        { q: "Quale film di Pasolini del 1964 fu lodato a livello mondiale per la sua fedeltà al testo sacro?", o: ["Edipo Re", "Il Vangelo secondo Matteo", "Medea", "Decameron"], a: 1 },
        { q: "In quale località sul litorale romano avvenne la tragica scomparsa di Pasolini nel 1975?", o: ["Fregene", "Idroscalo di Ostia", "Anzio", "Civitavecchia"], a: 1 }
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
          // Build mixed data dynamically from MISSION_DATA
          let mixedData = {
              topic: "Sfida Casuale Mista",
              impiccato: [],
              puzzle: [],
              cloze: [],
              versi: [],
              quiz: []
          };
          
          for(let aid in MISSION_DATA) {
              if(aid !== 'mixed' && MISSION_DATA[aid]) {
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
      return MISSION_DATA[missionId] || DEFAULT_DATA;
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
