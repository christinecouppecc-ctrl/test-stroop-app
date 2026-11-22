// ============ COULEURS ============
const COULEURS = [
    { nom: 'ROUGE', css: '#e74c3c' },
    { nom: 'BLEU', css: '#3498db' },
    { nom: 'VERT', css: '#27ae60' },
    { nom: 'JAUNE', css: '#f1c40f' }
];

const FORMES = [
    { nom: 'ROND', id: 'rond', classe: 'shape-circle' },
    { nom: 'CARRÉ', id: 'carre', classe: 'shape-square' },
    { nom: 'ÉTOILE', id: 'etoile', classe: 'shape-star' },
    { nom: 'TRIANGLE', id: 'triangle', classe: 'shape-triangle' }
];
const INTERVALLE_FORME_T3A = 15000;
const DUREE_FORME_T3A = 3000;
const PAUSE_FORME_T3A = INTERVALLE_FORME_T3A - DUREE_FORME_T3A;
const INTERVALLE_COULEUR_T3A = 800;
const JEUX = {
    stroop: {
        nom: 'Test de Stroop',
        titreResultats: 'Résultats du Test de Stroop',
        instructions: "Un mot de couleur s'affiche dans une autre couleur. Cliquez sur la couleur de l'encre, pas sur le mot.",
        prompt: "Cliquez sur la couleur de l'encre."
    },
    formes: {
        nom: 'Jeu des formes',
        titreResultats: 'Résultats du jeu des formes',
        instructions: 'Une forme est écrite en haut de l’écran. Cliquez le plus vite possible sur la forme correspondante.',
        prompt: 'Cliquez sur la forme écrite ci-dessous.'
    },
    flanker: {
        nom: 'Tâche de Flanker',
        titreResultats: 'Résultats de la tâche de Flanker',
        instructions: 'Ignorez les flèches qui entourent celle du centre. Répondez à la direction de la flèche centrale.',
        prompt: 'Indiquez la direction de la flèche centrale.'
    },
    'ax-cpt': {
        nom: 'Tâche AX-CPT',
        titreResultats: 'Résultats de la tâche AX-CPT',
        instructions: 'Mémorisez la lettre-indice, puis la lettre testée. Choisissez « Cible » uniquement si X suit l’indice A; sinon, choisissez « Pas cible ».',
        prompt: 'Mémorisez cette lettre-indice.'
    },
    nback: {
        nom: 'Tâche N-Back',
        titreResultats: 'Résultats de la tâche N-Back',
        instructions: 'Mémorisez les stimuli. Appuyez sur « Identique » uniquement si le stimulus correspond à celui présenté N essais auparavant; sinon, ne faites rien. Un oubli de cible ou un clic sur une non-cible est un échec; une non-cible ignorée est exclue des taux. Chaque stimulus change après DUREE s. Aucun temps de réaction n’est mesuré.',
        prompt: 'Appuyez sur « Identique » pour une cible; une non-cible ignorée n’est pas comptée.'
    },
    t3a: {
        nom: 'Attention partagée (inspirée du T3A)',
        titreResultats: 'Résultats de l’attention partagée',
        instructions: 'Surveillez les deux zones en même temps. Pour les formes, une forme non-cible fixe est affichée; toutes les 15 secondes, une forme aléatoire la remplace pendant 3 secondes, puis la forme fixe revient. Espace sur une cible ou absence d’Espace sur une non-cible = réussite; Espace sur une non-cible ou absence d’Espace sur une cible = erreur. Pour les couleurs : clic sur la cible = réussite; clic sur une non-cible = erreur; cible ignorée = erreur; non-cible ignorée = non comptabilisée. Les résultats des deux tâches sont séparés.',
        prompt: 'Espace pour la forme cible · Clic pour la couleur cible.'
    }
};

const LIBELLES_STIMULI_NBACK = {
    lettres: 'Lettres',
    formes: 'Formes',
    chiffres: 'Chiffres'
};

const STIMULI_NBACK = {
    lettres: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    formes: FORMES.map(forme => forme.id),
    chiffres: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
};

const MODES_FORMES = {
    1: {
        nom: 'Version 1 — forme demandée',
        instructions: 'Une forme est écrite en haut de l’écran. Cliquez le plus vite possible sur cette forme.',
        prompt: 'Cliquez sur la forme demandée.'
    },
    2: {
        nom: 'Version 2 — autre forme',
        instructions: 'Une forme est écrite en haut de l’écran. Cliquez le plus vite possible sur n’importe quelle autre forme.',
        prompt: 'Ne cliquez pas sur la forme demandée.'
    }
};

// ============ SÉLECTEURS ============
const screenHome = document.getElementById('screen-home');
const screenFormMode = document.getElementById('screen-form-mode');
const screenStart = document.getElementById('screen-start');
const screenGame = document.getElementById('screen-game');
const screenEnd = document.getElementById('screen-end');
const screenStats = document.getElementById('screen-stats');

const gameConfigTitle = document.getElementById('game-config-title');
const gameInstructions = document.getElementById('game-instructions');
const gamePrompt = document.getElementById('game-prompt');
const gameCards = document.querySelectorAll('.game-card[data-game]');
const formModeCards = document.querySelectorAll('[data-form-mode]');
const nbackOptions = document.getElementById('nback-options');
const nbackLevelInput = document.getElementById('nback-level');
const nbackTypeInput = document.getElementById('nback-type');
const nbackDurationInput = document.getElementById('nback-duration');
const t3aOptions = document.getElementById('t3a-options');
const t3aRoundsInput = document.getElementById('t3a-rounds');
const t3aRoundDurationInput = document.getElementById('t3a-round-duration');
const t3aBreakDurationInput = document.getElementById('t3a-break-duration');
const t3aChangeShapeInput = document.getElementById('t3a-change-shape');
const t3aChangeColorInput = document.getElementById('t3a-change-color');
const roundsConfig = document.getElementById('rounds-config');
const playerInput = document.getElementById('player-input');
const roundsInput = document.getElementById('rounds-input');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const btnEndStats = document.getElementById('btn-end-stats');
const btnHome = document.getElementById('btn-home');
const btnBackGames = document.getElementById('btn-back-games');
const btnModeBack = document.getElementById('btn-mode-back');
// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_REFERENCE_START
const btnEmailResults = document.getElementById('btn-email-results');
// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_REFERENCE_END
const btnSmsResults = document.getElementById('btn-sms-results');

const playerName = document.getElementById('player-name');
const progress = document.getElementById('progress');
const progressLabel = document.getElementById('progress-label');
const wordDiv = document.getElementById('word');
const answersDiv = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const t3aGame = document.getElementById('t3a-game');
const t3aBoard = document.getElementById('t3a-board');
const t3aLeftStimulus = document.getElementById('t3a-left-stimulus');
const t3aRightStimulus = document.getElementById('t3a-right-stimulus');
const t3aRoundNumber = document.getElementById('t3a-round-number');
const t3aRoundTime = document.getElementById('t3a-round-time');
const t3aLiveScore = document.getElementById('t3a-live-score');
const t3aResponseFeedback = document.getElementById('t3a-response-feedback');
const t3aBreakScreen = document.getElementById('t3a-break-screen');
const t3aBreakTime = document.getElementById('t3a-break-time');
const t3aRotateMessage = document.getElementById('t3a-rotate-message');
const btnT3aLeft = document.getElementById('btn-t3a-left');
const btnT3aRight = document.getElementById('btn-t3a-right');

const resultPlayer = document.getElementById('result-player');
const resultGame = document.getElementById('result-game');
const resultScore = document.getElementById('result-score');
const resultAccuracy = document.getElementById('result-accuracy');
const resultFailure = document.getElementById('result-failure');
const resultNeutral = document.getElementById('result-neutral');
const resultReaction = document.getElementById('result-reaction');
const resultTrend = document.getElementById('result-trend');
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
const statBestLabel = document.getElementById('stat-best-label');
const statAvgAccuracy = document.getElementById('stat-avg-accuracy');
const statAvgReaction = document.getElementById('stat-avg-reaction');
const statLatestTrend = document.getElementById('stat-latest-trend');
const statAvgAccuracyLabel = document.getElementById('stat-avg-accuracy-label');
const statAvgReactionLabel = document.getElementById('stat-avg-reaction-label');
const statLatestTrendLabel = document.getElementById('stat-latest-trend-label');
const statsRoundFilterLabel = document.getElementById('stats-round-filter-label');
const statsScoreHeader = document.getElementById('stats-score-header');
const statsPrecisionHeader = document.getElementById('stats-precision-header');
const statsReactionHeader = document.getElementById('stats-reaction-header');
const statsTrendHeader = document.getElementById('stats-trend-header');
const statsTitle = document.getElementById('stats-title');

// ============ VARIABLES DU JEU ============
let joueur = '';
let jeuActif = 'stroop';
let modeFormes = 1;
let niveauNBack = 1;
let typeStimulusNBack = 'lettres';
let dureeNBack = 3;
let nbTours = 10;
let tourActuel = 0;
let score = 0;
let tempsDebutQuestion = 0;
let tempsReactions = [];
let essaisAxCpt = [];
let sequenceNBack = [];
let indexSequenceNBack = 0;
let cibleNBackActuelle = false;
let echecsNBack = 0;
let essaisComptabilisesNBack = 0;
let nonCiblesIgnoreesNBack = 0;
let nombreManchesT3A = 4;
let dureeMancheT3A = 90;
let dureePauseT3A = 30;
let changerFormeCibleT3A = false;
let changerCouleurCibleT3A = false;
let formeCibleT3A = 'etoile';
let couleurCibleT3A = 'ROUGE';
let mancheT3AActuelle = 1;
let phaseT3A = 'inactive';
let horlogeT3A = null;
let dernierTickT3A = 0;
let tempsEcouleMancheT3A = 0;
let tempsEcoulePauseT3A = 0;
let tempsStimulusCouleurT3A = 0;
let debutStimulusT3A = 0;
let formeT3AActuelle = '';
let formeT3ARepos = '';
let formeT3AEnPresentation = false;
let tempsPhaseFormeT3A = 0;
let dureeReposFormeT3A = INTERVALLE_FORME_T3A;
let debutStimulusFormeT3A = 0;
let couleurT3AActuelle = null;
let reponseFormeT3A = false;
let reponseCouleurT3A = false;
let ciblesT3A = 0;
let detectionsT3A = 0;
let ciblesManqueesT3A = 0;
let ciblesCouleurManqueesT3A = 0;
let faussesAlertesT3A = 0;
let decisionsT3A = 0;
let ciblesFormeT3A = 0;
let reussitesFormeT3A = 0;
let erreursFormeT3A = 0;
let reussitesCouleurT3A = 0;
let erreursCouleurT3A = 0;
let faussesAlertesFormeT3A = 0;
let faussesAlertesCouleurT3A = 0;
let decisionsFormeT3A = 0;
let decisionsCouleurT3A = 0;
let reactionsT3A = [];
let questionVerrouillee = false;
let timeoutQuestion = null;
const toursParJeu = {
    stroop: 10,
    formes: 10,
    flanker: 10,
    'ax-cpt': 10,
    nback: 10,
    t3a: 4
};

roundsInput.addEventListener('input', () => {
    const nombre = parseInt(roundsInput.value, 10);
    if (!isNaN(nombre) && nombre >= 5 && nombre <= 50) {
        toursParJeu[jeuActif] = nombre;
    }
});

function calculerTendanceReaction(reactions) {
    if (!Array.isArray(reactions) || reactions.length < 2) return 'indisponible';

    const moyenneIndex = (reactions.length - 1) / 2;
    const moyenneReaction = reactions.reduce((total, temps) => total + temps, 0) / reactions.length;
    let covariance = 0;
    let varianceIndex = 0;

    reactions.forEach((temps, index) => {
        const ecartIndex = index - moyenneIndex;
        covariance += ecartIndex * (temps - moyenneReaction);
        varianceIndex += ecartIndex * ecartIndex;
    });

    const pente = covariance / varianceIndex;
    if (pente < 0) return 'acceleration';
    if (pente > 0) return 'ralentissement';
    return 'stable';
}

function libelleTendanceReaction(tendance) {
    const libelles = {
        acceleration: 'Accélération',
        ralentissement: 'Ralentissement',
        stable: 'Stable'
    };
    return libelles[tendance] || '—';
}

function descriptionTendanceReaction(tendance) {
    const descriptions = {
        acceleration: 'Accélération (temps de réaction en baisse)',
        ralentissement: 'Ralentissement (temps de réaction en hausse)',
        stable: 'Stable (pas de tendance nette)'
    };
    return descriptions[tendance] || 'Indéterminée';
}

function actualiserConfigurationT3A() {
    const manches = parseInt(t3aRoundsInput.value, 10);
    const duree = parseInt(t3aRoundDurationInput.value, 10);
    const pause = parseInt(t3aBreakDurationInput.value, 10);

    nombreManchesT3A = Number.isFinite(manches)
        ? Math.min(10, Math.max(1, manches))
        : 4;
    dureeMancheT3A = Number.isFinite(duree)
        ? Math.min(120, Math.max(30, duree))
        : 90;
    dureePauseT3A = Number.isFinite(pause)
        ? Math.min(60, Math.max(20, pause))
        : 30;

    t3aRoundsInput.value = String(nombreManchesT3A);
    t3aRoundDurationInput.value = String(dureeMancheT3A);
    t3aBreakDurationInput.value = String(dureePauseT3A);
    changerFormeCibleT3A = t3aChangeShapeInput.checked;
    changerCouleurCibleT3A = t3aChangeColorInput.checked;
}

function libelleJeuActif() {
    if (jeuActif === 'formes') {
        return JEUX.formes.nom + ' — ' + MODES_FORMES[modeFormes].nom;
    }
    if (jeuActif === 'nback') {
        return JEUX.nback.nom + ' — N-' + niveauNBack + ' — ' +
            LIBELLES_STIMULI_NBACK[typeStimulusNBack] + ' — ' + dureeNBack + ' s/essai';
    }
    if (jeuActif === 't3a') {
        return JEUX.t3a.nom + ' — ' + nombreManchesT3A +
            (nombreManchesT3A === 1 ? ' manche de ' : ' manches de ') +
            dureeMancheT3A + ' s, pause ' + dureePauseT3A + ' s';
    }
    return JEUX[jeuActif].nom;
}

function titreResultatsActif() {
    if (jeuActif === 'formes') {
        return JEUX.formes.titreResultats + ' — ' + MODES_FORMES[modeFormes].nom;
    }
    if (jeuActif === 'nback') {
        return JEUX.nback.titreResultats + ' — N-' + niveauNBack + ' — ' +
            LIBELLES_STIMULI_NBACK[typeStimulusNBack] + ' — ' + dureeNBack + ' s/essai';
    }
    if (jeuActif === 't3a') {
        return JEUX.t3a.titreResultats + ' — ' + nombreManchesT3A +
            (nombreManchesT3A === 1 ? ' manche de ' : ' manches de ') +
            dureeMancheT3A + ' s';
    }
    return JEUX[jeuActif].titreResultats;
}

function afficherConfigurationJeu() {
    const configuration = jeuActif === 'formes'
        ? MODES_FORMES[modeFormes]
        : JEUX[jeuActif];
    gameConfigTitle.textContent = libelleJeuActif();
    gameInstructions.textContent = jeuActif === 'nback'
        ? configuration.instructions
            .replace('N essais', 'N-' + niveauNBack + ' essais')
            .replace('DUREE', String(dureeNBack))
        : configuration.instructions;
    gamePrompt.textContent = jeuActif === 'nback'
        ? configuration.prompt.replace('N essais', 'N-' + niveauNBack + ' essais')
        : configuration.prompt;
    nbackOptions.hidden = jeuActif !== 'nback';
    t3aOptions.hidden = jeuActif !== 't3a';
    roundsConfig.hidden = jeuActif === 't3a';
    if (jeuActif === 't3a') {
        gameInstructions.textContent += ' Les options cochées font varier les cibles entre les manches.';
    }
    if (jeuActif !== 't3a') roundsInput.value = toursParJeu[jeuActif];
    btnBackGames.textContent = jeuActif === 'formes'
        ? '← Choisir la version'
        : '← Choisir un jeu';
    document.title = libelleJeuActif();
    screenStart.classList.remove('hidden');
    playerInput.dispatchEvent(new Event('input'));
}

gameCards.forEach(card => {
    card.onclick = () => {
        jeuActif = card.dataset.game;
        screenHome.classList.add('hidden');
        if (jeuActif === 'formes') {
            screenFormMode.classList.remove('hidden');
            document.title = JEUX.formes.nom;
            return;
        }
        afficherConfigurationJeu();
    };
});

formModeCards.forEach(card => {
    card.onclick = () => {
        modeFormes = Number(card.dataset.formMode);
        screenFormMode.classList.add('hidden');
        afficherConfigurationJeu();
    };
});

nbackLevelInput.addEventListener('change', () => {
    niveauNBack = Number(nbackLevelInput.value);
    if (jeuActif === 'nback') afficherConfigurationJeu();
});

nbackTypeInput.addEventListener('change', () => {
    typeStimulusNBack = nbackTypeInput.value;
    if (jeuActif === 'nback') afficherConfigurationJeu();
});

function actualiserDureeNBack() {
    const valeur = parseFloat(nbackDurationInput.value);
    dureeNBack = Number.isFinite(valeur)
        ? Math.min(10, Math.max(1, Math.round(valeur * 2) / 2))
        : 3;
    nbackDurationInput.value = String(dureeNBack);
}

nbackDurationInput.addEventListener('change', () => {
    actualiserDureeNBack();
    if (jeuActif === 'nback') afficherConfigurationJeu();
});

[t3aRoundsInput, t3aRoundDurationInput, t3aBreakDurationInput,
    t3aChangeShapeInput, t3aChangeColorInput].forEach(input => {
    input.addEventListener('change', () => {
        actualiserConfigurationT3A();
        if (jeuActif === 't3a') afficherConfigurationJeu();
    });
});

btnModeBack.onclick = () => {
    screenFormMode.classList.add('hidden');
    screenHome.classList.remove('hidden');
    document.title = 'Jeux de réflexion';
};

btnBackGames.onclick = () => {
    screenStart.classList.add('hidden');
    if (jeuActif === 'formes') {
        screenFormMode.classList.remove('hidden');
        document.title = JEUX.formes.nom;
    } else {
        screenHome.classList.remove('hidden');
        document.title = 'Jeux de réflexion';
    }
    historyBox.classList.add('hidden');
};

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
    if (!Array.isArray(tout[nom])) return [];
    return tout[nom].filter(partie => {
        if (jeuActif === 'formes') {
            return partie.jeu === 'formes' &&
                Number(partie.modeFormes || 1) === modeFormes;
        }
        if (jeuActif === 'nback') {
            return partie.jeu === 'nback' &&
                Number(partie.niveauNBack) === niveauNBack &&
                partie.typeStimulusNBack === typeStimulusNBack &&
                Number(partie.dureeNBack || 3) === dureeNBack &&
                partie.versionScoringNBack === 2;
        }
        if (jeuActif === 't3a') {
            return partie.jeu === 't3a' &&
                Number(partie.dureeManche) === dureeMancheT3A &&
                Number(partie.dureePause) === dureePauseT3A;
        }
        return partie.jeu ? partie.jeu === jeuActif : jeuActif === 'stroop';
    });
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
            const scorePartie = jeuActif === 'nback'
                ? p.score + '/' + p.essaisComptabilises
                : jeuActif === 't3a'
                    ? p.versionScoringT3A >= 4
                        ? 'Formes ' + p.reussitesForme + '/' + p.erreursForme +
                            ' · Couleurs ' + p.reussitesCouleur + '/' + p.erreursCouleur
                        : p.detections + '/' + p.cibles + ' cibles'
                    : p.score + '/' + p.tours;
            const details = jeuActif === 'nback'
                ? ' (' + p.tauxEchec + '% échec, ' + p.nonCiblesIgnorees + ' non-cibles ignorées)'
                : jeuActif === 't3a' && p.versionScoringT3A >= 4
                    ? ' (précision F ' + (p.precisionForme == null ? '—' : p.precisionForme + '%') +
                        ' · C ' + (p.precisionCouleur == null ? '—' : p.precisionCouleur + '%') +
                        ', ' + (p.reactionMoyenne == null ? '—' : p.reactionMoyenne + ' ms') + ')'
                    : ' (' + p.precision + '%, ' +
                        (p.reactionMoyenne == null ? '—' : p.reactionMoyenne + ' ms') + ')';
            li.textContent = p.date + ' — ' + scorePartie + details;
            historyList.appendChild(li);
        });

        const meilleur = Math.max(...parties.map(p => p.score));
        historyBest.textContent = jeuActif === 't3a'
            ? '🏆 Meilleure précision : ' + meilleur + '%'
            : '🏆 Meilleur score : ' + meilleur;
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
    if (jeuActif === 'nback') {
        actualiserDureeNBack();
        gameConfigTitle.textContent = libelleJeuActif();
    }
    if (jeuActif === 't3a') {
        actualiserConfigurationT3A();
        gameConfigTitle.textContent = libelleJeuActif();
        nbTours = nombreManchesT3A;
    } else {
        nbTours = parseInt(roundsInput.value, 10);
        if (isNaN(nbTours) || nbTours < 5) nbTours = 5;
        if (nbTours > 50) nbTours = 50;
        roundsInput.value = nbTours;
    }
    toursParJeu[jeuActif] = nbTours;

    tourActuel = 0;
    score = 0;
    echecsNBack = 0;
    essaisComptabilisesNBack = 0;
    nonCiblesIgnoreesNBack = 0;
    tempsReactions = [];
    ciblesT3A = 0;
    detectionsT3A = 0;
    ciblesManqueesT3A = 0;
    ciblesCouleurManqueesT3A = 0;
    faussesAlertesT3A = 0;
    decisionsT3A = 0;
    ciblesFormeT3A = 0;
    reussitesFormeT3A = 0;
    erreursFormeT3A = 0;
    reussitesCouleurT3A = 0;
    erreursCouleurT3A = 0;
    faussesAlertesFormeT3A = 0;
    faussesAlertesCouleurT3A = 0;
    decisionsFormeT3A = 0;
    decisionsCouleurT3A = 0;
    reactionsT3A = [];
    formeCibleT3A = 'etoile';
    couleurCibleT3A = 'ROUGE';
    formeT3AActuelle = '';
    formeT3ARepos = '';
    formeT3AEnPresentation = false;
    t3aLiveScore.textContent = 'Formes 0 réussite / 0 erreur · Couleurs 0 réussite / 0 erreur';
    essaisAxCpt = jeuActif === 'ax-cpt' ? creerEssaisAxCpt(nbTours) : [];
    sequenceNBack = jeuActif === 'nback'
        ? creerSequenceNBack(nbTours, niveauNBack, typeStimulusNBack)
        : [];
    indexSequenceNBack = 0;
    questionVerrouillee = false;

    screenStart.classList.add('hidden');
    screenGame.classList.remove('hidden');
    const estT3A = jeuActif === 't3a';
    screenGame.classList.toggle('t3a-game-active', estT3A);
    document.body.classList.toggle('t3a-active', estT3A);
    t3aGame.classList.toggle('hidden', !estT3A);
    wordDiv.classList.toggle('hidden', estT3A);
    answersDiv.classList.toggle('hidden', estT3A);
    feedback.classList.toggle('hidden', estT3A);

    playerName.textContent = joueur;
    if (estT3A) {
        progressLabel.textContent = 'Manche :';
        mancheT3AActuelle = 1;
        demarrerMancheT3A();
    } else {
        progressLabel.textContent = 'Question :';
        prochaineQuestion();
    }
};

btnRestart.onclick = () => {
    clearTimeout(timeoutQuestion);
    arreterHorlogeT3A();
    document.body.classList.remove('t3a-active');
    screenGame.classList.remove('t3a-game-active');
    screenEnd.classList.add('hidden');
    screenStart.classList.remove('hidden');
    playerInput.dispatchEvent(new Event('input'));
};

btnHome.onclick = () => {
    clearTimeout(timeoutQuestion);
    arreterHorlogeT3A();
    document.body.classList.remove('t3a-active');
    screenGame.classList.remove('t3a-game-active');
    screenEnd.classList.add('hidden');
    screenHome.classList.remove('hidden');
    screenFormMode.classList.add('hidden');
    screenStart.classList.add('hidden');
    historyBox.classList.add('hidden');
    document.title = 'Jeux de réflexion';
};

// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_HANDLER_START
btnEmailResults.onclick = () => {
    const contenu = contenuDesResultats();
    const sujet = titreResultatsActif() + ' - ' + joueur;

    window.location.href = 'mailto:' + encodeURIComponent(window.STROOP_CONTACTS.email) + '?subject=' +
        encodeURIComponent(sujet) + '&body=' + encodeURIComponent(contenu);
};
// PUBLIC_DEPLOYMENT_REMOVE_EMAIL_HANDLER_END

btnSmsResults.onclick = () => {
    window.location.href = 'sms:?body=' + encodeURIComponent(contenuDesResultats());
};

function contenuDesResultats() {
    if (jeuActif === 'nback') {
        const precision = Math.round((score / essaisComptabilisesNBack) * 100);
        return [
            titreResultatsActif(),
            'Joueur : ' + joueur,
            'Réussites : ' + score + '/' + essaisComptabilisesNBack,
            'Taux de réussite : ' + Math.round(
                (score / essaisComptabilisesNBack) * 100
            ) + '%',
            'Échecs : ' + echecsNBack + '/' + essaisComptabilisesNBack,
            'Taux d’échec : ' +
                Math.round((echecsNBack / essaisComptabilisesNBack) * 100) + '%',
            'Non-cibles ignorées : ' + nonCiblesIgnoreesNBack + ' (non comptabilisées)'
        ].join('\n');
    }

    if (jeuActif === 't3a') {
        const precisionForme = precisionT3ATache(reussitesFormeT3A, erreursFormeT3A);
        const precisionCouleur = precisionT3ATache(reussitesCouleurT3A, erreursCouleurT3A);
        const reactionMoyenne = reactionsT3A.length
            ? Math.round(reactionsT3A.reduce((total, temps) => total + temps, 0) / reactionsT3A.length)
            : 0;
        return [
            titreResultatsActif(),
            'Joueur : ' + joueur,
            'Manches : ' + nombreManchesT3A,
            resumeTacheT3A('Formes', reussitesFormeT3A, erreursFormeT3A) +
                ' · précision : ' + (precisionForme === null ? '—' : precisionForme + '%'),
            resumeTacheT3A('Couleurs', reussitesCouleurT3A, erreursCouleurT3A) +
                ' · précision : ' + (precisionCouleur === null ? '—' : precisionCouleur + '%'),
            'Cibles couleur ignorées : ' + ciblesCouleurManqueesT3A,
            'Fausses alertes formes : ' + faussesAlertesFormeT3A,
            'Fausses alertes couleurs : ' + faussesAlertesCouleurT3A,
            'Temps moyen de détection : ' + reactionMoyenne + ' ms'
        ].join('\n');
    }

    const precision = Math.round((score / nbTours) * 100);
    const reactionMoyenne = tempsReactions.length
        ? Math.round(tempsReactions.reduce((total, temps) => total + temps, 0) / tempsReactions.length)
        : 0;
    return [
        titreResultatsActif(),
        'Joueur : ' + joueur,
        'Score : ' + score + '/' + nbTours,
        'Précision : ' + precision + '%',
        'Temps de réaction moyen : ' + reactionMoyenne + ' ms',
        'Tendance des réactions : ' + descriptionTendanceReaction(
            calculerTendanceReaction(tempsReactions)
        )
    ].join('\n');
}

btnEndStats.onclick = () => {
    clearTimeout(timeoutQuestion);
    arreterHorlogeT3A();
    document.body.classList.remove('t3a-active');
    screenGame.classList.remove('t3a-game-active');
    screenEnd.classList.add('hidden');
    screenStats.classList.remove('hidden');
    statsTitle.textContent = '📊 Statistiques — ' + libelleJeuActif();
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
    if (jeuActif === 't3a') return;
    if (jeuActif === 'nback') {
        prochaineQuestionNBack();
        return;
    }

    if (tourActuel >= nbTours) {
        finDuJeu();
        return;
    }

    questionVerrouillee = false;
    tourActuel++;
    progress.textContent = tourActuel + '/' + nbTours;
    feedback.textContent = '';
    wordDiv.classList.toggle('flanker-stimulus', jeuActif === 'flanker');
    wordDiv.classList.remove('nback-shape-stimulus');

    if (jeuActif === 'formes') {
        prochaineQuestionFormes();
    } else if (jeuActif === 'flanker') {
        prochaineQuestionFlanker();
    } else if (jeuActif === 'ax-cpt') {
        prochaineQuestionAxCpt();
    } else {
        prochaineQuestionStroop();
    }

    if (jeuActif !== 'ax-cpt') tempsDebutQuestion = performance.now();
}

function formatTempsT3A(secondes) {
    const minutes = Math.floor(secondes / 60);
    const reste = secondes % 60;
    return minutes + ':' + String(reste).padStart(2, '0');
}

function telephoneEnPortraitT3A() {
    return navigator.maxTouchPoints > 0 &&
        window.matchMedia('(max-width: 900px)').matches &&
        window.innerHeight > window.innerWidth;
}

function actualiserAffichageT3A() {
    const portrait = telephoneEnPortraitT3A();
    t3aRotateMessage.classList.toggle('hidden', !portrait);
    t3aBoard.classList.toggle('hidden', portrait || phaseT3A !== 'manche');
    t3aBreakScreen.classList.toggle('hidden', portrait || phaseT3A !== 'pause');
}

function choisirCibleDifferenteT3A(options, cibleActuelle, cle) {
    const autresCibles = options.filter(option => option[cle] !== cibleActuelle);
    return autresCibles[Math.floor(Math.random() * autresCibles.length)][cle];
}

function actualiserLibellesCiblesT3A() {
    const forme = FORMES.find(option => option.id === formeCibleT3A);
    const couleur = COULEURS.find(option => option.nom === couleurCibleT3A);
    btnT3aLeft.textContent = forme.nom;
    btnT3aLeft.setAttribute('aria-label', 'Détecter la forme ' + forme.nom.toLocaleLowerCase('fr-FR'));
    btnT3aRight.textContent = couleur.nom;
    btnT3aRight.setAttribute('aria-label', 'Détecter la couleur ' + couleur.nom.toLocaleLowerCase('fr-FR'));
    gamePrompt.textContent = 'Forme cible : ' + forme.nom + ' (Espace) · Couleur cible : ' +
        couleur.nom + ' (clic uniquement)';
}

function preparerCiblesMancheT3A() {
    if (mancheT3AActuelle > 1) {
        if (changerFormeCibleT3A) {
            formeCibleT3A = choisirCibleDifferenteT3A(FORMES, formeCibleT3A, 'id');
        }
        if (changerCouleurCibleT3A) {
            couleurCibleT3A = choisirCibleDifferenteT3A(COULEURS, couleurCibleT3A, 'nom');
        }
    }
    actualiserLibellesCiblesT3A();
}

function afficherFormeT3A(formeId) {
    const forme = FORMES.find(option => option.id === formeId);
    t3aLeftStimulus.innerHTML = '';
    const icone = document.createElement('span');
    icone.className = 'shape-icon ' + forme.classe;
    icone.setAttribute('aria-hidden', 'true');
    t3aLeftStimulus.appendChild(icone);
    t3aLeftStimulus.setAttribute(
        'aria-label',
        forme.id === formeCibleT3A
            ? 'Cible forme ' + forme.nom.toLocaleLowerCase('fr-FR')
            : 'Forme non cible ' + forme.nom.toLocaleLowerCase('fr-FR')
    );
}

function preparerStimulusFormeT3A(debut) {
    const formesNonCibles = FORMES.filter(option => option.id !== formeCibleT3A);
    formeT3ARepos = formesNonCibles[Math.floor(Math.random() * formesNonCibles.length)].id;
    formeT3AActuelle = formeT3ARepos;
    formeT3AEnPresentation = false;
    tempsPhaseFormeT3A = 0;
    dureeReposFormeT3A = INTERVALLE_FORME_T3A;
    debutStimulusFormeT3A = debut;
    reponseFormeT3A = false;
    afficherFormeT3A(formeT3AActuelle);
}

function changerStimulusFormeT3A(debut) {
    evaluerStimulusFormeT3A();
    if (formeT3AEnPresentation) {
        formeT3AEnPresentation = false;
        dureeReposFormeT3A = PAUSE_FORME_T3A;
        formeT3AActuelle = formeT3ARepos;
    } else {
        formeT3AEnPresentation = true;
        const formesDisponibles = FORMES.filter(option =>
            option.id !== formeT3ARepos && option.id !== formeT3AActuelle
        );
        const forme = formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
        formeT3AActuelle = forme.id;
    }
    tempsPhaseFormeT3A = 0;
    debutStimulusFormeT3A = debut;
    reponseFormeT3A = false;
    afficherFormeT3A(formeT3AActuelle);
}

function creerStimulusCouleurT3A(debut) {
    const couleurCible = COULEURS.find(option => option.nom === couleurCibleT3A);
    const couleursNonCibles = COULEURS.filter(option => option.nom !== couleurCibleT3A);
    couleurT3AActuelle = Math.random() < 0.2
        ? couleurCible
        : couleursNonCibles[Math.floor(Math.random() * couleursNonCibles.length)];
    reponseCouleurT3A = false;
    debutStimulusT3A = debut;
    t3aResponseFeedback.textContent = '';
    t3aResponseFeedback.className = '';

    t3aRightStimulus.textContent = couleurT3AActuelle.nom;
    t3aRightStimulus.style.backgroundColor = couleurT3AActuelle.css;
    t3aRightStimulus.style.color = couleurT3AActuelle.nom === 'JAUNE' ? '#333' : '#fff';
    t3aRightStimulus.setAttribute(
        'aria-label',
        'Couleur ' + couleurT3AActuelle.nom.toLocaleLowerCase('fr-FR')
    );
}

function demarrerMancheT3A() {
    if (mancheT3AActuelle > nombreManchesT3A) {
        finDuJeu();
        return;
    }

    phaseT3A = 'manche';
    tempsEcouleMancheT3A = 0;
    tempsStimulusCouleurT3A = 0;
    dernierTickT3A = performance.now();
    progress.textContent = mancheT3AActuelle + '/' + nombreManchesT3A;
    t3aRoundNumber.textContent = mancheT3AActuelle + '/' + nombreManchesT3A;
    t3aRoundTime.textContent = formatTempsT3A(dureeMancheT3A);
    progressLabel.textContent = 'Manche :';
    preparerCiblesMancheT3A();
    preparerStimulusFormeT3A(dernierTickT3A);
    creerStimulusCouleurT3A(dernierTickT3A);
    actualiserAffichageT3A();

    if (horlogeT3A === null) {
        horlogeT3A = setInterval(tickT3A, 100);
    }
}

function repondreT3A(zone) {
    if (phaseT3A !== 'manche') return;

    if (zone === 'forme') {
        const cible = formeT3AActuelle === formeCibleT3A;
        if (reponseFormeT3A) return;
        reponseFormeT3A = true;
        enregistrerReponseT3A('forme', cible);
        t3aResponseFeedback.textContent = cible
            ? 'Bonne détection.'
            : 'Erreur : réponse sur une forme non cible.';
        t3aResponseFeedback.className = cible ? 'good' : 'bad';
    } else {
        const cible = couleurT3AActuelle.nom === couleurCibleT3A;
        if (reponseCouleurT3A) return;
        reponseCouleurT3A = true;
        enregistrerReponseT3A('couleur', cible);
        t3aResponseFeedback.textContent = cible
            ? 'Bonne détection.'
            : 'Erreur : clic sur une couleur non cible.';
        t3aResponseFeedback.className = cible ? 'good' : 'bad';
    }
}

function enregistrerReponseT3A(tache, cible) {
    decisionsT3A++;
    if (tache === 'forme') decisionsFormeT3A++;
    else decisionsCouleurT3A++;
    if (cible) {
        detectionsT3A++;
        if (tache === 'forme') reussitesFormeT3A++;
        else reussitesCouleurT3A++;
        const debut = tache === 'forme' ? debutStimulusFormeT3A : debutStimulusT3A;
        reactionsT3A.push(Math.round(performance.now() - debut));
    } else {
        faussesAlertesT3A++;
        if (tache === 'forme') {
            faussesAlertesFormeT3A++;
            erreursFormeT3A++;
        } else {
            faussesAlertesCouleurT3A++;
            erreursCouleurT3A++;
        }
    }
    actualiserScoreT3A();
}

function evaluerStimulusFormeT3A() {
    const cible = formeT3AActuelle === formeCibleT3A;
    if (formeT3AEnPresentation && cible) {
        ciblesFormeT3A++;
        ciblesT3A++;
    }
    if (reponseFormeT3A) return;

    decisionsT3A++;
    decisionsFormeT3A++;
    if (cible) {
        erreursFormeT3A++;
    } else {
        detectionsT3A++;
        reussitesFormeT3A++;
    }
    actualiserScoreT3A();
}

function evaluerStimulusCouleurT3A() {
    const cibleCouleur = couleurT3AActuelle.nom === couleurCibleT3A;

    if (cibleCouleur) {
        ciblesT3A++;
        if (!reponseCouleurT3A) {
            ciblesManqueesT3A++;
            ciblesCouleurManqueesT3A++;
            erreursCouleurT3A++;
        }
    }

    actualiserScoreT3A();
}

function actualiserScoreT3A() {
    t3aLiveScore.textContent = resumeTacheT3A(
        'Formes', reussitesFormeT3A, erreursFormeT3A
    ) + ' · ' + resumeTacheT3A(
        'Couleurs', reussitesCouleurT3A, erreursCouleurT3A
    );
}

function resumeTacheT3A(nom, reussites, erreurs) {
    return nom + ' : ' + reussites +
        (reussites > 1 ? ' réussites' : ' réussite') + ' / ' +
        erreurs + (erreurs > 1 ? ' erreurs' : ' erreur');
}

function totalErreursT3A() {
    return erreursFormeT3A + erreursCouleurT3A;
}

function precisionT3ATache(reussites, erreurs) {
    const essais = reussites + erreurs;
    return essais ? Math.round((reussites / essais) * 100) : null;
}

function terminerMancheT3A() {
    evaluerStimulusFormeT3A();
    evaluerStimulusCouleurT3A();
    if (mancheT3AActuelle >= nombreManchesT3A) {
        arreterHorlogeT3A();
        phaseT3A = 'inactive';
        finDuJeu();
        return;
    }

    phaseT3A = 'pause';
    tempsEcoulePauseT3A = 0;
    dernierTickT3A = performance.now();
    progressLabel.textContent = 'Étape :';
    progress.textContent = 'Pause';
    t3aBreakTime.textContent = String(dureePauseT3A);
    gamePrompt.textContent = 'Pause entre les manches.';
    actualiserAffichageT3A();
}

function tickT3A() {
    if (phaseT3A === 'inactive') return;

    const maintenant = performance.now();
    actualiserAffichageT3A();
    if (telephoneEnPortraitT3A()) {
        dernierTickT3A = maintenant;
        return;
    }

    const delta = Math.min(250, Math.max(0, maintenant - dernierTickT3A));
    dernierTickT3A = maintenant;

    if (phaseT3A === 'manche') {
        tempsEcouleMancheT3A += delta;
        tempsStimulusCouleurT3A += delta;
        tempsPhaseFormeT3A += delta;
        const restant = Math.max(0, Math.ceil(
            (dureeMancheT3A * 1000 - tempsEcouleMancheT3A) / 1000
        ));
        t3aRoundTime.textContent = formatTempsT3A(restant);

        if (tempsEcouleMancheT3A >= dureeMancheT3A * 1000) {
            terminerMancheT3A();
            return;
        }
        if (tempsStimulusCouleurT3A >= INTERVALLE_COULEUR_T3A) {
            tempsStimulusCouleurT3A -= INTERVALLE_COULEUR_T3A;
            evaluerStimulusCouleurT3A();
            creerStimulusCouleurT3A(maintenant - tempsStimulusCouleurT3A);
        }
        const dureePhaseForme = formeT3AEnPresentation
            ? DUREE_FORME_T3A
            : dureeReposFormeT3A;
        if (tempsPhaseFormeT3A >= dureePhaseForme) {
            tempsPhaseFormeT3A -= dureePhaseForme;
            changerStimulusFormeT3A(maintenant - tempsPhaseFormeT3A);
        }
    } else if (phaseT3A === 'pause') {
        tempsEcoulePauseT3A += delta;
        const restant = Math.max(0, Math.ceil(
            (dureePauseT3A * 1000 - tempsEcoulePauseT3A) / 1000
        ));
        t3aBreakTime.textContent = String(restant);
        if (tempsEcoulePauseT3A >= dureePauseT3A * 1000) {
            mancheT3AActuelle++;
            demarrerMancheT3A();
        }
    }
}

function arreterHorlogeT3A() {
    if (horlogeT3A !== null) {
        clearInterval(horlogeT3A);
        horlogeT3A = null;
    }
    phaseT3A = 'inactive';
}

btnT3aLeft.onclick = () => repondreT3A('forme');
btnT3aRight.onclick = () => repondreT3A('couleur');
document.addEventListener('keydown', event => {
    if (jeuActif !== 't3a' || phaseT3A !== 'manche') return;
    if (event.code === 'Space') {
        if (event.repeat) return;
        event.preventDefault();
        repondreT3A('forme');
    }
});

function prochaineQuestionStroop() {
    const motAffiche = couleurAleatoire(null);
    const couleurEncre = couleurAleatoire(motAffiche);

    wordDiv.textContent = motAffiche.nom;
    wordDiv.style.color = couleurEncre.css;

    const reponses = [...COULEURS].sort(() => Math.random() - 0.5);
    answersDiv.innerHTML = '';

    reponses.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = c.nom;
        btn.style.background = c.css;
        btn.onclick = () => verifierReponse(c.nom, couleurEncre.nom);
        answersDiv.appendChild(btn);
    });
}

function prochaineQuestionFormes() {
    const formeCible = FORMES[Math.floor(Math.random() * FORMES.length)];
    const reponses = [...FORMES].sort(() => Math.random() - 0.5);
    wordDiv.textContent = formeCible.nom;
    wordDiv.style.color = '#333';
    answersDiv.innerHTML = '';

    reponses.forEach(forme => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn shape-answer';
        btn.setAttribute('aria-label', forme.nom);
        btn.title = forme.nom;

        const icone = document.createElement('span');
        icone.className = 'shape-icon ' + forme.classe;
        icone.setAttribute('aria-hidden', 'true');
        btn.appendChild(icone);
        btn.onclick = () => verifierReponse(forme.id, formeCible.id);
        answersDiv.appendChild(btn);
    });
}

function prochaineQuestionFlanker() {
    const directionCible = Math.random() < 0.5 ? 'gauche' : 'droite';
    const incongru = Math.random() < 0.5;
    const directionFlanc = incongru
        ? (directionCible === 'gauche' ? 'droite' : 'gauche')
        : directionCible;
    const fleche = direction => direction === 'gauche' ? '←' : '→';

    wordDiv.style.color = '#555';
    wordDiv.innerHTML = '';
    for (let index = 0; index < 5; index++) {
        const direction = index === 2 ? directionCible : directionFlanc;
        const span = document.createElement('span');
        span.className = index === 2 ? 'flanker-arrow flanker-target' : 'flanker-arrow';
        span.textContent = fleche(direction);
        span.setAttribute('aria-hidden', 'true');
        wordDiv.appendChild(span);
    }

    answersDiv.innerHTML = '';
    [
        { direction: 'gauche', texte: '← Gauche' },
        { direction: 'droite', texte: 'Droite →' }
    ].forEach(reponse => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn flanker-answer';
        btn.textContent = reponse.texte;
        btn.setAttribute('aria-label', reponse.direction);
        btn.onclick = () => verifierReponse(reponse.direction, directionCible);
        answersDiv.appendChild(btn);
    });
}

function creerEssaisAxCpt(nombre) {
    const autresEssaisParType = Math.max(1, Math.round(nombre * 0.1));
    const essais = [
        ...Array.from({ length: nombre - autresEssaisParType * 3 }, () => ({
            indice: 'A',
            test: 'X',
            cible: true
        })),
        ...Array.from({ length: autresEssaisParType }, () => ({
            indice: 'A',
            test: 'Y',
            cible: false
        })),
        ...Array.from({ length: autresEssaisParType }, () => ({
            indice: 'B',
            test: 'X',
            cible: false
        })),
        ...Array.from({ length: autresEssaisParType }, () => ({
            indice: 'B',
            test: 'Y',
            cible: false
        }))
    ];

    for (let index = essais.length - 1; index > 0; index--) {
        const autreIndex = Math.floor(Math.random() * (index + 1));
        [essais[index], essais[autreIndex]] = [essais[autreIndex], essais[index]];
    }

    return essais;
}

function prochaineQuestionAxCpt() {
    const essai = essaisAxCpt[tourActuel - 1];
    wordDiv.style.color = '#333';
    wordDiv.textContent = essai.indice;
    wordDiv.setAttribute('aria-label', 'Lettre-indice ' + essai.indice);
    gamePrompt.textContent = 'Mémorisez cette lettre-indice.';
    answersDiv.innerHTML = '';

    timeoutQuestion = setTimeout(() => {
        wordDiv.textContent = essai.test;
        wordDiv.setAttribute('aria-label', 'Lettre testée ' + essai.test);
        gamePrompt.textContent = 'Cible uniquement si X suit l’indice A.';
        answersDiv.innerHTML = '';

        [
            { valeur: true, texte: 'Cible' },
            { valeur: false, texte: 'Pas cible' }
        ].forEach(reponse => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn ax-cpt-answer';
            btn.textContent = reponse.texte;
            btn.onclick = () => verifierReponse(reponse.valeur, essai.cible);
            answersDiv.appendChild(btn);
        });

        tempsDebutQuestion = performance.now();
    }, 800);
}

function melanger(tableau) {
    for (let index = tableau.length - 1; index > 0; index--) {
        const autreIndex = Math.floor(Math.random() * (index + 1));
        [tableau[index], tableau[autreIndex]] = [tableau[autreIndex], tableau[index]];
    }
    return tableau;
}

function creerSequenceNBack(nombreTours, niveau, typeStimulus) {
    const banque = STIMULI_NBACK[typeStimulus];
    const nombreCibles = Math.min(
        nombreTours - 1,
        Math.max(1, Math.round(nombreTours * 0.3))
    );
    const cibles = melanger([
        ...Array(nombreCibles).fill(true),
        ...Array(nombreTours - nombreCibles).fill(false)
    ]);
    const sequence = Array.from({ length: niveau }, () =>
        banque[Math.floor(Math.random() * banque.length)]
    );

    cibles.forEach(cible => {
        const stimulusNBack = sequence[sequence.length - niveau];
        if (cible) {
            sequence.push(stimulusNBack);
        } else {
            const autresStimuli = banque.filter(stimulus => stimulus !== stimulusNBack);
            sequence.push(autresStimuli[Math.floor(Math.random() * autresStimuli.length)]);
        }
    });

    return sequence;
}

function afficherStimulusNBack(stimulus) {
    wordDiv.classList.remove('flanker-stimulus');
    wordDiv.classList.toggle('nback-shape-stimulus', typeStimulusNBack === 'formes');
    wordDiv.classList.remove('nback-stimulus-blank');
    wordDiv.removeAttribute('aria-hidden');
    wordDiv.style.color = '#333';
    wordDiv.innerHTML = '';

    if (typeStimulusNBack === 'formes') {
        const forme = FORMES.find(option => option.id === stimulus);
        wordDiv.setAttribute('aria-label', 'Stimulus ' + forme.nom.toLocaleLowerCase('fr-FR'));
        const icone = document.createElement('span');
        icone.className = 'shape-icon ' + forme.classe;
        icone.setAttribute('aria-hidden', 'true');
        wordDiv.appendChild(icone);
    } else {
        wordDiv.setAttribute('aria-label', 'Stimulus ' + stimulus);
        wordDiv.textContent = stimulus;
    }
}

function prochaineQuestionNBack() {
    if (tourActuel >= nbTours) {
        finDuJeu();
        return;
    }

    questionVerrouillee = false;
    feedback.textContent = '';
    feedback.className = '';
    answersDiv.innerHTML = '';

    const indexStimulus = indexSequenceNBack;
    const stimulus = sequenceNBack[indexStimulus];
    indexSequenceNBack++;
    afficherStimulusNBack(stimulus);

    if (indexStimulus < niveauNBack) {
        progress.textContent = 'Mémoire ' + (indexStimulus + 1) + '/' + niveauNBack;
        gamePrompt.textContent = 'Mémorisez les premiers stimuli.';
        timeoutQuestion = setTimeout(() => {
            masquerStimulusNBack();
            timeoutQuestion = setTimeout(prochaineQuestion, 600);
        }, dureeNBack * 1000);
        return;
    }

    tourActuel++;
    progress.textContent = tourActuel + '/' + nbTours;
    gamePrompt.textContent = 'Appuyez sur « Identique » si le stimulus correspond; sinon, ne faites rien.';
    cibleNBackActuelle = stimulus === sequenceNBack[indexStimulus - niveauNBack];

    const btn = document.createElement('button');
    btn.className = 'answer-btn nback-answer';
    btn.textContent = 'Identique';
    btn.onclick = () => verifierReponseNBack(true);
    answersDiv.appendChild(btn);

    timeoutQuestion = setTimeout(() => {
        if (!questionVerrouillee) verifierReponseNBack(false);
        masquerStimulusNBack();
        timeoutQuestion = setTimeout(prochaineQuestion, 600);
    }, dureeNBack * 1000);
}

function masquerStimulusNBack() {
    wordDiv.classList.add('nback-stimulus-blank');
    wordDiv.setAttribute('aria-hidden', 'true');
}

function verifierReponseNBack(aClique) {
    if (questionVerrouillee) return;
    questionVerrouillee = true;
    answersDiv.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
    });

    if (aClique && cibleNBackActuelle) {
        score++;
        essaisComptabilisesNBack++;
        feedback.textContent = '👍 Réussite !';
        feedback.className = 'good nback-feedback';
    } else if (aClique || cibleNBackActuelle) {
        echecsNBack++;
        essaisComptabilisesNBack++;
        feedback.textContent = '👎 Échec !';
        feedback.className = 'bad nback-feedback';
    } else {
        nonCiblesIgnoreesNBack++;
        feedback.textContent = '➖ Non-cible ignorée (non comptabilisée).';
        feedback.className = 'nback-feedback nback-feedback-neutral';
    }
}

function verifierReponse(choix, bonneReponse) {
    if (questionVerrouillee) return;
    questionVerrouillee = true;

    const tempsReaction = Math.round(performance.now() - tempsDebutQuestion);
    tempsReactions.push(tempsReaction);
    answersDiv.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
    });

    const bonneReponseChoisie = jeuActif === 'formes' && modeFormes === 2
        ? choix !== bonneReponse
        : choix === bonneReponse;

    if (bonneReponseChoisie) {
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
    arreterHorlogeT3A();
    document.body.classList.remove('t3a-active');
    screenGame.classList.remove('t3a-game-active');
    screenGame.classList.add('hidden');
    screenEnd.classList.remove('hidden');

    const estNBack = jeuActif === 'nback';
    const estT3A = jeuActif === 't3a';
    const echecs = estNBack ? echecsNBack : nbTours - score;
    const essaisEval = estNBack ? essaisComptabilisesNBack : nbTours;
    const precisionFormeT3A = precisionT3ATache(reussitesFormeT3A, erreursFormeT3A);
    const precisionCouleurT3A = precisionT3ATache(reussitesCouleurT3A, erreursCouleurT3A);
    const precisionsT3A = [precisionFormeT3A, precisionCouleurT3A]
        .filter(precisionTache => precisionTache !== null);
    const precision = estT3A
        ? precisionsT3A.length
            ? Math.round(precisionsT3A.reduce((total, valeur) => total + valeur, 0) / precisionsT3A.length)
            : 0
        : essaisEval
            ? Math.round((score / essaisEval) * 100)
            : 0;
    const tauxEchec = estNBack
        ? essaisComptabilisesNBack
            ? Math.round((echecsNBack / essaisComptabilisesNBack) * 100)
            : 0
        : 100 - precision;
    const reactionsPourResultat = estT3A ? reactionsT3A : tempsReactions;
    const moyenne = !estNBack && reactionsPourResultat.length
        ? Math.round(reactionsPourResultat.reduce((a, b) => a + b, 0) / reactionsPourResultat.length)
        : null;
    const tendanceReaction = estNBack
        ? 'indisponible'
        : calculerTendanceReaction(reactionsPourResultat);
    if (estT3A) score = precision;

    resultPlayer.textContent = '👤 ' + joueur;
    resultGame.textContent = '🎮 ' + libelleJeuActif();
    resultScore.textContent = estT3A
        ? resumeTacheT3A('Formes', reussitesFormeT3A, erreursFormeT3A) +
            ' · ' + resumeTacheT3A('Couleurs', reussitesCouleurT3A, erreursCouleurT3A)
        : estNBack
            ? '🎯 Réussites : ' + score + '/' + essaisEval
            : '🎯 Score : ' + score + '/' + nbTours;
    resultAccuracy.textContent = estT3A
        ? '📊 Précision — formes : ' +
            (precisionFormeT3A === null ? '—' : precisionFormeT3A + '%') +
            ' · couleurs : ' +
            (precisionCouleurT3A === null ? '—' : precisionCouleurT3A + '%')
        : estNBack
            ? '📊 Taux de réussite : ' + precision + '%'
            : '📊 Précision : ' + precision + '%';
    resultFailure.classList.toggle('hidden', !estNBack && !estT3A);
    resultFailure.textContent = estT3A
        ? '⚠ Erreurs — formes : ' + erreursFormeT3A +
            ' · couleurs : ' + erreursCouleurT3A +
            ' (dont ' + ciblesCouleurManqueesT3A + ' cibles couleur ignorées)'
        : estNBack
            ? '📉 Échecs : ' + echecs + '/' + essaisEval + ' — Taux d’échec : ' + tauxEchec + '%'
            : '';
    resultNeutral.classList.toggle('hidden', !estNBack);
    resultNeutral.textContent = estNBack
        ? '➖ Non-cibles ignorées : ' + nonCiblesIgnoreesNBack + ' (non comptabilisées)'
        : '';
    resultReaction.classList.toggle('hidden', estNBack);
    resultReaction.textContent = estNBack
        ? ''
        : estT3A
            ? '⚡ Temps moyen de détection : ' +
                (moyenne === null ? '—' : moyenne + ' ms')
            : '⚡ Temps de réaction moyen : ' + moyenne + ' ms';
    resultTrend.classList.toggle('hidden', estNBack);
    resultTrend.textContent = estNBack
        ? ''
        : '📈 Tendance des réactions : ' + descriptionTendanceReaction(tendanceReaction);

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
    const partie = {
        date: aujourdhui,
        score: score,
        tours: nbTours,
        precision: precision,
        reactionMoyenne: moyenne,
        tendanceReaction: tendanceReaction,
        jeu: jeuActif
    };
    if (jeuActif === 'formes') partie.modeFormes = modeFormes;
    if (jeuActif === 'nback') {
        partie.niveauNBack = niveauNBack;
        partie.typeStimulusNBack = typeStimulusNBack;
        partie.dureeNBack = dureeNBack;
        partie.echecs = echecsNBack;
        partie.essaisComptabilises = essaisComptabilisesNBack;
        partie.tauxEchec = tauxEchec;
        partie.nonCiblesIgnorees = nonCiblesIgnoreesNBack;
        partie.versionScoringNBack = 2;
    }
    if (estT3A) {
        partie.nombreManches = nombreManchesT3A;
        partie.dureeManche = dureeMancheT3A;
        partie.dureePause = dureePauseT3A;
        partie.intervalleForme = INTERVALLE_FORME_T3A / 1000;
        partie.dureeStimulusForme = DUREE_FORME_T3A / 1000;
        partie.cibles = ciblesT3A;
        partie.detections = detectionsT3A;
        partie.ciblesFormeManquees = erreursFormeT3A - faussesAlertesFormeT3A;
        partie.ciblesManquees = ciblesCouleurManqueesT3A + partie.ciblesFormeManquees;
        partie.ciblesCouleurManquees = ciblesCouleurManqueesT3A;
        partie.faussesAlertes = faussesAlertesT3A;
        partie.erreurs = totalErreursT3A();
        partie.decisions = decisionsT3A;
        partie.ciblesForme = ciblesFormeT3A;
        partie.reussitesForme = reussitesFormeT3A;
        partie.erreursForme = erreursFormeT3A;
        partie.reussitesCouleur = reussitesCouleurT3A;
        partie.erreursCouleur = erreursCouleurT3A;
        partie.faussesAlertesForme = faussesAlertesFormeT3A;
        partie.faussesAlertesCouleur = faussesAlertesCouleurT3A;
        partie.decisionsForme = decisionsFormeT3A;
        partie.decisionsCouleur = decisionsCouleurT3A;
        partie.precisionForme = precisionFormeT3A;
        partie.precisionCouleur = precisionCouleurT3A;
        partie.changementFormeCible = changerFormeCibleT3A;
        partie.changementCouleurCible = changerCouleurCibleT3A;
        partie.versionScoringT3A = 5;
    }
    sauvegarderPartie(partie);
}

// ============ VOLET STATISTIQUES ============
document.getElementById('btn-stats').onclick = () => {
    screenStart.classList.add('hidden');
    screenStats.classList.remove('hidden');
    statsTitle.textContent = '📊 Statistiques — ' + libelleJeuActif();

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
    document.title = libelleJeuActif();
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
    const estNBack = jeuActif === 'nback';
    const estT3A = jeuActif === 't3a';
    const parties = partiesDe(nom).filter(partie =>
        filtreTours === '' || Number(partie.tours) === Number(filtreTours)
    );

    if (parties.length === 0) return;

    const lignes = estNBack
        ? [
            ['Joueur', 'Jeu', 'Configuration', 'Date', 'Réussites', 'Essais évalués / tours', 'Taux de réussite (%)', 'Taux d’échec (%)', 'Non-cibles ignorées'],
            ...parties.map(partie => [
                nom,
                JEUX[jeuActif].nom,
                'N-' + niveauNBack + ' — ' + LIBELLES_STIMULI_NBACK[typeStimulusNBack] +
                    ' — ' + dureeNBack + ' s/essai',
                partie.date,
                partie.score,
                partie.essaisComptabilises + '/' + partie.tours,
                partie.precision,
                    partie.tauxEchec,
                    partie.nonCiblesIgnorees
            ])
        ]
        : estT3A
            ? [
                    [
                        'Joueur', 'Jeu', 'Date', 'Manches', 'Durée par manche (s)', 'Pause (s)',
                        'Intervalle formes (s)', 'Durée stimulus forme (s)',
                        'Réussites cumulées', 'Cibles', 'Formes cibles manquées',
                        'Cibles couleur ignorées', 'Fausses alertes', 'Erreurs totales',
                        'Réponses évaluées', 'Réussites formes', 'Erreurs formes',
                        'Réussites couleurs', 'Erreurs couleurs', 'Précision formes (%)',
                        'Précision couleurs (%)', 'Changement de forme cible',
                        'Changement de couleur cible', 'Précision moyenne (%)', 'Réaction moyenne (ms)'
                    ],
                ...parties.map(partie => [
                    nom,
                    JEUX[jeuActif].nom,
                    partie.date,
                    partie.nombreManches,
                    partie.dureeManche,
                    partie.dureePause,
                    partie.versionScoringT3A >= 5 ? partie.intervalleForme : '',
                    partie.versionScoringT3A >= 5 ? partie.dureeStimulusForme : '',
                    partie.detections,
                    partie.cibles,
                    partie.versionScoringT3A === 3 || partie.versionScoringT3A >= 5
                        ? partie.ciblesFormeManquees
                        : '',
                    partie.versionScoringT3A >= 3 ? partie.ciblesCouleurManquees : '',
                    partie.faussesAlertes,
                    partie.versionScoringT3A >= 3 ? partie.erreurs : '',
                    partie.decisions,
                    partie.versionScoringT3A >= 4 ? partie.reussitesForme : '',
                    partie.versionScoringT3A >= 4 ? partie.erreursForme : '',
                    partie.versionScoringT3A >= 4 ? partie.reussitesCouleur : '',
                    partie.versionScoringT3A >= 4 ? partie.erreursCouleur : '',
                    partie.versionScoringT3A >= 4 ? partie.precisionForme : '',
                    partie.versionScoringT3A >= 4 ? partie.precisionCouleur : '',
                    partie.changementFormeCible == null ? '' : partie.changementFormeCible ? 'Oui' : 'Non',
                    partie.changementCouleurCible == null ? '' : partie.changementCouleurCible ? 'Oui' : 'Non',
                    partie.precision,
                    partie.reactionMoyenne
                ])
            ]
        : [
            ['Joueur', 'Jeu', 'Version', 'Date', 'Score', 'Nombre de tours', 'Précision (%)', 'Réaction moyenne (ms)', 'Tendance réaction'],
            ...parties.map(partie => [
                nom,
                JEUX[jeuActif].nom,
                jeuActif === 'formes' ? MODES_FORMES[modeFormes].nom : '',
                partie.date,
                partie.score,
                partie.tours,
                partie.precision,
                partie.reactionMoyenne,
                libelleTendanceReaction(partie.tendanceReaction)
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
    const suffixeMode = jeuActif === 'formes' ? '-mode-' + modeFormes : '';
    const suffixeT3A = estT3A ? '-t3a' : '';
    const suffixeNBack = jeuActif === 'nback'
        ? '-n' + niveauNBack + '-' + typeStimulusNBack + '-' +
            String(dureeNBack).replace('.', '_') + 's'
        : '';
    lien.href = url;
    lien.download = 'parties-' + jeuActif + suffixeMode + suffixeT3A + suffixeNBack + '-' + nomFichier + '-' +
        new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(lien);
    lien.click();
    lien.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
});

function afficherStats(nom, reinitialiserFiltre) {
    const estNBack = jeuActif === 'nback';
    const estT3A = jeuActif === 't3a';
    statBestLabel.textContent = estT3A ? 'meilleure précision' : 'meilleur score';
    statAvgAccuracyLabel.textContent = estNBack
        ? 'taux de réussite moyen (essais évalués)'
        : estT3A ? 'précision moyenne des deux tâches' : 'précision moyenne';
    statAvgReactionLabel.textContent = estNBack
        ? 'taux d’échec moyen (essais évalués)'
        : estT3A ? 'temps moyen de détection' : 'réaction moyenne';
    statLatestTrendLabel.textContent = estNBack
        ? 'taux d’échec de la dernière partie'
        : estT3A ? 'erreurs formes / couleurs de la dernière partie' : 'tendance de la dernière partie';
    statsRoundFilterLabel.textContent = estT3A
        ? 'Filtrer par nombre de manches :'
        : 'Filtrer par nombre de tours :';
    statsScoreHeader.textContent = estT3A ? 'Réussites / erreurs' : 'Score';
    statsPrecisionHeader.textContent = estNBack
        ? 'Taux de réussite (évalués)'
        : estT3A ? 'Précision formes / couleurs' : 'Précision';
    statsReactionHeader.textContent = estNBack ? 'Taux d’échec (évalués)' : 'Réaction';
    statsTrendHeader.textContent = estNBack
        ? 'Non-cibles ignorées'
        : estT3A ? 'Erreurs formes / couleurs' : 'Tendance';

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

        const nombresDeTours = estT3A
            ? Array.from({ length: 10 }, (_, index) => index + 1)
            : Array.from({ length: 10 }, (_, index) => (index + 1) * 5);
        nombresDeTours.forEach(tours => {
            const option = document.createElement('option');
            option.value = String(tours);
            option.textContent = tours + (estT3A
                ? tours === 1 ? ' manche' : ' manches'
                : ' tours');
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
        statLatestTrend.textContent = '—';
        statsTableBody.innerHTML = '';
        statsEmpty.textContent = 'Aucune partie trouvée avec ' + nombreDeToursFiltre +
            (estT3A
                ? Number(nombreDeToursFiltre) === 1 ? ' manche.' : ' manches.'
                : ' tours.');
        statsEmpty.classList.remove('hidden');
        return;
    }

    statsEmpty.classList.add('hidden');
    statsContent.classList.remove('hidden');
    btnExportCsv.disabled = false;

    // ---- Stats globales ----
    statTotal.textContent = parties.length;

    const meilleur = Math.max(...parties.map(p => p.score));
    statBest.textContent = estT3A ? meilleur + '%' : meilleur;

    const precMoyenne = Math.round(
        parties.reduce((a, p) => a + p.precision, 0) / parties.length
    );
    statAvgAccuracy.textContent = precMoyenne + '%';

    if (estNBack) {
        const echecsMoyens = Math.round(
            parties.reduce((total, partie) => total + partie.tauxEchec, 0) / parties.length
        );
        statAvgReaction.textContent = echecsMoyens + '%';
        statLatestTrend.textContent = parties[parties.length - 1].tauxEchec + '%';
    } else {
        const reactions = parties
            .map(partie => partie.reactionMoyenne)
            .filter(Number.isFinite);
        const reacMoyenne = reactions.length
            ? Math.round(reactions.reduce((total, reaction) => total + reaction, 0) / reactions.length)
            : null;
        statAvgReaction.textContent = reacMoyenne === null ? '—' : reacMoyenne + ' ms';
        if (estT3A) {
            const dernierePartie = parties[parties.length - 1];
            statLatestTrend.textContent = dernierePartie.versionScoringT3A >= 4
                ? 'Formes ' + dernierePartie.erreursForme +
                    ' · Couleurs ' + dernierePartie.erreursCouleur
                : dernierePartie.versionScoringT3A >= 3 &&
                Number.isFinite(dernierePartie.erreurs)
                ? String(dernierePartie.erreurs)
                : '—';
        } else {
            statLatestTrend.textContent = libelleTendanceReaction(
                parties[parties.length - 1].tendanceReaction
            );
        }
    }

    // ---- Tableau détaillé (plus récentes en premier) ----
    statsTableBody.innerHTML = '';
    [...parties].reverse().forEach(p => {
        const tr = document.createElement('tr');

        // Mettre en avant le meilleur score
        if (p.score === meilleur) tr.classList.add('best-row');

        const tdDate = document.createElement('td');
        tdDate.textContent = p.date;
        const tdScore = document.createElement('td');
        tdScore.textContent = estT3A
            ? p.versionScoringT3A >= 4
                ? 'Formes ' + p.reussitesForme + '/' + p.erreursForme +
                    ' · Couleurs ' + p.reussitesCouleur + '/' + p.erreursCouleur
                : p.detections + '/' + p.cibles + ' détectées · ' +
                    (p.ciblesManquees == null ? '—' : p.ciblesManquees) + ' manquées'
            : estNBack
                ? p.score + '/' + p.essaisComptabilises
                : p.score + '/' + p.tours;
        const tdPrecision = document.createElement('td');
        tdPrecision.textContent = estT3A && p.versionScoringT3A >= 4
            ? 'F ' + (p.precisionForme == null ? '—' : p.precisionForme + '%') +
                ' · C ' + (p.precisionCouleur == null ? '—' : p.precisionCouleur + '%')
            : p.precision + '%';
        const tdReaction = document.createElement('td');
        tdReaction.textContent = estNBack
            ? p.tauxEchec + '%'
            : p.reactionMoyenne == null ? '—' : p.reactionMoyenne + ' ms';
        const tdTrend = document.createElement('td');
        tdTrend.textContent = estNBack
            ? p.nonCiblesIgnorees
            : estT3A
                ? p.versionScoringT3A >= 4
                    ? p.erreursForme + ' / ' + p.erreursCouleur
                    : p.versionScoringT3A >= 3 && Number.isFinite(p.erreurs)
                        ? p.erreurs
                        : '—'
                : libelleTendanceReaction(p.tendanceReaction);

        tr.appendChild(tdDate);
        tr.appendChild(tdScore);
        tr.appendChild(tdPrecision);
        tr.appendChild(tdReaction);
        tr.appendChild(tdTrend);
        statsTableBody.appendChild(tr);
    });
}