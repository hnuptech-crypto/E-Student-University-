/* =====================================================================
   CHUNK « chroma » — registre CHROMA_CHAPTERS / CHROMA_NOVA_KB
   Matière(s) : Chimie|Méthodes chromatographiques
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CHROMA_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — MÉTHODES CHROMATOGRAPHIQUES (L3 Chimie Fondamentale)
   6 chapitres : principe de la séparation chromatographique, théorie des plateaux,
   chromatographie en phase gazeuse, chromatographie liquide haute performance,
   couplage à la spectrométrie de masse, validation et optimisation d'une séparation.
   S'appuie sur la validation de méthode analytique déjà rédigée en chimie analytique.
   ===================================================================================== */
const CHROMA_MATIERE = 'Méthodes chromatographiques';
function chromaKey(chapterTitle){ return `Chimie|${CHROMA_MATIERE}|${chapterTitle}`; }
const CHROMA_CHAPTERS = {};
const CHROMA_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
CHROMA_CHAPTERS[chromaKey("Principe de la séparation chromatographique")] = {
  objectives: [
    "Définir phase stationnaire, phase mobile et facteur de rétention",
    "Comprendre le mécanisme général de séparation par partage différentiel",
    "Lire un chromatogramme et en extraire les grandeurs de base",
    "Distinguer chromatographie d'adsorption, de partage et d'exclusion"
  ],
  prereqs: ["Validation d'une méthode analytique (Chimie analytique)", "Chimie des solutions (L2)"],
  bodyHtml: `
    <p>La <strong>chromatographie</strong> sépare les constituants d'un mélange complexe en exploitant leurs affinités <strong>différentes</strong> pour deux phases en contact permanent : une <strong>phase stationnaire</strong> (fixe) et une <strong>phase mobile</strong> (qui s'écoule). C'est l'une des méthodes analytiques les plus puissantes et les plus répandues, indispensable dès qu'un mélange doit être séparé avant identification ou quantification.</p>

    <h3>1. Le principe du partage différentiel</h3>
    <p>Chaque soluté se répartit en permanence entre la phase stationnaire et la phase mobile, selon une constante d'équilibre (le <strong>coefficient de partage</strong> $K$) qui lui est propre. Un soluté qui a une <strong>forte affinité</strong> pour la phase stationnaire y passe une fraction importante de son temps et progresse lentement ; un soluté peu retenu progresse rapidement avec la phase mobile. Cette différence de vitesse de progression, accumulée le long de la colonne, sépare progressivement les constituants du mélange.</p>

    <h3>2. Le facteur de rétention $k'$</h3>
    <p>On définit le <strong>facteur de rétention</strong> (ou de capacité) $k'$ d'un soluté :</p>
    <div class="formula-box">$$k' = \\frac{t_R - t_0}{t_0}$$</div>
    <p>où $t_R$ est le <strong>temps de rétention</strong> du soluté (temps entre l'injection et son maximum de détection) et $t_0$ le <strong>temps mort</strong> (temps de progression d'une espèce non retenue, qui progresse à la vitesse de la phase mobile). $k'$ mesure combien de fois plus longtemps le soluté passe dans la phase stationnaire que dans la phase mobile.</p>

    <h3>3. Lecture d'un chromatogramme</h3>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Signification</th></tr>
      <tr><td>Temps de rétention $t_R$</td><td>identification qualitative (comparaison à un composé de référence)</td></tr>
      <tr><td>Aire du pic</td><td>quantification (proportionnelle, en général, à la quantité injectée)</td></tr>
      <tr><td>Largeur du pic</td><td>efficacité de la séparation (chapitre 2)</td></tr>
    </table>

    <h3>4. Trois grands mécanismes de rétention</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Mécanisme</th></tr>
      <tr><td>Adsorption</td><td>interaction de surface entre soluté et phase stationnaire solide</td></tr>
      <tr><td>Partage</td><td>solubilité différentielle entre deux phases (souvent une phase stationnaire liquide, greffée ou imprégnée sur un support)</td></tr>
      <tr><td>Exclusion stérique</td><td>séparation selon la taille moléculaire (les grosses molécules, exclues des pores de la phase stationnaire, progressent plus vite)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour un soluté, $t_R=8{,}5\\,\\text{min}$ et $t_0=1{,}0\\,\\text{min}$. Calculer $k'$.</p>
      <p><strong>Solution :</strong> $k' = \\dfrac{8{,}5-1{,}0}{1{,}0} = \\dfrac{7{,}5}{1{,}0}$.</p>
      <p class="example-answer">$k'=7{,}5$ : le soluté passe $7{,}5$ fois plus de temps dans la phase stationnaire que dans la phase mobile — une rétention notable, typique d'une bonne séparation.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Séparation par partage différentiel entre phase stationnaire et phase mobile</li>
      <li>Facteur de rétention $k'=(t_R-t_0)/t_0$ : mesure de l'affinité pour la phase stationnaire</li>
      <li>Trois mécanismes : adsorption, partage, exclusion stérique</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre temps de rétention $t_R$ (absolu) et facteur de rétention $k'$ (relatif au temps mort $t_0$)</li>
      <li>Oublier que l'aire du pic (pas sa hauteur) est la grandeur généralement liée à la quantification</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un soluté fortement retenu par la phase stationnaire a un temps de rétention :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma1e1" value="right">long</label>
          <label class="option"><input type="radio" name="chroma1e1" value="wrong">court</label>
          <label class="option"><input type="radio" name="chroma1e1" value="wrong">nul</label>
          <label class="option"><input type="radio" name="chroma1e1" value="wrong">négatif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma1e1','chroma1fb1','Correct — plus l\\'affinité pour la phase stationnaire est forte, plus le soluté progresse lentement.','Relis le principe du partage différentiel.')">Vérifier</button>
        <div class="feedback" id="chroma1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La grandeur généralement utilisée pour la quantification est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma1e2" value="right">l'aire du pic</label>
          <label class="option"><input type="radio" name="chroma1e2" value="wrong">le temps de rétention</label>
          <label class="option"><input type="radio" name="chroma1e2" value="wrong">la largeur seule</label>
          <label class="option"><input type="radio" name="chroma1e2" value="wrong">la couleur du pic</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma1e2','chroma1fb2','Correct — l\\'aire est en général proportionnelle à la quantité injectée.','Relis le tableau du cours sur la lecture d\\'un chromatogramme.')">Vérifier</button>
        <div class="feedback" id="chroma1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $t_R=8{,}5\\,\\text{min}$ et $t_0=1{,}0\\,\\text{min}$, $k'$ vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma1e3" value="right">7,5</label>
          <label class="option"><input type="radio" name="chroma1e3" value="wrong">8,5</label>
          <label class="option"><input type="radio" name="chroma1e3" value="wrong">1,0</label>
          <label class="option"><input type="radio" name="chroma1e3" value="wrong">0,12</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma1e3','chroma1fb3','Correct — exactement le résultat de l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="chroma1fb3"></div>
      </div>
    </div>
  `
};
CHROMA_NOVA_KB[chromaKey("Principe de la séparation chromatographique")] = {
  intro: "Salut, moi c'est Nova ! On démarre la chromatographie avec le partage différentiel et le facteur de rétention. Demande-moi une explication ou un indice.",
  rules: [
    { test:/facteur de r[ée]tention|k'/i, replies:["k'=(tR−t0)/t0 mesure combien de fois plus longtemps un soluté passe dans la phase stationnaire par rapport à la phase mobile."]},
    { test:/adsorption|partage|exclusion/i, replies:["Trois mécanismes : adsorption (interaction de surface), partage (solubilité différentielle), exclusion stérique (séparation par taille)."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le principe du partage différentiel.","Forte affinité = progression lente.","Temps de rétention long."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau sur la lecture du chromatogramme.","C'est proportionnel à la quantité.","L'aire du pic."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","(8,5−1,0)/1,0.","7,5."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
CHROMA_CHAPTERS[chromaKey("Théorie des plateaux et efficacité d'une colonne")] = {
  objectives: [
    "Présenter le modèle des plateaux théoriques (analogie avec la distillation)",
    "Calculer le nombre de plateaux théoriques à partir d'un chromatogramme",
    "Établir le critère de résolution entre deux pics",
    "Identifier les leviers pour améliorer une séparation"
  ],
  prereqs: ["Principe de la séparation chromatographique"],
  bodyHtml: `
    <p>Le chapitre 1 explique <em>pourquoi</em> deux solutés se séparent (affinités différentes), mais pas encore <em>avec quelle qualité</em>. La <strong>théorie des plateaux</strong> — un modèle historiquement emprunté à la distillation fractionnée (thermodynamique chimique) — fournit un cadre quantitatif pour évaluer l'<strong>efficacité</strong> d'une colonne chromatographique.</p>

    <h3>1. Le modèle des plateaux théoriques</h3>
    <p>On modélise la colonne comme une succession de $N$ <strong>plateaux théoriques</strong> fictifs, dans chacun desquels le soluté atteint l'équilibre entre phase stationnaire et phase mobile avant de progresser au plateau suivant — l'analogue chromatographique des plateaux d'une colonne à distiller. Plus $N$ est grand, plus la colonne est <strong>efficace</strong> : les pics sortent plus étroits, pour un même temps de rétention.</p>

    <h3>2. Calcul du nombre de plateaux</h3>
    <p>À partir d'un chromatogramme expérimental, on estime $N$ à partir du temps de rétention $t_R$ et de la largeur du pic à mi-hauteur $w_{1/2}$ (pour un pic de forme gaussienne) :</p>
    <div class="formula-box">$$N = 5{,}54\\left(\\frac{t_R}{w_{1/2}}\\right)^2$$</div>
    <p>On en déduit la <strong>hauteur équivalente à un plateau théorique</strong> (HEPT) $H=L/N$ ($L$ étant la longueur de la colonne) — plus $H$ est petite, plus la colonne est efficace par unité de longueur.</p>

    <h3>3. La résolution entre deux pics</h3>
    <p>La séparation effective de deux solutés voisins se mesure par la <strong>résolution</strong> $R_s$ :</p>
    <div class="formula-box">$$R_s = \\frac{2(t_{R,2}-t_{R,1})}{w_1+w_2}$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Une résolution $R_s\\geq1{,}5$ correspond à une <strong>séparation quasi complète</strong> (recouvrement négligeable) entre deux pics gaussiens de tailles comparables — un critère pratique très utilisé pour juger de la qualité d'une méthode chromatographique avant de la valider (chimie analytique, chapitre 1).
    </div>

    <h3>4. Leviers d'amélioration d'une séparation</h3>
    <p>Pour améliorer $R_s$, on peut agir sur trois familles de paramètres, résumées par l'équation de résolution générale (hors du cadre détaillé de ce cours) : la <strong>sélectivité</strong> (choix de la phase stationnaire, qui modifie les affinités relatives des solutés), l'<strong>efficacité</strong> $N$ (colonne plus longue, particules plus fines) et la <strong>rétention</strong> $k'$ (composition de la phase mobile).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour un pic avec $t_R=10\\,\\text{min}$ et $w_{1/2}=0{,}2\\,\\text{min}$, calculer $N$.</p>
      <p><strong>Solution :</strong> $N = 5{,}54\\times\\left(\\dfrac{10}{0{,}2}\\right)^2 = 5{,}54\\times(50)^2 = 5{,}54\\times2500$.</p>
      <p class="example-answer">$N \\approx 13\\,850$ plateaux théoriques — une valeur typique d'une colonne capillaire de CPG performante (chapitre 3), signe d'une excellente efficacité.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Théorie des plateaux : modèle en $N$ équilibres successifs, analogue à la distillation</li>
      <li>$N=5{,}54(t_R/w_{1/2})^2$ ; HEPT $H=L/N$, mesure de l'efficacité par unité de longueur</li>
      <li>Résolution $R_s=2(t_{R,2}-t_{R,1})/(w_1+w_2)$ ; $R_s\\geq1{,}5$ = séparation quasi complète</li>
      <li>Sélectivité, efficacité et rétention : trois leviers pour améliorer une séparation</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre nombre de plateaux $N$ (efficacité globale de la colonne) et HEPT $H$ (efficacité par unité de longueur)</li>
      <li>Croire que seule l'efficacité $N$ détermine la résolution : la sélectivité y intervient souvent de façon dominante</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un plus grand nombre de plateaux théoriques $N$ correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma2e1" value="right">une colonne plus efficace, des pics plus étroits</label>
          <label class="option"><input type="radio" name="chroma2e1" value="wrong">une colonne moins efficace</label>
          <label class="option"><input type="radio" name="chroma2e1" value="wrong">l'absence de séparation</label>
          <label class="option"><input type="radio" name="chroma2e1" value="wrong">un temps de rétention nul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma2e1','chroma2fb1','Correct — plus N est grand, plus l\\'efficacité est élevée, donnant des pics plus fins.','Relis la section sur le modèle des plateaux théoriques.')">Vérifier</button>
        <div class="feedback" id="chroma2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Une résolution $R_s\\geq1{,}5$ correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma2e2" value="right">une séparation quasi complète entre deux pics</label>
          <label class="option"><input type="radio" name="chroma2e2" value="wrong">une absence totale de séparation</label>
          <label class="option"><input type="radio" name="chroma2e2" value="wrong">un recouvrement total</label>
          <label class="option"><input type="radio" name="chroma2e2" value="wrong">un seul pic unique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma2e2','chroma2fb2','Correct — c\\'est le critère pratique standard pour juger de la qualité d\\'une séparation.','Relis le point clé du cours sur la résolution.')">Vérifier</button>
        <div class="feedback" id="chroma2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour $t_R=10\\,\\text{min}$, $w_{1/2}=0{,}2\\,\\text{min}$, $N$ vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma2e3" value="right">13 850</label>
          <label class="option"><input type="radio" name="chroma2e3" value="wrong">50</label>
          <label class="option"><input type="radio" name="chroma2e3" value="wrong">2 500</label>
          <label class="option"><input type="radio" name="chroma2e3" value="wrong">5,54</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma2e3','chroma2fb3','Correct — exactement le résultat de l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="chroma2fb3"></div>
      </div>
    </div>
  `
};
CHROMA_NOVA_KB[chromaKey("Théorie des plateaux et efficacité d'une colonne")] = {
  intro: "Salut, c'est Nova ! On étudie la théorie des plateaux et la résolution chromatographique. Demande-moi une explication ou un indice.",
  rules: [
    { test:/plateaux th[ée]oriques|\\bN\\b/i, replies:["N=5,54(tR/w1/2)² donne le nombre de plateaux théoriques : plus N est grand, plus la colonne est efficace, avec des pics plus étroits."]},
    { test:/r[ée]solution|Rs/i, replies:["Rs=2(tR2−tR1)/(w1+w2) mesure la séparation entre deux pics. Rs≥1,5 correspond à une séparation quasi complète."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la section sur le modèle des plateaux.","Plus N est grand, quoi se passe pour les pics ?","Ils deviennent plus étroits, plus efficaces."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur la résolution.","C'est un seuil de bonne séparation.","Séparation quasi complète."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","5,54×50².","≈13850."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
CHROMA_CHAPTERS[chromaKey("Chromatographie en phase gazeuse (CPG)")] = {
  objectives: [
    "Décrire le principe et l'instrumentation de la chromatographie en phase gazeuse",
    "Comprendre le rôle de la programmation de température",
    "Présenter les détecteurs usuels (FID, TCD)",
    "Identifier les conditions requises pour analyser un composé par CPG"
  ],
  prereqs: ["Théorie des plateaux et efficacité d'une colonne"],
  bodyHtml: `
    <p>La <strong>chromatographie en phase gazeuse</strong> (CPG, ou GC en anglais) applique les principes des chapitres 1 et 2 avec une phase mobile <strong>gazeuse</strong> (le « gaz vecteur », souvent hélium ou azote) — une technique de choix pour les composés volatils et thermiquement stables.</p>

    <h3>1. Instrumentation</h3>
    <p>Un échantillon liquide est injecté dans un <strong>injecteur</strong> chauffé, où il se vaporise instantanément avant d'être entraîné par le gaz vecteur à travers une <strong>colonne capillaire</strong> (fine, longue de quelques dizaines de mètres, enroulée), dont la paroi interne porte la phase stationnaire (un film liquide de polymère). Les solutés séparés atteignent successivement un <strong>détecteur</strong> en sortie de colonne.</p>

    <h3>2. Programmation de température</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi programmer la température</span>
      Contrairement à une élution isotherme (température de colonne fixe), la <strong>programmation de température</strong> — augmentation progressive et contrôlée de la température du four pendant l'analyse — permet d'analyser en un temps raisonnable des mélanges contenant des composés de volatilités très différentes : les composés les plus volatils sortent tôt à basse température, tandis que la montée en température accélère l'élution des composés les moins volatils, qui sortiraient sinon avec des pics très larges et tardifs en isotherme.
    </div>

    <h3>3. Détecteurs usuels</h3>
    <table class="mini-table">
      <tr><th>Détecteur</th><th>Principe</th><th>Sensibilité / sélectivité</th></tr>
      <tr><td>FID (ionisation de flamme)</td><td>combustion du soluté dans une flamme H₂/air, mesure du courant ionique produit</td><td>très sensible pour les composés organiques (liaisons C-H), peu sélectif</td></tr>
      <tr><td>TCD (conductivité thermique)</td><td>mesure de la variation de conductivité thermique du gaz vecteur due au soluté</td><td>universel (détecte tout composé, y compris inorganique) mais moins sensible que le FID</td></tr>
    </table>

    <h3>4. Conditions requises pour l'analyse en CPG</h3>
    <p>La CPG n'est applicable qu'à des composés <strong>volatils</strong> (pression de vapeur suffisante à la température de la colonne, typiquement jusqu'à $300$–$350\\,°\\text{C}$) et <strong>thermiquement stables</strong> (ne se décomposant pas aux températures d'analyse). Les composés non volatils, thermosensibles ou de grande masse molaire (biomolécules, polymères) nécessitent une autre technique, comme la chromatographie liquide (chapitre 4).</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi ne peut-on pas analyser une protéine par CPG classique ?</p>
      <p><strong>Solution :</strong> une protéine a une masse molaire élevée (souvent > 10 000 g/mol) et se dénature (décomposition irréversible de sa structure) bien avant d'atteindre une pression de vapeur suffisante pour passer en phase gazeuse.</p>
      <p class="example-answer">La CPG exige volatilité et stabilité thermique — deux conditions que les protéines ne remplissent pas : c'est la chromatographie liquide (HPLC, chapitre 4), qui ne requiert pas la vaporisation de l'échantillon, qui est utilisée pour ce type de composés.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>La CPG utilise une phase mobile gazeuse, adaptée aux composés volatils et thermostables</li>
      <li>La programmation de température permet d'analyser efficacement des mélanges de volatilités très différentes</li>
      <li>FID : sensible, sélectif aux composés organiques ; TCD : universel, moins sensible</li>
      <li>Les composés non volatils ou thermosensibles (protéines, polymères) ne sont pas analysables par CPG</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Vouloir analyser un composé thermosensible ou peu volatil par CPG : il se décomposera ou ne s'élueras pas correctement</li>
      <li>Confondre FID (sensible, sélectif) et TCD (universel, moins sensible)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La programmation de température en CPG permet :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma3e1" value="right">d'analyser efficacement des composés de volatilités très différentes</label>
          <label class="option"><input type="radio" name="chroma3e1" value="wrong">de refroidir la colonne en permanence</label>
          <label class="option"><input type="radio" name="chroma3e1" value="wrong">d'éviter toute élution</label>
          <label class="option"><input type="radio" name="chroma3e1" value="wrong">de détruire l'échantillon systématiquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma3e1','chroma3fb1','Correct — c\\'est exactement l\\'intérêt de la programmation de température.','Relis le point clé du cours sur la programmation de température.')">Vérifier</button>
        <div class="feedback" id="chroma3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le détecteur universel (détecte tout composé, y compris inorganique) est le :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma3e2" value="right">TCD</label>
          <label class="option"><input type="radio" name="chroma3e2" value="wrong">FID</label>
          <label class="option"><input type="radio" name="chroma3e2" value="wrong">aucun détecteur n'est universel</label>
          <label class="option"><input type="radio" name="chroma3e2" value="wrong">un détecteur de couleur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma3e2','chroma3fb2','Correct — le TCD est universel mais moins sensible que le FID, spécifique aux composés organiques.','Relis le tableau du cours sur les détecteurs.')">Vérifier</button>
        <div class="feedback" id="chroma3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Une protéine n'est pas analysable par CPG classique car elle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma3e3" value="right">se dénature avant d'atteindre une pression de vapeur suffisante</label>
          <label class="option"><input type="radio" name="chroma3e3" value="wrong">est trop petite</label>
          <label class="option"><input type="radio" name="chroma3e3" value="wrong">n'a pas de masse</label>
          <label class="option"><input type="radio" name="chroma3e3" value="wrong">est toujours gazeuse naturellement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma3e3','chroma3fb3','Correct — exactement l\\'explication de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="chroma3fb3"></div>
      </div>
    </div>
  `
};
CHROMA_NOVA_KB[chromaKey("Chromatographie en phase gazeuse (CPG)")] = {
  intro: "Salut, moi c'est Nova ! On étudie la chromatographie en phase gazeuse (CPG). Demande-moi une explication ou un indice.",
  rules: [
    { test:/programmation de temp[ée]rature/i, replies:["La programmation de température (montée progressive) permet d'analyser efficacement des mélanges de volatilités très différentes, évitant des pics trop larges pour les composés les moins volatils."]},
    { test:/fid|tcd|d[ée]tecteur/i, replies:["FID : sensible, sélectif aux composés organiques (liaisons C-H). TCD : universel (tout composé) mais moins sensible."]},
    { test:/volatil|thermostable/i, replies:["La CPG exige que le composé soit volatil et thermiquement stable — sinon, il faut passer par HPLC (chapitre 4)."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le point clé sur la programmation de température.","Pense aux composés de volatilités très différentes.","Les analyser efficacement en un seul run."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des détecteurs.","Un détecteur détecte tout, l'autre est sélectif.","Le TCD est universel."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à la stabilité thermique.","Elle se dénature avant de se vaporiser."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
CHROMA_CHAPTERS[chromaKey("Chromatographie liquide haute performance (HPLC)")] = {
  objectives: [
    "Décrire le principe et l'instrumentation de la chromatographie liquide haute performance",
    "Distinguer phase normale et phase inverse",
    "Comprendre le principe de l'élution en gradient",
    "Identifier les avantages de l'HPLC par rapport à la CPG"
  ],
  prereqs: ["Chromatographie en phase gazeuse (CPG)"],
  bodyHtml: `
    <p>La <strong>chromatographie liquide haute performance</strong> (HPLC) utilise une phase mobile <strong>liquide</strong> plutôt que gazeuse (chapitre 3) — ne nécessitant pas la vaporisation de l'échantillon, elle s'applique à une gamme de composés beaucoup plus large, y compris les molécules non volatiles ou thermosensibles.</p>

    <h3>1. Instrumentation</h3>
    <p>Une pompe haute pression (jusqu'à plusieurs centaines de bars) fait circuler la phase mobile liquide à travers une colonne remplie de fines particules de phase stationnaire, générant la pression nécessaire pour un débit constant malgré la forte résistance hydraulique d'une colonne à particules fines (mécanique des fluides, écoulements en milieu poreux — hors du cadre détaillé de ce cours).</p>

    <h3>2. Phase normale et phase inverse</h3>
    <table class="mini-table">
      <tr><th>Mode</th><th>Phase stationnaire</th><th>Phase mobile</th><th>Ordre d'élution</th></tr>
      <tr><td>Phase normale</td><td>polaire (silice nue)</td><td>apolaire (hexane...)</td><td>composés apolaires élués en premier</td></tr>
      <tr><td>Phase inverse (RP)</td><td>apolaire (silice greffée C18)</td><td>polaire (eau/méthanol, eau/acétonitrile)</td><td>composés polaires élués en premier</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La <strong>phase inverse</strong> (RP-HPLC) est de très loin le mode le plus utilisé en pratique : elle est compatible avec des phases mobiles aqueuses (donc avec les échantillons biologiques, pharmaceutiques), robuste et reproductible — d'où son nom paradoxal (« inverse » par rapport au mode historiquement premier, la phase normale).
    </div>

    <h3>3. Élution en gradient</h3>
    <p>Comme la programmation de température en CPG (chapitre 3), l'<strong>élution en gradient</strong> — variation progressive de la composition de la phase mobile pendant l'analyse (par exemple, augmentation de la proportion de méthanol dans l'eau) — permet d'analyser efficacement des mélanges de polarités très différentes en un temps raisonnable, en accélérant progressivement l'élution des composés les plus retenus.</p>

    <h3>4. Avantages de l'HPLC par rapport à la CPG</h3>
    <p>L'HPLC ne nécessite <strong>aucune vaporisation</strong> de l'échantillon : elle s'applique donc à des composés non volatils, de grande masse molaire (protéines, polymères, sucres) et thermosensibles, hors de portée de la CPG (chapitre 3). En contrepartie, la théorie des plateaux (chapitre 2) y donne généralement des efficacités ($N$) plus faibles qu'en CPG, en partie compensées par un contrôle plus fin de la sélectivité via le choix de la phase mobile.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour séparer un mélange de sucres très polaires et solubles uniquement dans l'eau, quel mode d'HPLC choisir : phase normale ou phase inverse ?</p>
      <p><strong>Solution :</strong> les sucres, très polaires, seraient très fortement retenus (voire insolubles) en phase normale (phase mobile apolaire) — une élution extrêmement lente, voire impossible.</p>
      <p class="example-answer">La <strong>phase inverse</strong>, avec une phase mobile aqueuse compatible avec la solubilité des sucres, est le choix adapté — cohérent avec sa large prédominance pratique évoquée dans le point clé du cours.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>HPLC : phase mobile liquide, pompe haute pression, pas de vaporisation de l'échantillon</li>
      <li>Phase normale (stationnaire polaire) vs phase inverse (stationnaire apolaire, très majoritairement utilisée)</li>
      <li>Élution en gradient : analogue liquide de la programmation de température en CPG</li>
      <li>L'HPLC s'applique aux composés non volatils, thermosensibles, de grande masse molaire — hors de portée de la CPG</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre phase normale (stationnaire polaire, mobile apolaire) et phase inverse (l'inverse)</li>
      <li>Croire que l'HPLC est systématiquement plus efficace ($N$ plus grand) que la CPG : c'est en général l'inverse</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">En phase inverse (RP-HPLC), la phase stationnaire est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma4e1" value="right">apolaire</label>
          <label class="option"><input type="radio" name="chroma4e1" value="wrong">polaire</label>
          <label class="option"><input type="radio" name="chroma4e1" value="wrong">gazeuse</label>
          <label class="option"><input type="radio" name="chroma4e1" value="wrong">absente</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma4e1','chroma4fb1','Correct — c\\'est exactement l\\'inverse de la phase normale historique.','Relis le tableau du cours sur phase normale vs inverse.')">Vérifier</button>
        <div class="feedback" id="chroma4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">L'HPLC, contrairement à la CPG, permet d'analyser :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma4e2" value="right">des composés non volatils et thermosensibles</label>
          <label class="option"><input type="radio" name="chroma4e2" value="wrong">uniquement des gaz</label>
          <label class="option"><input type="radio" name="chroma4e2" value="wrong">rien du tout</label>
          <label class="option"><input type="radio" name="chroma4e2" value="wrong">seulement l'eau pure</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma4e2','chroma4fb2','Correct — c\\'est le grand avantage de l\\'HPLC, qui ne nécessite pas de vaporiser l\\'échantillon.','Relis la section sur les avantages de l\\'HPLC.')">Vérifier</button>
        <div class="feedback" id="chroma4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour des sucres très polaires solubles dans l'eau, on choisit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma4e3" value="right">la phase inverse</label>
          <label class="option"><input type="radio" name="chroma4e3" value="wrong">la phase normale</label>
          <label class="option"><input type="radio" name="chroma4e3" value="wrong">la CPG directement</label>
          <label class="option"><input type="radio" name="chroma4e3" value="wrong">aucune méthode ne fonctionne</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma4e3','chroma4fb3','Correct — exactement le résultat de l\\'exemple corrigé du cours.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="chroma4fb3"></div>
      </div>
    </div>
  `
};
CHROMA_NOVA_KB[chromaKey("Chromatographie liquide haute performance (HPLC)")] = {
  intro: "Salut, c'est Nova ! On étudie l'HPLC : phase normale, phase inverse, élution en gradient. Demande-moi une explication ou un indice.",
  rules: [
    { test:/phase normale|phase inverse|rp/i, replies:["Phase normale : stationnaire polaire, mobile apolaire. Phase inverse (RP, très majoritaire) : stationnaire apolaire, mobile polaire (aqueuse)."]},
    { test:/gradient/i, replies:["L'élution en gradient (variation progressive de la composition de la phase mobile) est l'analogue liquide de la programmation de température en CPG."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau phase normale/inverse.","C'est l'inverse de la phase historique.","Apolaire."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la section sur les avantages de l'HPLC.","Pense à ce qui n'est pas nécessaire en HPLC.","Composés non volatils et thermosensibles."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense à la solubilité des sucres.","La phase inverse."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
CHROMA_CHAPTERS[chromaKey("Couplage chromatographie-spectrométrie de masse")] = {
  objectives: [
    "Comprendre l'intérêt du couplage chromatographie-spectrométrie de masse",
    "Décrire les grandes étapes d'un spectromètre de masse (source, analyseur, détecteur)",
    "Présenter les techniques d'ionisation usuelles (EI, ESI)",
    "Interpréter un chromatogramme de masse (courant ionique total, extraction d'ion)"
  ],
  prereqs: ["Chromatographie liquide haute performance (HPLC)"],
  bodyHtml: `
    <p>La chromatographie (chapitres 1-4) sépare les composés d'un mélange mais ne les <strong>identifie</strong> pas de façon absolue (le temps de rétention seul ne garantit pas l'identité d'un composé, plusieurs espèces pouvant coïncider). Le couplage à la <strong>spectrométrie de masse</strong> (SM ou MS) résout ce problème en apportant, pour chaque pic chromatographique, une information structurale complémentaire décisive.</p>

    <h3>1. Principe du couplage GC-MS ou LC-MS</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — deux dimensions d'information complémentaires</span>
      Le couplage chromatographie-spectrométrie de masse (GC-MS ou LC-MS) combine deux dimensions : la <strong>séparation temporelle</strong> (temps de rétention, chapitre 1) et l'<strong>identification structurale</strong> (spectre de masse), obtenue pour chaque composé au fur et à mesure qu'il sort de la colonne. C'est cette double information qui rend la technique si puissante pour l'analyse de mélanges complexes inconnus.
    </div>

    <h3>2. Les trois étapes d'un spectromètre de masse</h3>
    <table class="mini-table">
      <tr><th>Étape</th><th>Fonction</th></tr>
      <tr><td>Source d'ionisation</td><td>transforme les molécules neutres en ions en phase gazeuse (nécessaire, car seuls des ions peuvent être manipulés par des champs électriques/magnétiques)</td></tr>
      <tr><td>Analyseur</td><td>sépare les ions selon leur rapport masse/charge $m/z$</td></tr>
      <tr><td>Détecteur</td><td>mesure l'abondance de chaque ion détecté</td></tr>
    </table>

    <h3>3. Techniques d'ionisation usuelles</h3>
    <table class="mini-table">
      <tr><th>Technique</th><th>Principe</th><th>Utilisation typique</th></tr>
      <tr><td>Impact électronique (EI)</td><td>bombardement par un faisceau d'électrons, fragmentation importante</td><td>couplée à la CPG (chapitre 3), bases de données de spectres de référence très riches</td></tr>
      <tr><td>Électronébulisation (ESI)</td><td>ionisation douce en phase liquide, peu de fragmentation</td><td>couplée à l'HPLC (chapitre 4), adaptée aux grosses molécules (protéines)</td></tr>
    </table>

    <h3>4. Lecture d'un chromatogramme de masse</h3>
    <p>Le <strong>courant ionique total</strong> (TIC), somme de tous les ions détectés à chaque instant, ressemble à un chromatogramme classique (chapitre 1). L'<strong>extraction d'ion</strong> (EIC), qui isole un seul rapport $m/z$ caractéristique, permet d'améliorer considérablement la sélectivité — de « voir » un composé cible même s'il coélue partiellement avec d'autres espèces sur le TIC global.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi préfère-t-on l'ionisation ESI (douce) à l'EI (dure) pour analyser une protéine par LC-MS ?</p>
      <p><strong>Solution :</strong> l'EI provoque une fragmentation importante, qui détruirait la structure de la protéine avant toute analyse utile ; l'ESI, ionisation douce, préserve la molécule intacte (ou en fragments très limités, contrôlés).</p>
      <p class="example-answer">C'est cette douceur qui rend l'ESI indispensable pour l'analyse de grosses biomolécules — cohérent avec le couplage naturel ESI/HPLC déjà mentionné dans le cours, contrairement au couplage historique EI/CPG pour des molécules plus petites et volatiles.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Le couplage chromatographie-MS combine séparation temporelle et identification structurale</li>
      <li>Trois étapes : source d'ionisation, analyseur ($m/z$), détecteur</li>
      <li>EI (dure, fragmentation, couplée à CPG) vs ESI (douce, préserve les grosses molécules, couplée à HPLC)</li>
      <li>Extraction d'ion (EIC) : améliore la sélectivité par rapport au courant ionique total (TIC)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre EI (dure, fragmentante) et ESI (douce, préservant la molécule intacte)</li>
      <li>Croire qu'un temps de rétention seul suffit à identifier un composé de façon absolue : le spectre de masse apporte l'identification structurale décisive</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'analyseur d'un spectromètre de masse sépare les ions selon :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma5e1" value="right">leur rapport masse/charge $m/z$</label>
          <label class="option"><input type="radio" name="chroma5e1" value="wrong">leur couleur</label>
          <label class="option"><input type="radio" name="chroma5e1" value="wrong">leur température de fusion</label>
          <label class="option"><input type="radio" name="chroma5e1" value="wrong">leur odeur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma5e1','chroma5fb1','Correct — c\\'est le principe de séparation de tout analyseur de masse.','Relis le tableau des trois étapes d\\'un spectromètre.')">Vérifier</button>
        <div class="feedback" id="chroma5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">L'ionisation ESI, par rapport à l'EI, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma5e2" value="right">plus douce, moins fragmentante</label>
          <label class="option"><input type="radio" name="chroma5e2" value="wrong">plus dure, plus fragmentante</label>
          <label class="option"><input type="radio" name="chroma5e2" value="wrong">identique à l'EI</label>
          <label class="option"><input type="radio" name="chroma5e2" value="wrong">inutilisable en pratique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma5e2','chroma5fb2','Correct — c\\'est pour cette douceur que l\\'ESI est préférée pour les grosses biomolécules.','Relis le tableau des techniques d\\'ionisation.')">Vérifier</button>
        <div class="feedback" id="chroma5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'extraction d'ion (EIC) permet de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma5e3" value="right">améliorer la sélectivité pour un composé cible</label>
          <label class="option"><input type="radio" name="chroma5e3" value="wrong">supprimer tout signal</label>
          <label class="option"><input type="radio" name="chroma5e3" value="wrong">fondre l'échantillon</label>
          <label class="option"><input type="radio" name="chroma5e3" value="wrong">remplacer la colonne chromatographique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma5e3','chroma5fb3','Correct — l\\'EIC isole un m/z précis, améliorant la sélectivité par rapport au TIC global.','Relis la section sur la lecture d\\'un chromatogramme de masse.')">Vérifier</button>
        <div class="feedback" id="chroma5fb3"></div>
      </div>
    </div>
  `
};
CHROMA_NOVA_KB[chromaKey("Couplage chromatographie-spectrométrie de masse")] = {
  intro: "Salut, moi c'est Nova ! On étudie le couplage GC-MS/LC-MS. Demande-moi une explication ou un indice.",
  rules: [
    { test:/masse.charge|analyseur/i, replies:["L'analyseur d'un spectromètre de masse sépare les ions selon leur rapport masse/charge m/z, après ionisation en source."]},
    { test:/ei\b|esi|ionisation/i, replies:["EI (impact électronique) : dure, fragmentante, couplée à CPG. ESI (électronébulisation) : douce, préserve les grosses molécules, couplée à HPLC."]},
    { test:/tic|eic|courant ionique/i, replies:["Le TIC (courant ionique total) ressemble à un chromatogramme classique ; l'EIC (extraction d'ion) isole un m/z précis pour améliorer la sélectivité."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau des trois étapes.","C'est un rapport physique.","Le rapport masse/charge m/z."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau des techniques d'ionisation.","Une est dure, l'autre douce.","Plus douce, moins fragmentante."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur la lecture du chromatogramme de masse.","Pense à isoler un signal précis.","Améliorer la sélectivité."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
CHROMA_CHAPTERS[chromaKey("Validation et optimisation d'une séparation chromatographique")] = {
  objectives: [
    "Appliquer les critères de validation de méthode à une séparation chromatographique",
    "Construire une méthode de dosage par étalonnage externe ou interne",
    "Comprendre l'intérêt de l'étalon interne pour compenser les variations d'injection",
    "Discuter les stratégies d'optimisation systématique d'une séparation"
  ],
  prereqs: ["Couplage chromatographie-spectrométrie de masse", "Validation d'une méthode analytique (Chimie analytique)"],
  bodyHtml: `
    <p>Ce dernier chapitre relie la chromatographie à la démarche de validation analytique rigoureuse introduite au chapitre 1 de chimie analytique — car une séparation, aussi élégante soit-elle, n'a de valeur quantitative que si la méthode est correctement validée et calibrée.</p>

    <h3>1. Application des critères de validation</h3>
    <p>Les critères du chapitre 1 de chimie analytique (justesse, fidélité, LOD, LOQ) s'appliquent directement à une méthode chromatographique quantitative, avec quelques spécificités : la <strong>fidélité</strong> inclut la reproductibilité du temps de rétention (pas seulement de l'aire du pic), et la <strong>sélectivité</strong> — la capacité à distinguer le composé cible de tout interférent potentiel, y compris ceux présents dans une matrice réelle complexe — y prend une importance particulière (résolution, chapitre 2).</p>

    <h3>2. Étalonnage externe</h3>
    <p>L'<strong>étalonnage externe</strong> — injecter séparément des solutions étalons de concentration connue, puis tracer aire du pic en fonction de la concentration (chapitre 1 de chimie analytique) — est la méthode la plus simple, mais sensible à toute variation du volume injecté (imprécision de la seringue ou de l'injecteur automatique) entre les étalons et l'échantillon.</p>

    <h3>3. Étalonnage interne</h3>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi utiliser un étalon interne</span>
      L'<strong>étalon interne</strong> (un composé de référence, chimiquement proche du composé cible mais absent de l'échantillon, ajouté en quantité <strong>connue et constante</strong> dans tous les étalons et l'échantillon) permet de calculer un <strong>rapport</strong> d'aires (composé cible / étalon interne) plutôt qu'une aire absolue. Toute variation aléatoire du volume injecté affecte les deux aires de façon <strong>proportionnelle</strong>, donc s'annule dans le rapport — ce qui améliore considérablement la fidélité de la méthode, en particulier pour les injections manuelles ou les préparations d'échantillon complexes (extraction, dérivatisation).
    </div>

    <h3>4. Optimisation systématique d'une séparation</h3>
    <p>Plutôt que d'ajuster les paramètres (nature de la phase stationnaire, composition et débit de la phase mobile, gradient, température) un par un « à l'aveugle », les approches modernes utilisent des <strong>plans d'expériences</strong> (méthodes statistiques qui font varier plusieurs facteurs simultanément selon un protocole optimisé) pour cartographier efficacement l'espace des paramètres et identifier rapidement les conditions optimales de résolution et de temps d'analyse — une démarche bien plus efficace qu'un ajustement empirique séquentiel.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> lors d'un dosage par étalonnage externe, deux injections successives d'un même étalon donnent des aires de $10{,}2$ et $10{,}8$ (variation de $\\pm3\\%$, due à l'imprécision de l'injecteur). En utilisant un étalon interne de même comportement, quel effet attend-on sur cette variation ?</p>
      <p><strong>Solution :</strong> si le volume injecté varie de $+3\\%$ à la deuxième injection, l'aire du composé cible <em>et</em> celle de l'étalon interne augmentent toutes deux d'environ $3\\%$ (même volume injecté pour les deux).</p>
      <p class="example-answer">Le <strong>rapport</strong> des deux aires reste quasiment inchangé malgré la variation de volume injecté — c'est exactement le mécanisme qui rend l'étalonnage interne bien plus fidèle que l'étalonnage externe face aux imprécisions d'injection.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Les critères de validation (justesse, fidélité, LOD/LOQ, sélectivité) s'appliquent directement à une méthode chromatographique</li>
      <li>Étalonnage externe : simple mais sensible aux variations de volume injecté</li>
      <li>Étalon interne : rapport d'aires insensible à ces variations, améliore la fidélité</li>
      <li>Les plans d'expériences optimisent systématiquement plusieurs paramètres simultanément</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Choisir un étalon interne qui coélue exactement avec le composé cible ou avec un interférent de la matrice</li>
      <li>Optimiser les paramètres chromatographiques un par un plutôt que par un plan d'expériences, moins efficace</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un étalon interne doit être :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma6e1" value="right">ajouté en quantité connue et constante à tous les échantillons et étalons</label>
          <label class="option"><input type="radio" name="chroma6e1" value="wrong">déjà présent naturellement dans l'échantillon</label>
          <label class="option"><input type="radio" name="chroma6e1" value="wrong">de concentration inconnue</label>
          <label class="option"><input type="radio" name="chroma6e1" value="wrong">absent de tous les étalons</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma6e1','chroma6fb1','Correct — c\\'est la définition même d\\'un étalon interne correctement utilisé.','Relis la définition de l\\'étalon interne dans le cours.')">Vérifier</button>
        <div class="feedback" id="chroma6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">L'étalonnage interne améliore la fidélité car il compense principalement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma6e2" value="right">les variations de volume injecté</label>
          <label class="option"><input type="radio" name="chroma6e2" value="wrong">les erreurs de calcul</label>
          <label class="option"><input type="radio" name="chroma6e2" value="wrong">la température ambiante</label>
          <label class="option"><input type="radio" name="chroma6e2" value="wrong">la couleur du détecteur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma6e2','chroma6fb2','Correct — le rapport d\\'aires annule l\\'effet d\\'une variation proportionnelle du volume injecté.','Relis le point clé du cours sur l\\'étalon interne.')">Vérifier</button>
        <div class="feedback" id="chroma6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Un plan d'expériences, par rapport à un ajustement séquentiel des paramètres :</p>
        <div class="options">
          <label class="option"><input type="radio" name="chroma6e3" value="right">explore plusieurs facteurs simultanément, de façon plus efficace</label>
          <label class="option"><input type="radio" name="chroma6e3" value="wrong">ne fait varier aucun paramètre</label>
          <label class="option"><input type="radio" name="chroma6e3" value="wrong">est toujours plus lent</label>
          <label class="option"><input type="radio" name="chroma6e3" value="wrong">ignore la résolution</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('chroma6e3','chroma6fb3','Correct — c\\'est l\\'intérêt central des plans d\\'expériences pour l\\'optimisation chromatographique.','Relis la section du cours sur l\\'optimisation systématique.')">Vérifier</button>
        <div class="feedback" id="chroma6fb3"></div>
      </div>
    </div>
  `
};
CHROMA_NOVA_KB[chromaKey("Validation et optimisation d'une séparation chromatographique")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : validation, étalon interne et optimisation d'une séparation. Demande-moi une explication ou un indice.",
  rules: [
    { test:/[ée]talon interne/i, replies:["Un étalon interne (quantité connue et constante, absent de l'échantillon) permet un rapport d'aires insensible aux variations de volume injecté — bien plus fidèle que l'étalonnage externe."]},
    { test:/[ée]talonnage externe/i, replies:["L'étalonnage externe est simple mais sensible aux imprécisions de volume injecté entre étalons et échantillon, contrairement à l'étalon interne."]},
    { test:/plan d.exp[ée]riences/i, replies:["Un plan d'expériences fait varier plusieurs paramètres simultanément selon un protocole statistique, plus efficace qu'un ajustement séquentiel un par un."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la définition de l'étalon interne.","Il doit être présent partout, en quantité connue.","Ajouté en quantité connue et constante partout."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur l'étalon interne.","Pense à ce qui varie d'une injection à l'autre.","Les variations de volume injecté."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la section sur l'optimisation systématique.","Pense au nombre de facteurs variés simultanément.","Plusieurs facteurs à la fois, plus efficacement."]}
  ]
};

/* fusionne le module Méthodes chromatographiques dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CHROMA_CHAPTERS);
Object.assign(NOVA_KB, CHROMA_NOVA_KB);