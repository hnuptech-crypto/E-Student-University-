/* =====================================================================
   CHUNK « mecan » — registre MECAN_CHAPTERS / MECAN_NOVA_KB
   Matière(s) : Physique|Mécanique analytique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MECAN_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — MÉCANIQUE ANALYTIQUE (L3PF, domaine Physique)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : principe de moindre action et calcul des variations, formalisme lagrangien
   (coordonnées généralisées, équations d'Euler-Lagrange), symétries et théorème de
   Noether, petites oscillations et modes normaux, formalisme hamiltonien (transformée
   de Legendre, équations canoniques), crochets de Poisson et espace des phases,
   transformations canoniques et équation de Hamilton-Jacobi, problème à force
   centrale et mouvement képlérien — conforme aux maquettes LMD de mécanique
   analytique en L3 Physique Fondamentale. Ce cours s'appuie directement sur les
   outils du calcul des variations et de l'analyse vectorielle du cours "Méthodes
   mathématiques pour la physique", et prépare le formalisme de la mécanique
   quantique (crochets de Poisson → commutateurs). Références de fond : H. Goldstein,
   C. Poole & J. Safko, Classical Mechanics (Pearson) ; L. Landau & E. Lifchitz,
   Mécanique (Mir/Ellipses) ; J.-P. Pérez, Mécanique — Fondements et applications
   (Dunod).
===================================================================================== */
const MECAN_MATIERE = 'Mécanique analytique';
function meaKey(chapterTitle){ return `Physique|${MECAN_MATIERE}|${chapterTitle}`; }
const MECAN_CHAPTERS = {};
const MECAN_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
MECAN_CHAPTERS[meaKey("Principe de moindre action et calcul des variations")] = {
  objectives: [
    "Formuler le principe de moindre action (principe de Hamilton) pour un système mécanique",
    "Établir l'équation d'Euler-Lagrange comme condition de stationnarité d'une fonctionnelle",
    "Distinguer minimum et simple stationnarité de l'action",
    "Retrouver la deuxième loi de Newton comme cas particulier du principe variationnel",
    "Analyser en quoi la démarche purement analytique de Lagrange (1788), sans recours à aucune figure géométrique, a changé la façon de formuler les lois de la physique"
  ],
  prereqs: ["Mécanique du point (L1-L2)", "Équations différentielles linéaires (L2)"],
  bodyHtml: `
    <p>En 1744, le mathématicien français Pierre Louis Moreau de Maupertuis énonce un principe qu'il juge si profond qu'il y voit presque une preuve de l'existence de Dieu : la nature, affirme-t-il, agit toujours par les voies les plus économes, en minimisant une certaine « quantité d'action ». L'intuition était juste, la formulation encore maladroite — il faudra Euler, puis surtout Joseph-Louis Lagrange, pour la rendre rigoureuse. En 1788, Lagrange publie à Paris son traité <em>Mécanique analytique</em> — celui-là même qui donne son nom à cette matière — où il se targue, dans sa préface restée célèbre, de n'avoir eu besoin d'aucune figure : toute la mécanique y est déduite d'un unique principe variationnel par le seul calcul.</p>
    <p>Cette reformulation n'est pas un simple exercice de style mathématique. Le GPS de ton téléphone corrige la trajectoire des satellites par des équations issues de ce même formalisme ; les simulateurs de robots articulés (bras industriels, exosquelettes) l'utilisent parce qu'il évite d'avoir à écrire, une à une, toutes les forces de liaison ; et la mécanique quantique elle-même, un siècle et demi plus tard, redécouvrira ce principe sous la forme de l'intégrale de chemin de Feynman.</p>
    <p>La mécanique analytique reformule ainsi entièrement la mécanique newtonienne autour d'un principe unificateur d'une élégance remarquable : le <strong>principe de moindre action</strong>. Plutôt que de sommer des forces vectorielles, on cherche la trajectoire qui rend <strong>stationnaire</strong> une quantité scalaire, l'action. Ce changement de perspective, loin d'être un simple habillage mathématique, se révèle être le langage naturel de la physique moderne (mécanique quantique, théorie des champs, relativité générale).</p>

    <h3>1. Le principe de Hamilton</h3>
    <p>Pour un système mécanique décrit par des coordonnées généralisées $q(t) = (q_1,\\ldots,q_n)$, on définit le <strong>lagrangien</strong> $L(q,\\dot{q},t)$ (une fonction scalaire, en général $L = T - V$, énergie cinétique moins énergie potentielle) et l'<strong>action</strong> associée à une trajectoire entre deux instants fixés $t_1$ et $t_2$ :</p>
    <div class="formula-box">$$S[q] = \\int_{t_1}^{t_2} L(q(t),\\dot{q}(t),t)\\,dt$$</div>
    <p>Le <strong>principe de Hamilton</strong> énonce que la trajectoire physiquement réalisée par le système, parmi toutes les trajectoires imaginables reliant la même configuration initiale $q(t_1)$ à la même configuration finale $q(t_2)$, est celle qui rend l'action $S$ <strong>stationnaire</strong> (c'est-à-dire $\\delta S = 0$ pour toute variation infinitésimale $\\delta q(t)$ de la trajectoire, avec $\\delta q(t_1)=\\delta q(t_2)=0$).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — stationnaire, pas nécessairement minimale</span>
      Malgré son nom historique, le principe de « moindre » action n'exige en réalité qu'une <strong>stationnarité</strong> de $S$, pas un minimum global : dans de nombreux systèmes (en particulier au-delà d'un certain intervalle de temps, ou en présence de points conjugués), l'action de la trajectoire physique n'est qu'un <strong>point-selle</strong>. Le nom « principe de moindre action » reste néanmoins solidement ancré dans la tradition, pour des raisons historiques.
    </div>

    <h3>2. Dérivation de l'équation d'Euler-Lagrange</h3>
    <p>Considérons une variation $q(t) \\to q(t) + \\varepsilon\\,\\eta(t)$, avec $\\eta(t_1)=\\eta(t_2)=0$ et $\\varepsilon \\to 0$. La variation de l'action au premier ordre en $\\varepsilon$ s'écrit :</p>
    <div class="formula-box">$$\\delta S = \\int_{t_1}^{t_2} \\left(\\dfrac{\\partial L}{\\partial q}\\,\\eta + \\dfrac{\\partial L}{\\partial \\dot{q}}\\,\\dot{\\eta}\\right)dt$$</div>
    <p>En intégrant par parties le second terme (le terme de bord s'annule car $\\eta(t_1)=\\eta(t_2)=0$) :</p>
    <div class="formula-box">$$\\delta S = \\int_{t_1}^{t_2} \\left(\\dfrac{\\partial L}{\\partial q} - \\dfrac{d}{dt}\\dfrac{\\partial L}{\\partial \\dot{q}}\\right)\\eta(t)\\,dt$$</div>
    <p>Pour que $\\delta S = 0$ pour <strong>toute</strong> fonction $\\eta(t)$ arbitraire (nulle aux bornes), le terme entre parenthèses doit être identiquement nul — c'est le <strong>lemme fondamental du calcul des variations</strong>. On obtient ainsi l'<strong>équation d'Euler-Lagrange</strong> :</p>
    <div class="formula-box">$$\\dfrac{d}{dt}\\dfrac{\\partial L}{\\partial \\dot{q}} - \\dfrac{\\partial L}{\\partial q} = 0$$</div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le lemme fondamental du calcul des variations exige que $\eta(t)$ soit <strong>arbitraire</strong> entre $t_1$ et $t_2$. Si l'on autorisait $\eta$ à être non nulle aux bornes (trajectoire finale libre plutôt que fixée), le terme de bord de l'intégration par parties ne s'annulerait plus automatiquement : quelle condition physique supplémentaire faudrait-il alors imposer pour que $\delta S=0$ reste exploitable ?
    </div>

    <h3>3. Retrouver la mécanique newtonienne</h3>
    <p>Pour une particule dans un potentiel $V(x)$, $L = \\dfrac{1}{2}m\\dot{x}^2 - V(x)$. L'équation d'Euler-Lagrange donne :</p>
    <div class="formula-box">$$\\dfrac{d}{dt}(m\\dot{x}) - \\left(-\\dfrac{\\partial V}{\\partial x}\\right) = 0 \\ \\Longrightarrow \\ m\\ddot{x} = -\\dfrac{\\partial V}{\\partial x} = F(x)$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      On retrouve exactement la deuxième loi de Newton — mais le formalisme lagrangien va bien au-delà d'une simple reformulation : il permet de traiter <strong>directement</strong>, sans effort supplémentaire, des systèmes à liaisons complexes (pendule sur un rail, corps rigides articulés) où l'écriture explicite des forces de liaison serait fastidieuse voire impraticable — sujet approfondi au chapitre 2.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Le chemin le plus court entre deux points du plan est bien connu : c'est la ligne droite. Retrouver ce résultat par le calcul des variations, en minimisant la fonctionnelle longueur $S[y] = \\displaystyle\\int_{x_1}^{x_2} \\sqrt{1+y'(x)^2}\\,dx$.</p>
      <p><strong>Solution :</strong> On identifie $L(y,y',x) = \\sqrt{1+y'^2}$, indépendant de $y$ explicitement, donc $\\partial L/\\partial y = 0$. L'équation d'Euler-Lagrange se réduit à $\\dfrac{d}{dx}\\dfrac{\\partial L}{\\partial y'} = 0$, donc $\\dfrac{\\partial L}{\\partial y'} = \\dfrac{y'}{\\sqrt{1+y'^2}}$ est une <strong>constante</strong>. Cela impose $y'$ constant (fonction croissante et bijective du rapport), donc $y(x)$ est une fonction affine.</p>
      <p class="example-answer">Réponse : $y(x)$ est de la forme $ax+b$, c'est-à-dire une ligne droite — confirmant, par le calcul des variations, un résultat géométrique intuitif.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'exemple précédent minimise une <em>longueur</em>, pas une action mécanique — et pourtant la même équation d'Euler-Lagrange s'applique. Qu'est-ce que cela te suggère sur la nature véritable du principe variationnel : est-il d'abord un principe de <em>physique</em>, ou d'abord un principe <em>mathématique</em> que la physique se contente d'appliquer à un lagrangien particulier ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Le principe de moindre action ne s'est pas arrêté à la mécanique classique. En 1948, Richard Feynman en propose une version radicalement nouvelle pour la mécanique quantique : l'<strong>intégrale de chemin</strong>, où une particule « explore » simultanément <em>toutes</em> les trajectoires possibles entre deux points, chacune pondérée par un facteur de phase $e^{iS/\hbar}$ — et c'est l'interférence entre ces chemins qui fait émerger, à l'échelle macroscopique, la trajectoire unique et stationnaire que prédit Lagrange. Aujourd'hui encore, cette formulation reste l'un des piliers de la théorie quantique des champs et du Modèle standard de la physique des particules.</p>
    <p><strong>Question ouverte :</strong> pourquoi la nature « choisit-elle » de rendre l'action stationnaire plutôt qu'une autre quantité ? Le principe de moindre action décrit remarquablement bien le comportement des systèmes physiques, mais la question de son statut — loi fondamentale irréductible, ou conséquence profonde d'une structure encore plus élémentaire — reste un sujet de réflexion en physique théorique.</p>
    <p><strong>Application émergente :</strong> les algorithmes d'apprentissage automatique utilisés pour entraîner les robots à marcher ou à manipuler des objets s'appuient de plus en plus sur des principes variationnels similaires (minimisation d'une fonctionnelle de coût le long d'une trajectoire), directement inspirés du formalisme lagrangien.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Trajectoire imaginable q(t) → action S[q] = ∫L dt → condition de stationnarité δS=0 → équation d'Euler-Lagrange → trajectoire physique réelle
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\dfrac{d}{dt}\dfrac{\partial L}{\partial \dot{q}} - \dfrac{\partial L}{\partial q} = 0$$
      Toute la mécanique analytique — du pendule simple au mouvement képlérien en passant par les petites oscillations — se déduit de cette unique équation, une fois le bon lagrangien $L=T-V$ identifié.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le principe de Hamilton : la trajectoire physique rend stationnaire l'action S[q] = ∫L(q,q̇,t)dt, entre deux configurations fixées</li>
      <li>L'équation d'Euler-Lagrange, d/dt(∂L/∂q̇) − ∂L/∂q = 0, exprime cette condition de stationnarité</li>
      <li>« Moindre » action ne signifie pas toujours minimum global — la stationnarité peut être un point-selle</li>
      <li>Pour une particule newtonienne (L=T−V), Euler-Lagrange redonne exactement F=mẍ</li>
      <li>Le formalisme lagrangien traite naturellement les systèmes à liaisons, sans expliciter les forces de liaison</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que le principe de moindre action garantit toujours un minimum strict de l'action</li>
      <li>Oublier le terme de bord (qui s'annule seulement grâce à η(t1)=η(t2)=0) lors de l'intégration par parties</li>
      <li>Confondre la variable dynamique q̇ (traitée comme indépendante de q dans le lagrangien) avec sa relation réelle dq/dt le long d'une trajectoire particulière</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Le principe de Hamilton énonce que la trajectoire physique :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea1e1" value="wrong">Minimise toujours strictement l'action</label>
        <label class="option"><input type="radio" name="mea1e1" value="right">Rend l'action stationnaire (δS=0)</label>
        <label class="option"><input type="radio" name="mea1e1" value="wrong">Maximise toujours l'énergie cinétique</label>
        <label class="option"><input type="radio" name="mea1e1" value="wrong">Minimise le temps de parcours uniquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea1e1','mea1fb1','Correct — le principe exige la stationnarité de S, pas nécessairement un minimum global.','Relis le point clé sur la nuance entre stationnarité et minimum.')">Vérifier</button>
      <div class="feedback" id="mea1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour L = (1/2)mẋ² − V(x), l'équation d'Euler-Lagrange redonne :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea1e2" value="wrong">L'équation de Schrödinger</label>
        <label class="option"><input type="radio" name="mea1e2" value="right">La deuxième loi de Newton, mẍ = F(x)</label>
        <label class="option"><input type="radio" name="mea1e2" value="wrong">La conservation de l'énergie uniquement</label>
        <label class="option"><input type="radio" name="mea1e2" value="wrong">Aucune équation physique connue</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea1e2','mea1fb2','Correct — c\\'est exactement mẍ=−∂V/∂x=F(x), la deuxième loi de Newton.','Relis la dérivation du chapitre : que devient d/dt(∂L/∂ẋ)−∂L/∂x pour ce lagrangien précis ?')">Vérifier</button>
      <div class="feedback" id="mea1fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'univers admettait plusieurs trajectoires rendant l'action également stationnaire (comme entre deux points conjugués) : lequel de ces chemins la nature « choisirait »-elle réellement, et qu'est-ce que cela dit sur les limites du principe de moindre action en mécanique classique ?</li>
      <li>Pourquoi Lagrange a-t-il pu se vanter, dans sa préface de 1788, de n'utiliser aucune figure géométrique — alors que la mécanique de Newton, un siècle plus tôt, reposait presque entièrement sur des constructions géométriques ?</li>
      <li>Quelle serait la conséquence, pour la suite du cours, si le lagrangien d'un système dépendait explicitement de $\ddot q$ (l'accélération) et non plus seulement de $q$ et $\dot q$ ? L'équation d'Euler-Lagrange telle qu'établie ici resterait-elle valable telle quelle ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>J.-L. Lagrange, <em>Mécanique analytique</em>, Paris, 1788 — le traité fondateur qui donne son nom à cette matière.</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — référence anglophone standard pour l'ensemble du cours.</li>
      <li>R. Feynman, A. Hibbs, <em>Quantum Mechanics and Path Integrals</em>, McGraw-Hill, 1965 — pour l'extension quantique du principe variationnel évoquée en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens de poser la pierre angulaire de toute la mécanique analytique : une seule équation, l'équation d'Euler-Lagrange, d'où tout le reste va découler. Le chapitre suivant lui donnera un langage encore plus efficace — les coordonnées généralisées — pour traiter des systèmes que la mécanique newtonienne peinerait à décrire. Comme l'écrivait Lagrange lui-même, non sans fierté, en préface de son traité de 1788 : on n'y trouvera « aucune figure » — seulement, désormais, la tienne dans tes propres calculs.</p>
  `
};
MECAN_NOVA_KB[meaKey("Principe de moindre action et calcul des variations")] = {
  intro: "Salut, moi c'est Nova ! On démarre la mécanique analytique avec le principe de moindre action et le calcul des variations. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/principe de hamilton|moindre action/i, replies:[
      "Le principe de Hamilton : la trajectoire physique rend stationnaire l'action S=∫L dt, entre deux configurations fixées aux instants t1 et t2 — δS=0, pas nécessairement un minimum strict."
    ]},
    { test:/euler.lagrange/i, replies:[
      "L'équation d'Euler-Lagrange, d/dt(∂L/∂q̇)−∂L/∂q=0, exprime la condition de stationnarité de l'action. C'est le résultat central de ce chapitre, obtenu par intégration par parties de δS."
    ]},
    { test:/lagrangien/i, replies:[
      "Le lagrangien L=T−V (énergie cinétique moins énergie potentielle) est la fonction scalaire dont dépend l'action S=∫L dt."
    ]},
    { test:/newton|f=ma|mẍ/i, replies:[
      "Pour L=(1/2)mẋ²−V(x), Euler-Lagrange redonne exactement mẍ=−∂V/∂x=F(x), la deuxième loi de Newton — le formalisme lagrangien contient la mécanique newtonienne comme cas particulier."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la nuance entre stationnarité et minimum dans le principe de Hamilton.",
      "Indice niveau 2 : ce n'est pas toujours un minimum strict.",
      "Indice niveau 3 : c'est la stationnarité (δS=0) qui est exigée."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique Euler-Lagrange au lagrangien L=(1/2)mẋ²−V(x).",
      "Indice niveau 2 : ∂L/∂ẋ=mẋ, et ∂L/∂x=−∂V/∂x.",
      "Indice niveau 3 : cela donne mẍ=−∂V/∂x=F(x), soit la deuxième loi de Newton."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MECAN_CHAPTERS[meaKey("Formalisme lagrangien : coordonnées généralisées et équations d'Euler-Lagrange")] = {
  objectives: [
    "Choisir des coordonnées généralisées adaptées aux liaisons d'un système mécanique",
    "Distinguer liaisons holonomes et non-holonomes",
    "Construire le lagrangien d'un système à plusieurs degrés de liberté",
    "Résoudre des problèmes classiques (pendule simple, pendule double) par le formalisme lagrangien",
    "Expliquer pourquoi la terminologie holonome/non-holonome, forgée par Hertz en 1894, reste la grille de lecture standard pour classer une contrainte mécanique"
  ],
  prereqs: ["Principe de moindre action et calcul des variations"],
  bodyHtml: `
    <p>En 1894, dix ans après sa mort prématurée à 36 ans, paraît à titre posthume l'ouvrage <em>Die Prinzipien der Mechanik</em> (« Les principes de la mécanique ») du physicien allemand Heinrich Hertz — celui-là même qui avait confirmé expérimentalement l'existence des ondes électromagnétiques prédites par Maxwell. Hertz y introduit un mot forgé sur le grec ancien : <em>holonome</em>, de <em>holos</em> (« entier », « complet ») et <em>nomos</em> (« loi »), pour désigner les liaisons intégralement exprimables par une relation entre les coordonnées. Ce vocabulaire, resté standard depuis plus d'un siècle, structure encore aujourd'hui la façon dont on classe les contraintes mécaniques.</p>
    <p>Cette distinction n'a rien d'un raffinement théorique gratuit : un robot à roues (contrainte de roulement sans glissement, non-holonome) ne se pilote pas du tout comme un bras articulé (liaisons holonomes) — les algorithmes de planification de trajectoire des voitures autonomes doivent explicitement tenir compte de cette différence, sous peine de calculer des manœuvres physiquement irréalisables.</p>
    <p>La véritable puissance pratique du formalisme lagrangien se révèle dans le traitement de ces systèmes à <strong>liaisons</strong> : plutôt que de manipuler explicitement des forces de liaison souvent complexes (tension d'un fil, réaction d'un rail), on choisit des <strong>coordonnées généralisées</strong> qui incorporent automatiquement les contraintes, réduisant le problème à son nombre réel de degrés de liberté.</p>

    <h3>1. Coordonnées généralisées et degrés de liberté</h3>
    <p>Pour un système de $N$ points matériels soumis à $k$ contraintes indépendantes, le nombre de <strong>degrés de liberté</strong> est $n = 3N - k$. On choisit alors $n$ <strong>coordonnées généralisées</strong> $q_1,\\ldots,q_n$ — pas nécessairement des longueurs (elles peuvent être des angles, par exemple) — qui paramètrent complètement et sans redondance les configurations possibles du système compatibles avec les contraintes.</p>

    <h3>2. Liaisons holonomes et non-holonomes</h3>
    <table class="mini-table">
      <tr><th>Type de liaison</th><th>Définition</th><th>Exemple</th></tr>
      <tr><td>Holonome</td><td>Exprimable sous forme $f(q_1,\\ldots,q_n,t)=0$ (relation entre coordonnées, éventuellement dépendante du temps)</td><td>Longueur constante d'un pendule rigide ; bille contrainte sur une sphère</td></tr>
      <tr><td>Non-holonome</td><td>Non réductible à une telle relation — typiquement une contrainte portant sur les <strong>vitesses</strong>, non intégrable</td><td>Roulement sans glissement d'une roue sur un plan (contrainte de vitesse, non intégrable en une relation de position)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le formalisme lagrangien standard, tel que présenté dans ce chapitre, s'applique <strong>directement</strong> aux liaisons holonomes : on choisit des coordonnées généralisées qui satisfont automatiquement la contrainte, réduisant ainsi le nombre de variables. Les liaisons non-holonomes nécessitent un traitement plus avancé (multiplicateurs de Lagrange non éliminables, formalisme légèrement différent), qui dépasse le cadre de ce chapitre introductif.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le point clé ci-dessus précise que les liaisons non-holonomes « nécessitent un traitement plus avancé ». Intuitivement, pourquoi une contrainte portant sur les <em>vitesses</em> (comme le roulement sans glissement) ne peut-elle pas, en général, se ramener à une simple relation entre les <em>positions</em> — alors qu'une contrainte de position, elle, peut toujours se dériver pour donner une relation entre vitesses ?
    </div>

    <h3>3. Exemple : le pendule simple</h3>
    <p>Pour un pendule de longueur $\\ell$ fixe, oscillant dans un plan vertical sous l'effet de la gravité, la contrainte holonome $x^2+y^2=\\ell^2$ permet de réduire les deux coordonnées cartésiennes $(x,y)$ à une seule coordonnée généralisée : l'angle $\\theta$. Avec $x=\\ell\\sin\\theta$, $y=-\\ell\\cos\\theta$ :</p>
    <div class="formula-box">$$T = \\dfrac{1}{2}m\\ell^2\\dot\\theta^2 \\qquad V = -mg\\ell\\cos\\theta \\qquad L = \\dfrac{1}{2}m\\ell^2\\dot\\theta^2 + mg\\ell\\cos\\theta$$</div>
    <p>L'équation d'Euler-Lagrange en $\\theta$ donne directement :</p>
    <div class="formula-box">$$m\\ell^2\\ddot\\theta = -mg\\ell\\sin\\theta \\ \\Longrightarrow \\ \\ddot\\theta + \\dfrac{g}{\\ell}\\sin\\theta = 0$$</div>
    <p>On retrouve l'équation classique du pendule simple, obtenue ici <strong>sans jamais avoir eu à écrire la tension du fil</strong> — un avantage décisif par rapport à l'approche newtonienne directe, où cette force de liaison inconnue doit être éliminée par une projection judicieuse.</p>

    <h3>4. Systèmes à plusieurs degrés de liberté : le pendule double</h3>
    <p>Le formalisme se généralise sans effort conceptuel supplémentaire à des systèmes à $n$ degrés de liberté. Pour un <strong>pendule double</strong> (deux masses $m_1$, $m_2$ reliées par des tiges rigides de longueurs $\\ell_1$, $\\ell_2$), on choisit les deux angles $\\theta_1,\\theta_2$ comme coordonnées généralisées. Le lagrangien, bien que plus complexe (il couple $\\theta_1$, $\\theta_2$, $\\dot\\theta_1$, $\\dot\\theta_2$), conduit systématiquement à <strong>deux</strong> équations d'Euler-Lagrange couplées — un système que l'approche newtonienne directe rendrait nettement plus laborieux à établir, en raison des forces de liaison inconnues aux deux articulations.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une perle de masse $m$ glisse sans frottement sur un cerceau vertical de rayon $R$, tournant à vitesse angulaire constante $\\omega$ autour d'un axe vertical passant par son centre. Quelle est la coordonnée généralisée naturelle, et combien de degrés de liberté ce système possède-t-il ?</p>
      <p><strong>Solution :</strong> La perle est contrainte à rester sur le cerceau (liaison holonome, $x^2+y^2+z^2=R^2$ dans un repère centré), et sa position azimutale autour de l'axe vertical est imposée par la rotation à $\\omega$ constant (contrainte supplémentaire dépendante du temps, également holonome). Il ne reste donc qu'<strong>un seul</strong> degré de liberté réel : l'angle polaire $\\theta$ repérant la position de la perle le long du cerceau.</p>
      <p class="example-answer">Réponse : la coordonnée généralisée naturelle est l'angle $\\theta$ le long du cerceau ; le système possède 1 seul degré de liberté, malgré son apparente complexité en 3D.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dans l'exemple de la perle sur le cerceau tournant, la contrainte de rotation à $\\omega$ constant dépend explicitement du temps ($f(\\theta,t)$), et pourtant elle reste holonome selon la définition de Hertz. Qu'est-ce que cela révèle : la distinction holonome/non-holonome porte-t-elle sur la <em>dépendance au temps</em> d'une contrainte, ou sur autre chose ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Les contraintes non-holonomes, écartées de ce chapitre introductif, sont aujourd'hui au cœur de la <strong>robotique mobile</strong> : un robot différentiel (deux roues motrices indépendantes) ou une voiture autonome sont des systèmes non-holonomes par excellence — ils peuvent atteindre n'importe quelle position et orientation, mais pas par n'importe quel chemin instantané, exactement comme une voiture ne peut pas se déplacer latéralement sans manœuvrer. La théorie du contrôle géométrique moderne, qui s'appuie sur des outils comme les crochets de Lie, sert précisément à planifier des trajectoires réalisables pour ces systèmes.</p>
    <p><strong>Question ouverte :</strong> pour des systèmes à un très grand nombre de degrés de liberté couplés par des liaisons complexes (une protéine qui se replie, par exemple), le choix des « bonnes » coordonnées généralisées devient lui-même un problème difficile — un axe de recherche actif en simulation moléculaire consiste à apprendre ces coordonnées automatiquement plutôt que de les deviner à la main.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Système à N points + k contraintes holonomes → n=3N−k coordonnées généralisées q_i → lagrangien L(q_i,q̇_i,t) → n équations d'Euler-Lagrange couplées → mouvement complet, sans jamais expliciter les forces de liaison
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\dfrac{d}{dt}\\dfrac{\\partial L}{\\partial \\dot q_i} - \\dfrac{\\partial L}{\\partial q_i} = 0 \\qquad (i=1,\\ldots,n)$$
      La même équation qu'au chapitre précédent, mais appliquée <em>coordonnée par coordonnée</em> : c'est cette généralisation à n degrés de liberté couplés qui donne au formalisme lagrangien toute sa puissance pratique.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le nombre de degrés de liberté d'un système à N points et k contraintes indépendantes est n=3N−k</li>
      <li>Une liaison holonome s'exprime par une relation f(q,t)=0 ; une liaison non-holonome (souvent sur les vitesses) ne se réduit pas à une telle relation</li>
      <li>Le choix de coordonnées généralisées adaptées aux liaisons holonomes élimine automatiquement le besoin d'expliciter les forces de liaison</li>
      <li>Le pendule simple, traité avec θ comme coordonnée généralisée, redonne θ̈+(g/ℓ)sinθ=0 sans jamais faire apparaître la tension du fil</li>
      <li>Le formalisme se généralise directement à n degrés de liberté (ex : pendule double), produisant n équations d'Euler-Lagrange couplées</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Utiliser plus de coordonnées que de degrés de liberté réels, en oubliant d'exploiter pleinement les contraintes holonomes</li>
      <li>Confondre liaison holonome (réductible à une relation entre coordonnées) et non-holonome (typiquement une contrainte de vitesse non intégrable)</li>
      <li>Chercher à réintroduire une force de liaison dans le lagrangien alors que le bon choix de coordonnées généralisées l'a déjà éliminée</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Un système de 3 points matériels (9 coordonnées cartésiennes) est soumis à 5 contraintes holonomes indépendantes. Combien de degrés de liberté possède-t-il ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea2e1" value="wrong">9</label>
        <label class="option"><input type="radio" name="mea2e1" value="wrong">5</label>
        <label class="option"><input type="radio" name="mea2e1" value="right">4</label>
        <label class="option"><input type="radio" name="mea2e1" value="wrong">14</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea2e1','mea2fb1','Correct — n=3N−k=3×3−5=4 degrés de liberté.','Applique la formule n=3N−k avec N=3 et k=5.')">Vérifier</button>
      <div class="feedback" id="mea2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Le roulement sans glissement d'une roue sur un plan est un exemple classique de liaison :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea2e2" value="wrong">Holonome</label>
        <label class="option"><input type="radio" name="mea2e2" value="right">Non-holonome</label>
        <label class="option"><input type="radio" name="mea2e2" value="wrong">Il n'y a pas de contrainte dans ce système</label>
        <label class="option"><input type="radio" name="mea2e2" value="wrong">Cela dépend uniquement de la masse de la roue</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea2e2','mea2fb2','Correct — c\\'est une contrainte sur les vitesses, non intégrable en une relation entre positions : elle est non-holonome.','Relis le tableau des types de liaisons et l\\'exemple du roulement sans glissement.')">Vérifier</button>
      <div class="feedback" id="mea2fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'on choisissait, pour le pendule simple, la coordonnée cartésienne $x$ plutôt que l'angle $\\theta$ : le formalisme lagrangien fonctionnerait-il encore, et pourquoi ce choix serait-il malgré tout moins pratique ?</li>
      <li>Pourquoi Hertz a-t-il jugé utile, en 1894, de nommer précisément cette distinction — alors que les mécaniciens résolvaient déjà, depuis Lagrange, des problèmes avec liaisons sans disposer de ce vocabulaire ?</li>
      <li>Quelle serait la conséquence, pour le pendule double du paragraphe 4, si la deuxième tige n'était plus rigide mais élastique (ressort au lieu d'une tige) : le système resterait-il holonome, et combien de degrés de liberté aurait-il alors ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>H. Hertz, <em>Die Prinzipien der Mechanik in neuem Zusammenhange dargestellt</em>, Leipzig, 1894 — l'ouvrage posthume où apparaît pour la première fois le terme « holonome ».</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — chapitre sur les liaisons et les coordonnées généralisées.</li>
      <li>R. M. Murray, Z. Li, S. S. Sastry, <em>A Mathematical Introduction to Robotic Manipulation</em>, CRC Press, 1994 — pour l'extension aux systèmes non-holonomes évoquée en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Le vocabulaire de Hertz t'accompagnera dans toute la suite du cours : chaque nouveau système que tu rencontreras, il faudra d'abord se demander s'il est holonome avant même de songer à écrire son lagrangien. Dans le prochain chapitre, tu verras que les symétries de ce lagrangien cachent en réalité des quantités conservées, une idée qu'une mathématicienne allemande formalisera magistralement au siècle suivant.</p>
  `
};
MECAN_NOVA_KB[meaKey("Formalisme lagrangien : coordonnées généralisées et équations d'Euler-Lagrange")] = {
  intro: "Salut, moi c'est Nova ! On approfondit le formalisme lagrangien : coordonnées généralisées, liaisons, pendule simple/double. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/degr[ée] de libert[ée]/i, replies:[
      "Le nombre de degrés de liberté d'un système à N points et k contraintes indépendantes est n=3N−k."
    ]},
    { test:/holonome/i, replies:[
      "Une liaison holonome s'exprime par une relation f(q,t)=0 entre les coordonnées (ex : longueur fixe d'un pendule). Une liaison non-holonome (souvent sur les vitesses, comme le roulement sans glissement) ne se réduit pas à une telle relation."
    ]},
    { test:/pendule simple/i, replies:[
      "Pour le pendule simple, avec θ comme coordonnée généralisée : L=(1/2)mℓ²θ̇²+mgℓcosθ, et Euler-Lagrange donne θ̈+(g/ℓ)sinθ=0, sans jamais faire apparaître la tension du fil."
    ]},
    { test:/pendule double/i, replies:[
      "Le pendule double se traite avec deux coordonnées généralisées θ1, θ2, menant à deux équations d'Euler-Lagrange couplées — bien plus simple qu'une approche newtonienne directe avec forces de liaison inconnues."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique la formule n=3N−k.",
      "Indice niveau 2 : N=3, k=5, donc 3×3−5.",
      "Indice niveau 3 : cela donne 9−5=4 degrés de liberté."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce que contraint le roulement sans glissement (position ou vitesse ?).",
      "Indice niveau 2 : c'est une contrainte sur les vitesses, non intégrable en une relation de position.",
      "Indice niveau 3 : c'est donc une liaison non-holonome."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MECAN_CHAPTERS[meaKey("Symétries et lois de conservation : théorème de Noether")] = {
  objectives: [
    "Identifier une coordonnée cyclique et la quantité conservée associée",
    "Énoncer le théorème de Noether reliant symétries continues et lois de conservation",
    "Retrouver la conservation de l'énergie à partir de l'invariance par translation temporelle",
    "Retrouver la conservation de l'impulsion et du moment cinétique à partir des invariances spatiales",
    "Situer la démonstration de Noether (1918) dans son contexte — un problème de relativité générale posé par Hilbert et Klein — et dans le contexte plus large des difficultés qu'elle a rencontrées pour faire reconnaître son travail académique"
  ],
  prereqs: ["Formalisme lagrangien : coordonnées généralisées et équations d'Euler-Lagrange"],
  bodyHtml: `
    <p>En 1915, David Hilbert et Felix Klein invitent à Göttingen la mathématicienne Emmy Noether pour les aider à résoudre un problème délicat posé par la toute nouvelle théorie de la relativité générale d'Einstein : la conservation de l'énergie semblait s'y comporter étrangement. Noether livre en 1918 une réponse d'une portée bien plus vaste que le problème initial — un théorème reliant, de façon totalement générale, toute <strong>symétrie continue</strong> d'un système à une <strong>loi de conservation</strong>. Hilbert avait dû batailler pour la faire admettre à enseigner : au conseil de faculté qui s'y opposait au motif qu'elle était une femme, il aurait rétorqué que la faculté n'était tout de même pas des bains publics, où le sexe des candidats devrait importer. Noether restera pourtant chargée de cours non rémunérée pendant des années, malgré un théorème qu'Einstein lui-même qualifiera de « monument de la pensée mathématique ».</p>
    <p>Ce théorème n'est pas qu'une curiosité historique : c'est aujourd'hui l'un des piliers silencieux de toute la physique moderne. Chaque fois qu'un ingénieur affirme qu'un système isolé conserve son énergie, ou qu'un satellite conserve son moment cinétique en l'absence de couple extérieur, c'est — qu'il en ait conscience ou non — le théorème de Noether qui est à l'œuvre.</p>
    <p>L'un des résultats les plus profonds de toute la physique théorique est ainsi le <strong>théorème de Noether</strong> (Emmy Noether, 1918) : il établit un lien systématique et rigoureux entre les <strong>symétries continues</strong> d'un système et ses <strong>lois de conservation</strong>. Ce chapitre en présente les cas les plus utiles en mécanique classique.</p>

    <h3>1. Coordonnées cycliques et moments conjugués</h3>
    <p>On définit le <strong>moment conjugué</strong> (ou impulsion généralisée) associé à une coordonnée généralisée $q_i$ par :</p>
    <div class="formula-box">$$p_i = \\dfrac{\\partial L}{\\partial \\dot{q}_i}$$</div>
    <p>Une coordonnée $q_i$ est dite <strong>cyclique</strong> (ou ignorable) si le lagrangien $L$ ne dépend <strong>pas explicitement</strong> de $q_i$ (mais peut dépendre de $\\dot{q}_i$) : $\\partial L/\\partial q_i = 0$. L'équation d'Euler-Lagrange associée à $q_i$ se réduit alors immédiatement à :</p>
    <div class="formula-box">$$\\dfrac{d p_i}{dt} = \\dfrac{\\partial L}{\\partial q_i} = 0 \\ \\Longrightarrow \\ p_i = \\text{constante du mouvement}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      C'est la version la plus élémentaire (et la plus directement exploitable en pratique) du théorème de Noether : chaque coordonnée cyclique fournit <strong>immédiatement</strong> une quantité conservée, sans calcul supplémentaire — un outil de résolution extrêmement puissant, qui permet souvent de réduire l'ordre effectif d'un problème dynamique complexe.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La coordonnée $\\theta$ dans l'exemple du potentiel central est cyclique parce que le lagrangien ne « voit » pas sa valeur absolue — seulement sa vitesse. Peux-tu relier cette absence de dépendance explicite à une symétrie <em>géométrique</em> concrète du système (que se passe-t-il physiquement si l'on fait tourner tout le système d'un angle fixe autour du centre de force) ?
    </div>

    <h3>2. Le théorème de Noether (formulation générale)</h3>
    <p>Le théorème de Noether généralise cette observation : à toute <strong>transformation continue</strong> $q_i \\to q_i + \\varepsilon\\,\\Psi_i(q,t)$ (paramétrée par $\\varepsilon$, continûment relié à la transformation identité en $\\varepsilon=0$) laissant le lagrangien <strong>invariant</strong> (ou variant seulement d'une dérivée totale par rapport au temps), correspond une quantité conservée :</p>
    <div class="formula-box">$$Q = \\sum_i \\dfrac{\\partial L}{\\partial \\dot{q}_i}\\,\\Psi_i(q,t) = \\text{constante le long des trajectoires physiques}$$</div>
    <p>Ce résultat, d'une portée considérable, s'étend bien au-delà de la mécanique classique : en théorie des champs et en physique des particules, il est à l'origine de la conservation de la charge électrique (associée à l'invariance de jauge), et structure la classification moderne des lois de conservation fondamentales.</p>

    <h3>3. Trois symétries fondamentales et leurs conservations associées</h3>
    <table class="mini-table">
      <tr><th>Symétrie du lagrangien</th><th>Quantité conservée</th><th>Origine physique</th></tr>
      <tr><td>Invariance par translation temporelle ($L$ ne dépend pas explicitement de $t$)</td><td>Énergie $E = \\sum_i \\dot{q}_i p_i - L$ (identifiée au hamiltonien, chapitre 5)</td><td>Homogénéité du temps</td></tr>
      <tr><td>Invariance par translation spatiale selon une direction $\\hat{u}$</td><td>Composante de l'impulsion totale selon $\\hat{u}$</td><td>Homogénéité de l'espace</td></tr>
      <tr><td>Invariance par rotation autour d'un axe</td><td>Composante du moment cinétique total selon cet axe</td><td>Isotropie de l'espace</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour une particule dans un potentiel central $V(r)$ (ne dépendant que de la distance $r$ à un centre fixe), en coordonnées polaires planes $(r,\\theta)$, le lagrangien est $L = \\dfrac{1}{2}m(\\dot{r}^2+r^2\\dot\\theta^2) - V(r)$. Identifier la coordonnée cyclique et la quantité conservée associée.</p>
      <p><strong>Solution :</strong> $L$ ne dépend pas explicitement de $\\theta$ (seulement de $\\dot\\theta$) : $\\theta$ est donc une coordonnée cyclique. Le moment conjugué associé est $p_\\theta = \\partial L/\\partial\\dot\\theta = mr^2\\dot\\theta$, qui est conservé.</p>
      <p class="example-answer">Réponse : $\\theta$ est cyclique, et $p_\\theta = mr^2\\dot\\theta$ (le moment cinétique) est une constante du mouvement — c'est exactement la loi des aires de Kepler, retrouvée ici comme conséquence directe de la symétrie de rotation du potentiel central (chapitre 8).</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé — l'énergie comme quantité conservée</span>
      Il est important de bien distinguer deux notions souvent confondues : la fonction $H = \\sum_i \\dot{q}_i p_i - L$ (qui deviendra le <strong>hamiltonien</strong> au chapitre 5) est une constante du mouvement si $L$ ne dépend pas explicitement de $t$ — mais $H$ ne coïncide avec l'<strong>énergie mécanique</strong> usuelle $T+V$ que dans les cas où l'énergie cinétique $T$ est une fonction homogène de degré 2 des $\\dot{q}_i$ (ce qui est vrai dans la plupart des cas usuels, mais pas systématiquement, par exemple en présence de coordonnées dépendant explicitement du temps).
    </div>
  

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le problème que Hilbert et Klein avaient posé à Noether concernait la relativité générale, où l'espace-temps lui-même peut être courbe et dynamique. Si les symétries du théorème de Noether portent sur des transformations de <em>coordonnées</em>, que peux-tu anticiper sur la difficulté à définir une énergie totale conservée dans un espace-temps qui n'a lui-même aucune symétrie de translation temporelle particulière ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Le théorème de Noether structure encore aujourd'hui la physique la plus fondamentale : le <strong>Modèle standard</strong> de la physique des particules repose sur des symétries de jauge (invariances locales, plus subtiles que les symétries globales de ce chapitre) dont découlent, via une version étendue du théorème, la conservation de la charge électrique, de la couleur (interaction forte) et de l'isospin faible. Plus récemment, le théorème inspire directement des architectures de réseaux de neurones en physique computationnelle : en imposant explicitement certaines symétries à un modèle d'apprentissage automatique, on peut garantir que ses prédictions respectent automatiquement les lois de conservation physiques, sans avoir à les lui enseigner séparément.</p>
    <p><strong>Question ouverte :</strong> en relativité générale, la question initiale posée à Noether — la conservation de l'énergie dans un espace-temps dynamique — reste subtile ; l'énergie gravitationnelle totale d'un système isolé se définit rigoureusement, mais de façon plus délicate qu'en mécanique classique, précisément parce que l'espace-temps n'offre pas toujours la symétrie de translation temporelle globale dont ce chapitre présente le cas simple.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Symétrie continue du lagrangien (translation, rotation, temps) → transformation q_i → q_i+εΨ_i laissant L invariant → théorème de Noether → quantité conservée Q
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$Q = \\sum_i \\dfrac{\\partial L}{\\partial \\dot{q}_i}\\,\\Psi_i(q,t) = \\text{constante}$$
      Trois cas particuliers suffisent à retenir tout le chapitre : symétrie temporelle → énergie ; symétrie de translation → impulsion ; symétrie de rotation → moment cinétique.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une coordonnée cyclique (∂L/∂qi=0) fournit immédiatement un moment conjugué conservé pi=∂L/∂q̇i</li>
      <li>Le théorème de Noether relie toute symétrie continue du lagrangien à une quantité conservée</li>
      <li>Invariance temporelle → conservation de l'énergie ; invariance spatiale → conservation de l'impulsion ; invariance par rotation → conservation du moment cinétique</li>
      <li>Pour un potentiel central, l'angle θ est cyclique et p_θ=mr²θ̇ (moment cinétique) est conservé — c'est la loi des aires de Kepler</li>
      <li>Le hamiltonien H ne coïncide avec l'énergie mécanique usuelle T+V que sous certaines conditions sur T</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre coordonnée cyclique (absente du lagrangien) et coordonnée nulle ou constante</li>
      <li>Croire que le hamiltonien H coïncide systématiquement avec l'énergie mécanique T+V, sans vérifier les conditions requises</li>
      <li>Oublier de vérifier que le lagrangien est réellement invariant (pas seulement l'équation du mouvement) avant d'appliquer Noether</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Une coordonnée q_i est dite cyclique si :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea3e1" value="wrong">Elle est constante au cours du mouvement</label>
        <label class="option"><input type="radio" name="mea3e1" value="right">Le lagrangien ne dépend pas explicitement de q_i (mais peut dépendre de q̇_i)</label>
        <label class="option"><input type="radio" name="mea3e1" value="wrong">Elle décrit un mouvement circulaire</label>
        <label class="option"><input type="radio" name="mea3e1" value="wrong">Elle n'apparaît jamais dans le lagrangien, même via sa dérivée</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea3e1','mea3fb1','Correct — c\\'est précisément la définition : L ne dépend pas explicitement de qi, mais peut dépendre de q̇i.','Relis la définition précise d\\'une coordonnée cyclique en début de chapitre.')">Vérifier</button>
      <div class="feedback" id="mea3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">L'invariance d'un lagrangien par translation spatiale selon une direction donnée est associée à la conservation de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea3e2" value="wrong">L'énergie</label>
        <label class="option"><input type="radio" name="mea3e2" value="right">La composante de l'impulsion selon cette direction</label>
        <label class="option"><input type="radio" name="mea3e2" value="wrong">Le moment cinétique total</label>
        <label class="option"><input type="radio" name="mea3e2" value="wrong">Aucune quantité, la translation n'a pas d'effet</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea3e2','mea3fb2','Correct — invariance spatiale (homogénéité de l\\'espace) ⟷ conservation de l\\'impulsion selon la direction concernée.','Relis le tableau des trois symétries fondamentales et de leurs conservations associées.')">Vérifier</button>
      <div class="feedback" id="mea3fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si un lagrangien était invariant par translation spatiale seulement selon une direction, mais pas selon les deux autres : combien de composantes de l'impulsion seraient alors conservées, et lesquelles ?</li>
      <li>Pourquoi la reconnaissance académique de Noether a-t-elle été aussi tardive, alors que Hilbert et Einstein, deux des plus grands noms de la physique-mathématique de l'époque, avaient immédiatement saisi la portée de son théorème ?</li>
      <li>Quelle serait la conséquence, pour l'exemple du potentiel central traité dans ce chapitre, si le potentiel $V$ dépendait aussi de l'angle $\\theta$ (et non plus seulement de $r$) : la quantité $p_\\theta$ resterait-elle conservée ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>E. Noether, « Invariante Variationsprobleme », <em>Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen</em>, 1918 — l'article fondateur du théorème.</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — chapitre sur les symétries et les lois de conservation.</li>
      <li>D. E. Neuenschwander, <em>Emmy Noether's Wonderful Theorem</em>, Johns Hopkins University Press, 2011 — pour le contexte historique et les applications modernes évoquées en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Retiens ce réflexe pour tout le reste du cours : face à un nouveau système, cherche d'abord ses symétries — l'effort de calcul en sera souvent considérablement réduit. Le prochain chapitre l'illustrera directement en étudiant les petites oscillations, où une symétrie plus discrète (le voisinage d'un équilibre stable) permettra de linéariser des problèmes autrement inextricables.</p>
  `
};
MECAN_NOVA_KB[meaKey("Symétries et lois de conservation : théorème de Noether")] = {
  intro: "Salut, moi c'est Nova ! On explore le théorème de Noether : symétries, coordonnées cycliques, lois de conservation. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/coordonn[ée]e cyclique/i, replies:[
      "Une coordonnée qi est cyclique si L ne dépend pas explicitement de qi (mais peut dépendre de q̇i). Son moment conjugué pi=∂L/∂q̇i est alors automatiquement conservé."
    ]},
    { test:/noether/i, replies:[
      "Le théorème de Noether relie toute symétrie continue du lagrangien à une quantité conservée : Q=Σ(∂L/∂q̇i)Ψi, constante le long des trajectoires physiques."
    ]},
    { test:/moment conjugu[ée]/i, replies:[
      "Le moment conjugué à qi est pi=∂L/∂q̇i. Si qi est cyclique, pi est une constante du mouvement — un outil de résolution très puissant."
    ]},
    { test:/[ée]nergie.*conserv[ée]e|hamiltonien.*[ée]nergie/i, replies:[
      "L'invariance par translation temporelle (L n'apparaît pas explicitement le temps) conserve H=Σq̇ipi−L, qui ne coïncide avec l'énergie mécanique T+V que sous certaines conditions sur T."
    ]},
    { test:/loi des aires|kepler|potentiel central/i, replies:[
      "Pour un potentiel central V(r), l'angle θ est cyclique : p_θ=mr²θ̇ (moment cinétique) est conservé — c'est la loi des aires de Kepler, conséquence directe de la symétrie de rotation."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition exacte d'une coordonnée cyclique.",
      "Indice niveau 2 : elle peut apparaître via sa dérivée q̇i, mais pas explicitement.",
      "Indice niveau 3 : c'est donc l'absence de qi explicite dans L qui définit une coordonnée cyclique."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau des trois symétries fondamentales.",
      "Indice niveau 2 : ce n'est ni l'énergie ni le moment cinétique.",
      "Indice niveau 3 : c'est l'impulsion (selon la direction de translation) qui est conservée."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MECAN_CHAPTERS[meaKey("Petites oscillations autour d'un équilibre : modes normaux")] = {
  objectives: [
    "Développer le lagrangien au second ordre autour d'une position d'équilibre stable",
    "Poser le problème aux valeurs propres généralisé associé aux petites oscillations",
    "Définir les modes normaux et les fréquences propres d'un système à plusieurs degrés de liberté",
    "Résoudre le problème classique de deux masses couplées par des ressorts",
    "Relier l'observation empirique de Huygens (1665) sur les pendules couplés au traitement rigoureux moderne par modes normaux"
  ],
  prereqs: ["Formalisme lagrangien : coordonnées généralisées et équations d'Euler-Lagrange", "Systèmes linéaires : méthodes directes (LU, Cholesky) et conditionnement (cours de Méthodes numériques)"],
  bodyHtml: `
    <p>En février 1665, alourdi par la maladie, le physicien et horloger néerlandais Christiaan Huygens observe un phénomène qui le laisse perplexe : deux pendules d'horloge, fixés à la même poutre de bois dans sa chambre, finissent toujours, après quelques minutes, par osciller en <strong>parfaite opposition de phase</strong> — quelle que soit la façon dont il les démarre. Il appelle cela une « sympathie étrange » entre les deux horloges : la poutre, en se déformant imperceptiblement sous l'effet de chaque pendule, couple les deux oscillateurs l'un à l'autre. Il faudra attendre Lagrange, un siècle plus tard, pour disposer du formalisme capable de traiter systématiquement ce type de système couplé — celui que ce chapitre développe.</p>
    <p>Ce phénomène de couplage n'est pas un cas isolé : il est partout, de la vibration des atomes dans une molécule (chaque liaison chimique agissant comme un ressort microscopique) aux oscillations d'un réseau cristallin, en passant par les circuits électriques couplés et, plus près de nous, les câbles d'un pont suspendu qui peuvent entrer en résonance collective.</p>
    <p>Ce chapitre applique le formalisme lagrangien à l'un des problèmes les plus fréquents de la physique : l'étude des <strong>petites oscillations</strong> d'un système autour d'une position d'équilibre stable — des vibrations moléculaires aux oscillations d'un réseau cristallin, en passant par les circuits électriques couplés.</p>

    <h3>1. Développement au voisinage d'un équilibre stable</h3>
    <p>Soit un système à $n$ degrés de liberté $q_1,\\ldots,q_n$, de lagrangien $L=T-V$, admettant une position d'équilibre $q_i = q_i^{(0)}$ (où $\\partial V/\\partial q_i = 0$ pour tout $i$). On introduit les petits écarts $\\eta_i = q_i - q_i^{(0)}$, et on développe l'énergie potentielle au <strong>second ordre</strong> (le premier ordre s'annule par définition de l'équilibre) :</p>
    <div class="formula-box">$$V \\approx V_0 + \\dfrac{1}{2}\\sum_{i,j} V_{ij}\\,\\eta_i\\eta_j, \\qquad V_{ij} = \\left.\\dfrac{\\partial^2 V}{\\partial q_i \\partial q_j}\\right|_{0}$$</div>
    <p>et l'énergie cinétique, généralement quadratique en $\\dot\\eta_i$ dès l'origine :</p>
    <div class="formula-box">$$T \\approx \\dfrac{1}{2}\\sum_{i,j} T_{ij}\\,\\dot\\eta_i\\dot\\eta_j$$</div>
    <p>où $V_{ij}$ et $T_{ij}$ sont des matrices <strong>symétriques constantes</strong> (matrices de rigidité et de masse généralisées), évaluées à l'équilibre.</p>

    <h3>2. Les équations du mouvement linéarisées</h3>
    <p>Le lagrangien approché $L \\approx \\dfrac{1}{2}\\sum T_{ij}\\dot\\eta_i\\dot\\eta_j - \\dfrac{1}{2}\\sum V_{ij}\\eta_i\\eta_j$ conduit, via Euler-Lagrange, à un système d'équations différentielles linéaires couplées :</p>
    <div class="formula-box">$$\\sum_j T_{ij}\\,\\ddot\\eta_j + \\sum_j V_{ij}\\,\\eta_j = 0 \\qquad \\text{(pour chaque } i\\text{)}$$</div>
    <p>ou, sous forme matricielle compacte : $T\\ddot{\\eta} + V\\eta = 0$.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le développement de $V$ au second ordre suppose que le premier ordre s'annule <em>par définition</em> de l'équilibre. Mais rien ne garantit encore, à ce stade, que cet équilibre soit <strong>stable</strong>. À quelle condition sur la matrice $V_{ij}$ (et non sur $T_{ij}$) un petit écart $\\eta_i$ reste-t-il borné au cours du temps plutôt que de croître indéfiniment ?
    </div>

    <h3>3. Recherche des modes normaux</h3>
    <p>On cherche des solutions oscillant toutes à une <strong>même fréquence</strong> $\\omega$ : $\\eta(t) = a\\,e^{i\\omega t}$ (avec $a$ un vecteur constant, potentiellement complexe). En substituant, on obtient un <strong>problème aux valeurs propres généralisé</strong> :</p>
    <div class="formula-box">$$\\left(V - \\omega^2 T\\right)a = 0$$</div>
    <p>Ce système linéaire homogène n'admet de solution non triviale que si le déterminant s'annule :</p>
    <div class="formula-box">$$\\det(V-\\omega^2 T) = 0$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — lien avec le cours de méthodes numériques</span>
      Cette équation, dite <strong>équation séculaire</strong>, est un problème aux valeurs propres généralisé (plutôt qu'un problème aux valeurs propres standard $Aa=\\lambda a$), qui se ramène à un problème standard $T^{-1}V\\,a = \\omega^2 a$ dès lors que $T$ est inversible (ce qui est toujours le cas pour une énergie cinétique physiquement bien définie, donc définie positive). On retrouve ici directement les outils du chapitre sur les valeurs propres du cours de Méthodes numériques (méthode de la puissance, algorithme QR).
    </div>
    <p>Les $n$ solutions $\\omega_k^2$ (réelles positives pour un équilibre effectivement <strong>stable</strong>) sont les <strong>fréquences propres</strong> du système, et les vecteurs propres associés $a^{(k)}$ définissent les <strong>modes normaux</strong> : des mouvements collectifs particuliers dans lesquels <strong>tous</strong> les degrés de liberté oscillent en phase (ou en opposition de phase), à la même fréquence $\\omega_k$.</p>

    <h3>4. Exemple classique : deux masses couplées par des ressorts</h3>
    <p>Deux masses identiques $m$, reliées entre elles par un ressort de raideur $k_c$, et chacune reliée à un mur fixe par un ressort de raideur $k$, oscillant selon un axe unique. Le lagrangien s'écrit :</p>
    <div class="formula-box">$$L = \\dfrac{1}{2}m(\\dot{x}_1^2+\\dot{x}_2^2) - \\dfrac{1}{2}k(x_1^2+x_2^2) - \\dfrac{1}{2}k_c(x_1-x_2)^2$$</div>
    <p>La résolution du problème aux valeurs propres généralisé donne deux modes normaux :</p>
    <table class="mini-table">
      <tr><th>Mode</th><th>Description</th><th>Fréquence propre</th></tr>
      <tr><td>Mode symétrique</td><td>$x_1=x_2$ (les deux masses oscillent en phase, le ressort central ne s'étire jamais)</td><td>$\\omega_1 = \\sqrt{k/m}$</td></tr>
      <tr><td>Mode antisymétrique</td><td>$x_1=-x_2$ (les deux masses oscillent en opposition de phase)</td><td>$\\omega_2 = \\sqrt{(k+2k_c)/m}$</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi le mode symétrique ($x_1=x_2$) a-t-il la même fréquence $\\sqrt{k/m}$ qu'un unique oscillateur isolé, indépendamment de la raideur $k_c$ du ressort de couplage ?</p>
      <p><strong>Solution :</strong> Dans le mode symétrique, les deux masses se déplacent toujours ensemble, d'une quantité identique à chaque instant : le ressort central, de longueur $x_1-x_2$, ne change donc <strong>jamais</strong> de longueur — il n'exerce aucune force de rappel supplémentaire. Chaque masse ne « voit » alors que son propre ressort de raideur $k$ vers le mur, exactement comme un oscillateur isolé.</p>
      <p class="example-answer">Réponse : le ressort de couplage reste toujours à sa longueur naturelle dans ce mode particulier, donc il n'influence pas du tout la fréquence, qui reste $\\sqrt{k/m}$.</p>
    </div>
  

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les pendules de Huygens finissaient par osciller en <strong>opposition de phase</strong> (mode antisymétrique), jamais en phase, malgré un démarrage arbitraire. Sachant qu'un système physique réel dissipe toujours un peu d'énergie (frottements), quel lien peux-tu faire entre cette dissipation et le fait qu'un seul des deux modes normaux « survive » au bout de quelques minutes ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>L'analyse en modes normaux reste aujourd'hui un outil de recherche à part entière. En chimie et physique moléculaire, la <strong>méthode GF de Wilson</strong> (Edgar Bright Wilson, années 1930) généralise exactement le calcul de ce chapitre à des molécules complexes, en tenant compte de la géométrie tridimensionnelle réelle des liaisons : c'est elle qui permet, aujourd'hui encore, de prédire numériquement le spectre infrarouge d'une molécule avant même de l'avoir synthétisée. Le phénomène de synchronisation observé par Huygens, lui, a donné naissance à tout un champ de recherche moderne — la théorie des <strong>oscillateurs couplés non linéaires</strong> — qui étudie pourquoi des systèmes aussi divers que des lucioles clignotantes, des neurones ou des réseaux électriques peuvent spontanément se synchroniser.</p>
    <p><strong>Question ouverte :</strong> pour des systèmes à très grand nombre de degrés de liberté (un cristal contenant $10^{23}$ atomes), diagonaliser explicitement $V-\\omega^2T$ devient impraticable ; les méthodes actuelles s'appuient sur les symétries du réseau cristallin (théorie des groupes, chapitre dédié de ce niveau) pour réduire drastiquement la taille effective du problème.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Équilibre stable q_i^(0) → développement au 2ᵉ ordre (T_ij, V_ij constantes) → équations linéarisées Tη̈+Vη=0 → solutions oscillantes η=a·e^(iωt) → équation séculaire det(V−ω²T)=0 → modes normaux ω_k, a^(k)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\det(V - \\omega^2 T) = 0$$
      Toute la richesse des petites oscillations — des deux masses couplées de Huygens à une molécule entière — tient dans la résolution de cette unique équation séculaire.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Au voisinage d'un équilibre stable, V se développe au second ordre en Vij, T reste quadratique en Tij (matrices constantes symétriques)</li>
      <li>Les équations du mouvement linéarisées s'écrivent Tη̈+Vη=0, avec des solutions oscillantes η=a·e^(iωt)</li>
      <li>L'équation séculaire det(V−ω²T)=0 est un problème aux valeurs propres généralisé, ramené à un problème standard via T⁻¹V</li>
      <li>Chaque fréquence propre ωk correspond à un mode normal : tous les degrés de liberté oscillent en phase ou opposition de phase à cette fréquence unique</li>
      <li>Pour deux masses couplées, le mode symétrique a la fréquence d'un oscillateur isolé (le ressort de couplage reste inerte), le mode antisymétrique a une fréquence plus élevée</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier que le premier ordre du développement de V s'annule par définition même de l'équilibre</li>
      <li>Confondre problème aux valeurs propres généralisé (V−ω²T)a=0 et problème standard, sans passer par T⁻¹V</li>
      <li>Croire qu'un mode normal implique nécessairement que toutes les masses oscillent avec la même amplitude — seule la fréquence est commune, les amplitudes relatives sont fixées par le vecteur propre</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Dans un mode normal d'un système à plusieurs degrés de liberté, que partagent tous les degrés de liberté ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea4e1" value="wrong">La même amplitude d'oscillation</label>
        <label class="option"><input type="radio" name="mea4e1" value="right">La même fréquence d'oscillation</label>
        <label class="option"><input type="radio" name="mea4e1" value="wrong">La même énergie cinétique instantanée</label>
        <label class="option"><input type="radio" name="mea4e1" value="wrong">La même masse</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea4e1','mea4fb1','Correct — dans un mode normal, tous les degrés de liberté oscillent à la même fréquence ωk (amplitudes relatives fixées par le vecteur propre).','Relis la définition d\\'un mode normal : quelle grandeur est commune à tous les degrés de liberté ?')">Vérifier</button>
      <div class="feedback" id="mea4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour deux masses identiques couplées par un ressort, pourquoi le mode symétrique a-t-il exactement la même fréquence qu'un oscillateur isolé ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea4e2" value="wrong">Parce que le ressort de couplage casse dans ce mode</label>
        <label class="option"><input type="radio" name="mea4e2" value="right">Parce que le ressort de couplage ne change jamais de longueur dans ce mode</label>
        <label class="option"><input type="radio" name="mea4e2" value="wrong">Parce que la masse totale du système est deux fois plus grande</label>
        <label class="option"><input type="radio" name="mea4e2" value="wrong">Ce n'est vrai que si k_c=0</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea4e2','mea4fb2','Correct — les deux masses se déplaçant toujours ensemble, le ressort central garde une longueur constante et n\\'exerce donc aucune force supplémentaire.','Relis l\\'exemple corrigé : que se passe-t-il pour la longueur du ressort central dans le mode symétrique ?')">Vérifier</button>
      <div class="feedback" id="mea4fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si les deux masses du système couplé n'étaient pas identiques (m₁≠m₂) : les modes garderaient-ils la forme parfaitement symétrique/antisymétrique (x₁=±x₂) décrite dans ce chapitre ?</li>
      <li>Pourquoi Huygens a-t-il mis des semaines à comprendre que la poutre elle-même transmettait le couplage, alors que l'effet était visible en quelques minutes à chaque essai ?</li>
      <li>Quelle serait la conséquence, pour l'équation séculaire, si la matrice de masse généralisée $T_{ij}$ n'était pas symétrique définie positive — ce cas peut-il réellement se produire pour un système physique ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>C. Huygens, correspondance avec son père Constantijn Huygens, février 1665 — la première description connue de la synchronisation par couplage (« sympathie des horloges »).</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — chapitre sur les oscillations couplées et les modes normaux.</li>
      <li>E. B. Wilson, J. C. Decius, P. C. Cross, <em>Molecular Vibrations</em>, McGraw-Hill, 1955 — la référence historique de la méthode GF évoquée en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">La prochaine fois que tu verras deux métronomes posés sur une même planche se synchroniser tout seuls, tu sauras que tu observes exactement le phénomène qui a intrigué Huygens en 1665 — et que tu disposes désormais des outils mathématiques pour le prédire, pas seulement l'admirer. Le chapitre suivant va reformuler tout ce que tu as appris jusqu'ici sous un angle nouveau : le formalisme hamiltonien, où positions et impulsions jouent enfin un rôle parfaitement symétrique.</p>
  `
};
MECAN_NOVA_KB[meaKey("Petites oscillations autour d'un équilibre : modes normaux")] = {
  intro: "Salut, moi c'est Nova ! On étudie les petites oscillations : modes normaux, fréquences propres, masses couplées. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/mode normal/i, replies:[
      "Un mode normal est un mouvement collectif où tous les degrés de liberté oscillent à la même fréquence ωk (en phase ou en opposition de phase), avec des amplitudes relatives fixées par le vecteur propre."
    ]},
    { test:/[ée]quation s[ée]culaire|valeurs propres g[ée]n[ée]ralis[ée]/i, replies:[
      "L'équation séculaire det(V−ω²T)=0 est un problème aux valeurs propres généralisé, ramené à un problème standard T⁻¹V·a=ω²a puisque T (énergie cinétique) est toujours inversible."
    ]},
    { test:/fr[ée]quence propre/i, replies:[
      "Les fréquences propres ωk sont les racines carrées des valeurs propres du problème généralisé (V−ω²T)a=0 — réelles positives pour un équilibre stable."
    ]},
    { test:/masses coupl[ée]es|mode sym[ée]trique|mode antisym[ée]trique/i, replies:[
      "Pour deux masses couplées : le mode symétrique (x1=x2) a la fréquence d'un oscillateur isolé √(k/m) car le ressort de couplage reste inerte ; le mode antisymétrique (x1=−x2) a une fréquence plus élevée √((k+2kc)/m)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition d'un mode normal.",
      "Indice niveau 2 : ce n'est pas l'amplitude qui est commune, mais une autre grandeur.",
      "Indice niveau 3 : c'est la fréquence d'oscillation qui est partagée par tous les degrés de liberté."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce qui arrive à la longueur du ressort central quand x1=x2 à chaque instant.",
      "Indice niveau 2 : le ressort central a pour longueur (x1−x2).",
      "Indice niveau 3 : cette longueur reste constante dans le mode symétrique, donc le ressort n'exerce aucune force supplémentaire."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MECAN_CHAPTERS[meaKey("Formalisme hamiltonien : transformation de Legendre et équations canoniques")] = {
  objectives: [
    "Construire le hamiltonien d'un système par transformation de Legendre du lagrangien",
    "Établir les équations canoniques de Hamilton",
    "Comprendre le passage de l'espace des configurations à l'espace des phases",
    "Retrouver les équations de Hamilton pour l'oscillateur harmonique et comparer à l'approche lagrangienne",
    "Situer l'origine du formalisme hamiltonien (1833) dans l'analogie optico-mécanique de Hamilton, et son prolongement jusqu'à la mécanique quantique ondulatoire de Schrödinger (1926)"
  ],
  prereqs: ["Symétries et lois de conservation : théorème de Noether"],
  bodyHtml: `
    <p>Le formalisme hamiltonien constitue une reformulation équivalente, mais conceptuellement distincte, de la mécanique lagrangienne : on y remplace les vitesses généralisées $\\dot{q}_i$ par les impulsions généralisées $p_i$ comme variables indépendantes, ouvrant la voie à l'<strong>espace des phases</strong> et, plus tard historiquement, au formalisme de la mécanique quantique.</p>

    <h3>1. La transformation de Legendre</h3>
    <p>Partant du lagrangien $L(q,\\dot{q},t)$ et des moments conjugués déjà définis au chapitre 3, $p_i = \\partial L/\\partial \\dot{q}_i$, on définit le <strong>hamiltonien</strong> comme la <strong>transformée de Legendre</strong> de $L$ par rapport aux vitesses :</p>
    <div class="formula-box">$$H(q,p,t) = \\sum_i p_i\\dot{q}_i - L(q,\\dot{q},t)$$</div>
    <p>où l'on doit exprimer, dans le membre de droite, les vitesses $\\dot{q}_i$ en fonction des impulsions $p_i$ (en inversant la relation $p_i=\\partial L/\\partial\\dot{q}_i$) — c'est possible dès lors que le lagrangien satisfait une condition technique de <strong>non-dégénérescence</strong> (le hessien $\\partial^2L/\\partial\\dot{q}_i\\partial\\dot{q}_j$ doit être inversible), presque toujours vérifiée pour les systèmes physiques usuels.</p>

    <h3>2. Les équations canoniques de Hamilton</h3>
    <p>En différentiant $H$ et en utilisant l'équation d'Euler-Lagrange, on établit que le mouvement du système, dans l'<strong>espace des phases</strong> $(q,p)$, obéit aux <strong>équations canoniques</strong> :</p>
    <div class="formula-box">$$\\dot{q}_i = \\dfrac{\\partial H}{\\partial p_i} \\qquad \\dot{p}_i = -\\dfrac{\\partial H}{\\partial q_i}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — un changement de perspective radical</span>
      Alors que le formalisme lagrangien produit $n$ équations différentielles du <strong>second ordre</strong> (une par degré de liberté), le formalisme hamiltonien produit $2n$ équations différentielles du <strong>premier ordre</strong>, de structure remarquablement symétrique entre $q$ et $p$. Cette réduction à l'ordre 1 est le point de départ de toute l'analyse géométrique moderne de la dynamique (espace des phases, flots hamiltoniens, systèmes intégrables, théorie du chaos).
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les équations canoniques $\\dot q_i=\\partial H/\\partial p_i$ et $\\dot p_i=-\\partial H/\\partial q_i$ ont exactement la même structure, au signe près. Si l'on effectuait l'échange $q_i \\leftrightarrow p_i$ (avec un signe convenable), les équations resteraient-elles valables ? Qu'est-ce que cela suggère sur le statut respectif de $q$ et $p$ dans ce formalisme, comparé au formalisme lagrangien où $q$ et $\\dot q$ ne jouent clairement pas le même rôle ?
    </div>

    <h3>3. Exemple : l'oscillateur harmonique</h3>
    <p>Pour $L = \\dfrac{1}{2}m\\dot{x}^2 - \\dfrac{1}{2}kx^2$, le moment conjugué est $p = m\\dot{x}$, donc $\\dot{x}=p/m$. Le hamiltonien s'obtient par transformation de Legendre :</p>
    <div class="formula-box">$$H = p\\dot{x} - L = p\\cdot\\dfrac{p}{m} - \\left(\\dfrac{1}{2}m\\left(\\dfrac{p}{m}\\right)^2 - \\dfrac{1}{2}kx^2\\right) = \\dfrac{p^2}{2m} + \\dfrac{1}{2}kx^2$$</div>
    <p>On reconnaît immédiatement $H = T+V$, l'énergie mécanique totale exprimée en fonction de $(x,p)$. Les équations canoniques donnent :</p>
    <div class="formula-box">$$\\dot{x} = \\dfrac{\\partial H}{\\partial p} = \\dfrac{p}{m} \\qquad \\dot{p} = -\\dfrac{\\partial H}{\\partial x} = -kx$$</div>
    <p>En combinant ces deux équations du premier ordre ($\\ddot{x} = \\dot{p}/m = -kx/m$), on retrouve exactement l'équation de l'oscillateur harmonique obtenue directement par le formalisme lagrangien — une vérification de cohérence rassurante entre les deux formalismes, rigoureusement équivalents.</p>

    <h3>4. Interprétation géométrique : le flot dans l'espace des phases</h3>
    <p>Pour l'oscillateur harmonique, les trajectoires dans le plan de phase $(x,p)$ sont des <strong>ellipses</strong> (de demi-axes fixés par l'énergie totale conservée $H=E$), parcourues à vitesse angulaire constante. Plus généralement, les équations canoniques définissent un <strong>flot</strong> dans l'espace des phases $(q,p)$ à $2n$ dimensions : chaque condition initiale $(q_0,p_0)$ détermine une trajectoire unique et déterministe, sans jamais se croiser (théorème d'unicité des équations différentielles) — une image géométrique puissante de la dynamique, exploitée systématiquement en mécanique statistique (théorème de Liouville, chapitre suivant) et en théorie des systèmes dynamiques.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour une particule chargée dans un champ électromagnétique, le lagrangien s'écrit $L = \\dfrac{1}{2}m\\dot{\\vec{r}}^2 - q\\phi + q\\dot{\\vec{r}}\\cdot\\vec{A}$ (avec $\\phi$ le potentiel scalaire, $\\vec{A}$ le potentiel vecteur). Montrer que le moment conjugué $\\vec{p}$ n'est <strong>pas</strong> simplement $m\\dot{\\vec{r}}$ (l'impulsion cinétique usuelle).</p>
      <p><strong>Solution :</strong> Le moment conjugué se calcule par $\\vec{p} = \\partial L/\\partial \\dot{\\vec{r}} = m\\dot{\\vec{r}} + q\\vec{A}$. Il comporte un terme supplémentaire $q\\vec{A}$, dû au couplage du lagrangien avec le potentiel vecteur.</p>
      <p class="example-answer">Réponse : $\\vec{p} = m\\dot{\\vec{r}} + q\\vec{A}$ — le moment conjugué (« impulsion canonique ») diffère de l'impulsion cinétique $m\\dot{\\vec{r}}$ dès qu'il existe un couplage au potentiel vecteur ; cette distinction est essentielle en mécanique quantique, où c'est le moment canonique qui est quantifié (règle de substitution minimale $\\vec{p} \\to -i\\hbar\\vec\\nabla$).</p>
    </div>
  

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le moment conjugué d'une particule chargée, $\\vec p = m\\dot{\\vec r}+q\\vec A$, dépend du choix de jauge de $\\vec A$ (deux potentiels vecteurs différents peuvent décrire le même champ magnétique physique). L'impulsion cinétique $m\\dot{\\vec r}$, elle, ne dépend d'aucun choix arbitraire. Qu'est-ce que cela révèle sur la nature du moment conjugué : décrit-il quelque chose d'aussi directement « physique » que l'impulsion cinétique ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>L'analogie de Hamilton entre optique et mécanique, évoquée en préambule, n'est pas restée une simple curiosité historique. Elle est aujourd'hui au fondement de la <strong>mécanique quantique</strong> tout entière : l'équation de Hamilton-Jacobi (prochain chapitre) se retrouve comme cas limite de l'équation de Schrödinger lorsque la constante de Planck $\\hbar$ tend vers zéro — exactement comme l'optique géométrique (rayons lumineux) est la limite de l'optique ondulatoire quand la longueur d'onde devient négligeable. Le formalisme hamiltonien reste également la base de la <strong>mécanique céleste numérique</strong> moderne : les intégrateurs dits « symplectiques », utilisés pour simuler le Système solaire sur des millions d'années sans dérive artificielle de l'énergie, exploitent directement la structure des équations canoniques.</p>
    <p><strong>Question ouverte :</strong> le passage de la mécanique classique (hamiltonienne) à la mécanique quantique reste, historiquement et conceptuellement, un processus de « quantification » dont les règles précises (que quantifier, comment, dans quel ordre pour des variables non commutatives) demeurent un sujet de recherche actif, notamment pour les systèmes présentant des contraintes ou des symétries de jauge complexes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Lagrangien L(q,q̇,t) → transformation de Legendre H=Σpq̇−L → expression de q̇ en fonction de p → hamiltonien H(q,p,t) → équations canoniques → trajectoire dans l'espace des phases
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\dot q_i = \\dfrac{\\partial H}{\\partial p_i} \\qquad \\dot p_i = -\\dfrac{\\partial H}{\\partial q_i}$$
      Deux équations d'une symétrie presque parfaite entre position et impulsion — c'est précisément cette symétrie que le prochain chapitre, sur les crochets de Poisson, va rendre totalement explicite.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le hamiltonien H=Σpiq̇i−L s'obtient par transformation de Legendre du lagrangien par rapport aux vitesses</li>
      <li>Les équations canoniques de Hamilton, q̇i=∂H/∂pi et ṗi=−∂H/∂qi, forment 2n équations du premier ordre équivalentes aux n équations du second ordre d'Euler-Lagrange</li>
      <li>Pour l'oscillateur harmonique, H=p²/2m+kx²/2=T+V, et les trajectoires dans l'espace des phases sont des ellipses</li>
      <li>Le moment conjugué ne coïncide pas toujours avec l'impulsion cinétique usuelle mv, notamment en présence d'un potentiel vecteur (particule chargée)</li>
      <li>L'espace des phases (q,p) offre une image géométrique puissante de la dynamique, base de la mécanique statistique et des systèmes dynamiques</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que le moment conjugué est toujours égal à mv, sans vérifier la présence éventuelle d'un couplage (potentiel vecteur)</li>
      <li>Oublier d'exprimer les vitesses en fonction des impulsions avant d'écrire le hamiltonien final H(q,p,t)</li>
      <li>Mélanger le signe des deux équations canoniques : q̇i=+∂H/∂pi mais ṗi=−∂H/∂qi (signes opposés)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Le formalisme hamiltonien produit, pour un système à n degrés de liberté :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea5e1" value="wrong">n équations du second ordre</label>
        <label class="option"><input type="radio" name="mea5e1" value="right">2n équations du premier ordre</label>
        <label class="option"><input type="radio" name="mea5e1" value="wrong">n équations algébriques</label>
        <label class="option"><input type="radio" name="mea5e1" value="wrong">2n équations du second ordre</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea5e1','mea5fb1','Correct — les équations canoniques sont au nombre de 2n (n pour q̇i, n pour ṗi), toutes du premier ordre.','Compte le nombre d\\'équations canoniques : une pour chaque q̇i et une pour chaque ṗi.')">Vérifier</button>
      <div class="feedback" id="mea5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour une particule chargée dans un champ électromagnétique, le moment conjugué p diffère de l'impulsion cinétique mv à cause de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea5e2" value="wrong">La masse de la particule</label>
        <label class="option"><input type="radio" name="mea5e2" value="right">Le couplage au potentiel vecteur A</label>
        <label class="option"><input type="radio" name="mea5e2" value="wrong">La vitesse de la lumière</label>
        <label class="option"><input type="radio" name="mea5e2" value="wrong">Cela n'arrive jamais, p=mv toujours</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea5e2','mea5fb2','Correct — c\\'est le terme qA du lagrangien qui introduit ce terme supplémentaire dans le moment conjugué.','Relis l\\'exemple corrigé sur la particule chargée : d\\'où vient le terme supplémentaire dans p ?')">Vérifier</button>
      <div class="feedback" id="mea5fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'on partait directement du hamiltonien $H(q,p,t)$ sans jamais être passé par le lagrangien : pourrait-on retrouver les équations du mouvement d'Euler-Lagrange, ou l'information contenue dans $H$ est-elle rigoureusement équivalente à celle de $L$ ?</li>
      <li>Pourquoi Hamilton, parti d'un problème d'optique géométrique, a-t-il été capable de deviner une structure aussi profondément adaptée à la mécanique — deux domaines de la physique qui semblent, à première vue, n'avoir aucun rapport ?</li>
      <li>Quelle serait la conséquence, pour la construction du hamiltonien, si le lagrangien ne vérifiait pas la condition de non-dégénérescence évoquée au paragraphe 1 (hessien non inversible) ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W. R. Hamilton, <em>On a General Method in Dynamics</em>, Philosophical Transactions of the Royal Society, 1833 — le mémoire fondateur.</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — chapitre sur le formalisme hamiltonien et l'espace des phases.</li>
      <li>E. Schrödinger, « Quantisierung als Eigenwertproblem », <em>Annalen der Physik</em>, 1926 — où l'analogie optico-mécanique de Hamilton est explicitement revendiquée comme point de départ.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens de voir naître une symétrie entre position et impulsion qui semble presque cosmétique — et qui va pourtant s'avérer être l'une des idées les plus fécondes de toute la physique, jusqu'à inspirer la mécanique quantique elle-même. Le chapitre suivant, sur les crochets de Poisson, va pousser cette symétrie encore plus loin, en donnant à l'espace des phases une structure algébrique à part entière.</p>
  `
};
MECAN_NOVA_KB[meaKey("Formalisme hamiltonien : transformation de Legendre et équations canoniques")] = {
  intro: "Salut, moi c'est Nova ! On passe au formalisme hamiltonien : transformation de Legendre, équations canoniques, espace des phases. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/transformation de legendre|hamiltonien.*d[ée]fini/i, replies:[
      "Le hamiltonien H=Σpiq̇i−L est la transformée de Legendre du lagrangien par rapport aux vitesses, exprimée en fonction de (q,p,t)."
    ]},
    { test:/[ée]quations canoniques|hamilton/i, replies:[
      "Les équations canoniques de Hamilton : q̇i=∂H/∂pi et ṗi=−∂H/∂qi (attention au signe opposé). Ce sont 2n équations du premier ordre, équivalentes aux n équations d'Euler-Lagrange du second ordre."
    ]},
    { test:/moment conjugu[ée]|impulsion canonique/i, replies:[
      "Le moment conjugué p=∂L/∂q̇ ne coïncide pas toujours avec l'impulsion cinétique mv — par exemple pour une particule chargée, p=mv+qA (couplage au potentiel vecteur)."
    ]},
    { test:/espace des phases/i, replies:[
      "L'espace des phases (q,p) offre une représentation géométrique de la dynamique : chaque condition initiale détermine une trajectoire unique, sans croisement — base du théorème de Liouville (chapitre suivant)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : compte le nombre d'équations canoniques (une pour q̇i, une pour ṗi).",
      "Indice niveau 2 : cela fait 2 équations par degré de liberté.",
      "Indice niveau 3 : soit 2n équations du premier ordre au total."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis l'exemple corrigé sur la particule chargée dans un champ électromagnétique.",
      "Indice niveau 2 : le terme supplémentaire vient du couplage dans le lagrangien.",
      "Indice niveau 3 : c'est le terme qA (potentiel vecteur) qui modifie le moment conjugué."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MECAN_CHAPTERS[meaKey("Crochets de Poisson et structure de l'espace des phases")] = {
  objectives: [
    "Définir le crochet de Poisson de deux fonctions de l'espace des phases",
    "Établir les propriétés algébriques fondamentales du crochet de Poisson",
    "Exprimer l'évolution temporelle d'une observable via son crochet avec le hamiltonien",
    "Percevoir l'analogie formelle entre crochets de Poisson et commutateurs quantiques",
    "Retracer comment un outil de calcul en mécanique céleste (Poisson, 1809) est devenu, via l'identité de Jacobi, une structure algébrique fondamentale de la physique"
  ],
  prereqs: ["Formalisme hamiltonien : transformation de Legendre et équations canoniques"],
  bodyHtml: `
    <p>Le crochet de Poisson est l'opération algébrique centrale de la mécanique hamiltonienne : il encode toute la structure dynamique de l'espace des phases en une seule opération, et fournit le pont conceptuel direct vers le formalisme de la mécanique quantique.</p>

    <h3>1. Définition du crochet de Poisson</h3>
    <p>Pour deux fonctions $f(q,p,t)$ et $g(q,p,t)$ de l'espace des phases, le <strong>crochet de Poisson</strong> se définit par :</p>
    <div class="formula-box">$$\\{f,g\\} = \\sum_{i=1}^{n} \\left(\\dfrac{\\partial f}{\\partial q_i}\\dfrac{\\partial g}{\\partial p_i} - \\dfrac{\\partial f}{\\partial p_i}\\dfrac{\\partial g}{\\partial q_i}\\right)$$</div>
    <p>Les crochets fondamentaux entre coordonnées et impulsions canoniques elles-mêmes s'obtiennent immédiatement à partir de cette définition :</p>
    <div class="formula-box">$$\\{q_i,q_j\\} = 0 \\qquad \\{p_i,p_j\\} = 0 \\qquad \\{q_i,p_j\\} = \\delta_{ij}$$</div>

    <h3>2. Propriétés algébriques fondamentales</h3>
    <p>Le crochet de Poisson vérifie une série de propriétés qui en font une <strong>algèbre de Lie</strong> sur l'espace des fonctions de l'espace des phases :</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Relation</th></tr>
      <tr><td>Antisymétrie</td><td>$\\{f,g\\} = -\\{g,f\\}$</td></tr>
      <tr><td>Bilinéarité</td><td>$\\{\\alpha f+\\beta g,h\\} = \\alpha\\{f,h\\}+\\beta\\{g,h\\}$</td></tr>
      <tr><td>Règle de Leibniz</td><td>$\\{fg,h\\} = f\\{g,h\\} + \\{f,h\\}g$</td></tr>
      <tr><td>Identité de Jacobi</td><td>$\\{f,\\{g,h\\}\\} + \\{g,\\{h,f\\}\\} + \\{h,\\{f,g\\}\\} = 0$</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le tableau ci-dessus montre que le crochet de Poisson munit l'espace des fonctions de l'espace des phases d'une structure d'<strong>algèbre de Lie</strong> — la même structure abstraite qu'étudie la théorie des groupes (autre matière de ce niveau) pour les rotations ou les symétries. En quoi l'antisymétrie $\{f,g\}=-\{g,f\}$ rappelle-t-elle une propriété que tu connais déjà du produit vectoriel $\vec u\times\vec v=-\vec v\times\vec u$ ?
    </div>

    <h3>3. Évolution temporelle d'une observable</h3>
    <p>Pour toute fonction $f(q,p,t)$ de l'espace des phases (une « observable » classique), sa dérivée totale par rapport au temps le long d'une trajectoire physique s'écrit, en utilisant les équations canoniques :</p>
    <div class="formula-box">$$\\dfrac{df}{dt} = \\sum_i \\left(\\dfrac{\\partial f}{\\partial q_i}\\dot{q}_i + \\dfrac{\\partial f}{\\partial p_i}\\dot{p}_i\\right) + \\dfrac{\\partial f}{\\partial t} = \\{f,H\\} + \\dfrac{\\partial f}{\\partial t}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Cette relation unifie et généralise toutes les lois de conservation étudiées au chapitre 3 : une observable $f$ <strong>ne dépendant pas explicitement du temps</strong> ($\\partial f/\\partial t=0$) est une <strong>constante du mouvement</strong> si et seulement si $\\{f,H\\}=0$. En particulier, en prenant $f=H$ lui-même : $dH/dt = \\{H,H\\} + \\partial H/\\partial t = \\partial H/\\partial t$ (le crochet d'une fonction avec elle-même étant toujours nul par antisymétrie), retrouvant que l'énergie est conservée si et seulement si $H$ ne dépend pas explicitement du temps.
    </div>

    <h3>4. Vers la mécanique quantique : l'analogie avec les commutateurs</h3>
    <p>Le crochet fondamental $\\{q_i,p_j\\} = \\delta_{ij}$ possède un analogue quantique d'une similarité frappante : le <strong>commutateur</strong> des opérateurs position et impulsion, $[\\hat{q}_i,\\hat{p}_j] = i\\hbar\\,\\delta_{ij}$. Cette correspondance, formalisée historiquement par Dirac (règle de <strong>quantification canonique</strong>), s'énonce de façon générale :</p>
    <div class="formula-box">$$\\{f,g\\}_{\\text{classique}} \\ \\longrightarrow \\ \\dfrac{1}{i\\hbar}[\\hat{f},\\hat{g}]_{\\text{quantique}}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi c'est fondamental</span>
      Cette correspondance formelle n'est pas une simple curiosité mathématique : elle constitue historiquement l'une des voies principales par lesquelles la mécanique quantique a été construite à partir de la mécanique classique (Dirac, 1925). Elle explique aussi pourquoi les <strong>lois de conservation quantiques</strong> suivent exactement la même logique que leur analogue classique : une observable quantique est conservée si et seulement si elle commute avec le hamiltonien, $[\\hat{f},\\hat{H}]=0$ — l'exact pendant de $\\{f,H\\}=0$ vu ci-dessus.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Calculer le crochet de Poisson $\\{L_z, x\\}$ du moment cinétique $L_z = xp_y - yp_x$ avec la coordonnée $x$.</p>
      <p><strong>Solution :</strong> $\\{L_z,x\\} = \\dfrac{\\partial L_z}{\\partial x}\\dfrac{\\partial x}{\\partial p_x} - \\dfrac{\\partial L_z}{\\partial p_x}\\dfrac{\\partial x}{\\partial x} + \\dfrac{\\partial L_z}{\\partial y}\\dfrac{\\partial x}{\\partial p_y} - \\dfrac{\\partial L_z}{\\partial p_y}\\dfrac{\\partial x}{\\partial y}$. Seuls les termes non nuls : $\\partial L_z/\\partial p_x = -y$ (avec $\\partial x/\\partial x=1$), donc $-\\{-y\\}\\times1 = y$ ; les autres termes s'annulent (dérivées croisées de x nulles). On obtient $\\{L_z,x\\} = -y$.</p>
      <p class="example-answer">Réponse : $\\{L_z,x\\}=-y$ — ce résultat traduit, au niveau classique, le fait que le moment cinétique $L_z$ génère les rotations infinitésimales autour de l'axe z, exactement comme son analogue quantique génère les rotations des états quantiques.</p>
    </div>
  

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dans l'exemple ci-dessus, $\{L_z,x\}=-y$ traduit le fait que $L_z$ « génère » les rotations : appliquer ce crochet à $x$ donne (à un facteur près) la façon dont $x$ change sous une rotation infinitésimale. Par analogie, à quelle transformation infinitésimale du système t'attends-tu si tu calcules $\{p_x,x\}$ plutôt que $\{L_z,x\}$ ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La correspondance entre crochets de Poisson et commutateurs, formalisée par Dirac en 1925, n'a cessé d'être approfondie depuis. En 1949, le statisticien José Enrique Moyal propose une reformulation complète et autonome de la mécanique quantique directement sur l'espace des phases classique, en déformant le crochet de Poisson en un objet aujourd'hui appelé « crochet de Moyal » — un programme de recherche, la <strong>quantification par déformation</strong>, encore actif aujourd'hui en physique mathématique. Plus largement, la structure symplectique sous-jacente au crochet de Poisson (déjà pressentie par Lagrange lui-même dès 1808, un an avant Poisson) reste un objet d'étude central en géométrie différentielle moderne et en théorie des systèmes intégrables.</p>
    <p><strong>Question ouverte :</strong> la « quantification canonique » qui associe crochets de Poisson et commutateurs ne fonctionne pas toujours sans ambiguïté pour des systèmes complexes (produits d'observables, systèmes contraints) — le choix précis de l'ordre des opérateurs quantiques associés à un produit classique $qp$ ou $pq$ reste, dans certains cas, un problème non trivial appelé « problème de l'ordre des opérateurs ».</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Fonctions f,g de l'espace des phases → crochet {f,g}=Σ(∂f/∂q·∂g/∂p−∂f/∂p·∂g/∂q) → algèbre de Lie (antisymétrie, Leibniz, Jacobi) → évolution df/dt={f,H}+∂f/∂t → correspondance {,}→(1/iℏ)[,] → mécanique quantique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\dfrac{df}{dt} = \{f,H\} + \dfrac{\partial f}{\partial t}$$
      Une seule formule contient à la fois toutes les lois de conservation du chapitre 3 (cas $\partial f/\partial t=0$) et le pont direct vers l'équation d'évolution de la mécanique quantique (équation de Heisenberg).
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le crochet de Poisson {f,g} = Σ(∂f/∂qi·∂g/∂pi − ∂f/∂pi·∂g/∂qi) structure l'espace des phases en algèbre de Lie</li>
      <li>Crochets fondamentaux : {qi,qj}=0, {pi,pj}=0, {qi,pj}=δij</li>
      <li>L'évolution temporelle d'une observable s'écrit df/dt = {f,H} + ∂f/∂t : f est conservée si {f,H}=0 et ∂f/∂t=0</li>
      <li>La correspondance {f,g} → (1/iℏ)[f̂,ĝ] relie mécanique classique et quantique (quantification canonique de Dirac)</li>
      <li>Une observable quantique est conservée si et seulement si elle commute avec le hamiltonien, exact pendant du résultat classique</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier le signe moins dans la définition du crochet de Poisson (ce n'est pas une simple somme de produits de dérivées)</li>
      <li>Croire que {f,g}=0 implique nécessairement f ou g constante — cela signifie seulement que ces deux observables sont compatibles/indépendantes en un sens précis</li>
      <li>Confondre l'ordre des facteurs dans le crochet : {f,g}=−{g,f}, l'ordre compte</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est le crochet de Poisson fondamental {qi,pj} ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea6e1" value="wrong">Toujours nul</label>
        <label class="option"><input type="radio" name="mea6e1" value="right">δij (le symbole de Kronecker)</label>
        <label class="option"><input type="radio" name="mea6e1" value="wrong">qi·pj</label>
        <label class="option"><input type="radio" name="mea6e1" value="wrong">Toujours égal à 1, quels que soient i et j</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea6e1','mea6fb1','Correct — {qi,pj}=δij : nul si i≠j, égal à 1 si i=j.','Relis les crochets fondamentaux donnés en début de chapitre.')">Vérifier</button>
      <div class="feedback" id="mea6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Une observable f, ne dépendant pas explicitement du temps, est une constante du mouvement si et seulement si :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea6e2" value="wrong">{f,f}=0 (toujours vrai, donc sans intérêt)</label>
        <label class="option"><input type="radio" name="mea6e2" value="right">{f,H}=0</label>
        <label class="option"><input type="radio" name="mea6e2" value="wrong">f=0 identiquement</label>
        <label class="option"><input type="radio" name="mea6e2" value="wrong">H=0 identiquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea6e2','mea6fb2','Correct — c\\'est exactement la condition df/dt=0 quand ∂f/∂t=0, via df/dt={f,H}+∂f/∂t.','Relis la formule df/dt={f,H}+∂f/∂t : quelle condition annule df/dt si f ne dépend pas explicitement du temps ?')">Vérifier</button>
      <div class="feedback" id="mea6fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si deux observables f et g vérifiaient {f,g}≠0 : que peux-tu en déduire sur la possibilité de les rendre simultanément constantes du mouvement (toutes deux conservées) pour un hamiltonien H quelconque ?</li>
      <li>Pourquoi Poisson, parti d'un problème très concret de mécanique céleste, n'a-t-il pas lui-même perçu la portée algébrique générale de son crochet — alors que c'est précisément cette généralité qui en fait aujourd'hui l'outil fondamental de ce chapitre ?</li>
      <li>Quelle serait la conséquence, pour la correspondance {,}→(1/iℏ)[,], si l'on essayait de l'appliquer telle quelle à un produit de trois observables ou plus (au lieu de deux) ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>S. D. Poisson, « Sur la variation des constantes arbitraires dans les questions de mécanique », <em>Journal de l'École polytechnique</em>, 1809 — le mémoire fondateur, appliqué à la mécanique céleste.</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — chapitre sur les crochets de Poisson et les transformations canoniques.</li>
      <li>P. A. M. Dirac, <em>The Principles of Quantum Mechanics</em>, Oxford University Press, 1930 — pour la correspondance crochets/commutateurs évoquée dans ce chapitre.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Ce que Poisson prenait pour un simple outil de calcul astronomique s'est révélé, deux siècles plus tard, être l'un des ponts les plus directs entre physique classique et physique quantique — une leçon d'humilité pour quiconque pense pouvoir deviner à l'avance la portée réelle d'un résultat mathématique. Le chapitre suivant va pousser cette logique un cran plus loin, avec les transformations canoniques et l'équation de Hamilton-Jacobi, qui donneront tout son sens à cette « fonction caractéristique » de Hamilton évoquée dès le chapitre précédent.</p>
  `
};
MECAN_NOVA_KB[meaKey("Crochets de Poisson et structure de l'espace des phases")] = {
  intro: "Salut, moi c'est Nova ! On étudie les crochets de Poisson et leur lien avec les commutateurs quantiques. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/crochet de poisson/i, replies:[
      "Le crochet de Poisson {f,g}=Σ(∂f/∂qi·∂g/∂pi−∂f/∂pi·∂g/∂qi) structure l'espace des phases. Crochets fondamentaux : {qi,pj}=δij, {qi,qj}={pi,pj}=0."
    ]},
    { test:/[ée]volution temporelle|df.dt/i, replies:[
      "L'évolution temporelle d'une observable : df/dt={f,H}+∂f/∂t. Si f ne dépend pas explicitement du temps, elle est conservée si et seulement si {f,H}=0."
    ]},
    { test:/commutateur|quantification canonique|dirac/i, replies:[
      "La correspondance {f,g}→(1/iℏ)[f̂,ĝ] (quantification canonique de Dirac, 1925) relie crochets de Poisson classiques et commutateurs quantiques — une des voies historiques de construction de la mécanique quantique."
    ]},
    { test:/identit[ée] de jacobi|antisym[ée]trie/i, replies:[
      "Le crochet de Poisson vérifie antisymétrie {f,g}=−{g,f}, bilinéarité, règle de Leibniz, et l'identité de Jacobi — ces propriétés en font une algèbre de Lie."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis les crochets fondamentaux donnés dans le chapitre.",
      "Indice niveau 2 : ce n'est ni toujours nul, ni toujours égal à 1.",
      "Indice niveau 3 : c'est δij, le symbole de Kronecker."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique la formule df/dt={f,H}+∂f/∂t.",
      "Indice niveau 2 : si f ne dépend pas explicitement du temps, ∂f/∂t=0.",
      "Indice niveau 3 : donc df/dt=0 si et seulement si {f,H}=0."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
MECAN_CHAPTERS[meaKey("Transformations canoniques et équation de Hamilton-Jacobi")] = {
  objectives: [
    "Définir une transformation canonique et la condition de préservation de la structure symplectique",
    "Utiliser les fonctions génératrices pour construire des transformations canoniques",
    "Établir l'équation de Hamilton-Jacobi et comprendre son principe de résolution",
    "Percevoir le rôle de la fonction principale de Hamilton et son lien avec l'action classique",
    "Distinguer la contribution théorique de Hamilton (1834-35) de la simplification décisive de Jacobi (1837) qui a rendu la méthode réellement exploitable"
  ],
  prereqs: ["Crochets de Poisson et structure de l'espace des phases"],
  bodyHtml: `
    <p>Ce chapitre présente l'outil le plus sophistiqué du formalisme hamiltonien : les <strong>transformations canoniques</strong>, qui permettent de changer de variables dans l'espace des phases tout en préservant sa structure fondamentale, jusqu'à aboutir, dans le cas idéal, à une résolution complète du problème dynamique via l'<strong>équation de Hamilton-Jacobi</strong>.</p>

    <h3>1. Qu'est-ce qu'une transformation canonique ?</h3>
    <p>Une transformation $(q,p) \\to (Q,P)$ est dite <strong>canonique</strong> si elle préserve la forme des équations de Hamilton : il doit exister un nouveau hamiltonien $K(Q,P,t)$ tel que les nouvelles variables obéissent également à des équations canoniques, $\\dot{Q}_i = \\partial K/\\partial P_i$ et $\\dot{P}_i = -\\partial K/\\partial Q_i$. De façon équivalente, une transformation est canonique si et seulement si elle préserve tous les crochets de Poisson fondamentaux (chapitre 6) : $\\{Q_i,P_j\\} = \\delta_{ij}$, $\\{Q_i,Q_j\\}=\\{P_i,P_j\\}=0$.</p>

    <h3>2. Les fonctions génératrices</h3>
    <p>La façon la plus systématique de construire une transformation canonique consiste à utiliser une <strong>fonction génératrice</strong>. Par exemple, une fonction génératrice de type $F_2(q,P,t)$ engendre la transformation via :</p>
    <div class="formula-box">$$p_i = \\dfrac{\\partial F_2}{\\partial q_i} \\qquad Q_i = \\dfrac{\\partial F_2}{\\partial P_i} \\qquad K = H + \\dfrac{\\partial F_2}{\\partial t}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Il existe quatre types standards de fonctions génératrices, selon les couples de variables (anciennes/nouvelles) dont elles dépendent explicitement ($F_1(q,Q,t)$, $F_2(q,P,t)$, $F_3(p,Q,t)$, $F_4(p,P,t)$), reliés entre eux par des transformations de Legendre successives — exactement comme le passage du lagrangien au hamiltonien au chapitre 5. Le choix du type approprié dépend de la nature du problème à résoudre.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une transformation canonique préserve la structure des équations de Hamilton, mais elle peut radicalement changer la <em>forme</em> du hamiltonien lui-même — au point, comme tu vas le voir, de le rendre identiquement nul. Si $K=0$ décrit pourtant le même système physique que $H$ initial, qu'est-ce que cela te suggère sur le statut du hamiltonien : est-ce une grandeur physique intrinsèque, ou dépend-elle fondamentalement du choix de variables ?
    </div>

    <h3>3. L'idée centrale de Hamilton-Jacobi</h3>
    <p>L'idée remarquable de la méthode de Hamilton-Jacobi consiste à chercher une transformation canonique <strong>particulière</strong>, telle que le <strong>nouveau hamiltonien $K$ soit identiquement nul</strong>. Dans ce cas, les nouvelles équations canoniques deviennent triviales : $\\dot{Q}_i = 0$ et $\\dot{P}_i = 0$ — c'est-à-dire que <strong>toutes les nouvelles variables sont des constantes du mouvement</strong> ! Tout le problème dynamique se réduit alors à trouver la fonction génératrice $S(q,P,t)$ (appelée <strong>fonction principale de Hamilton</strong>) qui réalise cette transformation.</p>

    <h3>4. L'équation de Hamilton-Jacobi</h3>
    <p>En imposant $K=0$ dans la relation $K = H + \\partial F_2/\\partial t$ (avec $F_2 = S$, et $p_i = \\partial S/\\partial q_i$), on obtient l'<strong>équation de Hamilton-Jacobi</strong>, une équation aux dérivées partielles du premier ordre pour $S(q,t)$ :</p>
    <div class="formula-box">$$H\\!\\left(q,\\dfrac{\\partial S}{\\partial q},t\\right) + \\dfrac{\\partial S}{\\partial t} = 0$$</div>
    <p>Résoudre cette EDP (souvent par séparation des variables, technique du cours de Méthodes mathématiques pour la physique) fournit une <strong>solution complète</strong> $S(q,\\alpha,t)$ dépendant de $n$ constantes d'intégration $\\alpha_i$ (identifiées aux nouvelles impulsions constantes $P_i$), à partir de laquelle on reconstruit entièrement la trajectoire $q(t)$ par différentiation, sans jamais avoir à intégrer directement les équations du mouvement.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — S est l'action</span>
      Un résultat remarquable relie la fonction principale de Hamilton à l'action classique introduite au chapitre 1 : le long d'une trajectoire physique, $S(q,t) = \\displaystyle\\int L\\,dt$, c'est-à-dire que <strong>la fonction principale de Hamilton EST l'action</strong>, considérée comme fonction de son point d'arrivée. Cette identification profonde établit le pont conceptuel direct vers la mécanique <strong>ondulatoire</strong> : la limite classique de l'équation de Schrödinger de la mécanique quantique redonne précisément l'équation de Hamilton-Jacobi, un résultat fondamental établi historiquement par Schrödinger lui-même en s'inspirant explicitement de cette analogie.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour une particule libre 1D, $H = p^2/2m$. Écrire l'équation de Hamilton-Jacobi et vérifier que $S(x,t) = \\alpha x - \\dfrac{\\alpha^2}{2m}t$ (avec $\\alpha$ une constante) en est bien une solution.</p>
      <p><strong>Solution :</strong> L'équation de Hamilton-Jacobi s'écrit $\\dfrac{1}{2m}\\left(\\dfrac{\\partial S}{\\partial x}\\right)^2 + \\dfrac{\\partial S}{\\partial t}=0$. Avec $S=\\alpha x - \\dfrac{\\alpha^2}{2m}t$ : $\\partial S/\\partial x = \\alpha$, donc $\\dfrac{1}{2m}\\alpha^2 + \\left(-\\dfrac{\\alpha^2}{2m}\\right) = 0$ ✓.</p>
      <p class="example-answer">Réponse : l'équation est bien vérifiée identiquement. On reconnaît $\\alpha = p$ (l'impulsion constante de la particule libre) : $S = px - \\dfrac{p^2}{2m}t$, cohérent avec l'action d'une particule libre de vitesse constante $v=p/m$.</p>
    </div>
  

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dans cet exemple, la constante $\alpha$ s'identifie à l'impulsion $p$ de la particule libre — une quantité déjà conservée pour une raison plus simple (coordonnée cyclique, chapitre 3). Pour un système où <em>aucune</em> coordonnée n'est cyclique dans les variables de départ, penses-tu que la méthode de Hamilton-Jacobi peut malgré tout fournir des constantes du mouvement qu'on n'aurait pas trouvées autrement ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La méthode de Hamilton-Jacobi, via la séparation des variables, permet de résoudre exactement certains problèmes réputés difficiles — c'est précisément l'outil qui va permettre, au chapitre suivant, de résoudre complètement le problème à force centrale et le mouvement képlérien. Plus généralement, la distinction entre systèmes « intégrables » (où une intégrale complète existe, comme ici) et systèmes chaotiques (où elle n'existe pas) est aujourd'hui un axe de recherche central de la théorie des systèmes dynamiques : le théorème de Kolmogorov-Arnold-Moser (KAM, années 1950-60) décrit précisément ce qui arrive à un système intégrable lorsqu'on le perturbe légèrement — reste-t-il proche de l'intégrabilité, ou bascule-t-il vers le chaos ?</p>
    <p><strong>Application actuelle :</strong> le formalisme de Hamilton-Jacobi reste directement utilisé en mécanique céleste numérique moderne, notamment pour calculer avec précision les trajectoires de sondes spatiales exploitant l'assistance gravitationnelle de plusieurs corps.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Transformation canonique (q,p)→(Q,P) préservant les crochets → fonction génératrice S(q,P,t) → choix K=0 → équation de Hamilton-Jacobi H(q,∂S/∂q,t)+∂S/∂t=0 → intégrale complète (Jacobi, 1837) → trajectoire q(t) par différentiation
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$H\!\left(q,\dfrac{\partial S}{\partial q},t\right) + \dfrac{\partial S}{\partial t} = 0$$
      La théorie de Hamilton, rendue exploitable par la simplification de Jacobi : résoudre cette unique équation aux dérivées partielles équivaut à résoudre tout le problème dynamique.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une transformation canonique préserve la structure des équations de Hamilton, ce qui équivaut à préserver les crochets de Poisson fondamentaux</li>
      <li>Les fonctions génératrices (quatre types standards) permettent de construire systématiquement des transformations canoniques</li>
      <li>La méthode de Hamilton-Jacobi cherche une transformation rendant K=0, ce qui rend toutes les nouvelles variables constantes</li>
      <li>L'équation de Hamilton-Jacobi H(q,∂S/∂q,t)+∂S/∂t=0 permet, une fois résolue, de reconstruire la trajectoire sans intégrer directement les équations du mouvement</li>
      <li>La fonction principale de Hamilton S coïncide avec l'action classique, établissant un pont direct vers l'équation de Schrödinger (limite classique de la mécanique ondulatoire)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'une transformation quelconque de (q,p) vers (Q,P) est automatiquement canonique — il faut vérifier la préservation des crochets de Poisson</li>
      <li>Confondre le hamiltonien H(q,p,t) et la fonction principale de Hamilton S(q,t), qui jouent des rôles très différents</li>
      <li>Oublier que la méthode de Hamilton-Jacobi vise spécifiquement K=0, pas une simplification quelconque du hamiltonien</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Qu'est-ce qui caractérise précisément une transformation canonique ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea7e1" value="wrong">Elle conserve toujours l'énergie totale du système</label>
        <label class="option"><input type="radio" name="mea7e1" value="right">Elle préserve la forme des équations canoniques (ou, de façon équivalente, les crochets de Poisson fondamentaux)</label>
        <label class="option"><input type="radio" name="mea7e1" value="wrong">Elle transforme toujours q en p et p en q</label>
        <label class="option"><input type="radio" name="mea7e1" value="wrong">Elle s'applique uniquement aux systèmes à un seul degré de liberté</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea7e1','mea7fb1','Correct — c\\'est la préservation de la structure des équations de Hamilton (ou des crochets de Poisson) qui définit une transformation canonique.','Relis la définition d\\'une transformation canonique en début de chapitre.')">Vérifier</button>
      <div class="feedback" id="mea7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">La méthode de Hamilton-Jacobi cherche une transformation canonique telle que :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea7e2" value="wrong">Le nouveau hamiltonien K soit maximal</label>
        <label class="option"><input type="radio" name="mea7e2" value="right">Le nouveau hamiltonien K soit identiquement nul</label>
        <label class="option"><input type="radio" name="mea7e2" value="wrong">Les nouvelles coordonnées Q soient toutes nulles</label>
        <label class="option"><input type="radio" name="mea7e2" value="wrong">L'énergie totale double</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea7e2','mea7fb2','Correct — K=0 rend Q̇i=0 et Ṗi=0 : toutes les nouvelles variables deviennent des constantes du mouvement.','Relis la section « L\\'idée centrale de Hamilton-Jacobi ».')">Vérifier</button>
      <div class="feedback" id="mea7fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'équation de Hamilton-Jacobi ne se séparait pas en variables indépendantes pour un système donné : la méthode reste-t-elle applicable en pratique, ou perd-elle l'essentiel de son intérêt calculatoire ?</li>
      <li>Pourquoi a-t-il fallu attendre 1837, trois ans après la publication de Hamilton, pour que Jacobi révèle une simplification qui semble a posteriori presque évidente une fois énoncée ?</li>
      <li>Quelle serait la conséquence, pour la fonction principale de Hamilton $S$, si l'on changeait le point de départ choisi pour calculer l'action $\int L\,dt$ le long de la trajectoire ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>C. G. J. Jacobi, <em>Vorlesungen über Dynamik</em>, Berlin, 1842-1843 (publié à titre posthume) — l'exposé le plus complet de sa méthode de 1837.</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — chapitre sur les transformations canoniques et Hamilton-Jacobi.</li>
      <li>V. I. Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2ᵉ éd., Springer, 1989 — pour l'ouverture vers les systèmes intégrables et le théorème KAM évoqués en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes maintenant de l'outil le plus puissant de toute la mécanique analytique — à tel point qu'il te permettra, dans le tout dernier chapitre, de résoudre entièrement le mouvement des planètes autour du Soleil. Comme souvent en physique, l'idée brillante de Hamilton n'a trouvé sa pleine puissance que grâce à la simplification décisive d'un second mathématicien : une collaboration à retardement de trois ans, mais qui a changé la façon de résoudre la mécanique pour les deux siècles suivants.</p>
  `
};
MECAN_NOVA_KB[meaKey("Transformations canoniques et équation de Hamilton-Jacobi")] = {
  intro: "Salut, moi c'est Nova ! On étudie les transformations canoniques et l'équation de Hamilton-Jacobi. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/transformation canonique/i, replies:[
      "Une transformation canonique préserve la forme des équations de Hamilton — de façon équivalente, elle préserve les crochets de Poisson fondamentaux {Qi,Pj}=δij."
    ]},
    { test:/fonction g[ée]n[ée]ratrice/i, replies:[
      "Les fonctions génératrices (4 types standards F1 à F4) permettent de construire systématiquement des transformations canoniques, reliées par des transformations de Legendre successives."
    ]},
    { test:/hamilton.jacobi/i, replies:[
      "La méthode de Hamilton-Jacobi cherche une transformation canonique rendant K=0, ce qui rend toutes les nouvelles variables constantes. L'équation H(q,∂S/∂q,t)+∂S/∂t=0 permet alors de reconstruire la trajectoire."
    ]},
    { test:/fonction principale de hamilton|s\\(q,t\\)|action.*hamilton.jacobi/i, replies:[
      "La fonction principale de Hamilton S coïncide avec l'action classique le long d'une trajectoire physique — ce qui établit un pont direct vers l'équation de Schrödinger en mécanique quantique."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition précise d'une transformation canonique.",
      "Indice niveau 2 : ce n'est pas une simple conservation de l'énergie.",
      "Indice niveau 3 : c'est la préservation de la structure des équations canoniques (ou des crochets de Poisson)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis l'idée centrale de la méthode de Hamilton-Jacobi.",
      "Indice niveau 2 : l'objectif est de simplifier au maximum les nouvelles équations canoniques.",
      "Indice niveau 3 : on cherche K=0, ce qui rend toutes les nouvelles variables constantes."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
MECAN_CHAPTERS[meaKey("Problème à force centrale et mouvement képlérien")] = {
  objectives: [
    "Réduire le problème à deux corps à un problème à un corps par la masse réduite",
    "Établir la conservation du moment cinétique et la loi des aires pour une force centrale",
    "Construire le potentiel effectif et discuter qualitativement la nature des trajectoires",
    "Retrouver les trois lois de Kepler à partir du formalisme lagrangien",
    "Apprécier, à travers l'anecdote des 8 minutes d'arc de Kepler (1609), l'écart entre la découverte empirique laborieuse d'une loi physique et sa redérivation systématique par un formalisme mathématique abouti"
  ],
  prereqs: ["Symétries et lois de conservation : théorème de Noether"],
  bodyHtml: `
    <p>Pendant près de vingt ans, l'astronome allemand Johannes Kepler travaille sur les observations d'une précision inégalée que lui a léguées Tycho Brahe, en particulier celles de la planète Mars. Kepler, acquis à l'idée copernicienne d'orbites circulaires, s'obstine d'abord à ajuster un cercle aux données — sans succès : un écart résiduel de seulement <strong>8 minutes d'arc</strong> (moins d'un tiers du diamètre apparent de la Lune) persiste obstinément. Plutôt que d'ignorer ce désaccord infime, jugeant la précision de Tycho Brahe trop grande pour être négligée, Kepler abandonne le dogme du cercle parfait, vieux de deux millénaires, et découvre en 1609 que Mars décrit en réalité une <strong>ellipse</strong>. Ce chapitre, qui clôt la matière, retrouve par le calcul pur — sans la moindre observation astronomique — exactement ce que Kepler avait dû arracher, minute d'arc par minute d'arc, à des années de données.</p>
    <p>Ce dernier chapitre applique ainsi l'ensemble des outils du cours à l'un des problèmes les plus emblématiques de toute la physique : le mouvement de deux corps en interaction gravitationnelle, dont la résolution complète par Newton (via une approche géométrique) puis par le formalisme lagrangien constitue un cas d'école incontournable.</p>

    <h3>1. Réduction du problème à deux corps</h3>
    <p>Pour deux masses $m_1$, $m_2$ en interaction via un potentiel $V(|\\vec{r}_1-\\vec{r}_2|)$ ne dépendant que de leur distance relative, on introduit le <strong>centre de masse</strong> $\\vec{R} = (m_1\\vec{r}_1+m_2\\vec{r}_2)/(m_1+m_2)$ et la <strong>coordonnée relative</strong> $\\vec{r} = \\vec{r}_1-\\vec{r}_2$. Le lagrangien se sépare exactement en deux termes indépendants :</p>
    <div class="formula-box">$$L = \\underbrace{\\dfrac{1}{2}M\\dot{\\vec{R}}^2}_{\\text{mouvement libre du CM}} + \\underbrace{\\dfrac{1}{2}\\mu\\dot{\\vec{r}}^2 - V(r)}_{\\text{mouvement relatif}}, \\qquad M=m_1+m_2, \\quad \\mu = \\dfrac{m_1 m_2}{m_1+m_2}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le centre de masse se déplace en mouvement rectiligne uniforme (coordonnée cyclique dans $L$, chapitre 3), et le problème à deux corps se réduit exactement à un problème à <strong>un seul corps fictif</strong> de <strong>masse réduite</strong> $\\mu = m_1m_2/(m_1+m_2)$, évoluant dans le potentiel $V(r)$ autour d'un centre fixe. Cette réduction, purement cinématique, s'applique à <strong>toute</strong> force centrale, pas seulement à la gravitation.
    </div>

    <h3>2. Conservation du moment cinétique et loi des aires</h3>
    <p>Comme établi au chapitre 3 (exemple corrigé), l'angle $\\theta$ (en coordonnées polaires planes, le mouvement restant nécessairement dans un plan fixe car le moment cinétique $\\vec{L}=\\mu\\vec{r}\\times\\dot{\\vec{r}}$ est conservé en direction) est une coordonnée cyclique, donnant :</p>
    <div class="formula-box">$$L = \\mu r^2\\dot\\theta = \\text{constante}$$</div>
    <p>Cette conservation est exactement la <strong>deuxième loi de Kepler</strong> (loi des aires) : le rayon vecteur balaie des aires égales en des temps égaux, car l'aire balayée par unité de temps est $dA/dt = \\dfrac{1}{2}r^2\\dot\\theta = L/(2\\mu)$, une constante.</p>

    <h3>3. Le potentiel effectif</h3>
    <p>En utilisant la conservation de $L$ pour éliminer $\\dot\\theta = L/(\\mu r^2)$ de l'expression de l'énergie totale conservée $E = \\dfrac{1}{2}\\mu(\\dot{r}^2+r^2\\dot\\theta^2) + V(r)$, on obtient un problème radial effectif à <strong>une seule dimension</strong> :</p>
    <div class="formula-box">$$E = \\dfrac{1}{2}\\mu\\dot{r}^2 + V_{\\text{eff}}(r), \\qquad V_{\\text{eff}}(r) = V(r) + \\dfrac{L^2}{2\\mu r^2}$$</div>
    <p>Le terme supplémentaire $L^2/(2\\mu r^2)$, appelé <strong>barrière centrifuge</strong>, encode l'effet dynamique du moment cinétique conservé sous la forme d'un potentiel répulsif fictif, qui empêche le corps de s'approcher indéfiniment du centre (sauf si $L=0$).</p>

    <table class="mini-table">
      <tr><th>Relation entre E et le minimum de V_eff</th><th>Type de trajectoire (potentiel gravitationnel)</th></tr>
      <tr><td>$E = V_{\\text{eff,min}}$</td><td>Cercle</td></tr>
      <tr><td>$V_{\\text{eff,min}} < E < 0$</td><td>Ellipse</td></tr>
      <tr><td>$E = 0$</td><td>Parabole</td></tr>
      <tr><td>$E > 0$</td><td>Hyperbole</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Kepler avait initialement pour hypothèse de travail des orbites <em>circulaires</em>, et c'est un écart de seulement 8 minutes d'arc qui l'a mené à l'ellipse. Sachant que le tableau ci-dessus prévoit une trajectoire circulaire uniquement pour la valeur très particulière $E=V_{\text{eff,min}}$, qu'est-ce que cela te suggère sur la « probabilité » qu'une orbite planétaire réelle, issue de conditions initiales quelconques, soit exactement circulaire plutôt qu'elliptique ?
    </div>

    <h3>4. Les trois lois de Kepler</h3>
    <p>Pour le potentiel gravitationnel spécifique $V(r) = -Gm_1m_2/r$, la résolution complète de l'équation radiale (par changement de variable $u=1/r$, technique classique qui linéarise l'équation différentielle) redonne les trois lois empiriques découvertes par Kepler dès 1609-1619 :</p>
    <table class="mini-table">
      <tr><th>Loi de Kepler</th><th>Énoncé</th><th>Origine dans le formalisme</th></tr>
      <tr><td>Première loi</td><td>Les planètes décrivent des ellipses dont le Soleil occupe un foyer</td><td>Résolution explicite de l'équation radiale pour $E<0$</td></tr>
      <tr><td>Deuxième loi</td><td>Le rayon vecteur balaie des aires égales en temps égaux</td><td>Conservation du moment cinétique (coordonnée cyclique θ)</td></tr>
      <tr><td>Troisième loi</td><td>$T^2 \\propto a^3$ (carré de la période proportionnel au cube du demi-grand axe)</td><td>Conséquence géométrique de la première et de la deuxième loi</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi la barrière centrifuge $L^2/(2\\mu r^2)$ empêche-t-elle systématiquement une orbite de moment cinétique $L\\ne0$ de s'écraser sur le centre attracteur, même pour un potentiel gravitationnel très fortement attractif à courte distance ?</p>
      <p><strong>Solution :</strong> Quand $r\\to0$, le terme $L^2/(2\\mu r^2)$ diverge vers $+\\infty$ bien plus rapidement (en $1/r^2$) que le potentiel gravitationnel $-Gm_1m_2/r$ ne diverge vers $-\\infty$ (en $1/r$) : le potentiel effectif $V_{\\text{eff}}(r)$ diverge donc nécessairement vers $+\\infty$ quand $r\\to0$, créant une barrière énergétique infranchissable pour toute énergie totale $E$ finie.</p>
      <p class="example-answer">Réponse : la divergence en $1/r^2$ de la barrière centrifuge l'emporte toujours sur la divergence en $1/r$ du potentiel gravitationnel attractif, garantissant qu'un corps de moment cinétique non nul ne peut jamais atteindre $r=0$.</p>
    </div>
  

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La troisième loi de Kepler, $T^2\propto a^3$, a été découverte empiriquement en 1619 en comparant les données de plusieurs planètes entre elles — bien avant que Newton (1687) n'en propose une justification théorique à partir de la loi de gravitation universelle. Ce chapitre la retrouve, elle aussi, sans jamais invoquer explicitement Newton. Qu'est-ce que cela révèle sur le statut du formalisme lagrangien par rapport à la formulation newtonienne originale : les deux approches contiennent-elles la même physique ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Le problème à deux corps traité dans ce chapitre est intégrable — il admet une solution analytique complète. Dès qu'on ajoute un troisième corps (Soleil, Terre, Lune, par exemple), le problème cesse en général d'être intégrable : c'est le fameux <strong>problème à trois corps</strong>, dont Henri Poincaré démontre en 1889 qu'il peut donner lieu à un comportement chaotique, imprévisible à long terme malgré des lois déterministes parfaitement connues — une découverte fondatrice de la théorie moderne du chaos. Aujourd'hui, la recherche de <strong>exoplanètes</strong> repose directement sur les outils de ce chapitre : c'est en mesurant les infimes oscillations képlériennes d'une étoile autour du centre de masse commun avec sa planète (la réduction à deux corps de ce chapitre, appliquée à l'envers) que l'on détecte des planètes trop lointaines pour être vues directement.</p>
    <p><strong>Question ouverte :</strong> pour un système de $N>2$ corps sans solution analytique générale, quelle est la meilleure stratégie — intégration numérique directe, développement perturbatif autour d'une solution à deux corps, ou méthodes statistiques — dépend fortement du système considéré et reste un domaine de recherche actif en mécanique céleste.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Deux corps m1,m2 → réduction au CM + masse réduite μ → coordonnée θ cyclique → conservation de L (loi des aires) → potentiel effectif V_eff=V+L²/2μr² → équation radiale 1D → trois lois de Kepler retrouvées
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$V_{\text{eff}}(r) = V(r) + \dfrac{L^2}{2\mu r^2}$$
      Toute la richesse du mouvement képlérien — cercle, ellipse, parabole, hyperbole — se lit directement sur la forme de cette unique fonction effective à une variable.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le problème à deux corps se réduit à un problème à un corps de masse réduite μ=m1m2/(m1+m2), le centre de masse se déplaçant librement</li>
      <li>La conservation du moment cinétique L=μr²θ̇ (coordonnée cyclique θ) est exactement la deuxième loi de Kepler (loi des aires)</li>
      <li>Le potentiel effectif Veff(r)=V(r)+L²/(2μr²) réduit le problème à un mouvement radial 1D, avec une barrière centrifuge répulsive</li>
      <li>La nature de la trajectoire (cercle, ellipse, parabole, hyperbole) dépend du signe de E par rapport au minimum de Veff</li>
      <li>Les trois lois de Kepler se retrouvent systématiquement à partir du formalisme lagrangien appliqué au potentiel gravitationnel −Gm1m2/r</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier que la réduction à un corps de masse μ s'applique à toute force centrale, pas seulement à la gravitation</li>
      <li>Confondre le potentiel réel V(r) et le potentiel effectif Veff(r), qui inclut la barrière centrifuge</li>
      <li>Croire que la loi des aires (deuxième loi de Kepler) est spécifique à la gravitation — elle découle en réalité de la seule conservation du moment cinétique, valable pour toute force centrale</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La loi des aires (deuxième loi de Kepler) découle directement de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea8e1" value="wrong">La conservation de l'énergie totale</label>
        <label class="option"><input type="radio" name="mea8e1" value="right">La conservation du moment cinétique</label>
        <label class="option"><input type="radio" name="mea8e1" value="wrong">La troisième loi de Kepler</label>
        <label class="option"><input type="radio" name="mea8e1" value="wrong">La forme spécifique du potentiel gravitationnel en 1/r</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea8e1','mea8fb1','Correct — la loi des aires découle de la seule conservation du moment cinétique L=μr²θ̇, valable pour toute force centrale, pas seulement gravitationnelle.','Relis la section sur la conservation du moment cinétique et son lien avec la deuxième loi de Kepler.')">Vérifier</button>
      <div class="feedback" id="mea8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour un potentiel gravitationnel, quelle relation entre E et Veff,min correspond à une trajectoire elliptique ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mea8e2" value="wrong">E = Veff,min exactement</label>
        <label class="option"><input type="radio" name="mea8e2" value="right">Veff,min &lt; E &lt; 0</label>
        <label class="option"><input type="radio" name="mea8e2" value="wrong">E = 0 exactement</label>
        <label class="option"><input type="radio" name="mea8e2" value="wrong">E &gt; 0</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mea8e2','mea8fb2','Correct — Veff,min&lt;E&lt;0 correspond à une orbite liée mais non circulaire : une ellipse.','Relis le tableau des types de trajectoires selon la valeur de E.')">Vérifier</button>
      <div class="feedback" id="mea8fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si le potentiel d'interaction n'était pas exactement en $1/r$ (gravitation newtonienne pure), mais comportait une petite correction supplémentaire : les orbites resteraient-elles des ellipses fermées, ou l'ellipse elle-même se mettrait-elle à précesser lentement ?</li>
      <li>Pourquoi Kepler, convaincu au départ par l'idéal esthétique du cercle parfait hérité de l'Antiquité, a-t-il malgré tout choisi de faire confiance à un écart de seulement 8 minutes d'arc plutôt qu'à ses propres convictions ?</li>
      <li>Quelle serait la conséquence, pour la réduction à la masse réduite $\mu$, si les deux masses $m_1$ et $m_2$ étaient très différentes l'une de l'autre (par exemple le Soleil et un astéroïde) ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>J. Kepler, <em>Astronomia nova</em>, Heidelberg, 1609 — l'ouvrage où sont publiées les deux premières lois, issu de l'analyse des données de Tycho Brahe.</li>
      <li>H. Goldstein, C. Poole, J. Safko, <em>Classical Mechanics</em>, 3ᵉ éd., Pearson, 2002 — chapitre sur le problème à force centrale et le mouvement képlérien.</li>
      <li>H. Poincaré, <em>Les méthodes nouvelles de la mécanique céleste</em>, Gauthier-Villars, 1892-1899 — pour le problème à trois corps et le chaos évoqués en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;"><strong>Tu achèves ici la matière Mécanique analytique.</strong> Du principe de moindre action de Lagrange (chapitre 1) jusqu'à ce mouvement képlérien retrouvé sans la moindre observation astronomique, tu as parcouru deux siècles de reformulations successives de la même physique — chacune plus abstraite, et pourtant chacune plus puissante que la précédente. La prochaine fois que tu lèveras les yeux vers une planète dans le ciel nocturne, tu sauras que sa trajectoire elliptique, que Kepler a dû arracher minute d'arc par minute d'arc à des années de données, se déduit aujourd'hui de quelques lignes de calcul lagrangien.</p>
  `
};
MECAN_NOVA_KB[meaKey("Problème à force centrale et mouvement képlérien")] = {
  intro: "Salut, moi c'est Nova ! On termine avec le problème à force centrale et les lois de Kepler. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/masse r[ée]duite/i, replies:[
      "La masse réduite μ=m1m2/(m1+m2) permet de réduire le problème à deux corps à un problème à un seul corps fictif, valable pour toute force centrale."
    ]},
    { test:/loi des aires|deuxi[èe]me loi de kepler|moment cin[ée]tique/i, replies:[
      "La loi des aires découle directement de la conservation du moment cinétique L=μr²θ̇ (θ coordonnée cyclique) — valable pour toute force centrale, pas seulement la gravitation."
    ]},
    { test:/potentiel effectif|barri[èe]re centrifuge/i, replies:[
      "Le potentiel effectif Veff(r)=V(r)+L²/(2μr²) réduit le problème à un mouvement radial 1D. La barrière centrifuge L²/(2μr²) diverge plus vite que le potentiel gravitationnel près de r=0, empêchant la chute au centre."
    ]},
    { test:/lois de kepler/i, replies:[
      "Les trois lois de Kepler : orbites elliptiques (1ère), loi des aires (2ème, conservation du moment cinétique), T²∝a³ (3ème) — toutes retrouvées par le formalisme lagrangien appliqué au potentiel −Gm1m2/r."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à quelle grandeur conservée est directement liée à dA/dt.",
      "Indice niveau 2 : ce n'est pas l'énergie, ni la forme spécifique du potentiel.",
      "Indice niveau 3 : c'est la conservation du moment cinétique."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau des types de trajectoires selon E.",
      "Indice niveau 2 : une ellipse correspond à une orbite liée mais non circulaire.",
      "Indice niveau 3 : c'est Veff,min < E < 0."
    ]}
  ]
};

/* fusionne le module Mécanique analytique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MECAN_CHAPTERS);
Object.assign(NOVA_KB, MECAN_NOVA_KB);