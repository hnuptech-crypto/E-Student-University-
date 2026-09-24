/* =====================================================================
   CHUNK « mathphys » — registre MATHPHYS_CHAPTERS / MATHPHYS_NOVA_KB
   Matière(s) : Mathématiques|Méthodes mathématiques pour la physique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MATHPHYS_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — MÉTHODES MATHÉMATIQUES POUR LA PHYSIQUE (L3PF, domaine Mathématiques)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Ce cours fournit la boîte à outils analytique indispensable aux cours de physique
   de L3 (mécanique quantique, ondes, électromagnétisme) : analyse vectorielle en
   coordonnées curvilignes, séries et transformée de Fourier, analyse complexe et
   théorème des résidus, résolution d'équations différentielles par séries entières
   (méthode de Frobenius), fonctions spéciales (Legendre, Bessel), équations aux
   dérivées partielles de la physique par séparation des variables, distributions et
   fonctions de Green. Il complète, sur un plan analytique exact, le cours "Méthodes
   numériques" (approximation et convergence) et prépare directement les outils du
   cours de mécanique quantique et d'électromagnétisme. Références de fond : G.B.
   Arfken, H.J. Weber & F.E. Harris, Mathematical Methods for Physicists (Academic
   Press) ; M.L. Boas, Mathematical Methods in the Physical Sciences (Wiley) ; W. Appel,
   Mathématiques pour la physique et les physiciens (H&K).
===================================================================================== */
const MATHPHYS_MATIERE = 'Méthodes mathématiques pour la physique';
function mmpKey(chapterTitle){ return `Mathématiques|${MATHPHYS_MATIERE}|${chapterTitle}`; }
const MATHPHYS_CHAPTERS = {};
const MATHPHYS_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Opérateurs différentiels et analyse vectorielle en coordonnées curvilignes")] = {
  objectives: [
    "Exprimer gradient, divergence, rotationnel et laplacien en coordonnées cartésiennes, cylindriques et sphériques",
    "Construire les facteurs d'échelle d'un système de coordonnées curvilignes orthogonales",
    "Démontrer et utiliser les identités vectorielles fondamentales (rot(grad)=0, div(rot)=0)",
    "Appliquer les théorèmes de Green-Ostrogradski et de Stokes"
  ],
  prereqs: ["Analyse vectorielle (L2)", "Calcul différentiel à plusieurs variables (L2)"],
  bodyHtml: `
    <p>La quasi-totalité des lois fondamentales de la physique (équations de Maxwell, équation de Schrödinger, équations de la mécanique des fluides) s'expriment à l'aide des opérateurs différentiels vectoriels. Savoir les manier dans le système de coordonnées le mieux adapté à la symétrie du problème est une compétence essentielle du physicien.</p>

    <h3>1. Les opérateurs différentiels fondamentaux</h3>
    <p>En coordonnées cartésiennes $(x,y,z)$, les quatre opérateurs de base s'écrivent simplement à l'aide de l'opérateur nabla $\\vec\\nabla = (\\partial_x, \\partial_y, \\partial_z)$ :</p>
    <table class="mini-table">
      <tr><th>Opérateur</th><th>Action</th><th>Nature du résultat</th></tr>
      <tr><td>Gradient</td><td>$\\vec\\nabla f$</td><td>Champ scalaire → champ vectoriel</td></tr>
      <tr><td>Divergence</td><td>$\\vec\\nabla\\cdot\\vec{A}$</td><td>Champ vectoriel → champ scalaire</td></tr>
      <tr><td>Rotationnel</td><td>$\\vec\\nabla\\times\\vec{A}$</td><td>Champ vectoriel → champ vectoriel</td></tr>
      <tr><td>Laplacien</td><td>$\\Delta f = \\vec\\nabla\\cdot(\\vec\\nabla f)$</td><td>Champ scalaire → champ scalaire</td></tr>
    </table>

    <h3>2. Coordonnées curvilignes orthogonales et facteurs d'échelle</h3>
    <p>De nombreux problèmes physiques présentent une symétrie (cylindrique, sphérique) qui rend leur traitement bien plus naturel dans un système de coordonnées adapté $(q_1,q_2,q_3)$ que dans les coordonnées cartésiennes. On introduit les <strong>facteurs d'échelle</strong> $h_i$, définis par $ds^2 = h_1^2\\,dq_1^2 + h_2^2\\,dq_2^2 + h_3^2\\,dq_3^2$ (élément de longueur au carré), qui mesurent comment une variation infinitésimale de $q_i$ se traduit en distance physique réelle.</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Coordonnées</th><th>Facteurs d'échelle $(h_1,h_2,h_3)$</th></tr>
      <tr><td>Cartésiennes</td><td>$(x,y,z)$</td><td>$(1,1,1)$</td></tr>
      <tr><td>Cylindriques</td><td>$(\\rho,\\varphi,z)$</td><td>$(1,\\rho,1)$</td></tr>
      <tr><td>Sphériques</td><td>$(r,\\theta,\\varphi)$</td><td>$(1,r,r\\sin\\theta)$</td></tr>
    </table>
    <p>À partir de ces facteurs d'échelle, les opérateurs différentiels s'expriment de façon générale (formules de Lamé) ; par exemple, le <strong>gradient</strong> s'écrit dans tout système orthogonal :</p>
    <div class="formula-box">$$\\vec\\nabla f = \\sum_{i=1}^{3} \\dfrac{1}{h_i}\\dfrac{\\partial f}{\\partial q_i}\\,\\hat{e}_i$$</div>

    <h3>3. Le laplacien en coordonnées sphériques</h3>
    <p>Le laplacien en coordonnées sphériques $(r,\\theta,\\varphi)$, omniprésent en mécanique quantique (atome d'hydrogène) et en électromagnétisme (potentiel d'une charge ponctuelle), s'écrit :</p>
    <div class="formula-box">$$\\Delta f = \\dfrac{1}{r^2}\\dfrac{\\partial}{\\partial r}\\!\\left(r^2\\dfrac{\\partial f}{\\partial r}\\right) + \\dfrac{1}{r^2\\sin\\theta}\\dfrac{\\partial}{\\partial \\theta}\\!\\left(\\sin\\theta\\dfrac{\\partial f}{\\partial \\theta}\\right) + \\dfrac{1}{r^2\\sin^2\\theta}\\dfrac{\\partial^2 f}{\\partial \\varphi^2}$$</div>
    <p>Cette expression, bien que plus complexe que son équivalent cartésien $\\Delta f = \\partial_x^2f+\\partial_y^2f+\\partial_z^2f$, se révèle décisive pour résoudre par <strong>séparation des variables</strong> (chapitre 7) les problèmes à symétrie sphérique, comme l'équation de Schrödinger de l'atome d'hydrogène.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le choix du système de coordonnées n'est jamais neutre : un problème à symétrie sphérique traité en cartésiennes conduit à des équations aux dérivées partielles couplées extrêmement difficiles à résoudre, alors que le même problème, correctement exprimé en coordonnées sphériques, se sépare souvent en équations différentielles ordinaires indépendantes, bien plus abordables.
    </div>

    <h3>4. Identités vectorielles fondamentales</h3>
    <p>Deux identités, d'apparence anodine, structurent une grande partie de la physique des champs (électromagnétisme notamment) :</p>
    <div class="formula-box">$$\\vec\\nabla\\times(\\vec\\nabla f) = \\vec{0} \\qquad \\vec\\nabla\\cdot(\\vec\\nabla\\times\\vec{A}) = 0$$</div>
    <p>La première identité justifie l'existence d'un <strong>potentiel scalaire</strong> pour tout champ irrotationnel (ex : champ électrostatique $\\vec{E}=-\\vec\\nabla V$) ; la seconde justifie l'existence d'un <strong>potentiel vecteur</strong> pour tout champ à divergence nulle (ex : champ magnétique $\\vec{B}=\\vec\\nabla\\times\\vec{A}$) — un résultat qui structure directement la formulation des équations de Maxwell.</p>

    <h3>5. Les théorèmes intégraux</h3>
    <p>Le <strong>théorème de Green-Ostrogradski</strong> (théorème de la divergence) relie une intégrale de volume à une intégrale de surface :</p>
    <div class="formula-box">$$\\iiint_{V} (\\vec\\nabla\\cdot\\vec{A})\\,dV = \\oiint_{\\partial V} \\vec{A}\\cdot d\\vec{S}$$</div>
    <p>Le <strong>théorème de Stokes</strong> relie une intégrale de surface (du rotationnel) à une intégrale de contour sur le bord de cette surface :</p>
    <div class="formula-box">$$\\iint_{S} (\\vec\\nabla\\times\\vec{A})\\cdot d\\vec{S} = \\oint_{\\partial S} \\vec{A}\\cdot d\\vec{\\ell}$$</div>
    <p>Ces deux théorèmes permettent de passer, dans les lois de la physique, entre formulation <strong>locale</strong> (équations différentielles en un point) et formulation <strong>intégrale</strong> (bilans sur un volume ou un contour) — la double lecture indispensable des équations de Maxwell, par exemple.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Calculer le laplacien de la fonction $f(r) = 1/r$ (potentiel coulombien, hors de l'origine) en coordonnées sphériques.</p>
      <p><strong>Solution :</strong> $f$ ne dépend que de $r$, donc seule la partie radiale du laplacien intervient : $\\Delta f = \\dfrac{1}{r^2}\\dfrac{d}{dr}\\!\\left(r^2 \\dfrac{d}{dr}\\dfrac{1}{r}\\right) = \\dfrac{1}{r^2}\\dfrac{d}{dr}\\!\\left(r^2\\times\\left(-\\dfrac{1}{r^2}\\right)\\right) = \\dfrac{1}{r^2}\\dfrac{d}{dr}(-1) = 0$.</p>
      <p class="example-answer">Réponse : $\\Delta(1/r) = 0$ pour $r\\ne0$ — un résultat fondamental, à l'origine du fait que le potentiel coulombien est harmonique partout sauf à l'origine, où il présente une singularité traitée au chapitre 8 via la fonction delta de Dirac.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Gradient, divergence, rotationnel et laplacien sont les quatre opérateurs différentiels fondamentaux de la physique des champs</li>
      <li>Les facteurs d'échelle (1,1,1) cartésien, (1,ρ,1) cylindrique, (1,r,r sinθ) sphérique permettent d'exprimer ces opérateurs dans tout système de coordonnées orthogonales</li>
      <li>rot(grad f)=0 et div(rot A)=0 justifient respectivement l'existence de potentiels scalaire et vecteur</li>
      <li>Les théorèmes de Green-Ostrogradski et de Stokes relient formulations locale et intégrale des lois physiques</li>
      <li>Le choix du système de coordonnées adapté à la symétrie du problème simplifie radicalement sa résolution</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Appliquer les formules cartésiennes du laplacien telles quelles en coordonnées sphériques ou cylindriques</li>
      <li>Oublier les facteurs d'échelle lors du passage d'un système de coordonnées à un autre</li>
      <li>Confondre théorème de Green-Ostrogradski (volume ↔ surface fermée) et théorème de Stokes (surface ↔ contour fermé)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est le facteur d'échelle associé à la coordonnée angulaire φ en coordonnées cylindriques (ρ,φ,z) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp1e1" value="wrong">1</label>
        <label class="option"><input type="radio" name="mmp1e1" value="right">ρ</label>
        <label class="option"><input type="radio" name="mmp1e1" value="wrong">ρ²</label>
        <label class="option"><input type="radio" name="mmp1e1" value="wrong">sin(φ)</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp1e1','mmp1fb1','Correct — en cylindriques, (h1,h2,h3)=(1,ρ,1) : le facteur associé à φ est ρ.','Relis le tableau des facteurs d\\'échelle en coordonnées cylindriques.')">Vérifier</button>
      <div class="feedback" id="mmp1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">L'identité rot(grad f) = 0 justifie l'existence de quel type de potentiel ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp1e2" value="right">Un potentiel scalaire, pour tout champ irrotationnel</label>
        <label class="option"><input type="radio" name="mmp1e2" value="wrong">Un potentiel vecteur, pour tout champ à divergence nulle</label>
        <label class="option"><input type="radio" name="mmp1e2" value="wrong">Aucun potentiel particulier</label>
        <label class="option"><input type="radio" name="mmp1e2" value="wrong">Un potentiel uniquement en coordonnées sphériques</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp1e2','mmp1fb2','Correct — c\\'est l\\'identité rot(grad f)=0 qui justifie qu\\'un champ irrotationnel dérive d\\'un potentiel scalaire (ex : champ électrostatique E=−∇V).','Relis la section sur les identités vectorielles fondamentales : quelle identité est associée au potentiel scalaire ?')">Vérifier</button>
      <div class="feedback" id="mmp1fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Opérateurs différentiels et analyse vectorielle en coordonnées curvilignes")] = {
  intro: "Salut, moi c'est Nova ! On démarre les méthodes mathématiques pour la physique par l'analyse vectorielle en coordonnées curvilignes. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/facteur d.[ée]chelle/i, replies:[
      "Facteurs d'échelle : (1,1,1) en cartésiennes, (1,ρ,1) en cylindriques, (1,r,r sinθ) en sphériques. Ils permettent d'exprimer gradient, divergence, rotationnel et laplacien dans tout système orthogonal."
    ]},
    { test:/laplacien.*sph[ée]rique|sph[ée]rique.*laplacien/i, replies:[
      "Le laplacien en sphériques comporte une partie radiale (1/r²)∂r(r²∂rf) et une partie angulaire. Il est central pour l'atome d'hydrogène (mécanique quantique)."
    ]},
    { test:/rot\\(grad\\)|div\\(rot\\)|identit[ée] vectorielle/i, replies:[
      "rot(grad f)=0 justifie l'existence d'un potentiel scalaire pour tout champ irrotationnel. div(rot A)=0 justifie l'existence d'un potentiel vecteur pour tout champ à divergence nulle."
    ]},
    { test:/stokes|green.ostrogradski|th[ée]or[èe]me int[ée]gral/i, replies:[
      "Green-Ostrogradski relie une intégrale de volume de la divergence à une intégrale de surface fermée. Stokes relie une intégrale de surface du rotationnel à une intégrale sur le contour fermé qui la borde."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le tableau des facteurs d'échelle en cylindriques.",
      "Indice niveau 2 : (h1,h2,h3)=(1,ρ,1) pour (ρ,φ,z).",
      "Indice niveau 3 : le facteur associé à φ est donc ρ."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis les deux identités vectorielles fondamentales et à quoi chacune correspond.",
      "Indice niveau 2 : rot(grad f)=0 concerne les champs irrotationnels.",
      "Indice niveau 3 : cela justifie l'existence d'un potentiel scalaire."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Séries de Fourier et transformée de Fourier")] = {
  objectives: [
    "Décomposer une fonction périodique en série de Fourier (coefficients réels et complexes)",
    "Énoncer les conditions de Dirichlet et le phénomène de Gibbs",
    "Définir la transformée de Fourier et ses propriétés fondamentales (dérivation, convolution)",
    "Établir l'identité de Parseval et son interprétation physique en termes d'énergie"
  ],
  prereqs: ["Opérateurs différentiels et analyse vectorielle en coordonnées curvilignes"],
  bodyHtml: `
    <p>L'analyse de Fourier est sans doute l'outil mathématique le plus omniprésent en physique : décomposition d'un signal en fréquences pures, résolution d'équations différentielles linéaires, formulation de la mécanique quantique (relation position-impulsion), traitement du signal, optique de diffraction.</p>

    <h3>1. Série de Fourier d'une fonction périodique</h3>
    <p>Toute fonction $f$ périodique de période $T$ (satisfaisant les conditions de régularité de Dirichlet, voir ci-dessous) se décompose en série de Fourier :</p>
    <div class="formula-box">$$f(t) = \\dfrac{a_0}{2} + \\sum_{n=1}^{\\infty}\\left[a_n\\cos(n\\omega_0 t) + b_n\\sin(n\\omega_0 t)\\right], \\qquad \\omega_0 = \\dfrac{2\\pi}{T}$$</div>
    <p>avec les coefficients de Fourier donnés par les intégrales de projection sur une période :</p>
    <div class="formula-box">$$a_n = \\dfrac{2}{T}\\int_0^T f(t)\\cos(n\\omega_0 t)\\,dt \\qquad b_n = \\dfrac{2}{T}\\int_0^T f(t)\\sin(n\\omega_0 t)\\,dt$$</div>
    <p>La forme <strong>complexe</strong>, souvent plus compacte pour les calculs, s'écrit $f(t) = \\sum_{n=-\\infty}^{\\infty} c_n\\,e^{in\\omega_0 t}$ avec $c_n = \\dfrac{1}{T}\\int_0^T f(t)\\,e^{-in\\omega_0 t}\\,dt$.</p>

    <h3>2. Conditions de Dirichlet et phénomène de Gibbs</h3>
    <p>La convergence de la série de Fourier vers $f$ est garantie (théorème de Dirichlet) si $f$ est périodique, bornée, continue par morceaux, et possède un nombre fini de maxima/minima et de discontinuités par période. En un point de discontinuité $t_0$, la série converge vers la <strong>moyenne des limites</strong> à gauche et à droite : $\\dfrac{f(t_0^-)+f(t_0^+)}{2}$.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — le phénomène de Gibbs</span>
      Au voisinage d'une discontinuité, la somme partielle de la série de Fourier présente un <strong>dépassement</strong> (« overshoot ») d'environ <strong>9 %</strong> de l'amplitude du saut, qui ne disparaît <strong>pas</strong> quand on augmente le nombre de termes de la somme — seule la largeur de la zone où ce dépassement est visible se rétrécit. C'est le <strong>phénomène de Gibbs</strong> (J.W. Gibbs, 1899), une limite fondamentale (et non un simple artefact numérique) de l'approximation d'une fonction discontinue par une somme finie de fonctions continues.
    </div>

    <h3>3. La transformée de Fourier</h3>
    <p>Pour une fonction non périodique (mais suffisamment décroissante à l'infini), on généralise la décomposition en fréquences discrètes à un <strong>continuum de fréquences</strong> via la transformée de Fourier :</p>
    <div class="formula-box">$$\\hat{f}(\\omega) = \\int_{-\\infty}^{\\infty} f(t)\\,e^{-i\\omega t}\\,dt \\qquad f(t) = \\dfrac{1}{2\\pi}\\int_{-\\infty}^{\\infty} \\hat{f}(\\omega)\\,e^{i\\omega t}\\,d\\omega$$</div>
    <p>Plusieurs propriétés rendent cet outil extrêmement puissant :</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Relation</th><th>Intérêt physique</th></tr>
      <tr><td>Dérivation</td><td>$\\widehat{f'}(\\omega) = i\\omega\\,\\hat{f}(\\omega)$</td><td>Transforme une équation différentielle en équation algébrique</td></tr>
      <tr><td>Convolution</td><td>$\\widehat{f*g} = \\hat{f}\\cdot\\hat{g}$</td><td>Simplifie le calcul de réponses de systèmes linéaires (filtrage)</td></tr>
      <tr><td>Translation</td><td>$\\widehat{f(t-a)} = e^{-i\\omega a}\\hat{f}(\\omega)$</td><td>Déphasage pur dans le domaine fréquentiel</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi la propriété de dérivation de la transformée de Fourier est-elle si utile pour résoudre des équations différentielles linéaires à coefficients constants, comme l'équation de l'oscillateur harmonique amorti forcé ?</p>
      <p><strong>Solution :</strong> En appliquant la transformée de Fourier à une équation différentielle linéaire à coefficients constants, chaque dérivée $d^n/dt^n$ se transforme en une simple multiplication par $(i\\omega)^n$. L'équation différentielle se réduit ainsi à une <strong>équation algébrique</strong> en $\\hat{f}(\\omega)$, bien plus facile à résoudre ; il suffit ensuite de transformer inversement le résultat pour revenir dans le domaine temporel.</p>
      <p class="example-answer">Réponse : la transformée de Fourier convertit la résolution d'une équation différentielle en un simple problème algébrique dans le domaine fréquentiel, ce qui explique son usage massif en physique des oscillateurs et des ondes.</p>
    </div>

    <h3>4. L'identité de Parseval</h3>
    <p>L'identité de Parseval-Plancherel relie l'énergie totale d'un signal dans le domaine temporel à son contenu fréquentiel :</p>
    <div class="formula-box">$$\\int_{-\\infty}^{\\infty} |f(t)|^2\\,dt = \\dfrac{1}{2\\pi}\\int_{-\\infty}^{\\infty} |\\hat{f}(\\omega)|^2\\,d\\omega$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — interprétation physique</span>
      Cette identité affirme que l'<strong>énergie totale</strong> d'un signal (physique : énergie d'une onde, intensité lumineuse...) est conservée, qu'on la calcule dans le domaine temporel ou dans le domaine fréquentiel — c'est le fondement mathématique rigoureux qui justifie de parler du « spectre de puissance » ou de la « densité spectrale d'énergie » $|\\hat{f}(\\omega)|^2$ d'un signal physique.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une fonction périodique se décompose en série de Fourier (coefficients aₙ, bₙ, ou forme complexe cₙ) sous les conditions de Dirichlet</li>
      <li>En un point de discontinuité, la série converge vers la moyenne des limites à gauche et à droite</li>
      <li>Le phénomène de Gibbs (dépassement d'environ 9 %) est une limite structurelle, pas un artefact numérique corrigible en augmentant le nombre de termes</li>
      <li>La transformée de Fourier transforme la dérivation en multiplication par iω, et la convolution en produit simple — d'où son usage massif pour résoudre des équations différentielles linéaires</li>
      <li>L'identité de Parseval exprime la conservation de l'énergie entre domaines temporel et fréquentiel</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que le phénomène de Gibbs disparaît en ajoutant davantage de termes à la série de Fourier — seule sa largeur diminue, pas son amplitude relative</li>
      <li>Oublier la convention de normalisation (facteur 2π) lors du passage entre transformée directe et inverse</li>
      <li>Confondre série de Fourier (fonctions périodiques, fréquences discrètes) et transformée de Fourier (fonctions non périodiques, continuum de fréquences)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">En un point de discontinuité, vers quelle valeur converge la série de Fourier ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp2e1" value="wrong">La limite à gauche uniquement</label>
        <label class="option"><input type="radio" name="mmp2e1" value="wrong">La limite à droite uniquement</label>
        <label class="option"><input type="radio" name="mmp2e1" value="right">La moyenne des limites à gauche et à droite</label>
        <label class="option"><input type="radio" name="mmp2e1" value="wrong">Zéro systématiquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp2e1','mmp2fb1','Correct — c\\'est un résultat du théorème de Dirichlet : la série converge vers (f(t0⁻)+f(t0⁺))/2.','Relis le théorème de Dirichlet sur la convergence en un point de discontinuité.')">Vérifier</button>
      <div class="feedback" id="mmp2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi la transformée de Fourier est-elle si utile pour résoudre des équations différentielles linéaires à coefficients constants ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp2e2" value="wrong">Elle élimine toute dépendance temporelle du problème</label>
        <label class="option"><input type="radio" name="mmp2e2" value="right">Elle transforme chaque dérivation en une simple multiplication par iω</label>
        <label class="option"><input type="radio" name="mmp2e2" value="wrong">Elle ne fonctionne que pour les équations non linéaires</label>
        <label class="option"><input type="radio" name="mmp2e2" value="wrong">Elle rend le problème toujours périodique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp2e2','mmp2fb2','Correct — l\\'équation différentielle devient une équation algébrique en ω, bien plus simple à résoudre.','Relis la propriété de dérivation de la transformée de Fourier.')">Vérifier</button>
      <div class="feedback" id="mmp2fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Séries de Fourier et transformée de Fourier")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'analyse de Fourier : séries, transformée, Parseval. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/dirichlet/i, replies:[
      "Les conditions de Dirichlet (périodicité, continuité par morceaux, nombre fini d'extrema/discontinuités par période) garantissent la convergence de la série de Fourier. En un point de discontinuité, elle converge vers la moyenne des limites à gauche et à droite."
    ]},
    { test:/gibbs/i, replies:[
      "Le phénomène de Gibbs : un dépassement d'environ 9% au voisinage d'une discontinuité, qui ne disparaît jamais (seule sa largeur se rétrécit) quand on ajoute des termes à la série de Fourier."
    ]},
    { test:/transform[ée]e de fourier/i, replies:[
      "La transformée de Fourier généralise la série de Fourier aux fonctions non périodiques (continuum de fréquences). Sa propriété de dérivation (f'→iω·f̂) transforme les équations différentielles linéaires en équations algébriques."
    ]},
    { test:/parseval/i, replies:[
      "L'identité de Parseval exprime la conservation de l'énergie entre domaine temporel (∫|f(t)|²dt) et domaine fréquentiel (∫|f̂(ω)|²dω/2π)."
    ]},
    { test:/convolution/i, replies:[
      "La transformée de Fourier d'une convolution est le produit simple des transformées : TF(f*g) = f̂·ĝ, ce qui simplifie énormément le calcul de réponses de systèmes linéaires."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le théorème de Dirichlet sur la convergence en un point de discontinuité.",
      "Indice niveau 2 : ce n'est ni la limite à gauche seule, ni la limite à droite seule.",
      "Indice niveau 3 : c'est la moyenne des deux limites."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la propriété de dérivation de la transformée de Fourier.",
      "Indice niveau 2 : chaque dérivée devient une simple multiplication.",
      "Indice niveau 3 : par iω, ce qui transforme l'équation différentielle en équation algébrique."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Fonctions d'une variable complexe : holomorphie et séries")] = {
  objectives: [
    "Énoncer les conditions de Cauchy-Riemann caractérisant l'holomorphie",
    "Comprendre le lien entre holomorphie et harmonicité des parties réelle et imaginaire",
    "Développer une fonction holomorphe en série de Taylor et de Laurent",
    "Classifier les singularités isolées d'une fonction complexe"
  ],
  prereqs: ["Séries de Fourier et transformée de Fourier", "Nombres complexes (L1)"],
  bodyHtml: `
    <p>L'analyse complexe fournit des outils d'une puissance remarquable pour la physique : calcul d'intégrales réelles autrement inaccessibles (chapitre 4), résolution de problèmes de potentiel en deux dimensions, étude de la causalité en physique des ondes (relations de Kramers-Kronig), fonctions de Green (chapitre 8).</p>

    <h3>1. Fonctions holomorphes et conditions de Cauchy-Riemann</h3>
    <p>Une fonction $f(z) = u(x,y) + iv(x,y)$ (avec $z=x+iy$) est dite <strong>holomorphe</strong> (dérivable au sens complexe) en un point si sa dérivée $f'(z) = \\lim_{\\delta z\\to0} \\dfrac{f(z+\\delta z)-f(z)}{\\delta z}$ existe et ne dépend pas de la direction selon laquelle $\\delta z \\to 0$ dans le plan complexe — une exigence bien plus forte que la simple différentiabilité réelle en deux variables. Cette condition équivaut exactement aux <strong>conditions de Cauchy-Riemann</strong> :</p>
    <div class="formula-box">$$\\dfrac{\\partial u}{\\partial x} = \\dfrac{\\partial v}{\\partial y} \\qquad \\dfrac{\\partial u}{\\partial y} = -\\dfrac{\\partial v}{\\partial x}$$</div>

    <h3>2. Holomorphie et fonctions harmoniques</h3>
    <p>En dérivant les équations de Cauchy-Riemann une seconde fois et en les combinant, on démontre que si $f=u+iv$ est holomorphe (et deux fois continûment dérivable), alors $u$ et $v$ sont toutes deux des fonctions <strong>harmoniques</strong> :</p>
    <div class="formula-box">$$\\Delta u = \\dfrac{\\partial^2 u}{\\partial x^2} + \\dfrac{\\partial^2 u}{\\partial y^2} = 0 \\qquad \\Delta v = 0$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — application en physique</span>
      Cette propriété est directement exploitée en électrostatique et en mécanique des fluides bidimensionnelles : la partie réelle (ou imaginaire) de toute fonction holomorphe fournit automatiquement une solution de l'équation de Laplace $\\Delta\\phi=0$ — utile pour construire, par exemple, des potentiels électrostatiques ou des écoulements de fluides parfaits incompressibles en 2D, sans avoir à résoudre directement l'équation aux dérivées partielles.
    </div>

    <h3>3. Séries de Taylor et de Laurent</h3>
    <p>Une fonction holomorphe sur un disque se développe en <strong>série de Taylor</strong>, exactement comme en analyse réelle :</p>
    <div class="formula-box">$$f(z) = \\sum_{n=0}^{\\infty} \\dfrac{f^{(n)}(z_0)}{n!}(z-z_0)^n$$</div>
    <p>Mais lorsque $f$ possède une <strong>singularité</strong> en $z_0$ (point où elle n'est pas holomorphe), on utilise la <strong>série de Laurent</strong>, qui généralise Taylor en autorisant des puissances <strong>négatives</strong> de $(z-z_0)$, valable sur une couronne autour de $z_0$ :</p>
    <div class="formula-box">$$f(z) = \\sum_{n=-\\infty}^{\\infty} c_n (z-z_0)^n = \\underbrace{\\sum_{n=0}^{\\infty} c_n(z-z_0)^n}_{\\text{partie régulière}} + \\underbrace{\\sum_{n=1}^{\\infty} \\dfrac{c_{-n}}{(z-z_0)^n}}_{\\text{partie principale}}$$</div>

    <h3>4. Classification des singularités isolées</h3>
    <p>La structure de la <strong>partie principale</strong> (les termes en puissances négatives) de la série de Laurent permet de classer précisément le type de singularité en $z_0$ :</p>
    <table class="mini-table">
      <tr><th>Type de singularité</th><th>Structure de la partie principale</th><th>Comportement de |f(z)| près de z₀</th></tr>
      <tr><td>Singularité apparente (éliminable)</td><td>Aucun terme négatif ($c_{-n}=0\\ \\forall n\\ge1$)</td><td>Reste borné, $f$ se prolonge holomorphiquement</td></tr>
      <tr><td>Pôle d'ordre $m$</td><td>Un nombre fini de termes négatifs, le dernier non nul étant $c_{-m}$</td><td>$|f(z)| \\to \\infty$ de façon algébrique, comme $1/|z-z_0|^m$</td></tr>
      <tr><td>Singularité essentielle</td><td>Une infinité de termes négatifs non nuls</td><td>$f$ prend, dans tout voisinage de $z_0$, des valeurs arbitrairement proches de n'importe quel nombre complexe (théorème de Picard)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Identifier le type de singularité en $z=0$ de la fonction $f(z) = \\dfrac{\\sin z}{z^3}$.</p>
      <p><strong>Solution :</strong> Le développement de Taylor de $\\sin z$ autour de 0 est $\\sin z = z - z^3/6 + z^5/120 - \\cdots$. En divisant par $z^3$ : $f(z) = \\dfrac{1}{z^2} - \\dfrac{1}{6} + \\dfrac{z^2}{120} - \\cdots$. La partie principale ne comporte qu'un seul terme négatif, en $1/z^2$.</p>
      <p class="example-answer">Réponse : $f$ possède un pôle d'ordre 2 en $z=0$.</p>
    </div>

    <h3>5. Le principe du prolongement analytique</h3>
    <p>Un résultat remarquable, conséquence de la rigidité de l'holomorphie : si deux fonctions holomorphes coïncident sur un ensemble ayant un point d'accumulation dans leur domaine commun (par exemple un segment de droite réelle, ou même une simple suite convergente de points), alors elles coïncident sur <strong>tout</strong> leur domaine commun de définition. Ce <strong>principe du prolongement analytique</strong> justifie, par exemple, que la fonction exponentielle complexe $e^z$ soit <strong>l'unique</strong> extension holomorphe naturelle de l'exponentielle réelle au plan complexe.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une fonction f=u+iv est holomorphe si et seulement si les conditions de Cauchy-Riemann sont satisfaites : ∂u/∂x=∂v/∂y et ∂u/∂y=−∂v/∂x</li>
      <li>Les parties réelle et imaginaire d'une fonction holomorphe sont harmoniques (Δu=Δv=0), avec des applications directes en électrostatique et mécanique des fluides 2D</li>
      <li>Le développement de Laurent généralise Taylor autour d'une singularité, en autorisant des puissances négatives</li>
      <li>Trois types de singularités isolées : apparente (aucun terme négatif), pôle d'ordre m (nombre fini de termes négatifs), essentielle (infinité de termes négatifs)</li>
      <li>Le principe du prolongement analytique garantit l'unicité d'une extension holomorphe à partir d'un ensemble ayant un point d'accumulation</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre différentiabilité réelle en deux variables et holomorphie — cette dernière est une condition bien plus restrictive</li>
      <li>Oublier de vérifier les deux conditions de Cauchy-Riemann (une seule ne suffit pas)</li>
      <li>Confondre pôle d'ordre m (partie principale finie) et singularité essentielle (partie principale infinie)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Si f=u+iv est holomorphe, que peut-on affirmer sur u et v ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp3e1" value="wrong">u et v sont toujours des constantes</label>
        <label class="option"><input type="radio" name="mmp3e1" value="right">u et v sont toutes deux des fonctions harmoniques (Δu=Δv=0)</label>
        <label class="option"><input type="radio" name="mmp3e1" value="wrong">u et v sont toujours égales</label>
        <label class="option"><input type="radio" name="mmp3e1" value="wrong">Seule u est harmonique, pas v</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp3e1','mmp3fb1','Correct — c\\'est une conséquence directe des conditions de Cauchy-Riemann appliquées deux fois.','Relis la section « Holomorphie et fonctions harmoniques ».')">Vérifier</button>
      <div class="feedback" id="mmp3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">La fonction $f(z) = 1/z^2$ présente en $z=0$ :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp3e2" value="wrong">Une singularité apparente</label>
        <label class="option"><input type="radio" name="mmp3e2" value="right">Un pôle d'ordre 2</label>
        <label class="option"><input type="radio" name="mmp3e2" value="wrong">Une singularité essentielle</label>
        <label class="option"><input type="radio" name="mmp3e2" value="wrong">Aucune singularité</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp3e2','mmp3fb2','Correct — la partie principale se réduit à un seul terme 1/z², de degré 2 : c\\'est un pôle d\\'ordre 2.','La partie principale de 1/z² ne comporte qu\\'un seul terme non nul, en 1/z² : quel type de singularité cela correspond-il ?')">Vérifier</button>
      <div class="feedback" id="mmp3fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Fonctions d'une variable complexe : holomorphie et séries")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'analyse complexe : holomorphie, Cauchy-Riemann, séries de Laurent, singularités. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/cauchy.riemann/i, replies:[
      "Les conditions de Cauchy-Riemann : ∂u/∂x=∂v/∂y et ∂u/∂y=−∂v/∂x, pour f=u+iv. Elles caractérisent exactement l'holomorphie."
    ]},
    { test:/harmonique/i, replies:[
      "Les parties réelle et imaginaire d'une fonction holomorphe sont harmoniques (Δu=Δv=0) — très utile en électrostatique et mécanique des fluides 2D pour résoudre l'équation de Laplace."
    ]},
    { test:/laurent/i, replies:[
      "La série de Laurent généralise Taylor autour d'une singularité, avec une partie régulière (puissances positives) et une partie principale (puissances négatives)."
    ]},
    { test:/p[ôo]le|singularit[ée] essentielle|singularit[ée] apparente/i, replies:[
      "Trois types de singularités isolées : apparente (aucun terme négatif dans Laurent), pôle d'ordre m (nombre fini de termes négatifs), essentielle (infinité de termes négatifs)."
    ]},
    { test:/prolongement analytique/i, replies:[
      "Le principe du prolongement analytique : deux fonctions holomorphes coïncidant sur un ensemble avec point d'accumulation coïncident sur tout leur domaine commun — d'où l'unicité de l'extension complexe de l'exponentielle réelle."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la conséquence directe des conditions de Cauchy-Riemann appliquées deux fois.",
      "Indice niveau 2 : cette propriété concerne l'équation de Laplace.",
      "Indice niveau 3 : u et v sont toutes deux harmoniques (Δu=Δv=0)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : regarde combien de termes négatifs apparaissent dans le développement de 1/z².",
      "Indice niveau 2 : il n'y en a qu'un seul, de degré 2.",
      "Indice niveau 3 : c'est donc un pôle d'ordre 2."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Théorème des résidus et calcul d'intégrales")] = {
  objectives: [
    "Énoncer le théorème de Cauchy et le théorème des résidus",
    "Calculer le résidu d'une fonction en un pôle simple ou d'ordre supérieur",
    "Appliquer le théorème des résidus au calcul d'intégrales réelles impropres",
    "Utiliser le lemme de Jordan pour justifier l'annulation des contributions de contours à l'infini"
  ],
  prereqs: ["Fonctions d'une variable complexe : holomorphie et séries"],
  bodyHtml: `
    <p>Le théorème des résidus est sans doute le résultat le plus spectaculairement <strong>utile</strong> de l'analyse complexe pour la physique : il permet de calculer, de façon souvent quasi-immédiate, des intégrales réelles impossibles ou très difficiles à évaluer par les méthodes classiques du calcul intégral réel.</p>

    <h3>1. Le théorème de Cauchy</h3>
    <p>Si $f$ est holomorphe sur un domaine simplement connexe $D$, alors pour tout contour fermé $\\gamma$ contenu dans $D$ :</p>
    <div class="formula-box">$$\\oint_\\gamma f(z)\\,dz = 0$$</div>
    <p>Ce résultat, d'apparence simple, a une conséquence immédiate très puissante : l'intégrale d'une fonction holomorphe entre deux points <strong>ne dépend pas du chemin choisi</strong> (tant qu'on ne franchit aucune singularité) — une propriété bien plus forte que ce dont on dispose en général pour les fonctions réelles de plusieurs variables.</p>

    <h3>2. Le résidu d'une fonction en un pôle</h3>
    <p>Le <strong>résidu</strong> de $f$ en une singularité isolée $z_0$, noté $\\text{Res}(f,z_0)$, est défini comme le coefficient $c_{-1}$ du terme en $1/(z-z_0)$ dans le développement de Laurent (chapitre 3) de $f$ autour de $z_0$. Pour un <strong>pôle simple</strong> (ordre 1), on dispose d'une formule pratique directe :</p>
    <div class="formula-box">$$\\text{Res}(f,z_0) = \\lim_{z\\to z_0} (z-z_0)f(z)$$</div>
    <p>Pour un <strong>pôle d'ordre $m$</strong>, la formule générale (dérivée à l'ordre $m-1$) s'écrit :</p>
    <div class="formula-box">$$\\text{Res}(f,z_0) = \\dfrac{1}{(m-1)!}\\lim_{z\\to z_0}\\dfrac{d^{m-1}}{dz^{m-1}}\\left[(z-z_0)^m f(z)\\right]$$</div>

    <h3>3. Le théorème des résidus</h3>
    <p>Si $f$ est holomorphe sur un domaine $D$ sauf en un nombre fini de singularités isolées $z_1,\\ldots,z_k$ à l'intérieur d'un contour fermé $\\gamma$ (parcouru dans le sens direct, trigonométrique), alors :</p>
    <div class="formula-box">$$\\oint_\\gamma f(z)\\,dz = 2\\pi i \\sum_{j=1}^{k} \\text{Res}(f,z_j)$$</div>
    <p>Ce théorème transforme le calcul, potentiellement complexe, d'une intégrale de contour en une simple <strong>somme de résidus</strong>, souvent beaucoup plus facile à évaluer.</p>

    <h3>4. Application au calcul d'intégrales réelles</h3>
    <p>La stratégie générale pour calculer une intégrale réelle $\\int_{-\\infty}^{\\infty} f(x)\\,dx$ via le théorème des résidus consiste à :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Prolonger $f$ en une fonction $f(z)$ de la variable complexe</li>
      <li>Fermer le contour d'intégration réel par un demi-cercle de rayon $R \\to \\infty$ dans le demi-plan supérieur (ou inférieur, selon le cas)</li>
      <li>Montrer, généralement via le <strong>lemme de Jordan</strong>, que la contribution du demi-cercle à l'infini tend vers zéro</li>
      <li>Appliquer le théorème des résidus au contour fermé restant, qui ne fait alors intervenir que les singularités situées dans le demi-plan choisi</li>
    </ol>

    <div class="key-point">
      <span class="eyebrow">Point clé — le lemme de Jordan</span>
      Pour les intégrales de la forme $\\int_{-\\infty}^{\\infty} f(x)\\,e^{i\\alpha x}\\,dx$ ($\\alpha>0$ réel), extrêmement fréquentes en physique (transformées de Fourier, réponses impulsionnelles causales), le <strong>lemme de Jordan</strong> garantit que la contribution du grand demi-cercle supérieur s'annule dès que $f(z) \\to 0$ quand $|z|\\to\\infty$ — une hypothèse bien plus faible que la décroissance requise pour les intégrales sans facteur oscillant $e^{i\\alpha x}$.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Calculer $\\displaystyle\\int_{-\\infty}^{\\infty} \\dfrac{dx}{1+x^2}$ par la méthode des résidus.</p>
      <p><strong>Solution :</strong> La fonction $f(z)=1/(1+z^2)$ a deux pôles simples, en $z=i$ et $z=-i$. En fermant le contour par le demi-cercle supérieur ($R\\to\\infty$, contribution nulle car $f(z)\\sim 1/z^2\\to0$ assez vite), seul le pôle $z=i$ est à l'intérieur du contour. On calcule $\\text{Res}(f,i) = \\lim_{z\\to i}(z-i)\\dfrac{1}{(z-i)(z+i)} = \\dfrac{1}{2i}$. D'où $\\displaystyle\\int_{-\\infty}^{\\infty}\\dfrac{dx}{1+x^2} = 2\\pi i \\times \\dfrac{1}{2i} = \\pi$.</p>
      <p class="example-answer">Réponse : $\\pi$ — un résultat bien connu (primitive $\\arctan x$), retrouvé ici de façon purement algébrique via le résidu, sans calcul explicite de primitive.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le théorème de Cauchy : l'intégrale d'une fonction holomorphe sur tout contour fermé (dans un domaine simplement connexe) est nulle</li>
      <li>Le résidu Res(f,z0) est le coefficient c₋₁ du développement de Laurent ; pour un pôle simple, Res(f,z0)=lim (z−z0)f(z)</li>
      <li>Le théorème des résidus : ∮f(z)dz = 2πi × somme des résidus intérieurs au contour</li>
      <li>Pour calculer une intégrale réelle, on ferme le contour à l'infini et on utilise le lemme de Jordan pour justifier l'annulation de la contribution du grand arc</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier le facteur 2πi dans l'énoncé du théorème des résidus</li>
      <li>Inclure dans la somme des résidus une singularité extérieure au contour choisi</li>
      <li>Fermer le contour dans le mauvais demi-plan (le choix dépend du signe de α dans le facteur e^(iαx))</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est le résidu de $f(z) = 1/(z-3)$ en $z=3$ ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp4e1" value="wrong">0</label>
        <label class="option"><input type="radio" name="mmp4e1" value="right">1</label>
        <label class="option"><input type="radio" name="mmp4e1" value="wrong">3</label>
        <label class="option"><input type="radio" name="mmp4e1" value="wrong">1/3</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp4e1','mmp4fb1','Correct — Res(f,3) = lim(z→3)(z−3)×1/(z−3) = 1.','Applique la formule du résidu pour un pôle simple : lim(z→z0)(z−z0)f(z).')">Vérifier</button>
      <div class="feedback" id="mmp4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Le théorème des résidus permet de calculer une intégrale de contour comme :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp4e2" value="wrong">La somme des valeurs de f aux pôles</label>
        <label class="option"><input type="radio" name="mmp4e2" value="right">2πi fois la somme des résidus aux singularités intérieures au contour</label>
        <label class="option"><input type="radio" name="mmp4e2" value="wrong">Le produit des résidus aux singularités</label>
        <label class="option"><input type="radio" name="mmp4e2" value="wrong">La dérivée de f au centre du contour</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp4e2','mmp4fb2','Correct — c\\'est exactement l\\'énoncé du théorème des résidus : ∮f(z)dz = 2πi × Σ Res(f,zj).','Relis l\\'énoncé exact du théorème des résidus, avec son facteur 2πi.')">Vérifier</button>
      <div class="feedback" id="mmp4fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Théorème des résidus et calcul d'intégrales")] = {
  intro: "Salut, moi c'est Nova ! On étudie le théorème des résidus et son application au calcul d'intégrales réelles. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/th[ée]or[èe]me de cauchy/i, replies:[
      "Le théorème de Cauchy : l'intégrale d'une fonction holomorphe sur tout contour fermé dans un domaine simplement connexe est nulle — d'où l'indépendance du chemin pour une fonction holomorphe."
    ]},
    { test:/r[ée]sidu/i, replies:[
      "Le résidu Res(f,z0) est le coefficient c₋₁ du développement de Laurent. Pour un pôle simple : Res(f,z0)=lim(z→z0)(z−z0)f(z)."
    ]},
    { test:/th[ée]or[èe]me des r[ée]sidus/i, replies:[
      "Le théorème des résidus : ∮f(z)dz = 2πi × Σ Res(f,zj), la somme portant sur les singularités intérieures au contour fermé."
    ]},
    { test:/jordan/i, replies:[
      "Le lemme de Jordan justifie l'annulation de la contribution du grand demi-cercle à l'infini pour les intégrales avec facteur oscillant e^(iαx), sous une hypothèse de décroissance de f(z) plus faible que dans le cas général."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique la formule du résidu pour un pôle simple.",
      "Indice niveau 2 : lim(z→3)(z−3)×1/(z−3) se simplifie directement.",
      "Indice niveau 3 : le résultat est 1."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis l'énoncé exact du théorème des résidus.",
      "Indice niveau 2 : il y a un facteur 2πi devant la somme.",
      "Indice niveau 3 : c'est 2πi fois la somme des résidus aux singularités intérieures au contour."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Équations différentielles linéaires : résolution par séries entières")] = {
  objectives: [
    "Résoudre une équation différentielle linéaire par développement en série entière autour d'un point ordinaire",
    "Distinguer point ordinaire, point singulier régulier et point singulier irrégulier",
    "Appliquer la méthode de Frobenius autour d'un point singulier régulier",
    "Comprendre comment cette méthode engendre les fonctions spéciales du chapitre suivant"
  ],
  prereqs: ["Théorème des résidus et calcul d'intégrales", "Équations différentielles linéaires (L2)"],
  bodyHtml: `
    <p>De nombreuses équations différentielles centrales en physique (Legendre, Bessel, Hermite, Laguerre — issues de la séparation des variables du chapitre 7) n'admettent pas de solution en termes de fonctions élémentaires. La méthode des <strong>séries entières</strong>, et sa généralisation la <strong>méthode de Frobenius</strong>, permettent de les résoudre systématiquement.</p>

    <h3>1. Points ordinaires et développement en série entière</h3>
    <p>Pour une équation différentielle linéaire du second ordre $y'' + p(x)y' + q(x)y = 0$, un point $x_0$ est dit <strong>ordinaire</strong> si $p$ et $q$ sont analytiques (développables en série entière) en $x_0$. Au voisinage d'un point ordinaire, on cherche une solution sous la forme d'une série entière :</p>
    <div class="formula-box">$$y(x) = \\sum_{n=0}^{\\infty} a_n (x-x_0)^n$$</div>
    <p>En substituant cette série dans l'équation différentielle et en identifiant les coefficients de chaque puissance de $(x-x_0)$, on obtient une <strong>relation de récurrence</strong> entre les coefficients $a_n$, qui permet de tous les déterminer à partir des deux premiers (correspondant aux deux constantes d'intégration attendues pour une équation du second ordre).</p>

    <h3>2. Classification des points singuliers</h3>
    <p>Un point $x_0$ où $p$ ou $q$ cesse d'être analytique est dit <strong>singulier</strong>. On distingue deux catégories, dont le traitement mathématique diffère radicalement :</p>
    <table class="mini-table">
      <tr><th>Type de point singulier</th><th>Condition</th><th>Méthode applicable</th></tr>
      <tr><td>Singulier régulier</td><td>$(x-x_0)p(x)$ et $(x-x_0)^2q(x)$ restent analytiques en $x_0$</td><td>Méthode de Frobenius (voir ci-dessous)</td></tr>
      <tr><td>Singulier irrégulier</td><td>La condition ci-dessus n'est pas satisfaite</td><td>Aucune méthode systématique générale ; traitement au cas par cas</td></tr>
    </table>

    <h3>3. La méthode de Frobenius</h3>
    <p>Au voisinage d'un point singulier <strong>régulier</strong> $x_0$ (souvent $x_0=0$ par un choix judicieux de variable), Ferdinand Georg Frobenius a montré qu'il existe au moins une solution de la forme généralisée :</p>
    <div class="formula-box">$$y(x) = (x-x_0)^r \\sum_{n=0}^{\\infty} a_n (x-x_0)^n, \\qquad a_0 \\ne 0$$</div>
    <p>où l'exposant $r$ (potentiellement non entier, voire complexe) est solution de l'<strong>équation indicielle</strong>, obtenue en substituant le terme dominant $a_0(x-x_0)^r$ dans l'équation différentielle. Cette équation indicielle est généralement une équation du second degré en $r$, dont les deux racines $r_1 \\ge r_2$ (si réelles) déterminent la nature des solutions :</p>
    <table class="mini-table">
      <tr><th>Relation entre r₁ et r₂</th><th>Structure des deux solutions indépendantes</th></tr>
      <tr><td>$r_1 - r_2 \\notin \\mathbb{Z}$</td><td>Deux séries de Frobenius indépendantes, une pour chaque racine</td></tr>
      <tr><td>$r_1 = r_2$</td><td>Une série de Frobenius pour $r_1$, la seconde solution comporte un terme logarithmique $\\ln(x-x_0)$</td></tr>
      <tr><td>$r_1 - r_2 \\in \\mathbb{Z}^{+}$</td><td>Une série de Frobenius pour $r_1$ ; la seconde solution (pour $r_2$) peut nécessiter un terme logarithmique, selon les cas</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La méthode de Frobenius est la clé de voûte qui permet de construire, de façon systématique et rigoureuse, les <strong>fonctions spéciales</strong> de la physique mathématique (chapitre 6) : les polynômes de Legendre apparaissent en résolvant l'équation de Legendre au voisinage de son point ordinaire $x=0$ ; les fonctions de Bessel apparaissent en résolvant l'équation de Bessel au voisinage de son point singulier régulier $x=0$.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> L'équation d'Euler-Cauchy $x^2y'' + xy' - n^2 y = 0$ admet $x_0=0$ comme point singulier régulier. Déterminer l'équation indicielle et ses racines.</p>
      <p><strong>Solution :</strong> En substituant $y=x^r$ (terme dominant, $a_0=1$) : $x^2 \\cdot r(r-1)x^{r-2} + x\\cdot r x^{r-1} - n^2 x^r = 0$, soit $\\left[r(r-1)+r-n^2\\right]x^r=0$, d'où l'équation indicielle $r^2 - n^2 = 0$.</p>
      <p class="example-answer">Réponse : l'équation indicielle est $r^2=n^2$, avec les racines $r_1=n$ et $r_2=-n$ — retrouvant directement les solutions bien connues $y=x^n$ et $y=x^{-n}$ de cette équation d'Euler-Cauchy classique.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Au voisinage d'un point ordinaire, on cherche une solution en série entière ordinaire Σaₙ(x−x0)ⁿ</li>
      <li>Un point singulier est dit régulier si (x−x0)p(x) et (x−x0)²q(x) restent analytiques ; sinon il est irrégulier</li>
      <li>La méthode de Frobenius, applicable au voisinage d'un point singulier régulier, cherche y=(x−x0)^r·Σaₙ(x−x0)ⁿ</li>
      <li>L'exposant r est déterminé par l'équation indicielle ; la relation entre ses deux racines détermine la structure de la seconde solution (avec ou sans terme logarithmique)</li>
      <li>Cette méthode engendre systématiquement les fonctions spéciales de la physique mathématique (Legendre, Bessel...)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Chercher une solution en série entière ordinaire (Frobenius avec r=0) autour d'un point singulier, sans vérifier d'abord qu'il est bien régulier</li>
      <li>Oublier le terme logarithmique potentiellement nécessaire pour la seconde solution quand r1=r2 ou quand r1−r2 est un entier positif</li>
      <li>Confondre point singulier régulier et point singulier irrégulier — seul le premier admet un traitement systématique par Frobenius</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La méthode de Frobenius s'applique au voisinage de quel type de point ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp5e1" value="wrong">Un point ordinaire uniquement</label>
        <label class="option"><input type="radio" name="mmp5e1" value="right">Un point singulier régulier</label>
        <label class="option"><input type="radio" name="mmp5e1" value="wrong">Un point singulier irrégulier</label>
        <label class="option"><input type="radio" name="mmp5e1" value="wrong">N'importe quel point, sans distinction</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp5e1','mmp5fb1','Correct — Frobenius s\\'applique spécifiquement au voisinage d\\'un point singulier régulier, où (x−x0)p(x) et (x−x0)²q(x) restent analytiques.','Relis la définition de la méthode de Frobenius : à quel type de point s\\'applique-t-elle spécifiquement ?')">Vérifier</button>
      <div class="feedback" id="mmp5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Que se passe-t-il pour la structure des solutions quand les deux racines de l'équation indicielle sont égales (r1=r2) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp5e2" value="wrong">Il n'existe alors aucune solution</label>
        <label class="option"><input type="radio" name="mmp5e2" value="right">La seconde solution indépendante comporte un terme logarithmique</label>
        <label class="option"><input type="radio" name="mmp5e2" value="wrong">Les deux solutions sont automatiquement des polynômes</label>
        <label class="option"><input type="radio" name="mmp5e2" value="wrong">L'équation différentielle devient linéaire à coefficients constants</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp5e2','mmp5fb2','Correct — quand r1=r2, la seconde solution indépendante fait apparaître un terme logarithmique ln(x−x0).','Relis le tableau de la structure des solutions selon la relation entre r1 et r2.')">Vérifier</button>
      <div class="feedback" id="mmp5fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Équations différentielles linéaires : résolution par séries entières")] = {
  intro: "Salut, moi c'est Nova ! On étudie la résolution d'équations différentielles par séries entières et la méthode de Frobenius. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/point ordinaire/i, replies:[
      "Au voisinage d'un point ordinaire (p et q analytiques), on cherche une solution en série entière ordinaire y=Σaₙ(x−x0)ⁿ, avec une relation de récurrence entre les coefficients."
    ]},
    { test:/point singulier r[ée]gulier|point singulier irr[ée]gulier/i, replies:[
      "Un point singulier est régulier si (x−x0)p(x) et (x−x0)²q(x) restent analytiques ; sinon il est irrégulier (pas de méthode systématique dans ce cas)."
    ]},
    { test:/frobenius/i, replies:[
      "La méthode de Frobenius cherche y=(x−x0)^r·Σaₙ(x−x0)ⁿ au voisinage d'un point singulier régulier. L'exposant r est déterminé par l'équation indicielle."
    ]},
    { test:/[ée]quation indicielle/i, replies:[
      "L'équation indicielle s'obtient en substituant le terme dominant a0(x−x0)^r dans l'équation différentielle. Ses deux racines déterminent la structure des solutions (avec ou sans terme logarithmique)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition précise de la méthode de Frobenius.",
      "Indice niveau 2 : ce n'est pas un point ordinaire ni un point singulier irrégulier.",
      "Indice niveau 3 : c'est un point singulier régulier."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau des trois cas selon r1 et r2.",
      "Indice niveau 2 : le cas r1=r2 est un cas particulier nécessitant un ajustement.",
      "Indice niveau 3 : la seconde solution comporte alors un terme logarithmique."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Fonctions spéciales : polynômes de Legendre et fonctions de Bessel")] = {
  objectives: [
    "Construire les polynômes de Legendre comme solutions polynomiales de l'équation de Legendre",
    "Énoncer les propriétés d'orthogonalité des polynômes de Legendre",
    "Introduire les fonctions de Bessel comme solutions de l'équation de Bessel",
    "Relier ces fonctions spéciales aux problèmes physiques à symétrie sphérique et cylindrique"
  ],
  prereqs: ["Équations différentielles linéaires : résolution par séries entières"],
  bodyHtml: `
    <p>Ce chapitre présente les deux familles de fonctions spéciales les plus omniprésentes en physique : les <strong>polynômes de Legendre</strong> (symétrie sphérique) et les <strong>fonctions de Bessel</strong> (symétrie cylindrique) — directement issues de l'application de la méthode de Frobenius (chapitre 5) aux équations différentielles obtenues par séparation des variables (chapitre 7).</p>

    <h3>1. L'équation de Legendre et ses solutions polynomiales</h3>
    <p>L'équation de Legendre apparaît naturellement lors de la séparation de variables du laplacien en coordonnées sphériques (chapitre 1) :</p>
    <div class="formula-box">$$(1-x^2)y'' - 2xy' + \\ell(\\ell+1)y = 0, \\qquad x=\\cos\\theta \\in[-1,1]$$</div>
    <p>$x=0$ est un point ordinaire de cette équation ; la méthode en série entière (chapitre 5) montre que, pour $\\ell$ entier naturel, l'une des deux séries de solutions se <strong>tronque</strong> exactement en un <strong>polynôme de degré $\\ell$</strong> — c'est le <strong>polynôme de Legendre</strong> $P_\\ell(x)$, normalisé par convention à $P_\\ell(1)=1$. Les premiers polynômes sont :</p>
    <div class="formula-box">$$P_0(x)=1 \\quad P_1(x)=x \\quad P_2(x)=\\dfrac{3x^2-1}{2} \\quad P_3(x)=\\dfrac{5x^3-3x}{2}$$</div>
    <p>Ils admettent aussi la <strong>formule de Rodrigues</strong>, une expression compacte génératrice :</p>
    <div class="formula-box">$$P_\\ell(x) = \\dfrac{1}{2^\\ell\\,\\ell!}\\dfrac{d^\\ell}{dx^\\ell}\\left[(x^2-1)^\\ell\\right]$$</div>

    <h3>2. Orthogonalité des polynômes de Legendre</h3>
    <p>Les polynômes de Legendre forment une <strong>famille orthogonale</strong> sur $[-1,1]$ :</p>
    <div class="formula-box">$$\\int_{-1}^{1} P_\\ell(x)\\,P_m(x)\\,dx = \\dfrac{2}{2\\ell+1}\\,\\delta_{\\ell m}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi l'orthogonalité est cruciale en physique</span>
      Cette propriété d'orthogonalité permet de développer <strong>toute</strong> fonction suffisamment régulière sur $[-1,1]$ (ou, de façon équivalente, toute fonction de $\\theta$ à symétrie azimutale sur la sphère) en <strong>série de Legendre</strong> $f(x) = \\sum_\\ell c_\\ell P_\\ell(x)$, exactement comme une série de Fourier (chapitre 2) décompose une fonction périodique en sinus et cosinus. C'est le fondement des développements multipolaires en électrostatique (potentiel d'une distribution de charge non ponctuelle) et de la décomposition en harmoniques sphériques en mécanique quantique.
    </div>

    <h3>3. L'équation de Bessel</h3>
    <p>La séparation des variables en coordonnées cylindriques (chapitre 7) conduit à l'<strong>équation de Bessel</strong> :</p>
    <div class="formula-box">$$x^2 y'' + xy' + (x^2-\\nu^2)y = 0$$</div>
    <p>$x=0$ est un point singulier <strong>régulier</strong> de cette équation (contrairement à Legendre) : la méthode de Frobenius s'applique, avec une équation indicielle $r^2=\\nu^2$ (voir l'exemple corrigé du chapitre 5). Pour $\\nu$ non entier, on obtient deux solutions indépendantes $J_\\nu(x)$ et $J_{-\\nu}(x)$ (<strong>fonctions de Bessel de première espèce</strong>) ; pour $\\nu$ entier, $J_\\nu$ et $J_{-\\nu}$ deviennent proportionnelles, et il faut construire une seconde solution indépendante (fonction de Bessel de seconde espèce, $Y_\\nu$, comportant un terme logarithmique).</p>

    <table class="mini-table">
      <tr><th>Famille</th><th>Symétrie associée</th><th>Comportement typique</th></tr>
      <tr><td>Polynômes de Legendre $P_\\ell(x)$</td><td>Sphérique (angle polaire θ)</td><td>Fonctions bornées, polynomiales, oscillant $\\ell$ fois sur $[-1,1]$</td></tr>
      <tr><td>Fonctions de Bessel $J_\\nu(x)$</td><td>Cylindrique (distance radiale ρ)</td><td>Oscillations amorties, enveloppe décroissant en $1/\\sqrt{x}$ à grand $x$</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi les polynômes de Legendre $P_\\ell$ n'existent-ils, en tant que <strong>polynômes</strong>, que pour $\\ell$ <strong>entier</strong> (et non pour $\\ell$ quelconque) ?</p>
      <p><strong>Solution :</strong> Pour une valeur générale (non entière) du paramètre dans l'équation de Legendre, la solution en série entière ne se termine jamais : elle reste une série infinie, convergente sur $(-1,1)$ mais divergente aux bornes $x=\\pm1$ (ce qui est physiquement inacceptable, car $x=\\cos\\theta$ doit rester fini pour tout angle $\\theta$, y compris aux pôles $\\theta=0,\\pi$). Seule une valeur entière de $\\ell$ permet à la relation de récurrence des coefficients de s'annuler après un nombre fini de termes, donnant un polynôme fini et donc borné sur tout $[-1,1]$.</p>
      <p class="example-answer">Réponse : c'est précisément l'exigence physique de régularité aux pôles ($\\theta=0,\\pi$) qui impose $\\ell$ entier, seule condition sous laquelle la série se tronque en un polynôme fini.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Les polynômes de Legendre P_ℓ(x) sont les solutions polynomiales (pour ℓ entier) de l'équation de Legendre, issue de la séparation de variables en coordonnées sphériques</li>
      <li>Ils forment une famille orthogonale sur [-1,1], ce qui permet de développer toute fonction régulière en série de Legendre</li>
      <li>L'équation de Bessel, issue de la séparation en coordonnées cylindriques, admet x=0 comme point singulier régulier</li>
      <li>Les fonctions de Bessel J_ν oscillent avec une enveloppe décroissante, contrairement aux polynômes de Legendre, bornés et polynomiaux</li>
      <li>Seule une valeur entière de ℓ (ou ν selon le contexte) garantit la régularité physique de la solution aux points singuliers du domaine</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que les polynômes de Legendre existent pour toute valeur réelle de ℓ — ils n'existent en tant que polynômes que pour ℓ entier</li>
      <li>Confondre fonctions de Bessel de première espèce (Jν, régulières en x=0) et de seconde espèce (Yν, divergentes en x=0)</li>
      <li>Oublier le facteur de normalisation 2/(2ℓ+1) dans la relation d'orthogonalité des polynômes de Legendre</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi seule une valeur entière de ℓ donne-t-elle un polynôme de Legendre fini et borné sur [-1,1] ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp6e1" value="wrong">Par pure convention mathématique, sans raison physique</label>
        <label class="option"><input type="radio" name="mmp6e1" value="right">Parce que la régularité physique aux pôles (θ=0,π) exige que la solution reste bornée</label>
        <label class="option"><input type="radio" name="mmp6e1" value="wrong">Parce que ℓ représente toujours un nombre de particules</label>
        <label class="option"><input type="radio" name="mmp6e1" value="wrong">Cela n'a aucun rapport avec la physique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp6e1','mmp6fb1','Correct — c\\'est l\\'exigence de régularité physique aux pôles qui impose ℓ entier, seule condition permettant à la série de se tronquer en un polynôme fini.','Relis l\\'exemple corrigé sur la troncature en polynôme fini.')">Vérifier</button>
      <div class="feedback" id="mmp6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Les fonctions de Bessel apparaissent naturellement lors de la séparation de variables en coordonnées :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp6e2" value="wrong">Cartésiennes</label>
        <label class="option"><input type="radio" name="mmp6e2" value="right">Cylindriques</label>
        <label class="option"><input type="radio" name="mmp6e2" value="wrong">Sphériques (angle polaire)</label>
        <label class="option"><input type="radio" name="mmp6e2" value="wrong">Aucune coordonnée particulière</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp6e2','mmp6fb2','Correct — l\\'équation de Bessel apparaît lors de la séparation de variables en coordonnées cylindriques (partie radiale).','Relis le tableau comparatif : à quelle symétrie sont associées les fonctions de Bessel ?')">Vérifier</button>
      <div class="feedback" id="mmp6fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Fonctions spéciales : polynômes de Legendre et fonctions de Bessel")] = {
  intro: "Salut, moi c'est Nova ! On étudie les fonctions spéciales : polynômes de Legendre et fonctions de Bessel. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/legendre/i, replies:[
      "Les polynômes de Legendre Pℓ(x) sont solutions polynomiales (pour ℓ entier) de l'équation de Legendre, issue de la séparation en sphériques. Ils sont orthogonaux sur [-1,1] et permettent de développer toute fonction régulière en série de Legendre."
    ]},
    { test:/bessel/i, replies:[
      "Les fonctions de Bessel Jν(x) sont solutions de l'équation de Bessel, issue de la séparation en cylindriques. x=0 est un point singulier régulier ; on utilise donc la méthode de Frobenius."
    ]},
    { test:/orthogonalit[ée]/i, replies:[
      "L'orthogonalité des polynômes de Legendre : ∫Pℓ(x)Pm(x)dx = (2/(2ℓ+1))δℓm sur [-1,1]. Elle permet un développement en série, comme les séries de Fourier."
    ]},
    { test:/rodrigues/i, replies:[
      "La formule de Rodrigues : Pℓ(x) = (1/(2^ℓ ℓ!)) dᵉˡᵉᵛᵉᵈᵗᵒ ℓ/dxᵉˡᵉᵛᵉᵈᵗᵒℓ [(x²−1)^ℓ] — une expression compacte génératrice des polynômes de Legendre."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la condition physique de régularité aux pôles θ=0 et θ=π.",
      "Indice niveau 2 : ce n'est pas une simple convention arbitraire.",
      "Indice niveau 3 : c'est l'exigence que la solution reste bornée physiquement qui impose ℓ entier."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau comparatif Legendre/Bessel.",
      "Indice niveau 2 : ce n'est ni cartésien ni sphérique.",
      "Indice niveau 3 : c'est en coordonnées cylindriques."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Équations aux dérivées partielles de la physique : séparation des variables")] = {
  objectives: [
    "Appliquer la méthode de séparation des variables aux trois grandes EDP de la physique (Laplace, ondes, chaleur)",
    "Justifier l'apparition d'une constante de séparation et son rôle dans la quantification des solutions",
    "Résoudre l'équation de la chaleur 1D avec conditions aux limites de Dirichlet homogènes",
    "Relier les solutions obtenues aux fonctions spéciales du chapitre 6 selon la géométrie du problème"
  ],
  prereqs: ["Fonctions spéciales : polynômes de Legendre et fonctions de Bessel", "Séries de Fourier et transformée de Fourier"],
  bodyHtml: `
    <p>Ce chapitre réunit les outils des chapitres précédents (séries de Fourier, fonctions spéciales) autour de la méthode la plus puissante pour résoudre analytiquement les grandes équations aux dérivées partielles (EDP) linéaires de la physique : la <strong>séparation des variables</strong>.</p>

    <h3>1. Les trois grandes EDP de la physique</h3>
    <table class="mini-table">
      <tr><th>Équation</th><th>Forme</th><th>Contexte physique</th></tr>
      <tr><td>Laplace / Poisson</td><td>$\\Delta\\phi = 0$ (ou $=-\\rho/\\varepsilon_0$)</td><td>Électrostatique, potentiel gravitationnel, régime stationnaire</td></tr>
      <tr><td>Équation d'onde</td><td>$\\dfrac{\\partial^2 u}{\\partial t^2} = c^2\\Delta u$</td><td>Cordes vibrantes, ondes acoustiques et électromagnétiques</td></tr>
      <tr><td>Équation de la chaleur (diffusion)</td><td>$\\dfrac{\\partial u}{\\partial t} = D\\,\\Delta u$</td><td>Conduction thermique, diffusion de particules</td></tr>
    </table>

    <h3>2. Le principe de la séparation des variables</h3>
    <p>La méthode postule qu'une solution particulière peut s'écrire comme un <strong>produit</strong> de fonctions, chacune ne dépendant que d'une seule variable. Pour l'équation de la chaleur 1D $\\partial_t u = D\\,\\partial_x^2 u$, on pose :</p>
    <div class="formula-box">$$u(x,t) = X(x)\\,T(t)$$</div>
    <p>En substituant dans l'équation et en divisant par $u=XT$ :</p>
    <div class="formula-box">$$\\dfrac{T'(t)}{D\\,T(t)} = \\dfrac{X''(x)}{X(x)}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi cela fonctionne</span>
      Le membre de gauche ne dépend que de $t$, le membre de droite ne dépend que de $x$ : pour que cette égalité soit vraie pour <strong>tout</strong> $x$ et <strong>tout</strong> $t$ simultanément, les deux membres doivent être égaux à une même <strong>constante</strong>, appelée <strong>constante de séparation</strong> (souvent notée $-k^2$, par convention de signe adaptée au problème physique). L'EDP se décompose ainsi en deux <strong>équations différentielles ordinaires</strong> indépendantes, bien plus simples à résoudre séparément.
    </div>

    <h3>3. Résolution de l'équation de la chaleur 1D (conditions de Dirichlet homogènes)</h3>
    <p>Considérons une barre de longueur $L$, aux extrémités maintenues à température nulle : $u(0,t)=u(L,t)=0$. Avec la constante de séparation $-k^2$, on obtient :</p>
    <div class="formula-box">$$X'' + k^2 X = 0 \\qquad T' + Dk^2 T = 0$$</div>
    <p>La solution générale de l'équation spatiale est $X(x) = A\\cos(kx) + B\\sin(kx)$. Les conditions aux limites $X(0)=0$ imposent $A=0$ ; $X(L)=0$ impose $\\sin(kL)=0$, donc $k = k_n = n\\pi/L$ pour $n$ entier positif — c'est la <strong>quantification</strong> des valeurs admissibles de $k$, imposée uniquement par la géométrie (la longueur $L$) via les conditions aux limites. La partie temporelle se résout immédiatement : $T_n(t) = e^{-Dk_n^2 t}$.</p>
    <p>La solution générale s'obtient en superposant (grâce à la linéarité de l'équation) tous les <strong>modes propres</strong> $u_n(x,t) = \\sin(k_n x)\\,e^{-Dk_n^2 t}$, avec des coefficients $b_n$ déterminés par la <strong>condition initiale</strong> $u(x,0)=f(x)$ via un développement en série de Fourier (chapitre 2) :</p>
    <div class="formula-box">$$u(x,t) = \\sum_{n=1}^{\\infty} b_n \\sin\\!\\left(\\dfrac{n\\pi x}{L}\\right) e^{-D(n\\pi/L)^2 t}, \\qquad b_n = \\dfrac{2}{L}\\int_0^L f(x)\\sin\\!\\left(\\dfrac{n\\pi x}{L}\\right)dx$$</div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Dans la solution de l'équation de la chaleur ci-dessus, que devient chaque mode $u_n(x,t)$ lorsque $t \\to \\infty$ ? Quel mode domine à temps long ?</p>
      <p><strong>Solution :</strong> Chaque mode décroît exponentiellement avec le temps, à un taux $Dk_n^2 = D(n\\pi/L)^2$ proportionnel à $n^2$. Les modes de $n$ élevé (variations spatiales rapides) s'amortissent donc bien plus vite que le mode fondamental $n=1$.</p>
      <p class="example-answer">Réponse : tous les modes tendent vers zéro, mais le mode fondamental $n=1$ domine à temps long (il décroît le plus lentement), donnant à la solution une allure de plus en plus proche d'une simple sinusoïde $\\sin(\\pi x/L)$ à mesure que $t$ augmente.</p>
    </div>

    <h3>4. Séparation des variables et fonctions spéciales</h3>
    <p>Le choix du système de coordonnées (chapitre 1) détermine directement quelles fonctions spéciales apparaissent dans la séparation des variables :</p>
    <table class="mini-table">
      <tr><th>Géométrie du problème</th><th>Système de coordonnées</th><th>Fonctions spéciales apparaissant</th></tr>
      <tr><td>Cordes, barres 1D</td><td>Cartésiennes</td><td>Fonctions trigonométriques (sin, cos)</td></tr>
      <tr><td>Membrane circulaire, cylindre</td><td>Cylindriques</td><td>Fonctions de Bessel (partie radiale)</td></tr>
      <tr><td>Sphère (atome, planète)</td><td>Sphériques</td><td>Polynômes de Legendre / harmoniques sphériques (partie angulaire)</td></tr>
    </table>
    <p>C'est cette chaîne logique complète — choix des coordonnées adapté à la symétrie (chapitre 1), séparation des variables (ce chapitre), résolution par séries entières/Frobenius (chapitre 5), obtention des fonctions spéciales (chapitre 6) — qui structure la résolution analytique de la grande majorité des problèmes linéaires classiques de la physique mathématique, de l'équation de Schrödinger de l'atome d'hydrogène aux modes propres d'une membrane de tambour.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La séparation des variables cherche une solution en produit de fonctions d'une seule variable chacune, ce qui réduit une EDP à des équations différentielles ordinaires couplées par une constante de séparation</li>
      <li>Les conditions aux limites imposent une quantification des valeurs admissibles de la constante de séparation (ex : k_n=nπ/L)</li>
      <li>La solution générale s'obtient par superposition des modes propres, avec des coefficients fixés par la condition initiale via un développement de Fourier</li>
      <li>Pour l'équation de la chaleur, les modes de rang élevé s'amortissent plus vite ; le mode fondamental domine à temps long</li>
      <li>Le système de coordonnées adapté à la géométrie détermine les fonctions spéciales apparaissant dans la séparation (trigonométriques, Bessel, Legendre)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier que la constante de séparation doit être la même pour les deux équations différentielles ordinaires obtenues</li>
      <li>Ne pas appliquer les conditions aux limites pour déterminer les valeurs admissibles de la constante de séparation (quantification)</li>
      <li>Confondre la détermination des coefficients bn (condition initiale, développement de Fourier) avec celle de la constante de séparation (conditions aux limites spatiales)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi les deux membres de l'équation séparée doivent-ils être égaux à une constante ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp7e1" value="wrong">C'est une hypothèse arbitraire sans justification</label>
        <label class="option"><input type="radio" name="mmp7e1" value="right">Parce qu'un membre ne dépend que de x et l'autre que de t, leur égalité pour tout x et t impose qu'ils soient constants</label>
        <label class="option"><input type="radio" name="mmp7e1" value="wrong">Parce que l'équation de la chaleur est toujours stationnaire</label>
        <label class="option"><input type="radio" name="mmp7e1" value="wrong">Parce que D est une constante physique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp7e1','mmp7fb1','Correct — c\\'est l\\'argument central de la séparation des variables : deux fonctions de variables indépendantes égales pour tout x et t doivent être constantes.','Relis le point clé « pourquoi cela fonctionne » : quel argument mathématique impose une constante commune ?')">Vérifier</button>
      <div class="feedback" id="mmp7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Dans la solution de l'équation de la chaleur avec conditions de Dirichlet homogènes, quel mode domine à temps long ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp7e2" value="wrong">Le mode de plus grand n</label>
        <label class="option"><input type="radio" name="mmp7e2" value="right">Le mode fondamental (n=1), qui décroît le plus lentement</label>
        <label class="option"><input type="radio" name="mmp7e2" value="wrong">Tous les modes contribuent également, quel que soit t</label>
        <label class="option"><input type="radio" name="mmp7e2" value="wrong">Aucun mode ne subsiste, la solution s'annule immédiatement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp7e2','mmp7fb2','Correct — le taux de décroissance Dk_n² croît avec n², donc les modes de n élevé s\\'amortissent plus vite et le mode fondamental domine à temps long.','Relis l\\'exemple corrigé sur le comportement des modes à temps long.')">Vérifier</button>
      <div class="feedback" id="mmp7fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Équations aux dérivées partielles de la physique : séparation des variables")] = {
  intro: "Salut, moi c'est Nova ! On étudie la séparation des variables pour les EDP de la physique : Laplace, ondes, chaleur. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/s[ée]paration des variables/i, replies:[
      "La séparation des variables cherche une solution en produit u(x,t)=X(x)T(t). L'égalité obtenue force les deux membres à valoir une même constante de séparation, réduisant l'EDP à deux équations différentielles ordinaires."
    ]},
    { test:/constante de s[ée]paration/i, replies:[
      "La constante de séparation apparaît car un membre ne dépend que de x, l'autre que de t : leur égalité pour tout x et t impose qu'ils soient tous deux égaux à une constante fixe."
    ]},
    { test:/quantification|k_n|kn=/i, replies:[
      "Les conditions aux limites imposent une quantification des valeurs admissibles de la constante de séparation (ex : k_n=nπ/L pour une barre de longueur L à extrémités fixées à 0)."
    ]},
    { test:/mode fondamental|temps long/i, replies:[
      "Dans l'équation de la chaleur, le taux de décroissance d'un mode est proportionnel à n² : les modes de n élevé s'amortissent plus vite, et le mode fondamental (n=1) domine à temps long."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce que signifie qu'une fonction de x seul égale une fonction de t seul, pour tout x et t.",
      "Indice niveau 2 : ce n'est possible que si les deux valent la même constante.",
      "Indice niveau 3 : c'est cet argument qui impose la constante de séparation."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : compare les taux de décroissance Dk_n² selon n.",
      "Indice niveau 2 : ce taux croît avec n², donc les grands n s'amortissent plus vite.",
      "Indice niveau 3 : c'est donc le mode fondamental (n=1) qui domine à temps long."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
MATHPHYS_CHAPTERS[mmpKey("Distributions, fonction delta de Dirac et fonctions de Green")] = {
  objectives: [
    "Comprendre la fonction delta de Dirac comme distribution, et ses propriétés fondamentales",
    "Relier la fonction delta à la dérivée de la fonction de Heaviside et à des limites de fonctions régulières",
    "Définir la fonction de Green d'un opérateur différentiel linéaire",
    "Construire la solution générale d'une équation linéaire inhomogène par convolution avec la fonction de Green"
  ],
  prereqs: ["Équations aux dérivées partielles de la physique : séparation des variables", "Théorème des résidus et calcul d'intégrales"],
  bodyHtml: `
    <p>Ce dernier chapitre introduit un outil conceptuel puissant, la <strong>fonction delta de Dirac</strong>, et son application la plus féconde en physique : les <strong>fonctions de Green</strong>, qui permettent de résoudre systématiquement des équations linéaires inhomogènes (avec source) à partir de la réponse à une source ponctuelle.</p>

    <h3>1. La fonction delta de Dirac comme distribution</h3>
    <p>Introduite par Paul Dirac pour modéliser une densité de charge ou de masse ponctuelle, la fonction delta $\\delta(x)$ n'est pas une fonction au sens usuel (aucune fonction ordinaire ne peut satisfaire simultanément $\\delta(x)=0$ pour $x\\ne0$ et $\\int_{-\\infty}^{\\infty}\\delta(x)\\,dx=1$) : c'est une <strong>distribution</strong>, définie rigoureusement par son action sur les fonctions test $\\varphi$ suffisamment régulières :</p>
    <div class="formula-box">$$\\int_{-\\infty}^{\\infty} \\delta(x)\\,\\varphi(x)\\,dx = \\varphi(0) \\qquad \\text{(propriété d'échantillonnage)}$$</div>
    <p>On peut se représenter $\\delta(x)$ comme la <strong>limite</strong> d'une suite de fonctions ordinaires de plus en plus concentrées et de plus en plus hautes autour de $x=0$, tout en gardant une aire unité — par exemple une gaussienne $\\dfrac{1}{\\sigma\\sqrt{2\\pi}}e^{-x^2/2\\sigma^2}$ quand $\\sigma\\to0$.</p>

    <h3>2. Propriétés fondamentales</h3>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Relation</th></tr>
      <tr><td>Échantillonnage</td><td>$\\int f(x)\\delta(x-a)\\,dx = f(a)$</td></tr>
      <tr><td>Dérivée de Heaviside</td><td>$\\delta(x) = H'(x)$, où $H$ est la fonction échelon (Heaviside)</td></tr>
      <tr><td>Changement d'échelle</td><td>$\\delta(ax) = \\dfrac{1}{|a|}\\delta(x)$</td></tr>
      <tr><td>Représentation de Fourier</td><td>$\\delta(x) = \\dfrac{1}{2\\pi}\\displaystyle\\int_{-\\infty}^{\\infty} e^{ikx}\\,dk$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La relation $\\delta=H'$ formalise, de façon rigoureuse, l'intuition physique selon laquelle la fonction delta représente une <strong>densité ponctuelle</strong> : la fonction de Heaviside $H(x)$ modélise une masse ou une charge totale <strong>unité</strong> brusquement « concentrée en un point », et sa dérivée (au sens des distributions, pas au sens classique où $H$ n'est pas dérivable en 0) donne précisément cette densité ponctuelle infiniment concentrée.
    </div>

    <h3>3. La fonction de Green : réponse à une source ponctuelle</h3>
    <p>Pour un opérateur différentiel linéaire $\\mathcal{L}$ (par exemple $\\mathcal{L}=\\Delta$, ou $\\mathcal{L}=\\partial_t - D\\Delta$), la <strong>fonction de Green</strong> $G(x,x')$ est définie comme la solution de l'équation avec une source ponctuelle (delta de Dirac) placée en $x'$ :</p>
    <div class="formula-box">$$\\mathcal{L}\\,G(x,x') = \\delta(x-x')$$</div>
    <p>avec des conditions aux limites adaptées au problème physique considéré. Physiquement, $G(x,x')$ représente la <strong>réponse du système</strong> (potentiel, déplacement, température...) en un point $x$, à une source ponctuelle unitaire placée en $x'$.</p>

    <h3>4. Résolution par convolution : la puissance de la méthode</h3>
    <p>L'intérêt majeur de la fonction de Green réside dans la <strong>linéarité</strong> de $\\mathcal{L}$ : une fois $G$ connue (calculée une seule fois pour un opérateur et des conditions aux limites donnés), la solution de l'équation inhomogène générale $\\mathcal{L}u = f(x)$, pour <strong>n'importe quelle source</strong> $f$, s'obtient immédiatement par superposition (intégrale de convolution) :</p>
    <div class="formula-box">$$u(x) = \\int G(x,x')\\,f(x')\\,dx'$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi c'est si puissant</span>
      Cette formule découle directement de la linéarité de $\\mathcal{L}$ et de la propriété d'échantillonnage du delta : $\\mathcal{L}\\,u(x) = \\int \\mathcal{L}G(x,x')\\,f(x')\\,dx' = \\int \\delta(x-x')f(x')\\,dx' = f(x)$. Une fois $G$ déterminée pour un système physique donné (ex : le potentiel créé par une charge ponctuelle dans une géométrie donnée), on obtient <strong>instantanément</strong> la réponse à <strong>toute</strong> distribution de source, sans avoir à résoudre à nouveau l'équation différentielle — un gain conceptuel et pratique considérable, exploité systématiquement en électrostatique, en théorie des champs et en mécanique quantique (propagateurs).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> En électrostatique 3D, la fonction de Green du laplacien (avec condition de décroissance à l'infini) est $G(\\vec{r},\\vec{r}') = -\\dfrac{1}{4\\pi|\\vec{r}-\\vec{r}'|}$, solution de $\\Delta G = \\delta(\\vec{r}-\\vec{r}')$. Comment cette fonction de Green permet-elle de retrouver le potentiel électrostatique créé par une distribution de charge quelconque $\\rho(\\vec{r})$ ?</p>
      <p><strong>Solution :</strong> L'équation de Poisson $\\Delta V = -\\rho/\\varepsilon_0$ se résout, par la méthode de convolution, en $V(\\vec{r}) = \\displaystyle\\int \\left(-\\dfrac{\\rho(\\vec{r}')}{\\varepsilon_0}\\right)\\times\\left(-\\dfrac{1}{4\\pi|\\vec{r}-\\vec{r}'|}\\right)d^3r' = \\dfrac{1}{4\\pi\\varepsilon_0}\\displaystyle\\int \\dfrac{\\rho(\\vec{r}')}{|\\vec{r}-\\vec{r}'|}\\,d^3r'$.</p>
      <p class="example-answer">Réponse : on retrouve exactement la formule intégrale bien connue du potentiel électrostatique créé par une distribution de charge — la fonction de Green du laplacien encode, à elle seule, toute la physique du problème, quelle que soit la distribution $\\rho$ considérée.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La fonction delta de Dirac est une distribution, définie par sa propriété d'échantillonnage ∫f(x)δ(x−a)dx=f(a), pas une fonction ordinaire</li>
      <li>δ(x) = H'(x) au sens des distributions, où H est la fonction de Heaviside</li>
      <li>La fonction de Green G(x,x') est la réponse d'un opérateur linéaire L à une source ponctuelle : LG(x,x')=δ(x−x')</li>
      <li>La solution générale de Lu=f s'obtient par convolution u(x)=∫G(x,x')f(x')dx', valable pour n'importe quelle source f</li>
      <li>Cette méthode évite de résoudre à nouveau l'équation différentielle pour chaque nouvelle distribution de source</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Traiter δ(x) comme une fonction ordinaire ayant une valeur bien définie en x=0 — c'est une distribution, définie par son action intégrale sur des fonctions test</li>
      <li>Oublier d'adapter les conditions aux limites de la fonction de Green au problème physique considéré</li>
      <li>Croire qu'il faut recalculer G à chaque nouvelle source f — c'est précisément l'intérêt de la méthode de ne pas avoir à le faire</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La fonction delta de Dirac est reliée à la fonction de Heaviside H par quelle relation ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp8e1" value="wrong">δ(x) = H(x)²</label>
        <label class="option"><input type="radio" name="mmp8e1" value="right">δ(x) = H'(x)</label>
        <label class="option"><input type="radio" name="mmp8e1" value="wrong">δ(x) = 1/H(x)</label>
        <label class="option"><input type="radio" name="mmp8e1" value="wrong">Aucune relation entre les deux</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp8e1','mmp8fb1','Correct — δ(x)=H\\'(x) au sens des distributions, formalisant l\\'idée d\\'une densité ponctuelle unité.','Relis le point clé sur la relation entre delta de Dirac et fonction de Heaviside.')">Vérifier</button>
      <div class="feedback" id="mmp8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quel est l'intérêt principal de connaître la fonction de Green d'un opérateur linéaire L ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mmp8e2" value="wrong">Elle ne sert que pour une seule source particulière</label>
        <label class="option"><input type="radio" name="mmp8e2" value="right">Elle permet d'obtenir la solution pour n'importe quelle source f, par simple convolution</label>
        <label class="option"><input type="radio" name="mmp8e2" value="wrong">Elle simplifie uniquement les calculs numériques, pas analytiques</label>
        <label class="option"><input type="radio" name="mmp8e2" value="wrong">Elle ne s'applique qu'aux opérateurs non linéaires</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mmp8e2','mmp8fb2','Correct — une fois G connue, u(x)=∫G(x,x\\')f(x\\')dx\\' donne la solution pour toute source f, sans refaire le calcul depuis le début.','Relis le point clé « pourquoi c\\'est si puissant » sur l\\'usage de la fonction de Green pour toute source.')">Vérifier</button>
      <div class="feedback" id="mmp8fb2"></div>
    </div>
  </div>
  `
};
MATHPHYS_NOVA_KB[mmpKey("Distributions, fonction delta de Dirac et fonctions de Green")] = {
  intro: "Salut, moi c'est Nova ! On termine avec les distributions, le delta de Dirac et les fonctions de Green. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/delta de dirac|fonction delta/i, replies:[
      "La fonction delta de Dirac est une distribution, définie par ∫f(x)δ(x−a)dx=f(a) (propriété d'échantillonnage) — ce n'est pas une fonction ordinaire."
    ]},
    { test:/heaviside/i, replies:[
      "δ(x) = H'(x) au sens des distributions, où H est la fonction échelon de Heaviside — cela formalise l'idée d'une densité ponctuelle unité."
    ]},
    { test:/fonction de green/i, replies:[
      "La fonction de Green G(x,x') est la réponse d'un opérateur linéaire L à une source ponctuelle : LG(x,x')=δ(x−x'). Une fois connue, elle donne la solution pour toute source par convolution."
    ]},
    { test:/convolution.*fonction de green|superposition/i, replies:[
      "La solution générale u(x)=∫G(x,x')f(x')dx' s'obtient par superposition/convolution — un gain considérable, car G n'a besoin d'être calculée qu'une seule fois pour l'opérateur et les conditions aux limites donnés."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la relation entre delta de Dirac et fonction de Heaviside.",
      "Indice niveau 2 : ce n'est ni un carré, ni un inverse.",
      "Indice niveau 3 : c'est une dérivée : δ(x)=H'(x)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce que permet de faire G une fois calculée.",
      "Indice niveau 2 : elle ne se limite pas à une seule source particulière.",
      "Indice niveau 3 : elle permet d'obtenir la solution pour toute source f, par simple convolution."
    ]}
  ]
};

/* fusionne le module Méthodes mathématiques pour la physique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MATHPHYS_CHAPTERS);
Object.assign(NOVA_KB, MATHPHYS_NOVA_KB);