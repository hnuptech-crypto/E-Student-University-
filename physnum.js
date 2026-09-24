/* =====================================================================
   CHUNK « physnum » — registre PHYSNUM_CHAPTERS / PHYSNUM_NOVA_KB
   Matière(s) : Informatique|Physique numérique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   PHYSNUM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================
   MATIÈRE — Physique numérique (L3PF, domaine Informatique)
   Structure identique aux autres modules : PHYSNUM_CHAPTERS / PHYSNUM_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : erreurs numériques, intégration numérique, résolution
   d'équations non linéaires, résolution numérique d'EDO (Euler,
   Runge-Kutta), algèbre linéaire numérique, méthode de Monte Carlo,
   transformée de Fourier discrète, introduction aux éléments finis.
=================================================================== */
const PHYSNUM_MATIERE = 'Physique numérique';
function physnumKey(chapterTitle){ return `Informatique|${PHYSNUM_MATIERE}|${chapterTitle}`; }
const PHYSNUM_CHAPTERS = {};
const PHYSNUM_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Comparateur d'erreur d'arrondi en précision simple/double (Chapitre 1)
--------------------------------------------------------------------------------- */
function updatePhysnumEpsilon(){
  const out = document.getElementById('physnumEpsilonReadout');
  const eps32 = Math.pow(2,-23);
  const eps64 = Math.pow(2,-52);
  out.innerHTML =
    `Précision machine simple précision (32 bits, 23 bits de mantisse) : ε ≈ <strong>${eps32.toExponential(3)}</strong><br>` +
    `Précision machine double précision (64 bits, 52 bits de mantisse) : ε ≈ <strong>${eps64.toExponential(3)}</strong><br>` +
    `Soit environ <strong>7 chiffres significatifs</strong> fiables en simple précision, et <strong>16 chiffres</strong> en double précision.`;
}
function initPhysnumEpsilon(){ updatePhysnumEpsilon(); }

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Méthode de Newton-Raphson interactive (Chapitre 2)
   Résout f(x) = x^2 - a = 0 (calcul de racine carrée) pour illustrer la convergence quadratique
--------------------------------------------------------------------------------- */
function updatePhysnumNewton(){
  const a = parseFloat(document.getElementById('physnumA').value) || 2;
  const x0 = parseFloat(document.getElementById('physnumX0').value) || 1;
  const out = document.getElementById('physnumNewtonReadout');
  let x = x0;
  let rows = '<table class="mini-table"><tr><th>Itération</th><th>x_n</th><th>f(x_n)=x_n²-a</th></tr>';
  for(let n=0; n<=6; n++){
    const fx = x*x - a;
    rows += `<tr><td>${n}</td><td>${x.toFixed(8)}</td><td>${fx.toExponential(3)}</td></tr>`;
    x = x - fx/(2*x);
  }
  rows += '</table>';
  out.innerHTML = `<p>Recherche de √${a} par la méthode de Newton-Raphson (x0=${x0}) :</p>${rows}` +
    `<p style="margin-top:8px;">Valeur exacte : √${a} = <strong>${Math.sqrt(a).toFixed(8)}</strong>. Remarquer le doublement rapide du nombre de décimales exactes à chaque itération (convergence quadratique).</p>`;
}
function initPhysnumNewton(){ updatePhysnumNewton(); }

/* =========================== CHAPITRE 1 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Représentation des nombres et erreurs numériques")] = {
  objectives: [
    "Décrire le principe de la représentation en virgule flottante (norme IEEE 754)",
    "Distinguer erreur d'arrondi, erreur de troncature et erreur de propagation",
    "Identifier les situations à risque de perte de précision (soustraction catastrophique, sommation de termes de signes opposés)",
    "Évaluer la précision machine (epsilon machine) et son impact sur un calcul numérique"
  ],
  prereqs: ["Programmation de base (L1-L2)", "Analyse numérique élémentaire"],
  bodyHtml: `
    <p>La physique numérique consiste à résoudre, par le calcul informatique, des problèmes physiques que les méthodes analytiques classiques ne permettent pas de traiter exactement — équations différentielles non linéaires, intégrales sans primitive connue, systèmes à grand nombre de degrés de liberté. Mais tout calcul informatique repose sur une représentation <strong>approchée</strong> des nombres réels : ce premier chapitre pose les bases indispensables pour comprendre, anticiper et maîtriser les erreurs numériques inhérentes à tout calcul sur ordinateur.</p>

    <h3>1. Représentation en virgule flottante (norme IEEE 754)</h3>
    <p>Un ordinateur ne peut représenter qu'un nombre <strong>fini</strong> de valeurs réelles, codées selon la norme <strong>IEEE 754</strong> sous la forme :</p>
    <div class="formula-box">$$x = \\pm 1{,}m \\times 2^{e}$$</div>
    <p>où $m$ est la <strong>mantisse</strong> (partie fractionnaire, codée sur un nombre fixe de bits) et $e$ l'<strong>exposant</strong>. Deux formats sont couramment utilisés :</p>
    <table class="mini-table">
      <tr><th>Format</th><th>Taille totale</th><th>Bits de mantisse</th><th>Précision décimale approximative</th></tr>
      <tr><td>Simple précision (float32)</td><td>32 bits</td><td>23</td><td>≈ 7 chiffres significatifs</td></tr>
      <tr><td>Double précision (float64)</td><td>64 bits</td><td>52</td><td>≈ 16 chiffres significatifs</td></tr>
    </table>
    <p>La <strong>précision machine</strong> (ou epsilon machine, $\\varepsilon_{mach}$) est le plus petit nombre tel que $1 + \\varepsilon_{mach} \\neq 1$ en arithmétique flottante : elle vaut environ $2^{-23} \\approx 1{,}19\\times10^{-7}$ en simple précision, et $2^{-52} \\approx 2{,}22\\times10^{-16}$ en double précision.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La quasi-totalité des calculs de physique numérique utilisent la double précision (float64) par défaut : le coût mémoire supplémentaire est largement compensé par la fiabilité accrue, essentielle dès que de nombreuses opérations s'enchaînent (accumulation d'erreurs, chapitre suivant).
    </div>

    <h3>2. Erreur d'arrondi, erreur de troncature, erreur de propagation</h3>
    <table class="mini-table">
      <tr><th>Type d'erreur</th><th>Origine</th><th>Exemple typique</th></tr>
      <tr><td>Erreur d'arrondi</td><td>représentation finie des nombres en mémoire</td><td>0,1 + 0,2 ≠ 0,3 exactement en flottant</td></tr>
      <tr><td>Erreur de troncature (ou de discrétisation)</td><td>approximation d'un processus continu par un nombre fini d'étapes</td><td>remplacer une dérivée par un taux d'accroissement fini (chapitre 4)</td></tr>
      <tr><td>Erreur de propagation</td><td>accumulation et amplification des erreurs précédentes au fil des opérations</td><td>simulation numérique sur un grand nombre de pas de temps</td></tr>
    </table>

    <h3>3. Le piège de la soustraction catastrophique</h3>
    <p>Un des pièges numériques les plus fréquents est la <strong>soustraction catastrophique</strong> (ou perte de précision par annulation) : lorsqu'on soustrait deux nombres très proches en valeur, les chiffres significatifs communs s'annulent, et le résultat ne conserve que les chiffres les moins fiables (ceux entachés d'erreur d'arrondi).</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> en double précision, on calcule $x = 1{,}0000000000000002 - 1{,}0000000000000001$. Le résultat mathématiquement exact est $10^{-16}$. Pourquoi le résultat informatique est-il souvent totalement faux (par exemple 0 ou une valeur sans rapport) ?</p>
      <p><strong>Solution :</strong> chacun des deux opérandes n'est représenté qu'avec environ 16 chiffres significatifs (précision machine double). Les 15 premiers chiffres des deux nombres étant identiques, ils s'annulent lors de la soustraction, et il ne reste que les derniers chiffres — précisément ceux les plus affectés par l'erreur d'arrondi initiale de chaque opérande.</p>
      <p class="example-answer">Réponse : le résultat calculé peut être complètement dénué de signification, alors que chaque opérande pris séparément était correctement représenté. La parade consiste à reformuler l'expression mathématique pour éviter la soustraction de quantités proches (par exemple en utilisant des identités algébriques équivalentes).</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une règle de bonne pratique en physique numérique : chaque fois que possible, reformuler analytiquement une expression pour éviter la différence de deux grandeurs voisines avant de la coder — par exemple, remplacer $\\dfrac{1-\\cos x}{x^2}$ (soustraction catastrophique pour $x$ petit) par sa forme équivalente $\\dfrac{\\sin^2(x/2)}{(x/2)^2}\\times\\dfrac{1}{2}$, numériquement bien plus stable.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>IEEE 754 : nombre flottant = ±1,mantisse × 2^exposant ; double précision (64 bits) ≈ 16 chiffres significatifs fiables</li>
        <li>Précision machine ε_mach : plus petit nombre tel que 1+ε≠1 (≈2,22×10⁻¹⁶ en double précision)</li>
        <li>3 types d'erreurs : arrondi (représentation finie), troncature (discrétisation d'un processus continu), propagation (accumulation au fil des calculs)</li>
        <li>Soustraction catastrophique : soustraire deux nombres proches détruit les chiffres significatifs fiables — à reformuler analytiquement quand c'est possible</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Comparer deux flottants avec l'égalité stricte (==) au lieu de vérifier que leur écart est inférieur à une tolérance choisie</li>
        <li>Utiliser systématiquement la simple précision pour économiser de la mémoire, sans mesurer l'impact sur la fiabilité du résultat final</li>
        <li>Ignorer le risque de soustraction catastrophique dans une formule apparemment simple, alors qu'une reformulation algébrique équivalente élimine le problème</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Comparateur — précision machine simple/double précision</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Valeurs caractéristiques de la précision machine pour les deux formats IEEE 754 les plus courants.</p>
      <div class="sim-controls">
        <div class="sim-readout" id="physnumEpsilonReadout"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">En double précision (64 bits), le nombre de chiffres décimaux significatifs fiables est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum1e1" value="wrong"> 7</label>
          <label class="option"><input type="radio" name="physnum1e1" value="right"> 16</label>
          <label class="option"><input type="radio" name="physnum1e1" value="wrong"> 32</label>
          <label class="option"><input type="radio" name="physnum1e1" value="wrong"> 64</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum1e1','physnum1fb1','Correct — la double précision (52 bits de mantisse) offre environ 16 chiffres décimaux significatifs fiables.','7 chiffres correspond à la SIMPLE précision (32 bits) ; la double précision fait mieux.')">Vérifier</button>
        <div class="feedback" id="physnum1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La soustraction catastrophique se produit lorsqu'on soustrait :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum1e2" value="wrong"> deux très grands nombres</label>
          <label class="option"><input type="radio" name="physnum1e2" value="right"> deux nombres très proches en valeur</label>
          <label class="option"><input type="radio" name="physnum1e2" value="wrong"> un nombre positif et un nombre négatif</label>
          <label class="option"><input type="radio" name="physnum1e2" value="wrong"> deux nombres entiers</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum1e2','physnum1fb2','Correct — la proximité des deux valeurs fait que leurs chiffres significatifs communs s annulent, ne laissant que les chiffres les moins fiables.','Pense à ce qui s annule dans la soustraction : que se passe-t-il quand les chiffres significatifs sont identiques ?')">Vérifier</button>
        <div class="feedback" id="physnum1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'erreur de troncature est principalement due à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum1e3" value="wrong"> la représentation finie des nombres en mémoire</label>
          <label class="option"><input type="radio" name="physnum1e3" value="right"> l'approximation d'un processus continu par un nombre fini d'étapes</label>
          <label class="option"><input type="radio" name="physnum1e3" value="wrong"> l'accumulation d'erreurs au fil des calculs</label>
          <label class="option"><input type="radio" name="physnum1e3" value="wrong"> une erreur de programmation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum1e3','physnum1fb3','Correct — l erreur de troncature vient de la discrétisation d un problème continu (par exemple remplacer une dérivée par un taux d accroissement fini).','La représentation finie en mémoire, c est l erreur d arrondi ; cherche l erreur liée à la discrétisation.')">Vérifier</button>
        <div class="feedback" id="physnum1fb3"></div>
      </div>
    </div>
  `,
  init: initPhysnumEpsilon
};

PHYSNUM_NOVA_KB[physnumKey("Représentation des nombres et erreurs numériques")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Représentation des nombres et erreurs numériques ». Demande-moi la précision machine, la soustraction catastrophique, ou un indice sur un exercice.",
  rules: [
    { test:/ieee\s*754|virgule flottante/i, replies:["La norme IEEE 754 représente un nombre flottant sous la forme ±1,mantisse × 2^exposant. Double précision (64 bits) offre environ 16 chiffres décimaux fiables, contre 7 en simple précision (32 bits)."] },
    { test:/pr[ée]cision machine|epsilon machine/i, replies:["La précision machine ε_mach est le plus petit nombre tel que 1+ε≠1 en arithmétique flottante : environ 2,22×10⁻¹⁶ en double précision."] },
    { test:/soustraction catastrophique/i, replies:["La soustraction catastrophique se produit quand on soustrait deux nombres très proches : les chiffres significatifs communs s'annulent, ne laissant que les chiffres les moins fiables. Il faut reformuler la formule mathématique quand c'est possible."] },
    { test:/troncature/i, replies:["L'erreur de troncature vient de l'approximation d'un processus continu par un nombre fini d'étapes (par exemple, une dérivée remplacée par un taux d'accroissement fini)."] },
    { test:/propagation/i, replies:["L'erreur de propagation est l'accumulation et l'amplification des erreurs précédentes au fil d'un enchaînement d'opérations, typique des simulations sur de nombreux pas de temps."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : distingue simple et double précision.","Indice niveau 2 : 7 chiffres correspond à la simple précision.","Indice niveau 3 : la double précision offre environ 16 chiffres."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce qui s'annule lors d'une soustraction.","Indice niveau 2 : ce sont les chiffres significatifs COMMUNS qui s'annulent.","Indice niveau 3 : cela arrive en soustrayant deux nombres très proches."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : ne confonds pas avec l'erreur d'arrondi.","Indice niveau 2 : pense à la discrétisation d'un processus continu.","Indice niveau 3 : c'est l'approximation d'un continu par un nombre fini d'étapes."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Résolution numérique d'équations non linéaires")] = {
  objectives: [
    "Décrire le principe et les conditions de convergence de la méthode de dichotomie",
    "Décrire le principe de la méthode de Newton-Raphson et sa vitesse de convergence quadratique",
    "Comparer robustesse et vitesse de convergence des méthodes de dichotomie, Newton-Raphson et sécante",
    "Identifier les situations d'échec ou de divergence de la méthode de Newton-Raphson"
  ],
  prereqs: ["Représentation des nombres et erreurs numériques", "Analyse (dérivation, théorème des valeurs intermédiaires)"],
  bodyHtml: `
    <p>De nombreux problèmes de physique se ramènent à la résolution d'une équation $f(x)=0$ sans solution analytique exacte — niveaux d'énergie d'un puits de potentiel, équation d'état d'un gaz réel, ou simplement une racine polynomiale de degré élevé. Ce chapitre présente les méthodes numériques fondamentales pour approcher ces racines.</p>

    <h3>1. Méthode de dichotomie (bissection)</h3>
    <p>La méthode de <strong>dichotomie</strong> s'appuie directement sur le théorème des valeurs intermédiaires : si $f$ est continue sur $[a,b]$ et $f(a)\\times f(b) < 0$, alors $f$ admet au moins une racine dans $]a,b[$. L'algorithme consiste à évaluer $f$ au point milieu $c=(a+b)/2$, puis à réduire l'intervalle de recherche de moitié à chaque itération, en conservant le sous-intervalle où le changement de signe persiste.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La dichotomie est extrêmement <strong>robuste</strong> (elle converge toujours, dès lors que la condition initiale de changement de signe est vérifiée) mais relativement <strong>lente</strong> : la largeur de l'intervalle est divisée par 2 à chaque itération (convergence linéaire), ce qui nécessite environ $\\log_2\\left(\\frac{b-a}{\\text{tolérance}}\\right)$ itérations pour atteindre une précision donnée.
    </div>

    <h3>2. Méthode de Newton-Raphson</h3>
    <p>La méthode de <strong>Newton-Raphson</strong> exploite l'information supplémentaire fournie par la dérivée $f'$ : à chaque itération, on remplace localement la courbe de $f$ par sa tangente au point courant, et l'on prend comme nouvelle estimation le point où cette tangente coupe l'axe des abscisses :</p>
    <div class="formula-box">$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$</div>
    <p>Lorsque la méthode converge (et que $f'(x^*) \\neq 0$ à la racine $x^*$), la convergence est <strong>quadratique</strong> : le nombre de chiffres significatifs exacts double approximativement à chaque itération, ce qui la rend beaucoup plus rapide que la dichotomie une fois suffisamment proche de la solution.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> utiliser la méthode de Newton-Raphson pour calculer $\\sqrt{2}$, c'est-à-dire résoudre $f(x)=x^2-2=0$, à partir de $x_0=1$.</p>
      <p><strong>Solution :</strong> $f'(x)=2x$, donc $x_{n+1} = x_n - \\dfrac{x_n^2-2}{2x_n} = \\dfrac{x_n}{2}+\\dfrac{1}{x_n}$. Itération 1 : $x_1 = 0{,}5+1 = 1{,}5$. Itération 2 : $x_2 = 0{,}75+0{,}6667 \\approx 1{,}4167$. Itération 3 : $x_3 \\approx 1{,}41422$.</p>
      <p class="example-answer">Réponse : après seulement 3 itérations, on obtient déjà 5 décimales exactes de $\\sqrt{2}\\approx1{,}41421356$ — illustration frappante de la convergence quadratique.</p>
    </div>

    <h3>3. Limites et pièges de la méthode de Newton-Raphson</h3>
    <table class="mini-table">
      <tr><th>Situation problématique</th><th>Conséquence</th></tr>
      <tr><td>$f'(x_n) \\approx 0$ (tangente presque horizontale)</td><td>le pas de correction devient énorme, la méthode peut diverger brutalement</td></tr>
      <tr><td>Point de départ $x_0$ trop éloigné de la racine</td><td>la méthode peut osciller sans converger, ou converger vers une racine indésirable</td></tr>
      <tr><td>Racine multiple ($f'(x^*)=0$ à la racine elle-même)</td><td>la convergence quadratique est perdue, la méthode redevient seulement linéaire</td></tr>
      <tr><td>Fonction non dérivable ou dérivée coûteuse à calculer</td><td>préférer la méthode de la sécante (approxime $f'$ par un taux d'accroissement, sans calcul analytique de la dérivée)</td></tr>
    </table>

    <h3>4. Méthode de la sécante</h3>
    <p>La méthode de la <strong>sécante</strong> reprend le principe de Newton-Raphson mais remplace la dérivée exacte $f'(x_n)$ par une approximation calculée à partir des deux derniers points :</p>
    <div class="formula-box">$$x_{n+1} = x_n - f(x_n)\\,\\frac{x_n - x_{n-1}}{f(x_n)-f(x_{n-1})}$$</div>
    <p>Elle offre un bon compromis : elle ne nécessite pas de calculer explicitement $f'$ (contrairement à Newton-Raphson), tout en conservant une convergence super-linéaire (d'ordre environ 1,618, le nombre d'or) — plus rapide que la dichotomie, bien qu'un peu moins rapide que Newton-Raphson.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Dichotomie : robuste (converge toujours si changement de signe), mais lente (convergence linéaire, intervalle divisé par 2 à chaque étape)</li>
        <li>Newton-Raphson : x(n+1) = x(n) − f(x(n))/f'(x(n)) ; convergence quadratique (rapide) si f'(x*)≠0, mais peut diverger si le point de départ est mal choisi</li>
        <li>Piège majeur de Newton-Raphson : f'(x(n))≈0 provoque un pas énorme et une possible divergence</li>
        <li>Méthode de la sécante : approxime f' par un taux d'accroissement, évite le calcul analytique de la dérivée, convergence super-linéaire</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser Newton-Raphson sans vérifier que le point de départ est raisonnablement proche de la racine cherchée</li>
        <li>Oublier de tester si f'(x(n)) est proche de zéro avant de diviser, ce qui peut provoquer une divergence ou une erreur de calcul</li>
        <li>Croire que la dichotomie est toujours la méthode la plus lente : c'est vrai en nombre d'itérations, mais elle reste incontournable pour sa robustesse garantie</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — méthode de Newton-Raphson pour √a</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Résout f(x)=x²−a=0 par itérations successives ; observe la convergence quadratique (doublement du nombre de décimales exactes).</p>
      <div class="sim-controls">
        <label>a : <input type="number" id="physnumA" value="2" style="width:60px;" oninput="updatePhysnumNewton()"></label>
        <label>x0 (point de départ) : <input type="number" id="physnumX0" value="1" style="width:60px;" oninput="updatePhysnumNewton()"></label>
        <div class="sim-readout" id="physnumNewtonReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La méthode de dichotomie nécessite, pour démarrer, que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum2e1" value="wrong"> f soit dérivable</label>
          <label class="option"><input type="radio" name="physnum2e1" value="right"> f(a) et f(b) soient de signes opposés</label>
          <label class="option"><input type="radio" name="physnum2e1" value="wrong"> f soit un polynôme</label>
          <label class="option"><input type="radio" name="physnum2e1" value="wrong"> f'(x0) soit non nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum2e1','physnum2fb1','Correct — le changement de signe de f entre a et b garantit, par le théorème des valeurs intermédiaires, l existence d au moins une racine dans l intervalle.','La dichotomie s appuie sur le théorème des valeurs intermédiaires : quelle condition de signe est nécessaire ?')">Vérifier</button>
        <div class="feedback" id="physnum2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La convergence de la méthode de Newton-Raphson, lorsqu'elle a lieu, est dite :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum2e2" value="wrong"> linéaire</label>
          <label class="option"><input type="radio" name="physnum2e2" value="right"> quadratique</label>
          <label class="option"><input type="radio" name="physnum2e2" value="wrong"> logarithmique</label>
          <label class="option"><input type="radio" name="physnum2e2" value="wrong"> aucune de ces réponses</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum2e2','physnum2fb2','Correct — le nombre de décimales exactes double approximativement à chaque itération quand f prime(x*) est non nulle.','La dichotomie est linéaire (intervalle divisé par 2) ; Newton-Raphson fait mieux quand elle converge.')">Vérifier</button>
        <div class="feedback" id="physnum2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La méthode de la sécante se distingue de Newton-Raphson par le fait qu'elle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum2e3" value="wrong"> ne converge jamais</label>
          <label class="option"><input type="radio" name="physnum2e3" value="right"> n'exige pas le calcul analytique de la dérivée</label>
          <label class="option"><input type="radio" name="physnum2e3" value="wrong"> nécessite deux fonctions f distinctes</label>
          <label class="option"><input type="radio" name="physnum2e3" value="wrong"> est toujours plus rapide que Newton-Raphson</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum2e3','physnum2fb3','Correct — elle approxime la dérivée par un taux d accroissement calculé à partir des deux derniers points, évitant ainsi le calcul explicite de f prime.','Pense à ce que remplace la sécante par rapport à f prime(x_n) dans la formule de Newton-Raphson.')">Vérifier</button>
        <div class="feedback" id="physnum2fb3"></div>
      </div>
    </div>
  `,
  init: initPhysnumNewton
};

PHYSNUM_NOVA_KB[physnumKey("Résolution numérique d'équations non linéaires")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Résolution numérique d'équations non linéaires ». Demande-moi la différence entre dichotomie et Newton-Raphson, ou un indice sur un exercice.",
  rules: [
    { test:/dichotomie|bissection/i, replies:["La dichotomie exige f(a) et f(b) de signes opposés (théorème des valeurs intermédiaires) ; elle est très robuste mais lente (convergence linéaire, intervalle divisé par 2 à chaque étape)."] },
    { test:/newton.?raphson|newton/i, replies:["Newton-Raphson : x(n+1)=x(n)−f(x(n))/f'(x(n)). Convergence quadratique (très rapide) si elle converge, mais peut diverger si f'(x(n))≈0 ou si le point de départ est mal choisi."] },
    { test:/s[ée]cante/i, replies:["La méthode de la sécante approxime f' par un taux d'accroissement entre les deux derniers points, évitant le calcul analytique de la dérivée. Convergence super-linéaire (ordre du nombre d'or, ≈1,618)."] },
    { test:/converge.*quadratique|quadratique/i, replies:["Convergence quadratique signifie que le nombre de décimales exactes double approximativement à chaque itération — c'est la vitesse de convergence typique de Newton-Raphson."] },
    { test:/diverge|[ée]chec.*newton/i, replies:["Newton-Raphson peut diverger si f'(x(n)) est proche de zéro (pas énorme), si le point de départ est trop éloigné de la racine, ou en cas de racine multiple (f'(x*)=0 aussi)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense au théorème des valeurs intermédiaires.","Indice niveau 2 : il faut un changement de signe entre les deux bornes.","Indice niveau 3 : f(a) et f(b) doivent être de signes opposés."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la dichotomie est linéaire ; Newton-Raphson fait mieux.","Indice niveau 2 : le nombre de décimales exactes double à chaque itération.","Indice niveau 3 : c'est une convergence quadratique."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde ce que remplace la sécante dans la formule de Newton.","Indice niveau 2 : elle approxime f' sans le calculer analytiquement.","Indice niveau 3 : elle n'exige pas le calcul de la dérivée exacte."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Comparateur méthode des rectangles / trapèzes / Simpson (Chapitre 3)
   Intègre f(x) = sin(x) sur [0, pi] (valeur exacte = 2)
--------------------------------------------------------------------------------- */
function updatePhysnumIntegration(){
  const n = parseInt(document.getElementById('physnumNint').value) || 10;
  const out = document.getElementById('physnumIntegrationReadout');
  const a = 0, b = Math.PI;
  const h = (b-a)/n;
  const f = Math.sin;
  // rectangles (point milieu)
  let rectSum = 0;
  for(let i=0;i<n;i++){ rectSum += f(a + (i+0.5)*h); }
  const rect = rectSum*h;
  // trapèzes
  let trapSum = 0.5*(f(a)+f(b));
  for(let i=1;i<n;i++){ trapSum += f(a+i*h); }
  const trap = trapSum*h;
  // Simpson (n doit être pair)
  let simpson = null;
  if(n % 2 === 0){
    let s = f(a) + f(b);
    for(let i=1;i<n;i++){ s += f(a+i*h) * (i%2===0 ? 2 : 4); }
    simpson = s*h/3;
  }
  const exact = 2;
  out.innerHTML =
    `<p>Intégrale de sin(x) sur [0,π] avec n=${n} subdivisions (valeur exacte = 2) :</p>` +
    `<table class="mini-table"><tr><th>Méthode</th><th>Résultat</th><th>Erreur absolue</th></tr>` +
    `<tr><td>Rectangles (point milieu)</td><td>${rect.toFixed(8)}</td><td>${Math.abs(rect-exact).toExponential(3)}</td></tr>` +
    `<tr><td>Trapèzes</td><td>${trap.toFixed(8)}</td><td>${Math.abs(trap-exact).toExponential(3)}</td></tr>` +
    (simpson !== null ? `<tr><td>Simpson</td><td>${simpson.toFixed(8)}</td><td>${Math.abs(simpson-exact).toExponential(3)}</td></tr>` : `<tr><td>Simpson</td><td colspan="2">n doit être pair</td></tr>`) +
    `</table>`;
}
function initPhysnumIntegration(){ updatePhysnumIntegration(); }

/* =========================== CHAPITRE 3 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Intégration numérique")] = {
  objectives: [
    "Construire les méthodes des rectangles et des trapèzes à partir de l'aire sous la courbe",
    "Construire la méthode de Simpson par interpolation parabolique et connaître son ordre de convergence",
    "Comparer l'erreur de troncature des différentes méthodes en fonction du pas h",
    "Choisir une méthode d'intégration adaptée selon la régularité de la fonction à intégrer"
  ],
  prereqs: ["Représentation des nombres et erreurs numériques", "Analyse (intégrales, développements limités)"],
  bodyHtml: `
    <p>De nombreuses grandeurs physiques s'expriment sous forme d'une intégrale sans primitive analytique connue (fonctions spéciales, données expérimentales discrètes). Ce chapitre présente les méthodes de <strong>quadrature numérique</strong> les plus utilisées pour approcher $\\int_a^b f(x)\\,dx$.</p>

    <h3>1. Méthode des rectangles</h3>
    <p>On subdivise l'intervalle $[a,b]$ en $n$ sous-intervalles de largeur $h=(b-a)/n$, et l'on approxime l'aire sous la courbe sur chaque sous-intervalle par un rectangle. Selon le point où l'on évalue $f$, on distingue la méthode des rectangles à gauche, à droite, ou au <strong>point milieu</strong> (la plus précise des trois) :</p>
    <div class="formula-box">$$\\int_a^b f(x)\\,dx \\approx h\\sum_{i=0}^{n-1} f\\!\\left(a+\\left(i+\\tfrac{1}{2}\\right)h\\right) \\qquad \\text{(erreur en } O(h^2) \\text{)}$$</div>

    <h3>2. Méthode des trapèzes</h3>
    <p>On approxime la courbe par des segments de droite reliant les points successifs, ce qui revient à sommer les aires de trapèzes plutôt que de rectangles :</p>
    <div class="formula-box">$$\\int_a^b f(x)\\,dx \\approx h\\left[\\frac{f(a)+f(b)}{2} + \\sum_{i=1}^{n-1} f(a+ih)\\right] \\qquad \\text{(erreur en } O(h^2) \\text{)}$$</div>
    <p>Bien que d'ordre de convergence identique à la méthode du point milieu, la méthode des trapèzes est en pratique légèrement moins précise (erreur environ deux fois plus grande), le point milieu bénéficiant d'une compensation partielle des erreurs de part et d'autre du point d'évaluation.</p>

    <h3>3. Méthode de Simpson</h3>
    <p>La méthode de <strong>Simpson</strong> approxime la courbe, non plus par des segments de droite, mais par des <strong>arcs de parabole</strong> passant par trois points consécutifs, ce qui améliore significativement la précision pour les fonctions suffisamment régulières :</p>
    <div class="formula-box">$$\\int_a^b f(x)\\,dx \\approx \\frac{h}{3}\\left[f(a)+f(b)+4\\!\\!\\sum_{i \\text{ impair}} f(x_i) + 2\\!\\!\\sum_{i \\text{ pair}, i\\neq 0,n} f(x_i)\\right] \\qquad \\text{(erreur en } O(h^4) \\text{)}$$</div>
    <p>L'erreur de la méthode de Simpson décroît en $h^4$ (contre $h^2$ pour rectangles et trapèzes) : diviser le pas $h$ par 2 divise l'erreur par un facteur $16$ (contre seulement $4$ pour les méthodes précédentes) — un gain de précision considérable pour un coût de calcul à peine supérieur.</p>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Ordre de l'erreur</th><th>Effet de diviser h par 2</th></tr>
      <tr><td>Rectangles (point milieu)</td><td>$O(h^2)$</td><td>erreur divisée par 4</td></tr>
      <tr><td>Trapèzes</td><td>$O(h^2)$</td><td>erreur divisée par 4</td></tr>
      <tr><td>Simpson</td><td>$O(h^4)$</td><td>erreur divisée par 16</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> estimer $\\int_0^\\pi \\sin(x)\\,dx$ (valeur exacte : 2) par la méthode des trapèzes avec seulement $n=2$ subdivisions ($h=\\pi/2$).</p>
      <p><strong>Solution :</strong> points : $x_0=0$, $x_1=\\pi/2$, $x_2=\\pi$. $f(x_0)=0$, $f(x_1)=1$, $f(x_2)=0$. Trapèzes : $\\dfrac{\\pi}{2}\\left[\\dfrac{0+0}{2}+1\\right] = \\dfrac{\\pi}{2} \\approx 1{,}5708$.</p>
      <p class="example-answer">Réponse : $\\approx 1{,}5708$, avec une erreur d'environ $0{,}43$ par rapport à la valeur exacte 2 — un pas encore trop grossier ; l'outil interactif ci-dessous permet de visualiser la convergence en augmentant $n$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Rectangles (point milieu) et trapèzes : erreur en O(h²), diviser h par 2 divise l'erreur par 4</li>
        <li>Simpson (interpolation parabolique) : erreur en O(h⁴), diviser h par 2 divise l'erreur par 16 — bien plus précis pour un coût comparable</li>
        <li>Simpson exige un nombre de subdivisions n pair</li>
        <li>Le choix de la méthode dépend de la régularité de f : Simpson est optimal pour des fonctions lisses, moins avantageux pour des fonctions peu régulières ou des données bruitées</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la pondération alternée 4/2/4/2... des points intérieurs dans la formule de Simpson</li>
        <li>Utiliser un nombre impair de subdivisions avec la méthode de Simpson (elle exige n pair)</li>
        <li>Croire qu'augmenter indéfiniment n améliore toujours la précision : au-delà d'un certain point, l'accumulation des erreurs d'arrondi (chapitre 1) peut dégrader le résultat</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Comparateur — intégration numérique de sin(x) sur [0,π]</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Compare rectangles, trapèzes et Simpson pour un nombre de subdivisions donné (valeur exacte = 2).</p>
      <div class="sim-controls">
        <label>n (subdivisions) : <input type="number" id="physnumNint" value="10" min="2" style="width:60px;" oninput="updatePhysnumIntegration()"></label>
        <div class="sim-readout" id="physnumIntegrationReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'erreur de la méthode de Simpson décroît, lorsque le pas h diminue, comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum3e1" value="wrong"> O(h)</label>
          <label class="option"><input type="radio" name="physnum3e1" value="wrong"> O(h²)</label>
          <label class="option"><input type="radio" name="physnum3e1" value="right"> O(h⁴)</label>
          <label class="option"><input type="radio" name="physnum3e1" value="wrong"> O(h⁸)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum3e1','physnum3fb1','Correct — l interpolation parabolique de Simpson offre une erreur en h a la puissance 4, bien meilleure que les h a la puissance 2 des rectangles et trapèzes.','Rectangles et trapèzes sont en O(h²) ; Simpson, grâce à l interpolation parabolique, fait mieux.')">Vérifier</button>
        <div class="feedback" id="physnum3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si l'on divise le pas h par 2 avec la méthode de Simpson, l'erreur est divisée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum3e2" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="physnum3e2" value="wrong"> 4</label>
          <label class="option"><input type="radio" name="physnum3e2" value="right"> 16</label>
          <label class="option"><input type="radio" name="physnum3e2" value="wrong"> 256</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum3e2','physnum3fb2','Correct — l erreur étant en h a la puissance 4, diviser h par 2 divise l erreur par 2 à la puissance 4, soit 16.','L erreur de Simpson est en h^4 : que devient (h/2)^4 par rapport à h^4 ?')">Vérifier</button>
        <div class="feedback" id="physnum3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La méthode de Simpson exige que le nombre de subdivisions n soit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum3e3" value="wrong"> impair</label>
          <label class="option"><input type="radio" name="physnum3e3" value="right"> pair</label>
          <label class="option"><input type="radio" name="physnum3e3" value="wrong"> premier</label>
          <label class="option"><input type="radio" name="physnum3e3" value="wrong"> aucune contrainte</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum3e3','physnum3fb3','Correct — Simpson regroupe les points par paires (parabole sur 3 points consécutifs), ce qui exige un nombre pair de subdivisions.','Simpson construit des paraboles sur des groupes de 3 points : quelle parité de n cela impose-t-il ?')">Vérifier</button>
        <div class="feedback" id="physnum3fb3"></div>
      </div>
    </div>
  `,
  init: initPhysnumIntegration
};

PHYSNUM_NOVA_KB[physnumKey("Intégration numérique")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Intégration numérique ». Demande-moi la différence entre trapèzes et Simpson, ou un indice sur un exercice.",
  rules: [
    { test:/rectangle/i, replies:["La méthode des rectangles (point milieu) a une erreur en O(h²) : diviser h par 2 divise l'erreur par 4."] },
    { test:/trap[èe]ze/i, replies:["La méthode des trapèzes approxime la courbe par des segments de droite ; erreur en O(h²), comme les rectangles, mais généralement un peu moins précise en pratique."] },
    { test:/simpson/i, replies:["La méthode de Simpson approxime la courbe par des arcs de parabole ; erreur en O(h⁴) — diviser h par 2 divise l'erreur par 16. Elle exige un nombre pair de subdivisions."] },
    { test:/o\(h/i, replies:["L'ordre de l'erreur indique la vitesse de convergence : O(h²) pour rectangles/trapèzes, O(h⁴) pour Simpson. Plus l'exposant est élevé, plus la méthode converge vite quand h diminue."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : Simpson utilise une interpolation parabolique, plus précise qu'une droite.","Indice niveau 2 : son erreur est en h à une puissance supérieure à 2.","Indice niveau 3 : c'est O(h⁴)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : calcule (h/2) à la puissance 4 par rapport à h⁴.","Indice niveau 2 : (1/2)⁴ = 1/16.","Indice niveau 3 : l'erreur est divisée par 16."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Simpson regroupe les points 3 par 3 (parabole).","Indice niveau 2 : cela impose une parité particulière du nombre de subdivisions.","Indice niveau 3 : n doit être pair."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 4 — Comparateur Euler explicite / Euler amélioré / RK4 (Chapitre 4)
   Résout dy/dx = -y (décroissance exponentielle), y(0)=1, valeur exacte y(x)=e^-x
--------------------------------------------------------------------------------- */
function updatePhysnumODE(){
  const h = parseFloat(document.getElementById('physnumH').value) || 0.5;
  const xEnd = parseFloat(document.getElementById('physnumXend').value) || 2;
  const out = document.getElementById('physnumODEReadout');
  const f = (x,y) => -y;
  const n = Math.round(xEnd/h);
  // Euler explicite
  let yE = 1;
  for(let i=0;i<n;i++){ yE = yE + h*f(i*h, yE); }
  // RK4
  let yRK = 1;
  for(let i=0;i<n;i++){
    const x = i*h;
    const k1 = f(x, yRK);
    const k2 = f(x+h/2, yRK+h/2*k1);
    const k3 = f(x+h/2, yRK+h/2*k2);
    const k4 = f(x+h, yRK+h*k3);
    yRK = yRK + h/6*(k1+2*k2+2*k3+k4);
  }
  const exact = Math.exp(-xEnd);
  out.innerHTML =
    `<p>Résolution de dy/dx = −y, y(0)=1, en x=${xEnd} avec pas h=${h} (n=${n} pas) — valeur exacte : e<sup>−${xEnd}</sup> = ${exact.toFixed(8)}</p>` +
    `<table class="mini-table"><tr><th>Méthode</th><th>Résultat</th><th>Erreur absolue</th></tr>` +
    `<tr><td>Euler explicite (ordre 1)</td><td>${yE.toFixed(8)}</td><td>${Math.abs(yE-exact).toExponential(3)}</td></tr>` +
    `<tr><td>Runge-Kutta d'ordre 4 (RK4)</td><td>${yRK.toFixed(8)}</td><td>${Math.abs(yRK-exact).toExponential(3)}</td></tr>` +
    `</table>`;
}
function initPhysnumODE(){ updatePhysnumODE(); }

/* =========================== CHAPITRE 4 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Résolution numérique des équations différentielles ordinaires")] = {
  objectives: [
    "Construire la méthode d'Euler explicite à partir de la définition de la dérivée",
    "Analyser la stabilité et la précision de la méthode d'Euler explicite",
    "Construire la méthode de Runge-Kutta d'ordre 4 (RK4) et justifier sa supériorité pratique",
    "Choisir un pas d'intégration adapté à un problème physique donné (oscillateur, décroissance radioactive, trajectoire)"
  ],
  prereqs: ["Intégration numérique", "Équations différentielles (L1-L2)"],
  bodyHtml: `
    <p>La résolution numérique des équations différentielles ordinaires (EDO) est sans doute l'outil le plus utilisé de toute la physique numérique : trajectoires en mécanique, décroissance radioactive, circuits RC/RL, dynamique des populations, équations de Lotka-Volterra... Ce chapitre présente les méthodes de résolution pas à pas d'un problème de Cauchy $y'=f(x,y)$, $y(x_0)=y_0$.</p>

    <h3>1. Méthode d'Euler explicite</h3>
    <p>La méthode la plus simple s'appuie directement sur l'approximation de la dérivée par un taux d'accroissement : $y'(x_n) \\approx \\dfrac{y_{n+1}-y_n}{h}$, ce qui donne le schéma itératif :</p>
    <div class="formula-box">$$y_{n+1} = y_n + h\\,f(x_n, y_n)$$</div>
    <p>Géométriquement, on avance le long de la tangente à la courbe solution au point courant. L'erreur locale (à chaque pas) est en $O(h^2)$, mais l'erreur globale accumulée sur l'ensemble de l'intervalle est en $O(h)$ seulement : la méthode d'Euler explicite est dite <strong>d'ordre 1</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — limite de la méthode d'Euler</span>
      La méthode d'Euler explicite converge, mais lentement : diviser le pas $h$ par 2 ne divise l'erreur globale que par 2 également (et non par 4 comme pour une méthode d'ordre 2). Elle peut de plus devenir <strong>instable</strong> (résultats qui divergent, oscillent ou explosent numériquement) si le pas $h$ est trop grand par rapport à l'échelle de temps caractéristique du problème physique — un phénomène particulièrement sensible pour les équations dites « raides » (stiff equations).
    </div>

    <h3>2. Méthode de Runge-Kutta d'ordre 4 (RK4)</h3>
    <p>La méthode de <strong>Runge-Kutta d'ordre 4</strong>, très largement utilisée en pratique, améliore considérablement la précision en évaluant la fonction $f$ en <strong>quatre points intermédiaires</strong> à chaque pas, avant de les combiner selon une moyenne pondérée :</p>
    <div class="formula-box">$$k_1 = f(x_n,y_n) \\qquad k_2 = f\\!\\left(x_n+\\tfrac{h}{2}, y_n+\\tfrac{h}{2}k_1\\right) \\qquad k_3 = f\\!\\left(x_n+\\tfrac{h}{2}, y_n+\\tfrac{h}{2}k_2\\right) \\qquad k_4 = f(x_n+h, y_n+h\\,k_3)$$</div>
    <div class="formula-box">$$y_{n+1} = y_n + \\frac{h}{6}\\left(k_1 + 2k_2 + 2k_3 + k_4\\right)$$</div>
    <p>Cette méthode est <strong>d'ordre 4</strong> : l'erreur globale est en $O(h^4)$, ce qui la rend considérablement plus précise que la méthode d'Euler pour un coût de calcul par pas certes plus élevé (4 évaluations de $f$ contre 1), mais largement compensé par la possibilité d'utiliser un pas $h$ beaucoup plus grand pour une précision équivalente.</p>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Évaluations de f par pas</th><th>Ordre de l'erreur globale</th></tr>
      <tr><td>Euler explicite</td><td>1</td><td>$O(h)$</td></tr>
      <tr><td>Euler amélioré (Heun, RK2)</td><td>2</td><td>$O(h^2)$</td></tr>
      <tr><td>Runge-Kutta d'ordre 4 (RK4)</td><td>4</td><td>$O(h^4)$</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> résoudre $y' = -y$, $y(0)=1$ (décroissance exponentielle, solution exacte $y(x)=e^{-x}$) par la méthode d'Euler explicite avec un seul pas $h=1$, pour estimer $y(1)$.</p>
      <p><strong>Solution :</strong> $y_1 = y_0 + h\\,f(x_0,y_0) = 1 + 1\\times(-1) = 0$.</p>
      <p class="example-answer">Réponse : $y_1 = 0$, à comparer à la valeur exacte $e^{-1}\\approx 0{,}3679$ : l'erreur est considérable avec un pas aussi grossier, ce qui illustre concrètement la nécessité de réduire $h$ (ou d'utiliser une méthode d'ordre supérieur comme RK4) pour obtenir une précision acceptable.</p>
    </div>

    <h3>3. Choix pratique du pas d'intégration</h3>
    <p>Le choix du pas $h$ résulte toujours d'un compromis entre précision (un pas plus petit réduit l'erreur de troncature, chapitre 1) et coût de calcul (un pas plus petit multiplie le nombre total d'itérations, et peut accroître l'erreur de propagation par accumulation d'erreurs d'arrondi). En pratique, on choisit souvent $h$ significativement plus petit que l'échelle de temps caractéristique du phénomène physique étudié (par exemple, une fraction de la période d'oscillation pour un système oscillant), et l'on vérifie la convergence du résultat en réduisant encore $h$ jusqu'à observer une stabilisation du résultat numérique.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Euler explicite : y(n+1) = y(n) + h·f(x(n),y(n)) ; ordre 1 (erreur globale en O(h)), peut être instable si h trop grand</li>
        <li>RK4 : 4 évaluations intermédiaires de f par pas, combinées en moyenne pondérée ; ordre 4 (erreur globale en O(h⁴))</li>
        <li>RK4 est le standard pratique le plus utilisé : gain de précision considérable pour un surcoût de calcul raisonnable</li>
        <li>Le choix du pas h est un compromis précision/coût de calcul, à valider en vérifiant la convergence du résultat quand h diminue</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre l'erreur locale (à un pas, en O(h²) pour Euler) et l'erreur globale accumulée sur tout l'intervalle (en O(h) seulement pour Euler)</li>
        <li>Utiliser un pas h trop grand par rapport à l'échelle de temps caractéristique du problème, provoquant instabilité numérique plutôt qu'une simple perte de précision</li>
        <li>Croire que RK4 est toujours 4 fois plus coûteux « pour rien » : le gain en précision permet souvent d'utiliser un pas bien plus grand qu'avec Euler, réduisant le coût total malgré les 4 évaluations par pas</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Comparateur — Euler explicite vs RK4 pour dy/dx=−y</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Compare les deux méthodes pour la décroissance exponentielle y(0)=1 (solution exacte y(x)=e⁻ˣ).</p>
      <div class="sim-controls">
        <label>Pas h : <input type="number" id="physnumH" value="0.5" step="0.1" style="width:60px;" oninput="updatePhysnumODE()"></label>
        <label>x final : <input type="number" id="physnumXend" value="2" style="width:60px;" oninput="updatePhysnumODE()"></label>
        <div class="sim-readout" id="physnumODEReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'erreur globale de la méthode d'Euler explicite est de l'ordre de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum4e1" value="right"> O(h)</label>
          <label class="option"><input type="radio" name="physnum4e1" value="wrong"> O(h²)</label>
          <label class="option"><input type="radio" name="physnum4e1" value="wrong"> O(h⁴)</label>
          <label class="option"><input type="radio" name="physnum4e1" value="wrong"> O(1)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum4e1','physnum4fb1','Correct — bien que l erreur locale soit en O(h²), l accumulation sur l ensemble des pas ramène l erreur globale à O(h) : Euler est une méthode d ordre 1.','Attention à distinguer erreur LOCALE (par pas) et erreur GLOBALE (accumulée) : la question porte sur la globale.')">Vérifier</button>
        <div class="feedback" id="physnum4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La méthode RK4 nécessite, à chaque pas, l'évaluation de f en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum4e2" value="wrong"> 1 point</label>
          <label class="option"><input type="radio" name="physnum4e2" value="wrong"> 2 points</label>
          <label class="option"><input type="radio" name="physnum4e2" value="right"> 4 points</label>
          <label class="option"><input type="radio" name="physnum4e2" value="wrong"> 8 points</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum4e2','physnum4fb2','Correct — k1, k2, k3, k4 sont 4 évaluations intermédiaires de f, combinées en moyenne pondérée à chaque pas.','Compte les coefficients k1, k2, k3, k4 dans la formule de RK4.')">Vérifier</button>
        <div class="feedback" id="physnum4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un pas h trop grand par rapport à l'échelle de temps caractéristique du problème peut provoquer :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum4e3" value="wrong"> une amélioration de la précision</label>
          <label class="option"><input type="radio" name="physnum4e3" value="right"> une instabilité numérique</label>
          <label class="option"><input type="radio" name="physnum4e3" value="wrong"> une convergence plus rapide</label>
          <label class="option"><input type="radio" name="physnum4e3" value="wrong"> aucun effet notable</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum4e3','physnum4fb3','Correct — un pas trop grand peut provoquer une divergence, des oscillations ou une explosion numérique du résultat, en particulier pour les équations dites raides.','Pense à ce qui arrive si le schéma numérique n a pas assez de résolution temporelle par rapport à la dynamique physique du problème.')">Vérifier</button>
        <div class="feedback" id="physnum4fb3"></div>
      </div>
    </div>
  `,
  init: initPhysnumODE
};

PHYSNUM_NOVA_KB[physnumKey("Résolution numérique des équations différentielles ordinaires")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Résolution numérique des équations différentielles ordinaires ». Demande-moi la différence entre Euler et RK4, ou un indice sur un exercice.",
  rules: [
    { test:/euler/i, replies:["La méthode d'Euler explicite : y(n+1)=y(n)+h·f(x(n),y(n)). Erreur locale en O(h²) mais erreur GLOBALE en O(h) seulement (méthode d'ordre 1) — elle peut devenir instable si h est trop grand."] },
    { test:/rk4|runge.?kutta/i, replies:["RK4 évalue f en 4 points intermédiaires (k1,k2,k3,k4) par pas, combinés en moyenne pondérée. Erreur globale en O(h⁴) — bien plus précise qu'Euler pour un surcoût de calcul raisonnable."] },
    { test:/instabilit[ée]|raide|stiff/i, replies:["Un pas h trop grand par rapport à l'échelle de temps caractéristique du problème peut rendre la méthode d'Euler instable (oscillations, divergence), en particulier pour les équations dites 'raides'."] },
    { test:/erreur locale|erreur globale/i, replies:["L'erreur locale est l'erreur commise à UN pas ; l'erreur globale est l'accumulation de ces erreurs sur tout l'intervalle. Pour Euler : locale en O(h²), globale en O(h) seulement."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : attention, la question porte sur l'erreur GLOBALE, pas locale.","Indice niveau 2 : l'accumulation réduit l'ordre par rapport à l'erreur locale.","Indice niveau 3 : l'erreur globale d'Euler est en O(h)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compte les coefficients k dans la formule de RK4.","Indice niveau 2 : il y a k1, k2, k3 et k4.","Indice niveau 3 : ce sont 4 évaluations par pas."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce qui arrive si la résolution temporelle est insuffisante.","Indice niveau 2 : le résultat numérique peut osciller ou exploser.","Indice niveau 3 : c'est une instabilité numérique."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Algèbre linéaire numérique")] = {
  objectives: [
    "Décrire le principe de l'élimination de Gauss pour résoudre un système linéaire Ax=b",
    "Définir le conditionnement d'une matrice et son impact sur la sensibilité de la solution aux erreurs d'arrondi",
    "Décrire le principe de la méthode de la puissance itérée pour approcher la valeur propre dominante",
    "Identifier les situations physiques nécessitant la résolution numérique de systèmes linéaires ou de problèmes aux valeurs propres"
  ],
  prereqs: ["Représentation des nombres et erreurs numériques", "Algèbre linéaire (L1-L2)"],
  bodyHtml: `
    <p>Un très grand nombre de problèmes de physique numérique se ramènent, après discrétisation, à la résolution d'un <strong>système linéaire</strong> $A\\vec{x}=\\vec{b}$ (circuits électriques, méthode des éléments finis, systèmes d'équations couplées) ou à un problème aux <strong>valeurs propres</strong> $A\\vec{x}=\\lambda\\vec{x}$ (modes normaux de vibration, niveaux d'énergie en mécanique quantique). Ce chapitre présente les méthodes numériques fondamentales pour ces deux classes de problèmes.</p>

    <h3>1. Élimination de Gauss</h3>
    <p>La méthode d'<strong>élimination de Gauss</strong> résout un système linéaire $A\\vec{x}=\\vec{b}$ en transformant progressivement la matrice augmentée $[A|\\vec{b}]$ en une forme triangulaire supérieure, par combinaisons linéaires successives des lignes (éliminer les coefficients sous la diagonale), puis en résolvant par <strong>substitution arrière</strong>, en partant de la dernière équation.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — pivotage partiel</span>
      Pour garantir la stabilité numérique de l'algorithme, on utilise en pratique un <strong>pivotage partiel</strong> : à chaque étape, on échange les lignes de façon à placer en position de pivot le coefficient de plus grande valeur absolue dans la colonne courante. Sans cette précaution, un pivot proche de zéro peut amplifier considérablement les erreurs d'arrondi (division par un nombre très petit).
    </div>
    <p>Le coût de calcul de l'élimination de Gauss croît comme $O(n^3)$ pour un système de $n$ équations, ce qui devient rapidement prohibitif pour de très grands systèmes (plusieurs milliers d'inconnues) : on préfère alors des méthodes itératives (Jacobi, Gauss-Seidel, gradient conjugué), qui exploitent souvent le caractère creux (majoritairement nul) des matrices issues de la discrétisation spatiale d'équations aux dérivées partielles.</p>

    <h3>2. Conditionnement d'une matrice</h3>
    <p>Le <strong>conditionnement</strong> $\\kappa(A)$ d'une matrice mesure la sensibilité de la solution $\\vec{x}$ aux petites perturbations des données $A$ ou $\\vec{b}$ (notamment aux erreurs d'arrondi, chapitre 1) :</p>
    <div class="formula-box">$$\\kappa(A) = \\|A\\| \\times \\|A^{-1}\\| \\qquad (\\kappa(A) \\geq 1 \\text{ toujours})$$</div>
    <table class="mini-table">
      <tr><th>Conditionnement</th><th>Qualification</th><th>Conséquence pratique</th></tr>
      <tr><td>$\\kappa(A)$ proche de 1</td><td>matrice bien conditionnée</td><td>solution peu sensible aux erreurs d'arrondi, résultat fiable</td></tr>
      <tr><td>$\\kappa(A)$ très grand</td><td>matrice mal conditionnée (proche de la singularité)</td><td>une petite erreur sur A ou b peut provoquer une erreur énorme sur x — résultat numérique peu fiable</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — intuition sur le conditionnement</span>
      <p><strong>Énoncé :</strong> expliquer pourquoi un système linéaire dont la matrice A est proche d'être singulière (déterminant proche de 0) est numériquement délicat à résoudre, même si le déterminant n'est pas mathématiquement nul.</p>
      <p><strong>Solution :</strong> lorsque $\\det(A)$ est proche de 0, les lignes (ou colonnes) de $A$ sont presque linéairement dépendantes : géométriquement, les hyperplans définis par les équations du système sont presque parallèles, et leur intersection (la solution) devient extrêmement sensible à de petites variations de position de ces hyperplans.</p>
      <p class="example-answer">Réponse : une infime erreur d'arrondi sur les coefficients de $A$ ou $\\vec{b}$ peut alors déplacer considérablement le point d'intersection calculé — c'est exactement ce que quantifie un conditionnement élevé.</p>
    </div>

    <h3>3. Problèmes aux valeurs propres : méthode de la puissance itérée</h3>
    <p>De nombreux problèmes physiques (modes normaux, niveaux d'énergie) nécessitent de trouver les <strong>valeurs propres</strong> et <strong>vecteurs propres</strong> d'une matrice. La <strong>méthode de la puissance itérée</strong> permet d'approcher simplement la valeur propre <strong>dominante</strong> (de plus grand module) : partant d'un vecteur initial quelconque $\\vec{v}_0$, on itère $\\vec{v}_{k+1} = A\\vec{v}_k / \\|A\\vec{v}_k\\|$ ; la suite $\\vec{v}_k$ converge vers le vecteur propre associé à la valeur propre dominante, et le quotient de Rayleigh $\\vec{v}_k^T A \\vec{v}_k$ converge vers cette valeur propre elle-même.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La méthode de la puissance itérée ne donne accès qu'à la valeur propre dominante ; pour obtenir l'ensemble du spectre (toutes les valeurs propres), on recourt à des algorithmes plus élaborés comme la méthode QR, hors du cadre de ce cours introductif mais implémentée dans la quasi-totalité des bibliothèques scientifiques (NumPy/LAPACK, par exemple).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Élimination de Gauss : transforme Ax=b en système triangulaire (coût O(n³)) puis résout par substitution arrière ; le pivotage partiel garantit la stabilité</li>
        <li>Conditionnement κ(A) = ‖A‖×‖A⁻¹‖ ≥ 1 : mesure la sensibilité de la solution aux erreurs d'arrondi ; κ élevé = matrice mal conditionnée</li>
        <li>Méthode de la puissance itérée : converge vers la valeur propre dominante par itérations v(k+1)=Av(k)/‖Av(k)‖</li>
        <li>Pour de grands systèmes, on préfère des méthodes itératives (Jacobi, gradient conjugué) exploitant le caractère creux des matrices</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Négliger le pivotage partiel dans l'élimination de Gauss, risquant une division par un pivot proche de zéro et une amplification catastrophique des erreurs</li>
        <li>Croire qu'un déterminant non nul garantit un bon conditionnement : un déterminant très petit (mais non nul) peut correspondre à un conditionnement très élevé</li>
        <li>Croire que la méthode de la puissance itérée donne accès à toutes les valeurs propres : elle ne converge que vers la valeur propre DOMINANTE</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le pivotage partiel dans l'élimination de Gauss sert principalement à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum5e1" value="wrong"> réduire le nombre d'opérations</label>
          <label class="option"><input type="radio" name="physnum5e1" value="right"> éviter une division par un pivot proche de zéro</label>
          <label class="option"><input type="radio" name="physnum5e1" value="wrong"> calculer le déterminant plus vite</label>
          <label class="option"><input type="radio" name="physnum5e1" value="wrong"> résoudre des systèmes non linéaires</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum5e1','physnum5fb1','Correct — en plaçant le plus grand coefficient disponible en position de pivot, on évite une division par une valeur proche de zéro, source d instabilité numérique.','Pense au risque numérique d une division par un nombre très petit.')">Vérifier</button>
        <div class="feedback" id="physnum5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un conditionnement κ(A) très élevé signifie que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum5e2" value="wrong"> la matrice est bien conditionnée</label>
          <label class="option"><input type="radio" name="physnum5e2" value="right"> la solution est très sensible aux erreurs d'arrondi</label>
          <label class="option"><input type="radio" name="physnum5e2" value="wrong"> le système n'a pas de solution</label>
          <label class="option"><input type="radio" name="physnum5e2" value="wrong"> le déterminant est forcément nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum5e2','physnum5fb2','Correct — un conditionnement élevé indique que la matrice est proche d une matrice singulière, rendant la solution numériquement peu fiable.','Un conditionnement élevé indique une matrice PROCHE de la singularité, pas nécessairement singulière.')">Vérifier</button>
        <div class="feedback" id="physnum5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La méthode de la puissance itérée permet d'approcher :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum5e3" value="wrong"> toutes les valeurs propres de A</label>
          <label class="option"><input type="radio" name="physnum5e3" value="right"> uniquement la valeur propre dominante</label>
          <label class="option"><input type="radio" name="physnum5e3" value="wrong"> le déterminant de A</label>
          <label class="option"><input type="radio" name="physnum5e3" value="wrong"> l'inverse de A</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum5e3','physnum5fb3','Correct — la puissance itérée converge vers le vecteur propre associé à la valeur propre de plus grand module, et vers cette valeur propre elle-même via le quotient de Rayleigh.','Cette méthode simple donne accès à une seule valeur propre, la plus grande en module.')">Vérifier</button>
        <div class="feedback" id="physnum5fb3"></div>
      </div>
    </div>
  `
};

PHYSNUM_NOVA_KB[physnumKey("Algèbre linéaire numérique")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Algèbre linéaire numérique ». Demande-moi le pivotage partiel, le conditionnement, la puissance itérée, ou un indice sur un exercice.",
  rules: [
    { test:/gauss|[ée]limination/i, replies:["L'élimination de Gauss transforme Ax=b en système triangulaire par combinaisons de lignes, puis résout par substitution arrière. Coût O(n³). Le pivotage partiel évite les divisions par un pivot proche de zéro."] },
    { test:/pivotage/i, replies:["Le pivotage partiel échange les lignes pour placer le plus grand coefficient disponible en position de pivot, évitant une division par une valeur proche de zéro qui amplifierait les erreurs d'arrondi."] },
    { test:/conditionnement/i, replies:["Le conditionnement κ(A)=‖A‖×‖A⁻¹‖ (toujours ≥1) mesure la sensibilité de la solution aux erreurs d'arrondi : un κ élevé signifie une matrice mal conditionnée, proche de la singularité."] },
    { test:/puissance it[ée]r[ée]e|valeur propre/i, replies:["La méthode de la puissance itérée converge, par itérations v(k+1)=Av(k)/‖Av(k)‖, vers la valeur propre DOMINANTE (la plus grande en module) et son vecteur propre associé — pas vers l'ensemble du spectre."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense au risque numérique d'un petit pivot.","Indice niveau 2 : diviser par un nombre proche de zéro amplifie les erreurs.","Indice niveau 3 : le pivotage évite une division par un pivot proche de zéro."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : un κ élevé indique une proximité avec la singularité.","Indice niveau 2 : cela rend la solution instable face aux erreurs d'arrondi.","Indice niveau 3 : la solution devient très sensible aux erreurs d'arrondi."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cette méthode simple ne donne accès qu'à une seule valeur propre.","Indice niveau 2 : c'est celle de plus grand module.","Indice niveau 3 : uniquement la valeur propre dominante."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Interpolation et ajustement de données")] = {
  objectives: [
    "Construire le polynôme d'interpolation de Lagrange passant par un ensemble de points donnés",
    "Décrire le phénomène de Runge et justifier l'intérêt de l'interpolation par splines",
    "Distinguer interpolation (passage exact par les points) et régression (ajustement au sens des moindres carrés)",
    "Appliquer la méthode des moindres carrés linéaires à un jeu de données expérimentales"
  ],
  prereqs: ["Représentation des nombres et erreurs numériques", "Algèbre linéaire numérique"],
  bodyHtml: `
    <p>En physique expérimentale comme en simulation numérique, on dispose fréquemment d'un ensemble <strong>discret</strong> de points $(x_i, y_i)$ — mesures de laboratoire, résultats d'une simulation à des instants donnés — et l'on souhaite soit passer une courbe exactement par ces points (<strong>interpolation</strong>), soit ajuster un modèle théorique à des données bruitées (<strong>régression</strong>). Ce chapitre distingue clairement ces deux démarches.</p>

    <h3>1. Interpolation polynomiale de Lagrange</h3>
    <p>Étant donné $n+1$ points $(x_0,y_0), \\ldots, (x_n,y_n)$ d'abscisses distinctes, il existe un <strong>unique</strong> polynôme de degré au plus $n$ passant exactement par tous ces points, donné par la <strong>formule de Lagrange</strong> :</p>
    <div class="formula-box">$$P(x) = \\sum_{i=0}^{n} y_i \\, L_i(x), \\qquad L_i(x) = \\prod_{j\\neq i} \\frac{x-x_j}{x_i-x_j}$$</div>
    <p>où chaque polynôme de base $L_i(x)$ vaut $1$ en $x=x_i$ et $0$ en tous les autres points $x_j$.</p>

    <h3>2. Le phénomène de Runge</h3>
    <p>Il serait naturel de penser qu'augmenter le nombre de points d'interpolation améliore toujours la qualité de l'approximation. C'est faux en général : le <strong>phénomène de Runge</strong> montre que, pour des points régulièrement espacés, le polynôme d'interpolation de degré élevé peut développer des <strong>oscillations importantes</strong> près des bords de l'intervalle, dégradant fortement la qualité de l'approximation malgré (ou à cause de) l'augmentation du degré.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi utiliser des splines</span>
      Pour éviter le phénomène de Runge, on préfère en pratique l'interpolation par <strong>splines</strong> : plutôt qu'un unique polynôme de degré élevé sur tout l'intervalle, on utilise une succession de polynômes de bas degré (souvent cubiques), raccordés entre eux avec continuité de la fonction et de ses dérivées première et seconde aux points de raccordement. Cette approche, beaucoup plus stable, est celle utilisée par la quasi-totalité des logiciels scientifiques pour tracer une courbe lisse passant par un ensemble de points expérimentaux.
    </div>

    <h3>3. Interpolation versus régression</h3>
    <table class="mini-table">
      <tr><th>Approche</th><th>Principe</th><th>Situation typique</th></tr>
      <tr><td>Interpolation</td><td>la courbe passe EXACTEMENT par chaque point de données</td><td>données considérées comme exactes (simulation numérique, table de valeurs théoriques)</td></tr>
      <tr><td>Régression (ajustement)</td><td>la courbe minimise un écart global (moindres carrés) sans nécessairement passer par chaque point</td><td>données expérimentales entachées de bruit de mesure</td></tr>
    </table>
    <p>Utiliser l'interpolation sur des données expérimentales bruitées serait une erreur méthodologique : le polynôme d'interpolation reproduirait fidèlement le bruit de mesure lui-même, et non la tendance physique sous-jacente qu'on cherche réellement à extraire.</p>

    <h3>4. Méthode des moindres carrés linéaires</h3>
    <p>Pour ajuster une droite $y = ax+b$ à un jeu de $n$ points expérimentaux $(x_i,y_i)$, la méthode des <strong>moindres carrés</strong> détermine $a$ et $b$ en minimisant la somme des carrés des écarts verticaux entre les points mesurés et la droite modèle :</p>
    <div class="formula-box">$$a = \\frac{n\\sum x_iy_i - \\sum x_i \\sum y_i}{n\\sum x_i^2 - (\\sum x_i)^2} \\qquad b = \\bar{y} - a\\bar{x}$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> on mesure trois points $(1,2)$, $(2,3)$, $(3,5)$. Ajuster une droite $y=ax+b$ par la méthode des moindres carrés.</p>
      <p><strong>Solution :</strong> $\\bar{x}=2$, $\\bar{y}=10/3\\approx3{,}333$. $\\sum x_iy_i = 2+6+15=23$, $\\sum x_i^2=1+4+9=14$, $n=3$, $\\sum x_i=6$, $\\sum y_i=10$. $a = \\dfrac{3\\times23-6\\times10}{3\\times14-36} = \\dfrac{69-60}{42-36} = \\dfrac{9}{6}=1{,}5$. $b = 3{,}333 - 1{,}5\\times2 = 0{,}333$.</p>
      <p class="example-answer">Réponse : la droite d'ajustement est $y \\approx 1{,}5\\,x + 0{,}333$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Interpolation de Lagrange : polynôme unique de degré ≤n passant exactement par n+1 points donnés</li>
        <li>Phénomène de Runge : un polynôme d'interpolation de degré élevé peut osciller fortement près des bords — préférer les splines (polynômes de bas degré raccordés)</li>
        <li>Interpolation (passage exact) pour données exactes ; régression/moindres carrés (ajustement approché) pour données bruitées</li>
        <li>Moindres carrés linéaires : minimisent la somme des écarts au carré entre points mesurés et droite modèle</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser un polynôme d'interpolation de degré élevé sur des points régulièrement espacés, sans anticiper le phénomène de Runge</li>
        <li>Interpoler des données expérimentales bruitées au lieu d'utiliser une régression, ce qui reproduit fidèlement le bruit de mesure au lieu de la tendance physique</li>
        <li>Confondre corrélation (qualité de l'ajustement) et exactitude physique du modèle choisi : un ajustement de bonne qualité statistique ne valide pas nécessairement le modèle physique sous-jacent</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le phénomène de Runge se manifeste par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum6e1" value="wrong"> une convergence toujours meilleure avec le degré</label>
          <label class="option"><input type="radio" name="physnum6e1" value="right"> des oscillations importantes près des bords de l'intervalle</label>
          <label class="option"><input type="radio" name="physnum6e1" value="wrong"> une perte d'unicité du polynôme d'interpolation</label>
          <label class="option"><input type="radio" name="physnum6e1" value="wrong"> une impossibilité de calculer le polynôme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum6e1','physnum6fb1','Correct — pour des points régulièrement espacés, augmenter le degré du polynôme d interpolation peut provoquer de fortes oscillations parasites près des bords.','Le phénomène de Runge n empêche pas de calculer le polynôme, mais dégrade la qualité de l approximation d une façon particulière : où se manifeste-t-elle ?')">Vérifier</button>
        <div class="feedback" id="physnum6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour des données expérimentales bruitées, il est préférable d'utiliser :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum6e2" value="wrong"> l'interpolation de Lagrange</label>
          <label class="option"><input type="radio" name="physnum6e2" value="right"> une régression (moindres carrés)</label>
          <label class="option"><input type="radio" name="physnum6e2" value="wrong"> l'élimination de Gauss</label>
          <label class="option"><input type="radio" name="physnum6e2" value="wrong"> la méthode de Newton-Raphson</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum6e2','physnum6fb2','Correct — la régression extrait la tendance sous-jacente sans reproduire fidèlement le bruit de mesure, contrairement à l interpolation exacte.','L interpolation exacte reproduirait fidèlement le bruit de mesure : cherche l approche qui minimise un écart global.')">Vérifier</button>
        <div class="feedback" id="physnum6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Les splines cubiques évitent le phénomène de Runge en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum6e3" value="wrong"> augmentant encore le degré du polynôme unique</label>
          <label class="option"><input type="radio" name="physnum6e3" value="right"> utilisant plusieurs polynômes de bas degré raccordés</label>
          <label class="option"><input type="radio" name="physnum6e3" value="wrong"> supprimant certains points de données</label>
          <label class="option"><input type="radio" name="physnum6e3" value="wrong"> utilisant uniquement des droites</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum6e3','physnum6fb3','Correct — les splines raccordent plusieurs polynômes de bas degré (souvent cubiques) avec continuité de la fonction et de ses dérivées, évitant les oscillations d un polynôme unique de degré élevé.','Les splines ne sont pas un unique polynôme de haut degré : quelle est leur structure caractéristique ?')">Vérifier</button>
        <div class="feedback" id="physnum6fb3"></div>
      </div>
    </div>
  `
};

PHYSNUM_NOVA_KB[physnumKey("Interpolation et ajustement de données")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Interpolation et ajustement de données ». Demande-moi le phénomène de Runge, la différence interpolation/régression, ou un indice sur un exercice.",
  rules: [
    { test:/lagrange/i, replies:["Le polynôme d'interpolation de Lagrange est l'unique polynôme de degré ≤n passant exactement par n+1 points donnés, construit à partir des polynômes de base L_i(x)."] },
    { test:/runge/i, replies:["Le phénomène de Runge : pour des points régulièrement espacés, un polynôme d'interpolation de degré élevé peut osciller fortement près des bords de l'intervalle. On préfère alors les splines."] },
    { test:/spline/i, replies:["Les splines raccordent plusieurs polynômes de bas degré (souvent cubiques) avec continuité de la fonction et de ses dérivées, évitant les oscillations du phénomène de Runge."] },
    { test:/moindres carr[ée]s|r[ée]gression/i, replies:["La régression par moindres carrés minimise la somme des écarts au carré entre les points mesurés et un modèle (par exemple une droite), sans passer exactement par chaque point — adaptée aux données bruitées."] },
    { test:/interpolation.*r[ée]gression|diff[ée]rence.*interpolation/i, replies:["Interpolation : la courbe passe EXACTEMENT par chaque point (données considérées exactes). Régression : la courbe minimise un écart global, sans passer par chaque point (données bruitées)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le phénomène de Runge dégrade l'approximation d'une façon particulière.","Indice niveau 2 : cela se manifeste près des bords de l'intervalle.","Indice niveau 3 : ce sont des oscillations importantes près des bords."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'interpolation exacte reproduirait le bruit de mesure.","Indice niveau 2 : il faut une méthode qui minimise un écart global.","Indice niveau 3 : c'est la régression (moindres carrés)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : les splines ne sont pas un polynôme unique de haut degré.","Indice niveau 2 : elles utilisent plusieurs polynômes de bas degré.","Indice niveau 3 : raccordés entre eux avec continuité."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 5 — Estimation de π par méthode de Monte Carlo (Chapitre 7)
--------------------------------------------------------------------------------- */
function updatePhysnumMonteCarlo(){
  const n = parseInt(document.getElementById('physnumNmc').value) || 1000;
  const out = document.getElementById('physnumMonteCarloReadout');
  let inside = 0;
  for(let i=0;i<n;i++){
    const x = Math.random()*2-1;
    const y = Math.random()*2-1;
    if(x*x+y*y <= 1) inside++;
  }
  const piEstimate = 4*inside/n;
  const error = Math.abs(piEstimate - Math.PI);
  out.innerHTML =
    `<p>Tirage de ${n} points aléatoires dans le carré [−1,1]×[−1,1] :</p>` +
    `<p>Points tombés dans le disque unité : <strong>${inside}</strong> / ${n}</p>` +
    `<p>Estimation de π = 4 × (points dans le disque)/(points totaux) = 4 × ${inside}/${n} = <strong>${piEstimate.toFixed(5)}</strong></p>` +
    `<p>Valeur exacte : π ≈ 3,14159. Erreur absolue : <strong>${error.toFixed(5)}</strong> (erreur typique en 1/√n — relance le tirage pour voir la variabilité statistique).</p>`;
}
function initPhysnumMonteCarlo(){ updatePhysnumMonteCarlo(); }

/* =========================== CHAPITRE 7 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Méthode de Monte Carlo")] = {
  objectives: [
    "Décrire le principe général des méthodes de Monte Carlo (estimation par tirage aléatoire)",
    "Appliquer la méthode de Monte Carlo à l'estimation d'une intégrale et à l'estimation de π",
    "Justifier la loi de convergence en 1/√N de l'erreur statistique et ses conséquences pratiques",
    "Identifier les situations physiques où Monte Carlo surpasse les méthodes déterministes (haute dimension, physique statistique)"
  ],
  prereqs: ["Intégration numérique", "Probabilités et statistique (L2-L3)"],
  bodyHtml: `
    <p>Les méthodes de <strong>Monte Carlo</strong>, nommées en référence au casino monégasque, exploitent le tirage de nombres aléatoires pour estimer des quantités déterministes — intégrales, aires, volumes — particulièrement lorsque les méthodes classiques (chapitre 3) deviennent inefficaces, notamment en grande dimension. Ces méthodes sont aujourd'hui incontournables en physique statistique, en physique des particules (simulations d'interactions), et en finance quantitative.</p>

    <h3>1. Principe général : estimation par tirage aléatoire</h3>
    <p>L'idée fondamentale consiste à réécrire une quantité déterministe comme l'<strong>espérance mathématique</strong> d'une variable aléatoire, puis à estimer cette espérance par une moyenne empirique sur un grand nombre $N$ de tirages aléatoires indépendants. Le cas le plus emblématique, pédagogiquement, est l'estimation de $\\pi$ par la méthode dite « du disque » :</p>
    <div class="key-point">
      <span class="eyebrow">Estimation de π par tirage aléatoire</span>
      On tire $N$ points aléatoires uniformément dans le carré $[-1,1]\\times[-1,1]$ (d'aire 4) et l'on compte la proportion de points tombant dans le disque unité inscrit (d'aire $\\pi$). Puisque le rapport des aires est $\\pi/4$, on estime : $\\pi \\approx 4 \\times \\dfrac{\\text{points dans le disque}}{\\text{points totaux}}$.
    </div>

    <h3>2. Intégration par Monte Carlo</h3>
    <p>Plus généralement, pour estimer $I = \\int_a^b f(x)\\,dx$, on tire $N$ points $x_i$ uniformément dans $[a,b]$, et l'on estime :</p>
    <div class="formula-box">$$I \\approx (b-a) \\times \\frac{1}{N}\\sum_{i=1}^{N} f(x_i)$$</div>
    <p>Cette approche généralise sans difficulté aux intégrales <strong>multidimensionnelles</strong>, là où les méthodes classiques (Simpson, chapitre 3) souffrent du <strong>fléau de la dimension</strong> : le nombre de points nécessaires pour une méthode de quadrature déterministe croît exponentiellement avec le nombre de dimensions, alors que la méthode de Monte Carlo, elle, conserve toujours la même loi de convergence, quelle que soit la dimension du problème.</p>

    <h3>3. Loi de convergence en $1/\\sqrt{N}$</h3>
    <p>L'erreur statistique typique d'une estimation de Monte Carlo décroît comme :</p>
    <div class="formula-box">$$\\text{erreur} \\sim \\frac{\\sigma}{\\sqrt{N}}$$</div>
    <p>où $\\sigma$ est l'écart-type de la quantité échantillonnée. Cette convergence en $1/\\sqrt{N}$ est <strong>indépendante de la dimension du problème</strong> — c'est précisément cet avantage qui rend Monte Carlo compétitif, voire indispensable, en grande dimension, malgré une convergence relativement lente comparée aux méthodes déterministes en basse dimension (Simpson converge en $O(h^4)$, beaucoup plus rapide en dimension 1).</p>
    <table class="mini-table">
      <tr><th>Multiplication de N par</th><th>Réduction typique de l'erreur</th></tr>
      <tr><td>4</td><td>divisée par 2</td></tr>
      <tr><td>100</td><td>divisée par 10</td></tr>
      <tr><td>10 000</td><td>divisée par 100</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une estimation Monte Carlo avec $N=10\\,000$ tirages donne une erreur typique de $0{,}01$. Combien de tirages faudrait-il pour diviser cette erreur par 10 ?</p>
      <p><strong>Solution :</strong> l'erreur décroissant en $1/\\sqrt{N}$, la diviser par 10 nécessite de multiplier $N$ par $10^2=100$.</p>
      <p class="example-answer">Réponse : il faudrait $N = 10\\,000 \\times 100 = 1\\,000\\,000$ tirages — illustration du coût élevé d'un gain de précision supplémentaire par Monte Carlo, malgré sa robustesse en haute dimension.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Monte Carlo estime une quantité déterministe comme l'espérance d'une variable aléatoire, approchée par une moyenne empirique</li>
        <li>Estimation de π : ratio des points tombant dans un disque inscrit dans un carré, sur un grand nombre de tirages</li>
        <li>Erreur statistique en O(1/√N), INDÉPENDANTE de la dimension du problème — avantage décisif en haute dimension</li>
        <li>Diviser l'erreur par 10 nécessite de multiplier N par 100 : convergence lente en basse dimension, mais incontournable en haute dimension (fléau de la dimension pour les méthodes déterministes)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que Monte Carlo est toujours plus efficace que les méthodes déterministes : en basse dimension (1D, 2D), Simpson ou les méthodes classiques convergent bien plus vite</li>
        <li>Oublier que l'erreur de Monte Carlo est de nature STATISTIQUE (elle varie d'un tirage à l'autre) et non déterministe comme celle des méthodes classiques</li>
        <li>Négliger l'indépendance des tirages aléatoires : des tirages corrélés biaisent l'estimation et invalident la loi de convergence en 1/√N</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — estimation de π par Monte Carlo</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Relance le tirage pour observer la variabilité statistique de l'estimation.</p>
      <div class="sim-controls">
        <label>N (tirages) : <input type="number" id="physnumNmc" value="1000" min="10" max="1000000" style="width:90px;" oninput="updatePhysnumMonteCarlo()"></label>
        <button class="btn btn-primary" onclick="updatePhysnumMonteCarlo()" style="margin-left:8px;">Relancer le tirage</button>
        <div class="sim-readout" id="physnumMonteCarloReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'erreur statistique d'une estimation de Monte Carlo décroît comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum7e1" value="wrong"> 1/N</label>
          <label class="option"><input type="radio" name="physnum7e1" value="right"> 1/√N</label>
          <label class="option"><input type="radio" name="physnum7e1" value="wrong"> 1/N²</label>
          <label class="option"><input type="radio" name="physnum7e1" value="wrong"> N</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum7e1','physnum7fb1','Correct — c est la loi centrale de convergence de Monte Carlo, indépendante de la dimension du problème.','C est une loi statistique classique liée à l écart-type d une moyenne empirique sur N tirages.')">Vérifier</button>
        <div class="feedback" id="physnum7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour diviser l'erreur de Monte Carlo par 10, il faut multiplier N par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum7e2" value="wrong"> 10</label>
          <label class="option"><input type="radio" name="physnum7e2" value="right"> 100</label>
          <label class="option"><input type="radio" name="physnum7e2" value="wrong"> 1000</label>
          <label class="option"><input type="radio" name="physnum7e2" value="wrong"> 2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum7e2','physnum7fb2','Correct — puisque l erreur varie comme 1 sur racine de N, diviser l erreur par 10 exige de multiplier N par 10 au carré, soit 100.','Utilise la loi 1/racine(N) : quelle multiplication de N donne une division par 10 de l erreur ?')">Vérifier</button>
        <div class="feedback" id="physnum7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'avantage principal de Monte Carlo sur les méthodes déterministes (Simpson) apparaît :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum7e3" value="wrong"> en dimension 1 uniquement</label>
          <label class="option"><input type="radio" name="physnum7e3" value="right"> en haute dimension</label>
          <label class="option"><input type="radio" name="physnum7e3" value="wrong"> pour les fonctions polynomiales</label>
          <label class="option"><input type="radio" name="physnum7e3" value="wrong"> jamais, Simpson est toujours meilleur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum7e3','physnum7fb3','Correct — la convergence de Monte Carlo en 1/racine(N) est indépendante de la dimension, contrairement aux méthodes déterministes qui souffrent du fléau de la dimension.','Pense au fléau de la dimension pour les méthodes déterministes : quel régime avantage Monte Carlo ?')">Vérifier</button>
        <div class="feedback" id="physnum7fb3"></div>
      </div>
    </div>
  `,
  init: initPhysnumMonteCarlo
};

PHYSNUM_NOVA_KB[physnumKey("Méthode de Monte Carlo")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Méthode de Monte Carlo ». Demande-moi la loi de convergence 1/√N, l'estimation de π, ou un indice sur un exercice.",
  rules: [
    { test:/1\/.?racine|1\/√n|convergence.*monte carlo/i, replies:["L'erreur statistique de Monte Carlo décroît comme 1/√N, indépendamment de la dimension du problème — c'est ce qui la rend compétitive en haute dimension malgré une convergence lente en basse dimension."] },
    { test:/estimation.*pi|π.*monte carlo/i, replies:["On tire N points aléatoires dans un carré [-1,1]×[-1,1] et on compte ceux tombant dans le disque unité inscrit : π ≈ 4×(points dans le disque)/(points totaux)."] },
    { test:/fl[ée]au de la dimension|haute dimension/i, replies:["Le fléau de la dimension pénalise les méthodes déterministes (Simpson...) dont le coût croît exponentiellement avec la dimension. Monte Carlo, lui, garde toujours la même convergence en 1/√N, quelle que soit la dimension."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : c'est une loi statistique classique liée à la moyenne empirique.","Indice niveau 2 : elle dépend de la racine carrée de N.","Indice niveau 3 : l'erreur décroît en 1/√N."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la loi 1/√N.","Indice niveau 2 : diviser l'erreur par 10 revient à multiplier N par 10².","Indice niveau 3 : il faut multiplier N par 100."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au fléau de la dimension.","Indice niveau 2 : les méthodes déterministes souffrent en dimension élevée.","Indice niveau 3 : c'est en haute dimension que Monte Carlo excelle."] }
  ]
};

/* =========================== CHAPITRE 8 =========================== */
PHYSNUM_CHAPTERS[physnumKey("Transformée de Fourier discrète et applications")] = {
  objectives: [
    "Définir la transformée de Fourier discrète (TFD) d'un signal échantillonné",
    "Énoncer le théorème de Shannon-Nyquist et le phénomène de repliement de spectre (aliasing)",
    "Décrire le principe et l'intérêt de l'algorithme de transformée de Fourier rapide (FFT)",
    "Identifier des applications physiques de l'analyse spectrale numérique (traitement du signal, analyse vibratoire)"
  ],
  prereqs: ["Ondes et vibrations", "Séries de Fourier (L2-L3)"],
  bodyHtml: `
    <p>Ce dernier chapitre aborde l'un des outils les plus puissants et les plus utilisés en physique numérique : la <strong>transformée de Fourier discrète</strong> (TFD), qui permet d'analyser le contenu fréquentiel d'un signal physique échantillonné — vibrations mécaniques, signaux électriques, spectres de puissance en cosmologie, traitement d'image.</p>

    <h3>1. De la transformée de Fourier continue à la transformée discrète</h3>
    <p>Un signal physique n'est jamais mesuré de façon continue mais <strong>échantillonné</strong> à des instants discrets $t_n = n\\,\\Delta t$, pour $n=0,\\ldots,N-1$. La <strong>transformée de Fourier discrète (TFD)</strong> d'une suite de $N$ échantillons $x_n$ est définie par :</p>
    <div class="formula-box">$$X_k = \\sum_{n=0}^{N-1} x_n \\, e^{-2i\\pi kn/N}, \\qquad k=0,\\ldots,N-1$$</div>
    <p>Chaque coefficient $X_k$ mesure l'amplitude (et la phase) de la composante fréquentielle correspondant à la fréquence $f_k = k/(N\\Delta t)$ présente dans le signal échantillonné.</p>

    <h3>2. Théorème de Shannon-Nyquist et repliement de spectre</h3>
    <p>Le <strong>théorème d'échantillonnage de Shannon-Nyquist</strong> établit une condition essentielle : pour reconstruire fidèlement un signal contenant des fréquences jusqu'à $f_{max}$, la <strong>fréquence d'échantillonnage</strong> $f_e = 1/\\Delta t$ doit être au moins égale au double de $f_{max}$ :</p>
    <div class="formula-box">$$f_e \\geq 2\\,f_{max} \\qquad \\text{(fréquence de Nyquist : } f_{Nyquist} = f_e/2\\text{)}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — repliement de spectre (aliasing)</span>
      Si cette condition n'est pas respectée, les composantes de fréquence supérieure à la fréquence de Nyquist ne disparaissent pas : elles se « replient » et apparaissent, à tort, comme des composantes de basse fréquence dans le spectre calculé — un artefact appelé <strong>repliement de spectre</strong> (ou <em>aliasing</em>), bien connu en imagerie (motif de moiré) et en acoustique (roues qui semblent tourner à l'envers dans une vidéo sous-échantillonnée).
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un signal contient des composantes fréquentielles jusqu'à 500 Hz. Quelle fréquence d'échantillonnage minimale faut-il utiliser pour éviter tout repliement de spectre ?</p>
      <p><strong>Solution :</strong> d'après le théorème de Shannon-Nyquist, $f_e \\geq 2 \\times f_{max} = 2\\times500$.</p>
      <p class="example-answer">Réponse : $f_e \\geq 1000$ Hz — c'est d'ailleurs très exactement pour cette raison que le CD audio (fréquences audibles jusqu'à environ 20 kHz) utilise une fréquence d'échantillonnage standard de 44,1 kHz, confortablement supérieure au double de 20 kHz.</p>
    </div>

    <h3>3. L'algorithme de transformée de Fourier rapide (FFT)</h3>
    <p>Le calcul direct de la TFD, à partir de sa définition, nécessite $O(N^2)$ opérations. L'algorithme de <strong>transformée de Fourier rapide</strong> (FFT, <em>Fast Fourier Transform</em>), découvert par Cooley et Tukey en 1965 (mais dont le principe remonte en réalité à Gauss), exploite la structure récursive du problème pour réduire ce coût à seulement $O(N\\log N)$ — un gain absolument considérable dès que $N$ devient grand.</p>
    <table class="mini-table">
      <tr><th>N (taille du signal)</th><th>Coût TFD directe O(N²)</th><th>Coût FFT O(N log N)</th><th>Facteur de gain</th></tr>
      <tr><td>1 000</td><td>≈ 10⁶</td><td>≈ 10⁴</td><td>≈ 100×</td></tr>
      <tr><td>1 000 000</td><td>≈ 10¹²</td><td>≈ 2×10⁷</td><td>≈ 50 000×</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ce gain d'efficacité spectaculaire explique pourquoi la FFT est considérée comme l'un des algorithmes les plus influents du XXe siècle : elle rend praticable, en temps de calcul raisonnable, l'analyse spectrale de signaux comportant des millions, voire des milliards de points, omniprésente en traitement du signal, en compression audio/image, en analyse sismologique, ou encore en traitement des données d'observations astronomiques.
    </div>

    <h3>4. Applications physiques de l'analyse spectrale</h3>
    <p>L'analyse par transformée de Fourier permet, entre autres applications physiques : d'identifier les <strong>fréquences propres</strong> d'un système mécanique vibrant à partir d'un enregistrement temporel de son mouvement ; de filtrer un signal bruité en supprimant certaines bandes de fréquences dans le domaine spectral avant de revenir au domaine temporel ; ou encore d'analyser le contenu spectral d'une onde (acoustique, sismique, électromagnétique) pour en extraire des informations physiques inaccessibles dans le domaine temporel seul.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>TFD : X_k = somme des x_n × exp(−2iπkn/N), extrait l'amplitude et la phase de chaque composante fréquentielle d'un signal échantillonné</li>
        <li>Shannon-Nyquist : fe ≥ 2×fmax pour éviter le repliement de spectre (aliasing)</li>
        <li>Repliement de spectre : les fréquences au-delà de fe/2 se replient et apparaissent faussement en basse fréquence</li>
        <li>FFT : réduit le coût de calcul de O(N²) à O(N log N) — gain considérable pour les grands signaux</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Sous-échantillonner un signal (fe trop faible par rapport à fmax), provoquant un repliement de spectre qui fausse totalement l'interprétation du spectre calculé</li>
        <li>Confondre la fréquence d'échantillonnage fe et la fréquence de Nyquist fe/2 (fréquence maximale correctement représentée sans repliement)</li>
        <li>Croire que FFT et TFD sont deux transformations mathématiquement différentes : la FFT calcule exactement la même TFD, seulement de façon beaucoup plus rapide</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">D'après le théorème de Shannon-Nyquist, pour un signal contenant des fréquences jusqu'à 200 Hz, la fréquence d'échantillonnage minimale est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum8e1" value="wrong"> 100 Hz</label>
          <label class="option"><input type="radio" name="physnum8e1" value="wrong"> 200 Hz</label>
          <label class="option"><input type="radio" name="physnum8e1" value="right"> 400 Hz</label>
          <label class="option"><input type="radio" name="physnum8e1" value="wrong"> 800 Hz</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum8e1','physnum8fb1','Correct — fe doit être au moins le double de fmax : 2×200=400 Hz.','Applique directement fe ≥ 2×fmax.')">Vérifier</button>
        <div class="feedback" id="physnum8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le repliement de spectre (aliasing) se produit lorsque :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum8e2" value="wrong"> le signal est trop bruité</label>
          <label class="option"><input type="radio" name="physnum8e2" value="right"> la fréquence d'échantillonnage est trop faible par rapport aux fréquences du signal</label>
          <label class="option"><input type="radio" name="physnum8e2" value="wrong"> le nombre de points N est trop grand</label>
          <label class="option"><input type="radio" name="physnum8e2" value="wrong"> on utilise l'algorithme FFT au lieu de la TFD directe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum8e2','physnum8fb2','Correct — un sous-échantillonnage (fe trop faible) fait apparaitre à tort les hautes fréquences comme des basses fréquences dans le spectre calculé.','Repense au théorème de Shannon-Nyquist : quelle condition sur fe n est alors pas respectée ?')">Vérifier</button>
        <div class="feedback" id="physnum8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'algorithme FFT réduit le coût de calcul de la transformée de Fourier discrète de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="physnum8e3" value="wrong"> O(N) à O(1)</label>
          <label class="option"><input type="radio" name="physnum8e3" value="right"> O(N²) à O(N log N)</label>
          <label class="option"><input type="radio" name="physnum8e3" value="wrong"> O(N³) à O(N²)</label>
          <label class="option"><input type="radio" name="physnum8e3" value="wrong"> elle ne réduit aucun coût, juste une autre méthode équivalente</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('physnum8e3','physnum8fb3','Correct — la FFT calcule exactement la même transformée que la TFD directe, mais en exploitant sa structure récursive pour passer de O(N²) à O(N log N).','La TFD directe, calculée depuis sa définition, coûte O(N²) ; la FFT exploite une structure récursive pour faire beaucoup mieux.')">Vérifier</button>
        <div class="feedback" id="physnum8fb3"></div>
      </div>
    </div>
  `
};

PHYSNUM_NOVA_KB[physnumKey("Transformée de Fourier discrète et applications")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Transformée de Fourier discrète et applications ». Demande-moi le théorème de Shannon-Nyquist, ce qu'est la FFT, ou un indice sur un exercice.",
  rules: [
    { test:/shannon|nyquist/i, replies:["Le théorème de Shannon-Nyquist impose fe ≥ 2×fmax pour éviter le repliement de spectre. La fréquence de Nyquist est fe/2, la fréquence maximale correctement représentée."] },
    { test:/repliement|aliasing/i, replies:["Le repliement de spectre (aliasing) se produit quand fe est trop faible : les fréquences au-delà de fe/2 se replient et apparaissent faussement comme des basses fréquences dans le spectre calculé."] },
    { test:/fft|fourier rapide/i, replies:["La FFT (Fast Fourier Transform) calcule exactement la même TFD que le calcul direct, mais réduit le coût de O(N²) à O(N log N) en exploitant la structure récursive du problème — un gain énorme pour les grands signaux."] },
    { test:/tfd|transform[ée]e.*discr[èe]te/i, replies:["La TFD (transformée de Fourier discrète) d'un signal échantillonné x_n est X_k = somme de x_n × exp(−2iπkn/N), qui extrait l'amplitude et la phase de chaque composante fréquentielle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique directement fe ≥ 2×fmax.","Indice niveau 2 : fmax vaut 200 Hz ici.","Indice niveau 3 : fe minimale = 400 Hz."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à la condition de Shannon-Nyquist.","Indice niveau 2 : quelle condition sur fe n'est pas respectée en cas d'aliasing ?","Indice niveau 3 : c'est une fréquence d'échantillonnage trop faible."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare le coût direct et le coût avec FFT.","Indice niveau 2 : le calcul direct est en O(N²).","Indice niveau 3 : la FFT le réduit à O(N log N)."] }
  ]
};

/* fusionne le module Physique numérique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, PHYSNUM_CHAPTERS);
Object.assign(NOVA_KB, PHYSNUM_NOVA_KB);