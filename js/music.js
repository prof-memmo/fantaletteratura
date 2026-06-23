const MusicPlayer = {
    tracks: [
        "Aeris - Moving Mountains (freetouse.com).mp3",
        "Aeris - Pure Dream (freetouse.com).mp3",
        "Epic Spectrum - Sky Clearing (freetouse.com).mp3",
        "Guillermo Guareschi - A Sweet Story (freetouse.com).mp3",
        "Guillermo Guareschi - Libellule (freetouse.com).mp3",
        "Moavii - Butterflies (freetouse.com).mp3",
        "Nebulite - Wedding Waltz (freetouse.com).mp3",
        "Orchestronika - Power of Nature (freetouse.com).mp3",
        "Pufino - Enlivening (freetouse.com).mp3",
        "Pufino - Loving (freetouse.com).mp3",
        "Pufino - Thoughtful (freetouse.com).mp3"
    ],
    currentTrackIndex: 0,
    audioElement: null,
    isPlaying: false,
    isShuffle: false, // Nuova opzione per riproduzione casuale

    init: function() {
        if (!this.audioElement) {
            this.audioElement = new Audio();
            this.audioElement.loop = false;
            this.audioElement.volume = 0.3;
            this.audioElement.addEventListener('ended', () => this.nextTrack());
            this.loadTrack(this.currentTrackIndex);
        }
    },

    loadTrack: function(index) {
        if (index < 0) index = this.tracks.length - 1;
        if (index >= this.tracks.length) index = 0;
        this.currentTrackIndex = index;
        this.audioElement.src = `assets/Musica/${this.tracks[this.currentTrackIndex]}`;
        this.updateUI();
    },

    togglePlay: function() {
        if (!this.audioElement) this.init();

        if (this.isPlaying) {
            this.audioElement.pause();
            this.isPlaying = false;
            this.updateUI();
        } else {
            this._doPlay();
        }
    },

    toggleShuffle: function() {
        this.isShuffle = !this.isShuffle;
        this.updateUI();
    },

    // Avvia la riproduzione (interno)
    _doPlay: function() {
        if (!this.audioElement) this.init();
        if (localStorage.getItem('fanta_audio_muted') === 'true') return;

        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updateUI();
            }).catch(() => {
                // Autoplay bloccato dal browser — riprova al primo click (listener globale)
                this.isPlaying = false;
                this.updateUI();
            });
        } else {
            this.isPlaying = true;
            this.updateUI();
        }
    },

    nextTrack: function() {
        if (!this.audioElement) this.init();
        
        let nextIndex;
        if (this.isShuffle) {
            // Seleziona un indice casuale diverso da quello attuale
            do {
                nextIndex = Math.floor(Math.random() * this.tracks.length);
            } while (nextIndex === this.currentTrackIndex && this.tracks.length > 1);
        } else {
            nextIndex = this.currentTrackIndex + 1;
        }
        
        this.loadTrack(nextIndex);
        if (this.isPlaying) {
            this.audioElement.play().catch(() => {
                this.isPlaying = false;
                this.updateUI();
            });
        }
    },

    prevTrack: function() {
        if (!this.audioElement) this.init();
        let prevIndex = this.currentTrackIndex - 1;
        this.loadTrack(prevIndex);
        if (this.isPlaying) {
            this.audioElement.play().catch(() => {
                this.isPlaying = false;
                this.updateUI();
            });
        }
    },

    updateUI: function() {
        const titleEls = document.querySelectorAll('.music-track-title');
        const playBtnEls = document.querySelectorAll('.music-play-btn');
        const shuffleBtnEls = document.querySelectorAll('.music-shuffle-btn');
        
        if (titleEls.length > 0) {
            let title = this.tracks[this.currentTrackIndex].replace(" (freetouse.com).mp3", "");
            titleEls.forEach(el => el.textContent = title);
        }
        if (playBtnEls.length > 0) {
            const iconHtml = this.isPlaying
                ? '<i class="fa-solid fa-pause"></i>'
                : '<i class="fa-solid fa-play"></i>';
            playBtnEls.forEach(el => el.innerHTML = iconHtml);
        }
        if (shuffleBtnEls.length > 0) {
            shuffleBtnEls.forEach(el => {
                if (this.isShuffle) {
                    el.style.color = 'var(--accent-gold)';
                    el.style.textShadow = '0 0 5px rgba(212,175,55,0.5)';
                } else {
                    el.style.color = 'white';
                    el.style.textShadow = 'none';
                }
            });
        }
    },
    
    togglePopup: function() {
        const popup = document.getElementById('music-player-popup');
        if (popup) {
            if (popup.style.display === 'none' || popup.style.display === '') {
                popup.style.display = 'block';
                setTimeout(() => popup.classList.add('visible'), 10);
            } else {
                popup.classList.remove('visible');
                setTimeout(() => popup.style.display = 'none', 300);
            }
        }
    }
};

window.MusicPlayer = MusicPlayer;

// Inizializza al caricamento DOM
document.addEventListener('DOMContentLoaded', () => {
    MusicPlayer.init();

    // Tenta autoplay immediato
    setTimeout(() => {
        MusicPlayer._doPlay();
    }, 800);
});

// Fallback: avvia al primo click/touch se ancora non in play
(function() {
    let _started = false;
    function startOnInteraction(e) {
        if (_started) return;
        
        // Se il click avviene su un pulsante audio o popup, non forziamo l'autoplay automatico
        if (e && e.target) {
            const isAudioBtn = e.target.closest('.music-control-btn') ||
                               e.target.closest('.music-play-btn') ||
                               e.target.closest('#btn-toggle-music-popup');
            if (isAudioBtn) {
                _started = true;
                document.removeEventListener('click', startOnInteraction, true);
                document.removeEventListener('touchstart', startOnInteraction, true);
                document.removeEventListener('keydown', startOnInteraction, true);
                return;
            }
        }
        
        _started = true;
        document.removeEventListener('click', startOnInteraction, true);
        document.removeEventListener('touchstart', startOnInteraction, true);
        document.removeEventListener('keydown', startOnInteraction, true);
        setTimeout(() => {
            if (window.MusicPlayer && !window.MusicPlayer.isPlaying) {
                window.MusicPlayer._doPlay();
            }
        }, 300);
    }
    document.addEventListener('click', startOnInteraction, true);
    document.addEventListener('touchstart', startOnInteraction, true);
    document.addEventListener('keydown', startOnInteraction, true);
})();
