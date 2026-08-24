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
    'a21': {
          "topic": "Natalia Ginzburg",
          "impiccato": [
                {
                      "word": "LESSICO",
                      "hint": "Il celebre romanzo '... famigliare' vincitore dello Strega"
                },
                {
                      "word": "LEVI",
                      "hint": "Cognome da nubile della scrittrice torinese"
                },
                {
                      "word": "FAMIGLIA",
                      "hint": "Il nucleo centrale di memorie, frasi e legami"
                },
                {
                      "word": "EINAUDI",
                      "hint": "La casa editrice con cui collaborò attivamente"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Basta",
                            "una",
                            "parola",
                            "per",
                            "riconoscersi",
                            "subito",
                            "tra",
                            "fratelli"
                      ],
                      "solution": "Basta una parola per riconoscerisi subito tra fratelli",
                      "source": "Lessico famigliare"
                },
                {
                      "words": [
                            "Le",
                            "cose",
                            "che",
                            "abbiamo",
                            "vissuto",
                            "non",
                            "si",
                            "cancellano"
                      ],
                      "solution": "Le cose che abbiamo vissuto non si cancellano",
                      "source": "Le piccole virtù"
                }
          ],
          "cloze": [
                {
                      "text": "In Lessico famigliare, le frasi e i modi di dire ripetuti dal padre Giuseppe diventano il filo conduttore della memoria della famiglia ___ .",
                      "blanks": [
                            "Levi"
                      ],
                      "source": "Lessico famigliare"
                },
                {
                      "text": "Ai nostri figli dobbiamo insegnare non le piccole virtù, ma le ___ come l'amore per il vero e per la giustizia.",
                      "blanks": [
                            "grandi"
                      ],
                      "source": "Le piccole virtù"
                }
          ],
          "versi": [
                {
                      "title": "Lessico famigliare (Riflessione)",
                      "lines": [
                            "Noi siamo cinque fratelli.",
                            "Abitiamo in città diverse,",
                            "ma basta una parola, una frase di casa,",
                            "per ritrovare all'istante la nostra infanzia."
                      ],
                      "hint": "Il valore delle parole e delle abitudini familiari condivise nel tempo."
                }
          ],
          "quiz": [
                {
                      "q": "Quale romanzo di Natalia Ginzburg vinse il Premio Strega nel 1963?",
                      "o": [
                            "Le voci della sera",
                            "Lessico famigliare",
                            "Caro Michele",
                            "Tutti i nostri ieri"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale grande intellettuale e antifascista fu marito di Natalia Ginzburg?",
                      "o": [
                            "Cesare Pavese",
                            "Leone Ginzburg",
                            "Italo Calvino",
                            "Alberto Moravia"
                      ],
                      "a": 1
                },
                {
                      "q": "Di cosa parla principalmente 'Lessico famigliare'?",
                      "o": [
                            "Di un viaggio in America",
                            "Delle memorie della famiglia Levi attraverso i loro modi di dire",
                            "Di un giallo ambientato a Roma",
                            "Della guerra del Risorgimento"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale città piemontese visse a lungo Natalia Ginzburg lavorando per Einaudi?",
                      "o": [
                            "Torino",
                            "Genova",
                            "Asti",
                            "Milano"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale saggio pedagogico e morale raccoglie le riflessioni di Natalia sull'educazione?",
                      "o": [
                            "Le piccole virtù",
                            "La città e la casa",
                            "Mai devi domandarmi",
                            "Serena Cruz"
                      ],
                      "a": 0
                }
          ]
    },
    'a22': {
          "topic": "Leonardo Sciascia",
          "impiccato": [
                {
                      "word": "CIVETTA",
                      "hint": "Il giorno della... celebre romanzo d'inchiesta"
                },
                {
                      "word": "BELLODI",
                      "hint": "Il capitano dei carabinieri protagonista"
                },
                {
                      "word": "RACALMUTO",
                      "hint": "Città natale dello scrittore in Sicilia"
                },
                {
                      "word": "GIALLO",
                      "hint": "Genere investigativo usato come strumento di denuncia"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "La",
                            "verità",
                            "è",
                            "nel",
                            "fondo",
                            "di",
                            "un",
                            "pozzo"
                      ],
                      "solution": "La verità è nel fondo di un pozzo",
                      "source": "Il giorno della civetta"
                },
                {
                      "words": [
                            "Io",
                            "ho",
                            "una",
                            "certa",
                            "pratica",
                            "del",
                            "mondo"
                      ],
                      "solution": "Io ho una certa pratica del mondo",
                      "source": "Il giorno della civetta (Don Mariano)"
                }
          ],
          "cloze": [
                {
                      "text": "Il capitano ___ indaga sull'omicidio dell'appaltatore Colasberna sfidando l'omertà mafiosa in Sicilia.",
                      "blanks": [
                            "Bellodi"
                      ],
                      "source": "Il giorno della civetta"
                },
                {
                      "text": "A ciascuno il ___ è un romanzo d'indagine in cui il professor Laurana cerca la verità su un duplice omicidio.",
                      "blanks": [
                            "suo"
                      ],
                      "source": "A ciascuno il suo"
                }
          ],
          "versi": [
                {
                      "title": "Il giorno della civetta (Epigrafe)",
                      "lines": [
                            "...come la civetta",
                            "quando di giorno compare",
                            "e tutti gli uccelli la beffeggiano,",
                            "così la mafia esce alla luce del sole."
                      ],
                      "hint": "La celebre citazione shakespeariana che apre il romanzo di Sciascia."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è il primo celebre romanzo di Sciascia a denunciare apertamente la mafia?",
                      "o": [
                            "Todo modo",
                            "Il giorno della civetta",
                            "Candido",
                            "Il cavaliere e la morte"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale capitano dei carabinieri guida le indagini ne 'Il giorno della civetta'?",
                      "o": [
                            "Capitano Bellodi",
                            "Capitano De Bellis",
                            "Maresciallo Cecchini",
                            "Ispettore Laurana"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale provincia siciliana nacque Leonardo Sciascia?",
                      "o": [
                            "Palermo",
                            "Agrigento (Racalmuto)",
                            "Catania",
                            "Siracusa"
                      ],
                      "a": 1
                },
                {
                      "q": "Come usava il genere poliziesco ('giallo') Leonardo Sciascia?",
                      "o": [
                            "Come semplice passatempo",
                            "Come strumento critico per indagare il potere e la giustizia",
                            "Per scrivere fiabe per bambini",
                            "Per fare propaganda militare"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale libro di Sciascia analizza il drammatico rapimento di Aldo Moro?",
                      "o": [
                            "La scomparsa di Majorana",
                            "L'affaire Moro",
                            "Porte aperte",
                            "Dalle parti degli infedeli"
                      ],
                      "a": 1
                }
          ]
    },
    'a23': {
          "topic": "Alda Merini",
          "impiccato": [
                {
                      "word": "NAVIGLI",
                      "hint": "La zona caratteristica di Milano dove ha sempre vissuto"
                },
                {
                      "word": "MANICOMIO",
                      "hint": "L'esperienza dolorosa dell'internamento durata anni"
                },
                {
                      "word": "POESIA",
                      "hint": "L'amore viscerale e la sorgente della sua vita"
                },
                {
                      "word": "TERRA",
                      "hint": "... Santa (sua celebre raccolta poetica)"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Sono",
                            "nata",
                            "il",
                            "ventuno",
                            "a",
                            "primavera"
                      ],
                      "solution": "Sono nata il ventuno a primavera",
                      "source": "Vuoto d'amore"
                },
                {
                      "words": [
                            "La",
                            "poesia",
                            "è",
                            "la",
                            "pelle",
                            "del",
                            "mio",
                            "cuore"
                      ],
                      "solution": "La poesia è la pelle del mio cuore",
                      "source": "Aforismi"
                }
          ],
          "cloze": [
                {
                      "text": "Sono nata il ventuno a ___ ma non sapevo che nascere folle, aprire le zolle potesse scatenar ___.",
                      "blanks": [
                            "primavera",
                            "tempesta"
                      ],
                      "source": "Sono nata il ventuno a primavera"
                },
                {
                      "text": "La terra ___ è la drammatica e luminosa testimonianza in versi dell'esperienza del manicomio.",
                      "blanks": [
                            "santa"
                      ],
                      "source": "La Terra Santa"
                }
          ],
          "versi": [
                {
                      "title": "Sono nata il ventuno a primavera",
                      "lines": [
                            "Sono nata il ventuno a primavera",
                            "ma non sapevo che nascere folle,",
                            "aprire le zolle",
                            "potesse scatenar tempesta."
                      ],
                      "hint": "I quattro versi iconici della poetessa milanese sulla sua nascita e la sua sensibilità."
                }
          ],
          "quiz": [
                {
                      "q": "In quale giorno simbolico dell'anno nacque Alda Merini?",
                      "o": [
                            "Il 25 dicembre",
                            "Il 21 marzo (primo giorno di primavera)",
                            "Il 1° maggio",
                            "Il 15 agosto"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale famoso quartiere di Milano si trovava la casa di Alda Merini?",
                      "o": [
                            "Brera",
                            "Sui Navigli",
                            "Isola",
                            "San Siro"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale raccolta valse alla Merini il Premio Librex Montale nel 1993?",
                      "o": [
                            "La Terra Santa",
                            "La presenza di Orfeo",
                            "Testamento",
                            "Ballate non pagate"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale celebre romanzo autobiografico in prosa racconta la sua follia e rinascita?",
                      "o": [
                            "L'altra verità. Diario di una diversa",
                            "Lessico famigliare",
                            "Menzogna e sortilegio",
                            "La Storia"
                      ],
                      "a": 0
                },
                {
                      "q": "Come scriveva spesso Alda Merini i suoi celebri aforismi e versi?",
                      "o": [
                            "Al computer",
                            "Dettando al telefono o con la macchina da scrivere",
                            "In latino su pergamena",
                            "In tipografia"
                      ],
                      "a": 1
                }
          ]
    },
    'a24': {
          "topic": "Umberto Saba",
          "impiccato": [
                {
                      "word": "CANZONIERE",
                      "hint": "La monumentale raccolta di tutta la sua vita poetica"
                },
                {
                      "word": "TRIESTE",
                      "hint": "La città amata 'dall'aria strana e tormentosa'"
                },
                {
                      "word": "LINA",
                      "hint": "La moglie amatissima celebrata nelle poesie"
                },
                {
                      "word": "ONESTA",
                      "hint": "La poesia '... e chiara' teorizzata da Saba"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Ho",
                            "attraversato",
                            "tutta",
                            "la",
                            "città",
                            "poi",
                            "ho",
                            "salita",
                            "un'erta"
                      ],
                      "solution": "Ho attraversato tutta la città poi ho salita un'erta",
                      "source": "Trieste"
                },
                {
                      "words": [
                            "Tu",
                            "sei",
                            "come",
                            "una",
                            "giovane",
                            "una",
                            "bianca",
                            "pollastra"
                      ],
                      "solution": "Tu sei come una giovane una bianca pollastra",
                      "source": "A mia moglie"
                }
          ],
          "cloze": [
                {
                      "text": "Trieste ha un'ascosa grazia. Se piace, è come un ragazzaccio aspro e vorace, con gli occhi ___ e mani troppo grandi per regalare un fiore.",
                      "blanks": [
                            "azzurri"
                      ],
                      "source": "Trieste"
                },
                {
                      "text": "La città ___ di Trieste è il luogo dove il poeta ritrova l'infinito nell'umiltà della vita popolare.",
                      "blanks": [
                            "vecchia"
                      ],
                      "source": "Città vecchia"
                }
          ],
          "versi": [
                {
                      "title": "Trieste",
                      "lines": [
                            "Ho attraversato tutta la città.",
                            "Poi ho salita un'erta,",
                            "popolosa in principio, in là deserta,",
                            "chiusa da un muricciolo:"
                      ],
                      "hint": "I primi versi della lirica che ritrae Trieste come una creatura viva e aspra."
                }
          ],
          "quiz": [
                {
                      "q": "In quale città di frontiera nacque e visse Umberto Saba?",
                      "o": [
                            "Venezia",
                            "Trieste",
                            "Udine",
                            "Trento"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è il titolo unico che raccoglie l'intera produzione poetica di Saba?",
                      "o": [
                            "I Canti",
                            "Il Canzoniere",
                            "Ossi di seppia",
                            "Myricae"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale negozio storico gestiva Umberto Saba a Trieste?",
                      "o": [
                            "Una farmacia",
                            "Una libreria antiquaria",
                            "Un caffè letterario",
                            "Una tipografia"
                      ],
                      "a": 1
                },
                {
                      "q": "A chi paragona la moglie nella celebre poesia 'A mia moglie'?",
                      "o": [
                            "Alle dee greche",
                            "Agli animali umili della fattoria (la pollastra, la cagna, la giovenca)",
                            "Ai fiori rari",
                            "Alle stelle del cielo"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa intendeva Saba per 'poesia onesta'?",
                      "o": [
                            "Poesie senza guadagno",
                            "Una poesia sincera, chiara, che cerca la verità dei sentimenti",
                            "Poesie religiose",
                            "Poesie in latino"
                      ],
                      "a": 1
                }
          ]
    },
    'primi-documenti': {
          "topic": "I Primi Documenti in Volgare",
          "impiccato": [
                {
                      "word": "PLACITO",
                      "hint": "Il Placito Capuano del 960 d.C."
                },
                {
                      "word": "CAPUA",
                      "hint": "La città campana del primo documento ufficiale"
                },
                {
                      "word": "VOLGARE",
                      "hint": "La lingua parlata dal popolo che sostituisce il latino"
                },
                {
                      "word": "INDOVINELLO",
                      "hint": "L'antico testo Veronese sul lavoro dello scrivano"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Sao",
                            "ko",
                            "kelle",
                            "terre",
                            "per",
                            "kelle",
                            "fini",
                            "que",
                            "ki",
                            "contene"
                      ],
                      "solution": "Sao ko kelle terre per kelle fini que ki contene",
                      "source": "Placito Capuano (960 d.C.)"
                },
                {
                      "words": [
                            "Se",
                            "pareba",
                            "boves",
                            "alba",
                            "pratalia",
                            "araba"
                      ],
                      "solution": "Se pareba boves alba pratalia araba",
                      "source": "Indovinello Veronese"
                }
          ],
          "cloze": [
                {
                      "text": "Sao ko kelle terre, per kelle fini que ki contene, trenta anni le possette parte Sancti ___ .",
                      "blanks": [
                            "Benedicti"
                      ],
                      "source": "Placito Capuano"
                },
                {
                      "text": "L'Indovinello Veronese paragona le dita della mano ai buoi e la penna all' ___ che ara la pagina bianca.",
                      "blanks": [
                            "aratro"
                      ],
                      "source": "Indovinello Veronese"
                }
          ],
          "versi": [
                {
                      "title": "Placito Capuano (960 d.C.)",
                      "lines": [
                            "Sao ko kelle terre,",
                            "per kelle fini que ki contene,",
                            "trenta anni le possette",
                            "parte Sancti Benedicti."
                      ],
                      "hint": "La prima formula giuridica in volgare italiano giunta fino a noi."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è considerato l'atto di nascita ufficiale della lingua italiana scritta?",
                      "o": [
                            "La Divina Commedia",
                            "Il Placito Capuano del 960",
                            "Il Cantico delle Creature",
                            "Il Decameron"
                      ],
                      "a": 1
                },
                {
                      "q": "A cosa allude la metafora dei 'buoi' e del 'prato bianco' nell'Indovinello Veronese?",
                      "o": [
                            "Al lavoro dei contadini",
                            "Al lavoro di scrittura dello scrivano sulla pergamena",
                            "A una leggenda longobarda",
                            "A una fiera di paese"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale ordine religioso era proprietario delle terre contese nel Placito Capuano?",
                      "o": [
                            "I Francescani",
                            "I Benedettini di Montecassino",
                            "I Domenicani",
                            "I Gesuiti"
                      ],
                      "a": 1
                },
                {
                      "q": "Da quale antica lingua derivano l'italiano e le altre lingue romanze?",
                      "o": [
                            "Dal greco antico",
                            "Dal latino volgare parlato",
                            "Dal tedesco medievale",
                            "Dall'arabo"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa significa il termine 'volgare' nel contesto medievale?",
                      "o": [
                            "Offensivo e sgarbato",
                            "Lingua parlata dal popolo (vulgus)",
                            "Lingua dei nobili",
                            "Lingua straniera"
                      ],
                      "a": 1
                }
          ]
    },
    'scuola-siciliana': {
          "topic": "La Scuola Siciliana",
          "impiccato": [
                {
                      "word": "SONETTO",
                      "hint": "La forma metrica di 14 versi inventata da Giacomo da Lentini"
                },
                {
                      "word": "FEDERICO",
                      "hint": "L'imperatore svevo mecenate della corte a Palermo"
                },
                {
                      "word": "NOTARO",
                      "hint": "Soprannome di Giacomo da Lentini"
                },
                {
                      "word": "CORTE",
                      "hint": "La Magna Curia imperiale dove nasce la lirica"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Amor",
                            "è",
                            "un",
                            "desio",
                            "che",
                            "ven",
                            "da",
                            "core"
                      ],
                      "solution": "Amor è un desio che ven da core",
                      "source": "Giacomo da Lentini"
                },
                {
                      "words": [
                            "Meravigliosamente",
                            "un",
                            "amor",
                            "mi",
                            "distringe"
                      ],
                      "solution": "Meravigliosamente un amor mi distringe",
                      "source": "Giacomo da Lentini"
                }
          ],
          "cloze": [
                {
                      "text": "Giacomo da Lentini, detto il Notaro, è considerato l'inventore del ___ , composto da 14 endecasillabi.",
                      "blanks": [
                            "sonetto"
                      ],
                      "source": "Scuola Siciliana"
                },
                {
                      "text": "Amor è un desio che ven da core per abondanza di gran ___ ; e li occhi prima generan l'amore e lo core li dà nutricamento.",
                      "blanks": [
                            "piacimento"
                      ],
                      "source": "Giacomo da Lentini"
                }
          ],
          "versi": [
                {
                      "title": "Amor è un desio che ven da core",
                      "lines": [
                            "Amor è un desio che ven da core",
                            "per abondanza di gran piacimento;",
                            "e li occhi prima generan l'amore",
                            "e lo core li dà nutricamento."
                      ],
                      "hint": "La prima quartina del sonetto teorico sulla nascita dell'amore attraverso la vista."
                }
          ],
          "quiz": [
                {
                      "q": "Chi è storicamente riconosciuto come l'inventore del sonetto?",
                      "o": [
                            "Dante Alighieri",
                            "Giacomo da Lentini (Il Notaro)",
                            "Francesco Petrarca",
                            "Guido Cavalcanti"
                      ],
                      "a": 1
                },
                {
                      "q": "Presso quale corte imperiale fiorì la Scuola Poetica Siciliana?",
                      "o": [
                            "Alla corte di Carlo Magno",
                            "Alla corte di Federico II di Svevia",
                            "A Firenze con i Medici",
                            "A Roma con il Papa"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual era la professione principale dei poeti della Scuola Siciliana?",
                      "o": [
                            "Giullari e cantastorie",
                            "Funzionari, notai e magistrati della Magna Curia",
                            "Monaci amanuensi",
                            "Cavalieri mercenari"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è il tema quasi esclusivo delle poesie della Scuola Siciliana?",
                      "o": [
                            "Le battaglie cavalleresche",
                            "L'amore cortese",
                            "La politica cittadina",
                            "I miracoli dei santi"
                      ],
                      "a": 1
                },
                {
                      "q": "Quanti versi compongono la struttura metrica classica di un sonetto?",
                      "o": [
                            "Dodici",
                            "Quattordici (due quartine e due terzine)",
                            "Sedici",
                            "Venti"
                      ],
                      "a": 1
                }
          ]
    },
    'francesco-assisi': {
          "topic": "Francesco d'Assisi",
          "impiccato": [
                {
                      "word": "CANTICO",
                      "hint": "Il... delle creature (o di Frate Sole)"
                },
                {
                      "word": "POVERTA",
                      "hint": "La 'Madonna Povertà' scelta come regola di vita"
                },
                {
                      "word": "ASSISI",
                      "hint": "La città umbra del Poverello"
                },
                {
                      "word": "CREATURE",
                      "hint": "Fratello Sole, Sorella Luna e tutte le opere del Creato"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Laudato",
                            "sie",
                            "mi",
                            "Signore",
                            "cum",
                            "tutte",
                            "le",
                            "tue",
                            "creature"
                      ],
                      "solution": "Laudato sie mi Signore cum tutte le tue creature",
                      "source": "Cantico delle Creature"
                },
                {
                      "words": [
                            "Laudato",
                            "si",
                            "mi",
                            "Signore",
                            "per",
                            "sora",
                            "nostra",
                            "morte",
                            "corporale"
                      ],
                      "solution": "Laudato si mi Signore per sora nostra morte corporale",
                      "source": "Cantico delle Creature"
                }
          ],
          "cloze": [
                {
                      "text": "Altissimu, onnipotente, bon Signore, tue so' le laude, la gloria e l'onore et onne ___ .",
                      "blanks": [
                            "benedictioni"
                      ],
                      "source": "Cantico delle Creature"
                },
                {
                      "text": "Laudato sie, mi' Signore, per sora nostra matre ___ , la quale ne sustenta e governa.",
                      "blanks": [
                            "terra"
                      ],
                      "source": "Cantico delle Creature"
                }
          ],
          "versi": [
                {
                      "title": "Cantico delle Creature (Incipit)",
                      "lines": [
                            "Altissimu, onnipotente, bon Signore,",
                            "tue so' le laude, la gloria e l'honore et onne benedictione.",
                            "Ad te solo, Altissimo, se konfano,",
                            "et nullu homo ène dignu te mentovare."
                      ],
                      "hint": "La solenne lode introduttiva a Dio del primo capolavoro in volgare umbro (1224)."
                }
          ],
          "quiz": [
                {
                      "q": "In quale anno fu composto il 'Cantico delle creature'?",
                      "o": [
                            "1000",
                            "1224",
                            "1300",
                            "1492"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale volgare regionale è scritto il Cantico di Frate Sole?",
                      "o": [
                            "Volgare toscano",
                            "Volgare umbro",
                            "Volgare siciliano",
                            "Latino ecclesiastico"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale elemento del creato è chiamato 'utile et humile et pretiosa et casta'?",
                      "o": [
                            "Il fuoco",
                            "L'acqua (Sorella Acqua)",
                            "La terra",
                            "Il vento"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa fece Francesco nella piazza di Assisi davanti al vescovo per cambiare vita?",
                      "o": [
                            "Si fece incoronare cavaliere",
                            "Si spogliò di tutti i suoi ricchi abiti restituendoli al padre",
                            "Partì per le Crociate",
                            "Costruì un castello"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale animale feroce secondo la tradizione fu ammansito da Francesco a Gubbio?",
                      "o": [
                            "Un orso",
                            "Un lupo",
                            "Un leone",
                            "Un cinghiale"
                      ],
                      "a": 1
                }
          ]
    },
    'dante-alighieri-sec': {
          "topic": "Dante Alighieri",
          "impiccato": [
                {
                      "word": "COMMEDIA",
                      "hint": "La Divina Commedia, il capolavoro dell'oltretomba"
                },
                {
                      "word": "BEATRICE",
                      "hint": "La donna amata guida nel Paradiso"
                },
                {
                      "word": "VIRGILIO",
                      "hint": "Il poeta latino maestro e guida nell'Inferno"
                },
                {
                      "word": "SELVA",
                      "hint": "La... oscura dove Dante si ritrova smarrito"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Nel",
                            "mezzo",
                            "del",
                            "cammin",
                            "di",
                            "nostra",
                            "vita"
                      ],
                      "solution": "Nel mezzo del cammin di nostra vita",
                      "source": "Inferno (Canto I)"
                },
                {
                      "words": [
                            "L'amor",
                            "che",
                            "move",
                            "il",
                            "sole",
                            "e",
                            "l'altre",
                            "stelle"
                      ],
                      "solution": "L'amor che move il sole e l'altre stelle",
                      "source": "Paradiso (Canto XXXIII)"
                },
                {
                      "words": [
                            "Fatti",
                            "non",
                            "foste",
                            "a",
                            "viver",
                            "come",
                            "bruti"
                      ],
                      "solution": "Fatti non foste a viver come bruti",
                      "source": "Inferno (Ulisse, Canto XXVI)"
                }
          ],
          "cloze": [
                {
                      "text": "Nel mezzo del cammin di nostra vita mi ritrovai per una selva ___ , ché la diritta via era smarrita.",
                      "blanks": [
                            "oscura"
                      ],
                      "source": "Inferno, Canto I"
                },
                {
                      "text": "Fatti non foste a viver come bruti, ma per seguir virtute e ___ .",
                      "blanks": [
                            "canoscenza"
                      ],
                      "source": "Inferno, Canto XXVI (Ulisse)"
                }
          ],
          "versi": [
                {
                      "title": "Inferno - Canto I (Incipit)",
                      "lines": [
                            "Nel mezzo del cammin di nostra vita",
                            "mi ritrovai per una selva oscura,",
                            "ché la diritta via era smarrita.",
                            "Ahi quanto a dir qual era è cosa dura"
                      ],
                      "hint": "I celeberrimi primi versi in terzine incatenate dell'inizio del viaggio nell'Oltretomba."
                }
          ],
          "quiz": [
                {
                      "q": "Quale aggettivo fu aggiunto per primo da Giovanni Boccaccio al titolo 'Commedia'?",
                      "o": [
                            "Sublime",
                            "Divina",
                            "Eterna",
                            "Sacra"
                      ],
                      "a": 1
                },
                {
                      "q": "Quanti canti compongono complessivamente la Divina Commedia?",
                      "o": [
                            "33",
                            "99",
                            "100 (1 proemiale + 33 per cantica)",
                            "150"
                      ],
                      "a": 2
                },
                {
                      "q": "Chi guida Dante attraverso l'Inferno e il Purgatorio?",
                      "o": [
                            "Beatrice",
                            "Virgilio",
                            "San Bernardo",
                            "Omero"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale fazione politica militava Dante a Firenze prima dell'esilio nel 1301?",
                      "o": [
                            "Ghibellini",
                            "Guelfi Bianchi",
                            "Guelfi Neri",
                            "Popolo minuto"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è l'ultima parola che chiude tutte e tre le cantiche (Inferno, Purgatorio, Paradiso)?",
                      "o": [
                            "Amore",
                            "Luce",
                            "Stelle",
                            "Dio"
                      ],
                      "a": 2
                }
          ]
    },
    'francesco-petrarca': {
          "topic": "Francesco Petrarca",
          "impiccato": [
                {
                      "word": "CANZONIERE",
                      "hint": "Le 366 rime sparse dedicate a Laura"
                },
                {
                      "word": "LAURA",
                      "hint": "La donna amata incontrata il 6 aprile ad Avignone"
                },
                {
                      "word": "VALCHIUSA",
                      "hint": "Il rifugio solitario in Provenza amato dal poeta"
                },
                {
                      "word": "LAURO",
                      "hint": "La pianta d'alloro simbolo di gloria poetica"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Voi",
                            "ch'ascoltate",
                            "in",
                            "rime",
                            "sparse",
                            "il",
                            "suono"
                      ],
                      "solution": "Voi ch'ascoltate in rime sparse il suono",
                      "source": "Canzoniere (Sonetto I)"
                },
                {
                      "words": [
                            "Chiare",
                            "fresche",
                            "et",
                            "dolci",
                            "acque"
                      ],
                      "solution": "Chiare fresche et dolci acque",
                      "source": "Canzoniere (Canzone 126)"
                },
                {
                      "words": [
                            "Solo",
                            "et",
                            "pensoso",
                            "i",
                            "più",
                            "deserti",
                            "campi",
                            "vo",
                            "misurando"
                      ],
                      "solution": "Solo et pensoso i più deserti campi vo misurando",
                      "source": "Canzoniere (Sonetto 35)"
                }
          ],
          "cloze": [
                {
                      "text": "Voi ch'ascoltate in rime sparse il suono di quei sospiri ond'io nudriva 'l ___ in sul mio primo giovenile errore...",
                      "blanks": [
                            "core"
                      ],
                      "source": "Canzoniere"
                },
                {
                      "text": "Chiare, fresche et dolci ___ , ove le belle membra pose colei che sola a me par donna...",
                      "blanks": [
                            "acque"
                      ],
                      "source": "Canzoniere"
                }
          ],
          "versi": [
                {
                      "title": "Voi ch'ascoltate in rime sparse (Sonetto I)",
                      "lines": [
                            "Voi ch'ascoltate in rime sparse il suono",
                            "di quei sospiri ond'io nudriva 'l core",
                            "in sul mio primo giovenile errore",
                            "quand'era in parte altr'uom da quel ch'i' sono,"
                      ],
                      "hint": "La quartina introduttiva dell'opera rivolta al lettore con pentimento e consapevolezza."
                }
          ],
          "quiz": [
                {
                      "q": "Quanti componimenti poetici contiene complessivamente il Canzoniere di Petrarca?",
                      "o": [
                            "100",
                            "300",
                            "366 (uno per ogni giorno dell'anno più l'introduttivo)",
                            "500"
                      ],
                      "a": 2
                },
                {
                      "q": "In quale città europea Petrarca fu solennemente incoronato poeta con la corona d'alloro nel 1341?",
                      "o": [
                            "Parigi",
                            "Roma (in Campidoglio)",
                            "Firenze",
                            "Avignone"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è il nome della donna cantata e idealizzata da Petrarca per tutta la vita?",
                      "o": [
                            "Beatrice",
                            "Laura",
                            "Silvia",
                            "Fiammetta"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale celebre monte provenzale Petrarca scalò descrivendo la salita in una famosa lettera?",
                      "o": [
                            "Monte Bianco",
                            "Monte Ventoux",
                            "Gran Sasso",
                            "Etna"
                      ],
                      "a": 1
                },
                {
                      "q": "Perché Petrarca è considerato il 'Padre dell'Umanesimo'?",
                      "o": [
                            "Perché ha fondato una scuola",
                            "Per la riscoperta filologica dei manoscritti latini classici e l'esplorazione dell'interiorità umana",
                            "Perché dipingeva ritratti",
                            "Perché era un banchiere"
                      ],
                      "a": 1
                }
          ]
    },
    'giovanni-boccaccio': {
          "topic": "Giovanni Boccaccio",
          "impiccato": [
                {
                      "word": "DECAMERON",
                      "hint": "Le cento novelle raccontate in dieci giorni"
                },
                {
                      "word": "PESTE",
                      "hint": "La tragica epidemia di Firenze del 1348 da cui fuggono i giovani"
                },
                {
                      "word": "BRIGATA",
                      "hint": "Il gruppo di sette ragazze e tre ragazzi narratori"
                },
                {
                      "word": "CALANDRINO",
                      "hint": "Il sempliciotto beffato da Bruno e Buffalmacco"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Umana",
                            "cosa",
                            "è",
                            "aver",
                            "compassione",
                            "degli",
                            "afflitti"
                      ],
                      "solution": "Umana cosa è aver compassione degli afflitti",
                      "source": "Decameron (Proemio)"
                },
                {
                      "words": [
                            "La",
                            "fortuna",
                            "spesso",
                            "aiuta",
                            "gli",
                            "audaci",
                            "e",
                            "gli",
                            "ingegnosi"
                      ],
                      "solution": "La fortuna spesso aiuta gli audaci e gli ingegnosi",
                      "source": "Decameron"
                }
          ],
          "cloze": [
                {
                      "text": "Nel 1348 a Firenze scoppia la terribile peste e una brigata di ___ giovani decide di rifugiarsi in campagna per raccontare novelle.",
                      "blanks": [
                            "dieci"
                      ],
                      "source": "Decameron"
                },
                {
                      "text": "Andreuccio da ___ va a comprare cavalli a Napoli e vive una notte di straordinarie disavventure e beffe.",
                      "blanks": [
                            "Perugia"
                      ],
                      "source": "Decameron"
                }
          ],
          "versi": [
                {
                      "title": "Decameron (Proemio)",
                      "lines": [
                            "Umana cosa è aver compassione degli afflitti:",
                            "e come che a ciascuna persona stia bene,",
                            "a coloro è massimamente richesto",
                            "i quali già hanno di conforto avuto mestiere."
                      ],
                      "hint": "L'esordio etico del capolavoro della prosa italiana in volgare dedicato a chi soffre per amore."
                }
          ],
          "quiz": [
                {
                      "q": "Quante novelle compongono complessivamente il Decameron di Boccaccio?",
                      "o": [
                            "50",
                            "100",
                            "120",
                            "366"
                      ],
                      "a": 1
                },
                {
                      "q": "Da quanti giovani è composta la brigata narratrice nel Decameron?",
                      "o": [
                            "Dieci (7 donne e 3 uomini)",
                            "Dodici",
                            "Cinque",
                            "Sette"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale tragico evento storico del 1348 fa da cornice all'opera?",
                      "o": [
                            "La battaglia di Montaperti",
                            "La Peste Nera a Firenze",
                            "L'incendio di Roma",
                            "L'invasione dei barbari"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale giovane nobile sacrifica il suo adorato falcone per offrire un pranzo alla donna amata?",
                      "o": [
                            "Federigo degli Alberighi",
                            "Andreuccio da Perugia",
                            "Calandrino",
                            "Chichibio"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi è il cuoco veneziano che convince il padrone Currado con una battuta sulle gru con una sola zampa?",
                      "o": [
                            "Chichibio",
                            "Frate Cipolla",
                            "Lisabetta da Messina",
                            "Nastagio degli Onesti"
                      ],
                      "a": 0
                }
          ]
    },
    'lorenzo-medici': {
          "topic": "Lorenzo de' Medici",
          "impiccato": [
                {
                      "word": "MAGNIFICO",
                      "hint": "Il celebre appellativo di Lorenzo"
                },
                {
                      "word": "GIOVINEZZA",
                      "hint": "Quant'è bella... che si fugge tuttavia!"
                },
                {
                      "word": "MECENATE",
                      "hint": "Protettore e finanziatore dei massimi geni rinascimentali"
                },
                {
                      "word": "FIRENZE",
                      "hint": "La culla del Rinascimento da lui governata"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Quant'è",
                            "bella",
                            "giovinezza",
                            "che",
                            "si",
                            "fugge",
                            "tuttavia"
                      ],
                      "solution": "Quant'è bella giovinezza che si fugge tuttavia",
                      "source": "Trionfo di Bacco e Arianna"
                },
                {
                      "words": [
                            "Chi",
                            "vuol",
                            "esser",
                            "lieto",
                            "sia",
                            "di",
                            "doman",
                            "non",
                            "c'è",
                            "certezza"
                      ],
                      "solution": "Chi vuol esser lieto sia di doman non c'è certezza",
                      "source": "Trionfo di Bacco e Arianna"
                }
          ],
          "cloze": [
                {
                      "text": "Quant'è bella giovinezza, che si fugge tuttavia! Chi vuol esser lieto, sia: di doman non c'è ___ .",
                      "blanks": [
                            "certezza"
                      ],
                      "source": "Trionfo di Bacco e Arianna"
                },
                {
                      "text": "Lorenzo il Magnifico fu detto l'ago della ___ per la sua abile capacità diplomatica nel mantenere la pace tra gli stati italiani.",
                      "blanks": [
                            "bilancia"
                      ],
                      "source": "Canzone a ballo"
                }
          ],
          "versi": [
                {
                      "title": "Trionfo di Bacco e Arianna",
                      "lines": [
                            "Quant'è bella giovinezza,",
                            "che si fugge tuttavia!",
                            "Chi vuol esser lieto, sia:",
                            "di doman non c'è certezza."
                      ],
                      "hint": "La celeberrima ripresa del canto carnascialesco che invita a godere il presente."
                }
          ],
          "quiz": [
                {
                      "q": "Quale famosa congiura del 1478 minacciò la vita di Lorenzo de' Medici nel Duomo di Firenze?",
                      "o": [
                            "La Congiura dei Pazzi",
                            "La Congiura di Catilina",
                            "La Congiura delle Polveri",
                            "La Congiura dei Baroni"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il ritornello immortale del 'Trionfo di Bacco e Arianna'?",
                      "o": [
                            "L'amor che move il sole",
                            "Quant'è bella giovinezza / che si fugge tuttavia",
                            "Sempre caro mi fu quest'ermo colle",
                            "Chi non lavora non fa l'amore"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale sommo artista scultore e pittore fu accolto giovinetto a vivere nel palazzo di Lorenzo?",
                      "o": [
                            "Michelangelo Buonarroti",
                            "Caravaggio",
                            "Giotto",
                            "Bernini"
                      ],
                      "a": 0
                },
                {
                      "q": "Come veniva definito Lorenzo per il suo ruolo di garante dell'equilibrio tra le potenze d'Italia?",
                      "o": [
                            "L'Ago della bilancia",
                            "Il Principe del mare",
                            "La Spada di Roma",
                            "Il Doge dei saggi"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale secolo visse e operò Lorenzo il Magnifico a Firenze?",
                      "o": [
                            "Duecento",
                            "Trecento",
                            "Quattrocento (XV secolo)",
                            "Seicento"
                      ],
                      "a": 2
                }
          ]
    },
    'ludovico-ariosto': {
          "topic": "Ludovico Ariosto",
          "impiccato": [
                {
                      "word": "FURIOSO",
                      "hint": "Orlando... reso pazzo per amore"
                },
                {
                      "word": "ANGELICA",
                      "hint": "La principessa del Catai amata da Orlando"
                },
                {
                      "word": "IPPOGRIFO",
                      "hint": "La mitica creatura alata su cui vola Astolfo"
                },
                {
                      "word": "LUNA",
                      "hint": "Il luogo dove si raccolgono tutte le cose perdute sulla terra"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Le",
                            "donne",
                            "i",
                            "cavalier",
                            "l'arme",
                            "gli",
                            "amori"
                      ],
                      "solution": "Le donne i cavalier l'arme gli amori",
                      "source": "Orlando Furioso (Incipit)"
                },
                {
                      "words": [
                            "Le",
                            "cortesie",
                            "l'audaci",
                            "imprese",
                            "io",
                            "canto"
                      ],
                      "solution": "Le cortesie l'audaci imprese io canto",
                      "source": "Orlando Furioso"
                }
          ],
          "cloze": [
                {
                      "text": "Le donne, i cavalier, l'arme, gli amori, le cortesie, le audaci imprese io canto, che furo al tempo che passaro i ___ d'Africa il mare...",
                      "blanks": [
                            "Mori"
                      ],
                      "source": "Orlando Furioso"
                },
                {
                      "text": "Il cavaliere Astolfo vola fino alla ___ per recuperare il senno perduto del paladino Orlando.",
                      "blanks": [
                            "Luna"
                      ],
                      "source": "Orlando Furioso"
                }
          ],
          "versi": [
                {
                      "title": "Orlando Furioso (Incipit - Canto I)",
                      "lines": [
                            "Le donne, i cavalier, l'arme, gli amori,",
                            "le cortesie, l'audaci imprese io canto,",
                            "che furo al tempo che passaro i Mori",
                            "d'Africa il mare, e in Francia nocquer tanto,"
                      ],
                      "hint": "L'indimenticabile ottava di apertura che intreccia il ciclo carolingio e quello bretone."
                }
          ],
          "quiz": [
                {
                      "q": "Presso quale illustre corte ducale visse e lavorò Ludovico Ariosto?",
                      "o": [
                            "Alla corte estense di Ferrara",
                            "Alla corte dei Gonzaga a Mantova",
                            "A Milano con gli Sforza",
                            "A Urbino con i Montefeltro"
                      ],
                      "a": 0
                },
                {
                      "q": "Per quale motivo il valoroso paladino Orlando perde il senno e diventa 'furioso'?",
                      "o": [
                            "Per una sconfitta militare",
                            "Perché scopre che Angelica ama il giovane fante saraceno Medoro",
                            "Per un incantesimo di Atlante",
                            "Perché gli rubano la spada"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale fantastica creatura alata cavalca Astolfo nel suo viaggio magico?",
                      "o": [
                            "Il Pegaso",
                            "L'Ippogrifo (metà aquila e metà cavallo)",
                            "Il Drago alato",
                            "La Fenice"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa si trova sulla Luna secondo il celebre episodio dell'Orlando Furioso?",
                      "o": [
                            "Miniere d'oro",
                            "Tutto ciò che gli uomini perdono sulla Terra (il senno, il tempo, i voti non mantenuti)",
                            "I mostri dell'oltretomba",
                            "Le anime dei guerrieri"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è la struttura metrica in cui è scritto tutto l'Orlando Furioso?",
                      "o": [
                            "Terzina dantesca",
                            "Ottava rima (strofe di 8 endecasillabi)",
                            "Sonetto",
                            "Verso sciolto"
                      ],
                      "a": 1
                }
          ]
    },
    'niccolo-machiavelli': {
          "topic": "Niccolò Machiavelli",
          "impiccato": [
                {
                      "word": "PRINCIPE",
                      "hint": "Il trattato politico fondatore della scienza moderna"
                },
                {
                      "word": "VOLPE",
                      "hint": "L'astuzia necessaria al sovrano insieme alla forza del leone"
                },
                {
                      "word": "FORTUNA",
                      "hint": "L'arbitra di metà delle nostre azioni umane"
                },
                {
                      "word": "VIRTU",
                      "hint": "La capacità dell'uomo di arginare la sorte avversa"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Il",
                            "fine",
                            "giustifica",
                            "i",
                            "mezzi"
                      ],
                      "solution": "Il fine giustifica i mezzi",
                      "source": "Massima attribuita a Il Principe"
                },
                {
                      "words": [
                            "Uno",
                            "principe",
                            "debbe",
                            "sapere",
                            "usare",
                            "la",
                            "bestia",
                            "e",
                            "l'uomo"
                      ],
                      "solution": "Uno principe debbe sapere usare la bestia e l'uomo",
                      "source": "Il Principe (Capitolo XVIII)"
                }
          ],
          "cloze": [
                {
                      "text": "Bisogna essere ___ per conoscere i lacci e leone per sbigottire i lupi.",
                      "blanks": [
                            "volpe"
                      ],
                      "source": "Il Principe, Cap. XVIII"
                },
                {
                      "text": "La fortuna è donna, ed è necessario, volendola tenere sotto, batterla e ___ .",
                      "blanks": [
                            "urtarla"
                      ],
                      "source": "Il Principe, Cap. XXV"
                }
          ],
          "versi": [
                {
                      "title": "Il Principe - Capitolo XVIII",
                      "lines": [
                            "Dovete adunque sapere come sono dua generazioni di combattere:",
                            "l'uno con le leggi, l'altro con la forza:",
                            "quel primo è proprio dell'uomo, quel secondo è delle bestie:",
                            "pertanto a uno principe è necessario sapere bene usare la bestia e l'uomo."
                      ],
                      "hint": "La lucida analisi sulla necessità politica di combinare legalità e forza (il centauro Chirone)."
                }
          ],
          "quiz": [
                {
                      "q": "In quale anno Machiavelli scrisse il trattato 'Il Principe' durante il suo confino all'Albergaccio?",
                      "o": [
                            "1492",
                            "1513",
                            "1550",
                            "1600"
                      ],
                      "a": 1
                },
                {
                      "q": "Quali due animali il principe ideale deve saper imitare secondo Machiavelli?",
                      "o": [
                            "L'aquila e il serpente",
                            "La volpe (astuzia) e il leone (forza)",
                            "Il lupo e l'agnello",
                            "Il falco e il cavallo"
                      ],
                      "a": 1
                },
                {
                      "q": "A quale figura storica reale Machiavelli si ispirò per descrivere l'uomo d'azione determinato?",
                      "o": [
                            "Cesare Borgia (detto il Valentino)",
                            "Lorenzo il Magnifico",
                            "Giulio Cesare",
                            "Napoleone"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è la celeberrima commedia teatrale satirica scritta da Niccolò Machiavelli?",
                      "o": [
                            "La Mandragola",
                            "La Locandiera",
                            "L'Avaro",
                            "La Calandra"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa separa Machiavelli per la prima volta nella storia della cultura occidentale?",
                      "o": [
                            "L'arte dalla scienza",
                            "La politica dalla morale e dalla religione",
                            "Il latino dal greco",
                            "La musica dal teatro"
                      ],
                      "a": 1
                }
          ]
    },
    'torquato-tasso': {
          "topic": "Torquato Tasso",
          "impiccato": [
                {
                      "word": "LIBERATA",
                      "hint": "La Gerusalemme... poema epico della prima crociata"
                },
                {
                      "word": "CLORINDA",
                      "hint": "La guerriera musulmana battezzata in punto di morte da Tancredi"
                },
                {
                      "word": "TANCREDI",
                      "hint": "Il valoroso cavaliere cristiano innamorato"
                },
                {
                      "word": "ARMINDA",
                      "hint": "La maga seduttrice che incanta i crociati"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Canto",
                            "l'arme",
                            "pietose",
                            "e",
                            "il",
                            "capitano",
                            "che",
                            "'l",
                            "gran",
                            "sepolcro",
                            "liberò",
                            "di",
                            "Cristo"
                      ],
                      "solution": "Canto l'arme pietose e il capitano che 'l gran sepolcro liberò di Cristo",
                      "source": "Gerusalemme Liberata (Incipit)"
                },
                {
                      "words": [
                            "Amico",
                            "hai",
                            "vinto",
                            "io",
                            "ti",
                            "perdon",
                            "perdona",
                            "tu",
                            "ancora"
                      ],
                      "solution": "Amico hai vinto io ti perdon perdona tu ancora",
                      "source": "Gerusalemme Liberata (Morte di Clorinda)"
                }
          ],
          "cloze": [
                {
                      "text": "Canto l'arme pietose e 'l capitano che 'l gran sepolcro liberò di Cristo: Goffredo di ___ .",
                      "blanks": [
                            "Buglione"
                      ],
                      "source": "Gerusalemme Liberata"
                },
                {
                      "text": "Erminia fugge tra i ___ e trova la pace semplice della natura lontana dagli orrori della guerra.",
                      "blanks": [
                            "pastori"
                      ],
                      "source": "Gerusalemme Liberata"
                }
          ],
          "versi": [
                {
                      "title": "Gerusalemme Liberata (Incipit)",
                      "lines": [
                            "Canto l'arme pietose e 'l capitano",
                            "che 'l gran sepolcro liberò di Cristo.",
                            "Molto egli oprò co 'l senno e con la mano,",
                            "molto soffrì nel glorioso acquisto;"
                      ],
                      "hint": "La prima ottava solenne con l'invocazione religiosa e l'annuncio delle imprese di Goffredo di Buglione."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è il tema storico centrale della 'Gerusalemme Liberata'?",
                      "o": [
                            "La guerra di Troia",
                            "La Prima Crociata e la liberazione del Santo Sepolcro",
                            "La battaglia di Lepanto",
                            "La spedizione dei Mille"
                      ],
                      "a": 1
                },
                {
                      "q": "Chi è il condottiero cristiano a capo dell'esercito crociato nel poema?",
                      "o": [
                            "Tancredi",
                            "Goffredo di Buglione",
                            "Rinaldo",
                            "Astolfo"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale drammatico scontro notturno porta Tancredi a uccidere senza saperlo l'amata Clorinda?",
                      "o": [
                            "Il duello sotto le mura di Gerusalemme",
                            "L'agguato nella selva di Saron",
                            "La giostra di Damasco",
                            "Il torneo di Ferrara"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale ospedale-prigione Torquato Tasso fu rinchiuso per sette anni a Ferrara dal duca Alfonso?",
                      "o": [
                            "Ospedale di Sant'Anna",
                            "Castel Sant'Angelo",
                            "Torre di Londra",
                            "Forte di San Leo"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il celebre dramma pastorale composto da Tasso nel 1573?",
                      "o": [
                            "L'Aminta",
                            "Il Pastor Fido",
                            "L'Orfeo",
                            "La Favola d'Adone"
                      ],
                      "a": 0
                }
          ]
    },
    'galileo-galilei': {
          "topic": "Galileo Galilei",
          "impiccato": [
                {
                      "word": "TELESCOPIO",
                      "hint": "Lo strumento ottico perfezionato per osservare i cieli"
                },
                {
                      "word": "COPERNICO",
                      "hint": "La teoria eliocentrica che pone il Sole al centro"
                },
                {
                      "word": "DIALOGO",
                      "hint": "Il... sopra i due massimi sistemi del mondo"
                },
                {
                      "word": "ABIURA",
                      "hint": "La rinuncia forzata alle proprie scoperte davanti al Tribunale dell'Inquisizione"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "E",
                            "pur",
                            "si",
                            "muove"
                      ],
                      "solution": "E pur si muove",
                      "source": "Celebre frase attribuita a Galileo"
                },
                {
                      "words": [
                            "Il",
                            "libro",
                            "della",
                            "natura",
                            "è",
                            "scritto",
                            "in",
                            "lingua",
                            "matematica"
                      ],
                      "solution": "Il libro della natura è scritto in lingua matematica",
                      "source": "Il Saggiatore"
                }
          ],
          "cloze": [
                {
                      "text": "La filosofia è scritta in questo grandissimo libro che continuamente ci sta aperto innanzi a gli occhi: io dico l'universo; ma non si può intendere se prima non s'impara a intender la lingua matematiche e i caratteri che sono ___ , cerchi ed altre figure geometriche.",
                      "blanks": [
                            "triangoli"
                      ],
                      "source": "Il Saggiatore"
                },
                {
                      "text": "Nel Dialogo sopra i due massimi sistemi del mondo, Salviati difende il sistema copernicano, Simplicio quello aristotelico e ___ fa da moderatore.",
                      "blanks": [
                            "Sagredo"
                      ],
                      "source": "Dialogo sopra i due massimi sistemi"
                }
          ],
          "versi": [
                {
                      "title": "Il Saggiatore (Il libro della natura)",
                      "lines": [
                            "La filosofia è scritta in questo grandissimo libro",
                            "che continuamente ci sta aperto innanzi a gli occhi (io dico l'universo),",
                            "ma non si può intendere se prima non s'impara a intender la lingua,",
                            "e conoscer i caratteri, ne' quali è scritto. Egli è scritto in lingua matematica."
                      ],
                      "hint": "Il manifesto epistemologico della scienza moderna: la natura comprensibile con formule matematiche."
                }
          ],
          "quiz": [
                {
                      "q": "Quale fondamentale metodo scientifico fu fondato da Galileo Galilei?",
                      "o": [
                            "Il metodo deduttivo aristotelico",
                            "Il metodo sperimentale (osservazione, ipotesi, esperimento, legge)",
                            "L'astrologia comparata",
                            "L'alchimia applicata"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa scoprì Galileo puntando il cannocchiale verso il pianeta Giove nel 1610?",
                      "o": [
                            "Gli anelli di Giove",
                            "I quattro satelliti medicei (Io, Europa, Ganimede, Callisto)",
                            "I canali marziani",
                            "Una cometa"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale scelta linguistica innovativa fece Galileo per diffondere le sue opere scientifiche?",
                      "o": [
                            "Scrisse solo in latino aulico",
                            "Scrisse in volgare italiano chiaro e divulgativo",
                            "Scrisse in francese",
                            "Scrisse in greco antico"
                      ],
                      "a": 1
                },
                {
                      "q": "Chi rappresenta il difensore ottuso del vecchio sistema tolemaico nel 'Dialogo'?",
                      "o": [
                            "Salviati",
                            "Sagredo",
                            "Simplicio",
                            "Copernico"
                      ],
                      "a": 2
                },
                {
                      "q": "Cosa fu costretto a fare Galileo a Roma nel 1633 davanti al Tribunale del Santo Uffizio?",
                      "o": [
                            "Fu mandato al rogo",
                            "Dovette pronunciare l'abiura ritrattando le proprie teorie copernicane",
                            "Fu bandito in America",
                            "Divenne cardinale"
                      ],
                      "a": 1
                }
          ]
    },
    'carlo-goldoni': {
          "topic": "Carlo Goldoni",
          "impiccato": [
                {
                      "word": "LOCANDIERA",
                      "hint": "La brillante commedia con la protagonista Mirandolina"
                },
                {
                      "word": "VENEZIA",
                      "hint": "La patria del commediografo lagunare"
                },
                {
                      "word": "RIFORMA",
                      "hint": "L'abolizione delle maschere a favore del testo scritto e del realismo"
                },
                {
                      "word": "MIRANDOLINA",
                      "hint": "L'intelligente padrona della locanda fiorentina"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "M'importa",
                            "del",
                            "mio",
                            "dovere",
                            "e",
                            "del",
                            "mio",
                            "onore"
                      ],
                      "solution": "M'importa del mio dovere e del mio onore",
                      "source": "La Locandiera (Mirandolina)"
                },
                {
                      "words": [
                            "Il",
                            "mondo",
                            "è",
                            "un",
                            "bellissimo",
                            "libro",
                            "ma",
                            "poco",
                            "serve",
                            "a",
                            "chi",
                            "non",
                            "sa",
                            "leggere"
                      ],
                      "solution": "Il mondo è un bellissimo libro ma poco serve a chi non sa leggere",
                      "source": "Memorie"
                }
          ],
          "cloze": [
                {
                      "text": "Mirandolina è l'arguta padrona della locanda che riesce a far innamorare persino il Cavaliere di Ripafratta, noto nemico delle ___ .",
                      "blanks": [
                            "donne"
                      ],
                      "source": "La Locandiera"
                },
                {
                      "text": "La riforma goldoniana sostituisce i vecchi canovacci della Commedia dell'Arte con un testo interamente ___ dagli attori.",
                      "blanks": [
                            "scritto"
                      ],
                      "source": "Riforma del Teatro"
                }
          ],
          "versi": [
                {
                      "title": "La Locandiera - Monologo di Mirandolina",
                      "lines": [
                            "Tratto tutti con gentilezza, ma voglio vivere a modo mio.",
                            "L'onore è la maggior ricchezza che abbia una ragazza.",
                            "I nobili credono che col denaro si possa comprare tutto,",
                            "ma a me piace vederli sospirare e servire."
                      ],
                      "hint": "Il celebre monologo in cui Mirandolina afferma la propria autonomia femminile e intelligenza borghese."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è la grande innovazione introdotta dalla Riforma teatrale di Goldoni?",
                      "o": [
                            "L'uso di fuochi d'artificio sul palco",
                            "La sostituzione del canovaccio improvvisato con il copione scritto e la caratterizzazione psicologica dei personaggi",
                            "L'eliminazione delle donne dalle scene",
                            "Il ritorno al coro tragico greco"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è la professione di Mirandolina nella sua celeberrima commedia?",
                      "o": [
                            "Attrice",
                            "Locandiera a Firenze",
                            "Cameriera a Venezia",
                            "Nobildonna"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale nobile misogino dichiara di disprezzare le donne prima di cedere al fascino di Mirandolina?",
                      "o": [
                            "Il Marchese di Forlipopoli",
                            "Il Conte d'Albafiorita",
                            "Il Cavaliere di Ripafratta",
                            "Fabrizio"
                      ],
                      "a": 2
                },
                {
                      "q": "Chi sposa alla fine Mirandolina per tutelare il proprio onore e la locanda?",
                      "o": [
                            "Il Cavaliere",
                            "Il cameriere Fabrizio",
                            "Il Marchese",
                            "Nessuno"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale celebre città francese Goldoni trascorse gli ultimi anni della vita scrivendo le sue 'Mémoires'?",
                      "o": [
                            "Lione",
                            "Parigi",
                            "Marsiglia",
                            "Nizza"
                      ],
                      "a": 1
                }
          ]
    },
    'commedia-arte': {
          "topic": "La Commedia dell'Arte",
          "impiccato": [
                {
                      "word": "ARLECCHINO",
                      "hint": "La maschera bergamasca dal vestito a toppe colorate"
                },
                {
                      "word": "PANTALONE",
                      "hint": "Il vecchio mercante veneziano avaro"
                },
                {
                      "word": "CANOVACCIO",
                      "hint": "La traccia sintetica della trama su cui gli attori improvvisavano"
                },
                {
                      "word": "MASCHERA",
                      "hint": "L'elemento di cuoio sul volto che fissava il tipo comico"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Arlecchino",
                            "servitore",
                            "di",
                            "due",
                            "padroni",
                            "per",
                            "non",
                            "morire",
                            "di",
                            "fame"
                      ],
                      "solution": "Arlecchino servitore di due padroni per non morire di fame",
                      "source": "Commedia dell'Arte"
                },
                {
                      "words": [
                            "I",
                            "lazzi",
                            "e",
                            "le",
                            "acrobazie",
                            "degli",
                            "zanni",
                            "sulla",
                            "scena"
                      ],
                      "solution": "I lazzi e le acrobazie degli zanni sulla scena",
                      "source": "Tradizione teatrale"
                }
          ],
          "cloze": [
                {
                      "text": "I comici dell'Arte recitavano sui palcoscenici di tutta Europa basandosi non su un copione scritto, ma su un sintetico ___ .",
                      "blanks": [
                            "canovaccio"
                      ],
                      "source": "Commedia dell'Arte"
                },
                {
                      "text": "Pantalone rappresenta l'anziano e avaro mercante di ___ , mentre il Dottor Balanzone è il presuntuoso giurista di Bologna.",
                      "blanks": [
                            "Venezia"
                      ],
                      "source": "Maschere italiane"
                }
          ],
          "versi": [
                {
                      "title": "Trattato dei Comici dell'Arte",
                      "lines": [
                            "L'arte dell'attore è inventar la scena,",
                            "con salti, motti, lazzi e gesti pronti.",
                            "Dietro la maschera di cuoio parla il popolo,",
                            "e la risata scioglie ogni catena."
                      ],
                      "hint": "La gloriosa tradizione teatrale professionistica italiana che ha conquistato le corti d'Europa nel Cinquecento e Seicento."
                }
          ],
          "quiz": [
                {
                      "q": "Cosa caratterizzava principalmente la recitazione nella Commedia dell'Arte?",
                      "o": [
                            "Testi recitati a memoria in latino",
                            "L'improvvisazione guidata dal canovaccio e l'uso di maschere fisse e lazzi comici",
                            "Il silenzio assoluto",
                            "L'opera lirica cantata"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale grande novità introdusse per la prima volta nella storia del teatro occidentale la Commedia dell'Arte?",
                      "o": [
                            "L'ingresso delle donne professioniste come attrici sulla scena",
                            "L'illuminazione a gas",
                            "Il biglietto a pagamento",
                            "I costumi di scena"
                      ],
                      "a": 0
                },
                {
                      "q": "Da quale città proviene la maschera astuta e furba di Brighella?",
                      "o": [
                            "Napoli",
                            "Bergamo",
                            "Roma",
                            "Firenze"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è la tipica maschera napoletana vestita di bianco dal naso adunco e carattere malinconico e ironico?",
                      "o": [
                            "Arlecchino",
                            "Pulcinella",
                            "Colombina",
                            "Scaramuccia"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa sono i 'lazzi' nella Commedia dell'Arte?",
                      "o": [
                            "Corde per legare la scenografia",
                            "Scenette mimiche, battute comiche e gag acrobatiche improvvisate",
                            "Monologhi drammatici",
                            "Strumenti musicali"
                      ],
                      "a": 1
                }
          ]
    },
    'giuseppe-parini': {
          "topic": "Giuseppe Parini",
          "impiccato": [
                {
                      "word": "GIORNO",
                      "hint": "Il poema satirico diviso in Mattino, Mezzogiorno, Vespro e Notte"
                },
                {
                      "word": "GIOVIN",
                      "hint": "Il '... signore' nobile ozioso e viziato"
                },
                {
                      "word": "CUCCIA",
                      "hint": "La 'Vergine...' episodio della cagnetta viziata della dama"
                },
                {
                      "word": "MILANO",
                      "hint": "La capitale dell'Illuminismo lombardo dove visse Parini"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Giovin",
                            "signore",
                            "o",
                            "a",
                            "te",
                            "scenda",
                            "per",
                            "lungo",
                            "ordine",
                            "di",
                            "avi"
                      ],
                      "solution": "Giovin signore o a te scenda per lungo ordine di avi",
                      "source": "Il Giorno (Il Mattino)"
                },
                {
                      "words": [
                            "Or",
                            "odi",
                            "la",
                            "pietosa",
                            "istoria",
                            "della",
                            "vergine",
                            "cuccia"
                      ],
                      "solution": "Or odi la pietosa istoria della vergine cuccia",
                      "source": "Il Giorno (La vergine cuccia)"
                }
          ],
          "cloze": [
                {
                      "text": "Nel poema Il Giorno, Parini fa da precettore ironico al giovin signore, descrivendo la sua vita vuota e ___ dall'alba a notte fonda.",
                      "blanks": [
                            "oziosa"
                      ],
                      "source": "Il Giorno"
                },
                {
                      "text": "Nell'episodio della vergine cuccia, un servo fedele viene licenziato per aver dato un calcio alla cagnetta della nobile ___ .",
                      "blanks": [
                            "dama"
                      ],
                      "source": "Il Giorno"
                }
          ],
          "versi": [
                {
                      "title": "Il Giorno - Il Mattino (Incipit)",
                      "lines": [
                            "Giovin signore, o a te scenda per lungo",
                            "d'antiquissimi e illustri avi legnaggio",
                            "o in te sangue chiarissimo e sangue",
                            "splenda d'onori e d'eccelse virtuti..."
                      ],
                      "hint": "I primi versi in endecasillabi sciolti in cui il poeta finge di lodare la frivola nobiltà milanese."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è il bersaglio principale della satira di Giuseppe Parini ne 'Il Giorno'?",
                      "o": [
                            "I contadini",
                            "La nobiltà oziosa, parassitaria e decadente del Settecento",
                            "I commercianti",
                            "Gli scienziati"
                      ],
                      "a": 1
                },
                {
                      "q": "In quali quattro parti ideali è suddiviso il poema 'Il Giorno'?",
                      "o": [
                            "Primavera, Estate, Autunno, Inverno",
                            "Il Mattino, Il Mezzogiorno, Il Vespro, La Notte",
                            "Terra, Aria, Fuoco, Acqua",
                            "Infanzia, Giovinezza, Maturità, Vecchiaia"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa accade nell'episodio della 'Vergine cuccia'?",
                      "o": [
                            "Un servo fedele da vent'anni viene cacciato in miseria per aver dato un calcio al cane della dama che lo aveva morso",
                            "Un cane vince una gara",
                            "Un nobile adotta un cane randagio",
                            "Un cane salva un bambino"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale figura sociale di accompagnatore galante delle nobildonne Parini prende di mira?",
                      "o": [
                            "Il cavalier servente (cicisbeo)",
                            "Il ciambellano",
                            "Il podestà",
                            "Il paggio"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale ruolo educativo svolse Parini a Milano presso le Scuole Palatine?",
                      "o": [
                            "Insegnante di Belle Lettere ed educatore illuminato",
                            "Magistrato",
                            "Bibliotecario a Parigi",
                            "Medico"
                      ],
                      "a": 0
                }
          ]
    },
    'cesare-beccaria': {
          "topic": "Cesare Beccaria",
          "impiccato": [
                {
                      "word": "DELITTI",
                      "hint": "Dei... e delle pene (trattato del 1764)"
                },
                {
                      "word": "TORTURA",
                      "hint": "La crudele pratica giudiziaria di cui dimostrò l'inutilità"
                },
                {
                      "word": "MORTE",
                      "hint": "La pena capitale che Beccaria propose per primo di abolire"
                },
                {
                      "word": "CAFFE",
                      "hint": "La celebre rivista illuminista dei fratelli Verri a Milano"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Non",
                            "vi",
                            "è",
                            "libertà",
                            "ogni",
                            "qual",
                            "volta",
                            "le",
                            "leggi",
                            "permettono",
                            "all'uomo",
                            "di",
                            "diventare",
                            "schiavo"
                      ],
                      "solution": "Non vi è libertà ogni qual volta le leggi permettono all'uomo di diventare schiavo",
                      "source": "Dei delitti e delle pene"
                },
                {
                      "words": [
                            "La",
                            "pena",
                            "di",
                            "morte",
                            "è",
                            "una",
                            "guerra",
                            "della",
                            "nazione",
                            "contro",
                            "un",
                            "cittadino"
                      ],
                      "solution": "La pena di morte è una guerra della nazione contro un cittadino",
                      "source": "Dei delitti e delle pene"
                }
          ],
          "cloze": [
                {
                      "text": "Parmi un assurdo che le leggi, che sono l'espressione della pubblica volontà, puniscano l'omicidio e ne commettano uno esse medesime ordinando la pena di ___ .",
                      "blanks": [
                            "morte"
                      ],
                      "source": "Dei delitti e delle pene"
                },
                {
                      "text": "La tortura è ingiusta perché punisce un uomo prima che sia giudicato ___ ed è utile solo a far confessare i deboli innocenti.",
                      "blanks": [
                            "colpevole"
                      ],
                      "source": "Dei delitti e delle pene"
                }
          ],
          "versi": [
                {
                      "title": "Dei delitti e delle pene (Capitolo XXVIII)",
                      "lines": [
                            "Questa inutile prodigalità di supplizii, che non ha mai resi migliori gli uomini,",
                            "mi ha spinto ad esaminare se la morte sia veramente utile e giusta in un governo bene organizzato.",
                            "Non è il terribile ma passeggiero spettacolo della morte d'uno scellerato,",
                            "ma il lungo e stentato esempio d'un uomo privo di libertà che frena i delitti."
                      ],
                      "hint": "Il passo fondamentale che ha convinto i sovrani illuminati d'Europa a riformare il codice penale."
                }
          ],
          "quiz": [
                {
                      "q": "In quale anno fu pubblicato a Livorno il trattato 'Dei delitti e delle pene'?",
                      "o": [
                            "1700",
                            "1764",
                            "1789",
                            "1800"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale sovrano europeo per primo abolì la pena di morte ispirandosi alle idee di Beccaria?",
                      "o": [
                            "Pietro Leopoldo nel Granducato di Toscana (1786)",
                            "Luigi XIV in Francia",
                            "Giorgio III d'Inghilterra",
                            "Filippo II di Spagna"
                      ],
                      "a": 0
                },
                {
                      "q": "Secondo Beccaria, cosa rende una pena veramente efficace per scoraggiare i crimini?",
                      "o": [
                            "La crudeltà estrema",
                            "La prontezza e l'infallibilità della punizione, non la ferocia",
                            "Il segreto delle indagini",
                            "Il riscatto in denaro"
                      ],
                      "a": 1
                },
                {
                      "q": "Di quale altro celeberrimo autore della letteratura italiana Cesare Beccaria era nonno materno?",
                      "o": [
                            "Giacomo Leopardi",
                            "Alessandro Manzoni",
                            "Ugo Foscolo",
                            "Giosuè Carducci"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale celebre periodico dell'Illuminismo milanese fu fondato da Beccaria insieme ai fratelli Pietro e Alessandro Verri?",
                      "o": [
                            "Il Caffè",
                            "Il Conciliatore",
                            "La Frusta Letteraria",
                            "L'Avvenire"
                      ],
                      "a": 0
                }
          ]
    },
    'cecco-angiolieri': {
          "topic": "Cecco Angiolieri",
          "impiccato": [
                {
                      "word": "FOCO",
                      "hint": "S'i' fosse... arderei 'l mondo"
                },
                {
                      "word": "SIENA",
                      "hint": "La città toscana del poeta comico-realista"
                },
                {
                      "word": "BECCHINA",
                      "hint": "La donna amata e continuamente canzonata"
                },
                {
                      "word": "DONNE",
                      "hint": "Tre cose solamente mi so' in grado: la donna, la taverna e 'l dado"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "S'i'",
                            "fosse",
                            "foco",
                            "arderei",
                            "'l",
                            "mondo"
                      ],
                      "solution": "S'i' fosse foco arderei 'l mondo",
                      "source": "Rime"
                },
                {
                      "words": [
                            "S'i'",
                            "fosse",
                            "imperator",
                            "sa'",
                            "che",
                            "farei",
                            "a",
                            "tutti",
                            "mozzarei",
                            "lo",
                            "capo"
                      ],
                      "solution": "S'i' fosse imperator sa' che farei a tutti mozzarei lo capo",
                      "source": "Rime"
                }
          ],
          "cloze": [
                {
                      "text": "S'i' fosse foco, arderei 'l mondo; s'i' fosse vento, lo ___ ; s'i' fosse acqua, io l'annegherei; s'i' fosse Dio, mandereil'en profondo.",
                      "blanks": [
                            "tempesterei"
                      ],
                      "source": "Sonetto"
                },
                {
                      "text": "Tre cose solamente mi so' in grado, le quali posso non ben ben fornire: ciò è la donna, la ___ e 'l dado.",
                      "blanks": [
                            "taverna"
                      ],
                      "source": "Sonetto"
                }
          ],
          "versi": [
                {
                      "title": "S'i' fosse foco (Sonetto)",
                      "lines": [
                            "S'i' fosse foco, arderei 'l mondo;",
                            "s'i' fosse vento, lo tempesterei;",
                            "s'i' fosse acqua, io l'annegherei;",
                            "s'i' fosse Dio, mandereil'en profondo;"
                      ],
                      "hint": "L'esplosivo sonetto comico-realista contro le ipocrisie del tempo e la severità dei genitori."
                }
          ],
          "quiz": [
                {
                      "q": "A quale corrente poetica del Duecento toscano appartiene Cecco Angiolieri?",
                      "o": [
                            "Dolce Stil Novo",
                            "Poesia comico-realistica e giocosa",
                            "Scuola Siciliana",
                            "Poesia religiosa"
                      ],
                      "a": 1
                },
                {
                      "q": "Con quale grandissimo poeta suo contemporaneo Cecco scambiò sonetti polemici e canzonatori?",
                      "o": [
                            "Francesco Petrarca",
                            "Dante Alighieri",
                            "Giovanni Boccaccio",
                            "Guido Guinizzelli"
                      ],
                      "a": 1
                },
                {
                      "q": "Cosa farebbe Cecco secondo il finale del sonetto 'S'i' fosse Cecco, com'i' sono e fui'?",
                      "o": [
                            "Si farebbe prete",
                            "Prenderebbe le donne giovani e leggiadre, lasciando agli altri le vecchie e laide",
                            "Comprerebbe un castello",
                            "Andrebbe in esilio"
                      ],
                      "a": 1
                },
                {
                      "q": "Da quale città toscana proveniva Cecco Angiolieri?",
                      "o": [
                            "Firenze",
                            "Siena",
                            "Lucca",
                            "Arezzo"
                      ],
                      "a": 1
                },
                {
                      "q": "Quali sono le 'tre cose' che il poeta dichiara di amare sopra ogni altra?",
                      "o": [
                            "I libri, la gloria e il cielo",
                            "La donna, la taverna e il dado (il gioco d'azzardo)",
                            "I soldi, il cavallo e la spada",
                            "Il vino, la preghiera e l'orto"
                      ],
                      "a": 1
                }
          ]
    },
    'iacopone-todi': {
          "topic": "Iacopone da Todi",
          "impiccato": [
                {
                      "word": "PARADISO",
                      "hint": "La laude 'Donna de...'"
                },
                {
                      "word": "FRANCESCANO",
                      "hint": "L'ordine dei frati Spirituali a cui apparteneva"
                },
                {
                      "word": "TODI",
                      "hint": "La cittadina umbra di nascita del frate"
                },
                {
                      "word": "STABAT",
                      "hint": "... Mater (celebre sequenza sacra medievale)"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Donna",
                            "de",
                            "Paradiso",
                            "lo",
                            "tuo",
                            "figlio",
                            "è",
                            "preso"
                      ],
                      "solution": "Donna de Paradiso lo tuo figlio è preso",
                      "source": "Lauda drammatica"
                },
                {
                      "words": [
                            "O",
                            "amor",
                            "divino",
                            "perché",
                            "m'hai",
                            "ferito"
                      ],
                      "solution": "O amor divino perché m'hai ferito",
                      "source": "Laude"
                }
          ],
          "cloze": [
                {
                      "text": "Donna de Paradiso, lo tuo figlio è preso, Iesu Cristo beato. Accurre, donna, e vide che la gente l' ___ ; credo che sia ferito.",
                      "blanks": [
                            "allide"
                      ],
                      "source": "Donna de Paradiso"
                },
                {
                      "text": "Figlio, l'alma t'è uscita, figlio de la smarrita, figlio de la ___ , figlio, padre e signore!",
                      "blanks": [
                            "sconsolata"
                      ],
                      "source": "Donna de Paradiso"
                }
          ],
          "versi": [
                {
                      "title": "Donna de Paradiso (Incipit)",
                      "lines": [
                            "«Donna de Paradiso,",
                            "lo tuo figlio è preso",
                            "Iesu Cristo beato.",
                            "Accurre, donna, e vide"
                      ],
                      "hint": "Il messaggero annuncia alla Vergine Maria la cattura e il processo di Gesù."
                }
          ],
          "quiz": [
                {
                      "q": "Quale forma poetica e teatrale sacra fu perfezionata da Iacopone da Todi?",
                      "o": [
                            "Il sonetto",
                            "La lauda drammatica dialogata",
                            "Il poema epico",
                            "La commedia dell'arte"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale tragico evento spinse Iacopone a convertirsi e vestire il saio di penitente?",
                      "o": [
                            "La morte della giovane moglie Vanna durante una festa e la scoperta del suo cilicio",
                            "Una condanna in tribunale",
                            "Un naufragio",
                            "La perdita di un feudo"
                      ],
                      "a": 0
                },
                {
                      "q": "Contro quale pontefice Iacopone si scagliò duramente finendo imprigionato per anni?",
                      "o": [
                            "Papa Bonifacio VIII",
                            "Papa Francesco",
                            "Papa Gregorio IX",
                            "Papa Innocenzo III"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi è la protagonista sofferente della celebre lauda 'Donna de Paradiso'?",
                      "o": [
                            "Maria Vergine davanti alla crocifissione del Figlio",
                            "Santa Chiara",
                            "Maddalena",
                            "Santa Rita"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale celebre sequenza liturgica latina sul dolore della Madonna ai piedi della croce è tradizionalmente attribuita a Iacopone?",
                      "o": [
                            "Dies Irae",
                            "Stabat Mater",
                            "Te Deum",
                            "Magnificat"
                      ],
                      "a": 1
                }
          ]
    },
    'victor-hugo': {
          "topic": "Victor Hugo",
          "impiccato": [
                {
                      "word": "MISERABILI",
                      "hint": "Il monumentale romanzo sociale con Jean Valjean e Cosette"
                },
                {
                      "word": "VALJEAN",
                      "hint": "L'ex forzato redento dalla bontà del vescovo Myriel"
                },
                {
                      "word": "NOTREDAME",
                      "hint": "La cattedrale gotica di Parigi e la storia di Quasimodo"
                },
                {
                      "word": "ROMANTICISMO",
                      "hint": "Il movimento letterario di cui fu il gigante in Francia"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Morire",
                            "non",
                            "è",
                            "nulla",
                            "terribile",
                            "è",
                            "non",
                            "vivere"
                      ],
                      "solution": "Morire non è nulla terribile è non vivere",
                      "source": "I Miserabili"
                },
                {
                      "words": [
                            "C'è",
                            "uno",
                            "spettacolo",
                            "più",
                            "grandioso",
                            "del",
                            "mare",
                            "ed",
                            "è",
                            "il",
                            "cielo"
                      ],
                      "solution": "C'è uno spettacolo più grandioso del mare ed è il cielo",
                      "source": "I Miserabili"
                }
          ],
          "cloze": [
                {
                      "text": "Jean Valjean viene condannato a diciannove anni di galera per aver rubato un pezzo di ___ per sfamare i figli di sua sorella.",
                      "blanks": [
                            "pane"
                      ],
                      "source": "I Miserabili"
                },
                {
                      "text": "Il gobbo Quasimodo suona le campane della cattedrale di Notre-Dame e protegge con la vita la bella danzatrice zingara ___ .",
                      "blanks": [
                            "Esmeralda"
                      ],
                      "source": "Notre-Dame de Paris"
                }
          ],
          "versi": [
                {
                      "title": "I Miserabili (Riflessione)",
                      "lines": [
                            "Finché esisterà una dannazione sociale",
                            "finché sulla terra vi saranno ignoranza e miseria,",
                            "i libri di questa natura",
                            "non potranno essere inutili."
                      ],
                      "hint": "La celebre prefazione morale sull'impegno per il riscatto degli oppressi."
                }
          ],
          "quiz": [
                {
                      "q": "Quale capolavoro di Victor Hugo racconta le vicende di Jean Valjean, Cosette e Javert?",
                      "o": [
                            "Notre-Dame de Paris",
                            "I Miserabili",
                            "I lavoratori del mare",
                            "L'uomo che ride"
                      ],
                      "a": 1
                },
                {
                      "q": "Chi è il campanaro deforme protagonista di 'Notre-Dame de Paris'?",
                      "o": [
                            "Gavroche",
                            "Quasimodo",
                            "Frollo",
                            "Phoebus"
                      ],
                      "a": 1
                },
                {
                      "q": "Su quale isola nel Canale della Manica visse in esilio Victor Hugo per quasi vent'anni?",
                      "o": [
                            "Isola di Guernsey",
                            "Isola d'Elba",
                            "Sant'Elena",
                            "Corsica"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale implacabile ispettore di polizia dà la caccia a Jean Valjean per tutta la vita?",
                      "o": [
                            "Javert",
                            "Poirot",
                            "Maigret",
                            "Dupin"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa dona il vescovo Myriel a Jean Valjean per salvarlo dall'arresto e comprargli l'anima per Dio?",
                      "o": [
                            "Un sacco di fiorini",
                            "Due candelieri d'argento",
                            "Un crocifisso d'oro",
                            "Un anello di diamanti"
                      ],
                      "a": 1
                }
          ]
    },
    'gabriel-garcia-marquez': {
          "topic": "Gabriel García Márquez",
          "impiccato": [
                {
                      "word": "SOLITUDINE",
                      "hint": "Cent'anni di... la saga della famiglia Buendía"
                },
                {
                      "word": "MACONDO",
                      "hint": "Il mitico villaggio sperduto nella foresta colombiana"
                },
                {
                      "word": "MAGICO",
                      "hint": "Il Realismo... dove il meraviglioso diventa quotidiano"
                },
                {
                      "word": "COLERA",
                      "hint": "L'amore ai tempi del... tra Florentino e Fermina"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Molti",
                            "anni",
                            "dopo",
                            "di",
                            "fronte",
                            "al",
                            "plotone",
                            "di",
                            "esecuzione"
                      ],
                      "solution": "Molti anni dopo di fronte al plotone di esecuzione",
                      "source": "Cent'anni di solitudine (Incipit)"
                },
                {
                      "words": [
                            "Il",
                            "colonnello",
                            "Aureliano",
                            "Buendía",
                            "si",
                            "sarebbe",
                            "ricordato",
                            "di",
                            "quel",
                            "remoto",
                            "pomeriggio"
                      ],
                      "solution": "Il colonnello Aureliano Buendía si sarebbe ricordato di quel remoto pomeriggio",
                      "source": "Cent'anni di solitudine"
                }
          ],
          "cloze": [
                {
                      "text": "Molti anni dopo, di fronte al plotone di esecuzione, il colonnello Aureliano Buendía si sarebbe ricordato di quel remoto pomeriggio in cui suo padre lo condusse a conoscere il ___ .",
                      "blanks": [
                            "ghiaccio"
                      ],
                      "source": "Cent'anni di solitudine"
                },
                {
                      "text": "Florentino Ariza aspetta per oltre cinquant'anni l'amore della sua vita Fermina Daza nel romanzo L'amore ai tempi del ___ .",
                      "blanks": [
                            "colera"
                      ],
                      "source": "L'amore ai tempi del colera"
                }
          ],
          "versi": [
                {
                      "title": "Cent'anni di solitudine (Incipit)",
                      "lines": [
                            "Molti anni dopo, di fronte al plotone di esecuzione,",
                            "il colonnello Aureliano Buendía si sarebbe ricordato",
                            "di quel remoto pomeriggio in cui suo padre",
                            "lo condusse a conoscere il ghiaccio."
                      ],
                      "hint": "Uno degli incipit più celebrati e perfetti della storia della letteratura mondiale."
                }
          ],
          "quiz": [
                {
                      "q": "In quale Paese sudamericano nacque Gabriel García Márquez?",
                      "o": [
                            "Argentina",
                            "Colombia (Aracataca)",
                            "Messico",
                            "Cile"
                      ],
                      "a": 1
                },
                {
                      "q": "Come si chiama il villaggio immaginario fondato dalla famiglia Buendía?",
                      "o": [
                            "Macondo",
                            "Comala",
                            "Santa Maria",
                            "Eldorado"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale anno García Márquez ricevette il Premio Nobel per la Letteratura?",
                      "o": [
                            "1971",
                            "1982",
                            "1990",
                            "2000"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale genere letterario fonde prodigi, profezie e realtà quotidiana come naturale verità?",
                      "o": [
                            "Realismo Magico",
                            "Fantascienza pura",
                            "Romanzo storico verista",
                            "Fiaba nordica"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi è la longeva e saggia matriarca della casa dei Buendía che vive per oltre un secolo?",
                      "o": [
                            "Ursula Iguarán",
                            "Amaranta",
                            "Rebeca",
                            "Remedios la bella"
                      ],
                      "a": 0
                }
          ]
    },
    'edgar-allan-poe': {
          "topic": "Edgar Allan Poe",
          "impiccato": [
                {
                      "word": "CORVO",
                      "hint": "La celebre poesia con il ritornello 'Mai più' (Nevermore)"
                },
                {
                      "word": "DUPIN",
                      "hint": "Auguste... il primo grande detective razionale della letteratura"
                },
                {
                      "word": "HORROR",
                      "hint": "Il genere del brivido e del terrore psicologico"
                },
                {
                      "word": "PENDOLO",
                      "hint": "Il pozzo e il... racconto dell'Inquisizione a Toledo"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Disse",
                            "il",
                            "corvo",
                            "mai",
                            "più"
                      ],
                      "solution": "Disse il corvo mai più",
                      "source": "Il Corvo"
                },
                {
                      "words": [
                            "I",
                            "delitti",
                            "della",
                            "strada",
                            "Morgue",
                            "inaugurarono",
                            "il",
                            "genere",
                            "poliziesco"
                      ],
                      "solution": "I delitti della strada Morgue inaugurarono il genere poliziesco",
                      "source": "Racconti straordinari"
                }
          ],
          "cloze": [
                {
                      "text": "E il Corvo, non svolazzando mai, posa ancora, posa ancora sul pallido busto di Pallade, sopra la porta della mia stanza con la parola: 'Mai ___'.",
                      "blanks": [
                            "più"
                      ],
                      "source": "Il Corvo"
                },
                {
                      "text": "Nel racconto Il cuore rivelatore, l'assassino viene tradito dal suono allucinante del battito del ___ nascosto sotto le assi del pavimento.",
                      "blanks": [
                            "cuore"
                      ],
                      "source": "Il cuore rivelatore"
                }
          ],
          "versi": [
                {
                      "title": "Il Corvo (The Raven)",
                      "lines": [
                            "Una volta, in una fosca mezzanotte,",
                            "mentre meditavo debole e stanco",
                            "su molti bizzarri e curiosi volumi di scienza dimenticata,",
                            "all'improvviso sentii un bussare alla porta."
                      ],
                      "hint": "L'atmosfera gotica e ossessiva della poesia più famosa della letteratura americana."
                }
          ],
          "quiz": [
                {
                      "q": "Quale genere narrativo moderno è stato inventato da Edgar Allan Poe con 'I delitti della Rue Morgue' (1841)?",
                      "o": [
                            "Il romanzo rosa",
                            "Il racconto poliziesco / giallo deduttivo",
                            "Il fumetto",
                            "Il fantasy epico"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è l'unica parola che il misterioso Corvo ripete al poeta addolorato per la perdita di Lenore?",
                      "o": [
                            "Sempre",
                            "Mai più (Nevermore)",
                            "Addio",
                            "Morte"
                      ],
                      "a": 1
                },
                {
                      "q": "Come si chiama l'acuto investigatore parigino creato da Poe che anticipa Sherlock Holmes?",
                      "o": [
                            "Auguste Dupin",
                            "Hercule Poirot",
                            "Nero Wolfe",
                            "Sam Spade"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale animale domestico nero dagli occhi inquietanti è protagonista di un celebre racconto del terrore?",
                      "o": [
                            "Un gatto nero (Pluto)",
                            "Un cane mastino",
                            "Un corvo reale",
                            "Un serpente"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale città della costa orientale americana morì misteriosamente Poe a soli quarant'anni nel 1849?",
                      "o": [
                            "New York",
                            "Boston",
                            "Baltimora",
                            "Philadelphia"
                      ],
                      "a": 2
                }
          ]
    },
    'fedor-dostoevskij': {
          "topic": "Fëdor Dostoevskij",
          "impiccato": [
                {
                      "word": "DELITTO",
                      "hint": "... e castigo, la storia del tormento di Raskol'nikov"
                },
                {
                      "word": "RASKOLNIKOV",
                      "hint": "Il giovane studente che uccide la vecchia usuraia"
                },
                {
                      "word": "KARAMAZOV",
                      "hint": "I fratelli... Dmitri, Ivan e Alëša"
                },
                {
                      "word": "IDIOTA",
                      "hint": "Il principe Myškin incarnazione della bontà pura"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "La",
                            "bellezza",
                            "salverà",
                            "il",
                            "mondo"
                      ],
                      "solution": "La bellezza salverà il mondo",
                      "source": "L'idiota (Principe Myškin)"
                },
                {
                      "words": [
                            "Se",
                            "Dio",
                            "non",
                            "esiste",
                            "allora",
                            "tutto",
                            "è",
                            "permesso"
                      ],
                      "solution": "Se Dio non esiste allora tutto è permesso",
                      "source": "I fratelli Karamazov"
                }
          ],
          "cloze": [
                {
                      "text": "Raskol'nikov uccide la vecchia usuraia credendosi un uomo superiore come Napoleone, ma viene travolto dal rimorso e redento dall'amore di ___ .",
                      "blanks": [
                            "Sonja"
                      ],
                      "source": "Delitto e castigo"
                },
                {
                      "text": "La leggenda del Grande ___ è il celebre capitolo de I fratelli Karamazov in cui Ivan immagina il ritorno di Cristo sulla terra.",
                      "blanks": [
                            "Inquisitore"
                      ],
                      "source": "I fratelli Karamazov"
                }
          ],
          "versi": [
                {
                      "title": "L'idiota (Riflessione sulla bellezza)",
                      "lines": [
                            "È vero, principe, che voi diceste un giorno",
                            "che il mondo sarà salvato dalla bellezza?",
                            "Signori, gridò a tutti,",
                            "il principe afferma che la bellezza salverà il mondo!"
                      ],
                      "hint": "La celeberrima frase sull'etica e l'arte pronunciata nel capolavoro dostoevskiano."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è il capolavoro in cui lo studente Raskol'nikov affronta la colpa e l'espiazione?",
                      "o": [
                            "I fratelli Karamazov",
                            "Delitto e castigo",
                            "L'idiota",
                            "Memorie dal sottosuolo"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale terribile condanna subì Dostoevskij nel 1849 prima di ricevere la grazia dello zar?",
                      "o": [
                            "Condanna a morte davanti al plotone d'esecuzione, commutata in lavori forzati in Siberia",
                            "L'esilio a Parigi",
                            "La prigione a Mosca",
                            "La confisca della casa"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi è il protagonista puro e innocente del romanzo 'L'idiota'?",
                      "o": [
                            "Il principe Myškin",
                            "Raskol'nikov",
                            "Rogožin",
                            "Stavrogin"
                      ],
                      "a": 0
                },
                {
                      "q": "Come si intitola il grandioso capitolo filosofico sui dubbi della fede ne 'I fratelli Karamazov'?",
                      "o": [
                            "La leggenda del Grande Inquisitore",
                            "La confessione di Sonja",
                            "Il sogno di un uomo ridicolo",
                            "Notti bianche"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale città russa dai canali nebbiosi sono ambientati 'Delitto e castigo' e 'Notti bianche'?",
                      "o": [
                            "Mosca",
                            "San Pietroburgo",
                            "Kiev",
                            "Odessa"
                      ],
                      "a": 1
                }
          ]
    },
    'lev-tolstoj': {
          "topic": "Lev Tolstoj",
          "impiccato": [
                {
                      "word": "GUERRA",
                      "hint": "... e pace, l'epopea delle guerre napoleoniche in Russia"
                },
                {
                      "word": "KARENINA",
                      "hint": "Anna... la tragica eroina innamorata di Vronskij"
                },
                {
                      "word": "NATASA",
                      "hint": "La giovane contessina Rostova piena di vita"
                },
                {
                      "word": "NONVIOLENZA",
                      "hint": "La dottrina pacifista che ispirò Mahatma Gandhi"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Tutte",
                            "le",
                            "famiglie",
                            "felici",
                            "si",
                            "somigliano"
                      ],
                      "solution": "Tutte le famiglie felici si somigliano",
                      "source": "Anna Karenina (Incipit)"
                },
                {
                      "words": [
                            "Ogni",
                            "famiglia",
                            "infelice",
                            "è",
                            "invece",
                            "infelice",
                            "a",
                            "modo",
                            "suo"
                      ],
                      "solution": "Ogni famiglia infelice è invece infelice a modo suo",
                      "source": "Anna Karenina"
                }
          ],
          "cloze": [
                {
                      "text": "Tutte le famiglie felici si somigliano; ogni famiglia infelice è infelice a modo ___ .",
                      "blanks": [
                            "suo"
                      ],
                      "source": "Anna Karenina"
                },
                {
                      "text": "Pierre Bezuchov e il principe Andrej Bolkonskij affrontano il destino e l'invasione di Napoleone in Guerra e ___ .",
                      "blanks": [
                            "Pace"
                      ],
                      "source": "Guerra e Pace"
                }
          ],
          "versi": [
                {
                      "title": "Guerra e Pace (Andrej sul campo di Austerlitz)",
                      "lines": [
                            "Sopra di lui non c'era più nulla se non il cielo,",
                            "un cielo alto, infinitamente alto,",
                            "con nubi grigie che vi strisciavano quietamente.",
                            "Come non avevo mai notato prima questo cielo sublime?"
                      ],
                      "hint": "La folgorazione spirituale del principe Andrej ferito che contempla la volta celeste."
                }
          ],
          "quiz": [
                {
                      "q": "Quale immensa epopea narra le vicende delle famiglie russe durante l'invasione di Napoleone del 1812?",
                      "o": [
                            "Anna Karenina",
                            "Guerra e Pace",
                            "Resurrezione",
                            "I cosacchi"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale famoso incipit introduce il romanzo 'Anna Karenina'?",
                      "o": [
                            "Nel mezzo del cammin",
                            "Tutte le famiglie felici si somigliano; ogni famiglia infelice è infelice a modo suo",
                            "Molti anni dopo",
                            "Chiamatemi Ismaele"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale tenuta di campagna Tolstoj visse lavorando la terra insieme ai contadini?",
                      "o": [
                            "Jasnaja Poljana",
                            "San Pietroburgo",
                            "Arcangelo",
                            "Crimea"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale grande leader indiano mantenne una celebre corrispondenza epistolare con Tolstoj sulla non-violenza?",
                      "o": [
                            "Mahatma Gandhi",
                            "Nehru",
                            "Tagore",
                            "Mandela"
                      ],
                      "a": 0
                },
                {
                      "q": "Come muore tragicamente l'eroina Anna Karenina alla stazione ferroviaria?",
                      "o": [
                            "Gettandosi sotto un treno in corsa",
                            "In duello",
                            "Di malattia",
                            "Avvelenata"
                      ],
                      "a": 0
                }
          ]
    },
    'george-orwell': {
          "topic": "George Orwell",
          "impiccato": [
                {
                      "word": "FRATELLO",
                      "hint": "Il Grande... che tutto vede e controlla"
                },
                {
                      "word": "FATTORIA",
                      "hint": "La... degli animali, satira del totalitarismo"
                },
                {
                      "word": "WINSTON",
                      "hint": "Winston Smith, il protagonista ribelle di 1984"
                },
                {
                      "word": "PSICOPOLIZIA",
                      "hint": "La polizia che reprime i 'pensiericrimine' (psicoreato)"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Il",
                            "Grande",
                            "Fratello",
                            "ti",
                            "guarda"
                      ],
                      "solution": "Il Grande Fratello ti guarda",
                      "source": "1984"
                },
                {
                      "words": [
                            "Tutti",
                            "gli",
                            "animali",
                            "sono",
                            "uguali",
                            "ma",
                            "alcuni",
                            "sono",
                            "più",
                            "uguali",
                            "degli",
                            "altri"
                      ],
                      "solution": "Tutti gli animali sono uguali ma alcuni sono più uguali degli altri",
                      "source": "La fattoria degli animali"
                }
          ],
          "cloze": [
                {
                      "text": "La guerra è pace, la libertà è schiavitù, l'ignoranza è ___ : i tre slogan del Socing in 1984.",
                      "blanks": [
                            "forza"
                      ],
                      "source": "1984"
                },
                {
                      "text": "Nella Fattoria degli Animali, i maiali capeggiati da ___ prendono il controllo tradendo gli ideali della rivoluzione.",
                      "blanks": [
                            "Napoleone"
                      ],
                      "source": "La fattoria degli animali"
                }
          ],
          "versi": [
                {
                      "title": "1984 (I tre slogan del Ministero della Verità)",
                      "lines": [
                            "LA GUERRA È PACE",
                            "LA LIBERTÀ È SCHIAVITÙ",
                            "L'IGNORANZA È FORZA.",
                            "Il Grande Fratello vi guarda."
                      ],
                      "hint": "I dogmi del bipensiero totalitario nel mondo distopico di Oceania."
                }
          ],
          "quiz": [
                {
                      "q": "Qual era il vero nome all'anagrafe di George Orwell?",
                      "o": [
                            "Eric Arthur Blair",
                            "Charles Lutwidge Dodgson",
                            "Arthur Conan Doyle",
                            "Samuel Clemens"
                      ],
                      "a": 0
                },
                {
                      "q": "Come si chiama la lingua manipolata e ridotta all'essenziale imposta dal Partito in '1984'?",
                      "o": [
                            "Esperanto",
                            "Neolingua (Newspeak)",
                            "Volgare",
                            "Codice morse"
                      ],
                      "a": 1
                },
                {
                      "q": "Quali animali prendono il potere nella celebre favola distopica e satirica di Orwell?",
                      "o": [
                            "I cavalli",
                            "I maiali",
                            "I lupi",
                            "Le pecore"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è la temutissima stanza del Ministero dell'Amore dove ciascuno affronta il proprio peggior incubo?",
                      "o": [
                            "Stanza 101",
                            "Stanza 99",
                            "Stanza 50",
                            "Stanza 13"
                      ],
                      "a": 0
                },
                {
                      "q": "A quale conflitto storico Orwell partecipò come volontario antifascista descritto in 'Omaggio alla Catalogna'?",
                      "o": [
                            "Prima Guerra Mondiale",
                            "Guerra Civile Spagnola",
                            "Seconda Guerra Mondiale",
                            "Guerra fredda"
                      ],
                      "a": 1
                }
          ]
    },
    'ernest-hemingway': {
          "topic": "Ernest Hemingway",
          "impiccato": [
                {
                      "word": "VECCHIO",
                      "hint": "Il... e il mare, capolavoro premiato con il Nobel"
                },
                {
                      "word": "SANTIAGO",
                      "hint": "Il vecchio pescatore cubano tenace e indomito"
                },
                {
                      "word": "MARLIN",
                      "hint": "Il gigantesco pesce spada pescato nella Corrente del Golfo"
                },
                {
                      "word": "ICEBERG",
                      "hint": "La teoria dello stile essenziale: sette ottavi sotto la superficie"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "L'uomo",
                            "non",
                            "è",
                            "fatto",
                            "per",
                            "la",
                            "sconfitta"
                      ],
                      "solution": "L'uomo non è fatto per la sconfitta",
                      "source": "Il vecchio e il mare"
                },
                {
                      "words": [
                            "Un",
                            "uomo",
                            "può",
                            "essere",
                            "distrutto",
                            "ma",
                            "non",
                            "sconfitto"
                      ],
                      "solution": "Un uomo può essere distrutto ma non sconfitto",
                      "source": "Il vecchio e il mare"
                }
          ],
          "cloze": [
                {
                      "text": "Un uomo può essere distrutto, ma non ___ : la celebre frase di Santiago nel romanzo Il vecchio e il mare.",
                      "blanks": [
                            "sconfitto"
                      ],
                      "source": "Il vecchio e il mare"
                },
                {
                      "text": "Il giovane Manolin è il fedele ragazzo che aiuta e sostiene con affetto il vecchio pescatore ___ .",
                      "blanks": [
                            "Santiago"
                      ],
                      "source": "Il vecchio e il mare"
                }
          ],
          "versi": [
                {
                      "title": "Il vecchio e il mare (Santiago in mezzo all'oceano)",
                      "lines": [
                            "Era un vecchio che pescava da solo su una barca",
                            "nella Corrente del Golfo",
                            "ed erano ottantaquattro giorni ormai",
                            "che non prendeva un pesce."
                      ],
                      "hint": "L'esordio essenziale e solenne del romanzo che valse a Hemingway il Nobel nel 1954."
                }
          ],
          "quiz": [
                {
                      "q": "In quale anno Ernest Hemingway fu insignito del Premio Nobel per la Letteratura?",
                      "o": [
                            "1929",
                            "1940",
                            "1954",
                            "1961"
                      ],
                      "a": 2
                },
                {
                      "q": "Da quanti giorni il vecchio Santiago non riusciva a pescare un pesce prima della grande cattura?",
                      "o": [
                            "7 giorni",
                            "40 giorni",
                            "84 giorni",
                            "100 giorni"
                      ],
                      "a": 2
                },
                {
                      "q": "Quali predatori marini divorano la carne del maestoso marlin durante il ritorno verso la costa?",
                      "o": [
                            "Gli squali",
                            "Le orche",
                            "Le balene",
                            "I barracuda"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale celebre romanzo racconta l'amore tragico tra un giovane americano e un'infermiera sul fronte italiano nella Grande Guerra?",
                      "o": [
                            "Addio alle armi",
                            "Per chi suona la campana",
                            "Festa mobile",
                            "Verdi colline d'Africa"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale isola caraibica Hemingway visse per oltre vent'anni nella tenuta Finca Vigía?",
                      "o": [
                            "Giamaica",
                            "Cuba",
                            "Portorico",
                            "Bahamas"
                      ],
                      "a": 1
                }
          ]
    },
    'charles-dickens': {
          "topic": "Charles Dickens",
          "impiccato": [
                {
                      "word": "SCROOGE",
                      "hint": "Il vecchio e avaro protagonista del Canto di Natale"
                },
                {
                      "word": "OLIVER",
                      "hint": "... Twist, l'orfanello nella Londra ottocentesca"
                },
                {
                      "word": "NATALE",
                      "hint": "Il Canto di... e i tre spiriti del passato, presente e futuro"
                },
                {
                      "word": "LONDRA",
                      "hint": "La metropoli industriale e fumosa sfondo dei suoi romanzi"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Onorerò",
                            "il",
                            "Natale",
                            "nel",
                            "mio",
                            "cuore",
                            "e",
                            "cercherò",
                            "di",
                            "conservarlo",
                            "tutto",
                            "l'anno"
                      ],
                      "solution": "Onorerò il Natale nel mio cuore e cercherò di conservarlo tutto l'anno",
                      "source": "Canto di Natale"
                },
                {
                      "words": [
                            "Ti",
                            "prego",
                            "signore",
                            "ne",
                            "vorrei",
                            "ancora",
                            "un",
                            "po'"
                      ],
                      "solution": "Ti prego signore ne vorrei ancora un po'",
                      "source": "Oliver Twist"
                }
          ],
          "cloze": [
                {
                      "text": "Ebenezer Scrooge viene visitato la notte della vigilia da tre spiriti: il Natale del passato, del presente e del ___ .",
                      "blanks": [
                            "futuro"
                      ],
                      "source": "Canto di Natale"
                },
                {
                      "text": "Oliver Twist fugge dall'orfanotrofio e finisce nella banda di piccoli ladri guidata dal vecchio ___ .",
                      "blanks": [
                            "Fagin"
                      ],
                      "source": "Oliver Twist"
                }
          ],
          "versi": [
                {
                      "title": "Canto di Natale (La redenzione di Scrooge)",
                      "lines": [
                            "«Io vivrò nel Passato, nel Presente e nel Futuro!",
                            "I tre Spiriti abiteranno dentro di me.",
                            "Non chiuderò il mio cuore alla pietà!",
                            "Buon Natale a tutti quanti e che Dio ci benedica!»"
                      ],
                      "hint": "La gioiosa trasformazione dell'avaro Scrooge dopo la visita notturna dei fantasmi."
                }
          ],
          "quiz": [
                {
                      "q": "Come si chiama l'anziano usuraio egoista protagonista di 'Canto di Natale'?",
                      "o": [
                            "Ebenezer Scrooge",
                            "David Copperfield",
                            "Bob Cratchit",
                            "Oliver Twist"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale frase celeberrima pronuncia il piccolo orfano Oliver Twist all'orfanotrofio?",
                      "o": [
                            "Voglio andare a casa",
                            "Per favore signore, ne vorrei ancora un po'",
                            "Non ho fame",
                            "Datemi una coperta"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale lavoro infantile umiliante Dickens dovette fare da bambino a dodici anni quando il padre fu arrestato per debiti?",
                      "o": [
                            "Minatore",
                            "Incollare etichette sui barattoli di lucido da scarpe in fabbrica",
                            "Mozzo su una nave",
                            "Spazzacamino"
                      ],
                      "a": 1
                },
                {
                      "q": "Chi è il fedele e povero impiegato malpagato da Scrooge con un figlio malato (il piccolo Tim)?",
                      "o": [
                            "Bob Cratchit",
                            "Fagin",
                            "Artful Dodger",
                            "Uriah Heep"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale epoca storica regnava la Gran Bretagna durante la vita e le opere di Charles Dickens?",
                      "o": [
                            "Età Elisabettiana",
                            "Età Vittoriana (Regina Vittoria)",
                            "Età Georgiana",
                            "Rinascimento"
                      ],
                      "a": 1
                }
          ]
    },
    'herman-melville': {
          "topic": "Herman Melville",
          "impiccato": [
                {
                      "word": "MOBY",
                      "hint": "... Dick, la leggendaria balena bianca"
                },
                {
                      "word": "ACHAB",
                      "hint": "Il capitano con la gamba d'avorio assetato di vendetta"
                },
                {
                      "word": "PEQUOD",
                      "hint": "La nave baleniera che solca gli oceani"
                },
                {
                      "word": "ISMAELE",
                      "hint": "Il marinaio narratore unico superstite"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Chiamatemi",
                            "Ismaele"
                      ],
                      "solution": "Chiamatemi Ismaele",
                      "source": "Moby Dick (Incipit)"
                },
                {
                      "words": [
                            "Per",
                            "inseguire",
                            "quella",
                            "balena",
                            "bianca",
                            "girerei",
                            "intorno",
                            "al",
                            "mondo"
                      ],
                      "solution": "Per inseguire quella balena bianca girerei intorno al mondo",
                      "source": "Moby Dick (Capitano Achab)"
                }
          ],
          "cloze": [
                {
                      "text": "Chiamatemi ___ : la celebre frase con cui si apre il romanzo Moby Dick.",
                      "blanks": [
                            "Ismaele"
                      ],
                      "source": "Moby Dick"
                },
                {
                      "text": "Il capitano Achab ha perso una gamba, strappata dal morso della balena ___ , e ha giurato vendetta fino alla morte.",
                      "blanks": [
                            "bianca"
                      ],
                      "source": "Moby Dick"
                }
          ],
          "versi": [
                {
                      "title": "Moby Dick - Incipit (Capitolo I)",
                      "lines": [
                            "Chiamatemi Ismaele.",
                            "Alcuni anni fa - non importa quanti esattamente -",
                            "avendo poco o nessun denaro in tasca,",
                            "pensai di mettermi per mare e vedere la parte acquea del mondo."
                      ],
                      "hint": "Il celebre inizio dell'epopea marina e metafisica americana."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è l'indimenticabile prima frase che apre il romanzo 'Moby Dick'?",
                      "o": [
                            "C'era una volta un capitano",
                            "Chiamatemi Ismaele",
                            "Il mare era calmo e scuro",
                            "Molti anni fa a Nantucket"
                      ],
                      "a": 1
                },
                {
                      "q": "Come si chiama la nave baleniera comandata dal capitano Achab?",
                      "o": [
                            "Pequod",
                            "Nautilus",
                            "Santa Maria",
                            "Bounty"
                      ],
                      "a": 0
                },
                {
                      "q": "Di quale materiale è fatta la gamba finta del capitano Achab?",
                      "o": [
                            "Di legno di quercia",
                            "D'osso di mascella di capodoglio (avorio)",
                            "Di ferro battuto",
                            "Di bronzo"
                      ],
                      "a": 1
                },
                {
                      "q": "Chi è l'amico ramponiere polinesiano tatuato che accompagna Ismaele a bordo?",
                      "o": [
                            "Queequeg",
                            "Starbuck",
                            "Pip",
                            "Fedallah"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il celebre racconto di Melville sull'impiegato che risponde sempre 'Preferirei di no'?",
                      "o": [
                            "Bartleby lo scrivano",
                            "Billy Budd",
                            "Typee",
                            "Omoo"
                      ],
                      "a": 0
                }
          ]
    },
    'franz-kafka': {
          "topic": "Franz Kafka",
          "impiccato": [
                {
                      "word": "METAMORFOSI",
                      "hint": "La trasformazione di Gregor Samsa in insetto"
                },
                {
                      "word": "PROCESSO",
                      "hint": "Il romanzo sull'assurda burocrazia e l'arresto di Josef K."
                },
                {
                      "word": "PRAGA",
                      "hint": "La città magica e misteriosa dove visse lo scrittore"
                },
                {
                      "word": "SAMSA",
                      "hint": "Gregor... il commesso viaggiatore protagonista"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Gregor",
                            "Samsa",
                            "si",
                            "risvegliò",
                            "trasformato",
                            "in",
                            "un",
                            "enorme",
                            "insetto"
                      ],
                      "solution": "Gregor Samsa si risvegliò trasformato in un enorme insetto",
                      "source": "La metamorfosi"
                },
                {
                      "words": [
                            "Qualcuno",
                            "doveva",
                            "aver",
                            "calunniato",
                            "Josef",
                            "K.",
                            "perché",
                            "fu",
                            "arrestato"
                      ],
                      "solution": "Qualcuno doveva aver calunniato Josef K. perché fu arrestato",
                      "source": "Il processo"
                }
          ],
          "cloze": [
                {
                      "text": "Un mattino, svegliandosi da sogni inquieti, Gregor Samsa si trovò trasformato nel suo letto in un enorme ___ .",
                      "blanks": [
                            "insetto"
                      ],
                      "source": "La metamorfosi"
                },
                {
                      "text": "Nel romanzo Il processo, Josef K. viene arrestato senza sapere di quale ___ sia accusato.",
                      "blanks": [
                            "reato"
                      ],
                      "source": "Il processo"
                }
          ],
          "versi": [
                {
                      "title": "La metamorfosi (Incipit)",
                      "lines": [
                            "Un mattino, svegliandosi da sogni inquieti,",
                            "Gregor Samsa si trovò trasformato nel suo letto in un enorme insetto.",
                            "Riposava sulla schiena dura come una corazza",
                            "e vedeva il suo ventre bruno e arcuato."
                      ],
                      "hint": "L'allucinante inizio del capolavoro della letteratura moderna sull'alienazione umana."
                }
          ],
          "quiz": [
                {
                      "q": "In cosa si ritrova trasformato una mattina il commesso viaggiatore Gregor Samsa?",
                      "o": [
                            "In un uccello",
                            "In un enorme insetto (scarafaggio)",
                            "In una statua di pietra",
                            "In un lupo"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale città della Boemia nacque e visse Franz Kafka?",
                      "o": [
                            "Vienna",
                            "Praga",
                            "Berlino",
                            "Budapest"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale caro amico di Kafka decise di non bruciare i suoi manoscritti inediti dopo la sua morte, pubblicandoli?",
                      "o": [
                            "Max Brod",
                            "Walter Benjamin",
                            "Thomas Mann",
                            "Stefan Zweig"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa si intende comunemente per atmosfera 'kafkiana'?",
                      "o": [
                            "Un ambiente allegro e fiabesco",
                            "Una situazione assurda, angosciante e dominata da una burocrazia incomprensibile",
                            "Un poema epico",
                            "Una commedia teatrale"
                      ],
                      "a": 1
                },
                {
                      "q": "A chi è indirizzata la celebre e dolorosa 'Lettera' in cui Kafka esprime tutto il timore e l'incomprensione filiale?",
                      "o": [
                            "Alla madre",
                            "Al padre (Hermann Kafka)",
                            "Alla sorella Ottla",
                            "Alla fidanzata Felice"
                      ],
                      "a": 1
                }
          ]
    },
    'william-shakespeare': {
          "topic": "William Shakespeare",
          "impiccato": [
                {
                      "word": "AMLETO",
                      "hint": "Il principe di Danimarca: Essere o non essere"
                },
                {
                      "word": "ROMEO",
                      "hint": "... e Giulietta, i due amanti di Verona"
                },
                {
                      "word": "GLOBE",
                      "hint": "Il celebre teatro londinese in legno a cielo aperto"
                },
                {
                      "word": "STRATFORD",
                      "hint": "La cittadina natale sull'Avon"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Essere",
                            "o",
                            "non",
                            "essere",
                            "questo",
                            "è",
                            "il",
                            "dilemma"
                      ],
                      "solution": "Essere o non essere questo è il dilemma",
                      "source": "Amleto"
                },
                {
                      "words": [
                            "Siamo",
                            "fatti",
                            "della",
                            "stessa",
                            "sostanza",
                            "dei",
                            "sogni"
                      ],
                      "solution": "Siamo fatti della stessa sostanza dei sogni",
                      "source": "La Tempesta"
                }
          ],
          "cloze": [
                {
                      "text": "Essere o non essere, questo è il ___ : se sia più nobile soffrire nell'animo i dardi dell'avversa fortuna o prender l'armi contro un mare di guai.",
                      "blanks": [
                            "dilemma"
                      ],
                      "source": "Amleto"
                },
                {
                      "text": "Le due famiglie rivali di Verona, i Montecchi e i ___ , si scontrano mentre sboccia l'amore tra Romeo e Giulietta.",
                      "blanks": [
                            "Capuleti"
                      ],
                      "source": "Romeo e Giulietta"
                }
          ],
          "versi": [
                {
                      "title": "Amleto - Atto III (Monologo)",
                      "lines": [
                            "Essere o non essere, questo è il dilemma:",
                            "se sia più nobile soffrire nell'animo",
                            "i colpi e i dardi dell'oltraggiosa fortuna,",
                            "o prender l'armi contro un mare di affanni e opponendosi por loro fine."
                      ],
                      "hint": "Il più famoso monologo del teatro mondiale sui dubbi dell'esistenza umana."
                }
          ],
          "quiz": [
                {
                      "q": "In quale città italiana è ambientata la tragedia 'Romeo e Giulietta'?",
                      "o": [
                            "Venezia",
                            "Verona",
                            "Firenze",
                            "Roma"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è il celebre teatro londinese fondato dalla compagnia di Shakespeare?",
                      "o": [
                            "The Globe Theatre",
                            "Covent Garden",
                            "Colosseum",
                            "Royal Opera"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale personaggio esclama con un teschio in mano: 'Essere o non essere, questo è il dilemma'?",
                      "o": [
                            "Macbeth",
                            "Il principe Amleto",
                            "Re Lear",
                            "Otello"
                      ],
                      "a": 1
                },
                {
                      "q": "Chi è il perfido consigliere che manipola Otello con una cieca gelosia verso Desdemona?",
                      "o": [
                            "Iago",
                            "Cassio",
                            "Bruto",
                            "Tebaldo"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale commedia magica si svolge in una foresta incantata nella notte di mezza estate?",
                      "o": [
                            "La dodicesima notte",
                            "Sogno di una notte di mezza estate",
                            "Molto rumore per nulla",
                            "La bisbetica domata"
                      ],
                      "a": 1
                }
          ]
    },
    'miguel-cervantes': {
          "topic": "Miguel de Cervantes",
          "impiccato": [
                {
                      "word": "CHISCIOTTE",
                      "hint": "Don... l'ingegnoso hidalgo cavaliere errante"
                },
                {
                      "word": "SANCIO",
                      "hint": "... Panza, il fedele e pratico scudiero"
                },
                {
                      "word": "MULINI",
                      "hint": "I giganti con le braccia rotanti contro cui combatte"
                },
                {
                      "word": "DULCINEA",
                      "hint": "La dama del Toboso idealizzata da Don Chisciotte"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "In",
                            "un",
                            "luogo",
                            "della",
                            "Mancia",
                            "di",
                            "cui",
                            "non",
                            "voglio",
                            "ricordare",
                            "il",
                            "nome"
                      ],
                      "solution": "In un luogo della Mancia di cui non voglio ricordare il nome",
                      "source": "Don Chisciotte (Incipit)"
                },
                {
                      "words": [
                            "Non",
                            "sono",
                            "giganti",
                            "mio",
                            "signore",
                            "sono",
                            "mulini",
                            "a",
                            "vento"
                      ],
                      "solution": "Non sono giganti mio signore sono mulini a vento",
                      "source": "Don Chisciotte (Sancio Panza)"
                }
          ],
          "cloze": [
                {
                      "text": "Don Chisciotte della Mancia scambia i mulini a vento per feroci ___ con cui ingaggiare battaglia.",
                      "blanks": [
                            "giganti"
                      ],
                      "source": "Don Chisciotte"
                },
                {
                      "text": "Il cavaliere errante cavalca il magro cavallo ___ e nomina scudiero il contadino Sancio Panza.",
                      "blanks": [
                            "Ronzinante"
                      ],
                      "source": "Don Chisciotte"
                }
          ],
          "versi": [
                {
                      "title": "Don Chisciotte della Mancia (Incipit)",
                      "lines": [
                            "In un luogo della Mancia, di cui non voglio ricordarmi il nome,",
                            "viveva non ha guari un cavaliere di quelli",
                            "con lancia nella rastrelliera, scudo antico,",
                            "magro ronzino e cane corridore."
                      ],
                      "hint": "L'inizio del primo grande romanzo moderno della letteratura mondiale (1605)."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è considerato il primo capolavoro del romanzo moderno europeo?",
                      "o": [
                            "Don Chisciotte della Mancia (1605)",
                            "Robinson Crusoe",
                            "I viaggi di Gulliver",
                            "Gargantua e Pantagruele"
                      ],
                      "a": 0
                },
                {
                      "q": "A quale storica battaglia navale del 1571 contro la flotta ottomana partecipò Cervantes, rimanendo ferito a una mano?",
                      "o": [
                            "Battaglia di Lepanto",
                            "Battaglia di Trafalgar",
                            "Battaglia di Waterloo",
                            "Assedio di Vienna"
                      ],
                      "a": 0
                },
                {
                      "q": "Come si chiama il fedele scudiero contadino che accompagna Don Chisciotte a cavallo di un asino?",
                      "o": [
                            "Sancio Panza",
                            "Giacomo",
                            "Pedro",
                            "Rodrigo"
                      ],
                      "a": 0
                },
                {
                      "q": "Perché Don Chisciotte decide di farsi cavaliere errante e partire per l'avventura?",
                      "o": [
                            "Perché ha letto troppi romanzi cavallereschi e ha perso il senno",
                            "Per ordine del Re di Spagna",
                            "Per cercare l'oro nelle Americhe",
                            "Per diventare governatore"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il nome del magro cavallo di Don Chisciotte?",
                      "o": [
                            "Ronzinante",
                            "Bucefalo",
                            "Pegaso",
                            "Tornado"
                      ],
                      "a": 0
                }
          ]
    },
    'jane-austen': {
          "topic": "Jane Austen",
          "impiccato": [
                {
                      "word": "ORGOGLIO",
                      "hint": "... e pregiudizio, la storia di Elizabeth e Mr Darcy"
                },
                {
                      "word": "DARCY",
                      "hint": "Il ricco e apparentemente altero gentiluomo"
                },
                {
                      "word": "ELIZABETH",
                      "hint": "La brillante e indipendente secondogenita Bennet"
                },
                {
                      "word": "RAGIONE",
                      "hint": "... e sentimento (Sense and Sensibility)"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "È",
                            "una",
                            "verità",
                            "universalmente",
                            "riconosciuta",
                            "che",
                            "uno",
                            "scapolo",
                            "in",
                            "possesso",
                            "di",
                            "un'ampia",
                            "fortuna"
                      ],
                      "solution": "È una verità universalmente riconosciuta che uno scapolo in possesso di un'ampia fortuna",
                      "source": "Orgoglio e pregiudizio (Incipit)"
                },
                {
                      "words": [
                            "debba",
                            "essere",
                            "in",
                            "cerca",
                            "di",
                            "una",
                            "moglie"
                      ],
                      "solution": "debba essere in cerca di una moglie",
                      "source": "Orgoglio e pregiudizio"
                }
          ],
          "cloze": [
                {
                      "text": "È una verità universalmente riconosciuta che uno scapolo in possesso di un'ampia fortuna debba essere in cerca di una ___ .",
                      "blanks": [
                            "moglie"
                      ],
                      "source": "Orgoglio e pregiudizio"
                },
                {
                      "text": "Nel romanzo Ragione e sentimento, Elinor rappresenta la razionalità e Marianne la passione ___ .",
                      "blanks": [
                            "emotiva"
                      ],
                      "source": "Ragione e sentimento"
                }
          ],
          "versi": [
                {
                      "title": "Orgoglio e pregiudizio (Incipit)",
                      "lines": [
                            "È una verità universalmente riconosciuta",
                            "che uno scapolo provvisto di un cospicuo patrimonio",
                            "non possa fare a meno di desiderare una moglie.",
                            "Questa verità è così radicata nella mente delle famiglie vicine."
                      ],
                      "hint": "Uno degli incipit ironici più famosi della letteratura inglese di inizio Ottocento."
                }
          ],
          "quiz": [
                {
                      "q": "Chi è la brillante protagonista femminile di 'Orgoglio e pregiudizio'?",
                      "o": [
                            "Elizabeth Bennet",
                            "Emma Woodhouse",
                            "Jane Eyre",
                            "Catherine Morland"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale ricco gentiluomo si innamora di Elizabeth vincendo il proprio orgoglio di classe?",
                      "o": [
                            "Mr. Darcy",
                            "Mr. Bingley",
                            "Mr. Wickham",
                            "Mr. Collins"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale romanzo di Jane Austen ha per protagonista un'aristocratica ragazza che si diverte a combinare matrimoni per gli altri?",
                      "o": [
                            "Emma",
                            "Persuasione",
                            "Mansfield Park",
                            "L'abbazia di Northanger"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale Paese visse e ambientò tutti i suoi celebri romanzi Jane Austen?",
                      "o": [
                            "Nella campagna inglese (Hampshire)",
                            "In Scozia",
                            "Negli Stati Uniti",
                            "A Parigi"
                      ],
                      "a": 0
                },
                {
                      "q": "Con quale firma anonima vennero inizialmente pubblicati i romanzi della Austen?",
                      "o": [
                            "By a Lady",
                            "Currer Bell",
                            "Anonymous Gentleman",
                            "George Eliot"
                      ],
                      "a": 0
                }
          ]
    },
    'oscar-wilde': {
          "topic": "Oscar Wilde",
          "impiccato": [
                {
                      "word": "DORIAN",
                      "hint": "Il ritratto di... Gray che invecchia al posto suo"
                },
                {
                      "word": "DANDY",
                      "hint": "L'esteta raffinato che fa della vita un'opera d'arte"
                },
                {
                      "word": "RITRATTO",
                      "hint": "Il dipinto nascosto in soffitta che mostra i segni dei peccati"
                },
                {
                      "word": "ERNESTO",
                      "hint": "L'importanza di chiamarsi..."
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Posso",
                            "resistere",
                            "a",
                            "tutto",
                            "tranne",
                            "che",
                            "alle",
                            "tentazioni"
                      ],
                      "solution": "Posso resistere a tutto tranne che alle tentazioni",
                      "source": "Aforismi"
                },
                {
                      "words": [
                            "L'unico",
                            "modo",
                            "per",
                            "liberarsi",
                            "di",
                            "una",
                            "tentazione",
                            "è",
                            "cedervi"
                      ],
                      "solution": "L'unico modo per liberarsi di una tentazione è cedervi",
                      "source": "Il ritratto di Dorian Gray"
                }
          ],
          "cloze": [
                {
                      "text": "Dorian Gray esprime il desiderio che il dipinto dipinto da Basil Hallward invecchi al suo posto, mantenendo per sé l'eterna ___ .",
                      "blanks": [
                            "giovinezza"
                      ],
                      "source": "Il ritratto di Dorian Gray"
                },
                {
                      "text": "Lord Henry Wotton è il raffinato edonista che guida Dorian verso la ricerca del ___ estetico senza limiti morali.",
                      "blanks": [
                            "piacere"
                      ],
                      "source": "Il ritratto di Dorian Gray"
                }
          ],
          "versi": [
                {
                      "title": "Il ritratto di Dorian Gray (Prefazione)",
                      "lines": [
                            "L'artista è il creatore di cose belle.",
                            "Rivelare l'arte e nascondere l'artista è il fine dell'arte.",
                            "Non esistono libri morali o immorali.",
                            "I libri sono scritti bene o scritti male. Questo è tutto."
                      ],
                      "hint": "Il manifesto dell'Estetismo decadente britannico firmato da Oscar Wilde."
                }
          ],
          "quiz": [
                {
                      "q": "In quale città irlandese nacque il geniale scrittore e commediografo Oscar Wilde?",
                      "o": [
                            "Dublino",
                            "Belfast",
                            "Cork",
                            "Galway"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa accade al ritratto di Dorian Gray man mano che il protagonista compie malefatte?",
                      "o": [
                            "Diventa invisibile",
                            "Invecchia e si sfigura mostrando la corruzione dell'anima",
                            "Prende fuoco",
                            "Scompare"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è la commedia teatrale satirica più famosa e brillante di Wilde basata su un doppio gioco di nomi?",
                      "o": [
                            "L'importanza di chiamarsi Ernesto",
                            "Il ventaglio di Lady Windermere",
                            "Un marito ideale",
                            "Salomè"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa scrisse Oscar Wilde durante la dolorosa prigionia nel carcere di Reading?",
                      "o": [
                            "De Profundis e La ballata del carcere di Reading",
                            "Il ritratto di Dorian Gray",
                            "I Canti di Natale",
                            "Le confessioni"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi ha dipinto il magico e maledetto ritratto di Dorian?",
                      "o": [
                            "Il pittore Basil Hallward",
                            "Lord Henry Wotton",
                            "James Vane",
                            "Alan Campbell"
                      ],
                      "a": 0
                }
          ]
    },
    'arthur-conan-doyle': {
          "topic": "Arthur Conan Doyle",
          "impiccato": [
                {
                      "word": "SHERLOCK",
                      "hint": "... Holmes, il detective di Baker Street"
                },
                {
                      "word": "WATSON",
                      "hint": "Il dottor John... fedele amico e narratore delle indagini"
                },
                {
                      "word": "DEDUZIONE",
                      "hint": "Il metodo logico e scientifico per risolvere i casi"
                },
                {
                      "word": "MORIARTY",
                      "hint": "Il professor... nemico mortale di Holmes"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Elementare",
                            "mio",
                            "caro",
                            "Watson"
                      ],
                      "solution": "Elementare mio caro Watson",
                      "source": "Celebre frase associata a Sherlock Holmes"
                },
                {
                      "words": [
                            "Quando",
                            "hai",
                            "eliminato",
                            "l'impossibile",
                            "ciò",
                            "che",
                            "resta",
                            "è",
                            "la",
                            "verità"
                      ],
                      "solution": "Quando hai eliminato l'impossibile ciò che resta è la verità",
                      "source": "Il segno dei quattro"
                }
          ],
          "cloze": [
                {
                      "text": "Sherlock Holmes abita a Londra al celeberrimo indirizzo di ___ Baker Street.",
                      "blanks": [
                            "221B"
                      ],
                      "source": "Uno studio in rosso"
                },
                {
                      "text": "Il mastino dei ___ è uno dei casi più famosi in cui Holmes indaga su una creatura mostruosa nella brughiera.",
                      "blanks": [
                            "Baskerville"
                      ],
                      "source": "Il mastino dei Baskerville"
                }
          ],
          "versi": [
                {
                      "title": "Uno studio in rosso (Incontro con Holmes)",
                      "lines": [
                            "«Dalla goccia d'acqua un logico può inferire",
                            "la possibilità dell'esistenza di un oceano Atlantico o di un Niagara.",
                            "Tutta la vita è una grande catena,",
                            "la cui natura ci è rivelata a ogni anello.»"
                      ],
                      "hint": "La teoria del metodo deduttivo e analitico applicato alla criminologia."
                }
          ],
          "quiz": [
                {
                      "q": "A quale indirizzo londinese abita il detective Sherlock Holmes?",
                      "o": [
                            "10 Downing Street",
                            "221B Baker Street",
                            "15 Abbey Road",
                            "4 Privet Drive"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale strumento musicale suona Sherlock Holmes per rilassarsi e riflettere sui casi intricati?",
                      "o": [
                            "Il pianoforte",
                            "Il violino",
                            "Il flauto",
                            "La chitarra"
                      ],
                      "a": 1
                },
                {
                      "q": "Qual è il primo romanzo poliziesco in cui appare per la prima volta Sherlock Holmes nel 1887?",
                      "o": [
                            "Uno studio in rosso",
                            "Il mastino dei Baskerville",
                            "La valle della paura",
                            "Il segno dei quattro"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi è l'acerrimo rivale di Holmes, definito il 'Napoleone del crimine'?",
                      "o": [
                            "Il professor James Moriarty",
                            "Lupin",
                            "Irene Adler",
                            "Lestrade"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale professione medica esercitava Arthur Conan Doyle prima di dedicarsi alla scrittura?",
                      "o": [
                            "Medico oftalmologo e chirurgo",
                            "Avvocato",
                            "Ingegnere minerario",
                            "Professore universitario"
                      ],
                      "a": 0
                }
          ]
    },
    'mary-shelley': {
          "topic": "Mary Shelley",
          "impiccato": [
                {
                      "word": "FRANKENSTEIN",
                      "hint": "Il moderno Prometeo e la creatura generata dalla scienza"
                },
                {
                      "word": "CREATURA",
                      "hint": "Il mostro senza nome composto da membra e animato dal fulmine"
                },
                {
                      "word": "VICTOR",
                      "hint": "Lo scienziato ginevrino che oltrepassa i limiti umani"
                },
                {
                      "word": "PROMETEO",
                      "hint": "Il mito classico del titano sottotitolo del romanzo"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Attento",
                            "perché",
                            "io",
                            "sono",
                            "senza",
                            "paura",
                            "e",
                            "quindi",
                            "potente"
                      ],
                      "solution": "Attento perché io sono senza paura e quindi potente",
                      "source": "Frankenstein"
                },
                {
                      "words": [
                            "Ero",
                            "buono",
                            "e",
                            "benevolo",
                            "è",
                            "la",
                            "miseria",
                            "che",
                            "mi",
                            "ha",
                            "reso",
                            "un",
                            "demone"
                      ],
                      "solution": "Ero buono e benevolo è la miseria che mi ha reso un demone",
                      "source": "Frankenstein (La Creatura)"
                }
          ],
          "cloze": [
                {
                      "text": "Victor Frankenstein riesce a dare vita alla sua creatura attraverso l'elettricità e la scienza nella città di ___ .",
                      "blanks": [
                            "Ginevra"
                      ],
                      "source": "Frankenstein"
                },
                {
                      "text": "Il romanzo Frankenstein reca come sottotitolo Il moderno ___ , alludendo alla sfida verso i limiti della natura.",
                      "blanks": [
                            "Prometeo"
                      ],
                      "source": "Frankenstein"
                }
          ],
          "versi": [
                {
                      "title": "Frankenstein (Il risveglio della Creatura)",
                      "lines": [
                            "Era una piovosa notte di novembre quando contemplai il compimento delle mie fatiche.",
                            "Raccolsi gli strumenti per infondere la scintilla dell'esistenza.",
                            "All'una del mattino la pioggia batteva lugubre sui vetri;",
                            "la mia candela era quasi spenta quando vidi aprirsi l'occhio giallo della creatura."
                      ],
                      "hint": "Il celeberrimo capitolo V in cui nasce il primo capolavoro della fantascienza moderna (1818)."
                }
          ],
          "quiz": [
                {
                      "q": "Quanti anni aveva Mary Shelley quando concepì la storia di Frankenstein durante l'estate del 1816 a Villa Diodati?",
                      "o": [
                            "A soli 18 anni",
                            "30 anni",
                            "40 anni",
                            "50 anni"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il sottotitolo originale del romanzo 'Frankenstein'?",
                      "o": [
                            "La notte degli orrori",
                            "Il moderno Prometeo",
                            "L'ombra del mostro",
                            "Il demone della scienza"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale famoso poeta romantico inglese fu marito di Mary Shelley?",
                      "o": [
                            "Lord Byron",
                            "Percy Bysshe Shelley",
                            "John Keats",
                            "William Wordsworth"
                      ],
                      "a": 1
                },
                {
                      "q": "Come si chiama lo scienziato che crea il mostro assemblando parti di cadaveri?",
                      "o": [
                            "Victor Frankenstein",
                            "Dracula",
                            "Dottor Jekyll",
                            "Igor"
                      ],
                      "a": 0
                },
                {
                      "q": "Perché l'anno 1816 in cui fu scritto il romanzo è storicamente noto come 'l'anno senza estate'?",
                      "o": [
                            "Per un'eclissi solare",
                            "Per l'eruzione del vulcano Tambora che oscurò il cielo in tutta Europa",
                            "Per una glaciazione",
                            "Per una guerra"
                      ],
                      "a": 1
                }
          ]
    },
    'jrr-tolkien': {
          "topic": "J.R.R. Tolkien",
          "impiccato": [
                {
                      "word": "ANELLO",
                      "hint": "Il Signore degli Anelli e l'Unico Anello di Sauron"
                },
                {
                      "word": "FRODO",
                      "hint": "Lo hobbit portatore dell'Anello verso Monte Fato"
                },
                {
                      "word": "GANDALF",
                      "hint": "Il grande stregone bianco guida della Compagnia"
                },
                {
                      "word": "MORDOR",
                      "hint": "La terra oscura dominata dal Signore Oscuro"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Un",
                            "Anello",
                            "per",
                            "domarli",
                            "un",
                            "Anello",
                            "per",
                            "trovarli"
                      ],
                      "solution": "Un Anello per domarli un Anello per trovarli",
                      "source": "Il Signore degli Anelli"
                },
                {
                      "words": [
                            "Non",
                            "tutto",
                            "quel",
                            "che",
                            "è",
                            "oro",
                            "brilla",
                            "non",
                            "tutti",
                            "quelli",
                            "che",
                            "vagano",
                            "sono",
                            "persi"
                      ],
                      "solution": "Non tutto quel che è oro brilla non tutti quelli che vagano sono persi",
                      "source": "Il Signore degli Anelli (Aragorn)"
                }
          ],
          "cloze": [
                {
                      "text": "Un Anello per domarli, un Anello per trovarli, un Anello per ghermirli e nel buio ___ : nella Terra di Mordor, dove l'Ombra cupa scende.",
                      "blanks": [
                            "incatenarli"
                      ],
                      "source": "Il Signore degli Anelli"
                },
                {
                      "text": "Frodo Baggins e il fidato compagno Samvise Gamgee partono dalla Contea per distruggere l'Anello nel fuoco di Monte ___ .",
                      "blanks": [
                            "Fato"
                      ],
                      "source": "Il Signore degli Anelli"
                }
          ],
          "versi": [
                {
                      "title": "La Poesia dell'Anello",
                      "lines": [
                            "Tre Anelli ai Re degli Elfi sotto il cielo che risplende,",
                            "Sette ai Principi dei Nani nelle lor rocciose sale,",
                            "Nove agli Uomini Mortali che la triste morte attende,",
                            "Uno per l'Oscuro Sire chiuso nella reggia oscura nella Terra di Mordor."
                      ],
                      "hint": "I celeberrimi versi dell'epica fantasy che narrano la forgia degli Anelli del Potere."
                }
          ],
          "quiz": [
                {
                      "q": "Quale cattedra universitaria insegnò per decenni J.R.R. Tolkien a Oxford?",
                      "o": [
                            "Filologia germanica e lingua inglese antica (antico inglese)",
                            "Storia romana",
                            "Botanica",
                            "Fisica teorica"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il romanzo pubblicato nel 1937 che introduce per la prima volta il mondo degli hobbit e Bilbo Baggins?",
                      "o": [
                            "Lo Hobbit",
                            "Il Silmarillion",
                            "I figli di Húrin",
                            "Racconti ritrovati"
                      ],
                      "a": 0
                },
                {
                      "q": "Come si chiama la creatura tormentata dall'ossessione per il 'Mio Tesssoro'?",
                      "o": [
                            "Gollum (Sméagol)",
                            "Saruman",
                            "Gimli",
                            "Legolas"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è l'unico luogo in cui l'Unico Anello può essere definitivamente distrutto?",
                      "o": [
                            "Nel mare profondo",
                            "Nelle fiamme di Monte Fato a Mordor",
                            "A Gran Burrone",
                            "A Minas Tirith"
                      ],
                      "a": 1
                },
                {
                      "q": "Quanti membri compongono la Compagnia dell'Anello che parte da Gran Burrone?",
                      "o": [
                            "Sette",
                            "Nove (rappresentanti di Elfi, Nani, Uomini e Hobbit)",
                            "Dodici",
                            "Tre"
                      ],
                      "a": 1
                }
          ]
    },
    'antoine-saint-exupery': {
          "topic": "Antoine de Saint-Exupéry",
          "impiccato": [
                {
                      "word": "PRINCIPE",
                      "hint": "Il piccolo... capolavoro poetico amato nel mondo"
                },
                {
                      "word": "AVIERET",
                      "hint": "La professione di pilota e pioniere del volo postale"
                },
                {
                      "word": "ROSA",
                      "hint": "Il fiore unico e amato sul pianeta B-612"
                },
                {
                      "word": "VOLPE",
                      "hint": "L'amica che insegna il valore dell'addomesticare"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "L'essenziale",
                            "è",
                            "invisibile",
                            "agli",
                            "occhi"
                      ],
                      "solution": "L'essenziale è invisibile agli occhi",
                      "source": "Il piccolo principe"
                },
                {
                      "words": [
                            "Non",
                            "si",
                            "vede",
                            "bene",
                            "che",
                            "col",
                            "cuore"
                      ],
                      "solution": "Non si vede bene che col cuore",
                      "source": "Il piccolo principe"
                }
          ],
          "cloze": [
                {
                      "text": "Ecco il mio segreto. È molto semplice: non si vede bene che col cuore. L'essenziale è invisibile agli ___ .",
                      "blanks": [
                            "occhi"
                      ],
                      "source": "Il piccolo principe"
                },
                {
                      "text": "È il tempo che hai perduto per la tua ___ che ha reso la tua rosa così importante.",
                      "blanks": [
                            "rosa"
                      ],
                      "source": "Il piccolo principe"
                }
          ],
          "versi": [
                {
                      "title": "Il piccolo principe (Il segreto della Volpe)",
                      "lines": [
                            "«Addio», disse la volpe.",
                            "«Ecco il mio segreto. È molto semplice:",
                            "non si vede bene che col cuore.",
                            "L'essenziale è invisibile agli occhi.»"
                      ],
                      "hint": "La celebre lezione sull'amore, l'amicizia e la dedizione reciproca."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è il segreto svelato dalla volpe al Piccolo Principe?",
                      "o": [
                            "Il denaro compra tutto",
                            "Non si vede bene che col cuore: l'essenziale è invisibile agli occhi",
                            "Bisogna viaggiare sempre",
                            "I grandi hanno sempre ragione"
                      ],
                      "a": 1
                },
                {
                      "q": "Quale professione avventurosa svolgeva Saint-Exupéry prima di scomparire in volo nel 1944?",
                      "o": [
                            "Pilota aviatore civile e militare",
                            "Marinaio",
                            "Archeologo",
                            "Ingegnere ferroviario"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale deserto precipita il pilota all'inizio del racconto prima di incontrare il bimbo biondo?",
                      "o": [
                            "Nel deserto del Sahara",
                            "Nel deserto di Atacama",
                            "Nel deserto del Gobi",
                            "In Arizona"
                      ],
                      "a": 0
                },
                {
                      "q": "Da quale minuscolo asteroide proviene il Piccolo Principe?",
                      "o": [
                            "Asteroide B-612",
                            "Luna",
                            "Marte",
                            "Pianeta X"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa chiede di disegnare il Piccolo Principe all'aviatore appena lo incontra?",
                      "o": [
                            "Un aeroplano",
                            "Una pecora",
                            "Una rosa",
                            "Un vulcano"
                      ],
                      "a": 1
                }
          ]
    },
    'virginia-woolf': {
          "topic": "Virginia Woolf",
          "impiccato": [
                {
                      "word": "FARO",
                      "hint": "Gita al... (To the Lighthouse)"
                },
                {
                      "word": "DALLOWAY",
                      "hint": "Mrs... il romanzo ambientato in una sola giornata a Londra"
                },
                {
                      "word": "STANZA",
                      "hint": "Una... tutta per sé (saggio sui diritti e la creatività femminile)"
                },
                {
                      "word": "FLUSSO",
                      "hint": "Il... di coscienza (stream of consciousness) come tecnica narrativa"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Una",
                            "donna",
                            "deve",
                            "avere",
                            "denaro",
                            "e",
                            "una",
                            "stanza",
                            "tutta",
                            "per",
                            "sé"
                      ],
                      "solution": "Una donna deve avere denaro e una stanza tutta per sé",
                      "source": "Una stanza tutta per sé"
                },
                {
                      "words": [
                            "Mrs",
                            "Dalloway",
                            "disse",
                            "che",
                            "avrebbe",
                            "comprato",
                            "i",
                            "fiori",
                            "lei",
                            "stessa"
                      ],
                      "solution": "Mrs Dalloway disse che avrebbe comprato i fiori lei stessa",
                      "source": "Mrs Dalloway (Incipit)"
                }
          ],
          "cloze": [
                {
                      "text": "Una donna deve possedere denaro e una stanza tutta per sé se vuole scrivere romanzi e conquistare la propria ___ .",
                      "blanks": [
                            "indipendenza"
                      ],
                      "source": "Una stanza tutta per sé"
                },
                {
                      "text": "Nel romanzo Gita al faro, la famiglia Ramsay e la pittrice Lily Briscoe attendono per anni il viaggio verso il ___ .",
                      "blanks": [
                            "faro"
                      ],
                      "source": "Gita al faro"
                }
          ],
          "versi": [
                {
                      "title": "Mrs Dalloway (Incipit)",
                      "lines": [
                            "Mrs Dalloway disse che i fiori li avrebbe comprati lei stessa.",
                            "Lucy ne aveva già fin sopra i capelli.",
                            "E che mattina fresca, pareva fatta apposta per i bambini su una spiaggia.",
                            "Che tuffo! Che fremito!"
                      ],
                      "hint": "L'esordio straordinario che introduce il flusso di coscienza interiore di Clarissa Dalloway."
                }
          ],
          "quiz": [
                {
                      "q": "Quale saggio pionieristico del 1929 di Virginia Woolf rivendica l'autonomia economica e intellettuale delle donne?",
                      "o": [
                            "Una stanza tutta per sé",
                            "Le tre ghinee",
                            "Orlando",
                            "Le onde"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale arco temporale si svolgono gli eventi del romanzo 'Mrs Dalloway'?",
                      "o": [
                            "In una sola singola giornata a Londra",
                            "In dieci anni",
                            "Durante un lungo viaggio per mare",
                            "In un mese"
                      ],
                      "a": 0
                },
                {
                      "q": "A quale celebre circolo culturale e intellettuale di Londra apparteneva Virginia Woolf?",
                      "o": [
                            "Bloomsbury Group",
                            "Circolo dei poeti maledetti",
                            "Società teosofica",
                            "Royal Society"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale romanzo di Woolf racconta la straordinaria storia di un personaggio che attraversa quattro secoli mutando da uomo a donna?",
                      "o": [
                            "Orlando",
                            "Gita al faro",
                            "Gli anni",
                            "Notte e giorno"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale innovativa tecnica narrativa del modernismo inglese caratterizza i romanzi di Virginia Woolf?",
                      "o": [
                            "Il flusso di coscienza (Stream of consciousness)",
                            "La rima baciata",
                            "La cronaca giornalistica",
                            "La fiaba didattica"
                      ],
                      "a": 0
                }
          ]
    },
    'marcel-proust': {
          "topic": "Marcel Proust",
          "impiccato": [
                {
                      "word": "MADELEINE",
                      "hint": "Il dolcetto inzuppato nel tè che risveglia la memoria involontaria"
                },
                {
                      "word": "RICERCA",
                      "hint": "Alla... del tempo perduto (Recherche)"
                },
                {
                      "word": "SWANN",
                      "hint": "Dalla parte di... il primo volume del ciclo"
                },
                {
                      "word": "MEMORIA",
                      "hint": "La memoria involontaria che riporta in vita il passato"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Un",
                            "dolce",
                            "boccone",
                            "di",
                            "madeleine",
                            "inzuppata",
                            "nel",
                            "tè"
                      ],
                      "solution": "Un dolce boccone di madeleine inzuppata nel tè",
                      "source": "Dalla parte di Swann"
                },
                {
                      "words": [
                            "Il",
                            "vero",
                            "viaggio",
                            "di",
                            "scoperta",
                            "non",
                            "consiste",
                            "nel",
                            "cercare",
                            "nuove",
                            "terre"
                      ],
                      "solution": "Il vero viaggio di scoperta non consiste nel cercare nuove terre",
                      "source": "Alla ricerca del tempo perduto"
                }
          ],
          "cloze": [
                {
                      "text": "Appena la madeleine inzuppata nel tiglio toccò il mio palato, un brivido mi scosse e l'intera cittadina di ___ risorse dal passato.",
                      "blanks": [
                            "Combray"
                      ],
                      "source": "Dalla parte di Swann"
                },
                {
                      "text": "Alla ricerca del tempo perduto è un capolavoro monumentale diviso in ___ volumi.",
                      "blanks": [
                            "sette"
                      ],
                      "source": "Recherche"
                }
          ],
          "versi": [
                {
                      "title": "Alla ricerca del tempo perduto (L'episodio della Madeleine)",
                      "lines": [
                            "E subito, macchinalmente, accorato da quella giornata cupa",
                            "portai alle labbra un cucchiaino di tè in cui avevo lasciato inzuppare un pezzetto di madeleine.",
                            "Ma nello stesso istante in cui quel sorso misto a briciole toccò il mio palato,",
                            "un brivido mi scosse, colmo d'un piacere straordinario."
                      ],
                      "hint": "La celeberrima epifania sensoriale del gusto che resuscita il passato dell'infanzia."
                }
          ],
          "quiz": [
                {
                      "q": "Quale dolcetto tradizionale inzuppato nel tè evoca in Proust l'improvviso risveglio dei ricordi di Combray?",
                      "o": [
                            "Un cornetto",
                            "La madeleine",
                            "Un macaron",
                            "Un biscotto al cioccolato"
                      ],
                      "a": 1
                },
                {
                      "q": "Quanti volumi compongono l'opera monumentale 'Alla ricerca del tempo perduto'?",
                      "o": [
                            "3",
                            "5",
                            "7 volumi",
                            "12"
                      ],
                      "a": 2
                },
                {
                      "q": "Come viene definita la memoria improvvisa stimolata da una sensazione fisica (gusto, profumo, suono)?",
                      "o": [
                            "Memoria involontaria",
                            "Memoria a breve termine",
                            "Memoria storica",
                            "Amnesia"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale città francese Proust trascorse gran parte della vita scrivendo a letto nella sua stanza foderata di sughero?",
                      "o": [
                            "Parigi",
                            "Lione",
                            "Bordeaux",
                            "Strasburgo"
                      ],
                      "a": 0
                },
                {
                      "q": "Come si intitola il primo celebre volume della 'Recherche'?",
                      "o": [
                            "Dalla parte di Swann",
                            "All'ombra delle fanciulle in fiore",
                            "Il tempo ritrovato",
                            "Sodoma e Gomorra"
                      ],
                      "a": 0
                }
          ]
    },
    'emile-zola': {
          "topic": "Émile Zola",
          "impiccato": [
                {
                      "word": "GERMINAL",
                      "hint": "Il drammatico romanzo sullo sciopero dei minatori"
                },
                {
                      "word": "NATURALISMO",
                      "hint": "La corrente letteraria francese del romanzo sperimentale"
                },
                {
                      "word": "JACCUSE",
                      "hint": "La celebre lettera aperta in difesa del capitano Dreyfus"
                },
                {
                      "word": "NANA",
                      "hint": "Il romanzo sulla cortigiana simbolo della decadenza parigina"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "La",
                            "verità",
                            "è",
                            "in",
                            "marcia",
                            "e",
                            "nulla",
                            "la",
                            "fermerà"
                      ],
                      "solution": "La verità è in marcia e nulla la fermerà",
                      "source": "J'accuse"
                },
                {
                      "words": [
                            "Germinal",
                            "racconta",
                            "la",
                            "lotta",
                            "disperata",
                            "dei",
                            "minatori",
                            "del",
                            "carbone"
                      ],
                      "solution": "Germinal racconta la lotta disperata dei minatori del carbone",
                      "source": "Germinal"
                }
          ],
          "cloze": [
                {
                      "text": "Émile Zola pubblica su L'Aurore il famoso articolo 'J' ___ !' denunciando l'ingiusta condanna per antisemitismo del capitano Alfred Dreyfus.",
                      "blanks": [
                            "accuse"
                      ],
                      "source": "J'accuse (1898)"
                },
                {
                      "text": "Il ciclo dei Rougon-Macquart è composto da venti romanzi che applicano il metodo ___ alla società francese.",
                      "blanks": [
                            "scientifico"
                      ],
                      "source": "Il romanzo sperimentale"
                }
          ],
          "versi": [
                {
                      "title": "J'accuse (Lettera al Presidente della Repubblica)",
                      "lines": [
                            "Io accuso il generale Billot d'aver avuto fra le mani",
                            "le prove certe dell'innocenza di Dreyfus e d'averle soffocate.",
                            "Io non ho che una passione, quella della luce,",
                            "in nome dell'umanità che ha tanto sofferto e che ha diritto alla felicità."
                      ],
                      "hint": "Il celebre atto di coraggio civile e giornalistico che ha segnato la storia europea."
                }
          ],
          "quiz": [
                {
                      "q": "Quale celebre articolo giornalistico Zola scrisse in difesa del capitano ebreo Alfred Dreyfus?",
                      "o": [
                            "J'accuse...!",
                            "La Liberté",
                            "Germinal",
                            "L'Aurore"
                      ],
                      "a": 0
                },
                {
                      "q": "A quale corrente letteraria francese dell'Ottocento appartiene Émile Zola?",
                      "o": [
                            "Naturalismo",
                            "Simbolismo",
                            "Surrealismo",
                            "Illuminismo"
                      ],
                      "a": 0
                },
                {
                      "q": "Come si intitola il celebre romanzo di Zola ambientato nelle miniere di carbone di Montsou?",
                      "o": [
                            "Germinal",
                            "L'Assommoir",
                            "Nanà",
                            "La bestia umana"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale romanzo Zola descrive la piaga dell'alcolismo tra gli operai parigini attraverso la storia di Gervaise?",
                      "o": [
                            "L'Assommoir (L'ammazzatoio)",
                            "Germinal",
                            "Thérèse Raquin",
                            "La terra"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa intendeva Zola per 'romanzo sperimentale'?",
                      "o": [
                            "Un romanzo scritto a quattro mani",
                            "Un romanzo che studia i comportamenti umani con il rigore di un esperimento scientifico e medico",
                            "Un romanzo di sole poesie",
                            "Un'opera teatrale"
                      ],
                      "a": 1
                }
          ]
    },
    'james-joyce': {
          "topic": "James Joyce",
          "impiccato": [
                {
                      "word": "ULISSE",
                      "hint": "Il capolavoro ambientato il 16 giugno 1904 a Dublino"
                },
                {
                      "word": "DUBLINO",
                      "hint": "La città natale sfondo di tutte le sue opere"
                },
                {
                      "word": "BLOOM",
                      "hint": "Leopold... il moderno Ulisse che vaga per la città"
                },
                {
                      "word": "EPIFANIA",
                      "hint": "L'improvvisa illuminazione spirituale rivelata da un dettaglio"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "I",
                            "morti",
                            "cadono",
                            "dolcemente",
                            "su",
                            "tutta",
                            "l'Irlanda"
                      ],
                      "solution": "I morti cadono dolcemente su tutta l'Irlanda",
                      "source": "Gente di Dublino (I Morti)"
                },
                {
                      "words": [
                            "Sì",
                            "ho",
                            "detto",
                            "sì",
                            "voglio",
                            "Sì"
                      ],
                      "solution": "Sì ho detto sì voglio Sì",
                      "source": "Ulisse (Monologo di Molly Bloom)"
                }
          ],
          "cloze": [
                {
                      "text": "Il 16 giugno 1904 è il giorno in cui si svolgono tutte le vicende del romanzo Ulisse a Dublino, celebrato ogni anno come ___ Day.",
                      "blanks": [
                            "Bloomsday"
                      ],
                      "source": "Ulisse"
                },
                {
                      "text": "La raccolta Gente di Dublino contiene quindici racconti che culminano con il celebre capolavoro intitolato I ___ .",
                      "blanks": [
                            "Morti"
                      ],
                      "source": "Gente di Dublino"
                }
          ],
          "versi": [
                {
                      "title": "I Morti (The Dead - Finale)",
                      "lines": [
                            "La neve cadeva su tutta l'Irlanda.",
                            "Cadeva languidamente su tutto l'universo,",
                            "e languidamente scendeva,",
                            "come la discesa della loro ultima fine, su tutti i vivi e su tutti i morti."
                      ],
                      "hint": "Il celeberrimo finale lirico sulla caducità della memoria e dell'esistenza umana."
                }
          ],
          "quiz": [
                {
                      "q": "In quale città europea visse a lungo Joyce insegnando inglese e stringendo amicizia con Italo Svevo?",
                      "o": [
                            "Parigi",
                            "Trieste",
                            "Roma",
                            "Zurigo"
                      ],
                      "a": 1
                },
                {
                      "q": "In quale arco temporale si svolgono le vicende dell' 'Ulisse' di Joyce?",
                      "o": [
                            "In una sola giornata (il 16 giugno 1904)",
                            "In dieci anni",
                            "In un mese",
                            "In un secolo"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il titolo del lungo monologo interiore senza punteggiatura che chiude l'Ulisse?",
                      "o": [
                            "Il monologo di Molly Bloom",
                            "Il discorso di Dedalus",
                            "La veglia di Finnegan",
                            "Il canto di Dublino"
                      ],
                      "a": 0
                },
                {
                      "q": "Come definisce Joyce il momento in cui un oggetto comune rivela all'improvviso il senso segreto della vita?",
                      "o": [
                            "Epifania",
                            "Catarsi",
                            "Metamorfosi",
                            "Dejà-vu"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il titolo della prima opera autobiografica che segue la crescita del giovane Stephen Dedalus?",
                      "o": [
                            "Ritratto dell'artista da giovane (Dedalus)",
                            "Gente di Dublino",
                            "Musica da camera",
                            "Finnegans Wake"
                      ],
                      "a": 0
                }
          ]
    },
    'mark-twain': {
          "topic": "Mark Twain",
          "impiccato": [
                {
                      "word": "SAWYER",
                      "hint": "Le avventure di Tom... e dell'amico Huckleberry Finn"
                },
                {
                      "word": "HUCKLEBERRY",
                      "hint": "... Finn, il ragazzo libero in fuga sul fiume"
                },
                {
                      "word": "MISSISSIPPI",
                      "hint": "Il grande fiume americano arteria dei battelli a vapore"
                },
                {
                      "word": "PILOTA",
                      "hint": "La sua professione sui battelli da cui trasse lo pseudonimo"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Il",
                            "segreto",
                            "per",
                            "andare",
                            "avanti",
                            "è",
                            "iniziare"
                      ],
                      "solution": "Il segreto per andare avanti è iniziare",
                      "source": "Aforismi"
                },
                {
                      "words": [
                            "Un",
                            "classico",
                            "è",
                            "qualcosa",
                            "che",
                            "tutti",
                            "vorrebbero",
                            "aver",
                            "letto",
                            "ma",
                            "nessuno",
                            "vuole",
                            "leggere"
                      ],
                      "solution": "Un classico è qualcosa che tutti vorrebbero aver letto ma nessuno vuole leggere",
                      "source": "Aforismi"
                }
          ],
          "cloze": [
                {
                      "text": "Tom Sawyer e l'amico Huckleberry Finn navigano su una zattera lungo il fiume ___ in cerca di libertà.",
                      "blanks": [
                            "Mississippi"
                      ],
                      "source": "Le avventure di Huckleberry Finn"
                },
                {
                      "text": "Il principe e il ___ è il celebre romanzo sullo scambio d'identità tra il principino Edoardo e il piccolo povero Tom Canty.",
                      "blanks": [
                            "povero"
                      ],
                      "source": "Il principe e il povero"
                }
          ],
          "versi": [
                {
                      "title": "Le avventure di Huckleberry Finn (La libertà sul fiume)",
                      "lines": [
                            "Non c'è niente di meglio di una zattera,",
                            "altrove ci si sente tutti stretti e soffocati,",
                            "ma su una zattera non è così. Sei libero,",
                            "e tranquillo e comodo sopra l'acqua del grande fiume."
                      ],
                      "hint": "La celebrazione della natura e della libertà contro le costrizioni della società civile."
                }
          ],
          "quiz": [
                {
                      "q": "Qual era il vero nome all'anagrafe di Mark Twain?",
                      "o": [
                            "Samuel Langhorne Clemens",
                            "Francis Scott Fitzgerald",
                            "Jack London",
                            "Herman Melville"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa significava l'espressione fluviale 'Mark Twain' usata dai battellieri del Mississippi?",
                      "o": [
                            "Due braccia di profondità (acque sicure per navigare)",
                            "Tempesta in arrivo",
                            "Fiume in secca",
                            "Piena del fiume"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi è lo schiavo fuggitivo che accompagna Huck Finn nel suo viaggio sulla zattera verso la libertà?",
                      "o": [
                            "Jim",
                            "Tom",
                            "Joe",
                            "Ben"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale romanzo un contemporaneo americano si risveglia alla corte medievale di Re Artù?",
                      "o": [
                            "Un americano alla corte di Re Artù",
                            "Il principe e il povero",
                            "Vita sul Mississippi",
                            "I pionieri"
                      ],
                      "a": 0
                },
                {
                      "q": "Come convince Tom Sawyer gli amici a dipingere la staccionata al posto suo?",
                      "o": [
                            "Facendo finta che sia un grandissimo e raro privilegio divertente",
                            "Pagandoli",
                            "Minacciandoli",
                            "Con una sfida a carte"
                      ],
                      "a": 0
                }
          ]
    },
    'anton-cechov': {
          "topic": "Anton Čechov",
          "impiccato": [
                {
                      "word": "CILIEGI",
                      "hint": "Il giardino dei... commedia sul tramonto della nobiltà"
                },
                {
                      "word": "VANJA",
                      "hint": "Zio... il dramma della vita sprecata e del rimpianto"
                },
                {
                      "word": "GABBIANO",
                      "hint": "Il... celebre dramma teatrale a San Pietroburgo"
                },
                {
                      "word": "MEDICO",
                      "hint": "La sua professione: 'La medicina è la mia moglie legittima, la letteratura l'amante'"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "La",
                            "brevità",
                            "è",
                            "sorella",
                            "del",
                            "talento"
                      ],
                      "solution": "La brevità è sorella del talento",
                      "source": "Lettere e aforismi"
                },
                {
                      "words": [
                            "Bisogna",
                            "lavorare",
                            "e",
                            "sopportare",
                            "con",
                            "pazienza",
                            "le",
                            "nostre",
                            "pene"
                      ],
                      "solution": "Bisogna lavorare e sopportare con pazienza le nostre pene",
                      "source": "Zio Vanja"
                }
          ],
          "cloze": [
                {
                      "text": "Nel dramma Il giardino dei ciliegi, la nobildonna Ranevskaja perde la proprietà che viene acquistata all'asta dal mercante ___ .",
                      "blanks": [
                            "Lopachin"
                      ],
                      "source": "Il giardino dei ciliegi"
                },
                {
                      "text": "Le tre sorelle Olga, Maša e Irina sognano per tutta la vita di abbandonare la noiosa provincia per trasferirsi a ___ .",
                      "blanks": [
                            "Mosca"
                      ],
                      "source": "Tre sorelle"
                }
          ],
          "versi": [
                {
                      "title": "Zio Vanja (Monologo finale di Sonja)",
                      "lines": [
                            "Che possiamo farci? Bisogna vivere!",
                            "Noi vivremo, caro zio Vanja. Vivremo una lunga fila di giorni.",
                            "Sopporteremo pazientemente le prove che ci manderà il destino;",
                            "e quando verrà la nostra ora, moriremo senza lamento e riposeremo."
                      ],
                      "hint": "Il toccante finale sulla rassegnazione e la dignità del lavoro umile quotidiano."
                }
          ],
          "quiz": [
                {
                      "q": "Quale celebre regola teatrale attribuita a Čechov riguarda la presenza di una pistola in scena?",
                      "o": [
                            "Se nel primo atto c'è una pistola appesa al muro, nel terzo atto deve sparare",
                            "Non bisogna mai mostrare armi",
                            "La pistola serve solo per far rumore",
                            "Le armi sono vietate a teatro"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale professione scientifica esercitò per tutta la vita Anton Čechov aiutando gratuitamente i contadini poveri?",
                      "o": [
                            "Medico",
                            "Avvocato",
                            "Ingegnere",
                            "Chimico"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale commedia racconta la vendita all'asta di una magnifica tenuta nobiliare per pagare i debiti?",
                      "o": [
                            "Il giardino dei ciliegi",
                            "Zio Vanja",
                            "Tre sorelle",
                            "Il gabbiano"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è la meta desiderata e mai raggiunta dalle protagoniste del dramma 'Tre sorelle'?",
                      "o": [
                            "A Mosca!",
                            "A Parigi!",
                            "A Roma!",
                            "A Londra!"
                      ],
                      "a": 0
                },
                {
                      "q": "A quale isola penitenziaria remota della Siberia Čechov compì un viaggio d'inchiesta nel 1890 descrivendo le condizioni dei detenuti?",
                      "o": [
                            "Isola di Sachalin",
                            "Kamčatka",
                            "Crimea",
                            "Caucaso"
                      ],
                      "a": 0
                }
          ]
    },
    'henrik-ibsen': {
          "topic": "Henrik Ibsen",
          "impiccato": [
                {
                      "word": "BAMBOLA",
                      "hint": "Casa di... il dramma della ribellione di Nora"
                },
                {
                      "word": "NORA",
                      "hint": "La protagonista che sbatte la porta per cercare la propria dignità"
                },
                {
                      "word": "SPETTRI",
                      "hint": "Il dramma sulle ipocrisie e i segreti familiari"
                },
                {
                      "word": "NORVEGIA",
                      "hint": "La patria del padre della drammaturgia moderna"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Prima",
                            "di",
                            "essere",
                            "moglie",
                            "e",
                            "madre",
                            "sono",
                            "un",
                            "essere",
                            "umano"
                      ],
                      "solution": "Prima di essere moglie e madre sono un essere umano",
                      "source": "Casa di bambola (Nora)"
                },
                {
                      "words": [
                            "L'uomo",
                            "più",
                            "forte",
                            "al",
                            "mondo",
                            "è",
                            "quello",
                            "che",
                            "è",
                            "più",
                            "solo"
                      ],
                      "solution": "L'uomo più forte al mondo è quello che è più solo",
                      "source": "Un nemico del popolo"
                }
          ],
          "cloze": [
                {
                      "text": "In Casa di bambola, Nora decide di lasciare il marito Torvald Helmer capendo di essere stata trattata per anni solo come una ___ .",
                      "blanks": [
                            "bambola"
                      ],
                      "source": "Casa di bambola"
                },
                {
                      "text": "Nel dramma Un nemico del popolo, il dottor Stockmann scopre che le acque delle terme cittadine sono ___ ma nessuno vuole ascoltarlo.",
                      "blanks": [
                            "inquinate"
                      ],
                      "source": "Un nemico del popolo"
                }
          ],
          "versi": [
                {
                      "title": "Casa di bambola (Atto III - L'addio di Nora)",
                      "lines": [
                            "«Devo badare a me stessa.",
                            "Devo cercare di diventare un essere umano anch'io,",
                            "o perlomeno devo tentare di diventarlo.",
                            "Credo che prima di tutto io sia un essere umano, al pari di te.»"
                      ],
                      "hint": "Il dialogo rivoluzionario che segna la nascita della coscienza moderna e dei diritti delle donne a teatro (1879)."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è il gesto finale rivoluzionario di Nora che chiude 'Casa di bambola'?",
                      "o": [
                            "Sbatte la porta di casa andandosene via per sempre",
                            "Abbraccia il marito",
                            "Si addormenta",
                            "Scrive una poesia"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale Paese scandinavo è nato Henrik Ibsen?",
                      "o": [
                            "Norvegia (Skien)",
                            "Svezia",
                            "Danimarca",
                            "Finlandia"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale dramma in versi racconta le avventure del sognatore e bugiardo Peer Gynt sulle musiche di Edvard Grieg?",
                      "o": [
                            "Peer Gynt",
                            "Brand",
                            "Hedda Gabler",
                            "Il costruttore Solness"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale tema scottante affronta 'Un nemico del popolo'?",
                      "o": [
                            "La corruzione politica ed economica che mette a tacere la verità scientifica sulla salute pubblica",
                            "Una guerra navale",
                            "La vita monastica",
                            "Una caccia al tesoro"
                      ],
                      "a": 0
                },
                {
                      "q": "Come viene considerato Henrik Ibsen nella storia del teatro mondiale?",
                      "o": [
                            "Il padre della drammaturgia moderna e del teatro borghese realistico",
                            "Un cantastorie medievale",
                            "Un mimo",
                            "Un coreografo"
                      ],
                      "a": 0
                }
          ]
    },
    'rainer-maria-rilke': {
          "topic": "Rainer Maria Rilke",
          "impiccato": [
                {
                      "word": "DUINO",
                      "hint": "Le Elegie di... composte nel castello sul golfo di Trieste"
                },
                {
                      "word": "ANGELO",
                      "hint": "La figura terribile e sublime delle Elegie"
                },
                {
                      "word": "PANTERA",
                      "hint": "La celebre poesia della fiera chiusa dietro le sbarre a Parigi"
                },
                {
                      "word": "ORFEO",
                      "hint": "I Sonetti a... dedicati al dio della poesia e della musica"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Ogni",
                            "angelo",
                            "è",
                            "terribile"
                      ],
                      "solution": "Ogni angelo è terribile",
                      "source": "Elegie duinesi (Elegia I)"
                },
                {
                      "words": [
                            "La",
                            "bellezza",
                            "è",
                            "solo",
                            "l'inizio",
                            "del",
                            "terrore",
                            "che",
                            "possiamo",
                            "sopportare"
                      ],
                      "solution": "La bellezza è solo l'inizio del terrore che possiamo sopportare",
                      "source": "Elegie duinesi"
                }
          ],
          "cloze": [
                {
                      "text": "Chi, se io gridassi, mi udrebbe dalle schiere degli ___ ? E se anche uno mi stringesse al cuore, morirei per la sua soverchia presenza.",
                      "blanks": [
                            "angeli"
                      ],
                      "source": "Elegie duinesi"
                },
                {
                      "text": "Nelle Lettere a un giovane ___ , Rilke consiglia di guardare dentro di sé per capire se la scrittura sia necessaria quanto respirare.",
                      "blanks": [
                            "poeta"
                      ],
                      "source": "Lettere a un giovane poeta"
                }
          ],
          "versi": [
                {
                      "title": "La Pantera (Jardin des Plantes - Parigi)",
                      "lines": [
                            "Il suo sguardo dal passare delle sbarre",
                            "è così stanco che più nulla trattiene.",
                            "Gli sembra che vi siano mille sbarre",
                            "e dietro mille sbarre nessun mondo."
                      ],
                      "hint": "I versi celeberrimi sull'animale prigioniero e il senso di vuoto dell'anima."
                }
          ],
          "quiz": [
                {
                      "q": "In quale suggestivo castello a picco sul mare vicino a Trieste Rilke iniziò a comporre le sue famose 'Elegie'?",
                      "o": [
                            "Castello di Duino",
                            "Castello di Miramare",
                            "Castello di San Giusto",
                            "Castel Sant'Angelo"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il titolo del celebre saggio epistolare contenente consigli preziosi per chi desidera scrivere?",
                      "o": [
                            "Lettere a un giovane poeta",
                            "Diario fiorentino",
                            "Il libro d'ore",
                            "Canti d'amore"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale sommo scultore francese fu ammirato da Rilke, che gli fece da segretario a Parigi?",
                      "o": [
                            "Auguste Rodin",
                            "Camille Claudel",
                            "Canova",
                            "Bernini"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale città della Boemia nacque Rainer Maria Rilke nel 1875?",
                      "o": [
                            "Praga",
                            "Vienna",
                            "Monaco",
                            "Salisburgo"
                      ],
                      "a": 0
                },
                {
                      "q": "A quale mitico cantore greco sono intitolati i 55 sonetti composti nel 1922?",
                      "o": [
                            "Orfeo (Sonetti a Orfeo)",
                            "Ulisse",
                            "Achille",
                            "Apollo"
                      ],
                      "a": 0
                }
          ]
    },
    'hermann-hesse': {
          "topic": "Hermann Hesse",
          "impiccato": [
                {
                      "word": "SIDDHARTHA",
                      "hint": "Il romanzo del viaggio spirituale in India verso l'illuminazione"
                },
                {
                      "word": "STEPPA",
                      "hint": "Il lupo della... la crisi esistenziale di Harry Haller"
                },
                {
                      "word": "BOCCADORO",
                      "hint": "Narciso e... l'amicizia tra lo spirito e l'arte"
                },
                {
                      "word": "NOBEL",
                      "hint": "Premio per la letteratura vinto nel 1946"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "La",
                            "saggezza",
                            "non",
                            "si",
                            "può",
                            "trasmettere",
                            "si",
                            "può",
                            "soltanto",
                            "vivere"
                      ],
                      "solution": "La saggezza non si può trasmettere si può soltanto vivere",
                      "source": "Siddhartha"
                },
                {
                      "words": [
                            "Volevo",
                            "soltanto",
                            "vivere",
                            "secondo",
                            "i",
                            "miei",
                            "impulsi",
                            "autentici"
                      ],
                      "solution": "Volevo soltanto vivere secondo i miei impulsi autentici",
                      "source": "Demian"
                }
          ],
          "cloze": [
                {
                      "text": "Siddhartha impara il segreto della saggezza e dell'armonia ascoltando la voce del ___ insieme al barcaiolo Vasudeva.",
                      "blanks": [
                            "fiume"
                      ],
                      "source": "Siddhartha"
                },
                {
                      "text": "Nel romanzo Narciso e Boccadoro, Narciso sceglie la vita monastica e contemplativa mentre Boccadoro sceglie il viaggio e l' ___ .",
                      "blanks": [
                            "arte"
                      ],
                      "source": "Narciso e Boccadoro"
                }
          ],
          "versi": [
                {
                      "title": "Siddhartha (Il canto del Fiume)",
                      "lines": [
                            "Ascoltava estatico il canto dell'acqua.",
                            "Il fiume cantava con molte voci, mille voci intrecciate insieme,",
                            "e quando non distingueva più le singole voci, il dolore dal piacere,",
                            "tutte le voci insieme formavano una sola parola: l'Om, la perfezione."
                      ],
                      "hint": "Il momento culminante dell'illuminazione spirituale e dell'unione con il cosmo."
                }
          ],
          "quiz": [
                {
                      "q": "In quale Paese asiatico è ambientata la ricerca spirituale del giovane 'Siddhartha'?",
                      "o": [
                            "In India",
                            "In Giappone",
                            "In Cina",
                            "In Egitto"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale anno Hermann Hesse ricevette il Premio Nobel per la Letteratura?",
                      "o": [
                            "1946",
                            "1950",
                            "1930",
                            "1960"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è l'animale simbolico associato alla solitudine selvaggia del protagonista Harry Haller?",
                      "o": [
                            "Il lupo (Il lupo della steppa)",
                            "L'aquila",
                            "Il leone",
                            "L'orso"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale capolavoro monumentale descrive l'ordine dei monaci-studiosi di Castalia e il gioco simbolico delle conoscenze?",
                      "o": [
                            "Il giuoco delle perle di vetro",
                            "Demian",
                            "Peter Camenzind",
                            "Sotto la ruota"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale cantone della Svizzera italiana (a Montagnola) Hesse visse per oltre quarant'anni fino alla morte?",
                      "o": [
                            "Canton Ticino",
                            "Ginevra",
                            "Zurigo",
                            "Berna"
                      ],
                      "a": 0
                }
          ]
    },
    'sigmund-freud': {
          "topic": "Sigmund Freud",
          "impiccato": [
                {
                      "word": "INCONSCIO",
                      "hint": "La parte sommersa e nascosta della nostra psiche"
                },
                {
                      "word": "SOGNI",
                      "hint": "L'interpretazione dei... (1899), la via regia per l'inconscio"
                },
                {
                      "word": "PSICOANALISI",
                      "hint": "La scienza rivoluzionaria della mente fondata a Vienna"
                },
                {
                      "word": "EDIPO",
                      "hint": "Il complesso psicologico teorizzato sulla tragedia greca"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "L'Io",
                            "non",
                            "è",
                            "padrone",
                            "in",
                            "casa",
                            "propria"
                      ],
                      "solution": "L'Io non è padrone in casa propria",
                      "source": "Introduzione alla psicoanalisi"
                },
                {
                      "words": [
                            "L'interpretazione",
                            "dei",
                            "sogni",
                            "è",
                            "la",
                            "via",
                            "regia",
                            "per",
                            "l'inconscio"
                      ],
                      "solution": "L'interpretazione dei sogni è la via regia per l'inconscio",
                      "source": "L'interpretazione dei sogni"
                }
          ],
          "cloze": [
                {
                      "text": "Secondo Freud, la psiche è composta da tre istanze fondamentali: l'Es (istinti), l'Io (coscienza) e il ___ (morale e divieti).",
                      "blanks": [
                            "Super-io"
                      ],
                      "source": "L'Io e l'Es"
                },
                {
                      "text": "Il lapsus ___ è un atto mancato involontario che rivela un pensiero o desiderio nascosto dell'inconscio.",
                      "blanks": [
                            "freudiano"
                      ],
                      "source": "Psicopatologia della vita quotidiana"
                }
          ],
          "versi": [
                {
                      "title": "L'interpretazione dei sogni (Epigrafe)",
                      "lines": [
                            "Flectere si nequeo superos,",
                            "Acheronta movebo.",
                            "Se non posso piegare gli dèi del cielo,",
                            "smuoverò le forze dell'Acheronte e dell'Inconscio."
                      ],
                      "hint": "La citazione virgiliana scelta da Freud per inaugurare l'esplorazione degli abissi della mente."
                }
          ],
          "quiz": [
                {
                      "q": "Qual è l'opera fondamentale pubblicata nel 1899 considerata la nascita ufficiale della Psicoanalisi?",
                      "o": [
                            "L'interpretazione dei sogni",
                            "Totem e tabù",
                            "Il disagio della civiltà",
                            "L'Io e l'Es"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale capitale europea visse e operò Sigmund Freud prima di fuggire a Londra nel 1938 per le leggi razziali?",
                      "o": [
                            "Vienna",
                            "Berlino",
                            "Parigi",
                            "Praga"
                      ],
                      "a": 0
                },
                {
                      "q": "Come definisce Freud la famosa metafora della mente umana paragonata al mare?",
                      "o": [
                            "La metafora dell'iceberg (la parte cosciente emersa è minima rispetto all'inconscio sommerso)",
                            "La metafora del vulcano",
                            "La nave nella tempesta",
                            "L'orologio"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale celebre 'complesso' infantile prende il nome dal re tragico greco che sposò la madre Giocasta?",
                      "o": [
                            "Complesso di Edipo",
                            "Complesso di Narciso",
                            "Complesso di Elettra",
                            "Complesso di Telemaco"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa sono i 'lapsus' e gli 'atti mancati' nella vita di tutti i giorni?",
                      "o": [
                            "Errori casuali privi di senso",
                            "Segnali spontanei attraverso cui l'inconscio rivela desideri o timori rimossi",
                            "Semplice stanchezza",
                            "Difetti di pronuncia"
                      ],
                      "a": 1
                }
          ]
    },
    'johann-wolfgang-goethe': {
          "topic": "Johann Wolfgang von Goethe",
          "impiccato": [
                {
                      "word": "FAUST",
                      "hint": "Il dramma dello scienziato che stringe un patto con Mefistofele"
                },
                {
                      "word": "WERTHER",
                      "hint": "I dolori del giovane... capolavoro del Romanticismo"
                },
                {
                      "word": "MEFISTOFELE",
                      "hint": "Il diavolo tentatore che promette l'eterna conoscenza"
                },
                {
                      "word": "WEIMAR",
                      "hint": "La corte ducale dove fu ministro e consigliere"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Fermati",
                            "attimo",
                            "sei",
                            "così",
                            "bello"
                      ],
                      "solution": "Fermati attimo sei così bello",
                      "source": "Faust"
                },
                {
                      "words": [
                            "Conosci",
                            "tu",
                            "il",
                            "paese",
                            "dove",
                            "fioriscono",
                            "i",
                            "limoni"
                      ],
                      "solution": "Conosci tu il paese dove fioriscono i limoni",
                      "source": "Viaggio in Italia (Mignon)"
                }
          ],
          "cloze": [
                {
                      "text": "Il dottor Faust vende la propria anima al diavolo ___ in cambio della giovinezza, dell'amore di Margherita e della conoscenza assoluta.",
                      "blanks": [
                            "Mefistofele"
                      ],
                      "source": "Faust"
                },
                {
                      "text": "Il giovane Werther si innamora perdutamente della bella ___ , che è però già promessa sposa ad Albert.",
                      "blanks": [
                            "Lotte"
                      ],
                      "source": "I dolori del giovane Werther"
                }
          ],
          "versi": [
                {
                      "title": "Faust (Il patto con Mefistofele)",
                      "lines": [
                            "Se mai dirò all'attimo:",
                            "«Fermati, sei così bello!»",
                            "allora tu potrai gettarmi in catene,",
                            "allora accetterò di perire per sempre!"
                      ],
                      "hint": "La celebre scommessa di Faust sulla continua ricerca e l'insoddisfazione umana."
                }
          ],
          "quiz": [
                {
                      "q": "Quale grandioso poema drammatico in due parti racconta la vicenda del sapiente Faust e del diavolo Mefistofele?",
                      "o": [
                            "Faust",
                            "I dolori del giovane Werther",
                            "Torquato Tasso",
                            "Elegie romane"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale romanzo epistolare giovanile del 1774 scatenò una vera e propria moda e passione in tutta Europa?",
                      "o": [
                            "I dolori del giovane Werther",
                            "Le affinità elettive",
                            "Gli anni di apprendistato di Wilhelm Meister",
                            "Reineke la volpe"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale celebre diario di viaggio Goethe descrive con entusiasmo l'arte, il paesaggio e la luce della penisola italiana?",
                      "o": [
                            "Viaggio in Italia (Italienische Reise)",
                            "Lettere da Roma",
                            "Canti d'Italia",
                            "Memorie di viaggio"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale movimento letterario e culturale preromantico tedesco 'Tempesta e Impeto' ebbe Goethe tra i suoi capifila?",
                      "o": [
                            "Sturm und Drang",
                            "Aufklärung",
                            "Biedermeier",
                            "Espressionismo"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale città della Turingia Goethe visse per oltre cinquant'anni fino alla morte nel 1832?",
                      "o": [
                            "Weimar",
                            "Francoforte",
                            "Berlino",
                            "Lipsia"
                      ],
                      "a": 0
                }
          ]
    },
    'albert-camus': {
          "topic": "Albert Camus",
          "impiccato": [
                {
                      "word": "STRANIERO",
                      "hint": "Lo... con il protagonista indifferente Meursault"
                },
                {
                      "word": "PESTE",
                      "hint": "La... romanzo allegorico sulla resistenza al male nella città di Orano"
                },
                {
                      "word": "SISIFO",
                      "hint": "Il mito di... e la filosofia dell'assurdo"
                },
                {
                      "word": "ALGERIA",
                      "hint": "La terra natale solare e aspra dove nacque lo scrittore"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Bisogna",
                            "immaginare",
                            "Sisifo",
                            "felice"
                      ],
                      "solution": "Bisogna immaginare Sisifo felice",
                      "source": "Il mito di Sisifo"
                },
                {
                      "words": [
                            "Oggi",
                            "la",
                            "mamma",
                            "è",
                            "morta",
                            "o",
                            "forse",
                            "ieri",
                            "non",
                            "so"
                      ],
                      "solution": "Oggi la mamma è morta o forse ieri non so",
                      "source": "Lo Straniero (Incipit)"
                }
          ],
          "cloze": [
                {
                      "text": "Nel romanzo La Peste, il dottor Bernard ___ cura instancabilmente i malati nella città algerina di Orano colpita dall'epidemia.",
                      "blanks": [
                            "Rieux"
                      ],
                      "source": "La Peste"
                },
                {
                      "text": "Meursault spara a un arabo sulla spiaggia accecato dal sole cocente nel romanzo Lo ___ .",
                      "blanks": [
                            "Straniero"
                      ],
                      "source": "Lo Straniero"
                }
          ],
          "versi": [
                {
                      "title": "Il mito di Sisifo (Finale)",
                      "lines": [
                            "Lascio Sisifo ai piedi della montagna.",
                            "Si ritrova sempre il proprio fardello.",
                            "Anche la lotta verso la cima basta a riempire il cuore di un uomo.",
                            "Bisogna immaginare Sisifo felice."
                      ],
                      "hint": "La risposta esistenzialista all'assurdo: dare senso alla vita attraverso la rivolta e la dignità."
                }
          ],
          "quiz": [
                {
                      "q": "Quale famoso incipit introduce l'indifferenza del protagonista de 'Lo Straniero'?",
                      "o": [
                            "Oggi la mamma è morta. O forse ieri, non so.",
                            "Chiamatemi Ismaele",
                            "Nel mezzo del cammin",
                            "C'era una volta un re"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale città algerina è ambientata la quarantena e la lotta contro l'epidemia ne 'La Peste'?",
                      "o": [
                            "Orano",
                            "Algeri",
                            "Costantina",
                            "Tunisi"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale anno Albert Camus ricevette il Premio Nobel per la Letteratura a soli 44 anni?",
                      "o": [
                            "1957",
                            "1945",
                            "1968",
                            "1938"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale figura mitologica condannata a spingere in eterno un macigno sulla cima della montagna simboleggia la condizione umana?",
                      "o": [
                            "Sisifo",
                            "Prometeo",
                            "Tantalo",
                            "Icaro"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale saggio politico del 1951 riflette sulla rivoluzione e sul rifiuto della tirannia totalitaria?",
                      "o": [
                            "L'uomo in rivolta",
                            "Il mito di Sisifo",
                            "Riflessioni sulla ghigliottina",
                            "L'estate"
                      ],
                      "a": 0
                }
          ]
    },
    'jk-rowling': {
          "topic": "J.K. Rowling",
          "impiccato": [
                {
                      "word": "POTTER",
                      "hint": "Harry... il maghetto con la cicatrice a forma di saetta"
                },
                {
                      "word": "HOGWARTS",
                      "hint": "La celebre scuola di magia e stregoneria"
                },
                {
                      "word": "GRIFONDORO",
                      "hint": "La casa dei coraggiosi guidata dalla professoressa McGranitt"
                },
                {
                      "word": "VOLDEMORT",
                      "hint": "Il Signore Oscuro 'Colui-Che-Non-Deve-Essere-Nominato'"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Non",
                            "esiste",
                            "bene",
                            "e",
                            "male",
                            "esiste",
                            "solo",
                            "il",
                            "potere"
                      ],
                      "solution": "Non esiste bene e male esiste solo il potere",
                      "source": "Harry Potter e la pietra filosofale"
                },
                {
                      "words": [
                            "Sono",
                            "le",
                            "nostre",
                            "scelte",
                            "che",
                            "dimostrano",
                            "chi",
                            "siamo",
                            "davvero"
                      ],
                      "solution": "Sono le nostre scelte che dimostrano chi siamo davvero",
                      "source": "Harry Potter e la camera dei segreti (Silente)"
                }
          ],
          "cloze": [
                {
                      "text": "Harry Potter scopre all'età di undici anni di essere un mago grazie al guardiacaccia Rubeus ___ .",
                      "blanks": [
                            "Hagrid"
                      ],
                      "source": "La pietra filosofale"
                },
                {
                      "text": "Il preside di Hogwarts Albus ___ guida la resistenza contro Lord Voldemort e i Mangiamorte.",
                      "blanks": [
                            "Silente"
                      ],
                      "source": "Harry Potter"
                }
          ],
          "versi": [
                {
                      "title": "Harry Potter e i Doni della Morte (La Storia dei Tre Fratelli)",
                      "lines": [
                            "C'erano una volta tre fratelli che viaggiavano lungo una strada deserta.",
                            "Giunsero a un fiume profondo e la Morte si sentì derubata.",
                            "Donò loro tre oggetti magici:",
                            "la Bacchetta di Sambuco, la Pietra della Resurrezione e il Mantello dell'Invisibilità."
                      ],
                      "hint": "La celebre favola di Beda il Bardo sui Doni della Morte."
                }
          ],
          "quiz": [
                {
                      "q": "Quanti romanzi compongono l'intera saga letteraria di Harry Potter?",
                      "o": [
                            "7 romanzi",
                            "5",
                            "8",
                            "10"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il nome della stazione londinese da cui parte il treno Espresso per Hogwarts dal Binario 9 ¾?",
                      "o": [
                            "King's Cross",
                            "Paddington",
                            "Waterloo",
                            "Victoria"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale sport magico su manici di scopa viene praticato dai maghi con la Pluffa e il Boccino d'Oro?",
                      "o": [
                            "Il Quidditch",
                            "Il Gobbiglie",
                            "Gli Scacchi dei Maghi",
                            "Il Volo Libero"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi sono i due inseparabili migliori amici di Harry Potter a Hogwarts?",
                      "o": [
                            "Ron Weasley e Hermione Granger",
                            "Draco Malfoy e Neville",
                            "Fred e George",
                            "Cedric e Luna"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale creatura alata maestosa metà cavallo e metà aquila Harry impara a cavalcare con Hagrid?",
                      "o": [
                            "L'Ippogrifo (Fierobecco)",
                            "La Fenice (Fanny)",
                            "Il Dragone Ungaro",
                            "Il Thestral"
                      ],
                      "a": 0
                }
          ]
    },
    'stephen-king': {
          "topic": "Stephen King",
          "impiccato": [
                {
                      "word": "SHINING",
                      "hint": "Il capolavoro dell'Overlook Hotel con Jack Torrance"
                },
                {
                      "word": "PENNYWISE",
                      "hint": "Il clown mutaforma terrore dei bambini di Derry (IT)"
                },
                {
                      "word": "MISERY",
                      "hint": "Il romanzo dello scrittore prigioniero dell'infermiera Annie Wilkes"
                },
                {
                      "word": "MAINE",
                      "hint": "Lo stato americano dove sono ambientate quasi tutte le sue storie"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "I",
                            "mostri",
                            "sono",
                            "reali",
                            "e",
                            "vivono",
                            "dentro",
                            "di",
                            "noi"
                      ],
                      "solution": "I mostri sono reali e vivono dentro di noi",
                      "source": "Shining"
                },
                {
                      "words": [
                            "Galleggiano",
                            "tutti",
                            "qui",
                            "sotto",
                            "e",
                            "galleggerai",
                            "anche",
                            "tu"
                      ],
                      "solution": "Galleggiano tutti qui sotto e galleggerai anche tu",
                      "source": "IT (Pennywise)"
                }
          ],
          "cloze": [
                {
                      "text": "Nel romanzo IT, il Club dei Perdenti affronta la malefica entità che si manifesta nelle fogne della cittadina di ___ .",
                      "blanks": [
                            "Derry"
                      ],
                      "source": "IT"
                },
                {
                      "text": "Il piccolo Danny Torrance possiede la 'luccicanza', un potere telepatico speciale, nel romanzo ___ .",
                      "blanks": [
                            "Shining"
                      ],
                      "source": "Shining"
                }
          ],
          "versi": [
                {
                      "title": "IT (L'incontro nella fognatura)",
                      "lines": [
                            "La pioggia scrosciava nei tombini della strada deserta.",
                            "Dall'oscurità della grata spuntavano due occhi gialli e luminosi.",
                            "«Vuoi un palloncino, Georgie?», chiese il clown con un sorriso.",
                            "«Galleggiano, Georgie... galleggiano tutti qui sotto!»"
                      ],
                      "hint": "La celebre scena iniziale con la barchetta di carta che segna l'inizio del capolavoro horror."
                }
          ],
          "quiz": [
                {
                      "q": "Come viene universalmente soprannominato Stephen King dai suoi milioni di lettori?",
                      "o": [
                            "Il Re del Brivido (The King of Horror)",
                            "Il Maestro del Giallo",
                            "Il Poeta della Notte",
                            "Il Mago di Bangor"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il titolo del suo primo romanzo pubblicato nel 1974 sulla ragazza dotata di poteri telecinetici?",
                      "o": [
                            "Carrie",
                            "Le notti di Salem",
                            "Shining",
                            "Cujo"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale isolato albergo di montagna sulle Montagne Rocciose è ambientato 'Shining'?",
                      "o": [
                            "Overlook Hotel",
                            "Bates Motel",
                            "Grand Hotel",
                            "Hotel California"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale romanzo narra la prigionia dello scrittore Paul Sheldon sequestrato dalla sua fanatica lettrice numero uno Annie Wilkes?",
                      "o": [
                            "Misery",
                            "Christine",
                            "L'ombra dello scorpione",
                            "Pet Sematary"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale celebre racconto carcerario di King ha ispirato il pluripremiato film 'Le ali della libertà'?",
                      "o": [
                            "Rita Hayworth e la redenzione di Shawshank",
                            "Il miglio verde",
                            "Stand by Me",
                            "I figli del grano"
                      ],
                      "a": 0
                }
          ]
    },
    'haruki-murakami': {
          "topic": "Haruki Murakami",
          "impiccato": [
                {
                      "word": "NORWEGIAN",
                      "hint": "... Wood, il romanzo della nostalgia e della giovinezza"
                },
                {
                      "word": "KAFKA",
                      "hint": "... sulla spiaggia, con il ragazzo in fuga e i gatti parlanti"
                },
                {
                      "word": "JAZZ",
                      "hint": "La grande passione musicale che gestì anche come gestore di club a Tokyo"
                },
                {
                      "word": "SURREALE",
                      "hint": "L'atmosfera sospesa tra realtà e mondi paralleli"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Se",
                            "leggi",
                            "solo",
                            "libri",
                            "che",
                            "tutti",
                            "leggono",
                            "penserai",
                            "come",
                            "tutti"
                      ],
                      "solution": "Se leggi solo libri che tutti leggono penserai come tutti",
                      "source": "Norwegian Wood"
                },
                {
                      "words": [
                            "Il",
                            "destino",
                            "è",
                            "come",
                            "una",
                            "tempesta",
                            "di",
                            "sabbia",
                            "che",
                            "muta",
                            "incessantemente"
                      ],
                      "solution": "Il destino è come una tempesta di sabbia che muta incessantemente",
                      "source": "Kafka sulla spiaggia"
                }
          ],
          "cloze": [
                {
                      "text": "Toru Watanabe ricorda gli amori giovanili per Naoko e Midori sulle note della canzone dei Beatles intitolata Norwegian ___ .",
                      "blanks": [
                            "Wood"
                      ],
                      "source": "Norwegian Wood"
                },
                {
                      "text": "Nel romanzo Kafka sulla spiaggia, il vecchio Nakata ha la straordinaria capacità di parlare con i ___ .",
                      "blanks": [
                            "gatti"
                      ],
                      "source": "Kafka sulla spiaggia"
                }
          ],
          "versi": [
                {
                      "title": "Kafka sulla spiaggia (La tempesta)",
                      "lines": [
                            "A volte il destino somiglia a una tempesta di sabbia che muta continuamente direzione.",
                            "E una volta che la tempesta sarà finita,",
                            "probabilmente non saprai neanche tu come hai fatto ad attraversarla e a uscirne vivo.",
                            "Ma su un punto non c'è dubbio: sarai una persona diversa."
                      ],
                      "hint": "La potente riflessione sulla crescita interiore e le prove della vita."
                }
          ],
          "quiz": [
                {
                      "q": "Quale celebre canzone dei Beatles dà il titolo al romanzo più famoso di Haruki Murakami?",
                      "o": [
                            "Norwegian Wood",
                            "Yesterday",
                            "Hey Jude",
                            "Let It Be"
                      ],
                      "a": 0
                },
                {
                      "q": "In quale metropoli giapponese sono ambientati gran parte dei romanzi di Murakami?",
                      "o": [
                            "Tokyo",
                            "Kyoto",
                            "Osaka",
                            "Hiroshima"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale sport di resistenza Murakami pratica costantemente e ha raccontato nel libro 'L'arte di correre'?",
                      "o": [
                            "La maratona e il mezzofondo",
                            "Il nuoto",
                            "Il ciclismo",
                            "Il karate"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale monumentale trilogia ambientata in un 1984 parallelo con due lune in cielo è stata pubblicata nel 2009?",
                      "o": [
                            "1Q84",
                            "L'assassinio del commendatore",
                            "Dance Dance Dance",
                            "Nel segno della pecora"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale locale gestiva Murakami a Tokyo con la moglie prima di diventare uno scrittore a tempo pieno?",
                      "o": [
                            "Un jazz bar (Peter Cat)",
                            "Una libreria antiquaria",
                            "Una pasticceria",
                            "Un cinema"
                      ],
                      "a": 0
                }
          ]
    },
    'paulo-coelho': {
          "topic": "Paulo Coelho",
          "impiccato": [
                {
                      "word": "ALCHIMISTA",
                      "hint": "Il romanzo del pastorello Santiago alla ricerca del tesoro"
                },
                {
                      "word": "LEGGENDA",
                      "hint": "La... personale che ciascun uomo è chiamato a compiere"
                },
                {
                      "word": "PIRAMIDI",
                      "hint": "Il luogo sognato in Egitto dove si trova il tesoro"
                },
                {
                      "word": "SANTIAGO",
                      "hint": "Il pastorello andaluso protagonista del viaggio"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Quando",
                            "desideri",
                            "davvero",
                            "qualcosa",
                            "tutto",
                            "l'universo",
                            "cospira",
                            "per",
                            "aiutarti"
                      ],
                      "solution": "Quando desideri davvero qualcosa tutto l'universo cospira per aiutarti",
                      "source": "L'Alchimista"
                },
                {
                      "words": [
                            "C'è",
                            "una",
                            "sola",
                            "cosa",
                            "che",
                            "rende",
                            "un",
                            "sogno",
                            "impossibile",
                            "la",
                            "paura",
                            "di",
                            "fallire"
                      ],
                      "solution": "C'è una sola cosa che rende un sogno impossibile la paura di fallire",
                      "source": "L'Alchimista"
                }
          ],
          "cloze": [
                {
                      "text": "Quando desideri qualcosa, tutto l'universo cospira affinché tu realizzi il tuo ___ : il messaggio centrale de L'Alchimista.",
                      "blanks": [
                            "desiderio"
                      ],
                      "source": "L'Alchimista"
                },
                {
                      "text": "Il pastore andaluso Santiago attraversa il deserto del Sahara guidato dal saggio re di Salem e dall' ___ .",
                      "blanks": [
                            "Alchimista"
                      ],
                      "source": "L'Alchimista"
                }
          ],
          "versi": [
                {
                      "title": "L'Alchimista (Il linguaggio del Mondo)",
                      "lines": [
                            "«Il segreto della felicità consiste nel guardare tutte le meraviglie del mondo",
                            "senza mai dimenticare le due gocce d'olio sul cucchiaio.»",
                            "Ascolta il tuo cuore.",
                            "Esso conosce tutte le cose, perché è nato dall'Anima del Mondo."
                      ],
                      "hint": "L'insegnamento universale sull'equilibrio tra l'esplorazione del mondo e la propria identità."
                }
          ],
          "quiz": [
                {
                      "q": "In quale Paese sudamericano è nato lo scrittore Paulo Coelho?",
                      "o": [
                            "Brasile (Rio de Janeiro)",
                            "Argentina",
                            "Portogallo",
                            "Cile"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il mestiere iniziale del protagonista Santiago all'inizio de 'L'Alchimista'?",
                      "o": [
                            "Pastore di pecore in Andalusia",
                            "Marinaio",
                            "Fabbro",
                            "Monaco"
                      ],
                      "a": 0
                },
                {
                      "q": "Dove si trova alla fine il vero tesoro cercato per tutto il mondo da Santiago?",
                      "o": [
                            "Sotto le radici del sicomoro della vecchia chiesa abbandonata da dove era partito",
                            "Dentro la Grande Piramide",
                            "In fondo al mare",
                            "Nel palazzo del re"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale celebre cammino di pellegrinaggio spirituale in Spagna ispirò il suo primo fortunato libro nel 1987?",
                      "o": [
                            "Il Cammino di Santiago di Compostela",
                            "La Via Francigena",
                            "Il Cammino di San Francesco",
                            "La Via della Seta"
                      ],
                      "a": 0
                },
                {
                      "q": "Cosa intende Coelho con il concetto di 'Leggenda Personale'?",
                      "o": [
                            "Il destino autentico e il sogno che ciascuno è chiamato a realizzare nella vita",
                            "Una favola per bambini",
                            "Un albero genealogico",
                            "Una medaglia al valore"
                      ],
                      "a": 0
                }
          ]
    },
    'agatha-christie': {
          "topic": "Agatha Christie",
          "impiccato": [
                {
                      "word": "POIROT",
                      "hint": "Hercule... il geniale investigatore belga dalle cellule grigie"
                },
                {
                      "word": "MARPLE",
                      "hint": "Miss... l'anziana e arzilla zitella di St. Mary Mead"
                },
                {
                      "word": "ORIENT",
                      "hint": "Assassinio sull'... Express sul celebre treno bloccato dalla neve"
                },
                {
                      "word": "INDIANI",
                      "hint": "Dieci piccoli... il giallo perfetto a Nigger Island"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "Un",
                            "indizio",
                            "è",
                            "un",
                            "indizio",
                            "due",
                            "sono",
                            "una",
                            "coincidenza",
                            "tre",
                            "sono",
                            "una",
                            "prova"
                      ],
                      "solution": "Un indizio è un indizio due sono una coincidenza tre sono una prova",
                      "source": "Poirot a Styles Court"
                },
                {
                      "words": [
                            "Le",
                            "cellule",
                            "grigie",
                            "del",
                            "mio",
                            "cervello",
                            "risolvono",
                            "ogni",
                            "mistero"
                      ],
                      "solution": "Le cellule grigie del mio cervello risolvono ogni mistero",
                      "source": "Hercule Poirot"
                }
          ],
          "cloze": [
                {
                      "text": "Nel capolavoro Dieci piccoli indiani, dieci persone isolate su un'isola vengono uccise una dopo l'altra seguendo una filastrocca per ___ .",
                      "blanks": [
                            "bambini"
                      ],
                      "source": "Dieci piccoli indiani"
                },
                {
                      "text": "Hercule Poirot risolve il caso dell'assassinio del ricco Ratchett a bordo del treno Orient ___ .",
                      "blanks": [
                            "Express"
                      ],
                      "source": "Assassinio sull'Orient Express"
                }
          ],
          "versi": [
                {
                      "title": "Dieci piccoli indiani (La filastrocca)",
                      "lines": [
                            "Dieci poveri negretti se ne andarono a cenar:",
                            "uno si strozzò, e rimasero in nove.",
                            "Nove poveri negretti fino a tardi vegliaron:",
                            "uno cadde addormentato, e otto ne restaron."
                      ],
                      "hint": "La macabra filastrocca che scandisce gli omicidi nell'isola senza via di fuga."
                }
          ],
          "quiz": [
                {
                      "q": "Come viene universalmente definita Agatha Christie nella storia della letteratura mondiale?",
                      "o": [
                            "La Regina del Giallo (The Queen of Crime)",
                            "La Dama Nera",
                            "La Signora del Thriller",
                            "La Contessa del Brivido"
                      ],
                      "a": 0
                },
                {
                      "q": "Di quale nazionalità è il celebre detective dai baffi curatissimi Hercule Poirot?",
                      "o": [
                            "Belga",
                            "Francese",
                            "Inglese",
                            "Svizzero"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale geniale commedia teatrale di Agatha Christie detiene il record mondiale assoluto di repliche ininterrotte a Londra dal 1952?",
                      "o": [
                            "Trappola per topi (The Mousetrap)",
                            "Testimone d'accusa",
                            "Caffè nero",
                            "Delitto sul Nilo"
                      ],
                      "a": 0
                },
                {
                      "q": "Qual è il nome del tranquillo villaggio di campagna inglese dove vive Miss Jane Marple?",
                      "o": [
                            "St. Mary Mead",
                            "Baker Street",
                            "Derry",
                            "Hogsmeade"
                      ],
                      "a": 0
                },
                {
                      "q": "Chi è l'assassino nel celebre romanzo 'Assassinio sull'Orient Express'?",
                      "o": [
                            "Tutti i dodici passeggeri del vagone insieme",
                            "Il controllore",
                            "Il cuoco",
                            "Nessuno (fu un suicidio)"
                      ],
                      "a": 0
                }
          ]
    },
    'emily-dickinson': {
          "topic": "Emily Dickinson",
          "impiccato": [
                {
                      "word": "AMHERST",
                      "hint": "Il paese del Massachusetts dove visse sempre reclusa nella sua stanza"
                },
                {
                      "word": "SPERANZA",
                      "hint": "La... è quella cosa con le piume che si posa sull'anima"
                },
                {
                      "word": "BIANCO",
                      "hint": "Il colore dell'abito che indossava sempre negli ultimi anni"
                },
                {
                      "word": "NATURA",
                      "hint": "Il tema dei fiori, degli uccelli e dell'infinito interiore"
                }
          ],
          "puzzle": [
                {
                      "words": [
                            "La",
                            "speranza",
                            "è",
                            "quella",
                            "cosa",
                            "con",
                            "le",
                            "piume"
                      ],
                      "solution": "La speranza è quella cosa con le piume",
                      "source": "Poesie"
                },
                {
                      "words": [
                            "Non",
                            "c'è",
                            "un",
                            "vascello",
                            "veloce",
                            "come",
                            "un",
                            "libro",
                            "per",
                            "portarci",
                            "in",
                            "terre",
                            "lontane"
                      ],
                      "solution": "Non c'è un vascello veloce come un libro per portarci in terre lontane",
                      "source": "Poesie"
                }
          ],
          "cloze": [
                {
                      "text": "La speranza è quella cosa piumata che si posa sull' ___ e canta melodie senza parole e non si ferma mai.",
                      "blanks": [
                            "anima"
                      ],
                      "source": "Poesie"
                },
                {
                      "text": "Emily Dickinson visse quasi tutta la vita nella casa paterna di Amherst vestita di ___ , affidando le sue poesie a piccoli fascicoli cuciti a mano.",
                      "blanks": [
                            "bianco"
                      ],
                      "source": "Biografia"
                }
          ],
          "versi": [
                {
                      "title": "La speranza è quella cosa con le piume",
                      "lines": [
                            "La Speranza è quella cosa piumata",
                            "che si posa sull'anima,",
                            "e canta melodie senza parole,",
                            "e non si zittisce mai."
                      ],
                      "hint": "Una delle poesie più luminose e amate della poetessa americana."
                }
          ],
          "quiz": [
                {
                      "q": "In quale stato americano della Nuova Inghilterra Emily Dickinson visse quasi sempre ritirata nella sua stanza?",
                      "o": [
                            "Massachusetts (Amherst)",
                            "New York",
                            "California",
                            "Texas"
                      ],
                      "a": 0
                },
                {
                      "q": "Quante poesie scrisse in segreto la Dickinson, scoperte dalla sorella Lavinia solo dopo la sua morte?",
                      "o": [
                            "Circa 1800 componimenti",
                            "100",
                            "50",
                            "300"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale caratteristico segno di interpunzione ritmico ricorre costantemente nei manoscritti della Dickinson?",
                      "o": [
                            "Il trattino (—)",
                            "Il punto esclamativo",
                            "Le parentesi tonde",
                            "I punti di sospensione"
                      ],
                      "a": 0
                },
                {
                      "q": "Quale abito di colore simbolico Emily scelse di indossare negli ultimi decenni della sua vita solitaria?",
                      "o": [
                            "Un abito completamente bianco",
                            "Un abito nero",
                            "Un mantello rosso",
                            "Un vestito verde"
                      ],
                      "a": 0
                },
                {
                      "q": "A cosa paragona un libro in una celeberrima poesia sulla magia della lettura?",
                      "o": [
                            "A un vascello veloce che porta in terre lontane senza pagare il passaggio",
                            "A una chiave d'oro",
                            "A una lanterna magica",
                            "A un cavallo alato"
                      ],
                      "a": 0
                }
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

      // Chiudi eventuali modali intermedi rimasti aperti
      const authorModal = document.getElementById('scheda-autore-modal');
      if (authorModal) authorModal.style.display = 'none';
      const teamSelector = document.getElementById('team-selector-modal');
      if (teamSelector) teamSelector.style.display = 'none';

      const container = document.getElementById('minigame-container');
      const content = document.getElementById('minigame-content');
      const title = document.getElementById('minigame-title');
      if (!container || !content) return;

      // Blocca lo scroll della pagina sottostante
      document.body.style.overflow = 'hidden';

      content.innerHTML = '';
      container.style.display = 'flex';
      currentMinigame = type;

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
                <div class="minigame-maestro-layout" style="padding: 15px; text-align:center;">
                    <img src="assets/maestro_success.png" alt="Il Maestro" class="minigame-maestro-img">
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
      
      // Sblocca lo scroll della pagina
      document.body.style.overflow = '';
      
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
            <div class="minigame-maestro-layout">
                <img src="assets/maestro_quiz.png" alt="Il Maestro" class="minigame-maestro-img">
                <div class="minigame-maestro-content">
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
            <div class="minigame-maestro-layout" style="padding:15px; text-align:center;">
                <img src="assets/maestro_success.png" alt="Il Maestro" class="minigame-maestro-img">
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
        <div class="minigame-impiccato-grid">
          <div class="minigame-gallows-box">
            <svg width="140" height="140" viewBox="0 0 150 150" style="display:block; margin:0 auto;">${svg}</svg>
            <div style="margin-top:8px; font-size:0.85rem; font-weight:bold; color:${s.wrongGuesses >= 5 ? '#ef4444' : '#f5c53c'};">Errori: ${s.wrongGuesses}/${s.maxWrong}</div>
          </div>
          <div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(141,160,63,0.3); border-radius:10px; padding:10px 14px; margin-bottom:12px; font-size:0.9rem; color:#f5f5f0; display:flex; justify-content:space-between; align-items:center;">
              <div>💡 Indizio: <em>${s.hint}</em></div>
              ${(window.LiveEditor && typeof window.LiveEditor.renderBtn === 'function') ? window.LiveEditor.renderBtn(`impiccato_${currentMissionId || 'general'}`, { word: s.word, hint: s.hint, text: s.hint }) : ''}
            </div>
            <div style="text-align:center; padding:12px 0; letter-spacing:4px; margin-bottom:6px;">${wordDisplay}</div>
            ${wrongLetters.length ? `<div style="font-size:0.82rem; color:#ef4444; margin-bottom:6px; text-align:center; font-weight:600;">Lettere errate: ${wrongLetters.join(', ')}</div>` : ''}
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
        <div class="minigame-maestro-layout">
          <img src="assets/maestro_quiz.png" alt="Il Maestro" class="minigame-maestro-img">
          <div class="minigame-maestro-content">
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
        <div class="minigame-maestro-layout">
          <img src="assets/maestro_thinking.png" alt="Il Maestro" class="minigame-maestro-img">
          <div class="minigame-maestro-content">
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
        <div class="minigame-versi-grid">
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
