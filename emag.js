/* =====================================================================
   CHUNK « emag » — registre EMAG_CHAPTERS / EMAG_NOVA_KB
   Matière(s) : Physique|Électromagnétisme
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   EMAG_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE ÉLECTROMAGNÉTISME — Physique L1
   (contenu rédigé à partir du support de cours « Électromagnétisme », Iannis
   Aliferis, École Polytechnique de l'Université Nice Sophia Antipolis,
   Polytech'Nice Sophia, Parcours des Écoles d'Ingénieurs Polytech, 2012-2013 ;
   réorganisé en 15 chapitres, complété et enrichi)
   Structure identique aux autres modules : EMAG_CHAPTERS / EMAG_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const EMAG_MATIERE = 'Électromagnétisme';
function emagKey(chapterTitle){ return `Physique|${EMAG_MATIERE}|${chapterTitle}`; }
const EMAG_CHAPTERS = {};
const EMAG_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Introduction : forces fondamentales, champs et force de Lorentz =========================== */
EMAG_CHAPTERS[emagKey('Introduction : forces fondamentales, champs et force de Lorentz')] = {
  objectives: [
    "Comparer force gravitationnelle et force électrique entre deux particules chargées, et estimer leur importance relative",
    "Expliquer pourquoi on décrit les interactions électromagnétiques à l'aide de champs plutôt que d'une loi de force directe",
    "Écrire la force de Lorentz et identifier ses deux contributions, électrique et magnétique",
    "Situer l'électromagnétisme parmi les quatre interactions fondamentales de la Nature",
    "Analyser pourquoi la matière ordinaire, malgré la domination écrasante de la force électrique à l'échelle des particules, nous paraît dominée par la gravité à notre échelle"
  ],
  prereqs: ["Mécanique du point matériel (L1)", "Notion de vecteur"],
  bodyHtml: `
    <p>En 1864, dans un mémoire présenté à la Royal Society, James Clerk Maxwell écrit vingt équations qui vont, en une poignée de pages, unifier deux phénomènes que l'humanité observait séparément depuis l'Antiquité : l'ambre frotté qui attire de petits objets, et l'aimant naturel qui oriente une aiguille vers le nord. Einstein qualifiera plus tard ce travail de « la plus profonde et la plus féconde révolution qu'ait connue la physique depuis Newton ». Ce n'est pas une exagération : ces mêmes équations, à peine reformulées, pilotent aujourd'hui ton téléphone, l'IRM d'un hôpital, et la lumière qui te permet de lire ce texte.</p>
    <p>Sans électromagnétisme, pas de moteur électrique, pas d'antenne radio, pas de puce électronique — et pas de vision, puisque la lumière elle-même est une onde électromagnétique. Chaque fois que tu allumes un interrupteur, que ton GPS te localise, ou qu'un cardiologue lit un électrocardiogramme, c'est cette unification de Maxwell qui est à l'œuvre en coulisses.</p>
    <p>L'électricité et le magnétisme sont connus depuis l'Antiquité — l'ambre (ήλεκτρον) qui attire de petits objets après frottement, et l'aimant naturel (μαγνήτης) — mais ce sont deux phénomènes longtemps considérés comme distincts. Il faut attendre <strong>James Clerk Maxwell</strong> (1831–1879) pour qu'ils soient unifiés, en 1864, dans une théorie unique : l'électromagnétisme. Ce cours part de cette unification pour construire, étape par étape, les quatre équations qui décrivent aujourd'hui l'ensemble des phénomènes électriques, magnétiques et optiques. À la fin de ce premier chapitre, tu sauras pourquoi la physique décrit les interactions électriques et magnétiques par des champs, et tu maîtriseras l'expression unique — la force de Lorentz — qui régit toute particule chargée, immobile ou non.</p>

    <h3>1. Force gravitationnelle contre force électrique</h3>
    <p>Comparons les deux forces qui s'exercent entre deux électrons distants de $r$, de masse $m_e = 9,1\\times 10^{-31}$ kg et de charge $q_e = -1,6\\times 10^{-19}$ C :</p>
    <table class="mini-table">
      <tr><th>Force</th><th>Expression</th><th>Constante</th></tr>
      <tr><td>Gravitationnelle</td><td>$F_g = G\\dfrac{m_e m_e}{r^2}$</td><td>$G = 6,67\\times 10^{-11}\\ \\text{N m}^2\\text{kg}^{-2}$</td></tr>
      <tr><td>Électrique (Coulomb)</td><td>$F_e = k_c\\dfrac{q_e q_e}{r^2}$</td><td>$k_c = 8,99\\times 10^{9}\\ \\text{N m}^2\\text{C}^{-2}$</td></tr>
    </table>
    <p>Le rapport $F_e/F_g$ vaut environ $0,23\\times 10^{42}$ : à l'échelle de deux particules élémentaires, la force électrique écrase littéralement la force gravitationnelle. Si l'électromagnétisme ne domine pas notre perception quotidienne du monde à grande échelle, c'est simplement parce que la matière ordinaire est globalement neutre : les charges positives et négatives se compensent presque parfaitement.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si la force électrique est 10⁴² fois plus intense que la gravité à l'échelle des particules, pourquoi est-ce la gravité — et non l'électromagnétisme — qui gouverne la chute des corps, l'orbite des planètes ou la structure des galaxies ? Réfléchis à ce qui distingue une charge électrique (positive ou négative) d'une masse (toujours positive).
    </div>

    <h3>2. Pourquoi décrire des champs plutôt que des forces directes ?</h3>
    <p>La loi de Coulomb donne la force entre deux charges <strong>immobiles</strong> :</p>
    <p>$$\\vec{F} = k_c\\dfrac{q_1 q_2}{r^2}\\hat{u}_{1\\to2}$$</p>
    <p>Mais dès que les charges sources sont en mouvement, cette expression devient extrêmement compliquée si on cherche à décrire une action directe et instantanée à distance. La solution retenue par la physique moderne consiste à découper le problème en deux étapes indépendantes :</p>
    <ol>
      <li>les charges « sources » (immobiles ou en mouvement) créent en tout point de l'espace des champs $\\vec{E}$ et $\\vec{B}$ ;</li>
      <li>ces champs agissent ensuite sur toute autre charge présente, via la force de Lorentz.</li>
    </ol>
    <p>Il suffit donc de savoir décrire correctement les champs créés par des sources données : c'est tout l'objet de ce cours.</p>

    <h3>3. La force de Lorentz</h3>
    <p>La force électromagnétique exercée sur une charge ponctuelle $q$ animée d'une vitesse $\\vec{v}$, plongée dans un champ électrique $\\vec{E}$ et un champ magnétique $\\vec{B}$, s'écrit :</p>
    <p>$$\\vec{F} = q\\left(\\vec{E} + \\vec{v}\\wedge\\vec{B}\\right)$$</p>
    <p>Cette expression, contrairement à la loi de Coulomb seule, est <strong>toujours valable</strong>, que les charges soient immobiles ou en mouvement. Elle contient deux contributions bien distinctes :</p>
    <table class="mini-table">
      <tr><th>Terme</th><th>Nom</th><th>Propriété</th></tr>
      <tr><td>$q\\vec{E}$</td><td>Force électrique</td><td>Agit même sur une charge au repos ; parallèle à $\\vec{E}$</td></tr>
      <tr><td>$q\\vec{v}\\wedge\\vec{B}$</td><td>Force magnétique</td><td>Nulle si $\\vec{v}=\\vec{0}$ ; toujours perpendiculaire à $\\vec{v}$, donc ne travaille jamais</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Puisque la force magnétique ne travaille jamais, peut-elle malgré tout modifier la trajectoire d'une particule chargée ? Repense à la différence entre « changer la direction d'un vecteur vitesse » et « changer sa norme ».
    </div>

    <h3>4. Champ électrostatique : premier pas</h3>
    <p>En régime « statique » (charges immobiles), la loi de Coulomb (1785) donne la force exercée par une charge $q_1$ sur une charge $q_2$ :</p>
    <p>$$\\vec{F}_{1\\to2} = \\dfrac{1}{4\\pi\\epsilon_0}\\dfrac{q_1 q_2}{r^2}\\hat{u}_{1\\to2}$$</p>
    <p>où $\\epsilon_0$ est la <strong>permittivité du vide</strong>. On définit alors le champ électrique créé par $q_1$ au point où se trouve $q_2$ comme la force par unité de charge :</p>
    <p>$$\\vec{E}_1 = \\dfrac{1}{4\\pi\\epsilon_0}\\dfrac{q_1}{r^2}\\hat{u}_{1\\to2}, \\qquad \\vec{F}_{1\\to2} = q_2\\vec{E}_1$$</p>
    <p>Cette réécriture est essentielle : $\\vec{E}_1$ ne dépend que de la source $q_1$ et du point considéré, jamais de la charge « test » $q_2$ qu'on y placerait.</p>

    <h3>5. Les quatre interactions fondamentales</h3>
    <p>L'électromagnétisme est l'une des quatre interactions fondamentales de la Nature, aux côtés de l'interaction gravitationnelle, de l'interaction nucléaire forte et de l'interaction nucléaire faible. C'est la seule de ces quatre interactions qui gouverne directement notre expérience macroscopique quotidienne : cohésion de la matière, chimie, lumière, électronique.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Toute la démarche du cours découle d'une seule idée : remplacer une interaction à distance compliquée entre charges par deux étapes simples — des sources qui créent des champs $\\vec{E}$ et $\\vec{B}$, puis des champs qui exercent une force de Lorentz sur toute charge qui s'y trouve. Le programme du semestre consiste à apprendre à calculer $\\vec{E}$ et $\\vec{B}$ pour des sources de plus en plus générales.
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Les accélérateurs de particules, comme le grand collisionneur de hadrons (LHC) du CERN, utilisent précisément la force de Lorentz pour guider des protons à des vitesses proches de celle de la lumière : des champs magnétiques puissants (jusqu'à 8 teslas) les courbent sur une trajectoire circulaire de 27 km, tandis que des champs électriques oscillants les accélèrent à chaque tour. C'est l'observation du boson de Higgs en 2012, récompensée par le prix Nobel de physique 2013, qui a validé cette prouesse d'ingénierie électromagnétique à l'échelle industrielle.</p>
    <p><strong>Question ouverte :</strong> pourquoi n'observe-t-on jamais de charge magnétique isolée (un « monopôle magnétique », équivalent magnétique d'une charge électrique) ? Certaines théories de grande unification prédisent leur existence, mais aucune n'a jamais été détectée expérimentalement — la recherche continue.</p>
    <p><strong>Technologie émergente :</strong> les moteurs à plasma à effet Hall, utilisés par les satellites et certaines sondes spatiales, exploitent directement la force de Lorentz pour accélérer des ions et produire une poussée sans combustion chimique — une technologie clé pour les missions spatiales de longue durée.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Charges sources (immobiles ou en mouvement) → création de champs $\\vec E$ et $\\vec B$ en tout point de l'espace → force de Lorentz sur toute charge présente
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{F} = q\\left(\\vec{E} + \\vec{v}\\wedge\\vec{B}\\right)$$
      Toute l'électrodynamique du semestre consiste à savoir calculer $\\vec E$ et $\\vec B$ pour des sources de plus en plus générales ; une fois ces champs connus, cette unique équation donne la force sur n'importe quelle charge.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La force électrique entre deux électrons est environ $10^{42}$ fois plus intense que leur force gravitationnelle mutuelle</li>
        <li>La loi de Coulomb $\\vec{F}=k_c q_1q_2/r^2\\,\\hat{u}$ n'est valable que pour des charges immobiles</li>
        <li>La force de Lorentz $\\vec{F}=q(\\vec{E}+\\vec{v}\\wedge\\vec{B})$ est toujours valable, quel que soit le mouvement de la charge</li>
        <li>Le champ électrique $\\vec{E}$ est une force par unité de charge, indépendante de la charge test utilisée pour le mesurer</li>
        <li>L'électromagnétisme, unifié par Maxwell en 1864, est l'une des quatre interactions fondamentales de la Nature</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser la loi de Coulomb pour des charges en mouvement : elle ne décrit que le cas statique</li>
        <li>Oublier que la force magnétique $q\\vec{v}\\wedge\\vec{B}$ ne travaille jamais, car elle est toujours perpendiculaire à $\\vec{v}$</li>
        <li>Confondre le champ $\\vec{E}$ (propriété de l'espace créée par les sources) avec la force $\\vec{F}=q\\vec{E}$ (qui dépend en plus de la charge test)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le rapport entre force électrique et force gravitationnelle entre deux électrons est de l'ordre de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag1e1" value="wrong"> $10^{2}$</label>
          <label class="option"><input type="radio" name="emag1e1" value="wrong"> $10^{10}$</label>
          <label class="option"><input type="radio" name="emag1e1" value="right"> $10^{42}$</label>
          <label class="option"><input type="radio" name="emag1e1" value="wrong"> $10^{-42}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag1e1','emag1fb1','Correct — F_e/F_g ≈ 0,23×10⁴², la force électrique domine très largement à l\'échelle de deux particules élémentaires.','Reviens à la comparaison numérique F_e/F_g de la section 1 : l\'exposant est proche de 42, pas de 2 ni 10.')">Vérifier</button>
        <div class="feedback" id="emag1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La force de Lorentz $\\vec{F}=q(\\vec{E}+\\vec{v}\\wedge\\vec{B})$ est valable :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag1e2" value="wrong"> uniquement pour des charges immobiles</label>
          <label class="option"><input type="radio" name="emag1e2" value="wrong"> uniquement en l'absence de champ magnétique</label>
          <label class="option"><input type="radio" name="emag1e2" value="right"> toujours, que la charge soit immobile ou en mouvement</label>
          <label class="option"><input type="radio" name="emag1e2" value="wrong"> uniquement en régime sinusoïdal</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag1e2','emag1fb2','Correct — contrairement à la loi de Coulomb seule, la force de Lorentz reste valable dans tous les cas.','Relis la section 3 : c\'est justement l\'intérêt de la force de Lorentz par rapport à la loi de Coulomb seule.')">Vérifier</button>
        <div class="feedback" id="emag1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La force magnétique $q\\vec{v}\\wedge\\vec{B}$ exercée sur une charge en mouvement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag1e3" value="wrong"> accélère toujours la charge dans le sens du mouvement</label>
          <label class="option"><input type="radio" name="emag1e3" value="right"> ne travaille jamais, car elle est perpendiculaire à la vitesse</label>
          <label class="option"><input type="radio" name="emag1e3" value="wrong"> est parallèle à $\\vec{B}$</label>
          <label class="option"><input type="radio" name="emag1e3" value="wrong"> n'existe que si $\\vec{E}=\\vec{0}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag1e3','emag1fb3','Correct — le produit vectoriel v∧B est toujours perpendiculaire à v, donc la puissance F·v de la force magnétique est nulle.','Pense à la définition du produit vectoriel : v∧B est perpendiculaire à v par construction.')">Vérifier</button>
        <div class="feedback" id="emag1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la charge électrique pouvait prendre n'importe quelle valeur (et non des multiples de la charge élémentaire $e$) : cela changerait-il la validité de la force de Lorentz ?</li>
        <li>Pourquoi la physique a-t-elle mis plus de deux mille ans à unifier des phénomènes aussi visibles que l'électricité statique et le magnétisme, alors qu'ils étaient tous deux connus depuis l'Antiquité ?</li>
        <li>Quelle serait la conséquence, pour la technologie moderne, si la force magnétique travaillait réellement sur les charges en mouvement (au lieu d'être toujours perpendiculaire à la vitesse) ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. C. Maxwell, <em>A Dynamical Theory of the Electromagnetic Field</em>, Philosophical Transactions of the Royal Society, 1865 — le mémoire fondateur de l'unification électromagnétique.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — référence standard pour la licence de physique.</li>
        <li>ATLAS Collaboration, « Observation of a New Particle in the Search for the Standard Model Higgs Boson », Physics Letters B, 2012.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu tiens maintenant la clé de voûte de tout le cours : la force de Lorentz, valable en toute circonstance. Le chapitre suivant, « Systèmes de coordonnées et calcul vectoriel », te donnera les outils mathématiques nécessaires pour manipuler des champs qui varient dans l'espace à trois dimensions — indispensable avant de calculer le premier champ électrique créé par une distribution de charges. Comme le disait Maxwell lui-même : « L'unique différence entre un problème difficile et un problème impossible, c'est qu'un problème difficile a déjà été résolu par quelqu'un d'autre. » L'électromagnétisme en est la preuve éclatante.</p>
  `
};

EMAG_NOVA_KB[emagKey('Introduction : forces fondamentales, champs et force de Lorentz')] = {
  intro: "Salut, moi c'est Nova ! On commence l'Électromagnétisme par les forces fondamentales et la force de Lorentz. Demande-moi le rapport force électrique/gravitationnelle, ce qu'est la force de Lorentz, ou pourquoi on utilise des champs.",
  rules: [
    { test:/lorentz/i, replies:["La force de Lorentz F=q(E+v∧B) donne l'action d'un champ électrique et d'un champ magnétique sur une charge q de vitesse v. Elle est toujours valable, contrairement à la loi de Coulomb seule qui suppose des charges immobiles."] },
    { test:/coulomb/i, replies:["La loi de Coulomb F=k_c q1q2/r² û décrit la force entre deux charges immobiles. Dès que les charges bougent, cette formule simple ne suffit plus : c'est pour cela qu'on introduit les champs E et B."] },
    { test:/pourquoi.*champ|notion de champ/i, replies:["Décrire directement une force à distance entre charges en mouvement est très compliqué. On préfère séparer le problème : les sources créent des champs E et B en tout point de l'espace, puis ces champs agissent sur toute charge présente via la force de Lorentz."] },
    { test:/gravit|rapport.*force/i, replies:["Entre deux électrons, F_e/F_g ≈ 0,23×10⁴² : la force électrique domine totalement la gravité à l'échelle des particules. C'est seulement parce que la matière est globalement neutre que l'on ne ressent pas cette domination à notre échelle."] },
    { test:/quatre interactions|interactions fondamentales/i, replies:["Les quatre interactions fondamentales sont : gravitationnelle, électromagnétique, nucléaire forte et nucléaire faible. L'électromagnétisme, unifié par Maxwell en 1864, est celle qui gouverne directement notre expérience quotidienne (chimie, lumière, électronique)."] },
    { test:/champ électrique.*définition|qu'est-ce que le champ/i, replies:["Le champ électrique E créé par une charge q1 en un point est la force par unité de charge que ressentirait une charge test placée en ce point : E=F/q2. Il ne dépend que de la source, jamais de la charge test."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde le rapport F_e/F_g calculé dans la section 1.","Indice niveau 2 : ce rapport est de l'ordre de 0,23 fois une puissance de 10 à deux chiffres.","Indice niveau 3 : l'exposant est 42."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare avec la loi de Coulomb, qui elle a une restriction.","Indice niveau 2 : la force de Lorentz a justement été introduite pour lever cette restriction.","Indice niveau 3 : elle est valable toujours, mouvement ou pas."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la géométrie du produit vectoriel v∧B.","Indice niveau 2 : un vecteur perpendiculaire à v ne peut pas produire de travail (puissance F·v).","Indice niveau 3 : la force magnétique ne travaille jamais."] }
  ]
};

/* =========================== CHAPITRE 2 — Systèmes de coordonnées et calcul vectoriel =========================== */
EMAG_CHAPTERS[emagKey('Systèmes de coordonnées et calcul vectoriel')] = {
  objectives: [
    "Utiliser les systèmes de coordonnées cartésiennes, cylindriques et sphériques pour repérer un point et écrire les éléments de longueur, surface et volume",
    "Distinguer champ scalaire et champ vectoriel, et donner des exemples physiques de chacun",
    "Manipuler un vecteur par ses composantes et calculer un produit scalaire",
    "Construire un vecteur unitaire à partir d'un vecteur quelconque",
    "Analyser la symétrie d'une distribution de charges pour choisir le système de coordonnées qui simplifie le plus le calcul du champ"
  ],
  prereqs: ["Introduction : forces fondamentales, champs et force de Lorentz"],
  bodyHtml: `
    <p>Décrire un phénomène physique dans l'espace suppose d'abord de savoir s'y repérer — et ce choix n'a rien d'anodin. Quand les mathématiciens du XVIIe siècle (Descartes en tête) inventent les coordonnées cartésiennes, ils réalisent un tour de force conceptuel : transformer la géométrie, discipline visuelle, en algèbre, discipline calculatoire. Mais très vite, les physiciens s'aperçoivent qu'un unique système ne suffit pas : décrire le champ créé par un fil rectiligne en coordonnées cartésiennes revient à s'infliger un calcul inutilement pénible, alors que le même problème devient presque trivial en coordonnées cylindriques.</p>
    <p>Ce choix judicieux du système de coordonnées n'est pas qu'un confort de calcul académique : les ingénieurs qui modélisent le champ électrique autour d'un câble haute tension, ou les géophysiciens qui étudient le champ magnétique terrestre (à symétrie quasi sphérique), exploitent exactement cette même logique — épouser la symétrie du problème pour réduire une intégrale triple redoutable à un calcul d'une seule variable.</p>
    <p>Avant de décrire des champs électriques et magnétiques dans l'espace, il faut d'abord savoir se repérer et s'orienter dans cet espace. Ce chapitre pose les outils géométriques indispensables à tout le reste du cours : systèmes de coordonnées et calcul vectoriel de base. À la fin, face à n'importe quelle distribution de charges, tu sauras immédiatement quel système de coordonnées adopter pour que le calcul se simplifie au maximum.</p>

    <h3>1. La notion de champ</h3>
    <p>On appelle <strong>champ scalaire</strong> l'association, à chaque point de l'espace, d'un unique nombre (par exemple la température ou l'altitude). On appelle <strong>champ vectoriel</strong> l'association, à chaque point, d'un vecteur possédant une longueur et une orientation (par exemple le vent ou un champ de vitesses). Les champs $\\vec{E}$ et $\\vec{B}$ étudiés dans ce cours sont des champs vectoriels.</p>

    <h3>2. Coordonnées cartésiennes</h3>
    <table class="mini-table">
      <tr><th>Variable</th><th>Domaine</th><th>Longueur élémentaire</th></tr>
      <tr><td>$x$</td><td>$]-\\infty,\\infty[$</td><td>$dx$</td></tr>
      <tr><td>$y$</td><td>$]-\\infty,\\infty[$</td><td>$dy$</td></tr>
      <tr><td>$z$</td><td>$]-\\infty,\\infty[$</td><td>$dz$</td></tr>
    </table>
    <p>Surface élémentaire : $dxdy$ ($z$ constant), $dydz$ ($x$ constant), $dzdx$ ($y$ constant). Volume élémentaire : $dV = dxdydz$. Vecteur de position : $\\vec{r} = x\\hat{e}_x + y\\hat{e}_y + z\\hat{e}_z$. C'est un système d'exception : les trois variables ont la même dimension (une longueur) et jouent des rôles parfaitement équivalents.</p>

    <h3>3. Coordonnées cylindriques</h3>
    <table class="mini-table">
      <tr><th>Variable</th><th>Domaine</th><th>Longueur élémentaire</th></tr>
      <tr><td>$\\rho$</td><td>$[0,\\infty[$</td><td>$d\\rho$</td></tr>
      <tr><td>$\\varphi$</td><td>$[0,2\\pi]$</td><td>$\\rho\\, d\\varphi$</td></tr>
      <tr><td>$z$</td><td>$]-\\infty,\\infty[$</td><td>$dz$</td></tr>
    </table>
    <p>Volume élémentaire : $dV = \\rho\\, d\\rho\\, d\\varphi\\, dz$. Vecteur de position : $\\vec{r} = \\rho\\hat{e}_\\rho + z\\hat{e}_z$. Adapté aux problèmes présentant une symétrie autour d'un axe (fil rectiligne, câble coaxial, solénoïde).</p>

    <h3>4. Coordonnées sphériques</h3>
    <table class="mini-table">
      <tr><th>Variable</th><th>Domaine</th><th>Longueur élémentaire</th></tr>
      <tr><td>$r$</td><td>$[0,\\infty[$</td><td>$dr$</td></tr>
      <tr><td>$\\theta$</td><td>$[0,\\pi]$</td><td>$r\\, d\\theta$</td></tr>
      <tr><td>$\\varphi$</td><td>$[0,2\\pi]$</td><td>$r\\sin\\theta\\, d\\varphi$</td></tr>
    </table>
    <p>Volume élémentaire : $dV = r^2\\sin\\theta\\, dr\\, d\\theta\\, d\\varphi$. Vecteur de position : $\\vec{r} = r\\hat{e}_r$. Adapté aux problèmes présentant une symétrie autour d'un point (charge ponctuelle, sphère chargée).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pourquoi le facteur $r^2\\sin\\theta$ apparaît-il dans $dV$ en sphériques, alors qu'il n'y a aucun facteur de ce type en cartésiennes ? Repense à la longueur réelle parcourue quand $\\varphi$ varie d'un petit angle $d\\varphi$ : est-elle la même près du pôle ($\\theta$ proche de 0) qu'à l'équateur ($\\theta=\\pi/2$) ?
    </div>

    <h3>5. Vecteurs, produit scalaire, vecteur unitaire</h3>
    <p>Un vecteur $\\vec{A}$ possède une norme (notée $\\|\\vec{A}\\|$ ou $A$), une direction et un sens ; il est défini par trois composantes qui dépendent du système de coordonnées choisi, mais le vecteur lui-même n'en dépend pas :</p>
    <p>$$\\vec{A} = \\begin{pmatrix}A_1\\\\A_2\\\\A_3\\end{pmatrix}$$</p>
    <p>Le <strong>produit scalaire</strong> $\\vec{A}\\cdot\\vec{B} = AB\\cos\\alpha$ (où $\\alpha$ est l'angle entre les deux vecteurs) s'interprète comme la projection d'un vecteur sur l'autre ; il apparaît naturellement dans le calcul du travail d'une force ou d'un flux à travers une surface.</p>
    <p>Enfin, à partir de tout vecteur non nul $\\vec{A}$, on construit un <strong>vecteur unitaire</strong> $\\hat{u}_A = \\vec{A}/\\|\\vec{A}\\|$, de même orientation que $\\vec{A}$ mais de norme égale à 1. C'est cette construction qui apparaît dans la loi de Coulomb sous la forme $\\hat{u}_{1\\to2}$.</p>

    <div class="key-point">
      <span class="eyebrow">Comment choisir son système de coordonnées</span>
      Le bon réflexe est d'exploiter la symétrie du problème : coordonnées cartésiennes pour un plan infini, cylindriques pour un fil ou un cylindre, sphériques pour une charge ou une sphère. Un bon choix de coordonnées peut transformer un calcul d'intégrale triple redoutable en une intégrale simple.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le vecteur unitaire radial $\\hat e_r$ (en sphériques) ou $\\hat e_\\rho$ (en cylindriques) change de direction selon le point où l'on se place, contrairement à $\\hat e_x$, $\\hat e_y$, $\\hat e_z$ qui sont fixes. Quelle précaution cela impose-t-il quand on additionne deux champs électriques calculés en deux points différents de l'espace ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le choix du bon système de coordonnées ne se limite pas à la licence : en relativité générale, Einstein doit choisir des coordonnées adaptées à la courbure de l'espace-temps autour d'un objet massif — c'est ainsi que Karl Schwarzschild, dès 1916, trouve une solution exacte aux équations d'Einstein en coordonnées sphériques, aujourd'hui à la base de toute la physique des trous noirs.</p>
    <p><strong>Question ouverte :</strong> pour des géométries plus exotiques (un tore, une surface fractale), existe-t-il toujours un système de coordonnées « naturel » qui simplifie les calculs comme le font les coordonnées sphériques pour une symétrie sphérique ? La question reste ouverte pour de nombreuses géométries rencontrées en physique de la matière condensée.</p>
    <p><strong>Technologie émergente :</strong> les logiciels de simulation par éléments finis (utilisés en ingénierie pour modéliser des champs électromagnétiques complexes) automatisent aujourd'hui le choix, voire la déformation continue, du système de coordonnées le plus adapté à une géométrie 3D quelconque.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Symétrie de la source → choix du système de coordonnées adapté → expression simplifiée de $dV$ et des vecteurs → calcul du champ facilité
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\hat{u}_A = \\frac{\\vec{A}}{\\|\\vec{A}\\|}$$
      Cette construction, apparemment anodine, est celle qui donne sa direction à chaque champ que tu calculeras dans ce cours : le champ électrique d'une charge ponctuelle, par exemple, s'écrit toujours (source) × (vecteur unitaire radial).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Champ scalaire : un nombre par point de l'espace ; champ vectoriel : un vecteur par point de l'espace</li>
        <li>Coordonnées cartésiennes $(x,y,z)$ : les trois variables sont des longueurs équivalentes, $dV=dxdydz$</li>
        <li>Coordonnées cylindriques $(\\rho,\\varphi,z)$ : $dV=\\rho\\,d\\rho\\,d\\varphi\\,dz$, adaptées à la symétrie axiale</li>
        <li>Coordonnées sphériques $(r,\\theta,\\varphi)$ : $dV=r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\varphi$, adaptées à la symétrie sphérique</li>
        <li>Le vecteur unitaire $\\hat{u}_A=\\vec{A}/\\|\\vec{A}\\|$ garde l'orientation de $\\vec{A}$ mais a une norme égale à 1</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser $dV=dr\\,d\\theta\\,d\\varphi$ en sphériques en oubliant le facteur $r^2\\sin\\theta$</li>
        <li>Confondre l'angle $\\theta$ (polaire, mesuré depuis l'axe $z$) et $\\varphi$ (azimutal, dans le plan $xy$)</li>
        <li>Oublier que les composantes d'un vecteur changent avec le système de coordonnées, mais pas le vecteur lui-même</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le volume élémentaire en coordonnées sphériques s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag2e1" value="wrong"> $dV=dr\\,d\\theta\\,d\\varphi$</label>
          <label class="option"><input type="radio" name="emag2e1" value="wrong"> $dV=r\\,dr\\,d\\theta\\,d\\varphi$</label>
          <label class="option"><input type="radio" name="emag2e1" value="right"> $dV=r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\varphi$</label>
          <label class="option"><input type="radio" name="emag2e1" value="wrong"> $dV=\\rho\\,d\\rho\\,d\\varphi\\,dz$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag2e1','emag2fb1','Correct — le facteur r²sinθ vient des deux longueurs élémentaires r dθ et r sinθ dφ.','Reviens au tableau des coordonnées sphériques : il manque un facteur qui dépend à la fois de r et de θ.')">Vérifier</button>
        <div class="feedback" id="emag2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour décrire un fil rectiligne infini chargé, le système de coordonnées le plus adapté est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag2e2" value="wrong"> cartésien</label>
          <label class="option"><input type="radio" name="emag2e2" value="right"> cylindrique</label>
          <label class="option"><input type="radio" name="emag2e2" value="wrong"> sphérique</label>
          <label class="option"><input type="radio" name="emag2e2" value="wrong"> aucun des trois, il faut un système spécial</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag2e2','emag2fb2','Correct — un fil rectiligne infini possède une symétrie de révolution autour de son axe : les coordonnées cylindriques exploitent directement cette symétrie.','Pense à la forme géométrique de la source : elle possède un axe de symétrie, pas un centre.')">Vérifier</button>
        <div class="feedback" id="emag2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le vecteur unitaire $\\hat{u}_A$ construit à partir d'un vecteur $\\vec{A}$ vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag2e3" value="wrong"> $\\hat{u}_A = \\|\\vec{A}\\|\\,\\vec{A}$</label>
          <label class="option"><input type="radio" name="emag2e3" value="right"> $\\hat{u}_A = \\vec{A}/\\|\\vec{A}\\|$, de norme 1</label>
          <label class="option"><input type="radio" name="emag2e3" value="wrong"> $\\hat{u}_A$ est toujours perpendiculaire à $\\vec{A}$</label>
          <label class="option"><input type="radio" name="emag2e3" value="wrong"> $\\hat{u}_A$ n'existe que si $\\vec{A}$ est déjà unitaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag2e3','emag2fb3','Correct — diviser un vecteur par sa propre norme donne un vecteur de norme 1, de même direction et sens.','Repense à la définition : on veut garder l\'orientation de A mais imposer une norme égale à 1.')">Vérifier</button>
        <div class="feedback" id="emag2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'espace physique avait quatre dimensions au lieu de trois : combien d'angles faudrait-il pour repérer un point en « coordonnées hypersphériques » ?</li>
        <li>Pourquoi les coordonnées cylindriques et sphériques utilisent-elles des longueurs élémentaires différentes de simples $d\\rho$, $d\\theta$ ou $d\\varphi$, alors que les coordonnées cartésiennes se contentent de $dx$, $dy$, $dz$ ?</li>
        <li>Quelle serait la conséquence, pour la précision d'une simulation numérique de champ électrique, d'un choix de coordonnées mal adapté à la symétrie du problème ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Descartes, <em>La Géométrie</em>, 1637 — l'ouvrage fondateur des coordonnées cartésiennes.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur les outils mathématiques de l'électromagnétisme.</li>
        <li>K. Schwarzschild, « Über das Gravitationsfeld eines Massenpunktes nach der Einsteinschen Theorie », Sitzungsberichte der Königlich Preußischen Akademie der Wissenschaften, 1916.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant de la boîte à outils géométrique complète : trois systèmes de coordonnées, et les bases du calcul vectoriel. Le chapitre suivant, « Flux d'un champ vectoriel, loi de Gauss et divergence », va te montrer comment ces outils permettent de calculer un champ électrique en quelques lignes là où la loi de Coulomb seule exigerait des pages de calcul. Comme le disait Henri Poincaré : « La pensée n'est qu'un éclair au milieu d'une longue nuit. Mais c'est cet éclair qui est tout. » Choisir le bon système de coordonnées, c'est souvent provoquer cet éclair.</p>
  `
};

EMAG_NOVA_KB[emagKey('Systèmes de coordonnées et calcul vectoriel')] = {
  intro: "Salut, moi c'est Nova ! On voit ici les systèmes de coordonnées (cartésien, cylindrique, sphérique) et les bases du calcul vectoriel. Demande-moi le volume élémentaire en sphériques, comment choisir son système de coordonnées, ou ce qu'est un vecteur unitaire.",
  rules: [
    { test:/sph[ée]rique/i, replies:["En coordonnées sphériques (r,θ,φ), le volume élémentaire est dV=r²sinθ dr dθ dφ, avec r la distance à l'origine, θ l'angle polaire (depuis l'axe z) et φ l'angle azimutal."] },
    { test:/cylindrique/i, replies:["En coordonnées cylindriques (ρ,φ,z), le volume élémentaire est dV=ρ dρ dφ dz. Elles sont adaptées à toute source possédant un axe de symétrie (fil, cylindre, solénoïde)."] },
    { test:/cart[ée]sien/i, replies:["En coordonnées cartésiennes (x,y,z), dV=dxdydz. C'est le seul système où les trois variables ont exactement le même statut (toutes des longueurs)."] },
    { test:/choisir.*coordonn[ée]es|quel syst[èe]me/i, replies:["Le critère est la symétrie de la source : plan infini → cartésien, fil ou cylindre → cylindrique, charge ponctuelle ou sphère → sphérique. Exploiter la bonne symétrie simplifie énormément les calculs."] },
    { test:/vecteur unitaire/i, replies:["Un vecteur unitaire û_A=A/‖A‖ a la même direction et le même sens que A, mais une norme égale à 1. On l'utilise pour indiquer une direction sans se soucier de la longueur."] },
    { test:/produit scalaire/i, replies:["Le produit scalaire A·B=AB cos α mesure la projection d'un vecteur sur l'autre. Il vaut 0 si les vecteurs sont perpendiculaires, et AB si les vecteurs sont colinéaires de même sens."] },
    { test:/champ scalaire.*vectoriel|diff[ée]rence.*champ/i, replies:["Un champ scalaire associe un nombre à chaque point (température), un champ vectoriel associe un vecteur, avec longueur et orientation, à chaque point (vent, champ E ou B)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : combine les deux longueurs élémentaires r dθ et r sinθ dφ avec dr.","Indice niveau 2 : le produit des trois fait apparaître r² et sinθ.","Indice niveau 3 : dV=r²sinθ dr dθ dφ."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelle est la forme géométrique de la source ?","Indice niveau 2 : un fil rectiligne a un axe de symétrie, pas un centre.","Indice niveau 3 : coordonnées cylindriques."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : que veut-on garder, et que veut-on imposer ?","Indice niveau 2 : on garde la direction, on impose la norme.","Indice niveau 3 : û_A=A/‖A‖, de norme 1."] }
  ]
};

/* =========================== CHAPITRE 3 — Flux d'un champ vectoriel, loi de Gauss et divergence =========================== */
EMAG_CHAPTERS[emagKey('Flux d\'un champ vectoriel, loi de Gauss et divergence')] = {
  objectives: [
    "Définir le flux d'un champ vectoriel à travers une surface, ouverte ou fermée",
    "Énoncer la loi de Gauss sous sa forme intégrale et l'appliquer à des distributions à haute symétrie",
    "Définir la divergence d'un champ vectoriel et l'interpréter physiquement",
    "Passer de la forme intégrale à la forme locale de la loi de Gauss grâce au théorème de la divergence",
    "Évaluer, avant tout calcul, si une distribution de charges possède une symétrie suffisante pour appliquer efficacement la loi de Gauss"
  ],
  prereqs: ["Systèmes de coordonnées et calcul vectoriel"],
  bodyHtml: `
    <p>En 1835, Carl Friedrich Gauss — l'un des plus grands mathématiciens de tous les temps, surnommé le « prince des mathématiciens » — formule un théorème qui semble d'abord purement géométrique : relier le flux d'un champ à travers une surface fermée à ce que cette surface contient. Appliqué à l'électricité, ce théorème devient l'un des quatre piliers sur lesquels Maxwell bâtira, trente ans plus tard, l'édifice complet de l'électromagnétisme.</p>
    <p>Sa force pratique est immense : calculer le champ électrique créé par une sphère chargée directement par la loi de Coulomb demanderait une intégrale à trois dimensions redoutable ; la loi de Gauss, elle, résout le même problème en trois lignes, à condition de savoir exploiter intelligemment la symétrie. C'est exactement cette même astuce que les ingénieurs utilisent pour calculer le champ à l'intérieur d'un câble coaxial ou entre les armatures d'un condensateur plan.</p>
    <p>La loi de Gauss est l'un des quatre piliers de l'électromagnétisme : elle relie le champ électrique traversant une surface fermée à la charge qu'elle contient. Ce chapitre construit cette loi à partir de la notion de flux, puis en donne une version locale grâce à l'opérateur divergence. À la fin, tu sauras reconnaître en un coup d'œil les problèmes où la loi de Gauss transforme un calcul complexe en une trivialité.</p>

    <h3>1. Flux d'un champ vectoriel</h3>
    <p>Le flux élémentaire d'un champ $\\vec{A}$ à travers une surface élémentaire $d\\vec{S}$ (orientée par sa normale $\\hat{n}$) est $d\\Phi = \\vec{A}\\cdot d\\vec{S} = \\vec{A}\\cdot\\hat{n}\\,dS$. Le flux total à travers une surface $S$ est :</p>
    <p>$$\\Phi = \\iint_S \\vec{A}\\cdot d\\vec{S}$$</p>
    <p>Le flux mesure la quantité de champ qui « traverse » la surface : il est maximal quand $\\vec{A}$ est perpendiculaire à la surface (parallèle à $\\hat{n}$), et nul quand $\\vec{A}$ est tangent à la surface.</p>

    <h3>2. La loi de Gauss (forme intégrale)</h3>
    <p>Pour une <strong>surface fermée</strong> $S$, la loi de Gauss énonce que le flux du champ électrique sortant est proportionnel à la charge totale $Q_{int}$ contenue à l'intérieur de $S$ :</p>
    <p>$$\\oint_S \\vec{E}\\cdot d\\vec{S} = \\dfrac{Q_{int}}{\\epsilon_0}$$</p>
    <p>Cette loi est extrêmement puissante lorsqu'on choisit une <strong>surface de Gauss</strong> adaptée à la symétrie du problème (sphère pour une charge ponctuelle, cylindre pour un fil infini, « boîte à pilules » pour un plan infini) : $\\vec{E}$ est alors constant en norme sur toute la surface et perpendiculaire à celle-ci, ce qui permet de sortir $E$ de l'intégrale.</p>

    <h3>3. Principe de superposition</h3>
    <p>Le champ créé par un ensemble de sources est la somme vectorielle des champs que créerait chaque source seule : $\\vec{E} = \\vec{E}_1 + \\vec{E}_2 + \\dots$. Ce principe, conséquence directe de la linéarité des équations de l'électromagnétisme, permet par exemple de retrouver le champ créé par deux plans infinis de charges opposées : nul à l'extérieur, uniforme entre les plans (cas du condensateur plan).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La loi de Gauss est toujours vraie, même quand $Q_{int}=0$ mais qu'il existe des charges à l'extérieur de la surface. Dans ce cas, pourquoi le flux total est-il nul alors que le champ électrique en chaque point de la surface, lui, n'est généralement pas nul ?
    </div>

    <h3>4. Divergence : la version locale du flux</h3>
    <p>Découpons un volume fermé en petits volumes élémentaires. Le flux sortant du volume total est la somme des flux sortants de chaque petit volume (les contributions des faces internes s'annulent deux à deux). On définit alors la <strong>divergence</strong> d'un champ $\\vec{A}$ en un point comme le flux sortant par unité de volume, dans la limite d'un volume infinitésimal :</p>
    <p>$$\\text{div}\\,\\vec{A} = \\nabla\\cdot\\vec{A} = \\lim_{V\\to 0}\\dfrac{1}{V}\\oint_S \\vec{A}\\cdot d\\vec{S}$$</p>
    <p>En coordonnées cartésiennes : $\\nabla\\cdot\\vec{A} = \\dfrac{\\partial A_x}{\\partial x} + \\dfrac{\\partial A_y}{\\partial y} + \\dfrac{\\partial A_z}{\\partial z}$. La divergence mesure si un point de l'espace se comporte comme une « source » ($\\text{div}\\,\\vec{A}>0$) ou un « puits » ($\\text{div}\\,\\vec{A}<0$) du champ.</p>

    <h3>5. Théorème de la divergence (Green-Ostrogradski)</h3>
    <p>Ce théorème relie une intégrale de surface (flux à travers une surface fermée) à une intégrale de volume (divergence sur le volume délimité) :</p>
    <p>$$\\oint_S \\vec{A}\\cdot d\\vec{S} = \\iiint_V (\\nabla\\cdot\\vec{A})\\, dV$$</p>
    <p>En appliquant ce théorème à la loi de Gauss, et en écrivant $Q_{int}=\\iiint_V \\rho\\, dV$ avec $\\rho$ la densité volumique de charge, on obtient l'égalité valable pour tout volume $V$ :</p>
    <p>$$\\iiint_V (\\nabla\\cdot\\vec{E})\\,dV = \\iiint_V \\dfrac{\\rho}{\\epsilon_0}\\,dV \\quad\\Longrightarrow\\quad \\boxed{\\nabla\\cdot\\vec{E} = \\dfrac{\\rho}{\\epsilon_0}}$$</p>
    <p>C'est la <strong>forme locale</strong> de la loi de Gauss, valable en tout point de l'espace : elle relie directement la divergence du champ électrique en un point à la densité de charge en ce même point.</p>

    <div class="key-point">
      <span class="eyebrow">Intégrale ou locale ?</span>
      La forme intégrale $\\oint\\vec{E}\\cdot d\\vec{S}=Q_{int}/\\epsilon_0$ est un outil de calcul, très efficace quand la symétrie du problème est haute. La forme locale $\\nabla\\cdot\\vec{E}=\\rho/\\epsilon_0$ est un outil théorique, valable point par point, qui prépare directement les équations de Maxwell.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La divergence du champ magnétique $\\vec B$ est toujours nulle ($\\nabla\\cdot\\vec B=0$, tu le verras dans un chapitre ultérieur), contrairement à celle de $\\vec E$. Quelle différence physique fondamentale entre les sources électriques et magnétiques cette différence traduit-elle ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La loi de Gauss ne s'applique pas qu'à l'électromagnétisme : en 1998, l'observation de supernovae lointaines a révélé que l'expansion de l'Univers accélère, ce qui a conduit à l'hypothèse de l'« énergie sombre ». Or, en relativité générale, on écrit des lois de Gauss généralisées reliant la courbure de l'espace-temps (l'équivalent du flux) au contenu en masse-énergie (l'équivalent de la charge) — une parenté mathématique profonde entre gravitation et électromagnétisme, récompensée par le prix Nobel de physique 2011.</p>
    <p><strong>Question ouverte :</strong> la loi de Gauss suppose une force en $1/r^2$ exacte. Des expériences ultra-précises cherchent encore aujourd'hui d'éventuels écarts à cette loi à très courte distance (sub-millimétrique), qui trahiraient l'existence de dimensions spatiales supplémentaires prédites par certaines théories au-delà du Modèle Standard.</p>
    <p><strong>Technologie émergente :</strong> les capteurs de champ électrique à très haute sensibilité (utilisés en météorologie pour prévoir les orages) exploitent directement la loi de Gauss pour remonter à la charge accumulée dans un nuage à partir du flux mesuré à sa surface.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Charge $Q_{int}$ → flux à travers une surface fermée (loi de Gauss intégrale) → théorème de la divergence → loi de Gauss locale $\\nabla\\cdot\\vec E=\\rho/\\epsilon_0$
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\oint_S \\vec{E}\\cdot d\\vec{S} = \\frac{Q_{int}}{\\epsilon_0} \\quad\\Longleftrightarrow\\quad \\nabla\\cdot\\vec{E} = \\frac{\\rho}{\\epsilon_0}$$
      Ces deux écritures — intégrale et locale — sont rigoureusement équivalentes ; la première est l'outil de calcul pratique, la seconde deviendra la première des quatre équations de Maxwell.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le flux $\\Phi=\\iint\\vec{A}\\cdot d\\vec{S}$ mesure la quantité de champ traversant une surface</li>
        <li>Loi de Gauss (intégrale) : $\\oint_S\\vec{E}\\cdot d\\vec{S}=Q_{int}/\\epsilon_0$, très efficace avec une surface de Gauss adaptée à la symétrie</li>
        <li>Principe de superposition : le champ total est la somme vectorielle des champs de chaque source</li>
        <li>La divergence $\\nabla\\cdot\\vec{A}$ mesure le flux sortant par unité de volume ; source si positive, puits si négative</li>
        <li>Loi de Gauss (locale), obtenue via le théorème de la divergence : $\\nabla\\cdot\\vec{E}=\\rho/\\epsilon_0$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la loi de Gauss avec une surface qui n'exploite pas la symétrie du problème : le calcul devient alors impossible à mener simplement</li>
        <li>Oublier que $Q_{int}$ ne compte que les charges à l'intérieur de la surface fermée, pas les charges extérieures (qui contribuent tout de même au champ E localement, mais leur flux net est nul)</li>
        <li>Confondre flux à travers une surface ouverte (dépend du contour choisi) et flux à travers une surface fermée (ne dépend que des charges intérieures)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La forme locale de la loi de Gauss s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag3e1" value="wrong"> $\\oint_S\\vec{E}\\cdot d\\vec{S}=Q_{int}/\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag3e1" value="right"> $\\nabla\\cdot\\vec{E}=\\rho/\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag3e1" value="wrong"> $\\nabla\\wedge\\vec{E}=\\vec{0}$</label>
          <label class="option"><input type="radio" name="emag3e1" value="wrong"> $\\vec{E}=-\\nabla V$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag3e1','emag3fb1','Correct — c\'est la version « point par point » de la loi de Gauss, obtenue via le théorème de la divergence.','La forme locale s\'exprime avec l\'opérateur divergence, pas avec une intégrale de surface.')">Vérifier</button>
        <div class="feedback" id="emag3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour calculer le champ créé par un fil infini avec la loi de Gauss, la surface de Gauss la plus adaptée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag3e2" value="wrong"> une sphère centrée sur le fil</label>
          <label class="option"><input type="radio" name="emag3e2" value="right"> un cylindre coaxial au fil</label>
          <label class="option"><input type="radio" name="emag3e2" value="wrong"> un plan perpendiculaire au fil</label>
          <label class="option"><input type="radio" name="emag3e2" value="wrong"> un cube quelconque</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag3e2','emag3fb2','Correct — le cylindre coaxial respecte la symétrie du fil : E est constant en norme et perpendiculaire à la surface latérale.','Cherche la surface qui respecte la symétrie de révolution autour du fil.')">Vérifier</button>
        <div class="feedback" id="emag3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si $\\nabla\\cdot\\vec{A}<0$ en un point, ce point se comporte comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag3e3" value="wrong"> une source du champ A</label>
          <label class="option"><input type="radio" name="emag3e3" value="right"> un puits du champ A</label>
          <label class="option"><input type="radio" name="emag3e3" value="wrong"> un point sans influence sur A</label>
          <label class="option"><input type="radio" name="emag3e3" value="wrong"> un point où A est forcément nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag3e3','emag3fb3','Correct — une divergence négative signifie que le champ converge vers ce point : c\'est un puits.','Repense à l\'interprétation : divergence positive = source, divergence négative = puits.')">Vérifier</button>
        <div class="feedback" id="emag3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la loi de Coulomb variait en $1/r^3$ au lieu de $1/r^2$ : la loi de Gauss sous sa forme actuelle resterait-elle valable ?</li>
        <li>Pourquoi le choix d'une surface de Gauss « intelligente » ne change-t-il jamais la valeur du flux, mais change-t-il radicalement la difficulté du calcul ?</li>
        <li>Quelle serait la conséquence, pour la stabilité de la matière, si la divergence du champ électrique pouvait être positive ET négative au même point ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>C. F. Gauss, <em>Theoria attractionis corporum sphaeroidicorum ellipticorum homogeneorum methodo nova tractata</em>, 1813 — travaux fondateurs sur le théorème du flux.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur la loi de Gauss et ses applications.</li>
        <li>S. Perlmutter et al., « Measurements of Ω and Λ from 42 High-Redshift Supernovae », The Astrophysical Journal, 1999 (travaux ayant valu le prix Nobel de physique 2011).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens d'acquérir l'outil le plus puissant de l'électrostatique : la loi de Gauss, sous ses deux formes, intégrale et locale. Le chapitre suivant, « Potentiel électrostatique, travail et gradient », va te montrer qu'il existe une grandeur scalaire — le potentiel — encore plus simple à manipuler que le champ électrique lui-même, et dont le champ n'est jamais que le gradient. Comme le disait Gauss : « Les mathématiques sont la reine des sciences. » La loi qui porte son nom en est une démonstration éclatante.</p>
  `
};

EMAG_NOVA_KB[emagKey('Flux d\'un champ vectoriel, loi de Gauss et divergence')] = {
  intro: "Salut, moi c'est Nova ! On attaque le flux, la loi de Gauss et la divergence. Demande-moi la loi de Gauss intégrale, comment choisir une surface de Gauss, ou ce qu'est la divergence.",
  rules: [
    { test:/loi de gauss.*locale|forme locale/i, replies:["La forme locale de la loi de Gauss est ∇·E=ρ/ε₀ : elle relie la divergence du champ électrique en un point à la densité de charge en ce même point. On l'obtient à partir de la forme intégrale via le théorème de la divergence."] },
    { test:/loi de gauss/i, replies:["La loi de Gauss (forme intégrale) : le flux de E sortant d'une surface fermée est égal à Q_int/ε₀, où Q_int est la charge totale contenue à l'intérieur de la surface."] },
    { test:/surface de gauss|choisir.*surface/i, replies:["On choisit une surface de Gauss qui respecte la symétrie de la source : sphère pour une charge ponctuelle, cylindre coaxial pour un fil infini, boîte à pilules pour un plan infini. Le champ E devient alors constant sur la surface, ce qui simplifie énormément le calcul."] },
    { test:/divergence/i, replies:["La divergence ∇·A mesure le flux sortant d'un volume par unité de volume, dans la limite d'un volume infinitésimal. Positive : le point est une source du champ. Négative : c'est un puits. Nulle : le champ est conservatif localement (ce qui sera le cas pour B)."] },
    { test:/th[ée]or[èe]me de la divergence|green.ostrogradski/i, replies:["Le théorème de la divergence (Green-Ostrogradski) relie le flux d'un champ à travers une surface fermée à l'intégrale de sa divergence sur le volume intérieur : ∮A·dS=∭(∇·A)dV. C'est l'outil qui permet de passer de la loi de Gauss intégrale à sa forme locale."] },
    { test:/superposition/i, replies:["Le principe de superposition dit que le champ créé par plusieurs sources est la somme vectorielle des champs créés par chaque source prise séparément. C'est une conséquence de la linéarité des équations de l'électromagnétisme."] },
    { test:/flux/i, replies:["Le flux Φ=∬A·dS mesure la quantité de champ A qui traverse une surface. Il est maximal quand A est perpendiculaire à la surface, nul quand A est tangent à la surface."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : cherche l'équation qui utilise l'opérateur divergence, pas une intégrale de surface.","Indice niveau 2 : c'est la version locale, point par point.","Indice niveau 3 : ∇·E=ρ/ε₀."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelle est la symétrie d'un fil infini ?","Indice niveau 2 : une symétrie de révolution autour de son axe.","Indice niveau 3 : cylindre coaxial au fil."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : une divergence négative signifie que le champ converge vers ce point.","Indice niveau 2 : le champ « rentre » plus qu'il ne « sort ».","Indice niveau 3 : c'est un puits."] }
  ]
};

/* =========================== CHAPITRE 4 — Potentiel électrostatique, travail et gradient =========================== */
EMAG_CHAPTERS[emagKey('Potentiel électrostatique, travail et gradient')] = {
  objectives: [
    "Calculer le travail de la force électrostatique lors du déplacement d'une charge",
    "Montrer que ce travail ne dépend pas du chemin suivi et en déduire l'existence d'un potentiel",
    "Définir le potentiel électrostatique créé par une charge ponctuelle",
    "Utiliser le gradient pour passer du potentiel au champ électrique, et inversement",
    "Évaluer, selon la géométrie du problème, s'il est plus efficace de calculer d'abord le potentiel ou directement le champ électrique"
  ],
  prereqs: ["Flux d\'un champ vectoriel, loi de Gauss et divergence"],
  bodyHtml: `
    <p>En 1800, Alessandro Volta empile des disques de zinc et de cuivre séparés par du carton imbibé de saumure : il vient d'inventer la première pile électrique, et avec elle, la notion pratique de « tension » qui portera un jour son nom, le volt. Mais il faudra encore plusieurs décennies aux physiciens pour comprendre que cette tension n'est autre que la différence d'une grandeur scalaire plus fondamentale, présente en tout point de l'espace même en l'absence de tout courant : le potentiel électrostatique.</p>
    <p>Cette grandeur est partout dans ton quotidien : la tension de 1,5 V inscrite sur une pile, les 230 V du secteur, ou les milliers de volts d'une ligne à haute tension ne sont jamais que des différences de potentiel entre deux points. Comprendre le potentiel, c'est comprendre pourquoi un oiseau peut se poser sans risque sur un câble électrique à très haute tension — tant qu'il ne touche pas un point à un potentiel différent.</p>
    <p>Ce chapitre introduit un deuxième outil essentiel de l'électrostatique : le potentiel électrique, une grandeur scalaire à partir de laquelle on peut retrouver tout le champ électrique par simple dérivation. À la fin, tu sauras pourquoi les physiciens préfèrent presque toujours calculer un potentiel plutôt qu'un champ, et comment passer instantanément de l'un à l'autre.</p>

    <h3>1. Le travail de A vers B</h3>
    <p>Le travail de la force électrostatique $\\vec{F}=q\\vec{E}$ lorsqu'une charge $q$ se déplace d'un point A à un point B le long d'un chemin $\\Gamma$ est :</p>
    <p>$$W_{A\\to B} = \\int_A^B \\vec{F}\\cdot d\\vec{l} = q\\int_A^B \\vec{E}\\cdot d\\vec{l}$$</p>
    <p>Une propriété remarquable du champ électrostatique (déjà entrevue via le calcul du rotationnel, voir plus loin) est que ce travail <strong>ne dépend pas du chemin suivi</strong> entre A et B, mais uniquement des points de départ et d'arrivée. On dit que la force électrostatique est <strong>conservative</strong>.</p>

    <h3>2. Du travail au potentiel</h3>
    <p>Puisque $W_{A\\to B}$ ne dépend que des points A et B, on peut l'écrire comme la différence d'une fonction scalaire $V$ évaluée en ces deux points :</p>
    <p>$$W_{A\\to B} = q\\left[V(A) - V(B)\\right]$$</p>
    <p>$V$ est le <strong>potentiel électrostatique</strong>. Le travail par unité de charge, entre A et B, est donc la différence de potentiel (ddp) $V(A)-V(B)$, ce qui justifie le nom usuel de « voltage » ou « tension ».</p>

    <h3>3. Potentiel créé par une charge ponctuelle</h3>
    <p>Pour une charge ponctuelle $q_1$, en choisissant le potentiel nul à l'infini (convention usuelle), on obtient :</p>
    <p>$$V(r) = \\dfrac{1}{4\\pi\\epsilon_0}\\dfrac{q_1}{r}$$</p>
    <p>Contrairement au champ $\\vec{E}$ (vecteur, décroissant en $1/r^2$), le potentiel $V$ est un simple scalaire, décroissant en $1/r$ : il est souvent bien plus simple à calculer, en particulier pour des distributions de charges (on additionne des scalaires plutôt que des vecteurs).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le choix « $V(\\infty)=0$ » n'est qu'une convention — rien n'empêcherait de choisir $V(\\infty)=100\\ \\text{V}$. Pourquoi ce choix arbitraire n'a-t-il aucune conséquence physique mesurable, alors que le champ électrique, lui, a une valeur bien précise en chaque point ?
    </div>

    <h3>4. Le gradient : du potentiel au champ</h3>
    <p>Le <strong>gradient</strong> d'un champ scalaire $V$ est un champ vectoriel qui pointe dans la direction de plus forte croissance de $V$, avec une norme égale au taux de variation dans cette direction. En cartésiennes :</p>
    <p>$$\\nabla V = \\dfrac{\\partial V}{\\partial x}\\hat{e}_x + \\dfrac{\\partial V}{\\partial y}\\hat{e}_y + \\dfrac{\\partial V}{\\partial z}\\hat{e}_z$$</p>
    <p>On montre que le champ électrostatique dérive du potentiel par la relation fondamentale :</p>
    <p>$$\\boxed{\\vec{E} = -\\nabla V}$$</p>
    <p>Le signe moins traduit le fait physique que le champ électrique pointe des potentiels élevés vers les potentiels faibles (une charge positive « descend » spontanément le potentiel, comme une masse descend une pente de gravité). Cette relation permet, dès qu'on connaît $V(x,y,z)$, de retrouver immédiatement les trois composantes de $\\vec{E}$ par simple dérivation — un raccourci souvent bien plus rapide que le calcul direct du champ.</p>

    <div class="key-point">
      <span class="eyebrow">Pourquoi passer par le potentiel ?</span>
      Calculer $\\vec{E}$ directement impose d'intégrer une quantité vectorielle, avec des composantes qui peuvent s'annuler par symétrie mais compliquent le calcul intermédiaire. Calculer $V$ revient à intégrer une quantité scalaire, souvent beaucoup plus simple, puis à dériver pour retrouver $\\vec{E}=-\\nabla V$. C'est une stratégie de calcul à connaître par cœur.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un oiseau posé sur un unique câble à haute tension ne subit aucun choc électrique, alors que la tension entre le câble et le sol peut dépasser 100 000 V. Sachant que $\\vec E=-\\nabla V$, à quelle condition sur le potentiel le long du corps de l'oiseau le courant qui le traverse serait-il nul ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La notion de potentiel dépasse largement l'électrostatique : en mécanique quantique, le potentiel scalaire apparaît directement dans l'équation de Schrödinger, et sa forme détermine tout le comportement d'une particule (atome, molécule, semi-conducteur). Les batteries lithium-ion, omniprésentes dans les smartphones et véhicules électriques, sont elles-mêmes conçues en optimisant des différences de potentiel électrochimique à l'échelle atomique — un domaine de recherche actif récompensé par le prix Nobel de chimie 2019.</p>
    <p><strong>Question ouverte :</strong> peut-on définir un potentiel scalaire pour le champ magnétique $\\vec B$, de la même manière que pour $\\vec E$ ? La réponse (non, en général, à cause de la structure du rotationnel de $\\vec B$) sera abordée dans un chapitre ultérieur — mais la question de trouver des potentiels « généralisés » pour des champs non conservatifs reste un sujet actif en physique théorique.</p>
    <p><strong>Technologie émergente :</strong> la cartographie du potentiel électrique à l'échelle du nanomètre, réalisée par microscopie à sonde de Kelvin, permet aujourd'hui de visualiser directement les différences de potentiel internes à un transistor ou une cellule photovoltaïque, guidant la conception des composants électroniques de demain.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Force conservative → travail indépendant du chemin → définition du potentiel scalaire $V$ → champ électrique $\\vec E=-\\nabla V$
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{E} = -\\nabla V$$
      Cette relation est la traduction directe, en termes de champs, du fait que la force électrostatique dérive d'une énergie potentielle — exactement comme le poids dérive du potentiel de pesanteur $gz$ en mécanique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le travail de la force électrostatique $W_{A\\to B}=q\\int_A^B\\vec{E}\\cdot d\\vec{l}$ ne dépend pas du chemin suivi</li>
        <li>Cette indépendance permet de définir un potentiel scalaire $V$ tel que $W_{A\\to B}=q[V(A)-V(B)]$</li>
        <li>Potentiel d'une charge ponctuelle : $V(r)=\\frac{1}{4\\pi\\epsilon_0}\\frac{q}{r}$, avec $V(\\infty)=0$</li>
        <li>Le gradient $\\nabla V$ pointe vers les valeurs croissantes de $V$</li>
        <li>Relation fondamentale : $\\vec{E}=-\\nabla V$, le champ pointe des potentiels élevés vers les potentiels faibles</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe moins dans $\\vec{E}=-\\nabla V$ : le champ pointe vers les potentiels décroissants, pas croissants</li>
        <li>Confondre potentiel (scalaire, $V(A)$ a un sens en un seul point avec une référence choisie) et différence de potentiel (la seule grandeur réellement mesurable)</li>
        <li>Penser que le potentiel décroît en $1/r^2$ comme le champ : il décroît en réalité en $1/r$</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La relation entre champ électrique et potentiel est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag4e1" value="wrong"> $\\vec{E}=\\nabla V$</label>
          <label class="option"><input type="radio" name="emag4e1" value="right"> $\\vec{E}=-\\nabla V$</label>
          <label class="option"><input type="radio" name="emag4e1" value="wrong"> $\\vec{E}=\\nabla\\cdot V$</label>
          <label class="option"><input type="radio" name="emag4e1" value="wrong"> $V=-\\nabla\\vec{E}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag4e1','emag4fb1','Correct — le signe moins traduit le fait que E pointe des potentiels élevés vers les potentiels faibles.','N\'oublie pas le signe : E pointe vers les potentiels décroissants.')">Vérifier</button>
        <div class="feedback" id="emag4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le potentiel créé par une charge ponctuelle décroît avec la distance $r$ en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag4e2" value="wrong"> $1/r^2$</label>
          <label class="option"><input type="radio" name="emag4e2" value="right"> $1/r$</label>
          <label class="option"><input type="radio" name="emag4e2" value="wrong"> $1/r^3$</label>
          <label class="option"><input type="radio" name="emag4e2" value="wrong"> $r$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag4e2','emag4fb2','Correct — V(r)=q/(4πε₀r) décroît en 1/r, plus lentement que le champ E qui décroît en 1/r².','C\'est le champ E qui décroît en 1/r² ; le potentiel décroît une puissance de r moins vite.')">Vérifier</button>
        <div class="feedback" id="emag4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le travail de la force électrostatique entre deux points A et B :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag4e3" value="wrong"> dépend fortement du chemin suivi</label>
          <label class="option"><input type="radio" name="emag4e3" value="right"> ne dépend que des points A et B, pas du chemin suivi</label>
          <label class="option"><input type="radio" name="emag4e3" value="wrong"> est toujours nul</label>
          <label class="option"><input type="radio" name="emag4e3" value="wrong"> ne dépend que du champ magnétique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag4e3','emag4fb3','Correct — c\'est justement cette propriété qui permet de définir un potentiel : la force électrostatique est conservative.','Repense à ce qui permet de définir un potentiel scalaire : cette propriété d\'indépendance est la clé.')">Vérifier</button>
        <div class="feedback" id="emag4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la force électrostatique n'était pas conservative : la notion même de « tension électrique », si familière, aurait-elle encore un sens ?</li>
        <li>Pourquoi les physiciens ont-ils choisi $V(\\infty)=0$ pour une charge ponctuelle plutôt que, par exemple, $V(r=1\\,\\text{m})=0$ ?</li>
        <li>Quelle serait la conséquence, pour la sécurité électrique, si deux points reliés par un simple fil pouvaient être à des potentiels différents en régime stationnaire ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A. Volta, « On the Electricity Excited by the Mere Contact of Conducting Substances of Different Kinds », Philosophical Transactions of the Royal Society, 1800.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur le potentiel électrostatique.</li>
        <li>J. B. Goodenough, M. S. Whittingham, A. Yoshino, travaux sur les batteries lithium-ion, Nobel Lecture, prix Nobel de chimie 2019.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Le potentiel que tu maîtrises désormais va simplifier considérablement les calculs des chapitres suivants. Dans « Distributions de charges, énergie électrostatique et rotationnel », tu généraliseras ces outils à des distributions continues, et tu découvriras l'énergie stockée dans une configuration de charges. Comme le disait Volta lui-même en présentant sa pile à Napoléon : « J'ai le plaisir d'annoncer une découverte qui... vous surprendra. » Le potentiel électrique a, depuis, surpris et équipé le monde entier.</p>
  `
};

EMAG_NOVA_KB[emagKey('Potentiel électrostatique, travail et gradient')] = {
  intro: "Salut, moi c'est Nova ! On voit le potentiel électrostatique, le travail de la force électrique et le gradient. Demande-moi la relation E=-∇V, le potentiel d'une charge ponctuelle, ou pourquoi le travail ne dépend pas du chemin.",
  rules: [
    { test:/gradient/i, replies:["Le gradient ∇V d'un champ scalaire V est un vecteur qui pointe vers les valeurs croissantes de V, avec une norme égale au taux de variation maximal. En cartésiennes, ∇V=(∂V/∂x, ∂V/∂y, ∂V/∂z)."] },
    { test:/e\\s*=\\s*-?\\\\?nabla|relation.*potentiel.*champ|champ.*d[ée]rive.*potentiel/i, replies:["La relation fondamentale est E=-∇V : le champ électrique pointe des potentiels élevés vers les potentiels faibles. Elle permet de retrouver E par simple dérivation dès qu'on connaît V."] },
    { test:/potentiel.*charge ponctuelle|v\\(r\\)/i, replies:["Le potentiel créé par une charge ponctuelle q est V(r)=q/(4πε₀r), avec la convention V(∞)=0. Il décroît en 1/r, moins vite que le champ E qui décroît en 1/r²."] },
    { test:/travail.*chemin|ind[ée]pendan.*chemin/i, replies:["Le travail de la force électrostatique entre deux points ne dépend pas du chemin suivi, seulement des points de départ et d'arrivée. C'est cette propriété (force conservative) qui permet de définir un potentiel scalaire V."] },
    { test:/pourquoi.*potentiel|int[ée]r[êe]t.*potentiel/i, replies:["Le potentiel est un scalaire, donc plus simple à calculer par intégration qu'un champ vectoriel. Une fois V connu, on retrouve les trois composantes de E par simple dérivation : E=-∇V."] },
    { test:/ddp|diff[ée]rence de potentiel|tension/i, replies:["La différence de potentiel (ddp) V(A)-V(B) est la seule grandeur réellement mesurable : le travail par unité de charge pour aller de A à B vaut q[V(A)-V(B)]."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : n'oublie pas le signe dans la relation E-gradient.","Indice niveau 2 : E pointe vers les potentiels qui diminuent.","Indice niveau 3 : E=-∇V."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : le potentiel décroît moins vite que le champ E.","Indice niveau 2 : E décroît en 1/r², le potentiel en...","Indice niveau 3 : 1/r."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la propriété qui permet de définir un potentiel.","Indice niveau 2 : cette propriété concerne l'indépendance par rapport au chemin suivi.","Indice niveau 3 : le travail ne dépend que de A et B."] }
  ]
};

/* =========================== CHAPITRE 5 — Distributions de charges, énergie électrostatique et rotationnel =========================== */
EMAG_CHAPTERS[emagKey('Distributions de charges, énergie électrostatique et rotationnel')] = {
  objectives: [
    "Généraliser le calcul du potentiel et du champ à un ensemble discret puis continu de charges",
    "Exprimer la densité volumique d'énergie électrostatique",
    "Définir le rotationnel d'un champ vectoriel et montrer que le champ électrostatique est irrotationnel",
    "Écrire le jeu complet des deux équations locales qui définissent le champ électrostatique",
    "Analyser pourquoi l'existence d'un potentiel scalaire et la nullité du rotationnel de E sont deux façons équivalentes d'exprimer la même propriété physique"
  ],
  prereqs: ["Potentiel électrostatique, travail et gradient"],
  bodyHtml: `
    <p>Aucune distribution de charges réelle ne se résume à une seule particule ponctuelle : un nuage d'orage, un noyau atomique ou une plaque métallique chargée mettent en jeu des milliards de charges élémentaires. Passer d'une charge isolée à une distribution continue est le premier défi de ce chapitre — un passage à la limite qui transforme des sommes discrètes en intégrales, une opération que Newton et Leibniz avaient rendue possible dès le XVIIe siècle avec l'invention du calcul infinitésimal.</p>
    <p>Le second concept, l'énergie stockée dans un champ électrique, est loin d'être une abstraction : c'est exactement cette énergie que libère un condensateur dans un flash d'appareil photo, ou celle qu'accumulent dangereusement les nuages d'orage avant la décharge d'un éclair. Le rotationnel, enfin, referme la description mathématique du champ électrostatique et prépare directement le terrain pour l'un des chapitres les plus spectaculaires du cours : l'induction électromagnétique, où ce même rotationnel cessera, pour la première fois, d'être nul.</p>
    <p>Ce chapitre généralise les résultats obtenus pour une charge unique à des distributions plus réalistes, puis referme la description de l'électrostatique en introduisant le rotationnel — le pendant de la divergence pour la circulation d'un champ. À la fin, tu disposeras du jeu complet des deux équations locales qui définissent entièrement le champ électrostatique.</p>

    <h3>1. Ensemble de N charges</h3>
    <p>Grâce au principe de superposition, le potentiel créé par $N$ charges ponctuelles $q_i$ situées en des points repérés par $r_i$ (distance au point d'observation) est simplement la somme algébrique :</p>
    <p>$$V(\\vec{r}) = \\dfrac{1}{4\\pi\\epsilon_0}\\sum_{i=1}^{N} \\dfrac{q_i}{r_i}$$</p>
    <p>Cette somme est bien plus simple à manier que la somme vectorielle qu'exigerait le calcul direct de $\\vec{E}$, ce qui confirme l'intérêt de la stratégie « potentiel d'abord, champ ensuite ».</p>

    <h3>2. Distribution continue de charges</h3>
    <p>Pour une distribution continue, on remplace la somme discrète par une intégrale, en introduisant une densité de charge (volumique $\\rho$, surfacique $\\sigma$ ou linéique $\\lambda$ selon la géométrie de la source) :</p>
    <p>$$V(\\vec{r}) = \\dfrac{1}{4\\pi\\epsilon_0}\\iiint_V \\dfrac{\\rho(\\vec{r}')}{\\|\\vec{r}-\\vec{r}'\\|}\\,dV'$$</p>
    <p>et de manière analogue avec $\\sigma\\,dS'$ ou $\\lambda\\,dl'$ pour une distribution surfacique ou linéique.</p>

    <h3>3. Densité volumique d'énergie électrostatique</h3>
    <p>Construire une distribution de charges à partir de charges initialement dispersées à l'infini coûte un travail, stocké sous forme d'énergie électrostatique. On montre que cette énergie peut s'exprimer uniquement en fonction du champ électrique créé, via une densité volumique d'énergie :</p>
    <p>$$u_E = \\dfrac{1}{2}\\epsilon_0 E^2$$</p>
    <p>L'énergie totale stockée dans une distribution est alors $W = \\iiint_{\\text{tout l'espace}} u_E\\, dV$ : le champ électrique « contient » réellement de l'énergie, une idée qui deviendra centrale au moment d'étudier les ondes électromagnétiques.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un condensateur de flash d'appareil photo stocke son énergie « dans le champ électrique entre ses armatures » plutôt que « dans les charges elles-mêmes ». Si l'on double la distance entre les armatures sans changer les charges, le champ E diminue : l'énergie stockée augmente-t-elle ou diminue-t-elle ? Réfléchis à ce que cela signifie pour le travail qu'il a fallu fournir pour écarter les armatures.
    </div>

    <h3>4. Le rotationnel</h3>
    <p>Découpons une surface ouverte en petites surfaces élémentaires. La circulation d'un champ le long du contour total est la somme des circulations autour de chaque petite surface (les contributions des segments internes s'annulent deux à deux). On définit le <strong>rotationnel</strong> d'un champ $\\vec{A}$ comme la circulation par unité de surface, dans la limite d'une surface infinitésimale :</p>
    <p>$$\\left(\\nabla\\wedge\\vec{A}\\right)\\cdot\\hat{n} = \\lim_{S\\to 0}\\dfrac{1}{S}\\oint_{\\Gamma} \\vec{A}\\cdot d\\vec{l}$$</p>
    <p>En coordonnées cartésiennes, $\\nabla\\wedge\\vec{A} = \\left(\\dfrac{\\partial A_z}{\\partial y}-\\dfrac{\\partial A_y}{\\partial z}\\right)\\hat{e}_x + \\left(\\dfrac{\\partial A_x}{\\partial z}-\\dfrac{\\partial A_z}{\\partial x}\\right)\\hat{e}_y + \\left(\\dfrac{\\partial A_y}{\\partial x}-\\dfrac{\\partial A_x}{\\partial y}\\right)\\hat{e}_z$. Le rotationnel mesure la tendance d'un champ à « tourner » localement autour d'un point.</p>

    <h3>5. Le rotationnel du champ électrostatique est nul</h3>
    <p>Puisque le travail de $\\vec{E}$ ne dépend pas du chemin (chapitre précédent), sa circulation sur tout contour <strong>fermé</strong> est nulle : $\\oint_\\Gamma \\vec{E}\\cdot d\\vec{l}=0$. Par définition du rotationnel, cela impose :</p>
    <p>$$\\boxed{\\nabla\\wedge\\vec{E} = \\vec{0}}$$</p>
    <p>On dit que le champ électrostatique est <strong>irrotationnel</strong>. Ce résultat, associé à la loi de Gauss locale du chapitre 3, constitue le jeu complet des deux équations locales de l'électrostatique :</p>
    <table class="mini-table">
      <tr><th>Équation</th><th>Nom</th><th>Signification</th></tr>
      <tr><td>$\\nabla\\cdot\\vec{E}=\\rho/\\epsilon_0$</td><td>Loi de Gauss</td><td>Les charges sont les sources (ou puits) du champ E</td></tr>
      <tr><td>$\\nabla\\wedge\\vec{E}=\\vec{0}$</td><td>Champ irrotationnel</td><td>Le champ électrostatique dérive toujours d'un potentiel</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Un raccourci pratique</span>
      Un champ dont le rotationnel est nul dérive toujours d'un gradient : $\\nabla\\wedge\\vec{E}=\\vec{0} \\Leftrightarrow \\vec{E}=-\\nabla V$ pour un certain potentiel $V$. C'est précisément parce que $\\nabla\\wedge\\vec{E}=\\vec{0}$ en électrostatique que l'introduction du potentiel du chapitre précédent est mathématiquement légitime.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le champ électrostatique est irrotationnel en toute circonstance — mais ce sera faux dès que le champ magnétique variera dans le temps (loi de Faraday, chapitre sur l'induction). Qu'est-ce que cela suggère sur la différence profonde entre un champ électrique « statique » et un champ électrique « induit » ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La densité d'énergie électrostatique $u_E=\\frac{1}{2}\\epsilon_0 E^2$ prend une importance vertigineuse en cosmologie : certaines théories proposent que l'énergie du vide quantique lui-même (l'énergie sombre qui accélère l'expansion de l'Univers, découverte en 1998 et récompensée par le prix Nobel de physique 2011) pourrait provenir de champs analogues à l'échelle cosmologique, bien que leur nature exacte reste l'un des plus grands mystères non résolus de la physique contemporaine.</p>
    <p><strong>Question ouverte :</strong> la formule $u_E=\\frac{1}{2}\\epsilon_0 E^2$, appliquée à une charge ponctuelle, donne une énergie infinie au voisinage immédiat de la charge ($r\\to 0$). Ce problème de « divergence » a occupé les plus grands noms de la physique du XXe siècle et n'est résolu de façon satisfaisante qu'en électrodynamique quantique — un sujet de recherche toujours actif.</p>
    <p><strong>Technologie émergente :</strong> les supercondensateurs, qui stockent l'énergie directement sous forme de champ électrique (et non par réaction chimique comme une pile), exploitent directement $u_E=\\frac{1}{2}\\epsilon_0 E^2$ et sont au cœur des recherches sur la récupération d'énergie de freinage dans les véhicules électriques.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Charges discrètes → passage à la limite continue (ρ, σ, λ) → énergie stockée dans le champ ($u_E$) → rotationnel nul → jeu complet des équations de l'électrostatique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\nabla\\cdot\\vec{E}=\\frac{\\rho}{\\epsilon_0} \\qquad\\text{et}\\qquad \\nabla\\wedge\\vec{E}=\\vec{0}$$
      Ces deux équations locales, à elles seules, déterminent entièrement le champ électrostatique créé par n'importe quelle distribution de charges — ce sont les deux premières des quatre équations de Maxwell que tu retrouveras, complètes, plus loin dans le cours.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Potentiel de N charges : simple somme algébrique $V=\\frac{1}{4\\pi\\epsilon_0}\\sum q_i/r_i$</li>
        <li>Pour une distribution continue, la somme devient une intégrale avec une densité $\\rho$, $\\sigma$ ou $\\lambda$</li>
        <li>Densité volumique d'énergie électrostatique : $u_E=\\frac{1}{2}\\epsilon_0 E^2$</li>
        <li>Le rotationnel $\\nabla\\wedge\\vec{A}$ mesure la circulation par unité de surface, donc la tendance d'un champ à tourner</li>
        <li>Le champ électrostatique est irrotationnel : $\\nabla\\wedge\\vec{E}=\\vec{0}$, ce qui justifie l'existence du potentiel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Sommer les distances $r_i$ au lieu de sommer les termes $q_i/r_i$ dans le calcul du potentiel</li>
        <li>Utiliser une densité linéique $\\lambda$ pour une surface, ou une densité surfacique $\\sigma$ pour un volume</li>
        <li>Croire que le rotationnel mesure une divergence : ce sont deux opérateurs différents, l'un lié à la circulation, l'autre au flux</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La densité volumique d'énergie électrostatique s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag5e1" value="wrong"> $u_E=\\epsilon_0 E$</label>
          <label class="option"><input type="radio" name="emag5e1" value="right"> $u_E=\\frac{1}{2}\\epsilon_0 E^2$</label>
          <label class="option"><input type="radio" name="emag5e1" value="wrong"> $u_E=\\frac{1}{2}\\epsilon_0 E$</label>
          <label class="option"><input type="radio" name="emag5e1" value="wrong"> $u_E=\\epsilon_0 E^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag5e1','emag5fb1','Correct — u_E=½ε₀E², une expression qui reviendra pour le calcul de l\'énergie électromagnétique des ondes.','Il manque le facteur ½ et le carré sur E : vérifie l\'expression exacte.')">Vérifier</button>
        <div class="feedback" id="emag5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le champ électrostatique vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag5e2" value="wrong"> $\\nabla\\wedge\\vec{E}\\neq\\vec{0}$ en général</label>
          <label class="option"><input type="radio" name="emag5e2" value="right"> $\\nabla\\wedge\\vec{E}=\\vec{0}$ toujours</label>
          <label class="option"><input type="radio" name="emag5e2" value="wrong"> $\\nabla\\cdot\\vec{E}=0$ toujours</label>
          <label class="option"><input type="radio" name="emag5e2" value="wrong"> $\\nabla\\wedge\\vec{E}=\\rho/\\epsilon_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag5e2','emag5fb2','Correct — le champ électrostatique est irrotationnel, ce qui est équivalent à l\'existence d\'un potentiel dont il dérive.','Le champ E dérive d\'un potentiel : cela impose une propriété précise sur son rotationnel.')">Vérifier</button>
        <div class="feedback" id="emag5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une distribution surfacique de charges, on utilise dans l'intégrale du potentiel :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag5e3" value="wrong"> une densité linéique $\\lambda\\,dl'$</label>
          <label class="option"><input type="radio" name="emag5e3" value="right"> une densité surfacique $\\sigma\\,dS'$</label>
          <label class="option"><input type="radio" name="emag5e3" value="wrong"> une densité volumique $\\rho\\,dV'$</label>
          <label class="option"><input type="radio" name="emag5e3" value="wrong"> aucune densité, seulement des charges ponctuelles</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag5e3','emag5fb3','Correct — pour une distribution répartie sur une surface, on utilise la densité surfacique σ.','La géométrie de la distribution (surface) doit correspondre au type de densité utilisé.')">Vérifier</button>
        <div class="feedback" id="emag5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'énergie électrostatique dépendait des charges elles-mêmes plutôt que du champ qu'elles créent : les deux points de vue donneraient-ils toujours le même résultat pour l'énergie totale ?</li>
        <li>Pourquoi le rotationnel et la divergence, qui semblent tous deux « mesurer quelque chose sur un champ », donnent-ils des informations aussi radicalement différentes ?</li>
        <li>Quelle serait la conséquence, pour l'existence même d'un potentiel électrostatique, si l'on découvrait un jour un contexte physique où $\\nabla\\wedge\\vec{E}\\neq\\vec{0}$ ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>S.-D. Poisson, <em>Mémoire sur la distribution de l'électricité à la surface des corps conducteurs</em>, 1812 — travaux fondateurs sur les distributions continues de charges.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur l'énergie électrostatique et le rotationnel.</li>
        <li>A. G. Riess et al., « Observational Evidence from Supernovae for an Accelerating Universe and a Cosmological Constant », The Astronomical Journal, 1998.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Avec les deux équations locales de ce chapitre, l'électrostatique est désormais bouclée : tu sais tout calculer, du champ à l'énergie, pour n'importe quelle distribution de charges immobiles. Le chapitre suivant, « Conducteurs à l'équilibre et rigidité diélectrique », va appliquer ces outils à un cas particulièrement riche en applications : les métaux, où les charges sont libres de se redistribuer. Comme le disait Poisson : « La vie n'est bonne qu'à deux choses : découvrir les mathématiques et enseigner les mathématiques. » Tu viens de découvrir les siennes.</p>
  `
};

EMAG_NOVA_KB[emagKey('Distributions de charges, énergie électrostatique et rotationnel')] = {
  intro: "Salut, moi c'est Nova ! On étend le calcul du potentiel à plusieurs charges, on voit l'énergie électrostatique et le rotationnel. Demande-moi la densité d'énergie électrostatique, le rotationnel de E, ou comment traiter une distribution continue de charges.",
  rules: [
    { test:/rotationnel/i, replies:["Le rotationnel ∇∧A mesure la circulation d'un champ par unité de surface : il quantifie la tendance du champ à « tourner » localement. Le champ électrostatique vérifie ∇∧E=0 : il est irrotationnel."] },
    { test:/[ée]nergie.*[ée]lectrostatique|densit[ée].*[ée]nergie/i, replies:["La densité volumique d'énergie électrostatique est u_E=½ε₀E². L'énergie totale stockée dans une distribution de charges s'obtient en intégrant u_E sur tout l'espace où E est non nul."] },
    { test:/distribution continue|densit[ée] de charge/i, replies:["Pour une distribution continue de charges, on remplace la somme discrète par une intégrale, avec une densité volumique ρ (en C/m³), surfacique σ (en C/m²) ou linéique λ (en C/m) selon la géométrie de la source."] },
    { test:/n charges|plusieurs charges/i, replies:["Grâce à la superposition, le potentiel créé par N charges est simplement la somme algébrique V=(1/4πε₀)Σqi/ri — beaucoup plus simple que la somme vectorielle qu'exigerait le champ E directement."] },
    { test:/irrotationnel/i, replies:["Un champ irrotationnel vérifie ∇∧E=0 en tout point. C'est équivalent à l'existence d'un potentiel scalaire V tel que E=-∇V : c'est exactement le cas du champ électrostatique."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : n'oublie ni le facteur ½ ni le carré sur E.","Indice niveau 2 : compare avec l'énergie cinétique ½mv², la structure est similaire.","Indice niveau 3 : u_E=½ε₀E²."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la propriété liée à l'existence du potentiel.","Indice niveau 2 : cette propriété concerne le rotationnel, pas la divergence.","Indice niveau 3 : ∇∧E=0 toujours."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : quelle densité correspond à une distribution étalée sur une surface ?","Indice niveau 2 : ce n'est ni linéique (fil) ni volumique (solide).","Indice niveau 3 : densité surfacique σ."] }
  ]
};

/* =========================== CHAPITRE 6 — Conducteurs à l'équilibre et rigidité diélectrique =========================== */
EMAG_CHAPTERS[emagKey('Conducteurs à l\'équilibre et rigidité diélectrique')] = {
  objectives: [
    "Décrire le comportement du champ et des charges à l'intérieur d'un conducteur à l'équilibre électrostatique",
    "Expliquer l'absence de champ dans une cavité vide creusée dans un conducteur",
    "Établir l'expression du champ juste à la surface d'un conducteur chargé",
    "Définir la rigidité diélectrique et l'utiliser pour estimer un champ de claquage",
    "Analyser pourquoi l'effet de pointe rend un paratonnerre efficace pour déclencher un claquage contrôlé"
  ],
  prereqs: ["Distributions de charges, énergie électrostatique et rotationnel"],
  bodyHtml: `
    <p>En 1836, Michael Faraday réalise une expérience spectaculaire : il s'enferme dans une cage métallique reliée à un générateur électrostatique à très haute tension, et en ressort totalement indemne — tandis que des étincelles crépitent à l'extérieur de sa cage. Cette démonstration, aujourd'hui reproduite dans tous les laboratoires de physique, illustre une propriété remarquable et contre-intuitive des conducteurs à l'équilibre : ils peuvent totalement isoler leur intérieur d'un champ électrique extérieur, aussi intense soit-il.</p>
    <p>Ce principe protège aujourd'hui les passagers d'une voiture frappée par la foudre (la carrosserie métallique agit comme une cage de Faraday), blinde les salles d'IRM contre les interférences électromagnétiques extérieures, et explique pourquoi ton four à micro-ondes ne laisse rien fuir à travers sa grille métallique. À l'autre extrême, l'effet de pointe — quand le champ devient localement extrême près d'une pointe métallique — est exploité depuis le XVIIIe siècle par le paratonnerre de Benjamin Franklin pour canaliser la foudre en un point précis et contrôlé.</p>
    <p>Après avoir étudié le champ dans le vide, ce chapitre s'intéresse au comportement de l'électrostatique en présence de matière conductrice — un cas particulièrement riche en conséquences pratiques (cage de Faraday, paratonnerre, blindage électromagnétique). À la fin, tu comprendras pourquoi un conducteur creux protège aussi bien son intérieur qu'une plaque métallique pleine, et jusqu'à quel champ un isolant peut résister avant de claquer.</p>

    <h3>1. Qu'est-ce qu'un conducteur ?</h3>
    <p>Dans un conducteur (métal typiquement), une fraction des électrons — les électrons de conduction — est libre de se déplacer dans tout le volume du matériau, contrairement à un isolant où les charges restent localisées. À l'<strong>équilibre électrostatique</strong> (aucun mouvement macroscopique de charge), ces électrons libres ont fini de se redistribuer sous l'effet d'un champ extérieur éventuel.</p>

    <h3>2. Champ et charges à l'intérieur</h3>
    <p>À l'équilibre, le champ électrique à l'intérieur d'un conducteur est nécessairement nul : $\\vec{E}_{int}=\\vec{0}$. En effet, si $\\vec{E}_{int}$ n'était pas nul, les électrons libres seraient mis en mouvement par la force $-e\\vec{E}_{int}$, ce qui contredirait l'hypothèse d'équilibre. Puisque $\\vec{E}_{int}=\\vec{0}$, la loi de Gauss locale $\\nabla\\cdot\\vec{E}=\\rho/\\epsilon_0$ impose $\\rho=0$ partout à l'intérieur : <strong>toute charge en excès sur un conducteur à l'équilibre se répartit uniquement à sa surface</strong>.</p>

    <h3>3. Champ dans une cavité vide</h3>
    <p>Si l'on creuse une cavité vide (sans charge) à l'intérieur d'un conducteur, le champ y est également nul, quel que soit le champ extérieur appliqué au conducteur : c'est le principe du <strong>blindage électrostatique</strong> (cage de Faraday). Les charges se répartissent sur la surface externe du conducteur de façon à annuler exactement le champ dans tout le volume conducteur, cavité comprise.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une cage de Faraday n'a pas besoin d'être une enceinte pleine : un simple grillage métallique suffit à protéger l'intérieur d'un four à micro-ondes. À partir de quelle taille de maille, selon toi, le grillage cesserait-il de bloquer efficacement une onde électromagnétique ?
    </div>

    <h3>4. Champ à la surface d'un conducteur</h3>
    <p>Juste à l'extérieur de la surface d'un conducteur portant une densité surfacique de charge $\\sigma$, le champ est perpendiculaire à la surface (sinon, sa composante tangentielle mettrait en mouvement les charges libres en surface) et vaut :</p>
    <p>$$\\vec{E}_{surf} = \\dfrac{\\sigma}{\\epsilon_0}\\hat{n}$$</p>
    <p>où $\\hat{n}$ est la normale sortante. Ce résultat s'obtient par la loi de Gauss appliquée à une « boîte à pilules » traversant la surface, en utilisant $\\vec{E}_{int}=\\vec{0}$.</p>

    <h3>5. Rigidité diélectrique</h3>
    <p>Un isolant (l'air, par exemple) ne peut supporter un champ électrique arbitrairement grand : au-delà d'une valeur critique appelée <strong>rigidité diélectrique</strong> (ou champ de claquage), le matériau s'ionise brutalement et devient conducteur — c'est le claquage électrique, phénomène à l'origine des étincelles et de la foudre.</p>
    <table class="mini-table">
      <tr><th>Milieu</th><th>Rigidité diélectrique typique</th></tr>
      <tr><td>Air (conditions normales)</td><td>$\\approx 3\\ \\text{MV/m}$</td></tr>
      <tr><td>Verre</td><td>$\\approx 10\\text{ à }14\\ \\text{MV/m}$</td></tr>
      <tr><td>Mica</td><td>$\\approx 100\\ \\text{MV/m}$</td></tr>
      <tr><td>Vide (idéalisé)</td><td>infinie (pas de claquage)</td></tr>
    </table>
    <p>Ce phénomène impose une limite pratique à la densité surfacique de charge qu'un conducteur peut porter dans l'air avant de perdre ses charges par étincelage, et explique la forme arrondie recherchée pour les électrodes haute tension (le champ $\\sigma/\\epsilon_0$ devient très intense au voisinage des pointes, ce qui favorise le claquage local — c'est le principe de l'effet de pointe utilisé par le paratonnerre).</p>

    <div class="key-point">
      <span class="eyebrow">Trois conséquences d'un même principe</span>
      Champ intérieur nul, charges en surface uniquement, champ perpendiculaire à la surface : ces trois propriétés découlent toutes de la même hypothèse d'équilibre électrostatique dans un conducteur. Elles sont à la base du blindage électromagnétique (cage de Faraday) et de l'effet de pointe (paratonnerre).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'effet de pointe concentre le champ électrique près d'une pointe métallique fine. Un paratonnerre est justement conçu comme une pointe. Cherche-t-il à empêcher le claquage de l'air, ou au contraire à le provoquer précocement et de façon contrôlée ? Qu'est-ce que cela implique pour l'endroit où placer un paratonnerre sur un bâtiment ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La cage de Faraday n'est pas qu'un principe de licence : les scanners d'IRM utilisent des blindages électrostatiques sophistiqués pour isoler l'appareil des interférences radio ambiantes, condition indispensable à la qualité de l'image médicale. À l'échelle nanométrique, des chercheurs étudient aujourd'hui des « cages de Faraday moléculaires » — des structures organiques capables d'écranter le champ électrique à l'échelle d'une seule molécule, avec des applications potentielles en électronique moléculaire et en stockage d'information quantique.</p>
    <p><strong>Question ouverte :</strong> la rigidité diélectrique de l'air dépend de l'humidité, de la pression et de la géométrie des électrodes de façon complexe ; prédire précisément le point de claquage dans des conditions réalistes (air humide, poussières, champs non uniformes) reste un défi expérimental actif pour l'ingénierie des hautes tensions.</p>
    <p><strong>Technologie émergente :</strong> les disjoncteurs à isolation gazeuse (hexafluorure de soufre, SF₆) exploitent une rigidité diélectrique bien supérieure à celle de l'air pour couper en toute sécurité des courants électriques colossaux dans les réseaux de transport d'électricité — un enjeu majeur alors que ce gaz, très efficace, est aussi un puissant gaz à effet de serre, ce qui motive la recherche d'alternatives.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Équilibre électrostatique → champ nul à l'intérieur du conducteur → charges reléguées en surface → champ perpendiculaire $\\sigma/\\epsilon_0$ en surface → claquage au-delà de la rigidité diélectrique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{E}_{int} = \\vec{0} \\quad\\text{et}\\quad \\vec{E}_{surf} = \\frac{\\sigma}{\\epsilon_0}\\hat{n}$$
      Ces deux relations condensent tout le comportement électrostatique d'un conducteur : rien à l'intérieur, tout concentré à la surface.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>À l'équilibre électrostatique, $\\vec{E}_{int}=\\vec{0}$ à l'intérieur d'un conducteur</li>
        <li>Toute charge en excès se répartit uniquement à la surface du conducteur ($\\rho=0$ à l'intérieur)</li>
        <li>Le champ est nul dans toute cavité vide creusée dans un conducteur : c'est le principe de la cage de Faraday</li>
        <li>À la surface, $\\vec{E}_{surf}=(\\sigma/\\epsilon_0)\\hat{n}$, perpendiculaire à la surface</li>
        <li>Au-delà de la rigidité diélectrique du milieu environnant, il y a claquage électrique (étincelle)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le champ à l'intérieur d'un conducteur peut être non nul si le conducteur est très gros : c'est faux quel que soit sa taille, à l'équilibre</li>
        <li>Oublier le facteur $\\epsilon_0$ dans $E_{surf}=\\sigma/\\epsilon_0$ (à ne pas confondre avec $\\sigma/2\\epsilon_0$, valable pour un plan infini isolé chargé des deux côtés)</li>
        <li>Penser qu'une cavité creusée dans un conducteur est protégée seulement si elle est petite : la protection est valable quelle que soit sa taille, tant qu'elle reste vide de charges</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">À l'équilibre électrostatique, le champ à l'intérieur d'un conducteur vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag6e1" value="wrong"> $\\sigma/\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag6e1" value="right"> $\\vec{0}$</label>
          <label class="option"><input type="radio" name="emag6e1" value="wrong"> une valeur qui dépend de la taille du conducteur</label>
          <label class="option"><input type="radio" name="emag6e1" value="wrong"> le champ extérieur appliqué, non modifié</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag6e1','emag6fb1','Correct — sinon les électrons libres seraient mis en mouvement, contredisant l\'équilibre.','Repense à la définition de l\'équilibre électrostatique : aucun mouvement de charge à l\'intérieur.')">Vérifier</button>
        <div class="feedback" id="emag6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le champ à la surface d'un conducteur portant une densité $\\sigma$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag6e2" value="wrong"> $\\sigma/2\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag6e2" value="right"> $\\sigma/\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag6e2" value="wrong"> $2\\sigma/\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag6e2" value="wrong"> $\\sigma\\epsilon_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag6e2','emag6fb2','Correct — E_surf=σ/ε₀, perpendiculaire à la surface, obtenu via la loi de Gauss avec E_int=0.','Attention à ne pas confondre avec le cas d\'un plan infini isolé (σ/2ε₀) : ici, l\'intérieur du conducteur a un champ nul.')">Vérifier</button>
        <div class="feedback" id="emag6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Au-delà de la rigidité diélectrique d'un isolant :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag6e3" value="wrong"> le champ électrique devient nul</label>
          <label class="option"><input type="radio" name="emag6e3" value="right"> le matériau s'ionise et devient conducteur (claquage)</label>
          <label class="option"><input type="radio" name="emag6e3" value="wrong"> la permittivité du vide change</label>
          <label class="option"><input type="radio" name="emag6e3" value="wrong"> rien de particulier ne se produit</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag6e3','emag6fb3','Correct — c\'est le phénomène de claquage électrique, à l\'origine des étincelles et de la foudre.','Pense au phénomène qui se produit lors d\'un orage, quand le champ dans l\'air devient trop intense.')">Vérifier</button>
        <div class="feedback" id="emag6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un conducteur pouvait conserver un champ électrique non nul en son sein indéfiniment : quelles technologies actuelles (blindage, câblage) deviendraient impossibles ?</li>
        <li>Pourquoi la protection d'une cage de Faraday fonctionne-t-elle même si la cavité vide n'est pas centrée dans le conducteur ?</li>
        <li>Quelle serait la conséquence, pour la sécurité d'un avion de ligne frappé par la foudre, du fait que sa carrosserie en aluminium se comporte comme un conducteur creux ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>M. Faraday, <em>Experimental Researches in Electricity</em>, 1839 — comptes rendus de l'expérience originale de la cage de Faraday.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur les conducteurs à l'équilibre.</li>
        <li>IEC 60071, <em>Insulation co-ordination</em>, norme internationale de référence sur la rigidité diélectrique et la tenue aux surtensions.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais pourquoi une voiture protège ses occupants pendant un orage, et jusqu'où un isolant peut résister avant de céder. Le chapitre suivant, « Courants électriques, conservation de la charge et loi d'Ohm », va mettre ces charges en mouvement : tu quitteras l'électrostatique pour entrer dans le monde bien plus dynamique des circuits électriques. Comme le disait Faraday lui-même : « Rien n'est trop merveilleux pour être vrai, si c'est compatible avec les lois de la Nature. » La cage qui porte son nom en est la preuve.</p>
  `
};

EMAG_NOVA_KB[emagKey('Conducteurs à l\'équilibre et rigidité diélectrique')] = {
  intro: "Salut, moi c'est Nova ! On voit les conducteurs à l'équilibre électrostatique et la rigidité diélectrique. Demande-moi pourquoi E=0 dans un conducteur, ce qu'est une cage de Faraday, ou la rigidité diélectrique de l'air.",
  rules: [
    { test:/champ.*int[ée]rieur.*conducteur|e\\s*=\\s*0.*conducteur/i, replies:["À l'équilibre électrostatique, le champ à l'intérieur d'un conducteur est nul : si ce n'était pas le cas, les électrons libres seraient mis en mouvement, ce qui contredirait l'hypothèse d'équilibre."] },
    { test:/cage de faraday|cavit[ée]/i, replies:["Le champ est nul dans toute cavité vide creusée dans un conducteur, quel que soit le champ extérieur appliqué. C'est le principe de la cage de Faraday : blindage électrostatique."] },
    { test:/rigidit[ée] di[ée]lectrique|claquage/i, replies:["La rigidité diélectrique est le champ électrique maximal qu'un isolant peut supporter avant de s'ioniser et de devenir conducteur (claquage). Pour l'air, elle vaut environ 3 MV/m."] },
    { test:/champ.*surface.*conducteur/i, replies:["Juste à la surface d'un conducteur portant une densité σ, le champ vaut E=σ/ε₀, perpendiculaire à la surface — à ne pas confondre avec σ/2ε₀, valable pour un plan infini isolé."] },
    { test:/effet de pointe|paratonnerre/i, replies:["Près d'une pointe, la charge se concentre fortement, donc σ (et le champ σ/ε₀) devient très intense localement : c'est l'effet de pointe, qui favorise le claquage de l'air et explique le principe du paratonnerre."] },
    { test:/o[ùu].*charge.*conducteur|r[ée]partition.*charge/i, replies:["Toute charge en excès sur un conducteur à l'équilibre se répartit uniquement à sa surface : à l'intérieur, la densité volumique de charge est nulle."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à ce qui arriverait aux électrons libres si E n'était pas nul.","Indice niveau 2 : ce mouvement contredirait l'équilibre.","Indice niveau 3 : E_int=0."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : attention à ne pas confondre avec le cas du plan infini isolé.","Indice niveau 2 : ici l'intérieur du conducteur a un champ nul, ce qui change le facteur.","Indice niveau 3 : E_surf=σ/ε₀."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce qui se produit lors d'un orage.","Indice niveau 2 : l'air devient soudainement conducteur.","Indice niveau 3 : c'est le claquage électrique."] }
  ]
};

/* =========================== CHAPITRE 7 — Courants électriques, conservation de la charge et loi d'Ohm =========================== */
EMAG_CHAPTERS[emagKey('Courants électriques, conservation de la charge et loi d\'Ohm')] = {
  objectives: [
    "Définir le vecteur densité de courant et le relier à l'intensité",
    "Établir l'équation de conservation de la charge sous ses formes intégrale et locale",
    "Retrouver la loi des nœuds comme conséquence du régime permanent",
    "Relier la conductivité microscopique du matériau à la loi d'Ohm macroscopique",
    "Analyser pourquoi la vitesse de dérive dérisoire des électrons n'empêche pas une ampoule de s'allumer quasi instantanément"
  ],
  prereqs: ["Conducteurs à l\'équilibre et rigidité diélectrique"],
  bodyHtml: `
    <p>En 1827, Georg Simon Ohm publie ses travaux sur la relation entre tension et courant — et se heurte d'abord au scepticisme, voire au mépris, de la communauté scientifique allemande, qui juge sa loi trop simple pour être vraie. Il faudra attendre sa reconnaissance par la Royal Society de Londres, des années plus tard, pour que son nom devienne l'unité de résistance que tout étudiant en physique connaît aujourd'hui. Ironiquement, la loi d'Ohm n'est pas une loi fondamentale de la Nature comme celles de Newton ou de Maxwell : c'est une loi de comportement, remarquablement bien vérifiée dans les métaux, mais qui peut être mise en défaut dans d'autres matériaux (semi-conducteurs, supraconducteurs).</p>
    <p>Chaque appareil électrique de ta maison, chaque puce de ton smartphone, chaque ligne à haute tension repose sur cette même loi de comportement, combinée à un principe bien plus fondamental et jamais mis en défaut : la conservation de la charge électrique. Que ce soit dans un circuit imprimé miniaturisé ou dans le réseau électrique national tout entier, la charge qui entre quelque part doit ressortir ailleurs — ou s'accumuler localement, ce que traduit précisément l'équation de continuité de ce chapitre.</p>
    <p>Après l'électrostatique (charges immobiles), ce chapitre introduit les charges en mouvement : les courants électriques. C'est le point de départ indispensable à la magnétostatique, puisque ce sont précisément les courants qui créent le champ magnétique. À la fin, tu comprendras pourquoi la loi des nœuds que tu utilises depuis le lycée n'est pas un simple postulat, mais une conséquence directe et rigoureuse de la conservation de la charge.</p>

    <h3>1. Des charges en mouvement</h3>
    <p>Un courant électrique correspond à un déplacement d'ensemble de charges. On le caractérise localement par le <strong>vecteur densité de courant</strong> $\\vec{j}$, défini de sorte que le courant élémentaire traversant une surface $d\\vec{S}$ soit $dI=\\vec{j}\\cdot d\\vec{S}$. Pour des porteurs de charge $q$, de densité volumique $n$ (nombre par unité de volume) et de vitesse d'ensemble $\\vec{v}_d$ (vitesse de dérive) :</p>
    <p>$$\\vec{j} = nq\\vec{v}_d$$</p>
    <p>Le courant total traversant une surface $S$ (ouverte) est $I=\\iint_S \\vec{j}\\cdot d\\vec{S}$.</p>

    <h3>2. Conservation de la charge : forme intégrale</h3>
    <p>La charge électrique est une grandeur qui se conserve : elle ne peut ni apparaître ni disparaître, seulement se déplacer. Pour tout volume fermé $V$ délimité par une surface $S$, la diminution de la charge intérieure par unité de temps est égale au courant sortant :</p>
    <p>$$\\oint_S \\vec{j}\\cdot d\\vec{S} = -\\dfrac{dQ_{int}}{dt}$$</p>

    <h3>3. Conservation de la charge : forme locale</h3>
    <p>En appliquant le théorème de la divergence au premier membre et en écrivant $Q_{int}=\\iiint_V \\rho\\,dV$, on obtient, pour tout volume :</p>
    <p>$$\\boxed{\\nabla\\cdot\\vec{j} = -\\dfrac{\\partial\\rho}{\\partial t}}$$</p>
    <p>C'est l'<strong>équation de continuité</strong>, forme locale de la conservation de la charge. En <strong>régime permanent</strong> (indépendant du temps), $\\partial\\rho/\\partial t=0$, donc $\\nabla\\cdot\\vec{j}=0$ : le vecteur densité de courant est alors à flux conservatif.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'équation de continuité ressemble beaucoup à la loi de Gauss locale $\\nabla\\cdot\\vec E=\\rho/\\epsilon_0$ vue au chapitre 3, mais elle contient une dérivée temporelle. En quoi ces deux équations traduisent-elles des idées physiques fondamentalement différentes — l'une une relation entre champ et source à un instant donné, l'autre une loi de conservation dans le temps ?
    </div>

    <h3>4. La loi des nœuds, conséquence du régime permanent</h3>
    <p>En intégrant $\\nabla\\cdot\\vec{j}=0$ sur un petit volume entourant un nœud d'un circuit électrique, on retrouve immédiatement la <strong>loi des nœuds</strong> de l'électrocinétique : la somme des intensités entrant dans un nœud est égale à la somme des intensités qui en sortent. Ce résultat, familier depuis les cours d'électrocinétique, est donc une conséquence directe de la conservation de la charge en régime permanent.</p>

    <h3>5. Vitesse des électrons et loi d'Ohm</h3>
    <p>Dans un conducteur métallique typique parcouru par un courant usuel, la vitesse de dérive des électrons $v_d$ est étonnamment faible — de l'ordre de $10^{-4}$ à $10^{-5}$ m/s, à comparer à la vitesse thermique d'agitation des électrons (de l'ordre de $10^6$ m/s) et à la vitesse de propagation du signal électrique lui-même (proche de la vitesse de la lumière). Ce qui se propage rapidement, c'est le champ électrique qui met en mouvement les électrons partout dans le circuit quasi simultanément, non le déplacement individuel des électrons.</p>
    <p>La <strong>conductivité</strong> $\\gamma$ (ou $\\sigma$, à ne pas confondre avec la densité surfacique de charge) relie linéairement la densité de courant au champ électrique local, dans un conducteur ohmique :</p>
    <p>$$\\vec{j} = \\gamma\\vec{E}$$</p>
    <p>C'est la forme locale, microscopique, de la <strong>loi d'Ohm</strong>. On en déduit la forme macroscopique bien connue $U=RI$ en intégrant cette relation le long d'un conducteur filiforme de section constante.</p>
    <table class="mini-table">
      <tr><th>Matériau</th><th>Conductivité typique (S/m)</th></tr>
      <tr><td>Cuivre</td><td>$\\approx 5,96\\times 10^7$</td></tr>
      <tr><td>Aluminium</td><td>$\\approx 3,5\\times 10^7$</td></tr>
      <tr><td>Silicium (semi-conducteur pur)</td><td>$\\approx 10^{-3}$</td></tr>
      <tr><td>Verre (isolant)</td><td>$\\approx 10^{-12}$</td></tr>
    </table>
    <p>La puissance dissipée par effet Joule, par unité de volume, s'écrit $p=\\vec{j}\\cdot\\vec{E}=\\gamma E^2$ ; intégrée sur un conducteur filiforme, elle redonne l'expression usuelle $P=UI=RI^2$.</p>

    <div class="key-point">
      <span class="eyebrow">Vitesse des électrons ≠ vitesse du signal</span>
      Allumer un interrupteur fait réagir une ampoule quasi instantanément, alors que les électrons eux-mêmes se déplacent à une vitesse de dérive dérisoire (quelques dixièmes de millimètre par seconde). Ce paradoxe apparent se résout en distinguant la vitesse de dérive des porteurs de charge de la vitesse de propagation du champ électrique dans le circuit, proche de celle de la lumière.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si tous les électrons libres d'un fil métallique se déplaçaient déjà, en permanence et dans tous les sens, à une vitesse thermique de l'ordre de 10⁶ m/s même sans courant appliqué, pourquoi cette agitation aléatoire ne produit-elle, à elle seule, aucun courant net mesurable ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La loi d'Ohm, si fiable dans les métaux ordinaires, cesse totalement de s'appliquer dans les supraconducteurs : en dessous d'une température critique, leur résistance devient rigoureusement nulle, un phénomène découvert par Heike Kamerlingh Onnes en 1911 (prix Nobel de physique 1913) et qui reste, plus d'un siècle plus tard, un domaine de recherche extrêmement actif — notamment la quête de supraconducteurs fonctionnant à température ambiante, qui révolutionnerait le transport de l'électricité en éliminant toute perte par effet Joule.</p>
    <p><strong>Question ouverte :</strong> dans les matériaux dits « non-ohmiques » (diodes, transistors, certains oxydes exotiques), la relation entre $\\vec j$ et $\\vec E$ devient non linéaire, voire dépend de l'histoire du matériau (mémoire résistive, ou « memristor »). Comprendre et exploiter ces comportements non linéaires est un axe de recherche majeur pour l'électronique de demain.</p>
    <p><strong>Technologie émergente :</strong> les memristors, composants électroniques dont la résistance dépend de la quantité de charge ayant déjà traversé le composant, sont étudiés comme brique de base de futures mémoires informatiques inspirées du fonctionnement des synapses neuronales.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Charges en mouvement ($\\vec j=nq\\vec v_d$) → conservation de la charge (équation de continuité) → régime permanent : loi des nœuds → loi d'Ohm locale $\\vec j=\\gamma\\vec E$ → loi d'Ohm macroscopique $U=RI$
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\nabla\\cdot\\vec{j} + \\frac{\\partial\\rho}{\\partial t} = 0$$
      Cette équation de continuité est l'expression la plus générale et la plus fondamentale de la conservation de la charge électrique — elle reste valable en toute circonstance, bien au-delà du régime permanent où elle se simplifie en la familière loi des nœuds.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Densité de courant : $\\vec{j}=nq\\vec{v}_d$, avec $dI=\\vec{j}\\cdot d\\vec{S}$</li>
        <li>Conservation de la charge (locale) : $\\nabla\\cdot\\vec{j}=-\\partial\\rho/\\partial t$ (équation de continuité)</li>
        <li>En régime permanent, $\\nabla\\cdot\\vec{j}=0$ : c'est cette relation qui donne la loi des nœuds</li>
        <li>Loi d'Ohm locale : $\\vec{j}=\\gamma\\vec{E}$, dont on déduit $U=RI$ à l'échelle macroscopique</li>
        <li>La vitesse de dérive des électrons est très faible ; c'est le champ électrique qui se propage rapidement dans le circuit</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre la vitesse de dérive des électrons avec la vitesse de propagation du signal électrique</li>
        <li>Oublier le signe moins dans l'équation de continuité $\\nabla\\cdot\\vec{j}=-\\partial\\rho/\\partial t$</li>
        <li>Confondre la conductivité $\\gamma$ (loi d'Ohm locale) avec la densité surfacique de charge $\\sigma$, deux grandeurs différentes malgré une notation parfois partagée</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La forme locale de la conservation de la charge s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag7e1" value="wrong"> $\\nabla\\cdot\\vec{j}=\\rho/\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag7e1" value="right"> $\\nabla\\cdot\\vec{j}=-\\partial\\rho/\\partial t$</label>
          <label class="option"><input type="radio" name="emag7e1" value="wrong"> $\\nabla\\wedge\\vec{j}=\\vec{0}$</label>
          <label class="option"><input type="radio" name="emag7e1" value="wrong"> $\\nabla\\cdot\\vec{j}=0$ toujours</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag7e1','emag7fb1','Correct — c\'est l\'équation de continuité ; elle ne se réduit à ∇·j=0 qu\'en régime permanent.','Attention, cette équation implique une dérivée temporelle de ρ, pas ε₀.')">Vérifier</button>
        <div class="feedback" id="emag7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La loi des nœuds en électrocinétique est une conséquence directe de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag7e2" value="wrong"> la loi de Gauss</label>
          <label class="option"><input type="radio" name="emag7e2" value="right"> la conservation de la charge en régime permanent</label>
          <label class="option"><input type="radio" name="emag7e2" value="wrong"> la loi de Faraday</label>
          <label class="option"><input type="radio" name="emag7e2" value="wrong"> la rigidité diélectrique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag7e2','emag7fb2','Correct — en régime permanent, ∇·j=0, ce qui donne exactement la loi des nœuds une fois intégré autour d\'un nœud.','Repense à la relation qui devient ∇·j=0 en régime permanent.')">Vérifier</button>
        <div class="feedback" id="emag7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un fil parcouru par un courant usuel, la vitesse de dérive des électrons est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag7e3" value="wrong"> proche de la vitesse de la lumière</label>
          <label class="option"><input type="radio" name="emag7e3" value="wrong"> de l'ordre de 100 m/s</label>
          <label class="option"><input type="radio" name="emag7e3" value="right"> très faible, de l'ordre de $10^{-4}$ m/s</label>
          <label class="option"><input type="radio" name="emag7e3" value="wrong"> nulle en régime permanent</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag7e3','emag7fb3','Correct — c\'est le champ électrique qui se propage vite dans le circuit, pas les électrons eux-mêmes.','Ne confonds pas la vitesse des électrons avec la vitesse de propagation du signal électrique.')">Vérifier</button>
        <div class="feedback" id="emag7fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la charge électrique n'était pas une grandeur conservée : quelles conséquences cela aurait-il sur la simple notion de circuit électrique fermé ?</li>
        <li>Pourquoi un matériau supraconducteur, à résistance nulle, ne permet-il pas pour autant une puissance électrique infinie dans un circuit ?</li>
        <li>Quelle serait la conséquence, pour la conception des réseaux électriques, si l'on découvrait un matériau ohmique parfait sans aucune limite de courant admissible ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>G. S. Ohm, <em>Die galvanische Kette, mathematisch bearbeitet</em>, 1827 — le mémoire fondateur de la loi d'Ohm.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur les courants et la conservation de la charge.</li>
        <li>H. Kamerlingh Onnes, « The Superconductivity of Mercury », Communications from the Physical Laboratory at the University of Leiden, 1911.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu quittes maintenant l'électrostatique pour de bon : les charges en mouvement que tu viens d'apprivoiser sont précisément celles qui, dans le chapitre suivant, vont créer un champ magnétique. « Magnétostatique : loi de Biot-Savart, force de Laplace et loi d'Ampère » va boucler la description du champ magnétique statique, comme les chapitres précédents ont bouclé celle du champ électrique. Comme le disait Ohm, longtemps raillé avant d'être reconnu : « La vérité ne craint aucune interrogation. » La sienne a fini par s'imposer, unité de mesure à l'appui.</p>
  `
};

EMAG_NOVA_KB[emagKey('Courants électriques, conservation de la charge et loi d\'Ohm')] = {
  intro: "Salut, moi c'est Nova ! On voit les courants électriques, la conservation de la charge et la loi d'Ohm locale. Demande-moi l'équation de continuité, pourquoi la loi des nœuds en découle, ou la différence entre vitesse de dérive et vitesse du signal.",
  rules: [
    { test:/[ée]quation de continuit[ée]|conservation.*charge/i, replies:["L'équation de continuité ∇·j=-∂ρ/∂t exprime que la charge se conserve localement : toute diminution de charge dans un volume est compensée par un courant sortant à travers sa frontière."] },
    { test:/loi des n[œoe]uds/i, replies:["En régime permanent, l'équation de continuité se réduit à ∇·j=0. En l'intégrant autour d'un nœud de circuit, on retrouve exactement la loi des nœuds : la somme des courants entrants égale la somme des courants sortants."] },
    { test:/loi d.ohm|conductivit[ée]/i, replies:["La loi d'Ohm locale s'écrit j=γE, où γ est la conductivité du matériau. En l'intégrant le long d'un fil de section constante, on retrouve la loi macroscopique U=RI."] },
    { test:/vitesse.*[ée]lectron|vitesse de d[ée]rive/i, replies:["La vitesse de dérive des électrons dans un fil est très faible (≈10⁻⁴ m/s), bien plus lente que la vitesse de propagation du signal électrique (proche de c). C'est le champ électrique qui se propage rapidement, pas les électrons eux-mêmes."] },
    { test:/densit[ée] de courant/i, replies:["La densité de courant j=nqv_d relie le courant au nombre de porteurs par unité de volume (n), leur charge (q) et leur vitesse de dérive (v_d). Le courant à travers une surface est I=∬j·dS."] },
    { test:/effet joule|puissance dissip[ée]e/i, replies:["La puissance dissipée par effet Joule par unité de volume est p=j·E=γE². Intégrée sur un conducteur filiforme, elle redonne P=UI=RI²."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : cette équation contient une dérivée temporelle de ρ, pas ε₀.","Indice niveau 2 : c'est l'équation de continuité.","Indice niveau 3 : ∇·j=-∂ρ/∂t."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelle relation devient ∇·j=0 en régime permanent ?","Indice niveau 2 : c'est la conservation de la charge.","Indice niveau 3 : la loi des nœuds en découle."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : ne confonds pas la vitesse des électrons avec celle du signal.","Indice niveau 2 : les électrons se déplacent en réalité très lentement.","Indice niveau 3 : environ 10⁻⁴ m/s."] }
  ]
};

/* =========================== CHAPITRE 8 — Magnétostatique : loi de Biot-Savart, force de Laplace et loi d'Ampère =========================== */
EMAG_CHAPTERS[emagKey('Magnétostatique : loi de Biot-Savart, force de Laplace et loi d\'Ampère')] = {
  objectives: [
    "Écrire la loi de Biot-Savart et l'utiliser pour calculer le champ magnétique créé par un courant",
    "Distinguer la force de Laplace (sur un courant) et la force de Lorentz magnétique (sur une charge)",
    "Énoncer la loi d'Ampère sous forme intégrale et l'appliquer à des distributions à haute symétrie",
    "Passer de la forme intégrale à la forme locale de la loi d'Ampère grâce au théorème du rotationnel",
    "Analyser le parallélisme structurel entre électrostatique et magnétostatique pour retenir plus facilement les formules du cours"
  ],
  prereqs: ["Courants électriques, conservation de la charge et loi d\'Ohm"],
  bodyHtml: `
    <p>En 1820, le physicien danois Hans Christian Ørsted remarque, presque par accident lors d'une démonstration de cours, qu'un fil parcouru par un courant fait dévier l'aiguille d'une boussole posée à proximité. Cette observation, en apparence anodine, électrise (au sens propre) la communauté scientifique européenne : en quelques semaines seulement, Jean-Baptiste Biot, Félix Savart et André-Marie Ampère formulent les lois qui portent aujourd'hui leur nom et qui bouclent la description du champ magnétique statique.</p>
    <p>Sans ces lois, ni le moteur électrique, ni le haut-parleur, ni l'IRM médicale (qui repose sur des champs magnétiques intenses générés par des bobines supraconductrices) n'existeraient. Chaque fois qu'un train à sustentation magnétique flotte au-dessus de ses rails, ou qu'un aimant de récupération soulève une carcasse de voiture dans une casse automobile, c'est très exactement la force de Laplace de ce chapitre qui est à l'œuvre.</p>
    <p>Nous savons désormais que des charges en mouvement (courants) existent : il est temps d'étudier le champ qu'elles créent, le champ magnétique $\\vec{B}$. Ce chapitre construit la magnétostatique en parallèle de l'électrostatique, avec ses deux lois fondamentales : Biot-Savart et Ampère. À la fin, tu sauras calculer le champ magnétique créé par un fil, une spire ou un solénoïde, et prédire la force qui s'exerce entre deux courants.</p>

    <h3>1. Loi de Biot-Savart</h3>
    <p>Le champ magnétique élémentaire créé en un point M par un élément de courant $Id\\vec{l}$ situé en un point source, à une distance $r$ de M, est :</p>
    <p>$$d\\vec{B} = \\dfrac{\\mu_0}{4\\pi}\\dfrac{Id\\vec{l}\\wedge\\hat{u}}{r^2}$$</p>
    <p>où $\\mu_0$ est la <strong>perméabilité du vide</strong> et $\\hat{u}$ le vecteur unitaire dirigé de la source vers M. Le champ total créé par un circuit s'obtient en intégrant cette expression sur tout le circuit. On retiendra la structure de cette loi : elle est l'analogue magnétique de la loi de Coulomb, avec un produit vectoriel à la place d'une simple multiplication, ce qui donne au champ magnétique une géométrie très différente du champ électrique (lignes de champ qui s'enroulent plutôt que de rayonner).</p>

    <h3>2. Champ créé par une charge en mouvement</h3>
    <p>Pour une charge ponctuelle $q$ de vitesse $\\vec{v}$, la loi de Biot-Savart se réécrit :</p>
    <p>$$\\vec{B} = \\dfrac{\\mu_0}{4\\pi}\\dfrac{q\\vec{v}\\wedge\\hat{u}}{r^2}$$</p>
    <p>Cette expression rappelle que le champ magnétique n'existe que pour des charges en mouvement — contrairement au champ électrique, présent même pour des charges immobiles.</p>

    <h3>3. Force de Laplace et force entre deux courants</h3>
    <p>La force exercée par un champ magnétique $\\vec{B}$ sur un élément de courant $Id\\vec{l}$ est la <strong>force de Laplace</strong> :</p>
    <p>$$d\\vec{F} = Id\\vec{l}\\wedge\\vec{B}$$</p>
    <p>Elle découle directement de la force de Lorentz magnétique $q\\vec{v}\\wedge\\vec{B}$ appliquée à l'ensemble des porteurs de charge en mouvement dans le conducteur. En combinant Biot-Savart et Laplace, on retrouve la force entre deux fils parallèles parcourus par des courants $I_1$ et $I_2$, distants de $d$ : deux courants de même sens s'attirent, deux courants de sens opposés se repoussent — c'est d'ailleurs cette force qui a longtemps servi à définir l'ampère.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La force de Laplace agit sur le fil conducteur (via les porteurs de charge en mouvement), pas directement sur le champ magnétique environnant. Pourtant, deux fils parallèles s'attirent ou se repoussent mutuellement. Comment expliquer cette réciprocité de la force à partir de la loi de Biot-Savart et de la force de Laplace prises séparément ?
    </div>

    <h3>4. Loi d'Ampère (forme intégrale)</h3>
    <p>De même que la loi de Gauss relie le flux de $\\vec{E}$ à la charge intérieure, la <strong>loi d'Ampère</strong> relie la circulation de $\\vec{B}$ le long d'un contour fermé $\\Gamma$ au courant qui traverse une surface s'appuyant sur ce contour :</p>
    <p>$$\\oint_\\Gamma \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{enlacé}$$</p>
    <p>Comme pour la loi de Gauss, cette loi devient un outil de calcul redoutablement efficace dès que l'on choisit un contour d'Ampère adapté à la symétrie du problème (cercle centré sur un fil rectiligne, rectangle pour un solénoïde infini).</p>

    <h3>5. Loi d'Ampère (forme locale)</h3>
    <p>Le <strong>théorème du rotationnel</strong> (ou théorème de Stokes) relie une circulation le long d'un contour fermé à un flux du rotationnel à travers une surface s'appuyant sur ce contour :</p>
    <p>$$\\oint_\\Gamma \\vec{A}\\cdot d\\vec{l} = \\iint_S (\\nabla\\wedge\\vec{A})\\cdot d\\vec{S}$$</p>
    <p>En l'appliquant à la loi d'Ampère, avec $I_{enlacé}=\\iint_S \\vec{j}\\cdot d\\vec{S}$, on obtient la version locale, valable point par point :</p>
    <p>$$\\boxed{\\nabla\\wedge\\vec{B} = \\mu_0\\vec{j}}$$</p>
    <p>Ce résultat complète, avec $\\nabla\\cdot\\vec{B}=0$ (le flux de $\\vec{B}$ à travers toute surface fermée est nul : il n'existe pas de « charge magnétique », voir chapitre suivant), le jeu des deux équations locales de la magnétostatique.</p>

    <div class="key-point">
      <span class="eyebrow">Une même architecture pour E et B</span>
      L'électrostatique et la magnétostatique se construisent en miroir : Coulomb ↔ Biot-Savart pour la loi de force élémentaire, Gauss ↔ Ampère pour la loi intégrale exploitant la symétrie, $\\nabla\\cdot\\vec{E}=\\rho/\\epsilon_0$ ↔ $\\nabla\\wedge\\vec{B}=\\mu_0\\vec{j}$ pour la forme locale. Reconnaître ce parallélisme aide énormément à retenir les formules.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le parallélisme entre E et B n'est pas parfait : $\\nabla\\cdot\\vec E=\\rho/\\epsilon_0$ admet une source (la charge), mais $\\nabla\\cdot\\vec B=0$ n'en admet aucune. Qu'est-ce que cette asymétrie révèle sur l'absence, jamais observée expérimentalement, de « monopôle magnétique » isolé ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>L'absence de monopôle magnétique observé reste l'une des grandes énigmes ouvertes de la physique fondamentale : certaines théories de grande unification prédisent leur existence à une échelle d'énergie inaccessible aux accélérateurs actuels, et des expériences dédiées (comme MoEDAL au CERN) continuent activement de les traquer. Par ailleurs, les aimants supraconducteurs du LHC, capables de générer des champs de 8 teslas grâce à la loi d'Ampère appliquée à des milliers de tours de câble supraconducteur, illustrent l'application la plus extrême de ce chapitre.</p>
    <p><strong>Question ouverte :</strong> si un monopôle magnétique était un jour détecté, la loi $\\nabla\\cdot\\vec B=0$ devrait être modifiée — une découverte qui bouleverserait la symétrie actuelle des équations de Maxwell entre champs électrique et magnétique.</p>
    <p><strong>Technologie émergente :</strong> les moteurs à lévitation magnétique (Maglev), utilisés par certains trains à très grande vitesse au Japon et en Chine, exploitent directement la force de Laplace entre des bobines supraconductrices embarquées et des aimants de la voie pour éliminer tout frottement mécanique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Courant $I$ (source) → loi de Biot-Savart → champ magnétique $\\vec B$ → force de Laplace sur un autre courant → loi d'Ampère (raccourci de calcul par symétrie)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\nabla\\wedge\\vec{B} = \\mu_0\\vec{j}$$
      Cette équation locale, associée à $\\nabla\\cdot\\vec B=0$, boucle entièrement la description du champ magnétostatique — exactement comme $\\nabla\\cdot\\vec E=\\rho/\\epsilon_0$ et $\\nabla\\wedge\\vec E=\\vec 0$ bouclaient celle du champ électrostatique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Loi de Biot-Savart : $d\\vec{B}=\\frac{\\mu_0}{4\\pi}\\frac{Id\\vec{l}\\wedge\\hat{u}}{r^2}$, analogue magnétique de la loi de Coulomb</li>
        <li>Force de Laplace : $d\\vec{F}=Id\\vec{l}\\wedge\\vec{B}$, exercée sur un courant plongé dans un champ B</li>
        <li>Deux courants parallèles de même sens s'attirent ; de sens opposés, ils se repoussent</li>
        <li>Loi d'Ampère (intégrale) : $\\oint_\\Gamma\\vec{B}\\cdot d\\vec{l}=\\mu_0 I_{enlacé}$</li>
        <li>Loi d'Ampère (locale) : $\\nabla\\wedge\\vec{B}=\\mu_0\\vec{j}$, obtenue via le théorème du rotationnel (Stokes)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le produit vectoriel dans la loi de Biot-Savart : le champ B n'est pas colinéaire à $\\hat{u}$, contrairement au champ E dans la loi de Coulomb</li>
        <li>Confondre force de Laplace (sur un courant, $Id\\vec{l}\\wedge\\vec{B}$) et force de Lorentz magnétique (sur une charge isolée, $q\\vec{v}\\wedge\\vec{B}$) : la seconde est à l'origine de la première</li>
        <li>Oublier que $I_{enlacé}$ dans la loi d'Ampère désigne le courant qui traverse une surface s'appuyant sur le contour, pas le courant total du circuit</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Deux fils parallèles parcourus par des courants de même sens :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag8e1" value="wrong"> se repoussent</label>
          <label class="option"><input type="radio" name="emag8e1" value="right"> s'attirent</label>
          <label class="option"><input type="radio" name="emag8e1" value="wrong"> n'interagissent pas</label>
          <label class="option"><input type="radio" name="emag8e1" value="wrong"> oscillent l'un autour de l'autre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag8e1','emag8fb1','Correct — deux courants parallèles de même sens s\'attirent ; de sens opposés, ils se repoussent.','Rappelle-toi la règle utilisée historiquement pour définir l\'ampère à partir de la force entre deux fils.')">Vérifier</button>
        <div class="feedback" id="emag8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La forme locale de la loi d'Ampère s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag8e2" value="wrong"> $\\nabla\\cdot\\vec{B}=\\mu_0 j$</label>
          <label class="option"><input type="radio" name="emag8e2" value="right"> $\\nabla\\wedge\\vec{B}=\\mu_0\\vec{j}$</label>
          <label class="option"><input type="radio" name="emag8e2" value="wrong"> $\\nabla\\wedge\\vec{E}=\\mu_0\\vec{j}$</label>
          <label class="option"><input type="radio" name="emag8e2" value="wrong"> $\\oint\\vec{B}\\cdot d\\vec{S}=\\mu_0 I$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag8e2','emag8fb2','Correct — obtenue via le théorème du rotationnel appliqué à la loi d\'Ampère intégrale.','La forme locale utilise le rotationnel de B, pas sa divergence, et concerne B, pas E.')">Vérifier</button>
        <div class="feedback" id="emag8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La force de Laplace exercée sur un élément de courant $Id\\vec{l}$ dans un champ $\\vec{B}$ s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag8e3" value="wrong"> $d\\vec{F}=q\\vec{v}\\wedge\\vec{B}$</label>
          <label class="option"><input type="radio" name="emag8e3" value="right"> $d\\vec{F}=Id\\vec{l}\\wedge\\vec{B}$</label>
          <label class="option"><input type="radio" name="emag8e3" value="wrong"> $d\\vec{F}=Id\\vec{l}\\cdot\\vec{B}$</label>
          <label class="option"><input type="radio" name="emag8e3" value="wrong"> $d\\vec{F}=\\mu_0 Id\\vec{l}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag8e3','emag8fb3','Correct — c\'est la force de Laplace, qui découle de la force de Lorentz magnétique appliquée aux porteurs de charge du courant.','La force de Laplace s\'exprime avec un produit vectoriel entre l\'élément de courant et B, pas un produit scalaire.')">Vérifier</button>
        <div class="feedback" id="emag8fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si des monopôles magnétiques existaient en abondance dans la Nature : comment cela changerait-il la conception des boussoles et des aimants ?</li>
        <li>Pourquoi la loi de Biot-Savart, contrairement à la loi de Coulomb, fait-elle intervenir un produit vectoriel plutôt qu'une simple proportionnalité ?</li>
        <li>Quelle serait la conséquence, pour le transport ferroviaire, d'une amélioration majeure des matériaux supraconducteurs utilisés dans les trains à lévitation magnétique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A.-M. Ampère, <em>Mémoire sur la théorie mathématique des phénomènes électro-dynamiques</em>, 1826 — l'ouvrage fondateur de l'électrodynamique.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur la magnétostatique.</li>
        <li>MoEDAL Collaboration, « Search for Magnetic Monopoles with the MoEDAL Forward Trapping Detector », Physical Review Letters, 2021.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais les deux lois fondamentales de la magnétostatique, en parfait miroir de celles de l'électrostatique. Le chapitre suivant, « Opérateur nabla et théorèmes intégraux », va formaliser et généraliser les outils mathématiques (divergence, rotationnel, gradient) que tu as utilisés jusqu'ici de façon plus intuitive — une étape indispensable avant d'aborder l'induction électromagnétique et les équations de Maxwell complètes. Comme le disait Ampère : « La théorie n'est que la pratique comprise et généralisée. » Tu comprends déjà bien plus de pratique que tu ne le crois.</p>
  `
};

EMAG_NOVA_KB[emagKey('Magnétostatique : loi de Biot-Savart, force de Laplace et loi d\'Ampère')] = {
  intro: "Salut, moi c'est Nova ! On attaque la magnétostatique : Biot-Savart, force de Laplace, loi d'Ampère. Demande-moi la loi de Biot-Savart, la différence entre force de Laplace et de Lorentz, ou la loi d'Ampère locale.",
  rules: [
    { test:/biot.savart/i, replies:["La loi de Biot-Savart dB=(μ0/4π)(I dl∧û)/r² donne le champ magnétique créé par un élément de courant. C'est l'analogue magnétique de la loi de Coulomb, mais avec un produit vectoriel : B n'est pas colinéaire à û."] },
    { test:/force de laplace/i, replies:["La force de Laplace dF=I dl∧B est la force exercée par un champ magnétique sur un élément de courant. Elle découle de la force de Lorentz magnétique qvB appliquée à l'ensemble des porteurs de charge du courant."] },
    { test:/loi d.amp[èe]re.*locale|forme locale.*amp[èe]re/i, replies:["La forme locale de la loi d'Ampère est ∇∧B=μ0 j, obtenue à partir de la forme intégrale via le théorème du rotationnel (Stokes), de la même façon que ∇·E=ρ/ε₀ s'obtient à partir de Gauss via la divergence."] },
    { test:/loi d.amp[èe]re/i, replies:["La loi d'Ampère (forme intégrale) : la circulation de B le long d'un contour fermé vaut μ0 fois le courant enlacé, ∮B·dl=μ0 I_enlacé. Très efficace avec un contour adapté à la symétrie (cercle pour un fil, rectangle pour un solénoïde)."] },
    { test:/deux fils|force entre.*courants/i, replies:["Deux fils parallèles parcourus par des courants de même sens s'attirent ; de sens opposés, ils se repoussent. Cette force a longtemps servi à définir l'ampère."] },
    { test:/th[ée]or[èe]me du rotationnel|stokes/i, replies:["Le théorème du rotationnel (Stokes) relie la circulation d'un champ le long d'un contour fermé au flux de son rotationnel à travers une surface qui s'appuie sur ce contour : ∮A·dl=∬(∇∧A)·dS."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : rappelle-toi la règle des courants parallèles.","Indice niveau 2 : même sens ou sens opposé ne donnent pas le même comportement.","Indice niveau 3 : même sens → attraction."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : la forme locale concerne le rotationnel de B, pas sa divergence.","Indice niveau 2 : elle relie ∇∧B à la densité de courant j.","Indice niveau 3 : ∇∧B=μ0j."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : la force de Laplace utilise un produit vectoriel.","Indice niveau 2 : elle s'applique à un élément de courant I dl, pas à une charge isolée.","Indice niveau 3 : dF=I dl∧B."] }
  ]
};

/* =========================== CHAPITRE 9 — Opérateur nabla et théorèmes intégraux =========================== */
EMAG_CHAPTERS[emagKey('Opérateur nabla et théorèmes intégraux')] = {
  objectives: [
    "Manipuler l'opérateur nabla comme un opérateur vectoriel unique regroupant gradient, divergence et rotationnel",
    "Reconnaître les combinaisons usuelles de nabla (laplacien scalaire et vectoriel, divergence d'un rotationnel, rotationnel d'un gradient)",
    "Relier les quatre grands théorèmes intégraux (Gauss, Green-Ostrogradski, Stokes) à leur usage dans les lois de l'électromagnétisme",
    "Utiliser ces identités pour anticiper la structure des équations de Maxwell",
    "Analyser pourquoi les identités $\\nabla\\cdot(\\nabla\\wedge\\vec A)=0$ et $\\nabla\\wedge(\\nabla V)=\\vec 0$ garantissent la cohérence interne de l'électromagnétisme"
  ],
  prereqs: ["Magnétostatique : loi de Biot-Savart, force de Laplace et loi d\'Ampère"],
  bodyHtml: `
    <p>William Rowan Hamilton introduit le symbole $\\nabla$ (qu'il baptise « nabla », du nom d'une harpe assyrienne à la forme évocatrice) au milieu du XIXe siècle, sans se douter qu'il deviendrait l'un des symboles les plus utilisés de toute la physique mathématique. Ce qui n'était d'abord qu'une notation compacte s'est révélé être un véritable outil unificateur : gradient, divergence et rotationnel, trois opérations qui semblent a priori très différentes, ne sont en réalité que trois façons distinctes de combiner ce même opérateur avec un champ.</p>
    <p>Cette unification n'est pas qu'une élégance esthétique : c'est elle qui permettra, dans quelques chapitres, d'écrire les quatre équations de Maxwell sur une seule ligne compacte, plutôt que sous la forme de multiples relations disparates. Les ingénieurs qui simulent numériquement un champ électromagnétique complexe (autour d'une antenne, dans un moteur électrique) manipulent quotidiennement ces mêmes opérateurs, encapsulés dans des logiciels de calcul scientifique.</p>
    <p>Les chapitres précédents ont introduit séparément le gradient, la divergence et le rotationnel. Ce chapitre les rassemble sous un même formalisme, l'opérateur nabla $\\nabla$, et présente les identités qui serviront directement à construire les équations de Maxwell. À la fin, tu manipuleras ces trois opérateurs avec la même aisance, comme les trois facettes d'un seul et même outil.</p>

    <h3>1. L'opérateur nabla</h3>
    <p>En coordonnées cartésiennes, on définit l'opérateur vectoriel :</p>
    <p>$$\\nabla = \\hat{e}_x\\dfrac{\\partial}{\\partial x} + \\hat{e}_y\\dfrac{\\partial}{\\partial y} + \\hat{e}_z\\dfrac{\\partial}{\\partial z}$$</p>
    <p>Selon la façon dont on le combine avec un champ, $\\nabla$ redonne les trois opérateurs déjà rencontrés :</p>
    <table class="mini-table">
      <tr><th>Opération</th><th>Notation</th><th>Résultat sur...</th></tr>
      <tr><td>Gradient</td><td>$\\nabla V$</td><td>un champ scalaire → un champ vectoriel</td></tr>
      <tr><td>Divergence</td><td>$\\nabla\\cdot\\vec{A}$</td><td>un champ vectoriel → un champ scalaire</td></tr>
      <tr><td>Rotationnel</td><td>$\\nabla\\wedge\\vec{A}$</td><td>un champ vectoriel → un champ vectoriel</td></tr>
    </table>

    <h3>2. Le laplacien</h3>
    <p>En combinant deux fois nabla, on définit le <strong>laplacien scalaire</strong> d'un champ scalaire $V$ :</p>
    <p>$$\\Delta V = \\nabla\\cdot(\\nabla V) = \\dfrac{\\partial^2 V}{\\partial x^2} + \\dfrac{\\partial^2 V}{\\partial y^2} + \\dfrac{\\partial^2 V}{\\partial z^2}$$</p>
    <p>et, appliqué composante par composante, le <strong>laplacien vectoriel</strong> $\\Delta\\vec{A}$ d'un champ vectoriel. Le laplacien apparaîtra directement dans l'équation de propagation des ondes électromagnétiques (chapitre 11).</p>

    <h3>3. Deux identités remarquables</h3>
    <p>Deux résultats, valables pour tout champ suffisamment régulier, sont utilisés en permanence en électromagnétisme :</p>
    <p>$$\\nabla\\cdot(\\nabla\\wedge\\vec{A}) = 0 \\qquad\\qquad \\nabla\\wedge(\\nabla V) = \\vec{0}$$</p>
    <p>La première identité justifie immédiatement que $\\nabla\\cdot\\vec{B}=0$ soit compatible avec l'écriture $\\vec{B}=\\nabla\\wedge\\vec{A}$ (potentiel vecteur) ; la seconde confirme que tout champ dérivant d'un potentiel scalaire, comme $\\vec{E}=-\\nabla V$ en électrostatique, est nécessairement irrotationnel.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Ces deux identités ($\\nabla\\cdot(\\nabla\\wedge\\vec A)=0$ et $\\nabla\\wedge(\\nabla V)=\\vec 0$) sont de pures propriétés mathématiques, vraies pour n'importe quel champ, indépendamment de toute physique. En quoi le fait que $\\nabla\\cdot\\vec B=0$ soit toujours vrai est-il, malgré tout, une information physique profonde sur la Nature (l'absence de monopôle magnétique) et pas seulement une tautologie mathématique ?
    </div>

    <h3>4. Les théorèmes intégraux : une vue d'ensemble</h3>
    <p>Trois théorèmes relient une opération différentielle locale (divergence, rotationnel) à une intégrale sur un domaine de dimension supérieure. Ils ont chacun déjà été utilisés dans ce cours :</p>
    <table class="mini-table">
      <tr><th>Théorème</th><th>Relation</th><th>Usage dans ce cours</th></tr>
      <tr><td>Green-Ostrogradski (divergence)</td><td>$\\oint_S\\vec{A}\\cdot d\\vec{S}=\\iiint_V(\\nabla\\cdot\\vec{A})\\,dV$</td><td>Gauss intégrale → Gauss locale ; conservation de la charge</td></tr>
      <tr><td>Stokes (rotationnel)</td><td>$\\oint_\\Gamma\\vec{A}\\cdot d\\vec{l}=\\iint_S(\\nabla\\wedge\\vec{A})\\cdot d\\vec{S}$</td><td>Ampère intégrale → Ampère locale ; loi de Faraday</td></tr>
      <tr><td>Gradient</td><td>$\\displaystyle\\int_A^B \\nabla V\\cdot d\\vec{l}=V(B)-V(A)$</td><td>Définition du potentiel à partir de $\\vec{E}=-\\nabla V$</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Pourquoi ce chapitre est charnière</span>
      Toute la suite du cours — Faraday, Maxwell, ondes — repose sur des manipulations combinant gradient, divergence et rotationnel. Maîtriser nabla comme un objet unique, plutôt que trois opérateurs séparés, est ce qui permet de retenir et de manipuler efficacement les quatre équations de Maxwell au chapitre 11.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème de Green-Ostrogradski réduit une intégrale de surface (2D) à une intégrale de volume (3D), tandis que le théorème de Stokes réduit une intégrale de contour (1D) à une intégrale de surface (2D). Vois-tu un principe commun sous-jacent à ces deux passages, qui relie toujours une frontière à ce qu'elle délimite ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Ces théorèmes intégraux, apparemment purement techniques, s'inscrivent en réalité dans un cadre mathématique bien plus vaste et profond : le théorème de Stokes généralisé, formulé dans le langage des formes différentielles, unifie en une seule relation les théorèmes de Green, Stokes et Gauss-Ostrogradski que tu viens d'étudier séparément. Ce formalisme, développé au XXe siècle, est aujourd'hui l'outil de base de la géométrie différentielle utilisée en relativité générale et en théorie des jauges (le cadre mathématique du Modèle Standard de la physique des particules).</p>
    <p><strong>Question ouverte :</strong> peut-on généraliser ces théorèmes à des espaces de dimension quelconque, voire à des géométries non euclidiennes (courbes) ? La réponse, positive, est au cœur des mathématiques utilisées par la physique théorique contemporaine, mais son application pratique à des problèmes physiques concrets reste un champ de recherche actif.</p>
    <p><strong>Technologie émergente :</strong> les logiciels de calcul par éléments finis, utilisés pour simuler des champs électromagnétiques complexes en ingénierie, encodent directement des versions discrétisées de ces théorèmes intégraux pour résoudre numériquement les équations de Maxwell sur des géométries arbitraires.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Gradient, divergence, rotationnel → unifiés sous l'opérateur $\\nabla$ → identités remarquables ($\\nabla\\cdot\\nabla\\wedge=0$, $\\nabla\\wedge\\nabla=0$) → théorèmes intégraux (Green-Ostrogradski, Stokes) → passerelle vers les équations de Maxwell
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\nabla\\cdot(\\nabla\\wedge\\vec{A}) = 0 \\qquad \\nabla\\wedge(\\nabla V) = \\vec{0}$$
      Ces deux identités, en apparence de simples curiosités mathématiques, garantissent à elles seules la cohérence interne de toute la structure de l'électromagnétisme, du potentiel vecteur $\\vec B=\\nabla\\wedge\\vec A$ au potentiel scalaire $\\vec E=-\\nabla V$.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$\\nabla$ regroupe gradient ($\\nabla V$), divergence ($\\nabla\\cdot\\vec{A}$) et rotationnel ($\\nabla\\wedge\\vec{A}$)</li>
        <li>Le laplacien $\\Delta V=\\nabla\\cdot(\\nabla V)$ apparaîtra dans l'équation de propagation des ondes</li>
        <li>$\\nabla\\cdot(\\nabla\\wedge\\vec{A})=0$ : la divergence d'un rotationnel est toujours nulle</li>
        <li>$\\nabla\\wedge(\\nabla V)=\\vec{0}$ : le rotationnel d'un gradient est toujours nul</li>
        <li>Green-Ostrogradski relie flux et divergence ; Stokes relie circulation et rotationnel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre laplacien scalaire ($\\Delta V$, un scalaire) et laplacien vectoriel ($\\Delta\\vec{A}$, un vecteur appliqué composante par composante)</li>
        <li>Croire que $\\nabla\\cdot(\\nabla\\wedge\\vec{A})$ peut être non nul dans certains cas particuliers : cette identité est toujours vraie</li>
        <li>Mélanger le théorème de Green-Ostrogradski (surface fermée → volume) et celui de Stokes (contour fermé → surface ouverte)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La divergence d'un rotationnel, $\\nabla\\cdot(\\nabla\\wedge\\vec{A})$, vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag9e1" value="wrong"> $\\vec{A}$</label>
          <label class="option"><input type="radio" name="emag9e1" value="right"> $0$, toujours</label>
          <label class="option"><input type="radio" name="emag9e1" value="wrong"> $\\Delta A$</label>
          <label class="option"><input type="radio" name="emag9e1" value="wrong"> dépend du champ $\\vec{A}$ choisi</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag9e1','emag9fb1','Correct — c\'est une identité vectorielle toujours vraie, indépendante du champ A.','C\'est une des deux identités remarquables du chapitre : elle est vraie pour tout champ A, sans exception.')">Vérifier</button>
        <div class="feedback" id="emag9fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le théorème qui relie une circulation le long d'un contour fermé à un flux du rotationnel est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag9e2" value="wrong"> le théorème de Green-Ostrogradski</label>
          <label class="option"><input type="radio" name="emag9e2" value="right"> le théorème de Stokes (du rotationnel)</label>
          <label class="option"><input type="radio" name="emag9e2" value="wrong"> la loi de Gauss</label>
          <label class="option"><input type="radio" name="emag9e2" value="wrong"> la loi d'Ohm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag9e2','emag9fb2','Correct — Stokes relie circulation (contour fermé) et rotationnel (surface qui s\'appuie dessus).','Green-Ostrogradski concerne une surface fermée et un volume ; ici il s\'agit d\'un contour fermé et d\'une surface.')">Vérifier</button>
        <div class="feedback" id="emag9fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le laplacien scalaire $\\Delta V$ est défini comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag9e3" value="wrong"> $\\nabla\\wedge(\\nabla V)$</label>
          <label class="option"><input type="radio" name="emag9e3" value="right"> $\\nabla\\cdot(\\nabla V)$</label>
          <label class="option"><input type="radio" name="emag9e3" value="wrong"> $\\nabla V \\wedge \\nabla V$</label>
          <label class="option"><input type="radio" name="emag9e3" value="wrong"> $(\\nabla V)^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag9e3','emag9fb3','Correct — le laplacien scalaire est la divergence du gradient, une somme de dérivées secondes.','Le laplacien combine deux applications de nabla : d\'abord un gradient, puis une divergence.')">Vérifier</button>
        <div class="feedback" id="emag9fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'identité $\\nabla\\wedge(\\nabla V)=\\vec 0$ n'était pas toujours vraie : l'existence même d'un potentiel électrostatique resterait-elle possible ?</li>
        <li>Pourquoi les théorèmes intégraux permettent-ils souvent de résoudre des problèmes physiques sans jamais avoir à calculer explicitement l'intégrale la plus difficile ?</li>
        <li>Quelle serait la conséquence, pour la simulation numérique de champs électromagnétiques complexes, de l'absence de ces théorèmes intégraux ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. R. Hamilton, <em>Lectures on Quaternions</em>, 1853 — origine historique de la notation nabla.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — annexe mathématique sur les opérateurs différentiels.</li>
        <li>M. Nakahara, <em>Geometry, Topology and Physics</em>, IOP Publishing — présentation moderne du théorème de Stokes généralisé et des formes différentielles.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant de la boîte à outils mathématique complète : nabla, ses combinaisons, et les théorèmes qui les relient à des intégrales. Le chapitre suivant, « Induction électromagnétique : loi de Faraday et inductance », va enfin faire bouger ce qui, jusqu'ici, était figé dans le temps — et c'est précisément là que l'électricité et le magnétisme, longtemps étudiés séparément, vont commencer à se répondre l'un l'autre. Comme le disait Hamilton lui-même à propos de sa découverte des quaternions : « Je sentais que le problème avait été résolu, un nœud intellectuel avait été dénoué. » Nabla est ce nœud, enfin dénoué pour toi.</p>
  `
};

EMAG_NOVA_KB[emagKey('Opérateur nabla et théorèmes intégraux')] = {
  intro: "Salut, moi c'est Nova ! On rassemble gradient, divergence et rotationnel sous l'opérateur nabla, et on revoit les théorèmes intégraux. Demande-moi ce qu'est le laplacien, la différence entre Green-Ostrogradski et Stokes, ou les identités avec nabla.",
  rules: [
    { test:/laplacien/i, replies:["Le laplacien scalaire ΔV=∇·(∇V) est une somme de dérivées secondes. Le laplacien vectoriel ΔA s'applique composante par composante. Il apparaîtra dans l'équation de propagation des ondes électromagnétiques."] },
    { test:/nabla/i, replies:["L'opérateur nabla ∇ regroupe en un seul objet le gradient (∇V), la divergence (∇·A) et le rotationnel (∇∧A), selon la façon dont on le combine avec un champ scalaire ou vectoriel."] },
    { test:/green.ostrogradski|th[ée]or[èe]me de la divergence/i, replies:["Le théorème de Green-Ostrogradski relie le flux d'un champ à travers une surface FERMÉE à l'intégrale de sa divergence sur le volume intérieur : ∮A·dS=∭(∇·A)dV."] },
    { test:/stokes|th[ée]or[èe]me du rotationnel/i, replies:["Le théorème de Stokes relie la circulation d'un champ le long d'un contour FERMÉ à l'intégrale de son rotationnel sur une surface ouverte qui s'appuie sur ce contour : ∮A·dl=∬(∇∧A)·dS."] },
    { test:/identit[ée]s? remarquable|divergence.*rotationnel.*nul|rotationnel.*gradient.*nul/i, replies:["Deux identités reviennent constamment : ∇·(∇∧A)=0 (la divergence d'un rotationnel est toujours nulle) et ∇∧(∇V)=0 (le rotationnel d'un gradient est toujours nul)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : c'est une identité vectorielle générale.","Indice niveau 2 : elle ne dépend pas du champ A choisi.","Indice niveau 3 : elle vaut toujours 0."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce qui relie contour fermé et surface (pas volume).","Indice niveau 2 : ce n'est pas Green-Ostrogradski, qui concerne les volumes.","Indice niveau 3 : c'est Stokes."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : le laplacien combine deux opérations de nabla.","Indice niveau 2 : d'abord un gradient, puis une divergence.","Indice niveau 3 : ΔV=∇·(∇V)."] }
  ]
};

/* =========================== CHAPITRE 10 — Induction électromagnétique : loi de Faraday et inductance =========================== */
EMAG_CHAPTERS[emagKey('Induction électromagnétique : loi de Faraday et inductance')] = {
  objectives: [
    "Décrire le phénomène d'induction électromagnétique et la notion de force électromotrice",
    "Énoncer la loi de Faraday sous ses formes intégrale et locale, et la règle du flux",
    "Distinguer inductance mutuelle et self-inductance, et calculer l'énergie stockée dans un champ magnétique",
    "Comprendre pourquoi le champ électrique induit n'est pas conservatif",
    "Évaluer, à partir de la règle de Lenz, le sens du courant induit dans une configuration donnée sans calcul explicite"
  ],
  prereqs: ["Opérateur nabla et théorèmes intégraux"],
  bodyHtml: `
    <p>En 1831, après des années d'expérimentations acharnées, Michael Faraday — un homme sans formation mathématique poussée, mais doté d'une intuition physique exceptionnelle — découvre qu'un aimant que l'on déplace près d'une bobine de fil y fait naître un courant électrique, sans aucun contact ni pile. Cette découverte, en apparence modeste, est en réalité l'une des plus lourdes de conséquences de toute l'histoire des sciences : elle rend possible, pour la première fois, la conversion directe de l'énergie mécanique en énergie électrique.</p>
    <p>Sans ce phénomène, aucune centrale électrique ne pourrait produire d'électricité (qu'elle soit hydraulique, nucléaire, éolienne ou thermique — toutes reposent sur des générateurs faisant tourner une bobine dans un champ magnétique), et aucun transformateur ne pourrait ajuster la tension entre une ligne à haute tension et ta prise murale. Le simple fait de recharger sans fil un smartphone posé sur un socle repose, cent quatre-vingt-dix ans plus tard, sur cette même découverte de Faraday.</p>
    <p>Jusqu'ici, champ électrique et champ magnétique ont été étudiés séparément, chacun en régime statique. Ce chapitre établit le premier véritable pont entre les deux : un champ magnétique <strong>variable</strong> crée un champ électrique. C'est le phénomène d'induction électromagnétique, découvert par Faraday, à la base de tous les générateurs et transformateurs électriques. À la fin, tu sauras prédire, sans calcul, le sens d'un courant induit, et calculer l'énergie stockée dans une bobine.</p>

    <h3>1. Force électromotrice</h3>
    <p>La <strong>force électromotrice</strong> (fem, notée $e$ ou $\\varepsilon$) d'un circuit est le travail par unité de charge fourni par un phénomène non électrostatique pour faire circuler un courant. Une fem peut apparaître de deux façons : par un mouvement mécanique du circuit dans un champ magnétique fixe (fem « due au mouvement », via la force de Lorentz magnétique sur les porteurs de charge), ou par la variation temporelle du champ magnétique lui-même, à circuit immobile.</p>

    <h3>2. Loi de Faraday (forme intégrale)</h3>
    <p>Dans les deux cas, on observe expérimentalement que la fem induite dans un circuit fermé est égale à l'opposé de la dérivée temporelle du flux magnétique $\\Phi_B=\\iint_S \\vec{B}\\cdot d\\vec{S}$ à travers une surface s'appuyant sur ce circuit :</p>
    <p>$$e = \\oint_\\Gamma \\vec{E}\\cdot d\\vec{l} = -\\dfrac{d\\Phi_B}{dt}$$</p>
    <p>C'est la <strong>loi de Faraday</strong>. Le signe moins traduit la <strong>règle de Lenz</strong> : le courant induit s'oppose toujours à la cause qui lui a donné naissance (il crée un champ magnétique qui s'oppose à la variation de flux).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si le signe moins de la règle de Lenz était un signe plus (le courant induit amplifiait, au lieu de s'opposer à, la variation de flux), que se passerait-il physiquement en approchant un aimant d'une bobine ? Réfléchis en termes de conservation de l'énergie.
    </div>

    <h3>3. Loi de Faraday (forme locale)</h3>
    <p>En appliquant le théorème de Stokes au premier membre, on obtient la forme locale, valable point par point :</p>
    <p>$$\\boxed{\\nabla\\wedge\\vec{E} = -\\dfrac{\\partial\\vec{B}}{\\partial t}}$$</p>
    <p>Ce résultat généralise celui du chapitre 5 : en régime <strong>statique</strong> ($\\partial\\vec{B}/\\partial t=0$), on retrouve bien $\\nabla\\wedge\\vec{E}=\\vec{0}$. Mais dès que $\\vec{B}$ varie dans le temps, <strong>le champ électrique induit n'est plus irrotationnel</strong> : il ne dérive plus d'un simple potentiel scalaire, et sa circulation sur un contour fermé n'est en général plus nulle. C'est une différence fondamentale avec l'électrostatique pure.</p>

    <h3>4. Inductance mutuelle et self-inductance</h3>
    <p>Le flux magnétique créé par un circuit 1 à travers un circuit 2 est proportionnel au courant $I_1$ qui parcourt le circuit 1 : $\\Phi_{1\\to2}=M I_1$, où $M$ est l'<strong>inductance mutuelle</strong> des deux circuits (en henry, H). De même, un circuit crée à travers lui-même un flux $\\Phi=LI$, où $L$ est sa <strong>self-inductance</strong> (ou inductance propre). Toute variation de courant $I$ dans un circuit induit donc, dans ce circuit lui-même, une fem d'auto-induction :</p>
    <p>$$e = -L\\dfrac{dI}{dt}$$</p>

    <h3>5. Énergie magnétique</h3>
    <p>De même que le champ électrique stocke une énergie $u_E=\\frac{1}{2}\\epsilon_0 E^2$ par unité de volume, le champ magnétique stocke une énergie :</p>
    <p>$$u_B = \\dfrac{1}{2\\mu_0}B^2$$</p>
    <p>L'énergie totale stockée dans une bobine d'inductance $L$ parcourue par un courant $I$ s'écrit $W=\\frac{1}{2}LI^2$, résultat que l'on retrouve en intégrant $u_B$ sur tout le volume où règne le champ magnétique de la bobine.</p>

    <div class="key-point">
      <span class="eyebrow">Un champ E « bizarre »</span>
      Le champ électrique induit par un flux magnétique variable a une propriété déroutante : il n'existe pas de potentiel scalaire $V$ tel que $\\vec{E}=-\\nabla V$ dans ce cas, puisque $\\nabla\\wedge\\vec{E}\\neq\\vec{0}$. Faire circuler une charge le long d'un contour fermé dans ce champ produit un travail net non nul — c'est précisément ce travail qui permet de faire fonctionner un générateur électrique.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un générateur électrique convertit de l'énergie mécanique en énergie électrique en exploitant précisément le fait que $\\nabla\\wedge\\vec E\\neq\\vec 0$. En électrostatique pure, $\\nabla\\wedge\\vec E=\\vec 0$ empêchait tout travail net sur un contour fermé. Pourquoi cette impossibilité en régime statique est-elle une nécessité, et non une simple coïncidence, du point de vue de la conservation de l'énergie ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>L'induction électromagnétique reste un sujet de recherche technologique extrêmement actif : la recharge sans fil par induction, présente dans les smartphones et de plus en plus dans les véhicules électriques, cherche à améliorer son rendement énergétique et sa portée. À une tout autre échelle, les détecteurs d'ondes gravitationnelles LIGO et Virgo (récompensés par le prix Nobel de physique 2017) utilisent des principes d'induction extrêmement sensibles pour convertir d'infimes déformations de l'espace-temps en signaux électriques mesurables.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des matériaux ou des géométries de bobines qui maximisent le couplage inductif sur de plus longues distances, sans perte excessive d'énergie ? C'est un enjeu majeur pour la recharge sans fil longue portée, toujours en développement actif.</p>
    <p><strong>Technologie émergente :</strong> les trains à sustentation magnétique (Maglev) et certains systèmes de freinage régénératif des véhicules électriques exploitent directement l'induction électromagnétique (via les courants de Foucault) pour convertir l'énergie cinétique en énergie électrique récupérable.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Flux magnétique variable ($d\\Phi_B/dt\\neq 0$) → fem induite (loi de Faraday) → courant induit (règle de Lenz) → énergie stockée dans le champ magnétique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\nabla\\wedge\\vec{E} = -\\frac{\\partial\\vec{B}}{\\partial t}$$
      Cette équation est la troisième des quatre équations de Maxwell : elle relie enfin, pour la première fois dans ce cours, le champ électrique et le champ magnétique — la véritable naissance de l'électro-magnétisme comme théorie unifiée.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Loi de Faraday (intégrale) : $e=\\oint\\vec{E}\\cdot d\\vec{l}=-d\\Phi_B/dt$ ; loi de Faraday (locale) : $\\nabla\\wedge\\vec{E}=-\\partial\\vec{B}/\\partial t$</li>
        <li>La règle de Lenz (signe moins) : le courant induit s'oppose toujours à la variation de flux qui lui a donné naissance</li>
        <li>En régime variable, le champ électrique induit n'est plus irrotationnel : il ne dérive plus d'un potentiel scalaire seul</li>
        <li>Self-inductance $L$ : $\\Phi=LI$ et fem d'auto-induction $e=-L\\,dI/dt$</li>
        <li>Énergie magnétique : $u_B=\\frac{1}{2\\mu_0}B^2$ par unité de volume ; $W=\\frac{1}{2}LI^2$ pour une bobine</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe moins dans la loi de Faraday, qui traduit la règle de Lenz (le courant induit s'oppose à la cause)</li>
        <li>Croire que $\\nabla\\wedge\\vec{E}=\\vec{0}$ reste vrai en régime variable : ce n'est vrai qu'en régime statique</li>
        <li>Confondre inductance mutuelle $M$ (entre deux circuits) et self-inductance $L$ (d'un circuit sur lui-même)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La forme locale de la loi de Faraday s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag10e1" value="wrong"> $\\nabla\\wedge\\vec{E}=\\vec{0}$</label>
          <label class="option"><input type="radio" name="emag10e1" value="right"> $\\nabla\\wedge\\vec{E}=-\\partial\\vec{B}/\\partial t$</label>
          <label class="option"><input type="radio" name="emag10e1" value="wrong"> $\\nabla\\cdot\\vec{E}=-\\partial B/\\partial t$</label>
          <label class="option"><input type="radio" name="emag10e1" value="wrong"> $\\nabla\\wedge\\vec{B}=-\\partial\\vec{E}/\\partial t$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag10e1','emag10fb1','Correct — un champ B variable dans le temps crée un champ E dont le rotationnel n\'est plus nul.','La loi de Faraday relie le rotationnel de E à la dérivée temporelle de B, pas l\'inverse.')">Vérifier</button>
        <div class="feedback" id="emag10fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le signe moins dans la loi de Faraday traduit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag10e2" value="wrong"> la loi de Gauss</label>
          <label class="option"><input type="radio" name="emag10e2" value="right"> la règle de Lenz</label>
          <label class="option"><input type="radio" name="emag10e2" value="wrong"> la loi d'Ohm</label>
          <label class="option"><input type="radio" name="emag10e2" value="wrong"> la rigidité diélectrique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag10e2','emag10fb2','Correct — le courant induit s\'oppose toujours à la variation de flux qui lui a donné naissance.','Pense à la loi qui décrit le sens du courant induit par rapport à la cause de l\'induction.')">Vérifier</button>
        <div class="feedback" id="emag10fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'énergie stockée dans une bobine d'inductance $L$ parcourue par un courant $I$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag10e3" value="wrong"> $W=LI$</label>
          <label class="option"><input type="radio" name="emag10e3" value="right"> $W=\\frac{1}{2}LI^2$</label>
          <label class="option"><input type="radio" name="emag10e3" value="wrong"> $W=\\frac{1}{2}L^2I$</label>
          <label class="option"><input type="radio" name="emag10e3" value="wrong"> $W=L^2I^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag10e3','emag10fb3','Correct — cette formule est l\'analogue magnétique de l\'énergie cinétique ½mv².','Compare avec la structure de l\'énergie cinétique : un demi, une grandeur, au carré de la variable qui varie.')">Vérifier</button>
        <div class="feedback" id="emag10fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la vitesse de la lumière était infinie : le phénomène d'induction électromagnétique existerait-il encore de la même façon ?</li>
        <li>Pourquoi un transformateur électrique fonctionne-t-il uniquement en courant alternatif, et jamais en courant continu constant ?</li>
        <li>Quelle serait la conséquence, pour la conception des générateurs électriques, d'une règle de Lenz « inversée » qui amplifierait au lieu de s'opposer à la variation de flux ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>M. Faraday, <em>Experimental Researches in Electricity</em>, First Series, 1832 — comptes rendus originaux de la découverte de l'induction.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur l'induction électromagnétique.</li>
        <li>B. P. Abbott et al. (LIGO/Virgo Collaboration), « Observation of Gravitational Waves from a Binary Black Hole Merger », Physical Review Letters, 2016.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens d'assister à la première véritable rencontre entre électricité et magnétisme : un champ magnétique variable crée un champ électrique. Le chapitre suivant, « Équations de Maxwell et équation de propagation des ondes », va compléter cette histoire par sa réciproque — un champ électrique variable crée aussi un champ magnétique — et en tirer une conséquence extraordinaire : l'existence des ondes électromagnétiques, dont la lumière elle-même. Comme le disait Faraday à un ministre des Finances sceptique qui lui demandait à quoi servait l'électricité : « Je ne sais pas, mais je suis sûr qu'un jour vous la taxerez. » L'histoire lui a donné raison, bien au-delà de ce qu'il imaginait.</p>
  `
};

EMAG_NOVA_KB[emagKey('Induction électromagnétique : loi de Faraday et inductance')] = {
  intro: "Salut, moi c'est Nova ! On voit l'induction électromagnétique : loi de Faraday, inductance et énergie magnétique. Demande-moi la loi de Faraday, la règle de Lenz, ou la différence entre inductance mutuelle et self-inductance.",
  rules: [
    { test:/loi de faraday/i, replies:["La loi de Faraday dit que la fem induite dans un circuit fermé est l'opposé de la dérivée temporelle du flux magnétique qui le traverse : e=-dΦ_B/dt. Sa forme locale est ∇∧E=-∂B/∂t."] },
    { test:/lenz/i, replies:["La règle de Lenz (le signe moins dans la loi de Faraday) dit que le courant induit s'oppose toujours à la variation de flux qui lui a donné naissance : c'est un principe de modération, pas d'amplification."] },
    { test:/self.inductance|inductance propre/i, replies:["La self-inductance L d'un circuit relie le flux qu'il crée à travers lui-même à son propre courant : Φ=LI. Toute variation de I induit une fem d'auto-induction e=-L dI/dt."] },
    { test:/inductance mutuelle/i, replies:["L'inductance mutuelle M relie le flux créé par un circuit à travers un second circuit à l'intensité qui parcourt le premier : Φ_{1→2}=M I₁."] },
    { test:/[ée]nergie magn[ée]tique/i, replies:["La densité volumique d'énergie magnétique est u_B=B²/(2μ0), l'analogue de u_E=½ε₀E² côté électrique. L'énergie stockée dans une bobine est W=½LI²."] },
    { test:/champ.*non conservatif|rotationnel.*non nul/i, replies:["En régime variable, ∇∧E=-∂B/∂t n'est plus nul en général : le champ électrique induit n'est plus irrotationnel, il ne dérive plus d'un simple potentiel scalaire."] },
    { test:/fem|force [ée]lectromotrice/i, replies:["La force électromotrice (fem) est le travail par unité de charge fourni par un phénomène non électrostatique. Elle peut naître du mouvement du circuit dans un champ B fixe, ou de la variation temporelle de B à circuit immobile."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : la loi de Faraday relie le rotationnel de E à la dérivée temporelle de B.","Indice niveau 2 : pas l'inverse, et pas la divergence.","Indice niveau 3 : ∇∧E=-∂B/∂t."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : c'est une règle sur le sens du courant induit.","Indice niveau 2 : elle traduit une opposition à la cause.","Indice niveau 3 : la règle de Lenz."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare avec l'énergie cinétique ½mv².","Indice niveau 2 : remplace m par L et v par I.","Indice niveau 3 : W=½LI²."] }
  ]
};

/* =========================== CHAPITRE 11 — Équations de Maxwell et équation de propagation des ondes =========================== */
EMAG_CHAPTERS[emagKey('Équations de Maxwell et équation de propagation des ondes')] = {
  objectives: [
    "Identifier le terme manquant dans la loi d'Ampère et introduire le courant de déplacement",
    "Écrire les quatre équations de Maxwell sous forme locale, dans le vide",
    "Établir l'équation de propagation des ondes à partir des équations de Maxwell",
    "Retrouver la vitesse de la lumière comme conséquence directe de cette équation",
    "Analyser pourquoi le courant de déplacement, purement théorique à l'origine, était une nécessité logique avant d'être une découverte expérimentale"
  ],
  prereqs: ["Induction électromagnétique : loi de Faraday et inductance"],
  bodyHtml: `
    <p>En 1861, dans le silence de son bureau, James Clerk Maxwell termine un calcul qui va changer à jamais notre compréhension de l'Univers : en corrigeant une simple incohérence mathématique dans la loi d'Ampère, il découvre presque malgré lui que ses équations prédisent l'existence d'ondes se propageant à une vitesse... qui coïncide exactement avec celle de la lumière, déjà mesurée par des astronomes et des physiciens depuis des décennies. Sa conclusion, écrite noir sur blanc dans son article de 1865, est l'une des phrases les plus audacieuses de l'histoire des sciences : la lumière n'est rien d'autre qu'une onde électromagnétique.</p>
    <p>Il faudra attendre 1887, huit ans après la mort de Maxwell, pour que Heinrich Hertz produise et détecte expérimentalement en laboratoire les ondes radio prédites par la théorie — ouvrant directement la voie à la radio, la télévision, le Wi-Fi, la téléphonie mobile et le radar. Chaque signal qui atteint ton téléphone, chaque rayon de soleil qui te réchauffe, chaque image capturée par un appareil photo obéit très exactement aux quatre équations que tu vas découvrir dans ce chapitre.</p>
    <p>Ce chapitre est le sommet de la construction entamée depuis le premier chapitre : les quatre équations locales rencontrées séparément (Gauss électrique, Gauss magnétique, Faraday, Ampère) sont rassemblées — après une correction essentielle apportée par Maxwell — en un unique système, les <strong>équations de Maxwell</strong>, dont on peut alors extraire l'existence des ondes électromagnétiques. À la fin de ce chapitre, tu comprendras comment quatre équations, tenant sur une seule ligne, contiennent en germe toute l'optique, toute la radio et toute la télécommunication moderne.</p>

    <h3>1. Un problème avec la loi d'Ampère</h3>
    <p>La loi d'Ampère $\\nabla\\wedge\\vec{B}=\\mu_0\\vec{j}$, établie en régime statique, pose un problème de cohérence mathématique en régime variable : en prenant la divergence des deux membres, on doit avoir $\\nabla\\cdot(\\nabla\\wedge\\vec{B})=0$ (identité vue au chapitre 9), ce qui impose $\\nabla\\cdot\\vec{j}=0$. Or l'équation de continuité du chapitre 7 donne $\\nabla\\cdot\\vec{j}=-\\partial\\rho/\\partial t$, qui n'est nulle qu'en régime permanent. La loi d'Ampère, telle quelle, est donc <strong>incompatible</strong> avec la conservation de la charge dès que $\\rho$ varie dans le temps.</p>

    <h3>2. Le terme qui manque : le courant de déplacement</h3>
    <p>Maxwell résout cette incohérence en ajoutant un terme correctif à la loi d'Ampère, le <strong>courant de déplacement</strong> $\\epsilon_0\\partial\\vec{E}/\\partial t$ :</p>
    <p>$$\\nabla\\wedge\\vec{B} = \\mu_0\\vec{j} + \\mu_0\\epsilon_0\\dfrac{\\partial\\vec{E}}{\\partial t}$$</p>
    <p>On vérifie que cette version corrigée redonne bien $\\nabla\\cdot\\vec{j}=-\\partial\\rho/\\partial t$ en prenant sa divergence et en utilisant $\\nabla\\cdot\\vec{E}=\\rho/\\epsilon_0$. Cette correction, purement théorique à l'origine (sans preuve expérimentale directe au moment où Maxwell la propose), révèle qu'un champ électrique variable, tout comme un courant, est capable de créer un champ magnétique.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Maxwell a ajouté le courant de déplacement uniquement pour des raisons de cohérence mathématique, des années avant que Hertz ne le confirme expérimentalement. Que penses-tu de la capacité des mathématiques à « prédire » une réalité physique avant même qu'elle ne soit observée ? Peux-tu penser à d'autres découvertes de la physique qui ont suivi ce même chemin (prédiction théorique avant confirmation expérimentale) ?
    </div>

    <h3>3. Les équations de Maxwell (dans le vide)</h3>
    <p>Le système complet, en l'absence de matière (vide), rassemble quatre équations locales :</p>
    <table class="mini-table">
      <tr><th>Nom</th><th>Équation</th><th>Signification</th></tr>
      <tr><td>Maxwell-Gauss</td><td>$\\nabla\\cdot\\vec{E}=\\dfrac{\\rho}{\\epsilon_0}$</td><td>Les charges sont sources du champ E</td></tr>
      <tr><td>Maxwell-flux (Gauss magnétique)</td><td>$\\nabla\\cdot\\vec{B}=0$</td><td>Il n'existe pas de charge magnétique isolée</td></tr>
      <tr><td>Maxwell-Faraday</td><td>$\\nabla\\wedge\\vec{E}=-\\dfrac{\\partial\\vec{B}}{\\partial t}$</td><td>Un champ B variable crée un champ E</td></tr>
      <tr><td>Maxwell-Ampère</td><td>$\\nabla\\wedge\\vec{B}=\\mu_0\\vec{j}+\\mu_0\\epsilon_0\\dfrac{\\partial\\vec{E}}{\\partial t}$</td><td>Un courant ou un champ E variable crée un champ B</td></tr>
    </table>
    <p>Ces quatre équations, associées à la force de Lorentz, contiennent en principe toute l'électricité, tout le magnétisme et toute l'optique classiques. On distingue trois régimes : <strong>électrostatique/magnétostatique</strong> (champs indépendants du temps, équations découplées), <strong>quasi-stationnaire</strong> (variations lentes, couplage partiel, cadre de l'électrocinétique classique) et <strong>régime rapidement variable</strong>, où le couplage complet entre E et B devient essentiel — c'est le régime des ondes électromagnétiques.</p>

    <h3>4. L'équation d'onde</h3>
    <p>Dans le vide, en l'absence de charges ($\\rho=0$) et de courants ($\\vec{j}=\\vec{0}$), prenons le rotationnel de l'équation de Maxwell-Faraday et utilisons l'identité $\\nabla\\wedge(\\nabla\\wedge\\vec{E})=\\nabla(\\nabla\\cdot\\vec{E})-\\Delta\\vec{E}$ ainsi que Maxwell-Ampère pour éliminer $\\vec{B}$. On obtient, après simplification (avec $\\nabla\\cdot\\vec{E}=0$) :</p>
    <p>$$\\Delta\\vec{E} - \\mu_0\\epsilon_0\\dfrac{\\partial^2\\vec{E}}{\\partial t^2} = \\vec{0}$$</p>
    <p>et une équation strictement analogue pour $\\vec{B}$. C'est l'<strong>équation de d'Alembert</strong>, ou équation de propagation d'une onde, de la forme générale $\\Delta f - \\frac{1}{c^2}\\frac{\\partial^2 f}{\\partial t^2}=0$, avec ici :</p>
    <p>$$c = \\dfrac{1}{\\sqrt{\\mu_0\\epsilon_0}} \\approx 3\\times 10^8\\ \\text{m/s}$$</p>

    <h3>5. La prévision théorique de Maxwell</h3>
    <p>Le résultat majeur de ce calcul, purement théorique, est que les équations de Maxwell prédisent l'existence d'ondes électromagnétiques se propageant dans le vide à une vitesse $c$ qui ne dépend que de deux constantes déjà mesurées séparément en électrostatique ($\\epsilon_0$) et en magnétostatique ($\\mu_0$). Or cette vitesse coïncide, aux incertitudes de mesure près de l'époque, avec la vitesse de la lumière déjà mesurée par des méthodes purement optiques : <strong>la lumière est une onde électromagnétique</strong>. C'est l'un des résultats les plus spectaculaires de toute la physique du XIXe siècle, qui unifie électricité, magnétisme et optique en une seule théorie.</p>

    <div class="key-point">
      <span class="eyebrow">Le courant de déplacement, clé de voûte</span>
      Sans le terme correctif $\\mu_0\\epsilon_0\\partial\\vec{E}/\\partial t$ ajouté par Maxwell, les équations seraient incohérentes en régime variable ET ne prédiraient aucune onde électromagnétique : c'est précisément le couplage symétrique entre E variable → B et B variable → E qui permet à une perturbation de s'auto-entretenir et de se propager, sans jamais avoir besoin de charges ni de courants pour continuer d'exister.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La vitesse $c=1/\\sqrt{\\mu_0\\epsilon_0}$ se calcule uniquement à partir de deux constantes mesurées séparément en laboratoire : $\\epsilon_0$ (par des expériences purement électrostatiques) et $\\mu_0$ (par des expériences purement magnétostatiques), sans aucune référence à la lumière. Pourquoi la coïncidence numérique entre cette vitesse et celle de la lumière ne peut-elle raisonnablement pas être un simple hasard ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Les équations de Maxwell restent, plus de 150 ans après leur formulation, rigoureusement exactes à toutes les échelles testées expérimentalement — un exploit rarissime en physique. Elles constituent aujourd'hui le prototype même d'une « théorie de jauge », le cadre mathématique qui, généralisé, décrit également les interactions nucléaires faible et forte dans le Modèle Standard de la physique des particules, une unification qui a valu plusieurs prix Nobel de physique (notamment en 1979 et 1999).</p>
    <p><strong>Question ouverte :</strong> les équations de Maxwell sont-elles valables à absolument toutes les échelles, y compris à l'échelle de Planck où la gravité quantique devient dominante ? Réconcilier l'électromagnétisme (et plus largement le Modèle Standard) avec la relativité générale reste l'un des plus grands défis ouverts de la physique théorique du XXIe siècle.</p>
    <p><strong>Technologie émergente :</strong> les réseaux de communication 5G et 6G, les radars automobiles anticollision, et les futurs systèmes de communication quantique par photons intriqués reposent tous, in fine, sur une maîtrise toujours plus fine des équations de Maxwell dans des matériaux et des géométries de plus en plus complexes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Loi d'Ampère incohérente en régime variable → correction de Maxwell (courant de déplacement) → 4 équations de Maxwell couplées → élimination de B (ou E) → équation de propagation → $c=1/\\sqrt{\\mu_0\\epsilon_0}$ = vitesse de la lumière
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta\\vec{E} - \\mu_0\\epsilon_0\\frac{\\partial^2\\vec{E}}{\\partial t^2} = \\vec{0}$$
      Cette unique équation, conséquence directe des quatre équations de Maxwell combinées, contient la prédiction la plus spectaculaire de toute la physique du XIXe siècle : l'existence d'ondes électromagnétiques se propageant à la vitesse de la lumière — la lumière elle-même n'étant qu'un cas particulier de ces ondes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le courant de déplacement $\\mu_0\\epsilon_0\\partial\\vec{E}/\\partial t$ corrige la loi d'Ampère pour la rendre compatible avec la conservation de la charge en régime variable</li>
        <li>Les quatre équations de Maxwell : Gauss électrique, Gauss magnétique ($\\nabla\\cdot\\vec{B}=0$), Faraday, Ampère-Maxwell</li>
        <li>Dans le vide sans sources, $\\vec{E}$ et $\\vec{B}$ vérifient chacun une équation de propagation (équation de d'Alembert)</li>
        <li>La vitesse de propagation $c=1/\\sqrt{\\mu_0\\epsilon_0}\\approx 3\\times10^8$ m/s coïncide avec la vitesse de la lumière</li>
        <li>Conclusion de Maxwell : la lumière est une onde électromagnétique, ce qui unifie électricité, magnétisme et optique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le courant de déplacement dans la loi d'Ampère-Maxwell en régime variable</li>
        <li>Croire que $\\nabla\\cdot\\vec{B}=0$ signifie que B est nul : cela signifie seulement qu'il n'existe pas de « charge magnétique » isolée (monopôle)</li>
        <li>Confondre l'équation de propagation ($\\Delta\\vec{E}-\\mu_0\\epsilon_0\\partial^2\\vec{E}/\\partial t^2=0$) avec les équations de Maxwell elles-mêmes : elle en est une conséquence, obtenue en les combinant</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le terme ajouté par Maxwell à la loi d'Ampère est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag11e1" value="wrong"> $\\mu_0\\vec{j}$</label>
          <label class="option"><input type="radio" name="emag11e1" value="right"> $\\mu_0\\epsilon_0\\,\\partial\\vec{E}/\\partial t$</label>
          <label class="option"><input type="radio" name="emag11e1" value="wrong"> $-\\partial\\vec{B}/\\partial t$</label>
          <label class="option"><input type="radio" name="emag11e1" value="wrong"> $\\rho/\\epsilon_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag11e1','emag11fb1','Correct — c\'est le courant de déplacement, qui rend la loi d\'Ampère cohérente avec la conservation de la charge en régime variable.','Le terme manquant s\'exprime avec une dérivée temporelle du champ E, pas de B.')">Vérifier</button>
        <div class="feedback" id="emag11fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La vitesse de propagation des ondes électromagnétiques dans le vide vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag11e2" value="wrong"> $\\mu_0\\epsilon_0$</label>
          <label class="option"><input type="radio" name="emag11e2" value="right"> $1/\\sqrt{\\mu_0\\epsilon_0}$</label>
          <label class="option"><input type="radio" name="emag11e2" value="wrong"> $\\sqrt{\\mu_0\\epsilon_0}$</label>
          <label class="option"><input type="radio" name="emag11e2" value="wrong"> $\\mu_0/\\epsilon_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag11e2','emag11fb2','Correct — c=1/√(μ0ε0)≈3×10⁸ m/s, ce qui coïncide avec la vitesse de la lumière déjà mesurée par voie optique.','Repense à la forme générale de l\'équation de d\'Alembert, où le coefficient devant la dérivée temporelle seconde est 1/c².')">Vérifier</button>
        <div class="feedback" id="emag11fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'équation $\\nabla\\cdot\\vec{B}=0$ signifie que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag11e3" value="wrong"> le champ magnétique est nul partout</label>
          <label class="option"><input type="radio" name="emag11e3" value="right"> il n'existe pas de charge magnétique isolée (monopôle)</label>
          <label class="option"><input type="radio" name="emag11e3" value="wrong"> le champ magnétique ne dépend pas du temps</label>
          <label class="option"><input type="radio" name="emag11e3" value="wrong"> le champ magnétique est toujours uniforme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag11e3','emag11fb3','Correct — contrairement au champ E, les lignes de champ B se referment toujours sur elles-mêmes, sans jamais diverger d\'une source ponctuelle.','Compare avec ∇·E=ρ/ε₀ : ici le second membre est nul, ce qui a une conséquence sur l\'existence même d\'une « charge » magnétique.')">Vérifier</button>
        <div class="feedback" id="emag11fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si $\\epsilon_0$ ou $\\mu_0$ avaient une valeur légèrement différente : comment la vitesse de la lumière, et donc toute la physique de notre Univers, en serait-elle changée ?</li>
        <li>Pourquoi Maxwell a-t-il pu prédire l'existence des ondes radio des années avant que Hertz ne les détecte expérimentalement ?</li>
        <li>Quelle serait la conséquence, pour notre compréhension de la Nature, si l'on découvrait un jour un phénomène électromagnétique en contradiction avec l'une des quatre équations de Maxwell ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. C. Maxwell, <em>A Treatise on Electricity and Magnetism</em>, Clarendon Press, 1873 — l'exposé complet et définitif de la théorie électromagnétique.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur les équations de Maxwell et la propagation des ondes.</li>
        <li>H. Hertz, « Über sehr schnelle elektrische Schwingungen », Annalen der Physik, 1887 — première détection expérimentale des ondes électromagnétiques prédites par Maxwell.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens de vivre, à ton échelle, l'un des plus grands moments de toute l'histoire de la physique : la découverte que la lumière n'est qu'une onde électromagnétique parmi d'autres. Le chapitre suivant, « Ondes électromagnétiques planes progressives monochromatiques », va explorer concrètement la structure de ces ondes — leur direction de propagation, leur polarisation, leur fréquence — et te donner les outils pour manipuler la lumière visible, les ondes radio ou les rayons X avec le même formalisme. Comme le disait Einstein à propos de Maxwell : « Une seule personne, Maxwell, a changé notre conception de la réalité physique. » Tu viens de comprendre pourquoi.</p>
  `
};

EMAG_NOVA_KB[emagKey('Équations de Maxwell et équation de propagation des ondes')] = {
  intro: "Salut, moi c'est Nova ! On rassemble les équations de Maxwell et on en déduit l'équation de propagation des ondes. Demande-moi le courant de déplacement, les quatre équations de Maxwell, ou pourquoi la lumière est une onde électromagnétique.",
  rules: [
    { test:/courant de d[ée]placement/i, replies:["Le courant de déplacement μ0ε0∂E/∂t est le terme que Maxwell ajoute à la loi d'Ampère pour la rendre compatible avec la conservation de la charge en régime variable. Il révèle qu'un champ E variable crée aussi un champ B, comme un courant réel."] },
    { test:/quatre [ée]quations de maxwell|[ée]quations de maxwell/i, replies:["Les quatre équations de Maxwell (dans le vide) sont : Maxwell-Gauss (∇·E=ρ/ε0), Maxwell-flux (∇·B=0), Maxwell-Faraday (∇∧E=-∂B/∂t) et Maxwell-Ampère (∇∧B=μ0j+μ0ε0∂E/∂t)."] },
    { test:/[ée]quation d.onde|[ée]quation de propagation|d.alembert/i, replies:["En combinant les équations de Maxwell dans le vide sans sources, on obtient pour E et pour B une équation de d'Alembert ΔE-μ0ε0∂²E/∂t²=0 : c'est l'équation de propagation d'une onde, à la vitesse c=1/√(μ0ε0)."] },
    { test:/lumi[èe]re.*onde|maxwell.*lumi[èe]re/i, replies:["La vitesse c=1/√(μ0ε0)≈3×10⁸ m/s obtenue à partir des équations de Maxwell coïncide avec la vitesse de la lumière mesurée par voie optique : Maxwell en conclut que la lumière est une onde électromagnétique, unifiant ainsi électricité, magnétisme et optique."] },
    { test:/pourquoi.*probl[èe]me.*amp[èe]re|incoh[ée]rence.*amp[èe]re/i, replies:["La loi d'Ampère seule impose ∇·j=0, ce qui n'est vrai qu'en régime permanent. En régime variable, l'équation de continuité donne ∇·j=-∂ρ/∂t≠0 : la loi d'Ampère est donc incohérente sans le courant de déplacement."] },
    { test:/trois r[ée]gimes/i, replies:["On distingue le régime statique (champs indépendants du temps), le régime quasi-stationnaire (variations lentes, cadre de l'électrocinétique) et le régime rapidement variable (couplage complet E-B, régime des ondes électromagnétiques)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : le terme manquant contient une dérivée temporelle de E, pas de B.","Indice niveau 2 : il fait intervenir μ0 et ε0 ensemble.","Indice niveau 3 : μ0ε0 ∂E/∂t."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde la forme générale de l'équation de d'Alembert.","Indice niveau 2 : le coefficient devant ∂²f/∂t² est 1/c².","Indice niveau 3 : c=1/√(μ0ε0)."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare avec ∇·E=ρ/ε0, où ρ représente une charge électrique.","Indice niveau 2 : ici le second membre nul concerne une « charge » magnétique.","Indice niveau 3 : il n'existe pas de monopôle magnétique."] }
  ]
};

/* =========================== CHAPITRE 12 — Ondes électromagnétiques planes progressives monochromatiques =========================== */
EMAG_CHAPTERS[emagKey('Ondes électromagnétiques planes progressives monochromatiques')] = {
  objectives: [
    "Décrire une onde plane progressive monochromatique (OPPM) et introduire la notation complexe",
    "Établir les propriétés géométriques d'une OPPM dans le vide à partir des équations de Maxwell",
    "Distinguer polarisation linéaire et polarisation circulaire",
    "Situer le domaine visible dans le spectre électromagnétique",
    "Analyser pourquoi n'importe quelle onde électromagnétique réaliste peut se décomposer en une superposition d'OPPM"
  ],
  prereqs: ["Équations de Maxwell et équation de propagation des ondes"],
  bodyHtml: `
    <p>Une onde radio captée par ton téléphone, la lumière rouge d'un laser, un rayon X utilisé en radiographie médicale : ces trois phénomènes, qui paraissent radicalement différents à nos sens, obéissent tous à la même structure mathématique élémentaire, la <strong>brique de base</strong> que ce chapitre te propose de disséquer. C'est en étudiant précisément cette brique — l'onde plane progressive monochromatique — que Heinrich Hertz a pu, en 1887, générer et détecter en laboratoire les premières ondes radio artificielles, confirmant expérimentalement la théorie de Maxwell.</p>
    <p>La notion de polarisation que tu vas découvrir n'est pas qu'une curiosité académique : c'est elle qui explique pourquoi tes lunettes de soleil polarisées éliminent les reflets éblouissants sur l'eau ou la route, pourquoi les écrans LCD affichent des images, et comment les antennes de télécommunication sont orientées pour maximiser la réception d'un signal. Le spectre électromagnétique, enfin, révèle une vérité vertigineuse : la lumière visible, que tes yeux perçoivent, n'occupe qu'une fraction dérisoire de l'immense gamme de fréquences que peut prendre une onde électromagnétique.</p>
    <p>Le chapitre précédent a établi que $\\vec{E}$ et $\\vec{B}$ vérifient une équation de propagation. Ce chapitre étudie la solution la plus simple et la plus utile de cette équation : l'onde plane progressive monochromatique (OPPM), brique de base de toute description ondulatoire du champ électromagnétique. À la fin, tu sauras décrire la géométrie complète d'une onde électromagnétique — sa direction, sa polarisation, sa position dans le spectre.</p>

    <h3>1. Onde monochromatique se propageant selon $+z$</h3>
    <p>Une onde <strong>monochromatique</strong> (une seule fréquence) se propageant sans déformation selon $+z$ s'écrit sous la forme $f(z,t)=f_0\\cos(\\omega t - kz + \\varphi_0)$, où $\\omega=2\\pi\\nu$ est la pulsation et $k=\\omega/c$ le nombre d'onde (pour une onde dans le vide). La vitesse de phase de cette onde, c'est-à-dire la vitesse à laquelle se déplace un point de phase constante, vaut $v_\\varphi=\\omega/k=c$.</p>

    <h3>2. Onde plane progressive selon une direction quelconque $\\hat{k}$</h3>
    <p>En généralisant à une direction de propagation quelconque $\\hat{k}$, on écrit le champ sous la forme d'une <strong>onde plane progressive monochromatique</strong> (OPPM) :</p>
    <p>$$\\vec{E}(\\vec{r},t) = \\vec{E}_0\\cos(\\omega t - \\vec{k}\\cdot\\vec{r} + \\varphi_0)$$</p>
    <p>où $\\vec{k}=k\\hat{k}$ est le <strong>vecteur d'onde</strong>, de norme $k=\\omega/c$ dans le vide, orienté selon la direction de propagation. On parle d'onde « plane » car, à un instant donné, tous les points d'un plan perpendiculaire à $\\vec{k}$ sont en phase (surfaces équiphases planes).</p>

    <h3>3. Notation complexe</h3>
    <p>Pour simplifier les calculs (dérivation, intégration, déphasages), on introduit systématiquement la <strong>notation complexe</strong> :</p>
    <p>$$\\underline{\\vec{E}} = \\vec{E}_0\\, e^{i(\\omega t - \\vec{k}\\cdot\\vec{r} + \\varphi_0)}, \\qquad \\vec{E} = \\text{Re}(\\underline{\\vec{E}})$$</p>
    <p>Son intérêt principal : dériver par rapport au temps revient à multiplier par $i\\omega$, et l'opérateur $\\nabla$ appliqué à une OPPM revient à multiplier par $-i\\vec{k}$. Les équations de Maxwell, en régime harmonique, se transforment ainsi en simples relations algébriques entre vecteurs.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La notation complexe transforme des équations aux dérivées partielles en simples relations algébriques — un gain de simplicité considérable. Mais le champ électrique « réel », physiquement mesurable, n'est jamais que la partie réelle de cette expression complexe. À quel moment précis d'un calcul faut-il impérativement revenir à la partie réelle, et pourquoi ce moment est-il différent pour une grandeur linéaire (comme E) et pour une grandeur quadratique (comme une énergie, qui fait intervenir $E^2$) ?
    </div>

    <h3>4. Propriétés d'une OPPM dans le vide</h3>
    <p>En injectant une OPPM dans les équations de Maxwell (sans sources), on obtient trois propriétés géométriques remarquables, valables dans le vide :</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Conséquence</th></tr>
      <tr><td>$\\vec{k}\\cdot\\vec{E}_0=0$</td><td>$\\vec{E}$ est perpendiculaire à la direction de propagation : l'onde est <strong>transverse</strong></td></tr>
      <tr><td>$\\vec{k}\\cdot\\vec{B}_0=0$</td><td>$\\vec{B}$ est également transverse</td></tr>
      <tr><td>$\\vec{B}_0=\\dfrac{1}{c}\\hat{k}\\wedge\\vec{E}_0$</td><td>$\\vec{E}$, $\\vec{B}$ et $\\hat{k}$ forment un trièdre direct ; $\\|\\vec{B}_0\\|=\\|\\vec{E}_0\\|/c$</td></tr>
    </table>
    <p>Autrement dit, dans une OPPM se propageant dans le vide, $\\vec{E}$ et $\\vec{B}$ sont toujours perpendiculaires entre eux ET perpendiculaires à la direction de propagation, avec une norme de $\\vec{B}$ toujours $c$ fois plus petite que celle de $\\vec{E}$ (en unités SI).</p>

    <h3>5. Polarisation</h3>
    <p>La <strong>polarisation</strong> décrit l'évolution de l'orientation du vecteur $\\vec{E}$ dans le plan perpendiculaire à $\\hat{k}$, au cours du temps, en un point fixe :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Description</th></tr>
      <tr><td>Polarisation linéaire (rectiligne)</td><td>Le vecteur $\\vec{E}$ garde une direction fixe, seule son amplitude oscille (composantes en phase)</td></tr>
      <tr><td>Polarisation circulaire</td><td>Le vecteur $\\vec{E}$ tourne à vitesse angulaire constante, de norme constante (composantes déphasées de $\\pm\\pi/2$, de même amplitude)</td></tr>
      <tr><td>Polarisation elliptique</td><td>Cas général, intermédiaire entre linéaire et circulaire</td></tr>
    </table>

    <h3>6. Le spectre électromagnétique</h3>
    <p>Toutes les ondes électromagnétiques — ondes radio, micro-ondes, infrarouge, lumière visible, ultraviolet, rayons X, rayons gamma — obéissent aux mêmes équations de Maxwell et se propagent toutes à la même vitesse $c$ dans le vide ; elles ne diffèrent que par leur fréquence (ou, de façon équivalente, leur longueur d'onde $\\lambda=c/\\nu$). Le domaine visible par l'œil humain, de $\\lambda\\approx 400$ nm (violet) à $\\lambda\\approx 700$ nm (rouge), n'est qu'une toute petite fenêtre de ce spectre immense.</p>

    <div class="key-point">
      <span class="eyebrow">L'OPPM, la brique de base</span>
      Toute onde électromagnétique réaliste (impulsion, faisceau laser, signal Wi-Fi) peut se décomposer, par analyse de Fourier, en une superposition d'OPPM de fréquences différentes. Comprendre les propriétés d'une seule OPPM — transversalité, trièdre direct $(\\vec{E},\\vec{B},\\hat{k})$, relation $B_0=E_0/c$ — permet donc de comprendre la structure de n'importe quelle onde électromagnétique dans le vide.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Tes lunettes de soleil polarisées ne laissent passer que la composante de la lumière polarisée dans une direction donnée. Sachant que la lumière du soleil réfléchie par une surface plane (eau, route) est partiellement polarisée horizontalement, comment orienterais-tu l'axe de polarisation du filtre de tes lunettes pour éliminer au maximum cet éblouissement ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>La polarisation des ondes électromagnétiques ne se limite pas à la lumière visible : les astronomes analysent la polarisation du fond diffus cosmologique — le rayonnement fossile émis 380 000 ans après le Big Bang — pour y chercher la signature d'ondes gravitationnelles primordiales, une piste de recherche majeure pour comprendre les tout premiers instants de l'Univers. Par ailleurs, les communications quantiques par photons intriqués exploitent la polarisation d'un photon unique comme support d'information, ouvrant la voie à une cryptographie théoriquement inviolable.</p>
    <p><strong>Question ouverte :</strong> peut-on manipuler individuellement la polarisation de photons uniques avec une fiabilité suffisante pour construire un réseau de communication quantique à l'échelle continentale ? C'est un défi technologique et scientifique majeur des deux dernières décennies, toujours en cours de résolution.</p>
    <p><strong>Technologie émergente :</strong> les métasurfaces optiques, des matériaux structurés à l'échelle nanométrique, permettent aujourd'hui de manipuler très finement la polarisation, la phase et la direction d'une OPPM, ouvrant la voie à des lentilles plates ultra-fines pour smartphones et capteurs miniaturisés.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Équation de propagation → solution OPPM $\\vec E_0\\cos(\\omega t-\\vec k\\cdot\\vec r+\\varphi_0)$ → transversalité + trièdre $(\\vec E,\\vec B,\\hat k)$ → polarisation → position dans le spectre électromagnétique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{B}_0 = \\frac{1}{c}\\,\\hat{k}\\wedge\\vec{E}_0$$
      Cette relation géométrique, à elle seule, résume toute la structure d'une onde électromagnétique dans le vide : sa transversalité, l'orthogonalité de $\\vec E$ et $\\vec B$, et le rapport constant $c$ entre leurs amplitudes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une OPPM s'écrit $\\vec{E}=\\vec{E}_0\\cos(\\omega t - \\vec{k}\\cdot\\vec{r}+\\varphi_0)$, avec $k=\\omega/c$ dans le vide</li>
        <li>La notation complexe transforme $\\partial/\\partial t$ en $\\times i\\omega$ et $\\nabla$ en $\\times(-i\\vec{k})$</li>
        <li>Dans le vide, une OPPM est transverse : $\\vec{E}\\perp\\hat{k}$ et $\\vec{B}\\perp\\hat{k}$</li>
        <li>$\\vec{E}$, $\\vec{B}$ et $\\hat{k}$ forment un trièdre direct, avec $B_0=E_0/c$</li>
        <li>Polarisation linéaire (direction fixe) ou circulaire (rotation à norme constante), selon le déphasage entre composantes de $\\vec{E}_0$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $\\vec{E}$ et $\\vec{B}$ peuvent avoir une composante le long de $\\hat{k}$ dans le vide : ils sont strictement transverses</li>
        <li>Oublier le facteur $1/c$ dans $B_0=E_0/c$ : en unités SI, $B_0$ est numériquement bien plus petit que $E_0$</li>
        <li>Confondre polarisation linéaire (composantes en phase) et circulaire (composantes déphasées de $\\pi/2$, mêmes amplitudes)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans une OPPM se propageant dans le vide selon $\\hat{k}$, le champ électrique est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag12e1" value="wrong"> parallèle à $\\hat{k}$</label>
          <label class="option"><input type="radio" name="emag12e1" value="right"> perpendiculaire à $\\hat{k}$</label>
          <label class="option"><input type="radio" name="emag12e1" value="wrong"> à 45° de $\\hat{k}$</label>
          <label class="option"><input type="radio" name="emag12e1" value="wrong"> parallèle à $\\vec{B}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag12e1','emag12fb1','Correct — une OPPM dans le vide est une onde transverse : E (et B) sont perpendiculaires à la direction de propagation.','Repense à la propriété k·E0=0 établie à partir des équations de Maxwell.')">Vérifier</button>
        <div class="feedback" id="emag12fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le lien entre les amplitudes de $\\vec{B}$ et $\\vec{E}$ dans une OPPM du vide est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag12e2" value="wrong"> $B_0=E_0$</label>
          <label class="option"><input type="radio" name="emag12e2" value="right"> $B_0=E_0/c$</label>
          <label class="option"><input type="radio" name="emag12e2" value="wrong"> $B_0=cE_0$</label>
          <label class="option"><input type="radio" name="emag12e2" value="wrong"> $B_0=E_0^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag12e2','emag12fb2','Correct — B0=E0/c, conséquence directe de B0=(1/c) k̂∧E0.','Regarde bien la relation vectorielle entre B0, k̂ et E0 : elle contient un facteur 1/c.')">Vérifier</button>
        <div class="feedback" id="emag12fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une polarisation circulaire, les deux composantes transverses de $\\vec{E}_0$ sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag12e3" value="wrong"> en phase, d'amplitudes différentes</label>
          <label class="option"><input type="radio" name="emag12e3" value="wrong"> en phase, de même amplitude</label>
          <label class="option"><input type="radio" name="emag12e3" value="right"> déphasées de $\\pi/2$, de même amplitude</label>
          <label class="option"><input type="radio" name="emag12e3" value="wrong"> déphasées de $\\pi$, d'amplitudes différentes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag12e3','emag12fb3','Correct — c\'est ce déphasage de π/2 à amplitudes égales qui fait tourner E à norme constante.','La polarisation linéaire correspond à des composantes en phase ; la circulaire est le cas déphasé de π/2 en quadrature.')">Vérifier</button>
        <div class="feedback" id="emag12fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'œil humain était sensible à une gamme de longueurs d'onde bien plus large (incluant l'infrarouge et l'ultraviolet) : comment cela changerait-il notre perception du monde ?</li>
        <li>Pourquoi une OPPM strictement monochromatique (une seule fréquence exacte) est-elle une idéalisation mathématique jamais parfaitement réalisée en pratique ?</li>
        <li>Quelle serait la conséquence, pour les télécommunications actuelles, si l'on ne pouvait exploiter qu'une seule polarisation de la lumière au lieu de deux ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. Hertz, « Über Strahlen elektrischer Kraft », Sitzungsberichte der Königlich Preussischen Akademie der Wissenschaften, 1888 — premiers travaux expérimentaux sur les propriétés des ondes électromagnétiques.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur les OPPM et la polarisation.</li>
        <li>Planck Collaboration, « Planck 2018 Results: Polarization of the Cosmic Microwave Background », Astronomy & Astrophysics, 2020.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu maîtrises désormais la géométrie complète d'une onde électromagnétique dans le vide. Le chapitre suivant, « Énergie électromagnétique et vecteur de Poynting », va te montrer comment cette onde transporte de l'énergie à travers l'espace — exactement l'énergie qui te réchauffe au soleil ou qui alimente une antenne de réception. Comme le disait Hertz après ses premières expériences réussies : « Je ne pense pas que les ondes radio hertziennes que j'ai découvertes auront une quelconque application pratique. » L'histoire, une fois de plus, lui a donné tort — pour notre plus grand bénéfice.</p>
  `
};

EMAG_NOVA_KB[emagKey('Ondes électromagnétiques planes progressives monochromatiques')] = {
  intro: "Salut, moi c'est Nova ! On étudie les OPPM : notation complexe, transversalité, polarisation. Demande-moi les propriétés d'une OPPM dans le vide, la relation entre B0 et E0, ou la différence entre polarisation linéaire et circulaire.",
  rules: [
    { test:/oppm|onde plane/i, replies:["Une OPPM (onde plane progressive monochromatique) s'écrit E=E0 cos(ωt-k·r+φ0). Dans le vide, elle est transverse (E et B perpendiculaires à k), avec E, B et k formant un trièdre direct et B0=E0/c."] },
    { test:/notation complexe/i, replies:["La notation complexe représente le champ par E=E0 e^{i(ωt-k·r+φ0)}, avec le champ physique donné par la partie réelle. Son intérêt : dériver par rapport au temps devient une simple multiplication par iω, et ∇ devient une multiplication par -ik."] },
    { test:/transverse|perpendiculaire.*propagation/i, replies:["Dans le vide, une OPPM est transverse : k·E0=0 et k·B0=0. E et B sont donc tous deux perpendiculaires à la direction de propagation k̂."] },
    { test:/b0\\s*=|relation.*e0.*b0|amplitude.*b.*e/i, replies:["La relation entre les amplitudes est B0=E0/c, conséquence de B0=(1/c)k̂∧E0. E, B et k̂ forment un trièdre direct."] },
    { test:/polarisation lin[ée]aire/i, replies:["En polarisation linéaire, les composantes transverses de E0 oscillent en phase : le vecteur E garde une direction fixe dans l'espace, seule son amplitude varie dans le temps."] },
    { test:/polarisation circulaire/i, replies:["En polarisation circulaire, les composantes transverses de E0 ont la même amplitude mais sont déphasées de π/2 : le vecteur E tourne à vitesse angulaire constante, en gardant une norme constante."] },
    { test:/spectre [ée]lectromagn[ée]tique/i, replies:["Le spectre électromagnétique va des ondes radio aux rayons gamma, en passant par le visible (400 à 700 nm). Toutes ces ondes obéissent aux mêmes équations de Maxwell et voyagent à la même vitesse c dans le vide ; seule leur fréquence diffère."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la propriété de transversalité de l'onde.","Indice niveau 2 : k·E0=0 impose une relation d'orthogonalité.","Indice niveau 3 : E est perpendiculaire à k̂."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde la relation vectorielle B0=(1/c)k̂∧E0.","Indice niveau 2 : elle contient un facteur numérique lié à c.","Indice niveau 3 : B0=E0/c."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : la polarisation circulaire nécessite une rotation à norme constante.","Indice niveau 2 : il faut un déphasage de π/2 entre composantes de même amplitude.","Indice niveau 3 : déphasées de π/2, même amplitude."] }
  ]
};

/* =========================== CHAPITRE 13 — Énergie électromagnétique et vecteur de Poynting =========================== */
EMAG_CHAPTERS[emagKey('Énergie électromagnétique et vecteur de Poynting')] = {
  objectives: [
    "Écrire la densité volumique d'énergie électromagnétique totale",
    "Établir le bilan de puissance électromagnétique et introduire le vecteur de Poynting",
    "Calculer la puissance transportée par une OPPM et l'énergie moyenne temporelle",
    "Définir l'impédance caractéristique du vide et l'utiliser pour relier E0 et l'intensité de l'onde",
    "Évaluer, à partir du théorème de Poynting, où va l'énergie électromagnétique dissipée par effet Joule dans un conducteur"
  ],
  prereqs: ["Ondes électromagnétiques planes progressives monochromatiques"],
  bodyHtml: `
    <p>Chaque seconde, environ 1360 watts par mètre carré de puissance électromagnétique traversent le vide spatial pour atteindre le sommet de l'atmosphère terrestre depuis le Soleil, distant de 150 millions de kilomètres — une énergie transportée sans le moindre support matériel entre les deux astres. C'est cette même énergie qui, en 1884, pousse John Henry Poynting à formuler le théorème qui porte aujourd'hui son nom : une équation qui traque, avec une précision remarquable, où va l'énergie du champ électromagnétique à chaque instant et en chaque point de l'espace.</p>
    <p>Le vecteur de Poynting n'est pas qu'une abstraction théorique : c'est lui qui permet de calculer la puissance qu'un panneau solaire peut capter, la portée d'une antenne radio, ou l'intensité lumineuse ressentie par ta peau sous le soleil. Les fours à micro-ondes, les fibres optiques qui transportent Internet à travers les océans, et même le rayonnement cosmique de fond détecté par les télescopes spatiaux se comprennent tous à travers ce même bilan de puissance.</p>
    <p>Les chapitres précédents ont montré séparément que le champ électrique (chapitre 5) et le champ magnétique (chapitre 10) stockent chacun une énergie. Ce chapitre unifie ces deux résultats et introduit l'outil qui décrit comment cette énergie électromagnétique se déplace dans l'espace : le vecteur de Poynting. À la fin, tu sauras calculer la puissance transportée par une onde électromagnétique, du simple faisceau laser au rayonnement solaire.</p>

    <h3>1. Énergie électromagnétique</h3>
    <p>La densité volumique d'énergie électromagnétique totale est simplement la somme des contributions électrique et magnétique déjà établies :</p>
    <p>$$u_{EM} = u_E + u_B = \\dfrac{1}{2}\\epsilon_0 E^2 + \\dfrac{1}{2\\mu_0}B^2$$</p>

    <h3>2. Travail du champ électromagnétique</h3>
    <p>Considérons un volume contenant des charges en mouvement, parcouru par un champ électromagnétique. La force de Lorentz totale fournit, par unité de temps et de volume, une puissance $\\vec{j}\\cdot\\vec{E}$ aux charges (seul le champ électrique travaille, la force magnétique ne travaillant jamais, cf. chapitre 1). Cette puissance est prélevée sur l'énergie électromagnétique du champ.</p>

    <h3>3. Bilan de puissance et vecteur de Poynting</h3>
    <p>En combinant les équations de Maxwell-Faraday et Maxwell-Ampère, on établit le bilan local suivant, appelé <strong>théorème de Poynting</strong> :</p>
    <p>$$-\\dfrac{\\partial u_{EM}}{\\partial t} = \\nabla\\cdot\\vec{\\Pi} + \\vec{j}\\cdot\\vec{E}$$</p>
    <p>où l'on a introduit le <strong>vecteur de Poynting</strong> :</p>
    <p>$$\\vec{\\Pi} = \\dfrac{1}{\\mu_0}\\vec{E}\\wedge\\vec{B}$$</p>
    <p>Cette équation se lit comme un bilan de conservation de l'énergie : la diminution de l'énergie électromagnétique locale ($-\\partial u_{EM}/\\partial t$) se répartit entre l'énergie qui « s'échappe » du volume par rayonnement (terme $\\nabla\\cdot\\vec{\\Pi}$) et l'énergie cédée aux charges par effet Joule (terme $\\vec{j}\\cdot\\vec{E}$). Le vecteur de Poynting $\\vec{\\Pi}$ représente donc la <strong>puissance électromagnétique transportée par unité de surface</strong>, dans la direction de propagation de l'énergie.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème de Poynting est une conséquence directe des équations de Maxwell, sans aucun postulat supplémentaire sur l'énergie. Qu'est-ce que cela révèle sur la cohérence interne de la théorie électromagnétique : la conservation de l'énergie était-elle « ajoutée » par Maxwell, ou était-elle déjà implicitement contenue dans ses quatre équations ?
    </div>

    <h3>4. Cas particulier d'une OPPM</h3>
    <p>Pour une OPPM dans le vide, on a montré (chapitre 12) que $\\vec{B}=\\frac{1}{c}\\hat{k}\\wedge\\vec{E}$. On en déduit que $\\vec{\\Pi}$ est dirigé selon $\\hat{k}$ (l'énergie se propage bien dans le sens de propagation de l'onde), avec une norme instantanée $\\Pi=\\epsilon_0 c E^2$. On montre également qu'une OPPM stocke, à tout instant, autant d'énergie sous forme électrique que sous forme magnétique : $u_E = u_B$.</p>
    <p>Comme $E$ oscille dans le temps (fonction $\\cos^2$), on s'intéresse en pratique à la <strong>valeur moyenne temporelle</strong> $\\langle\\Pi\\rangle$, qui donne l'intensité réellement mesurée par un capteur (l'œil, une photodiode) :</p>
    <p>$$\\langle\\Pi\\rangle = \\dfrac{1}{2}\\epsilon_0 c E_0^2$$</p>
    <p>puisque $\\langle\\cos^2\\rangle=1/2$ pour une fonction harmonique.</p>

    <h3>5. Impédance caractéristique du vide</h3>
    <p>On définit l'<strong>impédance caractéristique du vide</strong> $Z_0=\\sqrt{\\mu_0/\\epsilon_0}\\approx 377\\ \\Omega$, de sorte que $E_0=Z_0 H_0$ (avec $H=B/\\mu_0$), en analogie directe avec la loi d'Ohm $U=RI$ pour un circuit électrique. Cette grandeur permet de réécrire la puissance moyenne transportée sous une forme rappelant la puissance électrique dissipée dans une résistance :</p>
    <p>$$\\langle\\Pi\\rangle = \\dfrac{E_0^2}{2Z_0}$$</p>

    <div class="key-point">
      <span class="eyebrow">L'énergie voyage aussi dans le vide</span>
      Le vecteur de Poynting montre que l'énergie électromagnétique n'a pas besoin de matière pour se déplacer : la lumière du Soleil traverse le vide spatial en transportant, via $\\vec{\\Pi}$, l'énergie qui réchauffe la Terre — sans qu'aucune charge ni aucun courant ne soit présent entre les deux astres.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dans un simple circuit électrique en courant continu (une pile reliée à une résistance par des fils), le théorème de Poynting affirme que l'énergie ne se propage pas à l'intérieur du fil conducteur lui-même, mais dans l'espace qui l'entoure, via le champ électromagnétique, pour ensuite « entrer » radialement dans la résistance. Cette image te semble-t-elle surprenante par rapport à l'idée intuitive que l'énergie « circule dans le fil » comme l'eau dans un tuyau ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le concept de pression de radiation, directement lié au vecteur de Poynting, est aujourd'hui exploité par les voiles solaires — des engins spatiaux propulsés uniquement par la pression exercée par la lumière du Soleil, sans aucun carburant. La mission japonaise IKAROS (2010) a démontré la faisabilité de cette technologie, ouvrant la voie à des missions spatiales de très longue durée propulsées uniquement par la lumière.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des voiles solaires ou laser suffisamment efficaces pour accélérer une sonde spatiale jusqu'à une fraction significative de la vitesse de la lumière, permettant d'envisager un voyage vers une étoile proche à l'échelle d'une vie humaine ? C'est précisément l'ambition du projet Breakthrough Starshot, toujours en développement.</p>
    <p><strong>Technologie émergente :</strong> les pincettes optiques (« optical tweezers »), qui exploitent la pression de radiation d'un faisceau laser focalisé pour manipuler des objets microscopiques (cellules, particules) sans contact, ont valu le prix Nobel de physique 2018 à Arthur Ashkin.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Énergie électrique + énergie magnétique → densité totale $u_{EM}$ → théorème de Poynting (bilan de conservation) → vecteur de Poynting $\\vec\\Pi$ → puissance moyenne transportée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec{\\Pi} = \\frac{1}{\\mu_0}\\vec{E}\\wedge\\vec{B}$$
      Ce vecteur, dont l'unité est le watt par mètre carré, indique à la fois la direction dans laquelle l'énergie électromagnétique se propage et la quantité de puissance qu'elle transporte à travers une surface — c'est lui qui, in fine, permet de calculer combien d'énergie solaire atteint réellement un panneau photovoltaïque.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Densité d'énergie électromagnétique totale : $u_{EM}=\\frac{1}{2}\\epsilon_0E^2+\\frac{1}{2\\mu_0}B^2$</li>
        <li>Vecteur de Poynting : $\\vec{\\Pi}=\\frac{1}{\\mu_0}\\vec{E}\\wedge\\vec{B}$, puissance électromagnétique par unité de surface</li>
        <li>Théorème de Poynting : $-\\partial u_{EM}/\\partial t = \\nabla\\cdot\\vec{\\Pi}+\\vec{j}\\cdot\\vec{E}$ (bilan de conservation de l'énergie)</li>
        <li>Pour une OPPM, $u_E=u_B$ à tout instant, et $\\langle\\Pi\\rangle=\\frac{1}{2}\\epsilon_0cE_0^2$</li>
        <li>Impédance caractéristique du vide $Z_0=\\sqrt{\\mu_0/\\epsilon_0}\\approx 377\\,\\Omega$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser la valeur instantanée $\\Pi=\\epsilon_0cE^2$ au lieu de la valeur moyenne $\\langle\\Pi\\rangle=\\frac{1}{2}\\epsilon_0cE_0^2$ pour estimer une intensité mesurée (un capteur moyenne toujours sur plusieurs périodes)</li>
        <li>Oublier que seul le champ électrique travaille dans $\\vec{j}\\cdot\\vec{E}$ : la force magnétique ne fournit jamais de puissance</li>
        <li>Confondre le vecteur de Poynting (puissance par unité de surface, en W/m²) avec la densité d'énergie (énergie par unité de volume, en J/m³)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le vecteur de Poynting s'exprime :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag13e1" value="wrong"> $\\vec{\\Pi}=\\epsilon_0\\vec{E}\\wedge\\vec{B}$</label>
          <label class="option"><input type="radio" name="emag13e1" value="right"> $\\vec{\\Pi}=\\dfrac{1}{\\mu_0}\\vec{E}\\wedge\\vec{B}$</label>
          <label class="option"><input type="radio" name="emag13e1" value="wrong"> $\\vec{\\Pi}=\\vec{E}\\cdot\\vec{B}$</label>
          <label class="option"><input type="radio" name="emag13e1" value="wrong"> $\\vec{\\Pi}=\\mu_0\\vec{E}\\wedge\\vec{B}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag13e1','emag13fb1','Correct — Π=(1/μ0) E∧B, orienté dans la direction de propagation de l\'énergie.','Vérifie bien le facteur devant le produit vectoriel : c\'est 1/μ0, pas μ0 ni ε0.')">Vérifier</button>
        <div class="feedback" id="emag13fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La valeur moyenne temporelle du vecteur de Poynting pour une OPPM vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag13e2" value="wrong"> $\\epsilon_0cE_0^2$</label>
          <label class="option"><input type="radio" name="emag13e2" value="right"> $\\frac{1}{2}\\epsilon_0cE_0^2$</label>
          <label class="option"><input type="radio" name="emag13e2" value="wrong"> $2\\epsilon_0cE_0^2$</label>
          <label class="option"><input type="radio" name="emag13e2" value="wrong"> $\\epsilon_0cE_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag13e2','emag13fb2','Correct — le facteur ½ vient de la moyenne temporelle de cos², qui vaut ½.','N\'oublie pas la moyenne temporelle de cos² : elle introduit un facteur ½ par rapport à la valeur instantanée.')">Vérifier</button>
        <div class="feedback" id="emag13fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans le théorème de Poynting, le terme $\\vec{j}\\cdot\\vec{E}$ représente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag13e3" value="wrong"> l'énergie stockée dans le champ magnétique</label>
          <label class="option"><input type="radio" name="emag13e3" value="right"> la puissance cédée aux charges (effet Joule)</label>
          <label class="option"><input type="radio" name="emag13e3" value="wrong"> le flux d'énergie sortant du volume</label>
          <label class="option"><input type="radio" name="emag13e3" value="wrong"> l'impédance du vide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag13e3','emag13fb3','Correct — c\'est la puissance par unité de volume que le champ électrique cède aux charges en mouvement.','Rappelle-toi que seul E travaille sur les charges ; ce terme correspond à cette puissance cédée.')">Vérifier</button>
        <div class="feedback" id="emag13fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'impédance caractéristique du vide $Z_0$ était différente : comment la puissance rayonnée par une antenne, à amplitude de champ donnée, en serait-elle changée ?</li>
        <li>Pourquoi une résistance électrique chauffe-t-elle réellement (effet Joule), alors que le vecteur de Poynting décrit une énergie qui « entre » de l'extérieur plutôt qu'une énergie produite localement par le courant lui-même ?</li>
        <li>Quelle serait la conséquence, pour une mission spatiale de longue durée, d'une amélioration significative de l'efficacité des voiles solaires propulsées par pression de radiation ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. H. Poynting, « On the Transfer of Energy in the Electromagnetic Field », Philosophical Transactions of the Royal Society, 1884 — le mémoire fondateur du théorème de Poynting.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur l'énergie électromagnétique et le vecteur de Poynting.</li>
        <li>A. Ashkin, « Acceleration and Trapping of Particles by Radiation Pressure », Physical Review Letters, 1970 (travaux ayant valu le prix Nobel de physique 2018).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais suivre l'énergie électromagnétique à la trace, du Soleil jusqu'à ta peau, ou d'une antenne émettrice jusqu'à ton téléphone. Le chapitre suivant, « Propagation dans les milieux matériels : diélectriques et conducteurs », va montrer ce qui change quand une onde électromagnétique rencontre la matière — pourquoi le verre laisse passer la lumière alors qu'un métal la réfléchit. Comme le disait Poynting lui-même en conclusion de son mémoire de 1884 : cette énergie électromagnétique, qu'on ne voit jamais directement, « circule dans l'espace environnant les conducteurs, et non dans les conducteurs eux-mêmes ». Une idée qui a mis un siècle à être pleinement digérée par la physique.</p>
  `
};

EMAG_NOVA_KB[emagKey('Énergie électromagnétique et vecteur de Poynting')] = {
  intro: "Salut, moi c'est Nova ! On voit l'énergie électromagnétique totale et le vecteur de Poynting. Demande-moi la définition du vecteur de Poynting, le théorème de Poynting, ou la puissance moyenne transportée par une OPPM.",
  rules: [
    { test:/poynting/i, replies:["Le vecteur de Poynting Π=(1/μ0)E∧B représente la puissance électromagnétique transportée par unité de surface, dans la direction de propagation de l'énergie. Pour une OPPM, sa valeur moyenne est ⟨Π⟩=½ε0cE0²."] },
    { test:/[ée]nergie [ée]lectromagn[ée]tique|u_?em|densit[ée].*[ée]nergie.*totale/i, replies:["La densité d'énergie électromagnétique totale est u_EM=½ε0E²+B²/(2μ0), somme des contributions électrique et magnétique. Pour une OPPM, ces deux contributions sont égales à tout instant."] },
    { test:/th[ée]or[èe]me de poynting|bilan.*puissance/i, replies:["Le théorème de Poynting -∂u_EM/∂t=∇·Π+j·E est un bilan de conservation de l'énergie : la diminution d'énergie locale se répartit entre rayonnement sortant (∇·Π) et énergie cédée aux charges (j·E, effet Joule)."] },
    { test:/imp[ée]dance.*vide|z0|377/i, replies:["L'impédance caractéristique du vide Z0=√(μ0/ε0)≈377 Ω relie E0=Z0H0, en analogie avec la loi d'Ohm. Elle permet d'écrire ⟨Π⟩=E0²/(2Z0)."] },
    { test:/puissance moyenne|valeur moyenne.*poynting/i, replies:["La valeur moyenne temporelle du vecteur de Poynting pour une OPPM vaut ⟨Π⟩=½ε0cE0², le facteur ½ venant de la moyenne temporelle de cos² sur une période."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : vérifie le facteur numérique devant E∧B.","Indice niveau 2 : ce n'est ni μ0 ni ε0 seul.","Indice niveau 3 : c'est 1/μ0."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la moyenne temporelle de cos².","Indice niveau 2 : cette moyenne vaut ½.","Indice niveau 3 : ⟨Π⟩=½ε0cE0²."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : seul E travaille sur les charges.","Indice niveau 2 : ce terme correspond à une puissance cédée, pas une énergie stockée.","Indice niveau 3 : c'est la puissance Joule cédée aux charges."] }
  ]
};

/* =========================== CHAPITRE 14 — Propagation dans les milieux matériels : diélectriques et conducteurs =========================== */
EMAG_CHAPTERS[emagKey('Propagation dans les milieux matériels : diélectriques et conducteurs')] = {
  objectives: [
    "Décrire l'effet de polarisation électrique et d'aimantation induites par un champ électromagnétique dans la matière",
    "Réécrire les équations de Maxwell dans un milieu linéaire, homogène et isotrope (LHI)",
    "Distinguer la propagation dans un diélectrique sans pertes et dans un milieu absorbant",
    "Étudier le cas limite de l'onde électromagnétique dans un bon conducteur et l'effet de peau",
    "Évaluer pourquoi un conducteur épais suffit à réaliser un blindage électromagnétique efficace en haute fréquence"
  ],
  prereqs: ["Énergie électromagnétique et vecteur de Poynting"],
  bodyHtml: `
    <p>Pourquoi un prisme décompose-t-il la lumière blanche en un arc-en-ciel de couleurs ? Pourquoi les câbles à haute fréquence sont-ils souvent plaqués or ou argent en surface plutôt que fabriqués entièrement dans ces métaux précieux et coûteux ? Ces deux questions, en apparence sans rapport, trouvent leur réponse dans ce même chapitre : l'interaction entre une onde électromagnétique et la matière qu'elle traverse.</p>
    <p>L'effet de peau, que tu vas découvrir ici, a des conséquences bien concrètes en ingénierie électrique : les câbles à haute tension utilisent des conducteurs creux ou tressés pour économiser du métal là où le courant ne circule de toute façon pas, tandis que les fours à micro-ondes exploitent l'absorption de l'onde par l'eau contenue dans les aliments pour les chauffer efficacement en surface comme en profondeur, selon la fréquence choisie.</p>
    <p>Jusqu'ici, la propagation des ondes électromagnétiques a été étudiée dans le vide. Ce chapitre introduit l'effet de la matière : un champ électromagnétique polarise et aimante la matière qu'il traverse, ce qui modifie profondément la vitesse de propagation, éventuellement au prix d'une atténuation de l'onde. À la fin, tu comprendras pourquoi la lumière ralentit dans le verre, et pourquoi un courant haute fréquence se concentre uniquement à la surface d'un conducteur.</p>

    <h3>1. Diélectriques : polarisation de la matière</h3>
    <p>Dans un isolant (diélectrique), les charges ne sont pas libres de circuler, mais un champ électrique extérieur déplace légèrement les charges positives et négatives à l'échelle atomique ou moléculaire : c'est la <strong>polarisation</strong> $\\vec{P}$ de la matière (moment dipolaire induit par unité de volume). Cette polarisation crée des <strong>charges de polarisation induites</strong>, qui modifient le champ macroscopique. On introduit alors le <strong>vecteur déplacement électrique</strong> $\\vec{D}=\\epsilon_0\\vec{E}+\\vec{P}$, qui permet de réécrire la loi de Gauss en ne faisant intervenir que les charges libres : $\\nabla\\cdot\\vec{D}=\\rho_{libre}$.</p>

    <h3>2. Aimantation de la matière</h3>
    <p>De façon analogue, un champ magnétique induit dans la matière des courants microscopiques (mouvement orbital et spin des électrons), caractérisés par l'<strong>aimantation</strong> $\\vec{M}$ (moment magnétique induit par unité de volume), qui donne naissance à des <strong>courants de magnétisation</strong>. On introduit le <strong>champ excitation magnétique</strong> $\\vec{H}=\\vec{B}/\\mu_0-\\vec{M}$, qui permet de réécrire la loi d'Ampère en ne faisant intervenir que les courants libres. Selon le comportement de $\\vec{M}$, on distingue les matériaux diamagnétiques, paramagnétiques et ferromagnétiques, ces derniers présentant une aimantation intense et rémanente.</p>

    <h3>3. Milieux linéaires, homogènes et isotropes (LHI)</h3>
    <p>Pour un milieu <strong>LHI</strong>, $\\vec{P}$ et $\\vec{M}$ sont proportionnels aux champs qui les créent : $\\vec{P}=\\epsilon_0\\chi_e\\vec{E}$ et $\\vec{M}=\\chi_m\\vec{H}$, ce qui conduit à :</p>
    <p>$$\\vec{D}=\\epsilon\\vec{E}, \\qquad \\vec{B}=\\mu\\vec{H}$$</p>
    <p>avec $\\epsilon=\\epsilon_0\\epsilon_r$ (permittivité du milieu, $\\epsilon_r=1+\\chi_e$ la permittivité relative) et $\\mu=\\mu_0\\mu_r$ (perméabilité du milieu). Les équations de Maxwell dans la matière conservent alors la même structure que dans le vide, à condition de remplacer $\\epsilon_0\\to\\epsilon$ et $\\mu_0\\to\\mu$ et de ne compter que les charges et courants libres.</p>
    <table class="mini-table">
      <tr><th>Milieu</th><th>Permittivité relative $\\epsilon_r$ typique</th></tr>
      <tr><td>Air</td><td>$\\approx 1,0006$</td></tr>
      <tr><td>Eau (statique)</td><td>$\\approx 80$</td></tr>
      <tr><td>Verre</td><td>$\\approx 4$ à $10$</td></tr>
      <tr><td>Silicium</td><td>$\\approx 11,7$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'eau liquide a une permittivité relative statique très élevée ($\\epsilon_r\\approx 80$), mais sa permittivité aux fréquences optiques (celles de la lumière visible) est bien plus faible, proche de l'indice de réfraction optique de l'eau ($n\\approx 1,33$, donc $\\epsilon_r\\approx 1,8$). Qu'est-ce que cet écart suggère sur la capacité des molécules d'eau à réorienter leur polarisation selon la fréquence du champ appliqué ?
    </div>

    <h3>4. Propagation dans un milieu LHI</h3>
    <p>Dans un milieu LHI sans pertes, l'équation d'onde reste de la même forme, avec une vitesse de propagation $v=1/\\sqrt{\\mu\\epsilon}=c/n$, où $n=\\sqrt{\\mu_r\\epsilon_r}$ est l'<strong>indice de réfraction</strong> du milieu (généralement $\\mu_r\\approx1$ pour un diélectrique non magnétique, donc $n\\approx\\sqrt{\\epsilon_r}$). Dans un milieu <strong>avec pertes</strong> (absorbant), on introduit une permittivité effective complexe et un nombre d'onde complexe $\\underline{k}=\\beta - i\\alpha$, ce qui donne une onde de la forme $E\\propto e^{-\\alpha z}\\cos(\\omega t-\\beta z)$ : le terme $e^{-\\alpha z}$ traduit l'atténuation progressive de l'onde en pénétrant dans le milieu, caractérisée par le coefficient d'atténuation $\\alpha$.</p>

    <h3>5. OPPM dans un bon conducteur</h3>
    <p>Dans un conducteur obéissant à la loi d'Ohm $\\vec{j}=\\gamma\\vec{E}$, un cas limite important est celui du <strong>bon conducteur</strong>, où le courant de conduction domine largement le courant de déplacement ($\\gamma\\gg\\omega\\epsilon$). On montre alors que l'onde qui pénètre dans le conducteur est très rapidement atténuée, avec une profondeur caractéristique de pénétration appelée <strong>épaisseur de peau</strong> :</p>
    <p>$$\\delta = \\sqrt{\\dfrac{2}{\\mu\\gamma\\omega}}$$</p>
    <p>Au-delà de quelques épaisseurs de peau, le champ est pratiquement nul à l'intérieur du conducteur : c'est ce phénomène (« effet de peau ») qui explique pourquoi, en haute fréquence, un courant alternatif circule essentiellement à la surface des conducteurs, et pourquoi un conducteur épais suffit à réaliser un blindage électromagnétique efficace.</p>

    <div class="key-point">
      <span class="eyebrow">Du vide à la matière : ce qui change, ce qui reste</span>
      La structure des équations de Maxwell reste identique dans un milieu LHI, à condition de remplacer $\\epsilon_0$ par $\\epsilon$ et $\\mu_0$ par $\\mu$. Ce qui change concrètement : la vitesse de propagation diminue ($v=c/n$), et si le milieu conduit un tant soit peu, l'onde s'atténue en pénétrant — jusqu'à disparaître presque totalement au-delà de l'épaisseur de peau dans un bon conducteur.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'épaisseur de peau dans le cuivre, à la fréquence du secteur (50 Hz), vaut environ 9 mm, mais chute à moins d'un micromètre pour des fréquences de l'ordre du gigahertz utilisées en télécommunications. Qu'est-ce que cela implique pour la conception des antennes et des composants électroniques haute fréquence, en termes de choix de matériaux et d'épaisseur de métal nécessaire ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Les métamatériaux, des structures artificielles conçues à l'échelle sub-longueur d'onde, permettent aujourd'hui d'obtenir des valeurs d'indice de réfraction impossibles dans la Nature — y compris des indices négatifs, prédits théoriquement par Victor Veselago dès 1968 mais réalisés expérimentalement seulement au début des années 2000. Ces matériaux ouvrent la voie à des applications spectaculaires comme les « capes d'invisibilité » électromagnétiques, qui guident une onde autour d'un objet sans qu'elle soit diffusée.</p>
    <p><strong>Question ouverte :</strong> peut-on fabriquer des métamatériaux à indice négatif efficaces sur une large bande de fréquences (et non une seule fréquence précise, comme c'est le cas actuellement), condition nécessaire pour des applications pratiques à grande échelle ? C'est un défi de recherche actif en physique des matériaux.</p>
    <p><strong>Technologie émergente :</strong> le chauffage par induction, qui exploite précisément l'effet de peau et les courants de Foucault induits dans une pièce métallique par un champ magnétique alternatif de haute fréquence, est aujourd'hui utilisé aussi bien en cuisine (plaques à induction) qu'en métallurgie industrielle pour la fusion contrôlée de métaux.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Champ électromagnétique → polarisation $\\vec P$ et aimantation $\\vec M$ de la matière → milieu LHI ($\\vec D=\\epsilon\\vec E$, $\\vec B=\\mu\\vec H$) → vitesse réduite $v=c/n$ → cas limite du bon conducteur : effet de peau
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\delta = \\sqrt{\\frac{2}{\\mu\\gamma\\omega}}$$
      Cette épaisseur de peau, qui rétrécit avec la fréquence, résume à elle seule pourquoi le courant haute fréquence « fuit » vers la surface des conducteurs — un phénomène qui façonne la conception de tous les câbles et composants électroniques modernes.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Polarisation $\\vec{P}$ (diélectriques) et aimantation $\\vec{M}$ (aimants) sont les réponses microscopiques de la matière aux champs E et B</li>
        <li>Milieu LHI : $\\vec{D}=\\epsilon\\vec{E}$, $\\vec{B}=\\mu\\vec{H}$, avec $\\epsilon=\\epsilon_0\\epsilon_r$ et $\\mu=\\mu_0\\mu_r$</li>
        <li>Vitesse de propagation dans un milieu diélectrique sans pertes : $v=c/n$, avec $n=\\sqrt{\\mu_r\\epsilon_r}$</li>
        <li>Dans un milieu avec pertes, l'onde s'atténue en $e^{-\\alpha z}$ en pénétrant dans le matériau</li>
        <li>Dans un bon conducteur, l'onde est confinée sur une épaisseur de peau $\\delta=\\sqrt{2/(\\mu\\gamma\\omega)}$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le vecteur $\\vec{D}$ (déplacement électrique, lié aux charges libres) et le champ $\\vec{E}$ (champ électrique total)</li>
        <li>Oublier que l'indice de réfraction $n=\\sqrt{\\mu_r\\epsilon_r}$ dépend aussi de $\\mu_r$, même si $\\mu_r\\approx 1$ pour la plupart des diélectriques usuels</li>
        <li>Croire que l'épaisseur de peau est une propriété universelle : elle dépend de la fréquence $\\omega$, elle diminue quand la fréquence augmente</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans un milieu LHI non magnétique ($\\mu_r\\approx1$), l'indice de réfraction vaut approximativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag14e1" value="wrong"> $n=\\epsilon_r$</label>
          <label class="option"><input type="radio" name="emag14e1" value="right"> $n=\\sqrt{\\epsilon_r}$</label>
          <label class="option"><input type="radio" name="emag14e1" value="wrong"> $n=1/\\epsilon_r$</label>
          <label class="option"><input type="radio" name="emag14e1" value="wrong"> $n=\\epsilon_r^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag14e1','emag14fb1','Correct — n=√(μrεr), qui se réduit à √εr quand μr≈1.','Repense à la formule générale n=√(μrεr), puis simplifie avec μr≈1.')">Vérifier</button>
        <div class="feedback" id="emag14fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'épaisseur de peau dans un bon conducteur :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag14e2" value="wrong"> augmente quand la fréquence augmente</label>
          <label class="option"><input type="radio" name="emag14e2" value="right"> diminue quand la fréquence augmente</label>
          <label class="option"><input type="radio" name="emag14e2" value="wrong"> ne dépend pas de la fréquence</label>
          <label class="option"><input type="radio" name="emag14e2" value="wrong"> est infinie dans un bon conducteur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag14e2','emag14fb2','Correct — δ=√(2/(μγω)) : plus ω est grand, plus δ est petit, l\'onde pénètre moins profondément.','Regarde la formule de δ : ω est au dénominateur, sous une racine.')">Vérifier</button>
        <div class="feedback" id="emag14fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le vecteur déplacement électrique $\\vec{D}$ est défini par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag14e3" value="wrong"> $\\vec{D}=\\vec{E}-\\vec{P}$</label>
          <label class="option"><input type="radio" name="emag14e3" value="right"> $\\vec{D}=\\epsilon_0\\vec{E}+\\vec{P}$</label>
          <label class="option"><input type="radio" name="emag14e3" value="wrong"> $\\vec{D}=\\mu_0\\vec{E}+\\vec{M}$</label>
          <label class="option"><input type="radio" name="emag14e3" value="wrong"> $\\vec{D}=\\vec{B}/\\mu_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag14e3','emag14fb3','Correct — D=ε0E+P permet d\'écrire la loi de Gauss en ne faisant intervenir que les charges libres.','D combine le champ E dans le vide et la contribution de la polarisation P de la matière.')">Vérifier</button>
        <div class="feedback" id="emag14fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si tous les matériaux avaient un indice de réfraction exactement égal à 1 : la lumière visible existerait-elle encore telle que nous la percevons (réfraction, arc-en-ciel, lentilles) ?</li>
        <li>Pourquoi les fours à micro-ondes chauffent-ils efficacement l'eau contenue dans les aliments, mais laissent-ils presque intacts les récipients en verre ou en céramique ?</li>
        <li>Quelle serait la conséquence, pour la conception des lignes à haute tension, d'une découverte de matériaux supraconducteurs à température ambiante, où l'effet de peau perdrait sa pertinence pratique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>P. Debye, <em>Polar Molecules</em>, Chemical Catalog Company, 1929 — travaux fondateurs sur la polarisation diélectrique et sa dépendance en fréquence.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur la propagation en milieu matériel.</li>
        <li>V. G. Veselago, « The Electrodynamics of Substances with Simultaneously Negative Values of ε and μ », Soviet Physics Uspekhi, 1968 — prédiction théorique des métamatériaux à indice négatif.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais ce qui se passe quand une onde électromagnétique pénètre dans la matière — qu'elle y soit ralentie, atténuée, ou totalement bloquée en surface. Le dernier chapitre de ce cours, « Réflexion et réfraction des ondes électromagnétiques aux interfaces », va compléter cette histoire en étudiant ce qui se passe exactement à la frontière entre deux milieux — pourquoi une partie de la lumière se réfléchit sur une vitre tandis que l'autre la traverse. Comme le disait Maxwell à propos de la relation profonde entre lumière et matière : « La théorie que je propose peut donc être appelée une théorie du champ électromagnétique, parce qu'elle a affaire avec l'espace dans le voisinage des corps électriques et magnétiques. » Tu es sur le point d'achever cette exploration de l'espace électromagnétique.</p>
  `
};

EMAG_NOVA_KB[emagKey('Propagation dans les milieux matériels : diélectriques et conducteurs')] = {
  intro: "Salut, moi c'est Nova ! On voit la propagation dans la matière : polarisation, aimantation, milieux LHI et effet de peau. Demande-moi ce qu'est l'épaisseur de peau, la définition de D et H, ou l'indice de réfraction.",
  rules: [
    { test:/[ée]paisseur de peau|effet de peau/i, replies:["L'épaisseur de peau δ=√(2/(μγω)) est la profondeur caractéristique de pénétration d'une onde dans un bon conducteur. Elle diminue quand la fréquence augmente : en haute fréquence, le courant circule essentiellement en surface."] },
    { test:/vecteur d[ée]placement|\\bd\\s*=\\s*[ée]|d=[ée]0e/i, replies:["Le vecteur déplacement électrique D=ε0E+P combine le champ E et la polarisation P de la matière. Il permet d'écrire la loi de Gauss dans la matière en ne comptant que les charges libres : ∇·D=ρ_libre."] },
    { test:/champ.*excitation.*magn[ée]tique|\\bh\\s*=/i, replies:["Le champ excitation magnétique H=B/μ0-M combine le champ B et l'aimantation M de la matière. Il permet d'écrire la loi d'Ampère dans la matière en ne comptant que les courants libres."] },
    { test:/indice de r[ée]fraction/i, replies:["L'indice de réfraction n=√(μrεr) relie la vitesse de propagation dans le milieu à celle du vide : v=c/n. Pour un diélectrique non magnétique (μr≈1), n≈√εr."] },
    { test:/polarisation.*mati[èe]re|charges induites/i, replies:["La polarisation P est le moment dipolaire induit par unité de volume dans un diélectrique soumis à un champ E. Elle crée des charges de polarisation induites qui modifient le champ macroscopique."] },
    { test:/aimantation|ferromagn[ée]tisme/i, replies:["L'aimantation M est le moment magnétique induit par unité de volume. Selon son comportement on distingue diamagnétiques, paramagnétiques et ferromagnétiques (aimantation intense et rémanente, comme le fer)."] },
    { test:/milieu lhi|lin[ée]aire homog[èe]ne isotrope/i, replies:["Un milieu LHI (Linéaire, Homogène, Isotrope) vérifie D=εE et B=μH, avec ε et μ constants et indépendants de la direction. Les équations de Maxwell y gardent la même structure que dans le vide."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : simplifie n=√(μrεr) avec μr≈1.","Indice niveau 2 : il ne reste qu'une racine carrée d'εr.","Indice niveau 3 : n=√εr."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde où se trouve ω dans la formule de δ.","Indice niveau 2 : ω est au dénominateur sous la racine.","Indice niveau 3 : δ diminue quand ω augmente."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : D combine le champ dans le vide et la réponse de la matière.","Indice niveau 2 : cette réponse s'appelle la polarisation P.","Indice niveau 3 : D=ε0E+P."] }
  ]
};

/* =========================== CHAPITRE 15 — Réflexion et réfraction des ondes électromagnétiques aux interfaces =========================== */
EMAG_CHAPTERS[emagKey('Réflexion et réfraction des ondes électromagnétiques aux interfaces')] = {
  objectives: [
    "Écrire les conditions aux limites du champ électromagnétique à l'interface entre deux milieux",
    "Établir les coefficients de réflexion et de transmission en amplitude et en puissance en incidence normale",
    "Retrouver la loi de Snell-Descartes à partir de la continuité de la phase en incidence oblique",
    "Distinguer les composantes de polarisation parallèle et perpendiculaire en incidence oblique",
    "Analyser en quoi ce chapitre démontre que l'optique géométrique n'est qu'un cas particulier de l'électromagnétisme"
  ],
  prereqs: ["Propagation dans les milieux matériels : diélectriques et conducteurs"],
  bodyHtml: `
    <p>Willebrord Snell et René Descartes énoncent, indépendamment, dès le XVIIe siècle, la loi qui porte aujourd'hui leurs deux noms — pourtant, ni l'un ni l'autre ne savait ce qu'était réellement la lumière. Il faudra attendre les équations de Maxwell, deux siècles plus tard, pour que cette loi, longtemps considérée comme un postulat empirique de l'optique, se révèle être une simple conséquence mathématique de la continuité du champ électromagnétique à une interface. C'est l'un des moments les plus satisfaisants de toute la physique : voir une loi observée depuis l'Antiquité (la réfraction, déjà étudiée par Ptolémée) se déduire, presque sans effort, d'un principe bien plus fondamental.</p>
    <p>Chaque vitre qui laisse passer la lumière tout en en réfléchissant une partie, chaque fibre optique qui guide un signal Internet sur des milliers de kilomètres par réflexion totale interne, chaque revêtement antireflet d'un objectif photographique reposent sur les coefficients de Fresnel que ce chapitre te propose de démontrer. Même tes lunettes de soleil polarisées, qui éliminent les reflets éblouissants sur l'eau ou la route, exploitent précisément l'angle de Brewster introduit ici.</p>
    <p>Ce dernier chapitre applique tout l'appareil construit depuis le début du cours (équations de Maxwell, OPPM, propagation dans la matière) à la situation la plus concrète de l'optique ondulatoire : que devient une onde électromagnétique lorsqu'elle rencontre une interface entre deux milieux différents ? C'est le socle théorique de la réflexion, de la réfraction et donc de toute l'optique géométrique. À la fin de ce chapitre — et de ce cours — tu sauras que tout ce que tu connaissais déjà de l'optique n'est, au fond, qu'un cas particulier de l'électromagnétisme de Maxwell.</p>

    <h3>1. Conditions aux limites entre deux milieux</h3>
    <p>À l'interface entre deux milieux LHI (1) et (2), en l'absence de charges et de courants libres surfaciques, les équations de Maxwell imposent la continuité de certaines composantes du champ :</p>
    <table class="mini-table">
      <tr><th>Composante</th><th>Condition</th></tr>
      <tr><td>$E$ tangentielle</td><td>continue à l'interface</td></tr>
      <tr><td>$B$ normale</td><td>continue à l'interface</td></tr>
      <tr><td>$D$ normale</td><td>continue (en l'absence de charges libres surfaciques)</td></tr>
      <tr><td>$H$ tangentielle</td><td>continue (en l'absence de courants libres surfaciques)</td></tr>
    </table>
    <p>Ces conditions, appliquées à une onde incidente, une onde réfléchie et une onde transmise, permettent de déterminer entièrement le comportement de l'onde à l'interface.</p>

    <h3>2. Incidence normale : conditions aux limites et coefficients</h3>
    <p>Pour une onde arrivant perpendiculairement à l'interface entre deux milieux d'indices $n_1$ et $n_2$, la continuité de $E$ et $H$ tangentiels donne les <strong>coefficients de réflexion et de transmission en amplitude</strong> :</p>
    <p>$$r = \\dfrac{E_{0r}}{E_{0i}} = \\dfrac{n_1-n_2}{n_1+n_2}, \\qquad t = \\dfrac{E_{0t}}{E_{0i}} = \\dfrac{2n_1}{n_1+n_2}$$</p>
    <p>Les <strong>coefficients en puissance</strong> (rapports de flux d'énergie, donc de vecteurs de Poynting moyens) s'en déduisent :</p>
    <p>$$R = r^2 = \\left(\\dfrac{n_1-n_2}{n_1+n_2}\\right)^2, \\qquad T = 1-R$$</p>
    <p>La relation $R+T=1$ traduit simplement la conservation de l'énergie à l'interface : toute la puissance incidente se retrouve soit réfléchie, soit transmise.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le coefficient $R=\\left(\\frac{n_1-n_2}{n_1+n_2}\\right)^2$ ne dépend que de la différence entre les deux indices, jamais de leur sens. Une vitre (n≈1,5) réfléchit donc la même fraction de lumière, que la lumière aille de l'air vers le verre ou du verre vers l'air. Cette symétrie te semble-t-elle intuitive à première vue ?
    </div>

    <h3>3. Incidence oblique : définitions et loi de Snell-Descartes</h3>
    <p>Pour une onde arrivant avec un angle d'incidence $\\theta_i$ (mesuré par rapport à la normale à l'interface), on distingue l'angle de réflexion $\\theta_r$ et l'angle de réfraction $\\theta_t$. La continuité de la phase des trois ondes (incidente, réfléchie, transmise) le long de l'interface, à tout instant et en tout point de celle-ci, impose deux résultats géométriques :</p>
    <p>$$\\theta_r = \\theta_i \\qquad\\qquad n_1\\sin\\theta_i = n_2\\sin\\theta_t$$</p>
    <p>La première relation est la loi de la réflexion ; la seconde est la célèbre <strong>loi de Snell-Descartes</strong> de la réfraction, ici obtenue directement à partir des équations de Maxwell plutôt que postulée empiriquement comme en optique géométrique élémentaire.</p>

    <h3>4. Deux polarisations à traiter séparément</h3>
    <p>En incidence oblique, contrairement à l'incidence normale, il faut distinguer deux cas selon l'orientation du champ électrique par rapport au <strong>plan d'incidence</strong> (plan contenant le rayon incident et la normale à l'interface) :</p>
    <table class="mini-table">
      <tr><th>Polarisation</th><th>Description</th></tr>
      <tr><td>Perpendiculaire (TE, ou « s »)</td><td>$\\vec{E}$ perpendiculaire au plan d'incidence</td></tr>
      <tr><td>Parallèle (TM, ou « p »)</td><td>$\\vec{E}$ contenu dans le plan d'incidence</td></tr>
    </table>
    <p>Les conditions aux limites, appliquées séparément à chaque polarisation, donnent des coefficients de réflexion et de transmission (dits <strong>coefficients de Fresnel</strong>) différents selon le cas. Une conséquence notable : il existe un angle d'incidence particulier, l'<strong>angle de Brewster</strong>, pour lequel la composante parallèle est intégralement transmise (coefficient de réflexion nul) — principe exploité par les filtres polarisants et les lunettes de soleil polarisées, qui atténuent sélectivement la lumière réfléchie par des surfaces horizontales (eau, route).</p>

    <div class="key-point">
      <span class="eyebrow">De Maxwell à l'optique géométrique</span>
      Ce chapitre boucle la construction du cours : les lois de l'optique géométrique classique (réflexion, réfraction, loi de Snell-Descartes), enseignées historiquement comme des postulats indépendants, se déduisent en réalité entièrement des quatre équations de Maxwell et des conditions de continuité qu'elles imposent à une interface. L'optique n'est, au fond, qu'un chapitre de l'électromagnétisme.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Au-delà d'un certain angle d'incidence (l'angle critique), lorsqu'on passe d'un milieu plus réfringent vers un milieu moins réfringent ($n_1>n_2$), la loi de Snell-Descartes $n_1\\sin\\theta_i=n_2\\sin\\theta_t$ ne peut plus être satisfaite par aucun angle réel $\\theta_t$. Que devient alors physiquement l'onde incidente ? (Indice : c'est exactement ce phénomène qui permet à une fibre optique de guider la lumière sur des kilomètres sans qu'elle s'échappe.)
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La réflexion totale interne, évoquée dans la pause réflexive ci-dessus, est le principe physique qui rend possible l'intégralité d'Internet à travers les océans : les câbles sous-marins en fibre optique transportent la quasi-totalité du trafic intercontinental mondial en exploitant cette propriété pour guider la lumière sur des dizaines de milliers de kilomètres avec des pertes minimales. Plus récemment, les recherches sur les cristaux photoniques et les métasurfaces cherchent à contrôler la réflexion et la réfraction à l'échelle nanométrique, avec des applications allant des revêtements antireflets ultra-performants aux capteurs optiques miniaturisés.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des interfaces qui réfléchissent ou réfractent la lumière de façon totalement contrôlée, indépendamment de l'angle d'incidence — un objectif activement poursuivi par la recherche en optique en champ proche et en métasurfaces optiques ?</p>
    <p><strong>Technologie émergente :</strong> les revêtements antireflets multicouches, utilisés sur les objectifs d'appareils photo et les panneaux solaires, exploitent des interférences constructives et destructives calculées précisément à partir des coefficients de Fresnel de ce chapitre pour minimiser les pertes de lumière par réflexion.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Onde incidente sur une interface → continuité de E, B, D, H → coefficients de Fresnel (incidence normale) → continuité de la phase (incidence oblique) → loi de Snell-Descartes → optique géométrique retrouvée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$n_1\\sin\\theta_i = n_2\\sin\\theta_t$$
      Cette équation, connue de tout étudiant depuis le lycée sous le nom de loi de Snell-Descartes, clôt magnifiquement ce cours : elle démontre que l'optique géométrique tout entière — miroirs, lentilles, prismes, fibres optiques — n'est qu'une conséquence directe, à l'échelle macroscopique, des quatre équations de Maxwell découvertes plus d'un siècle après la loi elle-même.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>À une interface sans charges ni courants libres : $E$ tangentielle, $B$ normale, $D$ normale et $H$ tangentielle sont continues</li>
        <li>Incidence normale : $r=(n_1-n_2)/(n_1+n_2)$, $R=r^2$, et $R+T=1$ (conservation de l'énergie)</li>
        <li>Incidence oblique : $\\theta_r=\\theta_i$ (réflexion) et $n_1\\sin\\theta_i=n_2\\sin\\theta_t$ (Snell-Descartes)</li>
        <li>Deux polarisations à traiter séparément : perpendiculaire (TE) et parallèle (TM) au plan d'incidence</li>
        <li>L'angle de Brewster annule la réflexion de la composante parallèle : principe des filtres polarisants</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre coefficients en amplitude ($r$, $t$) et coefficients en puissance ($R$, $T=1-R$) : $R=r^2$, pas $R=r$</li>
        <li>Oublier de distinguer polarisation parallèle et perpendiculaire en incidence oblique : les coefficients de Fresnel diffèrent entre les deux cas</li>
        <li>Croire que la loi de Snell-Descartes est un postulat indépendant : elle découle en réalité de la continuité de la phase imposée par les équations de Maxwell</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">En incidence normale, la relation entre les coefficients en puissance R et T est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag15e1" value="wrong"> $R=T$</label>
          <label class="option"><input type="radio" name="emag15e1" value="right"> $R+T=1$</label>
          <label class="option"><input type="radio" name="emag15e1" value="wrong"> $R-T=1$</label>
          <label class="option"><input type="radio" name="emag15e1" value="wrong"> $RT=1$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag15e1','emag15fb1','Correct — R+T=1 traduit la conservation de l\'énergie : toute la puissance incidente est soit réfléchie, soit transmise.','Pense à la conservation de l\'énergie à l\'interface : la puissance incidente se répartit entre réflexion et transmission.')">Vérifier</button>
        <div class="feedback" id="emag15fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La loi de Snell-Descartes, obtenue à partir des équations de Maxwell, s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag15e2" value="wrong"> $n_1\\cos\\theta_i=n_2\\cos\\theta_t$</label>
          <label class="option"><input type="radio" name="emag15e2" value="right"> $n_1\\sin\\theta_i=n_2\\sin\\theta_t$</label>
          <label class="option"><input type="radio" name="emag15e2" value="wrong"> $n_1\\theta_i=n_2\\theta_t$</label>
          <label class="option"><input type="radio" name="emag15e2" value="wrong"> $\\theta_i=\\theta_t$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag15e2','emag15fb2','Correct — c\'est la loi de la réfraction, obtenue en imposant la continuité de la phase le long de l\'interface.','La loi de Snell-Descartes utilise le sinus des angles, pas leur cosinus.')">Vérifier</button>
        <div class="feedback" id="emag15fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'angle de Brewster correspond à un angle d'incidence pour lequel :</p>
        <div class="options">
          <label class="option"><input type="radio" name="emag15e3" value="wrong"> toute la lumière est réfléchie</label>
          <label class="option"><input type="radio" name="emag15e3" value="right"> la composante parallèle n'est pas réfléchie du tout</label>
          <label class="option"><input type="radio" name="emag15e3" value="wrong"> l'onde incidente disparaît totalement</label>
          <label class="option"><input type="radio" name="emag15e3" value="wrong"> $n_1=n_2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('emag15e3','emag15fb3','Correct — à cet angle, le coefficient de réflexion de la polarisation parallèle (TM) s\'annule : c\'est le principe des filtres polarisants.','Pense au principe exploité par les lunettes de soleil polarisées : une seule des deux polarisations est concernée.')">Vérifier</button>
        <div class="feedback" id="emag15fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la réflexion totale interne n'existait pas : les fibres optiques, et donc l'Internet mondial tel qu'on le connaît, seraient-ils possibles avec une autre technologie ?</li>
        <li>Pourquoi Snell et Descartes ont-ils pu énoncer leur loi bien avant que quiconque ne sache ce qu'était réellement la lumière ?</li>
        <li>Quelle serait la conséquence, pour la photographie et l'astronomie, de l'absence de revêtements antireflets exploitant les coefficients de Fresnel ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>R. Descartes, <em>La Dioptrique</em>, 1637 — premier énoncé publié de la loi de la réfraction en Europe occidentale.</li>
        <li>J.-P. Pérez, R. Carles, R. Fleckinger, <em>Électromagnétisme : fondements et applications</em>, Dunod — chapitre sur la réflexion et la réfraction des ondes électromagnétiques.</li>
        <li>A. Fresnel, <em>Mémoire sur la diffraction de la lumière</em>, Académie des Sciences, 1818 — travaux fondateurs sur les coefficients qui portent son nom.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce cours d'électromagnétisme : parti d'une simple comparaison entre force gravitationnelle et force électrique au premier chapitre, tu termines en comprenant que la lumière elle-même, et toute l'optique qui en découle, n'est qu'une conséquence des quatre équations de Maxwell. Peu de théories physiques peuvent se targuer d'unifier autant de phénomènes en apparence disparates — électricité, magnétisme, lumière — sous un même formalisme aussi élégant. Comme le résumait Richard Feynman, admiratif : « Du point de vue de l'histoire de l'humanité — dans dix mille ans d'ici — il ne fait aucun doute que l'événement le plus significatif du XIXe siècle sera jugé être la découverte par Maxwell des lois de l'électrodynamique. » Tu viens de refaire, à ton échelle, ce voyage intellectuel.</p>
  `
};

EMAG_NOVA_KB[emagKey('Réflexion et réfraction des ondes électromagnétiques aux interfaces')] = {
  intro: "Salut, moi c'est Nova ! On termine le cours avec la réflexion et la réfraction : conditions aux limites, coefficients de Fresnel, loi de Snell-Descartes. Demande-moi les conditions de continuité à une interface, la loi de Snell-Descartes, ou l'angle de Brewster.",
  rules: [
    { test:/conditions aux limites|continuit[ée].*interface/i, replies:["À une interface sans charges ni courants libres, sont continues : E tangentielle, B normale, D normale et H tangentielle. Ces conditions déterminent entièrement le comportement d'une onde à l'interface."] },
    { test:/snell.descartes|loi de la r[ée]fraction/i, replies:["La loi de Snell-Descartes n1 sinθi=n2 sinθt s'obtient en imposant la continuité de la phase des ondes le long de l'interface — elle découle donc directement des équations de Maxwell, pas d'un postulat indépendant."] },
    { test:/coefficient.*r[ée]flexion|coefficient.*transmission|incidence normale/i, replies:["En incidence normale, r=(n1-n2)/(n1+n2) pour l'amplitude, et R=r² pour la puissance, avec R+T=1 (conservation de l'énergie)."] },
    { test:/brewster/i, replies:["L'angle de Brewster est l'angle d'incidence pour lequel le coefficient de réflexion de la polarisation parallèle (TM) s'annule : toute cette composante est transmise. C'est le principe des filtres et lunettes de soleil polarisants."] },
    { test:/polarisation.*perpendiculaire|te.*tm|plan d.incidence/i, replies:["En incidence oblique, on distingue la polarisation perpendiculaire (TE, E hors du plan d'incidence) et parallèle (TM, E dans le plan d'incidence) : elles ont des coefficients de Fresnel différents."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la conservation de l'énergie.","Indice niveau 2 : toute la puissance incidente doit se retrouver quelque part.","Indice niveau 3 : R+T=1."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : la loi de Snell-Descartes utilise une fonction trigonométrique précise.","Indice niveau 2 : ce n'est pas le cosinus.","Indice niveau 3 : n1 sinθi=n2 sinθt."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au principe des lunettes de soleil polarisées.","Indice niveau 2 : une seule polarisation est concernée par cet angle particulier.","Indice niveau 3 : la composante parallèle (TM) n'est pas réfléchie."] }
  ]
};

/* fusionne le module Électromagnétisme dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, EMAG_CHAPTERS);
Object.assign(NOVA_KB, EMAG_NOVA_KB);