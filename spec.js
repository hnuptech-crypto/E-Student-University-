/* =====================================================================
   CHUNK « spec » — registre SPEC_CHAPTERS / SPEC_NOVA_KB
   Matière(s) : Chimie|Spectroscopie
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   SPEC_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */




/* ===================================================================
   MATIÈRE — Spectroscopie (L3PF, domaine Chimie)
   Structure identique aux autres modules : SPEC_CHAPTERS / SPEC_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu : spectroscopie atomique (niveaux d'énergie, règles de
   sélection), spectroscopie rotationnelle (rotateur rigide), spectroscopie
   vibrationnelle (oscillateur harmonique/anharmonique), spectroscopie
   vibrationnelle-rotationnelle, spectroscopie électronique moléculaire
   (Franck-Condon), spectroscopie Raman, introduction aux lasers.
   S'appuie sur les modules déjà présents : Introduction à la mécanique
   quantique, Introduction à la chimie quantique, Théorie des groupes.
=================================================================== */
const SPEC_MATIERE = 'Spectroscopie';
function specPhysKey(chapterTitle){ return `Chimie|${SPEC_MATIERE}|${chapterTitle}`; }
const SPEC_CHAPTERS = {};
const SPEC_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Calculateur des niveaux d'énergie du rotateur rigide (Chapitre 2)
--------------------------------------------------------------------------------- */
function updateSpecRotor(){
  const B = parseFloat(document.getElementById('specB').value) || 1; // cm-1
  const Jmax = parseInt(document.getElementById('specJmax').value) || 5;
  const out = document.getElementById('specRotorReadout');
  let rows = '<table class="mini-table"><tr><th>J</th><th>E_J = B·J(J+1) (cm⁻¹)</th><th>Transition J→J+1 : ΔE (cm⁻¹)</th></tr>';
  for(let J=0; J<=Jmax; J++){
    const E = B*J*(J+1);
    const dE = B*2*(J+1);
    rows += `<tr><td>${J}</td><td>${E.toFixed(3)}</td><td>${J<Jmax ? dE.toFixed(3) : '—'}</td></tr>`;
  }
  rows += '</table>';
  out.innerHTML = `<p>Niveaux d'énergie rotationnels pour B = ${B} cm⁻¹ :</p>${rows}` +
    `<p style="margin-top:8px;">Les raies d'absorption successives (J→J+1) sont espacées de <strong>2B</strong> : ceci permet de déterminer B expérimentalement, puis le moment d'inertie et la distance interatomique.</p>`;
}
function initSpecRotor(){ updateSpecRotor(); }

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Calculateur des niveaux vibrationnels (oscillateur harmonique/anharmonique)
   (Chapitre 3)
--------------------------------------------------------------------------------- */
function updateSpecOscillator(){
  const we = parseFloat(document.getElementById('specWe').value) || 2000; // cm-1
  const wexe = parseFloat(document.getElementById('specWexe').value) || 20; // cm-1
  const vmax = parseInt(document.getElementById('specVmax').value) || 5;
  const out = document.getElementById('specOscillatorReadout');
  let rows = '<table class="mini-table"><tr><th>v</th><th>E(harmonique) (cm⁻¹)</th><th>E(anharmonique) (cm⁻¹)</th></tr>';
  for(let v=0; v<=vmax; v++){
    const Eharm = we*(v+0.5);
    const Eanh = we*(v+0.5) - wexe*(v+0.5)*(v+0.5);
    rows += `<tr><td>${v}</td><td>${Eharm.toFixed(1)}</td><td>${Eanh.toFixed(1)}</td></tr>`;
  }
  rows += '</table>';
  out.innerHTML = `<p>Niveaux vibrationnels pour ωe=${we} cm⁻¹, ωexe=${wexe} cm⁻¹ :</p>${rows}` +
    `<p style="margin-top:8px;">Notez l'écart CONSTANT entre niveaux harmoniques successifs (ωe), contre l'écart qui DIMINUE progressivement pour le modèle anharmonique (réaliste) à mesure que v augmente — jusqu'à la dissociation.</p>`;
}
function initSpecOscillator(){ updateSpecOscillator(); }

/* =========================== CHAPITRE 1 =========================== */
SPEC_CHAPTERS[specPhysKey("Interaction rayonnement-matière et spectroscopie atomique")] = {
  objectives: [
    "Décrire les trois processus fondamentaux d'interaction rayonnement-matière (absorption, émission spontanée, émission stimulée)",
    "Rappeler la quantification des niveaux d'énergie atomiques et la condition de résonance de Bohr-Einstein",
    "Établir la règle de sélection dipolaire électrique pour l'atome d'hydrogène",
    "Distinguer les différents domaines spectraux (radio, micro-ondes, IR, visible, UV, X) et les types de transition associés"
  ],
  prereqs: ["Introduction à la mécanique quantique non relativiste", "Introduction à la chimie quantique"],
  bodyHtml: `
    <p>La spectroscopie étudie l'interaction entre le rayonnement électromagnétique et la matière, aux échelles atomique et moléculaire, pour en sonder la structure énergétique. Ce premier chapitre pose les fondements physiques communs à toutes les formes de spectroscopie abordées dans ce module — rotationnelle, vibrationnelle, électronique — en s'appuyant directement sur les acquis du module de mécanique quantique de ce semestre.</p>

    <h3>1. Trois processus fondamentaux d'interaction rayonnement-matière</h3>
    <p>Einstein a montré, dès 1917, que l'interaction entre un système quantique à deux niveaux d'énergie $E_1 < E_2$ et un champ de rayonnement se ramène à trois processus élémentaires :</p>
    <table class="mini-table">
      <tr><th>Processus</th><th>Description</th><th>Coefficient d'Einstein</th></tr>
      <tr><td>Absorption</td><td>le système passe de $E_1$ à $E_2$ en absorbant un photon d'énergie $h\\nu = E_2-E_1$</td><td>$B_{12}$</td></tr>
      <tr><td>Émission spontanée</td><td>le système passe spontanément de $E_2$ à $E_1$ en émettant un photon, sans stimulation extérieure</td><td>$A_{21}$</td></tr>
      <tr><td>Émission stimulée</td><td>un photon incident d'énergie $h\\nu=E_2-E_1$ stimule l'émission d'un second photon identique (même phase, même direction)</td><td>$B_{21}$</td></tr>
    </table>
    <p>C'est précisément ce troisième processus, l'<strong>émission stimulée</strong>, qui est à l'origine du fonctionnement des lasers, présenté au dernier chapitre de ce module.</p>

    <h3>2. Condition de résonance de Bohr-Einstein</h3>
    <p>Une transition entre deux niveaux d'énergie quantifiés $E_1$ et $E_2$ n'est possible qu'à la fréquence précise satisfaisant la <strong>condition de résonance</strong> :</p>
    <div class="formula-box">$$h\\nu = |E_2 - E_1| \\qquad \\text{ou de façon équivalente : } \\quad \\tilde{\\nu} = \\frac{|E_2-E_1|}{hc}$$</div>
    <p>où $\\tilde{\\nu}$ est le <strong>nombre d'onde</strong> (en cm⁻¹), unité privilégiée en spectroscopie car directement proportionnelle à l'énergie de transition.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La quantification des niveaux d'énergie — conséquence directe de la résolution de l'équation de Schrödinger pour chaque système physique, comme établi dans le module de mécanique quantique — est la raison fondamentale pour laquelle les spectres d'absorption ou d'émission sont constitués de raies discrètes, et non d'un continuum : seules certaines fréquences précises satisfont la condition de résonance.
    </div>

    <h3>3. Règles de sélection dipolaire électrique</h3>
    <p>Toutes les transitions autorisées par la condition de résonance en énergie ne sont pas pour autant observées expérimentalement : encore faut-il que le <strong>moment de transition dipolaire</strong> $\\vec{\\mu}_{12} = \\langle \\psi_1 | \\hat{\\mu} | \\psi_2 \\rangle$ soit non nul. Pour l'atome d'hydrogène, cette condition se traduit par les <strong>règles de sélection</strong> :</p>
    <div class="formula-box">$$\\Delta l = \\pm 1 \\qquad \\Delta m_l = 0, \\pm 1$$</div>
    <p>Une transition qui viole ces règles est dite « interdite » : elle n'est pas totalement impossible, mais sa probabilité devient extrêmement faible (elle nécessite un mécanisme d'ordre supérieur — transition quadripolaire, par exemple), ce qui la rend généralement inobservable en spectroscopie d'absorption/émission standard.</p>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> la transition $2s \\to 1s$ de l'atome d'hydrogène (souvent invoquée en astrophysique) est-elle permise par la règle de sélection dipolaire électrique ?</p>
      <p><strong>Solution :</strong> l'état $2s$ a $l=0$, l'état $1s$ a également $l=0$ : $\\Delta l = 0$, ce qui viole la règle $\\Delta l=\\pm1$.</p>
      <p class="example-answer">Réponse : la transition $2s \\to 1s$ est interdite au dipôle électrique — c'est pourquoi elle est extrêmement lente (durée de vie de l'ordre de 0,1 seconde, contre la nanoseconde typique des transitions permises), et se produit essentiellement par un processus à deux photons.</p>
    </div>

    <h3>4. Domaines spectraux et types de transition</h3>
    <table class="mini-table">
      <tr><th>Domaine spectral</th><th>Gamme approximative</th><th>Type de transition sondée</th></tr>
      <tr><td>Micro-ondes</td><td>0,03 – 300 cm⁻¹</td><td>rotation moléculaire (chapitre 2)</td></tr>
      <tr><td>Infrarouge</td><td>300 – 12 500 cm⁻¹</td><td>vibration moléculaire (chapitres 3-4)</td></tr>
      <tr><td>Visible-UV</td><td>12 500 – 100 000 cm⁻¹</td><td>transitions électroniques (chapitre 5)</td></tr>
      <tr><td>Rayons X</td><td>&gt;100 000 cm⁻¹</td><td>transitions électroniques de cœur (cf. module cristallochimie)</td></tr>
    </table>
    <p>Cette hiérarchie énergétique reflète directement la hiérarchie des échelles d'énergie moléculaires — rotation ≪ vibration ≪ transitions électroniques — qui structure l'ensemble de ce module.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>3 processus d'Einstein : absorption (B12), émission spontanée (A21), émission stimulée (B21) — cette dernière est le principe du laser</li>
        <li>Condition de résonance de Bohr : hν = |E2−E1|, à l'origine des spectres de raies discrètes</li>
        <li>Règles de sélection dipolaire de l'hydrogène : Δl=±1, Δml=0,±1 ; une transition qui les viole est dite « interdite » (très peu probable, pas impossible)</li>
        <li>Hiérarchie des domaines spectraux : micro-ondes (rotation) ≪ IR (vibration) ≪ visible-UV (électronique)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre émission spontanée (aléatoire, sans photon incident) et émission stimulée (déclenchée par un photon incident, produisant un photon identique)</li>
        <li>Croire qu'une transition « interdite » est totalement impossible : elle reste possible mais avec une probabilité beaucoup plus faible que les transitions permises</li>
        <li>Oublier que le nombre d'onde (cm⁻¹), très utilisé en spectroscopie, est directement proportionnel à l'énergie (donc à la fréquence), et non à la longueur d'onde elle-même</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le processus à l'origine du fonctionnement du laser est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec1e1" value="wrong"> l'absorption</label>
          <label class="option"><input type="radio" name="spec1e1" value="wrong"> l'émission spontanée</label>
          <label class="option"><input type="radio" name="spec1e1" value="right"> l'émission stimulée</label>
          <label class="option"><input type="radio" name="spec1e1" value="wrong"> la diffusion Raman</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec1e1','spec1fb1','Correct — un photon incident stimule l émission d un second photon identique (même phase, même direction), à la base de l amplification laser.','L acronyme LASER contient lui-même la réponse : Light Amplification by Stimulated Emission of Radiation.')">Vérifier</button>
        <div class="feedback" id="spec1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La transition 2s→1s de l'atome d'hydrogène est interdite au dipôle électrique car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec1e2" value="wrong"> l'énergie de transition est nulle</label>
          <label class="option"><input type="radio" name="spec1e2" value="right"> Δl=0, ce qui viole la règle Δl=±1</label>
          <label class="option"><input type="radio" name="spec1e2" value="wrong"> les deux états ont la même énergie</label>
          <label class="option"><input type="radio" name="spec1e2" value="wrong"> le photon n'a pas assez d'énergie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec1e2','spec1fb2','Correct — les deux états 2s et 1s ont l=0, donc Delta l=0, ce qui viole la règle de sélection dipolaire électrique Delta l=plus ou moins 1.','Compare le nombre quantique azimutal l des deux états : 2s et 1s ont-ils le même l ?')">Vérifier</button>
        <div class="feedback" id="spec1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le domaine spectral associé aux transitions de rotation moléculaire est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec1e3" value="right"> les micro-ondes</label>
          <label class="option"><input type="radio" name="spec1e3" value="wrong"> l'infrarouge</label>
          <label class="option"><input type="radio" name="spec1e3" value="wrong"> le visible-UV</label>
          <label class="option"><input type="radio" name="spec1e3" value="wrong"> les rayons X</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec1e3','spec1fb3','Correct — les niveaux de rotation moléculaire, très faiblement espacés en énergie, correspondent au domaine des micro-ondes.','Classe les domaines par énergie croissante : rotation, vibration, puis transitions électroniques.')">Vérifier</button>
        <div class="feedback" id="spec1fb3"></div>
      </div>
    </div>
  `
};

SPEC_NOVA_KB[specPhysKey("Interaction rayonnement-matière et spectroscopie atomique")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Interaction rayonnement-matière et spectroscopie atomique ». Demande-moi les 3 processus d'Einstein, les règles de sélection, ou un indice sur un exercice.",
  rules: [
    { test:/absorption|[ée]mission spontan[ée]e|[ée]mission stimul[ée]e|processus.*einstein/i, replies:["Les 3 processus d'Einstein : absorption (B12), émission spontanée (A21, aléatoire), émission stimulée (B21, déclenchée par un photon incident, produit un photon identique — principe du laser)."] },
    { test:/r[èe]sonance.*bohr|hν\s*=/i, replies:["La condition de résonance de Bohr-Einstein : hν = |E2−E1|. Comme les niveaux d'énergie sont quantifiés, seules certaines fréquences précises satisfont cette condition, d'où des spectres de raies discrètes."] },
    { test:/r[èe]gle.*s[ée]lection|delta l|Δl/i, replies:["Pour l'atome d'hydrogène, la règle de sélection dipolaire électrique impose Δl=±1 et Δml=0,±1. Une transition qui les viole est dite 'interdite' (très peu probable, pas impossible)."] },
    { test:/nombre d'onde|cm.?1/i, replies:["Le nombre d'onde (en cm⁻¹) est directement proportionnel à l'énergie de transition, ce qui en fait l'unité privilégiée en spectroscopie plutôt que la longueur d'onde."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le nom du laser lui-même donne un indice.","Indice niveau 2 : LASER = Light Amplification by Stimulated Emission of Radiation.","Indice niveau 3 : c'est l'émission stimulée."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare le nombre quantique l des deux états.","Indice niveau 2 : 2s et 1s ont tous deux l=0.","Indice niveau 3 : Δl=0 viole la règle Δl=±1."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : classe les domaines par énergie croissante.","Indice niveau 2 : la rotation est le mouvement le moins énergétique.","Indice niveau 3 : ce sont les micro-ondes."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
SPEC_CHAPTERS[specPhysKey('Spectroscopie rotationnelle : le rotateur rigide')] = {
  objectives: [
    "Établir les niveaux d'énergie du rotateur rigide à partir de la résolution de l'équation de Schrödinger",
    "Énoncer la règle de sélection ΔJ=±1 et en déduire le spectre de raies équidistantes",
    "Relier la constante rotationnelle B au moment d'inertie et à la distance interatomique d'une molécule diatomique",
    "Décrire qualitativement l'effet de la distorsion centrifuge sur le spectre rotationnel"
  ],
  prereqs: ["Interaction rayonnement-matière et spectroscopie atomique", "Introduction à la mécanique quantique non relativiste"],
  bodyHtml: `
    <p>La spectroscopie rotationnelle, observée dans le domaine des micro-ondes, sonde le mouvement de rotation d'ensemble d'une molécule. Ce chapitre traite le cas le plus simple, le <strong>rotateur rigide</strong>, modèle de base pour l'étude d'une molécule diatomique, et en extrait une information structurale directe : la distance interatomique.</p>

    <h3>1. Le modèle du rotateur rigide</h3>
    <p>On modélise une molécule diatomique par deux masses ponctuelles $m_1$ et $m_2$ séparées par une distance fixe $r_e$ (rigidité de la liaison), en rotation libre autour de leur centre de masse. Ce système se ramène, par changement de repère, à une particule unique de <strong>masse réduite</strong> $\\mu = \\dfrac{m_1 m_2}{m_1+m_2}$ tournant à distance $r_e$ d'un centre fixe, dont le <strong>moment d'inertie</strong> est $I = \\mu r_e^2$.</p>
    <p>La résolution de l'équation de Schrödinger pour ce système (dont le formalisme mathématique est identique à celui de la partie angulaire de l'atome d'hydrogène, déjà rencontrée dans le module de chimie quantique) donne des niveaux d'énergie quantifiés par le nombre quantique rotationnel $J=0,1,2,\\ldots$ :</p>
    <div class="formula-box">$$E_J = B\\,J(J+1), \\qquad B = \\frac{h}{8\\pi^2 c I} \\quad \\text{(constante rotationnelle, en cm}^{-1}\\text{)}$$</div>
    <p>Chaque niveau $J$ possède une <strong>dégénérescence</strong> $g_J = 2J+1$, correspondant aux $2J+1$ orientations possibles du moment cinétique de rotation dans l'espace (nombre quantique $M_J = -J,\\ldots,+J$).</p>

    <h3>2. Règle de sélection et spectre de raies équidistantes</h3>
    <p>Pour qu'une molécule présente un spectre rotationnel actif en absorption, elle doit posséder un <strong>moment dipolaire électrique permanent</strong> non nul (condition nécessaire, indépendante de la règle de sélection elle-même) — ce qui exclut par exemple les molécules diatomiques homonucléaires comme N₂ ou O₂. La règle de sélection rotationnelle est alors :</p>
    <div class="formula-box">$$\\Delta J = \\pm 1$$</div>
    <p>L'énergie de la transition $J \\to J+1$ vaut $\\Delta E = E_{J+1}-E_J = B\\big[(J+1)(J+2)-J(J+1)\\big] = 2B(J+1)$ : le spectre rotationnel se compose donc d'une série de raies <strong>équidistantes</strong>, séparées d'exactement $2B$.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — détermination expérimentale de la géométrie moléculaire</span>
      La mesure de l'espacement $2B$ entre raies rotationnelles successives donne directement accès à la constante $B$, donc au moment d'inertie $I=\\mu r_e^2$, et finalement à la <strong>distance interatomique</strong> $r_e$ — une information structurale d'une précision remarquable (souvent meilleure que le picomètre), obtenue par une mesure purement spectroscopique, sans avoir recours à la diffraction (module de cristallochimie).
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le spectre rotationnel de la molécule CO présente des raies espacées de $2B = 3{,}86$ cm⁻¹. Sachant que $\\mu(\\text{CO}) \\approx 1{,}139\\times10^{-26}$ kg, calculer la distance interatomique $r_e$.</p>
      <p><strong>Solution :</strong> $B = 1{,}93$ cm⁻¹ $= 193$ m⁻¹. De $B=\\dfrac{h}{8\\pi^2cI}$, on tire $I = \\dfrac{h}{8\\pi^2cB}$. Avec $h=6{,}626\\times10^{-34}$ J·s et $c=3\\times10^{10}$ cm/s : $I \\approx 1{,}45\\times10^{-46}$ kg·m². Puis $r_e = \\sqrt{I/\\mu} = \\sqrt{1{,}45\\times10^{-46}/1{,}139\\times10^{-26}}$.</p>
      <p class="example-answer">Réponse : $r_e \\approx 1{,}13\\times10^{-10}$ m $= 113$ pm, en excellent accord avec la valeur bien établie de la longueur de liaison C≡O.</p>
    </div>

    <h3>3. Distorsion centrifuge : au-delà du rotateur rigide</h3>
    <p>Le modèle du rotateur parfaitement rigide est une approximation : en réalité, la liaison chimique s'étire légèrement sous l'effet de la force centrifuge à mesure que la molécule tourne plus vite (J croissant), ce qui abaisse légèrement les niveaux d'énergie par rapport à la prédiction du modèle rigide. On corrige cet effet par un terme de <strong>distorsion centrifuge</strong> :</p>
    <div class="formula-box">$$E_J = B\\,J(J+1) - D\\,J^2(J+1)^2, \\qquad D \\ll B$$</div>
    <p>Cette correction, bien que faible (typiquement $D/B \\sim 10^{-4}$ à $10^{-6}$), devient mesurable aux valeurs élevées de $J$, et fournit une information supplémentaire sur la rigidité de la liaison chimique (sa constante de force, chapitre 3).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Rotateur rigide : E_J = B·J(J+1), avec B=h/(8π²cI) et I=μr_e² (moment d'inertie)</li>
        <li>Condition nécessaire : moment dipolaire permanent non nul (exclut N2, O2...) ; règle de sélection : ΔJ=±1</li>
        <li>Spectre de raies équidistantes, espacées de 2B — mesure directe de B, donc de I, donc de la distance interatomique r_e</li>
        <li>Distorsion centrifuge : correction −D·J²(J+1)² qui devient sensible aux grandes valeurs de J</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la condition de moment dipolaire permanent : les molécules diatomiques homonucléaires (N2, O2, H2) n'ont pas de spectre rotationnel actif en absorption IR/micro-ondes</li>
        <li>Confondre l'espacement des raies (2B) avec la valeur de la constante rotationnelle B elle-même</li>
        <li>Utiliser la masse totale de la molécule au lieu de la masse RÉDUITE μ dans le calcul du moment d'inertie</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — niveaux d'énergie du rotateur rigide</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre la constante rotationnelle B pour afficher les niveaux d'énergie et les transitions J→J+1.</p>
      <div class="sim-controls">
        <label>B (cm⁻¹) : <input type="number" id="specB" value="1.93" step="0.01" style="width:70px;" oninput="updateSpecRotor()"></label>
        <label>J max : <input type="number" id="specJmax" value="5" min="1" max="10" style="width:55px;" oninput="updateSpecRotor()"></label>
        <div class="sim-readout" id="specRotorReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Une molécule doit posséder, pour présenter un spectre rotationnel actif en absorption :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec2e1" value="wrong"> une masse molaire élevée</label>
          <label class="option"><input type="radio" name="spec2e1" value="right"> un moment dipolaire électrique permanent</label>
          <label class="option"><input type="radio" name="spec2e1" value="wrong"> un centre d'inversion</label>
          <label class="option"><input type="radio" name="spec2e1" value="wrong"> exactement deux atomes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec2e1','spec2fb1','Correct — sans moment dipolaire permanent, la molécule ne peut pas interagir avec le champ électrique du rayonnement de cette façon : N2 et O2 n ont pas de spectre rotationnel actif.','Pense à pourquoi N2 et O2, bien que diatomiques, n ont pas de spectre rotationnel actif.')">Vérifier</button>
        <div class="feedback" id="spec2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">L'espacement entre deux raies rotationnelles successives d'un spectre de rotateur rigide vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec2e2" value="wrong"> B</label>
          <label class="option"><input type="radio" name="spec2e2" value="right"> 2B</label>
          <label class="option"><input type="radio" name="spec2e2" value="wrong"> B²</label>
          <label class="option"><input type="radio" name="spec2e2" value="wrong"> B/2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec2e2','spec2fb2','Correct — Delta E = 2B(J+1), donc l espacement entre raies consécutives (J vers J+1 puis J+1 vers J+2) est constant et vaut exactement 2B.','Calcule Delta E = E(J+1) moins E(J) : que reste-t-il après simplification ?')">Vérifier</button>
        <div class="feedback" id="spec2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La distorsion centrifuge, par rapport au modèle du rotateur rigide, a pour effet de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec2e3" value="wrong"> augmenter les niveaux d'énergie</label>
          <label class="option"><input type="radio" name="spec2e3" value="right"> abaisser légèrement les niveaux d'énergie, surtout à J élevé</label>
          <label class="option"><input type="radio" name="spec2e3" value="wrong"> rendre le spectre totalement inobservable</label>
          <label class="option"><input type="radio" name="spec2e3" value="wrong"> supprimer la règle de sélection ΔJ=±1</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec2e3','spec2fb3','Correct — l étirement centrifuge de la liaison, plus marqué à J élevé, abaisse légèrement l énergie par rapport au modèle rigide (terme correctif négatif -D·J²(J+1)²).','Le terme correctif est soustractif (-D·J²(J+1)²) : quel est son effet sur l énergie ?')">Vérifier</button>
        <div class="feedback" id="spec2fb3"></div>
      </div>
    </div>
  `,
  init: initSpecRotor
};

SPEC_NOVA_KB[specPhysKey('Spectroscopie rotationnelle : le rotateur rigide')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Spectroscopie rotationnelle : le rotateur rigide ». Demande-moi la formule E_J, la règle de sélection, ou un indice sur un exercice.",
  rules: [
    { test:/rotateur rigide|e_j|niveaux.*rotation/i, replies:["Le rotateur rigide a pour niveaux d'énergie E_J = B·J(J+1), avec B=h/(8π²cI) et I=μr_e² le moment d'inertie (μ étant la masse réduite)."] },
    { test:/moment dipolaire|actif.*rotation/i, replies:["Une molécule doit posséder un moment dipolaire électrique PERMANENT pour avoir un spectre rotationnel actif en absorption — ce qui exclut les diatomiques homonucléaires comme N2 ou O2."] },
    { test:/delta j|règle de sélection.*rotation/i, replies:["La règle de sélection rotationnelle est ΔJ=±1, ce qui donne un spectre de raies équidistantes, espacées de 2B."] },
    { test:/2b|espacement.*raies/i, replies:["L'espacement entre deux raies rotationnelles successives est constant et vaut exactement 2B — sa mesure donne directement accès à la constante rotationnelle B, donc à la distance interatomique."] },
    { test:/distorsion centrifuge/i, replies:["La distorsion centrifuge corrige le modèle rigide par un terme −D·J²(J+1)² : la liaison s'étire sous l'effet de la rotation, abaissant légèrement l'énergie, surtout aux grandes valeurs de J."] },
    { test:/masse r[ée]duite/i, replies:["La masse réduite μ = m1m2/(m1+m2) ramène le problème à deux corps (rotation autour du centre de masse) à un problème à un seul corps, de moment d'inertie I=μr_e²."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à pourquoi N2 et O2 n'ont pas de spectre rotationnel actif.","Indice niveau 2 : c'est lié à leur symétrie (pas de dipôle).","Indice niveau 3 : il faut un moment dipolaire électrique permanent."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : calcule ΔE = E(J+1) − E(J) explicitement.","Indice niveau 2 : après simplification, il ne reste qu'un terme en (J+1).","Indice niveau 3 : l'espacement constant vaut 2B."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : regarde le signe du terme correctif.","Indice niveau 2 : le terme −D·J²(J+1)² est soustractif.","Indice niveau 3 : les niveaux sont légèrement abaissés, surtout à J élevé."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
SPEC_CHAPTERS[specPhysKey("Spectroscopie vibrationnelle : l'oscillateur harmonique et anharmonique")] = {
  objectives: [
    "Établir les niveaux d'énergie de l'oscillateur harmonique quantique et sa règle de sélection",
    "Relier la fréquence de vibration à la constante de force et à la masse réduite",
    "Décrire le potentiel de Morse comme modèle réaliste de la liaison chimique, au-delà de l'approximation harmonique",
    "Relier l'énergie de dissociation aux paramètres spectroscopiques ωe et ωexe"
  ],
  prereqs: ["Spectroscopie rotationnelle : le rotateur rigide", "Introduction à la mécanique quantique non relativiste"],
  bodyHtml: `
    <p>La spectroscopie vibrationnelle, observée dans le domaine infrarouge, sonde le mouvement d'étirement (et, pour les molécules polyatomiques, de déformation angulaire) de la liaison chimique. Ce chapitre reprend le modèle de l'oscillateur harmonique quantique, déjà étudié dans le module de mécanique quantique, et l'applique à la vibration moléculaire, avant d'introduire les corrections anharmoniques indispensables pour décrire fidèlement une liaison chimique réelle.</p>

    <h3>1. L'oscillateur harmonique quantique appliqué à la vibration moléculaire</h3>
    <p>On modélise la liaison chimique d'une molécule diatomique comme un ressort de <strong>constante de force</strong> $k$ reliant deux masses de masse réduite $\\mu$. La résolution de l'équation de Schrödinger pour ce potentiel harmonique $V(x)=\\frac{1}{2}kx^2$ donne des niveaux d'énergie <strong>équidistants</strong>, indexés par le nombre quantique vibrationnel $v=0,1,2,\\ldots$ :</p>
    <div class="formula-box">$$E_v = h\\nu_e\\left(v+\\frac{1}{2}\\right), \\qquad \\nu_e = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{\\mu}}$$</div>
    <p>Un résultat remarquable, déjà rencontré en mécanique quantique : même dans l'état fondamental ($v=0$), l'énergie n'est pas nulle mais vaut $\\dfrac{1}{2}h\\nu_e$ — c'est l'<strong>énergie de point zéro</strong>, conséquence directe du principe d'incertitude de Heisenberg, qui interdit à la molécule d'être parfaitement immobile même au zéro absolu.</p>
    <p>La règle de sélection de l'oscillateur harmonique est $\\Delta v = \\pm 1$ ; comme les niveaux sont équidistants, toutes les transitions permises ($v=0\\to1$, $v=1\\to2$...) ont, dans ce modèle idéalisé, exactement la même fréquence $\\nu_e$.</p>

    <h3>2. Limites du modèle harmonique : le potentiel de Morse</h3>
    <p>Le potentiel harmonique $V(x)=\\frac{1}{2}kx^2$ croît indéfiniment avec l'écartement, ce qui est physiquement irréaliste : une liaison chimique réelle finit par se rompre (dissociation) au-delà d'une certaine élongation. Le <strong>potentiel de Morse</strong> offre une description beaucoup plus fidèle :</p>
    <div class="formula-box">$$V(r) = D_e\\left[1-e^{-a(r-r_e)}\\right]^2$$</div>
    <p>où $D_e$ est la profondeur du puits de potentiel (énergie de dissociation mesurée depuis le minimum du potentiel) et $r_e$ la distance d'équilibre. Ce potentiel, asymétrique et borné, redonne l'oscillateur harmonique en développement limité au voisinage du minimum, mais s'aplatit correctement à grande distance (dissociation) et se durcit fortement à courte distance (répulsion des cœurs atomiques).</p>

    <h3>3. Niveaux d'énergie anharmoniques</h3>
    <p>La résolution de l'équation de Schrödinger pour le potentiel de Morse donne des niveaux d'énergie corrigés, non plus équidistants mais progressivement <strong>resserrés</strong> à mesure que $v$ augmente :</p>
    <div class="formula-box">$$E_v = h c\\left[\\omega_e\\left(v+\\frac{1}{2}\\right) - \\omega_e x_e\\left(v+\\frac{1}{2}\\right)^2\\right]$$</div>
    <p>où $\\omega_e$ (en cm⁻¹) est la fréquence de vibration harmonique, et $\\omega_e x_e \\ll \\omega_e$ la <strong>constante d'anharmonicité</strong>, toujours positive, traduisant le resserrement progressif des niveaux.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — détermination de l'énergie de dissociation</span>
      Au fur et à mesure que $v$ augmente, les niveaux se resserrent jusqu'à converger vers le seuil de dissociation, où le spectre discret de raies laisse place à un continuum. Une extrapolation classique (méthode de Birge-Sponer) permet, à partir des seuls écarts entre niveaux vibrationnels mesurés à basse énergie, d'estimer l'<strong>énergie de dissociation</strong> $D_0 \\approx \\dfrac{\\omega_e^2}{4\\omega_e x_e}$ — une méthode spectroscopique élégante pour accéder à une grandeur thermochimique fondamentale sans avoir à observer directement la dissociation.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour la molécule HCl, $\\omega_e = 2990$ cm⁻¹ et $\\omega_e x_e = 52{,}8$ cm⁻¹. Calculer les énergies des trois premiers niveaux vibrationnels et comparer l'écart $E_1-E_0$ à l'écart $E_2-E_1$.</p>
      <p><strong>Solution :</strong> $E_0 = 2990(0{,}5)-52{,}8(0{,}5)^2 = 1495-13{,}2=1481{,}8$ cm⁻¹. $E_1=2990(1{,}5)-52{,}8(1{,}5)^2=4485-118{,}8=4366{,}2$ cm⁻¹. $E_2=2990(2{,}5)-52{,}8(2{,}5)^2=7475-330=7145$ cm⁻¹.</p>
      <p class="example-answer">Réponse : $E_1-E_0 = 2884{,}4$ cm⁻¹, tandis que $E_2-E_1=2778{,}8$ cm⁻¹ : l'écart diminue bien progressivement, confirmant le resserrement anharmonique des niveaux — l'outil interactif ci-dessous permet d'explorer ce comportement pour d'autres molécules.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Oscillateur harmonique : E_v = hνe(v+1/2), niveaux équidistants, énergie de point zéro non nulle même en v=0</li>
        <li>Potentiel de Morse : modèle réaliste, borné, avec dissociation à grande distance</li>
        <li>Niveaux anharmoniques : E_v = hc[ωe(v+1/2) − ωexe(v+1/2)²], écarts qui diminuent progressivement quand v augmente</li>
        <li>Méthode de Birge-Sponer : D0 ≈ ωe²/(4ωexe), estimation de l'énergie de dissociation par extrapolation spectroscopique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que l'énergie du niveau fondamental (v=0) est nulle : elle vaut toujours hνe/2 (énergie de point zéro), conséquence du principe d'incertitude</li>
        <li>Utiliser le modèle harmonique (niveaux équidistants) pour prédire un spectre de raies de vibration à haute résolution : les corrections anharmoniques deviennent rapidement nécessaires</li>
        <li>Oublier que la constante d'anharmonicité ωexe est toujours positive dans cette convention, ce qui RESSERRE (et non écarte) les niveaux à mesure que v augmente</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — niveaux vibrationnels harmoniques vs anharmoniques</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Compare le modèle harmonique (niveaux équidistants) et le modèle anharmonique réaliste (niveaux resserrés).</p>
      <div class="sim-controls">
        <label>ωe (cm⁻¹) : <input type="number" id="specWe" value="2990" style="width:70px;" oninput="updateSpecOscillator()"></label>
        <label>ωexe (cm⁻¹) : <input type="number" id="specWexe" value="52.8" style="width:70px;" oninput="updateSpecOscillator()"></label>
        <label>v max : <input type="number" id="specVmax" value="5" min="1" max="10" style="width:55px;" oninput="updateSpecOscillator()"></label>
        <div class="sim-readout" id="specOscillatorReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">L'énergie du niveau vibrationnel fondamental (v=0) de l'oscillateur harmonique quantique est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec3e1" value="wrong"> nulle</label>
          <label class="option"><input type="radio" name="spec3e1" value="right"> hνe/2 (énergie de point zéro)</label>
          <label class="option"><input type="radio" name="spec3e1" value="wrong"> hνe</label>
          <label class="option"><input type="radio" name="spec3e1" value="wrong"> 2hνe</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec3e1','spec3fb1','Correct — c est l énergie de point zéro, conséquence directe du principe d incertitude de Heisenberg : la molécule ne peut jamais être parfaitement immobile.','Repense au principe d incertitude de Heisenberg : une molécule peut-elle être parfaitement immobile, même à v=0 ?')">Vérifier</button>
        <div class="feedback" id="spec3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Avec l'anharmonicité, l'écart entre niveaux vibrationnels successifs, quand v augmente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec3e2" value="wrong"> augmente</label>
          <label class="option"><input type="radio" name="spec3e2" value="right"> diminue</label>
          <label class="option"><input type="radio" name="spec3e2" value="wrong"> reste constant</label>
          <label class="option"><input type="radio" name="spec3e2" value="wrong"> devient négatif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec3e2','spec3fb2','Correct — le terme correctif -ωexe(v+1/2)² resserre progressivement les niveaux, jusqu à convergence vers le seuil de dissociation.','Le terme anharmonique est soustractif et croît avec v : quel effet cela a-t-il sur l écart entre niveaux successifs ?')">Vérifier</button>
        <div class="feedback" id="spec3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le potentiel de Morse, contrairement au potentiel harmonique, permet de décrire correctement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec3e3" value="wrong"> uniquement le niveau fondamental</label>
          <label class="option"><input type="radio" name="spec3e3" value="right"> la dissociation de la liaison à grande distance</label>
          <label class="option"><input type="radio" name="spec3e3" value="wrong"> uniquement les molécules polyatomiques</label>
          <label class="option"><input type="radio" name="spec3e3" value="wrong"> les transitions électroniques</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec3e3','spec3fb3','Correct — contrairement au potentiel harmonique qui croît indéfiniment, le potentiel de Morse s aplatit à grande distance, décrivant correctement la rupture de la liaison chimique.','Le potentiel harmonique croît indéfiniment, ce qui est irréaliste à grande élongation : que se passe-t-il physiquement quand on étire trop une liaison ?')">Vérifier</button>
        <div class="feedback" id="spec3fb3"></div>
      </div>
    </div>
  `,
  init: initSpecOscillator
};

SPEC_NOVA_KB[specPhysKey("Spectroscopie vibrationnelle : l'oscillateur harmonique et anharmonique")] = {
  intro: "Salut, moi c'est Nova ! On est sur « Spectroscopie vibrationnelle ». Demande-moi l'énergie de point zéro, le potentiel de Morse, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]nergie de point z[ée]ro|point zero/i, replies:["L'énergie de point zéro (E0 = hνe/2) est l'énergie du niveau fondamental v=0, jamais nulle : conséquence du principe d'incertitude de Heisenberg, qui interdit à la molécule d'être parfaitement immobile."] },
    { test:/morse|potentiel.*r[ée]aliste/i, replies:["Le potentiel de Morse V(r)=De[1−e^(−a(r−re))]² décrit correctement la dissociation de la liaison à grande distance, contrairement au potentiel harmonique qui croît indéfiniment."] },
    { test:/anharmonique|anharmonicit[ée]/i, replies:["Les niveaux anharmoniques E_v=hc[ωe(v+1/2)−ωexe(v+1/2)²] se resserrent progressivement quand v augmente, jusqu'à converger vers le seuil de dissociation."] },
    { test:/birge.?sponer|[ée]nergie de dissociation/i, replies:["La méthode de Birge-Sponer estime l'énergie de dissociation D0 ≈ ωe²/(4ωexe), à partir des seuls écarts entre niveaux vibrationnels mesurés."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : repense au principe d'incertitude de Heisenberg.","Indice niveau 2 : la molécule ne peut jamais être parfaitement immobile.","Indice niveau 3 : l'énergie du niveau v=0 est hνe/2."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le terme anharmonique est soustractif et croît avec v.","Indice niveau 2 : cela resserre progressivement les niveaux.","Indice niveau 3 : l'écart diminue quand v augmente."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense à ce qui arrive physiquement quand on étire trop une liaison.","Indice niveau 2 : le potentiel harmonique ne peut pas décrire cela (il croît indéfiniment).","Indice niveau 3 : le potentiel de Morse décrit correctement la dissociation."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
SPEC_CHAPTERS[specPhysKey('Spectroscopie vibration-rotation des molécules diatomiques')] = {
  objectives: [
    "Construire le spectre de vibration-rotation à partir de la combinaison des niveaux rotationnels et vibrationnels",
    "Distinguer les branches P et R d'un spectre de vibration-rotation",
    "Expliquer l'absence de raie centrale (branche Q manquante) pour une molécule diatomique",
    "Extraire les paramètres moléculaires (B, r_e) directement d'un spectre infrarouge à haute résolution"
  ],
  prereqs: ["Spectroscopie rotationnelle : le rotateur rigide", "Spectroscopie vibrationnelle : l'oscillateur harmonique et anharmonique"],
  bodyHtml: `
    <p>En pratique expérimentale, une molécule vibre ET tourne simultanément : le spectre infrarouge observé à haute résolution ne se limite donc pas à une seule raie de vibration, mais présente une structure fine, résultant de la combinaison des niveaux rotationnels étudiés au chapitre 2 avec les niveaux vibrationnels du chapitre 3. Ce chapitre construit ce spectre combiné et explique sa structure caractéristique en deux branches.</p>

    <h3>1. Niveaux combinés rovibrationnels</h3>
    <p>Dans l'approximation où rotation et vibration sont indépendantes (approximation de Born-Oppenheimer appliquée aux mouvements nucléaires, déjà rencontrée dans le module de chimie quantique), l'énergie totale d'un niveau caractérisé par $(v,J)$ s'écrit simplement comme la somme des contributions vibrationnelle et rotationnelle :</p>
    <div class="formula-box">$$E_{v,J} = hc\\left[\\omega_e\\left(v+\\tfrac{1}{2}\\right) + B\\,J(J+1)\\right]$$</div>
    <p>Une transition vibrationnelle fondamentale ($v=0\\to1$) s'accompagne alors nécessairement d'un changement simultané de $J$, régi par la même règle de sélection $\\Delta J=\\pm1$ que pour la rotation pure (chapitre 2) — mais avec, cette fois, deux issues possibles selon le signe de $\\Delta J$.</p>

    <h3>2. Les branches P et R</h3>
    <p>On distingue deux séries de raies selon le signe de $\\Delta J$ :</p>
    <table class="mini-table">
      <tr><th>Branche</th><th>Condition</th><th>Position par rapport à la fréquence de vibration pure ν0</th></tr>
      <tr><td>Branche P</td><td>$\\Delta J = -1$ (J diminue)</td><td>en dessous de ν0 (nombre d'onde plus faible)</td></tr>
      <tr><td>Branche R</td><td>$\\Delta J = +1$ (J augmente)</td><td>au-dessus de ν0 (nombre d'onde plus élevé)</td></tr>
    </table>
    <p>La position des raies de chaque branche, en fonction du niveau rotationnel initial $J''$ (état inférieur), s'écrit :</p>
    <div class="formula-box">$$\\tilde{\\nu}_R(J'') = \\nu_0 + 2B(J''+1), \\qquad \\tilde{\\nu}_P(J'') = \\nu_0 - 2B\\,J''$$</div>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'absence de branche Q pour une molécule diatomique</span>
      Contrairement à une transition rotationnelle pure (où seul $\\Delta J=\\pm1$ est permis), on pourrait imaginer une transition purement vibrationnelle avec $\\Delta J=0$ (« branche Q », raie centrale à $\\nu_0$). Or, pour une molécule diatomique, le moment angulaire total doit être conservé lors de la transition, et la règle de sélection $\\Delta J=\\pm1$ (identique à celle de la rotation pure) interdit strictement $\\Delta J=0$ : la branche Q est donc <strong>absente</strong>, laissant un « trou » caractéristique au centre du spectre, exactement à la position $\\nu_0$ de la transition vibrationnelle pure (qui elle-même n'est jamais observée directement).
    </div>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 260 120" width="100%">
          <line x1="10" y1="90" x2="250" y2="90" stroke="#122043" stroke-width="1.2"/>
          <line x1="130" y1="15" x2="130" y2="90" stroke="#8064F2" stroke-width="1" stroke-dasharray="3,2"/>
          <text x="105" y="12" font-family="IBM Plex Mono" font-size="9" fill="#8064F2">ν0 (absent)</text>
          <line x1="60" y1="30" x2="60" y2="90" stroke="#F0555C" stroke-width="2"/>
          <line x1="80" y1="45" x2="80" y2="90" stroke="#F0555C" stroke-width="2"/>
          <line x1="100" y1="60" x2="100" y2="90" stroke="#F0555C" stroke-width="2"/>
          <line x1="160" y1="60" x2="160" y2="90" stroke="#1FB6A8" stroke-width="2"/>
          <line x1="180" y1="45" x2="180" y2="90" stroke="#1FB6A8" stroke-width="2"/>
          <line x1="200" y1="30" x2="200" y2="90" stroke="#1FB6A8" stroke-width="2"/>
          <text x="70" y="105" font-family="IBM Plex Mono" font-size="10" fill="#F0555C">Branche P</text>
          <text x="165" y="105" font-family="IBM Plex Mono" font-size="10" fill="#1FB6A8">Branche R</text>
        </svg>
        <span>Structure typique d'une bande de vibration-rotation : branches P et R symétriques, absence de raie centrale (Q)</span>
      </div>
    </div>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour HCl, $\\nu_0 = 2886$ cm⁻¹ et $B=10{,}59$ cm⁻¹. Calculer la position de la première raie de la branche R (transition depuis $J''=0$) et de la première raie de la branche P (transition depuis $J''=1$).</p>
      <p><strong>Solution :</strong> $\\tilde{\\nu}_R(0) = 2886 + 2\\times10{,}59\\times1 = 2886+21{,}18=2907{,}18$ cm⁻¹. $\\tilde{\\nu}_P(1) = 2886-2\\times10{,}59\\times1=2886-21{,}18=2864{,}82$ cm⁻¹.</p>
      <p class="example-answer">Réponse : les deux premières raies encadrent symétriquement la position théorique $\\nu_0=2886$ cm⁻¹, espacées chacune de $2B=21{,}18$ cm⁻¹ de ce centre absent — exactement la signature spectrale attendue.</p>
    </div>

    <h3>3. Détermination expérimentale de B et de r_e à partir du spectre IR</h3>
    <p>En mesurant les positions des raies successives de chaque branche sur un spectre infrarouge à haute résolution, on accède directement à la constante rotationnelle $B$ (par l'espacement caractéristique $2B$ entre raies successives d'une même branche), donc au moment d'inertie et à la distance interatomique — exactement comme en spectroscopie rotationnelle pure (chapitre 2), mais cette fois obtenue à partir d'un spectre infrarouge, plus accessible expérimentalement que le domaine des micro-ondes.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>E(v,J) = hc[ωe(v+1/2) + B·J(J+1)] : superposition des contributions vibrationnelle et rotationnelle</li>
        <li>Branche R (ΔJ=+1) : raies au-dessus de ν0 ; Branche P (ΔJ=−1) : raies en dessous de ν0</li>
        <li>Branche Q (ΔJ=0) ABSENTE pour une molécule diatomique : conservation du moment angulaire, ΔJ=±1 strictement</li>
        <li>Le spectre de vibration-rotation permet de déterminer B (donc r_e) à partir du domaine infrarouge, plus accessible que les micro-ondes</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que la raie centrale à ν0 est observée : elle est absente pour une molécule diatomique (pas de branche Q)</li>
        <li>Confondre branche P (ΔJ=−1, basses fréquences) et branche R (ΔJ=+1, hautes fréquences)</li>
        <li>Oublier que l'espacement entre raies consécutives d'une MÊME branche est 2B, comme en rotation pure</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La branche R d'un spectre de vibration-rotation correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec4e1" value="wrong"> ΔJ=0</label>
          <label class="option"><input type="radio" name="spec4e1" value="right"> ΔJ=+1</label>
          <label class="option"><input type="radio" name="spec4e1" value="wrong"> ΔJ=−1</label>
          <label class="option"><input type="radio" name="spec4e1" value="wrong"> ΔJ=±2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec4e1','spec4fb1','Correct — la branche R (Delta J=+1) correspond aux raies situées au-dessus de la fréquence de vibration pure nu0.','R comme Right/Rising : au-dessus de nu0. Quel signe de Delta J cela correspond-il ?')">Vérifier</button>
        <div class="feedback" id="spec4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une molécule diatomique, la branche Q (ΔJ=0) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec4e2" value="wrong"> la branche la plus intense</label>
          <label class="option"><input type="radio" name="spec4e2" value="right"> absente</label>
          <label class="option"><input type="radio" name="spec4e2" value="wrong"> toujours présente au centre</label>
          <label class="option"><input type="radio" name="spec4e2" value="wrong"> présente uniquement à basse température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec4e2','spec4fb2','Correct — la conservation du moment angulaire impose Delta J=plus ou moins 1 pour une molécule diatomique : Delta J=0 est interdit, donc pas de raie centrale.','La règle de sélection Delta J=plus ou moins 1 exclut-elle ou autorise-t-elle Delta J=0 ?')">Vérifier</button>
        <div class="feedback" id="spec4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'espacement entre deux raies successives d'une même branche (P ou R) vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec4e3" value="wrong"> B</label>
          <label class="option"><input type="radio" name="spec4e3" value="right"> 2B</label>
          <label class="option"><input type="radio" name="spec4e3" value="wrong"> ωe</label>
          <label class="option"><input type="radio" name="spec4e3" value="wrong"> 4B</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec4e3','spec4fb3','Correct — comme en rotation pure, l espacement caractéristique entre raies successives d une même branche est 2B, ce qui permet de déterminer B à partir du spectre infrarouge.','C est le même espacement caractéristique qu en spectroscopie rotationnelle pure (chapitre 2).')">Vérifier</button>
        <div class="feedback" id="spec4fb3"></div>
      </div>
    </div>
  `
};

SPEC_NOVA_KB[specPhysKey('Spectroscopie vibration-rotation des molécules diatomiques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Spectroscopie vibration-rotation ». Demande-moi la différence entre branches P et R, pourquoi la branche Q est absente, ou un indice sur un exercice.",
  rules: [
    { test:/branche r\b|ΔJ.*\+1/i, replies:["La branche R (ΔJ=+1) regroupe les raies situées au-dessus de la fréquence de vibration pure ν0 (nombre d'onde plus élevé)."] },
    { test:/branche p\b|ΔJ.*-1/i, replies:["La branche P (ΔJ=−1) regroupe les raies situées en dessous de ν0 (nombre d'onde plus faible)."] },
    { test:/branche q|ΔJ.*0|raie centrale/i, replies:["La branche Q (ΔJ=0) est ABSENTE pour une molécule diatomique : la conservation du moment angulaire impose strictement ΔJ=±1, laissant un 'trou' au centre du spectre, à la position ν0 (jamais observée directement)."] },
    { test:/e\(v,j\)|niveau.*combin[ée]/i, replies:["L'énergie combinée s'écrit E(v,J) = hc[ωe(v+1/2) + B·J(J+1)], simple somme des contributions vibrationnelle et rotationnelle (approximation de mouvements indépendants)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : R pour Rising, au-dessus de ν0.","Indice niveau 2 : quel signe de ΔJ fait AUGMENTER l'énergie de la transition ?","Indice niveau 3 : c'est ΔJ=+1."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : la règle de sélection ΔJ=±1 exclut-elle ΔJ=0 ?","Indice niveau 2 : oui, elle l'exclut strictement.","Indice niveau 3 : la branche Q est donc absente."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est le même espacement qu'en rotation pure (chapitre 2).","Indice niveau 2 : repense à la formule ΔE=2B(J+1).","Indice niveau 3 : l'espacement est 2B."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
SPEC_CHAPTERS[specPhysKey('Spectroscopie électronique moléculaire et principe de Franck-Condon')] = {
  objectives: [
    "Décrire la structure vibronique d'un spectre électronique moléculaire (progressions vibrationnelles)",
    "Énoncer le principe de Franck-Condon et son interprétation en termes de recouvrement de fonctions d'onde vibrationnelles",
    "Relier la forme d'une bande électronique (allure de l'enveloppe, position du maximum) au déplacement des courbes de potentiel",
    "Décrire qualitativement la désexcitation non radiative et les processus de fluorescence et de phosphorescence"
  ],
  prereqs: ["Spectroscopie vibration-rotation des molécules diatomiques", "Introduction à la chimie quantique"],
  bodyHtml: `
    <p>La spectroscopie électronique, dans le domaine visible-UV, sonde les transitions entre états électroniques moléculaires — chacun associé à sa propre courbe d'énergie potentielle en fonction de la distance interatomique, comme déjà rencontré dans le module de chimie quantique pour la molécule H₂⁺. Ce chapitre introduit le principe fondamental qui gouverne l'intensité relative des différentes composantes vibrationnelles d'une bande électronique : le principe de Franck-Condon.</p>

    <h3>1. Structure vibronique d'une transition électronique</h3>
    <p>Une transition électronique s'accompagne presque toujours d'un changement simultané de l'état vibrationnel de la molécule (transition dite « vibronique », contraction de vibration-électronique) : le spectre électronique observé n'est donc pas une raie unique, mais une <strong>progression</strong> de raies rapprochées, correspondant aux différentes transitions possibles $(v''=0) \\to (v'=0,1,2,\\ldots)$ depuis le niveau vibrationnel fondamental de l'état électronique de départ vers les différents niveaux vibrationnels de l'état électronique d'arrivée.</p>

    <h3>2. Approximation de Born-Oppenheimer et principe de Franck-Condon</h3>
    <p>Dans le cadre de l'approximation de Born-Oppenheimer (mouvement électronique beaucoup plus rapide que le mouvement nucléaire, déjà présentée dans le module de chimie quantique), une transition électronique se produit sur une échelle de temps ($\\sim10^{-15}$ s) infiniment plus courte que la période de vibration nucléaire ($\\sim10^{-13}$ s) : les noyaux n'ont donc <strong>pas le temps de bouger</strong> pendant la transition électronique elle-même. C'est le <strong>principe de Franck-Condon</strong>, illustré verticalement sur un diagramme de courbes de potentiel.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'intégrale de recouvrement de Franck-Condon</span>
      L'intensité relative de chaque composante vibronique $(v''=0)\\to(v')$ est proportionnelle au carré de l'<strong>intégrale de recouvrement de Franck-Condon</strong> entre la fonction d'onde vibrationnelle de l'état initial $\\chi_{v''}$ et celle de l'état final $\\chi_{v'}$ :
    </div>
    <div class="formula-box">$$I_{v''\\to v'} \\propto \\left|\\int \\chi_{v''}^*(r)\\,\\chi_{v'}(r)\\,dr\\right|^2$$</div>
    <p>Cette intégrale est maximale lorsque les deux fonctions d'onde vibrationnelles se recouvrent efficacement — ce qui, dans le cadre de l'approximation d'une transition « verticale » (à distance interatomique fixée), dépend directement de la différence de distance d'équilibre entre les deux états électroniques.</p>

    <h3>3. Forme de la bande électronique selon le déplacement des courbes de potentiel</h3>
    <table class="mini-table">
      <tr><th>Situation géométrique</th><th>Transition la plus intense</th><th>Allure de la bande observée</th></tr>
      <tr><td>Courbes de potentiel peu déplacées (r_e' ≈ r_e'')</td><td>$0\\to0$ (transition purement électronique, sans changement notable de v)</td><td>bande étroite, dominée par la raie 0-0</td></tr>
      <tr><td>Courbes de potentiel significativement déplacées (r_e' ≠ r_e'')</td><td>$0\\to v'$ avec $v'>0$ (recouvrement maximal décalé vers un niveau vibrationnel excité de l'état final)</td><td>progression étendue de plusieurs raies, enveloppe large avec un maximum décalé</td></tr>
    </table>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé — interprétation qualitative</span>
      <p><strong>Énoncé :</strong> une molécule diatomique excitée vers un état électronique dont la distance d'équilibre $r_e'$ est nettement plus grande que celle de l'état fondamental $r_e''$ présente-t-elle une transition $0\\to0$ dominante, ou une longue progression vibronique ?</p>
      <p><strong>Solution :</strong> comme les noyaux ne bougent pas pendant la transition (verticale sur le diagramme de courbes de potentiel), la fonction d'onde $\\chi_{v''=0}$ de l'état fondamental (centrée sur $r_e''$) se recouvre mal avec la fonction d'onde $\\chi_{v'=0}$ de l'état excité (centrée sur $r_e'\\neq r_e''$) : c'est un recouvrement bien meilleur avec un niveau vibrationnel excité $v'>0$ de l'état final, dont la fonction d'onde présente une amplitude importante précisément au voisinage de $r_e''$.</p>
      <p class="example-answer">Réponse : une longue progression vibronique est attendue, avec un maximum d'intensité décalé vers un $v'>0$ — comportement typique de nombreuses molécules organiques présentant des transitions $\\pi\\to\\pi^*$.</p>
    </div>

    <h3>4. Désexcitation : fluorescence et phosphorescence</h3>
    <p>Après excitation électronique, une molécule peut revenir à l'état fondamental par différentes voies : la <strong>relaxation vibrationnelle</strong> non radiative (rapide, $\\sim10^{-12}$ s, dissipation de l'excès d'énergie vibrationnelle sous forme de chaleur), suivie soit de la <strong>fluorescence</strong> (émission radiative rapide, $\\sim10^{-9}$ à $10^{-6}$ s, entre états de même multiplicité de spin), soit — après un changement de multiplicité de spin par croisement intersystème — de la <strong>phosphorescence</strong> (émission radiative beaucoup plus lente, $\\sim10^{-3}$ s à plusieurs secondes, transition normalement interdite de spin, ce qui explique sa durée de vie beaucoup plus longue).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Une transition électronique est toujours accompagnée d'un changement de niveau vibrationnel : structure vibronique (progression de raies)</li>
        <li>Principe de Franck-Condon : les noyaux ne bougent pas pendant la transition électronique (transition « verticale »), très rapide devant la période de vibration</li>
        <li>Intensité proportionnelle au carré de l'intégrale de recouvrement de Franck-Condon entre fonctions d'onde vibrationnelles initiale et finale</li>
        <li>Courbes déplacées (re'≠re'') → longue progression vibronique ; courbes peu déplacées (re'≈re'') → bande dominée par la transition 0-0</li>
        <li>Fluorescence (rapide, même multiplicité de spin) vs phosphorescence (lente, transition de spin interdite)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'une transition électronique est toujours une raie unique : elle présente presque toujours une structure vibronique (progression de plusieurs raies)</li>
        <li>Confondre le principe de Franck-Condon avec une règle de sélection stricte : il détermine des INTENSITÉS RELATIVES, pas une interdiction absolue de certaines transitions vibroniques</li>
        <li>Confondre fluorescence (rapide) et phosphorescence (beaucoup plus lente, transition de spin interdite) : le simple ordre de grandeur des durées de vie permet de les distinguer</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le principe de Franck-Condon repose sur le fait que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec5e1" value="wrong"> les électrons sont plus lents que les noyaux</label>
          <label class="option"><input type="radio" name="spec5e1" value="right"> les noyaux n'ont pas le temps de bouger pendant la transition électronique</label>
          <label class="option"><input type="radio" name="spec5e1" value="wrong"> l'énergie de vibration est toujours nulle</label>
          <label class="option"><input type="radio" name="spec5e1" value="wrong"> les électrons ne participent pas à la transition</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec5e1','spec5fb1','Correct — la transition électronique, extrêmement rapide, se produit sur une échelle de temps où les noyaux, bien plus lents, restent quasiment figés.','Compare les échelles de temps : la transition électronique est-elle plus rapide ou plus lente que le mouvement nucléaire ?')">Vérifier</button>
        <div class="feedback" id="spec5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Si les courbes de potentiel de l'état fondamental et de l'état excité ont des distances d'équilibre très différentes, on observe typiquement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec5e2" value="wrong"> une seule raie fine (transition 0-0)</label>
          <label class="option"><input type="radio" name="spec5e2" value="right"> une longue progression vibronique</label>
          <label class="option"><input type="radio" name="spec5e2" value="wrong"> aucune transition possible</label>
          <label class="option"><input type="radio" name="spec5e2" value="wrong"> uniquement de la phosphorescence</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec5e2','spec5fb2','Correct — le recouvrement maximal se produit alors avec un niveau vibrationnel excité de l état final, donnant une progression étendue de raies vibroniques.','Pense au recouvrement des fonctions d onde vibrationnelles : est-il maximal pour v prime=0 si les distances d équilibre diffèrent beaucoup ?')">Vérifier</button>
        <div class="feedback" id="spec5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La phosphorescence se distingue de la fluorescence par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec5e3" value="wrong"> une émission instantanée</label>
          <label class="option"><input type="radio" name="spec5e3" value="right"> une durée de vie beaucoup plus longue (transition de spin interdite)</label>
          <label class="option"><input type="radio" name="spec5e3" value="wrong"> l'absence totale d'émission</label>
          <label class="option"><input type="radio" name="spec5e3" value="wrong"> une énergie de photon toujours plus élevée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec5e3','spec5fb3','Correct — la phosphorescence implique un changement de multiplicité de spin (transition normalement interdite), ce qui la ralentit considérablement par rapport à la fluorescence.','La phosphorescence implique un croisement intersystème (changement de spin) : quel effet cela a-t-il sur la vitesse de la transition ?')">Vérifier</button>
        <div class="feedback" id="spec5fb3"></div>
      </div>
    </div>
  `
};

SPEC_NOVA_KB[specPhysKey('Spectroscopie électronique moléculaire et principe de Franck-Condon')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Spectroscopie électronique et principe de Franck-Condon ». Demande-moi ce qu'est une transition verticale, la différence fluorescence/phosphorescence, ou un indice sur un exercice.",
  rules: [
    { test:/franck.?condon/i, replies:["Le principe de Franck-Condon : les noyaux n'ont pas le temps de bouger pendant une transition électronique (transition 'verticale'), car celle-ci est bien plus rapide que la période de vibration nucléaire."] },
    { test:/int[ée]grale.*recouvrement|recouvrement.*fonctions/i, replies:["L'intensité d'une transition vibronique est proportionnelle au carré de l'intégrale de recouvrement entre les fonctions d'onde vibrationnelles initiale et finale — ce n'est pas une règle de sélection stricte, mais une intensité relative."] },
    { test:/progression vibronique|structure vibronique/i, replies:["Une transition électronique est presque toujours accompagnée d'un changement de niveau vibrationnel, donnant une progression de raies (structure vibronique) plutôt qu'une raie unique."] },
    { test:/fluorescence/i, replies:["La fluorescence est une émission radiative rapide (10⁻⁹ à 10⁻⁶ s) entre états de même multiplicité de spin, après relaxation vibrationnelle non radiative."] },
    { test:/phosphorescence/i, replies:["La phosphorescence est une émission radiative beaucoup plus lente (10⁻³ s à plusieurs secondes) car elle implique un changement de multiplicité de spin (croisement intersystème), transition normalement interdite."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : compare les échelles de temps électronique/nucléaire.","Indice niveau 2 : la transition électronique est bien plus rapide.","Indice niveau 3 : les noyaux n'ont pas le temps de bouger pendant la transition."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense au recouvrement des fonctions d'onde vibrationnelles.","Indice niveau 2 : si les distances d'équilibre diffèrent, le recouvrement max n'est pas en v'=0.","Indice niveau 3 : on observe une longue progression vibronique."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : pense au croisement intersystème (changement de spin).","Indice niveau 2 : une transition de spin interdite est beaucoup plus lente.","Indice niveau 3 : la phosphorescence a une durée de vie beaucoup plus longue que la fluorescence."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
SPEC_CHAPTERS[specPhysKey('Spectroscopie Raman')] = {
  objectives: [
    "Distinguer diffusion Rayleigh (élastique) et diffusion Raman (inélastique)",
    "Différencier raies Stokes et anti-Stokes et expliquer leur différence d'intensité",
    "Énoncer la règle de sélection Raman (variation de polarisabilité) et la comparer à celle de l'IR",
    "Relier ce chapitre à la règle d'exclusion mutuelle déjà établie dans le module de théorie des groupes"
  ],
  prereqs: ["Spectroscopie vibrationnelle : l'oscillateur harmonique et anharmonique", "Théorie des groupes (module de mathématiques)"],
  bodyHtml: `
    <p>Contrairement aux spectroscopies d'absorption abordées jusqu'ici (rotation, vibration, électronique), la spectroscopie <strong>Raman</strong> repose sur un phénomène de <strong>diffusion</strong> : on irradie l'échantillon avec un rayonnement monochromatique (généralement un laser, chapitre suivant) de fréquence fixée, très éloignée de toute transition d'absorption, et l'on analyse le rayonnement diffusé.</p>

    <h3>1. Diffusion Rayleigh et diffusion Raman</h3>
    <p>Lorsqu'un photon incident de fréquence $\\nu_0$ interagit avec une molécule, la grande majorité du rayonnement diffusé conserve exactement la même fréquence $\\nu_0$ : c'est la <strong>diffusion Rayleigh</strong>, diffusion élastique et cohérente déjà rencontrée sous le nom de diffusion Thomson dans le module de cristallochimie (interaction rayons X-matière). Une fraction beaucoup plus faible ($\\sim 10^{-6}$ des photons incidents) est diffusée de façon <strong>inélastique</strong>, avec un échange d'énergie avec un mode de vibration de la molécule : c'est la <strong>diffusion Raman</strong>.</p>

    <h3>2. Raies Stokes et anti-Stokes</h3>
    <table class="mini-table">
      <tr><th>Type de raie</th><th>Origine physique</th><th>Fréquence diffusée</th><th>Intensité relative</th></tr>
      <tr><td>Rayleigh</td><td>diffusion élastique, sans échange d'énergie vibrationnelle</td><td>$\\nu_0$ (inchangée)</td><td>très forte (référence)</td></tr>
      <tr><td>Raman Stokes</td><td>la molécule absorbe un quantum de vibration $h\\nu_{vib}$ au photon diffusé</td><td>$\\nu_0 - \\nu_{vib}$</td><td>plus faible que Rayleigh, mais plus intense qu'anti-Stokes</td></tr>
      <tr><td>Raman anti-Stokes</td><td>la molécule cède un quantum de vibration au photon diffusé (nécessite un état vibrationnel initial excité)</td><td>$\\nu_0 + \\nu_{vib}$</td><td>beaucoup plus faible que Stokes</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — pourquoi les raies Stokes sont plus intenses que les anti-Stokes</span>
      À l'équilibre thermique, la <strong>population de Boltzmann</strong> des niveaux vibrationnels est très majoritairement concentrée dans l'état fondamental $v=0$ (l'écart énergétique vibrationnel étant généralement très supérieur à $k_BT$ à température ambiante). Or, seule une molécule initialement dans un état vibrationnel excité ($v\\geq1$) peut produire une raie anti-Stokes (en cédant de l'énergie vibrationnelle) ; la transition Stokes, elle, part majoritairement de l'état fondamental très peuplé. Le rapport d'intensité Stokes/anti-Stokes est ainsi directement lié à la population relative des niveaux, ce qui permet — application pratique remarquable — de <strong>déterminer la température</strong> d'un échantillon à partir de ce seul rapport d'intensité.
    </div>

    <h3>3. Règle de sélection Raman : variation de polarisabilité</h3>
    <p>Contrairement à la règle de sélection infrarouge (variation du moment dipolaire, déjà établie dans le module de théorie des groupes, chapitre 8), l'activité Raman exige une variation de la <strong>polarisabilité</strong> $\\alpha$ de la molécule au cours du mode de vibration considéré :</p>
    <div class="formula-box">$$\\left(\\frac{\\partial \\alpha}{\\partial Q}\\right)_{Q=0} \\neq 0 \\qquad \\text{(condition d'activité Raman pour le mode normal } Q\\text{)}$$</div>
    <p>Cette condition, de nature tensorielle, se traduit en pratique par le même critère de symétrie que celui établi dans le module de théorie des groupes : un mode de vibration est actif en Raman si sa représentation irréductible correspond à celle d'une <strong>fonction quadratique</strong> ($x^2,y^2,z^2,xy,xz,yz$) dans la table de caractères du groupe ponctuel de la molécule.</p>

    <h3>4. Complémentarité IR/Raman et règle d'exclusion mutuelle</h3>
    <div class="key-point">
      <span class="eyebrow">Rappel du module de théorie des groupes</span>
      Comme établi précédemment, un mode de vibration IR-actif se transforme comme $x,y,z$ (moment dipolaire), un mode Raman-actif comme une fonction quadratique (polarisabilité). Pour une molécule <strong>centrosymétrique</strong>, ces deux catégories de représentations sont mutuellement exclusives (types $u$ contre $g$) : c'est la <strong>règle d'exclusion mutuelle</strong>, qui rend IR et Raman rigoureusement complémentaires pour ces molécules — et justifie, en pratique expérimentale, l'utilisation combinée des deux techniques pour caractériser complètement le spectre vibrationnel d'un composé.
    </div>
    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> le CO₂ (molécule linéaire centrosymétrique, groupe $D_{\\infty h}$) possède un mode d'élongation symétrique. Est-il actif en IR ? En Raman ?</p>
      <p><strong>Solution :</strong> l'élongation symétrique de CO₂ conserve le centre d'inversion à chaque instant : la polarisabilité varie (Raman actif), mais le moment dipolaire reste nul par symétrie tout au long du mouvement (IR inactif) — conformément à la règle d'exclusion mutuelle.</p>
      <p class="example-answer">Réponse : ce mode est actif en Raman mais totalement inactif en infrarouge — un exemple canonique de la règle d'exclusion mutuelle pour une molécule centrosymétrique.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Diffusion Rayleigh (élastique, ν0 inchangée) très majoritaire ; diffusion Raman (inélastique, échange d'énergie vibrationnelle) très minoritaire</li>
        <li>Raies Stokes (ν0−νvib, plus intenses) et anti-Stokes (ν0+νvib, plus faibles, nécessite un état initial excité) — leur rapport donne la température</li>
        <li>Règle de sélection Raman : variation de la polarisabilité ; mode actif si sa RI correspond à une fonction quadratique dans la table de caractères</li>
        <li>Règle d'exclusion mutuelle (molécules centrosymétriques) : un mode IR-actif est Raman-inactif, et réciproquement — IR et Raman sont complémentaires</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre diffusion Rayleigh (élastique, très majoritaire) et diffusion Raman (inélastique, très minoritaire) : Raman ne représente qu'environ un photon sur un million</li>
        <li>Croire que les raies Stokes et anti-Stokes ont la même intensité : Stokes est toujours plus intense (population de Boltzmann concentrée sur v=0)</li>
        <li>Appliquer la règle de sélection infrarouge (moment dipolaire) au lieu de la règle Raman (polarisabilité) : ce sont deux critères de symétrie différents</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Les raies Stokes sont plus intenses que les raies anti-Stokes car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec6e1" value="wrong"> elles ont une énergie plus élevée</label>
          <label class="option"><input type="radio" name="spec6e1" value="right"> l'état vibrationnel fondamental v=0 est beaucoup plus peuplé que les états excités</label>
          <label class="option"><input type="radio" name="spec6e1" value="wrong"> elles correspondent à la diffusion Rayleigh</label>
          <label class="option"><input type="radio" name="spec6e1" value="wrong"> elles sont interdites par symétrie</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec6e1','spec6fb1','Correct — la transition Stokes part majoritairement de l état fondamental très peuplé (population de Boltzmann), contrairement à l anti-Stokes qui nécessite un état initial déjà excité, beaucoup moins peuplé.','Pense à la répartition de Boltzmann des niveaux vibrationnels à température ambiante.')">Vérifier</button>
        <div class="feedback" id="spec6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La règle de sélection Raman exige une variation, au cours du mode de vibration, de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec6e2" value="wrong"> la masse molaire</label>
          <label class="option"><input type="radio" name="spec6e2" value="right"> la polarisabilité</label>
          <label class="option"><input type="radio" name="spec6e2" value="wrong"> le moment dipolaire</label>
          <label class="option"><input type="radio" name="spec6e2" value="wrong"> le nombre d'atomes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec6e2','spec6fb2','Correct — c est la polarisabilité (grandeur tensorielle) qui doit varier au cours du mode pour que celui-ci soit actif en Raman ; le moment dipolaire est le critère de l IR.','Le moment dipolaire est le critère de l infrarouge (module de théorie des groupes) : quel est le critère spécifique du Raman ?')">Vérifier</button>
        <div class="feedback" id="spec6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour une molécule centrosymétrique, un mode actif en Raman est, d'après la règle d'exclusion mutuelle :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec6e3" value="wrong"> également actif en IR</label>
          <label class="option"><input type="radio" name="spec6e3" value="right"> nécessairement inactif en IR</label>
          <label class="option"><input type="radio" name="spec6e3" value="wrong"> toujours inactif en Raman aussi</label>
          <label class="option"><input type="radio" name="spec6e3" value="wrong"> uniquement observable à basse température</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec6e3','spec6fb3','Correct — c est exactement la règle d exclusion mutuelle déjà établie dans le module de théorie des groupes : IR et Raman sont rigoureusement complémentaires pour les molécules centrosymétriques.','Cette règle a déjà été établie dans le module de théorie des groupes : que dit-elle pour les molécules centrosymétriques ?')">Vérifier</button>
        <div class="feedback" id="spec6fb3"></div>
      </div>
    </div>
  `
};

SPEC_NOVA_KB[specPhysKey('Spectroscopie Raman')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Spectroscopie Raman ». Demande-moi la différence Stokes/anti-Stokes, la règle de sélection Raman, ou un indice sur un exercice.",
  rules: [
    { test:/rayleigh/i, replies:["La diffusion Rayleigh est élastique : le photon diffusé garde exactement la même fréquence ν0 que le photon incident. C'est de loin le processus de diffusion le plus fréquent."] },
    { test:/stokes/i, replies:["Les raies Stokes (ν0−νvib) sont plus intenses que les raies anti-Stokes (ν0+νvib), car l'état vibrationnel fondamental v=0, d'où partent les transitions Stokes, est beaucoup plus peuplé à l'équilibre thermique (population de Boltzmann)."] },
    { test:/polarisabilit[ée]/i, replies:["La règle de sélection Raman exige une variation de la polarisabilité au cours du mode de vibration — critère différent de celui de l'IR (variation du moment dipolaire)."] },
    { test:/exclusion mutuelle/i, replies:["Pour une molécule centrosymétrique, un mode actif en Raman (fonctions quadratiques) est nécessairement inactif en IR (coordonnées x,y,z), et réciproquement : c'est la règle d'exclusion mutuelle, déjà vue en théorie des groupes."] },
    { test:/co2|exemple.*raman/i, replies:["L'élongation symétrique de CO2 conserve le centre d'inversion : la polarisabilité varie (Raman actif) mais le moment dipolaire reste nul (IR inactif) — exemple typique de la règle d'exclusion mutuelle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à la population de Boltzmann des niveaux vibrationnels.","Indice niveau 2 : le niveau v=0 est de loin le plus peuplé.","Indice niveau 3 : c'est pour cela que Stokes est plus intense qu'anti-Stokes."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le moment dipolaire est le critère de l'IR, pas du Raman.","Indice niveau 2 : le Raman utilise une grandeur tensorielle différente.","Indice niveau 3 : c'est la polarisabilité."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : cette règle a déjà été vue en théorie des groupes.","Indice niveau 2 : IR et Raman sont mutuellement exclusifs pour ces molécules.","Indice niveau 3 : un mode Raman-actif est nécessairement IR-inactif."] }
  ]
};

/* ---------------------------------------------------------------------------------
   OUTIL 3 — Calculateur d'inversion de population minimale pour un laser à 3/4 niveaux
   (Chapitre 7)
--------------------------------------------------------------------------------- */
function updateSpecLaser(){
  const dE = parseFloat(document.getElementById('specDE').value) || 2; // eV
  const T = parseFloat(document.getElementById('specT').value) || 300; // K
  const out = document.getElementById('specLaserReadout');
  const kB = 8.617e-5; // eV/K
  const ratio = Math.exp(-dE/(kB*T));
  out.innerHTML =
    `<p>Rapport de population à l'équilibre thermique (loi de Boltzmann), pour ΔE=${dE} eV à T=${T} K :</p>` +
    `<p>N(excité)/N(fondamental) = exp(−ΔE/k<sub>B</sub>T) = <strong>${ratio.toExponential(3)}</strong></p>` +
    `<p style="margin-top:8px;">Ce rapport, extrêmement faible, confirme qu'à l'équilibre thermique, l'état excité est quasiment dépeuplé : c'est pourquoi une <strong>inversion de population</strong> (pompage actif, hors équilibre thermique) est indispensable pour obtenir un effet laser.</p>`;
}
function initSpecLaser(){ updateSpecLaser(); }

/* =========================== CHAPITRE 7 =========================== */
SPEC_CHAPTERS[specPhysKey('Principes physiques du laser et applications spectroscopiques')] = {
  objectives: [
    "Décrire les trois conditions nécessaires au fonctionnement d'un laser (pompage, inversion de population, cavité résonante)",
    "Expliquer pourquoi un système à deux niveaux ne peut pas fonctionner en laser continu",
    "Décrire le principe des systèmes laser à trois et quatre niveaux",
    "Citer des applications de la spectroscopie laser en physique et en chimie"
  ],
  prereqs: ["Interaction rayonnement-matière et spectroscopie atomique"],
  bodyHtml: `
    <p>Ce dernier chapitre boucle le module en revenant sur l'émission stimulée, introduite au chapitre 1, pour expliquer le principe de fonctionnement du <strong>laser</strong> (acronyme de <em>Light Amplification by Stimulated Emission of Radiation</em>), outil aujourd'hui incontournable de la spectroscopie moderne — sources monochromatiques intenses, spectroscopie résolue en temps, spectroscopie Raman (chapitre 6), etc.</p>

    <h3>1. Trois conditions nécessaires au fonctionnement d'un laser</h3>
    <table class="mini-table">
      <tr><th>Condition</th><th>Rôle</th></tr>
      <tr><td>Milieu amplificateur</td><td>ensemble d'atomes ou de molécules possédant des niveaux d'énergie appropriés, capables d'émission stimulée</td></tr>
      <tr><td>Pompage (excitation externe)</td><td>fournit l'énergie nécessaire pour peupler artificiellement l'état excité, hors équilibre thermique</td></tr>
      <tr><td>Cavité résonante (miroirs)</td><td>renvoie le rayonnement à travers le milieu amplificateur de façon répétée, amplifiant la lumière par passages successifs</td></tr>
    </table>

    <h3>2. Inversion de population : pourquoi un système à deux niveaux ne suffit pas</h3>
    <p>À l'équilibre thermique, la population des niveaux d'énergie suit la <strong>loi de Boltzmann</strong> : $\\dfrac{N_2}{N_1} = e^{-\\Delta E/k_BT}$, ce qui signifie que l'état de plus basse énergie est toujours plus peuplé que l'état excité. Pour obtenir une amplification nette par émission stimulée (plutôt qu'une absorption nette), il faut inverser cette situation : c'est l'<strong>inversion de population</strong>, $N_2 > N_1$, une situation fondamentalement hors équilibre thermique, qui ne peut être obtenue que par un pompage actif.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — l'impossibilité du laser à deux niveaux stricts</span>
      Dans un système à seulement <strong>deux niveaux</strong>, le pompage lui-même (par absorption depuis le niveau fondamental) tend à égaliser les populations des deux niveaux ($N_1=N_2$ au mieux, en régime de <em>saturation</em>) mais ne peut jamais réaliser $N_2>N_1$ : dès que l'inversion commencerait à s'établir, l'émission stimulée deviendrait plus probable que l'absorption, ramenant rapidement le système vers l'équilibre. C'est pour cette raison fondamentale que tous les lasers pratiques utilisent des systèmes à <strong>trois ou quatre niveaux</strong>.
    </div>

    <h3>3. Systèmes laser à trois et quatre niveaux</h3>
    <p>Dans un système à <strong>quatre niveaux</strong> (le plus courant en pratique, par exemple le laser Nd:YAG) : le pompage excite le milieu vers un niveau $E_3$ à courte durée de vie, qui se désexcite très rapidement (relaxation non radiative) vers un niveau métastable $E_2$ à durée de vie beaucoup plus longue — c'est ce niveau $E_2$ qui constitue le niveau supérieur de la transition laser, vers un niveau intermédiaire $E_1$ (rapidement dépeuplé lui aussi vers le niveau fondamental $E_0$). Puisque $E_1$ reste toujours quasiment vide (grâce à sa désexcitation rapide vers $E_0$), l'inversion de population $N_2>N_1$ s'établit facilement, dès un pompage même modeste — ce qui explique pourquoi les systèmes à quatre niveaux sont, en pratique, bien plus efficaces que les systèmes à trois niveaux (comme le laser à rubis historique de Maiman, 1960), qui exigent de dépeupler plus de la moitié du niveau fondamental pour atteindre l'inversion.</p>

    <div class="example-box">
      <span class="eyebrow">Exemple corrigé</span>
      <p><strong>Énoncé :</strong> pour une transition d'énergie $\\Delta E = 2$ eV, à température ambiante ($T=300$ K, $k_BT\\approx0{,}0259$ eV), calculer le rapport de population $N_2/N_1$ à l'équilibre thermique, et commenter.</p>
      <p><strong>Solution :</strong> $\\dfrac{N_2}{N_1} = e^{-2/0{,}0259} = e^{-77{,}2} \\approx 2\\times10^{-34}$.</p>
      <p class="example-answer">Réponse : ce rapport est absolument négligeable — l'état excité est, à l'équilibre thermique, pratiquement vide. Ceci confirme que l'inversion de population ne peut jamais résulter d'un simple chauffage, mais nécessite un mécanisme de pompage actif et sélectif (optique, électrique, chimique) hors équilibre thermodynamique.</p>
    </div>

    <h3>4. Applications de la spectroscopie laser</h3>
    <p>La disponibilité de sources laser — <strong>monochromatiques</strong> (largeur spectrale extrêmement fine), <strong>cohérentes</strong> et de haute intensité — a révolutionné la spectroscopie moderne : spectroscopie Raman (chapitre 6, nécessitant une source intense et monochromatique très éloignée de toute transition d'absorption), spectroscopie résolue en temps femtoseconde (permettant de suivre en temps réel la dynamique d'une réaction chimique, jusqu'à l'échelle du mouvement nucléaire lui-même), spectroscopie de très haute résolution (métrologie des fréquences, horloges atomiques), ou encore techniques de refroidissement laser d'atomes (température de l'ordre du microkelvin), à la frontière entre physique atomique et physique statistique.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>3 conditions du laser : milieu amplificateur, pompage (excitation hors équilibre), cavité résonante</li>
        <li>Inversion de population N2>N1 : situation hors équilibre thermique, impossible avec un système à seulement 2 niveaux stricts</li>
        <li>Systèmes à 3-4 niveaux : le niveau supérieur de la transition laser est peuplé indirectement via un niveau intermédiaire à courte durée de vie</li>
        <li>4 niveaux plus efficace que 3 niveaux : le niveau inférieur de la transition laser reste quasiment vide, facilitant l'inversion</li>
        <li>Applications : spectroscopie Raman, spectroscopie résolue en temps, métrologie de haute précision, refroidissement laser</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un système à deux niveaux stricts peut fonctionner en laser continu : le pompage sature au mieux les populations, sans jamais les inverser</li>
        <li>Confondre pompage (apport d'énergie externe) et inversion de population (résultat visé, état hors équilibre thermique)</li>
        <li>Oublier que l'inversion de population est un état fondamentalement HORS équilibre thermodynamique : elle ne peut jamais résulter d'un simple chauffage (loi de Boltzmann)</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — population à l'équilibre thermique (loi de Boltzmann)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Illustre pourquoi l'inversion de population ne peut jamais résulter de l'équilibre thermique seul.</p>
      <div class="sim-controls">
        <label>ΔE (eV) : <input type="number" id="specDE" value="2" step="0.1" style="width:60px;" oninput="updateSpecLaser()"></label>
        <label>T (K) : <input type="number" id="specT" value="300" style="width:65px;" oninput="updateSpecLaser()"></label>
        <div class="sim-readout" id="specLaserReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un système à seulement deux niveaux d'énergie stricts ne peut pas fonctionner en laser continu car :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec7e1" value="wrong"> l'émission spontanée y est impossible</label>
          <label class="option"><input type="radio" name="spec7e1" value="right"> le pompage sature au mieux les populations, sans jamais les inverser</label>
          <label class="option"><input type="radio" name="spec7e1" value="wrong"> il n'a pas de cavité résonante</label>
          <label class="option"><input type="radio" name="spec7e1" value="wrong"> l'énergie de transition est trop faible</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec7e1','spec7fb1','Correct — dès que l inversion commencerait à s établir, l émission stimulée redevient plus probable que l absorption, ramenant le système vers l équilibre : au mieux N1=N2, jamais N2>N1.','Pense à ce qui se passe quand les populations des deux niveaux s égalisent sous l effet du pompage.')">Vérifier</button>
        <div class="feedback" id="spec7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un système laser à quatre niveaux, le niveau inférieur de la transition laser est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec7e2" value="wrong"> le niveau fondamental lui-même</label>
          <label class="option"><input type="radio" name="spec7e2" value="right"> un niveau intermédiaire, rapidement dépeuplé vers le fondamental</label>
          <label class="option"><input type="radio" name="spec7e2" value="wrong"> le niveau de pompage</label>
          <label class="option"><input type="radio" name="spec7e2" value="wrong"> identique au niveau supérieur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec7e2','spec7fb2','Correct — ce niveau intermédiaire reste quasiment vide grâce à sa désexcitation rapide vers le fondamental, ce qui facilite grandement l établissement de l inversion de population.','Ce niveau doit rester peu peuplé pour faciliter l inversion : qu est-ce qui permet cela dans un système à 4 niveaux ?')">Vérifier</button>
        <div class="feedback" id="spec7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'inversion de population est fondamentalement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="spec7e3" value="wrong"> une situation d'équilibre thermique</label>
          <label class="option"><input type="radio" name="spec7e3" value="right"> une situation hors équilibre thermique</label>
          <label class="option"><input type="radio" name="spec7e3" value="wrong"> obtenue par simple refroidissement</label>
          <label class="option"><input type="radio" name="spec7e3" value="wrong"> impossible à atteindre en pratique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('spec7e3','spec7fb3','Correct — la loi de Boltzmann interdit N2>N1 à l équilibre thermique ; l inversion nécessite un pompage actif, hors équilibre.','La loi de Boltzmann impose toujours N1>N2 à l équilibre : comment peut-on alors obtenir N2>N1 ?')">Vérifier</button>
        <div class="feedback" id="spec7fb3"></div>
      </div>
    </div>
  `,
  init: initSpecLaser
};

SPEC_NOVA_KB[specPhysKey('Principes physiques du laser et applications spectroscopiques')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Principes physiques du laser ». Demande-moi pourquoi 2 niveaux ne suffisent pas, la différence 3/4 niveaux, ou un indice sur un exercice.",
  rules: [
    { test:/inversion de population/i, replies:["L'inversion de population (N2>N1) est une situation hors équilibre thermique, impossible à obtenir par simple chauffage (loi de Boltzmann impose toujours N1>N2 à l'équilibre) — elle nécessite un pompage actif."] },
    { test:/deux niveaux|2 niveaux/i, replies:["Un système à 2 niveaux stricts ne peut jamais atteindre l'inversion : le pompage sature au mieux les populations (N1=N2), mais l'émission stimulée redevient dominante dès que l'inversion commence à s'établir."] },
    { test:/trois niveaux|3 niveaux|quatre niveaux|4 niveaux/i, replies:["Les systèmes à 3-4 niveaux peuplent le niveau supérieur de la transition laser indirectement, via un niveau à courte durée de vie. Le système à 4 niveaux est plus efficace car le niveau inférieur de la transition reste quasiment vide."] },
    { test:/pompage/i, replies:["Le pompage est l'excitation externe (optique, électrique, chimique) qui fournit l'énergie nécessaire pour peupler artificiellement l'état excité, condition nécessaire (mais non suffisante seule) à l'effet laser."] },
    { test:/cavit[ée] r[ée]sonante/i, replies:["La cavité résonante (miroirs) renvoie le rayonnement à travers le milieu amplificateur de façon répétée, amplifiant progressivement la lumière par passages successifs."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : pense à ce qui arrive quand les populations s'égalisent.","Indice niveau 2 : dès que N2 tend à dépasser N1, l'émission stimulée domine et rétablit l'équilibre.","Indice niveau 3 : le pompage sature au mieux les populations, sans jamais les inverser."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : ce niveau doit rester peu peuplé.","Indice niveau 2 : il se désexcite rapidement vers le fondamental.","Indice niveau 3 : c'est un niveau intermédiaire, rapidement dépeuplé."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la loi de Boltzmann impose toujours N1>N2 à l'équilibre.","Indice niveau 2 : comment alors obtenir N2>N1 ?","Indice niveau 3 : c'est une situation hors équilibre thermique."] }
  ]
};

/* fusionne le module Spectroscopie dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, SPEC_CHAPTERS);
Object.assign(NOVA_KB, SPEC_NOVA_KB);