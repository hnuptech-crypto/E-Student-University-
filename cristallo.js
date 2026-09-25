/* =====================================================================
   CHUNK « cristallo » — registre CRISTALLO_CHAPTERS / CRISTALLO_NOVA_KB
   Matière(s) : Chimie|Cristallochimie — radiocristallographie
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CRISTALLO_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — CRISTALLOCHIMIE / RADIOCRISTALLOGRAPHIE (L3CF, domaine Chimie)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : état cristallin, symétrie et réseaux de Bravais, groupes d'espace,
   indices de Miller, production des rayons X, loi de Bragg, facteur de structure
   et extinctions systématiques, méthodes expérimentales (Laue, poudre, monocristal),
   résolution et affinement de structure (Patterson, méthodes directes, Rietveld),
   cristallochimie des solides inorganiques (empilements compacts, sites interstitiels).
   Références de fond : C. Giacovazzo et al., Fundamentals of Crystallography (IUCr/OUP) ;
   B.D. Cullity & S.R. Stock, Elements of X-Ray Diffraction ; International Tables for
   Crystallography Vol. A ; J.-J. Rousseau, Cristallographie géométrique et radiocristallographie
   (Dunod) — conforme aux maquettes LMD de cristallochimie L3 Chimie.
===================================================================================== */
const CRISTALLO_MATIERE = 'Cristallochimie — radiocristallographie';
function cristKey(chapterTitle){ return `Chimie|${CRISTALLO_MATIERE}|${chapterTitle}`; }
const CRISTALLO_CHAPTERS = {};
const CRISTALLO_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de la loi de Bragg (chapitre 6)
--------------------------------------------------------------------------------- */
function updateBraggSim(){
  const lambda = parseFloat(document.getElementById('braggLambda').value) || 1.5406;
  const d = parseFloat(document.getElementById('braggD').value) || 2.0;
  const n = parseInt(document.getElementById('braggN').value) || 1;
  const out = document.getElementById('braggReadout');
  const ratio = (n*lambda)/(2*d);
  if(ratio > 1){
    out.innerHTML = `Aucune réflexion possible : n·λ / (2d) = ${ratio.toFixed(3)} &gt; 1. Il faut une distance <em>d</em> plus grande ou une longueur d'onde <em>λ</em> plus petite.`;
    return;
  }
  const thetaRad = Math.asin(ratio);
  const thetaDeg = thetaRad * 180 / Math.PI;
  out.innerHTML = `Condition de Bragg : n·λ = 2d·sin θ &nbsp;→&nbsp; sin θ = ${ratio.toFixed(4)}<br>` +
    `Angle de Bragg : θ = <strong>${thetaDeg.toFixed(2)}°</strong> — angle de diffraction (goniomètre) : 2θ = <strong>${(2*thetaDeg).toFixed(2)}°</strong>`;
}
function initBraggSim(){ updateBraggSim(); }

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Calculateur de distance réticulaire d_hkl (système cubique) — chapitre 4
--------------------------------------------------------------------------------- */
function updateDhklSim(){
  const a = parseFloat(document.getElementById('dhklA').value) || 4.05;
  const h = parseInt(document.getElementById('dhklH').value) || 1;
  const k = parseInt(document.getElementById('dhklK').value) || 1;
  const l = parseInt(document.getElementById('dhklL').value) || 1;
  const denom = Math.sqrt(h*h + k*k + l*l);
  const out = document.getElementById('dhklReadout');
  if(denom === 0){
    out.innerHTML = `Les indices (h k l) ne peuvent pas être tous nuls.`;
    return;
  }
  const d = a / denom;
  out.innerHTML = `d<sub>(${h}${k}${l})</sub> = a / √(h²+k²+l²) = ${a.toFixed(3)} / √(${h*h+k*k+l*l}) = <strong>${d.toFixed(4)} Å</strong>`;
}
function initDhklSim(){ updateDhklSim(); }

/* =========================== CHAPITRE 1 =========================== */
CRISTALLO_CHAPTERS[cristKey("L'état cristallin : ordre, réseau et maille élémentaire")] = {
  objectives: [
    "Distinguer solide cristallin, solide amorphe et état polycristallin",
    "Définir le réseau de points, le motif et le cristal (cristal = réseau ⊗ motif)",
    "Construire et décrire une maille élémentaire à l'aide de ses paramètres (a, b, c, α, β, γ)",
    "Distinguer maille simple, maille multiple et maille élémentaire (primitive)",
    "Expliquer pourquoi la classification géométrique de Bravais (1848) demeure, près de deux siècles plus tard, le cadre universel de description de tout réseau cristallin"
  ],
  prereqs: ["Notions de base de chimie du solide", "Structure atomique et liaisons chimiques (L1)"],
  bodyHtml: `
    <p>En 1848, le cristallographe français <strong>Auguste Bravais</strong> démontre par un raisonnement purement géométrique qu'il n'existe que <strong>14 façons distinctes</strong> de répéter un point dans les trois dimensions de l'espace pour engendrer un réseau périodique — les 14 réseaux dits « de Bravais ». Ce résultat, obtenu près d'un demi-siècle avant que Röntgen ne découvre les rayons X (1895) et que von Laue ne réalise la première expérience de diffraction sur un cristal (1912), reste aujourd'hui encore le socle géométrique sur lequel repose toute description d'un solide cristallisé.</p>

    <p>Cette géométrie n'est pas qu'une curiosité d'historien des sciences : elle conditionne très concrètement les propriétés des matériaux qui nous entourent — la dureté du diamant, la conductivité contrôlée du silicium dans un microprocesseur, ou l'efficacité d'un principe actif pharmaceutique dépendent directement de la façon dont leurs atomes s'arrangent périodiquement dans une maille cristalline.</p>

    <p>La cristallochimie étudie l'organisation des atomes, ions ou molécules dans les solides cristallins, et la <strong>radiocristallographie</strong> (ou diffraction des rayons X) est l'outil expérimental qui permet de déterminer cette organisation. Ce premier chapitre pose les bases géométriques indispensables — réseau, motif, maille élémentaire — avant d'aborder la diffraction proprement dite dans les chapitres suivants.</p>

    <h3>1. Solides cristallins, amorphes et polycristallins</h3>
    <p>Un solide est dit <strong>cristallin</strong> lorsque ses constituants (atomes, ions, molécules) sont disposés selon un <strong>ordre à longue distance</strong>, périodique dans les trois directions de l'espace. À l'inverse, un solide <strong>amorphe</strong> (verre, certains polymères) ne présente qu'un ordre à courte distance, sans périodicité tridimensionnelle. Un échantillon <strong>polycristallin</strong> (la plupart des matériaux réels : céramiques, métaux, poudres) est constitué d'un grand nombre de petits cristaux — les <em>grains</em> ou <em>cristallites</em> — orientés de façon aléatoire, chacun étant lui-même parfaitement ordonné.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 90" width="100%">
          <g stroke="#4C7CFF" stroke-width="1" fill="#4C7CFF">
            <circle cx="15" cy="15" r="3"/><circle cx="35" cy="15" r="3"/><circle cx="55" cy="15" r="3"/><circle cx="75" cy="15" r="3"/><circle cx="95" cy="15" r="3"/>
            <circle cx="15" cy="35" r="3"/><circle cx="35" cy="35" r="3"/><circle cx="55" cy="35" r="3"/><circle cx="75" cy="35" r="3"/><circle cx="95" cy="35" r="3"/>
            <circle cx="15" cy="55" r="3"/><circle cx="35" cy="55" r="3"/><circle cx="55" cy="55" r="3"/><circle cx="75" cy="55" r="3"/><circle cx="95" cy="55" r="3"/>
            <circle cx="15" cy="75" r="3"/><circle cx="35" cy="75" r="3"/><circle cx="55" cy="75" r="3"/><circle cx="75" cy="75" r="3"/><circle cx="95" cy="75" r="3"/>
          </g>
        </svg>
        <span>Solide cristallin — ordre périodique à longue distance</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 90" width="100%">
          <g stroke="#F0555C" stroke-width="1" fill="#F0555C">
            <circle cx="12" cy="18" r="3"/><circle cx="38" cy="12" r="3"/><circle cx="60" cy="22" r="3"/><circle cx="82" cy="14" r="3"/><circle cx="102" cy="24" r="3"/>
            <circle cx="20" cy="42" r="3"/><circle cx="45" cy="38" r="3"/><circle cx="68" cy="46" r="3"/><circle cx="90" cy="40" r="3"/><circle cx="30" cy="65" r="3"/>
            <circle cx="55" cy="70" r="3"/><circle cx="78" cy="62" r="3"/><circle cx="15" cy="80" r="3"/><circle cx="95" cy="78" r="3"/>
          </g>
        </svg>
        <span>Solide amorphe — pas d'ordre à longue distance</span>
      </div>
    </div>

    <h3>2. Réseau, motif et cristal</h3>
    <p>On sépare toujours deux notions dans la description d'un cristal :</p>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th></tr>
      <tr><td><strong>Réseau (lattice)</strong></td><td>Ensemble infini, purement géométrique, de points (<em>nœuds</em>) obtenus par translation périodique d'un point origine dans les trois directions de l'espace</td></tr>
      <tr><td><strong>Motif (base)</strong></td><td>Groupement d'atomes, d'ions ou de molécules associé à chaque nœud du réseau — c'est le contenu chimique réel</td></tr>
      <tr><td><strong>Cristal</strong></td><td>Résultat de l'association réseau + motif : <em>Cristal = Réseau ⊗ Motif</em></td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le réseau est une abstraction mathématique (des points sans dimension) ; le cristal réel s'obtient en « décorant » chaque nœud avec le motif atomique ou moléculaire de la structure étudiée. Deux cristaux peuvent partager le même réseau mais avoir des motifs très différents (ex : NaCl et diamant sont tous deux cubiques faces centrées, mais avec des motifs différents).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si NaCl et le diamant partagent le même réseau cubique à faces centrées mais ont des propriétés physiques radicalement différentes (l'un est un isolant friable, l'autre le matériau naturel le plus dur connu), qu'est-ce que cela vous apprend sur la part respective du réseau et du motif dans la détermination des propriétés d'un solide ?
    </div>

    <h3>3. La maille élémentaire</h3>
    <p>Pour décrire un réseau infini de façon compacte, on choisit une <strong>maille</strong> : un parallélépipède construit sur trois vecteurs de base non coplanaires $\\vec{a}$, $\\vec{b}$, $\\vec{c}$, dont la répétition par translation (sans rotation) engendre l'ensemble du réseau. La maille est entièrement définie par six <strong>paramètres cristallins</strong> :</p>
    <div class="formula-box">$a,\\ b,\\ c$ (longueurs des arêtes) &nbsp;et&nbsp; $\\alpha,\\ \\beta,\\ \\gamma$ (angles entre arêtes)</div>
    <p>avec la convention $\\alpha = (\\vec{b},\\vec{c})$, $\\beta = (\\vec{a},\\vec{c})$, $\\gamma = (\\vec{a},\\vec{b})$.</p>

    <h3>4. Maille primitive et maille multiple</h3>
    <p>Une <strong>maille primitive</strong> (ou simple, notée <em>P</em>) ne contient qu'un seul nœud de réseau en propre (les 8 nœuds des sommets sont chacun partagés entre 8 mailles voisines, soit 8 × 1/8 = 1 nœud). Il est cependant souvent plus pratique — pour respecter visuellement la symétrie du réseau — de choisir une <strong>maille multiple</strong> contenant 2, 3 ou 4 nœuds (mailles centrées I, à faces centrées F, à base centrée A/B/C). Le choix se fait toujours pour représenter la symétrie la plus haute possible, même si la maille n'est alors plus la plus petite possible en volume.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Combien de nœuds contient une maille cubique à faces centrées (F) ?</p>
      <p><strong>Solution :</strong> 8 sommets partagés à 1/8 chacun (8 × 1/8 = 1), plus 6 centres de faces partagés à 1/2 chacun (6 × 1/2 = 3). Total : 1 + 3 = 4 nœuds par maille.</p>
      <p class="example-answer">Réponse : une maille F contient 4 nœuds de réseau.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La maille F n'est pas la plus petite maille possible du réseau cubique à faces centrées — une maille primitive plus petite existerait aussi. Pourquoi les cristallographes choisissent-ils malgré tout systématiquement la maille F, quitte à « payer » trois nœuds surnuméraires par maille ?
    </div>

    <h3>5. Rangées, plans réticulaires et compacité</h3>
    <p>Un réseau cristallin peut être décrit par des <strong>rangées</strong> (droites passant par des nœuds alignés) et des <strong>plans réticulaires</strong> (plans contenant une infinité de nœuds coplanaires) — ces plans seront caractérisés au chapitre 4 par les indices de Miller. La <strong>compacité</strong> d'une structure est le rapport entre le volume réellement occupé par les atomes (assimilés à des sphères dures tangentes) et le volume total de la maille ; elle permet de comparer l'efficacité d'empilement de différentes structures (voir chapitre 10).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Il existe 7 systèmes cristallins (triclinique, monoclinique, orthorhombique, quadratique, trigonal, hexagonal, cubique), qui définissent les contraintes de symétrie sur les paramètres de maille (a, b, c, α, β, γ). Ils seront détaillés au chapitre suivant avec les 14 réseaux de Bravais.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Un solide cristallin présente un ordre périodique à longue distance ; un solide amorphe n'a qu'un ordre à courte distance</li>
      <li>Cristal = Réseau (points géométriques) ⊗ Motif (contenu chimique atomique/moléculaire)</li>
      <li>La maille élémentaire est définie par 6 paramètres : a, b, c, α, β, γ</li>
      <li>Une maille primitive (P) contient 1 nœud ; une maille multiple (I, F, A/B/C) en contient 2, 3 ou 4, choisie pour respecter la symétrie du réseau</li>
      <li>On compte les nœuds partagés : 1/8 pour un sommet, 1/2 pour un centre de face, 1/4 pour une arête, 1 pour un nœud interne</li>
    </ul>
    <p class="recap-note">Vérifie que ces points sont acquis avec les exercices ci-dessous avant de passer à la symétrie cristalline (chapitre 2).</p>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre « réseau » (points abstraits) et « cristal » (réseau décoré par le motif atomique réel)</li>
      <li>Oublier la pondération des nœuds partagés lors du comptage (sommet = 1/8, pas 1)</li>
      <li>Croire qu'une maille multiple est « fausse » — elle est un choix valide privilégiant la symétrie visible</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Une maille cubique centrée (I) contient combien de nœuds de réseau ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr1e1" value="wrong">1</label>
        <label class="option"><input type="radio" name="cr1e1" value="right">2</label>
        <label class="option"><input type="radio" name="cr1e1" value="wrong">4</label>
        <label class="option"><input type="radio" name="cr1e1" value="wrong">9</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr1e1','cr1fb1','Correct — 8 sommets × 1/8 = 1, plus 1 nœud au centre du cube (non partagé) = 2 nœuds.','Compte : 8 sommets partagés à 1/8 chacun, plus le nœud central qui appartient entièrement à la maille.')">Vérifier</button>
      <div class="feedback" id="cr1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quelle affirmation décrit correctement la relation entre réseau et cristal ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr1e2" value="wrong">Le réseau est le cristal lui-même, avec tous ses atomes</label>
        <label class="option"><input type="radio" name="cr1e2" value="right">Le cristal s'obtient en associant un motif chimique à chaque nœud du réseau géométrique</label>
        <label class="option"><input type="radio" name="cr1e2" value="wrong">Un même cristal ne peut avoir qu'un seul type de réseau possible</label>
        <label class="option"><input type="radio" name="cr1e2" value="wrong">Le motif est toujours réduit à un seul atome</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr1e2','cr1fb2','Correct — Cristal = Réseau ⊗ Motif : le réseau donne la périodicité, le motif donne le contenu chimique.','Reviens à la définition : le réseau est purement géométrique, le motif est le contenu atomique/moléculaire associé à chaque nœud.')">Vérifier</button>
      <div class="feedback" id="cr1fb2"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>La description en réseau + motif, héritée de Bravais, reste le langage de base des outils modernes de <strong>criblage cristallin à haut débit</strong> utilisés en science des matériaux et en pharmacie : des algorithmes de prédiction de structure (comme USPEX ou les modèles génératifs récents entraînés sur des bases de données cristallographiques telles que le Cambridge Structural Database) explorent aujourd'hui des millions de combinaisons réseau/motif pour proposer de nouveaux polymorphes cristallins — une question reste largement ouverte : peut-on prédire, à partir de la seule composition chimique d'une molécule, laquelle de ses formes cristallines (souvent plusieurs sont possibles, phénomène dit de <em>polymorphisme</em>) sera thermodynamiquement la plus stable dans des conditions données ?</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Point origine → translation périodique 3D → <strong>Réseau</strong> (nœuds géométriques) → décoration de chaque nœud par le <strong>Motif</strong> (atomes/ions/molécules) → <strong>Cristal</strong> → description compacte par une <strong>Maille élémentaire</strong> (paramètres a, b, c, α, β, γ) → choix maille primitive (1 nœud) ou multiple (I, F, A/B/C : 2 à 4 nœuds) selon la symétrie recherchée</p>
    <p><strong>Résultat central du chapitre :</strong></p>
    <div class="formula-box">Cristal = Réseau ⊗ Motif</div>
    <p style="margin-top:8px;">avec, pour le comptage des nœuds d'une maille : sommet → 1/8, arête → 1/4, face → 1/2, intérieur → 1 (nœud entier).</p>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si un matériau possédait un réseau parfaitement périodique mais un motif qui varie légèrement, de façon aléatoire, d'un nœud à l'autre (comme dans certains alliages désordonnés) — resterait-il légitime de le qualifier de « cristal » au sens strict de ce chapitre ?</li>
      <li>Pourquoi Bravais a-t-il eu besoin d'un raisonnement purement mathématique, sans aucune expérience de diffraction (qui n'existait pas encore en 1848), pour établir qu'il n'existe que 14 réseaux possibles ?</li>
      <li>Quelle serait la conséquence, pour l'interprétation d'une future expérience de diffraction (chapitre 6), du choix d'une maille multiple plutôt que primitive pour décrire un même cristal ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>A. Bravais, <em>Mémoire sur les systèmes formés par des points distribués régulièrement sur un plan ou dans l'espace</em>, Journal de l'École Polytechnique, 1850 (présenté à l'Académie des sciences en 1848) — l'article fondateur des 14 réseaux.</li>
      <li>C. Giacovazzo (dir.), <em>Fundamentals of Crystallography</em>, Oxford University Press — référence standard de niveau L3/master pour l'ensemble de ce chantier de radiocristallographie.</li>
      <li>Cambridge Crystallographic Data Centre (CCDC), documentation du <em>Cambridge Structural Database</em> — pour un aperçu des outils de criblage cristallin à haut débit évoqués en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais lire un cristal comme Bravais l'a pensé : un réseau de points habillé d'un motif chimique. Au chapitre suivant, ce squelette géométrique va se révéler porteur d'une richesse insoupçonnée — la symétrie — qui explique justement pourquoi il n'existe que 14 réseaux de Bravais, et pas un de plus.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("L'état cristallin : ordre, réseau et maille élémentaire")] = {
  intro: "Salut, moi c'est Nova ! On démarre la cristallochimie avec les bases : réseau, motif, maille. Pose-moi une question sur ces notions, ou demande-moi un indice sur un exercice.",
  rules: [
    { test:/motif|r[ée]seau/i, replies:[
      "Le réseau est un ensemble de points géométriques infinis et périodiques ; le motif est le groupement d'atomes/ions/molécules attaché à chaque nœud. Cristal = Réseau ⊗ Motif.",
      "Deux cristaux différents peuvent partager exactement le même réseau (même géométrie de points) tout en ayant des motifs chimiques complètement différents."
    ]},
    { test:/maille primitive|maille multiple|maille simple/i, replies:[
      "Une maille primitive (P) contient 1 seul nœud propre. Une maille multiple (I, F, A/B/C) en contient 2, 3 ou 4 : on la choisit malgré tout car elle représente mieux la symétrie du réseau."
    ]},
    { test:/compt(er|age)|sommet|centre de face/i, replies:[
      "Règles de comptage des nœuds partagés : sommet → 1/8, arête → 1/4, face → 1/2, intérieur → 1 (entier). Additionne pour chaque type de position dans la maille."
    ]},
    { test:/amorphe|polycristallin/i, replies:[
      "Un solide amorphe n'a qu'un ordre à courte distance (pas de périodicité 3D). Un solide polycristallin est un assemblage de nombreux petits cristaux (grains) orientés aléatoirement, chacun étant parfaitement ordonné."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : compte séparément la contribution des 8 sommets et celle du nœud central.",
      "Indice niveau 2 : les 8 sommets contribuent chacun pour 1/8, soit 1 nœud au total pour eux.",
      "Indice niveau 3 : le nœud central n'est partagé avec aucune autre maille, il compte pour 1 entier. Total : 1 + 1 = 2."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : repense à la définition Cristal = Réseau ⊗ Motif.",
      "Indice niveau 2 : le réseau donne uniquement la périodicité géométrique, pas le contenu chimique.",
      "Indice niveau 3 : c'est bien l'association réseau + motif qui définit le cristal réel."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
CRISTALLO_CHAPTERS[cristKey("Symétrie cristalline : éléments, opérations et réseaux de Bravais")] = {
  objectives: [
    "Identifier les éléments de symétrie ponctuelle (rotation, miroir, centre d'inversion, roto-inversion)",
    "Justifier la restriction cristallographique : seuls les ordres 1, 2, 3, 4 et 6 sont compatibles avec un réseau périodique",
    "Reconnaître les 7 systèmes cristallins et leurs contraintes sur les paramètres de maille",
    "Énumérer les 14 réseaux de Bravais et leur répartition dans les 7 systèmes",
    "Évaluer en quoi la découverte des quasi-cristaux par Shechtman (1982) confirme, en la contournant par la perte de périodicité, la portée de la restriction cristallographique classique"
  ],
  prereqs: ["L'état cristallin : ordre, réseau et maille élémentaire"],
  bodyHtml: `
    <p>En 1982, le chimiste israélien <strong>Dan Shechtman</strong> observe, par diffraction électronique sur un alliage aluminium-manganèse trempé rapidement, une figure présentant une symétrie d'ordre 10 — strictement interdite par la restriction cristallographique que ce chapitre va démontrer. Sa découverte, d'abord accueillie avec un vif scepticisme (Linus Pauling ira jusqu'à affirmer publiquement qu'« il n'y a pas de quasi-cristaux, seulement des quasi-scientifiques »), sera finalement confirmée et vaudra à Shechtman le prix Nobel de chimie 2011 : les <em>quasi-cristaux</em> échappent à la règle en renonçant à la stricte périodicité, tout en conservant un ordre à longue distance.</p>

    <p>Cet épisode illustre à quel point la classification par symétrie n'est pas un exercice académique abstrait : elle trace une frontière nette entre ce qu'un cristal périodique peut être et ne peut pas être, et la franchir suppose un objet fondamentalement nouveau. Ces mêmes principes de symétrie expliquent aussi, plus simplement, pourquoi un carrelage régulier peut être pavé de carrés, de triangles ou d'hexagones à l'infini, mais jamais de pentagones réguliers.</p>

    <p>La <strong>symétrie</strong> est au cœur de la cristallographie : elle permet de classer tous les cristaux existants en un nombre fini de familles, et elle contraint directement les figures de diffraction observées en radiocristallographie (voir chapitres 6 et 7).</p>

    <h3>1. Éléments de symétrie ponctuelle</h3>
    <p>Une <strong>opération de symétrie</strong> transforme un objet en lui-même (elle le laisse invariant). On distingue :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Symbole (Hermann-Mauguin)</th><th>Opération</th></tr>
      <tr><td>Axe de rotation propre d'ordre n</td><td>1, 2, 3, 4, 6</td><td>Rotation de $360°/n$</td></tr>
      <tr><td>Centre d'inversion (centre de symétrie)</td><td>$\\bar{1}$</td><td>$(x,y,z) \\to (-x,-y,-z)$</td></tr>
      <tr><td>Plan miroir</td><td>$m$</td><td>Réflexion par rapport à un plan</td></tr>
      <tr><td>Axe de roto-inversion</td><td>$\\bar{2},\\bar{3},\\bar{4},\\bar{6}$</td><td>Rotation de $360°/n$ suivie d'une inversion</td></tr>
      <tr><td>Axe hélicoïdal (translation)</td><td>$2_1, 3_1, 4_1$...</td><td>Rotation + translation le long de l'axe</td></tr>
      <tr><td>Plan de glissement</td><td>$a, b, c, n, d$</td><td>Réflexion + translation dans le plan</td></tr>
    </table>
    <p>Les axes et translations hélicoïdaux/de glissement (dernières deux lignes) sont des <strong>éléments de symétrie spatiale</strong> : ils combinent une opération ponctuelle avec une translation fractionnaire de la maille, et n'existent donc que dans le cristal réel (pas dans un simple point).</p>

    <h3>2. La restriction cristallographique</h3>
    <p>Contrairement à une molécule isolée (qui peut posséder un axe d'ordre 5, 7, etc.), un <strong>réseau périodique</strong> ne peut être compatible qu'avec des axes de rotation d'ordre <strong>1, 2, 3, 4 ou 6</strong>. C'est la <strong>restriction cristallographique</strong> : un pavage périodique du plan ou de l'espace ne peut pas être construit avec une symétrie d'ordre 5 ou supérieur à 6 (d'où l'absence de pavage régulier à base de pentagones, et la découverte tardive et exceptionnelle des « quasi-cristaux » qui échappent à cette règle en perdant la périodicité stricte).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — démonstration rapide</span>
      Si on essaie de paver le plan avec des rotations d'ordre 5, la somme des translations autour d'un nœud ne peut pas refermer un réseau périodique : seuls n = 1, 2, 3, 4, 6 permettent une translation nette compatible avec la périodicité (démonstration classique par le théorème de restriction cristallographique).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les quasi-cristaux de Shechtman présentent une symétrie d'ordre 10, pourtant interdite par la restriction cristallographique. Que doit nécessairement sacrifier un tel objet pour échapper à cette démonstration, qui repose entièrement sur l'hypothèse d'un réseau périodique ?
    </div>

    <h3>3. Les 7 systèmes cristallins</h3>
    <p>La combinaison des contraintes de symétrie minimale sur la maille définit 7 systèmes cristallins, classés par symétrie décroissante :</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Contraintes sur la maille</th><th>Symétrie minimale caractéristique</th></tr>
      <tr><td>Cubique</td><td>$a=b=c$, $\\alpha=\\beta=\\gamma=90°$</td><td>4 axes 3 (diagonales du cube)</td></tr>
      <tr><td>Quadratique (tétragonal)</td><td>$a=b\\ne c$, $\\alpha=\\beta=\\gamma=90°$</td><td>1 axe 4</td></tr>
      <tr><td>Hexagonal</td><td>$a=b\\ne c$, $\\alpha=\\beta=90°$, $\\gamma=120°$</td><td>1 axe 6</td></tr>
      <tr><td>Trigonal (rhomboédrique)</td><td>$a=b=c$, $\\alpha=\\beta=\\gamma\\ne90°$</td><td>1 axe 3</td></tr>
      <tr><td>Orthorhombique</td><td>$a\\ne b\\ne c$, $\\alpha=\\beta=\\gamma=90°$</td><td>3 axes 2 perpendiculaires</td></tr>
      <tr><td>Monoclinique</td><td>$a\\ne b\\ne c$, $\\alpha=\\gamma=90°\\ne\\beta$</td><td>1 axe 2 (ou 1 plan m)</td></tr>
      <tr><td>Triclinique</td><td>$a\\ne b\\ne c$, $\\alpha\\ne\\beta\\ne\\gamma\\ne90°$</td><td>Aucune (ou seulement $\\bar{1}$)</td></tr>
    </table>

    <h3>4. Les 14 réseaux de Bravais</h3>
    <p>En 1848, Auguste Bravais a démontré qu'il n'existe que <strong>14 façons distinctes</strong> de disposer des points de manière périodique dans l'espace tridimensionnel en respectant les 7 systèmes cristallins — ce sont les <strong>14 réseaux de Bravais</strong>. Chaque système admet un ou plusieurs modes de réseau parmi : P (primitif), I (centré / <em>innenzentriert</em>), F (faces centrées), A/B/C (base centrée).</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Modes de réseau possibles</th></tr>
      <tr><td>Triclinique</td><td>P</td></tr>
      <tr><td>Monoclinique</td><td>P, C</td></tr>
      <tr><td>Orthorhombique</td><td>P, C, I, F</td></tr>
      <tr><td>Quadratique</td><td>P, I</td></tr>
      <tr><td>Trigonal</td><td>R (rhomboédrique)</td></tr>
      <tr><td>Hexagonal</td><td>P</td></tr>
      <tr><td>Cubique</td><td>P, I, F</td></tr>
    </table>
    <p>Ce tableau totalise bien 1 + 2 + 4 + 2 + 1 + 1 + 3 = <strong>14 réseaux</strong> — ni plus, ni moins : toute autre combinaison apparente (par exemple une maille « quadratique à faces centrées ») se ramène en réalité, après changement de maille, à l'un de ces 14 réseaux.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi n'existe-t-il pas de réseau « cubique à base centrée » (C) dans la liste des 14 réseaux de Bravais ?</p>
      <p><strong>Solution :</strong> Un centrage sur une seule paire de faces (C) briserait la symétrie cubique (qui exige l'équivalence des trois directions a, b, c par les 4 axes 3). Un tel réseau, s'il était construit, se révèle en fait identique à un réseau quadratique P plus petit après changement d'axes — il n'apporte donc pas de nouveau réseau distinct.</p>
      <p class="example-answer">Réponse : la maille se réduit à un réseau déjà répertorié (quadratique P), ce n'est pas un réseau cubique C indépendant.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si une maille « cubique à base centrée » proposée se révèle toujours identique, après changement d'axes, à un réseau déjà répertorié, qu'est-ce que cela vous apprend sur le critère qui rend deux réseaux de Bravais réellement « distincts » l'un de l'autre ?
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Éléments de symétrie ponctuelle : rotation (n), inversion ($\\bar1$), miroir (m), roto-inversion ($\\bar n$)</li>
      <li>Éléments de symétrie spatiale (avec translation) : axes hélicoïdaux (2₁, 4₁...) et plans de glissement (a, b, c, n, d)</li>
      <li>La restriction cristallographique n'autorise que les axes d'ordre 1, 2, 3, 4 et 6 dans un réseau périodique</li>
      <li>Il existe 7 systèmes cristallins, définis par les contraintes minimales sur (a, b, c, α, β, γ)</li>
      <li>Il existe exactement 14 réseaux de Bravais, répartition des modes P, I, F, A/B/C, R dans les 7 systèmes</li>
    </ul>
    <p class="recap-note">Ces notions sont indispensables pour comprendre les groupes d'espace du chapitre suivant.</p>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre système cristallin (contrainte géométrique sur la maille) et réseau de Bravais (mode de centrage + système)</li>
      <li>Oublier que les axes d'ordre 5 ou 7 sont interdits dans un cristal périodique classique</li>
      <li>Croire que chaque système admet les 4 modes P/I/F/C — en réalité seuls certains modes sont compatibles avec chaque système</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Un axe de rotation d'ordre 5 est-il compatible avec un réseau cristallin périodique en 3D ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr2e1" value="wrong">Oui, c'est un cas courant en cristallographie</label>
        <label class="option"><input type="radio" name="cr2e1" value="right">Non, la restriction cristallographique n'autorise que n = 1, 2, 3, 4, 6</label>
        <label class="option"><input type="radio" name="cr2e1" value="wrong">Oui, mais uniquement dans le système cubique</label>
        <label class="option"><input type="radio" name="cr2e1" value="wrong">Non, seul l'ordre 6 est autorisé</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr2e1','cr2fb1','Correct — un pavage périodique tridimensionnel n\\'est compatible qu\\'avec les ordres 1, 2, 3, 4 et 6 (restriction cristallographique).','Repense à la restriction cristallographique : seuls certains ordres de rotation permettent de refermer un réseau périodique.')">Vérifier</button>
      <div class="feedback" id="cr2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Combien de réseaux de Bravais existe-t-il au total, tous systèmes cristallins confondus ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr2e2" value="wrong">7</label>
        <label class="option"><input type="radio" name="cr2e2" value="wrong">32</label>
        <label class="option"><input type="radio" name="cr2e2" value="right">14</label>
        <label class="option"><input type="radio" name="cr2e2" value="wrong">230</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr2e2','cr2fb2','Correct — Bravais a démontré qu\\'il existe exactement 14 réseaux distincts en 3D (7 est le nombre de systèmes, 230 sera le nombre de groupes d\\'espace du chapitre suivant).','7 est le nombre de systèmes cristallins, 230 sera vu au chapitre 3 pour les groupes d\\'espace : il te reste un nombre entre les deux.')">Vérifier</button>
      <div class="feedback" id="cr2fb2"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 3</span>
      <p class="q">Le système orthorhombique admet quels modes de réseau de Bravais ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr2e3" value="wrong">P uniquement</label>
        <label class="option"><input type="radio" name="cr2e3" value="wrong">P et I uniquement</label>
        <label class="option"><input type="radio" name="cr2e3" value="right">P, C, I et F</label>
        <label class="option"><input type="radio" name="cr2e3" value="wrong">Uniquement R</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr2e3','cr2fb3','Correct — l\\'orthorhombique est le système admettant le plus de modes de centrage : P, C, I, F.','Relis le tableau des 14 réseaux : l\\'orthorhombique est le système le plus riche en modes de centrage.')">Vérifier</button>
      <div class="feedback" id="cr2fb3"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>Depuis la reconnaissance officielle des quasi-cristaux par l'Union internationale de cristallographie (1992, qui a dû redéfinir le mot « cristal » pour les inclure), la recherche explore désormais des <strong>quasi-cristaux « doux »</strong> obtenus non plus dans des alliages métalliques mais dans des copolymères à blocs ou des suspensions colloïdales auto-assemblées, ouvrant la voie à des matériaux photoniques aux propriétés optiques inhabituelles. Une question reste ouverte : peut-on concevoir, par assemblage dirigé, des quasi-cristaux sur mesure présentant un ordre à longue distance choisi à l'avance, plutôt que de les découvrir par hasard comme Shechtman en 1982 ?</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Opérations de symétrie ponctuelle (rotation, miroir, inversion, roto-inversion) → + éléments spatiaux (hélicoïdaux, glissement) → <strong>restriction cristallographique</strong> (seuls n = 1, 2, 3, 4, 6 compatibles avec la périodicité) → contraintes croisées sur (a, b, c, α, β, γ) → <strong>7 systèmes cristallins</strong> → combinaison avec les modes de centrage (P, I, F, A/B/C, R) → <strong>14 réseaux de Bravais</strong></p>
    <p><strong>Résultat central du chapitre :</strong></p>
    <div class="formula-box">n ∈ {1, 2, 3, 4, 6} &nbsp;&nbsp;|&nbsp;&nbsp; 1 + 2 + 4 + 2 + 1 + 1 + 3 = 14 réseaux de Bravais</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si un matériau présentait un ordre à longue distance sans aucune périodicité stricte, comme un quasi-cristal — combien de « systèmes » faudrait-il alors définir pour le classer, sachant que la notion même de système cristallin repose sur la maille périodique ?</li>
      <li>Pourquoi la communauté scientifique, y compris un chimiste aussi éminent que Linus Pauling, a-t-elle d'abord rejeté catégoriquement la découverte de Shechtman plutôt que d'envisager une exception à la restriction cristallographique ?</li>
      <li>Quelle serait la conséquence, sur la figure de diffraction observée en radiocristallographie (chapitres 6 et 7), du passage d'un réseau cubique P à un réseau cubique F pour un même système cristallin ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>D. Shechtman, I. Blech, D. Gratias, J.W. Cahn, <em>Metallic Phase with Long-Range Orientational Order and No Translational Symmetry</em>, Physical Review Letters, 1984 — l'article annonçant la découverte des quasi-cristaux.</li>
      <li>C. Giacovazzo (dir.), <em>Fundamentals of Crystallography</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier de radiocristallographie.</li>
      <li>D. Levine, P.J. Steinhardt, <em>Quasicrystals: A New Class of Ordered Structures</em>, Physical Review Letters, 1984 — le cadre théorique qui a suivi et validé l'interprétation des quasi-cristaux.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">La symétrie vous a livré ses règles — et son unique exception spectaculaire. Au chapitre suivant, ces éléments ponctuels et spatiaux vont se combiner pour former les 230 groupes d'espace : de quoi occuper Shechtman, ses détracteurs, et vous-même pour quelques belles heures de réflexion supplémentaires.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("Symétrie cristalline : éléments, opérations et réseaux de Bravais")] = {
  intro: "Salut, moi c'est Nova ! On aborde la symétrie cristalline et les réseaux de Bravais. Demande-moi de préciser un élément de symétrie, ou un indice sur un exercice.",
  rules: [
    { test:/restriction cristallographique|ordre\\s*5|pentagone/i, replies:[
      "La restriction cristallographique dit qu'un réseau périodique 3D n'est compatible qu'avec des axes de rotation d'ordre 1, 2, 3, 4 ou 6 — c'est pourquoi il n'existe pas de pavage régulier à base de pentagones réguliers.",
      "Les quasi-cristaux (découverts par Shechtman en 1982) échappent à cette règle car ils ne sont pas strictement périodiques, tout en ayant un ordre à longue distance (ex : symétrie d'ordre 5 observée en diffraction)."
    ]},
    { test:/bravais/i, replies:[
      "Il existe exactement 14 réseaux de Bravais en 3D, répartis dans les 7 systèmes cristallins selon les modes P, I, F, A/B/C, R compatibles avec chaque système."
    ]},
    { test:/syst[èe]me cristallin/i, replies:[
      "Les 7 systèmes cristallins (du plus symétrique au moins symétrique) : cubique, quadratique, hexagonal, trigonal, orthorhombique, monoclinique, triclinique. Chacun impose des contraintes différentes sur (a, b, c, α, β, γ)."
    ]},
    { test:/glissement|h[ée]lico[ïi]dal|axe 2\\s*1|21/i, replies:[
      "Les axes hélicoïdaux (2₁, 3₁...) et plans de glissement (a, b, c, n, d) combinent une opération de symétrie ponctuelle avec une translation fractionnaire de la maille — ils n'existent que dans le cristal réel, jamais pour un objet isolé."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la restriction cristallographique.",
      "Indice niveau 2 : seuls certains ordres de rotation permettent de paver l'espace périodiquement.",
      "Indice niveau 3 : les ordres autorisés sont 1, 2, 3, 4, 6 — pas 5."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : distingue bien le nombre de systèmes cristallins (7) et le nombre de groupes d'espace (230, vu au chapitre 3).",
      "Indice niveau 2 : c'est le nombre démontré par Bravais en 1848.",
      "Indice niveau 3 : la réponse est 14."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis le tableau récapitulatif des modes par système.",
      "Indice niveau 2 : l'orthorhombique est le système le plus riche en modes de centrage.",
      "Indice niveau 3 : P, C, I, F sont tous compatibles avec l'orthorhombique."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
CRISTALLO_CHAPTERS[cristKey("Groupes ponctuels, groupes d'espace et notation internationale")] = {
  objectives: [
    "Construire un groupe ponctuel de symétrie à partir des éléments de symétrie compatibles",
    "Dénombrer les 32 classes cristallines (groupes ponctuels cristallographiques)",
    "Comprendre la construction d'un groupe d'espace (réseau de Bravais + éléments de symétrie spatiale)",
    "Lire et interpréter la notation internationale (Hermann-Mauguin) d'un groupe d'espace",
    "Analyser pourquoi la classification des 230 groupes d'espace, établie indépendamment par Fedorov, Schoenflies et Barlow en 1891, a précédé de plusieurs décennies sa confirmation expérimentale par diffraction"
  ],
  prereqs: ["Symétrie cristalline : éléments, opérations et réseaux de Bravais"],
  bodyHtml: `
    <p>En 1891, trois cristallographes travaillant indépendamment — le Russe <strong>Evgraf Fedorov</strong>, l'Allemand <strong>Arthur Schoenflies</strong> et l'Anglais <strong>William Barlow</strong> — parviennent chacun de leur côté à la même conclusion : il n'existe que <strong>230 façons</strong> de combiner un réseau périodique avec des éléments de symétrie pour décrire complètement un cristal. Cette triple découverte indépendante, obtenue plus de vingt ans avant la première expérience de diffraction des rayons X (von Laue, 1912), est restée purement théorique jusqu'à ce que la radiocristallographie ne vienne, des décennies plus tard, confirmer expérimentalement chaque cas.</p>

    <p>Cette classification n'est pas qu'un catalogue abstrait : le choix du groupe d'espace conditionne directement des propriétés observables, de la piézoélectricité d'un cristal de quartz (au cœur de toutes les montres à quartz) à la possibilité même de cristalliser une molécule chirale pure, comme une protéine ou un acide aminé naturel.</p>

    <p>Après avoir décrit la symétrie de translation (réseaux de Bravais), il faut maintenant décrire la symétrie <strong>ponctuelle</strong> (rotations, miroirs...) et la symétrie <strong>spatiale complète</strong> du cristal : c'est l'objet des groupes ponctuels et des groupes d'espace.</p>

    <h3>1. Groupe ponctuel : les 32 classes cristallines</h3>
    <p>Un <strong>groupe ponctuel</strong> (ou classe cristalline) est l'ensemble des opérations de symétrie qui laissent au moins un point fixe (rotations, miroirs, inversion, roto-inversions), sans translation. En combinant les éléments compatibles avec la restriction cristallographique (ordres 1, 2, 3, 4, 6), on démontre qu'il n'existe que <strong>32 groupes ponctuels cristallographiques</strong> possibles, répartis dans les 7 systèmes cristallins.</p>
    <table class="mini-table">
      <tr><th>Système</th><th>Nombre de classes</th><th>Exemples de notation Hermann-Mauguin</th></tr>
      <tr><td>Triclinique</td><td>2</td><td>1, $\\bar1$</td></tr>
      <tr><td>Monoclinique</td><td>3</td><td>2, m, 2/m</td></tr>
      <tr><td>Orthorhombique</td><td>3</td><td>222, mm2, mmm</td></tr>
      <tr><td>Quadratique</td><td>7</td><td>4, $\\bar4$, 4/m, 422, 4mm, $\\bar4$2m, 4/mmm</td></tr>
      <tr><td>Trigonal</td><td>5</td><td>3, $\\bar3$, 32, 3m, $\\bar3$m</td></tr>
      <tr><td>Hexagonal</td><td>7</td><td>6, $\\bar6$, 6/m, 622, 6mm, $\\bar6$m2, 6/mmm</td></tr>
      <tr><td>Cubique</td><td>5</td><td>23, m$\\bar3$, 432, $\\bar4$3m, m$\\bar3$m</td></tr>
    </table>
    <p>Soit un total de 2+3+3+7+5+7+5 = <strong>32 classes cristallines</strong>.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — lien avec les propriétés physiques</span>
      Le groupe ponctuel détermine des propriétés macroscopiques importantes : un cristal appartenant à une classe <strong>non centrosymétrique</strong> (dépourvue de centre d'inversion) peut présenter des propriétés comme la <strong>piézoélectricité</strong> ou l'<strong>activité optique</strong> (pouvoir rotatoire), ce qui est essentiel pour l'étude des molécules chirales à l'état cristallin.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si la piézoélectricité n'apparaît que dans les classes cristallines dépourvues de centre d'inversion, qu'est-ce que la présence — ou l'absence — de cette propriété dans un matériau vous apprend indirectement sur sa symétrie interne, sans avoir besoin de faire de diffraction des rayons X ?
    </div>

    <h3>2. Groupe d'espace : notation internationale</h3>
    <p>Un <strong>groupe d'espace</strong> combine un réseau de Bravais (translation) avec les éléments de symétrie ponctuelle et spatiale (axes hélicoïdaux, plans de glissement) compatibles. C'est la description la plus complète de la symétrie d'un cristal réel. En 1891, Fedorov, Schoenflies et Barlow ont démontré indépendamment qu'il n'existe que <strong>230 groupes d'espace</strong> possibles en 3D.</p>
    <p>La notation internationale (Hermann-Mauguin) d'un groupe d'espace s'écrit toujours sous la forme :</p>
    <div class="formula-box">[Mode de réseau] &nbsp; [Symbole du groupe ponctuel généralisé selon les axes principaux]</div>
    <p>Par exemple, le groupe d'espace <strong>P2₁/c</strong> (l'un des plus fréquents en chimie organique, environ 35 % des structures organiques) se décompose ainsi :</p>
    <table class="mini-table">
      <tr><th>Symbole</th><th>Signification</th></tr>
      <tr><td>P</td><td>Réseau primitif (monoclinique)</td></tr>
      <tr><td>2₁</td><td>Axe hélicoïdal d'ordre 2 (rotation de 180° + translation de c/2)</td></tr>
      <tr><td>c</td><td>Plan de glissement perpendiculaire à l'axe 2₁, avec translation de c/2</td></tr>
    </table>
    <p>Autres exemples très courants : <strong>Pbca</strong> et <strong>Pna2₁</strong> (orthorhombiques), <strong>P2₁2₁2₁</strong> (orthorhombique, très fréquent pour les molécules chirales car il n'a aucune opération de symétrie improprе), <strong>Fm$\\bar3$m</strong> (cubique à faces centrées, très symétrique — structure de NaCl), <strong>Fd$\\bar3$m</strong> (structure du diamant).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi le groupe d'espace P2₁2₁2₁ est-il si fréquent pour les structures de molécules <em>chirales</em> (protéines, sucres, acides aminés naturels...) ?</p>
      <p><strong>Solution :</strong> P2₁2₁2₁ ne contient <em>aucun</em> élément de symétrie impropre (ni miroir, ni centre d'inversion, ni roto-inversion) — uniquement des axes hélicoïdaux 2₁ (rotation + translation). Or, ces opérations impropres inverseraient la chiralité de la molécule (transformeraient une molécule en son image miroir), ce qui est impossible pour une substance énantiomériquement pure. Un tel cristal ne peut donc cristalliser que dans l'un des 65 groupes d'espace dits <strong>chiraux</strong> (sous-ensemble des 230 groupes ne contenant aucune opération impropre), dont P2₁2₁2₁ est le plus représenté.</p>
      <p class="example-answer">Réponse : c'est la seule façon de cristalliser sans introduire d'opération de symétrie improprе incompatible avec la chiralité de la molécule.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Seuls 65 des 230 groupes d'espace sont chiraux. Si l'on vous annonce qu'une nouvelle protéine cristallise dans un groupe d'espace centrosymétrique, que pouvez-vous en déduire immédiatement, sans même consulter sa séquence ?
    </div>

    <h3>3. Positions générales et positions particulières</h3>
    <p>Dans un groupe d'espace donné, les <strong>Tables internationales de cristallographie</strong> (International Tables for Crystallography, vol. A) listent les <strong>positions équivalentes</strong> : la <strong>position générale</strong> (multiplicité maximale, symétrie de site triviale) et les <strong>positions particulières</strong> (multiplicité réduite, situées sur un élément de symétrie — axe, plan, centre). Cette information est cruciale pour placer correctement les atomes lors de la résolution d'une structure (chapitre 9).</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Un groupe ponctuel combine les seules opérations de symétrie laissant un point fixe (sans translation) : il en existe exactement 32 (classes cristallines)</li>
      <li>Un groupe d'espace combine réseau de Bravais + éléments ponctuels + éléments spatiaux (axes hélicoïdaux, plans de glissement) : il en existe exactement 230</li>
      <li>La notation Hermann-Mauguin s'écrit [mode de réseau][symboles de symétrie selon les axes principaux], ex : P2₁/c, Fm$\\bar3$m</li>
      <li>Les groupes d'espace « chiraux » (65 sur 230) ne contiennent aucune opération de symétrie improprе — indispensable pour les molécules énantiomériquement pures</li>
      <li>Les Tables internationales listent les positions équivalentes (générales et particulières) pour chaque groupe d'espace</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre groupe ponctuel (32, sans translation) et groupe d'espace (230, avec translation)</li>
      <li>Oublier qu'un axe hélicoïdal (2₁) et un plan de glissement (c) sont des opérations impropres... non, attention : l'axe hélicoïdal est propre (rotation), seul le plan de glissement est improprе (réflexion) — ne pas confondre les deux catégories</li>
      <li>Penser qu'un groupe d'espace centrosymétrique peut décrire une structure chirale pure — c'est impossible, car le centre d'inversion créerait l'énantiomère opposé dans la maille</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Combien existe-t-il de groupes d'espace en cristallographie 3D ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr3e1" value="wrong">32</label>
        <label class="option"><input type="radio" name="cr3e1" value="wrong">14</label>
        <label class="option"><input type="radio" name="cr3e1" value="right">230</label>
        <label class="option"><input type="radio" name="cr3e1" value="wrong">7</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr3e1','cr3fb1','Correct — il existe 230 groupes d\\'espace, démontrés indépendamment par Fedorov, Schoenflies et Barlow vers 1891.','32 est le nombre de groupes ponctuels, 14 celui des réseaux de Bravais, 7 celui des systèmes cristallins : le nombre de groupes d\\'espace est plus grand que tous ces nombres.')">Vérifier</button>
      <div class="feedback" id="cr3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un cristal formé uniquement d'une molécule chirale pure (un seul énantiomère) peut-il appartenir à un groupe d'espace centrosymétrique (contenant $\\bar1$) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr3e2" value="wrong">Oui, c'est même le cas le plus fréquent</label>
        <label class="option"><input type="radio" name="cr3e2" value="right">Non, un centre d'inversion générerait l'énantiomère opposé dans la maille, ce qui est impossible pour une substance pure</label>
        <label class="option"><input type="radio" name="cr3e2" value="wrong">Oui, à condition que le système soit cubique</label>
        <label class="option"><input type="radio" name="cr3e2" value="wrong">Cela dépend uniquement de la taille de la molécule</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr3e2','cr3fb2','Correct — les opérations improprе (inversion, miroir, roto-inversion) transformeraient la molécule en son image miroir, incompatible avec une substance énantiomériquement pure.','Repense au lien entre chiralité moléculaire et opérations de symétrie improprе (inversion, miroir).')">Vérifier</button>
      <div class="feedback" id="cr3fb2"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>L'attribution du groupe d'espace à partir d'un diagramme de diffraction reste, pour des matériaux complexes ou des mélanges polycristallins, une étape parfois délicate et ambiguë. Des modèles d'apprentissage automatique entraînés sur les centaines de milliers de structures déposées dans des bases comme le <em>Cambridge Structural Database</em> ou l'<em>Inorganic Crystal Structure Database</em> sont aujourd'hui développés pour proposer automatiquement le groupe d'espace le plus probable à partir d'un simple diagramme de poudre — une question ouverte reste de savoir si de tels modèles peuvent, un jour, remplacer entièrement l'expertise humaine dans les cas ambigus de pseudo-symétrie.</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Éléments ponctuels seuls (rotation, miroir, inversion, roto-inversion) → <strong>Groupe ponctuel</strong> (32 classes cristallines) → + réseau de Bravais + éléments spatiaux (axes hélicoïdaux, plans de glissement) → <strong>Groupe d'espace</strong> (230, dont 65 chiraux) → notation Hermann-Mauguin [mode de réseau][symboles de symétrie] → Tables internationales : positions générales et particulières</p>
    <p><strong>Résultat central du chapitre :</strong></p>
    <div class="formula-box">32 groupes ponctuels &nbsp;⊂&nbsp; 230 groupes d'espace &nbsp;(dont 65 chiraux)</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Fedorov, Schoenflies et Barlow n'avaient pas travaillé de façon totalement indépendante — la convergence de leurs 230 groupes aurait-elle la même valeur de preuve qu'elle a aujourd'hui ?</li>
      <li>Pourquoi la notation Hermann-Mauguin encode-t-elle explicitement le mode de réseau (P, I, F...) alors que celui-ci pourrait sembler redondant avec les 14 réseaux de Bravais déjà vus au chapitre précédent ?</li>
      <li>Quelle serait la conséquence, pour la résolution d'une structure (chapitre 9), de se tromper de groupe d'espace dès le départ de l'analyse d'un diagramme de diffraction ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>E. von Fedorov, <em>Симметрия правильных систем фигур</em> (Symétrie des systèmes réguliers de figures), 1891 — l'un des trois mémoires fondateurs des 230 groupes d'espace.</li>
      <li><em>International Tables for Crystallography, Volume A: Space-Group Symmetry</em>, International Union of Crystallography — l'ouvrage de référence listant les 230 groupes et leurs positions équivalentes.</li>
      <li>C. Giacovazzo (dir.), <em>Fundamentals of Crystallography</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais nommer complètement la symétrie d'un cristal, comme Fedorov, Schoenflies et Barlow l'ont chacun fait sans se consulter en 1891. Reste à savoir comment situer précisément un plan dans ce réseau symétrique : direction au chapitre suivant, avec les indices de Miller.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("Groupes ponctuels, groupes d'espace et notation internationale")] = {
  intro: "Salut, moi c'est Nova ! On parle des 32 groupes ponctuels et des 230 groupes d'espace. Demande-moi d'expliquer un symbole Hermann-Mauguin, ou un indice sur un exercice.",
  rules: [
    { test:/groupe ponctuel|classe cristalline/i, replies:[
      "Un groupe ponctuel ne contient que des opérations laissant un point fixe (rotations, miroirs, inversion) — sans translation. Il en existe exactement 32, réparties dans les 7 systèmes cristallins."
    ]},
    { test:/groupe d.espace|hermann.mauguin|p21|notation/i, replies:[
      "Un groupe d'espace = réseau de Bravais + éléments de symétrie ponctuelle + éléments de symétrie spatiale (axes hélicoïdaux, plans de glissement). Il en existe 230 en tout, notés selon la convention Hermann-Mauguin (ex : P2₁/c)."
    ]},
    { test:/chiral|[ée]nantiom/i, replies:[
      "Un cristal fait d'une molécule chirale pure ne peut appartenir qu'à un groupe d'espace sans opération improprе (ni miroir, ni inversion, ni roto-inversion) — ce sont les 65 groupes d'espace « chiraux », dont P2₁2₁2₁ est le plus courant."
    ]},
    { test:/position g[ée]n[ée]rale|position particuli[èe]re/i, replies:[
      "Dans les Tables internationales, la position générale a la multiplicité maximale (symétrie de site triviale) ; les positions particulières, de multiplicité réduite, se trouvent sur un élément de symétrie (axe, plan, centre)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : distingue bien les nombres 7, 14, 32 et 230 vus dans ce chapitre et le précédent.",
      "Indice niveau 2 : c'est le nombre le plus grand parmi les quatre.",
      "Indice niveau 3 : la réponse est 230, démontré par Fedorov, Schoenflies et Barlow."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce que fait un centre d'inversion à une molécule chirale.",
      "Indice niveau 2 : l'inversion transforme la molécule en son image miroir.",
      "Indice niveau 3 : c'est donc incompatible avec une substance énantiomériquement pure — réponse : non."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
CRISTALLO_CHAPTERS[cristKey("Plans réticulaires, indices de Miller et distances interréticulaires")] = {
  objectives: [
    "Déterminer les indices de Miller (hkl) d'un plan réticulaire à partir de ses intersections avec les axes",
    "Utiliser la notation des directions cristallographiques [uvw] et des familles de plans {hkl}",
    "Calculer la distance interréticulaire d_hkl dans les systèmes cubique, quadratique et orthorhombique",
    "Relier la distance interréticulaire à la densité de nœuds d'un plan (plans les plus denses = les plus espacés)",
    "Justifier pourquoi Miller (1839) a choisi de définir ses indices à partir des inverses des intersections plutôt que des intersections elles-mêmes"
  ],
  prereqs: ["L'état cristallin : ordre, réseau et maille élémentaire", "Symétrie cristalline : éléments, opérations et réseaux de Bravais"],
  bodyHtml: `
    <p>En 1839, le minéralogiste britannique <strong>William Hallowes Miller</strong> publie son <em>Treatise on Crystallography</em> et y introduit un système de notation — fondé sur les inverses des intersections aux axes — qui remplace définitivement les notations plus lourdes utilisées jusque-là, notamment celle de René-Just Haüy fondée sur des rapports entiers directs. Près de deux siècles plus tard, ces « indices de Miller » portent toujours son nom et restent la convention universelle de toute la cristallographie moderne.</p>

    <p>Ce choix des inverses n'est pas arbitraire : il évite les indices infinis pour les plans parallèles à un axe, et simplifie considérablement les calculs de distance interréticulaire indispensables à l'interprétation des diagrammes de diffraction produits par les instruments modernes.</p>

    <p>Les <strong>indices de Miller</strong> sont le langage universel qui permet de désigner sans ambiguïté un plan réticulaire ou une direction dans un cristal — un prérequis indispensable pour interpréter les figures de diffraction des rayons X (chapitres 6 à 8), où chaque tache ou pic de diffraction est indexé par un triplet (hkl).</p>

    <h3>1. Détermination des indices de Miller (h k l)</h3>
    <p>La méthode systématique pour indexer un plan réticulaire :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Repérer les coordonnées des intersections du plan avec les trois axes cristallographiques, exprimées en unités de $a$, $b$, $c$ (ex : intersections en $2a$, $3b$, $1c$, soit 2, 3, 1)</li>
      <li>Prendre les <strong>inverses</strong> de ces valeurs : $1/2$, $1/3$, $1/1$</li>
      <li><strong>Réduire au plus petit ensemble d'entiers</strong> ayant le même rapport (multiplier par le PPCM des dénominateurs) : $\\times 6 \\Rightarrow 3, 2, 6$</li>
    </ol>
    <p>Le plan est alors noté <strong>(326)</strong>, entre parenthèses, sans virgule. Un plan parallèle à un axe (intersection à l'infini) a l'indice correspondant égal à 0 (car $1/\\infty = 0$). Un indice négatif s'écrit avec une barre au-dessus, par exemple $(1\\bar{1}0)$, lue « un, un barre, zéro ».</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 100" width="100%">
          <polygon points="10,90 100,90 70,20 10,20" fill="none" stroke="#5A6472" stroke-width="1"/>
          <polygon points="10,90 60,55 60,20 10,55" fill="#2DD4C4" opacity="0.4" stroke="#2DD4C4" stroke-width="1.5"/>
          <text x="6" y="98" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">a</text>
          <text x="66" y="16" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">c</text>
          <text x="100" y="88" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">b</text>
        </svg>
        <span>Un plan réticulaire (hkl) coupe la maille</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 100" width="100%">
          <line x1="10" y1="10" x2="10" y2="90" stroke="#4C7CFF" stroke-width="2"/>
          <line x1="10" y1="90" x2="90" y2="90" stroke="#4C7CFF" stroke-width="2"/>
          <line x1="30" y1="90" x2="30" y2="50" stroke="#F0B94D" stroke-width="1.4" stroke-dasharray="3,2"/>
          <line x1="10" y1="50" x2="30" y2="50" stroke="#F0B94D" stroke-width="1.4" stroke-dasharray="3,2"/>
          <text x="34" y="53" font-family="IBM Plex Mono" font-size="8" fill="#F0B94D">plan (210) en 2D</text>
        </svg>
        <span>Analogue 2D : intersections aux axes</span>
      </div>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un plan coupe les axes en $a$, $\\infty$ (parallèle à b) et $c/2$. Déterminer ses indices de Miller.</p>
      <p><strong>Solution :</strong> Intersections en unités de maille : 1, $\\infty$, 1/2. Inverses : $1/1 = 1$, $1/\\infty = 0$, $1/(1/2) = 2$. Ces valeurs sont déjà entières, pas de réduction nécessaire.</p>
      <p class="example-answer">Réponse : le plan est noté <strong>(102)</strong>.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si Miller avait choisi de noter directement les intersections aux axes plutôt que leurs inverses, comment aurait-il fallu noter un plan parallèle à un axe (intersection à l'infini) ? Qu'est-ce que cela vous suggère sur l'intérêt du choix de l'inverse ?
    </div>

    <h3>2. Directions cristallographiques [uvw]</h3>
    <p>Une <strong>direction</strong> dans le cristal se note entre crochets $[uvw]$ : ce sont les composantes (réduites aux plus petits entiers) du vecteur reliant l'origine à un nœud du réseau. Attention : dans un système <strong>cubique uniquement</strong>, la direction $[hkl]$ est perpendiculaire au plan $(hkl)$ de mêmes indices — cette propriété n'est <strong>pas</strong> valable dans les autres systèmes cristallins en général.</p>
    <p>Une <strong>famille de plans équivalents</strong> par symétrie se note entre accolades $\\{hkl\\}$ (ex : $\\{100\\}$ regroupe $(100)$, $(010)$, $(001)$ et leurs opposés dans le système cubique) ; une <strong>famille de directions équivalentes</strong> se note $\\langle uvw \\rangle$.</p>

    <h3>3. Distance interréticulaire d_hkl</h3>
    <p>La <strong>distance interréticulaire</strong> $d_{hkl}$ est la distance perpendiculaire entre deux plans successifs et parallèles de la famille $(hkl)$ — c'est la grandeur géométrique directement mesurée par diffraction des rayons X via la loi de Bragg (chapitre 6). Dans le système <strong>cubique</strong>, la formule est particulièrement simple :</p>
    <div class="formula-box">$$d_{hkl} = \\dfrac{a}{\\sqrt{h^2+k^2+l^2}}$$</div>
    <p>Dans le système <strong>quadratique</strong> :</p>
    <div class="formula-box">$$\\dfrac{1}{d_{hkl}^2} = \\dfrac{h^2+k^2}{a^2} + \\dfrac{l^2}{c^2}$$</div>
    <p>Et dans le système <strong>orthorhombique</strong> (le plus général des systèmes à angles droits) :</p>
    <div class="formula-box">$$\\dfrac{1}{d_{hkl}^2} = \\dfrac{h^2}{a^2} + \\dfrac{k^2}{b^2} + \\dfrac{l^2}{c^2}$$</div>
    <p>Ces formules deviennent plus complexes pour les systèmes à angles non droits (monoclinique, triclinique, trigonal, hexagonal), car il faut alors tenir compte des termes croisés issus des angles α, β, γ.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Plus les indices (hkl) sont petits, plus la distance $d_{hkl}$ est grande, et plus le plan correspondant est <strong>dense en nœuds</strong> (règle générale, valable notamment pour les réseaux simples). Les plans les plus denses sont ceux qui diffractent aux plus petits angles de Bragg $\\theta$ (voir chapitre 6).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si un plan (100) est plus dense et plus espacé qu'un plan (300) dans un même cristal cubique, à quoi vous attendez-vous, qualitativement, pour l'ordre d'apparition des pics de diffraction associés à ces deux familles de plans lorsque l'angle θ augmente progressivement (chapitre 6) ?
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — distance interréticulaire (système cubique)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Change le paramètre de maille et les indices (h k l) pour observer l'effet sur d<sub>hkl</sub>.</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>Paramètre de maille a (Å)</label><input type="number" id="dhklA" value="4.05" step="0.01" oninput="updateDhklSim()">
          <label>h</label><input type="number" id="dhklH" value="1" step="1" oninput="updateDhklSim()">
          <label>k</label><input type="number" id="dhklK" value="1" step="1" oninput="updateDhklSim()">
          <label>l</label><input type="number" id="dhklL" value="1" step="1" oninput="updateDhklSim()">
          <div class="sim-readout" id="dhklReadout"></div>
        </div>
      </div>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Indices de Miller (hkl) : inverses des intersections aux axes (en unités de maille), réduits aux plus petits entiers</li>
      <li>Notation : (hkl) pour un plan, [uvw] pour une direction, {hkl} et ⟨uvw⟩ pour des familles équivalentes par symétrie</li>
      <li>Système cubique : $d_{hkl} = a/\\sqrt{h^2+k^2+l^2}$</li>
      <li>Un indice nul signifie que le plan est parallèle à cet axe (intersection à l'infini)</li>
      <li>Plus les indices sont petits, plus $d_{hkl}$ est grand et plus le plan est dense en nœuds (règle générale)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier de prendre l'<strong>inverse</strong> des intersections avant de réduire aux plus petits entiers</li>
      <li>Appliquer la perpendicularité [hkl] ⊥ (hkl) en dehors du système cubique — elle n'est valable qu'en cubique</li>
      <li>Confondre (hkl) pour un plan spécifique et {hkl} pour une famille de plans équivalents par symétrie</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Un plan coupe les axes en $a/2$, $b$ et $\\infty$ (parallèle à c). Quels sont ses indices de Miller ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr4e1" value="wrong">(1 2 0)</label>
        <label class="option"><input type="radio" name="cr4e1" value="right">(2 1 0)</label>
        <label class="option"><input type="radio" name="cr4e1" value="wrong">(1/2 1 0)</label>
        <label class="option"><input type="radio" name="cr4e1" value="wrong">(2 1 1)</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr4e1','cr4fb1','Correct — intersections 1/2, 1, ∞ → inverses 2, 1, 0 → déjà entiers, donc (210).','Prends d\\'abord les inverses des intersections (1/2 → 2, 1 → 1, ∞ → 0), puis vérifie si une réduction est nécessaire.')">Vérifier</button>
      <div class="feedback" id="cr4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour un cristal cubique de paramètre a = 5,0 Å, quelle est la distance interréticulaire d pour le plan (200) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr4e2" value="wrong">5,0 Å</label>
        <label class="option"><input type="radio" name="cr4e2" value="right">2,5 Å</label>
        <label class="option"><input type="radio" name="cr4e2" value="wrong">10,0 Å</label>
        <label class="option"><input type="radio" name="cr4e2" value="wrong">1,25 Å</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr4e2','cr4fb2','Correct — d = a/√(4+0+0) = 5,0/2 = 2,5 Å.','Applique d = a/√(h²+k²+l²) avec h=2, k=0, l=0 : le dénominateur vaut √4 = 2.')">Vérifier</button>
      <div class="feedback" id="cr4fb2"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>L'indexation automatique — l'attribution des indices (hkl) corrects à chaque tache de diffraction observée — reste un défi computationnel actif, en particulier en <strong>cristallographie sérielle</strong> aux lasers à électrons libres à rayons X (XFEL), où des dizaines de milliers de diagrammes de diffraction issus de nanocristaux différents doivent être indexés automatiquement en quelques millisecondes chacun. Des logiciels comme DIALS ou CrystFEL combinent aujourd'hui algorithmes géométriques et apprentissage automatique pour cette tâche — une question ouverte reste la gestion fiable des cristaux maclés (plusieurs réseaux superposés dans un même échantillon), qui produisent des diagrammes bien plus difficiles à indexer sans ambiguïté.</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Intersections du plan avec les axes (en unités a, b, c) → inverses de ces valeurs → réduction au plus petit ensemble d'entiers → <strong>indices de Miller (hkl)</strong> → notation plan (hkl) / direction [uvw] / famille {hkl} ou ⟨uvw⟩ → calcul de la <strong>distance interréticulaire d_hkl</strong> selon le système cristallin → donnée directement mesurée par diffraction (loi de Bragg, chapitre 6)</p>
    <p><strong>Équation maîtresse du chapitre (système cubique) :</strong></p>
    <div class="formula-box">$$d_{hkl} = \\dfrac{a}{\\sqrt{h^2+k^2+l^2}}$$</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si deux plans réticulaires différents avaient, par coïncidence numérique, exactement le même triplet (hkl) réduit — un tel cas serait-il seulement possible avec une notation correctement construite ?</li>
      <li>Pourquoi Miller a-t-il eu besoin d'imposer une réduction systématique aux plus petits entiers plutôt que de conserver les inverses bruts, parfois non entiers, des intersections ?</li>
      <li>Quelle serait la conséquence, sur le calcul de d_hkl, d'utiliser par erreur la formule cubique pour un cristal en réalité orthorhombique avec a, b, c très proches mais distincts ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W.H. Miller, <em>A Treatise on Crystallography</em>, Cambridge, 1839 — l'ouvrage fondateur introduisant la notation qui porte son nom.</li>
      <li>C. Giacovazzo (dir.), <em>Fundamentals of Crystallography</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier.</li>
      <li>T.A. White et al., <em>CrystFEL: a software suite for snapshot serial crystallography</em>, Journal of Applied Crystallography, 2012 — pour l'indexation automatisée moderne évoquée en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais nommer n'importe quel plan d'un cristal comme Miller l'a fait il y a près de deux siècles. Il ne manque plus que la source de rayonnement pour observer concrètement ces plans : direction le chapitre suivant, avec la production et le spectre des rayons X.</p>
  `,
  init: initDhklSim
};
CRISTALLO_NOVA_KB[cristKey("Plans réticulaires, indices de Miller et distances interréticulaires")] = {
  intro: "Salut, moi c'est Nova ! On travaille les indices de Miller (hkl) et les distances interréticulaires. Donne-moi des intersections ou des indices, ou demande un indice sur un exercice.",
  rules: [
    { test:/miller|indice/i, replies:[
      "Méthode pour trouver (hkl) : 1) note les intersections du plan avec les axes (en unités de maille), 2) prends leurs inverses, 3) réduis au plus petit ensemble d'entiers.",
      "Un indice nul (0) signifie que le plan est parallèle à cet axe — logique, car 1/∞ = 0."
    ]},
    { test:/d\s*hkl|distance interr[ée]ticulaire/i, replies:[
      "En système cubique : d_hkl = a / √(h²+k²+l²). Plus les indices sont petits, plus d est grand.",
      "Cette distance d_hkl est exactement la grandeur mesurée expérimentalement par diffraction des rayons X grâce à la loi de Bragg (chapitre 6)."
    ]},
    { test:/direction|uvw|crochets/i, replies:[
      "Une direction cristallographique se note [uvw] entre crochets. Attention : [hkl] n'est perpendiculaire à (hkl) que dans le système cubique, pas en général."
    ]},
    { test:/famille|accolade/i, replies:[
      "{hkl} désigne une famille de plans équivalents par symétrie (ex : {100} regroupe (100), (010), (001) en cubique), et ⟨uvw⟩ une famille de directions équivalentes."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : prends d'abord les inverses des intersections données.",
      "Indice niveau 2 : 1/(1/2) = 2, 1/1 = 1, 1/∞ = 0.",
      "Indice niveau 3 : ces valeurs sont déjà entières, donc les indices sont (2 1 0)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique directement la formule cubique d = a/√(h²+k²+l²).",
      "Indice niveau 2 : pour (200), h²+k²+l² = 4+0+0 = 4, donc √4 = 2.",
      "Indice niveau 3 : d = 5,0/2 = 2,5 Å."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
CRISTALLO_CHAPTERS[cristKey("Production, spectre et absorption des rayons X")] = {
  objectives: [
    "Décrire le principe de production des rayons X par un tube à anticathode et par un synchrotron",
    "Distinguer le rayonnement de freinage (Bremsstrahlung, spectre continu) et les raies caractéristiques (Kα, Kβ)",
    "Utiliser la loi de Moseley pour relier la fréquence des raies caractéristiques au numéro atomique",
    "Comprendre l'absorption des rayons X, le rôle des filtres et du monochromateur pour obtenir un rayonnement monochromatique",
    "Retracer, depuis la découverte accidentelle de Röntgen en 1895, le chemin technique qui mène à la production contrôlée d'un faisceau X monochromatique en laboratoire moderne"
  ],
  prereqs: ["Structure de l'atome, noyau, électron et identification des éléments (L1)"],
  bodyHtml: `
    <p>Le 8 novembre 1895, le physicien allemand <strong>Wilhelm Röntgen</strong> observe par hasard, dans son laboratoire de Würzburg, qu'un écran fluorescent s'illumine à distance d'un tube à décharge qu'il venait pourtant d'obscurcir complètement — il vient de découvrir un rayonnement inconnu, qu'il baptise prudemment « rayons X ». Quelques semaines plus tard, il réalise la toute première radiographie de l'histoire : celle de la main de son épouse, où l'on distingue nettement les os et l'alliance. Cette découverte, si immédiatement spectaculaire qu'elle lui vaudra le tout premier prix Nobel de physique en 1901, ouvre la voie à toute la radiocristallographie développée dans ce chapitre et les suivants.</p>

    <p>Plus d'un siècle plus tard, ces mêmes rayons X restent l'outil quotidien de l'imagerie médicale, du contrôle non destructif industriel, et bien sûr de la détermination des structures cristallines qui nous occupe ici.</p>

    <p>Avant d'étudier la diffraction elle-même (chapitre 6), il faut comprendre comment on produit le rayonnement X utilisé en radiocristallographie : les rayons X sont des ondes électromagnétiques de longueur d'onde de l'ordre de 0,1 à 10 Å (soit du même ordre de grandeur que les distances interatomiques dans un cristal, condition indispensable pour observer la diffraction).</p>

    <h3>1. Le tube à rayons X (source classique de laboratoire)</h3>
    <p>Un tube à rayons X classique comprend une <strong>cathode</strong> (filament chauffé, émettant des électrons par effet thermoïonique) et une <strong>anode</strong> (anticathode) métallique, portées à une différence de potentiel élevée (typiquement 30 à 50 kV). Les électrons, accélérés par ce champ, viennent percuter l'anode et perdent brutalement leur énergie cinétique, ce qui produit un rayonnement X selon deux mécanismes distincts :</p>
    <table class="mini-table">
      <tr><th>Mécanisme</th><th>Origine</th><th>Type de spectre</th></tr>
      <tr><td>Rayonnement de freinage (Bremsstrahlung)</td><td>Décélération des électrons dans le champ électrique des noyaux de l'anode</td><td>Spectre <strong>continu</strong>, avec une longueur d'onde minimale $\\lambda_{min}$ liée à la tension d'accélération</td></tr>
      <tr><td>Raies caractéristiques</td><td>Ionisation d'une couche interne (K) d'un atome de l'anode, suivie du comblement de la lacune par un électron de couche supérieure (L → K donne la raie Kα, M → K donne la raie Kβ)</td><td>Spectre de <strong>raies fines</strong>, superposées au fond continu</td></tr>
    </table>
    <p>Le matériau d'anode le plus courant en radiocristallographie de laboratoire est le <strong>cuivre</strong>, qui produit la raie <strong>Cu Kα</strong> de longueur d'onde moyenne $\\lambda(K\\alpha) \\approx 1{,}5418$ Å (en réalité un doublet Kα₁/Kα₂ très proche, souvent moyenné) ; le <strong>molybdène</strong> (Mo Kα ≈ 0,7107 Å, rayonnement plus pénétrant) est également très utilisé, notamment pour la cristallographie du monocristal en chimie moléculaire.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — loi de Moseley (1913)</span>
      La fréquence $\\nu$ d'une raie caractéristique donnée (ex : Kα) est reliée au numéro atomique $Z$ de l'élément émetteur par la loi de Moseley : $\\sqrt{\\nu} = a(Z - b)$, où $a$ et $b$ sont des constantes propres à la raie considérée. Cette loi, découverte par H. Moseley, a permis de classer définitivement les éléments par numéro atomique croissant (et non par masse atomique), corrigeant certaines inversions de l'ancien tableau de Mendeleïev.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Röntgen, en 1895, ne savait pas encore ce qu'était la nature exacte de son rayonnement mystère. Vingt ans plus tard, la loi de Moseley permet d'identifier un élément chimique inconnu à partir de la seule fréquence de sa raie Kα. Qu'est-ce que ce progrès vous apprend sur la manière dont une découverte accidentelle peut se transformer en outil d'analyse quantitatif précis ?
    </div>

    <h3>2. Le rayonnement synchrotron</h3>
    <p>Les grandes installations synchrotron (ex : ESRF à Grenoble, SOLEIL en France, APS aux États-Unis) produisent un rayonnement X en accélérant des électrons à des vitesses relativistes dans un anneau de stockage, puis en les déviant à l'aide d'aimants (dipôles, onduleurs, wigglers). Le rayonnement obtenu est bien plus intense (plusieurs ordres de grandeur), accordable en longueur d'onde (« tunable ») et fortement collimaté, ce qui permet d'étudier des cristaux beaucoup plus petits ou des phénomènes résolus en temps — un atout majeur pour la cristallographie des protéines et des matériaux avancés.</p>

    <h3>3. Absorption des rayons X et loi de Beer-Lambert</h3>
    <p>Lorsqu'un faisceau de rayons X traverse la matière, son intensité décroît selon une loi exponentielle analogue à celle de l'absorption optique :</p>
    <div class="formula-box">$$I = I_0\\, e^{-\\mu x}$$</div>
    <p>où $\\mu$ (cm⁻¹) est le <strong>coefficient d'absorption linéaire</strong>, propre au matériau traversé et à la longueur d'onde utilisée, et $x$ l'épaisseur traversée. Ce coefficient croît fortement avec le numéro atomique $Z$ des éléments traversés (approximativement en $Z^4$) et présente des <strong>discontinuités brusques</strong> (« seuils d'absorption », ex : seuil K) lorsque l'énergie des photons X devient juste suffisante pour ioniser une couche électronique donnée.</p>

    <h3>4. Obtenir un faisceau monochromatique</h3>
    <p>Pour une expérience de diffraction précise, on souhaite généralement isoler la seule raie Kα (éliminer le fond continu et la raie Kβ, plus énergétique). Deux méthodes principales :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Filtre β :</strong> une fine feuille métallique dont le seuil d'absorption K se situe juste entre les énergies Kα et Kβ de l'anode (ex : filtre de nickel pour une anode de cuivre) absorbe préférentiellement la raie Kβ</li>
      <li><strong>Monochromateur cristallin :</strong> un cristal parfait (souvent du graphite ou du germanium) orienté pour ne diffracter (selon la loi de Bragg, chapitre 6) que la longueur d'onde Kα souhaitée, avec une sélectivité bien supérieure au simple filtre</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi utilise-t-on préférentiellement le cuivre (Cu Kα ≈ 1,54 Å) plutôt que le molybdène (Mo Kα ≈ 0,71 Å) pour la diffraction sur poudre de composés organiques légers, alors que le molybdène est souvent privilégié pour les monocristaux ?</p>
      <p><strong>Solution :</strong> Une longueur d'onde plus grande (Cu Kα) donne des angles de diffraction $\\theta$ plus grands pour une même distance $d_{hkl}$ (loi de Bragg, chapitre 6), ce qui sépare mieux les pics sur un diffractogramme de poudre et améliore la résolution angulaire pour les composés à faibles nombres électroniques (C, H, N, O). Le molybdène, plus pénétrant, est en revanche préféré pour les monocristaux car il limite l'absorption et permet de collecter des données à plus haute résolution (angles 2θ étendus).</p>
      <p class="example-answer">Réponse : le choix de l'anticathode dépend d'un compromis entre résolution angulaire, pénétration et absorption, selon la technique utilisée.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si l'on disposait d'une anticathode hypothétique produisant une raie Kα de longueur d'onde encore plus grande que celle du cuivre, à quel type d'échantillon ce rayonnement serait-il, à votre avis, le mieux adapté — et quel inconvénient faudrait-il alors accepter en contrepartie ?
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Un tube à rayons X produit un spectre continu (Bremsstrahlung, freinage des électrons) superposé à des raies caractéristiques (Kα, Kβ) issues des transitions électroniques internes</li>
      <li>La loi de Moseley relie la fréquence d'une raie caractéristique au numéro atomique Z de l'anode</li>
      <li>Cu Kα ≈ 1,54 Å et Mo Kα ≈ 0,71 Å sont les anticathodes les plus utilisées en radiocristallographie de laboratoire</li>
      <li>Le rayonnement synchrotron offre une intensité et une accordabilité bien supérieures à un tube de laboratoire</li>
      <li>L'absorption suit une loi exponentielle I = I₀e^(−μx) ; un filtre β ou un monochromateur cristallin permet d'obtenir un faisceau monochromatique (Kα pur)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre le spectre continu (Bremsstrahlung, dépend de la tension d'accélération) et les raies caractéristiques (dépendent du matériau de l'anode)</li>
      <li>Oublier que le coefficient d'absorption μ dépend fortement de Z (environ en Z⁴) et de la longueur d'onde</li>
      <li>Croire que le filtre β élimine totalement la raie Kβ — il ne fait que l'atténuer fortement, un monochromateur cristallin est nécessaire pour une pureté spectrale supérieure</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La raie Kα d'un tube à rayons X provient de quelle transition électronique ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr5e1" value="wrong">Ionisation totale de l'atome</label>
        <label class="option"><input type="radio" name="cr5e1" value="right">Un électron de la couche L comble une lacune créée en couche K</label>
        <label class="option"><input type="radio" name="cr5e1" value="wrong">Un électron du filament se désexcite directement</label>
        <label class="option"><input type="radio" name="cr5e1" value="wrong">Freinage des électrons incidents dans le champ nucléaire</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr5e1','cr5fb1','Correct — la raie Kα correspond à la transition L → K, comblant la lacune créée par l\\'ionisation de la couche K de l\\'atome de l\\'anode.','Le freinage donne le spectre continu (Bremsstrahlung), pas une raie caractéristique. Pense à quelle transition électronique interne donne la raie Kα.')">Vérifier</button>
      <div class="feedback" id="cr5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quel est le rôle d'un filtre β (ex : filtre de nickel avec une anode de cuivre) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr5e2" value="wrong">Augmenter l'intensité totale du faisceau</label>
        <label class="option"><input type="radio" name="cr5e2" value="right">Atténuer préférentiellement la raie Kβ pour ne conserver quasiment que la raie Kα</label>
        <label class="option"><input type="radio" name="cr5e2" value="wrong">Convertir le rayonnement continu en raies caractéristiques</label>
        <label class="option"><input type="radio" name="cr5e2" value="wrong">Accélérer les électrons du tube</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr5e2','cr5fb2','Correct — le seuil d\\'absorption K du filtre se situe entre les énergies Kα et Kβ, ce qui absorbe fortement Kβ tout en laissant passer Kα.','Le filtre β exploite un seuil d\\'absorption situé juste entre les deux raies caractéristiques Kα et Kβ.')">Vérifier</button>
      <div class="feedback" id="cr5fb2"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>Depuis les années 2010, des sources de laboratoire dites <strong>MetalJet</strong> (anode liquide, un jet de gallium ou d'un alliage indium-gallium remplaçant l'anode métallique fixe) permettent de dissiper bien plus de puissance sans fondre l'anode, rapprochant sensiblement la brillance des sources de paillasse de celle d'un synchrotron. Une question reste ouverte : jusqu'où cette course à la brillance des sources compactes peut-elle réduire l'écart avec les grandes installations synchrotron, pour un coût et un encombrement restant compatibles avec un laboratoire universitaire ?</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Filament chauffé → électrons accélérés (30-50 kV) → impact sur l'anode → <strong>spectre continu</strong> (Bremsstrahlung) + <strong>raies caractéristiques</strong> (ionisation couche K, transitions Kα/Kβ) → filtre β ou monochromateur cristallin → faisceau <strong>monochromatique</strong> → traversée de la matière → absorption exponentielle</p>
    <p><strong>Équation maîtresse du chapitre :</strong></p>
    <div class="formula-box">$$\\sqrt{\\nu} = a(Z-b) \\quad \\text{(loi de Moseley)} \\qquad I = I_0\\,e^{-\\mu x} \\quad \\text{(absorption)}$$</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Röntgen avait immédiatement compris la nature électromagnétique de son rayonnement — la découverte aurait-elle eu le même retentissement immédiat sans le mystère initial autour du nom « rayons X » ?</li>
      <li>Pourquoi le rayonnement synchrotron, bien plus coûteux et complexe à produire qu'un simple tube de laboratoire, reste-t-il malgré tout indispensable pour certaines expériences de radiocristallographie ?</li>
      <li>Quelle serait la conséquence, sur la qualité d'un diagramme de diffraction, de l'utilisation d'un faisceau contenant encore une fraction non négligeable de raie Kβ non filtrée ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W.C. Röntgen, <em>Über eine neue Art von Strahlen</em>, Sitzungsberichte der Würzburger Physikalisch-Medizinischen Gesellschaft, 1895 — l'annonce originale de la découverte des rayons X.</li>
      <li>H.G.J. Moseley, <em>The High-Frequency Spectra of the Elements</em>, Philosophical Magazine, 1913 — l'article fondateur de la loi reliant fréquence de raie caractéristique et numéro atomique.</li>
      <li>J. Als-Nielsen, D. McMorrow, <em>Elements of Modern X-ray Physics</em>, Wiley — référence standard sur la production et les propriétés du rayonnement X pour ce niveau.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais produire et purifier le rayonnement que Röntgen a découvert par accident en 1895. Il ne reste plus qu'à le faire interagir avec un cristal : direction le chapitre suivant, avec la diffraction et la loi de Bragg.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("Production, spectre et absorption des rayons X")] = {
  intro: "Salut, moi c'est Nova ! On regarde comment on produit les rayons X (tube, synchrotron) avant d'étudier la diffraction. Pose-moi une question sur les raies Kα/Kβ, la loi de Moseley, ou demande un indice.",
  rules: [
    { test:/bremsstrahlung|freinage|spectre continu/i, replies:[
      "Le rayonnement de freinage (Bremsstrahlung) vient de la décélération brutale des électrons dans le champ électrique des noyaux de l'anode : il donne un spectre continu, pas des raies."
    ]},
    { test:/k\\s*alpha|kα|raie caract[ée]ristique/i, replies:[
      "Les raies caractéristiques (Kα, Kβ) viennent des transitions électroniques internes après ionisation d'une couche K : L→K donne Kα, M→K donne Kβ. Leur position dépend du matériau de l'anode (loi de Moseley)."
    ]},
    { test:/moseley/i, replies:[
      "La loi de Moseley : √ν = a(Z − b). Elle relie la fréquence d'une raie caractéristique au numéro atomique Z, et a permis de reclasser les éléments par Z plutôt que par masse atomique."
    ]},
    { test:/synchrotron/i, replies:[
      "Le synchrotron produit un rayonnement X bien plus intense et accordable en longueur d'onde qu'un tube de laboratoire, en déviant des électrons relativistes avec des aimants (dipôles, onduleurs)."
    ]},
    { test:/absorption|filtre|monochromateur/i, replies:[
      "L'absorption suit I = I₀e^(−μx). Pour obtenir un faisceau monochromatique (Kα pur), on utilise un filtre β (absorbe préférentiellement Kβ) ou un monochromateur cristallin (plus sélectif, basé sur la loi de Bragg)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à quelle couche se vide et quelle couche la comble pour Kα.",
      "Indice niveau 2 : la lacune est créée en couche K par ionisation.",
      "Indice niveau 3 : c'est un électron de la couche L qui comble cette lacune, donnant la transition L→K."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au seuil d'absorption K du matériau du filtre par rapport aux énergies Kα et Kβ de l'anode.",
      "Indice niveau 2 : ce seuil se situe entre les deux énergies.",
      "Indice niveau 3 : cela absorbe fortement Kβ tout en laissant passer Kα — c'est le rôle du filtre β."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
CRISTALLO_CHAPTERS[cristKey("Diffraction des rayons X : loi de Bragg et conditions de diffraction")] = {
  objectives: [
    "Établir la loi de Bragg à partir de la différence de marche entre deux plans réticulaires",
    "Utiliser la loi de Bragg pour calculer un angle de diffraction ou une distance interréticulaire",
    "Construire et interpréter la sphère d'Ewald et le réseau réciproque",
    "Distinguer diffusion élastique et diffusion inélastique des rayons X par la matière",
    "Apprécier pourquoi la collaboration père-fils Bragg (1913) reste unique dans l'histoire du prix Nobel, et en quoi leur modèle de réflexion sélective demeure la clé de lecture de toute expérience de diffraction moderne"
  ],
  prereqs: ["Plans réticulaires, indices de Miller et distances interréticulaires", "Production, spectre et absorption des rayons X"],
  bodyHtml: `
    <p>Nous arrivons au cœur de la radiocristallographie : la <strong>loi de Bragg</strong>, formulée en 1913 par William Henry Bragg et son fils William Lawrence Bragg (prix Nobel de physique 1915, William Lawrence Bragg restant à ce jour le plus jeune lauréat scientifique de l'histoire du Nobel). Elle relie de façon simple et directe la géométrie du réseau cristallin ($d_{hkl}$) aux angles auxquels on observe des faisceaux diffractés.</p>

    <p>Ce duo père-fils reste unique dans l'histoire du Nobel : W.L. Bragg n'a que 25 ans, encore étudiant à Cambridge, lorsqu'il propose le modèle de réflexion sélective sur les plans réticulaires qui porte aujourd'hui son nom, tandis que son père développe en parallèle le premier spectromètre à rayons X permettant de tester expérimentalement cette loi sur de nombreux cristaux.</p>

    <p>Plus d'un siècle plus tard, cette même loi reste utilisée quotidiennement pour contrôler la qualité des plaquettes de silicium en microélectronique ou pour déterminer la structure de nouveaux médicaments : ce chapitre en établit la démonstration géométrique complète, avant d'aborder sa reformulation moderne dans l'espace réciproque.</p>

    <h3>1. Diffusion des rayons X par la matière</h3>
    <p>Lorsqu'un rayon X rencontre un électron, il peut être diffusé de deux façons :</p>
    <table class="mini-table">
      <tr><th>Type de diffusion</th><th>Caractéristique</th></tr>
      <tr><td><strong>Diffusion élastique (Thomson/Rayleigh)</strong></td><td>Le photon X ressort avec la <em>même</em> longueur d'onde ; c'est cette diffusion cohérente, en phase avec l'onde incidente, qui donne naissance aux interférences constructives à l'origine de la diffraction</td></tr>
      <tr><td><strong>Diffusion inélastique (Compton)</strong></td><td>Le photon cède une partie de son énergie à l'électron ; la longueur d'onde diffusée est légèrement plus grande, sans relation de phase fixe — cette diffusion incohérente ne contribue qu'au bruit de fond du diagramme de diffraction</td></tr>
    </table>
    <p>Seule la diffusion élastique cohérente permet les interférences constructives qui produisent les taches ou pics de diffraction exploitables.</p>

    <h3>2. Établissement de la loi de Bragg</h3>
    <p>W.L. Bragg a proposé un modèle simple : traiter la diffraction comme une <strong>réflexion sélective</strong> des rayons X sur des familles de plans réticulaires parallèles, espacés de $d_{hkl}$. Deux rayons parallèles, réfléchis par deux plans successifs, interfèrent constructivement seulement si leur différence de marche est un multiple entier de la longueur d'onde.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <line x1="5" y1="70" x2="145" y2="70" stroke="#5A6472" stroke-width="1"/>
          <line x1="5" y1="90" x2="145" y2="90" stroke="#5A6472" stroke-width="1"/>
          <line x1="20" y1="20" x2="60" y2="70" stroke="#4C7CFF" stroke-width="1.6" marker-end="url(#a1)"/>
          <line x1="60" y1="70" x2="100" y2="20" stroke="#4C7CFF" stroke-width="1.6" marker-end="url(#a2)"/>
          <line x1="40" y1="45" x2="80" y2="90" stroke="#F0555C" stroke-width="1.6" marker-end="url(#a3)"/>
          <line x1="80" y1="90" x2="120" y2="45" stroke="#F0555C" stroke-width="1.6" marker-end="url(#a4)"/>
          <text x="62" y="66" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">θ</text>
          <text x="8" y="66" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">plan 1</text>
          <text x="8" y="86" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">plan 2</text>
          <defs>
            <marker id="a1" markerWidth="6" markerHeight="6" refX="4" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" fill="#4C7CFF"/></marker>
            <marker id="a2" markerWidth="6" markerHeight="6" refX="4" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" fill="#4C7CFF"/></marker>
            <marker id="a3" markerWidth="6" markerHeight="6" refX="4" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" fill="#F0555C"/></marker>
            <marker id="a4" markerWidth="6" markerHeight="6" refX="4" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" fill="#F0555C"/></marker>
          </defs>
        </svg>
        <span>Réflexion sur deux plans successifs (d entre eux)</span>
      </div>
    </div>

    <p>La géométrie du schéma montre que le rayon réfléchi par le plan inférieur parcourt une distance supplémentaire égale à $2 d_{hkl}\\sin\\theta$ par rapport au rayon réfléchi par le plan supérieur (θ étant l'angle entre le faisceau incident et le plan réticulaire, appelé <strong>angle de Bragg</strong>). L'interférence est constructive lorsque cette différence de marche vaut un nombre entier $n$ de longueurs d'onde :</p>
    <div class="formula-box">$$n\\lambda = 2\\,d_{hkl}\\,\\sin\\theta$$</div>
    <p>C'est la <strong>loi de Bragg</strong>. En pratique, on absorbe l'ordre de réflexion $n$ dans la définition de $d_{hkl}$ (un plan d'ordre $n$ pour $(hkl)$ est équivalent au plan $(nh,nk,nl)$ d'ordre 1), et on écrit simplement :</p>
    <div class="formula-box">$$\\lambda = 2\\,d_{hkl}\\,\\sin\\theta$$</div>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La loi de Bragg impose $\\sin\\theta = \\lambda/(2d) \\le 1$ : il existe donc une distance interréticulaire <strong>minimale</strong> observable, $d_{min} = \\lambda/2$. C'est pourquoi on utilise des rayons X (λ de l'ordre de l'angström) et non de la lumière visible (λ ~ 500 nm, bien trop grande) pour sonder les distances interatomiques d'un cristal.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si $d_{min} = \\lambda/2$, pourquoi ne suffit-il pas de choisir un rayonnement de longueur d'onde arbitrairement petite pour observer, en principe, n'importe quelle distance interréticulaire aussi fine soit-elle ? Quel autre facteur pratique (voir chapitre 5) limiterait un tel choix ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Avec un rayonnement Cu Kα (λ = 1,5406 Å), à quel angle 2θ observe-t-on la réflexion (111) d'un cristal cubique à faces centrées de paramètre a = 5,431 Å (silicium) ?</p>
      <p><strong>Solution :</strong> $d_{111} = a/\\sqrt{1^2+1^2+1^2} = 5{,}431/\\sqrt{3} \\approx 3{,}1358$ Å. D'après Bragg : $\\sin\\theta = \\lambda/(2d) = 1{,}5406/(2\\times3{,}1358) \\approx 0{,}2456$, soit $\\theta \\approx 14{,}22°$.</p>
      <p class="example-answer">Réponse : la réflexion (111) apparaît à 2θ ≈ 28,4°, valeur très proche de celle mesurée expérimentalement sur un diffractogramme de silicium (référence de calibration classique).</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le silicium sert de référence de calibration précisément parce que son paramètre de maille est connu avec une extrême précision. Qu'est-ce que cela implique sur le sens de la démarche : mesure-t-on d'abord a du silicium par diffraction pour ensuite calibrer l'appareil, ou l'inverse ?
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Simulateur — loi de Bragg</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Choisis une longueur d'onde, une distance d et un ordre n pour calculer l'angle de Bragg correspondant.</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>λ (Å) — ex : Cu Kα = 1,5406</label><input type="number" id="braggLambda" value="1.5406" step="0.001" oninput="updateBraggSim()">
          <label>d<sub>hkl</sub> (Å)</label><input type="number" id="braggD" value="2.0" step="0.01" oninput="updateBraggSim()">
          <label>Ordre n</label><input type="number" id="braggN" value="1" step="1" min="1" oninput="updateBraggSim()">
          <div class="sim-readout" id="braggReadout"></div>
        </div>
      </div>
    </div>

    <h3>3. Réseau réciproque et sphère d'Ewald</h3>
    <p>Une reformulation plus puissante (et indispensable pour la cristallographie du monocristal, chapitre 8) utilise le <strong>réseau réciproque</strong> : à chaque famille de plans $(hkl)$ du réseau direct correspond un vecteur $\\vec{d^*}_{hkl}$, perpendiculaire à ces plans, de norme $1/d_{hkl}$, pointant vers un nœud du réseau réciproque. La condition de diffraction s'énonce alors géométriquement grâce à la <strong>construction d'Ewald</strong> : la diffraction se produit si et seulement si un nœud du réseau réciproque touche la surface d'une sphère de rayon $1/\\lambda$ (la « sphère d'Ewald »), centrée sur l'échantillon dans la direction du faisceau incident. Cette construction, équivalente à la loi de Bragg mais bien plus générale, est à la base de toute l'interprétation moderne des expériences de diffraction (mono ou polycristal).</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Seule la diffusion élastique (cohérente) des rayons X par les électrons contribue à la diffraction ; la diffusion inélastique (Compton) ne donne que du bruit de fond</li>
      <li>Loi de Bragg : $n\\lambda = 2 d_{hkl}\\sin\\theta$, ou simplement $\\lambda = 2d\\sin\\theta$ en absorbant l'ordre n dans d</li>
      <li>La condition $\\sin\\theta \\le 1$ impose une distance minimale observable $d_{min} = \\lambda/2$, justifiant l'usage des rayons X</li>
      <li>Le réseau réciproque associe à chaque plan (hkl) un vecteur de norme 1/d, perpendiculaire au plan</li>
      <li>La construction d'Ewald donne la condition géométrique générale de diffraction (sphère de rayon 1/λ)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier le facteur 2 dans la loi de Bragg ($\\lambda = 2d\\sin\\theta$, pas $\\lambda = d\\sin\\theta$)</li>
      <li>Confondre l'angle de Bragg θ (entre le faisceau et le plan) et l'angle de diffraction mesuré au goniomètre, qui est 2θ (entre faisceau incident et faisceau diffracté)</li>
      <li>Croire que la diffraction est une simple réflexion optique classique — c'est un phénomène d'interférence collective de toutes les mailles du cristal</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Avec λ = 1,54 Å et d = 3,08 Å (n = 1), quel est l'angle de Bragg θ ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr6e1" value="wrong">θ ≈ 45°</label>
        <label class="option"><input type="radio" name="cr6e1" value="right">θ ≈ 14,5°</label>
        <label class="option"><input type="radio" name="cr6e1" value="wrong">θ ≈ 90°</label>
        <label class="option"><input type="radio" name="cr6e1" value="wrong">θ ≈ 30°</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr6e1','cr6fb1','Correct — sinθ = λ/(2d) = 1,54/6,16 ≈ 0,25, donc θ ≈ 14,5°.','Applique sinθ = λ/(2d) puis prends l\\'arcsinus du résultat.')">Vérifier</button>
      <div class="feedback" id="cr6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quelle est la distance interréticulaire minimale observable avec un rayonnement de longueur d'onde λ = 1,54 Å ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr6e2" value="wrong">3,08 Å</label>
        <label class="option"><input type="radio" name="cr6e2" value="right">0,77 Å</label>
        <label class="option"><input type="radio" name="cr6e2" value="wrong">1,54 Å</label>
        <label class="option"><input type="radio" name="cr6e2" value="wrong">Aucune limite</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr6e2','cr6fb2','Correct — d_min = λ/2, obtenu quand sinθ = 1 (θ = 90°) : 1,54/2 = 0,77 Å.','La distance minimale correspond au cas limite sinθ = 1, donc d_min = λ/2.')">Vérifier</button>
      <div class="feedback" id="cr6fb2"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>La technique dite de « diffraction avant destruction » (<em>diffraction-before-destruction</em>), développée depuis 2011 auprès des lasers à électrons libres à rayons X (XFEL), exploite des impulsions si brèves (quelques femtosecondes) que la diffraction est enregistrée avant même que le cristal, pourtant détruit par l'impulsion elle-même, n'ait eu le temps de se désorganiser — permettant d'étudier des nanocristaux de protéines trop petits ou trop fragiles pour la cristallographie classique. Une question de recherche active reste l'extension de cette approche à l'étude de réactions chimiques en temps réel, image par image, à l'échelle de la femtoseconde.</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Faisceau incident sur deux plans réticulaires parallèles → différence de marche $2d_{hkl}\\sin\\theta$ → interférence constructive si multiple entier de λ → <strong>loi de Bragg</strong> → reformulation équivalente : réseau réciproque (vecteur $1/d_{hkl}$) + <strong>construction d'Ewald</strong> (sphère de rayon $1/\\lambda$)</p>
    <p><strong>Équation maîtresse du chapitre :</strong></p>
    <div class="formula-box">$$\\lambda = 2\\,d_{hkl}\\,\\sin\\theta$$</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si W.L. Bragg avait travaillé isolément, sans le spectromètre développé par son père pour tester sa théorie — la loi de Bragg aurait-elle été acceptée aussi rapidement par la communauté scientifique de l'époque ?</li>
      <li>Pourquoi le modèle de « réflexion sélective » de Bragg, qui n'est qu'une analogie avec la réflexion optique classique, donne-t-il malgré tout des prédictions rigoureusement exactes pour un phénomène qui est en réalité une interférence collective ?</li>
      <li>Quelle serait la conséquence, pour l'interprétation d'un diagramme de diffraction, si l'on confondait systématiquement l'angle de Bragg θ avec l'angle 2θ mesuré au goniomètre ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W.L. Bragg, <em>The Diffraction of Short Electromagnetic Waves by a Crystal</em>, Proceedings of the Cambridge Philosophical Society, 1913 — l'article original établissant la loi de Bragg.</li>
      <li>W.H. Bragg, W.L. Bragg, <em>X Rays and Crystal Structure</em>, G. Bell and Sons, 1915 — l'ouvrage de synthèse du duo père-fils, publié l'année même de leur prix Nobel commun.</li>
      <li>H.N. Chapman et al., <em>Femtosecond X-ray Protein Nanocrystallography</em>, Nature, 2011 — l'article fondateur de la « diffraction avant destruction » évoquée en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais prédire à quel angle un cristal diffracte, comme le duo Bragg l'a établi à 25 ans à peine. Reste à savoir avec quelle intensité chaque tache apparaît : direction le chapitre suivant, avec le facteur de structure.</p>
  `,
  init: initBraggSim
};
CRISTALLO_NOVA_KB[cristKey("Diffraction des rayons X : loi de Bragg et conditions de diffraction")] = {
  intro: "Salut, moi c'est Nova ! On est au cœur du cours : la loi de Bragg. Donne-moi λ, d ou θ pour que je calcule la grandeur manquante, ou demande un indice sur un exercice.",
  rules: [
    { test:/loi de bragg|bragg/i, replies:[
      "La loi de Bragg : λ = 2d·sinθ (avec n=1 absorbé dans d). Elle relie la longueur d'onde, la distance interréticulaire et l'angle auquel on observe une réflexion constructive."
    ]},
    { test:/diffusion.*(compton|thomson|[ée]lastique|in[ée]lastique)/i, replies:[
      "Seule la diffusion élastique (Thomson), où le photon garde sa longueur d'onde et sa cohérence de phase, produit des interférences constructives (la diffraction). La diffusion Compton (inélastique) ne donne que du bruit de fond."
    ]},
    { test:/sph[èe]re d.ewald|r[ée]seau r[ée]ciproque/i, replies:[
      "Le réseau réciproque associe à chaque famille de plans (hkl) un vecteur de norme 1/d, perpendiculaire au plan. La sphère d'Ewald (rayon 1/λ) donne la condition géométrique générale de diffraction : diffraction si un nœud du réseau réciproque touche la sphère."
    ]},
    { test:/d\s*min|distance minimale/i, replies:[
      "La condition sinθ ≤ 1 impose d_min = λ/2 : c'est pourquoi il faut des rayons X (λ ~ 1 Å) et non de la lumière visible pour sonder les distances interatomiques d'un cristal."
    ]},
    { test:/2\\s*θ|2theta|goniom[èe]tre/i, replies:[
      "Attention à ne pas confondre : θ est l'angle de Bragg (entre le faisceau et le plan réticulaire), 2θ est l'angle mesuré au goniomètre entre le faisceau incident et le faisceau diffracté."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique sinθ = λ/(2d).",
      "Indice niveau 2 : sinθ = 1,54/(2×3,08) = 1,54/6,16 ≈ 0,25.",
      "Indice niveau 3 : arcsin(0,25) ≈ 14,5°."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : quelle est la valeur maximale possible de sinθ ?",
      "Indice niveau 2 : sinθ_max = 1, ce qui correspond à θ = 90°.",
      "Indice niveau 3 : d_min = λ/2 = 1,54/2 = 0,77 Å."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
CRISTALLO_CHAPTERS[cristKey("Facteur de structure, intensités diffractées et extinctions systématiques")] = {
  objectives: [
    "Définir le facteur de diffusion atomique f et le facteur de structure F(hkl)",
    "Relier l'intensité diffractée I(hkl) au module au carré du facteur de structure",
    "Prévoir les extinctions systématiques liées au mode de réseau (P, I, F, C) et aux éléments de symétrie translationnelle",
    "Utiliser les extinctions observées pour déterminer le groupe d'espace ou le mode de réseau d'un cristal inconnu",
    "Illustrer, à travers la détermination de la planéité du cycle benzénique par Lonsdale (1929), comment l'analyse des intensités diffractées va au-delà de ce que révèle la seule position des réflexions"
  ],
  prereqs: ["Diffraction des rayons X : loi de Bragg et conditions de diffraction", "Groupes ponctuels, groupes d'espace et notation internationale"],
  bodyHtml: `
    <p>En 1929, la cristallographe britannique <strong>Kathleen Lonsdale</strong> détermine, à partir des intensités diffractées et des extinctions systématiques observées sur des cristaux d'hexaméthylbenzène, que le cycle benzénique est parfaitement plan et hexagonal — mettant fin à plusieurs décennies de débat sur la géométrie de cette molécule emblématique. Elle deviendra en 1945, avec Marjory Stephenson, l'une des deux premières femmes élues membres de la Royal Society. Son travail illustre exactement l'objet de ce chapitre : ce ne sont pas seulement les positions des taches de diffraction (loi de Bragg) qui renseignent sur la structure, mais tout autant leurs <strong>intensités relatives</strong>.</p>

    <p>Sans le facteur de structure, un diagramme de diffraction ne serait qu'une collection de positions angulaires : c'est l'analyse fine des intensités — et, tout aussi informative, de leur absence sous forme d'extinctions systématiques — qui permet de remonter, atome par atome, à l'arrangement réel dans la maille.</p>

    <p>La loi de Bragg (chapitre 6) prédit <em>où</em> peuvent apparaître des réflexions, mais pas leur <strong>intensité</strong>. C'est le <strong>facteur de structure</strong> $F(hkl)$ qui détermine si une réflexion permise par la géométrie est effectivement observée, et avec quelle intensité — une information essentielle pour remonter à la position des atomes dans la maille (chapitre 9).</p>

    <h3>1. Facteur de diffusion atomique</h3>
    <p>Un atome isolé, avec son nuage électronique étendu, ne diffuse pas les rayons X comme un point : son <strong>facteur de diffusion atomique</strong> $f(\\theta)$ décroît avec l'angle de diffusion $\\theta$ (car les interférences entre les différentes parties du nuage électronique deviennent progressivement destructives). À $\\theta = 0$, $f$ est égal au nombre d'électrons $Z$ de l'atome ; il décroît ensuite avec $\\sin\\theta/\\lambda$. Les atomes lourds (nombreux électrons) diffusent donc bien plus intensément que les atomes légers — une limitation majeure pour localiser précisément les atomes d'hydrogène par diffraction X (on utilise alors plutôt la diffraction de neutrons, sensible aux noyaux).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si un cristal contient à la fois des atomes de carbone et des atomes d'hydrogène, et que le facteur de diffusion d'un atome lourd domine largement celui d'un atome léger, à quoi devez-vous vous attendre concernant la précision avec laquelle chaque type d'atome sera positionné dans la structure finale ?
    </div>

    <h3>2. Le facteur de structure F(hkl)</h3>
    <p>Le facteur de structure additionne, avec leur phase relative, les contributions de <strong>tous les atomes du motif</strong> (dans la maille élémentaire) à la réflexion $(hkl)$ :</p>
    <div class="formula-box">$$F(hkl) = \\sum_{j=1}^{N} f_j\\, e^{\\,2\\pi i (h x_j + k y_j + l z_j)}$$</div>
    <p>où la somme porte sur les $N$ atomes du motif, $f_j$ est le facteur de diffusion de l'atome $j$, et $(x_j, y_j, z_j)$ ses coordonnées <strong>réduites</strong> (fractionnaires, exprimées en fraction des paramètres de maille $a$, $b$, $c$). Le facteur de structure est un nombre complexe : son module donne l'amplitude diffractée, sa phase (perdue expérimentalement — c'est le fameux « problème de la phase », voir chapitre 9) code l'information de position exacte des atomes.</p>

    <h3>3. De l'amplitude à l'intensité mesurée</h3>
    <p>Le détecteur ne mesure pas directement $F(hkl)$ mais son <strong>intensité</strong>, proportionnelle au carré du module :</p>
    <div class="formula-box">$$I(hkl) \\propto |F(hkl)|^2$$</div>
    <p>C'est précisément parce que l'expérience ne donne accès qu'à $|F(hkl)|^2$ (et non à la phase de $F$) que la détermination de structure n'est pas un simple calcul direct — c'est le cœur du « problème de la phase » abordé au chapitre 9.</p>

    <h3>4. Extinctions systématiques liées au mode de réseau</h3>
    <p>Lorsque la maille choisie est <strong>multiple</strong> (I, F, A/B/C) plutôt que primitive, certaines réflexions $(hkl)$, pourtant permises géométriquement par la loi de Bragg, ont un facteur de structure rigoureusement <strong>nul</strong> : elles sont dites <strong>systématiquement éteintes</strong>. On peut démontrer les règles suivantes :</p>
    <table class="mini-table">
      <tr><th>Mode de réseau</th><th>Condition de réflexion (F ≠ 0)</th></tr>
      <tr><td>P (primitif)</td><td>Aucune condition — toutes les réflexions autorisées par Bragg sont possibles</td></tr>
      <tr><td>I (centré)</td><td>$h+k+l = 2n$ (nombre pair)</td></tr>
      <tr><td>F (faces centrées)</td><td>$h, k, l$ tous pairs ou tous impairs (« unmixed »)</td></tr>
      <tr><td>C (base centrée, plan ab)</td><td>$h+k = 2n$</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Démontrer que pour un réseau I (centré, avec un nœud supplémentaire en $(1/2, 1/2, 1/2)$), la réflexion (100) est systématiquement éteinte.</p>
      <p><strong>Solution :</strong> Pour un motif à un seul atome par nœud (facteur f identique), $F(hkl) = f\\left[1 + e^{2\\pi i (h/2+k/2+l/2)}\\right]$. Pour (100) : $F = f\\left[1 + e^{i\\pi}\\right] = f[1 + (-1)] = 0$. En effet, $h+k+l = 1$, impair, ce qui viole la condition $h+k+l=2n$ du tableau.</p>
      <p class="example-answer">Réponse : F(100) = 0, la réflexion est bien éteinte — les ondes diffusées par les deux nœuds de la maille sont en opposition de phase et s'annulent exactement.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé — utilité pratique</span>
      L'observation systématique des extinctions sur un diagramme de diffraction (poudre ou monocristal) permet, sans connaître encore la structure atomique complète, de déterminer directement le <strong>mode de réseau de Bravais</strong> du cristal, et souvent de restreindre fortement le choix du <strong>groupe d'espace</strong> parmi les 230 possibles (les axes hélicoïdaux et plans de glissement produisent également des extinctions spécifiques, dites « extinctions liées à la symétrie translationnelle », complémentaires de celles du mode de réseau).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Lonsdale a pu conclure à la planéité du cycle benzénique sans jamais « voir » directement les atomes de carbone. Qu'est-ce que cela vous apprend sur la nature de l'information portée par les extinctions systématiques, comparée à celle portée par une simple image ?
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le facteur de diffusion atomique f(θ) décroît avec l'angle θ, et vaut Z (numéro atomique) à θ = 0</li>
      <li>Le facteur de structure $F(hkl) = \\sum_j f_j e^{2\\pi i(hx_j+ky_j+lz_j)}$ somme les contributions de phase de tous les atomes du motif</li>
      <li>L'intensité mesurée est $I(hkl) \\propto |F(hkl)|^2$ — la phase de F est perdue expérimentalement (« problème de la phase »)</li>
      <li>Extinctions systématiques : I → h+k+l pair ; F → h,k,l tous pairs ou tous impairs ; C → h+k pair</li>
      <li>Les extinctions observées permettent de déterminer le mode de réseau et de restreindre le groupe d'espace</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre l'amplitude F(hkl) (complexe, contient la phase) et l'intensité I(hkl) (réelle, mesurée, proportionnelle à |F|²)</li>
      <li>Oublier que le facteur de diffusion atomique diminue avec l'angle θ — ce n'est pas une constante égale à Z partout</li>
      <li>Croire qu'une extinction systématique est un défaut expérimental — c'est au contraire une conséquence rigoureuse et prévisible de la symétrie de translation</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pour un réseau F (faces centrées), la réflexion (110) est-elle autorisée ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr7e1" value="right">Non, car les indices ne sont pas « tous pairs ou tous impairs » (1,1,0 mélange parité)</label>
        <label class="option"><input type="radio" name="cr7e1" value="wrong">Oui, toutes les réflexions sont autorisées pour un réseau F</label>
        <label class="option"><input type="radio" name="cr7e1" value="wrong">Non, car h+k+l est impair</label>
        <label class="option"><input type="radio" name="cr7e1" value="wrong">Oui, car h+k est pair</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr7e1','cr7fb1','Correct — pour F, il faut h,k,l tous pairs ou tous impairs. Ici 1,1,0 mélange (deux impairs, un pair), la condition n\\'est pas respectée : réflexion éteinte.','Relis la condition du réseau F : les trois indices doivent être tous pairs ou tous impairs, pas un mélange.')">Vérifier</button>
      <div class="feedback" id="cr7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Que mesure réellement le détecteur lors d'une expérience de diffraction ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr7e2" value="wrong">La phase du facteur de structure F(hkl)</label>
        <label class="option"><input type="radio" name="cr7e2" value="right">L'intensité, proportionnelle à |F(hkl)|²</label>
        <label class="option"><input type="radio" name="cr7e2" value="wrong">Le facteur de diffusion atomique f directement</label>
        <label class="option"><input type="radio" name="cr7e2" value="wrong">Les coordonnées (x,y,z) des atomes directement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr7e2','cr7fb2','Correct — le détecteur ne mesure que l\\'intensité I ∝ |F|² ; la phase de F est perdue, c\\'est le « problème de la phase » du chapitre 9.','Le détecteur enregistre une intensité, une grandeur réelle positive — pas directement une amplitude complexe.')">Vérifier</button>
      <div class="feedback" id="cr7fb2"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>Au-delà de la simple position des atomes, l'analyse fine des intensités diffractées à très haute résolution permet aujourd'hui de cartographier directement la <strong>densité électronique de liaison</strong> (analyse dite QTAIM, <em>Quantum Theory of Atoms in Molecules</em>), révélant la répartition réelle des électrons dans une liaison chimique plutôt qu'un simple modèle de sphères atomiques ponctuelles. Une question de recherche active reste l'extension routinière de cette approche, aujourd'hui réservée à de petites molécules très bien cristallisées, à des macromolécules biologiques de grande taille.</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Atome isolé → facteur de diffusion atomique $f(\\theta)$ (≈ Z à θ=0, décroît avec θ) → somme des contributions de phase de tous les atomes du motif → <strong>facteur de structure</strong> $F(hkl)$ (complexe) → intensité mesurée $I \\propto |F|^2$ (phase perdue) → conditions d'annulation selon le mode de réseau → <strong>extinctions systématiques</strong> → détermination du mode de réseau / restriction du groupe d'espace</p>
    <p><strong>Équation maîtresse du chapitre :</strong></p>
    <div class="formula-box">$$F(hkl) = \\sum_{j} f_j\\, e^{2\\pi i(hx_j+ky_j+lz_j)} \\qquad I(hkl) \\propto |F(hkl)|^2$$</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si deux structures atomiques complètement différentes produisaient exactement le même jeu d'intensités |F(hkl)|² — serait-il possible de les distinguer par diffraction seule, sans autre information ?</li>
      <li>Pourquoi Lonsdale a-t-elle dû s'appuyer sur les intensités et les extinctions plutôt que sur les seules positions des réflexions pour trancher le débat sur la planéité du benzène ?</li>
      <li>Quelle serait la conséquence, pour l'ensemble des extinctions prédites par le tableau du mode de réseau, si le cristal étudié contenait en réalité un mélange de deux réseaux légèrement différents (macle) ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>K. Lonsdale, <em>The Structure of the Benzene Ring in Hexamethylbenzene</em>, Proceedings of the Royal Society A, 1929 — l'article établissant la planéité du cycle benzénique par analyse des intensités diffractées.</li>
      <li>C. Giacovazzo (dir.), <em>Fundamentals of Crystallography</em>, Oxford University Press — référence standard de niveau L3/master pour ce chantier.</li>
      <li>P. Coppens, <em>X-ray Charge Densities and Chemical Bonding</em>, IUCr Texts on Crystallography, Oxford University Press — pour l'analyse de densité électronique évoquée en Frontière de la recherche.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais lire non seulement où, mais aussi avec quelle force un cristal diffracte, comme Lonsdale l'a fait pour trancher le débat sur le benzène en 1929. Reste à voir comment collecter concrètement ces intensités sur un instrument réel : direction le chapitre suivant, avec les méthodes expérimentales de radiocristallographie.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("Facteur de structure, intensités diffractées et extinctions systématiques")] = {
  intro: "Salut, moi c'est Nova ! On aborde le facteur de structure F(hkl) et les extinctions systématiques. Pose-moi une question sur une condition de réflexion (P, I, F, C), ou demande un indice.",
  rules: [
    { test:/facteur de structure|f\\(hkl\\)/i, replies:[
      "Le facteur de structure F(hkl) = Σ f_j · e^(2πi(hx_j+ky_j+lz_j)) additionne, avec leur phase, les contributions de tous les atomes du motif à une réflexion donnée. C'est un nombre complexe."
    ]},
    { test:/intensit[ée]|\\|f\\|/i, replies:[
      "L'intensité mesurée est I(hkl) ∝ |F(hkl)|². Le détecteur perd l'information de phase de F — c'est le fameux « problème de la phase », central au chapitre 9."
    ]},
    { test:/extinction/i, replies:[
      "Extinctions systématiques par mode de réseau : I → h+k+l pair ; F → h,k,l tous pairs ou tous impairs ; C → h+k pair. Un réseau P n'a aucune extinction liée au mode de réseau."
    ]},
    { test:/facteur de diffusion atomique|f\\(θ\\)|f\\(theta\\)/i, replies:[
      "Le facteur de diffusion atomique f(θ) vaut Z (numéro atomique) à θ=0, puis décroît avec l'angle car les interférences internes au nuage électronique deviennent partiellement destructives."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : vérifie la parité des trois indices (1,1,0).",
      "Indice niveau 2 : pour un réseau F, il faut que h, k, l soient tous pairs ou tous impairs simultanément.",
      "Indice niveau 3 : ici on a deux indices impairs (1,1) et un pair (0) — condition non respectée, réflexion éteinte."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce qu'un détecteur de rayons X peut physiquement mesurer (une énergie, donc une intensité).",
      "Indice niveau 2 : l'intensité est une grandeur réelle et positive.",
      "Indice niveau 3 : I(hkl) est proportionnelle à |F(hkl)|², le carré du module du facteur de structure."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
CRISTALLO_CHAPTERS[cristKey("Méthodes expérimentales de radiocristallographie : Laue, poudre, monocristal")] = {
  objectives: [
    "Décrire le principe et l'usage de la méthode de Laue (rayonnement blanc, cristal fixe)",
    "Décrire le principe de la méthode des poudres (Debye-Scherrer) et interpréter un diffractogramme",
    "Décrire le principe du diffractomètre 4-cercles / à détecteur surfacique pour le monocristal",
    "Choisir la méthode expérimentale adaptée selon l'objectif (identification de phase, structure complète, texture...)",
    "Expliquer pourquoi l'expérience originelle de von Laue (1912) n'a nécessité ni de faire tourner le cristal ni d'utiliser un rayonnement monochromatique, contrairement aux deux autres méthodes vues dans ce chapitre"
  ],
  prereqs: ["Diffraction des rayons X : loi de Bragg et conditions de diffraction"],
  bodyHtml: `
    <p>En 1912, le physicien allemand <strong>Max von Laue</strong> suggère à deux jeunes chercheurs, Walter Friedrich et Paul Knipping, de faire traverser un faisceau de rayons X à travers un cristal de sulfate de cuivre : la plaque photographique placée derrière révèle un motif de taches régulièrement disposées — la toute première preuve expérimentale que les rayons X sont bien des ondes et que les cristaux sont des réseaux périodiques d'atomes. Cette expérience, réalisée alors que de nombreux physiciens doutaient encore de la nature ondulatoire des rayons X, vaudra à von Laue le prix Nobel de physique dès 1914, un an à peine avant celui des Bragg pour la loi qui porte leur nom (chapitre 6).</p>

    <p>Von Laue n'a pourtant jamais eu besoin de faire tourner son cristal : c'est précisément l'astuce de sa méthode, qui reste utilisée aujourd'hui pour orienter rapidement un monocristal ou capturer des réactions chimiques ultrarapides sur synchrotron.</p>

    <p>La loi de Bragg impose une double condition : une longueur d'onde $\\lambda$ et un angle $\\theta$ adaptés à chaque distance $d_{hkl}$. Comme un cristal fixe éclairé par un faisceau monochromatique satisfait rarement cette condition pour une orientation quelconque, trois grandes familles de méthodes expérimentales ont été développées, selon la variable que l'on fait varier : la longueur d'onde, l'orientation du cristal, ou les deux à la fois.</p>

    <h3>1. Méthode de Laue : rayonnement polychromatique, cristal fixe</h3>
    <p>Historiquement la toute première méthode (Max von Laue, 1912, prix Nobel de physique 1914) : un monocristal <strong>fixe</strong> est éclairé par un faisceau de rayons X <strong>polychromatique</strong> (« blanc », spectre continu non filtré). Pour chaque famille de plans $(hkl)$, il existe forcément une longueur d'onde du spectre continu qui satisfait la loi de Bragg à l'angle géométrique imposé par l'orientation fixe du cristal — la condition variable est ici $\\lambda$. Le résultat est un ensemble de taches disposées selon la symétrie du cristal (méthode encore utilisée aujourd'hui pour déterminer rapidement l'orientation d'un monocristal, ou en cristallographie ultrarapide résolue en temps sur synchrotron).</p>

    <h3>2. Méthode des poudres (Debye-Scherrer)</h3>
    <p>Ici, on utilise un rayonnement <strong>monochromatique</strong> (λ fixe) mais un échantillon <strong>polycristallin</strong> (poudre ou matériau fritté) : la myriade de cristallites orientés aléatoirement garantit statistiquement que, pour chaque famille $(hkl)$, un grand nombre de cristallites présentent par hasard l'orientation exacte satisfaisant la loi de Bragg. Chaque famille de plans donne alors non pas une tache isolée, mais un <strong>cône de diffraction</strong> d'angle $4\\theta$ (le double de l'angle de diffraction $2\\theta$), car toutes les orientations azimutales autour du faisceau incident sont représentées dans la poudre.</p>
    <p>Le détecteur (film circulaire à l'origine, aujourd'hui détecteur balayant $2\\theta$) enregistre l'intersection de ces cônes : on obtient un <strong>diffractogramme</strong> $I = f(2\\theta)$, une suite de pics dont les positions codent les distances $d_{hkl}$ (via Bragg) et les intensités le contenu du motif (via $|F(hkl)|^2$).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — applications de la méthode des poudres</span>
      La diffraction sur poudre est la technique la plus répandue en routine : <strong>identification de phase</strong> (comparaison à des bases de données comme la PDF, Powder Diffraction File, gérée par l'ICDD), détermination des <strong>paramètres de maille</strong>, estimation de la <strong>taille des cristallites</strong> via l'élargissement des pics (équation de Scherrer, $\\tau = K\\lambda/(\\beta\\cos\\theta)$, où $\\tau$ est la taille moyenne des cristallites, $\\beta$ la largeur à mi-hauteur du pic et $K$ une constante de forme voisine de 0,9), et affinement de structure par la méthode de Rietveld (chapitre 9).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement à la méthode de Laue, la méthode des poudres perd l'information d'orientation individuelle des cristallites. Qu'est-ce que cette perte d'information directionnelle vous suggère sur les limites de ce que l'on peut déduire d'un simple diffractogramme $I = f(2\\theta)$, comparé à un jeu de données de monocristal ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un pic de diffraction sur poudre présente une largeur à mi-hauteur $\\beta = 0{,}20°$ (convertie en radians : $\\beta \\approx 0{,}00349$ rad) à un angle $\\theta = 15°$, avec $\\lambda = 1{,}5406$ Å et $K = 0{,}9$. Estimer la taille moyenne des cristallites.</p>
      <p><strong>Solution :</strong> $\\tau = K\\lambda/(\\beta\\cos\\theta) = (0{,}9 \\times 1{,}5406)/(0{,}00349 \\times \\cos15°) \\approx 1{,}3865/(0{,}00349 \\times 0{,}966) \\approx 1{,}3865/0{,}00337 \\approx 411$ Å.</p>
      <p class="example-answer">Réponse : la taille moyenne des cristallites est d'environ 41 nm — un exemple typique de matériau nanocristallin.</p>
    </div>

    <h3>3. Méthodes du monocristal : diffractomètre 4-cercles et détecteur surfacique</h3>
    <p>Pour une détermination <strong>complète</strong> de la structure cristalline (position exacte de chaque atome dans la maille, chapitre 9), il faut mesurer un très grand nombre de réflexions $(hkl)$ individuelles et indexées sans ambiguïté — ce qui nécessite un <strong>monocristal unique</strong> (typiquement 0,05 à 0,5 mm), monté sur un goniomètre permettant de contrôler précisément son orientation.</p>
    <p>Le <strong>diffractomètre à quatre cercles</strong> (historiquement séquentiel, un point mesuré à la fois) a largement été remplacé, depuis les années 1990-2000, par des <strong>diffractomètres à détecteur surfacique</strong> (CCD, CMOS ou détecteur à pixels hybrides), qui enregistrent simultanément de nombreuses réflexions par image, réduisant considérablement le temps de collecte de données (de plusieurs jours à quelques heures pour une structure de routine). Ces méthodes fournissent l'ensemble des intensités $I(hkl)$ nécessaires à la résolution de structure et à l'affinement (chapitre 9).</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le passage du diffractomètre séquentiel (un point à la fois) au détecteur surfacique (une image entière à la fois) a réduit le temps de collecte de plusieurs jours à quelques heures. Quel type de recherche scientifique, jusque-là simplement impraticable, ce gain de temps a-t-il pu rendre possible ?
    </div>

    <table class="mini-table">
      <tr><th>Méthode</th><th>Rayonnement</th><th>Échantillon</th><th>Usage principal</th></tr>
      <tr><td>Laue</td><td>Polychromatique</td><td>Monocristal fixe</td><td>Orientation rapide, cristallographie résolue en temps</td></tr>
      <tr><td>Poudre (Debye-Scherrer)</td><td>Monochromatique</td><td>Poudre polycristalline</td><td>Identification de phase, paramètres de maille, taille de cristallites, Rietveld</td></tr>
      <tr><td>Monocristal (4-cercles / détecteur surfacique)</td><td>Monochromatique</td><td>Monocristal orienté</td><td>Résolution complète de structure atomique</td></tr>
    </table>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Méthode de Laue : rayonnement polychromatique, cristal fixe — la variable satisfaisant Bragg est λ</li>
      <li>Méthode des poudres : rayonnement monochromatique, échantillon polycristallin — chaque famille (hkl) donne un cône de diffraction</li>
      <li>Le diffractogramme de poudre I = f(2θ) sert à l'identification de phase, aux paramètres de maille, à la taille des cristallites (équation de Scherrer)</li>
      <li>La méthode du monocristal (diffractomètre 4-cercles ou détecteur surfacique) est nécessaire pour la résolution complète d'une structure atomique</li>
      <li>Équation de Scherrer : $\\tau = K\\lambda/(\\beta\\cos\\theta)$, reliant l'élargissement des pics à la taille des cristallites</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre l'angle du cône de diffraction sur poudre (4θ) et l'angle de diffraction 2θ mesuré au détecteur</li>
      <li>Oublier de convertir β en radians dans l'équation de Scherrer (l'équation exige des angles en radians)</li>
      <li>Croire que la méthode des poudres suffit pour une résolution complète de structure — elle donne un diffractogramme 1D avec des recouvrements de pics, beaucoup moins d'information qu'un jeu de données 3D de monocristal</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Dans la méthode de Laue, quelle grandeur varie pour satisfaire la loi de Bragg pour chaque famille de plans ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr8e1" value="wrong">L'orientation du cristal</label>
        <label class="option"><input type="radio" name="cr8e1" value="right">La longueur d'onde λ (spectre polychromatique)</label>
        <label class="option"><input type="radio" name="cr8e1" value="wrong">La température de l'échantillon</label>
        <label class="option"><input type="radio" name="cr8e1" value="wrong">La distance échantillon-détecteur</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr8e1','cr8fb1','Correct — le cristal est fixe, c\\'est le spectre continu (polychromatique) qui fournit forcément une longueur d\\'onde satisfaisant Bragg pour chaque plan.','Le cristal reste fixe dans la méthode de Laue : c\\'est donc une autre grandeur de la loi de Bragg qui doit varier.')">Vérifier</button>
      <div class="feedback" id="cr8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi la méthode des poudres produit-elle des cônes de diffraction plutôt que des taches isolées ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr8e2" value="right">Parce que les cristallites de la poudre présentent toutes les orientations azimutales possibles autour du faisceau</label>
        <label class="option"><input type="radio" name="cr8e2" value="wrong">Parce que le rayonnement utilisé est polychromatique</label>
        <label class="option"><input type="radio" name="cr8e2" value="wrong">Parce que le détecteur tourne autour de l'échantillon</label>
        <label class="option"><input type="radio" name="cr8e2" value="wrong">Parce que les rayons X sont diffusés de manière inélastique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr8e2','cr8fb2','Correct — la statistique des orientations aléatoires des cristallites remplit toutes les positions azimutales autour de l\\'axe du faisceau, ce qui balaie un cône complet.','Pense au très grand nombre de cristallites orientés aléatoirement dans une poudre : quelle figure géométrique cela engendre-t-il autour du faisceau incident ?')">Vérifier</button>
      <div class="feedback" id="cr8fb2"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>La diffraction sur poudre <strong>operando</strong> — enregistrée en continu pendant qu'une batterie se charge, qu'une réaction catalytique se produit, ou qu'un matériau est chauffé — permet aujourd'hui de suivre en temps réel des transformations de phase qui ne seraient sinon observables qu'à l'état initial et final. Une question de recherche active reste de rendre cette approche accessible sur des instruments de laboratoire courants, avec une résolution temporelle suffisante, sans nécessiter systématiquement un accès à une ligne de lumière synchrotron.</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Loi de Bragg (λ, d, θ liés) → variable choisie pour satisfaire la condition : <strong>λ variable</strong> (Laue, cristal fixe) / <strong>orientations multiples statistiques</strong> (poudre, λ fixe → cônes de diffraction) / <strong>orientation contrôlée point par point</strong> (monocristal, λ fixe) → collecte des intensités $I(hkl)$ → direction chapitre 9 : résolution et affinement de structure</p>
    <p><strong>Équation clé du chapitre (taille des cristallites) :</strong></p>
    <div class="formula-box">$$\\tau = \\dfrac{K\\lambda}{\\beta\\cos\\theta} \\quad \\text{(équation de Scherrer)}$$</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'on disposait d'un cristal parfait, sans aucun défaut ni taille finie de cristallite — l'équation de Scherrer aurait-elle encore un sens à lui appliquer ?</li>
      <li>Pourquoi von Laue a-t-il choisi le sulfate de cuivre pour sa toute première expérience plutôt qu'un cristal quelconque disponible au laboratoire ?</li>
      <li>Quelle serait la conséquence, pour l'identification de phase par comparaison à une base de données comme la PDF, d'un mélange de plusieurs phases cristallines dans un même échantillon de poudre ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W. Friedrich, P. Knipping, M. von Laue, <em>Interferenzerscheinungen bei Röntgenstrahlen</em>, Sitzungsberichte der Bayerischen Akademie der Wissenschaften, 1912 — le compte-rendu de la toute première expérience de diffraction sur cristal.</li>
      <li>B.D. Cullity, S.R. Stock, <em>Elements of X-Ray Diffraction</em>, Prentice Hall — référence standard pour les méthodes expérimentales de diffraction à ce niveau.</li>
      <li>P. Scherrer, <em>Bestimmung der Größe und der inneren Struktur von Kolloidteilchen mittels Röntgenstrahlen</em>, Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen, 1918 — l'article fondateur de l'équation reliant élargissement des pics et taille des cristallites.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais choisir l'instrument adapté, du montage historique de von Laue au diffractomètre moderne. Reste l'étape la plus délicate : transformer ces intensités mesurées en positions atomiques précises — direction le chapitre suivant, avec la résolution et l'affinement des structures cristallines.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("Méthodes expérimentales de radiocristallographie : Laue, poudre, monocristal")] = {
  intro: "Salut, moi c'est Nova ! On compare les méthodes expérimentales : Laue, poudre (Debye-Scherrer), monocristal. Pose-moi une question sur l'une d'elles, ou demande un indice.",
  rules: [
    { test:/laue/i, replies:[
      "La méthode de Laue utilise un cristal fixe et un rayonnement polychromatique (blanc) : c'est la longueur d'onde qui varie pour satisfaire Bragg pour chaque famille de plans, pas l'orientation."
    ]},
    { test:/poudre|debye.scherrer|cône/i, replies:[
      "La méthode des poudres utilise un rayonnement monochromatique et un échantillon polycristallin : chaque famille (hkl) forme un cône de diffraction, car toutes les orientations azimutales sont représentées dans la poudre."
    ]},
    { test:/scherrer|taille.*cristallite/i, replies:[
      "L'équation de Scherrer τ = Kλ/(β·cosθ) relie l'élargissement d'un pic (β, en radians) à la taille moyenne des cristallites τ. Plus les cristallites sont petits, plus les pics sont larges."
    ]},
    { test:/4.cercles|monocristal|d[ée]tecteur surfacique/i, replies:[
      "Le diffractomètre 4-cercles (ou à détecteur surfacique aujourd'hui) mesure un très grand nombre de réflexions individuelles sur un monocristal unique — indispensable pour une résolution complète de structure (chapitre 9)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : le cristal est fixe dans la méthode de Laue.",
      "Indice niveau 2 : donc ce n'est pas l'orientation qui varie.",
      "Indice niveau 3 : c'est le rayonnement polychromatique qui fournit forcément la bonne longueur d'onde pour chaque plan."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au grand nombre de cristallites orientés aléatoirement dans une poudre.",
      "Indice niveau 2 : statistiquement, toutes les orientations azimutales autour du faisceau sont représentées.",
      "Indice niveau 3 : cela balaie donc un cône complet autour de l'axe du faisceau, pas une tache isolée."
    ]}
  ]
};

/* =========================== CHAPITRE 9 =========================== */
CRISTALLO_CHAPTERS[cristKey("Résolution et affinement des structures cristallines")] = {
  objectives: [
    "Comprendre le « problème de la phase » et pourquoi il empêche un calcul direct de la structure",
    "Décrire le principe de la fonction de Patterson pour localiser les atomes lourds",
    "Décrire le principe des méthodes directes (relations statistiques entre phases)",
    "Comprendre le principe de l'affinement par moindres carrés et de la méthode de Rietveld sur poudre",
    "Retracer, à travers les trente années de travail de Dorothy Hodgkin sur l'insuline (1934-1969), le caractère itératif et non trivial de toute résolution de structure cristalline"
  ],
  prereqs: ["Facteur de structure, intensités diffractées et extinctions systématiques", "Méthodes expérimentales de radiocristallographie : Laue, poudre, monocristal"],
  bodyHtml: `
    <p>En 1969, après plus de trente ans d'efforts commencés dès sa thèse en 1934, la chimiste britannique <strong>Dorothy Hodgkin</strong> achève la détermination de la structure de l'insuline — une protéine de plus de 800 atomes non-hydrogène, un défi technique considérable pour l'époque. Elle avait déjà résolu, plus tôt, les structures de la pénicilline (1945) et de la vitamine B12 (1954), ce qui lui vaudra le prix Nobel de chimie 1964 ; elle reste à ce jour la seule femme britannique lauréate d'un prix Nobel scientifique. Chacune de ces résolutions a nécessité de surmonter, d'abord à la main puis avec l'aide des tout premiers ordinateurs, le même obstacle fondamental : le problème de la phase que ce chapitre va détailler.</p>

    <p>Ce que ces exemples montrent, c'est que la résolution de structure n'est jamais un calcul unique et direct, mais un processus <strong>itératif</strong> de modèle, de comparaison aux données, puis d'affinement progressif — une démarche scientifique à part entière, bien plus que la simple application d'une formule.</p>

    <p>Après la collecte des intensités $I(hkl)$ (chapitre 8), il reste l'étape la plus délicate : remonter à la <strong>structure atomique</strong> elle-même — c'est-à-dire déterminer les coordonnées $(x,y,z)$ de chaque atome du motif. Ce chapitre présente les grandes stratégies utilisées pour résoudre ce problème.</p>

    <h3>1. Le problème de la phase</h3>
    <p>La densité électronique $\\rho(x,y,z)$ dans la maille — qui révèle directement la position des atomes (ses maxima correspondent aux positions atomiques) — s'obtient en principe par une transformée de Fourier inverse du facteur de structure :</p>
    <div class="formula-box">$$\\rho(x,y,z) = \\dfrac{1}{V}\\sum_{h}\\sum_{k}\\sum_{l} F(hkl)\\, e^{-2\\pi i(hx+ky+lz)}$$</div>
    <p>Or l'expérience de diffraction ne donne accès qu'au <strong>module</strong> $|F(hkl)|$ (via l'intensité $I \\propto |F|^2$, chapitre 7), jamais à sa <strong>phase</strong> $\\varphi_{hkl}$. C'est le fameux <strong>problème de la phase</strong> (« phase problem »), central en cristallographie depuis les années 1910 et qui reste, plus d'un siècle après, l'un des défis les plus étudiés du domaine.</p>

    <h3>2. La fonction de Patterson</h3>
    <p>A.L. Patterson a montré en 1934 qu'il est possible de calculer une fonction ne nécessitant <strong>que</strong> les intensités mesurées (donc sans connaître la phase) :</p>
    <div class="formula-box">$$P(u,v,w) = \\dfrac{1}{V}\\sum_{h}\\sum_{k}\\sum_{l} |F(hkl)|^2\\, e^{-2\\pi i(hu+kv+lw)}$$</div>
    <p>Cette fonction de Patterson présente un pic à la position $(u,v,w)$ pour <strong>chaque vecteur interatomique</strong> du cristal (c'est-à-dire pour chaque paire d'atomes $i,j$, un pic apparaît au vecteur $\\vec{r_i} - \\vec{r_j}$), avec une hauteur proportionnelle au produit $Z_i \\times Z_j$ des numéros atomiques. Ceci rend la méthode particulièrement efficace pour localiser en premier les <strong>atomes lourds</strong> (dont les pics de Patterson dominent largement le signal), d'où le nom historique de <strong>« méthode de l'atome lourd »</strong> : une fois l'atome lourd localisé via la carte de Patterson, on peut approximer les phases manquantes à partir de sa seule contribution, et reconstruire progressivement le reste de la structure.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La carte de Patterson d'un cristal contenant $N$ atomes présente $N(N-1)$ pics non triviaux (en plus du pic géant à l'origine, où $u=v=w=0$ pour toutes les paires $i=i$) — elle devient rapidement illisible « à l'œil » pour des structures complexes (protéines...), ce qui a motivé le développement d'approches alternatives.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pour l'insuline de Hodgkin (plusieurs centaines d'atomes non-hydrogène), le nombre de pics de Patterson $N(N-1)$ atteint plusieurs centaines de milliers. Qu'est-ce que cet ordre de grandeur vous suggère sur la raison pour laquelle la méthode de l'atome lourd, à elle seule, ne suffit généralement pas pour une macromolécule ?
    </div>

    <h3>3. Les méthodes directes</h3>
    <p>Développées à partir des années 1950 par Jerome Karle et Herbert Hauptman (prix Nobel de chimie 1985), les <strong>méthodes directes</strong> exploitent des relations <strong>statistiques et probabilistes</strong> entre les phases de réflexions liées (les fameuses relations de Sayre, puis les formules statistiques $\\Sigma_1$ et $\\Sigma_2$), sans passer par la fonction de Patterson. En pratique, ces méthodes partent des réflexions de plus forte intensité, attribuent des phases initiales par des relations de probabilité élevée, puis propagent ces phases à l'ensemble du jeu de données par itérations successives. Elles sont aujourd'hui la méthode de choix pour la très grande majorité des petites molécules (structures « small-molecule »), largement automatisées dans les logiciels modernes (SHELXS/SHELXT, SIR, etc.).</p>

    <h3>4. Affinement de structure par moindres carrés</h3>
    <p>Une fois un <strong>modèle initial</strong> de structure obtenu (par Patterson ou méthodes directes), il faut l'<strong>affiner</strong> : ajuster les paramètres du modèle (coordonnées atomiques, paramètres de déplacement thermique, facteur d'échelle) pour minimiser l'écart entre les intensités <strong>calculées</strong> $F_c(hkl)$ (à partir du modèle) et les intensités <strong>observées</strong> $F_o(hkl)$ (mesurées expérimentalement). Cet affinement se fait par la méthode des moindres carrés, en minimisant une fonction du type :</p>
    <div class="formula-box">$$\\sum_{hkl} w_{hkl}\\left(|F_o(hkl)| - |F_c(hkl)|\\right)^2$$</div>
    <p>La qualité finale de l'affinement se mesure classiquement par le <strong>facteur de reliabilité (R-factor)</strong> :</p>
    <div class="formula-box">$$R = \\dfrac{\\sum \\left| |F_o| - |F_c| \\right|}{\\sum |F_o|}$$</div>
    <p>Une structure de petite molécule bien résolue affiche typiquement un R final inférieur à 5 % ; une structure de protéine (beaucoup plus complexe, données de résolution souvent limitée) se contente en général de valeurs comprises entre 15 et 25 %.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si un R-factor de 20 % est tout à fait acceptable pour une structure de protéine mais désastreux pour une petite molécule organique, qu'est-ce que cela vous apprend sur la signification de ce facteur : est-ce une mesure absolue de « vérité » de la structure, ou une mesure relative à la complexité et à la qualité des données disponibles ?
    </div>

    <h3>5. La méthode de Rietveld (affinement sur données de poudre)</h3>
    <p>Développée par Hugo Rietveld en 1969, cette méthode permet d'affiner un modèle structural directement à partir d'un <strong>diffractogramme de poudre complet</strong> (et non de réflexions individuelles isolées comme sur monocristal), en modélisant simultanément le <strong>profil</strong> de chaque pic (forme, largeur), le <strong>fond continu</strong> et les <strong>intensités</strong> calculées. C'est aujourd'hui l'outil de référence pour affiner des structures déjà connues (raffinement de paramètres de maille, taux d'occupation, quantification de phases dans un mélange) à partir de données de poudre, très utilisé en science des matériaux et en minéralogie.</p>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le « problème de la phase » : l'expérience ne donne accès qu'au module |F(hkl)|, jamais à sa phase, ce qui empêche un calcul direct de la densité électronique</li>
      <li>La fonction de Patterson P(u,v,w), calculable sans connaître les phases, présente un pic pour chaque vecteur interatomique — utile surtout pour localiser les atomes lourds</li>
      <li>Les méthodes directes (Karle et Hauptman, Nobel 1985) exploitent des relations statistiques entre phases, sans passer par Patterson</li>
      <li>L'affinement par moindres carrés ajuste le modèle pour minimiser l'écart entre F observé et F calculé, quantifié par le facteur R</li>
      <li>La méthode de Rietveld affine une structure directement à partir d'un diffractogramme de poudre complet</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que la densité électronique se calcule directement à partir des intensités mesurées — il manque la phase, information cruciale et non mesurable directement</li>
      <li>Confondre la fonction de Patterson (carte des vecteurs interatomiques) et la carte de densité électronique finale (positions atomiques réelles)</li>
      <li>Penser qu'un R-factor de 20 % est « mauvais » dans l'absolu — c'est une valeur tout à fait normale pour une structure de protéine, très mauvaise en revanche pour une petite molécule</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi appelle-t-on « problème de la phase » la principale difficulté de la résolution de structure ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr9e1" value="wrong">Parce que le cristal change de phase (solide-liquide) pendant l'expérience</label>
        <label class="option"><input type="radio" name="cr9e1" value="right">Parce que l'expérience ne mesure que le module de F(hkl), jamais sa phase, nécessaire pourtant au calcul de la densité électronique</label>
        <label class="option"><input type="radio" name="cr9e1" value="wrong">Parce que les rayons X changent de longueur d'onde pendant la diffraction</label>
        <label class="option"><input type="radio" name="cr9e1" value="wrong">Parce que le détecteur ne peut mesurer qu'une seule réflexion à la fois</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr9e1','cr9fb1','Correct — seule l\\'intensité (proportionnelle à |F|²) est mesurable ; la phase, indispensable pour la transformée de Fourier inverse donnant la densité électronique, est perdue.','Reviens à la formule de la densité électronique : de quelle information sur F(hkl) a-t-on besoin, en plus du module ?')">Vérifier</button>
      <div class="feedback" id="cr9fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">La fonction de Patterson est particulièrement efficace pour localiser en premier :</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr9e2" value="wrong">Les atomes d'hydrogène</label>
        <label class="option"><input type="radio" name="cr9e2" value="right">Les atomes lourds (numéro atomique Z élevé)</label>
        <label class="option"><input type="radio" name="cr9e2" value="wrong">Uniquement les atomes de carbone</label>
        <label class="option"><input type="radio" name="cr9e2" value="wrong">Les molécules de solvant désordonnées</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr9e2','cr9fb2','Correct — les pics de Patterson ont une hauteur proportionnelle à Zi × Zj : les paires impliquant un atome lourd dominent très largement la carte.','La hauteur d\\'un pic de Patterson dépend du produit des numéros atomiques des deux atomes concernés — quel type d\\'atome domine alors ce produit ?')">Vérifier</button>
      <div class="feedback" id="cr9fb2"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 3</span>
      <p class="q">Que minimise l'affinement d'une structure par moindres carrés ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr9e3" value="wrong">Le nombre d'atomes du motif</label>
        <label class="option"><input type="radio" name="cr9e3" value="right">L'écart pondéré entre les modules de F observés et de F calculés à partir du modèle</label>
        <label class="option"><input type="radio" name="cr9e3" value="wrong">La longueur d'onde du rayonnement utilisé</label>
        <label class="option"><input type="radio" name="cr9e3" value="wrong">Le temps de collecte des données</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr9e3','cr9fb3','Correct — l\\'affinement ajuste les paramètres du modèle pour minimiser Σw(|Fo|−|Fc|)², quantifié ensuite par le facteur R.','Relis la formule de la fonction minimisée par moindres carrés : elle compare deux grandeurs liées au facteur de structure.')">Vérifier</button>
      <div class="feedback" id="cr9fb3"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>Depuis 2020, les modèles de prédiction de structure par intelligence artificielle (AlphaFold et ses successeurs) fournissent des modèles moléculaires suffisamment précis pour servir directement de <strong>modèles de départ en remplacement moléculaire</strong>, contournant dans de nombreux cas le besoin de dérivés à atomes lourds ou de méthodes directes qu'a dû affronter Hodgkin pendant trente ans pour l'insuline. Une question de recherche ouverte reste la fiabilité de cette approche pour des protéines dont le repliement est totalement inédit, absent des données d'entraînement de ces modèles.</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Intensités $I(hkl)$ mesurées → module $|F(hkl)|$ connu, phase inconnue (<strong>problème de la phase</strong>) → estimation initiale des phases par <strong>fonction de Patterson</strong> (atomes lourds) ou <strong>méthodes directes</strong> (relations statistiques) → modèle structural initial → <strong>affinement par moindres carrés</strong> (ou méthode de Rietveld sur poudre) → comparaison $F_o$ / $F_c$ → structure finale validée par le facteur R</p>
    <p><strong>Équation maîtresse du chapitre :</strong></p>
    <div class="formula-box">$$R = \\dfrac{\\sum \\big||F_o|-|F_c|\\big|}{\\sum |F_o|}$$</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Hodgkin avait eu accès, dès 1934, à des méthodes directes automatisées ou à un modèle d'intelligence artificielle prédisant la structure de l'insuline — sa contribution scientifique en aurait-elle été amoindrie pour autant ?</li>
      <li>Pourquoi un facteur R proche de zéro ne garantit-il pas, à lui seul, qu'un modèle structural est chimiquement correct (composition, liaisons, stéréochimie) ?</li>
      <li>Quelle serait la conséquence, sur la fiabilité d'une structure obtenue par méthode de Rietveld, d'un mauvais modèle de profil de pic (forme, largeur) alors même que les positions atomiques du modèle seraient correctes ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>D. Crowfoot Hodgkin et al., <em>Structure of Rhombohedral 2 Zinc Insulin Crystals</em>, Nature, 1969 — l'aboutissement de trente années de travail sur la structure de l'insuline.</li>
      <li>A.L. Patterson, <em>A Fourier Series Method for the Determination of the Components of Interatomic Distances in Crystals</em>, Physical Review, 1934 — l'article fondateur de la fonction qui porte son nom.</li>
      <li>C. Giacovazzo (dir.), <em>Fundamentals of Crystallography</em>, Oxford University Press — référence standard de niveau L3/master, en particulier pour les chapitres sur les méthodes de résolution de phase.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous savez désormais transformer des intensités mesurées en positions atomiques, là où Hodgkin a dû batailler trente ans pour l'insuline. Il ne reste plus qu'à appliquer tout cet arsenal à un cas concret et particulièrement riche : direction le dernier chapitre de cette matière, avec la cristallochimie des solides inorganiques.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("Résolution et affinement des structures cristallines")] = {
  intro: "Salut, moi c'est Nova ! On attaque la résolution de structure : problème de la phase, Patterson, méthodes directes, affinement. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/probl[èe]me de la phase|phase problem/i, replies:[
      "Le problème de la phase : l'expérience ne mesure que |F(hkl)| (via l'intensité), jamais la phase de F, pourtant indispensable pour calculer directement la densité électronique par transformée de Fourier inverse."
    ]},
    { test:/patterson/i, replies:[
      "La fonction de Patterson se calcule uniquement à partir des intensités mesurées (sans phase) et présente un pic pour chaque vecteur interatomique, avec une hauteur proportionnelle à Zi×Zj — d'où son efficacité pour localiser les atomes lourds."
    ]},
    { test:/m[ée]thodes directes|karle|hauptman/i, replies:[
      "Les méthodes directes (Karle et Hauptman, Nobel de chimie 1985) utilisent des relations statistiques entre les phases de réflexions liées, sans passer par la fonction de Patterson — méthode de choix aujourd'hui pour les petites molécules."
    ]},
    { test:/affinement|moindres carr[ée]s|r.factor|facteur r/i, replies:[
      "L'affinement par moindres carrés ajuste les paramètres du modèle (positions atomiques, agitation thermique...) pour minimiser l'écart entre Fo (observé) et Fc (calculé). La qualité finale se mesure par le facteur R = Σ||Fo|−|Fc|| / Σ|Fo|."
    ]},
    { test:/rietveld/i, replies:[
      "La méthode de Rietveld affine une structure directement à partir d'un diffractogramme de poudre complet (profil, fond continu et intensités simultanément), plutôt que réflexion par réflexion comme sur monocristal."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la formule de la densité électronique, qui a besoin de F(hkl) complet (module ET phase).",
      "Indice niveau 2 : seul le module de F est accessible expérimentalement (via l'intensité).",
      "Indice niveau 3 : la phase manque donc pour calculer directement la densité électronique — c'est le problème de la phase."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la formule de la hauteur d'un pic de Patterson (proportionnelle à Zi×Zj).",
      "Indice niveau 2 : un produit de numéros atomiques est dominé par le plus grand des deux Z.",
      "Indice niveau 3 : ce sont donc les atomes lourds qui dominent la carte de Patterson."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : relis la formule Σw(|Fo|−|Fc|)² minimisée par l'affinement.",
      "Indice niveau 2 : elle compare deux modules de facteur de structure.",
      "Indice niveau 3 : c'est bien l'écart pondéré entre F observé et F calculé qui est minimisé."
    ]}
  ]
};

/* =========================== CHAPITRE 10 =========================== */
CRISTALLO_CHAPTERS[cristKey("Cristallochimie des solides inorganiques : empilements compacts et sites interstitiels")] = {
  objectives: [
    "Construire les empilements compacts hexagonal (HC) et cubique à faces centrées (CFC) et calculer leur compacité",
    "Dénombrer et localiser les sites interstitiels octaédriques et tétraédriques d'un empilement compact",
    "Utiliser le rapport des rayons ioniques pour prévoir la coordinence dans un solide ionique (règles de Pauling)",
    "Décrire les structures types courantes (NaCl, CsCl, blende, fluorine, pérovskite) et leur relation avec les empilements compacts",
    "Apprécier pourquoi la conjecture de Kepler sur l'empilement optimal de sphères (1611), pourtant intuitivement évidente, a nécessité près de quatre siècles pour être rigoureusement démontrée (Hales, 1998-2014)"
  ],
  prereqs: ["L'état cristallin : ordre, réseau et maille élémentaire", "Symétrie cristalline : éléments, opérations et réseaux de Bravais"],
  bodyHtml: `
    <p>En 1611, l'astronome allemand <strong>Johannes Kepler</strong> conjecture, dans un court traité sur les cristaux de neige, que l'empilement le plus compact possible de sphères identiques est celui que suivent naturellement les boulets de canon empilés en pyramide — une compacité de 74,05 %, jamais dépassée. Il faudra attendre près de <strong>quatre siècles</strong>, jusqu'en 1998, pour que le mathématicien Thomas Hales en propose une démonstration rigoureuse (à l'aide de calculs informatiques massifs, formellement vérifiée seulement en 2014) : la conjecture de Kepler est enfin devenue un théorème.</p>

    <p>Ce résultat n'est pas qu'une curiosité géométrique : il explique directement pourquoi la nature « choisit » si souvent, pour les métaux et les solides ioniques simples, l'un des deux empilements compacts détaillés dans ce chapitre — hexagonal ou cubique à faces centrées.</p>

    <p>Ce dernier chapitre applique les outils de cristallographie géométrique (chapitres 1-4) à la <strong>cristallochimie</strong> proprement dite : comment les atomes et les ions s'organisent-ils réellement dans les solides, et pourquoi certaines structures sont-elles privilégiées par la nature ?</p>

    <h3>1. Empilements compacts de sphères identiques</h3>
    <p>De nombreux métaux et solides simples peuvent être décrits, en première approximation, comme des <strong>empilements de sphères dures identiques</strong>, cherchant à occuper l'espace le plus efficacement possible. Il existe deux façons d'empiler des couches compactes de sphères en respectant la compacité maximale : en alternant les couches selon la séquence <strong>ABAB...</strong> (empilement <strong>hexagonal compact</strong>, HC) ou selon la séquence <strong>ABCABC...</strong> (empilement <strong>cubique compact</strong>, identique à un réseau <strong>cubique à faces centrées</strong>, CFC). Les deux empilements atteignent exactement la même compacité maximale théorique :</p>
    <div class="formula-box">$$\\tau = \\dfrac{\\pi}{3\\sqrt{2}} \\approx 0{,}7405 \\ \\text{soit } 74{,}05\\%$$</div>
    <p>C'est la compacité maximale démontrée pour un empilement de sphères identiques (conjecture de Kepler, énoncée en 1611 et prouvée rigoureusement seulement en 1998-2005 par T. Hales). À titre de comparaison, l'empilement <strong>cubique centré</strong> (I), moins compact, atteint seulement $\\tau = \\pi\\sqrt{3}/8 \\approx 68{,}02\\%$, et l'empilement <strong>cubique simple</strong> (P) seulement $\\tau = \\pi/6 \\approx 52{,}36\\%$.</p>

    <table class="mini-table">
      <tr><th>Structure</th><th>Séquence d'empilement</th><th>Compacité τ</th><th>Coordinence</th></tr>
      <tr><td>Hexagonal compact (HC)</td><td>ABAB...</td><td>74,05 %</td><td>12</td></tr>
      <tr><td>Cubique à faces centrées (CFC)</td><td>ABCABC...</td><td>74,05 %</td><td>12</td></tr>
      <tr><td>Cubique centré (CC)</td><td>—</td><td>68,02 %</td><td>8</td></tr>
      <tr><td>Cubique simple</td><td>—</td><td>52,36 %</td><td>6</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Dans les deux empilements compacts (HC et CFC), chaque sphère est entourée de <strong>12 plus proches voisines</strong> (coordinence 12) : 6 dans sa propre couche, 3 dans la couche du dessus, 3 dans la couche du dessous. La différence entre HC et CFC ne se situe qu'à partir de la <em>troisième</em> couche (répétition de A ou nouvelle position C).
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Si HC et CFC partagent exactement la même compacité (74,05 %) et la même coordinence (12), et ne diffèrent qu'à partir de la troisième couche empilée, qu'est-ce que cela vous suggère sur la difficulté qu'a dû représenter, historiquement, la démonstration rigoureuse du caractère optimal de cette compacité par Kepler puis Hales ?
    </div>

    <h3>2. Sites interstitiels : octaédriques et tétraédriques</h3>
    <p>Même dans un empilement compact, il subsiste des espaces vides entre les sphères — les <strong>sites interstitiels</strong>, qui peuvent accueillir de petits atomes ou ions supplémentaires (formant alors un solide de type ionique ou un composé d'insertion). On distingue deux types de sites, selon le nombre de sphères qui les délimitent :</p>
    <table class="mini-table">
      <tr><th>Type de site</th><th>Sphères voisines</th><th>Nombre par maille (CFC, 4 sphères)</th><th>Rayon maximal r/R</th></tr>
      <tr><td>Site octaédrique</td><td>6 sphères (sommets d'un octaèdre)</td><td>4 sites (autant que de sphères)</td><td>0,414</td></tr>
      <tr><td>Site tétraédrique</td><td>4 sphères (sommets d'un tétraèdre)</td><td>8 sites (deux fois plus que de sphères)</td><td>0,225</td></tr>
    </table>
    <p>Le <strong>rayon maximal</strong> $r/R$ correspond à la taille maximale d'une petite sphère invitée (rayon $r$) pouvant se loger exactement dans le site sans écarter les grandes sphères de l'empilement (rayon $R$) — c'est une donnée essentielle pour prévoir quelle structure ionique adoptera un composé donné (voir règles de Pauling ci-dessous).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Dans une maille CFC (4 sphères par maille), combien de sites octaédriques et tétraédriques contient la maille, et où se situent-ils ?</p>
      <p><strong>Solution :</strong> Une maille CFC contient exactement 4 sites octaédriques (1 au centre du cube, 12 sur les arêtes partagées chacune à 1/4, soit 12×1/4 = 3 ; total 1+3 = 4) et 8 sites tétraédriques (situés entièrement à l'intérieur de la maille, aux positions (1/4,1/4,1/4) et équivalentes).</p>
      <p class="example-answer">Réponse : 4 sites octaédriques et 8 sites tétraédriques par maille CFC — soit deux fois plus de sites tétraédriques que d'atomes, et autant de sites octaédriques que d'atomes.</p>
    </div>

    <h3>3. Rayons ioniques et règles de Pauling</h3>
    <p>Dans un solide <strong>ionique</strong>, on modélise souvent la structure comme un empilement compact des <strong>plus gros ions</strong> (généralement les anions), les <strong>cations</strong>, plus petits, occupant tout ou partie des sites interstitiels. La <strong>première règle de Pauling</strong> relie le rapport des rayons ioniques $r_{cation}/r_{anion}$ à la coordinence géométriquement stable (contact cation-anion maximisé, sans que les anions ne se chevauchent) :</p>
    <table class="mini-table">
      <tr><th>Rapport $r_+/r_-$</th><th>Coordinence stable</th><th>Géométrie du site</th></tr>
      <tr><td>0,225 – 0,414</td><td>4</td><td>Tétraédrique</td></tr>
      <tr><td>0,414 – 0,732</td><td>6</td><td>Octaédrique</td></tr>
      <tr><td>0,732 – 1,000</td><td>8</td><td>Cubique</td></tr>
    </table>
    <p>Cette règle, bien qu'approximative (elle néglige le caractère partiellement covalent de nombreuses liaisons), reste un excellent outil de prédiction qualitative de la structure adoptée par un composé ionique simple de type $MX$.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les règles de Pauling reposent sur un modèle purement géométrique de sphères dures en contact. Pour quel type de composé chimique vous attendez-vous à ce que ce modèle échoue le plus nettement à prédire la coordinence réellement observée ?
    </div>

    <h3>4. Quelques structures types classiques</h3>
    <p>De nombreux solides ioniques ou covalents importants se décrivent élégamment à partir des empilements compacts et de leurs sites :</p>
    <table class="mini-table">
      <tr><th>Structure type</th><th>Description</th><th>Exemples</th></tr>
      <tr><td>NaCl (sel gemme)</td><td>Anions en CFC, cations occupant <strong>tous</strong> les sites octaédriques</td><td>NaCl, MgO, la plupart des oxydes/halogénures MX de coordinence 6</td></tr>
      <tr><td>Blende (ZnS cubique)</td><td>Anions en CFC, cations occupant <strong>la moitié</strong> des sites tétraédriques</td><td>ZnS, CdS, de nombreux semi-conducteurs III-V</td></tr>
      <tr><td>Fluorine (CaF₂)</td><td>Cations en CFC, anions occupant <strong>tous</strong> les sites tétraédriques</td><td>CaF₂, UO₂, ZrO₂</td></tr>
      <tr><td>CsCl</td><td>Réseau cubique simple d'anions, cation au centre de chaque cube (coordinence 8)</td><td>CsCl, CsBr, NH₄Cl (à haute température)</td></tr>
      <tr><td>Pérovskite (ABX₃)</td><td>Structure cubique idéale : cation A aux sommets, cation B au centre, anions X aux centres des faces</td><td>CaTiO₃, BaTiO₃, SrTiO₃, matériaux ferroélectriques et supraconducteurs à haute Tc</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — boucler la boucle du cours</span>
      C'est précisément la <strong>radiocristallographie</strong> (chapitres 5 à 9) qui a permis de déterminer expérimentalement toutes ces structures types au cours du XXe siècle — à commencer par la toute première structure résolue par diffraction des rayons X, celle de la <strong>blende (ZnS)</strong> en 1913 par W.L. Bragg, rapidement suivie de celle de NaCl la même année. Ce dernier chapitre illustre ainsi la finalité même de la cristallochimie-radiocristallographie : relier la théorie de la diffraction à la compréhension fine de la structure réelle de la matière.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Les empilements compacts HC (ABAB...) et CFC (ABCABC...) atteignent tous deux la compacité maximale de 74,05 %, avec une coordinence de 12</li>
      <li>Une maille CFC contient 4 sites octaédriques (rayon max r/R = 0,414) et 8 sites tétraédriques (rayon max r/R = 0,225)</li>
      <li>Les règles de Pauling relient le rapport des rayons ioniques r+/r− à la coordinence stable (4, 6 ou 8)</li>
      <li>Structures types classiques : NaCl (octaédrique, tous les sites occupés), blende (tétraédrique, moitié des sites), fluorine (tétraédrique, tous les sites, cations en CFC), CsCl (coordinence 8), pérovskite ABX₃</li>
      <li>La radiocristallographie a permis, dès 1913, de déterminer expérimentalement ces structures — bouclant la boucle entre théorie de la diffraction et cristallochimie du solide</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que HC et CFC ont des compacités différentes — elles sont rigoureusement identiques (74,05 %), seule la séquence d'empilement diffère</li>
      <li>Confondre le nombre de sites octaédriques (= nombre de sphères) et tétraédriques (= 2 × nombre de sphères) par maille</li>
      <li>Appliquer les règles de Pauling sans esprit critique aux composés à liaison fortement covalente, où elles sont moins fiables</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quelle est la coordinence des sphères dans un empilement compact (HC ou CFC) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr10e1" value="wrong">6</label>
        <label class="option"><input type="radio" name="cr10e1" value="wrong">8</label>
        <label class="option"><input type="radio" name="cr10e1" value="right">12</label>
        <label class="option"><input type="radio" name="cr10e1" value="wrong">4</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr10e1','cr10fb1','Correct — chaque sphère a 12 plus proches voisines dans un empilement compact (6 dans sa couche, 3 au-dessus, 3 en dessous).','Compte les voisins dans la même couche (6), puis dans la couche du dessus et celle du dessous (3 chacune).')">Vérifier</button>
      <div class="feedback" id="cr10fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un composé ionique MX présente un rapport de rayons r+/r− = 0,55. Quelle coordinence est prédite par les règles de Pauling ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr10e2" value="wrong">4 (tétraédrique)</label>
        <label class="option"><input type="radio" name="cr10e2" value="right">6 (octaédrique)</label>
        <label class="option"><input type="radio" name="cr10e2" value="wrong">8 (cubique)</label>
        <label class="option"><input type="radio" name="cr10e2" value="wrong">12</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr10e2','cr10fb2','Correct — 0,55 se situe dans l\\'intervalle 0,414–0,732, correspondant à une coordinence octaédrique (6), comme dans NaCl.','Situe 0,55 dans le tableau des règles de Pauling : entre quelles bornes se trouve cette valeur ?')">Vérifier</button>
      <div class="feedback" id="cr10fb2"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 3</span>
      <p class="q">Dans la structure blende (ZnS), les cations Zn²⁺ occupent :</p>
      <div class="options">
        <label class="option"><input type="radio" name="cr10e3" value="wrong">Tous les sites octaédriques</label>
        <label class="option"><input type="radio" name="cr10e3" value="right">La moitié des sites tétraédriques</label>
        <label class="option"><input type="radio" name="cr10e3" value="wrong">Tous les sites tétraédriques</label>
        <label class="option"><input type="radio" name="cr10e3" value="wrong">Le centre du cube uniquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('cr10e3','cr10fb3','Correct — dans la structure blende, les anions S²⁻ forment un CFC et les cations Zn²⁺ occupent la moitié des sites tétraédriques (coordinence 4).','Relis le tableau des structures types : la blende se distingue de la fluorine par la fraction de sites tétraédriques occupés.')">Vérifier</button>
      <div class="feedback" id="cr10fb3"></div>
    </div>
  </div>

  <div class="frontier-box">
    <span class="eyebrow">🔭 Frontière de la recherche</span>
    <p>Sous des pressions extrêmes (plusieurs millions d'atmosphères, obtenues en cellule à enclumes de diamant et sondées par diffraction des rayons X synchrotron), des éléments aussi simples que le sodium métallique adoptent des structures totalement inattendues — le sodium devient ainsi, au-delà de 200 GPa, un isolant transparent, sa structure cristalline se réorganisant en dehors de tout empilement compact classique. Ces conditions extrêmes, proches de celles régnant au cœur des planètes géantes, restent une frontière de recherche active : quelles structures encore inconnues la matière adopte-t-elle sous des pressions que l'on ne peut reproduire, pour l'instant, que quelques microsecondes en laboratoire ?</p>
  </div>

  <div class="key-point">
    <span class="eyebrow">📐 Synthèse visuelle</span>
    <p>Sphères dures identiques → empilement de couches compactes → séquence ABAB (HC) ou ABCABC (CFC) → <strong>compacité maximale</strong> 74,05 % (théorème de Kepler-Hales) → sites interstitiels (octaédriques r/R = 0,414 ; tétraédriques r/R = 0,225) → <strong>règles de Pauling</strong> (rapport des rayons ioniques → coordinence) → <strong>structures types</strong> (NaCl, blende, fluorine, CsCl, pérovskite) → confirmées expérimentalement dès 1913 par la radiocristallographie (chapitres 5 à 9)</p>
    <p><strong>Résultat central du chapitre :</strong></p>
    <div class="formula-box">$$\\tau_{max} = \\dfrac{\\pi}{3\\sqrt{2}} \\approx 74{,}05\\% \\quad \\text{(théorème de Kepler-Hales)}$$</div>
  </div>

  <div class="reflection-box">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si les atomes n'étaient pas des sphères dures parfaites mais des nuages électroniques déformables — le raisonnement géométrique de ce chapitre resterait-il pertinent, ou faudrait-il le considérer comme une approximation commode plutôt qu'une réalité physique ?</li>
      <li>Pourquoi a-t-il fallu attendre près de quatre siècles entre la conjecture de Kepler (1611) et sa démonstration rigoureuse par Hales, alors que le résultat lui-même semblait déjà évident aux marchands empilant des boulets de canon ?</li>
      <li>Quelle serait la conséquence, pour la prévision de la structure d'un nouveau composé ionique MX, d'un rapport de rayons ioniques tombant exactement à la frontière entre deux domaines de coordinence des règles de Pauling (par exemple 0,414) ?</li>
    </ul>
  </div>

  <div class="biblio-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>J. Kepler, <em>Strena seu de Nive Sexangula</em> (Étrennes ou De la neige sexangulaire), 1611 — le court traité contenant la conjecture sur l'empilement optimal des sphères.</li>
      <li>T.C. Hales, <em>A Proof of the Kepler Conjecture</em>, Annals of Mathematics, 2005 (démonstration formellement vérifiée par le projet Flyspeck en 2014).</li>
      <li>A.R. West, <em>Solid State Chemistry and its Applications</em>, Wiley — référence standard de niveau L3/master pour la cristallochimie des solides inorganiques.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Vous voilà arrivé au bout de cette matière de Cristallochimie — radiocristallographie : des 14 réseaux de Bravais démontrés par un raisonnement pur en 1848, jusqu'aux structures ioniques concrètes que la diffraction permet de résoudre atome par atome. Comme la compacité de 74,05 % conjecturée par Kepler et prouvée quatre siècles plus tard par Hales, la solidité de ce que vous avez appris ici tient à la rigueur géométrique qui le sous-tend : elle ne demande qu'à être mise à l'épreuve dans la matière suivante.</p>
  `
};
CRISTALLO_NOVA_KB[cristKey("Cristallochimie des solides inorganiques : empilements compacts et sites interstitiels")] = {
  intro: "Salut, moi c'est Nova ! On termine avec la cristallochimie des solides inorganiques : empilements compacts, sites interstitiels, règles de Pauling. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/compacit[ée]|74|empilement compact/i, replies:[
      "Les empilements HC (ABAB...) et CFC (ABCABC...) ont exactement la même compacité maximale : τ = π/(3√2) ≈ 74,05 %. Seule la séquence d'empilement des couches diffère."
    ]},
    { test:/site oct[aé]|site t[ée]tra[aé]/i, replies:[
      "Dans une maille CFC : 4 sites octaédriques (rayon max r/R = 0,414, coordinence 6) et 8 sites tétraédriques (rayon max r/R = 0,225, coordinence 4)."
    ]},
    { test:/pauling|rapport.*rayon/i, replies:[
      "Les règles de Pauling : r+/r− entre 0,225 et 0,414 → coordinence 4 ; entre 0,414 et 0,732 → coordinence 6 ; entre 0,732 et 1 → coordinence 8."
    ]},
    { test:/nacl|blende|fluorine|csci|perovskite|p[ée]rovskite/i, replies:[
      "NaCl : cations dans tous les sites octaédriques d'un CFC d'anions. Blende : cations dans la moitié des sites tétraédriques. Fluorine : anions dans tous les sites tétraédriques (cations en CFC). CsCl : coordinence 8, réseau cubique simple."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : compte les voisins dans la même couche, puis dans les couches adjacentes.",
      "Indice niveau 2 : 6 voisins dans la même couche, plus 3 au-dessus et 3 en dessous.",
      "Indice niveau 3 : total 6+3+3 = 12."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : situe 0,55 dans le tableau des règles de Pauling.",
      "Indice niveau 2 : 0,55 est compris entre 0,414 et 0,732.",
      "Indice niveau 3 : cet intervalle correspond à une coordinence 6 (octaédrique)."
    ]},
    { test:/exercice\s*3/i, hint:true, replies:[
      "Pour l'exercice 3 : distingue bien blende et fluorine dans le tableau des structures types.",
      "Indice niveau 2 : dans la blende, ce sont les sites tétraédriques qui sont occupés, pas les octaédriques.",
      "Indice niveau 3 : seulement la moitié de ces sites tétraédriques est occupée (coordinence 4)."
    ]}
  ]
};

/* fusionne le module Cristallochimie — radiocristallographie dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CRISTALLO_CHAPTERS);
Object.assign(NOVA_KB, CRISTALLO_NOVA_KB);