import re
import os

app_path = "js/app.js"
admin_path = "admin.html"

with open(app_path, "r", encoding="utf-8") as f:
    app_js = f.read()

# 1. UPDATE archiviaAnnoCorrente
old_archivia = r"""            usersSnapshot\.docs\.forEach\(doc => \{
                const data = doc\.data\(\);
                if \(data\.role !== 'admin' && data\.role !== 'docente'\) \{
                    batch\.update\(doc\.ref, \{ archivedYear: backupName, status: 'archived', teamId: null, teamCode: null \}\);
                \}
            \}\);

            teamsSnapshot\.docs\.forEach\(doc => \{
                batch\.update\(doc\.ref, \{ archivedYear: backupName, status: 'archived' \}\);
            \}\);"""

new_archivia = """            // CREATE SNAPSHOT FOR THE ARCHIVE
            let leaderboard = [];
            teamsSnapshot.docs.forEach(doc => {
                const data = doc.data();
                if(data.status !== 'archived') {
                    leaderboard.push({
                        id: doc.id,
                        name: data.name,
                        points: data.points || 0,
                        dracme: data.dracme || data.coins || 0,
                        school: data.school || '',
                        classRoom: data.classRoom || ''
                    });
                    batch.update(doc.ref, { archivedYear: backupName, status: 'archived' });
                }
            });
            leaderboard.sort((a,b) => b.points - a.points);
            
            const archiveRef = window.db.collection('archives').doc();
            batch.set(archiveRef, {
                yearName: backupName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                leaderboard: leaderboard
            });

            usersSnapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.role !== 'admin' && data.role !== 'docente' && data.status !== 'archived') {
                    batch.update(doc.ref, { 
                        archivedYear: backupName, 
                        status: 'archived', 
                        archivedTeamId: data.teamId || null,
                        archivedTeamCode: data.teamCode || null,
                        teamId: null, 
                        teamCode: null 
                    });
                }
            });"""

app_js = app_js.replace(old_archivia, new_archivia)

# 2. ADD ripristinaAnnoArchiviato & loadHistoricalArchives
new_functions = """    window.ripristinaAnnoArchiviato = async function(backupName) {
        if(currentUserEmail !== 'prof.memmo@gmail.com') return;
        if(!confirm(`Sei ASSOLUTAMENTE sicuro di voler RIPRISTINARE l'anno archiviato "${backupName}"?\\nQuesta operazione rimetterà in gioco tutte le squadre e gli studenti di quell'anno.`)) return;
        try {
            const usersSnapshot = await window.db.collection('users').where('archivedYear', '==', backupName).get();
            const teamsSnapshot = await window.db.collection('teams').where('archivedYear', '==', backupName).get();
            const archivesSnapshot = await window.db.collection('archives').where('yearName', '==', backupName).get();
            
            let batch = window.db.batch();
            
            usersSnapshot.docs.forEach(doc => {
                const data = doc.data();
                batch.update(doc.ref, { 
                    status: 'active', 
                    teamId: data.archivedTeamId || null, 
                    teamCode: data.archivedTeamCode || null,
                    archivedYear: firebase.firestore.FieldValue.delete(),
                    archivedTeamId: firebase.firestore.FieldValue.delete(),
                    archivedTeamCode: firebase.firestore.FieldValue.delete()
                });
            });

            teamsSnapshot.docs.forEach(doc => {
                batch.update(doc.ref, { 
                    status: 'approved',
                    archivedYear: firebase.firestore.FieldValue.delete()
                });
            });

            archivesSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            alert(`Ripristino dell'anno "${backupName}" completato con successo!`);
            window.location.reload();
        } catch(e) {
            console.error(e);
            alert("Errore durante il ripristino: " + e.message);
        }
    };

    window.loadHistoricalArchives = async function() {
        if(currentUserEmail !== 'prof.memmo@gmail.com') return;
        try {
            const snapshot = await window.db.collection('archives').orderBy('timestamp', 'desc').get();
            const container = document.getElementById('admin-historical-archives-list');
            if(!container) return;
            
            if(snapshot.empty) {
                container.innerHTML = '<p style="color:var(--text-muted); font-size: 0.9rem;">Nessun anno archiviato trovato.</p>';
                return;
            }
            
            let html = '<div style="display: flex; flex-direction: column; gap: 15px;">';
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const d = data.timestamp ? data.timestamp.toDate().toLocaleDateString() : 'Data Sconosciuta';
                
                let lbHtml = '<div style="margin-top:10px; display:none; background:rgba(0,0,0,0.2); padding:10px; border-radius:6px;" id="archive-lb-'+doc.id+'">';
                lbHtml += '<h4 style="margin-bottom:10px; color:var(--gold); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">Classifica Finale</h4>';
                
                if(data.leaderboard && data.leaderboard.length > 0) {
                    data.leaderboard.forEach((t, i) => {
                        let badge = '';
                        if(i===0) badge = '🥇';
                        else if(i===1) badge = '🥈';
                        else if(i===2) badge = '🥉';
                        else badge = (i+1)+'°';
                        
                        lbHtml += `<div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px dashed rgba(255,255,255,0.05); font-size:0.9rem;">
                            <span>${badge} <strong>${t.name}</strong> <span style="color:var(--text-muted); font-size:0.8rem;">(${t.classRoom} - ${t.school})</span></span>
                            <span style="color:var(--gold); font-weight:bold;">${t.points} pt</span>
                        </div>`;
                    });
                } else {
                    lbHtml += '<p style="font-size:0.85rem; color:var(--text-muted);">Classifica non disponibile o vuota.</p>';
                }
                lbHtml += '</div>';

                html += `
                <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <h4 style="margin: 0; color: var(--text-light); font-size: 1.1rem;"><i class="fa-solid fa-box-archive" style="color:var(--accent-gold);"></i> ${data.yearName}</h4>
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Archiviato il: ${d}</div>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="const el = document.getElementById('archive-lb-${doc.id}'); el.style.display = el.style.display === 'none' ? 'block' : 'none';"><i class="fa-solid fa-eye"></i> Classifica</button>
                            <button class="btn text-danger" style="background: rgba(231, 76, 60, 0.1); border: 1px solid var(--danger-color); padding: 6px 12px; font-size: 0.8rem;" onclick="window.ripristinaAnnoArchiviato('${data.yearName}')"><i class="fa-solid fa-rotate-left"></i> Ripristina</button>
                        </div>
                    </div>
                    ${lbHtml}
                </div>`;
            });
            html += '</div>';
            container.innerHTML = html;
        } catch(e) {
            console.error("Errore caricamento archivio storico:", e);
        }
    };
"""

if "window.ripristinaAnnoArchiviato" not in app_js:
    # Insert new functions right after archiviaAnnoCorrente
    parts = app_js.split('window.archiviaAnnoCorrente = async function() {')
    if len(parts) > 1:
        part2 = parts[1]
        subparts = part2.split('};', 1)
        if len(subparts) > 1:
            app_js = parts[0] + 'window.archiviaAnnoCorrente = async function() {' + subparts[0] + '};\n\n' + new_functions + subparts[1]

# Also, we need to make sure `loadHistoricalArchives` is called when admin view loads
load_teams_hook = r"window.loadTeacherSquadre = async function() {"
new_load_teams = r"""window.loadTeacherSquadre = async function() {
        if(window.loadHistoricalArchives) window.loadHistoricalArchives();"""
app_js = app_js.replace(load_teams_hook, new_load_teams)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_js)

# 3. UPDATE admin.html
with open(admin_path, "r", encoding="utf-8") as f:
    admin_html = f.read()

admin_archivio_ui = """                    <div id="admin-master-area" style="display:none; margin-bottom: 20px; padding: 15px; border: 1px solid var(--danger-color); border-radius: 10px; background: rgba(231, 76, 60, 0.1);">
                        <h3 class="text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Danger Zone: Archiviazione Annuale</h3>
                        <p style="font-size: 0.85rem; margin-bottom: 10px;">Questa opzione trasferisce tutte le squadre e studenti dell'anno in corso nell'Archivio Storico, resettando le classifiche. Non è reversibile!</p>
                        <button type="button" class="btn text-danger" style="background: transparent; border: 1px solid var(--danger-color);" onclick="window.archiviaAnnoCorrente()"><i class="fa-solid fa-box-archive"></i> Esegui Archiviazione Anno</button>
                    </div>"""

new_admin_archivio_ui = """                    <div id="admin-master-area" style="display:none; margin-bottom: 20px; padding: 15px; border: 1px solid var(--danger-color); border-radius: 10px; background: rgba(231, 76, 60, 0.1);">
                        <h3 class="text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Danger Zone: Archiviazione Annuale</h3>
                        <p style="font-size: 0.85rem; margin-bottom: 10px;">Questa opzione archivia tutte le squadre e studenti dell'anno in corso, salvandone una "fotografia" della classifica. Se necessario, l'operazione potrà essere annullata dall'Archivio Storico.</p>
                        <button type="button" class="btn text-danger" style="background: transparent; border: 1px solid var(--danger-color);" onclick="window.archiviaAnnoCorrente()"><i class="fa-solid fa-box-archive"></i> Esegui Archiviazione Anno</button>
                    </div>

                    <div id="admin-historical-archives-area" style="display:none; margin-bottom: 30px; padding: 15px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255, 255, 255, 0.02);">
                        <h3 style="color: var(--accent-gold); margin-top:0;"><i class="fa-solid fa-clock-rotate-left"></i> Archivio Storico</h3>
                        <p style="font-size: 0.85rem; margin-bottom: 15px; color: var(--text-muted);">Consulta le classifiche degli anni passati o ripristina un anno archiviato per errore.</p>
                        <div id="admin-historical-archives-list">
                            <p style="font-size: 0.85rem; color: var(--text-muted);">Caricamento archivio in corso...</p>
                        </div>
                    </div>"""

admin_html = admin_html.replace(admin_archivio_ui, new_admin_archivio_ui)

# Need to show the historical archives area for the admin
show_master_area = r"document.getElementById('admin-master-area').style.display = 'block';"
new_show_master_area = r"""document.getElementById('admin-master-area').style.display = 'block';
                    const histArea = document.getElementById('admin-historical-archives-area');
                    if(histArea) histArea.style.display = 'block';"""
admin_html = admin_html.replace(show_master_area, new_show_master_area)

with open(admin_path, "w", encoding="utf-8") as f:
    f.write(admin_html)

print("Patch applied to Fantaletteratura.")
