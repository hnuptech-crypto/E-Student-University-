/* =====================================================================
   CHUNK « natsub » — registre NATSUB_CHAPTERS / NATSUB_NOVA_KB
   Matière(s) : Chimie|Chimie des substances naturelles
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   NATSUB_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — CHIMIE DES SUBSTANCES NATURELLES (L3 Chimie Fondamentale)
   6 chapitres : classification et biosynthèse des métabolites, terpènes et terpénoïdes,
   alcaloïdes, flavonoïdes et polyphénols, stéroïdes et triterpènes, méthodes
   d'extraction et d'identification des substances naturelles.
   S'appuie sur la chimie organique générale et descriptive (L1/L2) et prépare
   les méthodes chromatographiques et la chimie analytique (L3CF).
   ===================================================================================== */
const NATSUB_MATIERE = 'Chimie des substances naturelles';
function natKey(chapterTitle){ return `Chimie|${NATSUB_MATIERE}|${chapterTitle}`; }
const NATSUB_CHAPTERS = {};
const NATSUB_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
NATSUB_CHAPTERS[natKey("Classification et biosynthèse des métabolites secondaires")] = {
  objectives: [
    "Distinguer métabolisme primaire et métabolisme secondaire",
    "Identifier les trois grandes voies de biosynthèse des métabolites secondaires",
    "Reconnaître les grandes familles de substances naturelles selon leur origine biosynthétique",
    "Comprendre l'intérêt pharmacologique et écologique des métabolites secondaires"
  ],
  prereqs: ["Chimie organique générale (L1)", "Chimie organique descriptive (L2)"],
  bodyHtml: `
    <p>Les <strong>substances naturelles</strong> (ou produits naturels) sont des molécules organiques élaborées par les organismes vivants — plantes, champignons, bactéries, animaux marins. Ce cours en étudie la structure, l'origine biosynthétique et les méthodes d'étude, en s'appuyant sur les mécanismes réactionnels vus en chimie organique (L1-L2).</p>

    <h3>1. Métabolisme primaire et métabolisme secondaire</h3>
    <p>Le <strong>métabolisme primaire</strong> regroupe les voies communes à tous les organismes, indispensables à la survie de la cellule : glycolyse, cycle de Krebs, biosynthèse des acides aminés, des lipides membranaires et des acides nucléiques. Les molécules qui en résultent (glucides, protéines, lipides simples) sont universelles et peu diversifiées structuralement.</p>
    <p>Le <strong>métabolisme secondaire</strong> produit des molécules non indispensables à la survie immédiate de la cellule, mais qui confèrent à l'organisme un avantage adaptatif : défense contre les prédateurs ou les pathogènes, attraction des pollinisateurs, communication chimique, protection contre le rayonnement UV. Ces <strong>métabolites secondaires</strong> sont extrêmement diversifiés et souvent spécifiques d'une espèce ou d'une famille — c'est cette diversité structurale qui en fait une source majeure de principes actifs pharmaceutiques.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La distinction primaire/secondaire n'est pas une différence de « qualité » chimique mais de <strong>fonction biologique</strong> : un métabolite secondaire est biosynthétisé à partir des intermédiaires du métabolisme primaire (acétyl-CoA, acides aminés, glucides), dont il dérive toujours in fine.
    </div>

    <h3>2. Les trois grandes voies de biosynthèse</h3>
    <p>La quasi-totalité des métabolites secondaires dérive de trois voies biosynthétiques fondamentales, dont les intermédiaires sont eux-mêmes issus du métabolisme primaire :</p>
    <table class="mini-table">
      <tr><th>Voie</th><th>Précurseur clé</th><th>Familles produites</th></tr>
      <tr><td>Voie de l'acétate (polykétides)</td><td>acétyl-CoA / malonyl-CoA</td><td>acides gras, polyphénols simples, certains antibiotiques</td></tr>
      <tr><td>Voie du mévalonate / MEP (isoprénoïde)</td><td>unité isoprénique en C5</td><td>terpènes, terpénoïdes, stéroïdes (chapitres 2 et 5)</td></tr>
      <tr><td>Voie du shikimate</td><td>acides aminés aromatiques (Phe, Tyr, Trp)</td><td>alcaloïdes aromatiques, flavonoïdes, lignines (chapitres 3 et 4)</td></tr>
    </table>

    <h3>3. La règle isoprénique : une clé de lecture structurale</h3>
    <p>Ruzicka a montré dès les années 1950 que tous les <strong>terpènes</strong> naturels peuvent être décomposés, sur le papier, en un enchaînement d'unités <strong>isopréniques</strong> (2-méthylbuta-1,3-diène, C₅H₈) reliées « tête-à-queue » — la <strong>règle isoprénique</strong>. Cette règle biosynthétique permet, à partir de la seule formule brute d'une molécule, de prédire son origine terpénique et son nombre d'unités isopréniques.</p>

    <h3>4. Rôles écologiques et intérêt pharmacologique</h3>
    <p>Les métabolites secondaires jouent des rôles écologiques variés : répulsion ou toxicité pour les herbivores et pathogènes (alcaloïdes, terpènes amers), attraction des pollinisateurs (terpènes odorants, flavonoïdes colorés des fleurs), protection contre le stress oxydatif et les UV (polyphénols). Cette diversité fonctionnelle explique pourquoi une part très importante des médicaments actuels (morphine, quinine, taxol, digitaline...) sont soit des substances naturelles isolées telles quelles, soit des dérivés hémisynthétiques obtenus à partir d'un métabolite secondaire naturel.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le limonène a pour formule brute C₁₀H₁₆. À quelle voie de biosynthèse appartient-il, et combien d'unités isopréniques (C₅H₈) le composent ?</p>
      <p><strong>Solution :</strong> C₁₀H₁₆ correspond exactement à deux unités isopréniques (2 × C₅H₈ = C₁₀H₁₆, la cyclisation ne change pas la formule brute).</p>
      <p class="example-answer">Le limonène est un <strong>monoterpène</strong> (2 unités isopréniques), issu de la voie du mévalonate/MEP — cohérent avec son appartenance à la famille des terpènes étudiée au chapitre 2.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Métabolisme primaire : universel, indispensable à la survie ; métabolisme secondaire : diversifié, avantage adaptatif</li>
      <li>Trois voies de biosynthèse majeures : acétate (polykétides), mévalonate/MEP (isoprénoïdes), shikimate (aromatiques)</li>
      <li>Règle isoprénique de Ruzicka : tout terpène se décompose en unités C₅H₈ reliées tête-à-queue</li>
      <li>Les métabolites secondaires sont une source majeure de principes actifs pharmaceutiques</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que « secondaire » signifie « moins important » : le terme renvoie à la fonction biologique, pas à l'intérêt chimique ou pharmacologique</li>
      <li>Oublier que la cyclisation ou l'oxydation ne changent pas le nombre d'unités isopréniques déductible de la formule brute</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le métabolisme secondaire se distingue du métabolisme primaire par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat1e1" value="right">son rôle d'adaptation, non indispensable à la survie immédiate de la cellule</label>
          <label class="option"><input type="radio" name="nat1e1" value="wrong">son universalité chez tous les organismes vivants</label>
          <label class="option"><input type="radio" name="nat1e1" value="wrong">son absence totale de lien avec le métabolisme primaire</label>
          <label class="option"><input type="radio" name="nat1e1" value="wrong">sa présence exclusive chez les animaux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat1e1','nat1fb1','Correct — le métabolisme secondaire confère un avantage adaptatif, sans être vital dans l\\'immédiat.','Relis la distinction entre métabolisme primaire et secondaire.')">Vérifier</button>
        <div class="feedback" id="nat1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La voie de biosynthèse à l'origine des terpènes est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat1e2" value="right">la voie du mévalonate / MEP</label>
          <label class="option"><input type="radio" name="nat1e2" value="wrong">la voie du shikimate</label>
          <label class="option"><input type="radio" name="nat1e2" value="wrong">la voie de l'acétate</label>
          <label class="option"><input type="radio" name="nat1e2" value="wrong">le cycle de Krebs directement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat1e2','nat1fb2','Correct — les terpènes dérivent de l\\'unité isoprénique produite par la voie du mévalonate ou de la voie MEP.','Relis le tableau des trois voies de biosynthèse.')">Vérifier</button>
        <div class="feedback" id="nat1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Une molécule de formule brute C₁₅H₂₄ est composée de combien d'unités isopréniques (C₅H₈) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat1e3" value="right">3</label>
          <label class="option"><input type="radio" name="nat1e3" value="wrong">2</label>
          <label class="option"><input type="radio" name="nat1e3" value="wrong">5</label>
          <label class="option"><input type="radio" name="nat1e3" value="wrong">15</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat1e3','nat1fb3','Correct — C15H24 = 3 × C5H8 : c\\'est un sesquiterpène (3 unités isopréniques).','Applique la règle isoprénique de l\\'exemple corrigé : divise par C5H8.')">Vérifier</button>
        <div class="feedback" id="nat1fb3"></div>
      </div>
    </div>
  `
};
NATSUB_NOVA_KB[natKey("Classification et biosynthèse des métabolites secondaires")] = {
  intro: "Salut, moi c'est Nova ! On démarre la chimie des substances naturelles avec le métabolisme secondaire et les trois voies de biosynthèse. Demande-moi une explication ou un indice.",
  rules: [
    { test:/m[ée]tabolisme (primaire|secondaire)/i, replies:["Le métabolisme primaire est universel et vital ; le métabolisme secondaire est diversifié et confère un avantage adaptatif (défense, attraction, protection)."]},
    { test:/voie|biosynth[èe]se/i, replies:["Trois voies : acétate (polykétides), mévalonate/MEP (terpènes, isoprénoïdes), shikimate (composés aromatiques : alcaloïdes, flavonoïdes)."]},
    { test:/isopr[ée]nique|ruzicka/i, replies:["La règle isoprénique dit que tout terpène se décompose en unités C5H8 reliées tête-à-queue : divise la formule brute par C5H8 pour trouver le nombre d'unités."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la distinction primaire/secondaire.","Pense à ce qui est vital vs. adaptatif.","Rôle d'adaptation, non vital dans l'immédiat."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des trois voies.","Quelle voie produit l'unité isoprénique ?","La voie du mévalonate/MEP."]},
    { test:/exercice\s*3/i, hint:true, replies:["Divise la formule C15H24 par C5H8.","15/5 = 3.","3 unités isopréniques."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
NATSUB_CHAPTERS[natKey("Terpènes et terpénoïdes")] = {
  objectives: [
    "Classer les terpènes selon leur nombre d'unités isopréniques",
    "Différencier terpène (hydrocarbure) et terpénoïde (dérivé fonctionnalisé)",
    "Décrire la biosynthèse à partir de l'IPP et du DMAPP",
    "Reconnaître les grandes structures représentatives de chaque classe"
  ],
  prereqs: ["Classification et biosynthèse des métabolites secondaires"],
  bodyHtml: `
    <p>Les <strong>terpènes</strong> forment la plus vaste famille de métabolites secondaires, avec plus de 40 000 structures décrites. Le chapitre 1 a introduit la règle isoprénique ; ce chapitre en détaille la classification et la biosynthèse.</p>

    <h3>1. Classification selon le nombre d'unités isopréniques</h3>
    <table class="mini-table">
      <tr><th>Classe</th><th>Nombre d'unités C₅</th><th>Formule brute</th><th>Exemple</th></tr>
      <tr><td>Monoterpènes</td><td>2</td><td>C₁₀H₁₆</td><td>limonène, menthol (agrumes, menthe)</td></tr>
      <tr><td>Sesquiterpènes</td><td>3</td><td>C₁₅H₂₄</td><td>farnésol, artémisinine (armoise)</td></tr>
      <tr><td>Diterpènes</td><td>4</td><td>C₂₀H₃₂</td><td>taxol (if), acide gibbérellique</td></tr>
      <tr><td>Triterpènes</td><td>6</td><td>C₃₀H₄₈</td><td>squalène, précurseur des stéroïdes (chapitre 5)</td></tr>
      <tr><td>Tétraterpènes</td><td>8</td><td>C₄₀H₆₄</td><td>β-carotène (pigment orange des carottes)</td></tr>
    </table>

    <h3>2. Terpène et terpénoïde : une nuance de vocabulaire</h3>
    <p>Au sens strict, un <strong>terpène</strong> est un <em>hydrocarbure</em> (ne contenant que C et H), assemblage pur d'unités isopréniques. Un <strong>terpénoïde</strong> (ou terpène « oxydé ») dérive d'un terpène par introduction de fonctions oxygénées — alcool, cétone, aldéhyde, acide carboxylique — au cours de la biosynthèse. En pratique, l'usage courant emploie souvent « terpène » pour désigner l'ensemble de la famille (terpènes et terpénoïdes), comme le fait la règle isoprénique elle-même.</p>

    <h3>3. Biosynthèse : IPP et DMAPP, les deux briques universelles</h3>
    <p>L'unité isoprénique biologiquement active n'est pas l'isoprène lui-même, mais deux isomères activés en C₅ : l'<strong>isopentényl-diphosphate</strong> (IPP) et son isomère allylique, le <strong>diméthylallyl-diphosphate</strong> (DMAPP). Ces deux briques, produites par la voie du mévalonate (cytosol) ou la voie du MEP (plastes), se condensent tête-à-queue de façon répétée :</p>
    <div class="formula-box">$$\\text{DMAPP} + \\text{IPP} \\longrightarrow \\text{géranyl-PP (C}_{10}\\text{)} \\xrightarrow{+\\,\\text{IPP}} \\text{farnésyl-PP (C}_{15}\\text{)} \\xrightarrow{+\\,\\text{IPP}} \\text{géranylgéranyl-PP (C}_{20}\\text{)}$$</div>
    <p>Ces diphosphates allyliques (géranyl-PP, farnésyl-PP, géranylgéranyl-PP) sont les précurseurs directs respectivement des monoterpènes, sesquiterpènes et diterpènes ; leur cyclisation enzymatique, suivie d'oxydations éventuelles, engendre l'immense diversité structurale de la famille.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Les triterpènes (C₃₀) ne se forment pas par simple addition d'IPP sur le farnésyl-PP : ils résultent de la <strong>dimérisation tête-à-tête</strong> de deux unités farnésyl-PP (C₁₅ + C₁₅), donnant le <strong>squalène</strong> — voie biosynthétique distincte, à l'origine des stéroïdes (chapitre 5).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le β-carotène (pigment de la carotte) a pour formule brute C₄₀H₅₆. À quelle classe de terpénoïdes appartient-il ?</p>
      <p><strong>Solution :</strong> C₄₀ correspond à 8 unités isopréniques (8 × C₅ = C₄₀) ; c'est bien un tétraterpène (issu, comme les triterpènes, d'une dimérisation — ici de deux géranylgéranyl-PP en C₂₀).</p>
      <p class="example-answer">Le β-carotène est un <strong>tétraterpène</strong> ; sa longue chaîne de doubles liaisons conjuguées (non détaillée ici) explique sa couleur orangée intense, utilisée comme colorant alimentaire et précurseur de la vitamine A.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Classification par nombre d'unités C5 : mono (C10), sesqui (C15), di (C20), tri (C30), tétraterpènes (C40)</li>
      <li>Terpène = hydrocarbure pur ; terpénoïde = terpène fonctionnalisé (O)</li>
      <li>IPP et DMAPP, condensés tête-à-queue, donnent géranyl-PP, farnésyl-PP, géranylgéranyl-PP</li>
      <li>Triterpènes et tétraterpènes : dimérisation tête-à-tête (2×farnésyl-PP → squalène ; 2×géranylgéranyl-PP → C40)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre terpène (hydrocarbure strict) et terpénoïde (dérivé oxygéné) : la plupart des molécules odorantes courantes (menthol, géraniol) sont en réalité des terpénoïdes</li>
      <li>Croire que les triterpènes s'obtiennent par simple addition d'IPP sur le farnésyl-PP, alors qu'ils résultent d'une dimérisation tête-à-tête</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un sesquiterpène possède :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat2e1" value="right">3 unités isopréniques (C15)</label>
          <label class="option"><input type="radio" name="nat2e1" value="wrong">2 unités isopréniques (C10)</label>
          <label class="option"><input type="radio" name="nat2e1" value="wrong">4 unités isopréniques (C20)</label>
          <label class="option"><input type="radio" name="nat2e1" value="wrong">6 unités isopréniques (C30)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat2e1','nat2fb1','Correct — sesqui- signifie « une fois et demie » (1,5 × 2 = 3 unités), soit C15.','Relis le tableau de classification des terpènes.')">Vérifier</button>
        <div class="feedback" id="nat2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Les deux briques activées universelles de la biosynthèse des terpènes sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat2e2" value="right">IPP et DMAPP</label>
          <label class="option"><input type="radio" name="nat2e2" value="wrong">acétyl-CoA et malonyl-CoA</label>
          <label class="option"><input type="radio" name="nat2e2" value="wrong">glucose et fructose</label>
          <label class="option"><input type="radio" name="nat2e2" value="wrong">phénylalanine et tyrosine</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat2e2','nat2fb2','Correct — IPP et DMAPP se condensent tête-à-queue pour former géranyl-PP, farnésyl-PP, etc.','Relis la section sur la biosynthèse : IPP et DMAPP.')">Vérifier</button>
        <div class="feedback" id="nat2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le squalène (précurseur des stéroïdes) se forme par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat2e3" value="right">dimérisation tête-à-tête de deux farnésyl-PP</label>
          <label class="option"><input type="radio" name="nat2e3" value="wrong">addition simple d'IPP sur le géranyl-PP</label>
          <label class="option"><input type="radio" name="nat2e3" value="wrong">condensation de deux molécules de glucose</label>
          <label class="option"><input type="radio" name="nat2e3" value="wrong">oxydation directe du limonène</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat2e3','nat2fb3','Correct — c\\'est exactement le point clé du cours sur les triterpènes.','Relis le point clé sur la dimérisation tête-à-tête des triterpènes.')">Vérifier</button>
        <div class="feedback" id="nat2fb3"></div>
      </div>
    </div>
  `
};
NATSUB_NOVA_KB[natKey("Terpènes et terpénoïdes")] = {
  intro: "Salut, c'est Nova ! On étudie la classification des terpènes et leur biosynthèse via IPP/DMAPP. Demande-moi une explication ou un indice.",
  rules: [
    { test:/mono|sesqui|di|tri|t[ée]traterp[èe]ne/i, replies:["Classification par unités C5 : mono (C10, 2 unités), sesqui (C15, 3), di (C20, 4), tri (C30, 6, dimérisation), tétra (C40, 8, dimérisation)."]},
    { test:/ipp|dmapp/i, replies:["IPP (isopentényl-PP) et DMAPP (diméthylallyl-PP) sont les deux briques activées en C5 qui se condensent tête-à-queue pour bâtir tous les terpènes."]},
    { test:/squal[èe]ne|dim[ée]risation/i, replies:["Le squalène (C30) vient de la dimérisation tête-à-tête de deux farnésyl-PP (C15+C15), et non d'une simple addition d'IPP."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau de classification.","« Sesqui » = une fois et demie.","3 unités, C15."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur la biosynthèse.","Ce sont deux isomères en C5.","IPP et DMAPP."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis le point clé sur les triterpènes.","Deux C15 s'assemblent tête-à-tête.","Dimérisation de deux farnésyl-PP."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
NATSUB_CHAPTERS[natKey("Alcaloïdes")] = {
  objectives: [
    "Définir un alcaloïde et reconnaître son critère structural commun",
    "Classer les alcaloïdes selon leur précurseur en acide aminé",
    "Relier structure et propriété basique (protonation, salification)",
    "Citer des exemples représentatifs et leurs activités pharmacologiques"
  ],
  prereqs: ["Classification et biosynthèse des métabolites secondaires"],
  bodyHtml: `
    <p>Les <strong>alcaloïdes</strong> forment une famille de métabolites secondaires unis non par leur origine biosynthétique (contrairement aux terpènes) mais par un critère structural commun : la présence d'un <strong>atome d'azote basique</strong>, le plus souvent inclus dans un cycle hétérocyclique.</p>

    <h3>1. Définition et propriété fondamentale</h3>
    <p>Un alcaloïde est une molécule organique naturelle, azotée, d'origine le plus souvent végétale, dont l'azote présente un caractère <strong>basique</strong> (doublet libre disponible, comme dans une amine). Cette basicité permet la <strong>protonation</strong> de l'azote en milieu acide et la formation de sels (chlorhydrates, sulfates), une propriété exploitée en extraction (chapitre 6) comme en formulation pharmaceutique — la plupart des alcaloïdes médicamenteux sont commercialisés sous forme de sel, plus soluble en milieu aqueux que la base libre.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ne pas confondre un alcaloïde avec n'importe quelle amine naturelle : par convention, on exclut de la famille les amines biogènes simples issues directement d'un acide aminé par simple décarboxylation (comme l'histamine ou la dopamine), réservant le terme « alcaloïde » aux structures plus élaborées, généralement cycliques.
    </div>

    <h3>2. Classification selon le précurseur biosynthétique</h3>
    <p>À la différence des terpènes (précurseur isoprénique unique), les alcaloïdes dérivent de plusieurs acides aminés différents selon la famille structurale :</p>
    <table class="mini-table">
      <tr><th>Précurseur (acide aminé)</th><th>Classe d'alcaloïdes</th><th>Exemple</th></tr>
      <tr><td>Ornithine / lysine</td><td>alcaloïdes pyrrolidiniques / pipéridiniques</td><td>nicotine (tabac), coniine (ciguë)</td></tr>
      <tr><td>Tyrosine</td><td>alcaloïdes isoquinoléiques</td><td>morphine, codéine (pavot)</td></tr>
      <tr><td>Tryptophane</td><td>alcaloïdes indoliques</td><td>quinine (quinquina), strychnine</td></tr>
      <tr><td>Histidine / acide nicotinique</td><td>alcaloïdes puriques</td><td>caféine, théobromine</td></tr>
    </table>

    <h3>3. Structure et basicité : le rôle du doublet libre</h3>
    <p>La force de la base dépend fortement de la disponibilité du doublet libre de l'azote. Un azote dont le doublet est délocalisé dans un système aromatique (comme dans un pyrrole ou un indole non protoné sur l'azote endocyclique aromatique) est beaucoup moins basique qu'un azote d'amine tertiaire aliphatique, dont le doublet est pleinement disponible pour la protonation — un critère à retenir pour comparer la basicité de deux alcaloïdes de structures différentes.</p>

    <h3>4. Toxicité, pharmacologie et enjeux</h3>
    <p>Beaucoup d'alcaloïdes sont de puissants poisons à forte dose (strychnine, coniine) mais des médicaments précieux à dose contrôlée (morphine comme analgésique majeur, quinine comme antipaludique historique). Cette dualité illustre le principe pharmacologique fondamental selon lequel <em>c'est la dose qui fait le poison</em> — un enjeu central de la relation structure-activité étudiée en pharmacochimie.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la caféine, extraite du café, provient de quel acide aminé précurseur ? Justifier par sa classe structurale.</p>
      <p><strong>Solution :</strong> la caféine appartient à la famille des <strong>alcaloïdes puriques</strong> (elle possède un noyau purine, comme l'adénine et la guanine des acides nucléiques).</p>
      <p class="example-answer">Elle dérive de la voie de biosynthèse des bases puriques, à partir de l'histidine et de l'acide nicotinique, et non de la tyrosine ou du tryptophane, précurseurs respectifs des alcaloïdes isoquinoléiques et indoliques.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Alcaloïde : métabolite secondaire azoté, à azote basique, le plus souvent hétérocyclique</li>
      <li>Classification par acide aminé précurseur : ornithine/lysine, tyrosine, tryptophane, histidine</li>
      <li>Basicité liée à la disponibilité du doublet libre de l'azote (aromatique délocalisé vs. amine tertiaire aliphatique)</li>
      <li>Nombreux alcaloïdes médicamenteux commercialisés sous forme de sel (solubilité aqueuse accrue)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Considérer toute molécule azotée naturelle comme un alcaloïde, sans tenir compte du critère de basicité et de la convention excluant les amines biogènes simples</li>
      <li>Oublier que l'aromaticité d'un azote délocalisé réduit fortement sa basicité par rapport à une amine aliphatique</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le critère structural qui définit un alcaloïde est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat3e1" value="right">la présence d'un azote basique, généralement hétérocyclique</label>
          <label class="option"><input type="radio" name="nat3e1" value="wrong">une origine biosynthétique isoprénique unique</label>
          <label class="option"><input type="radio" name="nat3e1" value="wrong">la présence d'un cycle aromatique benzénique</label>
          <label class="option"><input type="radio" name="nat3e1" value="wrong">l'absence totale d'atome d'azote</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat3e1','nat3fb1','Correct — c\\'est l\\'azote basique qui unit les alcaloïdes, à la différence des terpènes définis par leur origine biosynthétique.','Relis la définition et la propriété fondamentale des alcaloïdes.')">Vérifier</button>
        <div class="feedback" id="nat3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La morphine, alcaloïde isoquinoléique, dérive de quel acide aminé précurseur ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat3e2" value="right">la tyrosine</label>
          <label class="option"><input type="radio" name="nat3e2" value="wrong">le tryptophane</label>
          <label class="option"><input type="radio" name="nat3e2" value="wrong">l'ornithine</label>
          <label class="option"><input type="radio" name="nat3e2" value="wrong">l'histidine</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat3e2','nat3fb2','Correct — les alcaloïdes isoquinoléiques (morphine, codéine) dérivent de la tyrosine.','Relis le tableau de classification des alcaloïdes par précurseur.')">Vérifier</button>
        <div class="feedback" id="nat3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Un azote dont le doublet libre est délocalisé dans un cycle aromatique est, en général :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat3e3" value="right">moins basique qu'un azote d'amine tertiaire aliphatique</label>
          <label class="option"><input type="radio" name="nat3e3" value="wrong">plus basique qu'un azote d'amine tertiaire aliphatique</label>
          <label class="option"><input type="radio" name="nat3e3" value="wrong">totalement dépourvu de caractère basique dans tous les cas</label>
          <label class="option"><input type="radio" name="nat3e3" value="wrong">indifférent à toute protonation</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat3e3','nat3fb3','Correct — la délocalisation aromatique du doublet réduit sa disponibilité pour la protonation.','Relis la section sur structure et basicité.')">Vérifier</button>
        <div class="feedback" id="nat3fb3"></div>
      </div>
    </div>
  `
};
NATSUB_NOVA_KB[natKey("Alcaloïdes")] = {
  intro: "Salut, c'est Nova ! On étudie les alcaloïdes : azote basique, classification par précurseur, et pharmacologie. Demande-moi une explication ou un indice.",
  rules: [
    { test:/alcalo[iï]de/i, replies:["Un alcaloïde est un métabolite secondaire azoté, dont l'azote est basique (souvent dans un hétérocycle) — critère structural, pas biosynthétique."]},
    { test:/tyrosine|tryptophane|ornithine|histidine|pr[ée]curseur/i, replies:["Classification par précurseur : ornithine/lysine → pyrrolidiniques/pipéridiniques ; tyrosine → isoquinoléiques ; tryptophane → indoliques ; histidine → puriques."]},
    { test:/basicit[ée]|doublet/i, replies:["La basicité dépend de la disponibilité du doublet de l'azote : délocalisé dans un aromatique = moins basique ; amine tertiaire aliphatique = plus basique."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la définition de l'alcaloïde.","Pense au critère structural, pas biosynthétique.","Un azote basique, souvent hétérocyclique."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau de classification.","La morphine est isoquinoléique.","La tyrosine."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur structure et basicité.","La délocalisation retire de la disponibilité au doublet.","Moins basique."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
NATSUB_CHAPTERS[natKey("Flavonoïdes et polyphénols")] = {
  objectives: [
    "Décrire le squelette carboné commun des flavonoïdes (C6-C3-C6)",
    "Distinguer les principales sous-classes de flavonoïdes",
    "Relier structure polyphénolique et propriété antioxydante",
    "Comprendre l'origine biosynthétique mixte (shikimate + acétate)"
  ],
  prereqs: ["Classification et biosynthèse des métabolites secondaires"],
  bodyHtml: `
    <p>Les <strong>flavonoïdes</strong> constituent l'une des plus grandes familles de <strong>polyphénols</strong> végétaux, responsables d'une large part des couleurs (fleurs, fruits, feuilles d'automne) et des propriétés antioxydantes attribuées à de nombreux aliments d'origine végétale.</p>

    <h3>1. Le squelette de base C6-C3-C6</h3>
    <p>Tous les flavonoïdes partagent un squelette carboné commun de 15 atomes de carbone, organisé en trois cycles : deux cycles aromatiques (notés A et B) reliés par une chaîne en C3 qui se referme le plus souvent en un troisième cycle hétérocyclique oxygéné (cycle C, un chromane ou chromène). On note ce squelette <strong>C6-C3-C6</strong>.</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — une origine biosynthétique mixte</span>
      Contrairement aux terpènes (voie unique du mévalonate) ou aux alcaloïdes (un seul acide aminé précurseur), les flavonoïdes résultent de la <strong>convergence de deux voies</strong> : le cycle B et la chaîne C3 proviennent de la voie du <strong>shikimate</strong> (via la phénylalanine), tandis que le cycle A est construit par condensation de trois unités <strong>malonyl-CoA</strong> (voie de l'acétate/polykétides) — un bel exemple de coopération entre deux voies métaboliques distinctes.
    </div>

    <h3>2. Les principales sous-classes</h3>
    <p>Le degré d'oxydation et la position des substituants sur le cycle C permettent de distinguer plusieurs sous-classes de flavonoïdes :</p>
    <table class="mini-table">
      <tr><th>Sous-classe</th><th>Caractéristique structurale</th><th>Exemple / source</th></tr>
      <tr><td>Flavones</td><td>double liaison C2-C3, pas d'OH en C3</td><td>apigénine (persil, céleri)</td></tr>
      <tr><td>Flavonols</td><td>flavone + OH en C3</td><td>quercétine (oignon, pomme)</td></tr>
      <tr><td>Flavanones</td><td>C2-C3 saturée, cétone en C4</td><td>naringénine (agrumes)</td></tr>
      <tr><td>Anthocyanidines</td><td>cycle C sous forme de cation flavylium</td><td>cyanidine (pigments rouges/bleus des fruits)</td></tr>
      <tr><td>Isoflavones</td><td>cycle B en position 3 (et non 2)</td><td>génistéine (soja)</td></tr>
    </table>
    <p>Dans la plante, ces molécules sont fréquemment liées à un ou plusieurs sucres par une liaison <em>O</em>-glycosidique (formant un <strong>hétéroside</strong>), ce qui augmente leur solubilité aqueuse et modifie leurs propriétés par rapport à la forme aglycone (non glycosylée).</p>

    <h3>3. Structure polyphénolique et propriété antioxydante</h3>
    <p>La propriété antioxydante des flavonoïdes provient directement de la présence de plusieurs groupements <strong>hydroxyle phénolique</strong> sur les cycles A et B. Un phénol cède facilement un atome d'hydrogène (avec son électron) à un radical libre, formant un radical phénoxyle stabilisé par délocalisation dans le cycle aromatique — bien plus stable, et donc bien moins réactif, que le radical initial. Le nombre et la position des groupements OH (en particulier un diol ortho sur le cycle B, dit « catéchol ») déterminent l'intensité du pouvoir antioxydant d'une molécule donnée.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la couleur rouge à bleue de nombreux fruits (myrtille, raisin, cerise) est due à quelle sous-classe de flavonoïdes, et quelle est la particularité structurale de son cycle C ?</p>
      <p><strong>Solution :</strong> il s'agit des <strong>anthocyanidines</strong>, dont le cycle C porte une charge positive : le cation <strong>flavylium</strong>.</p>
      <p class="example-answer">Cette charge positive délocalisée sur l'ensemble du système aromatique explique à la fois la couleur intense de ces pigments et leur forte sensibilité au pH du milieu (rouge en milieu acide, bleu-violet en milieu plus basique) — une propriété exploitée en biochimie comme indicateur coloré naturel.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Squelette commun C6-C3-C6 : deux cycles aromatiques (A, B) reliés par une chaîne C3 souvent cyclisée (cycle C)</li>
      <li>Origine biosynthétique mixte : cycle B + C3 par la voie du shikimate, cycle A par 3 malonyl-CoA</li>
      <li>Sous-classes principales : flavones, flavonols, flavanones, anthocyanidines, isoflavones</li>
      <li>Pouvoir antioxydant lié aux groupements OH phénoliques, stabilisant le radical phénoxyle par délocalisation</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que tous les flavonoïdes dérivent d'une seule voie de biosynthèse, alors que cycle A et cycle B/C3 ont des origines distinctes</li>
      <li>Confondre la forme aglycone (sans sucre) et l'hétéroside (avec sucre lié par liaison O-glycosidique), qui diffèrent en solubilité</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le squelette carboné commun de tous les flavonoïdes est noté :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat4e1" value="right">C6-C3-C6</label>
          <label class="option"><input type="radio" name="nat4e1" value="wrong">C5-C5-C5</label>
          <label class="option"><input type="radio" name="nat4e1" value="wrong">C10-C10</label>
          <label class="option"><input type="radio" name="nat4e1" value="wrong">C6-C6-C6</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat4e1','nat4fb1','Correct — deux cycles aromatiques en C6 reliés par une chaîne en C3.','Relis la section sur le squelette de base des flavonoïdes.')">Vérifier</button>
        <div class="feedback" id="nat4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le cycle A des flavonoïdes provient de la condensation de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat4e2" value="right">trois unités malonyl-CoA (voie de l'acétate)</label>
          <label class="option"><input type="radio" name="nat4e2" value="wrong">deux unités isopréniques</label>
          <label class="option"><input type="radio" name="nat4e2" value="wrong">un seul acide aminé aromatique</label>
          <label class="option"><input type="radio" name="nat4e2" value="wrong">du glucose exclusivement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat4e2','nat4fb2','Correct — c\\'est le point clé du cours sur l\\'origine biosynthétique mixte des flavonoïdes.','Relis le point clé sur l\\'origine biosynthétique mixte.')">Vérifier</button>
        <div class="feedback" id="nat4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le pouvoir antioxydant des flavonoïdes est principalement dû à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat4e3" value="right">la présence de groupements hydroxyle phénolique</label>
          <label class="option"><input type="radio" name="nat4e3" value="wrong">la présence exclusive de doubles liaisons C=C</label>
          <label class="option"><input type="radio" name="nat4e3" value="wrong">la liaison à un sucre (hétéroside)</label>
          <label class="option"><input type="radio" name="nat4e3" value="wrong">l'absence totale d'oxygène dans la molécule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat4e3','nat4fb3','Correct — les OH phénoliques cèdent un H à un radical libre, formant un radical phénoxyle stabilisé.','Relis la section sur structure polyphénolique et propriété antioxydante.')">Vérifier</button>
        <div class="feedback" id="nat4fb3"></div>
      </div>
    </div>
  `
};
NATSUB_NOVA_KB[natKey("Flavonoïdes et polyphénols")] = {
  intro: "Salut, c'est Nova ! On étudie les flavonoïdes : squelette C6-C3-C6, sous-classes, et pouvoir antioxydant. Demande-moi une explication ou un indice.",
  rules: [
    { test:/squelette|c6-c3-c6/i, replies:["Le squelette commun des flavonoïdes est C6-C3-C6 : deux cycles aromatiques (A et B) reliés par une chaîne en C3, souvent cyclisée en cycle C."]},
    { test:/flavone|flavonol|flavanone|anthocyanidine|isoflavone/i, replies:["Les sous-classes se distinguent par le degré d'oxydation du cycle C : flavones, flavonols (OH en C3), flavanones (saturées), anthocyanidines (cation flavylium), isoflavones (cycle B en position 3)."]},
    { test:/antioxydant|ph[ée]nol|oh/i, replies:["Le pouvoir antioxydant vient des OH phénoliques : ils cèdent un H à un radical libre, formant un radical phénoxyle stabilisé par délocalisation aromatique."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le squelette de base.","Deux cycles en C6, reliés par C3.","C6-C3-C6."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur l'origine mixte.","Le cycle A vient de la voie de l'acétate.","Trois unités malonyl-CoA."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur l'antioxydant.","Pense aux groupements OH sur les cycles.","Les groupements hydroxyle phénolique."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
NATSUB_CHAPTERS[natKey("Stéroïdes et triterpènes")] = {
  objectives: [
    "Reconnaître le squelette stérane (cyclopentanoperhydrophénanthrène)",
    "Relier la biosynthèse du squalène à celle des stéroïdes via le lanostérol",
    "Distinguer les grandes familles de stéroïdes naturels selon leur fonction",
    "Comprendre le rôle biologique du cholestérol comme précurseur universel"
  ],
  prereqs: ["Terpènes et terpénoïdes"],
  bodyHtml: `
    <p>Les <strong>stéroïdes</strong> forment une famille particulière de terpénoïdes : bien qu'issus de la voie isoprénique étudiée au chapitre 2, leur squelette caractéristique et leur importance biologique (hormones, vitamines, stérols membranaires) justifient un chapitre dédié.</p>

    <h3>1. Le squelette stérane : quatre cycles fusionnés</h3>
    <p>Tous les stéroïdes partagent un squelette carboné commun de 17 atomes de carbone, le <strong>stérane</strong> (ou cyclopentanoperhydrophénanthrène) : trois cycles à six atomes (A, B, C) fusionnés à un cycle à cinq atomes (D). Ce squelette rigide, sur lequel viennent se greffer des substituants variables (chaîne latérale en C17, groupements méthyles angulaires, fonctions oxygénées), distingue immédiatement un stéroïde de tout autre terpénoïde.</p>

    <h3>2. Du squalène au lanostérol : la cyclisation clé</h3>
    <p>Le chapitre 2 a montré que le squalène (C₃₀, triterpène linéaire) provient de la dimérisation tête-à-tête de deux farnésyl-PP. La biosynthèse des stéroïdes se poursuit par une étape spectaculaire : l'<strong>époxydation</strong> du squalène en 2,3-époxysqualène, suivie d'une <strong>cyclisation enzymatique en cascade</strong> qui forme, en une seule étape catalysée par l'oxydosqualène-cyclase, les quatre cycles du <strong>lanostérol</strong> — précurseur de tous les stéroïdes animaux et fongiques (les plantes empruntent une voie voisine aboutissant au cycloarténol).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Le <strong>cholestérol</strong>, obtenu à partir du lanostérol par une série de démethylations et de réductions, est le <strong>précurseur universel</strong> de tous les autres stéroïdes animaux : hormones stéroïdiennes, acides biliaires, vitamine D. C'est cette centralité biosynthétique qui explique pourquoi le cholestérol, bien qu'associé aux maladies cardiovasculaires en excès, reste indispensable à la physiologie cellulaire (membranes, précurseur hormonal).
    </div>

    <h3>3. Les grandes familles de stéroïdes naturels</h3>
    <table class="mini-table">
      <tr><th>Famille</th><th>Rôle biologique</th><th>Exemple</th></tr>
      <tr><td>Stérols</td><td>constituant structural des membranes cellulaires</td><td>cholestérol (animaux), ergostérol (champignons)</td></tr>
      <tr><td>Hormones sexuelles</td><td>régulation de la reproduction</td><td>testostérone, œstradiol, progestérone</td></tr>
      <tr><td>Corticostéroïdes</td><td>régulation métabolique et immunitaire</td><td>cortisol, aldostérone</td></tr>
      <tr><td>Acides biliaires</td><td>émulsification des graisses lors de la digestion</td><td>acide cholique</td></tr>
      <tr><td>Hétérosides cardiotoniques</td><td>action sur la contractilité cardiaque</td><td>digitaline (digitale)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi le cholestérol (C₂₇), bien qu'issu du squalène (C₃₀, un triterpène), n'est-il pas considéré comme un triterpène au sens strict ?</p>
      <p><strong>Solution :</strong> la biosynthèse du cholestérol implique la perte de trois groupements méthyle par démethylations successives à partir du lanostérol (C₃₀), ramenant le squelette à 27 atomes de carbone.</p>
      <p class="example-answer">Le cholestérol a perdu la stricte multiplicité de 5 en carbone caractéristique de la règle isoprénique (27 n'est pas un multiple de 5) ; on le classe donc comme <strong>stéroïde</strong>, catégorie distincte bien qu'issue biosynthétiquement de la famille des triterpènes.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Squelette stérane : trois cycles à 6 atomes (A, B, C) fusionnés à un cycle à 5 atomes (D)</li>
      <li>Squalène → époxysqualène → lanostérol (cyclisation enzymatique en cascade) → cholestérol</li>
      <li>Le cholestérol est le précurseur universel des stéroïdes animaux (hormones, acides biliaires, vitamine D)</li>
      <li>Grandes familles : stérols, hormones sexuelles, corticostéroïdes, acides biliaires, hétérosides cardiotoniques</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Classer le cholestérol comme triterpène simplement parce qu'il en dérive biosynthétiquement : son nombre de carbones (27) n'est plus multiple de 5</li>
      <li>Oublier que la cyclisation du squalène se fait en une seule étape enzymatique en cascade, et non par cyclisations successives indépendantes</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Le squelette stérane commun à tous les stéroïdes est constitué de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat5e1" value="right">trois cycles à 6 atomes fusionnés à un cycle à 5 atomes</label>
          <label class="option"><input type="radio" name="nat5e1" value="wrong">quatre cycles à 6 atomes identiques</label>
          <label class="option"><input type="radio" name="nat5e1" value="wrong">un seul cycle aromatique</label>
          <label class="option"><input type="radio" name="nat5e1" value="wrong">deux cycles à 5 atomes seulement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat5e1','nat5fb1','Correct — c\\'est le cyclopentanoperhydrophénanthrène : cycles A, B, C (6 atomes) et D (5 atomes).','Relis la section sur le squelette stérane.')">Vérifier</button>
        <div class="feedback" id="nat5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le précurseur direct de tous les stéroïdes animaux, obtenu par cyclisation du squalène, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat5e2" value="right">le lanostérol</label>
          <label class="option"><input type="radio" name="nat5e2" value="wrong">le farnésyl-PP</label>
          <label class="option"><input type="radio" name="nat5e2" value="wrong">le géranylgéranyl-PP</label>
          <label class="option"><input type="radio" name="nat5e2" value="wrong">l'IPP directement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat5e2','nat5fb2','Correct — la cyclisation en cascade du 2,3-époxysqualène forme directement le lanostérol.','Relis la section « Du squalène au lanostérol ».')">Vérifier</button>
        <div class="feedback" id="nat5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Le cholestérol n'est pas classé comme triterpène car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat5e3" value="right">son nombre de carbones (27) n'est plus multiple de 5, après démethylations</label>
          <label class="option"><input type="radio" name="nat5e3" value="wrong">il ne dérive pas du squalène</label>
          <label class="option"><input type="radio" name="nat5e3" value="wrong">il ne contient aucun cycle</label>
          <label class="option"><input type="radio" name="nat5e3" value="wrong">il est d'origine purement synthétique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat5e3','nat5fb3','Correct — exactement le raisonnement de l\\'exemple corrigé.','Reprends le raisonnement de l\\'exemple corrigé sur le cholestérol.')">Vérifier</button>
        <div class="feedback" id="nat5fb3"></div>
      </div>
    </div>
  `
};
NATSUB_NOVA_KB[natKey("Stéroïdes et triterpènes")] = {
  intro: "Salut, c'est Nova ! On étudie le squelette stérane et la biosynthèse squalène → lanostérol → cholestérol. Demande-moi une explication ou un indice.",
  rules: [
    { test:/st[ée]rane|squelette/i, replies:["Le stérane, squelette commun à tous les stéroïdes, comporte trois cycles à 6 atomes (A, B, C) fusionnés à un cycle à 5 atomes (D)."]},
    { test:/lanost[ée]rol|squal[èe]ne|cyclisation/i, replies:["Le squalène s'époxyde puis se cyclise en cascade (une seule étape enzymatique) pour former directement le lanostérol, précurseur de tous les stéroïdes animaux."]},
    { test:/cholest[ée]rol/i, replies:["Le cholestérol est le précurseur universel des stéroïdes animaux (hormones, acides biliaires, vitamine D), obtenu à partir du lanostérol par démethylations."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur le squelette stérane.","3 cycles à 6, 1 cycle à 5.","Trois cycles à 6 atomes + un cycle à 5 atomes."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur la cyclisation du squalène.","C'est le produit direct de la cyclisation.","Le lanostérol."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé sur le cholestérol.","Compte les carbones : 27 n'est pas multiple de 5.","27 carbones, non multiple de 5."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
NATSUB_CHAPTERS[natKey("Méthodes d'extraction et d'identification des substances naturelles")] = {
  objectives: [
    "Choisir une méthode d'extraction adaptée selon la polarité et la stabilité de la cible",
    "Exploiter la basicité des alcaloïdes pour une extraction acido-basique sélective",
    "Décrire le principe de l'hydrodistillation pour les huiles essentielles volatiles",
    "Identifier les techniques d'identification structurale d'une substance naturelle isolée"
  ],
  prereqs: ["Alcaloïdes", "Stéroïdes et triterpènes"],
  bodyHtml: `
    <p>Une fois la diversité structurale des substances naturelles présentée (chapitres 1 à 5), ce chapitre en aborde l'aspect pratique : comment extraire sélectivement une molécule d'origine naturelle depuis une matrice biologique complexe, puis en confirmer la structure. Ces méthodes préparent directement les techniques instrumentales détaillées en méthodes chromatographiques et en chimie analytique.</p>

    <h3>1. Choisir un solvant selon la polarité de la cible</h3>
    <p>Le principe de base de toute extraction liquide-liquide ou solide-liquide est la règle <em>« qui se ressemble s'assemble »</em> : un solvant apolaire (hexane, éther de pétrole) extrait préférentiellement les molécules apolaires (terpènes hydrocarbonés, cires, certains stéroïdes), tandis qu'un solvant polaire protique (méthanol, éthanol-eau) extrait les composés polaires (flavonoïdes glycosylés, alcaloïdes sous forme de sel). Une extraction séquentielle par solvants de polarité croissante (hexane, puis dichlorométhane, puis méthanol) permet de fractionner grossièrement un extrait brut selon la polarité de ses constituants avant purification fine par chromatographie.</p>

    <h3>2. L'extraction acido-basique des alcaloïdes</h3>
    <p>La basicité de l'azote des alcaloïdes (chapitre 3) permet une extraction sélective très efficace, fondée sur le changement de solubilité entre forme base libre et forme sel :</p>
    <table class="mini-table">
      <tr><th>Étape</th><th>Milieu</th><th>Forme de l'alcaloïde</th><th>Phase où il se trouve</th></tr>
      <tr><td>1. Extraction initiale</td><td>acide (HCl dilué)</td><td>sel, protoné, soluble dans l'eau</td><td>phase aqueuse (élimine les impuretés apolaires)</td></tr>
      <tr><td>2. Basification</td><td>ajout de base (NH₃, NaOH)</td><td>base libre, non chargée</td><td>reste en phase aqueuse temporairement</td></tr>
      <tr><td>3. Extraction finale</td><td>solvant organique (CH₂Cl₂)</td><td>base libre, soluble en organique</td><td>passe en phase organique (alcaloïde purifié)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Ce procédé, dit d'<strong>extraction acido-basique</strong>, exploite exactement la propriété de basicité étudiée au chapitre 3 : en alternant milieu acide (protonation, solubilité aqueuse) et milieu basique (déprotonation, solubilité organique), on sépare sélectivement les alcaloïdes de la grande majorité des autres métabolites (terpènes, flavonoïdes), qui ne changent pas de solubilité avec le pH.
    </div>

    <h3>3. L'hydrodistillation des huiles essentielles</h3>
    <p>Les <strong>huiles essentielles</strong>, riches en monoterpènes et sesquiterpènes volatils (chapitre 2), s'extraient par <strong>hydrodistillation</strong> (ou entraînement à la vapeur d'eau) : le matériel végétal est chauffé en présence d'eau, et les composés volatils, non miscibles à l'eau, sont entraînés par la vapeur puis se séparent de l'eau par décantation dans le distillat refroidi (essencier de Clevenger). Cette technique préserve les composés thermosensibles mieux qu'une distillation directe, car la présence d'eau abaisse la température d'ébullition du mélange (loi de Dalton sur les pressions partielles).</p>

    <h3>4. Identification structurale d'une substance isolée</h3>
    <p>Une fois isolée et purifiée (souvent par chromatographie, voir le module dédié), l'identification structurale d'une substance naturelle combine plusieurs techniques complémentaires : la <strong>spectroscopie RMN</strong> (¹H et ¹³C) pour établir le squelette carboné et la position des substituants, la <strong>spectrométrie de masse</strong> pour la masse moléculaire et la formule brute, et la <strong>spectroscopie IR</strong> pour repérer les fonctions chimiques (OH, C=O, C=C). La comparaison des données obtenues aux données de référence de la littérature (ou à un échantillon authentique) permet de confirmer l'identité de la molécule.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour extraire sélectivement la nicotine (alcaloïde) d'une feuille de tabac tout en éliminant les cires apolaires, quelle séquence d'étapes proposer ?</p>
      <p><strong>Solution :</strong> (1) extraction avec HCl dilué : la nicotine passe en phase aqueuse sous forme de sel protoné, les cires restent insolubles/éliminées ; (2) basification de la phase aqueuse (NaOH) : la nicotine repasse en base libre ; (3) extraction par un solvant organique (CH₂Cl₂) : la nicotine, non chargée, passe en phase organique.</p>
      <p class="example-answer">C'est exactement le principe de l'<strong>extraction acido-basique</strong> décrit dans ce chapitre, qui exploite la basicité de l'azote de la nicotine pour la séparer sélectivement des composés non basiques de la matrice végétale.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Choix du solvant selon la polarité de la cible : « qui se ressemble s'assemble »</li>
      <li>Extraction acido-basique des alcaloïdes : alternance milieu acide (sel, phase aqueuse) / milieu basique (base libre, phase organique)</li>
      <li>Hydrodistillation : extraction des huiles essentielles volatiles par entraînement à la vapeur d'eau</li>
      <li>Identification structurale : RMN (squelette), spectrométrie de masse (formule brute), IR (fonctions chimiques)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier l'ordre des étapes de l'extraction acido-basique : c'est le passage acide→base qui fait passer l'alcaloïde de la phase aqueuse à la phase organique, pas l'inverse</li>
      <li>Croire que l'hydrodistillation convient à toute substance naturelle : elle n'est adaptée qu'aux composés volatils et non miscibles à l'eau</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Pour extraire une molécule apolaire (terpène hydrocarboné), on choisit de préférence :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat6e1" value="right">un solvant apolaire, comme l'hexane</label>
          <label class="option"><input type="radio" name="nat6e1" value="wrong">de l'eau pure</label>
          <label class="option"><input type="radio" name="nat6e1" value="wrong">un acide fort concentré</label>
          <label class="option"><input type="radio" name="nat6e1" value="wrong">une base forte concentrée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat6e1','nat6fb1','Correct — « qui se ressemble s\\'assemble » : un solvant apolaire extrait les molécules apolaires.','Relis la section sur le choix du solvant selon la polarité.')">Vérifier</button>
        <div class="feedback" id="nat6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Dans l'extraction acido-basique d'un alcaloïde, l'étape de basification sert à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat6e2" value="right">reformer la base libre, soluble en phase organique</label>
          <label class="option"><input type="radio" name="nat6e2" value="wrong">protoner l'alcaloïde en sel soluble dans l'eau</label>
          <label class="option"><input type="radio" name="nat6e2" value="wrong">détruire définitivement l'alcaloïde</label>
          <label class="option"><input type="radio" name="nat6e2" value="wrong">éliminer tous les composés de l'extrait</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat6e2','nat6fb2','Correct — la basification déprotone l\\'alcaloïde, qui redevient soluble en phase organique.','Relis le tableau des étapes de l\\'extraction acido-basique.')">Vérifier</button>
        <div class="feedback" id="nat6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'hydrodistillation est particulièrement adaptée à l'extraction :</p>
        <div class="options">
          <label class="option"><input type="radio" name="nat6e3" value="right">des huiles essentielles, riches en terpènes volatils</label>
          <label class="option"><input type="radio" name="nat6e3" value="wrong">des protéines de haute masse molaire</label>
          <label class="option"><input type="radio" name="nat6e3" value="wrong">des sels minéraux</label>
          <label class="option"><input type="radio" name="nat6e3" value="wrong">des polymères non volatils</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('nat6e3','nat6fb3','Correct — l\\'hydrodistillation entraîne à la vapeur d\\'eau les composés volatils, typiquement les monoterpènes et sesquiterpènes des huiles essentielles.','Relis la section sur l\\'hydrodistillation des huiles essentielles.')">Vérifier</button>
        <div class="feedback" id="nat6fb3"></div>
      </div>
    </div>
  `
};
NATSUB_NOVA_KB[natKey("Méthodes d'extraction et d'identification des substances naturelles")] = {
  intro: "Salut, c'est Nova ! Dernier chapitre : extraction selon la polarité, extraction acido-basique des alcaloïdes, hydrodistillation et identification structurale. Demande-moi une explication ou un indice.",
  rules: [
    { test:/polarit[ée]|solvant/i, replies:["« Qui se ressemble s'assemble » : solvant apolaire pour cibles apolaires (terpènes), solvant polaire pour cibles polaires (flavonoïdes glycosylés, sels d'alcaloïdes)."]},
    { test:/acido-basique|alcalo[iï]de.*extract/i, replies:["L'extraction acido-basique alterne milieu acide (alcaloïde protoné, sel soluble en phase aqueuse) et milieu basique (base libre, soluble en phase organique)."]},
    { test:/hydrodistillation|huile essentielle/i, replies:["L'hydrodistillation entraîne à la vapeur d'eau les composés volatils (monoterpènes, sesquiterpènes) des huiles essentielles, en préservant les composés thermosensibles."]},
    { test:/rmn|spectrom[ée]trie|identification structurale/i, replies:["Identification structurale : RMN (squelette carboné), spectrométrie de masse (formule brute), IR (fonctions chimiques) — comparés aux données de référence."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur le choix du solvant.","Pense à la règle « qui se ressemble s'assemble ».","Un solvant apolaire, comme l'hexane."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des étapes de l'extraction acido-basique.","La basification déprotone l'alcaloïde.","Elle reforme la base libre, soluble en organique."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur l'hydrodistillation.","Pense aux composés volatils.","Les huiles essentielles, riches en terpènes volatils."]}
  ]
};

/* fusionne le module Chimie des substances naturelles dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, NATSUB_CHAPTERS);
Object.assign(NOVA_KB, NATSUB_NOVA_KB);