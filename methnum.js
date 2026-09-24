/* =====================================================================
   CHUNK « methnum » — registre METHNUM_CHAPTERS / METHNUM_NOVA_KB
   Matière(s) : Mathématiques|Méthodes numériques
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   METHNUM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — MÉTHODES NUMÉRIQUES (L3PF, domaine Mathématiques)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Ce cours complète, sur un plan résolument théorique (convergence, stabilité,
   estimations d'erreur, démonstrations), le cours "Physique numérique" (domaine
   Informatique) qui aborde les mêmes familles de méthodes sous un angle appliqué et
   algorithmique. Contenu : erreurs et stabilité numérique, résolution des équations
   non linéaires (bissection, point fixe, Newton-Raphson) avec analyse de l'ordre de
   convergence, interpolation polynomiale (Lagrange, Newton, phénomène de Runge),
   intégration numérique (Newton-Cotes, quadrature de Gauss), résolution des systèmes
   linéaires par méthodes directes (LU, Cholesky) et itératives (Jacobi, Gauss-Seidel),
   méthodes numériques pour les équations différentielles (consistance, stabilité,
   convergence, théorème de Lax-Richtmyer), et problèmes aux valeurs propres (méthode
   de la puissance, introduction à l'algorithme QR) — conforme aux maquettes LMD
   d'analyse numérique en L3 Physique Fondamentale. Références de fond : R.L. Burden &
   J.D. Faires, Numerical Analysis (Cengage) ; A. Quarteroni, R. Sacco & F. Saleri,
   Numerical Mathematics (Springer) ; J. Stoer & R. Bulirsch, Introduction to Numerical
   Analysis (Springer).
===================================================================================== */
const METHNUM_MATIERE = 'Méthodes numériques';
function mnKey(chapterTitle){ return `Mathématiques|${METHNUM_MATIERE}|${chapterTitle}`; }
const METHNUM_CHAPTERS = {};
const METHNUM_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Comparateur de convergence bissection / Newton-Raphson (chapitre 2)
--------------------------------------------------------------------------------- */
function updateConvergenceSim(){
  const eps0 = parseFloat(document.getElementById('cvEps0').value) || 0.1;
  const target = parseFloat(document.getElementById('cvTarget').value) || 1e-8;
  const out = document.getElementById('cvReadout');
  // Bissection : erreur divisée par 2 à chaque itération (ordre 1, facteur 1/2)
  let eBis = eps0, nBis = 0;
  while(eBis > target && nBis < 200){ eBis /= 2; nBis++; }
  // Newton (ordre 2) : e_{n+1} ~ C * e_n^2, on prend C=1 pour comparaison pédagogique
  let eNewt = eps0, nNewt = 0;
  while(eNewt > target && nNewt < 200){ eNewt = eNewt*eNewt; nNewt++; }
  out.innerHTML = `Bissection (ordre 1, convergence linéaire) : <strong>${nBis}</strong> itérations nécessaires<br>` +
    `Newton-Raphson (ordre 2, convergence quadratique) : <strong>${nNewt}</strong> itérations nécessaires<br>` +
    `<span style="color:var(--ink-soft); font-size:0.85rem;">Illustration pédagogique : la convergence quadratique de Newton double approximativement le nombre de décimales exactes à chaque itération, une fois suffisamment proche de la racine.</span>`;
}
function initConvergenceSim(){ updateConvergenceSim(); }

/* =========================== CHAPITRE 1 =========================== */
METHNUM_CHAPTERS[mnKey("Erreurs, conditionnement et stabilité numérique")] = {
  objectives: [
    "Distinguer erreur absolue, erreur relative et précision machine",
    "Comprendre les notions de conditionnement d'un problème et de stabilité d'un algorithme",
    "Énoncer le théorème d'équivalence de Lax et ses trois piliers : consistance, stabilité, convergence",
    "Identifier les phénomènes numériques dangereux : cancellation catastrophique, amplification d'erreur"
  ],
  prereqs: ["Convergence et fonctions de plusieurs variables (L2)", "Outils informatiques et analyse de données (L1)"],
  bodyHtml: `
    <p>L'analyse numérique n'est pas qu'une boîte à outils d'algorithmes : c'est une discipline mathématique à part entière, qui étudie <strong>rigoureusement</strong> la fiabilité, la précision et la vitesse de convergence des méthodes approchées. Ce premier chapitre pose le socle théorique indispensable — représentation des nombres, erreurs, conditionnement, stabilité — avant d'étudier au fil du cours les grandes familles de méthodes numériques.</p>

    <h3>1. Erreur absolue et erreur relative</h3>
    <p>Si $\\tilde{x}$ est une valeur approchée d'une quantité exacte $x$, on définit :</p>
    <div class="formula-box">$$\\text{Erreur absolue : } e = |\\tilde{x} - x| \\qquad \\text{Erreur relative : } e_r = \\dfrac{|\\tilde{x}-x|}{|x|} \\ (x\\ne0)$$</div>
    <p>L'erreur relative est en général plus significative que l'erreur absolue, car elle rend compte de la précision indépendamment de l'ordre de grandeur de $x$ : une erreur absolue de 1 est négligeable si $x \\sim 10^{9}$, mais catastrophique si $x \\sim 10^{-3}$.</p>

    <h3>2. La précision machine</h3>
    <p>En arithmétique flottante (norme IEEE 754), tout nombre réel est représenté avec un nombre fini de chiffres significatifs, ce qui introduit une erreur d'arrondi systématique à chaque opération. On définit la <strong>précision machine</strong> $\\varepsilon_{mach}$ comme le plus petit nombre tel que $1 + \\varepsilon_{mach}$ soit représentable distinctement de $1$ en arithmétique flottante — de l'ordre de $2^{-52} \\approx 2{,}2\\times10^{-16}$ en double précision (64 bits).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — la cancellation catastrophique</span>
      Un des pièges numériques les plus insidieux est la <strong>cancellation catastrophique</strong> : la soustraction de deux nombres très proches en valeur peut faire perdre un grand nombre de chiffres significatifs, même si chacun des deux nombres est représenté avec une excellente précision relative. Exemple classique : calculer $f(x) = \\dfrac{1-\\cos x}{x^2}$ pour $x$ petit par la formule directe amplifie fortement l'erreur d'arrondi, alors qu'une reformulation algébrique équivalente (via $1-\\cos x = 2\\sin^2(x/2)$) élimine ce problème.
    </div>

    <h3>3. Conditionnement d'un problème et stabilité d'un algorithme</h3>
    <p>Il est essentiel de distinguer deux notions souvent confondues :</p>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th></tr>
      <tr><td><strong>Conditionnement</strong></td><td>Propriété intrinsèque du <em>problème mathématique</em> lui-même : mesure de la sensibilité de la solution à de petites perturbations des données d'entrée, indépendamment de la méthode de calcul employée</td></tr>
      <tr><td><strong>Stabilité numérique</strong></td><td>Propriété de l'<em>algorithme</em> utilisé : mesure de l'amplification (ou non) des erreurs d'arrondi au cours des calculs successifs</td></tr>
    </table>
    <p>Un problème peut être <strong>mal conditionné</strong> (sensible aux petites perturbations, quelle que soit la méthode employée — aucun algorithme, aussi stable soit-il, ne pourra alors garantir un résultat précis), tandis qu'un algorithme peut être <strong>instable</strong> même appliqué à un problème parfaitement bien conditionné (un meilleur algorithme résoudrait alors le problème de façon satisfaisante).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un système linéaire $Ax=b$ possède une matrice $A$ dont le déterminant est très proche de zéro (matrice quasi-singulière). Est-ce un problème de conditionnement ou de stabilité de l'algorithme de résolution ?</p>
      <p><strong>Solution :</strong> Une matrice quasi-singulière rend le problème <strong>mal conditionné</strong> : de très petites perturbations sur $b$ (ou sur les coefficients de $A$) peuvent entraîner de très grandes variations de la solution $x$, quel que soit l'algorithme de résolution employé (élimination de Gauss, décomposition LU...). C'est une propriété intrinsèque du problème, pas de la méthode.</p>
      <p class="example-answer">Réponse : c'est un problème de conditionnement (mauvais conditionnement de la matrice $A$), pas une question de stabilité algorithmique.</p>
    </div>

    <h3>4. Le théorème d'équivalence de Lax</h3>
    <p>Pour les méthodes numériques appliquées à des équations différentielles (approfondies au chapitre 7), le <strong>théorème d'équivalence de Lax-Richtmyer</strong> (1956) énonce un résultat fondamental reliant trois propriétés :</p>
    <div class="formula-box" style="font-family:'IBM Plex Sans',sans-serif; font-size:1rem;">Consistance + Stabilité &nbsp;⟺&nbsp; Convergence &nbsp;(pour un schéma linéaire bien posé)</div>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Consistance :</strong> l'erreur de troncature locale du schéma tend vers zéro quand le pas de discrétisation tend vers zéro</li>
      <li><strong>Stabilité :</strong> les erreurs (d'arrondi ou de troncature) ne s'amplifient pas de façon incontrôlée au cours des itérations</li>
      <li><strong>Convergence :</strong> la solution numérique tend vers la solution exacte quand le pas de discrétisation tend vers zéro</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ce théorème est capital en pratique : la consistance seule (un schéma « proche » de l'équation exacte) ne garantit <strong>pas</strong> la convergence si le schéma est instable. C'est pourquoi l'étude de la stabilité (via l'analyse de von Neumann ou l'étude des facteurs d'amplification) est une étape incontournable de la conception de toute méthode numérique, et sera développée au chapitre 7.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>L'erreur relative est en général plus significative que l'erreur absolue pour juger de la précision d'un résultat numérique</li>
      <li>La précision machine ε_mach (≈ 2,2×10⁻¹⁶ en double précision) borne la précision de toute arithmétique flottante</li>
      <li>La cancellation catastrophique survient lors de la soustraction de deux nombres proches, et peut être évitée par reformulation algébrique</li>
      <li>Le conditionnement est une propriété du problème ; la stabilité numérique est une propriété de l'algorithme — ne pas les confondre</li>
      <li>Théorème de Lax-Richtmyer : consistance + stabilité ⟺ convergence, pour un schéma linéaire bien posé</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'un problème mal conditionné peut être résolu précisément simplement en changeant d'algorithme</li>
      <li>Négliger l'erreur relative au profit de la seule erreur absolue lors de l'évaluation de la précision d'un calcul</li>
      <li>Penser que la consistance d'un schéma numérique suffit à elle seule à garantir sa convergence, sans vérifier la stabilité</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Le calcul direct de $1-\\cos x$ pour $x$ très petit souffre d'un problème numérique bien identifié. Lequel ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn1e1" value="wrong">Dépassement de capacité (overflow)</label>
        <label class="option"><input type="radio" name="mn1e1" value="right">Cancellation catastrophique</label>
        <label class="option"><input type="radio" name="mn1e1" value="wrong">Instabilité de l'algorithme de tri</label>
        <label class="option"><input type="radio" name="mn1e1" value="wrong">Mauvais conditionnement du problème</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn1e1','mn1fb1','Correct — cos(x) est très proche de 1 pour x petit, donc la soustraction 1−cos(x) perd de nombreux chiffres significatifs : c\\'est une cancellation catastrophique.','Pense à ce qui se passe quand on soustrait deux nombres numériquement très proches l\\'un de l\\'autre.')">Vérifier</button>
      <div class="feedback" id="mn1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Selon le théorème de Lax-Richtmyer, que faut-il en plus de la consistance pour garantir la convergence d'un schéma linéaire ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn1e2" value="wrong">Un pas de temps constant</label>
        <label class="option"><input type="radio" name="mn1e2" value="right">La stabilité du schéma</label>
        <label class="option"><input type="radio" name="mn1e2" value="wrong">Un ordinateur suffisamment puissant</label>
        <label class="option"><input type="radio" name="mn1e2" value="wrong">Un problème parfaitement bien conditionné</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn1e2','mn1fb2','Correct — consistance + stabilité équivaut à convergence : la consistance seule ne suffit pas si le schéma est instable.','Relis la formule du théorème de Lax-Richtmyer : consistance + quoi = convergence ?')">Vérifier</button>
      <div class="feedback" id="mn1fb2"></div>
    </div>
  </div>
  `
};
METHNUM_NOVA_KB[mnKey("Erreurs, conditionnement et stabilité numérique")] = {
  intro: "Salut, moi c'est Nova ! On démarre les méthodes numériques par les bases théoriques : erreurs, conditionnement, stabilité. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/erreur absolue|erreur relative/i, replies:[
      "Erreur absolue : |x̃−x|. Erreur relative : |x̃−x|/|x|. L'erreur relative est en général plus significative, car indépendante de l'ordre de grandeur de x."
    ]},
    { test:/cancellation|catastrophique/i, replies:[
      "La cancellation catastrophique survient lors de la soustraction de deux nombres numériquement proches : on perd de nombreux chiffres significatifs. Une reformulation algébrique équivalente permet souvent de l'éviter."
    ]},
    { test:/conditionnement|stabilit[ée] num[ée]rique/i, replies:[
      "Le conditionnement est une propriété du problème mathématique (sensibilité aux perturbations des données). La stabilité numérique est une propriété de l'algorithme (amplification ou non des erreurs d'arrondi). Ne pas les confondre !"
    ]},
    { test:/lax|consistance|convergence/i, replies:[
      "Théorème de Lax-Richtmyer : consistance + stabilité ⟺ convergence, pour un schéma linéaire bien posé. La consistance seule ne suffit pas si le schéma est instable."
    ]},
    { test:/pr[ée]cision machine|epsilon|ε/i, replies:[
      "La précision machine ε_mach est le plus petit nombre tel que 1+ε_mach soit distinguable de 1 en arithmétique flottante — environ 2,2×10⁻¹⁶ en double précision (64 bits)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la valeur de cos(x) quand x est très petit.",
      "Indice niveau 2 : cos(x) est alors très proche de 1, donc 1−cos(x) soustrait deux valeurs proches.",
      "Indice niveau 3 : c'est une cancellation catastrophique."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule exacte du théorème de Lax-Richtmyer.",
      "Indice niveau 2 : ce n'est ni la puissance de l'ordinateur, ni le conditionnement du problème.",
      "Indice niveau 3 : il faut la stabilité du schéma en plus de la consistance."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
METHNUM_CHAPTERS[mnKey("Résolution d'équations non linéaires : convergence et ordre")] = {
  objectives: [
    "Énoncer le théorème des valeurs intermédiaires justifiant la méthode de bissection",
    "Établir la condition de convergence d'une méthode de point fixe",
    "Démontrer l'ordre de convergence quadratique de la méthode de Newton-Raphson",
    "Comparer la vitesse de convergence des différentes méthodes de résolution"
  ],
  prereqs: ["Erreurs, conditionnement et stabilité numérique"],
  bodyHtml: `
    <p>Résoudre $f(x) = 0$ est l'un des problèmes les plus fondamentaux de l'analyse numérique — omniprésent en physique (recherche d'états d'équilibre, de valeurs propres, de racines de polynômes caractéristiques). Ce chapitre étudie, avec rigueur, la <strong>vitesse de convergence</strong> des principales méthodes.</p>

    <h3>1. La méthode de bissection : convergence garantie mais lente</h3>
    <p>Si $f$ est continue sur $[a,b]$ avec $f(a)\\cdot f(b) < 0$, le <strong>théorème des valeurs intermédiaires</strong> garantit l'existence d'au moins une racine dans $[a,b]$. La méthode de bissection divise successivement l'intervalle en deux, en conservant à chaque étape le sous-intervalle contenant un changement de signe. Après $n$ itérations, l'intervalle a une largeur $(b-a)/2^n$, donc l'erreur est bornée par :</p>
    <div class="formula-box">$$|x_n - x^*| \\le \\dfrac{b-a}{2^{n+1}}$$</div>
    <p>La convergence est dite <strong>linéaire</strong> (ou d'ordre 1) : l'erreur est divisée par un facteur constant (ici 2) à chaque itération. C'est la méthode la plus robuste (convergence garantie sous la seule hypothèse de continuité et de changement de signe), mais aussi la plus lente des méthodes présentées ici.</p>

    <h3>2. La méthode du point fixe</h3>
    <p>On réécrit l'équation $f(x)=0$ sous la forme équivalente $x = g(x)$, et on itère $x_{n+1} = g(x_n)$. Le <strong>théorème du point fixe de Banach</strong> garantit la convergence de cette suite vers l'unique point fixe si $g$ est <strong>contractante</strong> sur un intervalle stable, c'est-à-dire s'il existe $k < 1$ tel que :</p>
    <div class="formula-box">$$|g'(x)| \\le k < 1 \\quad \\text{sur un voisinage de la racine}$$</div>
    <p>Le choix de la fonction $g$ (il en existe une infinité, associées à une même équation $f(x)=0$) est donc crucial : certains choix convergent rapidement, d'autres divergent complètement, alors qu'ils correspondent à la même équation de départ.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour résoudre $x^2 - 2 = 0$ (racine $\\sqrt{2}$), on propose deux formulations en point fixe : (A) $g_1(x) = 2/x$ et (B) $g_2(x) = (x + 2/x)/2$. Laquelle converge localement vers $\\sqrt{2}$ ?</p>
      <p><strong>Solution :</strong> $g_1'(x) = -2/x^2$, donc $|g_1'(\\sqrt{2})| = |{-2/2}| = 1$ : la condition stricte $|g'|<1$ n'est pas satisfaite, la méthode ne converge pas (elle oscille). $g_2'(x) = 1/2 - 1/x^2$, donc $g_2'(\\sqrt{2}) = 1/2 - 1/2 = 0$ : très largement $|g_2'(\\sqrt2)| < 1$, la convergence est assurée, et même particulièrement rapide (puisque $g_2'(\\sqrt2)=0$).</p>
      <p class="example-answer">Réponse : seule la formulation (B) converge localement vers √2 ; (B) est d'ailleurs exactement la méthode de Newton appliquée à cette équation.</p>
    </div>

    <h3>3. La méthode de Newton-Raphson et sa convergence quadratique</h3>
    <p>La méthode de Newton-Raphson, particulièrement utilisée en pratique pour sa rapidité, s'écrit :</p>
    <div class="formula-box">$$x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}$$</div>
    <p>Elle s'obtient en linéarisant $f$ au voisinage de $x_n$ (développement de Taylor à l'ordre 1) et en cherchant le zéro de cette approximation linéaire (la tangente). On démontre, par un développement de Taylor à l'ordre 2 de $f$ autour de la racine $x^*$ (en supposant $f'(x^*) \\ne 0$ et $f$ deux fois dérivable), que l'erreur $e_n = x_n - x^*$ vérifie :</p>
    <div class="formula-box">$$e_{n+1} \\approx \\dfrac{f''(x^*)}{2f'(x^*)}\\,e_n^2$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — convergence quadratique</span>
      Cette relation $e_{n+1} \\propto e_n^2$ signifie que la méthode de Newton converge à l'<strong>ordre 2</strong> (convergence <strong>quadratique</strong>) : une fois suffisamment proche de la racine, le <strong>nombre de décimales exactes double approximativement à chaque itération</strong>. C'est spectaculairement plus rapide que la bissection (ordre 1) : là où la bissection nécessite des dizaines d'itérations pour atteindre une précision donnée, Newton n'en nécessite souvent que 4 ou 5.
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — comparaison du nombre d'itérations</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Compare (de façon pédagogique et simplifiée) le nombre d'itérations nécessaires pour atteindre une précision cible, entre bissection (ordre 1) et Newton (ordre 2).</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>Erreur initiale</label><input type="number" id="cvEps0" value="0.1" step="0.01" oninput="updateConvergenceSim()">
          <label>Précision cible</label><input type="number" id="cvTarget" value="0.00000001" step="0.0000001" oninput="updateConvergenceSim()">
          <div class="sim-readout" id="cvReadout"></div>
        </div>
      </div>
    </div>

    <h3>4. Limites de la méthode de Newton</h3>
    <p>La convergence quadratique de Newton n'est garantie que <strong>localement</strong> (pour un point de départ suffisamment proche de la racine) et sous réserve que $f'(x^*) \\ne 0$ (racine simple). Si $f'(x_n)$ s'annule ou devient très petit en cours d'itération, la méthode peut diverger ou osciller de façon incontrôlée ; si la racine est <strong>multiple</strong> ($f'(x^*)=0$ également), la convergence redevient seulement linéaire.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La bissection converge linéairement (ordre 1) mais de façon garantie, dès que f change de signe sur l'intervalle</li>
      <li>La méthode du point fixe converge si |g'| < 1 au voisinage de la racine (théorème du point fixe de Banach) — le choix de g conditionne la convergence</li>
      <li>Newton-Raphson converge quadratiquement (ordre 2) : le nombre de décimales exactes double environ à chaque itération, près de la racine</li>
      <li>La convergence de Newton n'est que locale et suppose une racine simple (f'(x*) ≠ 0)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que toute formulation en point fixe x=g(x) d'une même équation converge — seule une formulation contractante (|g'|<1) le fait</li>
      <li>Appliquer Newton-Raphson sans vérifier que f'(x_n) reste suffisamment éloigné de zéro pendant les itérations</li>
      <li>Oublier que la convergence quadratique de Newton n'est que locale, pas garantie pour un point de départ arbitraire</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est l'ordre de convergence de la méthode de bissection ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn2e1" value="right">Ordre 1 (convergence linéaire)</label>
        <label class="option"><input type="radio" name="mn2e1" value="wrong">Ordre 2 (convergence quadratique)</label>
        <label class="option"><input type="radio" name="mn2e1" value="wrong">Ordre 3 (convergence cubique)</label>
        <label class="option"><input type="radio" name="mn2e1" value="wrong">La bissection ne converge jamais</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn2e1','mn2fb1','Correct — l\\'erreur est divisée par 2 (facteur constant) à chaque itération : c\\'est une convergence linéaire, d\\'ordre 1.','Relis la formule de l\\'erreur bornée par (b-a)/2^(n+1) : par quel facteur constant est-elle réduite à chaque étape ?')">Vérifier</button>
      <div class="feedback" id="mn2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quelle condition garantit la convergence locale d'une méthode de point fixe x_(n+1)=g(x_n) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn2e2" value="wrong">g doit être continue uniquement</label>
        <label class="option"><input type="radio" name="mn2e2" value="right">|g'(x)| ≤ k &lt; 1 au voisinage de la racine</label>
        <label class="option"><input type="radio" name="mn2e2" value="wrong">g doit être un polynôme</label>
        <label class="option"><input type="radio" name="mn2e2" value="wrong">x0 doit être positif</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn2e2','mn2fb2','Correct — c\\'est la condition de contraction du théorème du point fixe de Banach.','Relis le théorème du point fixe de Banach : quelle condition porte sur la dérivée de g ?')">Vérifier</button>
      <div class="feedback" id="mn2fb2"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 3</span>
      <p class="q">Dans quel cas la convergence de la méthode de Newton-Raphson redevient-elle seulement linéaire (au lieu de quadratique) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn2e3" value="wrong">Quand la fonction f est un polynôme</label>
        <label class="option"><input type="radio" name="mn2e3" value="right">Quand la racine est multiple (f'(x*) = 0)</label>
        <label class="option"><input type="radio" name="mn2e3" value="wrong">Quand x0 est un nombre entier</label>
        <label class="option"><input type="radio" name="mn2e3" value="wrong">Cela n'arrive jamais, Newton est toujours quadratique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn2e3','mn2fb3','Correct — si f\\'(x*) = 0 également (racine multiple), la démonstration de la convergence quadratique ne s\\'applique plus, et la convergence redevient linéaire.','Relis la section « Limites de la méthode de Newton » : quelle hypothèse sur f\\'(x*) est nécessaire pour l\\'ordre 2 ?')">Vérifier</button>
      <div class="feedback" id="mn2fb3"></div>
    </div>
  </div>
  `,
  init: initConvergenceSim
};
METHNUM_NOVA_KB[mnKey("Résolution d'équations non linéaires : convergence et ordre")] = {
  intro: "Salut, moi c'est Nova ! On étudie la résolution d'équations non linéaires et la vitesse de convergence : bissection, point fixe, Newton-Raphson. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/bissection/i, replies:[
      "La bissection converge linéairement (ordre 1) : l'erreur est divisée par 2 à chaque itération. Convergence lente mais garantie dès que f change de signe sur l'intervalle."
    ]},
    { test:/point fixe|banach/i, replies:[
      "Le théorème du point fixe de Banach garantit la convergence de x_(n+1)=g(x_n) si |g'(x)| ≤ k < 1 au voisinage de la racine — c'est la condition de contraction."
    ]},
    { test:/newton|raphson|quadratique/i, replies:[
      "Newton-Raphson converge quadratiquement (ordre 2) : e_(n+1) ∝ e_n². Le nombre de décimales exactes double environ à chaque itération, près de la racine — mais seulement localement, et si f'(x*)≠0."
    ]},
    { test:/racine multiple/i, replies:[
      "Si la racine est multiple (f'(x*)=0 en plus de f(x*)=0), la convergence de Newton redevient seulement linéaire, pas quadratique."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : regarde par quel facteur l'erreur est divisée à chaque itération de bissection.",
      "Indice niveau 2 : ce facteur est constant, égal à 2.",
      "Indice niveau 3 : une division par un facteur constant correspond à un ordre 1 (linéaire)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : c'est le théorème du point fixe de Banach qui donne la réponse.",
      "Indice niveau 2 : la condition porte sur la dérivée de g, pas sur g elle-même.",
      "Indice niveau 3 : c'est |g'(x)| ≤ k < 1 au voisinage de la racine."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : pense à l'hypothèse f'(x*) ≠ 0 nécessaire à la démonstration de l'ordre 2.",
      "Indice niveau 2 : que se passe-t-il si cette hypothèse n'est plus vérifiée ?",
      "Indice niveau 3 : c'est le cas d'une racine multiple, où f'(x*) = 0 aussi."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
METHNUM_CHAPTERS[mnKey("Interpolation polynomiale : Lagrange, Newton et phénomène de Runge")] = {
  objectives: [
    "Construire le polynôme d'interpolation de Lagrange et vérifier son unicité",
    "Utiliser la formule de Newton aux différences divisées comme alternative constructive",
    "Établir et interpréter la formule de l'erreur d'interpolation",
    "Comprendre le phénomène de Runge et l'intérêt des nœuds de Chebyshev"
  ],
  prereqs: ["Résolution d'équations non linéaires : convergence et ordre"],
  bodyHtml: `
    <p>L'interpolation polynomiale répond à une question centrale : étant donné $n+1$ points $(x_i, y_i)$, existe-t-il un polynôme de degré au plus $n$ passant exactement par tous ces points ? Ce chapitre en établit l'existence, l'unicité, et surtout les <strong>limites</strong> — un aspect trop souvent sous-estimé en pratique.</p>

    <h3>1. Existence et unicité : le polynôme de Lagrange</h3>
    <p>Étant donné $n+1$ points d'abscisses distinctes $x_0, \\ldots, x_n$, il existe un <strong>unique</strong> polynôme $P_n$ de degré au plus $n$ tel que $P_n(x_i) = y_i$ pour tout $i$. Il s'écrit explicitement sous la forme de Lagrange :</p>
    <div class="formula-box">$$P_n(x) = \\sum_{i=0}^{n} y_i\\, L_i(x), \\qquad L_i(x) = \\prod_{\\substack{j=0 \\\\ j\\ne i}}^{n} \\dfrac{x - x_j}{x_i - x_j}$$</div>
    <p>Chaque <strong>polynôme de base $L_i$</strong> vaut 1 en $x_i$ et 0 en tous les autres nœuds $x_j$ ($j\\ne i$) — une propriété qui garantit immédiatement que $P_n(x_i)=y_i$. L'unicité découle d'un argument simple : si deux polynômes de degré $\\le n$ coïncidaient en $n+1$ points distincts, leur différence serait un polynôme de degré $\\le n$ ayant $n+1$ racines, donc identiquement nul.</p>

    <h3>2. La formule de Newton aux différences divisées</h3>
    <p>La forme de Lagrange, bien qu'explicite, est peu pratique lorsqu'on ajoute un nouveau point (il faut tout recalculer). La <strong>forme de Newton</strong>, construite à partir des <strong>différences divisées</strong> $f[x_0,\\ldots,x_k]$ (définies récursivement), donne le même polynôme unique sous une forme incrémentale :</p>
    <div class="formula-box">$$P_n(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \\cdots$$</div>
    <p>Cette forme permet d'ajouter un point supplémentaire sans recalculer l'ensemble du polynôme — un avantage pratique important, même si le polynôme obtenu est, par unicité, rigoureusement identique à celui de Lagrange.</p>

    <h3>3. La formule de l'erreur d'interpolation</h3>
    <p>Si $f$ est $(n+1)$ fois continûment dérivable sur un intervalle contenant les nœuds et le point $x$, l'erreur d'interpolation admet l'expression exacte suivante, pour un certain $\\xi(x)$ dans cet intervalle :</p>
    <div class="formula-box">$$f(x) - P_n(x) = \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}\\, \\prod_{i=0}^{n}(x-x_i)$$</div>
    <p>Cette formule est très instructive : l'erreur dépend à la fois de la <strong>régularité de $f$</strong> (via sa dérivée d'ordre $n+1$) et de la <strong>répartition des nœuds</strong> (via le produit $\\prod(x-x_i)$). Elle explique pourquoi augmenter naïvement le degré du polynôme d'interpolation n'améliore pas nécessairement la précision.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — le phénomène de Runge</span>
      Contrairement à l'intuition, <strong>augmenter le degré</strong> d'un polynôme d'interpolation avec des <strong>nœuds équirépartis</strong> peut faire <strong>diverger</strong> l'approximation près des bords de l'intervalle, même pour une fonction $f$ parfaitement lisse. C'est le célèbre <strong>phénomène de Runge</strong> (Carl Runge, 1901), illustré classiquement avec $f(x) = 1/(1+25x^2)$ sur $[-1,1]$ : les oscillations du polynôme d'interpolation près des bords s'amplifient de façon spectaculaire à mesure que le degré augmente.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi le phénomène de Runge disparaît-il (ou se réduit-il drastiquement) lorsqu'on choisit des <strong>nœuds de Chebyshev</strong> plutôt que des nœuds équirépartis ?</p>
      <p><strong>Solution :</strong> Les nœuds de Chebyshev sont resserrés près des bords de l'intervalle (et plus espacés au centre), ce qui contrôle spécifiquement le facteur $\\prod(x-x_i)$ de la formule d'erreur : ce produit, pour ce choix particulier de nœuds, admet un maximum bien plus faible sur tout l'intervalle que pour des nœuds équirépartis, en particulier près des bords où le phénomène de Runge se manifeste le plus fortement.</p>
      <p class="example-answer">Réponse : les nœuds de Chebyshev minimisent le facteur géométrique de l'erreur d'interpolation, ce qui supprime l'essentiel des oscillations de bord observées avec des nœuds équirépartis.</p>
    </div>

    <h3>4. Interpolation par morceaux : une alternative pratique</h3>
    <p>Une autre stratégie, largement utilisée en pratique (et développée en application dans le cours de Physique numérique), consiste à renoncer à un unique polynôme de haut degré sur tout l'intervalle, au profit d'une <strong>interpolation par morceaux</strong> de bas degré (fonctions splines, notamment splines cubiques) : chaque intervalle entre deux nœuds successifs est interpolé par un polynôme de degré modeste (souvent 3), avec des conditions de raccordement (continuité de la fonction, de sa dérivée, parfois de sa dérivée seconde) aux points de jonction. Cette approche évite structurellement le phénomène de Runge.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Il existe un unique polynôme de degré ≤ n passant par n+1 points d'abscisses distinctes (formes de Lagrange et de Newton, rigoureusement équivalentes)</li>
      <li>La formule de l'erreur d'interpolation fait intervenir la dérivée (n+1)-ième de f et le produit ∏(x−xi)</li>
      <li>Le phénomène de Runge montre qu'augmenter le degré avec des nœuds équirépartis peut faire diverger l'interpolation près des bords</li>
      <li>Les nœuds de Chebyshev, resserrés aux bords, minimisent le facteur géométrique de l'erreur et suppriment l'essentiel du phénomène de Runge</li>
      <li>L'interpolation par morceaux (splines) est une alternative structurellement robuste au phénomène de Runge</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'augmenter systématiquement le degré du polynôme d'interpolation améliore toujours la précision</li>
      <li>Oublier que les formes de Lagrange et de Newton donnent, par unicité, exactement le même polynôme — seule la construction diffère</li>
      <li>Confondre le phénomène de Runge (lié au choix des nœuds) avec une simple erreur d'arrondi numérique</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Combien existe-t-il de polynômes de degré ≤ n passant par n+1 points d'abscisses distinctes donnés ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn3e1" value="wrong">Une infinité</label>
        <label class="option"><input type="radio" name="mn3e1" value="right">Exactement un seul</label>
        <label class="option"><input type="radio" name="mn3e1" value="wrong">Exactement deux</label>
        <label class="option"><input type="radio" name="mn3e1" value="wrong">Aucun en général</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn3e1','mn3fb1','Correct — l\\'existence et l\\'unicité du polynôme d\\'interpolation de degré ≤ n sont garanties pour n+1 points d\\'abscisses distinctes.','Relis la démonstration d\\'unicité par l\\'absurde (différence de deux polynômes de degré ≤ n ayant n+1 racines).')">Vérifier</button>
      <div class="feedback" id="mn3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Le phénomène de Runge se manifeste typiquement :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn3e2" value="wrong">Au centre de l'intervalle uniquement</label>
        <label class="option"><input type="radio" name="mn3e2" value="right">Près des bords de l'intervalle, avec des nœuds équirépartis et un degré élevé</label>
        <label class="option"><input type="radio" name="mn3e2" value="wrong">Uniquement pour des fonctions discontinues</label>
        <label class="option"><input type="radio" name="mn3e2" value="wrong">Uniquement en arithmétique simple précision</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn3e2','mn3fb2','Correct — les oscillations du phénomène de Runge sont maximales près des bords de l\\'intervalle, avec des nœuds équirépartis et un degré élevé.','Relis la description du phénomène de Runge : où se situent les oscillations les plus fortes ?')">Vérifier</button>
      <div class="feedback" id="mn3fb2"></div>
    </div>
  </div>
  `
};
METHNUM_NOVA_KB[mnKey("Interpolation polynomiale : Lagrange, Newton et phénomène de Runge")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'interpolation polynomiale : Lagrange, Newton, et le fameux phénomène de Runge. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/lagrange/i, replies:[
      "Le polynôme de Lagrange P_n(x) = Σ y_i·L_i(x) est l'unique polynôme de degré ≤ n passant par n+1 points donnés. Chaque L_i vaut 1 en x_i et 0 aux autres nœuds."
    ]},
    { test:/newton.*diff[ée]rence|diff[ée]rences divis[ée]es/i, replies:[
      "La forme de Newton (différences divisées) donne, par unicité, le même polynôme que Lagrange, mais sous une forme incrémentale plus pratique pour ajouter un point sans tout recalculer."
    ]},
    { test:/erreur d.interpolation/i, replies:[
      "L'erreur d'interpolation s'écrit f(x)−P_n(x) = f^(n+1)(ξ)/(n+1)! · ∏(x−xi) : elle dépend de la régularité de f et de la répartition des nœuds."
    ]},
    { test:/runge/i, replies:[
      "Le phénomène de Runge : augmenter le degré du polynôme d'interpolation avec des nœuds équirépartis peut faire diverger l'approximation près des bords, même pour une fonction lisse. Les nœuds de Chebyshev résolvent ce problème."
    ]},
    { test:/chebyshev/i, replies:[
      "Les nœuds de Chebyshev, resserrés près des bords de l'intervalle, minimisent le facteur ∏(x−xi) de l'erreur d'interpolation et suppriment l'essentiel du phénomène de Runge."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la démonstration d'unicité par l'absurde.",
      "Indice niveau 2 : si deux polynômes de degré ≤ n coïncidaient en n+1 points, leur différence aurait n+1 racines.",
      "Indice niveau 3 : un polynôme de degré ≤ n avec n+1 racines est nul, donc les deux polynômes sont identiques — un seul polynôme existe."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à où les oscillations du phénomène de Runge sont les plus visibles.",
      "Indice niveau 2 : ce n'est pas au centre de l'intervalle.",
      "Indice niveau 3 : c'est près des bords, avec des nœuds équirépartis et un degré élevé."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
METHNUM_CHAPTERS[mnKey("Intégration numérique : formules de Newton-Cotes et quadrature de Gauss")] = {
  objectives: [
    "Construire les formules du trapèze et de Simpson à partir de l'interpolation polynomiale",
    "Établir les ordres de convergence des formules de Newton-Cotes composites",
    "Comprendre le principe du degré d'exactitude d'une formule de quadrature",
    "Présenter le principe de la quadrature de Gauss et son optimalité"
  ],
  prereqs: ["Interpolation polynomiale : Lagrange, Newton et phénomène de Runge"],
  bodyHtml: `
    <p>L'intégration numérique (quadrature) approche $\\int_a^b f(x)\\,dx$ lorsque le calcul exact est impossible ou impraticable — un cas extrêmement fréquent en physique. Ce chapitre construit les formules classiques à partir de l'interpolation polynomiale (chapitre 3) et en établit rigoureusement les ordres d'erreur.</p>

    <h3>1. Le principe général : intégrer le polynôme d'interpolation</h3>
    <p>L'idée fondatrice des <strong>formules de Newton-Cotes</strong> est simple : remplacer $f$ par son polynôme d'interpolation $P_n$ aux nœuds choisis, puis intégrer exactement ce polynôme (opération facile, car polynomiale) :</p>
    <div class="formula-box">$$\\int_a^b f(x)\\,dx \\approx \\int_a^b P_n(x)\\,dx$$</div>

    <h3>2. La méthode des trapèzes</h3>
    <p>Avec $n=1$ (interpolation linéaire entre les deux bornes), on obtient la <strong>méthode des trapèzes</strong> :</p>
    <div class="formula-box">$$\\int_a^b f(x)\\,dx \\approx \\dfrac{b-a}{2}\\big[f(a)+f(b)\\big]$$</div>
    <p>Sur un intervalle $[a,b]$ divisé en $n$ sous-intervalles de largeur $h=(b-a)/n$ (méthode <strong>composite</strong>), l'erreur globale est de l'ordre de :</p>
    <div class="formula-box">$$E_{trap} = -\\dfrac{(b-a)}{12}h^2 f''(\\xi), \\quad \\xi \\in [a,b]$$</div>
    <p>L'erreur décroît donc en $O(h^2)$ : diviser le pas $h$ par 2 divise l'erreur par 4 environ — une convergence <strong>d'ordre 2</strong>.</p>

    <h3>3. La méthode de Simpson</h3>
    <p>Avec $n=2$ (interpolation parabolique sur trois points équidistants $a$, $(a+b)/2$, $b$), on obtient la <strong>méthode de Simpson</strong> :</p>
    <div class="formula-box">$$\\int_a^b f(x)\\,dx \\approx \\dfrac{b-a}{6}\\left[f(a) + 4f\\!\\left(\\dfrac{a+b}{2}\\right) + f(b)\\right]$$</div>
    <p>De façon remarquable, cette formule — construite pour être exacte sur les polynômes de degré $\\le 2$ — est en réalité <strong>exacte pour tous les polynômes de degré $\\le 3$</strong> (un « bonus » gratuit dû à une compensation de symétrie). L'erreur composite est de l'ordre de :</p>
    <div class="formula-box">$$E_{Simpson} = -\\dfrac{(b-a)}{180}h^4 f^{(4)}(\\xi)$$</div>
    <p>La convergence est donc <strong>d'ordre 4</strong> : diviser $h$ par 2 divise l'erreur par 16 environ — un net gain de précision par rapport aux trapèzes, pour un coût de calcul à peine supérieur.</p>

    <table class="mini-table">
      <tr><th>Méthode</th><th>Degré du polynôme interpolé</th><th>Ordre de l'erreur</th><th>Exactitude garantie jusqu'au degré</th></tr>
      <tr><td>Trapèzes</td><td>1</td><td>O(h²)</td><td>1</td></tr>
      <tr><td>Simpson</td><td>2</td><td>O(h⁴)</td><td>3 (grâce à la symétrie)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une intégration par la méthode des trapèzes composite avec $h=0{,}1$ donne une erreur estimée de $4\\times10^{-3}$. Quelle serait l'erreur approximative attendue avec $h=0{,}05$ (pas divisé par 2) ?</p>
      <p><strong>Solution :</strong> L'erreur des trapèzes est en $O(h^2)$ : diviser $h$ par 2 divise l'erreur par $2^2=4$. Erreur attendue : $4\\times10^{-3}/4 = 1\\times10^{-3}$.</p>
      <p class="example-answer">Réponse : environ $1\\times10^{-3}$, soit une erreur divisée par 4.</p>
    </div>

    <h3>4. Le degré d'exactitude</h3>
    <p>On appelle <strong>degré d'exactitude</strong> d'une formule de quadrature le plus grand entier $d$ tel que la formule soit <strong>exacte</strong> (sans aucune erreur) pour tout polynôme de degré $\\le d$. C'est un critère fondamental pour comparer différentes formules : plus le degré d'exactitude est élevé pour un nombre donné d'évaluations de $f$, plus la formule est efficace.</p>

    <h3>5. La quadrature de Gauss : optimiser le choix des nœuds</h3>
    <p>Les formules de Newton-Cotes imposent des <strong>nœuds équirépartis</strong>. Or, rien n'oblige à ce choix : la <strong>quadrature de Gauss</strong> optimise <strong>simultanément</strong> la position des $n$ nœuds <strong>et</strong> les poids associés, pour maximiser le degré d'exactitude atteint avec seulement $n$ évaluations de $f$.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'optimalité de Gauss</span>
      Une formule de Newton-Cotes à $n$ points atteint un degré d'exactitude de l'ordre de $n-1$ (ou $n$ pour certains cas symétriques comme Simpson). Une formule de <strong>quadrature de Gauss à $n$ points atteint un degré d'exactitude de $2n-1$</strong> — c'est-à-dire environ le double, pour le même nombre d'évaluations de $f$ ! Ce résultat s'obtient en choisissant les nœuds comme les racines des <strong>polynômes orthogonaux de Legendre</strong> sur $[-1,1]$, un résultat profond reliant intégration numérique et théorie des polynômes orthogonaux.
    </div>
    <p>Ce gain d'efficacité explique pourquoi la quadrature de Gauss est largement privilégiée en calcul scientifique dès que $f$ est suffisamment régulière et que son évaluation est coûteuse (par exemple lorsque $f$ résulte elle-même d'un calcul physique complexe).</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Les formules de Newton-Cotes s'obtiennent en intégrant le polynôme d'interpolation de f aux nœuds choisis</li>
      <li>La méthode des trapèzes a une erreur en O(h²) ; la méthode de Simpson, en O(h⁴) et exacte jusqu'au degré 3</li>
      <li>Le degré d'exactitude mesure jusqu'à quel degré polynomial une formule de quadrature est exacte</li>
      <li>La quadrature de Gauss à n points atteint un degré d'exactitude de 2n−1, en optimisant simultanément nœuds et poids (racines des polynômes de Legendre)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que la méthode de Simpson n'est exacte que pour les polynômes de degré 2 — elle l'est en réalité jusqu'au degré 3</li>
      <li>Oublier que l'erreur des trapèzes décroît en h² : diviser h par 2 divise l'erreur par 4, pas par 2</li>
      <li>Penser que la quadrature de Gauss utilise les mêmes nœuds équirépartis que Newton-Cotes — ses nœuds sont spécifiquement optimisés (racines de polynômes de Legendre)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La méthode de Simpson composite est exacte pour tout polynôme de degré :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn4e1" value="wrong">1 uniquement</label>
        <label class="option"><input type="radio" name="mn4e1" value="wrong">2 uniquement</label>
        <label class="option"><input type="radio" name="mn4e1" value="right">Inférieur ou égal à 3</label>
        <label class="option"><input type="radio" name="mn4e1" value="wrong">Inférieur ou égal à 5</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn4e1','mn4fb1','Correct — grâce à une compensation de symétrie, Simpson est exacte jusqu\\'au degré 3, alors qu\\'elle est construite à partir d\\'une interpolation de degré 2 seulement.','Relis le « bonus » de la méthode de Simpson : jusqu\\'à quel degré est-elle exacte, au-delà du degré 2 de l\\'interpolation utilisée ?')">Vérifier</button>
      <div class="feedback" id="mn4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Une formule de quadrature de Gauss utilisant 4 points atteint un degré d'exactitude de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn4e2" value="wrong">3</label>
        <label class="option"><input type="radio" name="mn4e2" value="wrong">4</label>
        <label class="option"><input type="radio" name="mn4e2" value="right">7</label>
        <label class="option"><input type="radio" name="mn4e2" value="wrong">8</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn4e2','mn4fb2','Correct — le degré d\\'exactitude d\\'une formule de Gauss à n points est 2n−1 ; avec n=4, cela donne 2×4−1=7.','Applique la formule du degré d\\'exactitude de Gauss : 2n−1, avec n=4.')">Vérifier</button>
      <div class="feedback" id="mn4fb2"></div>
    </div>
  </div>
  `
};
METHNUM_NOVA_KB[mnKey("Intégration numérique : formules de Newton-Cotes et quadrature de Gauss")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'intégration numérique : trapèzes, Simpson, et la quadrature de Gauss. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/trap[èe]ze/i, replies:[
      "La méthode des trapèzes a une erreur en O(h²) : diviser le pas h par 2 divise l'erreur par environ 4. Elle interpole f linéairement entre les bornes."
    ]},
    { test:/simpson/i, replies:[
      "La méthode de Simpson a une erreur en O(h⁴) et est exacte jusqu'au degré 3 (bonus dû à la symétrie), alors qu'elle n'utilise qu'une interpolation de degré 2."
    ]},
    { test:/degr[ée] d.exactitude/i, replies:[
      "Le degré d'exactitude est le plus grand degré polynomial pour lequel une formule de quadrature est exacte sans erreur. Plus il est élevé pour un nombre donné de points, plus la formule est efficace."
    ]},
    { test:/gauss|legendre/i, replies:[
      "La quadrature de Gauss à n points atteint un degré d'exactitude de 2n−1 (contre environ n−1 pour Newton-Cotes), en choisissant nœuds et poids optimaux — les nœuds sont les racines des polynômes de Legendre."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense au « bonus » de symétrie de la méthode de Simpson.",
      "Indice niveau 2 : ce n'est pas seulement le degré 2 de l'interpolation utilisée.",
      "Indice niveau 3 : Simpson est exacte jusqu'au degré 3."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique la formule 2n−1 avec n=4.",
      "Indice niveau 2 : 2×4 = 8, puis retire 1.",
      "Indice niveau 3 : le degré d'exactitude est 7."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
METHNUM_CHAPTERS[mnKey("Systèmes linéaires : méthodes directes (LU, Cholesky) et conditionnement")] = {
  objectives: [
    "Comprendre le principe de la décomposition LU et son lien avec l'élimination de Gauss",
    "Connaître la décomposition de Cholesky pour les matrices symétriques définies positives",
    "Définir le nombre de conditionnement d'une matrice et son rôle dans la propagation d'erreur",
    "Comparer le coût de calcul des méthodes directes selon la taille du système"
  ],
  prereqs: ["Erreurs, conditionnement et stabilité numérique", "Algèbre (L1)"],
  bodyHtml: `
    <p>Résoudre un système linéaire $Ax=b$ est sans doute le problème numérique le plus fréquemment rencontré en physique et en ingénierie — que ce soit directement, ou comme étape intermédiaire d'une méthode plus complexe (linéarisation d'un problème non linéaire, discrétisation d'une équation différentielle). Ce chapitre étudie les <strong>méthodes directes</strong>, qui fournissent la solution exacte (aux erreurs d'arrondi près) en un nombre fini d'opérations.</p>

    <h3>1. De l'élimination de Gauss à la décomposition LU</h3>
    <p>L'élimination de Gauss, vue en L1/L2, transforme le système $Ax=b$ en un système triangulaire équivalent par combinaisons linéaires successives des lignes. On peut montrer que cette procédure équivaut, sous forme matricielle, à <strong>factoriser</strong> $A$ (sous réserve que l'élimination se déroule sans permutation, c'est-à-dire sans pivot nul) sous la forme :</p>
    <div class="formula-box">$$A = LU$$</div>
    <p>où $L$ est une matrice triangulaire inférieure (avec des 1 sur la diagonale) et $U$ une matrice triangulaire supérieure. Une fois cette factorisation obtenue, la résolution de $Ax=b$ se ramène à deux résolutions triangulaires bien plus rapides :</p>
    <div class="formula-box">$$Ly = b \\ \\text{(descente)} \\qquad Ux = y \\ \\text{(remontée)}$$</div>

    <div class="key-point">
      <span class="eyebrow">Point clé — l'intérêt pratique de LU</span>
      L'avantage majeur de la décomposition LU apparaît lorsqu'on doit résoudre <strong>plusieurs systèmes avec la même matrice $A$</strong> mais des seconds membres $b$ différents (situation très fréquente, par exemple dans une méthode itérative de type Newton appliquée à un système d'équations). La factorisation $A=LU$ (coût $O(n^3)$) n'est effectuée <strong>qu'une seule fois</strong>, et chaque résolution supplémentaire ne coûte alors que $O(n^2)$ (deux résolutions triangulaires), au lieu de refaire l'élimination complète à chaque fois.
    </div>

    <h3>2. Le pivotage partiel</h3>
    <p>Si un pivot (élément diagonal utilisé pour l'élimination) est nul ou très petit, la méthode devient numériquement instable (division par un nombre proche de zéro, amplification catastrophique des erreurs d'arrondi). Le <strong>pivotage partiel</strong> consiste à permuter les lignes à chaque étape pour placer en position de pivot l'élément de plus grande valeur absolue dans la colonne courante, ce qui améliore considérablement la stabilité numérique de l'algorithme (sans changer le problème résolu).</p>

    <h3>3. La décomposition de Cholesky : un cas particulier avantageux</h3>
    <p>Lorsque $A$ est <strong>symétrique définie positive</strong> (cas très fréquent en physique : matrices de rigidité, matrices de covariance, hessiennes en un minimum...), on peut utiliser la <strong>décomposition de Cholesky</strong>, plus économique que LU générale :</p>
    <div class="formula-box">$$A = LL^{T}$$</div>
    <p>où $L$ est triangulaire inférieure (mais, cette fois, sans contrainte de diagonale unitaire). Cette factorisation exploite la symétrie de $A$ pour diviser par environ 2 le nombre d'opérations nécessaires par rapport à une décomposition LU générale, tout en étant intrinsèquement stable (sans besoin de pivotage) pour les matrices définies positives.</p>

    <h3>4. Le conditionnement d'une matrice</h3>
    <p>Le <strong>nombre de conditionnement</strong> d'une matrice inversible $A$, relatif à une norme matricielle donnée, se définit par :</p>
    <div class="formula-box">$$\\kappa(A) = \\|A\\| \\cdot \\|A^{-1}\\| \\ge 1$$</div>
    <p>Ce nombre mesure la sensibilité de la solution $x$ de $Ax=b$ à de petites perturbations sur $b$ (ou sur $A$). On établit la borne fondamentale suivante, reliant l'erreur relative sur la solution à l'erreur relative sur les données :</p>
    <div class="formula-box">$$\\dfrac{\\|\\delta x\\|}{\\|x\\|} \\le \\kappa(A) \\cdot \\dfrac{\\|\\delta b\\|}{\\|b\\|}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un conditionnement $\\kappa(A)$ proche de 1 signifie que le problème est <strong>bien conditionné</strong> : une petite erreur relative sur les données ne peut engendrer qu'une petite erreur relative sur la solution. Un conditionnement très élevé (par exemple $\\kappa(A) \\sim 10^{10}$) signifie que même une excellente méthode numérique produira une solution potentiellement très imprécise, car l'erreur relative sur les données (ne serait-ce que l'erreur d'arrondi machine, $\\sim 10^{-16}$) peut être amplifiée jusqu'à $10^{-6}$ sur le résultat final — indépendamment de tout défaut de l'algorithme employé (voir chapitre 1).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une matrice $A$ a un conditionnement $\\kappa(A) = 10^{6}$. Les données $b$ sont connues avec une erreur relative de $10^{-10}$ (mesure expérimentale de haute précision). Quelle est l'erreur relative maximale que l'on peut garantir sur la solution $x$ ?</p>
      <p><strong>Solution :</strong> D'après la borne établie ci-dessus : $\\dfrac{\\|\\delta x\\|}{\\|x\\|} \\le \\kappa(A) \\cdot \\dfrac{\\|\\delta b\\|}{\\|b\\|} = 10^{6} \\times 10^{-10} = 10^{-4}$.</p>
      <p class="example-answer">Réponse : l'erreur relative sur $x$ peut atteindre jusqu'à $10^{-4}$, soit 6 ordres de grandeur de moins de précision que sur les données d'entrée — un effet d'amplification purement dû au conditionnement du problème.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La décomposition LU (A=LU) permet de résoudre efficacement plusieurs systèmes de même matrice A avec des seconds membres différents</li>
      <li>Le pivotage partiel améliore la stabilité numérique de l'élimination de Gauss/LU</li>
      <li>La décomposition de Cholesky (A=LLᵀ), réservée aux matrices symétriques définies positives, est environ deux fois plus économique que LU générale</li>
      <li>Le conditionnement κ(A) = ‖A‖·‖A⁻¹‖ mesure la sensibilité intrinsèque du problème aux perturbations des données</li>
      <li>Une erreur relative sur les données peut être amplifiée jusqu'à un facteur κ(A) sur la solution, quelle que soit la qualité de l'algorithme</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Refactoriser inutilement A=LU à chaque nouveau second membre b, alors qu'une seule factorisation suffit</li>
      <li>Appliquer Cholesky à une matrice non symétrique ou non définie positive, pour laquelle la décomposition n'existe pas</li>
      <li>Croire qu'un mauvais résultat numérique révèle toujours un mauvais algorithme, alors qu'un mauvais conditionnement du problème peut en être l'unique cause</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est l'intérêt principal de la décomposition LU par rapport à une élimination de Gauss refaite à chaque fois ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn5e1" value="wrong">Elle donne une solution plus précise</label>
        <label class="option"><input type="radio" name="mn5e1" value="right">Elle permet de résoudre efficacement plusieurs systèmes avec la même matrice A et des b différents</label>
        <label class="option"><input type="radio" name="mn5e1" value="wrong">Elle fonctionne même pour des matrices non carrées</label>
        <label class="option"><input type="radio" name="mn5e1" value="wrong">Elle élimine le besoin de pivotage</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn5e1','mn5fb1','Correct — factoriser une seule fois (coût O(n³)) puis résoudre chaque nouveau système en O(n²) est bien plus efficace que refaire l\\'élimination complète à chaque fois.','Relis le point clé sur l\\'intérêt pratique de LU : quel scénario d\\'usage rend cette factorisation particulièrement avantageuse ?')">Vérifier</button>
      <div class="feedback" id="mn5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un système Ax=b a un conditionnement κ(A)=10⁸. Que peut-on en déduire sur la précision de la solution, même avec un excellent algorithme ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn5e2" value="wrong">La solution sera toujours parfaitement précise</label>
        <label class="option"><input type="radio" name="mn5e2" value="right">Une petite erreur relative sur les données peut être amplifiée jusqu'à un facteur 10⁸ sur la solution</label>
        <label class="option"><input type="radio" name="mn5e2" value="wrong">Cela ne dépend que de la taille de la matrice</label>
        <label class="option"><input type="radio" name="mn5e2" value="wrong">Le problème n'a pas de solution</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn5e2','mn5fb2','Correct — c\\'est la borne fondamentale reliant erreur relative sur x et erreur relative sur b via le conditionnement.','Applique la borne ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ avec κ(A)=10⁸.')">Vérifier</button>
      <div class="feedback" id="mn5fb2"></div>
    </div>
  </div>
  `
};
METHNUM_NOVA_KB[mnKey("Systèmes linéaires : méthodes directes (LU, Cholesky) et conditionnement")] = {
  intro: "Salut, moi c'est Nova ! On étudie les méthodes directes pour les systèmes linéaires : LU, Cholesky, conditionnement. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/\\blu\\b|d[ée]composition lu/i, replies:[
      "A=LU (L triangulaire inférieure, U triangulaire supérieure) permet de résoudre efficacement plusieurs systèmes avec la même matrice A : une factorisation en O(n³), puis chaque résolution en O(n²) seulement."
    ]},
    { test:/cholesky/i, replies:[
      "La décomposition de Cholesky (A=LLᵀ) s'applique aux matrices symétriques définies positives, et est environ deux fois plus économique que LU générale — sans besoin de pivotage."
    ]},
    { test:/pivot/i, replies:[
      "Le pivotage partiel permute les lignes pour placer le plus grand élément en position de pivot à chaque étape, ce qui améliore la stabilité numérique de l'élimination."
    ]},
    { test:/conditionnement|kappa|κ/i, replies:[
      "Le conditionnement κ(A) = ‖A‖·‖A⁻¹‖ mesure la sensibilité intrinsèque de la solution aux perturbations des données. Une erreur relative sur b peut être amplifiée jusqu'à un facteur κ(A) sur x."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense au scénario où l'on résout plusieurs fois Ax=b avec des b différents.",
      "Indice niveau 2 : la factorisation coûteuse (O(n³)) n'a besoin d'être faite qu'une seule fois.",
      "Indice niveau 3 : chaque résolution suivante ne coûte alors que O(n²)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique directement la borne ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖.",
      "Indice niveau 2 : avec κ(A)=10⁸, une petite erreur peut être multipliée par 10⁸.",
      "Indice niveau 3 : cela peut donc considérablement dégrader la précision de la solution, quel que soit l'algorithme."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
METHNUM_CHAPTERS[mnKey("Systèmes linéaires : méthodes itératives (Jacobi, Gauss-Seidel)")] = {
  objectives: [
    "Construire les méthodes itératives de Jacobi et de Gauss-Seidel",
    "Énoncer une condition suffisante de convergence (dominance diagonale stricte)",
    "Relier la convergence au rayon spectral de la matrice d'itération",
    "Comparer méthodes directes et méthodes itératives selon la taille et la structure du système"
  ],
  prereqs: ["Systèmes linéaires : méthodes directes (LU, Cholesky) et conditionnement"],
  bodyHtml: `
    <p>Pour les très grands systèmes linéaires (des millions d'inconnues, comme ceux issus de la discrétisation d'équations aux dérivées partielles), les méthodes directes du chapitre précédent deviennent trop coûteuses en mémoire et en temps de calcul. Les <strong>méthodes itératives</strong> offrent une alternative : elles construisent une suite de vecteurs $x^{(k)}$ convergeant vers la solution, sans jamais factoriser $A$ explicitement.</p>

    <h3>1. La méthode de Jacobi</h3>
    <p>On décompose $A = D - E - F$, où $D$ est la partie diagonale, $-E$ la partie triangulaire strictement inférieure, $-F$ la partie triangulaire strictement supérieure. La méthode de Jacobi met à jour <strong>chaque composante</strong> de $x^{(k+1)}$ à partir des composantes de $x^{(k)}$ à l'itération <strong>précédente uniquement</strong> :</p>
    <div class="formula-box">$$x_i^{(k+1)} = \\dfrac{1}{a_{ii}}\\left(b_i - \\sum_{j\\ne i} a_{ij}\\,x_j^{(k)}\\right)$$</div>
    <p>Sous forme matricielle : $x^{(k+1)} = D^{-1}(E+F)x^{(k)} + D^{-1}b$.</p>

    <h3>2. La méthode de Gauss-Seidel</h3>
    <p>Une amélioration naturelle consiste à utiliser, dès qu'elles sont disponibles, les composantes <strong>déjà mises à jour</strong> à l'itération courante (au lieu d'attendre l'itération suivante) :</p>
    <div class="formula-box">$$x_i^{(k+1)} = \\dfrac{1}{a_{ii}}\\left(b_i - \\sum_{j<i} a_{ij}\\,x_j^{(k+1)} - \\sum_{j>i} a_{ij}\\,x_j^{(k)}\\right)$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Gauss-Seidel converge généralement <strong>plus vite</strong> que Jacobi (l'information la plus récente est exploitée immédiatement), pour un coût de calcul par itération comparable. En contrepartie, Gauss-Seidel est intrinsèquement <strong>séquentiel</strong> (chaque composante dépend des composantes déjà mises à jour à la même itération), ce qui le rend moins facile à paralléliser que Jacobi, où toutes les composantes de $x^{(k+1)}$ peuvent être calculées simultanément et indépendamment à partir de $x^{(k)}$.
    </div>

    <h3>3. Convergence : le rayon spectral, critère nécessaire et suffisant</h3>
    <p>Toute méthode itérative linéaire de la forme $x^{(k+1)} = Mx^{(k)} + c$ (avec $M$ la matrice d'itération : $M=D^{-1}(E+F)$ pour Jacobi, une expression analogue pour Gauss-Seidel) converge vers la solution, <strong>pour tout point de départ $x^{(0)}$</strong>, si et seulement si le <strong>rayon spectral</strong> de $M$ (le module de sa plus grande valeur propre en valeur absolue) est strictement inférieur à 1 :</p>
    <div class="formula-box">$$\\rho(M) = \\max_i |\\lambda_i(M)| < 1$$</div>
    <p>C'est un critère nécessaire et suffisant, mais coûteux à vérifier directement (il faudrait calculer les valeurs propres de $M$). En pratique, on utilise plutôt une <strong>condition suffisante</strong>, plus simple à vérifier :</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — dominance diagonale stricte</span>
      Si la matrice $A$ est <strong>à diagonale strictement dominante</strong> (c'est-à-dire $|a_{ii}| > \\sum_{j\\ne i}|a_{ij}|$ pour toute ligne $i$), alors les méthodes de Jacobi <strong>et</strong> de Gauss-Seidel convergent toutes les deux, quel que soit le point de départ $x^{(0)}$. C'est une condition <strong>suffisante</strong> mais non nécessaire : certaines matrices ne satisfaisant pas cette condition permettent tout de même la convergence (notamment si $A$ est symétrique définie positive, cas où Gauss-Seidel converge toujours).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> La matrice $A = \\begin{pmatrix} 4 & 1 & 1 \\\\ 1 & 5 & 2 \\\\ 0 & 1 & 6 \\end{pmatrix}$ vérifie-t-elle la condition de dominance diagonale stricte ?</p>
      <p><strong>Solution :</strong> Ligne 1 : $|4| > |1|+|1| = 2$ ✓. Ligne 2 : $|5| > |1|+|2| = 3$ ✓. Ligne 3 : $|6| > |0|+|1| = 1$ ✓. Les trois conditions sont vérifiées.</p>
      <p class="example-answer">Réponse : oui, la matrice est à diagonale strictement dominante, donc Jacobi et Gauss-Seidel convergent tous deux pour ce système, quel que soit le point de départ.</p>
    </div>

    <h3>4. Méthodes directes ou itératives : comment choisir ?</h3>
    <table class="mini-table">
      <tr><th>Critère</th><th>Méthode directe (LU)</th><th>Méthode itérative (Jacobi/Gauss-Seidel)</th></tr>
      <tr><td>Taille du système</td><td>Petite à moyenne</td><td>Grande, voire très grande</td></tr>
      <tr><td>Structure de A</td><td>Quelconque</td><td>Idéalement creuse (peu de coefficients non nuls)</td></tr>
      <tr><td>Résolution pour plusieurs b</td><td>Très avantageuse (une seule factorisation)</td><td>Chaque nouveau b nécessite de relancer les itérations</td></tr>
      <tr><td>Précision obtenue</td><td>« Exacte » aux erreurs d'arrondi près</td><td>Approchée, dépend du critère d'arrêt choisi</td></tr>
    </table>
    <p>Les méthodes itératives sont particulièrement adaptées aux matrices <strong>creuses</strong> de grande taille (issues typiquement de la discrétisation d'équations aux dérivées partielles), où une décomposition LU directe créerait un remplissage ("fill-in") prohibitif en mémoire.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Jacobi met à jour toutes les composantes à partir de l'itération précédente uniquement ; Gauss-Seidel utilise immédiatement les valeurs déjà actualisées</li>
      <li>Gauss-Seidel converge généralement plus vite mais est intrinsèquement séquentiel, contrairement à Jacobi qui se parallélise facilement</li>
      <li>Convergence si et seulement si le rayon spectral ρ(M) de la matrice d'itération est strictement inférieur à 1</li>
      <li>La dominance diagonale stricte est une condition suffisante (mais non nécessaire) de convergence pour Jacobi et Gauss-Seidel</li>
      <li>Les méthodes itératives sont privilégiées pour les grands systèmes creux, là où une factorisation LU directe serait trop coûteuse en mémoire</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que la dominance diagonale stricte est nécessaire à la convergence — c'est une condition seulement suffisante</li>
      <li>Utiliser Jacobi ou Gauss-Seidel sur un petit système dense, où une méthode directe serait plus simple et tout aussi efficace</li>
      <li>Oublier que Gauss-Seidel dépend de l'ordre de mise à jour des composantes, contrairement à Jacobi</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quelle est la différence essentielle entre Jacobi et Gauss-Seidel ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn6e1" value="wrong">Jacobi ne converge jamais</label>
        <label class="option"><input type="radio" name="mn6e1" value="right">Gauss-Seidel utilise immédiatement les composantes déjà mises à jour à l'itération courante</label>
        <label class="option"><input type="radio" name="mn6e1" value="wrong">Jacobi nécessite une matrice symétrique</label>
        <label class="option"><input type="radio" name="mn6e1" value="wrong">Il n'y a aucune différence entre les deux méthodes</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn6e1','mn6fb1','Correct — c\\'est précisément l\\'utilisation immédiate des valeurs actualisées qui distingue Gauss-Seidel de Jacobi, et qui accélère généralement sa convergence.','Relis la formule de mise à jour de Gauss-Seidel : quelles valeurs utilise-t-elle par rapport à Jacobi ?')">Vérifier</button>
      <div class="feedback" id="mn6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quel est le critère nécessaire et suffisant de convergence d'une méthode itérative linéaire x^(k+1)=Mx^(k)+c ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn6e2" value="wrong">La matrice A doit être symétrique</label>
        <label class="option"><input type="radio" name="mn6e2" value="right">Le rayon spectral ρ(M) doit être strictement inférieur à 1</label>
        <label class="option"><input type="radio" name="mn6e2" value="wrong">La matrice A doit être creuse</label>
        <label class="option"><input type="radio" name="mn6e2" value="wrong">Le point de départ x⁽⁰⁾ doit être proche de la solution</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn6e2','mn6fb2','Correct — ρ(M)<1 est le critère nécessaire et suffisant de convergence, quel que soit le point de départ x⁽⁰⁾.','Relis le critère basé sur le rayon spectral de la matrice d\\'itération M.')">Vérifier</button>
      <div class="feedback" id="mn6fb2"></div>
    </div>
  </div>
  `
};
METHNUM_NOVA_KB[mnKey("Systèmes linéaires : méthodes itératives (Jacobi, Gauss-Seidel)")] = {
  intro: "Salut, moi c'est Nova ! On étudie les méthodes itératives : Jacobi, Gauss-Seidel, convergence. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/jacobi/i, replies:[
      "Jacobi met à jour toutes les composantes de x^(k+1) à partir des valeurs de x^(k) à l'itération précédente uniquement — facilement parallélisable."
    ]},
    { test:/gauss.seidel/i, replies:[
      "Gauss-Seidel utilise immédiatement les composantes déjà mises à jour à l'itération courante, ce qui accélère généralement la convergence, mais rend la méthode intrinsèquement séquentielle."
    ]},
    { test:/rayon spectral|ρ\\(m\\)/i, replies:[
      "Le rayon spectral ρ(M) de la matrice d'itération M est le critère nécessaire et suffisant de convergence : ρ(M)<1 garantit la convergence pour tout point de départ."
    ]},
    { test:/dominance diagonale/i, replies:[
      "La dominance diagonale stricte (|aii| > Σ|aij| pour j≠i, sur chaque ligne) est une condition suffisante — mais non nécessaire — de convergence pour Jacobi et Gauss-Seidel."
    ]},
    { test:/directe.*itérative|itérative.*directe|quand.*choisir/i, replies:[
      "Méthodes directes : systèmes petits/moyens, ou plusieurs résolutions avec la même matrice. Méthodes itératives : grands systèmes creux, où une factorisation directe serait trop coûteuse en mémoire."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : compare les formules de mise à jour des deux méthodes.",
      "Indice niveau 2 : l'une des deux méthodes utilise des valeurs plus récentes que l'autre.",
      "Indice niveau 3 : c'est Gauss-Seidel qui utilise immédiatement les composantes déjà actualisées."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : ce n'est pas une propriété de A directement (symétrie, matrice creuse).",
      "Indice niveau 2 : cela concerne la matrice d'itération M, pas A directement.",
      "Indice niveau 3 : c'est le rayon spectral ρ(M) < 1."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
METHNUM_CHAPTERS[mnKey("Équations différentielles : consistance, stabilité et convergence")] = {
  objectives: [
    "Définir l'erreur de troncature locale et l'ordre de consistance d'un schéma",
    "Étudier la stabilité des schémas d'Euler explicite et implicite pour l'équation test",
    "Comprendre la notion de raideur (stiffness) et son impact sur le choix du schéma",
    "Relier consistance, stabilité et convergence via le théorème de Lax-Richtmyer (chapitre 1)"
  ],
  prereqs: ["Erreurs, conditionnement et stabilité numérique"],
  bodyHtml: `
    <p>Ce chapitre applique concrètement, aux schémas numériques pour équations différentielles ordinaires (EDO), les notions théoriques de consistance, stabilité et convergence introduites au chapitre 1. C'est ici que le théorème de Lax-Richtmyer prend tout son sens pratique.</p>

    <h3>1. Le schéma d'Euler explicite et son erreur de troncature</h3>
    <p>Pour l'EDO $y'(t) = f(t,y(t))$, $y(t_0)=y_0$, le schéma d'<strong>Euler explicite</strong> avec pas $h$ s'écrit :</p>
    <div class="formula-box">$$y_{n+1} = y_n + h\\,f(t_n, y_n)$$</div>
    <p>L'<strong>erreur de troncature locale</strong> $\\tau_n$ mesure l'écart entre la solution exacte et une seule étape du schéma, en supposant qu'on parte de la valeur exacte $y(t_n)$. Un développement de Taylor de la solution exacte $y(t_{n+1})$ autour de $t_n$ donne :</p>
    <div class="formula-box">$$\\tau_n = \\dfrac{y(t_{n+1}) - y(t_n)}{h} - f(t_n,y(t_n)) = \\dfrac{h}{2}y''(\\xi_n) = O(h)$$</div>
    <p>Le schéma d'Euler explicite est donc <strong>consistant d'ordre 1</strong> : son erreur de troncature locale est en $O(h)$, ce qui se traduit, une fois cumulé sur l'ensemble des pas de l'intervalle d'intégration, par une erreur globale également en $O(h)$.</p>

    <h3>2. La stabilité : l'équation test de Dahlquist</h3>
    <p>Pour analyser la <strong>stabilité</strong> d'un schéma (indépendamment de sa consistance), on l'applique à l'équation test linéaire $y' = \\lambda y$ ($\\lambda \\in \\mathbb{C}$, $\\text{Re}(\\lambda) < 0$, dont la solution exacte décroît vers 0). Pour Euler explicite, on obtient :</p>
    <div class="formula-box">$$y_{n+1} = (1+h\\lambda)\\,y_n$$</div>
    <p>Le schéma reproduit la décroissance de la solution exacte si et seulement si $|1+h\\lambda| < 1$ — c'est la <strong>condition de stabilité</strong> d'Euler explicite, qui impose une <strong>limite supérieure sur le pas $h$</strong> (dépendant de $\\lambda$). Si $h$ est trop grand, la solution numérique <strong>diverge ou oscille</strong>, alors même que la solution exacte tend vers 0 : c'est un schéma <strong>conditionnellement stable</strong>.</p>

    <h3>3. Le schéma d'Euler implicite : stabilité inconditionnelle</h3>
    <p>Le schéma d'<strong>Euler implicite</strong> (ou rétrograde) évalue $f$ au point d'arrivée plutôt qu'au point de départ :</p>
    <div class="formula-box">$$y_{n+1} = y_n + h\\,f(t_{n+1}, y_{n+1})$$</div>
    <p>Appliqué à l'équation test, on obtient $y_{n+1} = y_n/(1-h\\lambda)$, et la condition de stabilité $|1/(1-h\\lambda)| < 1$ est satisfaite pour <strong>tout $h>0$</strong> dès que $\\text{Re}(\\lambda)<0$ : le schéma est dit <strong>A-stable</strong> (inconditionnellement stable pour toute cette famille de problèmes).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — le prix de la stabilité inconditionnelle</span>
      Ce gain de stabilité a un coût : à chaque pas, l'équation $y_{n+1} = y_n + h f(t_{n+1},y_{n+1})$ est <strong>implicite</strong> en $y_{n+1}$ (elle apparaît des deux côtés) — il faut donc résoudre une équation (souvent non linéaire) à chaque itération, typiquement par une méthode de Newton (chapitre 2). C'est un compromis fondamental de l'analyse numérique des EDO : <strong>stabilité inconditionnelle contre coût de calcul accru par pas</strong>.
    </div>

    <h3>4. La raideur (stiffness)</h3>
    <p>Un système d'EDO est dit <strong>raide (stiff)</strong> lorsqu'il combine des échelles de temps très différentes (certaines composantes évoluent extrêmement vite, d'autres beaucoup plus lentement) — situation très fréquente en cinétique chimique (réactions rapides couplées à des réactions lentes) ou en dynamique moléculaire. Pour un système raide, un schéma <strong>explicite</strong> comme Euler explicite impose un pas $h$ extrêmement petit (dicté par la composante la plus rapide, via la condition de stabilité), même si l'on ne s'intéresse qu'à l'évolution lente du système — ce qui rend le calcul prohibitivement coûteux. Un schéma <strong>implicite</strong> (A-stable) permet, dans ce cas, d'utiliser un pas beaucoup plus grand sans perdre la stabilité, au prix de la résolution d'une équation implicite à chaque pas.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour l'équation test $y'=-100y$ (donc $\\lambda=-100$), quelle est la condition de stabilité du schéma d'Euler explicite sur le pas $h$ ?</p>
      <p><strong>Solution :</strong> La condition $|1+h\\lambda|<1$ devient $|1-100h|<1$, soit $0 < h < 2/100 = 0{,}02$. Pour un pas supérieur à 0,02, le schéma diverge numériquement, même si la solution exacte $y(t)=y_0 e^{-100t}$ tend rapidement et régulièrement vers 0.</p>
      <p class="example-answer">Réponse : il faut $h < 0{,}02$ pour la stabilité d'Euler explicite — un exemple typique de contrainte de raideur limitant sévèrement le pas admissible.</p>
    </div>

    <h3>5. Synthèse : consistance + stabilité = convergence</h3>
    <p>Conformément au théorème de Lax-Richtmyer énoncé au chapitre 1 : Euler explicite est consistant d'ordre 1 et conditionnellement stable, donc <strong>convergent d'ordre 1</strong> pour $h$ suffisamment petit ; Euler implicite est également consistant d'ordre 1 mais <strong>inconditionnellement stable</strong>, donc convergent d'ordre 1 <strong>quel que soit le pas</strong> choisi (dans les limites de la précision souhaitée). Les méthodes de Runge-Kutta d'ordre supérieur (RK4, très utilisées en pratique) améliorent l'ordre de consistance (donc la précision), au prix d'un nombre accru d'évaluations de $f$ par pas — sujet approfondi et implémenté dans le cours de Physique numérique.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Euler explicite est consistant d'ordre 1 (erreur de troncature locale en O(h)) mais seulement conditionnellement stable</li>
      <li>La condition de stabilité s'établit sur l'équation test y'=λy : |1+hλ|<1 pour Euler explicite</li>
      <li>Euler implicite est A-stable (stable pour tout h>0 si Re(λ)<0), au prix d'une équation implicite à résoudre à chaque pas</li>
      <li>Un système raide (stiff) combine des échelles de temps très différentes, imposant un pas minuscule à un schéma explicite</li>
      <li>Consistance + stabilité = convergence (théorème de Lax-Richtmyer), pour les deux schémas, mais avec des contraintes de pas très différentes</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'un schéma consistant est automatiquement convergent, sans vérifier sa stabilité</li>
      <li>Utiliser Euler explicite sur un système raide sans anticiper la contrainte sévère sur le pas h</li>
      <li>Oublier que la stabilité inconditionnelle d'Euler implicite a pour contrepartie la résolution d'une équation implicite à chaque pas</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pour l'équation test y'=−50y, quelle est la condition de stabilité du schéma d'Euler explicite ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn7e1" value="wrong">h &lt; 0,1</label>
        <label class="option"><input type="radio" name="mn7e1" value="right">h &lt; 0,04</label>
        <label class="option"><input type="radio" name="mn7e1" value="wrong">h &lt; 1</label>
        <label class="option"><input type="radio" name="mn7e1" value="wrong">Aucune limite sur h</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn7e1','mn7fb1','Correct — |1−50h|&lt;1 donne 0&lt;h&lt;2/50=0,04.','Applique |1+hλ|&lt;1 avec λ=−50 : résous |1−50h|&lt;1.')">Vérifier</button>
      <div class="feedback" id="mn7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi préfère-t-on souvent un schéma implicite pour un système raide (stiff) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn7e2" value="wrong">Parce qu'il est toujours plus simple à programmer</label>
        <label class="option"><input type="radio" name="mn7e2" value="right">Parce qu'il permet d'utiliser un pas beaucoup plus grand sans perdre la stabilité</label>
        <label class="option"><input type="radio" name="mn7e2" value="wrong">Parce qu'il est toujours moins coûteux par pas</label>
        <label class="option"><input type="radio" name="mn7e2" value="wrong">Parce qu'il ne nécessite aucune résolution d'équation</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn7e2','mn7fb2','Correct — la stabilité inconditionnelle (A-stabilité) permet de contourner la contrainte sévère de pas imposée par un schéma explicite sur un système raide.','Repense au compromis stabilité inconditionnelle / coût de calcul par pas.')">Vérifier</button>
      <div class="feedback" id="mn7fb2"></div>
    </div>
  </div>
  `
};
METHNUM_NOVA_KB[mnKey("Équations différentielles : consistance, stabilité et convergence")] = {
  intro: "Salut, moi c'est Nova ! On applique consistance/stabilité/convergence aux EDO : Euler explicite/implicite, raideur. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/euler explicite/i, replies:[
      "Euler explicite (y_(n+1)=y_n+h·f(t_n,y_n)) est consistant d'ordre 1, mais seulement conditionnellement stable : |1+hλ|<1 sur l'équation test y'=λy."
    ]},
    { test:/euler implicite|a.stable|a.stabilit[ée]/i, replies:[
      "Euler implicite (évalue f au point d'arrivée) est A-stable : stable pour tout h>0 si Re(λ)<0. En contrepartie, il faut résoudre une équation implicite à chaque pas."
    ]},
    { test:/raide|stiff|raideur/i, replies:[
      "Un système raide (stiff) combine des échelles de temps très différentes. Un schéma explicite y impose un pas minuscule (dicté par la composante rapide) ; un schéma implicite permet un pas bien plus grand."
    ]},
    { test:/erreur de troncature/i, replies:[
      "L'erreur de troncature locale mesure l'écart entre solution exacte et une seule étape du schéma. Pour Euler explicite, elle est en O(h) : le schéma est consistant d'ordre 1."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique |1+hλ|<1 avec λ=−50.",
      "Indice niveau 2 : cela donne |1−50h|<1.",
      "Indice niveau 3 : donc 0<h<2/50=0,04."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au compromis stabilité/coût par pas.",
      "Indice niveau 2 : un schéma implicite reste stable même pour de grands pas.",
      "Indice niveau 3 : c'est cette stabilité inconditionnelle qui justifie son usage sur les systèmes raides."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
METHNUM_CHAPTERS[mnKey("Problèmes aux valeurs propres : méthode de la puissance et algorithme QR")] = {
  objectives: [
    "Comprendre le principe et la convergence de la méthode de la puissance itérée",
    "Identifier les limites de la méthode de la puissance (valeur propre dominante, cas complexes)",
    "Présenter le principe de la décomposition QR et son usage itératif pour extraire le spectre complet",
    "Situer l'importance des problèmes aux valeurs propres en physique"
  ],
  prereqs: ["Systèmes linéaires : méthodes directes (LU, Cholesky) et conditionnement"],
  bodyHtml: `
    <p>Ce dernier chapitre aborde un problème omniprésent en physique : trouver les valeurs propres et vecteurs propres d'une matrice — que ce soit pour diagonaliser un hamiltonien en mécanique quantique, étudier les modes propres d'un système oscillant, ou analyser la stabilité d'un système dynamique linéarisé.</p>

    <h3>1. La méthode de la puissance itérée</h3>
    <p>La <strong>méthode de la puissance</strong> est l'algorithme le plus simple pour approcher la <strong>valeur propre dominante</strong> (celle de plus grand module) d'une matrice $A$, ainsi que son vecteur propre associé. Partant d'un vecteur initial $v_0$ (non orthogonal au vecteur propre dominant), on itère :</p>
    <div class="formula-box">$$v_{k+1} = \\dfrac{A v_k}{\\|A v_k\\|}$$</div>
    <p>Si $A$ possède une valeur propre dominante $\\lambda_1$ strictement supérieure en module à toutes les autres ($|\\lambda_1| > |\\lambda_2| \\ge \\cdots$), la suite $v_k$ converge vers le vecteur propre associé à $\\lambda_1$ (à normalisation près), et le quotient de Rayleigh $v_k^T A v_k$ converge vers $\\lambda_1$. On peut démontrer que la <strong>vitesse de convergence</strong> est gouvernée par le rapport $|\\lambda_2/\\lambda_1|$ :</p>
    <div class="formula-box">$$\\text{erreur} \\sim \\left|\\dfrac{\\lambda_2}{\\lambda_1}\\right|^{k}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Plus les deux plus grandes valeurs propres en module sont <strong>proches l'une de l'autre</strong> (rapport $|\\lambda_2/\\lambda_1|$ proche de 1), plus la convergence de la méthode de la puissance est <strong>lente</strong>. Si $|\\lambda_1| = |\\lambda_2|$ (par exemple deux valeurs propres complexes conjuguées de même module, ou deux valeurs propres réelles opposées), la méthode ne converge pas du tout vers un vecteur propre unique — c'est une limitation fondamentale de cette méthode élémentaire.
    </div>

    <h3>2. Variantes utiles de la méthode de la puissance</h3>
    <table class="mini-table">
      <tr><th>Variante</th><th>Principe</th><th>Utilité</th></tr>
      <tr><td>Puissance inverse</td><td>Applique la méthode de la puissance à $A^{-1}$ (résolue via LU, chapitre 5)</td><td>Trouve la valeur propre de plus <strong>petit</strong> module</td></tr>
      <tr><td>Puissance inverse avec décalage (shift)</td><td>Applique la puissance inverse à $(A-\\sigma I)^{-1}$</td><td>Trouve la valeur propre la plus proche d'un scalaire $\\sigma$ choisi, avec une convergence très rapide si $\\sigma$ est proche de la valeur propre cherchée</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une matrice a pour valeurs propres $\\lambda_1=10$, $\\lambda_2=9$, $\\lambda_3=1$. La méthode de la puissance directe convergera-t-elle rapidement vers $\\lambda_1$ ?</p>
      <p><strong>Solution :</strong> Le taux de convergence est gouverné par $|\\lambda_2/\\lambda_1| = 9/10 = 0{,}9$, très proche de 1 : la convergence sera <strong>très lente</strong> (l'erreur ne décroît que d'un facteur 0,9 par itération), malgré l'existence bien réelle d'une valeur propre dominante unique.</p>
      <p class="example-answer">Réponse : non, la convergence sera lente en raison de la proximité de λ1 et λ2 ; une méthode avec décalage (shift) ciblant spécifiquement λ1 serait bien plus efficace.</p>
    </div>

    <h3>3. Vers le spectre complet : principe de l'algorithme QR</h3>
    <p>Pour obtenir <strong>l'ensemble</strong> des valeurs propres d'une matrice (pas seulement la dominante), l'<strong>algorithme QR</strong> (Francis et Kublanovskaya, 1961) est la méthode de référence en calcul scientifique moderne. Son principe itératif :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Factoriser $A_k = Q_k R_k$ (décomposition QR : $Q_k$ orthogonale, $R_k$ triangulaire supérieure)</li>
      <li>Reformer $A_{k+1} = R_k Q_k$ (produit dans l'ordre inverse)</li>
      <li>Répéter : la suite $A_k$ converge (sous des hypothèses assez générales) vers une matrice triangulaire (ou quasi-triangulaire par blocs, en présence de valeurs propres complexes) dont la <strong>diagonale contient précisément les valeurs propres</strong> de la matrice initiale $A$</li>
    </ol>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi ça marche</span>
      Chaque itération QR conserve les valeurs propres de la matrice de départ, car $A_{k+1} = R_k Q_k = Q_k^{-1}(Q_k R_k) Q_k = Q_k^{-1} A_k Q_k$ est une matrice <strong>semblable</strong> à $A_k$ (même spectre). L'algorithme QR peut donc se comprendre comme une généralisation matricielle de la méthode de la puissance, appliquée simultanément à tout un sous-espace plutôt qu'à un seul vecteur.
    </div>
    <p>En pratique, l'algorithme QR est presque toujours précédé d'une réduction préalable de $A$ à une forme de Hessenberg (quasi-triangulaire, avec au plus une sous-diagonale non nulle), ce qui accélère considérablement chaque itération — une optimisation implémentée dans la quasi-totalité des bibliothèques de calcul scientifique modernes.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La méthode de la puissance approche la valeur propre dominante par itération de v_(k+1) = Av_k/‖Av_k‖</li>
      <li>Sa vitesse de convergence est gouvernée par le rapport |λ2/λ1| ; elle est lente si les deux plus grandes valeurs propres sont proches</li>
      <li>Les variantes puissance inverse et puissance inverse avec décalage ciblent respectivement la plus petite valeur propre et une valeur propre proche d'un scalaire choisi</li>
      <li>L'algorithme QR (factorisation puis reformation Qk Rk → Rk Qk) donne, par itérations successives, l'ensemble du spectre d'une matrice</li>
      <li>Chaque itération QR conserve les valeurs propres car les matrices successives sont semblables entre elles</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que la méthode de la puissance converge toujours rapidement, indépendamment de la répartition des valeurs propres</li>
      <li>Appliquer la méthode de la puissance directe quand on cherche en réalité la plus petite valeur propre — il faut la puissance inverse</li>
      <li>Penser que l'algorithme QR calcule une factorisation QR unique — c'est un processus itératif qui répète cette factorisation à chaque étape</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La vitesse de convergence de la méthode de la puissance est gouvernée par :</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn8e1" value="wrong">Le déterminant de A</label>
        <label class="option"><input type="radio" name="mn8e1" value="right">Le rapport |λ2/λ1| entre les deux plus grandes valeurs propres en module</label>
        <label class="option"><input type="radio" name="mn8e1" value="wrong">La taille de la matrice A uniquement</label>
        <label class="option"><input type="radio" name="mn8e1" value="wrong">Le choix du vecteur initial v0, quel qu'il soit</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn8e1','mn8fb1','Correct — l\\'erreur décroît comme |λ2/λ1|^k : plus ce rapport est proche de 1, plus la convergence est lente.','Relis la formule d\\'erreur de la méthode de la puissance : de quel rapport dépend-elle ?')">Vérifier</button>
      <div class="feedback" id="mn8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi les matrices successives A_k de l'algorithme QR ont-elles toutes le même spectre (mêmes valeurs propres) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="mn8e2" value="wrong">Parce que A_k est toujours égale à A_0</label>
        <label class="option"><input type="radio" name="mn8e2" value="right">Parce que chaque A_(k+1) est semblable à A_k (A_(k+1)=Q_k⁻¹A_kQ_k)</label>
        <label class="option"><input type="radio" name="mn8e2" value="wrong">Parce que Q_k est toujours la matrice identité</label>
        <label class="option"><input type="radio" name="mn8e2" value="wrong">Ce n'est vrai que si A est symétrique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('mn8e2','mn8fb2','Correct — la relation de similitude A_(k+1)=Q_k⁻¹A_kQ_k préserve exactement le spectre à chaque itération.','Relis le point clé « pourquoi ça marche » : quelle relation algébrique relie A_(k+1) et A_k ?')">Vérifier</button>
      <div class="feedback" id="mn8fb2"></div>
    </div>
  </div>
  `
};
METHNUM_NOVA_KB[mnKey("Problèmes aux valeurs propres : méthode de la puissance et algorithme QR")] = {
  intro: "Salut, moi c'est Nova ! On termine avec les valeurs propres : méthode de la puissance et algorithme QR. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/m[ée]thode de la puissance/i, replies:[
      "La méthode de la puissance itère v_(k+1)=Av_k/‖Av_k‖ pour converger vers le vecteur propre associé à la valeur propre dominante. Sa vitesse dépend du rapport |λ2/λ1|."
    ]},
    { test:/puissance inverse/i, replies:[
      "La puissance inverse applique la méthode de la puissance à A⁻¹, ce qui donne la valeur propre de plus petit module. Avec un décalage (shift), on cible la valeur propre la plus proche d'un scalaire choisi."
    ]},
    { test:/algorithme qr|d[ée]composition qr/i, replies:[
      "L'algorithme QR itère : factoriser A_k=Q_kR_k, puis reformer A_(k+1)=R_kQ_k. Les matrices A_k restent semblables (même spectre), et la suite converge vers une forme triangulaire révélant toutes les valeurs propres."
    ]},
    { test:/hessenberg/i, replies:[
      "L'algorithme QR est presque toujours précédé d'une réduction à la forme de Hessenberg (quasi-triangulaire), ce qui accélère considérablement chaque itération QR."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la formule d'erreur de la méthode de la puissance.",
      "Indice niveau 2 : elle dépend d'un rapport entre deux valeurs propres.",
      "Indice niveau 3 : c'est |λ2/λ1|, le rapport entre les deux plus grandes valeurs propres en module."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la relation algébrique entre A_(k+1) et A_k dans l'algorithme QR.",
      "Indice niveau 2 : c'est une relation de similitude (conjugaison par une matrice orthogonale).",
      "Indice niveau 3 : A_(k+1)=Q_k⁻¹A_kQ_k préserve exactement le spectre."
    ]}
  ]
};

/* fusionne le module Méthodes numériques dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, METHNUM_CHAPTERS);
Object.assign(NOVA_KB, METHNUM_NOVA_KB);