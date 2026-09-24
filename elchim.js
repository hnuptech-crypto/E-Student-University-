/* =====================================================================
   CHUNK « elchim » — registre ELCHIM_CHAPTERS / ELCHIM_NOVA_KB
   Matière(s) : Chimie|Électrochimie
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ELCHIM_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* =====================================================================================
   MODULE — ÉLECTROCHIMIE (L3 Chimie Fondamentale)
   6 chapitres : couples redox et potentiel d'électrode, équation de Nernst, piles et
   électrolyse, courbes intensité-potentiel et cinétique électrochimique, corrosion,
   applications (accumulateurs, électrolyse industrielle). S'appuie sur la thermodynamique
   chimique (constante d'équilibre, ΔrG) déjà rédigée dans ce domaine.
   ===================================================================================== */
const ELCHIM_MATIERE = 'Électrochimie';
function elchimKey(chapterTitle){ return `Chimie|${ELCHIM_MATIERE}|${chapterTitle}`; }
const ELCHIM_CHAPTERS = {};
const ELCHIM_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
ELCHIM_CHAPTERS[elchimKey("Couples redox et potentiel d'électrode")] = {
  objectives: [
    "Identifier un couple oxydant/réducteur et équilibrer une demi-équation redox",
    "Définir l'électrode standard à hydrogène comme référence universelle",
    "Introduire le potentiel standard d'un couple redox",
    "Prévoir le sens spontané d'une réaction à partir des potentiels standard"
  ],
  prereqs: ["Chimie des solutions (L2)", "Enthalpie libre de réaction et affinité chimique (Thermodynamique chimique)"],
  bodyHtml: `
    <p>L'<strong>électrochimie</strong> étudie les réactions chimiques impliquant un <strong>transfert d'électrons</strong> — les réactions d'oxydoréduction — et leur couplage avec un travail électrique. Ce premier chapitre pose le vocabulaire et l'échelle de référence indispensables à toute la suite du cours.</p>

    <h3>1. Couple oxydant/réducteur</h3>
    <p>Un <strong>couple redox</strong> $\\text{Ox}/\\text{Red}$ relie deux espèces par une demi-équation d'échange d'électrons : $\\text{Ox} + n\\,e^- \\rightleftharpoons \\text{Red}$. L'<strong>oxydant</strong> capte des électrons (il est réduit), le <strong>réducteur</strong> en cède (il est oxydé). Une réaction d'oxydoréduction globale combine toujours deux demi-équations, l'une en sens direct, l'autre en sens inverse, de sorte que les électrons échangés s'annulent exactement.</p>

    <h3>2. L'électrode standard à hydrogène (ESH)</h3>
    <p>Le potentiel électrique d'une électrode isolée n'étant pas mesurable dans l'absolu (seule une <strong>différence</strong> de potentiel entre deux électrodes l'est), on choisit une référence conventionnelle universelle : l'<strong>électrode standard à hydrogène</strong> ($\\text{H}^+/\\text{H}_2$, activités unitaires, $P_{\\text{H}_2}=P^\\circ$), à laquelle on attribue par convention un potentiel <strong>nul à toute température</strong> : $E^\\circ(\\text{H}^+/\\text{H}_2)=0\\,\\text{V}$.</p>

    <h3>3. Potentiel standard d'un couple</h3>
    <p>Le <strong>potentiel standard</strong> $E^\\circ$ d'un couple $\\text{Ox}/\\text{Red}$ est la force électromotrice de la pile formée par ce couple (électrode dans des conditions standard) face à l'ESH. Plus $E^\\circ$ est élevé, plus l'oxydant du couple est un <strong>oxydant fort</strong> (forte tendance à capter des électrons).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé — prévoir le sens d'une réaction</span>
      Pour deux couples $\\text{Ox}_1/\\text{Red}_1$ ($E_1^\\circ$) et $\\text{Ox}_2/\\text{Red}_2$ ($E_2^\\circ$) avec $E_1^\\circ > E_2^\\circ$, la réaction spontanée (dans les conditions standard) est celle où l'oxydant du couple de <strong>potentiel le plus élevé</strong> réagit avec le réducteur du couple de <strong>potentiel le plus bas</strong> : $\\text{Ox}_1+\\text{Red}_2 \\to \\text{Red}_1+\\text{Ox}_2$. C'est la règle du « gamma » (γ), un moyen mnémotechnique classique.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> $E^\\circ(\\text{Cu}^{2+}/\\text{Cu})=+0{,}34\\,\\text{V}$, $E^\\circ(\\text{Zn}^{2+}/\\text{Zn})=-0{,}76\\,\\text{V}$. Quelle réaction est spontanée entre le cuivre métallique et les ions zinc, ou entre le zinc métallique et les ions cuivre ?</p>
      <p><strong>Solution :</strong> $E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) > E^\\circ(\\text{Zn}^{2+}/\\text{Zn})$, donc l'oxydant $\\text{Cu}^{2+}$ réagit avec le réducteur $\\text{Zn}$.</p>
      <p class="example-answer">$\\text{Cu}^{2+} + \\text{Zn} \\to \\text{Cu} + \\text{Zn}^{2+}$ est spontanée — c'est exactement le principe de la pile Daniell, étudiée au chapitre 3.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Couple redox : $\\text{Ox}+ne^-\\rightleftharpoons\\text{Red}$ ; toute réaction redox combine deux couples</li>
      <li>L'ESH sert de référence universelle, $E^\\circ(\\text{H}^+/\\text{H}_2)=0\\,\\text{V}$</li>
      <li>Règle du gamma : l'oxydant du couple de $E^\\circ$ le plus élevé réagit avec le réducteur du couple de $E^\\circ$ le plus bas</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Confondre oxydant (capte des électrons, réduit) et réducteur (cède des électrons, oxydé)</li>
      <li>Oublier que $E^\\circ$ caractérise un couple entier, pas une espèce seule</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Un oxydant est une espèce qui :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc1e1" value="wrong">cède des électrons</label>
          <label class="option"><input type="radio" name="elc1e1" value="right">capte des électrons</label>
          <label class="option"><input type="radio" name="elc1e1" value="wrong">ne réagit jamais</label>
          <label class="option"><input type="radio" name="elc1e1" value="wrong">est toujours un métal</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc1e1','elc1fb1','Correct — un oxydant capte des électrons, il est lui-même réduit.','Relis la définition du couple redox.')">Vérifier</button>
        <div class="feedback" id="elc1fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Le potentiel standard de l'ESH vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc1e2" value="right">0 V à toute température</label>
          <label class="option"><input type="radio" name="elc1e2" value="wrong">1 V</label>
          <label class="option"><input type="radio" name="elc1e2" value="wrong">dépend du pH</label>
          <label class="option"><input type="radio" name="elc1e2" value="wrong">infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc1e2','elc1fb2','Correct — c\\'est la convention de référence universelle de l\\'électrochimie.','Relis la définition de l\\'ESH.')">Vérifier</button>
        <div class="feedback" id="elc1fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Entre Cu²⁺/Cu (+0,34 V) et Zn²⁺/Zn (−0,76 V), la réaction spontanée est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc1e3" value="right">Cu²⁺ + Zn → Cu + Zn²⁺</label>
          <label class="option"><input type="radio" name="elc1e3" value="wrong">Cu + Zn²⁺ → Cu²⁺ + Zn</label>
          <label class="option"><input type="radio" name="elc1e3" value="wrong">aucune réaction n'est possible</label>
          <label class="option"><input type="radio" name="elc1e3" value="wrong">les deux sens sont équivalents</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc1e3','elc1fb3','Correct — exactement le résultat de l\\'exemple corrigé (principe de la pile Daniell).','Reprends la règle du gamma de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="elc1fb3"></div>
      </div>
    </div>
  `
};
ELCHIM_NOVA_KB[elchimKey("Couples redox et potentiel d'électrode")] = {
  intro: "Salut, moi c'est Nova ! On démarre l'électrochimie avec les couples redox et l'ESH. Demande-moi une explication ou un indice.",
  rules: [
    { test:/esh|hydrog[èe]ne/i, replies:["L'ESH (électrode standard à hydrogène) sert de référence universelle, E°=0V par convention à toute température."]},
    { test:/gamma|sens spontan[ée]/i, replies:["Règle du gamma : l'oxydant du couple de E° le plus élevé réagit avec le réducteur du couple de E° le plus bas."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la définition du couple redox.","Pense au sens du transfert d'électrons.","L'oxydant capte des électrons."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis la définition de l'ESH.","C'est une convention.","0 V."]},
    { test:/exercice\s*3/i, hint:true, replies:["Compare les deux potentiels standard.","Cu²⁺/Cu a le potentiel le plus élevé.","Cu²⁺ réagit avec Zn."]}
  ]
};

/* =========================== CHAPITRE 2 =========================== */
ELCHIM_CHAPTERS[elchimKey("Équation de Nernst et diagrammes potentiel-pH")] = {
  objectives: [
    "Établir l'équation de Nernst à partir de ΔrG=ΔrG°+RTlnQ",
    "Calculer le potentiel d'un couple en conditions non standard",
    "Introduire le principe des diagrammes potentiel-pH (Pourbaix)",
    "Lire les grands domaines d'un diagramme de Pourbaix simplifié"
  ],
  prereqs: ["Couples redox et potentiel d'électrode", "Constante d'équilibre et loi d'action de masse (Thermodynamique chimique)"],
  bodyHtml: `
    <p>Le chapitre 1 a défini le potentiel <strong>standard</strong> $E^\\circ$, valable uniquement dans des conditions de référence précises (activités unitaires). Ce chapitre généralise au cas de concentrations quelconques grâce à l'<strong>équation de Nernst</strong>, directement héritée de la relation $\\Delta_rG=\\Delta_rG^\\circ+RT\\ln Q$ déjà établie en thermodynamique chimique.</p>

    <h3>1. De $\\Delta_rG$ au potentiel d'électrode</h3>
    <p>Pour une demi-réaction $\\text{Ox}+ne^-\\rightleftharpoons\\text{Red}$, le travail électrique échangé lors du transfert de $n$ moles d'électrons sous un potentiel $E$ est relié à l'enthalpie libre par $\\Delta_rG = -nFE$, où $F=N_Ae\\approx96\\,485\\,\\text{C/mol}$ est la <strong>constante de Faraday</strong> (la charge molaire portée par les électrons).</p>

    <h3>2. L'équation de Nernst</h3>
    <p>En reportant dans $\\Delta_rG=\\Delta_rG^\\circ+RT\\ln Q$ (thermodynamique chimique, chapitre 2) et en divisant par $-nF$ :</p>
    <div class="formula-box">$$\\boxed{\\ E = E^\\circ + \\frac{RT}{nF}\\ln\\frac{a_{\\text{Ox}}}{a_{\\text{Red}}}\\ }$$</div>
    <p>À $T=298\\,\\text{K}$, en passant au logarithme décimal, $\\dfrac{RT}{F}\\ln 10 \\approx 0{,}06\\,\\text{V}$, d'où la forme numérique très utilisée :</p>
    <div class="formula-box">$$E \\approx E^\\circ + \\frac{0{,}06}{n}\\,\\log_{10}\\frac{a_{\\text{Ox}}}{a_{\\text{Red}}}$$</div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour le couple $\\text{Fe}^{3+}/\\text{Fe}^{2+}$ ($E^\\circ=0{,}77\\,\\text{V}$, $n=1$), calculer $E$ quand $[\\text{Fe}^{3+}]=10\\,[\\text{Fe}^{2+}]$.</p>
      <p><strong>Solution :</strong> $E = 0{,}77 + 0{,}06\\log_{10}(10) = 0{,}77+0{,}06\\times1$.</p>
      <p class="example-answer">$E \\approx 0{,}83\\,\\text{V}$ — un excès d'oxydant par rapport au réducteur augmente le potentiel du couple, cohérent avec l'expression de Nernst.</p>
    </div>

    <h3>3. Diagrammes potentiel-pH (Pourbaix)</h3>
    <p>De nombreux couples redox font intervenir des protons (par exemple $\\text{MnO}_4^-/\\text{Mn}^{2+}$ en milieu acide), rendant $E$ dépendant à la fois de la composition redox <em>et</em> du pH. Le <strong>diagramme de Pourbaix</strong> $(E,\\text{pH})$ représente les domaines de prédominance ou d'existence des espèces d'un élément, séparés par des frontières calculées à partir de l'équation de Nernst (pour les frontières redox) ou des constantes d'équilibre acido-basique/de précipitation (pour les frontières verticales).</p>

    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      Un diagramme de Pourbaix résume, en un seul graphique, toute la chimie redox et acido-basique d'un élément en fonction des conditions du milieu — un outil essentiel pour prédire la <strong>corrosion</strong> des métaux (chapitre 6) ou la spéciation d'un élément dans l'environnement.
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Équation de Nernst : $E=E^\\circ+\\frac{RT}{nF}\\ln(a_{\\text{Ox}}/a_{\\text{Red}})$, ou $\\approx E^\\circ+\\frac{0{,}06}{n}\\log_{10}(a_{\\text{Ox}}/a_{\\text{Red}})$ à 298 K</li>
      <li>Constante de Faraday $F\\approx96\\,485\\,\\text{C/mol}$ relie charge électrique et quantité de matière d'électrons</li>
      <li>Diagramme de Pourbaix $(E,\\text{pH})$ : domaines de prédominance/existence d'un élément selon le potentiel et le pH</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier le facteur $n$ (nombre d'électrons échangés) au dénominateur du terme logarithmique</li>
      <li>Confondre le signe : un excès d'oxydant augmente $E$, un excès de réducteur le diminue</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">L'équation de Nernst relie $E$ à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc2e1" value="wrong">la température seule</label>
          <label class="option"><input type="radio" name="elc2e1" value="right">$E^\\circ$ et au rapport des activités Ox/Red</label>
          <label class="option"><input type="radio" name="elc2e1" value="wrong">la pression seule</label>
          <label class="option"><input type="radio" name="elc2e1" value="wrong">le volume de la solution</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc2e1','elc2fb1','Correct — c\\'est exactement la formule encadrée du cours.','Relis la formule encadrée de l\\'équation de Nernst.')">Vérifier</button>
        <div class="feedback" id="elc2fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Pour Fe³⁺/Fe²⁺, si [Fe³⁺]=10[Fe²⁺], $E$ vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc2e2" value="right">0,83 V</label>
          <label class="option"><input type="radio" name="elc2e2" value="wrong">0,77 V</label>
          <label class="option"><input type="radio" name="elc2e2" value="wrong">0,71 V</label>
          <label class="option"><input type="radio" name="elc2e2" value="wrong">1,00 V</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc2e2','elc2fb2','Correct — exactement le résultat de l\\'exemple corrigé du cours.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="elc2fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Un diagramme de Pourbaix représente les domaines d'un élément en fonction de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc2e3" value="right">potentiel E et pH</label>
          <label class="option"><input type="radio" name="elc2e3" value="wrong">température et pression</label>
          <label class="option"><input type="radio" name="elc2e3" value="wrong">volume et masse</label>
          <label class="option"><input type="radio" name="elc2e3" value="wrong">temps seul</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc2e3','elc2fb3','Correct — c\\'est le diagramme (E,pH), très utile pour l\\'étude de la corrosion.','Relis la définition du diagramme de Pourbaix.')">Vérifier</button>
        <div class="feedback" id="elc2fb3"></div>
      </div>
    </div>
  `
};
ELCHIM_NOVA_KB[elchimKey("Équation de Nernst et diagrammes potentiel-pH")] = {
  intro: "Salut, c'est Nova ! On étudie l'équation de Nernst et les diagrammes de Pourbaix. Demande-moi une explication ou un indice.",
  rules: [
    { test:/nernst/i, replies:["L'équation de Nernst E=E°+(RT/nF)ln(aOx/aRed), ou ≈E°+(0,06/n)log10(aOx/aRed) à 298K, généralise E° à des concentrations quelconques."]},
    { test:/faraday/i, replies:["La constante de Faraday F≈96485 C/mol relie la charge électrique échangée à la quantité de matière d'électrons transférés."]},
    { test:/pourbaix/i, replies:["Le diagramme de Pourbaix (E,pH) montre les domaines de prédominance/existence des espèces d'un élément — essentiel pour l'étude de la corrosion."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule encadrée de Nernst.","Deux grandeurs interviennent en plus de E°.","E° et le rapport des activités."]},
    { test:/exercice\s*2/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","0,77+0,06×log10(10).","≈0,83 V."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la définition du diagramme de Pourbaix.","Deux axes.","Potentiel E et pH."]}
  ]
};

/* =========================== CHAPITRE 3 =========================== */
ELCHIM_CHAPTERS[elchimKey("Piles électrochimiques et force électromotrice")] = {
  objectives: [
    "Décrire le fonctionnement d'une pile électrochimique et le rôle du pont salin",
    "Identifier anode et cathode selon la convention en pile",
    "Calculer la force électromotrice d'une pile à partir des potentiels de Nernst",
    "Relier la fem à l'enthalpie libre de la réaction globale de la pile"
  ],
  prereqs: ["Équation de Nernst et diagrammes potentiel-pH"],
  bodyHtml: `
    <p>Ce chapitre applique directement les deux précédents à un dispositif emblématique de l'électrochimie : la <strong>pile</strong>, qui convertit spontanément l'énergie d'une réaction redox en énergie électrique exploitable — le principe même de toutes les batteries.</p>

    <h3>1. Structure d'une pile : deux demi-piles séparées</h3>
    <p>Une pile associe deux <strong>demi-piles</strong> (chacune un couple redox plongé dans sa solution), reliées par un <strong>pont salin</strong> (ou une paroi poreuse) qui assure la continuité électrique par migration d'ions, sans permettre le mélange direct des deux solutions — évitant ainsi un contact direct entre oxydant et réducteur qui court-circuiterait la réaction utile.</p>

    <h3>2. Anode et cathode en pile</h3>
    <table class="mini-table">
      <tr><th>Électrode</th><th>Réaction</th><th>Polarité (en pile, fonctionnement spontané)</th></tr>
      <tr><td>Anode</td><td>oxydation (perte d'électrons)</td><td>borne $-$ (les électrons partent de là dans le circuit externe)</td></tr>
      <tr><td>Cathode</td><td>réduction (gain d'électrons)</td><td>borne $+$</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — attention à l'inversion en électrolyse</span>
      Cette association (anode $=-$, cathode $=+$) n'est valable qu'en <strong>pile</strong> (fonctionnement spontané). En <strong>électrolyse</strong> (chapitre 4, fonctionnement forcé par un générateur externe), l'anode devient la borne $+$ — un piège classique si l'on ne retient que « anode = oxydation, cathode = réduction » (toujours vrai) sans se souvenir que la polarité associée dépend, elle, du mode de fonctionnement.
    </div>

    <h3>3. Force électromotrice</h3>
    <p>La <strong>force électromotrice</strong> (fem) $E_{\\text{pile}}$ d'une pile, mesurée à courant nul, est la différence entre les potentiels de Nernst des deux demi-piles :</p>
    <div class="formula-box">$$E_{\\text{pile}} = E_{\\text{cathode}} - E_{\\text{anode}}$$</div>
    <p>Pour que la pile fonctionne spontanément (fem positive), il faut placer en cathode le couple de potentiel de Nernst le plus élevé — cohérent avec la règle du gamma (chapitre 1).</p>

    <h3>4. Lien avec l'enthalpie libre</h3>
    <p>La fem de la pile est directement reliée à l'enthalpie libre de la réaction globale (bilan des deux demi-réactions) via la même relation qu'au chapitre 2 :</p>
    <div class="formula-box">$$\\Delta_rG = -nFE_{\\text{pile}}$$</div>
    <p>Une fem positive correspond donc à $\\Delta_rG<0$ : la réaction globale de la pile est bien spontanée, cohérent avec le critère d'évolution établi en thermodynamique chimique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — la pile Daniell</span>
      <p><strong>Énoncé :</strong> pile Daniell : $\\text{Zn}|\\text{Zn}^{2+}\\,\\|\\,\\text{Cu}^{2+}|\\text{Cu}$, avec $E^\\circ(\\text{Cu}^{2+}/\\text{Cu})=0{,}34\\,\\text{V}$ et $E^\\circ(\\text{Zn}^{2+}/\\text{Zn})=-0{,}76\\,\\text{V}$ (conditions standard). Calculer la fem standard.</p>
      <p><strong>Solution :</strong> le couple Cu²⁺/Cu, de potentiel plus élevé, est à la cathode ; Zn²⁺/Zn à l'anode. $E^\\circ_{\\text{pile}} = 0{,}34-(-0{,}76)$.</p>
      <p class="example-answer">$E^\\circ_{\\text{pile}} = 1{,}10\\,\\text{V}$ — la valeur historique de la pile Daniell, l'une des premières piles utilisables construites (1836).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Une pile associe deux demi-piles reliées par un pont salin (continuité électrique sans mélange)</li>
      <li>En pile : anode = borne $-$ (oxydation), cathode = borne $+$ (réduction) — inversé en électrolyse (chapitre 4)</li>
      <li>fem $E_{\\text{pile}}=E_{\\text{cathode}}-E_{\\text{anode}}$, reliée à $\\Delta_rG=-nFE_{\\text{pile}}$</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier que la polarité anode/cathode s'inverse entre pile et électrolyse (seule la nature oxydation/réduction reste fixe)</li>
      <li>Inverser cathode et anode dans le calcul de la fem : c'est toujours $E_{\\text{cathode}}-E_{\\text{anode}}$</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">En fonctionnement en pile, l'anode est la borne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc3e1" value="right">négative</label>
          <label class="option"><input type="radio" name="elc3e1" value="wrong">positive</label>
          <label class="option"><input type="radio" name="elc3e1" value="wrong">neutre</label>
          <label class="option"><input type="radio" name="elc3e1" value="wrong">cela dépend toujours du métal</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc3e1','elc3fb1','Correct — en pile, l\\'anode (oxydation) est la borne négative.','Relis le tableau du cours sur anode/cathode en pile.')">Vérifier</button>
        <div class="feedback" id="elc3fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">La fem de la pile Daniell (Cu²⁺/Cu = 0,34 V, Zn²⁺/Zn = −0,76 V) vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc3e2" value="right">1,10 V</label>
          <label class="option"><input type="radio" name="elc3e2" value="wrong">−0,42 V</label>
          <label class="option"><input type="radio" name="elc3e2" value="wrong">0,34 V</label>
          <label class="option"><input type="radio" name="elc3e2" value="wrong">0,76 V</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc3e2','elc3fb2','Correct — exactement le résultat historique de la pile Daniell, calculé dans l\\'exemple corrigé.','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="elc3fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Une fem positive correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc3e3" value="right">$\\Delta_rG<0$ (réaction spontanée)</label>
          <label class="option"><input type="radio" name="elc3e3" value="wrong">$\\Delta_rG>0$</label>
          <label class="option"><input type="radio" name="elc3e3" value="wrong">$\\Delta_rG=0$</label>
          <label class="option"><input type="radio" name="elc3e3" value="wrong">aucun lien avec $\\Delta_rG$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc3e3','elc3fb3','Correct — ΔrG=−nFEpile : une fem positive donne bien ΔrG négatif, réaction spontanée.','Relis la formule encadrée reliant fem et ΔrG.')">Vérifier</button>
        <div class="feedback" id="elc3fb3"></div>
      </div>
    </div>
  `
};
ELCHIM_NOVA_KB[elchimKey("Piles électrochimiques et force électromotrice")] = {
  intro: "Salut, c'est Nova ! On étudie les piles électrochimiques et la force électromotrice. Demande-moi une explication ou un indice.",
  rules: [
    { test:/anode|cathode/i, replies:["En pile : anode=oxydation=borne−, cathode=réduction=borne+. Attention, c'est inversé en électrolyse (chapitre 4) !"]},
    { test:/fem|force [ée]lectromotrice/i, replies:["Epile=Ecathode−Eanode, reliée à ΔrG=−nFEpile : une fem positive signifie une réaction spontanée."]},
    { test:/daniell/i, replies:["La pile Daniell (Zn/Cu) a une fem standard de 1,10 V — l'une des premières piles pratiques de l'histoire (1836)."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis le tableau anode/cathode en pile.","L'oxydation a lieu où les électrons partent.","Anode = borne négative."]},
    { test:/exercice\s*2/i, hint:true, replies:["Reprends l'exemple corrigé.","0,34−(−0,76).","1,10 V."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis la formule ΔrG=−nFEpile.","Une fem positive donne quel signe pour ΔrG ?","ΔrG négatif, réaction spontanée."]}
  ]
};

/* =========================== CHAPITRE 4 =========================== */
ELCHIM_CHAPTERS[elchimKey("Électrolyse et lois de Faraday")] = {
  objectives: [
    "Distinguer électrolyse et pile par le sens imposé de la réaction",
    "Établir les lois de Faraday reliant charge électrique et quantité de matière transformée",
    "Introduire la notion de surtension et son effet sur la tension de décomposition",
    "Appliquer les lois de Faraday à un calcul de dépôt métallique"
  ],
  prereqs: ["Piles électrochimiques et force électromotrice"],
  bodyHtml: `
    <p>Contrairement à la pile (chapitre 3), qui exploite une réaction <strong>spontanée</strong>, l'<strong>électrolyse</strong> impose, à l'aide d'un générateur électrique externe, une réaction chimique qui ne se produirait pas spontanément — c'est le principe du placage métallique, de la production industrielle d'aluminium et de dichlore, et de la recharge des accumulateurs.</p>

    <h3>1. Électrolyse : forcer une réaction non spontanée</h3>
    <p>Dans un électrolyseur, un générateur impose un courant à travers la cellule, forçant la réaction dans le sens <strong>inverse</strong> de celui que donnerait la règle du gamma (chapitre 1) en l'absence de générateur. La tension minimale à appliquer pour observer un début d'électrolyse notable, la <strong>tension de décomposition</strong>, doit au moins compenser la fem « à l'envers » de la pile associée — en pratique, elle est souvent supérieure à cause des <strong>surtensions</strong> (chapitre 5) liées à la cinétique des réactions aux électrodes.</p>

    <h3>2. Les lois de Faraday</h3>
    <p>La charge électrique totale $Q$ ayant traversé le circuit pendant une durée $t$, sous un courant $I$ (supposé constant), est $Q=It$. Cette charge est directement reliée à la quantité de matière $n$ transformée à une électrode, via la constante de Faraday (chapitre 2) :</p>
    <div class="formula-box">$$\\boxed{\\ Q = n_{e^-}\\,F = It\\ }, \\qquad n_{e^-} = n\\times|\\nu_{e^-}|$$</div>
    <p>où $n_{e^-}$ est la quantité de matière d'électrons échangés et $|\\nu_{e^-}|$ le nombre d'électrons échangés par mole de l'espèce considérée dans la demi-équation. C'est la <strong>loi de Faraday</strong> : la quantité de matière transformée est <strong>proportionnelle</strong> à la charge électrique ayant traversé la cellule — une relation d'une précision remarquable, à la base de toute la métrologie électrochimique.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> on dépose du cuivre par électrolyse ($\\text{Cu}^{2+}+2e^-\\to\\text{Cu}$) sous un courant $I=2\\,\\text{A}$ pendant $t=1\\,\\text{h}=3600\\,\\text{s}$. Calculer la masse de cuivre déposée ($M_{\\text{Cu}}=63{,}5\\,\\text{g/mol}$).</p>
      <p><strong>Solution :</strong> $Q=It=2\\times3600=7200\\,\\text{C}$. $n_{e^-}=Q/F=7200/96485\\approx0{,}0746\\,\\text{mol}$. Comme $\\nu_{e^-}=2$ par mole de Cu : $n_{\\text{Cu}} = n_{e^-}/2 \\approx 0{,}0373\\,\\text{mol}$.</p>
      <p class="example-answer">$m_{\\text{Cu}} = n_{\\text{Cu}}\\times M_{\\text{Cu}} \\approx 0{,}0373\\times63{,}5 \\approx 2{,}37\\,\\text{g}$ — un calcul type d'électrométallurgie, transposable à tout dépôt métallique industriel.</p>
    </div>

    <h3>3. Aperçu de la surtension</h3>
    <p>La tension de décomposition réelle dépasse en général la valeur théorique (fem inverse), à cause de la <strong>surtension</strong> — un excès de potentiel nécessaire pour que la réaction à l'électrode se produise à une vitesse notable, lié à la cinétique de transfert électronique (chapitre 5). Cet écart, source de pertes énergétiques en électrolyse industrielle, est activement minimisé par le choix de matériaux d'électrode catalytiques appropriés.</p>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>L'électrolyse force, via un générateur, une réaction non spontanée — l'inverse du fonctionnement en pile</li>
      <li>Loi de Faraday : $Q=n_{e^-}F=It$, reliant charge électrique et quantité de matière transformée</li>
      <li>La tension de décomposition réelle dépasse la valeur théorique à cause des surtensions (chapitre 5)</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Oublier de diviser par le nombre d'électrons échangés $|\\nu_{e^-}|$ pour passer de $n_{e^-}$ à $n$ (quantité de matière de l'espèce elle-même)</li>
      <li>Confondre pile (fem positive, réaction spontanée) et électrolyse (tension imposée, réaction forcée)</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La loi de Faraday relie la charge électrique $Q$ à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc4e1" value="wrong">la température de la solution</label>
          <label class="option"><input type="radio" name="elc4e1" value="right">la quantité de matière transformée à l'électrode</label>
          <label class="option"><input type="radio" name="elc4e1" value="wrong">le volume de la cellule</label>
          <label class="option"><input type="radio" name="elc4e1" value="wrong">la couleur de la solution</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc4e1','elc4fb1','Correct — Q=ne−F, proportionnelle à la quantité de matière d\\'électrons échangés.','Relis la formule encadrée de la loi de Faraday.')">Vérifier</button>
        <div class="feedback" id="elc4fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Sous $I=2\\,\\text{A}$ pendant 1h, la masse de cuivre déposée est environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc4e2" value="right">2,4 g</label>
          <label class="option"><input type="radio" name="elc4e2" value="wrong">7,2 g</label>
          <label class="option"><input type="radio" name="elc4e2" value="wrong">0,7 g</label>
          <label class="option"><input type="radio" name="elc4e2" value="wrong">63,5 g</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc4e2','elc4fb2','Correct — exactement le résultat de l\\'exemple corrigé (≈2,37 g).','Reprends le calcul de l\\'exemple corrigé.')">Vérifier</button>
        <div class="feedback" id="elc4fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'électrolyse, contrairement à la pile :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc4e3" value="wrong">exploite une réaction spontanée</label>
          <label class="option"><input type="radio" name="elc4e3" value="right">force une réaction non spontanée grâce à un générateur externe</label>
          <label class="option"><input type="radio" name="elc4e3" value="wrong">ne fait intervenir aucun courant</label>
          <label class="option"><input type="radio" name="elc4e3" value="wrong">n'a pas d'électrodes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc4e3','elc4fb3','Correct — c\\'est la différence fondamentale entre pile (spontanée) et électrolyse (forcée).','Relis l\\'introduction du cours sur l\\'électrolyse.')">Vérifier</button>
        <div class="feedback" id="elc4fb3"></div>
      </div>
    </div>
  `
};
ELCHIM_NOVA_KB[elchimKey("Électrolyse et lois de Faraday")] = {
  intro: "Salut, moi c'est Nova ! On étudie l'électrolyse et les lois de Faraday. Demande-moi une explication ou un indice.",
  rules: [
    { test:/faraday|Q=/i, replies:["La loi de Faraday Q=ne−F=It relie la charge électrique à la quantité de matière transformée à l'électrode — la base de tous les calculs de dépôt métallique."]},
    { test:/surtension/i, replies:["La surtension est l'excès de potentiel nécessaire pour que la réaction électrochimique se produise à vitesse notable — source de pertes énergétiques en électrolyse industrielle."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la formule de Faraday.","Q est reliée à une quantité de matière.","La quantité de matière transformée à l'électrode."]},
    { test:/exercice\s*2/i, hint:true, replies:["Reprends le calcul de l'exemple corrigé.","Calcule Q puis ne− puis nCu.","≈2,4 g."]},
    { test:/exercice\s*3/i, hint:true, replies:["Relis l'introduction sur l'électrolyse.","Pense au rôle du générateur.","Elle force une réaction non spontanée."]}
  ]
};

/* =========================== CHAPITRE 5 =========================== */
ELCHIM_CHAPTERS[elchimKey("Courbes intensité-potentiel et cinétique électrochimique")] = {
  objectives: [
    "Tracer et interpréter une courbe intensité-potentiel qualitative",
    "Définir la surtension anodique et cathodique",
    "Distinguer système rapide et système lent à une électrode",
    "Prévoir la tension de décomposition réelle d'une électrolyse"
  ],
  prereqs: ["Électrolyse et lois de Faraday"],
  bodyHtml: `
    <p>Les chapitres précédents ont traité l'électrochimie du point de vue <strong>thermodynamique</strong> (potentiels de Nernst, à courant nul). Ce chapitre introduit l'aspect <strong>cinétique</strong>, indispensable pour comprendre ce qui se passe réellement lorsqu'un courant non nul traverse une électrode — la clé pour expliquer les surtensions mentionnées au chapitre précédent.</p>

    <h3>1. La courbe intensité-potentiel</h3>
    <p>Pour une électrode donnée, on trace le courant $i$ (positif pour une oxydation anodique, négatif pour une réduction cathodique, convention usuelle) en fonction du potentiel $E$ imposé à l'électrode. Au potentiel de Nernst du couple (chapitre 2), le courant est nul (équilibre) ; en s'écartant de ce potentiel, un courant net apparaît, d'autant plus grand que l'écart au potentiel d'équilibre augmente.</p>

    <h3>2. Surtension anodique et cathodique</h3>
    <div class="key-point">
      <span class="eyebrow">Surtension</span>
      La <strong>surtension</strong> $\\eta = E - E_{eq}$ est l'écart entre le potentiel réellement appliqué à l'électrode et son potentiel d'équilibre (Nernst). $\\eta>0$ favorise l'oxydation (anodique), $\\eta<0$ favorise la réduction (cathodique) — plus $|\\eta|$ est grand, plus le courant net (dans le sens correspondant) est important.
    </div>

    <h3>3. Systèmes rapides et systèmes lents</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Comportement de la courbe $i(E)$</th><th>Exemple typique</th></tr>
      <tr><td>Système rapide</td><td>courant croît très vite dès que $E$ s'écarte de $E_{eq}$ (pente raide)</td><td>couples Fe³⁺/Fe²⁺, I₂/I⁻ sur électrode de platine</td></tr>
      <tr><td>Système lent</td><td>il faut une surtension notable avant d'observer un courant significatif (palier plat)</td><td>dégagement de H₂ ou O₂ sur de nombreuses électrodes</td></tr>
    </table>
    <p>La lenteur d'un système à une électrode donnée dépend fortement de la nature du matériau d'électrode (effet catalytique) — un même couple peut être rapide sur une électrode et lent sur une autre.</p>

    <h3>4. Tension de décomposition réelle</h3>
    <p>En électrolyse (chapitre 4), la tension minimale à appliquer pour observer un courant notable est la somme de la fem théorique « à l'envers » <strong>et</strong> des surtensions cumulées aux deux électrodes (l'une anodique, l'autre cathodique) :</p>
    <div class="formula-box">$$U_{\\text{déc}} = E^\\circ_{\\text{cathode(forcée)}} - E^\\circ_{\\text{anode(forcée)}} + |\\eta_a| + |\\eta_c|$$</div>
    <p>C'est cette tension réelle, généralement supérieure à la simple différence de potentiels standard, qui détermine la consommation électrique effective d'un électrolyseur industriel.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi l'électrolyse de l'eau (production de $\\text{H}_2$ et $\\text{O}_2$) nécessite-t-elle en pratique une tension bien supérieure à la valeur théorique de $1{,}23\\,\\text{V}$ (fem inverse de la pile à combustible correspondante) ?</p>
      <p><strong>Solution :</strong> les dégagements gazeux de $\\text{H}_2$ (cathode) et surtout $\\text{O}_2$ (anode) sont des systèmes lents sur la plupart des matériaux d'électrode usuels, avec des surtensions parfois de plusieurs centaines de mV chacune.</p>
      <p class="example-answer">La tension réelle appliquée doit compenser ces surtensions en plus de la fem théorique, d'où des tensions pratiques souvent proches de $1{,}8$–$2\\,\\text{V}$ — un coût énergétique supplémentaire que les électrolyseurs industriels cherchent à réduire par des catalyseurs performants (enjeu majeur pour la production d'hydrogène vert).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>Courbe intensité-potentiel : $i=0$ au potentiel d'équilibre de Nernst, croît avec l'écart au potentiel d'équilibre</li>
      <li>Surtension $\\eta=E-E_{eq}$ : $\\eta>0$ favorise l'oxydation, $\\eta<0$ la réduction</li>
      <li>Système rapide (pente raide) vs lent (palier, surtension notable requise) — dépend du couple ET du matériau d'électrode</li>
      <li>$U_{\\text{déc}}$ réelle = fem théorique + surtensions cumulées aux deux électrodes</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire que la surtension est une propriété fixe d'un couple redox : elle dépend fortement du matériau d'électrode</li>
      <li>Oublier que la tension de décomposition réelle inclut deux surtensions (anodique ET cathodique), pas une seule</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">La surtension $\\eta$ est définie comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc5e1" value="wrong">le potentiel standard du couple</label>
          <label class="option"><input type="radio" name="elc5e1" value="right">l'écart entre le potentiel appliqué et le potentiel d'équilibre</label>
          <label class="option"><input type="radio" name="elc5e1" value="wrong">la charge électrique totale</label>
          <label class="option"><input type="radio" name="elc5e1" value="wrong">le courant à l'électrode</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc5e1','elc5fb1','Correct — η=E−Eeq, l\\'écart au potentiel de Nernst.','Relis l\\'encadré du cours sur la surtension.')">Vérifier</button>
        <div class="feedback" id="elc5fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Un système lent se caractérise par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc5e2" value="wrong">un courant qui apparaît dès $E=E_{eq}$</label>
          <label class="option"><input type="radio" name="elc5e2" value="right">une surtension notable nécessaire avant d'observer un courant significatif</label>
          <label class="option"><input type="radio" name="elc5e2" value="wrong">l'absence totale de courant, toujours</label>
          <label class="option"><input type="radio" name="elc5e2" value="wrong">un potentiel de Nernst infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc5e2','elc5fb2','Correct — c\\'est exactement la définition d\\'un système lent, comme les dégagements gazeux H2/O2.','Relis le tableau du cours sur systèmes rapides/lents.')">Vérifier</button>
        <div class="feedback" id="elc5fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">L'électrolyse de l'eau nécessite une tension pratique supérieure à 1,23 V car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc5e3" value="wrong">1,23 V est une erreur théorique</label>
          <label class="option"><input type="radio" name="elc5e3" value="right">les dégagements gazeux ont des surtensions notables</label>
          <label class="option"><input type="radio" name="elc5e3" value="wrong">l'eau n'est pas électrolysable</label>
          <label class="option"><input type="radio" name="elc5e3" value="wrong">la température est trop basse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc5e3','elc5fb3','Correct — exactement l\\'explication de l\\'exemple corrigé, un enjeu clé pour l\\'hydrogène vert.','Reprends l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="elc5fb3"></div>
      </div>
    </div>
  `
};
ELCHIM_NOVA_KB[elchimKey("Courbes intensité-potentiel et cinétique électrochimique")] = {
  intro: "Salut, c'est Nova ! On étudie les courbes intensité-potentiel et la cinétique électrochimique. Demande-moi une explication ou un indice.",
  rules: [
    { test:/surtension/i, replies:["La surtension η=E−Eeq est l'écart au potentiel d'équilibre : η>0 favorise l'oxydation, η<0 la réduction."]},
    { test:/syst[èe]me rapide|syst[èe]me lent/i, replies:["Système rapide: courant apparaît dès qu'on s'écarte de Eeq. Système lent (ex: H2, O2): il faut une surtension notable — dépend du matériau d'électrode."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis l'encadré sur la surtension.","C'est un écart de potentiel.","η=E−Eeq."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le tableau systèmes rapides/lents.","Pense au palier plat de la courbe.","Surtension notable nécessaire."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends l'exemple corrigé.","Pense aux dégagements de H2 et O2.","Ce sont des systèmes lents, surtensions notables."]}
  ]
};

/* =========================== CHAPITRE 6 =========================== */
ELCHIM_CHAPTERS[elchimKey("Corrosion et protection des métaux")] = {
  objectives: [
    "Décrire le mécanisme électrochimique de la corrosion humide",
    "Distinguer corrosion uniforme et corrosion localisée (pile de concentration/aération)",
    "Présenter les principes de la protection cathodique",
    "Relier la série électrochimique au choix des matériaux et alliages"
  ],
  prereqs: ["Courbes intensité-potentiel et cinétique électrochimique"],
  bodyHtml: `
    <p>Ce dernier chapitre applique tous les outils précédents à un problème d'ingénierie omniprésent et coûteux : la <strong>corrosion</strong> des métaux — un phénomène fondamentalement <strong>électrochimique</strong>, qui se comprend entièrement à partir des potentiels redox, des courbes intensité-potentiel et des piles.</p>

    <h3>1. Le mécanisme électrochimique de la corrosion humide</h3>
    <p>La corrosion d'un métal en milieu humide (air + eau) résulte d'une <strong>pile de corrosion</strong> locale, à la surface même du métal : une zone anodique où le métal s'oxyde ($\\text{M} \\to \\text{M}^{n+}+ne^-$) et une zone cathodique où les électrons libérés réduisent une espèce du milieu (typiquement $\\text{O}_2+2\\text{H}_2\\text{O}+4e^-\\to4\\text{OH}^-$ en milieu neutre/aéré, ou $2\\text{H}^++2e^-\\to\\text{H}_2$ en milieu acide). Le métal lui-même sert de conducteur électronique reliant les deux zones — exactement la structure d'une pile, mais « court-circuitée » à l'échelle microscopique sur une même pièce.</p>

    <h3>2. Corrosion uniforme et corrosion localisée</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Origine</th><th>Danger relatif</th></tr>
      <tr><td>Uniforme</td><td>zones anodique/cathodique réparties uniformément et changeant sans cesse de position</td><td>attaque prévisible, lente, facile à anticiper</td></tr>
      <tr><td>Localisée (piqûre)</td><td>hétérogénéité fixe (défaut, joint de grain, différence locale d'aération ou de concentration créant une <strong>pile de concentration</strong>)</td><td>attaque concentrée en un point précis, peut perforer rapidement une pièce en apparence intacte</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — la pile d'aération différentielle</span>
      Une zone <strong>moins</strong> exposée à l'oxygène (sous un dépôt, dans une fissure) devient <strong>anodique</strong> par rapport à une zone mieux aérée : c'est contre-intuitif (on pourrait croire que le manque d'oxygène protège), mais c'est justement ce déséquilibre local en oxygène qui crée la pile de corrosion et concentre l'attaque dans la zone confinée — un mécanisme fréquent de corrosion sous dépôt ou en interstice.
    </div>

    <h3>3. Protection cathodique</h3>
    <p>Le principe de la <strong>protection cathodique</strong> consiste à forcer, artificiellement, le métal à protéger à jouer le rôle de <strong>cathode</strong> (où l'on ne peut avoir d'oxydation du métal) plutôt que d'anode. Deux mises en œuvre principales :</p>
    <ul>
      <li><strong>Anode sacrificielle</strong> : on relie électriquement le métal à protéger à un métal plus réducteur (potentiel standard plus bas — par exemple du zinc pour protéger une coque de bateau en acier). Ce métal sacrificiel s'oxyde préférentiellement (exactement la règle du gamma du chapitre 1), protégeant ainsi le métal principal — au prix de sa propre consommation progressive, qu'il faut renouveler périodiquement.</li>
      <li><strong>Courant imposé</strong> : un générateur externe force un courant qui maintient le métal à protéger à un potentiel suffisamment bas (cathodique) pour empêcher toute oxydation, sans consommer d'anode sacrificielle.</li>
    </ul>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pourquoi utilise-t-on du zinc (et non du cuivre) comme anode sacrificielle pour protéger une coque de bateau en acier (fer) ?</p>
      <p><strong>Solution :</strong> $E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = -0{,}76\\,\\text{V} < E^\\circ(\\text{Fe}^{2+}/\\text{Fe}) \\approx -0{,}44\\,\\text{V} < E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) = +0{,}34\\,\\text{V}$.</p>
      <p class="example-answer">Le zinc, réducteur plus fort que le fer (potentiel plus bas), s'oxyde préférentiellement et protège le fer. Le cuivre ferait l'inverse : étant un réducteur plus faible que le fer, c'est le <em>fer</em> qui s'oxyderait à sa place — accélérant la corrosion au lieu de la ralentir, un choix de matériau catastrophique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box"><span class="eyebrow">✦ L'essentiel à retenir</span><ul>
      <li>La corrosion humide est une pile de corrosion locale : zone anodique (oxydation du métal) + zone cathodique (réduction d'O₂ ou H⁺)</li>
      <li>La corrosion localisée (piqûre) est plus dangereuse que la corrosion uniforme, souvent due à une pile d'aération différentielle</li>
      <li>Protection cathodique : anode sacrificielle (métal plus réducteur) ou courant imposé, pour maintenir le métal en cathode</li>
    </ul></div>
    <div class="mistakes-box"><span class="eyebrow">⚠ Erreurs fréquentes</span><ul>
      <li>Croire qu'une zone peu aérée est protégée : c'est l'inverse, elle devient anodique et s'y concentre l'attaque</li>
      <li>Choisir une anode sacrificielle de potentiel standard <em>supérieur</em> à celui du métal à protéger : elle accélérerait la corrosion au lieu de la freiner</li>
    </ul></div>
    <div class="exercises"><span class="eyebrow">Exercices</span>
      <div class="exercise-card"><span class="eyebrow">Exercice 1</span>
        <p class="q">Dans une pile de corrosion, le métal s'oxyde à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc6e1" value="right">la zone anodique</label>
          <label class="option"><input type="radio" name="elc6e1" value="wrong">la zone cathodique</label>
          <label class="option"><input type="radio" name="elc6e1" value="wrong">n'importe où indifféremment</label>
          <label class="option"><input type="radio" name="elc6e1" value="wrong">jamais, la corrosion n'est pas électrochimique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc6e1','elc6fb1','Correct — l\\'oxydation (dissolution du métal) a toujours lieu à l\\'anode.','Relis la définition du mécanisme de corrosion humide.')">Vérifier</button>
        <div class="feedback" id="elc6fb1"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 2</span>
        <p class="q">Une zone peu aérée d'une pièce métallique devient, par rapport à une zone bien aérée :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc6e2" value="right">anodique (plus attaquée)</label>
          <label class="option"><input type="radio" name="elc6e2" value="wrong">cathodique (protégée)</label>
          <label class="option"><input type="radio" name="elc6e2" value="wrong">neutre, aucun effet</label>
          <label class="option"><input type="radio" name="elc6e2" value="wrong">inerte chimiquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc6e2','elc6fb2','Correct — c\\'est le mécanisme contre-intuitif de la pile d\\'aération différentielle expliqué dans le point clé du cours.','Relis le point clé sur la pile d\\'aération différentielle.')">Vérifier</button>
        <div class="feedback" id="elc6fb2"></div>
      </div>
      <div class="exercise-card"><span class="eyebrow">Exercice 3</span>
        <p class="q">Pour protéger une coque en fer, une anode sacrificielle doit avoir un potentiel standard :</p>
        <div class="options">
          <label class="option"><input type="radio" name="elc6e3" value="right">inférieur à celui du fer</label>
          <label class="option"><input type="radio" name="elc6e3" value="wrong">supérieur à celui du fer</label>
          <label class="option"><input type="radio" name="elc6e3" value="wrong">égal à celui du fer</label>
          <label class="option"><input type="radio" name="elc6e3" value="wrong">le potentiel n'a pas d'importance</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('elc6e3','elc6fb3','Correct — exactement le raisonnement de l\\'exemple corrigé sur le choix du zinc plutôt que du cuivre.','Reprends le raisonnement de l\\'exemple corrigé du cours.')">Vérifier</button>
        <div class="feedback" id="elc6fb3"></div>
      </div>
    </div>
  `
};
ELCHIM_NOVA_KB[elchimKey("Corrosion et protection des métaux")] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre : corrosion et protection des métaux. Demande-moi une explication ou un indice.",
  rules: [
    { test:/pile de corrosion|corrosion/i, replies:["La corrosion humide est une pile de corrosion locale : zone anodique (oxydation du métal) reliée à une zone cathodique (réduction d'O2 ou H+) via le métal lui-même comme conducteur."]},
    { test:/a[ée]ration diff[ée]rentielle/i, replies:["Une zone peu aérée devient anodique (plus attaquée) par rapport à une zone bien aérée — contre-intuitif mais fréquent en corrosion sous dépôt."]},
    { test:/protection cathodique|anode sacrificielle/i, replies:["La protection cathodique force le métal à protéger à jouer le rôle de cathode, via une anode sacrificielle (métal plus réducteur, comme le zinc pour l'acier) ou un courant imposé."]},
    { test:/exercice\s*1/i, hint:true, replies:["Relis la définition du mécanisme de corrosion.","L'oxydation a lieu à un type de zone précis.","La zone anodique."]},
    { test:/exercice\s*2/i, hint:true, replies:["Relis le point clé sur la pile d'aération différentielle.","C'est contre-intuitif.","Anodique, plus attaquée."]},
    { test:/exercice\s*3/i, hint:true, replies:["Reprends le raisonnement de l'exemple corrigé.","Compare les potentiels de Zn et Cu au fer.","Inférieur à celui du fer."]}
  ]
};

/* fusionne le module Électrochimie dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ELCHIM_CHAPTERS);
Object.assign(NOVA_KB, ELCHIM_NOVA_KB);