/* =====================================================================
   CHUNK « onde » — registre ONDE_CHAPTERS / ONDE_NOVA_KB
   Matière(s) : Physique|Ondes et vibrations
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ONDE_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — ONDES ET VIBRATIONS (L3 Physique Fondamentale)
   9 chapitres : de la chaîne d'oscillateurs couplés au milieu continu, équation de
   d'Alembert et ondes progressives, ondes planes sinusoïdales et vitesse de phase, la
   corde vibrante (équation, réflexion, modes propres), ondes stationnaires et analyse
   de Fourier, énergie/puissance/impédance, réflexion-transmission à une discontinuité,
   ondes acoustiques dans les fluides, dispersion et vitesse de groupe — conforme aux
   maquettes LMD de L3 Physique Fondamentale. Ce cours traite des ondes MÉCANIQUES
   (cordes, chaînes d'atomes, fluides) ; les ondes électromagnétiques, déjà couvertes
   par le cours de L2 « Ondes électromagnétiques et relativité restreinte », n'y sont
   pas reprises. Il s'appuie sur les petites oscillations et modes normaux (Mécanique
   analytique, chapitre 6) et sur la mécanique des fluides pour le chapitre d'acoustique.
   Rédigé sur le même modèle que les autres modules (objectives/prereqs/bodyHtml/
   extraHtml + registre NOVA_KB). Références de fond : J.-M. Richard, Ondes et
   Vibrations (IUT) ; H. Sazdjian, Ondes : cordes vibrantes, ondes sonores, ondes
   optiques (IJCLab) ; programmes L2/L3 francophones de physique des ondes.
   ===================================================================================== */
const ONDE_MATIERE = 'Ondes et vibrations';
function ondeKey(chapterTitle){ return `Physique|${ONDE_MATIERE}|${chapterTitle}`; }
const ONDE_CHAPTERS = {};
const ONDE_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
ONDE_CHAPTERS[ondeKey("De la chaîne d'oscillateurs couplés au milieu continu")] = {
  objectives: [
    "Établir les équations du mouvement d'une chaîne d'oscillateurs couplés",
    "Passer à la limite continue et faire apparaître l'équation d'onde",
    "Identifier la vitesse de propagation à partir des paramètres microscopiques de la chaîne",
    "Comprendre le lien entre modes normaux d'un système discret et ondes d'un milieu continu"
  ],
  prereqs: ["Petites oscillations et modes normaux (Mécanique analytique, chapitre 6)", "Équations de Lagrange et applications (Mécanique analytique)"],
  bodyHtml: `
    <p>Le chapitre 6 de mécanique analytique a montré qu'un système à $N$ degrés de liberté couplés oscille selon $N$ modes normaux, chacun à sa pulsation propre. Ce cours d'<strong>ondes et vibrations</strong> part de cette idée et la pousse à son terme naturel : que devient un système d'oscillateurs couplés quand leur nombre $N$ devient très grand, et que la distance entre eux devient infinitésimale ? La réponse — un <strong>milieu continu</strong> — fait émerger l'un des objets centraux de toute la physique : l'<strong>onde</strong>.</p>

    <h3>1. La chaîne linéaire d'oscillateurs couplés</h3>
    <p>Considérons $N$ masses ponctuelles identiques $m$, alignées, reliées à leurs voisines par des ressorts identiques de raideur $k$ et de longueur au repos $a$ (le pas du réseau). On note $u_n(t)$ le déplacement longitudinal de la $n$-ième masse par rapport à sa position d'équilibre $na$. La deuxième loi de Newton, appliquée à la masse $n$ (qui subit la force des deux ressorts qui l'encadrent), donne :</p>
    <div class="formula-box">$$m\\,\\ddot u_n = k(u_{n+1}-u_n) - k(u_n - u_{n-1}) = k(u_{n+1}+u_{n-1}-2u_n)$$</div>
    <p>C'est un système de $N$ équations différentielles couplées — la même structure que la chaîne de masses-ressorts vue en petites oscillations (mécanique analytique), mais ici généralisée à un grand nombre de masses.</p>

    <h3>2. Passage à la limite continue</h3>
    <p>Faisons maintenant tendre le pas du réseau $a$ vers $0$, en gardant fixée la longueur totale $L=Na$ de la chaîne (donc $N\\to\\infty$). On introduit un déplacement continu $u(x,t)$, tel que $u_n(t) \\approx u(x=na,t)$, et l'on développe $u_{n\\pm1} = u(x\\pm a,t)$ en série de Taylor à l'ordre 2 en $a$ :</p>
    <div class="formula-box">$$u(x\\pm a,t) \\approx u(x,t) \\pm a\\,\\frac{\\partial u}{\\partial x} + \\frac{a^2}{2}\\,\\frac{\\partial^2 u}{\\partial x^2}$$</div>
    <p>En reportant dans l'équation discrète, les termes d'ordre 0 et 1 en $a$ s'annulent exactement (par construction de la différence symétrique), et il reste, à l'ordre dominant :</p>
    <div class="formula-box">$$m\\,\\frac{\\partial^2 u}{\\partial t^2} = k a^2\\,\\frac{\\partial^2 u}{\\partial x^2}$$</div>
    <p>Pour que cette limite ait un sens physique (ni triviale, ni divergente), il faut que le produit $ka^2$ tende vers une constante finie quand $a\\to 0$ et $k\\to\\infty$ (le ressort devient plus raide à mesure que les masses se rapprochent) — c'est le régime physique pertinent pour un solide élastique réel, où $k$ est lié au module d'Young du matériau. En divisant par la masse linéique $\\mu = m/a$ :</p>
    <div class="formula-box">$$\\boxed{\\ \\frac{\\partial^2 u}{\\partial t^2} = c^2\\,\\frac{\\partial^2 u}{\\partial x^2}, \\qquad c^2 = \\frac{ka^2}{m} = \\frac{k a}{\\mu}\\ }$$</div>
    <p>C'est l'<strong>équation d'onde</strong> (ou équation de d'Alembert), que le chapitre suivant étudiera en détail. La grandeur $c$, homogène à une vitesse, est la <strong>célérité de propagation</strong> de l'onde dans le milieu.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      L'équation d'onde émerge d'un principe très général : dès qu'un système continu possède une force de rappel élastique locale (proportionnelle à la courbure du déplacement, $\\partial^2 u/\\partial x^2$) et une inertie locale ($\\mu\\,\\partial^2 u/\\partial t^2$), il obéit à une équation d'onde. C'est pourquoi la même équation décrit des systèmes physiques aussi différents qu'une corde vibrante, un barreau élastique, une colonne d'air, ou (avec des variables différentes) un champ électromagnétique.
    </div>

    <h3>3. Des modes normaux discrets aux ondes continues</h3>
    <p>Pour la chaîne discrète, les modes normaux (mécanique analytique, chapitre 6) sont de la forme $u_n(t) \\propto \\cos(qna - \\omega t)$, où $q$ est un <strong>nombre d'onde</strong> discret. À la limite continue, ce même mode devient une onde progressive $u(x,t) \\propto \\cos(qx-\\omega t)$ — une fonction continue de $x$ et $t$. La relation entre $\\omega$ et $q$ pour la chaîne discrète, appelée <strong>relation de dispersion</strong>, s'écrit $\\omega(q) = 2\\sqrt{k/m}\\,\\left|\\sin(qa/2)\\right|$ ; dans la limite des grandes longueurs d'onde ($qa \\ll 1$), un développement limité donne $\\omega(q) \\approx c\\,|q|$ — une relation linéaire, caractéristique du milieu continu non dispersif obtenu à la limite $a\\to 0$ (le chapitre 9 reviendra sur les cas où la dispersion réapparaît).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un barreau élastique a une masse linéique $\\mu = 0{,}2\\,\\text{kg/m}$ et une raideur effective par unité de longueur telle que $c=2000\\,\\text{m/s}$. Si l'on double la masse linéique (matériau deux fois plus dense, même élasticité), que devient $c$ ?</p>
      <p><strong>Solution :</strong> $c = \\sqrt{ka/\\mu}$ (à raideur $k$ et pas $a$ fixés), donc $c \\propto 1/\\sqrt{\\mu}$.</p>
      <p class="example-answer">$c_{nouveau} = c/\\sqrt 2 \\approx 1414\\,\\text{m/s}$ : une masse linéique plus grande (plus d'inertie) ralentit la propagation — exactement l'intuition physique attendue.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une chaîne de $N$ oscillateurs couplés, à la limite $N\\to\\infty$ (pas $a\\to 0$), donne un milieu continu obéissant à l'équation d'onde</li>
        <li>Équation d'onde : $\\dfrac{\\partial^2 u}{\\partial t^2} = c^2\\dfrac{\\partial^2 u}{\\partial x^2}$, avec $c^2 = ka/\\mu$ ($\\mu$ = masse linéique)</li>
        <li>Les modes normaux discrets de la chaîne deviennent des ondes progressives continues à la limite</li>
        <li>La relation de dispersion discrète $\\omega(q)$ devient linéaire, $\\omega\\approx c|q|$, aux grandes longueurs d'onde (milieu non dispersif à cette limite)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que le passage à la limite continue nécessite $ka^2\\to$ constante finie, pas $k$ ou $a^2$ séparément constants</li>
        <li>Confondre le nombre d'onde discret $q$ (défini modulo $2\\pi/a$ pour un réseau) et le nombre d'onde continu $k=\\omega/c$ du chapitre suivant</li>
        <li>Croire que la relation de dispersion est toujours linéaire : ce n'est vrai qu'à la limite des grandes longueurs d'onde (chapitre 9)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La célérité $c$ de l'onde dans la chaîne continue est donnée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde1e1" value="wrong"> $c = k/m$</label>
          <label class="option"><input type="radio" name="onde1e1" value="right"> $c^2 = ka^2/m$</label>
          <label class="option"><input type="radio" name="onde1e1" value="wrong"> $c = a/m$</label>
          <label class="option"><input type="radio" name="onde1e1" value="wrong"> $c^2 = m/k$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde1e1','onde1fb1','Correct — c\\'est exactement le résultat obtenu par passage à la limite continue de la chaîne discrète.','Relis la formule encadrée du cours donnant c² en fonction de k, a et m.')">Vérifier</button>
        <div class="feedback" id="onde1fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si l'on augmente la masse linéique $\\mu$ du milieu (à raideur $k$ et pas $a$ fixés), la célérité $c$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde1e2" value="wrong"> augmente</label>
          <label class="option"><input type="radio" name="onde1e2" value="right"> diminue</label>
          <label class="option"><input type="radio" name="onde1e2" value="wrong"> reste inchangée</label>
          <label class="option"><input type="radio" name="onde1e2" value="wrong"> devient infinie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde1e2','onde1fb2','Correct — c=√(ka/μ) diminue quand μ augmente : plus d\\'inertie ralentit la propagation, comme pour l\\'exemple corrigé du cours.','Utilise c=√(ka/μ) : comment varie c quand μ augmente ?')">Vérifier</button>
        <div class="feedback" id="onde1fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans la limite des grandes longueurs d'onde, la relation de dispersion $\\omega(q)$ de la chaîne discrète devient :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde1e3" value="wrong"> quadratique : $\\omega \\propto q^2$</label>
          <label class="option"><input type="radio" name="onde1e3" value="right"> linéaire : $\\omega \\approx c|q|$</label>
          <label class="option"><input type="radio" name="onde1e3" value="wrong"> constante, indépendante de $q$</label>
          <label class="option"><input type="radio" name="onde1e3" value="wrong"> exponentielle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde1e3','onde1fb3','Correct — c\\'est cette linéarité qui caractérise un milieu continu non dispersif à cette limite ; la dispersion réapparaît à plus courte longueur d\\'onde (chapitre 9).','Relis la fin de la section 3 du cours sur le développement limité de ω(q).')">Vérifier</button>
        <div class="feedback" id="onde1fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("De la chaîne d'oscillateurs couplés au milieu continu")] = {
  intro: "Salut, moi c'est Nova ! On démarre les ondes et vibrations en partant d'une chaîne d'oscillateurs couplés et en passant à la limite continue. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/limite continue|passage.*limite/i, replies:[
      "En faisant tendre le pas a vers 0 (avec ka² constant), la chaîne discrète d'oscillateurs devient un milieu continu obéissant à l'équation d'onde ∂²u/∂t²=c²∂²u/∂x²."
    ]},
    { test:/c[ée]l[ée]rit[ée]|vitesse de propagation/i, replies:[
      "La célérité c²=ka/μ (μ = masse linéique) dépend de la raideur k et de l'inertie du milieu : plus le milieu est dense (μ grand), plus c est petit."
    ]},
    { test:/dispersion/i, replies:[
      "La relation de dispersion discrète ω(q) devient linéaire, ω≈c|q|, aux grandes longueurs d'onde — c'est le régime non dispersif de la limite continue. La dispersion réapparaît à courte longueur d'onde (chapitre 9)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour c².",
      "Indice niveau 2 : elle fait intervenir k, a et m.",
      "Indice niveau 3 : c²=ka²/m."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : utilise c=√(ka/μ) et regarde comment c varie avec μ.",
      "Indice niveau 2 : μ est au dénominateur sous la racine.",
      "Indice niveau 3 : augmenter μ diminue c."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la fin de la section 3 du cours.",
      "Indice niveau 2 : c'est un développement limité de ω(q) aux petits q.",
      "Indice niveau 3 : ω≈c|q|, une relation linéaire."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
ONDE_CHAPTERS[ondeKey("L'équation de d'Alembert et les ondes progressives")] = {
  objectives: [
    "Établir la solution générale de l'équation de d'Alembert par changement de variables",
    "Distinguer onde progressive vers les x croissants et onde régressive vers les x décroissants",
    "Utiliser les conditions initiales pour déterminer les deux fonctions de la solution générale",
    "Interpréter physiquement la forme invariante d'une onde progressive"
  ],
  prereqs: ["De la chaîne d'oscillateurs couplés au milieu continu"],
  bodyHtml: `
    <p>Le chapitre précédent a fait émerger l'<strong>équation de d'Alembert</strong> comme loi générale de propagation dans un milieu continu élastique. Ce chapitre en donne la <strong>solution générale</strong> — un résultat remarquablement simple, obtenu par un habile changement de variables dû à d'Alembert lui-même (1747), qui éclaire immédiatement le sens physique du mot « onde ».</p>

    <h3>1. L'équation de d'Alembert</h3>
    <div class="formula-box">$$\\frac{\\partial^2 u}{\\partial t^2} = c^2\\,\\frac{\\partial^2 u}{\\partial x^2}$$</div>
    <p>C'est une équation aux dérivées partielles <strong>linéaire</strong> du second ordre. La linéarité a une conséquence physique majeure : le <strong>principe de superposition</strong> s'applique — si $u_1(x,t)$ et $u_2(x,t)$ sont solutions, alors $\\alpha u_1 + \\beta u_2$ l'est aussi, pour toute combinaison linéaire. C'est ce principe qui permettra, au chapitre 5, de décomposer n'importe quelle onde en somme de modes sinusoïdaux simples.</p>

    <h3>2. Changement de variables de d'Alembert</h3>
    <p>Introduisons les nouvelles variables $\\xi = x - ct$ et $\\eta = x + ct$. En exprimant les dérivées partielles par rapport à $x$ et $t$ en fonction des dérivées par rapport à $\\xi$ et $\\eta$ (règle de dérivation en chaîne), un calcul direct (classique, mais un peu long) montre que l'équation de d'Alembert se réduit, dans ces nouvelles variables, à :</p>
    <div class="formula-box">$$\\frac{\\partial^2 u}{\\partial \\xi\\,\\partial \\eta} = 0$$</div>
    <p>Cette équation s'intègre immédiatement : $\\partial u/\\partial \\eta$ ne dépend pas de $\\xi$, donc $\\partial u/\\partial \\eta = g'(\\eta)$ pour une certaine fonction $g$ ; en intégrant à nouveau par rapport à $\\eta$, $u(\\xi,\\eta) = f(\\xi) + g(\\eta)$, où $f$ et $g$ sont deux fonctions <strong>arbitraires</strong> (à préciser par les conditions initiales et aux limites). En revenant aux variables physiques $x,t$ :</p>
    <div class="formula-box">$$\\boxed{\\ u(x,t) = f(x-ct) + g(x+ct)\\ }$$</div>
    <p>C'est la <strong>solution générale</strong> de l'équation de d'Alembert à une dimension — sans aucune hypothèse sur la forme de $f$ et $g$ (elles n'ont même pas besoin d'être sinusoïdales).</p>

    <h3>3. Interprétation physique : ondes progressive et régressive</h3>
    <p>Le terme $f(x-ct)$ décrit un profil qui se déplace, <strong>sans se déformer</strong>, vers les $x$ <strong>croissants</strong> à la vitesse $c$ : à l'instant $t+\\Delta t$, le même profil se retrouve décalé de $c\\Delta t$ vers la droite, car $f(x-c(t+\\Delta t)) = f\\big((x - c\\Delta t) - ct\\big)$ — la valeur en $x$ à l'instant $t+\\Delta t$ est la même que la valeur en $x-c\\Delta t$ à l'instant $t$. C'est une <strong>onde progressive</strong> (vers la droite). Symétriquement, $g(x+ct)$ est une <strong>onde régressive</strong>, se propageant sans déformation vers les $x$ décroissants, toujours à la vitesse $c$.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="10" y1="70" x2="130" y2="70" stroke="#5A6472" stroke-width="1"/>
          <path d="M20,70 Q35,35 50,70" stroke="#4C7CFF" stroke-width="2" fill="none"/>
          <path d="M60,70 Q75,35 90,70" stroke="#2DD4C4" stroke-width="1.6" fill="none" stroke-dasharray="3,2"/>
          <path d="M0,-5 L10,0 L0,5 Z" transform="translate(90,20)" fill="#F0B94D"/>
          <line x1="55" y1="20" x2="88" y2="20" stroke="#F0B94D" stroke-width="1.4"/>
          <text x="55" y="14" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">c·Δt</text>
        </svg>
        <span>même profil, translaté sans déformation à la vitesse c</span>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé — ce qui définit une « onde »</span>
      C'est précisément cette propriété — un profil qui se déplace sans se déformer — qui définit intuitivement ce qu'est une onde. Elle transporte de l'énergie et de l'information (la forme du profil) d'un point à un autre du milieu, <strong>sans transport net de matière</strong> : chaque point du milieu oscille sur place autour de sa position d'équilibre (chapitre 6 quantifiera précisément ce transport d'énergie).
    </div>

    <h3>4. Détermination de $f$ et $g$ à partir des conditions initiales</h3>
    <p>Pour un problème posé sur toute la droite réelle (pas de bord), les conditions initiales $u(x,0)=u_0(x)$ et $\\partial u/\\partial t(x,0) = v_0(x)$ déterminent complètement $f$ et $g$. En dérivant $u(x,t)=f(x-ct)+g(x+ct)$ par rapport à $t$ puis en évaluant en $t=0$, et en combinant avec $u(x,0)=f(x)+g(x)=u_0(x)$, on obtient la <strong>formule de d'Alembert</strong> :</p>
    <div class="formula-box">$$u(x,t) = \\frac{u_0(x-ct)+u_0(x+ct)}{2} + \\frac{1}{2c}\\int_{x-ct}^{x+ct} v_0(s)\\,ds$$</div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à $t=0$, une corde infinie est déformée en une « bosse » $u_0(x)$ localisée, initialement au repos ($v_0(x)=0$ partout). Décrire l'évolution ultérieure.</p>
      <p><strong>Solution :</strong> avec $v_0=0$, la formule de d'Alembert donne $u(x,t) = \\dfrac{u_0(x-ct)+u_0(x+ct)}{2}$ : c'est la somme de deux répliques de la bosse initiale, d'amplitude moitié chacune, l'une se propageant vers la droite, l'autre vers la gauche.</p>
      <p class="example-answer">La perturbation initiale se scinde en deux ondes progressives identiques (à un facteur $\\frac12$ près), partant en sens opposés à la vitesse $c$ — un résultat qu'on peut observer directement en pinçant une corde de guitare en son milieu et en filmant au ralenti.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Solution générale de l'équation de d'Alembert : $u(x,t)=f(x-ct)+g(x+ct)$, obtenue par le changement de variables $\\xi=x-ct$, $\\eta=x+ct$</li>
        <li>$f(x-ct)$ : onde progressive (vers les $x$ croissants) ; $g(x+ct)$ : onde régressive, toutes deux se propageant sans déformation à la vitesse $c$</li>
        <li>La linéarité de l'équation permet la superposition de solutions — base de l'analyse de Fourier (chapitre 5)</li>
        <li>Formule de d'Alembert : $f,g$ déterminées par les conditions initiales $u_0(x)$ et $v_0(x)$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $f$ et $g$ doivent être sinusoïdales : la solution générale de d'Alembert est valable pour <em>n'importe quelle</em> forme de profil, dérivable deux fois</li>
        <li>Confondre le sens de propagation : $f(x-ct)$ va vers les $x$ croissants, $g(x+ct)$ vers les $x$ décroissants (attention au signe devant $ct$)</li>
        <li>Oublier que chaque point du milieu oscille sur place : l'onde transporte de l'énergie, pas de matière</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La fonction $f(x-ct)$ décrit une onde se propageant :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde2e1" value="wrong"> vers les $x$ décroissants</label>
          <label class="option"><input type="radio" name="onde2e1" value="right"> vers les $x$ croissants</label>
          <label class="option"><input type="radio" name="onde2e1" value="wrong"> elle ne se propage pas</label>
          <label class="option"><input type="radio" name="onde2e1" value="wrong"> dans une direction aléatoire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde2e1','onde2fb1','Correct — f(x−ct) se propage vers les x croissants à la vitesse c, sans déformation.','Relis l\\'argument du cours sur le décalage du profil entre t et t+Δt.')">Vérifier</button>
        <div class="feedback" id="onde2fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une onde progressive, en se propageant, transporte :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde2e2" value="wrong"> de la matière du milieu</label>
          <label class="option"><input type="radio" name="onde2e2" value="right"> de l'énergie, sans transport net de matière</label>
          <label class="option"><input type="radio" name="onde2e2" value="wrong"> rien du tout</label>
          <label class="option"><input type="radio" name="onde2e2" value="wrong"> uniquement de la masse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde2e2','onde2fb2','Correct — chaque point du milieu oscille sur place autour de sa position d\\'équilibre ; c\\'est l\\'énergie (et l\\'information de forme) qui se propage, pas la matière.','Relis le point clé du cours sur ce qui définit une onde.')">Vérifier</button>
        <div class="feedback" id="onde2fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une corde infinie, initialement déformée en une bosse localisée $u_0(x)$ et au repos ($v_0=0$), évolue selon :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde2e3" value="wrong"> la bosse reste immobile</label>
          <label class="option"><input type="radio" name="onde2e3" value="right"> elle se scinde en deux répliques d'amplitude moitié, partant en sens opposés</label>
          <label class="option"><input type="radio" name="onde2e3" value="wrong"> elle disparaît instantanément</label>
          <label class="option"><input type="radio" name="onde2e3" value="wrong"> son amplitude double</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde2e3','onde2fb3','Correct — u(x,t)=[u0(x−ct)+u0(x+ct)]/2 : deux répliques de moitié amplitude, se propageant en sens opposés, exactement comme dans l\\'exemple corrigé du cours.','Applique la formule de d\\'Alembert avec v0=0.')">Vérifier</button>
        <div class="feedback" id="onde2fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("L'équation de d'Alembert et les ondes progressives")] = {
  intro: "Salut, c'est Nova ! On résout l'équation de d'Alembert et on découvre ce qu'est une onde progressive. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/solution g[ée]n[ée]rale|f\(x-ct\)/i, replies:[
      "La solution générale de l'équation de d'Alembert est u(x,t)=f(x−ct)+g(x+ct), obtenue via le changement de variables ξ=x−ct, η=x+ct qui réduit l'équation à ∂²u/∂ξ∂η=0."
    ]},
    { test:/progressive|r[ée]gressive/i, replies:[
      "f(x−ct) est une onde progressive (vers les x croissants), g(x+ct) une onde régressive (vers les x décroissants). Les deux se propagent sans déformation à la vitesse c."
    ]},
    { test:/superposition/i, replies:[
      "L'équation de d'Alembert étant linéaire, toute combinaison linéaire de solutions est encore solution — c'est le principe de superposition, base de l'analyse de Fourier (chapitre 5)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'argument du cours sur le décalage du profil entre t et t+Δt.",
      "Indice niveau 2 : le profil se retrouve décalé vers la droite.",
      "Indice niveau 3 : f(x−ct) se propage vers les x croissants."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le point clé du cours sur ce qui définit une onde.",
      "Indice niveau 2 : chaque point du milieu oscille sur place.",
      "Indice niveau 3 : c'est l'énergie qui se propage, pas la matière."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : applique la formule de d'Alembert avec v0=0.",
      "Indice niveau 2 : il ne reste que le terme en [u0(x−ct)+u0(x+ct)]/2.",
      "Indice niveau 3 : deux répliques de moitié amplitude, en sens opposés."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
ONDE_CHAPTERS[ondeKey("Ondes planes progressives sinusoïdales et vitesse de phase")] = {
  objectives: [
    "Écrire une onde plane progressive sinusoïdale et identifier ses paramètres caractéristiques",
    "Relier pulsation, nombre d'onde, période, longueur d'onde et vitesse de phase",
    "Utiliser la notation complexe pour simplifier les calculs sur les ondes sinusoïdales",
    "Généraliser à une onde plane progressive dans l'espace à trois dimensions"
  ],
  prereqs: ["L'équation de d'Alembert et les ondes progressives"],
  bodyHtml: `
    <p>Parmi toutes les fonctions $f(x-ct)$ possibles (chapitre 2), la famille des ondes <strong>sinusoïdales</strong> occupe une place particulière : d'une part, elles apparaissent naturellement dans de nombreux problèmes physiques (sources vibrant à fréquence fixe) ; d'autre part — et c'est la raison la plus profonde — l'analyse de Fourier (chapitre 5) permet de décomposer <em>n'importe quelle</em> onde en une superposition d'ondes sinusoïdales. Il est donc essentiel de maîtriser leur description avant d'aborder des cas plus généraux.</p>

    <h3>1. Onde plane progressive sinusoïdale (OPPS)</h3>
    <p>Une <strong>onde plane progressive sinusoïdale</strong> à une dimension s'écrit :</p>
    <div class="formula-box">$$u(x,t) = A\\cos(kx - \\omega t + \\varphi)$$</div>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Nom</th><th>Unité</th></tr>
      <tr><td>$A$</td><td>amplitude</td><td>celle de $u$</td></tr>
      <tr><td>$\\omega$</td><td>pulsation</td><td>$\\text{rad/s}$</td></tr>
      <tr><td>$k$</td><td>nombre d'onde</td><td>$\\text{rad/m}$</td></tr>
      <tr><td>$\\varphi$</td><td>phase à l'origine</td><td>$\\text{rad}$</td></tr>
    </table>
    <p>En reportant $u(x,t)=A\\cos(kx-\\omega t+\\varphi)$ dans l'équation de d'Alembert, on trouve la <strong>relation de dispersion</strong> du milieu non dispersif du chapitre 1 :</p>
    <div class="formula-box">$$\\omega = ck \\qquad \\text{(ou } k=\\omega/c\\text{)}$$</div>

    <h3>2. Périodes temporelle et spatiale</h3>
    <p>À position $x$ fixée, $u$ est périodique en temps de <strong>période</strong> $T = 2\\pi/\\omega$ (ou de <strong>fréquence</strong> $f=1/T=\\omega/2\\pi$). À instant $t$ fixé, $u$ est périodique en espace de <strong>longueur d'onde</strong> $\\lambda = 2\\pi/k$. La relation de dispersion $\\omega=ck$ se réécrit alors, de façon très parlante :</p>
    <div class="formula-box">$$\\lambda = c\\,T \\qquad \\text{ou} \\qquad c = \\lambda f$$</div>
    <p>— la distance parcourue par l'onde en une période temporelle est exactement une longueur d'onde, ce qui n'est finalement qu'une reformulation de « distance = vitesse × temps ».</p>

    <h3>3. Vitesse de phase</h3>
    <p>La <strong>vitesse de phase</strong> $v_\\varphi$ est la vitesse à laquelle il faut se déplacer pour observer une <strong>phase constante</strong> $kx-\\omega t = \\text{cste}$ : en différenciant, $k\\,dx = \\omega\\,dt$, donc :</p>
    <div class="formula-box">$$v_\\varphi = \\frac{dx}{dt}\\bigg|_{\\text{phase cste}} = \\frac{\\omega}{k}$$</div>
    <p>Pour le milieu non dispersif de ce chapitre, $v_\\varphi = \\omega/k = c$ : la vitesse de phase coïncide avec la célérité de l'onde. Ce ne sera plus le cas dans un milieu <strong>dispersif</strong> (chapitre 9), où $\\omega(k)$ n'est plus une fonction linéaire de $k$ — la distinction entre vitesse de phase et vitesse de groupe y devient essentielle.</p>

    <h3>4. Notation complexe</h3>
    <p>Les calculs sur les ondes sinusoïdales (dérivations, additions de phases) se simplifient considérablement en notation complexe. On écrit :</p>
    <div class="formula-box">$$\\underline u(x,t) = A\\,e^{i(kx-\\omega t+\\varphi)}, \\qquad u(x,t) = \\text{Re}\\big[\\underline u(x,t)\\big]$$</div>
    <div class="key-point">
      <span class="eyebrow">Pourquoi c'est si pratique</span>
      Une dérivation par rapport à $t$ revient à multiplier par $-i\\omega$ ; une dérivation par rapport à $x$ revient à multiplier par $ik$. L'équation de d'Alembert, en notation complexe, devient une simple relation algébrique $-\\omega^2 = c^2(ik)^2/i^2$... c'est-à-dire $\\omega^2=c^2k^2$ — retrouvée sans dériver quoi que ce soit. Cette notation est <em>essentielle</em> pour aborder efficacement le chapitre suivant (superposition de plusieurs ondes déphasées).
    </div>

    <h3>5. Généralisation à trois dimensions : onde plane</h3>
    <p>Dans l'espace à trois dimensions, une <strong>onde plane progressive sinusoïdale</strong> se propageant dans la direction du <strong>vecteur d'onde</strong> $\\vec k$ (de norme $k=\\omega/c$) s'écrit :</p>
    <div class="formula-box">$$u(\\vec r,t) = A\\cos(\\vec k\\cdot\\vec r - \\omega t + \\varphi)$$</div>
    <p>Les surfaces de phase constante $\\vec k\\cdot\\vec r = \\text{cste}$ sont des <strong>plans</strong> perpendiculaires à $\\vec k$ — d'où le nom « onde plane ». C'est le modèle le plus simple d'onde à trois dimensions, brique de base pour construire (par superposition) des ondes de forme quelconque, y compris les ondes sphériques émises par une source ponctuelle.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une onde sonore de fréquence $f=440\\,\\text{Hz}$ (note « la ») se propage dans l'air à $c=340\\,\\text{m/s}$. Calculer sa longueur d'onde et son nombre d'onde.</p>
      <p><strong>Solution :</strong> $\\lambda = c/f = 340/440 \\approx 0{,}773\\,\\text{m}$. $k = 2\\pi/\\lambda \\approx 8{,}13\\,\\text{rad/m}$.</p>
      <p class="example-answer">$\\lambda \\approx 77\\,\\text{cm}$ — une longueur d'onde comparable à la taille d'un instrument de musique, ce qui n'est pas une coïncidence (chapitre 4 : la taille d'une corde ou d'une colonne d'air fixe les fréquences qu'elle peut produire).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>OPPS : $u(x,t)=A\\cos(kx-\\omega t+\\varphi)$, avec relation de dispersion $\\omega=ck$ (milieu non dispersif)</li>
        <li>$\\lambda = cT = c/f$ ; vitesse de phase $v_\\varphi=\\omega/k$, égale à $c$ dans un milieu non dispersif</li>
        <li>Notation complexe $\\underline u = Ae^{i(kx-\\omega t+\\varphi)}$ : dériver revient à multiplier par $\\pm i\\omega$ ou $ik$</li>
        <li>En 3D, onde plane $u(\\vec r,t)=A\\cos(\\vec k\\cdot\\vec r-\\omega t+\\varphi)$, surfaces d'onde planes perpendiculaires à $\\vec k$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre pulsation $\\omega$ (rad/s) et fréquence $f$ (Hz) : $\\omega=2\\pi f$, un facteur $2\\pi$ à ne pas oublier</li>
        <li>Oublier de reprendre la partie réelle à la fin d'un calcul mené en notation complexe</li>
        <li>Croire que $v_\\varphi=\\omega/k$ vaut toujours $c$ : ce n'est vrai que dans un milieu non dispersif (voir chapitre 9 pour le cas général)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La longueur d'onde $\\lambda$ et la période $T$ d'une OPPS sont reliées par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde3e1" value="wrong"> $\\lambda = T/c$</label>
          <label class="option"><input type="radio" name="onde3e1" value="right"> $\\lambda = cT$</label>
          <label class="option"><input type="radio" name="onde3e1" value="wrong"> $\\lambda = c/T$</label>
          <label class="option"><input type="radio" name="onde3e1" value="wrong"> $\\lambda = c+T$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde3e1','onde3fb1','Correct — λ=cT (ou c=λf) : la distance parcourue en une période temporelle est une longueur d\\'onde.','Relis la formule du cours reliant λ, c et T.')">Vérifier</button>
        <div class="feedback" id="onde3fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un milieu non dispersif, la vitesse de phase $v_\\varphi=\\omega/k$ est égale à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde3e2" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="onde3e2" value="right"> $c$, la célérité de l'onde</label>
          <label class="option"><input type="radio" name="onde3e2" value="wrong"> $c^2$</label>
          <label class="option"><input type="radio" name="onde3e2" value="wrong"> $\\lambda$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde3e2','onde3fb2','Correct — dans un milieu non dispersif, ω=ck, donc vφ=ω/k=c : vitesse de phase et célérité coïncident.','Reporte la relation de dispersion ω=ck dans vφ=ω/k.')">Vérifier</button>
        <div class="feedback" id="onde3fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une onde sonore de fréquence 440 Hz se propageant à 340 m/s, la longueur d'onde est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde3e3" value="wrong"> 0,077 m</label>
          <label class="option"><input type="radio" name="onde3e3" value="right"> 0,77 m</label>
          <label class="option"><input type="radio" name="onde3e3" value="wrong"> 7,7 m</label>
          <label class="option"><input type="radio" name="onde3e3" value="wrong"> 149600 m</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde3e3','onde3fb3','Correct — λ=c/f=340/440≈0,77 m, exactement comme dans l\\'exemple corrigé du cours.','Utilise λ=c/f avec les valeurs données.')">Vérifier</button>
        <div class="feedback" id="onde3fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("Ondes planes progressives sinusoïdales et vitesse de phase")] = {
  intro: "Salut, c'est Nova ! On étudie les ondes sinusoïdales : pulsation, nombre d'onde, vitesse de phase, notation complexe. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/vitesse de phase/i, replies:[
      "La vitesse de phase vφ=ω/k est la vitesse à laquelle se déplace un point de phase constante. Dans un milieu non dispersif, vφ=c ; ce n'est plus vrai dans un milieu dispersif (chapitre 9)."
    ]},
    { test:/notation complexe/i, replies:[
      "En notation complexe, u=Ae^(i(kx−ωt+φ)), dériver par rapport à t revient à multiplier par −iω, et par rapport à x par ik — ça simplifie beaucoup les calculs sur les ondes sinusoïdales."
    ]},
    { test:/longueur d.onde|p[ée]riode/i, replies:[
      "λ=cT=c/f : la longueur d'onde est la distance parcourue par l'onde en une période temporelle. C'est juste 'distance=vitesse×temps' reformulé."
    ]},
    { test:/onde plane/i, replies:[
      "En 3D, une onde plane u(r,t)=Acos(k·r−ωt+φ) a des surfaces de phase constante qui sont des plans perpendiculaires au vecteur d'onde k."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule du cours reliant λ, c et T.",
      "Indice niveau 2 : c'est une simple relation 'distance=vitesse×temps'.",
      "Indice niveau 3 : λ=cT."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : reporte ω=ck dans vφ=ω/k.",
      "Indice niveau 2 : les k se simplifient.",
      "Indice niveau 3 : vφ=c."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : utilise λ=c/f avec c=340 m/s et f=440 Hz.",
      "Indice niveau 2 : 340/440 ≈ 0,77.",
      "Indice niveau 3 : λ≈0,77 m."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
ONDE_CHAPTERS[ondeKey("La corde vibrante : équation, conditions aux limites et modes propres")] = {
  objectives: [
    "Établir l'équation de la corde vibrante à partir d'un bilan de forces",
    "Traiter le cas d'une corde fixée à ses deux extrémités : quantification des modes propres",
    "Relier la fréquence fondamentale à la longueur, la tension et la masse linéique de la corde",
    "Décrire les harmoniques et leur rôle dans le timbre d'un instrument de musique"
  ],
  prereqs: ["Ondes planes progressives sinusoïdales et vitesse de phase"],
  bodyHtml: `
    <p>La <strong>corde vibrante</strong> — fil tendu, corde de guitare ou de piano — est l'exemple physique le plus emblématique de l'équation de d'Alembert : c'est sur elle que d'Alembert a initialement développé sa théorie (1747), et c'est elle qui a motivé, quelques décennies plus tard, les travaux de Fourier sur la décomposition en séries trigonométriques (chapitre 5). Ce chapitre en établit l'équation à partir des lois de Newton, puis résout le problème central : une corde de longueur <strong>finie</strong>, fixée à ses deux bouts.</p>

    <h3>1. Établissement de l'équation à partir d'un bilan de forces</h3>
    <p>Considérons une corde tendue horizontalement, de masse linéique $\\mu$, soumise à une tension $T_0$ supposée constante et grande devant les déplacements (approximation des petites oscillations transversales : la pente $\\partial y/\\partial x$ reste petite). En isolant un petit élément de corde entre $x$ et $x+dx$, la projection verticale de la deuxième loi de Newton (les tensions aux deux extrémités de l'élément, quasi-horizontales, ont une faible composante verticale liée à la variation de pente) donne :</p>
    <div class="formula-box">$$\\mu\\,dx\\,\\frac{\\partial^2 y}{\\partial t^2} = T_0\\left[\\frac{\\partial y}{\\partial x}\\bigg|_{x+dx} - \\frac{\\partial y}{\\partial x}\\bigg|_{x}\\right] \\approx T_0\\,\\frac{\\partial^2 y}{\\partial x^2}\\,dx$$</div>
    <p>D'où l'équation de la corde vibrante — l'équation de d'Alembert, avec une identification explicite de la célérité en fonction des grandeurs physiques de la corde :</p>
    <div class="formula-box">$$\\frac{\\partial^2 y}{\\partial t^2} = c^2\\,\\frac{\\partial^2 y}{\\partial x^2}, \\qquad c = \\sqrt{\\frac{T_0}{\\mu}}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Plus une corde est tendue (grand $T_0$), plus l'onde s'y propage vite ; plus elle est lourde (grand $\\mu$), plus elle s'y propage lentement — on retrouve exactement l'intuition acquise sur la chaîne d'oscillateurs du chapitre 1, avec $T_0$ jouant ici le rôle de la raideur effective du milieu.
    </div>

    <h3>2. Conditions aux limites : corde fixée aux deux bouts</h3>
    <p>Pour une corde de longueur $L$, fixée en $x=0$ et $x=L$ (comme une corde de guitare entre le sillet et le chevalet), la solution générale de d'Alembert ($u=f(x-ct)+g(x+ct)$, chapitre 2) doit vérifier à tout instant $y(0,t)=0$ et $y(L,t)=0$. On cherche les solutions particulières à variables séparées, $y(x,t) = X(x)\\,\\cos(\\omega t+\\varphi)$ (les <strong>modes propres</strong>, déjà rencontrés en petites oscillations discrètes, mécanique analytique chapitre 6). En reportant dans l'équation d'onde, $X(x)$ doit vérifier $X''+k^2X=0$ (avec $k=\\omega/c$), dont la solution générale est $X(x)=A\\sin(kx)+B\\cos(kx)$.</p>
    <p>La condition $y(0,t)=0$ impose $X(0)=0$, donc $B=0$. La condition $y(L,t)=0$ impose $X(L)=A\\sin(kL)=0$ : soit $A=0$ (solution triviale, sans intérêt), soit $\\sin(kL)=0$, ce qui <strong>quantifie</strong> le nombre d'onde :</p>
    <div class="formula-box">$$k_n L = n\\pi \\quad \\Longrightarrow \\quad k_n = \\frac{n\\pi}{L}, \\qquad n=1,2,3,\\ldots$$</div>

    <h3>3. Les modes propres et leurs fréquences</h3>
    <p>À chaque entier $n$ correspond un <strong>mode propre</strong> $X_n(x) = \\sin\\left(\\dfrac{n\\pi x}{L}\\right)$, oscillant à la <strong>pulsation propre</strong> $\\omega_n = ck_n = \\dfrac{n\\pi c}{L}$, soit une fréquence :</p>
    <div class="formula-box">$$\\boxed{\\ f_n = \\frac{n c}{2L} = n f_1, \\qquad f_1 = \\frac{c}{2L} = \\frac{1}{2L}\\sqrt{\\frac{T_0}{\\mu}}\\ }$$</div>
    <p>Le mode $n=1$ est le <strong>mode fondamental</strong>, de fréquence $f_1$ ; les modes $n\\geq 2$ sont les <strong>harmoniques</strong> (le terme est ici employé dans son sens acoustique/musical : des fréquences multiples entiers de $f_1$, à ne pas confondre avec l'oscillateur harmonique du cours de mécanique quantique). Chaque mode propre présente $n-1$ <strong>nœuds</strong> (points immobiles, hors des extrémités) et $n$ <strong>ventres</strong> (points d'amplitude maximale) répartis régulièrement le long de la corde.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="10" y1="20" x2="130" y2="20" stroke="#5A6472" stroke-width="1" opacity="0.4"/>
          <path d="M10,20 Q70,5 130,20" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <text x="55" y="34" font-family="IBM Plex Mono" font-size="7" fill="#4C7CFF">n=1 (fondamental)</text>
          <line x1="10" y1="50" x2="130" y2="50" stroke="#5A6472" stroke-width="1" opacity="0.4"/>
          <path d="M10,50 Q40,38 70,50 Q100,62 130,50" stroke="#2DD4C4" stroke-width="1.4" fill="none"/>
          <circle cx="70" cy="50" r="2" fill="#2DD4C4"/>
          <text x="55" y="65" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">n=2</text>
        </svg>
        <span>fondamental (n=1) et premier harmonique (n=2) d'une corde fixée aux deux bouts</span>
      </div>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une corde de guitare de longueur $L=0{,}65\\,\\text{m}$, tension $T_0=70\\,\\text{N}$, masse linéique $\\mu = 5\\times 10^{-3}\\,\\text{kg/m}$. Calculer la fréquence fondamentale.</p>
      <p><strong>Solution :</strong> $c = \\sqrt{T_0/\\mu} = \\sqrt{70/5\\times10^{-3}} = \\sqrt{14000} \\approx 118{,}3\\,\\text{m/s}$. $f_1 = c/(2L) = 118{,}3/1{,}3$.</p>
      <p class="example-answer">$f_1 \\approx 91$ Hz — proche du « la grave » d'une corde de guitare basse ; en pratique, on ajuste $T_0$ (accordage) pour atteindre précisément la fréquence désirée.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Équation de la corde vibrante : $\\partial_t^2 y = c^2\\partial_x^2 y$, avec $c=\\sqrt{T_0/\\mu}$</li>
        <li>Pour une corde fixée aux deux bouts, la quantification $k_nL=n\\pi$ donne les modes propres $X_n(x)=\\sin(n\\pi x/L)$</li>
        <li>Fréquences propres $f_n = nf_1$, avec fondamental $f_1=c/(2L)$ ; les $n\\geq2$ sont les harmoniques</li>
        <li>Chaque mode $n$ a $n-1$ nœuds et $n$ ventres répartis régulièrement</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que l'approximation des petites oscillations (pente $\\partial y/\\partial x$ petite) est nécessaire pour obtenir une équation linéaire</li>
        <li>Confondre le mode propre (une solution particulière quantifiée) et la solution générale (une superposition de tous les modes, chapitre 5)</li>
        <li>Se tromper dans le décompte nœuds/ventres : c'est $n-1$ nœuds internes (hors extrémités fixes) et $n$ ventres pour le mode $n$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La célérité des ondes sur une corde tendue vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde4e1" value="wrong"> $c=T_0\\mu$</label>
          <label class="option"><input type="radio" name="onde4e1" value="right"> $c=\\sqrt{T_0/\\mu}$</label>
          <label class="option"><input type="radio" name="onde4e1" value="wrong"> $c=\\mu/T_0$</label>
          <label class="option"><input type="radio" name="onde4e1" value="wrong"> $c=\\sqrt{\\mu/T_0}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde4e1','onde4fb1','Correct — c=√(T0/μ), obtenu directement du bilan de forces sur un élément de corde.','Relis la formule encadrée du cours pour la célérité de la corde vibrante.')">Vérifier</button>
        <div class="feedback" id="onde4fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une corde fixée aux deux bouts, le mode $n=3$ possède :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde4e2" value="wrong"> 3 nœuds et 2 ventres</label>
          <label class="option"><input type="radio" name="onde4e2" value="right"> 2 nœuds (internes) et 3 ventres</label>
          <label class="option"><input type="radio" name="onde4e2" value="wrong"> 0 nœud et 3 ventres</label>
          <label class="option"><input type="radio" name="onde4e2" value="wrong"> 3 nœuds et 3 ventres</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde4e2','onde4fb2','Correct — le mode n a n−1 nœuds internes et n ventres ; pour n=3, ça donne 2 nœuds et 3 ventres.','Utilise la règle n−1 nœuds internes et n ventres pour le mode n.')">Vérifier</button>
        <div class="feedback" id="onde4fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si l'on double la tension $T_0$ d'une corde (à $L$ et $\\mu$ fixés), la fréquence fondamentale $f_1$ est multipliée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde4e3" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="onde4e3" value="right"> $\\sqrt 2$</label>
          <label class="option"><input type="radio" name="onde4e3" value="wrong"> 4</label>
          <label class="option"><input type="radio" name="onde4e3" value="wrong"> elle ne change pas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde4e3','onde4fb3','Correct — f1=√(T0/μ)/(2L) : f1 est proportionnelle à √T0, donc doubler T0 multiplie f1 par √2 — c\\'est ce principe qu\\'on utilise en accordant un instrument à cordes.','Utilise f1=c/(2L) avec c=√(T0/μ) : comment f1 varie-t-elle avec T0 ?')">Vérifier</button>
        <div class="feedback" id="onde4fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("La corde vibrante : équation, conditions aux limites et modes propres")] = {
  intro: "Salut, moi c'est Nova ! On étudie la corde vibrante fixée aux deux bouts et ses modes propres. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/c[ée]l[ée]rit[ée]|c=√/i, replies:[
      "La célérité des ondes sur une corde tendue est c=√(T0/μ) : plus la tension est grande, plus c'est rapide ; plus la corde est lourde, plus c'est lent."
    ]},
    { test:/mode propre|fondamental|harmonique/i, replies:[
      "Pour une corde fixée aux deux bouts, les modes propres ont pour fréquences fn=nf1, avec le fondamental f1=c/(2L). Les modes n≥2 sont les harmoniques (multiples entiers du fondamental)."
    ]},
    { test:/noeud|nœud|ventre/i, replies:[
      "Le mode n a n−1 nœuds internes (points immobiles) et n ventres (amplitude maximale), répartis régulièrement le long de la corde."
    ]},
    { test:/quantification|knl/i, replies:[
      "La condition aux limites y(L,t)=0 impose sin(kL)=0, donc knL=nπ : c'est cette quantification qui donne les fréquences discrètes de la corde, exactement comme pour les modes normaux discrets vus en mécanique analytique."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour c.",
      "Indice niveau 2 : c'est une racine carrée d'un rapport.",
      "Indice niveau 3 : c=√(T0/μ)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : utilise la règle n−1 nœuds internes, n ventres.",
      "Indice niveau 2 : pour n=3, ça donne 3−1=2 nœuds.",
      "Indice niveau 3 : 2 nœuds et 3 ventres."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : f1=c/(2L) avec c=√(T0/μ) — comment f1 dépend-elle de T0 ?",
      "Indice niveau 2 : f1 est proportionnelle à la racine carrée de T0.",
      "Indice niveau 3 : doubler T0 multiplie f1 par √2."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
ONDE_CHAPTERS[ondeKey("Ondes stationnaires et analyse de Fourier")] = {
  objectives: [
    "Distinguer onde stationnaire et onde progressive",
    "Écrire une onde stationnaire comme superposition de deux ondes progressives contra-propagatives",
    "Décomposer une condition initiale quelconque en série de Fourier sur les modes propres",
    "Interpréter physiquement le contenu spectral (timbre) d'un son complexe"
  ],
  prereqs: ["La corde vibrante : équation, conditions aux limites et modes propres"],
  bodyHtml: `
    <p>Le chapitre précédent a identifié les modes propres $y_n(x,t) = \\sin(k_nx)\\cos(\\omega_nt+\\varphi_n)$ d'une corde fixée à ses deux bouts. Ce chapitre en précise la nature physique — les <strong>ondes stationnaires</strong> — puis montre, avec les travaux de Fourier, comment n'importe quel mouvement initial de la corde se décompose en une somme de ces modes : c'est la clé pour comprendre le <strong>timbre</strong> d'un instrument de musique.</p>

    <h3>1. Onde stationnaire : superposition de deux ondes contra-propagatives</h3>
    <p>Un mode propre $y_n(x,t)=\\sin(k_nx)\\cos(\\omega_nt)$ peut se réécrire, grâce à la formule trigonométrique $\\sin a\\cos b = \\frac12[\\sin(a+b)+\\sin(a-b)]$ :</p>
    <div class="formula-box">$$y_n(x,t) = \\frac{1}{2}\\Big[\\sin(k_nx+\\omega_nt) - \\sin(k_nx-\\omega_nt)\\Big]$$</div>
    <p>C'est la <strong>somme d'une onde progressive et d'une onde régressive</strong> de même amplitude (chapitre 2) : une <strong>onde stationnaire</strong> résulte de l'interférence, en permanence, de deux ondes progressives sinusoïdales de même fréquence se propageant en sens opposés (physiquement : l'onde émise par la pincée initiale, et sa réflexion continuelle sur les deux extrémités fixes).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — la différence essentielle avec une onde progressive</span>
      Dans une onde stationnaire, contrairement à une onde progressive, <strong>le profil ne se déplace pas</strong> : les nœuds ($\\sin(k_nx)=0$) restent immobiles à des positions fixes, et tous les points de la corde oscillent <strong>en phase</strong> les uns avec les autres (ils passent tous par zéro au même instant), avec une amplitude qui varie d'un point à l'autre selon $\\sin(k_nx)$.
    </div>

    <h3>2. Superposition générale des modes propres</h3>
    <p>L'équation de la corde étant linéaire (chapitre 2), <strong>toute</strong> combinaison linéaire de modes propres est encore solution. La solution la plus générale compatible avec les conditions aux limites $y(0,t)=y(L,t)=0$ s'écrit donc comme une <strong>série</strong> :</p>
    <div class="formula-box">$$y(x,t) = \\sum_{n=1}^{\\infty} \\Big[a_n\\cos(\\omega_nt) + b_n\\sin(\\omega_nt)\\Big]\\sin(k_nx)$$</div>
    <p>où les coefficients $a_n,b_n$ sont déterminés par les conditions initiales $y(x,0)=y_0(x)$ et $\\partial y/\\partial t(x,0)=v_0(x)$. C'est exactement une <strong>série de Fourier</strong> en sinus : les fonctions $\\sin(n\\pi x/L)$ forment une <strong>base orthogonale</strong> de l'espace des fonctions s'annulant en $0$ et $L$, au sens du produit scalaire $\\displaystyle\\int_0^L f(x)g(x)\\,dx$.</p>

    <h3>3. Calcul des coefficients de Fourier</h3>
    <p>L'orthogonalité $\\displaystyle\\int_0^L \\sin(k_nx)\\sin(k_mx)\\,dx = \\frac{L}{2}\\delta_{nm}$ permet d'extraire chaque coefficient par projection, exactement comme pour les composantes d'un ket sur une base orthonormée (mécanique quantique, chapitre 1) :</p>
    <div class="formula-box">$$a_n = \\frac{2}{L}\\int_0^L y_0(x)\\,\\sin(k_nx)\\,dx$$</div>
    <div class="key-point">
      <span class="eyebrow">Une seule et même idée mathématique, partout en physique</span>
      Décomposer un état quelconque sur une base de modes propres orthogonaux — ici les $\\sin(k_nx)$ de la corde, ailleurs les harmoniques sphériques (mécanique quantique) ou les modes normaux d'un système couplé (mécanique analytique) — est l'une des idées les plus centrales et les plus récurrentes de toute la physique mathématique.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — la pincée triangulaire</span>
      <p><strong>Énoncé :</strong> on pince une corde de guitare en son milieu : $y_0(x)$ est un triangle isocèle de hauteur $h$ en $x=L/2$, nul aux extrémités ; $v_0=0$. Que peut-on dire, sans calcul détaillé, des coefficients $a_n$ pour $n$ pair ?</p>
      <p><strong>Solution :</strong> le profil triangulaire $y_0(x)$ est symétrique par rapport au centre $x=L/2$. Or les modes pairs ($n$ pair) sont <strong>antisymétriques</strong> par rapport à $x=L/2$ (un nœud s'y trouve exactement) : le produit $y_0(x)\\sin(k_nx)$, intégré sur $[0,L]$, s'annule par symétrie pour tout $n$ pair.</p>
      <p class="example-answer">$a_n = 0$ pour tout $n$ pair : pincer une corde <strong>exactement</strong> en son milieu supprime tous les harmoniques pairs du son produit — un résultat exploité empiriquement par les musiciens bien avant sa justification mathématique par Fourier.</p>
    </div>

    <h3>4. Timbre et contenu spectral</h3>
    <p>Le <strong>timbre</strong> d'un son — ce qui distingue une note jouée au piano de la même note jouée au violon — correspond précisément aux valeurs relatives des coefficients $a_n,b_n$ (l'amplitude de chaque harmonique) : deux instruments produisant la même fréquence fondamentale $f_1$ diffèrent par la répartition d'énergie entre le fondamental et ses harmoniques. C'est cette décomposition, généralisée en <strong>transformée de Fourier</strong>, qui est à la base de toute l'analyse spectrale des signaux, bien au-delà de l'acoustique musicale (traitement du signal, compression audio, imagerie...).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une onde stationnaire est la superposition de deux ondes progressives de même fréquence, contra-propagatives : le profil ne se déplace pas, les nœuds sont fixes</li>
        <li>La solution générale de la corde fixée est une série de Fourier $y(x,t)=\\sum_n[a_n\\cos\\omega_nt+b_n\\sin\\omega_nt]\\sin(k_nx)$</li>
        <li>Les coefficients $a_n,b_n$ s'extraient par projection, grâce à l'orthogonalité des modes $\\sin(k_nx)$</li>
        <li>Le timbre d'un son correspond à la répartition d'énergie entre le fondamental et ses harmoniques</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre onde stationnaire (profil immobile, tous les points en phase) et onde progressive (profil qui se déplace)</li>
        <li>Oublier le facteur $2/L$ dans la formule de projection des coefficients de Fourier (lié à la normalisation $\\int_0^L\\sin^2(k_nx)dx=L/2$)</li>
        <li>Croire qu'une pincée quelconque excite tous les harmoniques avec la même amplitude : la répartition dépend fortement du point de pincement (voir l'exemple corrigé)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans une onde stationnaire, les nœuds :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde5e1" value="wrong"> se déplacent à la vitesse $c$</label>
          <label class="option"><input type="radio" name="onde5e1" value="right"> restent immobiles à des positions fixes</label>
          <label class="option"><input type="radio" name="onde5e1" value="wrong"> oscillent avec l'amplitude maximale</label>
          <label class="option"><input type="radio" name="onde5e1" value="wrong"> n'existent pas dans une onde stationnaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde5e1','onde5fb1','Correct — c\\'est précisément ce qui distingue une onde stationnaire d\\'une onde progressive : le profil ne se déplace pas, les nœuds restent fixes.','Relis le point clé du cours sur la différence entre onde stationnaire et onde progressive.')">Vérifier</button>
        <div class="feedback" id="onde5fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une onde stationnaire peut s'écrire comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde5e2" value="wrong"> une seule onde progressive</label>
          <label class="option"><input type="radio" name="onde5e2" value="right"> la somme de deux ondes progressives de même fréquence, se propageant en sens opposés</label>
          <label class="option"><input type="radio" name="onde5e2" value="wrong"> le produit de deux ondes progressives</label>
          <label class="option"><input type="radio" name="onde5e2" value="wrong"> une onde de fréquence nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde5e2','onde5fb2','Correct — sin(a)cos(b) se décompose en somme de deux sinus, l\\'un correspondant à une onde progressive, l\\'autre à une onde régressive de même amplitude.','Relis la décomposition trigonométrique du mode propre dans le cours.')">Vérifier</button>
        <div class="feedback" id="onde5fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pincer une corde exactement en son milieu supprime :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde5e3" value="wrong"> le fondamental</label>
          <label class="option"><input type="radio" name="onde5e3" value="right"> tous les harmoniques pairs</label>
          <label class="option"><input type="radio" name="onde5e3" value="wrong"> tous les harmoniques impairs</label>
          <label class="option"><input type="radio" name="onde5e3" value="wrong"> tout le son</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde5e3','onde5fb3','Correct — par symétrie, les modes pairs (qui ont un nœud au centre) ne sont pas excités par une pincée symétrique en x=L/2, exactement comme dans l\\'exemple corrigé du cours.','Relis l\\'exemple corrigé sur la pincée triangulaire au centre de la corde.')">Vérifier</button>
        <div class="feedback" id="onde5fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("Ondes stationnaires et analyse de Fourier")] = {
  intro: "Salut, c'est Nova ! On étudie les ondes stationnaires et la décomposition de Fourier sur les modes propres. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/onde stationnaire/i, replies:[
      "Une onde stationnaire est la superposition de deux ondes progressives de même fréquence, se propageant en sens opposés. Contrairement à une onde progressive, son profil ne se déplace pas : les nœuds sont fixes."
    ]},
    { test:/s[ée]rie de fourier|coefficients/i, replies:[
      "La solution générale de la corde fixée est une série de Fourier y(x,t)=Σ[an cos(ωnt)+bn sin(ωnt)]sin(knx). Les coefficients an,bn s'obtiennent par projection grâce à l'orthogonalité des modes sin(knx)."
    ]},
    { test:/timbre/i, replies:[
      "Le timbre d'un son correspond à la répartition d'énergie entre le fondamental et ses harmoniques (les coefficients an,bn) — c'est ce qui distingue deux instruments jouant la même note."
    ]},
    { test:/pinc[ée]e|point de pincement/i, replies:[
      "Le point où l'on pince une corde détermine quels harmoniques sont excités : pincer exactement au milieu supprime tous les harmoniques pairs, par symétrie."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le point clé sur la différence entre onde stationnaire et onde progressive.",
      "Indice niveau 2 : dans une onde stationnaire, le profil ne se déplace pas.",
      "Indice niveau 3 : les nœuds restent immobiles à des positions fixes."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la décomposition trigonométrique du mode propre dans le cours.",
      "Indice niveau 2 : sin(a)cos(b) se décompose en une somme de deux sinus.",
      "Indice niveau 3 : c'est la somme de deux ondes progressives de sens opposés."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis l'exemple corrigé sur la pincée triangulaire au centre.",
      "Indice niveau 2 : les modes pairs ont un nœud exactement au centre.",
      "Indice niveau 3 : ils ne sont donc pas excités par une pincée symétrique — les harmoniques pairs disparaissent."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
ONDE_CHAPTERS[ondeKey("Énergie, puissance et impédance d'une onde")] = {
  objectives: [
    "Établir les expressions de l'énergie cinétique et potentielle transportées par une onde sur une corde",
    "Calculer la puissance instantanée transportée par une onde progressive",
    "Définir l'impédance caractéristique d'un milieu de propagation",
    "Relier l'impédance à la puissance moyenne transportée par une onde sinusoïdale"
  ],
  prereqs: ["La corde vibrante : équation, conditions aux limites et modes propres", "Ondes planes progressives sinusoïdales et vitesse de phase"],
  bodyHtml: `
    <p>On a établi (chapitre 2) qu'une onde progressive transporte de l'énergie sans transport net de matière. Ce chapitre quantifie précisément ce transport : quelle énergie est stockée localement dans le milieu, à quelle puissance se transmet-elle d'un point à l'autre, et comment le caractériser par une grandeur intrinsèque au milieu, l'<strong>impédance</strong> — un concept qui reviendra de façon centrale au chapitre suivant (réflexion et transmission).</p>

    <h3>1. Densité d'énergie d'une onde sur une corde</h3>
    <p>Considérons de nouveau la corde vibrante du chapitre 4, de masse linéique $\\mu$ et de tension $T_0$. Un petit élément de corde $dx$ possède une <strong>énergie cinétique</strong> $dE_c = \\frac12 \\mu\\,dx\\left(\\dfrac{\\partial y}{\\partial t}\\right)^2$ (liée à sa vitesse transversale) et une <strong>énergie potentielle élastique</strong> $dE_p = \\frac12 T_0\\,dx\\left(\\dfrac{\\partial y}{\\partial x}\\right)^2$ (liée à l'élongation supplémentaire de la corde due à sa courbure — un calcul géométrique standard, omis ici, donnant ce résultat à l'ordre dominant en petites oscillations). La <strong>densité linéique d'énergie</strong> totale est :</p>
    <div class="formula-box">$$e(x,t) = \\frac{1}{2}\\mu\\left(\\frac{\\partial y}{\\partial t}\\right)^2 + \\frac{1}{2}T_0\\left(\\frac{\\partial y}{\\partial x}\\right)^2$$</div>

    <h3>2. Puissance transportée par une onde progressive</h3>
    <p>La <strong>puissance instantanée</strong> $P(x,t)$ transmise à travers un point $x$ de la corde est le travail par unité de temps que la partie de corde située à gauche de $x$ exerce sur la partie de droite, via la tension. On montre (bilan de forces standard, omis) :</p>
    <div class="formula-box">$$P(x,t) = -T_0\\,\\frac{\\partial y}{\\partial x}\\,\\frac{\\partial y}{\\partial t}$$</div>
    <p>Pour une onde <strong>progressive pure</strong> $y(x,t)=f(x-ct)$, on a $\\partial y/\\partial t = -c\\,\\partial y/\\partial x$ (propriété caractéristique d'une onde se propageant sans déformation, chapitre 2), ce qui donne :</p>
    <div class="formula-box">$$P(x,t) = T_0 c\\left(\\frac{\\partial y}{\\partial x}\\right)^2 = \\mu c \\left(\\frac{\\partial y}{\\partial t}\\right)^2 \\geq 0$$</div>
    <p>La puissance transportée par une onde progressive pure est donc toujours <strong>positive</strong> (l'énergie s'écoule dans le sens de propagation), et l'on retrouve — c'est un résultat général qui se vérifie pour toute onde progressive — que les densités d'énergie cinétique et potentielle sont <strong>égales</strong> à chaque instant (équipartition), comme pour un oscillateur harmonique en régime établi.</p>

    <h3>3. Impédance caractéristique</h3>
    <p>On définit l'<strong>impédance caractéristique</strong> du milieu de propagation par :</p>
    <div class="formula-box">$$Z = \\mu c = \\sqrt{\\mu T_0}$$</div>
    <p>Cette grandeur relie directement la force transversale exercée sur un point de la corde à sa vitesse transversale, pour une onde progressive pure : $-T_0\\,\\partial y/\\partial x = Z\\,\\partial y/\\partial t$ (on le vérifie en combinant les deux expressions équivalentes de $P$ ci-dessus). C'est l'analogue mécanique exact de l'impédance électrique $Z=V/I$ reliant tension et courant dans un circuit — d'où le choix du même vocabulaire.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi l'impédance est une grandeur si utile</span>
      L'impédance caractéristique $Z=\\sqrt{\\mu T_0}$ ne dépend <strong>que</strong> des propriétés du milieu (masse linéique, tension), pas de l'onde qui s'y propage. C'est précisément parce qu'elle caractérise le milieu <em>indépendamment</em> de l'onde qu'elle permettra, au chapitre suivant, de prédire ce qui se passe quand une onde change de milieu — un rôle analogue à celui de l'indice optique en optique géométrique.
    </div>

    <h3>4. Puissance moyenne d'une onde sinusoïdale</h3>
    <p>Pour une onde plane progressive sinusoïdale $y(x,t)=A\\cos(kx-\\omega t)$, on calcule $\\partial y/\\partial t = A\\omega\\sin(kx-\\omega t)$, d'où $P(x,t) = \\mu c A^2\\omega^2 \\sin^2(kx-\\omega t)$. En moyennant sur une période temporelle (utilisant $\\langle \\sin^2\\rangle = \\frac12$) :</p>
    <div class="formula-box">$$\\langle P \\rangle = \\frac{1}{2}\\mu c\\,\\omega^2 A^2 = \\frac{1}{2}Z\\,\\omega^2 A^2$$</div>
    <p>La puissance moyenne transportée croît comme le <strong>carré</strong> de l'amplitude et le <strong>carré</strong> de la pulsation — un résultat qui généralise directement à d'autres types d'ondes (acoustiques, chapitre 8 ; électromagnétiques), où l'énergie transportée est systématiquement quadratique en amplitude.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la corde de guitare de l'exemple du chapitre 4 ($\\mu=5\\times10^{-3}\\,\\text{kg/m}$, $T_0=70\\,\\text{N}$, donc $c\\approx 118{,}3\\,\\text{m/s}$) vibre à sa fréquence fondamentale $f_1\\approx 91\\,\\text{Hz}$ avec une amplitude $A=2\\,\\text{mm}$. Estimer la puissance moyenne transportée.</p>
      <p><strong>Solution :</strong> $Z=\\mu c = 5\\times10^{-3}\\times118{,}3 \\approx 0{,}59\\,\\text{kg/s}$ ; $\\omega=2\\pi f_1\\approx 572\\,\\text{rad/s}$. $\\langle P\\rangle = \\frac12 \\times 0{,}59 \\times 572^2 \\times (2\\times10^{-3})^2$.</p>
      <p class="example-answer">$\\langle P\\rangle \\approx 0{,}39\\,\\text{W}$ — un ordre de grandeur physiquement raisonnable pour l'énergie mécanique injectée par une pincée de corde de guitare, rapidement dissipée par rayonnement acoustique et frottements.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Densité d'énergie $e = \\frac12\\mu(\\partial_t y)^2 + \\frac12 T_0(\\partial_x y)^2$ ; puissance instantanée $P=-T_0\\,\\partial_x y\\,\\partial_t y$</li>
        <li>Pour une onde progressive pure : $P=\\mu c(\\partial_t y)^2 \\geq 0$, équipartition entre énergies cinétique et potentielle</li>
        <li>Impédance caractéristique $Z=\\mu c=\\sqrt{\\mu T_0}$ : ne dépend que du milieu, pas de l'onde</li>
        <li>Puissance moyenne d'une OPPS : $\\langle P\\rangle = \\frac12 Z\\omega^2A^2$, quadratique en amplitude et en pulsation</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que $P\\geq 0$ n'est vrai que pour une onde progressive <em>pure</em> : pour une onde stationnaire (superposition de deux ondes contra-propagatives), la puissance instantanée oscille et change de signe</li>
        <li>Confondre puissance instantanée $P(x,t)$ (qui oscille dans le temps pour une OPPS) et puissance moyenne $\\langle P\\rangle$ (constante)</li>
        <li>Oublier le facteur $\\frac12$ dans $\\langle P\\rangle$, qui vient de la moyenne temporelle de $\\sin^2$ ou $\\cos^2$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'impédance caractéristique d'une corde de masse linéique $\\mu$ et de tension $T_0$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde6e1" value="wrong"> $Z = T_0/\\mu$</label>
          <label class="option"><input type="radio" name="onde6e1" value="right"> $Z = \\sqrt{\\mu T_0}$</label>
          <label class="option"><input type="radio" name="onde6e1" value="wrong"> $Z = \\mu/T_0$</label>
          <label class="option"><input type="radio" name="onde6e1" value="wrong"> $Z = \\mu + T_0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde6e1','onde6fb1','Correct — Z=μc=√(μT0), qui ne dépend que des propriétés du milieu.','Relis la définition de l\\'impédance caractéristique dans le cours.')">Vérifier</button>
        <div class="feedback" id="onde6fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une onde plane progressive sinusoïdale d'amplitude $A$, la puissance moyenne transportée $\\langle P\\rangle$ varie comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde6e2" value="wrong"> $A$</label>
          <label class="option"><input type="radio" name="onde6e2" value="right"> $A^2$</label>
          <label class="option"><input type="radio" name="onde6e2" value="wrong"> $\\sqrt A$</label>
          <label class="option"><input type="radio" name="onde6e2" value="wrong"> $1/A$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde6e2','onde6fb2','Correct — ⟨P⟩=½Zω²A² : la puissance transportée croît comme le carré de l\\'amplitude, un résultat général en physique des ondes.','Relis la formule encadrée du cours pour ⟨P⟩ : quelle est la puissance de A dedans ?')">Vérifier</button>
        <div class="feedback" id="onde6fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une onde progressive pure sur une corde, les densités d'énergie cinétique et potentielle sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde6e3" value="wrong"> toujours de signe opposé</label>
          <label class="option"><input type="radio" name="onde6e3" value="right"> égales à chaque instant (équipartition)</label>
          <label class="option"><input type="radio" name="onde6e3" value="wrong"> l'énergie cinétique est toujours nulle</label>
          <label class="option"><input type="radio" name="onde6e3" value="wrong"> l'énergie potentielle est toujours nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde6e3','onde6fb3','Correct — pour une onde progressive pure, ∂ty=−c∂xy, ce qui rend les deux contributions à la densité d\\'énergie identiques à chaque instant : c\\'est l\\'équipartition, comme pour un oscillateur harmonique en régime établi.','Utilise la relation ∂ty=−c∂xy propre à une onde progressive pure, et compare les deux termes de la densité d\\'énergie.')">Vérifier</button>
        <div class="feedback" id="onde6fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("Énergie, puissance et impédance d'une onde")] = {
  intro: "Salut, c'est Nova ! On quantifie l'énergie et la puissance transportées par une onde, et on introduit l'impédance caractéristique. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/imp[ée]dance/i, replies:[
      "L'impédance caractéristique Z=μc=√(μT0) ne dépend que du milieu (masse linéique, tension), pas de l'onde qui s'y propage — c'est l'analogue mécanique de l'impédance électrique V/I."
    ]},
    { test:/puissance/i, replies:[
      "Pour une onde progressive pure, P=μc(∂ty)²≥0 ; en moyenne pour une OPPS, ⟨P⟩=½Zω²A², proportionnelle au carré de l'amplitude et de la pulsation."
    ]},
    { test:/[ée]quipartition|[ée]nergie cin[ée]tique/i, replies:[
      "Pour une onde progressive pure, les densités d'énergie cinétique et potentielle sont égales à chaque instant (équipartition) — une conséquence directe de ∂ty=−c∂xy."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition de l'impédance caractéristique.",
      "Indice niveau 2 : c'est une racine carrée d'un produit.",
      "Indice niveau 3 : Z=√(μT0)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule encadrée du cours pour ⟨P⟩.",
      "Indice niveau 2 : regarde la puissance de A dans la formule.",
      "Indice niveau 3 : ⟨P⟩ varie comme A²."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : utilise ∂ty=−c∂xy propre à une onde progressive pure et compare les deux termes de densité d'énergie.",
      "Indice niveau 2 : cette relation rend les deux contributions identiques.",
      "Indice niveau 3 : c'est l'équipartition entre énergie cinétique et potentielle."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
ONDE_CHAPTERS[ondeKey("Réflexion et transmission à une discontinuité")] = {
  objectives: [
    "Écrire les conditions de raccordement à une discontinuité d'impédance",
    "Établir les coefficients de réflexion et de transmission en amplitude",
    "Distinguer réflexion avec et sans changement de signe selon le rapport des impédances",
    "Calculer les coefficients de réflexion et transmission en puissance et vérifier leur bilan"
  ],
  prereqs: ["Énergie, puissance et impédance d'une onde"],
  bodyHtml: `
    <p>Une onde qui rencontre un changement des propriétés du milieu — un changement de corde (guitare), une discontinuité de section d'un tuyau (chapitre 8), ou plus généralement tout changement d'impédance — se divise en une partie <strong>réfléchie</strong> et une partie <strong>transmise</strong>. Ce chapitre établit les lois quantitatives de ce partage, directement à partir de l'impédance introduite au chapitre précédent.</p>

    <h3>1. Position du problème : deux milieux semi-infinis</h3>
    <p>Considérons deux cordes semi-infinies, d'impédances $Z_1$ (pour $x<0$) et $Z_2$ (pour $x>0$), raccordées en $x=0$. Une onde incidente $y_i(x,t) = A_i\\,e^{i(k_1x-\\omega t)}$ arrive du milieu 1 vers la discontinuité. Elle donne naissance à une onde <strong>réfléchie</strong> $y_r(x,t)=A_r\\,e^{i(-k_1x-\\omega t)}$ (repartant vers $x<0$) dans le milieu 1, et une onde <strong>transmise</strong> $y_t(x,t)=A_t\\,e^{i(k_2x-\\omega t)}$ dans le milieu 2 (aucune onde ne revient du milieu 2, supposé infini).</p>

    <h3>2. Conditions de raccordement</h3>
    <p>À la discontinuité $x=0$, deux conditions physiques doivent être satisfaites à tout instant :</p>
    <ul>
      <li><strong>Continuité du déplacement</strong> (la corde ne se rompt pas) : $y_i(0,t)+y_r(0,t) = y_t(0,t)$, soit $A_i+A_r=A_t$</li>
      <li><strong>Continuité de la force transversale</strong> (troisième loi de Newton à la jonction, pas de force ponctuelle infinie) : cette condition s'exprime, en utilisant la relation force-vitesse via l'impédance (chapitre 6), comme $Z_1(A_i-A_r) = Z_2 A_t$</li>
    </ul>

    <h3>3. Coefficients de réflexion et de transmission en amplitude</h3>
    <p>En résolvant ce système linéaire de deux équations à deux inconnues ($A_r,A_t$ en fonction de $A_i$) :</p>
    <div class="formula-box">$$\\boxed{\\ r \\equiv \\frac{A_r}{A_i} = \\frac{Z_1-Z_2}{Z_1+Z_2}, \\qquad t \\equiv \\frac{A_t}{A_i} = \\frac{2Z_1}{Z_1+Z_2}\\ }$$</div>
    <table class="mini-table">
      <tr><th>Cas</th><th>Signe de $r$</th><th>Interprétation physique</th></tr>
      <tr><td>$Z_2 > Z_1$ (milieu 2 « plus dense »)</td><td>$r<0$</td><td>réflexion avec <strong>inversion de signe</strong> (déphasage de $\\pi$)</td></tr>
      <tr><td>$Z_2 < Z_1$ (milieu 2 « moins dense »)</td><td>$r>0$</td><td>réflexion <strong>sans</strong> inversion de signe</td></tr>
      <tr><td>$Z_2 \\to \\infty$ (extrémité fixe, mur rigide)</td><td>$r=-1$</td><td>réflexion totale, inversée — le cas de la corde fixée du chapitre 4</td></tr>
      <tr><td>$Z_2 = 0$ (extrémité libre)</td><td>$r=+1$</td><td>réflexion totale, sans inversion</td></tr>
      <tr><td>$Z_2 = Z_1$ (milieux identiques)</td><td>$r=0$</td><td>aucune réflexion, transmission totale : les milieux sont <strong>adaptés en impédance</strong></td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — adaptation d'impédance</span>
      Le cas $Z_1=Z_2$ (aucune réflexion) est le principe de l'<strong>adaptation d'impédance</strong>, omniprésent en ingénierie : on cherche à égaliser les impédances de deux systèmes en contact (ampli/haut-parleur, ligne de transmission/antenne) précisément pour maximiser le transfert d'énergie et minimiser les réflexions parasites.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — extrémité fixe</span>
      <p><strong>Énoncé :</strong> retrouver, à partir de la formule générale, pourquoi une onde se réfléchit avec un signe $-1$ sur une extrémité fixe (le cas déjà utilisé implicitement au chapitre 4).</p>
      <p><strong>Solution :</strong> une extrémité fixe correspond à une impédance infinie ($Z_2\\to\\infty$, la paroi ne peut absorber aucune vitesse, aussi grande que soit la force). $r = \\dfrac{Z_1-Z_2}{Z_1+Z_2} \\xrightarrow[Z_2\\to\\infty]{} \\dfrac{-Z_2}{Z_2} = -1$.</p>
      <p class="example-answer">$r=-1$ : réflexion totale avec changement de signe — c'est exactement la condition $y(L,t)=0$ imposée « à la main » au chapitre 4, ici retrouvée comme un cas limite de la théorie générale de la réflexion.</p>
    </div>

    <h3>4. Coefficients en puissance et bilan énergétique</h3>
    <p>En utilisant $\\langle P\\rangle \\propto Z\\omega^2A^2$ (chapitre 6), on définit les coefficients de réflexion et de transmission <strong>en puissance</strong> :</p>
    <div class="formula-box">$$R = \\frac{\\langle P_r\\rangle}{\\langle P_i\\rangle} = r^2 = \\left(\\frac{Z_1-Z_2}{Z_1+Z_2}\\right)^2, \\qquad T = \\frac{\\langle P_t\\rangle}{\\langle P_i\\rangle} = \\frac{Z_2}{Z_1}\\,t^2 = \\frac{4Z_1Z_2}{(Z_1+Z_2)^2}$$</div>
    <p>On vérifie (calcul algébrique direct) la <strong>conservation de l'énergie</strong> à l'interface :</p>
    <div class="formula-box">$$R + T = 1$$</div>
    <p>— toute la puissance incidente se retrouve, sans perte, répartie entre l'onde réfléchie et l'onde transmise (l'interface elle-même, ponctuelle et sans masse, ne peut ni stocker ni dissiper d'énergie).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Coefficients en amplitude : $r=(Z_1-Z_2)/(Z_1+Z_2)$, $t=2Z_1/(Z_1+Z_2)$, obtenus par continuité du déplacement et de la force</li>
        <li>$Z_2>Z_1$ : réflexion avec inversion de signe ; $Z_2<Z_1$ : sans inversion ; $Z_1=Z_2$ : pas de réflexion (adaptation d'impédance)</li>
        <li>Extrémité fixe $\\Leftrightarrow Z_2\\to\\infty \\Rightarrow r=-1$ ; extrémité libre $\\Leftrightarrow Z_2=0 \\Rightarrow r=+1$</li>
        <li>Coefficients en puissance $R=r^2$, $T=(Z_2/Z_1)t^2$, avec $R+T=1$ (conservation de l'énergie)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre coefficient en amplitude $r,t$ (qui peuvent être négatifs) et coefficient en puissance $R,T$ (toujours positifs, entre 0 et 1)</li>
        <li>Oublier le facteur $Z_2/Z_1$ dans $T=(Z_2/Z_1)t^2$ : ce n'est pas simplement $t^2$, contrairement à $R=r^2$</li>
        <li>Croire que $r+t=1$ : c'est $R+T=1$ (en puissance) qui exprime la conservation de l'énergie, pas une relation directe entre $r$ et $t$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Si $Z_2 > Z_1$, l'onde réfléchie subit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde7e1" value="wrong"> aucun changement de signe</label>
          <label class="option"><input type="radio" name="onde7e1" value="right"> une inversion de signe (déphasage de $\\pi$)</label>
          <label class="option"><input type="radio" name="onde7e1" value="wrong"> une amplification infinie</label>
          <label class="option"><input type="radio" name="onde7e1" value="wrong"> une transmission totale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde7e1','onde7fb1','Correct — pour Z2>Z1, r=(Z1−Z2)/(Z1+Z2) est négatif : c\\'est une réflexion avec inversion de signe, comme sur une extrémité fixe.','Relis le tableau du cours reliant signe de r et rapport des impédances.')">Vérifier</button>
        <div class="feedback" id="onde7fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si $Z_1=Z_2$ (adaptation d'impédance), les coefficients en puissance valent :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde7e2" value="wrong"> $R=1$, $T=0$</label>
          <label class="option"><input type="radio" name="onde7e2" value="right"> $R=0$, $T=1$</label>
          <label class="option"><input type="radio" name="onde7e2" value="wrong"> $R=T=0{,}5$</label>
          <label class="option"><input type="radio" name="onde7e2" value="wrong"> $R=T=1$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde7e2','onde7fb2','Correct — avec Z1=Z2, r=0 donc R=0, et toute la puissance est transmise : T=1. C\\'est exactement le principe de l\\'adaptation d\\'impédance.','Reporte Z1=Z2 dans les formules de r et de R.')">Vérifier</button>
        <div class="feedback" id="onde7fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Les coefficients en puissance $R$ et $T$ vérifient toujours :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde7e3" value="wrong"> $R \\times T = 1$</label>
          <label class="option"><input type="radio" name="onde7e3" value="right"> $R + T = 1$</label>
          <label class="option"><input type="radio" name="onde7e3" value="wrong"> $R - T = 1$</label>
          <label class="option"><input type="radio" name="onde7e3" value="wrong"> $R = T$ toujours</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde7e3','onde7fb3','Correct — R+T=1 exprime la conservation de l\\'énergie à l\\'interface : toute la puissance incidente se retrouve dans les ondes réfléchie et transmise.','Relis le paragraphe du cours sur le bilan énergétique à l\\'interface.')">Vérifier</button>
        <div class="feedback" id="onde7fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("Réflexion et transmission à une discontinuité")] = {
  intro: "Salut, moi c'est Nova ! On étudie la réflexion et la transmission d'une onde à un changement d'impédance. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/coefficient de r[ée]flexion|coefficient de transmission|r\s*=|t\s*=/i, replies:[
      "r=(Z1−Z2)/(Z1+Z2) et t=2Z1/(Z1+Z2), obtenus par continuité du déplacement et de la force à la discontinuité."
    ]},
    { test:/adaptation d.imp[ée]dance/i, replies:[
      "Quand Z1=Z2 (adaptation d'impédance), r=0 : pas de réflexion, toute l'énergie est transmise. C'est un principe central en ingénierie pour maximiser le transfert d'énergie."
    ]},
    { test:/extr[ée]mit[ée] fixe|extr[ée]mit[ée] libre/i, replies:[
      "Une extrémité fixe correspond à Z2→∞, donnant r=−1 (réflexion totale inversée). Une extrémité libre correspond à Z2=0, donnant r=+1 (réflexion totale sans inversion)."
    ]},
    { test:/R\s*\+\s*T|conservation.*[ée]nergie/i, replies:[
      "R+T=1 exprime la conservation de l'énergie à l'interface : toute la puissance incidente se répartit, sans perte, entre l'onde réfléchie (R) et l'onde transmise (T)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le tableau du cours reliant signe de r et rapport des impédances.",
      "Indice niveau 2 : si Z2>Z1, le numérateur Z1−Z2 est négatif.",
      "Indice niveau 3 : c'est une réflexion avec inversion de signe."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : reporte Z1=Z2 dans les formules de r et R.",
      "Indice niveau 2 : r devient nul.",
      "Indice niveau 3 : R=0 et T=1 (toute la puissance est transmise)."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le paragraphe du cours sur le bilan énergétique.",
      "Indice niveau 2 : c'est une somme, pas un produit.",
      "Indice niveau 3 : R+T=1."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
ONDE_CHAPTERS[ondeKey("Ondes acoustiques dans les fluides")] = {
  objectives: [
    "Établir l'équation d'onde acoustique à partir des équations de la mécanique des fluides",
    "Identifier l'expression de la célérité du son en fonction de la compressibilité du fluide",
    "Relier surpression et vitesse acoustique par l'impédance acoustique",
    "Retrouver les modes propres d'une colonne d'air (tuyau sonore) selon ses conditions aux limites"
  ],
  prereqs: ["Réflexion et transmission à une discontinuité", "Bilan de masse et équation de continuité (Mécanique des fluides)", "Dynamique des fluides parfaits : équation d'Euler (Mécanique des fluides)"],
  bodyHtml: `
    <p>Après la corde vibrante, second exemple physique majeur de l'équation d'onde : le <strong>son</strong>, propagation d'une perturbation de pression dans un fluide. Ce chapitre relie directement le cours de mécanique des fluides (équation de continuité, équation d'Euler) à l'équation de d'Alembert établie dès le chapitre 1, retrouvant ainsi, dans un contexte différent, exactement la même structure mathématique.</p>

    <h3>1. Linéarisation des équations du fluide autour du repos</h3>
    <p>On considère un fluide au repos, de masse volumique $\\rho_0$ et de pression $p_0$ uniformes, perturbé par une onde sonore de faible amplitude : $\\rho = \\rho_0+\\rho'(x,t)$, $p=p_0+p'(x,t)$ (la <strong>surpression</strong> acoustique), avec une vitesse $v(x,t)$ petite (le fluide, au repos avant le passage de l'onde, n'a qu'un mouvement d'oscillation de faible amplitude). En linéarisant l'équation de continuité $\\partial_t\\rho+\\partial_x(\\rho v)=0$ (mécanique des fluides, chapitre 3) et l'équation d'Euler $\\rho\\,\\partial_tv = -\\partial_xp$ (chapitre 4, en négligeant le terme convectif non linéaire $v\\partial_xv$, du second ordre en perturbation), on obtient :</p>
    <div class="formula-box">$$\\frac{\\partial \\rho'}{\\partial t} + \\rho_0\\,\\frac{\\partial v}{\\partial x} = 0, \\qquad \\rho_0\\,\\frac{\\partial v}{\\partial t} = -\\frac{\\partial p'}{\\partial x}$$</div>

    <h3>2. Fermeture thermodynamique et équation d'onde</h3>
    <p>Ces deux équations font intervenir trois inconnues ($\\rho',p',v$) : il faut une relation supplémentaire, de nature thermodynamique, reliant $p'$ et $\\rho'$. Pour une onde sonore, les compressions et détentes sont suffisamment rapides pour être <strong>adiabatiques</strong> (pas d'échange de chaleur entre zones comprimées et détendues) : $p' = c_s^2\\,\\rho'$, où $c_s^2 = \\left(\\dfrac{\\partial p}{\\partial \\rho}\\right)_{S}$ est évaluée à l'équilibre. En combinant les trois équations (dérivation de la première par rapport à $t$, de la deuxième par rapport à $x$, et élimination de $v$), on obtient exactement l'équation de d'Alembert pour la surpression :</p>
    <div class="formula-box">$$\\boxed{\\ \\frac{\\partial^2 p'}{\\partial t^2} = c_s^2\\,\\frac{\\partial^2 p'}{\\partial x^2}\\ }$$</div>
    <p>Pour un <strong>gaz parfait</strong>, la relation adiabatique $p\\rho^{-\\gamma}=\\text{cste}$ (avec $\\gamma=C_p/C_v$) donne $c_s^2 = \\gamma p_0/\\rho_0 = \\gamma RT/M$ (via l'équation d'état des gaz parfaits) :</p>
    <div class="formula-box">$$c_s = \\sqrt{\\frac{\\gamma RT}{M}}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi le son va plus vite dans l'air chaud</span>
      La célérité du son dans l'air ne dépend, à composition fixée, que de la <strong>température</strong> $T$ (pas de la pression atmosphérique, qui n'apparaît pas séparément) : $c_s \\propto \\sqrt T$. C'est ce qui explique, par exemple, la légère variation de la hauteur des instruments à vent selon la température ambiante.
    </div>

    <h3>3. Impédance acoustique</h3>
    <p>Par analogie exacte avec le chapitre 6 (impédance mécanique de la corde), on définit l'<strong>impédance acoustique caractéristique</strong> :</p>
    <div class="formula-box">$$Z_{ac} = \\rho_0 c_s$$</div>
    <p>qui relie surpression et vitesse acoustique pour une onde progressive pure : $p' = Z_{ac}\\,v$. Pour l'air dans les conditions usuelles, $Z_{ac} \\approx 1{,}2 \\times 340 \\approx 400\\,\\text{kg}\\cdot\\text{m}^{-2}\\cdot\\text{s}^{-1}$ (l'unité usuelle est le <em>rayl</em>). C'est cette impédance qui gouverne, exactement comme au chapitre 7, la réflexion et la transmission du son à travers une interface entre deux milieux (air/eau, air/paroi) — avec un très fort contraste d'impédance entre l'air et l'eau ($Z_{eau}/Z_{air} \\approx 3600$), ce qui explique pourquoi la quasi-totalité du son incident depuis l'air se réfléchit à la surface de l'eau.</p>

    <h3>4. Modes propres d'un tuyau sonore</h3>
    <p>Comme pour la corde (chapitre 4), un tuyau de longueur $L$ contenant de l'air possède des modes propres, avec des conditions aux limites <strong>différentes</strong> selon que chaque extrémité est <strong>fermée</strong> (paroi rigide, la vitesse acoustique $v$ s'y annule : nœud de vitesse, ventre de pression) ou <strong>ouverte</strong> (la surpression $p'$ s'y annule approximativement : ventre de vitesse, nœud de pression).</p>
    <table class="mini-table">
      <tr><th>Configuration</th><th>Fréquences propres</th><th>Exemple</th></tr>
      <tr><td>Tuyau fermé aux deux bouts (ou ouvert aux deux bouts)</td><td>$f_n = \\dfrac{nc_s}{2L}$, $n=1,2,3,\\ldots$</td><td>orgue à tuyau ouvert, corde de guitare (chapitre 4)</td></tr>
      <tr><td>Tuyau fermé à un bout, ouvert à l'autre</td><td>$f_n = \\dfrac{(2n-1)c_s}{4L}$, $n=1,2,3,\\ldots$ (harmoniques impairs seulement)</td><td>clarinette (en première approximation)</td></tr>
    </table>
    <p>La différence entre les deux séries de fréquences (harmoniques tous entiers, ou seulement impairs) explique une partie importante des différences de timbre entre familles d'instruments à vent.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un tuyau fermé à un bout, ouvert à l'autre, a une longueur $L=0{,}5\\,\\text{m}$ ; $c_s=340\\,\\text{m/s}$. Calculer sa fréquence fondamentale.</p>
      <p><strong>Solution :</strong> avec $n=1$ dans la formule du tuyau mixte : $f_1 = \\dfrac{c_s}{4L} = \\dfrac{340}{4\\times 0{,}5} = \\dfrac{340}{2}$.</p>
      <p class="example-answer">$f_1 = 170\\,\\text{Hz}$ — à comparer à $f_1=c_s/(2L)=340\\,\\text{Hz}$ qu'aurait donné le même tuyau ouvert aux deux bouts : fermer une extrémité <strong>divise par deux</strong> la fréquence fondamentale, à longueur égale.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La linéarisation des équations de continuité et d'Euler, plus la relation adiabatique $p'=c_s^2\\rho'$, donne l'équation d'onde acoustique pour $p'$</li>
        <li>Célérité du son dans un gaz parfait : $c_s=\\sqrt{\\gamma RT/M}$, ne dépend que de la température (pas de la pression)</li>
        <li>Impédance acoustique $Z_{ac}=\\rho_0c_s$ ; fort contraste air/eau expliquant la forte réflexion à la surface de l'eau</li>
        <li>Tuyau fermé-fermé ou ouvert-ouvert : $f_n=nc_s/2L$ (tous harmoniques) ; tuyau fermé-ouvert : $f_n=(2n-1)c_s/4L$ (harmoniques impairs seulement)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $c_s$ dépend de la pression atmosphérique : pour un gaz parfait, seule la température compte</li>
        <li>Confondre les conditions aux limites en pression et en vitesse : une extrémité fermée est un nœud de <em>vitesse</em> (mais ventre de pression), l'inverse pour une extrémité ouverte</li>
        <li>Appliquer la formule du tuyau ouvert-ouvert à un tuyau fermé-ouvert (ou l'inverse) : les deux séries de fréquences propres sont différentes</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La célérité du son dans un gaz parfait dépend principalement de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde8e1" value="wrong"> la pression atmosphérique</label>
          <label class="option"><input type="radio" name="onde8e1" value="right"> la température</label>
          <label class="option"><input type="radio" name="onde8e1" value="wrong"> l'altitude uniquement</label>
          <label class="option"><input type="radio" name="onde8e1" value="wrong"> l'humidité uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde8e1','onde8fb1','Correct — cs=√(γRT/M) ne dépend, pour un gaz parfait de composition donnée, que de la température T.','Relis la formule de cs pour un gaz parfait : quelle variable thermodynamique y apparaît ?')">Vérifier</button>
        <div class="feedback" id="onde8fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une extrémité fermée (paroi rigide) d'un tuyau sonore correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde8e2" value="wrong"> un ventre de vitesse</label>
          <label class="option"><input type="radio" name="onde8e2" value="right"> un nœud de vitesse (ventre de pression)</label>
          <label class="option"><input type="radio" name="onde8e2" value="wrong"> un nœud de pression</label>
          <label class="option"><input type="radio" name="onde8e2" value="wrong"> ni l'un ni l'autre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde8e2','onde8fb2','Correct — une paroi rigide impose une vitesse nulle (nœud de vitesse), ce qui correspond à un ventre de pression (surpression maximale).','Réfléchis physiquement : l\\'air peut-il avoir une vitesse non nulle contre une paroi rigide ?')">Vérifier</button>
        <div class="feedback" id="onde8fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un tuyau fermé-ouvert de longueur $L$ a une fréquence fondamentale, comparée à un tuyau ouvert-ouvert de même longueur :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde8e3" value="wrong"> identique</label>
          <label class="option"><input type="radio" name="onde8e3" value="right"> deux fois plus basse</label>
          <label class="option"><input type="radio" name="onde8e3" value="wrong"> deux fois plus haute</label>
          <label class="option"><input type="radio" name="onde8e3" value="wrong"> quatre fois plus haute</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde8e3','onde8fb3','Correct — f1=cs/(4L) pour fermé-ouvert contre f1=cs/(2L) pour ouvert-ouvert : c\\'est exactement deux fois plus bas, comme dans l\\'exemple corrigé du cours.','Compare les deux formules du tableau du cours : cs/(4L) contre cs/(2L).')">Vérifier</button>
        <div class="feedback" id="onde8fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("Ondes acoustiques dans les fluides")] = {
  intro: "Salut, moi c'est Nova ! On relie mécanique des fluides et ondes sonores. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/c[ée]l[ée]rit[ée] du son|vitesse du son/i, replies:[
      "cs=√(γRT/M) pour un gaz parfait : la célérité du son ne dépend, à composition fixée, que de la température — pas de la pression atmosphérique."
    ]},
    { test:/imp[ée]dance acoustique/i, replies:[
      "L'impédance acoustique Zac=ρ0cs relie surpression et vitesse acoustique (p'=Zac·v), exactement comme Z=μc pour la corde. Le fort contraste air/eau explique la forte réflexion du son à la surface de l'eau."
    ]},
    { test:/tuyau|colonne d.air/i, replies:[
      "Un tuyau fermé aux deux bouts (ou ouvert aux deux bouts) a fn=ncs/2L (tous harmoniques). Un tuyau fermé-ouvert a fn=(2n−1)cs/4L (harmoniques impairs seulement, fondamentale deux fois plus basse à longueur égale)."
    ]},
    { test:/adiabatique/i, replies:[
      "Les compressions/détentes d'une onde sonore sont assez rapides pour être adiabatiques (p'=cs²ρ'), sans échange de chaleur — c'est cette relation thermodynamique qui ferme le système d'équations et fait apparaître cs."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule de cs pour un gaz parfait.",
      "Indice niveau 2 : quelle variable thermodynamique y apparaît explicitement ?",
      "Indice niveau 3 : c'est la température T."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : réfléchis physiquement — l'air peut-il bouger contre une paroi rigide ?",
      "Indice niveau 2 : non, la vitesse y est forcément nulle.",
      "Indice niveau 3 : c'est un nœud de vitesse, donc un ventre de pression."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : compare les deux formules du tableau du cours.",
      "Indice niveau 2 : cs/(4L) contre cs/(2L).",
      "Indice niveau 3 : le tuyau fermé-ouvert a une fondamentale deux fois plus basse."
    ]}
  ]
};

/* =========================== CHAPITRE 9 =========================== */
ONDE_CHAPTERS[ondeKey("Dispersion, vitesse de groupe et paquets d'ondes")] = {
  objectives: [
    "Définir un milieu dispersif à partir d'une relation de dispersion non linéaire",
    "Construire un paquet d'ondes par superposition d'ondes planes de fréquences voisines",
    "Distinguer vitesse de phase et vitesse de groupe et interpréter leur écart",
    "Relier la vitesse de groupe à la propagation de l'énergie et de l'information"
  ],
  prereqs: ["Ondes planes progressives sinusoïdales et vitesse de phase", "De la chaîne d'oscillateurs couplés au milieu continu"],
  bodyHtml: `
    <p>Ce dernier chapitre revient sur une simplification faite dès le chapitre 1 : la relation de dispersion linéaire $\\omega=ck$, valable uniquement à la limite des grandes longueurs d'onde de la chaîne discrète. Dans de nombreux milieux physiques réels — et pour la chaîne discrète elle-même, dès qu'on ne se limite plus aux grandes longueurs d'onde — la relation $\\omega(k)$ n'est <strong>pas</strong> linéaire : on parle de <strong>dispersion</strong>. Ce phénomène, loin d'être un détail technique, change qualitativement la façon dont un signal se propage.</p>

    <h3>1. Milieux dispersifs</h3>
    <p>Un milieu est dit <strong>dispersif</strong> si sa relation de dispersion $\\omega(k)$ n'est pas proportionnelle à $k$ — autrement dit, si la vitesse de phase $v_\\varphi=\\omega/k$ dépend de $k$ (donc de la longueur d'onde). C'est le cas, par exemple, pour la chaîne discrète du chapitre 1 dès qu'on sort du régime des grandes longueurs d'onde ($\\omega(q)=2\\sqrt{k/m}|\\sin(qa/2)|$, non linéaire en $q$), pour les ondes de gravité à la surface de l'eau, ou pour la lumière traversant un milieu transparent comme le verre (dispersion chromatique, responsable de la décomposition de la lumière par un prisme).</p>

    <h3>2. Construction d'un paquet d'ondes</h3>
    <p>Une onde plane sinusoïdale parfaitement monochromatique, de fréquence unique, s'étend sur tout l'espace et tout le temps — un objet purement mathématique, jamais rencontré physiquement (toute source réelle est allumée puis éteinte). Un signal <strong>localisé</strong> dans l'espace et le temps se construit par <strong>superposition</strong> d'ondes planes de nombres d'onde voisins, centrés autour d'une valeur $k_0$ :</p>
    <div class="formula-box">$$u(x,t) = \\int A(k)\\,e^{i(kx-\\omega(k)t)}\\,dk$$</div>
    <p>où $A(k)$ est une fonction (souvent une gaussienne étroite) qui pondère les contributions autour de $k_0$ : c'est un <strong>paquet d'ondes</strong>. Considérons le cas simple d'une superposition de seulement <strong>deux</strong> ondes de nombres d'onde voisins $k_0\\pm dk/2$ et de pulsations $\\omega_0\\pm d\\omega/2$, de même amplitude $A$ :</p>
    <div class="formula-box">$$u(x,t) = A\\cos\\!\\left[\\left(k_0-\\frac{dk}{2}\\right)x-\\left(\\omega_0-\\frac{d\\omega}{2}\\right)t\\right] + A\\cos\\!\\left[\\left(k_0+\\frac{dk}{2}\\right)x-\\left(\\omega_0+\\frac{d\\omega}{2}\\right)t\\right]$$</div>
    <p>En utilisant la formule de somme de deux cosinus ($\\cos p+\\cos q = 2\\cos\\frac{p-q}{2}\\cos\\frac{p+q}{2}$) :</p>
    <div class="formula-box">$$u(x,t) = 2A\\,\\underbrace{\\cos\\!\\left(\\frac{dk}{2}x-\\frac{d\\omega}{2}t\\right)}_{\\text{enveloppe, lente}}\\,\\underbrace{\\cos(k_0x-\\omega_0t)}_{\\text{porteuse, rapide}}$$</div>

    <h3>3. Vitesse de phase et vitesse de groupe</h3>
    <p>Cette expression révèle deux échelles de variation bien distinctes : une <strong>porteuse</strong> rapide, oscillant à $k_0,\\omega_0$, se déplaçant à la vitesse de phase $v_\\varphi=\\omega_0/k_0$ (chapitre 3) ; et une <strong>enveloppe</strong> lente, modulant l'amplitude, se déplaçant à une vitesse différente :</p>
    <div class="formula-box">$$\\boxed{\\ v_g = \\frac{d\\omega}{dk}\\bigg|_{k_0}\\ } \\qquad \\text{(vitesse de groupe)}$$</div>
    <p>obtenue en généralisant à un paquet continu (pas seulement deux fréquences) le résultat de la superposition ci-dessus.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi la distinction est essentielle</span>
      Dans un milieu <strong>non dispersif</strong> ($\\omega=ck$), $v_g = d\\omega/dk = c = v_\\varphi$ : les deux vitesses coïncident, comme implicitement supposé aux chapitres 2 à 8. Dans un milieu <strong>dispersif</strong>, $v_g \\neq v_\\varphi$ en général : la porteuse et l'enveloppe se propagent à des vitesses différentes — un paquet d'ondes se <strong>déforme</strong> en se propageant (les composantes de fréquences différentes se déphasent progressivement les unes par rapport aux autres), contrairement au profil rigide $f(x-ct)$ du chapitre 2.
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <path d="M10,45 Q30,15 50,45 Q70,75 90,45 Q110,15 130,45" stroke="#5A6472" stroke-width="1" fill="none" opacity="0.5"/>
          <path d="M10,45 C15,35 20,35 25,45 C30,55 35,55 40,45 C45,35 50,35 55,45 C60,55 65,55 70,45 C75,35 80,35 85,45 C90,55 95,55 100,45 C105,35 110,35 115,45 C120,55 125,55 130,45" stroke="#4C7CFF" stroke-width="1.2" fill="none"/>
        </svg>
        <span>enveloppe (lente, en gris) modulant la porteuse (rapide, en bleu)</span>
      </div>
    </div>

    <h3>4. Vitesse de groupe et transport de l'énergie et de l'information</h3>
    <p>C'est la vitesse de groupe $v_g$, et non la vitesse de phase $v_\\varphi$, qui correspond physiquement à la vitesse de propagation de l'<strong>énergie</strong> et de l'<strong>information</strong> transportées par le paquet d'ondes (un point de phase constante, lui, ne transporte rien de mesurable isolément — seule l'enveloppe, qui module l'amplitude donc l'intensité observable, porte un signal exploitable). Cette distinction, purement académique dans le cadre non dispersif de ce cours, devient physiquement cruciale ailleurs en physique : c'est elle qui permet, par exemple, de concilier l'existence de vitesses de phase supraluminiques dans certains milieux dispersifs avec le principe de causalité relativiste — c'est $v_g$ (ou plus précisément la vitesse du front du signal) qui reste bornée par $c$, jamais $v_\\varphi$.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un milieu a pour relation de dispersion $\\omega(k) = \\omega_0\\sqrt{1+a^2k^2}$ ($\\omega_0,a$ constants). Calculer $v_\\varphi$ et $v_g$ pour $k\\to 0$ (grandes longueurs d'onde).</p>
      <p><strong>Solution :</strong> $v_\\varphi = \\omega/k = \\omega_0\\sqrt{1+a^2k^2}/k \\to \\infty$ quand $k\\to 0$ (la vitesse de phase diverge). $v_g = d\\omega/dk = \\dfrac{\\omega_0 a^2k}{\\sqrt{1+a^2k^2}} \\to 0$ quand $k\\to 0$.</p>
      <p class="example-answer">$v_\\varphi\\to\\infty$ mais $v_g\\to 0$ : un exemple explicite où les deux vitesses divergent radicalement, illustrant qu'aucune contradiction physique n'apparaît puisque c'est $v_g$ (finie, voire nulle ici) qui gouverne le transport réel d'énergie.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un milieu est dispersif si $\\omega(k)$ n'est pas proportionnelle à $k$, c'est-à-dire si $v_\\varphi=\\omega/k$ dépend de $k$</li>
        <li>Un paquet d'ondes (signal localisé) se construit par superposition d'ondes planes de $k$ voisins ; il possède une porteuse rapide et une enveloppe lente</li>
        <li>Vitesse de groupe $v_g=d\\omega/dk$, en général différente de la vitesse de phase $v_\\varphi=\\omega/k$ dans un milieu dispersif</li>
        <li>C'est $v_g$, pas $v_\\varphi$, qui correspond à la propagation physique de l'énergie et de l'information</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $v_\\varphi=v_g$ toujours : ce n'est vrai que dans un milieu non dispersif</li>
        <li>Confondre porteuse (oscillation rapide à $k_0,\\omega_0$) et enveloppe (modulation lente, qui porte l'information)</li>
        <li>Penser qu'une vitesse de phase supérieure à $c$ viole la relativité : c'est la vitesse de groupe (ou du front du signal) qui est physiquement bornée, pas $v_\\varphi$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un milieu est dit dispersif si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde9e1" value="wrong"> $\\omega(k)$ est proportionnelle à $k$</label>
          <label class="option"><input type="radio" name="onde9e1" value="right"> $\\omega(k)$ n'est pas proportionnelle à $k$</label>
          <label class="option"><input type="radio" name="onde9e1" value="wrong"> $c=0$</label>
          <label class="option"><input type="radio" name="onde9e1" value="wrong"> l'onde ne se propage pas</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde9e1','onde9fb1','Correct — c\\'est exactement la définition : un milieu non dispersif a ω=ck (proportionnalité), un milieu dispersif s\\'en écarte.','Relis la définition d\\'un milieu dispersif dans le cours.')">Vérifier</button>
        <div class="feedback" id="onde9fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La vitesse de groupe est définie par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde9e2" value="wrong"> $v_g = \\omega/k$</label>
          <label class="option"><input type="radio" name="onde9e2" value="right"> $v_g = d\\omega/dk$</label>
          <label class="option"><input type="radio" name="onde9e2" value="wrong"> $v_g = k/\\omega$</label>
          <label class="option"><input type="radio" name="onde9e2" value="wrong"> $v_g = \\omega \\times k$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde9e2','onde9fb2','Correct — vg=dω/dk, à ne pas confondre avec vφ=ω/k.','Relis la formule encadrée du cours pour vg.')">Vérifier</button>
        <div class="feedback" id="onde9fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">C'est la vitesse ... qui correspond physiquement à la propagation de l'énergie et de l'information transportées par un paquet d'ondes :</p>
        <div class="options">
          <label class="option"><input type="radio" name="onde9e3" value="wrong"> de phase $v_\\varphi$</label>
          <label class="option"><input type="radio" name="onde9e3" value="right"> de groupe $v_g$</label>
          <label class="option"><input type="radio" name="onde9e3" value="wrong"> ni l'une ni l'autre</label>
          <label class="option"><input type="radio" name="onde9e3" value="wrong"> les deux à parts égales</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('onde9e3','onde9fb3','Correct — c\\'est vg qui gouverne le transport physique de l\\'énergie et de l\\'information, ce qui résout l\\'apparente contradiction des vitesses de phase supraluminiques en milieu dispersif.','Relis le point clé du cours sur la distinction entre les deux vitesses.')">Vérifier</button>
        <div class="feedback" id="onde9fb3"></div>
      </div>
    </div>
  `
};

ONDE_NOVA_KB[ondeKey("Dispersion, vitesse de groupe et paquets d'ondes")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : dispersion, paquets d'ondes, et vitesse de groupe. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/dispersif|dispersion/i, replies:[
      "Un milieu est dispersif si ω(k) n'est pas proportionnelle à k, c'est-à-dire si la vitesse de phase vφ=ω/k dépend de la longueur d'onde."
    ]},
    { test:/vitesse de groupe/i, replies:[
      "La vitesse de groupe vg=dω/dk est la vitesse de l'enveloppe d'un paquet d'ondes — c'est elle qui transporte physiquement l'énergie et l'information, contrairement à la vitesse de phase."
    ]},
    { test:/paquet d.ondes/i, replies:[
      "Un paquet d'ondes est une superposition d'ondes planes de nombres d'onde voisins, qui crée un signal localisé avec une porteuse rapide et une enveloppe lente."
    ]},
    { test:/porteuse|enveloppe/i, replies:[
      "La porteuse oscille rapidement à (k0,ω0) et se déplace à la vitesse de phase ; l'enveloppe module lentement l'amplitude et se déplace à la vitesse de groupe."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition d'un milieu dispersif.",
      "Indice niveau 2 : ça concerne la relation entre ω et k.",
      "Indice niveau 3 : dispersif = ω(k) non proportionnelle à k."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule encadrée du cours pour vg.",
      "Indice niveau 2 : ce n'est pas un simple rapport ω/k.",
      "Indice niveau 3 : vg=dω/dk, une dérivée."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le point clé du cours sur la distinction entre les deux vitesses.",
      "Indice niveau 2 : c'est l'enveloppe qui porte l'information observable.",
      "Indice niveau 3 : c'est la vitesse de groupe vg."
    ]}
  ]
};

/* fusionne le module Ondes et vibrations dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ONDE_CHAPTERS);
Object.assign(NOVA_KB, ONDE_NOVA_KB);