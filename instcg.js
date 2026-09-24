/* =====================================================================
   CHUNK « instcg » — registre INSTCG_CHAPTERS / INSTCG_NOVA_KB
   Matière(s) : Chimie|Instrumentations et manipulation de chimie générale
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   INSTCG_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — INSTRUMENTATIONS ET MANIPULATION DE CHIMIE GÉNÉRALE (L1, domaine Chimie)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : sécurité au laboratoire et verrerie de base, pesée et préparation de
   solutions, pH-métrie, titrage acido-basique, filtration et séparation,
   cristallisation, distillation, spectrophotométrie UV-Visible — conforme aux
   enseignements pratiques transversaux de chimie générale en L1. Ce cours prolonge
   les cours théoriques "Atomistique et liaisons chimiques" et "Thermochimie et
   équilibres chimiques" par leur mise en œuvre expérimentale concrète en laboratoire,
   et prépare les cours d'instrumentation spécialisés en chimie minérale et organique.
   Références de fond : R. Barbe & J. Le Bras, Techniques expérimentales en chimie
   (Dunod) ; D.C. Harris, Quantitative Chemical Analysis (W.H. Freeman) ; consignes
   générales de sécurité en laboratoire de chimie (INRS, ministère de l'Enseignement).
===================================================================================== */
const INSTCG_MATIERE = 'Instrumentations et manipulation de chimie générale';
function icgKey(chapterTitle){ return `Chimie|${INSTCG_MATIERE}|${chapterTitle}`; }
const INSTCG_CHAPTERS = {};
const INSTCG_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de dilution C1V1=C2V2 (chapitre 2)
--------------------------------------------------------------------------------- */
function updateDilutionCalc(){
  const c1 = parseFloat(document.getElementById('dilC1').value) || 1;
  const c2 = parseFloat(document.getElementById('dilC2').value) || 0.1;
  const v2 = parseFloat(document.getElementById('dilV2').value) || 100;
  const v1 = (c2*v2)/c1;
  const out = document.getElementById('dilReadout');
  out.innerHTML = `V1 = C2×V2/C1 = (${c2}×${v2})/${c1} = <strong>${v1.toFixed(2)} mL</strong> de solution mère à prélever,<br>complétée avec le solvant jusqu'à ${v2} mL de solution finale.`;
}
function initDilutionCalc(){ updateDilutionCalc(); }

/* =========================== CHAPITRE 1 =========================== */
INSTCG_CHAPTERS[icgKey("Sécurité au laboratoire et verrerie de base")] = {
  objectives: [
    "Identifier les équipements de protection individuelle et collective indispensables en laboratoire de chimie",
    "Lire et interpréter les pictogrammes de danger du règlement CLP",
    "Reconnaître et nommer la verrerie courante d'un laboratoire de chimie générale",
    "Distinguer verrerie de précision et verrerie approximative",
    "Évaluer pourquoi le règlement CLP, en vigueur en Europe, remplace un ancien système national de pictogrammes par une classification harmonisée à l'échelle internationale"
  ],
  prereqs: ["Atomistique et liaisons chimiques"],
  bodyHtml: `
    <p>Avant 2008, chaque pays européen disposait de son propre système de classification et d'étiquetage des produits chimiques dangereux — une situation qui compliquait considérablement le commerce international et la sécurité des travailleurs manipulant des produits importés dont l'étiquetage suivait des conventions différentes de celles apprises dans leur propre pays. Le règlement européen CLP, entré pleinement en vigueur en 2015, aligne cette classification sur le Système Général Harmonisé (SGH) des Nations Unies, un cadre aujourd'hui adopté par la quasi-totalité des pays du monde — une petite révolution silencieuse qui permet à un technicien de laboratoire de comprendre instantanément un pictogramme de danger, qu'il travaille à Paris, Tokyo ou São Paulo.</p>
    <p>Cette harmonisation internationale, loin d'être un détail bureaucratique, sauve concrètement des vies : elle garantit qu'un même symbole de danger signifie exactement la même chose partout dans le monde, éliminant les risques de confusion mortelle liés à des systèmes d'étiquetage nationaux incompatibles. Ce premier chapitre pratique te donne les bases indispensables — sécurité, verrerie — avant toute manipulation concrète en laboratoire de chimie générale.</p>
    <p>Avant toute manipulation, la maîtrise des règles de sécurité et la connaissance précise du matériel constituent un préalable incontournable — non pas une simple formalité administrative, mais une compétence professionnelle qui conditionne à la fois la sécurité personnelle et la fiabilité des résultats obtenus. À la fin de ce chapitre, tu sauras identifier tout pictogramme de danger réglementaire et choisir la verrerie adaptée à chaque situation expérimentale.</p>

    <h3>1. Les équipements de protection</h3>
    <table class="mini-table">
      <tr><th>Équipement</th><th>Rôle</th></tr>
      <tr><td>Blouse (coton, manches longues)</td><td>Protection du corps et des vêtements contre les projections et éclaboussures</td></tr>
      <tr><td>Lunettes de sécurité</td><td>Protection oculaire obligatoire et permanente, même pour un simple spectateur dans le laboratoire</td></tr>
      <tr><td>Gants adaptés au produit manipulé</td><td>Protection cutanée (nitrile pour la plupart des usages courants, matériaux spécifiques pour certains solvants)</td></tr>
      <tr><td>Hotte / sorbonne</td><td>Protection collective contre les vapeurs toxiques ou irritantes, à utiliser pour tout produit volatil dangereux</td></tr>
      <tr><td>Douche de sécurité et rince-œil</td><td>Équipements d'urgence, dont l'emplacement doit être repéré avant toute manipulation</td></tr>
    </table>

    <h3>2. Les pictogrammes de danger (règlement CLP)</h3>
    <p>Le règlement européen <strong>CLP</strong> (Classification, Labelling, Packaging) harmonise l'étiquetage des produits chimiques dangereux à l'aide de neuf pictogrammes normalisés, en forme de losange rouge sur fond blanc :</p>
    <table class="mini-table">
      <tr><th>Pictogramme</th><th>Signification</th></tr>
      <tr><td>Flamme</td><td>Produit inflammable</td></tr>
      <tr><td>Point d'exclamation</td><td>Irritant, nocif, ou dangereux pour la couche d'ozone</td></tr>
      <tr><td>Tête de mort sur tibias croisés</td><td>Toxicité aiguë sévère</td></tr>
      <tr><td>Corrosion (éprouvette + main)</td><td>Corrosif pour la peau, les yeux, ou les matériaux</td></tr>
      <tr><td>Bouteille de gaz</td><td>Gaz sous pression</td></tr>
      <tr><td>Cercle enflammé</td><td>Comburant (favorise ou entretient un incendie)</td></tr>
      <tr><td>Danger pour la santé (silhouette)</td><td>Cancérogène, mutagène, toxique pour la reproduction, sensibilisant respiratoire</td></tr>
      <tr><td>Danger pour l'environnement</td><td>Toxique pour le milieu aquatique</td></tr>
      <tr><td>Bombe explosant</td><td>Explosif</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Avant toute manipulation d'un produit chimique inconnu, la consultation de sa <strong>fiche de données de sécurité (FDS)</strong> est une étape obligatoire : elle précise les pictogrammes de danger, les précautions de manipulation, de stockage, et la conduite à tenir en cas d'exposition accidentelle. Aucune manipulation ne devrait débuter sans cette vérification préalable.
    </div>

    <h3>3. La verrerie de base</h3>
    <p>On distingue deux grandes catégories de verrerie, selon la précision requise de la mesure de volume :</p>
    <table class="mini-table">
      <tr><th>Catégorie</th><th>Exemples</th><th>Usage</th></tr>
      <tr><td>Verrerie <strong>approximative</strong></td><td>Bécher, erlenmeyer (fiole conique)</td><td>Contenir, mélanger, chauffer — pas pour une mesure précise de volume</td></tr>
      <tr><td>Verrerie <strong>de précision</strong></td><td>Fiole jaugée, pipette jaugée, burette graduée</td><td>Mesurer un volume avec une exactitude garantie (classe A ou B selon la précision)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — ne jamais utiliser un bécher pour une mesure précise</span>
      Un bécher, bien que gradué, n'offre qu'une précision approximative (souvent ±5 % ou plus) : il ne doit <strong>jamais</strong> être utilisé pour préparer une solution de concentration précise ou effectuer un dosage quantitatif. Pour toute opération exigeant une exactitude quantitative — préparation de solution étalon, titrage — seule la verrerie <strong>jaugée</strong> (fiole jaugée, pipette jaugée) garantit la précision nécessaire.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un bécher gradué et une fiole jaugée peuvent tous deux afficher une graduation de « 250 mL », mais avec une précision radicalement différente. En reliant cela au cours « Mesures et normes » sur les incertitudes, pourquoi la simple présence d'une graduation numérique sur un instrument ne garantit-elle jamais, à elle seule, une précision suffisante pour un usage quantitatif rigoureux ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant souhaite préparer 250 mL d'une solution de concentration précisément connue. Quelle verrerie doit-il utiliser pour le volume final, et pourquoi pas un bécher gradué à 250 mL ?</p>
      <p><strong>Solution :</strong> Il doit utiliser une <strong>fiole jaugée de 250 mL</strong>, dont la précision (typiquement ±0,15 mL en classe A) est très largement supérieure à celle d'un bécher gradué (souvent ±10 mL ou plus pour un bécher de cette taille). Utiliser un bécher introduirait une erreur systématique importante sur la concentration finale de la solution.</p>
      <p class="example-answer">Réponse : la fiole jaugée est indispensable pour toute préparation quantitative précise, le bécher n'étant adapté qu'à des usages approximatifs.</p>
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>La sécurité en laboratoire de chimie continue d'évoluer avec l'apparition de nouveaux risques : les nanomatériaux manipulés dans certains laboratoires de recherche présentent des propriétés toxicologiques encore mal caractérisées, très différentes de celles du même matériau à l'échelle macroscopique, ce qui pousse les organismes de sécurité à développer de nouvelles fiches de données de sécurité spécifiques. Par ailleurs, la digitalisation croissante des laboratoires, avec des cahiers de laboratoire électroniques et des capteurs de sécurité connectés, permet aujourd'hui une traçabilité et une réactivité accrues face à un incident potentiel.</p>
    <p><strong>Question ouverte :</strong> comment adapter rapidement les référentiels de sécurité chimique existants (comme le règlement CLP) à des matériaux ou procédés émergents, dont les risques ne sont pas encore complètement caractérisés au moment de leur introduction en laboratoire ? C'est un défi permanent de la réglementation en santé et sécurité au travail.</p>
    <p><strong>Technologie émergente :</strong> les capteurs de sécurité connectés, capables de détecter automatiquement une fuite de gaz toxique ou une élévation anormale de température dans un laboratoire et d'alerter instantanément le personnel, se généralisent aujourd'hui dans les laboratoires de recherche et d'enseignement les plus modernes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Produit chimique inconnu → consultation de la FDS → identification des pictogrammes CLP → équipements de protection adaptés → choix de la verrerie (approximative pour contenir, jaugée pour mesurer précisément)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Manipulation sûre et fiable} = \\text{Sécurité} + \\text{Instrument adapté à la précision requise}$$
      Cette « équation », plus méthodologique que mathématique, résume l'esprit de tout ce module pratique : aucune mesure, aussi soigneusement réalisée soit-elle, ne peut compenser un choix d'instrument inadapté, et aucune rigueur scientifique ne vaut sans une sécurité correctement assurée en amont.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Blouse, lunettes, gants adaptés et hotte constituent l'équipement de protection minimal en laboratoire de chimie</li>
      <li>Les 9 pictogrammes CLP normalisent la signalisation des dangers chimiques ; la FDS doit être consultée avant toute manipulation d'un produit inconnu</li>
      <li>La verrerie approximative (bécher, erlenmeyer) sert à contenir/mélanger ; la verrerie de précision (fiole jaugée, pipette, burette) sert à mesurer un volume exactement</li>
      <li>Un bécher ne doit jamais être utilisé pour une mesure de volume précise ou un dosage quantitatif</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Utiliser un bécher gradué pour préparer une solution de concentration précise, au lieu d'une fiole jaugée</li>
      <li>Manipuler un produit chimique sans avoir consulté sa fiche de données de sécurité</li>
      <li>Retirer ses lunettes de sécurité même brièvement, sous prétexte d'une manipulation jugée « sans risque »</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Le pictogramme représentant une éprouvette qui goutte sur une main signifie :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg1e1" value="wrong">Produit inflammable</label>
        <label class="option"><input type="radio" name="icg1e1" value="right">Produit corrosif</label>
        <label class="option"><input type="radio" name="icg1e1" value="wrong">Produit explosif</label>
        <label class="option"><input type="radio" name="icg1e1" value="wrong">Gaz sous pression</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg1e1','icg1fb1','Correct — c\\'est le pictogramme de corrosion, signalant un danger pour la peau, les yeux, ou les matériaux.','Relis le tableau des pictogrammes CLP.')">Vérifier</button>
      <div class="feedback" id="icg1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour préparer une solution de concentration précisément connue, quelle verrerie choisir pour le volume final ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg1e2" value="wrong">Un bécher gradué</label>
        <label class="option"><input type="radio" name="icg1e2" value="right">Une fiole jaugée</label>
        <label class="option"><input type="radio" name="icg1e2" value="wrong">Un erlenmeyer</label>
        <label class="option"><input type="radio" name="icg1e2" value="wrong">Peu importe, tant que le volume est approximativement correct</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg1e2','icg1fb2','Correct — seule la fiole jaugée garantit la précision nécessaire pour une préparation quantitative.','Relis le point clé sur l\\'usage exclusif de la verrerie jaugée pour les mesures précises.')">Vérifier</button>
      <div class="feedback" id="icg1fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si chaque pays du monde utilisait encore son propre système de pictogrammes de danger, sans harmonisation internationale : quels risques concrets cela poserait-il pour les travailleurs manipulant des produits importés ?</li>
      <li>Pourquoi la précision d'un bécher gradué, malgré ses graduations numériques visibles, reste-t-elle largement insuffisante pour une préparation quantitative rigoureuse ?</li>
      <li>Quelle serait la conséquence, pour la sécurité en laboratoire, d'une généralisation insuffisante des capteurs connectés face à l'émergence de nouveaux risques chimiques mal caractérisés ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>Règlement (CE) n° 1272/2008 du Parlement européen et du Conseil relatif à la classification, à l'étiquetage et à l'emballage des substances et des mélanges (règlement CLP), 2008.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la sécurité et la verrerie de laboratoire en licence.</li>
      <li>Nations Unies, <em>Système Général Harmonisé de classification et d'étiquetage des produits chimiques (SGH)</em>, 9e édition révisée, 2021.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu disposes désormais des bases de sécurité et de connaissance de la verrerie indispensables avant toute manipulation en laboratoire de chimie générale. Le chapitre suivant, « Pesée et préparation de solutions : dilution et concentration », va te faire passer à la pratique concrète : peser avec précision et préparer une solution de concentration exacte. Comme le rappelle l'harmonisation internationale du règlement CLP : la sécurité en chimie n'a de sens que si elle est comprise et appliquée de façon universelle, au-delà des frontières et des habitudes locales.</p>
  `
};
INSTCG_NOVA_KB[icgKey("Sécurité au laboratoire et verrerie de base")] = {
  intro: "Salut, moi c'est Nova ! On démarre par la sécurité au labo et la verrerie de base. Pose-moi une question, ou demande un indice sur un exercice.",
  rules: [
    { test:/pictogramme|clp/i, replies:[
      "Le règlement CLP définit 9 pictogrammes de danger (flamme, corrosion, tête de mort, etc.). Toujours consulter la FDS d'un produit avant de le manipuler."
    ]},
    { test:/verrerie.*pr[ée]cision|verrerie.*approximative|fiole jaug[ée]e/i, replies:[
      "Verrerie approximative (bécher, erlenmeyer) : pour contenir/mélanger. Verrerie de précision (fiole jaugée, pipette, burette) : pour mesurer un volume exactement — jamais de bécher pour un dosage précis !"
    ]},
    { test:/[ée]quipement.*protection|blouse|lunettes|gants/i, replies:[
      "Blouse, lunettes de sécurité (en permanence), gants adaptés au produit, et hotte pour les vapeurs dangereuses sont les équipements de protection de base."
    ]},
    { test:/fds|fiche de donn[ée]es de s[ée]curit[ée]/i, replies:[
      "La FDS (fiche de données de sécurité) précise pictogrammes, précautions de manipulation/stockage, et conduite d'urgence — consultation obligatoire avant toute manipulation d'un produit inconnu."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le tableau des pictogrammes CLP.",
      "Indice niveau 2 : ce pictogramme évoque un effet direct sur la main ou l'éprouvette.",
      "Indice niveau 3 : c'est le pictogramme de corrosion."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la verrerie garantissant la précision d'un volume.",
      "Indice niveau 2 : ce n'est ni le bécher ni l'erlenmeyer.",
      "Indice niveau 3 : c'est la fiole jaugée."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
INSTCG_CHAPTERS[icgKey("Pesée et préparation de solutions : dilution et concentration")] = {
  objectives: [
    "Utiliser correctement une balance de précision et une balance analytique",
    "Calculer la masse à peser pour préparer une solution de concentration donnée",
    "Appliquer la relation de dilution C1V1=C2V2",
    "Préparer une solution par dilution en solution mère",
    "Évaluer pourquoi une simple erreur de rinçage ou de dilution en laboratoire peut se propager silencieusement à travers tout un protocole expérimental sans jamais déclencher d'alerte visible"
  ],
  prereqs: ["Sécurité au laboratoire et verrerie de base"],
  bodyHtml: `
    <p>Le 23 septembre 1999, la sonde spatiale Mars Climate Orbiter de la NASA se désintègre dans l'atmosphère martienne après un voyage de plusieurs centaines de millions de kilomètres — non pas à cause d'un défaut technique exotique, mais à cause d'une confusion élémentaire entre unités impériales et unités métriques dans le calcul de sa trajectoire. Cette catastrophe, déjà évoquée dans le cours « Mesures et normes », trouve un écho direct et bien plus modeste dans chaque laboratoire de chimie du monde : une erreur de dilution, un facteur dix oublié, une pipette graduée utilisée à la place d'une pipette jaugée, et c'est toute une série de résultats expérimentaux qui se retrouvent silencieusement faussés, sans qu'aucune alarme ne se déclenche pour le signaler.</p>
    <p>Cette vigilance de tous les instants — vérifier deux fois un calcul de masse, choisir la bonne verrerie, rincer soigneusement chaque récipient — n'a rien d'une contrainte excessive : c'est elle qui garantit que les résultats obtenus en travaux pratiques, comme dans n'importe quel laboratoire de recherche ou de contrôle qualité industriel, restent fiables et reproductibles. Ce chapitre te donne les compétences pratiques fondamentales pour préparer n'importe quelle solution avec la précision requise.</p>
    <p>La préparation de solutions de concentration précisément connue est l'une des opérations les plus fondamentales et les plus fréquentes de tout laboratoire de chimie — la fiabilité de toute analyse quantitative ultérieure en dépend directement. À la fin de ce chapitre, tu sauras peser, dissoudre et diluer avec la rigueur nécessaire pour obtenir une solution de concentration exacte, sans jamais propager d'erreur silencieuse dans le reste de ton protocole.</p>

    <h3>1. La pesée</h3>
    <p>On distingue la <strong>balance de précision</strong> (précision typique au centigramme, 0,01 g) et la <strong>balance analytique</strong> (précision au dixième de milligramme, 0,0001 g), cette dernière étant réservée aux pesées exigeant une exactitude particulièrement élevée. Quelques bonnes pratiques essentielles :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Tarer</strong> systématiquement le récipient (coupelle, verre de montre) avant d'y introduire le produit à peser</li>
      <li>Ne jamais peser directement sur le plateau de la balance sans récipient intermédiaire</li>
      <li>Refermer les portes de la balance analytique pendant la lecture (sensible aux courants d'air)</li>
      <li>Ne jamais peser un produit chaud (dilatation de l'air, convection faussant la mesure) ni un produit hygroscopique à l'air libre trop longtemps</li>
    </ul>

    <h3>2. Concentration molaire et masse à peser</h3>
    <p>Pour préparer un volume $V$ d'une solution de concentration molaire $C$ à partir d'un soluté solide de masse molaire $M$, la masse à peser se déduit directement de $n=CV=m/M$ :</p>
    <div class="formula-box">$$m = C \\times V \\times M$$</div>
    <p>avec $C$ en mol/L, $V$ en L, et $M$ en g/mol, pour obtenir $m$ en grammes.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Calculer la masse de chlorure de sodium ($M=58{,}5$ g/mol) à peser pour préparer 500 mL d'une solution à 0,10 mol/L.</p>
      <p><strong>Solution :</strong> $m = C\\times V\\times M = 0{,}10 \\times 0{,}500 \\times 58{,}5 = 2{,}93$ g.</p>
      <p class="example-answer">Réponse : il faut peser 2,93 g de NaCl, puis compléter avec de l'eau distillée jusqu'au trait de jauge d'une fiole de 500 mL.</p>
    </div>

    <h3>3. La méthode de préparation en fiole jaugée</h3>
    <p>Après avoir pesé la masse requise dans un bécher, le protocole standard de préparation d'une solution en fiole jaugée comporte plusieurs étapes précises :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Dissoudre le solide dans un <strong>petit volume</strong> de solvant dans le bécher (jamais directement dans la fiole, pour un meilleur contrôle de la dissolution)</li>
      <li>Transvaser quantitativement la solution dans la fiole jaugée, en rinçant soigneusement le bécher plusieurs fois avec le solvant (pour ne perdre aucune trace de soluté)</li>
      <li>Compléter avec le solvant jusqu'à environ 1 cm sous le trait de jauge</li>
      <li>Ajuster précisément au trait de jauge à l'aide d'une pipette (pour un contrôle fin du dernier volume), en visant le bas du <strong>ménisque</strong> à hauteur des yeux</li>
      <li>Boucher et homogénéiser par retournements successifs</li>
    </ol>

    <h3>4. La dilution : la relation C1V1 = C2V2</h3>
    <p>Diluer une solution consiste à prélever un volume $V_1$ d'une solution mère de concentration $C_1$, et à le compléter avec du solvant jusqu'à un volume final $V_2$, de concentration $C_2 < C_1$. Comme la quantité de matière de soluté prélevée reste inchangée lors de la dilution (seul le solvant est ajouté) :</p>
    <div class="formula-box">$$n = C_1V_1 = C_2V_2$$</div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur de dilution</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Détermine le volume de solution mère à prélever pour obtenir la dilution souhaitée.</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>C1 — concentration de la solution mère (mol/L)</label><input type="number" id="dilC1" value="1" step="0.01" oninput="updateDilutionCalc()">
          <label>C2 — concentration finale souhaitée (mol/L)</label><input type="number" id="dilC2" value="0.1" step="0.01" oninput="updateDilutionCalc()">
          <label>V2 — volume final souhaité (mL)</label><input type="number" id="dilV2" value="100" step="1" oninput="updateDilutionCalc()">
          <div class="sim-readout" id="dilReadout"></div>
        </div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé — pipeter le prélèvement, pas le volume final</span>
      Pour une dilution, on utilise une <strong>pipette jaugée</strong> (précise) pour prélever exactement $V_1$ de la solution mère, que l'on introduit ensuite dans une <strong>fiole jaugée</strong> de volume $V_2$, complétée au trait de jauge avec le solvant. Utiliser une pipette imprécise (graduée, non jaugée) pour ce prélèvement est une source fréquente d'erreur systématique sur la concentration finale obtenue.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une erreur de dilution (par exemple un facteur 10 oublié) ne produit généralement aucun signal d'alerte visible : la solution obtenue a toujours l'air normale, seule sa concentration réelle diffère de celle attendue. Quelles habitudes de travail simples (documentation, double vérification, étiquetage) pourrais-tu adopter systématiquement pour limiter le risque qu'une telle erreur passe totalement inaperçue jusqu'à l'exploitation finale des résultats ?
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La préparation manuelle de solutions, bien que fondamentale à l'apprentissage de la chimie, cède progressivement la place à l'automatisation dans les laboratoires de recherche et de contrôle qualité industriels : les stations de dilution robotisées, pilotées par ordinateur, réalisent aujourd'hui des séries de dilutions avec une précision et une reproductibilité impossibles à égaler manuellement, tout en éliminant le risque d'erreur humaine de calcul ou de manipulation. Ces systèmes sont particulièrement précieux en criblage pharmaceutique à haut débit, où des milliers de dilutions différentes doivent être préparées quotidiennement pour tester l'efficacité de nouvelles molécules candidates.</p>
    <p><strong>Question ouverte :</strong> peut-on démocratiser l'accès à des systèmes de préparation de solutions automatisés et peu coûteux, pour réduire le risque d'erreur humaine même dans des laboratoires de recherche ou d'enseignement aux moyens limités ? C'est un enjeu d'équité et de fiabilité pour la recherche scientifique mondiale.</p>
    <p><strong>Technologie émergente :</strong> les systèmes de préparation de solutions par microfluidique, qui manipulent des volumes de l'ordre du microlitre avec une précision remarquable, permettent aujourd'hui de réaliser des dilutions complexes avec une consommation minimale de réactifs, un atout précieux pour les substances rares ou coûteuses.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Solution à préparer (C, V, M) → pesée précise (balance adaptée) → dissolution en bécher → transvasement rigoureux (rinçages) → ajustement au trait de jauge → dilution éventuelle (C1V1=C2V2, pipette jaugée)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$m = C \\times V \\times M \\qquad\\text{et}\\qquad C_1V_1 = C_2V_2$$
      Ces deux relations, d'une simplicité redoutable, sont les outils de calcul les plus utilisés de toute la chimie expérimentale — elles transforment une concentration voulue en une masse à peser ou un volume à prélever, la première étape indispensable de toute manipulation quantitative rigoureuse.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Toujours tarer le récipient avant de peser, jamais peser directement sur le plateau ni un produit chaud</li>
      <li>Masse à peser : m=C×V×M, avec C en mol/L, V en L, M en g/mol</li>
      <li>La préparation en fiole jaugée suit un protocole précis : dissolution préalable, rinçages, ajustement au trait de jauge visé à hauteur des yeux</li>
      <li>La relation de dilution C1V1=C2V2 traduit la conservation de la quantité de matière du soluté</li>
      <li>Le prélèvement de la solution mère se fait avec une pipette jaugée, jamais une pipette graduée approximative, pour préserver la précision de la dilution</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Dissoudre directement le solide dans la fiole jaugée plutôt que dans un bécher préalable</li>
      <li>Ne pas rincer le bécher lors du transvasement, perdant ainsi une fraction du soluté</li>
      <li>Compléter directement jusqu'au trait de jauge sans ralentir l'ajout près de la fin (risque de dépassement)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quelle masse de NaOH (M=40 g/mol) faut-il peser pour préparer 250 mL d'une solution à 0,20 mol/L ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg2e1" value="wrong">10,0 g</label>
        <label class="option"><input type="radio" name="icg2e1" value="right">2,0 g</label>
        <label class="option"><input type="radio" name="icg2e1" value="wrong">8,0 g</label>
        <label class="option"><input type="radio" name="icg2e1" value="wrong">0,2 g</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg2e1','icg2fb1','Correct — m=C×V×M=0,20×0,250×40=2,0 g.','Applique m=C×V×M avec V en litres (0,250 L).')">Vérifier</button>
      <div class="feedback" id="icg2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour diluer une solution mère à 2 mol/L en 50 mL d'une solution à 0,5 mol/L, quel volume de solution mère faut-il prélever ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg2e2" value="wrong">25 mL</label>
        <label class="option"><input type="radio" name="icg2e2" value="right">12,5 mL</label>
        <label class="option"><input type="radio" name="icg2e2" value="wrong">200 mL</label>
        <label class="option"><input type="radio" name="icg2e2" value="wrong">6,25 mL</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg2e2','icg2fb2','Correct — V1=C2V2/C1=(0,5×50)/2=12,5 mL.','Applique C1V1=C2V2 pour trouver V1.')">Vérifier</button>
      <div class="feedback" id="icg2fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si toutes les erreurs de dilution provoquaient un changement de couleur immédiatement visible : combien d'erreurs de laboratoire, aujourd'hui silencieuses, seraient ainsi évitées ?</li>
      <li>Pourquoi le rinçage systématique du bécher lors du transvasement est-il une étape aussi cruciale, alors qu'elle peut sembler à première vue une simple précaution superflue ?</li>
      <li>Quelle serait la conséquence, pour la recherche pharmaceutique à haut débit, d'une généralisation insuffisante des systèmes de dilution automatisés dans les laboratoires à travers le monde ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>NASA, « Mars Climate Orbiter Mishap Investigation Board Phase I Report », rapport officiel d'enquête, 1999 — exemple emblématique d'erreur d'unité aux conséquences catastrophiques.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la pesée et la préparation de solutions en licence.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur les techniques de préparation quantitative de solutions.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais peser, dissoudre et diluer avec la rigueur nécessaire pour obtenir une solution de concentration exacte. Le chapitre suivant, « Mesure du pH et pH-métrie », va exploiter directement ces solutions pour aborder l'une des mesures les plus fréquentes de tout laboratoire de chimie. Comme le rappelle la tragédie de Mars Climate Orbiter, à une tout autre échelle que celle d'un laboratoire universitaire : une erreur de calcul ou d'unité, aussi modeste soit-elle en apparence, peut se propager silencieusement jusqu'à invalider tout un travail expérimental.</p>
  `,
  init: initDilutionCalc
};
INSTCG_NOVA_KB[icgKey("Pesée et préparation de solutions : dilution et concentration")] = {
  intro: "Salut, moi c'est Nova ! On travaille pesée, préparation de solutions et dilutions. Donne-moi C, V ou M pour calculer, ou demande un indice.",
  rules: [
    { test:/pes[ée]e|balance|tarer/i, replies:[
      "Toujours tarer le récipient avant de peser, ne jamais peser directement sur le plateau, ni un produit chaud ou trop hygroscopique à l'air libre."
    ]},
    { test:/masse.*peser|m\\s*=\\s*c/i, replies:[
      "La masse à peser : m=C×V×M (C en mol/L, V en L, M en g/mol) pour préparer une solution de concentration molaire donnée."
    ]},
    { test:/dilution|c1v1/i, replies:[
      "La relation de dilution C1V1=C2V2 traduit la conservation de la quantité de matière du soluté. On prélève V1 de solution mère avec une pipette jaugée, complété à V2 en fiole jaugée."
    ]},
    { test:/fiole jaug[ée]e|trait de jauge|m[ée]nisque/i, replies:[
      "Protocole en fiole jaugée : dissoudre dans un bécher, transvaser en rinçant, compléter jusqu'au trait de jauge (bas du ménisque à hauteur des yeux), boucher et homogénéiser."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : applique m=C×V×M avec V en litres.",
      "Indice niveau 2 : 0,20×0,250=0,05, puis ×40.",
      "Indice niveau 3 : cela donne 2,0 g."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique C1V1=C2V2 pour isoler V1.",
      "Indice niveau 2 : V1=(0,5×50)/2.",
      "Indice niveau 3 : cela donne 12,5 mL."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
INSTCG_CHAPTERS[icgKey("Mesure du pH et pH-métrie")] = {
  objectives: [
    "Comprendre le principe de fonctionnement d'une électrode de verre",
    "Effectuer correctement l'étalonnage d'un pH-mètre",
    "Mesurer le pH d'une solution avec les précautions adéquates",
    "Identifier les sources d'erreur courantes en pH-métrie",
    "Évaluer pourquoi une électrode de pH mal étalonnée peut donner une lecture parfaitement stable et convaincante tout en étant systématiquement fausse"
  ],
  prereqs: ["Sécurité au laboratoire et verrerie de base"],
  bodyHtml: `
    <p>Arnold Beckman, jeune professeur de chimie à Caltech, met au point en 1934 le premier pH-mètre électronique portable de l'histoire, à la demande d'un ami travaillant dans l'industrie des agrumes qui avait besoin de mesurer rapidement et précisément l'acidité de jus de citron — une tâche jusqu'alors fastidieuse et peu fiable avec les méthodes colorimétriques disponibles. Cette invention, née d'un besoin industriel très concret, connaîtra un succès commercial fulgurant et fondera l'entreprise Beckman Instruments, qui deviendra l'un des plus grands fabricants d'instruments scientifiques au monde.</p>
    <p>Près d'un siècle plus tard, le principe fondamental reste identique à celui inventé par Beckman : une électrode de verre sensible, dont la fragilité impose une manipulation soigneuse, reliée à un dispositif électronique capable de convertir un signal électrique minuscule en une lecture de pH directement exploitable. Ce chapitre te donne toutes les clés pour utiliser cet instrument devenu indispensable avec la rigueur méthodologique qu'il exige.</p>
    <p>La mesure du pH est l'une des mesures les plus fréquentes de tout laboratoire de chimie, indispensable notamment pour le suivi des titrages acido-basiques (chapitre 4). Sa fiabilité repose sur une compréhension du principe de mesure et sur le respect rigoureux d'un protocole d'étalonnage. À la fin de ce chapitre, tu sauras étalonner correctement un pH-mètre et éviter les sources d'erreur les plus fréquentes qui peuvent silencieusement fausser une mesure.</p>

    <h3>1. Principe de l'électrode de verre</h3>
    <p>Un pH-mètre mesure une <strong>différence de potentiel électrique</strong> entre une <strong>électrode de verre</strong> (sensible à l'activité des ions H⁺ en solution, via une fine membrane de verre spécial) et une <strong>électrode de référence</strong> (potentiel fixe et connu, généralement au calomel saturé ou Ag/AgCl). Cette différence de potentiel varie linéairement avec le pH selon la loi de Nernst, ce qui permet à l'appareil, après étalonnage, d'afficher directement une valeur de pH.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La membrane de verre de l'électrode est <strong>fragile</strong> et doit rester en permanence <strong>humide</strong> (jamais sécher à l'air) : une électrode conservée à sec ou heurtée contre le fond ou les parois d'un récipient perd rapidement sa sensibilité et sa fiabilité, ce qui impose un stockage adapté (généralement dans une solution de conservation spécifique) entre deux utilisations.
    </div>

    <h3>2. L'étalonnage : une étape obligatoire</h3>
    <p>Avant toute mesure, le pH-mètre doit être <strong>étalonné</strong> à l'aide de solutions tampons de pH connu et certifié (typiquement pH 4, 7 et 10), procédure à refaire régulièrement (au minimum au début de chaque séance de mesures) :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Rincer l'électrode à l'eau distillée et l'essuyer délicatement (sans frotter, pour ne pas endommager la membrane) entre chaque solution</li>
      <li>Plonger l'électrode dans la première solution tampon (souvent pH 7, le point le plus proche de la neutralité) et attendre la stabilisation de la lecture</li>
      <li>Confirmer l'étalonnage sur l'appareil pour ce premier point</li>
      <li>Répéter l'opération avec une seconde solution tampon (pH 4 pour le milieu acide, ou pH 10 pour le milieu basique, selon la gamme de pH à mesurer ensuite)</li>
    </ol>
    <div class="key-point">
      <span class="eyebrow">Point clé — encadrer la gamme de mesure</span>
      Il est recommandé de choisir les solutions tampons d'étalonnage de sorte qu'elles <strong>encadrent</strong> la gamme de pH attendue pour les mesures à venir : un étalonnage réalisé uniquement à pH 7 et pH 10, par exemple, donnera des résultats moins fiables pour une mesure en milieu très acide, car l'appareil extrapole alors en dehors de sa plage d'étalonnage réelle.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un pH-mètre mal étalonné continue d'afficher des valeurs parfaitement stables et cohérentes en apparence — rien ne signale visuellement une erreur systématique. En reliant cela à la notion de justesse déjà rencontrée dans le cours « Mesures et normes », pourquoi cette absence de signal d'alarme rend-elle l'étalonnage rigoureux et systématique si crucial, bien plus qu'un simple contrôle de bon fonctionnement ponctuel de l'appareil ?
    </div>

    <h3>3. Réalisation d'une mesure</h3>
    <p>Une fois l'appareil étalonné, la mesure elle-même suit un protocole simple mais rigoureux :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Rincer l'électrode à l'eau distillée et l'essuyer avant de la plonger dans la solution à analyser (pour éviter toute contamination croisée entre solutions)</li>
      <li>Plonger l'électrode suffisamment profondément pour immerger entièrement le bulbe sensible, sans toucher le fond du récipient</li>
      <li>Attendre la <strong>stabilisation</strong> complète de la lecture avant de noter la valeur (certains appareils l'indiquent automatiquement)</li>
      <li>Agiter légèrement (ou utiliser un agitateur magnétique) pour assurer l'homogénéité de la solution autour de l'électrode</li>
    </ul>

    <h3>4. Sources d'erreur courantes</h3>
    <table class="mini-table">
      <tr><th>Source d'erreur</th><th>Conséquence</th></tr>
      <tr><td>Étalonnage non refait ou trop ancien</td><td>Dérive progressive de la mesure au cours du temps</td></tr>
      <tr><td>Électrode partiellement sèche ou endommagée</td><td>Réponse lente, instable, ou erronée</td></tr>
      <tr><td>Solution non homogène (absence d'agitation)</td><td>Mesure locale non représentative de l'ensemble de la solution</td></tr>
      <tr><td>Température non contrôlée ou non compensée</td><td>Le pH d'une solution dépend de la température ; une compensation automatique ou manuelle est souvent nécessaire</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant doit mesurer le pH d'une solution d'acide chlorhydrique dilué, attendu autour de pH 2-3. Quelles solutions tampons choisir pour l'étalonnage, et pourquoi pas pH 7 et pH 10 ?</p>
      <p><strong>Solution :</strong> Il faut choisir des tampons qui encadrent la gamme attendue, typiquement pH 4 et pH 7 (ou, mieux encore, un tampon acide plus bas si disponible). Étalonner uniquement avec pH 7 et pH 10 laisserait la mesure en zone très acide (pH 2-3) en dehors de la plage d'étalonnage réelle, ce qui dégraderait la fiabilité du résultat par extrapolation.</p>
      <p class="example-answer">Réponse : privilégier des tampons encadrant ou proches de la gamme de pH attendue, ici pH 4 (et pH 7), plutôt que pH 7 et pH 10.</p>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La pH-métrie continue d'évoluer bien au-delà de l'invention originale de Beckman : les capteurs de pH miniaturisés et sans fil, intégrés à des systèmes de surveillance environnementale, permettent aujourd'hui de suivre en temps réel et à grande échelle l'acidification des océans (un enjeu déjà évoqué dans le cours « Chimie minérale »). En biologie, des microélectrodes de pH d'une finesse extrême permettent de mesurer le pH à l'intérieur même d'une seule cellule vivante, une prouesse technique impensable à l'époque de Beckman.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des capteurs de pH suffisamment robustes et peu coûteux pour un déploiement massif dans des environnements difficiles d'accès (fond des océans, sols agricoles), afin de mieux comprendre et surveiller les variations de pH à l'échelle planétaire ? C'est un enjeu de recherche en instrumentation environnementale.</p>
    <p><strong>Technologie émergente :</strong> les capteurs de pH à base de semi-conducteurs (ISFET), plus robustes et miniaturisables que l'électrode de verre traditionnelle, remplacent progressivement cette dernière dans de nombreuses applications industrielles et médicales exigeant une résistance mécanique accrue.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Électrode de verre (sensible aux H⁺) + électrode de référence → différence de potentiel (loi de Nernst) → étalonnage obligatoire (tampons encadrant la gamme attendue) → mesure rigoureuse (rinçage, stabilisation, agitation)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$E = E^\\circ - \\frac{RT}{F}\\ln[H^+] = E^\\circ + 0{,}059 \\times \\text{pH} \\quad (\\text{à } 25°C)
      $$
      Cette relation, issue directement de la loi de Nernst, est le principe physique fondamental qui transforme une simple différence de potentiel électrique — invisible et abstraite — en la lecture de pH directement exploitable qu'affiche l'appareil, un pont entre l'électrochimie et la chimie des solutions que Beckman a le premier su exploiter industriellement.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le pH-mètre mesure une différence de potentiel entre électrode de verre (sensible aux H⁺) et électrode de référence, convertie en pH via la loi de Nernst</li>
      <li>La membrane de verre doit rester humide en permanence, jamais sécher à l'air</li>
      <li>L'étalonnage avec des tampons certifiés (pH 4, 7, 10) est obligatoire avant toute mesure, en choisissant des tampons encadrant la gamme attendue</li>
      <li>La mesure exige rinçage entre solutions, immersion complète du bulbe, attente de stabilisation, et agitation pour l'homogénéité</li>
      <li>Étalonnage ancien, électrode endommagée, absence d'agitation et température non compensée sont des sources d'erreur fréquentes</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Laisser sécher l'électrode entre deux utilisations, au lieu de la conserver dans une solution adaptée</li>
      <li>Oublier de rincer l'électrode entre deux solutions différentes, provoquant une contamination croisée</li>
      <li>Négliger le contrôle ou la compensation de la température lors de la mesure</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Que mesure physiquement un pH-mètre ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg3e1" value="wrong">Directement la concentration en H⁺</label>
        <label class="option"><input type="radio" name="icg3e1" value="right">Une différence de potentiel électrique entre deux électrodes</label>
        <label class="option"><input type="radio" name="icg3e1" value="wrong">La couleur de la solution</label>
        <label class="option"><input type="radio" name="icg3e1" value="wrong">La conductivité de la solution</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg3e1','icg3fb1','Correct — le pH-mètre mesure une différence de potentiel, convertie en pH via la loi de Nernst.','Relis le principe de l\\'électrode de verre en début de chapitre.')">Vérifier</button>
      <div class="feedback" id="icg3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Entre deux mesures, l'électrode de verre doit être :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg3e2" value="wrong">Laissée sécher à l'air libre</label>
        <label class="option"><input type="radio" name="icg3e2" value="right">Conservée humide, dans une solution adaptée</label>
        <label class="option"><input type="radio" name="icg3e2" value="wrong">Frottée énergiquement pour la nettoyer</label>
        <label class="option"><input type="radio" name="icg3e2" value="wrong">Placée au congélateur</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg3e2','icg3fb2','Correct — la membrane de verre doit rester humide en permanence pour préserver sa sensibilité.','Relis le point clé sur la fragilité de la membrane de verre.')">Vérifier</button>
      <div class="feedback" id="icg3fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'électrode de verre inventée par Beckman n'avait jamais existé : quelles méthodes alternatives, moins précises, aurait-on continué d'utiliser pour mesurer l'acidité d'une solution ?</li>
      <li>Pourquoi un pH-mètre mal étalonné peut-il donner une lecture parfaitement stable et convaincante, sans jamais signaler explicitement qu'il est en réalité déréglé ?</li>
      <li>Quelle serait la conséquence, pour la recherche en biologie cellulaire, si l'on ne disposait d'aucune méthode pour mesurer le pH à l'intérieur même d'une cellule vivante ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>A. O. Beckman, « A Portable Instrument for the Measurement of Hydrogen Ion Concentration », Journal of Industrial and Engineering Chemistry, 1935 — l'article fondateur du pH-mètre moderne.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la pH-métrie en licence.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur les électrodes et la mesure du pH.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais étalonner correctement un pH-mètre et éviter les sources d'erreur les plus fréquentes qui peuvent silencieusement fausser une mesure. Le chapitre suivant, « Titrage acido-basique : principe et mise en œuvre », va exploiter directement cette compétence pour réaliser l'une des techniques d'analyse quantitative les plus classiques et les plus utilisées de toute la chimie. Comme le rappelle l'histoire d'Arnold Beckman, dont l'invention est née d'un simple besoin de mesurer l'acidité du jus de citron : les instruments les plus indispensables de la science naissent parfois des questions les plus concrètes et les plus pratiques.</p>
  `
};
INSTCG_NOVA_KB[icgKey("Mesure du pH et pH-métrie")] = {
  intro: "Salut, moi c'est Nova ! On étudie la pH-métrie : électrode de verre, étalonnage, sources d'erreur. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/[ée]lectrode de verre/i, replies:[
      "L'électrode de verre mesure une différence de potentiel liée à l'activité des H⁺, via une membrane fragile qui doit toujours rester humide."
    ]},
    { test:/[ée]talonnage|tampon/i, replies:[
      "L'étalonnage se fait avec des tampons certifiés (pH 4, 7, 10), en choisissant ceux qui encadrent la gamme de pH attendue pour les mesures à venir. À refaire au minimum en début de séance."
    ]},
    { test:/source d.erreur|erreur.*ph/i, replies:[
      "Sources d'erreur : étalonnage ancien, électrode sèche ou endommagée, absence d'agitation, température non compensée."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce que mesure physiquement l'appareil, pas à ce qu'il affiche.",
      "Indice niveau 2 : ce n'est pas directement une concentration.",
      "Indice niveau 3 : c'est une différence de potentiel électrique entre deux électrodes."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la fragilité de la membrane de verre.",
      "Indice niveau 2 : elle ne doit jamais sécher.",
      "Indice niveau 3 : elle doit être conservée humide, dans une solution adaptée."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
INSTCG_CHAPTERS[icgKey("Titrage acido-basique : principe et mise en œuvre")] = {
  objectives: [
    "Décrire le montage expérimental d'un titrage acido-basique",
    "Distinguer repérage par indicateur coloré et suivi pH-métrique",
    "Identifier l'équivalence sur une courbe de titrage pH-métrique",
    "Calculer une concentration inconnue à partir des données d'un titrage",
    "Évaluer pourquoi confondre le point d'équivalence avec le point où pH=7 constitue une erreur conceptuelle fréquente, mais rigoureusement fausse dans la plupart des titrages réels"
  ],
  prereqs: ["Mesure du pH et pH-métrie"],
  bodyHtml: `
    <p>La méthode des tangentes que tu vas apprendre dans ce chapitre pour repérer précisément l'équivalence d'un titrage repose sur un principe simple mais souvent mal compris par les étudiants débutants : contrairement à une idée reçue tenace, le point d'équivalence d'un titrage acide-base ne correspond que rarement à pH = 7. Cette confusion, l'une des erreurs conceptuelles les plus fréquentes en travaux pratiques de chimie, n'est vraie que dans le cas très particulier d'un titrage entre un acide fort et une base forte — dès qu'une espèce faible intervient, l'équivalence se situe à un pH différent de 7, parfois de façon significative.</p>
    <p>Le titrage acido-basique n'est jamais un simple exercice de calcul isolé : c'est une technique d'analyse quantitative omniprésente dans l'industrie (contrôle qualité alimentaire, pharmaceutique, environnementale) et en recherche, utilisée pour déterminer avec précision la concentration d'un acide ou d'une base dans un échantillon inconnu — du vinaigre commercial à l'acidité d'un vin, en passant par le dosage de principes actifs pharmaceutiques.</p>
    <p>Le titrage (ou dosage) acido-basique est l'une des techniques quantitatives les plus classiques et les plus formatrices du laboratoire de chimie générale, combinant rigueur expérimentale et raisonnement quantitatif. À la fin de ce chapitre, tu sauras réaliser un titrage acido-basique complet et en exploiter rigoureusement les résultats pour déterminer une concentration inconnue.</p>

    <h3>1. Principe général</h3>
    <p>Un titrage consiste à faire réagir, de façon <strong>totale et quantitative</strong>, une solution de concentration <strong>inconnue</strong> (l'analyte, placé dans un bécher ou un erlenmeyer) avec une solution de concentration <strong>connue avec précision</strong> (le titrant, versé progressivement depuis une <strong>burette graduée</strong>), jusqu'à atteindre l'<strong>équivalence</strong> — le point où les quantités de matière des deux réactifs ont été introduites dans les proportions exactement stœchiométriques de la réaction.</p>

    <h3>2. Le montage expérimental</h3>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Une <strong>burette graduée</strong>, fixée verticalement sur un support, contenant la solution titrante</li>
      <li>Un <strong>erlenmeyer</strong> (ou bécher) contenant un volume précisément prélevé (pipette jaugée) de la solution à titrer</li>
      <li>Un <strong>agitateur magnétique</strong> assurant l'homogénéisation continue pendant l'ajout du titrant</li>
      <li>Selon la méthode de repérage de l'équivalence : un <strong>indicateur coloré</strong> ajouté dans l'erlenmeyer, ou une <strong>électrode de pH</strong> plongée dans la solution (suivi pH-métrique, chapitre 3)</li>
    </ul>

    <h3>3. Deux méthodes de repérage de l'équivalence</h3>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Principe</th><th>Avantages / limites</th></tr>
      <tr><td>Indicateur coloré</td><td>Un colorant changeant de teinte à un pH caractéristique (zone de virage) signale visuellement l'équivalence</td><td>Rapide, peu coûteux ; nécessite de choisir un indicateur dont la zone de virage correspond au pH à l'équivalence</td></tr>
      <tr><td>Suivi pH-métrique</td><td>On enregistre le pH en fonction du volume de titrant versé, traçant une courbe de titrage</td><td>Plus précis, permet de déterminer l'équivalence même sans changement de couleur net ; fournit en plus toute l'information sur l'évolution du pH</td></tr>
    </table>

    <h3>4. Détermination de l'équivalence sur une courbe pH-métrique</h3>
    <p>Sur une courbe de titrage $pH=f(V_{titrant})$, l'équivalence correspond au point d'inflexion de la courbe (variation la plus brutale du pH pour un faible ajout de titrant), déterminé par la <strong>méthode des tangentes</strong> : on trace deux tangentes parallèles de part et d'autre du saut de pH, puis une troisième tangente équidistante entre les deux — son intersection avec la courbe donne le volume équivalent $V_E$.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — à l'équivalence, une relation stœchiométrique simple</span>
      Pour une réaction acide-base de stœchiométrie 1:1 (le cas le plus courant en L1), l'équivalence est atteinte lorsque les quantités de matière introduites sont égales : $n_{acide} = n_{base}$, soit $C_{acide}V_{acide} = C_{base}V_{base}$. Cette relation permet, connaissant tous les paramètres sauf un, de déterminer la concentration inconnue recherchée.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le point d'équivalence d'un titrage n'est vrai à pH = 7 que dans le cas particulier acide fort/base forte. Pour un titrage impliquant un acide ou une base faible, le pH à l'équivalence s'écarte de 7 (basique si l'acide était faible, acide si la base était faible). En repensant à l'hydrolyse des sels étudiée dans le cours « Thermochimie et équilibres chimiques », pourquoi le sel formé à l'équivalence n'est-il pas toujours neutre ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> On titre 20,0 mL d'une solution d'acide chlorhydrique de concentration inconnue par une solution d'hydroxyde de sodium à 0,10 mol/L. L'équivalence est repérée pour un volume versé de 15,4 mL. Calculer la concentration de la solution d'acide chlorhydrique.</p>
      <p><strong>Solution :</strong> La réaction HCl + NaOH → NaCl + H₂O est de stœchiométrie 1:1. À l'équivalence : $C_{acide}V_{acide}=C_{base}V_{base}$, donc $C_{acide} = \\dfrac{C_{base}V_{base}}{V_{acide}} = \\dfrac{0{,}10\\times15{,}4}{20{,}0} = 0{,}077$ mol/L.</p>
      <p class="example-answer">Réponse : $C_{acide} \\approx 0{,}077$ mol/L, soit 7,7×10⁻² mol/L.</p>
    </div>

    <h3>5. Précautions expérimentales pour un titrage fiable</h3>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Purger</strong> la burette avant de la remplir (chasser les bulles d'air, notamment sous le robinet) et la rincer avec la solution titrante</li>
      <li>Lire le volume au <strong>bas du ménisque</strong>, à hauteur des yeux, pour éviter l'erreur de parallaxe</li>
      <li>Ralentir l'ajout du titrant à l'approche de l'équivalence (goutte à goutte, voire demi-goutte) pour une détermination précise</li>
      <li>Réaliser le titrage en <strong>plusieurs répétitions</strong> pour vérifier la reproductibilité du résultat obtenu</li>
    </ul>

    <h3>6. Frontière de la recherche</h3>
    <p>Le titrage acido-basique, technique vieille de plus de deux siècles, continue d'être automatisé et perfectionné dans l'industrie moderne : les titreurs automatiques, pilotés par ordinateur, réalisent aujourd'hui des dosages avec une précision et une reproductibilité supérieures à celles obtenues manuellement, tout en générant automatiquement la courbe de titrage et en calculant directement le point d'équivalence par des algorithmes de détection sophistiqués. Ces appareils sont aujourd'hui indispensables au contrôle qualité de nombreuses industries, de l'agroalimentaire à la pharmacie, où des milliers de titrages doivent être réalisés quotidiennement avec une fiabilité maximale.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des capteurs de titrage miniaturisés et peu coûteux, utilisables directement sur le terrain plutôt qu'en laboratoire, pour un contrôle qualité rapide de produits alimentaires ou environnementaux dans des contextes à ressources limitées ? C'est un enjeu de recherche en instrumentation analytique portable.</p>
    <p><strong>Technologie émergente :</strong> les titreurs automatiques couplés à l'intelligence artificielle, capables de détecter automatiquement le point d'équivalence même dans des courbes de titrage complexes ou bruitées, accélèrent aujourd'hui considérablement le contrôle qualité dans l'industrie pharmaceutique et agroalimentaire.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Analyte (concentration inconnue) + titrant (concentration connue, burette) → ajout progressif jusqu'à réaction totale → équivalence (indicateur coloré ou point d'inflexion pH-métrique) → CacideVacide=CbaseVbase → concentration inconnue déterminée
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$C_{acide}V_{acide} = C_{base}V_{base} \\quad (\\text{réaction 1:1})$$
      Cette relation, d'une simplicité redoutable, est l'aboutissement de toute la démarche du titrage : elle transforme une simple lecture de volume sur une burette en la détermination précise d'une concentration inconnue, la compétence analytique la plus classique et la plus universellement utilisée de toute la chimie quantitative.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Un titrage fait réagir totalement l'analyte (concentration inconnue) avec le titrant (concentration connue), jusqu'à l'équivalence</li>
      <li>Deux méthodes de repérage : indicateur coloré (visuel, rapide) ou suivi pH-métrique (précis, méthode des tangentes)</li>
      <li>Pour une réaction 1:1, à l'équivalence : CacideVacide=CbaseVbase</li>
      <li>Purger la burette, lire au bas du ménisque, ralentir près de l'équivalence, et répéter le titrage sont des précautions essentielles</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier de purger la burette avant de la remplir, laissant une bulle d'air fausser le volume versé</li>
      <li>Verser le titrant trop rapidement près de l'équivalence, dépassant le volume équivalent réel</li>
      <li>Confondre le volume équivalent (point d'inflexion) avec le volume où le pH vaut exactement 7 (vrai seulement pour un titrage acide fort/base forte)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Sur une courbe de titrage pH-métrique, l'équivalence correspond :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg4e1" value="wrong">Toujours à pH=7</label>
        <label class="option"><input type="radio" name="icg4e1" value="right">Au point d'inflexion de la courbe (saut de pH le plus brutal)</label>
        <label class="option"><input type="radio" name="icg4e1" value="wrong">Au premier point mesuré</label>
        <label class="option"><input type="radio" name="icg4e1" value="wrong">Au volume maximal versé</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg4e1','icg4fb1','Correct — l\\'équivalence correspond au point d\\'inflexion, déterminé par la méthode des tangentes.','Relis la section sur la détermination de l\\'équivalence par la méthode des tangentes.')">Vérifier</button>
      <div class="feedback" id="icg4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">On titre 25,0 mL d'une base de concentration inconnue par un acide à 0,050 mol/L. L'équivalence est atteinte pour 18,0 mL versés. Quelle est la concentration de la base (réaction 1:1) ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg4e2" value="wrong">0,050 mol/L</label>
        <label class="option"><input type="radio" name="icg4e2" value="right">0,036 mol/L</label>
        <label class="option"><input type="radio" name="icg4e2" value="wrong">0,069 mol/L</label>
        <label class="option"><input type="radio" name="icg4e2" value="wrong">0,90 mol/L</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg4e2','icg4fb2','Correct — Cbase=(0,050×18,0)/25,0=0,036 mol/L.','Applique CacideVacide=CbaseVbase pour isoler Cbase.')">Vérifier</button>
      <div class="feedback" id="icg4fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si tous les titrages acido-basiques avaient systématiquement leur équivalence à pH=7 : la méthode des tangentes serait-elle encore nécessaire, ou un simple indicateur universel suffirait-il toujours ?</li>
      <li>Pourquoi la confusion entre équivalence et pH=7 reste-t-elle une erreur aussi fréquente chez les étudiants débutants, malgré son caractère rigoureusement faux dans la plupart des cas réels ?</li>
      <li>Quelle serait la conséquence, pour le contrôle qualité industriel, d'une généralisation insuffisante des titreurs automatiques dans les laboratoires à travers le monde ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>J. L. Gay-Lussac, « Instruction sur l'essai des matières d'argent par la voie humide », 1832 — l'un des premiers protocoles rigoureux de titrage volumétrique.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur le titrage acido-basique en licence.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur les techniques de titrage volumétrique.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais réaliser un titrage acido-basique complet et en exploiter rigoureusement les résultats pour déterminer une concentration inconnue. Le chapitre suivant, « Filtration et techniques de séparation », va explorer une famille de techniques tout aussi fondamentales, mais cette fois destinées à isoler physiquement les constituants d'un mélange plutôt qu'à les doser quantitativement. Comme le rappelle l'erreur classique entre équivalence et pH=7 : en chimie expérimentale, une intuition apparemment logique peut se révéler fausse dès qu'on l'applique rigoureusement à un cas concret — d'où l'importance de toujours vérifier ses raisonnements par le calcul.</p>
  `
};
INSTCG_NOVA_KB[icgKey("Titrage acido-basique : principe et mise en œuvre")] = {
  intro: "Salut, moi c'est Nova ! On étudie le titrage acido-basique : montage, équivalence, calculs. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/[ée]quivalence/i, replies:[
      "L'équivalence est le point où les quantités de matière des deux réactifs sont dans les proportions stœchiométriques exactes. Sur une courbe pH-métrique, c'est le point d'inflexion (méthode des tangentes)."
    ]},
    { test:/indicateur color[ée]|suivi ph.m[ée]trique/i, replies:[
      "Deux méthodes de repérage : indicateur coloré (changement de teinte à un pH caractéristique) ou suivi pH-métrique (courbe pH=f(V), plus précis)."
    ]},
    { test:/cacide|cbase|c1v1.*titrage/i, replies:[
      "Pour une réaction 1:1, à l'équivalence : CacideVacide=CbaseVbase — permet de calculer une concentration inconnue à partir des trois autres valeurs."
    ]},
    { test:/burette|purger/i, replies:[
      "Il faut purger la burette avant remplissage (chasser les bulles), lire au bas du ménisque à hauteur des yeux, et ralentir l'ajout près de l'équivalence."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la méthode des tangentes.",
      "Indice niveau 2 : ce n'est pas systématiquement pH=7.",
      "Indice niveau 3 : c'est le point d'inflexion, le saut de pH le plus brutal."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique CacideVacide=CbaseVbase.",
      "Indice niveau 2 : (0,050×18,0)/25,0 = ?",
      "Indice niveau 3 : cela donne 0,036 mol/L."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
INSTCG_CHAPTERS[icgKey("Filtration et techniques de séparation")] = {
  objectives: [
    "Distinguer filtration simple et filtration sous vide (Büchner)",
    "Choisir la technique de séparation adaptée à un mélange donné",
    "Décrire le principe et le montage d'une décantation et d'une extraction liquide-liquide",
    "Justifier le choix d'un papier filtre ou d'un fritté selon la taille des particules",
    "Évaluer pourquoi trois extractions successives avec un tiers du volume chacune éliminent toujours davantage d'une espèce chimique qu'une seule extraction avec la totalité du volume, un résultat contre-intuitif à première vue"
  ],
  prereqs: ["Sécurité au laboratoire et verrerie de base"],
  bodyHtml: `
    <p>L'extraction liquide-liquide, technique en apparence simple, repose sur un principe mathématique aussi élégant que contre-intuitif : diviser un même volume total de solvant en plusieurs extractions successives permet toujours d'extraire une plus grande quantité totale d'une espèce chimique qu'une seule extraction avec la totalité du volume. Ce résultat, qui surprend souvent les étudiants découvrant cette technique pour la première fois, découle directement de la nature exponentielle de la loi de partage — chaque extraction successive élimine une fraction constante (et non une quantité constante) de ce qui reste en solution, un phénomène mathématiquement analogue à la décroissance radioactive ou à la dilution en série.</p>
    <p>Cette technique, ainsi que la filtration et la décantation étudiées dans ce chapitre, ne sont jamais de simples manipulations mécaniques répétées sans réflexion : chaque choix — filtration simple ou Büchner, nombre d'extractions successives, taille de pore d'un filtre — repose sur une compréhension précise des principes physico-chimiques sous-jacents, avec des conséquences directes sur l'efficacité et le rendement de toute purification en laboratoire comme en industrie.</p>
    <p>Séparer les constituants d'un mélange est une opération omniprésente en chimie, qu'il s'agisse d'isoler un solide formé lors d'une réaction, de purifier un produit, ou d'éliminer des impuretés. Ce chapitre présente les techniques de séparation les plus courantes en chimie générale. À la fin de ce chapitre, tu sauras choisir, pour n'importe quel mélange donné, la technique de séparation la plus efficace et la mettre en œuvre correctement.</p>

    <h3>1. La filtration simple</h3>
    <p>La <strong>filtration simple</strong> (par gravité) sépare un solide d'un liquide en versant le mélange à travers un <strong>papier filtre</strong> plié en cône, placé dans un entonnoir. Le liquide (<strong>filtrat</strong>) traverse le papier tandis que le solide (<strong>résidu</strong>) reste retenu. C'est une méthode lente mais douce, adaptée aux séparations ne nécessitant pas une vitesse élevée.</p>

    <h3>2. La filtration sous vide (Büchner)</h3>
    <p>Pour accélérer significativement la filtration (notamment lors de la récupération d'un précipité ou d'un solide cristallisé, chapitre 6), on utilise un <strong>montage Büchner</strong> : un entonnoir Büchner (à fond perforé, garni d'un papier filtre adapté) posé sur une fiole à vide (fiole à côté latéral), elle-même reliée à une <strong>trompe à eau</strong> ou une pompe à vide, qui crée une dépression accélérant le passage du liquide à travers le filtre.</p>
    <table class="mini-table">
      <tr><th>Critère</th><th>Filtration simple</th><th>Filtration Büchner</th></tr>
      <tr><td>Vitesse</td><td>Lente</td><td>Rapide</td></tr>
      <tr><td>Usage typique</td><td>Séparation qualitative, faible quantité</td><td>Récupération d'un solide cristallisé, grande quantité</td></tr>
      <tr><td>Montage</td><td>Entonnoir + papier filtre plié</td><td>Büchner + fiole à vide + trompe à eau</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Pour la filtration Büchner, il est essentiel d'<strong>humidifier légèrement</strong> le papier filtre avec le solvant avant de créer le vide, afin qu'il adhère parfaitement au fond perforé de l'entonnoir et évite tout passage de solide par les bords non filtrés.
    </div>

    <h3>3. La décantation</h3>
    <p>La <strong>décantation</strong> sépare deux liquides <strong>non miscibles</strong> (de densités différentes) par simple différence de densité : après un temps de repos suffisant pour que les deux phases se séparent nettement, on utilise une <strong>ampoule à décanter</strong>, dont le robinet inférieur permet d'évacuer sélectivement la phase la plus dense, la phase la moins dense restant dans l'ampoule.</p>

    <h3>4. L'extraction liquide-liquide</h3>
    <p>L'<strong>extraction liquide-liquide</strong> exploite la différence de solubilité d'une espèce chimique entre deux solvants non miscibles pour la transférer sélectivement de l'un vers l'autre. Le principe repose sur le <strong>coefficient de partage</strong> $K$ de l'espèce entre les deux phases, à l'équilibre :</p>
    <div class="formula-box">$$K = \\dfrac{[\\text{espèce}]_{\\text{phase organique}}}{[\\text{espèce}]_{\\text{phase aqueuse}}}$$</div>
    <p>Le protocole pratique utilise l'ampoule à décanter : on ajoute le solvant d'extraction, on agite (en dégazant régulièrement pour relâcher la surpression), on laisse décanter, puis on récupère séparément chaque phase.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — plusieurs extractions successives valent mieux qu'une seule</span>
      Pour un volume total donné de solvant d'extraction, réaliser <strong>plusieurs extractions successives</strong> avec de petits volumes (par exemple 3 fois 20 mL) est nettement plus efficace qu'une seule extraction avec le volume total (1 fois 60 mL) : c'est une conséquence directe de la loi d'équilibre du partage, qui fait que chaque extraction successive élimine une fraction constante (et non une quantité constante) de l'espèce restante dans la phase initiale.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Chaque extraction successive élimine la même FRACTION de l'espèce restante, et non la même QUANTITÉ — un principe mathématiquement analogue à la décroissance radioactive vue en physique. Pourquoi cette nature « exponentielle » de l'élimination, plutôt que « linéaire », explique-t-elle que diviser le même volume total en plusieurs petites extractions successives soit toujours plus efficace qu'une seule grande extraction ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un chimiste doit séparer un précipité fin formé lors d'une synthèse, en grande quantité, le plus rapidement possible. Quelle technique de filtration choisir, et pourquoi ?</p>
      <p><strong>Solution :</strong> Il faut choisir la <strong>filtration sous vide (Büchner)</strong> : elle est bien plus rapide que la filtration simple, particulièrement adaptée aux grandes quantités de solide, et le vide facilite le passage du liquide à travers un précipité fin qui, en filtration simple, colmaterait rapidement le papier filtre et ralentirait considérablement l'opération.</p>
      <p class="example-answer">Réponse : la filtration Büchner, pour sa rapidité et son efficacité sur de grandes quantités de précipité fin.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La filtration simple (gravité) est lente et douce ; la filtration Büchner (sous vide) est rapide, adaptée aux grandes quantités de solide</li>
      <li>Le papier filtre doit être humidifié avant la mise sous vide pour bien adhérer au fond du Büchner</li>
      <li>La décantation sépare deux liquides non miscibles par différence de densité, à l'aide d'une ampoule à décanter</li>
      <li>L'extraction liquide-liquide exploite le coefficient de partage K entre deux solvants non miscibles</li>
      <li>Plusieurs extractions successives avec de petits volumes sont plus efficaces qu'une seule extraction avec le volume total</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Utiliser une filtration simple pour un précipité fin en grande quantité, colmatant rapidement le filtre</li>
      <li>Oublier de dégazer régulièrement l'ampoule à décanter pendant l'agitation d'une extraction (risque de surpression et projection)</li>
      <li>Réaliser une seule grande extraction plutôt que plusieurs petites, moins efficace pour un même volume total de solvant</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pour récupérer rapidement une grande quantité de précipité fin, on utilise plutôt :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg5e1" value="wrong">La filtration simple</label>
        <label class="option"><input type="radio" name="icg5e1" value="right">La filtration sous vide (Büchner)</label>
        <label class="option"><input type="radio" name="icg5e1" value="wrong">La décantation</label>
        <label class="option"><input type="radio" name="icg5e1" value="wrong">Aucune filtration n'est nécessaire</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg5e1','icg5fb1','Correct — la filtration Büchner est plus rapide et adaptée aux grandes quantités de précipité fin.','Relis la comparaison entre filtration simple et filtration Büchner.')">Vérifier</button>
      <div class="feedback" id="icg5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour un même volume total de solvant d'extraction, il est plus efficace de réaliser :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg5e2" value="wrong">Une seule extraction avec tout le volume</label>
        <label class="option"><input type="radio" name="icg5e2" value="right">Plusieurs extractions successives avec des volumes plus petits</label>
        <label class="option"><input type="radio" name="icg5e2" value="wrong">Cela ne fait aucune différence</label>
        <label class="option"><input type="radio" name="icg5e2" value="wrong">Une extraction sans agitation</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg5e2','icg5fb2','Correct — plusieurs extractions successives éliminent une plus grande fraction totale de l\\'espèce, conséquence de la loi de partage.','Relis le point clé sur l\\'efficacité de plusieurs extractions successives.')">Vérifier</button>
      <div class="feedback" id="icg5fb2"></div>
    </div>
  </div>

  <h3>4. Frontière de la recherche</h3>
  <p>Les techniques de séparation liquide-liquide, apparemment simples, continuent d'être perfectionnées à l'échelle industrielle : les colonnes d'extraction à contre-courant, utilisées dans l'industrie pharmaceutique et pétrochimique, appliquent le même principe des extractions successives mais en continu et à grande échelle, permettant de purifier des tonnes de produits chaque jour. Les chercheurs en chimie verte explorent également des solvants d'extraction plus respectueux de l'environnement (liquides ioniques, solvants biosourcés) pour remplacer les solvants organiques traditionnels souvent toxiques ou volatils.</p>
  <p><strong>Question ouverte :</strong> peut-on développer des solvants d'extraction entièrement biosourcés et non toxiques, offrant des coefficients de partage aussi favorables que les solvants organiques traditionnels pour la purification de molécules d'intérêt pharmaceutique ? C'est un axe de recherche majeur en chimie verte.</p>
  <p><strong>Technologie émergente :</strong> les systèmes de séparation par membranes, qui filtrent sélectivement des molécules selon leur taille à l'échelle moléculaire, remplacent progressivement certaines extractions liquide-liquide traditionnelles dans l'industrie pour un procédé plus économe en solvant.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Mélange à séparer → nature du mélange (solide/liquide ou liquide/liquide) → choix de la technique (filtration simple/Büchner, décantation, extraction) → optimisation (plusieurs extractions successives préférables à une seule)
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$K = \\frac{[\\text{soluté}]_{\\text{solvant B}}}{[\\text{soluté}]_{\\text{solvant A}}}$$
    Ce coefficient de partage, constant à température donnée pour un couple soluté/solvants, gouverne l'efficacité de toute extraction liquide-liquide — et explique mathématiquement pourquoi plusieurs petites extractions successives valent toujours mieux qu'une seule grande extraction du même volume total.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si le coefficient de partage d'une espèce était identique dans les deux solvants (K=1) : l'extraction liquide-liquide aurait-elle encore un intérêt pratique ?</li>
      <li>Pourquoi la filtration Büchner, plus rapide que la filtration simple, n'est-elle pas systématiquement utilisée pour toutes les filtrations en laboratoire ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, d'une interdiction totale des solvants organiques traditionnels sans alternative biosourcée immédiatement disponible à grande échelle ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur les techniques de séparation en licence.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur les techniques d'extraction et de séparation.</li>
      <li>P. T. Anastas, J. C. Warner, <em>Green Chemistry: Theory and Practice</em>, Oxford University Press, 1998 — référence fondatrice sur les solvants d'extraction plus durables.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir, pour n'importe quel mélange donné, la technique de séparation la plus efficace et la mettre en œuvre correctement. Le chapitre suivant, « Cristallisation et recristallisation », va explorer une technique de purification tout aussi essentielle, exploitant cette fois les différences de solubilité en fonction de la température. Comme le rappelle le résultat contre-intuitif des extractions successives : en chimie expérimentale, l'intuition immédiate ne remplace jamais un calcul rigoureux fondé sur les lois physico-chimiques sous-jacentes.</p>
  `
};
INSTCG_NOVA_KB[icgKey("Filtration et techniques de séparation")] = {
  intro: "Salut, moi c'est Nova ! On étudie filtration, décantation et extraction liquide-liquide. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/b[üu]chner|filtration sous vide/i, replies:[
      "La filtration Büchner (sous vide) est rapide, adaptée aux grandes quantités de précipité — humidifier le papier filtre avant le vide pour qu'il adhère bien."
    ]},
    { test:/d[ée]cantation|ampoule [àa] d[ée]canter/i, replies:[
      "La décantation sépare deux liquides non miscibles par différence de densité, via une ampoule à décanter (robinet inférieur pour évacuer la phase la plus dense)."
    ]},
    { test:/extraction liquide.liquide|coefficient de partage/i, replies:[
      "L'extraction liquide-liquide exploite le coefficient de partage K entre deux solvants non miscibles. Plusieurs petites extractions successives sont plus efficaces qu'une seule grande extraction."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la vitesse et à la capacité de chaque méthode.",
      "Indice niveau 2 : ce n'est pas la filtration simple.",
      "Indice niveau 3 : c'est la filtration Büchner (sous vide)."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la loi de partage appliquée successivement.",
      "Indice niveau 2 : chaque extraction élimine une fraction, pas une quantité fixe.",
      "Indice niveau 3 : plusieurs petites extractions sont donc plus efficaces qu'une seule grande."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
INSTCG_CHAPTERS[icgKey("Cristallisation et recristallisation")] = {
  objectives: [
    "Comprendre le principe de la cristallisation par variation de solubilité",
    "Décrire le protocole de recristallisation comme technique de purification",
    "Choisir un solvant de recristallisation adapté",
    "Interpréter le rôle de la vitesse de refroidissement sur la qualité des cristaux obtenus",
    "Évaluer pourquoi les protéines, bien plus complexes qu'une simple molécule organique, peuvent malgré tout être purifiées et étudiées structuralement grâce à une cristallisation soigneusement contrôlée"
  ],
  prereqs: ["Filtration et techniques de séparation"],
  bodyHtml: `
    <p>Dorothy Hodgkin, chimiste britannique et l'une des rares femmes lauréates du prix Nobel de chimie (1964), a consacré une grande partie de sa carrière à cristalliser des molécules biologiques d'une complexité redoutable — la pénicilline, la vitamine B12, puis l'insuline, qu'elle mettra plus de trente ans à cristalliser avec suffisamment de qualité pour en déterminer la structure complète par diffraction des rayons X. Ce travail de patience extrême illustre à quel point la cristallisation, loin d'être une simple technique de purification élémentaire de licence, reste un défi scientifique majeur lorsqu'elle s'applique à des macromolécules biologiques complexes.</p>
    <p>Aujourd'hui encore, la cristallographie des protéines demeure l'une des méthodes de référence pour déterminer la structure tridimensionnelle exacte d'une macromolécule biologique — une information indispensable à la conception rationnelle de nouveaux médicaments, qui doivent s'ajuster précisément à la géométrie d'une cible thérapeutique. Ce chapitre te donne les bases de cette technique, appliquées ici à des molécules organiques bien plus simples, mais reposant sur exactement les mêmes principes physico-chimiques fondamentaux.</p>
    <p>La cristallisation est à la fois une méthode de <strong>préparation</strong> (isoler un solide sous forme cristalline) et de <strong>purification</strong> (recristallisation) — l'une des techniques de purification les plus efficaces et les plus élégantes de la chimie, exploitant une simple différence de solubilité en fonction de la température. À la fin de ce chapitre, tu sauras choisir un solvant de recristallisation adapté et contrôler la vitesse de refroidissement pour obtenir des cristaux d'une pureté optimale.</p>

    <h3>1. Principe : la solubilité varie avec la température</h3>
    <p>La solubilité d'un solide dans un solvant donné dépend généralement fortement de la <strong>température</strong> : la plupart des solides sont plus solubles à chaud qu'à froid. En refroidissant une solution <strong>saturée</strong> (ou en évaporant partiellement le solvant), la solubilité diminue progressivement jusqu'à ce que la solution devienne <strong>sursaturée</strong>, provoquant la formation de cristaux qui précipitent hors de la solution.</p>

    <h3>2. Le protocole de recristallisation</h3>
    <p>La recristallisation vise à purifier un solide brut (contenant des impuretés) en exploitant la différence de solubilité entre le produit recherché et ses impuretés :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Dissoudre le solide brut dans un <strong>minimum</strong> de solvant chaud (proche de son ébullition), en ajoutant le solvant progressivement jusqu'à dissolution complète</li>
      <li>Filtrer <strong>à chaud</strong> la solution si des impuretés insolubles subsistent (filtration rapide, entonnoir préchauffé pour éviter une cristallisation prématurée dans l'entonnoir)</li>
      <li>Laisser <strong>refroidir lentement</strong> la solution filtrée, idéalement sans agitation ni perturbation, pour permettre la formation de cristaux bien formés</li>
      <li>Filtrer (généralement sous vide, chapitre 5) pour récupérer les cristaux purifiés, en rinçant avec un peu de solvant froid</li>
      <li>Sécher les cristaux obtenus (à l'air libre ou à l'étuve selon la stabilité thermique du produit)</li>
    </ol>

    <h3>3. Le choix du solvant de recristallisation</h3>
    <p>Le succès d'une recristallisation dépend crucialement du choix d'un solvant approprié, qui doit idéalement satisfaire plusieurs critères simultanément :</p>
    <table class="mini-table">
      <tr><th>Critère</th><th>Justification</th></tr>
      <tr><td>Grande solubilité du produit <strong>à chaud</strong></td><td>Permet de dissoudre le produit dans un volume minimal</td></tr>
      <tr><td>Faible solubilité du produit <strong>à froid</strong></td><td>Assure une bonne récupération du produit lors du refroidissement (rendement élevé)</td></tr>
      <tr><td>Bonne solubilité des impuretés à toute température (ou insolubilité totale)</td><td>Les impuretés restent en solution (éliminées avec les eaux mères) ou sont retirées par filtration à chaud</td></tr>
      <tr><td>Absence de réaction avec le produit</td><td>Le solvant ne doit pas dégrader ou transformer chimiquement le produit</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — un compromis pas toujours simple à trouver</span>
      Un « bon » solvant de recristallisation présente un fort contraste de solubilité entre température chaude et température froide pour le produit visé — une solubilité qui varie peu avec la température (que ce soit un solvant où le produit est toujours très soluble, ou toujours peu soluble) rend au contraire la recristallisation peu efficace, quel que soit le solvant utilisé, faute d'une fenêtre de sursaturation exploitable lors du refroidissement.
    </div>

    <h3>4. Vitesse de refroidissement et qualité des cristaux</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — lent = pur, rapide = impur</span>
      Un <strong>refroidissement lent</strong> favorise la formation de <strong>gros cristaux bien ordonnés</strong>, qui excluent efficacement les impuretés de leur structure cristalline lors de leur croissance progressive et sélective — d'où une meilleure pureté du produit final. Un <strong>refroidissement rapide</strong> (ou un choc thermique), au contraire, provoque une cristallisation précipitée et désordonnée, piégeant davantage d'impuretés dans de petits cristaux imparfaits — une technique parfois volontairement recherchée lorsqu'on privilégie le rendement à la pureté, mais généralement à éviter pour une purification soignée.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Dorothy Hodgkin a mis plus de trente ans à obtenir des cristaux d'insuline suffisamment ordonnés pour permettre la détermination de sa structure complète. Sachant que la qualité d'un cristal dépend directement de la lenteur et de la régularité de sa croissance, pourquoi la cristallisation d'une protéine, bien plus grande et complexe qu'une molécule organique simple, est-elle un défi expérimental si considérablement plus difficile à maîtriser ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant recristallise un produit organique dans l'éthanol, mais obtient un très faible rendement de cristaux récupérés après refroidissement, bien que le produit brut semblait entièrement dissous à chaud. Quelle pourrait être la cause principale ?</p>
      <p><strong>Solution :</strong> Si le produit reste très soluble dans l'éthanol <strong>même à froid</strong> (contraste de solubilité insuffisant entre chaud et froid), une grande partie du produit reste dissoute dans les eaux mères après refroidissement, plutôt que de cristalliser — d'où un faible rendement de cristaux récupérés, malgré une dissolution initiale complète et réussie à chaud.</p>
      <p class="example-answer">Réponse : un solvant mal choisi, avec un contraste de solubilité chaud/froid insuffisant, explique ce faible rendement ; il faudrait envisager un autre solvant, ou un mélange de solvants, offrant un meilleur contraste.</p>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La cristallographie des macromolécules biologiques, héritière directe des principes exposés dans ce chapitre, reste un pilier essentiel de la biologie structurale moderne : chaque année, des dizaines de milliers de nouvelles structures protéiques sont déterminées par diffraction des rayons X sur des cristaux soigneusement obtenus, alimentant des bases de données mondiales indispensables à la conception rationnelle de médicaments. Les techniques de cristallisation en microgravité, testées à bord de la Station spatiale internationale, cherchent également à obtenir des cristaux protéiques de qualité supérieure, l'absence de convection gravitationnelle favorisant une croissance cristalline plus régulière.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes automatisées et à haut débit pour identifier rapidement les conditions optimales de cristallisation d'une nouvelle protéine, un processus qui reste aujourd'hui largement empirique et chronophage, comme l'illustre l'exemple de Dorothy Hodgkin ? C'est un défi majeur de la biologie structurale à haut débit.</p>
    <p><strong>Technologie émergente :</strong> les robots de cristallisation à haut débit, capables de tester automatiquement des centaines de conditions de cristallisation différentes (solvant, température, concentration) en parallèle, accélèrent aujourd'hui considérablement la détermination de structures protéiques complexes.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Solide brut dissous à chaud → solution saturée/sursaturée par refroidissement → choix du solvant (fort contraste chaud/froid) → refroidissement lent (gros cristaux purs) → filtration et séchage
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Pureté des cristaux} \\propto \\frac{1}{\\text{vitesse de refroidissement}}$$
      Cette relation qualitative, plus conceptuelle qu'une formule numérique stricte, résume l'enseignement central de ce chapitre : la patience expérimentale — un refroidissement lent et contrôlé — est directement récompensée par une meilleure pureté du produit final, un principe qui vaut aussi bien pour une simple molécule organique de licence que pour l'insuline de Dorothy Hodgkin.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La cristallisation exploite la diminution de solubilité d'un solide lors du refroidissement d'une solution saturée</li>
      <li>Le protocole de recristallisation : dissolution à chaud dans un minimum de solvant, filtration à chaud si besoin, refroidissement lent, filtration des cristaux, séchage</li>
      <li>Un bon solvant de recristallisation offre un fort contraste de solubilité du produit entre chaud et froid, et dissout différemment les impuretés</li>
      <li>Un refroidissement lent favorise de gros cristaux purs ; un refroidissement rapide donne de petits cristaux plus impurs</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Utiliser un excès de solvant chaud « pour être sûr de tout dissoudre », ce qui réduit fortement le rendement en cristaux lors du refroidissement</li>
      <li>Refroidir brutalement la solution pour aller plus vite, au détriment de la pureté des cristaux obtenus</li>
      <li>Choisir un solvant sans avoir vérifié son contraste de solubilité chaud/froid pour le produit concerné</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Un bon solvant de recristallisation doit présenter :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg6e1" value="wrong">Une solubilité constante du produit, quelle que soit la température</label>
        <label class="option"><input type="radio" name="icg6e1" value="right">Un fort contraste de solubilité du produit entre chaud et froid</label>
        <label class="option"><input type="radio" name="icg6e1" value="wrong">Une insolubilité totale du produit à toute température</label>
        <label class="option"><input type="radio" name="icg6e1" value="wrong">Une réactivité chimique avec le produit</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg6e1','icg6fb1','Correct — c\\'est ce contraste chaud/froid qui crée la fenêtre de sursaturation exploitable pour la cristallisation.','Relis le point clé sur le choix du solvant de recristallisation.')">Vérifier</button>
      <div class="feedback" id="icg6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour obtenir des cristaux les plus purs possible, il faut privilégier :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg6e2" value="wrong">Un refroidissement rapide, voire un choc thermique</label>
        <label class="option"><input type="radio" name="icg6e2" value="right">Un refroidissement lent et progressif</label>
        <label class="option"><input type="radio" name="icg6e2" value="wrong">Une agitation vigoureuse pendant le refroidissement</label>
        <label class="option"><input type="radio" name="icg6e2" value="wrong">Peu importe la vitesse de refroidissement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg6e2','icg6fb2','Correct — un refroidissement lent favorise de gros cristaux ordonnés qui excluent mieux les impuretés.','Relis le point clé sur la vitesse de refroidissement et la qualité des cristaux.')">Vérifier</button>
      <div class="feedback" id="icg6fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Dorothy Hodgkin avait abandonné après quelques années d'échecs répétés à cristalliser l'insuline : combien de temps la détermination de sa structure aurait-elle été retardée ?</li>
      <li>Pourquoi un solvant offrant une solubilité constante du produit à toute température (ni très soluble à chaud, ni peu soluble à froid) rend-il la recristallisation totalement inefficace, quel que soit par ailleurs son coût ou sa disponibilité ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, d'une méthode fiable et rapide pour identifier automatiquement les conditions optimales de cristallisation de n'importe quelle nouvelle protéine ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>D. Hodgkin, « The X-ray Analysis of Complicated Molecules », Nobel Lecture, prix Nobel de chimie 1964 — récit de la détermination structurale de la pénicilline, la vitamine B12 et l'insuline.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la cristallisation et la recristallisation en licence.</li>
      <li>A. McPherson, <em>Introduction to Macromolecular Crystallography</em>, Wiley, 2009 — référence sur la cristallographie des macromolécules biologiques.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir un solvant de recristallisation adapté et contrôler la vitesse de refroidissement pour obtenir des cristaux d'une pureté optimale. Le chapitre suivant, « Distillation simple et distillation fractionnée », va explorer une technique de purification tout aussi fondamentale, cette fois exploitant les différences de température d'ébullition entre les constituants d'un mélange. Comme le rappelle la patience exceptionnelle de Dorothy Hodgkin, récompensée après plus de trente années d'efforts : en cristallisation comme dans toute la recherche scientifique, la rigueur méthodique et la persévérance restent parfois les seules voies vers une découverte majeure.</p>
  `
};
INSTCG_NOVA_KB[icgKey("Cristallisation et recristallisation")] = {
  intro: "Salut, moi c'est Nova ! On étudie la cristallisation et la recristallisation comme technique de purification. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/protocole.*recristallisation|[ée]tapes.*recristallisation/i, replies:[
      "Protocole : dissolution à chaud dans un minimum de solvant, filtration à chaud si besoin, refroidissement lent, filtration des cristaux, séchage."
    ]},
    { test:/choix.*solvant|contraste.*solubilit[ée]/i, replies:[
      "Un bon solvant de recristallisation offre un fort contraste de solubilité du produit entre chaud (très soluble) et froid (peu soluble), et ne réagit pas avec le produit."
    ]},
    { test:/refroidissement lent|refroidissement rapide|vitesse.*refroidissement/i, replies:[
      "Un refroidissement lent favorise de gros cristaux ordonnés, plus purs. Un refroidissement rapide donne de petits cristaux, plus riches en impuretés piégées."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce qui crée la fenêtre de sursaturation exploitable.",
      "Indice niveau 2 : ce n'est pas une solubilité constante ni une insolubilité totale.",
      "Indice niveau 3 : c'est un fort contraste de solubilité entre chaud et froid."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au lien entre vitesse de refroidissement et taille/qualité des cristaux.",
      "Indice niveau 2 : les gros cristaux ordonnés excluent mieux les impuretés.",
      "Indice niveau 3 : c'est donc un refroidissement lent et progressif qu'il faut privilégier."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
INSTCG_CHAPTERS[icgKey("Distillation simple et distillation fractionnée")] = {
  objectives: [
    "Décrire le montage et le principe de la distillation simple",
    "Justifier l'usage d'une colonne à distiller en distillation fractionnée",
    "Interpréter une courbe de distillation (température en fonction du volume recueilli)",
    "Choisir entre distillation simple et fractionnée selon l'écart de température d'ébullition",
    "Évaluer pourquoi la distillation fractionnée du pétrole brut reste, plus d'un siècle après son invention industrielle, le procédé de base incontournable de toute raffinerie moderne malgré des avancées technologiques considérables"
  ],
  prereqs: ["Filtration et techniques de séparation"],
  bodyHtml: `
    <p>Depuis le début du XXe siècle, chaque raffinerie de pétrole dans le monde repose sur le même principe fondamental que celui étudié dans ce chapitre à petite échelle : une gigantesque colonne de distillation fractionnée, pouvant atteindre plusieurs dizaines de mètres de hauteur, sépare le pétrole brut — un mélange complexe de centaines d'hydrocarbures différents — en fractions distinctes (gaz, essence, kérosène, gazole, fioul lourd, bitume), chacune recueillie à une hauteur précise de la colonne selon sa propre température d'ébullition. Ce procédé industriel colossal n'est, au fond, qu'une version démesurément agrandie du montage de laboratoire que tu vas apprendre à maîtriser dans ce chapitre.</p>
    <p>Cette continuité remarquable entre un simple montage de travaux pratiques et l'une des infrastructures industrielles les plus complexes au monde illustre parfaitement pourquoi la maîtrise rigoureuse des principes de base — position du thermomètre, choix entre distillation simple et fractionnée, interprétation d'une courbe de distillation — reste une compétence fondamentale, transposable à une échelle bien plus vaste que celle du laboratoire universitaire.</p>
    <p>La distillation sépare les constituants d'un mélange liquide homogène en exploitant leurs <strong>différences de volatilité</strong> (température d'ébullition). C'est une technique aussi ancienne que fondamentale, encore massivement utilisée aujourd'hui, du laboratoire à l'échelle industrielle (raffinage du pétrole). À la fin de ce chapitre, tu sauras choisir entre distillation simple et fractionnée selon l'écart de température d'ébullition des constituants, et interpréter une courbe de distillation pour juger de la qualité d'une séparation.</p>

    <h3>1. Principe de la distillation</h3>
    <p>Lorsqu'un mélange liquide est chauffé, le constituant le <strong>plus volatil</strong> (température d'ébullition la plus basse) se vaporise préférentiellement. En recueillant et en <strong>condensant</strong> cette vapeur (à l'aide d'un réfrigérant refroidi à l'eau), on obtient un <strong>distillat</strong> enrichi en ce constituant le plus volatil, tandis que le <strong>résidu</strong> (liquide restant dans le ballon) s'enrichit progressivement en constituant le moins volatil.</p>

    <h3>2. Le montage de distillation simple</h3>
    <p>Le montage classique de distillation simple comprend, dans l'ordre du parcours de la vapeur :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Un <strong>ballon</strong> contenant le mélange à distiller, chauffé (chauffe-ballon ou bain-marie selon la température requise), avec quelques <strong>pierres ponces</strong> (billes de régulation) pour assurer une ébullition régulière et éviter les à-coups</li>
      <li>Une <strong>tête de distillation</strong>, équipée d'un thermomètre placé à hauteur de la sortie latérale (pour mesurer la température de la vapeur au moment où elle quitte le montage, pas celle du liquide)</li>
      <li>Un <strong>réfrigérant</strong> (à eau, circulation à contre-courant) qui condense la vapeur en la refroidissant</li>
      <li>Un <strong>ballon (ou erlenmeyer) récepteur</strong>, recueillant le distillat condensé</li>
    </ul>
    <div class="key-point">
      <span class="eyebrow">Point clé — la position du thermomètre est essentielle</span>
      Le réservoir du thermomètre doit être positionné exactement <strong>à hauteur de la sortie latérale</strong> de la tête de distillation, là où la vapeur s'échappe vers le réfrigérant — jamais plongé dans le liquide du ballon. Un thermomètre mal positionné (trop haut, trop bas) fausse la lecture de la température réelle de la vapeur en cours de distillation, information cruciale pour identifier ce qui distille à un instant donné.
    </div>

    <h3>3. Limites de la distillation simple</h3>
    <p>La distillation simple ne permet une séparation efficace que si les températures d'ébullition des constituants sont <strong>suffisamment éloignées</strong> (un écart d'au moins 80-100°C est généralement recommandé pour une bonne séparation en une seule distillation). Pour des mélanges de constituants aux températures d'ébullition plus proches, une seule vaporisation-condensation ne suffit pas à obtenir une séparation satisfaisante.</p>

    <h3>4. La distillation fractionnée</h3>
    <p>Pour séparer des liquides de températures d'ébullition <strong>proches</strong>, on insère une <strong>colonne à distiller</strong> (colonne de Vigreux ou garnie de matériau inerte à grande surface) entre le ballon et la tête de distillation. Cette colonne réalise, sur toute sa hauteur, une <strong>succession de vaporisations et de condensations partielles</strong> (on parle de « plateaux théoriques »), chacune enrichissant progressivement la vapeur en constituant le plus volatil, à la façon d'une répétition efficace de la distillation simple sur une seule et même colonne.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — plus de plateaux théoriques, meilleure séparation</span>
      L'efficacité d'une colonne de distillation fractionnée se mesure par son nombre de <strong>plateaux théoriques</strong> : plus ce nombre est élevé (colonne plus longue, ou garnissage offrant une plus grande surface de contact), plus la séparation obtenue entre deux liquides de températures d'ébullition proches sera efficace — au prix d'un temps de distillation plus long et d'une rétention de liquide plus importante dans la colonne elle-même.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Une colonne de raffinerie pétrolière industrielle, haute de plusieurs dizaines de mètres, applique le même principe des plateaux théoriques qu'une petite colonne de laboratoire, mais à une échelle démultipliée. En reliant cela au compromis mentionné entre nombre de plateaux et temps de distillation, pourquoi une raffinerie industrielle peut-elle se permettre d'utiliser des colonnes bien plus hautes et donc bien plus lentes qu'un simple montage de travaux pratiques ?
    </div>

    <h3>5. La courbe de distillation</h3>
    <p>Le suivi de la température de vapeur en fonction du volume de distillat recueilli constitue la <strong>courbe de distillation</strong>, un outil de diagnostic précieux : un <strong>palier</strong> net de température (constante sur un intervalle de volume significatif) signale la distillation d'un constituant relativement pur, tandis qu'une montée <strong>progressive et continue</strong> de la température, sans palier net, traduit une séparation incomplète entre plusieurs constituants proches (mélange non résolu, distillation simple insuffisante pour ce mélange).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> On souhaite séparer un mélange d'éthanol (Téb ≈ 78°C) et d'eau (Téb = 100°C). La distillation simple est-elle suffisante ?</p>
      <p><strong>Solution :</strong> L'écart de température d'ébullition entre les deux constituants n'est que d'environ 22°C, bien inférieur au seuil de 80-100°C généralement recommandé pour une séparation efficace en distillation simple. Une distillation fractionnée, avec une colonne à distiller offrant plusieurs plateaux théoriques, est donc nécessaire pour obtenir une séparation satisfaisante.</p>
      <p class="example-answer">Réponse : non, une distillation fractionnée est nécessaire compte tenu du faible écart de température d'ébullition entre éthanol et eau.</p>
    </div>

    <h3>6. Frontière de la recherche</h3>
    <p>Le raffinage du pétrole, plus grand exemple industriel de distillation fractionnée au monde, continue d'être optimisé pour réduire sa consommation énergétique considérable : les colonnes de distillation modernes intègrent des systèmes de récupération de chaleur sophistiqués, réutilisant l'énergie thermique d'une étape pour préchauffer une autre, une optimisation cruciale compte tenu de l'ampleur de l'industrie pétrolière mondiale. Par ailleurs, la distillation reste une technique de purification essentielle dans l'industrie pharmaceutique et des spiritueux, où le contrôle précis de la courbe de distillation détermine directement la qualité du produit final.</p>
    <p><strong>Question ouverte :</strong> peut-on réduire significativement la consommation énergétique colossale du raffinage pétrolier mondial, en développant des méthodes de séparation alternatives à la distillation fractionnée classique (membranes sélectives, séparation par adsorption) ? C'est un enjeu majeur de l'industrie pétrochimique face aux impératifs de transition énergétique.</p>
    <p><strong>Technologie émergente :</strong> les colonnes de distillation à membranes, qui combinent la distillation classique avec une séparation membranaire sélective, sont développées pour réduire la consommation énergétique du raffinage tout en améliorant la pureté des fractions obtenues.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Mélange liquide homogène → chauffage → vaporisation du constituant le plus volatil → condensation (réfrigérant) → distillat enrichi → écart de température d'ébullition faible : colonne à distiller (plateaux théoriques) nécessaire
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\Delta T_{eb} \\ge 80\\text{-}100°C \\Rightarrow \\text{distillation simple} \\qquad \\Delta T_{eb} < 80°C \\Rightarrow \\text{distillation fractionnée}
      $$
      Ce critère pratique, simple à appliquer, guide directement le choix de la technique de distillation la mieux adaptée à un mélange donné — un principe qui vaut aussi bien pour un modeste montage de travaux pratiques que pour les colonnes gigantesques d'une raffinerie pétrolière.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La distillation sépare des liquides par différence de volatilité : vaporisation du plus volatil, condensation dans le réfrigérant, recueil du distillat</li>
      <li>Le thermomètre se place exactement à hauteur de la sortie latérale de la tête de distillation, pas dans le liquide du ballon</li>
      <li>La distillation simple suffit pour un écart de température d'ébullition d'au moins 80-100°C environ</li>
      <li>La distillation fractionnée, avec une colonne à distiller (plateaux théoriques), sépare des liquides de températures d'ébullition proches</li>
      <li>Un palier net sur la courbe de distillation signale un constituant pur ; une montée progressive signale une séparation incomplète</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Plonger le réservoir du thermomètre dans le liquide du ballon au lieu de le placer à la sortie latérale</li>
      <li>Oublier les pierres ponces (billes de régulation), provoquant une ébullition par à-coups (bumping)</li>
      <li>Tenter une distillation simple pour des liquides de températures d'ébullition trop proches, obtenant une séparation médiocre</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Où doit être positionné le réservoir du thermomètre lors d'une distillation ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg7e1" value="wrong">Plongé dans le liquide du ballon</label>
        <label class="option"><input type="radio" name="icg7e1" value="right">À hauteur de la sortie latérale de la tête de distillation</label>
        <label class="option"><input type="radio" name="icg7e1" value="wrong">Dans le réfrigérant</label>
        <label class="option"><input type="radio" name="icg7e1" value="wrong">Dans le ballon récepteur</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg7e1','icg7fb1','Correct — c\\'est là que passe la vapeur, permettant de mesurer sa température réelle.','Relis le point clé sur le positionnement du thermomètre.')">Vérifier</button>
      <div class="feedback" id="icg7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour séparer deux liquides de températures d'ébullition proches, on utilise plutôt :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg7e2" value="wrong">Une distillation simple</label>
        <label class="option"><input type="radio" name="icg7e2" value="right">Une distillation fractionnée</label>
        <label class="option"><input type="radio" name="icg7e2" value="wrong">Une simple filtration</label>
        <label class="option"><input type="radio" name="icg7e2" value="wrong">Aucune technique ne le permet</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg7e2','icg7fb2','Correct — la colonne à distiller de la distillation fractionnée multiplie les vaporisations-condensations, séparant efficacement des liquides proches en température d\\'ébullition.','Relis la section sur la distillation fractionnée et son usage pour des liquides proches.')">Vérifier</button>
      <div class="feedback" id="icg7fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si tous les hydrocarbures du pétrole brut avaient exactement la même température d'ébullition : le raffinage tel que nous le connaissons aujourd'hui serait-il seulement possible ?</li>
      <li>Pourquoi le thermomètre doit-il impérativement se trouver à hauteur de la sortie latérale plutôt que plongé directement dans le liquide en ébullition du ballon ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pétrochimique mondiale, d'une réduction drastique et rapide de la consommation énergétique nécessaire au raffinage par distillation fractionnée ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la distillation en licence.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur les techniques de distillation.</li>
      <li>J. G. Speight, <em>The Chemistry and Technology of Petroleum</em>, CRC Press — référence de référence sur le raffinage industriel du pétrole par distillation fractionnée.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir entre distillation simple et fractionnée selon l'écart de température d'ébullition des constituants, et interpréter une courbe de distillation pour juger de la qualité d'une séparation. Le dernier chapitre de ce module, « Spectrophotométrie UV-Visible : principe et dosage », va explorer une technique d'analyse quantitative reposant cette fois sur l'absorption de la lumière plutôt que sur les différences de volatilité. Comme le rappelle l'omniprésence de la distillation fractionnée, du modeste montage de travaux pratiques jusqu'aux colonnes gigantesques d'une raffinerie pétrolière : un même principe physico-chimique simple, une fois maîtrisé, peut s'appliquer à des échelles radicalement différentes.</p>
  `
};
INSTCG_NOVA_KB[icgKey("Distillation simple et distillation fractionnée")] = {
  intro: "Salut, moi c'est Nova ! On étudie la distillation : montage, thermomètre, distillation fractionnée. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/thermom[èe]tre|position.*thermom[èe]tre/i, replies:[
      "Le réservoir du thermomètre se place exactement à hauteur de la sortie latérale de la tête de distillation, jamais dans le liquide du ballon."
    ]},
    { test:/distillation fractionn[ée]e|colonne.*distiller|plateau th[ée]orique/i, replies:[
      "La distillation fractionnée utilise une colonne à distiller (plateaux théoriques) pour séparer des liquides de températures d'ébullition proches — plus de plateaux = meilleure séparation."
    ]},
    { test:/distillation simple/i, replies:[
      "La distillation simple suffit pour un écart de température d'ébullition d'au moins 80-100°C environ entre les constituants."
    ]},
    { test:/courbe de distillation|palier/i, replies:[
      "Un palier net sur la courbe de distillation (température constante) signale un constituant pur ; une montée progressive signale une séparation incomplète."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à l'endroit où passe la vapeur qu'on veut mesurer.",
      "Indice niveau 2 : ce n'est pas dans le liquide du ballon.",
      "Indice niveau 3 : c'est à hauteur de la sortie latérale de la tête de distillation."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la technique adaptée aux écarts de température faibles.",
      "Indice niveau 2 : ce n'est pas la distillation simple.",
      "Indice niveau 3 : c'est la distillation fractionnée."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
INSTCG_CHAPTERS[icgKey("Spectrophotométrie UV-Visible : principe et dosage")] = {
  objectives: [
    "Décrire le principe de fonctionnement d'un spectrophotomètre UV-Visible",
    "Appliquer la loi de Beer-Lambert pour déterminer une concentration",
    "Construire et utiliser une courbe d'étalonnage",
    "Identifier les précautions expérimentales pour une mesure spectrophotométrique fiable",
    "Évaluer pourquoi la loi de Beer-Lambert, malgré sa simplicité apparente, cesse d'être rigoureusement linéaire au-delà d'une certaine concentration, un phénomène qui impose systématiquement de vérifier le domaine de validité de toute courbe d'étalonnage"
  ],
  prereqs: ["Titrage acido-basique : principe et mise en œuvre"],
  bodyHtml: `
    <p>Pierre Bouguer, astronome et mathématicien français du XVIIIe siècle, observe dès 1729 que l'atténuation de la lumière traversant un milieu absorbant suit une loi mathématique précise — un résultat qu'August Beer généralisera un siècle plus tard, en 1852, pour relier cette atténuation à la concentration d'une espèce dissoute. Cette loi, aujourd'hui connue sous le nom de loi de Beer-Lambert (en hommage également à Johann Heinrich Lambert, qui a formalisé la dépendance à l'épaisseur traversée), reste plus de deux siècles après sa découverte l'un des outils quantitatifs les plus utilisés de toute la chimie analytique moderne.</p>
    <p>Cette technique de dosage, rapide et non destructive, est aujourd'hui omniprésente : elle permet de doser en quelques secondes la concentration d'hémoglobine dans un échantillon sanguin en analyse médicale, de vérifier la pureté d'un principe actif pharmaceutique, ou de suivre en temps réel l'évolution d'une réaction chimique en laboratoire de recherche. Ce dernier chapitre te donne les bases indispensables pour utiliser cette technique avec la rigueur méthodologique qu'elle exige.</p>
    <p>La spectrophotométrie UV-Visible est une technique de dosage rapide, non destructive et largement répandue en laboratoire de chimie générale, exploitant l'absorption de la lumière par une espèce colorée ou absorbant dans l'ultraviolet. À la fin de ce chapitre — et de ce module —, tu sauras déterminer avec précision la concentration d'un échantillon inconnu à partir d'une simple mesure d'absorbance, et éviter les pièges expérimentaux les plus fréquents de cette technique.</p>

    <h3>1. Principe de fonctionnement</h3>
    <p>Un <strong>spectrophotomètre</strong> envoie un faisceau de lumière monochromatique (de longueur d'onde $\\lambda$ sélectionnée) à travers une <strong>cuve</strong> contenant la solution à analyser, puis mesure l'intensité du faisceau transmis à l'aide d'un détecteur. L'appareil compare cette intensité $I$ à l'intensité incidente $I_0$ (mesurée sur un « blanc », référence sans l'espèce absorbante) pour calculer l'<strong>absorbance</strong> $A = \\log_{10}(I_0/I)$.</p>

    <h3>2. La loi de Beer-Lambert</h3>
    <p>La loi de Beer-Lambert relie l'absorbance mesurée à la concentration de l'espèce absorbante :</p>
    <div class="formula-box">$$A = \\varepsilon \\cdot \\ell \\cdot c$$</div>
    <p>où $\\varepsilon$ (L·mol⁻¹·cm⁻¹) est le coefficient d'absorption molaire (propre à l'espèce et à la longueur d'onde utilisée), $\\ell$ (cm) la largeur de la cuve traversée par la lumière (généralement 1 cm pour les cuves standard), et $c$ (mol/L) la concentration de l'espèce absorbante.</p>

    <h3>3. Le blanc et la longueur d'onde de mesure</h3>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Le <strong>blanc</strong> (« zéro » de l'appareil) est réalisé avec le solvant seul, ou une solution identique à l'échantillon mais dépourvue de l'espèce absorbante — il permet de soustraire l'absorption propre du solvant et de la cuve</li>
      <li>On choisit généralement la longueur d'onde d'analyse au <strong>maximum d'absorption</strong> ($\\lambda_{max}$) de l'espèce étudiée, déterminé au préalable par un balayage spectral : c'est à cette longueur d'onde que la sensibilité de la mesure (variation d'absorbance par unité de concentration) est la plus grande</li>
    </ul>

    <h3>4. La courbe d'étalonnage (méthode du dosage par étalonnage externe)</h3>
    <p>Pour déterminer la concentration d'un échantillon inconnu, on prépare une série de solutions <strong>étalons</strong> de concentrations connues (par dilutions successives d'une solution mère, cours précédent), on mesure leur absorbance à $\\lambda_{max}$, puis on trace la <strong>courbe d'étalonnage</strong> $A=f(c)$ — une droite passant par l'origine si la loi de Beer-Lambert est respectée dans le domaine de concentration étudié. La concentration de l'échantillon inconnu s'obtient alors en mesurant son absorbance et en la reportant sur la droite d'étalonnage (ou, plus rigoureusement, sur l'équation de la droite de régression linéaire ajustée aux points expérimentaux).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — le domaine de validité de la loi de Beer-Lambert</span>
      La loi de Beer-Lambert n'est rigoureusement linéaire que dans un domaine de concentration <strong>limité</strong> (généralement pour des absorbances comprises entre environ 0,1 et 1,0) : à trop forte concentration (absorbance élevée), des écarts à la linéarité apparaissent fréquemment (diffusion de la lumière, interactions entre molécules absorbantes, limitations instrumentales). Il est donc essentiel de préparer l'échantillon (par dilution si nécessaire) pour que son absorbance mesurée reste dans la <strong>zone de linéarité</strong> couverte par la gamme d'étalons utilisée.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un échantillon dont l'absorbance mesurée dépasse largement la zone de linéarité (par exemple A=2,5) donnerait, si l'on appliquait malgré tout la droite d'étalonnage, une concentration surestimée par rapport à la réalité. En reliant cela au cours « Mesures et normes » sur la validité d'un modèle, pourquoi est-il indispensable de toujours vérifier que la mesure d'un échantillon inconnu reste dans le même domaine que celui couvert par les étalons, plutôt que d'extrapoler au-delà ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une courbe d'étalonnage donne la relation $A = 1250\\times c$ (avec $c$ en mol/L). Un échantillon inconnu, mesuré dans les mêmes conditions, présente une absorbance $A=0{,}68$. Calculer sa concentration.</p>
      <p><strong>Solution :</strong> $c = A/1250 = 0{,}68/1250 = 5{,}4\\times10^{-4}$ mol/L.</p>
      <p class="example-answer">Réponse : $c \\approx 5{,}4\\times10^{-4}$ mol/L, à condition que cette valeur d'absorbance reste dans le domaine de linéarité couvert par la gamme d'étalonnage.</p>
    </div>

    <h3>5. Précautions expérimentales</h3>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Manipuler les cuves par leurs <strong>faces dépolies</strong> uniquement, jamais par les faces optiques transparentes (traces de doigts faussant la mesure)</li>
      <li>Vérifier l'absence de <strong>bulles d'air</strong> dans la cuve avant la mesure</li>
      <li>Refaire le blanc régulièrement, en particulier si l'on change de longueur d'onde de mesure</li>
      <li>S'assurer que la solution reste stable dans le temps (pas de dégradation, précipitation ou réaction parasite entre la préparation et la mesure)</li>
    </ul>

    <h3>6. Frontière de la recherche</h3>
    <p>La spectrophotométrie UV-Visible, héritière directe des travaux de Bouguer, Beer et Lambert, continue d'évoluer avec des applications de pointe : les spectrophotomètres portables miniaturisés permettent aujourd'hui un dosage rapide sur le terrain, de l'analyse de la qualité de l'eau à l'authentification de produits alimentaires. En recherche biomédicale, la spectrophotométrie à haute résolution temporelle permet de suivre en temps réel des réactions enzymatiques se déroulant en quelques millisecondes, révélant des détails cinétiques inaccessibles aux méthodes classiques.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des capteurs spectrophotométriques suffisamment miniaturisés et peu coûteux pour un déploiement massif dans des contextes à ressources limitées, notamment pour le diagnostic médical rapide dans des zones reculées ? C'est un enjeu de recherche en instrumentation analytique portable et accessible.</p>
    <p><strong>Technologie émergente :</strong> les spectrophotomètres couplés à des smartphones, exploitant la caméra et un dispositif optique simple pour réaliser des mesures d'absorbance de qualité satisfaisante à très faible coût, démocratisent aujourd'hui l'accès à cette technique d'analyse dans des contextes éducatifs et de terrain.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Lumière monochromatique (λmax) → traversée de la cuve → mesure de l'intensité transmise → absorbance A=log(I0/I) → loi de Beer-Lambert (A=εℓc) → courbe d'étalonnage → concentration inconnue
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$A = \\varepsilon \\cdot \\ell \\cdot c$$
      Cette loi de Beer-Lambert, établie il y a plus de deux siècles par Bouguer, Lambert et Beer, reste aujourd'hui l'outil quantitatif le plus utilisé de toute la chimie analytique — elle transforme une simple mesure d'intensité lumineuse en la détermination précise d'une concentration inconnue, en quelques secondes et sans détruire l'échantillon analysé.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le spectrophotomètre mesure l'absorbance A=log₁₀(I0/I) à une longueur d'onde donnée</li>
      <li>Loi de Beer-Lambert : A=ε·ℓ·c, reliant absorbance et concentration</li>
      <li>Le blanc soustrait l'absorption du solvant/de la cuve ; on mesure généralement à λmax pour une sensibilité optimale</li>
      <li>La courbe d'étalonnage A=f(c), obtenue à partir de solutions de concentrations connues, permet de déterminer une concentration inconnue</li>
      <li>La loi de Beer-Lambert n'est linéaire que dans un domaine limité d'absorbance (typiquement 0,1 à 1,0) — diluer si nécessaire</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Manipuler la cuve par ses faces optiques transparentes, laissant des traces qui faussent la mesure</li>
      <li>Mesurer une absorbance trop élevée (hors zone de linéarité) sans avoir dilué préalablement l'échantillon</li>
      <li>Oublier de refaire le blanc lors d'un changement de longueur d'onde</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi choisit-on généralement de mesurer l'absorbance à λmax ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg8e1" value="wrong">Pour des raisons esthétiques uniquement</label>
        <label class="option"><input type="radio" name="icg8e1" value="right">Parce que la sensibilité de la mesure y est maximale</label>
        <label class="option"><input type="radio" name="icg8e1" value="wrong">Parce que c'est obligatoire réglementairement</label>
        <label class="option"><input type="radio" name="icg8e1" value="wrong">Parce que le blanc n'est pas nécessaire à cette longueur d'onde</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg8e1','icg8fb1','Correct — à λmax, la variation d\\'absorbance par unité de concentration est maximale, offrant la meilleure sensibilité.','Relis la justification du choix de λmax pour la mesure.')">Vérifier</button>
      <div class="feedback" id="icg8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Avec A=800×c et une mesure A=0,40, quelle est la concentration c ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icg8e2" value="wrong">2,0×10⁻² mol/L</label>
        <label class="option"><input type="radio" name="icg8e2" value="right">5,0×10⁻⁴ mol/L</label>
        <label class="option"><input type="radio" name="icg8e2" value="wrong">3,2×10² mol/L</label>
        <label class="option"><input type="radio" name="icg8e2" value="wrong">8,0×10⁻¹ mol/L</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icg8e2','icg8fb2','Correct — c=A/800=0,40/800=5,0×10⁻⁴ mol/L.','Applique c=A/coefficient directeur de la droite d\\'étalonnage.')">Vérifier</button>
      <div class="feedback" id="icg8fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si la loi de Beer-Lambert restait rigoureusement linéaire à toute concentration, sans aucune limite : les précautions de dilution étudiées dans ce chapitre seraient-elles encore nécessaires ?</li>
      <li>Pourquoi Bouguer, Lambert et Beer, travaillant à un siècle d'intervalle, ont-ils chacun contribué une pièce différente et complémentaire de ce qui deviendra une seule et même loi ?</li>
      <li>Quelle serait la conséquence, pour le diagnostic médical dans les régions à ressources limitées, d'une démocratisation réussie des spectrophotomètres portables à très faible coût ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>P. Bouguer, <em>Essai d'optique sur la gradation de la lumière</em>, 1729 — les premiers travaux sur l'atténuation de la lumière dans un milieu absorbant.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur la spectrophotométrie UV-Visible.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la spectrophotométrie en licence.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Te voici arrivé au terme de ce module « Instrumentations et manipulation de chimie générale » : parti des règles de sécurité et de la verrerie de base, tu termines en sachant déterminer avec précision la concentration d'un échantillon inconnu par une simple mesure d'absorbance. Ce parcours pratique — sécurité, pesée et dilution, pH-métrie, titrage, filtration, cristallisation, distillation, et enfin spectrophotométrie — constitue le socle expérimental indispensable de tout chimiste, complétant à merveille les bases théoriques posées dans les modules précédents. Comme le rappelle la loi de Beer-Lambert, fruit de la collaboration involontaire de trois scientifiques à travers plus d'un siècle : la science progresse souvent par petites touches successives, chacune s'appuyant sur les découvertes de celles qui l'ont précédée.</p>
  `
};
INSTCG_NOVA_KB[icgKey("Spectrophotométrie UV-Visible : principe et dosage")] = {
  intro: "Salut, moi c'est Nova ! On étudie la spectrophotométrie UV-Visible : Beer-Lambert, courbe d'étalonnage. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/beer.lambert|absorbance/i, replies:[
      "Loi de Beer-Lambert : A=ε·ℓ·c. L'absorbance A=log₁₀(I0/I) est mesurée après avoir fait le blanc (référence sans l'espèce absorbante)."
    ]},
    { test:/courbe d.[ée]talonnage|[ée]talon/i, replies:[
      "La courbe d'étalonnage A=f(c), tracée à partir de solutions de concentration connue, permet de déterminer la concentration d'un échantillon inconnu à partir de son absorbance mesurée."
    ]},
    { test:/λmax|lambda max|longueur d.onde/i, replies:[
      "On mesure généralement à λmax (maximum d'absorption) car la sensibilité de la mesure (variation d'absorbance par unité de concentration) y est maximale."
    ]},
    { test:/lin[ée]arit[ée]|domaine.*validit[ée]/i, replies:[
      "La loi de Beer-Lambert n'est linéaire que pour des absorbances typiquement entre 0,1 et 1,0 — au-delà, diluer l'échantillon pour rester dans la zone de linéarité."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce qui varie le plus avec la concentration à cette longueur d'onde.",
      "Indice niveau 2 : ce n'est pas une question esthétique ou réglementaire.",
      "Indice niveau 3 : c'est la sensibilité maximale de la mesure à λmax."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique c=A/coefficient directeur.",
      "Indice niveau 2 : 0,40/800 = ?",
      "Indice niveau 3 : cela donne 5,0×10⁻⁴ mol/L."
    ]}
  ]
};

/* fusionne le module Instrumentations et manipulation de chimie générale dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, INSTCG_CHAPTERS);
Object.assign(NOVA_KB, INSTCG_NOVA_KB);