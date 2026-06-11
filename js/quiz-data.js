// Banca dati per i Giochi LIM - Fantaletteratura
// Questo file contiene domande, parole per impiccato, puzzle e testi a completamento

window.AUTHOR_MOVEMENTS = {
    // Terze (Contemporanea Italiani)
    'a1': 'Preromanticismo',      // Foscolo
    'a2': 'Romanticismo',         // Leopardi
    'a3': 'Romanticismo',         // Manzoni
    'a4': 'Classicismo',          // Carducci
    'a5': 'Verismo',              // Verga
    'a6': 'Decadentismo',         // Pascoli
    'a7': 'Decadentismo',         // D'Annunzio
    'a8': 'Modernismo',           // Pirandello
    'a9': 'Futurismo',            // Marinetti
    'a10': 'Ermetismo',           // Ungaretti
    'a11': 'Ermetismo',           // Montale
    'a12': 'Ermetismo',           // Quasimodo
    'a13': 'Modernismo',          // Svevo
    'a14': 'Neorealismo',         // Calvino
    'a15': 'Realismo',            // Morante
    'a16': 'Neorealismo',         // Levi
    'a17': 'Neorealismo',         // Pavese
    'a18': 'Realismo',            // Moravia
    'a19': 'Neorealismo',         // Fenoglio
    'a20': 'Realismo',            // Pasolini
    'a21': 'Realismo',            // Ginzburg
    'a22': 'Realismo',            // Sciascia
    'a23': 'Poesia Contemporanea', // Merini
    'a24': 'Poesia Contemporanea', // Saba

    // Seconde (Moderna)
    'primi-documenti': 'Le Origini',
    'scuola-siciliana': 'Poesia Cortese',
    'francesco-assisi': 'Letteratura Religiosa',
    'francesco-petrarca': 'Umanesimo',
    'lorenzo-medici': 'Umanesimo',
    'cesare-beccaria': 'Illuminismo',
    'dante-alighieri-sec': 'Dolce Stil Novo',
    'ludovico-ariosto': 'Rinascimento',
    'giovanni-boccaccio': 'Umanesimo',
    'niccolo-machiavelli': 'Rinascimento',
    'galileo-galilei': 'Barocco',
    'giuseppe-parini': 'Illuminismo',
    'carlo-goldoni': 'Illuminismo',
    'commedia-arte': 'Barocco',
    'torquato-tasso': 'Manierismo',
    'cecco-angiolieri': 'Poesia Comico-Realistica',
    'iacopone-todi': 'Letteratura Religiosa',

    // Avanzato (Internazionali)
    'victor-hugo': 'Romanticismo',
    'gabriel-garcia-marquez': 'Realismo Magico',
    'edgar-allan-poe': 'Decadentismo / Gotico',
    'fedor-dostoevskij': 'Realismo / Esistenzialismo',
    'lev-tolstoj': 'Realismo / Esistenzialismo',
    'george-orwell': 'Distopia / Novecento',
    'ernest-hemingway': 'Modernismo',
    'charles-dickens': 'Realismo',
    'herman-melville': 'Romanticismo',
    'oscar-wilde': 'Decadentismo',
    'mary-shelley': 'Decadentismo / Gotico',
    'charles-baudelaire': 'Decadentismo',
    'virginia-woolf': 'Modernismo',
    'franz-kafka': 'Modernismo',
    'jorge-luis-borges': 'Realismo Magico',
    'william-shakespeare': 'Rinascimento',
    'marcel-proust': 'Modernismo',
    'james-joyce': 'Modernismo',
    'pablo-neruda': 'Poesia Contemporanea',
    'emily-dickinson': 'Romanticismo',
    'walt-whitman': 'Romanticismo',
    'albert-camus': 'Realismo / Esistenzialismo',
    'jean-paul-sartre': 'Realismo / Esistenzialismo',
    'gustave-flaubert': 'Realismo',
    'emile-zola': 'Realismo',
    'arthur-conan-doyle': 'Decadentismo / Gotico',
    'lewis-carroll': 'Modernismo',
    'h-p-lovecraft': 'Decadentismo / Gotico',
    'jane-austen': 'Romanticismo',
    'miguel-cervantes': 'Rinascimento',
    'torquato-tasso-int': 'Manierismo'
};

window.QUIZ_QUESTIONS = [
    // Terze (Contemporanea Italiani)
    {
        id: 'q1',
        campionato: 'terze',
        authorId: 'a1',
        movement: 'Preromanticismo',
        question: "In quale celebre opera epistolare Ugo Foscolo racconta la tragica delusione patriottica ed amorosa del protagonista?",
        options: ["Le ultime lettere di Jacopo Ortis", "Dei Sepolcri", "Le Grazie", "Odi"],
        correct: 0
    },
    {
        id: 'q2',
        campionato: 'terze',
        authorId: 'a2',
        movement: 'Romanticismo',
        question: "Quale celebre componimento di Leopardi si conclude con la celebre frase 'e il naufragar m'è dolce in questo mare'?",
        options: ["A Silvia", "Canto notturno", "L'Infinito", "La ginestra"],
        correct: 2
    },
    {
        id: 'q3',
        campionato: 'terze',
        authorId: 'a3',
        movement: 'Romanticismo',
        question: "Quale di queste opere di Alessandro Manzoni è una tragedia teatrale?",
        options: ["Adelchi", "I promessi sposi", "Il cinque maggio", "Marzo 1821"],
        correct: 0
    },
    {
        id: 'q4',
        campionato: 'terze',
        authorId: 'a5',
        movement: 'Verismo',
        question: "Qual è l'opera considerata il capolavoro del Verismo di Giovanni Verga, che narra le vicende dei Toscano?",
        options: ["Mastro-don Gesualdo", "I Malavoglia", "Nedda", "Vita dei campi"],
        correct: 1
    },
    {
        id: 'q5',
        campionato: 'terze',
        authorId: 'a10',
        movement: 'Ermetismo',
        question: "Quale poesia di Ungaretti, scritta in trincea nel 1918, recita interamente 'Si sta come / d'autunno / sugli alberi / le foglie'?",
        options: ["Veglia", "Soldati", "Fratelli", "Mattina"],
        correct: 1
    },
    {
        id: 'q6',
        campionato: 'terze',
        authorId: 'a11',
        movement: 'Ermetismo',
        question: "In quale raccolta montaliana compare per la prima volta la poesia 'Non chiederci la parola'?",
        options: ["Le occasioni", "La bufera e altro", "Satura", "Ossi di seppia"],
        correct: 3
    },
    {
        id: 'q7',
        campionato: 'terze',
        authorId: 'a14',
        movement: 'Neorealismo',
        question: "Quale romanzo di Italo Calvino fa parte della trilogia 'I nostri antenati'?",
        options: ["Il barone rampante", "Se una notte d'inverno un viaggiatore", "Le città invisibili", "Il sentiero dei nidi di ragno"],
        correct: 0
    },
    {
        id: 'q8',
        campionato: 'terze',
        authorId: 'a24',
        movement: 'Poesia Contemporanea',
        question: "Qual è il titolo della raccolta poetica monumentale che racchiude tutta la produzione in versi di Umberto Saba?",
        options: ["Il Canzoniere", "Canti", "Ossi di seppia", "Allegria di naufragi"],
        correct: 0
    },
    {
        id: 'q9',
        campionato: 'terze',
        authorId: 'a4',
        movement: 'Classicismo',
        question: "Quale di queste raccolte poetiche di Giosuè Carducci contiene la lirica 'San Martino'?",
        options: ["Odi barbare", "Rime nuove", "Juvenilia", "Levia Gravia"],
        correct: 1
    },
    {
        id: 'q10',
        campionato: 'terze',
        authorId: 'a6',
        movement: 'Decadentismo',
        question: "In quale raccolta pascoliana, intitolata come le tamerici, compare la poesia 'Lavandare'?",
        options: ["Myricae", "Canti di Castelvecchio", "Poemi conviviali", "Odi e inni"],
        correct: 0
    },
    {
        id: 'q11',
        campionato: 'terze',
        authorId: 'a7',
        movement: 'Decadentismo',
        question: "Quale celebre romanzo di Gabriele D'Annunzio, pubblicato nel 1889, narra le vicende dell'esteta Andrea Sperelli?",
        options: ["Il fuoco", "L'innocente", "Il piacere", "Trionfo della morte"],
        correct: 2
    },
    {
        id: 'q12',
        campionato: 'terze',
        authorId: 'a8',
        movement: 'Modernismo',
        question: "Quale romanzo di Luigi Pirandello narra la vicenda di Vitangelo Moscarda, che scopre di avere il naso leggermente storto?",
        options: ["Il fu Mattia Pascal", "Quaderni di Serafino Gubbio operatore", "I vecchi e i giovani", "Uno, nessuno e centomila"],
        correct: 3
    },
    {
        id: 'q13',
        campionato: 'terze',
        authorId: 'a9',
        movement: 'Futurismo',
        question: "Nel 1909 Filippo Tommaso Marinetti pubblicò il documento di fondazione di quale avanguardia artistica e letteraria?",
        options: ["Ermetismo", "Futurismo", "Crepuscolarismo", "Neorealismo"],
        correct: 1
    },
    {
        id: 'q14',
        campionato: 'terze',
        authorId: 'a12',
        movement: 'Ermetismo',
        question: "In quale città della Sicilia nacque il poeta premio Nobel Salvatore Quasimodo?",
        options: ["Modica", "Palermo", "Catania", "Siracusa"],
        correct: 0
    },
    {
        id: 'q15',
        campionato: 'terze',
        authorId: 'a15',
        movement: 'Realismo',
        question: "Quale celebre romanzo di Elsa Morante racconta la crescita e la giovinezza di un ragazzo sull'isola di Procida?",
        options: ["La Storia", "Menzogna e sortilegio", "L'isola di Arturo", "Aracoeli"],
        correct: 2
    },
    {
        id: 'q16',
        campionato: 'terze',
        authorId: 'a16',
        movement: 'Neorealismo',
        question: "In quale suo celebre libro di memorie Primo Levi racconta la drammatica esperienza della deportazione nel campo di sterminio di Auschwitz?",
        options: ["La tregua", "Se questo è un uomo", "Il sistema periodico", "I sommersi e i salvati"],
        correct: 1
    },
    {
        id: 'q17',
        campionato: 'terze',
        authorId: 'a17',
        movement: 'Neorealismo',
        question: "Qual è l'ultimo romanzo pubblicato da Cesare Pavese prima della sua morte, ambientato nelle colline delle Langhe?",
        options: ["La luna e i falò", "La casa in collina", "Il mestiere di vivere", "Paesi tuoi"],
        correct: 0
    },
    {
        id: 'q18',
        campionato: 'terze',
        authorId: 'a18',
        movement: 'Realismo',
        question: "Qual è il titolo del romanzo d'esordio di Alberto Moravia, pubblicato nel 1929, che critica l'apatia della borghesia?",
        options: ["La noia", "La ciociara", "Gli indifferenti", "Il conformista"],
        correct: 2
    },
    {
        id: 'q19',
        campionato: 'terze',
        authorId: 'a19',
        movement: 'Neorealismo',
        question: "Quale romanzo di Beppe Fenoglio narra la determinazione amorosa del partigiano Milton sullo sfondo delle Langhe?",
        options: ["Il partigiano Johnny", "Una questione privata", "I ventitré giorni della città di Alba", "La paga del sabato"],
        correct: 1
    },
    {
        id: 'q20',
        campionato: 'terze',
        authorId: 'a20',
        movement: 'Realismo',
        question: "Quale romanzo di Pier Paolo Pasolini del 1955 racconta le storie di povertà e di vita nelle borgate romane?",
        options: ["Ragazzi di vita", "Una vita violenta", "Petrolio", "Teorema"],
        correct: 0
    },
    {
        id: 'q21',
        campionato: 'terze',
        authorId: 'a21',
        movement: 'Realismo',
        question: "Quale capolavoro autobiografico di Natalia Ginzburg ripercorre la storia della sua famiglia torinese attraverso parole e modi di dire ricorrenti?",
        options: ["Lessico famigliare", "Le voci della sera", "Tutti i nostri ieri", "Caro Michele"],
        correct: 0
    },
    {
        id: 'q22',
        campionato: 'terze',
        authorId: 'a22',
        movement: 'Realismo',
        question: "Quale romanzo di Leonardo Sciascia del 1961 affronta per la prima volta esplicitamente il tema della mafia in chiave poliziesca?",
        options: ["A ciascuno il suo", "Il giorno della civetta", "Il contesto", "Todo modo"],
        correct: 1
    },
    {
        id: 'q23',
        campionato: 'terze',
        authorId: 'a23',
        movement: 'Poesia Contemporanea',
        question: "Qual è il tema centrale di molte delle raccolte poetiche di Alda Merini, legato alla sua personale esperienza di vita?",
        options: ["L'esperienza in manicomio e l'amore tormentato", "La vita contadina", "La Resistenza partigiana", "Il viaggio transatlantico"],
        correct: 0
    },
    {
        id: 'q24',
        campionato: 'terze',
        authorId: 'a13',
        movement: 'Modernismo',
        question: "Quale romanzo di Italo Svevo racconta in chiave ironica e psicanalitica la vicenda del fittizio commerciante triestino Zeno Cosini?",
        options: ["Una vita", "Senilità", "La coscienza di Zeno", "Il fu Mattia Pascal"],
        correct: 2
    },

    // Seconde (Moderna)
    {
        id: 'q101',
        campionato: 'seconde',
        authorId: 'dante-alighieri-sec',
        movement: 'Dolce Stil Novo',
        question: "Quanti canti compongono complessivamente la Divina Commedia di Dante Alighieri?",
        options: ["99", "100", "33", "34"],
        correct: 1
    },
    {
        id: 'q102',
        campionato: 'seconde',
        authorId: 'francesco-petrarca',
        movement: 'Umanesimo',
        question: "Qual è la lingua principalmente utilizzata da Petrarca per la stesura del suo celebre 'Canzoniere'?",
        options: ["Latino", "Volgare fiorentino", "Provenzale", "Siciliano"],
        correct: 1
    },
    {
        id: 'q103',
        campionato: 'seconde',
        authorId: 'giovanni-boccaccio',
        movement: 'Umanesimo',
        question: "Nel Decameron di Boccaccio, quanti sono i giovani che si rifugiano fuori Firenze e raccontano le novelle?",
        options: ["7", "10", "3", "12"],
        correct: 1
    },
    {
        id: 'q104',
        campionato: 'seconde',
        authorId: 'ludovico-ariosto',
        movement: 'Rinascimento',
        question: "Chi è il protagonista impazzito d'amore nell'Orlando Furioso di Ludovico Ariosto?",
        options: ["Rinaldo", "Astolfo", "Orlando", "Ruggero"],
        correct: 2
    },
    {
        id: 'q105',
        campionato: 'seconde',
        authorId: 'torquato-tasso',
        movement: 'Manierismo',
        question: "Quale opera epico-eroica è considerata il capolavoro tormentato di Torquato Tasso?",
        options: ["Gerusalemme liberata", "Aminta", "Rinaldo", "Discorsi dell'arte poetica"],
        correct: 0
    },
    {
        id: 'q106',
        campionato: 'seconde',
        authorId: 'niccolo-machiavelli',
        movement: 'Rinascimento',
        question: "Quale celebre trattato politico Machiavelli dedicò a Lorenzo de' Medici?",
        options: ["Il Principe", "Mandragola", "Istorie fiorentine", "Dell'arte della guerra"],
        correct: 0
    },
    {
        id: 'q107',
        campionato: 'seconde',
        authorId: 'galileo-galilei',
        movement: 'Barocco',
        question: "Quale opera di Galileo Galilei, in forma di dialogo, costò all'autore la condanna del Sant'Uffizio per eresia?",
        options: ["Sidereus Nuncius", "Il Saggiatore", "Dialogo sopra i due massimi sistemi del mondo", "Lettere solari"],
        correct: 2
    },
    {
        id: 'q108',
        campionato: 'seconde',
        authorId: 'carlo-goldoni',
        movement: 'Illuminismo',
        question: "Quale commedia di Goldoni ha per protagonista l'astuta locandiera Mirandolina?",
        options: ["La locandiera", "Il servitore di due padroni", "Le baruffe chiozzotte", "La bottega del caffè"],
        correct: 0
    },
    {
        id: 'q109',
        campionato: 'seconde',
        authorId: 'primi-documenti',
        movement: 'Le Origini',
        question: "Quale formula giuridica risalente al 960 d.C. è considerata il primo documento scritto in volgare italiano?",
        options: ["Placito Capuano", "Indovinello Veronese", "Cantico delle Creature", "Iscrizione della catacomba di Commodilla"],
        correct: 0
    },
    {
        id: 'q110',
        campionato: 'seconde',
        authorId: 'scuola-siciliana',
        movement: 'Poesia Cortese',
        question: "A quale importante figura della Scuola Siciliana è tradizionalmente attribuita l'invenzione della forma del sonetto?",
        options: ["Giacomo da Lentini", "Guido delle Colonne", "Pier della Vigna", "Cielo d'Alcamo"],
        correct: 0
    },
    {
        id: 'q111',
        campionato: 'seconde',
        authorId: 'francesco-assisi',
        movement: 'Letteratura Religiosa',
        question: "Quale preghiera e componimento in volgare umbro di Francesco d'Assisi loda Dio attraverso le creature e gli elementi naturali?",
        options: ["Cantico delle creature", "Laude di Santa Maria", "Il Pianto della Vergine", "Dies Irae"],
        correct: 0
    },
    {
        id: 'q112',
        campionato: 'seconde',
        authorId: 'lorenzo-medici',
        movement: 'Umanesimo',
        question: "Quale componimento di Lorenzo de' Medici esorta a godere della giovinezza recitando 'di doman non c'è certezza'?",
        options: ["Canzona di Bacco", "Nencia da Barberino", "Corinto", "Selve d'amore"],
        correct: 0
    },
    {
        id: 'q113',
        campionato: 'seconde',
        authorId: 'cesare-beccaria',
        movement: 'Illuminismo',
        question: "Quale opera illuminista di Cesare Beccaria del 1764 si oppose fermamente alla tortura e alla pena di morte?",
        options: ["Dei delitti e delle pene", "Il Caffè", "Ricerche intorno alla natura dello stile", "Elementi di economia pubblica"],
        correct: 0
    },
    {
        id: 'q114',
        campionato: 'seconde',
        authorId: 'giuseppe-parini',
        movement: 'Illuminismo',
        question: "Quale poemetto satirico di Giuseppe Parini descrive ironicamente la giornata tipo di un giovane nobile milanese?",
        options: ["Il Giorno", "Le Odi", "Il Mattino", "La Caduta"],
        correct: 0
    },
    {
        id: 'q115',
        campionato: 'seconde',
        authorId: 'commedia-arte',
        movement: 'Barocco',
        question: "Quale stile teatrale italiano nato nel XVI secolo si basava sull'uso di maschere fisse e canovacci improvvisati?",
        options: ["Commedia dell'Arte", "Tragedia neoclassica", "Dramma pastorale", "Sperimentazione futurista"],
        correct: 0
    },
    {
        id: 'q116',
        campionato: 'seconde',
        authorId: 'cecco-angiolieri',
        movement: 'Poesia Comico-Realistica',
        question: "Quale celebre componimento di Cecco Angiolieri comincia con il verso 'S'i' fossi foco, arderei 'l mondo'?",
        options: ["S'i' fossi foco", "Tre cose solamente mi so 'n grado", "La mia donna è sì gentile", "L'amore è un desio che ven da core"],
        correct: 0
    },
    {
        id: 'q117',
        campionato: 'seconde',
        authorId: 'iacopone-todi',
        movement: 'Letteratura Religiosa',
        question: "Quale autore della letteratura religiosa medievale scrisse la celebre lauda drammatica 'Donna de Paradiso'?",
        options: ["Iacopone da Todi", "Francesco d'Assisi", "Bonvesin de la Riva", "Guittone d'Arezzo"],
        correct: 0
    },

    // Avanzato (Internazionali)
    {
        id: 'q201',
        campionato: 'avanzato',
        authorId: 'victor-hugo',
        movement: 'Romanticismo',
        question: "Qual è il nome del protagonista de 'I Miserabili' di Victor Hugo, condannato per aver rubato un pezzo di pane?",
        options: ["Cosette", "Jean Valjean", "Javert", "Marius"],
        correct: 1
    },
    {
        id: 'q202',
        campionato: 'avanzato',
        authorId: 'gabriel-garcia-marquez',
        movement: 'Realismo Magico',
        question: "In quale immaginario villaggio colombiano è ambientato il capolavoro 'Cent'anni di solitudine' di García Márquez?",
        options: ["Macondo", "Comala", "Santa Maria", "Aracataca"],
        correct: 0
    },
    {
        id: 'q203',
        campionato: 'avanzato',
        authorId: 'edgar-allan-poe',
        movement: 'Decadentismo / Gotico',
        question: "Quale celebre volatile ripete ossessivamente la parola 'Nevermore' (Mai più) nel famoso poema di Poe?",
        options: ["Il falco", "Il corvo", "Il gufo", "L'aquila"],
        correct: 1
    },
    {
        id: 'q204',
        campionato: 'avanzato',
        authorId: 'franz-kafka',
        movement: 'Modernismo',
        question: "In quale celebre racconto di Kafka il protagonista Gregor Samsa si sveglia trasformato in un enorme insetto?",
        options: ["Il processo", "La metamorfosi", "Il castello", "America"],
        correct: 1
    },
    {
        id: 'q205',
        campionato: 'avanzato',
        authorId: 'george-orwell',
        movement: 'Distopia / Novecento',
        question: "Quale di questi concetti sociopolitici distopici è stato coniato da George Orwell nel suo celebre romanzo 1984?",
        options: ["Grande Fratello", "Metaverso", "Panopticon", "Realtà aumentata"],
        correct: 0
    },
    {
        id: 'q206',
        campionato: 'avanzato',
        authorId: 'fedor-dostoevskij',
        movement: 'Realismo / Esistenzialismo',
        question: "In quale capolavoro di Dostoevskij il protagonista Raskol'nikov progetta ed esegue l'omicidio di una vecchia usuraia?",
        options: ["Delitto e castigo", "L'idiota", "I fratelli Karamazov", "I demoni"],
        correct: 0
    },
    {
        id: 'q207',
        campionato: 'avanzato',
        authorId: 'lev-tolstoj',
        movement: 'Realismo / Esistenzialismo',
        question: "Quale monumentale romanzo di Lev Tolstoj narra le vicende di diverse famiglie russe durante le guerre napoleoniche?",
        options: ["Guerra e pace", "Anna Karenina", "Resurrezione", "La morte di Ivan Il'ic"],
        correct: 0
    },
    {
        id: 'q208',
        campionato: 'avanzato',
        authorId: 'ernest-hemingway',
        movement: 'Modernismo',
        question: "Quale romanzo di Ernest Hemingway racconta la lotta solitaria del vecchio pescatore Santiago contro un enorme marlin?",
        options: ["Il vecchio e il mare", "Addio alle armi", "Per chi suona la campana", "Festa mobile"],
        correct: 0
    },
    {
        id: 'q209',
        campionato: 'avanzato',
        authorId: 'charles-dickens',
        movement: 'Realismo',
        question: "Quale celebre romanzo di Charles Dickens denuncia lo sfruttamento minorile nella Londra vittoriana attraverso la storia di un orfano?",
        options: ["Oliver Twist", "David Copperfield", "Grandi speranze", "Canto di Natale"],
        correct: 0
    },
    {
        id: 'q210',
        campionato: 'avanzato',
        authorId: 'oscar-wilde',
        movement: 'Decadentismo',
        question: "In quale romanzo di Oscar Wilde il protagonista mantiene l'eterna giovinezza mentre il suo dipinto invecchia al posto suo?",
        options: ["Il ritratto di Dorian Gray", "L'importanza di chiamarsi Ernesto", "Il fantasma di Canterville", "De Profundis"],
        correct: 0
    },
    {
        id: 'q211',
        campionato: 'avanzato',
        authorId: 'william-shakespeare',
        movement: 'Rinascimento',
        question: "Quale celebre tragedia di William Shakespeare è ambientata a Verona e racconta il tragico amore contrastato di due giovani?",
        options: ["Amleto", "Romeo e Giulietta", "Macbeth", "Otello"],
        correct: 1
    },
    {
        id: 'q212',
        campionato: 'avanzato',
        authorId: 'mary-shelley',
        movement: 'Decadentismo / Gotico',
        question: "Quale romanzo di Mary Shelley è considerato il precursore della fantascienza moderna, narrando la creazione di una creatura artificiale?",
        options: ["Frankenstein", "Dracula", "Lo strano caso del dottor Jekyll e del signor Hyde", "Il ritratto di Dorian Gray"],
        correct: 0
    },
    {
        id: 'q213',
        campionato: 'avanzato',
        authorId: 'charles-baudelaire',
        movement: 'Decadentismo',
        question: "Qual è il titolo della celebre raccolta lirica di Charles Baudelaire che inaugurò il simbolismo francese nel 1857?",
        options: ["I fiori del male", "Lo spleen di Parigi", "I paradisi artificiali", "Poemi in prosa"],
        correct: 0
    },
    {
        id: 'q214',
        campionato: 'avanzato',
        authorId: 'virginia-woolf',
        movement: 'Modernismo',
        question: "Quale romanzo di Virginia Woolf descrive la giornata della protagonista che si prepara a ricevere ospiti per una festa in casa?",
        options: ["La signora Dalloway", "Gita al faro", "Orlando", "Le onde"],
        correct: 0
    },
    {
        id: 'q215',
        campionato: 'avanzato',
        authorId: 'jane-austen',
        movement: 'Romanticismo',
        question: "Quale celebre romanzo di Jane Austen narra le tormentate vicende sentimentali tra Elizabeth Bennet e Mr. Darcy?",
        options: ["Orgoglio e prejuizio", "Ragione e sentimento", "Emma", "Mansfield Park"],
        correct: 0
    },
    {
        id: 'q216',
        campionato: 'avanzato',
        authorId: 'miguel-cervantes',
        movement: 'Rinascimento',
        question: "Quale capolavoro di Miguel de Cervantes narra le bizzarre avventure di un cavaliere errante spagnolo e del suo fido scudiero Sancho Panza?",
        options: ["Don Chisciotte della Mancia", "Novelle esemplari", "Galatea", "I travagli di Persile e Sigismonda"],
        correct: 0
    }
];

window.IMPICCATO_WORDS = [
    // Terze
    { word: "ORTIS", clue: "Il cognome del Jacopo protagonista del romanzo epistolare di Ugo Foscolo", authorId: "a1", movement: "Preromanticismo", campionato: "terze" },
    { word: "INFINITO", clue: "La celeberrima poesia di Leopardi ambientata sull'ermo colle", authorId: "a2", movement: "Romanticismo", campionato: "terze" },
    { word: "LUCIA", clue: "Il nome della promessa sposa di Renzo Tramaglino nel romanzo manzoniano", authorId: "a3", movement: "Romanticismo", campionato: "terze" },
    { word: "MALAVOGLIA", clue: "La sfortunata famiglia di pescatori protagonista del capolavoro verista di Verga", authorId: "a5", movement: "Verismo", campionato: "terze" },
    { word: "VITTORIALE", clue: "La monumentale residenza-museo che D'Annunzio fece erigere sulle rive del Garda", authorId: "a7", movement: "Decadentismo", campionato: "terze" },
    { word: "MASCHERE", clue: "Ciò che indossano tutti gli uomini secondo la filosofia teatrale di Pirandello", authorId: "a8", movement: "Modernismo", campionato: "terze" },
    { word: "ALLEGRIA", clue: "La raccolta poetica del 1931 che raccoglie i versi di trincea di Ungaretti", authorId: "a10", movement: "Ermetismo", campionato: "terze" },
    { word: "LIMONI", clue: "Le piante e frutti che danno il titolo alla poesia manifesto degli Ossi di seppia di Montale", authorId: "a11", movement: "Ermetismo", campionato: "terze" },
    { word: "BARONE", clue: "L'aggettivo del rampante Cosimo Piovasco di Rondò calviniano che vive sugli alberi", authorId: "a14", movement: "Neorealismo", campionato: "terze" },
    { word: "CHIMICO", clue: "Il mestiere e percorso di studi di Primo Levi, cruciale per la sua prosa e testimonianza", authorId: "a16", movement: "Neorealismo", campionato: "terze" },
    
    // Seconde
    { word: "BEATRICE", clue: "La nobilissima donna angelo cantata e amata da Dante Alighieri", authorId: "dante-alighieri-sec", movement: "Dolce Stil Novo", campionato: "seconde" },
    { word: "LAURA", clue: "La figura femminile che ispira il Canzoniere di Francesco Petrarca", authorId: "francesco-petrarca", movement: "Umanesimo", campionato: "seconde" },
    { word: "DECAMERON", clue: "Il titolo della raccolta boccacciana contenente cento celebri novelle", authorId: "giovanni-boccaccio", movement: "Umanesimo", campionato: "seconde" },
    { word: "PRINCIPE", clue: "La figura ideale a cui Machiavelli dedica il suo celeberrimo trattato politico", authorId: "niccolo-machiavelli", movement: "Rinascimento", campionato: "seconde" },
    { word: "CANNOCCHIALE", clue: "Lo strumento scientifico con cui Galilei rivoluzionò l'osservazione astronomica", authorId: "galileo-galilei", movement: "Barocco", campionato: "seconde" },
    { word: "MIRANDOLINA", clue: "La determinata e seducente protagonista della commedia goldoniana 'La locandiera'", authorId: "carlo-goldoni", movement: "Illuminismo", campionato: "seconde" },
    
    // Avanzato
    { word: "METAMORFOSI", clue: "La drammatica trasformazione di Gregor Samsa descritta da Franz Kafka", authorId: "franz-kafka", movement: "Modernismo", campionato: "avanzato" },
    { word: "FATTORIA", clue: "Quella degli animali, celebre satira politica di George Orwell", authorId: "george-orwell", movement: "Distopia / Novecento", campionato: "avanzato" }
];

window.PUZZLE_POEMS = [
    // Terze
    {
        title: "L'infinito (Leopardi)",
        authorId: "a2",
        movement: "Romanticismo",
        campionato: "terze",
        lines: [
            "Sempre caro mi fu quest'ermo colle,",
            "e questa siepe, che da tanta parte",
            "dell'ultimo orizzonte il guardo esclude.",
            "Ma sedendo e mirando, interminati",
            "spazi di là da quella, e sovrumani",
            "silenzi, e profondissima quiete",
            "io nel pensier mi fingo..."
        ]
    },
    {
        title: "San Martino (Carducci)",
        authorId: "a4",
        movement: "Classicismo",
        campionato: "terze",
        lines: [
            "La nebbia a gl'irti colli",
            "piovigginando sale,",
            "e sotto il maestrale",
            "urla e biancheggia il mar;",
            "ma per le vie del borgo",
            "dal ribollar de' tini",
            "va l'aspro odor de i vini",
            "l'anime a rallegrar."
        ]
    },
    
    // Seconde
    {
        title: "Divina Commedia (Dante)",
        authorId: "dante-alighieri-sec",
        movement: "Dolce Stil Novo",
        campionato: "seconde",
        lines: [
            "Nel mezzo del cammin di nostra vita",
            "mi ritrovai per una selva oscura,",
            "ché la diritta via era smarrita.",
            "Ahi quanto a dir qual era è cosa dura",
            "esta selva selvaggia e aspra e forte",
            "che nel pensier rinova la paura!"
        ]
    },
    {
        title: "S'i' fossi foco (Angiolieri)",
        authorId: "cecco-angiolieri",
        movement: "Poesia Comico-Realistica",
        campionato: "seconde",
        lines: [
            "S'i' fossi foco, arderei 'l mondo;",
            "s'i' fossi vento, lo tempesterei;",
            "s'i' fossi acqua, io l'annegherei;",
            "s'i' fossi Dio, mandereil 'n profondo;"
        ]
    }
];

window.FILL_THE_BLANKS = [
    // Terze
    {
        clue: "Il componimento manifesto dell'ermetismo e della brevità ungarettiana",
        authorId: "a10",
        movement: "Ermetismo",
        campionato: "terze",
        text: "M'illumino / d'[immenso].",
        blanks: ["immenso"]
    },
    {
        clue: "Dall'ode manzoniana 'Il cinque maggio' dedicata alla morte di Napoleone",
        authorId: "a3",
        movement: "Romanticismo",
        campionato: "terze",
        text: "Ei fu. Siccome [immobile], / dato il mortal sospiro, / stette la spoglia [immemore] / orba di tanto spiro...",
        blanks: ["immobile", "immemore"]
    },
    {
        clue: "Dal fulmineo e malinconico capolavoro lirico di Salvatore Quasimodo",
        authorId: "a12",
        movement: "Ermetismo",
        campionato: "terze",
        text: "Ognuno sta solo sul cuor della [terra] / trafitto da un raggio di [sole]: / ed è subito [sera].",
        blanks: ["terra", "sole", "sera"]
    },
    {
        clue: "Dal nostalgico inizio della poesia 'A Silvia' di Giacomo Leopardi",
        authorId: "a2",
        movement: "Romanticismo",
        campionato: "terze",
        text: "Silvia, rimembri ancora / quel tempo della tua vita [mortale], / quando beltà [splendea] / negli occhi tuoi ridenti e fuggitivi...",
        blanks: ["mortale", "splendea"]
    }
];

window.INCIPIT_MAXIMS = [
    // Terze
    {
        text: "«Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene ininterrotte di monti, tutto a seni e a golfi...»",
        options: ["Ugo Foscolo", "Alessandro Manzoni", "Giovanni Verga", "Italo Calvino"],
        correct: 1,
        authorId: "a3",
        movement: "Romanticismo",
        campionato: "terze"
    },
    {
        text: "«Il mare non ha paese nemmeno lui, ed è di tutti quelli che lo stanno ad ascoltare...»",
        options: ["Giacomo Leopardi", "Giovanni Pascoli", "Giovanni Verga", "Primo Levi"],
        correct: 2,
        authorId: "a5",
        movement: "Verismo",
        campionato: "terze"
    },
    {
        text: "«La salute non analizza se stessa e neppure si guarda nello specchio. Solo noi malati sappiamo qualche cosa di noi stessi.»",
        options: ["Italo Svevo", "Luigi Pirandello", "Eugenio Montale", "Alberto Moravia"],
        correct: 0,
        authorId: "a13",
        movement: "Modernismo",
        campionato: "terze"
    },
    
    // Seconde
    {
        text: "«Fatti non foste a viver come bruti, ma per seguir virtute e canoscenza.»",
        options: ["Francesco Petrarca", "Dante Alighieri", "Giovanni Boccaccio", "Torquato Tasso"],
        correct: 1,
        authorId: "dante-alighieri-sec",
        movement: "Dolce Stil Novo",
        campionato: "seconde"
    },
    {
        text: "«Ognuno vede quel che tu pari, pochi sentono quel che tu sei; e quelli pochi non ardiscono opporsi all'opinione dei molti...»",
        options: ["Carlo Goldoni", "Niccolò Machiavelli", "Galileo Galilei", "Torquato Tasso"],
        correct: 1,
        authorId: "niccolo-machiavelli",
        movement: "Rinascimento",
        campionato: "seconde"
    },

    // Avanzato
    {
        text: "«Tutti gli animali sono uguali, ma alcuni animali sono più uguali degli altri.»",
        options: ["George Orwell", "Victor Hugo", "Franz Kafka", "Lev Tolstoj"],
        correct: 0,
        authorId: "george-orwell",
        movement: "Distopia / Novecento",
        campionato: "avanzato"
    }
];
