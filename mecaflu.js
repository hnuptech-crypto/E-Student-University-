/* =====================================================================
   CHUNK « mecaflu » — registre MECAFLU_CHAPTERS / MECAFLU_NOVA_KB
   Matière(s) : Physique|Mécanique des fluides
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MECAFLU_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — MÉCANIQUE DES FLUIDES (L3 Physique Fondamentale)
   9 chapitres : statique des fluides, cinématique (Euler/Lagrange), équation de
   continuité, équation d'Euler, théorème de Bernoulli, viscosité et équations de
   Navier-Stokes, solutions exactes (Couette, Poiseuille), analyse dimensionnelle et
   nombre de Reynolds, écoulements potentiels et couche limite — conforme aux maquettes
   LMD de mécanique des fluides en L3 Physique Fondamentale. Ce cours s'appuie sur les
   opérateurs vectoriels (gradient, divergence, rotationnel) du cours "Méthodes
   mathématiques pour la physique" et sur les bilans du cours "Mécanique générale".
   Rédigé sur le même modèle que les autres modules (objectives/prereqs/bodyHtml/
   extraHtml + registre NOVA_KB). Références de fond : É. Guyon, J.-P. Hulin, L. Petit,
   Hydrodynamique physique (EDP Sciences/CNRS) ; J.-P. Pérez, Mécanique des fluides
   (Masson) ; F. M. White, Fluid Mechanics (McGraw-Hill).
   ===================================================================================== */
const MECAFLU_MATIERE = 'Mécanique des fluides';
function mfluKey(chapterTitle){ return `Physique|${MECAFLU_MATIERE}|${chapterTitle}`; }
const MECAFLU_CHAPTERS = {};
const MECAFLU_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
MECAFLU_CHAPTERS[mfluKey("Statique des fluides : pression et théorème fondamental de l'hydrostatique")] = {
  objectives: [
    "Justifier l'hypothèse de milieu continu et la notion de particule fluide",
    "Établir l'isotropie de la pression en un point d'un fluide au repos",
    "Démontrer et utiliser le théorème fondamental de l'hydrostatique",
    "Retrouver la poussée d'Archimède comme conséquence directe des forces de pression",
    "Évaluer la validité de l'approximation isotherme dans la formule barométrique selon l'altitude considérée"
  ],
  prereqs: ["Opérateurs différentiels (gradient, divergence)", "Statique du solide et notion de force répartie"],
  bodyHtml: `
    <p>Vers 250 avant notre ère, à Syracuse, Archimède aurait bondi hors de son bain en criant « Eurêka ! », venant de comprendre pourquoi un corps immergé perd une part de son poids apparent. Cette anecdote, embellie par la légende, marque pourtant un vrai tournant : c'est l'un des tout premiers exemples où un raisonnement physique rigoureux — et non la simple observation — permet de prédire le comportement de la matière. La statique des fluides, qui n'a l'air que de « faire de la pression un vecteur puis un scalaire », est en réalité la discipline qui rend possibles les sous-marins, les barrages, les ballons-sondes et les vérins hydrauliques.</p>
    <p>Chaque fois qu'un ingénieur dimensionne la paroi d'un barrage, calcule la poussée qui maintient un sous-marin en flottaison neutre, ou qu'un météorologue interprète la chute de pression annonçant une tempête, c'est très exactement ce chapitre qu'il mobilise. Même ton corps l'utilise : la pression artérielle se mesure et se comprend grâce au même théorème fondamental de l'hydrostatique.</p>
    <p>La mécanique des fluides étudie le mouvement (et l'équilibre) des liquides et des gaz — des milieux qui, contrairement aux solides, se déforment continûment sous l'effet d'une contrainte de cisaillement, aussi petite soit-elle. Ce premier chapitre pose les bases : l'hypothèse de <strong>milieu continu</strong>, la notion de <strong>pression</strong>, et l'équilibre d'un fluide au repos (<strong>statique des fluides</strong>, ou hydrostatique). À la fin, tu sauras calculer la pression à n'importe quelle profondeur ou altitude, et prédire si un objet flotte, coule, ou reste en équilibre.</p>

    <h3>1. L'hypothèse de milieu continu</h3>
    <p>À l'échelle microscopique, un fluide est un ensemble discret de molécules en agitation permanente. La mécanique des fluides adopte cependant une échelle <strong>mésoscopique</strong> : on considère une <strong>particule fluide</strong>, un petit volume $d\\tau$ suffisamment grand pour contenir un très grand nombre de molécules (afin que des grandeurs moyennes comme la masse volumique $\\rho$ ou la vitesse $\\vec v$ aient un sens statistique bien défini), mais suffisamment petit devant les échelles macroscopiques du problème pour être traité comme un point mathématique. Cette hypothèse de <strong>milieu continu</strong> permet de définir des champs continus $\\rho(\\vec r,t)$, $\\vec v(\\vec r,t)$, $p(\\vec r,t)$, et d'utiliser les outils de l'analyse vectorielle et du calcul différentiel.</p>

    <h3>2. La pression : isotropie en un point d'un fluide au repos</h3>
    <p>La <strong>pression</strong> $p$ est la force normale exercée par le fluide, par unité de surface, sur toute surface (réelle ou fictive) qui le traverse. Un résultat fondamental de la statique des fluides est que la pression en un point d'un fluide <strong>au repos</strong> est <strong>isotrope</strong> : elle ne dépend pas de l'orientation de la surface considérée.</p>
    <div class="key-point">
      <span class="eyebrow">Démonstration (esquisse)</span>
      On isole, par la pensée, un petit prisme fluide (tétraèdre) à l'équilibre. En écrivant l'équilibre des forces de pression sur ses faces et en faisant tendre ses dimensions vers zéro (les forces de volume, comme le poids, devenant négligeables devant les forces de surface à cette limite), on montre que la pression est la même sur toutes les faces, quelle que soit leur orientation : $p$ est un <strong>scalaire</strong>, pas un vecteur.
    </div>
    <p>C'est cette isotropie qui justifie le <strong>principe de Pascal</strong> : toute variation de pression appliquée en un point d'un fluide incompressible au repos se transmet intégralement et instantanément à tous les points du fluide (principe à la base du vérin hydraulique).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si la pression était un vecteur plutôt qu'un scalaire, un simple ballon de baudruche gonflé aurait-il encore une forme sphérique stable ? Réfléchis à ce qui se passerait si la force exercée par l'air sur chaque petit morceau de paroi interne dépendait de la direction dans laquelle on « regarde » cette paroi.
    </div>

    <h3>3. Théorème fondamental de l'hydrostatique</h3>
    <p>Considérons un petit élément de volume $d\\tau = dx\\,dy\\,dz$ de fluide au repos, soumis à la pesanteur $\\vec g = -g\\,\\vec e_z$. La résultante des forces de pression sur cet élément est $-\\vec\\nabla p\\, d\\tau$ (le gradient de pression pousse des zones de haute pression vers les zones de basse pression). L'équilibre mécanique de cet élément ($\\vec F_{pression}+\\vec F_{poids}=\\vec 0$) donne :</p>
    <div class="formula-box">$$\\vec\\nabla p = \\rho\\,\\vec g$$</div>
    <p>C'est le <strong>théorème fondamental de l'hydrostatique</strong>, aussi appelé <strong>relation fondamentale de la statique des fluides</strong>. Avec $\\vec g=-g\\vec e_z$, il se réduit à une équation scalaire :</p>
    <div class="formula-box">$$\\frac{dp}{dz} = -\\rho g$$</div>
    <p>La pression décroît donc quand l'altitude $z$ augmente — la pression est plus grande en profondeur, plus faible en altitude.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — fluide incompressible</span>
      <p><strong>Énoncé :</strong> pour un liquide de masse volumique $\\rho$ constante (incompressible), exprimer la pression en fonction de la profondeur $h$ sous la surface libre (où la pression vaut $p_0$, pression atmosphérique).</p>
      <p><strong>Solution :</strong> $\\rho$ étant constante, on intègre directement $dp=-\\rho g\\,dz$ entre la surface ($z=0$, $p=p_0$) et une profondeur $h$ ($z=-h$) : $p(-h)-p_0 = -\\rho g(-h-0)=\\rho g h$.</p>
      <p class="example-answer">$p(h) = p_0 + \\rho g h$ — la pression augmente linéairement avec la profondeur (environ $+1\\,\\text{bar}$ tous les $10\\,\\text{m}$ dans l'eau).</p>
    </div>

    <p>Pour un <strong>gaz</strong> (compressible), $\\rho$ dépend de $p$ (via l'équation d'état, par exemple $\\rho=pM/RT$ pour un gaz parfait) : l'intégration de $dp/dz=-\\rho g$ donne, dans le cas isotherme, la <strong>formule barométrique</strong> $p(z)=p_0\\,e^{-z/H}$ avec l'échelle de hauteur $H=RT/(Mg)\\approx 8\\,\\text{km}$ pour l'air.</p>

    <h3>4. Poussée d'Archimède</h3>
    <p>La résultante des forces de pression exercées par un fluide au repos sur un solide immergé (ou partiellement immergé) est appelée <strong>poussée d'Archimède</strong>. En intégrant $-p\\,\\vec n\\,dS$ sur toute la surface fermée du solide, et en utilisant le théorème de Green-Ostrogradski (formule du gradient) associé au théorème fondamental de l'hydrostatique, on montre que cette résultante est verticale, dirigée vers le haut, et de norme égale au poids du fluide déplacé :</p>
    <div class="formula-box">$$\\vec \\Pi = -\\rho_{\\text{fluide}}\\, V_{\\text{immergé}}\\,\\vec g$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La poussée d'Archimède s'applique au <strong>centre de poussée</strong> (le centre de masse du volume de fluide déplacé), et non nécessairement au centre de masse du solide — d'où l'importance de la position du centre de poussée pour la stabilité d'un objet flottant (bateau, ludion).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un ludion (petit flacon lesté flottant dans une bouteille fermée) coule quand on presse la bouteille, et remonte quand on relâche. Sachant que l'air emprisonné dans le ludion se comprime légèrement sous la pression transmise par le principe de Pascal, quel volume — et donc quelle poussée d'Archimède — cela change-t-il ?
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <rect x="10" y="10" width="120" height="80" fill="none" stroke="#5A6472" stroke-width="1"/>
          <rect x="10" y="40" width="120" height="50" fill="#4C7CFF" opacity="0.18"/>
          <line x1="10" y1="40" x2="130" y2="40" stroke="#4C7CFF" stroke-width="1.4"/>
          <circle cx="70" cy="65" r="14" fill="#F0B94D"/>
          <line x1="70" y1="65" x2="70" y2="45" stroke="#2DD4C4" stroke-width="1.6"/>
          <text x="72" y="43" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">Π ↑</text>
          <text x="12" y="20" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">p0</text>
        </svg>
        <span>solide immergé : la poussée d'Archimède équilibre le poids du fluide déplacé</span>
      </div>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>En 2020, la mission spatiale <strong>Perseverance</strong> a dû calculer avec précision la poussée d'Archimède... dans l'atmosphère martienne, cent fois moins dense que la nôtre, pour valider la stabilité du parachute et des ballons-sondes envisagés pour de futures missions. Le même théorème fondamental de l'hydrostatique, appliqué à une atmosphère de composition et de gravité différentes, reste l'outil de base de toute étude atmosphérique planétaire.</p>
    <p><strong>Question ouverte :</strong> dans les fluides à très grande échelle (l'atmosphère terrestre entière, l'intérieur des étoiles), l'hypothèse de milieu continu reste-t-elle valable jusqu'où exactement ? La frontière entre « suffisamment de molécules pour une moyenne statistique fiable » et « variations macroscopiques trop rapides » continue d'être discutée en physique des plasmas et en météorologie de haute altitude.</p>
    <p><strong>Technologie émergente :</strong> les drones sous-marins autonomes et les robots « soft » bio-inspirés (poulpes robotiques) exploitent des variations fines et contrôlées de flottabilité — donc de poussée d'Archimède — pour se déplacer sans hélice, en modifiant simplement leur volume apparent.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Milieu continu (champs ρ, v, p) → équilibre des forces sur un élément de fluide → théorème fondamental de l'hydrostatique → pression en tout point → poussée d'Archimède sur un solide immergé
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\vec\\nabla p = \\rho\\,\\vec g$$
      Toute la statique des fluides — variation de pression avec l'altitude, formule barométrique, poussée d'Archimède — découle de cette unique relation d'équilibre entre force de pression et pesanteur.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Sous l'hypothèse de milieu continu, on définit des champs $\\rho(\\vec r,t)$, $\\vec v(\\vec r,t)$, $p(\\vec r,t)$ à l'échelle de la particule fluide</li>
        <li>La pression en un point d'un fluide au repos est isotrope (scalaire, indépendante de l'orientation de la surface)</li>
        <li>Théorème fondamental de l'hydrostatique : $\\vec\\nabla p = \\rho \\vec g$, soit $dp/dz=-\\rho g$</li>
        <li>Pour un fluide incompressible : $p(h)=p_0+\\rho g h$ ; la poussée d'Archimède $\\vec\\Pi=-\\rho_{\\text{fluide}}V_{\\text{immergé}}\\vec g$ en est une conséquence directe</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser $p=p_0+\\rho g h$ pour un gaz compressible (air), alors que cette formule ne vaut que pour un fluide de masse volumique constante</li>
        <li>Confondre la masse volumique du <strong>fluide déplacé</strong> (qui intervient dans Archimède) avec celle du solide immergé</li>
        <li>Oublier le signe : la pression <em>augmente</em> quand on descend ($z$ diminue), donc $dp/dz$ est négatif</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">À quelle profondeur dans l'eau ($\\rho=1000\\,\\text{kg/m}^3$, $g=10\\,\\text{m/s}^2$) la pression atteint-elle $p_0+2\\times10^5\\,\\text{Pa}$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu1e1" value="wrong"> 2 m</label>
          <label class="option"><input type="radio" name="mflu1e1" value="right"> 20 m</label>
          <label class="option"><input type="radio" name="mflu1e1" value="wrong"> 200 m</label>
          <label class="option"><input type="radio" name="mflu1e1" value="wrong"> 0,2 m</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu1e1','mflu1fb1','Correct — h = Δp/(ρg) = 2×10⁵/(1000×10) = 20 m.','Utilise p(h)=p0+ρgh, isole h, puis fais l\\'application numérique.')">Vérifier</button>
        <div class="feedback" id="mflu1fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un glaçon flotte dans un verre d'eau, entièrement immergé sauf une petite portion émergée. La poussée d'Archimède qu'il subit est égale :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu1e2" value="wrong"> au poids total du glaçon, quelle que soit sa position</label>
          <label class="option"><input type="radio" name="mflu1e2" value="right"> au poids du volume d'eau déplacé par la partie immergée du glaçon</label>
          <label class="option"><input type="radio" name="mflu1e2" value="wrong"> à zéro, car le glaçon flotte</label>
          <label class="option"><input type="radio" name="mflu1e2" value="wrong"> au poids du glaçon entier, y compris la partie émergée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu1e2','mflu1fb2','Correct — la poussée d\\'Archimède ne dépend que du volume de fluide effectivement déplacé, c\\'est-à-dire la partie immergée du glaçon (la partie émergée ne déplace pas d\\'eau).','Relis la formule : Π dépend du volume immergé, pas du volume total du solide.')">Vérifier</button>
        <div class="feedback" id="mflu1fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le théorème fondamental de l'hydrostatique $\\vec\\nabla p=\\rho\\vec g$ traduit physiquement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu1e3" value="wrong"> la conservation de la masse</label>
          <label class="option"><input type="radio" name="mflu1e3" value="right"> l'équilibre entre force de pression et poids sur un élément de fluide au repos</label>
          <label class="option"><input type="radio" name="mflu1e3" value="wrong"> la conservation de l'énergie cinétique</label>
          <label class="option"><input type="radio" name="mflu1e3" value="wrong"> l'isotropie de la vitesse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu1e3','mflu1fb3','Correct — c\\'est le bilan de forces (pression + poids = 0) sur un élément de fluide immobile qui donne cette relation, exactement l\\'équivalent fluide de la statique du solide.','Repense à la démonstration : quel bilan de forces sur un petit élément de volume mène à cette équation ?')">Vérifier</button>
        <div class="feedback" id="mflu1fb3"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 4 — à modéliser toi-même (niveau avancé)</span>
        <p class="q">Un iceberg flotte avec environ 90 % de son volume immergé (la glace est légèrement moins dense que l'eau de mer). Propose une démarche pour retrouver ce pourcentage à partir du seul équilibre entre poids et poussée d'Archimède, puis discute : ce pourcentage serait-il différent dans un lac d'eau douce ? Pourquoi ?</p>
        <p style="color:var(--ink-soft); font-size:0.85rem; margin-top:8px;"><em>Indice (pas la solution) : à l'équilibre, le poids de l'iceberg entier égale la poussée d'Archimède due au seul volume immergé — exprime les deux masses volumiques et élimine le volume total.</em></p>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la Terre n'avait pas d'atmosphère : la formule barométrique aurait-elle encore un sens, et que deviendrait la notion même de « pression atmosphérique » ?</li>
        <li>Pourquoi un sous-marin peut-il ajuster sa profondeur d'équilibre en changeant simplement la quantité d'eau dans ses ballasts, sans avoir besoin de changer sa forme ni sa masse de structure ?</li>
        <li>Quelle serait la conséquence, pour la conception d'un barrage, d'un ingénieur qui négligerait la variation de pression avec la profondeur et ne considérerait qu'une pression moyenne uniforme sur toute la paroi ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>B. Pascal, <em>Traité de l'équilibre des liqueurs</em>, 1663 — texte fondateur de l'hydrostatique moderne.</li>
        <li>É. Guyon, J.-P. Hulin, L. Petit, <em>Hydrodynamique physique</em>, EDP Sciences/CNRS Éditions — référence moderne de mécanique des fluides pour la licence et le master.</li>
        <li>NASA/JPL, « Ingenuity Mars Helicopter: How Perseverance's Companion Sees the Red Planet's Thin Air », <em>rapports de mission Mars 2020</em>, 2021.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu viens de poser les fondations de toute la mécanique des fluides : sans elles, impossible de comprendre pourquoi un bateau flotte, pourquoi tes oreilles « claquent » en plongée, ou comment un avion reste en l'air. Le chapitre suivant, « Cinématique des fluides », mettra ce fluide en mouvement — et tu découvriras qu'un fluide en écoulement obéit à des lois tout aussi élégantes que celles, immobiles, que tu viens de maîtriser. Comme le résumait Blaise Pascal : « Le silence éternel de ces espaces infinis m'effraie » — mais face à un fluide, au moins, tu sais désormais où va la pression.</p>
  `
};

MECAFLU_NOVA_KB[mfluKey("Statique des fluides : pression et théorème fondamental de l'hydrostatique")] = {
  intro: "Salut, moi c'est Nova ! On démarre la mécanique des fluides avec la statique : pression, hydrostatique et poussée d'Archimède. Demande-moi une définition, ou un indice sur un exercice.",
  rules: [
    { test:/pression/i, replies:[
      "La pression en un point d'un fluide au repos est isotrope : elle ne dépend pas de l'orientation de la surface considérée. C'est un scalaire, pas un vecteur."
    ]},
    { test:/hydrostatique|fondamental/i, replies:[
      "Le théorème fondamental de l'hydrostatique s'écrit ∇p = ρg, soit dp/dz=−ρg : la pression augmente quand on descend dans le fluide."
    ]},
    { test:/archim[èe]de|pouss[ée]e/i, replies:[
      "La poussée d'Archimède Π = −ρ_fluide · V_immergé · g est verticale, vers le haut, et ne dépend que du volume de fluide effectivement déplacé (la partie immergée du solide)."
    ]},
    { test:/continu|particule fluide/i, replies:[
      "L'hypothèse de milieu continu consiste à considérer une 'particule fluide' assez grande pour contenir beaucoup de molécules (moyennes statistiques bien définies) mais assez petite pour être traitée comme un point à l'échelle macroscopique."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : utilise p(h)=p0+ρgh et isole h.",
      "Indice niveau 2 : h = Δp/(ρg).",
      "Indice niveau 3 : h = 2×10⁵/(1000×10) = 20 m."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : la poussée dépend-elle du volume total du glaçon ou seulement de la partie sous l'eau ?",
      "Indice niveau 2 : seulement du volume immergé, qui déplace effectivement de l'eau.",
      "Indice niveau 3 : Π est donc le poids du volume d'eau déplacé par la partie immergée."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : repense à la démonstration du théorème sur un petit élément de fluide immobile.",
      "Indice niveau 2 : quelles forces s'équilibrent sur cet élément ?",
      "Indice niveau 3 : force de pression et poids — c'est un bilan de forces à l'équilibre."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MECAFLU_CHAPTERS[mfluKey("Cinématique des fluides : descriptions eulérienne et lagrangienne")] = {
  objectives: [
    "Distinguer les descriptions lagrangienne et eulérienne d'un écoulement",
    "Définir la dérivée particulaire et la décomposer en dérivée locale et convective",
    "Différencier trajectoires, lignes de courant et lignes d'émission",
    "Calculer l'accélération d'une particule fluide à partir d'un champ de vitesse eulérien"
  ],
  prereqs: ["Statique des fluides : pression et théorème fondamental de l'hydrostatique", "Cinématique du point (dérivées temporelles)"],
  bodyHtml: `
    <p>Avant d'écrire les équations du mouvement d'un fluide, il faut choisir comment le <strong>décrire</strong>. Contrairement à un point matériel unique, un fluide en mouvement est constitué d'une infinité de particules fluides : deux points de vue, complémentaires, permettent de décrire ce mouvement.</p>

    <h3>1. Description lagrangienne</h3>
    <p>La <strong>description lagrangienne</strong> suit chaque particule fluide individuellement au cours du temps, exactement comme en mécanique du point. On repère chaque particule par sa position initiale $\\vec a$ à l'instant $t_0$, et on cherche sa position $\\vec r(\\vec a, t)$ à tout instant ultérieur : c'est sa <strong>trajectoire</strong>. Cette description est intuitive, mais rarement pratique en mécanique des fluides : suivre individuellement chaque particule d'un écoulement turbulent est illusoire.</p>

    <h3>2. Description eulérienne</h3>
    <p>La <strong>description eulérienne</strong>, très largement préférée en mécanique des fluides, ne suit pas les particules : elle observe, en chaque point fixe $\\vec r$ de l'espace et à chaque instant $t$, la vitesse $\\vec v(\\vec r,t)$ de la particule fluide qui s'y trouve à cet instant précis. On obtient ainsi un <strong>champ de vitesse eulérien</strong> $\\vec v(\\vec r,t)$, défini sur tout le domaine occupé par le fluide — de la même manière qu'on décrit un champ électrique ou un champ de température.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — bien distinguer les deux points de vue</span>
      En description eulérienne, on est un observateur <em>fixe</em> qui regarde passer des particules différentes au même endroit. En description lagrangienne, on est « embarqué » avec une particule et on la suit dans son déplacement. Un écoulement peut être <strong>stationnaire</strong> (le champ $\\vec v(\\vec r,t)$ ne dépend pas explicitement de $t$) tout en ayant des particules qui accélèrent : c'est le point central de ce chapitre.
    </div>

    <h3>3. Dérivée particulaire</h3>
    <p>Pour appliquer la deuxième loi de Newton à une particule fluide, il faut son <strong>accélération</strong> — une notion lagrangienne (la dérivée de la vitesse en suivant la particule) — mais on ne dispose que du champ eulérien $\\vec v(\\vec r,t)$. La <strong>dérivée particulaire</strong> (ou dérivée matérielle) $\\dfrac{D\\vec v}{Dt}$ résout cette difficulté : c'est le taux de variation d'une grandeur <em>en suivant la particule</em>, exprimé à partir du champ eulérien.</p>
    <p>Considérons une particule qui se trouve en $\\vec r$ à l'instant $t$ et en $\\vec r + \\vec v\\,dt$ à l'instant $t+dt$. La variation de vitesse qu'elle subit est :</p>
    <div class="formula-box">$$d\\vec v = \\vec v(\\vec r + \\vec v\\,dt,\\, t+dt) - \\vec v(\\vec r, t) = \\frac{\\partial \\vec v}{\\partial t}\\,dt + (\\vec v \\cdot \\vec\\nabla)\\vec v\\,dt + O(dt^2)$$</div>
    <p>où l'on a fait un développement de Taylor à l'ordre 1 en $dt$. On en déduit l'expression de la dérivée particulaire, ou <strong>accélération d'une particule fluide</strong> :</p>
    <div class="formula-box">$$\\boxed{\\ \\vec a = \\frac{D\\vec v}{Dt} = \\frac{\\partial \\vec v}{\\partial t} + (\\vec v \\cdot \\vec\\nabla)\\vec v\\ }$$</div>
    <table class="mini-table">
      <tr><th>Terme</th><th>Nom</th><th>Signification</th></tr>
      <tr><td>$\\dfrac{\\partial \\vec v}{\\partial t}$</td><td>accélération locale</td><td>variation du champ de vitesse en un point <em>fixe</em>, au cours du temps (nulle en régime stationnaire)</td></tr>
      <tr><td>$(\\vec v \\cdot \\vec\\nabla)\\vec v$</td><td>accélération convective</td><td>variation de vitesse due au <em>déplacement</em> de la particule vers une région où le champ de vitesse est différent (même en régime stationnaire)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Un point souvent mal compris</span>
      Un écoulement stationnaire ($\\partial \\vec v/\\partial t = \\vec 0$) n'implique <strong>pas</strong> une accélération nulle des particules : le terme convectif $(\\vec v\\cdot\\vec\\nabla)\\vec v$ peut être non nul. C'est le cas, par exemple, d'un fluide qui accélère en traversant un tuyau qui se rétrécit, en régime permanent.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — écoulement stationnaire convergent</span>
      <p><strong>Énoncé :</strong> un écoulement stationnaire unidimensionnel a pour champ de vitesse $v_x(x) = kx$ (avec $k>0$ constant, $v_y=v_z=0$). Calculer l'accélération d'une particule fluide.</p>
      <p><strong>Solution :</strong> $\\dfrac{\\partial v_x}{\\partial t}=0$ (stationnaire). Le terme convectif : $(\\vec v\\cdot\\vec\\nabla)v_x = v_x\\dfrac{\\partial v_x}{\\partial x} = kx \\cdot k = k^2x$.</p>
      <p class="example-answer">$a_x = k^2 x \\neq 0$ : bien que l'écoulement soit stationnaire, chaque particule accélère en s'éloignant de $x=0$ — elle traverse des zones de vitesse croissante.</p>
    </div>

    <h3>4. Trajectoires, lignes de courant, lignes d'émission</h3>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th></tr>
      <tr><td><strong>Trajectoire</strong></td><td>Chemin suivi par <em>une</em> particule fluide au cours du temps (notion lagrangienne)</td></tr>
      <tr><td><strong>Ligne de courant</strong></td><td>Courbe, définie à un instant $t$ <em>fixé</em>, tangente en chacun de ses points au champ de vitesse $\\vec v(\\vec r,t)$ à cet instant (notion eulérienne « instantanée »)</td></tr>
      <tr><td><strong>Ligne d'émission</strong></td><td>Lieu, à l'instant $t$, de toutes les particules qui sont passées par un même point fixe à des instants antérieurs (ex : filet de fumée issu d'une cheminée)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ces trois courbes <strong>coïncident</strong> pour un écoulement <strong>stationnaire</strong> (elles ne coïncident pas en général pour un écoulement instationnaire). En régime stationnaire, une particule suit donc exactement la ligne de courant sur laquelle elle se trouve.
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <path d="M10,70 Q40,20 130,30" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <path d="M10,55 Q45,35 130,45" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <path d="M10,40 Q45,45 130,60" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <circle cx="60" cy="30" r="2.4" fill="#F0B94D"/>
          <circle cx="60" cy="40" r="2.4" fill="#F0B94D"/>
        </svg>
        <span>lignes de courant : tangentes au champ de vitesse instantané</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Description lagrangienne = on suit chaque particule ; description eulérienne = on observe le champ $\\vec v(\\vec r,t)$ en des points fixes</li>
        <li>Dérivée particulaire : $\\dfrac{D\\vec v}{Dt} = \\dfrac{\\partial \\vec v}{\\partial t} + (\\vec v\\cdot\\vec\\nabla)\\vec v$ = accélération locale + accélération convective</li>
        <li>Un écoulement stationnaire peut avoir des particules accélérées : c'est le terme convectif qui l'explique</li>
        <li>Trajectoires, lignes de courant et lignes d'émission coïncident uniquement en régime stationnaire</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un écoulement stationnaire implique une accélération nulle des particules (oubli du terme convectif)</li>
        <li>Confondre trajectoire (suivie dans le temps par une particule) et ligne de courant (image instantanée du champ de vitesse)</li>
        <li>Oublier que $(\\vec v\\cdot\\vec\\nabla)\\vec v$ est un terme <em>non linéaire</em> en $\\vec v$ — source de nombreuses difficultés mathématiques en mécanique des fluides (turbulence, chaos)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La dérivée particulaire $D\\vec v/Dt$ s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu2e1" value="wrong"> $\\partial \\vec v/\\partial t$ seul</label>
          <label class="option"><input type="radio" name="mflu2e1" value="right"> $\\partial \\vec v/\\partial t + (\\vec v\\cdot\\vec\\nabla)\\vec v$</label>
          <label class="option"><input type="radio" name="mflu2e1" value="wrong"> $(\\vec v\\cdot\\vec\\nabla)\\vec v$ seul</label>
          <label class="option"><input type="radio" name="mflu2e1" value="wrong"> $\\vec\\nabla \\times \\vec v$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu2e1','mflu2fb1','Correct — c\\'est la somme de l\\'accélération locale (variation en un point fixe) et de l\\'accélération convective (due au déplacement de la particule).','Relis la définition : la dérivée particulaire combine deux effets, l\\'un temporel local, l\\'autre lié au déplacement.')">Vérifier</button>
        <div class="feedback" id="mflu2fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour l'écoulement stationnaire $v_x(x)=kx$ ($k>0$), l'accélération d'une particule fluide en $x$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu2e2" value="wrong"> $a_x = 0$ car l'écoulement est stationnaire</label>
          <label class="option"><input type="radio" name="mflu2e2" value="right"> $a_x = k^2 x$</label>
          <label class="option"><input type="radio" name="mflu2e2" value="wrong"> $a_x = kx$</label>
          <label class="option"><input type="radio" name="mflu2e2" value="wrong"> $a_x = k$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu2e2','mflu2fb2','Correct — le terme local est nul (stationnaire), mais le terme convectif vx·∂vx/∂x = kx·k = k²x est non nul : c\\'est exactement l\\'exemple du cours.','Le terme local ∂vx/∂t est nul, mais calcule le terme convectif vx·∂vx/∂x.')">Vérifier</button>
        <div class="feedback" id="mflu2fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un écoulement stationnaire, trajectoires et lignes de courant :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu2e3" value="right"> coïncident</label>
          <label class="option"><input type="radio" name="mflu2e3" value="wrong"> sont toujours perpendiculaires</label>
          <label class="option"><input type="radio" name="mflu2e3" value="wrong"> n'ont aucun rapport entre elles</label>
          <label class="option"><input type="radio" name="mflu2e3" value="wrong"> coïncident uniquement si le fluide est visqueux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu2e3','mflu2fb3','Correct — en régime stationnaire, le champ de vitesse ne change pas au cours du temps : une particule suit donc exactement la ligne de courant sur laquelle elle se trouve, et les deux notions coïncident.','Repense au point clé du cours : que devient une ligne de courant si le champ de vitesse ne change jamais dans le temps ?')">Vérifier</button>
        <div class="feedback" id="mflu2fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Cinématique des fluides : descriptions eulérienne et lagrangienne")] = {
  intro: "Salut, c'est Nova ! Ce chapitre distingue les points de vue lagrangien et eulérien, et introduit la dérivée particulaire. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/lagrangien/i, replies:[
      "La description lagrangienne suit chaque particule fluide individuellement dans le temps, comme en mécanique du point : on cherche sa trajectoire r(a,t) à partir de sa position initiale a."
    ]},
    { test:/eul[ée]rien/i, replies:[
      "La description eulérienne observe le champ de vitesse v(r,t) en des points fixes de l'espace, sans suivre les particules individuellement. C'est la description la plus utilisée en mécanique des fluides."
    ]},
    { test:/d[ée]riv[ée]e particulaire|d[ée]riv[ée]e mat[ée]rielle/i, replies:[
      "La dérivée particulaire Dv/Dt = ∂v/∂t + (v·∇)v exprime l'accélération d'une particule (notion lagrangienne) à partir du champ eulérien v(r,t). Le premier terme est local, le second convectif."
    ]},
    { test:/stationnaire/i, replies:[
      "Attention : un écoulement stationnaire (∂v/∂t=0) peut quand même avoir des particules accélérées, à cause du terme convectif (v·∇)v — par exemple un fluide qui accélère en traversant un rétrécissement."
    ]},
    { test:/ligne de courant|trajectoire/i, replies:[
      "Une trajectoire suit une particule dans le temps ; une ligne de courant est une image instantanée, tangente au champ de vitesse à un instant fixé. Elles coïncident uniquement en régime stationnaire."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : la dérivée particulaire a deux contributions, l'une temporelle, l'autre spatiale.",
      "Indice niveau 2 : c'est une somme, pas un seul terme.",
      "Indice niveau 3 : Dv/Dt = ∂v/∂t + (v·∇)v."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : le terme local ∂vx/∂t est-il nul ici (écoulement stationnaire) ?",
      "Indice niveau 2 : oui, il est nul ; calcule alors vx·∂vx/∂x avec vx=kx.",
      "Indice niveau 3 : ax = kx·k = k²x."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : repense au point clé du cours sur le régime stationnaire.",
      "Indice niveau 2 : le champ de vitesse ne change pas dans le temps.",
      "Indice niveau 3 : donc trajectoires et lignes de courant coïncident exactement."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MECAFLU_CHAPTERS[mfluKey("Bilan de masse et équation de continuité")] = {
  objectives: [
    "Établir l'équation locale de conservation de la masse (équation de continuité)",
    "Simplifier cette équation dans le cas d'un écoulement incompressible",
    "Utiliser la forme intégrale (bilan de débit) sur un tube de courant",
    "Interpréter physiquement la divergence du champ de vitesse"
  ],
  prereqs: ["Cinématique des fluides : descriptions eulérienne et lagrangienne", "Opérateurs différentiels (divergence, théorème de Green-Ostrogradski)"],
  bodyHtml: `
    <p>La masse d'un fluide ne peut ni apparaître ni disparaître : ce principe de conservation, exprimé localement, donne l'<strong>équation de continuité</strong> — la première des grandes équations de bilan de la mécanique des fluides, avant celles de la quantité de mouvement (chapitres suivants).</p>

    <h3>1. Bilan de masse sur un volume de contrôle fixe</h3>
    <p>Considérons un volume $V$ fixe dans l'espace (un « volume de contrôle »), délimité par une surface fermée $\\Sigma$. La masse contenue dans $V$ est $m=\\displaystyle\\int_V \\rho\\,d\\tau$. Le principe de conservation de la masse énonce que la variation de cette masse au cours du temps est exactement compensée par le flux de masse qui traverse la frontière $\\Sigma$ :</p>
    <div class="formula-box">$$\\frac{d}{dt}\\int_V \\rho\\,d\\tau = -\\oint_\\Sigma \\rho\\,\\vec v \\cdot \\vec n\\,dS$$</div>
    <p>(le signe $-$ traduit le fait qu'un flux sortant, $\\vec v\\cdot\\vec n>0$, fait <em>diminuer</em> la masse à l'intérieur). En appliquant le théorème de Green-Ostrogradski au membre de droite ($\\oint_\\Sigma \\rho\\vec v\\cdot\\vec n\\,dS = \\int_V \\vec\\nabla\\cdot(\\rho\\vec v)\\,d\\tau$), et comme $V$ est fixe, on peut faire entrer la dérivée temporelle dans l'intégrale ($\\frac{d}{dt}\\int_V \\rho\\,d\\tau = \\int_V \\frac{\\partial \\rho}{\\partial t}\\,d\\tau$) :</p>
    <div class="formula-box">$$\\int_V \\left(\\frac{\\partial \\rho}{\\partial t} + \\vec\\nabla\\cdot(\\rho\\vec v)\\right)d\\tau = 0$$</div>
    <p>Cette égalité étant valable pour <strong>tout</strong> volume $V$ arbitraire, l'intégrande doit être identiquement nulle (même argument que le lemme fondamental du calcul des variations, vu en mécanique analytique) : c'est l'<strong>équation de continuité</strong>, forme locale de la conservation de la masse.</p>
    <div class="formula-box">$$\\boxed{\\ \\frac{\\partial \\rho}{\\partial t} + \\vec\\nabla\\cdot(\\rho\\vec v) = 0\\ }$$</div>

    <h3>2. Forme équivalente avec la dérivée particulaire</h3>
    <p>En développant $\\vec\\nabla\\cdot(\\rho\\vec v) = \\vec v\\cdot\\vec\\nabla\\rho + \\rho\\,\\vec\\nabla\\cdot\\vec v$, l'équation de continuité se réécrit :</p>
    <div class="formula-box">$$\\frac{D\\rho}{Dt} + \\rho\\,\\vec\\nabla \\cdot \\vec v = 0$$</div>
    <p>Cette forme met en évidence le sens physique de la <strong>divergence</strong> du champ de vitesse : $\\vec\\nabla\\cdot\\vec v$ mesure le taux d'<strong>expansion (ou de compression) relative</strong> d'un volume de fluide suivi dans son mouvement.</p>

    <h3>3. Cas incompressible : $\\vec\\nabla \\cdot \\vec v = 0$</h3>
    <p>Un écoulement est dit <strong>incompressible</strong> si la masse volumique de chaque particule fluide reste constante au cours de son mouvement : $\\dfrac{D\\rho}{Dt}=0$ (ce n'est pas nécessairement $\\rho$ uniforme dans tout l'espace, mais constant le long de chaque trajectoire). L'équation de continuité se simplifie alors radicalement :</p>
    <div class="formula-box">$$\\vec\\nabla \\cdot \\vec v = 0$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La plupart des liquides (eau, huile...) sont très bien approximés comme incompressibles dans les conditions usuelles. Les gaz, eux, ne sont incompressibles en pratique que si leur vitesse d'écoulement reste petite devant la vitesse du son (typiquement, nombre de Mach $Ma<0{,}3$).
    </div>

    <h3>4. Bilan intégral : conservation du débit dans un tube de courant</h3>
    <p>Un <strong>tube de courant</strong> est la surface formée par toutes les lignes de courant s'appuyant sur un contour fermé : par construction, aucun fluide ne le traverse latéralement (le champ de vitesse y est tangent). Pour un écoulement <strong>incompressible et stationnaire</strong>, en appliquant la forme intégrale de la conservation de la masse à la portion de tube de courant comprise entre deux sections $S_1$ et $S_2$, on obtient la conservation du <strong>débit volumique</strong> $Q_v$ :</p>
    <div class="formula-box">$$Q_v = \\iint_{S_1} \\vec v\\cdot\\vec n\\,dS = \\iint_{S_2}\\vec v\\cdot\\vec n\\,dS, \\qquad \\text{soit, pour une vitesse uniforme : } S_1 v_1 = S_2 v_2$$</div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — tuyau convergent</span>
      <p><strong>Énoncé :</strong> de l'eau (incompressible) s'écoule en régime stationnaire dans un tuyau dont la section passe de $S_1=20\\,\\text{cm}^2$ à $S_2=5\\,\\text{cm}^2$. La vitesse dans la grande section est $v_1=1\\,\\text{m/s}$. Quelle est la vitesse dans la petite section ?</p>
      <p><strong>Solution :</strong> conservation du débit : $S_1 v_1 = S_2 v_2 \\Rightarrow v_2 = v_1 \\dfrac{S_1}{S_2} = 1 \\times \\dfrac{20}{5}$.</p>
      <p class="example-answer">$v_2 = 4\\,\\text{m/s}$ : le fluide accélère en traversant le rétrécissement — c'est exactement l'effet convectif du chapitre précédent, retrouvé ici par un bilan de débit.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 80" width="100%">
          <path d="M10,15 L75,25 L130,32 L130,48 L75,55 L10,65 Z" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
          <line x1="20" y1="30" x2="20" y2="50" stroke="#2DD4C4" stroke-width="1.2"/>
          <text x="12" y="28" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">S1,v1</text>
          <line x1="115" y1="34" x2="115" y2="46" stroke="#F0B94D" stroke-width="1.2"/>
          <text x="105" y="30" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">S2,v2</text>
        </svg>
        <span>tube de courant convergent : $S_1 v_1 = S_2 v_2$</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Équation de continuité : $\\dfrac{\\partial \\rho}{\\partial t} + \\vec\\nabla\\cdot(\\rho\\vec v) = 0$, forme locale de la conservation de la masse</li>
        <li>Forme équivalente : $\\dfrac{D\\rho}{Dt} + \\rho\\,\\vec\\nabla\\cdot\\vec v = 0$ ; la divergence de $\\vec v$ mesure le taux d'expansion d'un volume suivi</li>
        <li>Écoulement incompressible ($D\\rho/Dt=0$) $\\Rightarrow$ $\\vec\\nabla\\cdot\\vec v = 0$</li>
        <li>Dans un tube de courant, en régime stationnaire incompressible, le débit se conserve : $S_1 v_1 = S_2 v_2$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre « incompressible » ($D\\rho/Dt=0$, le long d'une trajectoire) et « $\\rho$ uniforme dans l'espace » (deux notions différentes en toute généralité, même si elles coïncident souvent en pratique)</li>
        <li>Oublier le facteur $\\rho$ dans $\\vec\\nabla\\cdot(\\rho\\vec v)$ pour un écoulement compressible (l'équation n'est pas simplement $\\vec\\nabla\\cdot\\vec v=0$ dans ce cas)</li>
        <li>Appliquer $S_1v_1=S_2v_2$ à un écoulement instationnaire ou compressible sans les précautions nécessaires</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'équation de continuité $\\partial \\rho/\\partial t + \\vec\\nabla\\cdot(\\rho\\vec v)=0$ traduit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu3e1" value="wrong"> la conservation de l'énergie</label>
          <label class="option"><input type="radio" name="mflu3e1" value="right"> la conservation locale de la masse</label>
          <label class="option"><input type="radio" name="mflu3e1" value="wrong"> la conservation de la quantité de mouvement</label>
          <label class="option"><input type="radio" name="mflu3e1" value="wrong"> l'incompressibilité systématique du fluide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu3e1','mflu3fb1','Correct — c\\'est la forme locale du principe : la masse ne peut ni apparaître ni disparaître, elle s\\'obtient à partir d\\'un bilan sur un volume de contrôle fixe.','Repense au bilan intégral de départ, sur un volume fixe V.')">Vérifier</button>
        <div class="feedback" id="mflu3fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un écoulement incompressible, l'équation de continuité se réduit à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu3e2" value="wrong"> $\\partial \\rho/\\partial t = 0$</label>
          <label class="option"><input type="radio" name="mflu3e2" value="right"> $\\vec\\nabla \\cdot \\vec v = 0$</label>
          <label class="option"><input type="radio" name="mflu3e2" value="wrong"> $\\vec\\nabla \\times \\vec v = 0$</label>
          <label class="option"><input type="radio" name="mflu3e2" value="wrong"> $\\vec v = 0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu3e2','mflu3fb2','Correct — incompressible signifie Dρ/Dt=0 ; en reportant dans Dρ/Dt+ρ∇·v=0 (avec ρ≠0), on obtient directement ∇·v=0.','Reporte Dρ/Dt=0 dans la forme équivalente de l\\'équation de continuité.')">Vérifier</button>
        <div class="feedback" id="mflu3fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un tuyau incompressible en régime stationnaire, la section passe de $10\\,\\text{cm}^2$ à $2\\,\\text{cm}^2$ ; la vitesse en amont est $v_1=0{,}5\\,\\text{m/s}$. La vitesse en aval $v_2$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu3e3" value="wrong"> 0,1 m/s</label>
          <label class="option"><input type="radio" name="mflu3e3" value="right"> 2,5 m/s</label>
          <label class="option"><input type="radio" name="mflu3e3" value="wrong"> 0,5 m/s</label>
          <label class="option"><input type="radio" name="mflu3e3" value="wrong"> 5 m/s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu3e3','mflu3fb3','Correct — S1v1=S2v2 donne v2=v1·S1/S2=0,5×10/2=2,5 m/s : le fluide accélère fortement dans la section réduite.','Utilise la conservation du débit S1v1=S2v2 et isole v2.')">Vérifier</button>
        <div class="feedback" id="mflu3fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Bilan de masse et équation de continuité")] = {
  intro: "Salut, moi c'est Nova ! Ce chapitre établit l'équation de continuité, la conservation locale de la masse. Pose ta question, ou demande un indice sur un exercice.",
  rules: [
    { test:/continuit[ée]/i, replies:[
      "L'équation de continuité, ∂ρ/∂t + ∇·(ρv) = 0, est la forme locale de la conservation de la masse, obtenue par un bilan sur un volume de contrôle fixe et le théorème de Green-Ostrogradski."
    ]},
    { test:/incompressible/i, replies:[
      "Incompressible signifie Dρ/Dt=0 (masse volumique constante le long de chaque trajectoire, pas forcément uniforme dans l'espace). Cela simplifie l'équation de continuité en ∇·v=0."
    ]},
    { test:/divergence/i, replies:[
      "La divergence du champ de vitesse ∇·v mesure le taux d'expansion (ou de compression) relative d'un volume de fluide suivi dans son mouvement. Elle est nulle pour un écoulement incompressible."
    ]},
    { test:/d[ée]bit|tube de courant/i, replies:[
      "Dans un tube de courant, en régime stationnaire incompressible, le débit volumique se conserve : S1v1=S2v2. C'est pour cela qu'un fluide accélère en traversant un rétrécissement."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : repense au bilan intégral de départ, sur un volume V fixe.",
      "Indice niveau 2 : ce bilan porte sur quelle grandeur physique conservée ?",
      "Indice niveau 3 : c'est la masse — d'où le nom 'équation de continuité'."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : reporte Dρ/Dt=0 dans la forme équivalente de l'équation de continuité.",
      "Indice niveau 2 : Dρ/Dt + ρ∇·v = 0 devient 0 + ρ∇·v = 0.",
      "Indice niveau 3 : comme ρ≠0, on obtient ∇·v = 0."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : applique la conservation du débit S1v1=S2v2.",
      "Indice niveau 2 : v2 = v1·S1/S2 = 0,5×10/2.",
      "Indice niveau 3 : v2 = 2,5 m/s."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MECAFLU_CHAPTERS[mfluKey("Dynamique des fluides parfaits : équation d'Euler")] = {
  objectives: [
    "Définir la notion de fluide parfait (non visqueux)",
    "Établir l'équation d'Euler à partir de la deuxième loi de Newton appliquée à une particule fluide",
    "Identifier les forces volumiques et de pression intervenant dans le bilan de quantité de mouvement",
    "Manipuler l'équation d'Euler sous ses différentes formes équivalentes"
  ],
  prereqs: ["Bilan de masse et équation de continuité", "Statique des fluides : pression et théorème fondamental de l'hydrostatique"],
  bodyHtml: `
    <p>L'équation de continuité (chapitre 3) traduit la conservation de la masse, mais elle ne dit rien sur <em>comment</em> le fluide se met en mouvement. Il faut, comme en mécanique du point, appliquer la deuxième loi de Newton — mais cette fois à une particule fluide. C'est l'objet de ce chapitre, dans le cas simplifié (mais très instructif) d'un <strong>fluide parfait</strong>.</p>

    <h3>1. Fluide parfait : hypothèse de travail</h3>
    <p>Un <strong>fluide parfait</strong> (ou non visqueux) est un fluide idéalisé dans lequel on néglige tout effet de <strong>viscosité</strong> — c'est-à-dire tout frottement interne entre couches de fluide en mouvement relatif. Dans un fluide parfait, les seules forces de contact exercées à travers une surface sont des forces de <strong>pression</strong>, normales à la surface (contrairement à un fluide visqueux, où existent aussi des forces tangentielles, voir chapitre 6). Cette hypothèse simplifie considérablement les équations, tout en restant une excellente approximation dans de nombreuses situations (écoulements à grande vitesse, loin des parois).</p>

    <h3>2. Bilan de quantité de mouvement sur une particule fluide</h3>
    <p>Appliquons la deuxième loi de Newton à une particule fluide de volume $d\\tau$ et de masse $dm=\\rho\\,d\\tau$. Deux types de forces agissent sur elle :</p>
    <ul>
      <li><strong>Forces volumiques</strong> (à distance), comme la pesanteur : $\\rho\\,\\vec g\\,d\\tau$</li>
      <li><strong>Forces de pression</strong> exercées par le fluide environnant sur la surface de la particule : on montre (par un raisonnement analogue à celui du chapitre 1) que leur résultante est $-\\vec\\nabla p\\,d\\tau$</li>
    </ul>
    <p>La deuxième loi de Newton, $dm\\,\\vec a = \\sum \\vec F$, avec $\\vec a = D\\vec v/Dt$ (l'accélération d'une particule fluide, définie au chapitre 2), donne :</p>
    <div class="formula-box">$$\\rho\\,\\frac{D\\vec v}{Dt}\\,d\\tau = -\\vec\\nabla p\\,d\\tau + \\rho\\,\\vec g\\,d\\tau$$</div>
    <p>En simplifiant par $d\\tau$, on obtient l'<strong>équation d'Euler</strong>, équation fondamentale de la dynamique des fluides parfaits :</p>
    <div class="formula-box">$$\\boxed{\\ \\rho\\left(\\frac{\\partial \\vec v}{\\partial t} + (\\vec v\\cdot\\vec\\nabla)\\vec v\\right) = -\\vec\\nabla p + \\rho\\,\\vec g\\ }$$</div>
    <p>C'est l'équivalent, pour un fluide parfait, de la loi $m\\vec a = \\vec F$ pour un point matériel — à ceci près qu'elle est <strong>locale</strong> (valable en chaque point du fluide) et <strong>non linéaire</strong> (à cause du terme convectif $(\\vec v\\cdot\\vec\\nabla)\\vec v$), ce qui la rend en général beaucoup plus difficile à résoudre qu'une équation de la mécanique du point.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — retrouver l'hydrostatique</span>
      Pour un fluide au repos ($\\vec v = \\vec 0$), l'équation d'Euler se réduit exactement au théorème fondamental de l'hydrostatique du chapitre 1 : $\\vec\\nabla p = \\rho\\vec g$. L'hydrostatique est donc le cas particulier statique de l'équation d'Euler.
    </div>

    <h3>3. Généralisation à d'autres forces volumiques</h3>
    <p>Si d'autres forces volumiques $\\vec f_v$ agissent (force électrique sur un fluide chargé, force de Coriolis dans un référentiel tournant...), on les ajoute simplement au second membre :</p>
    <div class="formula-box">$$\\rho\\,\\frac{D\\vec v}{Dt} = -\\vec\\nabla p + \\rho\\,\\vec g + \\vec f_v$$</div>

    <h3>4. Projection sur une ligne de courant</h3>
    <p>Pour un écoulement stationnaire, il est souvent utile de projeter l'équation d'Euler le long d'une ligne de courant. En utilisant l'identité vectorielle $(\\vec v\\cdot\\vec\\nabla)\\vec v = \\vec\\nabla\\left(\\dfrac{v^2}{2}\\right) - \\vec v \\times (\\vec\\nabla\\times\\vec v)$ (où $\\vec\\nabla\\times\\vec v$ est le <strong>vecteur tourbillon</strong>, ou vorticité, étudié au chapitre 9), et en notant que $\\vec v\\times(\\vec\\nabla\\times\\vec v)$ est perpendiculaire à $\\vec v$ (donc sans composante le long de la ligne de courant), l'équation d'Euler stationnaire projetée le long d'une ligne de courant s'écrit :</p>
    <div class="formula-box">$$\\frac{\\partial}{\\partial s}\\left(\\frac{v^2}{2} + \\frac{p}{\\rho} + gz\\right) = 0 \\quad \\text{(fluide incompressible, } \\rho \\text{ constante, le long d'une ligne de courant)}$$</div>
    <p>C'est précisément l'énoncé du <strong>théorème de Bernoulli</strong>, que le chapitre suivant développe en détail et applique à de nombreuses situations concrètes.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — chute libre d'un fluide</span>
      <p><strong>Énoncé :</strong> un fluide parfait tombe verticalement en chute libre (pas de gradient de pression horizontal, $p$ uniforme, seul $\\vec g$ agit). Retrouver, à partir de l'équation d'Euler, l'accélération d'une particule fluide.</p>
      <p><strong>Solution :</strong> $\\vec\\nabla p = \\vec 0$ (pression uniforme), donc l'équation d'Euler se réduit à $\\rho \\dfrac{D\\vec v}{Dt} = \\rho\\vec g$.</p>
      <p class="example-answer">$\\dfrac{D\\vec v}{Dt} = \\vec g$ : chaque particule fluide tombe en chute libre, exactement comme un point matériel — résultat évidemment attendu, mais qui confirme la cohérence de l'équation d'Euler avec la mécanique newtonienne.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un fluide parfait néglige toute viscosité : seules des forces de pression, normales, s'exercent entre couches de fluide</li>
        <li>Équation d'Euler : $\\rho\\dfrac{D\\vec v}{Dt} = -\\vec\\nabla p + \\rho\\vec g$ — c'est la loi de Newton locale et non linéaire pour un fluide parfait</li>
        <li>Le cas statique ($\\vec v=\\vec 0$) redonne exactement le théorème fondamental de l'hydrostatique</li>
        <li>Projetée sur une ligne de courant (stationnaire, incompressible), l'équation d'Euler donne le théorème de Bernoulli (chapitre 5)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le terme convectif $(\\vec v\\cdot\\vec\\nabla)\\vec v$ dans l'accélération, même en régime stationnaire</li>
        <li>Appliquer l'équation d'Euler à un fluide visqueux sans les termes de viscosité (voir chapitre 6, équation de Navier-Stokes) : elle sous-estime alors les effets dissipatifs</li>
        <li>Confondre $D\\vec v/Dt$ (accélération réelle de la particule) et $\\partial \\vec v/\\partial t$ (variation locale seulement)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'équation d'Euler est l'expression, pour un fluide parfait, de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu4e1" value="wrong"> la conservation de la masse</label>
          <label class="option"><input type="radio" name="mflu4e1" value="right"> la deuxième loi de Newton appliquée à une particule fluide</label>
          <label class="option"><input type="radio" name="mflu4e1" value="wrong"> la conservation de l'entropie</label>
          <label class="option"><input type="radio" name="mflu4e1" value="wrong"> le premier principe de la thermodynamique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu4e1','mflu4fb1','Correct — c\\'est exactement F=ma appliqué localement à une particule fluide, avec les forces de pression et de pesanteur.','Repense à la démonstration : de quelle loi fondamentale part-on ?')">Vérifier</button>
        <div class="feedback" id="mflu4fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un fluide parfait au repos ($\\vec v=\\vec 0$), l'équation d'Euler se réduit à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu4e2" value="wrong"> $\\vec\\nabla p = 0$</label>
          <label class="option"><input type="radio" name="mflu4e2" value="right"> $\\vec\\nabla p = \\rho\\vec g$</label>
          <label class="option"><input type="radio" name="mflu4e2" value="wrong"> $\\vec\\nabla\\cdot\\vec v = 0$</label>
          <label class="option"><input type="radio" name="mflu4e2" value="wrong"> $\\rho = 0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu4e2','mflu4fb2','Correct — avec v=0, le terme de gauche (accélération) s\\'annule et il reste exactement le théorème fondamental de l\\'hydrostatique.','Annule tous les termes contenant v dans l\\'équation d\\'Euler.')">Vérifier</button>
        <div class="feedback" id="mflu4fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un fluide parfait sans gradient de pression, une particule fluide soumise uniquement à la pesanteur a pour accélération :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu4e3" value="wrong"> $\\vec a = \\vec 0$</label>
          <label class="option"><input type="radio" name="mflu4e3" value="right"> $\\vec a = \\vec g$</label>
          <label class="option"><input type="radio" name="mflu4e3" value="wrong"> $\\vec a = -\\vec\\nabla p/\\rho$</label>
          <label class="option"><input type="radio" name="mflu4e3" value="wrong"> $\\vec a$ dépend de la viscosité</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu4e3','mflu4fb3','Correct — sans gradient de pression, l\\'équation d\\'Euler se réduit à Dv/Dt=g : la particule fluide tombe en chute libre, comme un point matériel isolé.','Reprends l\\'exemple corrigé du cours : que devient l\\'équation d\\'Euler si ∇p=0 ?')">Vérifier</button>
        <div class="feedback" id="mflu4fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Dynamique des fluides parfaits : équation d'Euler")] = {
  intro: "Salut, moi c'est Nova ! On établit l'équation d'Euler, la loi de Newton pour un fluide parfait. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/fluide parfait/i, replies:[
      "Un fluide parfait néglige toute viscosité : seules des forces de pression, normales aux surfaces, s'exercent — pas de frottement interne tangentiel."
    ]},
    { test:/[ée]quation d.euler/i, replies:[
      "L'équation d'Euler, ρDv/Dt = −∇p + ρg, est la deuxième loi de Newton appliquée localement à une particule fluide parfaite : accélération = forces de pression + pesanteur, par unité de volume."
    ]},
    { test:/hydrostatique/i, replies:[
      "Pour v=0 (fluide au repos), l'équation d'Euler redonne exactement ∇p=ρg : le théorème fondamental de l'hydrostatique est le cas statique de l'équation d'Euler."
    ]},
    { test:/bernoulli/i, replies:[
      "En projetant l'équation d'Euler stationnaire le long d'une ligne de courant, on obtient exactement le théorème de Bernoulli — voir le chapitre suivant !"
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : de quelle loi fondamentale de la mécanique part-on pour établir l'équation d'Euler ?",
      "Indice niveau 2 : c'est une loi qui relie force et accélération.",
      "Indice niveau 3 : c'est la deuxième loi de Newton, appliquée à une particule fluide."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : annule tous les termes contenant v dans l'équation d'Euler.",
      "Indice niveau 2 : il ne reste que le terme de pression et le terme de pesanteur.",
      "Indice niveau 3 : ∇p = ρg — le théorème fondamental de l'hydrostatique."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : reprends l'exemple corrigé du cours avec ∇p=0.",
      "Indice niveau 2 : l'équation d'Euler se réduit alors à Dv/Dt=g.",
      "Indice niveau 3 : la particule tombe en chute libre, a=g."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MECAFLU_CHAPTERS[mfluKey("Théorème de Bernoulli et applications")] = {
  objectives: [
    "Établir le théorème de Bernoulli à partir de l'équation d'Euler",
    "Identifier précisément les hypothèses de validité (fluide parfait, incompressible, stationnaire)",
    "Distinguer la version « le long d'une ligne de courant » de la version « valable partout » (écoulement irrotationnel)",
    "Appliquer le théorème à des situations classiques : Torricelli, Venturi, tube de Pitot"
  ],
  prereqs: ["Dynamique des fluides parfaits : équation d'Euler"],
  bodyHtml: `
    <p>Le <strong>théorème de Bernoulli</strong>, obtenu au chapitre précédent par projection de l'équation d'Euler sur une ligne de courant, est sans doute le résultat le plus utilisé de toute la mécanique des fluides élémentaire : il relie simplement pression, vitesse et altitude, sans qu'il soit nécessaire de résoudre l'équation d'Euler dans toute sa généralité.</p>

    <h3>1. Énoncé du théorème</h3>
    <p>Pour un écoulement <strong>stationnaire</strong> d'un fluide <strong>parfait</strong> (non visqueux) et <strong>incompressible</strong> ($\\rho$ constante), soumis uniquement à la pesanteur, la grandeur suivante — appelée <strong>charge</strong> — est <strong>constante le long d'une ligne de courant</strong> :</p>
    <div class="formula-box">$$\\boxed{\\ \\frac{1}{2}\\rho v^2 + p + \\rho g z = \\text{constante (le long d'une ligne de courant)}\\ }$$</div>
    <table class="mini-table">
      <tr><th>Terme</th><th>Nom usuel</th><th>Signification</th></tr>
      <tr><td>$\\frac{1}{2}\\rho v^2$</td><td>pression cinétique (ou dynamique)</td><td>énergie cinétique par unité de volume</td></tr>
      <tr><td>$p$</td><td>pression statique</td><td>pression thermodynamique locale</td></tr>
      <tr><td>$\\rho g z$</td><td>pression de pesanteur</td><td>énergie potentielle de pesanteur par unité de volume</td></tr>
    </table>
    <p>Le théorème de Bernoulli traduit ainsi, pour un fluide parfait, une <strong>conservation de l'énergie mécanique par unité de volume</strong> le long d'une trajectoire (ce qui n'a rien de surprenant : sans viscosité, il n'y a aucune dissipation).</p>

    <h3>2. Portée du théorème : ligne de courant ou tout l'espace ?</h3>
    <p>La démonstration du chapitre 4 aboutit à une constante <em>a priori différente sur chaque ligne de courant</em>. On montre cependant que si l'écoulement est de plus <strong>irrotationnel</strong> ($\\vec\\nabla\\times\\vec v = \\vec 0$ partout, notion développée au chapitre 9), alors le terme négligé lors de la projection, $\\vec v\\times(\\vec\\nabla\\times\\vec v)$, est identiquement nul — pas seulement perpendiculaire à $\\vec v$ — et la constante de Bernoulli devient alors <strong>la même partout dans l'écoulement</strong>, pas seulement le long d'une ligne de courant donnée.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — à bien vérifier avant d'appliquer Bernoulli</span>
      Pour comparer deux points situés sur <strong>deux lignes de courant différentes</strong>, il faut que l'écoulement soit irrotationnel. Pour comparer deux points sur la <strong>même</strong> ligne de courant, l'hypothèse d'irrotationnalité n'est pas nécessaire — seules comptent les hypothèses de fluide parfait, incompressible et stationnaire.
    </div>

    <h3>3. Application : formule de Torricelli</h3>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un grand réservoir ouvert, rempli d'eau jusqu'à une hauteur $h$ au-dessus d'un petit orifice percé à sa base, se vide. Quelle est la vitesse d'écoulement $v$ à la sortie de l'orifice ?</p>
      <p><strong>Solution :</strong> on applique Bernoulli entre la surface libre (point 1 : $v_1\\approx 0$ — le réservoir est grand donc la surface descend très lentement —, $p_1=p_0$ atmosphérique, $z_1=h$) et l'orifice (point 2 : $v_2=v$ à déterminer, $p_2=p_0$ car l'orifice débouche à l'air libre, $z_2=0$) : $$p_0 + 0 + \\rho g h = p_0 + \\frac{1}{2}\\rho v^2 + 0$$</p>
      <p class="example-answer">$v = \\sqrt{2gh}$ — <strong>formule de Torricelli</strong> : la vitesse de sortie est identique à celle d'une chute libre depuis la hauteur $h$, un résultat remarquable obtenu sans résoudre aucune équation différentielle.</p>
    </div>

    <h3>4. Application : effet Venturi</h3>
    <p>Dans un tuyau horizontal ($z$ constant) de section variable, la conservation du débit (chapitre 3, $S_1v_1=S_2v_2$) impose que le fluide <strong>accélère</strong> là où la section <strong>diminue</strong>. Le théorème de Bernoulli, appliqué entre les deux sections ($z_1=z_2$) :</p>
    <div class="formula-box">$$p_1 + \\frac{1}{2}\\rho v_1^2 = p_2 + \\frac{1}{2}\\rho v_2^2$$</div>
    <p>montre alors que si $v_2>v_1$ (rétrécissement), nécessairement $p_2 < p_1$ : <strong>la pression diminue là où la vitesse augmente</strong>. C'est l'<strong>effet Venturi</strong>, exploité par exemple dans les carburateurs, les débitmètres à Venturi, ou pour expliquer (en partie) la portance d'une aile d'avion.</p>

    <h3>5. Application : tube de Pitot</h3>
    <p>Un <strong>tube de Pitot</strong> mesure la vitesse d'un écoulement en comparant la <strong>pression statique</strong> $p$ (mesurée par une prise latérale, où le fluide continue de s'écouler à la vitesse $v$) à la <strong>pression d'arrêt</strong> $p_i$ (mesurée en un point où l'écoulement est localement stoppé, appelé <strong>point d'arrêt</strong>, où $v=0$). Bernoulli, appliqué entre un point de l'écoulement non perturbé et le point d'arrêt (même altitude) :</p>
    <div class="formula-box">$$p + \\frac{1}{2}\\rho v^2 = p_i \\quad \\Longrightarrow \\quad v = \\sqrt{\\frac{2(p_i-p)}{\\rho}}$$</div>
    <p>C'est le principe de mesure de vitesse utilisé, entre autres, sur les avions (sondes Pitot).</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <rect x="5" y="10" width="60" height="55" fill="#4C7CFF" opacity="0.15" stroke="#4C7CFF" stroke-width="1"/>
          <line x1="5" y1="20" x2="65" y2="20" stroke="#4C7CFF" stroke-width="1.2"/>
          <rect x="55" y="60" width="10" height="8" fill="#F0B94D"/>
          <path d="M65,64 Q90,64 110,75" stroke="#2DD4C4" stroke-width="1.6" fill="none"/>
          <text x="10" y="35" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">h</text>
        </svg>
        <span>vidange de Torricelli : $v=\\sqrt{2gh}$</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Théorème de Bernoulli : $\\frac{1}{2}\\rho v^2 + p + \\rho g z = \\text{cste}$ le long d'une ligne de courant (fluide parfait, incompressible, stationnaire)</li>
        <li>La constante est la même dans tout l'écoulement si celui-ci est de plus irrotationnel</li>
        <li>Formule de Torricelli : $v=\\sqrt{2gh}$ (vitesse de vidange d'un réservoir)</li>
        <li>Effet Venturi : la pression diminue là où la vitesse augmente (section réduite)</li>
        <li>Tube de Pitot : mesure de vitesse à partir de la différence entre pression d'arrêt et pression statique</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer Bernoulli entre deux points de lignes de courant différentes sans avoir vérifié que l'écoulement est irrotationnel</li>
        <li>Oublier une hypothèse de validité (viscosité négligeable, écoulement stationnaire, fluide incompressible) : Bernoulli est mis en défaut dans un écoulement visqueux dissipatif ou fortement instationnaire</li>
        <li>Confondre pression statique $p$ et pression d'arrêt $p_i=p+\\frac{1}{2}\\rho v^2$ (aussi appelée pression totale, pour un écoulement horizontal)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un réservoir ouvert est rempli d'eau jusqu'à une hauteur $h=5\\,\\text{m}$ au-dessus d'un petit orifice ($g=10\\,\\text{m/s}^2$). La vitesse de sortie de l'eau est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu5e1" value="wrong"> 5 m/s</label>
          <label class="option"><input type="radio" name="mflu5e1" value="right"> 10 m/s</label>
          <label class="option"><input type="radio" name="mflu5e1" value="wrong"> 50 m/s</label>
          <label class="option"><input type="radio" name="mflu5e1" value="wrong"> 25 m/s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu5e1','mflu5fb1','Correct — v=√(2gh)=√(2×10×5)=√100=10 m/s (formule de Torricelli).','Applique v=√(2gh) avec g=10 m/s² et h=5 m.')">Vérifier</button>
        <div class="feedback" id="mflu5fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un tuyau horizontal, la section diminue et la vitesse du fluide augmente. D'après l'effet Venturi, la pression :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu5e2" value="wrong"> augmente</label>
          <label class="option"><input type="radio" name="mflu5e2" value="right"> diminue</label>
          <label class="option"><input type="radio" name="mflu5e2" value="wrong"> reste constante</label>
          <label class="option"><input type="radio" name="mflu5e2" value="wrong"> devient négative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu5e2','mflu5fb2','Correct — Bernoulli à altitude constante impose p+½ρv² constant : quand v augmente, p diminue nécessairement pour compenser.','Applique Bernoulli à altitude constante entre les deux sections : que doit faire p si v augmente ?')">Vérifier</button>
        <div class="feedback" id="mflu5fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un tube de Pitot mesure une différence $p_i-p = 800\\,\\text{Pa}$ dans l'air ($\\rho=1{,}25\\,\\text{kg/m}^3$). La vitesse de l'écoulement est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu5e3" value="wrong"> 8 m/s</label>
          <label class="option"><input type="radio" name="mflu5e3" value="right"> 36 m/s</label>
          <label class="option"><input type="radio" name="mflu5e3" value="wrong"> 640 m/s</label>
          <label class="option"><input type="radio" name="mflu5e3" value="wrong"> 1,6 m/s</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu5e3','mflu5fb3','Correct — v=√(2×800/1,25)=√1280≈35,8 m/s ≈ 36 m/s.','Utilise v=√(2(pi−p)/ρ) avec les valeurs données.')">Vérifier</button>
        <div class="feedback" id="mflu5fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Théorème de Bernoulli et applications")] = {
  intro: "Salut, c'est Nova ! Le théorème de Bernoulli et ses applications classiques (Torricelli, Venturi, Pitot). Pose ta question, ou demande un indice sur un exercice.",
  rules: [
    { test:/bernoulli/i, replies:[
      "Le théorème de Bernoulli, ½ρv²+p+ρgz=cste le long d'une ligne de courant, exprime la conservation de l'énergie mécanique par unité de volume pour un fluide parfait, incompressible, en écoulement stationnaire."
    ]},
    { test:/torricelli/i, replies:[
      "La formule de Torricelli v=√(2gh) donne la vitesse de vidange d'un réservoir : c'est exactement la vitesse d'une chute libre depuis la hauteur h."
    ]},
    { test:/venturi/i, replies:[
      "L'effet Venturi : dans un tuyau horizontal, quand la section diminue, la vitesse augmente (conservation du débit) et la pression diminue (Bernoulli) — la pression et la vitesse varient en sens opposés."
    ]},
    { test:/pitot/i, replies:[
      "Le tube de Pitot mesure la vitesse à partir de la différence entre pression d'arrêt pi (point où v=0) et pression statique p : v=√(2(pi−p)/ρ)."
    ]},
    { test:/irrotationnel/i, replies:[
      "Si l'écoulement est irrotationnel (∇×v=0), la constante de Bernoulli est la même partout dans l'écoulement, pas seulement le long d'une ligne de courant donnée."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique la formule de Torricelli v=√(2gh).",
      "Indice niveau 2 : 2gh = 2×10×5 = 100.",
      "Indice niveau 3 : v=√100=10 m/s."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique Bernoulli à altitude constante entre les deux sections du tuyau.",
      "Indice niveau 2 : p+½ρv² doit rester constant.",
      "Indice niveau 3 : si v augmente, p doit diminuer."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : utilise v=√(2(pi−p)/ρ).",
      "Indice niveau 2 : calcule 2×800/1,25 = 1280.",
      "Indice niveau 3 : v=√1280≈36 m/s."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MECAFLU_CHAPTERS[mfluKey("Viscosité et fluides newtoniens : équations de Navier-Stokes")] = {
  objectives: [
    "Définir la viscosité dynamique à partir de la loi de Newton pour les contraintes visqueuses",
    "Distinguer fluides newtoniens et non newtoniens",
    "Établir l'équation de Navier-Stokes pour un fluide newtonien incompressible",
    "Interpréter physiquement chacun des termes de l'équation"
  ],
  prereqs: ["Dynamique des fluides parfaits : équation d'Euler", "Bilan de masse et équation de continuité"],
  bodyHtml: `
    <p>Aucun fluide réel n'est parfait : tous présentent, à des degrés divers, une résistance interne au cisaillement appelée <strong>viscosité</strong>. Ce chapitre introduit cette propriété et généralise l'équation d'Euler pour obtenir l'équation de <strong>Navier-Stokes</strong>, pierre angulaire de toute la mécanique des fluides visqueux moderne.</p>

    <h3>1. Mise en évidence de la viscosité : expérience de Couette</h3>
    <p>Considérons un fluide entre deux plaques planes parallèles, distantes de $h$ : la plaque inférieure est fixe, la plaque supérieure se déplace à vitesse constante $U$ dans son propre plan. Expérimentalement, on observe que le fluide adhère aux parois (<strong>condition de non-glissement</strong> : $v=0$ sur la plaque fixe, $v=U$ sur la plaque mobile) et que la vitesse varie de façon <strong>continue</strong> entre les deux plaques. Pour maintenir la plaque supérieure en mouvement, il faut exercer une force tangentielle $F$, proportionnelle à sa surface $S$ et au gradient de vitesse $U/h$ :</p>
    <div class="formula-box">$$\\frac{F}{S} = \\eta\\,\\frac{U}{h}$$</div>
    <p>où $\\eta$ (en $\\text{Pa}\\cdot\\text{s}$) est la <strong>viscosité dynamique</strong> du fluide. Cette contrainte tangentielle $\\tau = F/S$ traduit un <strong>frottement interne</strong> entre couches de fluide en mouvement relatif, transmis de couche en couche depuis la plaque mobile jusqu'à la plaque fixe.</p>

    <h3>2. Loi de Newton pour la viscosité — fluides newtoniens</h3>
    <p>Plus généralement, pour un écoulement unidirectionnel $\\vec v = v_x(y)\\,\\vec e_x$, la contrainte tangentielle exercée par une couche de fluide sur la couche adjacente est proportionnelle au <strong>gradient de vitesse</strong> (taux de cisaillement) :</p>
    <div class="formula-box">$$\\tau_{xy} = \\eta\\,\\frac{\\partial v_x}{\\partial y}$$</div>
    <p>Un fluide qui obéit à cette relation <strong>linéaire</strong>, avec $\\eta$ indépendante du taux de cisaillement, est appelé <strong>fluide newtonien</strong> (l'eau, l'air, la plupart des huiles simples le sont, dans une large gamme de conditions). Certains fluides — dits <strong>non newtoniens</strong> — ont une viscosité apparente qui dépend du taux de cisaillement : peintures, sang, pâtes, certains polymères (fluides rhéofluidifiants, rhéoépaississants, à seuil...). Ce cours se limite aux fluides newtoniens.</p>
    <div class="key-point">
      <span class="eyebrow">Viscosité cinématique</span>
      On définit aussi la <strong>viscosité cinématique</strong> $\\nu = \\eta/\\rho$ (en $\\text{m}^2/\\text{s}$), qui apparaît naturellement dans les équations du mouvement et joue le rôle d'un <strong>coefficient de diffusion de la quantité de mouvement</strong> — à rapprocher formellement du coefficient de diffusion thermique ou de diffusion de particules.
    </div>

    <h3>3. Des forces de viscosité à l'équation de Navier-Stokes</h3>
    <p>Pour établir l'équation générale du mouvement d'un fluide visqueux newtonien, il faut ajouter, aux forces de pression et de pesanteur déjà présentes dans l'équation d'Euler, la résultante des forces visqueuses par unité de volume. On admet ici le résultat (obtenu rigoureusement à partir du tenseur des contraintes visqueuses) : pour un fluide newtonien <strong>incompressible</strong> ($\\vec\\nabla\\cdot\\vec v=0$) de viscosité $\\eta$ uniforme, cette résultante volumique s'écrit $\\eta\\,\\nabla^2 \\vec v$ (le laplacien vectoriel du champ de vitesse). L'équation du mouvement devient alors :</p>
    <div class="formula-box">$$\\boxed{\\ \\rho\\left(\\frac{\\partial \\vec v}{\\partial t} + (\\vec v\\cdot\\vec\\nabla)\\vec v\\right) = -\\vec\\nabla p + \\eta\\,\\nabla^2 \\vec v + \\rho\\,\\vec g\\ }$$</div>
    <p>C'est l'<strong>équation de Navier-Stokes</strong> pour un fluide newtonien incompressible, la loi fondamentale de la mécanique des fluides visqueux (établie indépendamment par Claude Navier en 1822 puis par George Stokes en 1845). Elle se complète toujours de l'équation de continuité $\\vec\\nabla\\cdot\\vec v=0$, formant un système de quatre équations scalaires couplées (trois composantes de Navier-Stokes + continuité) pour quatre inconnues ($v_x,v_y,v_z,p$).</p>

    <table class="mini-table">
      <tr><th>Terme</th><th>Interprétation</th></tr>
      <tr><td>$\\rho\\,\\partial \\vec v/\\partial t$</td><td>inertie locale (variation temporelle en un point fixe)</td></tr>
      <tr><td>$\\rho\\,(\\vec v\\cdot\\vec\\nabla)\\vec v$</td><td>inertie convective (non linéaire)</td></tr>
      <tr><td>$-\\vec\\nabla p$</td><td>force de pression (identique au cas parfait)</td></tr>
      <tr><td>$\\eta\\,\\nabla^2 \\vec v$</td><td>force visqueuse — diffuse la quantité de mouvement, lisse les gradients de vitesse</td></tr>
      <tr><td>$\\rho\\,\\vec g$</td><td>pesanteur</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — l'un des grands problèmes ouverts des mathématiques</span>
      L'existence et la régularité (l'absence de singularité) des solutions de l'équation de Navier-Stokes en trois dimensions, pour des conditions initiales générales, restent un <strong>problème ouvert</strong> : c'est l'un des sept « problèmes du prix du millénaire » du Clay Mathematics Institute, doté d'un million de dollars. La simplicité apparente de l'équation cache une richesse mathématique considérable — c'est cette même non-linéarité qui est à l'origine de la turbulence.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — condition de non-glissement</span>
      <p><strong>Énoncé :</strong> pourquoi, physiquement, un fluide visqueux a-t-il une vitesse nulle exactement au contact d'une paroi fixe (et non une vitesse de glissement) ?</p>
      <p><strong>Solution :</strong> la viscosité traduit un couplage moléculaire entre couches de fluide adjacentes ; ce même couplage s'exerce entre la première couche de fluide et les molécules de la paroi solide. En l'absence de glissement relatif observé expérimentalement (sauf cas très particuliers à l'échelle nanométrique ou en régime raréfié), le fluide « colle » à la paroi.</p>
      <p class="example-answer">C'est la <strong>condition de non-glissement</strong> (« no-slip condition »), une condition aux limites essentielle pour résoudre Navier-Stokes près d'une paroi — et à l'origine, comme on le verra au chapitre 9, de la formation d'une couche limite.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La viscosité dynamique $\\eta$ traduit un frottement interne : $\\tau_{xy}=\\eta\\,\\partial v_x/\\partial y$ pour un fluide newtonien</li>
        <li>Viscosité cinématique $\\nu=\\eta/\\rho$ : coefficient de diffusion de la quantité de mouvement</li>
        <li>Équation de Navier-Stokes (incompressible) : $\\rho\\left(\\dfrac{\\partial \\vec v}{\\partial t}+(\\vec v\\cdot\\vec\\nabla)\\vec v\\right) = -\\vec\\nabla p + \\eta\\nabla^2\\vec v + \\rho\\vec g$</li>
        <li>Condition de non-glissement à une paroi fixe : $\\vec v=\\vec 0$ au contact du solide</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre viscosité dynamique $\\eta$ (Pa·s) et viscosité cinématique $\\nu=\\eta/\\rho$ (m²/s) : elles n'ont ni la même dimension ni la même valeur numérique</li>
        <li>Oublier la condition de non-glissement lors de la résolution d'un problème visqueux près d'une paroi</li>
        <li>Appliquer la loi de viscosité newtonienne $\\tau=\\eta\\,\\partial v_x/\\partial y$ à un fluide non newtonien (sang, peinture, dentifrice...), où $\\eta$ n'est pas constante</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un fluide newtonien est caractérisé par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu6e1" value="wrong"> une viscosité nulle</label>
          <label class="option"><input type="radio" name="mflu6e1" value="right"> une relation linéaire entre contrainte de cisaillement et taux de cisaillement, avec $\\eta$ constante</label>
          <label class="option"><input type="radio" name="mflu6e1" value="wrong"> une masse volumique constante</label>
          <label class="option"><input type="radio" name="mflu6e1" value="wrong"> une pression uniforme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu6e1','mflu6fb1','Correct — c\\'est la loi τ=η·∂vx/∂y avec η indépendante du taux de cisaillement qui définit un fluide newtonien (eau, air...).','Relis la définition : c\\'est une propriété de la relation contrainte-cisaillement, pas de la compressibilité.')">Vérifier</button>
        <div class="feedback" id="mflu6fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Par rapport à l'équation d'Euler, l'équation de Navier-Stokes (incompressible) ajoute :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu6e2" value="wrong"> un terme de pesanteur</label>
          <label class="option"><input type="radio" name="mflu6e2" value="right"> un terme visqueux $\\eta\\,\\nabla^2 \\vec v$</label>
          <label class="option"><input type="radio" name="mflu6e2" value="wrong"> un terme de pression</label>
          <label class="option"><input type="radio" name="mflu6e2" value="wrong"> un terme convectif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu6e2','mflu6fb2','Correct — pression, pesanteur et terme convectif sont déjà présents dans Euler ; c\\'est le terme visqueux η∇²v qui est la nouveauté de Navier-Stokes.','Compare terme à terme l\\'équation d\\'Euler et l\\'équation de Navier-Stokes du cours.')">Vérifier</button>
        <div class="feedback" id="mflu6fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Au contact d'une paroi solide fixe, la condition de non-glissement impose que la vitesse du fluide y est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu6e3" value="wrong"> égale à la vitesse du fluide loin de la paroi</label>
          <label class="option"><input type="radio" name="mflu6e3" value="right"> nulle</label>
          <label class="option"><input type="radio" name="mflu6e3" value="wrong"> maximale</label>
          <label class="option"><input type="radio" name="mflu6e3" value="wrong"> égale à la vitesse du son</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu6e3','mflu6fb3','Correct — la condition de non-glissement impose v=0 exactement au contact d\\'une paroi fixe, quelle que soit la vitesse de l\\'écoulement loin de la paroi.','Relis la définition de la condition de non-glissement (no-slip condition) du cours.')">Vérifier</button>
        <div class="feedback" id="mflu6fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Viscosité et fluides newtoniens : équations de Navier-Stokes")] = {
  intro: "Salut, moi c'est Nova ! On introduit la viscosité et l'équation de Navier-Stokes. Demande-moi une définition, ou un indice sur un exercice.",
  rules: [
    { test:/viscosit[ée]/i, replies:[
      "La viscosité dynamique η relie contrainte tangentielle et gradient de vitesse : τxy=η·∂vx/∂y (loi de Newton pour la viscosité). La viscosité cinématique ν=η/ρ est le coefficient de diffusion de la quantité de mouvement."
    ]},
    { test:/newtonien/i, replies:[
      "Un fluide newtonien obéit à une relation linéaire entre contrainte et taux de cisaillement, avec η constante (eau, air...). Un fluide non newtonien a une viscosité apparente qui dépend du cisaillement (sang, peinture...)."
    ]},
    { test:/navier.?stokes/i, replies:[
      "L'équation de Navier-Stokes, ρ(∂v/∂t+(v·∇)v) = −∇p+η∇²v+ρg, généralise l'équation d'Euler en ajoutant le terme visqueux η∇²v. C'est l'équation fondamentale de la mécanique des fluides visqueux."
    ]},
    { test:/non.?glissement|no.?slip/i, replies:[
      "La condition de non-glissement impose v=0 exactement au contact d'une paroi fixe : le fluide 'colle' à la paroi à cause du couplage moléculaire visqueux."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : c'est une propriété de la relation contrainte-cisaillement.",
      "Indice niveau 2 : cette relation doit être linéaire, avec η constante.",
      "Indice niveau 3 : c'est bien τ=η·∂vx/∂y avec η constante qui définit un fluide newtonien."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : compare terme à terme les deux équations du cours.",
      "Indice niveau 2 : pression, pesanteur, convection sont déjà dans Euler.",
      "Indice niveau 3 : c'est le terme visqueux η∇²v qui est nouveau."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la définition de la condition de non-glissement.",
      "Indice niveau 2 : le fluide colle à la paroi.",
      "Indice niveau 3 : v=0 exactement au contact de la paroi fixe."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
MECAFLU_CHAPTERS[mfluKey("Écoulements visqueux exacts : Couette et Poiseuille")] = {
  objectives: [
    "Résoudre l'équation de Navier-Stokes dans le cas de l'écoulement de Couette plan",
    "Résoudre l'équation de Navier-Stokes dans le cas de l'écoulement de Poiseuille (plan puis cylindrique)",
    "Établir la loi de Hagen-Poiseuille reliant débit et perte de charge dans un tube cylindrique",
    "Identifier les hypothèses communes qui rendent ces résolutions analytiques possibles"
  ],
  prereqs: ["Viscosité et fluides newtoniens : équations de Navier-Stokes"],
  bodyHtml: `
    <p>L'équation de Navier-Stokes, non linéaire, n'admet de solutions analytiques exactes que dans un nombre restreint de configurations très simplifiées — mais ces solutions sont d'un grand intérêt pratique et pédagogique. Ce chapitre en étudie deux, parmi les plus classiques : l'écoulement de <strong>Couette</strong> et l'écoulement de <strong>Poiseuille</strong>.</p>

    <h3>1. Hypothèses simplificatrices communes</h3>
    <p>Dans les deux cas étudiés, on considère un écoulement <strong>stationnaire</strong>, <strong>unidirectionnel</strong> ($\\vec v = v_x(y)\\,\\vec e_x$ uniquement, avec $v_y=v_z=0$) et <strong>incompressible</strong>. Sous ces hypothèses, le terme convectif $(\\vec v\\cdot\\vec\\nabla)\\vec v$ s'annule identiquement (car $v_x$ ne dépend que de $y$, pas de $x$, donc $v_x\\partial v_x/\\partial x=0$) : l'équation de Navier-Stokes devient <strong>linéaire</strong>, ce qui la rend intégrable exactement.</p>

    <h3>2. Écoulement de Couette plan</h3>
    <p>On reprend la configuration du chapitre précédent : deux plaques planes horizontales infinies, distantes de $h$, la plaque inférieure ($y=0$) fixe, la plaque supérieure ($y=h$) animée de la vitesse $U$. Aucun gradient de pression n'est imposé selon $x$ ($\\partial p/\\partial x = 0$ — c'est le seul moteur de l'écoulement qui est le mouvement de la paroi). La composante selon $x$ de Navier-Stokes se réduit à :</p>
    <div class="formula-box">$$0 = \\eta\\,\\frac{d^2 v_x}{dy^2} \\quad \\Longrightarrow \\quad v_x(y) = ay+b$$</div>
    <p>Les conditions de non-glissement $v_x(0)=0$ et $v_x(h)=U$ donnent $b=0$ et $a=U/h$ :</p>
    <div class="formula-box">$$v_x(y) = U\\,\\frac{y}{h}$$</div>
    <p>Le profil de vitesse est <strong>linéaire</strong> — c'est l'écoulement de Couette, déjà utilisé au chapitre précédent pour introduire la viscosité. La contrainte visqueuse $\\tau_{xy}=\\eta\\,dv_x/dy = \\eta U/h$ est <strong>uniforme</strong> dans tout l'écoulement.</p>

    <h3>3. Écoulement de Poiseuille plan</h3>
    <p>On considère maintenant les <strong>deux</strong> plaques planes <strong>fixes</strong> ($v_x(0)=v_x(h)=0$), mais l'écoulement est cette fois entretenu par un <strong>gradient de pression</strong> constant imposé selon $x$ : $\\dfrac{\\partial p}{\\partial x} = -\\dfrac{\\Delta p}{L}$ (chute de pression $\\Delta p$ sur une longueur $L$). La composante selon $x$ de Navier-Stokes donne :</p>
    <div class="formula-box">$$0 = -\\frac{\\partial p}{\\partial x} + \\eta\\,\\frac{d^2 v_x}{dy^2} \\quad \\Longrightarrow \\quad \\eta\\,\\frac{d^2 v_x}{dy^2} = -\\frac{\\Delta p}{L}$$</div>
    <p>En intégrant deux fois par rapport à $y$, puis en appliquant les deux conditions de non-glissement, on obtient un profil <strong>parabolique</strong> :</p>
    <div class="formula-box">$$v_x(y) = \\frac{\\Delta p}{2\\eta L}\\,y(h-y)$$</div>
    <p>La vitesse est maximale au centre ($y=h/2$) : $v_{max} = \\dfrac{\\Delta p\\, h^2}{8\\eta L}$, et nulle sur les deux parois.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="10" y1="15" x2="130" y2="15" stroke="#5A6472" stroke-width="1.6"/>
          <line x1="10" y1="75" x2="130" y2="75" stroke="#5A6472" stroke-width="1.6"/>
          <path d="M10,15 Q70,45 10,75" fill="none" stroke="#4C7CFF" stroke-width="1.4" stroke-dasharray="0"/>
          <line x1="10" y1="20" x2="20" y2="20" stroke="#2DD4C4" stroke-width="1.2"/>
          <line x1="10" y1="30" x2="40" y2="30" stroke="#2DD4C4" stroke-width="1.2"/>
          <line x1="10" y1="45" x2="55" y2="45" stroke="#2DD4C4" stroke-width="1.2"/>
          <line x1="10" y1="60" x2="40" y2="60" stroke="#2DD4C4" stroke-width="1.2"/>
          <line x1="10" y1="70" x2="20" y2="70" stroke="#2DD4C4" stroke-width="1.2"/>
        </svg>
        <span>profil parabolique de Poiseuille entre deux plaques fixes</span>
      </div>
    </div>

    <h3>4. Écoulement de Poiseuille cylindrique : loi de Hagen-Poiseuille</h3>
    <p>Le cas le plus utile en pratique est l'écoulement dans un tube cylindrique de rayon $R$ (canalisation, vaisseau sanguin, capillaire...). En coordonnées cylindriques, avec $v_x(r)$ ne dépendant que de la distance $r$ à l'axe, un calcul analogue (utilisant le laplacien en coordonnées cylindriques) donne un profil également parabolique :</p>
    <div class="formula-box">$$v_x(r) = \\frac{\\Delta p}{4\\eta L}\\big(R^2 - r^2\\big)$$</div>
    <p>En intégrant ce profil sur la section du tube ($Q_v = \\displaystyle\\int_0^R v_x(r)\\,2\\pi r\\,dr$), on obtient le <strong>débit volumique</strong> — c'est la célèbre <strong>loi de Hagen-Poiseuille</strong> :</p>
    <div class="formula-box">$$\\boxed{\\ Q_v = \\frac{\\pi R^4 \\Delta p}{8\\eta L}\\ }$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — sensibilité extrême au rayon</span>
      Le débit varie comme $R^4$ : diviser le rayon d'un tube par deux (à perte de charge $\\Delta p$ fixée) divise le débit par <strong>seize</strong>. C'est cette loi qui explique, en physiologie, pourquoi une faible réduction du diamètre d'un vaisseau sanguin (athérosclérose) a un effet dramatique sur le débit sanguin.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> de l'huile ($\\eta=0{,}1\\,\\text{Pa}\\cdot\\text{s}$) s'écoule dans un tube de rayon $R=1\\,\\text{cm}$, longueur $L=2\\,\\text{m}$, sous une différence de pression $\\Delta p=4000\\,\\text{Pa}$. Calculer le débit.</p>
      <p><strong>Solution :</strong> $Q_v = \\dfrac{\\pi R^4 \\Delta p}{8\\eta L} = \\dfrac{\\pi \\times (10^{-2})^4 \\times 4000}{8\\times 0{,}1\\times 2}$.</p>
      <p class="example-answer">$Q_v = \\dfrac{\\pi \\times 10^{-8}\\times 4000}{1{,}6} \\approx 7{,}85\\times 10^{-5}\\,\\text{m}^3/\\text{s} \\approx 78{,}5\\,\\text{mL/s}$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Pour un écoulement stationnaire, unidirectionnel, incompressible, le terme convectif s'annule : Navier-Stokes devient linéaire et intégrable exactement</li>
        <li>Écoulement de Couette (paroi mobile, sans gradient de pression) : profil de vitesse linéaire</li>
        <li>Écoulement de Poiseuille (parois fixes, gradient de pression imposé) : profil de vitesse parabolique</li>
        <li>Loi de Hagen-Poiseuille dans un tube cylindrique : $Q_v = \\dfrac{\\pi R^4 \\Delta p}{8\\eta L}$ — extrêmement sensible au rayon ($\\propto R^4$)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre les deux écoulements : Couette est entraîné par le mouvement d'une paroi (profil linéaire), Poiseuille par un gradient de pression entre parois fixes (profil parabolique)</li>
        <li>Oublier que ces solutions exactes supposent un terme convectif nul — elles ne s'appliquent pas à un écoulement établi dans une géométrie plus complexe (entrée de tube, coude...)</li>
        <li>Confondre rayon $R$ et diamètre $D=2R$ dans la loi de Hagen-Poiseuille (l'exposant 4 s'applique à $R$, pas à $D$, ou alors il faut ajuster la constante)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le profil de vitesse de l'écoulement de Couette plan (une paroi fixe, une paroi mobile, pas de gradient de pression) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu7e1" value="wrong"> parabolique</label>
          <label class="option"><input type="radio" name="mflu7e1" value="right"> linéaire</label>
          <label class="option"><input type="radio" name="mflu7e1" value="wrong"> exponentiel</label>
          <label class="option"><input type="radio" name="mflu7e1" value="wrong"> uniforme (constant)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu7e1','mflu7fb1','Correct — sans gradient de pression, d²vx/dy²=0 donne vx=ay+b, un profil linéaire, contrairement à Poiseuille qui est parabolique.','Résous d²vx/dy²=0 : quelle est la forme générale de la solution ?')">Vérifier</button>
        <div class="feedback" id="mflu7fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans la loi de Hagen-Poiseuille $Q_v=\\pi R^4 \\Delta p/(8\\eta L)$, si l'on divise le rayon $R$ par 2 (à $\\Delta p$, $\\eta$, $L$ fixés), le débit est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu7e2" value="wrong"> divisé par 2</label>
          <label class="option"><input type="radio" name="mflu7e2" value="wrong"> divisé par 4</label>
          <label class="option"><input type="radio" name="mflu7e2" value="right"> divisé par 16</label>
          <label class="option"><input type="radio" name="mflu7e2" value="wrong"> inchangé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu7e2','mflu7fb2','Correct — Qv∝R⁴, donc diviser R par 2 divise Qv par 2⁴=16 : c\\'est une dépendance extrêmement sensible au rayon.','Calcule (R/2)⁴/R⁴ pour voir le facteur de réduction du débit.')">Vérifier</button>
        <div class="feedback" id="mflu7fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pourquoi le terme convectif $(\\vec v\\cdot\\vec\\nabla)\\vec v$ s'annule-t-il pour les écoulements de Couette et Poiseuille étudiés dans ce chapitre ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu7e3" value="wrong"> parce que le fluide est parfait (non visqueux)</label>
          <label class="option"><input type="radio" name="mflu7e3" value="right"> parce que $v_x$ ne dépend que de $y$, pas de $x$ (écoulement unidirectionnel établi)</label>
          <label class="option"><input type="radio" name="mflu7e3" value="wrong"> parce que la pression est uniforme</label>
          <label class="option"><input type="radio" name="mflu7e3" value="wrong"> parce que l'écoulement est instationnaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu7e3','mflu7fb3','Correct — comme vx=vx(y) uniquement, le terme vx·∂vx/∂x est nul (pas de dépendance en x), ce qui rend Navier-Stokes linéaire et permet la résolution exacte.','Repense à la définition du terme convectif : de quelle dérivée partielle dépend-il ici, et est-elle nulle ?')">Vérifier</button>
        <div class="feedback" id="mflu7fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Écoulements visqueux exacts : Couette et Poiseuille")] = {
  intro: "Salut, c'est Nova ! On résout Navier-Stokes exactement pour deux cas classiques : Couette et Poiseuille. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/couette/i, replies:[
      "L'écoulement de Couette (paroi mobile, pas de gradient de pression) a un profil de vitesse linéaire : vx(y)=U·y/h."
    ]},
    { test:/poiseuille/i, replies:[
      "L'écoulement de Poiseuille (parois fixes, gradient de pression imposé) a un profil parabolique. En tube cylindrique, ça donne la loi de Hagen-Poiseuille : Qv=πR⁴Δp/(8ηL)."
    ]},
    { test:/hagen/i, replies:[
      "La loi de Hagen-Poiseuille Qv=πR⁴Δp/(8ηL) montre une dépendance très forte au rayon (R⁴) : diviser R par 2 divise le débit par 16."
    ]},
    { test:/terme convectif/i, replies:[
      "Pour ces écoulements unidirectionnels établis, vx ne dépend que de y (pas de x), donc vx·∂vx/∂x=0 : le terme convectif s'annule et Navier-Stokes devient linéaire."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : résous d²vx/dy²=0.",
      "Indice niveau 2 : la solution générale est vx=ay+b.",
      "Indice niveau 3 : c'est un profil linéaire, pas parabolique."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : Qv est proportionnel à R⁴.",
      "Indice niveau 2 : calcule (R/2)⁴/R⁴.",
      "Indice niveau 3 : ça fait 1/16 — le débit est divisé par 16."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : repense à la définition du terme convectif et à quelle variable dépend vx ici.",
      "Indice niveau 2 : vx=vx(y) seulement, pas de x.",
      "Indice niveau 3 : donc vx·∂vx/∂x=0 — le terme convectif est nul."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
MECAFLU_CHAPTERS[mfluKey("Analyse dimensionnelle, similitude et nombre de Reynolds")] = {
  objectives: [
    "Mettre en œuvre le théorème de Vaschy-Buckingham (théorème π) sur un exemple",
    "Définir le nombre de Reynolds et l'interpréter comme un rapport de forces",
    "Relier le nombre de Reynolds à la nature laminaire ou turbulente d'un écoulement",
    "Comprendre le principe de la similitude dynamique pour les essais sur maquette"
  ],
  prereqs: ["Viscosité et fluides newtoniens : équations de Navier-Stokes", "Écoulements visqueux exacts : Couette et Poiseuille"],
  bodyHtml: `
    <p>Résoudre analytiquement l'équation de Navier-Stokes n'est possible, on l'a vu, que dans des géométries très simples. Pour tous les autres cas, l'<strong>analyse dimensionnelle</strong> fournit — sans résoudre aucune équation — des informations physiques précieuses sur la structure d'un écoulement, à travers des <strong>nombres sans dimension</strong>. Le plus important d'entre eux, en mécanique des fluides, est le <strong>nombre de Reynolds</strong>.</p>

    <h3>1. Le théorème de Vaschy-Buckingham (théorème $\\pi$)</h3>
    <p>Ce théorème énonce que toute relation physique entre $n$ grandeurs, qui s'expriment à l'aide de $k$ dimensions fondamentales indépendantes (masse, longueur, temps...), peut se réécrire comme une relation entre $n-k$ <strong>groupements sans dimension</strong> (les « nombres $\\pi$ »). Ce résultat, bien que très général, est particulièrement puissant en mécanique des fluides, où de nombreuses grandeurs (vitesse, taille caractéristique, viscosité, masse volumique...) interviennent.</p>

    <h3>2. Construction du nombre de Reynolds</h3>
    <p>Considérons un écoulement caractérisé par une vitesse typique $U$, une longueur caractéristique $L$ (diamètre d'un tube, taille d'un obstacle...), une masse volumique $\\rho$ et une viscosité $\\eta$. On peut estimer l'ordre de grandeur des deux termes dominants de l'équation de Navier-Stokes :</p>
    <table class="mini-table">
      <tr><th>Terme</th><th>Ordre de grandeur</th></tr>
      <tr><td>Terme d'inertie $\\rho(\\vec v\\cdot\\vec\\nabla)\\vec v$</td><td>$\\rho\\,U^2/L$</td></tr>
      <tr><td>Terme visqueux $\\eta\\,\\nabla^2\\vec v$</td><td>$\\eta\\,U/L^2$</td></tr>
    </table>
    <p>Le rapport de ces deux ordres de grandeur définit le <strong>nombre de Reynolds</strong>, sans dimension :</p>
    <div class="formula-box">$$\\boxed{\\ Re = \\frac{\\text{terme d'inertie}}{\\text{terme visqueux}} = \\frac{\\rho U L/L^2 \\cdot L}{\\eta U/L^2}= \\frac{\\rho U L}{\\eta} = \\frac{UL}{\\nu}\\ }$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — interprétation physique</span>
      Le nombre de Reynolds mesure le rapport entre les <strong>effets inertiels</strong> (qui tendent à amplifier les perturbations et à déstabiliser l'écoulement) et les <strong>effets visqueux</strong> (qui les dissipent et stabilisent l'écoulement). $Re \\ll 1$ : régime dominé par la viscosité (écoulement « rampant », très régulier). $Re \\gg 1$ : régime dominé par l'inertie, l'écoulement devient sensible aux instabilités et peut devenir turbulent.
    </div>

    <h3>3. Régimes laminaire et turbulent</h3>
    <p>Historiquement, Osborne Reynolds a observé (1883) qu'un écoulement dans un tube cylindrique change de nature de façon assez nette autour d'une valeur critique du nombre de Reynolds construit sur le diamètre du tube :</p>
    <table class="mini-table">
      <tr><th>Régime</th><th>Nombre de Reynolds</th><th>Caractéristiques</th></tr>
      <tr><td><strong>Laminaire</strong></td><td>$Re \\lesssim 2000$ (tube cylindrique)</td><td>Écoulement régulier, en couches parallèles ; les lignes de courant ne se mélangent pas ; profil de Poiseuille bien établi</td></tr>
      <tr><td><strong>Transitoire</strong></td><td>$Re \\sim 2000$–$4000$</td><td>Instabilités intermittentes, dépend fortement des perturbations initiales</td></tr>
      <tr><td><strong>Turbulent</strong></td><td>$Re \\gtrsim 4000$</td><td>Écoulement chaotique, fluctuations tourbillonnaires à toutes les échelles, mélange efficace</td></tr>
    </table>
    <p>Ces valeurs de transition dépendent de la géométrie exacte de l'écoulement (elles sont différentes pour un écoulement autour d'un obstacle, dans une couche limite, etc.) — le principe reste toutefois le même : le nombre de Reynolds pilote la transition entre régime ordonné et régime chaotique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> de l'eau ($\\rho=1000\\,\\text{kg/m}^3$, $\\eta=10^{-3}\\,\\text{Pa}\\cdot\\text{s}$) s'écoule à $U=0{,}5\\,\\text{m/s}$ dans un tube de diamètre $D=2\\,\\text{cm}$. L'écoulement est-il laminaire ou turbulent ?</p>
      <p><strong>Solution :</strong> $Re = \\dfrac{\\rho U D}{\\eta} = \\dfrac{1000\\times 0{,}5\\times 0{,}02}{10^{-3}} = \\dfrac{10}{10^{-3}}$.</p>
      <p class="example-answer">$Re = 10\\,000 > 4000$ : l'écoulement est <strong>turbulent</strong>.</p>
    </div>

    <h3>4. Similitude dynamique</h3>
    <p>L'analyse dimensionnelle a une conséquence pratique majeure : deux écoulements géométriquement semblables (mêmes proportions), autour d'objets de tailles différentes, ont un comportement <strong>dynamiquement identique</strong> (mêmes lignes de courant adimensionnées, mêmes coefficients de traînée...) s'ils ont le <strong>même nombre de Reynolds</strong>. C'est le principe qui permet de tester une <strong>maquette</strong> réduite (d'avion, de bateau, de voiture) en soufflerie ou en bassin, à condition d'ajuster la vitesse d'essai pour compenser le changement d'échelle :</p>
    <div class="formula-box">$$Re_{\\text{maquette}} = Re_{\\text{réel}} \\quad \\Longrightarrow \\quad \\frac{U_m L_m}{\\nu_m} = \\frac{U_r L_r}{\\nu_r}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      En pratique, il est souvent difficile d'égaliser <em>simultanément</em> tous les nombres sans dimension pertinents (Reynolds, Mach, Froude...) lors d'un essai sur maquette : les ingénieurs doivent alors choisir de reproduire fidèlement les nombres les plus pertinents pour le phénomène étudié, quitte à accepter des écarts sur les autres.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le théorème de Vaschy-Buckingham réduit une relation physique à des groupements sans dimension</li>
        <li>Nombre de Reynolds : $Re = \\rho UL/\\eta = UL/\\nu$, rapport des forces d'inertie aux forces visqueuses</li>
        <li>$Re$ faible $\\Rightarrow$ écoulement laminaire dominé par la viscosité ; $Re$ élevé $\\Rightarrow$ écoulement turbulent dominé par l'inertie</li>
        <li>La similitude dynamique (même $Re$) permet de tester des maquettes à échelle réduite avec un comportement représentatif</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser le diamètre au lieu du rayon (ou l'inverse) dans le calcul de $Re$ sans vérifier la convention utilisée pour la géométrie considérée</li>
        <li>Confondre viscosité dynamique $\\eta$ et cinématique $\\nu$ dans la formule de $Re$ (les deux formes $\\rho UL/\\eta$ et $UL/\\nu$ sont équivalentes, mais il ne faut pas les mélanger)</li>
        <li>Croire qu'un écoulement à grand $Re$ est nécessairement turbulent partout : près d'une paroi, la vitesse s'annule (non-glissement), donc le $Re$ local y est toujours faible — c'est l'origine de la couche limite (chapitre suivant)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le nombre de Reynolds $Re=\\rho UL/\\eta$ représente le rapport :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu8e1" value="wrong"> pression / vitesse</label>
          <label class="option"><input type="radio" name="mflu8e1" value="right"> forces d'inertie / forces visqueuses</label>
          <label class="option"><input type="radio" name="mflu8e1" value="wrong"> masse / volume</label>
          <label class="option"><input type="radio" name="mflu8e1" value="wrong"> énergie cinétique / énergie potentielle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu8e1','mflu8fb1','Correct — c\\'est le rapport de l\\'ordre de grandeur du terme d\\'inertie ρU²/L à celui du terme visqueux ηU/L², qui donne exactement ρUL/η.','Relis la construction du nombre de Reynolds à partir des ordres de grandeur des deux termes de Navier-Stokes.')">Vérifier</button>
        <div class="feedback" id="mflu8fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">De l'huile ($\\rho=900\\,\\text{kg/m}^3$, $\\eta=0{,}9\\,\\text{Pa}\\cdot\\text{s}$) s'écoule à $U=0{,}1\\,\\text{m/s}$ dans un tube de diamètre $D=5\\,\\text{cm}$. Le nombre de Reynolds vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu8e2" value="right"> 5</label>
          <label class="option"><input type="radio" name="mflu8e2" value="wrong"> 50</label>
          <label class="option"><input type="radio" name="mflu8e2" value="wrong"> 500</label>
          <label class="option"><input type="radio" name="mflu8e2" value="wrong"> 0,5</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu8e2','mflu8fb2','Correct — Re=ρUD/η=900×0,1×0,05/0,9=4,5/0,9=5. Un Reynolds aussi faible correspond à un écoulement très laminaire, fortement dominé par la viscosité.','Calcule Re=ρUD/η avec les valeurs numériques données.')">Vérifier</button>
        <div class="feedback" id="mflu8fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour tester une maquette d'avion deux fois plus petite que l'avion réel, en gardant le même fluide (même $\\nu$), il faut, pour respecter la similitude de Reynolds, faire l'essai à une vitesse :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu8e3" value="wrong"> deux fois plus petite</label>
          <label class="option"><input type="radio" name="mflu8e3" value="right"> deux fois plus grande</label>
          <label class="option"><input type="radio" name="mflu8e3" value="wrong"> identique</label>
          <label class="option"><input type="radio" name="mflu8e3" value="wrong"> quatre fois plus grande</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu8e3','mflu8fb3','Correct — UmLm/ν=UrLr/ν avec Lm=Lr/2 impose Um=2Ur : en réduisant la taille de moitié, il faut doubler la vitesse pour garder le même Reynolds.','Écris l\\'égalité des nombres de Reynolds UmLm/ν=UrLr/ν avec Lm=Lr/2 et résous pour Um.')">Vérifier</button>
        <div class="feedback" id="mflu8fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Analyse dimensionnelle, similitude et nombre de Reynolds")] = {
  intro: "Salut, c'est Nova ! On étudie le nombre de Reynolds et la similitude dynamique. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/reynolds/i, replies:[
      "Le nombre de Reynolds Re=ρUL/η=UL/ν mesure le rapport entre forces d'inertie et forces visqueuses. Re faible → écoulement laminaire ; Re élevé → écoulement turbulent."
    ]},
    { test:/laminaire|turbulent/i, replies:[
      "Dans un tube cylindrique, Re≲2000 correspond typiquement à un écoulement laminaire (régulier), Re≳4000 à un écoulement turbulent (chaotique) — avec une zone de transition entre les deux."
    ]},
    { test:/similitude|maquette/i, replies:[
      "La similitude dynamique consiste à égaliser le nombre de Reynolds entre une maquette et l'objet réel, ce qui garantit un comportement d'écoulement dynamiquement comparable, même à échelle réduite."
    ]},
    { test:/vaschy|buckingham|analyse dimensionnelle/i, replies:[
      "Le théorème de Vaschy-Buckingham (théorème π) permet de réduire une relation physique entre n grandeurs à une relation entre n−k groupements sans dimension, où k est le nombre de dimensions fondamentales indépendantes."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la construction du nombre de Reynolds à partir des deux termes de Navier-Stokes.",
      "Indice niveau 2 : c'est un rapport entre un terme d'inertie et un terme visqueux.",
      "Indice niveau 3 : Re = forces d'inertie / forces visqueuses."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : calcule Re=ρUD/η avec les valeurs données.",
      "Indice niveau 2 : ρUD = 900×0,1×0,05 = 4,5.",
      "Indice niveau 3 : Re = 4,5/0,9 = 5."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : écris l'égalité UmLm/ν=UrLr/ν avec Lm=Lr/2.",
      "Indice niveau 2 : isole Um dans cette égalité.",
      "Indice niveau 3 : Um=2Ur — il faut doubler la vitesse."
    ]}
  ]
};

/* =========================== CHAPITRE 9 =========================== */
MECAFLU_CHAPTERS[mfluKey("Écoulements potentiels, vorticité et notion de couche limite")] = {
  objectives: [
    "Définir le vecteur tourbillon (vorticité) et la notion d'écoulement irrotationnel",
    "Introduire le potentiel des vitesses pour un écoulement irrotationnel et incompressible",
    "Retrouver l'équation de Laplace vérifiée par le potentiel des vitesses",
    "Décrire qualitativement la formation et le rôle de la couche limite à grand nombre de Reynolds"
  ],
  prereqs: ["Théorème de Bernoulli et applications", "Analyse dimensionnelle, similitude et nombre de Reynolds"],
  bodyHtml: `
    <p>Ce dernier chapitre introduit deux notions complémentaires, essentielles pour comprendre les écoulements à grand nombre de Reynolds : la <strong>vorticité</strong>, qui mesure la rotation locale du fluide, et la <strong>couche limite</strong>, la fine région près d'une paroi où les effets visqueux — a priori négligeables loin de l'obstacle — redeviennent essentiels.</p>

    <h3>1. Le vecteur tourbillon (vorticité)</h3>
    <p>On définit le <strong>vecteur tourbillon</strong> (ou vorticité) comme le rotationnel du champ de vitesse :</p>
    <div class="formula-box">$$\\vec\\omega = \\vec\\nabla \\times \\vec v$$</div>
    <p>La vorticité mesure la <strong>rotation locale</strong> d'une particule fluide sur elle-même : $\\vec\\omega/2$ est précisément la vitesse angulaire instantanée de rotation propre de la particule (indépendamment de tout mouvement de translation ou de déformation). Un écoulement est dit <strong>irrotationnel</strong> si $\\vec\\omega=\\vec 0$ en tout point : les particules fluides se déplacent alors sans tourner sur elles-mêmes (elles peuvent néanmoins tourner autour d'un axe extérieur, comme dans un écoulement circulaire à vitesse $v\\propto 1/r$ — le <strong>vortex potentiel</strong> — qui est irrotationnel partout sauf en son centre).</p>

    <h3>2. Potentiel des vitesses</h3>
    <p>Un résultat classique d'analyse vectorielle énonce que tout champ de vecteurs <strong>irrotationnel</strong> dérive d'un potentiel scalaire. On peut donc écrire, pour un écoulement irrotationnel :</p>
    <div class="formula-box">$$\\vec v = \\vec\\nabla \\phi$$</div>
    <p>où $\\phi(\\vec r,t)$ est le <strong>potentiel des vitesses</strong>. En combinant cette relation avec l'équation de continuité incompressible $\\vec\\nabla\\cdot\\vec v=0$ (chapitre 3), on obtient :</p>
    <div class="formula-box">$$\\vec\\nabla \\cdot (\\vec\\nabla \\phi) = \\nabla^2 \\phi = 0$$</div>
    <p>Le potentiel des vitesses d'un écoulement incompressible et irrotationnel vérifie donc l'<strong>équation de Laplace</strong> — exactement la même équation que le potentiel électrostatique en l'absence de charges, ou le potentiel gravitationnel en l'absence de masses ! Cette analogie mathématique est extrêmement féconde : toutes les techniques de résolution développées en électrostatique (fonctions harmoniques, méthode des images, transformation conforme...) s'appliquent directement aux <strong>écoulements potentiels</strong>.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Pour un écoulement irrotationnel, le théorème de Bernoulli (chapitre 5) prend une forme encore plus générale et puissante, valable partout dans l'écoulement, y compris en régime instationnaire : $\\dfrac{\\partial \\phi}{\\partial t} + \\dfrac{1}{2}v^2 + \\dfrac{p}{\\rho} + gz = \\text{cste dans tout l'écoulement}$.
    </div>

    <h3>3. Exemples classiques d'écoulements potentiels</h3>
    <table class="mini-table">
      <tr><th>Écoulement</th><th>Potentiel $\\phi$ (2D, coordonnées polaires)</th></tr>
      <tr><td>Écoulement uniforme selon $x$, vitesse $U$</td><td>$\\phi = Ux$</td></tr>
      <tr><td>Source ponctuelle de débit $Q$</td><td>$\\phi = \\dfrac{Q}{2\\pi}\\ln r$</td></tr>
      <tr><td>Vortex ponctuel de circulation $\\Gamma$</td><td>$\\phi = \\dfrac{\\Gamma}{2\\pi}\\theta$</td></tr>
    </table>
    <p>L'équation de Laplace étant <strong>linéaire</strong>, on peut superposer ces solutions élémentaires pour construire des écoulements plus complexes : par exemple, la superposition d'un écoulement uniforme et d'un doublet (source + puits infiniment proches) donne l'écoulement potentiel autour d'un <strong>cylindre</strong>, point de départ classique de la théorie de la portance des ailes d'avion.</p>

    <h3>4. Où la viscosité redevient essentielle : la couche limite</h3>
    <p>Les écoulements potentiels, construits en négligeant totalement la viscosité, décrivent remarquablement bien un écoulement à <strong>grand nombre de Reynolds</strong> — mais avec une limite fondamentale : ils ne peuvent pas satisfaire la condition de <strong>non-glissement</strong> à une paroi solide (un écoulement potentiel autorise en général un glissement tangentiel non nul à la paroi). En réalité, aussi grand que soit $Re$, la viscosité ne peut jamais être totalement négligée <strong>près d'une paroi</strong> : c'est l'idée fondatrice de la théorie de la <strong>couche limite</strong>, introduite par Ludwig Prandtl en 1904.</p>
    <div class="key-point">
      <span class="eyebrow">Concept de couche limite</span>
      Au voisinage immédiat d'une paroi, sur une épaisseur $\\delta$ très faible devant la taille $L$ de l'obstacle, la vitesse passe rapidement de $0$ (paroi, non-glissement) à la valeur de l'écoulement potentiel externe. Dans cette fine couche, les gradients de vitesse sont très grands, si bien que le terme visqueux $\\eta\\nabla^2\\vec v$, bien que $\\eta$ soit petit, redevient comparable au terme d'inertie. Une estimation d'ordre de grandeur donne $\\delta \\sim L/\\sqrt{Re}$ : la couche limite s'amincit quand $Re$ augmente, mais ne disparaît jamais complètement.
    </div>
    <p>Hors de la couche limite, l'écoulement se comporte comme un fluide parfait (approximativement potentiel) ; à l'intérieur, les effets visqueux dominent. Ce découpage — dû à Prandtl — a permis de rendre traitable l'étude d'un très grand nombre d'écoulements pratiques (aérodynamique des ailes, traînée des corps, transfert de chaleur pariétal), et reste un pilier conceptuel de la mécanique des fluides moderne.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="10" y1="75" x2="130" y2="75" stroke="#5A6472" stroke-width="1.6"/>
          <path d="M10,75 Q40,55 130,58" fill="none" stroke="#4C7CFF" stroke-width="1.2" stroke-dasharray="2,2"/>
          <line x1="30" y1="75" x2="30" y2="68" stroke="#2DD4C4" stroke-width="1.4"/>
          <line x1="60" y1="75" x2="60" y2="63" stroke="#2DD4C4" stroke-width="1.4"/>
          <line x1="90" y1="75" x2="90" y2="60" stroke="#2DD4C4" stroke-width="1.4"/>
          <line x1="120" y1="75" x2="120" y2="59" stroke="#2DD4C4" stroke-width="1.4"/>
          <text x="12" y="45" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">écoulement potentiel externe</text>
        </svg>
        <span>couche limite : fine zone où la vitesse s'annule progressivement à la paroi</span>
      </div>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> estimer l'épaisseur de couche limite $\\delta$ sur une aile de longueur caractéristique $L=1\\,\\text{m}$, à $Re=10^6$.</p>
      <p><strong>Solution :</strong> $\\delta \\sim L/\\sqrt{Re} = 1/\\sqrt{10^6} = 1/1000$.</p>
      <p class="example-answer">$\\delta \\sim 1\\,\\text{mm}$ : la couche limite est extrêmement fine devant la taille de l'aile, ce qui justifie a posteriori de traiter l'écoulement externe comme potentiel, en réservant les effets visqueux à cette mince région pariétale.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Vorticité $\\vec\\omega = \\vec\\nabla\\times\\vec v$ : mesure la rotation locale d'une particule fluide sur elle-même</li>
        <li>Écoulement irrotationnel ($\\vec\\omega=\\vec 0$) + incompressible $\\Rightarrow$ potentiel des vitesses $\\phi$ ($\\vec v=\\vec\\nabla\\phi$) vérifiant l'équation de Laplace $\\nabla^2\\phi=0$</li>
        <li>L'équation de Laplace étant linéaire, on peut superposer des écoulements potentiels élémentaires (uniforme, source, vortex...)</li>
        <li>Même à grand $Re$, la viscosité reste essentielle dans une fine couche limite près des parois, d'épaisseur $\\delta\\sim L/\\sqrt{Re}$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre écoulement irrotationnel (rotation propre nulle des particules) et absence de trajectoires circulaires (un vortex potentiel a des trajectoires circulaires tout en étant irrotationnel, sauf en son centre)</li>
        <li>Croire qu'un écoulement à grand $Re$ peut être traité comme parfait <em>partout</em>, y compris tout près des parois — c'est justement l'existence de la couche limite qui l'interdit</li>
        <li>Oublier que le potentiel des vitesses $\\phi$ n'existe que pour un écoulement irrotationnel — il n'a pas de sens pour un écoulement quelconque</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le vecteur tourbillon $\\vec\\omega = \\vec\\nabla\\times\\vec v$ mesure :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu9e1" value="wrong"> la vitesse du fluide</label>
          <label class="option"><input type="radio" name="mflu9e1" value="right"> la rotation propre locale d'une particule fluide sur elle-même</label>
          <label class="option"><input type="radio" name="mflu9e1" value="wrong"> la pression locale</label>
          <label class="option"><input type="radio" name="mflu9e1" value="wrong"> le débit volumique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu9e1','mflu9fb1','Correct — ω/2 est exactement la vitesse angulaire de rotation propre de la particule fluide, indépendamment de sa translation ou de sa déformation.','Relis la définition physique de la vorticité dans le cours.')">Vérifier</button>
        <div class="feedback" id="mflu9fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un écoulement incompressible et irrotationnel, le potentiel des vitesses $\\phi$ vérifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu9e2" value="wrong"> $\\nabla \\phi = 0$</label>
          <label class="option"><input type="radio" name="mflu9e2" value="right"> $\\nabla^2 \\phi = 0$ (équation de Laplace)</label>
          <label class="option"><input type="radio" name="mflu9e2" value="wrong"> $\\partial \\phi/\\partial t = 0$</label>
          <label class="option"><input type="radio" name="mflu9e2" value="wrong"> $\\phi = 0$ partout</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu9e2','mflu9fb2','Correct — en combinant v=∇φ (irrotationnel) et ∇·v=0 (incompressible), on obtient ∇²φ=0, l\\'équation de Laplace, la même qu\\'en électrostatique sans charges.','Combine v=∇φ avec la condition d\\'incompressibilité ∇·v=0.')">Vérifier</button>
        <div class="feedback" id="mflu9fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'épaisseur de couche limite $\\delta$ sur un obstacle de taille $L$, à grand nombre de Reynolds, se comporte comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="mflu9e3" value="wrong"> $\\delta \\sim L\\cdot Re$</label>
          <label class="option"><input type="radio" name="mflu9e3" value="right"> $\\delta \\sim L/\\sqrt{Re}$</label>
          <label class="option"><input type="radio" name="mflu9e3" value="wrong"> $\\delta \\sim L$ (indépendante de $Re$)</label>
          <label class="option"><input type="radio" name="mflu9e3" value="wrong"> $\\delta \\sim L\\cdot Re^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('mflu9e3','mflu9fb3','Correct — δ~L/√Re : la couche limite s\\'amincit quand Re augmente, mais ne disparaît jamais complètement, aussi grand que soit Re.','Relis l\\'estimation d\\'ordre de grandeur donnée dans le cours pour l\\'épaisseur de couche limite.')">Vérifier</button>
        <div class="feedback" id="mflu9fb3"></div>
      </div>
    </div>
  `
};

MECAFLU_NOVA_KB[mfluKey("Écoulements potentiels, vorticité et notion de couche limite")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : vorticité, écoulements potentiels et couche limite. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/vorticit[ée]|tourbillon/i, replies:[
      "La vorticité ω=∇×v mesure la rotation propre locale d'une particule fluide sur elle-même. Un écoulement irrotationnel a ω=0 partout."
    ]},
    { test:/potentiel des vitesses|[ée]coulement potentiel/i, replies:[
      "Pour un écoulement irrotationnel, v=∇φ où φ est le potentiel des vitesses. Combiné à l'incompressibilité, φ vérifie l'équation de Laplace ∇²φ=0 — comme le potentiel électrostatique sans charges."
    ]},
    { test:/couche limite/i, replies:[
      "La couche limite (Prandtl, 1904) est la fine région près d'une paroi où la viscosité reste essentielle même à grand Reynolds, à cause de la condition de non-glissement. Son épaisseur δ~L/√Re."
    ]},
    { test:/laplace/i, replies:[
      "L'équation de Laplace ∇²φ=0, vérifiée par le potentiel des vitesses, est linéaire : on peut donc superposer des écoulements potentiels élémentaires (uniforme, source, vortex) pour en construire de plus complexes."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition physique de la vorticité.",
      "Indice niveau 2 : ω/2 est une vitesse angulaire.",
      "Indice niveau 3 : c'est la rotation propre locale de la particule fluide sur elle-même."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : combine v=∇φ avec ∇·v=0.",
      "Indice niveau 2 : tu obtiens ∇·(∇φ)=0.",
      "Indice niveau 3 : c'est ∇²φ=0, l'équation de Laplace."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis l'estimation d'ordre de grandeur de δ donnée dans le cours.",
      "Indice niveau 2 : δ dépend de L et de Re, avec Re au dénominateur sous une racine.",
      "Indice niveau 3 : δ ~ L/√Re."
    ]}
  ]
};

/* fusionne le module Mécanique des fluides dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MECAFLU_CHAPTERS);
Object.assign(NOVA_KB, MECAFLU_NOVA_KB);