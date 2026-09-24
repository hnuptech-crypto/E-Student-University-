/* =====================================================================
   CHUNK « specorg » — registre SPECORG_CHAPTERS / SPECORG_NOVA_KB
   Matière(s) : Chimie|Spectroscopie organique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   SPECORG_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */


/* ============================================================================
   MODULE SPECTROSCOPIE ORGANIQUE — Chimie L3 (Physique Fondamentale et
   Chimie Fondamentale)
   (contenu rédigé selon le programme standard de spectroscopie organique de
   L3 dans les universités francophones : spectroscopie UV-visible et
   chromophores, spectroscopie infrarouge et vibrations moléculaires,
   résonance magnétique nucléaire du proton (déplacement chimique, couplage
   spin-spin), RMN du carbone-13 et techniques d'édition (DEPT), principes et
   ionisation en spectrométrie de masse, mécanismes de fragmentation, et
   élucidation structurale par couplage des méthodes — conforme aux maquettes
   LMD et aux cours de référence (R.M. Silverstein, F.X. Webster, D.J. Kiemle,
   Spectrometric Identification of Organic Compounds, Wiley ; D.H. Williams &
   I. Fleming, Spectroscopic Methods in Organic Chemistry, McGraw-Hill ; cours
   RMN L3 ENS Lyon ; cours Spectrométrie de Masse L3 Université de
   Strasbourg). Ce module prolonge le cours « Synthèse organique » (analyse
   rétrosynthétique) et le cours « Chimie organique descriptive » (groupes
   fonctionnels) en donnant les outils d'identification structurale
   indispensables à toute étude expérimentale en chimie organique.
   Structure identique aux autres modules : SPECORG_CHAPTERS / SPECORG_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const SPECORG_MATIERE = 'Spectroscopie organique';
function specKey(chapterTitle){ return `Chimie|${SPECORG_MATIERE}|${chapterTitle}`; }
const SPECORG_CHAPTERS = {};
const SPECORG_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de la loi de Beer-Lambert (chapitre 1)
--------------------------------------------------------------------------------- */
function updateBeerLambert(){
  const eps = parseFloat(document.getElementById('blEpsilon').value) || 0;
  const c = parseFloat(document.getElementById('blConc').value) || 0;
  const l = parseFloat(document.getElementById('blLongueur').value) || 1;
  const A = eps * c * l;
  const T = Math.pow(10, -A);
  const out = document.getElementById('blReadout');
  out.innerHTML = `Absorbance : A = ε·c·l = ${eps.toExponential(2)} × ${c.toExponential(2)} × ${l.toFixed(2)} = <strong>${A.toFixed(3)}</strong><br>` +
    `Transmittance correspondante : T = 10⁻ᴬ ≈ <strong>${(T*100).toFixed(1)} %</strong>`;
}
function initBeerLambert(){ updateBeerLambert(); }

/* =========================== CHAPITRE 1 — Spectroscopie UV-visible : transitions électroniques et chromophores =========================== */
SPECORG_CHAPTERS[specKey("Spectroscopie UV-visible : transitions électroniques et chromophores")] = {
  objectives: [
    "Relier l'absorption UV-visible aux transitions électroniques entre orbitales moléculaires",
    "Énoncer et appliquer la loi de Beer-Lambert pour relier absorbance et concentration",
    "Distinguer les transitions σ→σ*, n→σ*, π→π* et n→π* selon leur domaine d'énergie",
    "Définir chromophore, auxochrome, effet bathochrome et effet hyperchrome",
    "Prévoir qualitativement l'effet d'une conjugaison étendue sur la longueur d'onde d'absorption"
  ],
  prereqs: ["La méthode de Hückel et les systèmes π conjugués (Introduction à la chimie quantique)", "Fonctions organiques mixtes et mécanismes réactionnels"],
  bodyHtml: `
    <p>La spectroscopie UV-visible sonde les <strong>transitions électroniques</strong> d'une molécule : l'absorption d'un photon dans le domaine ultraviolet (200-400 nm) ou visible (400-800 nm) promeut un électron d'une orbitale moléculaire occupée vers une orbitale vacante d'énergie supérieure. C'est la première grande technique spectroscopique de ce module, et elle prolonge directement les diagrammes d'orbitales moléculaires établis dans le cours de chimie quantique (méthode de Hückel notamment).</p>

    <h3>1. Loi de Beer-Lambert</h3>
    <p>L'intensité de l'absorption est régie par la <strong>loi de Beer-Lambert</strong>, reliant l'absorbance $A$ à la concentration $c$ de l'espèce absorbante et à la longueur $l$ du trajet optique dans la cuve :</p>
    <div class="formula-box">$$A = \\varepsilon \\cdot c \\cdot l$$</div>
    <p>où $\\varepsilon$ (en L·mol⁻¹·cm⁻¹) est le <strong>coefficient d'absorption molaire</strong>, une grandeur caractéristique de la transition électronique considérée à une longueur d'onde donnée. Un $\\varepsilon$ élevé (souvent $10^3$ à $10^5$) traduit une transition <strong>permise</strong> par les règles de sélection ; un $\\varepsilon$ faible ($\\lesssim100$) traduit une transition formellement interdite mais partiellement autorisée par des couplages vibroniques.</p>

    <h3>2. Les quatre grands types de transitions électroniques</h3>
    <table class="mini-table">
      <tr><th>Transition</th><th>Domaine d'énergie</th><th>Exemple</th></tr>
      <tr><td>$\\sigma\\rightarrow\\sigma^*$</td><td>très haute énergie (UV lointain, &lt;150 nm)</td><td>alcanes saturés</td></tr>
      <tr><td>$n\\rightarrow\\sigma^*$</td><td>haute énergie (150-250 nm)</td><td>amines, alcools, halogénures (doublet non liant)</td></tr>
      <tr><td>$\\pi\\rightarrow\\pi^*$</td><td>modérée, $\\varepsilon$ élevé</td><td>alcènes, aromatiques, carbonyles conjugués</td></tr>
      <tr><td>$n\\rightarrow\\pi^*$</td><td>plus basse énergie, $\\varepsilon$ faible (transition interdite par symétrie)</td><td>groupe carbonyle C=O isolé (~280 nm, $\\varepsilon\\approx15$-30)</td></tr>
    </table>
    <p>Seules les transitions $\\pi\\rightarrow\\pi^*$ et $n\\rightarrow\\pi^*$ tombent généralement dans le domaine accessible aux spectrophotomètres UV-visible usuels (200-800 nm) : la spectroscopie UV-visible en chimie organique s'intéresse donc presque exclusivement aux molécules possédant des systèmes $\\pi$ (alcènes, aromatiques, carbonyles, systèmes conjugués).</p>

    <h3>3. Chromophores et auxochromes</h3>
    <p>Un <strong>chromophore</strong> est le groupement fonctionnel responsable de l'absorption (C=C, C=O, cycle aromatique, système conjugué...). Un <strong>auxochrome</strong> est un groupe qui ne possède pas lui-même de bande d'absorption significative dans l'UV-visible proche, mais qui, attaché à un chromophore, modifie son absorption par son doublet non liant conjugué au système $\\pi$ (—OH, —NH₂, —OR, halogènes) : on parle d'<strong>effet bathochrome</strong> (déplacement vers les grandes longueurs d'onde, « vers le rouge ») lorsque l'auxochrome allonge la conjugaison effective, et d'<strong>effet hyperchrome</strong> lorsqu'il augmente l'intensité de l'absorption (augmentation de $\\varepsilon$).</p>

    <div class="key-point">
      <span class="eyebrow">La conjugaison abaisse l'énergie de la transition</span>
      Ce résultat, déjà rencontré au chapitre sur la méthode de Hückel, se manifeste directement en spectroscopie UV-visible : plus un système $\\pi$ conjugué est étendu, plus l'écart HOMO-LUMO diminue, plus la transition $\\pi\\rightarrow\\pi^*$ nécessite un photon de basse énergie — donc de grande longueur d'onde. C'est pourquoi l'éthylène absorbe vers 165 nm (invisible aux spectrophotomètres classiques), le butadiène vers 217 nm, et des polyènes plus longs (comme le β-carotène, 11 doubles liaisons conjuguées) absorbent dans le visible, ce qui explique leur couleur orangée.
    </div>

    <table class="mini-table">
      <tr><th>Composé</th><th>λ<sub>max</sub> (π→π*)</th><th>Nombre de doubles liaisons conjuguées</th></tr>
      <tr><td>Éthylène</td><td>165 nm</td><td>1</td></tr>
      <tr><td>Butadiène</td><td>217 nm</td><td>2</td></tr>
      <tr><td>Hexatriène</td><td>258 nm</td><td>3</td></tr>
      <tr><td>β-carotène</td><td>~450 nm (visible, orange)</td><td>11</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une solution de concentration $c=2{,}0\\times10^{-5}$ mol·L⁻¹ d'un composé organique, placée dans une cuve de $l=1{,}0$ cm, présente une absorbance $A=0{,}70$ à son $\\lambda_{max}$. Calculer $\\varepsilon$ à cette longueur d'onde.</p>
      <p><strong>Solution :</strong> $\\varepsilon = A/(c\\times l) = 0{,}70/(2{,}0\\times10^{-5}\\times1{,}0) = 3{,}5\\times10^{4}$ L·mol⁻¹·cm⁻¹.</p>
      <p class="example-answer">Réponse : $\\varepsilon\\approx3{,}5\\times10^4$ L·mol⁻¹·cm⁻¹ — une valeur élevée, typique d'une transition π→π* permise dans un système conjugué.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <line x1="10" y1="60" x2="110" y2="60" stroke="#122043" stroke-width="1"/>
          <line x1="10" y1="60" x2="10" y2="6" stroke="#122043" stroke-width="1"/>
          <line x1="20" y1="45" x2="50" y2="45" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="20" y1="20" x2="50" y2="20" stroke="#F0555C" stroke-width="1.4"/>
          <line x1="70" y1="38" x2="100" y2="38" stroke="#3D6BF0" stroke-width="1.4"/>
          <line x1="70" y1="28" x2="100" y2="28" stroke="#F0555C" stroke-width="1.4"/>
          <text x="20" y="15" font-size="6">π* petit système</text>
          <text x="70" y="43" font-size="5.5">écart réduit</text>
        </svg>
        <span>La conjugaison rapproche les niveaux π et π* : la transition nécessite un photon de moindre énergie.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Loi de Beer-Lambert : A = ε·c·l, avec ε le coefficient d'absorption molaire caractéristique de la transition</li>
        <li>Seules les transitions π→π* et n→π* tombent dans le domaine UV-visible usuel (200-800 nm)</li>
        <li>Chromophore = groupe responsable de l'absorption ; auxochrome = groupe modifiant l'absorption d'un chromophore voisin</li>
        <li>Plus la conjugaison π est étendue, plus l'écart HOMO-LUMO diminue, plus λ_max augmente (effet bathochrome)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre effet bathochrome (déplacement de λ_max) et effet hyperchrome (augmentation de l'intensité ε) — ce sont deux effets indépendants</li>
        <li>Croire que tout groupe fonctionnel absorbe dans le domaine UV-visible accessible — seuls les systèmes π (ou n conjugué à π) le font typiquement</li>
        <li>Oublier que ε dépend de la longueur d'onde : il faut toujours préciser à quelle λ la valeur de ε est donnée</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — loi de Beer-Lambert</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Renseigne le coefficient d'absorption molaire ε, la concentration et la longueur de la cuve pour calculer l'absorbance et la transmittance.</p>
      <div class="sim-controls">
        <label>ε (L·mol⁻¹·cm⁻¹) : <input type="number" id="blEpsilon" value="15000" step="100" style="width:90px;" oninput="updateBeerLambert()"></label>
        <label>c (mol·L⁻¹) : <input type="number" id="blConc" value="0.00003" step="0.00001" style="width:100px;" oninput="updateBeerLambert()"></label>
        <label>l (cm) : <input type="number" id="blLongueur" value="1" step="0.1" style="width:60px;" oninput="updateBeerLambert()"></label>
        <div class="sim-readout" id="blReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans la loi de Beer-Lambert A = ε·c·l, le coefficient ε dépend de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec1e1" value="wrong">uniquement de la concentration de l'échantillon</label>
          <label class="option"><input type="radio" name="spec1e1" value="right">de la nature de la transition électronique et de la longueur d'onde considérée</label>
          <label class="option"><input type="radio" name="spec1e1" value="wrong">uniquement de la longueur de la cuve</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec1e1','spec1fb1','Correct — ε est une grandeur caractéristique de la transition électronique à une longueur d\\'onde donnée, indépendante de c et l.','ε est le facteur constant de la loi : que reste-t-il de spécifique une fois qu\\'on a factorisé c et l ?')">Vérifier</button>
        <div class="feedback" id="spec1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Parmi les transitions électroniques suivantes, laquelle nécessite l'énergie de photon la plus faible (donc la plus grande longueur d'onde) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec1e2" value="wrong">σ→σ*</label>
          <label class="option"><input type="radio" name="spec1e2" value="wrong">n→σ*</label>
          <label class="option"><input type="radio" name="spec1e2" value="right">n→π*</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec1e2','spec1fb2','Correct — n→π* est la transition de plus basse énergie parmi ces quatre types, typiquement observée pour les carbonyles vers 280 nm, bien que d\\'intensité faible (transition interdite par symétrie).','Relis le tableau des quatre types de transitions et leur ordre en énergie.')">Vérifier</button>
        <div class="feedback" id="spec1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'allongement de la conjugaison π d'un polyène provoque typiquement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec1e3" value="wrong">un déplacement de λ_max vers les courtes longueurs d'onde (hypsochrome)</label>
          <label class="option"><input type="radio" name="spec1e3" value="right">un déplacement de λ_max vers les grandes longueurs d'onde (bathochrome)</label>
          <label class="option"><input type="radio" name="spec1e3" value="wrong">aucun effet sur l'absorption UV-visible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec1e3','spec1fb3','Correct — plus le système π conjugué est étendu, plus l\\'écart HOMO-LUMO diminue, d\\'où un déplacement bathochrome (vers le rouge) : c\\'est le principe qui explique la couleur du β-carotène.','Repense au tableau éthylène/butadiène/hexatriène/β-carotène : que devient λ_max quand le nombre de doubles liaisons conjuguées augmente ?')">Vérifier</button>
        <div class="feedback" id="spec1fb3"></div>
      </div>
    </div>
  `,
  init: initBeerLambert
};

SPECORG_NOVA_KB[specKey("Spectroscopie UV-visible : transitions électroniques et chromophores")] = {
  intro: "Salut, moi c'est Nova ! On démarre la spectroscopie organique par l'UV-visible. Demande-moi la loi de Beer-Lambert, la différence entre chromophore et auxochrome, ou un indice sur un exercice.",
  rules: [
    { test:/beer.?lambert|loi.*absorbance/i, replies:["Loi de Beer-Lambert : A = ε·c·l. A est l'absorbance (sans unité), ε le coefficient d'absorption molaire (L·mol⁻¹·cm⁻¹), c la concentration et l la longueur de la cuve."] },
    { test:/chromophore|auxochrome/i, replies:["Chromophore = groupe responsable de l'absorption (C=C, C=O, aromatique...). Auxochrome = groupe qui modifie l'absorption d'un chromophore voisin sans absorber lui-même significativement (—OH, —NH₂, halogènes)."] },
    { test:/bathochrome|hyperchrome|hypsochrome/i, replies:["Effet bathochrome : λ_max se déplace vers le rouge (grandes longueurs d'onde). Effet hyperchrome : l'intensité (ε) augmente. Ce sont deux effets indépendants."] },
    { test:/transition.*(sigma|pi|n.*sigma|n.*pi)|σ.*π|n.*π\*/i, replies:["4 types : σ→σ* (très haute énergie), n→σ*, π→π* (intense, permise), n→π* (basse énergie mais faible intensité, interdite par symétrie). Seules π→π* et n→π* sont observées en UV-visible usuel."] },
    { test:/conjugaison|hückel|huckel/i, replies:["Plus la conjugaison π est étendue, plus l'écart HOMO-LUMO diminue (cf. méthode de Hückel), donc plus λ_max augmente : c'est l'effet bathochrome de la conjugaison, à l'origine de la couleur du β-carotène."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : classe les 4 transitions par énergie croissante.","Indice niveau 2 : σ→σ* est la plus énergétique, n→π* la moins énergétique.","Indice niveau 3 : basse énergie = grande longueur d'onde, donc c'est n→π*."] }
  ]
};

/* =========================== CHAPITRE 2 — Spectroscopie infrarouge : vibrations moléculaires et groupes caractéristiques =========================== */
SPECORG_CHAPTERS[specKey("Spectroscopie infrarouge : vibrations moléculaires et groupes caractéristiques")] = {
  objectives: [
    "Relier l'absorption infrarouge aux transitions entre niveaux vibrationnels d'une liaison chimique",
    "Établir la formule du nombre de modes normaux de vibration d'une molécule non linéaire et linéaire",
    "Utiliser le modèle de l'oscillateur harmonique pour prévoir l'influence de la masse réduite et de la constante de force sur le nombre d'onde",
    "Identifier les bandes caractéristiques des principaux groupes fonctionnels organiques",
    "Expliquer l'influence de la conjugaison et de la liaison hydrogène sur la position d'une bande d'absorption"
  ],
  prereqs: ["Spectroscopie UV-visible : transitions électroniques et chromophores"],
  bodyHtml: `
    <p>Alors que la spectroscopie UV-visible sonde les transitions <strong>électroniques</strong>, la spectroscopie <strong>infrarouge</strong> (IR) sonde les transitions entre niveaux d'énergie <strong>vibrationnelle</strong> des liaisons chimiques — un domaine d'énergie beaucoup plus faible, correspondant aux nombres d'onde $\\tilde{\\nu}$ de $4000$ à $400$ cm⁻¹. C'est la technique de choix pour identifier rapidement les <strong>groupes fonctionnels</strong> présents dans une molécule organique.</p>

    <h3>1. Le modèle de l'oscillateur harmonique</h3>
    <p>Une liaison chimique entre deux atomes peut être modélisée, en première approximation, comme un <strong>oscillateur harmonique</strong> : deux masses reliées par un « ressort » de constante de force $k$ (la rigidité de la liaison). La fréquence de vibration $\\nu$ (et le nombre d'onde $\\tilde{\\nu}=\\nu/c$) est donnée par :</p>
    <div class="formula-box">$$\\tilde{\\nu} = \\frac{1}{2\\pi c}\\sqrt{\\frac{k}{\\mu}} \\qquad\\text{avec}\\quad \\mu = \\frac{m_1 m_2}{m_1+m_2}\\ \\text{(masse réduite)}$$</div>
    <p>Deux conséquences pratiques immédiates découlent de cette formule, exactement analogues au modèle de l'oscillateur harmonique quantique déjà rencontré en chimie quantique :</p>
    <ul>
      <li>Plus la liaison est <strong>forte</strong> (constante de force $k$ élevée — typiquement une liaison multiple), plus le nombre d'onde de vibration est <strong>élevé</strong> : $\\tilde{\\nu}(\\text{C}\\equiv\\text{C}) > \\tilde{\\nu}(\\text{C=C}) > \\tilde{\\nu}(\\text{C-C})$ ;</li>
      <li>Plus la masse réduite $\\mu$ est <strong>faible</strong> (atomes légers), plus le nombre d'onde est <strong>élevé</strong> : c'est pourquoi les vibrations impliquant l'hydrogène (masse très faible) apparaissent aux nombres d'onde les plus élevés du spectre (C-H, O-H, N-H : 2800-3600 cm⁻¹).</li>
    </ul>

    <h3>2. Nombre de modes normaux de vibration</h3>
    <p>Une molécule non linéaire de $N$ atomes possède $3N$ degrés de liberté au total, dont 3 correspondent à la translation d'ensemble et 3 à la rotation d'ensemble : il reste donc $3N-6$ <strong>modes normaux de vibration</strong> indépendants. Pour une molécule linéaire, il n'existe que 2 degrés de rotation utiles (la rotation autour de l'axe moléculaire ne change rien) : le nombre de modes de vibration est alors $3N-5$.</p>
    <div class="formula-box">$$\\text{Molécule non linéaire : } 3N-6 \\qquad\\qquad \\text{Molécule linéaire : } 3N-5$$</div>
    <p>Ces modes se répartissent en modes d'<strong>élongation</strong> (<em>stretching</em>, variation de longueur de liaison, notés $\\nu$) et modes de <strong>déformation angulaire</strong> (<em>bending</em>, variation d'angle de liaison, notés $\\delta$) — ces derniers nécessitant en général moins d'énergie et apparaissant donc à plus bas nombre d'onde.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> combien de modes normaux de vibration possède la molécule d'eau H₂O (non linéaire, 3 atomes) ? Et le dioxyde de carbone CO₂ (linéaire, 3 atomes) ?</p>
      <p><strong>Solution :</strong> pour H₂O, $N=3$, non linéaire : $3N-6=3\\times3-6=3$ modes (une élongation symétrique, une élongation antisymétrique, une déformation angulaire). Pour CO₂, $N=3$, linéaire : $3N-5=3\\times3-5=4$ modes.</p>
      <p class="example-answer">Réponse : 3 modes de vibration pour H₂O, 4 modes pour CO₂ (dont deux modes de déformation dégénérés).</p>
    </div>

    <h3>3. Les régions caractéristiques du spectre IR</h3>
    <p>Le spectre IR se divise classiquement en deux zones d'utilité pédagogique très différente : la <strong>région des groupes fonctionnels</strong> (4000-1500 cm⁻¹), où les bandes sont attribuables sans ambiguïté à des liaisons ou groupes précis, et la région dite d'<strong>empreinte digitale</strong> (<em>fingerprint</em>, 1500-400 cm⁻¹), riche en vibrations couplées propres à chaque molécule, très difficile à interpréter bande par bande mais extrêmement utile pour comparer un spectre inconnu à une bibliothèque de référence.</p>
    <table class="mini-table">
      <tr><th>Groupe / liaison</th><th>Nombre d'onde (cm⁻¹)</th><th>Intensité / forme</th></tr>
      <tr><td>O-H (alcool, libre)</td><td>3580-3650</td><td>fine, moyenne</td></tr>
      <tr><td>O-H (alcool, liée par liaison H)</td><td>3200-3550</td><td>large, forte</td></tr>
      <tr><td>N-H (amine, amide)</td><td>3300-3500</td><td>moyenne, souvent 2 bandes (NH₂)</td></tr>
      <tr><td>C-H (sp³, sp²)</td><td>2850-3100</td><td>moyenne</td></tr>
      <tr><td>C≡N, C≡C</td><td>2100-2260</td><td>fine, faible à moyenne</td></tr>
      <tr><td>C=O (cétone, aldéhyde, acide, ester...)</td><td>1650-1850</td><td>très forte, fine</td></tr>
      <tr><td>C=C (alcène)</td><td>1600-1680</td><td>faible à moyenne</td></tr>
      <tr><td>Aromatique C=C (cycle)</td><td>1450-1600</td><td>plusieurs bandes moyennes</td></tr>
      <tr><td>C-O (alcool, éther, ester)</td><td>1000-1300</td><td>forte</td></tr>
    </table>

    <h3>4. Facteurs modifiant la position d'une bande</h3>
    <p>Deux effets, déjà connus en chimie organique, déplacent systématiquement la position théorique d'une bande d'élongation :</p>
    <ul>
      <li>La <strong>conjugaison</strong> d'un groupe carbonyle avec un système $\\pi$ voisin (ex : cétone $\\alpha,\\beta$-insaturée, aromatique) <strong>abaisse</strong> le nombre d'onde de $\\nu_{C=O}$ (typiquement de 20-40 cm⁻¹) : la délocalisation électronique affaiblit le caractère de double liaison pure ;</li>
      <li>La <strong>liaison hydrogène</strong> (intermoléculaire ou intramoléculaire) affaiblit et allonge la liaison O-H ou N-H impliquée, ce qui <strong>abaisse</strong> nettement son nombre d'onde et <strong>élargit</strong> considérablement la bande — c'est le critère principal pour distinguer un alcool « libre » (bande fine vers 3600 cm⁻¹, en solution très diluée) d'un alcool engagé dans des liaisons hydrogène intermoléculaires (bande large vers 3200-3400 cm⁻¹, à l'état pur ou concentré).</li>
    </ul>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <circle cx="30" cy="35" r="5" fill="#3D6BF0"/>
          <circle cx="90" cy="35" r="5" fill="#F0555C"/>
          <line x1="35" y1="35" x2="85" y2="35" stroke="#122043" stroke-width="1.5"/>
          <path d="M 30 20 Q 60 10 90 20" fill="none" stroke="#2FA37A" stroke-width="1" stroke-dasharray="2 2"/>
          <path d="M 30 50 Q 60 60 90 50" fill="none" stroke="#2FA37A" stroke-width="1" stroke-dasharray="2 2"/>
          <text x="45" y="14" font-size="6" fill="#2FA37A">élongation (stretching)</text>
        </svg>
        <span>Un mode d'élongation : variation périodique de la longueur de la liaison.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Modèle de l'oscillateur harmonique : ν̃ = (1/2πc)√(k/μ) — liaison forte ou atomes légers → nombre d'onde élevé</li>
        <li>Nombre de modes de vibration : 3N−6 (molécule non linéaire), 3N−5 (molécule linéaire)</li>
        <li>Région des groupes fonctionnels (4000-1500 cm⁻¹) interprétable bande par bande ; région d'empreinte digitale (1500-400 cm⁻¹) utilisée en comparaison globale</li>
        <li>Conjugaison → abaisse ν(C=O) ; liaison hydrogène → abaisse et élargit ν(O-H)/ν(N-H)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier que la masse réduite, et non la masse totale, gouverne la fréquence de vibration — pour C-H, μ est très proche de la masse de l'hydrogène (l'atome le plus léger domine)</li>
        <li>Chercher à attribuer précisément chaque bande de la région d'empreinte digitale — elle sert surtout à la comparaison globale de spectres, pas à l'identification bande par bande</li>
        <li>Confondre l'effet de la conjugaison (abaisse ν(C=O)) avec celui de la liaison hydrogène (abaisse aussi, mais avec un net élargissement de bande en plus)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">D'après le modèle de l'oscillateur harmonique, à masse réduite égale, une liaison triple C≡C vibre à un nombre d'onde :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec2e1" value="wrong">plus faible qu'une liaison simple C-C</label>
          <label class="option"><input type="radio" name="spec2e1" value="right">plus élevé qu'une liaison simple C-C</label>
          <label class="option"><input type="radio" name="spec2e1" value="wrong">identique à celui d'une liaison simple C-C</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec2e1','spec2fb1','Correct — une liaison triple a une constante de force k plus élevée qu\\'une liaison simple : ν̃ ∝ √k augmente donc, d\\'où un nombre d\\'onde plus élevé (~2100-2260 cm⁻¹ contre ~1000 cm⁻¹).','Repense à la formule ν̃ = (1/2πc)√(k/μ) : que devient k pour une liaison plus rigide (multiple) ?')">Vérifier</button>
        <div class="feedback" id="spec2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le nombre de modes normaux de vibration d'une molécule non linéaire de 5 atomes est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec2e2" value="wrong">10</label>
          <label class="option"><input type="radio" name="spec2e2" value="right">9</label>
          <label class="option"><input type="radio" name="spec2e2" value="wrong">15</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec2e2','spec2fb2','Correct — 3N-6 = 3×5-6 = 9 modes de vibration pour une molécule non linéaire de 5 atomes.','Utilise la formule 3N-6 pour une molécule non linéaire, avec N=5.')">Vérifier</button>
        <div class="feedback" id="spec2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une bande O-H large et intense vers 3300 cm⁻¹ (au lieu d'une bande fine vers 3600 cm⁻¹) indique généralement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec2e3" value="wrong">un alcool totalement libre, sans interaction intermoléculaire</label>
          <label class="option"><input type="radio" name="spec2e3" value="right">la présence de liaisons hydrogène intermoléculaires</label>
          <label class="option"><input type="radio" name="spec2e3" value="wrong">l'absence totale de liaison O-H dans la molécule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec2e3','spec2fb3','Correct — la liaison hydrogène affaiblit et allonge la liaison O-H, abaissant son nombre d\\'onde et élargissant fortement la bande d\\'absorption.','Relis le paragraphe sur l\\'effet de la liaison hydrogène sur les bandes O-H/N-H.')">Vérifier</button>
        <div class="feedback" id="spec2fb3"></div>
      </div>
    </div>
  `
};

SPECORG_NOVA_KB[specKey("Spectroscopie infrarouge : vibrations moléculaires et groupes caractéristiques")] = {
  intro: "Salut, moi c'est Nova ! On passe à l'infrarouge et aux vibrations moléculaires. Demande-moi la formule 3N-6, les bandes caractéristiques des groupes fonctionnels, ou un indice sur un exercice.",
  rules: [
    { test:/oscillateur harmonique|masse r[ée]duite|constante de force/i, replies:["ν̃ = (1/2πc)√(k/μ). Une liaison plus forte (k↑, ex : liaison multiple) ou des atomes plus légers (μ↓, ex : hydrogène) donnent un nombre d'onde plus élevé."] },
    { test:/3n.?6|3n.?5|nombre de modes/i, replies:["Nombre de modes de vibration : 3N-6 pour une molécule non linéaire, 3N-5 pour une molécule linéaire (elle n'a que 2 degrés de rotation utiles au lieu de 3)."] },
    { test:/empreinte digitale|fingerprint|groupe fonctionnel.*r[ée]gion/i, replies:["Région des groupes fonctionnels (4000-1500 cm⁻¹) : bandes interprétables individuellement. Région d'empreinte digitale (1500-400 cm⁻¹) : vibrations couplées, utilisée surtout pour comparer des spectres entre eux."] },
    { test:/conjugaison.*carbonyle|carbonyle.*conjugu/i, replies:["La conjugaison d'un C=O avec un système π voisin (ex : cétone α,β-insaturée) abaisse ν(C=O) de 20 à 40 cm⁻¹ par rapport à un carbonyle isolé."] },
    { test:/liaison h(ydrog[èe]ne)?|o.?h.*bande|oh.*large/i, replies:["La liaison hydrogène affaiblit et allonge la liaison O-H ou N-H : elle abaisse le nombre d'onde ET élargit fortement la bande — c'est le signe distinctif d'un alcool engagé en liaison H (bande large ~3200-3400 cm⁻¹) versus libre (bande fine ~3600 cm⁻¹)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise la formule 3N-6.","Indice niveau 2 : N=5 pour cette molécule non linéaire.","Indice niveau 3 : 3×5-6 = 9."] }
  ]
};
/* ---------------------------------------------------------------------------------
   OUTIL 2 — Prédicteur de multiplicité RMN (règle du n+1) — chapitre 4
--------------------------------------------------------------------------------- */
function updateMultiplicity(){
  const n = parseInt(document.getElementById('multN').value) || 0;
  const names = {0:"singulet (s)",1:"doublet (d)",2:"triplet (t)",3:"quadruplet (q)",4:"quintuplet (quint)",5:"sextuplet",6:"septuplet",7:"octuplet"};
  const nbRaies = n+1;
  const label = names[n] !== undefined ? names[n] : `multiplet à ${nbRaies} raies`;
  const ratios = {0:"1",1:"1:1",2:"1:2:1",3:"1:3:3:1",4:"1:4:6:4:1",5:"1:5:10:10:5:1",6:"1:6:15:20:15:6:1",7:"1:7:21:35:35:21:7:1"};
  const out = document.getElementById('multReadout');
  out.innerHTML = `Un proton couplé à <strong>${n}</strong> voisin(s) équivalent(s) donne un signal à <strong>${nbRaies}</strong> raies (règle du n+1) :<br>` +
    `Type de signal : <strong>${label}</strong><br>` +
    (ratios[n] ? `Intensités relatives (triangle de Pascal) : ${ratios[n]}` : '');
}
function initMultiplicity(){ updateMultiplicity(); }

/* =========================== CHAPITRE 3 — Principes de la RMN : déplacement chimique en RMN du proton =========================== */
SPECORG_CHAPTERS[specKey("Principes de la RMN : déplacement chimique en RMN du proton")] = {
  objectives: [
    "Expliquer le principe physique de la résonance magnétique nucléaire (spin nucléaire, effet Zeeman, résonance)",
    "Définir le déplacement chimique δ et justifier l'utilisation d'une échelle relative en ppm",
    "Relier le blindage/déblindage d'un proton à la densité électronique locale et à l'électronégativité des substituants voisins",
    "Décrire l'effet du courant de cycle aromatique sur le déplacement chimique",
    "Utiliser une table de déplacements chimiques typiques pour attribuer les signaux d'un spectre simple"
  ],
  prereqs: ["Fragmentation en spectrométrie de masse : mécanismes et réarrangements", "Opérateurs, observables et postulats de la mesure (Introduction à la mécanique quantique)"],
  bodyHtml: `
    <p>La <strong>résonance magnétique nucléaire</strong> (RMN) est, avec la spectrométrie de masse, l'outil le plus puissant d'élucidation structurale en chimie organique moderne : elle sonde directement l'environnement chimique de chaque atome d'hydrogène (RMN ¹H) ou de carbone (RMN ¹³C, chapitre 5) d'une molécule.</p>

    <h3>1. Principe physique : spin nucléaire et résonance</h3>
    <p>Le noyau d'hydrogène (¹H, un simple proton) possède un <strong>spin nucléaire</strong> $I=1/2$, associé à un moment magnétique. Placé dans un champ magnétique externe intense $B_0$ (produit par un aimant supraconducteur), ce moment magnétique ne peut adopter que deux orientations quantifiées — parallèle ou antiparallèle à $B_0$ — d'énergies légèrement différentes (effet Zeeman nucléaire). L'écart d'énergie entre ces deux niveaux correspond, pour les champs usuels, à un photon dans le domaine des <strong>ondes radio</strong> (quelques centaines de MHz). Lorsqu'on irradie l'échantillon à cette fréquence précise, les spins <strong>résonnent</strong> : c'est ce phénomène de résonance qui donne son nom à la technique.</p>

    <h3>2. Blindage, déblindage et déplacement chimique</h3>
    <p>Si tous les protons résonnaient exactement à la même fréquence, la RMN serait inutile pour la chimie structurale. En réalité, chaque proton est entouré d'un nuage électronique qui, sous l'effet du champ $B_0$, engendre un petit champ magnétique <strong>induit</strong> opposé à $B_0$ : le proton ressent donc un champ <strong>local</strong> légèrement inférieur à $B_0$, et résonne à une fréquence légèrement différente selon la densité électronique qui l'entoure. On dit qu'un proton entouré d'une forte densité électronique est <strong>blindé</strong> (il résonne à basse fréquence) ; un proton appauvri en électrons — par un substituant électronégatif voisin, par exemple — est <strong>déblindé</strong> (il résonne à plus haute fréquence).</p>
    <p>Pour s'affranchir de la dépendance de la fréquence de résonance vis-à-vis du champ $B_0$ de l'appareil (qui varie d'un spectromètre à l'autre), on définit le <strong>déplacement chimique</strong> $\\delta$, une grandeur <strong>relative</strong> et sans dimension, mesurée par rapport à une référence (le tétraméthylsilane, TMS, fixé à $\\delta=0$) :</p>
    <div class="formula-box">$$\\delta\\ (\\text{ppm}) = \\frac{\\nu_{\\text{échantillon}} - \\nu_{\\text{TMS}}}{\\nu_{\\text{spectromètre}}} \\times 10^6$$</div>
    <p>Exprimé en <strong>parties par million (ppm)</strong>, $\\delta$ est indépendant du champ $B_0$ utilisé : un même proton donne toujours le même $\\delta$, que le spectromètre travaille à 300 MHz ou à 600 MHz — seule la résolution en Hz change, pas la position en ppm. C'est cette universalité qui rend les tables de déplacements chimiques utilisables pour n'importe quel appareil.</p>

    <h3>3. Facteurs influençant le déplacement chimique</h3>
    <table class="mini-table">
      <tr><th>Facteur</th><th>Effet</th></tr>
      <tr><td>Électronégativité d'un substituant voisin</td><td>déblindage (δ augmente) ; effet décroissant avec la distance</td></tr>
      <tr><td>Hybridation du carbone porteur</td><td>sp &gt; sp² &gt; sp³ en général pour le déblindage</td></tr>
      <tr><td>Courant de cycle aromatique</td><td>fort déblindage des H aromatiques (δ 6,5-8,5) par effet d'anisotropie magnétique</td></tr>
      <tr><td>Liaison hydrogène (OH, NH, COOH)</td><td>déplacement variable, souvent large et dépendant de la concentration/du solvant</td></tr>
    </table>

    <div class="key-point">
      <span class="eyebrow">Le courant de cycle aromatique : un effet remarquable d'anisotropie</span>
      Un cycle aromatique plongé dans $B_0$ voit ses électrons $\\pi$ délocalisés se mettre en mouvement circulaire (« courant de cycle »), engendrant un champ magnétique induit qui, dans le <strong>plan</strong> du cycle (où se trouvent les protons aromatiques), <strong>renforce</strong> le champ local — d'où un fort <strong>déblindage</strong> ($\\delta$ 6,5-8,5, nettement plus que ne le laisserait prévoir la seule électronégativité). Au contraire, un proton situé <strong>au-dessus ou en dessous</strong> du plan du cycle (comme dans certains composés cycliques particuliers) serait au contraire blindé par ce même courant de cycle : c'est un exemple frappant d'effet purement magnétique, sans rapport avec la densité électronique locale.
    </div>

    <table class="mini-table">
      <tr><th>Type de proton</th><th>δ typique (ppm)</th></tr>
      <tr><td>TMS (référence)</td><td>0,0</td></tr>
      <tr><td>Alcane R-CH₃, R-CH₂-R</td><td>0,9-1,5</td></tr>
      <tr><td>Allylique C=C-CH</td><td>1,6-2,2</td></tr>
      <tr><td>Alcyne, propargylique</td><td>1,7-3,1</td></tr>
      <tr><td>À côté d'un carbonyle (α-CH)</td><td>2,0-2,7</td></tr>
      <tr><td>Halogénure C-H-X</td><td>2,0-4,5</td></tr>
      <tr><td>Éther, alcool C-H-O</td><td>3,3-4,5</td></tr>
      <tr><td>Vinylique C=CH</td><td>4,5-6,5</td></tr>
      <tr><td>Aromatique</td><td>6,5-8,5</td></tr>
      <tr><td>Aldéhyde CHO</td><td>9,5-10,5</td></tr>
      <tr><td>Acide carboxylique COOH</td><td>10-13 (large, variable)</td></tr>
    </table>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> classer par déplacement chimique croissant les protons suivants de l'acétate d'éthyle CH₃-CO-O-CH₂-CH₃ : le CH₃ terminal de l'éthyle, le CH₂ de l'éthyle, le CH₃ de l'acétyle.</p>
      <p><strong>Solution :</strong> le CH₃ terminal (éthyle) est un simple méthyle alcane, peu déblindé : $\\delta\\approx1{,}2$. Le CH₃ de l'acétyle est en position $\\alpha$ d'un carbonyle : $\\delta\\approx2{,}0$. Le CH₂ de l'éthyle est directement lié à l'oxygène de l'ester (très électronégatif, effet direct) : $\\delta\\approx4{,}1$, le plus déblindé des trois.</p>
      <p class="example-answer">Réponse : CH₃(éthyle, ~1,2) &lt; CH₃(acétyle, ~2,0) &lt; CH₂(éthyle, ~4,1).</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le spin nucléaire ¹H (I=1/2) résonne dans B₀ à une fréquence dépendant de son environnement électronique local</li>
        <li>δ (ppm) = (ν_échantillon − ν_TMS)/ν_spectromètre × 10⁶ : grandeur relative, indépendante du champ B₀ de l'appareil</li>
        <li>Un substituant électronégatif déblinde (δ↑) ; une forte densité électronique blinde (δ↓)</li>
        <li>Le courant de cycle aromatique déblinde fortement les protons aromatiques (δ 6,5-8,5) par effet magnétique d'anisotropie</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le déplacement chimique dépend du champ B₀ du spectromètre — c'est justement l'échelle en ppm qui le rend indépendant de B₀</li>
        <li>Attribuer le fort déblindage des protons aromatiques à la seule électronégativité — l'effet dominant est le courant de cycle, un effet magnétique et non électronique</li>
        <li>Oublier que le déplacement chimique des protons OH/NH/COOH est très variable (solvant, concentration, liaison H) — ces signaux sont souvent larges et déplaçables</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le déplacement chimique δ, exprimé en ppm, présente l'avantage principal de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec3e1" value="wrong">dépendre directement du champ B₀ du spectromètre utilisé</label>
          <label class="option"><input type="radio" name="spec3e1" value="right">être indépendant du champ B₀, donc comparable entre spectromètres différents</label>
          <label class="option"><input type="radio" name="spec3e1" value="wrong">ne s'appliquer qu'aux protons aromatiques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec3e1','spec3fb1','Correct — en divisant l\\'écart de fréquence par la fréquence du spectromètre, on obtient une grandeur relative universelle, indépendante de l\\'appareil utilisé.','Relis la formule de δ : pourquoi diviser par ν_spectromètre ?')">Vérifier</button>
        <div class="feedback" id="spec3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le fort déblindage des protons aromatiques (δ 6,5-8,5 ppm) s'explique principalement par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec3e2" value="wrong">la seule électronégativité du carbone aromatique</label>
          <label class="option"><input type="radio" name="spec3e2" value="right">le courant de cycle aromatique, un effet magnétique d'anisotropie</label>
          <label class="option"><input type="radio" name="spec3e2" value="wrong">la présence systématique d'un halogène sur le cycle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec3e2','spec3fb2','Correct — les électrons π délocalisés du cycle, mis en mouvement par B₀, engendrent un champ induit qui renforce B₀ dans le plan du cycle, où se trouvent les protons aromatiques.','Relis l\\'encadré sur le courant de cycle aromatique.')">Vérifier</button>
        <div class="feedback" id="spec3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Un proton fortement entouré de densité électronique (bien blindé) résonne :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec3e3" value="right">à un δ plus faible (champ plus fort nécessaire)</label>
          <label class="option"><input type="radio" name="spec3e3" value="wrong">à un δ plus élevé</label>
          <label class="option"><input type="radio" name="spec3e3" value="wrong">exactement au même δ que le TMS quel que soit son environnement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec3e3','spec3fb3','Correct — un proton blindé (forte densité électronique) ressent un champ local réduit et résonne à basse fréquence, donc à faible δ.','Relis la définition de blindage/déblindage en début de chapitre.')">Vérifier</button>
        <div class="feedback" id="spec3fb3"></div>
      </div>
    </div>
  `
};

SPECORG_NOVA_KB[specKey("Principes de la RMN : déplacement chimique en RMN du proton")] = {
  intro: "Salut, moi c'est Nova ! On entre dans la RMN, avec le déplacement chimique en ¹H. Demande-moi ce qu'est le blindage, pourquoi δ est en ppm, ou un indice sur un exercice.",
  rules: [
    { test:/blindage|d[ée]blindage/i, replies:["Un proton entouré de forte densité électronique est blindé (résonne à basse fréquence, δ faible). Un proton appauvri en électrons (substituant électronégatif voisin) est déblindé (δ élevé)."] },
    { test:/d[ée]placement chimique|delta|δ.*ppm/i, replies:["δ (ppm) = (ν_échantillon - ν_TMS)/ν_spectromètre × 10⁶. C'est une grandeur relative, indépendante du champ B₀ du spectromètre — universelle d'un appareil à l'autre."] },
    { test:/courant de cycle|aromatique.*d[ée]blind/i, replies:["Le courant de cycle aromatique : les électrons π délocalisés, mis en mouvement par B₀, créent un champ induit qui renforce B₀ dans le plan du cycle → fort déblindage des H aromatiques (δ 6,5-8,5), un effet magnétique et non électronique."] },
    { test:/tms|t[ée]tram[ée]thylsilane|r[ée]f[ée]rence/i, replies:["Le TMS (tétraméthylsilane) sert de référence à δ=0 ppm : ses 12 protons méthyliques équivalents, très blindés (Si peu électronégatif), sont plus blindés que la plupart des protons organiques."] },
    { test:/spin nucl[ée]aire|effet zeeman|r[ée]sonance/i, replies:["Le proton (spin I=1/2) placé dans B₀ adopte deux orientations d'énergies différentes (effet Zeeman). Irradier à la fréquence exacte de l'écart d'énergie provoque la résonance — d'où le nom de la technique."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à un effet MAGNÉTIQUE et non électronique.","Indice niveau 2 : ce sont les électrons π délocalisés qui sont en cause.","Indice niveau 3 : c'est le courant de cycle aromatique."] }
  ]
};

/* =========================== CHAPITRE 4 — Couplage spin-spin et analyse des spectres de RMN du proton =========================== */
SPECORG_CHAPTERS[specKey("Couplage spin-spin et analyse des spectres de RMN du proton")] = {
  objectives: [
    "Expliquer l'origine physique du couplage spin-spin entre protons voisins",
    "Appliquer la règle du (n+1) pour prévoir la multiplicité d'un signal",
    "Distinguer couplage géminal, vicinal et à longue distance selon le nombre de liaisons séparant les protons",
    "Définir l'équivalence chimique et magnétique des protons et ses conséquences sur le spectre",
    "Extraire d'un spectre RMN ¹H simple : nombre de signaux, intégration, multiplicité et attribution structurale"
  ],
  prereqs: ["Principes de la RMN : déplacement chimique en RMN du proton"],
  bodyHtml: `
    <p>Le déplacement chimique (chapitre précédent) renseigne sur l'environnement électronique de chaque proton, mais c'est le <strong>couplage spin-spin</strong> qui révèle la <strong>connectivité</strong> entre protons voisins — c'est-à-dire le squelette carboné de la molécule. C'est souvent l'information la plus riche d'un spectre RMN ¹H.</p>

    <h3>1. Origine physique du couplage</h3>
    <p>Le spin nucléaire d'un proton influence, via les électrons de liaison, le champ local ressenti par un proton voisin situé à quelques liaisons de distance : cette interaction, transmise à travers les liaisons chimiques (et non à travers l'espace comme l'effet NOE), est le <strong>couplage scalaire</strong> (noté $J$, exprimé en Hz). Contrairement au déplacement chimique, la constante de couplage $J$ est <strong>indépendante du champ $B_0$</strong> de l'appareil : elle s'exprime toujours en Hz, jamais en ppm.</p>

    <h3>2. La règle du (n+1) : multiplicité des signaux</h3>
    <p>Un proton (ou groupe de protons équivalents) couplé à $n$ protons voisins équivalents — mais non équivalents à lui-même — voit son signal se scinder en $(n+1)$ raies, dont les intensités relatives suivent le <strong>triangle de Pascal</strong> :</p>
    <table class="mini-table">
      <tr><th>Nombre de voisins $n$</th><th>Multiplicité</th><th>Intensités relatives</th></tr>
      <tr><td>0</td><td>singulet (s)</td><td>1</td></tr>
      <tr><td>1</td><td>doublet (d)</td><td>1:1</td></tr>
      <tr><td>2</td><td>triplet (t)</td><td>1:2:1</td></tr>
      <tr><td>3</td><td>quadruplet (q)</td><td>1:3:3:1</td></tr>
      <tr><td>4</td><td>quintuplet</td><td>1:4:6:4:1</td></tr>
    </table>
    <p>L'exemple classique est celui de l'éthanol CH₃-CH₂-OH : les 3 protons du CH₃, couplés aux 2 protons voisins du CH₂, apparaissent en <strong>triplet</strong> ; les 2 protons du CH₂, couplés aux 3 protons du CH₃, apparaissent en <strong>quadruplet</strong> — un exemple pédagogique du système dit AX₃ ou A₂X₃.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> prévoir la multiplicité des signaux du 1,1,2-trichloroéthane Cl₂CH-CH₂Cl (2 groupes de protons non équivalents : CHCl₂ et CH₂Cl).</p>
      <p><strong>Solution :</strong> le proton CHCl₂ (1 proton) est couplé aux 2 protons du CH₂Cl voisin : il apparaît en <strong>triplet</strong> ($n=2$, donc $n+1=3$ raies). Les 2 protons du CH₂Cl sont couplés à l'unique proton du CHCl₂ voisin : ils apparaissent en <strong>doublet</strong> ($n=1$, donc $n+1=2$ raies).</p>
      <p class="example-answer">Réponse : CHCl₂ → triplet ; CH₂Cl → doublet.</p>
    </div>

    <h3>3. Couplage géminal, vicinal et à longue distance</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Nombre de liaisons</th><th>Constante $J$ typique (Hz)</th></tr>
      <tr><td>Géminal ($^2J$)</td><td>2 liaisons (mêmes carbone)</td><td>0-20 (variable, souvent petit sur chaîne saturée)</td></tr>
      <tr><td>Vicinal ($^3J$)</td><td>3 liaisons (carbones adjacents)</td><td>6-8 (chaîne saturée libre rotation) ; 0-18 selon la géométrie (loi de Karplus)</td></tr>
      <tr><td>Longue distance ($^4J$ et plus)</td><td>4 liaisons ou plus</td><td>souvent proche de 0, sauf systèmes particuliers (allyliques, aromatiques méta)</td></tr>
    </table>
    <p>Le couplage vicinal $^3J$ est le plus couramment exploité en analyse structurale : sa valeur dépend de l'angle dièdre entre les deux liaisons C-H (relation de Karplus), ce qui en fait un outil précieux pour déterminer la <strong>stéréochimie relative</strong> de systèmes rigides (cyclohexanes, alcènes cis/trans : $^3J_{trans}$ typiquement 12-18 Hz contre $^3J_{cis}$ typiquement 6-12 Hz pour un alcène disubstitué).</p>

    <h3>4. Équivalence chimique et magnétique</h3>
    <div class="key-point">
      <span class="eyebrow">Une nuance essentielle : protons équivalents ne se couplent pas entre eux (visiblement)</span>
      Deux protons chimiquement équivalents (même déplacement chimique, par symétrie moléculaire ou libre rotation) ne donnent <strong>aucun couplage visible</strong> entre eux sur le spectre, même s'ils sont physiquement proches — c'est pourquoi les 3 protons d'un même CH₃ ne se dédoublent pas mutuellement : ils apparaissent comme un seul groupe qui se couple uniquement aux protons <em>non équivalents</em> qui l'entourent. C'est cette règle qui permet d'appliquer directement le (n+1) en ne comptant que les voisins de déplacement chimique différent.
    </div>

    <h3>5. Lecture méthodique d'un spectre RMN ¹H</h3>
    <p>L'analyse d'un spectre RMN ¹H suit systématiquement trois étapes complémentaires : (i) le <strong>nombre de signaux</strong> indique le nombre de types de protons chimiquement non équivalents ; (ii) la <strong>courbe d'intégration</strong> (aire sous chaque signal) donne le rapport du nombre de protons de chaque type ; (iii) la <strong>multiplicité</strong> de chaque signal (règle du n+1) révèle la connectivité avec les protons voisins non équivalents. La combinaison de ces trois informations, croisée avec la table de déplacements chimiques du chapitre précédent, permet de reconstituer le squelette de la molécule.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Couplage scalaire J (en Hz, indépendant de B₀) : révèle la connectivité entre protons voisins non équivalents</li>
        <li>Règle du (n+1) : un proton couplé à n voisins équivalents (mais différents de lui) donne (n+1) raies, intensités selon le triangle de Pascal</li>
        <li>Couplage géminal (²J, 2 liaisons), vicinal (³J, 3 liaisons, loi de Karplus), longue distance (⁴J et plus, souvent faible)</li>
        <li>Des protons chimiquement équivalents ne se couplent pas visiblement entre eux</li>
        <li>Lecture d'un spectre : nombre de signaux → intégration → multiplicité → attribution structurale</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Compter tous les protons voisins pour la règle du (n+1), y compris ceux chimiquement équivalents au proton étudié — seuls les voisins NON équivalents comptent</li>
        <li>Confondre déplacement chimique (en ppm, dépend de B₀) et constante de couplage (en Hz, indépendante de B₀) — ce sont deux grandeurs de nature différente</li>
        <li>Oublier que le proton OH/NH d'un alcool ou d'une amine ne montre souvent pas de couplage visible avec ses voisins (échange rapide) dans les conditions usuelles</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — règle du (n+1)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Indique le nombre de voisins équivalents couplés pour prévoir la multiplicité du signal.</p>
      <div class="sim-controls">
        <label>Nombre de voisins n : <input type="number" id="multN" value="2" min="0" max="7" step="1" style="width:60px;" oninput="updateMultiplicity()"></label>
        <div class="sim-readout" id="multReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans l'éthanol CH₃-CH₂-OH, le signal du groupe CH₂ apparaît en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec4e1" value="wrong">doublet</label>
          <label class="option"><input type="radio" name="spec4e1" value="right">quadruplet</label>
          <label class="option"><input type="radio" name="spec4e1" value="wrong">triplet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec4e1','spec4fb1','Correct — le CH₂ est couplé aux 3 protons du CH₃ voisin : n=3, donc n+1=4 raies (quadruplet).','Compte les protons non équivalents voisins du CH₂ (le CH₃), puis applique n+1.')">Vérifier</button>
        <div class="feedback" id="spec4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La constante de couplage J, contrairement au déplacement chimique δ, est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec4e2" value="wrong">exprimée en ppm et dépendante du champ B₀</label>
          <label class="option"><input type="radio" name="spec4e2" value="right">exprimée en Hz et indépendante du champ B₀</label>
          <label class="option"><input type="radio" name="spec4e2" value="wrong">toujours égale à zéro pour des protons voisins</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec4e2','spec4fb2','Correct — J est une différence de fréquence absolue en Hz, indépendante du champ B₀ de l\\'appareil, contrairement à δ qui est une grandeur relative en ppm.','Relis la distinction entre δ (ppm, dépend de B₀) et J (Hz, indépendant de B₀).')">Vérifier</button>
        <div class="feedback" id="spec4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Deux protons chimiquement équivalents (même déplacement chimique) :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec4e3" value="wrong">se couplent toujours fortement et visiblement entre eux</label>
          <label class="option"><input type="radio" name="spec4e3" value="right">ne montrent pas de couplage visible entre eux sur le spectre</label>
          <label class="option"><input type="radio" name="spec4e3" value="wrong">apparaissent nécessairement sur deux signaux distincts</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec4e3','spec4fb3','Correct — des protons chimiquement équivalents ne montrent pas de couplage visible entre eux, ce qui permet d\\'appliquer directement la règle du n+1 en ne comptant que les voisins non équivalents.','Relis l\\'encadré sur l\\'équivalence chimique et magnétique.')">Vérifier</button>
        <div class="feedback" id="spec4fb3"></div>
      </div>
    </div>
  `,
  init: initMultiplicity
};

SPECORG_NOVA_KB[specKey("Couplage spin-spin et analyse des spectres de RMN du proton")] = {
  intro: "Salut, moi c'est Nova ! On explore le couplage spin-spin en RMN ¹H. Demande-moi la règle du n+1, la différence entre couplage géminal et vicinal, ou un indice sur un exercice.",
  rules: [
    { test:/n\+1|règle du n|multiplicit[ée]/i, replies:["Règle du (n+1) : un proton couplé à n voisins équivalents (mais différents de lui) donne n+1 raies, avec des intensités relatives selon le triangle de Pascal (1:2:1 pour un triplet, etc.)."] },
    { test:/couplage.*g[ée]minal|couplage.*vicinal|3j|2j|karplus/i, replies:["Géminal (²J, 2 liaisons) ; vicinal (³J, 3 liaisons, dépend de l'angle dièdre via la loi de Karplus — utile pour la stéréochimie cis/trans) ; longue distance (⁴J et plus, souvent proche de 0)."] },
    { test:/[ée]quivalence chimique|[ée]quivalence magn[ée]tique|se couplent.*eux.?m[êe]mes/i, replies:["Des protons chimiquement équivalents (même δ) ne montrent pas de couplage visible entre eux : c'est pourquoi les 3 H d'un CH₃ ne se dédoublent pas mutuellement, ils se couplent seulement aux voisins NON équivalents."] },
    { test:/constante de couplage|hz.*ppm|j.*ind[ée]pendant/i, replies:["La constante J s'exprime en Hz et est indépendante du champ B₀ du spectromètre, contrairement à δ (en ppm) — c'est le moyen de distinguer les deux grandeurs sur un spectre réel."] },
    { test:/lecture.*spectre|analyse.*spectre|nombre de signaux/i, replies:["Méthode : 1) nombre de signaux = nombre de types de protons non équivalents ; 2) intégration = rapport du nombre de protons ; 3) multiplicité (n+1) = connectivité avec les voisins non équivalents."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compte les protons non équivalents voisins du CH₂.","Indice niveau 2 : ce sont les 3 protons du CH₃.","Indice niveau 3 : n=3, donc n+1=4 raies (quadruplet)."] }
  ]
};
/* =========================== CHAPITRE 5 — RMN du carbone-13 et techniques d'édition spectrale (DEPT) =========================== */
SPECORG_CHAPTERS[specKey("RMN du carbone-13 et techniques d'édition spectrale (DEPT)")] = {
  objectives: [
    "Expliquer pourquoi la RMN ¹³C nécessite une approche différente de la RMN ¹H (faible abondance naturelle, découplage)",
    "Interpréter un spectre ¹³C découplé du proton en termes de nombre de carbones chimiquement non équivalents",
    "Utiliser une table de déplacements chimiques ¹³C typiques pour attribuer les signaux d'un spectre simple",
    "Décrire le principe de l'expérience DEPT et l'utiliser pour distinguer CH₃, CH₂, CH et carbones quaternaires",
    "Combiner RMN ¹H et RMN ¹³C pour une analyse structurale complémentaire"
  ],
  prereqs: ["Couplage spin-spin et analyse des spectres de RMN du proton"],
  bodyHtml: `
    <p>La RMN du carbone-13 (¹³C) complète directement la RMN du proton en sondant, cette fois, le <strong>squelette carboné</strong> de la molécule plutôt que ses atomes d'hydrogène. Elle présente cependant des particularités expérimentales propres qui imposent une lecture différente du spectre.</p>

    <h3>1. Une technique intrinsèquement moins sensible</h3>
    <p>L'isotope ¹²C, largement majoritaire (98,9 %), possède un spin nucléaire nul ($I=0$) et n'est donc <strong>pas actif en RMN</strong>. Seul l'isotope ¹³C, dont l'abondance naturelle n'est que d'environ <strong>1,1 %</strong>, possède le spin $I=1/2$ nécessaire à la résonance. Combinée à un moment magnétique nucléaire environ quatre fois plus faible que celui du proton, cette faible abondance rend le signal RMN ¹³C intrinsèquement beaucoup plus faible que celui de la RMN ¹H (sensibilité globale environ 6000 fois inférieure) : l'acquisition d'un spectre ¹³C exige donc l'accumulation d'un grand nombre de scans et des temps d'acquisition nettement plus longs qu'en RMN ¹H.</p>

    <h3>2. Le découplage large bande du proton</h3>
    <p>En l'absence de traitement particulier, chaque carbone se coupleraient fortement avec les protons directement liés (couplage $^1J_{CH}$, souvent 125-250 Hz) et plus faiblement avec les protons plus éloignés, ce qui produirait des spectres extrêmement complexes et peu lisibles compte tenu de la faible intensité déjà limitée du signal. On applique donc systématiquement, en RMN ¹³C de routine, un <strong>découplage large bande du proton</strong> (irradiation continue de tous les protons pendant l'acquisition) : chaque carbone chimiquement non équivalent apparaît alors sous la forme d'un <strong>singulet unique</strong>, quel que soit le nombre de protons qui lui sont liés. C'est cette simplicité — un pic net par type de carbone — qui rend la lecture d'un spectre ¹³C découplé beaucoup plus directe que celle d'un spectre ¹H.</p>

    <div class="key-point">
      <span class="eyebrow">Une conséquence importante du découplage</span>
      Sur un spectre ¹³C découplé classique, l'<strong>intégration</strong> des signaux n'est <strong>pas proportionnelle</strong> au nombre de carbones (contrairement à la RMN ¹H) : elle dépend fortement de facteurs de relaxation propres à chaque type de carbone (les carbones quaternaires, sans proton attaché, relaxent notamment beaucoup plus lentement et apparaissent donc systématiquement plus petits que leur nombre réel ne le suggérerait). Le nombre de <strong>signaux</strong> (et non leur hauteur) reste en revanche l'information fiable : il donne directement le nombre de types de carbones chimiquement non équivalents.
    </div>

    <h3>3. Déplacements chimiques typiques en ¹³C</h3>
    <p>L'échelle des déplacements chimiques ¹³C, également exprimée en ppm par rapport au TMS, s'étend sur une plage beaucoup plus large qu'en ¹H (0 à plus de 220 ppm), ce qui limite naturellement les recouvrements de signaux.</p>
    <table class="mini-table">
      <tr><th>Type de carbone</th><th>δ typique (ppm)</th></tr>
      <tr><td>Alcane (CH₃, CH₂, CH)</td><td>0-50</td></tr>
      <tr><td>C-N (amine)</td><td>30-65</td></tr>
      <tr><td>C-O (alcool, éther)</td><td>50-90</td></tr>
      <tr><td>Alcyne</td><td>65-90</td></tr>
      <tr><td>Alcène, aromatique</td><td>100-150</td></tr>
      <tr><td>Nitrile C≡N</td><td>115-120</td></tr>
      <tr><td>Ester, amide, acide carboxylique (C=O)</td><td>160-185</td></tr>
      <tr><td>Aldéhyde, cétone (C=O)</td><td>190-220</td></tr>
    </table>

    <h3>4. L'expérience DEPT : distinguer CH₃, CH₂, CH et carbones quaternaires</h3>
    <p>Le spectre ¹³C découplé donne le nombre et la position des signaux, mais efface toute information sur le nombre de protons liés à chaque carbone. L'expérience <strong>DEPT</strong> (<em>Distortionless Enhancement by Polarization Transfer</em>) restaure cette information en exploitant un transfert de polarisation du proton vers le carbone, avec une séquence d'impulsions dont l'angle final détermine la <strong>phase</strong> (signal positif ou négatif) selon le nombre de protons portés :</p>
    <table class="mini-table">
      <tr><th>Expérience</th><th>CH</th><th>CH₂</th><th>CH₃</th><th>C quaternaire</th></tr>
      <tr><td>DEPT-90</td><td>visible (seul signal)</td><td>absent</td><td>absent</td><td>absent</td></tr>
      <tr><td>DEPT-135</td><td>positif</td><td><strong>négatif</strong></td><td>positif</td><td>absent (toujours)</td></tr>
    </table>
    <p>Le <strong>DEPT-90</strong> ne fait apparaître <strong>que</strong> les carbones CH, ce qui permet de les identifier sans ambiguïté. Le <strong>DEPT-135</strong> fait apparaître CH, CH₂ et CH₃ simultanément, mais avec les CH₂ en phase <strong>négative</strong> (vers le bas) et CH/CH₃ en phase <strong>positive</strong> (vers le haut) — une distinction immédiate et très utile. Dans les deux expériences DEPT, les <strong>carbones quaternaires</strong> (sans aucun proton attaché : C=O de cétone, carbone aromatique substitué...) sont systématiquement <strong>absents</strong>, puisque le transfert de polarisation nécessite un proton directement lié. On les identifie donc par <strong>comparaison</strong> : tout signal présent sur le spectre découplé classique mais absent des spectres DEPT correspond à un carbone quaternaire.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un spectre ¹³C découplé de la butan-2-one (CH₃-CO-CH₂-CH₃) présente 4 signaux. Sur le DEPT-135, l'un de ces 4 signaux est absent, un autre est négatif, et les deux derniers sont positifs. Attribuer chaque signal.</p>
      <p><strong>Solution :</strong> la molécule comporte 4 carbones chimiquement distincts : le C=O (carbone quaternaire, aucun proton), le CH₂, et deux CH₃ (celui de l'acétyle et celui du groupe éthyle, non équivalents). Le signal <strong>absent</strong> en DEPT-135 correspond au C=O (carbone quaternaire). Le signal <strong>négatif</strong> correspond au CH₂. Les deux signaux <strong>positifs</strong> correspondent aux deux CH₃.</p>
      <p class="example-answer">Réponse : absent → C=O ; négatif → CH₂ ; les deux positifs → les deux CH₃ (distingués ensuite par leur déplacement chimique respectif).</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 80" width="100%">
          <line x1="10" y1="40" x2="110" y2="40" stroke="#122043" stroke-width="1"/>
          <line x1="30" y1="40" x2="30" y2="15" stroke="#3D6BF0" stroke-width="1.5"/>
          <line x1="55" y1="40" x2="55" y2="65" stroke="#F0555C" stroke-width="1.5"/>
          <line x1="80" y1="40" x2="80" y2="12" stroke="#3D6BF0" stroke-width="1.5"/>
          <text x="20" y="10" font-size="6">CH (+)</text>
          <text x="45" y="75" font-size="6" fill="#F0555C">CH₂ (−)</text>
          <text x="70" y="8" font-size="6">CH₃ (+)</text>
        </svg>
        <span>DEPT-135 : CH₂ apparaît vers le bas (phase négative), CH et CH₃ vers le haut (phase positive).</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Seul le ¹³C (abondance ~1,1 %) est actif en RMN ; le ¹²C majoritaire a un spin nul</li>
        <li>Découplage large bande du proton → chaque carbone non équivalent apparaît en singulet ; intégration NON proportionnelle au nombre de carbones</li>
        <li>Échelle ¹³C large (0-220 ppm) : alcanes (0-50), C-O (50-90), alcènes/aromatiques (100-150), carbonyles (160-220)</li>
        <li>DEPT-90 : CH seuls visibles. DEPT-135 : CH/CH₃ positifs, CH₂ négatif, C quaternaires toujours absents</li>
        <li>Un carbone quaternaire se repère par comparaison : présent sur le spectre découplé, absent de tous les DEPT</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser la hauteur des signaux ¹³C découplés pour compter les carbones — seule la position (nombre de signaux) est fiable, pas l'intégration</li>
        <li>Croire qu'un carbone quaternaire apparaît en DEPT avec une phase particulière — il est en réalité toujours totalement ABSENT du DEPT, quelle que soit la variante</li>
        <li>Oublier que le DEPT-90 ne montre que les CH — croire à tort qu'il montre aussi les CH₃ ou CH₂</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'isotope ¹²C n'est pas observable en RMN car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec5e1" value="wrong">il est trop rare dans la nature</label>
          <label class="option"><input type="radio" name="spec5e1" value="right">son spin nucléaire est nul (I=0)</label>
          <label class="option"><input type="radio" name="spec5e1" value="wrong">il ne peut pas être placé dans un champ magnétique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec5e1','spec5fb1','Correct — un spin nucléaire nul ne présente aucun effet Zeeman exploitable : c\\'est ¹²C qui est majoritaire (98,9%), mais inactif en RMN faute de spin.','C\\'est l\\'inverse : ¹²C est TRÈS abondant, mais reste inobservable pour une autre raison — son spin.')">Vérifier</button>
        <div class="feedback" id="spec5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Sur un spectre DEPT-135, un groupe CH₂ apparaît :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec5e2" value="wrong">en phase positive, comme les CH et CH₃</label>
          <label class="option"><input type="radio" name="spec5e2" value="right">en phase négative</label>
          <label class="option"><input type="radio" name="spec5e2" value="wrong">absent, comme les carbones quaternaires</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec5e2','spec5fb2','Correct — en DEPT-135, les CH₂ apparaissent systématiquement en phase négative (vers le bas), tandis que CH et CH₃ sont positifs.','Relis le tableau récapitulatif des phases DEPT-135.')">Vérifier</button>
        <div class="feedback" id="spec5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour identifier un carbone quaternaire, on procède généralement par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec5e3" value="wrong">recherche directe d'un signal négatif en DEPT-135</label>
          <label class="option"><input type="radio" name="spec5e3" value="right">comparaison : signal présent sur le spectre découplé mais absent de tous les DEPT</label>
          <label class="option"><input type="radio" name="spec5e3" value="wrong">mesure de l'intégration en RMN ¹H</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec5e3','spec5fb3','Correct — les carbones quaternaires n\\'ont aucun proton directement lié, donc aucun transfert de polarisation possible : ils sont toujours absents des DEPT et se repèrent par cette absence, comparée au spectre découplé complet.','Relis le paragraphe sur l\\'identification des carbones quaternaires \\'par comparaison\\'.')">Vérifier</button>
        <div class="feedback" id="spec5fb3"></div>
      </div>
    </div>
  `
};

SPECORG_NOVA_KB[specKey("RMN du carbone-13 et techniques d'édition spectrale (DEPT)")] = {
  intro: "Salut, moi c'est Nova ! On passe à la RMN ¹³C et au DEPT. Demande-moi pourquoi ¹²C n'est pas actif en RMN, comment repérer un carbone quaternaire, ou un indice sur un exercice.",
  rules: [
    { test:/12c|13c|abondance naturelle|spin nul/i, replies:["¹²C est majoritaire (98,9%) mais a un spin nucléaire NUL (I=0) : inactif en RMN. Seul ¹³C (~1,1%, I=1/2) est observable — d'où une sensibilité bien plus faible qu'en ¹H."] },
    { test:/d[ée]couplage|singulet.*carbone/i, replies:["Le découplage large bande du proton fait apparaître chaque carbone non équivalent en simple singulet — mais attention, l'intégration n'est PAS proportionnelle au nombre de carbones (contrairement au ¹H)."] },
    { test:/dept.?90|dept.?135|dept/i, replies:["DEPT-90 : ne montre QUE les CH. DEPT-135 : CH et CH₃ en phase positive, CH₂ en phase négative. Dans les deux, les carbones quaternaires sont TOUJOURS absents (pas de proton, pas de transfert de polarisation)."] },
    { test:/carbone quaternaire/i, replies:["Un carbone quaternaire (sans proton attaché, ex : C=O de cétone) n'apparaît jamais en DEPT. On le repère par comparaison : présent sur le spectre découplé classique, mais absent de tous les DEPT."] },
    { test:/d[ée]placement chimique.*13c|[ée]chelle.*13c/i, replies:["L'échelle ¹³C est large (0-220 ppm) : alcanes 0-50, C-O 50-90, alcènes/aromatiques 100-150, carbonyles 160-220 ppm."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la méthode par ÉLIMINATION.","Indice niveau 2 : le carbone quaternaire n'apparaît dans AUCUN DEPT.","Indice niveau 3 : on le repère en comparant au spectre découplé complet, où lui seul reste visible."] }
  ]
};
/* ---------------------------------------------------------------------------------
   OUTIL 3 — Calculateur du degré d'insaturation (DBE) — chapitre 6
--------------------------------------------------------------------------------- */
function updateDBE(){
  const c = parseInt(document.getElementById('dbeC').value) || 0;
  const h = parseInt(document.getElementById('dbeH').value) || 0;
  const n = parseInt(document.getElementById('dbeN').value) || 0;
  const x = parseInt(document.getElementById('dbeX').value) || 0;
  const dbe = c - (h + x)/2 + n/2 + 1;
  const out = document.getElementById('dbeReadout');
  out.innerHTML = `Degré d'insaturation : DBE = C − (H+X)/2 + N/2 + 1 = ${c} − (${h}+${x})/2 + ${n}/2 + 1 = <strong>${dbe.toFixed(1)}</strong><br>` +
    (Number.isInteger(dbe) && dbe >= 0 ? `Formule chimiquement cohérente. DBE = ${dbe} : nombre total de cycles + liaisons π (ex : 1 cycle aromatique + 3 C=C = 4).` :
      (dbe < 0 ? `⚠ DBE négatif : la formule brute proposée n'est pas chimiquement valide.` : `⚠ DBE non entier : vérifie le nombre d'atomes d'hydrogène (une molécule neutre CₓHᵧNᵤXᵥ doit donner un DBE entier).`));
}
function initDBE(){ updateDBE(); }

/* =========================== CHAPITRE 6 — Spectrométrie de masse : principes, ionisation et détermination de la formule brute =========================== */
SPECORG_CHAPTERS[specKey("Spectrométrie de masse : principes, ionisation et détermination de la formule brute")] = {
  objectives: [
    "Décrire le principe général d'un spectromètre de masse (ionisation, séparation, détection)",
    "Expliquer le principe de l'ionisation par impact électronique et la formation de l'ion moléculaire M⁺•",
    "Énoncer et appliquer la règle de l'azote pour restreindre les formules brutes compatibles",
    "Interpréter les pics isotopiques M+1 et M+2 pour détecter la présence de chlore, brome ou soufre",
    "Calculer le degré d'insaturation (DBE) d'une molécule à partir de sa formule brute"
  ],
  prereqs: ["RMN du carbone-13 et techniques d'édition spectrale (DEPT)"],
  bodyHtml: `
    <p>La spectrométrie de masse (SM) diffère fondamentalement des techniques spectroscopiques précédentes : elle ne repose pas sur l'absorption d'un rayonnement électromagnétique, mais sur la <strong>fragmentation contrôlée</strong> d'une molécule ionisée, suivie de la séparation et de la détection des ions produits selon leur rapport masse sur charge $m/z$. C'est la technique qui donne accès, en premier lieu, à la <strong>masse moléculaire</strong> et à la <strong>formule brute</strong> du composé étudié.</p>

    <h3>1. Principe général d'un spectromètre de masse</h3>
    <p>Un spectromètre de masse comporte toujours trois éléments fonctionnels : une <strong>source d'ionisation</strong> qui transforme les molécules neutres en ions en phase gazeuse, un <strong>analyseur</strong> qui sépare ces ions selon leur rapport $m/z$ (par exemple un secteur magnétique, un quadripôle, ou un analyseur à temps de vol), et un <strong>détecteur</strong> qui mesure l'abondance relative de chaque ion. Le résultat est un <strong>spectre de masse</strong> : un diagramme en bâtons donnant l'abondance relative (souvent normalisée à 100 % pour le pic le plus intense, appelé <strong>pic de base</strong>) en fonction de $m/z$.</p>

    <h3>2. L'ionisation par impact électronique (IE)</h3>
    <p>La méthode d'ionisation la plus classique en chimie organique, l'<strong>impact électronique</strong>, bombarde les molécules en phase gazeuse avec un faisceau d'électrons de haute énergie (typiquement 70 eV) : un électron est arraché à la molécule neutre M, produisant un <strong>cation radicalaire</strong> appelé <strong>ion moléculaire</strong>, noté $\\text{M}^{+\\bullet}$ :</p>
    <div class="formula-box">$$\\text{M} + e^- \\longrightarrow \\text{M}^{+\\bullet} + 2e^-$$</div>
    <p>Le pic correspondant à $\\text{M}^{+\\bullet}$, lorsqu'il est observable, donne directement la <strong>masse molaire</strong> du composé — c'est en général la première information à extraire d'un spectre de masse. L'énergie de 70 eV, très supérieure aux énergies de liaison typiques (quelques eV), confère à l'ion moléculaire un excès d'énergie interne qui provoque souvent sa <strong>fragmentation</strong> ultérieure (chapitre suivant) : le pic $\\text{M}^{+\\bullet}$ peut donc être de faible intensité, voire absent, pour des molécules qui se fragmentent très facilement (alcools ramifiés, par exemple).</p>

    <h3>3. La règle de l'azote</h3>
    <p>Une règle simple, mais très utile, permet de restreindre rapidement les formules brutes compatibles avec une masse moléculaire observée : la <strong>règle de l'azote</strong>. Pour une molécule neutre ne contenant que C, H, O, N, S et les halogènes, la masse nominale de l'ion moléculaire est <strong>paire</strong> si le nombre d'atomes d'azote est <strong>pair</strong> (y compris zéro), et <strong>impaire</strong> si le nombre d'atomes d'azote est <strong>impair</strong>.</p>
    <div class="key-point">
      <span class="eyebrow">Pourquoi cette règle fonctionne</span>
      L'azote est le seul élément courant en chimie organique dont la valence (3) est <strong>impaire</strong> alors que sa masse atomique nominale (14) est <strong>paire</strong> — tous les autres éléments courants (C, H, O, S, halogènes) ont soit une valence paire avec masse paire, soit une valence impaire avec masse impaire. Chaque atome d'azote « casse » donc cette parité naturelle d'une unité, d'où la règle. Elle permet, par exemple, d'éliminer immédiatement une hypothèse de structure contenant un nombre impair d'atomes d'azote si la masse moléculaire observée est paire.
    </div>

    <h3>4. Les pics isotopiques : détecter Cl, Br, S</h3>
    <p>Outre le pic $\\text{M}^{+\\bullet}$ lui-même, le spectre présente souvent des pics satellites de masse légèrement supérieure, dus à la présence naturelle d'isotopes plus lourds dans la molécule. Deux signatures isotopiques sont particulièrement diagnostiques :</p>
    <table class="mini-table">
      <tr><th>Élément</th><th>Isotopes (abondance relative)</th><th>Signature sur le spectre</th></tr>
      <tr><td>Chlore</td><td>³⁵Cl (75,8 %), ³⁷Cl (24,2 %)</td><td>pic M+2 avec une intensité d'environ 1/3 du pic M</td></tr>
      <tr><td>Brome</td><td>⁷⁹Br (50,7 %), ⁸¹Br (49,3 %)</td><td>pic M+2 d'intensité quasiment <strong>égale</strong> au pic M (rapport ~1:1, très caractéristique)</td></tr>
      <tr><td>Soufre</td><td>³²S (95,0 %), ³⁴S (4,2 %)</td><td>pic M+2 de faible intensité (~4 % du pic M)</td></tr>
      <tr><td>Carbone</td><td>¹²C (98,9 %), ¹³C (1,1 %)</td><td>pic M+1 d'intensité ≈ (1,1 × nombre de C) % du pic M — utile pour estimer le nombre de carbones</td></tr>
    </table>
    <p>Le motif M/M+2 quasiment <strong>1:1</strong> est la signature la plus reconnaissable de toute la spectrométrie de masse organique : elle indique sans ambiguïté la présence d'un atome de brome dans la molécule.</p>

    <h3>5. Le degré d'insaturation (DBE)</h3>
    <p>Une fois la formule brute $\\text{C}_c\\text{H}_h\\text{N}_n\\text{O}_o\\text{X}_x$ établie (à partir de la masse exacte, mesurée par spectrométrie de masse haute résolution, ou déduite d'analyses complémentaires), on peut calculer le <strong>degré d'insaturation</strong> (ou <em>Degree of Unsaturation</em>, DBE, pour <em>Double Bond Equivalents</em>) :</p>
    <div class="formula-box">$$\\text{DBE} = C - \\frac{H+X}{2} + \\frac{N}{2} + 1$$</div>
    <p>Cette grandeur compte le nombre <strong>total</strong> de cycles et de liaisons $\\pi$ (une double liaison ou un cycle compte pour 1, une triple liaison ou un cycle aromatique compte pour... un cycle + les liaisons π qu'il contient, par exemple un noyau benzénique donne DBE=4 : 1 cycle + 3 doubles liaisons). Le DBE est une information précieuse, obtenue <em>avant même d'examiner les autres spectres</em>, pour orienter l'interprétation des données IR et RMN qui suivront.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un composé organique de formule brute $\\text{C}_8\\text{H}_8\\text{O}$ présente un ion moléculaire à $m/z=120$. Calculer son degré d'insaturation et proposer une interprétation.</p>
      <p><strong>Solution :</strong> $\\text{DBE} = 8 - 8/2 + 0/2 + 1 = 8-4+0+1 = 5$. Un DBE de 5 est compatible, par exemple, avec un noyau aromatique (DBE=4 : 1 cycle + 3 doubles liaisons) plus un groupe carbonyle supplémentaire (DBE=1) — structure cohérente avec l'acétophénone C₆H₅-CO-CH₃, dont la masse molaire est bien 120 g·mol⁻¹.</p>
      <p class="example-answer">Réponse : DBE=5, compatible avec un cycle aromatique (4) + un groupe C=O (1), par exemple l'acétophénone.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un spectromètre de masse : source d'ionisation → analyseur (séparation par m/z) → détecteur</li>
        <li>Impact électronique (70 eV) : M + e⁻ → M⁺• + 2e⁻ ; le pic M⁺• donne la masse molaire</li>
        <li>Règle de l'azote : masse moléculaire paire ↔ nombre pair (ou nul) d'atomes N ; masse impaire ↔ nombre impair de N</li>
        <li>Signatures isotopiques : Cl → M+2 à 1/3 de M ; Br → M+2 ≈ M (rapport 1:1, très caractéristique) ; S → M+2 faible (~4%)</li>
        <li>DBE = C − (H+X)/2 + N/2 + 1 : nombre total de cycles + liaisons π</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le rapport M/M+2 du chlore (~3:1) avec celui du brome (~1:1) — ce sont des signatures très différentes et très reconnaissables</li>
        <li>Oublier que l'ion moléculaire M⁺• peut être absent ou de très faible intensité pour des molécules qui se fragmentent facilement, sans que cela remette en cause son existence théorique</li>
        <li>Appliquer la règle de l'azote sans tenir compte des halogènes ou du soufre — la règle reste valable, mais uniquement pour les éléments C, H, N, O, S et halogènes usuels</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — degré d'insaturation (DBE)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Renseigne le nombre d'atomes de C, H, N et d'halogènes (X) de la formule brute pour calculer le DBE.</p>
      <div class="sim-controls">
        <label>C : <input type="number" id="dbeC" value="8" min="0" step="1" style="width:60px;" oninput="updateDBE()"></label>
        <label>H : <input type="number" id="dbeH" value="8" min="0" step="1" style="width:60px;" oninput="updateDBE()"></label>
        <label>N : <input type="number" id="dbeN" value="0" min="0" step="1" style="width:60px;" oninput="updateDBE()"></label>
        <label>X (halogènes) : <input type="number" id="dbeX" value="0" min="0" step="1" style="width:60px;" oninput="updateDBE()"></label>
        <div class="sim-readout" id="dbeReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un spectre de masse présentant un pic M et un pic M+2 d'intensité quasiment égale (rapport ~1:1) révèle la présence de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec6e1" value="wrong">chlore</label>
          <label class="option"><input type="radio" name="spec6e1" value="right">brome</label>
          <label class="option"><input type="radio" name="spec6e1" value="wrong">soufre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec6e1','spec6fb1','Correct — le brome (⁷⁹Br et ⁸¹Br, abondances quasiment égales) donne un motif M/M+2 très caractéristique proche de 1:1, contrairement au chlore (~3:1) ou au soufre (M+2 faible).','Relis le tableau des signatures isotopiques : quel élément a deux isotopes d\\'abondance presque égale ?')">Vérifier</button>
        <div class="feedback" id="spec6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">D'après la règle de l'azote, une molécule neutre (C, H, N, O uniquement) de masse moléculaire IMPAIRE contient :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec6e2" value="wrong">un nombre pair d'atomes d'azote (y compris zéro)</label>
          <label class="option"><input type="radio" name="spec6e2" value="right">un nombre impair d'atomes d'azote</label>
          <label class="option"><input type="radio" name="spec6e2" value="wrong">nécessairement aucun atome d'azote</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec6e2','spec6fb2','Correct — la règle de l\\'azote : masse impaire ↔ nombre impair d\\'atomes N (1, 3, 5...), masse paire ↔ nombre pair ou nul d\\'atomes N.','Relis l\\'énoncé de la règle de l\\'azote et l\\'explication de sa cause (valence impaire de N pour une masse paire).')">Vérifier</button>
        <div class="feedback" id="spec6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour la formule brute C₆H₆ (benzène), le degré d'insaturation DBE vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec6e3" value="wrong">3</label>
          <label class="option"><input type="radio" name="spec6e3" value="right">4</label>
          <label class="option"><input type="radio" name="spec6e3" value="wrong">6</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec6e3','spec6fb3','Correct — DBE = 6 - 6/2 + 0 + 1 = 6-3+1 = 4, cohérent avec 1 cycle + 3 doubles liaisons du noyau aromatique du benzène.','Utilise la formule DBE = C - H/2 + 1 (sans N ni X ici) avec C=6, H=6.')">Vérifier</button>
        <div class="feedback" id="spec6fb3"></div>
      </div>
    </div>
  `,
  init: initDBE
};

SPECORG_NOVA_KB[specKey("Spectrométrie de masse : principes, ionisation et détermination de la formule brute")] = {
  intro: "Salut, moi c'est Nova ! On aborde la spectrométrie de masse. Demande-moi la règle de l'azote, comment reconnaître le brome sur un spectre, ou un indice sur un exercice.",
  rules: [
    { test:/impact [ée]lectronique|ion mol[ée]culaire|m\+[•.]?/i, replies:["Impact électronique (70 eV) : M + e⁻ → M⁺• + 2e⁻. Le pic M⁺• (cation radicalaire) donne directement la masse molaire, mais peut être faible ou absent si la molécule se fragmente facilement."] },
    { test:/r[èe]gle de l.azote/i, replies:["Règle de l'azote : masse moléculaire paire ↔ nombre pair (ou nul) d'atomes N. Masse impaire ↔ nombre impair de N. Ça vient du fait que N a une masse paire (14) mais une valence impaire (3), contrairement aux autres éléments courants."] },
    { test:/pic isotopique|m\+1|m\+2|chlore|brome|soufre/i, replies:["Cl → M+2 à ~1/3 de M. Br → M+2 quasiment égal à M (rapport ~1:1, très reconnaissable !). S → M+2 faible (~4%). C → M+1 ≈ 1,1% par carbone présent."] },
    { test:/dbe|degr[ée] d.insaturation|double bond equivalent/i, replies:["DBE = C - (H+X)/2 + N/2 + 1. Il compte le nombre total de cycles + liaisons π. Un noyau benzénique donne DBE=4 (1 cycle + 3 doubles liaisons)."] },
    { test:/spectrom[èe]tre.*masse|source.*analyseur.*d[ée]tecteur/i, replies:["Un spectromètre de masse : source d'ionisation (transforme M en ions) → analyseur (sépare par m/z) → détecteur (mesure l'abondance). Le résultat est un diagramme en bâtons normalisé au pic de base (100%)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : utilise la formule DBE = C - H/2 + 1 (pas de N ni X ici).","Indice niveau 2 : C=6, H=6.","Indice niveau 3 : DBE = 6 - 3 + 1 = 4."] }
  ]
};
/* =========================== CHAPITRE 7 — Fragmentation en spectrométrie de masse : mécanismes et réarrangements =========================== */
SPECORG_CHAPTERS[specKey("Fragmentation en spectrométrie de masse : mécanismes et réarrangements")] = {
  objectives: [
    "Distinguer les clivages simples (homolytiques et hétérolytiques) et les réarrangements en spectrométrie de masse",
    "Appliquer la règle de Stevenson pour prévoir quel fragment porte préférentiellement la charge",
    "Décrire le mécanisme du clivage α, très favorable au voisinage d'un hétéroatome ou d'une insaturation",
    "Énoncer les conditions et le mécanisme du réarrangement de McLafferty",
    "Reconnaître les pertes de masse neutres les plus courantes (18, 28, 15, 43...) et leur interprétation structurale"
  ],
  prereqs: ["Spectrométrie de masse : principes, ionisation et détermination de la formule brute"],
  bodyHtml: `
    <p>L'excès d'énergie interne de l'ion moléculaire $\\text{M}^{+\\bullet}$, formé par impact électronique (chapitre précédent), provoque très souvent sa <strong>fragmentation</strong> en ions plus petits — c'est justement cette fragmentation, en apparence une complication, qui constitue la richesse structurale de la spectrométrie de masse : le motif de fragmentation observé est une véritable signature du squelette moléculaire.</p>

    <h3>1. Deux grandes catégories de fragmentation</h3>
    <p>On distingue les <strong>clivages simples</strong> (rupture d'une seule liaison, sans réarrangement du squelette) des <strong>réarrangements</strong> (rupture de plusieurs liaisons de façon concertée, souvent avec migration d'un atome d'hydrogène, produisant un fragment neutre stable). Les clivages simples se subdivisent eux-mêmes en clivage <strong>homolytique</strong> (chaque fragment emporte un électron non apparié, formant un cation et un radical neutre) et clivage <strong>hétérolytique</strong> (les deux électrons de la liaison rompue partent avec le même fragment, formant un cation et un fragment neutre à couche complète).</p>

    <h3>2. La règle de Stevenson : quel fragment porte la charge ?</h3>
    <p>Lorsqu'une liaison se rompt en donnant deux fragments possibles, la <strong>règle de Stevenson</strong> (ou règle de Stevenson-Audier) prédit que la charge positive reste préférentiellement sur le fragment dont le <strong>potentiel d'ionisation est le plus bas</strong> — c'est-à-dire le fragment capable de stabiliser le mieux une charge positive (généralement celui qui peut délocaliser la charge par résonance ou par effet inductif donneur). Ainsi, un fragment stabilisé par conjugaison (allylique, benzylique) ou par un hétéroatome porteur d'un doublet non liant sera préférentiellement observé sous forme cationique, plutôt que son partenaire radicalaire neutre correspondant.</p>

    <h3>3. Le clivage $\\alpha$</h3>
    <p>Le <strong>clivage $\\alpha$</strong> est la fragmentation la plus fréquente au voisinage d'un hétéroatome porteur d'un doublet non liant (O, N) ou d'une insaturation : la liaison C-C rompue est celle directement <strong>adjacente</strong> au site radicalaire (souvent situé formellement sur l'hétéroatome après ionisation), ce qui permet une stabilisation du cation résultant par délocalisation du doublet non liant :</p>
    <div class="formula-box">$$\\text{R}-\\overset{\\displaystyle\\bullet}{\\text{O}}^+\\!\\!-\\!\\text{CH}_2-\\text{R}' \\longrightarrow \\text{R}-\\text{O}^+\\!=\\!\\text{CH}_2 \\ +\\ ^{\\bullet}\\text{R}'$$</div>
    <p>Le cation résultant (souvent appelé <strong>ion oxocarbénium</strong> lorsqu'il s'agit d'oxygène) est fortement stabilisé par la délocalisation du doublet non liant de l'hétéroatome sur le carbone déficient en électrons, ce qui explique la très grande fréquence de ce type de clivage pour les alcools, éthers, amines et cétones.</p>

    <h3>4. Le réarrangement de McLafferty</h3>
    <p>Le <strong>réarrangement de McLafferty</strong> est l'un des réarrangements les plus caractéristiques et les plus étudiés de la spectrométrie de masse organique. Il nécessite la présence d'un groupe carbonyle (ou d'un système équivalent : C=N, C=C conjugué) et d'un <strong>hydrogène en position $\\gamma$</strong> par rapport au carbonyle, permettant une transition à travers un état de transition cyclique à <strong>six centres</strong> :</p>
    <div class="key-point">
      <span class="eyebrow">Mécanisme du réarrangement de McLafferty</span>
      L'hydrogène en position γ migre vers l'oxygène du carbonyle via un cycle à six atomes (analogue géométriquement à une élimination de Hofmann à travers un état de transition concerté), tandis que la liaison $C_\\alpha$-$C_\\beta$ se rompt simultanément. Il en résulte deux fragments : un fragment neutre (alcène, souvent perdu par perte de masse), et un ion radicalaire de type <strong>énol</strong> conjugué, généralement très stable et donc bien observé sur le spectre. Cette réaction nécessite impérativement un hydrogène disponible en γ : son absence (par exemple pour une cétone dont la chaîne est trop courte du côté considéré) empêche totalement ce réarrangement.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la hexan-2-one CH₃-CO-CH₂-CH₂-CH₂-CH₃ subit un réarrangement de McLafferty. Identifier l'hydrogène impliqué et la nature du fragment neutre perdu.</p>
      <p><strong>Solution :</strong> en numérotant à partir du carbonyle ($C_1$=O, $C_2$ étant le carbone du méthyle côté acétyle n'a pas de chaîne exploitable côté courte ; on considère la chaîne longue), les positions $\\alpha,\\beta,\\gamma$ côté chaîne longue sont respectivement les carbones 3, 4, 5. L'hydrogène en position $\\gamma$ (sur $C_5$) migre vers l'oxygène du carbonyle à travers l'état de transition à six centres, avec rupture de la liaison $C_3$-$C_4$ ($\\alpha$-$\\beta$). Le fragment neutre perdu est le propène (CH₂=CH-CH₃, $C_4$-$C_5$-$C_6$ avec l'hydrogène transféré).</p>
      <p class="example-answer">Réponse : l'hydrogène en γ (sur le carbone 5 de la chaîne) migre vers l'oxygène ; le fragment neutre perdu est le propène, laissant un ion énol stabilisé de masse réduite de 42 unités par rapport à M⁺•.</p>
    </div>

    <h3>5. Pertes de masse neutres courantes et leur interprétation</h3>
    <p>La différence de masse entre l'ion moléculaire et un pic de fragmentation important (« perte de masse neutre ») est souvent, à elle seule, très diagnostique de la nature du groupe fonctionnel perdu :</p>
    <table class="mini-table">
      <tr><th>Perte de masse</th><th>Fragment neutre perdu</th><th>Indication structurale</th></tr>
      <tr><td>15</td><td>•CH₃ (radical méthyle)</td><td>groupe méthyle facilement clivable</td></tr>
      <tr><td>18</td><td>H₂O</td><td>alcool, acide carboxylique (élimination d'eau)</td></tr>
      <tr><td>28</td><td>CO ou C₂H₄</td><td>groupe carbonyle (perte de CO) ou alcène (rétro-Diels-Alder, McLafferty)</td></tr>
      <tr><td>29</td><td>•CHO ou •C₂H₅</td><td>aldéhyde (perte du radical formyle) ou groupe éthyle</td></tr>
      <tr><td>43</td><td>•C₃H₇ ou CH₃CO• (acylium)</td><td>groupe propyle ou groupe acétyle</td></tr>
      <tr><td>45</td><td>•COOH ou •OC₂H₅</td><td>acide carboxylique ou ester éthylique</td></tr>
    </table>
    <p>La combinaison de plusieurs pertes de masse successives, couplée au motif isotopique et au degré d'insaturation (chapitre précédent), permet en général de reconstituer une hypothèse structurale solide, qui sera ensuite confirmée ou infirmée par les spectres IR et RMN (chapitre suivant, synthèse méthodologique).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Clivage simple (homolytique/hétérolytique, une seule liaison rompue) vs réarrangement (plusieurs liaisons, migration d'H, fragment neutre stable)</li>
        <li>Règle de Stevenson : la charge reste sur le fragment le plus apte à la stabiliser (potentiel d'ionisation le plus bas)</li>
        <li>Clivage α : rupture C-C adjacente à un hétéroatome (O, N) ou une insaturation, cation stabilisé par délocalisation du doublet non liant</li>
        <li>Réarrangement de McLafferty : nécessite un C=O et un H en position γ, état de transition cyclique à 6 centres, perte d'un alcène neutre</li>
        <li>Pertes de masse diagnostiques : 18 (H₂O), 28 (CO/alcène), 15 (CH₃•), 43 (C₃H₇•/acétyle), 45 (COOH•/OEt•)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre clivage α (rupture SIMPLE d'une liaison adjacente à un hétéroatome) avec le réarrangement de McLafferty (concerté, implique un H en γ et un état de transition cyclique)</li>
        <li>Oublier la condition impérative d'un hydrogène en position γ pour le réarrangement de McLafferty — en son absence, ce réarrangement est tout simplement impossible</li>
        <li>Confondre perte de 28 (CO ou C₂H₄, ambiguë sans autre indice) avec une perte de 27 (HCN) ou de 26 (C₂H₂) — l'écart d'une unité de masse change complètement l'interprétation structurale</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">D'après la règle de Stevenson, lorsqu'une liaison se rompt en donnant deux fragments possibles, la charge positive reste préférentiellement sur le fragment :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec7e1" value="wrong">le plus lourd des deux</label>
          <label class="option"><input type="radio" name="spec7e1" value="right">dont le potentiel d'ionisation est le plus bas (le mieux capable de stabiliser la charge)</label>
          <label class="option"><input type="radio" name="spec7e1" value="wrong">choisi au hasard, sans règle prévisible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec7e1','spec7fb1','Correct — la règle de Stevenson prédit que la charge reste sur le fragment le plus apte à la stabiliser, c\\'est-à-dire celui de plus bas potentiel d\\'ionisation.','Relis l\\'énoncé de la règle de Stevenson en début de section 2.')">Vérifier</button>
        <div class="feedback" id="spec7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le réarrangement de McLafferty nécessite impérativement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec7e2" value="wrong">un atome de brome sur la molécule</label>
          <label class="option"><input type="radio" name="spec7e2" value="right">un groupe carbonyle et un hydrogène en position γ</label>
          <label class="option"><input type="radio" name="spec7e2" value="wrong">une masse moléculaire supérieure à 200</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec7e2','spec7fb2','Correct — sans hydrogène disponible en γ du carbonyle, la migration à travers l\\'état de transition cyclique à 6 centres est impossible : le réarrangement de McLafferty ne peut pas se produire.','Relis la condition impérative énoncée dans l\\'encadré sur le mécanisme de McLafferty.')">Vérifier</button>
        <div class="feedback" id="spec7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une perte de masse neutre de 18 unités (M-18) sur un spectre de masse évoque typiquement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec7e3" value="wrong">la perte d'un groupe méthyle</label>
          <label class="option"><input type="radio" name="spec7e3" value="right">la perte d'une molécule d'eau (alcool ou acide carboxylique)</label>
          <label class="option"><input type="radio" name="spec7e3" value="wrong">la perte d'un atome de chlore</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec7e3','spec7fb3','Correct — une perte de 18 correspond à H₂O (masse 18), typique d\\'un alcool ou d\\'un acide carboxylique qui élimine facilement de l\\'eau lors de la fragmentation.','Relis le tableau des pertes de masse neutres courantes.')">Vérifier</button>
        <div class="feedback" id="spec7fb3"></div>
      </div>
    </div>
  `
};

SPECORG_NOVA_KB[specKey("Fragmentation en spectrométrie de masse : mécanismes et réarrangements")] = {
  intro: "Salut, moi c'est Nova ! On étudie la fragmentation en spectrométrie de masse. Demande-moi la règle de Stevenson, le mécanisme de McLafferty, ou un indice sur un exercice.",
  rules: [
    { test:/stevenson/i, replies:["La règle de Stevenson : la charge positive reste préférentiellement sur le fragment dont le potentiel d'ionisation est le plus bas, c'est-à-dire celui qui stabilise le mieux une charge (par résonance ou effet inductif)."] },
    { test:/clivage.*alpha|clivage.*α/i, replies:["Le clivage α rompt une liaison C-C adjacente à un hétéroatome (O, N) ou une insaturation : le cation résultant est stabilisé par délocalisation du doublet non liant sur le carbone déficient — très fréquent pour alcools, éthers, amines, cétones."] },
    { test:/mclafferty/i, replies:["Réarrangement de McLafferty : nécessite un C=O et un H en position γ. L'hydrogène migre vers l'oxygène via un état de transition cyclique à 6 centres, la liaison Cα-Cβ se rompt, un alcène neutre est perdu, laissant un ion énol stable."] },
    { test:/perte de masse|m-18|m-28|m-15|m-43/i, replies:["Pertes courantes : 15 (•CH₃), 18 (H₂O, alcool/acide), 28 (CO ou alcène), 43 (•C₃H₇ ou groupe acétyle), 45 (•COOH ou •OEt). Elles orientent directement l'hypothèse structurale."] },
    { test:/clivage homolytique|clivage h[ée]t[ée]rolytique|r[ée]arrangement/i, replies:["Clivage simple (une liaison rompue) : homolytique (chaque fragment garde un électron) ou hétérolytique (les 2 électrons partent ensemble). Réarrangement (McLafferty) : plusieurs liaisons, migration d'H, fragment neutre stable."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à la condition GÉOMÉTRIQUE nécessaire au mécanisme.","Indice niveau 2 : il faut un groupe C=O ET un hydrogène disponible.","Indice niveau 3 : cet hydrogène doit être précisément en position γ par rapport au carbonyle."] }
  ]
};
/* =========================== CHAPITRE 8 — Élucidation structurale par couplage des méthodes spectroscopiques =========================== */
SPECORG_CHAPTERS[specKey("Élucidation structurale par couplage des méthodes spectroscopiques")] = {
  objectives: [
    "Définir une stratégie méthodique combinant UV-visible, infrarouge, RMN et spectrométrie de masse pour élucider une structure inconnue",
    "Hiérarchiser l'information apportée par chaque technique selon la question structurale posée",
    "Résoudre un problème d'élucidation structurale simple en croisant plusieurs jeux de données spectroscopiques",
    "Identifier les limites de chaque technique prise isolément et l'intérêt de leur complémentarité",
    "Relier les données spectroscopiques aux informations obtenues par les techniques de cristallochimie (diffraction des rayons X) pour la détermination structurale complète"
  ],
  prereqs: ["Fragmentation en spectrométrie de masse : mécanismes et réarrangements", "Spectroscopie UV-visible : transitions électroniques et chromophores"],
  bodyHtml: `
    <p>Ce dernier chapitre ne présente pas de nouvelle technique, mais propose une <strong>méthodologie</strong> pour combiner efficacement les quatre grandes familles de spectroscopie organique étudiées dans ce module — UV-visible, infrarouge, RMN et spectrométrie de masse — afin de déterminer la structure d'un composé inconnu. C'est un exercice de synthèse qui mobilise l'ensemble des chapitres précédents.</p>

    <h3>1. Ce que révèle chaque technique</h3>
    <table class="mini-table">
      <tr><th>Technique</th><th>Information principale</th><th>Limite principale</th></tr>
      <tr><td>Spectrométrie de masse</td><td>masse moléculaire, formule brute (avec masse exacte), degré d'insaturation, fragments diagnostiques</td><td>ne dit rien directement sur la position exacte des groupes fonctionnels sur le squelette</td></tr>
      <tr><td>Infrarouge</td><td>présence/absence de groupes fonctionnels caractéristiques (C=O, O-H, C≡N...)</td><td>ne donne pas le nombre d'atomes de chaque type ni leur connectivité fine</td></tr>
      <tr><td>UV-visible</td><td>présence et étendue d'un système conjugué (chromophore)</td><td>peu spécifique en dehors des systèmes conjugués — silencieuse pour la plupart des molécules saturées</td></tr>
      <tr><td>RMN ¹H</td><td>nombre de types de protons, environnement chimique (δ), connectivité (couplage J), nombre relatif de protons (intégration)</td><td>ne renseigne pas directement sur les carbones sans proton (quaternaires)</td></tr>
      <tr><td>RMN ¹³C (+ DEPT)</td><td>nombre de types de carbones, environnement chimique, distinction CH₃/CH₂/CH/C quaternaire</td><td>intégration non quantitative ; nécessite un temps d'acquisition plus long</td></tr>
    </table>

    <h3>2. Stratégie méthodique d'élucidation structurale</h3>
    <p>Face à un jeu de données spectroscopiques inconnu, une démarche systématique — largement inspirée de la pratique de laboratoire — permet de converger efficacement vers une structure :</p>
    <ul>
      <li><strong>Étape 1 — Masse moléculaire et formule brute.</strong> Identifier le pic $\\text{M}^{+\\bullet}$ (ou la masse exacte si disponible), appliquer la règle de l'azote, repérer d'éventuels pics isotopiques (Cl, Br, S), et en déduire une ou plusieurs formules brutes candidates.</li>
      <li><strong>Étape 2 — Degré d'insaturation.</strong> Calculer le DBE pour chaque formule brute candidate : cela oriente immédiatement vers la présence (ou l'absence) de cycles, de doubles ou triples liaisons, de noyaux aromatiques.</li>
      <li><strong>Étape 3 — Groupes fonctionnels par IR.</strong> Repérer les bandes caractéristiques (région 4000-1500 cm⁻¹) pour confirmer ou infirmer la présence de groupes suggérés par le DBE (carbonyle, hydroxyle, nitrile...).</li>
      <li><strong>Étape 4 — Chromophore éventuel par UV-visible.</strong> Si un système conjugué est suspecté (DBE élevé, bandes IR de C=C ou C=O conjugué), le $\\lambda_{max}$ et $\\varepsilon$ observés en UV-visible confirment l'étendue de la conjugaison.</li>
      <li><strong>Étape 5 — Squelette carboné par RMN.</strong> Le nombre de signaux ¹H (avec intégration et multiplicité) et ¹³C (avec DEPT) permet de reconstituer précisément la connectivité du squelette et l'attribution de chaque groupe à une position particulière.</li>
      <li><strong>Étape 6 — Confirmation croisée par les fragments de masse.</strong> Les pertes de masse neutres observées (chapitre 7) doivent être cohérentes avec la structure proposée à l'issue des étapes précédentes — c'est souvent la meilleure vérification finale.</li>
    </ul>

    <div class="key-point">
      <span class="eyebrow">Pourquoi croiser les techniques plutôt que se fier à une seule ?</span>
      Aucune technique spectroscopique isolée ne permet, en général, de déterminer une structure organique sans ambiguïté : la spectrométrie de masse donne la masse et une idée du degré d'insaturation, mais pas la position exacte des groupes ; l'IR confirme la présence de groupes fonctionnels, mais pas leur nombre ni leur environnement précis ; la RMN donne la connectivité fine, mais peut laisser des ambiguïtés sur des isomères de constitution proches en l'absence d'expériences complémentaires. C'est la <strong>convergence</strong> de plusieurs jeux de données indépendants, chacun apportant une contrainte supplémentaire, qui permet d'aboutir à une structure unique et fiable — exactement comme la radiocristallographie (module « Cristallochimie — radiocristallographie » de ce même semestre) combine plusieurs types de mesures de diffraction (poudre, monocristal) pour résoudre une structure cristalline complète.
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — synthèse méthodologique</span>
      <p><strong>Énoncé :</strong> un composé inconnu présente les données suivantes : ion moléculaire à $m/z=136$ (masse paire), IR : forte bande à 1715 cm⁻¹, pas de bande large vers 3300 cm⁻¹ ; RMN ¹H : un singulet à 9,9 ppm (1H), un multiplet aromatique vers 7,4-7,8 ppm (4H), un singulet à 2,6 ppm (3H) ; formule brute déduite $\\text{C}_9\\text{H}_9\\text{ClO}$... reconsidérons : en fait la donnée est cohérente avec $\\text{C}_8\\text{H}_8\\text{O}_2$ (masse 136). Proposer une structure.</p>
      <p><strong>Solution :</strong> masse paire et pas d'azote détecté (cohérent avec la règle de l'azote pour 0 atome N). Pour $\\text{C}_8\\text{H}_8\\text{O}_2$, $\\text{DBE}=8-8/2+0+1=5$, compatible avec un cycle aromatique (4) + un groupe carbonyle (1). La bande IR à 1715 cm⁻¹ (forte, fine) indique un carbonyle de type ester ou aldéhyde aromatique conjugué ; l'absence de bande O-H large exclut un acide carboxylique libre. Le singulet à 9,9 ppm (1H) est typique d'un proton aldéhydique CHO ; le massif aromatique (4H) suggère un noyau benzénique disubstitué ; le singulet à 2,6 ppm (3H) évoque un groupe méthoxy ou méthyle sur le cycle.</p>
      <p class="example-answer">Réponse : l'ensemble converge vers un <em>p</em>-méthoxybenzaldéhyde (anisaldéhyde), C₈H₈O₂ — chaque technique apporte une pièce du puzzle, et c'est leur combinaison qui permet de conclure sans ambiguïté.</p>
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 90" width="100%">
          <circle cx="30" cy="25" r="16" fill="none" stroke="#3D6BF0" stroke-width="1.2"/>
          <text x="14" y="27" font-size="6" fill="#3D6BF0">SM</text>
          <circle cx="90" cy="25" r="16" fill="none" stroke="#F0555C" stroke-width="1.2"/>
          <text x="78" y="27" font-size="6" fill="#F0555C">IR</text>
          <circle cx="30" cy="65" r="16" fill="none" stroke="#2FA37A" stroke-width="1.2"/>
          <text x="16" y="67" font-size="6" fill="#2FA37A">RMN</text>
          <circle cx="90" cy="65" r="16" fill="none" stroke="#E8A93A" stroke-width="1.2"/>
          <text x="74" y="67" font-size="6" fill="#E8A93A">UV-vis</text>
          <circle cx="60" cy="45" r="10" fill="#122043" opacity="0.15"/>
          <text x="47" y="48" font-size="5.5">structure</text>
        </svg>
        <span>La structure finale émerge de la convergence de plusieurs jeux de données indépendants.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Chaque technique apporte une information partielle et complémentaire : masse/DBE (SM), groupes fonctionnels (IR), conjugaison (UV-vis), connectivité (RMN)</li>
        <li>Démarche méthodique : masse et formule brute → DBE → groupes IR → chromophore UV-vis → squelette RMN → confirmation par les fragments de masse</li>
        <li>Aucune technique seule ne suffit en général : c'est la convergence de données indépendantes qui garantit une structure fiable</li>
        <li>Cette logique de croisement de méthodes est la même que celle employée en radiocristallographie pour la détermination de structures cristallines</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Se précipiter sur l'interprétation RMN avant d'avoir établi la formule brute et le DBE — ces informations orientent et contraignent fortement l'interprétation ultérieure</li>
        <li>Ignorer une donnée qui semble incohérente avec l'hypothèse structurale en cours plutôt que de la considérer comme un signal à réexaminer — en spectroscopie réelle, une incohérence signale souvent une erreur d'interprétation antérieure</li>
        <li>Négliger la vérification finale par cohérence croisée (les fragments de masse doivent être compatibles avec la structure finale proposée)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans une démarche méthodique d'élucidation structurale, la toute première information à extraire est généralement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec8e1" value="wrong">la multiplicité des signaux RMN ¹H</label>
          <label class="option"><input type="radio" name="spec8e1" value="right">la masse moléculaire et la formule brute (spectrométrie de masse)</label>
          <label class="option"><input type="radio" name="spec8e1" value="wrong">le λ_max en UV-visible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec8e1','spec8fb1','Correct — la masse moléculaire et la formule brute, obtenues en premier par spectrométrie de masse, contraignent fortement toute l\\'interprétation ultérieure (notamment via le calcul du DBE).','Relis l\\'étape 1 de la démarche méthodique proposée dans ce chapitre.')">Vérifier</button>
        <div class="feedback" id="spec8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La RMN ¹H, prise isolément, présente la limite suivante :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec8e2" value="wrong">elle ne peut jamais distinguer deux protons différents</label>
          <label class="option"><input type="radio" name="spec8e2" value="right">elle ne renseigne pas directement sur les carbones sans aucun proton (quaternaires)</label>
          <label class="option"><input type="radio" name="spec8e2" value="wrong">elle est incapable de donner un rapport de nombre de protons entre signaux</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec8e2','spec8fb2','Correct — la RMN ¹H ne sonde que les atomes d\\'hydrogène : un carbone quaternaire, sans proton attaché, est invisible en RMN ¹H et nécessite le recours à la RMN ¹³C.','Relis le tableau des limites de chaque technique dans la première partie du chapitre.')">Vérifier</button>
        <div class="feedback" id="spec8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le principe méthodologique central de ce chapitre — croiser plusieurs techniques indépendantes pour lever les ambiguïtés — est également celui employé en :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec8e3" value="right">radiocristallographie, pour la détermination de structures cristallines</label>
          <label class="option"><input type="radio" name="spec8e3" value="wrong">calcul de rendement d'une synthèse organique</label>
          <label class="option"><input type="radio" name="spec8e3" value="wrong">titrage acido-basique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec8e3','spec8fb3','Correct — la radiocristallographie combine elle aussi plusieurs types de données de diffraction (poudre, monocristal, affinement) pour converger vers une structure fiable, exactement comme ce chapitre le montre pour la spectroscopie organique.','Relis l\\'encadré \\'Pourquoi croiser les techniques\\' en fin de section 2.')">Vérifier</button>
        <div class="feedback" id="spec8fb3"></div>
      </div>
    </div>
  `
};

SPECORG_NOVA_KB[specKey("Élucidation structurale par couplage des méthodes spectroscopiques")] = {
  intro: "Salut, moi c'est Nova ! On termine ce cours par la stratégie de couplage des méthodes spectroscopiques. Demande-moi l'ordre logique d'analyse d'un spectre inconnu, ou un indice sur un exercice.",
  rules: [
    { test:/d[ée]marche|strat[ée]gie|[ée]tapes|ordre.*analyse/i, replies:["Démarche type : 1) masse/formule brute (SM), 2) DBE, 3) groupes fonctionnels (IR), 4) chromophore éventuel (UV-vis), 5) squelette carboné (RMN ¹H/¹³C+DEPT), 6) confirmation par les fragments de masse."] },
    { test:/limite.*technique|chaque technique/i, replies:["SM : masse/DBE mais pas la position exacte des groupes. IR : présence de groupes mais pas leur nombre. UV-vis : seulement les systèmes conjugués. RMN ¹H : rien sur les carbones sans H. RMN ¹³C : intégration non quantitative."] },
    { test:/cristallographie|convergence|crois/i, replies:["Le principe de convergence de données indépendantes est le même qu'en radiocristallographie : aucune mesure seule ne suffit, c'est le croisement de plusieurs jeux de données qui garantit une structure fiable."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : relis l'étape 1 de la démarche méthodique.","Indice niveau 2 : c'est la technique qui donne la masse moléculaire en premier.","Indice niveau 3 : c'est la spectrométrie de masse."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce que la RMN ¹H sonde exactement.","Indice niveau 2 : elle ne sonde que les atomes d'hydrogène.","Indice niveau 3 : un carbone SANS aucun hydrogène (quaternaire) lui est donc invisible."] }
  ]
};

/* fusionne le module Spectroscopie organique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, SPECORG_CHAPTERS);
Object.assign(NOVA_KB, SPECORG_NOVA_KB);