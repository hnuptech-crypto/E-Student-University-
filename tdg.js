/* =====================================================================
   CHUNK « tdg » — registre TDG_CHAPTERS / TDG_NOVA_KB
   Matière(s) : Mathématiques|Théorie des groupes
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   TDG_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================
   MATIÈRE — Théorie des groupes (L3CF, domaine Mathématiques)
   Structure identique aux autres modules : TDG_CHAPTERS / TDG_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : axiomes de groupe, sous-groupes, groupes de symétrie
   moléculaire, tables de caractères, représentations réductibles et
   irréductibles, produits directs, applications à la chimie quantique
   et à la spectroscopie (lien explicite avec les modules de chimie).
=================================================================== */
const TDG_MATIERE = 'Théorie des groupes';
function tdgKey(chapterTitle){ return `Mathématiques|${TDG_MATIERE}|${chapterTitle}`; }
const TDG_CHAPTERS = {};
const TDG_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Vérificateur des axiomes de groupe sur une loi de composition modulo n
   (Chapitre 1)
--------------------------------------------------------------------------------- */
function updateTdgModulo(){
  const n = parseInt(document.getElementById('tdgN').value) || 2;
  const out = document.getElementById('tdgModuloReadout');
  let table = '<table class="mini-table"><tr><th>+ mod ' + n + '</th>';
  for(let j=0;j<n;j++) table += `<th>${j}</th>`;
  table += '</tr>';
  for(let i=0;i<n;i++){
    table += `<tr><th>${i}</th>`;
    for(let j=0;j<n;j++){ table += `<td>${(i+j)%n}</td>`; }
    table += '</tr>';
  }
  table += '</table>';
  out.innerHTML = `<p>Table de la loi + (addition modulo ${n}) sur l'ensemble {0,1,...,${n-1}} :</p>${table}` +
    `<p style="margin-top:8px;">Élément neutre : <strong>0</strong>. Inverse de k : <strong>${n}-k (mod ${n})</strong>. Cette structure est le groupe cyclique <strong>ℤ/${n}ℤ</strong>, d'ordre ${n}.</p>`;
}
function initTdgModulo(){ updateTdgModulo(); }

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Identificateur de groupe ponctuel simplifié (Chapitre 3)
--------------------------------------------------------------------------------- */
const TDG_POINTGROUPS = {
  none: { label: "Aucun élément de symétrie particulier (hors E)", group: "C1" },
  cn_only: { label: "Un seul axe Cn, sans plan ni autre élément", group: "Cn" },
  cn_sigmah: { label: "Axe Cn + plan σh perpendiculaire à l'axe", group: "Cnh" },
  cn_sigmav: { label: "Axe Cn + n plans σv contenant l'axe", group: "Cnv" },
  dn_full: { label: "Axe Cn + n axes C2 perpendiculaires + σh", group: "Dnh" },
  td: { label: "4 axes C3 + 3 axes C2 (tétraèdre régulier, ex. CH4)", group: "Td" },
  oh: { label: "3 axes C4 + 4 axes C3 + centre d'inversion (octaèdre, ex. SF6)", group: "Oh" }
};
function updateTdgPointGroup(){
  const sel = document.getElementById('tdgPGSelect').value;
  const d = TDG_POINTGROUPS[sel];
  document.getElementById('tdgPGReadout').innerHTML =
    `<strong>Éléments observés :</strong> ${d.label}<br><strong>Groupe ponctuel probable :</strong> ${d.group}`;
}
function initTdgPointGroup(){ updateTdgPointGroup(); }

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Calculateur de réduction d'une représentation réductible
   (formule de réduction, Chapitre 5)
--------------------------------------------------------------------------------- */
function updateTdgReduction(){
  const g = parseInt(document.getElementById('tdgOrderG').value) || 1;
  const chiStr = document.getElementById('tdgChiGamma').value || '';
  const chiIrrStr = document.getElementById('tdgChiIrr').value || '';
  const classSizeStr = document.getElementById('tdgClassSizes').value || '';
  const out = document.getElementById('tdgReductionReadout');
  try{
    const chi = chiStr.split(',').map(Number);
    const chiIrr = chiIrrStr.split(',').map(Number);
    const h = classSizeStr.split(',').map(Number);
    if(chi.length !== chiIrr.length || chi.length !== h.length){
      out.innerHTML = 'Les trois listes doivent avoir le même nombre de valeurs (une par classe de symétrie).';
      return;
    }
    let sum = 0;
    let detail = [];
    for(let i=0;i<chi.length;i++){
      const term = h[i]*chi[i]*chiIrr[i];
      sum += term;
      detail.push(`${h[i]}×${chi[i]}×${chiIrr[i]}=${term}`);
    }
    const n = sum / g;
    out.innerHTML =
      `n(i) = (1/${g}) × [${detail.join(' + ')}] = (1/${g}) × ${sum} = <strong>${n.toFixed(3)}</strong>` +
      (Number.isInteger(n) ? ` → cette représentation irréductible apparaît <strong>${n}</strong> fois dans Γ.` : ' → valeur non entière : vérifier les caractères saisis.');
  }catch(e){
    out.innerHTML = 'Entrée invalide : utilise des nombres séparés par des virgules.';
  }
}
function initTdgReduction(){ updateTdgReduction(); }

/* =========================== CHAPITRE 1 =========================== */
TDG_CHAPTERS[tdgKey("Structure de groupe : axiomes et premiers exemples")] = {
  objectives: [
    "Énoncer les quatre axiomes définissant une structure de groupe",
    "Vérifier qu'un ensemble muni d'une loi de composition interne constitue un groupe",
    "Distinguer groupe abélien (commutatif) et groupe non abélien",
    "Construire la table de composition (table de Cayley) d'un groupe fini"
  ],
  prereqs: ["Algèbre générale de L1-L2 (ensembles, applications, lois de composition)"],
  bodyHtml: `
    <p>La théorie des groupes est l'une des branches les plus structurantes des mathématiques modernes : elle formalise l'idée de <strong>symétrie</strong> et fournit un langage rigoureux, applicable aussi bien à la cristallographie (réseaux de Bravais), qu'à la physique des particules ou, comme le retrouvera le cours de chimie quantique de ce même semestre, à la symétrie des molécules et à la spectroscopie. Ce premier chapitre pose la définition axiomatique d'un groupe et l'illustre sur des exemples élémentaires.</p>

    <h3>1. Définition axiomatique d'un groupe</h3>
    <p>Un <strong>groupe</strong> $(G, *)$ est un ensemble $G$ muni d'une loi de composition interne $*$ vérifiant quatre axiomes :</p>
    <table class="mini-table">
      <tr><th>Axiome</th><th>Énoncé</th></tr>
      <tr><td>1. Fermeture (stabilité)</td><td>$\\forall a,b \\in G,\ a*b \\in G$</td></tr>
      <tr><td>2. Associativité</td><td>$\\forall a,b,c \\in G,\ (a*b)*c = a*(b*c)$</td></tr>
      <tr><td>3. Élément neutre</td><td>$\\exists e \\in G,\ \\forall a \\in G,\ e*a = a*e = a$</td></tr>
      <tr><td>4. Élément inverse</td><td>$\\forall a \\in G,\ \\exists a^{-1} \\in G,\ a*a^{-1} = a^{-1}*a = e$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ces quatre axiomes, en apparence abstraits, se retrouveront à l'identique lorsque l'on étudiera l'ensemble des opérations de symétrie d'une molécule (chapitre 3) : la composition de deux opérations de symétrie reste une opération de symétrie (fermeture), il existe toujours l'opération identité E (élément neutre), et chaque opération peut être « défaite » par son inverse.
    </div>
    <p>Un groupe est dit <strong>abélien</strong> (ou commutatif) si, de plus, $a*b = b*a$ pour tous $a,b \\in G$. Dans le cas contraire, il est dit <strong>non abélien</strong>. L'ordre d'un groupe fini, noté $|G|$, est le nombre d'éléments qu'il contient.</p>

    <h3>2. Premiers exemples</h3>
    <table class="mini-table">
      <tr><th>Ensemble et loi</th><th>Vérification rapide</th><th>Abélien ?</th></tr>
      <tr><td>$(\\mathbb{Z}, +)$</td><td>fermeture, associativité, neutre = 0, inverse de $n$ est $-n$</td><td>oui</td></tr>
      <tr><td>$(\\mathbb{Q}^*, \\times)$</td><td>neutre = 1, inverse de $q$ est $1/q$</td><td>oui</td></tr>
      <tr><td>$(\\mathbb{Z}/n\\mathbb{Z}, +)$</td><td>addition modulo $n$, groupe cyclique fini d'ordre $n$</td><td>oui</td></tr>
      <tr><td>Groupe des permutations $S_n$</td><td>composition de permutations d'un ensemble à $n$ éléments</td><td>non (pour $n \\geq 3$)</td></tr>
      <tr><td>$(\\mathbb{N}, +)$</td><td>PAS un groupe : aucun inverse pour $n \\geq 1$ (sauf 0)</td><td>—</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> l'ensemble $\{1,-1\}$ muni de la multiplication usuelle est-il un groupe ?</p>
      <p><strong>Solution :</strong> fermeture : $1\\times1=1$, $1\\times(-1)=-1$, $(-1)\\times(-1)=1$, tous dans l'ensemble. Associativité : héritée de la multiplication réelle. Élément neutre : $1$. Inverse : $1^{-1}=1$, $(-1)^{-1}=-1$ (chaque élément est son propre inverse).</p>
      <p class="example-answer">Réponse : oui, $(\{1,-1\},\\times)$ est un groupe abélien d'ordre 2 — c'est en réalité le plus petit groupe non trivial, souvent noté $C_2$ ou $\\mathbb{Z}/2\\mathbb{Z}$.</p>
    </div>

    <h3>3. Table de composition (table de Cayley)</h3>
    <p>Pour un groupe fini, on résume entièrement la loi de composition dans une <strong>table de Cayley</strong> : un tableau carré dont chaque case $(i,j)$ contient le résultat $g_i * g_j$. Une propriété remarquable de cette table est que <strong>chaque ligne et chaque colonne contient chaque élément du groupe exactement une fois</strong> — conséquence directe de l'existence d'un inverse pour chaque élément (théorème du réarrangement).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le théorème du réarrangement est un outil de vérification très utile : si une ligne ou une colonne d'une table de composition censée décrire un groupe contient un élément répété (ou un élément absent), alors la structure proposée n'est PAS un groupe.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>4 axiomes d'un groupe : fermeture, associativité, élément neutre, élément inverse</li>
        <li>Groupe abélien : $a*b=b*a$ pour tous les éléments ; sinon, groupe non abélien</li>
        <li>$(\\mathbb{N},+)$ n'est PAS un groupe (pas d'inverse) ; $(\\mathbb{Z},+)$ en est un</li>
        <li>Table de Cayley : chaque élément apparaît exactement une fois par ligne et par colonne (théorème du réarrangement)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de vérifier la fermeture : un sous-ensemble « naturel » n'est pas toujours stable par la loi considérée</li>
        <li>Confondre élément neutre (unique, agit sur tout le groupe) et élément inverse (propre à chaque élément)</li>
        <li>Croire qu'un groupe est nécessairement abélien : dès que $n\\geq 3$, le groupe des permutations $S_n$ ne l'est plus</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Générateur — table de Cayley du groupe cyclique ℤ/nℤ</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis un ordre n pour générer la table d'addition modulo n et vérifier les axiomes.</p>
      <div class="sim-controls">
        <label>n : <input type="number" id="tdgN" value="4" min="2" max="8" style="width:60px;" oninput="updateTdgModulo()"></label>
        <div class="sim-readout" id="tdgModuloReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'ensemble $(\\mathbb{N}, +)$ n'est pas un groupe car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg1e1" value="wrong"> la loi + n'est pas associative sur ℕ</label>
          <label class="option"><input type="radio" name="tdg1e1" value="wrong"> il n'y a pas d'élément neutre</label>
          <label class="option"><input type="radio" name="tdg1e1" value="right"> la plupart des éléments n'ont pas d'inverse dans ℕ</label>
          <label class="option"><input type="radio" name="tdg1e1" value="wrong"> la loi + n'est pas interne à ℕ</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg1e1','tdg1fb1','Correct — 0 est bien neutre et + est associative et interne, mais aucun entier positif n a d inverse dans N (ex : il n existe pas d entier naturel k tel que 3+k=0).','L addition est bien interne et associative, et 0 est neutre : le problème vient d ailleurs, du 4e axiome.')">Vérifier</button>
        <div class="feedback" id="tdg1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans une table de Cayley d'un groupe fini, chaque élément apparaît dans une ligne donnée :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg1e2" value="wrong"> zéro ou une fois</label>
          <label class="option"><input type="radio" name="tdg1e2" value="right"> exactement une fois</label>
          <label class="option"><input type="radio" name="tdg1e2" value="wrong"> autant de fois que l'ordre du groupe</label>
          <label class="option"><input type="radio" name="tdg1e2" value="wrong"> deux fois exactement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg1e2','tdg1fb2','Correct — c est le théorème du réarrangement, conséquence directe de l existence d un inverse pour chaque élément du groupe.','Pense au théorème du réarrangement, lié à l existence d un inverse pour chaque élément.')">Vérifier</button>
        <div class="feedback" id="tdg1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le groupe des permutations $S_n$ (n≥3) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg1e3" value="wrong"> toujours abélien</label>
          <label class="option"><input type="radio" name="tdg1e3" value="right"> non abélien</label>
          <label class="option"><input type="radio" name="tdg1e3" value="wrong"> jamais un groupe</label>
          <label class="option"><input type="radio" name="tdg1e3" value="wrong"> d'ordre infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg1e3','tdg1fb3','Correct — dès que n est au moins 3, composer deux permutations dans un ordre ou dans l autre donne généralement des résultats différents.','Essaie de composer deux permutations simples de trois éléments dans les deux ordres : obtiens-tu le même résultat ?')">Vérifier</button>
        <div class="feedback" id="tdg1fb3"></div>
      </div>
    </div>
  `,
  init: initTdgModulo
};

TDG_NOVA_KB[tdgKey("Structure de groupe : axiomes et premiers exemples")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Structure de groupe : axiomes et premiers exemples ». Demande-moi les 4 axiomes, un exemple de groupe, ou un indice sur un exercice.",
  rules: [
    { test:/axiome|d[ée]finition.*groupe/i, replies:["Les 4 axiomes d'un groupe : fermeture (a*b reste dans G), associativité, existence d'un élément neutre, existence d'un inverse pour chaque élément."] },
    { test:/ab[ée]lien|commutatif/i, replies:["Un groupe est abélien si a*b=b*a pour tous les éléments. (Z,+) est abélien ; le groupe des permutations S_n (n≥3) ne l'est pas."] },
    { test:/cayley|table de composition/i, replies:["La table de Cayley résume la loi de composition d'un groupe fini : chaque élément apparaît exactement une fois par ligne et par colonne (théorème du réarrangement)."] },
    { test:/\bn\b.*groupe|entiers naturels/i, replies:["(N,+) n'est PAS un groupe : bien que + soit interne, associative, avec 0 comme neutre, aucun entier positif n'a d'inverse dans N."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : vérifie chaque axiome un par un pour N.","Indice niveau 2 : les trois premiers axiomes sont vérifiés, cherche le 4e.","Indice niveau 3 : c'est l'absence d'inverse qui pose problème."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au théorème du réarrangement.","Indice niveau 2 : ce théorème découle de l'existence d'un inverse pour chaque élément.","Indice niveau 3 : chaque élément apparaît exactement une fois par ligne."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : essaie de composer deux permutations dans les deux ordres.","Indice niveau 2 : le résultat diffère généralement dès n=3.","Indice niveau 3 : S_n est non abélien pour n≥3."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
TDG_CHAPTERS[tdgKey("Sous-groupes, classes et groupes cycliques")] = {
  objectives: [
    "Définir un sous-groupe et énoncer le critère pratique de reconnaissance d'un sous-groupe",
    "Définir l'ordre d'un élément et construire un groupe cyclique engendré par un élément",
    "Définir la relation de conjugaison et regrouper les éléments d'un groupe en classes de conjugaison",
    "Énoncer le théorème de Lagrange et son corollaire sur l'ordre des sous-groupes"
  ],
  prereqs: ["Structure de groupe : axiomes et premiers exemples"],
  bodyHtml: `
    <p>Après avoir posé la définition d'un groupe, ce chapitre introduit les notions structurantes qui permettront, au chapitre suivant, de classer systématiquement les groupes de symétrie moléculaire : sous-groupe, groupe cyclique, et surtout la notion de <strong>classe de conjugaison</strong>, indispensable pour construire les tables de caractères (chapitre 4).</p>

    <h3>1. Sous-groupes</h3>
    <p>Un sous-ensemble $H \\subseteq G$ est un <strong>sous-groupe</strong> de $(G,*)$ si $(H,*)$ est lui-même un groupe. En pratique, il suffit de vérifier trois conditions plus légères que de repartir des quatre axiomes complets :</p>
    <div class="formula-box">$$H \\neq \\emptyset, \\quad \\forall a,b \\in H,\\ a*b \\in H, \\quad \\forall a \\in H,\\ a^{-1} \\in H$$</div>
    <p>Tout groupe $G$ admet au moins deux sous-groupes triviaux : $\\{e\\}$ (le sous-groupe réduit à l'identité) et $G$ lui-même. Les autres sous-groupes, s'ils existent, sont dits <strong>propres</strong>.</p>

    <h3>2. Ordre d'un élément et groupes cycliques</h3>
    <p>L'<strong>ordre d'un élément</strong> $a \\in G$ est le plus petit entier $k>0$ tel que $a^k = e$ (où $a^k$ désigne $a*a*\\cdots*a$, $k$ fois). Si un tel $k$ n'existe pas, l'ordre est infini. Un groupe est dit <strong>cyclique</strong> s'il peut être engendré par un seul de ses éléments $g$, c'est-à-dire si $G = \\{e, g, g^2, \\ldots, g^{n-1}\\}$ pour un certain $n$ (l'ordre du groupe).</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> dans le groupe ponctuel $C_3$ (rotation d'ordre 3), quel est l'ordre de l'opération $C_3$ elle-même ?</p>
      <p><strong>Solution :</strong> $C_3^1 = C_3$ (rotation de 120°), $C_3^2$ (rotation de 240°), $C_3^3$ = rotation de 360° = identité $E$.</p>
      <p class="example-answer">Réponse : l'ordre de $C_3$ est 3, et le groupe $\\{E, C_3, C_3^2\\}$ est cyclique d'ordre 3, engendré par $C_3$.</p>
    </div>

    <h3>3. Conjugaison et classes de conjugaison</h3>
    <p>Deux éléments $a,b \\in G$ sont dits <strong>conjugués</strong> s'il existe $x \\in G$ tel que $b = x\\,a\\,x^{-1}$. La relation de conjugaison est une relation d'équivalence, qui partitionne le groupe en <strong>classes de conjugaison</strong> : des sous-ensembles d'éléments « du même type ».</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi les classes de conjugaison sont essentielles</span>
      En chimie et en cristallographie, les éléments d'une même classe de conjugaison représentent physiquement des opérations de symétrie du <strong>même type géométrique</strong> : par exemple, dans le groupe ponctuel $C_{3v}$ de l'ammoniac NH₃, les deux rotations $C_3$ et $C_3^2$ forment une seule classe, et les trois plans miroirs $\\sigma_v$ forment une autre classe. C'est cette structuration en classes qui permet de construire des tables de caractères compactes (chapitre 4), où l'on regroupe les opérations équivalentes par symétrie plutôt que de les lister individuellement.
    </div>

    <h3>4. Théorème de Lagrange</h3>
    <p>Pour un groupe fini $G$ d'ordre $|G|$, le <strong>théorème de Lagrange</strong> énonce que l'ordre de tout sous-groupe $H$ de $G$ divise l'ordre de $G$ :</p>
    <div class="formula-box">$$|H| \\ \\text{divise}\\ |G|$$</div>
    <p>Corollaire immédiat : l'ordre de tout élément d'un groupe fini divise également l'ordre du groupe. Ce théorème, d'apparence simple, contraint fortement la structure possible des sous-groupes : par exemple, un groupe d'ordre 12 ne peut avoir de sous-groupe d'ordre 5, puisque 5 ne divise pas 12.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Sous-groupe : sous-ensemble non vide, stable par la loi et par passage à l'inverse</li>
        <li>Ordre d'un élément a : plus petit k>0 tel que a^k=e ; groupe cyclique engendré par un seul élément</li>
        <li>Classes de conjugaison : b=x·a·x⁻¹ regroupe les opérations « du même type géométrique »</li>
        <li>Théorème de Lagrange : l'ordre de tout sous-groupe (et de tout élément) divise l'ordre du groupe</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de vérifier la stabilité par passage à l'inverse lors de la recherche d'un sous-groupe</li>
        <li>Confondre l'ordre d'un GROUPE (nombre total d'éléments) et l'ordre d'un ÉLÉMENT (plus petite puissance qui redonne l'identité)</li>
        <li>Croire que deux éléments quelconques d'un groupe abélien forment toujours des classes de conjugaison distinctes : dans un groupe abélien, CHAQUE élément constitue sa propre classe (car x·a·x⁻¹=a pour tout x)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un groupe d'ordre 15 peut-il avoir un sous-groupe d'ordre 4 ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg2e1" value="wrong"> oui, toujours</label>
          <label class="option"><input type="radio" name="tdg2e1" value="right"> non, car 4 ne divise pas 15</label>
          <label class="option"><input type="radio" name="tdg2e1" value="wrong"> cela dépend du groupe considéré</label>
          <label class="option"><input type="radio" name="tdg2e1" value="wrong"> oui, si le groupe est abélien</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg2e1','tdg2fb1','Correct — d après le théorème de Lagrange, l ordre d un sous-groupe doit diviser l ordre du groupe ; 4 ne divise pas 15.','Applique le théorème de Lagrange : 4 divise-t-il 15 ?')">Vérifier</button>
        <div class="feedback" id="tdg2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un groupe abélien, chaque classe de conjugaison contient :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg2e2" value="wrong"> tous les éléments du groupe</label>
          <label class="option"><input type="radio" name="tdg2e2" value="right"> un seul élément</label>
          <label class="option"><input type="radio" name="tdg2e2" value="wrong"> exactement deux éléments</label>
          <label class="option"><input type="radio" name="tdg2e2" value="wrong"> un nombre variable, jamais 1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg2e2','tdg2fb2','Correct — puisque x*a*x-1 = a pour tout x dans un groupe commutatif, chaque élément est sa propre et unique classe de conjugaison.','Réécris x*a*x-1 en utilisant la commutativité : que devient cette expression ?')">Vérifier</button>
        <div class="feedback" id="tdg2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'ordre de l'opération C3 (rotation de 120°) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg2e3" value="wrong"> 1</label>
          <label class="option"><input type="radio" name="tdg2e3" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="tdg2e3" value="right"> 3</label>
          <label class="option"><input type="radio" name="tdg2e3" value="wrong"> infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg2e3','tdg2fb3','Correct — trois applications successives de C3 (120 degrés chacune) redonnent l identité (360 degrés).','Combien de fois faut-il appliquer une rotation de 120 degrés pour revenir à la position de départ ?')">Vérifier</button>
        <div class="feedback" id="tdg2fb3"></div>
      </div>
    </div>
  `
};

TDG_NOVA_KB[tdgKey("Sous-groupes, classes et groupes cycliques")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Sous-groupes, classes et groupes cycliques ». Demande-moi le théorème de Lagrange, ce qu'est une classe de conjugaison, ou un indice sur un exercice.",
  rules: [
    { test:/sous.?groupe/i, replies:["Un sous-groupe H de G est un sous-ensemble non vide, stable par la loi (a*b reste dans H) et par passage à l'inverse (a⁻¹ reste dans H)."] },
    { test:/lagrange/i, replies:["Le théorème de Lagrange énonce que l'ordre de tout sous-groupe (et de tout élément) d'un groupe fini divise l'ordre du groupe."] },
    { test:/conjugaison|classe/i, replies:["Deux éléments a et b sont conjugués s'il existe x tel que b=x·a·x⁻¹. Les classes de conjugaison regroupent les opérations de symétrie du même type géométrique — essentiel pour les tables de caractères (chapitre 4)."] },
    { test:/cyclique|ordre d'un [ée]l[ée]ment/i, replies:["L'ordre d'un élément a est le plus petit entier k>0 tel que a^k=e. Un groupe cyclique est engendré par un seul de ses éléments."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique directement le théorème de Lagrange.","Indice niveau 2 : il faut que l'ordre du sous-groupe divise l'ordre du groupe.","Indice niveau 3 : 4 ne divise pas 15, donc c'est impossible."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la commutativité dans x*a*x⁻¹.","Indice niveau 2 : dans un groupe abélien, x*a*x⁻¹ se simplifie directement en a.","Indice niveau 3 : chaque élément forme sa propre classe, à lui seul."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : combien de rotations de 120° pour revenir à l'identique ?","Indice niveau 2 : 3×120°=360°.","Indice niveau 3 : l'ordre de C3 est 3."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
TDG_CHAPTERS[tdgKey("Groupes de symétrie moléculaire")] = {
  objectives: [
    "Recenser les cinq types d'opérations de symétrie moléculaire (E, Cn, σ, i, Sn)",
    "Vérifier que l'ensemble des opérations de symétrie d'une molécule forme un groupe",
    "Identifier le groupe ponctuel d'une molécule simple à partir de ses éléments de symétrie",
    "Distinguer les grandes familles de groupes ponctuels moléculaires (Cn, Cnv, Cnh, Dnh, groupes cubiques)"
  ],
  prereqs: ["Sous-groupes, classes et groupes cycliques"],
  bodyHtml: `
    <p>Ce chapitre applique directement la théorie des groupes à un objet familier : la molécule. L'ensemble des opérations géométriques qui laissent une molécule globalement invariante (en superposant exactement chaque atome sur un atome identique) forme un groupe au sens mathématique du terme — le <strong>groupe ponctuel</strong> de la molécule, déjà rencontré en cristallochimie (chapitre 3 du module correspondant) pour les cristaux.</p>

    <h3>1. Les cinq types d'opérations de symétrie moléculaire</h3>
    <table class="mini-table">
      <tr><th>Opération</th><th>Symbole</th><th>Description</th></tr>
      <tr><td>Identité</td><td>$E$</td><td>ne fait rien ; élément neutre du groupe, présent dans TOUTE molécule</td></tr>
      <tr><td>Rotation propre</td><td>$C_n$</td><td>rotation de $360°/n$ autour d'un axe qui superpose la molécule à elle-même</td></tr>
      <tr><td>Réflexion</td><td>$\\sigma$</td><td>réflexion à travers un plan miroir ; on distingue $\\sigma_v$ (contient l'axe principal), $\\sigma_h$ (perpendiculaire à l'axe principal), $\\sigma_d$ (plan diagonal)</td></tr>
      <tr><td>Inversion</td><td>$i$</td><td>chaque atome est envoyé en position opposée par rapport au centre de la molécule</td></tr>
      <tr><td>Rotation impropre</td><td>$S_n$</td><td>rotation de $360°/n$ suivie d'une réflexion dans le plan perpendiculaire à l'axe</td></tr>
    </table>
    <p>Ces cinq types se retrouvent, sans surprise, être exactement les opérations de symétrie ponctuelle déjà décrites en cristallochimie — la différence essentielle est qu'une <strong>molécule isolée</strong> n'est pas contrainte par la restriction cristallographique du chapitre 3 de ce même module de cristallochimie : un axe $C_5$ (impossible dans un cristal périodique) est parfaitement licite pour une molécule comme le ferrocène.</p>

    <h3>2. Vérification de la structure de groupe</h3>
    <p>L'ensemble $\\{E, C_n, C_n^2, \\ldots, \\sigma, \\ldots\\}$ des opérations de symétrie d'une molécule donnée vérifie bien les quatre axiomes du chapitre 1 :</p>
    <div class="key-point">
      <span class="eyebrow">Vérification des axiomes sur l'exemple de la symétrie moléculaire</span>
      <strong>Fermeture</strong> : appliquer successivement deux opérations de symétrie de la molécule (par exemple $\\sigma_v$ puis $C_2$) redonne nécessairement une opération de symétrie de la même molécule. <strong>Associativité</strong> : héritée de la composition des transformations géométriques. <strong>Élément neutre</strong> : l'identité $E$. <strong>Élément inverse</strong> : chaque opération est réversible (par exemple, $C_3$ et $C_3^2$ sont inverses l'une de l'autre, puisque $C_3 \\times C_3^2 = C_3^3 = E$).
    </div>

    <h3>3. Identification pratique d'un groupe ponctuel</h3>
    <p>La démarche systématique pour identifier le groupe ponctuel d'une molécule consiste à repérer, dans l'ordre : l'existence d'un axe de rotation principal (celui d'ordre le plus élevé), la présence d'axes $C_2$ perpendiculaires à cet axe, puis la présence et la nature des plans miroirs, et enfin l'existence éventuelle d'un centre d'inversion ou d'un axe $S_n$.</p>
    <table class="mini-table">
      <tr><th>Famille</th><th>Éléments caractéristiques</th><th>Exemple</th></tr>
      <tr><td>$C_n$</td><td>seulement un axe $C_n$</td><td>peu fréquent pour des petites molécules simples</td></tr>
      <tr><td>$C_{nv}$</td><td>axe $C_n$ + $n$ plans $\\sigma_v$</td><td>H₂O ($C_{2v}$), NH₃ ($C_{3v}$)</td></tr>
      <tr><td>$C_{nh}$</td><td>axe $C_n$ + plan $\\sigma_h$</td><td>acide borique B(OH)₃ dans sa forme plane ($C_{3h}$)</td></tr>
      <tr><td>$D_{nh}$</td><td>axe $C_n$ + $n$ axes $C_2$ perpendiculaires + $\\sigma_h$</td><td>BF₃ ($D_{3h}$), benzène C₆H₆ ($D_{6h}$)</td></tr>
      <tr><td>Groupes cubiques ($T_d$, $O_h$)</td><td>plusieurs axes d'ordre élevé combinés</td><td>CH₄ ($T_d$, tétraédrique), SF₆ ($O_h$, octaédrique)</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 150" width="100%">
          <circle cx="100" cy="45" r="9" fill="#3D6BF0"/>
          <circle cx="60" cy="105" r="9" fill="#F0555C"/>
          <circle cx="140" cy="105" r="9" fill="#F0555C"/>
          <line x1="100" y1="45" x2="60" y2="105" stroke="#122043" stroke-width="2.4"/>
          <line x1="100" y1="45" x2="140" y2="105" stroke="#122043" stroke-width="2.4"/>
          <line x1="100" y1="10" x2="100" y2="45" stroke="#8064F2" stroke-width="1.4" stroke-dasharray="3,2"/>
          <text x="104" y="20" font-family="IBM Plex Mono" font-size="10" fill="#122043">C2</text>
        </svg>
        <span>H₂O : axe C2 (bissecteur de l'angle) + 2 plans σv → groupe ponctuel C2v</span>
      </div>
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> identifier le groupe ponctuel de l'ammoniac NH₃ (pyramide trigonale).</p>
      <p><strong>Solution :</strong> l'azote et les trois hydrogènes définissent un axe de rotation d'ordre 3 (rotation de 120° qui permute les trois H) : $C_3$. Trois plans $\\sigma_v$ contiennent chacun l'axe $C_3$ et un atome d'hydrogène. Pas de centre d'inversion, pas d'axe $S_n$ propre.</p>
      <p class="example-answer">Réponse : ensemble $\\{E, C_3, C_3^2, \\sigma_v, \\sigma_v', \\sigma_v''\\}$, ordre 6 : c'est le groupe ponctuel $C_{3v}$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>5 types d'opérations de symétrie moléculaire : E, Cn, σ (v, h, d), i, Sn</li>
        <li>L'ensemble des opérations de symétrie d'une molécule forme un groupe (les 4 axiomes sont vérifiés)</li>
        <li>Une molécule isolée n'est pas soumise à la restriction cristallographique : Cn avec n=5 ou plus est possible (contrairement aux cristaux)</li>
        <li>Démarche d'identification : axe principal → axes C2 perpendiculaires → plans miroirs → centre d'inversion / Sn</li>
        <li>Exemples clés : H2O → C2v, NH3 → C3v, BF3 → D3h, CH4 → Td, SF6 → Oh</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier l'identité E dans la liste des éléments de symétrie : elle est toujours présente, même pour une molécule sans aucune autre symétrie (groupe C1)</li>
        <li>Confondre σv (contient l'axe principal) et σh (perpendiculaire à l'axe principal)</li>
        <li>Croire qu'une molécule isolée est soumise à la même restriction cristallographique qu'un cristal (interdiction des axes d'ordre 5, 7...) : ce n'est vrai QUE pour les cristaux périodiques, pas pour les molécules isolées</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Identificateur simplifié de groupe ponctuel</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Sélectionne les éléments de symétrie observés pour obtenir le groupe ponctuel probable (démarche simplifiée à but pédagogique).</p>
      <div class="sim-controls">
        <label>Éléments observés :
          <select id="tdgPGSelect" onchange="updateTdgPointGroup()">
            <option value="none">Aucun élément particulier</option>
            <option value="cn_only">Un seul axe Cn</option>
            <option value="cn_sigmav" selected>Axe Cn + plans σv</option>
            <option value="cn_sigmah">Axe Cn + plan σh</option>
            <option value="dn_full">Axe Cn + n axes C2 + σh</option>
            <option value="td">Symétrie tétraédrique (CH4)</option>
            <option value="oh">Symétrie octaédrique (SF6)</option>
          </select>
        </label>
        <div class="sim-readout" id="tdgPGReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le groupe ponctuel de l'eau H2O (structure coudée, C2v) contient, en plus de E et de l'axe C2 :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg3e1" value="wrong"> un centre d'inversion</label>
          <label class="option"><input type="radio" name="tdg3e1" value="right"> deux plans σv</label>
          <label class="option"><input type="radio" name="tdg3e1" value="wrong"> un axe S4</label>
          <label class="option"><input type="radio" name="tdg3e1" value="wrong"> trois axes C2 supplémentaires</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg3e1','tdg3fb1','Correct — C2v signifie exactement : un axe C2 accompagné de deux plans miroirs verticaux sigma-v.','Le symbole C2v contient déjà l information : quel type de plan la lettre v désigne-t-elle ?')">Vérifier</button>
        <div class="feedback" id="tdg3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Contrairement à un cristal périodique, une molécule isolée peut posséder un axe :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg3e2" value="right"> C5</label>
          <label class="option"><input type="radio" name="tdg3e2" value="wrong"> C2</label>
          <label class="option"><input type="radio" name="tdg3e2" value="wrong"> C3</label>
          <label class="option"><input type="radio" name="tdg3e2" value="wrong"> C4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg3e2','tdg3fb2','Correct — la restriction cristallographique (interdiction des ordres 5, 7...) ne s applique qu aux réseaux périodiques, pas aux molécules isolées comme le ferrocène.','Les axes 2, 3 et 4 sont autorisés dans les deux cas ; cherche celui qui est interdit uniquement pour les cristaux.')">Vérifier</button>
        <div class="feedback" id="tdg3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le groupe ponctuel du méthane CH4 (structure tétraédrique) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg3e3" value="wrong"> C3v</label>
          <label class="option"><input type="radio" name="tdg3e3" value="wrong"> D3h</label>
          <label class="option"><input type="radio" name="tdg3e3" value="right"> Td</label>
          <label class="option"><input type="radio" name="tdg3e3" value="wrong"> Oh</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg3e3','tdg3fb3','Correct — CH4 possède la symétrie tétraédrique complète (4 axes C3, 3 axes C2, 6 plans sigma-d) : c est le groupe Td.','Oh est la symétrie octaédrique (SF6) ; cherche le groupe associé à la géométrie tétraédrique.')">Vérifier</button>
        <div class="feedback" id="tdg3fb3"></div>
      </div>
    </div>
  `,
  init: initTdgPointGroup
};

TDG_NOVA_KB[tdgKey("Groupes de symétrie moléculaire")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Groupes de symétrie moléculaire ». Demande-moi les 5 types d'opérations de symétrie, comment identifier un groupe ponctuel, ou un indice sur un exercice.",
  rules: [
    { test:/cinq (op[ée]rations|types)|5 (op[ée]rations|types)/i, replies:["Les 5 types d'opérations de symétrie moléculaire : E (identité), Cn (rotation propre), σ (réflexion, avec σv/σh/σd), i (inversion), Sn (rotation impropre)."] },
    { test:/c2v|eau|h2o/i, replies:["H2O a pour groupe ponctuel C2v : un axe C2 (bissecteur de l'angle H-O-H) et deux plans miroirs σv contenant cet axe."] },
    { test:/c3v|nh3|ammoniac/i, replies:["NH3 a pour groupe ponctuel C3v : un axe C3 et trois plans σv, chacun contenant l'axe et un atome d'hydrogène."] },
    { test:/td\b|m[ée]thane|ch4/i, replies:["CH4 (méthane) a pour groupe ponctuel Td : symétrie tétraédrique complète, avec 4 axes C3 et 3 axes C2."] },
    { test:/restriction cristallographique|c5|ordre 5/i, replies:["Une molécule isolée n'est PAS soumise à la restriction cristallographique des cristaux périodiques : un axe C5 (interdit dans un cristal) est parfaitement possible pour une molécule, comme le ferrocène."] },
    { test:/sigma.?v|sigma.?h|sigma.?d/i, replies:["σv contient l'axe principal de rotation, σh est perpendiculaire à cet axe, σd est un plan diagonal (souvent bissecteur entre deux axes C2)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le symbole C2v donne directement l'information.","Indice niveau 2 : la lettre v indique le type de plan.","Indice niveau 3 : ce sont deux plans σv."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel ordre est interdit uniquement pour les cristaux périodiques ?","Indice niveau 2 : les ordres 2, 3, 4, 6 sont autorisés dans les deux cas.","Indice niveau 3 : c'est l'ordre 5 (C5) qui distingue molécule et cristal."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la géométrie du méthane.","Indice niveau 2 : c'est un tétraèdre régulier.","Indice niveau 3 : le groupe est Td."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
TDG_CHAPTERS[tdgKey("Tables de caractères et représentations irréductibles")] = {
  objectives: [
    "Définir une représentation matricielle d'un groupe et son caractère",
    "Lire et interpréter la structure d'une table de caractères (classes, représentations irréductibles, fonctions de base)",
    "Énoncer les propriétés d'orthogonalité des représentations irréductibles",
    "Construire la table de caractères du groupe C2v par la méthode directe"
  ],
  prereqs: ["Groupes de symétrie moléculaire", "Sous-groupes, classes et groupes cycliques"],
  bodyHtml: `
    <p>Ce chapitre introduit l'outil central de la théorie des groupes appliquée à la chimie : la <strong>table de caractères</strong>. Cette table condense, pour un groupe ponctuel donné, toute l'information nécessaire pour classer par symétrie les orbitales atomiques, les modes de vibration, ou les fonctions d'onde d'une molécule — un outil systématiquement réutilisé dans les modules de chimie quantique et de spectroscopie de ce semestre.</p>

    <h3>1. Représentations matricielles d'un groupe</h3>
    <p>Une <strong>représentation</strong> d'un groupe $G$ est une application qui associe à chaque élément $g \\in G$ une matrice $D(g)$, de telle sorte que la composition des éléments du groupe corresponde à la multiplication matricielle : $D(g_1 g_2) = D(g_1)D(g_2)$. Concrètement, en chimie, on choisit une <strong>base</strong> physique (un ensemble d'orbitales atomiques, de déplacements atomiques, etc.) et l'on regarde comment chaque opération de symétrie transforme cette base : la matrice de cette transformation est la représentation de l'opération dans cette base.</p>
    <p>Le <strong>caractère</strong> $\\chi(g)$ d'une opération $g$ dans une représentation donnée est simplement la <strong>trace</strong> de la matrice $D(g)$ (la somme des éléments diagonaux). Le caractère a une propriété remarquable : il est <strong>identique pour tous les éléments d'une même classe de conjugaison</strong> (chapitre 2) — c'est ce qui permet de condenser une table de caractères en ne listant qu'une colonne par classe, et non par élément.</p>

    <h3>2. Représentations réductibles et irréductibles</h3>
    <p>Une représentation est dite <strong>réductible</strong> si elle peut se décomposer (par un changement de base approprié) en une somme directe de représentations de dimension plus petite. Une représentation qui ne peut plus être décomposée est dite <strong>irréductible</strong> (souvent abrégée RI). Pour chaque groupe ponctuel fini, il n'existe qu'un <strong>nombre fini</strong> de représentations irréductibles distinctes, exactement égal au nombre de classes de conjugaison du groupe.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Les représentations irréductibles jouent, pour la théorie des groupes appliquée à la chimie, le rôle que jouent les nombres premiers pour l'arithmétique : ce sont les « briques élémentaires » indécomposables à partir desquelles toute représentation plus complexe (orbitales moléculaires, modes de vibration, chapitres 7 et 8) peut être construite par combinaison.
    </div>

    <h3>3. Structure d'une table de caractères</h3>
    <p>Une table de caractères se présente toujours selon le même schéma :</p>
    <table class="mini-table">
      <tr><th>Élément de la table</th><th>Contenu</th></tr>
      <tr><td>Ligne d'en-tête</td><td>nom du groupe ponctuel, puis les classes de symétrie (E, Cn, σv...), avec leur multiplicité (nombre d'éléments dans la classe)</td></tr>
      <tr><td>Colonne de gauche</td><td>étiquettes des représentations irréductibles (symboles de Mulliken : A, B, E, T...)</td></tr>
      <tr><td>Corps du tableau</td><td>valeurs des caractères $\\chi$ de chaque RI pour chaque classe</td></tr>
      <tr><td>Colonne(s) de droite</td><td>fonctions de base associées à chaque RI (coordonnées x,y,z ; fonctions quadratiques x², xy...) — utile pour prédire l'activité en spectroscopie IR/Raman (chapitre 8)</td></tr>
    </table>
    <p>Les <strong>symboles de Mulliken</strong> désignent les représentations irréductibles selon des conventions précises : <strong>A</strong> (symétrique par rapport à la rotation principale, $\\chi(C_n)=+1$), <strong>B</strong> (antisymétrique, $\\chi(C_n)=-1$), <strong>E</strong> (représentation doublement dégénérée, dimension 2), <strong>T</strong> (triplement dégénérée, dimension 3, rencontrée dans les groupes cubiques).</p>

    <h3>4. Construction de la table de caractères de C2v</h3>
    <p>Le groupe $C_{2v}$ (ordre 4, celui de l'eau H₂O) contient les opérations $\\{E, C_2, \\sigma_v, \\sigma_v'\\}$, chacune formant sa propre classe de conjugaison (le groupe est abélien, cf. chapitre 2, exercice 2). Il possède donc exactement 4 représentations irréductibles, toutes de dimension 1 :</p>
    <table class="mini-table">
      <tr><th>C2v</th><th>E</th><th>C2</th><th>σv(xz)</th><th>σv'(yz)</th><th>Fonctions de base</th></tr>
      <tr><td>A1</td><td>+1</td><td>+1</td><td>+1</td><td>+1</td><td>z, x², y², z²</td></tr>
      <tr><td>A2</td><td>+1</td><td>+1</td><td>−1</td><td>−1</td><td>xy</td></tr>
      <tr><td>B1</td><td>+1</td><td>−1</td><td>+1</td><td>−1</td><td>x, xz</td></tr>
      <tr><td>B2</td><td>+1</td><td>−1</td><td>−1</td><td>+1</td><td>y, yz</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — vérification d'orthogonalité</span>
      <p><strong>Énoncé :</strong> vérifier que les représentations $A_1$ et $B_1$ de $C_{2v}$ sont orthogonales (produit scalaire nul, pondéré par la taille de chaque classe).</p>
      <p><strong>Solution :</strong> comme chaque classe contient un seul élément dans $C_{2v}$ (ordre 4, groupe abélien) : $\\sum_g \\chi_{A_1}(g)\\chi_{B_1}(g) = (1)(1) + (1)(-1) + (1)(1) + (1)(-1) = 1 - 1 + 1 - 1 = 0$.</p>
      <p class="example-answer">Réponse : le produit est bien nul, confirmant l'orthogonalité de $A_1$ et $B_1$ — une propriété générale de toutes les représentations irréductibles distinctes d'un même groupe (grand théorème d'orthogonalité).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le caractère χ(g) est la trace de la matrice représentant g ; il est identique pour tous les éléments d'une même classe</li>
        <li>Une représentation irréductible (RI) ne peut plus être décomposée ; le nombre de RI = nombre de classes de conjugaison</li>
        <li>Symboles de Mulliken : A (χ(Cn)=+1), B (χ(Cn)=−1), E (dimension 2), T (dimension 3)</li>
        <li>Les représentations irréductibles distinctes d'un groupe sont orthogonales entre elles (grand théorème d'orthogonalité)</li>
        <li>Table de C2v : 4 RI de dimension 1 (A1, A2, B1, B2), avec leurs fonctions de base (utiles pour la spectroscopie, chapitre 8)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre représentation (matrice complète) et caractère (simple nombre, la trace de la matrice)</li>
        <li>Oublier que le nombre de représentations irréductibles est TOUJOURS égal au nombre de classes de conjugaison, jamais au nombre d'éléments du groupe</li>
        <li>Croire que toutes les représentations irréductibles sont de dimension 1 : les groupes de symétrie plus élevée (C3v, Td, Oh) possèdent des RI dégénérées de dimension 2 (E) ou 3 (T)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le caractère d'une opération de symétrie dans une représentation donnée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg4e1" value="wrong"> le déterminant de sa matrice</label>
          <label class="option"><input type="radio" name="tdg4e1" value="right"> la trace de sa matrice</label>
          <label class="option"><input type="radio" name="tdg4e1" value="wrong"> le rang de sa matrice</label>
          <label class="option"><input type="radio" name="tdg4e1" value="wrong"> la dimension de la représentation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg4e1','tdg4fb1','Correct — le caractère est la somme des éléments diagonaux (la trace) de la matrice associée à l opération.','Le caractère est une somme d éléments diagonaux : quel est le nom mathématique de cette quantité ?')">Vérifier</button>
        <div class="feedback" id="tdg4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le nombre de représentations irréductibles d'un groupe ponctuel est égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg4e2" value="wrong"> l'ordre du groupe</label>
          <label class="option"><input type="radio" name="tdg4e2" value="right"> le nombre de classes de conjugaison</label>
          <label class="option"><input type="radio" name="tdg4e2" value="wrong"> le nombre d'atomes de la molécule</label>
          <label class="option"><input type="radio" name="tdg4e2" value="wrong"> toujours 4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg4e2','tdg4fb2','Correct — c est un résultat général de la théorie des groupes finis, valable pour tout groupe ponctuel.','Repense au chapitre 2 : quelle notion structurait déjà le groupe en sous-ensembles ?')">Vérifier</button>
        <div class="feedback" id="tdg4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le symbole de Mulliken E désigne une représentation irréductible :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg4e3" value="wrong"> de dimension 1, symétrique</label>
          <label class="option"><input type="radio" name="tdg4e3" value="wrong"> de dimension 1, antisymétrique</label>
          <label class="option"><input type="radio" name="tdg4e3" value="right"> doublement dégénérée (dimension 2)</label>
          <label class="option"><input type="radio" name="tdg4e3" value="wrong"> triplement dégénérée (dimension 3)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg4e3','tdg4fb3','Correct — E désigne une représentation doublement dégénérée ; A et B sont de dimension 1, T de dimension 3.','A et B sont de dimension 1, T est de dimension 3 : E est la dimension intermédiaire.')">Vérifier</button>
        <div class="feedback" id="tdg4fb3"></div>
      </div>
    </div>
  `
};

TDG_NOVA_KB[tdgKey("Tables de caractères et représentations irréductibles")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Tables de caractères et représentations irréductibles ». Demande-moi ce qu'est un caractère, les symboles de Mulliken, ou un indice sur un exercice.",
  rules: [
    { test:/caract[èe]re/i, replies:["Le caractère χ(g) d'une opération est la trace de sa matrice de représentation. Il est identique pour tous les éléments d'une même classe de conjugaison — ce qui permet de condenser la table."] },
    { test:/repr[ée]sentation irr[ée]ductible|\bri\b/i, replies:["Une représentation irréductible (RI) ne peut plus être décomposée en représentations plus petites. Le nombre de RI d'un groupe est toujours égal à son nombre de classes de conjugaison."] },
    { test:/mulliken|symbole a|symbole b|symbole e|symbole t/i, replies:["Symboles de Mulliken : A (dim 1, symétrique par rapport à Cn), B (dim 1, antisymétrique), E (dim 2, dégénérée), T (dim 3, dégénérée, groupes cubiques)."] },
    { test:/orthogonalit[ée]/i, replies:["Le grand théorème d'orthogonalité montre que deux représentations irréductibles distinctes d'un même groupe ont un produit scalaire (pondéré par la taille des classes) nul entre leurs caractères."] },
    { test:/c2v|table de caract[èe]res.*c2v/i, replies:["La table de C2v a 4 RI de dimension 1 : A1 (tout +1), A2 (+1,+1,-1,-1), B1 (+1,-1,+1,-1), B2 (+1,-1,-1,+1), pour les classes E, C2, σv, σv'."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le caractère est une somme d'éléments diagonaux.","Indice niveau 2 : ce nom mathématique est bien connu en algèbre linéaire.","Indice niveau 3 : c'est la trace de la matrice."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense à la notion qui partitionne un groupe en sous-ensembles (chapitre 2).","Indice niveau 2 : c'est la même notion qui donne le nombre de colonnes d'une table de caractères.","Indice niveau 3 : le nombre de RI égale le nombre de classes de conjugaison."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : classe les symboles par dimension croissante.","Indice niveau 2 : A et B sont dimension 1, T est dimension 3.","Indice niveau 3 : E est la dimension intermédiaire, donc 2 (dégénérée)."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
TDG_CHAPTERS[tdgKey("Réduction d'une représentation réductible")] = {
  objectives: [
    "Construire une représentation réductible à partir d'un ensemble de vecteurs de base (déplacements atomiques)",
    "Appliquer la formule de réduction pour décomposer une représentation réductible en somme de représentations irréductibles",
    "Interpréter le résultat de la réduction en termes de symétrie des modes propres d'un système"
  ],
  prereqs: ["Tables de caractères et représentations irréductibles"],
  bodyHtml: `
    <p>En pratique, la représentation qui décrit naturellement un système physique (par exemple, l'ensemble des déplacements possibles de tous les atomes d'une molécule) est presque toujours <strong>réductible</strong> : elle mélange plusieurs symétries différentes. Ce chapitre présente la méthode systématique — la <strong>formule de réduction</strong> — qui permet de la décomposer en une combinaison de représentations irréductibles (chapitre 4), étape indispensable avant toute application physique (chapitres 7 et 8).</p>

    <h3>1. Construction d'une représentation réductible</h3>
    <p>Pour construire la représentation réductible $\\Gamma$ associée à un ensemble de vecteurs de base (orbitales, déplacements atomiques...), on applique chaque opération de symétrie du groupe à cette base, et l'on note $\\chi_\\Gamma(g)$ le caractère obtenu — souvent calculé simplement en comptant le nombre de vecteurs de base <strong>inchangés</strong> (à un facteur $\\pm1$ près) par l'opération $g$, sans même construire explicitement la matrice complète.</p>

    <h3>2. La formule de réduction</h3>
    <p>Le nombre de fois $n_i$ qu'une représentation irréductible $i$ apparaît dans la décomposition de la représentation réductible $\\Gamma$ est donné par la <strong>formule de réduction</strong> :</p>
    <div class="formula-box">$$n_i = \\frac{1}{h} \\sum_{\\text{classes}} N_c \\, \\chi_\\Gamma(c) \\, \\chi_i(c)$$</div>
    <p>où $h$ est l'ordre du groupe, la somme porte sur chaque classe de conjugaison $c$, $N_c$ est le nombre d'opérations dans cette classe, $\\chi_\\Gamma(c)$ le caractère de la représentation réductible pour cette classe, et $\\chi_i(c)$ le caractère de la représentation irréductible $i$ pour cette même classe (lu directement dans la table de caractères, chapitre 4).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Cette formule découle directement du grand théorème d'orthogonalité (chapitre 4) : elle projette, en quelque sorte, la représentation réductible sur chacune des « directions » indépendantes que constituent les représentations irréductibles, exactement comme on projette un vecteur sur une base orthonormée en algèbre linéaire classique.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> dans le groupe $C_{2v}$ (ordre $h=4$, chaque classe contenant un seul élément), une représentation réductible $\\Gamma$ a pour caractères $\\chi_\\Gamma(E)=3$, $\\chi_\\Gamma(C_2)=-1$, $\\chi_\\Gamma(\\sigma_v)=1$, $\\chi_\\Gamma(\\sigma_v')=3$. Combien de fois la représentation irréductible $A_1$ (caractères $1,1,1,1$, chapitre 4) apparaît-elle dans $\\Gamma$ ?</p>
      <p><strong>Solution :</strong> $n_{A_1} = \\dfrac{1}{4}\\big[(1)(3)(1) + (1)(-1)(1) + (1)(1)(1) + (1)(3)(1)\\big] = \\dfrac{1}{4}\\big[3 - 1 + 1 + 3\\big] = \\dfrac{6}{4}$... </p>
      <p class="example-answer">Remarque pédagogique : si le résultat de la formule de réduction n'est pas un entier, c'est le signe qu'une erreur a été commise dans le relevé des caractères de $\\Gamma$ — un entier est TOUJOURS attendu, ce qui constitue un excellent moyen de vérifier ses calculs.</p>
    </div>

    <h3>3. Interprétation physique du résultat</h3>
    <p>Une fois la réduction effectuée, $\\Gamma = n_1 \\Gamma_1 \\oplus n_2 \\Gamma_2 \\oplus \\cdots$, chaque représentation irréductible apparaissant dans la décomposition correspond à un <strong>sous-ensemble de fonctions physiques</strong> (orbitales, modes de vibration) qui se transforment ensemble, de façon cohérente, sous les opérations de symétrie du groupe. C'est cette décomposition qui permettra, aux chapitres 7 et 8, de prédire quelles combinaisons linéaires d'orbitales atomiques sont physiquement pertinentes, et quels modes de vibration sont actifs en spectroscopie infrarouge ou Raman.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une représentation réductible Γ mélange plusieurs symétries ; elle se décompose en somme de représentations irréductibles</li>
        <li>Formule de réduction : n_i = (1/h) × somme sur les classes de [N_c × χ_Γ(c) × χ_i(c)]</li>
        <li>Le résultat n_i doit toujours être un entier — sinon, une erreur a été commise dans le relevé des caractères</li>
        <li>La décomposition identifie les combinaisons de fonctions physiques (orbitales, vibrations) qui se transforment ensemble par symétrie</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de pondérer chaque terme de la somme par la taille N_c de la classe correspondante (essentiel dès que le groupe n'est pas abélien)</li>
        <li>Confondre le caractère de la représentation réductible χ_Γ(c) et celui de la représentation irréductible cherchée χ_i(c) dans la formule</li>
        <li>Accepter un résultat non entier sans vérifier ses calculs : c'est toujours le signe d'une erreur</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — formule de réduction</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre l'ordre du groupe, les caractères de Γ, ceux de la RI cherchée et les tailles de classes (nombres séparés par des virgules, un par classe).</p>
      <div class="sim-controls">
        <label>Ordre h : <input type="number" id="tdgOrderG" value="4" style="width:55px;" oninput="updateTdgReduction()"></label><br>
        <label>χ(Γ) : <input type="text" id="tdgChiGamma" value="3,-1,1,3" style="width:110px;" oninput="updateTdgReduction()"></label>
        <label>χ(RI) : <input type="text" id="tdgChiIrr" value="1,1,1,1" style="width:110px;" oninput="updateTdgReduction()"></label>
        <label>Tailles classes : <input type="text" id="tdgClassSizes" value="1,1,1,1" style="width:110px;" oninput="updateTdgReduction()"></label>
        <div class="sim-readout" id="tdgReductionReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans la formule de réduction, le facteur Nc représente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg5e1" value="wrong"> l'ordre du groupe</label>
          <label class="option"><input type="radio" name="tdg5e1" value="right"> le nombre d'opérations dans la classe c</label>
          <label class="option"><input type="radio" name="tdg5e1" value="wrong"> le nombre de représentations irréductibles</label>
          <label class="option"><input type="radio" name="tdg5e1" value="wrong"> le caractère de la classe c</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg5e1','tdg5fb1','Correct — Nc pondère chaque terme par le nombre d opérations regroupées dans cette classe de conjugaison.','h est l ordre du groupe (au dénominateur) ; Nc est un facteur multiplicatif dans la somme, propre à chaque classe.')">Vérifier</button>
        <div class="feedback" id="tdg5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si le calcul de n_i donne un résultat non entier, cela signifie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg5e2" value="wrong"> que cette RI n'apparaît jamais dans Γ</label>
          <label class="option"><input type="radio" name="tdg5e2" value="right"> qu'une erreur a été commise dans les caractères utilisés</label>
          <label class="option"><input type="radio" name="tdg5e2" value="wrong"> que le groupe n'est pas abélien</label>
          <label class="option"><input type="radio" name="tdg5e2" value="wrong"> que Γ est déjà irréductible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg5e2','tdg5fb2','Correct — n_i doit toujours être un entier naturel ; un résultat non entier signale systématiquement une erreur de calcul ou de lecture des caractères.','n_i compte un nombre d occurrences : quel type de nombre est-ce nécessairement ?')">Vérifier</button>
        <div class="feedback" id="tdg5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La formule de réduction découle directement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg5e3" value="wrong"> du théorème de Lagrange</label>
          <label class="option"><input type="radio" name="tdg5e3" value="right"> du grand théorème d'orthogonalité</label>
          <label class="option"><input type="radio" name="tdg5e3" value="wrong"> de la restriction cristallographique</label>
          <label class="option"><input type="radio" name="tdg5e3" value="wrong"> de la loi de Bragg</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg5e3','tdg5fb3','Correct — la formule projette Γ sur chaque représentation irréductible, exactement comme une projection sur une base orthonormée, grâce à l orthogonalité des RI.','La loi de Bragg et la restriction cristallographique appartiennent à un autre module (cristallochimie) ; cherche le théorème du chapitre précédent sur les RI.')">Vérifier</button>
        <div class="feedback" id="tdg5fb3"></div>
      </div>
    </div>
  `,
  init: initTdgReduction
};

TDG_NOVA_KB[tdgKey("Réduction d'une représentation réductible")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Réduction d'une représentation réductible ». Demande-moi la formule de réduction, comment vérifier son calcul, ou un indice sur un exercice.",
  rules: [
    { test:/formule de r[ée]duction/i, replies:["La formule de réduction : n_i = (1/h) × somme sur les classes de [Nc × χ_Γ(c) × χ_i(c)], où h est l'ordre du groupe et Nc la taille de chaque classe."] },
    { test:/entier|non entier|erreur/i, replies:["Le résultat n_i doit TOUJOURS être un entier naturel (c'est un nombre d'occurrences). Un résultat non entier signale systématiquement une erreur dans les caractères utilisés."] },
    { test:/\bnc\b|taille.*classe/i, replies:["Nc est le nombre d'opérations de symétrie regroupées dans la classe c ; il pondère chaque terme de la somme dans la formule de réduction."] },
    { test:/pourquoi.*formule|orthogonalit[ée]/i, replies:["La formule de réduction découle du grand théorème d'orthogonalité (chapitre 4) : elle projette la représentation réductible sur chaque représentation irréductible, comme une projection sur une base orthonormée."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : distingue h (ordre du groupe) et Nc (taille de la classe).","Indice niveau 2 : h est au dénominateur, Nc est dans la somme.","Indice niveau 3 : Nc est le nombre d'opérations dans la classe c."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : n_i compte un nombre d'occurrences.","Indice niveau 2 : ce type de nombre est toujours entier.","Indice niveau 3 : un résultat non entier signale une erreur de calcul."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : élimine les options qui appartiennent au module de cristallochimie.","Indice niveau 2 : il reste un théorème du chapitre précédent sur les RI.","Indice niveau 3 : c'est le grand théorème d'orthogonalité."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
TDG_CHAPTERS[tdgKey('Produits directs de groupes et de représentations')] = {
  objectives: [
    "Définir le produit direct de deux groupes et en calculer l'ordre",
    "Définir le produit direct de deux représentations et calculer son caractère",
    "Décomposer un produit direct de représentations irréductibles en somme de représentations irréductibles",
    "Relier cette décomposition à la règle de sélection générale utilisée en spectroscopie (chapitre 8)"
  ],
  prereqs: ["Réduction d'une représentation réductible"],
  bodyHtml: `
    <p>Ce chapitre introduit une opération centrale pour les applications physiques de la théorie des groupes : le <strong>produit direct</strong>, à la fois entre groupes et entre représentations. C'est cette opération qui permettra, au chapitre 8, d'établir rigoureusement les règles de sélection en spectroscopie infrarouge et Raman.</p>

    <h3>1. Produit direct de deux groupes</h3>
    <p>Le <strong>produit direct</strong> de deux groupes $G_1$ et $G_2$, noté $G_1 \\times G_2$, est le groupe dont les éléments sont les couples $(g_1,g_2)$ avec $g_1 \\in G_1$, $g_2 \\in G_2$, muni de la loi $(g_1,g_2)*(g_1',g_2') = (g_1 g_1', g_2 g_2')$. Son ordre est simplement le produit des ordres : $|G_1 \\times G_2| = |G_1|\\times|G_2|$.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le groupe ponctuel $D_{3h}$ (ordre 12, celui de BF₃) peut se construire comme le produit direct $D_3 \\times C_s$, où $C_s = \\{E,\\sigma_h\\}$. Quel est l'ordre de $D_3$ ?</p>
      <p><strong>Solution :</strong> $|D_{3h}| = |D_3| \\times |C_s|$, donc $12 = |D_3| \\times 2$.</p>
      <p class="example-answer">Réponse : $|D_3| = 6$.</p>
    </div>

    <h3>2. Produit direct de deux représentations</h3>
    <p>Le concept se transpose directement aux représentations : le <strong>produit direct</strong> de deux représentations $\\Gamma_1$ et $\\Gamma_2$ d'un même groupe est une nouvelle représentation $\\Gamma_1 \\otimes \\Gamma_2$, dont le caractère pour chaque opération $g$ est simplement le <strong>produit</strong> des caractères individuels :</p>
    <div class="formula-box">$$\\chi_{\\Gamma_1 \\otimes \\Gamma_2}(g) = \\chi_{\\Gamma_1}(g) \\times \\chi_{\\Gamma_2}(g)$$</div>
    <p>Ce produit direct est en général réductible, même si $\\Gamma_1$ et $\\Gamma_2$ sont toutes deux irréductibles : on applique alors la formule de réduction du chapitre précédent pour le décomposer en somme de représentations irréductibles.</p>

    <h3>3. Règles pratiques pour les groupes abéliens</h3>
    <p>Pour un groupe abélien (toutes les RI de dimension 1, comme $C_{2v}$), le produit direct de deux RI est toujours lui-même une RI unique du groupe (pas besoin de réduction) :</p>
    <table class="mini-table">
      <tr><th>Produit</th><th>Résultat dans C2v</th></tr>
      <tr><td>$A_1 \\otimes A_1$</td><td>$A_1$ (le produit d'une RI totalement symétrique avec elle-même redonne toujours $A_1$)</td></tr>
      <tr><td>$A_2 \\otimes B_1$</td><td>$B_2$</td></tr>
      <tr><td>$B_1 \\otimes B_2$</td><td>$A_2$</td></tr>
      <tr><td>$\\Gamma \\otimes A_1$ (quelconque)</td><td>$\\Gamma$ (A1 est l'élément neutre du produit direct, comme l'identité pour la multiplication)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La représentation totalement symétrique $A_1$ (ou $A_{1g}$, $A_1'$ selon les groupes) joue, vis-à-vis du produit direct de représentations, le rôle que joue le nombre 1 pour la multiplication usuelle : $\\Gamma \\otimes A_1 = \\Gamma$, quelle que soit $\\Gamma$. Cette propriété est la clé de voûte de la règle de sélection générale en spectroscopie, présentée au chapitre 8 : une transition n'est permise que si le produit direct approprié contient la représentation totalement symétrique $A_1$.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Produit direct de groupes : |G1×G2| = |G1|×|G2|</li>
        <li>Produit direct de représentations : χ(Γ1⊗Γ2)(g) = χ(Γ1)(g) × χ(Γ2)(g)</li>
        <li>Pour un groupe abélien, le produit de deux RI redonne toujours une RI unique du groupe (pas de réduction nécessaire)</li>
        <li>A1 (totalement symétrique) est l'élément neutre du produit direct : Γ⊗A1 = Γ</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Additionner les caractères au lieu de les multiplier pour construire le produit direct de deux représentations</li>
        <li>Oublier que le produit direct de deux RI dégénérées (dimension >1, comme E ou T) est généralement réductible et nécessite d'appliquer la formule de réduction</li>
        <li>Confondre le produit direct de GROUPES (couples d'éléments) et le produit direct de REPRÉSENTATIONS (produit de caractères) — les deux notions portent le même nom mais s'appliquent à des objets différents</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le caractère du produit direct de deux représentations Γ1 et Γ2, pour une opération g, est égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg6e1" value="wrong"> χ(Γ1)(g) + χ(Γ2)(g)</label>
          <label class="option"><input type="radio" name="tdg6e1" value="right"> χ(Γ1)(g) × χ(Γ2)(g)</label>
          <label class="option"><input type="radio" name="tdg6e1" value="wrong"> χ(Γ1)(g) / χ(Γ2)(g)</label>
          <label class="option"><input type="radio" name="tdg6e1" value="wrong"> max(χ(Γ1)(g), χ(Γ2)(g))</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg6e1','tdg6fb1','Correct — le caractère du produit direct est le PRODUIT des caractères individuels pour chaque opération.','C est un produit direct : quelle opération arithmétique porte ce nom ?')">Vérifier</button>
        <div class="feedback" id="tdg6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans le produit direct de représentations, la représentation totalement symétrique A1 joue le rôle de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg6e2" value="wrong"> l'élément absorbant (comme 0 pour la multiplication)</label>
          <label class="option"><input type="radio" name="tdg6e2" value="right"> l'élément neutre (comme 1 pour la multiplication)</label>
          <label class="option"><input type="radio" name="tdg6e2" value="wrong"> l'inverse de toute représentation</label>
          <label class="option"><input type="radio" name="tdg6e2" value="wrong"> aucune de ces réponses</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg6e2','tdg6fb2','Correct — Γ⊗A1 = Γ pour toute représentation Γ, exactement comme n×1=n pour la multiplication usuelle.','Γ⊗A1 redonne toujours Γ inchangée : quel nombre a cette propriété pour la multiplication ?')">Vérifier</button>
        <div class="feedback" id="tdg6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si |G1|=6 et |G2|=2, l'ordre du groupe produit direct G1×G2 est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg6e3" value="wrong"> 8</label>
          <label class="option"><input type="radio" name="tdg6e3" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="tdg6e3" value="right"> 12</label>
          <label class="option"><input type="radio" name="tdg6e3" value="wrong"> 36</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg6e3','tdg6fb3','Correct — l ordre du produit direct est le PRODUIT des ordres : 6×2=12 (c est exactement le cas de D3h = D3 × Cs).','L ordre du produit direct est le produit des deux ordres, pas leur somme.')">Vérifier</button>
        <div class="feedback" id="tdg6fb3"></div>
      </div>
    </div>
  `
};

TDG_NOVA_KB[tdgKey('Produits directs de groupes et de représentations')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Produits directs de groupes et de représentations ». Demande-moi comment calculer un produit direct, le rôle de A1, ou un indice sur un exercice.",
  rules: [
    { test:/produit direct.*groupe/i, replies:["Le produit direct de deux groupes G1×G2 a pour ordre |G1|×|G2| ; ses éléments sont des couples (g1,g2) avec la loi composante par composante."] },
    { test:/produit direct.*repr[ée]sentation|χ.*χ/i, replies:["Le caractère du produit direct de deux représentations est le PRODUIT (pas la somme !) des caractères individuels : χ(Γ1⊗Γ2)(g) = χ(Γ1)(g) × χ(Γ2)(g)."] },
    { test:/a1.*neutre|[ée]l[ée]ment neutre.*produit/i, replies:["A1 (totalement symétrique) est l'élément neutre du produit direct de représentations : Γ⊗A1 = Γ, quelle que soit Γ."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : produit direct veut dire produit, pas somme.","Indice niveau 2 : on multiplie les caractères individuels.","Indice niveau 3 : χ(Γ1)(g) × χ(Γ2)(g)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel nombre laisse inchangé tout autre nombre par multiplication ?","Indice niveau 2 : c'est 1 pour la multiplication usuelle.","Indice niveau 3 : A1 joue ce rôle d'élément neutre."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : l'ordre du produit direct est un produit, pas une somme.","Indice niveau 2 : 6×2, pas 6+2.","Indice niveau 3 : l'ordre est 12."] }
  ]
};

/* =========================== CHAPITRE 7 =========================== */
TDG_CHAPTERS[tdgKey('Applications : orbitales moléculaires et modes de vibration')] = {
  objectives: [
    "Construire la représentation réductible associée aux déplacements atomiques d'une molécule",
    "Extraire, par soustraction, la représentation propre aux modes de vibration internes",
    "Appliquer la méthode à une molécule simple pour dénombrer ses modes de vibration par symétrie",
    "Relier la symétrie des orbitales atomiques à la formation d'orbitales moléculaires (rappel du critère de recouvrement)"
  ],
  prereqs: ["Produits directs de groupes et de représentations", "Réduction d'une représentation réductible"],
  bodyHtml: `
    <p>Ce chapitre applique l'ensemble des outils développés (représentations, formule de réduction) à deux problèmes concrets de chimie : dénombrer et classer par symétrie les <strong>modes de vibration</strong> d'une molécule, et justifier quelles combinaisons d'<strong>orbitales atomiques</strong> peuvent former des orbitales moléculaires — un lien direct avec le module de chimie quantique de ce semestre.</p>

    <h3>1. Représentation des déplacements atomiques</h3>
    <p>Pour une molécule à $N$ atomes, chaque atome peut se déplacer selon 3 directions de l'espace (x, y, z) : l'ensemble de tous les déplacements possibles constitue une représentation réductible $\\Gamma_{3N}$, de dimension $3N$. Le caractère de cette représentation pour une opération $g$ se calcule par une règle pratique : seuls les atomes qui restent <strong>sur place</strong> après l'opération $g$ contribuent au caractère, chacun apportant une contribution qui dépend du type d'opération :</p>
    <table class="mini-table">
      <tr><th>Opération</th><th>Contribution par atome non déplacé</th></tr>
      <tr><td>$E$</td><td>+3</td></tr>
      <tr><td>$C_n$</td><td>$1 + 2\\cos(360°/n)$</td></tr>
      <tr><td>$\\sigma$</td><td>+1</td></tr>
      <tr><td>$i$</td><td>−3</td></tr>
      <tr><td>$S_n$</td><td>$-1 + 2\\cos(360°/n)$</td></tr>
    </table>

    <h3>2. Extraction des modes de vibration internes</h3>
    <p>Cette représentation $\\Gamma_{3N}$ globale contient en réalité un mélange de plusieurs types de mouvements : les <strong>3 translations</strong> globales de la molécule (selon x, y, z) et les <strong>3 rotations</strong> globales (2 seulement pour une molécule linéaire), qui ne sont pas des vibrations internes. Pour isoler les <strong>modes de vibration réels</strong>, on soustrait ces 6 degrés de liberté (5 pour une molécule linéaire) :</p>
    <div class="formula-box">$$\\Gamma_{vib} = \\Gamma_{3N} - \\Gamma_{trans} - \\Gamma_{rot} \\qquad \\text{(soit } 3N-6 \\text{ modes, ou } 3N-5 \\text{ si la molécule est linéaire)}$$</div>
    <p>Les représentations $\\Gamma_{trans}$ et $\\Gamma_{rot}$ se lisent directement dans la colonne « fonctions de base » de la table de caractères du groupe ponctuel de la molécule (chapitre 4) : les translations se transforment comme $x, y, z$, les rotations comme $R_x, R_y, R_z$.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> l'eau H₂O (groupe $C_{2v}$, $N=3$ atomes non linéaires) a pour représentation totale $\\Gamma_{3N} = \\Gamma_{9}$, qui se décompose (par la formule de réduction du chapitre 5) en $3A_1 \\oplus A_2 \\oplus 3B_1 \\oplus 2B_2$. Sachant que $\\Gamma_{trans} = A_1 \\oplus B_1 \\oplus B_2$ (fonctions x,y,z) et $\\Gamma_{rot} = A_2 \\oplus B_1 \\oplus B_2$ (fonctions Rx,Ry,Rz), déterminer $\\Gamma_{vib}$.</p>
      <p><strong>Solution :</strong> $\\Gamma_{vib} = (3A_1 \\oplus A_2 \\oplus 3B_1 \\oplus 2B_2) - (A_1 \\oplus B_1 \\oplus B_2) - (A_2 \\oplus B_1 \\oplus B_2) = 2A_1 \\oplus B_1$.</p>
      <p class="example-answer">Réponse : $\\Gamma_{vib} = 2A_1 \\oplus B_1$, soit $3N-6 = 9-6 = 3$ modes de vibration au total, répartis en deux modes de symétrie $A_1$ (élongation symétrique et déformation angulaire) et un mode $B_1$ (élongation antisymétrique) — un résultat bien connu et vérifiable expérimentalement en spectroscopie infrarouge de l'eau.</p>
    </div>

    <h3>3. Symétrie et formation des orbitales moléculaires</h3>
    <p>Le second grand domaine d'application, déjà entrevu dans le module de chimie quantique de ce semestre, concerne la formation des <strong>orbitales moléculaires</strong> par combinaison linéaire d'orbitales atomiques (méthode CLOA). Le critère de symétrie, rigoureux, complète le critère intuitif de recouvrement spatial :</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — rappel du critère de symétrie</span>
      Deux orbitales atomiques (ou groupes d'orbitales) ne peuvent se combiner pour former une orbitale moléculaire que si elles appartiennent à la <strong>même représentation irréductible</strong> du groupe ponctuel de la molécule. C'est cette règle, énoncée qualitativement dans le module de chimie quantique, qui reçoit ici sa justification rigoureuse : l'intégrale de recouvrement entre deux fonctions de symétries différentes est <strong>identiquement nulle</strong>, par un argument de théorie des groupes (le produit direct de deux RI différentes ne contient jamais la représentation totalement symétrique A1, condition nécessaire pour qu'une intégrale soit non nulle — voir chapitre 8).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Γ3N (dimension 3N) décrit tous les déplacements atomiques ; seuls les atomes non déplacés par g contribuent à son caractère</li>
        <li>Γvib = Γ3N − Γtrans − Γrot, soit 3N−6 modes (3N−5 pour une molécule linéaire)</li>
        <li>Γtrans et Γrot se lisent directement dans la table de caractères (fonctions x,y,z et Rx,Ry,Rz)</li>
        <li>Deux orbitales ne peuvent se combiner que si elles ont la même symétrie (même représentation irréductible)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de soustraire les 6 degrés de liberté externes (3 translations + 3 rotations) pour isoler les vibrations internes réelles</li>
        <li>Utiliser 3N−5 au lieu de 3N−6 (ou inversement) : la formule 3N−5 ne s'applique qu'aux molécules LINÉAIRES (2 rotations seulement, l'une d'elles étant sans effet physique le long de l'axe)</li>
        <li>Croire que le recouvrement spatial seul suffit à former une liaison : le critère de symétrie est une condition nécessaire supplémentaire, indépendante du recouvrement géométrique</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour une molécule non linéaire à N atomes, le nombre de modes de vibration internes est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg7e1" value="wrong"> 3N</label>
          <label class="option"><input type="radio" name="tdg7e1" value="wrong"> 3N−5</label>
          <label class="option"><input type="radio" name="tdg7e1" value="right"> 3N−6</label>
          <label class="option"><input type="radio" name="tdg7e1" value="wrong"> N−6</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg7e1','tdg7fb1','Correct — on retranche les 3 translations et les 3 rotations globales aux 3N degrés de liberté totaux.','3N degrés de liberté totaux moins les mouvements qui ne sont pas des vibrations internes : combien en soustrait-on pour une molécule NON linéaire ?')">Vérifier</button>
        <div class="feedback" id="tdg7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans le calcul du caractère de Γ3N pour une opération g, seuls contribuent :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg7e2" value="wrong"> tous les atomes de la molécule</label>
          <label class="option"><input type="radio" name="tdg7e2" value="right"> les atomes qui restent sur place après l'opération g</label>
          <label class="option"><input type="radio" name="tdg7e2" value="wrong"> seulement l'atome central</label>
          <label class="option"><input type="radio" name="tdg7e2" value="wrong"> aucun atome, seule la symétrie compte</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg7e2','tdg7fb2','Correct — un atome déplacé vers la position d un autre atome ne contribue pas à la trace de la matrice de déplacement (les termes correspondants sont hors diagonale).','Repense à la définition du caractère (chapitre 4) : c est une trace, donc seuls les éléments diagonaux comptent.')">Vérifier</button>
        <div class="feedback" id="tdg7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Deux orbitales atomiques peuvent se combiner pour former une orbitale moléculaire seulement si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg7e3" value="wrong"> elles ont la même énergie</label>
          <label class="option"><input type="radio" name="tdg7e3" value="right"> elles appartiennent à la même représentation irréductible</label>
          <label class="option"><input type="radio" name="tdg7e3" value="wrong"> elles sont sur le même atome</label>
          <label class="option"><input type="radio" name="tdg7e3" value="wrong"> la molécule est linéaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg7e3','tdg7fb3','Correct — c est le critère de symétrie rigoureux : sans cela, l intégrale de recouvrement est identiquement nulle, quelle que soit la proximité spatiale des orbitales.','L énergie proche favorise la combinaison mais n est pas le critère absolu retenu ici ; pense à la théorie des groupes.')">Vérifier</button>
        <div class="feedback" id="tdg7fb3"></div>
      </div>
    </div>
  `
};

TDG_NOVA_KB[tdgKey('Applications : orbitales moléculaires et modes de vibration')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Orbitales moléculaires et modes de vibration ». Demande-moi la formule 3N-6, comment calculer Γ3N, ou un indice sur un exercice.",
  rules: [
    { test:/3n.?6|3n.?5|nombre de modes/i, replies:["Une molécule non linéaire à N atomes a 3N−6 modes de vibration internes ; une molécule LINÉAIRE en a 3N−5 (une rotation de moins, car la rotation autour de l'axe moléculaire n'a pas d'effet physique)."] },
    { test:/γ3n|gamma.?3n/i, replies:["Γ3N est la représentation réductible des 3N déplacements atomiques (3 par atome). Son caractère se calcule en ne comptant que les atomes NON déplacés par l'opération considérée."] },
    { test:/translation|rotation.*globale/i, replies:["Γvib = Γ3N − Γtrans − Γrot : il faut soustraire les 3 translations et les 3 rotations globales (2 pour une molécule linéaire), qui se lisent dans la table de caractères (colonnes x,y,z et Rx,Ry,Rz)."] },
    { test:/orbitale.*combin|recouvrement/i, replies:["Deux orbitales ne peuvent former une orbitale moléculaire que si elles ont la MÊME symétrie (même représentation irréductible) : sinon, l'intégrale de recouvrement est identiquement nulle, même si le recouvrement spatial semble favorable."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte les degrés de liberté externes à soustraire.","Indice niveau 2 : 3 translations + 3 rotations pour une molécule non linéaire.","Indice niveau 3 : c'est 3N−6."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le caractère est une trace (chapitre 4).","Indice niveau 2 : seuls les éléments diagonaux comptent dans une trace.","Indice niveau 3 : seuls les atomes non déplacés contribuent."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est un critère de théorie des groupes, pas d'énergie.","Indice niveau 2 : sans cette condition, l'intégrale de recouvrement est nulle.","Indice niveau 3 : les deux orbitales doivent avoir la même représentation irréductible."] }
  ]
};

/* =========================== CHAPITRE 8 =========================== */
TDG_CHAPTERS[tdgKey('Applications en spectroscopie : règles de sélection par symétrie')] = {
  objectives: [
    "Énoncer la règle de sélection générale d'une transition en fonction du produit direct des représentations",
    "Appliquer cette règle pour déterminer l'activité infrarouge d'un mode de vibration",
    "Appliquer cette règle pour déterminer l'activité Raman d'un mode de vibration",
    "Énoncer et illustrer la règle d'exclusion mutuelle pour les molécules centrosymétriques"
  ],
  prereqs: ["Applications : orbitales moléculaires et modes de vibration", "Produits directs de groupes et de représentations"],
  bodyHtml: `
    <p>Ce dernier chapitre couronne l'ensemble du module en établissant, à partir des seuls outils de théorie des groupes développés depuis le chapitre 1, les <strong>règles de sélection</strong> qui déterminent si une transition vibrationnelle est observable en spectroscopie infrarouge (IR) ou Raman — un résultat directement exploité dans le module de spectroscopie organique de ce même semestre.</p>

    <h3>1. Règle de sélection générale</h3>
    <p>Une transition entre deux états, associée à un opérateur physique $\\hat{O}$ (moment dipolaire électrique pour l'IR, polarisabilité pour le Raman), n'est permise par symétrie que si l'<strong>intégrale de transition</strong> $\\int \\psi_i \\, \\hat{O} \\, \\psi_f \\, d\\tau$ est non nulle. Par un argument de théorie des groupes, cette intégrale ne peut être non nulle que si le produit direct des représentations irréductibles associées à $\\psi_i$, $\\hat{O}$ et $\\psi_f$ <strong>contient la représentation totalement symétrique</strong> $A_1$ (chapitre 6) :</p>
    <div class="formula-box">$$\\Gamma_{\\psi_i} \\otimes \\Gamma_{\\hat{O}} \\otimes \\Gamma_{\\psi_f} \\supset A_1$$</div>
    <p>Pour une transition depuis l'état fondamental vibrationnel (toujours de symétrie $A_1$, totalement symétrique), cette condition se simplifie : la transition est permise si et seulement si <strong>le mode de vibration $\\Gamma_{\\psi_f}$ appartient à la même représentation irréductible que l'opérateur $\\hat{O}$</strong>.</p>

    <h3>2. Activité infrarouge (IR)</h3>
    <p>En spectroscopie IR, l'opérateur pertinent est le <strong>moment dipolaire électrique</strong>, qui se transforme comme les coordonnées cartésiennes $x, y, z$ — précisément les fonctions de base indiquées dans la colonne de droite de la table de caractères (chapitre 4).</p>
    <div class="key-point">
      <span class="eyebrow">Règle de sélection IR</span>
      Un mode de vibration est <strong>actif en infrarouge</strong> si et seulement si sa représentation irréductible correspond à celle d'au moins une des coordonnées $x$, $y$ ou $z$ dans la table de caractères du groupe ponctuel de la molécule.
    </div>

    <h3>3. Activité Raman</h3>
    <p>En spectroscopie Raman, l'opérateur pertinent est la <strong>polarisabilité</strong>, une grandeur tensorielle qui se transforme comme les fonctions quadratiques ($x^2, y^2, z^2, xy, xz, yz$), également indiquées dans la table de caractères.</p>
    <div class="key-point">
      <span class="eyebrow">Règle de sélection Raman</span>
      Un mode de vibration est <strong>actif en Raman</strong> si et seulement si sa représentation irréductible correspond à celle d'au moins une des fonctions quadratiques dans la table de caractères.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> reprendre le résultat du chapitre 7 pour l'eau H₂O ($C_{2v}$) : $\\Gamma_{vib} = 2A_1 \\oplus B_1$. Ces trois modes sont-ils actifs en IR ? En Raman ?</p>
      <p><strong>Solution :</strong> d'après la table de $C_{2v}$ (chapitre 4) : $A_1$ a pour fonctions de base $z$ (et $x^2,y^2,z^2$), $B_1$ a pour fonctions de base $x$ (et $xz$). Les trois modes ($2A_1$, $B_1$) correspondent chacun à une coordonnée cartésienne ET à une fonction quadratique.</p>
      <p class="example-answer">Réponse : les trois modes de vibration de H₂O sont actifs à la fois en IR et en Raman — ce résultat est bien confirmé expérimentalement.</p>
    </div>

    <h3>4. Règle d'exclusion mutuelle (molécules centrosymétriques)</h3>
    <p>Pour une molécule possédant un <strong>centre d'inversion</strong> $i$ (molécule centrosymétrique), les représentations irréductibles se répartissent en deux catégories : <strong>paires</strong> (symétriques par rapport à $i$, indice $g$ pour « gerade ») et <strong>impaires</strong> (antisymétriques, indice $u$ pour « ungerade »). Or, les coordonnées $x,y,z$ (moment dipolaire) sont toujours de type $u$, tandis que les fonctions quadratiques (polarisabilité) sont toujours de type $g$ : aucune représentation irréductible ne peut donc être simultanément active en IR et en Raman.</p>
    <div class="key-point">
      <span class="eyebrow">Règle d'exclusion mutuelle</span>
      Pour une molécule centrosymétrique, un mode de vibration actif en infrarouge est nécessairement <strong>inactif</strong> en Raman, et réciproquement : les deux techniques spectroscopiques sont donc rigoureusement <strong>complémentaires</strong> pour l'étude de ces molécules, ce qui justifie en pratique l'utilisation combinée des deux méthodes pour caractériser complètement le spectre vibrationnel d'une molécule centrosymétrique (comme CO₂, groupe $D_{\\infty h}$).
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une transition est permise si le produit Γψi ⊗ ΓÔ ⊗ Γψf contient A1 (la représentation totalement symétrique)</li>
        <li>Actif en IR : la RI du mode correspond à x, y ou z dans la table de caractères (moment dipolaire)</li>
        <li>Actif en Raman : la RI du mode correspond à une fonction quadratique (x²,y²,z²,xy,xz,yz) dans la table (polarisabilité)</li>
        <li>Règle d'exclusion mutuelle : pour une molécule centrosymétrique, un mode actif en IR (toujours u) est nécessairement inactif en Raman (toujours g), et réciproquement</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que la règle d'exclusion mutuelle ne s'applique QU'AUX molécules centrosymétriques (possédant un centre d'inversion) : pour H2O ou NH3 (non centrosymétriques), un même mode peut être actif à la fois en IR et en Raman</li>
        <li>Confondre les fonctions de base associées au moment dipolaire (x,y,z, linéaires) et celles associées à la polarisabilité (fonctions quadratiques)</li>
        <li>Croire qu'un mode « symétrique » est automatiquement actif en IR : ce n'est vrai que si sa représentation irréductible coïncide avec celle d'une coordonnée cartésienne dans le groupe considéré</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un mode de vibration est actif en infrarouge si sa représentation irréductible correspond à celle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg8e1" value="wrong"> d'une fonction quadratique (x², xy...)</label>
          <label class="option"><input type="radio" name="tdg8e1" value="right"> d'une coordonnée cartésienne (x, y ou z)</label>
          <label class="option"><input type="radio" name="tdg8e1" value="wrong"> de la représentation A1 uniquement</label>
          <label class="option"><input type="radio" name="tdg8e1" value="wrong"> de l'identité E seule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg8e1','tdg8fb1','Correct — l opérateur pertinent en IR est le moment dipolaire, qui se transforme comme x, y ou z.','L opérateur pertinent en IR est le moment dipolaire : comme quelles fonctions se transforme-t-il ?')">Vérifier</button>
        <div class="feedback" id="tdg8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une molécule centrosymétrique, un mode actif en Raman est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg8e2" value="wrong"> toujours aussi actif en IR</label>
          <label class="option"><input type="radio" name="tdg8e2" value="right"> nécessairement inactif en IR</label>
          <label class="option"><input type="radio" name="tdg8e2" value="wrong"> jamais observable expérimentalement</label>
          <label class="option"><input type="radio" name="tdg8e2" value="wrong"> uniquement observable à basse température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg8e2','tdg8fb2','Correct — c est la règle d exclusion mutuelle : pour une molécule centrosymétrique, IR et Raman sont rigoureusement complémentaires, jamais actifs simultanément pour un même mode.','Pense à la règle d exclusion mutuelle, valable uniquement pour les molécules centrosymétriques.')">Vérifier</button>
        <div class="feedback" id="tdg8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La règle d'exclusion mutuelle IR/Raman s'applique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="tdg8e3" value="wrong"> à toutes les molécules, sans exception</label>
          <label class="option"><input type="radio" name="tdg8e3" value="right"> uniquement aux molécules centrosymétriques</label>
          <label class="option"><input type="radio" name="tdg8e3" value="wrong"> uniquement aux molécules linéaires</label>
          <label class="option"><input type="radio" name="tdg8e3" value="wrong"> uniquement aux molécules diatomiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('tdg8e3','tdg8fb3','Correct — c est la présence d un centre d inversion qui sépare rigoureusement les fonctions de base en type g (Raman) et type u (IR).','Pense à H2O, qui n a pas de centre d inversion : ses modes sont actifs à la fois en IR et en Raman (chapitre 7). Quelle propriété structurale manque à H2O ?')">Vérifier</button>
        <div class="feedback" id="tdg8fb3"></div>
      </div>
    </div>
  `
};

TDG_NOVA_KB[tdgKey('Applications en spectroscopie : règles de sélection par symétrie')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Règles de sélection par symétrie ». Demande-moi la règle IR, la règle Raman, la règle d'exclusion mutuelle, ou un indice sur un exercice.",
  rules: [
    { test:/r[èe]gle.*s[ée]lection|permise|contient a1/i, replies:["Une transition est permise si le produit direct Γψi⊗ΓÔ⊗Γψf contient la représentation totalement symétrique A1. Depuis l'état fondamental (A1), cela revient à comparer directement la RI du mode et celle de l'opérateur."] },
    { test:/infrarouge|\bir\b/i, replies:["Un mode est actif en IR si sa RI correspond à celle d'une coordonnée cartésienne x, y ou z dans la table de caractères (l'opérateur pertinent est le moment dipolaire)."] },
    { test:/raman/i, replies:["Un mode est actif en Raman si sa RI correspond à celle d'une fonction quadratique (x²,y²,z²,xy,xz,yz) dans la table de caractères (l'opérateur pertinent est la polarisabilité)."] },
    { test:/exclusion mutuelle|centrosym[ée]trique/i, replies:["La règle d'exclusion mutuelle s'applique aux molécules CENTROSYMÉTRIQUES : un mode actif en IR (type u) est alors nécessairement inactif en Raman (type g), et réciproquement."] },
    { test:/gerade|ungerade|\bg\b.*\bu\b/i, replies:["Pour une molécule centrosymétrique : les représentations 'gerade' (g, symétriques par i) portent les fonctions quadratiques (Raman) ; les représentations 'ungerade' (u, antisymétriques) portent x,y,z (IR)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quel opérateur physique est pertinent en IR ?","Indice niveau 2 : c'est le moment dipolaire électrique.","Indice niveau 3 : il se transforme comme x, y ou z."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la règle d'exclusion mutuelle.","Indice niveau 2 : IR et Raman sont rigoureusement complémentaires pour ces molécules.","Indice niveau 3 : un mode actif en Raman est nécessairement inactif en IR."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à H2O, où les modes sont actifs dans les deux techniques à la fois.","Indice niveau 2 : quelle propriété structurale manque à H2O ?","Indice niveau 3 : la règle ne s'applique qu'aux molécules avec un centre d'inversion (centrosymétriques)."] }
  ]
};

/* fusionne le module Théorie des groupes dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, TDG_CHAPTERS);
Object.assign(NOVA_KB, TDG_NOVA_KB);