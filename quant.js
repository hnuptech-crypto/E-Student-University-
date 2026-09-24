/* =====================================================================
   CHUNK « quant » — registre QUANT_CHAPTERS / QUANT_NOVA_KB
   Matière(s) : Physique|Introduction à la mécanique quantique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   QUANT_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE INTRODUCTION À LA MÉCANIQUE QUANTIQUE — Physique L2
   (contenu rédigé selon le programme standard d'introduction à la mécanique
   quantique en 2e année de Licence — crise de la physique classique, dualité
   onde-corpuscule, équation de Schrödinger, systèmes modèles, postulats de la
   mesure — conforme aux maquettes LMD francophones ; prépare le cours plus
   avancé de L3 « Mécanique quantique non relativiste »)
   Structure identique aux autres modules : QUANT_CHAPTERS / QUANT_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
============================================================================ */
const QUANT_MATIERE = 'Introduction à la mécanique quantique';
function quantKey(chapterTitle){ return `Physique|${QUANT_MATIERE}|${chapterTitle}`; }
const QUANT_CHAPTERS = {};
const QUANT_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur de l'effet photoélectrique (Chapitre 1)
--------------------------------------------------------------------------------- */
const QUANT_H_EV = 4.1357e-15; /* h en eV.s */
function updateQuantPhoto(){
  const nu = parseFloat(document.getElementById('quantNu').value) || 0; /* en 10^14 Hz */
  const W = parseFloat(document.getElementById('quantW').value) || 0; /* en eV */
  const freq = nu * 1e14;
  const Ephoton = QUANT_H_EV * freq;
  const Ec = Ephoton - W;
  const out = document.getElementById('quantPhotoReadout');
  if(Ec > 0){
    out.innerHTML = `Énergie du photon : $E=h\\nu=${Ephoton.toFixed(2)}$ eV<br>` +
      `Énergie cinétique max. des électrons éjectés : $E_c=h\\nu-W=${Ephoton.toFixed(2)}-${W.toFixed(2)}=${Ec.toFixed(2)}$ eV — <strong>émission photoélectrique possible</strong>`;
  } else {
    out.innerHTML = `Énergie du photon : $E=h\\nu=${Ephoton.toFixed(2)}$ eV, inférieure au travail d'extraction $W=${W.toFixed(2)}$ eV — <strong>aucun électron n'est éjecté</strong>, quelle que soit l'intensité lumineuse.`;
  }
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([out]); }
}
function initQuantPhoto(){ updateQuantPhoto(); }

/* =========================== CHAPITRE 1 — La crise de la physique classique =========================== */
QUANT_CHAPTERS[quantKey('La crise de la physique classique : vers la mécanique quantique')] = {
  objectives: [
    "Expliquer pourquoi la physique classique échoue à décrire le rayonnement du corps noir, l'effet photoélectrique et les spectres atomiques",
    "Énoncer l'hypothèse de quantification de Planck et son rôle historique fondateur",
    "Décrire l'effet photoélectrique et la notion de photon introduite par Einstein",
    "Relier ces échecs à la nécessité d'une nouvelle mécanique, la mécanique quantique"
  ],
  prereqs: ["Optique géométrique et notions d'ondes (L1)", "Structure de l'atome (L1)"],
  bodyHtml: `
    <p>À la fin du XIX<sup>e</sup> siècle, la physique classique — mécanique de Newton et électromagnétisme de Maxwell — semble avoir tout expliqué. Pourtant, trois phénomènes vont résister obstinément à toute explication classique et déclencher, en moins de trente ans, l'une des plus grandes révolutions scientifiques de l'histoire : la <strong>mécanique quantique</strong>.</p>

    <h3>1. La catastrophe ultraviolette</h3>
    <p>Un <strong>corps noir</strong> est un objet idéal qui absorbe puis réémet tout le rayonnement électromagnétique qu'il reçoit, avec un spectre d'émission qui ne dépend que de sa température. La théorie classique (loi de Rayleigh-Jeans), qui traite le rayonnement comme une superposition continue d'ondes, prédit que l'énergie émise devrait diverger vers l'infini aux courtes longueurs d'onde (ultraviolet) — un résultat absurde, surnommé la <strong>« catastrophe ultraviolette »</strong>, en contradiction totale avec l'expérience.</p>
    <div class="key-point">
      <span class="eyebrow">L'hypothèse de Planck (1900)</span>
      Pour résoudre ce paradoxe, Max Planck propose une hypothèse radicale : les échanges d'énergie entre la matière et le rayonnement ne se font pas de façon continue, mais par <strong>paquets discrets</strong> appelés <em>quanta</em>, d'énergie proportionnelle à la fréquence : $$E = h\\nu$$ où $h = 6{,}626\\times10^{-34}$ J·s est la <strong>constante de Planck</strong>. Cette hypothèse, initialement introduite comme un artifice de calcul, se révèlera être le premier acte de la mécanique quantique.
    </div>

    <h3>2. L'effet photoélectrique et le photon d'Einstein</h3>
    <p>Lorsqu'on éclaire une plaque métallique avec de la lumière suffisamment énergétique, elle émet des électrons — c'est l'<strong>effet photoélectrique</strong>. Or l'expérience révèle des faits inexplicables pour une onde classique : l'émission est instantanée (pas de délai d'accumulation d'énergie), elle ne se produit que si la fréquence de la lumière dépasse un <strong>seuil</strong> (quelle que soit l'intensité en dessous de ce seuil), et l'énergie cinétique des électrons éjectés dépend de la fréquence de la lumière, pas de son intensité.</p>
    <p>En 1905, Albert Einstein explique ces observations en postulant que la lumière est elle-même constituée de grains d'énergie, les <strong>photons</strong>, chacun transportant l'énergie $E=h\\nu$ de Planck. Un électron du métal absorbe un photon entier ou rien : s'il reçoit assez d'énergie pour vaincre le <strong>travail d'extraction</strong> $W$ (énergie de liaison de l'électron au métal), il est éjecté avec une énergie cinétique :</p>
    <div class="formula-box">$$E_{c,max} = h\\nu - W$$</div>
    <table class="mini-table">
      <tr><th>Métal</th><th>Travail d'extraction W (eV, approx.)</th></tr>
      <tr><td>Césium</td><td>1,9</td></tr>
      <tr><td>Sodium</td><td>2,3</td></tr>
      <tr><td>Zinc</td><td>4,3</td></tr>
      <tr><td>Platine</td><td>5,6</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une lumière de fréquence $\\nu = 7{,}0\\times10^{14}$ Hz éclaire une plaque de sodium ($W=2{,}3$ eV, $h=4{,}136\\times10^{-15}$ eV·s). Y a-t-il émission photoélectrique, et si oui avec quelle énergie cinétique maximale ?</p>
      <p><strong>Solution :</strong> $E_{photon} = h\\nu = 4{,}136\\times10^{-15}\\times7{,}0\\times10^{14} \\approx 2{,}9$ eV. Comme $2{,}9 > 2{,}3$ eV, il y a émission. $E_{c,max} = 2{,}9 - 2{,}3 = 0{,}6$ eV.</p>
      <p class="example-answer">Réponse : émission photoélectrique, avec $E_{c,max}\\approx 0{,}6$ eV.</p>
    </div>

    <h3>3. Les spectres de raies atomiques</h3>
    <p>Un troisième mystère : les atomes n'émettent ou n'absorbent la lumière qu'à des <strong>fréquences bien précises</strong> (spectres de raies), et non de façon continue comme le prévoit la théorie classique d'un électron accéléré autour du noyau (qui devrait rayonner en continu et s'effondrer sur le noyau en une fraction de seconde !). Ce paradoxe sera résolu par le modèle de Bohr (1913), qui postule que l'énergie de l'électron dans l'atome est <strong>quantifiée</strong> : $E_n = -13{,}6/n^2$ eV pour l'hydrogène, avec $n$ entier positif. Les transitions entre niveaux, $\\Delta E = h\\nu$, expliquent exactement les raies observées.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <line x1="10" y1="60" x2="110" y2="60" stroke="#122043" stroke-width="1"/>
          <line x1="10" y1="60" x2="10" y2="6" stroke="#122043" stroke-width="1"/>
          <path d="M10,58 C 30,55 45,20 65,10" stroke="#F0555C" stroke-width="1.6" fill="none"/>
          <path d="M10,58 C 30,54 55,42 110,8" stroke="#3D6BF0" stroke-width="1.6" fill="none" stroke-dasharray="3 2"/>
          <text x="70" y="8" font-size="6" fill="#F0555C">Planck (mesure)</text>
          <text x="60" y="20" font-size="6" fill="#3D6BF0">Rayleigh-Jeans</text>
        </svg>
        <span>La loi classique de Rayleigh-Jeans diverge aux courtes longueurs d'onde ; la loi de Planck, quantifiée, s'accorde avec la mesure.</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 120 70" width="100%">
          <line x1="20" y1="10" x2="20" y2="60" stroke="#122043" stroke-width="1.4"/>
          <line x1="20" y1="45" x2="60" y2="45" stroke="#122043" stroke-width="1"/>
          <line x1="20" y1="25" x2="60" y2="25" stroke="#122043" stroke-width="1"/>
          <line x1="20" y1="12" x2="60" y2="12" stroke="#122043" stroke-width="1"/>
          <line x1="40" y1="25" x2="40" y2="45" stroke="#E8A93A" stroke-width="1.6" marker-end="url(#arrow)"/>
          <text x="65" y="47" font-size="6">n=1</text>
          <text x="65" y="27" font-size="6">n=2</text>
          <text x="65" y="14" font-size="6">n=3</text>
        </svg>
        <span>Niveaux d'énergie quantifiés de l'atome : une transition entre deux niveaux émet ou absorbe un photon d'énergie ΔE = hν.</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Planck (1900) : les échanges d'énergie rayonnement-matière sont quantifiés, $E=h\\nu$</li>
        <li>Einstein (1905) : la lumière est constituée de photons d'énergie $h\\nu$ ; effet photoélectrique : $E_{c,max}=h\\nu-W$</li>
        <li>L'émission photoélectrique dépend de la fréquence (seuil), pas de l'intensité — inexplicable classiquement</li>
        <li>Les spectres de raies atomiques révèlent une quantification de l'énergie des électrons dans l'atome</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'augmenter l'intensité lumineuse sous le seuil de fréquence finit par arracher des électrons — c'est faux, seule la fréquence compte</li>
        <li>Confondre l'énergie du photon $h\\nu$ avec l'énergie cinétique de l'électron éjecté $E_{c,max}=h\\nu-W$</li>
        <li>Penser que la quantification de Planck a été acceptée immédiatement — elle fut d'abord perçue comme un simple artifice mathématique</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — effet photoélectrique</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre la fréquence de la lumière incidente et le travail d'extraction du métal pour savoir si des électrons sont éjectés.</p>
      <div class="sim-controls">
        <label>Fréquence ν (×10¹⁴ Hz) : <input type="number" id="quantNu" value="7.0" step="0.1" style="width:70px;" oninput="updateQuantPhoto()"></label>
        <label>Travail d'extraction W (eV) : <input type="number" id="quantW" value="2.3" step="0.1" style="width:70px;" oninput="updateQuantPhoto()"></label>
        <div class="sim-readout" id="quantPhotoReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'hypothèse de Planck postule que les échanges d'énergie entre matière et rayonnement se font :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant1e1" value="wrong"> de façon continue, comme le prévoit l'électromagnétisme classique</label>
          <label class="option"><input type="radio" name="quant1e1" value="right"> par quanta discrets d'énergie E = hν</label>
          <label class="option"><input type="radio" name="quant1e1" value="wrong"> uniquement à température nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant1e1','quant1fb1','Correct — Planck introduit la quantification E=hν pour résoudre la catastrophe ultraviolette.','La théorie classique (continue) prédit une divergence infinie : c\\'est justement ce que Planck corrige.')">Vérifier</button>
        <div class="feedback" id="quant1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans l'effet photoélectrique, si on augmente l'intensité lumineuse sans changer sa fréquence (fréquence sous le seuil) :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant1e2" value="wrong"> des électrons finissent par être éjectés avec plus d'énergie</label>
          <label class="option"><input type="radio" name="quant1e2" value="right"> aucun électron n'est éjecté, quelle que soit l'intensité</label>
          <label class="option"><input type="radio" name="quant1e2" value="wrong"> l'effet devient plus rapide mais avec la même énergie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant1e2','quant1fb2','Correct — sous le seuil de fréquence, chaque photon transporte trop peu d\\'énergie individuellement pour éjecter un électron, quelle que soit l\\'intensité (nombre de photons).','C\\'est l\\'énergie PAR photon (hν) qui compte, pas le nombre total de photons (intensité).')">Vérifier</button>
        <div class="feedback" id="quant1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une lumière de fréquence ν=6,0×10¹⁴ Hz éclaire un métal de travail d'extraction W=2,3 eV (h=4,136×10⁻¹⁵ eV·s). L'énergie cinétique maximale des électrons éjectés est d'environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant1e3" value="wrong"> 2,3 eV</label>
          <label class="option"><input type="radio" name="quant1e3" value="right"> 0,2 eV</label>
          <label class="option"><input type="radio" name="quant1e3" value="wrong"> 4,8 eV</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant1e3','quant1fb3','Correct — E_photon = hν ≈ 2,48 eV ; Ec,max = 2,48 − 2,3 ≈ 0,2 eV.','Calcule d\\'abord E_photon = hν, puis soustrais le travail d\\'extraction W.')">Vérifier</button>
        <div class="feedback" id="quant1fb3"></div>
      </div>
    </div>
  `,
  init: initQuantPhoto
};

QUANT_NOVA_KB[quantKey('La crise de la physique classique : vers la mécanique quantique')] = {
  intro: "Salut, moi c'est Nova ! On démarre le cours de mécanique quantique par sa genèse historique. Demande-moi ce qu'est la catastrophe ultraviolette, comment fonctionne l'effet photoélectrique, ou un indice sur un exercice.",
  rules: [
    { test:/catastrophe ultraviolette|corps noir/i, replies:["La théorie classique du rayonnement du corps noir prédit une énergie infinie aux courtes longueurs d'onde — la « catastrophe ultraviolette ». Planck la résout en quantifiant les échanges d'énergie : E=hν."] },
    { test:/planck|quantum|quanta/i, replies:["Planck (1900) postule que l'énergie s'échange par paquets discrets, E=hν, avec h=6,626×10⁻³⁴ J·s — le premier acte fondateur de la mécanique quantique."] },
    { test:/photo[ée]lectrique/i, replies:["Dans l'effet photoélectrique, un électron absorbe un photon entier : s'il a assez d'énergie (hν > W), il est éjecté avec Ec,max = hν − W. En dessous du seuil, rien ne se passe, quelle que soit l'intensité."] },
    { test:/travail d'extraction|\bw\b/i, replies:["Le travail d'extraction W est l'énergie minimale nécessaire pour arracher un électron du métal. Il varie selon le métal (ex. ≈1,9 eV pour le césium, ≈4,3 eV pour le zinc)."] },
    { test:/photon|einstein/i, replies:["Einstein (1905) propose que la lumière est constituée de photons, des grains d'énergie hν, pour expliquer l'effet photoélectrique — cette idée lui vaudra le prix Nobel de physique."] },
    { test:/spectre|raies|bohr/i, replies:["Les spectres de raies atomiques montrent que l'énergie des électrons dans l'atome est quantifiée : E_n=-13,6/n² eV pour l'hydrogène (modèle de Bohr, 1913)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que propose Planck pour éviter la divergence infinie ?","Indice niveau 2 : des échanges d'énergie discrets, pas continus.","Indice niveau 3 : E=hν, la quantification."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : l'intensité change-t-elle l'énergie de CHAQUE photon ?","Indice niveau 2 : non, elle change seulement leur NOMBRE.","Indice niveau 3 : sous le seuil, aucun photon individuel n'a assez d'énergie — rien n'est éjecté."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : calcule d'abord E_photon = hν.","Indice niveau 2 : E_photon = 4,136e-15 × 6,0e14 ≈ 2,48 eV.","Indice niveau 3 : Ec,max = 2,48 − 2,3 ≈ 0,2 eV."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Calculateur de la longueur d'onde de De Broglie (Chapitre 2)
--------------------------------------------------------------------------------- */
const QUANT_H = 6.626e-34; /* J.s */
function updateQuantDeBroglie(){
  const m = parseFloat(document.getElementById('quantMasse').value) || 1e-31; /* kg */
  const v = parseFloat(document.getElementById('quantVitesse').value) || 1; /* m/s */
  const p = m * v;
  const lambda = QUANT_H / p;
  document.getElementById('quantDBReadout').innerHTML =
    `Quantité de mouvement : $p=mv=${p.toExponential(3)}$ kg·m/s<br>` +
    `Longueur d'onde de De Broglie : $\\lambda=h/p=${lambda.toExponential(3)}$ m`;
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([document.getElementById('quantDBReadout')]); }
}
function initQuantDeBroglie(){ updateQuantDeBroglie(); }

/* =========================== CHAPITRE 2 — Dualité onde-corpuscule =========================== */
QUANT_CHAPTERS[quantKey('Dualité onde-corpuscule, longueur d\'onde de De Broglie et principe d\'incertitude')] = {
  objectives: [
    "Énoncer l'hypothèse de De Broglie et calculer la longueur d'onde associée à une particule matérielle",
    "Décrire l'expérience des fentes de Young avec des électrons et son interprétation en termes de dualité onde-corpuscule",
    "Énoncer qualitativement le principe d'incertitude de Heisenberg et en donner un exemple numérique",
    "Expliquer pourquoi les effets quantiques sont indétectables à l'échelle macroscopique"
  ],
  prereqs: ["La crise de la physique classique (chapitre précédent)"],
  bodyHtml: `
    <p>Le chapitre précédent a montré que la lumière, considérée depuis Maxwell comme une onde, se comporte aussi comme un flux de particules (photons). En 1924, le physicien français <strong>Louis de Broglie</strong> propose l'idée inverse, tout aussi audacieuse : la matière elle-même pourrait présenter un comportement ondulatoire.</p>

    <h3>1. L'hypothèse de De Broglie</h3>
    <p>De Broglie postule qu'à toute particule de quantité de mouvement $p=mv$ est associée une onde, dite <strong>onde de matière</strong>, de longueur d'onde :</p>
    <div class="formula-box">$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$</div>
    <p>Cette relation, vérifiée expérimentalement dès 1927 (diffraction d'électrons par un cristal, Davisson et Germer), sera généralisée avec succès à toutes les particules — électrons, neutrons, atomes, et même à des molécules complexes lors d'expériences plus récentes.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer la longueur d'onde de De Broglie d'un électron ($m_e = 9{,}11\\times10^{-31}$ kg) accéléré à la vitesse $v=1{,}0\\times10^6$ m/s, puis celle d'une balle de tennis ($m=0{,}057$ kg) lancée à $30$ m/s.</p>
      <p><strong>Solution :</strong> pour l'électron, $p=mv=9{,}11\\times10^{-25}$ kg·m/s, donc $\\lambda=\\dfrac{6{,}626\\times10^{-34}}{9{,}11\\times10^{-25}}\\approx 7{,}3\\times10^{-10}$ m (soit 0,73 nm — comparable à la taille d'un atome, donc observable par diffraction). Pour la balle de tennis, $p=1{,}71$ kg·m/s, donc $\\lambda\\approx 3{,}9\\times10^{-34}$ m — totalement indétectable.</p>
      <p class="example-answer">Réponse : λ_électron ≈ 0,73 nm (mesurable) ; λ_balle ≈ 4×10⁻³⁴ m (indécelable).</p>
    </div>
    <div class="key-point">
      <span class="eyebrow">Pourquoi ne voit-on jamais d'effets quantiques à notre échelle ?</span>
      La constante de Planck $h$ est extrêmement petite ($6{,}626\\times10^{-34}$ J·s). Pour un objet macroscopique, dont la quantité de mouvement $p=mv$ est immense en comparaison, la longueur d'onde associée est ridiculement faible — bien plus petite que n'importe quelle dimension observable. C'est seulement pour des particules très légères (électrons, atomes) que $\\lambda$ devient comparable aux distances interatomiques et produit des effets mesurables comme la diffraction.
    </div>

    <h3>2. L'expérience des fentes de Young avec des électrons</h3>
    <p>L'expérience de pensée (aujourd'hui réalisée en laboratoire) la plus emblématique de la dualité onde-corpuscule consiste à envoyer des électrons, un par un, à travers deux fentes fines. Si l'on ne cherche pas à savoir par quelle fente passe chaque électron, on observe, après accumulation d'un grand nombre d'impacts sur un écran, une <strong>figure d'interférence</strong> typique d'une onde — alors même que chaque électron est détecté comme un impact ponctuel, une particule ! Si en revanche on place un détecteur pour observer par quelle fente passe l'électron, la figure d'interférence disparaît : le simple fait de mesurer le chemin détruit le comportement ondulatoire. Cette expérience illustre de façon saisissante que la nature quantique n'est ni purement ondulatoire ni purement corpusculaire : elle échappe aux catégories de la physique classique.</p>

    <h3>3. Le principe d'incertitude de Heisenberg</h3>
    <p>En 1927, Werner Heisenberg formule un principe fondamental, conséquence directe de la nature ondulatoire de la matière : il est impossible de connaître <strong>simultanément et avec une précision arbitraire</strong> la position $x$ et la quantité de mouvement $p$ d'une particule. Plus précisément, les incertitudes $\\Delta x$ et $\\Delta p$ sur ces deux grandeurs vérifient :</p>
    <div class="formula-box">$$\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$$</div>
    <p>où $\\hbar = h/2\\pi \\approx 1{,}055\\times10^{-34}$ J·s. Ce n'est pas une limitation de nos instruments de mesure : c'est une propriété intrinsèque de la nature. Réduire l'incertitude sur la position d'une particule (la « localiser » davantage) augmente nécessairement l'incertitude sur sa quantité de mouvement, et réciproquement. Nous reviendrons sur l'origine formelle de cette relation au chapitre consacré aux opérateurs et aux postulats de la mesure.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Hypothèse de De Broglie : à toute particule de quantité de mouvement p est associée une onde $\\lambda=h/p$</li>
        <li>Les effets ondulatoires ne sont mesurables que pour des particules très légères (électrons, atomes), pas à l'échelle macroscopique</li>
        <li>L'expérience des fentes de Young avec des électrons montre que mesurer le chemin détruit la figure d'interférence</li>
        <li>Principe d'incertitude de Heisenberg : $\\Delta x \\cdot \\Delta p \\geq \\hbar/2$, une limite fondamentale de la nature, pas de l'instrument</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le principe d'incertitude vient d'un manque de précision des appareils de mesure — c'est une propriété fondamentale de la nature</li>
        <li>Penser qu'un objet macroscopique n'a pas de longueur d'onde de De Broglie — il en a une, mais bien trop petite pour être observable</li>
        <li>Oublier que la figure d'interférence électronique disparaît dès qu'on observe le chemin emprunté par la particule</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — longueur d'onde de De Broglie</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre la masse et la vitesse d'une particule pour calculer sa longueur d'onde associée.</p>
      <div class="sim-controls">
        <label>Masse (kg) : <input type="text" id="quantMasse" value="9.11e-31" style="width:100px;" oninput="updateQuantDeBroglie()"></label>
        <label>Vitesse (m/s) : <input type="text" id="quantVitesse" value="1e6" style="width:90px;" oninput="updateQuantDeBroglie()"></label>
        <div class="sim-readout" id="quantDBReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La longueur d'onde de De Broglie d'une particule est donnée par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant2e1" value="wrong"> $\\lambda = h \\cdot m \\cdot v$</label>
          <label class="option"><input type="radio" name="quant2e1" value="right"> $\\lambda = h / (mv)$</label>
          <label class="option"><input type="radio" name="quant2e1" value="wrong"> $\\lambda = mv / h$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant2e1','quant2fb1','Correct — λ = h/p = h/(mv).','La relation est λ = h/p, où p = mv est la quantité de mouvement.')">Vérifier</button>
        <div class="feedback" id="quant2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans l'expérience des fentes de Young avec des électrons, si l'on place un détecteur pour savoir par quelle fente passe chaque électron :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant2e2" value="wrong"> la figure d'interférence devient encore plus nette</label>
          <label class="option"><input type="radio" name="quant2e2" value="right"> la figure d'interférence disparaît</label>
          <label class="option"><input type="radio" name="quant2e2" value="wrong"> rien ne change, la mesure n'a pas d'effet</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant2e2','quant2fb2','Correct — mesurer le chemin détruit le comportement ondulatoire : c\\'est l\\'une des illustrations les plus frappantes de la dualité onde-corpuscule.','L\\'acte de mesure perturbe le système quantique de façon fondamentale, pas juste techniquement.')">Vérifier</button>
        <div class="feedback" id="quant2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le principe d'incertitude de Heisenberg $\\Delta x \\cdot \\Delta p \\geq \\hbar/2$ signifie que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant2e3" value="wrong"> nos instruments de mesure ne sont pas encore assez précis</label>
          <label class="option"><input type="radio" name="quant2e3" value="right"> position et quantité de mouvement ne peuvent pas être connues simultanément avec une précision arbitraire, quelle que soit la qualité de l'instrument</label>
          <label class="option"><input type="radio" name="quant2e3" value="wrong"> seule la position d'une particule peut être mesurée, jamais sa vitesse</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant2e3','quant2fb3','Correct — c\\'est une limite fondamentale de la nature, pas une limite technologique.','Ce n\\'est pas un problème d\\'instrument : c\\'est une propriété intrinsèque des systèmes quantiques.')">Vérifier</button>
        <div class="feedback" id="quant2fb3"></div>
      </div>
    </div>
  `,
  init: initQuantDeBroglie
};

QUANT_NOVA_KB[quantKey('Dualité onde-corpuscule, longueur d\'onde de De Broglie et principe d\'incertitude')] = {
  intro: "Salut, moi c'est Nova ! On est sur la dualité onde-corpuscule. Demande-moi comment calculer une longueur d'onde de De Broglie, pourquoi l'expérience des fentes de Young est si surprenante avec des électrons, ou un indice sur un exercice.",
  rules: [
    { test:/de broglie|onde de mati[èe]re/i, replies:["De Broglie propose qu'à toute particule de quantité de mouvement p=mv est associée une onde de longueur d'onde λ=h/p. Vérifié expérimentalement par diffraction d'électrons dès 1927."] },
    { test:/fentes de young|interf[ée]rence/i, replies:["Envoyés un par un à travers deux fentes, les électrons forment une figure d'interférence typique d'une onde — mais dès qu'on mesure par quelle fente ils passent, cette figure disparaît !"] },
    { test:/heisenberg|incertitude/i, replies:["Le principe d'incertitude de Heisenberg, Δx·Δp ≥ ħ/2, est une limite fondamentale de la nature : on ne peut pas connaître simultanément et précisément position et quantité de mouvement."] },
    { test:/macroscopique|balle de tennis|pourquoi.*voit/i, replies:["h est extrêmement petit : pour un objet macroscopique, p=mv est énorme en comparaison, donc λ=h/p est ridiculement faible — indétectable. Seules les particules très légères (électrons, atomes) ont un λ mesurable."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : rappelle-toi que λ dépend de la quantité de mouvement p=mv.","Indice niveau 2 : λ est proportionnel à h et inversement proportionnel à p.","Indice niveau 3 : λ = h/(mv)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : que se passe-t-il quand on essaie de savoir par où passe l'électron ?","Indice niveau 2 : l'acte de mesure perturbe fondamentalement le système.","Indice niveau 3 : la figure d'interférence disparaît."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : est-ce un problème d'instrument ou une propriété de la nature ?","Indice niveau 2 : c'est une propriété fondamentale, indépendante de la qualité de l'instrument.","Indice niveau 3 : position et quantité de mouvement ne peuvent jamais être connues simultanément avec une précision arbitraire."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Calculateur de constante de normalisation (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateQuantNorm(){
  const L = parseFloat(document.getElementById('quantL').value) || 1;
  const A = Math.sqrt(1/L);
  document.getElementById('quantNormReadout').innerHTML =
    `Condition de normalisation : $\\displaystyle\\int_0^{L} |A|^2\\,dx = A^2 L = 1$<br>` +
    `Constante de normalisation : $A=\\sqrt{1/L}=\\sqrt{1/${L}}\\approx ${A.toFixed(4)}$ (en unités de m⁻¹ᐟ²)`;
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([document.getElementById('quantNormReadout')]); }
}
function initQuantNorm(){ updateQuantNorm(); }

/* =========================== CHAPITRE 3 — La fonction d'onde et l'équation de Schrödinger =========================== */
QUANT_CHAPTERS[quantKey('La fonction d\'onde et l\'équation de Schrödinger')] = {
  objectives: [
    "Énoncer l'interprétation probabiliste de Born de la fonction d'onde",
    "Écrire la condition de normalisation d'une fonction d'onde et l'appliquer sur un exemple simple",
    "Écrire l'équation de Schrödinger dépendante du temps et sa version stationnaire (indépendante du temps)",
    "Distinguer état stationnaire et évolution temporelle générale d'un système quantique"
  ],
  prereqs: ["Dualité onde-corpuscule, longueur d'onde de De Broglie et principe d'incertitude"],
  bodyHtml: `
    <p>Si une particule est associée à une onde (chapitre 2), il faut une grandeur mathématique pour décrire cette onde, et une équation pour prédire son évolution. Ce sont respectivement la <strong>fonction d'onde</strong> et l'<strong>équation de Schrödinger</strong>, formulée par Erwin Schrödinger en 1926 — le cœur mathématique de toute la mécanique quantique non relativiste.</p>

    <h3>1. La fonction d'onde et son interprétation probabiliste</h3>
    <p>L'état d'une particule quantique (en une dimension, pour simplifier) est entièrement décrit par une fonction complexe $\\Psi(x,t)$, appelée <strong>fonction d'onde</strong>. En 1926, Max Born propose l'interprétation qui reste aujourd'hui celle de référence : le module au carré de la fonction d'onde donne la <strong>densité de probabilité de présence</strong> de la particule :</p>
    <div class="formula-box">$$dP(x,t) = |\\Psi(x,t)|^2\\,dx$$</div>
    <p>où $dP(x,t)$ est la probabilité de trouver la particule entre $x$ et $x+dx$ à l'instant $t$. Cette interprétation est profondément différente de la physique classique : la mécanique quantique ne prédit pas la trajectoire d'une particule, mais seulement la <strong>probabilité</strong> de la trouver à tel ou tel endroit lors d'une mesure.</p>
    <div class="key-point">
      <span class="eyebrow">La condition de normalisation</span>
      Puisque la particule doit se trouver <em>quelque part</em>, la somme de toutes les probabilités sur tout l'espace doit valoir 1 :
      $$\\int_{-\\infty}^{+\\infty} |\\Psi(x,t)|^2\\,dx = 1$$
      Une fonction d'onde qui vérifie cette condition est dite <strong>normée</strong>. C'est une contrainte physique essentielle : toute fonction d'onde acceptable doit pouvoir être normalisée (elle doit donc tendre vers zéro suffisamment vite aux grandes distances, ou être définie sur un domaine borné).
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une particule est décrite par une fonction d'onde constante $\\Psi(x)=A$ sur l'intervalle $[0,L]$, et nulle ailleurs. Déterminer la constante de normalisation $A$ (réelle et positive).</p>
      <p><strong>Solution :</strong> la condition de normalisation s'écrit $\\displaystyle\\int_0^{L}|A|^2\\,dx = A^2 L = 1$, d'où $A=\\sqrt{1/L}$.</p>
      <p class="example-answer">Réponse : $A=\\sqrt{1/L}$.</p>
    </div>

    <h3>2. L'équation de Schrödinger dépendante du temps</h3>
    <p>L'évolution temporelle de la fonction d'onde $\\Psi(x,t)$ est régie par l'équation de Schrödinger dépendante du temps :</p>
    <div class="formula-box">$$i\\hbar \\frac{\\partial \\Psi(x,t)}{\\partial t} = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2 \\Psi(x,t)}{\\partial x^2} + V(x,t)\\,\\Psi(x,t)$$</div>
    <p>C'est l'équation fondamentale de la mécanique quantique : elle joue, pour l'évolution d'un état quantique, un rôle analogue à celui de la relation fondamentale de la dynamique $\\vec{F}=m\\vec{a}$ en mécanique classique. Elle ne se démontre pas à partir de principes plus fondamentaux : c'est un postulat de la théorie, validé a posteriori par l'accord remarquable de ses prédictions avec l'expérience.</p>

    <h3>3. L'équation de Schrödinger stationnaire</h3>
    <p>Lorsque le potentiel $V(x)$ ne dépend pas du temps, on peut chercher des solutions particulières, dites <strong>états stationnaires</strong>, de la forme $\\Psi(x,t)=\\psi(x)\\,e^{-iEt/\\hbar}$, où $E$ est l'énergie de la particule dans cet état. En injectant cette forme dans l'équation de Schrödinger, le temps se factorise et l'on obtient l'<strong>équation de Schrödinger indépendante du temps</strong> (ou stationnaire) :</p>
    <div class="formula-box">$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi(x)}{dx^2} + V(x)\\,\\psi(x) = E\\,\\psi(x)$$</div>
    <div class="key-point">
      <span class="eyebrow">Pourquoi « stationnaire » ?</span>
      Bien que la fonction d'onde complète $\\Psi(x,t)=\\psi(x)e^{-iEt/\\hbar}$ oscille dans le temps, la <strong>densité de probabilité</strong> $|\\Psi(x,t)|^2 = |\\psi(x)|^2$ ne dépend pas du temps : la répartition spatiale de la particule est figée. C'est pour cette raison que ces solutions sont dites états stationnaires — ce sont elles que l'on va résoudre explicitement dans les deux chapitres suivants (puits de potentiel infini, barrière tunnel), et l'énergie $E$ qui apparaît dans cette équation sera systématiquement <strong>quantifiée</strong> pour un système lié, comme on le verra concrètement au chapitre 4.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Interprétation de Born : $|\\Psi(x,t)|^2$ est une densité de probabilité de présence</li>
        <li>Condition de normalisation : $\\int|\\Psi|^2 dx = 1$ sur tout l'espace</li>
        <li>Équation de Schrödinger dépendante du temps : postulat fondamental régissant l'évolution de Ψ</li>
        <li>Pour un potentiel indépendant du temps, on cherche des états stationnaires $\\Psi=\\psi(x)e^{-iEt/\\hbar}$, solutions de l'équation stationnaire</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre $\\Psi(x,t)$ (fonction d'onde, complexe) et $|\\Psi(x,t)|^2$ (densité de probabilité, réelle et positive)</li>
        <li>Oublier la condition de normalisation lors de la détermination d'une constante dans une fonction d'onde</li>
        <li>Croire qu'un état stationnaire signifie que la fonction d'onde elle-même ne change pas dans le temps — seule la densité de probabilité $|\\Psi|^2$ est constante</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — constante de normalisation</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Pour une fonction d'onde constante ψ(x)=A sur [0,L], calcule la constante de normalisation A en fonction de L.</p>
      <div class="sim-controls">
        <label>Longueur L (m) : <input type="number" id="quantL" value="1e-9" step="any" style="width:100px;" oninput="updateQuantNorm()"></label>
        <div class="sim-readout" id="quantNormReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Selon l'interprétation de Born, la grandeur $|\\Psi(x,t)|^2$ représente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant3e1" value="wrong"> l'énergie de la particule</label>
          <label class="option"><input type="radio" name="quant3e1" value="right"> une densité de probabilité de présence de la particule</label>
          <label class="option"><input type="radio" name="quant3e1" value="wrong"> la vitesse de la particule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant3e1','quant3fb1','Correct — c\\'est l\\'interprétation de Born (1926), aujourd\\'hui l\\'interprétation standard de la fonction d\\'onde.','Repense à ce que dP(x,t) = |Ψ(x,t)|² dx représente physiquement.')">Vérifier</button>
        <div class="feedback" id="quant3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La condition de normalisation d'une fonction d'onde s'écrit :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant3e2" value="right"> $\\int_{-\\infty}^{+\\infty}|\\Psi(x,t)|^2\\,dx = 1$</label>
          <label class="option"><input type="radio" name="quant3e2" value="wrong"> $\\int_{-\\infty}^{+\\infty}\\Psi(x,t)\\,dx = 1$</label>
          <label class="option"><input type="radio" name="quant3e2" value="wrong"> $\\Psi(x,t) = 1$ pour tout x et t</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant3e2','quant3fb2','Correct — la somme des probabilités sur tout l\\'espace doit valoir 1, d\\'où la normalisation du MODULE AU CARRÉ de Ψ.','Attention, c\\'est le module au carré |Ψ|², pas Ψ elle-même, qui doit être intégré.')">Vérifier</button>
        <div class="feedback" id="quant3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans un état stationnaire $\\Psi(x,t)=\\psi(x)e^{-iEt/\\hbar}$, quelle grandeur est réellement indépendante du temps ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant3e3" value="wrong"> la fonction d'onde complète Ψ(x,t)</label>
          <label class="option"><input type="radio" name="quant3e3" value="right"> la densité de probabilité |Ψ(x,t)|²</label>
          <label class="option"><input type="radio" name="quant3e3" value="wrong"> rien n'est indépendant du temps dans un état stationnaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant3e3','quant3fb3','Correct — le facteur de phase e^(-iEt/ħ) a un module 1, donc |Ψ|²=|ψ(x)|² ne dépend pas du temps, même si Ψ elle-même oscille.','La fonction d\\'onde complète oscille dans le temps ; c\\'est seulement son module au carré qui reste constant.')">Vérifier</button>
        <div class="feedback" id="quant3fb3"></div>
      </div>
    </div>
  `,
  init: initQuantNorm
};

QUANT_NOVA_KB[quantKey('La fonction d\'onde et l\'équation de Schrödinger')] = {
  intro: "Salut, moi c'est Nova ! On est sur la fonction d'onde et l'équation de Schrödinger. Demande-moi ce que représente |Ψ|², comment normaliser une fonction d'onde, ou un indice sur un exercice.",
  rules: [
    { test:/interpr[ée]tation.*born|densit[ée] de probabilit[ée]/i, replies:["L'interprétation de Born dit que |Ψ(x,t)|² est une densité de probabilité de présence : dP(x,t) = |Ψ(x,t)|² dx."] },
    { test:/normalisation|norm[ée]e/i, replies:["La condition de normalisation ∫|Ψ|²dx = 1 sur tout l'espace exprime que la particule se trouve forcément quelque part."] },
    { test:/[ée]quation de schr[öo]dinger/i, replies:["L'équation de Schrödinger dépendante du temps, iħ∂Ψ/∂t = -ħ²/2m ∂²Ψ/∂x² + VΨ, est le postulat fondamental qui régit l'évolution de la fonction d'onde."] },
    { test:/[ée]tat stationnaire/i, replies:["Un état stationnaire s'écrit Ψ(x,t)=ψ(x)e^(-iEt/ħ). Sa densité de probabilité |Ψ|²=|ψ(x)|² ne dépend pas du temps, même si Ψ elle-même oscille."] },
    { test:/[ée]quation.*stationnaire|ind[ée]pendante du temps/i, replies:["L'équation de Schrödinger stationnaire, -ħ²/2m d²ψ/dx² + Vψ = Eψ, s'obtient en injectant la forme Ψ=ψ(x)e^(-iEt/ħ) dans l'équation dépendante du temps."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que représente physiquement dP(x,t)=|Ψ|²dx ?","Indice niveau 2 : une probabilité.","Indice niveau 3 : |Ψ|² est donc une densité de probabilité de présence."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : c'est le MODULE AU CARRÉ de Ψ qu'on intègre, pas Ψ elle-même.","Indice niveau 2 : ∫|Ψ|²dx sur tout l'espace.","Indice niveau 3 : cette intégrale doit valoir 1."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le facteur e^(-iEt/ħ) a-t-il un module constant ?","Indice niveau 2 : oui, son module vaut toujours 1.","Indice niveau 3 : donc |Ψ|²=|ψ(x)|², indépendant du temps."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 4 — Calculateur des niveaux d'énergie du puits infini (Chapitre 4)
--------------------------------------------------------------------------------- */
const QUANT_HBAR = 1.0546e-34;
const QUANT_ME = 9.109e-31;
const QUANT_EV = 1.602e-19;
function updateQuantPuits(){
  const n = Math.max(1, parseInt(document.getElementById('quantN').value) || 1);
  const L = parseFloat(document.getElementById('quantLpuits').value) || 1e-9;
  const E = (n*n * QUANT_H * QUANT_H) / (8 * QUANT_ME * L * L);
  const EeV = E / QUANT_EV;
  document.getElementById('quantPuitsReadout').innerHTML =
    `$E_n = \\dfrac{n^2h^2}{8mL^2} = \\dfrac{${n}^2 \\times h^2}{8\\,m_e\\,(${L.toExponential(2)})^2}$<br>` +
    `Énergie du niveau n=${n} (pour un électron) : <strong>${EeV.toFixed(3)} eV</strong> (${E.toExponential(3)} J)`;
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([document.getElementById('quantPuitsReadout')]); }
}
function initQuantPuits(){ updateQuantPuits(); }

/* =========================== CHAPITRE 4 — Particule dans un puits de potentiel infini =========================== */
QUANT_CHAPTERS[quantKey('Particule dans un puits de potentiel infini')] = {
  objectives: [
    "Poser et résoudre l'équation de Schrödinger stationnaire pour une particule dans un puits de potentiel infini",
    "Établir l'expression quantifiée des niveaux d'énergie $E_n = n^2h^2/8mL^2$",
    "Décrire les fonctions d'onde et densités de probabilité associées aux premiers niveaux",
    "Discuter la limite classique du modèle pour de grands nombres quantiques n"
  ],
  prereqs: ["La fonction d'onde et l'équation de Schrödinger"],
  bodyHtml: `
    <p>Le <strong>puits de potentiel infini</strong> (ou « boîte quantique » à une dimension) est le système le plus simple que l'on puisse résoudre exactement en mécanique quantique. Malgré son caractère idéalisé, il illustre parfaitement le phénomène central de la théorie : la <strong>quantification de l'énergie</strong> d'une particule confinée.</p>

    <h3>1. Position du problème</h3>
    <p>On considère une particule de masse $m$ astreinte à se déplacer entre $x=0$ et $x=L$, où le potentiel est nul, mais totalement interdite d'en sortir (potentiel infini pour $x<0$ et $x>L$) :</p>
    <div class="formula-box">$$V(x) = \\begin{cases} 0 & \\text{si } 0 \\leq x \\leq L \\\\ +\\infty & \\text{sinon} \\end{cases}$$</div>
    <p>Un potentiel infini impose que la fonction d'onde soit rigoureusement nulle en dehors du puits (une probabilité de présence non nulle y coûterait une énergie infinie). Par continuité, elle doit donc s'annuler aux deux bords : $\\psi(0)=0$ et $\\psi(L)=0$.</p>

    <h3>2. Résolution de l'équation de Schrödinger stationnaire</h3>
    <p>À l'intérieur du puits ($V=0$), l'équation stationnaire du chapitre précédent devient :</p>
    <div class="formula-box">$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi(x)}{dx^2} = E\\,\\psi(x)$$</div>
    <p>C'est l'équation différentielle d'un oscillateur harmonique spatial, dont la solution générale s'écrit $\\psi(x) = A\\sin(kx) + B\\cos(kx)$, avec $k=\\sqrt{2mE}/\\hbar$. La condition aux limites $\\psi(0)=0$ impose $B=0$. La condition $\\psi(L)=0$ impose alors $\\sin(kL)=0$, donc $kL=n\\pi$ avec $n$ un entier <strong>strictement positif</strong> (n=0 donnerait $\\psi=0$ partout, une particule qui n'existerait pas — inacceptable).</p>
    <div class="key-point">
      <span class="eyebrow">La quantification apparaît naturellement</span>
      La condition aux limites $kL=n\\pi$ ne laisse subsister que des valeurs discrètes de $k$, donc d'énergie. En substituant $k=n\\pi/L$ dans $E=\\hbar^2k^2/2m$, on obtient l'énergie quantifiée du niveau $n$ :
      $$E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2} = \\frac{n^2h^2}{8mL^2}, \\qquad n=1,2,3,\\dots$$
      C'est un résultat profondément différent de la physique classique, où une particule confinée dans une boîte pourrait avoir n'importe quelle énergie : ici, seules certaines énergies discrètes sont permises — exactement comme les niveaux d'énergie observés dans les atomes (chapitre 1).
    </div>
    <p>Après normalisation ($\\int_0^L|\\psi_n(x)|^2dx=1$), les fonctions d'onde stationnaires s'écrivent :</p>
    <div class="formula-box">$$\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)$$</div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer l'énergie du niveau fondamental ($n=1$) d'un électron confiné dans une boîte de largeur $L=1{,}0$ nm ($m_e=9{,}11\\times10^{-31}$ kg, $h=6{,}626\\times10^{-34}$ J·s).</p>
      <p><strong>Solution :</strong> $E_1 = \\dfrac{1^2\\times(6{,}626\\times10^{-34})^2}{8\\times9{,}11\\times10^{-31}\\times(1{,}0\\times10^{-9})^2} \\approx 6{,}0\\times10^{-20}$ J $\\approx 0{,}38$ eV.</p>
      <p class="example-answer">Réponse : $E_1 \\approx 0{,}38$ eV — une énergie mesurable, du même ordre que les énergies de liaison chimiques.</p>
    </div>

    <h3>3. La limite classique</h3>
    <p>Pour de très grands nombres quantiques $n$, les niveaux d'énergie successifs deviennent extrêmement rapprochés (l'écart $E_{n+1}-E_n$ croît avec $n$, mais reste négligeable devant $E_n$ lui-même) : le spectre discret finit par « ressembler » à un continuum classique. C'est une première illustration du <strong>principe de correspondance</strong> de Bohr : la mécanique quantique doit redonner les résultats de la mécanique classique dans la limite des grands nombres quantiques.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Le confinement d'une particule (conditions aux limites $\\psi(0)=\\psi(L)=0$) impose naturellement la quantification de l'énergie</li>
        <li>Niveaux d'énergie du puits infini : $E_n = n^2h^2/8mL^2$, avec $n=1,2,3,\\dots$ (n=0 exclu)</li>
        <li>Fonctions d'onde : $\\psi_n(x)=\\sqrt{2/L}\\sin(n\\pi x/L)$</li>
        <li>Pour de grands n, le spectre discret se rapproche du continuum classique (principe de correspondance)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier d'exclure n=0, qui donnerait une fonction d'onde nulle partout (particule inexistante)</li>
        <li>Confondre l'exposant : l'énergie est proportionnelle à $n^2$ (pas à $n$) et inversement proportionnelle à $L^2$ (pas à L)</li>
        <li>Croire qu'une particule classique confinée aurait aussi une énergie quantifiée — c'est un phénomène purement quantique</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — niveaux d'énergie du puits infini</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Calcule l'énergie du niveau n pour un électron confiné dans un puits de largeur L.</p>
      <div class="sim-controls">
        <label>Niveau n : <input type="number" id="quantN" value="1" min="1" style="width:60px;" oninput="updateQuantPuits()"></label>
        <label>Largeur L (m) : <input type="text" id="quantLpuits" value="1e-9" style="width:90px;" oninput="updateQuantPuits()"></label>
        <div class="sim-readout" id="quantPuitsReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pourquoi la valeur n=0 est-elle exclue dans le puits de potentiel infini ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant4e1" value="wrong"> parce que l'énergie serait négative</label>
          <label class="option"><input type="radio" name="quant4e1" value="right"> parce que la fonction d'onde serait nulle partout, ce qui signifierait l'absence de particule</label>
          <label class="option"><input type="radio" name="quant4e1" value="wrong"> parce que ce n'est pas un entier</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant4e1','quant4fb1','Correct — ψ(x)=0 partout pour n=0 signifierait une probabilité de présence nulle en tout point : la particule n\\'existerait pas.','Repense à ψ_n(x) = √(2/L) sin(nπx/L) : que devient cette fonction si n=0 ?')">Vérifier</button>
        <div class="feedback" id="quant4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si l'on double la largeur L du puits (L → 2L), l'énergie du niveau fondamental E₁ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant4e2" value="wrong"> multipliée par 2</label>
          <label class="option"><input type="radio" name="quant4e2" value="wrong"> divisée par 2</label>
          <label class="option"><input type="radio" name="quant4e2" value="right"> divisée par 4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant4e2','quant4fb2','Correct — E_n ∝ 1/L² ; doubler L divise donc l\\'énergie par 2²=4. Un confinement plus large réduit l\\'énergie du niveau fondamental.','E_n est inversement proportionnelle à L AU CARRÉ, pas simplement à L.')">Vérifier</button>
        <div class="feedback" id="quant4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour de très grands nombres quantiques n, le comportement du puits de potentiel infini :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant4e3" value="wrong"> devient de plus en plus différent de la physique classique</label>
          <label class="option"><input type="radio" name="quant4e3" value="right"> se rapproche du comportement classique (principe de correspondance)</label>
          <label class="option"><input type="radio" name="quant4e3" value="wrong"> devient instable et la particule s'échappe du puits</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant4e3','quant4fb3','Correct — c\\'est le principe de correspondance de Bohr : la mécanique quantique redonne les résultats classiques dans la limite des grands nombres quantiques.','Pense à l\\'écart relatif entre niveaux d\\'énergie consécutifs quand n devient très grand.')">Vérifier</button>
        <div class="feedback" id="quant4fb3"></div>
      </div>
    </div>
  `,
  init: initQuantPuits
};

QUANT_NOVA_KB[quantKey('Particule dans un puits de potentiel infini')] = {
  intro: "Salut, moi c'est Nova ! On est sur le puits de potentiel infini, l'exemple canonique de la quantification. Demande-moi comment on obtient E_n = n²h²/8mL², pourquoi n=0 est exclu, ou un indice sur un exercice.",
  rules: [
    { test:/e_?n|niveaux d'[ée]nergie|formule/i, replies:["Les niveaux d'énergie du puits infini sont E_n = n²h²/8mL², avec n=1,2,3,... L'énergie croît comme le CARRÉ de n et diminue comme 1/L²."] },
    { test:/pourquoi.*n=0|n nul/i, replies:["n=0 donnerait ψ(x)=0 partout : la particule n'existerait nulle part, ce qui est physiquement inacceptable. n commence donc à 1."] },
    { test:/condition.*limite|ψ\\(0\\)|bord/i, replies:["Un potentiel infini hors du puits impose ψ(0)=0 et ψ(L)=0 : la fonction d'onde doit s'annuler aux bords, ce qui sélectionne les valeurs discrètes de k=nπ/L."] },
    { test:/fonction d'onde|ψ_?n/i, replies:["Les fonctions d'onde normalisées sont ψ_n(x)=√(2/L)sin(nπx/L) — des sinusoïdes avec n-1 nœuds à l'intérieur du puits."] },
    { test:/correspondance|limite classique/i, replies:["Pour de grands n, les niveaux d'énergie se rapprochent relativement les uns des autres : le spectre discret ressemble de plus en plus à un continuum classique — le principe de correspondance de Bohr."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que devient ψ_n(x) si n=0 ?","Indice niveau 2 : sin(0)=0 partout.","Indice niveau 3 : la particule n'existerait donc nulle part — n=0 est exclu."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : E_n dépend de L comment exactement ?","Indice niveau 2 : E_n est proportionnelle à 1/L².","Indice niveau 3 : doubler L divise donc E_1 par 4."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au principe de correspondance de Bohr.","Indice niveau 2 : à grand n, l'écart relatif entre niveaux devient négligeable.","Indice niveau 3 : le comportement se rapproche donc du continuum classique."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 5 — Calculateur du coefficient de transmission tunnel (Chapitre 5)
--------------------------------------------------------------------------------- */
function updateQuantTunnel(){
  const dV = parseFloat(document.getElementById('quantDV').value) || 0.1; /* eV, V0-E */
  const a = parseFloat(document.getElementById('quantA').value) || 1; /* nm */
  const dV_J = dV * QUANT_EV;
  const kappa = Math.sqrt(2 * QUANT_ME * dV_J) / QUANT_HBAR; /* m^-1 */
  const a_m = a * 1e-9;
  const T = Math.exp(-2 * kappa * a_m);
  document.getElementById('quantTunnelReadout').innerHTML =
    `$\\kappa = \\sqrt{2m(V_0-E)}/\\hbar \\approx ${kappa.toExponential(3)}$ m⁻¹<br>` +
    `Coefficient de transmission approché : $T \\approx e^{-2\\kappa a} \\approx ${T.toExponential(3)}$<br>` +
    `${T > 1e-3 ? 'Effet tunnel significatif — mesurable expérimentalement.' : 'Effet tunnel extrêmement faible mais jamais rigoureusement nul.'}`;
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([document.getElementById('quantTunnelReadout')]); }
}
function initQuantTunnel(){ updateQuantTunnel(); }

/* =========================== CHAPITRE 5 — Effet tunnel et barrière de potentiel =========================== */
QUANT_CHAPTERS[quantKey('Effet tunnel et franchissement d\'une barrière de potentiel')] = {
  objectives: [
    "Décrire qualitativement le comportement d'une particule quantique face à une barrière de potentiel d'énergie supérieure à son énergie",
    "Définir le coefficient de transmission T et exprimer sa dépendance approchée à la largeur et à la hauteur de la barrière",
    "Expliquer pourquoi l'effet tunnel est impossible en physique classique",
    "Citer des applications concrètes de l'effet tunnel (microscope à effet tunnel, désintégration alpha, diode tunnel)"
  ],
  prereqs: ["Particule dans un puits de potentiel infini"],
  bodyHtml: `
    <p>En physique classique, une balle lancée contre un mur ne peut jamais le traverser si son énergie cinétique est inférieure à la barrière d'énergie potentielle du mur — elle rebondit, un point c'est tout. En mécanique quantique, ce n'est plus vrai : une particule a une probabilité <strong>non nulle</strong> de traverser une barrière de potentiel même si son énergie est inférieure à la hauteur de cette barrière. C'est l'<strong>effet tunnel</strong>, l'une des conséquences les plus contre-intuitives — et les plus utiles technologiquement — de la théorie quantique.</p>

    <h3>1. Une barrière de potentiel rectangulaire</h3>
    <p>On considère une particule d'énergie $E$ arrivant sur une barrière de potentiel de hauteur $V_0 > E$ et de largeur $a$ :</p>
    <div class="formula-box">$$V(x) = \\begin{cases} 0 & \\text{si } x<0 \\text{ ou } x>a \\\\ V_0 & \\text{si } 0 \\leq x \\leq a \\end{cases}$$</div>
    <p>Classiquement, la particule serait totalement réfléchie. Quantiquement, en résolvant l'équation de Schrödinger stationnaire (chapitre 3) dans chacune des trois régions et en imposant la continuité de $\\psi$ et de sa dérivée aux deux frontières, on trouve qu'à l'intérieur de la barrière, la fonction d'onde ne s'annule pas brutalement : elle décroît de façon <strong>exponentielle</strong> (au lieu d'osciller comme dans les régions où $E>V$), et redevient oscillante — donc non nulle — de l'autre côté de la barrière. La particule a ainsi une probabilité non nulle d'être détectée après la barrière.</p>

    <h3>2. Le coefficient de transmission</h3>
    <p>On définit le <strong>coefficient de transmission</strong> $T$ comme la probabilité qu'une particule incidente franchisse la barrière. Pour une barrière suffisamment large et haute (approximation dite WKB), il s'exprime approximativement par :</p>
    <div class="formula-box">$$T \\approx e^{-2\\kappa a}, \\qquad \\kappa = \\frac{\\sqrt{2m(V_0-E)}}{\\hbar}$$</div>
    <div class="key-point">
      <span class="eyebrow">Une décroissance exponentielle extrêmement sensible</span>
      Parce que $T$ dépend de façon exponentielle de la largeur $a$ et de la racine carrée de $(V_0-E)$, le coefficient de transmission est <strong>extrêmement sensible</strong> à ces deux paramètres : doubler la largeur de la barrière peut réduire T de plusieurs ordres de grandeur, tandis qu'une barrière plus fine ou moins haute peut rendre l'effet tunnel parfaitement mesurable. C'est cette sensibilité extrême qui est exploitée dans le microscope à effet tunnel (voir plus bas) : un courant tunnel qui varie de façon exponentielle avec la distance pointe-échantillon permet de sonder les surfaces avec une résolution de l'ordre de l'atome.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un électron d'énergie $E$ rencontre une barrière de hauteur $V_0-E = 1{,}0$ eV et de largeur $a=0{,}5$ nm. Estimer l'ordre de grandeur du coefficient de transmission.</p>
      <p><strong>Solution :</strong> $\\kappa=\\sqrt{2m_e(V_0-E)}/\\hbar \\approx 5{,}1\\times10^{9}$ m⁻¹, donc $2\\kappa a \\approx 2\\times5{,}1\\times10^{9}\\times0{,}5\\times10^{-9}\\approx 5{,}1$, et $T\\approx e^{-5{,}1}\\approx 6\\times10^{-3}$.</p>
      <p class="example-answer">Réponse : $T\\approx 0{,}6\\%$ — faible, mais parfaitement mesurable (contre zéro en physique classique).</p>
    </div>

    <h3>3. Applications concrètes de l'effet tunnel</h3>
    <p>Loin d'être une curiosité théorique, l'effet tunnel est à la base de plusieurs technologies et phénomènes naturels majeurs :</p>
    <ul style="margin-left:20px; line-height:1.9;">
      <li><strong>Microscope à effet tunnel (STM)</strong>, inventé en 1981 par Gerd Binnig et Heinrich Rohrer (prix Nobel de physique 1986) : une pointe métallique très fine balaie une surface conductrice à quelques dixièmes de nanomètre de distance ; le courant tunnel qui s'établit entre pointe et surface, extrêmement sensible à cette distance, permet de cartographier le relief atomique de la surface.</li>
      <li><strong>Désintégration alpha</strong> des noyaux radioactifs lourds : une particule alpha (noyau d'hélium) confinée dans le noyau par la force nucléaire forte peut, avec une faible probabilité par unité de temps, traverser la barrière de potentiel coulombienne qui la retient — expliquant quantitativement (théorie de Gamow, 1928) pourquoi certains noyaux sont stables sur des durées extrêmement variables.</li>
      <li><strong>Diode tunnel</strong> et composants de la microélectronique moderne, où le passage contrôlé d'électrons par effet tunnel à travers de fines couches isolantes est exploité pour la mémoire flash ou certains transistors.</li>
    </ul>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>L'effet tunnel permet à une particule de traverser une barrière de potentiel même si $E<V_0$ — impossible classiquement</li>
        <li>Coefficient de transmission approché : $T\\approx e^{-2\\kappa a}$, avec $\\kappa=\\sqrt{2m(V_0-E)}/\\hbar$</li>
        <li>T dépend exponentiellement de la largeur de barrière et de $\\sqrt{V_0-E}$ — extrêmement sensible à ces paramètres</li>
        <li>Applications majeures : microscope à effet tunnel, désintégration alpha, diode tunnel</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la particule « saute » par-dessus la barrière — elle la traverse littéralement là où $\\psi$ ne s'annule jamais complètement</li>
        <li>Penser que T=1 est possible avec E<V₀ — T reste toujours strictement inférieur à 1 dans ce cas</li>
        <li>Oublier que T décroît de façon EXPONENTIELLE avec la largeur de la barrière, pas linéairement</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — coefficient de transmission tunnel</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Estime T pour un électron franchissant une barrière rectangulaire (approximation WKB).</p>
      <div class="sim-controls">
        <label>V₀ − E (eV) : <input type="number" id="quantDV" value="1.0" step="0.1" style="width:70px;" oninput="updateQuantTunnel()"></label>
        <label>Largeur a (nm) : <input type="number" id="quantA" value="0.5" step="0.1" style="width:70px;" oninput="updateQuantTunnel()"></label>
        <div class="sim-readout" id="quantTunnelReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'effet tunnel permet à une particule de franchir une barrière de potentiel :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant5e1" value="wrong"> uniquement si son énergie E est supérieure à V0</label>
          <label class="option"><input type="radio" name="quant5e1" value="right"> même si son énergie E est inférieure à V0, avec une probabilité T non nulle</label>
          <label class="option"><input type="radio" name="quant5e1" value="wrong"> uniquement à température nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant5e1','quant5fb1','Correct — c\\'est précisément ce qui rend l\\'effet tunnel impossible à expliquer classiquement.','Si E>V0, la particule passe classiquement aussi. L\\'effet tunnel concerne le cas E<V0.')">Vérifier</button>
        <div class="feedback" id="quant5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si l'on double la largeur a d'une barrière de potentiel, le coefficient de transmission T :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant5e2" value="wrong"> double aussi</label>
          <label class="option"><input type="radio" name="quant5e2" value="right"> diminue de façon exponentielle (souvent de plusieurs ordres de grandeur)</label>
          <label class="option"><input type="radio" name="quant5e2" value="wrong"> reste inchangé</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant5e2','quant5fb2','Correct — T ≈ e^(-2κa) dépend exponentiellement de a : doubler a peut réduire T de plusieurs ordres de grandeur.','T dépend de a par une exponentielle décroissante, pas de façon linéaire.')">Vérifier</button>
        <div class="feedback" id="quant5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le microscope à effet tunnel (STM) exploite :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant5e3" value="wrong"> la diffraction des rayons X sur un cristal</label>
          <label class="option"><input type="radio" name="quant5e3" value="right"> la sensibilité extrême du courant tunnel à la distance pointe-surface</label>
          <label class="option"><input type="radio" name="quant5e3" value="wrong"> l'effet photoélectrique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant5e3','quant5fb3','Correct — la dépendance exponentielle de T à la distance permet une résolution atomique.','Pense à ce qui rend le coefficient T si utile pour mesurer des distances infimes.')">Vérifier</button>
        <div class="feedback" id="quant5fb3"></div>
      </div>
    </div>
  `,
  init: initQuantTunnel
};

QUANT_NOVA_KB[quantKey('Effet tunnel et franchissement d\'une barrière de potentiel')] = {
  intro: "Salut, moi c'est Nova ! On est sur l'effet tunnel. Demande-moi comment une particule peut traverser une barrière qu'elle ne devrait classiquement pas franchir, à quoi sert le microscope à effet tunnel, ou un indice sur un exercice.",
  rules: [
    { test:/effet tunnel|barri[èe]re/i, replies:["L'effet tunnel permet à une particule de traverser une barrière de potentiel même si son énergie E est inférieure à la hauteur V0 de la barrière — impossible en physique classique."] },
    { test:/coefficient de transmission|\bt\b\s*≈|kappa|κ/i, replies:["Le coefficient de transmission s'approxime par T ≈ e^(-2κa), avec κ=√(2m(V0-E))/ħ. Il dépend exponentiellement de la largeur a et de la hauteur de la barrière."] },
    { test:/stm|microscope.*tunnel|binnig|rohrer/i, replies:["Le microscope à effet tunnel (STM), inventé par Binnig et Rohrer en 1981, mesure un courant tunnel extrêmement sensible à la distance pointe-surface pour cartographier le relief atomique."] },
    { test:/d[ée]sint[ée]gration alpha|gamow/i, replies:["La désintégration alpha s'explique par effet tunnel : une particule alpha confinée dans le noyau traverse la barrière coulombienne avec une faible probabilité par unité de temps (théorie de Gamow, 1928)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare le cas E>V0 (classique) au cas E<V0.","Indice niveau 2 : l'effet tunnel concerne spécifiquement E<V0.","Indice niveau 3 : la particule a alors une probabilité T non nulle de passer, malgré tout."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelle est la forme mathématique de T en fonction de a ?","Indice niveau 2 : T ≈ e^(-2κa), une exponentielle décroissante.","Indice niveau 3 : doubler a peut donc réduire T de plusieurs ordres de grandeur."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : qu'est-ce qui rend le STM si précis ?","Indice niveau 2 : la sensibilité exponentielle de T (donc du courant tunnel) à la distance.","Indice niveau 3 : cela permet une résolution de l'ordre de l'atome."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 6 — Vérificateur du principe d'incertitude de Heisenberg (Chapitre 6)
--------------------------------------------------------------------------------- */
function updateQuantHeisenberg(){
  const dx = parseFloat(document.getElementById('quantDX').value) || 1e-10; /* m */
  const dpMin = QUANT_HBAR / (2 * dx);
  document.getElementById('quantHeisReadout').innerHTML =
    `Pour $\\Delta x = ${dx.toExponential(2)}$ m, l'incertitude minimale sur la quantité de mouvement est :<br>` +
    `$\\Delta p_{min} = \\dfrac{\\hbar}{2\\Delta x} \\approx ${dpMin.toExponential(3)}$ kg·m/s`;
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([document.getElementById('quantHeisReadout')]); }
}
function initQuantHeisenberg(){ updateQuantHeisenberg(); }

/* =========================== CHAPITRE 6 — Opérateurs, observables et postulats de la mesure =========================== */
QUANT_CHAPTERS[quantKey('Opérateurs, observables et postulats de la mesure')] = {
  objectives: [
    "Associer un opérateur linéaire à chaque grandeur physique observable (position, quantité de mouvement, énergie)",
    "Énoncer les postulats de la mesure quantique : résultats possibles, valeurs propres, réduction du paquet d'onde",
    "Définir le commutateur de deux opérateurs et l'appliquer au couple position-impulsion",
    "Retrouver formellement le principe d'incertitude de Heisenberg à partir du commutateur $[\\hat{x},\\hat{p}]=i\\hbar$"
  ],
  prereqs: ["La fonction d'onde et l'équation de Schrödinger", "Dualité onde-corpuscule, longueur d'onde de De Broglie et principe d'incertitude"],
  bodyHtml: `
    <p>Les chapitres précédents ont introduit la fonction d'onde et l'équation qui gouverne son évolution. Il reste une question essentielle : comment, à partir de $\\Psi(x,t)$, prédire le résultat d'une <strong>mesure</strong> effectuée sur le système ? La réponse repose sur le formalisme des <strong>opérateurs</strong>.</p>

    <h3>1. À chaque observable, un opérateur</h3>
    <p>En mécanique quantique, toute grandeur physique mesurable (une <strong>observable</strong>) est représentée par un opérateur linéaire agissant sur la fonction d'onde. Les deux opérateurs fondamentaux, à partir desquels tous les autres se construisent, sont :</p>
    <table class="mini-table">
      <tr><th>Observable</th><th>Opérateur associé</th></tr>
      <tr><td>Position $x$</td><td>$\\hat{x} = x\\,\\cdot$ (multiplication par x)</td></tr>
      <tr><td>Quantité de mouvement $p$</td><td>$\\hat{p} = -i\\hbar\\dfrac{\\partial}{\\partial x}$</td></tr>
      <tr><td>Énergie cinétique</td><td>$\\hat{T} = -\\dfrac{\\hbar^2}{2m}\\dfrac{\\partial^2}{\\partial x^2}$</td></tr>
      <tr><td>Énergie totale (hamiltonien)</td><td>$\\hat{H} = \\hat{T} + V(x)$</td></tr>
    </table>
    <p>On reconnaît d'ailleurs, dans l'opérateur hamiltonien $\\hat{H}$, exactement le membre de droite de l'équation de Schrödinger stationnaire du chapitre 3 : celle-ci s'écrit de façon compacte $\\hat{H}\\psi = E\\psi$, une <strong>équation aux valeurs propres</strong>.</p>

    <h3>2. Les postulats de la mesure</h3>
    <div class="key-point">
      <span class="eyebrow">Ce que prédit (et ne prédit pas) la mécanique quantique</span>
      <ul style="margin-left:18px; line-height:1.8;">
        <li>Le résultat d'une mesure de l'observable associée à un opérateur $\\hat{A}$ est nécessairement l'une des <strong>valeurs propres</strong> de $\\hat{A}$ (les seules valeurs « permises »).</li>
        <li>Si le système est dans un état propre de $\\hat{A}$ avant la mesure, le résultat est prédit avec certitude, égal à la valeur propre correspondante.</li>
        <li>Sinon, seule la <strong>probabilité</strong> d'obtenir chaque valeur propre possible peut être calculée (à partir de la décomposition de $\\Psi$ sur les états propres de $\\hat{A}$) — jamais le résultat individuel d'une mesure particulière.</li>
        <li>Juste après la mesure, l'état du système est « projeté » sur l'état propre correspondant au résultat obtenu — c'est la <strong>réduction du paquet d'onde</strong>, une modification physique réelle et instantanée de l'état, provoquée par l'acte de mesure lui-même.</li>
      </ul>
    </div>

    <h3>3. Le commutateur et l'origine formelle de l'incertitude</h3>
    <p>Le <strong>commutateur</strong> de deux opérateurs $\\hat{A}$ et $\\hat{B}$ est défini par $[\\hat{A},\\hat{B}] = \\hat{A}\\hat{B} - \\hat{B}\\hat{A}$. Contrairement à des nombres ordinaires, deux opérateurs ne « commutent » pas nécessairement : l'ordre dans lequel on les applique peut changer le résultat. Un calcul direct sur les opérateurs position et quantité de mouvement donne le résultat central de toute la théorie :</p>
    <div class="formula-box">$$[\\hat{x},\\hat{p}] = i\\hbar$$</div>
    <div class="key-point">
      <span class="eyebrow">Le principe d'incertitude retrouvé formellement</span>
      On peut démontrer (relation de Robertson-Schrödinger, hors programme de ce chapitre introductif) que pour deux observables dont le commutateur vaut $i\\hbar$ comme ci-dessus, les écarts-types $\\Delta x$ et $\\Delta p$ vérifient nécessairement $\\Delta x\\cdot\\Delta p \\geq \\hbar/2$ — exactement la relation de Heisenberg introduite qualitativement au chapitre 2. Le principe d'incertitude n'est donc pas un postulat séparé : c'est une <strong>conséquence directe</strong> du fait que $\\hat{x}$ et $\\hat{p}$ ne commutent pas. Plus généralement, deux observables dont les opérateurs ne commutent pas ne peuvent jamais être mesurées simultanément avec une précision arbitraire.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> un électron est confiné dans une région de taille $\\Delta x = 1{,}0\\times10^{-10}$ m (taille typique d'un atome). Estimer l'incertitude minimale sur sa quantité de mouvement, puis sur sa vitesse.</p>
      <p><strong>Solution :</strong> $\\Delta p_{min} = \\dfrac{\\hbar}{2\\Delta x} = \\dfrac{1{,}055\\times10^{-34}}{2\\times1{,}0\\times10^{-10}} \\approx 5{,}3\\times10^{-25}$ kg·m/s. D'où $\\Delta v_{min} = \\Delta p_{min}/m_e \\approx 5{,}8\\times10^{5}$ m/s — une vitesse loin d'être négligeable, ce qui explique pourquoi un électron ne peut pas être considéré comme immobile à l'échelle atomique.</p>
      <p class="example-answer">Réponse : $\\Delta p_{min}\\approx 5{,}3\\times10^{-25}$ kg·m/s, soit $\\Delta v_{min}\\approx 5{,}8\\times10^5$ m/s.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Chaque observable est associée à un opérateur linéaire ($\\hat{x}$, $\\hat{p}=-i\\hbar\\partial/\\partial x$, $\\hat{H}$...)</li>
        <li>Une mesure ne peut donner qu'une valeur propre de l'opérateur ; seule la probabilité de chaque résultat est calculable a priori</li>
        <li>La mesure provoque la réduction du paquet d'onde : projection sur l'état propre correspondant</li>
        <li>$[\\hat{x},\\hat{p}]=i\\hbar \\neq 0$ : c'est cette non-commutation qui est à l'origine formelle du principe d'incertitude de Heisenberg</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la mécanique quantique prédit le résultat exact d'une mesure individuelle — elle ne prédit en général que des probabilités</li>
        <li>Penser que le commutateur $[\\hat{A},\\hat{B}]$ est toujours nul, comme pour des nombres ordinaires — ce n'est vrai que pour certains couples d'opérateurs</li>
        <li>Considérer le principe d'incertitude comme un postulat indépendant, alors qu'il découle de la non-commutation de $\\hat{x}$ et $\\hat{p}$</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Vérificateur — principe d'incertitude de Heisenberg</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre une incertitude de position pour calculer l'incertitude minimale correspondante sur la quantité de mouvement.</p>
      <div class="sim-controls">
        <label>Δx (m) : <input type="text" id="quantDX" value="1e-10" style="width:90px;" oninput="updateQuantHeisenberg()"></label>
        <div class="sim-readout" id="quantHeisReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le résultat d'une mesure d'une observable associée à un opérateur Â est nécessairement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant6e1" value="wrong"> une valeur quelconque choisie par l'expérimentateur</label>
          <label class="option"><input type="radio" name="quant6e1" value="right"> l'une des valeurs propres de l'opérateur Â</label>
          <label class="option"><input type="radio" name="quant6e1" value="wrong"> toujours égale à zéro</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant6e1','quant6fb1','Correct — les valeurs propres de l\\'opérateur sont les seuls résultats possibles d\\'une mesure de l\\'observable associée.','Repense au premier postulat de la mesure quantique énoncé dans le cours.')">Vérifier</button>
        <div class="feedback" id="quant6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le commutateur des opérateurs position et quantité de mouvement vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant6e2" value="wrong"> $[\\hat{x},\\hat{p}] = 0$</label>
          <label class="option"><input type="radio" name="quant6e2" value="right"> $[\\hat{x},\\hat{p}] = i\\hbar$</label>
          <label class="option"><input type="radio" name="quant6e2" value="wrong"> $[\\hat{x},\\hat{p}] = \\hbar^2$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant6e2','quant6fb2','Correct — [x̂,p̂]=iħ est le résultat fondamental dont découle le principe d\\'incertitude.','C\\'est ce commutateur non nul qui est à l\\'origine du principe d\\'incertitude de Heisenberg.')">Vérifier</button>
        <div class="feedback" id="quant6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le principe d'incertitude de Heisenberg, dans ce chapitre, apparaît comme :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant6e3" value="wrong"> un postulat indépendant, sans lien avec les opérateurs</label>
          <label class="option"><input type="radio" name="quant6e3" value="right"> une conséquence directe de la non-commutation de x̂ et p̂</label>
          <label class="option"><input type="radio" name="quant6e3" value="wrong"> une approximation valable seulement pour les grandes particules</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant6e3','quant6fb3','Correct — le principe d\\'incertitude découle formellement de [x̂,p̂]=iħ≠0 : ce n\\'est pas un postulat séparé.','Le fait que x̂ et p̂ ne commutent pas ([x̂,p̂]≠0) est précisément ce qui empêche une précision arbitraire simultanée.')">Vérifier</button>
        <div class="feedback" id="quant6fb3"></div>
      </div>
    </div>
  `,
  init: initQuantHeisenberg
};

QUANT_NOVA_KB[quantKey('Opérateurs, observables et postulats de la mesure')] = {
  intro: "Salut, moi c'est Nova ! On est sur les opérateurs et les postulats de la mesure. Demande-moi ce qu'est un commutateur, pourquoi le principe d'incertitude n'est pas un postulat séparé, ou un indice sur un exercice.",
  rules: [
    { test:/op[ée]rateur/i, replies:["Chaque observable est associée à un opérateur linéaire : x̂ = multiplication par x, p̂ = -iħ∂/∂x, et l'hamiltonien Ĥ = énergie cinétique + V(x)."] },
    { test:/valeur propre|postulat.*mesure/i, replies:["Une mesure ne peut donner qu'une valeur propre de l'opérateur associé. Si le système n'est pas dans un état propre, seule la probabilité de chaque résultat est calculable."] },
    { test:/r[ée]duction du paquet d'onde/i, replies:["Après la mesure, l'état du système est projeté sur l'état propre correspondant au résultat obtenu — c'est la réduction du paquet d'onde, une modification réelle provoquée par la mesure."] },
    { test:/commutateur|\[x|\[â/i, replies:["Le commutateur [Â,B̂]=ÂB̂-B̂Â mesure si l'ordre d'application de deux opérateurs compte. Pour x̂ et p̂, [x̂,p̂]=iħ ≠ 0."] },
    { test:/heisenberg|incertitude/i, replies:["Le principe d'incertitude Δx·Δp≥ħ/2 découle directement de [x̂,p̂]=iħ : ce n'est pas un postulat séparé, mais une conséquence de la non-commutation de x̂ et p̂."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quelles sont les valeurs possibles d'une mesure ?","Indice niveau 2 : ce sont les valeurs propres de l'opérateur associé.","Indice niveau 3 : aucune autre valeur n'est possible."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : x̂ et p̂ commutent-ils ?","Indice niveau 2 : non, leur commutateur n'est pas nul.","Indice niveau 3 : [x̂,p̂] = iħ."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le principe d'incertitude a-t-il besoin d'un postulat séparé ?","Indice niveau 2 : non, il découle du commutateur [x̂,p̂]=iħ≠0.","Indice niveau 3 : c'est donc une conséquence, pas un postulat indépendant."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 7 — Calculateur des niveaux d'énergie de l'oscillateur harmonique (Chapitre 7)
--------------------------------------------------------------------------------- */
function updateQuantOsc(){
  const n = Math.max(0, parseInt(document.getElementById('quantNosc').value) || 0);
  const freq = parseFloat(document.getElementById('quantFreqOsc').value) || 1e13; /* Hz */
  const omega = 2 * Math.PI * freq;
  const E = (n + 0.5) * QUANT_HBAR * omega;
  const EeV = E / QUANT_EV;
  document.getElementById('quantOscReadout').innerHTML =
    `$E_n = (n+\\tfrac12)\\hbar\\omega = (${n}+0{,}5)\\times\\hbar\\times2\\pi\\times${freq.toExponential(2)}$<br>` +
    `Énergie du niveau n=${n} : <strong>${EeV.toFixed(4)} eV</strong> (${E.toExponential(3)} J)<br>` +
    `Énergie du point zéro (n=0) : $E_0=\\tfrac12\\hbar\\omega \\approx ${(0.5*QUANT_HBAR*omega/QUANT_EV).toFixed(4)}$ eV — jamais nulle, même au repos.`;
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([document.getElementById('quantOscReadout')]); }
}
function initQuantOsc(){ updateQuantOsc(); }

/* =========================== CHAPITRE 7 — L'oscillateur harmonique quantique =========================== */
QUANT_CHAPTERS[quantKey('L\'oscillateur harmonique quantique')] = {
  objectives: [
    "Poser le potentiel de l'oscillateur harmonique quantique et justifier son importance en physique",
    "Énoncer l'expression quantifiée des niveaux d'énergie $E_n=(n+1/2)\\hbar\\omega$",
    "Expliquer l'existence et l'origine physique de l'énergie de point zéro",
    "Relier l'oscillateur harmonique quantique à des applications concrètes (vibrations moléculaires, modes de rayonnement)"
  ],
  prereqs: ["Particule dans un puits de potentiel infini", "Opérateurs, observables et postulats de la mesure"],
  bodyHtml: `
    <p>Après le puits de potentiel infini, le second système modèle incontournable de la mécanique quantique est l'<strong>oscillateur harmonique</strong>. Son importance dépasse largement le cadre théorique : au voisinage de n'importe quel minimum d'énergie potentielle, un développement limité montre que le potentiel ressemble presque toujours à un potentiel harmonique — ce qui en fait le modèle de référence pour les vibrations moléculaires, les phonons dans les solides, ou encore les modes du champ électromagnétique.</p>

    <h3>1. Le potentiel harmonique</h3>
    <p>On considère une particule de masse $m$ soumise à un potentiel parabolique, comme un ressort classique de raideur $k$ :</p>
    <div class="formula-box">$$V(x) = \\frac{1}{2}kx^2 = \\frac{1}{2}m\\omega^2x^2, \\qquad \\omega=\\sqrt{k/m}$$</div>
    <p>Classiquement, ce potentiel décrit une oscillation sinusoïdale d'énergie totale quelconque (déterminée par les conditions initiales). La résolution de l'équation de Schrödinger stationnaire pour ce potentiel — techniquement plus longue que pour le puits infini, souvent traitée avec des opérateurs dits « d'échelle » ou de création/annihilation — conduit à un résultat tout aussi central que celui du chapitre 4.</p>

    <h3>2. Quantification de l'énergie</h3>
    <div class="key-point">
      <span class="eyebrow">Des niveaux également espacés</span>
      Les niveaux d'énergie permis de l'oscillateur harmonique quantique sont :
      $$E_n = \\left(n+\\frac{1}{2}\\right)\\hbar\\omega, \\qquad n=0,1,2,3,\\dots$$
      Contrairement au puits infini (où l'écart entre niveaux successifs croît avec n, chapitre 4), les niveaux de l'oscillateur harmonique sont <strong>régulièrement espacés</strong> d'une même quantité $\\hbar\\omega$. C'est cette propriété remarquable qui permettra, en physique du rayonnement, d'interpréter un mode du champ électromagnétique comme un ensemble de « quanta » d'énergie $\\hbar\\omega$ (les photons) — retrouvant ainsi, par une voie différente, l'intuition de Planck et d'Einstein du chapitre 1.
    </div>

    <h3>3. L'énergie de point zéro</h3>
    <p>Un résultat frappant : même dans son état fondamental ($n=0$), l'oscillateur possède une énergie <strong>non nulle</strong>, appelée <strong>énergie de point zéro</strong> :</p>
    <div class="formula-box">$$E_0 = \\frac{1}{2}\\hbar\\omega$$</div>
    <p>Ce résultat est une conséquence directe du principe d'incertitude de Heisenberg (chapitres 2 et 6) : si l'énergie était nulle, la particule serait immobile ($p=0$) et parfaitement localisée au minimum du potentiel ($x=0$), ce qui violerait $\\Delta x\\cdot\\Delta p\\geq\\hbar/2$ (les deux incertitudes seraient nulles simultanément). Le système doit donc conserver une agitation résiduelle minimale, même au zéro absolu de température — un phénomène observé expérimentalement, notamment dans les vibrations résiduelles des cristaux à très basse température.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> une molécule diatomique vibre à la fréquence $\\nu = 6{,}0\\times10^{13}$ Hz (ordre de grandeur typique d'une liaison chimique). Calculer l'écart d'énergie entre deux niveaux vibrationnels successifs, en eV.</p>
      <p><strong>Solution :</strong> $\\Delta E = E_{n+1}-E_n = \\hbar\\omega = h\\nu = 6{,}626\\times10^{-34}\\times6{,}0\\times10^{13} \\approx 3{,}98\\times10^{-20}$ J $\\approx 0{,}25$ eV.</p>
      <p class="example-answer">Réponse : $\\Delta E \\approx 0{,}25$ eV — de l'ordre de grandeur des transitions vibrationnelles observées en spectroscopie infrarouge.</p>
    </div>

    <h3>4. Applications</h3>
    <p>Le modèle de l'oscillateur harmonique quantique est le point de départ de la <strong>spectroscopie vibrationnelle</strong> (infrarouge, Raman) des molécules, où chaque liaison chimique se comporte, en première approximation, comme un petit ressort quantique entre deux noyaux. Il est également à la base de la description des <strong>phonons</strong> (quanta de vibration du réseau cristallin d'un solide) et, en électrodynamique quantique, de la quantification du champ électromagnétique lui-même — chaque mode du champ se comportant comme un oscillateur harmonique indépendant.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Potentiel harmonique : $V(x)=\\frac12 m\\omega^2 x^2$ — modèle universel au voisinage de tout minimum de potentiel</li>
        <li>Niveaux d'énergie quantifiés et également espacés : $E_n=(n+\\frac12)\\hbar\\omega$</li>
        <li>Énergie de point zéro $E_0=\\frac12\\hbar\\omega \\neq 0$, conséquence directe du principe d'incertitude</li>
        <li>Applications : vibrations moléculaires (spectroscopie IR/Raman), phonons dans les solides, quantification du champ électromagnétique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'énergie du niveau fondamental est nulle, comme en physique classique — elle vaut $\\frac12\\hbar\\omega$, jamais zéro</li>
        <li>Confondre l'espacement régulier des niveaux de l'oscillateur harmonique avec l'espacement croissant du puits infini (chapitre 4) — ce sont deux comportements différents</li>
        <li>Oublier le facteur $+\\frac12$ dans $E_n=(n+\\frac12)\\hbar\\omega$</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — niveaux d'énergie de l'oscillateur harmonique</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Calcule l'énergie du niveau n pour une fréquence propre ω=2πν donnée.</p>
      <div class="sim-controls">
        <label>Niveau n : <input type="number" id="quantNosc" value="0" min="0" style="width:60px;" oninput="updateQuantOsc()"></label>
        <label>Fréquence ν (Hz) : <input type="text" id="quantFreqOsc" value="6e13" style="width:90px;" oninput="updateQuantOsc()"></label>
        <div class="sim-readout" id="quantOscReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Les niveaux d'énergie de l'oscillateur harmonique quantique sont :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant7e1" value="wrong"> espacés de façon croissante avec n, comme dans le puits infini</label>
          <label class="option"><input type="radio" name="quant7e1" value="right"> régulièrement espacés d'une même quantité ħω</label>
          <label class="option"><input type="radio" name="quant7e1" value="wrong"> tous égaux, quel que soit n</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant7e1','quant7fb1','Correct — E_n=(n+1/2)ħω : l\\'écart entre deux niveaux consécutifs vaut toujours ħω, contrairement au puits infini.','Calcule E_(n+1) - E_n à partir de la formule E_n=(n+1/2)ħω : le résultat est-il constant ?')">Vérifier</button>
        <div class="feedback" id="quant7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'énergie de point zéro E₀=ħω/2 de l'oscillateur harmonique quantique existe car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant7e2" value="wrong"> le système est toujours chauffé artificiellement</label>
          <label class="option"><input type="radio" name="quant7e2" value="right"> une énergie nulle violerait le principe d'incertitude de Heisenberg (x=0 et p=0 simultanément)</label>
          <label class="option"><input type="radio" name="quant7e2" value="wrong"> c'est une erreur de calcul qu'on corrige habituellement à zéro</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant7e2','quant7fb2','Correct — si E=0, alors x=0 et p=0 seraient tous deux parfaitement déterminés, ce qui violerait Δx·Δp≥ħ/2.','Repense au principe d\\'incertitude : peut-on avoir simultanément Δx=0 ET Δp=0 ?')">Vérifier</button>
        <div class="feedback" id="quant7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le modèle de l'oscillateur harmonique quantique s'applique particulièrement bien à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant7e3" value="right"> une liaison chimique en vibration autour de sa position d'équilibre</label>
          <label class="option"><input type="radio" name="quant7e3" value="wrong"> un électron totalement libre, sans potentiel</label>
          <label class="option"><input type="radio" name="quant7e3" value="wrong"> une particule dans une boîte de potentiel infini</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant7e3','quant7fb3','Correct — au voisinage de l\\'équilibre, le potentiel d\\'une liaison chimique se comporte comme un potentiel harmonique : c\\'est la base de la spectroscopie vibrationnelle.','Pense à ce qui se passe autour d\\'un minimum d\\'énergie potentielle en général.')">Vérifier</button>
        <div class="feedback" id="quant7fb3"></div>
      </div>
    </div>
  `,
  init: initQuantOsc
};

QUANT_NOVA_KB[quantKey('L\'oscillateur harmonique quantique')] = {
  intro: "Salut, moi c'est Nova ! On est sur l'oscillateur harmonique quantique. Demande-moi pourquoi l'énergie de point zéro n'est jamais nulle, en quoi les niveaux diffèrent de ceux du puits infini, ou un indice sur un exercice.",
  rules: [
    { test:/niveaux.*[ée]nergie|e_?n\s*=/i, replies:["Les niveaux de l'oscillateur harmonique sont E_n=(n+1/2)ħω, régulièrement espacés de ħω — contrairement au puits infini où l'écart croît avec n."] },
    { test:/point z[ée]ro|e_?0/i, replies:["L'énergie de point zéro E0=ħω/2 n'est jamais nulle : une énergie nulle impliquerait x=0 et p=0 simultanément, ce qui violerait le principe d'incertitude de Heisenberg."] },
    { test:/potentiel harmonique|ressort/i, replies:["Le potentiel harmonique V(x)=½mω²x² décrit un ressort quantique. Il est universel car tout minimum de potentiel se comporte ainsi au voisinage immédiat de son minimum."] },
    { test:/vibration.*mol[ée]cul|spectroscopie/i, replies:["Une liaison chimique en vibration se comporte comme un oscillateur harmonique quantique : c'est la base de la spectroscopie infrarouge et Raman."] },
    { test:/phonon/i, replies:["Les phonons sont les quanta de vibration du réseau cristallin d'un solide, décrits comme des oscillateurs harmoniques quantiques indépendants."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : calcule E_(n+1) - E_n à partir de E_n=(n+1/2)ħω.","Indice niveau 2 : le résultat ne dépend pas de n.","Indice niveau 3 : l'écart vaut toujours ħω, donc les niveaux sont régulièrement espacés."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : que se passerait-il si E=0 ?","Indice niveau 2 : x=0 et p=0 seraient tous deux parfaitement déterminés.","Indice niveau 3 : cela violerait Δx·Δp≥ħ/2 — donc E0 ne peut pas être nulle."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à la forme du potentiel près d'un minimum d'énergie.","Indice niveau 2 : une liaison chimique a un minimum d'énergie à sa longueur d'équilibre.","Indice niveau 3 : au voisinage de ce minimum, le potentiel ressemble à un potentiel harmonique."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 8 — Calculateur des transitions de l'atome d'hydrogène (Chapitre 8)
--------------------------------------------------------------------------------- */
function updateQuantHydrogene(){
  const ni = Math.max(1, parseInt(document.getElementById('quantNi').value) || 2);
  const nf = Math.max(1, parseInt(document.getElementById('quantNf').value) || 1);
  const deltaE = 13.6 * (1/(nf*nf) - 1/(ni*ni));
  const out = document.getElementById('quantHReadout');
  if(Math.abs(deltaE) < 1e-6){
    out.innerHTML = `n_i = n_f : aucune transition (ΔE = 0).`;
    return;
  }
  const absE = Math.abs(deltaE);
  const E_J = absE * QUANT_EV;
  const freq = E_J / QUANT_H;
  const lambda = 3e8 / freq;
  const sens = deltaE > 0 ? 'émission (n_i → n_f, désexcitation)' : 'absorption (n_i → n_f, excitation)';
  out.innerHTML =
    `$|\\Delta E| = 13{,}6\\left|\\dfrac{1}{n_f^2}-\\dfrac{1}{n_i^2}\\right| = ${absE.toFixed(3)}$ eV — ${sens}<br>` +
    `Longueur d'onde du photon associé : $\\lambda = hc/|\\Delta E| \\approx ${(lambda*1e9).toFixed(1)}$ nm`;
  if(window.MathJax && window.MathJax.typesetPromise){ window.MathJax.typesetPromise([out]); }
}
function initQuantHydrogene(){ updateQuantHydrogene(); }

/* =========================== CHAPITRE 8 — L'atome d'hydrogène et le spin de l'électron =========================== */
QUANT_CHAPTERS[quantKey('L\'atome d\'hydrogène et le spin de l\'électron')] = {
  objectives: [
    "Décrire qualitativement la résolution de l'équation de Schrödinger en trois dimensions pour l'atome d'hydrogène",
    "Retrouver la formule des niveaux d'énergie $E_n=-13{,}6/n^2$ eV et l'utiliser pour calculer une transition",
    "Introduire le spin de l'électron comme un quatrième nombre quantique, distinct des nombres orbitaux",
    "Énoncer le principe d'exclusion de Pauli et son rôle dans la structure de la matière"
  ],
  prereqs: ["Particule dans un puits de potentiel infini", "Opérateurs, observables et postulats de la mesure"],
  bodyHtml: `
    <p>Ce dernier chapitre applique les outils développés tout au long de ce cours au système qui a historiquement motivé la mécanique quantique (chapitre 1) : l'<strong>atome d'hydrogène</strong>. C'est l'un des rares systèmes réalistes pour lequel l'équation de Schrödinger se résout exactement — et le point de départ indispensable pour comprendre les atomes plus complexes, déjà rencontrés dans les cours de chimie (atomistique, configuration électronique).</p>

    <h3>1. De 1D à 3D : le potentiel coulombien</h3>
    <p>Contrairement au puits infini ou à l'oscillateur harmonique (chapitres 4 et 7), l'atome d'hydrogène est un problème à <strong>trois dimensions</strong>, où l'électron est soumis au potentiel attractif coulombien du proton :</p>
    <div class="formula-box">$$V(r) = -\\frac{e^2}{4\\pi\\varepsilon_0 r}$$</div>
    <p>La résolution complète de l'équation de Schrödinger stationnaire pour ce potentiel — techniquement plus lourde (coordonnées sphériques, séparation des variables) et hors du cadre de ce chapitre introductif — fait apparaître <strong>naturellement</strong> les trois nombres quantiques $n$, $l$, $m$ déjà présentés en chimie (nombre quantique principal, secondaire, magnétique) : ils ne sont donc pas des règles arbitraires, mais une conséquence directe de la résolution de l'équation de Schrödinger en trois dimensions pour un potentiel à symétrie sphérique.</p>

    <h3>2. Les niveaux d'énergie de l'hydrogène</h3>
    <p>Remarquablement, malgré la complexité du problème à trois dimensions, l'énergie ne dépend, pour l'atome d'hydrogène, que du seul nombre quantique principal $n$ :</p>
    <div class="formula-box">$$E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}, \\qquad n=1,2,3,\\dots$$</div>
    <p>Ce résultat — retrouvé ici depuis les premiers principes de la mécanique quantique — coïncide exactement avec la formule empirique du modèle de Bohr (chapitre 1), mais il en découle désormais rigoureusement de la résolution de l'équation de Schrödinger, sans aucune hypothèse ad hoc sur des orbites circulaires.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> calculer l'énergie du photon émis lors d'une transition de l'électron du niveau $n=3$ vers le niveau $n=2$ dans l'atome d'hydrogène (transition de la série de Balmer), puis sa longueur d'onde.</p>
      <p><strong>Solution :</strong> $\\Delta E = 13{,}6\\left(\\dfrac{1}{2^2}-\\dfrac{1}{3^2}\\right) = 13{,}6\\times(0{,}25-0{,}111) \\approx 1{,}89$ eV. La longueur d'onde correspondante est $\\lambda = \\dfrac{hc}{\\Delta E} \\approx 656$ nm (rouge).</p>
      <p class="example-answer">Réponse : $\\Delta E\\approx1{,}89$ eV, $\\lambda\\approx656$ nm — c'est la raie rouge caractéristique H<sub>α</sub> observée dans le spectre visible de l'hydrogène.</p>
    </div>

    <h3>3. Le spin de l'électron : un quatrième nombre quantique</h3>
    <p>La résolution de l'équation de Schrödinger (non relativiste) en trois dimensions ne fait apparaître que trois nombres quantiques ($n,l,m$). Or l'expérience (notamment l'expérience de Stern et Gerlach, 1922, qui révèle une déviation d'atomes d'argent en deux faisceaux discrets dans un champ magnétique inhomogène) montre qu'un quatrième degré de liberté est nécessaire pour décrire complètement l'état d'un électron : le <strong>spin</strong>, noté $s$, un moment angulaire intrinsèque sans équivalent classique, qui ne prend pour l'électron que deux valeurs possibles, $m_s=+\\tfrac12$ ou $m_s=-\\tfrac12$.</p>
    <div class="key-point">
      <span class="eyebrow">Le principe d'exclusion de Pauli</span>
      En 1925, Wolfgang Pauli énonce un principe fondamental : <strong>deux électrons d'un même atome ne peuvent jamais avoir les quatre mêmes nombres quantiques $(n,l,m,m_s)$</strong>. C'est ce principe, purement quantique, qui explique pourquoi les électrons d'un atome polyélectronique ne s'entassent pas tous sur l'orbitale de plus basse énergie : chaque orbitale (caractérisée par $n,l,m$) ne peut accueillir que deux électrons, de spins opposés. Le principe de Pauli est ainsi directement responsable de la structure en couches du tableau périodique — la « règle de remplissage » déjà rencontrée en chimie n'est donc pas arbitraire, elle découle de ce principe quantique fondamental — et, plus largement, de la stabilité et du volume de toute la matière ordinaire.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>L'atome d'hydrogène est un problème 3D résolu exactement ; il fait apparaître naturellement les nombres quantiques n, l, m</li>
        <li>Niveaux d'énergie : $E_n=-13{,}6/n^2$ eV — identique au résultat de Bohr, mais désormais dérivé rigoureusement</li>
        <li>Le spin $s$ est un quatrième nombre quantique, sans équivalent classique, révélé par l'expérience de Stern et Gerlach</li>
        <li>Principe d'exclusion de Pauli : deux électrons d'un même atome ne peuvent partager les quatre mêmes nombres quantiques — base de la structure du tableau périodique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le spin est une véritable rotation physique de l'électron sur lui-même — c'est un moment angulaire intrinsèque sans analogue classique</li>
        <li>Oublier que E_n de l'hydrogène ne dépend que de n (et pas de l ou m) — une particularité propre au potentiel coulombien pur</li>
        <li>Confondre le principe de Pauli (deux électrons ne peuvent partager les 4 mêmes nombres quantiques) avec la règle de Hund (remplissage des orbitales dégénérées)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — transitions de l'atome d'hydrogène</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre les niveaux initial et final pour calculer l'énergie et la longueur d'onde du photon échangé (formule de Rydberg).</p>
      <div class="sim-controls">
        <label>n initial : <input type="number" id="quantNi" value="3" min="1" style="width:60px;" oninput="updateQuantHydrogene()"></label>
        <label>n final : <input type="number" id="quantNf" value="2" min="1" style="width:60px;" oninput="updateQuantHydrogene()"></label>
        <div class="sim-readout" id="quantHReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Dans l'atome d'hydrogène, l'énergie E_n du niveau n dépend :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant8e1" value="wrong"> des trois nombres quantiques n, l et m</label>
          <label class="option"><input type="radio" name="quant8e1" value="right"> uniquement du nombre quantique principal n</label>
          <label class="option"><input type="radio" name="quant8e1" value="wrong"> uniquement du spin de l'électron</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant8e1','quant8fb1','Correct — pour l\\'atome d\\'hydrogène (un seul électron, potentiel coulombien pur), E_n=-13,6/n² ne dépend que de n.','C\\'est une particularité propre au potentiel coulombien pur : cette dégénérescence disparaît dans les atomes à plusieurs électrons.')">Vérifier</button>
        <div class="feedback" id="quant8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'expérience de Stern et Gerlach (1922) a révélé l'existence :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant8e2" value="wrong"> du nombre quantique principal n</label>
          <label class="option"><input type="radio" name="quant8e2" value="right"> du spin de l'électron</label>
          <label class="option"><input type="radio" name="quant8e2" value="wrong"> de l'effet tunnel</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant8e2','quant8fb2','Correct — la déviation d\\'atomes d\\'argent en deux faisceaux discrets a révélé un quatrième nombre quantique, le spin, absent de la résolution 3D non relativiste de l\\'équation de Schrödinger.','n, l et m apparaissent déjà dans la résolution 3D de l\\'équation de Schrödinger ; ce qui manque encore, c\\'est le spin.')">Vérifier</button>
        <div class="feedback" id="quant8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le principe d'exclusion de Pauli explique directement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="quant8e3" value="wrong"> pourquoi l'énergie de l'hydrogène ne dépend que de n</label>
          <label class="option"><input type="radio" name="quant8e3" value="right"> pourquoi les électrons d'un atome se répartissent sur plusieurs orbitales plutôt que de s'entasser sur la plus basse en énergie</label>
          <label class="option"><input type="radio" name="quant8e3" value="wrong"> pourquoi la lumière se comporte comme une onde ET une particule</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('quant8e3','quant8fb3','Correct — deux électrons ne pouvant partager les 4 mêmes nombres quantiques, chaque orbitale n\\'accueille que 2 électrons (spins opposés) : c\\'est la base de la structure en couches du tableau périodique.','Repense à ce qui limite le nombre d\\'électrons par orbitale à exactement deux.')">Vérifier</button>
        <div class="feedback" id="quant8fb3"></div>
      </div>
    </div>
  `,
  init: initQuantHydrogene
};

QUANT_NOVA_KB[quantKey('L\'atome d\'hydrogène et le spin de l\'électron')] = {
  intro: "Salut, moi c'est Nova ! On termine ce cours avec l'atome d'hydrogène et le spin. Demande-moi pourquoi E_n ne dépend que de n, ce qu'a montré Stern et Gerlach, ou un indice sur un exercice.",
  rules: [
    { test:/e_?n|13,6|niveaux.*hydrog[èe]ne/i, replies:["Pour l'hydrogène, E_n=-13,6/n² eV ne dépend que du nombre quantique principal n — une particularité propre au potentiel coulombien pur à un seul électron."] },
    { test:/stern.*gerlach|spin/i, replies:["L'expérience de Stern et Gerlach (1922) a révélé le spin de l'électron : un quatrième nombre quantique, sans équivalent classique, qui ne prend que deux valeurs (+1/2 ou -1/2)."] },
    { test:/pauli|exclusion/i, replies:["Le principe d'exclusion de Pauli dit que deux électrons d'un même atome ne peuvent jamais partager les quatre mêmes nombres quantiques (n,l,m,ms) — d'où le remplissage à 2 électrons par orbitale."] },
    { test:/rydberg|transition|balmer/i, replies:["L'énergie d'une transition n_i→n_f vaut ΔE=13,6|1/n_f²-1/n_i²| eV — la formule de Rydberg, qui explique quantitativement toutes les raies du spectre de l'hydrogène."] },
    { test:/nombres quantiques n l m/i, replies:["La résolution de l'équation de Schrödinger en 3D pour l'atome d'hydrogène fait apparaître naturellement n, l et m — ils ne sont pas des règles arbitraires mais une conséquence directe des mathématiques du problème."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : cette dégénérescence en l et m est-elle générale ou spécifique à l'hydrogène ?","Indice niveau 2 : c'est spécifique au potentiel coulombien pur (un seul électron).","Indice niveau 3 : donc E_n ne dépend que de n pour l'hydrogène."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : n, l, m apparaissent-ils déjà dans la résolution 3D standard ?","Indice niveau 2 : oui, il manque encore un degré de liberté.","Indice niveau 3 : c'est le spin, révélé par Stern et Gerlach."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : combien d'électrons une orbitale peut-elle accueillir, et pourquoi exactement ce nombre ?","Indice niveau 2 : deux, de spins opposés.","Indice niveau 3 : au-delà, ils partageraient les 4 mêmes nombres quantiques — interdit par Pauli."] }
  ]
};

/* fusionne le module Introduction à la mécanique quantique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, QUANT_CHAPTERS);
Object.assign(NOVA_KB, QUANT_NOVA_KB);