/* =====================================================================
   CHUNK « chimsol » — registre CHIMSOL_CHAPTERS / CHIMSOL_NOVA_KB
   Matière(s) : Chimie|Chimie des solutions
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   CHIMSOL_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ===================================================================
   MATIÈRE — Chimie des solutions (L2, domaine Chimie)
   Structure identique aux autres modules : CHIMSOL_CHAPTERS / CHIMSOL_NOVA_KB,
   fusionnés à la fin dans MATH_TOOLS_CHAPTERS / NOVA_KB.
   Contenu basé sur le polycopié "Cours de Chimie en Solution" (5 chapitres),
   redécoupé en 6 chapitres pédagogiques pour la plateforme.
=================================================================== */
const CHIMSOL_MATIERE = 'Chimie des solutions';
function csKey(chapterTitle){ return `Chimie|${CHIMSOL_MATIERE}|${chapterTitle}`; }
const CHIMSOL_CHAPTERS = {};
const CHIMSOL_NOVA_KB = {};

/* =========================== CHAPITRE 1 =========================== */
CHIMSOL_CHAPTERS[csKey('Généralités sur les solutions aqueuses')] = {
  objectives: [
    "Définir une solution aqueuse, un soluté, un électrolyte et le phénomène de dissolution",
    "Exprimer une composition en mole, équivalent-gramme, molarité, normalité, molalité, ppm et pourcentages massiques",
    "Relier conductivité, conductivité molaire ionique et concentration d'un électrolyte",
    "Écrire le quotient de réaction Q et la constante thermodynamique K° d'un équilibre, et prévoir le sens d'évolution d'un système",
    "Calculer un coefficient d'ionisation, une force ionique et un coefficient d'activité (loi de Debye-Hückel)"
  ],
  prereqs: ["Notions de base sur la mole et la concentration (L1)"],
  bodyHtml: `
    <p>Ce chapitre pose les outils indispensables à toute la suite du module : comment décrire quantitativement une solution aqueuse, comment prévoir le sens d'évolution d'un système chimique, et comment tenir compte du fait qu'en solution réelle une espèce dissoute ne se comporte pas toujours comme sa seule concentration le laisserait penser.</p>

    <h3>1. Solution aqueuse, dissolution, électrolyte</h3>
    <p>Une <strong>solution aqueuse</strong> s'obtient en dissolvant un ou plusieurs <strong>solutés</strong> (solides, liquides ou gazeux) dans l'eau, qui joue le rôle de <strong>solvant</strong>. Une véritable solution doit être <strong>homogène</strong> à l'échelle macroscopique et ne doit faire intervenir <strong>aucune réaction chimique</strong> entre soluté et solvant — sinon on n'obtient pas la même espèce dissoute en solution mais une autre, issue d'une transformation.</p>
    <p>Le phénomène de <strong>dissolution</strong> disperse le soluté sous forme d'ions, de molécules ou de groupes de molécules solvatées ; au-delà d'une certaine quantité, la solution devient <strong>saturée</strong> et le soluté ne se dissout plus. Un <strong>électrolyte</strong> est une substance qui, dissoute dans l'eau, augmente sa conductivité électrique en y libérant des ions ; un <strong>électrolyte fort</strong> se dissocie totalement (la plupart des cristaux ioniques solubles), un <strong>électrolyte faible</strong> ne se dissocie que partiellement.</p>

    <h3>2. L'eau, un solvant hydratant, ionisant et dissociant</h3>
    <p>La molécule d'eau est coudée et polaire (moment dipolaire $p(\\\\text{H}_2\\\\text{O}) \\\\approx 1{,}85\\\\ \\\\text{D}$ à 20 °C) et possède une constante diélectrique élevée ($\\\\varepsilon_r \\\\approx 80$ à 20 °C). D'après la loi de Coulomb, la force électrostatique entre deux ions est donc environ 80 fois plus faible dans l'eau que dans le vide : l'eau affaiblit fortement les attractions entre ions.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé</span>
      La dissolution d'un solide ionique se déroule en trois étapes : dislocation du réseau cristallin, hydratation des ions (les molécules d'eau orientent leur pôle négatif — l'oxygène — vers les cations, et leur pôle positif — les hydrogènes — vers les anions), puis dispersion des ions hydratés dans la solution.
    </div>
    <p>Le pouvoir ionisant du solvant croît avec son moment dipolaire, et son pouvoir dissociant croît avec sa constante diélectrique. C'est pour ces deux raisons que l'eau est un solvant à la fois hydratant, ionisant et dissociant — ce qui explique aussi bien la dissolution d'un solide ionique (ex. NaCl) que l'ionisation d'une molécule polaire (ex. HCl) en solution.</p>

    <h3>3. Expression des quantités de matière</h3>
    <p>La <strong>mole</strong> est la quantité de substance correspondant à $6{,}022\\\\times 10^{23}$ entités élémentaires ; une mole d'une substance a une masse (en g) égale à sa masse molaire. L'<strong>équivalent-gramme</strong> (eq-g), en revanche, est une notion relative à une réaction donnée : il dépend de l'élément réellement échangé.</p>
    <table class="mini-table">
      <tr><th>Type de réaction</th><th>Élément actif</th><th>Définition de l'équivalent</th></tr>
      <tr><td>Acido-basique</td><td>proton H⁺</td><td>masse susceptible de céder/capter 1 mole de protons</td></tr>
      <tr><td>Oxydoréduction</td><td>électron e⁻</td><td>masse susceptible de céder/capter 1 mole d'électrons</td></tr>
    </table>
    <p>Exemple : pour $\\\\text{H}_2\\\\text{SO}_4$ (diacide), $1\\\\ \\\\text{eq-g} = M/2 = 98/2 = 49\\\\ \\\\text{g}$. Pour un sel formé d'ions de charge $z$, on retient en pratique : $\\\\text{eq-g} = \\\\dfrac{1\\\\ \\\\text{mole}}{\\\\text{nombre total de charges des ions}} \\\\times M$ (ex. $\\\\text{CaCl}_2$ : $1\\\\ \\\\text{eq-g} = \\\\tfrac12 \\\\text{mole}\\\\times M$).</p>

    <h3>4. Expression des concentrations</h3>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Définition</th><th>Formule</th></tr>
      <tr><td>Molarité $C_M$</td><td>moles de soluté par litre de solution</td><td>$C_M = n_{\\\\text{soluté}}/V_{\\\\text{solution}}$</td></tr>
      <tr><td>Normalité $N$</td><td>équivalents-gramme par litre de solution</td><td>$N = n \\\\cdot C_M$ ($n$ = protons ou électrons échangés)</td></tr>
      <tr><td>Molalité</td><td>moles de soluté par kg de solvant</td><td>$m = n_{\\\\text{soluté}}/m_{\\\\text{eau (kg)}}$</td></tr>
      <tr><td>ppm</td><td>parties par million (traces)</td><td>$1\\\\ \\\\text{ppm} = 1\\\\ \\\\text{mg/kg} \\\\approx 1\\\\ \\\\text{mg/L}$</td></tr>
      <tr><td>% (m/v), % (m/m)</td><td>masse de soluté pour 100 mL (ou 100 g) de solution</td><td>g de soluté / 100 mL (ou 100 g)</td></tr>
    </table>
    <div class="example-box">
      <p><strong>Exemple.</strong> Une solution contient $5{,}85\\\\ \\\\text{g/L}$ de NaCl ($M = 58{,}5\\\\ \\\\text{g/mol}$). $C_M = C_m/M = 5{,}85/58{,}5 = 0{,}1\\\\ \\\\text{mol/L}$.</p>
    </div>
    <p>Les concentrations « masse/volume » (molarité, normalité, %m/v) dépendent légèrement de la température (dilatation du liquide), contrairement aux concentrations « masse/masse » (molalité, ppm, %m/m).</p>

    <h3>5. Conductivité des solutions aqueuses</h3>
    <p>Sous l'effet d'un champ électrique, les ions migrent (cations dans le sens du champ, anions en sens inverse) et transportent le courant. La conductivité $\\\\sigma$ d'une solution s'exprime par $\\\\sigma = \\\\sum_i c_i z_i^2 \\\\mu_i F$, où $\\\\mu_i$ est la mobilité de l'ion $i$ et $F$ la constante de Faraday. On définit la <strong>conductivité molaire ionique</strong> $\\\\lambda_i = z_i \\\\mu_i F$, maximale à dilution infinie ($\\\\lambda_i^0$) et qui diminue quand la solution devient plus concentrée (interactions inter-ioniques). Pour un électrolyte $\\\\text{C}_n\\\\text{A}_m$ totalement dissocié : $\\\\Lambda^0 = n\\\\lambda^0(\\\\text{C}) + m\\\\lambda^0(\\\\text{A})$.</p>
    <div class="formula-box">$$\\\\sigma = K_{cell}\\\\cdot G = K_{cell}/R$$</div>
    <p>La constante de cellule $K_{cell}$ (géométrie des électrodes) est étalonnée avec une solution de KCl de concentration connue ; le conductimètre mesure la résistance $R$ ou la conductance $G=1/R$ de la portion de solution.</p>

    <h3>6. Réactions en solution aqueuse et quotient de réaction</h3>
    <p>Les réactions en solution aqueuse se classent en quatre familles, échangeant respectivement un proton (acido-basique), un ligand (complexation), une entité solide (précipitation) ou un électron (oxydoréduction). Pour prévoir leur évolution, on définit l'<strong>activité</strong> $a(X)$ de chaque espèce :</p>
    <table class="mini-table">
      <tr><th>Espèce</th><th>Activité</th></tr>
      <tr><td>Solvant (eau, en solution diluée)</td><td>$a(\\\\text{H}_2\\\\text{O}) = 1$</td></tr>
      <tr><td>Soluté dissous $X$</td><td>$a(X) = [X]/c^0$, avec $c^0 = 1\\\\ \\\\text{mol/L}$</td></tr>
      <tr><td>Gaz parfait $X$</td><td>$a(X) = P(X)/P^0$, avec $P^0 = 1\\\\ \\\\text{bar}$</td></tr>
      <tr><td>Solide ou liquide seul dans sa phase (pur)</td><td>$a(X) = 1$</td></tr>
    </table>
    <p>Pour une réaction $aA + bB \\\\rightleftharpoons cC + dD$, le <strong>quotient de réaction</strong> vaut $Q = \\\\dfrac{a(C)^c\\\\, a(D)^d}{a(A)^a\\\\, a(B)^b}$ — une grandeur sans dimension qui dépend de la façon dont l'équation est écrite (les coefficients stœchiométriques comptent).</p>

    <h3>7. Constante d'équilibre et sens d'évolution (loi de Guldberg et Waage)</h3>
    <p>Tout système chimique évolue de façon que $Q$ tende vers une valeur $K^0(T)$ ne dépendant que de la température, appelée <strong>constante thermodynamique</strong> ou <strong>constante d'équilibre</strong>. À l'équilibre, $Q_{\\\\text{éq}} = K^0(T)$.</p>
    <div class="formula-box">
      Si $Q < K^0$ : le système évolue dans le sens direct (sens 1)<br>
      Si $Q > K^0$ : le système évolue dans le sens inverse (sens 2)<br>
      Si $Q = K^0$ : le système est déjà à l'équilibre, il n'évolue pas
    </div>
    <p>Une réaction est dite <strong>totale</strong> si son taux d'avancement final $\\\\tau_f = \\\\xi_f/\\\\xi_{max}$ est proche de 1 (grande valeur de $K^0$, ou disparition complète d'un réactif solide/liquide pur introduit en défaut) ; elle est dite <strong>nulle</strong> si $\\\\xi_f \\\\approx 0$ (le système n'évolue quasiment pas, souvent parce que $K^0$ est très petite).</p>

    <h3>8. Ionisation d'une substance : coefficient et constante</h3>
    <p>Pour un électrolyte faible AB $\\\\rightleftharpoons$ A⁻ + B⁺, le <strong>coefficient d'ionisation</strong> $\\\\alpha$ (compris entre 0 et 1) est la fraction de molécules ionisées. Si $C$ est la concentration initiale : $[\\\\text{A}^-]=[\\\\text{B}^+]=\\\\alpha C$ et $[\\\\text{AB}]=(1-\\\\alpha)C$, d'où la constante d'ionisation :</p>
    <div class="formula-box">$$K_i = \\\\dfrac{[\\\\text{A}^-][\\\\text{B}^+]}{[\\\\text{AB}]} = \\\\dfrac{\\\\alpha^2 C}{1-\\\\alpha}$$</div>
    <p>Cette relation, appliquée à un acide faible, redonne exactement la définition de la constante d'acidité $K_a$ que nous retrouverons au chapitre suivant.</p>

    <h3>9. Force ionique et coefficients d'activité (loi de Debye-Hückel)</h3>
    <p>La <strong>force ionique</strong> $I$ quantifie l'encombrement électrostatique global d'une solution, tous ions confondus :</p>
    <div class="formula-box">$$I = \\\\dfrac{1}{2}\\\\sum_i C_i z_i^2$$</div>
    <p>En solution réelle (non infiniment diluée), une espèce dissoute n'est pas totalement « disponible » pour réagir : on introduit son <strong>activité</strong> $a_i = \\\\gamma_i C_i$, où le <strong>coefficient d'activité</strong> $\\\\gamma_i$ (compris entre 0 et 1, égal à 1 en solution idéale infiniment diluée) se calcule par la loi de Debye-Hückel :</p>
    <div class="formula-box">$$-\\\\log \\\\gamma_i = \\\\dfrac{A z_i^2 \\\\sqrt{I}}{1+Br\\\\sqrt{I}} \\\\ \\\\xrightarrow[\\\\text{si } I<0{,}02]{\\\\text{forme simplifiée}} \\\\ -\\\\log \\\\gamma_i \\\\approx 0{,}504\\\\, z_i^2 \\\\sqrt{I}$$</div>
    <p>Plus la force ionique augmente, plus $\\\\gamma_i$ diminue : l'ion « perd de son efficacité » vis-à-vis de l'équilibre auquel il participe. Le coefficient d'activité moyen d'un électrolyte $\\\\text{A}_m\\\\text{B}_n$ est la moyenne géométrique $\\\\gamma_\\\\pm = (\\\\gamma_A^m \\\\gamma_B^n)^{1/(m+n)}$.</p>

    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 130 100" width="100%">
          <circle cx="65" cy="50" r="6" fill="#3D6BF0"/>
          <circle cx="40" cy="30" r="3" fill="#F0555C"/><circle cx="90" cy="30" r="3" fill="#F0555C"/>
          <circle cx="40" cy="70" r="3" fill="#F0555C"/><circle cx="90" cy="70" r="3" fill="#F0555C"/>
          <circle cx="25" cy="50" r="3" fill="#F0555C"/><circle cx="105" cy="50" r="3" fill="#F0555C"/>
          <line x1="65" y1="50" x2="40" y2="30" stroke="#8064F2" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="65" y1="50" x2="90" y2="30" stroke="#8064F2" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="65" y1="50" x2="40" y2="70" stroke="#8064F2" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="65" y1="50" x2="90" y2="70" stroke="#8064F2" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="65" y1="50" x2="25" y2="50" stroke="#8064F2" stroke-width="1" stroke-dasharray="2,2"/>
          <line x1="65" y1="50" x2="105" y2="50" stroke="#8064F2" stroke-width="1" stroke-dasharray="2,2"/>
        </svg>
        <span>Sphère d'hydratation : molécules d'eau (dipôles) orientées autour d'un cation central</span>
      </div>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$C_M = n/V$ ; $N = nC_M$ (n = protons ou électrons échangés) ; molalité $= n_{\\\\text{soluté}}/m_{\\\\text{eau (kg)}}$</li>
        <li>Activité : $a(\\\\text{H}_2\\\\text{O})=1$ ; $a(X)=[X]/c^0$ pour un soluté ; $a(X)=1$ pour un solide/liquide pur</li>
        <li>$Q$ compare l'état actuel à l'équilibre : $Q<K^0$ → sens direct, $Q>K^0$ → sens inverse, $Q=K^0$ → équilibre atteint</li>
        <li>Force ionique $I=\\\\tfrac12\\\\sum C_iz_i^2$ ; Debye-Hückel : $-\\\\log\\\\gamma_i \\\\approx 0{,}504\\\\,z_i^2\\\\sqrt I$ pour $I<0{,}02$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre équivalent-gramme (dépend de la réaction) et mole (fixe, propre à la substance)</li>
        <li>Oublier que l'activité d'un solide ou liquide pur vaut 1, même s'il est en excès ou en défaut</li>
        <li>Utiliser la concentration à la place de l'activité dans un calcul rigoureux à force ionique non négligeable</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quelle est la normalité d'une solution obtenue en dissolvant 4,9 g de H₂SO₄ ($M=98\\\\ \\\\text{g/mol}$) dans 250 mL d'eau ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs1e1" value="wrong"> 0,1 N</label>
          <label class="option"><input type="radio" name="cs1e1" value="right"> 0,4 N</label>
          <label class="option"><input type="radio" name="cs1e1" value="wrong"> 0,2 N</label>
          <label class="option"><input type="radio" name="cs1e1" value="wrong"> 0,8 N</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs1e1','cs1fb1','Correct — n = 4,9/98 = 0,05 mol, soit CM = 0,05/0,25 = 0,2 mol/L ; H2SO4 échange 2 protons donc N = 2×0,2 = 0,4 N.','Calcule d\\'abord CM = (m/M)/V, puis multiplie par le nombre de protons échangés (2 pour H2SO4) pour obtenir N.')">Vérifier</button>
        <div class="feedback" id="cs1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour la réaction $\\\\text{Ag}_2\\\\text{CrO}_4(s) \\\\rightleftharpoons 2\\\\text{Ag}^+(aq) + \\\\text{CrO}_4^{2-}(aq)$, quelle est l'expression correcte du quotient de réaction Q ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs1e2" value="right"> $Q = [\\\\text{Ag}^+]^2[\\\\text{CrO}_4^{2-}]$</label>
          <label class="option"><input type="radio" name="cs1e2" value="wrong"> $Q = [\\\\text{Ag}^+]^2[\\\\text{CrO}_4^{2-}]/[\\\\text{Ag}_2\\\\text{CrO}_4]$</label>
          <label class="option"><input type="radio" name="cs1e2" value="wrong"> $Q = [\\\\text{Ag}_2\\\\text{CrO}_4]$</label>
          <label class="option"><input type="radio" name="cs1e2" value="wrong"> $Q = 2[\\\\text{Ag}^+] + [\\\\text{CrO}_4^{2-}]$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs1e2','cs1fb2','Correct — Ag2CrO4 est un solide pur, son activité vaut 1 : il n\\'apparaît donc pas au dénominateur.','L\\'activité d\\'un solide pur seul dans sa phase vaut 1 : il ne figure jamais dans l\\'expression de Q.')">Vérifier</button>
        <div class="feedback" id="cs1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Une solution contient 0,02 mol/L de Na₂SO₄, totalement dissocié. Quelle est sa force ionique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs1e3" value="wrong"> 0,02 mol/L</label>
          <label class="option"><input type="radio" name="cs1e3" value="wrong"> 0,04 mol/L</label>
          <label class="option"><input type="radio" name="cs1e3" value="right"> 0,06 mol/L</label>
          <label class="option"><input type="radio" name="cs1e3" value="wrong"> 0,08 mol/L</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs1e3','cs1fb3','Correct — [Na+]=0,04 (z=1) et [SO4 2-]=0,02 (z=2) : I = 1/2(0,04×1 + 0,02×4) = 1/2(0,04+0,08) = 0,06 mol/L.','Écris d\\'abord les concentrations de chaque ion (Na2SO4 donne 2 Na+ et 1 SO4 2-), puis applique I = 1/2 × Σ Ci zi².')">Vérifier</button>
        <div class="feedback" id="cs1fb3"></div>
      </div>
    </div>
  `
};

CHIMSOL_NOVA_KB[csKey('Généralités sur les solutions aqueuses')] = {
  intro: "Salut, moi c'est Nova ! On est sur « Généralités sur les solutions aqueuses ». Demande-moi la différence entre mole et équivalent-gramme, comment calculer une force ionique, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]quivalent/i, replies:["L'équivalent-gramme dépend du type de réaction : pour un acide/base c'est la masse échangeant 1 mole de protons ; pour une oxydoréduction, la masse échangeant 1 mole d'électrons."] },
    { test:/molarit[ée]|normalit[ée]/i, replies:["Molarité CM = n/V (moles par litre). Normalité N = n×CM, où n est le nombre de protons (acide-base) ou d'électrons (redox) échangés par mole."] },
    { test:/activit[ée]/i, replies:["L'activité a(X) vaut [X]/c° pour un soluté dissous, 1 pour l'eau solvant ou pour un solide/liquide pur, et P(X)/P° pour un gaz parfait."] },
    { test:/quotient de r[ée]action|\bQ\b/i, replies:["Le quotient de réaction Q compare, à un instant donné, les activités des produits à celles des réactifs (pondérées par les coefficients stœchiométriques). On le compare à K° pour prévoir le sens d'évolution."] },
    { test:/force ionique/i, replies:["La force ionique I = (1/2)Σ Ci·zi² somme sur tous les ions de la solution : elle mesure l'encombrement électrostatique global, indépendamment de la nature chimique des ions."] },
    { test:/debye|coefficient d.activit[ée]/i, replies:["Le coefficient d'activité γi corrige l'écart entre concentration et activité réelle. Il vaut 1 en solution très diluée et diminue quand I augmente, selon -logγi ≈ 0,504·zi²·√I (loi de Debye-Hückel, forme simplifiée)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : calcule d'abord CM à partir de la masse et du volume.","Indice niveau 2 : n = m/M = 4,9/98 = 0,05 mol.","Indice niveau 3 : N = n_protons × CM = 2 × 0,2 = 0,4 N."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : quelle est l'activité d'un solide pur ?","Indice niveau 2 : elle vaut toujours 1.","Indice niveau 3 : Ag2CrO4(s) n'apparaît donc pas dans Q, qui se réduit à [Ag+]²[CrO4 2-]."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : combien d'ions Na+ et de SO4 2- donne une mole de Na2SO4 ?","Indice niveau 2 : [Na+]=0,04 mol/L et [SO4 2-]=0,02 mol/L.","Indice niveau 3 : I = 1/2(0,04×1² + 0,02×2²) = 0,06 mol/L."] }
  ]
};

/* =========================== CHAPITRE 2 =========================== */
CHIMSOL_CHAPTERS[csKey('Réactions acido-basiques : définitions et constantes')] = {
  objectives: [
    "Distinguer les définitions d'Arrhenius-Ostwald, de Brønsted-Lowry et de Lewis pour un acide et une base",
    "Identifier un couple acide-base conjugué, un polyacide, une polybase et une espèce amphotère",
    "Écrire la constante d'acidité Ka, la constante de basicité Kb et relier pKa, pKb et pKe",
    "Classer des couples acide-base sur une échelle de pKa et tracer un diagramme de prédominance"
  ],
  prereqs: ["Généralités sur les solutions aqueuses"],
  bodyHtml: `
    <p>Les réactions acido-basiques reposent sur l'échange d'un proton hydraté H₃O⁺ (ion hydronium ou oxonium). Elles sont omniprésentes : régulation du pH sanguin, pluies acides, dosages analytiques... Ce chapitre pose les définitions et les constantes qui permettront, au chapitre suivant, de calculer un pH.</p>

    <h3>1. Trois définitions de l'acide et de la base</h3>
    <table class="mini-table">
      <tr><th>Théorie</th><th>Acide</th><th>Base</th><th>Limite</th></tr>
      <tr><td>Arrhenius-Ostwald (1880)</td><td>libère H⁺ dans l'eau</td><td>libère OH⁻ dans l'eau</td><td>seulement en solution aqueuse ; exclut BF₃, NH₃...</td></tr>
      <tr><td>Brønsted-Lowry (1923)</td><td>donneur de proton(s)</td><td>accepteur de proton(s)</td><td>l'acide doit contenir un H ; s'étend aux milieux non aqueux</td></tr>
      <tr><td>Lewis (1923)</td><td>lacune électronique</td><td>doublet électronique disponible</td><td>très générale, dépasse le cadre acido-basique usuel</td></tr>
    </table>
    <p>En chimie des solutions, la théorie de <strong>Brønsted-Lowry</strong> est la plus adaptée, à condition de conserver l'approche d'Arrhenius pour les hydroxydes métalliques (NaOH, KOH...).</p>

    <h3>2. Couple acide-base conjugué</h3>
    <p>Une espèce acide AH, en cédant un proton, forme sa <strong>base conjuguée</strong> A⁻ ; réciproquement A⁻, en captant un proton, redonne son <strong>acide conjugué</strong> AH. Le couple AH/A⁻ (ou BH⁺/B) est un couple acide-base.</p>
    <div class="formula-box">$$\\\\text{AH} \\\\rightleftharpoons \\\\text{A}^- + \\\\text{H}^+ \\\\qquad (\\\\text{couple AH/A}^-)$$</div>
    <p>Exemples courants : $\\\\text{HNO}_2/\\\\text{NO}_2^-$, $\\\\text{NH}_4^+/\\\\text{NH}_3$, $\\\\text{CH}_3\\\\text{COOH}/\\\\text{CH}_3\\\\text{COO}^-$ (pKa = 4,8), $\\\\text{H}_2\\\\text{CO}_3/\\\\text{HCO}_3^-$ (pKa = 6,4, régulation du pH sanguin).</p>

    <h3>3. Polyacides, polybases et espèces amphotères</h3>
    <p>Un <strong>polyacide</strong> peut céder plusieurs protons successivement (ex. $\\\\text{H}_3\\\\text{PO}_4$, triacide : $\\\\text{p}K_{a1}=2{,}2$, $\\\\text{p}K_{a2}=7{,}2$, $\\\\text{p}K_{a3}=12{,}3$). Une <strong>polybase</strong> peut en capter plusieurs (ex. $\\\\text{PO}_4^{3-}$). Une espèce qui se comporte en acide dans un couple et en base dans un autre — comme $\\\\text{H}_2\\\\text{PO}_4^-$ ou $\\\\text{HPO}_4^{2-}$ — est dite <strong>amphotère</strong> (ou ampholyte).</p>
    <div class="key-point">
      <span class="eyebrow">Cas particulier — acides α-aminés</span>
      Un acide aminé possède à la fois une fonction acide carboxylique (–COOH) et une fonction basique amine (–NH₂) : c'est une espèce amphotère à deux (voire trois) acidités, dont le comportement dépend fortement du pH du milieu.
    </div>
    <p>L'eau elle-même est amphotère : elle intervient comme acide dans le couple $\\\\text{H}_2\\\\text{O}/\\\\text{OH}^-$ et comme base dans le couple $\\\\text{H}_3\\\\text{O}^+/\\\\text{H}_2\\\\text{O}$.</p>

    <h3>4. Constantes d'acidité Ka et de basicité Kb</h3>
    <p>Pour le couple AH/A⁻, la réaction $\\\\text{AH} + \\\\text{H}_2\\\\text{O} \\\\rightleftharpoons \\\\text{A}^- + \\\\text{H}_3\\\\text{O}^+$ obéit à la loi de Guldberg et Waage. Comme $a(\\\\text{H}_2\\\\text{O})=1$, la <strong>constante d'acidité</strong> s'écrit :</p>
    <div class="formula-box">$$K_a = \\\\dfrac{[\\\\text{A}^-][\\\\text{H}_3\\\\text{O}^+]}{[\\\\text{AH}]} \\\\qquad \\\\text{p}K_a = -\\\\log K_a$$</div>
    <p>Cette expression, combinée à la définition du pH ($\\\\text{pH} = -\\\\log[\\\\text{H}_3\\\\text{O}^+]$), donne la relation de <strong>Henderson-Hasselbalch</strong>, essentielle pour les solutions tampons (chapitre suivant) :</p>
    <div class="formula-box">$$\\\\text{pH} = \\\\text{p}K_a + \\\\log \\\\dfrac{[\\\\text{A}^-]}{[\\\\text{AH}]}$$</div>
    <p>De même, pour une base B, la réaction $\\\\text{B} + \\\\text{H}_2\\\\text{O} \\\\rightleftharpoons \\\\text{BH}^+ + \\\\text{OH}^-$ définit la <strong>constante de basicité</strong> $K_b = \\\\dfrac{[\\\\text{BH}^+][\\\\text{OH}^-]}{[\\\\text{B}]}$, avec $\\\\text{p}K_b=-\\\\log K_b$.</p>

    <h3>5. Autoprotolyse de l'eau et relation pKa – pKb</h3>
    <p>L'eau réagit avec elle-même selon $2\\\\text{H}_2\\\\text{O} \\\\rightleftharpoons \\\\text{H}_3\\\\text{O}^+ + \\\\text{OH}^-$, de constante le <strong>produit ionique</strong> de l'eau : $K_e = [\\\\text{H}_3\\\\text{O}^+][\\\\text{OH}^-] = 10^{-14}$ à 25 °C, soit $\\\\text{p}K_e = 14$. Pour un couple AH/A⁻ donné, la somme des réactions d'acidité et de basicité de A⁻ redonne l'autoprotolyse de l'eau, d'où la relation clé :</p>
    <div class="formula-box">$$K_a \\\\cdot K_b = K_e \\\\qquad \\\\Leftrightarrow \\\\qquad \\\\text{p}K_a + \\\\text{p}K_b = \\\\text{p}K_e = 14 \\\\ (\\\\text{à }25\\\\ °\\\\text{C})$$</div>
    <p>Cette relation permet de calculer $K_b$ (ou $\\\\text{p}K_b$) de la base conjuguée dès que l'on connaît $K_a$ (ou $\\\\text{p}K_a$) de l'acide, et réciproquement.</p>

    <h3>6. Force des acides et des bases ; échelle de pKa</h3>
    <p>Plus $K_a$ est grand (ou $\\\\text{p}K_a$ petit), plus l'acide est fort. Un <strong>acide fort</strong> (pKa très négatif, ex. HCl, HNO₃) est totalement dissocié dans l'eau : sa réaction avec l'eau est quasi totale. Un <strong>acide faible</strong> (ex. CH₃COOH, pKa = 4,8) n'est que partiellement dissocié : un équilibre s'établit. La même distinction existe pour les bases (fortes : NaOH, KOH ; faibles : NH₃).</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 60" width="100%">
          <line x1="15" y1="30" x2="205" y2="30" stroke="#3A4658" stroke-width="1.5"/>
          <text x="10" y="14" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">acide fort</text>
          <text x="175" y="14" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">base forte</text>
          <circle cx="40" cy="30" r="3" fill="#F0555C"/><text x="30" y="48" font-size="7" fill="#EAF0FB">HCl</text>
          <circle cx="90" cy="30" r="3" fill="#E8A93A"/><text x="75" y="48" font-size="7" fill="#EAF0FB">CH3COOH</text>
          <circle cx="140" cy="30" r="3" fill="#1FB6A8"/><text x="130" y="48" font-size="7" fill="#EAF0FB">NH4+</text>
          <circle cx="190" cy="30" r="3" fill="#3D6BF0"/><text x="178" y="48" font-size="7" fill="#EAF0FB">OH-</text>
        </svg>
        <span>Échelle qualitative de pKa croissant, de l'acide fort à la base forte</span>
      </div>
    </div>

    <h3>7. Domaines et diagrammes de prédominance</h3>
    <p>D'après Henderson-Hasselbalch, $\\\\text{pH} = \\\\text{p}K_a$ lorsque $[\\\\text{A}^-]=[\\\\text{AH}]$. On en déduit un <strong>diagramme de prédominance</strong> très utile pour raisonner qualitativement sans calcul :</p>
    <div class="formula-box">
      $\\\\text{pH} < \\\\text{p}K_a$ : la forme <strong>acide AH prédomine</strong><br>
      $\\\\text{pH} > \\\\text{p}K_a$ : la forme <strong>basique A⁻ prédomine</strong><br>
      $\\\\text{pH} = \\\\text{p}K_a$ : $[\\\\text{AH}]=[\\\\text{A}^-]$ (mélange équimolaire)
    </div>
    <p>Les <strong>courbes de distribution</strong> (fraction molaire de chaque forme en fonction du pH) permettent de visualiser en continu cette bascule, particulièrement utile pour les polyacides qui possèdent plusieurs zones de prédominance successives, séparées par leurs différents pKa.</p>

    <div class="example-box">
      <p><strong>Exemple.</strong> Pour l'acide phosphorique ($\\\\text{p}K_{a1}=2{,}2$ ; $\\\\text{p}K_{a2}=7{,}2$ ; $\\\\text{p}K_{a3}=12{,}3$), à pH = 7 la forme très largement majoritaire est $\\\\text{H}_2\\\\text{PO}_4^-$ (entre pKa1 et pKa2, proche de pKa2 donc un peu de $\\\\text{HPO}_4^{2-}$ coexiste) ; à pH = 1 c'est $\\\\text{H}_3\\\\text{PO}_4$ qui domine ; à pH = 13 c'est $\\\\text{PO}_4^{3-}$.</p>
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Brønsted : acide = donneur de proton, base = accepteur de proton ; couple conjugué AH/A⁻</li>
        <li>$K_a = [\\\\text{A}^-][\\\\text{H}_3\\\\text{O}^+]/[\\\\text{AH}]$ ; Henderson-Hasselbalch : $\\\\text{pH}=\\\\text{p}K_a+\\\\log([\\\\text{A}^-]/[\\\\text{AH}])$</li>
        <li>$K_a\\\\cdot K_b = K_e = 10^{-14}$ à 25 °C, soit $\\\\text{p}K_a+\\\\text{p}K_b=14$</li>
        <li>Diagramme de prédominance : AH domine si pH < pKa, A⁻ domine si pH > pKa</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre Ka (constante) et pKa (son cologarithme) — un pKa faible signifie un Ka grand, donc un acide fort</li>
        <li>Oublier que la relation pKa+pKb=14 ne vaut qu'à 25 °C (Ke dépend de la température)</li>
        <li>Écrire un couple acide-base à l'envers (toujours acide à gauche, base conjuguée à droite)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">La base conjuguée de l'ion $\\\\text{HCO}_3^-$ (hydrogénocarbonate) est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs2e1" value="wrong"> $\\\\text{H}_2\\\\text{CO}_3$</label>
          <label class="option"><input type="radio" name="cs2e1" value="right"> $\\\\text{CO}_3^{2-}$</label>
          <label class="option"><input type="radio" name="cs2e1" value="wrong"> $\\\\text{CO}_2$</label>
          <label class="option"><input type="radio" name="cs2e1" value="wrong"> $\\\\text{OH}^-$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs2e1','cs2fb1','Correct — HCO3- cède un proton pour donner CO3 2-, sa base conjuguée.','La base conjuguée s\\'obtient en retirant un proton H+ à l\\'espèce donnée.')">Vérifier</button>
        <div class="feedback" id="cs2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un acide a un pKa de 9,2. Quel est le pKb de sa base conjuguée (à 25 °C) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs2e2" value="wrong"> 9,2</label>
          <label class="option"><input type="radio" name="cs2e2" value="right"> 4,8</label>
          <label class="option"><input type="radio" name="cs2e2" value="wrong"> 14</label>
          <label class="option"><input type="radio" name="cs2e2" value="wrong"> 5,2</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs2e2','cs2fb2','Correct — pKa + pKb = 14, donc pKb = 14 - 9,2 = 4,8.','Utilise la relation pKa + pKb = pKe = 14 à 25°C.')">Vérifier</button>
        <div class="feedback" id="cs2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour le couple CH₃COOH/CH₃COO⁻ (pKa = 4,8), à pH = 7, quelle forme prédomine ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs2e3" value="wrong"> CH₃COOH (forme acide)</label>
          <label class="option"><input type="radio" name="cs2e3" value="right"> CH₃COO⁻ (forme basique)</label>
          <label class="option"><input type="radio" name="cs2e3" value="wrong"> Les deux formes sont rigoureusement égales</label>
          <label class="option"><input type="radio" name="cs2e3" value="wrong"> On ne peut pas savoir sans plus de données</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs2e3','cs2fb3','Correct — pH (7) > pKa (4,8), donc la forme basique CH3COO- prédomine.','Rappelle-toi la règle du diagramme de prédominance : pH > pKa fait dominer la forme basique.')">Vérifier</button>
        <div class="feedback" id="cs2fb3"></div>
      </div>
    </div>
  `
};

CHIMSOL_NOVA_KB[csKey('Réactions acido-basiques : définitions et constantes')] = {
  intro: "Salut, c'est Nova ! On est sur « Réactions acido-basiques : définitions et constantes ». Demande-moi la différence entre Brønsted et Lewis, comment relier pKa et pKb, ou un indice sur un exercice.",
  rules: [
    { test:/br[oø]nsted|arrhenius|lewis/i, replies:["Arrhenius : acide/base doit libérer H+/OH- dans l'eau. Brønsted : acide = donneur de proton, base = accepteur de proton (plus général). Lewis : acide = lacune électronique, base = doublet disponible (encore plus général, mais on l'utilise peu ici)."] },
    { test:/couple|conjugu[ée]e?/i, replies:["Un couple acide-base AH/A- relie un acide à sa base conjuguée : AH cède un proton pour donner A-. On écrit toujours l'acide à gauche, la base à droite."] },
    { test:/amphot[eè]re|ampholyte/i, replies:["Une espèce amphotère se comporte en acide dans un couple et en base dans un autre — par exemple HCO3-, H2PO4- ou HPO4 2-."] },
    { test:/henderson|hasselbalch/i, replies:["La relation de Henderson-Hasselbalch : pH = pKa + log([A-]/[AH]). Elle découle directement de l'expression de Ka et de la définition du pH."] },
    { test:/pka.*pkb|pkb.*pka|ke\b/i, replies:["À 25°C : pKa + pKb = pKe = 14 pour un couple donné. Cette relation vient du fait que Ka×Kb = Ke, le produit ionique de l'eau."] },
    { test:/pr[ée]dominance/i, replies:["Diagramme de prédominance : si pH < pKa, la forme acide AH domine ; si pH > pKa, c'est la forme basique A- qui domine ; à pH = pKa, les deux sont à égalité."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : la base conjuguée s'obtient en retirant un proton.","Indice niveau 2 : HCO3- a une charge -1 et un H.","Indice niveau 3 : en retirant ce H+, on obtient CO3 2-."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise pKa + pKb = 14.","Indice niveau 2 : pKb = 14 - pKa.","Indice niveau 3 : 14 - 9,2 = 4,8."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare pH et pKa.","Indice niveau 2 : ici pH=7 est supérieur à pKa=4,8.","Indice niveau 3 : pH > pKa fait dominer la forme basique, donc CH3COO-."] }
  ]
};

/* =========================== CHAPITRE 3 =========================== */
CHIMSOL_CHAPTERS[csKey('Calculs de pH en solution aqueuse')] = {
  objectives: [
    "Calculer le pH d'un acide fort, d'une base forte, d'un acide faible et d'une base faible seuls en solution",
    "Calculer le pH d'une solution tampon (acide faible + base conjuguée)",
    "Calculer le pH d'une espèce amphotère et le point isoélectrique d'un acide aminé",
    "Choisir entre méthode systématique et méthode de la réaction prépondérante selon le mélange étudié"
  ],
  prereqs: ["Réactions acido-basiques : définitions et constantes"],
  bodyHtml: `
    <p>Ce chapitre applique les constantes du chapitre précédent au calcul concret du pH, pour les cas les plus fréquemment rencontrés : espèce seule en solution, mélanges tampons, espèces amphotères.</p>

    <h3>1. Deux méthodes de calcul</h3>
    <table class="mini-table">
      <tr><th>Méthode</th><th>Principe</th><th>Quand l'utiliser</th></tr>
      <tr><td>Méthode systématique</td><td>bilan de matière + électroneutralité + toutes les constantes d'équilibre, résolu rigoureusement</td><td>cas complexes, mélanges multiples</td></tr>
      <tr><td>Réaction prépondérante</td><td>on identifie la réaction qui fixe majoritairement le pH, on néglige les autres</td><td>cas courants, calcul rapide (utilisée dans tout ce chapitre)</td></tr>
    </table>

    <h3>2. pH d'un acide fort ou d'une base forte</h3>
    <p>Un acide fort HA de concentration apportée $C_a$ est totalement dissocié : $[\\\\text{H}_3\\\\text{O}^+] \\\\approx C_a$ (l'autoprotolyse de l'eau est négligeable dès que $C_a \\\\gg 10^{-7}\\\\ \\\\text{mol/L}$).</p>
    <div class="formula-box">$$\\\\text{Acide fort : } \\\\text{pH} = -\\\\log C_a \\\\qquad\\\\qquad \\\\text{Base forte : } \\\\text{pH} = 14 + \\\\log C_b$$</div>
    <p>Pour une base forte de concentration $C_b$ : $[\\\\text{OH}^-]\\\\approx C_b$, d'où $\\\\text{pOH}=-\\\\log C_b$ et $\\\\text{pH}=14-\\\\text{pOH}$.</p>

    <h3>3. pH d'un acide faible seul en solution</h3>
    <p>Pour un acide faible AH de concentration apportée $C_a$ et de constante $K_a$, la réaction prépondérante est $\\\\text{AH} + \\\\text{H}_2\\\\text{O} \\\\rightleftharpoons \\\\text{A}^- + \\\\text{H}_3\\\\text{O}^+$. En posant $x=[\\\\text{H}_3\\\\text{O}^+]$ et en supposant la dissociation faible ($x \\\\ll C_a$) :</p>
    <div class="formula-box">$$K_a = \\\\dfrac{x^2}{C_a - x} \\\\approx \\\\dfrac{x^2}{C_a} \\\\quad\\\\Rightarrow\\\\quad \\\\text{pH} \\\\approx \\\\dfrac{1}{2}(\\\\text{p}K_a - \\\\log C_a)$$</div>
    <p>Cette formule simplifiée n'est valable que si l'approximation $x \\\\ll C_a$ est vérifiée a posteriori (typiquement $C_a/K_a > 100$, ou de façon équivalente si le taux de dissociation $\\\\alpha < 5\\\\%$) — sinon il faut résoudre l'équation du second degré complète.</p>
    <div class="example-box">
      <p><strong>Exemple.</strong> Acide acétique $C_a = 0{,}1\\\\ \\\\text{mol/L}$, $\\\\text{p}K_a = 4{,}8$. $\\\\text{pH} \\\\approx \\\\tfrac12(4{,}8-(-1)) = \\\\tfrac12(5{,}8) = 2{,}9$. Vérification : $\\\\alpha = x/C_a \\\\approx 10^{-2{,}9}/0{,}1 \\\\approx 1{,}3\\\\%$, l'approximation est bien justifiée.</p>
    </div>

    <h3>4. pH d'une base faible seule en solution</h3>
    <p>Par symétrie, pour une base faible B de concentration $C_b$ et de constante $K_b$ (réaction prépondérante $\\\\text{B} + \\\\text{H}_2\\\\text{O} \\\\rightleftharpoons \\\\text{BH}^+ + \\\\text{OH}^-$) :</p>
    <div class="formula-box">$$\\\\text{pOH} \\\\approx \\\\dfrac{1}{2}(\\\\text{p}K_b - \\\\log C_b) \\\\qquad\\\\Rightarrow\\\\qquad \\\\text{pH} = 14 - \\\\text{pOH} \\\\approx 7 + \\\\dfrac{1}{2}(\\\\text{p}K_a + \\\\log C_b)$$</div>
    <p>où $\\\\text{p}K_a$ est celui de l'acide conjugué BH⁺ (utile car les tables de pKa sont souvent données pour la forme acide).</p>

    <h3>5. pH de polyacides ou de polybases</h3>
    <p>Lorsque les pKa successifs sont suffisamment espacés (écart $>4$ unités, ce qui est le cas usuel), on peut traiter le premier équilibre de dissociation isolément — les suivants sont négligeables devant le premier — et appliquer directement la formule de l'acide faible avec $K_{a1}$.</p>

    <h3>6. Solution tampon : acide faible + sa base conjuguée</h3>
    <p>Un mélange d'un acide faible AH et de sa base conjuguée A⁻ (apportés en quantités comparables, par exemple par dissolution d'un sel comme l'acétate de sodium avec l'acide acétique) constitue une <strong>solution tampon</strong>. Le pH se calcule directement par Henderson-Hasselbalch, en assimilant les concentrations à l'équilibre aux concentrations apportées (l'équilibre est peu déplacé) :</p>
    <div class="formula-box">$$\\\\text{pH} = \\\\text{p}K_a + \\\\log \\\\dfrac{C_{\\\\text{base}}}{C_{\\\\text{acide}}}$$</div>
    <div class="key-point">
      <span class="eyebrow">Propriété du tampon</span>
      Le pH d'une solution tampon varie très peu par ajout modéré d'acide, de base, ou par dilution — tant que $C_{\\\\text{acide}}$ et $C_{\\\\text{base}}$ restent du même ordre de grandeur (rapport entre 0,1 et 10). Le pouvoir tampon est maximal quand $\\\\text{pH}=\\\\text{p}K_a$ (mélange équimolaire).
    </div>

    <h3>7. Mélange équimolaire d'un acide faible et d'une base faible</h3>
    <p>Si l'on mélange en proportions égales un acide faible A₁H et une base faible B₂ n'appartenant pas au même couple, la réaction prépondérante est le transfert de proton entre les deux couples : $\\\\text{A}_1\\\\text{H} + \\\\text{B}_2 \\\\rightleftharpoons \\\\text{A}_1^- + \\\\text{B}_2\\\\text{H}^+$. Le pH obtenu est, en première approximation, indépendant de la concentration :</p>
    <div class="formula-box">$$\\\\text{pH} \\\\approx \\\\dfrac{1}{2}(\\\\text{p}K_{a1} + \\\\text{p}K_{a2})$$</div>
    <p>où $\\\\text{p}K_{a1}$ et $\\\\text{p}K_{a2}$ sont les pKa des deux couples acide-base mis en jeu.</p>

    <h3>8. pH d'une espèce amphotère</h3>
    <p>Pour une espèce amphotère HA⁻ (par exemple $\\\\text{HCO}_3^-$ ou $\\\\text{H}_2\\\\text{PO}_4^-$), encadrée par deux couples $\\\\text{H}_2\\\\text{A}/\\\\text{HA}^-$ ($\\\\text{p}K_{a1}$) et $\\\\text{HA}^-/\\\\text{A}^{2-}$ ($\\\\text{p}K_{a2}$), le pH est — comme pour le mélange équimolaire — indépendant de la concentration en première approximation :</p>
    <div class="formula-box">$$\\\\text{pH} \\\\approx \\\\dfrac{1}{2}(\\\\text{p}K_{a1} + \\\\text{p}K_{a2})$$</div>
    <p>C'est le même résultat que pour le mélange acide faible/base faible équimolaire, ce qui n'est pas un hasard : une espèce amphotère HA⁻ peut être vue comme un mélange équimolaire « interne » de son couple acide (HA⁻ jouant le rôle de base de H₂A) et de son couple basique (HA⁻ jouant le rôle d'acide de A²⁻).</p>

    <h3>9. Point isoélectrique des acides α-aminés</h3>
    <p>Pour un acide aminé simple, possédant une fonction $-\\\\text{COOH}/-\\\\text{COO}^-$ ($\\\\text{p}K_{a1}$) et une fonction $-\\\\text{NH}_3^+/-\\\\text{NH}_2$ ($\\\\text{p}K_{a2}$), la forme <strong>zwittérionique</strong> (globalement neutre, $^+\\\\text{H}_3\\\\text{N}-\\\\text{CHR}-\\\\text{COO}^-$) est amphotère. Le <strong>point isoélectrique</strong> $\\\\text{pH}_I$, pH auquel la charge globale moyenne de la molécule est nulle, est donné par la même formule que le pH d'une espèce amphotère :</p>
    <div class="formula-box">$$\\\\text{pH}_I = \\\\dfrac{1}{2}(\\\\text{p}K_{a1} + \\\\text{p}K_{a2})$$</div>
    <p>Au point isoélectrique, la molécule ne migre pas sous champ électrique (électrophorèse) : c'est une propriété exploitée en biochimie analytique pour séparer des protéines.</p>

    <h3>10. Mélanges plus complexes</h3>
    <p>Pour un mélange d'une base forte et d'un acide faible en défaut, ou de deux acides faibles, on identifie d'abord la réaction prépondérante (généralement, la réaction quasi totale entre la base forte — ou l'acide le plus fort — et l'espèce en présence), on calcule l'état après cette réaction, puis on applique la formule adaptée au cas résultant (acide faible seul, tampon, ou espèce amphotère selon les proportions).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ Formulaire à retenir</span>
      <ul>
        <li>Acide fort : $\\\\text{pH}=-\\\\log C_a$ ; base forte : $\\\\text{pH}=14+\\\\log C_b$</li>
        <li>Acide faible seul : $\\\\text{pH}\\\\approx\\\\tfrac12(\\\\text{p}K_a-\\\\log C_a)$ (valable si $C_a/K_a>100$)</li>
        <li>Tampon (Henderson-Hasselbalch) : $\\\\text{pH}=\\\\text{p}K_a+\\\\log(C_{\\\\text{base}}/C_{\\\\text{acide}})$</li>
        <li>Espèce amphotère / mélange équimolaire acide-base / point isoélectrique : $\\\\text{pH}\\\\approx\\\\tfrac12(\\\\text{p}K_{a1}+\\\\text{p}K_{a2})$, indépendant de la concentration</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la formule simplifiée de l'acide faible sans vérifier a posteriori que $x\\\\ll C_a$</li>
        <li>Oublier que le pH d'une espèce amphotère ne dépend (presque) pas de sa concentration</li>
        <li>Confondre concentration apportée (avant équilibre) et concentration à l'équilibre dans Henderson-Hasselbalch — pour un vrai tampon, elles sont proches, mais ce n'est pas systématique</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Quel est le pH d'une solution d'acide acétique ($\\\\text{p}K_a=4{,}8$) à $C_a=10^{-2}\\\\ \\\\text{mol/L}$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs3e1" value="wrong"> pH = 2,0</label>
          <label class="option"><input type="radio" name="cs3e1" value="right"> pH ≈ 3,4</label>
          <label class="option"><input type="radio" name="cs3e1" value="wrong"> pH = 4,8</label>
          <label class="option"><input type="radio" name="cs3e1" value="wrong"> pH = 9,4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs3e1','cs3fb1','Correct — pH = 1/2(pKa - logCa) = 1/2(4,8-(-2)) = 1/2(6,8) = 3,4.','Applique pH = 1/2(pKa - log Ca) avec log(10-2) = -2.')">Vérifier</button>
        <div class="feedback" id="cs3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un tampon contient 0,2 mol/L de CH₃COOH et 0,05 mol/L de CH₃COO⁻ (pKa = 4,8). Quel est son pH ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs3e2" value="wrong"> 4,8</label>
          <label class="option"><input type="radio" name="cs3e2" value="right"> 4,2</label>
          <label class="option"><input type="radio" name="cs3e2" value="wrong"> 5,4</label>
          <label class="option"><input type="radio" name="cs3e2" value="wrong"> 3,4</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs3e2','cs3fb2','Correct — pH = pKa + log(Cbase/Cacide) = 4,8 + log(0,05/0,2) = 4,8 + log(0,25) = 4,8 - 0,6 = 4,2.','Utilise Henderson-Hasselbalch : pH = pKa + log([base]/[acide]) ; ici la base est minoritaire donc pH < pKa.')">Vérifier</button>
        <div class="feedback" id="cs3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La glycine a pKa1 = 2,3 (COOH) et pKa2 = 9,6 (NH3+). Quel est son point isoélectrique ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs3e3" value="wrong"> pH = 2,3</label>
          <label class="option"><input type="radio" name="cs3e3" value="wrong"> pH = 9,6</label>
          <label class="option"><input type="radio" name="cs3e3" value="right"> pH ≈ 5,95</label>
          <label class="option"><input type="radio" name="cs3e3" value="wrong"> pH = 7,0</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs3e3','cs3fb3','Correct — pHI = 1/2(pKa1+pKa2) = 1/2(2,3+9,6) = 5,95.','Le point isoélectrique d\\'un acide aminé est la moyenne de ses deux pKa encadrant la forme zwittérionique.')">Vérifier</button>
        <div class="feedback" id="cs3fb3"></div>
      </div>
    </div>
  `
};

CHIMSOL_NOVA_KB[csKey('Calculs de pH en solution aqueuse')] = {
  intro: "Salut, c'est Nova ! On est sur « Calculs de pH en solution aqueuse ». Demande-moi la formule du pH d'un acide faible, d'un tampon, ou un indice sur un exercice.",
  rules: [
    { test:/acide fort|base forte/i, replies:["Acide fort : pH = -log Ca (dissociation totale). Base forte : pH = 14 + log Cb. Pas de constante Ka/Kb à utiliser, la réaction avec l'eau est quasi totale."] },
    { test:/acide faible/i, replies:["Pour un acide faible seul : pH ≈ 1/2(pKa - log Ca), à condition de vérifier a posteriori que la dissociation reste faible (Ca/Ka > 100 typiquement)."] },
    { test:/tampon|henderson/i, replies:["Le pH d'un tampon se calcule par Henderson-Hasselbalch : pH = pKa + log(Cbase/Cacide). C'est la formule la plus utilisée de ce chapitre — retiens-la par cœur !"] },
    { test:/amphot[eè]re|isoélectrique|isoelectrique/i, replies:["Pour une espèce amphotère ou un point isoélectrique, le pH ne dépend (presque) pas de la concentration : pH ≈ 1/2(pKa1+pKa2), moyenne des deux pKa qui encadrent l'espèce."] },
    { test:/m[ée]lange.*[ée]quimolaire|deux bases|deux acides/i, replies:["Un mélange équimolaire d'un acide faible et d'une base faible (couples différents) donne aussi pH ≈ 1/2(pKa1+pKa2) — même formule que pour une espèce amphotère."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique pH = 1/2(pKa - log Ca).","Indice niveau 2 : log(10^-2) = -2.","Indice niveau 3 : pH = 1/2(4,8+2) = 3,4."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : utilise Henderson-Hasselbalch avec le rapport base/acide.","Indice niveau 2 : ici la base (0,05) est minoritaire par rapport à l'acide (0,2).","Indice niveau 3 : pH = 4,8 + log(0,25) = 4,8 - 0,6 = 4,2."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le point isoélectrique est la moyenne des deux pKa.","Indice niveau 2 : (2,3+9,6)/2.","Indice niveau 3 : pHI = 5,95."] }
  ]
};

/* =========================== CHAPITRE 4 =========================== */
CHIMSOL_CHAPTERS[csKey('Titrages acido-basiques')] = {
  objectives: [
    "Définir l'équivalence d'un titrage et la relation qui la caractérise",
    "Décrire l'allure d'une courbe de titrage pH-métrique acide fort/base forte et acide faible/base forte",
    "Interpréter une courbe de suivi conductimétrique et repérer la rupture de pente à l'équivalence",
    "Analyser le titrage d'un polyacide et choisir un indicateur coloré adapté à un titrage donné"
  ],
  prereqs: ["Calculs de pH en solution aqueuse"],
  bodyHtml: `
    <p>Un titrage (ou dosage) acido-basique consiste à déterminer la concentration inconnue d'un acide ou d'une base en le faisant réagir avec une solution titrante de concentration connue, jusqu'à l'équivalence.</p>

    <h3>1. Définitions et méthodes</h3>
    <p>L'<strong>équivalence</strong> d'un titrage est atteinte lorsque les réactifs ont été mélangés dans les proportions stœchiométriques exactes de la réaction de titrage. Pour un titrage d'un monoacide $C_aV_a$ par une monobase $C_bV_b$, à l'équivalence :</p>
    <div class="formula-box">$$C_a V_a = C_b V_{b,\\\\text{éq}}$$</div>
    <p>Deux méthodes principales permettent de repérer l'équivalence expérimentalement : le <strong>suivi pH-métrique</strong> (mesure continue du pH à l'électrode de verre) et le <strong>suivi conductimétrique</strong> (mesure continue de la conductivité) ; on peut aussi utiliser un <strong>indicateur coloré</strong> dont la zone de virage encadre le pH d'équivalence.</p>

    <h3>2. Titrage acide fort – base forte</h3>
    <p>Réaction de titrage : $\\\\text{H}_3\\\\text{O}^+ + \\\\text{OH}^- \\\\rightarrow 2\\\\text{H}_2\\\\text{O}$, de constante $K^0=1/K_e=10^{14}$ : la réaction est totale, ce qui donne une courbe de titrage avec un <strong>saut de pH très marqué</strong> autour de l'équivalence.</p>
    <table class="mini-table">
      <tr><th>Zone</th><th>pH</th></tr>
      <tr><td>Avant l'équivalence</td><td>fixé par l'excès d'acide fort restant : $\\\\text{pH}=-\\\\log\\\\dfrac{C_aV_a-C_bV_b}{V_a+V_b}$</td></tr>
      <tr><td>À l'équivalence</td><td>$\\\\text{pH}=7$ (solution de sel neutre, ex. NaCl)</td></tr>
      <tr><td>Après l'équivalence</td><td>fixé par l'excès de base forte : $\\\\text{pH}=14+\\\\log\\\\dfrac{C_bV_b-C_aV_a}{V_a+V_b}$</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <line x1="20" y1="88" x2="150" y2="88" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="88" x2="20" y2="8" stroke="#3A4658" stroke-width="1"/>
          <path d="M22,78 Q60,72 78,50 Q86,38 88,18 Q100,10 145,8" stroke="#3D6BF0" stroke-width="2" fill="none"/>
          <line x1="83" y1="8" x2="83" y2="88" stroke="#E8A93A" stroke-width="1" stroke-dasharray="3,2"/>
          <text x="72" y="98" font-size="7" fill="#EAF0FB">Véq</text>
          <text x="4" y="14" font-size="7" fill="#EAF0FB">pH</text>
        </svg>
        <span>Titrage acide fort / base forte : saut de pH net, pH = 7 à l'équivalence</span>
      </div>
      <div class="illus-item">
        <svg viewBox="0 0 160 100" width="100%">
          <line x1="20" y1="88" x2="150" y2="88" stroke="#3A4658" stroke-width="1"/>
          <line x1="20" y1="88" x2="20" y2="8" stroke="#3A4658" stroke-width="1"/>
          <path d="M22,60 L83,45 L145,15" stroke="#1FB6A8" stroke-width="2" fill="none"/>
          <line x1="83" y1="8" x2="83" y2="88" stroke="#E8A93A" stroke-width="1" stroke-dasharray="3,2"/>
          <text x="72" y="98" font-size="7" fill="#EAF0FB">Véq</text>
          <text x="4" y="14" font-size="7" fill="#EAF0FB">σ</text>
        </svg>
        <span>Suivi conductimétrique : rupture de pente nette à l'équivalence</span>
      </div>
    </div>

    <h3>3. Suivi conductimétrique acide fort – base forte</h3>
    <p>La conductivité totale est la somme des contributions de tous les ions. Avant l'équivalence, les ions $\\\\text{H}_3\\\\text{O}^+$ (très mobiles) sont progressivement remplacés par des ions moins mobiles apportés par la base (ex. Na⁺) : la conductivité <strong>diminue</strong>. Après l'équivalence, l'excès de base forte apporte des ions $\\\\text{OH}^-$ (très mobiles) : la conductivité <strong>augmente</strong> de nouveau. La courbe $\\\\sigma=f(V)$ présente donc une <strong>rupture de pente</strong> nette à l'équivalence — un simple tracé de deux droites suffit à la repérer, sans avoir besoin de connaître pH = 7.</p>

    <h3>4. Titrage acide faible – base forte</h3>
    <p>La réaction de titrage $\\\\text{AH} + \\\\text{OH}^- \\\\rightarrow \\\\text{A}^- + \\\\text{H}_2\\\\text{O}$, de constante $K^0=K_a/K_e$, reste très supérieure à 1 (donc quasi totale) tant que $K_a$ n'est pas trop petit. La courbe diffère notablement du cas fort-fort :</p>
    <table class="mini-table">
      <tr><th>Zone</th><th>Comportement du pH</th></tr>
      <tr><td>Tout début du titrage</td><td>montée rapide (acide faible peu dissocié)</td></tr>
      <tr><td>Zone tampon (avant l'équivalence)</td><td>plateau : $\\\\text{pH}=\\\\text{p}K_a+\\\\log\\\\dfrac{[\\\\text{A}^-]}{[\\\\text{AH}]}$, peu sensible à l'ajout de base</td></tr>
      <tr><td>Demi-équivalence ($V_b=V_{\\\\text{éq}}/2$)</td><td>$[\\\\text{AH}]=[\\\\text{A}^-]$, donc $\\\\text{pH}=\\\\text{p}K_a$ exactement (méthode de détermination expérimentale du pKa)</td></tr>
      <tr><td>Équivalence</td><td>$\\\\text{pH}>7$ (solution de la base conjuguée A⁻ seule, basique)</td></tr>
      <tr><td>Après l'équivalence</td><td>fixé par l'excès de base forte, comme dans le cas fort-fort</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Point clé — lecture du pKa sur la courbe</span>
      La demi-équivalence d'un titrage acide faible/base forte est le moyen le plus direct de déterminer expérimentalement le pKa du couple : on lit simplement le pH pour $V_b = V_{\\\\text{éq}}/2$.
    </div>
    <p>Le suivi <strong>conductimétrique</strong> d'un acide faible est moins net : la conductivité varie peu au début (l'acide faible, peu dissocié, contribue peu), puis suit une évolution plus complexe dominée par l'apparition de A⁻ puis, après l'équivalence, par l'excès d'OH⁻ ; le suivi pH-métrique est donc généralement préféré pour ce cas.</p>

    <h3>5. Titrage d'un polyacide</h3>
    <p>Si les pKa successifs d'un polyacide sont suffisamment espacés (typiquement $\\\\Delta\\\\text{p}K_a > 4$), chaque acidité est titrée successivement et la courbe présente <strong>autant de sauts de pH que de pKa bien séparés</strong>, chacun encadré de son propre plateau tampon. Exemple : le titrage de $\\\\text{H}_3\\\\text{PO}_4$ par NaOH présente typiquement deux sauts nets (correspondant à $\\\\text{p}K_{a1}$ et $\\\\text{p}K_{a2}$) ; le troisième saut ($\\\\text{p}K_{a3}=12{,}3$, trop proche de $\\\\text{p}K_e=14$) est en général trop peu marqué pour être exploité. Le titrage d'une polybase par un acide fort suit un raisonnement symétrique.</p>

    <h3>6. Choix d'un indicateur coloré</h3>
    <p>Un indicateur coloré est lui-même un couple acide-base faible dont les deux formes ont des couleurs différentes ; sa <strong>zone de virage</strong> (environ $\\\\text{p}K_{a,\\\\text{indicateur}} \\\\pm 1$) doit être choisie de façon à encadrer le <strong>saut de pH</strong> observé à l'équivalence, et non nécessairement pH = 7. Pour un titrage acide faible/base forte, dont l'équivalence est basique, on choisira par exemple la phénolphtaléine (zone de virage 8,2–10) plutôt que le rouge de méthyle (zone de virage 4,4–6,2), plus adapté à une équivalence acide.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Équivalence d'un titrage monoacide/monobase : $C_aV_a = C_bV_{\\\\text{éq}}$</li>
        <li>Acide fort/base forte : pH = 7 à l'équivalence, saut de pH très net</li>
        <li>Acide faible/base forte : pH = pKa à la demi-équivalence ; pH > 7 à l'équivalence</li>
        <li>Suivi conductimétrique : rupture de pente à l'équivalence, sans passer par le pH</li>
        <li>Indicateur coloré : sa zone de virage doit encadrer le saut de pH réel, pas forcément pH = 7</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que le pH est toujours égal à 7 à l'équivalence — vrai seulement pour un titrage fort-fort</li>
        <li>Choisir un indicateur coloré virant autour de pH = 7 quelle que soit la nature du titrage</li>
        <li>Oublier la dilution (facteur $V_a/(V_a+V_b)$) dans le calcul du pH avant ou après l'équivalence</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">On titre 20 mL d'acide chlorhydrique par de la soude à 0,1 mol/L ; l'équivalence est atteinte pour 15 mL de soude versée. Quelle est la concentration de l'acide ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs4e1" value="wrong"> 0,10 mol/L</label>
          <label class="option"><input type="radio" name="cs4e1" value="right"> 0,075 mol/L</label>
          <label class="option"><input type="radio" name="cs4e1" value="wrong"> 0,15 mol/L</label>
          <label class="option"><input type="radio" name="cs4e1" value="wrong"> 0,20 mol/L</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs4e1','cs4fb1','Correct — CaVa = CbVeq donne Ca = (0,1×15)/20 = 0,075 mol/L.','Utilise CaVa = CbVéq et isole Ca.')">Vérifier</button>
        <div class="feedback" id="cs4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Lors du titrage d'un acide faible AH (pKa = 4,8) par NaOH, quel est le pH quand on a versé exactement la moitié du volume à l'équivalence ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs4e2" value="wrong"> pH = 7,0</label>
          <label class="option"><input type="radio" name="cs4e2" value="right"> pH = 4,8</label>
          <label class="option"><input type="radio" name="cs4e2" value="wrong"> pH = 2,4</label>
          <label class="option"><input type="radio" name="cs4e2" value="wrong"> pH = 9,6</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs4e2','cs4fb2','Correct — à la demi-équivalence, [AH]=[A-], donc pH = pKa = 4,8 exactement (Henderson-Hasselbalch avec log(1)=0).','À la demi-équivalence, la moitié de l\\'acide a été convertie en sa base conjuguée : les deux concentrations sont égales.')">Vérifier</button>
        <div class="feedback" id="cs4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour titrer un acide faible par une base forte (équivalence basique, pH ≈ 8,5), quel indicateur coloré choisir ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs4e3" value="wrong"> Rouge de méthyle (zone 4,4–6,2)</label>
          <label class="option"><input type="radio" name="cs4e3" value="right"> Phénolphtaléine (zone 8,2–10)</label>
          <label class="option"><input type="radio" name="cs4e3" value="wrong"> N'importe lequel, cela n'a pas d'importance</label>
          <label class="option"><input type="radio" name="cs4e3" value="wrong"> Un indicateur qui vire à pH = 7</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs4e3','cs4fb3','Correct — la zone de virage de la phénolphtaléine (8,2-10) encadre bien le pH d\\'équivalence attendu (8,5).','Choisis l\\'indicateur dont la zone de virage encadre le pH réel à l\\'équivalence, pas nécessairement pH=7.')">Vérifier</button>
        <div class="feedback" id="cs4fb3"></div>
      </div>
    </div>
  `
};

CHIMSOL_NOVA_KB[csKey('Titrages acido-basiques')] = {
  intro: "Salut, c'est Nova ! On est sur « Titrages acido-basiques ». Demande-moi comment repérer l'équivalence, pourquoi le pH n'est pas toujours 7, ou un indice sur un exercice.",
  rules: [
    { test:/[ée]quivalence/i, replies:["À l'équivalence d'un titrage monoacide/monobase : CaVa = CbVéq. Le pH à l'équivalence dépend du type de titrage : 7 pour fort-fort, >7 pour faible-fort, <7 pour fort-faible."] },
    { test:/demi.[ée]quivalence/i, replies:["À la demi-équivalence d'un titrage acide faible/base forte, [AH]=[A-], donc pH = pKa exactement : c'est le moyen le plus direct de mesurer un pKa expérimentalement."] },
    { test:/conductim[ée]trique|conductivit[ée]/i, replies:["Le suivi conductimétrique repère l'équivalence par une rupture de pente sur la courbe σ=f(V), sans qu'il soit nécessaire de connaître le pH d'équivalence."] },
    { test:/indicateur color[ée]/i, replies:["Un indicateur coloré doit avoir une zone de virage qui encadre le pH réel à l'équivalence — phénolphtaléine (8,2-10) pour une équivalence basique, rouge de méthyle (4,4-6,2) pour une équivalence acide."] },
    { test:/polyacide|plusieurs sauts/i, replies:["Le titrage d'un polyacide présente un saut de pH par acidité, à condition que les pKa successifs soient assez espacés (écart > 4 unités environ)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise CaVa = CbVéq.","Indice niveau 2 : Ca = Cb×Véq/Va.","Indice niveau 3 : Ca = 0,1×15/20 = 0,075 mol/L."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : que vaut le rapport [A-]/[AH] à la demi-équivalence ?","Indice niveau 2 : il vaut 1 (les concentrations sont égales).","Indice niveau 3 : log(1)=0, donc pH = pKa = 4,8."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : le pH d'équivalence attendu est 8,5, donc basique.","Indice niveau 2 : cherche l'indicateur dont la zone de virage encadre 8,5.","Indice niveau 3 : la phénolphtaléine (8,2-10) convient."] }
  ]
};

/* =========================== CHAPITRE 5 =========================== */
CHIMSOL_CHAPTERS[csKey('Réactions de complexation')] = {
  objectives: [
    "Définir un complexe, un ligand mono/polydentate et la coordinence d'un ion central",
    "Écrire la constante globale de formation βn et la constante de dissociation Kd d'un complexe",
    "Construire et lire un diagramme de prédominance en fonction de pL = -log[L]",
    "Comparer la stabilité de deux complexes en compétition pour un même ligand ou un même cation"
  ],
  prereqs: ["Titrages acido-basiques"],
  bodyHtml: `
    <p>Les réactions de complexation interviennent dans le transport de l'oxygène par l'hémoglobine, l'adoucissement de l'eau, ou encore la séparation de cations métalliques. Ce chapitre étudie la formation et la stabilité des ions complexes en solution.</p>

    <h3>1. Définition d'un complexe</h3>
    <p>Un <strong>complexe</strong> est un édifice polyatomique formé d'un atome (ou cation) <strong>central</strong>, possédant des lacunes électroniques (souvent un métal de transition : Cu²⁺, Fe³⁺, Ni²⁺...), auquel sont liés des <strong>ligands</strong> — molécules ou ions possédant au moins un doublet non liant (H₂O, NH₃, Cl⁻, CN⁻...). La formule d'un complexe se note entre crochets, la charge globale à l'extérieur : $[\\\\text{Cu}(\\\\text{H}_2\\\\text{O})_6]^{2+}$, $[\\\\text{Fe}(\\\\text{CN})_6]^{4-}$.</p>
    <table class="mini-table">
      <tr><th>Type de ligand</th><th>Nombre de liaisons formées</th><th>Exemple</th></tr>
      <tr><td>Monodentate</td><td>1</td><td>H₂O, NH₃, Cl⁻, CN⁻</td></tr>
      <tr><td>Bidentate</td><td>2</td><td>éthylènediamine « en »</td></tr>
      <tr><td>Polydentate (hexadentate)</td><td>6</td><td>EDTA, noté Y⁴⁻</td></tr>
    </table>
    <p>Le nombre de liaisons formées par l'ion central avec les ligands est sa <strong>coordinence</strong> (ou indice de coordination) — égal au nombre de ligands monodentates fixés (ex. $[\\\\text{Zn}(\\\\text{NH}_3)_4]^{2+}$ : coordinence 4).</p>

    <h3>2. Constante globale de formation βn</h3>
    <p>Pour la fixation successive de $n$ ligands L sur un ion central M, $\\\\text{M} + n\\\\text{L} \\\\rightleftharpoons \\\\text{ML}_n$, la <strong>constante globale de formation</strong> (ou constante de stabilité), notée $\\\\beta_n$, s'écrit :</p>
    <div class="formula-box">$$\\\\beta_n = \\\\dfrac{[\\\\text{ML}_n]}{[\\\\text{M}][\\\\text{L}]^n}$$</div>
    <p>Plus $\\\\beta_n$ est grande, plus la formation du complexe est quantitative et plus il est stable (donc difficile à dissocier). Son inverse, la <strong>constante globale de dissociation</strong> $K_d = 1/\\\\beta_n$, est également utilisée. On peut aussi introduire les <strong>constantes de formation successives</strong> $K_{fi}$, une par étape $\\\\text{ML}_{i-1}+\\\\text{L}\\\\rightleftharpoons \\\\text{ML}_i$, liées à $\\\\beta_n$ par $\\\\beta_n = K_{f1}\\\\cdot K_{f2}\\\\cdots K_{fn}$.</p>
    <div class="example-box">
      <p><strong>Exemple.</strong> Pour $\\\\text{Cu}^{2+} + 4\\\\text{NH}_3 \\\\rightleftharpoons [\\\\text{Cu}(\\\\text{NH}_3)_4]^{2+}$ : $\\\\beta_4 = \\\\dfrac{[[\\\\text{Cu}(\\\\text{NH}_3)_4]^{2+}]}{[\\\\text{Cu}^{2+}][\\\\text{NH}_3]^4}$. À 25 °C, $\\\\log\\\\beta_4 \\\\approx 12{,}6$ : le complexe est très stable.</p>
    </div>

    <h3>3. Diagramme de prédominance en fonction de pL</h3>
    <p>Par analogie complète avec le couple acide-base (le ligand L jouant le rôle du proton), on définit $\\\\text{p}L = -\\\\log[L]$. Pour un couple accepteur/donneur $\\\\text{M}/\\\\text{ML}_n$ de constante $\\\\beta_n$, la frontière de prédominance est en $\\\\text{p}L = \\\\log\\\\beta_n / n$ (par un raisonnement analogue à celui du pKa) :</p>
    <div class="formula-box">
      $\\\\text{p}L$ faible (excès de ligand, [L] élevé) : le complexe $\\\\text{ML}_n$ <strong>prédomine</strong><br>
      $\\\\text{p}L$ élevé ([L] faible) : la forme libre $\\\\text{M}$ <strong>prédomine</strong>
    </div>
    <p>Un diagramme symétrique existe en fonction de $\\\\text{p}M=-\\\\log[\\\\text{M}]$, utile quand on raisonne du point de vue de l'ion central plutôt que du ligand.</p>

    <h3>4. Composition d'une solution — formation d'un seul complexe</h3>
    <p>Si $\\\\beta_n$ est très grande, la réaction de formation peut être traitée comme quasi totale : on calcule d'abord l'état après réaction totale (avec le réactif limitant), puis on réintroduit l'équilibre résiduel comme une petite perturbation — exactement la même démarche que pour une réaction acido-basique de constante élevée.</p>

    <h3>5. Formations successives et simultanées de plusieurs complexes</h3>
    <p>Quand plusieurs complexes $\\\\text{ML}, \\\\text{ML}_2, ..., \\\\text{ML}_n$ peuvent coexister (formation <strong>successive</strong>, ligand ajouté progressivement), on utilise les diagrammes de prédominance en pL pour identifier, à une concentration de ligand donnée, quel complexe domine. Si deux ligands différents peuvent se fixer sur le même ion central (formation <strong>simultanée</strong>, deux complexes en compétition), c'est la stabilité relative (comparaison des $\\\\beta_n$) qui détermine quel complexe se forme préférentiellement.</p>

    <h3>6. Stabilité et compétitions</h3>
    <table class="mini-table">
      <tr><th>Type de compétition</th><th>Espèce favorisée</th></tr>
      <tr><td>Deux ligands pour un même cation central</td><td>celui donnant le complexe de $\\\\beta_n$ la plus grande</td></tr>
      <tr><td>Deux cations métalliques pour un même ligand</td><td>celui formant le complexe le plus stable</td></tr>
      <tr><td>Ion métallique vs ion hydronium pour un ligand (ligand basique, ex. CN⁻)</td><td>dépend du pH : à pH faible, H₃O⁺ protone le ligand et concurrence sa complexation</td></tr>
    </table>
    <p>C'est le principe même de l'analyse qualitative en chimie des solutions, illustré au tube à essai : ajouter un oxalate à un complexe thiocyanatofer(III) rouge-sang fait apparaître le complexe oxalatofer(III), plus stable, décolorant la solution.</p>

    <h3>7. Titrages complexométriques</h3>
    <p>Un titrage complexométrique exploite une réaction de complexation quasi totale (le plus souvent avec l'EDTA, Y⁴⁻, très stable et hexadentate) pour doser un cation métallique (Ca²⁺, Mg²⁺, dureté de l'eau...). L'équivalence, comme pour un titrage acido-basique, correspond aux proportions stœchiométriques ; elle peut être repérée par un indicateur coloré métallochromique (qui change de couleur selon qu'il est libre ou complexé) ou par suivi potentiométrique de $\\\\text{p}M$.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Complexe = ion central (lacune électronique) + ligands (doublet libre) ; coordinence = nombre de liaisons formées</li>
        <li>$\\\\beta_n = [\\\\text{ML}_n]/([\\\\text{M}][\\\\text{L}]^n)$ : plus $\\\\beta_n$ est grande, plus le complexe est stable</li>
        <li>Analogie totale avec l'acide-base : L joue le rôle de H⁺, pL = -log[L] joue le rôle du pH</li>
        <li>La stabilité relative de deux complexes en compétition se compare directement via leurs $\\\\beta_n$</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier la puissance $n$ sur $[\\\\text{L}]$ dans l'expression de $\\\\beta_n$</li>
        <li>Confondre $\\\\beta_n$ (constante globale) et $K_{fi}$ (constante d'une seule étape successive)</li>
        <li>Négliger l'effet du pH sur la disponibilité d'un ligand basique (ex. CN⁻, protoné en HCN à pH faible)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour le complexe $[\\\\text{Ag}(\\\\text{NH}_3)_2]^+$, formé selon $\\\\text{Ag}^+ + 2\\\\text{NH}_3 \\\\rightleftharpoons [\\\\text{Ag}(\\\\text{NH}_3)_2]^+$, quelle est l'expression correcte de $\\\\beta_2$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs5e1" value="right"> $\\\\beta_2=\\\\dfrac{[[\\\\text{Ag}(\\\\text{NH}_3)_2]^+]}{[\\\\text{Ag}^+][\\\\text{NH}_3]^2}$</label>
          <label class="option"><input type="radio" name="cs5e1" value="wrong"> $\\\\beta_2=\\\\dfrac{[\\\\text{Ag}^+][\\\\text{NH}_3]^2}{[[\\\\text{Ag}(\\\\text{NH}_3)_2]^+]}$</label>
          <label class="option"><input type="radio" name="cs5e1" value="wrong"> $\\\\beta_2=[\\\\text{Ag}^+][\\\\text{NH}_3]$</label>
          <label class="option"><input type="radio" name="cs5e1" value="wrong"> $\\\\beta_2=\\\\dfrac{[[\\\\text{Ag}(\\\\text{NH}_3)_2]^+]}{[\\\\text{Ag}^+][\\\\text{NH}_3]}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs5e1','cs5fb1','Correct — beta2 est le quotient du complexe formé sur le produit des activités de M et de L, ce dernier élevé à la puissance 2 (2 ligands fixés).','La constante beta_n a le complexe au numérateur, et [M][L]^n au dénominateur, avec n le nombre de ligands fixés.')">Vérifier</button>
        <div class="feedback" id="cs5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un ligand L₁ forme avec M un complexe de logβ = 8 ; un ligand L₂ forme avec M un complexe de logβ = 15. En présence des deux ligands en quantité comparable, quel complexe prédomine ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs5e2" value="wrong"> Le complexe avec L₁ (β la plus faible)</label>
          <label class="option"><input type="radio" name="cs5e2" value="right"> Le complexe avec L₂ (β la plus grande)</label>
          <label class="option"><input type="radio" name="cs5e2" value="wrong"> Les deux complexes en proportions égales</label>
          <label class="option"><input type="radio" name="cs5e2" value="wrong"> Aucun complexe ne se forme</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs5e2','cs5fb2','Correct — le complexe le plus stable (beta la plus grande) l\\'emporte largement dans la compétition pour le cation central.','Le complexe favorisé dans une compétition de ligands est toujours celui de plus grande constante de stabilité.')">Vérifier</button>
        <div class="feedback" id="cs5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Sur un diagramme de prédominance en pL, que se passe-t-il quand pL augmente fortement (ligand très dilué) ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs5e3" value="wrong"> Le complexe MLn devient plus stable</label>
          <label class="option"><input type="radio" name="cs5e3" value="right"> La forme libre M finit par prédominer</label>
          <label class="option"><input type="radio" name="cs5e3" value="wrong"> Rien ne change, pL n'a pas d'effet</label>
          <label class="option"><input type="radio" name="cs5e3" value="wrong"> Le ligand précipite</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs5e3','cs5fb3','Correct — pL grand signifie [L] très faible : il n\\'y a plus assez de ligand pour maintenir le complexe, qui se dissocie, et M libre prédomine.','pL = -log[L] : un pL élevé correspond à une concentration en ligand très faible.')">Vérifier</button>
        <div class="feedback" id="cs5fb3"></div>
      </div>
    </div>
  `
};

CHIMSOL_NOVA_KB[csKey('Réactions de complexation')] = {
  intro: "Salut, c'est Nova ! On est sur « Réactions de complexation ». Demande-moi ce qu'est un ligand, comment écrire beta_n, ou un indice sur un exercice.",
  rules: [
    { test:/ligand/i, replies:["Un ligand est une molécule ou un ion possédant au moins un doublet libre, capable de se lier à l'ion central. Monodentate = 1 liaison (H2O, NH3) ; polydentate = plusieurs liaisons (EDTA = hexadentate)."] },
    { test:/coordinence/i, replies:["La coordinence est le nombre de liaisons formées par l'ion central avec les ligands — égale au nombre de ligands fixés s'ils sont tous monodentates."] },
    { test:/b[eê]ta|constante de stabilit[ée]|constante de formation/i, replies:["βn = [MLn]/([M][L]^n) est la constante globale de formation (ou de stabilité). Plus elle est grande, plus le complexe est stable et difficile à dissocier."] },
    { test:/\bpl\b|diagramme de pr[ée]dominance/i, replies:["pL = -log[L] joue exactement le rôle du pH pour les complexes : à pL faible (beaucoup de ligand), le complexe MLn prédomine ; à pL élevé (peu de ligand), la forme libre M prédomine."] },
    { test:/comp[ée]tition|stabilit[ée]/i, replies:["Dans une compétition entre ligands pour un même cation, ou entre cations pour un même ligand, c'est toujours le complexe de plus grande βn qui l'emporte."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : βn a le complexe au numérateur.","Indice niveau 2 : au dénominateur, [M] fois [L] à la puissance du nombre de ligands.","Indice niveau 3 : ici n=2, donc β2 = [complexe]/([Ag+][NH3]²)."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare les deux valeurs de logβ.","Indice niveau 2 : 15 > 8.","Indice niveau 3 : le complexe le plus stable (β le plus grand) prédomine, donc celui avec L2."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : que signifie un pL élevé pour [L] ?","Indice niveau 2 : [L] est alors très faible.","Indice niveau 3 : sans assez de ligand, le complexe se dissocie et M libre prédomine."] }
  ]
};

/* =========================== CHAPITRE 6 =========================== */
CHIMSOL_CHAPTERS[csKey('Réactions de précipitation')] = {
  objectives: [
    "Définir la solubilité s et le produit de solubilité Ks d'un composé ionique peu soluble",
    "Établir la condition de précipitation et l'effet d'ion commun",
    "Analyser une précipitation compétitive et le domaine d'existence d'un précipité",
    "Décrire l'influence du pH et de la complexation sur la solubilité d'un précipité"
  ],
  prereqs: ["Réactions de complexation"],
  bodyHtml: `
    <p>Entartrage des canalisations, précipitation sélective d'un minerai, titrage des chlorures : ce chapitre étudie les conditions de formation et de dissolution des précipités ioniques.</p>

    <h3>1. Solubilité</h3>
    <p>La <strong>solubilité</strong> $s$ d'un composé A, à une température donnée, est la quantité de matière de A qu'il faut dissoudre pour obtenir une solution saturée, rapportée au volume de solution : $s = n(\\\\text{A})/V$, exprimée en mol/L (on note parfois $t=s\\\\cdot M(\\\\text{A})$ la solubilité massique, en g/L).</p>

    <h3>2. Produit de solubilité Ks</h3>
    <p>Pour un composé ionique peu soluble $\\\\text{C}_x\\\\text{A}_y$, en équilibre avec ses ions selon $\\\\text{C}_x\\\\text{A}_y(s) \\\\rightleftharpoons x\\\\text{C}^{p+}(aq) + y\\\\text{A}^{q-}(aq)$, la constante d'équilibre — le solide pur ayant une activité égale à 1 — est le <strong>produit de solubilité</strong> :</p>
    <div class="formula-box">$$K_s = [\\\\text{C}^{p+}]^x [\\\\text{A}^{q-}]^y \\\\qquad \\\\text{p}K_s = -\\\\log K_s$$</div>
    <p>$K_s$ ne dépend que de la température. Exemple : $\\\\text{Ag}_3\\\\text{PO}_4(s) \\\\rightleftharpoons 3\\\\text{Ag}^+ + \\\\text{PO}_4^{3-}$, $K_s=[\\\\text{Ag}^+]^3[\\\\text{PO}_4^{3-}]=1{,}3\\\\times 10^{-20}$ ($\\\\text{p}K_s=19{,}9$).</p>

    <h3>3. Solubilité dans l'eau pure</h3>
    <p>Pour un précipité $\\\\text{C}_x\\\\text{A}_y$ dissous dans l'eau pure (aucun ion commun présent au départ), la stœchiométrie de dissolution impose $[\\\\text{C}^{p+}]=xs$ et $[\\\\text{A}^{q-}]=ys$, d'où :</p>
    <div class="formula-box">$$K_s = (xs)^x(ys)^y = x^x y^y s^{x+y} \\\\qquad\\\\Rightarrow\\\\qquad s = \\\\left(\\\\dfrac{K_s}{x^x y^y}\\\\right)^{1/(x+y)}$$</div>
    <p>Pour un sel 1:1 (ex. AgCl) : $s=\\\\sqrt{K_s}$. Pour un sel 1:2 ou 2:1 (ex. Ag₂CrO₄) : $s=(K_s/4)^{1/3}$.</p>

    <h3>4. Condition de précipitation</h3>
    <p>Un précipité se forme si, et seulement si, le <strong>quotient de réaction ionique</strong> $Q=[\\\\text{C}^{p+}]^x[\\\\text{A}^{q-}]^y$ dépasse $K_s$ :</p>
    <div class="formula-box">$$Q > K_s \\\\ \\\\Rightarrow \\\\ \\\\text{précipitation} \\\\qquad\\\\qquad Q < K_s \\\\ \\\\Rightarrow \\\\ \\\\text{pas de précipité (ou dissolution s'il existait)}$$</div>
    <p>Cette condition permet, par exemple, de savoir si le mélange de deux solutions va provoquer l'apparition d'un trouble.</p>

    <h3>5. Effet d'ion commun</h3>
    <p>Si l'un des ions constitutifs du précipité est déjà présent en solution (apporté par un autre sel), l'équilibre de dissolution est déplacé dans le sens de la précipitation (loi de Le Chatelier) : la solubilité du précipité <strong>diminue</strong> en présence d'ion commun.</p>
    <div class="example-box">
      <p><strong>Exemple.</strong> La solubilité de AgCl dans l'eau pure vaut $\\\\sqrt{K_s}\\\\approx 1{,}3\\\\times10^{-5}\\\\ \\\\text{mol/L}$. Dans une solution contenant déjà $[\\\\text{Cl}^-]=0{,}1\\\\ \\\\text{mol/L}$ (ex. NaCl), la solubilité de AgCl chute à $s=K_s/[\\\\text{Cl}^-]\\\\approx 2\\\\times10^{-9}\\\\ \\\\text{mol/L}$, très inférieure à celle dans l'eau pure.</p>
    </div>

    <h3>6. Domaine d'existence d'un précipité et précipitations compétitives</h3>
    <p>Le <strong>domaine d'existence</strong> d'un précipité est l'ensemble des concentrations en ion commun pour lesquelles $Q\\\\geq K_s$, c'est-à-dire pour lesquelles le solide peut effectivement exister en équilibre avec ses ions. Lorsque deux anions (ou deux cations) sont susceptibles de précipiter avec un même ion, on parle de <strong>précipitation compétitive</strong> ou <strong>sélective</strong> : en ajoutant progressivement le réactif commun, c'est le précipité de <strong>plus petit Ks</strong> qui apparaît en premier (le moins soluble), le second n'apparaissant que lorsque la concentration de l'ion commun a suffisamment augmenté.</p>
    <div class="key-point">
      <span class="eyebrow">Point clé — séparation sélective</span>
      La précipitation compétitive permet de séparer deux ions présents dans un même mélange (ex. Cl⁻ et I⁻ par ajout progressif d'Ag⁺) : l'iodure d'argent (Ks plus petit) précipite avant le chlorure d'argent, ce qui permet un dosage successif.
    </div>

    <h3>7. Solubilité et complexation</h3>
    <p>Un précipité peut être dissous par formation d'un complexe soluble avec l'un de ses ions constitutifs (ex. AgCl(s) dissous par ajout d'ammoniac, formant $[\\\\text{Ag}(\\\\text{NH}_3)_2]^+$ très stable) : en consommant l'ion libre, la réaction de complexation déplace l'équilibre de dissolution dans le sens de la dissolution supplémentaire (loi de Le Chatelier de nouveau). Plus la constante $\\\\beta_n$ du complexe est grande devant $K_s$, plus l'effet est marqué et plus la solubilité apparente du précipité augmente.</p>

    <h3>8. pH et précipitation</h3>
    <p>De nombreux précipités sont dissous par action d'un acide, en particulier ceux dont l'anion est une base (carbonates, sulfures, hydroxydes) : l'acide consomme l'anion basique par réaction acido-basique, ce qui déplace l'équilibre de dissolution. La <strong>précipitation des hydroxydes métalliques</strong> $\\\\text{M}(\\\\text{OH})_n$ dépend directement du pH via $[\\\\text{OH}^-]$ :</p>
    <div class="formula-box">$$K_s = [\\\\text{M}^{n+}][\\\\text{OH}^-]^n \\\\quad\\\\Rightarrow\\\\quad \\\\text{pH}_{\\\\text{précipitation}} = 14 + \\\\dfrac{1}{n}\\\\log\\\\dfrac{K_s}{[\\\\text{M}^{n+}]}$$</div>
    <p>Certains hydroxydes sont <strong>amphotères</strong> (ex. Al(OH)₃, Zn(OH)₂) : ils précipitent dans un domaine de pH intermédiaire, mais se redissolvent à la fois en milieu très acide (formation du cation métallique) et en milieu très basique (formation d'un hydroxo-complexe soluble, ex. $[\\\\text{Al}(\\\\text{OH})_4]^-$).</p>

    <h3>9. Titrage par précipitation</h3>
    <p>Un titrage par précipitation (ex. titrage des chlorures par Ag⁺, méthode de Mohr ou de Charpentier-Volhard) exploite une réaction de précipitation quantitative. L'équivalence peut être suivie par <strong>potentiométrie</strong> (électrode sensible à l'ion titré ou titrant), par <strong>conductimétrie</strong> (rupture de pente, comme pour un titrage acido-basique) ou à l'aide d'un <strong>indicateur coloré</strong> spécifique (ex. chromate de potassium pour la méthode de Mohr, qui précipite en rouge-brique une fois tout le chlorure consommé).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>$K_s=[\\\\text{C}^{p+}]^x[\\\\text{A}^{q-}]^y$ ; dans l'eau pure, $s=(K_s/(x^xy^y))^{1/(x+y)}$</li>
        <li>Précipitation si $Q>K_s$ ; dissolution ou absence de précipité si $Q<K_s$</li>
        <li>Effet d'ion commun : diminue la solubilité ; précipitation compétitive : le plus petit Ks précipite en premier</li>
        <li>La complexation ou l'ajout d'acide (pour un anion basique) déplacent l'équilibre vers la dissolution</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Utiliser $s=\\\\sqrt{K_s}$ pour un sel qui n'est pas de stœchiométrie 1:1</li>
        <li>Oublier l'effet d'ion commun quand le précipité est dissous dans une solution contenant déjà l'un de ses ions</li>
        <li>Confondre Ks (constante fixe) et le produit ionique Q (varie selon les concentrations réelles du moment)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">$K_s(\\\\text{AgCl}) = 1{,}8\\\\times 10^{-10}$. Quelle est la solubilité de AgCl dans l'eau pure ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs6e1" value="wrong"> $1{,}8\\\\times10^{-10}\\\\ \\\\text{mol/L}$</label>
          <label class="option"><input type="radio" name="cs6e1" value="right"> $\\\\approx 1{,}3\\\\times10^{-5}\\\\ \\\\text{mol/L}$</label>
          <label class="option"><input type="radio" name="cs6e1" value="wrong"> $9\\\\times10^{-11}\\\\ \\\\text{mol/L}$</label>
          <label class="option"><input type="radio" name="cs6e1" value="wrong"> $1{,}8\\\\ \\\\text{mol/L}$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs6e1','cs6fb1','Correct — AgCl est un sel 1:1, donc s = racine(Ks) = racine(1,8e-10) ≈ 1,3e-5 mol/L.','AgCl est un sel de stœchiométrie 1:1 : sa solubilité est simplement la racine carrée de Ks.')">Vérifier</button>
        <div class="feedback" id="cs6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">On ajoute du NaCl à une solution saturée de AgCl. Que devient la solubilité de AgCl ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs6e2" value="wrong"> Elle augmente</label>
          <label class="option"><input type="radio" name="cs6e2" value="right"> Elle diminue (effet d'ion commun)</label>
          <label class="option"><input type="radio" name="cs6e2" value="wrong"> Elle reste inchangée</label>
          <label class="option"><input type="radio" name="cs6e2" value="wrong"> AgCl se dissout entièrement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs6e2','cs6fb2','Correct — Cl- est un ion commun au précipité : son ajout déplace l\\'équilibre de dissolution vers la précipitation, diminuant la solubilité de AgCl.','Le NaCl apporte des ions Cl-, déjà présents dans l\\'équilibre de dissolution de AgCl : c\\'est l\\'effet d\\'ion commun.')">Vérifier</button>
        <div class="feedback" id="cs6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">On ajoute progressivement Ag⁺ à un mélange de Cl⁻ et I⁻. Sachant que Ks(AgI) ≪ Ks(AgCl), quel précipité apparaît en premier ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs6e3" value="wrong"> AgCl</label>
          <label class="option"><input type="radio" name="cs6e3" value="right"> AgI</label>
          <label class="option"><input type="radio" name="cs6e3" value="wrong"> Les deux simultanément</label>
          <label class="option"><input type="radio" name="cs6e3" value="wrong"> Aucun des deux ne précipite</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs6e3','cs6fb3','Correct — dans une précipitation compétitive, le précipité de plus petit Ks (ici AgI) atteint Q=Ks en premier et précipite avant l\\'autre.','Le composé le moins soluble (Ks le plus petit) précipite toujours en premier lors d\\'un ajout progressif du réactif commun.')">Vérifier</button>
        <div class="feedback" id="cs6fb3"></div>
      </div>
    </div>
  `
};

CHIMSOL_NOVA_KB[csKey('Réactions de précipitation')] = {
  intro: "Salut, c'est Nova ! On est sur « Réactions de précipitation ». Demande-moi comment calculer une solubilité, ce qu'est l'effet d'ion commun, ou un indice sur un exercice.",
  rules: [
    { test:/produit de solubilit[ée]|\bks\b/i, replies:["Ks = [Cp+]^x [Aq-]^y est le produit de solubilité d'un composé ionique peu soluble CxAy. Il ne dépend que de la température."] },
    { test:/solubilit[ée]/i, replies:["Dans l'eau pure, la solubilité s se déduit de Ks par la stœchiométrie de dissolution : pour un sel 1:1, s = √Ks ; pour un sel 1:2 ou 2:1, s = (Ks/4)^(1/3)."] },
    { test:/condition de pr[ée]cipitation|Q\s*>\s*Ks|quotient/i, replies:["Un précipité se forme si le quotient ionique Q dépasse Ks. Si Q < Ks, il n'y a pas de précipité (ou un précipité existant se dissout)."] },
    { test:/ion commun/i, replies:["L'effet d'ion commun : si un ion du précipité est déjà présent en solution, l'équilibre de dissolution est repoussé vers la précipitation, ce qui diminue la solubilité du composé."] },
    { test:/comp[ée]titive|s[ée]lective/i, replies:["Dans une précipitation compétitive, le précipité de plus petit Ks (le moins soluble) apparaît toujours en premier lors de l'ajout progressif du réactif commun."] },
    { test:/hydroxyde|amphot[eè]re/i, replies:["La précipitation d'un hydroxyde métallique dépend du pH via [OH-]. Certains hydroxydes sont amphotères (Al(OH)3, Zn(OH)2) : ils se redissolvent en milieu très acide ET en milieu très basique."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quelle est la stœchiométrie de AgCl ?","Indice niveau 2 : c'est un sel 1:1.","Indice niveau 3 : s = √Ks = √(1,8×10⁻¹⁰) ≈ 1,3×10⁻⁵ mol/L."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : Cl- est-il déjà présent dans l'équilibre de AgCl ?","Indice niveau 2 : oui, c'est un ion commun.","Indice niveau 3 : l'équilibre est repoussé vers la précipitation, donc la solubilité diminue."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare les deux valeurs de Ks.","Indice niveau 2 : le plus petit Ks correspond au composé le moins soluble.","Indice niveau 3 : AgI (Ks très petit) précipite donc en premier."] }
  ]
};

/* =========================== CHAPITRE 7 =========================== */
CHIMSOL_CHAPTERS[csKey('Réactions d\'oxydoréduction en solution')] = {
  objectives: [
    "Identifier un couple oxydant-réducteur, écrire une demi-équation électronique et équilibrer une réaction redox",
    "Calculer le potentiel d'une électrode par la relation de Nernst et le comparer à l'ESH",
    "Prévoir le sens d'évolution d'une réaction redox et construire un diagramme de prédominance en E",
    "Analyser l'influence du pH, de la précipitation et de la complexation sur un potentiel redox"
  ],
  prereqs: ["Réactions de précipitation"],
  bodyHtml: `
    <p>Piles électrochimiques, corrosion, dosage de la vitamine C par iodométrie : ce dernier chapitre étend au transfert d'électrons la démarche déjà appliquée aux protons, aux ligands et aux ions constitutifs d'un précipité.</p>

    <h3>1. Couple oxydant-réducteur</h3>
    <p>Un <strong>réducteur</strong> est une espèce susceptible de céder un ou plusieurs électrons ; un <strong>oxydant</strong> est une espèce susceptible d'en capter. À tout oxydant Ox correspond un réducteur conjugué Red, reliés par la <strong>demi-équation électronique</strong> (formelle, car l'électron n'existe pas à l'état libre en solution) :</p>
    <div class="formula-box">$$\\\\text{Ox} + n\\\\text{e}^- \\\\rightleftharpoons \\\\text{Red} \\\\qquad (\\\\text{couple Ox/Red})$$</div>
    <p>Une <strong>réduction</strong> est un gain d'électrons ; une <strong>oxydation</strong> est une perte d'électrons. Le <strong>nombre d'oxydation</strong> (n.o.) d'un élément permet de repérer si une espèce a été oxydée (n.o. augmente) ou réduite (n.o. diminue) au cours d'une réaction, sans avoir à identifier directement les électrons échangés.</p>

    <h3>2. Établir une demi-équation et équilibrer une réaction redox</h3>
    <p>Méthode systématique pour équilibrer une demi-équation en milieu aqueux : équilibrer d'abord l'élément qui change de degré d'oxydation, puis l'oxygène (avec H₂O), puis l'hydrogène (avec H⁺), et enfin la charge (avec des électrons). L'équation globale s'obtient en combinant les deux demi-équations de façon à ce que le nombre d'électrons échangés soit identique de part et d'autre.</p>
    <div class="example-box">
      <p><strong>Exemple.</strong> Oxydation du zinc par les ions cuivre(II) : $\\\\text{Cu}^{2+} + 2\\\\text{e}^- \\\\rightleftharpoons \\\\text{Cu}$ et $\\\\text{Zn}^{2+}+2\\\\text{e}^-\\\\rightleftharpoons \\\\text{Zn}$, donnant globalement $\\\\text{Zn}(s) + \\\\text{Cu}^{2+}(aq) \\\\rightarrow \\\\text{Zn}^{2+}(aq) + \\\\text{Cu}(s)$.</p>
    </div>

    <h3>3. Piles électrochimiques et potentiel d'électrode</h3>
    <p>Une pile (ex. pile Daniell : $\\\\text{Zn}|\\\\text{Zn}^{2+}\\\\ ||\\\\ \\\\text{Cu}^{2+}|\\\\text{Cu}$) sépare physiquement les deux demi-réactions dans deux <strong>demi-piles</strong>, reliées par un pont salin et un circuit électrique. La <strong>force électromotrice</strong> de la pile est la différence des <strong>potentiels d'électrode</strong> $E$ des deux demi-piles. Chaque potentiel est mesuré par rapport à l'<strong>électrode standard à hydrogène</strong> (E.S.H.), de potentiel conventionnellement fixé à $E^0(\\\\text{H}^+/\\\\text{H}_2) = 0{,}00\\\\ \\\\text{V}$.</p>

    <h3>4. Relation de Nernst</h3>
    <p>Pour un couple $\\\\text{Ox} + n\\\\text{e}^- \\\\rightleftharpoons \\\\text{Red}$, le potentiel d'électrode s'exprime par la <strong>relation de Nernst</strong> :</p>
    <div class="formula-box">$$E = E^0(\\\\text{Ox}/\\\\text{Red}) + \\\\dfrac{RT}{nF}\\\\ln\\\\dfrac{a(\\\\text{Ox})}{a(\\\\text{Red})} \\\\ \\\\xrightarrow[298\\\\ \\\\text{K}]{\\\\ln\\\\to\\\\log_{10}} \\\\ E = E^0 + \\\\dfrac{0{,}06}{n}\\\\log\\\\dfrac{[\\\\text{Ox}]}{[\\\\text{Red}]}$$</div>
    <p>où $E^0$ est le <strong>potentiel standard</strong> du couple (activités unitaires), $R$ la constante des gaz parfaits, $F$ la constante de Faraday, et $\\\\tfrac{RT}{F}\\\\ln(10)\\\\approx 0{,}06\\\\ \\\\text{V}$ à 298 K. Comme pour le quotient de réaction, les espèces solides ou liquides pures n'apparaissent pas dans le rapport (activité = 1), et un gaz intervient par sa pression partielle relative.</p>
    <table class="mini-table">
      <tr><th>Type d'électrode</th><th>Exemple</th><th>Nernst</th></tr>
      <tr><td>1ère espèce (métal / cation)</td><td>$\\\\text{Cu}^{2+}/\\\\text{Cu}$</td><td>$E=E^0+\\\\tfrac{0{,}06}{2}\\\\log[\\\\text{Cu}^{2+}]$</td></tr>
      <tr><td>2ème espèce (métal / sel peu soluble)</td><td>$\\\\text{AgCl}/\\\\text{Ag}$</td><td>$E=E^0-0{,}06\\\\log[\\\\text{Cl}^-]$ (via Ks)</td></tr>
      <tr><td>3ème espèce (deux couples liés par précipitation/complexation)</td><td>—</td><td>combine deux relations de Nernst</td></tr>
    </table>

    <h3>5. Prévision du sens d'évolution et constante d'équilibre</h3>
    <p>Pour la réaction entre deux couples $\\\\text{Ox}_1/\\\\text{Red}_1$ ($n_1$ électrons) et $\\\\text{Ox}_2/\\\\text{Red}_2$ ($n_2$ électrons), combinée pour échanger $n=n_1 n_2$ électrons (ppcm), la constante d'équilibre se déduit des deux potentiels standards :</p>
    <div class="formula-box">$$\\\\log K^0 = \\\\dfrac{n\\\\,(E_1^0 - E_2^0)}{0{,}06}$$</div>
    <p>La réaction évolue spontanément dans le sens où l'oxydant du couple de <strong>potentiel standard le plus élevé</strong> réagit avec le réducteur du couple de potentiel standard le plus faible ($E_1^0 > E_2^0$ favorise $\\\\text{Ox}_1 + \\\\text{Red}_2 \\\\rightarrow \\\\text{Red}_1 + \\\\text{Ox}_2$). Plus l'écart $\\\\Delta E^0$ est grand, plus $K^0$ est grande et plus la réaction est totale.</p>

    <h3>6. Domaines de prédominance en E</h3>
    <p>Par analogie avec le pH et le pL, on construit un <strong>diagramme de prédominance en E</strong> : au potentiel $E=E^0(\\\\text{Ox}/\\\\text{Red})$, $[\\\\text{Ox}]=[\\\\text{Red}]$ ; pour $E>E^0$, l'oxydant prédomine (milieu plus oxydant) ; pour $E<E^0$, le réducteur prédomine (milieu plus réducteur). Ce diagramme permet de prévoir, sans calcul détaillé, si un mélange de couples va réagir : le couple de $E^0$ le plus grand impose son oxydant à l'autre couple.</p>

    <h3>7. Influence du pH sur un potentiel redox</h3>
    <p>De nombreux couples redox font intervenir H⁺ dans leur demi-équation (ex. $\\\\text{MnO}_4^-+8\\\\text{H}^++5\\\\text{e}^-\\\\rightleftharpoons \\\\text{Mn}^{2+}+4\\\\text{H}_2\\\\text{O}$) : leur potentiel de Nernst dépend alors explicitement du pH via le terme en $[\\\\text{H}^+]$ élevé à la puissance du nombre de protons échangés. En abaissant le pH, on augmente en général le pouvoir oxydant de tels couples (ex. $\\\\text{MnO}_4^-$ oxydant plus fort en milieu acide qu'en milieu neutre).</p>

    <h3>8. Influence de la complexation et de la précipitation</h3>
    <p>Complexer ou précipiter l'une des espèces d'un couple redox modifie fortement son potentiel standard apparent : en stabilisant fortement la forme oxydée (ou réduite) par un ligand ou par précipitation, on déplace l'équilibre redox — c'est exactement le même principe que le déplacement d'un équilibre acido-basique par consommation de l'une des espèces du couple.</p>

    <h3>9. Titrage d'oxydoréduction</h3>
    <p>Un titrage redox exploite une réaction quasi totale entre deux couples de potentiels standards suffisamment éloignés. Le suivi <strong>potentiométrique</strong> (électrode de platine, inerte) donne une courbe $E=f(V)$ présentant un saut de potentiel net à l'équivalence, analogue au saut de pH d'un titrage acido-basique ; on peut aussi utiliser un <strong>indicateur coloré rédox</strong>, changeant de couleur pour un potentiel voisin de celui de l'équivalence.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Couple Ox/Red : $\\\\text{Ox}+n\\\\text{e}^-\\\\rightleftharpoons\\\\text{Red}$ ; oxydation = perte d'électrons, réduction = gain d'électrons</li>
        <li>Nernst : $E=E^0+\\\\tfrac{0{,}06}{n}\\\\log([\\\\text{Ox}]/[\\\\text{Red}])$ à 298 K</li>
        <li>Le couple de $E^0$ le plus élevé impose son oxydant : réaction spontanée $\\\\text{Ox}_1+\\\\text{Red}_2\\\\to$ si $E_1^0>E_2^0$</li>
        <li>$\\\\log K^0 = n(E_1^0-E_2^0)/0{,}06$ : plus l'écart des $E^0$ est grand, plus la réaction est totale</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Inverser le sens de prévision : c'est l'oxydant du couple de $E^0$ le plus grand qui réagit, pas le réducteur</li>
        <li>Oublier de multiplier par $n$ (nombre d'électrons échangés) dans le calcul de $\\\\log K^0$</li>
        <li>Confondre potentiel standard $E^0$ (activités unitaires) et potentiel réel $E$ (dépend des concentrations via Nernst)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour le couple $\\\\text{Fe}^{3+}/\\\\text{Fe}^{2+}$ ($E^0=0{,}77\\\\ \\\\text{V}$, n=1), quel est E si $[\\\\text{Fe}^{3+}]=[\\\\text{Fe}^{2+}]$ ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs7e1" value="right"> E = 0,77 V</label>
          <label class="option"><input type="radio" name="cs7e1" value="wrong"> E = 0 V</label>
          <label class="option"><input type="radio" name="cs7e1" value="wrong"> E = 0,06 V</label>
          <label class="option"><input type="radio" name="cs7e1" value="wrong"> On ne peut pas savoir</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs7e1','cs7fb1','Correct — si [Ox]=[Red], log(1)=0, donc E=E0 exactement : c\\'est la définition même du potentiel standard.','Quand [Ox]=[Red], le terme logarithmique de Nernst s\\'annule.')">Vérifier</button>
        <div class="feedback" id="cs7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le couple A a $E^0_1=1{,}5\\\\ \\\\text{V}$, le couple B a $E^0_2=0{,}3\\\\ \\\\text{V}$. Quelle réaction spontanée peut-on prévoir ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs7e2" value="right"> L'oxydant de A réagit avec le réducteur de B</label>
          <label class="option"><input type="radio" name="cs7e2" value="wrong"> Le réducteur de A réagit avec l'oxydant de B</label>
          <label class="option"><input type="radio" name="cs7e2" value="wrong"> Aucune réaction n'est possible</label>
          <label class="option"><input type="radio" name="cs7e2" value="wrong"> Les deux couples réagissent avec l'eau uniquement</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs7e2','cs7fb2','Correct — le couple de E0 le plus élevé (A) impose son oxydant, qui réagit avec le réducteur de l\\'autre couple (B).','Le couple de plus haut E0 impose toujours son oxydant à l\\'autre couple.')">Vérifier</button>
        <div class="feedback" id="cs7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour le couple $\\\\text{MnO}_4^-/\\\\text{Mn}^{2+}$, que se passe-t-il pour le pouvoir oxydant si le pH diminue ?</p>
        <div class="options">
          <label class="option"><input type="radio" name="cs7e3" value="right"> Il augmente (H⁺ intervient dans la demi-équation)</label>
          <label class="option"><input type="radio" name="cs7e3" value="wrong"> Il diminue</label>
          <label class="option"><input type="radio" name="cs7e3" value="wrong"> Il reste rigoureusement constant</label>
          <label class="option"><input type="radio" name="cs7e3" value="wrong"> Le couple n'existe qu'en milieu neutre</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('cs7e3','cs7fb3','Correct — MnO4-/Mn2+ échange 8 H+ dans sa demi-équation : une baisse de pH (donc [H+] plus grand) augmente E via Nernst, renforçant le pouvoir oxydant.','La demi-équation de MnO4-/Mn2+ contient H+ : son potentiel de Nernst dépend donc directement du pH.')">Vérifier</button>
        <div class="feedback" id="cs7fb3"></div>
      </div>
    </div>
  `
};

CHIMSOL_NOVA_KB[csKey('Réactions d\'oxydoréduction en solution')] = {
  intro: "Salut, c'est Nova ! On est sur « Réactions d'oxydoréduction en solution ». Demande-moi la relation de Nernst, comment prévoir le sens d'une réaction redox, ou un indice sur un exercice.",
  rules: [
    { test:/nernst/i, replies:["La relation de Nernst : E = E0 + (0,06/n)×log([Ox]/[Red]) à 298 K. Elle relie le potentiel réel d'une électrode à son potentiel standard et aux concentrations des deux formes du couple."] },
    { test:/couple.*redox|oxydant.*r[ée]ducteur/i, replies:["Un couple Ox/Red est relié par Ox + n e- ⇌ Red. L'oxydant capte des électrons (il est réduit), le réducteur en cède (il est oxydé)."] },
    { test:/sens.*[ée]volution|pr[ée]voir|spontan[ée]/i, replies:["Le couple de potentiel standard E0 le plus élevé impose son oxydant : la réaction spontanée est Ox(E0 grand) + Red(E0 petit) → Red(E0 grand) + Ox(E0 petit)."] },
    { test:/constante d.[ée]quilibre|log\s*k/i, replies:["logK0 = n(E1°-E2°)/0,06, où n est le nombre d'électrons échangés dans la réaction globale équilibrée. Plus l'écart des E0 est grand, plus K0 est grande."] },
    { test:/pH.*redox|influence du pH/i, replies:["Quand H+ intervient dans une demi-équation (ex. MnO4-/Mn2+), le potentiel de Nernst dépend du pH : baisser le pH augmente en général le pouvoir oxydant de ces couples."] },
    { test:/esh|[ée]lectrode standard/i, replies:["L'électrode standard à hydrogène (ESH) sert de référence : son potentiel est fixé conventionnellement à 0,00 V, et tous les E0 des autres couples sont mesurés par rapport à elle."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : que devient le terme log dans Nernst si [Ox]=[Red] ?","Indice niveau 2 : log(1)=0.","Indice niveau 3 : E=E0 exactement, par définition du potentiel standard."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare les deux E0.","Indice niveau 2 : le couple A a le E0 le plus élevé.","Indice niveau 3 : c'est donc l'oxydant de A qui réagit avec le réducteur de B."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : la demi-équation de MnO4-/Mn2+ contient-elle H+ ?","Indice niveau 2 : oui, 8 H+ sont échangés.","Indice niveau 3 : baisser le pH augmente [H+], ce qui augmente E via Nernst — le pouvoir oxydant augmente."] }
  ]
};

/* fusionne le module Chimie des solutions dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, CHIMSOL_CHAPTERS);
Object.assign(NOVA_KB, CHIMSOL_NOVA_KB);