/* =====================================================================
   CHUNK « chq » — registre CHQ_CHAPTERS / CHQ_NOVA_KB
   Matière(s) : Chimie|Introduction à la chimie quantique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CHQ_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE INTRODUCTION À LA CHIMIE QUANTIQUE — Chimie L3 (Physique Fondamentale
   et Chimie Fondamentale)
   (contenu rédigé selon le programme standard de chimie quantique de L3 dans
   les universités francophones : postulats de la mécanique quantique appliqués
   à la chimie, atome d'hydrogène, atomes polyélectroniques et approximation
   orbitale, méthode des perturbations, ion moléculaire H2+ et théorie LCAO,
   diagrammes d'orbitales moléculaires des diatomiques, méthode de Hückel pour
   les systèmes π conjugués, symétrie moléculaire — conforme aux maquettes LMD
   et aux cours de référence (A. Jolly, UPEC ; P. Chaquin, LCT-Sorbonne Université ;
   C. Leforestier, Introduction à la chimie quantique, Dunod). Ce module
   prolonge directement le cours de L2 Physique « Introduction à la mécanique
   quantique » (postulats, équation de Schrödinger, systèmes modèles) en
   l'appliquant spécifiquement aux atomes et aux molécules.
   Structure identique aux autres modules : CHQ_CHAPTERS / CHQ_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const CHQ_MATIERE = 'Introduction à la chimie quantique';
function chqKey(chapterTitle){ return `Chimie|${CHQ_MATIERE}|${chapterTitle}`; }
const CHQ_CHAPTERS = {};
const CHQ_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur des règles de Slater (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateSlater(){
  const Z = parseFloat(document.getElementById('slaterZ').value) || 1;
  const n = parseInt(document.getElementById('slaterN').value) || 1;
  const same = parseInt(document.getElementById('slaterSame').value) || 0;
  const inner1 = parseInt(document.getElementById('slaterInner1').value) || 0;
  const inner2 = parseInt(document.getElementById('slaterInner2').value) || 0;
  const sigma = 0.35*same + 0.85*inner1 + 1.00*inner2;
  const Zeff = Z - sigma;
  const nEffTable = {1:1, 2:2, 3:3, 4:3.7, 5:4, 6:4.2};
  const nEff = nEffTable[n] || n;
  const E = -13.6 * (Zeff*Zeff) / (nEff*nEff);
  const out = document.getElementById('slaterReadout');
  out.innerHTML = `Constante d'écran : σ = ${sigma.toFixed(2)}<br>` +
    `Charge nucléaire effective : Z<sub>eff</sub> = Z − σ = ${Z} − ${sigma.toFixed(2)} = <strong>${Zeff.toFixed(2)}</strong><br>` +
    `Énergie orbitalaire estimée (n* = ${nEff}) : E ≈ −13,6 × Z<sub>eff</sub>²/n*² ≈ <strong>${E.toFixed(1)} eV</strong>`;
}
function initSlater(){ updateSlater(); }

/* =========================== CHAPITRE 1 — Postulats de la mécanique quantique et opérateurs en chimie =========================== */
CHQ_CHAPTERS[chqKey("Postulats de la mécanique quantique et opérateurs en chimie")] = {
  objectives: [
    "Justifier l'approximation de Born-Oppenheimer et son rôle central en chimie quantique",
    "Énoncer les postulats de la mécanique quantique utiles à la description des atomes et des molécules",
    "Associer à chaque observable physique (position, quantité de mouvement, énergie) l'opérateur correspondant",
    "Expliquer pourquoi les opérateurs associés aux observables physiques doivent être hermitiques",
    "Écrire l'équation de Schrödinger stationnaire Ĥψ = Eψ comme point de départ de toute la chimie quantique"
  ],
  prereqs: ["La fonction d'onde et l'équation de Schrödinger (L2 Physique)", "Opérateurs, observables et postulats de la mesure (L2 Physique)"],
  bodyHtml: `
    <p>Le cours de L2 « Introduction à la mécanique quantique » a posé les bases générales de la théorie : fonction d'onde, équation de Schrödinger, opérateurs, postulats de la mesure. La <strong>chimie quantique</strong> applique ces outils à un objectif précis : comprendre et prédire la structure électronique des atomes et des molécules — la répartition des électrons, les niveaux d'énergie, la nature de la liaison chimique — à partir des premiers principes de la mécanique quantique, sans aucune donnée expérimentale ajustée <em>a priori</em>.</p>

    <h3>1. L'approximation de Born-Oppenheimer</h3>
    <p>Un atome ou une molécule est un système de noyaux et d'électrons en interaction mutuelle : le problème exact est insoluble analytiquement dès que le nombre de particules dépasse deux corps. La première simplification, indispensable, est l'<strong>approximation de Born-Oppenheimer</strong> (1927) : la masse d'un noyau (proton, neutron) est environ 1836 fois celle d'un électron, si bien que les noyaux se déplacent extrêmement lentement par rapport aux électrons. On peut donc découpler les deux mouvements : à chaque géométrie nucléaire figée, on résout le problème électronique seul ; les noyaux se déplacent ensuite sur la surface d'énergie potentielle ainsi obtenue.</p>
    <div class="key-point">
      <span class="eyebrow">Ce que permet Born-Oppenheimer</span>
      Grâce à cette approximation, la chimie quantique devient, à chaque distance internucléaire fixée, un problème purement <strong>électronique</strong> : trouver la fonction d'onde et l'énergie des électrons se déplaçant dans le champ électrostatique de noyaux immobiles. C'est cette approximation, quasiment toujours excellente, qui autorise à parler de « géométrie moléculaire », de « longueur de liaison » ou de « surface d'énergie potentielle » — des notions qui n'auraient aucun sens si l'on traitait noyaux et électrons rigoureusement sur le même plan quantique.
    </div>

    <h3>2. Premier postulat : l'état quantique</h3>
    <p>L'état d'un système quantique (un électron, un atome, une molécule) est entièrement décrit par une <strong>fonction d'onde</strong> $\\Psi$, fonction des coordonnées des particules (et du temps). Pour un état stationnaire — celui qui nous intéresse le plus en chimie, car il correspond aux niveaux d'énergie permis — $\\Psi$ obéit à l'équation de Schrödinger indépendante du temps déjà rencontrée en L2. Le carré du module $|\\Psi|^2$ donne la densité de probabilité de présence (interprétation de Born) : c'est cette densité électronique qui, en chimie, dessine la forme des orbitales, des liaisons et des molécules.</p>

    <h3>3. Deuxième postulat : observables et opérateurs</h3>
    <p>À toute grandeur physique mesurable — une <strong>observable</strong> — est associé un <strong>opérateur linéaire</strong> agissant sur la fonction d'onde. Le tableau ci-dessous rappelle les opérateurs des observables les plus utiles en chimie quantique.</p>
    <table class="mini-table">
      <tr><th>Observable</th><th>Opérateur (1D, coordonnée x)</th><th>Rôle en chimie</th></tr>
      <tr><td>Position</td><td>$\\hat{x} = x\\times$</td><td>Densité électronique, moment dipolaire</td></tr>
      <tr><td>Quantité de mouvement</td><td>$\\hat{p}_x = -i\\hbar\\dfrac{\\partial}{\\partial x}$</td><td>Énergie cinétique</td></tr>
      <tr><td>Énergie cinétique</td><td>$\\hat{T} = -\\dfrac{\\hbar^2}{2m}\\nabla^2$</td><td>Terme cinétique du hamiltonien</td></tr>
      <tr><td>Énergie potentielle</td><td>$\\hat{V} = V(x,y,z)\\times$</td><td>Attraction noyau-électron, répulsion électron-électron</td></tr>
      <tr><td>Énergie totale</td><td>$\\hat{H} = \\hat{T} + \\hat{V}$ (hamiltonien)</td><td>Détermine tous les niveaux d'énergie du système</td></tr>
    </table>
    <p>Le <strong>hamiltonien</strong> $\\hat{H}$ est de très loin l'opérateur central de toute la chimie quantique : construire le hamiltonien d'un système (atome, molécule) puis résoudre $\\hat{H}\\psi = E\\psi$ est, formellement, tout le programme de cette discipline — la difficulté résidant uniquement dans la complexité croissante de cette résolution lorsque le nombre de particules augmente.</p>

    <h3>4. Hermiticité et réalité des valeurs propres</h3>
    <p>Pour qu'une mesure physique donne toujours un résultat réel (on ne mesure jamais une énergie ou une position complexe !), l'opérateur associé doit être <strong>hermitique</strong> : $\\int \\psi_i^* \\hat{A} \\psi_j\\, d\\tau = \\left(\\int \\psi_j^* \\hat{A} \\psi_i\\, d\\tau\\right)^*$. Deux conséquences essentielles découlent de cette propriété mathématique et gouvernent toute la suite du cours :</p>
    <ul>
      <li>Les <strong>valeurs propres</strong> d'un opérateur hermitique — les seuls résultats possibles d'une mesure — sont nécessairement <strong>réelles</strong> ;</li>
      <li>Les <strong>fonctions propres</strong> associées à des valeurs propres différentes sont <strong>orthogonales</strong> entre elles : $\\int \\psi_i^* \\psi_j\\, d\\tau = 0$ si $i\\neq j$. Cette orthogonalité, omniprésente en chimie quantique (orbitales atomiques, orbitales moléculaires), simplifie considérablement les calculs d'intégrales.</li>
    </ul>

    <h3>5. Troisième postulat : mesure et valeurs propres</h3>
    <p>Lorsqu'on mesure l'observable associée à l'opérateur $\\hat{A}$, le seul résultat possible est l'une des <strong>valeurs propres</strong> $a_i$ de $\\hat{A}$, définies par $\\hat{A}\\psi_i = a_i\\psi_i$. Si le système est déjà dans un état propre $\\psi_i$, la mesure donne $a_i$ avec certitude. En chimie, les niveaux d'énergie observés en spectroscopie (raies d'absorption ou d'émission) sont exactement les valeurs propres du hamiltonien $\\hat{H}$ : c'est ce lien direct entre théorie et expérience qui permet de tester et de valider les modèles de chimie quantique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour une particule dans un puits de potentiel infini de largeur $a$ (revu en L2), les fonctions propres du hamiltonien sont $\\psi_n(x) = \\sqrt{2/a}\\sin(n\\pi x/a)$. Sans calculer explicitement l'intégrale, justifier pourquoi $\\int_0^a \\psi_1(x)\\psi_2(x)\\, dx = 0$.</p>
      <p><strong>Solution :</strong> $\\psi_1$ et $\\psi_2$ sont deux fonctions propres du hamiltonien (opérateur hermitique) associées à des valeurs propres différentes ($E_1 \\neq E_2$, puisque $E_n \\propto n^2$). D'après la propriété générale d'orthogonalité des états propres d'un opérateur hermitique, leur produit scalaire est nécessairement nul — sans qu'il soit besoin de calculer l'intégrale trigonométrique.</p>
      <p class="example-answer">Réponse : l'intégrale est nulle par orthogonalité des états propres d'un opérateur hermitique associés à des valeurs propres distinctes.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <circle cx="30" cy="35" r="4" fill="#122043"/>
          <circle cx="90" cy="35" r="4" fill="#122043"/>
          <ellipse cx="60" cy="35" rx="45" ry="20" fill="none" stroke="#3D6BF0" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="24" y="20" font-size="6">Noyau A</text>
          <text x="80" y="20" font-size="6">Noyau B</text>
          <text x="42" y="60" font-size="6" fill="#3D6BF0">nuage électronique</text>
        </svg>
        <span>Born-Oppenheimer : à géométrie nucléaire fixée, on résout le problème du mouvement des électrons seuls.</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <line x1="10" y1="60" x2="110" y2="60" stroke="#122043" stroke-width="1"/>
          <line x1="10" y1="60" x2="10" y2="6" stroke="#122043" stroke-width="1"/>
          <line x1="15" y1="50" x2="105" y2="50" stroke="#F0555C" stroke-width="1.4"/>
          <line x1="15" y1="30" x2="105" y2="30" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="15" y1="12" x2="105" y2="12" stroke="#E8A93A" stroke-width="1.4"/>
          <text x="70" y="48" font-size="6">E₁ (fondamental)</text>
          <text x="70" y="28" font-size="6">E₂</text>
          <text x="70" y="10" font-size="6">E₃</text>
        </svg>
        <span>Les niveaux d'énergie observés en spectroscopie sont les valeurs propres du hamiltonien Ĥ.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Born-Oppenheimer : noyaux beaucoup plus lourds que les électrons → on fige leur position pour résoudre le problème électronique seul</li>
        <li>Chaque observable physique correspond à un opérateur linéaire ; le hamiltonien Ĥ = T̂ + V̂ donne l'énergie totale</li>
        <li>Les opérateurs représentant des observables physiques sont hermitiques : valeurs propres réelles, fonctions propres orthogonales</li>
        <li>Résoudre Ĥψ = Eψ est, formellement, tout le programme de la chimie quantique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que Born-Oppenheimer signifie que les noyaux ne bougent jamais — ils se déplacent, mais beaucoup plus lentement que les électrons, ce qui justifie de les traiter séparément à chaque géométrie</li>
        <li>Oublier que c'est l'hermiticité de l'opérateur, et non une propriété de la fonction d'onde, qui garantit la réalité des valeurs propres mesurées</li>
        <li>Confondre l'opérateur (outil mathématique agissant sur une fonction) et l'observable (la grandeur physique elle-même)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'approximation de Born-Oppenheimer est justifiée par le fait que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq1e1" value="wrong"> les électrons et les noyaux ont des masses comparables</label>
          <label class="option"><input type="radio" name="chq1e1" value="right"> les noyaux, beaucoup plus lourds, se déplacent beaucoup plus lentement que les électrons</label>
          <label class="option"><input type="radio" name="chq1e1" value="wrong"> l'énergie potentielle électron-noyau est négligeable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq1e1','chq1fb1','Correct — un noyau est environ 1836 fois plus lourd qu\\'un électron (pour l\\'hydrogène) : à cette échelle de masse, les noyaux paraissent quasiment immobiles aux électrons.','Compare les masses respectives d\\'un proton et d\\'un électron.')">Vérifier</button>
        <div class="feedback" id="chq1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un opérateur associé à une observable physique doit être hermitique afin que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq1e2" value="wrong"> ses fonctions propres soient toutes identiques</label>
          <label class="option"><input type="radio" name="chq1e2" value="right"> ses valeurs propres, seuls résultats possibles d'une mesure, soient réelles</label>
          <label class="option"><input type="radio" name="chq1e2" value="wrong"> le système soit obligatoirement dans son état fondamental</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq1e2','chq1fb2','Correct — l\\'hermiticité garantit des valeurs propres réelles, condition indispensable puisqu\\'une mesure physique (énergie, position...) ne peut jamais donner un résultat complexe.','Repense à ce qu\\'on mesure réellement en laboratoire : un nombre réel ou complexe ?')">Vérifier</button>
        <div class="feedback" id="chq1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Deux fonctions propres d'un même opérateur hermitique, associées à des valeurs propres différentes, sont nécessairement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq1e3" value="wrong"> égales à une constante près</label>
          <label class="option"><input type="radio" name="chq1e3" value="right"> orthogonales entre elles</label>
          <label class="option"><input type="radio" name="chq1e3" value="wrong"> toujours réelles et positives</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq1e3','chq1fb3','Correct — c\\'est une propriété générale des opérateurs hermitiques : deux états propres de valeurs propres distinctes ont un produit scalaire nul.','C\\'est la même propriété qui a permis, dans l\\'exemple corrigé, de conclure sans calculer d\\'intégrale.')">Vérifier</button>
        <div class="feedback" id="chq1fb3"></div>
      </div>
    </div>
  `
};

CHQ_NOVA_KB[chqKey("Postulats de la mécanique quantique et opérateurs en chimie")] = {
  intro: "Salut, moi c'est Nova ! On démarre la chimie quantique par ses fondations : Born-Oppenheimer, opérateurs et postulats. Demande-moi pourquoi on fige les noyaux, ce qu'est un opérateur hermitique, ou un indice sur un exercice.",
  rules: [
    { test:/born.?oppenheimer/i, replies:["Born-Oppenheimer : les noyaux, ~1836 fois plus lourds qu'un électron, se déplacent beaucoup plus lentement. On les fige donc à une géométrie donnée pour résoudre le problème électronique seul."] },
    { test:/hamiltonien|\bH\b.*op[ée]rateur/i, replies:["Le hamiltonien Ĥ = T̂ + V̂ est l'opérateur énergie totale. Résoudre Ĥψ=Eψ est, en substance, tout le programme de la chimie quantique."] },
    { test:/hermitique|hermitien/i, replies:["Un opérateur hermitique a des valeurs propres réelles (indispensable pour une mesure physique) et des fonctions propres orthogonales entre elles si les valeurs propres diffèrent."] },
    { test:/orthogonal/i, replies:["Deux fonctions propres d'un opérateur hermitique associées à des valeurs propres différentes sont orthogonales : leur produit scalaire (intégrale de recouvrement) est nul."] },
    { test:/postulat/i, replies:["Trois postulats essentiels ici : 1) l'état est décrit par Ψ, 2) chaque observable a un opérateur hermitique associé, 3) une mesure ne peut donner qu'une valeur propre de cet opérateur."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare la masse d'un proton à celle d'un électron.","Indice niveau 2 : le rapport est d'environ 1836.","Indice niveau 3 : plus un objet est lourd, plus il bouge lentement à énergie comparable."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis la propriété d'orthogonalité énoncée dans le cours.","Indice niveau 2 : elle concerne deux fonctions propres de valeurs propres DIFFÉRENTES.","Indice niveau 3 : leur produit scalaire (intégrale) vaut zéro."] }
  ]
};
/* =========================== CHAPITRE 2 — L'atome d'hydrogène : orbitales atomiques et nombres quantiques =========================== */
CHQ_CHAPTERS[chqKey("L'atome d'hydrogène : orbitales atomiques et nombres quantiques")] = {
  objectives: [
    "Poser le hamiltonien électronique de l'atome d'hydrogène et justifier le passage aux coordonnées sphériques",
    "Décrire la séparation de la fonction d'onde en une partie radiale et une partie angulaire",
    "Retrouver l'origine des nombres quantiques n, l, m à partir de la résolution de l'équation de Schrödinger",
    "Décrire la forme des orbitales atomiques s, p et d et compter leurs nœuds",
    "Relier la dégénérescence n² de l'atome d'hydrogène à l'absence de répulsion électronique"
  ],
  prereqs: ["Postulats de la mécanique quantique et opérateurs en chimie", "L'atome d'hydrogène et le spin de l'électron (L2 Physique)"],
  bodyHtml: `
    <p>L'atome d'hydrogène — un seul électron soumis au champ électrostatique d'un seul proton — est le système le plus simple de la chimie, et l'un des très rares pour lesquels l'équation de Schrödinger admet une solution <strong>exacte</strong>. Ce chapitre reprend, dans une perspective chimique, la résolution déjà entrevue en L2, et en tire les outils fondamentaux de toute la structure électronique : nombres quantiques, orbitales atomiques, niveaux d'énergie.</p>

    <h3>1. Le hamiltonien électronique</h3>
    <p>Dans l'approximation de Born-Oppenheimer, le noyau (proton) est fixé à l'origine. L'électron, de charge $-e$, subit l'attraction coulombienne du noyau de charge $+e$ : $V(r) = -\\dfrac{e^2}{4\\pi\\varepsilon_0 r}$. Le hamiltonien électronique s'écrit :</p>
    <div class="formula-box">$$\\hat{H} = -\\frac{\\hbar^2}{2m_e}\\nabla^2 - \\frac{e^2}{4\\pi\\varepsilon_0 r}$$</div>
    <p>Le potentiel ne dépend que de la distance $r$ au noyau (symétrie sphérique) : c'est pourquoi on abandonne les coordonnées cartésiennes $(x,y,z)$ au profit des <strong>coordonnées sphériques</strong> $(r,\\theta,\\varphi)$, naturellement adaptées à cette symétrie.</p>

    <h3>2. Séparation des variables : partie radiale et partie angulaire</h3>
    <p>La symétrie sphérique du potentiel permet de chercher la fonction d'onde sous une forme <strong>séparée</strong>, produit d'une fonction de la seule distance $r$ et d'une fonction des seuls angles $(\\theta,\\varphi)$ :</p>
    <div class="formula-box">$$\\psi_{n,l,m}(r,\\theta,\\varphi) = R_{n,l}(r) \\times Y_{l,m}(\\theta,\\varphi)$$</div>
    <p>$R_{n,l}(r)$ est la <strong>partie radiale</strong> : elle décrit comment la probabilité de présence varie avec la distance au noyau. $Y_{l,m}(\\theta,\\varphi)$ est la <strong>partie angulaire</strong> (harmonique sphérique) : elle décrit la forme et l'orientation de l'orbitale dans l'espace, indépendamment de la distance au noyau. Cette séparation est la clé qui rend le problème traitable : deux équations différentielles plus simples remplacent une seule équation à trois variables couplées.</p>

    <h3>3. Émergence naturelle des trois nombres quantiques</h3>
    <p>La résolution de ces deux équations, soumises à la condition physique que $\\psi$ reste finie partout et s'annule à l'infini, n'admet de solutions acceptables que pour certaines valeurs <strong>entières</strong> de trois paramètres — les nombres quantiques déjà rencontrés en chimie atomique, mais ici obtenus rigoureusement et non postulés :</p>
    <table class="mini-table">
      <tr><th>Nombre quantique</th><th>Origine mathématique</th><th>Valeurs permises</th><th>Rôle physique</th></tr>
      <tr><td>Principal $n$</td><td>équation radiale</td><td>$1,2,3,\\dots$</td><td>fixe l'énergie et la taille de l'orbitale</td></tr>
      <tr><td>Secondaire (azimutal) $l$</td><td>équation angulaire</td><td>$0,1,\\dots,n-1$</td><td>fixe la forme (s, p, d, f) et le moment cinétique orbital</td></tr>
      <tr><td>Magnétique $m$</td><td>équation angulaire</td><td>$-l,\\dots,+l$</td><td>fixe l'orientation dans l'espace</td></tr>
    </table>
    <p>C'est un résultat remarquable : les nombres quantiques $n$, $l$, $m$, qui semblent parfois arbitraires lorsqu'ils sont simplement énoncés en cours de chimie générale, ne sont en réalité que la <strong>conséquence mathématique directe</strong> de la résolution de l'équation de Schrödinger pour un potentiel à symétrie sphérique.</p>

    <h3>4. Niveaux d'énergie et dégénérescence $n^2$</h3>
    <p>Fait remarquable propre à l'atome d'hydrogène (et aux ions hydrogénoïdes à un seul électron) : l'énergie ne dépend <strong>que</strong> du nombre quantique principal $n$, pas de $l$ ni de $m$ :</p>
    <div class="formula-box">$$E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}$$</div>
    <p>Pour un $n$ donné, il existe $n$ valeurs de $l$ (de 0 à $n-1$), et pour chaque $l$, $2l+1$ valeurs de $m$ : le nombre total d'orbitales de même énergie $E_n$ vaut $\\sum_{l=0}^{n-1}(2l+1) = n^2$. Cette <strong>dégénérescence en $n^2$</strong> est une propriété <em>spécifique</em> du potentiel coulombien pur à un seul électron : dès qu'un deuxième électron est présent (chapitre suivant), la répulsion électronique lève cette dégénérescence et l'énergie dépend alors aussi de $l$.</p>

    <h3>5. Forme des orbitales : nœuds radiaux et angulaires</h3>
    <p>Le nombre total de <strong>nœuds</strong> (surfaces où $\\psi=0$, donc où la probabilité de présence est nulle) d'une orbitale $(n,l)$ vaut $n-1$, répartis en $n-l-1$ nœuds <strong>radiaux</strong> (sphères concentriques) et $l$ nœuds <strong>angulaires</strong> (plans ou cônes passant par le noyau).</p>
    <table class="mini-table">
      <tr><th>Orbitale</th><th>Forme</th><th>Nœuds radiaux</th><th>Nœuds angulaires</th></tr>
      <tr><td>1s</td><td>sphérique</td><td>0</td><td>0</td></tr>
      <tr><td>2s</td><td>sphérique (avec une sphère nodale interne)</td><td>1</td><td>0</td></tr>
      <tr><td>2p</td><td>bilobée (« haltère »)</td><td>0</td><td>1</td></tr>
      <tr><td>3d</td><td>quadrilobée (sauf $3d_{z^2}$)</td><td>0</td><td>2</td></tr>
    </table>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <circle cx="60" cy="35" r="22" fill="#3D6BF0" opacity="0.28"/>
          <circle cx="60" cy="35" r="3" fill="#122043"/>
        </svg>
        <span>Orbitale 1s : symétrie sphérique, aucun nœud, densité maximale près du noyau.</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <ellipse cx="35" cy="35" rx="18" ry="10" fill="#F0555C" opacity="0.35"/>
          <ellipse cx="85" cy="35" rx="18" ry="10" fill="#3D6BF0" opacity="0.35"/>
          <circle cx="60" cy="35" r="3" fill="#122043"/>
        </svg>
        <span>Orbitale 2p : forme bilobée, un plan nodal passant par le noyau, lobes de signes opposés.</span>
      </div>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour l'orbitale $3p$ de l'hydrogène, donner le nombre de nœuds radiaux et angulaires, ainsi que le nombre d'orbitales $3p$ distinctes (dégénérescence en $m$).</p>
      <p><strong>Solution :</strong> pour $3p$, $n=3$ et $l=1$. Nœuds angulaires $= l = 1$. Nœuds radiaux $= n-l-1 = 3-1-1 = 1$. Le nombre d'orbitales pour $l=1$ correspond aux valeurs de $m$ de $-1$ à $+1$, soit $2l+1=3$ orbitales ($3p_x$, $3p_y$, $3p_z$), toutes dégénérées en énergie dans l'atome d'hydrogène.</p>
      <p class="example-answer">Réponse : 1 nœud radial, 1 nœud angulaire, 3 orbitales 3p dégénérées.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>ψ(r,θ,φ) = R(r) × Y(θ,φ) : partie radiale (distance au noyau) × partie angulaire (forme, orientation)</li>
        <li>n, l, m émergent naturellement de la résolution, avec n∈ℕ*, l de 0 à n−1, m de −l à +l</li>
        <li>Pour l'hydrogène seul, E_n = −13,6/n² eV ne dépend que de n → dégénérescence n²</li>
        <li>Nombre total de nœuds = n−1, dont n−l−1 radiaux et l angulaires</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Généraliser la dégénérescence n² aux atomes polyélectroniques — elle est propre au potentiel coulombien pur à un seul électron</li>
        <li>Confondre nœud radial (sphère) et nœud angulaire (plan ou cône) : ils n'ont pas la même origine mathématique</li>
        <li>Oublier que Y(θ,φ) ne dépend pas de n : deux orbitales 2p et 3p de même orientation ont la même forme angulaire, seule leur extension radiale diffère</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le passage aux coordonnées sphériques pour résoudre l'équation de Schrödinger de l'atome d'hydrogène est justifié par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq2e1" value="wrong"> une convention arbitraire des physiciens</label>
          <label class="option"><input type="radio" name="chq2e1" value="right"> la symétrie sphérique du potentiel coulombien V(r)</label>
          <label class="option"><input type="radio" name="chq2e1" value="wrong"> la nécessité d'introduire le spin de l'électron</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq2e1','chq2fb1','Correct — le potentiel V(r) ne dépend que de la distance au noyau : les coordonnées sphériques exploitent directement cette symétrie et permettent la séparation des variables.','Regarde de quoi dépend le potentiel V(r) = -e²/4πε₀r.')">Vérifier</button>
        <div class="feedback" id="chq2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour l'orbitale 3d de l'hydrogène (n=3, l=2), le nombre d'orbitales dégénérées (valeurs de m) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq2e2" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="chq2e2" value="right"> 5</label>
          <label class="option"><input type="radio" name="chq2e2" value="wrong"> 7</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq2e2','chq2fb2','Correct — pour l=2, m va de -2 à +2, soit 2l+1=5 valeurs, donc 5 orbitales 3d dégénérées.','Utilise la formule 2l+1 avec l=2.')">Vérifier</button>
        <div class="feedback" id="chq2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La dégénérescence en n² des niveaux d'énergie de l'atome d'hydrogène est levée dès qu'on ajoute un deuxième électron, car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq2e3" value="wrong"> le noyau devient alors instable</label>
          <label class="option"><input type="radio" name="chq2e3" value="right"> la répulsion électron-électron rend l'énergie dépendante de l et pas seulement de n</label>
          <label class="option"><input type="radio" name="chq2e3" value="wrong"> les coordonnées sphériques ne s'appliquent plus</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq2e3','chq2fb3','Correct — c\\'est précisément l\\'objet du chapitre suivant : la répulsion électronique 1/r₁₂ couple les électrons et lève la dégénérescence propre au potentiel coulombien pur.','Pense à ce que l\\'hydrogène a de particulier : un seul électron, donc aucune répulsion électronique.')">Vérifier</button>
        <div class="feedback" id="chq2fb3"></div>
      </div>
    </div>
  `
};

CHQ_NOVA_KB[chqKey("L'atome d'hydrogène : orbitales atomiques et nombres quantiques")] = {
  intro: "Salut, moi c'est Nova ! On résout l'équation de Schrödinger pour l'atome d'hydrogène. Demande-moi d'où viennent n, l, m, ce qu'est un nœud radial, ou un indice sur un exercice.",
  rules: [
    { test:/partie radiale|R\(r\)|partie angulaire|Y\(/i, replies:["ψ(r,θ,φ) = R(r) × Y(θ,φ) : la partie radiale R décrit la distance au noyau, la partie angulaire Y décrit la forme et l'orientation de l'orbitale, indépendamment de n."] },
    { test:/n[oe]ud/i, replies:["Une orbitale (n,l) a n−1 nœuds au total : n−l−1 nœuds radiaux (sphères) et l nœuds angulaires (plans ou cônes)."] },
    { test:/d[ée]g[ée]n[ée]resc/i, replies:["Pour l'hydrogène, E_n ne dépend que de n → dégénérescence n². C'est une particularité du potentiel coulombien pur à un seul électron, levée dès qu'on ajoute des électrons."] },
    { test:/nombre.*quantique.*(n|l|m)/i, replies:["n, l, m émergent naturellement des équations radiale et angulaire : n∈{1,2,3,...}, l∈{0,...,n-1}, m∈{-l,...,+l}. Ce ne sont pas des règles arbitraires."] },
    { test:/orbitale.*forme|forme.*orbitale|s.*p.*d/i, replies:["s (l=0) : sphérique. p (l=1) : bilobée. d (l=2) : généralement quadrilobée. La forme est donnée uniquement par la partie angulaire Y(θ,φ)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la formule du nombre de valeurs de m.","Indice niveau 2 : m va de -l à +l.","Indice niveau 3 : ça fait 2l+1 valeurs, avec l=2 ici."] }
  ]
};
/* =========================== CHAPITRE 3 — Atomes polyélectroniques : approximation orbitale et règles de Slater =========================== */
CHQ_CHAPTERS[chqKey("Atomes polyélectroniques : approximation orbitale et règles de Slater")] = {
  objectives: [
    "Expliquer pourquoi l'équation de Schrödinger d'un atome à plusieurs électrons n'est pas séparable exactement",
    "Présenter le principe de l'approximation orbitale (champ central, méthode auto-cohérente)",
    "Définir la charge nucléaire effective Z_eff et la constante d'écran σ",
    "Appliquer les règles de Slater pour estimer Z_eff et l'énergie d'un électron donné",
    "Relier Z_eff aux tendances périodiques (rayon atomique, énergie d'ionisation)"
  ],
  prereqs: ["L'atome d'hydrogène : orbitales atomiques et nombres quantiques"],
  bodyHtml: `
    <p>L'atome d'hydrogène se résout exactement parce qu'il ne contient qu'un seul électron : le hamiltonien ne comporte qu'un terme d'attraction noyau-électron. Dès que l'atome possède deux électrons ou plus, un terme supplémentaire — la <strong>répulsion électron-électron</strong> — rend le problème insoluble analytiquement. Ce chapitre présente la stratégie d'approximation la plus utilisée en chimie pour contourner cette difficulté : l'<strong>approximation orbitale</strong>.</p>

    <h3>1. Le hamiltonien d'un atome polyélectronique</h3>
    <p>Pour un atome de numéro atomique $Z$ à $N$ électrons, le hamiltonien électronique s'écrit (en négligeant les effets relativistes) :</p>
    <div class="formula-box">$$\\hat{H} = \\sum_{i=1}^{N}\\left(-\\frac{\\hbar^2}{2m_e}\\nabla_i^2 - \\frac{Ze^2}{4\\pi\\varepsilon_0 r_i}\\right) + \\sum_{i<j}\\frac{e^2}{4\\pi\\varepsilon_0 r_{ij}}$$</div>
    <p>Le premier terme (somme sur chaque électron $i$) est séparable : c'est une somme de hamiltoniens hydrogénoïdes indépendants. Le second terme, la <strong>répulsion interélectronique</strong> $1/r_{ij}$, dépend simultanément des coordonnées de deux électrons $i$ et $j$ : il <strong>couple</strong> les électrons entre eux et empêche toute séparation exacte des variables. C'est ce terme, à lui seul, qui rend le problème à plusieurs électrons fondamentalement plus difficile que celui de l'hydrogène.</p>

    <h3>2. L'approximation orbitale (champ central)</h3>
    <p>L'idée de l'<strong>approximation orbitale</strong>, à la base de toute la chimie quantique appliquée, est de remplacer la répulsion instantanée et complexe de tous les autres électrons sur l'électron $i$ par un <strong>potentiel moyen</strong>, à symétrie sphérique, représentant l'effet moyen des autres électrons. Chaque électron se déplace alors indépendamment dans ce champ effectif — combinaison de l'attraction du noyau et de la répulsion moyenne des autres électrons — et peut être décrit par une orbitale de type hydrogénoïde, modifiée. Ce champ moyen doit lui-même être déterminé à partir des orbitales occupées ; on procède donc par <strong>itérations successives</strong> jusqu'à convergence — c'est la <strong>méthode du champ auto-cohérent</strong> (self-consistent field, SCF), dont la version la plus rigoureuse est la méthode de Hartree-Fock (évoquée en fin de chapitre suivant).</p>
    <div class="key-point">
      <span class="eyebrow">Fonction d'onde polyélectronique dans l'approximation orbitale</span>
      Dans cette approximation, la fonction d'onde totale de l'atome est construite comme un produit (antisymétrisé, pour respecter le principe de Pauli) d'orbitales monoélectroniques individuelles. Chaque électron « voit » un noyau de charge <strong>effective</strong> $Z_{eff} &lt; Z$, réduite par l'écran (la répulsion) des autres électrons — d'où l'expression <em>effet d'écran</em>.
    </div>

    <h3>3. Charge nucléaire effective et constante d'écran</h3>
    <p>On définit la <strong>charge nucléaire effective</strong> ressentie par un électron donné :</p>
    <div class="formula-box">$$Z_{eff} = Z - \\sigma$$</div>
    <p>où $\\sigma$ est la <strong>constante d'écran</strong>, qui quantifie combien les autres électrons « masquent » la charge du noyau. $\\sigma$ dépend fortement de la position relative de l'électron considéré : les électrons de cœur (proches du noyau) écrantent très efficacement les électrons de valence, alors que les électrons d'une même sous-couche s'écrantent peu entre eux (ils sont, en moyenne, à la même distance du noyau).</p>

    <h3>4. Les règles de Slater</h3>
    <p>John C. Slater a proposé en 1930 un jeu de règles empiriques, simples et remarquablement efficaces, pour estimer $\\sigma$ sans calcul numérique lourd. On écrit la configuration électronique en groupes : $(1s)(2s,2p)(3s,3p)(3d)(4s,4p)(4d)(4f)(5s,5p)\\dots$, puis on additionne les contributions à $\\sigma$ de tous les <strong>autres</strong> électrons (pas celui étudié) selon ces règles :</p>
    <table class="mini-table">
      <tr><th>Électron « écranteur » situé...</th><th>Contribution à σ</th></tr>
      <tr><td>dans le même groupe $(ns,np)$</td><td>0,35 par électron (0,30 si le groupe est 1s)</td></tr>
      <tr><td>dans la couche $n-1$ (juste en dessous)</td><td>0,85 par électron (pour un électron s ou p étudié)</td></tr>
      <tr><td>dans les couches $n-2$ et inférieures</td><td>1,00 par électron</td></tr>
      <tr><td>dans une couche $n-1$ ou moins, pour un électron $d$ ou $f$ étudié</td><td>1,00 par électron (tous les électrons plus internes)</td></tr>
    </table>
    <p>Une fois $\\sigma$ obtenu, l'énergie orbitalaire s'estime par une formule de type hydrogénoïde, avec un <strong>nombre quantique principal effectif</strong> $n^*$ (Slater : $n^*=n$ pour $n\\le3$, puis $n^*=3{,}7$ pour $n=4$, $n^*=4$ pour $n=5$, $n^*=4{,}2$ pour $n=6$) :</p>
    <div class="formula-box">$$E \\approx -13{,}6\\ \\frac{Z_{eff}^2}{(n^*)^2}\\ \\text{eV}$$</div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> estimer $Z_{eff}$ pour un électron $2p$ de l'atome d'oxygène ($Z=8$, configuration $1s^2\\,2s^2\\,2p^4$).</p>
      <p><strong>Solution :</strong> le groupe $(2s,2p)$ contient $2+4=6$ électrons ; en retirant l'électron étudié, il en reste 5 « écranteurs » dans ce même groupe : contribution $5\\times0{,}35=1{,}75$. Les 2 électrons $1s$ (couche $n-1$) contribuent chacun 0,85 : $2\\times0{,}85=1{,}70$. Total $\\sigma = 1{,}75+1{,}70=3{,}45$. Donc $Z_{eff} = 8-3{,}45 = 4{,}55$.</p>
      <p class="example-answer">Réponse : $Z_{eff}\\approx4{,}55$ pour un électron 2p de l'oxygène (à comparer à $Z=8$ : l'écrantage est loin d'être total).</p>
    </div>

    <h3>5. Z<sub>eff</sub> et tendances périodiques</h3>
    <p>La charge nucléaire effective explique directement deux tendances majeures du tableau périodique déjà rencontrées en chimie générale : le long d'une <strong>période</strong>, $Z$ augmente d'une unité à chaque case alors que les électrons ajoutés (même sous-couche) s'écrantent peu entre eux ($0{,}35$ seulement) — $Z_{eff}$ augmente donc nettement, ce qui contracte le rayon atomique et accroît l'énergie d'ionisation. Le long d'une <strong>colonne</strong>, chaque nouvelle période ajoute une couche interne complète, très efficace pour écranter ($0{,}85$ à $1{,}00$) — $Z_{eff}$ de valence évolue peu, mais $n$ (donc la taille moyenne de l'orbitale) augmente : le rayon atomique croît et l'énergie d'ionisation diminue.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <circle cx="60" cy="35" r="4" fill="#122043"/>
          <circle cx="60" cy="35" r="14" fill="none" stroke="#3D6BF0" stroke-width="1"/>
          <circle cx="60" cy="35" r="26" fill="none" stroke="#F0555C" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="66" y="24" font-size="6" fill="#3D6BF0">cœur (écrante fort)</text>
          <text x="66" y="63" font-size="6" fill="#F0555C">valence (Z_eff ressenti)</text>
        </svg>
        <span>Les électrons de cœur écrantent efficacement la charge nucléaire vue par les électrons de valence.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le terme de répulsion 1/r₁₂ couple les électrons entre eux : le problème polyélectronique n'est pas séparable exactement</li>
        <li>Approximation orbitale : chaque électron se déplace dans un champ moyen (méthode du champ auto-cohérent, SCF)</li>
        <li>Z_eff = Z − σ : charge nucléaire effective ressentie par un électron, σ étant la constante d'écran</li>
        <li>Règles de Slater : 0,35 (même groupe), 0,85 (couche n−1), 1,00 (couches ≤ n−2)</li>
        <li>Z_eff explique les tendances périodiques du rayon atomique et de l'énergie d'ionisation</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inclure l'électron étudié lui-même dans le calcul de σ — seuls les <em>autres</em> électrons contribuent à l'écran</li>
        <li>Utiliser la règle 0,85 pour des électrons de la couche n−1 quand l'électron étudié est d ou f — dans ce cas, la règle est 1,00 pour toutes les couches inférieures</li>
        <li>Croire que Z_eff = Z − (nombre total d'électrons de cœur) — l'écrantage n'est jamais total, d'où Z_eff toujours supérieur à ce que donnerait un écrantage à 100 %</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — règles de Slater</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Renseigne Z, le nombre quantique principal n de l'électron étudié, le nombre d'autres électrons du même groupe, puis de la couche n−1 et des couches inférieures.</p>
      <div class="sim-controls">
        <label>Z (numéro atomique) : <input type="number" id="slaterZ" value="8" step="1" style="width:60px;" oninput="updateSlater()"></label>
        <label>n (électron étudié) : <input type="number" id="slaterN" value="2" step="1" style="width:50px;" oninput="updateSlater()"></label>
        <label>Autres e⁻ même groupe : <input type="number" id="slaterSame" value="5" step="1" style="width:50px;" oninput="updateSlater()"></label>
        <label>e⁻ couche n−1 : <input type="number" id="slaterInner1" value="2" step="1" style="width:50px;" oninput="updateSlater()"></label>
        <label>e⁻ couches ≤ n−2 : <input type="number" id="slaterInner2" value="0" step="1" style="width:50px;" oninput="updateSlater()"></label>
        <div class="sim-readout" id="slaterReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le terme qui rend le hamiltonien d'un atome polyélectronique non séparable exactement est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq3e1" value="wrong"> l'énergie cinétique de chaque électron</label>
          <label class="option"><input type="radio" name="chq3e1" value="wrong"> l'attraction noyau-électron</label>
          <label class="option"><input type="radio" name="chq3e1" value="right"> la répulsion électron-électron 1/r₁₂</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq3e1','chq3fb1','Correct — ce terme dépend simultanément des coordonnées de deux électrons, ce qui empêche toute séparation exacte des variables.','Les deux premiers termes (cinétique, attraction) sont des sommes sur UN électron à la fois : lequel couple deux électrons ?')">Vérifier</button>
        <div class="feedback" id="chq3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans les règles de Slater, un électron de la couche n−1 (juste en dessous de l'électron s ou p étudié) contribue à σ pour :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq3e2" value="wrong"> 0,35</label>
          <label class="option"><input type="radio" name="chq3e2" value="right"> 0,85</label>
          <label class="option"><input type="radio" name="chq3e2" value="wrong"> 1,00</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq3e2','chq3fb2','Correct — 0,85 est la contribution standard d\\'un électron de la couche n-1 pour un électron s ou p étudié (1,00 s\\'applique aux couches n-2 et en dessous, ou aux électrons d/f étudiés).','0,35 est réservé au même groupe (n,l) ; 1,00 concerne les couches encore plus internes.')">Vérifier</button>
        <div class="feedback" id="chq3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le long d'une période du tableau périodique, Z_eff augmente nettement car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq3e3" value="wrong"> une nouvelle couche de cœur complète s'ajoute à chaque case</label>
          <label class="option"><input type="radio" name="chq3e3" value="right"> les électrons ajoutés dans la même sous-couche s'écrantent peu entre eux (0,35)</label>
          <label class="option"><input type="radio" name="chq3e3" value="wrong"> le nombre quantique principal n augmente à chaque case</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq3e3','chq3fb3','Correct — Z augmente d\\'une unité par case mais σ n\\'augmente que de ~0,35 : Z_eff = Z-σ croît donc nettement, d\\'où la contraction du rayon atomique le long d\\'une période.','Compare l\\'augmentation de Z (toujours +1) à celle de σ (+0,35 seulement dans le même groupe).')">Vérifier</button>
        <div class="feedback" id="chq3fb3"></div>
      </div>
    </div>
  `,
  init: initSlater
};

CHQ_NOVA_KB[chqKey("Atomes polyélectroniques : approximation orbitale et règles de Slater")] = {
  intro: "Salut, moi c'est Nova ! On aborde les atomes à plusieurs électrons et les règles de Slater. Demande-moi pourquoi la répulsion électronique complique tout, comment calculer Z_eff, ou un indice sur un exercice.",
  rules: [
    { test:/approximation orbitale|champ (moyen|central|auto.coh[ée]rent)|SCF/i, replies:["L'approximation orbitale remplace la répulsion exacte des autres électrons par un champ moyen à symétrie sphérique : chaque électron se déplace alors dans ce champ effectif, calculé de façon auto-cohérente (SCF)."] },
    { test:/z.?eff|charge.*effective|constante d.[ée]cran|sigma|σ/i, replies:["Z_eff = Z − σ. σ se calcule avec les règles de Slater : 0,35 par électron du même groupe, 0,85 par électron de la couche n-1, 1,00 pour les couches encore plus internes."] },
    { test:/slater/i, replies:["Les règles de Slater (1930) donnent une estimation simple de σ sans calcul numérique lourd. Regroupe la configuration en (1s)(2s,2p)(3s,3p)(3d)... puis additionne les contributions des AUTRES électrons."] },
    { test:/1\/r12|r_?\{?12\}?|r[ée]pulsion/i, replies:["Le terme 1/r₁₂ couple les coordonnées de deux électrons : c'est lui qui empêche de séparer exactement les variables dans un atome polyélectronique, contrairement à l'hydrogène."] },
    { test:/rayon atomique|[ée]nergie d.ionisation|tendance p[ée]riodique/i, replies:["Le long d'une période, Z_eff augmente fort (peu d'écrantage intra-groupe) → rayon diminue, énergie d'ionisation augmente. Le long d'une colonne, une nouvelle couche de cœur écrante bien → rayon augmente, énergie d'ionisation diminue."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis le tableau des règles de Slater.","Indice niveau 2 : il y a 3 valeurs possibles selon la position relative de l'électron écranteur.","Indice niveau 3 : couche n-1 pour un électron s/p étudié → 0,85."] }
  ]
};
/* =========================== CHAPITRE 4 — Méthode des perturbations : application à l'atome d'hélium =========================== */
CHQ_CHAPTERS[chqKey("Méthode des perturbations : application à l'atome d'hélium")] = {
  objectives: [
    "Poser le hamiltonien exact de l'atome d'hélium et identifier le terme responsable de la non-séparabilité",
    "Présenter le principe de la théorie des perturbations stationnaires au premier ordre",
    "Calculer l'énergie d'ordre zéro de l'hélium en négligeant la répulsion électronique",
    "Interpréter la correction au premier ordre comme une intégrale coulombienne de répulsion",
    "Comparer qualitativement la méthode des perturbations à la méthode variationnelle"
  ],
  prereqs: ["Atomes polyélectroniques : approximation orbitale et règles de Slater"],
  bodyHtml: `
    <p>Le chapitre précédent a présenté l'approximation orbitale de façon qualitative. Ce chapitre l'illustre sur l'exemple le plus simple possible — l'atome d'<strong>hélium</strong> (2 électrons) — avec un outil quantitatif rigoureux : la <strong>théorie des perturbations</strong>. C'est l'une des deux grandes méthodes d'approximation de la chimie quantique (l'autre étant la méthode variationnelle, évoquée en fin de chapitre), toutes deux à la base des méthodes de calcul modernes de structure électronique.</p>

    <h3>1. Le hamiltonien exact de l'hélium</h3>
    <p>Pour l'hélium ($Z=2$, 2 électrons repérés 1 et 2), le hamiltonien électronique complet s'écrit (en unités atomiques, où $\\hbar=m_e=e=4\\pi\\varepsilon_0=1$, très pratiques en chimie quantique) :</p>
    <div class="formula-box">$$\\hat{H} = \\underbrace{-\\frac{1}{2}\\nabla_1^2 - \\frac{Z}{r_1} - \\frac{1}{2}\\nabla_2^2 - \\frac{Z}{r_2}}_{\\hat{H}_0\\ (\\text{séparable})} + \\underbrace{\\frac{1}{r_{12}}}_{\\hat{H}'\\ (\\text{couplage})}$$</div>
    <p>On reconnaît la même structure qu'au chapitre précédent : une partie $\\hat{H}_0$, somme de deux hamiltoniens hydrogénoïdes indépendants (un par électron, avec $Z=2$), parfaitement séparable — et un terme de couplage $\\hat{H}' = 1/r_{12}$, la répulsion entre les deux électrons, responsable de toute la difficulté.</p>

    <h3>2. Énergie d'ordre zéro : négliger la répulsion</h3>
    <p>La première approximation, dite d'<strong>ordre zéro</strong>, consiste à ignorer purement et simplement $\\hat{H}'$. Le problème devient alors exactement soluble : chaque électron occupe une orbitale $1s$ hydrogénoïde de charge nucléaire $Z=2$ (et non $Z_{eff}$, puisqu'on ne tient encore compte d'aucun écrantage), d'énergie $E_{1s}=-13{,}6\\,Z^2$ eV. L'énergie totale d'ordre zéro de l'état fondamental (les deux électrons dans l'orbitale $1s$) est simplement la somme des deux énergies orbitalaires :</p>
    <div class="formula-box">$$E^{(0)} = 2\\times(-13{,}6\\times Z^2)\\ \\text{eV} = 2\\times(-13{,}6\\times4) = -108{,}8\\ \\text{eV}$$</div>
    <p>Comparée à la valeur expérimentale $E_{exp}=-79{,}0$ eV, cette approximation est <strong>très éloignée</strong> : elle surestime largement la stabilité de l'atome, car elle ignore entièrement la répulsion — pourtant bien réelle — entre les deux électrons, qui doit <em>déstabiliser</em> le système par rapport à ce calcul trop optimiste.</p>

    <h3>3. Théorie des perturbations au premier ordre</h3>
    <p>La théorie des perturbations stationnaires fournit une correction systématique : si $\\hat{H}=\\hat{H}_0+\\hat{H}'$ avec $\\hat{H}'$ « petit » devant $\\hat{H}_0$, l'énergie exacte se développe en série :</p>
    <div class="formula-box">$$E = E^{(0)} + E^{(1)} + E^{(2)} + \\dots \\qquad \\text{avec}\\quad E^{(1)} = \\langle\\psi^{(0)}|\\hat{H}'|\\psi^{(0)}\\rangle$$</div>
    <p>La correction au <strong>premier ordre</strong> $E^{(1)}$ s'obtient simplement en calculant la valeur moyenne de la perturbation $\\hat{H}'$ dans l'état non perturbé $\\psi^{(0)}$ — sans avoir besoin de connaître la fonction d'onde exacte, corrigée. Pour l'hélium, cette correction est l'<strong>intégrale coulombienne</strong> de répulsion entre les deux électrons dans l'orbitale $1s$ :</p>
    <div class="formula-box">$$E^{(1)} = \\left\\langle 1s(1)1s(2)\\left|\\frac{1}{r_{12}}\\right|1s(1)1s(2)\\right\\rangle = \\frac{5}{8}Z\\ \\text{(u.a.)} \\approx 34{,}0\\ \\text{eV pour } Z=2$$</div>
    <p>Cette correction est bien <strong>positive</strong> (répulsive), comme attendu physiquement : elle déstabilise l'atome par rapport à l'estimation trop optimiste de l'ordre zéro.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à partir de $E^{(0)}=-108{,}8$ eV et $E^{(1)}=+34{,}0$ eV, calculer l'énergie de l'hélium au premier ordre de perturbation, et comparer à la valeur expérimentale $-79{,}0$ eV.</p>
      <p><strong>Solution :</strong> $E \\approx E^{(0)}+E^{(1)} = -108{,}8+34{,}0 = -74{,}8$ eV. L'écart avec l'expérience est de $-79{,}0-(-74{,}8)=-4{,}2$ eV, soit environ 5 % — un accord déjà remarquable pour un calcul aussi simple, l'écart restant provenant des <strong>corrections d'ordre supérieur</strong>, négligées ici.</p>
      <p class="example-answer">Réponse : $E\\approx-74{,}8$ eV au premier ordre, contre $-79{,}0$ eV expérimentalement — écart d'environ 5 %.</p>
    </div>

    <h3>4. La méthode variationnelle : une approche alternative</h3>
    <p>Une seconde grande stratégie d'approximation, la <strong>méthode variationnelle</strong>, repose sur le <strong>théorème variationnel</strong> : pour toute fonction d'essai normalisée $\\phi$, l'énergie moyenne calculée $\\langle\\phi|\\hat{H}|\\phi\\rangle$ est toujours <strong>supérieure ou égale</strong> à l'énergie exacte de l'état fondamental. On peut donc chercher, parmi une famille de fonctions d'essai dépendant d'un ou plusieurs paramètres ajustables, celle qui <strong>minimise</strong> l'énergie calculée : plus cette énergie est basse, meilleure est l'approximation.</p>
    <p>Appliquée à l'hélium avec une orbitale $1s$ de charge nucléaire effective <strong>ajustable</strong> $\\zeta$ (au lieu de fixer $Z=2$), la minimisation de $\\langle\\hat{H}\\rangle$ par rapport à $\\zeta$ donne la valeur optimale $\\zeta = Z - 5/16 = 2-0{,}3125 = 1{,}6875$ — remarquablement proche de la valeur $Z_{eff}\\approx1{,}70$ obtenue par les règles de Slater au chapitre précédent ! — et une énergie $E\\approx-77{,}5$ eV, plus proche encore de l'expérience que le résultat perturbatif au premier ordre.</p>
    <div class="key-point">
      <span class="eyebrow">Perturbations vs. variationnel</span>
      Les deux méthodes convergent vers la même vérité physique par des chemins différents : la théorie des perturbations corrige une solution exacte d'un problème voisin, tandis que la méthode variationnelle optimise directement une fonction d'essai. Combinées, elles constituent le socle conceptuel de toutes les méthodes modernes de chimie quantique computationnelle (Hartree-Fock, post-Hartree-Fock, théorie de la fonctionnelle de la densité), qui reposent toutes, sous une forme ou une autre, sur ces deux principes.
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <line x1="10" y1="60" x2="110" y2="60" stroke="#122043" stroke-width="1"/>
          <line x1="10" y1="60" x2="10" y2="6" stroke="#122043" stroke-width="1"/>
          <line x1="20" y1="55" x2="20" y2="10" stroke="#F0555C" stroke-width="3"/>
          <line x1="50" y1="42" x2="50" y2="10" stroke="#3D6BF0" stroke-width="3"/>
          <line x1="80" y1="30" x2="80" y2="10" stroke="#2FA37A" stroke-width="3"/>
          <text x="12" y="65" font-size="6">E⁽⁰⁾</text>
          <text x="40" y="65" font-size="6">+E⁽¹⁾</text>
          <text x="70" y="65" font-size="6">exp.</text>
        </svg>
        <span>Comparaison des niveaux d'énergie : E⁽⁰⁾ seul (trop stable), avec correction E⁽¹⁾ (proche), valeur expérimentale.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Ĥ = Ĥ₀ (séparable) + Ĥ' (perturbation = 1/r₁₂, couplage électronique)</li>
        <li>Ordre zéro : E⁽⁰⁾ = 2×(−13,6×Z²) = −108,8 eV pour l'hélium, trop stable car la répulsion est ignorée</li>
        <li>Correction au 1er ordre : E⁽¹⁾ = ⟨ψ⁽⁰⁾|Ĥ'|ψ⁽⁰⁾⟩, toujours positive ici (répulsive) ; résultat ≈ −74,8 eV, proche de l'expérience (−79,0 eV)</li>
        <li>Méthode variationnelle : ⟨φ|Ĥ|φ⟩ ≥ E_exacte pour toute fonction d'essai normalisée ; on minimise par rapport à des paramètres ajustables</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'énergie d'ordre zéro est déjà une bonne approximation — elle ignore un effet physique majeur (la répulsion) et surestime nettement la stabilité</li>
        <li>Penser que la théorie des perturbations exige de connaître la fonction d'onde exacte du système perturbé — au premier ordre, seule la fonction d'onde non perturbée suffit</li>
        <li>Oublier que le théorème variationnel ne s'applique qu'à l'état fondamental (l'énergie calculée est toujours ≥ à l'énergie exacte du fondamental, pas nécessairement des états excités)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans le hamiltonien de l'hélium, le terme 1/r₁₂ est traité comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq4e1" value="wrong"> le hamiltonien d'ordre zéro Ĥ₀</label>
          <label class="option"><input type="radio" name="chq4e1" value="right"> la perturbation Ĥ'</label>
          <label class="option"><input type="radio" name="chq4e1" value="wrong"> une constante additive sans effet sur l'énergie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq4e1','chq4fb1','Correct — 1/r₁₂ est le terme de couplage entre les deux électrons, traité comme une perturbation Ĥ\\' par rapport au problème séparable Ĥ₀.','Ĥ₀ regroupe les termes séparables (cinétique + attraction noyau), qui reste-t-il ?')">Vérifier</button>
        <div class="feedback" id="chq4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'énergie d'ordre zéro de l'hélium (−108,8 eV) est plus basse (plus stable) que la valeur expérimentale (−79,0 eV) car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq4e2" value="wrong"> le calcul d'ordre zéro surestime la répulsion électronique</label>
          <label class="option"><input type="radio" name="chq4e2" value="right"> le calcul d'ordre zéro ignore complètement la répulsion électronique, pourtant déstabilisante</label>
          <label class="option"><input type="radio" name="chq4e2" value="wrong"> l'expérience mesure une énergie différente de l'énergie électronique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq4e2','chq4fb2','Correct — en ignorant 1/r₁₂ (répulsif, donc déstabilisant), le calcul d\\'ordre zéro sous-estime l\\'énergie totale (la rend artificiellement trop négative, donc trop stable).','La répulsion électronique déstabilise toujours le système : quel effet cela a-t-il si on l\\'ignore ?')">Vérifier</button>
        <div class="feedback" id="chq4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">D'après le théorème variationnel, pour toute fonction d'essai normalisée φ, l'énergie ⟨φ|Ĥ|φ⟩ calculée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq4e3" value="wrong"> toujours égale à l'énergie exacte</label>
          <label class="option"><input type="radio" name="chq4e3" value="right"> toujours supérieure ou égale à l'énergie exacte de l'état fondamental</label>
          <label class="option"><input type="radio" name="chq4e3" value="wrong"> toujours inférieure à l'énergie exacte de l'état fondamental</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq4e3','chq4fb3','Correct — c\\'est le théorème variationnel : on peut donc chercher la fonction d\\'essai qui MINIMISE l\\'énergie calculée pour se rapprocher au mieux de la vraie énergie du fondamental.','C\\'est ce théorème qui justifie de minimiser l\\'énergie par rapport aux paramètres ajustables.')">Vérifier</button>
        <div class="feedback" id="chq4fb3"></div>
      </div>
    </div>
  `
};

CHQ_NOVA_KB[chqKey("Méthode des perturbations : application à l'atome d'hélium")] = {
  intro: "Salut, moi c'est Nova ! On applique la théorie des perturbations à l'hélium. Demande-moi ce qu'est l'énergie d'ordre zéro, pourquoi la correction au 1er ordre est positive, ou un indice sur un exercice.",
  rules: [
    { test:/ordre z[ée]ro|E.?\(0\)|E\^0/i, replies:["E⁽⁰⁾ ignore complètement la répulsion 1/r₁₂ : chaque électron est traité comme s'il était seul autour du noyau (Z=2). Résultat pour l'hélium : -108,8 eV, trop stable."] },
    { test:/premier ordre|E.?\(1\)|E\^1|correction/i, replies:["E⁽¹⁾ = ⟨ψ⁽⁰⁾|Ĥ'|ψ⁽⁰⁾⟩ : la valeur moyenne de la perturbation dans l'état NON perturbé. Pour l'hélium, c'est l'intégrale coulombienne de répulsion, positive (+34 eV)."] },
    { test:/variationnel|th[ée]or[èe]me variationnel/i, replies:["Le théorème variationnel dit que ⟨φ|Ĥ|φ⟩ ≥ E_exacte pour toute fonction d'essai normalisée. On minimise donc l'énergie calculée par rapport à des paramètres ajustables (ex : la charge effective ζ)."] },
    { test:/1\/r12|perturbation|H.?['\u2019]/i, replies:["Le terme 1/r₁₂ (répulsion électron-électron) est traité comme la perturbation Ĥ', par rapport à Ĥ₀ séparable qui regroupe cinétique + attraction noyau-électron."] },
    { test:/hartree.?fock/i, replies:["La méthode de Hartree-Fock généralise l'idée variationnelle : on optimise simultanément toutes les orbitales occupées de façon auto-cohérente (SCF), en respectant le principe de Pauli via un déterminant de Slater."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce que le calcul d'ordre zéro OUBLIE.","Indice niveau 2 : la répulsion électronique est un effet déstabilisant.","Indice niveau 3 : l'ignorer rend l'énergie calculée artificiellement trop négative (trop stable)."] }
  ]
};
/* ---------------------------------------------------------------------------------
   OUTIL 2 — Visualiseur qualitatif des courbes d'énergie liante/antiliante (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateLCAOCurve(){
  const R = parseFloat(document.getElementById('lcaoR').value) || 1;
  const Re = 1.06; /* distance d'équilibre approx. en unités arbitraires (échelle Å) */
  const De = 2.65; /* profondeur du puits liant, en eV, valeur approx. H2+ */
  /* modèle qualitatif type Morse simplifié pour illustrer la courbe liante */
  const x = (R - Re) / Re;
  const Ebond = -De * (1 - Math.min(Math.abs(x),1.2)) + (x<0 ? De*3*Math.pow(Math.abs(x),2) : 0);
  const Eanti = De * Math.exp(-1.6*(R-0.3));
  const out = document.getElementById('lcaoReadout');
  out.innerHTML = `À R = ${R.toFixed(2)} Å (R<sub>e</sub> ≈ ${Re} Å pour H₂⁺) :<br>` +
    `Orbitale <strong>liante</strong> ψ₊ : énergie abaissée, minimum au voisinage de R<sub>e</sub> — c'est la géométrie stable observée.<br>` +
    `Orbitale <strong>antiliante</strong> ψ₋ : énergie toujours plus haute que les atomes séparés, purement répulsive — jamais de minimum.`;
}
function initLCAOCurve(){ updateLCAOCurve(); }

/* =========================== CHAPITRE 5 — L'ion moléculaire H2+ et la théorie des orbitales moléculaires (LCAO) =========================== */
CHQ_CHAPTERS[chqKey("L'ion moléculaire H₂⁺ et la théorie des orbitales moléculaires (LCAO)")] = {
  objectives: [
    "Poser le hamiltonien électronique de H₂⁺ dans l'approximation de Born-Oppenheimer",
    "Construire les orbitales moléculaires liante et antiliante par combinaison linéaire d'orbitales atomiques (LCAO)",
    "Définir les intégrales de recouvrement, coulombienne et de résonance",
    "Expliquer, à partir de la densité électronique, pourquoi une orbitale liante stabilise la molécule",
    "Décrire l'allure des courbes d'énergie potentielle liante et antiliante en fonction de la distance internucléaire"
  ],
  prereqs: ["Méthode des perturbations : application à l'atome d'hélium"],
  bodyHtml: `
    <p>Après les atomes, la chimie quantique s'attaque à son objet le plus emblématique : la <strong>liaison chimique</strong>. L'ion moléculaire <strong>H₂⁺</strong> — deux protons et un seul électron — est la molécule la plus simple qui existe. Comme pour l'atome d'hydrogène, ce système admet en réalité une solution exacte (dans un système de coordonnées adapté, dit elliptique-hyperbolique), mais c'est l'approche approchée — la théorie <strong>LCAO</strong> (<em>Linear Combination of Atomic Orbitals</em>) — qui est enseignée car elle se généralise directement à toutes les molécules polyatomiques.</p>

    <h3>1. Le problème électronique de H₂⁺</h3>
    <p>Dans l'approximation de Born-Oppenheimer, les deux noyaux A et B sont fixés à une distance $R$ l'un de l'autre. Le hamiltonien électronique de l'unique électron s'écrit (unités atomiques) :</p>
    <div class="formula-box">$$\\hat{H} = -\\frac{1}{2}\\nabla^2 - \\frac{1}{r_A} - \\frac{1}{r_B} + \\frac{1}{R}$$</div>
    <p>où $r_A$ et $r_B$ sont les distances de l'électron aux noyaux A et B, et $1/R$ la répulsion (constante, à $R$ fixé) entre les deux noyaux.</p>

    <h3>2. L'approximation LCAO</h3>
    <p>L'idée centrale de la théorie LCAO est simple et physiquement intuitive : au voisinage du noyau A, l'électron « ressent » essentiellement l'attraction de A et son état doit ressembler à l'orbitale atomique $1s_A$ de l'hydrogène isolé ; de même au voisinage de B. On construit donc l'<strong>orbitale moléculaire</strong> (OM) comme une combinaison linéaire des deux orbitales atomiques (OA) $1s_A$ et $1s_B$ :</p>
    <div class="formula-box">$$\\psi_{\\pm} = c_A\\,1s_A \\pm c_B\\,1s_B$$</div>
    <p>Par symétrie des deux noyaux identiques, $|c_A|=|c_B|$ : il n'existe que deux combinaisons possibles, l'une avec un signe $+$ (combinaison <strong>en phase</strong>), l'autre avec un signe $-$ (combinaison <strong>en opposition de phase</strong>).</p>

    <h3>3. Les trois intégrales fondamentales</h3>
    <p>La normalisation de $\\psi_\\pm$ et le calcul de son énergie moyenne $\\langle\\psi_\\pm|\\hat{H}|\\psi_\\pm\\rangle$ font apparaître trois intégrales, omniprésentes dans toute la théorie des orbitales moléculaires :</p>
    <table class="mini-table">
      <tr><th>Intégrale</th><th>Définition</th><th>Signification physique</th></tr>
      <tr><td>Recouvrement $S$</td><td>$S=\\int 1s_A\\,1s_B\\,d\\tau$</td><td>mesure le chevauchement spatial des deux orbitales atomiques ($0\\le S\\le1$)</td></tr>
      <tr><td>Coulombienne $\\alpha$</td><td>$\\alpha=\\int 1s_A\\,\\hat{H}\\,1s_A\\,d\\tau = H_{AA}$</td><td>énergie d'un électron dans $1s_A$ soumis au potentiel complet (proche de l'énergie atomique)</td></tr>
      <tr><td>Résonance $\\beta$</td><td>$\\beta=\\int 1s_A\\,\\hat{H}\\,1s_B\\,d\\tau = H_{AB}$</td><td>intégrale d'échange, sans équivalent classique ; toujours négative pour des orbitales s en phase</td></tr>
    </table>
    <p>La résolution du problème séculaire (variationnel, cf. chapitre précédent) conduit aux deux énergies :</p>
    <div class="formula-box">$$E_+ = \\frac{\\alpha+\\beta}{1+S}\\ \\ (\\text{liante}) \\qquad\\qquad E_- = \\frac{\\alpha-\\beta}{1-S}\\ \\ (\\text{antiliante})$$</div>
    <p>Comme $\\beta<0$, on a $E_+&lt;\\alpha&lt;E_-$ : l'orbitale $\\psi_+$ est <strong>stabilisée</strong> par rapport à l'atome isolé, l'orbitale $\\psi_-$ est <strong>déstabilisée</strong>.</p>

    <h3>4. Interprétation en termes de densité électronique</h3>
    <p>La différence physique essentielle entre les deux combinaisons apparaît clairement dans la densité de probabilité $|\\psi_\\pm|^2$ :</p>
    <div class="key-point">
      <span class="eyebrow">Orbitale liante ψ₊</span>
      $|\\psi_+|^2 \\propto (1s_A+1s_B)^2 = 1s_A^2+1s_B^2+2\\,(1s_A)(1s_B)$. Le terme croisé $2\\,(1s_A)(1s_B)$ est <strong>positif</strong> entre les deux noyaux : la densité électronique y est <strong>accrue</strong> par rapport à la simple superposition des deux atomes isolés. Cet électron supplémentaire concentré entre les deux protons les attire tous deux électrostatiquement, plus qu'il ne les repousse via leur répulsion mutuelle : c'est l'origine quantique de la <strong>liaison chimique</strong>.
    </div>
    <p>À l'inverse, pour $\\psi_-$, le terme croisé est <strong>négatif</strong> : il existe un <strong>plan nodal</strong> exactement à mi-distance entre les deux noyaux, où la densité électronique s'annule. L'absence d'électron entre les noyaux laisse leur répulsion électrostatique mutuelle non compensée : l'orbitale antiliante est purement <strong>répulsive</strong>, quelle que soit la distance $R$.</p>

    <h3>5. Courbe d'énergie potentielle et distance d'équilibre</h3>
    <p>En traçant $E_\\pm(R)$ en fonction de la distance internucléaire $R$, on obtient les deux courbes caractéristiques de toute théorie des orbitales moléculaires : la courbe <strong>liante</strong> présente un <strong>minimum</strong> à une distance $R_e$ (la longueur de liaison expérimentale, $R_e\\approx106$ pm pour H₂⁺, avec une énergie de dissociation $D_e\\approx2{,}65$ eV) — c'est cette géométrie qui correspond à la molécule stable observée. La courbe <strong>antiliante</strong> est monotone décroissante avec $R$, sans aucun minimum : elle ne peut jamais conduire à une molécule stable.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <circle cx="30" cy="35" r="4" fill="#122043"/>
          <circle cx="90" cy="35" r="4" fill="#122043"/>
          <ellipse cx="60" cy="35" rx="42" ry="16" fill="#2FA37A" opacity="0.35"/>
          <text x="40" y="15" font-size="6" fill="#2FA37A">densité accrue entre les noyaux</text>
        </svg>
        <span>Orbitale liante ψ₊ : accumulation de densité électronique entre les deux noyaux.</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <circle cx="30" cy="35" r="4" fill="#122043"/>
          <circle cx="90" cy="35" r="4" fill="#122043"/>
          <ellipse cx="20" cy="35" rx="14" ry="12" fill="#F0555C" opacity="0.35"/>
          <ellipse cx="100" cy="35" rx="14" ry="12" fill="#3D6BF0" opacity="0.35"/>
          <line x1="60" y1="15" x2="60" y2="55" stroke="#122043" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="46" y="12" font-size="6">plan nodal</text>
        </svg>
        <span>Orbitale antiliante ψ₋ : plan nodal à mi-distance, densité nulle entre les noyaux.</span>
      </div>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> justifier qualitativement, sans calcul, pourquoi $\\beta$ (intégrale de résonance) est négative pour deux orbitales $1s$ en phase.</p>
      <p><strong>Solution :</strong> $\\beta=\\int 1s_A\\,\\hat{H}\\,1s_B\\,d\\tau$ contient notamment un terme d'attraction électron-noyau très négatif dans la région de recouvrement (entre A et B), où $1s_A$ et $1s_B$ sont toutes deux non nulles et de même signe. Ce terme d'attraction domine largement les autres contributions : l'intégrale résultante est négative, ce qui — combinée au signe $+$ dans $E_+=(\\alpha+\\beta)/(1+S)$ — abaisse effectivement l'énergie de l'orbitale liante.</p>
      <p class="example-answer">Réponse : β&lt;0 car il reflète l'attraction stabilisante ressentie par l'électron dans la zone de recouvrement entre les deux noyaux.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>LCAO : ψ± = c_A·1s_A ± c_B·1s_B, combinaison en phase (liante) ou en opposition de phase (antiliante)</li>
        <li>Trois intégrales clés : S (recouvrement), α (coulombienne), β (résonance, toujours &lt; 0 pour des OA s en phase)</li>
        <li>E₊ = (α+β)/(1+S) &lt; α &lt; E₋ = (α−β)/(1−S) : la liante est stabilisée, l'antiliante déstabilisée</li>
        <li>ψ₊ accumule la densité électronique entre les noyaux (liaison) ; ψ₋ a un plan nodal entre les noyaux (répulsion pure)</li>
        <li>Seule la courbe liante présente un minimum d'énergie → géométrie d'équilibre R_e de la molécule stable</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'orbitale antiliante « n'existe pas » dans H₂⁺ à l'état fondamental — elle existe mathématiquement mais reste simplement vide (inoccupée) dans l'état de plus basse énergie</li>
        <li>Oublier l'intégrale de recouvrement S au dénominateur des énergies E± — l'approximation « S=0 » (souvent faite pour simplifier, cf. méthode de Hückel au chapitre 7) n'est qu'une simplification supplémentaire</li>
        <li>Confondre le nœud de l'orbitale antiliante (un plan, lié à la forme de la fonction d'onde) avec l'absence totale d'électron dans la molécule</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Visualiseur — courbes d'énergie liante et antiliante</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Fais varier la distance internucléaire R et observe qualitativement comment se comportent les deux courbes d'énergie de H₂⁺.</p>
      <div class="sim-controls">
        <label>Distance R (Å) : <input type="range" id="lcaoR" min="0.3" max="3" step="0.05" value="1.06" oninput="updateLCAOCurve()"></label>
        <div class="sim-readout" id="lcaoReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'orbitale moléculaire liante ψ₊ = 1s_A + 1s_B stabilise la molécule H₂⁺ car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq5e1" value="wrong"> elle annule la répulsion entre les deux noyaux</label>
          <label class="option"><input type="radio" name="chq5e1" value="right"> elle accroît la densité électronique entre les deux noyaux, ce qui renforce leur attraction électrostatique</label>
          <label class="option"><input type="radio" name="chq5e1" value="wrong"> elle réduit le nombre d'électrons de la molécule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq5e1','chq5fb1','Correct — le terme croisé positif dans |ψ₊|² concentre de la densité électronique entre les noyaux, qui attire alors les deux protons plus fortement qu\\'ils ne se repoussent entre eux.','Regarde le terme croisé 2×(1s_A)(1s_B) dans le développement de |ψ₊|².')">Vérifier</button>
        <div class="feedback" id="chq5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Parmi les courbes d'énergie E±(R) de H₂⁺, celle qui présente un minimum (géométrie stable) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq5e2" value="right"> la courbe liante E₊(R)</label>
          <label class="option"><input type="radio" name="chq5e2" value="wrong"> la courbe antiliante E₋(R)</label>
          <label class="option"><input type="radio" name="chq5e2" value="wrong"> les deux courbes présentent un minimum</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq5e2','chq5fb2','Correct — seule la courbe liante possède un minimum, à R=R_e : c\\'est cette géométrie qui correspond à la molécule stable réellement observée.','La courbe antiliante est purement répulsive, sans jamais de minimum.')">Vérifier</button>
        <div class="feedback" id="chq5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'intégrale de résonance β = ∫1s_A Ĥ 1s_B dτ est, pour deux orbitales 1s en phase :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq5e3" value="wrong"> toujours positive</label>
          <label class="option"><input type="radio" name="chq5e3" value="right"> toujours négative</label>
          <label class="option"><input type="radio" name="chq5e3" value="wrong"> toujours nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq5e3','chq5fb3','Correct — β est négative car elle traduit l\\'attraction stabilisante ressentie par l\\'électron dans la zone de recouvrement entre les deux noyaux ; c\\'est ce signe qui abaisse E₊=(α+β)/(1+S).','Repense à l\\'exemple corrigé du cours sur le signe de β.')">Vérifier</button>
        <div class="feedback" id="chq5fb3"></div>
      </div>
    </div>
  `,
  init: initLCAOCurve
};

CHQ_NOVA_KB[chqKey("L'ion moléculaire H₂⁺ et la théorie des orbitales moléculaires (LCAO)")] = {
  intro: "Salut, moi c'est Nova ! On construit les premières orbitales moléculaires avec H₂⁺. Demande-moi la différence entre orbitale liante et antiliante, ce qu'est l'intégrale de résonance β, ou un indice sur un exercice.",
  rules: [
    { test:/lcao|combinaison lin[ée]aire/i, replies:["LCAO : on combine les orbitales atomiques 1s_A et 1s_B en ψ± = 1s_A ± 1s_B. Le signe + donne l'orbitale liante, le signe − l'orbitale antiliante."] },
    { test:/liante|antiliante/i, replies:["L'orbitale liante ψ₊ accumule la densité électronique ENTRE les noyaux (stabilisant) ; l'antiliante ψ₋ a un plan nodal entre les noyaux (déstabilisant, purement répulsive)."] },
    { test:/recouvrement|\bS\b.*int[ée]grale/i, replies:["L'intégrale de recouvrement S = ∫1s_A 1s_B dτ mesure le chevauchement spatial des deux orbitales atomiques ; elle vaut 0 pour des atomes très éloignés, et tend vers 1 s'ils se superposent totalement."] },
    { test:/(int[ée]grale.*r[ée]sonance|\bbeta\b|β)/i, replies:["β = ∫1s_A Ĥ 1s_B dτ (intégrale de résonance) est toujours négative pour des orbitales s en phase : c'est elle qui stabilise l'orbitale liante E₊=(α+β)/(1+S)."] },
    { test:/courbe.*[ée]nergie|distance.*[ée]quilibre|R_?e/i, replies:["Seule la courbe liante E₊(R) présente un minimum, à R=R_e (~106 pm pour H₂⁺) : c'est la longueur de liaison observée. La courbe antiliante est purement répulsive."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde le développement de |ψ₊|².","Indice niveau 2 : il y a un terme croisé 2×(1s_A)(1s_B).","Indice niveau 3 : ce terme est positif entre les noyaux → densité électronique accrue → attraction renforcée."] }
  ]
};
/* =========================== CHAPITRE 6 — Molécules diatomiques : diagrammes d'orbitales moléculaires =========================== */
CHQ_CHAPTERS[chqKey("Molécules diatomiques : diagrammes d'orbitales moléculaires")] = {
  objectives: [
    "Étendre la construction LCAO de H₂⁺ aux molécules diatomiques homonucléaires à plusieurs électrons",
    "Distinguer les orbitales moléculaires de symétrie σ et π formées à partir des orbitales atomiques 2s et 2p",
    "Établir le diagramme énergétique des OM et son inversion pour les éléments légers (Li₂ à N₂) versus lourds (O₂, F₂)",
    "Calculer l'indice de liaison (ordre de liaison) et prédire la stabilité, la longueur et l'énergie de liaison",
    "Expliquer le paramagnétisme du dioxygène comme succès emblématique de la théorie des orbitales moléculaires"
  ],
  prereqs: ["L'ion moléculaire H₂⁺ et la théorie des orbitales moléculaires (LCAO)"],
  bodyHtml: `
    <p>La méthode LCAO développée sur H₂⁺ se généralise directement aux molécules diatomiques à plusieurs électrons : on combine cette fois <strong>toutes</strong> les orbitales atomiques de valence des deux atomes ($2s$, $2p_x$, $2p_y$, $2p_z$), on obtient un jeu complet d'orbitales moléculaires, et on les remplit d'électrons en respectant le principe de Pauli et la règle de Hund — exactement comme pour la configuration électronique d'un atome, mais avec des orbitales <em>moléculaires</em> à la place des orbitales atomiques.</p>

    <h3>1. Symétrie σ et π des orbitales moléculaires</h3>
    <p>Le recouvrement de deux orbitales atomiques selon l'axe internucléaire (noté $z$ par convention) donne une orbitale moléculaire de symétrie <strong>σ</strong> (symétrique par rotation autour de cet axe, sans plan nodal contenant l'axe) : c'est le cas de $2s\\pm2s$ et de $2p_z\\pm2p_z$ (recouvrement « bout à bout »). Le recouvrement latéral de deux orbitales $2p_x$ (ou $2p_y$) perpendiculaires à l'axe donne une orbitale de symétrie <strong>π</strong> (un plan nodal contenant l'axe internucléaire) — par paires dégénérées $(2p_x,2p_x)$ et $(2p_y,2p_y)$.</p>
    <table class="mini-table">
      <tr><th>Combinaison d'OA</th><th>Type de recouvrement</th><th>OM formées</th></tr>
      <tr><td>$2s\\pm2s$</td><td>axial (bout à bout)</td><td>$\\sigma_{2s}$ (liante), $\\sigma^*_{2s}$ (antiliante)</td></tr>
      <tr><td>$2p_z\\pm2p_z$</td><td>axial (bout à bout)</td><td>$\\sigma_{2p}$ (liante), $\\sigma^*_{2p}$ (antiliante)</td></tr>
      <tr><td>$2p_x\\pm2p_x$, $2p_y\\pm2p_y$</td><td>latéral</td><td>$\\pi_{2p}$ ×2 (liantes, dégénérées), $\\pi^*_{2p}$ ×2 (antiliantes, dégénérées)</td></tr>
    </table>

    <h3>2. Le diagramme énergétique et son inversion caractéristique</h3>
    <p>L'ordre énergétique des orbitales moléculaires n'est pas toujours celui qu'on attendrait naïvement. Pour les éléments légers de la 2<sup>e</sup> période (de Li₂ à N₂), un couplage significatif entre les orbitales $2s$ et $2p_z$ de même symétrie $\\sigma$ (dit <em>mixing s-p</em>) repousse $\\sigma_{2p}$ vers le haut, au point qu'elle se retrouve <strong>au-dessus</strong> des orbitales $\\pi_{2p}$ :</p>
    <div class="formula-box">$$\\sigma_{2s} < \\sigma^*_{2s} < \\pi_{2p}\\ (\\text{×2}) < \\sigma_{2p} < \\pi^*_{2p}\\ (\\text{×2}) < \\sigma^*_{2p}\\qquad(\\text{Li}_2 \\text{ à } \\text{N}_2)$$</div>
    <p>Pour les éléments plus lourds de la même période (O₂, F₂, Ne₂), l'écart énergétique entre $2s$ et $2p$ devient trop grand pour que ce mélange soit significatif : l'ordre « attendu » est restauré, avec $\\sigma_{2p}$ <strong>en dessous</strong> des $\\pi_{2p}$ :</p>
    <div class="formula-box">$$\\sigma_{2s} < \\sigma^*_{2s} < \\sigma_{2p} < \\pi_{2p}\\ (\\text{×2}) < \\pi^*_{2p}\\ (\\text{×2}) < \\sigma^*_{2p}\\qquad(\\text{O}_2, \\text{F}_2)$$</div>

    <h3>3. Remplissage et ordre de liaison</h3>
    <p>On remplit les orbitales moléculaires par ordre croissant d'énergie, deux électrons par OM (Pauli), en respectant la règle de Hund pour les OM dégénérées ($\\pi$). L'<strong>indice (ou ordre) de liaison</strong> se calcule ensuite simplement :</p>
    <div class="formula-box">$$I = \\frac{n_{liants} - n_{antiliants}}{2}$$</div>
    <p>Plus l'ordre de liaison est élevé, plus la liaison est <strong>courte</strong> et <strong>forte</strong> (énergie de dissociation élevée). Un ordre de liaison nul (autant d'électrons liants qu'antiliants) signifie que la molécule n'est pas stable — c'est le cas de He₂, qui n'existe pas à l'état stable.</p>

    <table class="mini-table">
      <tr><th>Molécule</th><th>Configuration électronique (val.)</th><th>Ordre de liaison</th><th>Propriété remarquable</th></tr>
      <tr><td>Li₂</td><td>$\\sigma_{2s}^2$</td><td>1</td><td>liaison simple, faible</td></tr>
      <tr><td>N₂</td><td>$\\sigma_{2s}^2\\sigma^{*2}_{2s}\\pi^4_{2p}\\sigma^2_{2p}$</td><td>3</td><td>triple liaison, la plus courte et la plus forte des diatomiques de la période</td></tr>
      <tr><td>O₂</td><td>$\\sigma_{2s}^2\\sigma^{*2}_{2s}\\sigma^2_{2p}\\pi^4_{2p}\\pi^{*2}_{2p}$</td><td>2</td><td><strong>paramagnétique</strong> : 2 électrons célibataires dans $\\pi^*_{2p}$ (règle de Hund)</td></tr>
      <tr><td>F₂</td><td>$\\dots\\pi^4_{2p}\\pi^{*4}_{2p}$</td><td>1</td><td>liaison simple, faible et longue</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Le succès historique de la théorie MO : le paramagnétisme de O₂</span>
      La structure de Lewis usuelle du dioxygène (O=O, toutes les paires d'électrons appariées) prédit une molécule <strong>diamagnétique</strong> — en contradiction frontale avec l'expérience : le dioxygène liquide est fortement attiré par un aimant, preuve directe d'électrons célibataires. La théorie des orbitales moléculaires explique immédiatement ce fait expérimental : la configuration $\\dots\\pi^{*2}_{2p}$ place, par la règle de Hund, un électron dans chacune des deux orbitales $\\pi^*$ dégénérées, avec des spins parallèles — d'où le <strong>paramagnétisme</strong> de O₂, l'un des tout premiers succès expérimentaux ayant validé la théorie des orbitales moléculaires face au modèle de Lewis.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> comparer les ordres de liaison de N₂ et de O₂, et en déduire lequel a la liaison la plus courte.</p>
      <p><strong>Solution :</strong> pour N₂ (10 électrons de valence), configuration $\\sigma_{2s}^2\\sigma^{*2}_{2s}\\pi^4_{2p}\\sigma^2_{2p}$ : 8 électrons liants, 2 antiliants, ordre de liaison $=(8-2)/2=3$. Pour O₂ (12 électrons de valence), configuration $\\sigma_{2s}^2\\sigma^{*2}_{2s}\\sigma^2_{2p}\\pi^4_{2p}\\pi^{*2}_{2p}$ : 8 électrons liants, 4 antiliants, ordre de liaison $=(8-4)/2=2$.</p>
      <p class="example-answer">Réponse : N₂ (triple liaison, ordre 3) a une liaison plus courte et plus forte que O₂ (double liaison, ordre 2) — en excellent accord avec les longueurs de liaison expérimentales (110 pm pour N₂, contre 121 pm pour O₂).</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 80" width="100%">
          <line x1="10" y1="70" x2="40" y2="70" stroke="#122043"/>
          <line x1="80" y1="70" x2="110" y2="70" stroke="#122043"/>
          <line x1="45" y1="55" x2="75" y2="55" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="45" y1="40" x2="75" y2="40" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="45" y1="25" x2="75" y2="25" stroke="#F0555C" stroke-width="1.4"/>
          <text x="46" y="53" font-size="5.5">π2p (×2)</text>
          <text x="46" y="23" font-size="5.5">σ2p</text>
        </svg>
        <span>Pour Li₂—N₂ : les π2p sont en dessous de σ2p (mélange s-p important).</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 80" width="100%">
          <line x1="10" y1="70" x2="40" y2="70" stroke="#122043"/>
          <line x1="80" y1="70" x2="110" y2="70" stroke="#122043"/>
          <line x1="45" y1="55" x2="75" y2="55" stroke="#F0555C" stroke-width="1.4"/>
          <line x1="45" y1="35" x2="75" y2="35" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="45" y1="18" x2="75" y2="18" stroke="#3D6BF0" stroke-width="1.4"/>
          <text x="46" y="53" font-size="5.5">σ2p</text>
          <text x="46" y="16" font-size="5.5">π2p* (×2, ↑ ↑)</text>
        </svg>
        <span>Pour O₂—F₂ : σ2p repasse en dessous des π2p (mélange s-p négligeable).</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Recouvrement axial (2s, 2p_z) → OM σ ; recouvrement latéral (2p_x, 2p_y) → OM π, doublement dégénérées</li>
        <li>Li₂ à N₂ : π2p en dessous de σ2p (mélange s-p) ; O₂, F₂ : ordre « normal » restauré, σ2p en dessous de π2p</li>
        <li>Ordre de liaison I = (n_liants − n_antiliants)/2 : plus I est élevé, plus la liaison est courte et forte</li>
        <li>O₂ est paramagnétique (2 électrons célibataires dans π*2p) — succès historique majeur de la théorie MO face au modèle de Lewis</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer systématiquement l'ordre « σ2p avant π2p » à toutes les diatomiques de la 2<sup>e</sup> période — il s'inverse précisément entre N₂ et O₂</li>
        <li>Oublier la règle de Hund lors du remplissage des OM π ou π* dégénérées : deux électrons occupent d'abord deux OM différentes, spins parallèles, avant de s'apparier</li>
        <li>Confondre l'ordre de liaison (nombre entier ou demi-entier issu du diagramme MO) avec le nombre de doublets liants d'une structure de Lewis — les deux coïncident souvent, mais pas toujours (cas des espèces radicalaires, comme O₂)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le paramagnétisme du dioxygène O₂ s'explique par la théorie des orbitales moléculaires car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq6e1" value="wrong"> tous ses électrons sont appariés dans des OM σ</label>
          <label class="option"><input type="radio" name="chq6e1" value="right"> la règle de Hund place un électron célibataire dans chacune des deux OM π* dégénérées</label>
          <label class="option"><input type="radio" name="chq6e1" value="wrong"> O₂ ne possède pas d'orbitales antiliantes occupées</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq6e1','chq6fb1','Correct — la configuration se termine par π*2p² : la règle de Hund impose un électron par OM dégénérée avant appariement, d\\'où deux spins parallèles non appariés (paramagnétisme).','Repense à la règle de Hund appliquée à des orbitales dégénérées (les deux π*).')">Vérifier</button>
        <div class="feedback" id="chq6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour N₂, avec 8 électrons liants et 2 électrons antiliants (valence), l'ordre de liaison vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq6e2" value="wrong"> 5</label>
          <label class="option"><input type="radio" name="chq6e2" value="right"> 3</label>
          <label class="option"><input type="radio" name="chq6e2" value="wrong"> 10</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq6e2','chq6fb2','Correct — I=(8-2)/2=3 : c\\'est la triple liaison de N₂, la plus forte et la plus courte parmi les diatomiques homonucléaires de la 2e période.','Utilise la formule I=(n_liants-n_antiliants)/2.')">Vérifier</button>
        <div class="feedback" id="chq6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'inversion de l'ordre énergétique σ2p / π2p entre N₂ et O₂ provient de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq6e3" value="wrong"> un changement du nombre de protons uniquement</label>
          <label class="option"><input type="radio" name="chq6e3" value="right"> la diminution du mélange (couplage) entre orbitales 2s et 2p quand l'écart d'énergie 2s-2p augmente</label>
          <label class="option"><input type="radio" name="chq6e3" value="wrong"> l'apparition d'une liaison ionique dans O₂</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq6e3','chq6fb3','Correct — le mélange s-p, significatif pour les éléments légers, s\\'atténue quand l\\'écart énergétique entre 2s et 2p augmente le long de la période : σ2p retrouve alors sa position \\'normale\\' sous les π2p.','Pense à ce qui change progressivement le long de la 2e période : l\\'écart d\\'énergie entre les orbitales atomiques 2s et 2p.')">Vérifier</button>
        <div class="feedback" id="chq6fb3"></div>
      </div>
    </div>
  `
};

CHQ_NOVA_KB[chqKey("Molécules diatomiques : diagrammes d'orbitales moléculaires")] = {
  intro: "Salut, moi c'est Nova ! On construit les diagrammes OM des diatomiques homonucléaires. Demande-moi pourquoi O₂ est paramagnétique, comment calculer l'ordre de liaison, ou un indice sur un exercice.",
  rules: [
    { test:/sigma|σ.*(liante|orbitale)/i, replies:["Les OM σ proviennent d'un recouvrement axial (bout à bout) : 2s±2s et 2p_z±2p_z. Elles sont symétriques par rotation autour de l'axe internucléaire."] },
    { test:/pi|π.*(liante|orbitale)/i, replies:["Les OM π proviennent d'un recouvrement latéral de 2p_x ou 2p_y : elles vont toujours par paires dégénérées, avec un plan nodal contenant l'axe internucléaire."] },
    { test:/ordre de liaison|indice de liaison/i, replies:["Ordre de liaison I = (n_liants - n_antiliants)/2. Plus I est grand, plus la liaison est courte et forte. I=0 signifie molécule instable (ex : He₂)."] },
    { test:/paramagn[ée]tique|o2|dioxyg[èe]ne/i, replies:["O₂ est paramagnétique car sa configuration se termine par π*2p² : Hund impose un électron dans chacune des 2 OM π* dégénérées, spins parallèles non appariés. Un succès historique de la théorie MO contre le modèle de Lewis."] },
    { test:/inversion|m[ée]lange s.?p|s-p mixing/i, replies:["De Li₂ à N₂, le mélange s-p pousse σ2p au-dessus des π2p. Pour O₂ et F₂, l'écart énergétique 2s-2p est trop grand pour ce mélange : σ2p repasse sous les π2p."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde la fin de la configuration électronique de O₂.","Indice niveau 2 : elle se termine par π*2p².","Indice niveau 3 : deux OM π* dégénérées → règle de Hund → 2 électrons célibataires."] }
  ]
};
/* ---------------------------------------------------------------------------------
   OUTIL 3 — Calculateur des niveaux d'énergie de Hückel pour les polyènes linéaires (Chapitre 7)
--------------------------------------------------------------------------------- */
function updateHuckel(){
  const N = parseInt(document.getElementById('huckelN').value) || 2;
  const out = document.getElementById('huckelReadout');
  let levels = [];
  for(let k=1; k<=N; k++){
    /* E_k = alpha + 2*beta*cos(k*pi/(N+1)) pour une chaîne linéaire de N atomes (Hückel) */
    const c = 2*Math.cos(k*Math.PI/(N+1));
    levels.push(c);
  }
  levels.sort((a,b)=>b-a); /* plus haut coefficient de beta = plus basse énergie car beta<0 */
  const nElectrons = N; /* un électron pi par atome de carbone sp2 */
  let filled = Math.ceil(nElectrons/2);
  const rows = levels.map((c,i)=>{
    const occ = i < filled ? (nElectrons - 2*i >= 2 ? '↑↓' : (nElectrons - 2*i === 1 ? '↑' : '')) : '';
    return `E${i+1} = α + (${c.toFixed(3)})β ${occ ? '&nbsp;&nbsp;<strong>'+occ+'</strong>' : ''}`;
  });
  out.innerHTML = `Chaîne linéaire conjuguée à ${N} atomes (polyène, ${N} électrons π) :<br>` + rows.join('<br>') +
    `<br>Énergie π totale ≈ ${(2*levels.slice(0,filled).reduce((s,c,i)=> s + c*(nElectrons-2*i>=2?2:1),0)).toFixed(3)}β (par rapport à Nα)`;
}
function initHuckel(){ updateHuckel(); }

/* =========================== CHAPITRE 7 — La méthode de Hückel et les systèmes π conjugués =========================== */
CHQ_CHAPTERS[chqKey("La méthode de Hückel et les systèmes π conjugués")] = {
  objectives: [
    "Présenter les hypothèses simplificatrices de la méthode de Hückel (séparation σ/π, S_ij=δ_ij, α et β constants)",
    "Construire et résoudre le déterminant séculaire de Hückel pour l'éthylène et le butadiène",
    "Définir l'énergie de délocalisation et l'illustrer sur l'exemple du butadiène",
    "Retrouver les niveaux d'énergie du benzène et énoncer la règle d'aromaticité de Hückel (4n+2)",
    "Relier la méthode de Hückel à des applications concrètes : couleur, réactivité et stabilité des composés conjugués"
  ],
  prereqs: ["Molécules diatomiques : diagrammes d'orbitales moléculaires"],
  bodyHtml: `
    <p>Les molécules organiques conjuguées — alcènes, diènes, systèmes aromatiques — possèdent un ensemble d'électrons $\\pi$ délocalisés sur plusieurs atomes de carbone. Traiter exactement un tel système par la théorie LCAO complète (chapitre 6) exigerait de résoudre un déterminant séculaire de grande taille. Erich Hückel a proposé en 1931 une méthode approchée, drastiquement simplifiée mais remarquablement prédictive, qui reste aujourd'hui un outil pédagogique de référence pour comprendre qualitativement la réactivité et la stabilité des systèmes $\\pi$ conjugués.</p>

    <h3>1. Les hypothèses de la méthode de Hückel</h3>
    <p>La méthode repose sur une séparation nette entre le squelette $\\sigma$ (liaisons localisées C–C et C–H, considérées comme un cadre rigide et non traité explicitement) et le système $\\pi$ (une seule orbitale $2p_z$, perpendiculaire au plan moléculaire, par atome de carbone sp²), combiné à trois approximations numériques fortes :</p>
    <ul>
      <li>Le <strong>recouvrement</strong> entre orbitales $2p_z$ voisines est négligé dans la normalisation : $S_{ii}=1$, $S_{ij}=0$ pour $i\\neq j$ (simplification par rapport au chapitre 5, où $S$ était gardé) ;</li>
      <li>L'<strong>intégrale coulombienne</strong> $\\alpha=H_{ii}$ est prise identique pour tous les atomes de carbone (même environnement électronique supposé) ;</li>
      <li>L'<strong>intégrale de résonance</strong> $\\beta=H_{ij}$ n'est non nulle qu'entre atomes <strong>directement liés</strong> par une liaison $\\sigma$ ($\\beta$ entre atomes non adjacents est posée nulle).</li>
    </ul>

    <h3>2. L'éthylène : le cas le plus simple (2 atomes)</h3>
    <p>Pour l'éthylène H₂C=CH₂, le système séculaire $2\\times2$ se résout immédiatement (structure identique à H₂⁺ au chapitre 5, mais avec $S=0$ par hypothèse de Hückel) :</p>
    <div class="formula-box">$$E_{liante} = \\alpha+\\beta \\qquad E_{antiliante} = \\alpha-\\beta$$</div>
    <p>Avec 2 électrons $\\pi$ (un par carbone), les deux occupent l'orbitale liante : énergie $\\pi$ totale $=2(\\alpha+\\beta)$, à comparer à $2\\alpha$ pour deux électrons non appariés — la formation de la liaison $\\pi$ stabilise le système de $2\\beta$ ($\\beta<0$, donc $2\\beta<0$ : stabilisation).</p>

    <h3>3. Le butadiène et l'énergie de délocalisation</h3>
    <p>Pour le butadiène CH₂=CH–CH=CH₂ (4 atomes de carbone conjugués), le déterminant séculaire $4\\times4$ conduit à quatre niveaux d'énergie :</p>
    <div class="formula-box">$$E = \\alpha + 1{,}618\\beta,\\quad \\alpha+0{,}618\\beta,\\quad \\alpha-0{,}618\\beta,\\quad \\alpha-1{,}618\\beta$$</div>
    <p>Avec 4 électrons $\\pi$, les deux niveaux les plus bas sont occupés : énergie $\\pi$ totale $=2(\\alpha+1{,}618\\beta)+2(\\alpha+0{,}618\\beta)=4\\alpha+4{,}472\\beta$. Si l'on considérait (à tort) le butadiène comme deux doubles liaisons $\\pi$ isolées (2 éthylènes indépendants), l'énergie serait $2\\times2(\\alpha+\\beta)=4\\alpha+4\\beta$. La différence, appelée <strong>énergie de délocalisation</strong>, vaut $0{,}472\\beta$ (soit une stabilisation supplémentaire, car $\\beta<0$) : c'est la traduction quantitative de la stabilisation apportée par la <strong>conjugaison</strong>, bien connue qualitativement en chimie organique.</p>

    <div class="key-point">
      <span class="eyebrow">Pourquoi la conjugaison stabilise</span>
      La délocalisation des électrons $\\pi$ sur l'ensemble du système conjugué, plutôt que leur confinement dans des doubles liaisons isolées, abaisse l'énergie totale — c'est exactement la même logique physique que la stabilisation de l'orbitale liante de H₂⁺ (chapitre 5) : plus une orbitale s'étend sur un grand nombre de centres en restant liante, plus elle est stabilisée. L'énergie de délocalisation mesure quantitativement ce gain, propriété centrale pour comprendre la réactivité, la couleur (transitions électroniques $\\pi\\to\\pi^*$ à plus basse énergie pour les systèmes plus conjugués) et la stabilité des molécules organiques conjuguées.
    </div>

    <h3>4. Le benzène et la règle d'aromaticité de Hückel</h3>
    <p>Pour le cycle à 6 atomes du benzène, la résolution du déterminant séculaire (cyclique cette fois, chaque atome lié à ses deux voisins) donne les niveaux caractéristiques :</p>
    <div class="formula-box">$$E = \\alpha+2\\beta\\ (\\text{×1}),\\quad \\alpha+\\beta\\ (\\text{×2, dégénéré}),\\quad \\alpha-\\beta\\ (\\text{×2, dégénéré}),\\quad \\alpha-2\\beta\\ (\\text{×1})$$</div>
    <p>Avec 6 électrons $\\pi$, les trois niveaux les plus bas (le niveau non dégénéré $\\alpha+2\\beta$ et les deux niveaux dégénérés $\\alpha+\\beta$) sont exactement remplis : c'est une <strong>couche fermée</strong>, particulièrement stable, à l'origine de l'<strong>aromaticité</strong> du benzène. Ce remplissage complet de niveaux dégénérés par paires conduit à la célèbre <strong>règle de Hückel</strong> : un système cyclique plan, entièrement conjugué, est <strong>aromatique</strong> (particulièrement stabilisé) s'il possède $4n+2$ électrons $\\pi$ ($n$ entier, soit 2, 6, 10, 14…), et <strong>antiaromatique</strong> (déstabilisé) s'il en possède $4n$ (comme le cyclobutadiène, à 4 électrons $\\pi$, expérimentalement très instable et réactif).</p>

    <table class="mini-table">
      <tr><th>Système</th><th>Électrons π</th><th>Règle 4n+2 ?</th><th>Caractère</th></tr>
      <tr><td>Benzène C₆H₆</td><td>6</td><td>oui (n=1)</td><td>aromatique, très stable</td></tr>
      <tr><td>Cyclopentadiényle⁻</td><td>6</td><td>oui (n=1)</td><td>aromatique</td></tr>
      <tr><td>Cyclobutadiène</td><td>4</td><td>non (4n, n=1)</td><td>antiaromatique, très réactif</td></tr>
      <tr><td>Cyclooctatétraène (plan hypothétique)</td><td>8</td><td>non (4n, n=2)</td><td>antiaromatique — adopte en réalité une géométrie non plane pour l'éviter</td></tr>
    </table>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 80" width="100%">
          <line x1="15" y1="15" x2="15" y2="15" stroke="none"/>
          <line x1="15" y1="60" x2="35" y2="60" stroke="#122043"/>
          <line x1="85" y1="60" x2="105" y2="60" stroke="#122043"/>
          <line x1="40" y1="20" x2="80" y2="20" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="40" y1="38" x2="80" y2="38" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="40" y1="55" x2="80" y2="55" stroke="#F0555C" stroke-width="1.4"/>
          <line x1="40" y1="70" x2="80" y2="70" stroke="#F0555C" stroke-width="1.4"/>
          <text x="42" y="18" font-size="5.5">α+1,618β</text>
          <text x="42" y="36" font-size="5.5">α+0,618β  ↑↓</text>
          <text x="42" y="53" font-size="5.5">α-0,618β</text>
          <text x="42" y="68" font-size="5.5">α-1,618β</text>
        </svg>
        <span>Niveaux π de Hückel du butadiène : 4 OM, 2 occupées (2 e⁻ chacune).</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 80" width="100%">
          <line x1="40" y1="12" x2="80" y2="12" stroke="#2FA37A" stroke-width="1.4"/>
          <line x1="40" y1="30" x2="80" y2="30" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="40" y1="42" x2="80" y2="42" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="40" y1="58" x2="80" y2="58" stroke="#F0555C" stroke-width="1.4"/>
          <line x1="40" y1="70" x2="80" y2="70" stroke="#F0555C" stroke-width="1.4"/>
          <text x="42" y="10" font-size="5.5">α+2β  ↑↓</text>
          <text x="42" y="28" font-size="5.5">α+β (×2)  ↑↓ ↑↓</text>
          <text x="42" y="56" font-size="5.5">α-β (×2)</text>
          <text x="42" y="68" font-size="5.5">α-2β</text>
        </svg>
        <span>Niveaux π de Hückel du benzène : 6 électrons remplissent exactement les 3 niveaux liants (couche fermée).</span>
      </div>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le cation cyclopropényle (cycle à 3 carbones, 2 électrons π) est-il aromatique selon la règle de Hückel ?</p>
      <p><strong>Solution :</strong> nombre d'électrons π $=2$. On cherche $n$ entier tel que $4n+2=2$, soit $n=0$ : c'est un entier positif ou nul valide. Le cation cyclopropényle vérifie donc la règle $4n+2$.</p>
      <p class="example-answer">Réponse : oui, le cation cyclopropényle (2 électrons π, n=0) est aromatique — c'est d'ailleurs le plus petit système aromatique connu.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Hückel : une seule orbitale 2p_z par carbone sp², S_ij=δ_ij, α identique pour tous les carbones, β non nul seulement entre atomes liés</li>
        <li>Butadiène : énergie de délocalisation = 0,472β, traduction quantitative de la stabilisation par conjugaison</li>
        <li>Benzène : 6 électrons π remplissent exactement 3 niveaux liants (couche fermée) → aromaticité</li>
        <li>Règle de Hückel : cycle plan conjugué aromatique si 4n+2 électrons π, antiaromatique si 4n</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la règle de Hückel à un système non cyclique ou non plan — elle ne s'applique qu'aux systèmes cycliques entièrement conjugués et plans</li>
        <li>Confondre l'énergie de délocalisation (gain énergétique dû à la conjugaison) avec l'énergie π totale (somme de toutes les contributions occupées)</li>
        <li>Oublier que β est négatif : « plus grande valeur de β » dans une énergie E=α+cβ signifie en réalité l'orbitale la PLUS stable si c&gt;0</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — niveaux de Hückel d'un polyène linéaire</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis le nombre d'atomes de carbone conjugués (chaîne linéaire) pour voir les niveaux d'énergie de Hückel et leur occupation.</p>
      <div class="sim-controls">
        <label>Nombre d'atomes N : <input type="number" id="huckelN" value="4" min="2" max="8" step="1" style="width:60px;" oninput="updateHuckel()"></label>
        <div class="sim-readout" id="huckelReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans les hypothèses de la méthode de Hückel, l'intégrale de résonance β est non nulle uniquement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq7e1" value="wrong"> entre tous les atomes du système, liés ou non</label>
          <label class="option"><input type="radio" name="chq7e1" value="right"> entre atomes directement liés par une liaison σ</label>
          <label class="option"><input type="radio" name="chq7e1" value="wrong"> uniquement entre atomes du même cycle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq7e1','chq7fb1','Correct — c\\'est l\\'une des trois hypothèses fortes de Hückel : β n\\'est non nul qu\\'entre voisins directement liés, ce qui simplifie énormément le déterminant séculaire.','Relis les trois hypothèses simplificatrices énoncées en début de chapitre.')">Vérifier</button>
        <div class="feedback" id="chq7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le cyclobutadiène (4 électrons π) est qualifié d'antiaromatique car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq7e2" value="wrong"> il vérifie la règle 4n+2 avec n=1</label>
          <label class="option"><input type="radio" name="chq7e2" value="right"> il possède 4n électrons π (n=1), déstabilisant le système par rapport à des doubles liaisons localisées</label>
          <label class="option"><input type="radio" name="chq7e2" value="wrong"> il ne possède aucun électron π</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq7e2','chq7fb2','Correct — 4 électrons π correspond à 4n avec n=1, la configuration antiaromatique : c\\'est pourquoi le cyclobutadiène est expérimentalement très instable et réactif.','Cherche l\\'entier n tel que 4n=4 : ce n\\'est pas la règle 4n+2 qui s\\'applique ici.')">Vérifier</button>
        <div class="feedback" id="chq7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'énergie de délocalisation du butadiène traduit quantitativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq7e3" value="wrong"> l'énergie totale des 4 électrons π</label>
          <label class="option"><input type="radio" name="chq7e3" value="right"> le gain de stabilité dû à la conjugaison, par rapport à deux doubles liaisons π isolées</label>
          <label class="option"><input type="radio" name="chq7e3" value="wrong"> l'énergie de la liaison σ C-C centrale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq7e3','chq7fb3','Correct — c\\'est la différence entre l\\'énergie π réelle (délocalisée) et celle de deux éthylènes indépendants : elle quantifie le bénéfice énergétique de la conjugaison.','Repense à comment cette énergie a été définie dans le cours : une DIFFÉRENCE entre deux scénarios.')">Vérifier</button>
        <div class="feedback" id="chq7fb3"></div>
      </div>
    </div>
  `,
  init: initHuckel
};

CHQ_NOVA_KB[chqKey("La méthode de Hückel et les systèmes π conjugués")] = {
  intro: "Salut, moi c'est Nova ! On explore la méthode de Hückel pour les systèmes π conjugués. Demande-moi les hypothèses simplificatrices, ce qu'est l'énergie de délocalisation, ou la règle d'aromaticité 4n+2.",
  rules: [
    { test:/hypoth[èe]se|approximation.*h[üu]ckel/i, replies:["3 hypothèses clés : S_ij=0 entre atomes différents, α identique pour tous les carbones, β non nul seulement entre atomes directement liés."] },
    { test:/[ée]nergie de d[ée]localisation/i, replies:["L'énergie de délocalisation compare l'énergie π réelle (délocalisée sur tout le système conjugué) à celle de doubles liaisons isolées : pour le butadiène, elle vaut 0,472β, un gain de stabilité dû à la conjugaison."] },
    { test:/4n\+2|r[èe]gle de h[üu]ckel|aromati/i, replies:["Règle de Hückel : un cycle plan, entièrement conjugué, est aromatique (stabilisé) s'il compte 4n+2 électrons π, antiaromatique (déstabilisé) s'il en compte 4n."] },
    { test:/benz[èe]ne/i, replies:["Le benzène a 6 électrons π qui remplissent exactement 3 niveaux liants (couche fermée) : α+2β (1 niveau) et α+β (2 niveaux dégénérés) — d'où son aromaticité et sa stabilité exceptionnelle."] },
    { test:/cyclobutadi[èe]ne/i, replies:["Le cyclobutadiène a 4 électrons π (4n, n=1) : c'est antiaromatique, donc déstabilisé par rapport à des doubles liaisons localisées — d'où sa très grande réactivité."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compte les électrons π du cyclobutadiène.","Indice niveau 2 : il y en a 4.","Indice niveau 3 : 4 = 4n avec n=1, donc la règle 4n (antiaromatique), pas 4n+2."] }
  ]
};
/* =========================== CHAPITRE 8 — Symétrie moléculaire et éléments de théorie des groupes =========================== */
CHQ_CHAPTERS[chqKey("Symétrie moléculaire et éléments de théorie des groupes")] = {
  objectives: [
    "Identifier les éléments et opérations de symétrie d'une molécule (E, Cn, σ, i, Sn)",
    "Classer une molécule dans son groupe ponctuel de symétrie à partir de ses éléments de symétrie",
    "Relier la structure de groupe mathématique (fermeture, associativité, élément neutre, inverse) aux opérations de symétrie moléculaire",
    "Expliquer pourquoi seules des orbitales de même symétrie peuvent se combiner pour former une orbitale moléculaire",
    "Relier la symétrie moléculaire à l'activité infrarouge et Raman des modes de vibration (règle d'exclusion mutuelle)"
  ],
  prereqs: ["La méthode de Hückel et les systèmes π conjugués", "Théorie des groupes (Mathématiques L3)"],
  bodyHtml: `
    <p>Toutes les méthodes de chimie quantique présentées dans ce cours — LCAO, Hückel, orbitales moléculaires — reposent implicitement sur la <strong>symétrie géométrique</strong> des molécules : deux orbitales atomiques ne peuvent se combiner de façon significative que si elles partagent une symétrie commune. Ce dernier chapitre formalise cette notion à l'aide des outils de la <strong>théorie des groupes</strong> (cours de mathématiques de ce même semestre), et ouvre sur ses applications en spectroscopie, développées dans les cours suivants du programme.</p>

    <h3>1. Éléments et opérations de symétrie</h3>
    <p>Un <strong>élément de symétrie</strong> est une entité géométrique (point, droite, plan) par rapport à laquelle une <strong>opération de symétrie</strong> (une transformation) laisse la molécule dans une configuration indiscernable de la configuration de départ. Cinq types d'opérations suffisent à décrire toute la symétrie moléculaire :</p>
    <table class="mini-table">
      <tr><th>Symbole</th><th>Opération</th><th>Exemple</th></tr>
      <tr><td>$E$</td><td>identité (ne rien faire)</td><td>présente dans toute molécule</td></tr>
      <tr><td>$C_n$</td><td>rotation de $360°/n$ autour d'un axe</td><td>$C_2$ dans H₂O, $C_3$ dans NH₃</td></tr>
      <tr><td>$\\sigma$</td><td>réflexion à travers un plan</td><td>$\\sigma_v$ (contient l'axe principal), $\\sigma_h$ (perpendiculaire)</td></tr>
      <tr><td>$i$</td><td>inversion à travers un centre</td><td>centrosymétrique : CO₂, benzène</td></tr>
      <tr><td>$S_n$</td><td>rotation de $360°/n$ suivie d'une réflexion $\\sigma_h$</td><td>$S_4$ dans le méthane (CH₄)</td></tr>
    </table>
    <p>L'axe de rotation d'ordre le plus élevé d'une molécule est appelé <strong>axe principal</strong> ; il sert de référence pour classer les plans en $\\sigma_v$ (contenant l'axe principal) ou $\\sigma_h$ (perpendiculaire à l'axe principal).</p>

    <h3>2. Les groupes ponctuels de symétrie</h3>
    <p>L'ensemble de <strong>toutes</strong> les opérations de symétrie que possède une molécule constitue son <strong>groupe ponctuel</strong> (« ponctuel » car toutes les opérations laissent au moins un point fixe — le centre de masse de la molécule). Quelques groupes ponctuels très fréquents en chimie :</p>
    <table class="mini-table">
      <tr><th>Groupe</th><th>Éléments caractéristiques</th><th>Exemples</th></tr>
      <tr><td>$C_{2v}$</td><td>$E, C_2, \\sigma_v, \\sigma_v'$</td><td>H₂O, SO₂</td></tr>
      <tr><td>$C_{3v}$</td><td>$E, 2C_3, 3\\sigma_v$</td><td>NH₃, CHCl₃</td></tr>
      <tr><td>$D_{\\infty h}$</td><td>$E, C_\\infty, \\sigma_v, i, \\sigma_h$</td><td>CO₂, molécules linéaires centrosymétriques</td></tr>
      <tr><td>$T_d$</td><td>$E, 8C_3, 3C_2, 6S_4, 6\\sigma_d$</td><td>CH₄, tétraédrique</td></tr>
      <tr><td>$O_h$</td><td>très grand nombre d'opérations</td><td>SF₆, octaédrique</td></tr>
      <tr><td>$D_{6h}$</td><td>$E, 2C_6, 2C_3, C_2, \\dots, i, \\sigma_h$</td><td>benzène</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> identifier les éléments de symétrie de la molécule d'eau H₂O (structure coudée, angle ≈104,5°) et en déduire son groupe ponctuel.</p>
      <p><strong>Solution :</strong> l'eau possède l'identité $E$ ; un axe $C_2$ passant par l'atome d'oxygène et bissectant l'angle H–O–H ; un plan $\\sigma_v$ contenant les trois atomes (le plan de la molécule elle-même) ; un second plan $\\sigma_v'$ perpendiculaire au premier, contenant également l'axe $C_2$ mais pas les atomes d'hydrogène. Elle ne possède ni centre d'inversion, ni axe $S_n$ propre.</p>
      <p class="example-answer">Réponse : l'ensemble $\\{E, C_2, \\sigma_v, \\sigma_v'\\}$ définit le groupe ponctuel $C_{2v}$, celui de l'eau.</p>
    </div>

    <h3>3. Structure de groupe mathématique</h3>
    <p>Le choix du terme « groupe » n'est pas fortuit : l'ensemble des opérations de symétrie d'une molécule vérifie exactement les quatre axiomes d'un groupe étudiés dans le cours de mathématiques « Théorie des groupes » de ce même semestre :</p>
    <ul>
      <li><strong>Fermeture</strong> : la composition (l'application successive) de deux opérations de symétrie de la molécule est encore une opération de symétrie de la molécule ;</li>
      <li><strong>Associativité</strong> : $(AB)C = A(BC)$ pour trois opérations quelconques du groupe ;</li>
      <li><strong>Élément neutre</strong> : l'identité $E$, qui laisse la molécule invariante ;</li>
      <li><strong>Élément inverse</strong> : chaque opération possède une opération inverse qui la ramène à la configuration de départ (par exemple, $C_3$ et $C_3^2$ sont inverses l'une de l'autre).</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Pourquoi formaliser la symétrie en groupe mathématique ?</span>
      Cette structure abstraite permet d'utiliser tout l'arsenal de la théorie des représentations de groupes : construire des <strong>tables de caractères</strong>, classer les orbitales atomiques et moléculaires selon leur symétrie (représentations irréductibles), et prédire — sans calcul numérique — quelles combinaisons d'orbitales sont autorisées ou interdites par symétrie. C'est un outil d'une puissance considérable en chimie quantique moderne, qui dépasse largement le cadre de ce cours introductif mais dont ce chapitre pose les bases conceptuelles indispensables.
    </div>

    <h3>4. Symétrie et recouvrement orbitalaire</h3>
    <p>Retour au cœur du sujet de ce module : pourquoi seules certaines orbitales atomiques se combinent-elles pour former des orbitales moléculaires ? La réponse rigoureuse est une question de symétrie. L'intégrale de recouvrement $S=\\int\\phi_A\\phi_B\\,d\\tau$ (chapitres 5 et 6) n'est non nulle <strong>que si</strong> $\\phi_A$ et $\\phi_B$ appartiennent à la même représentation irréductible du groupe ponctuel de la molécule — en langage plus intuitif, que si leurs symétries « correspondent » (même comportement vis-à-vis des opérations de symétrie de la molécule). C'est cette règle générale, ici entrevue qualitativement, qui justifie a posteriori pourquoi $2s_A$ ne se combine qu'avec $2s_B$ (ou $2p_{z,B}$, de même symétrie $\\sigma$) et jamais directement avec $2p_{x,B}$ (de symétrie $\\pi$, incompatible) dans les diagrammes du chapitre 6.</p>

    <h3>5. Application en spectroscopie : la règle d'exclusion mutuelle</h3>
    <p>La symétrie moléculaire détermine aussi directement quels modes de vibration d'une molécule sont actifs en spectroscopie infrarouge (variation du moment dipolaire) ou Raman (variation de la polarisabilité) — thème développé dans les cours de spectroscopie de ce semestre. Une conséquence remarquable, la <strong>règle d'exclusion mutuelle</strong>, s'énonce simplement grâce à la théorie des groupes : pour une molécule <strong>centrosymétrique</strong> (possédant un centre d'inversion $i$, comme CO₂ ou le benzène), aucun mode de vibration ne peut être actif à la fois en infrarouge et en Raman — les deux techniques deviennent alors rigoureusement complémentaires pour caractériser la molécule.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <circle cx="60" cy="20" r="4" fill="#F0555C"/>
          <circle cx="35" cy="55" r="4" fill="#3D6BF0"/>
          <circle cx="85" cy="55" r="4" fill="#3D6BF0"/>
          <line x1="60" y1="20" x2="35" y2="55" stroke="#122043"/>
          <line x1="60" y1="20" x2="85" y2="55" stroke="#122043"/>
          <line x1="60" y1="5" x2="60" y2="65" stroke="#2FA37A" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="64" y="10" font-size="6" fill="#2FA37A">axe C₂</text>
        </svg>
        <span>H₂O : molécule coudée, axe C₂ et deux plans de symétrie σᵥ → groupe C₂ᵥ.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Cinq opérations de symétrie : E (identité), C_n (rotation), σ (réflexion), i (inversion), S_n (rotation-réflexion)</li>
        <li>Le groupe ponctuel rassemble toutes les opérations de symétrie d'une molécule (ex : H₂O → C₂ᵥ, NH₃ → C₃ᵥ, CH₄ → Tᵈ)</li>
        <li>L'ensemble des opérations de symétrie vérifie les axiomes de groupe : fermeture, associativité, élément neutre, inverse</li>
        <li>Le recouvrement S entre deux orbitales n'est non nul que si elles partagent la même symétrie</li>
        <li>Règle d'exclusion mutuelle : pour une molécule centrosymétrique, aucun mode de vibration n'est actif à la fois en IR et en Raman</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre élément de symétrie (l'entité géométrique : axe, plan, point) et opération de symétrie (la transformation elle-même)</li>
        <li>Oublier que l'identité E fait toujours partie du groupe ponctuel, même pour une molécule sans aucune autre symétrie (groupe C₁)</li>
        <li>Croire que « centrosymétrique » et « symétrique » sont synonymes — une molécule peut posséder de nombreux éléments de symétrie sans avoir de centre d'inversion (ex : NH₃, C₃ᵥ, n'a pas de centre d'inversion)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'axe principal d'une molécule est défini comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq8e1" value="wrong"> le premier axe de rotation trouvé, quel que soit son ordre</label>
          <label class="option"><input type="radio" name="chq8e1" value="right"> l'axe de rotation d'ordre n le plus élevé de la molécule</label>
          <label class="option"><input type="radio" name="chq8e1" value="wrong"> l'axe reliant les deux atomes les plus éloignés</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq8e1','chq8fb1','Correct — l\\'axe principal sert de référence pour classer les autres éléments de symétrie (plans σᵥ vs σₕ notamment).','Relis la définition donnée juste après le tableau des opérations de symétrie.')">Vérifier</button>
        <div class="feedback" id="chq8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'ensemble des opérations de symétrie d'une molécule vérifie les axiomes d'un groupe mathématique, ce qui implique notamment :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq8e2" value="wrong"> qu'il existe une infinité d'opérations de symétrie pour toute molécule</label>
          <label class="option"><input type="radio" name="chq8e2" value="right"> que la composition de deux opérations de symétrie de la molécule reste une opération de symétrie de la molécule (fermeture)</label>
          <label class="option"><input type="radio" name="chq8e2" value="wrong"> que toutes les molécules ont le même groupe ponctuel</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq8e2','chq8fb2','Correct — c\\'est l\\'axiome de fermeture : appliquer successivement deux opérations de symétrie de la molécule donne toujours une opération qui appartient elle aussi au groupe.','Relis les quatre axiomes de groupe énoncés dans le cours.')">Vérifier</button>
        <div class="feedback" id="chq8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une molécule centrosymétrique, la règle d'exclusion mutuelle stipule que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chq8e3" value="wrong"> tous les modes de vibration sont actifs à la fois en IR et en Raman</label>
          <label class="option"><input type="radio" name="chq8e3" value="right"> aucun mode de vibration ne peut être actif à la fois en IR et en Raman</label>
          <label class="option"><input type="radio" name="chq8e3" value="wrong"> la molécule ne possède aucun mode de vibration actif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chq8e3','chq8fb3','Correct — c\\'est une conséquence directe de la présence d\\'un centre d\\'inversion : les deux techniques (IR et Raman) deviennent alors rigoureusement complémentaires.','Relis la dernière section du cours sur l\\'application en spectroscopie.')">Vérifier</button>
        <div class="feedback" id="chq8fb3"></div>
      </div>
    </div>
  `
};

CHQ_NOVA_KB[chqKey("Symétrie moléculaire et éléments de théorie des groupes")] = {
  intro: "Salut, moi c'est Nova ! On termine ce cours par la symétrie moléculaire et son lien avec la théorie des groupes. Demande-moi comment classer une molécule dans un groupe ponctuel, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]l[ée]ment.*sym[ée]trie|op[ée]ration.*sym[ée]trie/i, replies:["5 opérations : E (identité), C_n (rotation de 360°/n), σ (réflexion), i (inversion), S_n (rotation-réflexion). Un élément de symétrie est l'entité géométrique associée (axe, plan, point)."] },
    { test:/groupe ponctuel|c2v|c3v|td|oh/i, replies:["Le groupe ponctuel rassemble TOUTES les opérations de symétrie d'une molécule. Exemples : H₂O → C₂ᵥ, NH₃ → C₃ᵥ, CH₄ → Tᵈ, CO₂ → D∞h."] },
    { test:/axiome|structure de groupe|fermeture|associativit/i, replies:["Les opérations de symétrie vérifient les 4 axiomes de groupe : fermeture, associativité, élément neutre (E), et chaque opération a un inverse."] },
    { test:/recouvrement.*sym[ée]trie|orbitale.*sym[ée]trie/i, replies:["Deux orbitales ne peuvent se combiner (recouvrement S non nul) que si elles ont la même symétrie vis-à-vis des opérations du groupe ponctuel de la molécule — c'est ce qui justifie les diagrammes OM du chapitre 6."] },
    { test:/exclusion mutuelle|infrarouge|raman/i, replies:["Règle d'exclusion mutuelle : pour une molécule centrosymétrique (avec un centre d'inversion i), aucun mode de vibration n'est actif à la fois en infrarouge et en Raman — les deux techniques sont alors complémentaires."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis les 4 axiomes de groupe.","Indice niveau 2 : l'un d'eux concerne la composition de deux opérations.","Indice niveau 3 : c'est l'axiome de FERMETURE."] }
  ]
};

/* fusionne le module Introduction à la chimie quantique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CHQ_CHAPTERS);
Object.assign(NOVA_KB, CHQ_NOVA_KB);