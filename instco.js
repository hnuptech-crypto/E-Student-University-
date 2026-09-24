/* =====================================================================
   CHUNK « instco » — registre INSTCO_CHAPTERS / INSTCO_NOVA_KB
   Matière(s) : Chimie|Instrumentations et manipulation de chimie organique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   INSTCO_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — INSTRUMENTATIONS ET MANIPULATION DE CHIMIE ORGANIQUE (L1, domaine Chimie)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : montages expérimentaux (reflux, agitation), extraction liquide-liquide,
   chromatographie sur couche mince et sur colonne, recristallisation et point de
   fusion, distillation des composés organiques, séchage et purification,
   caractérisation par spectroscopie infrarouge — conforme aux enseignements
   pratiques transversaux de chimie organique en L1. Ce cours prolonge le cours
   théorique "Chimie organique générale" par sa mise en œuvre expérimentale, et
   complète les cours d'instrumentation de chimie générale et de chimie minérale par
   des techniques spécifiques à la synthèse et à la purification des molécules
   organiques. Références de fond : L.M. Harwood, C.J. Moody & J.M. Percy,
   Experimental Organic Chemistry (Wiley-Blackwell) ; D.L. Pavia et al., Introduction
   to Organic Laboratory Techniques (Cengage) ; F. Brunel & P. Perio, Techniques
   expérimentales en chimie organique (Ellipses).
===================================================================================== */
const INSTCO_MATIERE = 'Instrumentations et manipulation de chimie organique';
function icoKey(chapterTitle){ return `Chimie|${INSTCO_MATIERE}|${chapterTitle}`; }
const INSTCO_CHAPTERS = {};
const INSTCO_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de rapport frontal Rf en CCM (chapitre 3)
--------------------------------------------------------------------------------- */
function updateRfCalc(){
  const dTache = parseFloat(document.getElementById('rfDTache').value) || 3.2;
  const dFront = parseFloat(document.getElementById('rfDFront').value) || 5.6;
  const rf = dTache / dFront;
  const out = document.getElementById('rfReadout');
  out.innerHTML = `Rf = distance parcourue par la tache / distance parcourue par l'éluant = ${dTache}/${dFront} = <strong>${rf.toFixed(3)}</strong>`;
}
function initRfCalc(){ updateRfCalc(); }

/* =========================== CHAPITRE 1 =========================== */
INSTCO_CHAPTERS[icoKey("Montages expérimentaux : chauffage à reflux et agitation")] = {
  objectives: [
    "Décrire le montage et le principe du chauffage à reflux",
    "Justifier le rôle du réfrigérant dans un montage à reflux",
    "Choisir un mode de chauffage adapté selon la nature du solvant",
    "Identifier les précautions de sécurité propres au chauffage de composés organiques inflammables",
    "Évaluer pourquoi le principe du chauffage à reflux, conçu au XIXe siècle par Liebig, reste aujourd'hui encore la méthode standard de chauffage prolongé en synthèse organique, du laboratoire universitaire à l'industrie pharmaceutique"
  ],
  prereqs: ["Chimie organique générale", "Sécurité au laboratoire et verrerie de base (cours d'Instrumentations chimie générale)"],
  bodyHtml: `
    <p>Bien avant que la chimie organique ne devienne une science quantitative, les alchimistes utilisaient déjà des montages de distillation rudimentaires pour chauffer des substances sans les perdre par évaporation. C'est au chimiste allemand Justus von Liebig, figure majeure de la chimie du XIXe siècle, que l'on doit la conception moderne du réfrigérant à eau qui porte aujourd'hui son nom : en perfectionnant le refroidissement à contre-courant dans les années 1830, Liebig a rendu possible un chauffage prolongé et contrôlé des réactions organiques, sans perte de solvant par évaporation — un principe qui reste, presque deux siècles plus tard, la base de tout laboratoire de chimie organique.</p>
    <p>Le montage à reflux que tu vas manipuler dans ce chapitre est aujourd'hui l'un des gestes les plus répétés dans tous les laboratoires de synthèse organique du monde, qu'il s'agisse de la recherche pharmaceutique, de la chimie fine industrielle ou de simples travaux pratiques universitaires — sa simplicité et sa fiabilité en ont fait un standard incontournable, décliné à toutes les échelles, du tube à essai au réacteur industriel de plusieurs milliers de litres.</p>
    <p>De nombreuses réactions organiques nécessitent d'être chauffées pendant une durée prolongée pour atteindre un rendement satisfaisant. Le <strong>chauffage à reflux</strong> est le montage standard permettant ce chauffage prolongé sans perte de matière par évaporation du solvant. À la fin de ce chapitre, tu sauras justifier chaque élément du montage à reflux et choisir un mode de chauffage adapté en toute sécurité.</p>

    <h3>1. Principe du chauffage à reflux</h3>
    <p>Le montage à reflux consiste à chauffer un mélange réactionnel à <strong>ébullition</strong> dans un ballon surmonté d'un <strong>réfrigérant vertical</strong> (généralement à boules ou droit, refroidi par une circulation d'eau à contre-courant). Les vapeurs de solvant qui s'élèvent dans le réfrigérant se <strong>condensent</strong> sur ses parois froides et retombent par gravité dans le ballon réactionnel — le solvant est ainsi continuellement recyclé, sans perte, ce qui permet de maintenir la réaction à sa température d'ébullition aussi longtemps que nécessaire.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi chauffer à reflux plutôt qu'à une température fixe inférieure</span>
      Chauffer <strong>précisément</strong> à la température d'ébullition du solvant (plutôt qu'à une température fixée arbitrairement en dessous) présente un avantage pratique majeur : cette température est <strong>auto-régulée</strong> par le changement d'état du solvant, quelle que soit la puissance de chauffe appliquée (dans une certaine limite) — un léger excès de chauffage accélère simplement le débit de vapeur condensée, sans faire monter la température au-delà du point d'ébullition. C'est une façon simple et fiable de garantir une température de réaction reproductible d'une manipulation à l'autre.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'auto-régulation de la température au point d'ébullition signifie qu'il est presque impossible de « trop chauffer » un mélange à reflux : tout excès de puissance de chauffe se traduit simplement par un débit de vapeur condensée plus important, sans élévation de température au-delà du point d'ébullition. En quoi cette propriété rend-elle le montage à reflux particulièrement adapté à un enseignement de chimie pratique, où la reproductibilité des conditions expérimentales entre différents groupes d'étudiants est essentielle ?
    </div>

    <h3>2. Les modes de chauffage</h3>
    <table class="mini-table">
      <tr><th>Mode de chauffage</th><th>Usage</th></tr>
      <tr><td>Bain-marie</td><td>Solvants à température d'ébullition modérée (jusqu'à ~90-95°C), chauffage doux et homogène</td></tr>
      <tr><td>Chauffe-ballon (manteau chauffant)</td><td>Chauffage direct du ballon, pour des températures plus élevées ou des solvants à point d'ébullition élevé</td></tr>
      <tr><td>Bain d'huile</td><td>Chauffage homogène à haute température (au-delà de 100°C), meilleur contrôle thermique qu'un chauffage direct</td></tr>
      <tr><td>Plaque chauffante avec agitation magnétique</td><td>Montage le plus courant en laboratoire d'enseignement, combinant chauffage et agitation homogène</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — ne jamais chauffer directement à la flamme un solvant organique</span>
      Le chauffage direct à la flamme nue d'un solvant organique <strong>inflammable</strong> est à proscrire absolument, en raison du risque d'inflammation des vapeurs. Le choix du mode de chauffage doit également tenir compte du <strong>point d'éclair</strong> du solvant utilisé (température à partir de laquelle ses vapeurs peuvent s'enflammer au contact d'une flamme ou d'une étincelle), qui conditionne les précautions à respecter.
    </div>

    <h3>3. Le rôle de l'agitation</h3>
    <p>L'<strong>agitation</strong> (le plus souvent magnétique, à l'aide d'un barreau aimanté placé dans le ballon et entraîné par un agitateur externe) assure l'homogénéité du mélange réactionnel : elle favorise le contact entre réactifs (accélérant la cinétique de réaction), uniformise la température dans tout le volume, et évite les phénomènes de surchauffe locale ou de <em>bumping</em> (ébullition par à-coups, dangereuse et pouvant provoquer des projections).</p>

    <h3>4. Précautions de sécurité spécifiques</h3>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Vérifier que la <strong>circulation d'eau</strong> du réfrigérant est correctement établie avant de commencer le chauffage (entrée d'eau en bas du réfrigérant, sortie en haut, pour un refroidissement à contre-courant efficace)</li>
      <li>Ne jamais chauffer un système <strong>totalement fermé</strong> sans échappement possible (risque de surpression et d'explosion) — le réfrigérant à reflux, ouvert à l'air libre à son sommet, évite ce risque tout en limitant l'évaporation du solvant</li>
      <li>Utiliser des pierres ponces (billes de régulation d'ébullition) pour éviter le <em>bumping</em>, sauf en cas d'agitation magnétique déjà efficace</li>
      <li>Travailler sous hotte pour tout solvant toxique ou fortement volatil</li>
    </ul>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le phénomène de <em>bumping</em> (ébullition par à-coups) survient lorsque la formation de bulles de vapeur est retardée localement, puis se produit brutalement et violemment. En quoi l'agitation magnétique continue et les pierres ponces jouent-elles un rôle similaire — bien que par des mécanismes différents — pour prévenir ce phénomène potentiellement dangereux ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi un montage à reflux totalement fermé (sans aucune ouverture à l'air libre) serait-il dangereux, alors que le montage à reflux classique (réfrigérant ouvert au sommet) ne l'est pas ?</p>
      <p><strong>Solution :</strong> Un système chauffé et totalement fermé accumule une pression de vapeur croissante à mesure que le solvant s'évapore, sans possibilité d'échappement — un risque de surpression pouvant conduire à l'explosion de la verrerie. Le montage à reflux classique, bien qu'il empêche la perte de solvant liquide (grâce à la condensation), reste <strong>ouvert à l'atmosphère</strong> au sommet du réfrigérant, ce qui évite toute accumulation dangereuse de pression.</p>
      <p class="example-answer">Réponse : l'ouverture du réfrigérant à l'atmosphère est essentielle pour éviter tout risque de surpression, même si elle n'empêche pas le recyclage efficace du solvant condensé.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Le chauffage à reflux maintient une réaction à ébullition sans perte de solvant, grâce à la condensation continue dans le réfrigérant</li>
      <li>La température de reflux est auto-régulée par le changement d'état du solvant, garantissant une reproductibilité entre manipulations</li>
      <li>Le mode de chauffage (bain-marie, chauffe-ballon, bain d'huile) se choisit selon la température requise et la nature du solvant</li>
      <li>L'agitation magnétique homogénéise le mélange et évite le bumping (ébullition par à-coups)</li>
      <li>Le réfrigérant à reflux doit rester ouvert à l'atmosphère pour éviter tout risque de surpression</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Chauffer directement à la flamme nue un solvant organique inflammable</li>
      <li>Oublier de vérifier la circulation d'eau du réfrigérant avant de commencer le chauffage</li>
      <li>Fermer complètement le montage, sans ouverture à l'atmosphère, créant un risque de surpression</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi le chauffage à reflux permet-il une température de réaction reproductible ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico1e1" value="wrong">Parce que la puissance de chauffe est toujours identique</label>
        <label class="option"><input type="radio" name="ico1e1" value="right">Parce que la température d'ébullition du solvant s'auto-régule, quelle que soit la puissance de chauffe appliquée</label>
        <label class="option"><input type="radio" name="ico1e1" value="wrong">Parce que le réfrigérant refroidit le mélange réactionnel</label>
        <label class="option"><input type="radio" name="ico1e1" value="wrong">Ce n'est pas vrai, la température varie beaucoup</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico1e1','ico1fb1','Correct — c\\'est l\\'auto-régulation par le changement d\\'état qui garantit cette reproductibilité.','Relis le point clé sur l\\'auto-régulation de la température de reflux.')">Vérifier</button>
      <div class="feedback" id="ico1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi le réfrigérant à reflux doit-il rester ouvert à l'atmosphère à son sommet ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico1e2" value="wrong">Pour laisser s'échapper le solvant volontairement</label>
        <label class="option"><input type="radio" name="ico1e2" value="right">Pour éviter tout risque de surpression dans le montage</label>
        <label class="option"><input type="radio" name="ico1e2" value="wrong">Pour accélérer la réaction chimique</label>
        <label class="option"><input type="radio" name="ico1e2" value="wrong">Ce n'est pas nécessaire, le montage peut être fermé</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico1e2','ico1fb2','Correct — un système fermé chauffé accumulerait une pression dangereuse, d\\'où l\\'importance de cette ouverture.','Relis l\\'exemple corrigé sur le risque d\\'un montage totalement fermé.')">Vérifier</button>
      <div class="feedback" id="ico1fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>Le montage à reflux classique, hérité des perfectionnements de Liebig au XIXe siècle, reste la référence pédagogique, mais la recherche et l'industrie explorent aujourd'hui des alternatives pour accélérer et rendre plus sûres les synthèses organiques. Le <strong>chauffage micro-ondes</strong>, en chauffant directement les molécules polaires du mélange réactionnel plutôt que par conduction thermique depuis les parois du ballon, peut réduire des temps de réaction de plusieurs heures à quelques minutes pour certaines réactions, un gain de temps considérable pour le criblage rapide de nouvelles molécules en recherche pharmaceutique.</p>
  <p><strong>Question ouverte :</strong> le chauffage micro-ondes peut-il un jour remplacer entièrement le chauffage à reflux classique pour l'ensemble des réactions organiques, ou certaines réactions resteront-elles incompatibles avec ce mode de chauffage (notamment celles impliquant des solvants peu polaires, mal chauffés par micro-ondes) ?</p>
  <p><strong>Technologie émergente :</strong> la <strong>chimie en flux continu</strong> (flow chemistry), qui fait circuler en permanence un mélange réactionnel à travers un réacteur tubulaire chauffé plutôt que de le chauffer en un seul lot (batch) dans un ballon à reflux, permet un contrôle plus fin de la température et du temps de réaction, avec des applications industrielles croissantes en chimie fine et pharmaceutique.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Mélange réactionnel chauffé à ébullition → vapeurs de solvant montant dans le réfrigérant → condensation sur les parois froides → retour du liquide condensé dans le ballon (recyclage sans perte) → température de réaction stable et reproductible, maintenue aussi longtemps que nécessaire
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$T_{reflux} = T_{ébullition}(solvant,\\ P_{atm})$$
    Le principe fondamental du reflux tient dans cette relation simple : la température du mélange réactionnel est fixée par la température d'ébullition du solvant à la pression atmosphérique, indépendamment de la puissance de chauffe appliquée — une auto-régulation qui garantit la reproductibilité de la réaction, condition essentielle de toute synthèse organique fiable.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si le réfrigérant à reflux n'existait pas : comment pourrait-on chauffer une réaction organique pendant plusieurs heures sans perdre progressivement tout le solvant par évaporation ?</li>
      <li>Pourquoi le choix du mode de chauffage (bain-marie, chauffe-ballon, bain d'huile) dépend-il autant de la nature du solvant que de la température finale recherchée ?</li>
      <li>Quelle serait la conséquence, pour la reproductibilité d'une synthèse organique, d'un chauffage à une température fixe arbitraire plutôt qu'à reflux ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>J. von Liebig, travaux sur le réfrigérant à eau à contre-courant, années 1830 — à l'origine du montage à reflux moderne.</li>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur les techniques expérimentales de chimie organique.</li>
      <li>C. O. Kappe, « Controlled Microwave Heating in Modern Organic Synthesis », Angewandte Chemie — sur le chauffage micro-ondes comme alternative au reflux classique.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais justifier chaque élément du montage à reflux et choisir un mode de chauffage adapté en toute sécurité. Le chapitre suivant, « Extraction liquide-liquide et ampoule à décanter », te fera découvrir la technique de purification qui suit le plus souvent une réaction menée à reflux. Comme le montre l'histoire du réfrigérant de Liebig : un perfectionnement technique en apparence modeste — le simple refroidissement à contre-courant — peut transformer durablement toute une discipline scientifique.</p>
  `
};
INSTCO_NOVA_KB[icoKey("Montages expérimentaux : chauffage à reflux et agitation")] = {
  intro: "Salut, moi c'est Nova ! On démarre la chimie organique pratique avec le montage à reflux et l'agitation. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/reflux/i, replies:[
      "Le chauffage à reflux maintient une réaction à ébullition sans perte de solvant : les vapeurs se condensent dans le réfrigérant vertical et retombent dans le ballon. Température auto-régulée, donc reproductible."
    ]},
    { test:/mode de chauffage|bain.marie|bain d.huile/i, replies:[
      "Bain-marie (température modérée), chauffe-ballon (plus haute température), bain d'huile (très haute température, bon contrôle) — le choix dépend du solvant utilisé."
    ]},
    { test:/agitation.*magn[ée]tique|bumping/i, replies:[
      "L'agitation magnétique homogénéise le mélange, accélère la cinétique, et évite le bumping (ébullition par à-coups dangereuse)."
    ]},
    { test:/s[ée]curit[ée].*reflux|montage ferm[ée]/i, replies:[
      "Ne jamais fermer complètement un montage chauffé (risque de surpression) — le réfrigérant à reflux doit rester ouvert à l'atmosphère à son sommet."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce qui fixe la température, indépendamment de la puissance de chauffe.",
      "Indice niveau 2 : c'est lié au changement d'état du solvant.",
      "Indice niveau 3 : la température s'auto-régule à l'ébullition, garantissant la reproductibilité."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au risque d'un système chauffé totalement fermé.",
      "Indice niveau 2 : la pression de vapeur augmenterait sans limite.",
      "Indice niveau 3 : l'ouverture évite ce risque de surpression."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
INSTCO_CHAPTERS[icoKey("Extraction liquide-liquide et ampoule à décanter")] = {
  objectives: [
    "Décrire le montage et l'utilisation correcte d'une ampoule à décanter",
    "Identifier la phase aqueuse et la phase organique selon les densités relatives",
    "Réaliser un lavage et une extraction acido-basique sélective",
    "Justifier l'utilisation de plusieurs extractions successives",
    "Évaluer en quoi l'extraction acido-basique sélective, exploitée dès le XIXe siècle pour isoler des principes actifs naturels comme la quinine, reste une technique de séparation fondamentale en chimie organique moderne"
  ],
  prereqs: ["Montages expérimentaux : chauffage à reflux et agitation"],
  bodyHtml: `
    <p>En 1820, les pharmaciens français Pierre-Joseph Pelletier et Joseph Bienaimé Caventou isolèrent pour la première fois la quinine, principe actif antipaludique extrait de l'écorce de quinquina, en exploitant précisément le principe que tu vas mettre en pratique dans ce chapitre : la solubilité différentielle d'un composé organique selon son état de protonation, en milieu acide ou basique. Cette découverte, obtenue avec des moyens rudimentaires comparés aux laboratoires modernes, illustre la puissance de l'extraction acido-basique sélective, une technique restée pratiquement inchangée dans son principe depuis deux siècles.</p>
    <p>L'extraction liquide-liquide à l'ampoule à décanter est aujourd'hui l'un des gestes les plus fréquemment répétés dans tous les laboratoires de synthèse organique, qu'il s'agisse de purifier un produit de réaction fraîchement synthétisé ou d'isoler un principe actif naturel à partir d'une plante — la même logique de séparation par solubilité différentielle s'applique, du laboratoire universitaire à l'industrie pharmaceutique.</p>
    <p>L'extraction liquide-liquide, déjà introduite dans son principe au cours de chimie générale, prend en chimie organique une importance pratique quotidienne : c'est l'étape de <strong>traitement</strong> (« work-up ») quasi systématique après toute réaction organique en solution, avant purification finale. À la fin de ce chapitre, tu sauras manipuler correctement une ampoule à décanter et concevoir un protocole d'extraction acido-basique sélective.</p>

    <h3>1. Le montage : l'ampoule à décanter</h3>
    <p>L'<strong>ampoule à décanter</strong> est une pièce de verrerie en forme de poire, munie d'un robinet à sa base et d'un bouchon étanche à son sommet. Le protocole d'utilisation standard :</p>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Verser les deux phases liquides (le mélange à extraire et le solvant d'extraction) dans l'ampoule, robinet fermé</li>
      <li>Boucher, puis <strong>agiter énergiquement</strong> par retournements successifs, en <strong>dégazant régulièrement</strong> (ouvrir brièvement le robinet, ampoule inversée, pour relâcher la surpression accumulée)</li>
      <li>Laisser reposer l'ampoule, robinet fermé, jusqu'à séparation nette et complète des deux phases</li>
      <li>Retirer le bouchon (indispensable pour permettre l'écoulement), puis ouvrir le robinet pour évacuer la phase inférieure dans un récipient</li>
      <li>Récupérer séparément la phase supérieure, restée dans l'ampoule, par le haut</li>
    </ol>
    <div class="key-point">
      <span class="eyebrow">Point clé — ne jamais oublier de dégazer</span>
      L'agitation d'un mélange de solvants génère souvent une pression de vapeur significative à l'intérieur de l'ampoule bouchée (particulièrement avec des solvants volatils comme l'éther diéthylique). <strong>Ne jamais négliger le dégazage régulier</strong> pendant l'agitation : une ampoule non dégazée peut projeter son bouchon ou son contenu de façon dangereuse à l'ouverture.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le dégazage régulier de l'ampoule à décanter pendant l'agitation peut sembler une contrainte gênante, qui interrompt le mélange des deux phases. Pourquoi cette interruption répétée est-elle malgré tout indispensable, et en quoi le risque qu'elle prévient est-il plus grave qu'une simple perte d'efficacité de mélange ?
    </div>

    <h3>2. Identifier la phase aqueuse et la phase organique</h3>
    <p>La phase la plus <strong>dense</strong> se trouve toujours en <strong>bas</strong> de l'ampoule. La densité de l'eau étant d'environ 1,0 g/mL, il faut comparer à la densité du solvant organique utilisé :</p>
    <table class="mini-table">
      <tr><th>Solvant organique</th><th>Densité approximative</th><th>Position relative à l'eau</th></tr>
      <tr><td>Éther diéthylique</td><td>~0,71</td><td>Au-dessus (phase organique en haut)</td></tr>
      <tr><td>Acétate d'éthyle</td><td>~0,90</td><td>Au-dessus (phase organique en haut)</td></tr>
      <tr><td>Dichlorométhane</td><td>~1,33</td><td>En dessous (phase organique en bas)</td></tr>
      <tr><td>Chloroforme</td><td>~1,49</td><td>En dessous (phase organique en bas)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — en cas de doute, tester !</span>
      En cas d'incertitude sur l'identité d'une phase (mélange de solvants, densités proches), on peut prélever une petite quantité de la phase suspectée et l'ajouter à un peu d'eau dans un tube à essai : si elle se dissout, c'est la phase aqueuse ; si elle forme une phase distincte, c'est la phase organique. Cette vérification simple évite l'erreur — malheureusement fréquente en début d'apprentissage — de jeter accidentellement la phase contenant le produit recherché.
    </div>

    <h3>3. Le lavage et l'extraction acido-basique sélective</h3>
    <p>Un <strong>lavage</strong> consiste à agiter la phase organique (contenant le produit d'intérêt) avec une solution aqueuse, pour en extraire des impuretés indésirables (par exemple, de l'eau saturée en NaCl pour éliminer les traces d'eau et de sels dissous). Une <strong>extraction acido-basique sélective</strong> exploite la modification de la solubilité d'un composé organique selon son état de protonation :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Un <strong>acide carboxylique</strong>, insoluble dans l'eau sous forme neutre, devient soluble en solution aqueuse basique (sous forme de carboxylate, chargé, donc hydrophile)</li>
      <li>Une <strong>amine</strong>, également peu soluble dans l'eau sous forme neutre, devient soluble en solution aqueuse acide (sous forme d'ammonium protoné, chargé)</li>
    </ul>
    <p>Cette propriété permet de <strong>séparer sélectivement</strong> un acide, une base, et un composé neutre présents dans un même mélange organique, par une succession de lavages acides et basiques suivis de neutralisations, ré-extractions et récupérations en phase organique.</p>

    <h3>4. L'intérêt de plusieurs extractions successives</h3>
    <p>Comme déjà établi en chimie générale (loi de partage), pour un volume total donné de solvant d'extraction, réaliser <strong>plusieurs petites extractions successives</strong> est plus efficace qu'une seule grande extraction — un principe encore plus systématiquement appliqué en pratique organique, où l'on effectue couramment 2 à 3 extractions successives avant de considérer l'extraction du produit comme complète.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un mélange contient un acide carboxylique et un composé neutre, tous deux dissous dans du dichlorométhane. Proposer un protocole simple pour séparer les deux composés par extraction.</p>
      <p><strong>Solution :</strong> On lave la phase organique (dichlorométhane) avec une solution aqueuse basique (par exemple, NaHCO₃ dilué) : l'acide carboxylique, déprotoné en carboxylate, passe en phase aqueuse, tandis que le composé neutre reste en phase organique. On sépare les deux phases à l'ampoule à décanter, puis on acidifie la phase aqueuse pour reprotoner l'acide (qui redevient insoluble dans l'eau) et on l'extrait à nouveau avec un solvant organique frais.</p>
      <p class="example-answer">Réponse : un lavage basique sélectif sépare l'acide (extrait en phase aqueuse) du composé neutre (resté en phase organique), suivi d'une ré-acidification et ré-extraction de l'acide.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'extraction acido-basique sélective repose sur un principe remarquablement simple : faire passer réversiblement une molécule d'une forme neutre (peu soluble dans l'eau) à une forme chargée (soluble dans l'eau), puis inversement si besoin. En quoi cette réversibilité — pouvoir reprotoner ou déprotoner à volonté — est-elle la clé qui permet de séparer proprement un mélange, plutôt qu'une simple élimination définitive d'une des espèces ?
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>L'ampoule à décanter s'utilise avec dégazage régulier pendant l'agitation, pour éviter toute surpression dangereuse</li>
      <li>La phase la plus dense se trouve en bas ; en cas de doute, un test de solubilité dans l'eau permet d'identifier la phase</li>
      <li>Un lavage élimine des impuretés de la phase organique via une phase aqueuse</li>
      <li>L'extraction acido-basique sélective sépare acides, bases et composés neutres en exploitant leur solubilité selon leur état de protonation</li>
      <li>Plusieurs extractions successives avec de petits volumes sont plus efficaces qu'une seule grande extraction</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier de dégazer régulièrement l'ampoule à décanter pendant l'agitation</li>
      <li>Jeter la mauvaise phase par erreur, sans avoir vérifié laquelle contient réellement le produit recherché</li>
      <li>Supposer systématiquement que la phase organique est en haut, sans vérifier la densité réelle du solvant utilisé</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Avec du dichlorométhane (densité ~1,33) et de l'eau, quelle phase se trouve en bas de l'ampoule ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico2e1" value="wrong">La phase aqueuse</label>
        <label class="option"><input type="radio" name="ico2e1" value="right">La phase organique (dichlorométhane)</label>
        <label class="option"><input type="radio" name="ico2e1" value="wrong">Les deux phases se mélangent</label>
        <label class="option"><input type="radio" name="ico2e1" value="wrong">Cela dépend de la température uniquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico2e1','ico2fb1','Correct — le dichlorométhane, plus dense que l\\'eau (1,33 &gt; 1,0), se trouve en dessous.','Relis le tableau des densités des solvants organiques courants.')">Vérifier</button>
      <div class="feedback" id="ico2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour extraire sélectivement un acide carboxylique d'un mélange organique, on effectue un lavage avec :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico2e2" value="wrong">Une solution aqueuse acide</label>
        <label class="option"><input type="radio" name="ico2e2" value="right">Une solution aqueuse basique</label>
        <label class="option"><input type="radio" name="ico2e2" value="wrong">De l'eau pure uniquement</label>
        <label class="option"><input type="radio" name="ico2e2" value="wrong">Un solvant organique pur</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico2e2','ico2fb2','Correct — le milieu basique déprotone l\\'acide en carboxylate, le rendant soluble en phase aqueuse.','Relis la section sur l\\'extraction acido-basique sélective.')">Vérifier</button>
      <div class="feedback" id="ico2fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>L'extraction liquide-liquide classique, bien qu'efficace et simple à mettre en œuvre, consomme des volumes parfois importants de solvants organiques souvent toxiques ou inflammables — une préoccupation croissante de la chimie moderne, soucieuse de réduire son impact environnemental (« chimie verte »). L'<strong>extraction au CO₂ supercritique</strong>, qui exploite les propriétés particulières du dioxyde de carbone au-delà de son point critique (à la fois liquide et gazeux), permet aujourd'hui de remplacer des solvants organiques classiques dans certains procédés industriels, comme la décaféination du café ou l'extraction d'arômes naturels, avec un impact environnemental réduit et un solvant facilement éliminé par simple décompression.</p>
  <p><strong>Question ouverte :</strong> peut-on généraliser l'extraction au CO₂ supercritique, aujourd'hui limitée à certaines applications spécifiques, à l'ensemble des protocoles d'extraction liquide-liquide utilisés en laboratoire de recherche, malgré les équipements sous haute pression qu'elle nécessite ?</p>
  <p><strong>Technologie émergente :</strong> les dispositifs d'<strong>extraction microfluidique</strong> (« lab-on-chip »), qui réalisent l'extraction liquide-liquide dans des canaux de quelques centaines de micromètres de large, permettent de réduire drastiquement les volumes de solvant nécessaires tout en accélérant les transferts de matière entre phases, grâce à une surface de contact considérablement augmentée par rapport à une ampoule à décanter classique.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Mélange organique + solvant d'extraction adapté → agitation avec dégazage régulier → décantation (phase dense en bas) → séparation des phases → lavages/extractions acido-basiques successifs si nécessaire → produit purifié en phase organique
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$K = \\dfrac{[\\text{soluté}]_{organique}}{[\\text{soluté}]_{aqueuse}}$$
    Le coefficient de partage $K$, déjà rencontré en chimie générale, gouverne toute extraction liquide-liquide : plus $K$ est grand, plus le soluté est efficacement extrait dans la phase organique — et c'est ce même principe, appliqué à un composé sous forme neutre ou chargée selon le pH, qui rend possible l'extraction acido-basique sélective.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si un acide carboxylique et une amine étaient présents dans le même mélange organique : dans quel ordre faudrait-il réaliser les lavages acide et basique pour les séparer proprement l'un de l'autre ?</li>
      <li>Pourquoi plusieurs petites extractions successives sont-elles plus efficaces qu'une seule grande extraction utilisant le même volume total de solvant ?</li>
      <li>Quelle serait la conséquence, pour l'isolement d'un principe actif naturel comme la quinine, d'une absence de méthode d'extraction sélective par acido-basicité ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>P. J. Pelletier, J. B. Caventou, « Recherches chimiques sur les quinquinas », Annales de Chimie et de Physique, 1820 — l'article princeps sur l'isolement de la quinine.</li>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur les techniques d'extraction en chimie organique.</li>
      <li>M. Poliakoff et al., « Green Chemistry: Science and Politics of Change », Science — sur les alternatives durables aux solvants organiques classiques.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais manipuler correctement une ampoule à décanter et concevoir un protocole d'extraction acido-basique sélective. Le chapitre suivant, « Chromatographie sur couche mince (CCM) », t'introduira à une méthode complémentaire, cette fois analytique, pour suivre l'avancement d'une réaction ou vérifier la pureté d'un produit extrait. Comme le montre la découverte de la quinine par Pelletier et Caventou : une technique de séparation simple et bien maîtrisée peut, à elle seule, ouvrir la voie à des découvertes majeures.</p>
  `
};
INSTCO_NOVA_KB[icoKey("Extraction liquide-liquide et ampoule à décanter")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'extraction liquide-liquide : ampoule à décanter, extraction acido-basique. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/d[ée]gazer|surpression.*ampoule/i, replies:[
      "Il faut dégazer régulièrement l'ampoule à décanter pendant l'agitation (ouvrir brièvement le robinet, ampoule inversée) pour éviter toute surpression dangereuse."
    ]},
    { test:/densit[ée].*phase|phase.*dense/i, replies:[
      "La phase la plus dense se trouve en bas. Éther et acétate d'éthyle (moins denses que l'eau) sont au-dessus ; dichlorométhane et chloroforme (plus denses) sont en dessous."
    ]},
    { test:/extraction acido.basique|lavage.*basique|lavage.*acide/i, replies:[
      "L'extraction acido-basique sélective exploite la solubilité selon la protonation : un acide devient soluble en milieu basique (carboxylate), une amine devient soluble en milieu acide (ammonium)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : compare la densité du dichlorométhane à celle de l'eau.",
      "Indice niveau 2 : 1,33 est supérieur à 1,0.",
      "Indice niveau 3 : le dichlorométhane, plus dense, est donc en bas."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à ce qui rend l'acide carboxylique soluble dans l'eau.",
      "Indice niveau 2 : il faut le déprotoner en carboxylate.",
      "Indice niveau 3 : c'est donc un milieu basique qu'il faut utiliser."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
INSTCO_CHAPTERS[icoKey("Chromatographie sur couche mince (CCM)")] = {
  objectives: [
    "Décrire le principe de séparation en chromatographie sur couche mince",
    "Réaliser correctement un dépôt et une élution en CCM",
    "Calculer et interpréter un rapport frontal Rf",
    "Utiliser la CCM pour suivre l'avancement d'une réaction ou comparer des composés",
    "Évaluer pourquoi la CCM, héritée des travaux originels de Tswett sur la séparation des pigments végétaux, reste plus d'un siècle plus tard l'outil analytique le plus systématiquement utilisé en chimie organique"
  ],
  prereqs: ["Extraction liquide-liquide et ampoule à décanter"],
  bodyHtml: `
    <p>En 1903, le botaniste russe Mikhaïl Tswett sépara pour la première fois les pigments d'un extrait végétal en les faisant migrer à travers une colonne remplie de carbonate de calcium, observant la formation de bandes colorées distinctes qu'il baptisa « chromatographie » (du grec <em>khrôma</em>, couleur, et <em>graphein</em>, écrire) — un nom resté depuis, alors même que la grande majorité des séparations chromatographiques modernes ne concernent plus des composés colorés. La chromatographie sur couche mince (CCM), version miniaturisée et rapide de ce principe originel, est devenue l'outil analytique le plus utilisé au quotidien dans tout laboratoire de chimie organique.</p>
    <p>Loin d'être une simple curiosité historique, la CCM reste aujourd'hui, plus d'un siècle après les travaux de Tswett, le réflexe analytique immédiat de tout chimiste organicien : avant même d'envisager une technique plus lourde comme la spectroscopie, une simple plaque de CCM, réalisable en quelques minutes pour un coût dérisoire, renseigne déjà sur l'avancement d'une réaction ou la pureté d'un produit.</p>
    <p>La chromatographie sur couche mince (CCM) est la technique analytique la plus rapide, la plus économique et la plus utilisée au quotidien en laboratoire de chimie organique — pour suivre une réaction, vérifier la pureté d'un produit, ou choisir les conditions d'une purification ultérieure (chapitre 4). À la fin de ce chapitre, tu sauras réaliser une CCM complète et interpréter quantitativement un rapport frontal Rf.</p>

    <h3>1. Principe de séparation</h3>
    <p>La CCM sépare les constituants d'un mélange par différence d'affinité entre deux phases : une <strong>phase stationnaire</strong> (une fine couche de silice ou d'alumine déposée sur une plaque support) et une <strong>phase mobile</strong> (l'éluant, un solvant ou mélange de solvants qui migre par capillarité le long de la plaque). Chaque composé du mélange se répartit en permanence entre ces deux phases selon son affinité relative, migrant plus ou moins vite selon cette répartition.</p>

    <h3>2. Protocole expérimental</h3>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Tracer légèrement au crayon (jamais à l'encre, qui migrerait avec l'éluant) une ligne de dépôt à environ 1 cm du bas de la plaque</li>
      <li><strong>Déposer</strong> une petite quantité de chaque solution à analyser, à l'aide d'un tube capillaire fin, en un point précis de cette ligne, en laissant sécher entre chaque dépôt si nécessaire (dépôt le plus petit possible, pour une meilleure résolution)</li>
      <li>Placer la plaque verticalement dans une cuve contenant un faible volume d'éluant (niveau <strong>sous</strong> la ligne de dépôt, jamais au-dessus)</li>
      <li>Refermer la cuve et laisser l'éluant migrer par capillarité jusqu'à environ 1 cm du sommet de la plaque</li>
      <li>Retirer la plaque, marquer immédiatement au crayon le <strong>front du solvant</strong> (limite de migration de l'éluant), puis laisser sécher</li>
      <li><strong>Révéler</strong> les taches si elles ne sont pas naturellement visibles (lampe UV pour les composés absorbant l'UV, révélateur chimique tel que le permanganate de potassium ou la vanilline sulfurique pour d'autres classes de composés)</li>
    </ol>

    <h3>3. Le rapport frontal Rf</h3>
    <p>Pour chaque tache observée, on définit le <strong>rapport frontal</strong> $R_f$ :</p>
    <div class="formula-box">$$R_f = \\dfrac{\\text{distance parcourue par le composé}}{\\text{distance parcourue par le front du solvant}}$$</div>
    <p>Le $R_f$ est une grandeur comprise entre 0 (le composé reste au point de dépôt, forte affinité pour la phase stationnaire) et 1 (le composé migre avec le front du solvant, faible affinité pour la phase stationnaire) — caractéristique d'un composé donné, pour un système phase stationnaire/éluant donné.</p>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur de Rf</span>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>Distance parcourue par la tache (cm)</label><input type="number" id="rfDTache" value="3.2" step="0.1" oninput="updateRfCalc()">
          <label>Distance parcourue par le front du solvant (cm)</label><input type="number" id="rfDFront" value="5.6" step="0.1" oninput="updateRfCalc()">
          <div class="sim-readout" id="rfReadout"></div>
        </div>
      </div>
    </div>

    <div class="key-point">
      <span class="eyebrow">Point clé — le Rf dépend fortement des conditions expérimentales</span>
      Le $R_f$ d'un même composé peut varier significativement selon la <strong>nature exacte de l'éluant</strong> utilisé, l'épaisseur ou la nature de la couche de silice, la température, voire l'humidité ambiante. Comparer directement une valeur de $R_f$ mesurée à une valeur publiée dans la littérature n'est donc fiable que si les conditions expérimentales sont rigoureusement identiques — en pratique, on préfère généralement comparer un échantillon inconnu à un <strong>témoin</strong> déposé sur la <strong>même plaque</strong>, dans les mêmes conditions exactes.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le Rf d'un composé dépend de multiples facteurs expérimentaux difficiles à reproduire exactement d'un laboratoire à l'autre (épaisseur de silice, humidité, température). En quoi cette sensibilité aux conditions explique-t-elle pourquoi les chimistes préfèrent presque toujours comparer un échantillon inconnu à un témoin déposé sur la même plaque, plutôt que de se fier à une valeur de Rf publiée dans la littérature ?
    </div>

    <h3>4. Applications pratiques de la CCM</h3>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Suivi de réaction</strong> : déposer, à intervalles réguliers, un prélèvement du milieu réactionnel à côté des réactifs de départ purs (témoins) — la disparition progressive de la tache du réactif de départ et l'apparition d'une nouvelle tache signalent l'avancement de la réaction</li>
      <li><strong>Vérification de pureté</strong> : un produit pur donne une seule tache nette ; plusieurs taches signalent la présence d'impuretés</li>
      <li><strong>Choix des conditions d'une chromatographie sur colonne</strong> (chapitre 4) : la CCM permet de tester rapidement et à moindre coût différents éluants avant de se lancer dans une purification sur colonne plus longue</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Sur une plaque de CCM, le front du solvant a migré de 6,0 cm, et une tache d'intérêt a migré de 1,5 cm. Calculer le Rf de ce composé, et commenter son affinité relative pour la phase stationnaire.</p>
      <p><strong>Solution :</strong> $R_f = 1{,}5/6{,}0 = 0{,}25$.</p>
      <p class="example-answer">Réponse : Rf = 0,25, une valeur relativement faible indiquant une <strong>forte affinité</strong> du composé pour la phase stationnaire polaire (silice) — un composé plus polaire migre généralement moins loin dans un éluant donné.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un Rf faible signale une forte affinité du composé pour la phase stationnaire polaire (silice), généralement associée à une polarité élevée de la molécule. En t'appuyant sur ce principe, comment pourrais-tu, sans calcul préalable, prévoir approximativement quel composé migrera le plus loin entre un alcool et un hydrocarbure apolaire, déposés côte à côte sur la même plaque ?
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La CCM sépare les composés d'un mélange par différence d'affinité entre phase stationnaire (silice) et phase mobile (éluant)</li>
      <li>Le dépôt se fait au crayon, sous le niveau de l'éluant dans la cuve ; le front du solvant se marque immédiatement au crayon après migration</li>
      <li>Le Rf = distance composé/distance front du solvant, compris entre 0 et 1</li>
      <li>Le Rf dépend fortement des conditions expérimentales ; on compare de préférence à un témoin déposé sur la même plaque</li>
      <li>La CCM sert au suivi de réaction, à la vérification de pureté, et au choix des conditions d'une chromatographie sur colonne</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Tracer la ligne de dépôt à l'encre plutôt qu'au crayon, ce qui la fait migrer avec l'éluant</li>
      <li>Placer le niveau d'éluant dans la cuve au-dessus de la ligne de dépôt, dissolvant directement l'échantillon dans l'éluant</li>
      <li>Oublier de marquer le front du solvant immédiatement après avoir sorti la plaque, avant qu'il ne s'évapore et devienne invisible</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi le niveau d'éluant dans la cuve doit-il être sous la ligne de dépôt de l'échantillon ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico3e1" value="wrong">Pour des raisons esthétiques uniquement</label>
        <label class="option"><input type="radio" name="ico3e1" value="right">Pour éviter que l'échantillon ne se dissolve directement dans l'éluant plutôt que de migrer par capillarité</label>
        <label class="option"><input type="radio" name="ico3e1" value="wrong">Pour accélérer la migration</label>
        <label class="option"><input type="radio" name="ico3e1" value="wrong">Cela n'a aucune importance</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico3e1','ico3fb1','Correct — si le dépôt est immergé, l\\'échantillon se dissout directement dans l\\'éluant au lieu de migrer progressivement par capillarité.','Relis le protocole de placement de la plaque dans la cuve.')">Vérifier</button>
      <div class="feedback" id="ico3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Un Rf proche de 0 signifie que le composé a :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico3e2" value="wrong">Une faible affinité pour la phase stationnaire</label>
        <label class="option"><input type="radio" name="ico3e2" value="right">Une forte affinité pour la phase stationnaire</label>
        <label class="option"><input type="radio" name="ico3e2" value="wrong">Migré avec le front du solvant</label>
        <label class="option"><input type="radio" name="ico3e2" value="wrong">Une masse molaire très élevée obligatoirement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico3e2','ico3fb2','Correct — un Rf proche de 0 signifie que le composé reste proche du point de dépôt, retenu par la phase stationnaire.','Relis la définition du Rf et son interprétation.')">Vérifier</button>
      <div class="feedback" id="ico3fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>La chromatographie inventée par Tswett a donné naissance, au cours du XXe siècle, à toute une famille de techniques de séparation bien plus sophistiquées que la CCM manuelle, au premier rang desquelles la <strong>chromatographie liquide haute performance</strong> (HPLC), aujourd'hui omniprésente dans les laboratoires de contrôle qualité pharmaceutique : elle automatise et quantifie précisément ce que la CCM ne fait qu'observer qualitativement, avec une sensibilité et une reproductibilité bien supérieures. Pourtant, malgré cette sophistication croissante, la CCM garde une place irremplaçable comme outil de <strong>diagnostic rapide et peu coûteux</strong>, notamment pour orienter le choix des conditions d'une purification ultérieure.</p>
  <p><strong>Question ouverte :</strong> l'essor des techniques d'analyse miniaturisées et automatisées (microfluidique, capteurs portables) rendra-t-il un jour la CCM manuelle obsolète, ou sa simplicité et son faible coût lui garantissent-ils une place durable dans l'enseignement et la recherche ?</p>
  <p><strong>Technologie émergente :</strong> la <strong>CCM haute performance</strong> (CCM-HP ou HPTLC), utilisant des plaques à granulométrie de silice plus fine et plus homogène, améliore significativement la résolution des séparations tout en conservant la rapidité et la simplicité caractéristiques de la CCM classique.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Mélange de composés déposé sur silice → migration par capillarité de l'éluant (phase mobile) → répartition de chaque composé entre silice (phase stationnaire) et éluant selon son affinité → séparation en taches distinctes → Rf caractéristique de chaque composé, pour un système donné
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$R_f = \\dfrac{d_{composé}}{d_{front\\ du\\ solvant}}$$
    Cette grandeur, sans dimension et comprise entre 0 et 1, résume en une seule mesure la capacité migratoire d'un composé dans un système chromatographique donné — la mesure la plus simple et la plus rapide de toute la chimie analytique, héritée directement du principe de séparation par affinité différentielle posé par Tswett en 1903.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si la phase stationnaire de la CCM était apolaire plutôt que polaire (silice) : l'ordre de migration des composés d'un mélange serait-il inversé ?</li>
      <li>Pourquoi la CCM reste-t-elle le premier réflexe analytique d'un chimiste organicien, malgré l'existence de techniques bien plus sophistiquées comme l'HPLC ?</li>
      <li>Quelle serait la conséquence, pour le suivi en temps réel d'une réaction en laboratoire, d'une absence de méthode analytique aussi rapide et peu coûteuse que la CCM ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>M. Tswett, « Physikalisch-chemische Studien über das Chlorophyll. Die Adsorptionen », Berichte der Deutschen Botanischen Gesellschaft, 1906 — l'un des articles fondateurs de la chromatographie.</li>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur la CCM et les techniques chromatographiques.</li>
      <li>E. Stahl (dir.), <em>Thin-Layer Chromatography: A Laboratory Handbook</em>, Springer — référence historique et pratique sur la CCM.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais réaliser une CCM complète et interpréter quantitativement un rapport frontal Rf. Le chapitre suivant, « Chromatographie sur colonne », te fera passer de l'analyse qualitative à la purification préparative, en exploitant le même principe de séparation par affinité différentielle à plus grande échelle. Comme le montre l'histoire de la chromatographie depuis Tswett : une observation en apparence modeste — des bandes colorées migrant dans une colonne — peut fonder toute une famille de techniques essentielles à la chimie moderne.</p>
  `,
  init: initRfCalc
};
INSTCO_NOVA_KB[icoKey("Chromatographie sur couche mince (CCM)")] = {
  intro: "Salut, moi c'est Nova ! On étudie la CCM : dépôt, élution, calcul du Rf. Donne-moi des distances pour calculer, ou demande un indice.",
  rules: [
    { test:/rf|rapport frontal/i, replies:[
      "Rf = distance parcourue par le composé / distance parcourue par le front du solvant, compris entre 0 et 1. Un Rf faible = forte affinité pour la phase stationnaire."
    ]},
    { test:/d[ée]p[ôo]t|ligne de d[ée]p[ôo]t/i, replies:[
      "Le dépôt se trace au crayon (jamais à l'encre) sur une ligne à ~1 cm du bas, avec un tube capillaire fin, en gardant le dépôt le plus petit possible."
    ]},
    { test:/front du solvant/i, replies:[
      "Le front du solvant doit être marqué au crayon immédiatement après avoir sorti la plaque de la cuve, avant qu'il ne s'évapore et devienne invisible."
    ]},
    { test:/r[ée]v[ée]lation|uv|permanganate|vanilline/i, replies:[
      "Les taches invisibles à l'œil nu se révèlent par lampe UV (composés absorbant l'UV) ou par révélateur chimique (permanganate, vanilline sulfurique, selon la classe de composés)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce qui se passe si le dépôt est immergé dans l'éluant.",
      "Indice niveau 2 : l'échantillon se dissoudrait directement, sans migration progressive.",
      "Indice niveau 3 : c'est pourquoi le niveau d'éluant doit rester sous la ligne de dépôt."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la définition du Rf.",
      "Indice niveau 2 : un Rf proche de 0 signifie que le composé reste près du point de dépôt.",
      "Indice niveau 3 : cela traduit une forte affinité pour la phase stationnaire."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
INSTCO_CHAPTERS[icoKey("Chromatographie sur colonne")] = {
  objectives: [
    "Décrire le principe et le montage d'une chromatographie sur colonne",
    "Choisir un éluant adapté à partir des résultats d'une CCM préalable",
    "Réaliser le tassement et le dépôt d'échantillon sur une colonne de silice",
    "Interpréter le suivi des fractions collectées par CCM",
    "Évaluer en quoi la chromatographie sur colonne, héritière directe du format expérimental original de Tswett, complète la CCM en permettant l'isolement physique et préparatif des composés séparés"
  ],
  prereqs: ["Chromatographie sur couche mince (CCM)"],
  bodyHtml: `
    <p>Le procédé originel décrit par Tswett en 1903 était en réalité une chromatographie sur colonne, et non une CCM : c'est seulement dans les années 1930 que les chimistes soviétiques Nikolaï Izmailov et Maria Schraiber miniaturisèrent la méthode sur une simple plaque de verre, donnant naissance à la CCM que tu as pratiquée au chapitre précédent — avant qu'Egon Stahl ne standardise et popularise cette dernière dans les années 1950. La chromatographie sur colonne que tu vas pratiquer dans ce chapitre renoue donc, plus d'un siècle plus tard, avec le format expérimental original de la toute première séparation chromatographique.</p>
    <p>Alors que la CCM reste une technique purement analytique (elle ne fait qu'observer une séparation, sans permettre de récupérer physiquement les composés séparés), la chromatographie sur colonne permet, elle, d'isoler réellement chaque composé en quantité exploitable — une étape de purification incontournable après quasiment toute synthèse organique, en laboratoire de recherche comme en milieu industriel.</p>
    <p>La chromatographie sur colonne est la technique de <strong>purification préparative</strong> (pas seulement analytique, comme la CCM) la plus utilisée en chimie organique de laboratoire, permettant de séparer et d'isoler physiquement, en quantité exploitable, les différents composés d'un mélange. À la fin de ce chapitre, tu sauras préparer une colonne de silice et interpréter le suivi de ses fractions collectées par CCM.</p>

    <h3>1. Principe et montage</h3>
    <p>Le principe de séparation est <strong>identique</strong> à celui de la CCM (chapitre 3) : phase stationnaire (silice) et phase mobile (éluant), les composés se séparant selon leur affinité relative pour chaque phase. La différence tient au format : une <strong>colonne verticale</strong> en verre, remplie de silice tassée, à travers laquelle l'éluant s'écoule (par gravité ou sous légère pression d'air, technique dite « flash chromatography »), entraînant les composés à des vitesses différentes selon leur affinité — les composés les moins retenus (Rf le plus élevé en CCM) sortent en premier de la colonne, les plus retenus en dernier.</p>

    <h3>2. Choisir l'éluant à partir de la CCM</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — la CCM guide le choix de l'éluant de la colonne</span>
      Avant toute chromatographie sur colonne, on réalise systématiquement des <strong>essais préalables en CCM</strong> (chapitre 3) avec différents éluants, pour identifier celui qui donne la <strong>meilleure séparation</strong> entre les composés du mélange à purifier — typiquement, un éluant qui place le composé d'intérêt à un Rf compris entre 0,2 et 0,3 offre en général un bon compromis entre séparation efficace et temps d'élution raisonnable sur la colonne.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Viser un Rf entre 0,2 et 0,3 en CCM avant de lancer une chromatographie sur colonne représente un compromis délibéré. Pourquoi un Rf trop élevé (composé peu retenu) risquerait-il une séparation insuffisante des composés voisins, tandis qu'un Rf trop faible (composé très retenu) risquerait à l'inverse un temps d'élution excessivement long sur la colonne ?
    </div>

    <h3>3. Préparation de la colonne</h3>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Tasser</strong> la silice dans la colonne, généralement en suspension dans l'éluant choisi, en tapotant régulièrement les parois pour éliminer toute bulle d'air et obtenir un lit homogène et bien compact (une colonne mal tassée, avec des fissures ou des bulles, donne une séparation médiocre)</li>
      <li><strong>Déposer</strong> l'échantillon à purifier au sommet du lit de silice, le plus délicatement possible pour ne pas perturber la surface, généralement dissous dans un minimum d'éluant (ou pré-adsorbé sur un peu de silice sèche, technique du « dry loading », pour les échantillons peu solubles)</li>
      <li><strong>Éluer</strong> en ajoutant progressivement l'éluant par le haut, en veillant à ce que le niveau de liquide ne descende jamais en dessous du niveau de la silice (ce qui assécherait et fissurerait la colonne, ruinant la séparation)</li>
      <li><strong>Collecter des fractions</strong> régulièrement (tubes à essai numérotés), en suivant leur contenu par CCM au fur et à mesure</li>
    </ol>

    <h3>4. Suivi et regroupement des fractions</h3>
    <p>Chaque fraction collectée est analysée par <strong>CCM</strong> (chapitre 3), déposée en parallèle avec les fractions voisines : les fractions présentant une <strong>même tache unique</strong>, au même Rf, correspondant au produit recherché, sont regroupées et réunies pour l'évaporation finale du solvant (donnant le produit purifié isolé). Les fractions de « transition » (contenant encore un mélange de plusieurs composés) sont généralement écartées, ou éventuellement repurifiées séparément si le rendement l'exige.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Une chromatographie sur colonne est réalisée pour séparer deux composés A (Rf=0,55 en CCM avec l'éluant choisi) et B (Rf=0,15). Dans quel ordre ces deux composés sortiront-ils de la colonne ?</p>
      <p><strong>Solution :</strong> Un Rf élevé (0,55 pour A) traduit une faible affinité pour la phase stationnaire (silice), donc une migration rapide — sur colonne, cela se traduit par une élution <strong>plus rapide</strong>. Un Rf faible (0,15 pour B) traduit une forte rétention sur la silice, donc une élution plus lente.</p>
      <p class="example-answer">Réponse : le composé A (Rf le plus élevé) sortira en premier de la colonne, suivi ensuite du composé B (Rf le plus faible, plus retenu).</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le suivi par CCM de chaque fraction collectée transforme une opération de purification en une véritable démarche de vérification systématique, fraction par fraction. En quoi ce contrôle qualité continu, réalisé pendant la purification elle-même plutôt qu'une fois le produit final isolé, permet-il d'éviter de mélanger accidentellement des fractions encore impures avec le produit purifié recherché ?
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La chromatographie sur colonne applique le même principe que la CCM, mais en format préparatif pour isoler physiquement les composés</li>
      <li>Le choix de l'éluant se fait à partir d'essais préalables en CCM, visant typiquement un Rf entre 0,2 et 0,3 pour le composé d'intérêt</li>
      <li>Le tassement de la colonne doit être homogène, sans bulle ni fissure, et le niveau de liquide ne doit jamais descendre sous celui de la silice</li>
      <li>Les fractions collectées sont suivies par CCM ; celles au même Rf pour le produit d'intérêt sont regroupées</li>
      <li>Un composé de Rf élevé (faible affinité pour la silice) sort plus vite de la colonne qu'un composé de Rf faible</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Laisser la colonne s'assécher (niveau de liquide sous le niveau de silice), fissurant le lit et ruinant la séparation</li>
      <li>Choisir un éluant sans essai préalable en CCM, risquant une séparation inefficace ou trop lente</li>
      <li>Perturber la surface du lit de silice lors du dépôt de l'échantillon, dégradant la résolution de la séparation</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi réalise-t-on des essais préalables en CCM avant une chromatographie sur colonne ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico4e1" value="wrong">Pour gagner du temps en évitant la colonne totalement</label>
        <label class="option"><input type="radio" name="ico4e1" value="right">Pour choisir l'éluant offrant la meilleure séparation avant de se lancer dans la purification sur colonne</label>
        <label class="option"><input type="radio" name="ico4e1" value="wrong">C'est une étape purement optionnelle sans intérêt</label>
        <label class="option"><input type="radio" name="ico4e1" value="wrong">Pour remplacer complètement la colonne</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico4e1','ico4fb1','Correct — la CCM préalable identifie rapidement et à moindre coût le meilleur éluant pour la colonne.','Relis le point clé sur le rôle de la CCM dans le choix de l\\'éluant.')">Vérifier</button>
      <div class="feedback" id="ico4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Entre deux composés de Rf 0,60 et 0,20, lequel sort en premier de la colonne ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico4e2" value="right">Celui de Rf 0,60</label>
        <label class="option"><input type="radio" name="ico4e2" value="wrong">Celui de Rf 0,20</label>
        <label class="option"><input type="radio" name="ico4e2" value="wrong">Les deux sortent simultanément</label>
        <label class="option"><input type="radio" name="ico4e2" value="wrong">Impossible à déterminer sans autre information</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico4e2','ico4fb2','Correct — un Rf plus élevé traduit une plus faible affinité pour la silice, donc une élution plus rapide.','Relis l\\'exemple corrigé sur l\\'ordre d\\'élution selon le Rf.')">Vérifier</button>
      <div class="feedback" id="ico4fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>La chromatographie sur colonne manuelle, bien que toujours enseignée et pratiquée, a connu une automatisation croissante dans les laboratoires de recherche et l'industrie pharmaceutique : les systèmes de <strong>chromatographie flash automatisée</strong> couplent une pompe régulant précisément le débit d'éluant à un détecteur UV en ligne, qui identifie automatiquement la sortie de chaque composé et déclenche la collecte des fractions correspondantes dans des tubes séparés, sans intervention manuelle continue de l'opérateur. Ces systèmes permettent de traiter en parallèle plusieurs purifications, un gain de temps considérable pour les laboratoires de synthèse à haut débit.</p>
  <p><strong>Question ouverte :</strong> l'automatisation croissante de la chromatographie sur colonne rendra-t-elle un jour la maîtrise manuelle de cette technique superflue dans la formation des chimistes, ou cette compétence de base reste-t-elle indispensable pour comprendre et dépanner les systèmes automatisés modernes ?</p>
  <p><strong>Technologie émergente :</strong> la <strong>chromatographie liquide sous pression moyenne</strong> (MPLC) et les cartouches de silice pré-remplies, standardisées et jetables, remplacent de plus en plus le tassement manuel d'une colonne en verre, réduisant la variabilité expérimentale d'un opérateur à l'autre.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Essais CCM préalables (choix de l'éluant) → tassement homogène de la colonne de silice → dépôt délicat de l'échantillon en tête de colonne → élution progressive (composés de Rf élevé sortent en premier) → collecte et suivi des fractions par CCM → regroupement des fractions pures → produit isolé
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$R_f^{CCM} \\longleftrightarrow \\text{ordre d'élution sur colonne}$$
    Cette correspondance directe entre le Rf mesuré en CCM et l'ordre de sortie des composés sur colonne (Rf élevé = élution rapide, Rf faible = élution lente) est le principe qui relie les deux techniques du diptyque CCM/colonne — la CCM sert de guide rapide et peu coûteux à la purification préparative réalisée ensuite sur colonne.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'on omettait totalement les essais préalables en CCM avant de lancer une chromatographie sur colonne : quels risques concrets cela ferait-il courir à la purification ?</li>
      <li>Pourquoi une colonne mal tassée, présentant des fissures ou des bulles d'air, dégrade-t-elle la qualité de la séparation obtenue ?</li>
      <li>Quelle serait la conséquence, pour un laboratoire pharmaceutique traitant des dizaines de purifications par jour, d'une absence de systèmes de chromatographie flash automatisée ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>M. Tswett, « Physikalisch-chemische Studien über das Chlorophyll. Die Adsorptionen », Berichte der Deutschen Botanischen Gesellschaft, 1906 — la description originelle de la chromatographie sur colonne.</li>
      <li>W. C. Still, M. Kahn, A. Mitra, « Rapid Chromatographic Technique for Preparative Separations », Journal of Organic Chemistry, 1978 — l'article fondateur de la « flash chromatography » moderne.</li>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur la chromatographie sur colonne.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais préparer une colonne de silice et interpréter le suivi de ses fractions collectées par CCM. Le chapitre suivant, « Recristallisation et détermination du point de fusion », te fera découvrir une méthode de purification complémentaire, fondée cette fois sur la différence de solubilité à chaud et à froid plutôt que sur l'affinité chromatographique. Comme le rappelle l'histoire de la chromatographie, de la colonne originelle de Tswett à la CCM miniaturisée puis de retour à la colonne moderne automatisée : une même idée fondamentale peut se décliner sous des formes très différentes selon les besoins pratiques de chaque époque.</p>
  `
};
INSTCO_NOVA_KB[icoKey("Chromatographie sur colonne")] = {
  intro: "Salut, moi c'est Nova ! On étudie la chromatographie sur colonne : tassement, dépôt, suivi des fractions. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/choix.*[ée]luant|éluant.*colonne/i, replies:[
      "L'éluant se choisit à partir d'essais préalables en CCM, visant typiquement un Rf entre 0,2 et 0,3 pour le composé d'intérêt — bon compromis séparation/temps d'élution."
    ]},
    { test:/tassement|assécher|niveau.*silice/i, replies:[
      "Le tassement doit être homogène, sans bulle ni fissure. Le niveau de liquide ne doit jamais descendre sous celui de la silice, sous peine d'assécher et fissurer la colonne."
    ]},
    { test:/ordre.*[ée]lution|rf.*[ée]lution/i, replies:[
      "Un composé de Rf élevé (faible affinité pour la silice) élue plus vite qu'un composé de Rf faible (fortement retenu)."
    ]},
    { test:/fraction|regrouper.*fraction/i, replies:[
      "Chaque fraction collectée est suivie par CCM ; les fractions au même Rf pour le produit d'intérêt sont regroupées avant évaporation finale du solvant."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à l'intérêt d'un essai rapide et peu coûteux avant la colonne.",
      "Indice niveau 2 : ce n'est pas pour éviter totalement la colonne.",
      "Indice niveau 3 : c'est pour choisir le meilleur éluant avant de se lancer sur colonne."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la relation entre Rf et affinité pour la silice.",
      "Indice niveau 2 : un Rf élevé traduit une faible affinité pour la silice.",
      "Indice niveau 3 : ce composé (Rf 0,60) sort donc en premier."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
INSTCO_CHAPTERS[icoKey("Recristallisation et détermination du point de fusion")] = {
  objectives: [
    "Appliquer les principes de recristallisation aux composés organiques solides",
    "Utiliser un banc Kofler ou un appareil à point de fusion",
    "Interpréter un intervalle de fusion comme indicateur de pureté",
    "Utiliser la dépression du point de fusion pour identifier un composé inconnu",
    "Évaluer pourquoi la détermination du point de fusion, mesure d'apparence élémentaire héritée des travaux de Kofler dans les années 1930, reste aujourd'hui encore l'un des tests de pureté les plus rapides et les plus utilisés en chimie organique"
  ],
  prereqs: ["Chromatographie sur colonne"],
  bodyHtml: `
    <p>Dans les années 1930, le couple de scientifiques autrichiens Ludwig et Adelheid Kofler mit au point une plaque chauffante à gradient continu de température — le banc Kofler qui porte encore leur nom aujourd'hui — pour répondre à un besoin très concret de l'industrie pharmaceutique naissante : identifier rapidement et fiablement des principes actifs solides à partir d'une propriété simple à mesurer, leur point de fusion. Près d'un siècle plus tard, cette mesure reste l'une des plus rapides et des plus informatives dont dispose tout chimiste organicien pour évaluer, en quelques minutes seulement, la pureté d'un solide fraîchement synthétisé.</p>
    <p>Le point de fusion occupe une place particulière parmi les méthodes de caractérisation : contrairement à la spectroscopie infrarouge ou à la résonance magnétique nucléaire (cours ultérieurs), qui nécessitent un appareillage coûteux et une interprétation experte, la détermination du point de fusion ne demande qu'un appareil simple, quelques minutes de manipulation, et une lecture directement interprétable — un rapport coût-information particulièrement avantageux qui explique sa popularité persistante en laboratoire d'enseignement comme en recherche.</p>
    <p>Ce chapitre applique spécifiquement aux composés organiques la technique de recristallisation déjà présentée en chimie générale, et introduit son complément analytique indispensable : la détermination du point de fusion, l'une des mesures d'identification les plus rapides et les plus informatives en chimie organique. À la fin de ce chapitre, tu sauras interpréter un intervalle de fusion comme indicateur de pureté et utiliser la dépression du point de fusion pour confirmer l'identité d'un composé.</p>

    <h3>1. Rappel et spécificités de la recristallisation organique</h3>
    <p>Le principe et le protocole de recristallisation (chapitre 6 du cours de chimie générale) s'appliquent directement aux solides organiques. Une spécificité fréquente en chimie organique est l'utilisation d'un <strong>mélange de solvants</strong> (l'un dans lequel le produit est très soluble, l'autre dans lequel il l'est très peu) : on dissout le produit dans le premier solvant à chaud, puis on ajoute progressivement le second solvant jusqu'à apparition d'un léger trouble persistant, signe d'une solution proche de la saturation — une méthode qui offre davantage de souplesse que la recherche d'un unique solvant idéal.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Utiliser un mélange de deux solvants pour la recristallisation (l'un dissolvant bien à chaud, l'autre mal) offre davantage de souplesse que la recherche d'un solvant unique parfaitement adapté. En quoi cette approche par mélange permet-elle d'ajuster finement la solubilité du produit, alors qu'aucun solvant pur disponible ne conviendrait exactement ?
    </div>

    <h3>2. La détermination du point de fusion</h3>
    <p>Le <strong>point de fusion</strong> d'un solide organique cristallin est une propriété caractéristique, mesurée à l'aide d'un <strong>banc Kofler</strong> (plaque chauffante à gradient de température continu) ou d'un <strong>appareil à point de fusion</strong> classique (tube capillaire contenant un peu de produit, chauffé progressivement dans un bloc métallique ou un bain d'huile, avec observation visuelle du moment de fusion).</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Introduire une petite quantité de produit finement broyé dans un <strong>tube capillaire</strong> scellé à une extrémité, en tassant légèrement (par exemple en le laissant tomber dans un tube vertical)</li>
      <li>Chauffer <strong>progressivement</strong> (vitesse de montée en température lente, environ 1-2°C/min près du point de fusion attendu, pour une lecture précise) tout en observant l'échantillon</li>
      <li>Noter le début de fusion (première goutte liquide visible) et la fin de fusion (disparition complète du solide) : l'écart entre ces deux valeurs constitue l'<strong>intervalle de fusion</strong></li>
    </ul>

    <h3>3. L'intervalle de fusion, indicateur de pureté</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — un intervalle étroit signale un composé pur</span>
      Un composé organique <strong>pur</strong> fond généralement sur un <strong>intervalle étroit</strong> (souvent moins de 1-2°C), à une température précise et reproductible, caractéristique et tabulée pour de nombreux composés courants. La présence d'<strong>impuretés</strong> a un double effet caractéristique : elle <strong>abaisse</strong> le point de fusion (par rapport au produit pur) et <strong>élargit</strong> significativement l'intervalle de fusion observé — ces deux effets combinés constituent un test rapide et fiable de la pureté d'un solide organique, largement utilisé en routine.
    </div>

    <h3>4. La dépression du point de fusion : identification par mélange</h3>
    <p>Une technique classique et élégante pour <strong>confirmer l'identité</strong> d'un composé inconnu, lorsqu'un échantillon authentique de référence est disponible, consiste à mesurer le point de fusion d'un <strong>mélange</strong> intime des deux échantillons (produit inconnu et référence, en proportions comparables) :</p>
    <table class="mini-table">
      <tr><th>Résultat observé</th><th>Interprétation</th></tr>
      <tr><td>Point de fusion du mélange = point de fusion des deux composés séparés, intervalle toujours étroit</td><td>Les deux échantillons sont très probablement <strong>identiques</strong></td></tr>
      <tr><td>Point de fusion du mélange abaissé et intervalle élargi (« dépression »)</td><td>Les deux échantillons sont des composés <strong>différents</strong></td></tr>
    </table>
    <p>Ce phénomène de <strong>dépression du point de fusion</strong> par mélange de deux composés différents est un cas particulier direct de l'abaissement cryoscopique (vu en thermochimie) : tout composé étranger, même chimiquement très proche, perturbe l'arrangement cristallin régulier et abaisse le point de fusion du mélange par rapport à chaque composé pur pris séparément.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le test de dépression du point de fusion repose sur le fait que même un composé chimiquement très proche de l'échantillon inconnu, mais non identique, agit comme une « impureté » vis-à-vis de ce dernier lorsqu'on les mélange. En quoi ce test est-il donc plus rigoureux qu'une simple comparaison des points de fusion mesurés séparément sur les deux échantillons ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un étudiant obtient, pour un solide de synthèse, un point de fusion mesuré de 118-124°C, alors que la littérature indique 132-133°C pour le composé visé. Que peut-on conclure ?</p>
      <p><strong>Solution :</strong> Un intervalle de fusion large (6°C) et un point de fusion nettement plus bas que la référence de la littérature (132-133°C) suggèrent fortement que le produit obtenu contient des <strong>impuretés significatives</strong> — une recristallisation supplémentaire (ou une chromatographie, chapitres 3-4) serait nécessaire avant de pouvoir conclure sur l'identité et la pureté réelles du produit synthétisé.</p>
      <p class="example-answer">Réponse : le produit est probablement impur, et nécessite une purification supplémentaire avant caractérisation définitive.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La recristallisation organique utilise parfois un mélange de deux solvants (l'un dissolvant bien, l'autre mal) pour plus de souplesse</li>
      <li>Le point de fusion se mesure au banc Kofler ou en tube capillaire, avec une montée lente en température près de la valeur attendue</li>
      <li>Un composé pur fond sur un intervalle étroit ; les impuretés abaissent le point de fusion et élargissent l'intervalle</li>
      <li>La dépression du point de fusion par mélange avec un échantillon de référence permet de confirmer ou d'infirmer l'identité d'un composé</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Chauffer trop rapidement près du point de fusion attendu, faussant la lecture précise de l'intervalle</li>
      <li>Utiliser un produit mal broyé ou en trop grande quantité dans le capillaire, ralentissant l'observation de la fusion</li>
      <li>Conclure trop vite à une identité de composés sans avoir réalisé le test de mélange (dépression du point de fusion)</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Un intervalle de fusion large et abaissé par rapport à la littérature signale généralement :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico5e1" value="wrong">Un composé parfaitement pur</label>
        <label class="option"><input type="radio" name="ico5e1" value="right">La présence d'impuretés</label>
        <label class="option"><input type="radio" name="ico5e1" value="wrong">Une erreur d'appareillage systématique</label>
        <label class="option"><input type="radio" name="ico5e1" value="wrong">Un composé de masse molaire élevée</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico5e1','ico5fb1','Correct — abaissement et élargissement de l\\'intervalle de fusion sont les deux signatures classiques d\\'un composé impur.','Relis le point clé sur l\\'intervalle de fusion comme indicateur de pureté.')">Vérifier</button>
      <div class="feedback" id="ico5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour confirmer l'identité d'un composé inconnu avec un échantillon de référence, on peut :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico5e2" value="wrong">Comparer uniquement les points de fusion séparés des deux échantillons</label>
        <label class="option"><input type="radio" name="ico5e2" value="right">Mesurer le point de fusion d'un mélange des deux échantillons (test de dépression)</label>
        <label class="option"><input type="radio" name="ico5e2" value="wrong">Peser les deux échantillons séparément</label>
        <label class="option"><input type="radio" name="ico5e2" value="wrong">Aucune méthode par point de fusion ne le permet</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico5e2','ico5fb2','Correct — l\\'absence de dépression du point de fusion du mélange confirme l\\'identité des deux échantillons.','Relis la section sur la dépression du point de fusion par mélange.')">Vérifier</button>
      <div class="feedback" id="ico5fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>Les appareils modernes de détermination du point de fusion, héritiers directs du banc Kofler, intègrent aujourd'hui des caméras optiques et des logiciels de détection automatique de la fusion, éliminant la subjectivité de l'observation visuelle à l'œil nu et permettant une reproductibilité accrue entre opérateurs. Pour des mesures encore plus précises, notamment en recherche pharmaceutique où la caractérisation thermique fine d'un principe actif est réglementairement exigée, la <strong>calorimétrie différentielle à balayage</strong> (DSC, Differential Scanning Calorimetry) mesure directement le flux de chaleur échangé lors de la fusion, révélant des informations invisibles à l'œil nu comme la présence de plusieurs formes cristallines (polymorphisme) d'un même composé.</p>
  <p><strong>Question ouverte :</strong> la DSC, bien plus informative que le simple point de fusion visuel, remplacera-t-elle un jour totalement cette dernière méthode dans l'enseignement de la chimie organique, ou la rapidité et la simplicité du test au capillaire lui garantissent-elles une place durable comme premier réflexe de vérification ?</p>
  <p><strong>Technologie émergente :</strong> les appareils de point de fusion automatisés couplés à une caméra haute résolution permettent de détecter automatiquement, par analyse d'image, le début et la fin de fusion avec une précision et une reproductibilité supérieures à l'observation visuelle traditionnelle.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Solide organique brut → recristallisation (solvant unique ou mélange de solvants) → cristaux purifiés → détermination du point de fusion (banc Kofler ou capillaire) → intervalle étroit et conforme à la littérature = composé pur → test de dépression si besoin de confirmer l'identité
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$\\Delta T_{fusion} \\propto x_{impureté}$$
    L'abaissement du point de fusion et l'élargissement de l'intervalle de fusion sont, qualitativement, proportionnels à la quantité d'impureté présente — un principe directement apparenté à l'abaissement cryoscopique vu en thermochimie, qui fait du point de fusion un indicateur de pureté à la fois simple, rapide et quantitativement interprétable.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si deux composés chimiquement différents avaient, par pure coïncidence, exactement le même point de fusion mesuré séparément : le test de dépression du point de fusion permettrait-il malgré tout de les distinguer ?</li>
      <li>Pourquoi la vitesse de montée en température doit-elle être ralentie à l'approche du point de fusion attendu, plutôt que maintenue rapide pendant toute la mesure ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pharmaceutique, d'une absence de méthode rapide comme le point de fusion pour vérifier la pureté d'un principe actif avant des analyses plus coûteuses ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>L. Kofler, A. Kofler, <em>Thermo-Mikro-Methoden zur Kennzeichnung organischer Stoffe und Stoffgemische</em>, Wagner, 1954 — l'ouvrage de référence des méthodes thermiques Kofler.</li>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur la recristallisation et le point de fusion.</li>
      <li>G. Höhne, W. Hemminger, H.-J. Flammersheim, <em>Differential Scanning Calorimetry</em>, Springer — sur la DSC comme méthode moderne de caractérisation thermique.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais interpréter un intervalle de fusion comme indicateur de pureté et utiliser la dépression du point de fusion pour confirmer l'identité d'un composé. Le chapitre suivant, « Distillation des composés organiques : simple, fractionnée et sous vide », te fera découvrir les méthodes de purification et de caractérisation adaptées cette fois aux composés liquides, en miroir de ce que tu viens d'apprendre pour les solides. Comme le montre l'héritage du banc Kofler : une mesure simple, menée avec rigueur, reste souvent le test le plus rapide et le plus révélateur avant de recourir à des techniques plus sophistiquées.</p>
  `
};
INSTCO_NOVA_KB[icoKey("Recristallisation et détermination du point de fusion")] = {
  intro: "Salut, moi c'est Nova ! On étudie la recristallisation organique et le point de fusion comme test de pureté. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/intervalle de fusion|puret[ée].*fusion/i, replies:[
      "Un composé pur fond sur un intervalle étroit (souvent <1-2°C). Les impuretés abaissent le point de fusion et élargissent l'intervalle — un test rapide et fiable de pureté."
    ]},
    { test:/d[ée]pression.*fusion|test de m[ée]lange/i, replies:[
      "La dépression du point de fusion : si le mélange de deux échantillons fond plus bas et sur un intervalle plus large que chacun séparément, ce sont des composés différents. Sinon, ils sont probablement identiques."
    ]},
    { test:/banc kofler|tube capillaire/i, replies:[
      "Le point de fusion se mesure au banc Kofler ou en tube capillaire chauffé progressivement (~1-2°C/min près de la valeur attendue), en notant début et fin de fusion."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense aux deux signatures classiques d'un composé impur.",
      "Indice niveau 2 : abaissement ET élargissement de l'intervalle.",
      "Indice niveau 3 : c'est donc le signe d'impuretés."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au test qui exploite la dépression du point de fusion.",
      "Indice niveau 2 : ce n'est pas juste comparer les points de fusion séparés.",
      "Indice niveau 3 : c'est mesurer le point de fusion du mélange des deux échantillons."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
INSTCO_CHAPTERS[icoKey("Distillation des composés organiques : simple, fractionnée et sous vide")] = {
  objectives: [
    "Appliquer les principes de distillation simple et fractionnée aux mélanges organiques",
    "Comprendre le principe et l'intérêt de la distillation sous pression réduite",
    "Relier la relation entre pression et température d'ébullition à la distillation sous vide",
    "Choisir la méthode de distillation adaptée selon la stabilité thermique du composé",
    "Évaluer pourquoi la distillation sous pression réduite, développée à l'origine pour l'industrie pétrolière, s'est imposée comme une technique indispensable pour purifier des composés organiques thermosensibles sans les décomposer"
  ],
  prereqs: ["Distillation simple et distillation fractionnée (cours d'Instrumentations chimie générale)"],
  bodyHtml: `
    <p>Au début du XXe siècle, l'essor de l'industrie pétrolière révéla une limite fondamentale de la distillation classique : les fractions les plus lourdes du pétrole brut, comme les huiles lubrifiantes ou le bitume, se décomposaient thermiquement (« craquage ») avant même d'atteindre leur point d'ébullition sous pression atmosphérique. La solution technique adoptée par les raffineries — distiller sous pression réduite pour abaisser la température nécessaire — est devenue un procédé industriel incontournable, aujourd'hui décliné à l'échelle du laboratoire pour purifier tout composé organique thermosensible sans le détruire.</p>
    <p>Cette même contrainte se retrouve dans un secteur bien plus délicat : l'industrie de la parfumerie, où l'extraction et la purification des huiles essentielles et des molécules odorantes naturelles, souvent fragiles et facilement dénaturées par la chaleur, reposent presque systématiquement sur la distillation sous vide — un chauffage classique détruirait ou altérerait irrémédiablement les notes olfactives recherchées.</p>
    <p>Ce chapitre étend les principes de distillation déjà présentés en chimie générale à une problématique spécifiquement organique : de nombreux composés organiques sont <strong>thermosensibles</strong> et se décomposent avant même d'atteindre leur point d'ébullition sous pression atmosphérique normale — d'où l'importance de la distillation sous pression réduite. À la fin de ce chapitre, tu sauras choisir et mettre en œuvre la méthode de distillation adaptée à la stabilité thermique d'un composé organique.</p>

    <h3>1. Rappel : distillation simple et fractionnée en synthèse organique</h3>
    <p>Les montages et principes de distillation simple et fractionnée (chapitre 7 du cours de chimie générale) s'appliquent directement à la purification des produits organiques liquides obtenus en synthèse — élimination du solvant réactionnel, séparation d'un produit d'un sous-produit de volatilité proche, etc.</p>

    <h3>2. Le problème de la décomposition thermique</h3>
    <p>De nombreux composés organiques, en particulier les molécules complexes, thermosensibles, ou de masse molaire élevée, se <strong>décomposent</strong> (réactions parasites, polymérisation, oxydation) avant d'atteindre leur température d'ébullition sous pression atmosphérique normale (1 atm ≈ 1013 hPa). Une distillation classique serait alors inapplicable, détruisant le produit avant même sa purification.</p>

    <h3>3. Principe de la distillation sous pression réduite (sous vide)</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — la pression contrôle la température d'ébullition</span>
      La température d'ébullition d'un liquide correspond au point où sa pression de vapeur saturante égale la pression <strong>extérieure</strong> exercée sur lui. En <strong>diminuant</strong> la pression extérieure (à l'aide d'une pompe à vide), on <strong>abaisse</strong> mécaniquement la température d'ébullition nécessaire pour atteindre cette égalité — ce qui permet de distiller un composé thermosensible à une température suffisamment basse pour éviter sa décomposition.
    </div>
    <p>À titre d'ordre de grandeur, un abaissement de pression d'un facteur 10 (par exemple, de 760 mmHg à 76 mmHg, soit environ 0,1 bar) abaisse typiquement le point d'ébullition de plusieurs dizaines de degrés Celsius pour de nombreux liquides organiques usuels — un gain souvent suffisant pour éviter une décomposition thermique.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Abaisser la pression d'un facteur 10 suffit souvent à réduire le point d'ébullition de plusieurs dizaines de degrés. En quoi cette sensibilité de la température d'ébullition à la pression extérieure — un lien que l'on retrouve aussi en montagne, où l'eau bout à une température plus basse qu'au niveau de la mer — permet-elle d'éviter la décomposition d'un composé thermosensible sans changer sa nature chimique ?
    </div>

    <h3>4. Le montage de distillation sous vide</h3>
    <p>Le montage reprend les éléments de la distillation classique (chapitre 7, chimie générale), en y ajoutant :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Une connexion étanche à une <strong>pompe à vide</strong> (trompe à eau ou pompe mécanique, selon le niveau de vide requis)</li>
      <li>Un <strong>manomètre</strong>, pour contrôler et noter la pression réelle de travail (indispensable pour comparer le résultat à des données de référence, elles-mêmes toujours associées à une pression précise)</li>
      <li>Un <strong>capillaire d'entrée d'air</strong> (ou un dispositif équivalent), plongeant dans le liquide à distiller, qui introduit un très fin filet de bulles d'air pour <strong>éviter le bumping</strong> (les pierres ponces classiques étant souvent insuffisantes sous vide, en raison de la formation de bulles plus grosses et moins régulières)</li>
    </ul>

    <h3>5. Choisir entre distillation classique et distillation sous vide</h3>
    <table class="mini-table">
      <tr><th>Situation</th><th>Méthode recommandée</th></tr>
      <tr><td>Composé stable thermiquement, point d'ébullition raisonnable</td><td>Distillation classique (pression atmosphérique)</td></tr>
      <tr><td>Composé thermosensible, ou point d'ébullition très élevé à pression atmosphérique</td><td>Distillation sous pression réduite</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le choix entre distillation classique et distillation sous vide repose entièrement sur la stabilité thermique du composé, une information qui n'est pas toujours connue à l'avance avec certitude. Quelle stratégie prudente un chimiste pourrait-il adopter face à un nouveau composé dont la stabilité thermique reste incertaine, avant de se lancer dans une distillation classique potentiellement destructrice ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un composé organique se décompose partiellement lorsqu'on tente de le distiller sous pression atmosphérique, bien avant d'atteindre son point d'ébullition théorique de 220°C. Quelle solution proposer pour le purifier par distillation sans décomposition ?</p>
      <p><strong>Solution :</strong> Il faut réaliser une <strong>distillation sous pression réduite</strong> (sous vide), qui abaisse la température d'ébullition nécessaire en diminuant la pression extérieure — permettant de distiller le composé à une température suffisamment basse pour rester en deçà de son seuil de décomposition thermique.</p>
      <p class="example-answer">Réponse : la distillation sous vide, en abaissant le point d'ébullition, permet de purifier le composé sans atteindre sa température de décomposition.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>De nombreux composés organiques se décomposent avant d'atteindre leur point d'ébullition à pression atmosphérique normale</li>
      <li>Diminuer la pression extérieure abaisse la température d'ébullition nécessaire, permettant de distiller sans décomposition</li>
      <li>Le montage sous vide ajoute une pompe à vide, un manomètre, et un capillaire d'entrée d'air pour éviter le bumping</li>
      <li>Le choix entre distillation classique et sous vide dépend de la stabilité thermique du composé et de son point d'ébullition</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Utiliser des pierres ponces classiques (peu efficaces sous vide) au lieu d'un capillaire d'entrée d'air pour éviter le bumping</li>
      <li>Oublier de noter la pression de travail, rendant la température d'ébullition mesurée incomparable à des données de référence</li>
      <li>Tenter une distillation classique sur un composé connu pour se décomposer thermiquement, au lieu de recourir directement au vide</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Diminuer la pression extérieure a pour effet de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico6e1" value="wrong">Augmenter la température d'ébullition</label>
        <label class="option"><input type="radio" name="ico6e1" value="right">Abaisser la température d'ébullition</label>
        <label class="option"><input type="radio" name="ico6e1" value="wrong">N'avoir aucun effet sur la température d'ébullition</label>
        <label class="option"><input type="radio" name="ico6e1" value="wrong">Empêcher toute distillation</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico6e1','ico6fb1','Correct — c\\'est ce principe qui permet de distiller des composés thermosensibles à plus basse température.','Relis le point clé sur la relation entre pression et température d\\'ébullition.')">Vérifier</button>
      <div class="feedback" id="ico6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour éviter le bumping en distillation sous vide, on utilise plutôt :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico6e2" value="wrong">Des pierres ponces classiques uniquement</label>
        <label class="option"><input type="radio" name="ico6e2" value="right">Un capillaire d'entrée d'air introduisant un fin filet de bulles</label>
        <label class="option"><input type="radio" name="ico6e2" value="wrong">Une agitation vigoureuse au fouet</label>
        <label class="option"><input type="radio" name="ico6e2" value="wrong">Aucune précaution n'est nécessaire sous vide</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico6e2','ico6fb2','Correct — le capillaire d\\'entrée d\\'air est plus efficace que les pierres ponces classiques dans ces conditions de vide.','Relis la section sur le montage de distillation sous vide.')">Vérifier</button>
      <div class="feedback" id="ico6fb2"></div>
    </div>
  </div>

  <h3>6. Frontière de la recherche</h3>
  <p>Pour les composés organiques les plus thermosensibles, la distillation sous vide classique reste parfois insuffisante : le temps de séjour du liquide à haute température, même réduit, peut suffire à provoquer une décomposition partielle. La <strong>distillation moléculaire</strong> (ou distillation à trajet court), utilisée industriellement pour purifier des substances aussi fragiles que les vitamines liposolubles ou les acides gras oméga-3 issus d'huiles de poisson, pousse ce principe à l'extrême : sous un vide poussé et avec une distance minimale entre la surface d'évaporation et la surface de condensation, le temps d'exposition à la chaleur est réduit à quelques fractions de seconde, préservant l'intégrité de molécules qu'une distillation sous vide classique détruirait encore.</p>
  <p><strong>Question ouverte :</strong> existe-t-il une limite fondamentale à la fragilité thermique d'une molécule au-delà de laquelle aucune méthode de distillation, même la plus douce, ne permettrait plus de la purifier sans dégradation significative ?</p>
  <p><strong>Technologie émergente :</strong> l'appareil de <strong>Kugelrohr</strong> (distillation « boule à boule » sous vide), qui combine un four à air chaud tournant et un vide poussé, permet de distiller de petites quantités de produits très thermosensibles avec un contrôle particulièrement fin, largement utilisé en recherche académique pour les échantillons de faible masse.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Composé organique thermosensible → distillation classique impossible (décomposition avant ébullition) → diminution de la pression extérieure (pompe à vide) → abaissement de la température d'ébullition nécessaire → distillation réalisable en deçà du seuil de décomposition → produit purifié intact
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$T_{ébullition} = f(P_{extérieure}) \\quad \\text{(relation croissante, équation de Clausius-Clapeyron)}$$
    Cette dépendance entre température d'ébullition et pression extérieure, décrite quantitativement par l'équation de Clausius-Clapeyron, est le principe physique unique qui rend possible toute distillation sous pression réduite — diminuer la pression abaisse mécaniquement la température nécessaire pour atteindre l'égalité entre pression de vapeur saturante et pression extérieure.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'on ne disposait d'aucune pompe à vide en laboratoire : quelles alternatives, même imparfaites, pourrait-on envisager pour purifier un composé légèrement thermosensible ?</li>
      <li>Pourquoi est-il indispensable de noter précisément la pression de travail lors d'une distillation sous vide, et pas seulement la température observée ?</li>
      <li>Quelle serait la conséquence, pour l'industrie pharmaceutique ou la parfumerie, d'une absence de méthode de distillation sous vide pour purifier leurs molécules les plus fragiles ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur la distillation sous vide en chimie organique.</li>
      <li>B. E. Poling, J. M. Prausnitz, J. P. O'Connell, <em>The Properties of Gases and Liquids</em>, McGraw-Hill — sur la relation de Clausius-Clapeyron et l'équilibre liquide-vapeur.</li>
      <li>E. S. Perry, <em>Progress in Distillation: Molecular Distillation</em>, Interscience — référence historique sur la distillation moléculaire industrielle.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir et mettre en œuvre la méthode de distillation adaptée à la stabilité thermique d'un composé organique. Le chapitre suivant, « Séchage et purification des produits organiques », te fera découvrir l'étape complémentaire indispensable avant toute distillation ou caractérisation finale : l'élimination des dernières traces d'eau résiduelle. Comme le rappelle l'histoire de la distillation sous vide, de l'industrie pétrolière à la parfumerie : une même contrainte physique — éviter la décomposition thermique — peut trouver des solutions techniques communes dans des domaines industriels en apparence très éloignés.</p>
  `
};
INSTCO_NOVA_KB[icoKey("Distillation des composés organiques : simple, fractionnée et sous vide")] = {
  intro: "Salut, moi c'est Nova ! On étudie la distillation sous vide pour les composés thermosensibles. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/pression.*temp[ée]rature d.[ée]bullition|distillation sous vide/i, replies:[
      "Diminuer la pression extérieure abaisse la température d'ébullition nécessaire (la pression de vapeur saturante doit égaler la pression extérieure) — c'est le principe de la distillation sous vide."
    ]},
    { test:/capillaire.*air|bumping.*vide/i, replies:[
      "Sous vide, on utilise un capillaire d'entrée d'air (fin filet de bulles) plutôt que des pierres ponces classiques, moins efficaces dans ces conditions, pour éviter le bumping."
    ]},
    { test:/d[ée]composition thermique/i, replies:[
      "De nombreux composés organiques se décomposent avant d'atteindre leur point d'ébullition à pression atmosphérique — la distillation sous vide permet de les purifier à plus basse température."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à l'égalité pression de vapeur = pression extérieure à l'ébullition.",
      "Indice niveau 2 : diminuer la pression extérieure facilite cette égalité à plus basse température.",
      "Indice niveau 3 : cela abaisse donc la température d'ébullition."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au dispositif spécifique au montage sous vide.",
      "Indice niveau 2 : ce n'est pas les pierres ponces classiques.",
      "Indice niveau 3 : c'est le capillaire d'entrée d'air."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
INSTCO_CHAPTERS[icoKey("Séchage et purification des produits organiques")] = {
  objectives: [
    "Choisir un agent desséchant adapté pour éliminer les traces d'eau d'une phase organique",
    "Décrire le protocole d'utilisation d'un agent desséchant",
    "Comprendre le principe de l'évaporation sous pression réduite (évaporateur rotatif)",
    "Identifier les critères de choix entre différentes techniques de purification finale",
    "Évaluer pourquoi le séchage et l'évaporation du solvant, étapes en apparence secondaires par rapport à la réaction chimique elle-même, conditionnent en réalité la fiabilité de toute caractérisation ultérieure du produit"
  ],
  prereqs: ["Extraction liquide-liquide et ampoule à décanter"],
  bodyHtml: `
    <p>En 1957, l'entreprise suisse Büchi commercialisa le premier évaporateur rotatif, un appareil qui allait rapidement devenir, avec l'ampoule à décanter et le montage à reflux, l'un des piliers incontournables de tout laboratoire de chimie organique. Avant son invention, l'élimination d'un solvant se faisait par simple distillation ou évaporation à l'air libre, des méthodes lentes et peu adaptées aux produits thermosensibles — le rotavap, en combinant rotation, chauffage doux et vide, a considérablement accéléré et sécurisé cette étape autrefois fastidieuse.</p>
    <p>Le séchage et l'évaporation du solvant peuvent sembler des étapes secondaires, de simples formalités entre la synthèse proprement dite et la caractérisation finale du produit. Elles sont pourtant décisives : un séchage insuffisant fausse toute mesure ultérieure (masse, point de fusion, spectres), tandis qu'un séchage excessif ou mal maîtrisé peut faire perdre une partie du produit recherché — la rigueur méthodique compte ici autant que dans les étapes plus spectaculaires du protocole.</p>
    <p>Après extraction (chapitre 2), la phase organique récupérée contient presque toujours des traces d'eau dissoute, qu'il faut éliminer avant toute étape ultérieure d'analyse ou de purification finale — le séchage est une étape de routine, simple mais indispensable, de toute synthèse organique. À la fin de ce chapitre, tu sauras choisir et utiliser correctement un agent desséchant, et choisir la technique de purification finale la mieux adaptée à ton produit.</p>

    <h3>1. Les agents desséchants</h3>
    <p>Un <strong>agent desséchant</strong> (ou agent asséchant) est un solide inorganique <strong>hygroscopique</strong>, capable de fixer l'eau résiduelle dissoute dans un solvant organique par formation d'hydrates cristallins ou par simple adsorption physique. Les agents les plus courants en laboratoire :</p>
    <table class="mini-table">
      <tr><th>Agent desséchant</th><th>Capacité</th><th>Vitesse</th><th>Usage typique</th></tr>
      <tr><td>Sulfate de magnésium anhydre MgSO₄</td><td>Élevée</td><td>Rapide</td><td>Usage général, le plus courant</td></tr>
      <tr><td>Sulfate de sodium anhydre Na₂SO₄</td><td>Élevée</td><td>Lente</td><td>Séchage de grands volumes, moins pressé</td></tr>
      <tr><td>Chlorure de calcium anhydre CaCl₂</td><td>Élevée</td><td>Rapide</td><td>Solvants non polaires uniquement (réagit avec certains composés fonctionnalisés)</td></tr>
      <tr><td>Tamis moléculaires</td><td>Très élevée</td><td>Lente</td><td>Séchage poussé, applications exigeantes</td></tr>
    </table>

    <h3>2. Protocole d'utilisation</h3>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>Ajouter une <strong>petite quantité</strong> d'agent desséchant anhydre à la phase organique, dans un erlenmeyer</li>
      <li><strong>Agiter</strong> quelques minutes (manuellement ou à l'agitateur magnétique) pour permettre à l'agent de fixer l'eau résiduelle</li>
      <li>Observer l'aspect de l'agent desséchant : s'il forme des <strong>agglomérats collés</strong> au fond (signe qu'il a fixé beaucoup d'eau, saturant sa capacité), ajouter une nouvelle petite quantité de desséchant frais et poursuivre l'agitation, jusqu'à obtention d'une poudre qui reste <strong>libre et mobile</strong> dans le liquide</li>
      <li><strong>Filtrer</strong> (filtration simple, cours de chimie générale) pour séparer l'agent desséchant (désormais hydraté) de la solution organique séchée</li>
      <li>Rincer le solide filtré avec un peu de solvant frais, pour ne perdre aucune trace du produit</li>
    </ol>
    <div class="key-point">
      <span class="eyebrow">Point clé — un dosage raisonnable, ni trop peu ni trop</span>
      Une quantité <strong>insuffisante</strong> d'agent desséchant laisse des traces d'eau résiduelles dans la solution ; une quantité <strong>excessive</strong> peut au contraire adsorber une partie du produit d'intérêt à sa surface, diminuant le rendement final. On ajoute donc l'agent desséchant progressivement, par petites quantités successives, en s'arrêtant dès l'obtention d'une poudre libre et non agglomérée.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un excès d'agent desséchant peut adsorber une partie du produit recherché à sa surface, tout comme un défaut d'agent desséchant laisse de l'eau résiduelle dans la solution. En quoi cette recherche d'un juste milieu — ni trop, ni trop peu — reflète-t-elle une exigence de rigueur méthodique que l'on retrouve dans de nombreuses autres étapes de ce cours (dosage d'un titrant, ajout d'un réactif en excès contrôlé) ?
    </div>

    <h3>3. L'évaporation sous pression réduite : l'évaporateur rotatif</h3>
    <p>Une fois la solution organique séchée et filtrée, il faut généralement éliminer le solvant pour isoler le produit solide ou liquide concentré. L'<strong>évaporateur rotatif</strong> (« rotavap ») est l'appareil de choix pour cette opération quotidienne en laboratoire de synthèse : il combine <strong>rotation</strong> du ballon contenant la solution (augmentant la surface d'évaporation), <strong>chauffage doux</strong> (bain-marie tempéré), et surtout <strong>pression réduite</strong> (pompe à vide), ce qui permet d'évaporer rapidement le solvant à une température bien plus basse que son point d'ébullition normal — préservant ainsi les produits thermosensibles, exactement selon le même principe que la distillation sous vide (chapitre 6).</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'évaporateur rotatif applique, pour éliminer un solvant, exactement le même principe physique que la distillation sous vide du chapitre précédent (abaissement de la température d'ébullition par diminution de la pression). En quoi cette réutilisation d'un même principe physique, dans deux contextes expérimentaux différents, illustre-t-elle une caractéristique importante de la chimie organique pratique ?
    </div>

    <h3>4. Choisir la bonne technique de purification finale</h3>
    <p>Le choix entre les différentes techniques de purification présentées dans ce cours (recristallisation, distillation, chromatographie sur colonne) dépend fondamentalement de l'<strong>état physique</strong> du produit et de la nature du mélange à séparer :</p>
    <table class="mini-table">
      <tr><th>Situation</th><th>Technique généralement privilégiée</th></tr>
      <tr><td>Produit solide cristallisable, impuretés en faible quantité</td><td>Recristallisation (chapitre 5)</td></tr>
      <tr><td>Produit liquide, mélange de composés de volatilités différentes</td><td>Distillation, simple ou sous vide selon la thermosensibilité (chapitre 6)</td></tr>
      <tr><td>Mélange complexe, composés non séparables par les méthodes précédentes</td><td>Chromatographie sur colonne (chapitre 4)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Après extraction d'un produit organique dans du dichlorométhane, un étudiant ajoute du sulfate de magnésium anhydre et observe que la poudre reste agglomérée au fond, même après agitation. Que doit-il faire ?</p>
      <p><strong>Solution :</strong> L'agglomération de la poudre signale que l'agent desséchant a atteint (ou dépassé) sa capacité de fixation d'eau : il faut ajouter une <strong>nouvelle petite quantité</strong> de MgSO₄ frais, agiter à nouveau, et répéter cette opération jusqu'à obtenir une poudre qui reste <strong>libre et mobile</strong> dans la solution, signe que toute l'eau résiduelle a bien été fixée.</p>
      <p class="example-answer">Réponse : ajouter du desséchant frais par petites quantités successives, jusqu'à obtention d'une poudre non agglomérée.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Un agent desséchant (MgSO₄, Na₂SO₄, CaCl₂, tamis moléculaires) fixe l'eau résiduelle d'une phase organique par hydratation ou adsorption</li>
      <li>On ajoute l'agent progressivement jusqu'à obtenir une poudre libre et mobile (pas agglomérée), puis on filtre</li>
      <li>L'évaporateur rotatif combine rotation, chauffage doux et pression réduite pour éliminer rapidement le solvant à basse température</li>
      <li>Le choix de purification finale (recristallisation, distillation, chromatographie) dépend de l'état physique du produit et de la nature du mélange</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Ajouter d'emblée un excès important d'agent desséchant, risquant d'adsorber une partie du produit d'intérêt</li>
      <li>Oublier de rincer le solide desséchant filtré, perdant ainsi une fraction du produit qui y était retenu</li>
      <li>Utiliser du CaCl₂ pour sécher un solvant contenant des composés fonctionnalisés susceptibles de réagir avec lui</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Comment sait-on qu'on a ajouté suffisamment d'agent desséchant à une phase organique ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico7e1" value="wrong">Quand la solution change de couleur</label>
        <label class="option"><input type="radio" name="ico7e1" value="right">Quand la poudre reste libre et mobile, sans former d'agglomérats</label>
        <label class="option"><input type="radio" name="ico7e1" value="wrong">Après exactement 10 minutes d'agitation, quel que soit l'aspect</label>
        <label class="option"><input type="radio" name="ico7e1" value="wrong">Quand toute la phase organique s'évapore</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico7e1','ico7fb1','Correct — une poudre libre et mobile signale que l\\'agent desséchant a bien fixé l\\'eau résiduelle sans être saturé.','Relis le point clé sur le dosage raisonnable de l\\'agent desséchant.')">Vérifier</button>
      <div class="feedback" id="ico7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">L'évaporateur rotatif permet d'éliminer un solvant à basse température grâce à :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico7e2" value="wrong">Un chauffage très intense uniquement</label>
        <label class="option"><input type="radio" name="ico7e2" value="right">La combinaison de rotation, chauffage doux et pression réduite</label>
        <label class="option"><input type="radio" name="ico7e2" value="wrong">L'ajout d'un agent desséchant dans le ballon</label>
        <label class="option"><input type="radio" name="ico7e2" value="wrong">Une agitation magnétique vigoureuse</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico7e2','ico7fb2','Correct — c\\'est cette combinaison, notamment la pression réduite, qui abaisse la température d\\'ébullition nécessaire.','Relis la description du principe de l\\'évaporateur rotatif.')">Vérifier</button>
      <div class="feedback" id="ico7fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>L'évaporation du solvant à l'évaporateur rotatif, réalisée quotidiennement dans chaque laboratoire de chimie organique, soulève aujourd'hui un enjeu de durabilité largement pris en compte par la chimie verte : les solvants organiques récupérés par condensation dans le rotavap, plutôt que d'être jetés comme déchets, peuvent être <strong>redistillés et réutilisés</strong>, réduisant à la fois le coût et l'empreinte environnementale d'un laboratoire de synthèse. À plus grande échelle industrielle, des systèmes de <strong>récupération de solvants en circuit fermé</strong>, bien plus sophistiqués que le simple rotavap de laboratoire, permettent de recycler l'essentiel des solvants utilisés dans un procédé de fabrication chimique.</p>
  <p><strong>Question ouverte :</strong> peut-on concevoir des procédés de séchage et d'évaporation qui n'exigent plus aucun agent desséchant solide à filtrer et à jeter, par exemple par des membranes sélectives ne laissant passer que l'eau, réduisant ainsi les déchets solides générés par chaque synthèse organique ?</p>
  <p><strong>Technologie émergente :</strong> les <strong>membranes de pervaporation</strong>, sélectivement perméables à l'eau mais pas aux solvants organiques, sont étudiées comme alternative aux agents desséchants solides classiques pour certains procédés industriels de séchage de solvants, avec un potentiel de réduction significative des déchets solides générés.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Phase organique extraite (contenant des traces d'eau) → ajout progressif d'agent desséchant jusqu'à poudre libre et mobile → filtration et rinçage → évaporation du solvant à l'évaporateur rotatif (rotation + chauffage doux + vide) → produit concentré → choix de la purification finale (recristallisation, distillation ou chromatographie) selon sa nature
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$m_{desséchant}^{optimal} : \\text{ni excès (adsorption du produit), ni défaut (eau résiduelle)}$$
    Ce principe d'optimum, bien plus qu'une simple formule numérique, résume l'exigence méthodologique centrale de ce chapitre : chaque étape de purification (séchage, évaporation, choix de la technique finale) doit être dosée avec précision, un défaut comme un excès dégradant également la qualité du produit final obtenu.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'on omettait totalement le séchage avant l'évaporation du solvant : quelles conséquences cela aurait-il sur la masse et la pureté apparentes du produit final isolé ?</li>
      <li>Pourquoi le choix entre recristallisation, distillation et chromatographie dépend-il autant de l'état physique du produit que de la nature exacte du mélange à séparer ?</li>
      <li>Quelle serait la conséquence, pour un laboratoire de synthèse à haut débit, d'une absence totale de recyclage des solvants récupérés par évaporation rotative ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur le séchage et l'évaporation en chimie organique.</li>
      <li>L. C. Craig, principe précurseur de l'évaporateur rotatif, popularisé industriellement par Büchi à partir de 1957.</li>
      <li>P. T. Anastas, J. C. Warner, <em>Green Chemistry: Theory and Practice</em>, Oxford University Press — sur la récupération et le recyclage des solvants en chimie verte.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais choisir et utiliser correctement un agent desséchant, et choisir la technique de purification finale la mieux adaptée à ton produit. Le dernier chapitre de ce cours, « Caractérisation par spectroscopie infrarouge au laboratoire », te fera passer de la purification à l'identification structurale, en donnant enfin une voix moléculaire au produit que tu as si soigneusement isolé. Comme le rappelle l'histoire de l'évaporateur rotatif : les étapes les plus routinières d'un protocole sont souvent celles qui, une fois bien maîtrisées, libèrent le plus de temps et de fiabilité pour le reste de la démarche scientifique.</p>
  `
};
INSTCO_NOVA_KB[icoKey("Séchage et purification des produits organiques")] = {
  intro: "Salut, moi c'est Nova ! On étudie le séchage des phases organiques et l'évaporateur rotatif. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/agent dess[ée]chant|mgso4|séchage/i, replies:[
      "MgSO₄ (rapide, usage général), Na₂SO₄ (lent, grands volumes), CaCl₂ (rapide, solvants non polaires), tamis moléculaires (séchage poussé). On ajoute progressivement jusqu'à obtenir une poudre libre et mobile."
    ]},
    { test:/[ée]vaporateur rotatif|rotavap/i, replies:[
      "L'évaporateur rotatif combine rotation, chauffage doux et pression réduite pour évaporer le solvant à basse température — préservant les produits thermosensibles."
    ]},
    { test:/choix.*purification|recristallisation.*distillation.*chromatographie/i, replies:[
      "Le choix dépend de l'état physique et du mélange : recristallisation pour un solide cristallisable, distillation pour un liquide, chromatographie pour un mélange complexe non séparable autrement."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à l'aspect visuel de l'agent desséchant qui signale sa saturation.",
      "Indice niveau 2 : ce n'est pas une question de temps fixe ni de couleur.",
      "Indice niveau 3 : c'est quand la poudre reste libre et mobile, sans agglomérat."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense aux trois éléments combinés de l'évaporateur rotatif.",
      "Indice niveau 2 : ce n'est pas juste un chauffage intense.",
      "Indice niveau 3 : c'est la combinaison rotation + chauffage doux + pression réduite."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
INSTCO_CHAPTERS[icoKey("Caractérisation par spectroscopie infrarouge au laboratoire")] = {
  objectives: [
    "Décrire le principe de mesure d'un spectre infrarouge en laboratoire (méthode ATR)",
    "Identifier les bandes d'absorption caractéristiques des principaux groupes fonctionnels",
    "Utiliser un spectre IR pour confirmer la présence ou l'absence d'un groupe fonctionnel",
    "Combiner la spectroscopie IR avec les autres techniques du cours pour une caractérisation complète",
    "Évaluer en quoi la spectroscopie infrarouge, née d'une découverte astronomique fortuite de Herschel en 1800, est devenue l'un des outils de caractérisation structurale les plus rapides et les plus universels de la chimie moderne"
  ],
  prereqs: ["Recristallisation et détermination du point de fusion", "Distillation des composés organiques : simple, fractionnée et sous vide"],
  bodyHtml: `
    <p>En 1800, l'astronome britannique William Herschel découvrit l'existence d'un rayonnement invisible au-delà du rouge, en mesurant la température au-delà de la partie visible du spectre solaire décomposé par un prisme — une région qu'il baptisa initialement « rayons calorifiques », et que l'on nomme aujourd'hui infrarouge. Plus d'un siècle allait s'écouler avant que les chimistes ne découvrent que ce rayonnement invisible, en excitant les vibrations des liaisons chimiques des molécules, pouvait devenir un outil d'identification structurale d'une puissance remarquable.</p>
    <p>Aujourd'hui, la spectroscopie infrarouge a largement dépassé les laboratoires de chimie organique : elle est utilisée en astronomie pour étudier la composition chimique d'atmosphères planétaires ou de nuages interstellaires, en criminalistique pour analyser des traces de peinture ou de fibres sur une scène de crime, et en contrôle qualité industriel pour vérifier en quelques secondes la conformité d'un lot de production — un même principe physique, la vibration des liaisons chimiques, décliné dans des contextes extraordinairement variés.</p>
    <p>Ce dernier chapitre introduit la spectroscopie infrarouge (IR) sous son aspect pratique de laboratoire — la technique de caractérisation structurale la plus rapide et la plus systématiquement utilisée pour vérifier la présence de groupes fonctionnels après une synthèse organique, complétant les techniques de purification et de contrôle de pureté vues dans ce cours. À la fin de ce chapitre, tu sauras enregistrer et interpréter un spectre IR simple pour confirmer ou exclure la présence d'un groupe fonctionnel.</p>

    <h3>1. Principe de la mesure : la méthode ATR</h3>
    <p>Les spectromètres IR modernes de laboratoire utilisent presque systématiquement la méthode <strong>ATR</strong> (réflexion totale atténuée, <em>Attenuated Total Reflectance</em>), qui a largement simplifié la pratique de la spectroscopie IR par rapport aux anciennes méthodes (pastille de KBr, film liquide entre plaques de sel) :</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'avantage pratique décisif de l'ATR</span>
      La méthode ATR permet de déposer directement un échantillon <strong>solide ou liquide, brut, sans aucune préparation préalable</strong> (pas de broyage avec du KBr, pas de dissolution) sur un petit cristal optique (généralement en diamant ou en séléniure de zinc), en appuyant fermement à l'aide d'une presse intégrée à l'appareil. Cette simplicité extrême en fait la méthode de choix pour un contrôle rapide et routinier après chaque étape de synthèse — quelques secondes suffisent pour obtenir un spectre exploitable.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La méthode ATR a rendu la spectroscopie IR accessible en quelques secondes, sans préparation d'échantillon, là où les anciennes méthodes (pastille de KBr) exigeaient un broyage minutieux et un temps de préparation bien plus long. En quoi cette simplification technique, en apparence purement pratique, a-t-elle pu transformer l'IR d'un outil d'analyse ponctuelle en un réflexe de contrôle quasi systématique après chaque étape de synthèse ?
    </div>

    <h3>2. Lecture d'un spectre IR : les bandes caractéristiques</h3>
    <p>Un spectre IR représente la transmittance (ou l'absorbance) en fonction du <strong>nombre d'onde</strong> (exprimé en cm⁻¹, décroissant de gauche à droite par convention). Certaines bandes, dites <strong>bandes de groupe caractéristiques</strong>, apparaissent systématiquement dans une plage étroite de nombre d'onde, quel que soit le reste de la molécule, ce qui permet de les utiliser comme signature directe d'un groupe fonctionnel :</p>
    <table class="mini-table">
      <tr><th>Groupe fonctionnel</th><th>Bande caractéristique</th><th>Position (cm⁻¹)</th></tr>
      <tr><td>O–H (alcool, large)</td><td>Élongation O–H</td><td>3200-3550 (bande large)</td></tr>
      <tr><td>O–H (acide carboxylique, très large)</td><td>Élongation O–H</td><td>2500-3300 (bande très large et intense)</td></tr>
      <tr><td>N–H (amine)</td><td>Élongation N–H</td><td>3300-3500 (bande(s) plus fine(s) que O-H)</td></tr>
      <tr><td>C–H (alcane)</td><td>Élongation C–H</td><td>2850-2960</td></tr>
      <tr><td>C=O (carbonyle : cétone, aldéhyde, acide, ester)</td><td>Élongation C=O</td><td>1650-1750 (bande fine, très intense)</td></tr>
      <tr><td>C=C (alcène)</td><td>Élongation C=C</td><td>1620-1680 (souvent faible intensité)</td></tr>
      <tr><td>C≡C, C≡N (alcyne, nitrile)</td><td>Élongation triple liaison</td><td>2100-2260</td></tr>
    </table>

    <h3>3. Interpréter un spectre : identifier ou exclure un groupe fonctionnel</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'IR confirme surtout la présence ou l'absence, rarement la structure complète</span>
      La spectroscopie IR de routine est particulièrement efficace pour <strong>confirmer</strong> la présence attendue d'un groupe fonctionnel (par exemple, vérifier qu'une bande C=O forte apparaît bien après une oxydation d'alcool en cétone), ou au contraire pour <strong>exclure</strong> la persistance d'un groupe qui aurait dû disparaître (par exemple, vérifier la disparition de la bande O–H large après une estérification complète). Elle ne permet en revanche pas, à elle seule, de déterminer la structure complète d'une molécule complexe — pour cela, il faut la combiner à d'autres techniques (RMN, spectrométrie de masse), développées dans les cours ultérieurs de spectroscopie organique.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le fait que la spectroscopie IR confirme ou exclue un groupe fonctionnel, sans révéler la structure complète d'une molécule, peut sembler une limite. En quoi cette limite constitue-t-elle pourtant un atout pour un contrôle rapide après chaque étape de synthèse, comparée à une technique plus complète mais plus lente et plus coûteuse comme la RMN ?
    </div>

    <h3>4. La spectroscopie IR dans une démarche complète de caractérisation</h3>
    <p>Ce chapitre clôt ainsi la chaîne complète des techniques pratiques de ce cours : après <strong>synthèse</strong> (montage à reflux, chapitre 1), <strong>extraction</strong> (chapitre 2) et <strong>séchage</strong> (chapitre 7), le produit est purifié par <strong>recristallisation</strong>, <strong>distillation</strong> ou <strong>chromatographie</strong> (chapitres 4-6), sa pureté est contrôlée par <strong>CCM</strong> (chapitre 3) et <strong>point de fusion</strong> (chapitre 5), et enfin sa structure est confirmée par <strong>spectroscopie IR</strong> — l'ensemble de cette démarche méthodique constitue le socle pratique indispensable de toute synthèse organique rigoureuse, prolongé et approfondi dans les cours ultérieurs de spectroscopie organique et de synthèse.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Après une réaction d'estérification d'un acide carboxylique par un alcool, quelle évolution du spectre IR permettrait de confirmer que la réaction a bien eu lieu ?</p>
      <p><strong>Solution :</strong> On s'attend à observer la <strong>disparition</strong> (ou la forte atténuation) de la bande O–H très large et intense caractéristique de l'acide carboxylique (2500-3300 cm⁻¹), tandis que la bande C=O, présente à la fois dans l'acide de départ et l'ester formé, subsiste (avec un léger déplacement de position possible entre les deux fonctions).</p>
      <p class="example-answer">Réponse : la disparition de la large bande O–H de l'acide carboxylique est le signe spectroscopique le plus direct de la conversion en ester.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La méthode ATR permet une mesure IR rapide, sans préparation préalable de l'échantillon (solide ou liquide brut)</li>
      <li>Les bandes de groupe caractéristiques (O-H, N-H, C=O, C=C, C≡C/C≡N...) apparaissent dans des plages de nombre d'onde spécifiques, quel que soit le reste de la molécule</li>
      <li>L'IR de routine confirme surtout la présence ou l'absence attendue d'un groupe fonctionnel, plutôt que la structure complète</li>
      <li>Ce chapitre clôt la chaîne complète : synthèse, extraction, séchage, purification, contrôle de pureté (CCM, point de fusion), caractérisation (IR)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Chercher à déterminer la structure complète d'une molécule inconnue à partir du seul spectre IR</li>
      <li>Confondre la bande O-H large de l'alcool et celle, encore plus large et plus décalée, de l'acide carboxylique</li>
      <li>Négliger le nettoyage soigneux du cristal ATR entre deux échantillons, risquant une contamination croisée</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est l'avantage principal de la méthode ATR pour une mesure IR de routine ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico8e1" value="wrong">Elle donne des spectres plus précis que toute autre méthode</label>
        <label class="option"><input type="radio" name="ico8e1" value="right">Elle ne nécessite aucune préparation préalable de l'échantillon</label>
        <label class="option"><input type="radio" name="ico8e1" value="wrong">Elle fonctionne uniquement sur les gaz</label>
        <label class="option"><input type="radio" name="ico8e1" value="wrong">Elle remplace totalement la RMN</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico8e1','ico8fb1','Correct — c\\'est la simplicité de dépôt direct, sans préparation, qui rend l\\'ATR si pratique en routine.','Relis le point clé sur l\\'avantage pratique de la méthode ATR.')">Vérifier</button>
      <div class="feedback" id="ico8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Une bande fine et très intense vers 1700 cm⁻¹ est caractéristique de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="ico8e2" value="wrong">Une liaison O-H d'alcool</label>
        <label class="option"><input type="radio" name="ico8e2" value="right">Une liaison C=O (carbonyle)</label>
        <label class="option"><input type="radio" name="ico8e2" value="wrong">Une liaison C-H d'alcane</label>
        <label class="option"><input type="radio" name="ico8e2" value="wrong">Une liaison C≡N (nitrile)</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('ico8e2','ico8fb2','Correct — la bande C=O, fine et très intense, apparaît typiquement entre 1650 et 1750 cm⁻¹.','Relis le tableau des bandes caractéristiques.')">Vérifier</button>
      <div class="feedback" id="ico8fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>Le télescope spatial James Webb, lancé en 2021, exploite la spectroscopie infrarouge à une échelle qu'Herschel n'aurait jamais pu imaginer : en analysant le rayonnement infrarouge traversant l'atmosphère d'exoplanètes lointaines lors de leur passage devant leur étoile, il permet d'identifier à distance la composition chimique de ces atmosphères — vapeur d'eau, dioxyde de carbone, méthane — grâce au même principe physique de vibration des liaisons chimiques que celui que tu viens d'utiliser sur ton propre échantillon en laboratoire. Sur Terre, des <strong>spectromètres IR portables</strong>, de la taille d'un smartphone, permettent aujourd'hui d'analyser instantanément la composition d'un matériau sur le terrain, sans passage par un laboratoire — pour le tri des plastiques recyclables, le contrôle qualité alimentaire ou l'authentification de médicaments.</p>
  <p><strong>Question ouverte :</strong> jusqu'où la miniaturisation des spectromètres IR portables pourra-t-elle aller, et pourrait-elle un jour rendre cette technologie aussi courante et accessible au grand public qu'un appareil photo de smartphone ?</p>
  <p><strong>Technologie émergente :</strong> les spectromètres IR miniaturisés intégrés à certains objets connectés commencent à permettre une analyse chimique de base directement par le grand public, par exemple pour vérifier la fraîcheur d'un aliment ou la composition d'un tissu.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Échantillon brut déposé sur le cristal ATR → rayonnement infrarouge traversant l'échantillon → absorption sélective aux fréquences de vibration des liaisons chimiques → spectre de transmittance en fonction du nombre d'onde → comparaison aux bandes caractéristiques → confirmation ou exclusion d'un groupe fonctionnel
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$\\tilde{\\nu} = \\dfrac{1}{\\lambda}$$
    Le nombre d'onde $\\tilde{\\nu}$, exprimé en cm⁻¹ et directement lié à l'énergie du rayonnement absorbé, est la grandeur universelle qui permet de comparer un spectre à un autre indépendamment de l'appareil utilisé — c'est cette même grandeur physique qu'exploitent aussi bien un spectromètre ATR de paillasse qu'un télescope spatial analysant l'atmosphère d'une exoplanète lointaine.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Herschel n'avait jamais mesuré la température au-delà du rouge visible en 1800 : combien de temps aurait-il fallu, selon toi, pour découvrir autrement l'existence du rayonnement infrarouge ?</li>
      <li>Pourquoi deux composés très proches structurellement (un alcool et son éther correspondant, par exemple) peuvent-ils être distingués sans ambiguïté par un simple spectre IR ?</li>
      <li>Quelle serait la conséquence, pour un laboratoire de synthèse organique, d'une absence totale de méthode de caractérisation aussi rapide que l'IR-ATR après chaque étape de réaction ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W. Herschel, « Investigation of the Powers of the Prismatic Colours to Heat and Illuminate Objects », Philosophical Transactions of the Royal Society, 1800 — l'article fondateur de la découverte du rayonnement infrarouge.</li>
      <li>D. L. Pavia, G. M. Lampman, G. S. Kriz, <em>Introduction to Organic Laboratory Techniques</em>, Cengage — référence internationale sur la spectroscopie IR en chimie organique.</li>
      <li>NASA/ESA/CSA, documentation scientifique du télescope spatial James Webb — sur les applications de la spectroscopie infrarouge à l'étude des atmosphères exoplanétaires.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais enregistrer et interpréter un spectre IR simple pour confirmer ou exclure la présence d'un groupe fonctionnel — clôturant ainsi l'ensemble du cours d'Instrumentations et manipulation de chimie organique, et avec lui la totalité de la Chimie de Licence 1. Les cours ultérieurs de spectroscopie organique approfondiront cette technique en la combinant à la RMN et à la spectrométrie de masse pour une élucidation structurale complète. Comme le rappelle la découverte fortuite de Herschel en 1800 : les avancées les plus fondamentales naissent parfois d'une observation en apparence anodine — une simple mesure de température au-delà du rouge visible — dont personne, à l'époque, n'aurait pu prévoir l'immense portée future.</p>
  `
};
INSTCO_NOVA_KB[icoKey("Caractérisation par spectroscopie infrarouge au laboratoire")] = {
  intro: "Salut, moi c'est Nova ! On termine avec la spectroscopie IR au laboratoire : méthode ATR, bandes caractéristiques. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/atr|r[ée]flexion totale att[ée]nu[ée]e/i, replies:[
      "La méthode ATR permet de déposer un échantillon brut (solide ou liquide), sans aucune préparation préalable, directement sur le cristal optique — rapide et pratique en routine."
    ]},
    { test:/bande caract[ée]ristique|c=o|carbonyle|o.h/i, replies:[
      "Bandes clés : O-H alcool (3200-3550, large), O-H acide (2500-3300, très large), C=O (1650-1750, fine et intense), C≡C/C≡N (2100-2260)."
    ]},
    { test:/confirmer.*groupe fonctionnel|structure compl[èe]te/i, replies:[
      "L'IR de routine confirme surtout la présence ou l'absence d'un groupe fonctionnel, mais ne détermine pas seule la structure complète — il faut la combiner à RMN et spectrométrie de masse pour cela."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à la simplicité de mise en œuvre de l'ATR.",
      "Indice niveau 2 : ce n'est pas une question de précision comparative ni de remplacement de la RMN.",
      "Indice niveau 3 : c'est l'absence de préparation préalable de l'échantillon."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis le tableau des bandes caractéristiques, autour de 1700 cm⁻¹.",
      "Indice niveau 2 : ce n'est ni O-H, ni C-H, ni C≡N.",
      "Indice niveau 3 : c'est la bande C=O (carbonyle)."
    ]}
  ]
};

/* fusionne le module Instrumentations et manipulation de chimie organique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, INSTCO_CHAPTERS);
Object.assign(NOVA_KB, INSTCO_NOVA_KB);