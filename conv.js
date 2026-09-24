/* =====================================================================
   CHUNK « conv » — registre CONV_CHAPTERS / CONV_NOVA_KB
   Matière(s) : Mathématiques|Convergence et fonctions de plusieurs variables
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CONV_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =========================================================================
   MODULE "Convergence et fonctions de plusieurs variables" (Mathématiques, L2)
   7 chapitres, d'après le plan UAC/FAST — ECUE 1 "Convergence" (séries
   numériques, suites/séries de fonctions, séries entières, séries de Fourier)
   et ECUE 2 "Fonctions de plusieurs variables" (espaces vectoriels normés,
   calcul différentiel, formes différentielles et intégrales multiples).
========================================================================= */
const CONV_MATIERE = "Convergence et fonctions de plusieurs variables";
function convKey(chapterTitle){ return `Mathématiques|${CONV_MATIERE}|${chapterTitle}`; }
const CONV_CHAPTERS = {};
const CONV_NOVA_KB = {};

/* =========================== CHAPITRE 1 — Séries numériques =========================== */
CONV_CHAPTERS[convKey('Séries numériques')] = {
  objectives: [
    "Déterminer la nature (convergente ou divergente) d'une série numérique",
    "Utiliser les séries géométriques et télescopiques pour calculer des sommes explicites",
    "Appliquer les critères de comparaison, de Cauchy et de d'Alembert aux séries à termes positifs",
    "Étudier les séries alternées et les séries à termes complexes",
    "Calculer le produit de Cauchy de deux séries absolument convergentes"
  ],
  prereqs: ["Suites numériques (limites, monotonie)", "Calcul intégral sur un intervalle non borné"],
  bodyHtml: `
    <p>Ce chapitre pose les bases de la théorie des séries numériques : que signifie « sommer » une infinité de termes, comment reconnaître qu'une telle somme a un sens, et comment la calculer dans les cas classiques.</p>

    <h3>1. Définition et nature d'une série</h3>
    <p>Soit $(u_n)_n$ une suite réelle (ou complexe). La <strong>série numérique</strong> de terme général $u_n$, notée $\\sum u_n$, est la suite $(S_n)_n$ des <strong>sommes partielles</strong> $S_n=\\displaystyle\\sum_{k=0}^n u_k$.</p>
    <ul>
      <li>La série <strong>converge</strong> si $\\displaystyle\\lim_{n\\to+\\infty} S_n=S$ existe et est finie. $S=\\displaystyle\\sum_{n=0}^{+\\infty} u_n$ est la <strong>somme</strong> de la série, et $R_n=S-S_n$ est le <strong>reste d'ordre $n$</strong>.</li>
      <li>La série <strong>diverge</strong> sinon.</li>
    </ul>

    <h3>2. Condition nécessaire de convergence</h3>
    <div class="key-point">
      <span class="eyebrow">Condition nécessaire</span>
      Si $(u_n)_n$ ne converge pas vers $0$, alors la série $\\sum u_n$ diverge. On dit alors qu'elle <strong>diverge grossièrement</strong>.
    </div>
    <p>Attention : cette condition n'est que <strong>nécessaire</strong>, pas suffisante — $u_n\\to 0$ n'entraîne pas la convergence de $\\sum u_n$ (contre-exemple classique : la série harmonique $\\sum 1/n$, qui diverge bien que $1/n\\to 0$).</p>

    <h3>3. Séries géométriques</h3>
    <p>La série de terme général $q^n$ est appelée <strong>série géométrique</strong> de raison $q$.</p>
    <div class="key-point">
      <span class="eyebrow">Proposition</span>
      Si $|q|<1$, la série géométrique converge et $\\displaystyle\\sum_{n=0}^{+\\infty} q^n=\\dfrac{1}{1-q}$. Sinon, elle diverge.
    </div>

    <h3>4. Séries télescopiques</h3>
    <p>Soit $(v_n)_n$ une suite numérique. La série de terme général $u_n=v_n-v_{n+1}$ est dite <strong>télescopique</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Proposition</span>
      La série télescopique $\\sum u_n$ converge si et seulement si $(v_n)_n$ converge. Dans ce cas, $S=v_0-\\displaystyle\\lim_{n\\to+\\infty} v_n$.
    </div>
    <p>Exemple typique : $u_n=\\dfrac{1}{n(n+1)}=\\dfrac1n-\\dfrac{1}{n+1}$, dont la somme vaut $1$.</p>

    <h3>5. Séries à termes positifs</h3>
    <div class="key-point">
      <span class="eyebrow">Proposition fondamentale</span>
      Une série à termes positifs $\\sum u_n$ converge si et seulement si la suite $(S_n)_n$ des sommes partielles est <strong>majorée</strong> (car alors croissante et majorée).
    </div>
    <table class="mini-table">
      <tr><th>Critère</th><th>Énoncé</th></tr>
      <tr><td>Comparaison</td><td>Si $0\\leq u_n\\leq v_n$ (à partir d'un rang) : $\\sum v_n$ converge $\\Rightarrow \\sum u_n$ converge ; $\\sum u_n$ diverge $\\Rightarrow \\sum v_n$ diverge</td></tr>
      <tr><td>Équivalence</td><td>Si $u_n \\sim_{+\\infty} v_n$ (avec $u_n,v_n\\geq0$), alors $\\sum u_n$ et $\\sum v_n$ sont de même nature</td></tr>
      <tr><td>Cauchy (racine)</td><td>$\\displaystyle\\lim_{n\\to\\infty} \\sqrt[n]{u_n} < 1 \\iff \\sum u_n$ converge</td></tr>
      <tr><td>d'Alembert (rapport)</td><td>$\\displaystyle\\lim_{n\\to\\infty} \\dfrac{u_{n+1}}{u_n} < 1 \\iff \\sum u_n$ converge</td></tr>
      <tr><td>Comparaison à une intégrale</td><td>Si $f:[1,+\\infty[\\to\\mathbb{R}^+$ décroissante : $\\displaystyle\\sum_{n=1}^{+\\infty} f(n)$ converge $\\iff \\displaystyle\\int_1^{+\\infty} f(x)\\,dx$ converge</td></tr>
    </table>

    <h3>6. Séries de Riemann et de Bertrand</h3>
    <div class="key-point">
      <span class="eyebrow">Proposition</span>
      $$\\sum \\dfrac{1}{n^\\alpha} \\text{ converge} \\iff \\alpha>1$$
      Plus finement, $\\displaystyle\\sum \\dfrac{1}{n^\\alpha(\\ln n)^\\beta}$ (séries de Bertrand) converge si et seulement si $\\alpha>1$, ou bien $\\alpha=1$ et $\\beta>1$.
    </div>
    <p>Ces séries de référence sont la base indispensable des critères de comparaison et d'équivalence ci-dessus.</p>

    <h3>7. Séries à termes réels de signes quelconques</h3>
    <p>Une série $\\sum u_n$ est <strong>absolument convergente</strong> si $\\sum |u_n|$ converge — et dans ce cas, $\\sum u_n$ converge aussi (convergence absolue $\\Rightarrow$ convergence simple).</p>
    <div class="key-point">
      <span class="eyebrow">Critère spécial des séries alternées</span>
      Si $\\sum u_n$ est une série alternée (les termes changent de signe) telle que $(|u_n|)$ est décroissante et tend vers $0$, alors :
      <ol>
        <li>la série converge ;</li>
        <li>sa somme $S$ est encadrée par deux sommes partielles consécutives ;</li>
        <li>pour tout $n$, le reste $R_n$ est du même signe que $u_{n+1}$, et $|R_n|\\leq |u_{n+1}|$.</li>
      </ol>
    </div>

    <h3>8. Séries à termes complexes</h3>
    <p>Une série est à termes complexes lorsque $u_n=a_n+ib_n$.</p>
    <div class="key-point">
      <span class="eyebrow">Propriétés</span>
      <ul>
        <li>$\\sum z_n$ converge $\\iff$ $\\sum \\mathrm{Re}(z_n)$ et $\\sum \\mathrm{Im}(z_n)$ convergent toutes les deux</li>
        <li>Convergence absolue : $\\sum |z_n|$ converge $\\Rightarrow$ convergence simple</li>
        <li>Série géométrique complexe : $\\sum z^n$ converge $\\iff |z|<1$, et alors $\\displaystyle\\sum_{n=0}^{+\\infty} z^n=\\dfrac{1}{1-z}$</li>
      </ul>
    </div>

    <h3>9. Produit de Cauchy</h3>
    <p>Le <strong>produit de Cauchy</strong> de $\\sum u_n$ et $\\sum v_n$ est la série $\\sum w_n$ avec $w_n=\\displaystyle\\sum_{j+k=n} u_jv_k=\\sum_{j=0}^n u_jv_{n-j}$.</p>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si $\\sum |u_n|$ et $\\sum |v_n|$ convergent, alors $\\sum |w_n|$ converge et $\\displaystyle\\sum_{n=0}^{+\\infty} w_n=\\Big(\\sum_{n=0}^{+\\infty} u_n\\Big)\\Big(\\sum_{n=0}^{+\\infty} v_n\\Big)$.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$\\sum u_n$ converge ssi $S_n=\\sum_{k=0}^n u_k$ a une limite finie ; condition nécessaire : $u_n\\to 0$ (sinon divergence grossière)</li>
        <li>Géométrique : $\\sum q^n$ converge ssi $|q|<1$, somme $1/(1-q)$ ; Télescopique : $\\sum(v_n-v_{n+1})$ converge ssi $(v_n)$ converge, somme $v_0-\\lim v_n$</li>
        <li>Termes positifs : convergence ssi $(S_n)$ majorée ; critères de comparaison, d'équivalence, de Cauchy, de d'Alembert, comparaison à une intégrale</li>
        <li>Riemann : $\\sum 1/n^\\alpha$ converge ssi $\\alpha>1$ ; Bertrand : $\\sum 1/(n^\\alpha(\\ln n)^\\beta)$ converge ssi $\\alpha>1$ ou ($\\alpha=1$ et $\\beta>1$)</li>
        <li>Convergence absolue $\\Rightarrow$ convergence simple ; critère des séries alternées si $(|u_n|)$ décroît vers $0$</li>
        <li>Série complexe : converge ssi $\\mathrm{Re}(z_n)$ et $\\mathrm{Im}(z_n)$ convergent ; $\\sum z^n$ converge ssi $|z|<1$</li>
        <li>Produit de Cauchy de deux séries absolument convergentes : absolument convergent, somme = produit des sommes</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $u_n\\to 0$ suffit pour que $\\sum u_n$ converge : c'est faux, la série harmonique en est le contre-exemple classique</li>
        <li>Appliquer le critère de comparaison sans vérifier la positivité des termes (le critère ne s'applique qu'aux séries à termes positifs)</li>
        <li>Confondre convergence absolue et convergence simple : la première implique la seconde, jamais l'inverse en général</li>
        <li>Oublier de vérifier la décroissance de $(|u_n|)$ avant d'appliquer le critère des séries alternées : sans elle, la conclusion peut être fausse</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La série de terme général $u_n=\\Big(\\dfrac12\\Big)^n$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv1e1" value="wrong"> Divergente</label>
          <label class="option"><input type="radio" name="conv1e1" value="right"> Convergente, de somme $2$</label>
          <label class="option"><input type="radio" name="conv1e1" value="wrong"> Convergente, de somme $1/2$</label>
          <label class="option"><input type="radio" name="conv1e1" value="wrong"> Convergente, de somme $1$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv1e1','conv1fb1','Correct — c\\'est une série géométrique de raison q=1/2, avec |q|<1, donc convergente de somme 1/(1-1/2)=2.','C\\'est une série géométrique de raison q=1/2. Utilise la formule de la somme 1/(1-q).')">Vérifier</button>
        <div class="feedback" id="conv1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La série de terme général $u_n=\\dfrac{1}{n(n+1)}$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv1e2" value="wrong"> Divergente</label>
          <label class="option"><input type="radio" name="conv1e2" value="wrong"> Convergente, de somme $2$</label>
          <label class="option"><input type="radio" name="conv1e2" value="right"> Convergente, de somme $1$</label>
          <label class="option"><input type="radio" name="conv1e2" value="wrong"> Convergente, de somme $1/2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv1e2','conv1fb2','Correct — c\\'est une série télescopique : 1/(n(n+1))=1/n-1/(n+1), donc vn=1/n tend vers 0 et la somme S=v0-lim vn=1-0=1 (attention à l\\'indexation exacte selon le point de départ choisi).','C\\'est une série télescopique : décompose 1/(n(n+1)) en 1/n - 1/(n+1) puis utilise la proposition sur les séries télescopiques.')">Vérifier</button>
        <div class="feedback" id="conv1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La série de terme général $u_n=1/n^2$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv1e3" value="right"> Convergente</label>
          <label class="option"><input type="radio" name="conv1e3" value="wrong"> Divergente</label>
          <label class="option"><input type="radio" name="conv1e3" value="wrong"> Ni convergente ni divergente</label>
          <label class="option"><input type="radio" name="conv1e3" value="wrong"> On ne peut pas savoir</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv1e3','conv1fb3','Correct — c\\'est une série de Riemann avec α=2>1, donc convergente d\\'après la proposition du cours.','C\\'est une série de Riemann Σ1/n^α avec α=2. Rappelle-toi la condition sur α pour la convergence.')">Vérifier</button>
        <div class="feedback" id="conv1fb3"></div>
      </div>
    </div>
  `
};

CONV_NOVA_KB[convKey('Séries numériques')] = {
  intro: "Salut, moi c'est Nova ! On démarre avec les séries numériques : nature, séries géométriques et télescopiques, critères pour les séries à termes positifs, séries alternées et complexes. Demande-moi un critère en particulier ou une aide sur les exercices.",
  rules: [
    { test:/condition n[ée]cessaire/i, replies:["La condition nécessaire dit que si un ne tend pas vers 0, alors Σun diverge (grossièrement). Mais attention, ce n'est pas suffisant : un→0 n'implique PAS la convergence (cf. série harmonique)."] },
    { test:/g[ée]om[ée]trique/i, replies:["La série géométrique Σqⁿ converge ssi |q|<1, et sa somme vaut alors 1/(1-q). Sinon elle diverge."] },
    { test:/t[ée]l[ée]scopique/i, replies:["Une série télescopique Σ(vn-vn+1) converge ssi (vn) converge, et sa somme vaut v0-lim(vn). L'astuce est de décomposer un en différence de deux termes consécutifs."] },
    { test:/cauchy|racine ni[èe]me/i, replies:["Le critère de Cauchy (racine) : si lim (un)^(1/n) < 1, la série Σun (à termes positifs) converge. Si la limite est >1, elle diverge."] },
    { test:/d.alembert|rapport/i, replies:["Le critère de d'Alembert : si lim u(n+1)/un < 1, la série converge. Utile surtout quand un contient des factorielles ou des puissances."] },
    { test:/riemann/i, replies:["Les séries de Riemann Σ1/n^α convergent ssi α>1. C'est LA référence pour les critères de comparaison et d'équivalence."] },
    { test:/bertrand/i, replies:["Les séries de Bertrand Σ1/(n^α(ln n)^β) convergent ssi α>1, ou bien α=1 et β>1. C'est un raffinement des séries de Riemann pour le cas limite α=1."] },
    { test:/altern[ée]e/i, replies:["Le critère des séries alternées (Leibniz) : si (|un|) décroît vers 0, la série alternée Σun converge, et |Rn|≤|u(n+1)|. N'oublie jamais de vérifier la décroissance !"] },
    { test:/convergence absolue/i, replies:["Une série est absolument convergente si Σ|un| converge. La convergence absolue implique toujours la convergence simple, mais pas l'inverse."] },
    { test:/produit de cauchy/i, replies:["Le produit de Cauchy de Σun et Σvn est Σwn avec wn=Σ(j+k=n) ujvk. Si les deux séries sont absolument convergentes, le produit l'est aussi et sa somme est le produit des deux sommes."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : reconnais le type de série (géométrique, avec quelle raison q ?).","Indice niveau 2 : ici q=1/2, vérifie que |q|<1.","Indice niveau 3 : applique la formule 1/(1-q) avec q=1/2."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : décompose 1/(n(n+1)) en éléments simples.","Indice niveau 2 : tu dois trouver 1/n - 1/(n+1).","Indice niveau 3 : c'est une série télescopique de somme v0-lim(vn) avec vn=1/n."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : identifie le type de série (Riemann, avec quel exposant α ?).","Indice niveau 2 : ici α=2.","Indice niveau 3 : Σ1/n^α converge ssi α>1, donc α=2 donne la convergence."] }
  ]
};

/* =========================== CHAPITRE 2 — Suites et séries de fonctions =========================== */
CONV_CHAPTERS[convKey('Suites et séries de fonctions')] = {
  objectives: [
    "Distinguer convergence simple et convergence uniforme d'une suite de fonctions",
    "Utiliser les trois conditions suffisantes de non-convergence uniforme",
    "Appliquer les théorèmes de continuité, d'intégration et de dérivation d'une limite uniforme",
    "Étudier la convergence simple, absolue, uniforme et normale d'une série de fonctions",
    "Intégrer et dériver terme à terme une série de fonctions sous les bonnes hypothèses"
  ],
  prereqs: ["Séries numériques", "Continuité et dérivabilité des fonctions d'une variable"],
  bodyHtml: `
    <p>Ce chapitre étudie ce qui se passe quand on fait varier, non plus un terme numérique $u_n$, mais une <strong>fonction</strong> $f_n(x)$ dépendant d'un paramètre $n$. La question centrale : peut-on « passer à la limite » sous une somme, une intégrale, ou une dérivée ? La réponse dépend crucialement du <strong>mode de convergence</strong> choisi.</p>

    <h3>1. Convergence simple d'une suite de fonctions</h3>
    <p>Soit $(f_n)_n$ une suite de fonctions définies sur un intervalle $I$. On dit que $(f_n)$ converge <strong>simplement</strong> vers $f$, noté $f_n \\xrightarrow{CS} f$, si :</p>
    <p>$$\\forall x\\in I,\\ \\lim_{n\\to+\\infty} f_n(x)=f(x)$$</p>
    <p>C'est-à-dire que pour chaque $x$ fixé, la suite numérique $(f_n(x))_n$ converge — mais la vitesse de convergence peut dépendre de $x$.</p>

    <h3>2. Convergence uniforme</h3>
    <p>On dit que $(f_n)$ converge <strong>uniformément</strong> vers $f$, noté $f_n \\xrightarrow{CU} f$, si :</p>
    <p>$$\\forall\\varepsilon>0,\\ \\exists n_0\\in\\mathbb{N},\\ \\forall n\\geq n_0,\\ \\forall x\\in I,\\ |f_n(x)-f(x)|\\leq\\varepsilon$$</p>
    <p>En pratique, c'est équivalent à :</p>
    <p>$$f_n \\xrightarrow{CU} f \\iff f_n \\xrightarrow{CS} f \\ \\text{et}\\ \\lim_{n\\to+\\infty} \\|f_n-f\\|_\\infty=\\lim_{n\\to+\\infty} \\sup_{x\\in I}|f_n(x)-f(x)|=0$$</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      $f_n\\xrightarrow{CU} f \\Rightarrow f_n \\xrightarrow{CS} f$, mais la réciproque est fausse en général. La convergence uniforme est un contrôle <strong>global</strong> (même $n_0$ pour tout $x$), alors que la convergence simple n'est qu'un contrôle <strong>ponctuel</strong> (le $n_0$ peut dépendre de $x$).
    </div>

    <h3>3. Trois conditions suffisantes de non-convergence uniforme</h3>
    <table class="mini-table">
      <tr><th>#</th><th>Hypothèses</th><th>Conclusion</th></tr>
      <tr><td>1</td><td>$f_n\\xrightarrow{CS} f$ sur $I$, et il existe $(x_n)\\subset I$ telle que $\\lim (f_n(x_n)-f(x_n))\\neq 0$</td><td>$(f_n) \\not\\xrightarrow{CU} f$</td></tr>
      <tr><td>2</td><td>$f_n$ continues, $f_n\\xrightarrow{CS} f$ sur $I$, mais $f$ n'est pas continue sur $I$</td><td>$(f_n) \\not\\xrightarrow{CU} f$</td></tr>
      <tr><td>3</td><td>$f_n$ continues sur $[a,b]$, $f_n\\xrightarrow{CS} f$, mais $\\displaystyle\\lim_{n\\to+\\infty}\\int_a^b f_n(x)dx \\neq \\int_a^b f(x)dx$</td><td>$(f_n) \\not\\xrightarrow{CU} f$</td></tr>
    </table>
    <p>Ces trois conditions sont des outils très efficaces pour <strong>prouver rapidement l'absence</strong> de convergence uniforme, sans avoir à calculer explicitement $\\sup_x|f_n(x)-f(x)|$.</p>

    <h3>4. Continuité de la limite uniforme</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si les $f_n$ sont continues sur $I$ et $f_n\\xrightarrow{CU} f$ sur $I$, alors $f$ est continue sur $I$.
    </div>
    <p>C'est la contrepartie exacte de la condition 2 ci-dessus : la continuité « passe à la limite » sous convergence uniforme, mais pas nécessairement sous convergence simple seule.</p>

    <h3>5. Interversion des limites et intégration</h3>
    <p>Si $f_n\\xrightarrow{CU} f$ sur $[a,b[$, alors $\\displaystyle\\lim_{n\\to+\\infty}\\Big(\\lim_{x\\to b}f_n(x)\\Big)=\\lim_{x\\to b}\\Big(\\lim_{n\\to+\\infty}f_n(x)\\Big)$ — les deux limites (en $n$ et en $x$) peuvent être échangées.</p>
    <div class="key-point">
      <span class="eyebrow">Théorème d'intégration</span>
      Si les $f_n$ sont continues et $f_n\\xrightarrow{CU} f$ sur $[a,b]$, alors $f$ est continue sur $[a,b]$ et :
      $$\\lim_{n\\to+\\infty}\\int_a^b f_n(x)\\,dx=\\int_a^b \\Big(\\lim_{n\\to+\\infty} f_n(x)\\Big)dx=\\int_a^b f(x)\\,dx$$
    </div>

    <h3>6. Dérivabilité et dérivation de la limite</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Si les $f_n$ sont dérivables sur $I$, s'il existe $x_0\\in I$ tel que $(f_n(x_0))_n$ converge, et si $(f_n')\\xrightarrow{CU} g$ sur $I$, alors $f_n\\xrightarrow{CU} f$ sur $I$, $f$ est dérivable sur $I$, et $f'=g$.
    </div>
    <p>Ce théorème est plus exigeant que celui de la continuité : c'est la convergence uniforme des <strong>dérivées</strong> (et pas seulement des fonctions) qui garantit qu'on peut dériver terme à terme.</p>

    <h3>7. Séries de fonctions : convergence simple et absolue</h3>
    <p>Soit $(f_n)$ une suite de fonctions sur $I$. La <strong>série de fonctions</strong> $\\sum f_n$ est la suite $(S_n)$ des sommes partielles $S_n(x)=\\sum_{k=0}^n f_k(x)$.</p>
    <ul>
      <li><strong>Convergence simple</strong> : $\\sum f_n \\xrightarrow{CS} S \\iff \\forall x\\in I,\\ \\lim_{n\\to+\\infty} S_n(x)=S(x)$</li>
      <li><strong>Convergence absolue</strong> : $\\sum f_n$ converge absolument si $\\sum |f_n|$ converge (CA $\\Rightarrow$ CS)</li>
    </ul>

    <h3>8. Convergence uniforme d'une série de fonctions</h3>
    <p>$\\sum f_n \\xrightarrow{CU} S \\iff (S_n) \\xrightarrow{CU} S$. Une caractérisation très utile en pratique :</p>
    <div class="key-point">
      <span class="eyebrow">Proposition</span>
      $$\\sum f_n \\xrightarrow{CU} \\text{ sur } I \\iff (R_n) \\xrightarrow{CU} 0 \\text{ sur } I$$
      En pratique, on majore $|R_n(x)|$ par une expression dépendant de $n$ mais <strong>pas de $x$</strong>, et tendant vers $0$ quand $n\\to+\\infty$.
    </div>
    <p>Attention : CU $\\Rightarrow$ CS, mais <strong>CU n'implique pas CA</strong> (et réciproquement) : ce sont deux notions indépendantes.</p>

    <h3>9. Résultats de continuité, intégration et dérivation pour les séries</h3>
    <table class="mini-table">
      <tr><th>Résultat</th><th>Hypothèses</th><th>Conclusion</th></tr>
      <tr><td>Interversion des limites</td><td>$\\sum f_n \\xrightarrow{CU} S$ sur $[a,b[$</td><td>$\\displaystyle\\lim_{x\\to b}\\sum_{n=0}^{+\\infty} f_n(x)=\\sum_{n=0}^{+\\infty}\\lim_{x\\to b}f_n(x)$</td></tr>
      <tr><td>Continuité</td><td>$f_n$ continues, $\\sum f_n \\xrightarrow{CU} S$ sur $I$</td><td>$S$ continue sur $I$</td></tr>
      <tr><td>Intégration terme à terme</td><td>$f_n$ continues, $\\sum f_n \\xrightarrow{CU} S$ sur $[a,b]$</td><td>$\\displaystyle\\sum_{n=0}^{+\\infty}\\int_a^b f_n(x)dx=\\int_a^b S(x)dx$</td></tr>
      <tr><td>Dérivation terme à terme</td><td>$f_n$ dérivables, $\\sum f_n \\xrightarrow{CS} S$, $\\sum f_n' \\xrightarrow{CU} U$ sur $I$</td><td>$S$ dérivable, $S'=U$</td></tr>
    </table>

    <h3>10. Convergence normale</h3>
    <p>$\\sum f_n$ converge <strong>normalement</strong> (CN) sur $I$ si $\\sum \\|f_n\\|_\\infty$ converge.</p>
    <div class="key-point">
      <span class="eyebrow">Hiérarchie des convergences pour une série</span>
      $$\\text{CN} \\Rightarrow \\text{CU},\\qquad \\text{CN}\\Rightarrow \\text{CA}, \\qquad \\text{CN}\\Rightarrow \\text{CS}$$
      La convergence normale est le mode le plus fort et, en pratique, le plus facile à vérifier : il suffit de majorer $|f_n(x)|$ par une constante $M_n$ indépendante de $x$, telle que $\\sum M_n$ converge (c'est le critère de Weierstrass).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>CS : $\\forall x, f_n(x)\\to f(x)$ ; CU : $\\|f_n-f\\|_\\infty=\\sup_x|f_n(x)-f(x)|\\to 0$ ; CU ⇒ CS, pas la réciproque</li>
        <li>3 conditions suffisantes de non-CU : point $x_n$ où l'écart ne tend pas vers 0 ; $f$ discontinue alors que les $f_n$ sont continues ; intégrales qui ne convergent pas vers la bonne limite</li>
        <li>CU + continuité des $f_n$ ⇒ $f$ continue ; CU + continuité ⇒ interversion limite/intégrale</li>
        <li>Dérivation de la limite : il faut la CU des $f_n'$ (pas seulement des $f_n$) + convergence en un point</li>
        <li>Série de fonctions : CS, CA (via $\\sum|f_n|$), CU (via le reste $R_n\\to 0$ uniformément), CN (via $\\sum\\|f_n\\|_\\infty$)</li>
        <li>Hiérarchie : CN ⇒ CU, CN ⇒ CA, CN ⇒ CS ; mais CU n'implique ni CA ni l'inverse</li>
        <li>Théorèmes d'intégration/dérivation terme à terme d'une série : nécessitent la CU (des $f_n$ pour l'intégration, des $f_n'$ pour la dérivation)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre CS et CU : la CS ne suffit pas à garantir la continuité, l'intégration ou la dérivation terme à terme de la limite</li>
        <li>Pour dériver terme à terme, vérifier la CU des $f_n$ au lieu de celle des $f_n'$ : c'est bien la convergence uniforme des dérivées qui est exigée</li>
        <li>Croire que CU implique CA (ou l'inverse) pour une série de fonctions : ce sont deux notions indépendantes</li>
        <li>Majorer $|R_n(x)|$ par une expression qui dépend encore de $x$ : pour prouver la CU, la majorante doit être indépendante de $x$ et tendre vers $0$</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La suite de fonctions $f_n(x)=x^n$ sur $[0,1]$ converge simplement vers la fonction $f$ définie par $f(x)=0$ sur $[0,1[$ et $f(1)=1$. On peut en déduire que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv2e1" value="wrong"> $(f_n)$ converge uniformément sur $[0,1]$</label>
          <label class="option"><input type="radio" name="conv2e1" value="right"> $(f_n)$ ne converge pas uniformément sur $[0,1]$</label>
          <label class="option"><input type="radio" name="conv2e1" value="wrong"> $(f_n)$ diverge simplement sur $[0,1]$</label>
          <label class="option"><input type="radio" name="conv2e1" value="wrong"> $f$ est continue sur $[0,1]$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv2e1','conv2fb1','Correct — les fn sont continues mais f ne l\\'est pas en x=1 (saut de 0 à 1), donc d\\'après la 2ème condition suffisante de non-convergence uniforme, la convergence ne peut pas être uniforme.','Applique la 2ème condition suffisante de non-convergence uniforme : les fn sont continues, mais la fonction limite f l\\'est-elle ?')">Vérifier</button>
        <div class="feedback" id="conv2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour dériver terme à terme une série de fonctions $\\sum f_n$ dérivables, il faut vérifier la convergence uniforme de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv2e2" value="wrong"> la série $\\sum f_n$ elle-même</label>
          <label class="option"><input type="radio" name="conv2e2" value="right"> la série des dérivées $\\sum f_n'$</label>
          <label class="option"><input type="radio" name="conv2e2" value="wrong"> la série des primitives de $f_n$</label>
          <label class="option"><input type="radio" name="conv2e2" value="wrong"> aucune convergence uniforme n'est nécessaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv2e2','conv2fb2','Correct — c\\'est le point clé du théorème de dérivation : on exige la convergence uniforme de Σfn\\' (pas seulement la convergence simple de Σfn) pour pouvoir dériver terme à terme.','Relis le théorème de dérivation d\\'une série de fonctions : quelle est l\\'hypothèse la plus forte, portant sur les dérivées ?')">Vérifier</button>
        <div class="feedback" id="conv2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La convergence normale (CN) d'une série de fonctions implique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv2e3" value="wrong"> uniquement la convergence simple</label>
          <label class="option"><input type="radio" name="conv2e3" value="right"> la convergence uniforme, absolue et simple</label>
          <label class="option"><input type="radio" name="conv2e3" value="wrong"> uniquement la convergence absolue</label>
          <label class="option"><input type="radio" name="conv2e3" value="wrong"> rien de plus que la convergence normale elle-même</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv2e3','conv2fb3','Correct — la convergence normale est le mode le plus fort : CN ⇒ CU, CN ⇒ CA, et donc CN ⇒ CS également.','Relis la hiérarchie des convergences du cours : la convergence normale est le mode le plus fort, que garantit-elle simultanément ?')">Vérifier</button>
        <div class="feedback" id="conv2fb3"></div>
      </div>
    </div>
  `
};

CONV_NOVA_KB[convKey('Suites et séries de fonctions')] = {
  intro: "Salut, moi c'est Nova ! On étudie les suites et séries de fonctions : convergence simple vs uniforme, continuité/intégration/dérivation de la limite, et convergence normale. Demande-moi la différence entre CS et CU, ou une des trois conditions de non-convergence uniforme.",
  rules: [
    { test:/convergence simple|\\bcs\\b/i, replies:["La convergence simple (CS) : pour chaque x fixé, fn(x)→f(x). C'est un contrôle point par point, la vitesse peut dépendre de x."] },
    { test:/convergence uniforme|\\bcu\\b/i, replies:["La convergence uniforme (CU) : sup_x|fn(x)-f(x)|→0, un contrôle global valable pour tout x en même temps. CU implique toujours CS, jamais l'inverse en général."] },
    { test:/condition suffisante.*non.?convergence|non.?cu/i, replies:["Trois façons de prouver qu'il n'y a PAS convergence uniforme : 1) trouver une suite xn où fn(xn)-f(xn) ne tend pas vers 0 ; 2) montrer que f n'est pas continue alors que les fn le sont ; 3) montrer que les intégrales ne passent pas à la limite."] },
    { test:/continuit[ée].*limite|limite.*continue/i, replies:["Si les fn sont continues et fn→f uniformément, alors f est continue. C'est un théorème clé : la CU 'transporte' la continuité à la limite."] },
    { test:/int[ée]gration.*limite|int[ée]grer.*limite/i, replies:["Sous CU (et continuité des fn), on peut échanger limite et intégrale : lim ∫fn = ∫(lim fn) = ∫f. Ce résultat est faux en général sous seule convergence simple."] },
    { test:/d[ée]rivation.*limite|d[ée]river.*limite/i, replies:["Pour dériver la limite d'une suite de fonctions, il faut la CU des dérivées fn' (pas seulement des fn), plus la convergence en un point x0. Alors fn→f uniformément, f est dérivable et f'=lim fn'."] },
    { test:/convergence absolue.*s[ée]rie|\\bca\\b/i, replies:["Pour une série de fonctions, la convergence absolue signifie que Σ|fn(x)| converge (pour chaque x). CA implique CS, mais CA n'implique pas CU (et réciproquement)."] },
    { test:/reste.*rn|R_n/i, replies:["Pour prouver la CU d'une série Σfn, on montre que le reste Rn(x) tend vers 0 uniformément : il faut majorer |Rn(x)| par une expression qui ne dépend PAS de x, et qui tend vers 0."] },
    { test:/convergence normale|\\bcn\\b/i, replies:["La convergence normale (CN) : Σ||fn||∞ converge. C'est le mode le plus fort — CN implique CU, CA et CS. En pratique on majore |fn(x)| par une constante Mn indépendante de x avec ΣMn convergente."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare la continuité des fn et celle de la fonction limite f.","Indice niveau 2 : les fn(x)=x^n sont continues, mais que dire de f en x=1 ?","Indice niveau 3 : f a un saut en x=1, elle n'est pas continue, donc pas de convergence uniforme (2ème condition suffisante)."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis bien l'hypothèse la plus exigeante du théorème de dérivation d'une série.","Indice niveau 2 : ce n'est pas la série elle-même qui doit converger uniformément.","Indice niveau 3 : c'est la série des dérivées Σfn' qui doit converger uniformément."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis la hiérarchie des convergences pour une série de fonctions.","Indice niveau 2 : la convergence normale est le mode le plus fort du cours.","Indice niveau 3 : CN implique à la fois CU, CA et CS."] }
  ]
};

/* =========================== CHAPITRE 3 — Séries entières =========================== */
CONV_CHAPTERS[convKey('Séries entières')] = {
  objectives: [
    "Définir le rayon de convergence d'une série entière et l'interpréter géométriquement",
    "Calculer un rayon de convergence par les critères de d'Alembert et de Cauchy",
    "Utiliser les opérations sur les séries entières (dérivée, primitive, équivalence) et leur rayon commun",
    "Dériver et intégrer terme à terme une série entière à l'intérieur de son disque de convergence",
    "Développer en série entière des fonctions usuelles ($1/(1-x)$, $\\ln(1+x)$, etc.)"
  ],
  prereqs: ["Séries numériques", "Suites et séries de fonctions"],
  bodyHtml: `
    <p>Les <strong>séries entières</strong> sont des séries de fonctions très particulières, de la forme $\\sum a_n x^n$ : elles combinent la simplicité algébrique des polynômes avec la richesse des séries. Leur théorie repose entièrement sur la notion de <strong>rayon de convergence</strong>.</p>

    <h3>1. Définition et rayon de convergence</h3>
    <p>Une <strong>série entière</strong> est une série qui peut s'écrire $\\sum a_n r^n$ (variable réelle) ou $\\sum a_n z^n$ (variable complexe). Le <strong>rayon de convergence</strong> est :</p>
    <p>$$R=\\sup\\{r\\in[0,+\\infty[\\ ;\\ \\text{la suite } (a_n r^n)_n \\text{ est bornée}\\} \\in [0,+\\infty]$$</p>

    <h3>2. Théorème fondamental</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Soit $\\sum a_n z^n$ une série entière de rayon de convergence $R$ :
      <ul>
        <li>si $|z|>R$, la suite $(a_nz^n)$ n'est pas bornée et $\\sum a_nz^n$ diverge <strong>grossièrement</strong> ;</li>
        <li>si $|z|<R$, la série $\\sum a_nz^n$ converge <strong>absolument</strong> ;</li>
        <li>si $|z|=R$, on ne peut <strong>rien dire</strong> en général sur la nature de la série (à étudier au cas par cas).</li>
      </ul>
    </div>
    <p>Le <strong>disque ouvert de convergence</strong> est $D(0,R)=\\{z\\in\\mathbb{C}\\ ;\\ |z|<R\\}$.</p>

    <h3>3. Calcul du rayon de convergence</h3>
    <table class="mini-table">
      <tr><th>Critère</th><th>Formule</th></tr>
      <tr><td>d'Alembert</td><td>$\\displaystyle\\lim_{n\\to+\\infty}\\Big|\\dfrac{a_{n+1}}{a_n}\\Big|=\\ell \\ \\Rightarrow\\ R=\\dfrac{1}{\\ell}$ (avec $R=+\\infty$ si $\\ell=0$, $R=0$ si $\\ell=+\\infty$)</td></tr>
      <tr><td>Cauchy</td><td>$\\displaystyle\\lim_{n\\to+\\infty}|a_n|^{1/n}=\\ell \\ \\Rightarrow\\ R=\\dfrac{1}{\\ell}$</td></tr>
    </table>
    <p>Exemples classiques : $\\sum \\dfrac{z^n}{n+1}$ a pour rayon $R=1$ ; $\\sum \\dfrac{z^n}{n3^n}$ a pour rayon $R=3$ ; $\\sum n!\\,z^n$ a pour rayon $R=0$ (elle ne converge qu'en $z=0$).</p>

    <h3>4. Opérations conservant le rayon de convergence</h3>
    <div class="key-point">
      <span class="eyebrow">Proposition</span>
      <ul>
        <li>$\\sum a_nz^n$, $\\sum a_{n+1}z^n$, $\\sum na_nz^n$ et $\\sum \\alpha a_nz^n$ ($\\alpha\\in\\mathbb{C}^*$) ont <strong>toutes le même rayon</strong> de convergence</li>
        <li>Si $a_n \\sim_{+\\infty} b_n$, alors $\\sum a_nz^n$ et $\\sum b_nz^n$ ont le même rayon de convergence</li>
        <li>La série <strong>dérivée</strong> $\\sum (n+1)a_{n+1}z^n$ (aussi écrite $\\sum na_nz^{n-1}$) a le même rayon que $\\sum a_nz^n$</li>
        <li>La série <strong>intégrale/primitive</strong> $\\sum \\dfrac{a_n}{n+1}z^{n+1}$ a le même rayon que $\\sum a_nz^n$</li>
      </ul>
    </div>
    <p>Exemple : la série dérivée de $\\sum z^n$ est $\\sum (n+1)z^n$ ; la série intégrale (primitive) de $\\sum z^n$ est $\\sum \\dfrac{1}{n+1}z^{n+1}$.</p>

    <h3>5. Dérivation d'une série entière</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Soit $\\sum a_nx^n$ de rayon $R$, et $f(x)=\\displaystyle\\sum_{n=0}^{+\\infty} a_nx^n$ pour $|x|<R$. Alors $f$ est dérivable pour $|x|<R$, et :
      $$f'(x)=\\sum_{n=0}^{+\\infty} (n+1)a_{n+1}x^n, \\qquad |x|<R$$
      De plus, la série dérivée a le même rayon de convergence $R$.
    </div>
    <p>Exemple : pour $|x|<1$, $\\displaystyle\\sum_{n=0}^{+\\infty} x^n=\\dfrac{1}{1-x}$. En dérivant terme à terme, $\\displaystyle\\sum_{n=0}^{+\\infty} (n+1)x^n=\\dfrac{1}{(1-x)^2}$.</p>

    <h3>6. Intégration d'une série entière</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Soit $\\sum a_nx^n$ de rayon $R>0$ et $f(x)=\\displaystyle\\sum_{n=0}^{+\\infty} a_nx^n$ pour $|x|<R$. Si $F$ est une primitive de $f$ sur $]-R,R[$, alors :
      $$\\forall x\\in\\,]-R,R[,\\quad F(x)=F(0)+\\sum_{n=0}^{+\\infty} \\dfrac{a_n}{n+1}x^{n+1}$$
    </div>

    <h3>7. Développements en série entière usuels</h3>
    <p>En partant de $\\displaystyle\\dfrac{1}{1-x}=\\sum_{n=0}^{+\\infty} x^n$ pour $|x|<1$, on obtient par substitution $x\\to -x$ :</p>
    <p>$$\\dfrac{1}{1+x}=\\sum_{n=0}^{+\\infty} (-1)^n x^n, \\qquad |x|<1$$</p>
    <p>En intégrant cette relation terme à terme (la primitive de $\\dfrac{1}{1+t}$ s'annulant en $0$ étant $\\ln(1+x)$) :</p>
    <p>$$\\ln(1+x)=\\sum_{n=0}^{+\\infty} \\dfrac{(-1)^n}{n+1}x^{n+1}=\\sum_{n=1}^{+\\infty} \\dfrac{(-1)^{n-1}}{n}x^n, \\qquad x\\in\\,]-1,1[$$</p>
    <div class="key-point">
      <span class="eyebrow">Méthode générale</span>
      Pour développer une fonction en série entière : on part souvent d'une série de référence connue (géométrique $1/(1-x)$, exponentielle, etc.), puis on utilise substitution, dérivation ou intégration terme à terme pour obtenir le développement cherché — toujours en restant à l'intérieur du disque de convergence.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Rayon de convergence $R=\\sup\\{r\\geq0\\ ; (a_nr^n)$ bornée$\\}$ ; $|z|<R$ converge absolument, $|z|>R$ diverge grossièrement, $|z|=R$ indéterminé</li>
        <li>Calcul de $R$ : critère de d'Alembert $R=1/\\lim|a_{n+1}/a_n|$, ou critère de Cauchy $R=1/\\lim|a_n|^{1/n}$</li>
        <li>$\\sum a_nz^n$, $\\sum na_nz^n$, sa dérivée, sa primitive et toute équivalente $b_n\\sim a_n$ ont toutes le même rayon $R$</li>
        <li>Dérivation terme à terme valable pour $|x|<R$ : $f'(x)=\\sum(n+1)a_{n+1}x^n$, même rayon</li>
        <li>Intégration terme à terme valable pour $|x|<R$ : $F(x)=F(0)+\\sum \\frac{a_n}{n+1}x^{n+1}$</li>
        <li>Développements usuels : $1/(1-x)=\\sum x^n$, $1/(1+x)=\\sum(-1)^nx^n$, $\\ln(1+x)=\\sum(-1)^{n-1}x^n/n$, tous pour $|x|<1$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Conclure sur la nature de la série au bord du disque ($|z|=R$) à partir du seul rayon de convergence : il faut étudier ce cas séparément, au cas par cas</li>
        <li>Appliquer la dérivation ou l'intégration terme à terme en dehors du disque ouvert $]-R,R[$ : les théorèmes ne garantissent rien pour $|x|\\geq R$</li>
        <li>Oublier la constante $F(0)$ lors de l'intégration terme à terme d'une série entière</li>
        <li>Confondre le rayon de convergence d'une série entière avec celui de sa série dérivée ou intégrale : ils sont en réalité toujours égaux, ce n'est pas une coïncidence à vérifier à chaque fois</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le rayon de convergence de la série entière $\\sum n! \\, z^n$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv3e1" value="wrong"> $R=1$</label>
          <label class="option"><input type="radio" name="conv3e1" value="wrong"> $R=+\\infty$</label>
          <label class="option"><input type="radio" name="conv3e1" value="right"> $R=0$</label>
          <label class="option"><input type="radio" name="conv3e1" value="wrong"> $R=e$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv3e1','conv3fb1','Correct — avec an=n!, a(n+1)/an=(n+1) tend vers +∞, donc R=1/(+∞)=0 : la série ne converge qu\\'en z=0.','Applique le critère de d\\'Alembert : calcule a(n+1)/an=(n+1)!/n!=(n+1), puis sa limite quand n→+∞.')">Vérifier</button>
        <div class="feedback" id="conv3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si $\\sum a_nx^n$ a pour rayon de convergence $R$, alors sa série dérivée $\\sum (n+1)a_{n+1}x^n$ a pour rayon de convergence :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv3e2" value="wrong"> $R/2$</label>
          <label class="option"><input type="radio" name="conv3e2" value="right"> $R$ (le même rayon)</label>
          <label class="option"><input type="radio" name="conv3e2" value="wrong"> $R+1$</label>
          <label class="option"><input type="radio" name="conv3e2" value="wrong"> On ne peut pas savoir sans plus d'informations</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv3e2','conv3fb2','Correct — c\\'est une propriété fondamentale : la série dérivée d\\'une série entière a exactement le même rayon de convergence que la série de départ.','Relis la proposition sur les opérations conservant le rayon de convergence : que dit-elle sur la série dérivée ?')">Vérifier</button>
        <div class="feedback" id="conv3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $|x|<1$, le développement en série entière de $\\ln(1+x)$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv3e3" value="wrong"> $\\displaystyle\\sum_{n=0}^{+\\infty} x^n$</label>
          <label class="option"><input type="radio" name="conv3e3" value="right"> $\\displaystyle\\sum_{n=1}^{+\\infty} \\dfrac{(-1)^{n-1}}{n}x^n$</label>
          <label class="option"><input type="radio" name="conv3e3" value="wrong"> $\\displaystyle\\sum_{n=0}^{+\\infty} \\dfrac{x^n}{n!}$</label>
          <label class="option"><input type="radio" name="conv3e3" value="wrong"> $\\displaystyle\\sum_{n=0}^{+\\infty} (-1)^n x^n$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv3e3','conv3fb3','Correct — c\\'est exactement le développement obtenu dans le cours en intégrant terme à terme 1/(1+x)=Σ(-1)ⁿxⁿ.','Repense à la méthode du cours : on obtient ln(1+x) en intégrant terme à terme le développement de 1/(1+x).')">Vérifier</button>
        <div class="feedback" id="conv3fb3"></div>
      </div>
    </div>
  `
};

CONV_NOVA_KB[convKey('Séries entières')] = {
  intro: "Salut, moi c'est Nova ! On aborde les séries entières : rayon de convergence, critères de d'Alembert et de Cauchy, dérivation/intégration terme à terme, développements usuels. Demande-moi comment calculer un rayon de convergence ou comment retrouver le développement de ln(1+x).",
  rules: [
    { test:/rayon de convergence/i, replies:["Le rayon de convergence R d'une série entière Σanzⁿ sépare : |z|<R (convergence absolue), |z|>R (divergence grossière), |z|=R (indéterminé, à étudier séparément)."] },
    { test:/d.alembert/i, replies:["Critère de d'Alembert pour le rayon : si lim|a(n+1)/an|=ℓ, alors R=1/ℓ (avec R=+∞ si ℓ=0, R=0 si ℓ=+∞)."] },
    { test:/cauchy.*rayon|racine.*rayon/i, replies:["Critère de Cauchy pour le rayon : si lim|an|^(1/n)=ℓ, alors R=1/ℓ."] },
    { test:/s[ée]rie d[ée]riv[ée]e|d[ée]riv.*terme [aà] terme/i, replies:["La série dérivée Σ(n+1)a(n+1)xⁿ a exactement le même rayon de convergence R que la série de départ, et pour |x|<R, f'(x)=Σ(n+1)a(n+1)xⁿ."] },
    { test:/int[ée]gration.*s[ée]rie|primitive/i, replies:["Si F est une primitive de f=Σanxⁿ, alors F(x)=F(0)+Σ(an/(n+1))x^(n+1) pour |x|<R, avec le même rayon de convergence R."] },
    { test:/ln\\(1\\+x\\)|d[ée]veloppement.*ln/i, replies:["ln(1+x)=Σ(-1)^(n-1)/n · xⁿ pour |x|<1. On l'obtient en intégrant terme à terme 1/(1+x)=Σ(-1)ⁿxⁿ, avec F(0)=ln(1)=0."] },
    { test:/1\/\(1-x\)|s[ée]rie g[ée]om[ée]trique.*enti[èe]re/i, replies:["1/(1-x)=Σxⁿ pour |x|<1 est LE développement de référence : toutes les autres formules usuelles (1/(1+x), ln(1+x)...) s'en déduisent par substitution, dérivation ou intégration."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique le critère de d'Alembert avec an=n!.","Indice niveau 2 : calcule a(n+1)/an=(n+1)!/n!.","Indice niveau 3 : cela vaut (n+1), qui tend vers +∞, donc R=0."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis la proposition sur les opérations conservant le rayon de convergence.","Indice niveau 2 : la série dérivée est l'un des cas particuliers cités.","Indice niveau 3 : elle a exactement le même rayon R que la série de départ."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à la méthode du cours pour obtenir ln(1+x).","Indice niveau 2 : on part de 1/(1+x)=Σ(-1)ⁿxⁿ, puis on intègre terme à terme.","Indice niveau 3 : cela donne Σ(-1)^(n-1)/n · xⁿ, pour n≥1."] }
  ]
};

/* =========================== CHAPITRE 4 — Séries de Fourier =========================== */
CONV_CHAPTERS[convKey('Séries de Fourier')] = {
  objectives: [
    "Calculer les coefficients de Fourier (exponentiels et trigonométriques) d'une fonction périodique",
    "Écrire la série de Fourier d'une fonction sous forme complexe et sous forme trigonométrique",
    "Énoncer et appliquer le théorème de Dirichlet",
    "Utiliser une série de Fourier pour calculer la somme de séries numériques classiques"
  ],
  prereqs: ["Séries de fonctions", "Intégration des fonctions périodiques"],
  bodyHtml: `
    <p>Les <strong>séries de Fourier</strong> permettent de décomposer une fonction périodique en une somme (éventuellement infinie) de fonctions trigonométriques élémentaires $\\cos(nx)$ et $\\sin(nx)$. C'est un outil essentiel en analyse comme en physique (signal, ondes, thermique).</p>

    <h3>1. Coefficients de Fourier</h3>
    <p>Soit $f$ une fonction $2\\pi$-périodique, continue par morceaux sur $\\mathbb{R}$, à valeurs dans $\\mathbb{C}$. On définit ses <strong>coefficients de Fourier exponentiels</strong>, pour $n\\in\\mathbb{Z}$ :</p>
    <p>$$c_n(f)=\\dfrac{1}{2\\pi}\\int_0^{2\\pi} f(x)e^{-inx}\\,dx=\\dfrac{1}{2\\pi}\\int_a^{a+2\\pi} f(x)e^{-inx}\\,dx$$</p>
    <p>(l'intégrale sur une période complète ne dépend pas du choix de $a$, par périodicité de $f$). On définit aussi les <strong>coefficients trigonométriques</strong> :</p>
    <p>$$a_n(f)=\\dfrac1\\pi\\int_0^{2\\pi} f(x)\\cos(nx)\\,dx\\ (n\\in\\mathbb{N}), \\qquad b_n(f)=\\dfrac1\\pi\\int_0^{2\\pi} f(x)\\sin(nx)\\,dx\\ (n\\in\\mathbb{N}^*)$$</p>

    <h3>2. Série de Fourier</h3>
    <p>La <strong>série de Fourier</strong> de $f$ est la série de fonctions :</p>
    <p>$$c_0(f)+\\sum_{n\\geq 1}\\Big(c_n(f)e^{inx}+c_{-n}(f)e^{-inx}\\Big) \\ =\\ \\dfrac12 a_0(f)+\\sum_{n\\geq 1}\\big(a_n(f)\\cos(nx)+b_n(f)\\sin(nx)\\big)$$</p>
    <p>Les deux écritures (exponentielle et trigonométrique) sont équivalentes, reliées par les formules d'Euler $\\cos(nx)=\\dfrac{e^{inx}+e^{-inx}}{2}$, $\\sin(nx)=\\dfrac{e^{inx}-e^{-inx}}{2i}$.</p>
    <div class="key-point">
      <span class="eyebrow">Parité</span>
      Si $f$ est <strong>paire</strong>, tous les $b_n(f)=0$ (série de cosinus uniquement). Si $f$ est <strong>impaire</strong>, tous les $a_n(f)=0$ (série de sinus uniquement). Cette remarque simplifie considérablement les calculs en pratique.
    </div>

    <h3>3. Théorème de Dirichlet</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème de Dirichlet</span>
      Si $f$ est $2\\pi$-périodique et de classe $C^1$ par morceaux sur $\\mathbb{R}$, alors la série de Fourier de $f$ converge, en <strong>tout point</strong> $x\\in\\mathbb{R}$, vers :
      $$c_0(f)+\\sum_{n=1}^{+\\infty}\\Big(c_n(f)e^{inx}+c_{-n}(f)e^{-inx}\\Big)=\\begin{cases}f(x) & \\text{si } f \\text{ est continue en } x\\\\ \\dfrac12\\big(f(x^+)+f(x^-)\\big) & \\text{sinon}\\end{cases}$$
    </div>
    <p>Autrement dit : là où $f$ est continue, sa série de Fourier redonne exactement $f(x)$. Aux points de discontinuité, elle converge vers la <strong>demi-somme</strong> des limites à gauche et à droite — ni plus, ni moins.</p>

    <h3>4. Méthode pratique : calculer une série de Fourier</h3>
    <ol>
      <li>Vérifier la périodicité et la régularité ($C^1$ par morceaux) de $f$ ;</li>
      <li>Exploiter la parité éventuelle de $f$ pour éliminer $a_n$ ou $b_n$ ;</li>
      <li>Calculer les coefficients $a_n(f)$, $b_n(f)$ (ou $c_n(f)$) par intégration, souvent par parties ;</li>
      <li>Écrire la série de Fourier, puis appliquer le théorème de Dirichlet pour connaître sa somme en tout point.</li>
    </ol>

    <h3>5. Application : calcul de sommes de séries numériques</h3>
    <p>Une fois la série de Fourier d'une fonction $f$ établie, on peut évaluer l'égalité de Dirichlet en des points particuliers (souvent $x=0$ ou $x=\\pi$) pour obtenir des formules numériques remarquables. C'est une technique très puissante pour calculer explicitement des sommes de séries qui seraient, sinon, difficiles à obtenir directement.</p>
    <div class="key-point">
      <span class="eyebrow">Exemple emblématique</span>
      Pour $f(t)=|t|$ sur $[-\\pi,\\pi]$, prolongée par $2\\pi$-périodicité (fonction paire, continue, $C^1$ par morceaux), le développement en série de Fourier permet, en évaluant en des points bien choisis, de retrouver notamment $\\displaystyle\\sum_{n=1}^{+\\infty} \\dfrac{1}{n^2}=\\dfrac{\\pi^2}{6}$ — l'un des résultats les plus célèbres de l'analyse, dû à Euler.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Coefficients exponentiels $c_n(f)=\\frac{1}{2\\pi}\\int_0^{2\\pi} f(x)e^{-inx}dx$ ; coefficients trigonométriques $a_n(f)=\\frac1\\pi\\int_0^{2\\pi} f\\cos(nx)dx$, $b_n(f)=\\frac1\\pi\\int_0^{2\\pi} f\\sin(nx)dx$</li>
        <li>Série de Fourier : $\\frac12 a_0+\\sum(a_n\\cos(nx)+b_n\\sin(nx))$, équivalente à l'écriture exponentielle</li>
        <li>$f$ paire $\\Rightarrow$ $b_n=0$ (série de cosinus) ; $f$ impaire $\\Rightarrow$ $a_n=0$ (série de sinus)</li>
        <li>Théorème de Dirichlet ($f$ $2\\pi$-périodique, $C^1$ par morceaux) : la série de Fourier converge vers $f(x)$ où $f$ est continue, et vers $\\frac12(f(x^+)+f(x^-))$ ailleurs</li>
        <li>Application classique : évaluer l'égalité de Dirichlet en un point bien choisi permet de calculer la somme de séries numériques (ex. $\\sum 1/n^2=\\pi^2/6$)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de vérifier la régularité $C^1$ par morceaux avant d'appliquer le théorème de Dirichlet : sans cette hypothèse, le théorème ne s'applique pas</li>
        <li>Croire que la série de Fourier vaut toujours $f(x)$, y compris aux points de discontinuité : c'est faux, elle y vaut la demi-somme des limites à gauche et à droite</li>
        <li>Oublier d'exploiter la parité de $f$ quand elle est présente, ce qui alourdit inutilement les calculs de coefficients</li>
        <li>Confondre le facteur $\\frac12$ devant $a_0$ dans l'écriture trigonométrique : $a_0=\\frac1\\pi\\int_0^{2\\pi}f$, mais le terme constant de la série est $\\frac12 a_0$, pas $a_0$</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Si $f$ est une fonction paire, alors sa série de Fourier ne contient que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv4e1" value="wrong"> des termes en $\\sin(nx)$</label>
          <label class="option"><input type="radio" name="conv4e1" value="right"> des termes en $\\cos(nx)$</label>
          <label class="option"><input type="radio" name="conv4e1" value="wrong"> des termes exponentiels uniquement</label>
          <label class="option"><input type="radio" name="conv4e1" value="wrong"> aucun terme, elle est nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv4e1','conv4fb1','Correct — pour une fonction paire, tous les coefficients bn sont nuls, il ne reste que les termes en cosinus (et la constante a0/2).','Relis la remarque sur la parité : que deviennent les coefficients bn quand f est une fonction paire ?')">Vérifier</button>
        <div class="feedback" id="conv4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">D'après le théorème de Dirichlet, en un point $x$ où $f$ n'est PAS continue, la série de Fourier de $f$ converge vers :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv4e2" value="wrong"> $f(x)$</label>
          <label class="option"><input type="radio" name="conv4e2" value="wrong"> $0$</label>
          <label class="option"><input type="radio" name="conv4e2" value="right"> $\\dfrac12(f(x^+)+f(x^-))$</label>
          <label class="option"><input type="radio" name="conv4e2" value="wrong"> $f(x^+)$ uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv4e2','conv4fb2','Correct — c\\'est exactement l\\'énoncé du théorème de Dirichlet : en un point de discontinuité, la série de Fourier converge vers la demi-somme des limites à gauche et à droite.','Relis précisément l\\'énoncé du théorème de Dirichlet dans le cas où f n\\'est pas continue en x.')">Vérifier</button>
        <div class="feedback" id="conv4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour appliquer le théorème de Dirichlet à une fonction $f$, il faut vérifier qu'elle est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv4e3" value="wrong"> uniquement continue sur $\\mathbb{R}$</label>
          <label class="option"><input type="radio" name="conv4e3" value="right"> $2\\pi$-périodique et de classe $C^1$ par morceaux</label>
          <label class="option"><input type="radio" name="conv4e3" value="wrong"> bornée sur $\\mathbb{R}$</label>
          <label class="option"><input type="radio" name="conv4e3" value="wrong"> paire ou impaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv4e3','conv4fb3','Correct — ce sont exactement les deux hypothèses du théorème de Dirichlet : périodicité 2π et régularité C¹ par morceaux.','Relis les hypothèses exactes énoncées au début du théorème de Dirichlet.')">Vérifier</button>
        <div class="feedback" id="conv4fb3"></div>
      </div>
    </div>
  `
};

CONV_NOVA_KB[convKey('Séries de Fourier')] = {
  intro: "Salut, moi c'est Nova ! On termine la partie Convergence avec les séries de Fourier : coefficients, écriture trigonométrique, théorème de Dirichlet. Demande-moi la formule des coefficients, ou ce qui se passe en un point de discontinuité.",
  rules: [
    { test:/coefficient/i, replies:["Les coefficients trigonométriques : an(f)=(1/π)∫f(x)cos(nx)dx, bn(f)=(1/π)∫f(x)sin(nx)dx. Les coefficients exponentiels cn(f)=(1/2π)∫f(x)e^(-inx)dx sont équivalents, reliés par les formules d'Euler."] },
    { test:/parit[ée]|paire|impaire/i, replies:["Si f est paire, bn=0 pour tout n (série de cosinus). Si f est impaire, an=0 pour tout n (série de sinus). Exploiter cette symétrie simplifie énormément les calculs."] },
    { test:/dirichlet/i, replies:["Le théorème de Dirichlet : si f est 2π-périodique et C¹ par morceaux, sa série de Fourier converge vers f(x) là où f est continue, et vers la demi-somme (f(x+)+f(x-))/2 aux points de discontinuité."] },
    { test:/somme.*s[ée]rie num[ée]rique|pi.?2\/6|euler/i, replies:["En évaluant l'égalité de Dirichlet en un point bien choisi (souvent x=0 ou x=π), on peut calculer des sommes de séries numériques classiques, comme Σ1/n²=π²/6, le célèbre résultat d'Euler."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense à la remarque sur la parité.","Indice niveau 2 : que deviennent les coefficients bn quand f est paire ?","Indice niveau 3 : ils sont tous nuls, il ne reste que les cosinus."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis précisément le cas de discontinuité dans le théorème de Dirichlet.","Indice niveau 2 : ce n'est ni f(x) ni 0.","Indice niveau 3 : c'est la demi-somme des limites à gauche et à droite, (f(x+)+f(x-))/2."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis les deux hypothèses exactes du théorème de Dirichlet.","Indice niveau 2 : l'une porte sur la période, l'autre sur la régularité.","Indice niveau 3 : f doit être 2π-périodique et de classe C¹ par morceaux."] }
  ]
};

/* =========================== CHAPITRE 5 — Espaces vectoriels normés =========================== */
CONV_CHAPTERS[convKey('Espaces vectoriels normés')] = {
  objectives: [
    "Vérifier qu'une application définit bien une norme sur un espace vectoriel",
    "Manipuler les trois normes usuelles $\\|\\cdot\\|_1$, $\\|\\cdot\\|_2$, $\\|\\cdot\\|_\\infty$ sur $\\mathbb{R}^n$",
    "Définir une distance et la distance associée à une norme",
    "Étudier la convergence d'une suite de $\\mathbb{R}^n$ via ses suites composantes"
  ],
  prereqs: ["Algèbre linéaire (espaces vectoriels)", "Suites numériques réelles"],
  bodyHtml: `
    <p>Ce chapitre introduit le cadre géométrique indispensable à l'étude des fonctions de plusieurs variables : les <strong>espaces vectoriels normés</strong>, qui généralisent la notion de « longueur » d'un vecteur, et permettent de définir limites et continuité en dimension quelconque.</p>

    <h3>1. Norme et espace normé</h3>
    <p>Une application $N:E\\to\\mathbb{R}$ est une <strong>norme</strong> sur un $\\mathbb{K}$-espace vectoriel $E$ si elle vérifie :</p>
    <ol>
      <li><strong>Séparation</strong> : $\\forall x\\in E,\\ N(x)\\geq 0$ et $N(x)=0 \\iff x=0_E$ ;</li>
      <li><strong>Homogénéité</strong> : $\\forall (x,\\lambda)\\in E\\times\\mathbb{K},\\ N(\\lambda x)=|\\lambda|N(x)$ ;</li>
      <li><strong>Inégalité triangulaire</strong> : $\\forall (x,y)\\in E\\times E,\\ N(x+y)\\leq N(x)+N(y)$.</li>
    </ol>
    <p>Si $N$ est une norme sur $E$, le couple $(E,N)$ est un <strong>espace vectoriel normé</strong>.</p>

    <h3>2. Les trois normes usuelles de $\\mathbb{R}^n$</h3>
    <p>Pour $x=(x_1,\\dots,x_n)\\in\\mathbb{R}^n$ :</p>
    <table class="mini-table">
      <tr><th>Norme</th><th>Formule</th><th>Nom</th></tr>
      <tr><td>$\\|x\\|_1$</td><td>$\\displaystyle\\sum_{i=1}^n |x_i|=|x_1|+|x_2|+\\cdots+|x_n|$</td><td>Norme 1 (« taxicab »)</td></tr>
      <tr><td>$\\|x\\|_2$</td><td>$\\displaystyle\\sqrt{\\sum_{i=1}^n |x_i|^2}=\\sqrt{x_1^2+x_2^2+\\cdots+x_n^2}$</td><td>Norme euclidienne</td></tr>
      <tr><td>$\\|x\\|_\\infty$</td><td>$\\displaystyle\\max_{1\\leq i\\leq n}(|x_i|)=\\max\\{|x_1|,\\dots,|x_n|\\}$</td><td>Norme infinie (sup)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ces trois normes sont toujours <strong>équivalentes</strong> sur $\\mathbb{R}^n$ (comme toutes les normes en dimension finie) : elles définissent donc la même notion de convergence, de limite et de continuité, bien qu'elles diffèrent numériquement.
    </div>

    <h3>3. Distance et espace métrique</h3>
    <p>Une application $d:E\\times E\\to\\mathbb{R}^+$ est une <strong>distance</strong> (ou métrique) sur $E$ si :</p>
    <ol>
      <li>$d(x,y)=0 \\iff x=y$ ;</li>
      <li>$\\forall (x,y)\\in E^2,\\ d(x,y)=d(y,x)$ (symétrie) ;</li>
      <li>$\\forall (x,y,z)\\in E^3,\\ d(x,y)\\leq d(x,z)+d(z,y)$ (inégalité triangulaire).</li>
    </ol>
    <p>Si $d$ est une distance sur $E$, le couple $(E,d)$ est un <strong>espace métrique</strong>.</p>

    <h3>4. Distance associée à une norme</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème</span>
      Soit $(E,\\|\\cdot\\|)$ un espace vectoriel normé. Alors l'application $d:E\\times E\\to\\mathbb{R},\\ (x,y)\\mapsto d(x,y)=\\|x-y\\|$ est une distance sur $E$, appelée <strong>distance associée</strong> à la norme $\\|\\cdot\\|$.
    </div>
    <p>Toute norme induit donc naturellement une structure d'espace métrique — c'est via cette distance que l'on définit boules, voisinages, limites et continuité dans un espace vectoriel normé.</p>

    <h3>5. Convergence des suites de $\\mathbb{R}^n$</h3>
    <p>Une <strong>suite d'éléments de $\\mathbb{R}^n$</strong> est une application $u:I\\subset\\mathbb{N}\\to\\mathbb{R}^n$, $k\\mapsto u(k)\\equiv u_k=(u_{k_1},u_{k_2},\\dots,u_{k_n})$. Les suites numériques $(u_{k_i})_{k\\in I}$, pour $i\\in\\{1,\\dots,n\\}$, sont les <strong>suites composantes</strong> de $(u_k)_{k\\in I}$.</p>
    <div class="key-point">
      <span class="eyebrow">Théorème (convergence coordonnée par coordonnée)</span>
      Une suite $(u_k)$ de $\\mathbb{R}^n$ converge vers $\\ell=(\\ell_1,\\dots,\\ell_n)$ pour l'une des normes usuelles si et seulement si <strong>chacune de ses suites composantes</strong> $(u_{k_i})_k$ converge vers $\\ell_i$, pour tout $i\\in\\{1,\\dots,n\\}$.
    </div>
    <p>Ce résultat, conséquence directe de l'équivalence des normes en dimension finie, ramène l'étude de la convergence d'une suite vectorielle à celle, bien connue, de $n$ suites numériques indépendantes.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Norme $N$ : séparation ($N(x)=0\\iff x=0$), homogénéité ($N(\\lambda x)=|\\lambda|N(x)$), inégalité triangulaire</li>
        <li>Trois normes usuelles sur $\\mathbb{R}^n$ : $\\|x\\|_1=\\sum|x_i|$, $\\|x\\|_2=\\sqrt{\\sum x_i^2}$, $\\|x\\|_\\infty=\\max|x_i|$ — toutes équivalentes en dimension finie</li>
        <li>Distance $d$ : $d(x,y)=0\\iff x=y$, symétrie, inégalité triangulaire ; toute norme induit une distance $d(x,y)=\\|x-y\\|$</li>
        <li>Une suite de $\\mathbb{R}^n$ converge (pour n'importe quelle norme usuelle) ssi chacune de ses suites composantes converge, coordonnée par coordonnée</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de vérifier la condition de séparation ($N(x)=0\\Rightarrow x=0$, pas seulement $N(x)\\geq 0$) en montrant qu'une application est une norme</li>
        <li>Confondre norme et distance : une norme mesure la « taille » d'un vecteur, une distance mesure l'écart entre deux points ; toute norme induit une distance, mais l'inverse n'est pas automatique</li>
        <li>Croire que le résultat de convergence coordonnée par coordonnée dépend de la norme choisie : en dimension finie, toutes les normes usuelles donnent la même notion de convergence</li>
        <li>Confondre $\\|x\\|_1$ (somme des valeurs absolues) et $\\|x\\|_2$ (racine de la somme des carrés) : ce sont deux normes distinctes qui donnent des valeurs numériques différentes</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $x=(3,-4)\\in\\mathbb{R}^2$, la norme euclidienne $\\|x\\|_2$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv5e1" value="wrong"> $7$</label>
          <label class="option"><input type="radio" name="conv5e1" value="right"> $5$</label>
          <label class="option"><input type="radio" name="conv5e1" value="wrong"> $4$</label>
          <label class="option"><input type="radio" name="conv5e1" value="wrong"> $25$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv5e1','conv5fb1','Correct — ||x||2=√(3²+(-4)²)=√(9+16)=√25=5.','Utilise la formule ||x||2=√(x1²+x2²) avec x1=3 et x2=-4.')">Vérifier</button>
        <div class="feedback" id="conv5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une norme $N$ sur $E$ doit obligatoirement vérifier :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv5e2" value="wrong"> $N(x+y)\\geq N(x)+N(y)$</label>
          <label class="option"><input type="radio" name="conv5e2" value="right"> $N(x+y)\\leq N(x)+N(y)$</label>
          <label class="option"><input type="radio" name="conv5e2" value="wrong"> $N(x+y) = N(x)+N(y)$</label>
          <label class="option"><input type="radio" name="conv5e2" value="wrong"> $N(\\lambda x)=\\lambda N(x)$ pour tout $\\lambda$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv5e2','conv5fb2','Correct — c\\'est l\\'inégalité triangulaire, l\\'un des trois axiomes fondamentaux d\\'une norme.','Rappelle-toi les trois axiomes d\\'une norme : l\\'un d\\'eux porte sur N(x+y), sous forme d\\'inégalité.')">Vérifier</button>
        <div class="feedback" id="conv5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une suite $(u_k)$ de $\\mathbb{R}^n$ converge vers $\\ell$ si et seulement si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv5e3" value="wrong"> au moins une suite composante converge vers la coordonnée correspondante de $\\ell$</label>
          <label class="option"><input type="radio" name="conv5e3" value="right"> chacune de ses suites composantes converge vers la coordonnée correspondante de $\\ell$</label>
          <label class="option"><input type="radio" name="conv5e3" value="wrong"> $\\|u_k\\|_1$ converge vers $0$</label>
          <label class="option"><input type="radio" name="conv5e3" value="wrong"> aucune condition supplémentaire n'est nécessaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv5e3','conv5fb3','Correct — c\\'est le théorème du cours : la convergence dans Rⁿ équivaut exactement à la convergence coordonnée par coordonnée, pour TOUTES les suites composantes.','Relis le théorème de convergence coordonnée par coordonnée : faut-il UNE ou TOUTES les suites composantes convergentes ?')">Vérifier</button>
        <div class="feedback" id="conv5fb3"></div>
      </div>
    </div>
  `
};

CONV_NOVA_KB[convKey('Espaces vectoriels normés')] = {
  intro: "Salut, moi c'est Nova ! On entame la partie Fonctions de plusieurs variables avec les espaces vectoriels normés : normes, distances, convergence dans Rⁿ. Demande-moi les axiomes d'une norme ou comment fonctionne la convergence coordonnée par coordonnée.",
  rules: [
    { test:/norme|axiome/i, replies:["Une norme N vérifie 3 axiomes : séparation (N(x)=0 ⟺ x=0), homogénéité (N(λx)=|λ|N(x)), et inégalité triangulaire (N(x+y)≤N(x)+N(y))."] },
    { test:/norme 1|norme euclidienne|norme infinie|\\|\\|.*1|\\|\\|.*2|\\|\\|.*infini/i, replies:["Les trois normes usuelles sur Rⁿ : ||x||1=Σ|xi| (somme des valeurs absolues), ||x||2=√(Σxi²) (norme euclidienne), ||x||∞=max|xi| (norme sup). Elles sont toutes équivalentes en dimension finie."] },
    { test:/distance|m[ée]trique/i, replies:["Une distance d vérifie d(x,y)=0⟺x=y, symétrie d(x,y)=d(y,x), et inégalité triangulaire. Toute norme N induit une distance d(x,y)=N(x-y)."] },
    { test:/convergence.*rn|suite compos|coordonn[ée]e par coordonn[ée]e/i, replies:["Une suite de Rⁿ converge vers ℓ ssi TOUTES ses suites composantes convergent vers les coordonnées correspondantes de ℓ. C'est une conséquence de l'équivalence des normes en dimension finie."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique la formule de la norme euclidienne.","Indice niveau 2 : calcule x1²+x2² avec x=(3,-4).","Indice niveau 3 : 3²+(-4)²=9+16=25, donc ||x||2=√25=5."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense aux 3 axiomes d'une norme.","Indice niveau 2 : l'un d'eux porte sur N(x+y), sous forme d'inégalité et pas d'égalité.","Indice niveau 3 : c'est l'inégalité triangulaire N(x+y)≤N(x)+N(y)."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis bien le théorème sur la convergence dans Rⁿ.","Indice niveau 2 : faut-il UNE seule ou TOUTES les suites composantes convergentes ?","Indice niveau 3 : c'est TOUTES les suites composantes, chacune vers la coordonnée correspondante de ℓ."] }
  ]
};

/* =========================== CHAPITRE 6 — Calcul différentiel =========================== */
CONV_CHAPTERS[convKey('Calcul différentiel')] = {
  objectives: [
    "Déterminer le domaine de définition d'une fonction de plusieurs variables et calculer une limite (méthode des coordonnées polaires)",
    "Calculer dérivées partielles, différentielle, gradient et matrice jacobienne d'une fonction",
    "Calculer dérivées partielles d'ordre 2, matrice hessienne et développement de Taylor à l'ordre 2",
    "Manipuler les opérateurs nabla, rotationnel, divergence et laplacien",
    "Déterminer et classifier les points critiques (minimum, maximum, point selle) d'une fonction de plusieurs variables"
  ],
  prereqs: ["Espaces vectoriels normés", "Dérivation des fonctions d'une variable", "Algèbre linéaire (valeurs propres)"],
  bodyHtml: `
    <p>Ce chapitre central généralise toute la théorie de la dérivation à des fonctions de plusieurs variables réelles. Il introduit les outils — dérivées partielles, différentielle, gradient, hessienne — indispensables pour étudier la variation locale et les extrema de telles fonctions.</p>

    <h3>1. Fonctions de plusieurs variables réelles</h3>
    <p>On distingue deux types de fonctions :</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Notation</th><th>Domaine de définition</th></tr>
      <tr><td>Fonction numérique (scalaire)</td><td>$f:U\\subset\\mathbb{R}^n\\to\\mathbb{R}$</td><td>$D_f=\\{x\\in U\\ ;\\ f(x)\\in\\mathbb{R}\\}$</td></tr>
      <tr><td>Fonction vectorielle</td><td>$g:U\\subset\\mathbb{R}^n\\to\\mathbb{R}^m$, $g=(g_1,\\dots,g_m)$</td><td>$D_g=\\bigcap_{i=1}^m D_{g_i}$ (intersection des domaines des applications composantes)</td></tr>
    </table>

    <h3>2. Limite en un point</h3>
    <p>Soit $f:U\\to\\mathbb{R}$, éventuellement non définie en $a$. On dit que $\\displaystyle\\lim_{x\\to a} f(x)=\\ell$ si : $\\forall\\varepsilon>0,\\ \\exists\\delta>0,\\ (x\\in U\\setminus\\{a\\}$ et $\\|x-a\\|<\\delta) \\Rightarrow |f(x)-\\ell|<\\varepsilon$ (avec des définitions analogues pour les limites infinies).</p>
    <div class="key-point">
      <span class="eyebrow">Méthode pratique : coordonnées polaires</span>
      Pour $(a,b)\\in\\mathbb{R}^2$, en posant $x=a+r\\cos\\theta,\\ y=b+r\\sin\\theta$ ($r>0,\\theta\\in[0,2\\pi[$) :
      $$\\lim_{(x,y)\\to(a,b)} f(x,y)=\\lim_{\\substack{r\\to 0 \\\\ \\forall\\theta}} f\\big[a+r\\cos\\theta,\\ b+r\\sin\\theta\\big]$$
      Si la limite obtenue en polaires dépend de $\\theta$, la limite (en deux variables) n'existe pas.
    </div>

    <h3>3. Dérivées partielles</h3>
    <p>Pour $f:\\mathbb{R}^2\\to\\mathbb{R}$ et $(a,b)\\in D_f$ :</p>
    <p>$$\\dfrac{\\partial f}{\\partial x}(a,b)=\\lim_{t\\to 0}\\dfrac{f(a+t,b)-f(a,b)}{t}, \\qquad \\dfrac{\\partial f}{\\partial y}(a,b)=\\lim_{t\\to 0}\\dfrac{f(a,b+t)-f(a,b)}{t}$$</p>
    <p>C'est-à-dire : la dérivée « habituelle » de $f$ par rapport à une seule variable, les autres étant fixées. La définition se généralise sans difficulté à $n$ variables.</p>

    <h3>4. Différentiabilité en un point</h3>
    <p>$f:U\\subset\\mathbb{R}^n\\to\\mathbb{R}$ est <strong>différentiable</strong> au point $a$ s'il existe une application linéaire $L_a:\\mathbb{R}^n\\to\\mathbb{R}$ et une fonction $\\varepsilon:\\mathbb{R}^n\\to\\mathbb{R}$ telles que $\\lim_{h\\to 0}\\varepsilon(h)=0$ et, pour tout $h$ avec $a+h\\in U$ :</p>
    <p>$$f(a+h)=f(a)+L_a(h)+\\|h\\|\\varepsilon(h)$$</p>
    <p>$L_a$ est alors appelée <strong>différentielle</strong> de $f$ en $a$, notée $df_a$ (ou $f'(a)$).</p>
    <div class="key-point">
      <span class="eyebrow">Proposition</span>
      Si $f$ est différentiable en $a$, alors toutes ses dérivées partielles en $a$ existent, et :
      $$df_a(h)=\\sum_{i=1}^n h_i\\,\\dfrac{\\partial f}{\\partial x_i}(a), \\qquad h=(h_1,\\dots,h_n)$$
    </div>
    <p><strong>Attention</strong> : la réciproque est fausse en général — l'existence de toutes les dérivées partielles n'entraîne pas la différentiabilité (ni même la continuité !).</p>

    <h3>5. Vecteur gradient</h3>
    <p>Pour $f:U\\subset\\mathbb{R}^n\\to\\mathbb{R}$ et $a\\in U$, le <strong>gradient</strong> de $f$ en $a$ est le vecteur :</p>
    <p>$$\\nabla f(a)=\\Big(\\dfrac{\\partial f}{\\partial x_1}(a),\\dfrac{\\partial f}{\\partial x_2}(a),\\dots,\\dfrac{\\partial f}{\\partial x_n}(a)\\Big)$$</p>
    <p>Si $f$ est différentiable en $a$, la différentielle s'exprime comme un produit scalaire : $df_a(h)=\\nabla f(a)\\cdot h=\\sum_{i=1}^n h_i\\dfrac{\\partial f}{\\partial x_i}(a)$.</p>

    <h3>6. Matrice jacobienne</h3>
    <p>Pour $f:U\\subset\\mathbb{R}^n\\to\\mathbb{R}^m$, la <strong>matrice jacobienne</strong> de $f$ en $x_0$ est la matrice $(m,n)$ :</p>
    <p>$$J_f(x_0)=\\Big(\\dfrac{\\partial f_i}{\\partial x_j}(x_0)\\Big)_{\\substack{1\\leq i\\leq m\\\\ 1\\leq j\\leq n}}$$</p>
    <p>Chaque ligne correspond aux dérivées partielles d'une application composante $f_i$ ; le cas $m=1$ redonne exactement le vecteur gradient (transposé).</p>

    <h3>7. Dérivées partielles d'ordre 2 et matrice hessienne</h3>
    <p>On définit, quand elle existe, $\\dfrac{\\partial^2 f}{\\partial x_i \\partial x_j}(a)=\\dfrac{\\partial}{\\partial x_i}\\Big(\\dfrac{\\partial f}{\\partial x_j}\\Big)(a)$. La <strong>matrice hessienne</strong> de $f$ en $a$ est :</p>
    <p>$$\\mathrm{Hess}(f)(a)=\\Big(\\dfrac{\\partial^2 f}{\\partial x_i \\partial x_j}(a)\\Big)_{\\substack{1\\leq i\\leq n\\\\ 1\\leq j\\leq n}}$$</p>
    <div class="key-point">
      <span class="eyebrow">Attention aux dérivées croisées</span>
      Les dérivées partielles croisées $\\dfrac{\\partial^2 f}{\\partial x\\partial y}$ et $\\dfrac{\\partial^2 f}{\\partial y\\partial x}$ ne sont pas toujours égales ! Ceci n'est garanti (théorème de Schwarz) que sous une hypothèse de régularité suffisante (classe $C^2$) — un contre-exemple classique existe pour la fonction $f(x,y)=\\dfrac{xy^3}{x^2+y^2}$ en $(0,0)$.
    </div>

    <h3>8. Formule de Taylor à l'ordre 2</h3>
    <p>Pour $f:U\\subset\\mathbb{R}^2\\to\\mathbb{R}$ de classe $C^2$, $a\\in U$, $h=(h_1,h_2)$ avec $[a,a+h]\\subset U$ :</p>
    <p>$$f(a+h)=f(a)+h_1\\dfrac{\\partial f}{\\partial x}(a)+h_2\\dfrac{\\partial f}{\\partial y}(a)+\\dfrac12 h_1^2\\dfrac{\\partial^2 f}{\\partial x^2}(a)+h_1h_2\\dfrac{\\partial^2 f}{\\partial x\\partial y}(a)+\\dfrac12 h_2^2\\dfrac{\\partial^2 f}{\\partial y^2}(a)+o(\\|h\\|^2)$$</p>

    <h3>9. Opérateurs différentiels classiques</h3>
    <table class="mini-table">
      <tr><th>Opérateur</th><th>Notation</th><th>Définition</th></tr>
      <tr><td>Nabla</td><td>$\\nabla$</td><td>$\\Big(\\dfrac{\\partial}{\\partial x_1},\\dots,\\dfrac{\\partial}{\\partial x_n}\\Big)$</td></tr>
      <tr><td>Gradient</td><td>$\\nabla f$</td><td>$\\Big(\\dfrac{\\partial f}{\\partial x_1},\\dots,\\dfrac{\\partial f}{\\partial x_n}\\Big)$, pour $f$ scalaire</td></tr>
      <tr><td>Rotationnel (dim 3)</td><td>$\\overrightarrow{\\mathrm{rot}}(F)=\\nabla\\wedge F$</td><td>$\\Big(\\dfrac{\\partial f_3}{\\partial y}-\\dfrac{\\partial f_2}{\\partial z}\\Big)\\vec{i}-\\Big(\\dfrac{\\partial f_3}{\\partial x}-\\dfrac{\\partial f_1}{\\partial z}\\Big)\\vec{j}+\\Big(\\dfrac{\\partial f_2}{\\partial x}-\\dfrac{\\partial f_1}{\\partial y}\\Big)\\vec{k}$</td></tr>
      <tr><td>Divergence</td><td>$\\mathrm{div}(g)=\\nabla\\cdot g$</td><td>$\\displaystyle\\sum_{i=1}^n \\dfrac{\\partial g_i}{\\partial x_i}$, pour $g$ de classe $C^1$, $g:\\mathbb{R}^n\\to\\mathbb{R}^n$</td></tr>
      <tr><td>Laplacien</td><td>$\\Delta f=\\mathrm{div}(\\nabla f)$</td><td>$\\displaystyle\\sum_{i=1}^n \\dfrac{\\partial^2 f}{\\partial x_i^2}$, pour $f$ de classe $C^2$</td></tr>
    </table>

    <h3>10. Points critiques et extrema</h3>
    <div class="key-point">
      <span class="eyebrow">Condition nécessaire</span>
      Si $f:U\\subset\\mathbb{R}^n\\to\\mathbb{R}$ de classe $C^1$ admet un extremum local en $x_0\\in U$, alors $x_0$ est un <strong>point critique</strong> de $f$, c'est-à-dire $\\nabla f(x_0)=0_{\\mathbb{R}^n}$. Attention, la réciproque est fausse : un point critique n'est pas nécessairement un extremum (cf. point selle).
    </div>
    <p><strong>Méthode</strong> : (1) chercher les points critiques (résoudre $\\nabla f=0$) ; (2) déterminer la nature de chaque point critique.</p>
    <div class="key-point">
      <span class="eyebrow">Classification par les valeurs propres de la hessienne</span>
      Soit $x_0$ un point critique de $f$ :
      <ul>
        <li>toutes les valeurs propres de $\\mathrm{Hess}(f)(x_0)$ strictement positives $\\Rightarrow$ <strong>minimum local</strong> ;</li>
        <li>toutes strictement négatives $\\Rightarrow$ <strong>maximum local</strong> ;</li>
        <li>certaines positives, d'autres négatives $\\Rightarrow$ <strong>point selle</strong> (ou point col) ;</li>
        <li>au moins une valeur propre nulle $\\Rightarrow$ on ne peut rien conclure directement (étude complémentaire nécessaire, ex. via Taylor).</li>
      </ul>
    </div>

    <h3>11. Cas particulier de deux variables</h3>
    <p>Pour $f:U\\subset\\mathbb{R}^2\\to\\mathbb{R}$ et un point critique $(x_0,y_0)$, on pose $A=\\dfrac{\\partial^2 f}{\\partial x^2}(x_0,y_0)$, $B=\\dfrac{\\partial^2 f}{\\partial x\\partial y}(x_0,y_0)$, $C=\\dfrac{\\partial^2 f}{\\partial y^2}(x_0,y_0)$, et $\\Delta=-\\det(\\mathrm{Hess}(f)(x_0,y_0))=B^2-AC$.</p>
    <table class="mini-table">
      <tr><th>Cas</th><th>Nature de $(x_0,y_0)$</th></tr>
      <tr><td>$\\Delta<0$ et $A<0$</td><td>Maximum local</td></tr>
      <tr><td>$\\Delta<0$ et $A>0$</td><td>Minimum local</td></tr>
      <tr><td>$\\Delta>0$</td><td>Point selle (ni maximum, ni minimum)</td></tr>
      <tr><td>$\\Delta=0$</td><td>On ne peut rien conclure directement</td></tr>
    </table>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Différentiabilité en $a$ : $f(a+h)=f(a)+L_a(h)+\\|h\\|\\varepsilon(h)$, $\\varepsilon(h)\\to 0$ ; entraîne existence des dérivées partielles avec $df_a(h)=\\sum h_i\\partial f/\\partial x_i(a)$</li>
        <li>Gradient $\\nabla f(a)$ ; matrice jacobienne $J_f(x_0)=(\\partial f_i/\\partial x_j)$ ; matrice hessienne $\\mathrm{Hess}(f)(a)=(\\partial^2 f/\\partial x_i\\partial x_j)$</li>
        <li>Dérivées croisées $\\partial^2 f/\\partial x\\partial y$ et $\\partial^2 f/\\partial y\\partial x$ ne sont pas toujours égales, seulement sous hypothèse de régularité suffisante</li>
        <li>Opérateurs : nabla $\\nabla$, gradient $\\nabla f$, rotationnel $\\nabla\\wedge F$ (dim 3), divergence $\\nabla\\cdot g$, laplacien $\\Delta f=\\mathrm{div}(\\nabla f)$</li>
        <li>Extremum local $\\Rightarrow$ point critique ($\\nabla f=0$), mais réciproque fausse (points selle)</li>
        <li>Nature d'un point critique via les valeurs propres de la hessienne (toutes >0 : min, toutes <0 : max, mixtes : selle)</li>
        <li>Cas $n=2$ : $\\Delta=B^2-AC$ ; $\\Delta<0,A<0$ : max ; $\\Delta<0,A>0$ : min ; $\\Delta>0$ : point selle ; $\\Delta=0$ : indéterminé</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'existence des dérivées partielles implique la différentiabilité : c'est faux en général, la différentiabilité est une condition plus forte</li>
        <li>Oublier de vérifier la régularité $C^2$ avant d'affirmer l'égalité des dérivées croisées (théorème de Schwarz)</li>
        <li>Confondre point critique et extremum : tout extremum est un point critique, mais un point critique peut être un simple point selle</li>
        <li>Dans le cas $n=2$, se tromper de signe dans $\\Delta=B^2-AC$ (et non $AC-B^2$), ce qui inverse toute la conclusion</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Si $f$ est différentiable en $a$, alors sa différentielle $df_a(h)$ s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv6e1" value="wrong"> $\\|h\\|^2$</label>
          <label class="option"><input type="radio" name="conv6e1" value="right"> $\\sum_{i=1}^n h_i \\dfrac{\\partial f}{\\partial x_i}(a)$</label>
          <label class="option"><input type="radio" name="conv6e1" value="wrong"> $f(a)+\\|h\\|$</label>
          <label class="option"><input type="radio" name="conv6e1" value="wrong"> $\\nabla f(a)$ uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv6e1','conv6fb1','Correct — c\\'est exactement la formule de la différentielle en fonction des dérivées partielles, valable dès que f est différentiable en a.','Relis la proposition qui relie différentiabilité et dérivées partielles : quelle est la formule exacte de dfa(h) ?')">Vérifier</button>
        <div class="feedback" id="conv6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">En un point critique $x_0$ d'une fonction $f:\\mathbb{R}^n\\to\\mathbb{R}$, si la matrice hessienne a des valeurs propres à la fois strictement positives et strictement négatives, alors $x_0$ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv6e2" value="wrong"> un minimum local</label>
          <label class="option"><input type="radio" name="conv6e2" value="wrong"> un maximum local</label>
          <label class="option"><input type="radio" name="conv6e2" value="right"> un point selle</label>
          <label class="option"><input type="radio" name="conv6e2" value="wrong"> on ne peut rien dire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv6e2','conv6fb2','Correct — un mélange de valeurs propres positives et négatives caractérise exactement un point selle : ni maximum, ni minimum.','Relis la classification par les valeurs propres de la hessienne : que se passe-t-il quand les signes sont mélangés ?')">Vérifier</button>
        <div class="feedback" id="conv6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $f:\\mathbb{R}^2\\to\\mathbb{R}$ en un point critique où $\\Delta=B^2-AC>0$, le point est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv6e3" value="wrong"> un maximum local</label>
          <label class="option"><input type="radio" name="conv6e3" value="wrong"> un minimum local</label>
          <label class="option"><input type="radio" name="conv6e3" value="right"> un point selle</label>
          <label class="option"><input type="radio" name="conv6e3" value="wrong"> indéterminé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv6e3','conv6fb3','Correct — d\\'après le tableau du cours, Δ>0 correspond toujours à un point selle, ni maximum ni minimum.','Relis le tableau de classification pour n=2 : que dit-on quand Δ=B²-AC>0 ?')">Vérifier</button>
        <div class="feedback" id="conv6fb3"></div>
      </div>
    </div>
  `
};

CONV_NOVA_KB[convKey('Calcul différentiel')] = {
  intro: "Salut, moi c'est Nova ! On attaque le calcul différentiel en plusieurs variables : dérivées partielles, différentiabilité, gradient, hessienne, opérateurs différentiels et classification des extrema. Demande-moi la formule du gradient, la règle Δ=B²-AC, ou une aide sur les exercices.",
  rules: [
    { test:/d[ée]riv[ée]e partielle/i, replies:["La dérivée partielle ∂f/∂x(a,b) est la dérivée de f par rapport à x, l'autre variable y étant fixée : ∂f/∂x(a,b)=lim(t→0)[f(a+t,b)-f(a,b)]/t."] },
    { test:/diff[ée]rentiabilit[ée]|diff[ée]rentielle/i, replies:["f est différentiable en a s'il existe une application linéaire La et ε(h)→0 tels que f(a+h)=f(a)+La(h)+||h||ε(h). Si f est différentiable, dfa(h)=Σhi∂f/∂xi(a). Attention : l'existence des dérivées partielles seules ne suffit pas."] },
    { test:/gradient/i, replies:["Le gradient ∇f(a) est le vecteur des dérivées partielles (∂f/∂x1(a),...,∂f/∂xn(a)). Si f est différentiable, dfa(h)=∇f(a)·h (produit scalaire)."] },
    { test:/jacobienne/i, replies:["La matrice jacobienne Jf(x0) de f:Rⁿ→Rᵐ est la matrice (m,n) des ∂fi/∂xj(x0). Pour m=1, elle redonne le gradient (sous forme de ligne)."] },
    { test:/hessienne/i, replies:["La matrice hessienne Hess(f)(a) contient les dérivées partielles secondes ∂²f/∂xi∂xj(a). Elle sert à classifier les points critiques via ses valeurs propres."] },
    { test:/schwarz|d[ée]riv[ée]es crois[ée]es/i, replies:["Les dérivées croisées ∂²f/∂x∂y et ∂²f/∂y∂x ne sont pas toujours égales ! Le théorème de Schwarz garantit leur égalité seulement sous hypothèse de régularité C² suffisante."] },
    { test:/taylor/i, replies:["La formule de Taylor à l'ordre 2 en dimension 2 : f(a+h)=f(a)+h1∂f/∂x(a)+h2∂f/∂y(a)+½h1²∂²f/∂x²(a)+h1h2∂²f/∂x∂y(a)+½h2²∂²f/∂y²(a)+o(||h||²)."] },
    { test:/nabla|rotationnel|divergence|laplacien/i, replies:["Nabla ∇=(∂/∂x1,...,∂/∂xn). Gradient ∇f, rotationnel ∇∧F (dim 3), divergence ∇·g=Σ∂gi/∂xi, laplacien Δf=div(∇f)=Σ∂²f/∂xi²."] },
    { test:/point critique|extremum/i, replies:["Un point critique vérifie ∇f(x0)=0. Tout extremum local est un point critique (condition nécessaire), mais la réciproque est fausse : un point critique peut être un point selle."] },
    { test:/point selle|delta.*b.?2.*ac|classification/i, replies:["Pour n=2 en un point critique : Δ=B²-AC. Si Δ<0 et A<0 : maximum. Si Δ<0 et A>0 : minimum. Si Δ>0 : point selle. Si Δ=0 : indéterminé, il faut étudier plus finement (ex. par Taylor)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : relis la proposition sur différentiabilité et dérivées partielles.","Indice niveau 2 : la formule fait intervenir une somme sur i.","Indice niveau 3 : dfa(h)=Σ hi ∂f/∂xi(a)."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à la classification par les valeurs propres de la hessienne.","Indice niveau 2 : que se passe-t-il quand les valeurs propres n'ont pas toutes le même signe ?","Indice niveau 3 : c'est le cas du point selle."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis le tableau de classification pour n=2.","Indice niveau 2 : concentre-toi sur le cas Δ>0, indépendamment du signe de A.","Indice niveau 3 : Δ>0 signifie toujours point selle, quel que soit A."] }
  ]
};

/* =========================== CHAPITRE 7 — Formes différentielles et intégrales multiples =========================== */
CONV_CHAPTERS[convKey('Formes différentielles et intégrales multiples')] = {
  objectives: [
    "Définir une forme différentielle et une courbe paramétrée (continue, $C^1$, $C^1$ par morceaux, simple)",
    "Calculer une intégrale curviligne le long d'une courbe paramétrée",
    "Appliquer la formule de Fubini pour calculer une intégrale double sur un rectangle ou un domaine général",
    "Appliquer la formule de Fubini pour calculer une intégrale triple"
  ],
  prereqs: ["Calcul différentiel", "Calcul intégral à une variable"],
  bodyHtml: `
    <p>Ce dernier chapitre étend le calcul intégral aux dimensions supérieures : intégrer le long d'une courbe (intégrale curviligne), sur une surface plane (intégrale double), ou dans un volume (intégrale triple). Ces outils sont à la base de la physique des champs (travail d'une force, flux, etc.).</p>

    <h3>1. Forme différentielle</h3>
    <p>On appelle <strong>forme différentielle</strong> sur un ouvert $U\\subset\\mathbb{R}^2$ toute application $\\omega$ de la forme :</p>
    <p>$$\\omega=P(x,y)\\,dx+Q(x,y)\\,dy$$</p>
    <p>où $P$ et $Q$ sont des fonctions définies sur $U$, à valeurs réelles. Exemples : $\\omega=x\\,dy-y\\,dx$ est définie sur $U=\\mathbb{R}^2$ ; $\\omega=\\dfrac{x\\,dy-y\\,dx}{x^2+y^2}$ est définie sur $U=\\mathbb{R}^2\\setminus\\{(0,0)\\}$.</p>

    <h3>2. Courbes paramétrées</h3>
    <p>Soit $I$ un intervalle de $\\mathbb{R}$.</p>
    <ul>
      <li>Une <strong>courbe paramétrée continue</strong> (resp. de classe $C^1$) est une application $\\gamma:I\\to\\mathbb{R}^2$ continue (resp. $C^1$).</li>
      <li>$\\gamma:[a,b]\\to\\mathbb{R}^2$ est <strong>$C^1$ par morceaux</strong> s'il existe une subdivision $a=a_1<a_2<\\cdots<a_n=b$ telle que la restriction de $\\gamma$ à chaque $[a_i,a_{i+1}]$ soit $C^1$.</li>
      <li>$\\gamma:[a,b]\\to\\mathbb{R}^2$ est <strong>simple</strong> si sa restriction à $]a,b[$ est injective (la courbe ne se recoupe pas elle-même).</li>
    </ul>

    <h3>3. Intégrale curviligne</h3>
    <p>L'<strong>intégrale curviligne</strong> de $\\omega=P\\,dx+Q\\,dy$ le long de $\\gamma:[a,b]\\to\\mathbb{R}^2$, $\\gamma(t)=(x(t),y(t))$, est :</p>
    <p>$$\\int_\\gamma \\omega=\\int_a^b \\Big[P(x(t),y(t))\\,x'(t)+Q(x(t),y(t))\\,y'(t)\\Big]dt$$</p>
    <div class="key-point">
      <span class="eyebrow">Exemples classiques</span>
      <ul>
        <li>Pour $\\omega=x\\,dy-y\\,dx$ le long du cercle $\\gamma(t)=(\\cos t,\\sin t)$, $t\\in[0,2\\pi]$ : $\\displaystyle\\int_\\gamma \\omega=\\int_0^{2\\pi} [\\cos^2 t+\\sin^2 t]\\,dt=2\\pi$</li>
        <li>Pour $\\omega=\\dfrac{x\\,dy-y\\,dx}{x^2+y^2}$ le long du cercle de rayon $R$, $\\gamma(t)=(R\\cos t, R\\sin t)$ : on retrouve encore $\\displaystyle\\int_\\gamma\\omega=2\\pi$, indépendamment de $R$</li>
        <li>L'intégrale de $\\omega=y\\,dx$ le long du graphe $\\mathrm{Gr}(f)$ d'une fonction $f:[a,b]\\to\\mathbb{R}$ de classe $C^1$ vaut simplement $\\displaystyle\\int_{\\mathrm{Gr}(f)}\\omega=\\int_a^b f(t)\\,dt$</li>
      </ul>
    </div>

    <h3>4. Intégrales doubles : formule de Fubini sur un rectangle</h3>
    <div class="key-point">
      <span class="eyebrow">Théorème (Fubini, cas rectangulaire)</span>
      Si $f$ est continue sur $[a,b]\\times[c,d]$, alors :
      $$\\int_a^b\\!\\int_c^d f(x,y)\\,dy\\,dx=\\int_c^d\\!\\int_a^b f(x,y)\\,dx\\,dy$$
    </div>
    <p>Autrement dit, sur un rectangle, l'ordre d'intégration n'a pas d'importance — un résultat très pratique quand une intégration dans un ordre donné est plus simple que dans l'autre.</p>

    <h3>5. Intégrales doubles sur un domaine général</h3>
    <p>Soit $D=\\{(x,y)\\in\\mathbb{R}^2\\ ;\\ a\\leq x\\leq b,\\ f_1(x)\\leq y\\leq f_2(x)\\}=\\{(x,y)\\ ;\\ c\\leq y\\leq d,\\ g_1(y)\\leq x\\leq g_2(y)\\}$ (le même domaine décrit « en tranches verticales » et « en tranches horizontales »). Alors :</p>
    <p>$$\\int_D f(x,y)\\,dx\\,dy=\\int_a^b\\Big(\\int_{f_1(x)}^{f_2(x)} f(x,y)\\,dy\\Big)dx=\\int_c^d\\Big(\\int_{g_1(y)}^{g_2(y)} f(x,y)\\,dx\\Big)dy$$</p>
    <div class="key-point">
      <span class="eyebrow">Méthode pratique</span>
      Face à un domaine $D$, on cherche à le décrire par des bornes explicites dans l'un des deux sens (verticale ou horizontale). Le choix judicieux du sens d'intégration simplifie souvent considérablement le calcul.
    </div>

    <h3>6. Intégrales triples : formule de Fubini</h3>
    <p>Deux façons complémentaires de découper un domaine $D\\subset\\mathbb{R}^3$ :</p>
    <ul>
      <li><strong>par tranches</strong> : $D=\\{(x,y,z)\\ ;\\ z\\in[c,d],\\ (x,y)\\in D_z\\}$, avec $D_z$ un domaine plan dépendant de $z$ ;</li>
      <li><strong>par colonnes verticales</strong> : $D=\\{(x,y,z)\\ ;\\ (x,y)\\in D_1,\\ z\\in[g(x,y),h(x,y)]\\}$, où $D_1$ est un compact élémentaire de $\\mathbb{R}^2$ et $g,h$ sont continues sur $D_1$.</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Théorème (Fubini, cas triple)</span>
      $$\\int_D f(x,y,z)\\,dx\\,dy\\,dz=\\int_c^d\\Big(\\int_{D_z} f(x,y,z)\\,dx\\,dy\\Big)dz=\\int_{D_1}\\Big(\\int_{g(x,y)}^{h(x,y)} f(x,y,z)\\,dz\\Big)dx\\,dy$$
    </div>
    <p>Comme pour les intégrales doubles, l'astuce méthodologique consiste à choisir la description du domaine (par tranches horizontales en $z$, ou par colonnes verticales) qui rend le calcul le plus simple possible.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Forme différentielle $\\omega=P\\,dx+Q\\,dy$ ; courbe paramétrée continue / $C^1$ / $C^1$ par morceaux / simple (sans auto-intersection sur $]a,b[$)</li>
        <li>Intégrale curviligne : $\\int_\\gamma\\omega=\\int_a^b[P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)]dt$</li>
        <li>Fubini sur un rectangle : $\\int_a^b\\int_c^d f\\,dy\\,dx=\\int_c^d\\int_a^b f\\,dx\\,dy$, l'ordre d'intégration n'a pas d'importance</li>
        <li>Fubini sur un domaine général : décomposer $D$ en tranches verticales ($a\\leq x\\leq b$, $f_1(x)\\leq y\\leq f_2(x)$) ou horizontales, selon ce qui simplifie le calcul</li>
        <li>Fubini pour les intégrales triples : découpage par tranches en $z$, ou par colonnes verticales au-dessus d'un domaine plan $D_1$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de multiplier par $x'(t)$ et $y'(t)$ dans le calcul d'une intégrale curviligne : on intègre par rapport au paramètre $t$, pas directement par rapport à $x$ et $y$</li>
        <li>Se tromper dans la description d'un domaine $D$ en « tranches verticales » vs « tranches horizontales » : les bornes de la variable intérieure doivent dépendre de la variable extérieure, jamais l'inverse</li>
        <li>Appliquer Fubini sur un domaine non rectangulaire comme si les bornes étaient constantes : sur un domaine général, les bornes intérieures dépendent en général de la variable d'intégration extérieure</li>
        <li>Confondre les deux découpages possibles d'un domaine 3D (tranches en $z$ vs colonnes verticales) et mélanger leurs bornes respectives</li>
      </ul>
    </div>
    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'intégrale curviligne de $\\omega=P\\,dx+Q\\,dy$ le long de $\\gamma(t)=(x(t),y(t))$, $t\\in[a,b]$, est donnée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv7e1" value="wrong"> $\\int_a^b P(x(t),y(t))\\,dt$</label>
          <label class="option"><input type="radio" name="conv7e1" value="right"> $\\int_a^b [P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)]\\,dt$</label>
          <label class="option"><input type="radio" name="conv7e1" value="wrong"> $\\int_a^b [P(x(t),y(t))+Q(x(t),y(t))]\\,dt$</label>
          <label class="option"><input type="radio" name="conv7e1" value="wrong"> $P(b)-P(a)$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv7e1','conv7fb1','Correct — il ne faut jamais oublier de multiplier P et Q respectivement par x\\'(t) et y\\'(t), puisqu\\'on intègre bien par rapport au paramètre t.','Repense à la formule exacte : on intègre par rapport à t, donc il faut faire apparaître x\\'(t) et y\\'(t) dans l\\'intégrande.')">Vérifier</button>
        <div class="feedback" id="conv7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">D'après la formule de Fubini sur un rectangle $[a,b]\\times[c,d]$, pour $f$ continue :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv7e2" value="wrong"> l'ordre d'intégration change la valeur de l'intégrale</label>
          <label class="option"><input type="radio" name="conv7e2" value="right"> l'ordre d'intégration n'a pas d'importance</label>
          <label class="option"><input type="radio" name="conv7e2" value="wrong"> on ne peut intégrer que dans l'ordre $dy\\,dx$</label>
          <label class="option"><input type="radio" name="conv7e2" value="wrong"> le théorème ne s'applique que si $f$ est positive</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv7e2','conv7fb2','Correct — sur un rectangle, avec f continue, la formule de Fubini garantit que les deux ordres d\\'intégration donnent exactement la même valeur.','Relis l\\'énoncé du théorème de Fubini pour un rectangle : que dit-il sur les deux ordres d\\'intégration possibles ?')">Vérifier</button>
        <div class="feedback" id="conv7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour intégrer sur un domaine $D=\\{(x,y)\\ ;\\ a\\leq x\\leq b,\\ f_1(x)\\leq y\\leq f_2(x)\\}$, les bornes de l'intégration intérieure en $y$ dépendent :</p>
        <div class="options">
          <label class="option"><input type="radio" name="conv7e3" value="wrong"> de rien, elles sont constantes</label>
          <label class="option"><input type="radio" name="conv7e3" value="right"> de la variable $x$</label>
          <label class="option"><input type="radio" name="conv7e3" value="wrong"> de la fonction $f$ à intégrer</label>
          <label class="option"><input type="radio" name="conv7e3" value="wrong"> uniquement de $a$ et $b$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('conv7e3','conv7fb3','Correct — sur un domaine non rectangulaire décrit en tranches verticales, les bornes de la variable intérieure y (à savoir f1(x) et f2(x)) dépendent bien de la variable extérieure x.','Regarde la définition du domaine D : les bornes de y sont f1(x) et f2(x), qui dépendent explicitement de quelle variable ?')">Vérifier</button>
        <div class="feedback" id="conv7fb3"></div>
      </div>
    </div>
  `
};

CONV_NOVA_KB[convKey('Formes différentielles et intégrales multiples')] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre du cours : formes différentielles, intégrales curvilignes, et formule de Fubini pour les intégrales doubles et triples. Demande-moi comment calculer une intégrale curviligne ou comment découper un domaine pour Fubini.",
  rules: [
    { test:/forme diff[ée]rentielle/i, replies:["Une forme différentielle ω=P(x,y)dx+Q(x,y)dy est définie par deux fonctions P et Q sur un ouvert U. Elle sert de base au calcul des intégrales curvilignes."] },
    { test:/courbe param[ée]tr[ée]e|c1 par morceaux/i, replies:["Une courbe paramétrée γ:I→R² est continue, C¹, ou C¹ par morceaux (subdivision en intervalles où γ est C¹). Elle est simple si elle ne se recoupe pas elle-même sur ]a,b[."] },
    { test:/int[ée]grale curviligne/i, replies:["L'intégrale curviligne de ω=Pdx+Qdy le long de γ(t)=(x(t),y(t)) est ∫_a^b [P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)]dt. Ne jamais oublier les facteurs x'(t) et y'(t) !"] },
    { test:/fubini.*rectangle|rectangle.*fubini/i, replies:["Sur un rectangle [a,b]×[c,d], la formule de Fubini dit que l'ordre d'intégration n'a pas d'importance : ∫∫f dydx = ∫∫f dxdy, pourvu que f soit continue."] },
    { test:/fubini.*domaine g[ée]n[ée]ral|domaine g[ée]n[ée]ral/i, replies:["Sur un domaine général D décrit par a≤x≤b et f1(x)≤y≤f2(x), les bornes intérieures dépendent de la variable extérieure : ∫_D f dxdy = ∫_a^b (∫_{f1(x)}^{f2(x)} f dy) dx."] },
    { test:/int[ée]grale triple/i, replies:["Pour une intégrale triple, deux découpages possibles : par tranches en z (D_z domaine plan dépendant de z), ou par colonnes verticales au-dessus d'un domaine plan D1, avec z entre g(x,y) et h(x,y)."] },
    { test:/exercice\\s*1/i, hint:true, replies:["Pour l'exercice 1 : rappelle-toi qu'on intègre par rapport au paramètre t.","Indice niveau 2 : il faut faire apparaître les dérivées x'(t) et y'(t).","Indice niveau 3 : la formule complète est ∫[P·x'(t)+Q·y'(t)]dt."] },
    { test:/exercice\\s*2/i, hint:true, replies:["Pour l'exercice 2 : relis l'énoncé du théorème de Fubini sur un rectangle.","Indice niveau 2 : que dit-il précisément sur les deux ordres d'intégration possibles ?","Indice niveau 3 : les deux ordres donnent exactement la même valeur, sur un rectangle avec f continue."] },
    { test:/exercice\\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde bien la définition du domaine D donnée dans la question.","Indice niveau 2 : les bornes de y sont f1(x) et f2(x).","Indice niveau 3 : ces bornes dépendent donc de la variable x, la variable extérieure."] }
  ]
};

/* fusionne le module CONV dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CONV_CHAPTERS);
Object.assign(NOVA_KB, CONV_NOVA_KB);