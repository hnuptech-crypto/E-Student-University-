/* =====================================================================
   CHUNK « algebre » — registre ALGEBRE_CHAPTERS / ALGEBRE_NOVA_KB
   Matière(s) : Mathématiques|Algèbre
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ALGEBRE_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE ALGÈBRE — Mathématiques L1 (contenu rédigé à partir du cours FAST/UAC)
   Structure identique aux autres modules : ALGEBRE_CHAPTERS / ALGEBRE_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const ALGEBRE_MATIERE = 'Algèbre';
function algKey(chapterTitle){ return `Mathématiques|${ALGEBRE_MATIERE}|${chapterTitle}`; }
const ALGEBRE_CHAPTERS = {};
const ALGEBRE_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Déterminant et inverse d'une matrice 2×2 / 3×3 (Chapitre 1)
   (calculateur, pas une animation : c'est le geste que l'étudiant doit automatiser)
--------------------------------------------------------------------------------- */
function toggleAlgMatSize(){
  const size = document.getElementById('algMatSize').value;
  document.querySelectorAll('#algMatTable .algRow3').forEach(el => el.style.display = size === '3' ? '' : 'none');
  document.querySelectorAll('#algMatTable .algCol3').forEach(el => el.style.display = size === '3' ? '' : 'none');
  updateAlgMatCalc();
}
function readAlgMat(size){
  const m = [];
  for(let i=0;i<size;i++){
    const row = [];
    for(let j=0;j<size;j++){ row.push(parseFloat(document.getElementById('algm'+i+j).value) || 0); }
    m.push(row);
  }
  return m;
}
function updateAlgMatCalc(){
  const size = parseInt(document.getElementById('algMatSize').value);
  const m = readAlgMat(size);
  let det, out = '';
  if(size === 2){
    det = m[0][0]*m[1][1] - m[0][1]*m[1][0];
    out += `det(A) = (${m[0][0]})×(${m[1][1]}) − (${m[0][1]})×(${m[1][0]}) = <strong>${det.toFixed(2)}</strong><br>`;
    if(Math.abs(det) > 1e-9){
      const inv = [[m[1][1]/det, -m[0][1]/det], [-m[1][0]/det, m[0][0]/det]];
      out += `A est inversible. A⁻¹ = (1/detA)·[[d,−b],[−c,a]] :<br>` +
        `[ ${inv[0][0].toFixed(3)}  ${inv[0][1].toFixed(3)} ]<br>[ ${inv[1][0].toFixed(3)}  ${inv[1][1].toFixed(3)} ]`;
    } else {
      out += `det = 0 : <strong>A n'est pas inversible.</strong>`;
    }
  } else {
    const a=m[0][0],b=m[0][1],c=m[0][2],d=m[1][0],e=m[1][1],f=m[1][2],g=m[2][0],h=m[2][1],k=m[2][2];
    const C00=e*k-f*h, C01=-(d*k-f*g), C02=d*h-e*g;
    const C10=-(b*k-c*h), C11=a*k-c*g, C12=-(a*h-b*g);
    const C20=b*f-c*e, C21=-(a*f-c*d), C22=a*e-b*d;
    det = a*C00 + b*C01 + c*C02;
    out += `det(A) (développement suivant la ligne 1) = <strong>${det.toFixed(2)}</strong><br>`;
    if(Math.abs(det) > 1e-9){
      const inv = [
        [C00/det, C10/det, C20/det],
        [C01/det, C11/det, C21/det],
        [C02/det, C12/det, C22/det]
      ];
      out += `A est inversible. A⁻¹ = (1/detA)·ᵗcom(A) :<br>` + inv.map(row => '[ '+row.map(v=>v.toFixed(3)).join('  ')+' ]').join('<br>');
    } else {
      out += `det = 0 : <strong>A n'est pas inversible.</strong>`;
    }
  }
  document.getElementById('algMatReadout').innerHTML = out;
}
function initAlgMatCalc(){ toggleAlgMatSize(); }

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Combinaison linéaire dans ℝ² : visualiser une famille génératrice (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateAlgSpanSim(){
  const l1 = parseFloat(document.getElementById('algL1').value);
  const l2 = parseFloat(document.getElementById('algL2').value);
  document.getElementById('algL1Val').textContent = l1.toFixed(1);
  document.getElementById('algL2Val').textContent = l2.toFixed(1);
  const u1 = [1,1], u2 = [1,-1];
  const ux = l1*u1[0] + l2*u2[0], uy = l1*u1[1] + l2*u2[1];
  const toSvg = (x,y) => [100 + x*18, 100 - y*18];
  const [xa,ya] = toSvg(l1*u1[0], l1*u1[1]);
  const [xb,yb] = toSvg(ux, uy);
  document.getElementById('algSpanU1').setAttribute('x2', xa); document.getElementById('algSpanU1').setAttribute('y2', ya);
  document.getElementById('algSpanU2').setAttribute('x1', xa); document.getElementById('algSpanU2').setAttribute('y1', ya);
  document.getElementById('algSpanU2').setAttribute('x2', xb); document.getElementById('algSpanU2').setAttribute('y2', yb);
  document.getElementById('algSpanU').setAttribute('x2', xb); document.getElementById('algSpanU').setAttribute('y2', yb);
  document.getElementById('algSpanReadout').innerHTML =
    `u = ${l1.toFixed(1)}·u₁ + ${l2.toFixed(1)}·u₂ = ${l1.toFixed(1)}·(1,1) + ${l2.toFixed(1)}·(1,−1) = <strong>(${ux.toFixed(1)}, ${uy.toFixed(1)})</strong><br>` +
    `u₁ et u₂ ne sont pas colinéaires : en faisant varier λ₁ et λ₂, on atteint n'importe quel point du plan — {u₁,u₂} est donc une famille génératrice (et même une base) de ℝ².`;
}
function initAlgSpanSim(){ updateAlgSpanSim(); }

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Transformation linéaire 2D : image du carré unité par une matrice (Chapitre 4)
--------------------------------------------------------------------------------- */
function updateAlgLinTrans(){
  const a = parseFloat(document.getElementById('algTa').value);
  const b = parseFloat(document.getElementById('algTb').value);
  const c = parseFloat(document.getElementById('algTc').value);
  const d = parseFloat(document.getElementById('algTd').value);
  document.getElementById('algTaVal').textContent = a.toFixed(1);
  document.getElementById('algTbVal').textContent = b.toFixed(1);
  document.getElementById('algTcVal').textContent = c.toFixed(1);
  document.getElementById('algTdVal').textContent = d.toFixed(1);
  const toSvg = (x,y) => [90 + x*30, 90 - y*30];
  const p0=toSvg(0,0), p1=toSvg(a,c), p2=toSvg(a+b,c+d), p3=toSvg(b,d);
  document.getElementById('algTransSquare').setAttribute('points', `${p0[0]},${p0[1]} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`);
  document.getElementById('algTransE1').setAttribute('x2', p1[0]); document.getElementById('algTransE1').setAttribute('y2', p1[1]);
  document.getElementById('algTransE2').setAttribute('x2', p3[0]); document.getElementById('algTransE2').setAttribute('y2', p3[1]);
  const det = a*d - b*c;
  document.getElementById('algTransReadout').innerHTML =
    `Matrice : [[${a.toFixed(1)}, ${b.toFixed(1)}], [${c.toFixed(1)}, ${d.toFixed(1)}]] — det = ${det.toFixed(2)}<br>` +
    `L'aire du carré unité est multipliée par |det| = ${Math.abs(det).toFixed(2)}.<br>` +
    (Math.abs(det) > 1e-9
      ? "det ≠ 0 : c'est un isomorphisme de ℝ² — le carré devient un parallélogramme non aplati."
      : "det = 0 : ce n'est pas un isomorphisme — le carré s'écrase sur une droite (ou un point).");
}
function initAlgLinTrans(){ updateAlgLinTrans(); }

/* ---------------------------------------------------------------------------------
   OUTIL 4 — Valeurs propres d'une matrice 2×2 (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateAlgEigCalc(){
  const a = parseFloat(document.getElementById('algEa').value) || 0;
  const b = parseFloat(document.getElementById('algEb').value) || 0;
  const c = parseFloat(document.getElementById('algEc').value) || 0;
  const d = parseFloat(document.getElementById('algEd').value) || 0;
  const tr = a + d, det = a*d - b*c;
  const delta = tr*tr - 4*det;
  let out = `Polynôme caractéristique : P(λ) = λ² − (${tr.toFixed(2)})λ + (${det.toFixed(2)})<br>Δ = tr² − 4·det = ${delta.toFixed(2)}<br>`;
  if(delta > 1e-9){
    const l1 = (tr+Math.sqrt(delta))/2, l2 = (tr-Math.sqrt(delta))/2;
    out += `Deux valeurs propres réelles distinctes : λ₁ = ${l1.toFixed(3)}, λ₂ = ${l2.toFixed(3)}.<br>Elles sont distinctes, donc la matrice est <strong>diagonalisable</strong>.`;
  } else if(Math.abs(delta) <= 1e-9){
    const l = tr/2;
    out += `Valeur propre double : λ = ${l.toFixed(3)}.<br>Diagonalisable seulement si le sous-espace propre associé est de dimension 2 (donc si A = λI₂) — sinon A est seulement trigonalisable.`;
  } else {
    const re = tr/2, im = Math.sqrt(-delta)/2;
    out += `Δ &lt; 0 : valeurs propres complexes conjuguées λ = ${re.toFixed(3)} ± ${im.toFixed(3)}i.<br>Pas de valeur propre réelle : A n'est pas diagonalisable dans ℝ.`;
  }
  document.getElementById('algEigReadout').innerHTML = out;
}
function initAlgEigCalc(){ updateAlgEigCalc(); }

/* =========================== CHAPITRE 1 — Calcul matriciel et déterminants =========================== */
ALGEBRE_CHAPTERS[algKey('Calcul matriciel et déterminants')] = {
  objectives: [
    "Manipuler les opérations matricielles de base (somme, produit, transposée, trace)",
    "Calculer un déterminant (ordre 2, ordre 3 par Sarrus ou par cofacteurs, ordre n)",
    "Déterminer si une matrice est inversible et calculer son inverse par la comatrice",
    "Résoudre un système linéaire par la méthode de Cramer",
    "Évaluer en quoi l'abstraction de Cayley — traiter une matrice comme un nombre généralisé, au prix de la commutativité du produit — a permis à l'algèbre matricielle de devenir l'outil de calcul central de l'infographie, de l'apprentissage automatique et des moteurs de recherche modernes"
  ],
  prereqs: ["Calcul numérique de base (L1)"],
  bodyHtml: `
    <p>Bien que les déterminants soient étudiés depuis le XVIIe siècle — Leibniz en Europe et, indépendamment, le mathématicien japonais Seki Takakazu vers la même époque —, ce n'est qu'en 1858 que le mathématicien britannique Arthur Cayley formalisa la matrice comme un objet algébrique à part entière, dans son <em>Mémoire sur la théorie des matrices</em>. Son intuition la plus audacieuse fut de traiter une matrice non comme un simple tableau de nombres, mais comme un <strong>nombre généralisé</strong> que l'on peut additionner et multiplier selon des règles propres — quitte à sacrifier la commutativité du produit, une propriété que Cayley savait pertinemment ne pas tenir en général.</p>
    <p>Cette abstraction, qui pouvait sembler purement théorique en 1858, s'est révélée être l'outil de calcul le plus universellement employé en sciences appliquées : infographie 3D (chaque rotation, translation ou mise à l'échelle d'un objet virtuel est une multiplication matricielle), réseaux de neurones (chaque couche d'un modèle d'intelligence artificielle applique une transformation matricielle), moteurs de recherche (le classement des pages web par Google repose sur le calcul du vecteur propre d'une matrice gigantesque).</p>
    <p>Une matrice est simplement un tableau de nombres organisé en lignes et en colonnes. Ce chapitre pose les manipulations de base — indispensables pour tout le reste du cours d'algèbre linéaire : espaces vectoriels, applications linéaires, diagonalisation. À la fin de ce chapitre, tu sauras manipuler les opérations matricielles fondamentales, calculer un déterminant, et résoudre un système linéaire par les méthodes de Cramer ou du pivot de Gauss.</p>

    <h3>1. Qu'est-ce qu'une matrice ?</h3>
    <p>Une matrice de taille $n \\times p$ à coefficients dans $\\mathbb{K}$ (= $\\mathbb{R}$ ou $\\mathbb{C}$) est un tableau de $n$ lignes et $p$ colonnes, noté $M=(M_{ij})$, où $M_{ij}$ est l'élément situé ligne $i$, colonne $j$. L'ensemble de ces matrices se note $\\mathcal{M}_{np}(\\mathbb{K})$.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 90" width="100%">
          <rect x="10" y="8" width="120" height="74" fill="none" stroke="#4C7CFF" stroke-width="1.4"/>
          <line x1="10" y1="30" x2="130" y2="30" stroke="#3A4658" stroke-width="1"/>
          <line x1="10" y1="52" x2="130" y2="52" stroke="#3A4658" stroke-width="1"/>
          <line x1="52" y1="8" x2="52" y2="82" stroke="#3A4658" stroke-width="1"/>
          <line x1="90" y1="8" x2="90" y2="82" stroke="#3A4658" stroke-width="1"/>
          <rect x="52" y="30" width="38" height="22" fill="#F0B94D" opacity="0.35"/>
          <text x="60" y="45" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">Mij</text>
          <text x="14" y="94" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">i = ligne, j = colonne</text>
        </svg>
        <span>Repérage d'un élément M<sub>ij</sub> dans une matrice</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>Type</th><th>Définition</th></tr>
      <tr><td>Matrice carrée</td><td>$n = p$ (autant de lignes que de colonnes)</td></tr>
      <tr><td>Matrice ligne / colonne</td><td>$n=1$ (ligne) ou $p=1$ (colonne)</td></tr>
      <tr><td>Matrice diagonale</td><td>carrée, tous les $M_{ij}=0$ si $i\\neq j$</td></tr>
      <tr><td>Matrice identité $I_n$</td><td>diagonale, avec des 1 sur la diagonale</td></tr>
      <tr><td>Triangulaire sup. / inf.</td><td>$M_{ij}=0$ si $i>j$ (sup.) ou si $i<j$ (inf.)</td></tr>
      <tr><td>Matrice symétrique</td><td>carrée, $M_{ij}=M_{ji}$ pour tout $(i,j)$</td></tr>
    </table>

    <h3>2. Opérations sur les matrices</h3>
    <p><strong>Somme</strong> (même taille) et <strong>produit par un scalaire</strong> se font terme à terme : $(A+B)_{ij}=A_{ij}+B_{ij}$, $(\\lambda A)_{ij}=\\lambda A_{ij}$.</p>
    <p>Le <strong>produit</strong> $C=AB$ est plus subtil : il n'existe que si le nombre de colonnes de $A$ égale le nombre de lignes de $B$. Chaque terme $C_{ij}$ est le produit scalaire de la ligne $i$ de $A$ par la colonne $j$ de $B$ :</p>
    <div class="formula-box">$$C_{ij} = \\sum_{k=1}^{p} A_{ik}B_{kj}$$</div>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 150 90" width="100%">
          <rect x="6" y="10" width="16" height="60" fill="#4C7CFF" opacity="0.3" stroke="#4C7CFF"/>
          <text x="2" y="8" font-family="IBM Plex Mono" font-size="8" fill="#4C7CFF">ligne i de A</text>
          <rect x="40" y="6" width="60" height="16" fill="#2DD4C4" opacity="0.3" stroke="#2DD4C4"/>
          <text x="102" y="16" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">colonne j de B</text>
          <line x1="22" y1="40" x2="55" y2="14" stroke="#F0B94D" stroke-width="1.6" marker-end="url(#algArrCij)"/>
          <text x="60" y="55" font-family="IBM Plex Mono" font-size="10" fill="#F0B94D">→ Cij</text>
          <defs><marker id="algArrCij" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker></defs>
        </svg>
        <span>Chaque C<sub>ij</sub> combine une ligne de A et une colonne de B</span>
      </div>
    </div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      En général $AB \\neq BA$ : le produit matriciel n'est <strong>pas commutatif</strong>. La <strong>transposée</strong> $^tA$ échange lignes et colonnes ; on a $^t(AB)=(^tB)(^tA)$ (l'ordre s'inverse). La <strong>trace</strong> $\\text{Tr}(A)$ (somme des termes diagonaux) n'existe que pour une matrice carrée.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait que AB ≠ BA en général contredit l'intuition héritée de l'arithmétique ordinaire, où la multiplication est toujours commutative. En quoi cette non-commutativité reflète-t-elle une réalité géométrique concrète : que se passe-t-il, par exemple, si on applique d'abord une rotation puis une mise à l'échelle à un objet, comparé à l'ordre inverse ?
    </div>

    <h3>3. Déterminant</h3>
    <p>Le déterminant $\\det A$ n'existe que pour une matrice carrée ; c'est un nombre qui indique notamment si $A$ est inversible.</p>
    <table class="mini-table">
      <tr><th>Taille</th><th>Formule</th></tr>
      <tr><td>2×2</td><td>$\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad-bc$</td></tr>
      <tr><td>3×3 (règle de Sarrus)</td><td>on recopie les 2 premières colonnes à droite, puis $+$ les 3 diagonales descendantes $-$ les 3 diagonales montantes</td></tr>
      <tr><td>n×n (cofacteurs)</td><td>$\\det A = \\sum_j (-1)^{i+j}a_{ij}\\Delta_{ij}$ (développement suivant une ligne $i$ ; $\\Delta_{ij}$ = mineur)</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer $\\det M$ avec $M=\\begin{pmatrix}1&4&5\\\\-1&2&2\\\\3&1&3\\end{pmatrix}$.</p>
      <p><strong>Solution :</strong> développement suivant la ligne 1 : $1\\times(2\\times3-2\\times1) - 4\\times(-1\\times3-2\\times3) + 5\\times(-1\\times1-2\\times3) = 4+36-35$.</p>
      <p class="example-answer">Réponse : $\\det M = 5$.</p>
    </div>
    <p>Propriétés utiles : $\\det(AB)=\\det A\\cdot\\det B$ ; $\\det(^tA)=\\det A$ ; $\\det(\\lambda A)=\\lambda^n\\det A$ ; échanger deux lignes change le signe ; deux lignes identiques (ou une ligne nulle) donnent un déterminant nul ; ajouter à une ligne une combinaison linéaire des autres ne change pas le déterminant.</p>

    <h3>4. Inverse d'une matrice</h3>
    <p>$A$ carrée est <strong>inversible</strong> si et seulement si $\\det A \\neq 0$. On calcule alors :</p>
    <div class="formula-box">$$A^{-1} = \\frac{1}{\\det A}\\,^t\\text{com}(A)$$</div>
    <p>où $\\text{com}(A)$ est la <strong>comatrice</strong> : la matrice des cofacteurs $\\alpha_{ij}=(-1)^{i+j}\\Delta_{ij}$.</p>

    <h3>5. Systèmes linéaires et méthode de Cramer</h3>
    <p>Un système $(S)$ de $n$ équations à $n$ inconnues s'écrit $AX=B$. S'il est <strong>de Cramer</strong> (rang $= n$, donc $\\det A \\neq 0$), on peut le résoudre par $X=A^{-1}B$, ou terme à terme avec les déterminants :</p>
    <div class="formula-box">$$x_i = \\frac{D_{x_i}}{\\det A}, \\quad D_{x_i} = \\det(A \\text{ avec la colonne } i \\text{ remplacée par } B)$$</div>
    <p>Pour un système général, la <strong>méthode du pivot de Gauss</strong> (opérations élémentaires sur les lignes pour obtenir une forme triangulaire) fonctionne dans tous les cas, même quand le système n'est pas carré.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La méthode de Cramer, élégante et systématique, exige de calculer n+1 déterminants pour résoudre un système de n équations — un coût de calcul qui explose rapidement avec la taille du système. Pourquoi le pivot de Gauss, bien que moins « élégant » sur le papier, est-il en pratique presque toujours préféré pour résoudre de grands systèmes linéaires ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>L'algorithme PageRank, à l'origine du moteur de recherche Google, repose entièrement sur le calcul matriciel que tu viens d'apprendre : le web tout entier est modélisé comme une immense matrice, où chaque lien entre deux pages est un coefficient, et l'importance relative de chaque page correspond à une composante du vecteur propre dominant de cette matrice — un calcul portant sur une matrice de plusieurs milliards de lignes et de colonnes, bien au-delà de ce qu'un être humain pourrait manipuler à la main, mais qui repose sur exactement les mêmes principes que le calcul matriciel 3×3 de ce chapitre.</p>
    <p><strong>Question ouverte :</strong> comment calcule-t-on efficacement le vecteur propre dominant d'une matrice comportant des milliards de lignes, sans jamais calculer explicitement son déterminant ou son inverse, qui seraient totalement impraticables à cette échelle ?</p>
    <p><strong>Technologie émergente :</strong> les <strong>unités de traitement graphique</strong> (GPU), conçues à l'origine pour accélérer le rendu d'images 3D par multiplication matricielle massive, sont aujourd'hui le matériel de référence pour l'entraînement des réseaux de neurones, où chaque couche du réseau applique précisément une multiplication de matrices — un même besoin de calcul matriciel massif reliant infographie et intelligence artificielle.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Matrice A (tableau de nombres) → opérations de base (somme, produit, transposée) → déterminant (Sarrus ou cofacteurs) → si det A ≠ 0 : A inversible via la comatrice → système linéaire AX=B → résolution par Cramer (petits systèmes) ou pivot de Gauss (systèmes généraux, plus efficace)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$A^{-1} = \\dfrac{1}{\\det A}\\,^t\\text{com}(A) \\qquad (\\det A \\neq 0)$$
      Cette formule condense la condition exacte d'inversibilité d'une matrice (un déterminant non nul) et la méthode pour construire son inverse — l'outil qui rend possible la résolution directe de tout système linéaire de Cramer, et qui généralise, à un tableau de nombres entier, la notion familière d'inverse d'un nombre réel.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Cayley n'avait jamais formalisé l'algèbre matricielle en 1858 : l'infographie 3D et l'apprentissage automatique auraient-ils pu se développer avec un formalisme mathématique différent, ou le calcul matriciel était-il en un sens inévitable ?</li>
        <li>Pourquoi le déterminant d'une matrice change-t-il de signe lorsqu'on échange deux lignes, mais reste inchangé lorsqu'on ajoute à une ligne une combinaison linéaire des autres ?</li>
        <li>Quelle serait la conséquence, pour le classement des résultats d'un moteur de recherche comme Google, d'une impossibilité de calculer efficacement le vecteur propre dominant d'une matrice de très grande taille ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>A. Cayley, « A Memoir on the Theory of Matrices », Philosophical Transactions of the Royal Society, 1858 — le texte fondateur de l'algèbre matricielle moderne.</li>
        <li>G. Cramer, <em>Introduction à l'analyse des lignes courbes algébriques</em>, 1750 — l'ouvrage introduisant la méthode de résolution des systèmes linéaires qui porte son nom.</li>
        <li>S. Brin, L. Page, « The Anatomy of a Large-Scale Hypertextual Web Search Engine », 1998 — l'article fondateur de l'algorithme PageRank de Google.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais manipuler les opérations matricielles fondamentales, calculer un déterminant, et résoudre un système linéaire par les méthodes de Cramer ou du pivot de Gauss. Le chapitre suivant, « Structures algébriques : Groupe-Anneau-Corps », prendra du recul pour formaliser les propriétés abstraites (associativité, existence d'un inverse...) que tu as déjà manipulées intuitivement en calculant sur des matrices. Comme le montre l'algorithme PageRank de Google : une abstraction mathématique du XIXe siècle, jugée à l'époque purement théorique, peut devenir un siècle et demi plus tard le moteur silencieux d'une technologie utilisée par des milliards de personnes chaque jour.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le produit $AB$ n'existe que si (colonnes de A) = (lignes de B), et $AB\\neq BA$ en général</li>
        <li>Le déterminant se calcule par Sarrus (ordre 3) ou par développement en cofacteurs (ordre n)</li>
        <li>$A$ est inversible $\\iff \\det A \\neq 0$, et alors $A^{-1}=\\frac{1}{\\det A}\\,^t\\text{com}(A)$</li>
        <li>Un système de Cramer se résout par $A^{-1}B$ ou par les déterminants $D_{x_i}/\\det A$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe $(-1)^{i+j}$ dans un cofacteur (une case sur deux change de signe, en damier)</li>
        <li>Écrire $AB=BA$ par réflexe — c'est faux en général pour les matrices</li>
        <li>Confondre comatrice et son inverse : c'est $^t\\text{com}(A)$ (transposée) qu'il faut diviser par $\\det A$, pas $\\text{com}(A)$ seule</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — déterminant et inverse d'une matrice</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis une taille et modifie les coefficients : le déterminant et l'inverse (si elle existe) se recalculent automatiquement.</p>
      <div class="sim-controls" style="max-width:260px;">
        <label>Taille : <select id="algMatSize" onchange="toggleAlgMatSize()"><option value="2">2 × 2</option><option value="3" selected>3 × 3</option></select></label>
        <table class="mini-table" id="algMatTable" style="margin-top:8px;">
          <tr>
            <td><input type="number" id="algm00" value="1" style="width:50px;" oninput="updateAlgMatCalc()"></td>
            <td><input type="number" id="algm01" value="4" style="width:50px;" oninput="updateAlgMatCalc()"></td>
            <td class="algCol3"><input type="number" id="algm02" value="5" style="width:50px;" oninput="updateAlgMatCalc()"></td>
          </tr>
          <tr>
            <td><input type="number" id="algm10" value="-1" style="width:50px;" oninput="updateAlgMatCalc()"></td>
            <td><input type="number" id="algm11" value="2" style="width:50px;" oninput="updateAlgMatCalc()"></td>
            <td class="algCol3"><input type="number" id="algm12" value="2" style="width:50px;" oninput="updateAlgMatCalc()"></td>
          </tr>
          <tr class="algRow3">
            <td><input type="number" id="algm20" value="3" style="width:50px;" oninput="updateAlgMatCalc()"></td>
            <td><input type="number" id="algm21" value="1" style="width:50px;" oninput="updateAlgMatCalc()"></td>
            <td class="algCol3"><input type="number" id="algm22" value="3" style="width:50px;" oninput="updateAlgMatCalc()"></td>
          </tr>
        </table>
        <div class="sim-readout" id="algMatReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour $A=\\begin{pmatrix}1&3\\\\8&10\\end{pmatrix}$, que vaut $\\det A$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg1e1" value="wrong"> 34</label>
          <label class="option"><input type="radio" name="alg1e1" value="right"> −14</label>
          <label class="option"><input type="radio" name="alg1e1" value="wrong"> 14</label>
          <label class="option"><input type="radio" name="alg1e1" value="wrong"> −34</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg1e1','alg1fb1','Correct — det A = 1×10 − 3×8 = 10 − 24 = −14.','Utilise ad − bc : ici 1×10 − 3×8.')">Vérifier</button>
        <div class="feedback" id="alg1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si $A$ est une matrice $2\\times3$ et $B$ une matrice $3\\times4$, le produit $AB$...</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg1e2" value="wrong"> n'existe pas</label>
          <label class="option"><input type="radio" name="alg1e2" value="right"> existe et est de taille 2×4</label>
          <label class="option"><input type="radio" name="alg1e2" value="wrong"> existe et est de taille 3×3</label>
          <label class="option"><input type="radio" name="alg1e2" value="wrong"> existe et est de taille 4×2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg1e2','alg1fb2','Correct — le nombre de colonnes de A (3) égale le nombre de lignes de B (3) : le produit existe, de taille (lignes de A) × (colonnes de B) = 2×4.','Vérifie d\\'abord la condition d\\'existence : colonnes de A = lignes de B. Ici 3=3, ça marche.')">Vérifier</button>
        <div class="feedback" id="alg1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une matrice carrée A est inversible si et seulement si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg1e3" value="wrong"> Tr(A) ≠ 0</label>
          <label class="option"><input type="radio" name="alg1e3" value="right"> det(A) ≠ 0</label>
          <label class="option"><input type="radio" name="alg1e3" value="wrong"> A est symétrique</label>
          <label class="option"><input type="radio" name="alg1e3" value="wrong"> A est diagonale</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg1e3','alg1fb3','Correct — c\\'est le critère fondamental d\\'inversibilité.','La trace, la symétrie et le fait d\\'être diagonale n\\'ont rien à voir avec l\\'inversibilité en général.')">Vérifier</button>
        <div class="feedback" id="alg1fb3"></div>
      </div>
    </div>
  `,
  init: initAlgMatCalc
};

ALGEBRE_NOVA_KB[algKey('Calcul matriciel et déterminants')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Calcul matriciel et déterminants ». Demande-moi comment calculer un déterminant, une inverse, ou un indice sur un exercice.",
  rules: [
    { test:/produit.*matrice|matrice.*produit/i, replies:["Le produit AB n'existe que si le nombre de colonnes de A égale le nombre de lignes de B. Chaque terme Cij est le produit scalaire de la ligne i de A par la colonne j de B. Et attention : AB ≠ BA en général !"] },
    { test:/d[ée]terminant/i, replies:["Pour une 2×2 : det = ad−bc. Pour une 3×3, utilise la règle de Sarrus ou un développement en cofacteurs suivant une ligne ou une colonne."] },
    { test:/sarrus/i, replies:["La règle de Sarrus (uniquement pour les matrices 3×3) : recopie les deux premières colonnes à droite, additionne les 3 diagonales qui descendent, soustrais les 3 diagonales qui montent."] },
    { test:/inverse|inversible/i, replies:["A est inversible si et seulement si det(A) ≠ 0. Alors A⁻¹ = (1/detA)·ᵗcom(A), où com(A) est la matrice des cofacteurs."] },
    { test:/comatrice|cofacteur/i, replies:["Le cofacteur de la place (i,j) est (−1)^(i+j) fois le mineur Δij (le déterminant obtenu en supprimant la ligne i et la colonne j). La comatrice regroupe tous ces cofacteurs."] },
    { test:/transpos[ée]e/i, replies:["La transposée ᵗA échange les lignes et les colonnes de A. Propriété utile : ᵗ(AB) = (ᵗB)(ᵗA) — l'ordre s'inverse !"] },
    { test:/trace/i, replies:["La trace Tr(A) d'une matrice carrée est la somme de ses éléments diagonaux : Tr(A) = a11+a22+...+ann."] },
    { test:/cramer/i, replies:["Un système de Cramer (n équations, n inconnues, rang n) se résout par xi = Dxi/detA, où Dxi est le déterminant de A avec la colonne i remplacée par le second membre B."] },
    { test:/pivot.*gauss|gauss/i, replies:["Le pivot de Gauss transforme le système par des opérations élémentaires sur les lignes (L2 ← L2 − k·L1, etc.) jusqu'à obtenir une forme triangulaire, plus simple à résoudre."] },
    { test:/rang/i, replies:["Le rang d'une matrice est la taille maximale d'une sous-matrice carrée extraite dont le déterminant est non nul. Une matrice carrée de taille n de déterminant non nul a un rang égal à n."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique ad − bc.","Indice niveau 2 : ici 1×10 et 3×8.","Indice niveau 3 : 10 − 24 = −14."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : vérifie la condition colonnes de A = lignes de B.","Indice niveau 2 : A est 2×3, B est 3×4 — les « 3 » se correspondent.","Indice niveau 3 : le résultat est 2×4."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est LE critère d'inversibilité vu dans ce chapitre.","Indice niveau 2 : ça concerne le déterminant, pas la trace.","Indice niveau 3 : det(A) ≠ 0."] }
  ]
};

/* =========================== CHAPITRE 2 — Structures algébriques =========================== */
ALGEBRE_CHAPTERS[algKey('Structures algébriques : Groupe-Anneau-Corps')] = {
  objectives: [
    "Vérifier qu'une loi est une loi de composition interne et étudier ses propriétés",
    "Démontrer qu'un ensemble muni d'une loi forme un groupe, ou identifier un sous-groupe",
    "Utiliser un morphisme de groupes et déterminer son noyau et son image",
    "Distinguer les structures d'anneau et de corps",
    "Évaluer en quoi l'abstraction introduite par Galois — étudier une structure algébrique indépendamment des objets concrets qui la portent — a permis à la théorie des groupes de décrire aussi bien la résolubilité des équations polynomiales que les symétries moléculaires ou les lois fondamentales de la physique"
  ],
  prereqs: ["Calcul matriciel et déterminants"],
  bodyHtml: `
    <p>En 1832, la veille d'un duel dont il pressentait l'issue fatale, le jeune mathématicien français Évariste Galois, alors âgé de seulement vingt ans, passa la nuit à coucher sur le papier les idées qui allaient fonder la théorie des groupes — un concept qu'il avait développé pour résoudre un problème vieux de plusieurs siècles : pourquoi certaines équations polynomiales ne peuvent-elles pas être résolues par une formule utilisant seulement les opérations usuelles et des racines n-ièmes ? Galois mourut le lendemain des suites du duel, et il fallut plusieurs décennies avant que ses travaux, restés incompris de ses contemporains, ne soient pleinement reconnus comme l'un des fondements de l'algèbre moderne.</p>
    <p>L'abstraction que Galois a introduite — étudier une structure (un groupe) indépendamment des objets concrets sur lesquels elle s'applique — s'est révélée d'une puissance inattendue : le même concept de groupe décrit aussi bien les symétries d'une molécule en chimie, les mouvements possibles d'un Rubik's Cube, que les transformations qui laissent invariantes les lois de la physique (un principe à la base de la mécanique quantique et de la relativité).</p>
    <p>Ce chapitre prend du recul : au lieu d'étudier un ensemble de nombres précis, on étudie les <strong>propriétés d'une loi</strong> (une opération) sur un ensemble quelconque. Ce cadre abstrait — groupe, anneau, corps — se retrouve partout : dans $(\\mathbb{Z},+)$, dans les matrices, dans les polynômes, dans les rotations... À la fin de ce chapitre, tu sauras démontrer qu'un ensemble muni d'une loi forme un groupe, et distinguer les structures d'anneau et de corps.</p>

    <h3>1. Loi de composition interne</h3>
    <p>Une <strong>loi de composition interne</strong> sur un ensemble $E$ est une application de $E\\times E$ dans $E$ : à chaque couple $(x,y)$, elle associe un unique élément $x\\star y$ de $E$ (le résultat reste dans $E$). Le couple $(E,\\star)$ s'appelle un <strong>magma</strong>.</p>
    <p>Une partie $A\\subset E$ est <strong>stable</strong> pour $\\star$ si $\\forall(x,y)\\in A^2,\\ x\\star y \\in A$.</p>

    <h3>2. Quatre propriétés à connaître</h3>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Définition</th><th>Exemple</th></tr>
      <tr><td>Associativité</td><td>$a\\star(b\\star c)=(a\\star b)\\star c$</td><td>$+$ et $\\times$ sur $\\mathbb{R}$</td></tr>
      <tr><td>Élément neutre</td><td>$\\exists e,\\ \\forall a,\\ a\\star e=e\\star a=a$ (unique s'il existe)</td><td>$0$ pour $+$, $1$ pour $\\times$</td></tr>
      <tr><td>Symétrique</td><td>$\\exists a',\\ a\\star a'=a'\\star a=e$</td><td>$-a$ pour $+$, $1/a$ pour $\\times$ ($a\\neq0$)</td></tr>
      <tr><td>Commutativité</td><td>$x\\star y=y\\star x$</td><td>$+$ et $\\times$, mais pas le produit matriciel</td></tr>
    </table>

    <h3>3. Structure de groupe</h3>
    <p>$(G,\\star)$ est un <strong>groupe</strong> si $\\star$ est associative, admet un élément neutre, et si tout élément admet un symétrique dans $G$. Si en plus $\\star$ est commutative, on parle de <strong>groupe abélien</strong>.</p>
    <p>Exemples classiques : $(\\mathbb{Z},+)$, $(\\mathbb{Q},+)$, $(\\mathbb{R},+)$, $(\\mathbb{C},+)$ et $(\\mathbb{Q}^*,\\times)$, $(\\mathbb{R}^*,\\times)$, $(\\mathbb{C}^*,\\times)$ sont des groupes abéliens.</p>
    <div class="illus-row">
      <div class="illus-item">
        <table class="mini-table" style="margin:0;">
          <tr><th>×</th><th>1</th><th>−1</th></tr>
          <tr><td>1</td><td>1</td><td>−1</td></tr>
          <tr><td>−1</td><td>−1</td><td>1</td></tr>
        </table>
        <span>Table de $(\\{-1,1\\},\\times)$ : un petit groupe abélien à 2 éléments (neutre = 1)</span>
      </div>
    </div>
    <p>Une partie non vide $H$ de $G$ est un <strong>sous-groupe</strong> si et seulement si : $H$ est stable pour $\\star$, $H$ contient le neutre $e$, et le symétrique de tout élément de $H$ reste dans $H$. Autre caractérisation équivalente : $H\\neq\\emptyset$ et $\\forall(x,y)\\in H^2,\\ x\\star y^{-1}\\in H$.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pour vérifier qu'une partie H est un sous-groupe, il suffit de vérifier trois conditions précises (stabilité, neutre, symétrique), plutôt que de redémontrer depuis zéro toutes les propriétés d'un groupe. En quoi cette caractérisation économique illustre-t-elle l'intérêt pratique de travailler avec des définitions abstraites plutôt qu'avec des exemples concrets un par un ?
    </div>

    <h3>4. Morphisme de groupes, noyau et image</h3>
    <p>Un <strong>morphisme de groupes</strong> $f:(G,\\bullet)\\to(F,\\star)$ vérifie $f(x\\bullet y)=f(x)\\star f(y)$ pour tous $x,y$. On a alors automatiquement $f(e_G)=e_F$ et $f(x^{-1})=f(x)^{-1}$.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 110" width="100%">
          <ellipse cx="55" cy="55" rx="45" ry="42" fill="#4C7CFF" opacity="0.15" stroke="#4C7CFF" stroke-width="1.4"/>
          <ellipse cx="150" cy="55" rx="42" ry="42" fill="#2DD4C4" opacity="0.15" stroke="#2DD4C4" stroke-width="1.4"/>
          <ellipse cx="45" cy="55" rx="18" ry="26" fill="#FF6B6F" opacity="0.35" stroke="#FF6B6F" stroke-width="1.2"/>
          <text x="30" y="95" font-family="IBM Plex Mono" font-size="9" fill="#FF6B6F">ker f</text>
          <circle cx="150" cy="55" r="3" fill="#F0B94D"/>
          <text x="140" y="70" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">eF</text>
          <line x1="45" y1="55" x2="146" y2="55" stroke="#F0B94D" stroke-width="1.6" stroke-dasharray="3,2" marker-end="url(#algArrKer)"/>
          <text x="8" y="16" font-family="IBM Plex Mono" font-size="10" fill="#4C7CFF">G</text>
          <text x="185" y="16" font-family="IBM Plex Mono" font-size="10" fill="#2DD4C4">F</text>
          <text x="90" y="30" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">f</text>
          <defs><marker id="algArrKer" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker></defs>
        </svg>
        <span>Le noyau ker f (en rouge, dans G) s'envoie tout entier sur l'élément neutre e<sub>F</sub></span>
      </div>
    </div>
    <p>Le <strong>noyau</strong> $\\ker f=\\{x\\in G,\\ f(x)=e_F\\}$ et l'<strong>image</strong> $\\text{Im}\\,f=\\{f(x),x\\in G\\}$ sont toujours des sous-groupes (de $G$ et $F$ respectivement).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      $f$ est injectif $\\iff \\ker f = \\{e_G\\}$ ; $f$ est surjectif $\\iff \\text{Im}\\,f = F$. Un <strong>isomorphisme</strong> est un morphisme bijectif ; sa réciproque est alors, elle aussi, un isomorphisme.
    </div>

    <h3>5. Anneaux et corps</h3>
    <p>$(A,+,\\bullet)$ est un <strong>anneau</strong> si $(A,+)$ est un groupe abélien, $\\bullet$ est associative avec élément neutre $1_A$, et $\\bullet$ est distributive par rapport à $+$. Si $\\bullet$ est en plus commutative, l'anneau est <strong>commutatif</strong>. Un anneau est <strong>intègre</strong> si un produit nul impose qu'un des deux facteurs est nul.</p>
    <p>$(K,+,\\bullet)$ est un <strong>corps</strong> si $(K,+)$ est un groupe abélien et $(K^*,\\bullet)$ (avec $K^*=K\\setminus\\{0_K\\}$) est aussi un groupe, la distributivité étant vérifiée. Autrement dit : <strong>un corps est un anneau où tout élément non nul est inversible</strong> pour la seconde loi.</p>
    <table class="mini-table">
      <tr><th>Structure</th><th>Exemples</th></tr>
      <tr><td>Groupe abélien</td><td>$(\\mathbb{Z},+)$, $(\\mathbb{R}^*,\\times)$</td></tr>
      <tr><td>Anneau commutatif</td><td>$(\\mathbb{Z},+,\\times)$ — mais 2 n'a pas d'inverse pour ×</td></tr>
      <tr><td>Corps</td><td>$(\\mathbb{Q},+,\\times)$, $(\\mathbb{R},+,\\times)$, $(\\mathbb{C},+,\\times)$</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      (Z,+,×) est un anneau mais pas un corps, précisément parce que 2 n'a pas d'inverse entier pour la multiplication. En quoi cette distinction entre anneau et corps reflète-t-elle une différence essentielle entre les entiers relatifs et les nombres rationnels, que tu utilises pourtant tous les jours sans y penser ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La théorie des groupes, née de la quête de Galois pour comprendre la résolubilité des équations, est aujourd'hui au cœur de la cryptographie moderne qui protège l'essentiel des communications numériques. La <strong>cryptographie à courbe elliptique</strong>, utilisée notamment pour sécuriser les transactions bancaires en ligne et les cryptomonnaies, repose sur la structure de groupe formée par les points d'une courbe elliptique — la difficulté de « diviser » dans ce groupe (le problème du logarithme discret) est précisément ce qui rend le système sûr contre les attaques, même avec une puissance de calcul considérable.</p>
    <p><strong>Question ouverte :</strong> les ordinateurs quantiques, encore en développement, pourraient théoriquement résoudre efficacement le problème du logarithme discret sur lequel repose cette cryptographie — quelles nouvelles structures algébriques la recherche explore-t-elle aujourd'hui pour concevoir une cryptographie résistante aux ordinateurs quantiques ?</p>
    <p><strong>Concept avancé :</strong> les <strong>corps finis</strong> (comportant un nombre fini d'éléments, comme $\\mathbb{Z}/p\\mathbb{Z}$ pour $p$ premier) sont au cœur du standard de chiffrement AES (Advanced Encryption Standard), qui protège aujourd'hui la quasi-totalité des communications numériques sensibles, des transactions bancaires aux messages chiffrés.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Ensemble E muni d'une loi ⋆ → vérifier associativité, neutre, symétrique → structure de groupe (abélien si en plus commutatif) → ajouter une seconde loi distributive → structure d'anneau → si tout élément non nul est inversible pour la seconde loi → structure de corps
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$f \\text{ injectif} \\iff \\ker f = \\{e_G\\}$$
      Ce critère, d'une simplicité trompeuse, résume la puissance de l'approche structurelle de Galois : au lieu de vérifier l'injectivité point par point pour toute paire d'éléments, il suffit d'examiner un seul sous-ensemble particulier, le noyau — une économie de démonstration rendue possible uniquement parce qu'on travaille avec la structure de groupe plutôt qu'avec un ensemble quelconque.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Galois n'était jamais mort en duel à vingt ans et avait eu le temps de développer et publier lui-même sa théorie : de combien de décennies l'algèbre moderne aurait-elle pu progresser plus vite ?</li>
        <li>Pourquoi un morphisme de groupes envoie-t-il automatiquement l'élément neutre sur l'élément neutre, sans qu'on ait besoin de l'imposer comme condition supplémentaire dans la définition ?</li>
        <li>Quelle serait la conséquence, pour la sécurité des transactions bancaires en ligne, d'une résolution efficace du problème du logarithme discret sur lequel repose la cryptographie à courbe elliptique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>É. Galois, lettre-testament à Auguste Chevalier, 29 mai 1832 — le document dans lequel Galois exposa précipitamment ses idées fondatrices la veille de son duel.</li>
        <li>J. A. Gallian, <em>Contemporary Abstract Algebra</em>, Cengage — référence pédagogique moderne sur les groupes, anneaux et corps.</li>
        <li>N. Koblitz, « Elliptic Curve Cryptosystems », Mathematics of Computation, 1987 — l'un des articles fondateurs de la cryptographie à courbe elliptique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais démontrer qu'un ensemble muni d'une loi forme un groupe, et distinguer les structures d'anneau et de corps. Le chapitre suivant, « Espaces vectoriels », appliquera ce même esprit d'abstraction structurelle à un cadre encore plus riche, où les éléments eux-mêmes (les vecteurs) peuvent être additionnés et multipliés par un scalaire. Comme le montre le destin tragique de Galois : une idée mathématique née dans l'urgence d'une nuit peut, des décennies plus tard, devenir le fondement silencieux de la sécurité numérique de milliards de personnes.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un magma devient un groupe s'il est associatif, a un neutre, et si chaque élément a un symétrique</li>
        <li>Un sous-groupe doit contenir le neutre et être stable par la loi et par le passage au symétrique</li>
        <li>ker f et Im f sont toujours des sous-groupes ; ker f = {e} caractérise l'injectivité</li>
        <li>Un corps est un anneau où tout élément non nul est inversible pour la seconde loi</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de vérifier que le neutre appartient à H avant de conclure que H est un sous-groupe</li>
        <li>Croire que $(A,\\bullet)$ est automatiquement un groupe dans un anneau — ce n'est pas exigé (ex. $(\\mathbb{Z},\\times)$)</li>
        <li>Confondre $f(x^{-1})=f(x)^{-1}$ (vrai pour un morphisme) avec une propriété générale de n'importe quelle application</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour qu'une partie H non vide d'un groupe (G,⋆) soit un sous-groupe, il faut notamment que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg2e1" value="wrong"> H soit fini</label>
          <label class="option"><input type="radio" name="alg2e1" value="right"> H contienne l'élément neutre de G</label>
          <label class="option"><input type="radio" name="alg2e1" value="wrong"> H soit commutatif</label>
          <label class="option"><input type="radio" name="alg2e1" value="wrong"> H = G</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg2e1','alg2fb1','Correct — c\\'est une condition nécessaire : sans le neutre, H ne peut pas être un groupe pour la loi induite.','Repense à la caractérisation du sous-groupe : stabilité, neutre, symétrique.')">Vérifier</button>
        <div class="feedback" id="alg2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Soit f : (G,•) → (F,⋆) un morphisme de groupes. f est injectif si et seulement si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg2e2" value="wrong"> Im f = F</label>
          <label class="option"><input type="radio" name="alg2e2" value="right"> ker f = {eG}</label>
          <label class="option"><input type="radio" name="alg2e2" value="wrong"> G = F</label>
          <label class="option"><input type="radio" name="alg2e2" value="wrong"> f(eG) = eG</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg2e2','alg2fb2','Correct — c\\'est le critère d\\'injectivité pour un morphisme de groupes.','Im f = F caractérise la surjectivité, pas l\\'injectivité.')">Vérifier</button>
        <div class="feedback" id="alg2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un corps est un anneau dans lequel :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg2e3" value="wrong"> tout élément est nul</label>
          <label class="option"><input type="radio" name="alg2e3" value="right"> tout élément non nul est inversible pour la seconde loi</label>
          <label class="option"><input type="radio" name="alg2e3" value="wrong"> la première loi n'est pas commutative</label>
          <label class="option"><input type="radio" name="alg2e3" value="wrong"> il n'y a pas d'élément neutre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg2e3','alg2fb3','Correct — c\\'est exactement la définition qui distingue un corps d\\'un anneau quelconque, comme (Z,+,×) qui n\\'est pas un corps.','(Z,+,×) est un anneau mais pas un corps : pourquoi ? Parce que 2 n\\'a pas d\\'inverse entier pour ×.')">Vérifier</button>
        <div class="feedback" id="alg2fb3"></div>
      </div>
    </div>
  `
};

ALGEBRE_NOVA_KB[algKey('Structures algébriques : Groupe-Anneau-Corps')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Structures algébriques ». Demande-moi ce qu'est un groupe, un sous-groupe, un morphisme, ou un indice sur un exercice.",
  rules: [
    { test:/loi de composition/i, replies:["Une loi de composition interne sur E est une application de E×E dans E : le résultat de x⋆y reste toujours dans E. Le couple (E,⋆) s'appelle un magma."] },
    { test:/associativ/i, replies:["Une loi ⋆ est associative si a⋆(b⋆c) = (a⋆b)⋆c pour tous a,b,c. Ça permet d'écrire a⋆b⋆c sans ambiguïté sur l'ordre des calculs."] },
    { test:/[ée]l[ée]ment neutre|neutre\b/i, replies:["L'élément neutre e vérifie a⋆e = e⋆a = a pour tout a. Quand il existe, il est unique."] },
    { test:/sym[ée]trique/i, replies:["Le symétrique a' d'un élément a vérifie a⋆a' = a'⋆a = e (le neutre). Pour (R,+) le symétrique de a est −a ; pour (R*,×) c'est 1/a."] },
    { test:/groupe ab[ée]lien|commutatif/i, replies:["Un groupe est abélien (ou commutatif) quand en plus des axiomes de groupe, x⋆y = y⋆x pour tous x,y."] },
    { test:/sous-groupe/i, replies:["H est un sous-groupe de G si H est stable pour la loi, contient le neutre de G, et le symétrique de tout élément de H reste dans H."] },
    { test:/morphisme/i, replies:["Un morphisme de groupes f : G → F vérifie f(x•y) = f(x)⋆f(y). On a toujours f(eG)=eF et f(x⁻¹)=f(x)⁻¹."] },
    { test:/noyau|ker/i, replies:["Le noyau ker f = {x ∈ G, f(x) = eF} est toujours un sous-groupe de G. f est injectif si et seulement si ker f = {eG}."] },
    { test:/\bimage\b|=m\s*f/i, replies:["L'image Im f = {f(x), x ∈ G} est un sous-groupe de F. f est surjectif si et seulement si Im f = F."] },
    { test:/anneau/i, replies:["Un anneau (A,+,•) demande que (A,+) soit un groupe abélien, que • soit associative avec un neutre, et que • soit distributive par rapport à +."] },
    { test:/corps\b/i, replies:["Un corps est un anneau où (K*,•) est aussi un groupe : autrement dit, tout élément non nul est inversible pour la seconde loi. (Q,+,×), (R,+,×) et (C,+,×) sont des corps."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quelle est la condition nécessaire la plus basique pour un sous-groupe ?","Indice niveau 2 : sans un certain élément, H ne peut même pas contenir e⋆e⁻¹.","Indice niveau 3 : H doit contenir le neutre de G."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quel critère concerne spécifiquement l'injectivité (pas la surjectivité) ?","Indice niveau 2 : ça porte sur le noyau, pas sur l'image.","Indice niveau 3 : ker f = {eG}."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare avec (Z,+,×), qui est un anneau mais pas un corps.","Indice niveau 2 : que manque-t-il à 2 dans (Z,×) ?","Indice niveau 3 : un inverse — un corps exige que tout élément non nul soit inversible."] }
  ]
};

/* =========================== CHAPITRE 3 — Espaces vectoriels =========================== */
ALGEBRE_CHAPTERS[algKey('Espaces vectoriels')] = {
  objectives: [
    "Vérifier qu'un ensemble muni de deux lois forme un espace vectoriel",
    "Déterminer si une famille de vecteurs est libre, génératrice, ou constitue une base",
    "Calculer la dimension d'un espace vectoriel et le rang d'une famille de vecteurs",
    "Manipuler un sous-espace vectoriel, en particulier un sous-espace engendré",
    "Évaluer en quoi l'axiomatisation de Peano en 1888, en unifiant des objets aussi différents que des vecteurs géométriques, des matrices ou des polynômes sous un même cadre abstrait, a permis de démontrer une seule fois des résultats valables pour tous les espaces vectoriels"
  ],
  prereqs: ["Structures algébriques : Groupe-Anneau-Corps"],
  bodyHtml: `
    <p>L'idée de vecteur remonte à Hermann Grassmann qui, en 1844, publia un traité visionnaire (l'<em>Ausdehnungslehre</em>, « théorie de l'extension ») posant les bases d'un calcul vectoriel abstrait en dimension quelconque — un ouvrage si en avance sur son temps, rédigé dans un style philosophique difficile d'accès, qu'il fut presque totalement ignoré par ses contemporains. Il fallut attendre 1888, et la définition axiomatique rigoureuse donnée par le mathématicien italien Giuseppe Peano, pour que la notion d'espace vectoriel prenne la forme précise que tu vas étudier dans ce chapitre — les mêmes axiomes, presque mot pour mot, encore utilisés aujourd'hui.</p>
    <p>La force de cette abstraction est qu'elle unifie sous un même cadre des objets a priori très différents : un vecteur du plan, une matrice, un polynôme, ou même une fonction peuvent tous être vus comme des « vecteurs » d'un espace vectoriel, pourvu qu'on puisse les additionner entre eux et les multiplier par un nombre en respectant les mêmes règles. Cette unification n'est pas qu'esthétique : elle permet de démontrer un résultat une seule fois, pour n'importe quel espace vectoriel, plutôt que de le redémontrer séparément pour chaque type d'objet concret.</p>
    <p>L'idée d'un espace vectoriel est de généraliser ce qu'on sait déjà faire avec des vecteurs du plan ou de l'espace (les additionner, les multiplier par un nombre) à des objets beaucoup plus variés : des n-uplets, des matrices, des fonctions... À la fin de ce chapitre, tu sauras déterminer si une famille de vecteurs est libre, génératrice, ou constitue une base, et calculer la dimension d'un espace vectoriel.</p>

    <h3>1. Définition et exemples</h3>
    <p>Un <strong>$\\mathbb{K}$-espace vectoriel</strong> $(E,+,\\bullet)$ est un ensemble $E$ où $(E,+)$ est un groupe abélien, muni d'une multiplication externe $\\mathbb{K}\\times E\\to E$ compatible : $\\alpha(u+v)=\\alpha u+\\alpha v$, $(\\alpha+\\beta)u=\\alpha u+\\beta u$, $(\\alpha\\beta)u=\\alpha(\\beta u)$, $1\\cdot u=u$.</p>
    <p>Exemples classiques : $\\mathbb{R}^n$ (n-uplets de réels), $\\mathcal{M}_{np}(\\mathbb{R})$ (matrices), $\\mathbb{C}^n$ (comme $\\mathbb{C}$-espace vectoriel, ou comme $\\mathbb{R}$-espace vectoriel).</p>

    <h3>2. Combinaison linéaire et famille génératrice</h3>
    <p>$u$ est une <strong>combinaison linéaire</strong> de $u_1,\\dots,u_p$ s'il existe des scalaires $\\lambda_1,\\dots,\\lambda_p$ tels que $u=\\lambda_1u_1+\\dots+\\lambda_pu_p$. Une famille $\\{u_1,\\dots,u_p\\}$ est <strong>génératrice</strong> de $E$ si tout vecteur de $E$ s'écrit ainsi.</p>

    <h3>3. Famille libre, famille liée</h3>
    <p>Une famille est <strong>libre</strong> si la seule combinaison linéaire nulle est celle où tous les coefficients sont nuls : $\\lambda_1u_1+\\dots+\\lambda_qu_q=0_E \\Rightarrow \\lambda_1=\\dots=\\lambda_q=0$. Sinon elle est <strong>liée</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une famille est liée si et seulement si l'un de ses vecteurs est combinaison linéaire des autres — c'est souvent la façon la plus rapide de repérer qu'une famille n'est pas libre.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une famille contenant le vecteur nul est toujours liée, sans exception : $1\\cdot 0_E = 0_E$ fournit immédiatement une combinaison linéaire nulle avec un coefficient non nul. En quoi ce fait, presque trivial une fois énoncé, illustre-t-il l'importance de bien vérifier la définition formelle d'une propriété plutôt que de se fier à une intuition rapide ?
    </div>

    <h3>4. Base et dimension</h3>
    <p>Une <strong>base</strong> est une famille à la fois libre et génératrice. Dans une base $(e_1,\\dots,e_n)$, tout vecteur s'écrit de façon <strong>unique</strong> comme combinaison linéaire des $e_i$. Toutes les bases d'un même espace ont le même nombre de vecteurs : c'est la <strong>dimension</strong> de $E$, notée $\\dim E$.</p>
    <p>Pour une famille de $n$ vecteurs en dimension $n$, exprimée dans une base : la famille est libre $\\iff$ le déterminant de la famille est non nul. Conséquences pratiques :</p>
    <table class="mini-table">
      <tr><th>Propriété (dim E = n)</th><th>Conséquence</th></tr>
      <tr><td>Famille libre</td><td>au plus $n$ vecteurs</td></tr>
      <tr><td>Famille génératrice</td><td>au moins $n$ vecteurs</td></tr>
      <tr><td>Famille libre de $n$ vecteurs</td><td>c'est automatiquement une base</td></tr>
      <tr><td>Famille génératrice de $n$ vecteurs</td><td>c'est automatiquement une base</td></tr>
    </table>

    <h3>5. Sous-espaces vectoriels</h3>
    <p>$F\\subset E$ non vide est un <strong>sous-espace vectoriel</strong> si $F$ est stable par $+$ et par multiplication scalaire (de façon équivalente : $\\forall(u,v)\\in F^2,\\forall\\lambda\\in\\mathbb{K},\\ \\lambda u+v\\in F$). Le <strong>sous-espace engendré</strong> par une partie $A$, noté $\\text{vect}(A)$, est l'ensemble de toutes les combinaisons linéaires des vecteurs de $A$ — c'est le plus petit sous-espace contenant $A$.</p>
    <p>Deux sous-espaces $E_1,E_2$ sont <strong>supplémentaires</strong> ($E=E_1\\oplus E_2$) si $E_1+E_2=E$ et $E_1\\cap E_2=\\{0_E\\}$, ce qui équivaut à $\\dim E_1+\\dim E_2=\\dim E$ avec $E_1\\cap E_2=\\{0_E\\}$. Le <strong>rang</strong> d'une famille est la dimension du sous-espace qu'elle engendre : $\\text{rang}(A)=\\dim(\\text{vect}\\,A)$.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <ellipse cx="65" cy="45" rx="55" ry="38" fill="#4C7CFF" opacity="0.12" stroke="#4C7CFF" stroke-width="1.2"/>
          <ellipse cx="45" cy="45" rx="26" ry="22" fill="#2DD4C4" opacity="0.3" stroke="#2DD4C4" stroke-width="1.2"/>
          <ellipse cx="80" cy="45" rx="26" ry="22" fill="#F0B94D" opacity="0.3" stroke="#F0B94D" stroke-width="1.2"/>
          <text x="20" y="30" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">E1</text>
          <text x="95" y="30" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">E2</text>
          <text x="10" y="90" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">E</text>
        </svg>
        <span>E₁ et E₂ supplémentaires dans E : leur intersection se réduit à {0<sub>E</sub>}</span>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Deux sous-espaces supplémentaires vérifient à la fois E₁+E₂=E et E₁∩E₂={0_E} — deux conditions qui, ensemble, garantissent qu'un vecteur se décompose de façon unique en une partie dans E₁ et une partie dans E₂. Pourquoi la seule condition E₁+E₂=E, sans l'intersection réduite à {0_E}, ne suffirait-elle pas à garantir cette unicité de décomposition ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Les espaces vectoriels que tu étudies ici en dimension finie (le plan, l'espace, ℝⁿ) se généralisent en physique à des espaces de dimension <strong>infinie</strong> : en mécanique quantique, l'état d'une particule est décrit par un vecteur dans un espace de Hilbert, un espace vectoriel de fonctions dont la dimension est infinie. Les mêmes concepts que tu manipules ici — base, combinaison linéaire, dimension — restent parfaitement valables dans ce cadre bien plus abstrait, avec une conséquence physique profonde : le principe de superposition quantique, selon lequel une particule peut se trouver dans une combinaison linéaire de plusieurs états à la fois, n'est rien d'autre qu'une combinaison linéaire de vecteurs, exactement comme celles que tu calcules dans ce chapitre.</p>
    <p><strong>Question ouverte :</strong> comment les mathématiciens et physiciens ont-ils étendu la notion de « base » et de « dimension » à des espaces vectoriels de dimension infinie, où l'on ne peut plus simplement compter le nombre de vecteurs d'une base ?</p>
    <p><strong>Concept avancé :</strong> les <strong>espaces de Hilbert</strong>, formalisés au début du XXe siècle par David Hilbert et John von Neumann, sont aujourd'hui le cadre mathématique standard de la mécanique quantique, et trouvent aussi des applications directes en traitement du signal, où un signal complexe se décompose dans une base de fonctions (comme la base de Fourier).</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Ensemble E muni de deux lois (+ et •) → vérifier les axiomes d'espace vectoriel → combinaisons linéaires de vecteurs → famille libre (aucune relation non triviale) et/ou génératrice (engendre tout E) → base = libre ET génératrice → dimension = nombre de vecteurs dans une base
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\lambda_1u_1+\\dots+\\lambda_qu_q=0_E \\Rightarrow \\lambda_1=\\dots=\\lambda_q=0$$
      Cette implication, qui définit une famille libre, est le critère central de tout ce chapitre : elle garantit qu'aucun vecteur de la famille n'est « redondant », c'est-à-dire exprimable à partir des autres — la condition exacte qui permet à une famille génératrice de devenir une base, offrant à chaque vecteur de l'espace une unique décomposition.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Grassmann avait rédigé son traité de 1844 dans un style plus accessible à ses contemporains : la notion d'espace vectoriel aurait-elle pu être formalisée plusieurs décennies avant Peano ?</li>
        <li>Pourquoi une famille génératrice de E peut-elle contenir strictement plus de vecteurs que la dimension de E, alors qu'une famille libre ne le peut jamais ?</li>
        <li>Quelle serait la conséquence, pour la mécanique quantique moderne, d'une impossibilité d'étendre la notion d'espace vectoriel à la dimension infinie ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. Grassmann, <em>Die lineale Ausdehnungslehre</em>, 1844 — le traité visionnaire, largement ignoré en son temps, préfigurant l'algèbre linéaire moderne.</li>
        <li>G. Peano, <em>Calcolo geometrico secondo l'Ausdehnungslehre di H. Grassmann</em>, 1888 — la première définition axiomatique rigoureuse d'un espace vectoriel.</li>
        <li>J. A. Gallian, <em>Contemporary Abstract Algebra</em>, Cengage — référence pédagogique moderne sur les espaces vectoriels.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais déterminer si une famille de vecteurs est libre, génératrice, ou constitue une base, et calculer la dimension d'un espace vectoriel. Le chapitre suivant, « Applications linéaires », étudiera les fonctions qui respectent cette structure d'espace vectoriel — le pont naturel entre les matrices du premier chapitre et les espaces vectoriels de celui-ci. Comme le montre le destin du traité de Grassmann, ignoré puis redécouvert : une idée mathématique en avance sur son temps finit souvent par trouver, des décennies plus tard, l'application qui révèle toute sa portée — ici, jusqu'aux fondements de la mécanique quantique.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Génératrice = tout vecteur s'exprime avec la famille ; libre = la seule combinaison nulle a tous ses coefficients nuls</li>
        <li>Une base est libre ET génératrice ; toutes les bases d'un même espace ont le même nombre de vecteurs (la dimension)</li>
        <li>En dimension n, une famille libre de n vecteurs (ou génératrice de n vecteurs) est automatiquement une base</li>
        <li>Le rang d'une famille est la dimension du sous-espace qu'elle engendre</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre « libre » et « génératrice » — les deux notions sont indépendantes, une base a besoin des deux</li>
        <li>Croire qu'une famille contenant le vecteur nul peut être libre — elle est toujours liée dès que $0_E$ en fait partie</li>
        <li>Oublier qu'une famille génératrice peut avoir plus de vecteurs que la dimension (mais jamais moins)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — combinaison linéaire dans ℝ²</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">u₁=(1,1) et u₂=(1,−1) forment une base de ℝ². Fais varier λ₁ et λ₂ pour construire u = λ₁u₁ + λ₂u₂ et observe que tout point du plan est atteignable.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 200 200" width="220" height="220">
          <line x1="10" y1="100" x2="190" y2="100" stroke="#3A4658" stroke-width="1"/>
          <line x1="100" y1="10" x2="100" y2="190" stroke="#3A4658" stroke-width="1"/>
          <line id="algSpanU1" x1="100" y1="100" x2="118" y2="82" stroke="#4C7CFF" stroke-width="2" marker-end="url(#algArrSp1)"/>
          <line id="algSpanU2" x1="118" y1="82" x2="118" y2="82" stroke="#2DD4C4" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#algArrSp2)"/>
          <line id="algSpanU" x1="100" y1="100" x2="118" y2="82" stroke="#F0B94D" stroke-width="2.4" marker-end="url(#algArrSp3)"/>
          <defs>
            <marker id="algArrSp1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker>
            <marker id="algArrSp2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
            <marker id="algArrSp3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L6,3L0,6Z" fill="#F0B94D"/></marker>
          </defs>
        </svg>
        <div class="sim-controls">
          <label>λ₁ : <span id="algL1Val">1</span></label><input type="range" id="algL1" min="-3" max="3" step="0.5" value="1" oninput="updateAlgSpanSim()">
          <label>λ₂ : <span id="algL2Val">1</span></label><input type="range" id="algL2" min="-3" max="3" step="0.5" value="1" oninput="updateAlgSpanSim()">
          <div class="sim-readout" id="algSpanReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans ℝ², la famille {(1,1),(2,2)} est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg3e1" value="wrong"> libre et génératrice</label>
          <label class="option"><input type="radio" name="alg3e1" value="right"> liée</label>
          <label class="option"><input type="radio" name="alg3e1" value="wrong"> une base de ℝ²</label>
          <label class="option"><input type="radio" name="alg3e1" value="wrong"> génératrice mais pas libre... impossible ici</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg3e1','alg3fb1','Correct — (2,2) = 2×(1,1) : le second vecteur est un multiple du premier, la famille est liée (déterminant nul).','Regarde si un vecteur est un multiple de l\\'autre : (2,2) = 2×(1,1).')">Vérifier</button>
        <div class="feedback" id="alg3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si dim E = 3, une famille libre de 4 vecteurs de E...</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg3e2" value="wrong"> est possible et forme une base</label>
          <label class="option"><input type="radio" name="alg3e2" value="right"> est impossible</label>
          <label class="option"><input type="radio" name="alg3e2" value="wrong"> est toujours génératrice</label>
          <label class="option"><input type="radio" name="alg3e2" value="wrong"> dépend des vecteurs choisis</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg3e2','alg3fb2','Correct — une famille libre possède au plus dim E = 3 vecteurs ; au-delà, elle est nécessairement liée.','Rappelle-toi : une famille libre a au plus n vecteurs si dim E = n.')">Vérifier</button>
        <div class="feedback" id="alg3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le rang d'une famille de vecteurs est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg3e3" value="wrong"> le nombre de vecteurs de la famille</label>
          <label class="option"><input type="radio" name="alg3e3" value="right"> la dimension du sous-espace qu'elle engendre</label>
          <label class="option"><input type="radio" name="alg3e3" value="wrong"> toujours égal à dim E</label>
          <label class="option"><input type="radio" name="alg3e3" value="wrong"> le plus grand coefficient de la famille</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg3e3','alg3fb3','Correct — rang(A) = dim(vect A), qui peut être strictement inférieur au nombre de vecteurs si la famille est liée.','Le rang n\\'est pas le nombre de vecteurs : une famille liée de 5 vecteurs peut n\\'engendrer qu\\'un plan (rang 2).')">Vérifier</button>
        <div class="feedback" id="alg3fb3"></div>
      </div>
    </div>
  `,
  init: initAlgSpanSim
};

ALGEBRE_NOVA_KB[algKey('Espaces vectoriels')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Espaces vectoriels ». Demande-moi la différence entre libre et génératrice, ce qu'est une base, ou un indice sur un exercice.",
  rules: [
    { test:/combinaison lin[ée]aire/i, replies:["u est combinaison linéaire de u1,...,up s'il existe des scalaires λ1,...,λp tels que u = λ1u1 + ... + λpup."] },
    { test:/g[ée]n[ée]ratrice/i, replies:["Une famille est génératrice de E si TOUT vecteur de E peut s'écrire comme combinaison linéaire des vecteurs de la famille."] },
    { test:/libre|li[ée]e/i, replies:["Une famille est libre si la seule combinaison linéaire nulle a tous ses coefficients nuls. Sinon elle est liée — et alors un de ses vecteurs est combinaison linéaire des autres."] },
    { test:/\bbase\b/i, replies:["Une base est une famille à la fois libre ET génératrice. Dans une base, tout vecteur s'écrit de façon unique — c'est ce qui donne ses « coordonnées »."] },
    { test:/dimension/i, replies:["La dimension d'un espace vectoriel est le nombre de vecteurs dans n'importe quelle base — ce nombre est le même pour toutes les bases d'un espace donné."] },
    { test:/sous-espace/i, replies:["F est un sous-espace vectoriel de E si F est stable par + et par multiplication scalaire : ∀(u,v)∈F², ∀λ∈K, λu+v ∈ F."] },
    { test:/vect|engendr/i, replies:["vect(A) est l'ensemble de TOUTES les combinaisons linéaires des vecteurs de A — le plus petit sous-espace vectoriel qui contient A."] },
    { test:/rang/i, replies:["Le rang d'une famille de vecteurs est la dimension du sous-espace qu'elle engendre : rang(A) = dim(vect A)."] },
    { test:/suppl[ée]mentaire/i, replies:["E1 et E2 sont supplémentaires dans E si E1+E2=E et E1∩E2={0E}, ce qui équivaut à dim E1 + dim E2 = dim E avec une intersection réduite à {0E}."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : un des deux vecteurs est-il un multiple de l'autre ?","Indice niveau 2 : regarde (2,2) par rapport à (1,1).","Indice niveau 3 : (2,2) = 2×(1,1), donc la famille est liée."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : combien de vecteurs une famille libre peut-elle avoir au maximum, si dim E = 3 ?","Indice niveau 2 : jamais plus que la dimension.","Indice niveau 3 : 4 > 3, c'est donc impossible."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le rang, ce n'est pas un simple comptage de vecteurs.","Indice niveau 2 : pense à vect(A).","Indice niveau 3 : rang(A) = dim(vect A)."] }
  ]
};

/* =========================== CHAPITRE 4 — Applications linéaires =========================== */
ALGEBRE_CHAPTERS[algKey('Applications linéaires')] = {
  objectives: [
    "Reconnaître si une application entre deux espaces vectoriels est linéaire",
    "Associer une matrice à une application linéaire relativement à des bases données",
    "Déterminer le noyau et l'image d'une application linéaire et appliquer le théorème du rang",
    "Utiliser une matrice de passage lors d'un changement de bases",
    "Évaluer en quoi le théorème du rang, reliant dimension du noyau et dimension de l'image, permet de quantifier la perte d'information causée par une transformation linéaire — un principe directement exploité dans les techniques modernes de réduction de dimension en science des données"
  ],
  prereqs: ["Espaces vectoriels"],
  bodyHtml: `
    <p>C'est le mathématicien britannique James Joseph Sylvester qui, en 1850, forgea le terme même de « matrice » — empruntant le mot latin pour « matrice » au sens biologique (l'organe qui donne naissance), car il concevait la matrice comme la source à partir de laquelle on pouvait extraire différents déterminants. Sylvester et son collaborateur Arthur Cayley développèrent ensemble, dans les décennies suivantes, l'essentiel du vocabulaire et des outils que tu utilises dans ce chapitre — noyau, image, rang — pour décrire précisément comment une application linéaire transforme un espace vectoriel en un autre.</p>
    <p>Le théorème du rang, que tu vas démontrer et utiliser dans ce chapitre, a une portée qui dépasse largement le cadre scolaire : en science des données, la réduction de dimension (comme l'analyse en composantes principales, très utilisée pour compresser des images ou résumer de grands jeux de données) repose entièrement sur l'étude du rang d'une transformation linéaire — comprendre combien de « dimensions utiles » contient réellement un ensemble de données, en éliminant les redondances, est exactement ce que mesure le rang d'une application linéaire.</p>
    <p>Une application linéaire est une fonction entre deux espaces vectoriels qui « respecte » les deux opérations : l'addition et la multiplication par un scalaire. C'est le type de fonction le plus important en algèbre linéaire, car toute son action peut se résumer dans une seule matrice. À la fin de ce chapitre, tu sauras associer une matrice à une application linéaire, déterminer son noyau et son image, et effectuer un changement de bases.</p>

    <h3>1. Définition</h3>
    <p>$f:E\\to F$ est <strong>linéaire</strong> si $f(u+v)=f(u)+f(v)$ et $f(\\lambda u)=\\lambda f(u)$ pour tous $u,v\\in E,\\lambda\\in\\mathbb{K}$. Si $E=F$, on parle d'<strong>endomorphisme</strong>. Conséquence immédiate : $f(0_E)=0_F$.</p>

    <h3>2. Matrice d'une application linéaire</h3>
    <p>Soient $B=(e_1,\\dots,e_p)$ une base de $E$ et $U=(u_1,\\dots,u_n)$ une base de $F$. La matrice $\\text{mat}_{BU}f$ a pour colonnes les images $f(e_1),\\dots,f(e_p)$ exprimées dans la base $U$. Une fois cette matrice connue, calculer l'image de n'importe quel vecteur $w$ revient à un simple produit matriciel :</p>
    <div class="formula-box">$$f(w) = (\\text{mat}_{BU}f)\\,w \\qquad \\text{et} \\qquad \\text{mat}_{BV}(g\\circ f) = (\\text{mat}_{UV}g)(\\text{mat}_{BU}f)$$</div>

    <h3>3. Noyau, image et théorème du rang</h3>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th></tr>
      <tr><td>Noyau $\\ker f$</td><td>$\\{u\\in E,\\ f(u)=0_F\\}$ — sous-espace vectoriel de $E$</td></tr>
      <tr><td>Image $\\text{Im}\\,f$</td><td>$\\{f(u),\\ u\\in E\\}$ — sous-espace vectoriel de $F$</td></tr>
      <tr><td>Rang de $f$</td><td>$\\text{rang}(f)=\\dim(\\text{Im}\\,f)$</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 110" width="100%">
          <ellipse cx="55" cy="55" rx="45" ry="42" fill="#4C7CFF" opacity="0.15" stroke="#4C7CFF" stroke-width="1.4"/>
          <ellipse cx="150" cy="55" rx="42" ry="42" fill="#2DD4C4" opacity="0.15" stroke="#2DD4C4" stroke-width="1.4"/>
          <ellipse cx="42" cy="55" rx="16" ry="24" fill="#FF6B6F" opacity="0.35" stroke="#FF6B6F" stroke-width="1.2"/>
          <text x="26" y="92" font-family="IBM Plex Mono" font-size="9" fill="#FF6B6F">ker f</text>
          <ellipse cx="145" cy="55" rx="22" ry="30" fill="#F0B94D" opacity="0.3" stroke="#F0B94D" stroke-width="1.2"/>
          <text x="128" y="92" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">Im f</text>
          <text x="8" y="16" font-family="IBM Plex Mono" font-size="10" fill="#4C7CFF">E</text>
          <text x="185" y="16" font-family="IBM Plex Mono" font-size="10" fill="#2DD4C4">F</text>
          <text x="90" y="30" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">f</text>
        </svg>
        <span>Le noyau vit dans l'espace de départ E, l'image dans l'espace d'arrivée F</span>
      </div>
    </div>
    <div class="key-point">
      <span class="eyebrow">Théorème du rang</span>
      Pour $E$ et $F$ de dimension finie : $\\dim E = \\dim(\\ker f) + \\dim(\\text{Im}\\,f)$. C'est l'outil le plus utile pour calculer une dimension d'image sans la déterminer explicitement.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le théorème du rang affirme que dim E = dim(ker f) + dim(Im f) : plus le noyau est « grand », plus l'image est nécessairement « petite ». En quoi cette relation traduit-elle intuitivement une idée de conservation — la dimension totale de l'espace de départ se répartit entièrement entre ce que f « écrase » (le noyau) et ce que f « préserve » (l'image) ?
    </div>

    <h3>4. Isomorphisme</h3>
    <p>Un <strong>isomorphisme</strong> est une application linéaire bijective. Critères équivalents (si $\\dim E=\\dim F$) : $\\ker f=\\{0_E\\}$ et $\\text{Im}\\,f=F$ ; ou encore $\\det(\\text{mat}_{BU}f)\\neq0$. Si $f$ est un isomorphisme, $f^{-1}$ l'est aussi, et $\\text{mat}_{UB}f^{-1}=(\\text{mat}_{BU}f)^{-1}$.</p>

    <h3>5. Changement de bases</h3>
    <p>La <strong>matrice de passage</strong> $P_{BB'}$ d'une base $B$ à une base $B'$ a pour colonnes les vecteurs de $B'$ exprimés dans $B$. On a $P_{B'B}=(P_{BB'})^{-1}$. Si $X,X'$ représentent un même vecteur dans $B,B'$ : $X=P_{BB'}X'$. Pour un endomorphisme $f$, les matrices dans les deux bases sont <strong>semblables</strong> :</p>
    <div class="formula-box">$$\\text{mat}_{B'}f = (P_{BB'})^{-1}(\\text{mat}_{B}f)(P_{BB'})$$</div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La formule de changement de base d'un endomorphisme, $\\text{mat}_{B'}f = P^{-1}(\\text{mat}_{B}f)P$, montre que la même transformation linéaire peut avoir des matrices très différentes selon la base choisie. Pourquoi cela suggère-t-il qu'il existe, pour un endomorphisme donné, une base particulièrement bien adaptée où sa matrice prendrait une forme la plus simple possible ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le concept de rang que tu manipules dans ce chapitre est au cœur de la <strong>compression de données</strong> moderne : une image numérique, représentée comme une grande matrice de pixels, peut souvent être approximée avec une excellente qualité visuelle par une matrice de rang bien plus faible — c'est-à-dire par une combinaison d'un petit nombre de « directions » essentielles plutôt que par l'intégralité de l'information brute. Cette technique, appelée <strong>approximation de rang faible</strong>, s'appuie sur la décomposition en valeurs singulières (SVD), une généralisation directe des concepts de noyau et d'image que tu étudies ici, et constitue l'un des outils fondamentaux de la compression d'image et de la réduction de dimension en apprentissage automatique.</p>
    <p><strong>Question ouverte :</strong> jusqu'à quel point peut-on réduire le rang d'une transformation linéaire (et donc la quantité d'information conservée) avant que la perte devienne perceptible ou dommageable pour l'usage visé — que ce soit pour une image, un jeu de données scientifique, ou un modèle d'intelligence artificielle ?</p>
    <p><strong>Technologie émergente :</strong> l'<strong>analyse en composantes principales</strong> (ACP ou PCA), très utilisée en science des données, identifie automatiquement les directions de plus grande variance dans un jeu de données à l'aide d'une transformation linéaire de rang réduit, permettant de résumer des données à des centaines de dimensions en seulement quelques dimensions essentielles, sans perte majeure d'information.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Application linéaire f: E→F → matrice associée relativement à des bases (colonnes = images des vecteurs de base) → noyau ker f (ce que f écrase) et image Im f (ce que f atteint) → théorème du rang : dim E = dim(ker f)+dim(Im f) → changement de base éventuel via une matrice de passage P
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\dim E = \\dim(\\ker f) + \\dim(\\text{Im}\\,f)$$
      Le théorème du rang condense en une seule égalité la façon dont une application linéaire répartit la dimension de son espace de départ entre ce qu'elle « perd » (le noyau) et ce qu'elle « conserve » (l'image) — un principe de conservation qui, appliqué à des matrices de très grande taille, est directement exploité par les techniques modernes de compression et de réduction de dimension.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Sylvester n'avait jamais introduit le terme « matrice » : le vocabulaire de l'algèbre linéaire moderne se serait-il développé de façon très différente, ou un autre terme équivalent se serait-il rapidement imposé ?</li>
        <li>Pourquoi une application linéaire injective entre deux espaces de même dimension finie est-elle automatiquement surjective, et donc un isomorphisme ?</li>
        <li>Quelle serait la conséquence, pour la compression d'image moderne, d'une impossibilité d'approximer une matrice de grande taille par une matrice de rang beaucoup plus faible ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. J. Sylvester, introduction du terme « matrice », 1850 — l'un des textes fondateurs du vocabulaire de l'algèbre linéaire moderne.</li>
        <li>G. Strang, <em>Linear Algebra and Its Applications</em>, Cengage — référence internationale sur les applications linéaires et le théorème du rang.</li>
        <li>I. T. Jolliffe, <em>Principal Component Analysis</em>, Springer — sur l'application du rang et de la réduction de dimension en science des données.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais associer une matrice à une application linéaire, déterminer son noyau et son image, et effectuer un changement de bases. Le dernier chapitre de cette matière, « Réduction d'endomorphismes et de matrices », te fera chercher précisément cette base « bien adaptée » évoquée plus haut, où la matrice d'un endomorphisme prend sa forme la plus simple possible. Comme le montre l'usage du rang en compression d'image moderne : un concept introduit pour classer abstraitement des transformations linéaires peut, un siècle et demi plus tard, tenir dans la poche de chacun sous la forme d'une photo compressée sur un téléphone.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>f linéaire ⟺ f(u+v)=f(u)+f(v) et f(λu)=λf(u) ; toujours f(0E)=0F</li>
        <li>Une fois la matrice de f connue, f(w) se calcule par un simple produit matriciel</li>
        <li>Théorème du rang : dim E = dim(ker f) + dim(Im f)</li>
        <li>f est un isomorphisme ⟺ ker f = {0E} et Im f = F ⟺ det(mat f) ≠ 0 (si dim E = dim F)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Chercher ker f dans l'espace d'arrivée F au lieu de l'espace de départ E</li>
        <li>Oublier une constante ou un terme non linéaire (ex. « +1 » ou « y² ») qui rend une application NON linéaire</li>
        <li>Inverser P_{BB'} et P_{B'B} dans la formule de changement de base d'un vecteur ou d'un endomorphisme</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — transformation linéaire du plan</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Règle une matrice 2×2 : observe comment le carré unité (pointillé) devient un parallélogramme, et comment le déterminant donne le facteur d'aire.</p>
      <div class="sim-2col">
        <svg viewBox="0 0 180 180" width="200" height="200">
          <line x1="10" y1="90" x2="170" y2="90" stroke="#3A4658" stroke-width="1"/>
          <line x1="90" y1="10" x2="90" y2="170" stroke="#3A4658" stroke-width="1"/>
          <polygon points="90,90 120,90 120,60 90,60" fill="none" stroke="#5A6472" stroke-width="1" stroke-dasharray="3,2"/>
          <polygon id="algTransSquare" points="90,90 120,90 120,60 90,60" fill="#9B82FF" opacity="0.28" stroke="#9B82FF" stroke-width="1.6"/>
          <line id="algTransE1" x1="90" y1="90" x2="120" y2="90" stroke="#4C7CFF" stroke-width="2.2" marker-end="url(#algArrT1)"/>
          <line id="algTransE2" x1="90" y1="90" x2="90" y2="60" stroke="#2DD4C4" stroke-width="2.2" marker-end="url(#algArrT2)"/>
          <defs>
            <marker id="algArrT1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker>
            <marker id="algArrT2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#2DD4C4"/></marker>
          </defs>
        </svg>
        <div class="sim-controls">
          <label>a (image de e₁, x) : <span id="algTaVal">1</span></label><input type="range" id="algTa" min="-2" max="2" step="0.5" value="1" oninput="updateAlgLinTrans()">
          <label>c (image de e₁, y) : <span id="algTcVal">0</span></label><input type="range" id="algTc" min="-2" max="2" step="0.5" value="0" oninput="updateAlgLinTrans()">
          <label>b (image de e₂, x) : <span id="algTbVal">0</span></label><input type="range" id="algTb" min="-2" max="2" step="0.5" value="0" oninput="updateAlgLinTrans()">
          <label>d (image de e₂, y) : <span id="algTdVal">1</span></label><input type="range" id="algTd" min="-2" max="2" step="0.5" value="1" oninput="updateAlgLinTrans()">
          <div class="sim-readout" id="algTransReadout"></div>
        </div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'application $k(x,y) = (-x+y+1,\\ x+y^2)$ est-elle linéaire ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg4e1" value="right"> Non</label>
          <label class="option"><input type="radio" name="alg4e1" value="wrong"> Oui</label>
          <label class="option"><input type="radio" name="alg4e1" value="wrong"> Seulement si x=0</label>
          <label class="option"><input type="radio" name="alg4e1" value="wrong"> Seulement si y=0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg4e1','alg4fb1','Correct — le « +1 » (constante) et le terme y² (non linéaire) empêchent k d\\'être une application linéaire : k(0,0) ≠ (0,0) déjà.','Teste k(0,0) : si ce n\\'est pas (0,0), l\\'application ne peut pas être linéaire.')">Vérifier</button>
        <div class="feedback" id="alg4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si dim E = 5 et dim(ker f) = 2, que vaut dim(Im f) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg4e2" value="wrong"> 5</label>
          <label class="option"><input type="radio" name="alg4e2" value="right"> 3</label>
          <label class="option"><input type="radio" name="alg4e2" value="wrong"> 2</label>
          <label class="option"><input type="radio" name="alg4e2" value="wrong"> 7</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg4e2','alg4fb2','Correct — théorème du rang : dim E = dim(ker f) + dim(Im f), donc 5 = 2 + dim(Im f).','Applique directement le théorème du rang : dim E = dim(ker f) + dim(Im f).')">Vérifier</button>
        <div class="feedback" id="alg4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une application linéaire f entre deux espaces de même dimension finie est un isomorphisme si et seulement si :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg4e3" value="wrong"> ker f = F</label>
          <label class="option"><input type="radio" name="alg4e3" value="right"> det(mat f) ≠ 0</label>
          <label class="option"><input type="radio" name="alg4e3" value="wrong"> Tr(mat f) = 0</label>
          <label class="option"><input type="radio" name="alg4e3" value="wrong"> f(0E) = 0F</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg4e3','alg4fb3','Correct — quand dim E = dim F, det(mat f) ≠ 0 équivaut à ker f = {0E} et Im f = F.','f(0E)=0F est toujours vrai pour une application linéaire, ça ne caractérise donc rien de particulier ici.')">Vérifier</button>
        <div class="feedback" id="alg4fb3"></div>
      </div>
    </div>
  `,
  init: initAlgLinTrans
};

ALGEBRE_NOVA_KB[algKey('Applications linéaires')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Applications linéaires ». Demande-moi ce qu'est le noyau, l'image, le théorème du rang, ou un indice sur un exercice.",
  rules: [
    { test:/application lin[ée]aire/i, replies:["f est linéaire si f(u+v)=f(u)+f(v) et f(λu)=λf(u) pour tous u,v et tout scalaire λ. Astuce rapide : si f(0)≠0, ou s'il y a un terme constant ou non linéaire (carré, produit de variables...), f n'est pas linéaire."] },
    { test:/noyau|ker/i, replies:["ker f = {u∈E, f(u)=0F} vit dans l'espace de DÉPART E. C'est toujours un sous-espace vectoriel, et f est injective ⟺ ker f = {0E}."] },
    { test:/\bimage\b|=m\s*f/i, replies:["Im f = {f(u), u∈E} vit dans l'espace d'ARRIVÉE F. C'est un sous-espace vectoriel de F, et f est surjective ⟺ Im f = F."] },
    { test:/th[ée]or[èe]me.*rang|rang.*th[ée]or[èe]me/i, replies:["Le théorème du rang dit : dim E = dim(ker f) + dim(Im f). Très utile pour trouver une dimension sans calculer explicitement le sous-espace."] },
    { test:/isomorphisme/i, replies:["Un isomorphisme est une application linéaire bijective. Si dim E = dim F, c'est équivalent à det(mat f) ≠ 0."] },
    { test:/matrice de passage|changement de base/i, replies:["La matrice de passage P(B,B') a pour colonnes les vecteurs de la nouvelle base B' exprimés dans l'ancienne base B. On a P(B',B) = P(B,B')⁻¹, et X = P(B,B')·X' relie les coordonnées."] },
    { test:/matrice semblable|semblable/i, replies:["Deux matrices A et B sont semblables s'il existe P inversible telle que B = P⁻¹AP — c'est exactement ce qui relie les matrices d'un même endomorphisme dans deux bases différentes."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : teste k(0,0).","Indice niveau 2 : k(0,0) = (0+0+1, 0+0) = (1,0), pas (0,0).","Indice niveau 3 : donc k n'est pas linéaire — réponse : non."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : applique le théorème du rang.","Indice niveau 2 : dim E = dim ker f + dim Im f, donc 5 = 2 + dim Im f.","Indice niveau 3 : dim Im f = 3."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est le critère par déterminant, valable quand dim E = dim F.","Indice niveau 2 : ce n'est ni la trace ni ker f = F.","Indice niveau 3 : det(mat f) ≠ 0."] }
  ]
};

/* =========================== CHAPITRE 5 — Réduction d'endomorphismes =========================== */
ALGEBRE_CHAPTERS[algKey('Réduction d\'endomorphismes et de matrices')] = {
  objectives: [
    "Déterminer les valeurs propres et vecteurs propres d'une matrice ou d'un endomorphisme",
    "Calculer et utiliser le polynôme caractéristique (et le théorème de Cayley-Hamilton)",
    "Diagonaliser une matrice quand c'est possible, et interpréter le résultat",
    "Reconnaître qu'une matrice non diagonalisable peut être trigonalisable",
    "Évaluer en quoi la diagonalisation d'une matrice, en la ramenant à sa forme la plus simple possible dans la base des vecteurs propres, transforme des calculs a priori complexes (puissances de matrices, systèmes couplés) en calculs élémentaires effectués indépendamment sur chaque dimension"
  ],
  prereqs: ["Applications linéaires"],
  bodyHtml: `
    <p>Le 16 octobre 1843, alors qu'il se promenait le long du canal royal de Dublin avec son épouse, le mathématicien irlandais William Rowan Hamilton fut soudain frappé par une intuition qui le hantait depuis des mois : la formule fondamentale des quaternions, une extension des nombres complexes en quatre dimensions. Pris d'une émotion si vive qu'il craignit de l'oublier, Hamilton grava sur-le-champ cette formule au couteau sur la pierre du pont de Broom Bridge — un geste resté célèbre dans l'histoire des mathématiques. Quinze ans plus tard, en 1858, Arthur Cayley généralisa un résultat lié aux travaux de Hamilton sur les matrices : le théorème qui porte aujourd'hui leurs deux noms, et que tu vas utiliser dans ce chapitre.</p>
    <p>Diagonaliser une matrice n'est pas un exercice de style : c'est ce qui permet, dans d'innombrables applications, de transformer un problème compliqué (calculer $A^{100}$, résoudre un système d'équations différentielles couplées, analyser la stabilité d'un système physique) en un problème trivial une fois exprimé dans la « bonne » base — celle des vecteurs propres, où toutes les dimensions du problème deviennent indépendantes les unes des autres.</p>
    <p>Diagonaliser une matrice, c'est trouver une base dans laquelle elle devient la plus simple possible : diagonale. Ce chapitre rassemble tous les outils précédents (déterminant, base, changement de bases) pour répondre à une question très concrète : peut-on simplifier une matrice, et comment ? À la fin de ce chapitre, tu sauras déterminer si une matrice est diagonalisable et, le cas échéant, la diagonaliser effectivement.</p>

    <h3>1. Valeurs propres, vecteurs propres</h3>
    <p>$\\lambda\\in\\mathbb{K}$ est une <strong>valeur propre</strong> de $A$ s'il existe un vecteur $u\\neq0$ tel que $Au=\\lambda u$ ; $u$ est alors un <strong>vecteur propre</strong> associé à $\\lambda$. Géométriquement, $A$ ne fait que <strong>dilater ou contracter</strong> $u$ le long de sa propre direction — elle ne le fait pas tourner.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <line x1="15" y1="45" x2="145" y2="45" stroke="#3A4658" stroke-width="1"/>
          <line x1="15" y1="45" x2="70" y2="45" stroke="#4C7CFF" stroke-width="2.4" marker-end="url(#algArrEV1)"/>
          <text x="35" y="38" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">u</text>
          <line x1="15" y1="45" x2="140" y2="45" stroke="#F0B94D" stroke-width="2.4" marker-end="url(#algArrEV2)"/>
          <text x="120" y="38" font-family="IBM Plex Mono" font-size="9" fill="#F0B94D">λu = Au</text>
          <defs>
            <marker id="algArrEV1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#4C7CFF"/></marker>
            <marker id="algArrEV2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0L5,2.5L0,5Z" fill="#F0B94D"/></marker>
          </defs>
        </svg>
        <span>Un vecteur propre garde la même direction après transformation par A — seule sa longueur change</span>
      </div>
    </div>
    <p>Le <strong>sous-espace propre</strong> associé à $\\lambda$ est $E_\\lambda=\\ker(A-\\lambda I_n)=\\{u,\\ Au=\\lambda u\\}$.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un vecteur propre garde exactement la même direction après transformation par A, seule sa longueur change (dilatée ou contractée selon le signe et la valeur de λ). En quoi cette propriété géométrique très restrictive — ne pas changer de direction — explique-t-elle pourquoi seuls certains vecteurs très particuliers, et non n'importe quel vecteur, peuvent être des vecteurs propres d'une matrice donnée ?
    </div>

    <h3>2. Polynôme caractéristique</h3>
    <div class="formula-box">$$P_A(\\lambda) = \\det(A - \\lambda I_n)$$</div>
    <p>$\\lambda$ est valeur propre de $A$ $\\iff P_A(\\lambda)=0$. Le <strong>théorème de Cayley-Hamilton</strong> affirme que le polynôme caractéristique de $A$ est toujours un polynôme annulateur de $A$ : $P_A(A)=O_n$.</p>

    <h3>3. Diagonalisation</h3>
    <p>$A$ est <strong>diagonalisable</strong> s'il existe une base de $\\mathbb{K}^n$ formée de vecteurs propres de $A$ — de façon équivalente, s'il existe $P$ inversible et $D$ diagonale telles que $A=PDP^{-1}$.</p>
    <table class="mini-table">
      <tr><th>Critère</th><th>Condition</th></tr>
      <tr><td>Valeurs propres distinctes</td><td>$n$ valeurs propres deux à deux distinctes $\\Rightarrow$ diagonalisable</td></tr>
      <tr><td>Critère général</td><td>polynôme caractéristique scindé <em>et</em> dimension de chaque sous-espace propre = ordre de multiplicité de la valeur propre associée</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> diagonaliser $A=\\begin{pmatrix}1&2&2\\\\2&1&2\\\\2&2&1\\end{pmatrix}$.</p>
      <p><strong>Solution :</strong> $P_A(\\lambda)=(5-\\lambda)(1+\\lambda)^2$, donc valeurs propres $\\lambda_1=-1$ (multiplicité 2) et $\\lambda_2=5$ (multiplicité 1). On trouve $\\dim E_{-1}=2$ et $\\dim E_5=1$ : les dimensions correspondent aux multiplicités, donc $A$ est diagonalisable.</p>
      <p class="example-answer">Réponse : $A=PDP^{-1}$ avec $D=\\text{diag}(-1,-1,5)$ et $P$ formée des vecteurs propres correspondants.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le critère de diagonalisabilité exige que la dimension de chaque sous-espace propre égale exactement la multiplicité de la valeur propre associée dans le polynôme caractéristique — une condition qui n'est pas automatiquement vérifiée dès que le polynôme caractéristique est scindé. Pourquoi cette vérification supplémentaire est-elle nécessaire, alors qu'avoir des valeurs propres toutes distinctes suffit, lui, à garantir la diagonalisabilité sans condition supplémentaire ?
    </div>

    <h3>4. Trigonalisation</h3>
    <p>Quand $A$ n'est pas diagonalisable, elle peut rester <strong>trigonalisable</strong> : il existe une base dans laquelle sa matrice est seulement triangulaire (pas forcément diagonale). Le critère est plus large : $A$ est trigonalisable si et seulement si son polynôme caractéristique est <strong>scindé</strong> sur $\\mathbb{K}$ (racines comptées avec multiplicité, réelles ici).</p>

    <h3>5. Frontière de la recherche</h3>
    <p>Le concept de valeur propre, introduit ici pour des matrices de taille finie, prend en mécanique quantique une signification physique directe et vertigineuse : les valeurs propres d'un opérateur (la version quantique d'une matrice, agissant sur un espace de Hilbert de dimension infinie) correspondent exactement aux résultats possibles d'une mesure physique — l'énergie d'un électron dans un atome, par exemple, ne peut prendre que certaines valeurs précises, qui sont exactement les valeurs propres de l'opérateur énergie de ce système. Cette « quantification » de l'énergie, l'une des découvertes les plus contre-intuitives et les plus fondamentales du XXe siècle, est mathématiquement identique au calcul de valeurs propres que tu effectues dans ce chapitre.</p>
    <p><strong>Question ouverte :</strong> pour un opérateur quantique agissant sur un espace de dimension infinie, comment généralise-t-on la notion de polynôme caractéristique, qui suppose implicitement une dimension finie ?</p>
    <p><strong>Concept avancé :</strong> l'<strong>analyse vibratoire des structures</strong> en génie civil (ponts, bâtiments) utilise directement la diagonalisation : les valeurs propres d'une matrice décrivant la rigidité d'une structure correspondent à ses fréquences propres de vibration, une information cruciale pour concevoir des bâtiments résistants aux séismes, en évitant que leur fréquence propre coïncide avec celle des secousses sismiques attendues.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Matrice A → polynôme caractéristique P_A(λ)=det(A-λI) → valeurs propres (racines de P_A) → sous-espaces propres associés → si dimensions des sous-espaces propres = multiplicités : A diagonalisable (A=PDP⁻¹) → sinon, si P_A scindé : A trigonalisable
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$Au = \\lambda u \\quad (u \\neq 0)$$
      Cette équation, d'une simplicité trompeuse, est au fondement de tout le chapitre : elle définit exactement ce qu'est une valeur propre et un vecteur propre, et c'est elle qui, une fois résolue pour toutes les valeurs de λ possibles, permet de reconstruire une base où la matrice A devient diagonale — la forme la plus simple qu'elle puisse jamais prendre.
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Hamilton n'avait jamais eu son intuition soudaine sur le pont de Broom Bridge en 1843 : la théorie des matrices et le théorème de Cayley-Hamilton se seraient-ils développés selon un chemin très différent ?</li>
        <li>Pourquoi une matrice non diagonalisable peut-elle malgré tout être trigonalisable, alors que la trigonalisation semble à première vue une simplification moins poussée que la diagonalisation ?</li>
        <li>Quelle serait la conséquence, pour la conception de bâtiments résistants aux séismes, d'une impossibilité de calculer les valeurs propres d'une matrice décrivant la rigidité d'une structure ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>W. R. Hamilton, découverte des quaternions, 16 octobre 1843 — l'épisode fondateur associé au nom du théorème de Cayley-Hamilton.</li>
        <li>A. Cayley, « A Memoir on the Theory of Matrices », Philosophical Transactions of the Royal Society, 1858 — où figure la démonstration générale du théorème.</li>
        <li>G. Strang, <em>Linear Algebra and Its Applications</em>, Cengage — référence internationale sur la diagonalisation et ses applications.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais déterminer si une matrice est diagonalisable et, le cas échéant, la diagonaliser effectivement — clôturant ainsi la matière « Algèbre » de cette L1. Comme le montre l'anecdote du pont de Broom Bridge : parfois, une intuition mathématique surgit tout entière dans l'esprit d'un chercheur, avec une clarté si soudaine qu'il ressent le besoin urgent de la graver dans la pierre avant qu'elle ne s'échappe — et cette même intuition peut, un siècle et demi plus tard, aider à comprendre le comportement quantique d'un électron ou à concevoir un bâtiment résistant aux séismes.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Au = λu : A ne fait qu'étirer/contracter un vecteur propre, sans changer sa direction</li>
        <li>Les valeurs propres sont les racines du polynôme caractéristique P(λ) = det(A − λIn)</li>
        <li>n valeurs propres distinctes ⟹ diagonalisable ; sinon, vérifier les dimensions des sous-espaces propres</li>
        <li>Trigonalisable est moins exigeant que diagonalisable : il suffit que le polynôme caractéristique soit scindé</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que toute matrice carrée est diagonalisable — ce n'est vrai que sous certaines conditions</li>
        <li>Oublier de vérifier la dimension du sous-espace propre quand une valeur propre est multiple (l'ordre de multiplicité ne suffit pas seul)</li>
        <li>Confondre polynôme caractéristique (dont les racines sont les valeurs propres) et polynôme annulateur (Cayley-Hamilton en est un, mais pas le seul)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — valeurs propres d'une matrice 2×2</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre les coefficients de A = [[a,b],[c,d]] : le calculateur affiche le polynôme caractéristique et les valeurs propres.</p>
      <div class="sim-controls">
        <label>a : <input type="number" id="algEa" value="1" style="width:56px;" oninput="updateAlgEigCalc()"></label>
        <label>b : <input type="number" id="algEb" value="2" style="width:56px;" oninput="updateAlgEigCalc()"></label>
        <label>c : <input type="number" id="algEc" value="2" style="width:56px;" oninput="updateAlgEigCalc()"></label>
        <label>d : <input type="number" id="algEd" value="1" style="width:56px;" oninput="updateAlgEigCalc()"></label>
        <div class="sim-readout" id="algEigReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Si $Au = 3u$ avec $u \\neq 0$, alors :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg5e1" value="wrong"> u est valeur propre de A</label>
          <label class="option"><input type="radio" name="alg5e1" value="right"> 3 est valeur propre de A, u un vecteur propre associé</label>
          <label class="option"><input type="radio" name="alg5e1" value="wrong"> A n'est pas inversible</label>
          <label class="option"><input type="radio" name="alg5e1" value="wrong"> u = 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg5e1','alg5fb1','Correct — c\\'est exactement la définition : 3 est la valeur propre, u (non nul) est le vecteur propre associé.','Relis la définition : λ est LA valeur propre (un nombre), u est LE vecteur propre (non nul).')">Vérifier</button>
        <div class="feedback" id="alg5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une matrice 3×3 ayant 3 valeurs propres réelles distinctes est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg5e2" value="right"> toujours diagonalisable</label>
          <label class="option"><input type="radio" name="alg5e2" value="wrong"> jamais diagonalisable</label>
          <label class="option"><input type="radio" name="alg5e2" value="wrong"> diagonalisable seulement si elle est symétrique</label>
          <label class="option"><input type="radio" name="alg5e2" value="wrong"> impossible à trigonaliser</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg5e2','alg5fb2','Correct — n valeurs propres distinctes (ici 3, en dimension 3) suffisent à garantir la diagonalisabilité, sans autre condition.','C\\'est le corollaire du critère de diagonalisabilité vu dans le cours : des valeurs propres toutes distinctes suffisent.')">Vérifier</button>
        <div class="feedback" id="alg5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le théorème de Cayley-Hamilton affirme que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="alg5e3" value="wrong"> toute matrice est diagonalisable</label>
          <label class="option"><input type="radio" name="alg5e3" value="right"> le polynôme caractéristique de A est un polynôme annulateur de A</label>
          <label class="option"><input type="radio" name="alg5e3" value="wrong"> det(A) = Tr(A)</label>
          <label class="option"><input type="radio" name="alg5e3" value="wrong"> A n'a qu'une seule valeur propre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('alg5e3','alg5fb3','Correct — en remplaçant λ par A dans le polynôme caractéristique PA(λ), on obtient toujours la matrice nulle : PA(A) = On.','Cayley-Hamilton relie le polynôme caractéristique PA(λ) à la matrice A elle-même, pas à la diagonalisabilité.')">Vérifier</button>
        <div class="feedback" id="alg5fb3"></div>
      </div>
    </div>
  `,
  init: initAlgEigCalc
};

ALGEBRE_NOVA_KB[algKey('Réduction d\'endomorphismes et de matrices')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Réduction d'endomorphismes ». Demande-moi ce qu'est une valeur propre, comment diagonaliser une matrice, ou un indice sur un exercice.",
  rules: [
    { test:/valeur propre|vecteur propre/i, replies:["λ est valeur propre de A s'il existe u≠0 tel que Au=λu ; u est alors un vecteur propre associé. Géométriquement, A ne fait qu'étirer ou contracter u, sans changer sa direction."] },
    { test:/sous-espace propre/i, replies:["Le sous-espace propre associé à λ est Eλ = ker(A−λIn) = {u, Au=λu} — c'est l'ensemble de tous les vecteurs propres associés à λ (plus le vecteur nul)."] },
    { test:/polyn[oô]me caract[ée]ristique/i, replies:["Le polynôme caractéristique est PA(λ) = det(A−λIn). Ses racines sont exactement les valeurs propres de A."] },
    { test:/cayley|annulateur/i, replies:["Le théorème de Cayley-Hamilton dit que le polynôme caractéristique de A est toujours un polynôme annulateur de A : PA(A) = On (la matrice nulle)."] },
    { test:/diagonalisable|diagonalisation/i, replies:["A est diagonalisable s'il existe une base de vecteurs propres. Suffisant : n valeurs propres distinctes. Sinon, il faut vérifier que la dimension de chaque sous-espace propre égale la multiplicité de la valeur propre correspondante."] },
    { test:/trigonalisable|trigonalisation/i, replies:["Trigonalisable est moins exigeant que diagonalisable : il suffit que le polynôme caractéristique soit scindé (racines réelles, comptées avec multiplicité)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : relis bien qui est le nombre et qui est le vecteur dans Au=λu.","Indice niveau 2 : λ (ici 3) est LA valeur propre.","Indice niveau 3 : u (non nul) est LE vecteur propre associé."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : rappelle-toi le corollaire du critère de diagonalisabilité.","Indice niveau 2 : ça ne demande rien sur la symétrie de la matrice.","Indice niveau 3 : des valeurs propres toutes distinctes suffisent à garantir la diagonalisabilité."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : Cayley-Hamilton relie un polynôme et une matrice, pas une propriété de diagonalisabilité.","Indice niveau 2 : pense au polynôme caractéristique PA(λ).","Indice niveau 3 : PA(A) = On, la matrice nulle."] }
  ]
};

/* fusionne le module Algèbre dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ALGEBRE_CHAPTERS);
Object.assign(NOVA_KB, ALGEBRE_NOVA_KB);