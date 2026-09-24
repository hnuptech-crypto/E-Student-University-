/* =====================================================================
   CHUNK « matin » — registre MATIN_CHAPTERS / MATIN_NOVA_KB
   Matière(s) : Chimie|Chimie des matériaux inorganiques
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MATIN_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE CHIMIE DES MATÉRIAUX INORGANIQUES — Chimie L2/L3
   (contenu rédigé et enrichi à partir de sources de référence en chimie du
   solide et science des matériaux — cristallographie de Bravais et Pauling,
   thermodynamique des défauts de Kröger et Vink, diagrammes de phases,
   céramiques et verres, physique des semi-conducteurs et de la
   supraconductivité — avec mise à jour sur les développements récents
   (céramiques à haute entropie, supraconducteurs sous pression, 2024-2026).
   Structure identique aux autres modules : MATIN_CHAPTERS / MATIN_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const MATIN_MATIERE = 'Chimie des matériaux inorganiques';
function matinKey(chapterTitle){ return `Chimie|${MATIN_MATIERE}|${chapterTitle}`; }
const MATIN_CHAPTERS = {};
const MATIN_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Introduction aux matériaux inorganiques =========================== */
MATIN_CHAPTERS[matinKey('Introduction aux matériaux inorganiques : classification, liaisons et propriétés')] = {
  objectives: [
    "Définir ce qu'est un matériau inorganique et le situer parmi les quatre grandes familles de matériaux",
    "Identifier le type de liaison dominant (métallique, ionique, covalente, van der Waals) dans un solide inorganique",
    "Relier le type de liaison aux propriétés macroscopiques : conductivité, dureté, point de fusion, ductilité",
    "Utiliser le triangle de Van Arkel-Ketelaar pour classer un composé binaire selon son caractère de liaison"
  ],
  prereqs: ["Liaisons chimiques fortes : covalente, ionique et dative (L1)", "Classification périodique des éléments"],
  bodyHtml: `
    <p>La chimie des matériaux inorganiques étudie les solides — cristallisés ou amorphes — construits à partir d'éléments autres que les longues chaînes carbonées de la chimie organique : métaux, oxydes, sulfures, carbures, nitrures, halogénures... Ce premier chapitre pose le vocabulaire commun à tout le cours : comment classer un matériau, quel type de liaison le maintient cohérent, et comment cette liaison détermine déjà, à elle seule, une grande partie de ses propriétés d'usage.</p>

    <h3>1. Les quatre grandes familles de matériaux</h3>
    <p>On distingue traditionnellement quatre grandes familles de matériaux solides, qui se recoupent parfois : les <strong>métaux</strong> (éléments ou alliages liés par liaison métallique), les <strong>céramiques</strong> (composés inorganiques non métalliques, le plus souvent des oxydes, carbures, nitrures ou borures, à liaison ionocovalente), les <strong>polymères</strong> (macromolécules organiques covalentes) et les <strong>composites</strong> (association d'au moins deux familles précédentes). La chimie des matériaux inorganiques couvre l'essentiel des deux premières familles, ainsi que les <strong>verres</strong> (solides amorphes non cristallins) et les matériaux fonctionnels (semi-conducteurs, supraconducteurs, aimants).</p>
    <table class="mini-table">
      <tr><th>Famille</th><th>Liaison dominante</th><th>Exemples</th><th>Propriétés typiques</th></tr>
      <tr><td>Métaux</td><td>Métallique</td><td>Fe, Cu, alliages Al</td><td>Conducteurs, ductiles, opaques et brillants</td></tr>
      <tr><td>Céramiques / minéraux</td><td>Ionique / covalente</td><td>Al₂O₃, SiC, MgO</td><td>Durs, fragiles, réfractaires, isolants</td></tr>
      <tr><td>Verres</td><td>Covalente désordonnée</td><td>SiO₂ vitreux</td><td>Transparents, fragiles, pas de fusion nette</td></tr>
      <tr><td>Semi-conducteurs</td><td>Covalente</td><td>Si, Ge, GaAs</td><td>Conductivité intermédiaire, ajustable par dopage</td></tr>
    </table>

    <h3>2. Les grands types de liaisons dans les solides inorganiques</h3>
    <p>Quatre modèles de liaison suffisent à décrire la cohésion de la quasi-totalité des solides inorganiques :</p>
    <div class="key-point">
      <span class="eyebrow">Liaison métallique</span>
      Les atomes métalliques mettent en commun leurs électrons de valence dans un « nuage » délocalisé sur l'ensemble du cristal (modèle du gaz d'électrons libres). Cette délocalisation explique la bonne conductivité électrique et thermique, l'opacité et l'éclat métallique, ainsi que la <strong>ductilité</strong> : les plans d'atomes peuvent glisser les uns sur les autres sans rompre la cohésion, car la liaison n'est pas orientée.
    </div>
    <div class="key-point">
      <span class="eyebrow">Liaison ionique</span>
      Un transfert (quasi) complet d'électrons d'un élément électropositif vers un élément électronégatif crée des ions de charges opposées, maintenus par attraction électrostatique non directionnelle. Les cristaux ioniques (NaCl, MgO...) sont durs, cassants (un glissement de plan aligne des charges de même signe qui se repoussent — d'où la <strong>clivabilité</strong>) et isolants à l'état solide, mais conducteurs une fois fondus ou en solution.
    </div>
    <div class="key-point">
      <span class="eyebrow">Liaison covalente</span>
      Mise en commun localisée et directionnelle de doublets d'électrons entre atomes voisins. Un réseau covalent tridimensionnel comme le diamant ou SiC donne des solides extrêmement durs et à très haut point de fusion, car casser le cristal impose de rompre des liaisons fortes et orientées.
    </div>
    <div class="key-point">
      <span class="eyebrow">Liaisons faibles (van der Waals, hydrogène)</span>
      Entre couches ou molécules déjà liées par ailleurs (graphite, glace), des interactions résiduelles faibles assurent une cohésion d'ensemble mais autorisent un glissement facile — d'où le pouvoir lubrifiant du graphite, alors même que chaque feuillet de graphène est un réseau covalent parmi les plus rigides connus.
    </div>

    <h3>3. Le triangle de Van Arkel-Ketelaar</h3>
    <p>Pour un composé binaire A-B, on peut situer le caractère de la liaison sur un diagramme à deux axes : l'<strong>électronégativité moyenne</strong> $\\\\bar\\\\chi=(\\\\chi_A+\\\\chi_B)/2$ en abscisse, et la <strong>différence d'électronégativité</strong> $\\\\Delta\\\\chi=|\\\\chi_A-\\\\chi_B|$ en ordonnée. On obtient un triangle dont les trois sommets correspondent aux trois liaisons fortes limites :</p>
    <div class="diagram">
      <svg width="260" height="200" viewBox="0 0 260 200">
        <polygon points="130,14 20,180 240,180" fill="none" stroke="#8064F2" stroke-width="1.6"/>
        <circle cx="130" cy="14" r="3.2" fill="#F0555C"/><text x="112" y="9" font-family="IBM Plex Mono" font-size="10" fill="#F0555C">Ionique</text>
        <circle cx="20" cy="180" r="3.2" fill="#3D6BF0"/><text x="4" y="196" font-family="IBM Plex Mono" font-size="10" fill="#3D6BF0">Métallique</text>
        <circle cx="240" cy="180" r="3.2" fill="#1FB6A8"/><text x="196" y="196" font-family="IBM Plex Mono" font-size="10" fill="#1FB6A8">Covalente</text>
        <circle cx="130" cy="20" r="9" fill="#F0555C" opacity="0.18"/>
        <text x="80" y="130" font-family="IBM Plex Mono" font-size="9" fill="#122043">Δχ grand</text>
        <text x="150" y="60" font-family="IBM Plex Mono" font-size="9" fill="#122043">χ̄ élevé →</text>
      </svg>
    </div>
    <p>Un composé comme NaCl (grande différence d'électronégativité) se place près du sommet ionique ; le diamant ou SiC (électronégativités proches et élevées) près du sommet covalent ; un alliage Cu-Zn (électronégativités proches et faibles) près du sommet métallique. La plupart des matériaux inorganiques réels — en particulier les céramiques — occupent une position intermédiaire : la liaison métal-oxygène des oxydes, par exemple, possède un caractère mixte <strong>ionocovalent</strong>, ce qui explique pourquoi aucun modèle pur ne rend jamais parfaitement compte de leurs propriétés.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à partir des électronégativités de Pauling $\\\\chi(Mg)=1{,}31$ et $\\\\chi(O)=3{,}44$, estimer le caractère ionique de la liaison Mg-O dans MgO à l'aide de la relation empirique de Pauling $\\\\%\\\\text{ionique} \\\\approx 1-e^{-0{,}25(\\\\Delta\\\\chi)^2}$.</p>
      <p><strong>Solution :</strong> $\\\\Delta\\\\chi = 3{,}44-1{,}31 = 2{,}13$. On calcule $(\\\\Delta\\\\chi)^2 \\\\approx 4{,}54$, donc $0{,}25\\\\times4{,}54\\\\approx1{,}13$, et $e^{-1{,}13}\\\\approx0{,}32$. Le caractère ionique vaut donc environ $1-0{,}32=0{,}68$, soit <strong>68 %</strong>.</p>
      <p class="example-answer">Réponse : liaison Mg-O fortement ionique (≈ 68 %), mais avec une composante covalente non négligeable — cohérent avec le classement de MgO parmi les oxydes ioniques « modèles » en chimie du solide.</p>
    </div>

    <h3>4. Les grandes familles de matériaux fonctionnels modernes</h3>
    <p>Au-delà des métaux et céramiques classiques, la chimie des matériaux inorganiques couvre aujourd'hui des familles fonctionnelles étudiées dans les chapitres suivants : les <strong>semi-conducteurs</strong> (Si, GaAs, oxydes semi-conducteurs), les <strong>matériaux magnétiques</strong> (ferrites, aimants terres rares), les <strong>supraconducteurs</strong> (cuprates, hydrures sous pression) et les matériaux nanoporeux ou à structure ouverte (zéolithes, réseaux métal-organiques MOF), en plein essor pour le stockage de gaz et la catalyse. Une tendance actuelle de la recherche est la conception de matériaux <strong>multi-composants</strong> (alliages et céramiques dites « à haute entropie »), où l'on mélange volontairement 4 à 5 éléments en proportions voisines sur un même sous-réseau pour stabiliser des propriétés mécaniques ou thermiques exceptionnelles — un thème repris au chapitre 6.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Quatre familles de matériaux : métaux, céramiques, polymères, composites — les matériaux inorganiques couvrent surtout les deux premières, plus les verres et matériaux fonctionnels</li>
        <li>Quatre liaisons limites : métallique (délocalisée, ductile, conductrice), ionique (électrostatique, dure et cassante), covalente (directionnelle, très dure), van der Waals (faible, glissante)</li>
        <li>Le triangle de Van Arkel-Ketelaar situe un composé selon $\\\\bar\\\\chi$ (électronégativité moyenne) et $\\\\Delta\\\\chi$ (différence d'électronégativité)</li>
        <li>La plupart des céramiques ont une liaison mixte ionocovalente ; aucun modèle pur n'est jamais totalement exact</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un solide n'a qu'un seul type de liaison « pur » — la plupart des matériaux réels sont des mélanges (ex. graphite : covalent dans le plan, van der Waals entre plans)</li>
        <li>Confondre dureté et ténacité : un solide ionique ou covalent peut être très dur (résiste à la rayure) tout en étant très fragile (casse sans se déformer)</li>
        <li>Oublier que Δχ et χ̄ se calculent tous deux à partir des MÊMES deux électronégativités, mais ne mesurent pas la même chose (différence vs moyenne)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un matériau est dur, cassant, isolant électrique à l'état solide mais devient conducteur une fois fondu. Quel type de liaison domine ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin1e1" value="wrong"> Liaison métallique</label>
          <label class="option"><input type="radio" name="matin1e1" value="right"> Liaison ionique</label>
          <label class="option"><input type="radio" name="matin1e1" value="wrong"> Liaison covalente</label>
          <label class="option"><input type="radio" name="matin1e1" value="wrong"> Liaison de van der Waals</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin1e1','matin1fb1','Correct — la conductivité apparaît seulement en phase fondue (ou en solution) car les ions deviennent alors mobiles : signature typique d\\\\'un solide ionique.','La conductivité qui apparaît uniquement à l\\\\'état fondu est la signature des ions devenus mobiles : pense au modèle électrostatique non directionnel.')">Vérifier</button>
        <div class="feedback" id="matin1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pourquoi un métal peut-il se déformer plastiquement (être martelé) sans se briser, contrairement à un cristal ionique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin1e2" value="wrong"> Parce que les métaux sont toujours amorphes</label>
          <label class="option"><input type="radio" name="matin1e2" value="right"> Parce que la liaison métallique n'est pas directionnelle : les plans d'atomes peuvent glisser sans rompre la cohésion</label>
          <label class="option"><input type="radio" name="matin1e2" value="wrong"> Parce que les métaux n'ont pas de structure cristalline</label>
          <label class="option"><input type="radio" name="matin1e2" value="wrong"> Parce que les électrons de valence sont localisés sur chaque atome</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin1e2','matin1fb2','Correct — le nuage électronique délocalisé « suit » les cations métalliques quel que soit leur arrangement local : un glissement de plan ne rompt donc pas la cohésion, contrairement au cristal ionique où le glissement aligne des charges de même signe qui se repoussent.','Compare avec le cristal ionique : là, un glissement de plan aligne des ions de MÊME signe qui se repoussent violemment, d\\\\'où la fragilité.')">Vérifier</button>
        <div class="feedback" id="matin1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sur le triangle de Van Arkel-Ketelaar, un composé formé de deux éléments de même électronégativité moyenne faible (deux métaux) se situe :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin1e3" value="wrong"> Près du sommet ionique</label>
          <label class="option"><input type="radio" name="matin1e3" value="wrong"> Près du sommet covalent</label>
          <label class="option"><input type="radio" name="matin1e3" value="right"> Près du sommet métallique</label>
          <label class="option"><input type="radio" name="matin1e3" value="wrong"> Au centre exact du triangle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin1e3','matin1fb3','Correct — χ̄ faible et Δχ faible (deux métaux proches dans le tableau périodique) placent le composé près du sommet métallique, en bas à gauche du triangle.','Le sommet métallique correspond à χ̄ faible ET Δχ faible : deux caractéristiques réunies pour un alliage de deux métaux voisins.')">Vérifier</button>
        <div class="feedback" id="matin1fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('Introduction aux matériaux inorganiques : classification, liaisons et propriétés')] = {
  intro: "Salut, moi c'est Nova ! On démarre « Chimie des matériaux inorganiques » avec ce chapitre d'introduction. Demande-moi la différence entre les liaisons, comment marche le triangle de Van Arkel-Ketelaar, ou un indice sur un exercice.",
  rules: [
    { test:/famille|classification|m[ée]taux.*c[ée]ramique/i, replies:["Quatre grandes familles : métaux (liaison métallique), céramiques (ionique/covalente), polymères (covalente organique) et composites (mélange). Les matériaux inorganiques couvrent surtout les deux premières, plus les verres et matériaux fonctionnels."] },
    { test:/liaison m[ée]tallique/i, replies:["La liaison métallique repose sur un nuage d'électrons délocalisés sur tout le cristal : d'où conductivité, ductilité (les plans glissent sans casser la cohésion) et éclat métallique."] },
    { test:/liaison ionique/i, replies:["La liaison ionique est une attraction électrostatique non directionnelle entre ions de charges opposées : cristaux durs mais cassants (le clivage aligne des charges de même signe qui se repoussent), isolants à l'état solide, conducteurs à l'état fondu."] },
    { test:/liaison covalente/i, replies:["La liaison covalente est localisée et directionnelle. Un réseau covalent 3D comme le diamant ou SiC donne des solides extrêmement durs à très haut point de fusion."] },
    { test:/van arkel|ketelaar|triangle/i, replies:["Le triangle de Van Arkel-Ketelaar place un composé A-B selon χ̄ (électronégativité moyenne, en abscisse) et Δχ (différence d'électronégativité, en ordonnée) : trois sommets pour ionique, covalent, métallique."] },
    { test:/van der waals|graphite/i, replies:["Le graphite illustre bien la coexistence de liaisons : covalente forte DANS chaque feuillet, van der Waals faible ENTRE feuillets — d'où son pouvoir lubrifiant malgré la dureté du réseau covalent."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la conductivité apparaît seulement une fois le solide fondu — quel type de charge devient alors mobile ?","Indice niveau 2 : ce sont des IONS qui deviennent mobiles en phase fondue.","Indice niveau 3 : c'est la signature d'une liaison ionique."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce qui « suit » les cations métalliques quand un plan glisse.","Indice niveau 2 : le nuage électronique délocalisé n'est pas directionnel, contrairement aux charges ioniques.","Indice niveau 3 : la liaison métallique n'est pas rompue par un glissement de plan."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : deux métaux ont une électronégativité moyenne faible ET proche l'une de l'autre.","Indice niveau 2 : χ̄ faible et Δχ faible.","Indice niveau 3 : c'est le sommet métallique du triangle."] }
  ]
};

/* =========================== CHAPITRE 2 — L'état cristallin =========================== */
MATIN_CHAPTERS[matinKey('L\'état cristallin : réseaux de Bravais, mailles et systèmes cristallins')] = {
  objectives: [
    "Distinguer un solide cristallisé (ordre à longue distance) d'un solide amorphe",
    "Définir réseau, motif, maille élémentaire et maille conventionnelle",
    "Reconnaître les 7 systèmes cristallins et les 14 réseaux de Bravais",
    "Calculer la coordinence et la compacité (taux de remplissage) d'une maille cubique simple, cubique centrée ou cubique à faces centrées"
  ],
  prereqs: ["Introduction aux matériaux inorganiques (chapitre précédent)"],
  bodyHtml: `
    <p>Ce chapitre pose les bases de la cristallographie géométrique : comment décrire mathématiquement l'empilement périodique et infini d'atomes, d'ions ou de molécules qui constitue un cristal.</p>

    <h3>1. Ordre cristallin et ordre amorphe</h3>
    <p>Un <strong>solide cristallisé</strong> présente un <strong>ordre à longue distance</strong> : la position de chaque atome peut être prédite à partir de celle de ses voisins, aussi loin qu'on regarde dans le cristal, grâce à la répétition périodique d'un motif. Un <strong>solide amorphe</strong> (verre, par exemple) ne présente qu'un <strong>ordre à courte distance</strong> (l'environnement immédiat de chaque atome est à peu près régulier) mais aucune périodicité à grande échelle — ce point sera développé au chapitre 7.</p>

    <h3>2. Réseau, motif et maille</h3>
    <p>Un cristal est décrit comme la combinaison de deux objets mathématiques distincts :</p>
    <div class="key-point">
      <span class="eyebrow">Réseau + motif = cristal</span>
      Le <strong>réseau</strong> (ou réseau de Bravais) est un ensemble infini et périodique de points géométriques (les <em>nœuds</em>), tous équivalents par translation. Le <strong>motif</strong> est le groupement d'atomes (un seul atome, ou plusieurs) associé à chaque nœud. Le cristal réel s'obtient en « posant » le motif sur chaque nœud du réseau.
    </div>
    <p>La plus petite portion du réseau qui, répétée par translation dans les trois directions de l'espace, reconstitue le cristal entier, est la <strong>maille élémentaire</strong>. Elle est définie par trois vecteurs de base $\\\\vec{a},\\\\vec{b},\\\\vec{c}$ et les angles qu'ils forment entre eux $\\\\alpha,\\\\beta,\\\\gamma$. On utilise le plus souvent, par commodité de visualisation et de calcul, la <strong>maille conventionnelle</strong> (pas toujours la plus petite maille possible, mais celle qui respecte au mieux la symétrie du cristal).</p>

    <h3>3. Les 7 systèmes cristallins et les 14 réseaux de Bravais</h3>
    <p>En imposant des contraintes de symétrie sur les longueurs $a,b,c$ et les angles $\\\\alpha,\\\\beta,\\\\gamma$, on montre qu'il n'existe que <strong>7 systèmes cristallins</strong> possibles. En combinant chaque système avec les modes de réseau possibles — <strong>P</strong> (primitif, nœuds aux sommets seulement), <strong>I</strong> (centré, nœud supplémentaire au centre de la maille), <strong>F</strong> (faces centrées, nœud au centre de chaque face) et <strong>C</strong> (bases centrées) — on obtient exactement <strong>14 réseaux de Bravais</strong>, démontrés par Auguste Bravais en 1848.</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Contraintes</th><th>Modes existants</th><th>Exemple</th></tr>
      <tr><td>Cubique</td><td>$a=b=c$, $\\\\alpha=\\\\beta=\\\\gamma=90°$</td><td>P, I, F</td><td>NaCl, Cu, diamant</td></tr>
      <tr><td>Quadratique (tétragonal)</td><td>$a=b\\\\ne c$, angles droits</td><td>P, I</td><td>TiO₂ (rutile)</td></tr>
      <tr><td>Orthorhombique</td><td>$a\\\\ne b\\\\ne c$, angles droits</td><td>P, I, F, C</td><td>Aragonite CaCO₃</td></tr>
      <tr><td>Hexagonal</td><td>$a=b\\\\ne c$, $\\\\gamma=120°$</td><td>P</td><td>Graphite, Zn, Mg</td></tr>
      <tr><td>Rhomboédrique (trigonal)</td><td>$a=b=c$, $\\\\alpha=\\\\beta=\\\\gamma\\\\ne 90°$</td><td>P</td><td>Calcite CaCO₃</td></tr>
      <tr><td>Monoclinique</td><td>$a\\\\ne b\\\\ne c$, un seul angle $\\\\ne 90°$</td><td>P, C</td><td>Gypse</td></tr>
      <tr><td>Triclinique</td><td>$a\\\\ne b\\\\ne c$, tous angles $\\\\ne 90°$</td><td>P</td><td>Feldspaths triclinique</td></tr>
    </table>
    <p>Le système <strong>cubique</strong> est de loin le plus fréquent en chimie des matériaux inorganiques (nombreux métaux, oxydes, halogénures) et sert de référence dans la suite de ce cours.</p>

    <h3>4. Coordinence et compacité</h3>
    <p>La <strong>coordinence</strong> (ou nombre de coordination) d'un nœud est le nombre de plus proches voisins équidistants. La <strong>compacité</strong> $\\\\tau$ (ou taux de remplissage) est la fraction du volume de la maille réellement occupée par la matière, en modélisant chaque atome comme une sphère dure :</p>
    <div class="formula-box">$$\\\\tau = \\\\frac{n\\\\times V_{atome}}{V_{maille}} = \\\\frac{n\\\\times\\\\frac{4}{3}\\\\pi r^3}{a^3}$$</div>
    <p>où $n$ est le nombre de motifs (atomes) par maille et $r$ le rayon atomique, relié au paramètre de maille $a$ selon la structure (les sphères voisines sont tangentes le long de la direction de plus grande compacité).</p>
    <table class="mini-table">
      <tr><th>Structure cubique</th><th>Motifs / maille</th><th>Coordinence</th><th>Relation $a$-$r$</th><th>Compacité</th></tr>
      <tr><td>Cubique simple (CS)</td><td>1</td><td>6</td><td>$a=2r$</td><td>52 %</td></tr>
      <tr><td>Cubique centrée (CC)</td><td>2</td><td>8</td><td>$a\\\\sqrt3=4r$</td><td>68 %</td></tr>
      <tr><td>Cubique à faces centrées (CFC)</td><td>4</td><td>12</td><td>$a\\\\sqrt2=4r$</td><td>74 %</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Compacité maximale</span>
      74 % est la compacité maximale atteignable pour un empilement de sphères identiques (conjecture de Kepler, démontrée en 1998-2005) : elle est obtenue à la fois par la structure CFC et par l'empilement hexagonal compact (HC), qui seront comparés au chapitre 3.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le cuivre cristallise en structure CFC avec un paramètre de maille $a=361$ pm. Calculer le rayon métallique du cuivre.</p>
      <p><strong>Solution :</strong> en CFC, les atomes sont tangents le long de la diagonale d'une face : $a\\\\sqrt2=4r$, donc $r=\\\\dfrac{a\\\\sqrt2}{4}=\\\\dfrac{361\\\\times1{,}414}{4}\\\\approx 127{,}6$ pm.</p>
      <p class="example-answer">Réponse : $r_{Cu}\\\\approx 128$ pm, en très bon accord avec la valeur tabulée du rayon métallique du cuivre.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Cristal = réseau (nœuds périodiques) + motif (groupement d'atomes posé sur chaque nœud)</li>
        <li>7 systèmes cristallins, 14 réseaux de Bravais (modes P, I, F, C selon la symétrie)</li>
        <li>Compacité $\\\\tau = n\\\\times V_{atome}/V_{maille}$ : 52 % (CS), 68 % (CC), 74 % (CFC, compacité maximale)</li>
        <li>En structure cubique, la relation entre $a$ et $r$ dépend de la direction de tangence des sphères : arête (CS), grande diagonale (CC), diagonale de face (CFC)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre maille et motif : la maille est un objet GÉOMÉTRIQUE (une boîte), le motif est ce qu'on POSE sur les nœuds</li>
        <li>Utiliser systématiquement $a=2r$ (valable en CS uniquement) au lieu d'identifier d'abord la direction de tangence des sphères selon la structure</li>
        <li>Oublier que le nombre de motifs par maille cubique se calcule en pondérant les atomes selon leur position (1/8 pour un sommet, 1/2 pour une face, 1/4 pour une arête, 1 si à l'intérieur)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans une maille cubique centrée (CC), combien de motifs (atomes) appartiennent en propre à la maille ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin2e1" value="wrong"> 1</label>
          <label class="option"><input type="radio" name="matin2e1" value="right"> 2</label>
          <label class="option"><input type="radio" name="matin2e1" value="wrong"> 4</label>
          <label class="option"><input type="radio" name="matin2e1" value="wrong"> 8</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin2e1','matin2fb1','Correct — 8 sommets × 1/8 = 1, plus 1 atome entier au centre : 1 + 1 = 2 motifs par maille CC.','8 atomes de sommet comptent chacun pour 1/8 (8×1/8=1), et l\\\\'atome central compte pour 1 entier.')">Vérifier</button>
        <div class="feedback" id="matin2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Combien de réseaux de Bravais existe-t-il au total, tous systèmes cristallins confondus ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin2e2" value="wrong"> 7</label>
          <label class="option"><input type="radio" name="matin2e2" value="right"> 14</label>
          <label class="option"><input type="radio" name="matin2e2" value="wrong"> 4</label>
          <label class="option"><input type="radio" name="matin2e2" value="wrong"> 32</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin2e2','matin2fb2','Correct — 7 systèmes cristallins, mais 14 réseaux de Bravais au total car certains systèmes admettent plusieurs modes (P, I, F, C).','Ne confonds pas les 7 SYSTÈMES cristallins (contraintes de symétrie) avec les 14 RÉSEAUX de Bravais (systèmes × modes P/I/F/C compatibles).')">Vérifier</button>
        <div class="feedback" id="matin2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le fer α (ferrite) cristallise en cubique centrée avec $a=287$ pm. Quel est approximativement son rayon métallique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin2e3" value="wrong"> 143 pm</label>
          <label class="option"><input type="radio" name="matin2e3" value="right"> 124 pm</label>
          <label class="option"><input type="radio" name="matin2e3" value="wrong"> 287 pm</label>
          <label class="option"><input type="radio" name="matin2e3" value="wrong"> 71 pm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin2e3','matin2fb3','Correct — en CC, a√3=4r, donc r=287×1,732/4≈124 pm.','En CC, la tangence a lieu selon la GRANDE DIAGONALE du cube : a√3 = 4r, pas a = 2r.')">Vérifier</button>
        <div class="feedback" id="matin2fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('L\'état cristallin : réseaux de Bravais, mailles et systèmes cristallins')] = {
  intro: "Salut, moi c'est Nova ! On est sur « L'état cristallin ». Demande-moi la différence entre réseau et motif, comment calculer une compacité, ou un indice sur un exercice.",
  rules: [
    { test:/r[ée]seau.*motif|motif.*r[ée]seau/i, replies:["Le réseau est l'ensemble infini et périodique des nœuds (points géométriques) ; le motif est le groupement d'atomes qu'on pose sur chaque nœud. Cristal = réseau + motif."] },
    { test:/maille/i, replies:["La maille élémentaire est la plus petite « boîte » qui, répétée par translation dans les 3 directions, reconstitue tout le cristal. On utilise souvent la maille conventionnelle, qui respecte au mieux la symétrie."] },
    { test:/bravais|14 r[ée]seaux/i, replies:["Il y a 7 systèmes cristallins (contraintes de symétrie sur a,b,c,α,β,γ) mais 14 réseaux de Bravais au total, car certains systèmes acceptent plusieurs modes : P (primitif), I (centré), F (faces centrées), C (bases centrées)."] },
    { test:/compacit[ée]/i, replies:["La compacité τ = (n × volume d'un atome) / volume de la maille. Valeurs clés : 52% en cubique simple, 68% en cubique centrée, 74% en CFC (le maximum possible pour des sphères identiques)."] },
    { test:/coordinence/i, replies:["La coordinence est le nombre de plus proches voisins équidistants d'un nœud : 6 en CS, 8 en CC, 12 en CFC."] },
    { test:/a\s*=\s*2r|a\s*=\s*4r|tangence/i, replies:["La relation entre a et r dépend de la direction où les sphères sont tangentes : a=2r (arête, CS), a√3=4r (grande diagonale, CC), a√2=4r (diagonale de face, CFC)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte les contributions fractionnaires de chaque position (sommet = 1/8, centre = 1 entier).","Indice niveau 2 : 8 sommets × 1/8 = 1.","Indice niveau 3 : 1 (sommets) + 1 (centre) = 2 motifs par maille."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : ne confonds pas systèmes cristallins et réseaux de Bravais.","Indice niveau 2 : il y a 7 systèmes, mais certains ont plusieurs modes (P, I, F, C).","Indice niveau 3 : le total est 14."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le fer α est en cubique centrée, donc utilise a√3=4r, pas a=2r.","Indice niveau 2 : r = a√3/4 = 287×1,732/4.","Indice niveau 3 : r ≈ 124 pm."] }
  ]
};

/* =========================== CHAPITRE 3 — Structures cristallines et diffraction des rayons X =========================== */
MATIN_CHAPTERS[matinKey('Structures cristallines des solides inorganiques et diffraction des rayons X')] = {
  objectives: [
    "Décrire les empilements compacts hexagonal (HC) et cubique à faces centrées (CFC) et localiser leurs sites interstitiels tétraédriques et octaédriques",
    "Décrire les structures types NaCl, CsCl, blende/wurtzite (ZnS), fluorine (CaF₂) et pérovskite (ABO₃)",
    "Appliquer la règle du rapport des rayons ioniques pour prédire une coordinence",
    "Énoncer et appliquer la loi de Bragg pour interpréter un diffractogramme de rayons X"
  ],
  prereqs: ["L'état cristallin : réseaux de Bravais, mailles et systèmes cristallins"],
  bodyHtml: `
    <p>Ce chapitre applique les outils du chapitre précédent aux structures réellement adoptées par les solides inorganiques : métaux, cristaux ioniques et composés complexes, puis à la principale méthode expérimentale permettant de les déterminer, la diffraction des rayons X.</p>

    <h3>1. Empilements compacts : HC et CFC</h3>
    <p>Pour des sphères identiques (atomes métalliques), les deux empilements les plus compacts (74 %, cf. chapitre 2) diffèrent par la séquence d'empilement des plans denses : l'<strong>hexagonal compact</strong> (HC) suit une séquence <strong>ABAB...</strong> (le troisième plan se replace exactement au-dessus du premier), tandis que le <strong>cubique à faces centrées</strong> (CFC) suit une séquence <strong>ABCABC...</strong> (le troisième plan occupe une troisième position distincte avant de revenir au-dessus du premier au quatrième plan).</p>
    <div class="key-point">
      <span class="eyebrow">Sites interstitiels</span>
      Dans ces deux empilements compacts apparaissent deux types de « trous » entre les sphères, essentiels pour comprendre les structures ioniques dérivées : les sites <strong>tétraédriques</strong> (entourés de 4 sphères, 2 par maille CFC conventionnelle... en fait $2n$ sites pour $n$ atomes de l'empilement) et les sites <strong>octaédriques</strong> (entourés de 6 sphères, $n$ sites pour $n$ atomes). De nombreuses structures ioniques s'obtiennent en plaçant les cations dans tout ou partie de ces sites d'un sous-réseau d'anions compact.
    </div>

    <h3>2. La règle du rapport des rayons ioniques</h3>
    <p>Dans un cristal ionique AB, la coordinence du cation par les anions est gouvernée par le rapport géométrique $r_+/r_-$ (règle empirique établie par Linus Pauling) : un cation trop petit « flotte » dans un site trop grand (instable), tandis qu'un cation trop gros ne peut pas s'y loger.</p>
    <table class="mini-table">
      <tr><th>Rapport $r_+/r_-$</th><th>Coordinence du cation</th><th>Géométrie</th><th>Exemple</th></tr>
      <tr><td>0,155 – 0,225</td><td>3</td><td>Triangulaire</td><td>B₂O₃ (bore)</td></tr>
      <tr><td>0,225 – 0,414</td><td>4</td><td>Tétraédrique</td><td>ZnS</td></tr>
      <tr><td>0,414 – 0,732</td><td>6</td><td>Octaédrique</td><td>NaCl</td></tr>
      <tr><td>0,732 – 1,000</td><td>8</td><td>Cubique</td><td>CsCl</td></tr>
    </table>

    <h3>3. Les grandes structures types des cristaux ioniques</h3>
    <div class="key-point">
      <span class="eyebrow">Structure NaCl (sel gemme)</span>
      Les anions Cl⁻ forment un réseau CFC ; les cations Na⁺ occupent la <strong>totalité</strong> des sites octaédriques. Coordinence (6,6). Structure adoptée par de nombreux oxydes et halogénures de métaux à rapport de rayons intermédiaire (MgO, CaO, LiF...).
    </div>
    <div class="key-point">
      <span class="eyebrow">Structure CsCl</span>
      Deux réseaux cubiques simples interpénétrés (et non un réseau cubique centré, car les deux ions occupant sommets et centre sont différents) : chaque ion Cs⁺ est entouré de 8 ions Cl⁻ et réciproquement. Coordinence (8,8), favorisée par un rapport $r_+/r_-$ proche de 1.
    </div>
    <div class="key-point">
      <span class="eyebrow">Blende et wurtzite (ZnS)</span>
      Les ions S²⁻ forment un réseau compact (CFC pour la blende, HC pour la wurtzite) ; les ions Zn²⁺ occupent la <strong>moitié</strong> des sites tétraédriques. Coordinence (4,4) — structure typique des semi-conducteurs III-V et II-VI (GaAs adopte la structure blende).
    </div>
    <div class="key-point">
      <span class="eyebrow">Fluorine (CaF₂) et antifluorine</span>
      Les cations Ca²⁺ forment un réseau CFC ; les anions F⁻, deux fois plus nombreux, occupent la <strong>totalité</strong> des sites tétraédriques. Coordinence (8,4) — structure adoptée par de nombreux dioxydes MO₂ (dont la zircone ZrO₂ stabilisée, cf. chapitre 6) et, à l'inverse (antifluorine), par des oxydes M₂O comme Li₂O.
    </div>
    <div class="key-point">
      <span class="eyebrow">Pérovskite ABO₃</span>
      Structure très étudiée en science des matériaux (supraconducteurs à haute Tc, ferroélectriques comme BaTiO₃, cellules solaires pérovskites) : un grand cation A occupe le centre d'une maille cubique, les petits cations B occupent les sommets, et les oxygènes occupent le milieu des arêtes, formant un réseau d'octaèdres BO₆ liés par les sommets. La <strong>tolérance de Goldschmidt</strong> $t=\\\\dfrac{r_A+r_O}{\\\\sqrt2\\\\,(r_B+r_O)}$ prédit la stabilité de cette structure pour $t$ proche de 1 (typiquement 0,8 à 1,0).
    </div>

    <h3>4. Diffraction des rayons X et loi de Bragg</h3>
    <p>La périodicité du cristal agit comme un réseau de diffraction pour des ondes de longueur d'onde comparable aux distances interatomiques : les rayons X (découverts par Röntgen en 1895). En 1912, Max von Laue observe la première figure de diffraction X sur un cristal ; en 1913, <strong>William Henry Bragg</strong> et son fils <strong>William Lawrence Bragg</strong> en proposent l'interprétation géométrique simple qui porte leur nom (Prix Nobel de physique 1915, le plus jeune lauréat de l'histoire du prix pour W. L. Bragg, alors âgé de 25 ans).</p>
    <p>On considère le faisceau de rayons X comme « réfléchi » par des familles de plans réticulaires parallèles, espacés d'une distance $d_{hkl}$ (indexée par les <strong>indices de Miller</strong> $h,k,l$). Il y a interférence constructive — donc un pic de diffraction — seulement lorsque la différence de marche entre deux rayons réfléchis par deux plans consécutifs est un multiple entier de la longueur d'onde :</p>
    <div class="diagram">
      <svg width="260" height="130" viewBox="0 0 260 130">
        <line x1="10" y1="60" x2="250" y2="60" stroke="#122043" stroke-width="1"/>
        <line x1="10" y1="90" x2="250" y2="90" stroke="#122043" stroke-width="1"/>
        <line x1="60" y1="20" x2="110" y2="60" stroke="#3D6BF0" stroke-width="1.8" marker-end="url(#a1)"/>
        <line x1="110" y1="60" x2="160" y2="20" stroke="#3D6BF0" stroke-width="1.8" marker-end="url(#a1)"/>
        <line x1="80" y1="20" x2="140" y2="90" stroke="#F0555C" stroke-width="1.8" marker-end="url(#a2)"/>
        <line x1="140" y1="90" x2="200" y2="20" stroke="#F0555C" stroke-width="1.8" marker-end="url(#a2)"/>
        <text x="8" y="55" font-family="IBM Plex Mono" font-size="9" fill="#122043">plan 1</text>
        <text x="8" y="85" font-family="IBM Plex Mono" font-size="9" fill="#122043">plan 2</text>
        <text x="100" y="110" font-family="IBM Plex Mono" font-size="9" fill="#122043">d(hkl)</text>
        <defs><marker id="a1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#3D6BF0"/></marker>
        <marker id="a2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0555C"/></marker></defs>
      </svg>
    </div>
    <div class="formula-box">$$n\\\\lambda = 2\\\\,d_{hkl}\\\\,\\\\sin\\\\theta$$</div>
    <p>où $n$ est l'ordre de diffraction (entier), $\\\\lambda$ la longueur d'onde des rayons X incidents (souvent la raie $K_\\\\alpha$ du cuivre, $\\\\lambda\\\\approx154$ pm), $d_{hkl}$ la distance entre plans réticulaires successifs de la famille $(hkl)$, et $\\\\theta$ l'angle d'incidence (mesuré par rapport au plan, pas à la normale). En balayant $\\\\theta$ (diffractomètre $\\\\theta$-$2\\\\theta$), chaque famille de plans donne un pic à un angle précis : le diffractogramme obtenu est une véritable « carte d'identité » du réseau cristallin, permettant de déterminer le système cristallin, les paramètres de maille et, via l'intensité relative des pics, la position des atomes dans la maille.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un pic de diffraction du premier ordre ($n=1$) est observé à $2\\\\theta=32{,}0°$ pour la raie $K_\\\\alpha$ du cuivre ($\\\\lambda=154$ pm). Calculer la distance interréticulaire $d_{hkl}$ correspondante.</p>
      <p><strong>Solution :</strong> $\\\\theta=16{,}0°$, donc $\\\\sin\\\\theta\\\\approx0{,}2756$. D'après la loi de Bragg, $d=\\\\dfrac{n\\\\lambda}{2\\\\sin\\\\theta}=\\\\dfrac{154}{2\\\\times0{,}2756}\\\\approx279{,}4$ pm.</p>
      <p class="example-answer">Réponse : $d_{hkl}\\\\approx 279$ pm.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Empilements compacts (74 %) : HC (séquence ABAB) et CFC (séquence ABCABC), avec sites interstitiels tétraédriques et octaédriques</li>
        <li>Le rapport $r_+/r_-$ prédit la coordinence : 4 (blende), 6 (NaCl), 8 (CsCl)</li>
        <li>Structures types à connaître : NaCl (6,6), CsCl (8,8), blende/wurtzite (4,4), fluorine (8,4), pérovskite ABO₃</li>
        <li>Loi de Bragg : $n\\\\lambda=2d_{hkl}\\\\sin\\\\theta$ — permet de remonter aux distances interréticulaires à partir des angles de diffraction</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Décrire CsCl comme une maille « cubique centrée » : c'est en réalité DEUX réseaux cubiques simples interpénétrés, car les deux positions ne sont pas occupées par le même ion</li>
        <li>Confondre l'angle $\\\\theta$ de Bragg (mesuré par rapport au PLAN réticulaire) avec l'angle d'incidence habituel en optique (mesuré par rapport à la normale)</li>
        <li>Oublier de diviser par 2 l'angle $2\\\\theta$ lu sur un diffractogramme avant d'appliquer la loi de Bragg</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un cation a un rayon tel que $r_+/r_- = 0{,}55$. Quelle coordinence adopte-t-il le plus probablement ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin3e1" value="wrong"> 4 (tétraédrique)</label>
          <label class="option"><input type="radio" name="matin3e1" value="right"> 6 (octaédrique)</label>
          <label class="option"><input type="radio" name="matin3e1" value="wrong"> 8 (cubique)</label>
          <label class="option"><input type="radio" name="matin3e1" value="wrong"> 3 (triangulaire)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin3e1','matin3fb1','Correct — 0,55 se situe dans l\\\\'intervalle 0,414–0,732, celui de la coordinence 6 (structure type NaCl).','Compare 0,55 aux bornes du tableau : il tombe entre 0,414 et 0,732.')">Vérifier</button>
        <div class="feedback" id="matin3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans la structure fluorine (CaF₂), quelle est la coordinence de l'anion F⁻ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin3e2" value="wrong"> 8</label>
          <label class="option"><input type="radio" name="matin3e2" value="right"> 4</label>
          <label class="option"><input type="radio" name="matin3e2" value="wrong"> 6</label>
          <label class="option"><input type="radio" name="matin3e2" value="wrong"> 12</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin3e2','matin3fb2','Correct — la fluorine est de coordinence (8,4) : 8 pour le cation Ca²⁺, 4 pour l\\\\'anion F⁻ (deux fois plus nombreux que Ca²⁺, cohérent avec la stœchiométrie CaF₂).','La notation (8,4) donne dans l\\\\'ordre la coordinence du CATION puis celle de l\\\\'ANION.')">Vérifier</button>
        <div class="feedback" id="matin3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un pic de diffraction du premier ordre apparaît à $2\\\\theta=44{,}0°$ avec $\\\\lambda_{Cu K\\\\alpha}=154$ pm. La distance interréticulaire est proche de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin3e3" value="wrong"> 385 pm</label>
          <label class="option"><input type="radio" name="matin3e3" value="right"> 206 pm</label>
          <label class="option"><input type="radio" name="matin3e3" value="wrong"> 154 pm</label>
          <label class="option"><input type="radio" name="matin3e3" value="wrong"> 77 pm</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin3e3','matin3fb3','Correct — θ=22°, sinθ≈0,3746, d=154/(2×0,3746)≈206 pm.','N\\\\'oublie pas de diviser 44° par 2 pour obtenir θ=22° avant de calculer sinθ.')">Vérifier</button>
        <div class="feedback" id="matin3fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('Structures cristallines des solides inorganiques et diffraction des rayons X')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Structures cristallines et diffraction des rayons X ». Demande-moi une structure type (NaCl, CsCl, blende...), la règle du rapport des rayons, ou un indice sur la loi de Bragg.",
  rules: [
    { test:/nacl|sel gemme/i, replies:["Structure NaCl : anions en réseau CFC, cations dans TOUS les sites octaédriques. Coordinence (6,6). Adoptée par MgO, CaO, LiF..."] },
    { test:/cscl/i, replies:["CsCl : DEUX réseaux cubiques simples interpénétrés (pas une maille cubique centrée classique, car les deux positions sont occupées par des ions différents). Coordinence (8,8)."] },
    { test:/blende|wurtzite|zns/i, replies:["Blende et wurtzite (ZnS) : anions en réseau compact (CFC pour blende, HC pour wurtzite), cations dans la MOITIÉ des sites tétraédriques. Coordinence (4,4) — structure des semi-conducteurs III-V/II-VI."] },
    { test:/fluorine|caf2/i, replies:["Fluorine (CaF₂) : cations en réseau CFC, anions (2x plus nombreux) dans TOUS les sites tétraédriques. Coordinence (8,4)."] },
    { test:/p[ée]rovskite/i, replies:["Pérovskite ABO₃ : gros cation A au centre, petits cations B aux sommets, oxygènes au milieu des arêtes formant des octaèdres BO₆. La tolérance de Goldschmidt t prédit sa stabilité pour t proche de 1."] },
    { test:/rapport des rayons|r\+\/r-/i, replies:["Le rapport r+/r- prédit la coordinence du cation : 4 pour 0,225-0,414 (tétraédrique), 6 pour 0,414-0,732 (octaédrique), 8 pour 0,732-1 (cubique)."] },
    { test:/bragg|diffraction/i, replies:["La loi de Bragg : nλ=2d·sinθ. θ est mesuré par rapport au PLAN réticulaire (pas à la normale). Elle permet, à partir des angles de pics observés, de remonter aux distances interréticulaires d(hkl)."] },
    { test:/site interstitiel|t[ée]tra[ée]drique|octa[ée]drique/i, replies:["Dans un empilement compact, les sites tétraédriques sont entourés de 4 sphères, les sites octaédriques de 6. Les structures ioniques s'obtiennent en remplissant tout ou partie de ces sites par les cations."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : situe 0,55 dans le tableau des rapports de rayons.","Indice niveau 2 : 0,55 est entre 0,414 et 0,732.","Indice niveau 3 : coordinence 6."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la notation (8,4) donne cation puis anion.","Indice niveau 2 : 8 est pour Ca²⁺.","Indice niveau 3 : F⁻ a la coordinence 4."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : divise d'abord 44° par 2.","Indice niveau 2 : θ=22°, calcule sinθ.","Indice niveau 3 : d=154/(2×sin22°)≈206 pm."] }
  ]
};

/* =========================== CHAPITRE 4 — Défauts cristallins, non-stœchiométrie et solutions solides =========================== */
MATIN_CHAPTERS[matinKey('Défauts cristallins, non-stœchiométrie et solutions solides')] = {
  objectives: [
    "Classer les défauts cristallins selon leur dimensionnalité (0D, 1D, 2D, 3D)",
    "Distinguer défaut de Schottky et défaut de Frenkel, et les écrire en notation de Kröger-Vink",
    "Expliquer l'origine de la non-stœchiométrie dans certains oxydes et son lien avec les défauts ponctuels",
    "Distinguer solution solide de substitution et d'insertion, et énoncer les règles de Hume-Rothery"
  ],
  prereqs: ["Structures cristallines des solides inorganiques et diffraction des rayons X"],
  bodyHtml: `
    <p>Le cristal parfait, empilement infini et parfaitement régulier, est un modèle idéal utile mais jamais rigoureusement réalisé : tout cristal réel contient des <strong>défauts</strong>. Loin d'être une simple imperfection, ces défauts gouvernent des propriétés technologiquement essentielles — couleur, conductivité ionique, propriétés mécaniques, diffusion à l'état solide.</p>

    <h3>1. Classification des défauts selon leur dimensionnalité</h3>
    <table class="mini-table">
      <tr><th>Dimension</th><th>Type de défaut</th><th>Exemples</th></tr>
      <tr><td>0D (ponctuel)</td><td>Lacune, interstitiel, atome étranger (substitution ou insertion)</td><td>Défauts de Schottky et Frenkel</td></tr>
      <tr><td>1D (linéaire)</td><td>Dislocations (coin, vis)</td><td>Gouvernent la déformation plastique des métaux</td></tr>
      <tr><td>2D (planaire)</td><td>Joints de grains, surfaces, fautes d'empilement</td><td>Interfaces entre cristallites d'orientations différentes</td></tr>
      <tr><td>3D (volumique)</td><td>Précipités, inclusions, pores</td><td>Seconde phase dispersée dans la matrice</td></tr>
    </table>
    <p>Ce chapitre se concentre sur les défauts ponctuels, dont l'existence a été prédite théoriquement dès 1926 par le physicien Yakov Frenkel.</p>

    <h3>2. Défauts ponctuels intrinsèques : Schottky et Frenkel</h3>
    <div class="key-point">
      <span class="eyebrow">Défaut de Schottky</span>
      Une paire de lacunes de charges opposées (une lacune cationique et une lacune anionique, en nombre tel que l'électroneutralité globale soit préservée) apparaît lorsque des ions quittent l'intérieur du cristal pour venir s'ajouter en surface, agrandissant ainsi le cristal d'une maille. Il ne modifie pas la stœchiométrie globale du composé. Favorisé lorsque cations et anions ont des tailles voisines (exemple : NaCl, AgCl).
    </div>
    <div class="key-point">
      <span class="eyebrow">Défaut de Frenkel</span>
      Un ion (le plus souvent un petit cation) quitte son site normal pour se loger dans un site interstitiel voisin, laissant derrière lui une lacune : c'est l'association d'un interstitiel et de la lacune correspondante. Comme dans le cas de Schottky, il n'y a pas de changement de stœchiométrie globale. Favorisé lorsque le cation est nettement plus petit que l'anion, ce qui lui permet de se loger dans un site interstitiel sans trop déstabiliser le réseau (exemple : AgBr, AgI).
    </div>

    <h3>3. La notation de Kröger-Vink</h3>
    <p>Pour écrire et équilibrer les « réactions de défauts » comme de véritables équations chimiques, on utilise la notation formalisée par F. A. Kröger et H. J. Vink (1956), aujourd'hui recommandée par l'IUPAC. Un défaut se note $A_Y^{\\\\bullet}$, $A_Y^{'}$ ou $A_Y^{\\\\times}$, où :</p>
    <table class="mini-table">
      <tr><th>Symbole</th><th>Signification</th></tr>
      <tr><td>$A$ (en position principale)</td><td>Nature chimique de l'espèce : symbole de l'élément, ou $V$ pour une lacune (<em>vacancy</em>), $e'$ pour un électron libre, $h^{\\\\bullet}$ pour un trou</td></tr>
      <tr><td>$Y$ (en indice)</td><td>Position occupée : symbole du site normalement occupé, ou $i$ pour un site interstitiel</td></tr>
      <tr><td>Exposant $\\\\bullet$</td><td>Charge effective positive (charge réelle − charge du site normal)</td></tr>
      <tr><td>Exposant $'$</td><td>Charge effective négative</td></tr>
      <tr><td>Exposant $\\\\times$</td><td>Charge effective nulle (site occupé normalement)</td></tr>
    </table>
    <p>La <strong>charge effective</strong> — et non la charge réelle de l'ion — est ce qui compte : elle mesure l'écart entre la charge présente sur le site et la charge qui devrait normalement s'y trouver. Dans NaCl, une lacune de Na⁺ (charge réelle nulle sur un site qui devrait porter $+1$) porte donc une charge effective $-1$, notée $V_{Na}'$ ; une lacune de Cl⁻ (site qui devrait porter $-1$, occupé par rien) porte une charge effective $+1$, notée $V_{Cl}^{\\\\bullet}$.</p>
    <div class="formula-box">$$\\\\varnothing \\\\rightleftharpoons V_{Na}' + V_{Cl}^{\\\\bullet} \\\\qquad \\\\text{(défaut de Schottky dans NaCl)}$$</div>
    <div class="formula-box">$$Ag_{Ag}^{\\\\times} \\\\rightleftharpoons Ag_i^{\\\\bullet} + V_{Ag}' \\\\qquad \\\\text{(défaut de Frenkel dans AgBr)}$$</div>
    <p>Toute équation de défaut doit respecter trois lois de conservation simultanément : conservation de la matière, conservation de la <strong>charge effective</strong> (et non de la charge réelle), et conservation des <strong>sites du réseau</strong> dans le rapport stœchiométrique du cristal hôte.</p>

    <h3>4. Non-stœchiométrie : l'exemple de la wüstite Fe₁₋ₓO</h3>
    <p>Certains oxydes de métaux de transition à valence variable s'écartent nettement de leur formule idéale : l'oxyde de fer(II) « FeO » existe en réalité toujours sous une forme <strong>lacunaire en fer</strong>, notée $Fe_{1-x}O$ avec $x$ variant typiquement entre 0,05 et 0,12 selon les conditions de synthèse — c'est la <strong>wüstite</strong>. Chaque lacune de $Fe^{2+}$ (charge effective $-2$) doit être compensée électriquement : deux ions $Fe^{2+}$ voisins s'oxydent alors en $Fe^{3+}$, créant localement des « trous d'électrons » sur le sous-réseau cationique :</p>
    <div class="formula-box">$$3\\\\,Fe_{Fe}^{\\\\times} + \\\\tfrac{1}{2}O_2 \\\\rightleftharpoons V_{Fe}'' + 2\\\\,Fe_{Fe}^{\\\\bullet} + Fe O \\\\ (\\\\text{réseau})$$</div>
    <p>Ce mécanisme illustre un phénomène général : dans de nombreux oxydes de métaux de transition, la non-stœchiométrie et la présence de cations à deux degrés d'oxydation voisins vont de pair, et c'est précisément ce couplage qui rend ces oxydes utiles comme <strong>semi-conducteurs</strong> ou <strong>conducteurs ioniques</strong> (voir chapitre 8).</p>

    <h3>5. Solutions solides et règles de Hume-Rothery</h3>
    <p>Une <strong>solution solide</strong> est un cristal dans lequel un ou plusieurs atomes étrangers s'incorporent au réseau hôte sans créer de nouvelle phase distincte. On distingue :</p>
    <div class="key-point">
      <span class="eyebrow">Solution solide de substitution</span>
      Un atome étranger remplace un atome du réseau sur son site normal (ex. le laiton, alliage Cu-Zn ; ou Ni²⁺ substituant Mg²⁺ dans MgO). Le physicien William Hume-Rothery a formulé des règles empiriques prédisant la solubilité totale de deux métaux : rayons atomiques voisins (écart &lt; 15 %), même structure cristalline, électronégativités proches, et valences compatibles.
    </div>
    <div class="key-point">
      <span class="eyebrow">Solution solide d'insertion</span>
      Un atome étranger, suffisamment petit, se loge dans les sites interstitiels du réseau hôte sans en déplacer les atomes (ex. le carbone dans le fer γ, à l'origine de la trempe des aciers ; l'hydrogène dans le palladium).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Défauts classés par dimension : ponctuels (0D), dislocations (1D), joints de grains (2D), précipités (3D)</li>
        <li>Schottky = paire de lacunes cation+anion ; Frenkel = interstitiel + lacune du même ion — aucun des deux ne change la stœchiométrie globale</li>
        <li>Notation de Kröger-Vink : $A_Y^{c}$ avec $A$=nature (ou $V$=lacune), $Y$=position (ou $i$=interstitiel), $c$=charge EFFECTIVE ($\\\\bullet$ positive, $'$ négative, $\\\\times$ nulle)</li>
        <li>Une équation de défaut conserve matière, charge effective ET rapport des sites du réseau</li>
        <li>La non-stœchiométrie (ex. Fe₁₋ₓO) s'accompagne souvent d'un changement de degré d'oxydation local pour compenser la charge des lacunes</li>
        <li>Solution solide de substitution (sur le site) vs d'insertion (dans l'interstice) ; règles de Hume-Rothery pour la miscibilité totale de deux métaux</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre charge RÉELLE et charge EFFECTIVE en notation de Kröger-Vink — c'est bien la charge effective (écart au site normal) qui figure en exposant</li>
        <li>Croire que Schottky et Frenkel changent la stœchiométrie du cristal — ce sont des défauts INTRINSÈQUES qui la conservent, contrairement à la non-stœchiométrie de type Fe₁₋ₓO</li>
        <li>Penser qu'un défaut de Frenkel favorise systématiquement les anions — c'est le plus souvent le PETIT cation qui migre en position interstitielle, rarement le gros anion</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un défaut de Frenkel est favorisé quand :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin4e1" value="wrong"> Le cation et l'anion ont des tailles très proches</label>
          <label class="option"><input type="radio" name="matin4e1" value="right"> Le cation est nettement plus petit que l'anion</label>
          <label class="option"><input type="radio" name="matin4e1" value="wrong"> L'anion est nettement plus petit que le cation</label>
          <label class="option"><input type="radio" name="matin4e1" value="wrong"> Le cristal est parfaitement stœchiométrique et pur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin4e1','matin4fb1','Correct — un petit cation peut se loger dans un site interstitiel sans trop déstabiliser le réseau, ce qui favorise le défaut de Frenkel (ex. AgBr).','Pense à quel ion peut physiquement se glisser dans un site interstitiel exigu : le plus petit, presque toujours un cation.')">Vérifier</button>
        <div class="feedback" id="matin4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans la notation de Kröger-Vink, que représente l'exposant $'$ (apostrophe) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin4e2" value="wrong"> Une charge effective positive</label>
          <label class="option"><input type="radio" name="matin4e2" value="right"> Une charge effective négative</label>
          <label class="option"><input type="radio" name="matin4e2" value="wrong"> Une position interstitielle</label>
          <label class="option"><input type="radio" name="matin4e2" value="wrong"> Une lacune quelconque</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin4e2','matin4fb2','Correct — l\\\\'apostrophe note une charge EFFECTIVE négative (le point • note une charge effective positive, et × une charge effective nulle).','Rappelle-toi le trio : • = positive, \\\\' = négative, × = nulle — toujours en charge EFFECTIVE, pas réelle.')">Vérifier</button>
        <div class="feedback" id="matin4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La formule Fe₁₋ₓO (wüstite) traduit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin4e3" value="wrong"> Un défaut de Frenkel classique sans changement de degré d'oxydation</label>
          <label class="option"><input type="radio" name="matin4e3" value="wrong"> Un excès d'oxygène interstitiel uniquement</label>
          <label class="option"><input type="radio" name="matin4e3" value="right"> Une non-stœchiométrie avec lacunes de Fe²⁺ compensées par l'oxydation de Fe²⁺ en Fe³⁺</label>
          <label class="option"><input type="radio" name="matin4e3" value="wrong"> Un cristal parfaitement stœchiométrique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin4e3','matin4fb3','Correct — les lacunes de fer (charge effective négative) sont compensées par l\\\\'oxydation locale de Fe²⁺ en Fe³⁺, ce qui maintient l\\\\'électroneutralité globale du cristal.','L\\\\'électroneutralité doit être maintenue : une lacune de cation chargée négativement doit être compensée par une charge positive supplémentaire ailleurs — ici via un changement de degré d\\\\'oxydation.')">Vérifier</button>
        <div class="feedback" id="matin4fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('Défauts cristallins, non-stœchiométrie et solutions solides')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Défauts cristallins, non-stœchiométrie et solutions solides ». Demande-moi la différence Schottky/Frenkel, comment lire la notation de Kröger-Vink, ou un indice sur un exercice.",
  rules: [
    { test:/schottky/i, replies:["Un défaut de Schottky est une paire de lacunes de charges opposées (cation + anion), formée quand des ions migrent vers la surface. Il ne change pas la stœchiométrie globale. Favorisé si cation et anion ont des tailles proches."] },
    { test:/frenkel/i, replies:["Un défaut de Frenkel est l'association d'un ion en position interstitielle et de la lacune qu'il a laissée. Le plus souvent, c'est un petit cation qui migre. Favorisé si le cation est nettement plus petit que l'anion."] },
    { test:/kr[oö]ger|vink|notation/i, replies:["Notation de Kröger-Vink : A(position en indice)^(charge effective en exposant). A = nature (ou V pour lacune, e' pour électron, h• pour trou). Position = site normal (ou i pour interstitiel). Charge : • positive, ' négative, × nulle — toujours EFFECTIVE, pas réelle."] },
    { test:/charge effective/i, replies:["La charge effective est l'écart entre la charge présente sur un site et la charge qu'il devrait normalement porter. Une lacune de Na+ dans NaCl porte une charge effective -1 (notée V'Na), pas 0."] },
    { test:/non.st[oœ]chiom[ée]trie|wustite|fe1-xo/i, replies:["La wüstite Fe₁₋ₓO est un oxyde lacunaire en fer : les lacunes de Fe²⁺ (charge négative) sont compensées par l'oxydation de Fe²⁺ voisins en Fe³⁺, pour préserver l'électroneutralité globale."] },
    { test:/solution solide|substitution|insertion|hume.rothery/i, replies:["Solution solide de substitution : un atome étranger remplace un atome sur son site (ex. laiton Cu-Zn). Solution solide d'insertion : un petit atome se loge dans un interstitiel (ex. C dans Fe γ). Les règles de Hume-Rothery prédisent la miscibilité totale de deux métaux (rayons proches, même structure, électronégativités proches, valences compatibles)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quel ion peut physiquement entrer dans un site interstitiel exigu ?","Indice niveau 2 : c'est presque toujours le PETIT cation.","Indice niveau 3 : cation nettement plus petit que l'anion."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : rappelle-toi le trio de symboles •, ', ×.","Indice niveau 2 : • = positive, × = nulle.","Indice niveau 3 : ' = charge effective négative."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à l'électroneutralité globale du cristal.","Indice niveau 2 : une lacune de cation (charge négative) doit être compensée.","Indice niveau 3 : par l'oxydation locale de Fe²⁺ en Fe³⁺."] }
  ]
};

/* =========================== CHAPITRE 5 — Diagrammes de phases et transformations à l'état solide =========================== */
MATIN_CHAPTERS[matinKey('Diagrammes de phases et transformations à l\'état solide')] = {
  objectives: [
    "Appliquer la règle des phases de Gibbs pour calculer la variance d'un système",
    "Lire un diagramme binaire isomorphe (miscibilité totale à l'état solide) et un diagramme à eutectique simple",
    "Utiliser la règle des segments inverses (règle des bras de levier) pour déterminer une composition ou une proportion de phases",
    "Relier la diffusion à l'état solide aux lois de Fick et à la loi d'Arrhenius"
  ],
  prereqs: ["Défauts cristallins, non-stœchiométrie et solutions solides"],
  bodyHtml: `
    <p>Les propriétés d'un matériau inorganique dépendent autant de sa composition que des phases qui coexistent en son sein à une température donnée. Les diagrammes de phases sont l'outil central pour prévoir quelles phases se forment, dans quelles proportions, lors de l'élaboration ou de l'utilisation d'un matériau.</p>

    <h3>1. La règle des phases de Gibbs</h3>
    <p>Pour un système à l'équilibre thermodynamique constitué de $C$ constituants indépendants répartis en $\\\\varphi$ phases, le nombre de degrés de liberté (la <strong>variance</strong> $v$, c'est-à-dire le nombre de paramètres intensifs — température, pression, compositions — que l'on peut fixer indépendamment sans changer le nombre de phases en présence) est donné par la règle de Gibbs :</p>
    <div class="formula-box">$$v = C - \\\\varphi + 2$$</div>
    <p>En science des matériaux, on travaille presque toujours à pression atmosphérique fixée (un paramètre en moins), d'où la <strong>règle des phases condensée</strong> souvent utilisée pour les diagrammes binaires solide-liquide :</p>
    <div class="formula-box">$$v = C - \\\\varphi + 1$$</div>
    <p>Pour un système binaire ($C=2$) monophasé ($\\\\varphi=1$), $v=2$ : on peut fixer librement la température ET la composition. Pour le même système biphasé ($\\\\varphi=2$), $v=1$ : fixer la température impose alors la composition de chacune des deux phases en équilibre.</p>

    <h3>2. Diagramme binaire à miscibilité totale à l'état solide (isomorphe)</h3>
    <p>Lorsque deux composants A et B respectent les règles de Hume-Rothery (rayons atomiques proches, même structure cristalline...), ils sont miscibles en toutes proportions aussi bien à l'état liquide qu'à l'état solide : c'est le cas du système Cu-Ni. Le diagramme comporte deux courbes qui délimitent trois domaines : le <strong>liquidus</strong> (au-dessus, tout est liquide), le <strong>solidus</strong> (en dessous, tout est solide en solution solide $\\\\alpha$ unique) et un fuseau biphasé liquide + solide entre les deux.</p>
    <div class="key-point">
      <span class="eyebrow">Règle des segments inverses (règle du bras de levier)</span>
      Dans le domaine biphasé, à une température $T$ donnée, une horizontale (« conode ») coupe le liquidus en $x_L$ et le solidus en $x_S$. Pour un alliage global de composition $x_0$, la fraction massique de phase solide $f_S$ se calcule par :
    </div>
    <div class="formula-box">$$f_S = \\\\frac{x_0 - x_L}{x_S - x_L} \\\\qquad f_L = \\\\frac{x_S - x_0}{x_S - x_L} = 1-f_S$$</div>
    <p>Le nom « règle des segments inverses » vient de ce que la fraction de solide est proportionnelle au segment du côté LIQUIDE de la conode, et réciproquement — un piège classique à retenir.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> à une température donnée d'un système binaire A-B, le liquidus indique $x_L=20\\\\%$ de B et le solidus $x_S=40\\\\%$ de B. L'alliage global contient $x_0=30\\\\%$ de B. Calculer les fractions massiques de chaque phase.</p>
      <p><strong>Solution :</strong> $f_S=\\\\dfrac{x_0-x_L}{x_S-x_L}=\\\\dfrac{30-20}{40-20}=\\\\dfrac{10}{20}=0{,}5$. Donc $f_L=1-0{,}5=0{,}5$.</p>
      <p class="example-answer">Réponse : 50 % de phase solide et 50 % de phase liquide, en proportions égales car $x_0$ est exactement au milieu de la conode.</p>
    </div>

    <h3>3. Diagramme à eutectique simple</h3>
    <p>Lorsque A et B sont totalement miscibles à l'état liquide mais totalement <strong>immiscibles</strong> à l'état solide (aucune solution solide, seulement des phases pures A et B qui cristallisent séparément), le diagramme présente un point invariant remarquable, le <strong>point eutectique</strong> : à cette composition précise et à cette température (la plus basse du diagramme), le liquide se transforme intégralement en un mélange intime des deux phases solides pures, sans palier de fusion progressive — d'où l'intérêt technologique majeur des alliages eutectiques (brasures, alliages à bas point de fusion). Au point eutectique, $\\\\varphi=3$ (liquide + solide A + solide B) et $C=2$, donc $v=2-3+1=0$ : la transformation eutectique a lieu à température et composition fixes, invariantes.</p>

    <h3>4. Diffusion à l'état solide</h3>
    <p>La plupart des transformations de phases (homogénéisation d'un alliage, frittage d'une céramique, traitement thermique d'un acier) exigent le déplacement d'atomes au sein du solide, un processus lent gouverné par les défauts ponctuels du chapitre précédent (les lacunes, en particulier, permettent le déplacement des atomes voisins de site en site).</p>
    <p>La <strong>première loi de Fick</strong> relie le flux de matière $J$ au gradient de concentration $\\\\dfrac{\\\\partial C}{\\\\partial x}$ :</p>
    <div class="formula-box">$$J = -D\\\\,\\\\frac{\\\\partial C}{\\\\partial x}$$</div>
    <p>où $D$ est le <strong>coefficient de diffusion</strong>, qui dépend très fortement de la température selon une loi de type Arrhenius :</p>
    <div class="formula-box">$$D = D_0\\\\,\\\\exp\\\\!\\\\left(-\\\\frac{E_a}{RT}\\\\right)$$</div>
    <p>avec $D_0$ le facteur préexponentiel, $E_a$ l'énergie d'activation de la diffusion (qui inclut l'énergie de formation des lacunes et l'énergie de leur déplacement) et $R$ la constante des gaz parfaits. Cette dépendance exponentielle explique pourquoi la diffusion à l'état solide, négligeable à température ambiante pour la plupart des matériaux, devient rapide dès que l'on approche du point de fusion — d'où l'usage systématique de traitements thermiques à haute température pour homogénéiser un alliage ou fritter une céramique (cf. chapitre 6).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Règle des phases : $v=C-\\\\varphi+1$ pour un système condensé (P fixée) — un point invariant a $v=0$</li>
        <li>Diagramme isomorphe : miscibilité totale à l'état solide ; fuseau liquidus/solidus</li>
        <li>Règle des segments inverses : $f_S=(x_0-x_L)/(x_S-x_L)$ — la fraction de solide utilise le segment du côté LIQUIDE</li>
        <li>Diagramme à eutectique : point invariant où le liquide se transforme directement en mélange de deux solides purs, à $T$ et composition fixes</li>
        <li>Diffusion : $J=-D\\\\,\\\\partial C/\\\\partial x$ (1ère loi de Fick), avec $D=D_0\\\\exp(-E_a/RT)$ — très sensible à la température</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser la règle des segments : $f_S$ utilise le segment $(x_0-x_L)$ côté liquidus, pas $(x_S-x_0)$</li>
        <li>Croire qu'un mélange eutectique est un COMPOSÉ chimique unique — c'est un mélange intime de deux phases solides pures, sans nouvelle structure cristalline</li>
        <li>Oublier la dépendance EXPONENTIELLE (et non linéaire) du coefficient de diffusion à la température</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un système binaire condensé biphasé (φ=2, P fixée), la variance vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin5e1" value="wrong"> 0</label>
          <label class="option"><input type="radio" name="matin5e1" value="right"> 1</label>
          <label class="option"><input type="radio" name="matin5e1" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="matin5e1" value="wrong"> 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin5e1','matin5fb1','Correct — v=C-φ+1=2-2+1=1 : fixer la température impose alors les compositions des deux phases (liquidus/solidus).','Applique v=C-φ+1 avec C=2 et φ=2.')">Vérifier</button>
        <div class="feedback" id="matin5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un système isomorphe, le liquidus indique 10% de B, le solidus 50% de B, et l'alliage global contient 30% de B. Quelle est la fraction massique de solide ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin5e2" value="wrong"> 0,25</label>
          <label class="option"><input type="radio" name="matin5e2" value="right"> 0,5</label>
          <label class="option"><input type="radio" name="matin5e2" value="wrong"> 0,75</label>
          <label class="option"><input type="radio" name="matin5e2" value="wrong"> 1,0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin5e2','matin5fb2','Correct — fS=(30-10)/(50-10)=20/40=0,5.','fS = (x0 - xL) / (xS - xL) = (30-10)/(50-10).')">Vérifier</button>
        <div class="feedback" id="matin5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Au point eutectique d'un système binaire (liquide + solide A + solide B en équilibre), la variance vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin5e3" value="right"> 0</label>
          <label class="option"><input type="radio" name="matin5e3" value="wrong"> 1</label>
          <label class="option"><input type="radio" name="matin5e3" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="matin5e3" value="wrong"> 3</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin5e3','matin5fb3','Correct — v=C-φ+1=2-3+1=0 : le point eutectique est un point INVARIANT, à température et composition fixes.','Ici φ=3 (liquide + 2 solides purs) et C=2 : applique v=C-φ+1.')">Vérifier</button>
        <div class="feedback" id="matin5fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('Diagrammes de phases et transformations à l\'état solide')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Diagrammes de phases et transformations à l'état solide ». Demande-moi la règle des phases, la règle des segments inverses, ou un indice sur un exercice.",
  rules: [
    { test:/gibbs|r[èe]gle des phases|variance/i, replies:["Règle de Gibbs : v=C-φ+2 (système général) ou v=C-φ+1 pour un système condensé à pression fixée. Un point invariant (comme l'eutectique) a v=0."] },
    { test:/isomorphe|miscibilit[ée] totale|liquidus|solidus/i, replies:["Un diagramme isomorphe montre une miscibilité totale à l'état solide (ex. Cu-Ni) : un fuseau entre le liquidus (au-dessus, tout liquide) et le solidus (en dessous, tout solide)."] },
    { test:/segments inverses|bras de levier|fs\s*=|fraction.*solide/i, replies:["Règle des segments inverses : fS=(x0-xL)/(xS-xL). Attention, la fraction de SOLIDE utilise le segment du côté LIQUIDUS — un piège classique !"] },
    { test:/eutectique/i, replies:["Le point eutectique est un point invariant (v=0) où un liquide se transforme directement en un mélange intime de deux phases SOLIDES PURES, à température et composition fixes — ce n'est pas un nouveau composé chimique."] },
    { test:/fick|diffusion/i, replies:["1ère loi de Fick : J=-D·∂C/∂x. Le coefficient de diffusion D suit une loi d'Arrhenius D=D0·exp(-Ea/RT), très sensible à la température."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique v=C-φ+1 avec C=2, φ=2.","Indice niveau 2 : v=2-2+1.","Indice niveau 3 : v=1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : fS=(x0-xL)/(xS-xL).","Indice niveau 2 : fS=(30-10)/(50-10).","Indice niveau 3 : fS=0,5."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : au point eutectique, combien de phases coexistent ?","Indice niveau 2 : φ=3 (liquide + 2 solides), C=2.","Indice niveau 3 : v=2-3+1=0."] }
  ]
};

/* =========================== CHAPITRE 6 — Céramiques techniques et matériaux réfractaires =========================== */
MATIN_CHAPTERS[matinKey('Céramiques techniques et matériaux réfractaires')] = {
  objectives: [
    "Distinguer céramiques traditionnelles, techniques et réfractaires selon leur composition et leur usage",
    "Expliquer pourquoi les céramiques sont dures mais fragiles, à partir de la nature de leur liaison",
    "Décrire le procédé de mise en forme par frittage et le rôle de la diffusion à l'état solide",
    "Situer les céramiques ultra-réfractaires (UHTC) et à haute entropie parmi les développements récents du domaine"
  ],
  prereqs: ["Diagrammes de phases et transformations à l'état solide"],
  bodyHtml: `
    <p>Les céramiques forment la deuxième grande famille des matériaux inorganiques : des composés le plus souvent ioniques ou ionocovalents (oxydes, carbures, nitrures, borures), obtenus par frittage plutôt que par fusion-solidification comme les métaux. Ce chapitre relie leurs propriétés d'usage à leur structure et à leur mode d'élaboration.</p>

    <h3>1. Classification des céramiques</h3>
    <table class="mini-table">
      <tr><th>Catégorie</th><th>Composition typique</th><th>Exemples</th><th>Usages</th></tr>
      <tr><td>Céramiques traditionnelles (silicatées)</td><td>Argiles, silicates naturels</td><td>Porcelaine, faïence, briques</td><td>Vaisselle, construction</td></tr>
      <tr><td>Céramiques techniques (fines)</td><td>Oxydes, carbures, nitrures purs et synthétiques</td><td>Al₂O₃, ZrO₂, SiC, Si₃N₄</td><td>Outils de coupe, prothèses, électronique</td></tr>
      <tr><td>Céramiques réfractaires</td><td>Oxydes à très haut point de fusion</td><td>MgO, ZrO₂, chromite</td><td>Revêtements de fours industriels</td></tr>
      <tr><td>Céramiques ultra-réfractaires (UHTC)</td><td>Borures, carbures de métaux de transition</td><td>HfB₂, ZrB₂, TaC</td><td>Aérospatiale, rentrée atmosphérique</td></tr>
    </table>

    <h3>2. Pourquoi les céramiques sont-elles dures mais fragiles ?</h3>
    <p>La liaison ionocovalente des céramiques, forte et le plus souvent directionnelle, s'oppose efficacement à la <strong>rayure</strong> (grande dureté) et confère une bonne tenue à haute température (haut point de fusion). Mais cette même liaison, contrairement à la liaison métallique non directionnelle, ne permet pas aux plans cristallins de glisser les uns sur les autres : les céramiques ne possèdent quasiment pas de mécanisme de <strong>déformation plastique</strong> à température ambiante. Toute concentration de contrainte (une microfissure, un pore) se propage donc directement jusqu'à la rupture, sans dissiper l'énergie par déformation — d'où la <strong>fragilité</strong> caractéristique des céramiques, à l'opposé de la ductilité des métaux.</p>
    <div class="key-point">
      <span class="eyebrow">Ténacité et renforcement</span>
      La <strong>ténacité</strong> ($K_{IC}$, résistance à la propagation d'une fissure) est le talon d'Achille des céramiques. Les stratégies de renforcement (zircone stabilisée à transformation de phase, composites céramique-céramique renforcés de fibres) visent précisément à freiner la propagation des fissures, sans changer la dureté intrinsèque du matériau.
    </div>

    <h3>3. Céramiques techniques majeures</h3>
    <p><strong>Alumine ($Al_2O_3$)</strong> : céramique technique la plus utilisée industriellement, très dure, bon isolant électrique, résistante à l'usure — substrats électroniques, outils de coupe, prothèses de hanche. <strong>Zircone ($ZrO_2$)</strong> : structure fluorine à haute température, mais qui se distord vers une phase monoclinique moins symétrique en refroidissant ; on la <strong>stabilise</strong> par dopage (yttrine $Y_2O_3$, cérine...) pour conserver à température ambiante la phase cubique ou quadratique, dense et tenace (« zircone yttriée »), utilisée en prothèses dentaires et en électrolyte solide de piles à combustible (grâce à sa conductivité ionique en $O^{2-}$, directement liée aux lacunes d'oxygène créées par le dopage — cf. chapitre 4). <strong>Carbure de silicium ($SiC$)</strong> et <strong>nitrure de silicium ($Si_3N_4$)</strong> : liaison covalente quasi pure, excellente résistance à l'usure et aux chocs thermiques, utilisés en abrasifs, freins céramiques, substrats de semi-conducteurs de puissance.</p>

    <h3>4. Céramiques ultra-réfractaires et céramiques à haute entropie : la recherche actuelle</h3>
    <p>Les <strong>céramiques ultra-réfractaires</strong> (UHTC, <em>Ultra-High Temperature Ceramics</em>) regroupent des carbures, nitrures et surtout des <strong>borures</strong> de métaux de transition (Ti, Zr, Hf, Ta, Nb), dont les points de fusion dépassent 3000 °C et dont la stabilité au-delà de 2000 °C provient de liaisons covalentes très fortes. Le marché mondial de ces matériaux, porté par l'aérospatiale (protections thermiques de rentrée atmosphérique, tuyères de fusées, vols hypersoniques), était estimé à environ 1,3 milliard de dollars en 2024 et devrait dépasser 2 milliards de dollars d'ici 2034.</p>
    <p>Une évolution notable et récente de ce domaine est l'apparition des <strong>céramiques ultra-réfractaires à haute entropie</strong> (HE-UHTC), inspirées du concept d'alliage à haute entropie développé initialement pour les métaux : au lieu d'un diborure d'un seul métal de transition (ex. $ZrB_2$), on mélange en proportions voisines <strong>quatre à cinq métaux différents</strong> sur le même sous-réseau, par exemple $(Hf_{0,2}Zr_{0,2}Ta_{0,2}Nb_{0,2}Ti_{0,2})B_2$. Ce désordre configurationnel élevé sur le sous-réseau métallique tend à renforcer la dureté et la résistance à l'oxydation par rapport aux borures simples, un axe de recherche actif en science des matériaux céramiques.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi la zircone pure ($ZrO_2$) non stabilisée se fissure-t-elle facilement lors d'un cycle de chauffage-refroidissement, alors que la zircone yttriée ne pose pas ce problème ?</p>
      <p><strong>Solution :</strong> la zircone pure subit, en refroidissant, une transformation de phase displacive (quadratique → monoclinique, vers 950-1150°C) accompagnée d'une expansion volumique d'environ 3 à 5 %. Répétée à chaque cycle thermique, cette variation de volume génère des contraintes internes suffisantes pour fissurer la pièce. Le dopage par $Y_2O_3$ introduit des lacunes d'oxygène (compensant la substitution de $Zr^{4+}$ par $Y^{3+}$) qui stabilisent la phase cubique (ou quadratique) à température ambiante, supprimant cette transformation destructrice.</p>
      <p class="example-answer">Réponse : c'est la transformation de phase displacive avec changement de volume qui fissure la zircone pure ; le dopage stabilisateur la supprime en figeant une phase de plus haute symétrie.</p>
    </div>

    <h3>5. Mise en forme par frittage</h3>
    <p>Contrairement aux métaux, les céramiques techniques ne sont presque jamais mises en forme par fusion (leurs points de fusion sont trop élevés, et la solidification donnerait des microstructures trop grossières). On procède plutôt par <strong>frittage</strong> : une poudre céramique fine, mise en forme (pressage uniaxial, coulage, pressage isostatique à chaud), est chauffée à une température inférieure à sa température de fusion (typiquement 0,5 à 0,8 fois $T_{fusion}$ en kelvins), suffisante pour activer la diffusion à l'état solide entre les grains de poudre en contact. La matière diffuse des joints de grains vers les pores, qui se comblent progressivement : la pièce se densifie et se contracte sans jamais fondre, formant un solide polycristallin cohérent.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Céramiques traditionnelles (silicatées), techniques (oxydes/carbures/nitrures purs) et réfractaires (haut point de fusion) : classement par composition et usage</li>
        <li>Dureté élevée mais fragilité : la liaison ionocovalente directionnelle empêche le glissement de plans qui rend les métaux ductiles</li>
        <li>Zircone stabilisée par dopage (Y₂O₃) : évite la transformation de phase displacive destructrice de la zircone pure au refroidissement</li>
        <li>UHTC (borures de métaux de transition, T fusion &gt; 3000°C) et leurs variantes récentes à haute entropie (mélange de 4-5 métaux sur un sous-réseau)</li>
        <li>Le frittage densifie une poudre par diffusion à l'état solide, SANS fusion, à 0,5-0,8 × T fusion</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que les céramiques sont mises en forme par fusion comme les métaux — c'est le frittage, un procédé à l'état solide, qui domine</li>
        <li>Penser que « dur » et « tenace » sont synonymes — une céramique peut être extrêmement dure tout en étant peu tenace (fragile)</li>
        <li>Oublier que le rôle du dopant dans la zircone stabilisée est de créer des lacunes d'oxygène qui stabilisent une phase, pas simplement de « durcir » le matériau</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pourquoi une céramique se déforme-t-elle très peu plastiquement avant de rompre, contrairement à un métal ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin6e1" value="wrong"> Parce qu'elle est toujours amorphe</label>
          <label class="option"><input type="radio" name="matin6e1" value="right"> Parce que sa liaison directionnelle empêche le glissement des plans cristallins</label>
          <label class="option"><input type="radio" name="matin6e1" value="wrong"> Parce qu'elle ne contient jamais de défauts</label>
          <label class="option"><input type="radio" name="matin6e1" value="wrong"> Parce qu'elle est toujours poreuse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin6e1','matin6fb1','Correct — la liaison ionocovalente, contrairement à la liaison métallique, est directionnelle : elle s\\\\'oppose au glissement des plans, mécanisme de la déformation plastique.','Compare avec le chapitre 1 : la ductilité des métaux vient de la non-directionnalité de leur liaison — l\\\\'inverse s\\\\'applique aux céramiques.')">Vérifier</button>
        <div class="feedback" id="matin6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le rôle du dopage à l'yttrine (Y₂O₃) dans la zircone stabilisée est principalement de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin6e2" value="wrong"> Augmenter le point de fusion de la zircone</label>
          <label class="option"><input type="radio" name="matin6e2" value="right"> Créer des lacunes d'oxygène qui stabilisent une phase de plus haute symétrie à température ambiante</label>
          <label class="option"><input type="radio" name="matin6e2" value="wrong"> Rendre la zircone amorphe</label>
          <label class="option"><input type="radio" name="matin6e2" value="wrong"> Colorer la zircone</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin6e2','matin6fb2','Correct — la substitution de Zr⁴⁺ par Y³⁺ crée des lacunes d\\\\'oxygène (pour l\\\\'électroneutralité) qui stabilisent la phase cubique/quadratique, supprimant la transformation displacive destructrice.','Relie ce dopage au chapitre 4 : substitution de charge différente ⇒ création de lacunes compensatrices.')">Vérifier</button>
        <div class="feedback" id="matin6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le frittage d'une poudre céramique se produit typiquement à quelle fraction de sa température de fusion (en kelvins) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin6e3" value="wrong"> 0,05 à 0,1</label>
          <label class="option"><input type="radio" name="matin6e3" value="wrong"> 1,0 à 1,2 (au-delà de la fusion)</label>
          <label class="option"><input type="radio" name="matin6e3" value="right"> 0,5 à 0,8</label>
          <label class="option"><input type="radio" name="matin6e3" value="wrong"> Exactement à la température de fusion</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin6e3','matin6fb3','Correct — le frittage se fait sous la fusion (0,5 à 0,8 × Tf en K), une température assez haute pour activer la diffusion à l\\\\'état solide mais sans faire fondre la pièce.','Le frittage est un procédé à l\\\\'ÉTAT SOLIDE : la température reste nettement sous Tf, mais assez haute pour activer la diffusion (cf. loi d\\\\'Arrhenius, chapitre 5).')">Vérifier</button>
        <div class="feedback" id="matin6fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('Céramiques techniques et matériaux réfractaires')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Céramiques techniques et matériaux réfractaires ». Demande-moi pourquoi les céramiques sont fragiles, comment fonctionne la zircone stabilisée, ou un indice sur un exercice.",
  rules: [
    { test:/classification|traditionnelle|technique|r[ée]fractaire/i, replies:["Céramiques traditionnelles (silicatées : porcelaine, briques), techniques (oxydes/carbures/nitrures purs : Al2O3, SiC), réfractaires (très haut point de fusion pour revêtements de fours), et UHTC (borures, T fusion > 3000°C)."] },
    { test:/dur.*fragile|fragilit[ée]|ductilit[ée]/i, replies:["Les céramiques sont dures (liaison forte) mais fragiles (liaison directionnelle qui empêche le glissement de plans) : contrairement aux métaux, elles n'ont quasiment aucun mécanisme de déformation plastique."] },
    { test:/zircone|zro2|stabilis[ée]e/i, replies:["La zircone pure subit une transformation de phase destructrice au refroidissement (expansion volumique). Le dopage à l'yttrine (Y2O3) crée des lacunes d'oxygène qui stabilisent une phase de plus haute symétrie, évitant la fissuration — et rend au passage la zircone conductrice ioniquement."] },
    { test:/uhtc|haute temp[ée]rature|haute entropie/i, replies:["Les UHTC sont des borures/carbures de métaux de transition (T fusion > 3000°C), pour l'aérospatiale. Les céramiques à haute entropie mélangent 4-5 métaux différents sur le même sous-réseau (ex. (Hf,Zr,Ta,Nb,Ti)B2) pour renforcer dureté et résistance à l'oxydation."] },
    { test:/frittage/i, replies:["Le frittage densifie une poudre céramique par diffusion à l'état solide (0,5 à 0,8 × Tf en K), sans jamais faire fondre la pièce : la matière comble progressivement les pores entre grains."] },
    { test:/t[ée]nacit[ée]/i, replies:["La ténacité (résistance à la propagation d'une fissure) est le point faible des céramiques, à distinguer de la dureté (résistance à la rayure) : une céramique peut être très dure et peu tenace à la fois."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à la directionnalité de la liaison ionocovalente.","Indice niveau 2 : elle empêche le glissement de plans.","Indice niveau 3 : donc pas de déformation plastique, la céramique casse net."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : Y³⁺ remplace Zr⁴⁺, quelle charge manque-t-il ?","Indice niveau 2 : des lacunes d'oxygène apparaissent pour compenser.","Indice niveau 3 : elles stabilisent une phase de haute symétrie."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le frittage reste un procédé à l'état SOLIDE.","Indice niveau 2 : la température est nettement sous Tf mais assez haute pour la diffusion.","Indice niveau 3 : 0,5 à 0,8 × Tf (en kelvins)."] }
  ]
};

/* =========================== CHAPITRE 7 — Verres et matériaux amorphes =========================== */
MATIN_CHAPTERS[matinKey('Verres et matériaux amorphes')] = {
  objectives: [
    "Distinguer solidification vitreuse et cristallisation à partir de la courbe volume-température",
    "Définir la température de transition vitreuse $T_g$ et les facteurs qui l'influencent",
    "Appliquer les règles de Zachariasen pour identifier formateurs, modificateurs et intermédiaires de réseau",
    "Décrire la composition et le rôle des principaux verres d'oxydes industriels"
  ],
  prereqs: ["Céramiques techniques et matériaux réfractaires"],
  bodyHtml: `
    <p>Les verres constituent une troisième grande famille de matériaux inorganiques, à côté des métaux et des céramiques cristallisées : des solides amorphes, sans ordre à longue distance, obtenus le plus souvent en refroidissant rapidement un liquide pour éviter la cristallisation.</p>

    <h3>1. Solidification vitreuse contre cristallisation</h3>
    <p>Lorsqu'un liquide refroidit, deux évolutions sont possibles. S'il cristallise, son volume (ou son enthalpie) chute brutalement à la <strong>température de fusion</strong> $T_f$, avec un palier isotherme où liquide et solide cristallin coexistent (variance nulle pour un corps pur, cf. chapitre 5). S'il ne cristallise pas — parce que le refroidissement est trop rapide pour laisser aux atomes le temps de s'organiser en réseau périodique, ou parce que la viscosité du liquide augmente trop vite —, il devient un <strong>liquide surfondu</strong> de plus en plus visqueux, puis se fige progressivement, sans discontinuité brutale, en un solide amorphe : le <strong>verre</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Transition vitreuse $T_g$</span>
      La <strong>température de transition vitreuse</strong> $T_g$ marque, sur la courbe volume-température, un simple changement de PENTE (et non un saut brutal comme à $T_f$) : en dessous de $T_g$, le matériau se comporte comme un solide rigide (les mouvements moléculaires à grande échelle sont figés) ; au-dessus, comme un liquide très visqueux. $T_g$ n'est pas une grandeur thermodynamique aussi bien définie que $T_f$ : elle dépend légèrement de la vitesse de refroidissement (un refroidissement plus lent donne un $T_g$ plus bas, car il laisse davantage de temps à la structure pour se réarranger avant de se figer).
    </div>

    <h3>2. Les règles de Zachariasen (1932)</h3>
    <p>Pour qu'un oxyde $M_xO_y$ soit capable de former un réseau vitreux (et non de cristalliser facilement), le chimiste et cristallographe William H. Zachariasen a énoncé des règles structurales encore utilisées aujourd'hui, fondées sur le concept de <strong>réseau désordonné continu</strong> : un réseau tridimensionnel construit avec les mêmes polyèdres de coordination que le cristal correspondant (par exemple des tétraèdres $SiO_4$ pour la silice), mais reliés entre eux avec des angles et des distances légèrement variables d'un site à l'autre, sans périodicité à longue distance.</p>
    <table class="mini-table">
      <tr><th>Rôle</th><th>Critère de Zachariasen</th><th>Exemples</th></tr>
      <tr><td>Formateur de réseau</td><td>Cation à petit rayon, forte liaison covalente avec l'oxygène, coordinence 3 ou 4, polyèdres reliés uniquement par les sommets</td><td>$SiO_2$, $B_2O_3$, $P_2O_5$, $GeO_2$</td></tr>
      <tr><td>Modificateur de réseau</td><td>Cation de grand rayon, liaison plutôt ionique, rompt des ponts oxygène du réseau (crée des oxygènes non pontants)</td><td>$Na_2O$, $K_2O$, $CaO$</td></tr>
      <tr><td>Intermédiaire</td><td>Ne forme pas de réseau seul, mais peut s'y insérer et renforcer la structure en présence d'un formateur</td><td>$Al_2O_3$, $ZnO$, $PbO$</td></tr>
    </table>
    <p>Les modificateurs, en rompant des ponts oxygène (« Si-O-Si » devient « Si-O⁻ ... Na⁺ ... ⁻O-Si »), abaissent la viscosité du liquide et donc la température de mise en forme du verre — un compromis technologique important, car ils dégradent en général aussi la résistance chimique et mécanique du verre.</p>

    <h3>3. Les principaux verres d'oxydes industriels</h3>
    <table class="mini-table">
      <tr><th>Verre</th><th>Composition typique</th><th>Propriétés / usages</th></tr>
      <tr><td>Silice vitreuse</td><td>100 % $SiO_2$</td><td>$T_g$ très élevée (~1200°C), excellente tenue chimique et thermique, optique de précision — coûteux à mettre en forme</td></tr>
      <tr><td>Verre sodocalcique</td><td>$SiO_2$ (formateur) + $Na_2O$ + $CaO$ (modificateurs)</td><td>~90 % du verre plat et des contenants ; $T_g$ abaissée par $Na_2O$, $CaO$ améliore la durabilité chimique</td></tr>
      <tr><td>Verre borosilicate</td><td>$SiO_2$ + $B_2O_3$ (deux formateurs) + faible teneur en alcalins</td><td>Faible dilatation thermique, résistance aux chocs thermiques — verrerie de laboratoire, ustensiles culinaires</td></tr>
    </table>

    <h3>4. Au-delà des verres d'oxydes : les alliages métalliques amorphes</h3>
    <p>Le concept de verre ne se limite pas aux oxydes : certains alliages métalliques, refroidis extrêmement vite (parfois plus de $10^6$ K/s, ou plus lentement pour des compositions multi-élémentaires spécifiques dites à « large domaine de liquide surfondu »), figent une structure désordonnée au lieu de cristalliser, donnant des <strong>verres métalliques</strong> (ex. alliages base Zr, Fe ou Pd). Combinant une résistance mécanique très élevée à une bonne élasticité et à l'absence de joints de grains, ces matériaux amorphes restent aujourd'hui un axe de recherche actif, en lien avec les alliages à haute entropie évoqués au chapitre 6.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> expliquer pourquoi l'ajout de $Na_2O$ à la silice pure abaisse la température de mise en forme du verre, mais dégrade en général sa résistance chimique.</p>
      <p><strong>Solution :</strong> $Na_2O$ est un modificateur de réseau : chaque ion $O^{2-}$ apporté rompt un pont Si-O-Si du réseau covalent continu de la silice, créant des « oxygènes non pontants » chargés négativement, compensés par des ions $Na^+$ mobiles logés dans les interstices du réseau. Moins de ponts covalents signifie un réseau moins rigide, donc une viscosité plus faible à température donnée (mise en forme facilitée). Mais ces mêmes oxygènes non pontants, et la mobilité des ions $Na^+$, offrent des sites d'attaque préférentiels à l'eau ou aux acides, d'où une moins bonne résistance chimique.</p>
      <p class="example-answer">Réponse : la rupture des ponts Si-O-Si par $Na_2O$ diminue la viscosité (mise en forme facilitée à plus basse température) mais fragilise chimiquement le réseau.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un verre se fige progressivement (pas de palier de fusion) via un liquide surfondu de plus en plus visqueux ; $T_g$ marque un changement de PENTE, pas un saut, sur la courbe volume-température</li>
        <li>Règles de Zachariasen : formateurs de réseau (SiO₂, B₂O₃...), modificateurs (Na₂O, CaO...), intermédiaires (Al₂O₃, ZnO...)</li>
        <li>Les modificateurs rompent des ponts oxygène : baisse de viscosité (mise en forme facilitée) mais baisse de la résistance chimique</li>
        <li>Verre sodocalcique (le plus courant) et verre borosilicate (résistance aux chocs thermiques) sont les deux verres d'oxydes industriels majeurs</li>
        <li>Les verres métalliques amorphes (refroidissement ultra-rapide) forment une famille à part, sans joints de grains</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre $T_g$ (changement de pente, transition vitreuse) avec $T_f$ (saut brutal, fusion d'un cristal) — ce ne sont pas des transitions de même nature</li>
        <li>Croire qu'un verre est un « liquide qui s'écoule lentement » à température ambiante — c'est un mythe répandu (souvent basé sur l'épaisseur irrégulière des vitraux anciens, due aux techniques de fabrication de l'époque, pas à un écoulement du verre)</li>
        <li>Penser qu'un modificateur de réseau améliore toutes les propriétés — il facilite la mise en forme mais dégrade en général la résistance chimique</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Sur une courbe volume-température, la transition vitreuse $T_g$ se manifeste par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin7e1" value="wrong"> Un saut brutal de volume, comme à la fusion</label>
          <label class="option"><input type="radio" name="matin7e1" value="right"> Un simple changement de pente de la courbe</label>
          <label class="option"><input type="radio" name="matin7e1" value="wrong"> Un plateau isotherme</label>
          <label class="option"><input type="radio" name="matin7e1" value="wrong"> Une augmentation brutale de volume</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin7e1','matin7fb1','Correct — contrairement à la fusion (saut brutal, palier isotherme), la transition vitreuse est un changement progressif de pente : ce n\\\\'est pas une transition de phase thermodynamique du premier ordre.','Compare avec la fusion d\\\\'un cristal (chapitre 5) : Tg n\\\\'a PAS de palier isotherme ni de saut brutal.')">Vérifier</button>
        <div class="feedback" id="matin7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">D'après les règles de Zachariasen, lequel de ces oxydes est un FORMATEUR de réseau typique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin7e2" value="wrong"> $Na_2O$</label>
          <label class="option"><input type="radio" name="matin7e2" value="wrong"> $CaO$</label>
          <label class="option"><input type="radio" name="matin7e2" value="right"> $SiO_2$</label>
          <label class="option"><input type="radio" name="matin7e2" value="wrong"> $K_2O$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin7e2','matin7fb2','Correct — SiO2 forme des tétraèdres reliés par les sommets en un réseau covalent continu : c\\\\'est le formateur de réseau par excellence. Na2O, CaO et K2O sont des modificateurs.','Les modificateurs (Na2O, CaO, K2O) rompent le réseau. Le formateur, lui, LE CONSTRUIT — c\\\\'est SiO2.')">Vérifier</button>
        <div class="feedback" id="matin7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'ajout d'un modificateur de réseau comme Na₂O à la silice a pour conséquence typique de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin7e3" value="wrong"> Augmenter la viscosité et la résistance chimique</label>
          <label class="option"><input type="radio" name="matin7e3" value="right"> Diminuer la viscosité (mise en forme facilitée) mais dégrader la résistance chimique</label>
          <label class="option"><input type="radio" name="matin7e3" value="wrong"> N'avoir aucun effet sur le réseau</label>
          <label class="option"><input type="radio" name="matin7e3" value="wrong"> Transformer le verre en cristal</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin7e3','matin7fb3','Correct — en rompant des ponts Si-O-Si, Na2O crée des oxygènes non pontants : le réseau est moins rigide (viscosité plus faible, mise en forme facilitée à plus basse T) mais plus vulnérable chimiquement.','Pense au mécanisme : rupture de ponts covalents ⇒ réseau moins rigide ⇒ effets opposés sur viscosité et résistance chimique.')">Vérifier</button>
        <div class="feedback" id="matin7fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('Verres et matériaux amorphes')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Verres et matériaux amorphes ». Demande-moi ce qu'est la transition vitreuse, la différence formateur/modificateur, ou un indice sur un exercice.",
  rules: [
    { test:/transition vitreuse|tg\b/i, replies:["La transition vitreuse Tg est un changement de PENTE (pas un saut brutal) sur la courbe volume-température : en dessous, le matériau est un solide rigide ; au-dessus, un liquide très visqueux. Ce n'est pas une transition de phase thermodynamique classique comme la fusion."] },
    { test:/zachariasen|formateur|modificateur|interm[ée]diaire/i, replies:["Règles de Zachariasen : formateur de réseau (SiO2, B2O3 : construit le réseau covalent continu), modificateur (Na2O, CaO : rompt des ponts oxygène, crée des oxygènes non pontants), intermédiaire (Al2O3, ZnO : renforce le réseau sans le former seul)."] },
    { test:/sodocalcique|borosilicate/i, replies:["Verre sodocalcique (SiO2+Na2O+CaO) : ~90% du verre courant, Tg abaissée par Na2O. Verre borosilicate (SiO2+B2O3) : faible dilatation thermique, résiste aux chocs thermiques (verrerie de labo)."] },
    { test:/verre m[ée]tallique|amorphe m[ée]tal/i, replies:["Les verres métalliques sont des alliages refroidis assez vite pour figer une structure désordonnée au lieu de cristalliser : haute résistance mécanique, bonne élasticité, pas de joints de grains."] },
    { test:/liquide.*[ée]coule|vitraux/i, replies:["Non, un verre à température ambiante ne s'écoule PAS mesurablement : c'est un mythe. L'épaisseur irrégulière des vitraux anciens vient des techniques de fabrication de l'époque, pas d'un écoulement du verre au fil des siècles."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare avec la fusion d'un cristal, qui a un palier isotherme.","Indice niveau 2 : Tg n'a PAS ce palier.","Indice niveau 3 : c'est un simple changement de pente."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel oxyde forme des tétraèdres reliés par les sommets ?","Indice niveau 2 : c'est SiO2.","Indice niveau 3 : les autres (Na2O, CaO, K2O) sont des modificateurs."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la rupture des ponts Si-O-Si.","Indice niveau 2 : réseau moins rigide ⇒ viscosité plus faible.","Indice niveau 3 : mais résistance chimique dégradée."] }
  ]
};

/* =========================== CHAPITRE 8 — Matériaux fonctionnels =========================== */
MATIN_CHAPTERS[matinKey('Matériaux fonctionnels : semi-conducteurs, magnétiques et supraconducteurs')] = {
  objectives: [
    "Expliquer la conductivité d'un semi-conducteur à partir de la théorie des bandes et du dopage n/p",
    "Distinguer diamagnétisme, paramagnétisme, ferromagnétisme, antiferromagnétisme et ferrimagnétisme",
    "Décrire les propriétés caractéristiques d'un supraconducteur (résistance nulle, effet Meissner) et situer les grandes familles connues",
    "Citer les principales méthodes de caractérisation structurale des matériaux inorganiques (DRX, microscopies électroniques)"
  ],
  prereqs: ["Verres et matériaux amorphes", "Défauts cristallins, non-stœchiométrie et solutions solides"],
  bodyHtml: `
    <p>Ce dernier chapitre relie la structure et les défauts étudiés tout au long du cours à des propriétés « fonctionnelles » de pointe : la conduction électronique contrôlée des semi-conducteurs, le magnétisme, et le phénomène spectaculaire de la supraconductivité — avant un rappel des principales méthodes utilisées pour caractériser un matériau inorganique.</p>

    <h3>1. Semi-conducteurs inorganiques</h3>
    <p>La théorie des bandes décrit les électrons d'un solide cristallin comme occupant des bandes d'énergie permises, séparées par des bandes interdites (<em>gaps</em>). Selon la largeur du gap $E_g$ entre la dernière bande occupée (<strong>bande de valence</strong>) et la première bande vide (<strong>bande de conduction</strong>) à 0 K, on distingue trois comportements :</p>
    <table class="mini-table">
      <tr><th>Type de solide</th><th>Gap $E_g$</th><th>Exemple</th></tr>
      <tr><td>Conducteur (métal)</td><td>Bandes chevauchantes, pas de gap</td><td>Cu, Al</td></tr>
      <tr><td>Semi-conducteur</td><td>Gap étroit (≈ 0,1 à 3 eV)</td><td>Si (1,12 eV), Ge (0,67 eV), GaAs (1,42 eV)</td></tr>
      <tr><td>Isolant</td><td>Gap large (&gt; 3-4 eV)</td><td>Diamant (5,5 eV), $Al_2O_3$</td></tr>
    </table>
    <p>Dans un semi-conducteur <strong>intrinsèque</strong> (pur), seule l'agitation thermique permet à quelques électrons de franchir le gap, laissant des « trous » dans la bande de valence : la conductivité, faible, augmente avec la température (à l'inverse d'un métal). Le <strong>dopage</strong> — introduction contrôlée d'impuretés en très faible quantité — permet d'augmenter fortement et sélectivement la conductivité :</p>
    <div class="key-point">
      <span class="eyebrow">Dopage de type n</span>
      Un atome donneur possédant un électron de valence de plus que la matrice (ex. phosphore, groupe 15, dans le silicium, groupe 14) apporte un électron facilement excitable vers la bande de conduction. Les porteurs de charge majoritaires sont des électrons (charge négative, d'où « n »).
    </div>
    <div class="key-point">
      <span class="eyebrow">Dopage de type p</span>
      Un atome accepteur possédant un électron de valence de moins que la matrice (ex. bore, groupe 13, dans le silicium) crée un déficit d'électron facilement comblé par un électron voisin, ce qui fait « migrer » un trou. Les porteurs de charge majoritaires sont des trous (charge positive, d'où « p »).
    </div>
    <p>La jonction d'un semi-conducteur dopé n et d'un semi-conducteur dopé p (jonction p-n) est la brique de base de l'intégralité de l'électronique moderne (diodes, transistors, cellules photovoltaïques).</p>

    <h3>2. Matériaux magnétiques</h3>
    <p>Le comportement magnétique d'un matériau dépend de l'alignement des moments magnétiques microscopiques associés au spin (et, dans une moindre mesure, au mouvement orbital) des électrons non appariés.</p>
    <table class="mini-table">
      <tr><th>Comportement</th><th>Origine microscopique</th><th>Exemple</th></tr>
      <tr><td>Diamagnétisme</td><td>Aucun électron non apparié ; réponse faible et opposée au champ appliqué</td><td>Cu, $Bi$, la plupart des composés « non magnétiques »</td></tr>
      <tr><td>Paramagnétisme</td><td>Moments non appariés désordonnés à $T$ ambiante ; alignement partiel sous champ, faible et réversible</td><td>Al, $O_2$</td></tr>
      <tr><td>Ferromagnétisme</td><td>Moments alignés parallèlement par couplage d'échange, même sans champ appliqué (aimantation spontanée)</td><td>Fe, Co, Ni</td></tr>
      <tr><td>Antiferromagnétisme</td><td>Moments voisins alignés antiparallèlement, s'annulant globalement</td><td>MnO, $Cr_2O_3$</td></tr>
      <tr><td>Ferrimagnétisme</td><td>Moments antiparallèles mais d'intensités différentes : aimantation spontanée résiduelle non nulle</td><td>Magnétite $Fe_3O_4$, ferrites</td></tr>
    </table>
    <p>Au-delà d'une <strong>température de Curie</strong> $T_C$ (ferro/ferrimagnétiques) ou de <strong>Néel</strong> $T_N$ (antiferromagnétiques), l'agitation thermique détruit l'ordre magnétique à longue distance et le matériau redevient simplement paramagnétique.</p>

    <h3>3. Supraconductivité</h3>
    <p>Découverte en 1911 par Heike Kamerlingh Onnes dans le mercure refroidi à l'hélium liquide, la <strong>supraconductivité</strong> est la disparition brutale et totale de la résistance électrique d'un matériau en dessous d'une <strong>température critique</strong> $T_c$, accompagnée de l'<strong>effet Meissner</strong> : l'expulsion complète du champ magnétique de l'intérieur du matériau (à l'origine de la lévitation d'un aimant au-dessus d'un supraconducteur).</p>
    <div class="key-point">
      <span class="eyebrow">Supraconducteurs conventionnels (théorie BCS)</span>
      La théorie BCS (Bardeen, Cooper, Schrieffer, 1957, Nobel de physique 1972) explique la supraconductivité conventionnelle par la formation de <strong>paires de Cooper</strong> : deux électrons s'apparient via une interaction médiée par les vibrations du réseau cristallin (phonons), formant un état collectif qui circule sans dissipation d'énergie. Cette théorie prédit des $T_c$ limitées, en pratique inférieures à ~30 K pour les matériaux conventionnels.
    </div>
    <div class="key-point">
      <span class="eyebrow">Supraconducteurs à haute $T_c$ : les cuprates</span>
      En 1986, Georg Bednorz et Karl Müller (IBM Zurich, Nobel de physique 1987) découvrent la supraconductivité à haute température critique dans un oxyde de cuivre lamellaire (cuprate), ouvrant une famille de matériaux non conventionnels, mal expliquée par la théorie BCS seule, atteignant aujourd'hui environ 130-140 K à pression ambiante (ex. $HgBa_2Ca_2Cu_3O_8$) — bien au-dessus de la température de l'azote liquide (77 K), ce qui simplifie considérablement leur refroidissement en application.
    </div>
    <div class="key-point">
      <span class="eyebrow">Recherche actuelle : les hydrures sous très haute pression</span>
      Depuis le milieu des années 2010, une autre voie explore des <strong>hydrures</strong> soumis à des pressions extrêmes (obtenues en cellules à enclumes de diamant, de l'ordre de 100 à 200 GPa) : le sulfure d'hydrogène $H_2S$ (2015, $T_c\\\\approx$ 203 K) puis l'hydrure de lanthane $LaH_{10}$ (2019, $T_c\\\\approx$ 250 K, soit environ −23°C) ont repoussé le record de température critique. Ces résultats confirment une prédiction théorique ancienne (1968) selon laquelle l'hydrogène métallisé sous pression devrait former un supraconducteur conventionnel à très haute $T_c$, mais la nécessité de pressions extrêmes reste, à ce jour, l'obstacle majeur à toute application pratique de ces matériaux à pression ambiante.
    </div>

    <h3>4. Méthodes de caractérisation des matériaux inorganiques</h3>
    <p>Ce cours a mentionné plusieurs techniques ; on en rappelle ici le rôle respectif :</p>
    <table class="mini-table">
      <tr><th>Technique</th><th>Information obtenue</th></tr>
      <tr><td>Diffraction des rayons X (DRX)</td><td>Système cristallin, paramètres de maille, phases présentes (loi de Bragg, chapitre 3)</td></tr>
      <tr><td>Microscopie électronique à balayage (MEB)</td><td>Morphologie et texture de surface, taille de grains, microstructure</td></tr>
      <tr><td>Microscopie électronique en transmission (MET)</td><td>Structure à l'échelle atomique, défauts (dislocations), analyse chimique locale</td></tr>
      <tr><td>Spectroscopies (IR, Raman, XPS...)</td><td>Liaisons chimiques présentes, degrés d'oxydation, composition de surface</td></tr>
      <tr><td>Analyses thermiques (ATG, ATD/DSC)</td><td>Transitions de phase, $T_g$, décomposition thermique, cinétique de frittage</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le silicium intrinsèque, dopé par du phosphore (groupe 15), devient-il un semi-conducteur de type n ou de type p ? Justifier.</p>
      <p><strong>Solution :</strong> le silicium appartient au groupe 14 (4 électrons de valence). Le phosphore, groupe 15, apporte 5 électrons de valence : quatre servent à former les liaisons covalentes avec les atomes de silicium voisins, et le cinquième électron est faiblement lié, facilement excité vers la bande de conduction. Le porteur de charge majoritaire ainsi introduit est donc un électron, porteur négatif.</p>
      <p class="example-answer">Réponse : dopage de type n (le phosphore est un donneur d'électrons).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Conducteur (pas de gap), semi-conducteur (gap étroit, 0,1-3 eV), isolant (gap large) — classement par la théorie des bandes</li>
        <li>Dopage n (donneur, porteurs = électrons) vs dopage p (accepteur, porteurs = trous) ; la jonction p-n est la base de l'électronique</li>
        <li>Cinq comportements magnétiques : dia-, para-, ferro-, antiferro-, ferrimagnétisme, selon l'alignement des moments de spin</li>
        <li>Supraconductivité : résistance nulle + effet Meissner sous $T_c$ ; BCS (paires de Cooper) pour les conventionnels, cuprates non conventionnels jusqu'à ~140 K, hydrures sous très haute pression jusqu'à ~250 K (recherche active)</li>
        <li>DRX (structure), MEB/MET (morphologie/défauts), spectroscopies (liaisons), analyses thermiques (transitions) : la boîte à outils de caractérisation</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la conductivité d'un semi-conducteur DIMINUE avec la température comme un métal — c'est l'inverse : elle augmente, car l'agitation thermique excite plus d'électrons vers la bande de conduction</li>
        <li>Confondre antiferromagnétisme (moments opposés qui s'annulent totalement) et ferrimagnétisme (moments opposés d'intensités différentes, aimantation résiduelle non nulle)</li>
        <li>Penser que les supraconducteurs à hydrures fonctionnent à pression ambiante — à ce jour, ils nécessitent des pressions extrêmes (100-200 GPa), obstacle majeur à toute application pratique</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dopé au bore (groupe 13), le silicium (groupe 14) devient un semi-conducteur de type :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin8e1" value="wrong"> n, car le bore apporte des électrons supplémentaires</label>
          <label class="option"><input type="radio" name="matin8e1" value="right"> p, car le bore crée un déficit d'électron (un trou)</label>
          <label class="option"><input type="radio" name="matin8e1" value="wrong"> Intrinsèque, le dopage n'a aucun effet</label>
          <label class="option"><input type="radio" name="matin8e1" value="wrong"> Isolant, car le gap devient trop large</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin8e1','matin8fb1','Correct — le bore (3 électrons de valence) ne peut former que 3 liaisons covalentes avec le silicium voisin, laissant un déficit d\\\\'électron (trou) facilement comblé : porteurs majoritaires positifs, type p.','Le bore a UN électron de valence de MOINS que le silicium : cela crée un déficit, pas un excès.')">Vérifier</button>
        <div class="feedback" id="matin8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La magnétite Fe₃O₄, où les moments magnétiques sont antiparallèles mais d'intensités différentes, est un exemple de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin8e2" value="wrong"> Ferromagnétisme</label>
          <label class="option"><input type="radio" name="matin8e2" value="wrong"> Antiferromagnétisme</label>
          <label class="option"><input type="radio" name="matin8e2" value="right"> Ferrimagnétisme</label>
          <label class="option"><input type="radio" name="matin8e2" value="wrong"> Diamagnétisme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin8e2','matin8fb2','Correct — des moments antiparallèles d\\\\'intensités DIFFÉRENTES ne s\\\\'annulent pas complètement : il reste une aimantation spontanée résiduelle, signature du ferrimagnétisme.','Antiferromagnétisme = moments opposés de MÊME intensité (annulation totale). Ici les intensités sont différentes : c\\\\'est le ferrimagnétisme.')">Vérifier</button>
        <div class="feedback" id="matin8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Quelle technique de caractérisation permet de déterminer directement les paramètres de maille et le système cristallin d'un matériau inorganique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="matin8e3" value="wrong"> La spectroscopie infrarouge</label>
          <label class="option"><input type="radio" name="matin8e3" value="right"> La diffraction des rayons X (DRX)</label>
          <label class="option"><input type="radio" name="matin8e3" value="wrong"> L'analyse thermogravimétrique (ATG)</label>
          <label class="option"><input type="radio" name="matin8e3" value="wrong"> La microscopie optique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('matin8e3','matin8fb3','Correct — la DRX exploite la loi de Bragg (chapitre 3) pour remonter aux distances interréticulaires, donc aux paramètres de maille et au système cristallin.','Repense au chapitre 3 : quelle technique applique directement nλ=2d·sinθ ?')">Vérifier</button>
        <div class="feedback" id="matin8fb3"></div>
      </div>
    </div>
  `
};
MATIN_NOVA_KB[matinKey('Matériaux fonctionnels : semi-conducteurs, magnétiques et supraconducteurs')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Matériaux fonctionnels : semi-conducteurs, magnétiques et supraconducteurs », le dernier chapitre du cours. Demande-moi la différence dopage n/p, les types de magnétisme, ou un indice sur un exercice.",
  rules: [
    { test:/dopage|type n|type p|semi.conducteur/i, replies:["Dopage n : atome donneur (1 électron de valence de plus que la matrice), porteurs majoritaires = électrons. Dopage p : atome accepteur (1 électron de moins), porteurs majoritaires = trous. La jonction p-n est la base de l'électronique moderne."] },
    { test:/bande.*[ée]nergie|gap|conducteur.*isolant/i, replies:["Théorie des bandes : conducteur = pas de gap, semi-conducteur = gap étroit (0,1-3 eV, ex. Si=1,12 eV), isolant = gap large (>3-4 eV, ex. diamant=5,5 eV)."] },
    { test:/ferromagn[ée]tisme|antiferro|ferri|diamagn[ée]tisme|paramagn[ée]tisme/i, replies:["5 comportements : diamagnétisme (pas de spin non apparié), paramagnétisme (moments désordonnés), ferromagnétisme (moments alignés parallèles, aimantation spontanée), antiferromagnétisme (moments opposés égaux, annulation totale), ferrimagnétisme (moments opposés inégaux, aimantation résiduelle)."] },
    { test:/supraconduct|meissner|bcs|cooper/i, replies:["Supraconductivité : résistance nulle + effet Meissner sous Tc. Théorie BCS (paires de Cooper via phonons) pour les conventionnels. Cuprates (1986, Bednorz-Müller) : non conventionnels, jusqu'à ~140K. Hydrures sous très haute pression : jusqu'à ~250K (recherche active, mais pression extrême nécessaire)."] },
    { test:/drx|diffraction|caract[ée]risation|meb|met/i, replies:["DRX : structure/paramètres de maille (loi de Bragg). MEB : morphologie de surface. MET : structure atomique et défauts. Spectroscopies (IR, Raman, XPS) : liaisons chimiques. Analyses thermiques (ATG, DSC) : transitions de phase."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le bore a-t-il plus ou moins d'électrons de valence que le silicium ?","Indice niveau 2 : moins (3 contre 4) — donc un déficit.","Indice niveau 3 : dopage de type p."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : les moments sont opposés mais d'intensités différentes.","Indice niveau 2 : ils ne s'annulent donc pas complètement.","Indice niveau 3 : c'est le ferrimagnétisme."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : quelle technique applique la loi de Bragg ?","Indice niveau 2 : celle qui mesure les angles de diffraction.","Indice niveau 3 : la DRX."] }
  ]
};

/* fusionne le module Chimie des matériaux inorganiques dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MATIN_CHAPTERS);
Object.assign(NOVA_KB, MATIN_NOVA_KB);