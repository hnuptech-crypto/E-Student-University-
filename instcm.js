/* =====================================================================
   CHUNK « instcm » — registre INSTCM_CHAPTERS / INSTCM_NOVA_KB
   Matière(s) : Chimie|Instrumentations et manipulation de chimie minérale
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   INSTCM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* =====================================================================================
   MODULE — INSTRUMENTATIONS ET MANIPULATION DE CHIMIE MINÉRALE (L1, domaine Chimie)
   fusionné à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : synthèse de composés inorganiques, analyse qualitative (identification
   des ions), gravimétrie, titrages redox et complexométriques, conductimétrie,
   potentiométrie, synthèse de complexes de coordination — conforme aux enseignements
   pratiques transversaux de chimie minérale en L1. Ce cours prolonge le cours
   théorique "Chimie minérale" par sa mise en œuvre expérimentale, et complète le
   cours "Instrumentations et manipulation de chimie générale" par des techniques
   spécifiques à la chimie des éléments inorganiques et à leurs réactions
   caractéristiques. Références de fond : D.C. Harris, Quantitative Chemical
   Analysis (W.H. Freeman) ; A. Casalot & A. Durupthy, Chimie générale et minérale
   (Hachette) ; G. Charlot, Chimie analytique quantitative (Masson).
===================================================================================== */
const INSTCM_MATIERE = 'Instrumentations et manipulation de chimie minérale';
function icmKey(chapterTitle){ return `Chimie|${INSTCM_MATIERE}|${chapterTitle}`; }
const INSTCM_CHAPTERS = {};
const INSTCM_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de rendement gravimétrique (chapitre 3)
--------------------------------------------------------------------------------- */
function updateGravimSim(){
  const mPrecip = parseFloat(document.getElementById('gravMPrecip').value) || 0.233;
  const mMolPrecip = parseFloat(document.getElementById('gravMMolPrecip').value) || 233.4;
  const mMolAnalyte = parseFloat(document.getElementById('gravMMolAnalyte').value) || 96.1;
  const facteur = mMolAnalyte / mMolPrecip;
  const mAnalyte = mPrecip * facteur;
  const out = document.getElementById('gravReadout');
  out.innerHTML = `Facteur gravimétrique = M(analyte)/M(précipité) = ${mMolAnalyte}/${mMolPrecip} = ${facteur.toFixed(4)}<br>` +
    `Masse d'analyte correspondante = ${mPrecip} × ${facteur.toFixed(4)} = <strong>${mAnalyte.toFixed(4)} g</strong>`;
}
function initGravimSim(){ updateGravimSim(); }

/* =========================== CHAPITRE 1 =========================== */
INSTCM_CHAPTERS[icmKey("Synthèse de composés inorganiques : principes généraux")] = {
  objectives: [
    "Distinguer les grandes voies de synthèse inorganique : précipitation, réaction acido-basique, oxydoréduction",
    "Décrire les étapes générales d'un protocole de synthèse d'un composé inorganique",
    "Calculer un rendement de synthèse à partir des quantités de matière engagées et obtenues",
    "Identifier les précautions spécifiques à la manipulation de réactifs inorganiques",
    "Évaluer pourquoi un rendement de synthèse inférieur à 100 % ne signale pas nécessairement une erreur expérimentale, mais peut être une conséquence inévitable de la thermodynamique et de la cinétique de la réaction elle-même"
  ],
  prereqs: ["Chimie minérale", "Instrumentations et manipulation de chimie générale"],
  bodyHtml: `
    <p>Alfred Werner, chimiste suisse pionnier de la chimie de coordination, synthétise à la fin du XIXe siècle des centaines de complexes métalliques inorganiques dans son propre laboratoire, avec des rendements souvent très inférieurs à 100 % — non pas par manque de rigueur expérimentale, mais parce que de nombreuses réactions inorganiques atteignent un véritable équilibre chimique plutôt qu'une conversion totale des réactifs. Cette compréhension, aujourd'hui une évidence pour tout étudiant en chimie, a valu à Werner le prix Nobel de chimie en 1913 pour ses travaux fondateurs sur la structure des complexes métalliques — une reconnaissance qui repose en partie sur sa capacité à interpréter correctement des rendements de synthèse imparfaits, plutôt que de les considérer comme de simples échecs expérimentaux.</p>
    <p>Cette distinction entre un rendement imparfait révélateur d'une limite thermodynamique fondamentale, et un rendement faible dû à une simple erreur de manipulation (perte de produit, réaction incomplète par manque de temps), est une compétence analytique essentielle que ce chapitre te propose de développer. Elle prépare directement aux techniques de synthèse et de caractérisation plus sophistiquées de la chimie de coordination, abordées dans le dernier chapitre de ce module.</p>
    <p>La synthèse de composés inorganiques (sels, oxydes, complexes) constitue le premier volet pratique de la chimie minérale expérimentale, mettant en application directe les notions de réactivité et de stœchiométrie du cours théorique de chimie minérale. À la fin de ce chapitre, tu sauras calculer rigoureusement le rendement de n'importe quelle synthèse inorganique, et interpréter correctement un rendement imparfait.</p>

    <h3>1. Les grandes voies de synthèse inorganique</h3>
    <table class="mini-table">
      <tr><th>Voie de synthèse</th><th>Principe</th><th>Exemple typique</th></tr>
      <tr><td>Précipitation</td><td>Mélange de deux solutions dont les ions forment un composé insoluble</td><td>AgNO₃ + NaCl → AgCl(s) + NaNO₃</td></tr>
      <tr><td>Réaction acido-basique</td><td>Neutralisation formant un sel soluble ou insoluble</td><td>Formation d'un hydroxyde métallique par ajout de base</td></tr>
      <tr><td>Oxydoréduction</td><td>Transfert d'électrons entre un oxydant et un réducteur</td><td>Synthèse d'un sel de fer(III) par oxydation contrôlée</td></tr>
      <tr><td>Complexation</td><td>Coordination d'un ligand autour d'un ion métallique central</td><td>Synthèse d'un complexe de coordination (chapitre 8)</td></tr>
    </table>

    <h3>2. Les étapes générales d'un protocole de synthèse</h3>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Préparation des réactifs</strong> : pesée et dissolution des réactifs de départ, aux concentrations et quantités prescrites par le protocole</li>
      <li><strong>Réaction</strong> : mise en contact des réactifs, souvent sous agitation, parfois avec chauffage ou refroidissement contrôlé selon la cinétique et la thermodynamique de la réaction visée</li>
      <li><strong>Isolement du produit</strong> : selon le cas, filtration d'un précipité (cours d'instrumentation générale), évaporation du solvant, ou cristallisation (également vue en chimie générale)</li>
      <li><strong>Purification</strong> : lavage du solide obtenu, recristallisation si nécessaire</li>
      <li><strong>Caractérisation</strong> : vérification de l'identité et de la pureté du produit obtenu (masse, point de fusion, tests qualitatifs — chapitre 2, ou méthodes spectroscopiques pour les cours ultérieurs)</li>
    </ol>

    <h3>3. Calcul du rendement de synthèse</h3>
    <p>Le <strong>rendement</strong> d'une synthèse compare la quantité de produit réellement obtenue à la quantité théoriquement attendue, calculée à partir du réactif <strong>limitant</strong> :</p>
    <div class="formula-box">$$\\eta\\ (\\%) = \\dfrac{n_{\\text{obtenu}}}{n_{\\text{théorique}}} \\times 100$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — identifier le réactif limitant</span>
      Avant de calculer le rendement, il est indispensable d'identifier le <strong>réactif limitant</strong> : celui qui est entièrement consommé en premier, et qui détermine donc la quantité maximale théorique de produit formable. Pour cela, on compare les quantités de matière disponibles de chaque réactif à leurs coefficients stœchiométriques respectifs dans l'équation-bilan équilibrée.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Un rendement de synthèse de 90 % (comme dans l'exemple ci-dessous) peut résulter soit d'une perte accidentelle de produit lors des manipulations (filtration incomplète, pertes de transvasement), soit d'un équilibre chimique réel qui empêche toute conversion totale, quelle que soit la précision de la manipulation. Quelles vérifications expérimentales simples pourrais-tu envisager pour distinguer ces deux causes possibles d'un même rendement imparfait ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> On fait réagir 0,050 mol de nitrate d'argent avec 0,030 mol de chlorure de sodium selon AgNO₃ + NaCl → AgCl(s) + NaNO₃ (réaction 1:1). On récupère 3,87 g de précipité de AgCl (M=143,3 g/mol). Calculer le rendement de cette synthèse.</p>
      <p><strong>Solution :</strong> La réaction est 1:1, et NaCl (0,030 mol) est en défaut par rapport à AgNO₃ (0,050 mol) : NaCl est le réactif limitant. Quantité théorique de AgCl : $n_{théorique}=0{,}030$ mol, soit $m_{théorique}=0{,}030\\times143{,}3=4{,}30$ g. Quantité obtenue : $n_{obtenu}=3{,}87/143{,}3=0{,}0270$ mol. Rendement : $\\eta = 0{,}0270/0{,}030\\times100 = 90{,}1\\%$.</p>
      <p class="example-answer">Réponse : le rendement de cette synthèse est d'environ 90 %.</p>
    </div>

    <h3>4. Précautions spécifiques à la chimie minérale</h3>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li>De nombreux sels métalliques (cuivre, chrome, plomb, cadmium...) sont <strong>toxiques</strong> pour l'environnement aquatique : ne jamais les jeter à l'évier, utiliser les bidons de déchets appropriés</li>
      <li>Certaines réactions inorganiques sont fortement <strong>exothermiques</strong> (dissolution de certains acides ou bases concentrées, certaines réactions redox) : toujours ajouter l'acide dans l'eau (jamais l'inverse) et travailler sous hotte si nécessaire</li>
      <li>Vérifier la <strong>compatibilité</strong> des produits manipulés avant tout mélange (certaines combinaisons de réactifs inorganiques dégagent des gaz toxiques, comme un mélange accidentel d'acide et d'hypochlorite)</li>
    </ul>

    <h3>5. Frontière de la recherche</h3>
    <p>La synthèse inorganique moderne cherche aujourd'hui à maximiser les rendements tout en minimisant l'impact environnemental des procédés : la chimie verte inorganique développe des méthodes de synthèse à température ambiante, sans solvant organique toxique, ou catalysées par des espèces recyclables, pour réduire la consommation énergétique et les déchets chimiques. Par ailleurs, les techniques de synthèse assistée par micro-ondes ou par sonochimie (ultrasons) permettent aujourd'hui d'accélérer considérablement certaines réactions inorganiques tout en améliorant souvent leur rendement, comparées aux méthodes de chauffage classique.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes de synthèse inorganique automatisées et optimisées par intelligence artificielle, capables d'ajuster en temps réel les conditions réactionnelles pour maximiser systématiquement le rendement de n'importe quelle synthèse ? C'est un axe de recherche émergent en chimie de synthèse assistée par ordinateur.</p>
    <p><strong>Technologie émergente :</strong> les réacteurs à flux continu, qui remplacent les synthèses en ballon classiques (dites « batch ») par un procédé continu et automatisé, permettent aujourd'hui d'obtenir des rendements plus reproductibles et une meilleure sécurité pour les synthèses inorganiques à l'échelle industrielle.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Choix de la voie de synthèse (précipitation, acido-basique, redox, complexation) → protocole (préparation, réaction, isolement, purification, caractérisation) → identification du réactif limitant → calcul du rendement η
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\eta\\ (\\%) = \\frac{n_{\\text{obtenu}}}{n_{\\text{théorique}}} \\times 100$$
      Cette formule, apparemment triviale, exige en réalité une étape préalable souvent négligée par les étudiants débutants — l'identification correcte du réactif limitant — sans laquelle tout calcul de rendement, aussi précis soit-il arithmétiquement, reste fondamentalement erroné.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Les principales voies de synthèse inorganique : précipitation, réaction acido-basique, oxydoréduction, complexation</li>
      <li>Un protocole de synthèse suit les étapes : préparation, réaction, isolement, purification, caractérisation</li>
      <li>Le rendement η=nobtenu/nthéorique×100 se calcule à partir du réactif limitant, identifié par comparaison des quantités disponibles aux coefficients stœchiométriques</li>
      <li>Toxicité de nombreux sels métalliques, exothermicité de certaines réactions, et compatibilité des réactifs sont des précautions spécifiques à la chimie minérale</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Calculer le rendement à partir du mauvais réactif (celui qui n'est pas limitant)</li>
      <li>Jeter des sels métalliques toxiques à l'évier au lieu des bidons de déchets appropriés</li>
      <li>Verser l'eau dans l'acide concentré au lieu de l'inverse, provoquant des projections dangereuses</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Le réactif limitant d'une synthèse est :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm1e1" value="wrong">Celui introduit en plus grande quantité</label>
        <label class="option"><input type="radio" name="icm1e1" value="right">Celui entièrement consommé en premier, limitant la quantité de produit formable</label>
        <label class="option"><input type="radio" name="icm1e1" value="wrong">Toujours le solvant</label>
        <label class="option"><input type="radio" name="icm1e1" value="wrong">Celui le plus cher</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm1e1','icm1fb1','Correct — c\\'est la définition du réactif limitant, celui qui détermine la quantité théorique maximale de produit.','Relis la définition du réactif limitant.')">Vérifier</button>
      <div class="feedback" id="icm1fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour diluer un acide concentré, il faut :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm1e2" value="wrong">Verser l'eau dans l'acide</label>
        <label class="option"><input type="radio" name="icm1e2" value="right">Verser l'acide dans l'eau</label>
        <label class="option"><input type="radio" name="icm1e2" value="wrong">L'ordre n'a pas d'importance</label>
        <label class="option"><input type="radio" name="icm1e2" value="wrong">Mélanger les deux simultanément à débit égal</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm1e2','icm1fb2','Correct — verser l\\'acide dans l\\'eau limite l\\'échauffement local et les projections dangereuses.','Relis la précaution sur la dilution des acides concentrés.')">Vérifier</button>
      <div class="feedback" id="icm1fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si toutes les réactions de synthèse inorganique étaient totales, sans jamais atteindre un équilibre : la notion même de rendement aurait-elle encore un sens pratique ?</li>
      <li>Pourquoi Alfred Werner a-t-il dû interpréter avec prudence des rendements de synthèse imparfaits, plutôt que de systématiquement chercher une erreur expérimentale à chaque fois que le rendement n'atteignait pas 100 % ?</li>
      <li>Quelle serait la conséquence, pour l'industrie chimique, d'une méthode fiable pour toujours prédire à l'avance le rendement théorique maximal d'une nouvelle réaction de synthèse, avant même de la réaliser expérimentalement ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>A. Werner, « Beitrag zur Konstitution anorganischer Verbindungen », Zeitschrift für anorganische Chemie, 1893 — travaux fondateurs sur la synthèse et la structure des complexes de coordination (prix Nobel de chimie 1913).</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la synthèse inorganique en licence.</li>
      <li>G. Wulfsberg, <em>Inorganic Chemistry</em>, University Science Books — référence internationale sur les méthodes de synthèse en chimie minérale.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais calculer rigoureusement le rendement de n'importe quelle synthèse inorganique, et interpréter correctement un rendement imparfait. Le chapitre suivant, « Analyse qualitative : identification des cations et anions », va te donner les outils pour identifier précisément la nature des espèces présentes dans un mélange inconnu, une compétence analytique complémentaire indispensable à toute caractérisation de produit de synthèse. Comme le rappelle l'exemple d'Alfred Werner : un rendement imparfait n'est pas toujours un échec expérimental, mais parfois la simple manifestation d'une limite thermodynamique fondamentale qu'il convient de comprendre plutôt que de systématiquement blâmer.</p>
  `
};
INSTCM_NOVA_KB[icmKey("Synthèse de composés inorganiques : principes généraux")] = {
  intro: "Salut, moi c'est Nova ! On démarre la chimie minérale pratique : voies de synthèse, rendement, précautions. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/voies de synth[èe]se|pr[ée]cipitation|complexation/i, replies:[
      "Les grandes voies de synthèse inorganique : précipitation, réaction acido-basique, oxydoréduction, complexation."
    ]},
    { test:/r[ée]actif limitant/i, replies:[
      "Le réactif limitant est celui entièrement consommé en premier, déterminant la quantité maximale théorique de produit. On l'identifie en comparant les quantités disponibles aux coefficients stœchiométriques."
    ]},
    { test:/rendement/i, replies:[
      "Le rendement η=nobtenu/nthéorique×100, où nthéorique se calcule à partir du réactif limitant."
    ]},
    { test:/toxique|d[ée]chet|s[ée]curit[ée].*min[ée]rale/i, replies:[
      "De nombreux sels métalliques sont toxiques pour l'environnement (jamais à l'évier, bidons de déchets appropriés). Toujours verser l'acide dans l'eau, jamais l'inverse."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis la définition précise du réactif limitant.",
      "Indice niveau 2 : ce n'est pas forcément celui en plus grande quantité.",
      "Indice niveau 3 : c'est celui qui est entièrement consommé en premier."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la règle de sécurité pour diluer un acide.",
      "Indice niveau 2 : l'ordre a une grande importance ici.",
      "Indice niveau 3 : il faut verser l'acide dans l'eau."
    ]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
INSTCM_CHAPTERS[icmKey("Analyse qualitative : identification des cations et anions")] = {
  objectives: [
    "Réaliser et interpréter des tests de reconnaissance des principaux cations métalliques",
    "Réaliser et interpréter des tests de reconnaissance des principaux anions",
    "Comprendre le principe de la marche d'analyse systématique",
    "Distinguer analyse qualitative et analyse quantitative",
    "Évaluer pourquoi la marche d'analyse qualitative systématique, développée dès le XIXe siècle, reste un exercice pédagogique précieux malgré sa quasi-disparition des laboratoires professionnels modernes équipés d'instruments spectroscopiques"
  ],
  prereqs: ["Synthèse de composés inorganiques : principes généraux"],
  bodyHtml: `
    <p>Au XIXe siècle, avant l'invention des techniques spectroscopiques modernes, l'analyse qualitative minérale systématique constitue l'unique méthode fiable pour identifier la composition d'un échantillon inconnu — qu'il s'agisse d'un minéral extrait d'une mine ou d'un poison suspecté dans une affaire judiciaire naissante (la toxicologie médico-légale moderne trouve d'ailleurs ses racines directes dans ces mêmes méthodes de détection qualitative des métaux lourds). Cette approche méthodique, patiemment développée par des générations de chimistes analystes, reposait entièrement sur l'observation fine de précipités colorés, d'effervescences et de complexes caractéristiques — sans le moindre appareil électronique pour confirmer une hypothèse.</p>
    <p>Aujourd'hui, ces techniques ont largement cédé la place à des méthodes instrumentales bien plus rapides et précises (spectrométrie de masse, spectroscopie d'absorption atomique), mais elles restent un exercice pédagogique irremplaçable : elles forcent l'étudiant à observer attentivement, à raisonner par élimination, et à comprendre intimement la réactivité chimique des ions plutôt que de se contenter de lire un résultat affiché par une machine. Ce chapitre te propose de développer ce même sens de l'observation rigoureuse et de la déduction méthodique.</p>
    <p>L'<strong>analyse qualitative</strong> (parfois appelée « analyse qualitative minérale ») a pour objectif d'identifier <strong>quels</strong> ions sont présents dans un échantillon inconnu — par opposition à l'analyse quantitative (chapitres 3 à 6), qui détermine <strong>combien</strong> d'un ion donné est présent. À la fin de ce chapitre, tu sauras identifier avec certitude la nature des ions présents dans un échantillon inconnu, en combinant plusieurs tests de reconnaissance complémentaires.</p>

    <h3>1. Tests de reconnaissance des cations métalliques</h3>
    <p>De nombreux cations métalliques présentent des réactions caractéristiques, souvent des précipitations colorées, qui permettent de les identifier de façon relativement simple et rapide :</p>
    <table class="mini-table">
      <tr><th>Cation</th><th>Réactif test</th><th>Observation caractéristique</th></tr>
      <tr><td>Fe³⁺</td><td>Ions thiocyanate SCN⁻</td><td>Coloration rouge sang intense (complexe [Fe(SCN)]²⁺)</td></tr>
      <tr><td>Cu²⁺</td><td>Ammoniac NH₃ en excès</td><td>Précipité bleu pâle puis coloration bleu intense (complexe [Cu(NH₃)₄]²⁺)</td></tr>
      <tr><td>Ag⁺</td><td>Ions chlorure Cl⁻</td><td>Précipité blanc AgCl, qui noircit à la lumière</td></tr>
      <tr><td>Ca²⁺</td><td>Ions oxalate C₂O₄²⁻</td><td>Précipité blanc d'oxalate de calcium</td></tr>
      <tr><td>Ba²⁺</td><td>Ions sulfate SO₄²⁻</td><td>Précipité blanc de sulfate de baryum, insoluble même en milieu acide</td></tr>
    </table>

    <h3>2. Tests de reconnaissance des anions</h3>
    <table class="mini-table">
      <tr><th>Anion</th><th>Réactif test</th><th>Observation caractéristique</th></tr>
      <tr><td>Cl⁻</td><td>Ions Ag⁺ (nitrate d'argent)</td><td>Précipité blanc AgCl, soluble dans l'ammoniac dilué</td></tr>
      <tr><td>SO₄²⁻</td><td>Ions Ba²⁺ (chlorure de baryum)</td><td>Précipité blanc BaSO₄, insoluble en milieu acide</td></tr>
      <tr><td>CO₃²⁻</td><td>Acide dilué (HCl)</td><td>Effervescence (dégagement de CO₂, qui trouble l'eau de chaux)</td></tr>
      <tr><td>NO₃⁻</td><td>Test à l'anneau brun (FeSO₄ + H₂SO₄ concentré)</td><td>Apparition d'un anneau brun à l'interface des deux liquides</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Point clé — un test seul ne suffit généralement pas</span>
      La plupart des tests de reconnaissance ne sont pas parfaitement <strong>spécifiques</strong> : plusieurs ions différents peuvent parfois donner une réaction similaire, ou un même ion peut donner des observations légèrement différentes selon les conditions expérimentales (pH, présence d'autres ions). Une identification fiable repose donc généralement sur la combinaison de <strong>plusieurs tests complémentaires</strong>, plutôt que sur un test unique isolé.
    </div>

    <h3>3. Principe de la marche d'analyse systématique</h3>
    <p>Lorsqu'un échantillon peut contenir <strong>plusieurs</strong> ions simultanément, une identification directe par tests isolés devient rapidement ambiguë (réactions parasites, interférences). On procède alors par une <strong>marche d'analyse</strong> : une séquence ordonnée de séparations successives (précipitations sélectives, ajustements de pH, extractions) qui isole progressivement des groupes d'ions aux propriétés communes, avant d'appliquer les tests spécifiques à chaque sous-groupe ainsi séparé.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Cette approche méthodique — historiquement développée dès le XIXe siècle pour l'analyse minérale qualitative classique — illustre un principe général en analyse chimique : simplifier un mélange complexe en sous-groupes plus simples <strong>avant</strong> de chercher à identifier chaque constituant individuellement, plutôt que de tenter une identification directe sur le mélange complet.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La marche d'analyse qualitative classique a aujourd'hui presque totalement disparu des laboratoires professionnels, remplacée par des instruments spectroscopiques bien plus rapides et précis. Pourquoi cette méthode historique reste-t-elle malgré tout un exercice pédagogique précieux pour un étudiant en chimie, même s'il n'aura probablement jamais à l'appliquer telle quelle dans sa future carrière professionnelle ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Un échantillon inconnu, traité par une solution d'acide chlorhydrique dilué, produit une effervescence. Que peut-on en conclure, et quel test complémentaire réaliser pour confirmer ?</p>
      <p><strong>Solution :</strong> L'effervescence en présence d'acide dilué suggère fortement la présence d'ions carbonate CO₃²⁻ (dégagement de CO₂). Pour confirmer, on peut faire barboter le gaz dégagé dans de l'eau de chaux (solution d'hydroxyde de calcium) : un trouble blanc (précipité de CaCO₃) confirme sans ambiguïté qu'il s'agit bien de CO₂, donc la présence de carbonate dans l'échantillon initial.</p>
      <p class="example-answer">Réponse : présence probable de CO₃²⁻, confirmée par le test caractéristique du CO₂ à l'eau de chaux.</p>
    </div>

    <h3>4. Frontière de la recherche</h3>
    <p>L'identification d'ions inconnus, bien qu'aujourd'hui largement automatisée par des instruments spectroscopiques, reste un enjeu critique dans de nombreux domaines : la toxicologie médico-légale moderne, héritière directe de ces méthodes qualitatives historiques, continue de rechercher des traces de métaux lourds ou de poisons dans des échantillons biologiques, avec une sensibilité aujourd'hui largement supérieure grâce aux techniques instrumentales de pointe. Les capteurs chimiques portables, capables de détecter rapidement la présence de contaminants métalliques dans l'eau potable sur le terrain, s'appuient sur des principes de reconnaissance ionique directement apparentés à ceux étudiés dans ce chapitre.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des capteurs miniaturisés et peu coûteux, combinant plusieurs tests de reconnaissance simultanés, pour un diagnostic rapide et fiable de la composition ionique d'un échantillon sur le terrain, sans recourir à un laboratoire équipé d'instruments coûteux ? C'est un enjeu de recherche en instrumentation analytique accessible.</p>
    <p><strong>Technologie émergente :</strong> les capteurs colorimétriques imprimés sur papier, capables de révéler par un simple changement de couleur la présence de contaminants métalliques dans l'eau, démocratisent aujourd'hui l'accès à des tests de reconnaissance ionique rapides dans des contextes à ressources limitées.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Échantillon inconnu → tests de reconnaissance individuels (précipités colorés, complexes, effervescence) → confirmation par test complémentaire → marche d'analyse systématique si mélange complexe → identification fiable
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$\\text{Identification fiable} = \\text{Test 1} + \\text{Test de confirmation} \\quad (\\text{jamais un seul test isolé})$$
      Cette règle, plus méthodologique qu'une formule numérique, résume l'enseignement central de ce chapitre : en analyse qualitative, la certitude ne naît jamais d'une observation isolée, mais toujours de la convergence de plusieurs indices complémentaires — un principe qui dépasse largement le cadre de la chimie analytique.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>L'analyse qualitative identifie quels ions sont présents (par opposition à l'analyse quantitative, qui détermine combien)</li>
      <li>De nombreux cations et anions ont des réactions caractéristiques (précipités colorés, effervescence, complexes colorés)</li>
      <li>Un test unique n'est généralement pas suffisamment spécifique ; il faut souvent combiner plusieurs tests</li>
      <li>La marche d'analyse systématique sépare progressivement les ions en sous-groupes avant identification individuelle</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Conclure définitivement à partir d'un seul test, sans confirmation par un test complémentaire</li>
      <li>Confondre analyse qualitative (identifier quels ions) et analyse quantitative (déterminer combien)</li>
      <li>Ignorer les interférences possibles entre plusieurs ions présents simultanément dans un même échantillon</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">L'apparition d'une coloration rouge sang avec les ions thiocyanate SCN⁻ est caractéristique de la présence de :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm2e1" value="wrong">Cu²⁺</label>
        <label class="option"><input type="radio" name="icm2e1" value="right">Fe³⁺</label>
        <label class="option"><input type="radio" name="icm2e1" value="wrong">Ag⁺</label>
        <label class="option"><input type="radio" name="icm2e1" value="wrong">Ba²⁺</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm2e1','icm2fb1','Correct — le complexe [Fe(SCN)]²⁺ donne cette coloration rouge sang caractéristique.','Relis le tableau des tests de reconnaissance des cations.')">Vérifier</button>
      <div class="feedback" id="icm2fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi une identification fiable repose-t-elle généralement sur plusieurs tests plutôt qu'un seul ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm2e2" value="wrong">Par simple habitude, sans raison scientifique</label>
        <label class="option"><input type="radio" name="icm2e2" value="right">Parce que la plupart des tests ne sont pas parfaitement spécifiques à un seul ion</label>
        <label class="option"><input type="radio" name="icm2e2" value="wrong">Parce qu'un seul test coûte trop cher</label>
        <label class="option"><input type="radio" name="icm2e2" value="wrong">Parce que la réglementation l'impose systématiquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm2e2','icm2fb2','Correct — le manque de spécificité de nombreux tests isolés justifie la combinaison de plusieurs tests complémentaires.','Relis le point clé sur la nécessité de combiner plusieurs tests.')">Vérifier</button>
      <div class="feedback" id="icm2fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si chaque ion possédait un test de reconnaissance parfaitement spécifique, sans aucune ambiguïté possible : la marche d'analyse systématique serait-elle encore nécessaire ?</li>
      <li>Pourquoi la toxicologie médico-légale moderne, malgré des instruments bien plus sophistiqués que ceux du XIXe siècle, reste-t-elle conceptuellement héritière des méthodes d'analyse qualitative classiques ?</li>
      <li>Quelle serait la conséquence, pour la surveillance de la qualité de l'eau potable dans les régions à ressources limitées, d'une démocratisation réussie des capteurs colorimétriques portables ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>C. R. Fresenius, <em>Anleitung zur qualitativen chemischen Analyse</em>, 1841 — le traité fondateur de l'analyse qualitative minérale systématique.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur l'analyse qualitative en licence.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur les méthodes d'analyse chimique.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais identifier avec certitude la nature des ions présents dans un échantillon inconnu, en combinant plusieurs tests de reconnaissance complémentaires. Le chapitre suivant, « Gravimétrie : dosage par précipitation et pesée », va franchir une étape supplémentaire en passant du simple « quel ion ? » au « combien de cet ion ? », par une méthode quantitative d'une précision remarquable. Comme le rappelle l'héritage de Fresenius et de l'analyse qualitative classique : avant de pouvoir mesurer précisément une quantité, encore faut-il savoir avec certitude ce que l'on cherche à mesurer.</p>
  `
};
INSTCM_NOVA_KB[icmKey("Analyse qualitative : identification des cations et anions")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'analyse qualitative : tests de reconnaissance des ions, marche d'analyse. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/fe3\\+|thiocyanate|scn/i, replies:[
      "Fe³⁺ + SCN⁻ donne une coloration rouge sang intense (complexe [Fe(SCN)]²⁺) — un test classique très sensible."
    ]},
    { test:/cu2\\+|ammoniac.*cuivre/i, replies:[
      "Cu²⁺ + NH₃ en excès donne d'abord un précipité bleu pâle, puis une coloration bleu intense (complexe [Cu(NH₃)₄]²⁺)."
    ]},
    { test:/carbonate|effervescence|co2/i, replies:[
      "CO₃²⁻ en présence d'acide dilué produit une effervescence de CO₂, confirmée par le trouble blanc à l'eau de chaux."
    ]},
    { test:/marche d.analyse/i, replies:[
      "La marche d'analyse systématique sépare progressivement un mélange d'ions en sous-groupes (précipitations sélectives, pH) avant d'appliquer les tests spécifiques à chaque sous-groupe."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : relis le tableau des tests de reconnaissance des cations.",
      "Indice niveau 2 : ce n'est ni Cu²⁺ ni Ag⁺.",
      "Indice niveau 3 : c'est Fe³⁺."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense à la fiabilité d'un test isolé.",
      "Indice niveau 2 : ce n'est pas une question de coût ou de réglementation.",
      "Indice niveau 3 : c'est le manque de spécificité de nombreux tests qui justifie d'en combiner plusieurs."
    ]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
INSTCM_CHAPTERS[icmKey("Gravimétrie : dosage par précipitation et pesée")] = {
  objectives: [
    "Comprendre le principe d'un dosage gravimétrique",
    "Identifier les conditions d'un précipité adapté à une analyse gravimétrique",
    "Calculer une teneur en analyte à partir de la masse de précipité pesée",
    "Décrire les étapes de purification d'un précipité analytique (digestion, lavage, calcination)",
    "Évaluer pourquoi la gravimétrie, malgré sa lenteur relative comparée aux méthodes instrumentales modernes, reste considérée comme la méthode de référence absolue pour valider l'exactitude d'autres techniques analytiques plus rapides"
  ],
  prereqs: ["Analyse qualitative : identification des cations et anions"],
  bodyHtml: `
    <p>Avant l'avènement des instruments électroniques modernes, la gravimétrie constituait la méthode d'analyse quantitative la plus fiable et la plus précise dont disposaient les chimistes — une balance analytique bien calibrée pouvant peser avec une exactitude redoutable, sans nécessiter d'étalonnage complexe par comparaison à des standards externes, contrairement à de nombreuses techniques instrumentales modernes. Cette fiabilité intrinsèque explique pourquoi la gravimétrie reste, encore aujourd'hui, considérée comme une méthode de référence absolue (ou « méthode primaire ») en métrologie chimique, utilisée pour vérifier et étalonner d'autres techniques d'analyse plus rapides mais potentiellement moins directement traçables.</p>
    <p>Cette technique, bien que plus lente qu'un simple dosage instrumental moderne, illustre un principe fondamental de la chimie analytique : la simplicité d'un principe de mesure (ici, une simple pesée) peut souvent garantir une fiabilité et une traçabilité métrologique supérieures à celles de méthodes bien plus sophistiquées technologiquement, mais dépendantes d'un étalonnage externe. Ce chapitre te donne les bases rigoureuses de cette méthode historique, toujours enseignée pour sa valeur pédagogique et sa fiabilité analytique fondamentale.</p>
    <p>La <strong>gravimétrie</strong> est historiquement l'une des toutes premières méthodes d'analyse quantitative de la chimie, reposant sur un principe d'une simplicité trompeuse : peser précisément un précipité pour en déduire la quantité d'espèce recherchée dans l'échantillon initial. À la fin de ce chapitre, tu sauras réaliser un dosage gravimétrique complet et calculer avec précision la teneur en analyte recherchée.</p>

    <h3>1. Principe général</h3>
    <p>Le dosage gravimétrique consiste à faire précipiter <strong>quantitativement</strong> (c'est-à-dire de façon complète, sans perte) l'espèce à doser sous une forme <strong>chimiquement définie et pesable</strong>, puis à peser ce précipité après séparation (filtration, chapitre 5 du cours de chimie générale) et séchage (ou calcination). La masse pesée, combinée à la stœchiométrie de la réaction de précipitation, permet de remonter à la quantité initiale d'analyte.</p>

    <h3>2. Conditions d'un bon précipité analytique</h3>
    <table class="mini-table">
      <tr><th>Condition</th><th>Raison</th></tr>
      <tr><td>Solubilité très faible</td><td>Garantit une précipitation quantitative (perte négligeable en solution)</td></tr>
      <tr><td>Composition chimique définie et constante (stœchiométrie fixe)</td><td>Permet un calcul fiable de la masse d'analyte à partir de la masse pesée</td></tr>
      <tr><td>Facilité de filtration et de lavage</td><td>Cristaux suffisamment gros, évitant le colmatage du filtre</td></tr>
      <tr><td>Pureté (absence de coprécipitation d'impuretés)</td><td>Évite une surestimation de la masse réelle d'analyte</td></tr>
    </table>

    <h3>3. Le facteur gravimétrique</h3>
    <p>Pour convertir la masse de précipité pesée $m_{précipité}$ en masse d'analyte recherché $m_{analyte}$, on utilise le <strong>facteur gravimétrique</strong> $F$, construit à partir des masses molaires et des coefficients stœchiométriques de la réaction :</p>
    <div class="formula-box">$$m_{analyte} = m_{précipité} \\times F, \\qquad F = \\dfrac{a}{b}\\times\\dfrac{M_{analyte}}{M_{précipité}}$$</div>
    <p>où $a$ et $b$ sont les coefficients stœchiométriques de l'analyte et du précipité dans l'équation-bilan de précipitation.</p>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La gravimétrie ne nécessite aucun étalonnage externe par comparaison à des solutions de concentration connue, contrairement à la plupart des méthodes instrumentales modernes (spectrophotométrie, potentiométrie). Pourquoi cette absence d'étalonnage externe fait-elle de la gravimétrie une méthode « primaire » en métrologie chimique, directement traçable jusqu'aux unités fondamentales du système international (la masse) ?
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur du facteur gravimétrique</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Cas simple 1:1 — calcule la masse d'analyte à partir de la masse de précipité pesée.</p>
      <div class="sim-2col">
        <div class="sim-controls">
          <label>Masse de précipité pesée (g)</label><input type="number" id="gravMPrecip" value="0.233" step="0.001" oninput="updateGravimSim()">
          <label>M(précipité) (g/mol)</label><input type="number" id="gravMMolPrecip" value="233.4" step="0.1" oninput="updateGravimSim()">
          <label>M(analyte) (g/mol)</label><input type="number" id="gravMMolAnalyte" value="96.1" step="0.1" oninput="updateGravimSim()">
          <div class="sim-readout" id="gravReadout"></div>
        </div>
      </div>
    </div>

    <h3>4. Les étapes de purification d'un précipité analytique</h3>
    <ol style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Digestion</strong> : maintien du précipité en contact avec sa solution mère pendant un certain temps (parfois à chaud), favorisant la croissance de cristaux plus gros et plus purs (mécanisme dit de mûrissement d'Ostwald), plus faciles à filtrer</li>
      <li><strong>Filtration</strong> : séparation du précipité (filtration sous vide généralement, cours de chimie générale)</li>
      <li><strong>Lavage</strong> : élimination des impuretés adsorbées à la surface du précipité, avec un liquide de lavage choisi pour ne pas redissoudre le précipité</li>
      <li><strong>Séchage ou calcination</strong> : élimination de l'eau résiduelle (étuve) ou transformation thermique du précipité en une forme stable et de composition parfaitement définie (four à haute température), selon le protocole</li>
    </ol>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour doser la teneur en chlorure d'un échantillon, on précipite Cl⁻ sous forme d'AgCl (M=143,3 g/mol) selon Cl⁻ + Ag⁺ → AgCl (réaction 1:1). On pèse 0,215 g de précipité sec. Calculer la masse de chlorure (M=35,45 g/mol) présente dans l'échantillon.</p>
      <p><strong>Solution :</strong> Facteur gravimétrique (réaction 1:1) : $F = M(\\text{Cl}^-)/M(\\text{AgCl}) = 35{,}45/143{,}3 = 0{,}2474$. Masse de chlorure : $m_{Cl^-} = 0{,}215 \\times 0{,}2474 = 0{,}0532$ g.</p>
      <p class="example-answer">Réponse : la masse de chlorure dans l'échantillon est d'environ 0,0532 g, soit 53,2 mg.</p>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>La gravimétrie, malgré son ancienneté, continue de jouer un rôle irremplaçable en métrologie chimique de haute précision : les laboratoires nationaux de métrologie utilisent encore aujourd'hui des méthodes gravimétriques rigoureuses pour certifier des matériaux de référence, contre lesquels sont ensuite étalonnées toutes les autres techniques analytiques plus rapides. Par ailleurs, les microbalances de nouvelle génération, capables de peser avec une précision de l'ordre du nanogramme, ouvrent la voie à des dosages gravimétriques sur des échantillons de taille toujours plus réduite, notamment en analyse environnementale de traces.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des méthodes gravimétriques automatisées et miniaturisées, conservant la fiabilité métrologique fondamentale de la pesée tout en réduisant considérablement le temps d'analyse traditionnellement associé à cette technique ? C'est un enjeu de recherche en instrumentation analytique de précision.</p>
    <p><strong>Technologie émergente :</strong> les microbalances à quartz, qui mesurent des variations de masse infimes par le décalage de fréquence d'un cristal vibrant, permettent aujourd'hui des dosages gravimétriques d'une sensibilité extrême, notamment pour la détection de contaminants à l'état de traces dans l'air ou l'eau.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Analyte en solution → précipitation quantitative (précipité adapté : peu soluble, stœchiométrie fixe) → digestion (mûrissement) → filtration et lavage → séchage/calcination → pesée précise → facteur gravimétrique → teneur en analyte
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$m_{analyte} = m_{précipité} \\times F, \\qquad F = \\frac{a}{b}\\times\\frac{M_{analyte}}{M_{précipité}}$$
      Cette relation, reposant uniquement sur une pesée précise et la stœchiométrie de la réaction, fait de la gravimétrie une méthode analytique « primaire » — directement traçable à l'unité de masse du système international, sans jamais nécessiter d'étalonnage externe par comparaison à un standard de concentration connue.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La gravimétrie détermine une quantité d'analyte à partir de la masse d'un précipité pesé, chimiquement défini</li>
      <li>Un bon précipité analytique a une solubilité très faible, une composition constante, et est facile à filtrer/laver</li>
      <li>Le facteur gravimétrique F=(a/b)×M(analyte)/M(précipité) convertit la masse pesée en masse d'analyte</li>
      <li>La digestion (mûrissement) favorise des cristaux plus gros et plus purs, plus faciles à filtrer</li>
      <li>Le protocole complet suit : digestion, filtration, lavage, séchage ou calcination</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier de tenir compte des coefficients stœchiométriques a et b si la réaction n'est pas 1:1</li>
      <li>Filtrer immédiatement après précipitation, sans laisser le temps de digestion, obtenant des cristaux trop fins et difficiles à filtrer</li>
      <li>Utiliser un liquide de lavage qui redissout partiellement le précipité, faussant le résultat par perte de masse</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">La digestion (mûrissement) d'un précipité a pour but principal :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm3e1" value="wrong">D'accélérer la réaction de précipitation</label>
        <label class="option"><input type="radio" name="icm3e1" value="right">De favoriser la formation de cristaux plus gros et plus purs, plus faciles à filtrer</label>
        <label class="option"><input type="radio" name="icm3e1" value="wrong">De dissoudre complètement le précipité</label>
        <label class="option"><input type="radio" name="icm3e1" value="wrong">De colorer le précipité</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm3e1','icm3fb1','Correct — la digestion favorise le mûrissement des cristaux, plus gros et plus purs.','Relis la définition de l\\'étape de digestion dans le protocole gravimétrique.')">Vérifier</button>
      <div class="feedback" id="icm3fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pour une réaction de précipitation 1:1, le facteur gravimétrique F vaut :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm3e2" value="wrong">M(précipité)/M(analyte)</label>
        <label class="option"><input type="radio" name="icm3e2" value="right">M(analyte)/M(précipité)</label>
        <label class="option"><input type="radio" name="icm3e2" value="wrong">M(analyte)×M(précipité)</label>
        <label class="option"><input type="radio" name="icm3e2" value="wrong">M(analyte)+M(précipité)</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm3e2','icm3fb2','Correct — pour une réaction 1:1 (a=b=1), F=M(analyte)/M(précipité).','Relis la formule du facteur gravimétrique avec a=b=1.')">Vérifier</button>
      <div class="feedback" id="icm3fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si aucune méthode gravimétrique de référence n'existait pour valider les techniques instrumentales modernes : comment la fiabilité de ces dernières pourrait-elle être garantie sur le long terme ?</li>
      <li>Pourquoi une simple erreur de digestion insuffisante peut-elle fausser significativement un résultat gravimétrique, alors que la pesée finale elle-même est réalisée avec une précision extrême ?</li>
      <li>Quelle serait la conséquence, pour la métrologie chimique mondiale, d'une méthode gravimétrique automatisée conservant sa fiabilité tout en réduisant drastiquement son temps d'analyse traditionnellement long ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W. Ostwald, « Studien über die Bildung und Umwandlung fester Körper », Zeitschrift für physikalische Chemie, 1897 — travaux fondateurs sur le mûrissement des précipités (mûrissement d'Ostwald).</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur la gravimétrie.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la gravimétrie en licence.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais réaliser un dosage gravimétrique complet et calculer avec précision la teneur en analyte recherchée — une méthode dont la simplicité et la traçabilité métrologique en font, encore aujourd'hui, une référence absolue en chimie analytique. Le chapitre suivant, « Titrages redox : principe et mise en œuvre », va explorer une méthode quantitative bien plus rapide, exploitant cette fois des réactions d'oxydoréduction plutôt qu'une simple précipitation. Comme le rappelle la fiabilité intemporelle de la gravimétrie : parfois, la méthode la plus simple et la plus ancienne reste, encore aujourd'hui, la référence ultime contre laquelle toutes les autres se mesurent.</p>
  `,
  init: initGravimSim
};
INSTCM_NOVA_KB[icmKey("Gravimétrie : dosage par précipitation et pesée")] = {
  intro: "Salut, moi c'est Nova ! On étudie la gravimétrie : précipité analytique, facteur gravimétrique, digestion. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/facteur gravim[ée]trique/i, replies:[
      "Le facteur gravimétrique F=(a/b)×M(analyte)/M(précipité) convertit la masse de précipité pesée en masse d'analyte, en tenant compte de la stœchiométrie."
    ]},
    { test:/digestion|m[uû]rissement/i, replies:[
      "La digestion (mûrissement d'Ostwald) laisse le précipité en contact avec sa solution mère pour favoriser des cristaux plus gros et plus purs, plus faciles à filtrer."
    ]},
    { test:/pr[ée]cipit[ée] analytique|bon pr[ée]cipit[ée]/i, replies:[
      "Un bon précipité analytique a une solubilité très faible, une composition définie, une bonne filtrabilité, et une bonne pureté (pas de coprécipitation d'impuretés)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à l'effet recherché de la digestion sur la taille des cristaux.",
      "Indice niveau 2 : ce n'est pas une dissolution ni une coloration.",
      "Indice niveau 3 : c'est la formation de cristaux plus gros et plus purs."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : applique la formule du facteur gravimétrique avec a=b=1.",
      "Indice niveau 2 : ce n'est ni un produit ni une somme.",
      "Indice niveau 3 : c'est M(analyte)/M(précipité)."
    ]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
INSTCM_CHAPTERS[icmKey("Titrages redox : principe et mise en œuvre")] = {
  objectives: [
    "Écrire et équilibrer une équation-bilan d'oxydoréduction",
    "Décrire le principe du titrage par le permanganate de potassium (permanganimétrie)",
    "Décrire le principe d'un titrage iodométrique",
    "Identifier les modes de repérage de l'équivalence propres aux titrages redox",
    "Évaluer pourquoi le permanganate de potassium, malgré la simplicité pratique qu'offre sa propre couleur comme indicateur, reste un réactif exigeant une manipulation rigoureuse en raison de son pouvoir oxydant extrême"
  ],
  prereqs: ["Gravimétrie : dosage par précipitation et pesée"],
  bodyHtml: `
    <p>Le permanganate de potassium, dont la teinte violette caractéristique se décolore instantanément au contact d'un réducteur, a longtemps servi bien au-delà du seul cadre analytique : utilisé comme désinfectant et antiseptique dès le XIXe siècle, il a également joué un rôle historique méconnu dans la survie de nombreux marins et explorateurs, sa capacité oxydante puissante permettant de purifier l'eau de boisson en l'absence de toute autre méthode disponible. Cette même propriété — un pouvoir oxydant redoutable — en fait aujourd'hui un outil de titrage d'une élégance remarquable, où le réactif lui-même agit comme son propre indicateur coloré, sans nécessiter le moindre ajout supplémentaire.</p>
    <p>Cette économie de moyens, aussi élégante soit-elle, ne doit jamais faire oublier que le permanganate reste un oxydant puissant, capable de réagir violemment avec de nombreuses substances organiques et de provoquer des brûlures chimiques sévères en cas de contact cutané prolongé. Ce chapitre te donne les bases rigoureuses de deux grandes familles de titrages redox — la permanganimétrie et l'iodométrie — indispensables pour doser quantitativement de nombreuses espèces oxydantes ou réductrices en solution.</p>
    <p>Les titrages d'oxydoréduction constituent une famille de méthodes quantitatives très largement utilisées en chimie minérale, exploitant un transfert d'électrons entre le titrant et l'espèce à doser. À la fin de ce chapitre, tu sauras réaliser un titrage redox complet, qu'il s'agisse d'une permanganimétrie directe ou d'une iodométrie indirecte, et éviter les erreurs de calcul stœchiométrique les plus fréquentes propres à ces titrages.</p>

    <h3>1. Rappel : équilibrer une équation redox</h3>
    <p>Une réaction d'oxydoréduction combine une demi-équation d'<strong>oxydation</strong> (perte d'électrons) et une demi-équation de <strong>réduction</strong> (gain d'électrons). L'équation globale s'obtient en combinant ces deux demi-équations de sorte que le nombre d'électrons échangés soit identique (multiplication par des coefficients appropriés), ce qui les élimine de l'équation-bilan finale.</p>

    <h3>2. La permanganimétrie</h3>
    <p>Le <strong>permanganate de potassium</strong> KMnO₄ est un oxydant puissant et très largement utilisé comme titrant redox, en particulier pour son avantage pratique remarquable :</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — le permanganate est son propre indicateur</span>
      L'ion permanganate MnO₄⁻ est violet intense en solution, tandis que sa forme réduite Mn²⁺ (en milieu acide) est quasiment incolore. Le titrage par le permanganate ne nécessite donc <strong>aucun indicateur coloré supplémentaire</strong> : tant que du réducteur est présent dans le milieu, le permanganate ajouté est immédiatement décoloré ; dès que tout le réducteur a réagi, la <strong>première goutte de permanganate en excès</strong> persiste et colore durablement la solution en rose pâle, signalant précisément l'équivalence.
    </div>
    <p>La demi-équation caractéristique du permanganate en <strong>milieu acide</strong> s'écrit :</p>
    <div class="formula-box">$$\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}$$</div>
    <p>Cette demi-équation montre pourquoi le titrage au permanganate s'effectue systématiquement en <strong>milieu fortement acide</strong> (généralement acidifié à l'acide sulfurique) : c'est cette forme réduite, bien précise et stable, qui garantit une stœchiométrie fiable et reproductible.</p>

    <h3>3. L'iodométrie</h3>
    <p>L'<strong>iodométrie</strong> est une méthode indirecte particulièrement utile pour doser des oxydants : l'espèce oxydante à doser réagit d'abord en excès avec les ions iodure I⁻, produisant du diiode I₂ en quantité stœchiométriquement équivalente à l'oxydant initial. Le diiode ainsi formé est ensuite titré par une solution de <strong>thiosulfate de sodium</strong> $\\text{Na}_2\\text{S}_2\\text{O}_3$, selon :</p>
    <div class="formula-box">$$\\text{I}_2 + 2\\text{S}_2\\text{O}_3^{2-} \\rightarrow 2\\text{I}^- + \\text{S}_4\\text{O}_6^{2-}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'empois d'amidon comme indicateur spécifique</span>
      Pour repérer précisément l'équivalence de ce titrage, on ajoute de l'<strong>empois d'amidon</strong>, qui forme avec le diiode résiduel un complexe d'inclusion <strong>bleu-noir</strong> intense et très sensible. On introduit l'amidon <strong>juste avant</strong> l'équivalence (lorsque la coloration jaune pâle du diiode devient à peine perceptible), car un ajout trop précoce en présence d'une forte concentration de diiode peut piéger irréversiblement une partie du diiode dans le complexe, faussant légèrement le titrage.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      L'iodométrie est une méthode indirecte (on dose le diiode formé, pas l'oxydant lui-même), alors que la permanganimétrie est directe. En reliant cela au principe de conservation des charges dans une réaction redox, pourquoi cette méthode indirecte reste-t-elle malgré tout rigoureusement fiable pour déterminer la quantité d'oxydant initialement présente ?
    </div>

    <h3>4. Le calcul à l'équivalence</h3>
    <p>Comme pour tout titrage, à l'équivalence, les quantités de matière d'oxydant et de réducteur introduites respectent exactement la stœchiométrie de la réaction — mais attention, contrairement aux titrages acido-basiques 1:1 les plus simples, les coefficients stœchiométriques d'une réaction redox sont souvent différents de 1, ce qu'il faut impérativement prendre en compte dans le calcul final.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> On titre 20,0 mL d'une solution de sulfate de fer(II), FeSO₄, par une solution de permanganate de potassium à 0,020 mol/L, selon la réaction (déjà équilibrée) $\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\rightarrow \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}$. L'équivalence est atteinte pour 16,5 mL de permanganate versés. Calculer la concentration de la solution de Fe²⁺.</p>
      <p><strong>Solution :</strong> À l'équivalence, le rapport stœchiométrique impose $n(\\text{Fe}^{2+}) = 5\\times n(\\text{MnO}_4^-)$. Donc $C_{Fe^{2+}}\\times V_{Fe^{2+}} = 5\\times C_{MnO_4^-}\\times V_{MnO_4^-}$, soit $C_{Fe^{2+}} = \\dfrac{5\\times0{,}020\\times16{,}5}{20{,}0} = 0{,}0825$ mol/L.</p>
      <p class="example-answer">Réponse : $C_{Fe^{2+}} \\approx 0{,}0825$ mol/L — noter l'importance du facteur 5 issu de la stœchiométrie, souvent oublié par erreur.</p>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Les titrages redox restent aujourd'hui des méthodes de référence dans de nombreux domaines industriels et environnementaux : la détermination de la demande chimique en oxygène (DCO) des eaux usées, un indicateur clé de pollution organique, repose directement sur un titrage redox au dichromate ou au permanganate. Les capteurs électrochimiques automatisés, couplés à des titreurs redox, permettent aujourd'hui de suivre en continu la qualité de l'eau dans les stations d'épuration, remplaçant progressivement les titrages manuels traditionnels pour un contrôle en temps réel.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des capteurs redox portables et peu coûteux, capables de réaliser sur le terrain des dosages aussi précis qu'un titrage de laboratoire, pour la surveillance environnementale rapide de la qualité de l'eau dans des contextes à ressources limitées ? C'est un enjeu de recherche en instrumentation analytique accessible.</p>
    <p><strong>Technologie émergente :</strong> les biocapteurs enzymatiques électrochimiques, qui exploitent des réactions redox biologiques spécifiques pour détecter sélectivement certains polluants ou biomarqueurs, s'inspirent directement des principes de titrage redox étudiés dans ce chapitre pour des applications de diagnostic rapide.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Espèce oxydante ou réductrice à doser → titrage direct (permanganimétrie, indicateur = le titrant lui-même) ou indirect (iodométrie via I₂, indicateur = empois d'amidon) → équivalence repérée → calcul stœchiométrique (attention aux coefficients ≠1)
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$n_{\\text{oxydant}} \\times z_{\\text{oxydant}} = n_{\\text{réducteur}} \\times z_{\\text{réducteur}}$$
      Cette relation, où $z$ représente le nombre d'électrons échangés par chaque espèce, généralise la simple relation d'équivalence des titrages acido-basiques aux réactions redox — un rappel constant qu'en oxydoréduction, ce sont les électrons échangés, et non les seules moles, qui doivent être comptés avec la plus grande rigueur.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une équation redox combine deux demi-équations (oxydation, réduction) avec un nombre d'électrons échangés identique</li>
      <li>Le permanganate KMnO₄ est son propre indicateur (violet → incolore), et s'utilise en milieu fortement acide</li>
      <li>L'iodométrie dose indirectement un oxydant via le diiode formé, titré ensuite par le thiosulfate, avec l'empois d'amidon comme indicateur (ajouté juste avant l'équivalence)</li>
      <li>Le calcul à l'équivalence doit impérativement tenir compte des coefficients stœchiométriques, souvent différents de 1 en redox</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier les coefficients stœchiométriques (souvent ≠1) dans le calcul à l'équivalence d'un titrage redox</li>
      <li>Ajouter l'empois d'amidon trop tôt en iodométrie, risquant de piéger du diiode et de fausser le résultat</li>
      <li>Titrer au permanganate en milieu non acidifié, compromettant la stœchiométrie fiable de la demi-équation</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi le titrage au permanganate ne nécessite-t-il aucun indicateur coloré supplémentaire ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm4e1" value="wrong">Parce que le permanganate est incolore</label>
        <label class="option"><input type="radio" name="icm4e1" value="right">Parce que le permanganate lui-même change de couleur (violet à incolore) selon sa forme oxydée ou réduite</label>
        <label class="option"><input type="radio" name="icm4e1" value="wrong">Parce qu'il n'y a jamais d'équivalence à repérer avec le permanganate</label>
        <label class="option"><input type="radio" name="icm4e1" value="wrong">Parce que le milieu est toujours basique</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm4e1','icm4fb1','Correct — le permanganate est son propre indicateur, violet à l\\'excès, incolore une fois réduit.','Relis le point clé sur le permanganate comme son propre indicateur.')">Vérifier</button>
      <div class="feedback" id="icm4fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">En iodométrie, l'empois d'amidon doit être ajouté :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm4e2" value="wrong">Dès le début du titrage</label>
        <label class="option"><input type="radio" name="icm4e2" value="right">Juste avant l'équivalence, quand la couleur jaune pâle du diiode devient à peine perceptible</label>
        <label class="option"><input type="radio" name="icm4e2" value="wrong">Uniquement après l'équivalence</label>
        <label class="option"><input type="radio" name="icm4e2" value="wrong">Peu importe le moment</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm4e2','icm4fb2','Correct — un ajout trop précoce risquerait de piéger irréversiblement du diiode dans le complexe amidon-iode.','Relis le point clé sur le moment d\\'ajout de l\\'empois d\\'amidon.')">Vérifier</button>
      <div class="feedback" id="icm4fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si le permanganate n'avait pas la propriété de changer aussi nettement de couleur selon son état d'oxydation : quelle méthode alternative aurait-il fallu développer pour repérer l'équivalence ?</li>
      <li>Pourquoi l'iodométrie, une méthode indirecte, reste-t-elle rigoureusement fiable pour déterminer la quantité d'oxydant initialement présente dans un échantillon ?</li>
      <li>Quelle serait la conséquence, pour le contrôle de la qualité de l'eau dans les stations d'épuration, d'une généralisation insuffisante des capteurs redox automatisés en temps réel ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>K. F. Mohr, <em>Lehrbuch der chemisch-analytischen Titrirmethode</em>, 1855 — l'un des premiers traités systématiques sur les titrages, incluant les méthodes redox.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur les titrages redox.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la permanganimétrie et l'iodométrie en licence.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais réaliser un titrage redox complet, qu'il s'agisse d'une permanganimétrie directe ou d'une iodométrie indirecte. Le chapitre suivant, « Titrages complexométriques : dosage par l'EDTA », va explorer une troisième grande famille de titrages, exploitant cette fois la formation de complexes de coordination stables. Comme le rappelle l'élégance pratique du permanganate, son propre indicateur : parfois, une simple propriété physique intrinsèque à un réactif — ici, sa couleur — suffit à simplifier considérablement une méthode d'analyse, sans jamais sacrifier sa rigueur.</p>
  `
};
INSTCM_NOVA_KB[icmKey("Titrages redox : principe et mise en œuvre")] = {
  intro: "Salut, moi c'est Nova ! On étudie les titrages redox : permanganimétrie, iodométrie. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/permanganate|permanganim[ée]trie/i, replies:[
      "Le permanganate KMnO₄ est son propre indicateur (violet → incolore lors de sa réduction en Mn²⁺), et s'utilise en milieu fortement acide pour une stœchiométrie fiable."
    ]},
    { test:/iodom[ée]trie|thiosulfate|empois d.amidon/i, replies:[
      "L'iodométrie dose indirectement un oxydant : formation de I₂ (proportionnel à l'oxydant), titré par le thiosulfate, avec l'empois d'amidon (bleu-noir) comme indicateur, ajouté juste avant l'équivalence."
    ]},
    { test:/[ée]quilibrer.*redox|demi.[ée]quation/i, replies:[
      "Une équation redox combine deux demi-équations (oxydation et réduction) avec un nombre d'électrons échangés identique, éliminés dans l'équation-bilan finale."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense aux couleurs du permanganate selon son état d'oxydation.",
      "Indice niveau 2 : violet intense d'un côté, incolore de l'autre.",
      "Indice niveau 3 : c'est ce changement de couleur qui sert d'indicateur naturel."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au risque si l'amidon est ajouté trop tôt.",
      "Indice niveau 2 : il pourrait piéger du diiode.",
      "Indice niveau 3 : donc on l'ajoute juste avant l'équivalence."
    ]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
INSTCM_CHAPTERS[icmKey("Titrages complexométriques : dosage par l'EDTA")] = {
  objectives: [
    "Comprendre le principe de la complexométrie et le rôle des ligands polydentates",
    "Décrire les propriétés de l'EDTA qui en font un titrant complexométrique idéal",
    "Utiliser les indicateurs métallochromiques pour repérer l'équivalence",
    "Appliquer le dosage complexométrique à la détermination de la dureté de l'eau",
    "Évaluer pourquoi l'EDTA, initialement développé pour des applications industrielles de nettoyage, s'est imposé comme le réactif analytique universel de la complexométrie plutôt qu'un ligand plus simple ou moins coûteux"
  ],
  prereqs: ["Titrages redox : principe et mise en œuvre"],
  bodyHtml: `
    <p>Ferdinand Münz, chimiste allemand travaillant pour l'entreprise IG Farben, synthétise l'EDTA pour la première fois en 1935, initialement pensé comme un agent de substitution au citrate dans l'industrie textile, pour éviter la précipitation indésirable de calcium lors de la teinture des tissus. Ce n'est que quelques années plus tard, dans les années 1940, que le chimiste suisse Gerold Schwarzenbach comprend le potentiel analytique extraordinaire de cette molécule : sa capacité à envelopper complètement un ion métallique par six points d'ancrage simultanés (d'où son caractère hexadentate) en fait un titrant d'une fiabilité et d'une universalité inégalées, capable de doser presque tous les cations métalliques du tableau périodique avec la même stœchiométrie simple.</p>
    <p>Cette universalité remarquable — un même réactif, une même stœchiométrie 1:1, quel que soit le métal visé — explique pourquoi l'EDTA reste, près d'un siècle après sa découverte, le titrant complexométrique de référence dans une multitude d'applications : contrôle qualité de l'eau potable, dosage de métaux traces dans l'industrie alimentaire, ou encore, en médecine, comme agent chélateur utilisé pour traiter certaines intoxications aux métaux lourds. Ce chapitre te donne les bases rigoureuses de cette technique de dosage aussi élégante qu'universellement applicable.</p>
    <p>La <strong>complexométrie</strong> exploite la formation de complexes de coordination stables entre un cation métallique et un ligand titrant, pour doser quantitativement des ions métalliques — une technique incontournable, notamment pour la détermination de la dureté de l'eau. À la fin de ce chapitre, tu sauras réaliser un dosage complexométrique complet par l'EDTA et déterminer avec précision la dureté totale d'une eau.</p>

    <h3>1. Principe de la complexométrie</h3>
    <p>Un titrage complexométrique fait réagir un cation métallique $M^{n+}$ avec un ligand titrant $L$, formant un complexe stable $[ML]$ :</p>
    <div class="formula-box">$$M^{n+} + L \\rightarrow [ML]$$</div>
    <p>Pour que ce type de titrage soit exploitable analytiquement, la réaction de complexation doit être <strong>rapide</strong>, <strong>totale</strong> (constante de formation très élevée), et de <strong>stœchiométrie bien définie</strong> — idéalement 1:1, pour simplifier les calculs.</p>

    <h3>2. L'EDTA : un ligand hexadentate idéal</h3>
    <p>L'<strong>EDTA</strong> (acide éthylènediaminetétraacétique) est le titrant complexométrique de très loin le plus utilisé en chimie analytique. Sa structure comporte six sites de coordination potentiels (deux atomes d'azote et quatre groupes carboxylate), ce qui en fait un ligand <strong>hexadentate</strong> — capable d'entourer complètement un ion métallique et de former un complexe de très grande stabilité, quasi systématiquement de stœchiométrie <strong>1:1</strong>, quel que soit le cation métallique concerné (Ca²⁺, Mg²⁺, Zn²⁺, Fe³⁺...).</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi la stœchiométrie 1:1 universelle simplifie tout</span>
      Le fait que l'EDTA forme systématiquement des complexes 1:1, quel que soit le cation métallique dosé, est un avantage analytique considérable : la relation à l'équivalence se réduit toujours à la simple égalité $n(M^{n+}) = n(\\text{EDTA})$, sans avoir à retenir ou vérifier un coefficient stœchiométrique différent pour chaque métal — contrairement, par exemple, aux titrages redox du chapitre précédent.
    </div>

    <h3>3. Les indicateurs métallochromiques</h3>
    <p>Pour repérer l'équivalence, on utilise un <strong>indicateur métallochromique</strong> : un ligand coloré qui forme lui-même un complexe coloré avec le cation métallique, mais dont la stabilité est <strong>inférieure</strong> à celle du complexe avec l'EDTA. Le <strong>noir ériochrome T (NET)</strong> est l'indicateur le plus classique pour le dosage de Ca²⁺ et Mg²⁺ : il forme avec ces ions un complexe rouge vin, tandis que l'indicateur libre (non complexé) est bleu.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — le mécanisme du changement de couleur</span>
      Au fur et à mesure de l'ajout d'EDTA, celui-ci complexe préférentiellement les ions métalliques <strong>libres</strong> en solution. Lorsque tout le métal libre a été consommé, l'EDTA ajouté en léger excès vient alors <strong>déplacer</strong> l'indicateur de son propre complexe avec le métal (car le complexe EDTA-métal est plus stable) : l'indicateur métallochromique est ainsi libéré sous sa forme colorée libre, provoquant le virage net de couleur (ici, du rouge vin au bleu) qui signale précisément l'équivalence.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le virage de couleur d'un indicateur métallochromique repose sur une compétition entre deux complexes (indicateur-métal et EDTA-métal), l'EDTA l'emportant grâce à sa plus grande stabilité. En reliant cela au principe du déplacement d'équilibre déjà rencontré en thermochimie, pourquoi ce mécanisme de compétition, plutôt qu'un simple changement de pH, est-il ce qui garantit la netteté et la précision du virage observé ?
    </div>

    <h3>4. Application : détermination de la dureté de l'eau</h3>
    <p>La <strong>dureté</strong> (ou titre hydrotimétrique) d'une eau mesure sa teneur totale en ions Ca²⁺ et Mg²⁺, responsables notamment de la formation de tartre. Le dosage complexométrique par l'EDTA, en présence de noir ériochrome T à pH tamponné (généralement pH≈10, condition nécessaire à la stabilité du complexe indicateur-métal), fournit une mesure directe et rapide de cette dureté totale, exprimée traditionnellement en degrés hydrotimétriques français (°TH), où $1°TH$ correspond à $10^{-4}$ mol/L d'ions alcalino-terreux (Ca²⁺+Mg²⁺ combinés).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> On titre 100 mL d'une eau minérale par une solution d'EDTA à 0,010 mol/L en présence de NET. L'équivalence est atteinte pour 8,4 mL d'EDTA versés. Calculer la dureté totale de l'eau, en mol/L d'ions Ca²⁺+Mg²⁺.</p>
      <p><strong>Solution :</strong> La stœchiométrie EDTA-métal est 1:1, donc $n(\\text{Ca}^{2+}+\\text{Mg}^{2+}) = n(\\text{EDTA}) = 0{,}010\\times8{,}4\\times10^{-3} = 8{,}4\\times10^{-5}$ mol. Concentration : $C = 8{,}4\\times10^{-5}/0{,}100 = 8{,}4\\times10^{-4}$ mol/L.</p>
      <p class="example-answer">Réponse : la dureté totale est d'environ $8{,}4\\times10^{-4}$ mol/L, soit environ 8,4°TH.</p>
    </div>

    <h3>5. Frontière de la recherche</h3>
    <p>Au-delà de son usage analytique, l'EDTA trouve aujourd'hui des applications médicales notables : la chélation thérapeutique par EDTA est utilisée pour traiter certaines intoxications aiguës au plomb ou à d'autres métaux lourds, l'EDTA capturant ces métaux toxiques pour faciliter leur élimination rénale. Les chercheurs en chimie environnementale étudient également l'usage de ligands chélatants apparentés à l'EDTA pour la décontamination de sols ou d'eaux pollués par des métaux lourds, exploitant le même principe de complexation sélective à une échelle bien plus vaste qu'un simple titrage de laboratoire.</p>
    <p><strong>Question ouverte :</strong> peut-on développer des ligands chélatants biodégradables, offrant une affinité aussi élevée que l'EDTA pour les métaux lourds, mais sans les problèmes de persistance environnementale associés à ce dernier une fois relâché dans la Nature ? C'est un enjeu de recherche en chimie verte et en remédiation environnementale.</p>
    <p><strong>Technologie émergente :</strong> les capteurs électrochimiques à base de ligands complexants sélectifs, capables de détecter en temps réel la présence de métaux lourds dans l'eau potable, s'appuient directement sur les mêmes principes de complexation sélective étudiés dans ce chapitre.</p>

    <h3>Synthèse visuelle</h3>
    <div class="formula-box">
      Cation métallique M^n+ → titrage par EDTA (ligand hexadentate, complexe 1:1 universel) → indicateur métallochromique (complexe coloré moins stable) → EDTA en excès déplace l'indicateur → virage de couleur → équivalence
    </div>
    <div class="key-point">
      <span class="eyebrow">Équation maîtresse du chapitre</span>
      $$n(M^{n+}) = n(\\text{EDTA}) \\quad (\\text{stœchiométrie 1:1 universelle})$$
      Cette relation, d'une simplicité remarquable pour n'importe quel cation métallique dosé, illustre pourquoi l'EDTA, découvert presque par hasard dans un contexte industriel de teinture textile, est devenu le réactif analytique universel de toute la complexométrie moderne.
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La complexométrie dose un cation métallique par formation d'un complexe stable avec un ligand titrant</li>
      <li>L'EDTA, ligand hexadentate, forme systématiquement des complexes 1:1 avec presque tous les cations métalliques</li>
      <li>Les indicateurs métallochromiques (ex : NET) forment un complexe coloré avec le métal, moins stable que le complexe EDTA-métal</li>
      <li>Le virage de couleur signale que l'EDTA en excès a déplacé l'indicateur de son complexe avec le métal</li>
      <li>Le dosage complexométrique par EDTA permet de déterminer la dureté totale d'une eau (Ca²⁺+Mg²⁺)</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Croire que la stœchiométrie EDTA-métal varie selon le cation métallique — elle est presque toujours 1:1</li>
      <li>Oublier de tamponner le pH à la valeur requise pour la stabilité du complexe indicateur-métal</li>
      <li>Confondre le rôle de l'indicateur métallochromique avec celui d'un indicateur acido-basique classique</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Pourquoi l'EDTA est-il un titrant complexométrique particulièrement pratique ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm5e1" value="wrong">Parce qu'il est coloré lui-même</label>
        <label class="option"><input type="radio" name="icm5e1" value="right">Parce qu'il forme systématiquement des complexes 1:1 avec presque tous les cations métalliques</label>
        <label class="option"><input type="radio" name="icm5e1" value="wrong">Parce qu'il ne réagit qu'avec le calcium</label>
        <label class="option"><input type="radio" name="icm5e1" value="wrong">Parce qu'il est bon marché uniquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm5e1','icm5fb1','Correct — la stœchiométrie universelle 1:1 simplifie considérablement les calculs, quel que soit le métal dosé.','Relis le point clé sur l\\'avantage de la stœchiométrie 1:1 universelle.')">Vérifier</button>
      <div class="feedback" id="icm5fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Le virage de couleur d'un indicateur métallochromique à l'équivalence est dû à :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm5e2" value="wrong">La dégradation chimique de l'indicateur</label>
        <label class="option"><input type="radio" name="icm5e2" value="right">Le déplacement de l'indicateur de son complexe avec le métal par l'EDTA en excès</label>
        <label class="option"><input type="radio" name="icm5e2" value="wrong">Un changement de pH de la solution</label>
        <label class="option"><input type="radio" name="icm5e2" value="wrong">La précipitation du métal</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm5e2','icm5fb2','Correct — l\\'EDTA, formant un complexe plus stable, déplace l\\'indicateur de son propre complexe avec le métal, libérant sa forme colorée libre.','Relis le point clé sur le mécanisme du changement de couleur.')">Vérifier</button>
      <div class="feedback" id="icm5fb2"></div>
    </div>
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si l'EDTA formait des complexes de stœchiométrie variable selon le cation métallique, plutôt qu'une stœchiométrie 1:1 universelle : les calculs de dosage complexométrique seraient-ils encore aussi simples ?</li>
      <li>Pourquoi Ferdinand Münz, en développant l'EDTA pour un usage industriel textile, n'a-t-il pas immédiatement perçu son potentiel comme réactif analytique universel ?</li>
      <li>Quelle serait la conséquence, pour le traitement médical des intoxications aux métaux lourds, de l'absence d'un agent chélateur aussi efficace et polyvalent que l'EDTA ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>G. Schwarzenbach, « Der Chelateffekt », Helvetica Chimica Acta, 1952 — travaux fondateurs sur l'effet chélate et l'usage analytique de l'EDTA.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur la complexométrie.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur les titrages complexométriques en licence.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais réaliser un dosage complexométrique complet par l'EDTA et déterminer avec précision la dureté totale d'une eau. Le chapitre suivant, « Conductimétrie et son application aux titrages », va explorer une méthode de suivi de titrage totalement différente, fondée cette fois sur la mesure de la conductivité électrique d'une solution. Comme le rappelle l'histoire de l'EDTA, né d'un besoin industriel modeste avant de devenir un outil analytique universel : les découvertes les plus fécondes de la chimie naissent parfois d'applications bien éloignées de leur usage final le plus célèbre.</p>
  `
};
INSTCM_NOVA_KB[icmKey("Titrages complexométriques : dosage par l'EDTA")] = {
  intro: "Salut, moi c'est Nova ! On étudie la complexométrie : EDTA, indicateurs métallochromiques, dureté de l'eau. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/edta/i, replies:[
      "L'EDTA, ligand hexadentate, forme systématiquement des complexes 1:1 avec presque tous les cations métalliques — un avantage analytique majeur qui simplifie les calculs."
    ]},
    { test:/indicateur m[ée]tallochromique|net|noir [ée]riochrome/i, replies:[
      "Un indicateur métallochromique (ex : NET) forme un complexe coloré avec le métal, moins stable que celui avec l'EDTA. L'EDTA en excès déplace l'indicateur, provoquant le virage de couleur à l'équivalence."
    ]},
    { test:/duret[ée].*eau|°th/i, replies:[
      "La dureté de l'eau (Ca²⁺+Mg²⁺) se détermine par titrage complexométrique à l'EDTA en présence de NET, à pH tamponné (~10), exprimée en degrés hydrotimétriques (°TH)."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense à ce qui rend l'EDTA universellement pratique, quel que soit le métal.",
      "Indice niveau 2 : ce n'est pas une question de couleur ou de prix.",
      "Indice niveau 3 : c'est la stœchiométrie 1:1 systématique."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense au mécanisme de compétition entre indicateur et EDTA pour le métal.",
      "Indice niveau 2 : ce n'est pas une dégradation ni un changement de pH.",
      "Indice niveau 3 : c'est le déplacement de l'indicateur par l'EDTA en excès."
    ]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
INSTCM_CHAPTERS[icmKey("Conductimétrie et son application aux titrages")] = {
  objectives: [
    "Comprendre le principe de la mesure de conductivité d'une solution ionique",
    "Relier la conductivité molaire ionique à la mobilité des ions en solution",
    "Interpréter l'allure d'une courbe de titrage conductimétrique",
    "Déterminer un point équivalent par la méthode des deux droites",
    "Évaluer pourquoi la conductimétrie, contrairement à la pH-métrie, permet de suivre efficacement des titrages où le pH lui-même ne varie presque pas — un avantage qui en fait une technique complémentaire indispensable plutôt qu'une simple redondance"
  ],
  prereqs: ["Mesure du pH et pH-métrie (cours d'Instrumentations chimie générale)"],
  bodyHtml: `
    <p>Friedrich Kohlrausch, physicien et chimiste allemand de la fin du XIXe siècle, établit dès 1876 la loi de migration indépendante des ions, qui postule que chaque espèce ionique contribue à la conductivité totale d'une solution proportionnellement à sa propre concentration et à sa propre mobilité, indépendamment de la présence des autres ions. Cette découverte, d'une simplicité remarquable, permet pour la première fois de décomposer mathématiquement la conductivité globale d'une solution complexe en contributions individuelles attribuables à chaque ion — une avancée qui rendra possible, quelques décennies plus tard, le suivi conductimétrique précis de nombreuses réactions chimiques en solution.</p>
    <p>Cette technique, complémentaire à la pH-métrie déjà étudiée en chimie générale, offre un avantage décisif dans certaines situations : contrairement au pH, qui ne renseigne que sur la concentration en ions H₃O⁺ et OH⁻, la conductivité reflète l'ensemble de la population ionique d'une solution — ce qui permet de suivre des réactions de précipitation ou de complexation où le pH n'évolue presque pas, mais où les concentrations ioniques changent de façon spectaculaire. Ce chapitre te donne les bases rigoureuses de cette méthode de suivi, particulièrement précieuse lorsque la pH-métrie atteint ses limites.</p>
    <p>La <strong>conductimétrie</strong> mesure la capacité d'une solution à conduire le courant électrique, une propriété directement liée à la concentration et à la nature des ions présents — offrant une méthode de suivi de titrage alternative et complémentaire à la pH-métrie. À la fin de ce chapitre, tu sauras interpréter n'importe quelle courbe de titrage conductimétrique et déterminer précisément son point équivalent par la méthode des deux droites.</p>

    <h3>1. Principe de la mesure de conductivité</h3>
    <p>Une <strong>cellule conductimétrique</strong>, plongée dans la solution, mesure la <strong>conductance</strong> $G$ (inverse de la résistance électrique) de la portion de solution comprise entre deux électrodes. La <strong>conductivité</strong> $\\sigma$ (en S/m ou S/cm) s'en déduit en tenant compte de la géométrie de la cellule (constante de cellule).</p>

    <h3>2. Conductivité molaire ionique et mobilité</h3>
    <p>Chaque espèce ionique contribue à la conductivité totale de la solution proportionnellement à sa concentration et à sa <strong>conductivité molaire ionique</strong> $\\lambda_i$, elle-même liée à la <strong>mobilité</strong> de l'ion sous l'effet du champ électrique :</p>
    <div class="formula-box">$$\\sigma = \\sum_i \\lambda_i\\,c_i$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — les ions H⁺ et OH⁻ sont exceptionnellement mobiles</span>
      Les ions <strong>H⁺</strong> (ou plutôt H₃O⁺) et <strong>OH⁻</strong> possèdent des conductivités molaires ioniques <strong>bien supérieures</strong> à celles de la quasi-totalité des autres ions courants (environ 5 à 7 fois plus élevées), en raison d'un mécanisme de transport particulier (mécanisme de Grotthuss, transfert de proton de molécule d'eau en molécule d'eau, plus rapide qu'un déplacement physique classique de l'ion à travers la solution). Cette propriété explique la forme caractéristique des courbes de titrage conductimétrique acide-base, où le remplacement de H⁺ (ou OH⁻) par un ion moins mobile produit des variations de pente très marquées.
    </div>
    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le mécanisme de Grotthuss permet à un proton de « sauter » de molécule d'eau en molécule d'eau sans qu'aucun ion H₃O⁺ individuel n'ait besoin de traverser physiquement toute la solution — une sorte de relais moléculaire ultra-rapide. En quoi ce mécanisme est-il fondamentalement différent du déplacement physique classique d'un ion comme Na⁺ ou Cl⁻ à travers le liquide, et pourquoi le premier est-il si nettement plus rapide que le second ?
    </div>

    <h3>3. Allure d'une courbe de titrage conductimétrique</h3>
    <p>Lors d'un titrage acido-basique suivi par conductimétrie, la conductivité de la solution varie de façon <strong>linéaire par morceaux</strong> en fonction du volume de titrant versé, avec un changement net de pente à l'équivalence — cette variation de pente reflète directement le remplacement d'une espèce ionique par une autre, de mobilité différente.</p>
    <p>Par exemple, pour le titrage d'un acide fort (HCl) par une base forte (NaOH) :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Avant l'équivalence</strong> : les ions H⁺ (très mobiles) sont progressivement neutralisés et remplacés par des ions Na⁺ (moins mobiles) — la conductivité <strong>diminue</strong></li>
      <li><strong>Après l'équivalence</strong> : l'ajout de NaOH en excès introduit des ions OH⁻ (très mobiles) supplémentaires sans consommation — la conductivité <strong>augmente</strong> à nouveau</li>
    </ul>

    <h3>4. Détermination de l'équivalence : la méthode des deux droites</h3>
    <p>Contrairement à la méthode des tangentes utilisée en pH-métrie (cours de chimie générale), l'équivalence en conductimétrie se détermine par la <strong>méthode des deux droites</strong> : on trace la droite de régression linéaire sur chacune des deux branches de la courbe (avant et après l'équivalence), et leur <strong>intersection</strong> donne directement le volume équivalent $V_E$.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — un avantage pratique de la conductimétrie</span>
      La méthode des deux droites, purement géométrique et ne nécessitant pas de mesures très rapprochées au voisinage immédiat de l'équivalence (contrairement à la méthode des tangentes en pH-métrie), rend la conductimétrie particulièrement adaptée pour des titrages où l'on ne dispose que de quelques points de mesure espacés, ou pour des équivalences peu marquées en pH (par exemple, un titrage impliquant un acide très faible).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pourquoi la conductimétrie est-elle une méthode de choix pour suivre un titrage de précipitation (par exemple Ag⁺ + Cl⁻ → AgCl), alors que le pH n'évolue pas significativement au cours d'une telle réaction ?</p>
      <p><strong>Solution :</strong> Lors d'un titrage de précipitation, ce sont les concentrations en ions dissous (pas le pH) qui varient : les ions Cl⁻ disparaissent progressivement de la solution (consommés dans le précipité AgCl), tandis que des ions NO₃⁻ (contre-ion du titrant AgNO₃) s'accumulent. Cette évolution des populations ioniques en solution se traduit directement par une variation de conductivité, mesurable même en l'absence de toute variation significative de pH.</p>
      <p class="example-answer">Réponse : la conductimétrie détecte directement l'évolution des concentrations ioniques en solution, ce qui la rend efficace même pour des réactions (comme la précipitation) qui ne modifient pas significativement le pH.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La conductimétrie mesure la conductivité σ=Σλici, liée à la concentration et à la mobilité de chaque espèce ionique</li>
      <li>Les ions H⁺ et OH⁻ ont une conductivité molaire ionique exceptionnellement élevée (mécanisme de Grotthuss)</li>
      <li>La courbe de titrage conductimétrique est linéaire par morceaux, avec un changement de pente à l'équivalence</li>
      <li>L'équivalence se détermine par la méthode des deux droites (intersection des régressions linéaires avant/après)</li>
      <li>La conductimétrie détecte des réactions (précipitation, complexation) où le pH ne varie pas significativement</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Appliquer la méthode des tangentes (pH-métrie) au lieu de la méthode des deux droites pour une courbe conductimétrique</li>
      <li>Oublier la mobilité exceptionnelle de H⁺ et OH⁻ lors de l'interprétation qualitative d'une courbe de titrage conductimétrique acide-base</li>
      <li>Croire que la conductimétrie ne s'applique qu'aux titrages acido-basiques, alors qu'elle convient aussi aux précipitations et complexations</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Comment détermine-t-on l'équivalence sur une courbe de titrage conductimétrique ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm6e1" value="wrong">Par la méthode des tangentes</label>
        <label class="option"><input type="radio" name="icm6e1" value="right">Par la méthode des deux droites (intersection des régressions linéaires)</label>
        <label class="option"><input type="radio" name="icm6e1" value="wrong">En cherchant le pH=7</label>
        <label class="option"><input type="radio" name="icm6e1" value="wrong">Il n'est pas possible de déterminer l'équivalence en conductimétrie</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm6e1','icm6fb1','Correct — l\\'intersection des deux droites de régression donne directement le volume équivalent.','Relis la section sur la méthode des deux droites.')">Vérifier</button>
      <div class="feedback" id="icm6fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Pourquoi les ions H⁺ et OH⁻ ont-ils une conductivité molaire ionique exceptionnellement élevée ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm6e2" value="wrong">Parce qu'ils sont plus petits que les autres ions</label>
        <label class="option"><input type="radio" name="icm6e2" value="right">Grâce à un mécanisme de transfert de proton particulier (mécanisme de Grotthuss)</label>
        <label class="option"><input type="radio" name="icm6e2" value="wrong">Parce qu'ils sont chargés deux fois</label>
        <label class="option"><input type="radio" name="icm6e2" value="wrong">Ce n'est pas le cas, leur mobilité est comparable aux autres ions</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm6e2','icm6fb2','Correct — le mécanisme de Grotthuss (transfert de proton de molécule d\\'eau en molécule d\\'eau) est bien plus rapide qu\\'un déplacement physique classique.','Relis le point clé sur la mobilité exceptionnelle de H⁺ et OH⁻.')">Vérifier</button>
      <div class="feedback" id="icm6fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>La conductimétrie, héritière directe des travaux de Kohlrausch, reste aujourd'hui une méthode de contrôle industriel omniprésente : la mesure en continu de la conductivité de l'eau ultrapure utilisée en microélectronique ou en pharmacie permet de détecter instantanément la moindre contamination ionique, un contrôle qualité critique pour ces industries de haute pureté. Les capteurs conductimétriques miniaturisés, intégrés à des systèmes de traitement d'eau domestiques ou industriels, permettent également un suivi en temps réel de la qualité de l'eau, sans nécessiter l'intervention d'un opérateur.</p>
  <p><strong>Question ouverte :</strong> peut-on développer des capteurs conductimétriques suffisamment sélectifs pour distinguer la contribution de chaque espèce ionique individuelle dans un mélange complexe, sans avoir besoin de connaître à l'avance sa composition, comme le permet en principe la loi de Kohlrausch ? C'est un défi d'instrumentation analytique avancée.</p>
  <p><strong>Technologie émergente :</strong> les capteurs conductimétriques multi-électrodes, couplés à des algorithmes de traitement du signal, permettent aujourd'hui de discriminer partiellement la contribution de différentes espèces ioniques à la conductivité totale d'une solution complexe, une avancée précieuse pour l'analyse environnementale rapide.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Solution ionique → conductivité totale (somme des contributions ioniques, loi de Kohlrausch) → titrage suivi par variation de conductivité → remplacement d'ions par d'autres de mobilité différente → deux segments de pente distincte → équivalence (intersection des deux droites)
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$\\sigma = \\sum_i \\lambda_i^{\\circ}\\,[i]$$
    Cette loi de Kohlrausch, établie en 1876, décompose la conductivité totale d'une solution en une simple somme des contributions indépendantes de chaque espèce ionique — un principe d'une élégance remarquable qui rend possible l'interprétation quantitative de n'importe quelle courbe de titrage conductimétrique.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si tous les ions avaient exactement la même mobilité en solution : les courbes de titrage conductimétrique présenteraient-elles encore des variations de pente exploitables pour repérer l'équivalence ?</li>
      <li>Pourquoi la conductimétrie reste-t-elle une technique complémentaire indispensable à la pH-métrie, plutôt qu'une simple alternative redondante ?</li>
      <li>Quelle serait la conséquence, pour l'industrie microélectronique, d'une absence de contrôle conductimétrique en continu de la pureté de l'eau ultrapure utilisée dans ses procédés de fabrication ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>F. Kohlrausch, « Über das Leitungsvermögen der in Wasser gelösten Körper », Annalen der Physik, 1876 — l'article fondateur de la loi de migration indépendante des ions.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur la conductimétrie.</li>
      <li>R. Barbe, J. Le Bras, <em>Techniques expérimentales en chimie</em>, Dunod — référence standard sur la conductimétrie appliquée aux titrages en licence.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais interpréter n'importe quelle courbe de titrage conductimétrique et déterminer précisément son point équivalent par la méthode des deux droites. Le chapitre suivant, « Potentiométrie et mesures électrochimiques », va approfondir la famille des méthodes électrochimiques déjà entrevues avec la pH-métrie et la conductimétrie, en généralisant le principe à d'autres électrodes sélectives. Comme le rappelle la loi de Kohlrausch, d'une élégance remarquable pour son époque : décomposer un phénomène complexe (la conductivité totale) en contributions individuelles simples (chaque espèce ionique) reste l'une des démarches les plus puissantes de toute la physico-chimie.</p>
  `
};
INSTCM_NOVA_KB[icmKey("Conductimétrie et son application aux titrages")] = {
  intro: "Salut, moi c'est Nova ! On étudie la conductimétrie : mobilité ionique, courbes de titrage, méthode des deux droites. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/conductivit[ée] molaire|mobilit[ée]/i, replies:[
      "σ=Σλici : chaque ion contribue proportionnellement à sa concentration et à sa conductivité molaire ionique (liée à sa mobilité)."
    ]},
    { test:/grotthuss|h\\+.*oh-|mobilit[ée].*[ée]lev[ée]e/i, replies:[
      "H⁺ et OH⁻ ont une conductivité molaire ionique exceptionnellement élevée grâce au mécanisme de Grotthuss (transfert de proton de molécule en molécule, plus rapide qu'un déplacement physique)."
    ]},
    { test:/m[ée]thode des deux droites/i, replies:[
      "La méthode des deux droites détermine l'équivalence conductimétrique par l'intersection des régressions linéaires des deux branches de la courbe (avant/après l'équivalence)."
    ]},
    { test:/titrage.*pr[ée]cipitation|conductim[ée]trie.*pr[ée]cipitation/i, replies:[
      "La conductimétrie suit efficacement les titrages de précipitation (où le pH ne varie pas), car elle détecte directement l'évolution des concentrations ioniques en solution."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : ce n'est pas la méthode des tangentes (réservée à la pH-métrie).",
      "Indice niveau 2 : on trace deux droites de régression.",
      "Indice niveau 3 : c'est leur intersection qui donne le volume équivalent."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : ce n'est pas une question de taille ou de charge.",
      "Indice niveau 2 : c'est un mécanisme de transport particulier.",
      "Indice niveau 3 : c'est le mécanisme de Grotthuss (transfert de proton)."
    ]}
  ]
};

/* =========================== CHAPITRE 7 =========================== */
INSTCM_CHAPTERS[icmKey("Potentiométrie et mesures électrochimiques")] = {
  objectives: [
    "Décrire le principe d'une électrode indicatrice et d'une électrode de référence",
    "Comprendre la loi de Nernst appliquée à une électrode métallique",
    "Décrire le suivi potentiométrique d'un titrage redox",
    "Identifier les avantages de la potentiométrie par rapport aux indicateurs colorés",
    "Évaluer pourquoi la loi de Nernst, malgré sa forme logarithmique en apparence abstraite, explique directement et quantitativement le saut brutal de potentiel observé expérimentalement au voisinage de l'équivalence d'un titrage redox"
  ],
  prereqs: ["Titrages redox : principe et mise en œuvre"],
  bodyHtml: `
    <p>Walther Nernst, physicien et chimiste allemand, établit en 1889 la relation fondamentale qui porte aujourd'hui son nom, reliant le potentiel d'une électrode à la concentration des espèces en présence — un travail qui lui vaudra le prix Nobel de chimie en 1920, notamment pour ses contributions plus larges à la thermodynamique chimique (le troisième principe de la thermodynamique porte également son nom). Cette équation, apparemment abstraite avec son terme logarithmique, a pourtant une conséquence expérimentale spectaculaire et directement observable : elle prédit avec précision le saut brutal de potentiel qui se produit au voisinage de l'équivalence d'un titrage redox, un phénomène que tout chimiste analyste exploite quotidiennement sans toujours se souvenir de son origine théorique précise.</p>
    <p>La potentiométrie, fondée directement sur cette équation de Nernst, occupe aujourd'hui une place considérable bien au-delà du seul laboratoire de chimie analytique : elle est au cœur du fonctionnement de toutes les piles et batteries électrochimiques, du capteur d'oxygène dissous utilisé en aquaculture jusqu'aux électrodes de référence employées en recherche biomédicale. Ce chapitre te donne les bases rigoureuses de cette méthode électrochimique fondamentale, généralisant les principes déjà rencontrés avec la pH-métrie à l'ensemble des réactions d'oxydoréduction.</p>
    <p>La <strong>potentiométrie</strong> généralise le principe de la pH-métrie (cas particulier d'une électrode sensible aux H⁺) à la mesure du <strong>potentiel d'oxydoréduction</strong> d'une solution, ouvrant la voie au suivi précis de titrages redox et à la détermination de constantes thermodynamiques. À la fin de ce chapitre, tu sauras interpréter quantitativement une courbe de titrage potentiométrique et comprendre l'origine précise du saut de potentiel observé à l'équivalence.</p>

    <h3>1. Électrode indicatrice et électrode de référence</h3>
    <p>Une mesure potentiométrique repose toujours sur une <strong>pile de mesure</strong>, constituée de deux électrodes plongées dans la solution :</p>
    <table class="mini-table">
      <tr><th>Électrode</th><th>Rôle</th><th>Exemple</th></tr>
      <tr><td>Électrode indicatrice</td><td>Son potentiel varie avec la composition de la solution (espèce à doser)</td><td>Fil de platine inerte (pour un couple redox en solution), électrode métallique (Ag, Cu...)</td></tr>
      <tr><td>Électrode de référence</td><td>Potentiel fixe et connu, indépendant de la solution étudiée</td><td>Électrode au calomel saturé (ECS), électrode Ag/AgCl</td></tr>
    </table>
    <p>La différence de potentiel mesurée entre les deux électrodes renseigne directement sur le potentiel redox de la solution, relatif au potentiel fixe de référence.</p>

    <h3>2. La loi de Nernst</h3>
    <p>Pour un couple redox $\\text{Ox}+ne^- \\rightleftharpoons \\text{Red}$, le potentiel d'électrode $E$ suit la <strong>loi de Nernst</strong> :</p>
    <div class="formula-box">$$E = E^{\\circ} + \\dfrac{0{,}059}{n}\\log_{10}\\dfrac{[\\text{Ox}]}{[\\text{Red}]} \\quad \\text{(à 25°C)}$$</div>
    <p>où $E^{\\circ}$ est le potentiel standard du couple, et $n$ le nombre d'électrons échangés. Cette relation logarithmique explique pourquoi le potentiel varie <strong>brutalement</strong> à proximité de l'équivalence d'un titrage redox (variation très rapide du rapport [Ox]/[Red] lorsque l'un des deux devient minoritaire), un phénomène directement exploitable pour repérer précisément l'équivalence.</p>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La loi de Nernst comporte un terme logarithmique, souvent perçu comme une complication purement mathématique. Pourtant, c'est précisément cette forme logarithmique qui explique le saut brutal de potentiel observé à l'équivalence : au voisinage de l'équivalence, le rapport [Ox]/[Red] varie sur plusieurs ordres de grandeur pour un ajout de titrant très faible, ce qui, via le logarithme, se traduit par une variation rapide et facilement détectable du potentiel. En quoi cette propriété du logarithme — comprimer d'énormes variations de rapport de concentrations en variations modestes mais rapides de potentiel — rend-elle la potentiométrie particulièrement fiable pour repérer une équivalence ?
    </div>

    <h3>3. Suivi potentiométrique d'un titrage redox</h3>
    <p>Le suivi potentiométrique d'un titrage redox (par exemple, titrage de Fe²⁺ par Ce⁴⁺) enregistre le potentiel $E$ en fonction du volume de titrant versé, produisant une courbe présentant, comme en pH-métrie, un <strong>saut brutal</strong> de potentiel au voisinage de l'équivalence — déterminé, comme en pH-métrie, par la <strong>méthode des tangentes</strong> (cours de chimie générale).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — un avantage majeur sur l'indicateur coloré</span>
      La potentiométrie présente un avantage décisif sur le repérage par indicateur coloré : elle fonctionne même pour des <strong>solutions colorées ou troubles</strong>, où un changement de teinte serait difficile voire impossible à observer visuellement. Elle permet également de suivre l'ensemble de la courbe de titrage (pas seulement le point d'équivalence), fournissant des informations supplémentaires sur les potentiels standards des couples en présence.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Pour un couple redox à $n=1$ électron échangé, de combien varie le potentiel $E$ (à 25°C) lorsque le rapport [Ox]/[Red] passe de 10 à 0,1 (soit une inversion complète des proportions relatives) ?</p>
      <p><strong>Solution :</strong> $\\Delta E = \\dfrac{0{,}059}{1}\\left(\\log_{10}(0{,}1) - \\log_{10}(10)\\right) = 0{,}059\\times(-1-1) = -0{,}118$ V.</p>
      <p class="example-answer">Réponse : le potentiel varie de −0,118 V (soit environ 118 mV) — cette variation relativement importante, concentrée sur une faible plage de volume de titrant au voisinage de l'équivalence, explique le saut caractéristique observé sur les courbes de titrage potentiométrique.</p>
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Contrairement à la conductimétrie étudiée au chapitre précédent, qui mesure une propriété globale de la solution (la somme des contributions de tous les ions présents), la potentiométrie cible sélectivement le potentiel d'un couple redox particulier grâce au choix de l'électrode indicatrice. En quoi cette sélectivité constitue-t-elle à la fois un avantage (mesure ciblée, précise) et une limite (nécessité de choisir une électrode adaptée au couple étudié) par rapport à une méthode plus globale comme la conductimétrie ?
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>Une mesure potentiométrique combine une électrode indicatrice (sensible à la solution) et une électrode de référence (potentiel fixe)</li>
      <li>La loi de Nernst E=E°+(0,059/n)log₁₀([Ox]/[Red]) explique la variation logarithmique du potentiel avec la composition</li>
      <li>Le suivi potentiométrique d'un titrage redox produit un saut de potentiel à l'équivalence, déterminé par la méthode des tangentes</li>
      <li>La potentiométrie fonctionne même pour des solutions colorées ou troubles, contrairement aux indicateurs colorés</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Confondre électrode indicatrice (variable) et électrode de référence (potentiel fixe)</li>
      <li>Oublier le facteur 1/n dans la loi de Nernst pour un couple échangeant plusieurs électrons</li>
      <li>Croire que la potentiométrie ne s'applique qu'aux mesures de pH — elle s'étend à tout potentiel d'oxydoréduction</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">Quel est l'avantage principal de la potentiométrie sur un indicateur coloré pour repérer l'équivalence ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm7e1" value="wrong">Elle est toujours moins précise</label>
        <label class="option"><input type="radio" name="icm7e1" value="right">Elle fonctionne même pour des solutions colorées ou troubles</label>
        <label class="option"><input type="radio" name="icm7e1" value="wrong">Elle ne nécessite aucun appareil</label>
        <label class="option"><input type="radio" name="icm7e1" value="wrong">Elle est toujours plus rapide</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm7e1','icm7fb1','Correct — c\\'est l\\'avantage décisif de la potentiométrie sur le repérage visuel par indicateur coloré.','Relis le point clé sur l\\'avantage de la potentiométrie.')">Vérifier</button>
      <div class="feedback" id="icm7fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">La loi de Nernst relie le potentiel d'électrode E à :</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm7e2" value="wrong">La température seule</label>
        <label class="option"><input type="radio" name="icm7e2" value="right">Au potentiel standard E° et au rapport [Ox]/[Red]</label>
        <label class="option"><input type="radio" name="icm7e2" value="wrong">Uniquement à la concentration de l'électrode de référence</label>
        <label class="option"><input type="radio" name="icm7e2" value="wrong">Au pH de la solution uniquement</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm7e2','icm7fb2','Correct — E=E°+(0,059/n)log([Ox]/[Red]) relie le potentiel au potentiel standard et au rapport des concentrations.','Relis la formule de la loi de Nernst.')">Vérifier</button>
      <div class="feedback" id="icm7fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>Les principes électrochimiques exposés dans ce chapitre — potentiel d'électrode, couple redox, loi de Nernst — sont au cœur du fonctionnement de toutes les batteries modernes. Le prix Nobel de chimie 2019, attribué à John Goodenough, Stanley Whittingham et Akira Yoshino pour le développement des batteries lithium-ion, récompense des travaux directement fondés sur la maîtrise du potentiel d'électrode et de sa dépendance à la composition chimique des électrodes — exactement le type de relation décrit par la loi de Nernst. Au-delà des batteries, les électrodes sélectives d'ions (ESI), généralisation moderne du principe potentiométrique, permettent aujourd'hui de doser en continu et in situ des ions spécifiques (K⁺, Ca²⁺, NO₃⁻...) dans des contextes aussi variés que le suivi médical des électrolytes sanguins ou le contrôle de la qualité des eaux agricoles.</p>
  <p><strong>Question ouverte :</strong> peut-on concevoir des électrodes sélectives d'ions suffisamment robustes et peu coûteuses pour un déploiement massif de capteurs environnementaux autonomes, sans dérive de calibration sur de longues durées ? C'est un défi majeur pour la surveillance continue de la qualité de l'eau à grande échelle.</p>
  <p><strong>Technologie émergente :</strong> les biocapteurs potentiométriques, associant une électrode sélective d'ions à une enzyme ou un anticorps immobilisé, transforment une reconnaissance biologique spécifique en signal électrique mesurable — une approche exploitée notamment dans certains dispositifs de suivi du glucose sanguin.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Couple redox en solution → électrode indicatrice (sensible) + électrode de référence (potentiel fixe) → différence de potentiel mesurée → loi de Nernst relie E au rapport [Ox]/[Red] → suivi du titrage redox → saut brutal de potentiel à l'équivalence (méthode des tangentes)
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$E = E^{\\circ} + \\dfrac{0{,}059}{n}\\log_{10}\\dfrac{[\\text{Ox}]}{[\\text{Red}]}$$
    Cette équation, établie par Nernst en 1889, relie quantitativement le potentiel d'une électrode à la composition de la solution — son terme logarithmique, loin d'être une simple complexité mathématique, est précisément ce qui explique le saut brutal et facilement détectable observé à l'équivalence d'un titrage redox.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si la relation entre potentiel d'électrode et concentration était linéaire plutôt que logarithmique : le saut de potentiel observé à l'équivalence d'un titrage redox serait-il toujours aussi net et facile à repérer ?</li>
      <li>Pourquoi la potentiométrie reste-t-elle irremplaçable pour suivre des titrages effectués sur des solutions colorées ou troubles, là où d'autres méthodes de repérage échouent ?</li>
      <li>Quelle serait la conséquence, pour le suivi médical en continu des électrolytes sanguins, d'une absence d'électrodes sélectives d'ions suffisamment stables et fiables sur le long terme ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>W. Nernst, « Die elektromotorische Wirksamkeit der Ionen », Zeitschrift für physikalische Chemie, 1889 — l'article fondateur de la relation entre potentiel d'électrode et concentration.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur la potentiométrie et les électrodes sélectives d'ions.</li>
      <li>J. B. Goodenough, M. S. Whittingham, A. Yoshino, Conférences Nobel, Prix Nobel de chimie 2019 — sur le rôle du potentiel d'électrode dans la conception des batteries lithium-ion modernes.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais interpréter quantitativement une courbe de titrage potentiométrique et comprendre l'origine précise du saut de potentiel observé à l'équivalence. Le chapitre suivant, « Synthèse et caractérisation de complexes de coordination », te fera quitter le terrain des méthodes de dosage pour entrer dans celui de la synthèse inorganique proprement dite. Comme le rappelait implicitement Nernst à travers sa relation fondamentale : la clé de la compréhension d'un phénomène complexe réside souvent dans la capacité à en extraire la loi quantitative la plus simple possible.</p>
  `
};
INSTCM_NOVA_KB[icmKey("Potentiométrie et mesures électrochimiques")] = {
  intro: "Salut, moi c'est Nova ! On étudie la potentiométrie : électrodes, loi de Nernst, titrage redox. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/[ée]lectrode indicatrice|[ée]lectrode de r[ée]f[ée]rence/i, replies:[
      "L'électrode indicatrice a un potentiel variable selon la solution ; l'électrode de référence (ECS, Ag/AgCl) a un potentiel fixe et connu, servant de repère."
    ]},
    { test:/loi de nernst/i, replies:[
      "Loi de Nernst : E=E°+(0,059/n)log₁₀([Ox]/[Red]) à 25°C. Cette relation logarithmique explique le saut de potentiel observé à l'équivalence d'un titrage redox."
    ]},
    { test:/avantage.*potentiom[ée]trie/i, replies:[
      "La potentiométrie fonctionne même pour des solutions colorées ou troubles, contrairement à un indicateur coloré — et fournit toute la courbe, pas seulement l'équivalence."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense aux limites d'un indicateur coloré (solution trouble, colorée).",
      "Indice niveau 2 : la potentiométrie n'a pas cette limite.",
      "Indice niveau 3 : elle fonctionne même pour des solutions colorées ou troubles."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : relis la formule exacte de la loi de Nernst.",
      "Indice niveau 2 : elle fait intervenir E° et un rapport de concentrations.",
      "Indice niveau 3 : c'est le rapport [Ox]/[Red]."
    ]}
  ]
};

/* =========================== CHAPITRE 8 =========================== */
INSTCM_CHAPTERS[icmKey("Synthèse et caractérisation de complexes de coordination")] = {
  objectives: [
    "Décrire le principe général de la synthèse d'un complexe de coordination",
    "Appliquer la nomenclature de base des complexes de coordination",
    "Caractériser un complexe synthétisé par des méthodes physico-chimiques simples",
    "Interpréter qualitativement la couleur d'un complexe de coordination",
    "Évaluer en quoi la théorie de la coordination d'Alfred Werner, en distinguant valence classique et nombre de coordination, a permis de résoudre une anomalie que la chimie de son époque ne parvenait pas à expliquer"
  ],
  prereqs: ["Chimie minérale", "Synthèse de composés inorganiques : principes généraux"],
  bodyHtml: `
    <p>En 1893, le chimiste suisse Alfred Werner, alors âgé de seulement 26 ans, proposa une théorie audacieuse pour expliquer la structure de composés inorganiques colorés et intrigants que la chimie classique de l'époque, fondée sur la seule valence, ne parvenait pas à décrire correctement — comme le fait qu'un même ion cobalt puisse former plusieurs composés stables et distincts avec le même ligand ammoniac, en proportions variables. Sa théorie de la coordination, qui introduit la notion de « nombre de coordination » distincte de la valence classique, lui vaudra le prix Nobel de chimie en 1913, une reconnaissance rare pour un travail avant tout théorique à une époque dominée par la chimie organique de synthèse.</p>
    <p>Aujourd'hui, la chimie de coordination fondée par Werner irrigue des domaines aussi variés que la catalyse industrielle (de nombreux catalyseurs métalliques sont des complexes), la médecine (le cisplatine, complexe du platine, est un médicament anticancéreux majeur) ou la biochimie (l'hémoglobine transportant l'oxygène dans le sang repose sur un complexe fer-porphyrine). Ce chapitre conclut le cours d'Instrumentations en chimie minérale en te faisant appliquer, sur un objet chimique aussi riche que les complexes, l'ensemble des techniques de synthèse et de caractérisation déjà rencontrées.</p>
    <p>Ce dernier chapitre applique l'ensemble des techniques du cours (synthèse, purification, caractérisation) à la préparation de <strong>complexes de coordination</strong>, des composés associant un ion métallique central à des ligands, aux propriétés souvent spectaculairement colorées. À la fin de ce chapitre, tu sauras synthétiser, nommer et caractériser un complexe de coordination simple, et expliquer qualitativement l'origine de sa couleur.</p>

    <h3>1. Principe général de la synthèse d'un complexe</h3>
    <p>La synthèse d'un complexe de coordination consiste typiquement à faire réagir un sel métallique (source de l'ion central $M^{n+}$) avec un excès du ligand souhaité, en solution, dans des conditions de pH et de température adaptées à la stabilité du complexe recherché. La réaction de complexation étant généralement rapide, l'isolement du produit se fait ensuite par les techniques classiques déjà vues : précipitation par ajout d'un contre-ion adapté, évaporation partielle du solvant, ou refroidissement pour favoriser la cristallisation (cours de chimie générale, chapitre 6).</p>

    <h3>2. Rappel de nomenclature des complexes</h3>
    <p>La dénomination d'un complexe suit des règles précises : les ligands sont cités par ordre alphabétique avant le nom du métal central, avec leur nombre indiqué par un préfixe multiplicatif (di-, tri-, tétra- pour les ligands simples ; bis-, tris- pour les ligands dont le nom comporte déjà un préfixe, afin d'éviter toute ambiguïté), suivi de l'état d'oxydation du métal en chiffres romains entre parenthèses.</p>
    <table class="mini-table">
      <tr><th>Formule</th><th>Nom</th></tr>
      <tr><td>[Cu(NH₃)₄]SO₄</td><td>Sulfate de tétraamminecuivre(II)</td></tr>
      <tr><td>[Fe(H₂O)₆]Cl₃</td><td>Chlorure d'hexaaquafer(III)</td></tr>
      <tr><td>K₄[Fe(CN)₆]</td><td>Hexacyanoferrate(II) de potassium</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      La nomenclature des complexes de coordination distingue soigneusement l'état d'oxydation du métal central (indiqué en chiffres romains) du nombre de ligands qui l'entourent (indiqué par les préfixes multiplicatifs) — deux informations bien distinctes, bien qu'elles concernent le même atome central. Pourquoi est-il essentiel, du point de vue de la structure réelle du complexe, de ne jamais confondre ces deux grandeurs ?
    </div>

    <h3>3. Caractérisation d'un complexe synthétisé</h3>
    <p>Une fois le complexe isolé, sa caractérisation combine généralement plusieurs approches complémentaires :</p>
    <ul style="padding-left:22px; color:var(--ink); line-height:1.7;">
      <li><strong>Aspect et couleur</strong> : premier indice qualitatif, souvent caractéristique (voir ci-dessous)</li>
      <li><strong>Point de fusion ou de décomposition</strong> : comparé aux valeurs de référence de la littérature</li>
      <li><strong>Test de solubilité</strong> : comportement dans différents solvants</li>
      <li><strong>Dosage du métal</strong> : par les méthodes vues dans ce cours — gravimétrie (chapitre 3), complexométrie à l'EDTA (chapitre 5) — pour vérifier la stœchiométrie du complexe obtenu</li>
      <li><strong>Spectroscopie UV-Visible</strong> (cours de chimie générale, chapitre 8) : les complexes de métaux de transition présentent souvent des bandes d'absorption caractéristiques, exploitées dans les cours ultérieurs de chimie de coordination</li>
    </ul>

    <h3>4. Origine qualitative de la couleur des complexes</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La couleur souvent intense de nombreux complexes de métaux de transition provient de transitions électroniques entre orbitales <strong>d</strong> du métal central, dont les niveaux d'énergie sont modifiés (et partiellement séparés) par la présence des ligands environnants — un phénomène approfondi théoriquement dans les cours ultérieurs de chimie de coordination (théorie du champ cristallin). Ce même phénomène explique pourquoi un même ion métallique peut présenter des couleurs très différentes selon la nature des ligands qui l'entourent : par exemple, l'ion Cu²⁺ est bleu pâle en solution aqueuse ([Cu(H₂O)₆]²⁺), mais devient bleu intense en présence d'ammoniac ([Cu(NH₃)₄]²⁺), un changement observé et utilisé comme test qualitatif dès le chapitre 2 de ce cours.
    </div>

    <div class="key-point">
      <span class="eyebrow">🤔 Pause réflexive</span>
      Le changement de couleur du cuivre(II), du bleu pâle en solution aqueuse au bleu intense en présence d'ammoniac, montre qu'un même ion métallique peut présenter des propriétés optiques radicalement différentes selon son environnement chimique immédiat. En quoi ce résultat remet-il en question l'idée intuitive — mais fausse — qu'un ion métallique posséderait une couleur « propre », indépendante de son environnement ?
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> Après avoir synthétisé un complexe de cuivre(II) avec l'ammoniac, un étudiant souhaite vérifier la teneur réelle en cuivre du solide obtenu, pour confirmer sa formule proposée. Quelle méthode de ce cours est la plus directement applicable ?</p>
      <p><strong>Solution :</strong> Le dosage complexométrique par l'EDTA (chapitre 5) est particulièrement adapté : après dissolution d'une masse connue du complexe synthétisé, un titrage à l'EDTA (avec un indicateur métallochromique adapté au cuivre) permet de déterminer précisément la quantité de cuivre présente, et donc de vérifier si elle correspond à la stœchiométrie attendue de la formule proposée.</p>
      <p class="example-answer">Réponse : le titrage complexométrique à l'EDTA permet de vérifier quantitativement la teneur en cuivre du complexe synthétisé.</p>
    </div>
  `,
  extraHtml: `
  <div class="recap-box">
    <span class="eyebrow">✦ L'essentiel à retenir</span>
    <ul>
      <li>La synthèse d'un complexe fait réagir un sel métallique avec un excès de ligand, suivi d'un isolement par précipitation, évaporation ou cristallisation</li>
      <li>La nomenclature cite les ligands par ordre alphabétique avant le métal, avec préfixes multiplicatifs et état d'oxydation en chiffres romains</li>
      <li>La caractérisation combine aspect/couleur, point de fusion, solubilité, dosage du métal, et spectroscopie UV-Visible</li>
      <li>La couleur des complexes de métaux de transition provient de transitions électroniques entre orbitales d, modulées par les ligands (théorie du champ cristallin, approfondie ultérieurement)</li>
      <li>Les techniques de ce cours (gravimétrie, complexométrie) permettent de vérifier quantitativement la stœchiométrie d'un complexe synthétisé</li>
    </ul>
  </div>

  <div class="mistakes-box">
    <span class="eyebrow">⚠ Erreurs fréquentes</span>
    <ul>
      <li>Oublier l'ordre alphabétique des ligands dans la nomenclature d'un complexe</li>
      <li>Confondre préfixes multiplicatifs simples (di-, tri-) et préfixes pour ligands complexes (bis-, tris-)</li>
      <li>Se contenter de l'aspect visuel sans caractérisation quantitative pour confirmer la formule d'un complexe synthétisé</li>
    </ul>
  </div>

  <div class="exercises">
    <span class="eyebrow">Exercices</span>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 1</span>
      <p class="q">D'où provient généralement la couleur intense de nombreux complexes de métaux de transition ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm8e1" value="wrong">De la couleur propre du ligand, indépendamment du métal</label>
        <label class="option"><input type="radio" name="icm8e1" value="right">De transitions électroniques entre orbitales d du métal, modulées par les ligands</label>
        <label class="option"><input type="radio" name="icm8e1" value="wrong">D'une réaction de combustion</label>
        <label class="option"><input type="radio" name="icm8e1" value="wrong">De la présence systématique d'eau dans le complexe</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm8e1','icm8fb1','Correct — ce sont les transitions électroniques d-d, modulées par le champ des ligands, qui expliquent la couleur.','Relis le point clé sur l\\'origine de la couleur des complexes.')">Vérifier</button>
      <div class="feedback" id="icm8fb1"></div>
    </div>
    <div class="exercise-card">
      <span class="eyebrow">Exercice 2</span>
      <p class="q">Quelle méthode de ce cours permet de vérifier quantitativement la teneur en métal d'un complexe synthétisé ?</p>
      <div class="options">
        <label class="option"><input type="radio" name="icm8e2" value="wrong">L'observation de la couleur uniquement</label>
        <label class="option"><input type="radio" name="icm8e2" value="right">Le titrage complexométrique à l'EDTA</label>
        <label class="option"><input type="radio" name="icm8e2" value="wrong">La mesure du pH de la solution</label>
        <label class="option"><input type="radio" name="icm8e2" value="wrong">Aucune méthode de ce cours ne le permet</label>
      </div>
      <button class="btn btn-primary" onclick="checkAnswerGeneric('icm8e2','icm8fb2','Correct — le titrage à l\\'EDTA détermine précisément la quantité de métal présente dans le complexe synthétisé.','Relis l\\'exemple corrigé sur la vérification de la teneur en cuivre.')">Vérifier</button>
      <div class="feedback" id="icm8fb2"></div>
    </div>
  </div>

  <h3>5. Frontière de la recherche</h3>
  <p>La théorie de la coordination d'Alfred Werner, fondatrice pour son époque, continue d'irriguer des pans entiers de la chimie contemporaine. En médecine, le cisplatine — un simple complexe plan-carré de platine(II) — reste l'un des médicaments anticancéreux les plus utilisés au monde depuis sa découverte fortuite dans les années 1960, son action reposant précisément sur la capacité du platine central à se coordiner à l'ADN des cellules tumorales. En science des matériaux, les réseaux métallo-organiques (MOF, Metal-Organic Frameworks), des structures cristallines poreuses assemblant des ions métalliques et des ligands organiques rigides à très grande échelle, ouvrent des applications prometteuses pour le stockage de gaz (hydrogène, CO₂) ou la catalyse hétérogène.</p>
  <p><strong>Question ouverte :</strong> peut-on concevoir, par une ingénierie fine du ligand et du métal central, des complexes de coordination capables de cibler sélectivement les cellules cancéreuses tout en épargnant les cellules saines, réduisant ainsi les effets secondaires sévères associés aux traitements actuels comme le cisplatine ?</p>
  <p><strong>Technologie émergente :</strong> les réseaux métallo-organiques (MOF) conçus sur mesure, dont la porosité et la sélectivité chimique peuvent être ajustées en choisissant précisément le métal central et le ligand, sont aujourd'hui étudiés pour la capture sélective du CO₂ atmosphérique, un enjeu majeur pour la lutte contre le changement climatique.</p>

  <h3>Synthèse visuelle</h3>
  <div class="formula-box">
    Sel métallique + excès de ligand → réaction de complexation en solution → isolement (précipitation/évaporation/cristallisation) → caractérisation (couleur, point de fusion, solubilité, dosage du métal, spectroscopie UV-Visible) → confirmation de la formule du complexe
  </div>
  <div class="key-point">
    <span class="eyebrow">Équation maîtresse du chapitre</span>
    $$A = \\varepsilon\\,l\\,c$$
    La loi de Beer-Lambert, reliant l'absorbance $A$ d'une solution colorée au coefficient d'absorption molaire $\\varepsilon$ (caractéristique du complexe et de la transition électronique d-d en jeu), à la longueur du trajet optique $l$ et à la concentration $c$, permet de transformer l'observation qualitative d'une couleur en une mesure quantitative exploitable — le lien direct entre la richesse structurale des complexes de coordination et leur caractérisation instrumentale moderne.
  </div>

  <div class="key-point">
    <span class="eyebrow">💭 Questions de réflexion</span>
    <ul>
      <li>Et si Alfred Werner n'avait pas distingué valence classique et nombre de coordination : la structure de composés comme [Co(NH₃)₆]Cl₃ aurait-elle pu être correctement expliquée par la chimie de son époque ?</li>
      <li>Pourquoi la caractérisation d'un complexe synthétisé ne peut-elle jamais se limiter à la seule observation de sa couleur, aussi caractéristique soit-elle ?</li>
      <li>Quelle serait la conséquence, pour la chimie thérapeutique, d'une incapacité à synthétiser des complexes de coordination aussi sélectifs que le cisplatine ?</li>
    </ul>
  </div>

  <div class="recap-box">
    <span class="eyebrow">📚 Références bibliographiques</span>
    <ul>
      <li>A. Werner, « Beitrag zur Konstitution anorganischer Verbindungen », Zeitschrift für anorganische Chemie, 1893 — l'article fondateur de la théorie de la coordination.</li>
      <li>D. C. Harris, <em>Quantitative Chemical Analysis</em>, W. H. Freeman — référence internationale sur la caractérisation spectroscopique des complexes.</li>
      <li>A. Werner, Conférence Nobel, Prix Nobel de chimie 1913 — sur la théorie de la coordination et le nombre de coordination des métaux.</li>
    </ul>
  </div>

  <p style="font-style:italic; color:var(--ink-soft); margin-top:16px;">Tu sais désormais synthétiser, nommer et caractériser un complexe de coordination simple, et expliquer qualitativement l'origine de sa couleur — clôturant ainsi le cours d'Instrumentations et manipulation de chimie minérale. Le chapitre suivant t'emmènera vers les Instrumentations et manipulation de chimie organique, où les mêmes exigences de rigueur expérimentale s'appliqueront à une tout autre famille de composés. Comme le démontra Alfred Werner avec sa théorie de la coordination : les plus grandes avancées naissent souvent de la capacité à remettre en question une évidence — ici, la confusion entre valence et nombre de coordination — que personne n'avait songé à interroger avant lui.</p>
  `
};
INSTCM_NOVA_KB[icmKey("Synthèse et caractérisation de complexes de coordination")] = {
  intro: "Salut, moi c'est Nova ! On termine avec la synthèse et la caractérisation de complexes de coordination. Pose-moi une question, ou demande un indice.",
  rules: [
    { test:/nomenclature.*complexe/i, replies:[
      "Nomenclature : ligands par ordre alphabétique avant le métal, préfixes multiplicatifs (di-, tri- ou bis-, tris- pour ligands complexes), état d'oxydation du métal en chiffres romains."
    ]},
    { test:/couleur.*complexe|transition [ée]lectronique/i, replies:[
      "La couleur des complexes de métaux de transition vient de transitions électroniques entre orbitales d du métal, modulées par les ligands (théorie du champ cristallin, approfondie plus tard)."
    ]},
    { test:/caract[ée]risation.*complexe/i, replies:[
      "La caractérisation combine aspect/couleur, point de fusion, solubilité, dosage du métal (gravimétrie, EDTA), et spectroscopie UV-Visible."
    ]},
    { test:/exercice\s*1/i, hint:true, replies:[
      "Pour l'exercice 1 : pense aux orbitales impliquées dans la couleur des complexes.",
      "Indice niveau 2 : ce n'est pas une propriété du ligand seul.",
      "Indice niveau 3 : ce sont les transitions électroniques entre orbitales d du métal, modulées par les ligands."
    ]},
    { test:/exercice\s*2/i, hint:true, replies:[
      "Pour l'exercice 2 : pense aux méthodes quantitatives vues dans ce cours.",
      "Indice niveau 2 : ce n'est pas une simple observation visuelle.",
      "Indice niveau 3 : c'est le titrage complexométrique à l'EDTA."
    ]}
  ]
};

/* fusionne le module Instrumentations et manipulation de chimie minérale dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, INSTCM_CHAPTERS);
Object.assign(NOVA_KB, INSTCM_NOVA_KB);