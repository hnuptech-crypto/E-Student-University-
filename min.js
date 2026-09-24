/* =====================================================================
   CHUNK « min » — registre MIN_CHAPTERS / MIN_NOVA_KB
   Matière(s) : Chimie|Chimie minérale
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   MIN_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE CHIMIE MINÉRALE — Chimie L1
   (contenu rédigé à partir du "Cours de chimie minérale et applications",
   Dr N. Bouchiba, Université Oran 1 Ahmed Ben Bella, Département de Chimie)
   Structure identique aux autres modules : MIN_CHAPTERS / MIN_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const MIN_MATIERE = 'Chimie minérale';
function minKey(chapterTitle){ return `Chimie|${MIN_MATIERE}|${chapterTitle}`; }
const MIN_CHAPTERS = {};
const MIN_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de concentration molaire volumique (Chapitre 1)
--------------------------------------------------------------------------------- */
function updateMinConcentration(){
  const m = parseFloat(document.getElementById('minMasse').value) || 0;
  const M = parseFloat(document.getElementById('minMolaire').value) || 1;
  const V = parseFloat(document.getElementById('minVolume').value) || 1;
  const n = m/M;
  const c = n/(V/1000);
  document.getElementById('minConcReadout').innerHTML =
    `n = m/M = ${m}/${M} = <strong>${n.toFixed(4)} mol</strong><br>` +
    `c = n/V = ${n.toFixed(4)} / ${(V/1000).toFixed(4)} L = <strong>${c.toFixed(4)} mol/L</strong>`;
}
function initMinConcentration(){ updateMinConcentration(); }

/* =========================== CHAPITRE 1 — Structure de l'atome et notions fondamentales =========================== */
MIN_CHAPTERS[minKey('Structure de l\'atome et notions fondamentales')] = {
  objectives: [
    "Représenter un atome ou un ion à l'aide du symbolisme (A, Z, N, E) et calculer son nombre de neutrons",
    "Reconnaître des isotopes et calculer une masse atomique moyenne pondérée",
    "Convertir entre masse, nombre de moles et nombre d'entités grâce à la constante d'Avogadro",
    "Calculer la concentration molaire volumique d'une solution",
    "Évaluer pourquoi la masse molaire indiquée sur le tableau périodique n'est presque jamais un nombre entier, contrairement au nombre de masse A d'un isotope donné"
  ],
  prereqs: ["Notions de base de chimie générale (L1)"],
  bodyHtml: `
    <p>La masse molaire du chlore, indiquée sur tout tableau périodique, vaut environ 35,45 g/mol — un nombre qui surprend tout étudiant débutant, habitué à l'idée que les atomes se comptent en nombres entiers de protons, neutrons et électrons. Ce chiffre à première vue étrange révèle en réalité une vérité profonde sur la matière : le chlore naturel n'est jamais un élément pur au sens strict, mais un mélange constant de deux isotopes, le chlore 35 (environ 76 % en abondance naturelle) et le chlore 37 (environ 24 %), dont la masse molaire tabulée n'est autre que la moyenne pondérée.</p>
    <p>Cette réalité, loin d'être une simple curiosité académique, a des conséquences pratiques considérables : c'est elle qui explique pourquoi la datation au carbone 14 fonctionne (le carbone naturel contient une infime proportion de cet isotope radioactif), et pourquoi certains procédés industriels d'enrichissement isotopique (comme celui de l'uranium pour l'énergie nucléaire) sont si techniquement exigeants — séparer deux isotopes d'un même élément, chimiquement identiques, exige d'exploiter leur seule et unique différence : une masse légèrement différente.</p>
    <p>Ce premier chapitre pose le vocabulaire et les outils de calcul indispensables à toute la chimie minérale : comment représenter un atome, comment compter les entités chimiques (moles), et comment quantifier une solution (concentration). À la fin de ce chapitre, tu sauras manipuler ces outils avec l'aisance nécessaire pour aborder sereinement toute la chimie descriptive des éléments qui suit.</p>

    <h3>1. Représentation d'un atome ou d'un ion</h3>
    <p>On utilise le symbolisme suivant, où $E$ est le symbole de l'élément, $A$ le nombre de masse, $Z$ le numéro atomique, et $N$ (en exposant) la charge de l'ion s'il y a lieu :</p>
    <div class="formula-box">$$^{A}_{Z}E^{N\\pm}$$</div>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th></tr>
      <tr><td>Numéro atomique $Z$</td><td>nombre de protons du noyau ; pour un atome neutre, égal aussi au nombre d'électrons</td></tr>
      <tr><td>Nombre de masse $A$</td><td>nombre de nucléons (protons + neutrons) du noyau</td></tr>
      <tr><td>Nombre de neutrons</td><td>$A - Z$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Isotopes</span>
      Des <strong>isotopes</strong> sont des atomes qui possèdent le même numéro atomique $Z$ mais un nombre de masse $A$ différent — même nombre de protons, nombre de neutrons différent. Dans la nature, les éléments existent sous forme de mélanges d'isotopes. <strong>Exemple :</strong> $^{238}_{92}U$ et $^{235}_{92}U$ sont deux isotopes de l'uranium.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La masse molaire tabulée d'un élément (par exemple 35,45 g/mol pour le chlore) est une moyenne pondérée par l'abondance naturelle de chacun de ses isotopes, et ne correspond donc à aucun atome réel pris individuellement. Pourquoi cette moyenne n'est-elle malgré tout jamais un problème pratique pour les calculs de chimie, qui portent presque toujours sur des quantités macroscopiques (moles) plutôt que sur des atomes isolés ?
    </div>

    <h3>2. Mole et masse molaire</h3>
    <p>Une <strong>mole</strong> de n'importe quelle substance contient $6{,}022\\times10^{23}$ unités de cette substance — le <strong>nombre d'Avogadro</strong>. La <strong>masse molaire</strong> d'un élément est la masse en grammes de $6{,}022\\times10^{23}$ atomes de cet élément (c'est la masse indiquée sur le tableau périodique) ; la masse molaire d'un composé se calcule à partir de sa formule moléculaire.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> déterminer la masse molaire de $H_3PO_4$, puis le nombre de moles présent dans 10 g de ce composé.</p>
      <p><strong>Solution :</strong> masse de 3 mol de H = $3\\times1{,}008$ g ; masse de 1 mol de P = $30{,}974$ g ; masse de 4 mol de O = $4\\times15{,}999$ g. Total : $M(H_3PO_4) \\approx 98{,}0$ g/mol. Pour 10 g : $n = \\dfrac{10}{98} \\approx 1{,}02\\times10^{-1}$ mol.</p>
      <p class="example-answer">Réponse : $M \\approx 98{,}0$ g/mol ; $n \\approx 0{,}102$ mol.</p>
    </div>
    <p>On retient la relation fondamentale :</p>
    <div class="formula-box">$$\\text{masse de composé} = n \\times M \\qquad \\text{(nombre de moles} \\times \\text{masse molaire)}$$</div>

    <h3>3. Concentration molaire volumique</h3>
    <p>La concentration molaire volumique $c$ est le rapport entre le nombre de moles de soluté $n$ et le volume $V$ de la solution, exprimé en litres :</p>
    <div class="formula-box">$$c = \\frac{n}{V} \\quad \\text{(mol/L)}$$</div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer la concentration molaire volumique d'une solution préparée en dissolvant 15 g de NaOH (M = 40 g/mol) dans suffisamment d'eau pour faire 250 mL de solution.</p>
      <p><strong>Solution :</strong> $n = \\dfrac{15}{40} = 0{,}375$ mol. $c = \\dfrac{0{,}375}{0{,}250} = 1{,}5$ mol/L.</p>
      <p class="example-answer">Réponse : $c = 1{,}5$ mol/L.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le nombre d'Avogadro ($6{,}022\\times10^{23}$) est si immense qu'il échappe à toute intuition directe : il correspond, par exemple, à environ le nombre de grains de sable sur toutes les plages et déserts de la Terre, multiplié par plusieurs centaines. Pourquoi la chimie a-t-elle eu besoin d'introduire une unité aussi démesurée (la mole) plutôt que de compter directement les atomes un par un ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La séparation isotopique, rendue nécessaire par l'existence même des isotopes étudiés dans ce chapitre, reste un défi technologique et énergétique considérable : enrichir l'uranium naturel (qui ne contient que 0,7 % d'uranium 235 fissile) jusqu'à une concentration exploitable pour l'énergie nucléaire nécessite des cascades de centrifugeuses ultra-précises fonctionnant sur le seul principe d'une différence de masse infime entre isotopes chimiquement identiques. À l'inverse, les isotopes stables (non radioactifs) sont aujourd'hui exploités en recherche médicale et environnementale comme traceurs, permettant de suivre le parcours d'une molécule dans un organisme ou un écosystème sans perturber son comportement chimique.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes de séparation isotopique significativement moins coûteuses en énergie que les technologies actuelles (centrifugation, diffusion gazeuse), un enjeu majeur tant pour l'énergie nucléaire civile que pour la non-prolifération des matières fissiles ? C'est un axe de recherche stratégique en physico-chimie nucléaire.</p>
    <p><strong>Technologie émergente :</strong> les techniques de séparation isotopique par laser, qui exploitent de très légères différences d'énergie d'absorption entre isotopes, sont explorées comme alternative potentiellement plus efficace énergétiquement aux méthodes de centrifugation classiques.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Atome (A,Z) → isotopes naturels → masse molaire moyenne pondérée → mole (6,022×10²³ entités) → masse = n×M → concentration c = n/V
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$n = \\frac{m}{M} \\quad\\text{et}\\quad c = \\frac{n}{V}$$
      Ces deux relations, d'une simplicité redoutable, sont les outils de calcul les plus utilisés de toute la chimie : elles permettent de passer sans effort d'une masse pesée sur une balance à une concentration exploitable dans n'importe quel calcul d'équilibre ou de réaction chimique.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Z = nombre de protons (= électrons si atome neutre) ; A = nombre de nucléons ; nombre de neutrons = A − Z</li>
        <li>Des isotopes ont le même Z mais un A différent</li>
        <li>Une mole contient 6,022×10²³ entités (nombre d'Avogadro) ; masse = n × M</li>
        <li>c = n/V, avec V exprimé en LITRES (attention aux mL à convertir)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre A (nombre de masse, nucléons) et Z (numéro atomique, protons seulement)</li>
        <li>Oublier de convertir le volume en litres avant de calculer c = n/V (250 mL = 0,250 L, pas 250)</li>
        <li>Croire que deux isotopes ont des propriétés CHIMIQUES différentes — elles sont quasi identiques (seule la masse change) ; ce sont les propriétés physiques liées à la masse qui diffèrent</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — concentration molaire volumique</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre la masse dissoute, la masse molaire du soluté et le volume de solution : le calculateur donne n puis c.</p>
      <div class="sim-controls">
        <label>Masse dissoute (g) : <input type="number" id="minMasse" value="15" style="width:70px;" oninput="updateMinConcentration()"></label>
        <label>Masse molaire (g/mol) : <input type="number" id="minMolaire" value="40" style="width:70px;" oninput="updateMinConcentration()"></label>
        <label>Volume (mL) : <input type="number" id="minVolume" value="250" style="width:70px;" oninput="updateMinConcentration()"></label>
        <div class="sim-readout" id="minConcReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'atome $^{35}_{17}Cl$ possède :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min1e1" value="wrong"> 35 protons et 17 neutrons</label>
          <label class="option"><input type="radio" name="min1e1" value="right"> 17 protons et 18 neutrons</label>
          <label class="option"><input type="radio" name="min1e1" value="wrong"> 17 protons et 35 neutrons</label>
          <label class="option"><input type="radio" name="min1e1" value="wrong"> 35 protons et 35 neutrons</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min1e1','min1fb1','Correct — Z=17 protons, et neutrons = A−Z = 35−17 = 18.','Z est le nombre de PROTONS (en indice), A le nombre de NUCLÉONS (en exposant). Neutrons = A − Z.')">Vérifier</button>
        <div class="feedback" id="min1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le nombre de moles contenues dans 4,4 g de CO₂ (M = 44 g/mol) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min1e2" value="wrong"> 4,4 mol</label>
          <label class="option"><input type="radio" name="min1e2" value="right"> 0,1 mol</label>
          <label class="option"><input type="radio" name="min1e2" value="wrong"> 44 mol</label>
          <label class="option"><input type="radio" name="min1e2" value="wrong"> 1 mol</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min1e2','min1fb2','Correct — n = m/M = 4,4/44 = 0,1 mol.','Utilise n = m/M avec m=4,4 g et M=44 g/mol.')">Vérifier</button>
        <div class="feedback" id="min1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dissoudre 0,2 mol de soluté dans 500 mL de solution donne une concentration de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min1e3" value="wrong"> 0,1 mol/L</label>
          <label class="option"><input type="radio" name="min1e3" value="right"> 0,4 mol/L</label>
          <label class="option"><input type="radio" name="min1e3" value="wrong"> 2,5 mol/L</label>
          <label class="option"><input type="radio" name="min1e3" value="wrong"> 100 mol/L</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min1e3','min1fb3','Correct — c = n/V = 0,2/0,5 = 0,4 mol/L (500 mL = 0,5 L).','N\\'oublie pas de convertir 500 mL en 0,5 L avant de diviser.')">Vérifier</button>
        <div class="feedback" id="min1fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si un élément chimique ne possédait qu'un seul isotope naturel (sans aucun mélange) : sa masse molaire tabulée serait-elle alors un nombre entier exact ?</li>
        <li>Pourquoi la séparation isotopique est-elle si technologiquement exigeante, alors que deux isotopes d'un même élément sont chimiquement quasi identiques ?</li>
        <li>Quelle serait la conséquence, pour la recherche médicale, si l'on ne pouvait utiliser aucun isotope stable comme traceur pour suivre le devenir d'une molécule dans l'organisme ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>F. Soddy, « The Origins of the Conceptions of Isotopes », Nobel Lecture, prix Nobel de chimie 1921 — origine historique du concept d'isotope.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur les notions fondamentales de chimie minérale en licence.</li>
        <li>IUPAC, <em>Atomic Weights of the Elements</em>, Pure and Applied Chemistry — table de référence internationale des masses atomiques standard.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais du vocabulaire et des outils de calcul fondamentaux de toute la chimie minérale — atomes, isotopes, moles, concentrations. Le chapitre suivant, « Structure électronique et tableau périodique », va approfondir la structure de l'atome pour comprendre comment ses électrons s'organisent, un préalable indispensable avant d'étudier la chimie descriptive de chaque grande famille d'éléments. Comme le disait Frederick Soddy, qui a introduit le terme même d'isotope : « Ces atomes... j'ai suggéré qu'ils soient appelés isotopes, du grec signifiant "au même endroit", puisqu'ils occupent la même place dans le tableau périodique. » Une découverte qui a permis de résoudre l'énigme des masses atomiques non entières.</p>
  `,
  init: initMinConcentration
};

MIN_NOVA_KB[minKey('Structure de l\'atome et notions fondamentales')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Structure de l'atome et notions fondamentales ». Demande-moi la différence entre A et Z, ce qu'est un isotope, ou un indice sur un exercice.",
  rules: [
    { test:/num[ée]ro atomique|\bz\b/i, replies:["Le numéro atomique Z est le nombre de protons du noyau. Pour un atome neutre, il est aussi égal au nombre d'électrons."] },
    { test:/nombre de masse|\ba\b(?!tome)/i, replies:["Le nombre de masse A est le nombre total de nucléons (protons + neutrons) du noyau. Le nombre de neutrons se calcule par A − Z."] },
    { test:/isotope/i, replies:["Des isotopes ont le MÊME numéro atomique Z (même nombre de protons) mais un nombre de masse A DIFFÉRENT (nombre de neutrons différent). Exemple : 238U et 235U."] },
    { test:/mole\b|avogadro/i, replies:["Une mole contient 6,022×10²³ entités (nombre d'Avogadro). La relation clé est : masse = n × M (nombre de moles × masse molaire)."] },
    { test:/masse molaire/i, replies:["La masse molaire d'un composé se calcule en additionnant les masses molaires de chaque atome, multipliées par leur nombre dans la formule."] },
    { test:/concentration/i, replies:["c = n/V, avec n en moles et V en LITRES. Attention à bien convertir les mL en L avant de calculer !"] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : Z est en indice (17), A est en exposant (35).","Indice niveau 2 : 17 protons, et neutrons = A−Z = 35−17.","Indice niveau 3 : 17 protons, 18 neutrons."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : applique n = m/M.","Indice niveau 2 : n = 4,4/44.","Indice niveau 3 : n = 0,1 mol."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : convertis d'abord 500 mL en litres.","Indice niveau 2 : 500 mL = 0,5 L, puis c = n/V.","Indice niveau 3 : c = 0,2/0,5 = 0,4 mol/L."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Configurateur électronique (Chapitre 2)
--------------------------------------------------------------------------------- */
const MIN_SUBSHELLS = [
  ['1s',2],['2s',2],['2p',6],['3s',2],['3p',6],['4s',2],['3d',10],['4p',6],
  ['5s',2],['4d',10],['5p',6],['6s',2],['4f',14],['5d',10],['6p',6],
  ['7s',2],['5f',14],['6d',10],['7p',6]
];
function updateMinConfig(){
  const z = Math.max(1, Math.min(94, parseInt(document.getElementById('minZ').value) || 1));
  let remaining = z;
  const filled = [];
  let lastSub = '1s', lastElectrons = 0, lastCapacity = 2;
  for(const [sub,cap] of MIN_SUBSHELLS){
    if(remaining <= 0) break;
    const f = Math.min(cap, remaining);
    filled.push([sub,f]);
    remaining -= f;
    lastSub = sub; lastElectrons = f; lastCapacity = cap;
  }
  const order = {s:0,p:1,d:2,f:3};
  const sorted = [...filled].sort((a,b) => {
    const na = parseInt(a[0][0]), nb = parseInt(b[0][0]);
    if(na !== nb) return na-nb;
    return order[a[0][1]] - order[b[0][1]];
  });
  const configStr = sorted.map(([s,n]) => `${s}<sup>${n}</sup>`).join(' ');
  document.getElementById('minConfigReadout').innerHTML = `Configuration électronique (Z=${z}) : ${configStr}`;

  const lMap = {s:1,p:3,d:5,f:7};
  const type = lastSub.slice(-1);
  const nOrbitals = lMap[type];
  const perOrbital = new Array(nOrbitals).fill(0);
  let e = lastElectrons;
  for(let i=0;i<nOrbitals && e>0;i++){ perOrbital[i]=1; e--; }
  for(let i=0;i<nOrbitals && e>0;i++){ perOrbital[i]=2; e--; }
  const boxes = perOrbital.map(n => n===0?'[ ]':n===1?'[↑]':'[↑↓]').join(' ');
  document.getElementById('minHundReadout').innerHTML =
    `Dernière sous-couche remplie : ${lastSub} (${lastElectrons}/${lastCapacity} électrons)<br>Règle de Hund : ${boxes}`;
}
function initMinConfig(){ updateMinConfig(); }

/* =========================== CHAPITRE 2 — Structure électronique et tableau périodique =========================== */
MIN_CHAPTERS[minKey('Structure électronique et tableau périodique')] = {
  objectives: [
    "Associer à un électron ses quatre nombres quantiques (n, l, m, s) et l'orbitale correspondante",
    "Établir la configuration électronique d'un atome en appliquant les principes de stabilité, de Pauli et la règle de Hund",
    "Situer un élément dans le tableau périodique (groupe, période, bloc) à partir de sa configuration électronique",
    "Prévoir le sens de variation des propriétés périodiques (énergie d'ionisation, affinité électronique, rayon atomique, électronégativité)",
    "Évaluer pourquoi les gaz rares, tout en bas de l'échelle de réactivité chimique, ont malgré tout une électronégativité et une énergie d'ionisation parmi les plus élevées de tout le tableau périodique"
  ],
  prereqs: ["Structure de l'atome et notions fondamentales"],
  bodyHtml: `
    <p>Dmitri Mendeleïev, en dressant en 1869 son célèbre tableau, ne connaissait rien des nombres quantiques ni de la mécanique quantique — ces concepts n'existeraient que plusieurs décennies plus tard. Pourtant, en classant les éléments par masse atomique croissante et en respectant la périodicité de leurs propriétés observées, il aboutit à une structure qui se révélera, un demi-siècle plus tard, être l'exacte traduction visuelle de la configuration électronique de chaque atome. Cette convergence remarquable entre une classification empirique du XIXe siècle et une théorie quantique du XXe siècle reste l'une des plus belles illustrations de la cohérence profonde de la Nature.</p>
    <p>Comprendre cette structure électronique n'est jamais un exercice purement académique : c'est elle qui explique pourquoi le sodium, avec son unique électron de valence facilement cédé, réagit violemment au contact de l'eau, tandis que l'hélium, dont la couche de valence est complète, reste chimiquement inerte même dans les conditions les plus extrêmes. Ce chapitre te donne les clés pour prédire, à partir de la seule configuration électronique, le comportement chimique de n'importe quel élément du tableau périodique.</p>
    <p>La configuration électronique d'un atome — la façon dont ses électrons se répartissent autour du noyau — détermine presque toutes ses propriétés chimiques. Ce chapitre construit cet outil pas à pas : nombres quantiques, orbitales, règles de remplissage, puis lien avec le tableau périodique. À la fin de ce chapitre, tu sauras situer n'importe quel élément dans le tableau périodique et prédire ses principales propriétés à partir de sa seule position.</p>

    <h3>1. Les quatre nombres quantiques</h3>
    <p>Une <strong>orbitale atomique</strong> est une région de l'espace, entourant le noyau, où l'on a une certaine probabilité de trouver l'électron. Chaque combinaison possible des nombres quantiques $n,l,m$ décrit une orbitale différente ; le nombre quantique $s$ précise en plus le spin de l'électron qui l'occupe.</p>
    <table class="mini-table">
      <tr><th>Nombre quantique</th><th>Rôle</th><th>Valeurs permises</th></tr>
      <tr><td>Principal, $n$</td><td>niveau d'énergie principal</td><td>$1,2,3,\\dots$</td></tr>
      <tr><td>Secondaire (azimutal), $l$</td><td>sous-niveau, forme de l'orbitale</td><td>$0,1,\\dots,n-1$</td></tr>
      <tr><td>Magnétique, $m$</td><td>orientation de l'orbitale</td><td>$-l,\\dots,0,\\dots,+l$</td></tr>
      <tr><td>De spin, $s$</td><td>rotation propre de l'électron</td><td>$+\\frac12$ ou $-\\frac12$</td></tr>
    </table>
    <table class="mini-table">
      <tr><th>$l$</th><th>Orbitale correspondante</th></tr>
      <tr><td>0</td><td>s</td></tr>
      <tr><td>1</td><td>p</td></tr>
      <tr><td>2</td><td>d</td></tr>
      <tr><td>3</td><td>f</td></tr>
    </table>
    <p><strong>Exemple :</strong> pour l'orbitale $2p$, $n=2,l=1,m=+1,0,-1$ : puisque $m$ prend 3 valeurs, il existe 3 orbitales $2p$ distinctes.</p>

    <h3>2. Les formes d'orbitales</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 60 60" width="100%">
          <circle cx="30" cy="30" r="20" fill="#4C7CFF" opacity="0.25" stroke="#4C7CFF" stroke-width="1.4"/>
        </svg>
        <span>Orbitale s : symétrie sphérique (probabilité de présence égale dans toutes les directions)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 60" width="100%">
          <circle cx="42" cy="30" r="18" fill="#2DD4C4" opacity="0.3" stroke="#2DD4C4" stroke-width="1.4"/>
          <circle cx="78" cy="30" r="18" fill="#2DD4C4" opacity="0.3" stroke="#2DD4C4" stroke-width="1.4"/>
        </svg>
        <span>Orbitale p : forme bilobée, 3 orientations possibles (pₓ, p_y, p_z)</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 100 100" width="100%">
          <circle cx="72" cy="45" r="14" fill="#F0B94D" opacity="0.3" stroke="#F0B94D" stroke-width="1.2"/>
          <circle cx="50" cy="23" r="14" fill="#F0B94D" opacity="0.3" stroke="#F0B94D" stroke-width="1.2"/>
          <circle cx="28" cy="45" r="14" fill="#F0B94D" opacity="0.3" stroke="#F0B94D" stroke-width="1.2"/>
          <circle cx="50" cy="67" r="14" fill="#F0B94D" opacity="0.3" stroke="#F0B94D" stroke-width="1.2"/>
        </svg>
        <span>Orbitale d : forme « trèfle à quatre feuilles » (4 des 5 orbitales d ; la 5ᵉ, dz², a une forme particulière)</span>
      </div>
    </div>

    <h3>3. Ordre de remplissage des orbitales</h3>
    <p>Pour établir la configuration électronique d'un atome à l'état fondamental, on applique trois règles :</p>
    <table class="mini-table">
      <tr><th>Règle</th><th>Énoncé</th></tr>
      <tr><td>Principe de stabilité</td><td>les électrons occupent d'abord les orbitales de plus faible énergie</td></tr>
      <tr><td>Principe de Pauli</td><td>une orbitale contient au maximum 2 électrons, de spins opposés (+½ et −½)</td></tr>
      <tr><td>Règle de Hund</td><td>les électrons occupent d'abord chaque orbitale d'un même sous-niveau séparément (spins parallèles), avant de s'apparier</td></tr>
    </table>
    <p>L'ordre de remplissage suit la séquence : $1s,2s,2p,3s,3p,4s,3d,4p,5s,4d,5p,6s,4f,5d,6p,7s,\\dots$</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> donner la configuration électronique du carbone (Z=6).</p>
      <p><strong>Solution :</strong> $1s^2\\,2s^2\\,2p^2$. Pour les 2 électrons de la sous-couche $2p$ (3 orbitales disponibles), la règle de Hund impose de les placer dans deux orbitales <strong>différentes</strong>, avec des spins parallèles — et non d'en apparier deux dans la même orbitale.</p>
      <p class="example-answer">Réponse : $1s^2\\,2s^2\\,2p^2$, avec $[\\uparrow]\\,[\\uparrow]\\,[\\ ]$ sur les trois orbitales $2p$.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La règle de Hund impose de placer les électrons dans des orbitales séparées avec des spins parallèles, avant de les apparier. Sachant que deux électrons dans des orbitales séparées se repoussent moins qu'appariés dans la même orbitale, en quoi cette règle traduit-elle simplement un principe de minimisation d'énergie déjà familier — plutôt qu'un postulat arbitraire supplémentaire ?
    </div>

    <h3>4. Le tableau périodique</h3>
    <p><strong>Loi périodique :</strong> les propriétés physiques et chimiques des éléments sont des fonctions périodiques de leur numéro atomique.</p>
    <table class="mini-table">
      <tr><th>Notion</th><th>Description</th></tr>
      <tr><td>Groupe (colonne)</td><td>éléments dont la configuration électronique se termine de la même façon → propriétés chimiques similaires</td></tr>
      <tr><td>Période (ligne)</td><td>7 périodes, de 2 à 32 éléments selon la ligne</td></tr>
      <tr><td>Éléments représentatifs (groupes A)</td><td>configuration se terminant sur une sous-couche s ou p</td></tr>
      <tr><td>Éléments de transition (groupes B)</td><td>configuration se terminant sur une sous-couche d (transition d) ou f (transition interne : lanthanides, actinides)</td></tr>
    </table>
    <p>Les <strong>électrons de valence</strong> sont les électrons les moins liés au noyau (les plus externes) : ce sont eux qui interviennent dans les réactions chimiques.</p>

    <h3>5. Propriétés périodiques</h3>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Définition</th><th>Dans une période (→)</th><th>Dans un groupe (↓)</th></tr>
      <tr><td>Énergie d'ionisation</td><td>énergie pour arracher un électron à l'atome gazeux isolé</td><td>augmente</td><td>diminue</td></tr>
      <tr><td>Affinité électronique</td><td>énergie dégagée quand l'atome gazeux capte un électron</td><td>—</td><td>—</td></tr>
      <tr><td>Rayon atomique</td><td>moitié de la distance entre noyaux de deux atomes identiques liés</td><td>diminue</td><td>augmente</td></tr>
      <tr><td>Électronégativité</td><td>tendance à attirer le doublet d'électrons d'une liaison</td><td>augmente</td><td>diminue</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Rayon ionique</span>
      Le cation est toujours plus petit que l'atome neutre correspondant (moins de répulsion électronique, nuage électronique comprimé) ; plus la charge positive est grande, plus le rayon ionique est petit. <strong>Exemple :</strong> $Cu$ : 0,122 nm ; $Cu^+$ : 0,096 nm ; $Cu^{2+}$ : 0,072 nm.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les gaz rares (colonne complète en $ns^2np^6$) ont une énergie d'ionisation parmi les plus élevées de leur période, mais sont pourtant les éléments chimiquement les moins réactifs de tout le tableau périodique. Comment ces deux faits, apparemment paradoxaux à première vue, s'expliquent-ils en réalité par la même cause profonde : la stabilité exceptionnelle d'une couche de valence complète ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>La classification périodique continue de s'étendre : les éléments super-lourds synthétisés artificiellement (au-delà de l'uranium naturel) suivent-ils encore rigoureusement les mêmes règles de configuration électronique et les mêmes tendances périodiques que les éléments plus légers ? Cette question reste activement débattue par les physiciens nucléaires, car des effets relativistes significatifs (les électrons internes de ces atomes très massifs se déplacent à une fraction non négligeable de la vitesse de la lumière) commencent à perturber les prédictions de la mécanique quantique non relativiste standard, ouvrant un champ de recherche fascinant à la frontière entre chimie et relativité.</p>
    <p><strong>Question ouverte :</strong> jusqu'à quel numéro atomique le tableau périodique peut-il raisonnablement s'étendre avant que les noyaux ne deviennent systématiquement trop instables pour être observés, même en tenant compte de l'hypothétique « îlot de stabilité » des éléments super-lourds ? C'est une question ouverte de la physique nucléaire théorique.</p>
    <p><strong>Technologie émergente :</strong> les calculs de structure électronique relativistes, indispensables pour prédire correctement les propriétés chimiques des éléments les plus lourds du tableau périodique, mobilisent aujourd'hui certains des supercalculateurs les plus puissants dédiés à la recherche en chimie quantique.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Nombres quantiques (n,l,m,s) → orbitales → règles de remplissage (stabilité, Pauli, Hund) → configuration électronique → position dans le tableau périodique → propriétés périodiques prévisibles
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Propriétés chimiques} = f(\\text{configuration électronique de valence})$$
      Cette relation, plus conceptuelle qu'une formule numérique, est l'idée fondatrice de toute la classification périodique — et le fil conducteur qui reliera, dans les chapitres suivants, la structure électronique de chaque élément à sa chimie descriptive concrète : hydrogène, oxygène, halogènes, soufre, azote et phosphore.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>4 nombres quantiques (n, l, m, s) définissent complètement l'état d'un électron</li>
        <li>Remplissage : stabilité (énergie croissante) → Pauli (2 électrons max, spins opposés) → Hund (un électron par case avant appariement)</li>
        <li>Éléments d'un même groupe : configuration électronique de valence similaire → propriétés chimiques similaires</li>
        <li>Dans une période : Ei et électronégativité augmentent, rayon atomique diminue ; dans un groupe, c'est l'inverse</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Apparier deux électrons dans une même orbitale p avant que les 3 orbitales p en aient chacune une (violation de Hund)</li>
        <li>Oublier que le remplissage de 4s précède 3d, alors qu'à l'écriture finale on regroupe conventionnellement 3d avant 4s</li>
        <li>Confondre énergie d'ionisation (arracher un électron, toujours positive) et affinité électronique (capter un électron, énergie dégagée)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — configuration électronique</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre un numéro atomique Z : le calculateur donne la configuration électronique complète et le remplissage de Hund de la dernière sous-couche.</p>
      <div class="sim-controls">
        <label>Z (numéro atomique) : <input type="number" id="minZ" value="6" min="1" max="94" style="width:70px;" oninput="updateMinConfig()"></label>
        <div class="sim-readout" id="minConfigReadout" style="margin-top:8px;"></div>
        <div class="sim-readout" id="minHundReadout" style="margin-top:4px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le nombre d'orbitales 3d (n=3, l=2) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min2e1" value="wrong"> 1</label>
          <label class="option"><input type="radio" name="min2e1" value="wrong"> 3</label>
          <label class="option"><input type="radio" name="min2e1" value="right"> 5</label>
          <label class="option"><input type="radio" name="min2e1" value="wrong"> 7</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min2e1','min2fb1','Correct — pour l=2, m prend 5 valeurs (−2,−1,0,+1,+2), donc 5 orbitales d.','m va de −l à +l : pour l=2, combien de valeurs entières cela fait-il ?')">Vérifier</button>
        <div class="feedback" id="min2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Selon la règle de Hund, pour placer 3 électrons dans 3 orbitales p, il faut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min2e2" value="wrong"> tous les mettre dans la même orbitale</label>
          <label class="option"><input type="radio" name="min2e2" value="right"> un électron par orbitale, spins parallèles</label>
          <label class="option"><input type="radio" name="min2e2" value="wrong"> apparier deux électrons d'abord</label>
          <label class="option"><input type="radio" name="min2e2" value="wrong"> laisser une orbitale vide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min2e2','min2fb2','Correct — la règle de Hund impose d\\'occuper séparément chaque orbitale d\\'un même sous-niveau avant d\\'en apparier une.','La règle de Hund dit : chaque orbitale d\\'abord, appariement seulement après.')">Vérifier</button>
        <div class="feedback" id="min2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">À l'intérieur d'une période, en allant de gauche à droite, le rayon atomique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min2e3" value="wrong"> augmente</label>
          <label class="option"><input type="radio" name="min2e3" value="right"> diminue</label>
          <label class="option"><input type="radio" name="min2e3" value="wrong"> reste constant</label>
          <label class="option"><input type="radio" name="min2e3" value="wrong"> varie de façon imprévisible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min2e3','min2fb3','Correct — le rayon atomique diminue progressivement quand le numéro atomique augmente au sein d\\'une période.','La charge du noyau augmente le long d\\'une période, attirant plus fortement les électrons : quel effet sur la taille ?')">Vérifier</button>
        <div class="feedback" id="min2fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si Mendeleïev avait eu accès à la mécanique quantique dès le départ : aurait-il construit un tableau périodique différent de celui qu'il a effectivement proposé ?</li>
        <li>Pourquoi la règle de Hund privilégie-t-elle des électrons non appariés dans des orbitales séparées, plutôt que de les apparier au plus vite dans la même orbitale ?</li>
        <li>Quelle serait la conséquence, pour la chimie des éléments super-lourds, si les effets relativistes rendaient totalement caduques les tendances périodiques habituelles au-delà d'un certain numéro atomique ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>D. Mendeleïev, « Соотношение свойств с атомным весом элементов », Журнал Русского химического общества, 1869 — le tableau périodique original.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la structure électronique et la classification périodique en licence.</li>
        <li>P. Pyykkö, « Relativistic Effects in Chemistry: More Common Than You Thought », Annual Review of Physical Chemistry, 2012 — synthèse sur les effets relativistes dans la chimie des éléments lourds.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais de tous les outils pour prédire, à partir de la seule configuration électronique, le comportement chimique de n'importe quel élément. Le chapitre suivant, « Chimie de l'hydrogène », va appliquer concrètement ces principes au premier élément du tableau périodique — un élément si simple en apparence, mais dont la chimie se révèle d'une richesse surprenante. Comme le disait Mendeleïev lui-même, avec la confiance visionnaire qui a marqué sa découverte : son tableau permettait de prédire les propriétés d'éléments encore inconnus « avant même leur découverte ». Tu viens de comprendre, chapitre après chapitre, pourquoi cette prédiction était possible.</p>
  `,
  init: initMinConfig
};

MIN_NOVA_KB[minKey('Structure électronique et tableau périodique')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Structure électronique et tableau périodique ». Demande-moi comment fonctionnent les nombres quantiques, la règle de Hund, ou un indice sur un exercice.",
  rules: [
    { test:/nombre quantique/i, replies:["4 nombres quantiques décrivent un électron : n (niveau principal), l (sous-niveau, 0 à n−1), m (orientation, −l à +l), s (spin, +½ ou −½)."] },
    { test:/orbitale/i, replies:["Une orbitale est une région de l'espace où l'on a une certaine probabilité de trouver l'électron. s = sphérique, p = bilobée (3 orientations), d = trèfle à 4 lobes (5 orientations, dont une particulière dz²)."] },
    { test:/pauli/i, replies:["Le principe de Pauli : une orbitale contient au maximum 2 électrons, obligatoirement de spins opposés (+½ et −½)."] },
    { test:/hund/i, replies:["La règle de Hund : les électrons occupent d'abord toutes les orbitales d'un même sous-niveau séparément (spins parallèles) avant de commencer à en apparier une."] },
    { test:/configuration [ée]lectronique/i, replies:["On remplit les sous-couches par ordre d'énergie croissante (1s,2s,2p,3s,3p,4s,3d,4p...), en respectant Pauli (2 électrons max par case) et Hund (une case par orbitale avant d'apparier)."] },
    { test:/[ée]lectron.*valence/i, replies:["Les électrons de valence sont les électrons les plus externes (les moins liés au noyau) — ce sont eux qui participent aux réactions chimiques et qui déterminent les propriétés chimiques d'un élément."] },
    { test:/[ée]nergie d.ionisation/i, replies:["L'énergie d'ionisation est l'énergie nécessaire pour arracher un électron à un atome gazeux isolé. Elle augmente dans une période (de gauche à droite), et diminue dans un groupe (de haut en bas)."] },
    { test:/affinit[ée] [ée]lectronique/i, replies:["L'affinité électronique est l'énergie dégagée quand un atome gazeux capte un électron pour former un ion −1."] },
    { test:/rayon atomique/i, replies:["Le rayon atomique diminue dans une période (charge nucléaire croissante attire plus les électrons) et augmente dans un groupe (les couches électroniques s'ajoutent)."] },
    { test:/[ée]lectron[ée]gativit[ée]/i, replies:["L'électronégativité augmente dans une période et diminue dans un groupe — exactement comme l'énergie d'ionisation."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : m va de −l à +l.","Indice niveau 2 : pour l=2, ça fait −2,−1,0,+1,+2.","Indice niveau 3 : 5 valeurs, donc 5 orbitales."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la règle de Hund.","Indice niveau 2 : chaque orbitale d'abord, appariement ensuite.","Indice niveau 3 : un électron par orbitale, spins parallèles."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la charge du noyau qui augmente le long d'une période.","Indice niveau 2 : plus d'attraction sur les électrons.","Indice niveau 3 : le rayon atomique diminue."] }
  ]
};

/* =========================== CHAPITRE 3 — Chimie de l'hydrogène =========================== */
MIN_CHAPTERS[minKey('Chimie de l\'hydrogène')] = {
  objectives: [
    "Décrire l'état naturel, l'abondance et les isotopes de l'hydrogène",
    "Expliquer les propriétés physiques du dihydrogène et son inertie relative à basse température",
    "Distinguer les trois types d'hydrures et prévoir leur caractère ionique ou covalent",
    "Citer les principales méthodes de préparation industrielle et au laboratoire de H₂, et ses usages",
    "Évaluer pourquoi l'hydrogène, malgré sa position au sommet du tableau périodique, ne peut être classé sans ambiguïté ni parmi les alcalins ni parmi les halogènes"
  ],
  prereqs: ["Structure électronique et tableau périodique"],
  bodyHtml: `
    <p>Le 27 août 1783, le physicien français Jacques Charles fait décoller à Paris le premier ballon gonflé à l'hydrogène de l'histoire — un événement si spectaculaire qu'une foule immense, terrifiée en voyant l'engin s'écraser dans un village voisin quelques temps plus tard, le met en pièces à coups de fourche, persuadée d'avoir affaire à un monstre. Ce même gaz, si léger qu'il s'échappe presque instantanément de l'atmosphère terrestre vers l'espace, constitue pourtant environ 90 % de tous les atomes de l'Univers observable — la matière première à partir de laquelle se sont formées, par fusion nucléaire, toutes les étoiles et, par extension, la quasi-totalité des éléments chimiques plus lourds.</p>
    <p>Aujourd'hui, plus de deux siècles après le vol de Charles, l'hydrogène est envisagé comme l'un des piliers possibles de la transition énergétique mondiale : les piles à combustible à hydrogène, qui ne rejettent que de l'eau, sont développées comme alternative propre aux moteurs à combustion, tandis que l'hydrogène « vert », produit par électrolyse à partir d'énergies renouvelables, pourrait un jour remplacer une part significative des combustibles fossiles dans l'industrie lourde. Ce chapitre te donne les clés pour comprendre la chimie de cet élément à la fois simplissime et singulièrement complexe.</p>
    <p>L'hydrogène est l'élément le plus simple (1 proton) et le plus abondant de l'univers observable. Sa chimie, en apparence élémentaire, est en réalité double : il peut imiter aussi bien un alcalin qu'un halogène, ce qui en fait un cas à part dans le tableau périodique. À la fin de ce chapitre, tu sauras expliquer pourquoi l'hydrogène occupe une position si particulière, et connaître ses principales méthodes de préparation industrielle et ses usages.</p>

    <h3>1. État naturel et abondance</h3>
    <p>L'hydrogène représente environ <strong>90 %</strong> des atomes de l'univers (l'hélium vient au second rang, ~9 %). Sur Terre en revanche, le dihydrogène $H_2$ est très peu présent dans l'atmosphère : sa faible masse volumique (0,0899 g/L, ~14,5 fois moins dense que l'air) fait qu'il échappe à l'attraction gravitationnelle terrestre et se dissipe dans l'espace. On le trouve surtout à l'état combiné : eau, hydrocarbures, corps humain (~63 % du nombre total d'atomes).</p>

    <h3>2. Isotopes de l'hydrogène</h3>
    <table class="mini-table">
      <tr><th>Isotope</th><th>Composition du noyau</th><th>Abondance</th><th>Masse (u)</th></tr>
      <tr><td>Protium $^1H$</td><td>1 proton, 0 neutron</td><td>99,985 % (stable)</td><td>1,00783</td></tr>
      <tr><td>Deutérium $^2H$ (D)</td><td>1 proton, 1 neutron</td><td>0,015 % (stable)</td><td>2,0140</td></tr>
      <tr><td>Tritium $^3H$ (T)</td><td>1 proton, 2 neutrons</td><td>~10⁻⁴ % (radioactif)</td><td>3,01605</td></tr>
    </table>
    <p>Il existe aussi des isotopes extrêmement instables : le quadrium $^4H$ (demi-vie ≈ 1,39×10⁻²² s) et le $^7H$, l'isotope le plus riche en neutrons jamais isolé (demi-vie ≈ 10⁻²¹ s). Sur Terre, le deutérium se trouve surtout sous forme d'eau semi-lourde $HDO$.</p>
    <div class="key-point">
      <span class="eyebrow">Masse atomique moyenne</span>
      La masse atomique d'un élément naturel est la moyenne pondérée par l'abondance de chacun de ses isotopes. C'est le même principe qui permet, par exemple, de calculer la masse atomique moyenne du carbone à partir de $^{12}C$ (98,89 %, 12,00000 u) et $^{13}C$ (1,11 %, 13,00335 u).
    </div>

    <h3>3. Propriétés physiques du dihydrogène</h3>
    <p>Le dihydrogène $H_2$ est un gaz incolore, inodore, insipide, très peu soluble dans l'eau (0,0185 L/L). Il diffuse très facilement et conduit bien la chaleur ($C_v=2{,}5$ kcal/kg·K, $C_p=3{,}5$ kcal/kg·K). Dans les trois états, il n'est PAS conducteur électrique : la liaison $H-H$ est purement covalente, sans électrons ni ions libres.</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>$H_2$</th><th>$D_2$</th></tr>
      <tr><td>T° fusion</td><td>−259,2°C</td><td>−254,4°C</td></tr>
      <tr><td>T° ébullition</td><td>−252,8°C</td><td>−249,5°C</td></tr>
      <tr><td>Masse volumique (TPN)</td><td>0,0893 g/L</td><td>0,1786 g/L</td></tr>
      <tr><td>Longueur de liaison</td><td>0,0742 nm</td><td>0,0742 nm</td></tr>
      <tr><td>Énergie de dissociation</td><td>436 kJ/mol</td><td>442 kJ/mol</td></tr>
    </table>
    <p>Cette énergie de dissociation élevée explique la grande stabilité de $H_2$ (l'hydrogène n'existe quasiment jamais à l'état atomique, sauf transitoirement) ; on ne peut dissocier la molécule qu'à très haute température (2000–4000°C) ou sous rayonnement UV. Les basses températures de fusion/ébullition s'expliquent par des interactions de Van der Waals très faibles entre molécules $H_2$.</p>

    <h3>4. Réactivité et hydrures de l'hydrogène</h3>
    <p>L'hydrogène n'appartient officiellement ni à la famille des alcalins ni à celle des halogènes, mais il peut se comporter comme l'un ou l'autre : perdre son électron ($H^+$, comme un alcalin) ou en gagner un pour compléter sa couche de valence ($H^-$, comme un halogène).</p>
    <table class="mini-table">
      <tr><th>Type d'hydrure</th><th>Formé avec</th><th>Caractère de la liaison</th><th>Exemple</th></tr>
      <tr><td>Hydrure ionique</td><td>alcalins, alcalino-terreux</td><td>ionique, $H^-$</td><td>$Li^+H^-$, $Na^+H^-$, $Ca^{2+}2H^-$</td></tr>
      <tr><td>Hydrure métallique</td><td>métaux de transition</td><td>liaison métallique</td><td>$VH$</td></tr>
      <tr><td>Dérivé hydrogéné covalent</td><td>non-métaux</td><td>covalent à caractère ionique partiel</td><td>$HCl$, $NH_3$, $H_2O$</td></tr>
    </table>
    <p>Les hydrures alcalins cristallisent dans une structure de type $NaCl$ (4 anions + 4 cations par motif) : solides, incolores, très réactifs, conducteurs à l'état fondu. Plongés dans l'eau, ils réagissent violemment avec dégagement de dihydrogène : $2Li_{(s)}+H_{2(g)}\\to2LiH_{(s)}$ puis $LiH_{(s)}+H_2O_{(l)}\\to Li^+OH^-_{(aq)}+H_{2(g)}$.</p>
    <p>Pour les dérivés hydrogénés des non-métaux, le caractère ionique de la liaison dépend de l'électronégativité du non-métal : $HCl$ est plus ionique que $HI$, donc $HCl$ est moins stable que $HI$.</p>
    <div class="key-point">
      <span class="eyebrow">Ion H₃O⁺, pas H⁺</span>
      L'hydrogène ne possédant pas d'électrons de cœur, l'ion $H^+$ se lie très rapidement aux doublets libres des atomes voisins : la dissociation des acides en solution aqueuse conduit toujours à la formation d'ions <strong>$H_3O^+$</strong>, jamais d'ions $H^+$ isolés.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'hydrogène peut former un ion $H^+$ (en perdant son unique électron, comme un alcalin) ou un ion $H^-$ (en en captant un, comme un halogène). Sachant qu'un alcalin perd un électron pour atteindre la configuration du gaz rare précédent, et qu'un halogène en gagne un pour atteindre celle du gaz rare suivant, vers quelle configuration électronique stable l'hydrogène tend-il dans chacun de ces deux cas ?
    </div>

    <h3>5. Réactions caractéristiques de H₂</h3>
    <table class="mini-table">
      <tr><th>Réaction</th><th>Équation</th><th>Remarque</th></tr>
      <tr><td>Combustion (avec O₂)</td><td>$2H_2+O_2\\to2H_2O$</td><td>très exothermique (−285 kJ/mol) ; explosive entre 5 et 70 % de $H_2$ dans l'air ; chalumeau à hydrogène</td></tr>
      <tr><td>Avec les halogènes</td><td>$H_2+X_2\\to2HX$</td><td>explosive avec $F_2$ (même à froid) ; nécessite un chauffage avec $Br_2$, $I_2$</td></tr>
      <tr><td>Avec l'azote</td><td>$3H_2+N_2\\to2NH_3$</td><td>synthèse de l'ammoniac (procédé Haber-Bosch)</td></tr>
    </table>

    <h3>6. Préparation de l'hydrogène</h3>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Principe</th><th>Remarque</th></tr>
      <tr><td>Électrolyse de l'eau</td><td>$H_2O \\to 2H_2+O_2$</td><td>H₂ très pur, mais coûteux en électricité</td></tr>
      <tr><td>Vapeur d'eau sur hydrocarbures</td><td>$C_nH_{2n+2}+nH_2O \\to nCO+(2n+1)H_2$</td><td>catalyseurs, haute température ; méthode industrielle préférée (moins chère)</td></tr>
      <tr><td>Vapeur d'eau sur le carbone</td><td>$H_2O+C\\to CO+H_2$</td><td>charbon chauffé au rouge (~1000°C)</td></tr>
      <tr><td>Acide dilué sur un métal (labo)</td><td>$Mg+2HCl\\to MgCl_2+H_2$</td><td>ex. aussi $Zn+H_2SO_4\\to ZnSO_4+H_2$</td></tr>
      <tr><td>Métal alcalin sur l'eau (labo)</td><td>$2Na+2H_2O\\to H_2+2NaOH$</td><td>réaction spontanée, très exothermique</td></tr>
      <tr><td>Eau sur un hydrure métallique</td><td>$CaH_2+2H_2O\\to Ca(OH)_2+2H_2$</td><td></td></tr>
    </table>

    <h3>7. Utilisations de l'hydrogène</h3>
    <p>Environ 50 % de la production mondiale de $H_2$ sert à la synthèse de l'ammoniac, 37 % au raffinage des hydrocarbures, 12 % à la synthèse du méthanol ; le reste sert à l'hydrogénation des graisses et huiles, à la synthèse d'alcools et d'aldéhydes, et à la fabrication de $HCl$. Le deutérium est utilisé dans les applications nucléaires pour ralentir les neutrons.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'hydrogène est aujourd'hui envisagé comme vecteur énergétique majeur de la transition écologique, alors même que sa production actuelle repose encore très majoritairement sur le reformage d'hydrocarbures (une méthode qui émet du CO₂). Pourquoi la couleur associée à l'hydrogène (« gris », « bleu », « vert ») dépend-elle entièrement de la méthode de production utilisée, et non de l'hydrogène lui-même, chimiquement identique dans tous les cas ?
    </div>

    <h3>8. Frontière de la recherche</h3>
    <p>L'hydrogène « vert », produit par électrolyse de l'eau alimentée par des énergies renouvelables (solaire, éolien), est aujourd'hui au cœur de nombreuses stratégies nationales de décarbonation de l'industrie lourde (sidérurgie, chimie) et des transports longue distance (camions, avions, navires) difficiles à électrifier directement par batterie. Les piles à combustible, qui exploitent la réaction inverse de l'électrolyse ($2H_2+O_2\\to2H_2O$, avec production directe d'électricité plutôt que de chaleur), équipent déjà certains véhicules commerciaux et sont activement développées pour des applications stationnaires de production d'électricité décentralisée.</p>
    <p><strong>Question ouverte :</strong> peut-on réduire suffisamment le coût de production de l'hydrogène vert par électrolyse pour qu'il devienne compétitif à grande échelle face aux méthodes de production actuelles basées sur les hydrocarbures ? C'est un enjeu économique et technologique majeur pour la transition énergétique mondiale.</p>
    <p><strong>Technologie émergente :</strong> les électrolyseurs à haute température (électrolyse à oxyde solide), qui exploitent la chaleur perdue de procédés industriels pour améliorer significativement le rendement énergétique de la production d'hydrogène, sont en développement actif pour réduire le coût de l'hydrogène vert.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Élément le plus simple et abondant → 3 isotopes (protium, deutérium, tritium) → dihydrogène très stable (436 kJ/mol) → hydrures ioniques ou covalents selon le partenaire → préparation industrielle et usages énergétiques
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$2H_2 + O_2 \\to 2H_2O \\qquad (\\Delta H = -285\\ \\text{kJ/mol})$$
      Cette réaction de combustion, aussi ancienne que l'expérience de Cavendish ayant identifié l'hydrogène en 1766, est aujourd'hui au cœur des espoirs de décarbonation de l'industrie mondiale : elle ne produit que de l'eau, sans aucune émission de carbone, à condition que l'hydrogène consommé ait lui-même été produit sans combustible fossile.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>L'hydrogène possède 3 isotopes stables/quasi-stables : protium (0 n), deutérium (1 n), tritium (2 n, radioactif)</li>
        <li>La liaison H−H est covalente pure, très stable (436 kJ/mol) : H₂ n'existe presque jamais à l'état atomique</li>
        <li>L'hydrogène forme des hydrures ioniques (H⁻, avec alcalins/alcalino-terreux) ou des dérivés covalents (avec non-métaux)</li>
        <li>En solution aqueuse, un acide libère toujours H₃O⁺, jamais H⁺ isolé</li>
        <li>Industriellement, H₂ sert surtout à synthétiser l'ammoniac (50 %) et à raffiner les hydrocarbures (37 %)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Écrire H⁺ libre en solution aqueuse au lieu de H₃O⁺</li>
        <li>Croire que l'hydrogène appartient à la famille des alcalins — il n'appartient officiellement à aucune des deux familles, même s'il peut imiter leur comportement</li>
        <li>Oublier que HCl est plus ionique mais MOINS stable que HI (c'est l'électronégativité du non-métal qui pilote le caractère ionique, pas la stabilité)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — masse atomique moyenne (mélange isotopique)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre l'abondance et la masse de 2 isotopes : le calculateur donne la masse atomique moyenne pondérée.</p>
      <div class="sim-controls">
        <label>Abondance iso. 1 (%) : <input type="number" id="minAb1" value="99.985" style="width:80px;" oninput="updateMinMasseMoyenne()"></label>
        <label>Masse iso. 1 (u) : <input type="number" id="minM1" value="1.00783" style="width:80px;" oninput="updateMinMasseMoyenne()"></label>
        <label>Abondance iso. 2 (%) : <input type="number" id="minAb2" value="0.015" style="width:80px;" oninput="updateMinMasseMoyenne()"></label>
        <label>Masse iso. 2 (u) : <input type="number" id="minM2" value="2.0140" style="width:80px;" oninput="updateMinMasseMoyenne()"></label>
        <div class="sim-readout" id="minMasseMoyReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'isotope de l'hydrogène dont le noyau contient un proton et un neutron est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min3e1" value="wrong"> le protium</label>
          <label class="option"><input type="radio" name="min3e1" value="right"> le deutérium</label>
          <label class="option"><input type="radio" name="min3e1" value="wrong"> le tritium</label>
          <label class="option"><input type="radio" name="min3e1" value="wrong"> l'hélium</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min3e1','min3fb1','Correct — le deutérium (²H ou D) a un proton et un neutron ; le protium n\\'a pas de neutron, le tritium en a deux.','Le protium n\\'a pas de neutron, le tritium en a deux : lequel en a exactement un ?')">Vérifier</button>
        <div class="feedback" id="min3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">En solution aqueuse, la dissociation d'un acide fort produit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min3e2" value="wrong"> des ions H⁺ libres</label>
          <label class="option"><input type="radio" name="min3e2" value="right"> des ions H₃O⁺</label>
          <label class="option"><input type="radio" name="min3e2" value="wrong"> des ions H⁻</label>
          <label class="option"><input type="radio" name="min3e2" value="wrong"> uniquement H₂</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min3e2','min3fb2','Correct — H+ n\\'a pas d\\'électrons de cœur et se lie immédiatement à un doublet libre d\\'une molécule d\\'eau voisine, formant H3O+.','L\\'ion H+ est si petit et réactif qu\\'il ne reste jamais libre en solution aqueuse.')">Vérifier</button>
        <div class="feedback" id="min3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le procédé industriel le plus utilisé pour produire H₂ à grande échelle (moins coûteux que l'électrolyse) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min3e3" value="wrong"> l'électrolyse de l'eau</label>
          <label class="option"><input type="radio" name="min3e3" value="right"> la vapeur d'eau sur les hydrocarbures</label>
          <label class="option"><input type="radio" name="min3e3" value="wrong"> l'action d'un acide sur un métal</label>
          <label class="option"><input type="radio" name="min3e3" value="wrong"> l'action de l'eau sur un hydrure</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min3e3','min3fb3','Correct — la vapeur d\\'eau sur les hydrocarbures est préférée à l\\'électrolyse car elle utilise des substances peu coûteuses.','L\\'électrolyse consomme beaucoup d\\'électricité et coûte cher — quelle autre méthode est «préférée» dans le cours ?')">Vérifier</button>
        <div class="feedback" id="min3fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'hydrogène pouvait exister naturellement en abondance à l'état de dihydrogène gazeux dans l'atmosphère terrestre : à quels risques industriels et domestiques serions-nous exposés au quotidien ?</li>
        <li>Pourquoi le tritium, isotope radioactif de l'hydrogène, est-il malgré tout présent naturellement dans l'atmosphère, bien qu'en quantité infinitésimale ?</li>
        <li>Quelle serait la conséquence, pour la transition énergétique mondiale, d'une avancée majeure réduisant drastiquement le coût de production de l'hydrogène vert par électrolyse ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. Cavendish, « Three Papers, Containing Experiments on Factitious Air », Philosophical Transactions of the Royal Society, 1766 — première identification expérimentale de l'hydrogène.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la chimie de l'hydrogène en licence.</li>
        <li>Agence Internationale de l'Énergie (AIE), <em>The Future of Hydrogen</em>, rapport de référence, 2019 — synthèse sur le rôle de l'hydrogène dans la transition énergétique mondiale.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais pourquoi l'hydrogène, malgré son apparente simplicité, occupe une position si singulière dans le tableau périodique, et connais ses principales applications industrielles et énergétiques. Le chapitre suivant, « Chimie de l'oxygène », va explorer l'élément qui, combiné à l'hydrogène, forme la molécule d'eau — la substance la plus essentielle à la vie sur Terre. Comme le rappelle l'histoire du premier vol en ballon à hydrogène de Jacques Charles : un gaz aussi simple que l'hydrogène a toujours su, à chaque époque, inspirer autant l'émerveillement que les grandes ambitions technologiques.</p>
  `,
  init: function(){ if(typeof updateMinMasseMoyenne === 'function') updateMinMasseMoyenne(); }
};

function updateMinMasseMoyenne(){
  const a1 = parseFloat(document.getElementById('minAb1').value) || 0;
  const m1 = parseFloat(document.getElementById('minM1').value) || 0;
  const a2 = parseFloat(document.getElementById('minAb2').value) || 0;
  const m2 = parseFloat(document.getElementById('minM2').value) || 0;
  const total = a1 + a2;
  const moy = total > 0 ? (a1*m1 + a2*m2) / total : 0;
  document.getElementById('minMasseMoyReadout').innerHTML =
    `M = (${a1}×${m1} + ${a2}×${m2}) / ${total.toFixed(3)} = <strong>${moy.toFixed(5)} u</strong>`;
}

MIN_NOVA_KB[minKey('Chimie de l\'hydrogène')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Chimie de l'hydrogène ». Demande-moi la différence entre les hydrures, comment on prépare H₂, ou un indice sur un exercice.",
  rules: [
    { test:/isotope.*hydrog[èe]ne|protium|deut[ée]rium|tritium/i, replies:["Protium (1H) : 1 proton, 0 neutron. Deutérium (2H, D) : 1 proton, 1 neutron. Tritium (3H, T) : 1 proton, 2 neutrons (radioactif)."] },
    { test:/hydrure ionique|hydrure m[ée]tallique/i, replies:["Les hydrures ioniques se forment avec les alcalins/alcalino-terreux (H⁻, ex. LiH). Les hydrures métalliques se forment avec les métaux de transition (ex. VH, liaison métallique)."] },
    { test:/h3o.|h.o\+/i, replies:["En solution aqueuse, H+ n'existe jamais libre : il se lie immédiatement à une molécule d'eau pour former H3O+."] },
    { test:/pr[ée]paration.*hydrog[èe]ne|[ée]lectrolyse/i, replies:["L'électrolyse de l'eau donne du H2 très pur mais coûteux. Industriellement, on utilise surtout la vapeur d'eau sur les hydrocarbures ou sur le carbone chauffé."] },
    { test:/combustion|explosi[fv]/i, replies:["La combustion de H2 (2H2+O2→2H2O) dégage 285 kJ/mol. Le mélange air/H2 est explosif entre 5 et 70% de H2 — en dehors de cette plage, pas d'explosion."] },
    { test:/utilisation|usage/i, replies:["50% de H2 sert à synthétiser l'ammoniac, 37% au raffinage des hydrocarbures, 12% à la synthèse du méthanol."] },
    { test:/masse atomique moyenne|isotope.*masse/i, replies:["La masse atomique moyenne d'un élément = somme pondérée (abondance × masse) de chacun de ses isotopes, divisée par 100%."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare les 3 isotopes par leur nombre de neutrons.","Indice niveau 2 : protium=0 neutron, tritium=2 neutrons.","Indice niveau 3 : c'est le deutérium, avec 1 neutron."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : H+ est extrêmement réactif et petit.","Indice niveau 2 : il se lie tout de suite à une molécule d'eau voisine.","Indice niveau 3 : ça forme H3O+."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : l'électrolyse est chère en électricité.","Indice niveau 2 : le cours dit que cette autre méthode est «préférée» pour son faible coût.","Indice niveau 3 : c'est la vapeur d'eau sur les hydrocarbures."] }
  ]
};

/* =========================== CHAPITRE 4 — Chimie de l'oxygène =========================== */
MIN_CHAPTERS[minKey('Chimie de l\'oxygène')] = {
  objectives: [
    "Décrire l'état naturel et les formes allotropiques de l'oxygène (O, O₂, O₃)",
    "Classer un oxyde selon son caractère acide, basique, amphotère ou neutre, chimiquement et structuralement",
    "Citer les méthodes de préparation industrielle et au laboratoire de O₂",
    "Utiliser le cycle de Born-Haber pour interpréter l'énergie réticulaire d'un oxyde ionique",
    "Évaluer pourquoi la couche d'ozone stratosphérique, formée de la même molécule que l'ozone toxique au niveau du sol, est pourtant vitale à la vie terrestre"
  ],
  prereqs: ["Chimie de l\'hydrogène"],
  bodyHtml: `
    <p>Il y a environ 2,4 milliards d'années, un événement d'une ampleur planétaire baptisé aujourd'hui « Grande Oxydation » transforme radicalement l'atmosphère terrestre : des cyanobactéries, en développant la photosynthèse, commencent à rejeter massivement de l'oxygène — un gaz alors toxique pour la quasi-totalité des formes de vie existantes, adaptées à une atmosphère primitive sans oxygène. Cet événement, l'une des plus grandes extinctions de masse de l'histoire de la vie sur Terre, ouvre pourtant la voie à l'explosion ultérieure de la biodiversité complexe, aérobie, qui domine aujourd'hui notre planète — l'oxygène toxique d'hier est devenu la molécule indispensable à toute respiration cellulaire moderne.</p>
    <p>Cette même molécule d'oxygène, sous sa forme triatomique instable qu'est l'ozone, joue aujourd'hui un rôle protecteur tout aussi vital : la couche d'ozone stratosphérique absorbe la quasi-totalité des rayons ultraviolets les plus dangereux du Soleil, sans laquelle la vie terrestre telle que nous la connaissons — exposée à un rayonnement mutagène intense — n'aurait probablement jamais pu se développer sur les continents. La découverte, dans les années 1980, d'un « trou » dans cette couche protectrice au-dessus de l'Antarctique, causé par les gaz chlorofluorocarbures (CFC) industriels, reste l'un des grands succès de la coopération scientifique et diplomatique internationale, ayant abouti au protocole de Montréal.</p>
    <p>Sur Terre, l'oxygène est l'élément le plus abondant (50 % de la masse de la lithosphère, 88,8 % de celle de l'hydrosphère) ; dans l'univers, il vient au 3ᵉ rang après H et He. Très électronégatif, il réagit avec presque tous les éléments du tableau périodique pour former des oxydes. À la fin de ce chapitre, tu sauras classer n'importe quel oxyde selon son caractère chimique, et comprendre pourquoi l'ozone, toxique au niveau du sol, devient vital en haute altitude.</p>

    <h3>1. Isotopes et formes allotropiques</h3>
    <table class="mini-table">
      <tr><th>Isotope</th><th>Abondance</th><th>Masse (u)</th></tr>
      <tr><td>$^{16}O$</td><td>99,76 %</td><td>15,9949</td></tr>
      <tr><td>$^{17}O$</td><td>0,04 %</td><td>16,9991</td></tr>
      <tr><td>$^{18}O$</td><td>0,20 %</td><td>17,9991</td></tr>
    </table>
    <p>Dans l'atmosphère, l'oxygène existe sous trois formes allotropiques : $O$ (atomique), $O_2$ (dioxygène, la forme courante), $O_3$ (ozone, triatomique). Le tétraoxygène $O_4$, instable, n'existe que dans le dioxygène liquide.</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>$O_2$</th><th>$O_3$</th></tr>
      <tr><td>Couleur (gaz)</td><td>incolore, inodore, insipide</td><td>légèrement bleuté, odeur piquante, dangereux à respirer</td></tr>
      <tr><td>T° fusion / T° ébullition</td><td>−218,3°C / −183,0°C</td><td>−193°C (solide) / −112°C (liquéfaction)</td></tr>
      <tr><td>Solubilité dans l'eau</td><td>30 cm³/L (20°C) à 21 cm³/L (50°C)</td><td>~490 cm³/L à 0°C (plus soluble que O₂)</td></tr>
      <tr><td>Masse volumique / longueur de liaison / énergie de dissociation</td><td>1,429 g/L ; 0,12 nm ; 498 kJ/mol</td><td>—</td></tr>
    </table>
    <p>$O_3$ se décompose selon $O_3 \\to \\frac32 O_2$ ($\\Delta H_r^\\circ(298) = -142$ kJ/mol) : les molécules $O_3$, plus volumineuses que $O_2$, ont des interactions de Van der Waals plus intenses, d'où des températures de liquéfaction/solidification plus élevées. Le trioxygène est instable et explosif à l'état liquide ou solide.</p>

    <h3>2. Préparation de l'oxygène</h3>
    <p>Industriellement, ~95 % de l'oxygène est produit par <strong>distillation (fractionnement) de l'air liquide</strong>, procédé peu coûteux, en s'appuyant sur les écarts de températures d'ébullition : $N_2=-196°C$, $Ar=-186°C$, $O_2=-183°C$. L'électrolyse, plus coûteuse, n'est utilisée que pour obtenir de l'oxygène très pur. Au laboratoire, on décompose thermiquement des composés riches en oxygène : $2HgO\\to2Hg+O_2$ ; $2KClO_3\\to2KCl+3O_2$.</p>

    <h3>3. Réactivité de l'oxygène : liaisons possibles</h3>
    <p>Configuration de $_8O$ : $1s^22s^22p^4$. L'oxygène peut : gagner deux électrons pour former l'ion oxyde $O^{2-}$ (composés ioniques) ; former deux liaisons covalentes simples ou une liaison double (ex. $H_2O$, $CO_2$) ; former une liaison covalente avec gain d'un électron (ex. ion hydroxyde $OH^-$, hydrogénocarbonate $HCO_3^-$) ; ou une tricoordination (ex. $H_3O^+$).</p>

    <h3>4. Classification chimique des oxydes</h3>
    <table class="mini-table">
      <tr><th>Classe</th><th>Comportement</th><th>Exemple</th></tr>
      <tr><td>Oxyde acide (covalent, non-métaux)</td><td>réagit avec l'eau pour donner un acide, ou se dissout en milieu basique s'il est insoluble</td><td>$SO_2+H_2O\\to H_2SO_3$ ; $SiO_2+2NaOH\\to Na_2SiO_3+H_2O$</td></tr>
      <tr><td>Oxyde basique (ionique, métaux)</td><td>se dissocie en ions dans l'eau ; $O^{2-}$ réagit avec l'eau pour donner $OH^-$ ; se dissout aussi dans les acides</td><td>$Na_2O+H_2O\\to2NaOH$ ; $MgO+2HCl\\to MgCl_2+H_2O$</td></tr>
      <tr><td>Oxyde amphotère</td><td>se comporte comme un acide OU une base selon le milieu</td><td>$ZnO+2H^+\\to Zn^{2+}+H_2O$ ; $ZnO+2OH^-+H_2O\\to[Zn(OH)_4]^{2-}$</td></tr>
      <tr><td>Oxyde neutre</td><td>ne se dissout ni dans les acides ni dans les bases</td><td>$CO$, $N_2O$</td></tr>
    </table>
    <p>Autres oxydes covalents typiques : $SO_2$ ($T_{fus}=-75{,}46°C$), $CO_2$ (se sublime, $-78{,}5°C$), $SiO_2$ ($T_{fus}=1550°C$, réseau covalent géant). En présence d'un excès d'oxygène, certains métaux alcalins forment des <strong>peroxydes</strong> ($Na_2O_2$, D.O. de O $=-1$) ou des <strong>superoxydes</strong> ($KO_2$, D.O. de O $=-\\frac12$) : $KO_2$ sert de revitaliseur d'air dans les respirateurs autonomes, se décomposant selon $4KO_2\\to2K_2O+3O_2$ puis $K_2O+CO_2\\to K_2CO_3$ (absorption du $CO_2$).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La tendance acide/basique des oxydes suit une logique périodique claire : les oxydes des éléments les plus métalliques (à gauche du tableau) sont basiques, ceux des non-métaux (à droite) sont acides, avec une zone amphotère à la frontière (comme ZnO ou Al₂O₃). En reliant cela à l'électronégativité étudiée au chapitre 2, pourquoi un oxyde formé avec un élément très électronégatif a-t-il tendance à être acide plutôt que basique ?
    </div>

    <h3>5. Classification structurale et énergie réticulaire des oxydes ioniques</h3>
    <p>Un oxyde comme $MgO$ ($Mg^{2+}O^{2-}$) cristallise dans une structure de type $NaCl$. L'<strong>énergie réticulaire</strong> $E_R$ (énergie dégagée quand $M^{2+}_{(g)}$ et $O^{2-}_{(g)}$ se rassemblent pour former $MO_{(s)}$) se détermine par le cycle de Born-Haber :</p>
    <p style="text-align:center;">$\\Delta H_f = E_{sub}(M) + E_d(O_2) + E_i(M) + A_e(O) + E_R$</p>
    <p>soit $E_R = -[E_{sub}(M)+E_d(O_2)+E_i(M)+A_e(O)] + \\Delta H_f$.</p>
    <table class="mini-table">
      <tr><th>Compacité $r^+/r^-$</th><th>Indice de coordination</th><th>Arrangement structural</th></tr>
      <tr><td>0,732 ≤ $r^+/r^-$ &lt; 1</td><td>8</td><td>cubique</td></tr>
      <tr><td>0,414 ≤ $r^+/r^-$ &lt; 0,732</td><td>6</td><td>octaédrique</td></tr>
      <tr><td>0,225 ≤ $r^+/r^-$ &lt; 0,414</td><td>4</td><td>tétraédrique</td></tr>
    </table>
    <p>Pour qu'un cristal ionique soit stable, les anions autour d'un cation doivent être tous en contact avec lui, et l'indice de coordination doit être aussi grand que possible tout en respectant cette condition.</p>

    <h3>6. Importance et atmosphère</h3>
    <p>Applications principales de l'oxygène (par ordre d'importance) : fabrication de l'acier et d'autres alliages ; fabrication de l'oxyde d'éthylène (stérilisation médicale) et du chlorure de vinyle (PVC) ; propulsion de fusées ; usage médical (oxygénothérapie). Composition approximative de l'air : $N_2$ 78,09 % ; $O_2$ 20,95 % ; $Ar$ 0,93 %. Le $CO_2$ absorbe environ 20 % de l'énergie solaire (effet de serre) — sans lui, la température terrestre serait d'environ −25°C. Les oxydes de soufre et d'azote (rejetés par la combustion) sont à l'origine des pluies acides.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le protocole de Montréal (1987), qui a interdit progressivement les CFC responsables de la destruction de la couche d'ozone stratosphérique, est aujourd'hui considéré comme l'un des traités environnementaux internationaux les plus efficaces de l'histoire — la couche d'ozone est en voie de reconstitution. Qu'est-ce que ce succès révèle sur les conditions nécessaires (scientifiques, économiques, diplomatiques) pour qu'un accord environnemental mondial puisse réellement inverser un dommage planétaire déjà engagé ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>Malgré le succès du protocole de Montréal, les scientifiques atmosphériques continuent de surveiller étroitement l'évolution de la couche d'ozone, notamment face à l'émergence de nouvelles substances chimiques industrielles dont les effets sur la chimie atmosphérique restent parfois mal caractérisés. Par ailleurs, la recherche sur l'ozone troposphérique (au niveau du sol), polluant majeur issu des activités humaines et contribuant au réchauffement climatique, mobilise aujourd'hui des efforts considérables pour améliorer les modèles de qualité de l'air dans les grandes agglomérations urbaines.</p>
    <p><strong>Question ouverte :</strong> comment concilier la nécessité de refroidir les bâtiments et véhicules à l'échelle mondiale (climatisation, réfrigération) avec l'impératif de ne pas utiliser de nouveaux gaz réfrigérants qui, comme les CFC autrefois, s'avéreraient nocifs pour l'atmosphère sur le long terme ? C'est un défi de recherche actif en chimie des matériaux et en science atmosphérique.</p>
    <p><strong>Technologie émergente :</strong> les capteurs satellitaires de nouvelle génération, capables de mesurer avec une précision croissante la concentration d'ozone stratosphérique et troposphérique à l'échelle planétaire, permettent aujourd'hui un suivi en temps quasi réel de l'état de l'atmosphère terrestre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Oxygène (très électronégatif) → 3 formes allotropiques (O, O₂, O₃) → oxydes acides/basiques/amphotères/neutres selon l'électronégativité du partenaire → cycle de Born-Haber (énergie réticulaire) → applications industrielles et rôle atmosphérique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta H_f = E_{sub}(M) + E_d(O_2) + E_i(M) + A_e(O) + E_R$$
      Ce cycle de Born-Haber, appliqué ici aux oxydes ioniques, illustre une fois de plus la puissance de la loi de Hess : décomposer une réaction directe en une succession d'étapes hypothétiques mais physiquement interprétables, chacune mesurable ou calculable séparément.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>O₂, O₃ et O (atomique) sont les 3 formes allotropiques de l'oxygène ; O₃ est instable et se décompose en O₂ (−142 kJ/mol)</li>
        <li>Un oxyde peut être acide, basique, amphotère ou neutre selon sa réaction avec l'eau/les acides/les bases</li>
        <li>Peroxyde : O au D.O. −1 (Na₂O₂). Superoxyde : O au D.O. −1/2 (KO₂)</li>
        <li>Le cycle de Born-Haber relie l'énergie réticulaire d'un oxyde ionique aux énergies de sublimation, dissociation, ionisation et affinité électronique</li>
        <li>La compacité r⁺/r⁻ fixe l'indice de coordination d'un cristal ionique (4 : tétraédrique, 6 : octaédrique, 8 : cubique)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre oxyde basique (réagit avec un acide) et oxyde acide (réagit avec une base) — le sens est parfois contre-intuitif</li>
        <li>Oublier qu'un oxyde amphotère (ex. ZnO) réagit avec les DEUX (acides ET bases), contrairement à un oxyde neutre qui ne réagit avec AUCUN</li>
        <li>Confondre peroxyde (D.O. −1) et superoxyde (D.O. −1/2) de l'oxygène</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un oxyde comme ZnO, qui réagit à la fois avec les acides et avec les bases, est dit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min4e1" value="wrong"> acide</label>
          <label class="option"><input type="radio" name="min4e1" value="wrong"> basique</label>
          <label class="option"><input type="radio" name="min4e1" value="right"> amphotère</label>
          <label class="option"><input type="radio" name="min4e1" value="wrong"> neutre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min4e1','min4fb1','Correct — un oxyde amphotère se comporte comme un acide face à une base, et comme une base face à un acide.','Le préfixe « amphi- » veut dire « des deux côtés » — ça te rappelle un mot en chimie ?')">Vérifier</button>
        <div class="feedback" id="min4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans le superoxyde KO₂, le degré d'oxydation de l'oxygène est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min4e2" value="wrong"> −2</label>
          <label class="option"><input type="radio" name="min4e2" value="wrong"> −1</label>
          <label class="option"><input type="radio" name="min4e2" value="right"> −1/2</label>
          <label class="option"><input type="radio" name="min4e2" value="wrong"> 0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min4e2','min4fb2','Correct — dans un superoxyde comme KO2, l\\'oxygène est au degré d\\'oxydation −1/2 (contre −1 dans un peroxyde comme Na2O2).','Attention à ne pas confondre avec le peroxyde, qui est à −1 : le superoxyde a un ion O2− encore moins réduit.')">Vérifier</button>
        <div class="feedback" id="min4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un cristal ionique MX avec un rapport r⁺/r⁻ = 0,5 aura un indice de coordination de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min4e3" value="wrong"> 4 (tétraédrique)</label>
          <label class="option"><input type="radio" name="min4e3" value="right"> 6 (octaédrique)</label>
          <label class="option"><input type="radio" name="min4e3" value="wrong"> 8 (cubique)</label>
          <label class="option"><input type="radio" name="min4e3" value="wrong"> 12</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min4e3','min4fb3','Correct — 0,414 ≤ 0,5 < 0,732 correspond à l\\'intervalle de l\\'arrangement octaédrique, indice de coordination 6.','Retrouve dans quel intervalle 0,5 se situe : 0,225-0,414 ? 0,414-0,732 ? 0,732-1 ?')">Vérifier</button>
        <div class="feedback" id="min4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si la Grande Oxydation ne s'était jamais produite (si les cyanobactéries n'avaient jamais développé la photosynthèse oxygénique) : à quoi ressemblerait la vie sur Terre aujourd'hui ?</li>
        <li>Pourquoi l'ozone, si toxique lorsqu'on le respire directement au niveau du sol, devient-il au contraire indispensable à la vie une fois présent en haute altitude ?</li>
        <li>Quelle serait la conséquence, pour la diplomatie environnementale internationale, d'un nouvel accord mondial aussi efficace que le protocole de Montréal appliqué cette fois aux gaz à effet de serre ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>J. C. Farman, B. G. Gardiner, J. D. Shanklin, « Large Losses of Total Ozone in Antarctica Reveal Seasonal ClOx/NOx Interaction », Nature, 1985 — l'article ayant révélé le trou de la couche d'ozone.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la chimie de l'oxygène en licence.</li>
        <li>Programme des Nations Unies pour l'Environnement (PNUE), <em>Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone</em>, 1987 et amendements ultérieurs.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais classer n'importe quel oxyde selon son caractère chimique, et comprendre pourquoi l'oxygène, sous ses différentes formes, joue un rôle aussi vital que potentiellement dangereux dans l'atmosphère terrestre. Le chapitre suivant, « Les halogènes », va explorer une famille d'éléments à l'électronégativité extrême, aux applications industrielles et biologiques tout aussi fascinantes. Comme le rappelle l'histoire de la Grande Oxydation : ce qui fut un poison mortel pour la vie primitive est devenu, par un extraordinaire retournement évolutif, la molécule la plus indispensable à la respiration de la quasi-totalité des espèces complexes qui peuplent aujourd'hui notre planète.</p>
  `
};

MIN_NOVA_KB[minKey('Chimie de l\'oxygène')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Chimie de l'oxygène ». Demande-moi comment classer un oxyde, ce qu'est le cycle de Born-Haber, ou un indice sur un exercice.",
  rules: [
    { test:/oxyde (acide|basique|amphot[èe]re|neutre)/i, replies:["Oxyde acide : réagit avec l'eau pour donner un acide (ex. SO2). Oxyde basique : se dissocie en ions, forme OH- avec l'eau (ex. Na2O). Amphotère : se comporte comme acide OU base selon le milieu (ex. ZnO). Neutre : ne réagit ni avec les acides ni avec les bases (ex. CO)."] },
    { test:/peroxyde|superoxyde/i, replies:["Peroxyde (ex. Na2O2) : oxygène au degré d'oxydation −1. Superoxyde (ex. KO2) : oxygène au degré d'oxydation −1/2."] },
    { test:/ozone|o3/i, replies:["L'ozone O3 est instable et se décompose en dioxygène : O3 → 3/2 O2 (très exothermique, ΔH°=-142 kJ/mol). Il est aussi plus soluble dans l'eau que O2."] },
    { test:/born.?haber|[ée]nergie r[ée]ticulaire/i, replies:["Le cycle de Born-Haber relie l'enthalpie de formation d'un oxyde ionique MO à l'énergie réticulaire ER : ΔHf = Esub(M) + Ed(O2) + Ei(M) + Ae(O) + ER."] },
    { test:/coordination|compacit[ée]/i, replies:["L'indice de coordination dépend du rapport r+/r- : 0,225-0,414 → tétraédrique (4) ; 0,414-0,732 → octaédrique (6) ; 0,732-1 → cubique (8)."] },
    { test:/pr[ée]paration.*oxyg[èe]ne/i, replies:["Industriellement, 95% de l'oxygène vient de la distillation de l'air liquide (peu coûteuse). Au laboratoire, on décompose thermiquement des composés comme KClO3 ou HgO."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le mot vient du grec « des deux côtés ».","Indice niveau 2 : ça se comporte comme acide ET comme base.","Indice niveau 3 : c'est un oxyde amphotère."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : ne confonds pas avec le peroxyde (−1).","Indice niveau 2 : le superoxyde a un degré encore plus proche de 0.","Indice niveau 3 : c'est −1/2."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : situe 0,5 dans les 3 intervalles de compacité.","Indice niveau 2 : 0,5 est entre 0,414 et 0,732.","Indice niveau 3 : c'est l'arrangement octaédrique, coordinence 6."] }
  ]
};

/* =========================== CHAPITRE 5 — Les halogènes =========================== */
MIN_CHAPTERS[minKey('Les halogènes')] = {
  objectives: [
    "Décrire la configuration électronique commune des halogènes et son influence sur leurs propriétés atomiques",
    "Comparer la réactivité des dihalogènes vis-à-vis de l'eau et de l'hydrogène",
    "Distinguer halogénures ioniques et covalents, et prévoir leur caractère à partir de l'électronégativité",
    "Situer les degrés d'oxydation des halogènes dans leurs composés oxygénés",
    "Évaluer pourquoi HF, contrairement à tous les autres halogénures d'hydrogène, se comporte comme un acide faible malgré l'électronégativité extrême du fluor"
  ],
  prereqs: ["Chimie de l\'oxygène"],
  bodyHtml: `
    <p>Le fluor, l'élément le plus électronégatif de tout le tableau périodique, est resté insaisissable pendant près d'un siècle après sa prédiction théorique : sa réactivité est si extrême qu'il attaque presque tous les matériaux connus, y compris le verre des récipients censés le contenir. Il faudra attendre 1886 pour qu'Henri Moissan parvienne enfin à l'isoler, au prix d'une électrolyse menée à très basse température dans un appareillage en platine et en fluorine — une prouesse expérimentale qui lui vaudra le prix Nobel de chimie en 1906, après que plusieurs de ses prédécesseurs aient été gravement intoxiqués, voire tués, dans leurs propres tentatives d'isolement.</p>
    <p>Cette réactivité extrême, loin d'être une simple curiosité de laboratoire, façonne aujourd'hui des usages industriels considérables : le chlore désinfecte l'eau potable de milliards de personnes à travers le monde, l'iode reste un antiseptique de référence depuis plus d'un siècle, et les composés fluorés se retrouvent aussi bien dans le dentifrice (prévention des caries) que dans les revêtements antiadhésifs des poêles de cuisine (téflon) ou les réfrigérants industriels.</p>
    <p>Les halogènes (groupe VIIA) partagent une configuration de valence commune $(ns)^2(np)^5$ — il ne leur manque qu'un électron pour atteindre la configuration stable d'un gaz rare, ce qui explique leur très forte réactivité, en particulier comme oxydants. À la fin de ce chapitre, tu sauras expliquer pourquoi HF fait exception parmi les halogénures d'hydrogène, et situer les multiples degrés d'oxydation du chlore dans ses composés oxygénés.</p>

    <h3>1. Généralités</h3>
    <table class="mini-table">
      <tr><th>Halogène</th><th>Configuration de valence</th><th>Abondance / occurrence</th></tr>
      <tr><td>Fluor F ($n=2$)</td><td>$(2s)^2(2p)^5$</td><td>cryolithe, fluorine, fluoroapatite</td></tr>
      <tr><td>Chlore Cl ($n=3$)</td><td>$(3s)^2(3p)^5$</td><td>le plus répandu, NaCl (eau de mer)</td></tr>
      <tr><td>Brome Br ($n=4$)</td><td>$(4s)^2(3d)^{10}(4p)^5$</td><td>eau de mer (~0,1 g/L)</td></tr>
      <tr><td>Iode I ($n=5$)</td><td>$(5s)^2(4d)^{10}(5p)^5$</td><td>iodates, iodures (saumures)</td></tr>
    </table>
    <p>Tous les halogènes existent dans la nature à l'état <strong>combiné</strong> (jamais à l'état d'élément libre, tant leur réactivité est grande).</p>

    <h3>2. Propriétés atomiques</h3>
    <p>Comme attendu pour un groupe, le <strong>rayon atomique augmente</strong> et l'<strong>énergie d'ionisation diminue</strong> lorsqu'on descend dans la colonne (F→I). Les affinités électroniques sont plus faibles que les énergies d'ionisation, car la capture d'un électron force l'occupation d'une orbitale $p$ déjà à demi-remplie (répulsion, « énergie d'appariement »). Le fluor a une affinité électronique étonnamment faible pour cette raison (petite taille des orbitales $2p$).</p>

    <h3>3. Molécules dihalogènes</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 50" width="100%">
          <circle cx="40" cy="25" r="14" fill="#4C7CFF" opacity="0.3" stroke="#4C7CFF" stroke-width="1.4"/>
          <circle cx="80" cy="25" r="14" fill="#4C7CFF" opacity="0.3" stroke="#4C7CFF" stroke-width="1.4"/>
          <line x1="54" y1="25" x2="66" y2="25" stroke="#EAF0FB" stroke-width="1.8"/>
          <text x="34" y="29" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">X</text>
          <text x="74" y="29" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">X</text>
        </svg>
        <span>Les halogènes existent, à l'état non combiné, sous forme de molécules diatomiques X₂</span>
      </div>
    </div>
    <table class="mini-table">
      <tr><th>$X_2$</th><th>État physique (usuel)</th><th>Toxicité / usage</th></tr>
      <tr><td>$F_2$</td><td>gaz, odeur irritante</td><td>extrêmement toxique et réactif</td></tr>
      <tr><td>$Cl_2$</td><td>gaz jaune-verdâtre</td><td>toxique ; désinfectant (bactéricide)</td></tr>
      <tr><td>$Br_2$</td><td>liquide rouge-orangé</td><td>très toxique, brûlures cutanées ; désinfectant</td></tr>
      <tr><td>$I_2$</td><td>solide violet foncé</td><td>moins réactif ; antiseptique</td></tr>
    </table>
    <p>Les températures de fusion et d'ébullition augmentent de $F_2$ à $I_2$ : les interactions de Van der Waals entre molécules deviennent plus fortes quand la taille des molécules augmente.</p>

    <h3>4. Réactivité des dihalogènes avec l'eau</h3>
    <p>Le <strong>fluor</strong>, le plus électronégatif de tous les éléments, est le seul capable d'oxyder l'eau en dioxygène, à n'importe quel pH : $F_2+3H_2O\\to2H_3O^++2F^-+\\frac12O_2$. Le <strong>chlore</strong> réagit par <strong>dismutation</strong> : $Cl_2+H_2O\\to HClO+HCl$ (un atome de Cl passe de 0 à $-1$, l'autre de 0 à $+1$). $Br_2$ et $I_2$ réagissent de la même façon, mais de façon de plus en plus limitée.</p>

    <h3>5. Halogénures d'hydrogène HX</h3>
    <p>La réactivité de l'hydrogène avec les halogènes décroît de F à I ($F_2$ réagit même à froid, explosif ; $Br_2$ et $I_2$ nécessitent un chauffage).</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>HF</th><th>HCl</th><th>HBr</th><th>HI</th></tr>
      <tr><td>pKa</td><td>3,2 (faible !)</td><td>−7</td><td>−9,5</td><td>−10</td></tr>
      <tr><td>Caractère ionique (moment dipolaire)</td><td>fort</td><td>→</td><td>→</td><td>faible</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Pourquoi HF est-il un acide faible ?</span>
      Contrairement aux autres $HX$ (acides forts), $HF$ est un acide <strong>faible</strong> : les liaisons hydrogène entre molécules de $HF$ défavorisent les interactions avec les molécules d'eau. HF possède en revanche la propriété unique d'attaquer le verre (silicates) : $SiO_2+4HF\\to SiF_4+2H_2O$.
    </div>
    <p>On distingue les <strong>halogénures ioniques</strong> (avec alcalins/alcalino-terreux, sauf Be — conducteurs à l'état fondu) des <strong>halogénures covalents</strong> (avec non-métaux, ex. $CCl_4$, $SF_6$ — températures de fusion/ébullition faibles).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      HF est à la fois l'halogénure d'hydrogène le plus polaire (donc, intuitivement, le plus « acide » attendu) et pourtant le seul acide faible de la famille. En reliant cela aux liaisons hydrogène étudiées en atomistique, comment une forte polarité de la liaison H–F peut-elle malgré tout, via un mécanisme indirect, réduire la dissociation acide de la molécule en solution ?
    </div>

    <h3>6. Degrés d'oxydation des halogènes</h3>
    <p>Contrairement au fluor (toujours monovalent, D.O. $-I$ dans ses composés), les halogènes plus lourds (Cl, Br, I), moins électronégatifs que l'oxygène, peuvent dépasser la règle de l'octet et présenter des degrés d'oxydation de $+I$ à $+VII$ dans leurs oxacides.</p>
    <table class="mini-table">
      <tr><th>D.O.</th><th>Oxacide (chlore)</th><th>Base conjuguée</th></tr>
      <tr><td>+I</td><td>$HClO$ (acide hypochloreux)</td><td>$ClO^-$ (hypochlorite — eau de Javel)</td></tr>
      <tr><td>+III</td><td>$HClO_2$ (acide chloreux)</td><td>$ClO_2^-$ (chlorite)</td></tr>
      <tr><td>+V</td><td>$HClO_3$ (acide chlorique)</td><td>$ClO_3^-$ (chlorate)</td></tr>
      <tr><td>+VII</td><td>$HClO_4$ (acide perchlorique)</td><td>$ClO_4^-$ (perchlorate)</td></tr>
    </table>
    <p>L'eau de Javel (mélange de $NaClO$ et $NaCl$ en solution) s'obtient par action du dichlore sur une solution froide de soude : $Cl_2+2NaOH\\to NaClO+NaCl+H_2O$.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le chlore peut adopter des degrés d'oxydation allant de −I (dans un chlorure comme NaCl) jusqu'à +VII (dans le perchlorate), soit une gamme de neuf valeurs entières distinctes. Sachant que l'oxygène, plus électronégatif que le chlore, force ce dernier à céder ses électrons dans ses oxacides, pourquoi le fluor — encore plus électronégatif que l'oxygène — ne peut-il jamais présenter de degré d'oxydation positif, contrairement à ses homologues plus lourds ?
    </div>

    <h3>7. Frontière de la recherche</h3>
    <p>Les composés fluorés de synthèse, notamment les substances per- et polyfluoroalkylées (PFAS), suscitent aujourd'hui une préoccupation environnementale et sanitaire majeure : leur liaison carbone-fluor, l'une des plus stables de toute la chimie organique, les rend extraordinairement persistants dans l'environnement — d'où leur surnom de « polluants éternels » — et leur accumulation potentielle dans les organismes vivants fait l'objet d'une recherche toxicologique intense. À l'opposé, la chimie du fluor reste indispensable à des applications de pointe : les agents de contraste utilisés en imagerie médicale par résonance magnétique, ou les polymères fluorés employés dans l'industrie aérospatiale pour leur résistance chimique et thermique exceptionnelle.</p>
    <p><strong>Question ouverte :</strong> peut-on concevoir des alternatives aux PFAS offrant des propriétés techniques comparables (résistance à l'eau, aux graisses, à la chaleur) sans leur persistance environnementale problématique ? C'est un enjeu de recherche majeur en chimie verte, avec des implications réglementaires considérables à l'échelle mondiale.</p>
    <p><strong>Technologie émergente :</strong> les méthodes de dégradation catalytique des PFAS, qui cherchent à rompre la liaison carbone-fluor habituellement quasi indestructible, sont en développement actif pour traiter les eaux et sols contaminés par ces polluants persistants.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Halogènes (ns²np⁵) → réactivité oxydante décroissante F>Cl>Br>I → dihalogènes X₂ → halogénures d'hydrogène (HF faible, exception) → halogénures ioniques/covalents → oxacides du chlore (+I à +VII)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$Cl_2 + H_2O \\to HClO + HCl$$
      Cette réaction de dismutation, où un même élément est simultanément oxydé et réduit, illustre à elle seule toute la richesse redox des halogènes — et se trouve à l'origine directe de la fabrication de l'eau de Javel, désinfectant universellement utilisé depuis plus de deux siècles.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Configuration de valence commune (ns)²(np)⁵ ; réactivité très forte, surtout comme oxydants</li>
        <li>Le fluor est le seul élément capable d'oxyder l'eau ; le chlore se dismute dans l'eau (HClO + HCl)</li>
        <li>HF est un acide FAIBLE (liaisons hydrogène), contrairement aux autres HX qui sont des acides forts</li>
        <li>Seul le fluor reste toujours au D.O. −I ; les autres halogènes vont de +I à +VII dans leurs oxacides</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que tous les HX sont des acides forts — HF fait exception (pKa=3,2, bien positif)</li>
        <li>Oublier que la réactivité des halogènes DÉCROÎT de F à I, alors que leur rayon atomique augmente</li>
        <li>Confondre halogénure ionique (métal alcalin/alcalino-terreux) et covalent (non-métal) — leurs propriétés physiques diffèrent radicalement</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Parmi les halogènes, celui qui peut oxyder l'eau en dioxygène à n'importe quel pH est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min4e1" value="right"> le fluor</label>
          <label class="option"><input type="radio" name="min4e1" value="wrong"> le chlore</label>
          <label class="option"><input type="radio" name="min4e1" value="wrong"> le brome</label>
          <label class="option"><input type="radio" name="min4e1" value="wrong"> l'iode</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min4e1','min4fb1','Correct — le fluor est l\\'élément le plus électronégatif, seul capable d\\'oxyder l\\'eau en O2 quel que soit le pH.','C\\'est l\\'élément le PLUS électronégatif du tableau périodique — lequel des 4 est-ce ?')">Vérifier</button>
        <div class="feedback" id="min4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Parmi les halogénures d'hydrogène, celui qui est un acide FAIBLE est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min4e2" value="right"> HF</label>
          <label class="option"><input type="radio" name="min4e2" value="wrong"> HCl</label>
          <label class="option"><input type="radio" name="min4e2" value="wrong"> HBr</label>
          <label class="option"><input type="radio" name="min4e2" value="wrong"> HI</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min4e2','min4fb2','Correct — HF a un pKa positif (3,2), signe d\\'un acide faible, à cause des liaisons hydrogène entre molécules de HF.','Regarde le tableau des pKa : lequel des 4 a un pKa POSITIF (donc un acide faible) ?')">Vérifier</button>
        <div class="feedback" id="min4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le degré d'oxydation du chlore dans l'ion perchlorate ClO₄⁻ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min4e3" value="wrong"> +I</label>
          <label class="option"><input type="radio" name="min4e3" value="wrong"> +V</label>
          <label class="option"><input type="radio" name="min4e3" value="right"> +VII</label>
          <label class="option"><input type="radio" name="min4e3" value="wrong"> −I</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min4e3','min4fb3','Correct — le perchlorate correspond au degré d\\'oxydation le plus élevé du chlore, +VII.','ClO4- est la base conjuguée de HClO4, l\\'acide PERchlorique — c\\'est le degré d\\'oxydation le plus élevé du tableau.')">Vérifier</button>
        <div class="feedback" id="min4fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le fluor n'existait pas dans la Nature : quels matériaux et technologies modernes (téflon, dentifrice fluoré, réfrigérants) seraient aujourd'hui impossibles à concevoir sous leur forme actuelle ?</li>
        <li>Pourquoi Henri Moissan a-t-il mis près d'un siècle de plus que les autres halogènes à isoler le fluor pur, malgré son abondance naturelle comparable ?</li>
        <li>Quelle serait la conséquence, pour la santé publique mondiale, d'une interdiction totale et immédiate des composés fluorés PFAS sans solution de remplacement immédiatement disponible ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>H. Moissan, « Le fluor et ses composés », Nobel Lecture, prix Nobel de chimie 1906 — récit de l'isolement du fluor.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la chimie des halogènes en licence.</li>
        <li>Agence européenne des produits chimiques (ECHA), <em>Restriction Report on PFAS</em>, rapport réglementaire de référence sur les polluants per- et polyfluoroalkylés.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais expliquer pourquoi HF se comporte différemment de ses homologues, et situer les multiples degrés d'oxydation du chlore dans ses composés oxygénés. Le chapitre suivant, « Le soufre », va explorer un élément aux formes allotropiques particulièrement riches et aux applications industrielles considérables, de l'acide sulfurique jusqu'à la vulcanisation du caoutchouc. Comme le rappelle l'histoire tragique de l'isolement du fluor par Moissan, au prix de la santé de plusieurs de ses prédécesseurs : la chimie des halogènes, aussi utile soit-elle aujourd'hui, s'est construite sur une compréhension progressive et parfois durement acquise de leur réactivité extrême.</p>
  `
};

MIN_NOVA_KB[minKey('Les halogènes')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Les halogènes ». Demande-moi pourquoi HF est un acide faible, les degrés d'oxydation du chlore, ou un indice sur un exercice.",
  rules: [
    { test:/configuration.*valence|ns.*np/i, replies:["Tous les halogènes ont la même configuration de valence (ns)²(np)⁵ : il leur manque un seul électron pour la configuration stable d'un gaz rare, d'où leur forte réactivité oxydante."] },
    { test:/fluor.*oxyde|oxyder l.eau/i, replies:["Le fluor est le seul halogène (et l'élément le plus électronégatif) capable d'oxyder l'eau en dioxygène, à n'importe quel pH."] },
    { test:/dismutation|chlore.*eau/i, replies:["Le chlore se dismute dans l'eau : Cl2 + H2O → HClO + HCl. Un atome de Cl passe de 0 à −1 (réduit), l'autre de 0 à +1 (oxydé)."] },
    { test:/hf|acide faible/i, replies:["HF est le seul halogénure d'hydrogène acide FAIBLE (pKa=3,2) — les liaisons hydrogène entre molécules de HF gênent sa dissociation dans l'eau. Les autres (HCl, HBr, HI) sont des acides forts."] },
    { test:/halog[ée]nure ionique|halog[ée]nure covalent/i, replies:["Halogénures ioniques : avec les alcalins/alcalino-terreux (sauf Be), conducteurs à l'état fondu. Halogénures covalents : avec les non-métaux (CCl4, SF6), températures de fusion/ébullition basses."] },
    { test:/degr[ée].*oxydation|hypochlor|chlorite|chlorate|perchlorate/i, replies:["Le chlore va du D.O. +I (HClO, hypochloreux) à +VII (HClO4, perchlorique), en passant par +III (chloreux) et +V (chlorique). Seul le fluor reste toujours à −I."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : c'est l'élément le plus électronégatif de tout le tableau périodique.","Indice niveau 2 : c'est en haut du groupe VIIA.","Indice niveau 3 : c'est le fluor."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde le signe du pKa dans le tableau du cours.","Indice niveau 2 : un pKa positif signale un acide faible.","Indice niveau 3 : c'est HF (pKa=3,2)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : perchlorate vient de l'acide PERchlorique.","Indice niveau 2 : c'est le degré d'oxydation le plus ÉLEVÉ du chlore.","Indice niveau 3 : +VII."] }
  ]
};

/* =========================== CHAPITRE 6 — Le soufre =========================== */
MIN_CHAPTERS[minKey('Le soufre')] = {
  objectives: [
    "Décrire la structure cyclique S₈ du soufre élémentaire et le phénomène de caténation",
    "Situer les degrés d'oxydation du soufre dans ses sulfures, oxydes et oxacides",
    "Écrire les réactions acido-basiques et redox caractéristiques de H₂S et SO₂",
    "Décrire les quatre propriétés de l'acide sulfurique et son procédé de fabrication industrielle",
    "Évaluer pourquoi l'acide sulfurique, bien que peu spectaculaire dans son usage quotidien, est parfois considéré comme un indicateur du niveau de développement industriel d'un pays"
  ],
  prereqs: ["Les halogènes"],
  bodyHtml: `
    <p>Un dicton bien connu des historiens de l'industrie chimique affirme que l'on peut juger le développement économique d'une nation à sa consommation d'acide sulfurique — une boutade attribuée à plusieurs figures du XXe siècle, mais qui reflète une réalité statistique frappante : $H_2SO_4$ est, et de très loin, le produit chimique industriel le plus fabriqué au monde, avec plus de 200 millions de tonnes produites chaque année, principalement pour la fabrication d'engrais phosphatés indispensables à l'agriculture mondiale.</p>
    <p>Le soufre lui-même, élément aux multiples visages, illustre à merveille la richesse de la chimie descriptive : sous sa forme élémentaire, il forme des cycles S₈ d'une élégance géométrique remarquable ; combiné à l'hydrogène, il devient un gaz toxique à l'odeur nauséabonde bien connue ; oxydé à l'extrême, il devient l'acide le plus puissant de l'industrie chimique moderne. Ce chapitre te propose de parcourir l'ensemble de ces visages, des cycles moléculaires jusqu'aux cuves industrielles.</p>
    <p>Le soufre (famille des chalcogènes, groupe VIA, configuration de valence $(ns)^2(np)^4$) présente une chimie riche en degrés d'oxydation, de $-II$ à $+VI$, qui structure toute cette famille d'oxacides industriellement essentiels. À la fin de ce chapitre, tu sauras décrire la structure du soufre élémentaire, la toxicité et la réactivité de ses composés hydrogénés et oxygénés, et le procédé industriel de fabrication de l'acide sulfurique.</p>

    <h3>1. Le soufre élémentaire : structure cyclique S₈</h3>
    <p>À l'état solide, le soufre se présente sous forme de molécules cycliques $cyclo$-$S_8$, en forme de « couronne ». Le soufre possède aussi des cycles $S_6$, $S_7$, $S_{12}$, $S_{18}$, $S_{20}$, et même des chaînes infinies en hélice : cette tendance à former des chaînes $-S-S-S-\\dots$ s'appelle la <strong>caténation</strong>.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <polygon points="102,50 92.6,72.6 70,82 47.4,72.6 38,50 47.4,27.4 70,18 92.6,27.4" fill="none" stroke="#F0B94D" stroke-width="1.8"/>
          <circle cx="102" cy="50" r="3" fill="#F0B94D"/>
          <circle cx="92.6" cy="72.6" r="3" fill="#F0B94D"/>
          <circle cx="70" cy="82" r="3" fill="#F0B94D"/>
          <circle cx="47.4" cy="72.6" r="3" fill="#F0B94D"/>
          <circle cx="38" cy="50" r="3" fill="#F0B94D"/>
          <circle cx="47.4" cy="27.4" r="3" fill="#F0B94D"/>
          <circle cx="70" cy="18" r="3" fill="#F0B94D"/>
          <circle cx="92.6" cy="27.4" r="3" fill="#F0B94D"/>
        </svg>
        <span>Cyclo-S₈ : les 8 atomes de soufre forment un cycle plissé en « couronne »</span>
      </div>
    </div>

    <h3>2. Propriétés chimiques du soufre</h3>
    <p>Le soufre ($_{16}S:[Ne]3s^23p^4$) peut : gagner deux électrons pour former l'anion sulfure $S^{2-}$ ; former deux liaisons covalentes simples ou une double (ex. $H_2S$, $CS_2$) ; former une liaison covalente avec gain d'un électron (ex. $HS^-$, $S_2^{2-}$) ; utiliser ses orbitales $d$ pour dépasser l'octet (ex. $SF_4$).</p>
    <p>Le soufre peut prendre les degrés d'oxydation : $-II,-I,0,+I,+II,+IV,+V,+VI$.</p>

    <h3>3. Sulfure d'hydrogène H₂S</h3>
    <p>$H_2S$ est un gaz incolore, à odeur d'œufs pourris, très toxique. C'est un <strong>diacide faible</strong> :</p>
    <div class="formula-box">$$H_2S + H_2O \\rightleftharpoons H_3O^+ + HS^- \\quad (pK_{a1}=7) \\qquad HS^- + H_2O \\rightleftharpoons H_3O^+ + S^{2-} \\quad (pK_{a2}=19)$$</div>
    <p>C'est aussi un <strong>réducteur</strong> : $2H_2S^{-II} + 3O_2 \\to 2H_2O + 2S^{IV}O_2$ (le soufre passe de $-II$ à $+IV$).</p>
    <div class="key-point">
      <span class="eyebrow">Toxicité de H₂S</span>
      $H_2S$ est un poison : une concentration de l'ordre de $10^{-3}$ mol/m³ provoque des vertiges, et $5\\times10^{-2}$ mol/m³ peut entraîner la mort par paralysie respiratoire.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'un des dangers particuliers de H₂S est qu'à forte concentration, il paralyse rapidement le nerf olfactif, rendant la victime incapable de sentir le gaz précisément au moment où il devient le plus mortel — contrairement à ce qu'on pourrait attendre d'une odeur qui s'intensifierait avec la dose. Pourquoi cette caractéristique rend-elle H₂S particulièrement dangereux dans un contexte industriel, comparé à un gaz toxique dont l'odeur resterait perceptible à toute concentration ?
    </div>

    <h3>4. Oxydes de soufre : SO₂ et SO₃</h3>
    <table class="mini-table">
      <tr><th>Oxyde</th><th>D.O. du soufre</th><th>Propriétés</th></tr>
      <tr><td>$SO_2$ (anhydride sulfureux)</td><td>+IV</td><td>gaz incolore, suffocant, très soluble dans l'eau ; oxyde acide ; réducteur ET oxydant selon le partenaire</td></tr>
      <tr><td>$SO_3$ (anhydride sulfurique)</td><td>+VI</td><td>liquide (Tfus=16,8°C) ; réagit avec l'eau pour donner $H_2SO_4$</td></tr>
    </table>
    <p>$SO_2$ est à la fois réducteur ($SO_2+\\frac12O_2\\to SO_3$) et oxydant (procédé Claus : $SO_2+2H_2S\\to3S+2H_2O$, valorisant le soufre récupéré du gaz naturel).</p>

    <h3>5. Acide sulfurique H₂SO₄</h3>
    <p>$H_2SO_4$ est l'acide industriel le plus produit au monde. Il possède <strong>quatre propriétés</strong> :</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Illustration</th></tr>
      <tr><td>Diacide fort</td><td>$H_2SO_4+H_2O\\to HSO_4^-+H_3O^+$ ($pK_{a1}=-2$, dissociation complète), puis $HSO_4^-+H_2O\\rightleftharpoons SO_4^{2-}+H_3O^+$ ($pK_{a2}=2$, partielle)</td></tr>
      <tr><td>Oxydant (concentré, chaud)</td><td>réagit même sur les métaux nobles (Cu, Pb, Hg) avec dégagement de $SO_2$</td></tr>
      <tr><td>Agent sulfonant</td><td>$ArH+2H_2SO_4\\to ArSO_3H+H_3O^++HSO_4^-$</td></tr>
      <tr><td>Agent déshydratant</td><td>utilisé dans les mélanges sulfonitriques pour la nitration des composés aromatiques</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Règle de sécurité fondamentale</span>
      La dissolution de $H_2SO_4$ dans l'eau est très exothermique : il faut <strong>toujours verser l'acide dans l'eau</strong>, jamais l'inverse (sinon l'ébullition brutale localisée projette de l'acide concentré).
    </div>
    <p><strong>Fabrication (procédé de contact) :</strong> 1) production de $SO_2$ (combustion du soufre ou grillage de pyrite $FeS_2$) ; 2) oxydation $SO_2+\\frac12O_2\\to SO_3$ sur catalyseur $V_2O_5$ ; 3) absorption de $SO_3$ dans $H_2SO_4$ concentré (formant l'oléum), puis dilution.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le procédé de contact absorbe SO₃ dans de l'acide sulfurique déjà concentré (formant de l'oléum), plutôt que directement dans l'eau, alors que la réaction $SO_3+H_2O\\to H_2SO_4$ semble a priori plus directe. Sachant que cette réaction directe est extrêmement exothermique et libère un épais brouillard d'acide difficile à condenser, pourquoi le passage par l'oléum est-il en réalité une astuce industrielle plus sûre et plus efficace ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Les émissions de dioxyde de soufre issues de la combustion des combustibles fossiles, responsables des pluies acides qui ont endommagé des forêts entières et acidifié de nombreux lacs à travers le monde au XXe siècle, ont considérablement diminué depuis les années 1990 grâce à des réglementations environnementales strictes — l'un des grands succès méconnus de la politique environnementale occidentale. Les chercheurs étudient aujourd'hui l'utilisation paradoxale de composés soufrés injectés volontairement dans la stratosphère (géo-ingénierie solaire) pour refroidir artificiellement le climat, en imitant l'effet observé après de grandes éruptions volcaniques riches en soufre.</p>
    <p><strong>Question ouverte :</strong> la géo-ingénierie solaire par aérosols soufrés stratosphériques est-elle une option de dernier recours acceptable face au changement climatique, malgré les risques et incertitudes considérables qu'elle comporte (impacts sur la couche d'ozone, gouvernance internationale, effets régionaux imprévisibles) ? C'est un débat scientifique et éthique majeur de la recherche climatique actuelle.</p>
    <p><strong>Technologie émergente :</strong> les procédés de désulfuration des gaz de combustion, obligatoires dans la plupart des centrales thermiques modernes, capturent aujourd'hui le SO₂ avant son rejet atmosphérique et le valorisent directement en gypse ou en acide sulfurique, transformant un polluant potentiel en ressource industrielle.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Soufre élémentaire (cyclo-S₈, caténation) → H₂S (diacide faible, réducteur) → SO₂ (+IV, acide/réducteur/oxydant) → SO₃ (+VI) → procédé de contact (catalyseur V₂O₅) → H₂SO₄ (4 propriétés)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$SO_2 + \\frac{1}{2}O_2 \\xrightarrow{V_2O_5} SO_3 \\xrightarrow{H_2O} H_2SO_4$$
      Cette chaîne réactionnelle, exploitée industriellement depuis plus d'un siècle sous le nom de procédé de contact, produit chaque année plus de 200 millions de tonnes de l'acide chimique le plus utilisé au monde — un chiffre qui, à lui seul, résume l'ampleur de la place qu'occupe le soufre dans l'industrie chimique mondiale.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le soufre solide forme des cycles S₈ (« couronne ») ; sa capacité à s'enchaîner s'appelle la caténation</li>
        <li>H₂S est un diacide faible (pKa1=7, pKa2=19) ET un réducteur</li>
        <li>SO₂ (D.O. +IV) est acide, réducteur ET oxydant ; SO₃ (D.O. +VI) donne H₂SO₄ avec l'eau</li>
        <li>H₂SO₄ a 4 propriétés : diacide fort, oxydant (concentré et chaud), sulfonant, déshydratant — et se verse TOUJOURS dans l'eau, jamais l'inverse</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Verser l'eau dans l'acide sulfurique concentré — c'est dangereux, il faut faire l'inverse</li>
        <li>Oublier que la 1ère dissociation de H2SO4 est complète (acide fort) mais la 2ème seulement partielle</li>
        <li>Confondre SO2 (D.O. +IV, réducteur ET oxydant) avec SO3 (D.O. +VI, forme directement H2SO4 avec l'eau)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La forme cristalline la plus courante du soufre solide est constituée de cycles :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min5e1" value="wrong"> S₄</label>
          <label class="option"><input type="radio" name="min5e1" value="wrong"> S₆</label>
          <label class="option"><input type="radio" name="min5e1" value="right"> S₈</label>
          <label class="option"><input type="radio" name="min5e1" value="wrong"> S₁₀</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min5e1','min5fb1','Correct — les formes allotropiques usuelles du soufre solide sont basées sur l\\'empilement de cyclo-S8.','C\\'est LE cycle mentionné en premier dans le cours, celui qui forme la « couronne ».')">Vérifier</button>
        <div class="feedback" id="min5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans la réaction 2H₂S + 3O₂ → 2H₂O + 2SO₂, le soufre :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min5e2" value="wrong"> s'oxyde de +IV à −II</label>
          <label class="option"><input type="radio" name="min5e2" value="right"> s'oxyde de −II à +IV</label>
          <label class="option"><input type="radio" name="min5e2" value="wrong"> ne change pas de degré d'oxydation</label>
          <label class="option"><input type="radio" name="min5e2" value="wrong"> se réduit de +IV à −II</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min5e2','min5fb2','Correct — dans H2S le soufre est à −II, dans SO2 il est à +IV : c\\'est une oxydation (H2S joue le rôle de réducteur).','Compare le degré d\\'oxydation du soufre dans H2S (à gauche) et dans SO2 (à droite).')">Vérifier</button>
        <div class="feedback" id="min5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour diluer de l'acide sulfurique concentré en toute sécurité, il faut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min5e3" value="wrong"> verser l'eau dans l'acide</label>
          <label class="option"><input type="radio" name="min5e3" value="right"> verser l'acide dans l'eau</label>
          <label class="option"><input type="radio" name="min5e3" value="wrong"> mélanger les deux simultanément</label>
          <label class="option"><input type="radio" name="min5e3" value="wrong"> chauffer d'abord l'acide</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min5e3','min5fb3','Correct — la dissolution étant très exothermique, verser l\\'acide (en petite quantité) dans l\\'eau (en grande quantité) permet à la chaleur de se dissiper sans danger.','C\\'est la règle de sécurité de base en chimie avec les acides concentrés : « acide dans l\\'eau », jamais l\\'inverse.')">Vérifier</button>
        <div class="feedback" id="min5fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'acide sulfurique n'existait pas, ou était bien plus coûteux à produire : quels secteurs entiers de l'industrie mondiale (engrais, batteries, raffinage) seraient les plus durement touchés ?</li>
        <li>Pourquoi le soufre, contrairement à l'oxygène (son voisin dans la même colonne), forme-t-il des molécules cycliques stables comme S₈ plutôt qu'une simple molécule diatomique S₂ ?</li>
        <li>Quelle serait la conséquence, pour le climat mondial, d'un déploiement à grande échelle de la géo-ingénierie solaire par aérosols soufrés stratosphériques, malgré ses incertitudes ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>P. J. Crutzen, « Albedo Enhancement by Stratospheric Sulfur Injections: A Contribution to Resolve a Policy Dilemma? », Climatic Change, 2006 — article fondateur du débat scientifique sur la géo-ingénierie solaire par le soufre (prix Nobel de chimie 1995 pour ses travaux sur la couche d'ozone).</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la chimie du soufre en licence.</li>
        <li>United States Geological Survey (USGS), <em>Mineral Commodity Summaries — Sulfur</em>, rapport annuel de référence sur la production mondiale de soufre et d'acide sulfurique.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais décrire la structure riche et variée du soufre, de ses cycles moléculaires jusqu'à l'acide industriel le plus produit au monde. Le chapitre suivant, « L'azote et le phosphore », va explorer deux éléments tout aussi essentiels — l'un composant 78 % de l'atmosphère terrestre, l'autre indispensable à chaque molécule d'ADN de ton propre corps. Comme le rappelle le dicton historique sur l'acide sulfurique : la chimie industrielle la plus discrète, produite par centaines de millions de tonnes loin des regards, façonne souvent bien plus profondément notre quotidien que les réactions les plus spectaculaires.</p>
  `
};

MIN_NOVA_KB[minKey('Le soufre')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Le soufre ». Demande-moi ce qu'est la caténation, les propriétés de H2SO4, ou un indice sur un exercice.",
  rules: [
    { test:/cat[ée]nation|s8|cyclo/i, replies:["La caténation est la tendance du soufre à former des chaînes -S-S-S-... Le soufre solide usuel est fait de cycles cyclo-S8 en forme de couronne."] },
    { test:/h2s|sulfure d.hydrog[èe]ne/i, replies:["H2S est un diacide faible (pKa1=7, pKa2=19) et un réducteur : le soufre y est au degré d'oxydation −II, et peut s'oxyder jusqu'à +IV (SO2) ou plus."] },
    { test:/so2|dioxyde de soufre/i, replies:["SO2 (D.O. +IV) est un oxyde acide, à la fois réducteur (SO2+½O2→SO3) et oxydant (procédé Claus : SO2+2H2S→3S+2H2O)."] },
    { test:/so3|trioxyde de soufre/i, replies:["SO3 (D.O. +VI) réagit avec l'eau pour donner directement l'acide sulfurique H2SO4."] },
    { test:/h2so4|acide sulfurique/i, replies:["H2SO4 a 4 propriétés : diacide fort (1ère dissociation complète, 2ème partielle), oxydant à chaud et concentré, agent sulfonant, agent déshydratant. Règle de sécurité : toujours verser l'acide dans l'eau !"] },
    { test:/proc[ée]d[ée] de contact|fabrication.*sulfurique/i, replies:["Procédé de contact : 1) production de SO2, 2) oxydation SO2→SO3 sur catalyseur V2O5, 3) absorption de SO3 dans H2SO4 concentré (oléum), puis dilution."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : c'est LE cycle emblématique du soufre, en forme de couronne.","Indice niveau 2 : ce n'est ni 4, ni 6, ni 10 atomes.","Indice niveau 3 : S8."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare le D.O. du soufre à gauche (dans H2S) et à droite (dans SO2).","Indice niveau 2 : dans H2S, S est à −II ; dans SO2, à +IV.","Indice niveau 3 : c'est une oxydation, de −II à +IV."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est une règle de sécurité classique en chimie.","Indice niveau 2 : la dissolution est très exothermique.","Indice niveau 3 : on verse toujours l'acide DANS l'eau."] }
  ]
};

/* =========================== CHAPITRE 7 — L'azote et le phosphore =========================== */
MIN_CHAPTERS[minKey('L\'azote et le phosphore')] = {
  objectives: [
    "Décrire la structure et la faible réactivité du diazote N₂, liée à sa triple liaison",
    "Écrire les trois propriétés chimiques de l'ammoniac (réducteur, base, acide) et son procédé de synthèse industrielle",
    "Situer les degrés d'oxydation de l'azote dans ses oxydes et dans l'acide nitrique",
    "Décrire les formes allotropiques du phosphore et les oxacides qui en dérivent",
    "Évaluer pourquoi le procédé Haber-Bosch, qui transforme l'azote inerte de l'air en ammoniac réactif, est considéré par de nombreux historiens comme l'invention chimique ayant le plus changé le cours du XXe siècle"
  ],
  prereqs: ["Le soufre"],
  bodyHtml: `
    <p>En 1898, le physicien britannique William Crookes lance un avertissement alarmant devant la Société britannique pour l'avancement de la science : selon ses calculs, la croissance démographique mondiale épuiserait bientôt les réserves naturelles d'azote fixé (sous forme de nitrates), condamnant l'humanité à une famine généralisée faute d'engrais suffisants. Cette prophétie, aussi rigoureuse que pessimiste, ne se réalisera jamais — grâce à une découverte que Crookes ne pouvait alors imaginer : quelques années plus tard, Fritz Haber puis Carl Bosch parviennent à forcer chimiquement l'azote atmosphérique, pourtant chimiquement inerte, à réagir avec l'hydrogène pour former de l'ammoniac en quantité industrielle.</p>
    <p>Cette prouesse chimique, aujourd'hui connue sous le nom de procédé Haber-Bosch, est estimée par de nombreux historiens des sciences comme l'invention ayant permis de nourrir, directement ou indirectement, environ la moitié de la population mondiale actuelle — un chiffre vertigineux pour une simple réaction entre deux gaz. Haber recevra le prix Nobel de chimie en 1918 pour cette découverte, une reconnaissance restée controversée compte tenu de son rôle par ailleurs dans le développement des armes chimiques pendant la Première Guerre mondiale — un contraste saisissant entre une invention salvatrice pour l'humanité et une autre, destinée à la détruire.</p>
    <p>L'azote et le phosphore (groupe VA, configuration de valence $(ns)^2(np)^3$) illustrent un contraste frappant : l'azote, sous forme $N_2$, est chimiquement presque inerte, tandis que ses composés (ammoniac, oxydes, acide nitrique) sont parmi les plus réactifs et les plus importants industriellement. À la fin de ce chapitre, tu sauras expliquer cette inertie remarquable du diazote, et décrire les propriétés des principaux composés azotés et phosphorés qui façonnent l'agriculture et l'industrie chimique mondiales.</p>

    <h3>1. Le diazote N₂ : une molécule remarquablement stable</h3>
    <p>Les deux atomes d'azote sont liés par une <strong>triple liaison</strong> très courte (109,76 pm) et très forte ($-946$ kJ/mol). Cette stabilité, associée à l'absence de polarité, rend le diazote <strong>chimiquement inerte</strong> à température ambiante (sauf avec Li et Mg) — ce qui explique son abondance dans l'atmosphère (78% en volume).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 50" width="100%">
          <circle cx="40" cy="25" r="14" fill="#2DD4C4" opacity="0.3" stroke="#2DD4C4" stroke-width="1.4"/>
          <circle cx="80" cy="25" r="14" fill="#2DD4C4" opacity="0.3" stroke="#2DD4C4" stroke-width="1.4"/>
          <line x1="54" y1="21" x2="66" y2="21" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="54" y1="25" x2="66" y2="25" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="54" y1="29" x2="66" y2="29" stroke="#EAF0FB" stroke-width="1.6"/>
          <text x="34" y="29" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">N</text>
          <text x="74" y="29" font-family="IBM Plex Mono" font-size="11" fill="#EAF0FB">N</text>
        </svg>
        <span>N≡N : triple liaison très forte (−946 kJ/mol), responsable de l'inertie chimique du diazote</span>
      </div>
    </div>

    <h3>2. L'ammoniac NH₃</h3>
    <p>La molécule $NH_3$ est une <strong>pyramide trigonale</strong> (distances N-H de 101,5 pm, angles $H-N-H$ de 107°), polaire ($\\mu=1,44$ D). C'est un gaz incolore, suffocant, très soluble dans l'eau (solution appelée ammoniaque).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 100 90" width="100%">
          <line x1="50" y1="45" x2="50" y2="17" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="50" y1="45" x2="74.2" y2="59" stroke="#EAF0FB" stroke-width="1.6"/>
          <line x1="50" y1="45" x2="25.8" y2="59" stroke="#EAF0FB" stroke-width="1.6"/>
          <circle cx="50" cy="45" r="4" fill="#2DD4C4"/>
          <text x="45" y="14" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">H</text>
          <text x="78" y="62" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">H</text>
          <text x="14" y="62" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">H</text>
          <text x="55" y="42" font-family="IBM Plex Mono" font-size="9" fill="#2DD4C4">N</text>
        </svg>
        <span>NH₃ : pyramide trigonale (angle H−N−H ≈ 107°), doublet non liant sur l'azote</span>
      </div>
    </div>
    <p>L'ammoniac possède <strong>trois propriétés</strong> essentielles :</p>
    <table class="mini-table">
      <tr><th>Propriété</th><th>Exemple de réaction</th></tr>
      <tr><td>Réducteur</td><td>$4NH_3+3O_2\\to2N_2+6H_2O$ (D.O. de N passe de $-III$ à 0)</td></tr>
      <tr><td>Base (de Lewis)</td><td>$NH_3+Na\\to NaNH_2+\\frac12H_2$ (donne l'amidure $NH_2^-$)</td></tr>
      <tr><td>Acide (susceptible de donner un proton)</td><td>$NH_2^-+H_2O\\to NH_3+OH^-$ ($NH_2^-$ est une base plus forte que $OH^-$)</td></tr>
    </table>
    <p><strong>Synthèse industrielle (procédé Haber-Bosch) :</strong> $N_2+3H_2\\to2NH_3$, réaction exothermique réalisée vers 300 bars et 500°C sur catalyseur (magnétite $Fe_3O_4$). Les réactifs non convertis (seulement 20% par passage) sont recyclés, ce qui permet d'atteindre un taux de conversion global de 98%.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La synthèse de l'ammoniac étant exothermique, la loi de Le Chatelier (déjà rencontrée en thermochimie) suggérerait de travailler à basse température pour favoriser le rendement. Pourtant, le procédé Haber-Bosch industriel opère à 500°C, une température élevée. Sachant que ce compromis privilégie la vitesse de réaction plutôt que le rendement thermodynamique maximal théorique, pourquoi l'industrie accepte-t-elle malgré tout ce sacrifice partiel de rendement ?
    </div>

    <h3>3. Oxydes d'azote et acide nitrique</h3>
    <p>Sept oxydes moléculaires d'azote sont connus ; les plus importants industriellement sont $NO$, $NO_2$ et $N_2O_4$.</p>
    <table class="mini-table">
      <tr><th>Espèce</th><th>D.O. de N</th><th>Remarque</th></tr>
      <tr><td>$NO$</td><td>+II</td><td>peu réactif, sauf avec $O_2$ et $Cl_2$ ; oxyde inerte sur le plan acido-basique</td></tr>
      <tr><td>$NO_2$ / $N_2O_4$</td><td>+IV</td><td>en équilibre ; se dismute dans l'eau en $HNO_3$ et $HNO_2$</td></tr>
      <tr><td>$HNO_3$ (acide nitrique)</td><td>+V</td><td>liquide incolore instable à la lumière (se colore en jaune, $NO_2$ libéré)</td></tr>
    </table>
    <p>$HNO_3$ a <strong>trois propriétés</strong> : <strong>oxydant fort</strong> (réagit sur les métaux avec dégagement de vapeurs nitreuses $NO$, et non $H_2$ comme les autres acides forts), <strong>monoacide fort</strong> ($pK_a=-1{,}4$), et <strong>agent nitrant</strong> (mélange sulfonitrique, génère $NO_2^+$ qui se fixe sur les noyaux aromatiques). Il est préparé industriellement par oxydation de $NH_3$ en $NO$ (catalyseur Pt), puis $NO\\to NO_2$, puis dissolution dans l'eau.</p>

    <h3>4. Le phosphore : formes allotropiques</h3>
    <table class="mini-table">
      <tr><th>Forme</th><th>Structure</th><th>Propriétés</th></tr>
      <tr><td>Phosphore blanc</td><td>molécules $P_4$ (tétraédrique)</td><td>toxique, pyrophorique (s'enflamme seul dans l'air ~35°C)</td></tr>
      <tr><td>Phosphore rouge</td><td>polymère amorphe</td><td>stable, non toxique (grattoirs d'allumettes)</td></tr>
      <tr><td>Phosphore noir / violet</td><td>structures polymériques cristallines</td><td>formes les plus stables thermodynamiquement</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 100 100" width="100%">
          <line x1="50" y1="39" x2="72.5" y2="78" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="50" y1="39" x2="27.5" y2="78" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="72.5" y1="78" x2="27.5" y2="78" stroke="#EAF0FB" stroke-width="1.4"/>
          <line x1="50" y1="39" x2="50" y2="65" stroke="#EAF0FB" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="27.5" y1="78" x2="50" y2="65" stroke="#EAF0FB" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="72.5" y1="78" x2="50" y2="65" stroke="#EAF0FB" stroke-width="1" stroke-dasharray="2,2"/>
          <circle cx="50" cy="39" r="3.5" fill="#F0B94D"/>
          <circle cx="72.5" cy="78" r="3.5" fill="#F0B94D"/>
          <circle cx="27.5" cy="78" r="3.5" fill="#F0B94D"/>
          <circle cx="50" cy="65" r="3.5" fill="#F0B94D"/>
        </svg>
        <span>P₄ (phosphore blanc) : tétraèdre de 4 atomes de phosphore, chaque arête étant une liaison P−P</span>
      </div>
    </div>
    <p>La combustion du phosphore blanc forme le pentoxyde $P_4O_{10}$, qui absorbe l'humidité (y compris des tissus vivants) pour former l'acide phosphorique.</p>

    <h3>5. Oxydes et oxacide du phosphore</h3>
    <p>Les deux oxydes les plus importants, $P_4O_6$ et $P_4O_{10}$, sont des oxydes acides (caractère non métallique du phosphore) :</p>
    <div class="formula-box">$$P_4O_6+6H_2O\\to4H_3PO_3 \\text{ (acide phosphoreux)} \\qquad P_4O_{10}+6H_2O\\to4H_3PO_4 \\text{ (acide phosphorique)}$$</div>
    <p>Contrairement à $HNO_3$, l'acide orthophosphorique $H_3PO_4$ n'est <strong>pas oxydant</strong>. Il est préparé industriellement soit par hydratation de $P_4O_{10}$, soit par action de $H_2SO_4$ sur les phosphates naturels : $Ca_3(PO_4)_2+3H_2SO_4\\to2H_3PO_4+3CaSO_4$.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le phosphore blanc (P₄, tétraédrique) est pyrophorique et s'enflamme spontanément dans l'air, tandis que le phosphore rouge, chimiquement identique en composition, est parfaitement stable à l'air libre. Sachant que le phosphore rouge est un polymère où chaque atome de phosphore est lié de façon plus contrainte à ses voisins (contrairement à la géométrie tendue du tétraèdre P₄), en quoi cette différence structurale explique-t-elle un écart de réactivité aussi spectaculaire entre deux formes du même élément ?
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le procédé Haber-Bosch, malgré son importance capitale pour nourrir l'humanité, consomme aujourd'hui environ 1 à 2 % de l'énergie mondiale et génère une part significative des émissions de gaz à effet de serre liées à l'agriculture — un paradoxe qui pousse les chercheurs à explorer des alternatives plus durables, notamment la fixation biologique de l'azote par des bactéries symbiotiques (déjà exploitée naturellement par les légumineuses) ou des procédés de fixation électrochimique à température ambiante. Par ailleurs, le phosphore, ressource minérale non renouvelable extraite de gisements de phosphates de plus en plus rares et géopolitiquement concentrés, fait l'objet d'une préoccupation croissante quant à la sécurité alimentaire mondiale à long terme.</p>
    <p><strong>Question ouverte :</strong> peut-on développer, à l'échelle industrielle, des méthodes de fixation de l'azote atmosphérique consommant significativement moins d'énergie que le procédé Haber-Bosch actuel, en s'inspirant par exemple des enzymes bactériennes (nitrogénases) qui réalisent cette même réaction à température ambiante ? C'est un axe de recherche majeur en chimie verte et en biotechnologie agricole.</p>
    <p><strong>Technologie émergente :</strong> les biofertilisants exploitant des bactéries fixatrices d'azote génétiquement optimisées sont développés comme alternative partielle aux engrais azotés de synthèse, avec l'ambition de réduire la dépendance de l'agriculture mondiale au procédé Haber-Bosch énergivore.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      N₂ (triple liaison inerte) → procédé Haber-Bosch → NH₃ (réducteur/base/acide) → oxydes d'azote → HNO₃ (oxydant/acide/nitrant) — en parallèle : phosphore (blanc/rouge/noir) → oxydes → H₃PO₄ (non oxydant)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$N_2 + 3H_2 \\xrightarrow{Fe_3O_4,\\ 500°C,\\ 300\\,\\text{bars}} 2NH_3$$
      Cette réaction, forçant l'azote atmosphérique inerte à devenir un engrais assimilable par les plantes, est estimée avoir permis de nourrir, directement ou indirectement, près de la moitié de la population mondiale actuelle — sans doute l'une des équations chimiques ayant eu le plus grand impact sur l'histoire de l'humanité.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>N₂ est chimiquement inerte à cause de sa triple liaison très forte (−946 kJ/mol)</li>
        <li>NH₃ a 3 propriétés : réducteur, base (donne NH2⁻), acide (NH2⁻ conjugué plus fort que OH⁻)</li>
        <li>HNO₃ a 3 propriétés : oxydant fort (dégage NO, pas H₂), monoacide fort, agent nitrant</li>
        <li>Le phosphore blanc (P₄, tétraédrique, toxique, pyrophorique) diffère radicalement du phosphore rouge (polymère stable, non toxique)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que HNO3 réagit sur les métaux comme HCl (dégagement de H2) — HNO3 dégage des vapeurs nitreuses NO, pas H2</li>
        <li>Confondre phosphore blanc (toxique, dangereux, pyrophorique) et phosphore rouge (stable, utilisé dans les allumettes)</li>
        <li>Oublier que H3PO4, contrairement à HNO3, n'est PAS un oxydant</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le diazote N₂ est chimiquement peu réactif à température ambiante à cause :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min6e1" value="wrong"> de sa faible masse molaire</label>
          <label class="option"><input type="radio" name="min6e1" value="right"> de sa triple liaison très forte</label>
          <label class="option"><input type="radio" name="min6e1" value="wrong"> de sa couleur</label>
          <label class="option"><input type="radio" name="min6e1" value="wrong"> de sa polarité élevée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min6e1','min6fb1','Correct — la triple liaison N≡N (−946 kJ/mol) est extrêmement forte à rompre, d\\'où l\\'inertie chimique du diazote.','La molécule N2 possède une liaison très particulière : laquelle, et pourquoi la rend-elle stable ?')">Vérifier</button>
        <div class="feedback" id="min6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Contrairement à HCl, l'action de HNO₃ sur un métal produit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min6e2" value="wrong"> un dégagement de H₂</label>
          <label class="option"><input type="radio" name="min6e2" value="right"> un dégagement de vapeurs nitreuses (NO)</label>
          <label class="option"><input type="radio" name="min6e2" value="wrong"> aucune réaction</label>
          <label class="option"><input type="radio" name="min6e2" value="wrong"> un dégagement de N₂</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min6e2','min6fb2','Correct — HNO3 est un oxydant si fort que la réaction produit NO (vapeurs nitreuses) plutôt que H2.','HNO3 est présenté dans le cours comme un OXYDANT fort, contrairement aux autres acides forts comme HCl.')">Vérifier</button>
        <div class="feedback" id="min6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le phosphore blanc, contrairement au phosphore rouge, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min6e3" value="right"> toxique et pyrophorique</label>
          <label class="option"><input type="radio" name="min6e3" value="wrong"> non toxique et stable</label>
          <label class="option"><input type="radio" name="min6e3" value="wrong"> utilisé dans les allumettes</label>
          <label class="option"><input type="radio" name="min6e3" value="wrong"> un polymère amorphe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min6e3','min6fb3','Correct — le phosphore blanc (P4) est toxique et s\\'enflamme spontanément dans l\\'air (~35°C) ; c\\'est le phosphore ROUGE qui est stable et utilisé dans les allumettes.','C\\'est l\\'inverse pour le phosphore rouge : lequel des deux est dangereux et instable ?')">Vérifier</button>
        <div class="feedback" id="min6fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si le procédé Haber-Bosch n'avait jamais été découvert : quelle serait, selon les estimations historiques, la population mondiale actuelle soutenable par l'agriculture ?</li>
        <li>Pourquoi Fritz Haber reste-t-il une figure aussi controversée de l'histoire des sciences, malgré une découverte ayant sauvé des milliards de vies humaines de la famine ?</li>
        <li>Quelle serait la conséquence, pour la sécurité alimentaire mondiale à long terme, d'un épuisement progressif des réserves minérales de phosphate exploitables ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>F. Haber, « The Synthesis of Ammonia from Its Elements », Nobel Lecture, prix Nobel de chimie 1918 — récit du développement du procédé de synthèse de l'ammoniac.</li>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — référence standard sur la chimie de l'azote et du phosphore en licence.</li>
        <li>V. Smil, <em>Enriching the Earth: Fritz Haber, Carl Bosch, and the Transformation of World Food Production</em>, MIT Press, 2001 — référence historique sur l'impact civilisationnel du procédé Haber-Bosch.</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais expliquer pourquoi l'azote atmosphérique, si inerte, devient un engrais essentiel une fois transformé en ammoniac, et connais les propriétés riches des composés du phosphore qui l'accompagnent souvent dans les engrais. Le dernier chapitre de ce module, « Applications industrielles et exercices de synthèse », va rassembler l'ensemble des éléments étudiés — hydrogène, oxygène, halogènes, soufre, azote et phosphore — dans une perspective industrielle globale. Comme le rappelle l'histoire contrastée de Fritz Haber : la chimie, plus que toute autre science peut-être, porte en elle le pouvoir de nourrir l'humanité autant que celui de la menacer — un rappel constant de la responsabilité qui accompagne toute découverte scientifique majeure.</p>
  `
};

MIN_NOVA_KB[minKey('L\'azote et le phosphore')] = {
  intro: "Salut, moi c'est Nova ! On est sur « L'azote et le phosphore ». Demande-moi pourquoi N2 est peu réactif, les propriétés de HNO3, ou un indice sur un exercice.",
  rules: [
    { test:/n2|diazote|triple liaison/i, replies:["N2 possède une triple liaison très forte (−946 kJ/mol) et n'est pas polaire : c'est ce qui le rend chimiquement inerte à température ambiante (sauf avec Li et Mg)."] },
    { test:/nh3|ammoniac/i, replies:["NH3 a 3 propriétés : réducteur (s'oxyde en N2), base de Lewis (donne NH2− avec Na), et acide (NH2− est une base plus forte que OH−). Structure pyramidale trigonale, angle H-N-H ≈107°."] },
    { test:/haber.bosch|synth[èe]se.*ammoniac/i, replies:["Le procédé Haber-Bosch : N2+3H2→2NH3, vers 300 bars et 500°C sur catalyseur (magnétite Fe3O4). Le recyclage des réactifs non convertis permet d'atteindre 98% de conversion globale."] },
    { test:/hno3|acide nitrique/i, replies:["HNO3 a 3 propriétés : oxydant fort (dégage NO sur les métaux, pas H2), monoacide fort (pKa=-1,4), et agent nitrant (avec H2SO4, génère NO2+ pour nitrer les aromatiques)."] },
    { test:/phosphore blanc|phosphore rouge|p4/i, replies:["Le phosphore blanc (P4, tétraédrique) est toxique et pyrophorique (s'enflamme seul ~35°C). Le phosphore rouge (polymère amorphe) est stable et non toxique — c'est lui qu'on trouve sur les grattoirs d'allumettes."] },
    { test:/h3po4|acide phosphorique/i, replies:["H3PO4 (acide orthophosphorique) provient de l'hydratation de P4O10. Contrairement à HNO3, il n'est PAS oxydant."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la liaison entre les deux atomes de N.","Indice niveau 2 : c'est une triple liaison, très forte.","Indice niveau 3 : c'est elle qui explique l'inertie de N2."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : HNO3 est présenté comme un oxydant très fort.","Indice niveau 2 : contrairement à HCl, il ne dégage pas H2.","Indice niveau 3 : il dégage des vapeurs nitreuses NO."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : un des deux phosphores s'enflamme spontanément, l'autre non.","Indice niveau 2 : celui des allumettes est stable — donc ce n'est pas lui.","Indice niveau 3 : le phosphore blanc est toxique et pyrophorique."] }
  ]
};

/* =========================== CHAPITRE 8 — Applications industrielles et exercices de synthèse =========================== */
MIN_CHAPTERS[minKey('Applications industrielles et exercices de synthèse')] = {
  objectives: [
    "Relier chaque grand élément étudié (H, O, halogènes, S, N, P) à ses principales applications industrielles",
    "Utiliser les énergies de liaison pour comparer la stabilité de deux formes moléculaires d'un même élément",
    "Appliquer le cycle thermodynamique et la loi d'action de masse à des équilibres de la chimie minérale",
    "Résoudre des exercices de synthèse mobilisant plusieurs chapitres du cours (structure, énergie, équilibre)",
    "Évaluer pourquoi le soufre forme spontanément des cycles S₈ stables alors que l'azote, structurellement très proche dans sa logique de liaison, ne forme jamais de molécules N₄ analogues"
  ],
  prereqs: ["L\'azote et le phosphore"],
  bodyHtml: `
    <p>Un fil conducteur traverse silencieusement l'ensemble de ce module de chimie minérale, du premier chapitre sur la structure atomique jusqu'au dernier sur les applications industrielles : la même logique de configuration électronique, de position dans le tableau périodique et d'énergie de liaison explique aussi bien pourquoi le soufre forme des cycles S₈ stables que pourquoi l'azote, malgré une chimie de valence très similaire, ne forme jamais de tétramères N₄. Ce chapitre de synthèse te propose de reconnecter explicitement ces fils, à travers une série d'exercices corrigés qui mobilisent simultanément plusieurs outils rencontrés séparément dans les chapitres précédents.</p>
    <p>Ce type d'exercice combiné — mêlant énergies de liaison, thermodynamique et équilibres chimiques — reflète fidèlement la façon dont un chimiste industriel raisonne réellement face à un procédé réel : jamais un seul concept isolé, mais toujours une combinaison d'outils enchaînés pour comprendre et optimiser une réaction chimique complète, de la structure moléculaire jusqu'au rendement industriel final.</p>
    <p>Ce chapitre de synthèse relie les sept premiers chapitres du cours à leurs grandes applications industrielles, puis reprend, entièrement corrigés, plusieurs exercices caractéristiques du polycopié — pour t'entraîner à mobiliser plusieurs notions (structure, énergie de liaison, thermodynamique, équilibre) sur un même problème, comme à l'examen. À la fin de ce chapitre — et de ce module —, tu sauras aborder sereinement n'importe quel problème de synthèse combinant plusieurs aspects de la chimie minérale descriptive.</p>

    <h3>1. Panorama des applications industrielles</h3>
    <table class="mini-table">
      <tr><th>Élément / composé</th><th>Applications industrielles majeures</th></tr>
      <tr><td>Hydrogène $H_2$</td><td>synthèse de l'ammoniac (50 %), raffinage des hydrocarbures (37 %), synthèse du méthanol (12 %), hydrogénation des graisses</td></tr>
      <tr><td>Oxygène $O_2$</td><td>sidérurgie (aciers, alliages), oxyde d'éthylène et PVC, propulsion de fusées, oxygénothérapie</td></tr>
      <tr><td>Dichlore $Cl_2$</td><td>désinfection de l'eau, eau de Javel (NaClO), synthèse de HCl et de composés organochlorés</td></tr>
      <tr><td>Soufre / $H_2SO_4$</td><td>engrais phosphatés, détergents (sulfonation), décapage des métaux, explosifs</td></tr>
      <tr><td>Azote / $NH_3$, $HNO_3$</td><td>engrais azotés (nitrates), explosifs (nitroglycérine, TNT), atmosphères inertes</td></tr>
      <tr><td>Phosphore / $H_3PO_4$</td><td>engrais phosphatés, additifs alimentaires, allumettes (phosphore rouge)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Fil conducteur du cours</span>
      Du numéro atomique Z à la réactivité d'un composé industriel, la logique est toujours la même : configuration électronique → position dans le tableau périodique → propriétés atomiques (rayon, électronégativité, énergie d'ionisation) → type de liaison formée → réactivité et applications.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Ce tableau récapitulatif montre que la quasi-totalité des applications industrielles majeures de la chimie minérale (engrais, désinfection, explosifs, sidérurgie) découlent de seulement six éléments non métalliques. Pourquoi ces éléments relativement légers, situés dans les premières périodes du tableau périodique, dominent-ils autant l'industrie chimique par rapport aux éléments plus lourds, souvent bien plus rares et coûteux à extraire ?
    </div>

    <h3>2. Exercice corrigé — masse atomique moyenne (isotopes du carbone)</h3>
    <p><strong>Énoncé :</strong> calculer la masse atomique moyenne du carbone, sachant qu'il possède deux isotopes : $^{12}C$ (abondance 98,89 %, masse 12,00000 u) et $^{13}C$ (abondance 1,11 %, masse 13,00335 u).</p>
    <p><strong>Solution :</strong> $M = \\dfrac{98{,}89\\times12{,}00000 + 1{,}11\\times13{,}00335}{100} = \\dfrac{1186{,}68+14{,}43}{100} \\approx \\mathbf{12{,}011\\ u}$ — c'est bien la valeur affichée sur le tableau périodique.</p>

    <h3>3. Exercice corrigé — dissociation du dichlore</h3>
    <p><strong>Énoncé :</strong> la coupure de $Cl_2$ en 2 atomes $Cl$ peut résulter de l'impact d'un photon de longueur d'onde $\\lambda\\le495$ nm (dissociation photochimique). a) Ceci est-il en rapport avec la couleur du chlore ? Calculer l'énergie de liaison $E(Cl-Cl)$. b) À 1227°C sous 1 bar, 3,5 % des molécules $Cl_2$ sont dissociées (dissociation thermique) : calculer $\\Delta_rG°$ et $\\Delta_rS°$ pour $Cl_2\\to2Cl$.</p>
    <p><strong>Solution (a) :</strong> $Cl_2$ absorbe dans le visible (d'où sa couleur jaune-verdâtre) ; l'énergie du photon $E=\\dfrac{hc}{\\lambda}$ à $\\lambda=495$ nm correspond, par mole, à $E_m=\\dfrac{N_Ahc}{\\lambda}\\approx\\dfrac{6{,}022\\times10^{23}\\times6{,}626\\times10^{-34}\\times3\\times10^{8}}{495\\times10^{-9}}\\approx2{,}42\\times10^{5}$ J/mol $\\approx$ <strong>242 kJ/mol</strong>, cohérent avec l'énergie de dissociation tabulée de $Cl_2$ (242,58 kJ/mol).</p>
    <p><strong>Solution (b) :</strong> avec $\\alpha=0{,}035$ et $n_0=1$ mol de $Cl_2$ initial, à l'équilibre : $n(Cl_2)=1-\\alpha$, $n(Cl)=2\\alpha$, $n_{tot}=1+\\alpha$. Les fractions molaires (sous $P=1$ bar) donnent $K_p\\approx\\dfrac{(2\\alpha)^2}{1-\\alpha^2}\\approx4\\alpha^2$ pour $\\alpha\\ll1$, d'où $K_p\\approx4{,}9\\times10^{-3}$. On en déduit $\\Delta_rG°=-RT\\ln K_p&gt;0$ (réaction peu avancée, $K_p\\ll1$) : la dissociation thermique de $Cl_2$ reste très limitée même à 1227°C, ce qui confirme la force de la liaison $Cl-Cl$. $\\Delta_rS°&gt;0$ car on passe d'1 à 2 moles de gaz (désordre accru).</p>

    <h3>4. Exercice corrigé — compacité et coordinence du chlorure de césium</h3>
    <p><strong>Énoncé :</strong> déterminer la compacité du cristal $CsCl$, sachant qu'il cristallise dans le système cubique centré, et en déduire la coordinence.</p>
    <p><strong>Solution :</strong> dans $CsCl$, $Cs^+$ occupe le centre du cube et $Cl^-$ les sommets (structure cubique simple avec un cation au centre — voir le §5 du chapitre « Chimie de l'oxygène »). Avec $r^+=r(Cs^+)$ et $r^-=r(Cl^-)$, le rapport $r^+/r^-\\approx0{,}93$ (proche de 1), ce qui correspond à l'intervalle $0{,}732\\le r^+/r^-&lt;1$ : arrangement <strong>cubique</strong>, indice de coordination <strong>8</strong> (chaque $Cs^+$ est entouré de 8 ions $Cl^-$ aux sommets du cube, et réciproquement).</p>

    <h3>5. Exercice corrigé — caténation : S₂→S₈ et O₂→O₈</h3>
    <p><strong>Énoncé :</strong> avec $E(S-S)=226$, $E(S=S)=425$, $E(O-O)=142$, $E(O=O)=494$ kJ/mol, calculer les énergies des transformations $4\\,S{=}S\\to8\\,S{-}S$ (disoufre en cyclooctasoufre) et $4\\,O{=}O\\to8\\,O{-}O$ (dioxygène en cyclooctaoxygène). Conclure.</p>
    <p><strong>Solution :</strong> $\\Delta H = 8\\times E(X{-}X) - 4\\times E(X{=}X)$ (on casse 4 liaisons doubles, on forme 8 liaisons simples).<br>Pour le soufre : $\\Delta H = 8\\times226 - 4\\times425 = 1808-1700=\\mathbf{-108\\ kJ/mol}$ : réaction <strong>favorable</strong> — c'est pourquoi le soufre existe naturellement sous forme de cycles $S_8$ plutôt que de molécules $S_2$.<br>Pour l'oxygène : $\\Delta H = 8\\times142-4\\times494=1136-1976=\\mathbf{+840\\ kJ/mol}$ : réaction très <strong>défavorable</strong> — la transformation de $O_2$ en $O_8$ est <strong>impossible</strong>, ce qui explique pourquoi l'oxygène existe sous forme $O_2$ (liaison double, très stable) et non en cycles, contrairement au soufre.</p>

    <h3>6. Exercice corrigé — tétramérisation : N₂→N₄ et P₂→P₄</h3>
    <p><strong>Énoncé :</strong> avec $E(N-N)=167$, $E(N{\\equiv}N)=942$, $E(P-P)=201$, $E(P{\\equiv}P)=481$ kJ/mol, calculer les énergies de $2\\,P{\\equiv}P\\to P_4$ (tétraèdre) et $2\\,N{\\equiv}N\\to N_4$. Conclure.</p>
    <p><strong>Solution :</strong> dans un tétraèdre $X_4$, chaque atome forme 3 liaisons simples avec ses voisins, soit 6 liaisons simples au total pour 4 atomes, contre 2 liaisons triples au départ. $\\Delta H = 6\\times E(X{-}X) - 2\\times E(X{\\equiv}X)$.<br>Pour le phosphore : $\\Delta H=6\\times201-2\\times481=1206-962=\\mathbf{-22{,}4\\ kJ/mol}$ : légèrement <strong>favorable</strong> — le phosphore existe bien sous forme $P_4$ (phosphore blanc).<br>Pour l'azote : $\\Delta H=6\\times167-2\\times942=1002-1884=\\mathbf{+882{,}4\\ kJ/mol}$ : très <strong>défavorable</strong> — $N_4$ n'existe pas ; la triple liaison $N{\\equiv}N$, exceptionnellement forte, rend $N_2$ largement plus stable que toute forme polymérisée.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Ces quatre exercices sur la caténation et la tétramérisation (S₂→S₈, O₂→O₈, P₂→P₄, N₂→N₄) suivent tous la même méthode : comparer l'énergie des liaisons multiples rompues à celle des liaisons simples formées. En observant que cette méthode a prédit correctement, à chaque fois, la forme réellement observée dans la Nature (S₈, O₂, P₄, N₂), que penses-tu de la capacité de simples données d'énergie de liaison, sans aucune expérience directe, à prédire la structure moléculaire stable d'un élément ?
    </div>

    <h3>7. Exercice corrigé — équilibre de synthèse de l'ammoniac</h3>
    <p><strong>Énoncé :</strong> soit l'équilibre $N_2+3H_2\\rightleftharpoons2NH_3$. a) Montrer que $\\dfrac{P_{H_2}}{P_{N_2}}=3$ dans les proportions stœchiométriques. b) Sachant $\\Delta_fG°_{298}(NH_3,g)=-16{,}5$ kJ/mol, calculer $K$ à 298 K. c) Que devient $K$ si la réaction s'écrit $\\frac12N_2+\\frac32H_2\\rightleftharpoons NH_3$ ?</p>
    <p><strong>Solution (a) :</strong> pour 1 mol de $N_2$ engagée, il faut 3 mol de $H_2$ (coefficients stœchiométriques) : dans un mélange initial purement stœchiométrique, les pressions partielles sont proportionnelles aux quantités de matière, donc $P_{H_2}/P_{N_2}=3/1=3$.</p>
    <p><strong>Solution (b) :</strong> $\\Delta_rG°=2\\times\\Delta_fG°(NH_3)=2\\times(-16{,}5)=-33$ kJ/mol. $\\ln K_p=-\\dfrac{\\Delta_rG°}{RT}=-\\dfrac{-33000}{8{,}314\\times298}\\approx13{,}33$, soit $K_{p1}\\approx\\mathbf{776{,}6}$.</p>
    <p><strong>Solution (c) :</strong> en divisant tous les coefficients par 2, $\\Delta_rG°$ est aussi divisé par 2, donc $K_{p2}=\\sqrt{K_{p1}}$... mais l'écriture inverse-proportion donne ici $K_{p1}=1/K_{p2}$ d'après la convention du cours, soit $K_{p2}\\approx\\mathbf{1{,}28\\times10^{-3}}$. On retient surtout que <strong>changer les coefficients stœchiométriques change la valeur de K</strong>, même si l'équilibre physique est le même.</p>

    <h3>8. Frontière de la recherche</h3>
    <p>Cette même logique de comparaison énergétique entre liaisons simples et multiples, appliquée tout au long de ce chapitre à des éléments légers bien connus, guide aujourd'hui la recherche de nouveaux allotropes hypothétiques d'éléments plus exotiques : les chimistes théoriciens utilisent des calculs de chimie quantique pour prédire, avant toute synthèse expérimentale, si une forme allotropique inédite d'un élément donné pourrait exister et rester stable — une démarche qui a notamment conduit à la découverte théorique puis expérimentale du graphène et des fullerènes pour le carbone. Cette approche prédictive, fondée sur les mêmes principes énergétiques que les exercices de ce chapitre, façonne aujourd'hui la recherche de nouveaux matériaux à propriétés sur mesure.</p>
    <p><strong>Question ouverte :</strong> peut-on systématiser, par le calcul quantique pur, la prédiction de toutes les formes allotropiques stables possibles pour chaque élément du tableau périodique, sans avoir besoin de synthèse expérimentale préalable pour les confirmer ? C'est un objectif de plus en plus atteignable grâce aux progrès de la chimie computationnelle et de l'intelligence artificielle appliquée à la science des matériaux.</p>
    <p><strong>Technologie émergente :</strong> les plateformes de découverte de matériaux assistée par intelligence artificielle, qui combinent calculs d'énergie de liaison et apprentissage automatique, accélèrent aujourd'hui considérablement l'identification de nouveaux composés inorganiques aux propriétés industrielles prometteuses.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Configuration électronique → position périodique → énergie de liaison (simple vs multiple) → forme moléculaire stable prédite → applications industrielles (engrais, acides, désinfectants, explosifs)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta H_{\\text{polymérisation}} = n\\times E(\\text{liaisons simples formées}) - m\\times E(\\text{liaisons multiples rompues})$$
      Cette comparaison énergétique simple, appliquée systématiquement dans ce chapitre à S, O, P et N, explique à elle seule pourquoi certains éléments préfèrent des formes moléculaires simples (O₂, N₂) tandis que d'autres s'organisent en cycles ou en tétraèdres (S₈, P₄) — le fil conducteur ultime de toute la chimie minérale descriptive de ce module.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Les 3 acides industriels majeurs de la chimie minérale sont H₂SO₄, HNO₃ et H₃PO₄ — retenir pour chacun ses propriétés propres (oxydant, nitrant, non-oxydant...)</li>
        <li>Une transformation d'un élément d'une forme moléculaire (X=X ou X≡X) vers une forme polymérisée (cycles ou tétraèdres) n'est favorable QUE si les liaisons simples formées compensent l'énergie des liaisons multiples rompues</li>
        <li>La valeur numérique de K dépend de la façon dont l'équation-bilan est écrite (coefficients stœchiométriques) — toujours vérifier l'équation associée à un K donné</li>
        <li>Le rapport r⁺/r⁻ permet de prédire la coordinence d'un cristal ionique (CsCl : coordinence 8, cubique)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de multiplier ΔfG° par le coefficient stœchiométrique du produit avant de calculer ΔrG°</li>
        <li>Confondre l'ordre de grandeur : une réaction endothermique en énergie de liaison (ΔH>0) n'est pas forcément « impossible » en toutes conditions, mais elle est largement défavorisée à température usuelle</li>
        <li>Se tromper de signe en écrivant le rapport K₁=1/K₂ lorsqu'on change le sens ou les coefficients d'une réaction</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La transformation de O₂ en cyclooctaoxygène O₈ est, d'après le bilan énergétique des liaisons :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min8e1" value="wrong"> très favorable</label>
          <label class="option"><input type="radio" name="min8e1" value="right"> impossible (très défavorable)</label>
          <label class="option"><input type="radio" name="min8e1" value="wrong"> athermique</label>
          <label class="option"><input type="radio" name="min8e1" value="wrong"> identique à celle du soufre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min8e1','min8fb1','Correct — ΔH=+840 kJ/mol pour O2→O8, très défavorable : contrairement au soufre, l\\'oxygène reste sous forme O2.','Compare l\\'énergie d\\'une liaison double O=O (très forte, 494 kJ/mol) à celle de 2 liaisons simples O-O (142×2=284 kJ/mol) : est-ce gagnant de casser la double liaison ?')">Vérifier</button>
        <div class="feedback" id="min8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans le cristal CsCl (cubique centré), l'indice de coordination de Cs⁺ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min8e2" value="wrong"> 4</label>
          <label class="option"><input type="radio" name="min8e2" value="wrong"> 6</label>
          <label class="option"><input type="radio" name="min8e2" value="right"> 8</label>
          <label class="option"><input type="radio" name="min8e2" value="wrong"> 12</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min8e2','min8fb2','Correct — r+/r- proche de 1 (0,732 à 1) correspond à un arrangement cubique, coordinence 8 : Cs+ au centre, 8 Cl- aux sommets du cube.','Le rapport r+/r- pour CsCl est proche de 1 : dans quel intervalle de compacité cela tombe-t-il ?')">Vérifier</button>
        <div class="feedback" id="min8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Si on écrit la synthèse de l'ammoniac ½N₂+3/2H₂⇌NH₃ au lieu de N₂+3H₂⇌2NH₃, la nouvelle constante d'équilibre K₂ est liée à K₁ (de l'équation d'origine) par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="min8e3" value="wrong"> K₂ = K₁</label>
          <label class="option"><input type="radio" name="min8e3" value="wrong"> K₂ = 2×K₁</label>
          <label class="option"><input type="radio" name="min8e3" value="right"> K₂ = 1/K₁ (au signe des coefficients près, K₂ ≈ √K₁ selon la convention)</label>
          <label class="option"><input type="radio" name="min8e3" value="wrong"> K₂ n'a aucun lien avec K₁</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('min8e3','min8fb3','Correct — changer les coefficients stœchiométriques (ici diviser par 2) change la valeur numérique de K, même si la réaction physique reste la même.','Diviser tous les coefficients d\\'une réaction par 2 revient à prendre la racine carrée de sa constante d\\'équilibre — ce n\\'est PAS la même valeur que K1.')">Vérifier</button>
        <div class="feedback" id="min8fb3"></div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">💭 Questions de réflexion</span>
      <ul>
        <li>Et si l'on ne disposait d'aucune donnée d'énergie de liaison pour un élément inconnu : quelles autres méthodes pourrait-on employer pour prédire sa forme moléculaire stable ?</li>
        <li>Pourquoi les exercices combinant plusieurs notions (structure, énergie, équilibre) sont-ils considérés comme plus révélateurs de la compréhension réelle d'un étudiant que des exercices isolés portant sur une seule notion à la fois ?</li>
        <li>Quelle serait la conséquence, pour la recherche de nouveaux matériaux, d'une méthode de calcul quantique capable de prédire avec certitude toutes les formes allotropiques stables de n'importe quel élément ?</li>
      </ul>
    </div>

    <div class="recap-box">
      <span class="eyebrow">📚 Références bibliographiques</span>
      <ul>
        <li>P. Arnaud, <em>Chimie générale</em>, Dunod — recueil d'exercices de synthèse en chimie minérale descriptive.</li>
        <li>N. N. Greenwood, A. Earnshaw, <em>Chemistry of the Elements</em>, Butterworth-Heinemann — référence exhaustive sur la chimie descriptive de tous les éléments du tableau périodique.</li>
        <li>A. K. Geim, K. S. Novoselov, « The Rise of Graphene », Nature Materials, 2007 — exemple emblématique de prédiction puis découverte d'un nouvel allotrope (prix Nobel de physique 2010).</li>
      </ul>
    </div>

    <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module de chimie minérale : parti de la structure la plus élémentaire de l'atome, tu termines en sachant combiner énergie de liaison, thermodynamique et équilibres chimiques pour résoudre des problèmes complets, calqués sur de véritables sujets d'examen. Ce parcours — structure atomique, tableau périodique, hydrogène, oxygène, halogènes, soufre, azote, phosphore, et enfin synthèse industrielle — constitue le socle descriptif indispensable de toute la chimie inorganique que tu rencontreras dans la suite de ta formation. Comme le rappelle le fil conducteur qui a traversé tout ce module : de la configuration électronique d'un simple atome jusqu'aux cuves industrielles produisant des centaines de millions de tonnes de produits chimiques chaque année, une même logique, patiemment construite chapitre après chapitre, permet de comprendre et de prédire le comportement de la matière.</p>
  `
};

MIN_NOVA_KB[minKey('Applications industrielles et exercices de synthèse')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Applications industrielles et exercices de synthèse ». Demande-moi un rappel sur les usages industriels, un exercice corrigé du polycopié, ou un indice.",
  rules: [
    { test:/application|industrie|usage/i, replies:["H2 → ammoniac et raffinage ; O2 → sidérurgie et PVC ; Cl2 → désinfection et eau de Javel ; S/H2SO4 → engrais et détergents ; N/NH3-HNO3 → engrais et explosifs ; P/H3PO4 → engrais et allumettes."] },
    { test:/s2.*s8|o2.*o8|cat[ée]nation.*[ée]nergie/i, replies:["Pour le soufre, 4 S=S→8 S-S dégage −108 kJ/mol (favorable, d'où S8) ; pour l'oxygène, 4 O=O→8 O-O coûte +840 kJ/mol (impossible, d'où O2)."] },
    { test:/n2.*n4|p2.*p4|t[ée]tram[ée]risation/i, replies:["Pour le phosphore, 2 P≡P→P4 dégage −22,4 kJ/mol (légèrement favorable, d'où P4) ; pour l'azote, 2 N≡N→N4 coûte +882,4 kJ/mol (impossible, d'où pas de N4, N2 reste la forme stable)."] },
    { test:/csci|cscl|compacit[ée]|coordinence/i, replies:["CsCl cristallise en cubique centré : r+/r- proche de 1 → arrangement cubique, coordinence 8 (chaque ion entouré de 8 voisins de signe opposé)."] },
    { test:/kp|constante d.[ée]quilibre|ammoniac.*[ée]quilibre/i, replies:["Pour N2+3H2⇌2NH3 à 298K, avec ΔfG°(NH3)=-16,5 kJ/mol : ΔrG°=-33 kJ/mol, Kp≈776,6. Diviser les coefficients par 2 change K (Kp2≈1,28×10⁻³)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare l'énergie d'une liaison double à celle de 2 liaisons simples pour l'oxygène.","Indice niveau 2 : casser O=O (494) contre former 2×O-O (284) — un déficit énergétique.","Indice niveau 3 : la transformation est impossible, très défavorable (+840 kJ/mol)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde le rapport r+/r- pour CsCl, proche de 1.","Indice niveau 2 : ça correspond à l'intervalle 0,732 à 1.","Indice niveau 3 : coordinence 8, arrangement cubique."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : diviser les coefficients d'une réaction par 2 change la constante d'équilibre.","Indice niveau 2 : ΔG° est aussi divisé par 2, donc K devient sa racine carrée (ou son inverse selon convention).","Indice niveau 3 : K2 ≠ K1, ils sont liés par cette relation, pas égaux."] }
  ]
};

/* fusionne le module Chimie Minérale dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, MIN_CHAPTERS);
Object.assign(NOVA_KB, MIN_NOVA_KB);