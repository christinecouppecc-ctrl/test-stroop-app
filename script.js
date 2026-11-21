// ============ COULEURS ============
const COULEURS = [
    { nom: 'ROUGE', css: '#e74c3c' },
    { nom: 'BLEU', css: '#3498db' },
    { nom: 'VERT', css: '#27ae60' },
    { nom: 'JAUNE', css: '#f1c40f' }
];

// ============ SÉLECTEURS ============
const screenStart = document.getElementById('screen-start');
const screenGame = document.getElementById('screen-game');
const screenEnd = document.getElementById('screen-end');
const screenStats = document.getElementById('screen-stats');

const playerInput = document.getElementById('player-input');
const roundsInput = document.getElementById('rounds-input');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const btnEndStats = document.getElementById('btn-end-stats');
const btnHome = document.getElementById('btn-home');
// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_REFERENCE_START
const btnEmailResults = document.getElementById('btn-email-results');
// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_REFERENCE_END
const smsPhoneInput = document.getElementById('sms-phone-input');
const btnSmsResults = document.getElementById('btn-sms-results');

const playerName = document.getElementById('player-name');
const progress = document.getElementById('progress');
const wordDiv = document.getElementById('word');
const answersDiv = document.getElementById('answers');
const feedback = document.getElementById('feedback');

const resultPlayer = document.getElementById('result-player');
const resultScore = document.getElementById('result-score');
const resultAccuracy = document.getElementById('result-accuracy');
const resultReaction = document.getElementById('result-reaction');
const resultRecord = document.getElementById('result-record');

const historyBox = document.getElementById('history-box');
const historyName = document.getElementById('history-name');
const historyList = document.getElementById('history-list');
const historyBest = document.getElementById('history-best');

const statsPlayerInput = document.getElementById('stats-player-input');
const statsContent = document.getElementById('stats-content');
const statsEmpty = document.getElementById('stats-empty');
const statsRoundFilter = document.getElementById('stats-round-filter');
const btnExportCsv = document.getElementById('btn-export-csv');
const statsTableBody = document.getElementById('stats-table-body');
const statTotal = document.getElementById('stat-total');
const statBest = document.getElementById('stat-best');
const statAvgAccuracy = document.getElementById('stat-avg-accuracy');
const statAvgReaction = document.getElementById('stat-avg-reaction');

// ============ VARIABLES DU JEU ============
let joueur = '';
let nbTours = 10;
let tourActuel = 0;
let score = 0;
let tempsDebutQuestion = 0;
let tempsReactions = [];
let questionVerrouillee = false;
let timeoutQuestion = null;

// ============ SAUVEGARDE (localStorage) ============
function chargerToutesLesParties() {
    try {
        const parties = JSON.parse(localStorage.getItem('stroop_parties') || '{}');
        return parties && typeof parties === 'object' && !Array.isArray(parties)
            ? parties
            : {};
    } catch (error) {
        console.warn('Historique illisible :', error);
        return {};
    }
}

function partiesDe(nom) {
    if (!nom) return [];
    const tout = chargerToutesLesParties();
    return Array.isArray(tout[nom]) ? tout[nom] : [];
}

function sauvegarderPartie(partie) {
    const tout = chargerToutesLesParties();
    if (!Array.isArray(tout[joueur])) tout[joueur] = [];
    tout[joueur].push(partie);
    try {
        localStorage.setItem('stroop_parties', JSON.stringify(tout));
    } catch (error) {
        console.warn('Impossible de sauvegarder la partie :', error);
    }
}

// ============ HISTORIQUE SUR L'ÉCRAN D'ACCUEIL ============
playerInput.addEventListener('input', () => {
    const nom = playerInput.value.trim();
    const parties = partiesDe(nom);

    if (nom !== '' && parties.length > 0) {
        historyBox.classList.remove('hidden');
        historyName.textContent = nom;
        historyList.innerHTML = '';

        // 5 dernières parties (plus récentes en premier)
        [...parties].reverse().slice(0, 5).forEach(p => {
            const li = document.createElement('li');
            li.textContent = p.date + ' — ' + p.score + '/' + p.tours +
                ' (' + p.precision + '%, ' + p.reactionMoyenne + ' ms)';
            historyList.appendChild(li);
        });

        const meilleur = Math.max(...parties.map(p => p.score));
        historyBest.textContent = '🏆 Meilleur score : ' + meilleur;
    } else {
        historyBox.classList.add('hidden');
    }
});

// ============ DÉMARRAGE ============
btnStart.onclick = () => {
    const nom = playerInput.value.trim();
    if (nom === '') {
        alert('Veuillez entrer votre nom ! 😊');
        playerInput.focus();
        return;
    }

    joueur = nom;
    nbTours = parseInt(roundsInput.value, 10);
    if (isNaN(nbTours) || nbTours < 5) nbTours = 5;
    if (nbTours > 50) nbTours = 50;
    roundsInput.value = nbTours;

    tourActuel = 0;
    score = 0;
    tempsReactions = [];
    questionVerrouillee = false;

    screenStart.classList.add('hidden');
    screenGame.classList.remove('hidden');

    playerName.textContent = joueur;
    prochaineQuestion();
};

btnRestart.onclick = () => {
    clearTimeout(timeoutQuestion);
    screenEnd.classList.add('hidden');
    screenStart.classList.remove('hidden');
    playerInput.dispatchEvent(new Event('input'));
};

btnHome.onclick = () => {
    clearTimeout(timeoutQuestion);
    screenEnd.classList.add('hidden');
    screenStart.classList.remove('hidden');
    playerInput.dispatchEvent(new Event('input'));
};

// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_HANDLER_START
btnEmailResults.onclick = () => {
    const contenu = contenuDesResultats();
    const sujet = 'Résultats du Test de Stroop - ' + joueur;

    window.location.href = 'mailto:' + encodeURIComponent(window.STROOP_CONTACTS.email) + '?subject=' +
        encodeURIComponent(sujet) + '&body=' + encodeURIComponent(contenu);
};
// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_HANDLER_END

btnSmsResults.onclick = () => {
    const numero = smsPhoneInput.value.trim().replace(/[\s().-]/g, '');
    if (!/^\+?\d{6,15}$/.test(numero)) {
        alert('Veuillez saisir un numéro valide (6 à 15 chiffres).');
        smsPhoneInput.focus();
        return;
    }

    window.location.href = 'sms:' + numero + '?body=' + encodeURIComponent(contenuDesResultats());
};

function contenuDesResultats() {
    const precision = Math.round((score / nbTours) * 100);
    const reactionMoyenne = tempsReactions.length
        ? Math.round(tempsReactions.reduce((total, temps) => total + temps, 0) / tempsReactions.length)
        : 0;
    return [
        'Résultats du Test de Stroop',
        'Joueur : ' + joueur,
        'Score : ' + score + '/' + nbTours,
        'Précision : ' + precision + '%',
        'Temps de réaction moyen : ' + reactionMoyenne + ' ms'
    ].join('\n');
}

btnEndStats.onclick = () => {
    clearTimeout(timeoutQuestion);
    screenEnd.classList.add('hidden');
    screenStats.classList.remove('hidden');
    statsPlayerInput.value = joueur;
    afficherStats(joueur, true);
};

// ============ LOGIQUE DU JEU ============
function couleurAleatoire(sauf) {
    let c;
    do {
        c = COULEURS[Math.floor(Math.random() * COULEURS.length)];
    } while (sauf && c.nom === sauf.nom);
    return c;
}

function prochaineQuestion() {
    if (tourActuel >= nbTours) {
        finDuJeu();
        return;
    }

    questionVerrouillee = false;
    tourActuel++;
    progress.textContent = tourActuel + '/' + nbTours;
    feedback.textContent = '';

    // Choisir le mot et la couleur de l'encre
    const motAffiche = couleurAleatoire(null);
    let couleurEncre = couleurAleatoire(motAffiche);

    wordDiv.textContent = motAffiche.nom;
    wordDiv.style.color = couleurEncre.css;

    // Générer les 4 boutons de réponse (mélangés)
    const reponses = [...COULEURS].sort(() => Math.random() - 0.5);
    answersDiv.innerHTML = '';

    reponses.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = c.nom;
        btn.style.background = c.css;
        btn.onclick = () => verifierReponse(c, couleurEncre);
        answersDiv.appendChild(btn);
    });

    // Démarrer le chronomètre de réaction
    tempsDebutQuestion = performance.now();
}

function verifierReponse(choix, bonneReponse) {
    if (questionVerrouillee) return;
    questionVerrouillee = true;

    const tempsReaction = Math.round(performance.now() - tempsDebutQuestion);
    tempsReactions.push(tempsReaction);
    answersDiv.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
    });

    if (choix.nom === bonneReponse.nom) {
        score++;
        feedback.textContent = '✅ Correct ! (' + tempsReaction + ' ms)';
        feedback.className = 'good';
    } else {
        feedback.textContent = '❌ Faux ! (' + tempsReaction + ' ms)';
        feedback.className = 'bad';
    }

    // Pause de 600ms avant la question suivante
    timeoutQuestion = setTimeout(prochaineQuestion, 600);
}

// ============ FIN DU JEU ============
function finDuJeu() {
    screenGame.classList.add('hidden');
    screenEnd.classList.remove('hidden');

    const precision = Math.round((score / nbTours) * 100);
    const moyenne = tempsReactions.length
        ? Math.round(tempsReactions.reduce((a, b) => a + b, 0) / tempsReactions.length)
        : 0;

    resultPlayer.textContent = '👤 ' + joueur;
    resultScore.textContent = '🎯 Score : ' + score + '/' + nbTours;
    resultAccuracy.textContent = '📊 Précision : ' + precision + '%';
    resultReaction.textContent = '⚡ Temps de réaction moyen : ' + moyenne + ' ms';

    // Est-ce un nouveau record pour ce joueur ?
    const anciennes = partiesDe(joueur);
    const recordPrecedent = anciennes.length > 0
        ? Math.max(...anciennes.map(p => p.score))
        : -1;

    if (score > recordPrecedent && score > 0) {
        resultRecord.textContent = '🏆 Nouveau record personnel !';
    } else {
        resultRecord.textContent = '';
    }

    // Sauvegarder la partie
    const aujourdhui = new Date().toLocaleDateString('fr-FR') + ' ' +
                       new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    sauvegarderPartie({
        date: aujourdhui,
        score: score,
        tours: nbTours,
        precision: precision,
        reactionMoyenne: moyenne
    });
}

// ============ VOLET STATISTIQUES ============
document.getElementById('btn-stats').onclick = () => {
    screenStart.classList.add('hidden');
    screenStats.classList.remove('hidden');

    // Pré-remplir avec le nom déjà saisi si présent
    statsPlayerInput.value = playerInput.value.trim();
    if (statsPlayerInput.value !== '') {
        afficherStats(statsPlayerInput.value, true);
    } else {
        statsContent.classList.add('hidden');
        statsEmpty.classList.add('hidden');
    }
};

document.getElementById('btn-stats-back').onclick = () => {
    screenStats.classList.add('hidden');
    screenStart.classList.remove('hidden');
};

document.getElementById('btn-stats-search').onclick = () => {
    afficherStats(statsPlayerInput.value.trim(), true);
};

// Lancer la recherche avec la touche Entrée
statsPlayerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') afficherStats(statsPlayerInput.value.trim(), true);
});

statsRoundFilter.addEventListener('change', () => {
    afficherStats(statsPlayerInput.value.trim());
});

btnExportCsv.addEventListener('click', () => {
    const nom = statsPlayerInput.value.trim();
    const filtreTours = statsRoundFilter.value;
    const parties = partiesDe(nom).filter(partie =>
        filtreTours === '' || Number(partie.tours) === Number(filtreTours)
    );

    if (parties.length === 0) return;

    const lignes = [
        ['Joueur', 'Date', 'Score', 'Nombre de tours', 'Précision (%)', 'Réaction moyenne (ms)'],
        ...parties.map(partie => [
            nom,
            partie.date,
            partie.score,
            partie.tours,
            partie.precision,
            partie.reactionMoyenne
        ])
    ];
    const csv = lignes.map(ligne => ligne.map(valeur => {
        const texte = String(valeur == null ? '' : valeur);
        const texteSecurise = /^[\s]*[=+\-@]/.test(texte) ? "'" + texte : texte;
        return '"' + texteSecurise.replace(/"/g, '""') + '"';
    }).join(';')).join('\r\n');

    const fichier = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(fichier);
    const lien = document.createElement('a');
    const nomFichier = nom.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_') || 'joueur';
    lien.href = url;
    lien.download = 'parties-stroop-' + nomFichier + '-' +
        new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(lien);
    lien.click();
    lien.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
});

function afficherStats(nom, reinitialiserFiltre) {
    const toutesLesParties = partiesDe(nom);

    if (nom === '' || toutesLesParties.length === 0) {
        statsContent.classList.add('hidden');
        btnExportCsv.disabled = true;
        statsEmpty.textContent = 'Aucune partie trouvée pour ce joueur 🤷';
        statsEmpty.classList.remove('hidden');
        return;
    }

    if (reinitialiserFiltre) {
        statsRoundFilter.innerHTML = '';
        const toutesOption = document.createElement('option');
        toutesOption.value = '';
        toutesOption.textContent = 'Toutes les parties';
        statsRoundFilter.appendChild(toutesOption);

        const nombresDeTours = Array.from({ length: 10 }, (_, index) => (index + 1) * 5);
        nombresDeTours.forEach(tours => {
            const option = document.createElement('option');
            option.value = String(tours);
            option.textContent = tours + ' tours';
            statsRoundFilter.appendChild(option);
        });
        statsRoundFilter.value = '';
    }

    const nombreDeToursFiltre = statsRoundFilter.value;
    const parties = nombreDeToursFiltre === ''
        ? toutesLesParties
        : toutesLesParties.filter(partie => Number(partie.tours) === Number(nombreDeToursFiltre));

    if (parties.length === 0) {
        btnExportCsv.disabled = true;
        statTotal.textContent = '0';
        statBest.textContent = '—';
        statAvgAccuracy.textContent = '—';
        statAvgReaction.textContent = '—';
        statsTableBody.innerHTML = '';
        statsEmpty.textContent = 'Aucune partie trouvée avec ' + nombreDeToursFiltre + ' tours.';
        statsEmpty.classList.remove('hidden');
        return;
    }

    statsEmpty.classList.add('hidden');
    statsContent.classList.remove('hidden');
    btnExportCsv.disabled = false;

    // ---- Stats globales ----
    statTotal.textContent = parties.length;

    const meilleur = Math.max(...parties.map(p => p.score));
    statBest.textContent = meilleur;

    const precMoyenne = Math.round(
        parties.reduce((a, p) => a + p.precision, 0) / parties.length
    );
    statAvgAccuracy.textContent = precMoyenne + '%';

    const reacMoyenne = Math.round(
        parties.reduce((a, p) => a + p.reactionMoyenne, 0) / parties.length
    );
    statAvgReaction.textContent = reacMoyenne + ' ms';

    // ---- Tableau détaillé (plus récentes en premier) ----
    statsTableBody.innerHTML = '';
    [...parties].reverse().forEach(p => {
        const tr = document.createElement('tr');

        // Mettre en avant le meilleur score
        if (p.score === meilleur) tr.classList.add('best-row');

        const tdDate = document.createElement('td');
        tdDate.textContent = p.date;
        const tdScore = document.createElement('td');
        tdScore.textContent = p.score + '/' + p.tours;
        const tdPrecision = document.createElement('td');
        tdPrecision.textContent = p.precision + '%';
        const tdReaction = document.createElement('td');
        tdReaction.textContent = p.reactionMoyenne + ' ms';

        tr.appendChild(tdDate);
        tr.appendChild(tdScore);
        tr.appendChild(tdPrecision);
        tr.appendChild(tdReaction);
        statsTableBody.appendChild(tr);
    });
}