/* =====================================================================
   CHUNK « secu » — registre SECU_CHAPTERS / SECU_NOVA_KB
   Matière(s) : Autres|Sécurité et environnement
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   SECU_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE — Sécurité et environnement (Autres, L1)
   Contenu réel tiré du polycopié « Hygiène, sécurité et environnement (HSE) »,
   USTO-MB, Faculté de chimie, département de chimie physique (AIT AHMED Ourida).
   Structure identique aux autres modules : SECU_CHAPTERS / SECU_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const SECU_MATIERE = 'Sécurité et environnement';
function secuKey(chapterTitle){ return `Autres|${SECU_MATIERE}|${chapterTitle}`; }
const SECU_CHAPTERS = {};
const SECU_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Hygiène, sécurité et environnement : concepts et structure HSE =========================== */
SECU_CHAPTERS[secuKey('Hygiène, sécurité et environnement : concepts et structure HSE')] = {
  objectives: [
    "Définir précisément l'hygiène, la sécurité et l'environnement et distinguer leurs champs d'action",
    "Identifier les dix points fondamentaux d'une démarche de sécurité en entreprise",
    "Décrire le rôle, les missions et le cycle d'amélioration continue d'une structure HSE",
    "Situer le cadre réglementaire algérien relatif à l'hygiène, la sécurité et l'environnement",
    "Évaluer en quoi le cycle d'amélioration continue de Deming, conçu à l'origine pour le contrôle qualité industriel, s'applique avec la même pertinence à une démarche de sécurité au travail, qui ne peut jamais être considérée comme définitivement acquise"
  ],
  prereqs: ["Aucun prérequis particulier — chapitre d'introduction au domaine HSE"],
  bodyHtml: `
    <p>Le cycle en quatre étapes que tu vas étudier dans ce chapitre — Planifier, Dérouler, Contrôler, Corriger — porte le nom de « roue de Deming » en hommage au statisticien américain William Edwards Deming, qui le popularisa au Japon dans les années 1950. Deming lui-même attribuait généreusement la paternité de cette idée à son mentor, Walter Shewhart, ingénieur chez Bell Labs qui l'avait développée dès les années 1930 pour le contrôle qualité industriel. L'application de ce cycle à la reconstruction industrielle japonaise d'après-guerre fut si spectaculairement efficace qu'elle est aujourd'hui largement créditée d'avoir posé les bases du « miracle économique japonais ».</p>
    <p>Ce même cycle d'amélioration continue, conçu à l'origine pour la qualité des produits industriels, s'est révélé tout aussi puissant lorsqu'il fut appliqué à la sécurité au travail : une politique HSE n'est jamais un dispositif figé une fois pour toutes, mais un processus vivant qui doit être régulièrement réévalué, corrigé et amélioré — exactement la logique que tu retrouveras dans le dixième et dernier point fondamental d'une démarche de sécurité présenté dans ce chapitre : la persévérance.</p>
    <p>Dans le monde du travail des sociétés modernes, la mise en œuvre d'une politique <strong>Hygiène, Sécurité, Environnement (HSE)</strong> est devenue indispensable. Au-delà du drame humain que représente un accident du travail ou une maladie professionnelle, les conséquences économiques et juridiques pour l'entreprise sont considérables. Une politique HSE bien intégrée permet de réduire les accidents, de limiter les nuisances sur l'environnement et de procurer des avantages économiques et sociaux à l'entreprise. À la fin de ce chapitre, tu sauras distinguer précisément hygiène, sécurité et environnement, identifier les dix piliers d'une démarche de sécurité efficace, et situer le cadre réglementaire algérien qui encadre ces obligations.</p>

    <h3>1. Trois notions à ne pas confondre</h3>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th><th>Exemples en milieu professionnel</th></tr>
      <tr><td>Hygiène</td><td>Ensemble des moyens collectifs ou individuels visant à préserver ou favoriser la santé</td><td>Nettoyage des locaux, aération, lutte contre les maladies contagieuses</td></tr>
      <tr><td>Sécurité</td><td>Absence d'accidents ou de risque inacceptable ; ensemble des mesures de prévention et de secours</td><td>Consignes de travail, formation, équipements de protection</td></tr>
      <tr><td>Environnement</td><td>Préservation du cadre naturel (air, eau, sol, faune, flore) autour de l'activité</td><td>Traitement des rejets, gestion des déchets, technologies propres</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">À retenir</span>
      La sécurité n'est pas l'affaire d'un spécialiste isolé : elle est intégrée à toutes les activités de l'entreprise, et chacun est responsable de sa propre sécurité et de celle des personnes qui l'entourent.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dire que la sécurité est l'affaire de chacun, et non d'un seul service spécialisé, change concrètement la façon dont une entreprise doit organiser la formation et la communication interne. En quoi cette responsabilité partagée, plutôt que déléguée à un seul expert, rend-elle une politique de sécurité plus robuste face à des situations imprévues que l'expert isolé n'aurait pas anticipées ?
    </div>

    <h3>2. Les objectifs de l'hygiène, à trois niveaux</h3>
    <p>L'hygiène au travail poursuit des objectifs à trois échelles complémentaires :</p>
    <table class="mini-table">
      <tr><th>Niveau</th><th>Objectif</th></tr>
      <tr><td>Opérationnel</td><td>Garantir la santé des personnes au travail</td></tr>
      <tr><td>Stratégique</td><td>Identifier les agressions du milieu industriel, évaluer les risques, recommander des actions de protection et vérifier leur efficacité</td></tr>
      <tr><td>Tactique</td><td>Informer sur la nature des risques, faire connaître les moyens de les maîtriser, impliquer chaque travailleur</td></tr>
    </table>

    <h3>3. Les dix points fondamentaux d'une démarche de sécurité</h3>
    <p>Quelle que soit la taille de l'entreprise, une démarche de sécurité efficace repose toujours sur les mêmes dix piliers :</p>
    <table class="mini-table">
      <tr><th>#</th><th>Point clé</th></tr>
      <tr><td>1</td><td>Engagement des dirigeants — une politique de sécurité clairement définie et suivie</td></tr>
      <tr><td>2</td><td>Règles clairement établies, connues et réellement appliquées</td></tr>
      <tr><td>3</td><td>Objectifs clairs, réalistes, accompagnés des moyens pour les atteindre</td></tr>
      <tr><td>4</td><td>Formation (consignes, secourisme, gestes techniques, méthodes d'analyse)</td></tr>
      <tr><td>5</td><td>Exploitation du retour d'expérience (analyse des accidents, y compris ceux survenus ailleurs)</td></tr>
      <tr><td>6</td><td>Motivation du personnel</td></tr>
      <tr><td>7</td><td>Communication organisée à travers la hiérarchie</td></tr>
      <tr><td>8</td><td>Organisation spécifique (instance de direction dédiée)</td></tr>
      <tr><td>9</td><td>Contrôle et recyclage réguliers</td></tr>
      <tr><td>10</td><td>Persévérance — tout arrêt dans le suivi entraîne l'échec de la politique</td></tr>
    </table>

    <h3>4. Le rôle et le cycle d'amélioration d'une structure HSE</h3>
    <p>Le rôle d'une structure HSE est de <strong>protéger l'homme et son environnement contre l'homme</strong>, par la prévention, l'élimination et la réduction des risques. Son fonctionnement suit la roue de Deming, un cycle d'amélioration continue en quatre temps :</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Contenu</th></tr>
      <tr><td>1. Planifier</td><td>Définir la politique HSE du site (objectifs, moyens)</td></tr>
      <tr><td>2. Dérouler / Faire</td><td>Rédiger les consignes, former le personnel, diffuser la documentation</td></tr>
      <tr><td>3. Contrôler</td><td>Tournées HSE, audits, analyse des dysfonctionnements, statistiques</td></tr>
      <tr><td>4. Corriger</td><td>Tirer les enseignements des erreurs, initier les actions correctives</td></tr>
    </table>
    <p>Les missions d'un service HSE se déclinent en quatre volets : la <strong>recherche</strong> (analyse d'accidents, veille réglementaire), l'<strong>opérationnel</strong> (formation, lutte incendie, premiers secours), le <strong>fonctionnel/conseil</strong> (participation à la conception des installations) et la <strong>liaison</strong> avec la médecine du travail, les organismes d'État et les représentants du personnel (CHSCT).</p>

    <h3>5. Cadre réglementaire (exemple algérien)</h3>
    <div class="key-point">
      <span class="eyebrow">Deux textes fondateurs</span>
      La <strong>loi n° 88-07</strong> du 26 janvier 1988 relative à l'hygiène, la sécurité et la médecine du travail impose à l'employeur d'assurer l'hygiène et la sécurité des travailleurs, de financer la médecine du travail, et de désigner un agent permanent à l'hygiène et à la sécurité dès que l'organisme emploie plus de 9 personnes. La <strong>loi n° 03-10</strong> du 19 juillet 2003 relative à la protection de l'environnement fixe, elle, les principes de développement durable (précaution, pollueur-payeur, information et participation du public).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le seuil de 9 salariés fixé par la loi 88-07 pour désigner un agent permanent à l'hygiène et à la sécurité peut sembler arbitraire. En quoi ce type de seuil réglementaire précis, même s'il paraît arbitraire dans sa valeur exacte, répond-il à un besoin réel : distinguer les petites structures où la sécurité peut rester informelle, des organisations plus grandes qui nécessitent une organisation dédiée ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une entreprise de 40 salariés n'a désigné aucun responsable HSE. Est-ce conforme à la réglementation algérienne ?</p>
      <p><strong>Solution :</strong> non. La loi 88-07 impose à tout organisme employant plus de 9 personnes de désigner un agent permanent à l'hygiène et à la sécurité. Avec 40 salariés, l'entreprise est largement au-delà de ce seuil et doit régulariser sa situation.</p>
      <p class="example-answer">Réponse : non conforme — un agent permanent HSE doit être désigné.</p>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La recherche moderne en sécurité industrielle a considérablement affiné la compréhension des causes d'accidents depuis l'époque des dix piliers présentés dans ce chapitre. En 1990, le psychologue britannique James Reason proposa le « modèle du gruyère » (Swiss Cheese Model), une représentation devenue une référence internationale : un accident grave ne survient presque jamais à cause d'une seule défaillance isolée, mais parce que plusieurs failles de sécurité indépendantes — chacune représentée par un trou dans une tranche de gruyère — s'alignent exceptionnellement toutes en même temps, laissant passer le danger jusqu'à l'accident. Ce modèle explique pourquoi une démarche de sécurité robuste multiplie délibérément les barrières de protection indépendantes, plutôt que de compter sur une seule ligne de défense.</p>
    <p><strong>Question ouverte :</strong> comment une organisation peut-elle identifier à l'avance les « trous » potentiels dans ses différentes barrières de sécurité, avant qu'un alignement malheureux ne provoque un accident réel ?</p>
    <p><strong>Concept avancé :</strong> la notion de <strong>culture de sécurité</strong>, développée par la recherche en facteurs humains, distingue les organisations où la sécurité reste une contrainte administrative imposée, de celles où elle est véritablement intégrée aux réflexes quotidiens de chaque salarié — une distinction qui rejoint directement le dixième point fondamental de ce chapitre : la persévérance dans le temps.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Politique HSE de l'entreprise → distinction hygiène/sécurité/environnement → 10 piliers (engagement, règles, objectifs, formation, retour d'expérience...) → structure HSE (recherche, opérationnel, conseil, liaison) → cycle de Deming (Planifier → Faire → Contrôler → Corriger) en boucle continue → cadre réglementaire (lois 88-07 et 03-10 en Algérie)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Planifier} \\rightarrow \\text{Faire} \\rightarrow \\text{Contrôler} \\rightarrow \\text{Corriger} \\rightarrow (\\text{retour à Planifier})$$
      Ce cycle, hérité de Deming et Shewhart, résume l'esprit de toute démarche de sécurité durable : jamais une action ponctuelle et définitive, mais une boucle continue qui se corrige et s'améliore sans cesse — la persévérance, dixième et dernier pilier de ce chapitre, n'étant rien d'autre que ce cycle maintenu sans interruption dans le temps.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Deming n'avait jamais exporté les méthodes de Shewhart vers le Japon dans les années 1950 : le cycle PDCA aurait-il connu la même diffusion mondiale dans l'industrie et la sécurité au travail ?</li>
        <li>Pourquoi l'arrêt, même temporaire, d'une démarche de sécurité (le dixième point du cours) peut-il annuler les bénéfices de tous les efforts précédents, plutôt que de simplement ralentir les progrès ?</li>
        <li>Quelle serait la conséquence, pour la prévention des accidents industriels graves, d'une organisation reposant sur une seule ligne de défense plutôt que sur plusieurs barrières de sécurité indépendantes, comme le suggère le modèle du gruyère de Reason ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. E. Deming, <em>Out of the Crisis</em>, MIT Press, 1982 — l'ouvrage de référence sur le cycle d'amélioration continue popularisé par Deming.</li>
        <li>J. Reason, « Human Error: Models and Management », BMJ, 2000 — l'article présentant le modèle du gruyère des causes d'accidents.</li>
        <li>Journal officiel de la République algérienne, lois n° 88-07 et n° 03-10 — les textes réglementaires de référence de ce chapitre.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais distinguer précisément hygiène, sécurité et environnement, identifier les dix piliers d'une démarche de sécurité efficace, et situer le cadre réglementaire algérien qui encadre ces obligations. Le chapitre suivant, « Accidents de travail : danger, risque et enquête », approfondira la méthode d'analyse à appliquer lorsque, malgré cette démarche préventive, un accident survient malgré tout. Comme le montre le modèle du gruyère de Reason : la sécurité n'est jamais acquise une fois pour toutes, elle se construit et se reconstruit continuellement, barrière après barrière.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Hygiène = préserver la santé ; Sécurité = absence de risque inacceptable ; Environnement = protection du cadre naturel</li>
        <li>La démarche de sécurité repose sur 10 piliers, à commencer par l'engagement des dirigeants et se terminant par la persévérance</li>
        <li>Le service HSE fonctionne selon la roue de Deming : Planifier → Faire → Contrôler → Corriger</li>
        <li>En Algérie, la loi 88-07 encadre l'hygiène/sécurité au travail, la loi 03-10 encadre la protection de l'environnement</li>
        <li>Au-delà de 9 salariés, la désignation d'un agent permanent à l'hygiène et à la sécurité est obligatoire</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la sécurité est uniquement l'affaire du service HSE, alors qu'elle concerne chaque salarié à son poste</li>
        <li>Confondre hygiène (préservation de la santé) et sécurité (absence d'accident) : ce sont deux notions complémentaires mais distinctes</li>
        <li>Oublier que la roue de Deming est un cycle continu, pas une démarche ponctuelle réalisée une seule fois</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La roue de Deming appliquée au service HSE se compose des quatre étapes suivantes :</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu1e1" value="wrong"> Analyser, Décider, Exécuter, Archiver</label>
          <label class="option"><input type="radio" name="secu1e1" value="right"> Planifier, Dérouler/Faire, Contrôler, Corriger</label>
          <label class="option"><input type="radio" name="secu1e1" value="wrong"> Auditer, Sanctionner, Former, Reporter</label>
          <label class="option"><input type="radio" name="secu1e1" value="wrong"> Prévenir, Guérir, Indemniser, Clore</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu1e1','secu1fb1','Correct — c\\'est le cycle d\\'amélioration continue (PDCA) appliqué au service HSE.','Relis la partie sur le cycle d\\'amélioration continue de la structure HSE : quatre verbes s\\'enchaînent en boucle.')">Vérifier</button>
        <div class="feedback" id="secu1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Selon la loi algérienne n° 88-07, à partir de combien de salariés un organisme employeur doit-il désigner un agent permanent à l'hygiène et à la sécurité ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu1e2" value="wrong"> 5 salariés</label>
          <label class="option"><input type="radio" name="secu1e2" value="right"> plus de 9 salariés</label>
          <label class="option"><input type="radio" name="secu1e2" value="wrong"> 50 salariés</label>
          <label class="option"><input type="radio" name="secu1e2" value="wrong"> 100 salariés</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu1e2','secu1fb2','Correct — le seuil fixé par la loi 88-07 est de plus de 9 personnes employées.','Le seuil est assez bas : relis la partie \\'Organisation de la prévention\\'.')">Vérifier</button>
        <div class="feedback" id="secu1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'objectif « garantir la santé des personnes au travail » relève de quel niveau d'objectif de l'hygiène ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu1e3" value="right"> Opérationnel</label>
          <label class="option"><input type="radio" name="secu1e3" value="wrong"> Stratégique</label>
          <label class="option"><input type="radio" name="secu1e3" value="wrong"> Tactique</label>
          <label class="option"><input type="radio" name="secu1e3" value="wrong"> Réglementaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu1e3','secu1fb3','Correct — c\\'est l\\'unique objectif opérationnel, direct et immédiat.','Il y a trois niveaux : opérationnel (direct), stratégique (analyse), tactique (formation). Lequel est le plus direct ?')">Vérifier</button>
        <div class="feedback" id="secu1fb3"></div>
      </div>
    </div>
  `
};

SECU_NOVA_KB[secuKey('Hygiène, sécurité et environnement : concepts et structure HSE')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Hygiène, sécurité et environnement : concepts et structure HSE ». Demande-moi de définir hygiène/sécurité/environnement, de détailler les 10 points d'une démarche de sécurité, la roue de Deming, ou un indice sur un exercice.",
  rules: [
    { test:/hygi[eè]ne/i, replies:["L'hygiène, c'est l'ensemble des moyens collectifs ou individuels visant à préserver ou favoriser la santé : propreté des locaux, aération, lutte contre les maladies contagieuses en milieu professionnel."] },
    { test:/environnement/i, replies:["L'environnement, dans une démarche HSE, désigne la préservation du cadre naturel : air, eau, sol, faune et flore. Cela passe par le traitement des rejets, la gestion des déchets et l'utilisation de technologies plus propres."] },
    { test:/s[ée]curit[ée]/i, replies:["La sécurité, c'est l'absence d'accidents ou de risque inacceptable, et l'ensemble des mesures de prévention et de secours. Elle n'est pas l'affaire d'un spécialiste isolé : chacun est responsable de sa sécurité et de celle des autres."] },
    { test:/dix points|10 points|d[ée]marche de s[ée]curit[ée]/i, replies:["Les 10 points sont : engagement des dirigeants, règles claires et appliquées, objectifs et plans d'action, formation, retour d'expérience, motivation, communication, organisation spécifique, contrôle/recyclage, et persévérance."] },
    { test:/deming|roue de deming|cycle/i, replies:["La roue de Deming appliquée au HSE, c'est Planifier (définir la politique) → Dérouler/Faire (former, diffuser les consignes) → Contrôler (audits, tournées) → Corriger (actions correctives). C'est un cycle continu, jamais figé."] },
    { test:/mission|r[ôo]le.*hse|service hse/i, replies:["Le rôle du service HSE est de protéger l'homme et son environnement contre l'homme, via la prévention. Ses missions se répartissent en 4 volets : recherche, opérationnel, fonctionnel/conseil, et liaison avec la médecine du travail et les organismes d'État."] },
    { test:/loi 88-07|loi 03-10|r[ée]glementation/i, replies:["En Algérie, la loi 88-07 (1988) encadre l'hygiène, la sécurité et la médecine du travail — elle impose un agent permanent HSE au-delà de 9 salariés. La loi 03-10 (2003) encadre la protection de l'environnement dans le cadre du développement durable."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : relis le cycle en 4 étapes du service HSE, chaque étape correspond à un verbe d'action.","Indice niveau 2 : ça commence par « Planifier » et se termine par « Corriger ».","Indice niveau 3 : Planifier, Dérouler/Faire, Contrôler, Corriger."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le seuil de la loi 88-07 est un chiffre à un chiffre.","Indice niveau 2 : c'est un seuil bas, pas 50 ni 100.","Indice niveau 3 : plus de 9 salariés."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : parmi les 3 niveaux d'objectifs (opérationnel, stratégique, tactique), lequel est le plus direct et immédiat ?","Indice niveau 2 : ce n'est pas celui qui analyse, ni celui qui forme.","Indice niveau 3 : c'est le niveau opérationnel."] }
  ]
};

/* =========================== CHAPITRE 2 — Accidents de travail : danger, risque et enquête =========================== */
SECU_CHAPTERS[secuKey('Accidents de travail : danger, risque et enquête')] = {
  objectives: [
    "Distinguer danger, risque, exposition, presque-accident, incident et accident de travail",
    "Utiliser la matrice gravité-probabilité pour évaluer un risque",
    "Calculer l'indice de fréquence et le taux de gravité d'un accident de travail",
    "Décrire la méthode de l'arbre des causes et le diagramme d'Ishikawa (5M)",
    "Évaluer en quoi la méthode de l'arbre des causes, développée par l'INRS pour bannir toute recherche de coupable, transforme l'analyse d'un accident en une démarche de compréhension factuelle plutôt qu'en une quête de responsabilité individuelle"
  ],
  prereqs: ["Hygiène, sécurité et environnement : concepts et structure HSE"],
  bodyHtml: `
    <p>En 1968, l'ingénieur japonais Kaoru Ishikawa, disciple de la même école de la qualité que Deming évoqué au chapitre précédent, mit au point le diagramme causes-effet qui porte aujourd'hui son nom — un outil né du constat que la plupart des dysfonctionnements industriels résultent rarement d'une cause unique, mais d'un enchevêtrement de facteurs relevant de catégories bien distinctes. Ishikawa organisa ces causes potentielles en cinq familles mémorisables, les « 5M », une structure si efficace qu'elle reste, plus d'un demi-siècle plus tard, l'un des outils les plus enseignés dans le monde entier pour analyser méthodiquement un problème.</p>
    <p>La méthode complémentaire de l'arbre des causes, développée en France dans les années 1970 par l'Institut National de Recherche et de Sécurité (INRS), répond à une préoccupation similaire mais appliquée spécifiquement aux accidents du travail : comprendre factuellement l'enchaînement des événements qui a conduit à un accident, sans jamais chercher un coupable à blâmer. Cette approche, résolument tournée vers la prévention plutôt que la sanction, a profondément transformé la culture de l'analyse d'accidents dans l'industrie française et au-delà.</p>
    <p>Toute action visant à diminuer durablement les risques d'accident repose sur une distinction rigoureuse du vocabulaire : un <strong>danger</strong> n'est pas un <strong>risque</strong>, et un <strong>accident</strong> n'est pas un <strong>incident</strong>. Cette précision conditionne la qualité de l'analyse et donc de la prévention. À la fin de ce chapitre, tu sauras distinguer précisément ces notions, calculer les indicateurs statistiques d'accidentalité, et mener une analyse méthodique des causes d'un accident.</p>

    <h3>1. Danger, risque et exposition</h3>
    <p>Le <strong>danger</strong> désigne une situation matérielle comportant un potentiel d'atteinte à l'intégrité physique des personnes, aux biens ou à l'environnement. Le <strong>risque</strong> est l'évaluation de l'exposition à ce danger : c'est la combinaison de la probabilité d'occurrence d'un dysfonctionnement et de sa gravité potentielle.</p>
    <div class="formula-box">$$\\text{Risque} = \\text{Danger} \\times \\text{Exposition}$$</div>
    <div class="key-point">
      <span class="eyebrow">Exemple simple</span>
      Un pot de fleur en équilibre instable sur un rebord est un <em>danger</em>. S'il n'y a personne en dessous, l'<em>exposition</em> est nulle : le <em>risque</em> est faible ou nul. Si des ouvriers passent régulièrement dessous, l'exposition est forte et le risque devient élevé — le danger, lui, n'a pourtant pas changé.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'exemple du pot de fleur montre que le danger reste identique, que des ouvriers passent dessous ou non — seule l'exposition, et donc le risque, change. En quoi cette distinction change-t-elle concrètement la stratégie de prévention : agir sur le danger lui-même (fixer le pot) est-il toujours possible, ou faut-il parfois se contenter de réduire l'exposition (interdire le passage) ?
    </div>

    <h3>2. La matrice d'évaluation des risques</h3>
    <p>Le niveau de risque est classiquement défini par deux dimensions : le <strong>niveau de gravité</strong> (dommages potentiels aux personnes et aux biens) et le <strong>niveau de probabilité</strong> (estimation de son occurrence). Croiser ces deux axes dans une matrice gravité × probabilité permet de classer chaque situation en risque acceptable, modéré, élevé ou inacceptable, et donc de prioriser les actions de prévention.</p>

    <h3>3. Les trois familles de risques</h3>
    <table class="mini-table">
      <tr><th>Famille</th><th>Caractéristique</th></tr>
      <tr><td>Risques industriels</td><td>Accidents majeurs (incendies, explosions, rejets toxiques) pouvant faire de nombreuses victimes et une pollution importante</td></tr>
      <tr><td>Risques professionnels</td><td>Accidents du travail et maladies professionnelles, limités aux salariés exposés à leur poste</td></tr>
      <tr><td>Risques de la vie courante</td><td>Risques domestiques, bricolage, loisirs — touchent le plus souvent une seule personne</td></tr>
    </table>

    <h3>4. Accident, presque-accident, incident</h3>
    <table class="mini-table">
      <tr><th>Terme</th><th>Définition</th></tr>
      <tr><td>Accident de travail</td><td>Atteinte corporelle avec lésions, produite par une action extérieure soudaine et rapide</td></tr>
      <tr><td>Presque-accident</td><td>Événement soudain et imprévu qui aurait pu, dans des conditions légèrement différentes, occasionner un accident (pas de blessé, mais des dommages matériels)</td></tr>
      <tr><td>Incident</td><td>Événement non souhaité survenu au travail, sans lésion corporelle ni dommage notable</td></tr>
    </table>
    <p>L'échelle de gravité ascendante classe les événements de l'incident (aucun blessé) à la catastrophe majeure (1000 morts et plus), en passant par l'accident (1 ou plusieurs blessés), l'accident grave (1 à 9 morts) et l'accident très grave (10 à 99 morts).</p>

    <h3>5. Indicateurs statistiques des accidents de travail</h3>
    <div class="formula-box">
      $$IF = \\dfrac{\\text{Nombre d'accidents avec arrêt} \\times 1000}{\\text{Nombre de salariés}}$$
      $$\\text{Taux de gravité} = \\dfrac{\\text{Nombre de jours arrêtés} \\times 1000}{\\text{Nombre d'heures travaillées}}$$
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une entreprise de 500 salariés a enregistré 6 accidents avec arrêt sur l'année. Calculer l'indice de fréquence.</p>
      <p><strong>Solution :</strong> $IF = \\dfrac{6 \\times 1000}{500} = 12$.</p>
      <p class="example-answer">Réponse : IF = 12 accidents avec arrêt pour 1000 salariés.</p>
    </div>

    <h3>6. Analyser un accident : arbre des causes et diagramme d'Ishikawa</h3>
    <p>La méthode de l'<strong>arbre des causes</strong> part de l'événement final (l'accident) et remonte, de proche en proche, aux causes immédiates, nécessaires et suffisantes (INS), en se demandant systématiquement « quelle(s) cause(s) a-t-il fallu pour obtenir cette conséquence, et est-elle suffisante ? ». Elle exclut toute recherche de coupable.</p>
    <p>Le <strong>diagramme d'Ishikawa</strong> (ou diagramme causes-effet) classe les causes possibles d'un problème selon 5 familles, dites les <strong>5M</strong> :</p>
    <table class="mini-table">
      <tr><th>M</th><th>Famille de causes</th></tr>
      <tr><td>Main d'œuvre</td><td>Compétence, formation, comportement humain</td></tr>
      <tr><td>Matière</td><td>Ressources, produits, énergies mises en œuvre</td></tr>
      <tr><td>Milieu</td><td>Ambiance de travail : bruit, température, encombrement</td></tr>
      <tr><td>Matériel</td><td>Machines, outils, équipements</td></tr>
      <tr><td>Méthode</td><td>Mode opératoire, procédures, organisation du travail</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'arbre des causes exclut volontairement toute recherche de coupable, se concentrant uniquement sur l'enchaînement factuel des causes nécessaires et suffisantes. Pourquoi cette posture délibérément non accusatoire favorise-t-elle, en pratique, une analyse plus complète et plus honnête qu'une enquête cherchant d'abord à désigner un responsable ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La philosophie « sans recherche de coupable » de l'arbre des causes a inspiré, dans l'aviation civile, l'un des systèmes de sécurité les plus efficaces jamais développés : le système ASRS (Aviation Safety Reporting System), créé aux États-Unis en 1976, garantit l'anonymat total à tout pilote ou contrôleur aérien qui signale volontairement une erreur ou un incident, en échange d'une immunité disciplinaire. Ce dispositif, fondé sur l'idée que la peur de la sanction pousse à dissimuler les erreurs plutôt qu'à les signaler, a permis de collecter des centaines de milliers de témoignages précieux qui auraient été perdus dans un système punitif classique — expliquant en partie pourquoi l'aviation commerciale est devenue l'un des modes de transport les plus sûrs au monde.</p>
    <p><strong>Question ouverte :</strong> un système de signalement sans blâme, efficace dans l'aviation civile, pourrait-il être généralisé à d'autres secteurs industriels sans risquer de déresponsabiliser complètement les acteurs impliqués dans un accident grave ?</p>
    <p><strong>Technologie émergente :</strong> les algorithmes d'<strong>analyse prédictive des risques</strong>, s'appuyant sur l'apprentissage automatique et de vastes bases de données d'accidents passés, commencent à identifier automatiquement des combinaisons de facteurs de risque (5M) qui précèdent statistiquement un accident, avant même qu'il ne survienne.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Situation de travail → danger identifié → risque = danger × exposition → classement par matrice gravité/probabilité → si accident : analyse factuelle par arbre des causes (causes nécessaires et suffisantes) et diagramme d'Ishikawa (5M) → indicateurs statistiques (IF, taux de gravité) pour le suivi global
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Risque} = \\text{Danger} \\times \\text{Exposition}$$
      Cette équation, apparemment simple, résume la logique entière de la prévention : réduire un risque ne signifie pas nécessairement éliminer le danger (souvent impossible), mais peut tout aussi bien consister à réduire l'exposition des personnes à ce danger — deux leviers d'action distincts que toute politique de prévention efficace doit envisager simultanément.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Kaoru Ishikawa n'avait jamais structuré les causes de dysfonctionnement en 5 familles mémorisables : les analyses de causes resteraient-elles aujourd'hui aussi méthodiques et systématiques ?</li>
        <li>Pourquoi un incident sans aucun blessé ni dommage matériel mérite-t-il malgré tout d'être signalé et analysé, au même titre qu'un accident grave ?</li>
        <li>Quelle serait la conséquence, pour la sécurité aérienne mondiale, d'une suppression du système de signalement anonyme et sans blâme comme l'ASRS ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>K. Ishikawa, <em>Guide to Quality Control</em>, Asian Productivity Organization, 1968 — l'ouvrage introduisant le diagramme causes-effet et les 5M.</li>
        <li>INRS, <em>L'arbre des causes : méthode d'analyse des accidents du travail</em> — la documentation de référence de la méthode française.</li>
        <li>NASA, Aviation Safety Reporting System (ASRS), documentation officielle depuis 1976 — sur le système de signalement anonyme sans blâme dans l'aviation civile.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais distinguer précisément danger, risque, incident et accident, calculer les indicateurs statistiques d'accidentalité, et mener une analyse méthodique des causes d'un accident. Le chapitre suivant, « Phénomènes d'incendie et d'explosion », appliquera cette même rigueur d'analyse à une famille de risques industriels particulièrement dévastateurs. Comme le montre le succès du système ASRS dans l'aviation : une culture de signalement sans peur de la sanction, plutôt qu'une recherche systématique de coupables, reste l'un des leviers les plus puissants pour réellement améliorer la sécurité.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Risque = Danger × Exposition : sans exposition, un danger réel n'engendre pas de risque</li>
        <li>Incident (aucun blessé) < presque-accident (dommages matériels, pas de blessé) < accident (lésion corporelle)</li>
        <li>IF = (accidents avec arrêt × 1000) / nombre de salariés ; Taux de gravité = (jours arrêtés × 1000) / heures travaillées</li>
        <li>L'arbre des causes est une méthode déductive, factuelle, qui ne cherche jamais de coupable</li>
        <li>Le diagramme d'Ishikawa classe les causes en 5M : Main d'œuvre, Matière, Milieu, Matériel, Méthode</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre danger (potentiel de dommage) et risque (probabilité × gravité, dépend de l'exposition)</li>
        <li>Oublier de multiplier par 1000 dans le calcul de l'indice de fréquence ou du taux de gravité</li>
        <li>Utiliser l'arbre des causes pour chercher un responsable plutôt que pour comprendre l'enchaînement des faits</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un marteau tombe à quelques centimètres d'un ouvrier sans le toucher, mais l'effraie. Il s'agit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu2e1" value="wrong"> d'un incident</label>
          <label class="option"><input type="radio" name="secu2e1" value="right"> d'un presque-accident</label>
          <label class="option"><input type="radio" name="secu2e1" value="wrong"> d'un accident sans arrêt</label>
          <label class="option"><input type="radio" name="secu2e1" value="wrong"> d'un accident avec incapacité permanente</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu2e1','secu2fb1','Correct — pas de blessé, mais l\\'événement aurait pu, dans des conditions légèrement différentes, causer un accident : c\\'est la définition même du presque-accident.','Il n\\'y a ni blessé ni dommage matériel réel ici — mais l\\'événement aurait pu mal tourner. Relis la distinction incident / presque-accident / accident.')">Vérifier</button>
        <div class="feedback" id="secu2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une entreprise de 200 salariés enregistre 4 accidents avec arrêt sur l'année. Son indice de fréquence est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu2e2" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="secu2e2" value="right"> 20</label>
          <label class="option"><input type="radio" name="secu2e2" value="wrong"> 50</label>
          <label class="option"><input type="radio" name="secu2e2" value="wrong"> 800</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu2e2','secu2fb2','Correct — IF = (4 × 1000) / 200 = 20.','Applique la formule IF = (nombre d\\'accidents avec arrêt × 1000) / nombre de salariés.')">Vérifier</button>
        <div class="feedback" id="secu2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans le diagramme d'Ishikawa (5M), une panne due à un mauvais réglage de machine relève de la famille :</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu2e3" value="wrong"> Main d'œuvre</label>
          <label class="option"><input type="radio" name="secu2e3" value="wrong"> Milieu</label>
          <label class="option"><input type="radio" name="secu2e3" value="right"> Matériel</label>
          <label class="option"><input type="radio" name="secu2e3" value="wrong"> Méthode</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu2e3','secu2fb3','Correct — la machine elle-même (l\\'équipement) relève de la famille Matériel.','La question porte sur la machine en tant qu\\'équipement, pas sur la procédure suivie ni sur la personne qui l\\'utilise.')">Vérifier</button>
        <div class="feedback" id="secu2fb3"></div>
      </div>
    </div>
  `
};

SECU_NOVA_KB[secuKey('Accidents de travail : danger, risque et enquête')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Accidents de travail : danger, risque et enquête ». Demande-moi la différence entre danger et risque, comment calculer l'indice de fréquence, ce qu'est l'arbre des causes ou le diagramme d'Ishikawa, ou un indice sur un exercice.",
  rules: [
    { test:/danger/i, replies:["Le danger est une situation matérielle comportant un potentiel d'atteinte aux personnes, aux biens ou à l'environnement. C'est une menace potentielle, indépendamment de toute exposition."] },
    { test:/risque(?!.*chimique)/i, replies:["Le risque, c'est Danger × Exposition : c'est l'évaluation de l'exposition à un danger, combinant probabilité d'occurrence et gravité potentielle. Sans exposition, même un danger réel n'engendre pas de risque significatif."] },
    { test:/presque.accident/i, replies:["Un presque-accident est un événement soudain et imprévu qui aurait pu, dans des conditions légèrement différentes, causer un accident : pas de blessé, mais parfois des dommages matériels — c'est un signal d'alerte à ne pas négliger."] },
    { test:/incident(?!.*chapitre)/i, replies:["Un incident est un événement non souhaité survenu au travail, sans lésion corporelle. C'est le niveau le plus bas de l'échelle de gravité."] },
    { test:/indice de fr[ée]quence|IF\\b/i, replies:["IF = (nombre d'accidents avec arrêt × 1000) / nombre de salariés. N'oublie pas le facteur 1000 !"] },
    { test:/taux de gravit[ée]/i, replies:["Taux de gravité = (nombre de jours arrêtés × 1000) / nombre d'heures travaillées."] },
    { test:/arbre des causes/i, replies:["L'arbre des causes part de l'accident et remonte aux causes immédiates, nécessaires et suffisantes (INS), en se demandant à chaque étape : quelle cause a-t-il fallu, et est-elle suffisante ? Elle ne cherche jamais de coupable, seulement des faits."] },
    { test:/ishikawa|5m|5 m\\b/i, replies:["Le diagramme d'Ishikawa classe les causes d'un problème en 5M : Main d'œuvre, Matière, Milieu, Matériel, Méthode. C'est un outil de brainstorming en groupe, utile quand on n'a pas de données chiffrées."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : y a-t-il eu une blessure ?","Indice niveau 2 : non, aucun blessé — mais ça aurait pu.","Indice niveau 3 : c'est donc un presque-accident."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : applique IF = (accidents avec arrêt × 1000) / salariés.","Indice niveau 2 : IF = (4 × 1000) / 200.","Indice niveau 3 : IF = 20."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : de quoi parle-t-on, d'une personne, d'une procédure ou d'un équipement ?","Indice niveau 2 : la machine est un équipement physique.","Indice niveau 3 : c'est la famille Matériel."] }
  ]
};

/* =========================== CHAPITRE 3 — Phénomènes d'incendie et d'explosion =========================== */
SECU_CHAPTERS[secuKey('Phénomènes d\'incendie et d\'explosion')] = {
  objectives: [
    "Expliquer le triangle du feu et les conditions nécessaires à la combustion",
    "Définir une atmosphère explosible (ATEX) et les limites d'inflammabilité (LIE/LSE)",
    "Décrire l'hexagone de l'explosion et les six conditions d'une explosion",
    "Associer chaque classe de feu (A, B, C, D) au type d'extincteur adapté",
    "Évaluer en quoi la catastrophe du Cocoanut Grove en 1942, en révélant la combinaison exacte des trois éléments du triangle du feu, a durablement transformé la réglementation incendie et les principes de prévention encore appliqués aujourd'hui"
  ],
  prereqs: ["Accidents de travail : danger, risque et enquête"],
  bodyHtml: `
    <p>Le 28 novembre 1942, un incendie se déclencha dans la boîte de nuit Cocoanut Grove à Boston, provoquant la mort de 492 personnes en quelques minutes seulement — l'une des catastrophes d'incendie les plus meurtrières de l'histoire des États-Unis. L'enquête qui suivit révéla une combinaison dramatique de facteurs aujourd'hui enseignés dans ce chapitre : des décorations en tissu hautement inflammables (le combustible), des sorties de secours verrouillées ou dissimulées empêchant toute évacuation rapide, et une propagation fulgurante des flammes et des fumées toxiques. Cette tragédie transforma radicalement la réglementation incendie américaine, imposant notamment des normes strictes sur les matériaux inflammables et la signalisation des issues de secours — des principes qui, près d'un siècle plus tard, structurent encore la prévention incendie moderne.</p>
    <p>Ce que révèle cette catastrophe, au-delà du drame humain, c'est la logique même du triangle du feu que tu vas étudier dans ce chapitre : retirer un seul des trois éléments indispensables — ici, en interdisant les matériaux de décoration hautement combustibles — aurait suffi à empêcher, ou au moins à considérablement ralentir, la propagation catastrophique de l'incendie. C'est cette même logique de suppression d'un seul élément qui gouverne aujourd'hui l'ensemble des méthodes de lutte contre l'incendie.</p>
    <p>L'incendie et l'explosion sont deux manifestations d'une même réaction chimique : la <strong>combustion</strong>. Ils comptent parmi les risques chimiques les plus fréquents et les plus redoutés, car ils peuvent dégénérer très rapidement et provoquer des dégâts considérables. À la fin de ce chapitre, tu sauras expliquer les conditions nécessaires à un incendie ou une explosion, et choisir le moyen d'extinction adapté à chaque situation.</p>

    <h3>1. Le triangle du feu</h3>
    <p>La combustion ne peut avoir lieu que si trois éléments sont réunis simultanément :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Rôle</th><th>Exemple</th></tr>
      <tr><td>Comburant</td><td>Substance qui permet la combustion</td><td>Oxygène de l'air (21 % du volume)</td></tr>
      <tr><td>Combustible</td><td>Substance qui brûle</td><td>Gaz, liquides, solides, poussières</td></tr>
      <tr><td>Source d'inflammation</td><td>Apport d'énergie déclenchant la réaction</td><td>Étincelle, flamme, point chaud</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Principe clé</span>
      Lorsque l'un des trois éléments du triangle du feu est absent, la combustion ne peut pas se produire. C'est la base de toutes les méthodes de lutte contre l'incendie : refroidir, étouffer ou supprimer la source d'inflammation.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le triangle du feu explique pourquoi il existe plusieurs méthodes d'extinction radicalement différentes (eau, mousse, poudre) plutôt qu'une seule méthode universelle. En quoi le fait de pouvoir agir sur trois éléments distincts (comburant, combustible, source d'inflammation) explique-t-il cette diversité des procédés d'extinction, chacun ciblant un sommet différent du triangle ?
    </div>

    <h3>2. Atmosphère explosible et limites d'inflammabilité</h3>
    <p>On appelle <strong>atmosphère explosible (ATEX)</strong> le mélange avec l'air, dans les conditions atmosphériques, de substances inflammables (gaz, vapeurs, brouillards ou poussières) dans lequel, après inflammation, la combustion se propage à l'ensemble du mélange non brûlé.</p>
    <p>Pour qu'un mélange air-combustible soit inflammable, sa concentration doit se situer entre deux bornes :</p>
    <table class="mini-table">
      <tr><th>Limite</th><th>Signification</th></tr>
      <tr><td>LIE (Limite Inférieure d'Explosivité)</td><td>Concentration minimale au-dessus de laquelle le mélange peut s'enflammer</td></tr>
      <tr><td>LSE (Limite Supérieure d'Explosivité)</td><td>Concentration maximale au-dessous de laquelle le mélange peut s'enflammer</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le méthane a une LIE de 5 % et une LSE de 14 % dans l'air. Un local contient 3 % de méthane. Y a-t-il un risque d'explosion immédiat ?</p>
      <p><strong>Solution :</strong> 3 % est inférieur à la LIE (5 %) : le mélange est trop pauvre en combustible pour propager une flamme. Il n'y a pas de risque d'explosion dans l'immédiat, mais toute augmentation de la concentration (fuite continue) peut faire entrer le mélange dans le domaine d'explosivité [5 % ; 14 %].</p>
      <p class="example-answer">Réponse : pas de risque immédiat (3 % < LIE), mais vigilance requise si la concentration continue d'augmenter.</p>
    </div>

    <h3>3. L'hexagone de l'explosion (cas des poussières)</h3>
    <p>Pour les poussières combustibles, six conditions doivent être réunies simultanément pour qu'une explosion se produise : présence d'oxygène (au-dessus de la Concentration Limite en Oxygène, CLO), poussières combustibles, mise en suspension, concentration dans le domaine d'explosivité, source d'inflammation, et confinement.</p>

    <h3>4. Classes de feux et types d'extincteurs</h3>
    <table class="mini-table">
      <tr><th>Classe</th><th>Nature du combustible</th><th>Extincteur adapté</th></tr>
      <tr><td>A</td><td>Solides (bois, papier, textiles, plastiques)</td><td>Eau, eau + additif</td></tr>
      <tr><td>B</td><td>Liquides ou solides liquéfiables (essences, alcools, huiles)</td><td>Mousse, poudre</td></tr>
      <tr><td>C</td><td>Gaz (méthane, propane, acétylène, hydrogène)</td><td>Poudre</td></tr>
      <tr><td>D</td><td>Métaux (aluminium, magnésium, sodium)</td><td>Poudre spécifique au métal, ou transfert</td></tr>
    </table>
    <p>Les quatre procédés d'extinction agissent chacun sur un élément du triangle du feu : le <strong>refroidissement</strong> (abaisser la température sous le point d'inflammation), l'<strong>étouffement</strong> (priver le feu de comburant), l'<strong>inhibition</strong> (interrompre chimiquement les réactions de combustion), et le <strong>transfert</strong> (déplacer le combustible vers une matière plus facile à éteindre, utilisé pour les feux de métaux).</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Utiliser un extincteur à eau sur un feu de métal (classe D) peut aggraver dangereusement l'incendie plutôt que de l'éteindre, certains métaux réagissant violemment avec l'eau. Pourquoi cette exception illustre-t-elle l'importance de toujours identifier précisément la classe de feu avant d'agir, plutôt que de se fier à un réflexe universel « eau contre feu » ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La transition énergétique actuelle, qui mise largement sur l'hydrogène comme vecteur d'énergie propre (piles à combustible, stockage d'énergie renouvelable), redonne une actualité brûlante aux principes de ce chapitre : l'hydrogène possède un domaine d'explosivité exceptionnellement large (LIE d'environ 4 % à LSE d'environ 75 % dans l'air), bien plus étendu que la plupart des autres combustibles, ce qui en fait un gaz particulièrement délicat à manipuler en toute sécurité à grande échelle. Les ingénieurs travaillant sur les infrastructures hydrogène de demain (stations de recharge, pipelines) doivent concevoir des systèmes de détection et de ventilation capables de gérer ce risque spécifique, directement héritier des principes du triangle du feu et de l'ATEX étudiés ici.</p>
    <p><strong>Question ouverte :</strong> comment concevoir des infrastructures de stockage et de distribution d'hydrogène à grande échelle qui minimisent le risque d'accumulation d'une atmosphère explosible, compte tenu du domaine d'explosivité particulièrement large de ce gaz ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>capteurs de gaz connectés</strong>, aujourd'hui déployés dans de nombreuses installations industrielles sensibles, surveillent en continu la concentration de gaz inflammables et déclenchent automatiquement des alertes ou des systèmes de ventilation dès qu'une concentration approche la LIE, avant même qu'un risque d'explosion ne devienne critique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Combustible + comburant + source d'inflammation (triangle du feu) → si mélange gazeux : concentration comprise entre LIE et LSE (ATEX) → si poussières : ajout de mise en suspension et confinement (hexagone) → identification de la classe de feu (A/B/C/D) → choix du procédé d'extinction adapté (refroidissement, étouffement, inhibition, transfert)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{LIE} \\le \\text{Concentration} \\le \\text{LSE} \\Rightarrow \\text{Mélange inflammable}$$
      Cette double inégalité résume l'essentiel du chapitre : un mélange air-combustible n'est dangereux que dans une plage précise de concentrations, ni trop pauvre ni trop riche — une fenêtre de risque que toute installation industrielle manipulant des gaz ou poussières inflammables doit surveiller en permanence pour rester en dehors.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'incendie du Cocoanut Grove n'avait jamais eu lieu en 1942 : la réglementation incendie moderne (matériaux, issues de secours) se serait-elle développée aussi rapidement, ou aurait-il fallu attendre une autre catastrophe similaire ?</li>
        <li>Pourquoi un feu de classe D (métaux) exige-t-il un extincteur spécifique plutôt que l'eau, contrairement à la plupart des feux de solides de classe A ?</li>
        <li>Quelle serait la conséquence, pour le déploiement à grande échelle de l'hydrogène comme énergie propre, d'une sous-estimation de son domaine d'explosivité particulièrement large ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>National Fire Protection Association (NFPA), rapport d'enquête sur l'incendie du Cocoanut Grove, 1942 — le document fondateur de nombreuses réglementations incendie américaines modernes.</li>
        <li>INRS, <em>Prévention des explosions dues aux atmosphères explosives</em> — documentation de référence sur les ATEX et l'hexagone de l'explosion.</li>
        <li>Documentation technique sur la sécurité hydrogène (LIE/LSE, stockage) — pour une application contemporaine des principes de ce chapitre à la transition énergétique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais expliquer les conditions nécessaires à un incendie ou une explosion, et choisir le moyen d'extinction adapté à chaque situation. Le dernier chapitre de cette matière, « Gestion des risques chimiques », élargira cette analyse à l'ensemble des dangers liés à la manipulation de produits chimiques, au-delà du seul risque incendie. Comme le rappelle la tragédie du Cocoanut Grove : comprendre précisément les conditions d'un danger — ici, les trois éléments du triangle du feu — est souvent ce qui sépare une catastrophe évitable d'un accident inévitable.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Triangle du feu : comburant + combustible + source d'inflammation, réunis simultanément</li>
        <li>Une ATEX ne s'enflamme que si la concentration du combustible est comprise entre LIE et LSE</li>
        <li>L'hexagone de l'explosion (poussières) ajoute mise en suspension et confinement aux conditions du triangle du feu</li>
        <li>Classes de feux : A = solides, B = liquides, C = gaz, D = métaux — chacune a son extincteur adapté</li>
        <li>4 procédés d'extinction : refroidissement, étouffement, inhibition, transfert</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre LIE et LSE : en dessous de la LIE le mélange est trop pauvre, au-dessus de la LSE il est trop riche — dans les deux cas, pas de propagation de flamme</li>
        <li>Utiliser un extincteur à eau ou à mousse (conductrice) sur une installation électrique sous tension</li>
        <li>Croire qu'un mélange gazeux inflammable explose à n'importe quelle concentration : il faut être dans le domaine d'explosivité</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un feu de solvant (alcool) renversé est un feu de classe :</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu3e1" value="wrong"> A</label>
          <label class="option"><input type="radio" name="secu3e1" value="right"> B</label>
          <label class="option"><input type="radio" name="secu3e1" value="wrong"> C</label>
          <label class="option"><input type="radio" name="secu3e1" value="wrong"> D</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu3e1','secu3fb1','Correct — les liquides inflammables comme les alcools relèvent de la classe B.','Relis le tableau des classes de feux : de quelle nature est un alcool renversé, solide, liquide, gaz ou métal ?')">Vérifier</button>
        <div class="feedback" id="secu3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un mélange air-propane à 1 % (LIE du propane = 2,2 %) est-il inflammable ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu3e2" value="wrong"> Oui, toujours inflammable au-dessus de 0 %</label>
          <label class="option"><input type="radio" name="secu3e2" value="right"> Non, la concentration est en dessous de la LIE</label>
          <label class="option"><input type="radio" name="secu3e2" value="wrong"> Oui, car il dépasse la LSE</label>
          <label class="option"><input type="radio" name="secu3e2" value="wrong"> Impossible à déterminer</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu3e2','secu3fb2','Correct — 1 % est inférieur à la LIE (2,2 %) : le mélange est trop pauvre en propane pour propager une flamme.','Compare 1 % à la LIE donnée (2,2 %) : le mélange est-il au-dessus ou en dessous de cette limite ?')">Vérifier</button>
        <div class="feedback" id="secu3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Priver un feu d'oxygène en le recouvrant de mousse ou de sable relève du procédé d'extinction appelé :</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu3e3" value="wrong"> Refroidissement</label>
          <label class="option"><input type="radio" name="secu3e3" value="right"> Étouffement</label>
          <label class="option"><input type="radio" name="secu3e3" value="wrong"> Inhibition</label>
          <label class="option"><input type="radio" name="secu3e3" value="wrong"> Transfert</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu3e3','secu3fb3','Correct — recouvrir le feu pour l\\'isoler de l\\'oxygène de l\\'air, c\\'est le principe de l\\'étouffement.','Recouvrir le feu agit sur quel sommet du triangle du feu : le combustible, le comburant, ou la source d\\'inflammation ?')">Vérifier</button>
        <div class="feedback" id="secu3fb3"></div>
      </div>
    </div>
  `
};

SECU_NOVA_KB[secuKey('Phénomènes d\'incendie et d\'explosion')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Phénomènes d'incendie et d'explosion ». Demande-moi le triangle du feu, ce qu'est une ATEX, les limites LIE/LSE, les classes de feux, ou un indice sur un exercice.",
  rules: [
    { test:/triangle du feu/i, replies:["Le triangle du feu, ce sont les trois éléments indispensables à la combustion : un comburant (l'oxygène de l'air en général), un combustible, et une source d'inflammation. Si l'un des trois manque, pas de combustion possible."] },
    { test:/atex|atmosph[eè]re explosible/i, replies:["Une ATEX (atmosphère explosible) est un mélange avec l'air, dans les conditions atmosphériques, de substances inflammables (gaz, vapeurs, brouillards ou poussières) où la combustion peut se propager à tout le mélange non brûlé après inflammation."] },
    { test:/lie|lse|limite.*inflammab|limite.*explosiv/i, replies:["La LIE (limite inférieure d'explosivité) est la concentration minimale, et la LSE (limite supérieure) la concentration maximale, entre lesquelles un mélange air-combustible peut s'enflammer. En dessous de la LIE, le mélange est trop pauvre ; au-dessus de la LSE, trop riche."] },
    { test:/hexagone/i, replies:["L'hexagone de l'explosion (cas des poussières) ajoute au triangle du feu trois conditions : mise en suspension, concentration dans le domaine d'explosivité, et confinement — les six doivent être réunies en même temps."] },
    { test:/classe[s]? de feu|classe a|classe b|classe c|classe d/i, replies:["Classe A = solides (bois, papier), Classe B = liquides (essences, alcools), Classe C = gaz (méthane, propane), Classe D = métaux (aluminium, sodium). Chaque classe correspond à un type d'extincteur adapté."] },
    { test:/extincteur/i, replies:["Extincteur à eau → feux de classe A ; à mousse → classe B (jamais sur électricité, la mousse est conductrice) ; à poudre → très polyvalent, efficace en classe C ; à gaz (CO2) → petits feux de liquides ou de gaz."] },
    { test:/[ée]touffement|refroidissement|inhibition|transfert/i, replies:["Les 4 procédés d'extinction : refroidissement (baisser la température sous le point d'inflammation), étouffement (priver de comburant), inhibition (interrompre chimiquement la réaction), transfert (déplacer le combustible, utilisé pour les métaux)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : un alcool renversé, est-ce un solide, un liquide, un gaz ou un métal ?","Indice niveau 2 : c'est un liquide inflammable.","Indice niveau 3 : c'est donc la classe B."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare la concentration donnée à la LIE fournie.","Indice niveau 2 : 1 % est-il au-dessus ou en dessous de 2,2 % ?","Indice niveau 3 : 1 % < LIE, donc pas d'inflammation possible."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : recouvrir un feu agit sur quel sommet du triangle du feu ?","Indice niveau 2 : ça coupe l'accès à l'oxygène.","Indice niveau 3 : c'est l'étouffement."] }
  ]
};

/* =========================== CHAPITRE 4 — Gestion des risques chimiques =========================== */
SECU_CHAPTERS[secuKey('Gestion des risques chimiques')] = {
  objectives: [
    "Distinguer les deux grandes familles de risques chimiques : intoxication et incendie-explosion",
    "Identifier les trois voies de pénétration d'un produit chimique dans l'organisme",
    "Reconnaître les principaux pictogrammes de danger et les rubriques d'une fiche de données de sécurité (FDS)",
    "Situer le rôle des réglementations REACH et SEVESO 3 dans la gestion du risque chimique",
    "Évaluer en quoi les catastrophes de Seveso (1976) et de Bhopal (1984), bien que survenues à des milliers de kilomètres l'une de l'autre, ont conjointement façonné le cadre réglementaire international (SEVESO 3, REACH) qui encadre aujourd'hui la gestion du risque chimique"
  ],
  prereqs: ["Phénomènes d'incendie et d'explosion"],
  bodyHtml: `
    <p>Le 10 juillet 1976, un nuage toxique de dioxine s'échappa accidentellement d'une usine chimique de la petite ville italienne de Seveso, contaminant durablement les sols et provoquant l'évacuation de plusieurs milliers d'habitants ainsi que de graves effets sur la santé, notamment cutanés. Ce désastre industriel, resté dans les mémoires sous le nom de « catastrophe de Seveso », poussa la Communauté économique européenne à adopter dès 1982 la toute première directive européenne sur la prévention des accidents chimiques majeurs — directive qui porte encore aujourd'hui le nom de cette ville, dans sa troisième version (SEVESO 3) que tu vas étudier dans ce chapitre.</p>
    <p>Huit ans plus tard, en 1984, une fuite massive de gaz isocyanate de méthyle dans une usine de pesticides à Bhopal, en Inde, causa la mort de plusieurs milliers de personnes en une seule nuit — la catastrophe industrielle la plus meurtrière de l'histoire, qui accéléra à son tour l'adoption de réglementations chimiques strictes à l'échelle mondiale, y compris le règlement REACH que tu étudieras également ici. Ces deux tragédies rappellent une vérité simple mais essentielle : chaque rubrique de la fiche de données de sécurité que tu vas apprendre à lire correspond, très concrètement, à une leçon tirée d'un accident réel qui aurait pu être évité.</p>
    <p>Le risque chimique est omniprésent dans de nombreuses activités (industrie chimique, pétrochimie, agriculture, métallurgie). Il est lié à la nature du produit manipulé, stocké ou transporté, et se manifeste par des atteintes à la santé aiguës (brûlures, intoxications) ou chroniques (maladies professionnelles, cancers). À la fin de ce chapitre, tu sauras identifier les risques chimiques auxquels un produit expose, lire une fiche de données de sécurité, et situer le rôle des grandes réglementations internationales qui encadrent ce risque.</p>

    <h3>1. Deux grandes familles de risques chimiques</h3>
    <table class="mini-table">
      <tr><th>Famille</th><th>Manifestations</th></tr>
      <tr><td>Risque d'intoxication</td><td>Intoxication accidentelle (contact bref, forte dose) ou pathologie/maladie professionnelle (exposition chronique à faible dose)</td></tr>
      <tr><td>Risque d'incendie-explosion</td><td>Réactions d'oxydation exothermiques pouvant dégénérer en incendie ou en explosion</td></tr>
    </table>

    <h3>2. Les trois voies de pénétration dans l'organisme</h3>
    <table class="mini-table">
      <tr><th>Voie</th><th>Mécanisme</th></tr>
      <tr><td>Digestive</td><td>Ingestion accidentelle (forte dose) ou répétée (faibles doses)</td></tr>
      <tr><td>Respiratoire</td><td>Inhalation de poussières, vapeurs et fumées ; les particules les plus fines atteignent les alvéoles pulmonaires</td></tr>
      <tr><td>Cutanée</td><td>Contact avec la peau ; certains produits irritent, d'autres traversent la barrière cutanée</td></tr>
    </table>

    <h3>3. Paramètres qui aggravent le risque chimique</h3>
    <p>Plusieurs paramètres modulent la dangerosité effective d'un produit : sa <strong>nature chimique</strong> (plus un produit est réactif, plus il est dangereux), son <strong>état physique</strong> (un produit divisé — gaz, poussières fines — est toujours plus dangereux que le même produit massif), la <strong>quantité absorbée</strong>, et la <strong>température</strong> (son élévation favorise généralement le caractère dangereux du produit).</p>
    <div class="key-point">
      <span class="eyebrow">Exemple marquant</span>
      La silice massive (sable) n'est pas toxique. La même silice réduite en poussière fine pénètre les voies respiratoires et peut provoquer la silicose, une maladie professionnelle mortelle. C'est l'état physique, plus que la substance elle-même, qui fait ici la différence.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'exemple de la silice montre qu'un produit non toxique à l'état massif peut devenir dangereux une fois réduit en poussière fine, sans que sa composition chimique change en rien. En quoi cet exemple illustre-t-il que la dangerosité d'un produit ne dépend pas uniquement de sa nature chimique, mais aussi de la forme physique sous laquelle il se présente et de la voie par laquelle il pénètre l'organisme ?
    </div>

    <h3>4. Étiquetage et fiche de données de sécurité (FDS)</h3>
    <p>Tout produit chimique dangereux doit être accompagné d'une <strong>étiquette</strong> portant un pictogramme de danger et d'une <strong>fiche de données de sécurité (FDS)</strong> fournie par le fabricant. La FDS comporte 16 rubriques normalisées : identification du produit, composants dangereux, identification des dangers, premiers secours, lutte contre l'incendie, mesures en cas de dispersion accidentelle, précautions de stockage, contrôle de l'exposition, propriétés physico-chimiques, stabilité et réactivité, informations toxicologiques et éco-toxicologiques, élimination des déchets, transport, réglementation, et autres informations.</p>
    <table class="mini-table">
      <tr><th>Pictogramme</th><th>Signification</th></tr>
      <tr><td>E</td><td>Explosif</td></tr>
      <tr><td>F / F+</td><td>Facilement / extrêmement inflammable</td></tr>
      <tr><td>O</td><td>Comburant</td></tr>
      <tr><td>T / T+</td><td>Toxique / très toxique</td></tr>
      <tr><td>C</td><td>Corrosif</td></tr>
      <tr><td>Xi / Xn</td><td>Irritant / nocif</td></tr>
      <tr><td>N</td><td>Dangereux pour l'environnement</td></tr>
    </table>

    <h3>5. Cadre réglementaire international</h3>
    <div class="key-point">
      <span class="eyebrow">REACH et SEVESO 3</span>
      Le règlement européen <strong>REACH</strong> (Registration, Evaluation, Authorisation and Restriction of Chemicals, en vigueur depuis 2007) impose à toute entreprise mettant sur le marché plus d'une tonne/an d'une substance d'en évaluer préalablement l'impact sur la santé et l'environnement. La directive <strong>SEVESO 3</strong>, relative aux accidents majeurs impliquant des substances dangereuses, impose la classification des produits, le classement des établissements (seuil ICPE/SEVESO) et l'élaboration d'études de danger (EDD) et de plans d'urgence (POI/PPI).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      REACH évalue les substances elles-mêmes avant leur mise sur le marché, tandis que SEVESO 3 encadre les installations qui les stockent et les manipulent une fois sur site. Pourquoi ces deux réglementations, bien que complémentaires, ciblent-elles des moments très différents du cycle de vie d'un produit chimique : sa création/mise sur le marché d'un côté, son utilisation industrielle quotidienne de l'autre ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un produit porte le pictogramme « T » (toxique) et « F » (facilement inflammable). Quels sont les deux types de risques qu'il présente ?</p>
      <p><strong>Solution :</strong> le pictogramme T signale un risque d'intoxication (par inhalation, ingestion ou contact cutané), et le pictogramme F signale un risque d'incendie. Ce produit relève donc simultanément des deux grandes familles de risques chimiques.</p>
      <p class="example-answer">Réponse : risque d'intoxication (T) et risque d'incendie-explosion (F).</p>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Au-delà de la simple évaluation et classification des risques chimiques, la recherche moderne en <strong>chimie verte</strong> (green chemistry) cherche activement à éliminer le risque à la source, en substituant les substances les plus dangereuses par des alternatives moins toxiques ou moins inflammables dès la conception d'un procédé industriel — un principe directement encouragé par le règlement REACH, qui impose l'autorisation préalable et encourage la substitution des substances les plus préoccupantes. Cette approche préventive, plutôt qu'uniquement protectrice, représente un changement de philosophie majeur par rapport aux réglementations nées dans l'urgence après Seveso et Bhopal.</p>
    <p><strong>Question ouverte :</strong> jusqu'à quel point la substitution systématique des substances chimiques les plus dangereuses est-elle réellement possible dans tous les secteurs industriels, sans compromettre les performances ou les coûts des procédés existants ?</p>
    <p><strong>Technologie émergente :</strong> les modèles de <strong>toxicologie prédictive computationnelle</strong> (QSAR, Quantitative Structure-Activity Relationship) utilisent aujourd'hui l'intelligence artificielle pour estimer la toxicité probable d'une nouvelle molécule à partir de sa seule structure chimique, avant même sa synthèse ou son test en laboratoire — réduisant potentiellement le recours à l'expérimentation animale tout en accélérant l'évaluation réglementaire des nouvelles substances.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Produit chimique manipulé → identification du risque (intoxication et/ou incendie-explosion) → voie de pénétration (digestive, respiratoire, cutanée) → paramètres aggravants (état physique, quantité, température) → étiquetage et FDS (16 rubriques) → cadre réglementaire (REACH pour la substance, SEVESO 3 pour l'installation)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Dangerosité effective} = f(\\text{nature chimique},\\ \\text{état physique},\\ \\text{quantité},\\ \\text{température})$$
      Cette relation qualitative résume la leçon centrale du chapitre : la dangerosité d'un produit chimique n'est jamais une propriété fixe et intrinsèque, mais dépend toujours des conditions concrètes de son utilisation — un même produit peut être anodin ou mortel selon la forme, la quantité et les circonstances de son exposition.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la catastrophe de Seveso n'avait jamais eu lieu en 1976 : l'Union européenne aurait-elle adopté une réglementation aussi précise sur la prévention des accidents chimiques majeurs, ou aurait-il fallu attendre un autre déclencheur ?</li>
        <li>Pourquoi la FDS doit-elle être fournie gratuitement par le fabricant à chaque utilisateur professionnel, plutôt que d'être un document optionnel ou payant ?</li>
        <li>Quelle serait la conséquence, pour la sécurité chimique mondiale, d'une absence totale de coordination réglementaire internationale comme celle qu'ont permise REACH et SEVESO 3 après les catastrophes de Seveso et Bhopal ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>Directive européenne 82/501/CEE (« directive Seveso »), 1982, et ses révisions successives jusqu'à SEVESO 3 (2012) — le cadre réglementaire né de la catastrophe de 1976.</li>
        <li>Rapport d'enquête sur la catastrophe de Bhopal, 1984 — la catastrophe industrielle la plus meurtrière de l'histoire, accélératrice de la réglementation chimique mondiale.</li>
        <li>Règlement (CE) n° 1907/2006 (REACH), Union européenne, 2006 — le texte réglementaire de référence sur l'évaluation des substances chimiques.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais identifier les risques chimiques auxquels un produit expose, lire une fiche de données de sécurité, et situer le rôle des grandes réglementations internationales qui encadrent ce risque — clôturant ainsi la matière « Sécurité et environnement » de cette L1. Comme le rappellent les catastrophes de Seveso et de Bhopal : chaque règle de sécurité chimique aujourd'hui en vigueur porte, quelque part dans son histoire, la mémoire d'un accident réel qu'elle cherche précisément à ne jamais voir se reproduire.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Deux familles de risques chimiques : intoxication (accidentelle ou chronique) et incendie-explosion</li>
        <li>Trois voies de pénétration dans l'organisme : digestive, respiratoire, cutanée</li>
        <li>Un produit divisé (poussière, gaz) est toujours plus dangereux que le même produit massif</li>
        <li>La FDS comporte 16 rubriques normalisées et doit être fournie gratuitement par le fabricant</li>
        <li>REACH évalue l'impact santé/environnement des substances ; SEVESO 3 encadre la prévention des accidents majeurs</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un produit non toxique à l'état massif l'est forcément aussi à l'état de poussière fine (c'est l'inverse qui est vrai le plus souvent)</li>
        <li>Confondre l'étiquette (information rapide sur l'emballage) et la FDS (document complet et détaillé destiné à l'employeur)</li>
        <li>Penser qu'un produit ne peut relever que d'une seule famille de risque chimique, alors qu'il peut être à la fois toxique ET inflammable</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'inhalation de poussières fines de silice relève de quelle voie de pénétration ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu4e1" value="wrong"> Digestive</label>
          <label class="option"><input type="radio" name="secu4e1" value="right"> Respiratoire</label>
          <label class="option"><input type="radio" name="secu4e1" value="wrong"> Cutanée</label>
          <label class="option"><input type="radio" name="secu4e1" value="wrong"> Aucune des trois</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu4e1','secu4fb1','Correct — l\\'inhalation de poussières fines correspond à la voie respiratoire ; les particules les plus fines atteignent les alvéoles pulmonaires.','Le produit est inhalé, pas avalé ni en contact avec la peau : quelle voie cela correspond-il ?')">Vérifier</button>
        <div class="feedback" id="secu4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Combien de rubriques normalisées comporte une fiche de données de sécurité (FDS) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu4e2" value="wrong"> 9</label>
          <label class="option"><input type="radio" name="secu4e2" value="wrong"> 12</label>
          <label class="option"><input type="radio" name="secu4e2" value="right"> 16</label>
          <label class="option"><input type="radio" name="secu4e2" value="wrong"> 20</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu4e2','secu4fb2','Correct — la FDS comporte 16 rubriques normalisées, de l\\'identification du produit jusqu\\'aux informations réglementaires.','Relis la partie sur la fiche de données de sécurité (FDS) : le nombre de rubriques y est précisé explicitement.')">Vérifier</button>
        <div class="feedback" id="secu4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le règlement européen qui impose d'évaluer l'impact santé/environnement des substances chimiques mises sur le marché en quantité significative s'appelle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="secu4e3" value="wrong"> SEVESO 3</label>
          <label class="option"><input type="radio" name="secu4e3" value="right"> REACH</label>
          <label class="option"><input type="radio" name="secu4e3" value="wrong"> ICPE</label>
          <label class="option"><input type="radio" name="secu4e3" value="wrong"> NFPA</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('secu4e3','secu4fb3','Correct — REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) impose cette évaluation préalable.','SEVESO 3 concerne plutôt la prévention des accidents majeurs sur site ; l\\'autre règlement concerne l\\'évaluation des substances elles-mêmes.')">Vérifier</button>
        <div class="feedback" id="secu4fb3"></div>
      </div>
    </div>
  `
};

SECU_NOVA_KB[secuKey('Gestion des risques chimiques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Gestion des risques chimiques ». Demande-moi les voies de pénétration d'un produit chimique, ce qu'est une FDS, les pictogrammes de danger, REACH/SEVESO, ou un indice sur un exercice.",
  rules: [
    { test:/voie[s]?\s*(de\s*)?p[ée]n[ée]tration|digestive|respiratoire|cutan[ée]e/i, replies:["Trois voies de pénétration d'un produit chimique dans l'organisme : digestive (ingestion), respiratoire (inhalation de poussières, vapeurs, fumées) et cutanée (contact avec la peau)."] },
    { test:/intoxication/i, replies:["Le risque d'intoxication peut être accidentel (contact bref avec une forte dose) ou chronique (absorption répétée de faibles doses, à l'origine de maladies professionnelles)."] },
    { test:/fds|fiche de donn[ée]es de s[ée]curit[ée]/i, replies:["La FDS (fiche de données de sécurité) est fournie gratuitement par le fabricant et comporte 16 rubriques normalisées : identification du produit, dangers, premiers secours, lutte incendie, stockage, propriétés physico-chimiques, toxicologie, élimination des déchets, transport, réglementation, etc."] },
    { test:/pictogramme|[ée]tiquetage/i, replies:["Les principaux pictogrammes : E (explosif), F/F+ (inflammable), O (comburant), T/T+ (toxique), C (corrosif), Xi/Xn (irritant/nocif), N (dangereux pour l'environnement). L'étiquette donne une info rapide ; la FDS donne l'info complète."] },
    { test:/reach/i, replies:["REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals), en vigueur depuis 2007, impose à toute entreprise mettant sur le marché plus d'une tonne/an d'une substance d'en évaluer l'impact sur la santé et l'environnement."] },
    { test:/seveso/i, replies:["La directive SEVESO 3 encadre la prévention des accidents majeurs impliquant des substances dangereuses : classification des produits, classement ICPE/SEVESO de l'établissement, étude de dangers (EDD), plans d'urgence POI/PPI."] },
    { test:/[ée]tat physique|poussi[eè]re.*dangereux/i, replies:["Plus un produit est divisé (gaz, poussière fine, aérosol), plus il est dangereux : il pénètre plus facilement l'organisme et se mélange plus facilement à l'air pour donner des réactions de combustion. La silice massive n'est pas toxique, la silice en poussière fine peut provoquer la silicose."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le produit est-il avalé, inhalé ou touché ?","Indice niveau 2 : ici, on parle d'inhalation de poussières.","Indice niveau 3 : c'est la voie respiratoire."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis le passage sur la FDS, le nombre de rubriques y est donné explicitement.","Indice niveau 2 : c'est un nombre à deux chiffres, entre 12 et 20.","Indice niveau 3 : la FDS comporte 16 rubriques."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : lequel des deux règlements évalue les substances elles-mêmes, plutôt que les sites industriels ?","Indice niveau 2 : SEVESO concerne les accidents majeurs sur site.","Indice niveau 3 : c'est donc REACH."] }
  ]
};

/* fusionne le module Sécurité et environnement dans les registres globaux (même mécanisme
   que pour les autres matières : tout finit fusionné dans MATH_TOOLS_CHAPTERS / NOVA_KB) */
Object.assign(MATH_TOOLS_CHAPTERS, SECU_CHAPTERS);
Object.assign(NOVA_KB, SECU_NOVA_KB);