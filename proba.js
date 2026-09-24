/* =====================================================================
   CHUNK « proba » — registre PROBA_CHAPTERS / PROBA_NOVA_KB
   Matière(s) : Mathématiques|Probabilité et statistique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   PROBA_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =========================================================================
   MODULE "Probabilité et statistique" (Mathématiques, L2)
   6 chapitres, à partir du plan de cours ISAE "Probabilités et Statistique"
   (inspiré de G. Saporta, Probabilités, Analyse des Données et Statistique) :
   1. Variables aléatoires discrètes
   2. Variables aléatoires absolument continues et cadre probabiliste général
   3. Théorèmes limites (LGN, TCL)
   4. Vecteurs gaussiens
   5. Estimation paramétrique
   6. Tests d'hypothèses
========================================================================= */
const PROBA_MATIERE = "Probabilité et statistique";
function probaKey(chapterTitle){ return `Mathématiques|${PROBA_MATIERE}|${chapterTitle}`; }
const PROBA_CHAPTERS = {};
const PROBA_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Variables aléatoires discrètes =========================== */
PROBA_CHAPTERS[probaKey('Variables aléatoires discrètes')] = {
  objectives: [
    "Définir un espace de probabilités discret et manipuler les axiomes de Kolmogorov dans ce cadre",
    "Décrire la loi d'une variable aléatoire discrète et calculer espérance, variance et fonction caractéristique via le théorème de transfert",
    "Étudier un couple de variables aléatoires discrètes : lois marginales, indépendance, covariance",
    "Utiliser le conditionnement (par rapport à un évènement ou à une variable aléatoire discrète) et l'espérance totale",
    "Appliquer les inégalités de Markov et de Bienaymé–Tchebychev"
  ],
  prereqs: ["Dénombrement et combinatoire (classes préparatoires)", "Notion de série numérique convergente", "Algèbre linéaire élémentaire"],
  bodyHtml: `
    <p>Ce chapitre reprend et complète les bases de la théorie des probabilités discrètes vues en classes préparatoires, en insistant sur une notion essentielle pour la suite du cours : l'<strong>espérance conditionnelle</strong>. Le cadre discret, plus simple que le cadre général (Chapitre 2), permet d'introduire proprement tous les objets fondamentaux — loi, espérance, indépendance, conditionnement — avant de les généraliser.</p>

    <h3>1. Espace de probabilités dans le cas discret</h3>
    <p>On travaille sur un univers $\\Omega$ <strong>fini ou dénombrable</strong>. Une probabilité $P$ sur $\\Omega$ est une application de l'ensemble des parties $\\mathcal{P}(\\Omega)$ vers $[0,1]$ vérifiant :</p>
    <ol>
      <li>$P(\\Omega)=1$ ;</li>
      <li>pour toute famille dénombrable $(A_i, i\\in I)$ d'ensembles deux à deux disjoints, $\\displaystyle P\\Big(\\bigcup_{i\\in I} A_i\\Big)=\\sum_{i\\in I}P(A_i)$ (σ-additivité).</li>
    </ol>
    <p>Dans le cas discret, il suffit de connaître $P(\\{\\omega\\})$ pour chaque $\\omega\\in\\Omega$ : par σ-additivité, $P(A)=\\sum_{\\omega\\in A}P(\\{\\omega\\})$ pour toute partie $A$ de $\\Omega$. Cette simplicité disparaîtra au Chapitre 2, où $\\Omega$ ne sera plus dénombrable.</p>

    <h3>2. Variables aléatoires discrètes</h3>
    <p>Une <strong>variable aléatoire discrète</strong> est une application $X:\\Omega\\to X(\\Omega)$ dont l'ensemble image $X(\\Omega)$ est fini ou dénombrable. Pour $B\\subset X(\\Omega)$, on note $\\{X\\in B\\}$ l'évènement $X^{-1}(B)=\\{\\omega\\in\\Omega\\ ;\\ X(\\omega)\\in B\\}$.</p>
    <p>La <strong>loi</strong> de $X$ est entièrement déterminée par la donnée de $X(\\Omega)$ et, pour tout $x\\in X(\\Omega)$, de $p_x=P(X=x)$. On a alors $p_x\\geq 0$, $\\sum_x p_x=1$, et pour tout $B\\subset X(\\Omega)$ :</p>
    <p>$$P(X\\in B)=\\sum_{x\\in B} P(X=x)$$</p>

    <h3>3. Fonction de répartition, espérance et variance</h3>
    <p>Si $X$ est à valeurs réelles, sa <strong>fonction de répartition</strong> est $F_X(x)=P(X\\leq x)$. Le <strong>théorème de transfert</strong> permet de calculer l'espérance de $\\varphi(X)$ pour $\\varphi:\\mathbb{R}^d\\to\\mathbb{R}$ sans connaître la loi de $\\varphi(X)$ elle-même :</p>
    <p>$$E(\\varphi(X))=\\sum_x \\varphi(x)P(X=x)\\quad\\text{(sous réserve de convergence absolue)}$$</p>
    <table class="mini-table">
      <tr><th>Choix de $\\varphi$</th><th>Résultat</th><th>Nom</th></tr>
      <tr><td>$\\varphi(x)=x$</td><td>$E(X)=\\sum_x xP(X=x)=m$</td><td>Espérance (moyenne)</td></tr>
      <tr><td>$\\varphi(x)=(x-m)^2$</td><td>$\\mathrm{Var}(X)=E(X^2)-(E(X))^2$</td><td>Variance</td></tr>
      <tr><td>$\\varphi(x)=e^{itx}$, $t\\in\\mathbb{R}$</td><td>$\\phi_X(t)=E(e^{itX})$</td><td>Fonction caractéristique</td></tr>
      <tr><td>$\\varphi(x)=s^x$, $X(\\Omega)\\subset\\mathbb{N}$</td><td>$G_X(s)=E(s^X)$</td><td>Fonction génératrice</td></tr>
    </table>
    <p>On a les propriétés de linéarité $E(aX+b)=aE(X)+b$ et $\\mathrm{Var}(aX+b)=a^2\\mathrm{Var}(X)$, ainsi que l'écart-type $\\sigma_X=\\sqrt{\\mathrm{Var}(X)}$.</p>

    <h3>4. Fonction génératrice : retrouver les moments</h3>
    <p>Pour $X(\\Omega)\\subset\\mathbb{N}$, la fonction génératrice $G_X(s)=E(s^X)=\\sum_k s^k P(X=k)$ est une série entière de rayon de convergence $R\\geq 1$. Ses dérivées en $s=1^-$ redonnent les moments de $X$ :</p>
    <p>$$E(X)=G_X'(1^-),\\qquad E(X(X-1))=G_X''(1^-),\\qquad \\mathrm{Var}(X)=G_X''(1^-)+G_X'(1^-)-\\big(G_X'(1^-)\\big)^2$$</p>
    <p>Cette technique est particulièrement efficace pour les lois usuelles (Bernoulli, binomiale, Poisson, géométrique) dont la fonction génératrice a une forme fermée simple.</p>

    <h3>5. Couples de variables aléatoires discrètes</h3>
    <p>Pour un couple $(X,Y)$ de loi conjointe $p_{x,y}=P(X=x,Y=y)$, les <strong>lois marginales</strong> s'obtiennent en sommant sur l'autre variable :</p>
    <p>$$p_{x\\cdot}=P(X=x)=\\sum_y p_{x,y}, \\qquad p_{\\cdot y}=P(Y=y)=\\sum_x p_{x,y}$$</p>
    <p>$X$ et $Y$ sont <strong>indépendantes</strong> si et seulement si $p_{x,y}=p_{x\\cdot}\\,p_{\\cdot y}$ pour tout $(x,y)$. On définit la <strong>covariance</strong> :</p>
    <p>$$\\mathrm{Cov}(X,Y)=E[(X-E(X))(Y-E(Y))]=E(XY)-E(X)E(Y)$$</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Formule</th></tr>
      <tr><td>Linéarité de l'espérance</td><td>$E(aX+bY)=aE(X)+bE(Y)$</td></tr>
      <tr><td>Covariance et variance</td><td>$\\mathrm{Cov}(X,X)=\\mathrm{Var}(X)$, $\\mathrm{Cov}(aX+b,cY+d)=ac\\,\\mathrm{Cov}(X,Y)$</td></tr>
      <tr><td>Variance d'une somme</td><td>$\\mathrm{Var}(aX+bY)=a^2\\mathrm{Var}(X)+b^2\\mathrm{Var}(Y)+2ab\\,\\mathrm{Cov}(X,Y)$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Piège classique</span>
      Si $X$ et $Y$ sont indépendantes alors $\\mathrm{Cov}(X,Y)=0$ — mais la réciproque est <strong>fausse en général</strong> : une covariance nulle ne prouve pas l'indépendance. Il existe des couples non indépendants et pourtant décorrélés.
    </div>

    <h3>6. Conditionnement par rapport à un évènement</h3>
    <p>Si $P(B)\\neq 0$, la probabilité de $A$ sachant $B$ est $P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}$. $A$ et $B$ sont indépendants (i.e. $P(A\\cap B)=P(A)P(B)$) si et seulement si $P(B)=P(B\\mid A)$, ou de façon équivalente $P(A)=P(A\\mid B)$ : « la connaissance de $B$ n'apporte aucune information sur $A$ ».</p>
    <p>La <strong>formule des probabilités totales</strong> : si $\\Omega=\\bigcup_n E_n$ avec les $E_n$ deux à deux disjoints,</p>
    <p>$$P(A)=\\sum_n P(A\\cap E_n)=\\sum_n P(A\\mid E_n)P(E_n)$$</p>

    <h3>7. Conditionnement par rapport à une variable aléatoire discrète</h3>
    <p>Pour $x\\in X(\\Omega)$ fixé, la <strong>loi conditionnelle</strong> de $Y$ sachant $X=x$ est donnée pour tout $y$ par $P(Y=y\\mid X=x)=\\dfrac{P(X=x,Y=y)}{P(X=x)}=\\dfrac{p_{xy}}{p_{x\\cdot}}$.</p>
    <p>L'<strong>espérance conditionnelle</strong> de $Y$ sachant $X=x$ est l'espérance de cette loi conditionnelle : $E(Y\\mid X=x)=\\sum_y y\\,P(Y=y\\mid X=x)$. On note $E(Y\\mid X)$ la variable aléatoire $\\varphi(X)$ où $\\varphi(x)=E(Y\\mid X=x)$ — c'est bien une variable aléatoire, fonction du hasard $X$, et non un simple nombre.</p>
    <div class="key-point">
      <span class="eyebrow">Théorème de l'espérance totale</span>
      Si $Y$ admet une espérance, alors $E(Y\\mid X)$ aussi, et $E\\big(E(Y\\mid X)\\big)=E(Y)$. Autrement dit : « moyenner les espérances conditionnelles redonne l'espérance globale ». On a aussi la propriété $E(\\psi(X)Y\\mid X)=\\psi(X)E(Y\\mid X)$ pour toute fonction bornée $\\psi$ (on peut « sortir » de l'espérance conditionnelle tout ce qui ne dépend que de $X$).
    </div>

    <h3>8. Inégalités de Markov et de Bienaymé–Tchebychev</h3>
    <p>Pour $\\varepsilon>0$ et $\\alpha>0$, l'<strong>inégalité de Markov</strong> donne :</p>
    <p>$$P(|X|>\\varepsilon)\\leq \\dfrac{1}{\\varepsilon^\\alpha}E(|X|^\\alpha)$$</p>
    <p>Pour $\\alpha=2$, appliquée à $X-E(X)$, on obtient l'<strong>inégalité de Bienaymé–Tchebychev</strong> :</p>
    <p>$$P(|X-E(X)|>\\varepsilon)\\leq \\dfrac{1}{\\varepsilon^2}\\mathrm{Var}(X)$$</p>
    <p>Cette inégalité, bien que souvent grossière en pratique, est l'outil clé pour démontrer la loi des grands nombres au Chapitre 3.</p>

    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Tout le formalisme de la théorie des probabilités — loi, espérance, indépendance, conditionnement — se construit ici dans le cadre le plus simple (Ω dénombrable). Le Chapitre 2 reprendra exactement les mêmes notions dans un cadre général (Ω non dénombrable, tribus), en remplaçant les sommes par des intégrales.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>La loi d'une v.a. discrète $X$ est donnée par $X(\\Omega)$ et $p_x=P(X=x)$, avec $\\sum_x p_x=1$</li>
        <li>Théorème de transfert : $E(\\varphi(X))=\\sum_x \\varphi(x)P(X=x)$ ; cas particuliers : espérance, variance, fonction caractéristique, fonction génératrice</li>
        <li>Fonction génératrice $G_X$ : $E(X)=G_X'(1^-)$, $\\mathrm{Var}(X)=G_X''(1^-)+G_X'(1^-)-(G_X'(1^-))^2$</li>
        <li>Indépendance de $(X,Y)$ discret $\\iff p_{x,y}=p_{x\\cdot}p_{\\cdot y}$ pour tout $(x,y)$ ; $\\mathrm{Cov}(X,Y)=E(XY)-E(X)E(Y)$</li>
        <li>Indépendance $\\Rightarrow$ covariance nulle, mais la réciproque est fausse en général</li>
        <li>Probabilités totales : $P(A)=\\sum_n P(A\\mid E_n)P(E_n)$ pour une partition $(E_n)$ de $\\Omega$</li>
        <li>Espérance totale : $E(E(Y\\mid X))=E(Y)$ ; $E(\\psi(X)Y\\mid X)=\\psi(X)E(Y\\mid X)$</li>
        <li>Bienaymé–Tchebychev : $P(|X-E(X)|>\\varepsilon)\\leq \\mathrm{Var}(X)/\\varepsilon^2$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que covariance nulle implique indépendance : c'est faux en général, seule l'implication inverse est vraie</li>
        <li>Confondre $E(Y\\mid X)$ (une variable aléatoire, fonction de $X$) avec $E(Y\\mid X=x)$ (un simple nombre, pour $x$ fixé)</li>
        <li>Oublier la condition de convergence absolue dans le théorème de transfert avant d'écrire $E(\\varphi(X))=\\sum_x\\varphi(x)P(X=x)$</li>
        <li>Appliquer l'inégalité de Bienaymé–Tchebychev en pensant qu'elle donne une borne fine : elle est souvent très grossière, mais toujours valable</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Si $G_X$ est la fonction génératrice d'une variable aléatoire $X$ à valeurs dans $\\mathbb{N}$, alors $E(X)$ est égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba1e1" value="wrong"> $G_X(1)$</label>
          <label class="option"><input type="radio" name="proba1e1" value="right"> $G_X'(1^-)$</label>
          <label class="option"><input type="radio" name="proba1e1" value="wrong"> $G_X''(1^-)$</label>
          <label class="option"><input type="radio" name="proba1e1" value="wrong"> $G_X(0)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba1e1','proba1fb1','Correct — dériver une fois la série entière $G_X(s)=\\\\sum_k s^k P(X=k)$ et évaluer en $s=1^-$ donne exactement E(X).','Repense à la définition de $G_X(s)=E(s^X)$ et à ce que donne sa dérivée première en s=1.')">Vérifier</button>
        <div class="feedback" id="proba1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si $X$ et $Y$ sont deux variables aléatoires discrètes telles que $\\mathrm{Cov}(X,Y)=0$, alors :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba1e2" value="wrong"> $X$ et $Y$ sont nécessairement indépendantes</label>
          <label class="option"><input type="radio" name="proba1e2" value="right"> $X$ et $Y$ ne sont pas nécessairement indépendantes</label>
          <label class="option"><input type="radio" name="proba1e2" value="wrong"> $X$ et $Y$ sont nécessairement égales</label>
          <label class="option"><input type="radio" name="proba1e2" value="wrong"> Cela signifie que $E(X)=E(Y)=0$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba1e2','proba1fb2','Correct — l\\'indépendance implique une covariance nulle, mais la réciproque est fausse : il existe des couples décorrélés mais dépendants.','Relis le piège classique du cours : une seule des deux implications est vraie.')">Vérifier</button>
        <div class="feedback" id="proba1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'inégalité de Bienaymé–Tchebychev s'écrit, pour $\\varepsilon>0$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba1e3" value="wrong"> $P(|X-E(X)|>\\varepsilon)\\geq \\mathrm{Var}(X)/\\varepsilon^2$</label>
          <label class="option"><input type="radio" name="proba1e3" value="right"> $P(|X-E(X)|>\\varepsilon)\\leq \\mathrm{Var}(X)/\\varepsilon^2$</label>
          <label class="option"><input type="radio" name="proba1e3" value="wrong"> $P(|X|>\\varepsilon)\\leq \\mathrm{Var}(X)/\\varepsilon$</label>
          <label class="option"><input type="radio" name="proba1e3" value="wrong"> $P(|X-E(X)|>\\varepsilon) = \\mathrm{Var}(X)/\\varepsilon^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba1e3','proba1fb3','Correct — c\\'est l\\'inégalité de Markov appliquée à (X-E(X))² avec α=2, elle donne une borne supérieure, jamais une égalité.','Repense à l\\'inégalité de Markov P(|X|>ε) ≤ E(|X|^α)/ε^α appliquée à α=2 et à X-E(X).')">Vérifier</button>
        <div class="feedback" id="proba1fb3"></div>
      </div>
    </div>
  `
};

PROBA_NOVA_KB[probaKey('Variables aléatoires discrètes')] = {
  intro: "Salut, moi c'est Nova ! On est sur les variables aléatoires discrètes : lois, espérance, fonction génératrice, covariance et conditionnement. Demande-moi comment retrouver l'espérance avec la fonction génératrice, la différence entre covariance nulle et indépendance, ou l'inégalité de Bienaymé-Tchebychev.",
  rules: [
    { test:/fonction g[ée]n[ée]ratrice/i, replies:["La fonction génératrice G_X(s)=E(s^X) est une série entière. Ses dérivées en s=1⁻ donnent les moments : E(X)=G_X'(1⁻), et Var(X)=G_X''(1⁻)+G_X'(1⁻)-(G_X'(1⁻))²."] },
    { test:/fonction caract[ée]ristique/i, replies:["La fonction caractéristique φ_X(t)=E(e^{itX}) caractérise entièrement la loi de X. Contrairement à la fonction génératrice, elle est toujours définie, même si X n'est pas à valeurs dans N."] },
    { test:/covariance/i, replies:["Cov(X,Y)=E(XY)-E(X)E(Y) mesure la tendance de X et Y à varier ensemble. Attention : indépendance ⇒ covariance nulle, mais la réciproque est fausse en général."] },
    { test:/ind[ée]pendance|ind[ée]pendantes/i, replies:["Deux v.a. discrètes X et Y sont indépendantes ssi p_{x,y}=p_{x·}p_{·y} pour tout (x,y), c'est-à-dire que la loi conjointe se factorise en produit des lois marginales."] },
    { test:/esp[ée]rance conditionnelle|E\\(Y\\|X\\)/i, replies:["E(Y|X) est une variable aléatoire, fonction de X : c'est φ(X) où φ(x)=E(Y|X=x). Le théorème de l'espérance totale dit que E(E(Y|X))=E(Y)."] },
    { test:/probabilit[ée]s? totales?/i, replies:["Si (E_n) forme une partition de Ω, la formule des probabilités totales donne P(A)=Σ_n P(A|E_n)P(E_n) : on décompose selon tous les cas possibles."] },
    { test:/markov|tchebychev|bienaym[ée]/i, replies:["L'inégalité de Markov P(|X|>ε) ≤ E(|X|^α)/ε^α, appliquée à α=2 sur X-E(X), donne Bienaymé-Tchebychev : P(|X-E(X)|>ε) ≤ Var(X)/ε². C'est le point de départ de la loi des grands nombres."] },
    { test:/th[ée]or[èe]me de transfert/i, replies:["Le théorème de transfert calcule E(φ(X)) sans connaître la loi de φ(X) : E(φ(X))=Σ_x φ(x)P(X=x), sous réserve de convergence absolue de cette série."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : rappelle-toi la définition G_X(s)=E(s^X)=Σ_k s^k P(X=k).","Indice niveau 2 : dérive terme à terme cette série entière puis évalue en s=1⁻.","Indice niveau 3 : G_X'(1⁻)=Σ_k k P(X=k)=E(X)."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : une seule des deux implications entre covariance nulle et indépendance est vraie.","Indice niveau 2 : l'indépendance entraîne toujours covariance nulle.","Indice niveau 3 : la réciproque est fausse — il existe des contre-exemples de couples décorrélés mais dépendants."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : pars de l'inégalité de Markov P(|X|>ε) ≤ E(|X|^α)/ε^α.","Indice niveau 2 : applique-la à la variable X-E(X) avec α=2.","Indice niveau 3 : P(|X-E(X)|>ε) ≤ Var(X)/ε², c'est une borne supérieure (≤), jamais une égalité."] }
  ]
};

/* =========================== CHAPITRE 2 — Variables aléatoires absolument continues et cadre probabiliste général =========================== */
PROBA_CHAPTERS[probaKey('Variables aléatoires absolument continues et cadre probabiliste général')] = {
  objectives: [
    "Expliquer pourquoi la notion de tribu est nécessaire dès que Ω n'est plus dénombrable",
    "Définir un espace de probabilités général (Ω,F,P) et une variable aléatoire comme application mesurable",
    "Manipuler la densité d'une variable aléatoire absolument continue et calculer des lois par changement de variable",
    "Retrouver les lois marginales et la loi conditionnelle d'un couple absolument continu",
    "Identifier les limites du cadre absolument continu et la nécessité de la théorie de la mesure"
  ],
  prereqs: ["Variables aléatoires discrètes", "Calcul intégral à une et plusieurs variables", "Difféomorphismes et jacobien"],
  bodyHtml: `
    <p>Nous introduisons dans ce chapitre une nouvelle classe de variables aléatoires : les variables aléatoires <strong>absolument continues</strong> par rapport à la mesure de Lebesgue. Le message principal est le suivant : presque tout ce qui a été fait dans le cas discret reste valable dans le cas continu, en remplaçant les sommes $\\sum$ par des intégrales $\\int$ et les probabilités ponctuelles $P(X=x)$ par $f_X(x)\\,dx$.</p>

    <h3>1. Motivation : pourquoi les tribus ?</h3>
    <p>Dès que $\\Omega$ n'est plus dénombrable (par exemple $\\Omega=[0,1]$ pour un tirage « au hasard » d'un réel), il devient impossible de définir une probabilité cohérente sur <strong>toutes</strong> les parties de $\\Omega$ (certaines parties, très pathologiques, ne peuvent recevoir aucune mesure raisonnable — c'est le théorème de Vitali). On restreint donc les évènements « mesurables » à une famille de parties bien choisie : une <strong>tribu</strong>.</p>

    <h3>2. Espace de probabilités : le cas général</h3>
    <p>Une <strong>tribu</strong> $\\mathcal{F}$ sur $\\Omega$ est un ensemble de parties de $\\Omega$ tel que :</p>
    <ol>
      <li>$\\Omega\\in\\mathcal{F}$ ;</li>
      <li>si $A\\in\\mathcal{F}$, alors $A^c\\in\\mathcal{F}$ (stable par complémentaire) ;</li>
      <li>si $A_n\\in\\mathcal{F}$ pour tout $n\\in\\mathbb{N}$, alors $\\bigcup_{n=0}^{+\\infty} A_n\\in\\mathcal{F}$ (stable par union dénombrable).</li>
    </ol>
    <p>Une <strong>probabilité</strong> $P$ sur $(\\Omega,\\mathcal{F})$ est une application $\\mathcal{F}\\to[0,1]$ telle que $P(\\Omega)=1$ et, pour toute suite $(A_n)$ d'évènements deux à deux incompatibles, $P\\big(\\bigcup_n A_n\\big)=\\sum_n P(A_n)$. Le plus souvent, on prend $(\\Omega,\\mathcal{F})=(\\mathbb{R}^d,\\mathcal{B}(\\mathbb{R}^d))$, où $\\mathcal{B}(\\mathbb{R}^d)$ est la <strong>tribu des boréliens</strong>, engendrée par les ouverts.</p>

    <h3>3. Variables aléatoires et loi dans le cas général</h3>
    <p>Une <strong>variable aléatoire</strong> $X$ est une application <strong>mesurable</strong> $X:(\\Omega,\\mathcal{F})\\to(\\Omega',\\mathcal{F}')$, c'est-à-dire que $X^{-1}(B)\\in\\mathcal{F}$ pour tout $B\\in\\mathcal{F}'$ — condition nécessaire pour que $P(X\\in B)$ ait un sens ! La <strong>loi</strong> de $X$ est la probabilité image $P_X$ sur $(\\Omega',\\mathcal{F}')$ définie par $P_X(B)=P(X^{-1}(B))$.</p>

    <h3>4. Le cas discret revisité</h3>
    <p>Le cadre discret du Chapitre 1 est un cas particulier de ce cadre général, où $\\mathcal{F}=\\mathcal{P}(\\Omega)$ (toutes les parties, ce qui est possible car $\\Omega$ est dénombrable). Tout ce qui a été démontré au Chapitre 1 reste donc valable, comme cas particulier du cadre général.</p>

    <h3>5. Variables aléatoires absolument continues</h3>
    <p>Une variable $X:(\\Omega,\\mathcal{F})\\to(\\mathbb{R}^d,\\mathcal{B}(\\mathbb{R}^d))$ est <strong>absolument continue</strong> s'il existe une fonction mesurable $f_X\\geq 0$, appelée <strong>densité</strong>, telle que pour tout borélien $B$ :</p>
    <p>$$P_X(B)=P(X\\in B)=\\int_B f_X(x)\\,dx=\\int f_X(x)\\mathbf{1}_{\\{x\\in B\\}}\\,dx$$</p>
    <p>Toute densité vérifie nécessairement $\\int_{\\mathbb{R}^d} f_X(x)\\,dx=1$. Conséquence immédiate et fondamentale : $P(X=x)=0$ pour tout $x$ fixé — un point unique a une probabilité nulle, seul un intervalle (de mesure de Lebesgue non nulle) peut avoir une probabilité positive.</p>

    <h3>6. Du discret au continu : les sommes deviennent des intégrales</h3>
    <p>Le <strong>théorème de transfert</strong> se réécrit à l'identique, en remplaçant la somme par une intégrale : pour $\\varphi:\\mathbb{R}^d\\to\\mathbb{R}$,</p>
    <p>$$E(\\varphi(X))=\\int \\varphi(x)f_X(x)\\,dx\\quad\\text{(sous réserve d'intégrabilité de } x\\mapsto\\varphi(x)f_X(x))$$</p>
    <p>De même, la <strong>fonction caractéristique</strong> devient $\\phi_X(t)=E(e^{i\\langle t,X\\rangle})=\\int e^{i\\langle t,x\\rangle}f_X(x)\\,dx$ pour $t\\in\\mathbb{R}^d$.</p>

    <h3>7. Fonction de répartition et cas d=1</h3>
    <p>La fonction de répartition $F_X(x)=P(X_1\\leq x_1,\\dots,X_d\\leq x_d)$ se simplifie beaucoup en dimension 1 : $F_X(x)=\\int_{-\\infty}^x f_X(s)\\,ds$ est continue, croissante sur $\\mathbb{R}$, de classe $C^1$ presque partout, avec $F_X'=f_X$. On retrouve $P(a\\leq X\\leq b)=\\int_a^b f_X(x)\\,dx$.</p>
    <p>Pour un couple $(X,Y)$ absolument continu de densité conjointe $f_{X,Y}$, les <strong>lois marginales</strong> s'obtiennent par intégration sur l'autre variable, exactement comme les sommes en discret :</p>
    <p>$$f_X(x)=\\int f_{X,Y}(x,y)\\,dy, \\qquad f_Y(y)=\\int f_{X,Y}(x,y)\\,dx$$</p>

    <h3>8. Méthodes de calcul de loi</h3>
    <p>Pour trouver la loi de $U=\\varphi(X)$, deux méthodes principales :</p>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Principe</th></tr>
      <tr><td>Fonction de répartition</td><td>$F_U(u)=P(\\varphi(X)\\leq u)$, à exprimer via $F_X$, puis dériver pour obtenir $f_U$</td></tr>
      <tr><td>Formule du changement de variable (jacobien)</td><td>Si $\\varphi$ est un $C^1$-difféomorphisme de $D$ sur $D'=\\varphi(D)$, alors $f_{\\varphi(X)}(y)=f_X(\\varphi^{-1}(y))\\,|\\det\\mathrm{Jac}_y(\\varphi^{-1})|$ pour $y\\in\\varphi(D)$</td></tr>
    </table>
    <p>Pour la loi d'une fonction de deux variables (par exemple $X+Y$), on considère souvent le couple $(U,V)=(X,\\varphi(X,Y))$, on calcule sa densité conjointe par changement de variable, puis on intègre pour obtenir la seconde marginale.</p>

    <h3>9. Conditionnement dans le cas continu</h3>
    <p>Pour $x$ fixé tel que $f_X(x)\\neq 0$, la <strong>loi conditionnelle</strong> $P_Y(\\cdot\\mid X=x)$ est absolument continue, de densité :</p>
    <p>$$f_{Y\\mid X=x}(y)=\\dfrac{f_{X,Y}(x,y)}{f_X(x)}$$</p>
    <p>L'<strong>espérance conditionnelle</strong> se calcule alors par $E(Y\\mid X=x)=\\int y\\,f_{Y\\mid X=x}(y)\\,dy$, exactement comme en discret mais avec une intégrale.</p>

    <h3>10. Limitations du cadre absolument continu</h3>
    <p>Le cadre absolument continu présente des limites intrinsèques : il rend par exemple difficile de définir proprement l'espérance conditionnelle en toute généralité, et l'on en sort très naturellement — par exemple le couple $(X,X)$ avec $X$ absolument continue n'est pas absolument continu (sa loi est concentrée sur la diagonale, de mesure de Lebesgue nulle en dimension 2). Autre exemple : un signal $\\varepsilon X$ où $\\varepsilon$ est une Bernoulli et $X$ une gaussienne (réception avec probabilité $p$, silence sinon) n'est ni discret ni absolument continu.</p>
    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Seule la théorie de la mesure (hors du cadre de ce cours) permet de construire une théorie des probabilités complètement satisfaisante, unifiant les cas discret et continu. Dans la pratique, l'intuition — remplacer $\\sum$ par $\\int$ et $P(X=x)$ par $f_X(x)dx$ — suffit dans l'immense majorité des situations rencontrées en ingénierie.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une tribu F sur Ω est stable par complémentaire et par union dénombrable, et contient Ω</li>
        <li>Une variable aléatoire est une application mesurable X : (Ω,F) → (Ω',F') ; sa loi est la probabilité image $P_X$</li>
        <li>X est absolument continue de densité $f_X\\geq 0$ si $P(X\\in B)=\\int_B f_X$, avec $\\int f_X=1$ ; conséquence : $P(X=x)=0$</li>
        <li>Théorème de transfert (continu) : $E(\\varphi(X))=\\int \\varphi(x)f_X(x)dx$</li>
        <li>En dimension 1 : $F_X'=f_X$ presque partout ; lois marginales par intégration de la densité conjointe</li>
        <li>Deux méthodes de calcul de loi : fonction de répartition, ou formule du jacobien pour un changement de variable $C^1$</li>
        <li>Densité conditionnelle : $f_{Y\\mid X=x}(y)=f_{X,Y}(x,y)/f_X(x)$</li>
        <li>Le cadre absolument continu a des limites (couple (X,X), mélange discret/continu) : seule la théorie de la mesure unifie tous les cas</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Écrire $P(X=x)=f_X(x)$ : c'est faux, $f_X(x)$ est une densité (pas une probabilité), et $P(X=x)=0$ toujours pour X absolument continue</li>
        <li>Oublier la valeur absolue du déterminant jacobien dans la formule de changement de variable</li>
        <li>Mettre une indicatrice sur $x$ (déjà fixé) au lieu de $y$ dans l'expression de la densité conditionnelle $f_{Y|X=x}(y)$</li>
        <li>Croire que toute variable aléatoire est soit discrète, soit absolument continue : ce n'est pas toujours vrai (cf. limitations)</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une variable aléatoire $X$ absolument continue, la probabilité $P(X=x_0)$ pour un réel $x_0$ fixé vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba2e1" value="wrong"> $f_X(x_0)$</label>
          <label class="option"><input type="radio" name="proba2e1" value="right"> $0$</label>
          <label class="option"><input type="radio" name="proba2e1" value="wrong"> $1$</label>
          <label class="option"><input type="radio" name="proba2e1" value="wrong"> On ne peut pas savoir sans connaître $f_X$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba2e1','proba2fb1','Correct — c\\'est une conséquence directe de la définition : $P(X=x_0)=\\\\int_{x_0}^{x_0} f_X(x)dx=0$, l\\'intégrale sur un singleton est nulle.','Repense à la définition de la densité : P(X∈B) est une intégrale de f_X sur B. Que vaut cette intégrale si B={x0} est réduit à un point ?')">Vérifier</button>
        <div class="feedback" id="proba2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une tribu F sur Ω doit obligatoirement contenir :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba2e2" value="wrong"> Uniquement l'ensemble vide</label>
          <label class="option"><input type="radio" name="proba2e2" value="right"> Ω lui-même</label>
          <label class="option"><input type="radio" name="proba2e2" value="wrong"> Toutes les parties finies de Ω</label>
          <label class="option"><input type="radio" name="proba2e2" value="wrong"> Uniquement des intervalles</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba2e2','proba2fb2','Correct — le premier axiome impose Ω∈F ; comme F est stable par complémentaire, ∅=Ω^c en découle automatiquement.','Relis les trois axiomes qui définissent une tribu : l\\'un d\\'eux fixe un ensemble particulier qui doit toujours appartenir à F.')">Vérifier</button>
        <div class="feedback" id="proba2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La densité conditionnelle de $Y$ sachant $X=x$ (avec $f_X(x)\\neq 0$) s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba2e3" value="wrong"> $f_{X,Y}(x,y)\\times f_X(x)$</label>
          <label class="option"><input type="radio" name="proba2e3" value="right"> $f_{X,Y}(x,y)/f_X(x)$</label>
          <label class="option"><input type="radio" name="proba2e3" value="wrong"> $f_{X,Y}(x,y)/f_Y(y)$</label>
          <label class="option"><input type="radio" name="proba2e3" value="wrong"> $f_X(x)/f_{X,Y}(x,y)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba2e3','proba2fb3','Correct — c\\'est l\\'analogue continu de la formule discrète P(Y=y|X=x)=p_{xy}/p_{x·} : on divise la densité conjointe par la densité marginale de la variable que l\\'on conditionne.','Repense à l\\'analogue discret : P(Y=y|X=x)=p_{xy}/p_{x·}. Remplace les p par des densités f.')">Vérifier</button>
        <div class="feedback" id="proba2fb3"></div>
      </div>
    </div>
  `
};

PROBA_NOVA_KB[probaKey('Variables aléatoires absolument continues et cadre probabiliste général')] = {
  intro: "Salut, moi c'est Nova ! On passe au cadre général : tribus, variables absolument continues, densité et changement de variable. Demande-moi pourquoi P(X=x)=0, comment fonctionne la formule du jacobien, ou ce qu'est une tribu.",
  rules: [
    { test:/tribu/i, replies:["Une tribu F sur Ω contient Ω, est stable par complémentaire (A∈F ⇒ Aᶜ∈F), et stable par union dénombrable. Elle sert à définir proprement quels évènements ont une probabilité, dès que Ω n'est plus dénombrable."] },
    { test:/densit[ée]/i, replies:["La densité f_X n'est pas une probabilité : c'est P(X∈B)=∫_B f_X(x)dx qui en est une. On a toujours ∫f_X=1 et f_X≥0, mais f_X(x) peut très bien dépasser 1."] },
    { test:/P\\(X\\s*=\\s*x\\)|probabilit[ée].*ponctuelle/i, replies:["Pour une variable absolument continue, P(X=x)=0 pour tout x fixé : c'est une conséquence directe du fait qu'on intègre sur un ensemble de mesure nulle (un point). Seuls les intervalles ont une probabilité positive."] },
    { test:/jacobien|changement de variable/i, replies:["Si φ est un C¹-difféomorphisme de D sur D'=φ(D), alors f_{φ(X)}(y)=f_X(φ⁻¹(y))·|det Jac_y(φ⁻¹)|. Il ne faut jamais oublier la valeur absolue du déterminant jacobien !"] },
    { test:/marginale/i, replies:["La loi marginale de X à partir d'un couple continu (X,Y) s'obtient en intégrant la densité conjointe sur l'autre variable : f_X(x)=∫f_{X,Y}(x,y)dy."] },
    { test:/fonction de r[ée]partition/i, replies:["En dimension 1, F_X(x)=∫_{-∞}^x f_X(s)ds est continue, croissante, et F_X'=f_X presque partout. C'est souvent le point de départ pour trouver la loi d'une transformée U=φ(X)."] },
    { test:/limitation|mesure/i, replies:["Le cadre absolument continu a des limites : par exemple le couple (X,X) n'est pas absolument continu (sa loi est concentrée sur la diagonale). Seule la théorie de la mesure permet une théorie des probabilités totalement unifiée."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : reviens à la définition P(X∈B)=∫_B f_X(x)dx.","Indice niveau 2 : que devient cette intégrale quand B={x0} est réduit à un seul point ?","Indice niveau 3 : l'intégrale sur un singleton est nulle, donc P(X=x0)=0."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis les trois axiomes qui définissent une tribu.","Indice niveau 2 : l'un des axiomes fixe directement un ensemble particulier.","Indice niveau 3 : Ω doit toujours appartenir à la tribu F."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à l'analogue discret P(Y=y|X=x)=p_xy/p_x·.","Indice niveau 2 : remplace chaque probabilité ponctuelle par une densité.","Indice niveau 3 : f_{Y|X=x}(y)=f_{X,Y}(x,y)/f_X(x)."] }
  ]
};

/* =========================== CHAPITRE 3 — Théorèmes limites =========================== */
PROBA_CHAPTERS[probaKey('Théorèmes limites : loi des grands nombres et théorème central limite')] = {
  objectives: [
    "Définir et distinguer les trois modes de convergence : presque sûre, en probabilité, en loi",
    "Énoncer et utiliser la loi forte des grands nombres",
    "Énoncer et appliquer le théorème central limite pour approcher la loi d'une somme de v.a. i.i.d.",
    "Relier ces résultats aux fluctuations d'une moyenne empirique (pile ou face, sondages)",
    "Choisir le bon mode de convergence selon le contexte d'un problème"
  ],
  prereqs: ["Variables aléatoires discrètes", "Variables aléatoires absolument continues et cadre probabiliste général", "Fonction caractéristique"],
  bodyHtml: `
    <p>Ce chapitre présente les deux résultats les plus célèbres — et les plus utiles — de la théorie des probabilités : la <strong>loi des grands nombres</strong> et le <strong>théorème central limite</strong>. Ils gouvernent le comportement asymptotique d'une somme d'un grand nombre de variables aléatoires indépendantes et de même loi (i.i.d.), et sont à la base de toute la statistique inférentielle des chapitres suivants.</p>

    <h3>1. Motivation : une série infinie de pile ou face</h3>
    <p>On considère une pièce non biaisée lancée indéfiniment : $X_k=1$ si on obtient pile au $k$-ième lancer, $0$ sinon. La suite $(X_k)$ est i.i.d. de loi de Bernoulli de paramètre $1/2$. On s'intéresse au comportement, quand $n\\to\\infty$, de la <strong>moyenne empirique</strong> $\\overline{X}_n=\\dfrac{X_1+\\cdots+X_n}{n}$ — la proportion de piles obtenus. L'intuition (et la simulation) suggère que $\\overline{X}_n$ se rapproche de $1/2$, avec des fluctuations qui diminuent en $1/\\sqrt{n}$.</p>

    <h3>2. Convergence presque sûre</h3>
    <p>On dit que $X_n$ converge <strong>presque sûrement</strong> vers $X$, noté $X_n\\xrightarrow{p.s.} X$, si :</p>
    <p>$$P\\Big(\\big\\{\\omega\\in\\Omega\\ ;\\ \\lim_{n\\to+\\infty}X_n(\\omega)=X(\\omega)\\big\\}\\Big)=1$$</p>
    <p>Autrement dit, pour presque toute trajectoire $\\omega$ (à un ensemble de probabilité nulle près), la suite numérique $X_n(\\omega)$ converge vers $X(\\omega)$. C'est le mode de convergence le plus fort parmi les trois présentés ici.</p>

    <h3>3. Convergence en probabilité</h3>
    <p>On dit que $X_n$ converge <strong>en probabilité</strong> vers $X$, noté $X_n\\xrightarrow{P} X$, si pour tout $\\varepsilon>0$ :</p>
    <p>$$\\lim_{n\\to+\\infty} P(|X_n-X|>\\varepsilon)=0$$</p>
    <p>Ici, on ne demande pas que chaque trajectoire converge, mais seulement que la probabilité d'un grand écart devienne négligeable. C'est cette notion que l'inégalité de Bienaymé–Tchebychev (Chapitre 1) permet de contrôler directement.</p>

    <h3>4. Convergence en loi</h3>
    <p>On dit que $X_n$ converge <strong>en loi</strong> vers $X$, noté $X_n\\xrightarrow{\\mathcal{L}} X$, si $F_{X_n}(x)\\to F_X(x)$ en tout point $x$ où $F_X$ est continue. De façon équivalente, en utilisant les fonctions caractéristiques :</p>
    <p>$$X_n\\xrightarrow{\\mathcal{L}} X \\iff \\phi_{X_n}(t)\\to\\phi_X(t)\\ \\text{pour tout }t$$</p>
    <p>C'est le mode de convergence le plus faible : il ne porte que sur les lois, pas sur les variables elles-mêmes (qui peuvent même être définies sur des espaces de probabilité différents).</p>

    <h3>5. Hiérarchie des convergences</h3>
    <div class="key-point">
      <span class="eyebrow">Propriété fondamentale</span>
      $$\\text{Convergence p.s.} \\ \\Longrightarrow\\ \\text{Convergence en probabilité} \\ \\Longrightarrow\\ \\text{Convergence en loi}$$
      Les réciproques sont fausses en général. Cas particulier important : la convergence en loi <strong>vers une constante</strong> équivaut à la convergence en probabilité vers cette même constante — pour une limite déterministe, les notions faible et intermédiaire coïncident.
    </div>
    <table class="mini-table">
      <tr><th>Mode de convergence</th><th>Force</th><th>Porte sur</th></tr>
      <tr><td>Presque sûre</td><td>la plus forte</td><td>les trajectoires $\\omega\\mapsto X_n(\\omega)$</td></tr>
      <tr><td>En probabilité</td><td>intermédiaire</td><td>la probabilité d'un grand écart</td></tr>
      <tr><td>En loi</td><td>la plus faible</td><td>uniquement la loi (fonction de répartition ou caractéristique)</td></tr>
    </table>

    <h3>6. Loi forte des grands nombres (LGN)</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si $(X_i)$ sont des variables aléatoires indépendantes, de même loi, d'espérance $m$ finie, alors :
      $$\\overline{X}_n=\\dfrac{X_1+\\cdots+X_n}{n}\\xrightarrow[n\\to+\\infty]{p.s.} m \\quad\\text{(variable aléatoire constante)}$$
    </div>
    <p>Ce résultat justifie mathématiquement l'interprétation fréquentiste des probabilités : la moyenne empirique d'un échantillon converge vers la vraie moyenne théorique de la population, quand la taille de l'échantillon devient grande. C'est le fondement de la statistique — et de l'estimation par moyenne empirique du Chapitre 5.</p>

    <h3>7. Théorème central limite (TCL)</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si de plus les $X_i$ sont de variance $\\sigma^2$ finie et non nulle, alors :
      $$\\dfrac{X_1+\\cdots+X_n-nm}{\\sqrt{n}\\,\\sigma}\\xrightarrow[n\\to+\\infty]{\\mathcal{L}} Z, \\quad Z\\sim\\mathcal{N}(0,1)$$
    </div>
    <p>Ce résultat remarquable dit que, quelle que soit la loi initiale des $X_i$ (pourvu qu'elle ait une variance finie !), la somme normalisée d'un grand nombre de variables i.i.d. se comporte comme une loi normale standard. C'est l'une des raisons de l'omniprésence de la loi normale en pratique.</p>

    <h3>8. Conséquence pratique : approximation gaussienne</h3>
    <p>Le TCL se réécrit sous forme d'approximation utilisable en pratique :</p>
    <p>$$X_1+\\cdots+X_n \\approx nm+\\sigma\\sqrt{n}\\,Z, \\quad Z\\sim\\mathcal{N}(0,1)$$</p>
    <p>ce que l'on note parfois, en abus de notation, $X_1+\\cdots+X_n \\approx \\mathcal{N}(nm,n\\sigma^2)$. Cette approximation est à la base de nombreux calculs d'intervalles de confiance et de tests statistiques (Chapitres 5 et 6) : elle permet de remplacer une loi souvent inconnue ou compliquée par une loi normale, dont on maîtrise parfaitement les quantiles.</p>

    <h3>9. LGN et TCL : deux échelles complémentaires</h3>
    <p>La LGN décrit <strong>où converge</strong> $\\overline{X}_n$ (vers $m$), tandis que le TCL décrit <strong>à quelle vitesse et avec quelles fluctuations</strong> ($\\overline{X}_n-m$ est de l'ordre de $\\sigma/\\sqrt{n}$, et ces fluctuations, une fois renormalisées par $\\sqrt{n}$, suivent asymptotiquement une loi normale). Les deux résultats sont complémentaires : le premier donne la limite, le second en donne la vitesse et la forme des fluctuations autour de cette limite.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Convergence p.s. : $P(\\{\\omega : X_n(\\omega)\\to X(\\omega)\\})=1$ — la plus forte des trois convergences</li>
        <li>Convergence en probabilité : $P(|X_n-X|>\\varepsilon)\\to 0$ pour tout $\\varepsilon>0$</li>
        <li>Convergence en loi : $F_{X_n}(x)\\to F_X(x)$ (aux points de continuité), équivalent à $\\phi_{X_n}(t)\\to\\phi_X(t)$</li>
        <li>Hiérarchie : p.s. ⇒ en probabilité ⇒ en loi ; les réciproques sont fausses, sauf pour une limite constante (en loi ⇔ en probabilité)</li>
        <li>Loi forte des grands nombres : $\\overline{X}_n \\xrightarrow{p.s.} m=E(X_1)$ pour des $X_i$ i.i.d. intégrables</li>
        <li>Théorème central limite : $\\dfrac{X_1+\\cdots+X_n-nm}{\\sigma\\sqrt{n}} \\xrightarrow{\\mathcal{L}} \\mathcal{N}(0,1)$ si $\\mathrm{Var}(X_1)=\\sigma^2$ finie</li>
        <li>Approximation pratique : $X_1+\\cdots+X_n \\approx \\mathcal{N}(nm,n\\sigma^2)$ pour n grand</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre les trois modes de convergence, et notamment croire que convergence en loi implique convergence en probabilité (c'est faux, sauf vers une constante)</li>
        <li>Appliquer le TCL sans vérifier que la variance des $X_i$ est finie : sans cette hypothèse, le résultat ne s'applique pas</li>
        <li>Oublier de normaliser correctement (diviser par $\\sigma\\sqrt{n}$, pas par $\\sigma$ ou par $n$) avant de comparer à la loi normale standard</li>
        <li>Croire que le TCL dit que les $X_i$ eux-mêmes suivent une loi normale : c'est faux, seule la somme normalisée en devient approximativement une, quelle que soit la loi de départ des $X_i$</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une suite de v.a. i.i.d. de même espérance $m$, la loi forte des grands nombres affirme que $\\overline{X}_n$ converge vers $m$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba3e1" value="wrong"> uniquement en loi</label>
          <label class="option"><input type="radio" name="proba3e1" value="right"> presque sûrement</label>
          <label class="option"><input type="radio" name="proba3e1" value="wrong"> uniquement pour des v.a. gaussiennes</label>
          <label class="option"><input type="radio" name="proba3e1" value="wrong"> uniquement si la variance des $X_i$ est finie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba3e1','proba3fb1','Correct — la loi forte des grands nombres donne une convergence presque sûre, le mode de convergence le plus fort, et ne nécessite que l\\'existence de l\\'espérance (pas de la variance).','Relis l\\'énoncé exact du théorème : quel mode de convergence est utilisé, et quelle est la seule hypothèse nécessaire sur les Xi ?')">Vérifier</button>
        <div class="feedback" id="proba3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le théorème central limite affirme que, pour des $X_i$ i.i.d. de variance $\\sigma^2$ finie, la quantité $\\dfrac{X_1+\\cdots+X_n-nm}{\\sigma\\sqrt{n}}$ converge en loi vers :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba3e2" value="wrong"> la constante $0$</label>
          <label class="option"><input type="radio" name="proba3e2" value="right"> une loi normale $\\mathcal{N}(0,1)$</label>
          <label class="option"><input type="radio" name="proba3e2" value="wrong"> une loi de Bernoulli</label>
          <label class="option"><input type="radio" name="proba3e2" value="wrong"> la même loi que $X_1$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba3e2','proba3fb2','Correct — c\\'est exactement l\\'énoncé du théorème central limite : la somme normalisée converge en loi vers une gaussienne standard, quelle que soit la loi initiale des Xi.','Rappelle-toi la formule du TCL vue dans ce chapitre : vers quelle loi particulière converge cette quantité normalisée ?')">Vérifier</button>
        <div class="feedback" id="proba3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si $X_n$ converge en loi vers une constante $c$, alors on peut affirmer que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba3e3" value="wrong"> $X_n$ converge nécessairement presque sûrement vers $c$</label>
          <label class="option"><input type="radio" name="proba3e3" value="right"> $X_n$ converge aussi en probabilité vers $c$</label>
          <label class="option"><input type="radio" name="proba3e3" value="wrong"> on ne peut rien dire de plus sur $X_n$</label>
          <label class="option"><input type="radio" name="proba3e3" value="wrong"> $X_n$ est égale à $c$ pour $n$ assez grand</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba3e3','proba3fb3','Correct — c\\'est le cas particulier important du cours : convergence en loi vers une constante équivaut à convergence en probabilité vers cette même constante.','Relis le cas particulier mentionné dans le cours sur la hiérarchie des convergences : que se passe-t-il quand la limite est une constante et non une variable aléatoire générale ?')">Vérifier</button>
        <div class="feedback" id="proba3fb3"></div>
      </div>
    </div>
  `
};

PROBA_NOVA_KB[probaKey('Théorèmes limites : loi des grands nombres et théorème central limite')] = {
  intro: "Salut, moi c'est Nova ! On attaque les deux piliers des probabilités : la loi des grands nombres et le théorème central limite, avec les trois modes de convergence (p.s., en probabilité, en loi). Demande-moi la hiérarchie des convergences, l'énoncé du TCL, ou une aide sur les exercices.",
  rules: [
    { test:/convergence presque s[uû]re|p\\.?s\\.?/i, replies:["La convergence presque sûre est la plus forte : P({ω : Xₙ(ω)→X(ω)})=1. Pour presque toute trajectoire, la suite numérique converge vraiment."] },
    { test:/convergence en probabilit[ée]/i, replies:["Xₙ converge en probabilité vers X si pour tout ε>0, P(|Xₙ-X|>ε)→0. C'est plus faible que la convergence p.s., mais plus fort que la convergence en loi."] },
    { test:/convergence en loi/i, replies:["Xₙ converge en loi vers X si F_Xₙ(x)→F_X(x) aux points de continuité, ce qui équivaut à la convergence des fonctions caractéristiques. C'est le mode le plus faible — sauf vers une constante, où il équivaut à la convergence en probabilité."] },
    { test:/hi[ée]rarchie|implique/i, replies:["La hiérarchie est : p.s. ⇒ en probabilité ⇒ en loi. Les réciproques sont fausses en général, sauf pour une limite constante où en loi ⇔ en probabilité."] },
    { test:/loi (forte )?des grands nombres|lgn/i, replies:["La loi forte des grands nombres : si les Xᵢ sont i.i.d. d'espérance m finie, alors la moyenne empirique X̄ₙ converge presque sûrement vers m. C'est le fondement de l'interprétation fréquentiste des probabilités."] },
    { test:/th[ée]or[èe]me central limite|tcl/i, replies:["Le TCL dit que si les Xᵢ sont i.i.d. de variance σ² finie, alors (X₁+...+Xₙ-nm)/(σ√n) converge en loi vers une N(0,1), quelle que soit la loi de départ des Xᵢ (pourvu que la variance soit finie)."] },
    { test:/approximation gaussienne|approxim/i, replies:["En pratique, on écrit X₁+...+Xₙ ≈ N(nm, nσ²) pour n grand : c'est la conséquence directe du TCL, très utilisée pour construire intervalles de confiance et tests statistiques."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : relis l'énoncé exact de la loi forte des grands nombres.","Indice niveau 2 : quel est le mode de convergence annoncé — p.s., en probabilité, ou en loi ?","Indice niveau 3 : c'est une convergence presque sûre, et la seule hypothèse nécessaire est l'existence de l'espérance m."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : rappelle-toi la formule exacte du TCL vue dans ce chapitre.","Indice niveau 2 : la quantité normalisée (somme - nm)/(σ√n) converge en loi vers une loi particulière.","Indice niveau 3 : c'est une loi normale centrée réduite N(0,1)."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense au cas particulier de la hiérarchie des convergences quand la limite est une constante.","Indice niveau 2 : dans ce cas précis, deux modes de convergence deviennent équivalents.","Indice niveau 3 : convergence en loi vers une constante ⇔ convergence en probabilité vers cette même constante."] }
  ]
};

/* =========================== CHAPITRE 4 — Vecteurs gaussiens =========================== */
PROBA_CHAPTERS[probaKey('Vecteurs gaussiens')] = {
  objectives: [
    "Rappeler la loi normale N(m,σ²) : densité et fonction caractéristique",
    "Définir un vecteur gaussien standard puis un vecteur gaussien général comme image affine",
    "Caractériser un vecteur gaussien par ses combinaisons linéaires et par sa densité",
    "Relier indépendance des coordonnées et structure diagonale de la matrice de covariance",
    "Calculer l'espérance conditionnelle dans un vecteur gaussien (formule de conditionnement gaussien)"
  ],
  prereqs: ["Théorèmes limites : loi des grands nombres et théorème central limite", "Algèbre matricielle et déterminants", "Fonction caractéristique"],
  bodyHtml: `
    <p>Les <strong>vecteurs gaussiens</strong> généralisent en dimension quelconque la loi normale, omniprésente en statistique à la suite du théorème central limite. Leur propriété la plus remarquable est que le conditionnement d'un vecteur gaussien reste gaussien, avec des formules explicites — ce qui en fait l'outil de base de toute la statistique paramétrique du Chapitre 5.</p>

    <h3>1. Rappel : la loi normale $\\mathcal{N}(m,\\sigma^2)$</h3>
    <p>Une variable aléatoire réelle $X$ suit la loi normale $\\mathcal{N}(m,\\sigma^2)$ si elle admet la densité :</p>
    <p>$$f(x)=\\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\Big(-\\dfrac{(x-m)^2}{2\\sigma^2}\\Big), \\qquad x\\in\\mathbb{R}$$</p>
    <p>de fonction caractéristique $\\phi(t)=\\exp\\Big(itm-\\dfrac{\\sigma^2 t^2}{2}\\Big)$. Le cas $m=0,\\ \\sigma^2=1$ est la loi normale <strong>standard</strong> ou <strong>centrée réduite</strong>.</p>

    <h3>2. Vecteur gaussien standard</h3>
    <p>$X=(X_1,\\dots,X_n)$ est un <strong>vecteur gaussien standard</strong> en dimension $n$ si les $X_i$ sont indépendantes et suivent chacune une loi $\\mathcal{N}(0,1)$.</p>

    <h3>3. Vecteur gaussien général</h3>
    <p>$X\\in\\mathbb{R}^n$ est un <strong>vecteur gaussien</strong> s'il existe un vecteur gaussien standard $Y\\in\\mathbb{R}^m$, une matrice $M\\in\\mathbb{R}^{n\\times m}$ et un vecteur $\\mu\\in\\mathbb{R}^n$ tels que $X=MY+\\mu$ : autrement dit, $X$ est l'image d'un vecteur gaussien standard par une <strong>transformation affine</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Piège classique</span>
      Chaque coordonnée $X_i$ d'un vecteur gaussien suit bien une loi normale — mais la <strong>réciproque est fausse</strong> en général : avoir des coordonnées individuellement gaussiennes ne suffit pas à faire de $X$ un vecteur gaussien, sauf sous une hypothèse supplémentaire d'indépendance des coordonnées.
    </div>
    <p>Cas particulier utile : <strong>si les $X_i$ sont indépendantes et suivent chacune une loi normale, alors $X=(X_1,\\dots,X_n)$ est un vecteur gaussien</strong>.</p>

    <h3>4. Caractérisation par les combinaisons linéaires</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème (caractérisation)</span>
      $X\\in\\mathbb{R}^n$ est un vecteur gaussien si et seulement si, pour tout $t\\in\\mathbb{R}^n$, la combinaison linéaire $t^\\top X$ suit une loi normale (sur $\\mathbb{R}$).
    </div>
    <p>Cette caractérisation est extrêmement utile en pratique : pour prouver qu'un vecteur est gaussien, il suffit de montrer que toute combinaison linéaire de ses coordonnées est une gaussienne réelle — sans avoir à exhiber explicitement la transformation affine $M$.</p>

    <h3>5. Densité et fonction caractéristique d'un vecteur gaussien</h3>
    <p>Soit $E(X)$ le vecteur des espérances $(E(X_i))_i$ et $\\mathrm{Var}(X)$ la matrice de covariance $(\\mathrm{Cov}(X_i,X_j))_{i,j}$ (symétrique, semi-définie positive).</p>
    <table class="mini-table">
      <tr><th>Cas</th><th>Conséquence</th></tr>
      <tr><td>$\\mathrm{Var}(X)$ non inversible</td><td>$X$ n'est <strong>pas</strong> absolument continu (sa loi est portée par un sous-espace affine de dimension strictement inférieure à $n$)</td></tr>
      <tr><td>$\\mathrm{Var}(X)$ inversible</td><td>$X$ est absolument continu, de densité $f_X(x)=\\dfrac{1}{\\sqrt{(2\\pi)^n\\det(\\mathrm{Var}(X))}}\\exp\\Big(-\\dfrac{1}{2}(x-E(X))^\\top \\mathrm{Var}(X)^{-1}(x-E(X))\\Big)$</td></tr>
    </table>

    <h3>6. Indépendance des coordonnées</h3>
    <div class="key-point">
      <span class="eyebrow">Propriété remarquable</span>
      Pour un vecteur gaussien $X$, les coordonnées $X_i$ sont indépendantes <strong>si et seulement si</strong> $\\mathrm{Var}(X)$ est une matrice diagonale.
    </div>
    <p>C'est une propriété exceptionnelle des vecteurs gaussiens : en général, covariance nulle n'implique pas indépendance (Chapitre 1), mais dans le cadre gaussien, l'absence de corrélation entre coordonnées <strong>équivaut</strong> à leur indépendance mutuelle.</p>

    <h3>7. Théorème central limite multidimensionnel</h3>
    <p>Le théorème central limite du Chapitre 3 se généralise en dimension $d$ : si $(X_i)$ sont des vecteurs aléatoires i.i.d. dans $\\mathbb{R}^d$, d'espérance $m\\in\\mathbb{R}^d$ et de matrice de covariance $\\Sigma$, alors :</p>
    <p>$$\\dfrac{1}{\\sqrt{n}}\\Big(\\sum_{i=1}^n X_i - nm\\Big) \\xrightarrow[n\\to+\\infty]{\\mathcal{L}} Z, \\qquad Z\\ \\text{vecteur gaussien de moyenne } 0 \\text{ et de covariance } \\Sigma$$</p>

    <h3>8. Conditionnement d'un vecteur gaussien</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème (conditionnement gaussien)</span>
      Si $X=(X_1,X_2)$ est un vecteur gaussien tel que $X_1$ est absolument continu, alors :
      $$E(X_2\\mid X_1)=E(X_2)+\\mathrm{Cov}(X_2,X_1)\\,\\mathrm{Var}(X_1)^{-1}(X_1-E(X_1))$$
      De plus, $E(X_2\\mid X_1)$ est lui-même un vecteur gaussien, d'espérance $E(X_2)$ et de matrice de covariance $\\mathrm{Cov}(X_2,X_1)\\,\\mathrm{Var}(X_1)^{-1}\\,\\mathrm{Cov}(X_1,X_2)$.
    </div>
    <p>Ce résultat est remarquable : l'espérance conditionnelle, difficile à calculer explicitement en général (cf. limitations du Chapitre 2), devient une <strong>fonction affine explicite</strong> dans le cadre gaussien. C'est la base théorique de la régression linéaire.</p>

    <h3>9. Corollaire d'additivité conditionnelle</h3>
    <p>Si $(X_1,X_2,X_3)$ est un vecteur gaussien tel que $E(X_1)=0$ et que $X_2$, $X_3$ sont indépendants et absolument continus, alors les contributions se somment :</p>
    <p>$$E(X_1\\mid X_2,X_3)=E(X_1\\mid X_2)+E(X_1\\mid X_3)$$</p>
    <p>Ce corollaire illustre la richesse structurelle des vecteurs gaussiens : sous des hypothèses d'indépendance adéquates, l'information apportée par plusieurs variables se combine simplement par addition.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$X$ est un vecteur gaussien standard si ses coordonnées sont i.i.d. $\\mathcal{N}(0,1)$ ; $X$ est un vecteur gaussien si $X=MY+\\mu$ avec $Y$ standard</li>
        <li>Caractérisation clé : $X$ est gaussien ssi $t^\\top X$ suit une loi normale pour tout $t\\in\\mathbb{R}^n$</li>
        <li>Coordonnées individuellement gaussiennes n'implique pas vecteur gaussien (sauf indépendance)</li>
        <li>Densité (si $\\mathrm{Var}(X)$ inversible) : $f_X(x)\\propto \\exp\\big(-\\tfrac12(x-E(X))^\\top\\mathrm{Var}(X)^{-1}(x-E(X))\\big)$</li>
        <li>Pour un vecteur gaussien : indépendance des coordonnées ⟺ matrice de covariance diagonale</li>
        <li>Conditionnement gaussien : $E(X_2\\mid X_1)=E(X_2)+\\mathrm{Cov}(X_2,X_1)\\mathrm{Var}(X_1)^{-1}(X_1-E(X_1))$, résultat lui-même gaussien</li>
        <li>TCL multidimensionnel : la somme normalisée de vecteurs i.i.d. converge en loi vers un vecteur gaussien de covariance $\\Sigma$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un vecteur dont chaque coordonnée est gaussienne est automatiquement un vecteur gaussien — c'est faux sans hypothèse d'indépendance ou de structure affine commune</li>
        <li>Utiliser la formule de la densité gaussienne alors que $\\mathrm{Var}(X)$ n'est pas inversible : dans ce cas, le vecteur n'est pas absolument continu et la formule ne s'applique pas</li>
        <li>Confondre « covariance nulle » (résultat général : n'implique pas indépendance) et « covariance nulle pour un couple gaussien » (implique bien l'indépendance, cas particulier)</li>
        <li>Oublier que $E(X_2\\mid X_1)$ dans le cadre gaussien est lui-même une variable aléatoire gaussienne, et pas seulement une formule numérique ponctuelle</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour un vecteur gaussien $X=(X_1,X_2)$, les coordonnées $X_1$ et $X_2$ sont indépendantes si et seulement si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba4e1" value="wrong"> $E(X_1)=E(X_2)$</label>
          <label class="option"><input type="radio" name="proba4e1" value="right"> $\\mathrm{Cov}(X_1,X_2)=0$</label>
          <label class="option"><input type="radio" name="proba4e1" value="wrong"> $\\mathrm{Var}(X_1)=\\mathrm{Var}(X_2)$</label>
          <label class="option"><input type="radio" name="proba4e1" value="wrong"> $X_1$ et $X_2$ ont la même loi</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba4e1','proba4fb1','Correct — c\\'est une propriété exceptionnelle des vecteurs gaussiens : contrairement au cas général, covariance nulle équivaut ici à indépendance.','Repense à la propriété remarquable du cours : pour un vecteur gaussien, la structure diagonale de la matrice de covariance équivaut à quelle propriété ?')">Vérifier</button>
        <div class="feedback" id="proba4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un vecteur $X\\in\\mathbb{R}^n$ est un vecteur gaussien si et seulement si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba4e2" value="wrong"> chacune de ses coordonnées suit une loi normale</label>
          <label class="option"><input type="radio" name="proba4e2" value="right"> pour tout $t\\in\\mathbb{R}^n$, $t^\\top X$ suit une loi normale</label>
          <label class="option"><input type="radio" name="proba4e2" value="wrong"> sa matrice de covariance est l'identité</label>
          <label class="option"><input type="radio" name="proba4e2" value="wrong"> son espérance est nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba4e2','proba4fb2','Correct — c\\'est la caractérisation la plus utile en pratique : toute combinaison linéaire des coordonnées doit être gaussienne, pas seulement chaque coordonnée isolément.','Attention au piège classique du cours : avoir des coordonnées individuellement gaussiennes ne suffit pas. Quelle est la vraie caractérisation par combinaisons linéaires ?')">Vérifier</button>
        <div class="feedback" id="proba4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si $X=(X_1,X_2)$ est un vecteur gaussien et $X_1$ absolument continu, alors $E(X_2\\mid X_1)$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba4e3" value="wrong"> toujours égal à $E(X_2)$</label>
          <label class="option"><input type="radio" name="proba4e3" value="right"> une fonction affine de $X_1$, elle-même gaussienne</label>
          <label class="option"><input type="radio" name="proba4e3" value="wrong"> impossible à calculer explicitement</label>
          <label class="option"><input type="radio" name="proba4e3" value="wrong"> égal à $\\mathrm{Cov}(X_1,X_2)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba4e3','proba4fb3','Correct — c\\'est tout l\\'intérêt du conditionnement gaussien : E(X2|X1)=E(X2)+Cov(X2,X1)Var(X1)⁻¹(X1-E(X1)), une formule affine explicite et un résultat lui-même gaussien.','Relis la formule de conditionnement gaussien du cours : quelle forme prend E(X2|X1) en fonction de X1 ?')">Vérifier</button>
        <div class="feedback" id="proba4fb3"></div>
      </div>
    </div>
  `
};

PROBA_NOVA_KB[probaKey('Vecteurs gaussiens')] = {
  intro: "Salut, moi c'est Nova ! On explore les vecteurs gaussiens : caractérisation par combinaisons linéaires, indépendance et matrice de covariance diagonale, conditionnement gaussien. Demande-moi la différence entre coordonnées gaussiennes et vecteur gaussien, ou la formule de conditionnement.",
  rules: [
    { test:/vecteur gaussien standard/i, replies:["Un vecteur gaussien standard a des coordonnées i.i.d. de loi N(0,1). Un vecteur gaussien général X=MY+μ est l'image affine d'un vecteur gaussien standard Y."] },
    { test:/caract[ée]risation|combinaison lin[ée]aire/i, replies:["X est un vecteur gaussien ssi, pour tout t∈Rⁿ, la combinaison linéaire t^⊤X suit une loi normale sur R. C'est le test le plus pratique pour prouver qu'un vecteur est gaussien."] },
    { test:/coordonn[ée]es.*gaussien|chaque coordonn/i, replies:["Attention : chaque coordonnée d'un vecteur gaussien suit bien une loi normale, mais la réciproque est fausse — avoir des coordonnées individuellement gaussiennes ne suffit pas, sauf si elles sont indépendantes."] },
    { test:/matrice de covariance|var\\(x\\)/i, replies:["Pour un vecteur gaussien, la matrice de covariance Var(X) est diagonale si et seulement si les coordonnées sont indépendantes — une propriété remarquable, fausse en général hors du cadre gaussien."] },
    { test:/conditionnement gaussien|E\\(X2\\|X1\\)/i, replies:["Le conditionnement gaussien donne E(X2|X1)=E(X2)+Cov(X2,X1)Var(X1)⁻¹(X1-E(X1)), et ce résultat est lui-même un vecteur gaussien. C'est la base théorique de la régression linéaire."] },
    { test:/densit[ée].*gaussien|inversible/i, replies:["Si Var(X) est inversible, X est absolument continu avec une densité explicite en exp(-½(x-E(X))^⊤Var(X)⁻¹(x-E(X))). Si Var(X) n'est pas inversible, X n'est pas absolument continu."] },
    { test:/tcl.*dimension|multidimensionnel/i, replies:["Le TCL se généralise en dimension d : la somme normalisée de vecteurs i.i.d. converge en loi vers un vecteur gaussien de covariance Σ, la matrice de covariance commune des Xᵢ."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la propriété remarquable des vecteurs gaussiens sur l'indépendance.","Indice niveau 2 : elle relie indépendance des coordonnées à la structure de la matrice de covariance.","Indice niveau 3 : Cov(X1,X2)=0 équivaut à l'indépendance, uniquement dans le cadre gaussien."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : méfie-toi du piège classique — coordonnées gaussiennes ne suffit pas.","Indice niveau 2 : la vraie caractérisation porte sur toutes les combinaisons linéaires possibles.","Indice niveau 3 : X est gaussien ssi t^⊤X est une gaussienne réelle, pour tout t∈Rⁿ."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : rappelle-toi la formule de conditionnement gaussien vue dans le cours.","Indice niveau 2 : E(X2|X1) s'exprime comme une fonction affine de X1.","Indice niveau 3 : E(X2|X1)=E(X2)+Cov(X2,X1)Var(X1)⁻¹(X1-E(X1)), et c'est un vecteur gaussien."] }
  ]
};

/* =========================== CHAPITRE 5 — Estimation paramétrique =========================== */
PROBA_CHAPTERS[probaKey('Estimation paramétrique')] = {
  objectives: [
    "Définir un modèle paramétrique, un échantillon et un estimateur",
    "Distinguer estimateur sans biais, asymptotiquement sans biais et convergent",
    "Construire l'estimateur du maximum de vraisemblance et interpréter la fonction de vraisemblance",
    "Calculer l'information de Fisher et appliquer la borne de Fréchet-Darmois-Cramér-Rao",
    "Construire une région (ou un intervalle) de confiance pour un paramètre"
  ],
  prereqs: ["Vecteurs gaussiens", "Théorèmes limites : loi des grands nombres et théorème central limite"],
  bodyHtml: `
    <p>Nous abordons maintenant la <strong>statistique inférentielle</strong> : à partir d'observations, on cherche à estimer un paramètre inconnu qui caractérise la loi de la population. Ce chapitre construit les outils fondamentaux — vraisemblance, information de Fisher, efficacité — qui permettront ensuite, au Chapitre 6, de tester des hypothèses sur ce paramètre.</p>

    <h3>1. Modèle paramétrique et échantillon</h3>
    <p>On suppose que la loi $P$ qui gouverne les observations appartient à une famille $\\{P_\\theta\\ ;\\ \\theta\\in\\Theta\\}$, et qu'il existe un unique $\\theta^*\\in\\Theta$ (le « vrai » paramètre) tel que $P=P_{\\theta^*}$. Chaque $P_\\theta$ est soit discrète de loi $p_\\theta$, soit absolument continue de densité $f_\\theta$ ; dans les deux cas on note $p(\\cdot\\,;\\theta)$ la loi (discrète ou continue) de $P_\\theta$.</p>
    <p>Un <strong>échantillon de taille $n$</strong> est un $n$-uplet $(X_1,\\dots,X_n)$ de variables aléatoires indépendantes, toutes de loi $P_\\theta$.</p>

    <h3>2. Estimateur</h3>
    <p>Un <strong>estimateur</strong> de $\\theta$ est une variable aléatoire $\\widehat{\\theta}_n=f(X_1,\\dots,X_n)$ à valeurs dans $\\Theta$, construite uniquement à partir des observations (elle ne dépend pas de la valeur inconnue de $\\theta$). Trois qualités souhaitables :</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Définition</th></tr>
      <tr><td>Sans biais</td><td>$E_\\theta(\\widehat{\\theta}_n)=\\theta$ pour tout $\\theta$</td></tr>
      <tr><td>Asymptotiquement sans biais</td><td>$\\lim_{n\\to+\\infty} E_\\theta(\\widehat{\\theta}_n)=\\theta$</td></tr>
      <tr><td>Convergent (p.s.)</td><td>$\\widehat{\\theta}_n \\xrightarrow{p.s.} \\theta$ quand $n\\to+\\infty$</td></tr>
    </table>

    <h3>3. Un premier estimateur : la moyenne empirique</h3>
    <p>L'estimateur le plus simple de l'espérance $E_\\theta(X)$ est la <strong>moyenne empirique</strong> $\\overline{X}_n=\\dfrac{1}{n}\\sum_{k=1}^n X_k$, qui vérifie $E_\\theta(\\overline{X}_n)=E_\\theta(X)$ (sans biais) et $\\mathrm{Var}_\\theta(\\overline{X}_n)=\\dfrac{\\mathrm{Var}_\\theta(X)}{n}$ (convergente d'après la LGN du Chapitre 3).</p>

    <h3>4. Vraisemblance</h3>
    <p>La <strong>vraisemblance</strong> $L(\\theta;x)=p_n(x;\\theta)$ met l'accent sur le fait que ce sont les observations $x$ qui sont fixées, tandis que le paramètre $\\theta$ varie. Pour un échantillon $\\vec{x}=(x_1,\\dots,x_n)$ i.i.d. :</p>
    <p>$$L(\\theta;\\vec{x})=\\prod_{k=1}^n p(x_k;\\theta), \\qquad p(x_k;\\theta)=\\begin{cases}P_\\theta(X=x_k) & \\text{si }X\\text{ discrète}\\\\ f_\\theta(x_k) & \\text{si }X\\text{ absolument continue}\\end{cases}$$</p>
    <p><strong>Estimateur du maximum de vraisemblance (EMV)</strong> : $\\widehat{\\theta}_n=\\arg\\max_{\\theta\\in\\Theta} L(\\theta;X_n)$ — le paramètre qui rend les observations les plus « vraisemblables ». En pratique, on maximise souvent $\\ln L(\\theta,\\vec{x})$ (log-vraisemblance), qui a les mêmes variations que $L$ mais se dérive plus facilement (les produits deviennent des sommes).</p>

    <h3>5. Rappels de conditionnement utiles pour la suite</h3>
    <ul>
      <li><strong>Espérance totale</strong> : si $Y$ admet une espérance, $E(Y\\mid X)$ aussi, et $E(E(Y\\mid X))=E(Y)$</li>
      <li><strong>Propriété</strong> : $E(\\psi(X)Y\\mid X)=\\psi(X)E(Y\\mid X)$ pour toute fonction $\\psi$</li>
      <li><strong>Cas gaussien</strong> : si $Z=(Z_1,Z_2)$ est un vecteur gaussien avec $Z_1$ absolument continu, $E(Z_2\\mid Z_1)=E(Z_2)+\\mathrm{Cov}(Z_2,Z_1)\\mathrm{Var}(Z_1)^{-1}(Z_1-E(Z_1))$</li>
    </ul>

    <h3>6. Information de Fisher</h3>
    <p>Sous des conditions de régularité (permutation dérivation/intégration licite), on définit l'<strong>information de Fisher</strong> :</p>
    <p>$$I(\\theta)=\\mathrm{Var}_\\theta\\big(\\partial_\\theta \\ln p(X_1;\\theta)\\big)$$</p>
    <p>et, si le modèle est régulier, une formule équivalente souvent plus simple à calculer :</p>
    <p>$$I(\\theta)=-E_\\theta\\big(\\partial_\\theta^2 \\ln p(X_1;\\theta)\\big)$$</p>
    <p>$I(\\theta)$ quantifie la quantité d'information que porte <strong>une seule observation</strong> sur le paramètre $\\theta$ : plus $I(\\theta)$ est grand, plus il est facile d'estimer $\\theta$ précisément.</p>

    <h3>7. Convergence de l'estimateur du maximum de vraisemblance</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si le modèle est régulier, l'estimateur du maximum de vraisemblance est convergent en loi.
    </div>

    <h3>8. Borne de Fréchet–Darmois–Cramér–Rao</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème (borne FDCR)</span>
      Si le modèle est régulier et $I(\\theta)>0$, alors pour tout estimateur sans biais $\\widehat{\\theta}_n$ de $\\theta$ :
      $$\\mathrm{Var}_\\theta(\\widehat{\\theta}_n)\\ \\geq\\ \\dfrac{1}{n\\,I(\\theta)}$$
    </div>
    <p>Cette borne fixe une limite <strong>incontournable</strong> à la précision de n'importe quel estimateur sans biais : on ne peut pas faire « mieux » que $1/(nI(\\theta))$, quelle que soit l'astuce utilisée pour construire l'estimateur.</p>

    <h3>9. Estimateur efficace</h3>
    <p>Un estimateur $\\widehat{\\theta}_n$ sans biais est dit <strong>efficace</strong> s'il atteint exactement la borne FDCR : $\\mathrm{Var}_\\theta(\\widehat{\\theta}_n)=\\dfrac{1}{nI(\\theta)}$ (ou <strong>asymptotiquement efficace</strong> si $\\lim_{n\\to+\\infty} n\\,\\mathrm{Var}_\\theta(\\widehat{\\theta}_n)=\\dfrac{1}{I(\\theta)}$).</p>

    <h3>10. Normalité asymptotique de l'EMV</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si le modèle est identifiable et régulier, l'estimateur du maximum de vraisemblance est asymptotiquement normal : pour tout $\\theta$, sous $P_\\theta$,
      $$\\sqrt{n}\\,(\\widehat{\\theta}_n-\\theta) \\xrightarrow{\\mathcal{L}} X, \\qquad X\\sim\\mathcal{N}\\Big(0,\\dfrac{1}{I(\\theta)}\\Big)$$
    </div>
    <p>Autrement dit, l'EMV est <strong>asymptotiquement efficace</strong> : sa variance se rapproche de la borne FDCR quand $n$ devient grand. C'est l'une des raisons principales de la popularité de l'estimation par maximum de vraisemblance en pratique.</p>

    <h3>11. Régions et intervalles de confiance</h3>
    <p>Pour $\\alpha\\in[0,1]$, $\\Lambda_\\alpha$ est une <strong>région de confiance de niveau $1-\\alpha$</strong> si $P_\\theta(\\theta\\in\\Lambda_\\alpha)\\geq 1-\\alpha$ pour tout $\\theta$. Exemple fondamental : pour un échantillon $\\mathcal{N}(\\theta,\\sigma^2)$ avec $\\sigma$ connu, l'intervalle bilatéral symétrique de niveau $1-\\alpha$ est :</p>
    <p>$$\\Big[\\overline{X}_n-\\dfrac{\\sigma}{\\sqrt{n}}F^{-1}(1-\\alpha/2),\\ \\overline{X}_n+\\dfrac{\\sigma}{\\sqrt{n}}F^{-1}(1-\\alpha/2)\\Big]$$</p>
    <p>où $F$ est la fonction de répartition de $\\mathcal{N}(0,1)$. Cette construction repose directement sur la loi (approchée par le TCL, ou exacte dans le cas gaussien) de $\\overline{X}_n$.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Échantillon : $(X_1,\\dots,X_n)$ i.i.d. de loi $P_\\theta$ ; estimateur $\\widehat{\\theta}_n=f(X_1,\\dots,X_n)$, sans biais si $E_\\theta(\\widehat{\\theta}_n)=\\theta$</li>
        <li>Vraisemblance $L(\\theta;\\vec x)=\\prod_k p(x_k;\\theta)$ ; EMV = $\\arg\\max_\\theta L(\\theta;X_n)$, souvent via $\\ln L$</li>
        <li>Information de Fisher : $I(\\theta)=\\mathrm{Var}_\\theta(\\partial_\\theta\\ln p(X_1;\\theta))=-E_\\theta(\\partial_\\theta^2\\ln p(X_1;\\theta))$</li>
        <li>Borne de Fréchet-Darmois-Cramér-Rao : $\\mathrm{Var}_\\theta(\\widehat{\\theta}_n)\\geq 1/(nI(\\theta))$ pour tout estimateur sans biais</li>
        <li>Estimateur efficace : atteint exactement cette borne ; l'EMV est asymptotiquement efficace</li>
        <li>Normalité asymptotique de l'EMV : $\\sqrt{n}(\\widehat{\\theta}_n-\\theta)\\xrightarrow{\\mathcal{L}}\\mathcal{N}(0,1/I(\\theta))$</li>
        <li>Région de confiance de niveau $1-\\alpha$ : $P_\\theta(\\theta\\in\\Lambda_\\alpha)\\geq 1-\\alpha$ pour tout $\\theta$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre la vraisemblance $L(\\theta;x)$ (fonction de $\\theta$, $x$ fixé) avec la densité $f_\\theta(x)$ (fonction de $x$, $\\theta$ fixé) : c'est la même formule, mais le rôle des variables est inversé</li>
        <li>Oublier que la borne FDCR ne s'applique qu'aux estimateurs <strong>sans biais</strong> : un estimateur biaisé peut avoir une variance plus faible sans violer le théorème</li>
        <li>Croire qu'un estimateur convergent est automatiquement sans biais, ou inversement : ce sont deux propriétés indépendantes</li>
        <li>Utiliser $I(\\theta)=-E_\\theta(\\partial_\\theta^2\\ln p(X_1;\\theta))$ sans vérifier la régularité du modèle : cette égalité n'est valable que sous cette hypothèse</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La vraisemblance $L(\\theta;\\vec{x})$ pour un échantillon i.i.d. est considérée comme une fonction :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba5e1" value="wrong"> des observations $\\vec{x}$, à $\\theta$ fixé</label>
          <label class="option"><input type="radio" name="proba5e1" value="right"> du paramètre $\\theta$, les observations $\\vec{x}$ étant fixées</label>
          <label class="option"><input type="radio" name="proba5e1" value="wrong"> de $n$ uniquement</label>
          <label class="option"><input type="radio" name="proba5e1" value="wrong"> de l'information de Fisher</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba5e1','proba5fb1','Correct — c\\'est exactement la définition : on fixe les observations réellement obtenues, et on regarde comment L varie quand on fait varier θ.','Relis la définition de la vraisemblance : quelle quantité est fixée, et laquelle varie, quand on parle de L(θ;x) ?')">Vérifier</button>
        <div class="feedback" id="proba5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La borne de Fréchet-Darmois-Cramér-Rao affirme que, pour tout estimateur sans biais $\\widehat{\\theta}_n$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba5e2" value="wrong"> $\\mathrm{Var}_\\theta(\\widehat{\\theta}_n) \\leq 1/(nI(\\theta))$</label>
          <label class="option"><input type="radio" name="proba5e2" value="right"> $\\mathrm{Var}_\\theta(\\widehat{\\theta}_n) \\geq 1/(nI(\\theta))$</label>
          <label class="option"><input type="radio" name="proba5e2" value="wrong"> $\\mathrm{Var}_\\theta(\\widehat{\\theta}_n) = I(\\theta)$</label>
          <label class="option"><input type="radio" name="proba5e2" value="wrong"> $E_\\theta(\\widehat{\\theta}_n) \\geq 1/(nI(\\theta))$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba5e2','proba5fb2','Correct — cette borne inférieure fixe une limite incontournable à la précision de tout estimateur sans biais : on ne peut jamais faire mieux que 1/(nI(θ)).','Relis le nom du théorème : « borne » suggère une inégalité, mais dans quel sens ? On ne peut pas faire mieux que...')">Vérifier</button>
        <div class="feedback" id="proba5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sous des conditions de régularité, l'estimateur du maximum de vraisemblance vérifie, quand $n\\to+\\infty$ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba5e3" value="wrong"> $\\widehat{\\theta}_n$ reste toujours biaisé</label>
          <label class="option"><input type="radio" name="proba5e3" value="right"> $\\sqrt{n}(\\widehat{\\theta}_n-\\theta)$ converge en loi vers $\\mathcal{N}(0,1/I(\\theta))$</label>
          <label class="option"><input type="radio" name="proba5e3" value="wrong"> $\\widehat{\\theta}_n$ diverge presque sûrement</label>
          <label class="option"><input type="radio" name="proba5e3" value="wrong"> $\\mathrm{Var}_\\theta(\\widehat{\\theta}_n)$ tend vers l'infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba5e3','proba5fb3','Correct — c\\'est le théorème de normalité asymptotique de l\\'EMV : il est asymptotiquement efficace, sa variance se rapproche de la borne FDCR quand n grandit.','Rappelle-toi le théorème de normalité asymptotique de l\\'EMV vu dans ce chapitre : vers quelle loi converge la quantité renormalisée √n(θ̂ₙ-θ) ?')">Vérifier</button>
        <div class="feedback" id="proba5fb3"></div>
      </div>
    </div>
  `
};

PROBA_NOVA_KB[probaKey('Estimation paramétrique')] = {
  intro: "Salut, moi c'est Nova ! On entre dans l'estimation paramétrique : vraisemblance, information de Fisher, borne de Cramér-Rao et intervalles de confiance. Demande-moi la différence entre vraisemblance et densité, ou pourquoi l'EMV est intéressant asymptotiquement.",
  rules: [
    { test:/vraisemblance/i, replies:["La vraisemblance L(θ;x)=p_n(x;θ) est la même formule que la densité (ou la loi discrète), mais vue comme fonction de θ, les observations x étant fixées. L'EMV maximise cette fonction."] },
    { test:/maximum de vraisemblance|emv/i, replies:["L'estimateur du maximum de vraisemblance θ̂ₙ = argmax L(θ;Xₙ). En pratique on maximise souvent ln L (log-vraisemblance) car les produits deviennent des sommes, plus faciles à dériver."] },
    { test:/information de fisher/i, replies:["L'information de Fisher I(θ)=Var_θ(∂_θ ln p(X1;θ)), aussi égale à -E_θ(∂²_θ ln p(X1;θ)) sous régularité, mesure combien une seule observation informe sur θ."] },
    { test:/cram[ée]r.?rao|fr[ée]chet.?darmois|borne fdcr/i, replies:["La borne de Fréchet-Darmois-Cramér-Rao dit que pour tout estimateur sans biais, Var_θ(θ̂ₙ) ≥ 1/(nI(θ)). C'est une limite infranchissable, valable seulement pour les estimateurs sans biais."] },
    { test:/estimateur efficace|efficacit[ée]/i, replies:["Un estimateur sans biais est efficace s'il atteint exactement la borne FDCR : Var_θ(θ̂ₙ)=1/(nI(θ)). L'EMV est asymptotiquement efficace, sans forcément l'être à taille finie."] },
    { test:/sans biais|biais[ée]/i, replies:["Un estimateur est sans biais si E_θ(θ̂ₙ)=θ pour tout θ, et asymptotiquement sans biais si seule la limite en n vaut θ. Ce sont deux notions distinctes de la convergence presque sûre."] },
    { test:/intervalle de confiance|r[ée]gion de confiance/i, replies:["Λ_α est une région de confiance de niveau 1-α si P_θ(θ∈Λ_α) ≥ 1-α pour tout θ. Pour une gaussienne de variance connue, l'intervalle bilatéral symétrique utilise les quantiles de la loi normale standard."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : relis bien la définition de la vraisemblance.","Indice niveau 2 : dans L(θ;x), une des deux quantités est fixée et l'autre varie.","Indice niveau 3 : ce sont les observations x qui sont fixées, et θ qui varie."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au sens de l'inégalité dans une « borne » de variance.","Indice niveau 2 : la borne FDCR donne une limite qu'on ne peut jamais franchir vers le bas.","Indice niveau 3 : Var_θ(θ̂ₙ) ≥ 1/(nI(θ)), jamais l'inverse."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : rappelle-toi le théorème de normalité asymptotique de l'EMV.","Indice niveau 2 : la quantité renormalisée √n(θ̂ₙ-θ) converge en loi.","Indice niveau 3 : elle converge vers une loi N(0,1/I(θ))."] }
  ]
};

/* =========================== CHAPITRE 6 — Tests d'hypothèses =========================== */
PROBA_CHAPTERS[probaKey('Tests d\'hypothèses')] = {
  objectives: [
    "Formuler une hypothèse nulle et une hypothèse alternative, simples ou composites, uni- ou bilatérales",
    "Définir statistique de test, région critique, risques de première et deuxième espèce",
    "Construire le test de Neyman-Pearson et interpréter la notion de puissance d'un test",
    "Reconnaître les lois du χ², de Student et de Fisher-Snedecor et leur rôle dans les tests usuels",
    "Choisir la bonne statistique de test pour tester une moyenne ou une variance gaussienne"
  ],
  prereqs: ["Estimation paramétrique", "Vecteurs gaussiens"],
  bodyHtml: `
    <p>Les <strong>tests statistiques</strong> permettent de trancher, à partir d'un échantillon, si une hypothèse portant sur la population est compatible avec les données observées. Ce dernier chapitre articule tout ce qui précède — vraisemblance, information de Fisher, lois gaussiennes — pour construire une théorie de la décision statistique rigoureuse.</p>

    <h3>1. Cadre général : hypothèse nulle et alternative</h3>
    <p>On considère un modèle paramétrique $\\{P_\\theta\\ ;\\ \\theta\\in\\Theta\\}$ et deux sous-ensembles disjoints $\\Theta_0$ et $\\Theta_1$ de $\\Theta$. Une hypothèse $H$ portant sur le vrai paramètre $\\theta^*$ se traduit par deux propositions contradictoires :</p>
    <table class="mini-table">
      <tr><th>Hypothèse</th><th>Notation</th><th>Type</th></tr>
      <tr><td>Hypothèse nulle $H_0$</td><td>$\\theta^*\\in\\Theta_0$</td><td><strong>simple</strong> si $\\Theta_0=\\{\\theta_0\\}$, <strong>composite</strong> sinon</td></tr>
      <tr><td>Hypothèse alternative $H_1$</td><td>$\\theta^*\\in\\Theta_1$</td><td>si $H_0:\\theta^*=\\theta_0$, $H_1$ peut être $\\theta^*\\neq\\theta_0$ (<strong>bilatéral</strong>) ou $\\theta^*>\\theta_0$ / $\\theta^*<\\theta_0$ (<strong>unilatéral</strong>)</td></tr>
    </table>

    <h3>2. Statistique de test et région critique</h3>
    <p>On utilise un échantillon $X_n=(X_1,\\dots,X_n)$ et une <strong>statistique de test</strong> $T_n=f(X_n)$ (par exemple $\\overline{X}_n$) dont la loi sous $H_0$ est parfaitement connue. Notons que $T_n$ n'est jamais unique — un même problème peut se traiter avec plusieurs statistiques de test différentes.</p>
    <p>On fixe $\\alpha\\in\\,]0,1[\\,$ (souvent $0{,}05$ ou $0{,}01$) et l'on détermine $\\Lambda$ (souvent une union d'intervalles) tel que $\\alpha=P_{\\theta_0}(\\text{rejeter } H_0)=P_{\\theta_0}(T_n\\in\\Lambda)$. L'ensemble $W=\\{x\\in\\mathbb{R}^n\\ ;\\ T_n(x)\\in\\Lambda\\}$ est la <strong>région critique</strong> : on rejette $H_0$ si et seulement si l'observation tombe dans $W$.</p>

    <h3>3. Risques d'erreur</h3>
    <table class="mini-table">
      <tr><th>Risque</th><th>Définition</th><th>Nature</th></tr>
      <tr><td>$\\alpha$ (1ère espèce)</td><td>$\\alpha=P_{H_0}(\\text{rejeter } H_0)$ — pour un test composite : $\\alpha=\\sup_{\\theta\\in\\Theta_0} P_\\theta(\\text{rejeter } H_0)$</td><td><strong>contrôlé</strong>, fixé à l'avance</td></tr>
      <tr><td>$\\beta$ (2ème espèce)</td><td>$\\beta=P_{H_1}(\\text{accepter } H_0)$</td><td><strong>non contrôlé</strong>, dépend du test choisi</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le risque $\\alpha$ (rejeter à tort une hypothèse vraie) est celui qu'on choisit et maîtrise directement. Le risque $\\beta$ (accepter à tort une hypothèse fausse) n'est en revanche jamais fixé à l'avance : il dépend du test utilisé et de la « vraie » valeur du paramètre sous $H_1$.
    </div>

    <h3>4. Puissance d'un test et test de Neyman-Pearson</h3>
    <p>Pour $\\theta\\in\\Theta_1$, on définit la <strong>puissance</strong> du test $\\eta(\\theta)=1-\\beta(\\theta)$ : c'est la probabilité de rejeter $H_0$ à raison, quand $\\theta$ est réellement la vraie valeur sous $H_1$.</p>
    <div class="key-point">
      <span class="eyebrow">Théorème (lemme de Neyman-Pearson)</span>
      Si $H_0:\\theta^*=\\theta_0$ et $H_1:\\theta^*=\\theta_1$, le test de plus grande puissance parmi les tests de risque de première espèce $\\alpha$ est le <strong>test de Neyman-Pearson</strong>, qui consiste à rejeter $H_0$ si et seulement si :
      $$\\dfrac{L(\\theta_1,X_n)}{L(\\theta_0,X_n)} > \\kappa_\\alpha, \\qquad \\text{où } \\kappa_\\alpha \\text{ est déterminé par } P_{\\theta_0}(\\text{rejeter } H_0)=\\alpha$$
    </div>
    <p>Ce théorème donne une réponse théorique optimale au problème du choix de statistique de test : pour discriminer entre deux hypothèses simples, aucun test de même risque $\\alpha$ n'a une puissance plus grande que le rapport de vraisemblance.</p>

    <h3>5. Loi du $\\chi^2$</h3>
    <p>La <strong>loi du $\\chi^2$ à $n$ degrés de liberté</strong> a pour densité $x\\mapsto \\dfrac{1}{2^{n/2}\\Gamma(n/2)}x^{n/2-1}e^{-x/2}\\mathbf{1}_{\\{x>0\\}}$ (c'est aussi la loi Gamma de paramètres $n/2$ et $1/2$).</p>
    <div class="key-point">
      <span class="eyebrow">Propriété</span>
      Si $X_1,\\dots,X_n$ sont des v.a. indépendantes de loi $\\mathcal{N}(m,\\sigma^2)$, alors $\\displaystyle\\sum_{k=1}^n \\Big(\\dfrac{X_k-m}{\\sigma}\\Big)^2$ suit la loi du $\\chi^2$ à $n$ degrés de liberté.
    </div>

    <h3>6. Loi de Student</h3>
    <p>La <strong>loi de Student à $n$ degrés de liberté</strong> a pour densité $x\\mapsto \\dfrac{1}{\\sqrt{n\\pi}}\\dfrac{\\Gamma(\\tfrac{n+1}{2})}{\\Gamma(\\tfrac{n}{2})}\\Big(1+\\dfrac{x^2}{n}\\Big)^{-\\frac{n+1}{2}}$. C'est la loi de $\\dfrac{X}{\\sqrt{Z_n/n}}$ où $X\\sim\\mathcal{N}(0,1)$ est indépendante de $Z_n$ qui suit une loi du $\\chi^2$ à $n$ degrés de liberté.</p>

    <h3>7. Loi de Fisher-Snedecor</h3>
    <p>La <strong>loi de Fisher-Snedecor $F(p,q)$</strong> a pour densité $x\\mapsto \\dfrac{\\big(\\frac{px}{px+q}\\big)^{p/2}\\big(1-\\frac{px}{px+q}\\big)^{q/2}}{x\\,B(p/2,q/2)}\\mathbf{1}_{\\{x>0\\}}$. C'est la loi de $\\dfrac{Z_p/p}{Z_q/q}$ où $Z_p$ et $Z_q$ sont indépendantes, de lois $\\chi^2$ à $p$ et $q$ degrés de liberté respectivement.</p>

    <h3>8. Théorème fondamental de l'échantillon gaussien (théorème de Cochran/Fisher)</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si $X_1,\\dots,X_n$ sont des v.a. indépendantes de loi $\\mathcal{N}(m,\\sigma^2)$, on définit la moyenne empirique $\\overline{X}_n=\\dfrac1n\\sum_k X_k$ et la variance empirique corrigée $S_{n-1}^2=\\dfrac{1}{n-1}\\sum_k (X_k-\\overline{X}_n)^2$. Alors $\\overline{X}_n$ et $S_{n-1}^2$ sont <strong>indépendantes</strong>, et de plus :
      <ul>
        <li>$\\overline{X}_n \\sim \\mathcal{N}(m,\\sigma^2/n)$ ;</li>
        <li>$(n-1)S_{n-1}^2/\\sigma^2$ suit la loi du $\\chi^2$ à $n-1$ degrés de liberté ;</li>
        <li>$\\dfrac{\\sqrt{n}(\\overline{X}_n-m)}{S_{n-1}}$ suit la loi de Student à $n-1$ degrés de liberté.</li>
      </ul>
    </div>
    <p>Ce théorème, remarquable et non trivial (l'indépendance de $\\overline{X}_n$ et $S_{n-1}^2$ n'est pas évidente à première vue), est la clé qui explique pourquoi la loi de Student intervient dès que la variance est inconnue.</p>

    <h3>9. Pratique des tests sur un échantillon gaussien</h3>
    <table class="mini-table">
      <tr><th>Paramètre testé</th><th>Statistique de test</th><th>Loi sous $H_0$</th></tr>
      <tr><td>Moyenne $m$, variance $\\sigma^2$ connue</td><td>$\\dfrac{\\sqrt{n}(\\overline{X}_n-m)}{\\sigma}$</td><td>$\\mathcal{N}(0,1)$</td></tr>
      <tr><td>Moyenne $m$, variance inconnue</td><td>$\\dfrac{\\sqrt{n}(\\overline{X}_n-m)}{S_{n-1}}$</td><td>Student à $n-1$ d.d.l.</td></tr>
      <tr><td>Variance $\\sigma^2$, moyenne $m$ connue</td><td>$\\dfrac{1}{\\sigma^2}\\sum_{k=1}^n (X_k-m)^2$</td><td>$\\chi^2$ à $n$ d.d.l.</td></tr>
      <tr><td>Variance $\\sigma^2$, moyenne inconnue</td><td>$(n-1)S_{n-1}^2/\\sigma^2$</td><td>$\\chi^2$ à $n-1$ d.d.l.</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Ce qu'il faut retenir</span>
      Le choix de la bonne statistique de test dépend uniquement de la question posée (moyenne ou variance) et de ce qui est connu ou non (l'autre paramètre) : une fois ce choix fait, la loi sous $H_0$ est toujours l'une des quatre lois de ce tableau, directement lisible dans une table statistique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$H_0: \\theta^*\\in\\Theta_0$ vs $H_1:\\theta^*\\in\\Theta_1$ ; test simple si $\\Theta_0=\\{\\theta_0\\}$, bilatéral/unilatéral selon la forme de $H_1$</li>
        <li>Risque de 1ère espèce $\\alpha=P_{H_0}(\\text{rejeter }H_0)$, contrôlé ; risque de 2ème espèce $\\beta=P_{H_1}(\\text{accepter }H_0)$, non contrôlé</li>
        <li>Puissance $\\eta(\\theta)=1-\\beta(\\theta)$ ; le test de Neyman-Pearson (rapport de vraisemblance) est le plus puissant à risque $\\alpha$ fixé</li>
        <li>$\\chi^2$ à $n$ d.d.l. : loi de $\\sum_k((X_k-m)/\\sigma)^2$ pour des $X_k$ i.i.d. $\\mathcal{N}(m,\\sigma^2)$</li>
        <li>Student à $n$ d.d.l. : loi de $X/\\sqrt{Z_n/n}$, $X\\sim\\mathcal{N}(0,1)$ indépendante de $Z_n\\sim\\chi^2_n$</li>
        <li>Théorème fondamental : $\\overline{X}_n$ et $S_{n-1}^2$ sont indépendantes pour un échantillon gaussien ; $(n-1)S_{n-1}^2/\\sigma^2 \\sim \\chi^2_{n-1}$, $\\sqrt{n}(\\overline{X}_n-m)/S_{n-1} \\sim$ Student$(n-1)$</li>
        <li>Choix de la statistique de test : dépend uniquement du paramètre testé (moyenne/variance) et de ce qui est connu (l'autre paramètre)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre $\\alpha$ (contrôlé, fixé par le statisticien) et $\\beta$ (subi, non contrôlé) : ce ne sont pas des risques symétriques</li>
        <li>Utiliser la loi normale $\\mathcal{N}(0,1)$ pour tester une moyenne alors que la variance est inconnue : il faut alors utiliser la loi de Student, pas la loi normale</li>
        <li>Croire que le test de Neyman-Pearson s'applique à des hypothèses composites : le lemme ne concerne, dans sa forme la plus simple, que deux hypothèses simples $\\theta^*=\\theta_0$ contre $\\theta^*=\\theta_1$</li>
        <li>Oublier que $\\overline{X}_n$ et $S_{n-1}^2$ sont indépendantes uniquement dans le cadre gaussien : ce résultat n'est pas vrai pour une loi quelconque</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le risque de première espèce $\\alpha$ correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba6e1" value="wrong"> la probabilité d'accepter à tort $H_0$</label>
          <label class="option"><input type="radio" name="proba6e1" value="right"> la probabilité de rejeter à tort $H_0$</label>
          <label class="option"><input type="radio" name="proba6e1" value="wrong"> la puissance du test</label>
          <label class="option"><input type="radio" name="proba6e1" value="wrong"> un risque non contrôlé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba6e1','proba6fb1','Correct — α=P_{H0}(rejeter H0) est le risque de rejeter à tort une hypothèse nulle qui est en réalité vraie, et c\\'est ce risque-là qu\\'on fixe et contrôle (souvent à 0,05).','Relis la définition des deux risques d\\'erreur : lequel des deux est « contrôlé », et à quoi correspond-il exactement ?')">Vérifier</button>
        <div class="feedback" id="proba6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour tester la moyenne d'un échantillon gaussien de variance <strong>inconnue</strong>, la statistique de test appropriée suit une loi :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba6e2" value="wrong"> normale $\\mathcal{N}(0,1)$</label>
          <label class="option"><input type="radio" name="proba6e2" value="right"> de Student à $n-1$ degrés de liberté</label>
          <label class="option"><input type="radio" name="proba6e2" value="wrong"> du $\\chi^2$ à $n$ degrés de liberté</label>
          <label class="option"><input type="radio" name="proba6e2" value="wrong"> de Fisher-Snedecor</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba6e2','proba6fb2','Correct — dès que la variance est inconnue et doit être estimée par S_{n-1}, la statistique √n(X̄ₙ-m)/S_{n-1} suit une loi de Student à n-1 degrés de liberté, et non une loi normale.','Repense au tableau de pratique des tests du cours : que change le fait que la variance soit connue ou inconnue dans le test sur une moyenne ?')">Vérifier</button>
        <div class="feedback" id="proba6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">D'après le théorème fondamental de l'échantillon gaussien, $\\overline{X}_n$ et $S_{n-1}^2$ sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="proba6e3" value="wrong"> toujours corrélées positivement</label>
          <label class="option"><input type="radio" name="proba6e3" value="right"> indépendantes</label>
          <label class="option"><input type="radio" name="proba6e3" value="wrong"> égales presque sûrement</label>
          <label class="option"><input type="radio" name="proba6e3" value="wrong"> de même loi</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('proba6e3','proba6fb3','Correct — c\\'est le résultat non trivial et central du théorème fondamental de l\\'échantillon gaussien : moyenne et variance empiriques sont indépendantes, ce qui justifie l\\'apparition de la loi de Student.','Relis le théorème fondamental de l\\'échantillon gaussien : quelle relation, à première vue surprenante, existe entre la moyenne empirique et la variance empirique corrigée ?')">Vérifier</button>
        <div class="feedback" id="proba6fb3"></div>
      </div>
    </div>
  `
};

PROBA_NOVA_KB[probaKey('Tests d\'hypothèses')] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre du cours : les tests d'hypothèses, avec H0/H1, risques α et β, test de Neyman-Pearson et les lois du χ², Student, Fisher-Snedecor. Demande-moi comment choisir la bonne statistique de test, ou la différence entre α et β.",
  rules: [
    { test:/hypoth[èe]se nulle|h0|h_0/i, replies:["L'hypothèse nulle H0 : θ*∈Θ0 est le postulat qu'on cherche à réfuter ou non. Elle est simple si Θ0={θ0}, composite sinon. L'hypothèse alternative H1 lui est contradictoire."] },
    { test:/risque.*premi[èe]re esp[èe]ce|risque α|alpha/i, replies:["Le risque de première espèce α=P_H0(rejeter H0) est le risque contrôlé, fixé à l'avance (souvent 0,05). C'est le risque de rejeter à tort une hypothèse nulle qui est en réalité vraie."] },
    { test:/risque.*deuxi[èe]me esp[èe]ce|risque β|beta/i, replies:["Le risque de deuxième espèce β=P_H1(accepter H0) n'est pas contrôlé : il dépend du test choisi et de la vraie valeur du paramètre sous H1. La puissance du test est η=1-β."] },
    { test:/neyman.?pearson/i, replies:["Le test de Neyman-Pearson, pour deux hypothèses simples H0:θ*=θ0 et H1:θ*=θ1, rejette H0 si le rapport de vraisemblance L(θ1,Xn)/L(θ0,Xn) dépasse un seuil κ_α. C'est le test le plus puissant à risque α fixé."] },
    { test:/chi.?2|χ²|khi/i, replies:["La loi du χ² à n degrés de liberté est la loi de la somme des carrés de n gaussiennes N(0,1) indépendantes. Elle sert notamment à tester une variance."] },
    { test:/student/i, replies:["La loi de Student à n d.d.l. est la loi de X/√(Zn/n), avec X~N(0,1) indépendante de Zn~χ²ₙ. Elle intervient dès qu'on teste une moyenne avec une variance inconnue (estimée par Sn-1)."] },
    { test:/fisher.?snedecor/i, replies:["La loi de Fisher-Snedecor F(p,q) est la loi du rapport (Zp/p)/(Zq/q) de deux χ² indépendants à p et q degrés de liberté. Elle sert typiquement à comparer deux variances."] },
    { test:/th[ée]or[èe]me fondamental|coch?ran|X̄ₙ.*ind[ée]pendant/i, replies:["Pour un échantillon gaussien, la moyenne empirique X̄ₙ et la variance empirique corrigée S²ₙ₋₁ sont indépendantes — un résultat non trivial ! De plus (n-1)S²ₙ₋₁/σ² suit un χ²ₙ₋₁ et √n(X̄ₙ-m)/Sₙ₋₁ suit une Student(n-1)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : distingue bien les deux risques d'erreur du cours.","Indice niveau 2 : lequel des deux, α ou β, est fixé et contrôlé à l'avance par le statisticien ?","Indice niveau 3 : α=P_H0(rejeter H0) est le risque de rejeter à tort une hypothèse nulle vraie."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde le tableau de pratique des tests du cours.","Indice niveau 2 : que change le fait que la variance soit connue ou inconnue ?","Indice niveau 3 : variance inconnue ⇒ loi de Student à n-1 degrés de liberté, pas la loi normale."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis le théorème fondamental de l'échantillon gaussien.","Indice niveau 2 : quelle relation surprenante existe entre X̄ₙ et S²ₙ₋₁ ?","Indice niveau 3 : elles sont indépendantes, ce qui explique l'apparition de la loi de Student."] }
  ]
};

/* fusionne le module PROBA dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, PROBA_CHAPTERS);
Object.assign(NOVA_KB, PROBA_NOVA_KB);