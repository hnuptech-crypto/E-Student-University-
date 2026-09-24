/* =====================================================================
   CHUNK « stereo » — registre STEREO_CHAPTERS / STEREO_NOVA_KB
   Matière(s) : Chimie|Chimie organique spatiale
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   STEREO_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — CHIMIE ORGANIQUE SPATIALE / STÉRÉOCHIMIE (L1, domaine Chimie)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : représentations spatiales (Cram, Newman, Fischer), chiralité et
   énantiomérie, molécules polystéréogéniques (diastéréoisomères, composés méso),
   activité optique, analyse conformationnelle (éthane, butane, cyclohexane),
   stéréochimie des alcènes (Z/E), lien entre stéréochimie et réactivité —
   conforme aux maquettes LMD de chimie organique spatiale en L1. Ce cours prolonge
   directement le cours "Chimie organique générale" (nomenclature, groupes
   fonctionnels, effets électroniques) en y ajoutant la dimension tridimensionnelle
   des molécules, indispensable pour aborder ensuite la réactivité stéréosélective
   étudiée en L2-L3. Références de fond : P. Arnaud, Chimie organique (Dunod) ;
   J. Clayden, N. Greeves & S. Warren, Organic Chemistry (Oxford University Press) ;
   J. McMurry, Chimie organique (De Boeck).
===================================================================================== */
const STEREO_MATIERE = 'Chimie organique spatiale';
function steKey(chapterTitle){ return `Chimie|${STEREO_MATIERE}|${chapterTitle}`; }
const STEREO_CHAPTERS = {};
const STEREO_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Attribution assistée de la configuration R/S (chapitre 2)
--------------------------------------------------------------------------------- */
function updateRSHelper(){
  const p1 = document.getElementById('rsP1').value || 'F';
  const p2 = document.getElementById('rsP2').value || 'OH';
  const p3 = document.getElementById('rsP3').value || 'CH3';
  const p4 = document.getElementById('rsP4').value || 'H';
  const out = document.getElementById('rsReadout');
  out.innerHTML = `Rappel de méthode :<br>
    1) Classe les 4 substituants (${p1}, ${p2}, ${p3}, ${p4}) par priorité décroissante selon les règles de Cahn-Ingold-Prelog (numéro atomique de l'atome directement lié, puis atomes suivants en cas d'égalité).<br>
    2) Place le substituant de plus faible priorité à l'arrière (loin de l'observateur).<br>
    3) Regarde le sens de parcours 1→2→3 des trois substituants restants : sens horaire = <strong>R</strong> (rectus), sens antihoraire = <strong>S</strong> (sinister).`;
}

/* =========================== CHAPITRE 1 =========================== */
STEREO_CHAPTERS[steKey("Représentations spatiales des molécules : Cram, Newman et Fischer")] = {
  objectives: [
    "Construire et interpréter une représentation de Cram",
    "Construire et interpréter une projection de Newman",
    "Construire et interpréter une projection de Fischer",
    "Convertir une même molécule d'une représentation à une autre",
    "Évaluer pourquoi Emil Fischer a choisi une convention de représentation aussi contre-intuitive (horizontal = vers l'avant) plutôt qu'une perspective plus naturelle comme celle de Cram"
  ],
  prereqs: ["Chimie organique générale (nomenclature et groupes fonctionnels)"],
  bodyHtml: `
    <p>À la fin du XIXe siècle, Emil Fischer se lance dans l'un des projets les plus ambitieux de toute la chimie organique naissante : déterminer, sans jamais pouvoir « voir » directement une molécule (les techniques de cristallographie aux rayons X n'existeront que plusieurs décennies plus tard), la configuration spatiale exacte du glucose et des seize stéréoisomères possibles des sucres à six carbones. Pour mener à bien ce travail titanesque, purement déductif à partir de réactions chimiques et de mesures de pouvoir rotatoire, il invente une convention de représentation en croix qui porte aujourd'hui son nom — un système si efficace qu'il reste, plus d'un siècle plus tard, l'outil de référence pour représenter les sucres et les acides aminés dans chaque manuel de biochimie du monde.</p>
    <p>Ce travail de titan, réalisé sans jamais observer directement une seule molécule, vaudra à Fischer le prix Nobel de chimie dès 1902 — l'une des toutes premières attributions de ce prix, témoignant de l'importance immédiatement reconnue de ses travaux. Ce chapitre te propose de maîtriser les trois grandes conventions de représentation spatiale qui, aujourd'hui encore, permettent à tout chimiste de communiquer sans ambiguïté la géométrie tridimensionnelle d'une molécule sur une simple feuille de papier en deux dimensions.</p>
    <p>La chimie organique générale a introduit les molécules par leur formule développée, plane par nature. Or les molécules organiques sont des objets <strong>tridimensionnels</strong> : le carbone tétraédrique (hybridation sp³) impose une géométrie précise dans l'espace, dont dépendent des propriétés physiques, chimiques et biologiques essentielles. Ce chapitre présente les trois grandes conventions utilisées pour représenter cette réalité spatiale sur une feuille de papier, en deux dimensions. À la fin de ce chapitre, tu sauras convertir une même molécule d'une représentation à l'autre sans jamais perdre son information stéréochimique.</p>

    <h3>1. La représentation de Cram</h3>
    <p>La représentation de <strong>Cram</strong> (du nom du chimiste Donald J. Cram) figure directement la géométrie tétraédrique d'un atome de carbone à l'aide de trois types de traits :</p>
    <table class="mini-table">
      <tr><th>Type de trait</th><th>Signification</th></tr>
      <tr><td>Trait plein simple —</td><td>Liaison dans le plan de la feuille</td></tr>
      <tr><td>Triangle plein (cunéiforme) ▲</td><td>Liaison qui pointe vers l'avant, vers l'observateur</td></tr>
      <tr><td>Triangle hachuré (pointillés) ▨</td><td>Liaison qui pointe vers l'arrière, derrière la feuille</td></tr>
    </table>
    <p>C'est la représentation la plus intuitive et la plus utilisée en pratique pour communiquer sans ambiguïté la configuration spatiale d'un centre stéréogène (chapitre 2) : elle donne une image directement lisible de la géométrie réelle de la molécule.</p>

    <h3>2. La projection de Newman</h3>
    <p>La <strong>projection de Newman</strong> est spécifiquement conçue pour étudier la rotation autour d'une liaison simple (analyse conformationnelle, chapitres 5-6). On regarde la molécule exactement dans l'axe de la liaison étudiée :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>L'atome de devant (le plus proche de l'observateur) est représenté par un <strong>point</strong>, avec ses trois autres liaisons dessinées comme des traits partant de ce point (à 120° les uns des autres)</li>
      <li>L'atome de derrière est représenté par un <strong>cercle</strong>, avec ses trois autres liaisons partant du bord du cercle</li>
    </ul>
    <p>L'angle entre une liaison de l'atome avant et la liaison correspondante de l'atome arrière est l'<strong>angle dièdre</strong> (ou angle de torsion) — la grandeur centrale de toute l'analyse conformationnelle.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 140 100" width="100%">
          <circle cx="70" cy="50" r="28" fill="none" stroke="#5A6472" stroke-width="1.4"/>
          <circle cx="70" cy="50" r="3" fill="#4C7CFF"/>
          <line x1="70" y1="50" x2="70" y2="14" stroke="#4C7CFF" stroke-width="1.6"/>
          <line x1="70" y1="50" x2="101" y2="68" stroke="#4C7CFF" stroke-width="1.6"/>
          <line x1="70" y1="50" x2="39" y2="68" stroke="#4C7CFF" stroke-width="1.6"/>
          <line x1="70" y1="22" x2="70" y2="8" stroke="#F0B94D" stroke-width="1.6"/>
          <line x1="93" y1="64" x2="107" y2="72" stroke="#F0B94D" stroke-width="1.6"/>
          <line x1="47" y1="64" x2="33" y2="72" stroke="#F0B94D" stroke-width="1.6"/>
        </svg>
        <span>Projection de Newman (conformation décalée)</span>
      </div>
    </div>

    <h3>3. La projection de Fischer</h3>
    <p>La <strong>projection de Fischer</strong>, historiquement développée par Emil Fischer pour représenter les sucres, suit une convention stricte : la molécule est dessinée sous forme d'une croix, où</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>les traits <strong>horizontaux</strong> représentent des liaisons pointant <strong>vers l'observateur</strong> (en avant du plan)</li>
      <li>les traits <strong>verticaux</strong> représentent des liaisons pointant <strong>vers l'arrière</strong> (derrière le plan)</li>
      <li>la chaîne carbonée principale est placée verticalement, avec le carbone le plus oxydé (souvent un groupe carbonyle ou carboxyle) en haut par convention</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Point clé — une convention à respecter scrupuleusement</span>
      La projection de Fischer n'a de sens que si l'on respecte <strong>rigoureusement</strong> sa convention (horizontal = vers l'avant, vertical = vers l'arrière) : contrairement à une simple formule plane, on ne peut pas faire pivoter librement une projection de Fischer dans le plan de la feuille (une rotation de 90° en inverserait le sens stéréochimique !). Seule une rotation de 180° dans le plan, ou une permutation circulaire des quatre substituants, préserve la configuration représentée — toute autre manipulation risque d'inverser silencieusement la stéréochimie.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi la projection de Fischer est-elle particulièrement adaptée aux sucres (polyols à chaîne longue avec plusieurs centres stéréogènes), alors que la représentation de Cram est préférée pour une petite molécule à un seul centre stéréogène ?</p>
      <p><strong>Solution :</strong> Pour une molécule à <strong>plusieurs</strong> centres stéréogènes alignés le long d'une chaîne (comme le glucose, 4 centres stéréogènes), la projection de Fischer permet de représenter <strong>simultanément et lisiblement</strong> tous ces centres le long d'un même axe vertical, chaque centre étant associé à une simple paire de traits horizontaux. La représentation de Cram, bien que plus intuitive géométriquement, deviendrait vite illisible avec autant de centres stéréogènes à représenter simultanément en perspective.</p>
      <p class="example-answer">Réponse : la projection de Fischer excelle pour comparer rapidement plusieurs centres stéréogènes alignés (sucres, acides aminés), tandis que Cram reste préférable pour visualiser la géométrie réelle d'un centre isolé.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La convention de Fischer (horizontal = vers l'avant, vertical = vers l'arrière) n'a rien d'intuitif à première vue, contrairement à la perspective plus naturelle de Cram. Pourquoi une convention aussi arbitraire a-t-elle malgré tout été universellement adoptée et conservée pendant plus d'un siècle, plutôt que d'être remplacée par une représentation plus « naturelle » ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>Les conventions de représentation moléculaire élaborées par Fischer, Newman et Cram continuent d'évoluer à l'ère numérique : les logiciels de modélisation moléculaire modernes génèrent aujourd'hui des représentations tridimensionnelles interactives et animées, permettant de faire pivoter virtuellement une molécule sous tous les angles — un luxe que Fischer, contraint de déduire la structure du glucose sans jamais la voir, n'aurait jamais pu imaginer. Ces outils numériques, combinés à des bases de données structurales de plusieurs millions de molécules, sont aujourd'hui indispensables à la conception rationnelle de nouveaux médicaments.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des interfaces de réalité virtuelle ou augmentée permettant aux étudiants de manipuler et de visualiser directement en trois dimensions des molécules complexes, remplaçant à terme l'apprentissage des conventions bidimensionnelles comme Cram, Newman et Fischer ? C'est une piste explorée en pédagogie de la chimie moléculaire.</p>
    <p><strong>Technologie émergente :</strong> les outils de modélisation moléculaire assistée par intelligence artificielle, capables de générer automatiquement des représentations 2D ou 3D optimisées à partir d'une simple formule chimique, accélèrent aujourd'hui considérablement le travail des chimistes de synthèse et des biochimistes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Molécule tridimensionnelle réelle → Cram (perspective intuitive, un centre) → Newman (vue dans l'axe d'une liaison, angle dièdre) → Fischer (croix conventionnelle, plusieurs centres alignés) → conversion rigoureuse entre représentations
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Horizontal (Fischer)} = \\text{vers l'avant} \\qquad \\text{Vertical (Fischer)} = \\text{vers l'arrière}
      $$
      Cette convention, aussi arbitraire qu'universellement respectée depuis plus d'un siècle, est la clé qui permet de déchiffrer sans ambiguïté n'importe quelle projection de Fischer — la représentation de référence de toute la biochimie des sucres et des acides aminés.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Cram : trait plein (dans le plan), triangle plein (vers l'avant), triangle hachuré (vers l'arrière) — la plus intuitive pour visualiser la géométrie réelle</li>
      <li>Newman : point = atome avant, cercle = atome arrière, spécifiquement conçue pour l'étude de la rotation autour d'une liaison (angle dièdre)</li>
      <li>Fischer : horizontal = vers l'avant, vertical = vers l'arrière, idéale pour comparer plusieurs centres stéréogènes alignés (sucres)</li>
      <li>La projection de Fischer ne peut être manipulée que par rotation de 180° dans le plan ou permutation circulaire, sous peine d'inverser la stéréochimie</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Faire pivoter une projection de Fischer de 90° dans le plan, ce qui inverse silencieusement la configuration représentée</li>
      <li>Confondre la convention de Newman (point=avant, cercle=arrière) avec celle de Fischer (horizontal=avant, vertical=arrière)</li>
      <li>Oublier que le triangle hachuré de Cram représente l'arrière, pas l'avant (erreur d'inversion fréquente en début d'apprentissage)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Dans une projection de Fischer, un trait horizontal représente une liaison qui pointe :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste1e1" value="wrong">Vers l'arrière (derrière le plan)</label>
        <label class="option"><input type="radio" name="ste1e1" value="right">Vers l'avant (vers l'observateur)</label>
        <label class="option"><input type="radio" name="ste1e1" value="wrong">Dans le plan de la feuille</label>
        <label class="option"><input type="radio" name="ste1e1" value="wrong">Cela dépend de la molécule représentée</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste1e1','ste1fb1','Correct — par convention, horizontal = vers l\\'avant en projection de Fischer.','Relis la convention stricte de la projection de Fischer.')">Vérifier</button>
      <div class="feedback" id="ste1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quelle manipulation d'une projection de Fischer préserve la configuration représentée ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste1e2" value="wrong">Une rotation de 90° dans le plan</label>
        <label class="option"><input type="radio" name="ste1e2" value="right">Une rotation de 180° dans le plan</label>
        <label class="option"><input type="radio" name="ste1e2" value="wrong">L'échange de deux substituants quelconques</label>
        <label class="option"><input type="radio" name="ste1e2" value="wrong">Aucune manipulation n'est permise</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste1e2','ste1fb2','Correct — une rotation de 180° dans le plan (ou une permutation circulaire des 4 substituants) préserve la configuration.','Relis le point clé sur les manipulations permises d\\'une projection de Fischer.')">Vérifier</button>
      <div class="feedback" id="ste1fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Fischer avait eu accès à la cristallographie aux rayons X dès le départ : aurait-il quand même inventé sa convention de représentation, ou une autre méthode se serait-elle imposée ?</li>
      <li>Pourquoi la projection de Newman est-elle spécifiquement conçue pour étudier la rotation autour d'une liaison, alors que Cram et Fischer ne s'y prêtent pas aussi bien ?</li>
      <li>Quelle serait la conséquence, pour l'enseignement de la chimie organique, d'un remplacement complet des représentations 2D conventionnelles par des outils de modélisation 3D interactifs ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>E. Fischer, « Über die Configuration des Traubenzuckers und seiner Isomeren », Berichte der Deutschen Chemischen Gesellschaft, 1891 — l'article fondateur de la détermination de la configuration du glucose et de la projection de Fischer (prix Nobel de chimie 1902).</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les représentations spatiales en licence.</li>
      <li>D. J. Cram, J. D. Cram, <em>Container Molecules and Their Guests</em>, Royal Society of Chemistry, 1994 — travaux de Donald Cram sur la stéréochimie moléculaire (prix Nobel de chimie 1987).</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais des trois grandes conventions qui te permettront de représenter et convertir n'importe quelle molécule tridimensionnelle sur une feuille de papier. Le chapitre suivant, « Chiralité et énantiomérie : configuration R/S », va exploiter directement ces outils pour attribuer, de façon rigoureuse et systématique, la configuration absolue de n'importe quel centre stéréogène. Comme le disait Emil Fischer lui-même, dont l'œuvre a déterminé la structure exacte des sucres sans jamais pouvoir les observer directement : la chimie, quand elle est menée avec suffisamment de rigueur déductive, peut révéler l'invisible avec une précision remarquable.</p>
  `
};
STEREO_NOVA_KB[steKey("Représentations spatiales des molécules : Cram, Newman et Fischer")] = {
  intro: "Salut, moi c'est Nova ! On démarre la stéréochimie avec les représentations spatiales : Cram, Newman, Fischer. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/cram/i, replies:[
      "La représentation de Cram : trait plein (dans le plan), triangle plein (vers l'avant), triangle hachuré (vers l'arrière) — la plus intuitive pour visualiser la géométrie tétraédrique réelle."
    ]},
    { test:/newman/i, replies:[
      "La projection de Newman regarde la molécule dans l'axe d'une liaison : point = atome avant (3 liaisons partant du point), cercle = atome arrière (3 liaisons partant du bord). Elle sert à étudier l'angle dièdre."
    ]},
    { test:/fischer/i, replies:[
      "La projection de Fischer : horizontal = vers l'avant, vertical = vers l'arrière. Attention, seules une rotation de 180° dans le plan ou une permutation circulaire préservent la configuration — une rotation de 90° l'inverse !"
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la convention stricte de Fischer.",
      "Indice niveau 2 : ce n'est pas 'vers l'arrière' ni 'dans le plan'.",
      "Indice niveau 3 : horizontal = vers l'avant, vers l'observateur."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense aux manipulations qui préservent la stéréochimie représentée.",
      "Indice niveau 2 : ce n'est pas 90°, ni l'échange de deux substituants.",
      "Indice niveau 3 : c'est la rotation de 180° dans le plan."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
STEREO_CHAPTERS[steKey("Chiralité et énantiomérie : configuration R/S")] = {
  objectives: [
    "Définir la chiralité et reconnaître un centre stéréogène (carbone asymétrique)",
    "Appliquer les règles de priorité de Cahn-Ingold-Prelog",
    "Attribuer sans ambiguïté la configuration R ou S d'un centre stéréogène",
    "Définir la relation d'énantiomérie entre deux stéréoisomères",
    "Évaluer pourquoi il a fallu attendre 1966 pour que trois chimistes formalisent des règles de nomenclature R/S universellement acceptées, alors que la chiralité elle-même était connue depuis les travaux de Pasteur, plus d'un siècle auparavant"
  ],
  prereqs: ["Représentations spatiales des molécules : Cram, Newman et Fischer"],
  bodyHtml: `
    <p>En 1848, Louis Pasteur, alors âgé de seulement 25 ans, observe au microscope des cristaux d'un sel d'acide tartrique et remarque un détail que personne avant lui n'avait relevé : deux formes cristallines, images miroir l'une de l'autre, coexistent dans le même échantillon. En triant patiemment, cristal par cristal, à l'aide d'une simple pince à épiler, il sépare les deux formes et découvre qu'elles dévient la lumière polarisée dans des sens opposés — la toute première démonstration expérimentale de ce que l'on appellera plus tard la chiralité moléculaire. Il faudra pourtant attendre encore plus d'un siècle, jusqu'en 1966, pour que Robert Cahn, Christopher Ingold (déjà rencontré à plusieurs reprises dans ce module) et Vladimir Prelog formalisent enfin des règles de nomenclature R/S universellement acceptées, capables de décrire sans la moindre ambiguïté la configuration de n'importe quel centre stéréogène.</p>
    <p>Ce long délai entre la découverte du phénomène et sa formalisation rigoureuse illustre une réalité fréquente en science : observer un phénomène et le nommer précisément, de façon universellement reproductible, sont deux étapes bien distinctes, la seconde exigeant souvent des décennies de raffinement conceptuel. Aujourd'hui, ces règles CIP que tu vas apprendre à maîtriser dans ce chapitre sont utilisées quotidiennement par chaque chimiste organicien et chaque pharmacologue du monde entier pour décrire sans erreur possible la structure exacte d'une molécule chirale.</p>
    <p>La <strong>chiralité</strong> est l'une des notions les plus fondamentales de la stéréochimie, aux conséquences considérables en chimie du vivant : la quasi-totalité des acides aminés naturels, des sucres et de nombreux médicaments sont des molécules chirales, dont un seul des deux « miroirs » possibles est actif biologiquement ou thérapeutiquement. À la fin de ce chapitre, tu sauras attribuer sans la moindre ambiguïté la configuration R ou S de n'importe quel centre stéréogène, à l'aide des mêmes règles universellement reconnues depuis 1966.</p>

    <h3>1. Qu'est-ce que la chiralité ?</h3>
    <p>Une molécule est dite <strong>chirale</strong> si elle n'est <strong>pas superposable</strong> à son image dans un miroir — exactement comme une main gauche n'est jamais superposable à une main droite (d'où le nom, du grec <em>kheir</em>, la main). Une molécule <strong>achirale</strong>, au contraire, est superposable à son image miroir. Le critère structural le plus courant (mais non unique) de chiralité est la présence d'un <strong>centre stéréogène</strong> (ou carbone asymétrique) : un atome de carbone lié à <strong>quatre substituants tous différents</strong>, généralement noté C*.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La présence d'un centre stéréogène est une condition <strong>suffisante mais pas nécessaire</strong> de chiralité : il existe des molécules chirales sans aucun carbone asymétrique (chiralité axiale de certains allènes ou biphényles substitués), et inversement, une molécule à deux centres stéréogènes peut être achirale si elle possède un plan de symétrie interne (composé méso, chapitre 3).
    </div>

    <h3>2. Les règles de priorité de Cahn-Ingold-Prelog (CIP)</h3>
    <p>Pour décrire sans ambiguïté la configuration spatiale d'un centre stéréogène, R.S. Cahn, C. Ingold et V. Prelog ont établi des règles de <strong>hiérarchisation</strong> des quatre substituants, appliquées successivement en cas d'égalité :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Numéro atomique</strong> de l'atome directement lié au centre stéréogène : plus il est élevé, plus la priorité est haute (ex : I > Br > Cl > S > P > F > O > N > C > H)</li>
      <li>En cas d'égalité, on compare les atomes liés à cet atome (ensemble des trois voisins, classés par ordre décroissant), et ainsi de suite en s'éloignant du centre — c'est la <strong>règle de la sphère</strong></li>
      <li>Une liaison multiple (double, triple) est traitée comme si l'atome était dupliqué (dédoublé) autant de fois que l'ordre de la liaison</li>
    </ol>

    <h3>3. Attribution de la configuration R ou S</h3>
    <p>Une fois les quatre substituants classés par priorité décroissante ($a>b>c>d$), la procédure d'attribution est la suivante :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Orienter la molécule (mentalement ou sur le schéma) de sorte que le substituant de <strong>plus faible priorité</strong> ($d$) pointe <strong>à l'opposé</strong> de l'observateur</li>
      <li>Observer le sens de rotation en suivant les trois substituants restants dans l'ordre décroissant de priorité $a \\to b \\to c$</li>
      <li>Si ce parcours va dans le <strong>sens horaire</strong>, la configuration est <strong>R</strong> (du latin <em>rectus</em>, droit) ; si c'est le <strong>sens antihoraire</strong>, elle est <strong>S</strong> (du latin <em>sinister</em>, gauche)</li>
    </ol>

    <div class="sim-box">
      <span class="eyebrow">🔬 Aide-mémoire — attribution R/S</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Note les 4 substituants d'un centre stéréogène pour revoir la procédure d'attribution.</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>Substituant 1</label><input type="text" id="rsP1" value="F" oninput="updateRSHelper()">
          <label>Substituant 2</label><input type="text" id="rsP2" value="OH" oninput="updateRSHelper()">
          <label>Substituant 3</label><input type="text" id="rsP3" value="CH3" oninput="updateRSHelper()">
          <label>Substituant 4</label><input type="text" id="rsP4" value="H" oninput="updateRSHelper()">
          <div class="sim-readout" id="rsReadout"></div>
        </div>
      </div>
    </div>

    <h3>4. La relation d'énantiomérie</h3>
    <p>Deux stéréoisomères qui sont <strong>images l'un de l'autre dans un miroir</strong>, et donc <strong>non superposables</strong>, sont appelés <strong>énantiomères</strong>. Deux énantiomères possèdent rigoureusement les <strong>mêmes propriétés physiques</strong> (point de fusion, point d'ébullition, solubilité...) dans un environnement <strong>achiral</strong>, à l'exception d'une seule propriété : leur effet sur la lumière polarisée (activité optique, chapitre 4), qu'ils dévient dans des sens opposés.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour l'acide lactique CH₃–CH(OH)–COOH, le carbone central porte quatre substituants : OH, COOH, CH₃, H. Classer ces substituants par ordre de priorité CIP décroissante.</p>
      <p><strong>Solution :</strong> On compare les atomes directement liés au centre stéréogène : O (dans OH), C (dans COOH), C (dans CH₃), H. L'oxygène a la priorité la plus haute : OH est en tête. Entre COOH et CH₃ (deux carbones), on compare leurs propres substituants : le carbone de COOH est lié à (O,O,O) [en comptant le O double liaison deux fois par la règle de duplication], celui de CH₃ est lié à (H,H,H) — COOH l'emporte donc sur CH₃. H, avec le plus petit numéro atomique, est en dernier.</p>
      <p class="example-answer">Réponse : OH > COOH > CH₃ > H.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Les règles CIP demandent de comparer les atomes lié par lié, sphère après sphère, en cas d'égalité — un processus parfois long mais toujours univoque. Pourquoi cette approche systématique et mécanique, plutôt qu'une évaluation plus « globale » et intuitive de la structure, garantit-elle qu'un même centre stéréogène recevra toujours exactement la même attribution R ou S, quel que soit le chimiste qui l'analyse ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La détermination expérimentale de la configuration absolue d'une molécule chirale, longtemps un défi majeur de la chimie structurale, s'appuie aujourd'hui sur des techniques de pointe comme la diffraction des rayons X sur monocristal ou le dichroïsme circulaire, qui permettent de trancher sans ambiguïté entre les deux énantiomères possibles d'une nouvelle molécule. Cette question reste cruciale pour l'industrie pharmaceutique : chaque nouveau médicament chiral doit voir sa configuration absolue rigoureusement établie et documentée auprès des autorités de santé, un héritage direct de la tragédie de la thalidomide déjà évoquée dans ce module.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes de détermination de configuration absolue plus rapides et moins coûteuses que la cristallographie aux rayons X, en particulier pour des molécules qui cristallisent difficilement ? C'est un défi méthodologique actif en chimie analytique structurale.</p>
    <p><strong>Technologie émergente :</strong> les techniques de spectroscopie de dichroïsme circulaire vibrationnel couplées à des calculs de chimie quantique permettent aujourd'hui de déterminer la configuration absolue de molécules chirales complexes sans avoir besoin de les cristalliser, une avancée précieuse pour l'analyse rapide de nouveaux principes actifs pharmaceutiques.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Molécule non superposable à son image miroir → chiralité → centre stéréogène (4 substituants différents) → hiérarchisation CIP (numéro atomique, règle de la sphère) → configuration R ou S → énantiomères (mêmes propriétés physiques, sauf activité optique)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$a > b > c > d \\quad\\Longrightarrow\\quad \\text{sens horaire (a→b→c)} = R,\\ \\text{sens antihoraire} = S$$
      Cette règle, formalisée seulement en 1966 malgré plus d'un siècle de connaissance du phénomène de chiralité, permet aujourd'hui à n'importe quel chimiste du monde entier d'attribuer, de façon parfaitement reproductible, la configuration absolue de n'importe quel centre stéréogène.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une molécule chirale n'est pas superposable à son image dans un miroir ; un centre stéréogène (4 substituants différents) en est une cause fréquente mais non exclusive</li>
      <li>Les règles CIP hiérarchisent les substituants par numéro atomique croissant, puis par comparaison des atomes suivants (règle de la sphère)</li>
      <li>Configuration R (sens horaire) ou S (sens antihoraire), avec le substituant de plus faible priorité à l'opposé de l'observateur</li>
      <li>Deux énantiomères ont les mêmes propriétés physiques en milieu achiral, sauf leur effet opposé sur la lumière polarisée</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier de placer le substituant de plus faible priorité à l'arrière avant de déterminer le sens de rotation R/S</li>
      <li>Croire qu'une molécule sans carbone asymétrique est nécessairement achirale (cas de la chiralité axiale)</li>
      <li>Confondre le classement par numéro atomique direct et la règle de la sphère (comparaison des atomes suivants en cas d'égalité)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Un carbone asymétrique (centre stéréogène) est un carbone lié à :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste2e1" value="wrong">Quatre atomes d'hydrogène</label>
        <label class="option"><input type="radio" name="ste2e1" value="right">Quatre substituants tous différents</label>
        <label class="option"><input type="radio" name="ste2e1" value="wrong">Une double liaison</label>
        <label class="option"><input type="radio" name="ste2e1" value="wrong">Trois substituants seulement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste2e1','ste2fb1','Correct — c\\'est la définition d\\'un centre stéréogène (carbone asymétrique).','Relis la définition du centre stéréogène en début de chapitre.')">Vérifier</button>
      <div class="feedback" id="ste2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Deux énantiomères diffèrent par leur :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste2e2" value="wrong">Point de fusion</label>
        <label class="option"><input type="radio" name="ste2e2" value="right">Effet sur la lumière polarisée</label>
        <label class="option"><input type="radio" name="ste2e2" value="wrong">Solubilité dans un solvant achiral</label>
        <label class="option"><input type="radio" name="ste2e2" value="wrong">Masse molaire</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste2e2','ste2fb2','Correct — dans un environnement achiral, seule leur interaction avec la lumière polarisée diffère entre deux énantiomères.','Relis la définition de la relation d\\'énantiomérie et ses conséquences sur les propriétés physiques.')">Vérifier</button>
      <div class="feedback" id="ste2fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Pasteur n'avait jamais remarqué la différence entre les deux formes cristallines de l'acide tartrique : combien de temps la découverte de la chiralité moléculaire aurait-elle pu être retardée ?</li>
      <li>Pourquoi a-t-il fallu attendre 1966 pour formaliser des règles de nomenclature R/S universelles, alors que le phénomène de chiralité était connu et étudié depuis plus d'un siècle ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pharmaceutique mondiale, de l'absence de méthodes fiables pour déterminer la configuration absolue d'une nouvelle molécule chirale ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>L. Pasteur, « Recherches sur les relations qui peuvent exister entre la forme cristalline, la composition chimique et le sens de la polarisation rotatoire », Annales de Chimie et de Physique, 1848.</li>
      <li>R. S. Cahn, C. Ingold, V. Prelog, « Specification of Molecular Chirality », Angewandte Chemie International Edition, 1966 — l'article fondateur des règles CIP.</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur la chiralité et la configuration R/S en licence.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais attribuer, avec la même rigueur universellement reconnue depuis 1966, la configuration absolue de n'importe quel centre stéréogène. Le chapitre suivant, « Molécules à plusieurs centres stéréogènes : diastéréoisomères et composés méso », va complexifier cette analyse en explorant ce qui se passe lorsqu'une molécule possède non pas un, mais plusieurs centres stéréogènes simultanément. Comme le rappelle la découverte de Pasteur, réalisée à la seule force d'une observation microscopique patiente : parfois, les plus grandes révolutions conceptuelles naissent d'un simple détail que personne d'autre n'avait pris la peine de remarquer.</p>
  `,
  init: updateRSHelper
};
STEREO_NOVA_KB[steKey("Chiralité et énantiomérie : configuration R/S")] = {
  intro: "Salut, moi c'est Nova ! On étudie la chiralité, les règles CIP et l'attribution R/S. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/chiral|centre st[ée]r[ée]og[èe]ne|carbone asym[ée]trique/i, replies:[
      "Une molécule chirale n'est pas superposable à son image miroir. Un centre stéréogène (carbone lié à 4 substituants différents) en est une cause fréquente, mais pas la seule (chiralité axiale possible sans carbone asymétrique)."
    ]},
    { test:/cip|cahn.ingold.prelog|priorit[ée]/i, replies:[
      "Les règles CIP classent les substituants par numéro atomique de l'atome lié directement, puis en cas d'égalité par comparaison des atomes suivants (règle de la sphère), avec duplication pour les liaisons multiples."
    ]},
    { test:/configuration r|configuration s|attribution r.s/i, replies:[
      "Pour attribuer R ou S : classe les 4 substituants par priorité, place le moins prioritaire à l'arrière, regarde le sens 1→2→3 des trois autres — horaire=R, antihoraire=S."
    ]},
    { test:/[ée]nantiom[èe]re/i, replies:[
      "Deux énantiomères sont images miroir l'un de l'autre, non superposables. Mêmes propriétés physiques en milieu achiral, sauf l'effet opposé sur la lumière polarisée."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition précise d'un centre stéréogène.",
      "Indice niveau 2 : ce n'est pas 4 hydrogènes identiques.",
      "Indice niveau 3 : ce sont 4 substituants tous différents."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la seule propriété physique qui distingue deux énantiomères en milieu achiral.",
      "Indice niveau 2 : ce n'est ni le point de fusion, ni la solubilité, ni la masse.",
      "Indice niveau 3 : c'est leur effet opposé sur la lumière polarisée."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
STEREO_CHAPTERS[steKey("Molécules à plusieurs centres stéréogènes : diastéréoisomères et composés méso")] = {
  objectives: [
    "Dénombrer les stéréoisomères possibles d'une molécule à n centres stéréogènes",
    "Distinguer énantiomères et diastéréoisomères",
    "Identifier un composé méso et justifier son caractère achiral",
    "Appliquer ces notions à des exemples classiques (acide tartrique)",
    "Évaluer pourquoi l'acide tartrique a joué un rôle historique central dans la découverte même de la chiralité, avant même que l'on comprenne l'existence des composés méso"
  ],
  prereqs: ["Chiralité et énantiomérie : configuration R/S"],
  bodyHtml: `
    <p>L'acide tartrique, déjà rencontré au chapitre précédent à travers les travaux fondateurs de Pasteur, réserve une seconde surprise historique tout aussi instructive : ses quatre stéréoisomères « attendus » selon la règle des $2^n$ se réduisent en réalité à trois composés bien distincts, une découverte de la symétrie interne moléculaire qui a longtemps déconcerté les chimistes du XIXe siècle avant d'être pleinement comprise. Cette réduction inattendue, aujourd'hui expliquée par la notion de composé méso, illustre parfaitement pourquoi la stéréochimie exige une analyse rigoureuse plutôt qu'une simple application mécanique de formules combinatoires.</p>
    <p>Cette subtilité, loin d'être un simple exercice académique, a des conséquences bien réelles pour l'industrie chimique et pharmaceutique : confondre un mélange racémique avec un composé méso, ou négliger l'existence d'une symétrie interne réduisant le nombre réel de stéréoisomères d'une molécule, peut conduire à des erreurs de synthèse coûteuses ou à une mauvaise interprétation de résultats expérimentaux. Ce chapitre te propose de maîtriser rigoureusement ces subtilités, indispensables dès qu'une molécule organique compte plus d'un centre stéréogène.</p>
    <p>La plupart des molécules organiques d'intérêt biologique (sucres, acides aminés, stéroïdes) possèdent <strong>plusieurs</strong> centres stéréogènes simultanément. Ce chapitre étend l'analyse du chapitre précédent à ce cas plus riche, et introduit une relation stéréochimique supplémentaire : la <strong>diastéréoisomérie</strong>. À la fin de ce chapitre, tu sauras dénombrer avec précision tous les stéréoisomères réels d'une molécule complexe, y compris lorsque sa symétrie interne réduit ce nombre par rapport à la prédiction naïve de la règle des $2^n$.</p>

    <h3>1. Dénombrement des stéréoisomères : la règle de $2^n$</h3>
    <p>Pour une molécule possédant $n$ centres stéréogènes <strong>indépendants</strong> (sans élément de symétrie interne particulier), le nombre maximal de stéréoisomères possibles est :</p>
    <div class="formula-box">$$N = 2^n$$</div>
    <p>chaque centre pouvant indépendamment adopter la configuration R ou S. Ces $2^n$ stéréoisomères se répartissent en $2^{n-1}$ <strong>paires d'énantiomères</strong>.</p>

    <h3>2. Diastéréoisomères : une nouvelle relation stéréochimique</h3>
    <p>Deux stéréoisomères qui ne sont <strong>ni identiques ni énantiomères</strong> (c'est-à-dire qui diffèrent par la configuration d'<strong>au moins un, mais pas la totalité</strong>, de leurs centres stéréogènes) sont appelés <strong>diastéréoisomères</strong>.</p>
    <table class="mini-table">
      <tr><th>Relation</th><th>Définition</th><th>Propriétés physiques</th></tr>
      <tr><td>Énantiomères</td><td>Configuration inversée en <strong>tous</strong> les centres stéréogènes (images miroir)</td><td>Identiques (sauf activité optique)</td></tr>
      <tr><td>Diastéréoisomères</td><td>Configuration inversée en <strong>certains seulement</strong> des centres stéréogènes</td><td><strong>Différentes</strong> (points de fusion, solubilités, réactivités distincts)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Contrairement aux énantiomères, les diastéréoisomères sont des composés aux propriétés physico-chimiques <strong>réellement différentes</strong> : ils peuvent, en principe, être séparés par les techniques classiques de purification (distillation, cristallisation, chromatographie — voir le cours d'Instrumentations et manipulation de chimie organique), alors que la séparation de deux énantiomères (dédoublement) exige des méthodes spécifiques (résolution chirale).
    </div>

    <h3>3. Le cas particulier des composés méso</h3>
    <p>La règle des $2^n$ stéréoisomères suppose des centres stéréogènes <strong>indépendants</strong>. Lorsque la molécule possède une symétrie interne particulière (par exemple, deux centres stéréogènes portant des <strong>substituants identiques</strong> de part et d'autre d'un axe), certains des $2^n$ stéréoisomères « attendus » <strong>coïncident</strong> en réalité avec un seul et même composé, <strong>achiral</strong> malgré la présence de centres stéréogènes : c'est un <strong>composé méso</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi un composé méso est achiral</span>
      Un composé méso possède un <strong>plan de symétrie interne</strong> (ou un centre d'inversion) qui rend la molécule superposable à sa propre image miroir, malgré la présence de centres stéréogènes individuellement chiraux. Concrètement, dans un composé méso à deux centres stéréogènes, la configuration R d'un centre est exactement « compensée » par la configuration S de l'autre centre, via la symétrie interne de la molécule — contrairement à un cas général où R,R et S,S seraient deux énantiomères distincts.
    </div>

    <h3>4. Exemple classique : l'acide tartrique</h3>
    <p>L'acide tartrique HOOC–CH(OH)–CH(OH)–COOH possède deux centres stéréogènes, avec des substituants identiques sur les deux centres (par symétrie de la molécule). La règle des $2^n=4$ stéréoisomères « attendus » (RR, SS, RS, SR) se réduit en réalité à <strong>trois</strong> composés distincts :</p>
    <table class="mini-table">
      <tr><th>Stéréoisomère</th><th>Nature</th><th>Activité optique</th></tr>
      <tr><td>(R,R)</td><td>Énantiomère 1 (acide (+)-tartrique naturel)</td><td>Optiquement actif</td></tr>
      <tr><td>(S,S)</td><td>Énantiomère 2 (acide (−)-tartrique)</td><td>Optiquement actif, sens opposé</td></tr>
      <tr><td>(R,S) = (S,R)</td><td><strong>Un seul et même composé méso</strong> (les deux notations désignent la même molécule, superposable à elle-même par rotation)</td><td>Optiquement inactif (achiral)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Le mélange en proportions égales des deux énantiomères (R,R) et (S,S) de l'acide tartrique — appelé <strong>acide racémique</strong> — est-il optiquement actif ? Est-ce la même chose que le composé méso (R,S) ?</p>
      <p><strong>Solution :</strong> Un mélange racémique (proportions 50/50 de deux énantiomères) est optiquement <strong>inactif</strong>, car les rotations optiques opposées des deux énantiomères s'annulent statistiquement en moyenne sur l'échantillon. Mais ce n'est <strong>pas</strong> la même chose que le composé méso : le racémique reste un <strong>mélange</strong> de deux molécules chirales distinctes (séparables en principe par résolution chirale), tandis que le méso est une <strong>molécule unique</strong>, achirale par sa structure interne (non séparable en deux composés, car il n'y en a qu'un seul).</p>
      <p class="example-answer">Réponse : les deux sont optiquement inactifs, mais pour des raisons fondamentalement différentes — annulation statistique pour le racémique, achiralité structurelle intrinsèque pour le méso.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un composé méso et un mélange racémique sont tous deux optiquement inactifs, mais pour des raisons physiquement très différentes (une seule molécule intrinsèquement achirale contre un mélange statistique de deux molécules chirales opposées). Si tu devais concevoir une expérience pour distinguer ces deux cas (au-delà de la simple mesure d'activité optique, qui donne le même résultat nul dans les deux cas), à quelle propriété physique ferais-tu appel ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La compréhension fine des composés méso et de la symétrie moléculaire interne reste essentielle en synthèse organique moderne : la synthèse totale de molécules naturelles complexes, comportant parfois des dizaines de centres stéréogènes (comme certaines toxines marines ou antibiotiques), exige une analyse rigoureuse de toute symétrie interne susceptible de réduire le nombre réel de stéréoisomères à synthétiser et à séparer. Les chimistes exploitent d'ailleurs parfois délibérément la symétrie méso comme stratégie de synthèse : partir d'un composé méso facilement accessible, puis le désymétriser sélectivement par une réaction énantiosélective, permet souvent d'accéder efficacement à un seul énantiomère pur d'une molécule cible complexe.</p>
    <p><strong>Question ouverte :</strong> peut-on systématiser, par des méthodes de calcul informatique, la détection automatique de toute symétrie interne (méso ou autre) dans une molécule complexe, afin de prédire avec certitude son nombre réel de stéréoisomères sans erreur d'omission humaine ? C'est un problème abordé en chémoinformatique et en synthèse assistée par ordinateur.</p>
    <p><strong>Technologie émergente :</strong> les stratégies de « désymétrisation » de composés méso par catalyse asymétrique, récompensées par plusieurs prix Nobel de chimie (Noyori, Sharpless), permettent aujourd'hui de synthétiser efficacement un seul énantiomère pur de molécules complexes à partir de précurseurs méso facilement accessibles.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      n centres stéréogènes → 2ⁿ stéréoisomères attendus → vérification de la symétrie interne → réduction éventuelle (composé méso) → classement final : énantiomères (propriétés identiques) vs diastéréoisomères (propriétés différentes)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$N_{\\text{réel}} \\le 2^n$$
      Cette inégalité, plutôt qu'une égalité stricte, résume l'enseignement central de ce chapitre : la règle des $2^n$ donne toujours une borne supérieure du nombre de stéréoisomères, mais seule une analyse rigoureuse de la symétrie interne de la molécule — comme l'illustre l'exemple historique de l'acide tartrique — révèle le nombre réel de composés effectivement distincts.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une molécule à n centres stéréogènes indépendants possède au maximum 2ⁿ stéréoisomères, formant 2ⁿ⁻¹ paires d'énantiomères</li>
      <li>Les diastéréoisomères diffèrent par la configuration d'une partie seulement de leurs centres stéréogènes, et ont des propriétés physiques différentes (contrairement aux énantiomères)</li>
      <li>Un composé méso, malgré ses centres stéréogènes, est achiral grâce à un plan de symétrie interne — c'est une exception à la règle des 2ⁿ</li>
      <li>L'acide tartrique illustre ce cas : 4 combinaisons attendues, mais seulement 3 composés distincts (RR, SS, et le méso RS=SR)</li>
      <li>Un mélange racémique (2 énantiomères en proportions égales) et un composé méso sont tous deux optiquement inactifs, mais pour des raisons différentes</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Appliquer aveuglément la règle des 2ⁿ sans vérifier l'existence d'une symétrie interne pouvant produire un composé méso</li>
      <li>Confondre mélange racémique (mélange de deux molécules chirales) et composé méso (une seule molécule achirale)</li>
      <li>Croire que diastéréoisomères et énantiomères ont les mêmes propriétés physiques — seuls les énantiomères les partagent (hors activité optique)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Deux diastéréoisomères ont-ils, en général, le même point de fusion ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste3e1" value="wrong">Oui, toujours</label>
        <label class="option"><input type="radio" name="ste3e1" value="right">Non, leurs propriétés physiques diffèrent en général</label>
        <label class="option"><input type="radio" name="ste3e1" value="wrong">Cela dépend uniquement de la masse molaire</label>
        <label class="option"><input type="radio" name="ste3e1" value="wrong">Oui, comme pour des énantiomères</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste3e1','ste3fb1','Correct — contrairement aux énantiomères, les diastéréoisomères sont des composés aux propriétés physiques réellement différentes.','Relis le tableau comparant énantiomères et diastéréoisomères.')">Vérifier</button>
      <div class="feedback" id="ste3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi un composé méso est-il achiral malgré la présence de centres stéréogènes ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste3e2" value="wrong">Parce qu'il n'a en réalité aucun centre stéréogène</label>
        <label class="option"><input type="radio" name="ste3e2" value="right">Parce qu'il possède un plan de symétrie interne qui le rend superposable à son image miroir</label>
        <label class="option"><input type="radio" name="ste3e2" value="wrong">Parce que c'est un mélange racémique</label>
        <label class="option"><input type="radio" name="ste3e2" value="wrong">Parce qu'il n'existe pas réellement, c'est une notion purement théorique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste3e2','ste3fb2','Correct — la symétrie interne (plan ou centre) rend le composé méso superposable à son image miroir, malgré ses centres stéréogènes individuels.','Relis le point clé sur l\\'origine de l\\'achiralité d\\'un composé méso.')">Vérifier</button>
      <div class="feedback" id="ste3fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'acide tartrique n'avait pas de symétrie interne particulière (comme la plupart des molécules à deux centres stéréogènes) : combien de stéréoisomères réels compterait-il, et lesquels seraient énantiomères ou diastéréoisomères ?</li>
      <li>Pourquoi les chimistes du XIXe siècle ont-ils longtemps été déconcertés par le comportement de l'acide tartrique méso avant de comprendre le rôle de la symétrie interne ?</li>
      <li>Quelle serait la conséquence, pour la synthèse totale de molécules naturelles complexes, d'une omission accidentelle d'une symétrie méso lors de la planification d'une voie de synthèse ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>J. A. Le Bel, « Sur les relations qui existent entre les formules atomiques des corps organiques et le pouvoir rotatoire de leurs dissolutions », Bulletin de la Société Chimique de Paris, 1874 — travaux fondateurs sur les stéréoisomères multiples.</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les diastéréoisomères et composés méso en licence.</li>
      <li>R. Noyori, « Asymmetric Catalysis: Science and Opportunities », Nobel Lecture, prix Nobel de chimie 2001 — travaux sur la désymétrisation catalytique de composés méso.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais dénombrer avec précision les stéréoisomères réels d'une molécule complexe, en tenant compte de toute symétrie interne susceptible de réduire ce nombre par rapport à la prédiction naïve. Le chapitre suivant, « Activité optique et pouvoir rotatoire », va te donner les outils quantitatifs pour mesurer expérimentalement cette chiralité, exactement comme Pasteur l'a fait le premier avec ses cristaux d'acide tartrique. Comme le rappelle l'histoire de cette molécule à la symétrie surprenante : en stéréochimie, l'application aveugle d'une formule combinatoire ne remplace jamais une analyse rigoureuse de la structure réelle de la molécule étudiée.</p>
  `
};
STEREO_NOVA_KB[steKey("Molécules à plusieurs centres stéréogènes : diastéréoisomères et composés méso")] = {
  intro: "Salut, moi c'est Nova ! On explore les molécules à plusieurs centres stéréogènes : diastéréoisomères, composés méso. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/2.?n|nombre de st[ée]r[ée]oisom[èe]res/i, replies:[
      "Une molécule à n centres stéréogènes indépendants a au maximum 2ⁿ stéréoisomères, formant 2ⁿ⁻¹ paires d'énantiomères."
    ]},
    { test:/diast[ée]r[ée]oisom[èe]re/i, replies:[
      "Les diastéréoisomères diffèrent par la configuration d'une partie (pas la totalité) de leurs centres stéréogènes, et ont des propriétés physiques réellement différentes — contrairement aux énantiomères."
    ]},
    { test:/m[ée]so/i, replies:[
      "Un composé méso, malgré ses centres stéréogènes, est achiral grâce à un plan de symétrie interne qui le rend superposable à son image miroir — exception à la règle des 2ⁿ."
    ]},
    { test:/racemique|racémique/i, replies:[
      "Un mélange racémique (2 énantiomères en proportions égales) est optiquement inactif par annulation statistique — différent d'un composé méso, qui est une molécule unique intrinsèquement achirale."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le tableau comparant énantiomères et diastéréoisomères.",
      "Indice niveau 2 : seuls les énantiomères partagent les mêmes propriétés physiques.",
      "Indice niveau 3 : les diastéréoisomères ont donc des propriétés différentes, dont le point de fusion."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à l'élément de symétrie qui rend un composé méso achiral.",
      "Indice niveau 2 : ce n'est ni l'absence de centres stéréogènes, ni un mélange.",
      "Indice niveau 3 : c'est un plan de symétrie interne qui rend la molécule superposable à son image miroir."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
STEREO_CHAPTERS[steKey("Activité optique et pouvoir rotatoire")] = {
  objectives: [
    "Comprendre le principe de la polarimétrie et la notion de lumière polarisée",
    "Définir le pouvoir rotatoire spécifique et la loi de Biot",
    "Distinguer composé dextrogyre et lévogyre",
    "Relier composition énantiomérique d'un mélange et excès énantiomérique mesuré",
    "Évaluer pourquoi l'absence de lien prévisible entre configuration R/S et signe dextrogyre/lévogyre a longtemps compliqué la détermination de la configuration absolue des molécules chirales avant l'avènement de la cristallographie aux rayons X"
  ],
  prereqs: ["Chiralité et énantiomérie : configuration R/S", "Molécules à plusieurs centres stéréogènes : diastéréoisomères et composés méso"],
  bodyHtml: `
    <p>Jean-Baptiste Biot, physicien français du début du XIXe siècle, découvre dès 1815 — plus de trente ans avant les travaux fondateurs de Pasteur sur la chiralité moléculaire — que certaines substances naturelles (comme le sucre de canne ou l'essence de térébenthine) font tourner le plan de polarisation de la lumière qui les traverse. Biot ne comprend pas encore l'origine moléculaire de ce phénomène — il faudra attendre Pasteur et sa découverte de la chiralité pour l'expliquer — mais sa loi empirique, reliant la rotation observée à la concentration et à la longueur du trajet optique, reste aujourd'hui, deux siècles plus tard, l'outil de mesure de référence de tout laboratoire de chimie organique.</p>
    <p>Cette technique de mesure, la <strong>polarimétrie</strong>, occupe une place particulière dans l'histoire des sciences : c'est elle qui a permis à Pasteur, en 1848, de démontrer expérimentalement l'existence de la chiralité moléculaire, bien avant que quiconque ne comprenne sa cause structurale exacte (les travaux de van't Hoff et Le Bel sur le carbone tétraédrique ne viendront qu'en 1874). Aujourd'hui encore, la polarimétrie reste une méthode rapide, non destructive et peu coûteuse pour caractériser la pureté énantiomérique d'un échantillon — un contrôle qualité indispensable dans l'industrie pharmaceutique.</p>
    <p>L'<strong>activité optique</strong> est la propriété physique qui a historiquement permis de découvrir la chiralité moléculaire (Louis Pasteur, 1848, en séparant manuellement des cristaux d'acide tartrique) et demeure aujourd'hui l'outil expérimental de référence pour caractériser un composé chiral et déterminer sa pureté énantiomérique. À la fin de ce chapitre, tu sauras mesurer et interpréter le pouvoir rotatoire d'un échantillon chiral, et calculer précisément sa pureté énantiomérique.</p>

    <h3>1. La lumière polarisée rectilignement</h3>
    <p>La lumière naturelle est constituée d'ondes électromagnétiques dont le champ électrique oscille dans <strong>toutes les directions</strong> perpendiculaires à la direction de propagation. Un <strong>polariseur</strong> (filtre optique spécifique) ne laisse passer que la composante du champ électrique oscillant selon une <strong>direction unique</strong> : on obtient ainsi de la lumière <strong>polarisée rectilignement</strong>.</p>

    <h3>2. Interaction avec une molécule chirale : le pouvoir rotatoire</h3>
    <p>Lorsqu'un faisceau de lumière polarisée rectilignement traverse une solution contenant une substance <strong>chirale</strong>, le plan de polarisation subit une <strong>rotation</strong> d'un certain angle $\\alpha$ — un phénomène appelé <strong>activité optique</strong>. Une substance <strong>achirale</strong> (ou un mélange racémique) ne fait subir aucune rotation nette au plan de polarisation.</p>
    <table class="mini-table">
      <tr><th>Terme</th><th>Signification</th></tr>
      <tr><td><strong>Dextrogyre</strong> (noté +)</td><td>Fait tourner le plan de polarisation dans le sens horaire (vu en regardant la source depuis le détecteur)</td></tr>
      <tr><td><strong>Lévogyre</strong> (noté −)</td><td>Fait tourner le plan de polarisation dans le sens antihoraire</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — aucun lien systématique entre R/S et +/−</span>
      Il n'existe <strong>aucune relation générale et prévisible</strong> entre la configuration absolue (R ou S, déterminée par les règles CIP, chapitre 2) et le signe du pouvoir rotatoire (+ ou −, une grandeur physique mesurée expérimentalement) : un composé de configuration R peut être dextrogyre <strong>ou</strong> lévogyre selon la nature exacte de ses substituants, et cette correspondance doit être établie expérimentalement pour chaque molécule — il n'existe pas de règle générale permettant de la prédire a priori à partir de la seule configuration.
    </div>

    <h3>3. La loi de Biot et le pouvoir rotatoire spécifique</h3>
    <p>L'angle de rotation mesuré $\\alpha$ (en degrés) dépend de la concentration $c$ de la substance chirale, de la longueur $\\ell$ du trajet optique dans la solution, et d'une grandeur intrinsèque à la molécule, le <strong>pouvoir rotatoire spécifique</strong> $[\\alpha]$ (dépendant de la température et de la longueur d'onde utilisée, conventionnellement la raie D du sodium, 589 nm) — c'est la <strong>loi de Biot</strong> :</p>
    <div class="formula-box">$$\\alpha = [\\alpha]_D^T \\cdot \\ell \\cdot c$$</div>
    <p>avec $\\ell$ en décimètres (dm) et $c$ en g/mL (convention historique), ce qui donne $[\\alpha]$ en $°\\cdot\\text{mL}\\cdot\\text{g}^{-1}\\cdot\\text{dm}^{-1}$, unité conventionnellement notée simplement en degrés. Le pouvoir rotatoire spécifique est une <strong>grandeur caractéristique</strong> d'un composé chiral pur, tabulée dans les bases de données de référence, au même titre que le point de fusion ou l'indice de réfraction.</p>

    <h3>4. Excès énantiomérique</h3>
    <p>Pour un échantillon contenant un mélange des deux énantiomères en proportions inégales, on définit l'<strong>excès énantiomérique</strong> (ee) :</p>
    <div class="formula-box">$$ee\\ (\\%) = \\dfrac{|[\\alpha]_{\\text{mesuré}}|}{|[\\alpha]_{\\text{énantiomère pur}}|}\\times 100$$</div>
    <p>qui mesure directement, à partir d'une simple mesure de pouvoir rotatoire, la pureté énantiomérique de l'échantillon : $ee=100\\%$ correspond à un énantiomère pur, $ee=0\\%$ à un mélange racémique exactement 50/50.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une solution d'un composé chiral, de concentration $c=0{,}20$ g/mL, mesurée dans une cuve de $\\ell=1$ dm, donne une rotation observée $\\alpha=+13°$. Sachant que l'énantiomère pur a un pouvoir rotatoire spécifique $[\\alpha]_D = +65°$, calculer l'excès énantiomérique de l'échantillon.</p>
      <p><strong>Solution :</strong> D'abord, le pouvoir rotatoire spécifique de l'échantillon : $[\\alpha]_{\\text{mesuré}} = \\alpha/(\\ell c) = 13/(1\\times0{,}20) = 65°$... attention, il faut utiliser la valeur mesurée correctement : ici $[\\alpha]_{\\text{mesuré}}$ se déduit directement de la formule de Biot appliquée à l'échantillon, donnant $65°$ — mais comparons plutôt à l'énantiomère pur à la même concentration : $\\alpha_{\\text{pur attendu}} = 65\\times1\\times0{,}20=13°$. L'échantillon donnant exactement cette valeur, $ee = 13/13\\times100=100\\%$.</p>
      <p class="example-answer">Réponse : $ee=100\\%$ — l'échantillon mesuré correspond en réalité à l'énantiomère pur (ce résultat est cohérent car les deux pouvoirs rotatoires spécifiques coïncident numériquement dans cet exemple).</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'absence de lien systématique entre configuration R/S et signe dextrogyre/lévogyre signifie qu'une simple mesure de polarimétrie ne suffit jamais, à elle seule, à déterminer si un échantillon inconnu est de configuration R ou S — il faut une référence établie séparément (par cristallographie, par exemple). Pourquoi cette limitation n'empêche-t-elle pas pour autant la polarimétrie de rester extrêmement utile en pratique, notamment pour le contrôle qualité pharmaceutique ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La polarimétrie reste aujourd'hui un outil incontournable de contrôle qualité dans l'industrie pharmaceutique : chaque lot de médicament chiral doit voir sa pureté énantiomérique vérifiée, souvent par polarimétrie associée à d'autres techniques complémentaires comme la chromatographie chirale. Les recherches actuelles en optique moléculaire explorent également des phénomènes plus subtils liés à la chiralité, comme le dichroïsme circulaire (absorption différentielle de la lumière polarisée circulairement gauche et droite), qui offre des informations structurales complémentaires à la simple mesure du pouvoir rotatoire.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des capteurs de polarimétrie miniaturisés et peu coûteux, utilisables sur le terrain plutôt qu'en laboratoire, pour un contrôle qualité rapide de la pureté énantiomérique de médicaments dans des contextes à ressources limitées ? C'est un enjeu de recherche en instrumentation analytique portable.</p>
    <p><strong>Technologie émergente :</strong> les polarimètres automatisés couplés à l'intelligence artificielle, capables d'analyser en temps réel des mélanges complexes de plusieurs composés chiraux simultanément, accélèrent aujourd'hui considérablement le contrôle qualité dans l'industrie pharmaceutique et agroalimentaire.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Lumière naturelle → polariseur → lumière polarisée rectilignement → traversée d'un composé chiral → rotation du plan de polarisation (dextrogyre/lévogyre) → loi de Biot → excès énantiomérique
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\alpha = [\\alpha]_D^T \\cdot \\ell \\cdot c$$
      Cette loi de Biot, établie empiriquement dès 1815 — plus de trente ans avant même la découverte de la chiralité moléculaire par Pasteur — reste aujourd'hui l'outil de mesure de référence pour quantifier la pureté énantiomérique de n'importe quel échantillon chiral, du laboratoire de recherche à l'usine pharmaceutique.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une substance chirale fait tourner le plan de polarisation de la lumière polarisée rectilignement (activité optique) ; une substance achirale ou un racémique ne dévie rien</li>
      <li>Dextrogyre (+, sens horaire) et lévogyre (−, sens antihoraire) qualifient le sens de rotation observé</li>
      <li>Il n'y a aucune relation générale prévisible entre configuration R/S (CIP) et signe +/− (mesure expérimentale)</li>
      <li>Loi de Biot : α=[α]·ℓ·c, avec [α] le pouvoir rotatoire spécifique, grandeur caractéristique tabulée d'un composé pur</li>
      <li>L'excès énantiomérique ee=|[α]mesuré|/|[α]pur|×100 quantifie la pureté énantiomérique d'un échantillon</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire qu'un composé de configuration R est systématiquement dextrogyre (+) — ce lien n'existe pas en général</li>
      <li>Oublier les unités conventionnelles de la loi de Biot (ℓ en dm, c en g/mL)</li>
      <li>Confondre pouvoir rotatoire spécifique [α] (grandeur intrinsèque, indépendante de c et ℓ) et rotation observée α (dépend de c et ℓ)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Une configuration R correspond-elle toujours à un composé dextrogyre (+) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste4e1" value="wrong">Oui, toujours, par définition</label>
        <label class="option"><input type="radio" name="ste4e1" value="right">Non, il n'existe aucune relation générale prévisible entre les deux</label>
        <label class="option"><input type="radio" name="ste4e1" value="wrong">Oui, mais seulement pour les sucres</label>
        <label class="option"><input type="radio" name="ste4e1" value="wrong">Non, R correspond toujours à lévogyre</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste4e1','ste4fb1','Correct — la relation entre R/S (CIP, convention structurale) et +/− (mesure physique) doit être établie expérimentalement, sans règle générale.','Relis le point clé sur l\\'absence de lien systématique entre R/S et +/−.')">Vérifier</button>
      <div class="feedback" id="ste4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un mélange racémique (50/50 des deux énantiomères) a un excès énantiomérique de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste4e2" value="wrong">100 %</label>
        <label class="option"><input type="radio" name="ste4e2" value="right">0 %</label>
        <label class="option"><input type="radio" name="ste4e2" value="wrong">50 %</label>
        <label class="option"><input type="radio" name="ste4e2" value="wrong">Cela dépend du composé</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste4e2','ste4fb2','Correct — un mélange exactement 50/50 ne dévie pas la lumière polarisée (rotations opposées qui s\\'annulent), donc ee=0%.','Relis la définition de l\\'excès énantiomérique et le cas particulier du mélange 50/50.')">Vérifier</button>
      <div class="feedback" id="ste4fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Biot n'avait jamais découvert le phénomène d'activité optique en 1815 : Pasteur aurait-il pu découvrir la chiralité moléculaire par une autre méthode expérimentale trente ans plus tard ?</li>
      <li>Pourquoi la relation entre configuration absolue (R/S) et signe du pouvoir rotatoire (+/−) doit-elle être établie séparément pour chaque molécule, plutôt que de suivre une règle générale simple ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, de l'absence d'une méthode rapide et fiable comme la polarimétrie pour contrôler la pureté énantiomérique des médicaments produits industriellement ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>J.-B. Biot, « Phénomènes de polarisation successive, observés dans des fluides homogènes », Bulletin des Sciences par la Société Philomatique de Paris, 1815 — la découverte originale de l'activité optique.</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur l'activité optique et le pouvoir rotatoire en licence.</li>
      <li>Pharmacopée Européenne, <em>Détermination du pouvoir rotatoire</em>, monographie générale de référence pour le contrôle qualité pharmaceutique.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais mesurer et interpréter le pouvoir rotatoire d'un échantillon chiral, exactement comme Pasteur l'a fait le premier avec ses cristaux d'acide tartrique. Le chapitre suivant, « Analyse conformationnelle des molécules acycliques : éthane et butane », va explorer une toute autre dimension de la stéréochimie — non plus la configuration figée d'un centre stéréogène, mais les multiples formes que peut adopter une même molécule par simple rotation autour d'une liaison. Comme le rappelle la loi de Biot, établie plus de trente ans avant même que l'on comprenne son origine moléculaire : une observation expérimentale rigoureuse peut précéder de plusieurs décennies la théorie qui l'expliquera enfin pleinement.</p>
  `
};
STEREO_NOVA_KB[steKey("Activité optique et pouvoir rotatoire")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'activité optique : polarimétrie, loi de Biot, excès énantiomérique. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/dextrogyre|l[ée]vogyre/i, replies:[
      "Dextrogyre (+) = rotation du plan de polarisation en sens horaire ; lévogyre (−) = sens antihoraire. Aucun lien systématique avec la configuration R/S (CIP)."
    ]},
    { test:/loi de biot|pouvoir rotatoire/i, replies:[
      "Loi de Biot : α=[α]·ℓ·c, avec ℓ en dm et c en g/mL. [α] (pouvoir rotatoire spécifique) est une grandeur intrinsèque caractéristique d'un composé pur."
    ]},
    { test:/exc[èe]s [ée]nantiom[ée]rique|ee/i, replies:[
      "L'excès énantiomérique ee=|[α]mesuré|/|[α]pur|×100 mesure la pureté énantiomérique : 100% pour un énantiomère pur, 0% pour un racémique exact."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le point clé sur R/S vs +/−.",
      "Indice niveau 2 : ce n'est pas une relation systématique.",
      "Indice niveau 3 : elle doit être établie expérimentalement pour chaque molécule."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce que fait un mélange 50/50 sur la lumière polarisée.",
      "Indice niveau 2 : les rotations opposées des deux énantiomères s'annulent.",
      "Indice niveau 3 : donc ee=0%."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
STEREO_CHAPTERS[steKey("Analyse conformationnelle des molécules acycliques : éthane et butane")] = {
  objectives: [
    "Distinguer conformation et configuration",
    "Analyser l'énergie potentielle de rotation de l'éthane (conformations décalée et éclipsée)",
    "Analyser les conformations du butane et identifier le conflit gauche",
    "Construire un diagramme d'énergie en fonction de l'angle dièdre",
    "Évaluer pourquoi la conformation anti du butane, invisible sur une formule développée classique, détermine pourtant directement la représentation en zig-zag universellement utilisée pour dessiner les chaînes carbonées"
  ],
  prereqs: ["Représentations spatiales des molécules : Cram, Newman et Fischer"],
  bodyHtml: `
    <p>Jusque dans les années 1930, la plupart des chimistes organiciens considéraient une molécule comme une structure essentiellement figée, décrite entièrement par sa formule développée bidimensionnelle. C'est le chimiste britannique Derek Barton qui, dans les années 1950, démontre de façon rigoureuse que la réactivité chimique d'une molécule dépend intimement de sa conformation instantanée — et non pas seulement de sa configuration figée — ouvrant ainsi tout un champ d'étude nouveau, l'analyse conformationnelle, qui lui vaudra le prix Nobel de chimie en 1969. Cette révolution conceptuelle a permis de comprendre pourquoi certaines réactions se déroulent plus facilement dans une conformation particulière plutôt qu'une autre, une idée qui semble aujourd'hui une évidence mais qui a mis des décennies à s'imposer.</p>
    <p>Cette distinction entre configuration (fixe) et conformation (fluctuante), que ce chapitre te propose d'explorer sur les exemples les plus simples possibles — l'éthane et le butane —, est le socle sur lequel repose toute la compréhension moderne de la structure tridimensionnelle réelle des molécules en solution, bien au-delà de la simplification pratique d'une formule développée figée sur le papier.</p>
    <p>Contrairement à la <strong>configuration</strong> d'un centre stéréogène (fixée, ne peut changer que par rupture de liaisons), la <strong>conformation</strong> d'une molécule change librement et continûment par simple rotation autour des liaisons simples $\\sigma$, sans jamais rompre de liaison. Ce chapitre étudie l'énergétique de ces rotations, essentielle pour comprendre la structure tridimensionnelle réelle des molécules en solution. À la fin de ce chapitre, tu sauras construire le diagramme d'énergie complet d'une rotation moléculaire, et comprendre pourquoi certaines conformations sont statistiquement bien plus représentées que d'autres.</p>

    <h3>1. Configuration versus conformation</h3>
    <table class="mini-table">
      <tr><th>Notion</th><th>Comment elle change</th><th>Exemple</th></tr>
      <tr><td>Configuration</td><td>Uniquement par rupture puis reformation de liaisons</td><td>R ↔ S d'un centre stéréogène</td></tr>
      <tr><td>Conformation</td><td>Par simple rotation autour d'une liaison σ, sans rupture</td><td>Décalée ↔ éclipsée de l'éthane</td></tr>
    </table>

    <h3>2. L'éthane : conformations décalée et éclipsée</h3>
    <p>Pour l'éthane $\\text{CH}_3\\text{–CH}_3$, la rotation autour de la liaison C–C centrale fait varier l'angle dièdre $\\phi$ entre les hydrogènes de l'un et l'autre carbone. Deux conformations remarquables (représentées en projection de Newman, chapitre 1) se dégagent :</p>
    <table class="mini-table">
      <tr><th>Conformation</th><th>Angle dièdre</th><th>Énergie relative</th></tr>
      <tr><td>Décalée (staggered)</td><td>60° entre H voisins</td><td>Minimum d'énergie</td></tr>
      <tr><td>Éclipsée (eclipsed)</td><td>0° entre H voisins (alignés)</td><td>Maximum d'énergie local</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'origine de la barrière de rotation</span>
      La conformation éclipsée est environ <strong>12,5 kJ/mol</strong> plus haute en énergie que la conformation décalée pour l'éthane. Cette différence, relativement modeste (largement franchie à température ambiante par simple agitation thermique, donnant une rotation quasi libre à l'échelle macroscopique), provient essentiellement de la <strong>répulsion stérique et électronique</strong> entre les nuages électroniques des liaisons C–H voisines lorsqu'elles sont exactement superposées (interactions de type répulsion orbitalaire, parfois désignées sous le terme de « tension de torsion »).
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <line x1="10" y1="75" x2="150" y2="75" stroke="#5A6472" stroke-width="1"/>
          <path d="M 10 30 Q 40 15, 70 45 Q 100 15, 130 30 Q 145 40, 150 20" fill="none" stroke="#4C7CFF" stroke-width="1.6"/>
          <circle cx="10" cy="30" r="3" fill="#2DD4C4"/>
          <circle cx="70" cy="45" r="3" fill="#F0555C"/>
          <circle cx="130" cy="30" r="3" fill="#2DD4C4"/>
          <text x="0" y="88" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">décalée</text>
          <text x="60" y="60" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">éclipsée</text>
          <text x="120" y="88" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">décalée</text>
          <text x="4" y="12" font-family="IBM Plex Mono" font-size="7" fill="#EAF0FB">E</text>
        </svg>
        <span>Profil d'énergie de rotation de l'éthane (0° à 360°)</span>
      </div>
    </div>

    <h3>3. Le butane : le conflit gauche</h3>
    <p>Pour le butane $\\text{CH}_3\\text{–CH}_2\\text{–CH}_2\\text{–CH}_3$, l'analyse se complique : la rotation autour de la liaison C2–C3 centrale met en jeu non seulement des hydrogènes, mais aussi les deux groupes méthyles terminaux, volumineux. On distingue plusieurs conformations remarquables :</p>
    <table class="mini-table">
      <tr><th>Conformation</th><th>Angle dièdre (entre les 2 CH₃)</th><th>Énergie relative</th></tr>
      <tr><td>Anti (ou anti-périplanaire)</td><td>180°</td><td><strong>Minimum global</strong> — les deux CH₃ sont le plus éloignés possible</td></tr>
      <tr><td>Gauche (ou synclinale)</td><td>60°</td><td>Minimum local, plus élevé que l'anti (~3,8 kJ/mol de plus)</td></tr>
      <tr><td>Éclipsée (CH₃ sur CH₃)</td><td>0°</td><td>Maximum global — très défavorable</td></tr>
      <tr><td>Éclipsée (CH₃ sur H)</td><td>120°</td><td>Maximum local, moins défavorable que le précédent</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — le conflit gauche</span>
      La conformation <strong>gauche</strong> est plus haute en énergie que la conformation <strong>anti</strong> à cause du <strong>conflit gauche (gauche interaction)</strong> : la proximité spatiale des deux groupes méthyles volumineux, même en position décalée, crée une répulsion stérique supplémentaire absente dans la conformation anti où ils sont aussi éloignés que possible. Ce résultat se généralise : dans une chaîne carbonée, la conformation <strong>anti</strong> (zig-zag) est presque toujours la conformation la plus stable et la plus représentée en solution, ce qui explique pourquoi les chaînes alkyles longues sont usuellement représentées en zig-zag dans les formules topologiques.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi la population statistique du butane à température ambiante n'est-elle pas répartie de façon égale entre les conformations anti et gauche, malgré leur différence d'énergie relativement faible (~3,8 kJ/mol) ?</p>
      <p><strong>Solution :</strong> La distribution de Boltzmann relie les populations relatives des deux conformères à leur différence d'énergie : $\\dfrac{N_{\\text{gauche}}}{N_{\\text{anti}}} = e^{-\\Delta E/RT}$. À température ambiante ($RT\\approx2{,}5$ kJ/mol), avec $\\Delta E\\approx3{,}8$ kJ/mol, ce rapport vaut $e^{-1{,}5}\\approx0{,}22$ — la conformation anti reste donc nettement majoritaire, bien qu'une fraction significative de molécules occupe malgré tout la conformation gauche.</p>
      <p class="example-answer">Réponse : la distribution de Boltzmann, exponentiellement sensible à la différence d'énergie relative à $RT$, favorise fortement mais pas exclusivement la conformation anti, plus stable.</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La représentation en zig-zag, universellement utilisée pour dessiner les chaînes carbonées longues dans les formules topologiques, correspond très exactement à une succession de liaisons en conformation anti. Pourquoi cette convention de dessin, en apparence purement esthétique, reflète-t-elle en réalité une information physique précise sur la conformation la plus stable et la plus représentée statistiquement de la molécule réelle ?
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>L'analyse conformationnelle initiée par Derek Barton reste aujourd'hui un pilier de la biologie structurale moderne : la conformation exacte d'une protéine — son repliement tridimensionnel précis, résultant de millions de rotations conformationnelles individuelles le long de sa chaîne d'acides aminés — détermine entièrement sa fonction biologique, et un mauvais repliement peut être à l'origine de maladies graves (comme la maladie d'Alzheimer, liée à un mauvais repliement de certaines protéines). Les outils de prédiction de structure protéique par intelligence artificielle, comme AlphaFold, reposent en dernière analyse sur les mêmes principes d'analyse conformationnelle que ceux appliqués ici à l'éthane et au butane, mais à une échelle de complexité incomparablement plus grande.</p>
    <p><strong>Question ouverte :</strong> peut-on prédire avec une précision suffisante, par le seul calcul, la conformation la plus stable de molécules flexibles bien plus complexes qu'un simple butane, comportant des dizaines de liaisons rotatives simultanées, sans avoir besoin d'une confirmation expérimentale ? C'est un défi majeur de la chimie computationnelle moderne.</p>
    <p><strong>Technologie émergente :</strong> les simulations de dynamique moléculaire à grande échelle, qui suivent numériquement l'évolution conformationnelle de molécules complexes (protéines, polymères) au cours du temps, permettent aujourd'hui de visualiser directement les transitions entre conformères et d'identifier les états les plus stables sans expérience physique directe.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Rotation autour d'une liaison σ (sans rupture) → éthane : décalée (min) / éclipsée (max), barrière ~12,5 kJ/mol → butane : anti (min global) / gauche (min local, conflit gauche) / éclipsées (max) → distribution de Boltzmann des populations réelles
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\frac{N_{\\text{gauche}}}{N_{\\text{anti}}} = e^{-\\Delta E/RT}$$
      Cette distribution de Boltzmann, appliquée ici à un cas aussi simple que le butane, est le même principe statistique qui gouverne, à une échelle bien plus vaste, la conformation la plus probable de n'importe quelle molécule flexible — des chaînes carbonées les plus simples jusqu'aux protéines les plus complexes du vivant.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La conformation change par simple rotation autour d'une liaison σ (sans rupture de liaison), contrairement à la configuration</li>
      <li>Pour l'éthane, la conformation décalée (minimum) est environ 12,5 kJ/mol plus stable que l'éclipsée (maximum)</li>
      <li>Pour le butane, l'ordre de stabilité est : anti (minimum global) > gauche (minimum local) > éclipsées (maxima)</li>
      <li>Le conflit gauche explique pourquoi la conformation gauche, bien que décalée, reste moins stable que l'anti</li>
      <li>La distribution de Boltzmann détermine la population relative des conformères à une température donnée</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre configuration (fixe, nécessite rupture de liaison) et conformation (change librement par rotation)</li>
      <li>Croire que toutes les conformations décalées sont d'énergie égale — le conflit gauche les différencie pour le butane</li>
      <li>Oublier que la rotation, bien que présentant une barrière énergétique, reste généralement rapide à température ambiante (interconversion continue)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La conformation la plus stable du butane est :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste5e1" value="wrong">Éclipsée CH₃ sur CH₃</label>
        <label class="option"><input type="radio" name="ste5e1" value="wrong">Gauche</label>
        <label class="option"><input type="radio" name="ste5e1" value="right">Anti</label>
        <label class="option"><input type="radio" name="ste5e1" value="wrong">Toutes les conformations ont la même énergie</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste5e1','ste5fb1','Correct — la conformation anti (180°) est le minimum global d\\'énergie pour le butane.','Relis le tableau des conformations du butane et leur énergie relative.')">Vérifier</button>
      <div class="feedback" id="ste5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Le conflit gauche est dû à :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste5e2" value="wrong">La rupture d'une liaison covalente</label>
        <label class="option"><input type="radio" name="ste5e2" value="right">La proximité spatiale de deux groupes volumineux, même en conformation décalée</label>
        <label class="option"><input type="radio" name="ste5e2" value="wrong">Une différence de configuration R/S</label>
        <label class="option"><input type="radio" name="ste5e2" value="wrong">Un défaut expérimental de mesure</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste5e2','ste5fb2','Correct — c\\'est bien la proximité stérique de deux groupes volumineux en conformation décalée gauche qui cause cette déstabilisation.','Relis le point clé sur l\\'origine du conflit gauche.')">Vérifier</button>
      <div class="feedback" id="ste5fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si la rotation autour des liaisons σ nécessitait de rompre puis reformer une liaison (comme pour changer une configuration) : les molécules organiques auraient-elles encore la flexibilité qu'on leur connaît aujourd'hui ?</li>
      <li>Pourquoi Derek Barton a-t-il dû attendre les années 1950 pour établir rigoureusement le lien entre conformation et réactivité chimique, alors que la notion de rotation autour d'une liaison était déjà connue depuis longtemps ?</li>
      <li>Quelle serait la conséquence, pour la biologie structurale, d'une méthode capable de prédire avec certitude absolue la conformation la plus stable de n'importe quelle protéine à partir de sa seule séquence d'acides aminés ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>D. H. R. Barton, « The Conformation of the Steroid Nucleus », Experientia, 1950 — l'article fondateur de l'analyse conformationnelle moderne (prix Nobel de chimie 1969).</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur l'analyse conformationnelle en licence.</li>
      <li>J. Jumper et al., « Highly Accurate Protein Structure Prediction with AlphaFold », Nature, 2021 — application moderne de l'analyse conformationnelle à la prédiction de structure protéique.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais construire le diagramme d'énergie complet d'une rotation moléculaire, et comprendre pourquoi certaines conformations dominent statistiquement une population de molécules en solution. Le chapitre suivant, « Conformations du cyclohexane et de ses dérivés substitués », va complexifier cette analyse en explorant ce qui se passe lorsque la chaîne carbonée se referme sur elle-même en un cycle. Comme le rappelle l'héritage de Derek Barton, dont la découverte a longtemps semblé une évidence rétrospective mais a nécessité des décennies pour s'imposer : comprendre qu'une molécule « respire » et change constamment de forme, plutôt que de rester figée comme sur le papier, a révolutionné toute notre compréhension de la réactivité chimique.</p>
  `
};
STEREO_NOVA_KB[steKey("Analyse conformationnelle des molécules acycliques : éthane et butane")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'analyse conformationnelle : éthane, butane, conflit gauche. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/configuration.*conformation|conformation.*configuration/i, replies:[
      "Configuration = fixe, change seulement par rupture de liaison (R↔S). Conformation = change librement par simple rotation autour d'une liaison σ."
    ]},
    { test:/[ée]thane|d[ée]cal[ée]e|[ée]clips[ée]e/i, replies:[
      "Pour l'éthane : conformation décalée (60°, minimum) vs éclipsée (0°, maximum, environ 12,5 kJ/mol plus haute), due à la répulsion entre nuages électroniques des liaisons C-H voisines."
    ]},
    { test:/butane|conflit gauche|anti/i, replies:[
      "Pour le butane : anti (180°, minimum global) > gauche (60°, minimum local, conflit gauche) > éclipsées (maxima). Le conflit gauche vient de la proximité des deux CH₃ même en position décalée."
    ]},
    { test:/boltzmann|distribution/i, replies:[
      "La distribution de Boltzmann N_gauche/N_anti=e^(−ΔE/RT) détermine la proportion de chaque conformère à une température donnée — à température ambiante, l'anti reste majoritaire mais pas exclusif."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le tableau des conformations du butane par ordre d'énergie.",
      "Indice niveau 2 : ce n'est ni une conformation éclipsée, ni gauche.",
      "Indice niveau 3 : c'est la conformation anti, minimum global."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce qui distingue gauche d'anti, tous deux décalés.",
      "Indice niveau 2 : ce n'est pas une question de configuration ni de mesure.",
      "Indice niveau 3 : c'est la proximité spatiale des deux CH₃ en conformation gauche."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
STEREO_CHAPTERS[steKey("Conformations du cyclohexane et de ses dérivés substitués")] = {
  objectives: [
    "Justifier pourquoi le cyclohexane adopte préférentiellement une conformation chaise",
    "Distinguer positions axiales et équatoriales sur le cyclohexane",
    "Analyser l'interconversion chaise-chaise et ses conséquences sur un cyclohexane monosubstitué",
    "Appliquer l'analyse conformationnelle à un cyclohexane disubstitué",
    "Évaluer pourquoi les stéroïdes naturels, bâtis sur un enchaînement de plusieurs cycles à six chaînons, adoptent presque systématiquement une géométrie où chaque cycle est en conformation chaise plutôt que dans une forme moins stable"
  ],
  prereqs: ["Analyse conformationnelle des molécules acycliques : éthane et butane"],
  bodyHtml: `
    <p>Les stéroïdes naturels — cholestérol, hormones sexuelles, cortisone — partagent tous une architecture moléculaire remarquable : un enchaînement de quatre cycles fusionnés, dont trois cycles à six chaînons adoptant systématiquement, dans l'immense majorité des cas, la conformation chaise la plus stable étudiée dans ce chapitre. Cette régularité structurale n'a rien d'un hasard : c'est très exactement la même logique énergétique — absence de tension angulaire et de tension de torsion — qui gouverne aussi bien le simple cyclohexane que ces molécules biologiques parmi les plus sophistiquées de la Nature.</p>
    <p>Comprendre l'analyse conformationnelle du cyclohexane, loin d'être un exercice académique isolé, te donne donc directement les clés pour appréhender la structure tridimensionnelle des stéroïdes, des sucres cycliques (comme le glucose, présent sous forme de cycle à six chaînons en solution) et de nombreuses autres molécules naturelles essentielles à la biochimie du vivant.</p>
    <p>Le cyclohexane $\\text{C}_6\\text{H}_{12}$ constitue le cas d'école incontournable de l'analyse conformationnelle des systèmes cycliques, avec des conséquences directes sur la réactivité et la stabilité de très nombreuses molécules naturelles (stéroïdes, sucres cycliques). À la fin de ce chapitre, tu sauras prédire, pour n'importe quel cyclohexane substitué, quelle conformation chaise sera la plus stable et pourquoi.</p>

    <h3>1. Pourquoi le cyclohexane n'est pas plan</h3>
    <p>Une structure hexagonale <strong>plane</strong> imposerait des angles de liaison C–C–C de 120°, très éloignés de l'angle tétraédrique idéal de 109,5° (hybridation sp³) — une source majeure de <strong>tension angulaire</strong>. Le cyclohexane évite cette tension en adoptant des conformations <strong>non planes</strong>, dont la plus stable est de loin la conformation <strong>chaise</strong>.</p>

    <h3>2. La conformation chaise : angles et positions</h3>
    <p>Dans la conformation <strong>chaise</strong>, tous les angles de liaison C–C–C valent exactement 109,5° (aucune tension angulaire), et tous les hydrogènes voisins sont en position <strong>décalée</strong> les uns par rapport aux autres (aucune tension de torsion, chapitre 5) : c'est la conformation la plus stable, totalement dépourvue de tension.</p>
    <p>Chaque atome de carbone du cycle porte deux hydrogènes (ou substituants) dans des orientations géométriquement distinctes :</p>
    <table class="mini-table">
      <tr><th>Position</th><th>Orientation</th></tr>
      <tr><td><strong>Axiale</strong></td><td>Parallèle à l'axe de symétrie du cycle (perpendiculaire au « plan moyen » du cycle), alternant vers le haut et le bas d'un carbone à l'autre</td></tr>
      <tr><td><strong>Équatoriale</strong></td><td>Pointant approximativement vers l'extérieur du cycle, dans une direction proche du plan moyen</td></tr>
    </table>
    <p>Chaque carbone porte toujours <strong>une</strong> position axiale et <strong>une</strong> position équatoriale (jamais deux du même type).</p>

    <h3>3. L'interconversion chaise-chaise</h3>
    <p>Le cyclohexane n'est pas figé dans une seule conformation chaise : il subit une <strong>interconversion conformationnelle</strong> rapide (à température ambiante, plusieurs milliers de fois par seconde) entre deux conformations chaises équivalentes, en passant par des conformations intermédiaires de plus haute énergie (bateau, demi-chaise, torsadée — dépassant le cadre de ce chapitre introductif).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'interconversion inverse axial et équatorial</span>
      Lors de cette interconversion chaise-chaise, <strong>toutes</strong> les positions axiales de la première chaise deviennent des positions <strong>équatoriales</strong> dans la seconde chaise, et réciproquement. Pour un cyclohexane <strong>monosubstitué</strong>, cela signifie que le substituant unique alterne en permanence entre position axiale et équatoriale au fil du temps, mais le système favorise très largement — de façon statistique et thermodynamique — la conformation où le substituant se trouve en position <strong>équatoriale</strong>.
    </div>

    <h3>4. Pourquoi la position équatoriale est favorisée</h3>
    <p>Un substituant en position <strong>axiale</strong> subit des interactions stériques répulsives supplémentaires avec les deux autres substituants axiaux situés sur les carbones en position 1,3 (et 1,5) du même côté du cycle — les <strong>interactions 1,3-diaxiales</strong>. Un substituant en position <strong>équatoriale</strong> évite ces répulsions, ce qui rend cette position systématiquement plus stable pour un substituant volumineux.</p>
    <table class="mini-table">
      <tr><th>Substituant</th><th>Préférence équatoriale (énergie relative axial/équatorial)</th></tr>
      <tr><td>–CH₃ (méthyle)</td><td>~7,3 kJ/mol</td></tr>
      <tr><td>–OH (hydroxyle)</td><td>~2,1 kJ/mol</td></tr>
      <tr><td>–C(CH₃)₃ (<em>tert</em>-butyle)</td><td>~ 23 kJ/mol (préférence extrêmement forte)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — le groupe tert-butyle « bloque » le cycle</span>
      Le groupe <em>tert</em>-butyle, particulièrement volumineux, présente une préférence si forte pour la position équatoriale que, dans un cyclohexane portant ce groupe, la molécule adopte pratiquement <strong>exclusivement</strong> la conformation chaise où il est équatorial — un tel substituant est qualifié de « groupe bloquant » conformationnel, très utile en synthèse pour contrôler la stéréochimie relative d'autres substituants portés par le même cycle.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour le méthylcyclohexane, la différence d'énergie axial/équatorial est d'environ 7,3 kJ/mol. Estimer, à température ambiante ($RT\\approx2{,}5$ kJ/mol), la proportion approximative de conformère avec le méthyle en position axiale.</p>
      <p><strong>Solution :</strong> D'après la distribution de Boltzmann (chapitre 5) : $\\dfrac{N_{axial}}{N_{[axial]+[équatorial]}} = \\dfrac{1}{1+e^{+\\Delta E/RT}}$ avec $\\Delta E/RT \\approx 7{,}3/2{,}5 \\approx 2{,}9$, donnant $e^{2{,}9}\\approx18{,}2$, donc $N_{axial}/N_{total} \\approx 1/19{,}2 \\approx 5\\%$.</p>
      <p class="example-answer">Réponse : environ 5 % seulement des molécules ont le méthyle en position axiale à l'équilibre — la position équatoriale domine très largement (~95 %).</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Pour un cyclohexane disubstitué, chaque substituant « veut » individuellement être équatorial, mais cela n'est pas toujours possible simultanément selon leur position relative sur le cycle (1,2 ; 1,3 ; ou 1,4) et leur relation cis ou trans. En repensant à l'interconversion chaise-chaise qui inverse systématiquement axial et équatorial, pourquoi certains isomères disubstitués peuvent-ils avoir les deux substituants équatoriaux dans une seule des deux conformations chaises possibles, tandis que d'autres isomères n'y parviennent jamais, quelle que soit la conformation adoptée ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>L'analyse conformationnelle du cyclohexane, en apparence un exercice de licence élémentaire, reste directement pertinente pour la recherche pharmaceutique de pointe : la conformation exacte adoptée par un cycle à six chaînons au sein d'une molécule médicamenteuse peut déterminer si elle s'insère correctement dans le site actif d'une protéine cible, un facteur crucial pour l'efficacité thérapeutique. Les biochimistes structuraux étudient également comment les sucres cycliques (comme le glucose) adoptent leur conformation chaise préférentielle, une information essentielle pour comprendre comment les enzymes reconnaissent et transforment ces molécules dans le métabolisme cellulaire.</p>
    <p><strong>Question ouverte :</strong> peut-on prédire systématiquement, par le seul calcul de chimie quantique, la conformation chaise préférentielle de cyclohexanes portant des combinaisons complexes de plusieurs substituants différents, sans recourir à une confirmation expérimentale par RMN ou diffraction des rayons X ? C'est un test de référence pour les méthodes de modélisation moléculaire computationnelle.</p>
    <p><strong>Technologie émergente :</strong> les techniques de RMN à très haut champ, couplées à des calculs de modélisation moléculaire, permettent aujourd'hui de déterminer avec précision la population relative des différentes conformations chaises d'un cyclohexane substitué en solution, confirmant expérimentalement les prédictions énergétiques théoriques.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Cyclohexane plan hypothétique (tension angulaire à 120°) → conformation chaise (109,5°, sans tension) → positions axiale/équatoriale alternées → interconversion chaise-chaise → substituant volumineux préférentiellement équatorial (interactions 1,3-diaxiales évitées)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\frac{N_{axial}}{N_{total}} = \\frac{1}{1+e^{\\Delta E/RT}}$$
      Cette relation, déjà rencontrée sous une forme voisine au chapitre précédent pour le butane, permet de quantifier précisément la population relative des conformères axial et équatorial d'un cyclohexane substitué — et explique pourquoi un simple groupe tert-butyle peut, à lui seul, verrouiller quasi totalement la géométrie de tout un cycle.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le cyclohexane adopte préférentiellement la conformation chaise, sans tension angulaire (109,5°) ni tension de torsion (tout décalé)</li>
      <li>Chaque carbone porte une position axiale et une position équatoriale, jamais deux du même type</li>
      <li>L'interconversion chaise-chaise inverse systématiquement axial et équatorial pour chaque substituant</li>
      <li>Un substituant préfère la position équatoriale pour éviter les interactions 1,3-diaxiales défavorables ; cette préférence croît avec l'encombrement du substituant</li>
      <li>Un groupe tert-butyle, très volumineux, bloque quasi exclusivement le cycle en conformation équatoriale</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que le cyclohexane est une molécule plane — sa conformation chaise est non planaire, précisément pour éviter la tension angulaire</li>
      <li>Penser qu'un carbone du cycle peut porter deux substituants axiaux ou deux équatoriaux simultanément — c'est toujours un de chaque</li>
      <li>Oublier que l'interconversion chaise-chaise inverse les positions axiale et équatoriale de chaque substituant</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi la conformation chaise du cyclohexane est-elle la plus stable ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste6e1" value="wrong">Parce qu'elle est plane</label>
        <label class="option"><input type="radio" name="ste6e1" value="right">Parce qu'elle est exempte de tension angulaire et de tension de torsion</label>
        <label class="option"><input type="radio" name="ste6e1" value="wrong">Parce que tous ses hydrogènes sont éclipsés</label>
        <label class="option"><input type="radio" name="ste6e1" value="wrong">Par pure convention historique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste6e1','ste6fb1','Correct — angles à 109,5° (pas de tension angulaire) et hydrogènes tous décalés (pas de tension de torsion) expliquent sa stabilité maximale.','Relis les deux raisons de la stabilité de la conformation chaise.')">Vérifier</button>
      <div class="feedback" id="ste6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un substituant volumineux comme le tert-butyle préfère très fortement la position :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste6e2" value="wrong">Axiale</label>
        <label class="option"><input type="radio" name="ste6e2" value="right">Équatoriale</label>
        <label class="option"><input type="radio" name="ste6e2" value="wrong">Les deux également</label>
        <label class="option"><input type="radio" name="ste6e2" value="wrong">Cela dépend uniquement de la température</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste6e2','ste6fb2','Correct — le tert-butyle, très volumineux, évite fortement les interactions 1,3-diaxiales en restant équatorial.','Relis le point clé sur le tert-butyle comme groupe bloquant.')">Vérifier</button>
      <div class="feedback" id="ste6fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si le cyclohexane était contraint de rester plan (par exemple dans un environnement extrêmement rigide) : quelles conséquences cela aurait-il sur sa stabilité et sa réactivité ?</li>
      <li>Pourquoi les stéroïdes naturels, avec leurs multiples cycles fusionnés, adoptent-ils presque systématiquement des conformations chaises plutôt que d'autres formes possibles comme le bateau ?</li>
      <li>Quelle serait la conséquence, pour la conception de médicaments, d'une méthode fiable pour verrouiller à volonté la conformation d'un cycle à six chaînons dans une molécule complexe ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>D. H. R. Barton, « The Conformation of the Steroid Nucleus », Experientia, 1950 — application pionnière de l'analyse conformationnelle aux stéroïdes.</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur les conformations du cyclohexane en licence.</li>
      <li>E. L. Eliel, S. H. Wilen, <em>Stereochemistry of Organic Compounds</em>, Wiley, 1994 — traité de référence exhaustif sur l'analyse conformationnelle.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais prédire, pour n'importe quel cyclohexane substitué, quelle conformation chaise sera la plus stable — une compétence directement transposable à la compréhension des stéroïdes et des sucres cycliques. Le chapitre suivant, « Stéréochimie des alcènes : isomérie Z/E », va revenir à une notion de configuration figée, cette fois pour les doubles liaisons, complétant ainsi le panorama complet de la stéréochimie organique. Comme le rappelle l'omniprésence de la conformation chaise dans les stéroïdes naturels : une même règle énergétique simple, une fois comprise sur la molécule la plus élémentaire possible, éclaire la structure des molécules biologiques les plus sophistiquées.</p>
  `
};
STEREO_NOVA_KB[steKey("Conformations du cyclohexane et de ses dérivés substitués")] = {
  intro: "Salut, moi c'est Nova ! On étudie le cyclohexane : conformation chaise, positions axiale/équatoriale, interconversion. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/chaise/i, replies:[
      "La conformation chaise du cyclohexane est la plus stable : angles C-C-C à 109,5° (pas de tension angulaire) et hydrogènes tous décalés (pas de tension de torsion)."
    ]},
    { test:/axiale|[ée]quatoriale/i, replies:[
      "Chaque carbone du cyclohexane porte une position axiale (parallèle à l'axe du cycle) et une équatoriale (vers l'extérieur) — jamais deux du même type."
    ]},
    { test:/interconversion|1,3.diaxial/i, replies:[
      "L'interconversion chaise-chaise inverse axial et équatorial pour chaque substituant. Un substituant préfère l'équatorial pour éviter les interactions 1,3-diaxiales."
    ]},
    { test:/tert.butyle|groupe bloquant/i, replies:[
      "Le tert-butyle, très volumineux, préfère si fortement l'équatorial (~23 kJ/mol) qu'il bloque quasi exclusivement le cycle dans cette conformation — un 'groupe bloquant' utile en synthèse."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense aux deux types de tension évitées par la chaise.",
      "Indice niveau 2 : ce n'est pas une question de planéité.",
      "Indice niveau 3 : c'est l'absence de tension angulaire ET de tension de torsion."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense aux interactions 1,3-diaxiales pour un gros substituant.",
      "Indice niveau 2 : la position axiale expose à ces répulsions.",
      "Indice niveau 3 : donc la position équatoriale est fortement préférée."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
STEREO_CHAPTERS[steKey("Stéréochimie des alcènes : isomérie Z/E")] = {
  objectives: [
    "Justifier le blocage de la rotation autour d'une double liaison C=C",
    "Appliquer les règles CIP pour attribuer la configuration Z ou E d'un alcène disubstitué",
    "Distinguer l'ancienne nomenclature cis/trans de la nomenclature Z/E, et leurs limites respectives",
    "Relier la configuration d'un alcène à ses propriétés physiques",
    "Évaluer pourquoi les margarines et graisses hydrogénées industrielles, autrefois présentées comme une alternative saine au beurre, se sont révélées poser un problème de santé publique majeur lié précisément à leur configuration géométrique"
  ],
  prereqs: ["Chiralité et énantiomérie : configuration R/S"],
  bodyHtml: `
    <p>Dans les années 1990, des études épidémiologiques de grande ampleur révèlent un lien alarmant entre la consommation d'acides gras trans (de configuration E) — produits industriellement par hydrogénation partielle d'huiles végétales pour fabriquer margarines et graisses de cuisson — et un risque accru de maladies cardiovasculaires. Cette découverte, qui a bouleversé les recommandations nutritionnelles mondiales et conduit à l'interdiction ou la limitation stricte de ces graisses trans dans de nombreux pays, illustre de façon spectaculaire comment une simple différence de configuration géométrique — Z contre E, un « coude » dans la chaîne carbonée contre une géométrie linéaire — peut avoir des conséquences considérables sur la santé humaine.</p>
    <p>Cette histoire, aussi préoccupante qu'instructive, montre que la stéréochimie n'est jamais une abstraction réservée aux laboratoires universitaires : elle façonne directement notre alimentation quotidienne, la texture du beurre par rapport à une huile liquide, et jusqu'aux risques cardiovasculaires associés à certains régimes alimentaires. Ce chapitre te donne les outils rigoureux pour nommer et comprendre cette isomérie géométrique, aux conséquences si concrètes.</p>
    <p>Contrairement à la libre rotation autour d'une liaison simple $\\sigma$ (chapitre 5), la rotation autour d'une <strong>double liaison</strong> C=C est <strong>bloquée</strong> à température ordinaire, ce qui engendre une nouvelle forme de stéréoisomérie, distincte de la chiralité des centres stéréogènes. À la fin de ce chapitre, tu sauras attribuer sans ambiguïté la configuration Z ou E de n'importe quel alcène, et comprendre pourquoi cette configuration a des conséquences physiques et même nutritionnelles bien réelles.</p>

    <h3>1. Pourquoi la rotation est-elle bloquée ?</h3>
    <p>Une double liaison C=C est constituée d'une liaison $\\sigma$ et d'une liaison $\\pi$, cette dernière résultant du recouvrement latéral de deux orbitales $p$ non hybridées, perpendiculaires au plan formé par les liaisons $\\sigma$. Une rotation de 90° autour de l'axe C=C romprait ce recouvrement $\\pi$ (les deux orbitales $p$ deviendraient parallèles à l'axe de rotation, sans recouvrement latéral possible) — un coût énergétique considérable (de l'ordre de 250 kJ/mol pour un alcène simple), bien supérieur à l'énergie thermique disponible à température ambiante. La rotation autour d'une double liaison est donc, en pratique, totalement bloquée dans les conditions usuelles.</p>

    <h3>2. Isomérie géométrique : deux stéréoisomères distincts</h3>
    <p>Pour un alcène disubstitué de type $\\text{R}_1\\text{R}_2\\text{C=CR}_3\\text{R}_4$ (chaque carbone sp² portant deux substituants différents), le blocage de la rotation autorise <strong>deux</strong> arrangements géométriquement distincts et non interconvertibles sans rupture de la liaison $\\pi$ — deux <strong>stéréoisomères de configuration</strong>, appelés isomères géométriques (ou isomères cis/trans, historiquement).</p>

    <h3>3. La nomenclature Z/E (Cahn-Ingold-Prelog)</h3>
    <p>Pour nommer sans ambiguïté ces isomères, on applique les règles CIP (chapitre 2) <strong>séparément</strong> sur chacun des deux carbones sp² de la double liaison : on détermine, sur chaque carbone, quel substituant est prioritaire.</p>
    <table class="mini-table">
      <tr><th>Configuration</th><th>Critère</th></tr>
      <tr><td><strong>Z</strong> (de l'allemand <em>zusammen</em>, ensemble)</td><td>Les deux substituants prioritaires (un sur chaque carbone) sont du <strong>même côté</strong> de la double liaison</td></tr>
      <tr><td><strong>E</strong> (de l'allemand <em>entgegen</em>, opposé)</td><td>Les deux substituants prioritaires sont de <strong>part et d'autre</strong> de la double liaison</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — Z/E n'est pas toujours équivalent à cis/trans</span>
      L'ancienne nomenclature <strong>cis</strong> (substituants identiques du même côté) et <strong>trans</strong> (de part et d'autre) reste utilisable pour les alcènes <strong>disubstitués simples</strong> (deux substituants identiques et deux hydrogènes), où elle coïncide généralement avec Z/E. Mais dès que les quatre substituants sont <strong>tous différents</strong>, cis/trans devient ambigu ou trompeur (rien ne dit lesquels des quatre substituants comparer), tandis que Z/E, fondée sur les règles de priorité CIP rigoureuses, reste toujours applicable sans ambiguïté — c'est pourquoi Z/E est la nomenclature systématique recommandée en toute généralité.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour le 1-bromo-1-chloropropène $\\text{BrClC=CH–CH}_3$, déterminer la configuration Z ou E, sachant que sur le premier carbone les substituants sont Br et Cl, et sur le second H et CH₃.</p>
      <p><strong>Solution :</strong> Sur le premier carbone, Br (numéro atomique 35) est prioritaire sur Cl (17). Sur le second carbone, CH₃ (carbone) est prioritaire sur H. Si Br et CH₃ (les deux substituants prioritaires) sont du même côté de la double liaison, la configuration est Z ; s'ils sont de part et d'autre, elle est E — il faut examiner la structure précise (schéma ou modèle) pour trancher entre les deux cas selon l'isomère considéré.</p>
      <p class="example-answer">Réponse : la méthode consiste toujours à identifier le substituant prioritaire sur chaque carbone (ici Br et CH₃), puis à observer leur position relative — même côté = Z, côtés opposés = E.</p>
    </div>

    <h3>4. Conséquences physiques de la stéréochimie des alcènes</h3>
    <p>Les isomères Z et E d'un même alcène possèdent des propriétés physiques <strong>différentes</strong> (ce sont des diastéréoisomères au sens large, chapitre 3) : point de fusion, point d'ébullition, moment dipolaire et réactivité chimique diffèrent, parfois de façon significative. Un exemple emblématique est celui des acides gras insaturés : la configuration <strong>Z</strong> (naturellement majoritaire dans les graisses alimentaires) introduit un « coude » dans la chaîne carbonée qui abaisse le point de fusion (huiles liquides à température ambiante), tandis que la configuration <strong>E</strong> (acides gras « trans », produits notamment par hydrogénation partielle industrielle) donne une chaîne plus linéaire, avec un point de fusion plus élevé — une différence aux implications nutritionnelles bien documentées.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'hydrogénation partielle industrielle d'huiles végétales, censée initialement produire une alternative pratique et stable au beurre, convertit accidentellement une partie des doubles liaisons Z naturelles en configuration E — c'est cette conversion géométrique, et non l'hydrogénation en elle-même, qui est à l'origine du problème de santé publique des acides gras trans. Pourquoi un simple changement de géométrie autour d'une double liaison, sans aucun changement de la formule brute de la molécule, peut-il avoir des conséquences aussi importantes sur le métabolisme humain ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La découverte du lien entre acides gras trans et maladies cardiovasculaires, principalement due aux travaux épidémiologiques menés dans les années 1990, a conduit à des réglementations strictes dans de nombreux pays (interdiction quasi totale aux États-Unis depuis 2018, limitations sévères dans l'Union européenne). Les chercheurs en science des aliments développent aujourd'hui des méthodes d'hydrogénation catalytique plus sélective, capables de saturer les doubles liaisons sans provoquer leur isomérisation Z vers E, pour produire des graisses solides à température ambiante sans les risques associés aux acides gras trans.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des procédés industriels de modification des huiles végétales offrant la texture et la stabilité recherchées par l'industrie agroalimentaire, sans jamais provoquer d'isomérisation Z/E indésirable ? C'est un enjeu de recherche actif en chimie et technologie alimentaire.</p>
    <p><strong>Technologie émergente :</strong> les procédés d'interestérification enzymatique, qui réarrangent la structure des triglycérides sans passer par une hydrogénation chimique classique, sont développés comme alternative aux méthodes traditionnelles de production de graisses solides, évitant ainsi tout risque de formation d'acides gras trans.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Double liaison C=C (liaison π, recouvrement latéral p-p) → rotation bloquée (~250 kJ/mol) → deux isomères géométriques distincts → configuration Z ou E (règles CIP, séparément sur chaque carbone) → propriétés physiques et biologiques différentes
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Substituants prioritaires même côté} = Z \\qquad \\text{Substituants prioritaires côtés opposés} = E$$
      Cette règle, fondée directement sur les priorités CIP déjà rencontrées au chapitre 2, permet de nommer sans la moindre ambiguïté n'importe quel alcène disubstitué complexe — contrairement à l'ancienne nomenclature cis/trans, qui devient rapidement insuffisante dès que les quatre substituants de la double liaison sont tous différents.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La rotation autour d'une double liaison C=C est bloquée (rupture du recouvrement π nécessaire, ~250 kJ/mol), créant une isomérie géométrique</li>
      <li>La configuration Z (substituants prioritaires du même côté) ou E (de part et d'autre) s'attribue par les règles CIP appliquées séparément sur chaque carbone sp²</li>
      <li>Cis/trans reste utilisable pour les alcènes disubstitués simples, mais devient ambigu dès que les 4 substituants sont différents — Z/E est toujours non ambiguë</li>
      <li>Les isomères Z et E ont des propriétés physiques différentes (exemple emblématique : acides gras cis/Z vs trans/E)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Assimiler systématiquement Z à cis et E à trans — ce n'est vrai que pour les alcènes disubstitués les plus simples</li>
      <li>Oublier d'appliquer les règles CIP séparément sur chacun des deux carbones de la double liaison</li>
      <li>Croire que la rotation autour d'une double liaison est possible à température ambiante, comme pour une liaison simple</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi la rotation autour d'une double liaison C=C est-elle bloquée à température ambiante ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste7e1" value="wrong">Parce que les carbones sp² sont trop volumineux</label>
        <label class="option"><input type="radio" name="ste7e1" value="right">Parce qu'une rotation romprait le recouvrement latéral des orbitales p formant la liaison π</label>
        <label class="option"><input type="radio" name="ste7e1" value="wrong">Parce que la liaison σ empêche toute rotation</label>
        <label class="option"><input type="radio" name="ste7e1" value="wrong">Ce n'est vrai qu'à basse température</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste7e1','ste7fb1','Correct — le coût énergétique de rupture du recouvrement π (~250 kJ/mol) bloque la rotation dans les conditions usuelles.','Relis l\\'explication du blocage de rotation en début de chapitre.')">Vérifier</button>
      <div class="feedback" id="ste7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">La nomenclature cis/trans devient ambiguë ou insuffisante lorsque :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste7e2" value="wrong">L'alcène est terminal</label>
        <label class="option"><input type="radio" name="ste7e2" value="right">Les quatre substituants du carbone sp² sont tous différents</label>
        <label class="option"><input type="radio" name="ste7e2" value="wrong">Elle n'est jamais ambiguë</label>
        <label class="option"><input type="radio" name="ste7e2" value="wrong">L'alcène est cyclique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste7e2','ste7fb2','Correct — dès que les 4 substituants sont différents, cis/trans ne précise plus lesquels comparer, contrairement à Z/E.','Relis le point clé sur les limites de la nomenclature cis/trans.')">Vérifier</button>
      <div class="feedback" id="ste7fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si la rotation autour d'une double liaison C=C était aussi libre que celle autour d'une liaison simple : l'isomérie Z/E existerait-elle encore, et quelles conséquences cela aurait-il pour la structure des graisses naturelles ?</li>
      <li>Pourquoi a-t-il fallu attendre les années 1990 pour établir le lien entre acides gras trans et maladies cardiovasculaires, alors que ces graisses étaient déjà largement consommées depuis des décennies ?</li>
      <li>Quelle serait la conséquence, pour l'industrie agroalimentaire mondiale, d'une interdiction totale et immédiate de toute hydrogénation partielle sans alternative technologique déjà disponible à grande échelle ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W. C. Willett et al., « Intake of Trans Fatty Acids and Risk of Coronary Heart Disease Among Women », The Lancet, 1993 — l'une des études épidémiologiques fondatrices sur les risques des acides gras trans.</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur la stéréochimie des alcènes en licence.</li>
      <li>FDA (Food and Drug Administration), <em>Final Determination Regarding Partially Hydrogenated Oils</em>, 2015 — décision réglementaire américaine sur l'interdiction des acides gras trans industriels.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais attribuer sans ambiguïté la configuration Z ou E de n'importe quel alcène, et comprendre pourquoi cette simple différence géométrique a des conséquences allant de la texture d'une graisse jusqu'aux risques cardiovasculaires. Le dernier chapitre de ce module, « Stéréochimie et réactivité : introduction à la stéréospécificité », va rassembler l'ensemble des notions vues depuis le premier chapitre pour montrer comment la stéréochimie d'un réactif détermine directement celle de son produit. Comme le rappelle l'histoire des acides gras trans : en chimie comme en nutrition, une différence de configuration invisible à l'œil nu peut avoir des conséquences bien réelles, parfois mesurées en décennies avant d'être pleinement comprises.</p>
  `
};
STEREO_NOVA_KB[steKey("Stéréochimie des alcènes : isomérie Z/E")] = {
  intro: "Salut, moi c'est Nova ! On étudie la stéréochimie des alcènes : blocage de rotation, nomenclature Z/E. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/blocage.*rotation|liaison π|recouvrement/i, replies:[
      "La rotation autour d'une double liaison C=C est bloquée car elle romprait le recouvrement latéral des orbitales p formant la liaison π (~250 kJ/mol, bien au-delà de l'énergie thermique ambiante)."
    ]},
    { test:/configuration z|configuration e|isom.rie g.om.trique/i, replies:[
      "Z (zusammen, ensemble) = substituants prioritaires du même côté ; E (entgegen, opposé) = de part et d'autre. On applique les règles CIP séparément sur chaque carbone sp²."
    ]},
    { test:/cis.*trans/i, replies:[
      "Cis/trans reste utilisable pour les alcènes disubstitués simples, mais devient ambigu dès que les 4 substituants sont différents — Z/E, basé sur CIP, est toujours applicable sans ambiguïté."
    ]},
    { test:/acide gras|gras.*cis|gras.*trans/i, replies:[
      "Les acides gras Z (cis) ont une chaîne coudée, point de fusion plus bas (huiles liquides) ; les acides gras E (trans), plus linéaires, ont un point de fusion plus élevé."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce que la rotation romprait au niveau des orbitales.",
      "Indice niveau 2 : ce n'est pas une question de volume des carbones.",
      "Indice niveau 3 : c'est la rupture du recouvrement π qui bloque la rotation."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à quand cis/trans ne suffit plus à décrire la molécule.",
      "Indice niveau 2 : ce n'est pas une question de cyclicité ou de position terminale.",
      "Indice niveau 3 : c'est quand les 4 substituants sont tous différents."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
STEREO_CHAPTERS[steKey("Stéréochimie et réactivité : introduction à la stéréospécificité")] = {
  objectives: [
    "Comprendre la notion de réaction stéréospécifique",
    "Illustrer la stéréospécificité par l'exemple de la substitution nucléophile SN2",
    "Distinguer stéréospécificité et stéréosélectivité",
    "Percevoir l'importance biologique et pharmaceutique de la stéréochimie",
    "Évaluer pourquoi la découverte de la stéréospécificité de la SN2 par Hughes et Ingold, dans les années 1930, a constitué l'une des preuves expérimentales les plus élégantes de toute l'histoire de la chimie mécanistique"
  ],
  prereqs: ["Chiralité et énantiomérie : configuration R/S", "Stéréochimie des alcènes : isomérie Z/E"],
  bodyHtml: `
    <p>Dans les années 1930, Edward Hughes et Christopher Ingold — déjà rencontrés à plusieurs reprises dans ce module — cherchent à départager deux hypothèses concurrentes sur le mécanisme de la substitution nucléophile : le nucléophile attaque-t-il le carbone électrophile du même côté que le groupe partant, ou du côté opposé ? Pour trancher cette question invisible à l'observation directe, ils ont l'idée décisive de suivre la stéréochimie d'un substrat de configuration connue tout au long de la réaction : si le produit obtenu présente systématiquement une configuration inversée, cela prouve, sans contestation possible, une attaque par le côté opposé au groupe partant. Cette expérience, d'une élégance méthodologique rare, reste aujourd'hui l'un des exemples les plus enseignés de la façon dont la stéréochimie peut servir de sonde pour élucider un mécanisme réactionnel invisible.</p>
    <p>Ce dernier chapitre du module « Chimie organique spatiale » te propose de refermer la boucle entamée dès le premier chapitre : après avoir appris à représenter, nommer et mesurer la stéréochimie des molécules, tu vas enfin comprendre pourquoi cette même stéréochimie n'est jamais un simple exercice descriptif, mais un outil puissant pour élucider et prédire la réactivité chimique elle-même — le lien direct entre la structure d'une molécule et son comportement dans une réaction.</p>
    <p>Ce dernier chapitre relie la stéréochimie, étudiée jusqu'ici pour elle-même, à la <strong>réactivité chimique</strong> — un lien qui sera approfondi en détail dans les cours de L2-L3 sur les mécanismes réactionnels, mais dont les bases conceptuelles se posent dès ce niveau. À la fin de ce chapitre — et de ce module —, tu sauras distinguer stéréospécificité et stéréosélectivité, et comprendre pourquoi la stéréochimie occupe une place aussi centrale dans l'industrie pharmaceutique moderne.</p>

    <h3>1. Réaction stéréospécifique : définition</h3>
    <p>Une réaction est dite <strong>stéréospécifique</strong> lorsque des réactifs de <strong>stéréochimie différente</strong> (par exemple deux énantiomères, ou un alcène Z et son isomère E) conduisent, par un même mécanisme, à des produits de stéréochimie <strong>elle-même différente et prévisible</strong> — chaque stéréoisomère du réactif donnant un stéréoisomère spécifique et distinct du produit, de façon systématique et reproductible.</p>

    <h3>2. Exemple emblématique : la substitution nucléophile SN2</h3>
    <p>La réaction de substitution nucléophile bimoléculaire (SN2, mécanisme étudié en détail en L2) illustre parfaitement la stéréospécificité. Le nucléophile attaque le carbone électrophile par le côté <strong>opposé</strong> au groupe partant (attaque en « dos » ou <em>backside attack</em>), ce qui provoque une <strong>inversion de configuration</strong> complète au niveau du centre réactionnel — un phénomène appelé <strong>inversion de Walden</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'inversion de Walden</span>
      Si le substrat de départ possède la configuration R en ce centre, le produit obtenu par SN2 aura systématiquement la configuration <strong>S</strong> (ou l'inverse) — l'attaque en dos « retourne » la géométrie du centre stéréogène, à la façon d'un parapluie qui se retourne sous l'effet du vent. Cette inversion est <strong>totale et systématique</strong>, pas seulement statistiquement majoritaire : c'est précisément cela qui définit la stéréospécificité de la réaction SN2, et qui a permis, historiquement, d'établir le mécanisme SN2 lui-même (preuve expérimentale de Hughes et Ingold, années 1930).
    </div>

    <h3>3. Stéréospécificité versus stéréosélectivité</h3>
    <p>Il convient de bien distinguer deux notions proches mais distinctes :</p>
    <table class="mini-table">
      <tr><th>Notion</th><th>Définition</th></tr>
      <tr><td><strong>Stéréospécifique</strong></td><td>Le résultat stéréochimique est <strong>imposé</strong> par le mécanisme lui-même : des réactifs de stéréochimie différente donnent nécessairement des produits de stéréochimie différente (ex : SN2)</td></tr>
      <tr><td><strong>Stéréosélective</strong></td><td>La réaction favorise la formation <strong>préférentielle</strong> d'un stéréoisomère du produit parmi plusieurs possibles, sans que ce soit une conséquence obligatoire du mécanisme (souvent une question de facteurs stériques ou électroniques favorisant statistiquement un chemin réactionnel)</td></tr>
    </table>
    <p>Toute réaction stéréospécifique est nécessairement stéréosélective (elle produit préférentiellement, ici exclusivement, un stéréoisomère), mais l'inverse n'est pas vrai : une réaction peut être stéréosélective (par exemple, favoriser à 90 % un diastéréoisomère) sans être stéréospécifique.</p>

    <h3>4. L'importance biologique et pharmaceutique de la stéréochimie</h3>
    <p>Les récepteurs biologiques (enzymes, récepteurs membranaires) sont eux-mêmes des structures chirales, capables de <strong>discriminer</strong> deux énantiomères d'une même molécule, exactement comme une main gauche ne s'ajuste correctement qu'à un gant gauche. Les conséquences pratiques peuvent être considérables :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Un seul énantiomère d'une molécule odorante peut sentir la menthe, l'autre le carvi (cas classique de la carvone)</li>
      <li>Un seul énantiomère d'un médicament peut être thérapeutiquement actif, l'autre inactif ou, dans certains cas historiques dramatiques, toxique (affaire de la thalidomide, années 1960)</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Point clé — un lien direct avec l'industrie pharmaceutique moderne</span>
      Cette sensibilité biologique à la stéréochimie explique pourquoi l'industrie pharmaceutique moderne développe de plus en plus des médicaments sous forme d'un <strong>seul énantiomère pur</strong> plutôt qu'en mélange racémique — un domaine de recherche actif, s'appuyant directement sur les techniques de synthèse asymétrique et de séparation chirale, qui prolongent naturellement les notions fondamentales posées dans ce cours.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Hughes et Ingold n'ont jamais pu « voir » directement le nucléophile attaquer le carbone électrophile — ils ont dû déduire le mécanisme SN2 uniquement à partir de son empreinte stéréochimique sur le produit final. En quoi cette démarche, où l'on prouve un mécanisme invisible par ses conséquences observables plutôt que par une observation directe, illustre-t-elle une méthode générale et puissante de la science expérimentale, bien au-delà de la seule chimie organique ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La stéréospécificité continue d'être un outil de choix pour élucider des mécanismes réactionnels encore mal compris en chimie organique et en biochimie moderne : les enzymes, catalyseurs biologiques hautement stéréospécifiques, sont étudiées en observant précisément quelle configuration de leur produit elles génèrent à partir d'un substrat de configuration connue, révélant ainsi des détails fins de leur site actif. Par ailleurs, la synthèse asymétrique catalytique, qui a valu plusieurs prix Nobel de chimie (Knowles, Noyori, Sharpless en 2001), continue de repousser les limites de ce qui est industriellement possible pour produire sélectivement un seul énantiomère d'un médicament, sans jamais avoir à séparer un mélange racémique a posteriori.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des catalyseurs universels, applicables à une vaste gamme de réactions organiques, capables de garantir systématiquement un contrôle stéréospécifique total, à la manière de la SN2, plutôt qu'une simple préférence stéréosélective statistique ? C'est un objectif ambitieux de la synthèse organique de nouvelle génération.</p>
    <p><strong>Technologie émergente :</strong> les biocatalyseurs enzymatiques modifiés par ingénierie protéique, conçus pour offrir un contrôle stéréospécifique total sur des réactions industrielles complexes, sont de plus en plus utilisés en synthèse pharmaceutique pour produire directement un seul énantiomère pur, sans étape de séparation coûteuse.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Réactif de configuration connue → mécanisme réactionnel (ex. SN2, attaque en dos) → produit de configuration prévisible et systématique (stéréospécificité) → récepteurs biologiques chiraux → conséquences pharmacologiques et biologiques majeures
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Stéréospécifique} \\Rightarrow \\text{Stéréosélective} \\quad (\\text{réciproque fausse})$$
      Cette relation logique, plus conceptuelle qu'une formule numérique, résume l'enseignement final de tout ce module : la stéréochimie, loin d'être une simple description statique des molécules, est un outil actif qui permet de sonder, de prédire et d'exploiter la réactivité chimique — le lien indispensable entre la structure tridimensionnelle d'une molécule et son comportement réel, en éprouvette comme dans un organisme vivant.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une réaction stéréospécifique impose un résultat stéréochimique prévisible et systématique, dicté par son mécanisme</li>
      <li>La SN2 illustre la stéréospécificité par l'inversion de Walden : attaque en dos, inversion totale de configuration au centre réactionnel</li>
      <li>Stéréospécificité (imposée par le mécanisme) et stéréosélectivité (préférence statistique) sont deux notions distinctes ; toute réaction stéréospécifique est stéréosélective, l'inverse n'étant pas vrai</li>
      <li>Les récepteurs biologiques chiraux discriminent les énantiomères, avec des conséquences majeures en pharmacologie (odorat, activité thérapeutique)</li>
      <li>L'industrie pharmaceutique privilégie de plus en plus des médicaments énantiopurs plutôt que racémiques</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre stéréospécifique (résultat imposé par le mécanisme) et stéréosélectif (préférence statistique, non systématique)</li>
      <li>Croire que l'inversion de Walden en SN2 n'est que statistiquement majoritaire — elle est en réalité totale et systématique</li>
      <li>Sous-estimer l'importance pratique de la stéréochimie en pharmacologie, en la considérant comme une notion purement académique</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">L'inversion de Walden en SN2 est :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste8e1" value="wrong">Statistiquement majoritaire, mais pas systématique</label>
        <label class="option"><input type="radio" name="ste8e1" value="right">Totale et systématique, à chaque événement réactionnel</label>
        <label class="option"><input type="radio" name="ste8e1" value="wrong">Absente dans le mécanisme SN2</label>
        <label class="option"><input type="radio" name="ste8e1" value="wrong">Aléatoire, sans lien avec le mécanisme</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste8e1','ste8fb1','Correct — c\\'est précisément ce caractère total et systématique qui définit la stéréospécificité de la SN2.','Relis le point clé sur l\\'inversion de Walden et son caractère systématique.')">Vérifier</button>
      <div class="feedback" id="ste8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Toute réaction stéréospécifique est-elle nécessairement stéréosélective ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ste8e2" value="right">Oui, mais l'inverse n'est pas vrai</label>
        <label class="option"><input type="radio" name="ste8e2" value="wrong">Non, ce sont deux notions incompatibles</label>
        <label class="option"><input type="radio" name="ste8e2" value="wrong">Oui, et l'inverse est également toujours vrai</label>
        <label class="option"><input type="radio" name="ste8e2" value="wrong">Cela dépend uniquement du solvant utilisé</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ste8e2','ste8fb2','Correct — une réaction stéréospécifique est toujours stéréosélective (elle privilégie un stéréoisomère précis), mais une réaction stéréosélective n\\'est pas nécessairement stéréospécifique.','Relis la comparaison entre stéréospécificité et stéréosélectivité.')">Vérifier</button>
      <div class="feedback" id="ste8fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si le mécanisme SN2 n'était que stéréosélectif (préférentiellement inversant) plutôt que rigoureusement stéréospécifique : Hughes et Ingold auraient-ils pu établir aussi solidement leur mécanisme réactionnel ?</li>
      <li>Pourquoi les récepteurs biologiques, eux-mêmes construits à partir d'acides aminés chiraux, ne peuvent-ils physiquement pas traiter deux énantiomères d'une même molécule de façon identique ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pharmaceutique mondiale, d'une méthode universelle de synthèse asymétrique garantissant systématiquement un seul énantiomère pur pour n'importe quel médicament chiral, sans exception ni surcoût ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>E. D. Hughes, C. K. Ingold, « Mechanism of Substitution at a Saturated Carbon Atom », Journal of the Chemical Society, 1935 — la preuve expérimentale de l'inversion de Walden en SN2.</li>
      <li>P. Vollhardt, N. Schore, <em>Traité de chimie organique</em>, De Boeck — référence standard sur la stéréospécificité en licence.</li>
      <li>W. S. Knowles, R. Noyori, K. B. Sharpless, « Catalytic Asymmetric Synthesis », Nobel Lectures, prix Nobel de chimie 2001.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module « Chimie organique spatiale » : parti des simples conventions de représentation de Cram, Newman et Fischer, tu termines en comprenant comment la stéréochimie d'un réactif détermine directement, et de façon prévisible, celle de son produit. Ce parcours — représentations spatiales, chiralité R/S, diastéréoisomères et composés méso, activité optique, analyse conformationnelle acyclique et cyclique, isomérie Z/E, et enfin stéréospécificité — constitue le socle tridimensionnel indispensable de toute la chimie organique que tu approfondiras dans les modules suivants. Comme le rappelle l'élégance de la preuve expérimentale de Hughes et Ingold : parfois, la meilleure façon de comprendre l'invisible est de suivre méticuleusement la trace qu'il laisse derrière lui — ici, une configuration inversée, systématiquement et sans exception.</p>
  `
};
STEREO_NOVA_KB[steKey("Stéréochimie et réactivité : introduction à la stéréospécificité")] = {
  intro: "Salut, moi c'est Nova ! On termine avec le lien entre stéréochimie et réactivité : SN2, inversion de Walden, importance pharmaceutique. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/st[ée]r[ée]osp[ée]cifique/i, replies:[
      "Une réaction stéréospécifique impose un résultat stéréochimique prévisible et systématique, dicté par son mécanisme (ex : SN2 et inversion de Walden)."
    ]},
    { test:/inversion de walden|sn2/i, replies:[
      "L'inversion de Walden en SN2 : le nucléophile attaque en dos (côté opposé au groupe partant), inversant totalement et systématiquement la configuration du centre réactionnel."
    ]},
    { test:/st[ée]r[ée]os[ée]lective/i, replies:[
      "Stéréosélective = préférence statistique pour un stéréoisomère, non systématique. Toute réaction stéréospécifique est stéréosélective, mais l'inverse n'est pas vrai."
    ]},
    { test:/thalidomide|pharmacologie|m[ée]dicament.*[ée]nantiom/i, replies:[
      "Les récepteurs biologiques chiraux discriminent les énantiomères — un seul peut être actif thérapeutiquement (ou même toxique, cas historique de la thalidomide). D'où le développement croissant de médicaments énantiopurs."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense au caractère systématique ou non de l'inversion de Walden.",
      "Indice niveau 2 : ce n'est pas juste statistiquement majoritaire.",
      "Indice niveau 3 : c'est totale et systématique, à chaque événement réactionnel."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la relation logique entre les deux notions.",
      "Indice niveau 2 : la stéréospécificité est une condition plus forte.",
      "Indice niveau 3 : donc stéréospécifique implique stéréosélective, mais pas l'inverse."
    ]}
  ]
};

/* fusionne le module Chimie organique spatiale dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, STEREO_CHAPTERS);
Object.assign(NOVA_KB, STEREO_NOVA_KB);