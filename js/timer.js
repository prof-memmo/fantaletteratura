(function() {
    let sessionInterval = null;
    let secondsElapsed = 0;
    const SESSION_MAX = 45 * 60; // 45 minuti
    const PAUSE_MAX = 15 * 60;   // 15 minuti
    let inPause = false;
    let pauseSeconds = PAUSE_MAX;

    // API Esposta
    window.FantaTimer = {
        startSession: function(email) {
            const today = new Date().toLocaleDateString();
            let data = JSON.parse(localStorage.getItem('fanta_student_sessions') || '{}');
            if (!data[email]) data[email] = { date: today, sessionsCompleted: 0 };
            
            // Check day reset
            if (data[email].date !== today) {
                data[email] = { date: today, sessionsCompleted: 0 };
                localStorage.setItem('fanta_student_sessions', JSON.stringify(data));
            }

            if (data[email].sessionsCompleted >= 2) {
                alert("Hai già completato le 2 sessioni di studio giornaliere previste. Torna domani!");
                // Force logout
                if (window.fanta_db && window.fanta_db.logout) window.fanta_db.logout();
                return;
            }

            // Start timer
            secondsElapsed = 0;
            inPause = false;
            if (sessionInterval) clearInterval(sessionInterval);
            
            sessionInterval = setInterval(() => {
                if (inPause) {
                    pauseSeconds--;
                    const m = Math.floor(pauseSeconds / 60).toString().padStart(2, '0');
                    const s = (pauseSeconds % 60).toString().padStart(2, '0');
                    const countdownEl = document.getElementById('pausa-countdown');
                    if (countdownEl) countdownEl.textContent = m + ':' + s;

                    if (pauseSeconds <= 0) {
                        inPause = false;
                        clearInterval(sessionInterval);
                        data[email].sessionsCompleted++;
                        localStorage.setItem('fanta_student_sessions', JSON.stringify(data));
                        
                        // Stop video
                        const video = document.getElementById('gatto-video');
                        if (video) video.pause();
                        
                        alert("Pausa terminata. Hai completato una sessione di studio!");
                        if (data[email].sessionsCompleted >= 2) {
                            alert("Hai completato le tue sessioni per oggi. A domani!");
                            if (window.fanta_db && window.fanta_db.logout) window.fanta_db.logout();
                        } else {
                            if (window.navigateTo) window.navigateTo('view-studenti');
                        }
                    }
                } else {
                    secondsElapsed++;
                    if (secondsElapsed >= SESSION_MAX) {
                        // Inizia la pausa
                        inPause = true;
                        pauseSeconds = PAUSE_MAX;
                        if (window.navigateTo) window.navigateTo('view-pausa-obbligatoria');
                        const video = document.getElementById('gatto-video');
                        if (video) {
                            video.muted = true;
                            video.play().catch(e => console.log('Video autoplay error:', e));
                        }
                    }
                }
            }, 1000);
        },

        stopSession: function() {
            if (sessionInterval) clearInterval(sessionInterval);
            const video = document.getElementById('gatto-video');
            if (video) video.pause();
        }
    };
})();
