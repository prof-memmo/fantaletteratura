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
        { word: "ESILIO", hint: "Condizione in cui vive l'ultima parte della vita" }
      ],
      puzzle: [
        { img: "avatar_autori/Foscolo.png", title: "Ritratto di Foscolo", pieceCount: 16 }
      ],
      cloze: [
        {
          text: "Né più mai toccherò le sacre _, ove il mio corpo fanciulletto _",
          words: ["sponde", "giacque"]
        }
      ],
      versi: [
        {
          title: "A Zacinto",
          lines: [
            "Né più mai toccherò le sacre sponde",
            "ove il mio corpo fanciulletto giacque,",
            "Zacinto mia, che te specchi nell'onde"
          ]
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
        { word: "RECANATI", hint: "Città natale" }
      ],
      puzzle: [
        { img: "avatar_autori/Leopardi.png", title: "Ritratto di Leopardi", pieceCount: 16 }
      ],
      cloze: [
        {
          text: "Sempre caro mi fu quest'ermo _, e questa _, che da tanta parte dell'ultimo _ il guardo _.",
          words: ["colle", "siepe", "orizzonte", "esclude"]
        }
      ],
      versi: [
        {
          title: "L'Infinito",
          lines: [
            "Sempre caro mi fu quest'ermo colle,",
            "e questa siepe, che da tanta parte",
            "dell'ultimo orizzonte il guardo esclude."
          ]
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
        { word: "VERISMO", hint: "Corrente letteraria italiana" },
        { word: "MALAVOGLIA", hint: "Romanzo sulla famiglia Toscano" },
        { word: "SICILIA", hint: "Regione in cui sono ambientate le opere" }
      ],
      puzzle: [
        { img: "avatar_autori/Verga.png", title: "Ritratto di Verga", pieceCount: 16 }
      ],
      cloze: [
        {
          text: "I _ sono una famiglia di pescatori che vive nel paese di _.",
          words: ["Malavoglia", "Aci Trezza"]
        }
      ],
      versi: [
        {
          title: "Rosso Malpelo",
          lines: [
            "Malpelo si chiamava così perché aveva i capelli rossi;",
            "ed aveva i capelli rossi perché era un ragazzo malizioso",
            "e cattivo."
          ]
        }
      ],
      quiz: [
        { q: "Quale corrente letteraria fondò Verga in Italia?", o: ["Neorealismo", "Verismo", "Romanticismo", "Decadentismo"], a: 1 },
        { q: "Come si chiamava la barca dei Malavoglia?", o: ["La Provvidenza", "La Speranza", "Il Destino", "La Fortuna"], a: 0 },
        { q: "Chi scrisse Rosso Malpelo?", o: ["Luigi Pirandello", "Gabriele D'Annunzio", "Giovanni Verga", "Italo Svevo"], a: 2 },
        { q: "In quale paese della Sicilia è ambientato 'I Malavoglia'?", o: ["Palermo", "Catania", "Aci Trezza", "Siracusa"], a: 2 },
        { q: "Quale tecnica narrativa è tipica di Verga?", o: ["Flusso di coscienza", "Straniamento", "Monologo interiore", "Prosa poetica"], a: 1 }
      ]
    },
    'a7': { // D'Annunzio
      topic: "Gabriele D'Annunzio",
      impiccato: [
        { word: "ESTETISMO", hint: "Il culto della bellezza" },
        { word: "PIACERE", hint: "Celebre romanzo con Andrea Sperelli" },
        { word: "VATE", hint: "Soprannome di D'Annunzio" }
      ],
      puzzle: [
        { img: "avatar_autori/DAnnunzio.png", title: "Ritratto di D'Annunzio", pieceCount: 16 }
      ],
      cloze: [
        {
          text: "Taci. Su le soglie del _, non odo parole che dici _...",
          words: ["bosco", "umane"]
        }
      ],
      versi: [
        {
          title: "La pioggia nel pineto",
          lines: [
            "Taci. Su le soglie",
            "del bosco non odo",
            "parole che dici umane;"
          ]
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
        { word: "MASCHERA", hint: "Rappresenta le diverse forme che assumiamo" },
        { word: "PASCAL", hint: "Il fu Mattia..." },
        { word: "UMORISMO", hint: "Il sentimento del contrario" }
      ],
      puzzle: [
        { img: "avatar_autori/Pirandello.png", title: "Ritratto di Pirandello", pieceCount: 16 }
      ],
      cloze: [
        {
          text: "Imparerai a tue _, che nel lungo tragitto della _, incontrerai tante _ e pochi _.",
          words: ["spese", "vita", "maschere", "volti"]
        }
      ],
      versi: [
        {
          title: "Uno, nessuno e centomila",
          lines: [
            "La vita non conclude.",
            "E non sa di nomi, la vita."
          ]
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

    startMinigame: function(type, missionId) {
      currentMissionId = missionId || null;
      const data = getData(missionId);

      const container = document.getElementById('minigame-container');
      const content = document.getElementById('minigame-content');
      const title = document.getElementById('minigame-title');
      if (!container || !content) return;

      container.style.display = 'flex';
      currentMinigame = type;
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Label del topic
      const topicBadge = data.topic ? `<span style="font-size:0.75rem; background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); padding:2px 10px; border-radius:4px; color:var(--gold); margin-left:8px;">${data.topic}</span>` : '';

      const typeLabels = {
        quiz: '❓ Quiz',
        impiccato: '🎭 Impiccato',
        puzzle: '🧩 Riordina la Frase',
        cloze: '📝 Cloze — Completa il Testo',
        versi: '📜 Riordina i Versi'
      };
      title.innerHTML = (this.isMancheMode ? '🏆 MANCHE COMPLETA - ' : '') + (typeLabels[type] || type) + topicBadge;

      switch(type) {
        case 'impiccato': this.initImpiccato(content, data); break;
        case 'puzzle':    this.initPuzzle(content, data); break;
        case 'cloze':     this.initCloze(content, data); break;
        case 'versi':     this.initVersi(content, data); break;
        case 'quiz':      this.initQuiz(content, data); break;
      }
    },

    startManche: function(authorId) {
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
        content.innerHTML = `<div style="text-align:center; padding: 30px;">
            <h2 style="color:var(--accent-gold); font-size:2rem; margin-bottom:15px;">🎉 MANCHE COMPLETATA!</h2>
            <p style="font-size:1.2rem; color:#fff;">Hai completato tutti i giochi della manche.</p>
            <div style="font-size:3rem; font-weight:bold; color:#16a34a; margin:20px 0;">+${xp} PUNTI</div>
            <button class="btn" style="background:#16a34a; color:#fff;" onclick="EroiMinigames.finalizeMancheReward(${xp})">Riscuoti Punti</button>
        </div>`;
        return;
      }
      const nextGame = this.mancheGames.shift();
      this.startMinigame(nextGame, authorId);
    },

    finalizeMancheReward: function(xp) {
        this.assignPointsToTeam(xp);
        this.closeMinigame();
    },

    assignPointsToTeam: function(xp) {
        if (window.currentUserRole === 'studente' && window.currentUserTeamId && window.db) {
            window.db.collection('teams').doc(window.currentUserTeamId).get().then(doc => {
                if(doc.exists) {
                    const t = doc.data();
                    window.db.collection('teams').doc(t.id).update({
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
      currentMinigame = null;
      this.isMancheMode = false;
    },

    // =====================================================
    // QUIZ
    // =====================================================
    initQuiz: function(container, data) {
        let pool = data.quiz || [];
        if (pool.length === 0) {
            container.innerHTML = '<p>Nessun quiz disponibile per questo autore.</p>';
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
        
        const qData = this.quizState.questions[this.quizState.current];
        const progress = `Domanda ${this.quizState.current + 1} di ${this.quizState.questions.length}`;
        
        const optionsHtml = qData.o.map((opt, idx) => `
            <button class="btn btn-secondary" style="display:block; width:100%; text-align:left; margin-bottom:10px; padding:12px; font-size:0.95rem; white-space:normal; height:auto; line-height:1.4;" onclick="EroiMinigames.answerQuiz(${idx})">${opt}</button>
        `).join('');
        
        container.innerHTML = `
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:15px; text-transform:uppercase; letter-spacing:1px; font-weight:bold;">${progress}</div>
            <h3 style="color:#fff; font-size:1.2rem; margin-bottom:20px; line-height:1.4;">${qData.q}</h3>
            <div>${optionsHtml}</div>
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
            <div style="text-align:center; padding:20px;">
                <h3 style="color:var(--accent-gold); font-size:1.5rem; margin-bottom:15px;">Quiz Terminato!</h3>
                <p style="font-size:1.1rem; color:#fff; margin-bottom:20px;">Hai risposto correttamente a ${correct} domande su ${total}.</p>
                ${points > 0 ? `<div style="color:#16a34a; font-weight:bold; font-size:1.1rem; margin-bottom:15px;">🎉 Risultato positivo!</div>` : `<div style="color:#ef4444; font-weight:bold; font-size:1.1rem; margin-bottom:15px;">Purtroppo non hai superato il test.</div>`}
                <button class="btn" onclick="EroiMinigames.rewardAndNext('quiz', ${points}, 0)">Continua</button>
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

      const parts = [
        '',
        '<line x1="20" y1="130" x2="100" y2="130" stroke="var(--gold)" stroke-width="3"/>',
        '<line x1="60" y1="130" x2="60" y2="20" stroke="var(--gold)" stroke-width="3"/>',
        '<line x1="60" y1="20" x2="100" y2="20" stroke="var(--gold)" stroke-width="3"/>',
        '<line x1="100" y1="20" x2="100" y2="35" stroke="var(--gold)" stroke-width="3"/>',
        '<circle cx="100" cy="45" r="10" stroke="var(--gold)" stroke-width="2" fill="none"/>',
        '<line x1="100" y1="55" x2="100" y2="90" stroke="var(--gold)" stroke-width="2"/><line x1="100" y1="65" x2="85" y2="80" stroke="var(--gold)" stroke-width="2"/><line x1="100" y1="65" x2="115" y2="80" stroke="var(--gold)" stroke-width="2"/>',
        '<line x1="100" y1="90" x2="85" y2="115" stroke="var(--gold)" stroke-width="2"/><line x1="100" y1="90" x2="115" y2="115" stroke="var(--gold)" stroke-width="2"/>'
      ];

      let svg = '';
      for (let i = 0; i <= s.wrongGuesses && i < parts.length; i++) svg += parts[i];

      const wordDisplay = word.split('').map(l => 
        s.guessed.has(l)
          ? `<span style="font-size:1.8rem;font-family:var(--font-heading);color:var(--gold);margin:0 4px;letter-spacing:2px;">${l}</span>`
          : `<span style="font-size:1.8rem;color:var(--text-muted);margin:0 4px;">_</span>`
      ).join('');

      const wrongLetters = [...s.guessed].filter(l => !word.includes(l));
      const won = word.split('').every(l => s.guessed.has(l));
      const lost = s.wrongGuesses >= s.maxWrong;

      const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      let kb = '<div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-top:14px;">';
      alpha.forEach(l => {
        const isGuessed = s.guessed.has(l);
        const isWrong = isGuessed && !word.includes(l);
        const isOk = isGuessed && word.includes(l);
        let st = 'min-width:36px;height:36px;border-radius:6px;font-weight:bold;font-size:0.82rem;cursor:pointer;border:1px solid;transition:all 0.2s;';
        if (isWrong)   st += 'background:rgba(239,68,68,0.2);border-color:#ef4444;color:#ef4444;';
        else if (isOk) st += 'background:rgba(22,163,74,0.2);border-color:#16a34a;color:#16a34a;';
        else           st += 'background:rgba(212,175,55,0.08);border-color:rgba(212,175,55,0.3);color:var(--text-light);';
        kb += `<button style="${st}" ${isGuessed||won||lost?'disabled':''} onclick="EroiMinigames.guessLetter('${l}')">${l}</button>`;
      });
      kb += '</div>';

      let result = '';
      if (won) {
        result = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🎉 Hai indovinato! +20 XP, +10 Dracme</div>
          <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('impiccato',20,10)">Nuova parola</button>
        </div>`;
      } else if (lost) {
        result = `<div style="background:rgba(239,68,68,0.1);border:1px solid #ef4444;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#ef4444;font-weight:bold;">💀 La parola era: <span style="color:var(--gold);">${word}</span></div>
          <button class="btn btn-secondary" style="margin-top:12px;" onclick="EroiMinigames.retryImpiccato()">Riprova</button>
        </div>`;
      }

      container.innerHTML = `
        <div style="display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:start;">
          <div style="text-align:center;">
            <svg width="140" height="140" viewBox="0 0 140 140" style="background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid rgba(212,175,55,0.2);">${svg}</svg>
            <div style="margin-top:6px;font-size:0.8rem;color:var(--text-muted);">Errori: ${s.wrongGuesses}/${s.maxWrong}</div>
          </div>
          <div>
            <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(212,175,55,0.2);border-radius:8px;padding:10px;margin-bottom:12px;font-size:0.84rem;color:var(--text-muted);">
              💡 <em>${s.hint}</em>
            </div>
            <div style="text-align:center;padding:14px 0;letter-spacing:6px;">${wordDisplay}</div>
            ${wrongLetters.length ? `<div style="font-size:0.8rem;color:#ef4444;margin-bottom:6px;">Lettere sbagliate: ${wrongLetters.join(', ')}</div>` : ''}
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
      const shuffled = [...ex.words].sort(() => Math.random() - 0.5);
      puzzleState = { ex, shuffled, selected: [], remaining: [...shuffled] };
      this.renderPuzzle(container);
    },

    renderPuzzle: function(container) {
      const s = puzzleState;
      const correct = s.selected.join(' ') === s.ex.solution;

      const sel = s.selected.length
        ? s.selected.map((w,i) => `<span style="display:inline-block;background:rgba(37,99,235,0.2);border:1px solid #2563eb;border-radius:6px;padding:6px 11px;margin:3px;font-weight:bold;cursor:pointer;color:var(--text-light);" onclick="EroiMinigames.puzzleRemove(${i})">${w}</span>`).join('')
        : '<span style="color:var(--text-muted);font-style:italic;">Clicca le parole nell\'ordine corretto...</span>';

      const rem = s.remaining.map((w,i) =>
        `<button style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.3);border-radius:6px;padding:7px 12px;margin:3px;font-weight:bold;color:var(--text-light);cursor:pointer;transition:all 0.2s;"
         onmouseover="this.style.background='rgba(212,175,55,0.2)'" onmouseout="this.style.background='rgba(212,175,55,0.08)'"
         onclick="EroiMinigames.puzzleAdd(${i})">${w}</button>`
      ).join('');

      const resultHtml = correct ? `
        <div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:16px;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">✅ Perfetto! Frase ricostruita! +15 XP</div>
          <div style="font-size:0.83rem;color:var(--text-muted);margin-top:5px;">Fonte: <em>${s.ex.source}</em></div>
          <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('puzzle',15,8)">Nuova frase</button>
        </div>` : '';

      container.innerHTML = `
        <div style="font-size:0.87rem;color:var(--text-muted);margin-bottom:10px;">📖 <em>${s.ex.source}</em></div>
        <div style="min-height:55px;border:1.5px dashed rgba(212,175,55,0.3);border-radius:8px;padding:10px;margin-bottom:14px;background:rgba(0,0,0,0.2);">${sel}</div>
        <div style="margin-bottom:8px;font-size:0.84rem;color:var(--text-muted);">Parole disponibili:</div>
        <div style="min-height:55px;">${rem}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
          <button class="btn btn-secondary" onclick="EroiMinigames.puzzleReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
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
      clozeState = { ex, answers: new Array(ex.blanks.length).fill('') };
      this.renderCloze(container);
    },

    renderCloze: function(container) {
      const s = clozeState;
      let idx = 0;
      const textHtml = s.ex.text.replace(/_+/g, () => {
        const i = idx++;
        return `<input type="text" id="cloze-${i}" value="${s.answers[i]||''}"
          style="width:120px;background:rgba(37,99,235,0.1);border:1.5px solid rgba(37,99,235,0.4);border-radius:6px;padding:4px 8px;color:var(--text-light);font-weight:bold;text-align:center;font-size:0.9rem;"
          oninput="EroiMinigames.updateCloze(${i},this.value)" placeholder="___">`;
      });

      container.innerHTML = `
        <div style="background:rgba(0,0,0,0.3);border:1.5px solid rgba(212,175,55,0.2);border-radius:10px;padding:18px;margin-bottom:16px;">
          <div style="font-size:0.84rem;color:var(--text-muted);margin-bottom:10px;">📖 <em>${s.ex.source}</em></div>
          <div style="font-size:1.05rem;line-height:2.4;color:var(--text-light);font-weight:500;">${textHtml}</div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn" onclick="EroiMinigames.verifyCloze()"><i class="fa-solid fa-check"></i> Verifica</button>
          <button class="btn btn-secondary" onclick="EroiMinigames.retryCurrentCloze()"><i class="fa-solid fa-dice"></i> Nuovo esercizio</button>
        </div>
        <div id="cloze-result" style="margin-top:14px;"></div>`;
    },

    updateCloze: function(i, v) { if (clozeState.answers) clozeState.answers[i] = v; },

    verifyCloze: function() {
      const s = clozeState;
      // Prendi valori dagli input
      s.ex.blanks.forEach((_, i) => {
        const inp = document.getElementById(`cloze-${i}`);
        if (inp) s.answers[i] = inp.value.trim();
      });

      let correct = 0;
      s.ex.blanks.forEach((blank, i) => {
        const ok = (s.answers[i] || '').toLowerCase() === blank.toLowerCase();
        if (ok) correct++;
        const inp = document.getElementById(`cloze-${i}`);
        if (inp) {
          inp.style.borderColor = ok ? '#16a34a' : '#ef4444';
          inp.style.background = ok ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.1)';
          if (!ok) { inp.value = blank; inp.style.color = '#f59e0b'; }
        }
      });

      const res = document.getElementById('cloze-result');
      if (!res) return;
      if (correct === s.ex.blanks.length) {
        res.innerHTML = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;">
          <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🎉 Perfetto! Tutte le risposte corrette! +25 XP</div>
          <button class="btn" style="margin-top:10px;" onclick="EroiMinigames.rewardAndNext('cloze',25,12)">Nuovo esercizio</button>
        </div>`;
      } else {
        res.innerHTML = `<div style="background:rgba(245,158,11,0.1);border:1px solid #f59e0b;border-radius:10px;padding:16px;text-align:center;">
          <div style="color:#f59e0b;font-weight:bold;">${correct}/${s.ex.blanks.length} corrette. Le risposte sono rivelate in oro.</div>
          <button class="btn btn-secondary" style="margin-top:10px;" onclick="EroiMinigames.retryCurrentCloze()">Riprova con nuovo testo</button>
        </div>`;
      }
    },

    retryCurrentCloze: function() {
      const data = getData(currentMissionId);
      const c = document.getElementById('minigame-content');
      if (c) this.initCloze(c, data);
    },

    // =====================================================
    // RIORDINA I VERSI (non solo proemio!)
    // =====================================================
    initVersi: function(container, data) {
      const pool = data.versi && data.versi.length ? data.versi : DEFAULT_DATA.versi;
      const ex = pool[Math.floor(Math.random() * pool.length)];
      const shuffled = [...ex.lines].sort(() => Math.random() - 0.5);
      versiState = { ex, shuffled, ordered: [], remaining: [...shuffled] };
      this.renderVersi(container);
    },

    renderVersi: function(container) {
      const s = versiState;
      const isComplete = s.ordered.length === s.ex.lines.length;
      const isCorrect = isComplete && s.ordered.every((l, i) => l === s.ex.lines[i]);

      const orderedHtml = s.ordered.length
        ? s.ordered.map((l, i) => {
            const ok = isComplete ? l === s.ex.lines[i] : null;
            const chk = isComplete ? (ok ? 'border-color:#16a34a;background:rgba(22,163,74,0.1);' : 'border-color:#ef4444;background:rgba(239,68,68,0.07);') : '';
            return `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid rgba(212,175,55,0.2);border-radius:6px;margin-bottom:5px;${chk}cursor:pointer;" onclick="EroiMinigames.versiRemove(${i})">
              <span style="color:var(--gold);font-weight:bold;min-width:20px;">${i+1}.</span>
              <span style="color:var(--text-light);font-style:italic;">"${l}"</span>
            </div>`;
          }).join('')
        : '<div style="color:var(--text-muted);font-style:italic;padding:10px;">Clicca i versi in basso nell\'ordine corretto...</div>';

      const remainingHtml = s.remaining.map((l, i) =>
        `<div style="display:flex;align-items:center;gap:10px;padding:9px 13px;background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.2);border-radius:7px;margin-bottom:7px;cursor:pointer;transition:all 0.2s;"
         onmouseover="this.style.background='rgba(212,175,55,0.15)'" onmouseout="this.style.background='rgba(212,175,55,0.05)'"
         onclick="EroiMinigames.versiAdd(${i})">
          <i class="fa-solid fa-grip-lines" style="color:var(--gold);font-size:0.75rem;"></i>
          <span style="color:var(--text-light);font-style:italic;">"${l}"</span>
        </div>`
      ).join('');

      let resultHtml = '';
      if (isComplete) {
        if (isCorrect) {
          resultHtml = `<div style="background:rgba(22,163,74,0.15);border:1px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin-top:14px;">
            <div style="color:#16a34a;font-weight:bold;font-size:1.1rem;">🏆 Eccellente! Versi nell'ordine corretto! +30 XP</div>
            <div style="font-size:0.84rem;color:var(--text-muted);margin-top:5px;"><em>${s.ex.title}</em></div>
            <button class="btn" style="margin-top:12px;" onclick="EroiMinigames.rewardAndNext('versi',30,15)">Nuovo testo</button>
          </div>`;
        } else {
          resultHtml = `<div style="background:rgba(245,158,11,0.1);border:1px solid #f59e0b;border-radius:10px;padding:14px;margin-top:14px;">
            <div style="color:#f59e0b;font-weight:bold;margin-bottom:8px;">Quasi! L'ordine corretto era:</div>
            ${s.ex.lines.map((l,i)=>`<div style="font-size:0.83rem;color:var(--text-muted);font-style:italic;margin-bottom:3px;">${i+1}. "${l}"</div>`).join('')}
            <button class="btn btn-secondary" style="margin-top:10px;" onclick="EroiMinigames.versiReset()">Riprova</button>
          </div>`;
        }
      }

      container.innerHTML = `
        <div style="background:rgba(120,53,15,0.08);border:1px solid rgba(120,53,15,0.3);border-radius:8px;padding:12px;margin-bottom:14px;">
          <div style="font-weight:bold;color:var(--gold);margin-bottom:4px;">📜 ${s.ex.title}</div>
          <div style="font-size:0.82rem;color:var(--text-muted);">💡 ${s.ex.hint}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
          <div>
            <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:8px;font-weight:600;">🔢 Il tuo ordine <span style="opacity:0.6;">(clicca per rimuovere)</span>:</div>
            <div style="min-height:160px;border:1.5px dashed rgba(212,175,55,0.3);border-radius:8px;padding:8px;background:rgba(0,0,0,0.2);">${orderedHtml}</div>
          </div>
          <div>
            <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:8px;font-weight:600;">📋 Versi disponibili <span style="opacity:0.6;">(clicca per aggiungere)</span>:</div>
            <div>${remainingHtml}</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
          <button class="btn btn-secondary" onclick="EroiMinigames.versiReset()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
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
        if (this.isMancheMode) {
            let manchePts = (type === 'quiz') ? baseXP : 4; // Fino a 4 per gioco, totale 20
            this.mancheScore += manchePts;
            this.nextMancheGame(currentMissionId);
        } else {
            let xp = 2; // Massimo 2 punti gioco singolo per i minigiochi classici
            if (type === 'quiz') xp = baseXP; // il quiz passa il suo punteggio calcolato (max 2)
            if (xp > 2) xp = 2; // Sicurezza: massimo 2 per gioco singolo in ogni caso
            if (xp > 0) {
                this.assignPointsToTeam(xp);
            }
            this.startMinigame(type, currentMissionId);
        }
      } catch(e) { console.warn('Reward error:', e); }
    }
  };

})();
