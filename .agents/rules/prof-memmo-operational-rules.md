# REGOLE OPERATIVE DI SICUREZZA PER L'ECOSISTEMA PROF. MEMMO
# Versione 2.0 - Consolidata e Blindata (16 Settembre 2026)

Tutti gli agenti AI e i programmatori che operano sui repository dell'Ecosistema Prof. Memmo DEVONO rispettare rigorosamente le seguenti regole inderogabili.

---

### ART. 1 - NESSUNA INIZIATIVA NON RICHIESTA (ZERO UNSOLICITED INITIATIVES)
- E' fatto divieto assoluto di introdurre nuovi componenti UI, campi input, selettori, form, modali o stili che non siano stati espressamente richiesti e concordati con l'utente.
- Le implementazioni devono attenersi scrupolosamente all'obiettivo pattuito, senza estensioni arbitrarie.

---

### ART. 2 - DIVIETO ASSOLUTO DI CANCELLAZIONE SILENZIOSA (ZERO DELETIONS GUARD)
- E' severamente vietato cancellare, rinominare, commentare o svuotare:
  1. Blocchi di markup HTML preesistenti (viste, card, pulsanti, riepiloghi, elenchi).
  2. Metodi e funzioni JavaScript dei motori core (GameEngine, Board, AudioEngine, LiveEditor, App, Auth, DiagnosticsService).
  3. Classi o regole CSS preesistenti.
  4. Strutture dati e record nei file JSON.
- Qualsiasi modifica deve essere puramente additiva o di correzione mirata, preservando la retrocompatibilita totale con il markup storico approvato.

---

### ART. 3 - SALVAGUARDIA TOTALE DI UTENTE, AUTENTICAZIONE (SSO), LOGIN E ABBONAMENTI
- E' fatto divieto di alterare o rimuovere i componenti di autenticazione Firebase, i file di sessione (js/auth/session.js), la guardia abbonamenti (hub-subscription-guard.js) e il menu profilo utente (user-dropdown, avatar, nome, ruolo, scuola).
- I flussi di Single Sign-On (SSO) cross-progetto e i reindirizzamenti via query param (?redirect=...) devono essere sempre garantiti e funzionanti sia in ambiente standard che in ambiente /preview/.
- Le collezioni Cloud Firestore (hub_users, eroi_users, corte_users, fanta_users, palestra_users, ops_users, hub_settings, hub_didactic_overrides) non devono mai essere corrotte, svuotate o private di permessi di sicurezza.

---

### ART. 4 - INTEGRITA STRUTTURALE DEI COMPONENTI PROTETTI
- **Footer di Copyright Patamu**: Deve essere presente in tutte le viste principali, con altezza badge esattamente a 52px (object-fit: contain; flex-shrink: 0;), testo legale giustificato e opacita controllata.
- **Barra di Navigazione Inferiore (Dock Bar)**: Posizionamento fisso in basso a 64px di altezza, centrata, con icone, etichette e transizioni fluide.
- **Isolamento Modali**: Tutti i modali secondari (legale, profilo, salvataggi, live editor) devono avere la regola CSS `.hidden, [hidden] { display: none !important; }` per non influenzare mai il flusso e lo scroll delle pagine.

---

### ART. 5 - AUDIT AUTOMATICO ANTI-REGRESSIONE E VERIFICA VISIVA OBBLIGATORIA (PRE-COMMIT)
Prima di considerare conclusa qualsiasi modifica e prima di effettuare il push su Git, l'agente DEVE eseguire una verifica programmatica e visiva rigorosa:
1. **Audit Sintassi CSS Totale**: Conteggio e bilanciamento matematico perfetto delle parentesi graffe `{` e `}` su tutti i fogli di stile e tag `<style>` inline (scarto zero).
2. **Audit "Anti-Silent Failure" (Nessun Click a Vuoto)**:
   - È fatto divieto assoluto di implementare handler di pulsanti, link o form con uscite silenziose (`if (!val) return;`).
   - Se i prerequisiti di un'azione non sono soddisfatti, l'interfaccia DEVE disabilitare il pulsante (`disabled`) oppure mostrare un feedback/avviso esplicito (alert o toast) indicando cosa manca.
3. **Audit "Data Contract Hub" (Consistenza Studenti e Classi)**:
   - Qualsiasi modulo che interagisce con studenti e classi dell'Hub deve obbligatoriamente supportare in modo difensivo tutti i formati di chiave (`studentId || uid || id`, `displayName || name || nickname || email`), senza assumere una singola chiave non garantita.
4. **Audit "Pulizia Flussi Deprecati & Anti-Duplicazione UI"**:
   - Quando viene integrato un flusso moderno (es. gestione squadre per classe via Hub), l'agente deve verificare e rimuovere o nascondere gli elementi storici superati (vecchi `joinCode` squadra a 6 cifre, vecchi form di associazione codice dismessi, duplicazioni tra tab).
5. **Audit "Layout & Conflitti CSS su Componenti Interattivi"**:
   - Nelle righe con input/select e pulsanti adiacenti (es. barre di assegnazione), i bottoni devono avere stili protetti (`width: auto !important; flex-shrink: 0; white-space: nowrap;`) per non schiacciare o occultare i campi input a causa di classi globali aggressive (`.btn { width: 100% }`).
6. **Audit Database JSON**: Validazione di tutti i file JSON tramite parser automatico per certificare l'assenza di errori di sintassi, virgole mancanti o codifica.
7. **Audit Coerenza DOM / JS**: Verifica che nessun metodo JS referenzi ID o classi cancellati o inesistenti.
8. **Audit Working Tree**: Controllo di git diff e git status per verificare che non ci siano file sporchi o modifiche collaterali non intenzionali.

---

### ART. 6 - MODALITA CONSULTIVA (READ-ONLY) SU DOMANDE ESPLORATIVE
- Quando l'utente formula domande di parere, riflessione o strategia ("che ne pensi?", "come la vedi?", "cosa faresti?"), l'agente opera in modalita rigorosamente **READ-ONLY**.
- In questa modalita e vietato modificare file, eseguire comandi distruttivi o avviare refactoring: l'agente deve limitarsi a fornire analisi obiettive, confronti tecnici e proposte dettagliate in attesa dell'approvazione esplicita.

---

### ART. 7 - GESTIONE BRANCH E PUSH GIT
- Tutti i test, le verifiche e le nuove implementazioni DEVONO essere committati e spinti esclusivamente sul branch **preview** (git push origin preview).
- E' fatto divieto assoluto di eseguire il push diretto sul branch main a meno di esplicito comando di rilascio in produzione da parte dell'utente.
