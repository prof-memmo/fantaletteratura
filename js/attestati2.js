(function() {
    let _attestatoImage = null;
    let _logoProfImage = null;
    let _logoFantaImage = null;

    window.apriAttestati = function() {
        const overlay = document.getElementById('admin-view-attestati');
        if (!overlay) return;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        _caricaRisorseEDisegna();
    };

    window.chiudiAttestati = function() {
        const overlay = document.getElementById('admin-view-attestati');
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    function _caricaRisorseEDisegna() {
        if (!_attestatoImage) {
            _attestatoImage = new Image();
            _attestatoImage.crossOrigin = "anonymous";
            _attestatoImage.src = 'assets/locandine/attestato_bg.png';
            _attestatoImage.onload = () => _disegnaAttestato();
            _attestatoImage.onerror = () => {
                console.warn("Nessuno sfondo attestato trovato.");
                _disegnaAttestato();
            }
        }
        if (!_logoProfImage) {
            _logoProfImage = new Image();
            _logoProfImage.crossOrigin = "anonymous";
            _logoProfImage.src = 'assets/prof_memmo.png';
            _logoProfImage.onload = () => _disegnaAttestato();
        }
        if (!_logoFantaImage) {
            _logoFantaImage = new Image();
            _logoFantaImage.crossOrigin = "anonymous";
            _logoFantaImage.src = 'assets/logo.png';
            _logoFantaImage.onload = () => _disegnaAttestato();
        }
        if (_attestatoImage && _logoProfImage && _logoFantaImage) {
            _disegnaAttestato();
        }
    }

    window.aggiornaAnteprimaAttestato = function() {
        _disegnaAttestato();
    };

    function _disegnaAttestato() {
        const canvas = document.getElementById('attestato-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = 1600;
        canvas.height = 1131;

        if (_attestatoImage && _attestatoImage.complete && _attestatoImage.naturalHeight !== 0) {
            ctx.drawImage(_attestatoImage, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = "#1e1e1e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#f1c40f";
            ctx.lineWidth = 15;
            ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
        }

        const nome = (document.getElementById('attestato-nome') || {}).value || '';
        const campionato = (document.getElementById('attestato-campionato') || {}).value || '';
        const anno = (document.getElementById('attestato-anno') || {}).value || '';

        // Fantaletteratura Logo top center
        if (_logoFantaImage && _logoFantaImage.complete && _logoFantaImage.naturalHeight !== 0) {
            const logoW = 200;
            const logoH = (_logoFantaImage.height / _logoFantaImage.width) * logoW;
            ctx.drawImage(_logoFantaImage, (canvas.width - logoW)/2, 100, logoW, logoH);
        }

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 60px Arial";
        ctx.fillText("ATTESTATO DI PARTECIPAZIONE", canvas.width / 2, 350);

        ctx.font = "40px Arial";
        ctx.fillText("Si attesta che", canvas.width / 2, 430);

        ctx.fillStyle = "#f1c40f";
        ctx.font = "bold 75px Arial";
        if (nome) {
            ctx.fillText(nome.toUpperCase(), canvas.width / 2, 540);
        } else {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 300, 560);
            ctx.lineTo(canvas.width / 2 + 300, 560);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(255,255,255,0.4)";
            ctx.stroke();
        }

        ctx.fillStyle = "#ffffff";
        ctx.font = "40px Arial";
        ctx.fillText("ha partecipato con successo a", canvas.width / 2, 650);

        ctx.font = "bold 50px Arial";
        if (campionato) {
            ctx.fillText(campionato, canvas.width / 2, 740);
        } else {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 250, 760);
            ctx.lineTo(canvas.width / 2 + 250, 760);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(255,255,255,0.4)";
            ctx.stroke();
        }

        ctx.font = "35px Arial";
        if (anno) {
            ctx.fillText("Anno Scolastico " + anno, canvas.width / 2, 850);
        } else {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 150, 870);
            ctx.lineTo(canvas.width / 2 + 150, 870);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(255,255,255,0.4)";
            ctx.stroke();
            ctx.fillText("Anno Scolastico", canvas.width / 2, 830);
        }

        if (_logoProfImage && _logoProfImage.complete && _logoProfImage.naturalHeight !== 0) {
            const logoW = 200;
            const logoH = (_logoProfImage.height / _logoProfImage.width) * logoW;
            ctx.drawImage(_logoProfImage, canvas.width - logoW - 120, canvas.height - logoH - 120, logoW, logoH);
            
            ctx.font = "italic 30px Arial";
            ctx.textAlign = "right";
            ctx.fillText("Prof. Memmo", canvas.width - 120, canvas.height - 90);
        } else {
            ctx.font = "italic 40px Arial";
            ctx.textAlign = "right";
            ctx.fillText("Prof. Memmo", canvas.width - 120, canvas.height - 120);
        }
    }

    window.scaricaAttestato = function() {
        const canvas = document.getElementById('attestato-canvas');
        if (!canvas) return;
        const link = document.createElement('a');
        const nome = (document.getElementById('attestato-nome') || {}).value || 'vuoto';
        link.download = `attestato_${nome.replace(/\s+/g, '_').toLowerCase()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
    };
})();
