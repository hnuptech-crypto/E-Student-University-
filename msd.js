/* =====================================================================
   CHUNK « msd » — registre MSD_CHAPTERS / MSD_NOVA_KB
   Matière(s) : Physique|Mécanique des solides déformables
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MSD_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — MÉCANIQUE DES SOLIDES DÉFORMABLES (L3 Physique Fondamentale)
   8 chapitres : du milieu continu déformable au tenseur des déformations, tenseur des
   contraintes et équations d'équilibre, loi de Hooke généralisée, élasticité isotrope
   (coefficients de Lamé, module d'Young, coefficient de Poisson), théorie des poutres
   (flexion d'Euler-Bernoulli, torsion), énergie de déformation élastique et critères de
   rupture — conforme aux maquettes LMD de L3 Physique Fondamentale. Ce cours prolonge
   la mécanique des fluides (même logique de milieu continu, cette fois pour un solide)
   et s'appuie sur les tenseurs et opérateurs différentiels du cours de méthodes
   mathématiques pour la physique.
   Rédigé sur le même modèle que les autres modules (objectives/prereqs/bodyHtml/
   extraHtml + registre NOVA_KB). Références de fond : S. Forest, M. Amestoy, S. Cantournet,
   Mécanique des milieux continus (Mines ParisTech) ; J. Salençon, Mécanique des milieux
   continus (Éd. de l'École Polytechnique) ; MOOC « Mécanique des solides déformables »
   (FUN-MOOC, Arts et Métiers).
   ===================================================================================== */
const MSD_MATIERE = 'Mécanique des solides déformables';
function msdKey(chapterTitle){ return `Physique|${MSD_MATIERE}|${chapterTitle}`; }
const MSD_CHAPTERS = {};
const MSD_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
MSD_CHAPTERS[msdKey("Milieu continu déformable : configuration et champ de déplacement")] = {
  objectives: [
    "Poser l'hypothèse de milieu continu pour un solide déformable",
    "Distinguer configuration de référence et configuration déformée",
    "Définir le champ de déplacement et le gradient de la transformation",
    "Justifier l'hypothèse des petites perturbations (HPP) utilisée dans tout le cours"
  ],
  prereqs: ["Statique des fluides : pression et théorème fondamental de l'hydrostatique (Mécanique des fluides)", "Opérateurs différentiels (gradient, divergence) — Méthodes mathématiques pour la physique"],
  bodyHtml: `
    <p>La mécanique des fluides a montré comment décrire un milieu continu qui s'écoule. La <strong>mécanique des solides déformables</strong> applique la même hypothèse de milieu continu à un solide — mais avec une différence essentielle : un solide, contrairement à un fluide, garde en mémoire sa forme de référence, et l'on s'intéresse aux <strong>déformations</strong> qu'il subit par rapport à cette forme, plutôt qu'à un champ de vitesse permanent.</p>

    <h3>1. Configuration de référence et configuration déformée</h3>
    <p>On appelle <strong>configuration de référence</strong> $\\Omega_0$ la forme du solide non chargé (souvent choisie comme l'instant initial $t=0$), et <strong>configuration déformée</strong> $\\Omega_t$ sa forme à l'instant $t$, sous l'effet des actions extérieures (forces, variations de température...). Chaque point matériel du solide est repéré par sa position $\\vec X$ dans $\\Omega_0$ ; sa position dans $\\Omega_t$ est notée $\\vec x = \\vec\\varphi(\\vec X,t)$, où $\\vec\\varphi$ est l'application de <strong>transformation</strong> — une fonction bijective et régulière (deux points distincts ne peuvent se confondre, le solide ne s'interpénètre pas).</p>

    <h3>2. Champ de déplacement</h3>
    <p>On définit le <strong>champ de déplacement</strong> comme l'écart entre la position déformée et la position de référence d'un même point matériel :</p>
    <div class="formula-box">$$\\vec u(\\vec X,t) = \\vec\\varphi(\\vec X,t) - \\vec X = \\vec x - \\vec X$$</div>
    <p>C'est le champ de déplacement — et non le champ de vitesse comme en mécanique des fluides — qui est la variable centrale de ce cours : c'est lui qui décrit directement de combien et dans quelle direction chaque point du solide s'est déplacé.</p>

    <h3>3. Le gradient de la transformation</h3>
    <p>Pour caractériser localement comment le solide se déforme (pas seulement translate ou tourne), on introduit le <strong>gradient de la transformation</strong>, un tenseur d'ordre 2 :</p>
    <div class="formula-box">$$\\mathbf F = \\frac{\\partial \\vec\\varphi}{\\partial \\vec X} = \\mathbf I + \\vec\\nabla_X \\vec u$$</div>
    <p>où $\\mathbf I$ est le tenseur identité et $\\vec\\nabla_X\\vec u$ le gradient du déplacement par rapport aux coordonnées de référence, de composantes $(\\vec\\nabla_X\\vec u)_{ij} = \\partial u_i/\\partial X_j$. Ce tenseur $\\mathbf F$ transporte un petit segment matériel infinitésimal $d\\vec X$ de la configuration de référence vers son image $d\\vec x = \\mathbf F\\,d\\vec X$ dans la configuration déformée : il contient <strong>toute</strong> l'information locale sur la déformation (étirement, rotation, cisaillement) au voisinage du point considéré.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      $\\mathbf F=\\mathbf I$ correspondrait à l'absence de toute transformation locale (translation pure). Ce n'est pas $\\mathbf F$ lui-même, mais des grandeurs construites à partir de $\\mathbf F$ (le tenseur des déformations, chapitre 2), qui isoleront la part de <strong>déformation</strong> proprement dite, en éliminant les rotations de corps rigide qui ne déforment pas le solide.
    </div>

    <h3>4. L'hypothèse des petites perturbations (HPP)</h3>
    <p>Dans l'immense majorité des situations d'ingénierie et de physique des matériaux (tant que le solide ne subit pas de grandes déformations comme un élastomère très étiré), les déplacements $\\vec u$ et leurs gradients restent <strong>petits</strong> devant les dimensions caractéristiques du solide. Cette <strong>hypothèse des petites perturbations</strong> (HPP) permet deux simplifications essentielles, utilisées dans tout le reste de ce cours :</p>
    <ul>
      <li><strong>Linéarisation</strong> : on peut négliger les termes quadratiques en $\\vec\\nabla_X\\vec u$ dans les expressions exactes (comme on l'a fait pour les petites oscillations en mécanique analytique)</li>
      <li><strong>Confusion configuration de référence / déformée</strong> : on peut écrire les équations d'équilibre directement sur la configuration de référence $\\Omega_0$ (connue), plutôt que sur la configuration déformée $\\Omega_t$ (inconnue a priori) — un allègement de calcul considérable</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une barre de longueur $L_0=1\\,\\text{m}$ est étirée uniformément jusqu'à une longueur $L=1{,}002\\,\\text{m}$. Le déplacement d'une extrémité, $u(L_0)=0{,}002\\,\\text{m}$, est-il compatible avec l'hypothèse HPP ?</p>
      <p><strong>Solution :</strong> le gradient de déplacement caractéristique est $\\dfrac{\\partial u}{\\partial X} \\approx \\dfrac{u(L_0)}{L_0} = \\dfrac{0{,}002}{1} = 2\\times 10^{-3}$.</p>
      <p class="example-answer">Ce gradient est très petit devant 1 : l'hypothèse HPP est excellente ici — ce qui est le cas typique pour un métal ou un béton sollicité dans son domaine élastique usuel (déformations de l'ordre de $10^{-3}$ à $10^{-2}$).</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <rect x="15" y="30" width="40" height="30" fill="none" stroke="#4C7CFF" stroke-width="1.4"/>
          <text x="20" y="25" font-family="IBM Plex Mono" font-size="7" fill="#4C7CFF">Ω0 (référence)</text>
          <path d="M60,45 L95,45" stroke="#5A6472" stroke-width="1" stroke-dasharray="2,2" marker-end="url(#arr3)"/>
          <path d="M85,35 Q100,25 115,35 Q130,45 115,55 Q100,65 85,55 Q80,45 85,35" fill="none" stroke="#2DD4C4" stroke-width="1.4"/>
          <text x="82" y="72" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">Ωt (déformée)</text>
        </svg>
        <span>transformation φ : chaque point X de la référence devient x = φ(X,t)</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Configuration de référence $\\Omega_0$ (solide non chargé) et configuration déformée $\\Omega_t$, reliées par $\\vec x = \\vec\\varphi(\\vec X,t)$</li>
        <li>Champ de déplacement $\\vec u = \\vec x - \\vec X$ : variable centrale de ce cours (contrairement au champ de vitesse en mécanique des fluides)</li>
        <li>Gradient de la transformation $\\mathbf F = \\mathbf I + \\vec\\nabla_X\\vec u$ : contient toute l'information locale sur la déformation</li>
        <li>Hypothèse des petites perturbations (HPP) : linéarisation et confusion $\\Omega_0/\\Omega_t$, valable tant que $\\vec\\nabla_X\\vec u \\ll 1$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre déplacement $\\vec u$ (l'écart entre deux positions du même point matériel) et vitesse (qui n'est pas la variable centrale de ce cours, contrairement à la mécanique des fluides)</li>
        <li>Croire que $\\mathbf F$ mesure directement la déformation : il contient aussi les rotations de corps rigide, qu'il faudra en extraire (chapitre 2)</li>
        <li>Appliquer l'hypothèse HPP sans vérifier que les gradients de déplacement sont effectivement petits (elle est mise en défaut pour un élastomère très étiré, par exemple)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le champ de déplacement $\\vec u(\\vec X,t)$ est défini par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd1e1" value="wrong"> $\\vec u = \\vec X$</label>
          <label class="option"><input type="radio" name="msd1e1" value="right"> $\\vec u = \\vec x - \\vec X$</label>
          <label class="option"><input type="radio" name="msd1e1" value="wrong"> $\\vec u = \\vec x + \\vec X$</label>
          <label class="option"><input type="radio" name="msd1e1" value="wrong"> $\\vec u = \\mathbf F$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd1e1','msd1fb1','Correct — c\\'est l\\'écart entre la position déformée x et la position de référence X d\\'un même point matériel.','Relis la définition du champ de déplacement dans le cours.')">Vérifier</button>
        <div class="feedback" id="msd1fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le gradient de la transformation $\\mathbf F$ s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd1e2" value="wrong"> $\\mathbf F = \\vec\\nabla_X\\vec u$</label>
          <label class="option"><input type="radio" name="msd1e2" value="right"> $\\mathbf F = \\mathbf I + \\vec\\nabla_X\\vec u$</label>
          <label class="option"><input type="radio" name="msd1e2" value="wrong"> $\\mathbf F = \\mathbf I - \\vec\\nabla_X\\vec u$</label>
          <label class="option"><input type="radio" name="msd1e2" value="wrong"> $\\mathbf F = \\vec u$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd1e2','msd1fb2','Correct — F=I+∇Xu : l\\'identité (absence de transformation) plus le gradient du déplacement.','Relis la formule encadrée du cours pour F.')">Vérifier</button>
        <div class="feedback" id="msd1fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'hypothèse des petites perturbations (HPP) permet notamment de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd1e3" value="wrong"> ignorer complètement les déformations</label>
          <label class="option"><input type="radio" name="msd1e3" value="right"> écrire les équations sur la configuration de référence plutôt que sur la configuration déformée inconnue</label>
          <label class="option"><input type="radio" name="msd1e3" value="wrong"> supposer que le solide est un fluide</label>
          <label class="option"><input type="radio" name="msd1e3" value="wrong"> annuler le champ de déplacement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd1e3','msd1fb3','Correct — c\\'est l\\'un des deux allègements essentiels de l\\'HPP : on travaille sur Ω0, connue, plutôt que sur Ωt, a priori inconnue.','Relis la section du cours sur les deux simplifications permises par l\\'HPP.')">Vérifier</button>
        <div class="feedback" id="msd1fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Milieu continu déformable : configuration et champ de déplacement")] = {
  intro: "Salut, moi c'est Nova ! On démarre la mécanique des solides déformables avec les notions de configuration et de champ de déplacement. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/champ de d[ée]placement/i, replies:[
      "Le champ de déplacement u=x−X est l'écart entre la position déformée x et la position de référence X d'un même point matériel — c'est la variable centrale de ce cours."
    ]},
    { test:/gradient de la transformation|\bF\b/i, replies:[
      "Le gradient de la transformation F=I+∇Xu transporte un petit segment matériel dX vers son image dx=F·dX : il contient toute l'information locale sur la déformation (y compris les rotations)."
    ]},
    { test:/hpp|petites perturbations/i, replies:[
      "L'hypothèse des petites perturbations (HPP) permet deux simplifications : linéariser les équations (négliger les termes quadratiques), et confondre configuration de référence et déformée dans les calculs."
    ]},
    { test:/configuration/i, replies:[
      "La configuration de référence Ω0 est la forme du solide non chargé ; la configuration déformée Ωt est sa forme sous charge, reliée par x=φ(X,t)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition du champ de déplacement.",
      "Indice niveau 2 : c'est une différence de deux positions.",
      "Indice niveau 3 : u=x−X."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule encadrée du cours pour F.",
      "Indice niveau 2 : c'est l'identité plus quelque chose.",
      "Indice niveau 3 : F=I+∇Xu."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis les deux simplifications permises par l'HPP.",
      "Indice niveau 2 : ça concerne le choix de la configuration sur laquelle on travaille.",
      "Indice niveau 3 : on peut écrire les équations sur Ω0 (connue) plutôt que Ωt (inconnue)."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MSD_CHAPTERS[msdKey("Le tenseur des déformations : dilatations et distorsions")] = {
  objectives: [
    "Construire le tenseur des déformations linéarisé à partir du gradient de déplacement",
    "Interpréter physiquement les termes diagonaux (dilatations) et non diagonaux (distorsions)",
    "Calculer les directions et valeurs principales de déformation",
    "Définir la dilatation volumique et l'exprimer en fonction de la trace du tenseur"
  ],
  prereqs: ["Milieu continu déformable : configuration et champ de déplacement", "Réduction d'endomorphismes et de matrices (diagonalisation) — Méthodes mathématiques pour la physique"],
  bodyHtml: `
    <p>Le gradient de la transformation $\\mathbf F$ (chapitre 1) mélange déformation <em>et</em> rotation de corps rigide : une simple rotation, qui ne déforme en rien le solide, donne pourtant $\\mathbf F \\neq \\mathbf I$. Ce chapitre construit une grandeur qui isole la <strong>déformation pure</strong>, indépendamment de toute rotation — le <strong>tenseur des déformations</strong>, l'objet central de toute la mécanique des solides déformables.</p>

    <h3>1. Construction du tenseur des déformations linéarisé</h3>
    <p>Dans le cadre de l'hypothèse HPP (chapitre 1), on définit le <strong>tenseur des déformations linéarisé</strong> $\\boldsymbol\\varepsilon$ comme la partie <strong>symétrique</strong> du gradient de déplacement :</p>
    <div class="formula-box">$$\\boldsymbol\\varepsilon = \\frac{1}{2}\\left(\\vec\\nabla \\vec u + (\\vec\\nabla \\vec u)^T\\right), \\qquad \\varepsilon_{ij} = \\frac{1}{2}\\left(\\frac{\\partial u_i}{\\partial x_j} + \\frac{\\partial u_j}{\\partial x_i}\\right)$$</div>
    <p>La partie <strong>antisymétrique</strong> restante, $\\boldsymbol\\omega = \\frac12(\\vec\\nabla\\vec u - (\\vec\\nabla\\vec u)^T)$, est le <strong>tenseur des rotations</strong> (infinitésimales) : elle décrit une rotation locale de corps rigide, qui ne modifie ni les longueurs ni les angles au voisinage du point — donc <em>aucune</em> déformation réelle. En ne gardant que la partie symétrique $\\boldsymbol\\varepsilon$, on élimine précisément cette contribution non physique.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi la symétrisation élimine la rotation</span>
      Pour une rotation pure infinitésimale, $\\vec\\nabla\\vec u$ est <strong>antisymétrique</strong> (c'est la définition même d'une rotation infinitésimale en HPP) : sa partie symétrique est alors identiquement nulle, $\\boldsymbol\\varepsilon = \\mathbf 0$. Réciproquement, toute déformation réelle (étirement, cisaillement) produit un $\\vec\\nabla\\vec u$ dont la partie symétrique est non nulle.
    </div>

    <h3>2. Interprétation physique des composantes</h3>
    <table class="mini-table">
      <tr><th>Composante</th><th>Nom</th><th>Signification physique</th></tr>
      <tr><td>$\\varepsilon_{ii}$ (diagonale, pas de somme)</td><td>dilatation linéique</td><td>allongement relatif d'une fibre matérielle initialement selon $\\vec e_i$</td></tr>
      <tr><td>$\\varepsilon_{ij}$, $i\\neq j$</td><td>distorsion angulaire (demi-glissement)</td><td>la moitié de la diminution de l'angle droit entre deux fibres initialement selon $\\vec e_i$ et $\\vec e_j$</td></tr>
    </table>
    <p>Par exemple, $\\varepsilon_{xx} = \\partial u_x/\\partial x$ est directement l'allongement relatif $\\Delta L/L$ d'un petit segment orienté selon $x$ — exactement la grandeur calculée dans l'exemple du chapitre 1 pour la barre étirée.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — cisaillement simple</span>
      <p><strong>Énoncé :</strong> un bloc subit un déplacement $u_x = \\gamma y$, $u_y=u_z=0$ ($\\gamma$ petit, constant) — un cisaillement simple. Calculer $\\boldsymbol\\varepsilon$.</p>
      <p><strong>Solution :</strong> $\\dfrac{\\partial u_x}{\\partial y} = \\gamma$, toutes les autres dérivées sont nulles. Donc $\\varepsilon_{xy} = \\varepsilon_{yx} = \\dfrac12\\left(\\dfrac{\\partial u_x}{\\partial y}+\\dfrac{\\partial u_y}{\\partial x}\\right) = \\dfrac{\\gamma}{2}$, et $\\varepsilon_{xx}=\\varepsilon_{yy}=\\varepsilon_{zz}=0$.</p>
      <p class="example-answer">$\\boldsymbol\\varepsilon = \\begin{pmatrix}0 & \\gamma/2 & 0\\\\ \\gamma/2 & 0 & 0\\\\ 0&0&0\\end{pmatrix}$ : aucune dilatation (les termes diagonaux sont nuls), uniquement une distorsion — cohérent avec l'image physique d'un cisaillement, qui change les angles sans changer les longueurs des côtés du bloc (au premier ordre).</p>
    </div>

    <h3>3. Directions et déformations principales</h3>
    <p>$\\boldsymbol\\varepsilon$ étant un tenseur symétrique réel, il est <strong>diagonalisable</strong> dans une base orthonormée (théorème spectral, cours de méthodes mathématiques). Il existe donc, en tout point, trois <strong>directions principales</strong> orthogonales $\\vec e_1,\\vec e_2,\\vec e_3$, telles que dans cette base, $\\boldsymbol\\varepsilon$ soit diagonale :</p>
    <div class="formula-box">$$\\boldsymbol\\varepsilon = \\begin{pmatrix}\\varepsilon_1 & 0 & 0\\\\ 0 & \\varepsilon_2 & 0\\\\ 0 & 0 & \\varepsilon_3\\end{pmatrix} \\quad \\text{(base principale)}$$</div>
    <p>Les $\\varepsilon_i$ sont les <strong>déformations principales</strong> (valeurs propres de $\\boldsymbol\\varepsilon$) : dans cette base précise, la déformation locale est une simple dilatation le long de chaque axe, <strong>sans aucune distorsion</strong> — les directions principales sont celles où le cisaillement local s'annule.</p>

    <h3>4. Dilatation volumique</h3>
    <p>La variation relative de volume d'un petit élément matériel, au premier ordre en HPP, s'exprime simplement en fonction de la <strong>trace</strong> du tenseur des déformations :</p>
    <div class="formula-box">$$\\frac{dV - dV_0}{dV_0} = \\text{tr}(\\boldsymbol\\varepsilon) = \\varepsilon_{xx}+\\varepsilon_{yy}+\\varepsilon_{zz} = \\vec\\nabla\\cdot\\vec u$$</div>
    <p>On retrouve ici un résultat déjà rencontré en mécanique des fluides (chapitre 3, interprétation de $\\vec\\nabla\\cdot\\vec v$) : la trace du tenseur des déformations (ou la divergence du déplacement) mesure le taux d'expansion volumique local, que le milieu soit fluide (en vitesse) ou solide (en déplacement).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Tenseur des déformations $\\boldsymbol\\varepsilon = \\frac12(\\vec\\nabla\\vec u + (\\vec\\nabla\\vec u)^T)$ : partie symétrique du gradient de déplacement, isolant la déformation pure de toute rotation</li>
        <li>Termes diagonaux $\\varepsilon_{ii}$ = dilatations linéiques ; termes non diagonaux $\\varepsilon_{ij}$ = demi-distorsions angulaires</li>
        <li>$\\boldsymbol\\varepsilon$ est diagonalisable : il existe des directions principales sans aucune distorsion, avec les déformations principales $\\varepsilon_1,\\varepsilon_2,\\varepsilon_3$</li>
        <li>Dilatation volumique : $dV/dV_0 - 1 = \\text{tr}(\\boldsymbol\\varepsilon) = \\vec\\nabla\\cdot\\vec u$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le facteur $\\frac12$ dans la définition de $\\varepsilon_{ij}$ ($i\\neq j$) : c'est un <em>demi</em>-glissement, pas le glissement complet (qui vaut $2\\varepsilon_{ij}$, parfois noté $\\gamma_{ij}$)</li>
        <li>Confondre le gradient de déplacement complet $\\vec\\nabla\\vec u$ (qui inclut la rotation) et sa partie symétrique $\\boldsymbol\\varepsilon$ (qui l'exclut)</li>
        <li>Croire qu'une rotation de corps rigide produit une déformation non nulle : par construction, $\\boldsymbol\\varepsilon=\\mathbf 0$ pour une rotation pure infinitésimale</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le tenseur des déformations $\\boldsymbol\\varepsilon$ est défini comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd2e1" value="wrong"> la partie antisymétrique de $\\vec\\nabla\\vec u$</label>
          <label class="option"><input type="radio" name="msd2e1" value="right"> la partie symétrique de $\\vec\\nabla\\vec u$</label>
          <label class="option"><input type="radio" name="msd2e1" value="wrong"> $\\vec\\nabla\\vec u$ tout entier</label>
          <label class="option"><input type="radio" name="msd2e1" value="wrong"> le déterminant de $\\mathbf F$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd2e1','msd2fb1','Correct — c\\'est la partie symétrique qui isole la déformation pure, en excluant les rotations de corps rigide (partie antisymétrique).','Relis la formule encadrée du cours pour ε.')">Vérifier</button>
        <div class="feedback" id="msd2fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour le cisaillement simple $u_x=\\gamma y$ (autres composantes nulles), le tenseur des déformations a :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd2e2" value="wrong"> des termes diagonaux non nuls uniquement</label>
          <label class="option"><input type="radio" name="msd2e2" value="right"> seulement $\\varepsilon_{xy}=\\varepsilon_{yx}=\\gamma/2$ non nuls</label>
          <label class="option"><input type="radio" name="msd2e2" value="wrong"> tous les termes nuls</label>
          <label class="option"><input type="radio" name="msd2e2" value="wrong"> tous les termes égaux à $\\gamma$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd2e2','msd2fb2','Correct — c\\'est exactement le résultat de l\\'exemple corrigé du cours : une pure distorsion, sans dilatation.','Reprends le calcul de l\\'exemple corrigé du cours sur le cisaillement simple.')">Vérifier</button>
        <div class="feedback" id="msd2fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La dilatation volumique relative $dV/dV_0-1$ est égale à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd2e3" value="wrong"> $\\det(\\boldsymbol\\varepsilon)$</label>
          <label class="option"><input type="radio" name="msd2e3" value="right"> $\\text{tr}(\\boldsymbol\\varepsilon)$</label>
          <label class="option"><input type="radio" name="msd2e3" value="wrong"> $\\varepsilon_{xy}$</label>
          <label class="option"><input type="radio" name="msd2e3" value="wrong"> toujours nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd2e3','msd2fb3','Correct — la trace de ε, égale à ∇·u, donne exactement la variation relative de volume au premier ordre.','Relis la formule encadrée du cours reliant dilatation volumique et trace de ε.')">Vérifier</button>
        <div class="feedback" id="msd2fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Le tenseur des déformations : dilatations et distorsions")] = {
  intro: "Salut, c'est Nova ! On construit le tenseur des déformations, qui isole la déformation pure de toute rotation. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/tenseur des d[ée]formations|\\bε\\b/i, replies:[
      "ε = ½(∇u+(∇u)ᵀ) est la partie symétrique du gradient de déplacement — elle isole la déformation pure, en excluant les rotations de corps rigide (partie antisymétrique)."
    ]},
    { test:/dilatation|distorsion/i, replies:[
      "Les termes diagonaux εii sont des dilatations linéiques (allongement relatif) ; les termes non diagonaux εij sont des demi-distorsions angulaires (la moitié du glissement)."
    ]},
    { test:/direction principale|d[ée]formation principale/i, replies:[
      "ε étant symétrique, il est diagonalisable : dans la base principale, la déformation locale est une pure dilatation selon chaque axe, sans aucune distorsion."
    ]},
    { test:/volume|trace/i, replies:[
      "La dilatation volumique relative dV/dV0−1 est égale à tr(ε)=∇·u — exactement l'analogue solide de la divergence de vitesse en mécanique des fluides."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour ε.",
      "Indice niveau 2 : c'est une des deux parties (symétrique ou antisymétrique) de ∇u.",
      "Indice niveau 3 : c'est la partie symétrique."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : reprends le calcul de l'exemple corrigé du cours sur le cisaillement simple.",
      "Indice niveau 2 : calcule ∂ux/∂y puis εxy.",
      "Indice niveau 3 : seuls εxy=εyx=γ/2 sont non nuls."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la formule reliant dilatation volumique et ε.",
      "Indice niveau 2 : c'est liée à une opération matricielle simple sur ε.",
      "Indice niveau 3 : c'est la trace, tr(ε)."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MSD_CHAPTERS[msdKey("Le tenseur des contraintes et les équations d'équilibre")] = {
  objectives: [
    "Introduire le vecteur contrainte et le tenseur des contraintes de Cauchy",
    "Établir la symétrie du tenseur des contraintes à partir de l'équilibre des moments",
    "Écrire les équations d'équilibre local d'un solide déformable",
    "Identifier les contraintes principales et interpréter la contrainte de cisaillement maximale"
  ],
  prereqs: ["Le tenseur des déformations : dilatations et distorsions"],
  bodyHtml: `
    <p>Le tenseur des déformations (chapitre 2) décrit la <strong>cinématique</strong> du solide déformé, indépendamment de ce qui la cause. Ce chapitre introduit son pendant <strong>statique</strong> : le <strong>tenseur des contraintes</strong>, qui généralise à trois dimensions et à un milieu continu la notion de force intérieure — jouant, en mécanique des solides déformables, un rôle analogue à celui de la pression en mécanique des fluides, mais avec des composantes tangentielles en plus.</p>

    <h3>1. Le vecteur contrainte</h3>
    <p>Considérons une surface fictive de normale $\\vec n$ traversant le solide en un point $M$, séparant le solide en deux parties. La partie « derrière » $\\vec n$ exerce sur la partie « devant » une force surfacique — le <strong>vecteur contrainte</strong> $\\vec T(\\vec n)$, défini comme la limite de la force par unité de surface quand celle-ci tend vers zéro autour de $M$. Contrairement à la pression d'un fluide parfait (chapitre 1 de mécanique des fluides, toujours normale à la surface), le vecteur contrainte d'un solide a en général une composante <strong>normale</strong> et une composante <strong>tangentielle</strong> (de cisaillement).</p>

    <h3>2. Le tenseur des contraintes de Cauchy</h3>
    <p>Un résultat fondamental, dû à Cauchy, montre que $\\vec T(\\vec n)$ dépend <strong>linéairement</strong> de $\\vec n$ : il existe un tenseur d'ordre 2, le <strong>tenseur des contraintes</strong> $\\boldsymbol\\sigma$, tel que :</p>
    <div class="formula-box">$$\\vec T(\\vec n) = \\boldsymbol\\sigma \\cdot \\vec n, \\qquad T_i = \\sigma_{ij}\\,n_j$$</div>
    <p>La composante $\\sigma_{ij}$ représente la composante selon $\\vec e_i$ de la force (par unité de surface) exercée sur une facette de normale $\\vec e_j$. Les termes diagonaux $\\sigma_{ii}$ sont des <strong>contraintes normales</strong> (traction si positif, compression si négatif) ; les termes non diagonaux $\\sigma_{ij}$ ($i\\neq j$) sont des <strong>contraintes de cisaillement</strong>.</p>

    <h3>3. Symétrie du tenseur des contraintes</h3>
    <p>En écrivant l'équilibre des <strong>moments</strong> sur un petit élément de volume cubique (analogue au raisonnement du chapitre 1 de mécanique des fluides pour l'isotropie de la pression, mais ici pour les moments), on montre que $\\boldsymbol\\sigma$ est nécessairement <strong>symétrique</strong> :</p>
    <div class="formula-box">$$\\sigma_{ij} = \\sigma_{ji}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Sans cette symétrie, un couple net non compensé agirait sur tout élément de volume infinitésimal, ce qui produirait une accélération angulaire divergente à la limite d'un volume nul — un résultat physiquement inacceptable. La symétrie de $\\boldsymbol\\sigma$ est donc une conséquence directe de l'équilibre (ou, en dynamique, de la loi fondamentale appliquée au moment cinétique).
    </div>

    <h3>4. Équations d'équilibre local</h3>
    <p>En appliquant la deuxième loi de Newton (ou le principe fondamental de la statique, à l'équilibre) à un petit élément de volume, soumis aux forces de contrainte sur sa surface et à une force volumique $\\vec f$ (comme la pesanteur), on obtient — par un raisonnement en tout point analogue à celui du chapitre 4 de mécanique des fluides pour l'équation d'Euler — les <strong>équations d'équilibre local</strong> :</p>
    <div class="formula-box">$$\\vec\\nabla \\cdot \\boldsymbol\\sigma + \\vec f = \\vec 0, \\qquad \\text{ou en composantes : } \\frac{\\partial \\sigma_{ij}}{\\partial x_j} + f_i = 0$$</div>
    <p>(en dynamique, on ajouterait un terme d'inertie $\\rho\\,\\partial^2u_i/\\partial t^2$ au second membre — c'est d'ailleurs cette généralisation dynamique, combinée à la loi de comportement du chapitre 4, qui redonnera une équation d'onde pour un solide élastique, comme au chapitre 1 du cours sur les ondes et vibrations.)</p>

    <h3>5. Contraintes principales et cisaillement maximal</h3>
    <p>Comme $\\boldsymbol\\varepsilon$ (chapitre 2), le tenseur $\\boldsymbol\\sigma$ étant symétrique, il est diagonalisable : il existe des <strong>directions principales</strong> de contrainte, dans lesquelles $\\boldsymbol\\sigma$ est diagonale, avec des <strong>contraintes principales</strong> $\\sigma_1\\geq\\sigma_2\\geq\\sigma_3$ (valeurs propres). Un résultat classique (admis ici) montre que la <strong>contrainte de cisaillement maximale</strong>, atteinte sur des facettes à $45°$ des directions principales, vaut :</p>
    <div class="formula-box">$$\\tau_{max} = \\frac{\\sigma_1 - \\sigma_3}{2}$$</div>
    <p>Cette grandeur joue un rôle central dans les critères de rupture par cisaillement des matériaux ductiles (chapitre 8).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — traction simple</span>
      <p><strong>Énoncé :</strong> une barre est soumise à une traction simple selon $x$ : $\\boldsymbol\\sigma = \\begin{pmatrix}\\sigma_0&0&0\\\\0&0&0\\\\0&0&0\\end{pmatrix}$. Quel est le vecteur contrainte sur une facette inclinée à $45°$ dans le plan $(x,y)$, de normale $\\vec n = \\frac{1}{\\sqrt2}(\\vec e_x+\\vec e_y)$ ?</p>
      <p><strong>Solution :</strong> $\\vec T = \\boldsymbol\\sigma\\cdot\\vec n = \\dfrac{\\sigma_0}{\\sqrt2}\\vec e_x$ (seule la première ligne de $\\boldsymbol\\sigma$ contribue). En projetant sur $\\vec n$ et sur la direction tangentielle $\\vec t=\\frac{1}{\\sqrt2}(-\\vec e_x+\\vec e_y)$ : $T_n = \\vec T\\cdot\\vec n = \\sigma_0/2$, $T_t = \\vec T\\cdot\\vec t = -\\sigma_0/2$.</p>
      <p class="example-answer">Une traction simple selon $x$ produit, sur une facette à $45°$, une contrainte normale <em>et</em> une contrainte de cisaillement, toutes deux égales à $\\sigma_0/2$ en valeur absolue — c'est le maximum de cisaillement possible pour cet état de contrainte, conformément à $\\tau_{max}=(\\sigma_1-\\sigma_3)/2 = \\sigma_0/2$ (avec $\\sigma_1=\\sigma_0,\\sigma_3=0$).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Vecteur contrainte $\\vec T(\\vec n) = \\boldsymbol\\sigma\\cdot\\vec n$ : le tenseur des contraintes $\\boldsymbol\\sigma$ relie linéairement la normale d'une facette à la force qui s'y exerce</li>
        <li>$\\boldsymbol\\sigma$ est symétrique ($\\sigma_{ij}=\\sigma_{ji}$), conséquence de l'équilibre des moments sur un élément infinitésimal</li>
        <li>Équations d'équilibre local : $\\vec\\nabla\\cdot\\boldsymbol\\sigma + \\vec f = \\vec 0$</li>
        <li>Contraintes principales $\\sigma_1\\geq\\sigma_2\\geq\\sigma_3$ ; cisaillement maximal $\\tau_{max}=(\\sigma_1-\\sigma_3)/2$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le vecteur contrainte est toujours normal à la facette (vrai pour un fluide parfait, faux en général pour un solide)</li>
        <li>Confondre $\\sigma_{ij}$ (composante $i$ de la force sur la facette de normale $j$) et une simple pression scalaire</li>
        <li>Oublier le terme de force volumique $\\vec f$ dans les équations d'équilibre (par exemple le poids propre d'une structure)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le vecteur contrainte $\\vec T(\\vec n)$ est relié au tenseur des contraintes par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd3e1" value="wrong"> $\\vec T = \\boldsymbol\\sigma + \\vec n$</label>
          <label class="option"><input type="radio" name="msd3e1" value="right"> $\\vec T = \\boldsymbol\\sigma \\cdot \\vec n$</label>
          <label class="option"><input type="radio" name="msd3e1" value="wrong"> $\\vec T = \\text{tr}(\\boldsymbol\\sigma)\\,\\vec n$</label>
          <label class="option"><input type="radio" name="msd3e1" value="wrong"> $\\vec T = \\vec n \\times \\boldsymbol\\sigma$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd3e1','msd3fb1','Correct — T=σ·n : le tenseur des contraintes agit linéairement sur la normale pour donner le vecteur contrainte.','Relis la formule encadrée du cours pour T(n).')">Vérifier</button>
        <div class="feedback" id="msd3fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La symétrie du tenseur des contraintes ($\\sigma_{ij}=\\sigma_{ji}$) provient de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd3e2" value="wrong"> l'équilibre des forces</label>
          <label class="option"><input type="radio" name="msd3e2" value="right"> l'équilibre des moments</label>
          <label class="option"><input type="radio" name="msd3e2" value="wrong"> la conservation de la masse</label>
          <label class="option"><input type="radio" name="msd3e2" value="wrong"> l'hypothèse HPP</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd3e2','msd3fb2','Correct — sans cette symétrie, un couple non compensé agirait sur tout élément infinitésimal, ce qui est physiquement inacceptable.','Relis le point clé du cours sur la symétrie de σ.')">Vérifier</button>
        <div class="feedback" id="msd3fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une traction simple $\\sigma_1=\\sigma_0$, $\\sigma_2=\\sigma_3=0$, la contrainte de cisaillement maximale $\\tau_{max}$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd3e3" value="wrong"> $\\sigma_0$</label>
          <label class="option"><input type="radio" name="msd3e3" value="right"> $\\sigma_0/2$</label>
          <label class="option"><input type="radio" name="msd3e3" value="wrong"> $2\\sigma_0$</label>
          <label class="option"><input type="radio" name="msd3e3" value="wrong"> $0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd3e3','msd3fb3','Correct — τmax=(σ1−σ3)/2=(σ0−0)/2=σ0/2, exactement le résultat retrouvé dans l\\'exemple corrigé du cours.','Applique τmax=(σ1−σ3)/2 avec σ1=σ0 et σ3=0.')">Vérifier</button>
        <div class="feedback" id="msd3fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Le tenseur des contraintes et les équations d'équilibre")] = {
  intro: "Salut, moi c'est Nova ! On introduit le tenseur des contraintes et les équations d'équilibre local. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/vecteur contrainte|T\(n\)/i, replies:[
      "Le vecteur contrainte T(n)=σ·n donne la force par unité de surface exercée sur une facette de normale n, avec en général une composante normale ET tangentielle (contrairement à la pression d'un fluide parfait)."
    ]},
    { test:/sym[ée]tri/i, replies:[
      "σ est symétrique (σij=σji), conséquence de l'équilibre des moments sur un élément infinitésimal — sans ça, un couple non compensé agirait, physiquement inacceptable."
    ]},
    { test:/[ée]quilibre local|∇·σ/i, replies:[
      "Les équations d'équilibre local, ∇·σ+f=0, généralisent l'équation d'Euler de la mécanique des fluides au cas d'un solide déformable."
    ]},
    { test:/cisaillement maximal|τmax/i, replies:[
      "La contrainte de cisaillement maximale τmax=(σ1−σ3)/2 (avec σ1≥σ2≥σ3 les contraintes principales) joue un rôle central dans les critères de rupture par cisaillement des matériaux ductiles."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour T(n).",
      "Indice niveau 2 : c'est un produit tensoriel simple.",
      "Indice niveau 3 : T=σ·n."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le point clé du cours sur la symétrie de σ.",
      "Indice niveau 2 : ça vient d'un bilan de rotation, pas de translation.",
      "Indice niveau 3 : c'est l'équilibre des moments."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : applique τmax=(σ1−σ3)/2.",
      "Indice niveau 2 : avec σ1=σ0 et σ3=0.",
      "Indice niveau 3 : τmax=σ0/2."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MSD_CHAPTERS[msdKey("Loi de comportement élastique : loi de Hooke généralisée")] = {
  objectives: [
    "Justifier la nécessité d'une loi de comportement reliant contraintes et déformations",
    "Énoncer la loi de Hooke généralisée pour un matériau élastique linéaire",
    "Dénombrer les constantes élastiques indépendantes selon les symétries du matériau",
    "Introduire la notion de matériau isotrope, préparant le chapitre suivant"
  ],
  prereqs: ["Le tenseur des contraintes et les équations d'équilibre", "Le tenseur des déformations : dilatations et distorsions"],
  bodyHtml: `
    <p>Les chapitres précédents ont introduit deux tenseurs de nature très différente : $\\boldsymbol\\varepsilon$, purement <strong>cinématique</strong> (comment le solide se déforme), et $\\boldsymbol\\sigma$, purement <strong>statique</strong> (quelles forces internes s'exercent). Rien, dans les équations vues jusqu'ici, ne les relie : les équations d'équilibre (chapitre 3) et la définition de $\\boldsymbol\\varepsilon$ (chapitre 2) sont valables pour <em>n'importe quel</em> matériau solide, aussi différent soit-il (acier, caoutchouc, bois). Il manque une <strong>loi de comportement</strong>, propre à chaque matériau, qui relie $\\boldsymbol\\sigma$ et $\\boldsymbol\\varepsilon$ — c'est l'objet de ce chapitre, pour le cas le plus simple et le plus utilisé : l'<strong>élasticité linéaire</strong>.</p>

    <h3>1. Élasticité : réversibilité et linéarité</h3>
    <p>Un comportement est dit <strong>élastique</strong> si la déformation disparaît intégralement lorsque la contrainte est supprimée (pas de déformation résiduelle) : le solide retrouve exactement sa configuration de référence. Il est dit <strong>linéaire</strong> si, de plus, la relation entre contrainte et déformation est proportionnelle. La très grande majorité des solides usuels (métaux, roches, céramiques, bois) se comportent de façon élastique linéaire, tant que les contraintes restent inférieures à un seuil caractéristique du matériau (la <strong>limite d'élasticité</strong>, au-delà de laquelle apparaissent des déformations irréversibles, chapitre 8).</p>

    <h3>2. La loi de Hooke généralisée</h3>
    <p>Pour un matériau élastique linéaire, la relation la plus générale entre $\\boldsymbol\\sigma$ et $\\boldsymbol\\varepsilon$ est <strong>linéaire</strong> :</p>
    <div class="formula-box">$$\\boldsymbol\\sigma = \\mathbb C : \\boldsymbol\\varepsilon, \\qquad \\sigma_{ij} = C_{ijkl}\\,\\varepsilon_{kl}$$</div>
    <p>où $\\mathbb C$ est le <strong>tenseur de rigidité</strong> (ou tenseur d'élasticité), un tenseur d'ordre 4 (81 composantes $C_{ijkl}$ a priori). C'est la généralisation tridimensionnelle de la loi de Hooke $F=k\\,\\Delta L$ pour un ressort, découverte historiquement dans ce cas unidimensionnel bien plus simple.</p>

    <h3>3. Réduction du nombre de constantes indépendantes</h3>
    <p>Le nombre de composantes indépendantes de $\\mathbb C$ se réduit fortement grâce à des arguments de symétrie successifs :</p>
    <table class="mini-table">
      <tr><th>Symétrie utilisée</th><th>Conséquence</th><th>Nombre de constantes restantes</th></tr>
      <tr><td>Départ (tenseur d'ordre 4 quelconque)</td><td>—</td><td>81</td></tr>
      <tr><td>Symétrie de $\\boldsymbol\\sigma$ ($\\sigma_{ij}=\\sigma_{ji}$)</td><td>$C_{ijkl}=C_{jikl}$</td><td>54</td></tr>
      <tr><td>Symétrie de $\\boldsymbol\\varepsilon$ ($\\varepsilon_{kl}=\\varepsilon_{lk}$)</td><td>$C_{ijkl}=C_{ijlk}$</td><td>36</td></tr>
      <tr><td>Existence d'une énergie élastique (chapitre 8)</td><td>$C_{ijkl}=C_{klij}$</td><td><strong>21</strong> (cas général, matériau anisotrope quelconque)</td></tr>
      <tr><td>Isotropie (aucune direction privilégiée)</td><td>symétries supplémentaires</td><td><strong>2</strong> (chapitre suivant)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un matériau <strong>anisotrope</strong> général (comme un composite fibré ou un cristal de basse symétrie) nécessite encore 21 constantes élastiques indépendantes pour être complètement caractérisé. C'est l'hypothèse d'<strong>isotropie</strong> — l'absence de toute direction privilégiée dans le matériau — qui réduit spectaculairement ce nombre à seulement <strong>2</strong> constantes indépendantes, un cas extrêmement fréquent en pratique (métaux polycristallins, verres, bétons) et qui fait l'objet du chapitre suivant.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — cas unidimensionnel</span>
      <p><strong>Énoncé :</strong> montrer que la loi de Hooke généralisée redonne, dans le cas d'une traction uniaxiale simple ($\\sigma_{xx}=\\sigma_0$ seul non nul, matériau isotrope de « module d'élasticité » $E$ à ce stade non précisé), la loi de Hooke classique $\\sigma_0 = E\\,\\varepsilon_{xx}$.</p>
      <p><strong>Solution :</strong> pour un matériau isotrope (à établir en détail au chapitre suivant), la relation entre $\\sigma_{xx}$ et $\\varepsilon_{xx}$ se réduit, dans cette configuration particulière à une seule contrainte non nulle, à une simple proportionnalité — exactement la forme du ressort de Hooke, mais maintenant appliquée à un solide tridimensionnel continu.</p>
      <p class="example-answer">$\\sigma_{xx} = E\\,\\varepsilon_{xx}$ : la loi de Hooke à un ressort ($F=k\\Delta L$) et la loi de Hooke généralisée à un solide 3D sont bien la même idée physique, l'une étant le cas particulier unidimensionnel de l'autre.</p>
    </div>

    <h3>4. Vers l'isotropie</h3>
    <p>La notion de matériau <strong>isotrope</strong> — dont les propriétés élastiques ne dépendent d'aucune direction particulière de l'espace — est centrale en physique des matériaux : c'est le cas de la plupart des métaux courants (à l'échelle macroscopique, malgré leur structure cristalline microscopique, grâce au désordre d'orientation des grains polycristallins), des verres, et de nombreux matériaux de construction. Le chapitre suivant montre comment cette seule hypothèse de symétrie réduit le tenseur de rigidité à seulement deux paramètres physiques, immédiatement mesurables en laboratoire.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une loi de comportement est nécessaire pour relier $\\boldsymbol\\sigma$ (statique) et $\\boldsymbol\\varepsilon$ (cinématique), propres à chaque matériau</li>
        <li>Loi de Hooke généralisée : $\\boldsymbol\\sigma = \\mathbb C:\\boldsymbol\\varepsilon$, avec $\\mathbb C$ tenseur de rigidité d'ordre 4</li>
        <li>Les symétries de $\\boldsymbol\\sigma$, $\\boldsymbol\\varepsilon$ et de l'énergie élastique réduisent $\\mathbb C$ à 21 constantes indépendantes pour un matériau anisotrope général</li>
        <li>L'isotropie (absence de direction privilégiée) réduit encore ce nombre à seulement 2 constantes (chapitre 5)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la loi de Hooke généralisée n'est qu'une curiosité mathématique : c'est elle qui, une fois combinée aux équations d'équilibre, permet de résoudre concrètement tout problème d'élasticité linéaire</li>
        <li>Confondre élasticité (réversibilité) et linéarité (proportionnalité) : un matériau peut être élastique non linéaire (caoutchouc fortement étiré), même si ce cours se limite au cas linéaire</li>
        <li>Oublier que le nombre de constantes indépendantes dépend fortement des symétries du matériau : 21 en général, 2 seulement pour un isotrope</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un comportement élastique se caractérise par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd4e1" value="wrong"> une déformation résiduelle après suppression de la contrainte</label>
          <label class="option"><input type="radio" name="msd4e1" value="right"> une disparition intégrale de la déformation après suppression de la contrainte</label>
          <label class="option"><input type="radio" name="msd4e1" value="wrong"> une rupture immédiate du matériau</label>
          <label class="option"><input type="radio" name="msd4e1" value="wrong"> l'absence de toute déformation, quelle que soit la contrainte</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd4e1','msd4fb1','Correct — l\\'élasticité signifie que le solide retrouve exactement sa configuration de référence quand on supprime la contrainte : c\\'est la réversibilité.','Relis la définition de l\\'élasticité au début du cours.')">Vérifier</button>
        <div class="feedback" id="msd4fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour un matériau anisotrope général (après toutes les symétries physiques applicables), le tenseur de rigidité a :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd4e2" value="wrong"> 81 constantes indépendantes</label>
          <label class="option"><input type="radio" name="msd4e2" value="right"> 21 constantes indépendantes</label>
          <label class="option"><input type="radio" name="msd4e2" value="wrong"> 2 constantes indépendantes</label>
          <label class="option"><input type="radio" name="msd4e2" value="wrong"> 1 seule constante</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd4e2','msd4fb2','Correct — après les symétries de σ, ε et de l\\'énergie élastique, il reste 21 constantes pour le cas anisotrope le plus général.','Relis le tableau du cours résumant la réduction du nombre de constantes.')">Vérifier</button>
        <div class="feedback" id="msd4fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'hypothèse d'isotropie réduit le nombre de constantes élastiques indépendantes à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd4e3" value="wrong"> 21</label>
          <label class="option"><input type="radio" name="msd4e3" value="wrong"> 9</label>
          <label class="option"><input type="radio" name="msd4e3" value="right"> 2</label>
          <label class="option"><input type="radio" name="msd4e3" value="wrong"> 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd4e3','msd4fb3','Correct — pour un matériau isotrope, il ne reste que 2 constantes indépendantes, ce qui sera détaillé au chapitre suivant (coefficients de Lamé, module d\\'Young, coefficient de Poisson).','Relis la dernière ligne du tableau du cours.')">Vérifier</button>
        <div class="feedback" id="msd4fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Loi de comportement élastique : loi de Hooke généralisée")] = {
  intro: "Salut, c'est Nova ! On introduit la loi de comportement élastique qui relie contraintes et déformations. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/hooke|loi de comportement/i, replies:[
      "La loi de Hooke généralisée σ=C:ε relie linéairement contraintes et déformations via le tenseur de rigidité C (ordre 4) — la généralisation 3D de F=kΔL pour un ressort."
    ]},
    { test:/[ée]lastique|lin[ée]aire/i, replies:[
      "Élastique = réversible (pas de déformation résiduelle) ; linéaire = proportionnalité entre σ et ε. La plupart des solides usuels sont élastiques linéaires tant qu'on reste sous leur limite d'élasticité."
    ]},
    { test:/21|constantes ind[ée]pendantes/i, replies:[
      "En partant de 81 composantes, les symétries de σ, ε et de l'énergie élastique réduisent le tenseur de rigidité à 21 constantes indépendantes pour un matériau anisotrope général."
    ]},
    { test:/isotrope|isotropie/i, replies:[
      "Un matériau isotrope n'a aucune direction privilégiée : cette symétrie supplémentaire réduit le nombre de constantes élastiques indépendantes de 21 à seulement 2 (chapitre suivant)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition de l'élasticité au début du cours.",
      "Indice niveau 2 : ça concerne ce qui se passe quand on retire la contrainte.",
      "Indice niveau 3 : le solide retrouve exactement sa configuration de référence."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau du cours résumant la réduction du nombre de constantes.",
      "Indice niveau 2 : c'est après application de toutes les symétries physiques, mais sans isotropie.",
      "Indice niveau 3 : il reste 21 constantes."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la dernière ligne du tableau du cours.",
      "Indice niveau 2 : c'est un tout petit nombre.",
      "Indice niveau 3 : il ne reste que 2 constantes pour un isotrope."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MSD_CHAPTERS[msdKey("Élasticité isotrope : coefficients de Lamé, module d'Young et coefficient de Poisson")] = {
  objectives: [
    "Écrire la loi de Hooke isotrope en fonction des coefficients de Lamé",
    "Définir le module d'Young et le coefficient de Poisson à partir d'un essai de traction simple",
    "Établir les relations entre les quatre constantes élastiques usuelles d'un isotrope",
    "Identifier le module de compressibilité et le module de cisaillement"
  ],
  prereqs: ["Loi de comportement élastique : loi de Hooke généralisée"],
  bodyHtml: `
    <p>Le chapitre précédent a annoncé que l'isotropie réduit le tenseur de rigidité à seulement <strong>2</strong> constantes indépendantes. Ce chapitre établit la forme explicite de la loi de Hooke isotrope, puis relie ces deux constantes fondamentales aux grandeurs mesurées directement en laboratoire — le <strong>module d'Young</strong> et le <strong>coefficient de Poisson</strong>, omniprésents dans toute fiche technique de matériau.</p>

    <h3>1. La loi de Hooke isotrope et les coefficients de Lamé</h3>
    <p>Pour un matériau isotrope, la forme la plus générale de la loi de Hooke se réduit à :</p>
    <div class="formula-box">$$\\boldsymbol\\sigma = \\lambda\\,\\text{tr}(\\boldsymbol\\varepsilon)\\,\\mathbf I + 2\\mu\\,\\boldsymbol\\varepsilon$$</div>
    <p>où $\\lambda$ et $\\mu$ sont les <strong>coefficients de Lamé</strong>, les deux seules constantes indépendantes du matériau isotrope. Le second coefficient de Lamé $\\mu$ est aussi appelé <strong>module de cisaillement</strong> (ou module de Coulomb, noté parfois $G$) : il relie directement une contrainte de cisaillement à la distorsion correspondante, $\\sigma_{ij}=2\\mu\\varepsilon_{ij}$ pour $i\\neq j$.</p>

    <h3>2. Essai de traction simple : module d'Young et coefficient de Poisson</h3>
    <p>En pratique, les coefficients de Lamé ne sont pas les grandeurs les plus intuitives ; on préfère les caractériser par un <strong>essai de traction simple</strong> : une éprouvette est tirée selon $x$, avec $\\sigma_{xx}=\\sigma_0$, toutes les autres composantes de contrainte nulles. En résolvant la loi de Hooke isotrope dans cette configuration (calcul standard, omis ici), on définit :</p>
    <div class="formula-box">$$\\varepsilon_{xx} = \\frac{\\sigma_0}{E}, \\qquad \\varepsilon_{yy} = \\varepsilon_{zz} = -\\nu\\,\\varepsilon_{xx}$$</div>
    <table class="mini-table">
      <tr><th>Constante</th><th>Nom</th><th>Signification physique</th></tr>
      <tr><td>$E$</td><td>module d'Young</td><td>« raideur » du matériau en traction simple ($\\sigma_0=E\\varepsilon_{xx}$) — retrouve exactement la loi de Hooke à un ressort</td></tr>
      <tr><td>$\\nu$</td><td>coefficient de Poisson</td><td>contraction transversale relative pour un allongement longitudinal donné (effet « saucisson » : une barre étirée s'amincit)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'effet Poisson</span>
      Le signe $-$ devant $\\nu$ traduit un fait d'expérience quasi universel : quand on étire un matériau dans une direction, il se <strong>contracte</strong> dans les directions perpendiculaires (comme un élastique, ou plus subtilement un barreau métallique). Pour la plupart des matériaux, $0 < \\nu < 0{,}5$ ; $\\nu=0{,}5$ correspondrait à un matériau parfaitement incompressible (aucune variation de volume sous traction, comme un caoutchouc idéal).
    </div>

    <h3>3. Relations entre les quatre constantes usuelles</h3>
    <p>Le module d'Young $E$ et le coefficient de Poisson $\\nu$, bien que définis à partir d'un essai particulier (traction simple), sont des propriétés <strong>intrinsèques</strong> du matériau (ils ne dépendent pas du type d'essai) et se relient directement aux coefficients de Lamé :</p>
    <div class="formula-box">$$E = \\frac{\\mu(3\\lambda+2\\mu)}{\\lambda+\\mu}, \\qquad \\nu = \\frac{\\lambda}{2(\\lambda+\\mu)}$$</div>
    <p>Deux autres constantes, dérivées et fréquemment utilisées, complètent la panoplie usuelle :</p>
    <table class="mini-table">
      <tr><th>Constante</th><th>Définition</th><th>Interprétation</th></tr>
      <tr><td>Module de cisaillement $G=\\mu$</td><td>$G = \\dfrac{E}{2(1+\\nu)}$</td><td>relie contrainte et distorsion de cisaillement</td></tr>
      <tr><td>Module de compressibilité $K$</td><td>$K = \\dfrac{E}{3(1-2\\nu)}$</td><td>relie pression hydrostatique et variation relative de volume, $p=-K\\,\\Delta V/V_0$</td></tr>
    </table>
    <p><strong>Deux</strong> constantes suffisent toujours à caractériser complètement un isotrope : n'importe quelle paire parmi $(\\lambda,\\mu)$, $(E,\\nu)$, $(G,K)$... permet de retrouver toutes les autres.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> l'acier a $E \\approx 210\\,\\text{GPa}$ et $\\nu \\approx 0{,}3$. Calculer son module de cisaillement $G$.</p>
      <p><strong>Solution :</strong> $G = \\dfrac{E}{2(1+\\nu)} = \\dfrac{210}{2\\times 1{,}3} = \\dfrac{210}{2{,}6}$.</p>
      <p class="example-answer">$G \\approx 81\\,\\text{GPa}$ — une valeur cohérente avec les tables usuelles de propriétés mécaniques de l'acier (typiquement $79$–$81\\,\\text{GPa}$).</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <rect x="50" y="15" width="20" height="30" fill="none" stroke="#5A6472" stroke-width="1" stroke-dasharray="2,2"/>
          <rect x="48" y="10" width="24" height="42" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
          <path d="M60,8 L60,0" stroke="#F0B94D" stroke-width="1.2" marker-end="url(#arrup)"/>
          <path d="M60,52 L60,60" stroke="#F0B94D" stroke-width="1.2"/>
          <text x="75" y="30" font-family="IBM Plex Mono" font-size="7" fill="#4C7CFF">allongement</text>
          <text x="20" y="30" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">contraction ↔</text>
        </svg>
        <span>effet Poisson : allongement selon x, contraction selon y et z</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Loi de Hooke isotrope : $\\boldsymbol\\sigma = \\lambda\\,\\text{tr}(\\boldsymbol\\varepsilon)\\mathbf I + 2\\mu\\boldsymbol\\varepsilon$, avec $\\lambda,\\mu$ coefficients de Lamé</li>
        <li>Essai de traction simple : $E$ (module d'Young, raideur) et $\\nu$ (coefficient de Poisson, contraction transversale)</li>
        <li>Toutes les constantes élastiques d'un isotrope se déduisent de deux d'entre elles seulement : $(\\lambda,\\mu)$, $(E,\\nu)$, ou $(G,K)$</li>
        <li>Module de cisaillement $G=E/[2(1+\\nu)]$ ; module de compressibilité $K=E/[3(1-2\\nu)]$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'il faut connaître les 4 constantes ($E,\\nu,G,K$) séparément : 2 d'entre elles suffisent toujours, les autres s'en déduisent</li>
        <li>Oublier le signe $-$ dans $\\varepsilon_{yy}=-\\nu\\varepsilon_{xx}$ : une traction (allongement positif) donne une contraction transversale (déformation négative)</li>
        <li>Confondre coefficient de Lamé $\\mu$ et coefficient de Poisson $\\nu$ : $\\mu=G$ est le module de cisaillement (dimension d'une contrainte), $\\nu$ est sans dimension</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le coefficient de Poisson $\\nu$ mesure :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd5e1" value="wrong"> la raideur du matériau en traction</label>
          <label class="option"><input type="radio" name="msd5e1" value="right"> la contraction transversale relative pour un allongement longitudinal donné</label>
          <label class="option"><input type="radio" name="msd5e1" value="wrong"> la contrainte de cisaillement maximale</label>
          <label class="option"><input type="radio" name="msd5e1" value="wrong"> la masse volumique du matériau</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd5e1','msd5fb1','Correct — c\\'est l\\'effet Poisson : un matériau étiré dans une direction se contracte dans les directions perpendiculaires.','Relis la définition du coefficient de Poisson dans le tableau du cours.')">Vérifier</button>
        <div class="feedback" id="msd5fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour caractériser complètement un matériau isotrope, il faut connaître :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd5e2" value="wrong"> les 21 constantes du cas anisotrope</label>
          <label class="option"><input type="radio" name="msd5e2" value="right"> seulement 2 constantes indépendantes</label>
          <label class="option"><input type="radio" name="msd5e2" value="wrong"> les 4 constantes E, ν, G, K séparément et indépendamment</label>
          <label class="option"><input type="radio" name="msd5e2" value="wrong"> uniquement le module d'Young</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd5e2','msd5fb2','Correct — 2 constantes suffisent toujours (par exemple E et ν), les autres (G, K, λ, μ) s\\'en déduisent par les formules du cours.','Relis la conclusion du cours sur le nombre de constantes réellement indépendantes.')">Vérifier</button>
        <div class="feedback" id="msd5fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour un matériau de module d'Young $E=100\\,\\text{GPa}$ et coefficient de Poisson $\\nu=0$, le module de cisaillement $G$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd5e3" value="wrong"> 100 GPa</label>
          <label class="option"><input type="radio" name="msd5e3" value="right"> 50 GPa</label>
          <label class="option"><input type="radio" name="msd5e3" value="wrong"> 200 GPa</label>
          <label class="option"><input type="radio" name="msd5e3" value="wrong"> 0 GPa</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd5e3','msd5fb3','Correct — G=E/[2(1+ν)]=100/[2×1]=50 GPa.','Utilise G=E/[2(1+ν)] avec ν=0.')">Vérifier</button>
        <div class="feedback" id="msd5fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Élasticité isotrope : coefficients de Lamé, module d'Young et coefficient de Poisson")] = {
  intro: "Salut, c'est Nova ! On étudie l'élasticité isotrope : coefficients de Lamé, module d'Young, coefficient de Poisson. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/lam[ée]/i, replies:[
      "La loi de Hooke isotrope s'écrit σ=λ·tr(ε)·I+2με, avec λ,μ les coefficients de Lamé — les 2 seules constantes indépendantes d'un isotrope."
    ]},
    { test:/module d.young|\bE\b/i, replies:[
      "Le module d'Young E mesure la raideur du matériau en traction simple : σ0=E·εxx, exactement l'équivalent 3D de F=kΔL."
    ]},
    { test:/poisson|coefficient de poisson/i, replies:[
      "Le coefficient de Poisson ν mesure la contraction transversale relative pour un allongement longitudinal donné (effet Poisson) : εyy=−ν·εxx. Typiquement 0<ν<0,5."
    ]},
    { test:/module de cisaillement|G=|module de compressibilit[ée]|K=/i, replies:[
      "G=E/[2(1+ν)] est le module de cisaillement (=μ) ; K=E/[3(1−2ν)] est le module de compressibilité. Seules 2 constantes suffisent toujours à tout déduire."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition du coefficient de Poisson dans le tableau du cours.",
      "Indice niveau 2 : ça concerne ce qui se passe transversalement quand on étire.",
      "Indice niveau 3 : c'est la contraction transversale relative."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la conclusion du cours sur le nombre de constantes réellement indépendantes.",
      "Indice niveau 2 : c'est un tout petit nombre pour un isotrope.",
      "Indice niveau 3 : 2 constantes suffisent toujours."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : utilise G=E/[2(1+ν)] avec ν=0.",
      "Indice niveau 2 : le dénominateur devient 2.",
      "Indice niveau 3 : G=100/2=50 GPa."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MSD_CHAPTERS[msdKey("Théorie des poutres : flexion et modèle d'Euler-Bernoulli")] = {
  objectives: [
    "Définir une poutre et poser les hypothèses cinématiques d'Euler-Bernoulli",
    "Établir la relation entre moment fléchissant et courbure",
    "Déduire l'équation différentielle de la déformée d'une poutre fléchie",
    "Résoudre un cas simple de flexion (poutre sur deux appuis, charge ponctuelle)"
  ],
  prereqs: ["Élasticité isotrope : coefficients de Lamé, module d'Young et coefficient de Poisson"],
  bodyHtml: `
    <p>Résoudre le problème général de l'élasticité tridimensionnelle (chapitres 3 à 5) dans une géométrie complexe est en pratique très difficile. La <strong>théorie des poutres</strong> est un modèle simplifié — et pourtant remarquablement précis — adapté aux structures élancées (une dimension beaucoup plus grande que les deux autres) : poutres de construction, arbres de transmission, ailes d'avion. C'est historiquement l'une des premières grandes réussites quantitatives de la mécanique des solides déformables, et son application la plus répandue en ingénierie.</p>

    <h3>1. Définition d'une poutre et hypothèses cinématiques</h3>
    <p>Une <strong>poutre</strong> est un solide dont une dimension (la longueur $L$, selon l'axe $x$) est grande devant les deux autres (les dimensions transversales de la section). Le modèle d'<strong>Euler-Bernoulli</strong> repose sur une hypothèse cinématique forte, validée par l'expérience pour les poutres suffisamment élancées :</p>
    <div class="key-point">
      <span class="eyebrow">Hypothèse d'Euler-Bernoulli</span>
      Les sections planes, initialement perpendiculaires à la fibre moyenne (l'axe de la poutre), <strong>restent planes et perpendiculaires</strong> à la fibre moyenne déformée après flexion. Elles ne se gauchissent pas et ne changent pas de forme, elles pivotent seulement.
    </div>
    <p>Sous cette hypothèse, tout le champ de déplacement de la poutre se réduit à une seule fonction : la <strong>flèche</strong> $v(x)$, déplacement transversal de la fibre moyenne au point d'abscisse $x$.</p>

    <h3>2. Contraintes de flexion et moment fléchissant</h3>
    <p>Lorsqu'une poutre fléchit, les fibres longitudinales du côté convexe s'allongent (traction), celles du côté concave se raccourcissent (compression) : il existe, à mi-hauteur, une <strong>fibre neutre</strong> qui ne change pas de longueur. En un point de la section à une distance $y$ de la fibre neutre, la déformation longitudinale (par l'hypothèse d'Euler-Bernoulli et un peu de géométrie) est proportionnelle à $y$ et à la <strong>courbure</strong> locale $1/R(x)$ de la fibre moyenne déformée : $\\varepsilon_{xx}(y) = -y/R(x)$. Avec la loi de Hooke (chapitre 5), la contrainte associée est $\\sigma_{xx}(y) = -Ey/R(x)$.</p>
    <p>En intégrant le moment de ces contraintes sur toute la section, on définit le <strong>moment fléchissant</strong> $M_f(x) = \\displaystyle\\int_S \\sigma_{xx}(y)\\,(-y)\\,dS$, ce qui donne, après calcul :</p>
    <div class="formula-box">$$M_f(x) = \\frac{E I}{R(x)}, \\qquad I = \\int_S y^2\\,dS$$</div>
    <p>où $I$ est le <strong>moment quadratique</strong> (ou moment d'inertie de flexion) de la section par rapport à son axe neutre — une grandeur purement géométrique, caractérisant la résistance en flexion de la forme de la section (une poutre en I a un $I$ bien plus grand qu'une section pleine de même surface, d'où sa forme optimisée pour la résistance à la flexion).</p>

    <h3>3. Équation de la déformée</h3>
    <p>Pour de petites flexions, la courbure s'approxime par $1/R(x) \\approx v''(x)$ (dérivée seconde de la flèche par rapport à $x$). On obtient ainsi l'<strong>équation de la déformée</strong> de la poutre :</p>
    <div class="formula-box">$$\\boxed{\\ EI\\,v''(x) = M_f(x)\\ }$$</div>
    <p>Cette équation différentielle du second ordre, une fois le moment fléchissant $M_f(x)$ déterminé par la statique (équilibre global de la poutre et de ses portions), se résout par deux intégrations successives, les deux constantes d'intégration étant fixées par les conditions aux limites (appuis, encastrements).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — poutre sur deux appuis, charge centrale</span>
      <p><strong>Énoncé :</strong> une poutre de longueur $L$, simplement posée sur deux appuis (flèche nulle aux extrémités), est chargée par une force ponctuelle $P$ en son milieu $x=L/2$. On admet que le moment fléchissant pour $0\\leq x\\leq L/2$ est $M_f(x) = \\dfrac{P}{2}x$. Trouver la flèche maximale.</p>
      <p><strong>Solution :</strong> $EIv'' = \\dfrac{P}{2}x \\Rightarrow EIv' = \\dfrac{P}{4}x^2+C_1$. Par symétrie, $v'(L/2)=0$ (tangente horizontale au milieu), donc $C_1=-\\dfrac{P}{4}\\left(\\dfrac{L}{2}\\right)^2=-\\dfrac{PL^2}{16}$. En intégrant à nouveau et en imposant $v(0)=0$, on obtient $v(x) = \\dfrac{1}{EI}\\left(\\dfrac{P}{12}x^3 - \\dfrac{PL^2}{16}x\\right)$.</p>
      <p class="example-answer">La flèche maximale, au centre $x=L/2$, vaut $v_{max} = -\\dfrac{PL^3}{48EI}$ — un résultat classique de résistance des matériaux, utilisé pour dimensionner poutres et planchers (le signe négatif traduit un déplacement vers le bas, sous une charge dirigée vers le bas).</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <line x1="10" y1="50" x2="130" y2="50" stroke="#5A6472" stroke-width="1.4"/>
          <path d="M10,50 Q70,75 130,50" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <path d="M65,15 L70,25 L75,15 Z" fill="#F0B94D"/>
          <line x1="70" y1="25" x2="70" y2="45" stroke="#F0B94D" stroke-width="1.4"/>
          <text x="72" y="20" font-family="IBM Plex Mono" font-size="7" fill="#F0B94D">P</text>
          <path d="M8,58 L12,50 L16,58 Z" fill="#2DD4C4"/>
          <path d="M124,58 L128,50 L132,58 Z" fill="#2DD4C4"/>
        </svg>
        <span>poutre sur deux appuis, charge centrale : flèche maximale au milieu</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Hypothèse d'Euler-Bernoulli : les sections planes restent planes et perpendiculaires à la fibre moyenne déformée</li>
        <li>Moment fléchissant $M_f = EI/R$, avec $I=\\int_S y^2\\,dS$ le moment quadratique de la section</li>
        <li>Équation de la déformée : $EI\\,v''(x)=M_f(x)$, résolue par deux intégrations avec les conditions aux limites</li>
        <li>Poutre sur deux appuis, charge centrale $P$ : flèche maximale $v_{max}=-PL^3/(48EI)$</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que le moment quadratique $I$ dépend de la <em>forme</em> de la section, pas seulement de son aire — deux sections de même aire peuvent avoir des $I$ très différents</li>
        <li>Se tromper dans les conditions aux limites : un appui simple impose $v=0$ (mais pas $v'=0$), un encastrement impose $v=0$ <em>et</em> $v'=0$</li>
        <li>Oublier de vérifier que l'hypothèse d'Euler-Bernoulli (poutre suffisamment élancée) est justifiée avant de l'appliquer</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'hypothèse d'Euler-Bernoulli énonce que les sections planes, après flexion :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd6e1" value="wrong"> se gauchissent complètement</label>
          <label class="option"><input type="radio" name="msd6e1" value="right"> restent planes et perpendiculaires à la fibre moyenne déformée</label>
          <label class="option"><input type="radio" name="msd6e1" value="wrong"> disparaissent</label>
          <label class="option"><input type="radio" name="msd6e1" value="wrong"> deviennent sphériques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd6e1','msd6fb1','Correct — c\\'est l\\'hypothèse centrale du modèle, qui réduit tout le champ de déplacement à la seule flèche v(x).','Relis l\\'énoncé exact de l\\'hypothèse d\\'Euler-Bernoulli dans le cours.')">Vérifier</button>
        <div class="feedback" id="msd6fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'équation de la déformée d'une poutre en flexion s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd6e2" value="wrong"> $EIv = M_f$</label>
          <label class="option"><input type="radio" name="msd6e2" value="right"> $EIv'' = M_f$</label>
          <label class="option"><input type="radio" name="msd6e2" value="wrong"> $EIv' = M_f$</label>
          <label class="option"><input type="radio" name="msd6e2" value="wrong"> $Iv'' = M_f$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd6e2','msd6fb2','Correct — EIv\\'\\'=Mf, obtenue en approximant la courbure 1/R par v\\'\\'.','Relis la formule encadrée du cours pour l\\'équation de la déformée.')">Vérifier</button>
        <div class="feedback" id="msd6fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une poutre sur deux appuis avec une charge centrale $P$, la flèche maximale est proportionnelle à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd6e3" value="wrong"> $L$</label>
          <label class="option"><input type="radio" name="msd6e3" value="wrong"> $L^2$</label>
          <label class="option"><input type="radio" name="msd6e3" value="right"> $L^3$</label>
          <label class="option"><input type="radio" name="msd6e3" value="wrong"> $1/L$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd6e3','msd6fb3','Correct — vmax=−PL³/(48EI) : la flèche croît comme le cube de la longueur, un résultat très sensible qui explique pourquoi les longues portées nécessitent des poutres beaucoup plus rigides.','Relis la formule de vmax donnée dans l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="msd6fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Théorie des poutres : flexion et modèle d'Euler-Bernoulli")] = {
  intro: "Salut, moi c'est Nova ! On étudie la flexion des poutres avec le modèle d'Euler-Bernoulli. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/euler.?bernoulli|sections planes/i, replies:[
      "L'hypothèse d'Euler-Bernoulli : les sections planes, initialement perpendiculaires à la fibre moyenne, restent planes et perpendiculaires après flexion — elles pivotent sans se gauchir."
    ]},
    { test:/moment fl[ée]chissant|moment quadratique/i, replies:[
      "Le moment fléchissant Mf=EI/R relie la courbure de la poutre au moment quadratique I=∫y²dS de la section, une grandeur purement géométrique caractérisant sa résistance en flexion."
    ]},
    { test:/[ée]quation de la d[ée]form[ée]e|v''/i, replies:[
      "L'équation de la déformée EIv''(x)=Mf(x) se résout par deux intégrations successives, avec les conditions aux limites fixées par les appuis (v=0) ou encastrements (v=0 et v'=0)."
    ]},
    { test:/fl[èe]che/i, replies:[
      "Pour une poutre sur deux appuis avec charge centrale P, la flèche maximale est vmax=−PL³/(48EI) : elle croît comme le cube de la longueur, très sensible à la portée."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'énoncé exact de l'hypothèse d'Euler-Bernoulli.",
      "Indice niveau 2 : ça concerne la forme des sections après flexion.",
      "Indice niveau 3 : elles restent planes et perpendiculaires à la fibre moyenne déformée."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule encadrée du cours.",
      "Indice niveau 2 : c'est une dérivée seconde de v.",
      "Indice niveau 3 : EIv''=Mf."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la formule de vmax dans l'exemple corrigé.",
      "Indice niveau 2 : regarde la puissance de L dans PL³/(48EI).",
      "Indice niveau 3 : c'est L³, un cube."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
MSD_CHAPTERS[msdKey("Torsion des poutres cylindriques")] = {
  objectives: [
    "Poser les hypothèses cinématiques de la torsion d'une poutre cylindrique",
    "Établir la relation entre moment de torsion et angle de torsion unitaire",
    "Introduire le moment quadratique polaire et calculer la contrainte de cisaillement",
    "Appliquer le modèle à des cas simples (arbre de transmission)"
  ],
  prereqs: ["Théorie des poutres : flexion et modèle d'Euler-Bernoulli"],
  bodyHtml: `
    <p>Après la flexion (chapitre 6), la <strong>torsion</strong> est le second grand cas de sollicitation simple d'une poutre : un couple appliqué autour de l'axe longitudinal, comme dans un arbre de transmission (moteur, hélice, tournevis). Le traitement suit une logique tout à fait analogue à celle de la flexion — hypothèse cinématique simplificatrice, contraintes associées, équation différentielle — appliquée cette fois à une géométrie cylindrique.</p>

    <h3>1. Hypothèse cinématique de Coulomb</h3>
    <p>On considère une poutre cylindrique de section circulaire (ou plus généralement de révolution), soumise à un <strong>couple de torsion</strong> $M_t$ autour de son axe $x$. L'hypothèse cinématique, due à Coulomb, est l'analogue torsionnel d'Euler-Bernoulli :</p>
    <div class="key-point">
      <span class="eyebrow">Hypothèse de Coulomb</span>
      Chaque section droite reste plane et tourne <strong>en bloc</strong> autour de l'axe $x$, sans se déformer dans son propre plan (pas de gauchissement) — seul l'angle de rotation $\\theta(x)$ de chaque section varie le long de la poutre.
    </div>
    <p>On définit l'<strong>angle de torsion unitaire</strong> $\\alpha = d\\theta/dx$ (rotation relative entre deux sections voisines, par unité de longueur), supposé <strong>constant</strong> le long de la poutre pour un couple de torsion uniforme.</p>

    <h3>2. Champ de déplacement et déformation en torsion</h3>
    <p>Sous cette hypothèse, un point situé à une distance $r$ de l'axe, dans la section d'abscisse $x$, subit un déplacement orthoradial $u_\\theta = r\\,\\theta(x) = r\\alpha x$. Ce déplacement génère une <strong>distorsion angulaire</strong> pure (analogue au cisaillement simple du chapitre 2), sans aucune dilatation :</p>
    <div class="formula-box">$$\\gamma(r) = r\\,\\alpha$$</div>
    <p>La distorsion — et donc la contrainte de cisaillement associée — croît <strong>linéairement</strong> avec la distance à l'axe : elle est nulle au centre, maximale à la périphérie de la section.</p>

    <h3>3. Contrainte de cisaillement et moment de torsion</h3>
    <p>Avec la loi de Hooke isotrope (chapitre 5), la contrainte de cisaillement associée est $\\tau(r) = G\\gamma(r) = G\\alpha r$, où $G$ est le module de cisaillement. En intégrant le moment de ces contraintes sur toute la section (analogue à l'intégration du moment fléchissant, chapitre 6), on définit le <strong>moment quadratique polaire</strong> $I_0 = \\displaystyle\\int_S r^2\\,dS$, ce qui donne :</p>
    <div class="formula-box">$$\\boxed{\\ M_t = GI_0\\,\\alpha, \\qquad \\tau(r) = \\frac{M_t\\,r}{I_0}\\ }$$</div>
    <p>Pour une section circulaire pleine de rayon $R$, un calcul direct donne $I_0 = \\pi R^4/2$ ; pour un arbre creux (tube) de rayons intérieur $R_1$ et extérieur $R_2$, $I_0=\\pi(R_2^4-R_1^4)/2$ — un résultat qui explique pourquoi les arbres de transmission sont souvent conçus <strong>creux</strong> : à masse de matière égale, un tube a un $I_0$ bien supérieur à une section pleine (la matière proche de l'axe, peu sollicitée, contribue peu à la résistance en torsion).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi un arbre creux résiste mieux</span>
      La contrainte de cisaillement étant maximale à la périphérie et nulle au centre (formule $\\tau=M_tr/I_0$), le matériau proche de l'axe d'un arbre plein est très peu sollicité — retirer cette matière (pour faire un tube) réduit peu la résistance en torsion, mais réduit fortement la masse : c'est un principe d'optimisation structurale essentiel en ingénierie mécanique.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un arbre de transmission cylindrique plein, de rayon $R=2\\,\\text{cm}$, en acier ($G=80\\,\\text{GPa}$), transmet un couple $M_t=500\\,\\text{N}\\cdot\\text{m}$. Calculer la contrainte de cisaillement maximale.</p>
      <p><strong>Solution :</strong> $I_0 = \\dfrac{\\pi R^4}{2} = \\dfrac{\\pi\\times(0{,}02)^4}{2} \\approx 2{,}51\\times10^{-7}\\,\\text{m}^4$. La contrainte est maximale en $r=R$ : $\\tau_{max} = \\dfrac{M_t R}{I_0} = \\dfrac{500\\times 0{,}02}{2{,}51\\times10^{-7}}$.</p>
      <p class="example-answer">$\\tau_{max} \\approx 4{,}0\\times10^7\\,\\text{Pa} = 40\\,\\text{MPa}$ — une valeur à comparer à la limite d'élasticité en cisaillement de l'acier (typiquement quelques centaines de MPa) pour vérifier que l'arbre reste dans son domaine élastique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Hypothèse de Coulomb : chaque section tourne en bloc, sans se déformer dans son plan ; angle de torsion unitaire $\\alpha=d\\theta/dx$</li>
        <li>Distorsion $\\gamma(r)=r\\alpha$ et contrainte de cisaillement $\\tau(r)=G\\alpha r$ : croissantes linéairement avec la distance à l'axe</li>
        <li>Relation moment-torsion : $M_t = GI_0\\alpha$, avec $I_0=\\int_Sr^2dS$ le moment quadratique polaire</li>
        <li>À masse égale, un arbre creux résiste mieux en torsion qu'un arbre plein (le centre, peu sollicité, contribue peu)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre moment quadratique de flexion $I=\\int y^2dS$ (chapitre 6, par rapport à un axe) et moment quadratique polaire $I_0=\\int r^2dS$ (par rapport à un point, l'axe de la poutre)</li>
        <li>Oublier que $\\tau(r)$ est nulle au centre et maximale en périphérie : une erreur fréquente est de croire la contrainte uniforme sur la section</li>
        <li>Utiliser le module d'Young $E$ au lieu du module de cisaillement $G$ dans les formules de torsion</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Selon l'hypothèse de Coulomb, chaque section droite d'une poutre en torsion :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd7e1" value="wrong"> se déforme fortement dans son plan</label>
          <label class="option"><input type="radio" name="msd7e1" value="right"> reste plane et tourne en bloc autour de l'axe</label>
          <label class="option"><input type="radio" name="msd7e1" value="wrong"> disparaît</label>
          <label class="option"><input type="radio" name="msd7e1" value="wrong"> s'allonge dans la direction axiale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd7e1','msd7fb1','Correct — c\\'est l\\'hypothèse de Coulomb, l\\'analogue torsionnel d\\'Euler-Bernoulli.','Relis l\\'énoncé exact de l\\'hypothèse de Coulomb dans le cours.')">Vérifier</button>
        <div class="feedback" id="msd7fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La contrainte de cisaillement $\\tau(r)$ dans une poutre en torsion est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd7e2" value="wrong"> uniforme sur toute la section</label>
          <label class="option"><input type="radio" name="msd7e2" value="right"> nulle au centre, maximale en périphérie</label>
          <label class="option"><input type="radio" name="msd7e2" value="wrong"> maximale au centre, nulle en périphérie</label>
          <label class="option"><input type="radio" name="msd7e2" value="wrong"> toujours nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd7e2','msd7fb2','Correct — τ(r)=Mtr/I0 croît linéairement avec r : nulle au centre (r=0), maximale au rayon extérieur.','Relis la formule encadrée du cours pour τ(r).')">Vérifier</button>
        <div class="feedback" id="msd7fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pourquoi un arbre de transmission creux (tube) peut-il être aussi résistant en torsion qu'un arbre plein, pour une masse moindre ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd7e3" value="wrong"> parce que le module de cisaillement $G$ du tube est plus grand</label>
          <label class="option"><input type="radio" name="msd7e3" value="right"> parce que la matière proche de l'axe, peu sollicitée en torsion, contribue peu à la résistance</label>
          <label class="option"><input type="radio" name="msd7e3" value="wrong"> parce que le couple de torsion y est plus faible</label>
          <label class="option"><input type="radio" name="msd7e3" value="wrong"> ce n'est pas possible, un arbre creux est toujours moins résistant</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd7e3','msd7fb3','Correct — la contrainte étant nulle au centre et maximale en périphérie, retirer la matière centrale (peu sollicitée) réduit peu I0 mais beaucoup la masse : c\\'est un principe d\\'optimisation classique.','Relis le point clé du cours sur pourquoi un arbre creux résiste mieux.')">Vérifier</button>
        <div class="feedback" id="msd7fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Torsion des poutres cylindriques")] = {
  intro: "Salut, moi c'est Nova ! On étudie la torsion des poutres cylindriques. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/coulomb|hypoth[èe]se.*torsion/i, replies:[
      "L'hypothèse de Coulomb : chaque section droite reste plane et tourne en bloc autour de l'axe, sans se déformer dans son propre plan — l'analogue torsionnel d'Euler-Bernoulli."
    ]},
    { test:/moment quadratique polaire|I0/i, replies:[
      "Le moment quadratique polaire I0=∫r²dS caractérise la résistance en torsion d'une section. Pour un cylindre plein de rayon R, I0=πR⁴/2."
    ]},
    { test:/contrainte de cisaillement|τ\(r\)/i, replies:[
      "τ(r)=Mtr/I0 : la contrainte de cisaillement en torsion croît linéairement avec la distance à l'axe, nulle au centre, maximale en périphérie."
    ]},
    { test:/arbre creux|tube/i, replies:[
      "Un arbre creux résiste presque aussi bien qu'un arbre plein en torsion (car le centre est peu sollicité), pour une masse bien moindre — un principe d'optimisation classique en ingénierie."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis l'énoncé exact de l'hypothèse de Coulomb.",
      "Indice niveau 2 : ça concerne le mouvement de la section, pas sa déformation interne.",
      "Indice niveau 3 : elle reste plane et tourne en bloc."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule encadrée du cours pour τ(r).",
      "Indice niveau 2 : τ dépend linéairement de r.",
      "Indice niveau 3 : nulle en r=0, maximale au rayon extérieur."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le point clé du cours sur pourquoi un arbre creux résiste bien.",
      "Indice niveau 2 : pense à où se trouve la matière peu sollicitée.",
      "Indice niveau 3 : c'est le centre, où la contrainte est presque nulle."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
MSD_CHAPTERS[msdKey("Énergie de déformation élastique et critères de rupture")] = {
  objectives: [
    "Établir l'expression de la densité d'énergie de déformation élastique",
    "Retrouver la symétrie du tenseur de rigidité à partir de l'existence d'un potentiel élastique",
    "Distinguer domaine élastique, plastique et rupture sur une courbe contrainte-déformation",
    "Énoncer le critère de Tresca et le critère de von Mises pour la limite d'élasticité"
  ],
  prereqs: ["Théorie des poutres : flexion et modèle d'Euler-Bernoulli", "Torsion des poutres cylindriques"],
  bodyHtml: `
    <p>Ce dernier chapitre relie la mécanique des solides déformables à deux préoccupations très concrètes de l'ingénierie : quelle <strong>énergie</strong> est stockée dans un solide déformé élastiquement, et à partir de quel niveau de contrainte le matériau cesse-t-il de se comporter élastiquement — les <strong>critères de rupture</strong> (ou de plastification), essentiels pour dimensionner toute structure en toute sécurité.</p>

    <h3>1. Densité d'énergie de déformation élastique</h3>
    <p>Lorsqu'un solide élastique est chargé progressivement depuis l'état non déformé jusqu'à l'état $(\\boldsymbol\\sigma,\\boldsymbol\\varepsilon)$, le travail des forces internes, stocké de façon réversible (par définition de l'élasticité, chapitre 4), définit la <strong>densité d'énergie de déformation</strong> :</p>
    <div class="formula-box">$$w(\\boldsymbol\\varepsilon) = \\frac{1}{2}\\,\\boldsymbol\\sigma : \\boldsymbol\\varepsilon = \\frac{1}{2}\\sigma_{ij}\\varepsilon_{ij}$$</div>
    <p>Le facteur $\\frac12$ est caractéristique d'un comportement linéaire : la contrainte croît proportionnellement à la déformation au cours du chargement, donc le travail est l'aire d'un triangle (comme l'énergie potentielle élastique $\\frac12 k x^2$ d'un ressort, chargé progressivement de $0$ à $x$).</p>

    <h3>2. L'existence d'un potentiel justifie la symétrie majeure de $\\mathbb C$</h3>
    <p>Pour que $w$ soit une fonction d'état bien définie (indépendante du chemin de chargement suivi pour atteindre $\\boldsymbol\\varepsilon$ — une exigence physique raisonnable pour un processus réversible), il faut que $w$ dérive d'un <strong>potentiel</strong> : $\\sigma_{ij} = \\partial w/\\partial \\varepsilon_{ij}$. En reportant la loi de Hooke $\\sigma_{ij}=C_{ijkl}\\varepsilon_{kl}$, l'égalité des dérivées croisées de $w$ (théorème de Schwarz) impose exactement la symétrie majeure annoncée sans démonstration au chapitre 4 :</p>
    <div class="formula-box">$$C_{ijkl} = C_{klij}$$</div>
    <p>C'est cette symétrie — une conséquence directe de l'existence d'une énergie élastique bien définie — qui réduit le nombre de constantes indépendantes de 36 à 21 (chapitre 4).</p>

    <h3>3. Domaines élastique, plastique et rupture</h3>
    <p>La courbe contrainte-déformation d'un essai de traction simple, obtenue expérimentalement, présente typiquement plusieurs régimes successifs :</p>
    <table class="mini-table">
      <tr><th>Domaine</th><th>Comportement</th><th>Réversibilité</th></tr>
      <tr><td>Élastique ($\\sigma < \\sigma_e$)</td><td>linéaire, loi de Hooke (ce cours)</td><td>totale : retour à $\\varepsilon=0$ si $\\sigma\\to 0$</td></tr>
      <tr><td>Plastique ($\\sigma > \\sigma_e$)</td><td>non linéaire, écrouissage</td><td>partielle : déformation résiduelle après décharge</td></tr>
      <tr><td>Rupture ($\\sigma = \\sigma_R$)</td><td>striction puis séparation du matériau</td><td>aucune</td></tr>
    </table>
    <p>La contrainte $\\sigma_e$ marquant la fin du domaine élastique est la <strong>limite d'élasticité</strong> (ou limite élastique), une propriété caractéristique de chaque matériau (typiquement $200$–$400\\,\\text{MPa}$ pour un acier de construction courant). C'est cette limite, et non la limite de rupture $\\sigma_R$ (bien supérieure), que le dimensionnement des structures cherche à ne jamais dépasser, avec une marge de sécurité substantielle.</p>

    <h3>4. Critères de limite d'élasticité en sollicitation multiaxiale</h3>
    <p>La limite d'élasticité $\\sigma_e$ est mesurée en traction simple — mais dans une structure réelle, l'état de contrainte est en général <strong>multiaxial</strong> (plusieurs $\\sigma_{ij}$ non nuls simultanément, chapitre 3). Un <strong>critère de plasticité</strong> permet de prédire, à partir de l'état de contrainte complet, si le matériau reste élastique ou commence à plastifier. Deux critères, tous deux fondés sur l'idée physique que c'est le <strong>cisaillement</strong> (pas la pression hydrostatique) qui déclenche la plasticité des métaux, sont les plus utilisés :</p>
    <div class="key-point">
      <span class="eyebrow">Critère de Tresca (cisaillement maximal)</span>
      Le matériau plastifie quand la contrainte de cisaillement maximale (chapitre 3) atteint sa valeur critique en traction simple :
      $$\\tau_{max} = \\frac{\\sigma_1-\\sigma_3}{2} \\geq \\frac{\\sigma_e}{2} \\quad \\Longleftrightarrow \\quad \\sigma_1-\\sigma_3 \\geq \\sigma_e$$
    </div>
    <div class="key-point">
      <span class="eyebrow">Critère de von Mises (énergie de distorsion)</span>
      Le matériau plastifie quand une combinaison quadratique des contraintes principales, liée à l'énergie de <em>distorsion</em> (la partie de l'énergie élastique associée au changement de forme, par exclusion du changement de volume), atteint sa valeur critique :
      $$\\sqrt{\\frac{(\\sigma_1-\\sigma_2)^2+(\\sigma_2-\\sigma_3)^2+(\\sigma_3-\\sigma_1)^2}{2}} \\geq \\sigma_e$$
    </div>
    <p>Les deux critères coïncident exactement en traction simple (par construction), mais diffèrent légèrement pour des états de contrainte plus complexes (von Mises, légèrement moins conservatif, décrit en général mieux le comportement expérimental des métaux ductiles).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un acier a $\\sigma_e=250\\,\\text{MPa}$. Un état de contrainte a pour contraintes principales $\\sigma_1=200\\,\\text{MPa}$, $\\sigma_2=100\\,\\text{MPa}$, $\\sigma_3=0$. Le matériau a-t-il plastifié selon le critère de Tresca ?</p>
      <p><strong>Solution :</strong> $\\sigma_1-\\sigma_3 = 200-0=200\\,\\text{MPa}$.</p>
      <p class="example-answer">$200\\,\\text{MPa} < \\sigma_e=250\\,\\text{MPa}$ : le matériau reste dans le domaine élastique selon le critère de Tresca — mais avec une marge assez faible (seulement $20\\%$), qui inviterait un ingénieur prudent à revoir le dimensionnement.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Densité d'énergie de déformation élastique : $w = \\frac12\\boldsymbol\\sigma:\\boldsymbol\\varepsilon$, analogue de $\\frac12kx^2$ pour un ressort</li>
        <li>L'existence de ce potentiel impose la symétrie majeure $C_{ijkl}=C_{klij}$, réduisant les constantes élastiques de 36 à 21 (chapitre 4)</li>
        <li>Trois domaines : élastique (réversible), plastique (déformation résiduelle), rupture</li>
        <li>Critères de plasticité multiaxiale : Tresca ($\\sigma_1-\\sigma_3\\geq\\sigma_e$) et von Mises (combinaison quadratique des écarts de contraintes principales)</li>
      </ul>
    </div>

    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre limite d'élasticité $\\sigma_e$ (fin du comportement réversible, celle qu'on ne doit jamais dépasser en dimensionnement) et limite de rupture $\\sigma_R$ (bien supérieure, correspondant à la séparation du matériau)</li>
        <li>Appliquer directement $\\sigma_e$ (mesurée en traction simple) à un état de contrainte multiaxial sans passer par un critère (Tresca ou von Mises)</li>
        <li>Oublier le facteur $\\frac12$ dans $w=\\frac12\\boldsymbol\\sigma:\\boldsymbol\\varepsilon$, caractéristique d'un chargement linéaire progressif</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La densité d'énergie de déformation élastique s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd8e1" value="wrong"> $w = \\boldsymbol\\sigma:\\boldsymbol\\varepsilon$</label>
          <label class="option"><input type="radio" name="msd8e1" value="right"> $w = \\frac12\\boldsymbol\\sigma:\\boldsymbol\\varepsilon$</label>
          <label class="option"><input type="radio" name="msd8e1" value="wrong"> $w = \\boldsymbol\\sigma + \\boldsymbol\\varepsilon$</label>
          <label class="option"><input type="radio" name="msd8e1" value="wrong"> $w = 2\\boldsymbol\\sigma:\\boldsymbol\\varepsilon$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd8e1','msd8fb1','Correct — w=½σ:ε, avec le facteur ½ caractéristique d\\'un chargement linéaire progressif, exactement comme ½kx² pour un ressort.','Relis la formule encadrée du cours pour w.')">Vérifier</button>
        <div class="feedback" id="msd8fb1"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Après avoir dépassé la limite d'élasticité $\\sigma_e$ puis être redescendu à $\\sigma=0$, un matériau élasto-plastique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd8e2" value="wrong"> retrouve exactement sa forme initiale</label>
          <label class="option"><input type="radio" name="msd8e2" value="right"> conserve une déformation résiduelle</label>
          <label class="option"><input type="radio" name="msd8e2" value="wrong"> se rompt immédiatement</label>
          <label class="option"><input type="radio" name="msd8e2" value="wrong"> devient un fluide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd8e2','msd8fb2','Correct — c\\'est précisément la différence entre domaine élastique (réversible) et domaine plastique (déformation résiduelle après décharge).','Relis le tableau du cours sur les domaines élastique, plastique et rupture.')">Vérifier</button>
        <div class="feedback" id="msd8fb2"></div>
      </div>

      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le critère de Tresca prédit la plastification quand :</p>
        <div class="options">
          <label class="option"><input type="radio" name="msd8e3" value="wrong"> $\\sigma_1+\\sigma_3 \\geq \\sigma_e$</label>
          <label class="option"><input type="radio" name="msd8e3" value="right"> $\\sigma_1-\\sigma_3 \\geq \\sigma_e$</label>
          <label class="option"><input type="radio" name="msd8e3" value="wrong"> $\\sigma_1\\times\\sigma_3 \\geq \\sigma_e$</label>
          <label class="option"><input type="radio" name="msd8e3" value="wrong"> $\\sigma_2 \\geq \\sigma_e$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('msd8e3','msd8fb3','Correct — le critère de Tresca compare l\\'écart entre la plus grande et la plus petite contrainte principale à la limite d\\'élasticité, lié au cisaillement maximal.','Relis l\\'encadré du cours sur le critère de Tresca.')">Vérifier</button>
        <div class="feedback" id="msd8fb3"></div>
      </div>
    </div>
  `
};

MSD_NOVA_KB[msdKey("Énergie de déformation élastique et critères de rupture")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : énergie de déformation élastique et critères de rupture. Demande-moi une explication, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]nergie de d[ée]formation|\\bw\\b/i, replies:[
      "La densité d'énergie de déformation w=½σ:ε est l'analogue solide de ½kx² pour un ressort — le facteur ½ vient du chargement progressif et linéaire."
    ]},
    { test:/limite d.[ée]lasticit[ée]|σe/i, replies:[
      "La limite d'élasticité σe marque la fin du comportement réversible : au-delà, le matériau plastifie et conserve une déformation résiduelle après décharge. C'est elle qu'on ne doit jamais dépasser en dimensionnement, pas la limite de rupture σR (bien supérieure)."
    ]},
    { test:/tresca/i, replies:[
      "Le critère de Tresca prédit la plastification quand σ1−σ3≥σe (l'écart entre la plus grande et la plus petite contrainte principale), lié au cisaillement maximal."
    ]},
    { test:/von mises/i, replies:[
      "Le critère de von Mises utilise une combinaison quadratique des écarts entre contraintes principales, liée à l'énergie de distorsion — il décrit généralement mieux le comportement des métaux ductiles que Tresca."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule encadrée du cours pour w.",
      "Indice niveau 2 : il y a un facteur numérique devant σ:ε.",
      "Indice niveau 3 : w=½σ:ε."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau du cours sur les trois domaines.",
      "Indice niveau 2 : ça concerne le domaine plastique, pas élastique.",
      "Indice niveau 3 : il conserve une déformation résiduelle."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis l'encadré du cours sur le critère de Tresca.",
      "Indice niveau 2 : c'est une différence, pas une somme ni un produit.",
      "Indice niveau 3 : σ1−σ3≥σe."
    ]}
  ]
};

/* fusionne le module Mécanique des solides déformables dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MSD_CHAPTERS);
Object.assign(NOVA_KB, MSD_NOVA_KB);