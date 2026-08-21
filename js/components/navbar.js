function setupNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');

    // Handle bottom navigation
    tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetView = tab.getAttribute('data-view');
            if (targetView) {
                e.preventDefault();
                navigateTo(targetView);
            }
        });
    });
}

function navigateTo(viewId, pushHistory = true) {
    if (viewId === 'view-contatti') {
        window.open('https://prof-memmo.github.io/games/contatti.html', '_blank');
        return;
    }

    // ACCESSO E PROTEZIONE NAVIGAZIONE
    const isPublicView = ['view-welcome', 'view-onboarding', 'view-regolamento'].includes(viewId);
    const hasStudentCode = localStorage.getItem('fanta_active_team_code');
    const isDocente = !!currentUserEmail;

    // Restrizioni per Studenti
    const isRestrictedForStudents = ['view-profilo', 'view-squadra', 'view-missioni'].includes(viewId);
    const userRole = (typeof currentUserRole !== 'undefined' ? currentUserRole : '') || localStorage.getItem('fanta_user_role') || (hasStudentCode && !isDocente ? 'studente' : '');

    if (isRestrictedForStudents && (userRole === 'studente' || (hasStudentCode && !isDocente))) {
        alert("Questa sezione è riservata ai docenti e fantamici.");
        navigateTo('view-welcome', pushHistory);
        return;
    }

    if (!isPublicView && !hasStudentCode && !isDocente) {
        // Blocco totale per utenti non loggati che provano ad accedere a sezioni riservate
        alert("Devi prima effettuare l'accesso per visitare questa sezione.");
        navigateTo('view-welcome', pushHistory);
        return;
    }

    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
        view.style.display = ''; // Remove any inline display block/none
    });
    
    // Show target view
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.add('active');
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Dynamic refresh
    if(viewId === 'view-missioni' && typeof renderMissioniUtente === 'function') {
        renderMissioniUtente();
    }
    if(viewId === 'view-profilo') {
        renderProfilo();
    }
    if(viewId === 'view-schede') {
        if(typeof window.segnaTuttiAutoriRivelatiComeVisti === 'function') {
            window.segnaTuttiAutoriRivelatiComeVisti();
        }
    }

    // Hightlight side-menu active link
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('data-view') === viewId) {
            link.classList.add('active');
        }
    });

    // Hightlight bottom-bar active tab
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
        if(tab.getAttribute('data-view') === viewId) {
            tab.classList.add('active');
        }
    });
    
    // Update Browser History if requested
    if(pushHistory && viewId !== 'view-welcome') {
        window.history.pushState({view: viewId}, '', '#' + viewId);
    } else if (pushHistory && viewId === 'view-welcome') {
        window.history.pushState({view: viewId}, '', window.location.pathname);
    }
}
