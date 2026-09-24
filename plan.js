/* =====================================================================
   CHUNK « plan » — registre PLAN_CHAPTERS / PLAN_NOVA_KB
   Matière(s) : Autres|Planification et gestion
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   PLAN_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MATIÈRE — Planification et gestion (L3PF et L3CF, domaine Autres)
   (contenu rédigé selon le programme standard des cours universitaires de gestion de
   projet destinés aux filières scientifiques : cycle de vie du projet, structuration
   (objectifs SMART, WBS), ordonnancement (réseau PERT, méthode du chemin critique),
   diagramme de Gantt, estimation des durées et gestion des ressources, gestion
   budgétaire et valeur acquise (EVM), gestion des risques, pilotage et clôture —
   conforme aux référentiels de gestion de projet (guide PMBOK du Project Management
   Institute, méthode PERT/CPM, norme ISO 21500 « Lignes directrices sur le management
   de projet ») et aux cours de référence francophones (Rémi Bachelet, MOOC Gestion de
   Projet, École Centrale de Lille ; cours « Planification et gestion de projets »,
   Université Laval). Ce cours prolonge le cours « Législation et droit du travail » en
   donnant aux futurs chimistes les outils méthodologiques de conduite de projet
   indispensables à toute activité de recherche, de développement ou de production en
   laboratoire ou en industrie.
   Structure identique aux autres modules : PLAN_CHAPTERS / PLAN_NOVA_KB, fusionnés à
   la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
===================================================================================== */
const PLAN_MATIERE = 'Planification et gestion';
function planKey(chapterTitle){ return `Autres|${PLAN_MATIERE}|${chapterTitle}`; }
const PLAN_CHAPTERS = {};
const PLAN_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur d'estimation PERT à trois points (chapitre 5)
--------------------------------------------------------------------------------- */
function updatePertEstimate(){
  const o = parseFloat(document.getElementById('pertO').value) || 0;
  const m = parseFloat(document.getElementById('pertM').value) || 0;
  const p = parseFloat(document.getElementById('pertP').value) || 0;
  const te = (o + 4*m + p) / 6;
  const sigma = (p - o) / 6;
  const out = document.getElementById('pertReadout');
  out.innerHTML = `Durée estimée : t<sub>e</sub> = (O + 4M + P) / 6 = (${o} + 4×${m} + ${p}) / 6 = <strong>${te.toFixed(2)}</strong> (unité de temps choisie)<br>` +
    `Écart-type (incertitude) : σ = (P − O) / 6 = <strong>${sigma.toFixed(2)}</strong><br>` +
    `Intervalle à ~95% de confiance : [${(te-2*sigma).toFixed(2)} ; ${(te+2*sigma).toFixed(2)}]`;
}
function initPertEstimate(){ updatePertEstimate(); }

/* =========================== CHAPITRE 1 =========================== */
PLAN_CHAPTERS[planKey("Le projet et son cycle de vie : définir, cadrer, planifier, exécuter, clôturer")] = {
  objectives: [
    "Distinguer un projet d'une activité récurrente (opération) et en identifier les caractéristiques essentielles",
    "Décrire les cinq grandes phases du cycle de vie d'un projet",
    "Identifier les parties prenantes (stakeholders) d'un projet et leurs attentes respectives",
    "Rédiger les éléments clés d'une charte de projet (project charter)",
    "Situer ces notions dans le contexte d'un projet scientifique (recherche, développement, mise en production)"
  ],
  prereqs: ["Le rapport scientifique : finalités, types et destinataires (cours de rédaction de rapport)"],
  bodyHtml: `
    <p>Qu'il s'agisse de mettre au point un nouveau procédé de synthèse, de monter un laboratoire, d'organiser une campagne de mesures ou de rédiger une thèse, tout chimiste est un jour ou l'autre amené à <strong>conduire un projet</strong>. Ce cours propose les outils méthodologiques — largement issus du management de projet professionnel (guide PMBOK, norme ISO 21500) — pour planifier, exécuter et piloter efficacement ce type de démarche.</p>

    <h3>1. Qu'est-ce qu'un projet ?</h3>
    <p>Un <strong>projet</strong> se définit par trois caractéristiques qui le distinguent d'une <strong>opération</strong> (activité récurrente et répétitive, comme la routine d'analyses d'un laboratoire de contrôle qualité) : il est <strong>temporaire</strong> (dates de début et de fin définies), <strong>unique</strong> (un résultat, un produit ou un service qui n'a jamais été produit exactement de cette façon auparavant) et il vise un <strong>objectif défini</strong>, mobilisant des ressources limitées (temps, budget, personnel, matériel).</p>
    <table class="mini-table">
      <tr><th>Critère</th><th>Projet</th><th>Opération</th></tr>
      <tr><td>Durée</td><td>Temporaire, avec un début et une fin</td><td>Continue, récurrente</td></tr>
      <tr><td>Résultat</td><td>Unique (nouveau produit, service, procédé)</td><td>Répétitif (même processus reproduit)</td></tr>
      <tr><td>Exemple en chimie</td><td>Mise au point d'une nouvelle voie de synthèse</td><td>Contrôle qualité de routine d'une production</td></tr>
    </table>

    <h3>2. Les cinq phases du cycle de vie d'un projet</h3>
    <p>Tout projet, quelle que soit sa taille, traverse classiquement cinq grandes phases, qui peuvent se chevaucher partiellement mais restent conceptuellement distinctes :</p>
    <table class="mini-table">
      <tr><th>Phase</th><th>Objectif principal</th></tr>
      <tr><td>1. Initiation (cadrage)</td><td>Définir le pourquoi du projet, ses objectifs généraux, ses parties prenantes ; formaliser la charte de projet</td></tr>
      <tr><td>2. Planification</td><td>Détailler le comment : structurer les tâches (chapitre 2), les ordonnancer (chapitre 3), estimer durées et ressources (chapitres 4-5), budgétiser (chapitre 6), anticiper les risques (chapitre 7)</td></tr>
      <tr><td>3. Exécution</td><td>Réaliser concrètement les tâches planifiées, mobiliser l'équipe et les ressources</td></tr>
      <tr><td>4. Suivi et maîtrise (pilotage)</td><td>Mesurer l'avancement réel par rapport au plan, ajuster si nécessaire (chapitre 8)</td></tr>
      <tr><td>5. Clôture</td><td>Livrer le résultat final, formaliser le bilan et les enseignements tirés (chapitre 8)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Une idée essentielle : le coût de la modification augmente avec le temps</span>
      Un principe bien établi en gestion de projet veut que le coût d'une modification (changement de spécification, correction d'une erreur de conception) soit très faible en phase d'initiation, et croisse ensuite de façon quasi exponentielle à mesure que le projet avance vers l'exécution puis la clôture. C'est pourquoi la phase de <strong>planification</strong>, bien qu'elle ne produise encore aucun résultat tangible, mérite un investissement de temps et de rigueur proportionnellement important : une heure passée à bien planifier évite souvent des dizaines d'heures de correction ultérieure.
    </div>

    <h3>3. Les parties prenantes (stakeholders)</h3>
    <p>Une <strong>partie prenante</strong> est toute personne ou organisation dont les intérêts peuvent être affectés, positivement ou négativement, par le déroulement ou le résultat du projet — ou qui peut elle-même influencer le projet. Pour un projet scientifique typique, on distingue notamment : le <strong>commanditaire</strong> (directeur de laboratoire, entreprise finançant la recherche), l'<strong>équipe projet</strong> (chercheurs, techniciens, étudiants), les <strong>utilisateurs finaux</strong> du résultat (autres équipes, industriels, patients dans le cas pharmaceutique), et les <strong>autorités de tutelle</strong> (comités d'éthique, organismes de financement, autorités réglementaires).</p>

    <h3>4. La charte de projet</h3>
    <p>La <strong>charte de projet</strong> (<em>project charter</em>) est le document fondateur qui formalise, dès la phase d'initiation, les éléments essentiels sur lesquels toutes les parties prenantes s'accordent avant que la planification détaillée ne commence :</p>
    <ul>
      <li>l'<strong>objectif</strong> général du projet et sa justification (pourquoi ce projet, quel besoin il répond) ;</li>
      <li>le <strong>périmètre</strong> (<em>scope</em>) : ce qui est inclus dans le projet, et — tout aussi important — ce qui en est explicitement exclu ;</li>
      <li>les <strong>grandes contraintes</strong> (délai global, budget approximatif, ressources disponibles) ;</li>
      <li>le nom du <strong>chef de projet</strong> désigné et l'étendue de son autorité décisionnelle ;</li>
      <li>les principales parties prenantes identifiées.</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un doctorant doit mettre au point, en 8 mois, une nouvelle méthode de purification par chromatographie pour un composé pharmaceutique. Identifier deux parties prenantes distinctes de ce projet et une contrainte majeure à faire figurer dans la charte de projet.</p>
      <p><strong>Solution :</strong> parmi les parties prenantes : le <strong>directeur de thèse</strong> (commanditaire scientifique, évalue la pertinence et la qualité des résultats) et le <strong>service qualité de l'entreprise partenaire</strong> (utilisateur final, qui devra valider la méthode selon ses propres référentiels normatifs). Une contrainte majeure à faire figurer dans la charte : le <strong>délai de 8 mois</strong>, qui borne strictement la durée totale du projet et devra être respecté lors de la planification détaillée (chapitres suivants).</p>
      <p class="example-answer">Réponse : directeur de thèse et service qualité comme parties prenantes ; délai de 8 mois comme contrainte majeure de la charte de projet.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un projet est temporaire, unique et orienté vers un objectif défini — à la différence d'une opération récurrente</li>
        <li>Cinq phases : initiation, planification, exécution, suivi/maîtrise, clôture</li>
        <li>Le coût d'une modification croît fortement avec l'avancement du projet — d'où l'intérêt d'une planification rigoureuse en amont</li>
        <li>Une partie prenante est toute personne affectée par ou influençant le projet (commanditaire, équipe, utilisateurs, tutelles)</li>
        <li>La charte de projet formalise dès l'initiation : objectif, périmètre, contraintes, chef de projet, parties prenantes</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre un projet (temporaire, unique) avec une opération récurrente (le contrôle qualité de routine n'est pas un projet, sauf s'il s'agit de sa mise en place initiale)</li>
        <li>Vouloir « sauter » la phase de planification pour gagner du temps — c'est justement l'inverse qui se produit le plus souvent, les erreurs non anticipées coûtant bien plus cher à corriger en cours d'exécution</li>
        <li>Négliger d'identifier certaines parties prenantes en amont — un acteur oublié en phase d'initiation devient souvent une source de blocage ou de retard en phase d'exécution</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Ce qui distingue fondamentalement un projet d'une opération récurrente est notamment :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan1e1" value="wrong">le fait qu'un projet nécessite toujours un budget plus important</label>
          <label class="option"><input type="radio" name="plan1e1" value="right">le caractère temporaire et unique du projet, avec un début et une fin définis</label>
          <label class="option"><input type="radio" name="plan1e1" value="wrong">le fait qu'un projet ne mobilise jamais d'équipe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan1e1','plan1fb1','Correct — un projet se définit par son caractère temporaire (début/fin définis) et unique (résultat jamais produit exactement de cette façon), contrairement à une opération répétitive.','Relis la définition en trois critères donnée en section 1.')">Vérifier</button>
        <div class="feedback" id="plan1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le coût d'une modification (erreur de conception, changement de spécification) au cours d'un projet :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan1e2" value="wrong">reste constant, quelle que soit la phase du projet</label>
          <label class="option"><input type="radio" name="plan1e2" value="right">augmente fortement à mesure que le projet avance vers l'exécution puis la clôture</label>
          <label class="option"><input type="radio" name="plan1e2" value="wrong">diminue progressivement à mesure que le projet avance</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan1e2','plan1fb2','Correct — c\\'est pourquoi investir du temps en phase de planification est rentable : une erreur détectée tôt coûte beaucoup moins cher à corriger qu\\'une erreur découverte en fin de projet.','Relis l\\'encadré sur le coût de la modification en fonction de l\\'avancement du projet.')">Vérifier</button>
        <div class="feedback" id="plan1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La charte de projet est rédigée principalement lors de la phase de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan1e3" value="right">initiation</label>
          <label class="option"><input type="radio" name="plan1e3" value="wrong">exécution</label>
          <label class="option"><input type="radio" name="plan1e3" value="wrong">clôture</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan1e3','plan1fb3','Correct — la charte de projet formalise dès l\\'initiation les éléments fondateurs (objectif, périmètre, contraintes) avant que la planification détaillée ne commence.','Relis la définition de la charte de projet en section 4 : à quel moment ses éléments doivent-ils être fixés ?')">Vérifier</button>
        <div class="feedback" id="plan1fb3"></div>
      </div>
    </div>
  `
};

PLAN_NOVA_KB[planKey("Le projet et son cycle de vie : définir, cadrer, planifier, exécuter, clôturer")] = {
  intro: "Salut, moi c'est Nova ! On démarre la gestion de projet par ses fondamentaux. Demande-moi la différence entre projet et opération, les cinq phases du cycle de vie, ou un indice sur un exercice.",
  rules: [
    { test:/projet.*op[ée]ration|diff[ée]rence.*projet/i, replies:["Un projet est temporaire (début/fin définis) et unique (résultat jamais produit exactement ainsi), contrairement à une opération récurrente et répétitive comme un contrôle qualité de routine."] },
    { test:/cycle de vie|cinq phases|phases.*projet/i, replies:["5 phases : initiation (cadrage), planification, exécution, suivi/maîtrise, clôture. Elles peuvent se chevaucher un peu, mais restent conceptuellement distinctes."] },
    { test:/partie prenante|stakeholder/i, replies:["Une partie prenante est toute personne affectée par le projet ou pouvant l'influencer : commanditaire, équipe projet, utilisateurs finaux, autorités de tutelle."] },
    { test:/charte de projet|project charter/i, replies:["La charte de projet, rédigée en phase d'initiation, formalise : objectif, périmètre (ce qui est inclus/exclu), grandes contraintes, chef de projet désigné, parties prenantes principales."] },
    { test:/co[uû]t.*modification|erreur.*co[uû]te/i, replies:["Le coût d'une modification croît fortement avec l'avancement du projet : une erreur corrigée en planification coûte bien moins cher qu'une erreur découverte en fin d'exécution."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la courbe du coût des changements au fil du temps.","Indice niveau 2 : elle n'est PAS constante.","Indice niveau 3 : elle augmente fortement vers la fin du projet."] }
  ]
};
/* =========================== CHAPITRE 2 =========================== */
PLAN_CHAPTERS[planKey("Structuration du projet : objectifs SMART et structure de découpage (WBS)")] = {
  objectives: [
    "Formuler un objectif de projet selon les critères SMART",
    "Construire une structure de découpage de projet (WBS) par décomposition hiérarchique",
    "Distinguer lot de travail, livrable et tâche élémentaire",
    "Utiliser une matrice RACI pour clarifier les rôles et responsabilités au sein d'une équipe projet"
  ],
  prereqs: ["Le projet et son cycle de vie : définir, cadrer, planifier, exécuter, clôturer"],
  bodyHtml: `
    <p>Une fois le projet cadré par sa charte (chapitre précédent), la phase de planification commence véritablement par une étape de <strong>structuration</strong> : préciser des objectifs réellement opérationnels, puis découper le projet en éléments suffisamment petits pour être estimés, planifiés et suivis individuellement.</p>

    <h3>1. Formuler un objectif SMART</h3>
    <p>Un objectif de projet mal formulé — trop vague, trop général — est une source fréquente d'échec ou de dérive. La méthode <strong>SMART</strong>, très largement utilisée en gestion de projet, propose cinq critères pour formuler un objectif réellement opérationnel :</p>
    <table class="mini-table">
      <tr><th>Lettre</th><th>Critère</th><th>Signification</th></tr>
      <tr><td>S</td><td>Spécifique</td><td>précis, sans ambiguïté d'interprétation</td></tr>
      <tr><td>M</td><td>Mesurable</td><td>assorti d'un indicateur quantifiable permettant de vérifier l'atteinte</td></tr>
      <tr><td>A</td><td>Atteignable (Acceptable)</td><td>réaliste compte tenu des ressources et contraintes disponibles</td></tr>
      <tr><td>R</td><td>Réaliste (pertinent)</td><td>cohérent avec les priorités et les enjeux réels du projet</td></tr>
      <tr><td>T</td><td>Temporellement défini</td><td>assorti d'une échéance précise</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> reformuler l'objectif vague « améliorer le rendement de la synthèse » selon les critères SMART.</p>
      <p><strong>Solution :</strong> un objectif SMART pourrait être formulé ainsi : « Augmenter le rendement isolé de la synthèse du composé X d'au moins 15 points de pourcentage (de 62% à 77% minimum), en optimisant la température et le temps de réaction, avant la fin du 3ᵉ mois du projet. » On y retrouve : Spécifique (la synthèse du composé X précisément), Mesurable (15 points, seuil de 77%), Atteignable (l'optimisation porte sur des paramètres opératoires classiques), Réaliste (cohérent avec l'objectif général du projet), Temporellement défini (avant la fin du 3ᵉ mois).</p>
      <p class="example-answer">Réponse : l'objectif reformulé précise la cible chiffrée, le périmètre exact et l'échéance — trois éléments absents de la formulation initiale, trop vague pour être piloté.</p>
    </div>

    <h3>2. La structure de découpage du projet (WBS)</h3>
    <p>La <strong>structure de découpage du projet</strong> (<em>Work Breakdown Structure</em>, WBS ; en français on parle aussi d'organigramme des tâches ou de structure de fractionnement du travail, SFT) organise hiérarchiquement l'ensemble du travail à réaliser, du <strong>livrable final</strong> jusqu'aux <strong>tâches élémentaires</strong>, selon une décomposition arborescente. Le principe fondamental de construction est la <strong>règle des 100%</strong> : chaque niveau de décomposition doit couvrir <strong>l'intégralité</strong> du travail du niveau immédiatement supérieur, sans omission ni double-comptage.</p>
    <table class="mini-table">
      <tr><th>Niveau</th><th>Élément</th><th>Exemple (projet de développement d'une nouvelle méthode analytique)</th></tr>
      <tr><td>0</td><td>Projet</td><td>Développement et validation d'une méthode HPLC pour le composé X</td></tr>
      <tr><td>1</td><td>Lot de travail (<em>work package</em>)</td><td>Mise au point de la méthode ; Validation analytique ; Rédaction du dossier</td></tr>
      <tr><td>2</td><td>Sous-lot / livrable</td><td>Optimisation de la phase mobile ; Étude de linéarité ; Étude de répétabilité</td></tr>
      <tr><td>3</td><td>Tâche élémentaire</td><td>Préparer 5 solutions étalons ; Réaliser 3 injections répétées ; Tracer la droite d'étalonnage</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Jusqu'où découper ? La règle des 8/80</span>
      Une règle empirique très répandue, dite <strong>règle des 8/80</strong>, recommande de découper le travail jusqu'à obtenir des <strong>tâches élémentaires</strong> dont la durée estimée se situe typiquement entre 8 heures (une journée de travail) et 80 heures (deux semaines) : un découpage plus fin complique inutilement le suivi administratif ; un découpage plus grossier rend l'estimation de durée peu fiable et le suivi d'avancement imprécis.
    </div>

    <h3>3. Lot de travail, livrable et tâche</h3>
    <p>Trois notions, souvent confondues par les débutants, méritent d'être clairement distinguées : le <strong>livrable</strong> est un résultat tangible et vérifiable produit par le projet (un rapport, un prototype, une méthode validée) ; le <strong>lot de travail</strong> (<em>work package</em>) est un ensemble cohérent de tâches conduisant à un ou plusieurs livrables, suffisamment autonome pour être confié à un responsable unique et estimé globalement ; la <strong>tâche élémentaire</strong> est l'unité de travail la plus fine de la structure, directement assignable à une personne et à une durée précise.</p>

    <h3>4. La matrice RACI</h3>
    <p>Une fois le WBS établi, il reste à clarifier <strong>qui fait quoi</strong> : la <strong>matrice RACI</strong> (Responsible, Accountable, Consulted, Informed) affecte, pour chaque lot de travail ou livrable, un rôle précis à chaque personne ou fonction impliquée :</p>
    <table class="mini-table">
      <tr><th>Rôle</th><th>Signification</th><th>Nombre attendu par tâche</th></tr>
      <tr><td>R — Responsible (réalisateur)</td><td>exécute concrètement la tâche</td><td>un ou plusieurs</td></tr>
      <tr><td>A — Accountable (responsable)</td><td>rend compte du résultat, valide, décide en dernier ressort</td><td><strong>un seul</strong> impérativement</td></tr>
      <tr><td>C — Consulted (consulté)</td><td>apporte son expertise avant/pendant l'exécution, sens à double</td><td>zéro ou plusieurs</td></tr>
      <tr><td>I — Informed (informé)</td><td>tenu au courant du résultat, sens unique</td><td>zéro ou plusieurs</td></tr>
    </table>
    <p>La règle la plus importante de la matrice RACI est qu'il ne doit exister <strong>qu'un seul « A »</strong> (Accountable) par tâche : une responsabilité finale diluée entre plusieurs personnes est, en pratique, une source quasi systématique de confusion et de retard — c'est un principe qui rejoint directement les enjeux de gouvernance abordés dans d'autres contextes organisationnels.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>SMART : un objectif doit être Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini</li>
        <li>WBS : décomposition hiérarchique du travail selon la règle des 100% (chaque niveau couvre intégralement le niveau supérieur)</li>
        <li>Règle des 8/80 : viser des tâches élémentaires de 8h à 80h pour un découpage ni trop fin ni trop grossier</li>
        <li>Livrable (résultat tangible) ≠ lot de travail (ensemble cohérent de tâches) ≠ tâche élémentaire (unité assignable)</li>
        <li>Matrice RACI : un seul Accountable par tâche, impérativement — la clé pour éviter la dilution des responsabilités</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Formuler un objectif sans indicateur mesurable ni échéance précise — un objectif non mesurable ne peut jamais être déclaré « atteint » sans ambiguïté</li>
        <li>Désigner plusieurs personnes comme « Accountable » sur une même tâche dans une matrice RACI — cela revient en pratique à n'en désigner aucune</li>
        <li>Découper le WBS de façon incomplète (violer la règle des 100%), laissant des pans du travail non couverts par aucun lot identifié</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans la méthode SMART, la lettre « M » signifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan2e1" value="wrong">Motivant</label>
          <label class="option"><input type="radio" name="plan2e1" value="right">Mesurable</label>
          <label class="option"><input type="radio" name="plan2e1" value="wrong">Modifiable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan2e1','plan2fb1','Correct — un objectif SMART doit être assorti d\\'un indicateur mesurable, permettant de vérifier objectivement s\\'il a été atteint.','Relis le tableau des cinq critères SMART.')">Vérifier</button>
        <div class="feedback" id="plan2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La règle des 100% appliquée à la construction d'un WBS signifie que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan2e2" value="wrong">le projet doit être achevé à 100% avant de commencer la planification</label>
          <label class="option"><input type="radio" name="plan2e2" value="right">chaque niveau de décomposition doit couvrir intégralement le travail du niveau supérieur, sans omission ni double-comptage</label>
          <label class="option"><input type="radio" name="plan2e2" value="wrong">100% du budget doit être dépensé avant la clôture</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan2e2','plan2fb2','Correct — c\\'est le principe de construction fondamental du WBS : aucun élément de travail ne doit être oublié, et aucun ne doit être compté deux fois.','Relis la définition de la règle des 100% en section 2.')">Vérifier</button>
        <div class="feedback" id="plan2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une matrice RACI, combien de personnes doivent porter le rôle « Accountable » (A) pour une même tâche ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan2e3" value="wrong">autant que possible, pour partager la responsabilité</label>
          <label class="option"><input type="radio" name="plan2e3" value="right">une seule, impérativement</label>
          <label class="option"><input type="radio" name="plan2e3" value="wrong">aucune, ce rôle est optionnel</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan2e3','plan2fb3','Correct — une seule personne \\'Accountable\\' par tâche : diluer cette responsabilité entre plusieurs personnes revient en pratique à n\\'en désigner aucune.','Relis la règle la plus importante de la matrice RACI en fin de section 4.')">Vérifier</button>
        <div class="feedback" id="plan2fb3"></div>
      </div>
    </div>
  `
};

PLAN_NOVA_KB[planKey("Structuration du projet : objectifs SMART et structure de découpage (WBS)")] = {
  intro: "Salut, moi c'est Nova ! On structure le projet avec SMART et le WBS. Demande-moi les 5 critères SMART, la règle des 100%, ou un indice sur un exercice.",
  rules: [
    { test:/smart/i, replies:["SMART : Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini. Un objectif qui ne coche pas ces 5 cases est difficile à piloter et à évaluer."] },
    { test:/wbs|structure de d[ée]coupage|organigramme des t[âa]ches/i, replies:["Le WBS décompose hiérarchiquement le projet : livrable final → lots de travail → sous-lots → tâches élémentaires, selon la règle des 100% (chaque niveau couvre tout le niveau supérieur, sans trou ni doublon)."] },
    { test:/8.?80|r[èe]gle des 8/i, replies:["La règle des 8/80 : viser des tâches élémentaires de 8h à 80h de durée. En dessous, le suivi est trop lourd ; au-dessus, l'estimation devient peu fiable."] },
    { test:/raci/i, replies:["RACI : Responsible (exécute), Accountable (rend compte, décide — UN SEUL par tâche), Consulted (apporte son avis), Informed (tenu informé). La règle d'or : un seul Accountable, toujours."] },
    { test:/livrable.*lot|lot.*t[âa]che/i, replies:["Livrable = résultat tangible vérifiable. Lot de travail = ensemble cohérent de tâches menant à un livrable. Tâche élémentaire = unité de travail assignable la plus fine."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce qui arrive quand PLUSIEURS personnes sont responsables en dernier ressort d'une même chose.","Indice niveau 2 : ça crée de la confusion, pas de la sécurité.","Indice niveau 3 : la règle impose UNE seule personne Accountable."] }
  ]
};
/* ---------------------------------------------------------------------------------
   OUTIL 2 — Calculateur de marge sur une tâche du réseau (chapitre 3)
--------------------------------------------------------------------------------- */
function updateFloat(){
  const es = parseFloat(document.getElementById('floatES').value) || 0;
  const ef = parseFloat(document.getElementById('floatEF').value) || 0;
  const ls = parseFloat(document.getElementById('floatLS').value) || 0;
  const lf = parseFloat(document.getElementById('floatLF').value) || 0;
  const marge = ls - es;
  const margeAlt = lf - ef;
  const out = document.getElementById('floatReadout');
  const critique = Math.abs(marge) < 1e-9;
  out.innerHTML = `Marge totale = LS − ES = ${ls} − ${es} = <strong>${marge.toFixed(1)}</strong> (vérification : LF − EF = ${margeAlt.toFixed(1)})<br>` +
    (critique ? `⚠ Marge nulle : cette tâche est sur le <strong>chemin critique</strong> — tout retard sur cette tâche retarde le projet entier.` :
      `Marge positive : cette tâche dispose de ${marge.toFixed(1)} unité(s) de temps de flexibilité avant d'impacter la date de fin du projet.`);
}
function initFloat(){ updateFloat(); }

/* =========================== CHAPITRE 3 =========================== */
PLAN_CHAPTERS[planKey("Ordonnancement des tâches : réseau PERT et méthode du chemin critique")] = {
  objectives: [
    "Construire un réseau de dépendances entre tâches (diagramme PERT / réseau à nœuds)",
    "Calculer les dates au plus tôt et au plus tard de chaque tâche par la méthode du chemin critique (CPM)",
    "Déterminer la marge totale d'une tâche et identifier le chemin critique du projet",
    "Interpréter les conséquences pratiques d'un retard sur une tâche critique versus une tâche non critique"
  ],
  prereqs: ["Structuration du projet : objectifs SMART et structure de découpage (WBS)"],
  bodyHtml: `
    <p>Le WBS (chapitre précédent) liste les tâches, mais ne dit rien de leur <strong>enchaînement dans le temps</strong>. L'<strong>ordonnancement</strong> établit les dépendances entre tâches et calcule la durée totale du projet, ainsi que la marge de manœuvre disponible sur chaque tâche — c'est l'objet de la méthode <strong>PERT</strong> (<em>Program Evaluation and Review Technique</em>, développée par la marine américaine dans les années 1950 pour le programme des missiles Polaris) couplée à la <strong>méthode du chemin critique</strong> (CPM, <em>Critical Path Method</em>).</p>

    <h3>1. Construire le réseau de dépendances</h3>
    <p>Chaque tâche est représentée par un nœud, relié aux tâches dont elle dépend (ses <strong>prédécesseurs</strong>) par des flèches orientées. Le type de dépendance le plus courant est <strong>fin-à-début</strong> (la tâche B ne peut commencer qu'une fois la tâche A terminée), mais il existe aussi des dépendances début-à-début, fin-à-fin, ou avec décalage (<em>lag</em>).</p>

    <h3>2. Calcul des dates au plus tôt (passage avant)</h3>
    <p>On calcule d'abord, en parcourant le réseau du début vers la fin, la <strong>date de début au plus tôt</strong> (ES, <em>Early Start</em>) et la <strong>date de fin au plus tôt</strong> (EF, <em>Early Finish</em>) de chaque tâche :</p>
    <div class="formula-box">$$EF = ES + \\text{durée de la tâche} \\qquad\\qquad ES_{\\text{tâche}} = \\max(EF_{\\text{de tous les prédécesseurs}})$$</div>
    <p>La date de fin au plus tôt de la <strong>dernière</strong> tâche du réseau donne la durée totale minimale du projet.</p>

    <h3>3. Calcul des dates au plus tard (passage arrière)</h3>
    <p>On parcourt ensuite le réseau en sens inverse, de la fin vers le début, pour calculer la <strong>date de fin au plus tard</strong> (LF, <em>Late Finish</em>) et la <strong>date de début au plus tard</strong> (LS, <em>Late Start</em>) de chaque tâche — c'est-à-dire les dates limites qui ne remettent pas en cause la durée totale du projet déjà déterminée :</p>
    <div class="formula-box">$$LS = LF - \\text{durée de la tâche} \\qquad\\qquad LF_{\\text{tâche}} = \\min(LS_{\\text{de tous les successeurs}})$$</div>

    <h3>4. La marge totale et le chemin critique</h3>
    <p>La <strong>marge totale</strong> (<em>float</em> ou <em>slack</em>) d'une tâche mesure le retard maximal qu'elle peut subir sans retarder la date de fin globale du projet :</p>
    <div class="formula-box">$$\\text{Marge totale} = LS - ES = LF - EF$$</div>
    <p>Les tâches dont la marge totale est <strong>nulle</strong> forment, mises bout à bout, le <strong>chemin critique</strong> du projet : la (ou les) séquence(s) continue(s) de tâches, du début à la fin du réseau, dont le moindre retard se répercute directement, heure pour heure, sur la date de fin du projet tout entier. C'est la conséquence la plus importante de toute la méthode CPM.</p>

    <div class="key-point">
      <span class="eyebrow">Pourquoi le chemin critique concentre l'attention du chef de projet</span>
      Une tâche <strong>hors</strong> chemin critique dispose d'une marge : elle peut prendre du retard, dans la limite de sa marge, sans compromettre la date de fin du projet. Une tâche <strong>sur</strong> le chemin critique n'a, par définition, aucune marge : tout retard s'y répercute intégralement sur la fin du projet. Le chef de projet concentre donc naturellement sa surveillance et ses ressources supplémentaires sur les tâches critiques — c'est le principe fondamental qui rend la méthode CPM si utile en pilotage opérationnel, bien au-delà du simple calcul de durée totale.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un petit projet comporte 3 tâches en série : A (3 jours), puis B (5 jours, débute après A), puis C (2 jours, débute après B). Une tâche D (4 jours) peut démarrer en parallèle de A et doit être terminée avant C. Calculer la durée totale du projet et identifier le chemin critique.</p>
      <p><strong>Solution :</strong> chemin A→B→C : $ES_A=0$, $EF_A=3$ ; $ES_B=3$, $EF_B=8$ ; $ES_C=\\max(EF_B,EF_D)$. Pour D : $ES_D=0$, $EF_D=4$. Donc $ES_C=\\max(8,4)=8$, $EF_C=10$. La durée totale du projet est de <strong>10 jours</strong>. Sur le chemin A-B-C, la marge est nulle (ce chemin détermine la durée totale) : c'est le <strong>chemin critique</strong>. Sur D, $LF_D=ES_C=8$ (D doit être fini avant que C ne démarre), donc $LS_D=8-4=4$ ; marge de D $=LS_D-ES_D=4-0=4$ jours : D dispose de 4 jours de flexibilité.</p>
      <p class="example-answer">Réponse : durée totale = 10 jours ; chemin critique = A→B→C (marge nulle) ; la tâche D dispose d'une marge de 4 jours.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 70" width="100%">
          <rect x="5" y="30" width="30" height="16" fill="none" stroke="#F0555C" stroke-width="1.4"/>
          <text x="12" y="40" font-size="6" fill="#F0555C">A (3j)</text>
          <rect x="45" y="30" width="30" height="16" fill="none" stroke="#F0555C" stroke-width="1.4"/>
          <text x="52" y="40" font-size="6" fill="#F0555C">B (5j)</text>
          <rect x="85" y="30" width="30" height="16" fill="none" stroke="#F0555C" stroke-width="1.4"/>
          <text x="92" y="40" font-size="6" fill="#F0555C">C (2j)</text>
          <rect x="45" y="5" width="30" height="16" fill="none" stroke="#3D6BF0" stroke-width="1.2" stroke-dasharray="2 2"/>
          <text x="52" y="15" font-size="6" fill="#3D6BF0">D (4j)</text>
          <line x1="35" y1="38" x2="45" y2="38" stroke="#F0555C" stroke-width="1.4" marker-end="url(#planArr1)"/>
          <line x1="75" y1="38" x2="85" y2="38" stroke="#F0555C" stroke-width="1.4" marker-end="url(#planArr1)"/>
          <line x1="75" y1="13" x2="95" y2="30" stroke="#3D6BF0" stroke-width="1" stroke-dasharray="2 2"/>
          <defs><marker id="planArr1" markerWidth="6" markerHeight="6" refX="4" refY="2" orient="auto"><path d="M0,0L4,2L0,4Z" fill="#F0555C"/></marker></defs>
        </svg>
        <span>Chemin critique A→B→C (rouge, marge nulle) ; D (bleu, en pointillé) dispose d'une marge de 4 jours.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Passage avant : ES et EF, du début vers la fin (ES = max des EF des prédécesseurs)</li>
        <li>Passage arrière : LS et LF, de la fin vers le début (LF = min des LS des successeurs)</li>
        <li>Marge totale = LS − ES = LF − EF : retard maximal supportable sans impacter la fin du projet</li>
        <li>Chemin critique = suite de tâches à marge nulle ; tout retard s'y répercute directement sur la fin du projet</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de prendre le MAXIMUM des EF de tous les prédécesseurs pour calculer l'ES d'une tâche qui a plusieurs prédécesseurs — c'est l'erreur la plus fréquente du passage avant</li>
        <li>Oublier de prendre le MINIMUM des LS de tous les successeurs pour calculer le LF d'une tâche qui a plusieurs successeurs, lors du passage arrière</li>
        <li>Croire qu'une tâche à forte marge ne mérite aucune attention — une accumulation de petits retards sur plusieurs tâches non critiques peut, à terme, transformer un chemin non critique en nouveau chemin critique</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — marge totale d'une tâche</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Renseigne les dates ES, EF, LS, LF (mêmes unités) d'une tâche pour calculer sa marge totale et savoir si elle est sur le chemin critique.</p>
      <div class="sim-controls">
        <label>ES : <input type="number" id="floatES" value="8" step="1" style="width:60px;" oninput="updateFloat()"></label>
        <label>EF : <input type="number" id="floatEF" value="10" step="1" style="width:60px;" oninput="updateFloat()"></label>
        <label>LS : <input type="number" id="floatLS" value="8" step="1" style="width:60px;" oninput="updateFloat()"></label>
        <label>LF : <input type="number" id="floatLF" value="10" step="1" style="width:60px;" oninput="updateFloat()"></label>
        <div class="sim-readout" id="floatReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une tâche ayant deux prédécesseurs, sa date de début au plus tôt (ES) est égale à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan3e1" value="wrong">la somme des EF des deux prédécesseurs</label>
          <label class="option"><input type="radio" name="plan3e1" value="right">le maximum des EF des deux prédécesseurs</label>
          <label class="option"><input type="radio" name="plan3e1" value="wrong">le minimum des EF des deux prédécesseurs</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan3e1','plan3fb1','Correct — la tâche ne peut démarrer que lorsque TOUS ses prédécesseurs sont achevés, donc on prend le maximum (le plus tardif) de leurs dates de fin au plus tôt.','Une tâche a besoin que TOUS ses prédécesseurs soient finis, pas seulement un seul.')">Vérifier</button>
        <div class="feedback" id="plan3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une tâche dont la marge totale est nulle appartient :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan3e2" value="wrong">à une branche secondaire sans importance</label>
          <label class="option"><input type="radio" name="plan3e2" value="right">au chemin critique du projet</label>
          <label class="option"><input type="radio" name="plan3e2" value="wrong">à une tâche déjà terminée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan3e2','plan3fb2','Correct — une marge nulle signifie qu\\'aucun retard n\\'est possible sans décaler la fin du projet : c\\'est la définition même d\\'une tâche du chemin critique.','Relis la définition du chemin critique en section 4.')">Vérifier</button>
        <div class="feedback" id="plan3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans l'exemple corrigé du chapitre (A→B→C en série, D en parallèle), la marge de la tâche D est de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan3e3" value="wrong">0 jour</label>
          <label class="option"><input type="radio" name="plan3e3" value="right">4 jours</label>
          <label class="option"><input type="radio" name="plan3e3" value="wrong">10 jours</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan3e3','plan3fb3','Correct — LS_D=4, ES_D=0, donc marge = 4-0 = 4 jours, comme calculé dans l\\'exemple corrigé.','Relis le calcul détaillé de la marge de D dans l\\'exemple corrigé du chapitre.')">Vérifier</button>
        <div class="feedback" id="plan3fb3"></div>
      </div>
    </div>
  `,
  init: initFloat
};

PLAN_NOVA_KB[planKey("Ordonnancement des tâches : réseau PERT et méthode du chemin critique")] = {
  intro: "Salut, moi c'est Nova ! On calcule le chemin critique d'un projet avec la méthode PERT/CPM. Demande-moi comment calculer ES/EF/LS/LF, ce qu'est la marge totale, ou un indice sur un exercice.",
  rules: [
    { test:/es|ef|passage avant|date au plus t[ôo]t/i, replies:["Passage avant : EF = ES + durée. Pour une tâche à plusieurs prédécesseurs, ES = MAXIMUM des EF de tous ses prédécesseurs (elle ne peut démarrer que si TOUS sont finis)."] },
    { test:/ls|lf|passage arri[èe]re|date au plus tard/i, replies:["Passage arrière (de la fin vers le début) : LS = LF - durée. Pour une tâche à plusieurs successeurs, LF = MINIMUM des LS de tous ses successeurs."] },
    { test:/marge|float|slack/i, replies:["Marge totale = LS - ES = LF - EF. Elle mesure le retard maximal supportable par une tâche sans décaler la date de fin du projet."] },
    { test:/chemin critique|critical path/i, replies:["Le chemin critique regroupe les tâches à marge NULLE, mises bout à bout du début à la fin du projet : tout retard sur l'une d'elles retarde le projet entier, jour pour jour."] },
    { test:/pert.*histoire|pert.*origine|marine|polaris/i, replies:["La méthode PERT a été développée dans les années 1950 par la marine américaine pour le programme de missiles Polaris, avant de se généraliser à toute la gestion de projet."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la condition pour qu'une tâche puisse démarrer.","Indice niveau 2 : elle a besoin que TOUS ses prédécesseurs soient finis.","Indice niveau 3 : donc on prend le MAXIMUM (le plus tardif) des EF."] }
  ]
};
/* =========================== CHAPITRE 4 =========================== */
PLAN_CHAPTERS[planKey("Le diagramme de Gantt : planification visuelle et suivi d'avancement")] = {
  objectives: [
    "Construire un diagramme de Gantt à partir d'un réseau de tâches ordonnancé",
    "Représenter les dépendances, les jalons et le chemin critique sur un diagramme de Gantt",
    "Utiliser le diagramme de Gantt pour suivre l'avancement réel par rapport à la planification initiale (ligne de base)",
    "Identifier les avantages et les limites du diagramme de Gantt par rapport au réseau PERT"
  ],
  prereqs: ["Ordonnancement des tâches : réseau PERT et méthode du chemin critique"],
  bodyHtml: `
    <p>Le réseau PERT du chapitre précédent est l'outil de <strong>calcul</strong> par excellence — il détermine rigoureusement la durée du projet et le chemin critique. Mais sa lecture reste peu intuitive pour une équipe ou un commanditaire non spécialiste. Le <strong>diagramme de Gantt</strong>, inventé au début du XXᵉ siècle par l'ingénieur américain Henry Gantt, complète le réseau PERT par une représentation visuelle immédiatement lisible : chaque tâche y est représentée par une barre horizontale, positionnée sur un axe des temps, dont la longueur est proportionnelle à sa durée.</p>

    <h3>1. Construction d'un diagramme de Gantt</h3>
    <p>À partir des dates calculées au chapitre précédent (ES, EF pour chaque tâche), on trace un diagramme à deux axes : l'axe vertical liste les tâches (souvent organisées selon la hiérarchie du WBS), l'axe horizontal représente le temps. Chaque tâche apparaît comme une <strong>barre</strong> allant de sa date de début à sa date de fin ; les dépendances entre tâches sont représentées par des <strong>flèches</strong> reliant la fin d'une barre au début de la suivante.</p>

    <h3>2. Les jalons (milestones)</h3>
    <p>Un <strong>jalon</strong> (<em>milestone</em>) est un événement clé du projet, de durée nulle par définition (il marque un instant précis, pas une période) : la validation d'un livrable intermédiaire, une réunion de revue de projet, l'obtention d'une autorisation réglementaire. Sur le diagramme de Gantt, un jalon se représente conventionnellement par un symbole distinct (souvent un losange) plutôt que par une barre. Les jalons structurent visuellement le projet et servent de points de contrôle privilégiés pour vérifier que l'avancement réel reste cohérent avec la planification.</p>

    <h3>3. Faire apparaître le chemin critique sur le Gantt</h3>
    <p>Un bon diagramme de Gantt distingue visuellement (par une couleur ou une trame différente) les barres correspondant aux tâches du <strong>chemin critique</strong> (chapitre précédent) des autres tâches : cela permet à toute personne consultant le planning, même sans connaissance approfondie de la méthode CPM, de repérer immédiatement les tâches qui ne tolèrent <strong>aucun retard</strong>.</p>

    <div class="key-point">
      <span class="eyebrow">Le diagramme de Gantt comme outil de suivi : la ligne de base</span>
      Au-delà de sa fonction de planification initiale, le diagramme de Gantt sert de support central au <strong>suivi d'avancement</strong> tout au long du projet (phase de pilotage, chapitre 8). On conserve une copie figée du planning initial — la <strong>ligne de base</strong> (<em>baseline</em>) — à laquelle on superpose, au fil du projet, l'avancement <strong>réel</strong> de chaque tâche (souvent représenté par une seconde barre, ou par un pourcentage d'avancement indiqué à l'intérieur de la barre initiale). L'écart entre la ligne de base et l'avancement réel révèle immédiatement les dérives de planning, tâche par tâche.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> reprenons l'exemple du chapitre précédent (A : 3j ; B : 5j, après A ; C : 2j, après B et D ; D : 4j, en parallèle de A). Représenter la structure de ce projet en indiquant, pour chaque tâche, sa position sur l'axe des temps (en jours, à partir du jour 0).</p>
      <p><strong>Solution :</strong> A occupe les jours 0 à 3 ; B occupe les jours 3 à 8 (juste après A) ; D occupe les jours 0 à 4 (en parallèle de A, avec une marge de 4 jours calculée précédemment, donc D pourrait aussi bien être positionnée entre le jour 4 et le jour 8 sans impacter le projet) ; C occupe les jours 8 à 10 (après le dernier de ses deux prédécesseurs, B et D, terminés respectivement au jour 8). Le diagramme fait apparaître A, B et C en tâches critiques (marge nulle), et D comme tâche non critique disposant de 4 jours de flexibilité de positionnement.</p>
      <p class="example-answer">Réponse : A[0-3], D[0-4] (ou décalable jusqu'à [4-8]), B[3-8], C[8-10] — durée totale du projet 10 jours, avec A-B-C en chemin critique.</p>
    </div>

    <h3>4. Avantages et limites du Gantt face au réseau PERT</h3>
    <table class="mini-table">
      <tr><th></th><th>Diagramme de Gantt</th><th>Réseau PERT</th></tr>
      <tr><td>Lisibilité</td><td>Excellente, très intuitive, y compris pour un non-spécialiste</td><td>Plus technique, nécessite une lecture experte</td></tr>
      <tr><td>Calcul du chemin critique</td><td>Ne le calcule pas directement (doit être calculé en amont par CPM puis reporté)</td><td>Outil de calcul natif du chemin critique</td></tr>
      <tr><td>Visualisation des dépendances complexes</td><td>Devient vite illisible pour de très nombreuses dépendances croisées</td><td>Représente nativement toute la structure des dépendances</td></tr>
      <tr><td>Suivi d'avancement</td><td>Très adapté (ligne de base vs réel)</td><td>Moins intuitif pour le suivi visuel</td></tr>
    </table>
    <p>En pratique, les deux outils sont <strong>complémentaires</strong> et quasi systématiquement utilisés conjointement dans les logiciels de gestion de projet modernes : le réseau PERT/CPM calcule les dates et le chemin critique en amont (chapitre précédent), le diagramme de Gantt les restitue ensuite sous une forme lisible par toutes les parties prenantes et sert de tableau de bord pour le suivi (chapitre 8).</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 80" width="100%">
          <line x1="10" y1="70" x2="150" y2="70" stroke="#122043" stroke-width="1"/>
          <rect x="10" y="10" width="42" height="10" fill="#F0555C" opacity="0.7"/>
          <text x="12" y="8" font-size="6">A</text>
          <rect x="10" y="26" width="56" height="10" fill="#3D6BF0" opacity="0.7"/>
          <text x="12" y="24" font-size="6">D</text>
          <rect x="52" y="42" width="70" height="10" fill="#F0555C" opacity="0.7"/>
          <text x="52" y="40" font-size="6">B</text>
          <rect x="122" y="58" width="28" height="10" fill="#F0555C" opacity="0.7"/>
          <text x="122" y="56" font-size="6">C</text>
          <text x="8" y="78" font-size="5.5">0</text>
          <text x="148" y="78" font-size="5.5">10j</text>
        </svg>
        <span>Diagramme de Gantt du projet exemple : A, B, C en rouge (chemin critique), D en bleu (marge de 4 jours).</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le diagramme de Gantt représente chaque tâche par une barre horizontale positionnée sur un axe des temps</li>
        <li>Un jalon (milestone) marque un événement de durée nulle, représenté par un symbole distinct (souvent un losange)</li>
        <li>Le chemin critique doit être mis en évidence visuellement sur le Gantt pour un pilotage efficace</li>
        <li>La ligne de base (planning initial figé) comparée à l'avancement réel permet de détecter les dérives de planning</li>
        <li>Gantt et PERT sont complémentaires : PERT calcule, Gantt restitue visuellement et sert au suivi</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Construire un Gantt sans avoir préalablement calculé le chemin critique par CPM — le Gantt seul ne calcule rien, il ne fait que représenter des dates déjà déterminées</li>
        <li>Représenter un jalon par une barre de durée non nulle — un jalon est par définition instantané</li>
        <li>Oublier de conserver une ligne de base : sans planning initial figé de référence, il devient impossible de mesurer objectivement une dérive de planning en cours de projet</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un jalon (milestone) sur un diagramme de Gantt se représente typiquement par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan4e1" value="wrong">une longue barre horizontale</label>
          <label class="option"><input type="radio" name="plan4e1" value="right">un symbole ponctuel (souvent un losange), car sa durée est nulle</label>
          <label class="option"><input type="radio" name="plan4e1" value="wrong">une flèche verticale reliant deux tâches</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan4e1','plan4fb1','Correct — un jalon marque un événement instantané (durée nulle), donc il ne peut pas être représenté par une barre proportionnelle à une durée.','Relis la définition d\\'un jalon en section 2 : quelle est sa durée ?')">Vérifier</button>
        <div class="feedback" id="plan4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La « ligne de base » d'un diagramme de Gantt correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan4e2" value="wrong">l'avancement réel du projet, mesuré au jour le jour</label>
          <label class="option"><input type="radio" name="plan4e2" value="right">le planning initial figé, servant de référence pour mesurer les dérives</label>
          <label class="option"><input type="radio" name="plan4e2" value="wrong">la liste des ressources humaines affectées au projet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan4e2','plan4fb2','Correct — la ligne de base est le planning initial conservé tel quel, contre lequel on compare l\\'avancement réel pour détecter d\\'éventuels écarts.','Relis l\\'encadré sur le diagramme de Gantt comme outil de suivi en section 3.')">Vérifier</button>
        <div class="feedback" id="plan4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Par rapport au réseau PERT, le diagramme de Gantt :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan4e3" value="wrong">calcule lui-même le chemin critique, sans avoir besoin du CPM</label>
          <label class="option"><input type="radio" name="plan4e3" value="right">restitue de façon plus lisible des dates déjà calculées en amont par la méthode CPM</label>
          <label class="option"><input type="radio" name="plan4e3" value="wrong">est totalement incompatible avec la notion de chemin critique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan4e3','plan4fb3','Correct — le Gantt et le PERT/CPM sont complémentaires : le calcul des dates et du chemin critique se fait via CPM, le Gantt en offre ensuite une restitution visuelle lisible par tous.','Relis le tableau comparatif Gantt/PERT en section 4.')">Vérifier</button>
        <div class="feedback" id="plan4fb3"></div>
      </div>
    </div>
  `
};

PLAN_NOVA_KB[planKey("Le diagramme de Gantt : planification visuelle et suivi d'avancement")] = {
  intro: "Salut, moi c'est Nova ! On construit un diagramme de Gantt à partir du chemin critique. Demande-moi ce qu'est un jalon, la différence avec le réseau PERT, ou un indice sur un exercice.",
  rules: [
    { test:/jalon|milestone/i, replies:["Un jalon (milestone) marque un événement clé de durée nulle (validation, réunion, autorisation) : sur le Gantt, il se représente par un symbole ponctuel, souvent un losange, pas par une barre."] },
    { test:/ligne de base|baseline/i, replies:["La ligne de base est le planning initial figé, conservé comme référence tout au long du projet, pour comparer l'avancement réel et détecter les dérives (chapitre 8, pilotage)."] },
    { test:/gantt.*pert|pert.*gantt|diff[ée]rence.*gantt/i, replies:["PERT/CPM calcule les dates et le chemin critique (chapitre 3). Le Gantt en offre ensuite une représentation visuelle lisible par tous, et sert de support au suivi. Les deux sont complémentaires."] },
    { test:/henry gantt|origine.*gantt/i, replies:["Le diagramme de Gantt doit son nom à l'ingénieur américain Henry Gantt, qui l'a popularisé au début du XXe siècle."] },
    { test:/chemin critique.*gantt/i, replies:["Sur un bon Gantt, les tâches du chemin critique sont mises en évidence visuellement (couleur ou trame différente) pour repérer immédiatement les tâches sans aucune marge."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la durée d'un jalon.","Indice niveau 2 : elle est nulle par définition.","Indice niveau 3 : donc pas de barre, mais un symbole ponctuel comme un losange."] }
  ]
};
/* =========================== CHAPITRE 5 =========================== */
PLAN_CHAPTERS[planKey("Estimation des durées et gestion des ressources")] = {
  objectives: [
    "Distinguer les principales techniques d'estimation de durée (analogique, paramétrique, à trois points)",
    "Calculer une estimation de durée par la formule PERT à trois points et son incertitude associée",
    "Identifier un conflit de ressources sur un planning et présenter les stratégies de résolution (lissage, nivellement)",
    "Comprendre l'effet contre-productif du multitâche excessif sur la durée réelle des projets"
  ],
  prereqs: ["Le diagramme de Gantt : planification visuelle et suivi d'avancement"],
  bodyHtml: `
    <p>Les calculs du chemin critique (chapitre 3) supposent des durées de tâches déjà connues — mais d'où viennent ces chiffres ? Ce chapitre présente les principales techniques d'estimation, puis aborde la question, tout aussi cruciale, de la disponibilité effective des <strong>ressources</strong> (humaines, matérielles) nécessaires pour réaliser les tâches dans les délais prévus.</p>

    <h3>1. Les grandes techniques d'estimation de durée</h3>
    <table class="mini-table">
      <tr><th>Technique</th><th>Principe</th><th>Fiabilité</th></tr>
      <tr><td>Estimation analogique</td><td>Se baser sur la durée réelle d'une tâche comparable déjà réalisée dans un projet antérieur</td><td>Rapide mais approximative</td></tr>
      <tr><td>Estimation paramétrique</td><td>Utiliser une relation statistique entre une variable mesurable et la durée (ex : nombre d'échantillons × temps unitaire d'analyse)</td><td>Bonne si le modèle est bien calibré</td></tr>
      <tr><td>Estimation ascendante (<em>bottom-up</em>)</td><td>Décomposer la tâche en sous-éléments (via le WBS), estimer chacun, puis sommer</td><td>Précise, mais coûteuse en temps</td></tr>
      <tr><td>Estimation à trois points (PERT)</td><td>Combiner trois scénarios (optimiste, le plus probable, pessimiste) en une valeur pondérée</td><td>Bonne prise en compte de l'incertitude</td></tr>
    </table>

    <h3>2. L'estimation PERT à trois points</h3>
    <p>Pour toute tâche affectée d'une incertitude significative (cas fréquent en recherche expérimentale), la méthode PERT recommande d'estimer non pas une durée unique, mais trois scénarios : une durée <strong>optimiste</strong> $O$ (tout se passe au mieux), une durée <strong>la plus probable</strong> $M$, et une durée <strong>pessimiste</strong> $P$ (complications raisonnablement envisageables). La durée <strong>estimée</strong> $t_e$, utilisée ensuite dans les calculs du chemin critique, est une moyenne pondérée qui privilégie fortement le scénario le plus probable :</p>
    <div class="formula-box">$$t_e = \\frac{O + 4M + P}{6} \\qquad\\qquad \\sigma = \\frac{P-O}{6}$$</div>
    <p>Cette formule provient de l'approximation de la <strong>loi bêta</strong> par une distribution dont la moyenne pondère six fois plus le scénario le plus probable que chacun des deux scénarios extrêmes. L'écart-type $\\sigma$, associé à cette estimation, permet ensuite de construire un intervalle de confiance sur la durée totale du projet (en combinant statistiquement les variances des tâches du chemin critique).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une étape de purification par recristallisation est estimée à 2 jours dans le meilleur des cas (O), 4 jours le plus probablement (M), et jusqu'à 10 jours en cas de difficultés de cristallisation (P). Calculer la durée estimée $t_e$ et l'écart-type associé.</p>
      <p><strong>Solution :</strong> $t_e = (2 + 4\\times4 + 10)/6 = (2+16+10)/6 = 28/6 \\approx 4{,}67$ jours. $\\sigma = (10-2)/6 = 8/6 \\approx 1{,}33$ jour.</p>
      <p class="example-answer">Réponse : $t_e\\approx4{,}67$ jours, avec un écart-type d'environ 1,33 jour — une valeur sensiblement supérieure au simple scénario « le plus probable » (4 jours), car la pondération tient compte du risque asymétrique porté par le scénario pessimiste.</p>
    </div>

    <h3>3. Les conflits de ressources</h3>
    <p>Le calcul du chemin critique (chapitre 3) suppose implicitement que les <strong>ressources</strong> nécessaires (un chercheur, un appareil de mesure, une salle blanche...) sont disponibles au moment prévu. En réalité, une même ressource limitée (par exemple, un unique spectromètre RMN partagé par plusieurs équipes) peut être sollicitée simultanément par deux tâches du planning, même si le réseau de dépendances logiques ne l'interdit pas explicitement : c'est un <strong>conflit de ressources</strong>, distinct d'une simple contrainte de dépendance temporelle.</p>
    <div class="key-point">
      <span class="eyebrow">Deux stratégies de résolution : nivellement et lissage</span>
      Le <strong>nivellement des ressources</strong> (<em>resource leveling</em>) consiste à décaler certaines tâches non critiques (en utilisant leur marge disponible, chapitre 3) pour éviter tout conflit d'affectation de ressources — quitte, si la marge disponible est insuffisante, à accepter un allongement de la durée totale du projet. Le <strong>lissage des ressources</strong> (<em>resource smoothing</em>) est plus contraint : il ne décale les tâches que dans la limite de leur marge disponible, <strong>sans jamais</strong> modifier la date de fin du projet — au prix, parfois, de conflits de ressources qui ne peuvent pas être totalement résolus par ce seul moyen.
    </div>

    <h3>4. Le mythe du multitâche : la loi de la contre-productivité</h3>
    <p>Une intuition répandue, mais largement infirmée par la recherche en gestion de projet, veut qu'affecter une même personne à plusieurs tâches en parallèle (multitâche) accélère l'avancement global. En réalité, chaque changement de contexte entre deux tâches génère un coût caché (temps de reprise en main, perte de concentration) : au-delà de deux tâches simultanées, la <strong>durée totale cumulée</strong> nécessaire pour achever l'ensemble des tâches augmente sensiblement, même si chaque tâche individuelle semble progresser. C'est un argument de poids en faveur d'une allocation de ressources aussi <strong>focalisée</strong> que possible sur les tâches du chemin critique en particulier.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Techniques d'estimation : analogique (rapide), paramétrique (modèle statistique), ascendante (précise), PERT à trois points (gère l'incertitude)</li>
        <li>PERT à 3 points : t_e = (O + 4M + P)/6, écart-type σ = (P−O)/6</li>
        <li>Un conflit de ressources est distinct d'une contrainte de dépendance logique — deux tâches sans lien de dépendance peuvent quand même se disputer une même ressource limitée</li>
        <li>Nivellement (peut allonger le projet) vs lissage (reste dans la marge disponible, ne change jamais la fin du projet)</li>
        <li>Le multitâche excessif est contre-productif : chaque changement de contexte a un coût caché qui allonge la durée cumulée réelle</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser uniquement le scénario « le plus probable » (M) comme durée estimée, en ignorant l'asymétrie possible entre les scénarios optimiste et pessimiste</li>
        <li>Confondre conflit de ressources (deux tâches se disputent la même ressource limitée) et dépendance logique (une tâche a besoin que l'autre soit terminée) — ce sont deux problèmes de nature différente</li>
        <li>Croire que multiplier les tâches en parallèle pour une même personne accélère toujours le projet — c'est souvent l'inverse au-delà d'un certain seuil</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — estimation PERT à trois points</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Renseigne les durées optimiste (O), la plus probable (M) et pessimiste (P) pour calculer la durée estimée et son incertitude.</p>
      <div class="sim-controls">
        <label>O (optimiste) : <input type="number" id="pertO" value="2" step="0.5" style="width:60px;" oninput="updatePertEstimate()"></label>
        <label>M (probable) : <input type="number" id="pertM" value="4" step="0.5" style="width:60px;" oninput="updatePertEstimate()"></label>
        <label>P (pessimiste) : <input type="number" id="pertP" value="10" step="0.5" style="width:60px;" oninput="updatePertEstimate()"></label>
        <div class="sim-readout" id="pertReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans la formule PERT à trois points t_e = (O + 4M + P)/6, le scénario le plus probable M est pondéré :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan5e1" value="wrong">de la même façon que O et P</label>
          <label class="option"><input type="radio" name="plan5e1" value="right">quatre fois plus que chacun des scénarios extrêmes</label>
          <label class="option"><input type="radio" name="plan5e1" value="wrong">il n'intervient pas dans le calcul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan5e1','plan5fb1','Correct — le coefficient 4 devant M, contre 1 pour O et P, reflète le fait que le scénario le plus probable pèse bien plus lourd dans l\\'estimation finale.','Regarde les coefficients devant chaque terme dans la formule : 1, 4, 1.')">Vérifier</button>
        <div class="feedback" id="plan5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le lissage des ressources (resource smoothing), contrairement au nivellement, se caractérise par le fait qu'il :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan5e2" value="wrong">peut allonger la durée totale du projet</label>
          <label class="option"><input type="radio" name="plan5e2" value="right">ne décale les tâches que dans la limite de leur marge, sans jamais modifier la fin du projet</label>
          <label class="option"><input type="radio" name="plan5e2" value="wrong">ignore complètement les contraintes de ressources</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan5e2','plan5fb2','Correct — le lissage est plus contraint que le nivellement : il n\\'utilise que la marge disponible et préserve toujours la date de fin du projet, quitte à ne pas résoudre tous les conflits de ressources.','Relis la distinction entre nivellement et lissage dans l\\'encadré de la section 3.')">Vérifier</button>
        <div class="feedback" id="plan5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">D'après la recherche en gestion de projet, affecter une même personne à de nombreuses tâches en parallèle (multitâche excessif) :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan5e3" value="wrong">accélère toujours l'achèvement global des tâches</label>
          <label class="option"><input type="radio" name="plan5e3" value="right">tend à allonger la durée cumulée réelle, à cause des coûts cachés de changement de contexte</label>
          <label class="option"><input type="radio" name="plan5e3" value="wrong">n'a aucun effet mesurable sur la durée des tâches</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan5e3','plan5fb3','Correct — chaque changement de contexte entre tâches a un coût caché (reprise en main, perte de concentration) qui, cumulé, allonge la durée totale réelle au-delà d\\'un certain niveau de multitâche.','Relis la section 4 sur le mythe du multitâche.')">Vérifier</button>
        <div class="feedback" id="plan5fb3"></div>
      </div>
    </div>
  `,
  init: initPertEstimate
};

PLAN_NOVA_KB[planKey("Estimation des durées et gestion des ressources")] = {
  intro: "Salut, moi c'est Nova ! On aborde l'estimation des durées (PERT à 3 points) et la gestion des ressources. Demande-moi la formule PERT, la différence nivellement/lissage, ou un indice sur un exercice.",
  rules: [
    { test:/pert.*trois points|formule pert|te.*o.*4m.*p/i, replies:["t_e = (O + 4M + P) / 6, avec σ = (P-O)/6. M (le plus probable) pèse 4 fois plus que chacun des scénarios extrêmes O et P."] },
    { test:/estimation analogique|estimation param[ée]trique|ascendante/i, replies:["Analogique (comparer à un projet passé), paramétrique (modèle statistique), ascendante/bottom-up (décomposer puis sommer via le WBS), PERT à 3 points (gère l'incertitude)."] },
    { test:/nivellement|lissage|conflit de ressources/i, replies:["Nivellement : décale des tâches, peut allonger le projet si besoin. Lissage : reste dans la marge disponible, ne modifie JAMAIS la fin du projet, mais peut laisser des conflits non résolus."] },
    { test:/multit[âa]che/i, replies:["Le multitâche excessif est contre-productif : chaque changement de contexte a un coût caché (reprise en main), ce qui allonge la durée cumulée réelle de l'ensemble des tâches."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde les coefficients numériques dans la formule.","Indice niveau 2 : O a le coefficient 1, M a un autre coefficient, P a le coefficient 1.","Indice niveau 3 : le coefficient de M est 4."] }
  ]
};
/* ---------------------------------------------------------------------------------
   OUTIL 3 — Calculateur de valeur acquise (EVM) — chapitre 6
--------------------------------------------------------------------------------- */
function updateEVM(){
  const pv = parseFloat(document.getElementById('evmPV').value) || 0;
  const ev = parseFloat(document.getElementById('evmEV').value) || 0;
  const ac = parseFloat(document.getElementById('evmAC').value) || 0;
  const cv = ev - ac;
  const sv = ev - pv;
  const cpi = ac !== 0 ? ev/ac : 0;
  const spi = pv !== 0 ? ev/pv : 0;
  const out = document.getElementById('evmReadout');
  out.innerHTML = `Écart de coût : CV = EV − AC = ${ev} − ${ac} = <strong>${cv.toFixed(1)}</strong> (${cv>=0?'sous le budget':'dépassement de budget'})<br>` +
    `Écart de délai : SV = EV − PV = ${ev} − ${pv} = <strong>${sv.toFixed(1)}</strong> (${sv>=0?'en avance':'en retard'})<br>` +
    `Indice de performance des coûts : CPI = EV/AC = <strong>${cpi.toFixed(2)}</strong> (${cpi>=1?'efficience budgétaire correcte':'dérive budgétaire'})<br>` +
    `Indice de performance des délais : SPI = EV/PV = <strong>${spi.toFixed(2)}</strong> (${spi>=1?'rythme conforme ou en avance':'rythme en retard'})`;
}
function initEVM(){ updateEVM(); }

/* =========================== CHAPITRE 6 =========================== */
PLAN_CHAPTERS[planKey("Gestion budgétaire et valeur acquise (Earned Value Management)")] = {
  objectives: [
    "Construire un budget de projet et une courbe de référence des coûts (cost baseline)",
    "Définir les trois grandeurs fondamentales de la méthode de la valeur acquise : PV, EV, AC",
    "Calculer les écarts de coût (CV) et de délai (SV) et les indices de performance (CPI, SPI)",
    "Interpréter ces indicateurs pour anticiper le coût final et le délai final d'un projet en cours"
  ],
  prereqs: ["Estimation des durées et gestion des ressources"],
  bodyHtml: `
    <p>Un planning respecté (chapitres 3-4) ne garantit pas, à lui seul, qu'un projet reste dans son <strong>budget</strong>. La méthode de la <strong>valeur acquise</strong> (<em>Earned Value Management</em>, EVM), largement utilisée dans l'industrie et la recherche financée par projet, permet de suivre simultanément l'avancement du planning <strong>et</strong> du budget, à partir de trois grandeurs simples mais puissamment complémentaires.</p>

    <h3>1. Construire le budget et la courbe de référence des coûts</h3>
    <p>Une fois le WBS établi (chapitre 2) et les durées estimées (chapitre 5), chaque lot de travail se voit attribuer un <strong>coût budgété</strong> (ressources humaines valorisées, matériel, consommables, sous-traitance). La somme cumulée de ces coûts, répartie dans le temps selon le planning prévu, constitue la <strong>courbe de référence des coûts</strong> (<em>cost baseline</em>) — l'équivalent, pour le budget, de la ligne de base du planning (chapitre 4).</p>

    <h3>2. Les trois grandeurs fondamentales de l'EVM</h3>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Nom complet</th><th>Signification</th></tr>
      <tr><td>PV</td><td>Valeur planifiée (<em>Planned Value</em>)</td><td>coût budgété du travail qui <strong>devrait</strong> être fait à la date considérée (d'après la courbe de référence)</td></tr>
      <tr><td>EV</td><td>Valeur acquise (<em>Earned Value</em>)</td><td>coût budgété du travail <strong>réellement</strong> fait à la date considérée — quel que soit ce qu'il a réellement coûté</td></tr>
      <tr><td>AC</td><td>Coût réel (<em>Actual Cost</em>)</td><td>coût réellement dépensé pour le travail réellement fait à la date considérée</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Pourquoi trois grandeurs, et pas deux ?</span>
      Comparer seulement le <strong>coût réel dépensé</strong> (AC) au <strong>budget prévu</strong> (PV) — ce que ferait un suivi budgétaire naïf — ne dit rien de l'<strong>avancement réel</strong> du travail : un projet peut très bien avoir dépensé exactement le budget prévu à une date donnée tout en étant, en réalité, très en retard sur le travail effectivement accompli (ou l'inverse). C'est précisément pour lever cette ambiguïté que l'EVM introduit une troisième grandeur, la <strong>valeur acquise</strong> (EV) : elle mesure ce qui a été réellement <strong>produit</strong>, valorisé au coût budgété — indépendamment de ce que cela a réellement coûté.
    </div>

    <h3>3. Écarts et indices de performance</h3>
    <p>À partir de ces trois grandeurs, on calcule deux <strong>écarts</strong> (en valeur absolue, unité monétaire) et deux <strong>indices</strong> (sans dimension, faciles à comparer d'un projet à l'autre) :</p>
    <div class="formula-box">$$CV = EV - AC \\qquad SV = EV - PV \\qquad CPI = \\frac{EV}{AC} \\qquad SPI = \\frac{EV}{PV}$$</div>
    <table class="mini-table">
      <tr><th>Indicateur</th><th>Valeur &gt; référence (0 ou 1)</th><th>Valeur &lt; référence</th></tr>
      <tr><td>CV (écart de coût)</td><td>sous le budget (favorable)</td><td>dépassement de budget (défavorable)</td></tr>
      <tr><td>SV (écart de délai)</td><td>en avance sur le planning</td><td>en retard sur le planning</td></tr>
      <tr><td>CPI (indice de coût)</td><td>&gt; 1 : chaque euro dépensé produit plus d'1 euro de valeur (efficient)</td><td>&lt; 1 : dérive budgétaire</td></tr>
      <tr><td>SPI (indice de délai)</td><td>&gt; 1 : le travail avance plus vite que prévu</td><td>&lt; 1 : retard sur le planning</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à mi-parcours d'un projet, le budget prévu à cette date (PV) est de 50 000 €. Le travail réellement accompli, valorisé au coût budgété (EV), est estimé à 40 000 €. Le coût réellement dépensé (AC) s'élève à 48 000 €. Calculer CV, SV, CPI et SPI, et interpréter la situation du projet.</p>
      <p><strong>Solution :</strong> $CV = EV-AC = 40\\,000-48\\,000 = -8\\,000$ € (dépassement de budget). $SV=EV-PV=40\\,000-50\\,000=-10\\,000$ € (retard sur le planning). $CPI=EV/AC=40\\,000/48\\,000\\approx0{,}83$ (chaque euro dépensé ne produit que 0,83 € de valeur : dérive budgétaire significative). $SPI=EV/PV=40\\,000/50\\,000=0{,}80$ (le projet n'avance qu'à 80% du rythme prévu).</p>
      <p class="example-answer">Réponse : le projet est simultanément <strong>en retard</strong> (SPI=0,80) et <strong>en dépassement de budget</strong> (CPI≈0,83) — une situation qui appelle une action corrective urgente, typiquement en phase de pilotage (chapitre 8).</p>
    </div>

    <h3>4. Anticiper le coût final et le délai final</h3>
    <p>Ces indices permettent d'<strong>extrapoler</strong>, dès qu'un tiers ou une moitié du projet est réalisé, une estimation du coût final probable — l'<strong>estimation à terminaison</strong> (<em>Estimate at Completion</em>, EAC), sous l'hypothèse (raisonnable en première approximation) que la performance de coût observée jusqu'ici se maintiendra :</p>
    <div class="formula-box">$$EAC = \\frac{\\text{Budget total prévu}}{CPI}$$</div>
    <p>Dans l'exemple précédent, pour un budget total prévu de 100 000 €, l'estimation à terminaison serait $EAC = 100\\,000/0{,}83\\approx120\\,500$ €, soit un dépassement anticipé d'environ 20% par rapport au budget initial — une alerte précoce et quantifiée, bien plus utile pour la prise de décision qu'un simple constat qualitatif de « retard » ou de « dépassement ».</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>PV = ce qui devrait être fait (budget) ; EV = ce qui est réellement fait (valorisé au budget) ; AC = ce qui a réellement été dépensé</li>
        <li>CV = EV−AC (écart de coût) ; SV = EV−PV (écart de délai) ; valeurs négatives = défavorable</li>
        <li>CPI = EV/AC et SPI = EV/PV : indices &gt;1 favorables, &lt;1 défavorables</li>
        <li>EAC = Budget total / CPI : extrapolation du coût final probable si la performance de coût actuelle se maintient</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Comparer directement AC à PV pour juger de la santé du projet — sans EV, cette comparaison ne dit rien sur l'avancement réel du travail</li>
        <li>Confondre CV/SV (écarts en valeur absolue, unité monétaire) avec CPI/SPI (indices sans dimension) — les deux sont complémentaires mais ne se comparent pas de la même façon</li>
        <li>Interpréter un CPI ou un SPI proche de 1 comme automatiquement rassurant sans regarder son évolution dans le temps — une dérive progressive peut être masquée par une moyenne encore acceptable en début de projet</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — valeur acquise (EVM)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Renseigne PV, EV et AC (même unité monétaire) pour calculer les écarts et indices de performance du projet.</p>
      <div class="sim-controls">
        <label>PV : <input type="number" id="evmPV" value="50000" step="1000" style="width:90px;" oninput="updateEVM()"></label>
        <label>EV : <input type="number" id="evmEV" value="40000" step="1000" style="width:90px;" oninput="updateEVM()"></label>
        <label>AC : <input type="number" id="evmAC" value="48000" step="1000" style="width:90px;" oninput="updateEVM()"></label>
        <div class="sim-readout" id="evmReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La valeur acquise (EV) mesure :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan6e1" value="wrong">le montant réellement dépensé pour le projet</label>
          <label class="option"><input type="radio" name="plan6e1" value="right">le coût budgété du travail réellement accompli, quel qu'ait été son coût réel</label>
          <label class="option"><input type="radio" name="plan6e1" value="wrong">le budget total initial du projet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan6e1','plan6fb1','Correct — EV valorise le travail RÉELLEMENT accompli au coût BUDGÉTÉ (pas au coût réel) : c\\'est cette distinction qui permet de séparer suivi de délai et suivi de coût.','AC mesure la dépense réelle ; EV mesure autre chose : l\\'avancement, valorisé au budget.')">Vérifier</button>
        <div class="feedback" id="plan6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un CPI (indice de performance des coûts) de 0,75 signifie que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan6e2" value="wrong">le projet est en avance de 25% sur son planning</label>
          <label class="option"><input type="radio" name="plan6e2" value="right">chaque euro dépensé ne produit que 0,75 € de valeur : dérive budgétaire</label>
          <label class="option"><input type="radio" name="plan6e2" value="wrong">75% du budget total a été dépensé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan6e2','plan6fb2','Correct — CPI = EV/AC : un CPI de 0,75 signifie que la valeur produite (EV) ne représente que 75% de l\\'argent dépensé (AC), donc une dérive budgétaire défavorable.','Relis la définition de CPI = EV/AC et le tableau d\\'interprétation.')">Vérifier</button>
        <div class="feedback" id="plan6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'estimation à terminaison EAC = Budget total / CPI permet de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan6e3" value="wrong">calculer le budget initial du projet</label>
          <label class="option"><input type="radio" name="plan6e3" value="right">extrapoler le coût final probable si la performance de coût actuelle se maintient</label>
          <label class="option"><input type="radio" name="plan6e3" value="wrong">calculer la date de fin prévue du projet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan6e3','plan6fb3','Correct — l\\'EAC extrapole, à partir de la performance de coût observée (CPI), le coût final probable du projet si cette tendance se maintient jusqu\\'à la fin.','Relis la section 4 : cette formule sert à ANTICIPER, pas à calculer une donnée déjà connue.')">Vérifier</button>
        <div class="feedback" id="plan6fb3"></div>
      </div>
    </div>
  `,
  init: initEVM
};

PLAN_NOVA_KB[planKey("Gestion budgétaire et valeur acquise (Earned Value Management)")] = {
  intro: "Salut, moi c'est Nova ! On étudie la méthode de la valeur acquise (EVM) pour suivre budget et délai ensemble. Demande-moi la différence entre PV, EV et AC, ou un indice sur un exercice.",
  rules: [
    { test:/pv|planned value|valeur planifi/i, replies:["PV (Planned Value) : le coût budgété du travail qui DEVRAIT être fait à la date considérée, d'après le planning initial."] },
    { test:/\bev\b|earned value|valeur acquise/i, replies:["EV (Earned Value) : le coût BUDGÉTÉ du travail RÉELLEMENT fait — c'est la grandeur clé de l'EVM, car elle sépare avancement réel et argent dépensé."] },
    { test:/\bac\b|actual cost|co[uû]t r[ée]el/i, replies:["AC (Actual Cost) : ce qui a réellement été dépensé pour le travail réellement fait. À ne pas confondre avec EV !"] },
    { test:/cpi|spi|indice de performance/i, replies:["CPI = EV/AC (performance de coût) ; SPI = EV/PV (performance de délai). >1 = favorable, <1 = défavorable. Ce sont des indices sans dimension, comparables entre projets."] },
    { test:/eac|estimation.*terminaison/i, replies:["EAC = Budget total / CPI : extrapole le coût final probable si la performance de coût observée se maintient jusqu'à la fin du projet."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : ne confonds pas EV avec AC.","Indice niveau 2 : AC = dépense réelle. EV = quelque chose de différent.","Indice niveau 3 : EV = le travail réellement fait, valorisé au coût BUDGÉTÉ (pas réel)."] }
  ]
};
/* =========================== CHAPITRE 7 =========================== */
PLAN_CHAPTERS[planKey("Gestion des risques du projet")] = {
  objectives: [
    "Définir un risque projet et le distinguer d'un problème déjà avéré",
    "Construire une matrice probabilité-impact pour hiérarchiser les risques identifiés",
    "Présenter les quatre grandes stratégies de réponse aux risques (éviter, réduire, transférer, accepter)",
    "Tenir à jour un registre des risques tout au long du projet"
  ],
  prereqs: ["Gestion budgétaire et valeur acquise (Earned Value Management)"],
  bodyHtml: `
    <p>Aucun projet ne se déroule jamais exactement comme prévu : un réactif clé peut être en rupture de stock, un appareil peut tomber en panne, un résultat expérimental peut invalider une hypothèse de départ. La <strong>gestion des risques</strong> ne cherche pas à éliminer cette incertitude — impossible — mais à l'<strong>anticiper</strong> méthodiquement pour en réduire l'impact lorsqu'elle se matérialise.</p>

    <h3>1. Qu'est-ce qu'un risque projet ?</h3>
    <p>Un <strong>risque</strong> est un événement <strong>incertain</strong> (il peut se produire ou non) qui, s'il se produit, a un <strong>effet</strong> — positif ou négatif — sur au moins un objectif du projet (délai, coût, qualité, périmètre). Cette définition mérite d'être précisée sur deux points souvent mal compris : un risque n'est <strong>pas encore survenu</strong> (à la différence d'un problème, déjà avéré, qui relève de la gestion de crise et non de la gestion des risques) ; et un risque peut, bien que ce soit moins intuitif, être <strong>positif</strong> — une <strong>opportunité</strong> (par exemple, la découverte fortuite d'une voie de synthèse plus rapide que prévu), même si la gestion des risques se concentre en pratique très majoritairement sur les risques négatifs (menaces).</p>

    <h3>2. Identifier et hiérarchiser les risques : la matrice probabilité-impact</h3>
    <p>Après une phase d'<strong>identification</strong> des risques (brainstorming, retour d'expérience de projets antérieurs, avis d'experts), chaque risque est évalué selon deux critères indépendants : sa <strong>probabilité</strong> d'occurrence, et son <strong>impact</strong> sur le projet s'il se réalise. Le produit (ou le croisement qualitatif) de ces deux critères permet de construire une <strong>matrice probabilité-impact</strong>, qui hiérarchise visuellement les risques et oriente les efforts de traitement vers les plus critiques :</p>
    <table class="mini-table">
      <tr><th></th><th>Impact faible</th><th>Impact modéré</th><th>Impact fort</th></tr>
      <tr><td><strong>Probabilité forte</strong></td><td>Risque modéré</td><td>Risque élevé</td><td>Risque critique</td></tr>
      <tr><td><strong>Probabilité modérée</strong></td><td>Risque faible</td><td>Risque modéré</td><td>Risque élevé</td></tr>
      <tr><td><strong>Probabilité faible</strong></td><td>Risque négligeable</td><td>Risque faible</td><td>Risque modéré</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Pourquoi hiérarchiser plutôt que traiter tous les risques identiques</span>
      Les ressources (temps, budget, attention du chef de projet) disponibles pour traiter les risques sont toujours limitées. La matrice probabilité-impact permet de concentrer ces ressources sur les risques <strong>critiques</strong> (probabilité et impact élevés simultanément), tout en acceptant sciemment un suivi plus léger — voire aucun traitement actif — pour les risques négligeables. C'est un principe de <strong>priorisation rationnelle</strong>, directement transposable de la gestion de projet à de nombreux autres contextes de prise de décision scientifique ou industrielle.
    </div>

    <h3>3. Les quatre stratégies de réponse aux risques</h3>
    <table class="mini-table">
      <tr><th>Stratégie</th><th>Principe</th><th>Exemple en contexte de laboratoire</th></tr>
      <tr><td>Éviter</td><td>Modifier le projet pour éliminer complètement la cause du risque</td><td>Changer de voie de synthèse pour éviter l'usage d'un réactif dangereux à approvisionnement incertain</td></tr>
      <tr><td>Réduire (atténuer)</td><td>Diminuer la probabilité et/ou l'impact du risque, sans l'éliminer totalement</td><td>Commander un stock de sécurité du réactif critique, former une personne de secours sur une manipulation clé</td></tr>
      <tr><td>Transférer</td><td>Faire porter la conséquence du risque par un tiers</td><td>Sous-traiter une analyse complexe à un prestataire externe assurantiel plutôt que de risquer un échec en interne</td></tr>
      <tr><td>Accepter</td><td>Ne mettre en œuvre aucune action spécifique, en connaissance de cause (souvent pour les risques faibles ou négligeables)</td><td>Accepter le risque mineur d'un léger retard de livraison d'une verrerie non critique</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un projet de synthèse dépend d'un unique appareil de chromatographie, âgé et sujet à des pannes occasionnelles (probabilité modérée), dont l'indisponibilité prolongée retarderait fortement le projet (impact fort). Positionner ce risque sur la matrice probabilité-impact et proposer une stratégie de réponse adaptée.</p>
      <p><strong>Solution :</strong> avec une probabilité modérée et un impact fort, ce risque se positionne en catégorie <strong>« Risque élevé »</strong> sur la matrice. Une stratégie de <strong>réduction</strong> est particulièrement adaptée ici : programmer une maintenance préventive régulière de l'appareil (réduit la probabilité de panne), et identifier en amont un laboratoire partenaire disposant d'un appareil équivalent pour un dépannage ponctuel (réduit l'impact d'une panne si elle survient malgré tout).</p>
      <p class="example-answer">Réponse : risque élevé (probabilité modérée × impact fort) ; stratégie de réduction combinant maintenance préventive et solution de repli identifiée à l'avance.</p>
    </div>

    <h3>4. Le registre des risques : un outil vivant</h3>
    <p>Le <strong>registre des risques</strong> (<em>risk register</em>) est un document — souvent un simple tableau — qui liste tous les risques identifiés, leur évaluation (probabilité, impact), la stratégie de réponse retenue, le responsable désigné pour la surveiller, et le statut actuel du risque. Ce registre n'est pas figé lors de l'initiation du projet : il doit être <strong>revu régulièrement</strong> tout au long du projet (phase de pilotage, chapitre suivant), de nouveaux risques pouvant apparaître et d'anciens risques pouvant disparaître ou se réaliser.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un risque est un événement incertain (pas encore survenu) à effet positif (opportunité) ou négatif (menace) sur le projet</li>
        <li>Matrice probabilité-impact : hiérarchise les risques pour concentrer les ressources sur les plus critiques</li>
        <li>Quatre stratégies : éviter (éliminer la cause), réduire (atténuer probabilité/impact), transférer (à un tiers), accepter (sans action)</li>
        <li>Le registre des risques est un document vivant, revu régulièrement tout au long du projet</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre un risque (incertain, futur) avec un problème déjà avéré — ce dernier relève de la gestion de crise, pas de la gestion des risques préventive</li>
        <li>Traiter tous les risques identifiés avec la même intensité de ressources, sans hiérarchisation via la matrice probabilité-impact</li>
        <li>Considérer que « accepter » un risque signifie l'ignorer sans réflexion — c'est au contraire une décision consciente et documentée, justifiée par un faible niveau de criticité</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un risque, au sens de la gestion de projet, se définit avant tout comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan7e1" value="wrong">un problème déjà survenu qu'il faut résoudre en urgence</label>
          <label class="option"><input type="radio" name="plan7e1" value="right">un événement incertain qui, s'il se produit, affecte un objectif du projet</label>
          <label class="option"><input type="radio" name="plan7e1" value="wrong">une dépense imprévue déjà comptabilisée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan7e1','plan7fb1','Correct — un risque est par définition INCERTAIN et futur : dès qu\\'il est survenu, ce n\\'est plus un risque mais un problème, relevant de la gestion de crise.','Relis la distinction entre risque (futur, incertain) et problème (déjà avéré) en section 1.')">Vérifier</button>
        <div class="feedback" id="plan7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La stratégie de réponse consistant à sous-traiter une tâche risquée à un prestataire externe assurantiel correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan7e2" value="wrong">l'évitement</label>
          <label class="option"><input type="radio" name="plan7e2" value="right">le transfert</label>
          <label class="option"><input type="radio" name="plan7e2" value="wrong">l'acceptation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan7e2','plan7fb2','Correct — le transfert fait porter la conséquence du risque par un tiers (ici, le prestataire externe), sans l\\'éliminer ni simplement l\\'accepter en interne.','Relis le tableau des quatre stratégies de réponse aux risques en section 3.')">Vérifier</button>
        <div class="feedback" id="plan7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le registre des risques doit être :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan7e3" value="wrong">figé définitivement dès la phase d'initiation du projet</label>
          <label class="option"><input type="radio" name="plan7e3" value="right">révisé régulièrement tout au long du projet</label>
          <label class="option"><input type="radio" name="plan7e3" value="wrong">rédigé seulement à la clôture du projet, à titre de bilan</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan7e3','plan7fb3','Correct — de nouveaux risques peuvent apparaître et d\\'anciens risques évoluer ou disparaître : le registre doit donc être un document vivant, mis à jour tout au long du projet.','Relis la dernière phrase de la section 4 sur le registre des risques.')">Vérifier</button>
        <div class="feedback" id="plan7fb3"></div>
      </div>
    </div>
  `
};

PLAN_NOVA_KB[planKey("Gestion des risques du projet")] = {
  intro: "Salut, moi c'est Nova ! On aborde la gestion des risques projet. Demande-moi la différence entre un risque et un problème, les 4 stratégies de réponse, ou un indice sur un exercice.",
  rules: [
    { test:/risque.*probl[èe]me|diff[ée]rence.*risque/i, replies:["Un risque est INCERTAIN et FUTUR — il peut se produire ou non. Un problème est déjà survenu : il relève de la gestion de crise, pas de la gestion des risques préventive."] },
    { test:/matrice probabilit|hi[ée]rarchiser.*risque/i, replies:["La matrice probabilité-impact croise ces deux critères pour hiérarchiser les risques et concentrer les ressources sur les plus critiques (probabilité ET impact élevés)."] },
    { test:/[ée]viter|r[ée]duire|transf[ée]rer|accepter|4 strat[ée]gie/i, replies:["4 stratégies : Éviter (éliminer la cause), Réduire (atténuer probabilité/impact), Transférer (à un tiers, ex : sous-traitance), Accepter (aucune action, décision consciente pour un risque faible)."] },
    { test:/registre des risques|risk register/i, replies:["Le registre des risques liste chaque risque, son évaluation, la stratégie retenue, le responsable et son statut. C'est un document vivant, à réviser régulièrement, pas figé à l'initiation."] },
    { test:/opportunit[ée]|risque positif/i, replies:["Un risque peut aussi être positif (une opportunité) — mais en pratique, la gestion des risques se concentre surtout sur les risques négatifs (menaces)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à QUI porte la conséquence du risque dans ce scénario.","Indice niveau 2 : ce n'est pas l'équipe projet elle-même.","Indice niveau 3 : c'est un tiers externe (le prestataire) → stratégie de transfert."] }
  ]
};
/* =========================== CHAPITRE 8 =========================== */
PLAN_CHAPTERS[planKey("Pilotage, communication et clôture d'un projet scientifique")] = {
  objectives: [
    "Décrire les activités de la phase de suivi et de maîtrise d'un projet",
    "Construire un plan de communication adapté aux différentes parties prenantes",
    "Distinguer une action corrective d'une action préventive face à un écart constaté",
    "Structurer une clôture de projet incluant le bilan et le retour d'expérience"
  ],
  prereqs: ["Gestion des risques du projet"],
  bodyHtml: `
    <p>Ce dernier chapitre boucle le cycle de vie du projet entamé au chapitre 1 : après l'initiation et la planification (chapitres 1 à 7), il reste à <strong>piloter</strong> le projet pendant son exécution, à <strong>communiquer</strong> efficacement avec les parties prenantes, puis à le <strong>clôturer</strong> dans les règles — trois activités trop souvent négligées alors qu'elles conditionnent largement la réussite perçue d'un projet.</p>

    <h3>1. Le suivi et la maîtrise : comparer le prévu au réalisé</h3>
    <p>La phase de <strong>suivi et maîtrise</strong> mobilise directement les outils construits dans les chapitres précédents : le diagramme de Gantt et sa ligne de base (chapitre 4) pour l'avancement du planning, les indicateurs de valeur acquise (chapitre 6) pour le budget, et le registre des risques (chapitre 7) pour les menaces en évolution. Le principe général est la <strong>boucle de contrôle</strong> : mesurer périodiquement l'état réel du projet, le comparer à l'état prévu, analyser les écarts significatifs, puis décider d'une action si nécessaire.</p>

    <h3>2. Action corrective ou action préventive ?</h3>
    <p>Face à un écart constaté (retard, dépassement budgétaire, risque en train de se matérialiser), deux types de réponse se distinguent : une <strong>action corrective</strong> vise à ramener la performance déjà dégradée du projet en cohérence avec le plan initial (par exemple, mobiliser une ressource supplémentaire sur une tâche déjà en retard) ; une <strong>action préventive</strong> vise, elle, à réduire la probabilité qu'un écart <strong>futur</strong> similaire ne se reproduise (par exemple, renforcer la fréquence de suivi d'une tâche jugée à risque après un premier incident). Les deux types d'action doivent être documentés et, si nécessaire, faire l'objet d'une mise à jour formelle du plan de projet (planning, budget, registre des risques).</p>

    <h3>3. Construire un plan de communication</h3>
    <p>La communication n'est pas une activité annexe du pilotage : de nombreuses études en gestion de projet identifient une communication défaillante comme l'une des toutes premières causes d'échec de projet. Un <strong>plan de communication</strong> précise, pour chaque partie prenante identifiée (chapitre 1), l'information à transmettre, sous quelle forme, à quelle fréquence, et par quel canal :</p>
    <table class="mini-table">
      <tr><th>Partie prenante</th><th>Information</th><th>Fréquence / canal</th></tr>
      <tr><td>Commanditaire (ex : directeur de laboratoire)</td><td>Avancement synthétique, écarts majeurs, décisions à prendre</td><td>Réunion mensuelle + rapport synthétique</td></tr>
      <tr><td>Équipe projet</td><td>Détail des tâches, priorités de la semaine, blocages</td><td>Réunion hebdomadaire courte</td></tr>
      <tr><td>Autorités de tutelle / financeurs</td><td>Jalons contractuels, indicateurs clés, conformité réglementaire</td><td>Rapport formel aux échéances contractuelles</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Adapter le niveau de détail à chaque destinataire</span>
      Une erreur fréquente consiste à diffuser la <strong>même</strong> information, au même niveau de détail, à toutes les parties prenantes — un commanditaire surchargé de détails techniques risque de perdre de vue les décisions réellement importantes, tandis qu'une équipe technique privée de détails opérationnels ne peut pas travailler efficacement. Le plan de communication doit donc <strong>calibrer</strong>, pour chaque destinataire, le niveau de détail, la fréquence et le format les plus utiles à son rôle dans le projet — un principe qui rejoint directement les compétences travaillées dans le cours de rédaction de rapport scientifique.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> lors d'un point d'avancement, le SPI calculé (chapitre 6) est de 0,70 depuis deux semaines consécutives sur une tâche non critique (chapitre 3), dont la marge disponible est de 5 jours. Une seule semaine de retard supplémentaire au rythme actuel consommerait environ 3 jours de plus de marge. Faut-il déclencher une action corrective immédiate ?</p>
      <p><strong>Solution :</strong> la tâche dispose encore d'une marge suffisante (5 jours) pour absorber le rythme de retard actuel sur au moins une à deux semaines supplémentaires sans affecter la date de fin du projet. Une action corrective <strong>immédiate et coûteuse</strong> (mobilisation de ressources supplémentaires) n'est donc pas indispensable dans l'urgence. En revanche, une action <strong>préventive</strong> est justifiée : surveiller cette tâche de plus près (passer d'un suivi hebdomadaire à un suivi plus rapproché) et préparer, sans l'activer immédiatement, un plan de contingence si la marge venait à se réduire dangereusement.</p>
      <p class="example-answer">Réponse : pas d'action corrective urgente compte tenu de la marge disponible, mais une action préventive de surveillance rapprochée est justifiée — un bon exemple de dosage proportionné de la réponse au niveau réel de risque.</p>
    </div>

    <h3>4. La clôture du projet</h3>
    <p>La <strong>clôture</strong> formelle du projet, phase souvent négligée sous la pression de nouveaux projets déjà en cours, comporte plusieurs éléments essentiels : la <strong>vérification et acceptation formelle</strong> des livrables par le commanditaire, l'<strong>archivage</strong> structuré de la documentation du projet, la <strong>libération</strong> des ressources (personnel, équipements) vers d'autres projets, et surtout, le <strong>retour d'expérience</strong> (souvent appelé <em>lessons learned</em>) — une analyse collective, documentée et transmissible, de ce qui a bien fonctionné et de ce qui pourrait être amélioré pour de futurs projets similaires.</p>
    <div class="key-point">
      <span class="eyebrow">Le retour d'expérience : un investissement pour l'organisation, pas pour le projet lui-même</span>
      Le retour d'expérience ne profite pas directement au projet qui vient de s'achever — il profite aux <strong>projets futurs</strong>, souvent menés par d'autres personnes. C'est précisément pour cette raison qu'il est si souvent négligé (aucun bénéfice immédiat perceptible pour l'équipe qui le rédige) alors qu'il constitue, à l'échelle d'un laboratoire ou d'une organisation dans la durée, l'un des leviers d'amélioration continue les plus rentables de toute la gestion de projet.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Suivi et maîtrise : boucle de contrôle mesurer → comparer au plan → analyser les écarts → décider d'une action</li>
        <li>Action corrective (répare un écart déjà survenu) vs action préventive (réduit la probabilité d'un écart futur)</li>
        <li>Un plan de communication calibre, pour chaque partie prenante, le contenu, la fréquence et le canal les plus adaptés à son rôle</li>
        <li>La clôture comprend : acceptation des livrables, archivage, libération des ressources, retour d'expérience</li>
        <li>Le retour d'expérience profite aux projets futurs, pas au projet clos lui-même — d'où l'importance de ne pas le négliger</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Réagir de façon disproportionnée (action corrective coûteuse et urgente) à un écart mineur sur une tâche disposant encore d'une marge confortable</li>
        <li>Diffuser la même information, au même niveau de détail, à toutes les parties prenantes sans tenir compte de leurs besoins réels respectifs</li>
        <li>Négliger la phase de clôture, notamment le retour d'expérience, sous prétexte que le projet est déjà terminé et que l'équipe est mobilisée sur autre chose</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une action visant à réduire la probabilité qu'un écart similaire à celui déjà observé ne se reproduise à l'avenir est appelée :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan8e1" value="wrong">une action corrective</label>
          <label class="option"><input type="radio" name="plan8e1" value="right">une action préventive</label>
          <label class="option"><input type="radio" name="plan8e1" value="wrong">une action de clôture</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan8e1','plan8fb1','Correct — l\\'action préventive vise le FUTUR (éviter qu\\'un écart similaire ne se reproduise), contrairement à l\\'action corrective qui répare un écart déjà survenu.','Relis la distinction entre action corrective et préventive en section 2.')">Vérifier</button>
        <div class="feedback" id="plan8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un plan de communication efficace consiste à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan8e2" value="wrong">envoyer la même information détaillée à toutes les parties prenantes, par souci d'équité</label>
          <label class="option"><input type="radio" name="plan8e2" value="right">calibrer le contenu, la fréquence et le canal selon les besoins réels de chaque partie prenante</label>
          <label class="option"><input type="radio" name="plan8e2" value="wrong">limiter la communication au strict minimum légal</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan8e2','plan8fb2','Correct — chaque partie prenante a des besoins différents : un commanditaire a besoin de synthèse et de décisions, une équipe technique a besoin de détails opérationnels.','Relis l\\'encadré sur l\\'adaptation du niveau de détail à chaque destinataire.')">Vérifier</button>
        <div class="feedback" id="plan8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le retour d'expérience (lessons learned), réalisé en phase de clôture, profite principalement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="plan8e3" value="wrong">au projet qui vient de s'achever, en améliorant ses résultats a posteriori</label>
          <label class="option"><input type="radio" name="plan8e3" value="right">aux projets futurs de l'organisation, souvent menés par d'autres personnes</label>
          <label class="option"><input type="radio" name="plan8e3" value="wrong">uniquement au chef de projet, pour son évaluation personnelle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('plan8e3','plan8fb3','Correct — c\\'est justement parce que le bénéfice n\\'est pas immédiat pour l\\'équipe qui le rédige que le retour d\\'expérience est si souvent négligé, alors qu\\'il est précieux pour l\\'organisation dans la durée.','Relis l\\'encadré final sur le retour d\\'expérience comme investissement pour l\\'organisation.')">Vérifier</button>
        <div class="feedback" id="plan8fb3"></div>
      </div>
    </div>
  `
};

PLAN_NOVA_KB[planKey("Pilotage, communication et clôture d'un projet scientifique")] = {
  intro: "Salut, moi c'est Nova ! On termine ce cours par le pilotage, la communication et la clôture de projet. Demande-moi la différence entre action corrective et préventive, ou un indice sur un exercice.",
  rules: [
    { test:/action corrective|action pr[ée]ventive/i, replies:["Action corrective : répare un écart DÉJÀ survenu, ramène le projet en cohérence avec le plan. Action préventive : réduit la probabilité qu'un écart FUTUR similaire ne se reproduise."] },
    { test:/plan de communication/i, replies:["Un bon plan de communication calibre, pour chaque partie prenante, le contenu, la fréquence et le canal les plus utiles à son rôle : pas la même info, au même format, pour tout le monde."] },
    { test:/cl[ôo]ture|lessons learned|retour d.exp[ée]rience/i, replies:["La clôture comprend : acceptation des livrables, archivage, libération des ressources, et le retour d'expérience — qui profite surtout aux projets FUTURS, pas au projet qui s'achève."] },
    { test:/boucle de contr[ôo]le|suivi et ma[îi]trise/i, replies:["La boucle de contrôle : mesurer l'état réel → comparer au plan (Gantt, EVM, registre des risques) → analyser les écarts significatifs → décider d'une action si nécessaire."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à QUI bénéficie réellement du retour d'expérience.","Indice niveau 2 : ce n'est pas le projet qui vient de finir.","Indice niveau 3 : ce sont les projets futurs, souvent menés par d'autres équipes."] }
  ]
};

/* fusionne le module Planification et gestion dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, PLAN_CHAPTERS);
Object.assign(NOVA_KB, PLAN_NOVA_KB);