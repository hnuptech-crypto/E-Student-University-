/* =====================================================================
   CHUNK « eln » — registre ELN_CHAPTERS / ELN_NOVA_KB
   Matière(s) : Physique|Électronique
   Chargé À LA DEMANDE par app.js (loadChunk) au premier accès à un chapitre de
   cette matière. Contenu identique à l'ancien app.js monolithique : les
   chapitres s'y éditent exactement comme avant (str_replace sur
   ELN_CHAPTERS[...Key('Titre')] = {...}).
   La liste des titres de chapitres (REAL_CHAPTERS) n'est PLUS ici : elle est
   dans app.js, section « LISTES DE CHAPITRES PAR MATIÈRE ».
   ===================================================================== */



/* ============================================================================
   MODULE ÉLECTRONIQUE — Physique L2
   (contenu conforme au programme standard de licence de physique francophone :
   physique des semi-conducteurs, diode à jonction et applications, transistor
   bipolaire — statique puis petits signaux —, transistor à effet de champ,
   amplificateur opérationnel — montages linéaires puis non linéaires — et
   introduction à l'électronique numérique. Structure identique aux autres
   modules : ELN_CHAPTERS / ELN_NOVA_KB, fusionnés à la fin dans
   MATH_TOOLS_CHAPTERS / NOVA_KB.)
============================================================================ */
const ELN_MATIERE = 'Électronique';
function elnKey(chapterTitle){ return `Physique|${ELN_MATIERE}|${chapterTitle}`; }
const ELN_CHAPTERS = {};
const ELN_NOVA_KB = {};

/* ---------------------------------------------------------------------------------
   OUTIL 1 — Point de fonctionnement d'une diode (droite de charge) — Chapitre 2
--------------------------------------------------------------------------------- */
function updateElnDiodeQ(){
  const E = parseFloat(document.getElementById('elnQE').value);
  const R = parseFloat(document.getElementById('elnQR').value);
  const Vg = parseFloat(document.getElementById('elnQVg').value);
  document.getElementById('elnQEVal').textContent = E.toFixed(1);
  document.getElementById('elnQRVal').textContent = R.toFixed(0);
  document.getElementById('elnQVgVal').textContent = Vg.toFixed(2);
  let I, V, blocked = false;
  if(E <= Vg){ I = 0; V = E; blocked = true; }
  else { I = (E - Vg) / R; V = Vg; }
  document.getElementById('elnQReadout').innerHTML = blocked
    ? `E ≤ Vγ : la diode reste <strong>bloquée</strong> (I = 0, toute la tension E se retrouve à ses bornes).`
    : `Droite de charge : I = (E − Vγ)/R = (${E.toFixed(1)} − ${Vg.toFixed(2)})/${R.toFixed(0)} = <strong>${(I*1000).toFixed(2)} mA</strong><br>Tension aux bornes de la diode : V ≈ Vγ = <strong>${V.toFixed(2)} V</strong>`;
}
function initElnDiodeQ(){ updateElnDiodeQ(); }

/* ---------------------------------------------------------------------------------
   OUTIL 2 — Gains des montages fondamentaux à AOP — Chapitre 7
--------------------------------------------------------------------------------- */
function updateElnAopGain(){
  const R1 = parseFloat(document.getElementById('elnAopR1').value);
  const R2 = parseFloat(document.getElementById('elnAopR2').value);
  document.getElementById('elnAopR1Val').textContent = R1.toFixed(0);
  document.getElementById('elnAopR2Val').textContent = R2.toFixed(0);
  const gInv = -R2/R1;
  const gNonInv = 1 + R2/R1;
  document.getElementById('elnAopReadout').innerHTML =
    `Montage inverseur : Av = −R₂/R₁ = <strong>${gInv.toFixed(2)}</strong><br>` +
    `Montage non-inverseur : Av = 1 + R₂/R₁ = <strong>${gNonInv.toFixed(2)}</strong>`;
}
function initElnAopGain(){ updateElnAopGain(); }

/* =========================== CHAPITRE 1 — Physique des semi-conducteurs : du cristal de silicium à la jonction PN =========================== */
ELN_CHAPTERS[elnKey('Physique des semi-conducteurs : du cristal de silicium à la jonction PN')] = {
  objectives: [
    "Situer les semi-conducteurs entre isolants et conducteurs à l'aide du modèle des bandes d'énergie",
    "Distinguer semi-conducteur intrinsèque et semi-conducteur extrinsèque (dopage de type N et de type P)",
    "Décrire la formation de la jonction PN : diffusion, zone de charge d'espace et barrière de potentiel",
    "Expliquer la notion de porteurs majoritaires et minoritaires dans chaque zone dopée"
  ],
  prereqs: ["Structure de l'atome : noyau, électron et identification des éléments"],
  bodyHtml: `
    <p>Toute l'électronique moderne — diodes, transistors, circuits intégrés — repose sur un même matériau de base : le <strong>semi-conducteur</strong>, et plus particulièrement le silicium. Ce premier chapitre pose les bases physiques indispensables avant d'aborder les composants eux-mêmes : pourquoi un semi-conducteur conduit-il « un peu », et que se passe-t-il quand on met en contact deux zones dopées différemment ?</p>

    <h3>1. Isolants, conducteurs et semi-conducteurs : le modèle des bandes d'énergie</h3>
    <p>Dans un solide cristallin, les niveaux d'énergie permis aux électrons se regroupent en <strong>bandes</strong>, séparées par des <strong>bandes interdites</strong> (gaps). Deux bandes jouent un rôle central : la <strong>bande de valence</strong> (électrons liés aux atomes) et la <strong>bande de conduction</strong> (électrons libres de se déplacer et donc de conduire le courant).</p>
    <table class="mini-table">
      <tr><th>Matériau</th><th>Largeur de bande interdite $E_g$</th><th>Comportement</th></tr>
      <tr><td>Conducteur (métal)</td><td>bandes de valence et de conduction se recouvrent</td><td>très bonne conduction, même à froid</td></tr>
      <tr><td>Semi-conducteur (Si, Ge)</td><td>$E_g \approx 1,1$ eV (Si), $0,7$ eV (Ge) — « petit »</td><td>isolant à 0 K, conducteur à température ambiante</td></tr>
      <tr><td>Isolant (diamant, verre)</td><td>$E_g > 5$ eV — « grand »</td><td>quasiment aucun électron ne franchit le gap</td></tr>
    </table>
    <p>À température ambiante, l'agitation thermique suffit à faire franchir le gap à une petite fraction des électrons de valence du silicium : chaque électron qui passe en bande de conduction laisse derrière lui une case vacante en bande de valence, appelée <strong>trou</strong>. Le trou se comporte comme une charge <em>positive</em> mobile : un électron voisin peut « sauter » pour combler le trou, ce qui revient à déplacer le trou dans l'autre sens.</p>
    <div class="key-point">
      <span class="eyebrow">Idée clé</span>
      Dans un semi-conducteur intrinsèque (pur), la conduction est assurée par deux types de porteurs de charge en nombre égal : les électrons libres (négatifs) et les trous (positifs), créés par paires sous l'effet de la température.
    </div>

    <h3>2. Le dopage : semi-conducteur extrinsèque</h3>
    <p>Le silicium intrinsèque conduit trop peu pour être directement utile. On introduit volontairement, en très faible proportion (de l'ordre d'un atome pour un million), des atomes étrangers appelés <strong>dopants</strong> : c'est le <strong>dopage</strong>, qui multiplie considérablement la conductivité et surtout permet de choisir le type de porteur majoritaire.</p>
    <table class="mini-table">
      <tr><th>Type de dopage</th><th>Dopant (valence)</th><th>Effet</th><th>Porteurs majoritaires</th></tr>
      <tr><td>Type N</td><td>Pentavalent : phosphore (P), arsenic (As) — 5 électrons de valence</td><td>4 électrons forment des liaisons covalentes avec le silicium, le 5ᵉ est faiblement lié et devient facilement libre : atome <strong>donneur</strong></td><td>électrons (négatifs)</td></tr>
      <tr><td>Type P</td><td>Trivalent : bore (B), aluminium (Al) — 3 électrons de valence</td><td>Une liaison covalente reste incomplète : elle crée un trou. L'atome peut capter un électron voisin : atome <strong>accepteur</strong></td><td>trous (positifs)</td></tr>
    </table>
    <p>Dans un semi-conducteur de type N, les électrons sont majoritaires et les trous minoritaires (et réciproquement pour le type P) — mais le cristal reste globalement <strong>neutre</strong> : le dopant apporte une charge fixe (ion donneur ou accepteur) exactement compensée par le porteur mobile qu'il a libéré.</p>

    <h3>3. Mise en contact : formation de la jonction PN</h3>
    <p>Une <strong>jonction PN</strong> est obtenue en dopant une même pièce de silicium en N d'un côté et en P de l'autre (par diffusion contrôlée de dopants). Au moment de la mise en contact, un phénomène en deux temps se produit :</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 220 90" width="100%">
          <rect x="10" y="15" width="90" height="60" fill="rgba(76,124,255,0.15)" stroke="#4C7CFF" stroke-width="1.4"/>
          <rect x="100" y="15" width="90" height="60" fill="rgba(240,85,92,0.15)" stroke="#F0555C" stroke-width="1.4"/>
          <rect x="85" y="15" width="30" height="60" fill="rgba(232,169,58,0.25)" stroke="none"/>
          <text x="35" y="10" font-family="IBM Plex Mono" font-size="9" fill="#4C7CFF">N (électrons)</text>
          <text x="130" y="10" font-family="IBM Plex Mono" font-size="9" fill="#F0555C">P (trous)</text>
          <text x="72" y="88" font-family="IBM Plex Mono" font-size="8" fill="#E8A93A">zone de charge d'espace</text>
          <line x1="100" y1="20" x2="100" y2="70" stroke="#EAF0FB" stroke-width="1" stroke-dasharray="2,2"/>
        </svg>
        <span>Jonction PN : la zone de charge d'espace (dépeuplée de porteurs mobiles) sépare les deux régions dopées</span>
      </div>
    </div>
    <p><strong>1) Diffusion :</strong> au voisinage immédiat du contact, les électrons (nombreux côté N) diffusent vers le côté P, et les trous diffusent vers le côté N, chacun suivant son gradient de concentration. <strong>2) Apparition d'un champ interne :</strong> en quittant leur zone, ces porteurs laissent derrière eux des ions fixes non compensés (ions donneurs positifs côté N, ions accepteurs négatifs côté P). Cette zone dépourvue de porteurs mobiles est la <strong>zone de charge d'espace</strong> (ou zone de déplétion). Elle crée un champ électrique interne dirigé de N vers P, qui s'oppose de plus en plus à la diffusion — un équilibre s'établit rapidement.</p>

    <h3>4. Barrière de potentiel</h3>
    <p>À l'équilibre, ce champ interne correspond à une différence de potentiel appelée <strong>barrière de potentiel</strong> (ou tension de diffusion) $V_0$, qui s'oppose spontanément à tout passage supplémentaire de porteurs majoritaires d'une zone vers l'autre :</p>
    <div class="formula-box">$$V_0 \approx 0{,}6 \text{ à } 0{,}7 \text{ V pour le silicium} \qquad\qquad V_0 \approx 0{,}2 \text{ à } 0{,}3 \text{ V pour le germanium}$$</div>
    <p>Cette valeur, propre au matériau et peu sensible au dopage, réapparaîtra directement comme <strong>tension de seuil</strong> de la diode au chapitre suivant. La largeur de la zone de charge d'espace (quelques dixièmes de micromètre) et la hauteur de cette barrière dépendent de la polarisation appliquée de l'extérieur — c'est précisément ce mécanisme qui donne à la diode son comportement dissymétrique caractéristique.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un semi-conducteur a un petit gap $E_g$ : isolant à 0 K, faiblement conducteur à température ambiante (paires électron-trou créées thermiquement)</li>
        <li>Dopage N (donneur pentavalent) → porteurs majoritaires = électrons ; dopage P (accepteur trivalent) → porteurs majoritaires = trous. Le cristal dopé reste neutre</li>
        <li>À la jonction PN, la diffusion des porteurs crée une zone de charge d'espace (ions fixes, pas de porteurs mobiles) et un champ interne qui s'y oppose</li>
        <li>Cet équilibre définit une barrière de potentiel $V_0 \approx 0{,}6$–$0{,}7$ V pour le silicium — future tension de seuil de la diode</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire qu'un cristal dopé N est chargé négativement : il reste électriquement neutre, seuls les porteurs majoritaires changent de nature</li>
        <li>Confondre porteurs majoritaires et minoritaires : côté N, les électrons sont majoritaires MAIS il existe aussi quelques trous minoritaires (créés thermiquement)</li>
        <li>Penser que la zone de charge d'espace contient des charges mobiles : elle est au contraire dépeuplée de porteurs libres, ne restent que les ions fixes du réseau</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour obtenir un semi-conducteur de type P à partir de silicium (valence 4), on dope avec un atome de valence :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln1e1" value="wrong"> 5 (pentavalent)</label>
          <label class="option"><input type="radio" name="eln1e1" value="right"> 3 (trivalent)</label>
          <label class="option"><input type="radio" name="eln1e1" value="wrong"> 4 (tétravalent)</label>
          <label class="option"><input type="radio" name="eln1e1" value="wrong"> 2 (divalent)</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln1e1','eln1fb1','Correct — un atome trivalent (bore, aluminium) ne peut compléter que 3 liaisons covalentes sur 4 : la liaison manquante crée un trou, porteur majoritaire du type P.','Le type P est associé aux TROUS. Quel type d\'atome dopant crée un déficit d\'électron plutôt qu\'un excès ?')">Vérifier</button>
        <div class="feedback" id="eln1fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">La zone de charge d'espace d'une jonction PN à l'équilibre est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln1e2" value="wrong"> riche en électrons libres</label>
          <label class="option"><input type="radio" name="eln1e2" value="wrong"> riche en trous libres</label>
          <label class="option"><input type="radio" name="eln1e2" value="right"> dépeuplée de porteurs mobiles, ne contenant que des ions fixes</label>
          <label class="option"><input type="radio" name="eln1e2" value="wrong"> électriquement neutre en tout point</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln1e2','eln1fb2','Correct — les porteurs mobiles ont diffusé hors de cette zone ; il ne reste que les ions donneurs et accepteurs fixes, à l\'origine du champ interne.','Réfléchis à ce qui a diffusé HORS de cette zone, et à ce qui reste derrière (fixe dans le réseau).')">Vérifier</button>
        <div class="feedback" id="eln1fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La barrière de potentiel d'une jonction PN au silicium vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln1e3" value="wrong"> 5 V</label>
          <label class="option"><input type="radio" name="eln1e3" value="wrong"> 1,5 V</label>
          <label class="option"><input type="radio" name="eln1e3" value="right"> 0,6 à 0,7 V</label>
          <label class="option"><input type="radio" name="eln1e3" value="wrong"> 0 V</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln1e3','eln1fb3','Correct — c\'est la valeur typique pour le silicium, qui redeviendra la tension de seuil Vγ de la diode.','C\'est une valeur à retenir par cœur : elle réapparaît partout dans le cours (tension de seuil de la diode, VBE du transistor bipolaire...).')">Vérifier</button>
        <div class="feedback" id="eln1fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Physique des semi-conducteurs : du cristal de silicium à la jonction PN')] = {
  intro: "Salut, moi c'est Nova ! On démarre le module Électronique avec la physique des semi-conducteurs. Demande-moi la différence entre dopage N et P, ce qu'est la zone de charge d'espace, ou un indice sur un exercice.",
  rules: [
    { test:/bande.*(valence|conduction)|gap|E_?g/i, replies:["La bande de valence contient les électrons liés aux atomes, la bande de conduction les électrons libres de conduire. Le gap Eg est l'écart entre les deux : petit pour un semi-conducteur (~1,1 eV pour Si), grand pour un isolant."] },
    { test:/dopage.*n|type n|donneur/i, replies:["Le dopage N utilise un atome pentavalent (P, As) : son 5ᵉ électron de valence, non engagé dans les liaisons covalentes, devient facilement libre. Porteurs majoritaires = électrons."] },
    { test:/dopage.*p|type p|accepteur/i, replies:["Le dopage P utilise un atome trivalent (B, Al) : une liaison covalente reste incomplète, ce qui crée un trou. Porteurs majoritaires = trous (charge positive mobile)."] },
    { test:/zone de charge d.espace|zone de d[ée]pl[ée]tion/i, replies:["C'est la zone au voisinage de la jonction PN, dépeuplée de porteurs mobiles après la diffusion initiale : il n'y reste que les ions fixes (donneurs+ côté N, accepteurs− côté P), source du champ interne."] },
    { test:/barri[eè]re de potentiel|v0|tension de diffusion/i, replies:["La barrière de potentiel V0 est la différence de potentiel créée par le champ interne à l'équilibre : environ 0,6-0,7 V pour le silicium. Elle s'oppose spontanément à toute diffusion supplémentaire des porteurs majoritaires."] },
    { test:/porteur.*majoritaire|porteur.*minoritaire/i, replies:["Côté N, les électrons sont majoritaires et les trous minoritaires (créés thermiquement). Côté P, c'est l'inverse. Le cristal dopé reste globalement neutre."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : le type P est associé aux trous.","Indice niveau 2 : un atome dopant avec MOINS d'électrons de valence que le silicium crée un déficit (un trou).","Indice niveau 3 : c'est l'atome trivalent, valence 3."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : pense à ce qui a diffusé HORS de la zone de charge d'espace.","Indice niveau 2 : il ne reste que les ions fixes du réseau, pas de charges mobiles.","Indice niveau 3 : la zone est dépeuplée de porteurs mobiles."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est une valeur à mémoriser, elle revient tout le long du cours.","Indice niveau 2 : c'est aussi la tension de seuil future de la diode au silicium.","Indice niveau 3 : 0,6 à 0,7 V."] }
  ]
};

/* =========================== CHAPITRE 2 — La diode à jonction : caractéristique, modèles et types particuliers =========================== */
ELN_CHAPTERS[elnKey('La diode à jonction : caractéristique, modèles et types particuliers')] = {
  objectives: [
    "Tracer et interpréter la caractéristique courant-tension I(V) d'une diode à jonction",
    "Utiliser les modèles simplifiés de la diode (idéale, seuil, seuil + résistance) selon la précision recherchée",
    "Déterminer un point de fonctionnement par la méthode de la droite de charge",
    "Distinguer diode Zener, diode électroluminescente (LED) et diode Schottky, et leurs usages"
  ],
  prereqs: ["Physique des semi-conducteurs : du cristal de silicium à la jonction PN"],
  bodyHtml: `
    <p>La diode est le composant le plus simple issu de la jonction PN : elle laisse passer le courant dans un sens (polarisation directe) et le bloque quasiment dans l'autre (polarisation inverse). Ce comportement dissymétrique, non linéaire, est à la base de très nombreuses fonctions électroniques.</p>

    <h3>1. Polarisation directe et inverse</h3>
    <table class="mini-table">
      <tr><th>Polarisation</th><th>Effet sur la barrière de potentiel</th><th>Comportement</th></tr>
      <tr><td>Directe (anode au + par rapport à la cathode)</td><td>la tension appliquée s'oppose à V0 et l'abaisse</td><td>au-delà d'un seuil, le courant croît très rapidement (exponentiellement)</td></tr>
      <tr><td>Inverse (anode au − par rapport à la cathode)</td><td>la tension appliquée s'ajoute à V0 et l'augmente</td><td>la zone de charge d'espace s'élargit, quasiment aucun courant ne passe (courant de saturation inverse $I_s$, très faible)</td></tr>
    </table>

    <h3>2. Équation de Shockley et caractéristique réelle</h3>
    <p>Le courant traversant une diode idéale à jonction suit la loi de Shockley :</p>
    <div class="formula-box">$$I = I_s\left(e^{\frac{V}{n V_T}} - 1\right)$$</div>
    <p>où $I_s$ est le courant de saturation inverse (de l'ordre du nA), $n$ le coefficient d'idéalité (entre 1 et 2 selon la technologie) et $V_T = kT/q \approx 25{,}9$ mV à température ambiante (300 K) la tension thermique. En direct ($V \gg V_T$), le terme exponentiel domine largement et le courant croît de façon très abrupte au-delà d'un seuil ; en inverse, le courant sature très vite à la valeur (quasi constante) $-I_s$.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 150 90" width="100%">
          <line x1="10" y1="45" x2="140" y2="45" stroke="#EAF0FB" stroke-width="1"/>
          <line x1="75" y1="10" x2="75" y2="80" stroke="#EAF0FB" stroke-width="1"/>
          <path d="M75,45 C95,44 100,42 105,30 C110,15 112,12 118,10" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <path d="M75,45 L50,45.5 L20,46" stroke="#F0555C" stroke-width="1.6" fill="none"/>
          <text x="120" y="20" font-family="IBM Plex Mono" font-size="8" fill="#4C7CFF">direct</text>
          <text x="15" y="55" font-family="IBM Plex Mono" font-size="8" fill="#F0555C">inverse (≈ −Is)</text>
          <text x="80" y="52" font-family="IBM Plex Mono" font-size="8" fill="#E8A93A">Vγ</text>
        </svg>
        <span>Allure de la caractéristique I(V) : montée abrupte au-delà du seuil en direct, palier quasi nul en inverse</span>
      </div>
    </div>

    <h3>3. Modèles simplifiés pour l'analyse de circuit</h3>
    <p>En pratique, résoudre l'équation exponentielle est lourd : on utilise des modèles linéaires par morceaux, d'autant plus précis qu'ils sont complexes.</p>
    <table class="mini-table">
      <tr><th>Modèle</th><th>Comportement en direct</th><th>Comportement en inverse</th><th>Usage</th></tr>
      <tr><td>Diode idéale</td><td>interrupteur fermé, $V=0$</td><td>interrupteur ouvert, $I=0$</td><td>estimations rapides, premier ordre</td></tr>
      <tr><td>Diode à seuil</td><td>interrupteur fermé dès que $V=V_\gamma$ (≈0,7 V pour Si)</td><td>interrupteur ouvert</td><td>calculs standard, bon compromis</td></tr>
      <tr><td>Seuil + résistance dynamique</td><td>$V = V_\gamma + R_d I$</td><td>interrupteur ouvert</td><td>précision fine, pente de la caractéristique</td></tr>
    </table>

    <h3>4. Point de fonctionnement : méthode de la droite de charge</h3>
    <p>Pour un circuit simple (générateur $E$, résistance $R$, diode en série), la loi des mailles impose $E = RI + V$, soit une <strong>droite de charge</strong> dans le plan $(V,I)$ : $I = \dfrac{E-V}{R}$. Le point de fonctionnement réel (dit <strong>point Q</strong>, pour « quiescent ») est l'intersection de cette droite avec la caractéristique de la diode. Avec le modèle à seuil, ce calcul devient immédiat : si $E>V_\gamma$, la diode conduit et $I=\dfrac{E-V_\gamma}{R}$ ; sinon $I=0$.</p>
    <div class="key-point">
      <span class="eyebrow">Méthode</span>
      1) Choisir le modèle adapté à la précision voulue. 2) Écrire la loi des mailles du circuit. 3) Supposer un état (diode passante ou bloquée), résoudre, puis vérifier la cohérence (I&gt;0 si passante, V&lt;Vγ si bloquée supposée). 4) Si l'hypothèse est contredite, reprendre avec l'autre état.
    </div>

    <h3>5. Diodes particulières</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Principe</th><th>Application typique</th></tr>
      <tr><td>Diode Zener</td><td>fonctionne volontairement en inverse, dans la zone d'avalanche/effet Zener où $V$ reste quasi constante ($V_Z$) pour une large plage de courant</td><td>référence et régulation de tension</td></tr>
      <tr><td>LED (diode électroluminescente)</td><td>recombinaison radiative des paires électron-trou en direct, émission de photons</td><td>éclairage, signalisation, affichage</td></tr>
      <tr><td>Diode Schottky</td><td>jonction métal-semi-conducteur (pas PN) : seuil plus faible (~0,2-0,3 V), commutation très rapide</td><td>redressement haute fréquence, protection contre les inversions rapides</td></tr>
    </table>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Équation de Shockley : $I=I_s(e^{V/(nV_T)}-1)$, avec $V_T\approx 25{,}9$ mV à température ambiante</li>
        <li>Modèle à seuil (le plus utilisé) : diode passante si $E>V_\gamma\approx 0{,}7$ V (Si), alors $I=(E-V_\gamma)/R$ ; sinon $I=0$</li>
        <li>Point de fonctionnement Q = intersection de la droite de charge $I=(E-V)/R$ avec la caractéristique de la diode</li>
        <li>Zener → référence de tension en inverse ; LED → émission de lumière en direct ; Schottky → seuil faible et commutation rapide</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de vérifier la cohérence de l'hypothèse (passante/bloquée) après le calcul — une hypothèse fausse donne un résultat absurde (I&lt;0, ou V&gt;Vγ en bloqué)</li>
        <li>Confondre le sens de la diode Zener en fonctionnement normal : elle est utilisée polarisée EN INVERSE, contrairement à une diode classique</li>
        <li>Appliquer le modèle idéal (V=0) quand l'énoncé demande une précision qui exige le seuil Vγ ≈ 0,7 V</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — point de fonctionnement (droite de charge)</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre E, R et le seuil Vγ : le calculateur applique le modèle à seuil et donne le point de fonctionnement Q.</p>
      <div class="sim-controls">
        <label>E (V) : <input type="number" id="elnQE" value="5" step="0.1" style="width:60px;" oninput="updateElnDiodeQ()"></label>
        <label>R (Ω) : <input type="number" id="elnQR" value="470" style="width:70px;" oninput="updateElnDiodeQ()"></label>
        <label>Vγ (V) : <input type="number" id="elnQVg" value="0.7" step="0.05" style="width:60px;" oninput="updateElnDiodeQ()"></label>
        <div class="sim-readout" id="elnQReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un circuit série E=6 V, R=1 kΩ, diode au silicium (modèle à seuil, Vγ=0,7 V). Le courant dans le circuit vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln2e1" value="wrong"> 6 mA</label>
          <label class="option"><input type="radio" name="eln2e1" value="right"> 5,3 mA</label>
          <label class="option"><input type="radio" name="eln2e1" value="wrong"> 0,7 mA</label>
          <label class="option"><input type="radio" name="eln2e1" value="wrong"> 0 mA</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln2e1','eln2fb1','Correct — I=(E−Vγ)/R=(6−0,7)/1000=5,3 mA. E&gt;Vγ donc la diode est bien passante, l\'hypothèse est cohérente.','Vérifie d\'abord que E&gt;Vγ (diode passante), puis applique I=(E−Vγ)/R.')">Vérifier</button>
        <div class="feedback" id="eln2fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Une diode Zener est utilisée pour réguler une tension. Elle doit être polarisée :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln2e2" value="right"> en inverse, dans sa zone d'avalanche/effet Zener</label>
          <label class="option"><input type="radio" name="eln2e2" value="wrong"> en direct, comme une diode classique</label>
          <label class="option"><input type="radio" name="eln2e2" value="wrong"> alternativement en direct puis en inverse</label>
          <label class="option"><input type="radio" name="eln2e2" value="wrong"> cela n'a pas d'importance</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln2e2','eln2fb2','Correct — c\'est justement en inverse, dans la zone où sa tension VZ reste quasi constante sur une large plage de courant, que la Zener assure sa fonction de référence.','Repense au tableau des diodes particulières : la Zener est un cas volontairement inverse.')">Vérifier</button>
        <div class="feedback" id="eln2fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans l'équation de Shockley, la tension thermique $V_T=kT/q$ vaut environ, à température ambiante :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln2e3" value="wrong"> 0,7 V</label>
          <label class="option"><input type="radio" name="eln2e3" value="right"> 25,9 mV</label>
          <label class="option"><input type="radio" name="eln2e3" value="wrong"> 1 V</label>
          <label class="option"><input type="radio" name="eln2e3" value="wrong"> 100 mV</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln2e3','eln2fb3','Correct — VT≈25,9 mV à 300 K ; ne pas confondre avec le seuil Vγ≈0,7 V, qui est une valeur macroscopique différente.','Ne confonds pas VT (tension thermique, ~26 mV) et Vγ (seuil pratique, ~0,7 V) : ce sont deux grandeurs différentes.')">Vérifier</button>
        <div class="feedback" id="eln2fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('La diode à jonction : caractéristique, modèles et types particuliers')] = {
  intro: "Salut, moi c'est Nova ! On est sur « La diode à jonction ». Demande-moi l'équation de Shockley, la méthode de la droite de charge, ou un indice sur un exercice.",
  rules: [
    { test:/shockley|[ée]quation.*diode/i, replies:["L'équation de Shockley : I=Is(e^(V/nVT) − 1). En direct, le terme exponentiel domine et le courant croît très vite ; en inverse, I sature à environ −Is (très faible)."] },
    { test:/mod[eè]le.*seuil|v[ée]?gamma|vγ/i, replies:["Le modèle à seuil : la diode se comporte comme un interrupteur fermé dès que V=Vγ (≈0,7 V pour le silicium), sinon comme un interrupteur ouvert. C'est le modèle le plus utilisé en pratique."] },
    { test:/droite de charge|point de fonctionnement|point q/i, replies:["La droite de charge vient de la loi des mailles E=RI+V, soit I=(E−V)/R. Le point de fonctionnement Q est l'intersection avec la caractéristique de la diode."] },
    { test:/zener/i, replies:["La diode Zener est utilisée polarisée EN INVERSE, dans sa zone d'avalanche où sa tension VZ reste quasi constante sur une large plage de courant : elle sert de référence/régulation de tension."] },
    { test:/led|[ée]lectroluminescente/i, replies:["Une LED émet de la lumière par recombinaison radiative des paires électron-trou, en polarisation directe."] },
    { test:/schottky/i, replies:["La diode Schottky est une jonction métal-semi-conducteur (pas PN) : seuil plus faible (~0,2-0,3 V) et commutation très rapide, utile en haute fréquence."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : vérifie d'abord que E&gt;Vγ.","Indice niveau 2 : applique I=(E−Vγ)/R.","Indice niveau 3 : I=5,3 mA."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense au sens de polarisation propre à la Zener.","Indice niveau 2 : c'est un cas volontairement inverse.","Indice niveau 3 : en inverse, zone d'avalanche/effet Zener."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : ne confonds pas VT et Vγ.","Indice niveau 2 : VT est de l'ordre de quelques dizaines de mV.","Indice niveau 3 : 25,9 mV."] }
  ]
};

/* =========================== CHAPITRE 3 — Applications de la diode : redressement, filtrage et régulation de tension =========================== */
ELN_CHAPTERS[elnKey('Applications de la diode : redressement, filtrage et régulation de tension')] = {
  objectives: [
    "Analyser le fonctionnement d'un redresseur simple alternance et double alternance (pont de Graetz)",
    "Calculer l'ondulation résiduelle d'une tension redressée puis filtrée par condensateur",
    "Dimensionner une régulation de tension simple par diode Zener",
    "Décrire le principe des circuits écrêteurs et limiteurs à diodes"
  ],
  prereqs: ["La diode à jonction : caractéristique, modèles et types particuliers"],
  bodyHtml: `
    <p>Convertir une tension alternative (issue par exemple d'un transformateur) en une tension continue utilisable par un circuit électronique est l'une des applications les plus répandues de la diode. Ce chapitre construit, étape par étape, la chaîne classique <strong>redressement → filtrage → régulation</strong> présente dans la quasi-totalité des alimentations.</p>

    <h3>1. Redressement simple alternance</h3>
    <p>Une seule diode en série avec la charge ne laisse passer que les alternances positives de la tension d'entrée $v_e(t)=V_m\sin(\omega t)$ : la tension de sortie est nulle pendant toute l'alternance négative. C'est le montage le plus simple, mais le moins efficace (la moitié de l'énergie n'est pas utilisée, et l'ondulation résiduelle est importante).</p>
    <div class="formula-box">$$v_s(t) = \max(0,\ V_m\sin(\omega t) - V_\gamma)$$</div>

    <h3>2. Redressement double alternance : le pont de Graetz</h3>
    <p>Un montage à quatre diodes (pont de Graetz) exploite les deux alternances : quel que soit le signe de $v_e$, le courant traverse toujours la charge dans le même sens. La tension de sortie « redressée » ressemble à une succession de bosses positives, à fréquence double de celle de l'entrée.</p>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 70" width="100%">
          <path d="M5,35 Q15,10 25,35 Q35,60 45,35" stroke="#4C7CFF" stroke-width="1.4" fill="none"/>
          <path d="M45,35 Q55,10 65,35 Q75,60 85,35" stroke="#4C7CFF" stroke-width="1.4" fill="none"/>
          <line x1="0" y1="35" x2="90" y2="35" stroke="#EAF0FB" stroke-width="0.6" stroke-dasharray="1,1"/>
          <text x="0" y="8" font-family="IBM Plex Mono" font-size="7" fill="#4C7CFF">redressée double alternance</text>
          <path d="M100,20 Q110,10 120,20 Q130,55 140,20" stroke="#2DD4C4" stroke-width="1.4" fill="none"/>
          <line x1="98" y1="20" x2="145" y2="20" stroke="#EAF0FB" stroke-width="0.6" stroke-dasharray="1,1"/>
          <text x="98" y="8" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">après filtrage (ondulation)</text>
        </svg>
        <span>Tension redressée double alternance, puis lissée par le condensateur de filtrage (ondulation résiduelle)</span>
      </div>
    </div>
    <p>Le pont de Graetz introduit deux chutes de tension diode en série sur le trajet du courant (deux diodes conduisent simultanément à chaque instant), donc $v_s \approx |v_e| - 2V_\gamma$.</p>

    <h3>3. Filtrage par condensateur : lissage et ondulation</h3>
    <p>Placé en parallèle sur la charge, un condensateur $C$ se charge au pic de tension puis se décharge lentement dans la résistance de charge $R$ tant que la tension redressée reste inférieure à sa propre tension : la sortie ne s'annule plus, mais présente une <strong>ondulation résiduelle</strong> $\Delta V$ (« ripple »). En approximant la décharge par une droite (décharge lente devant la période) :</p>
    <div class="formula-box">$$\Delta V \approx \frac{I_{charge}}{f\,C} \qquad \text{(redressement simple alternance, } f\text{ = fréquence du secteur)}$$ $$\Delta V \approx \frac{I_{charge}}{2f\,C} \qquad \text{(redressement double alternance)}$$</div>
    <p>Plus $C$ est grand (et/ou le courant de charge faible), plus l'ondulation résiduelle est faible : c'est le compromis fondamental du dimensionnement d'une alimentation simple.</p>

    <h3>4. Régulation de tension par diode Zener</h3>
    <p>La tension filtrée reste ondulée et varie avec la charge : pour obtenir une tension continue stable, on ajoute une diode Zener en parallèle sur la charge, alimentée à travers une résistance série $R_S$ depuis la tension filtrée $V_{in}$.</p>
    <div class="formula-box">$$R_S = \frac{V_{in} - V_Z}{I_Z + I_{charge}}$$</div>
    <p>Tant que le courant dans la Zener $I_Z$ reste dans sa plage de fonctionnement normal (entre un minimum $I_{Zmin}$ garantissant la régulation, et un maximum lié à la puissance dissipable $P_{max}=V_Z I_{Zmax}$), la tension de sortie reste fixée à $V_Z$, quasiment indépendante des variations de $V_{in}$ ou de la charge.</p>

    <h3>5. Écrêteurs et limiteurs</h3>
    <p>Une diode (éventuellement associée à une source de tension continue de référence) placée en parallèle sur le signal permet d'<strong>écrêter</strong> (couper) toute portion du signal dépassant un seuil donné, dans un sens ou dans les deux (limiteur double avec deux diodes tête-bêche). Ces montages protègent les circuits sensibles contre des surtensions et servent aussi à mettre en forme des signaux.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Redressement simple alternance : une diode, la moitié du signal perdue. Pont de Graetz (4 diodes) : les deux alternances utilisées, mais 2 chutes de diode en série</li>
        <li>Filtrage par condensateur : ondulation $\Delta V \approx I_{charge}/(fC)$ (simple) ou $I_{charge}/(2fC)$ (double alternance) — grand C ou faible I ⇒ faible ondulation</li>
        <li>Régulation Zener : $R_S=(V_{in}-V_Z)/(I_Z+I_{charge})$, tension de sortie fixée à $V_Z$ tant que $I_Z$ reste dans sa plage utile</li>
        <li>Écrêteurs/limiteurs : diode(s) en parallèle sur le signal pour couper les portions dépassant un seuil de tension</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier de doubler la fréquence dans la formule d'ondulation du redressement double alternance (le facteur 2f au dénominateur, pas f)</li>
        <li>Oublier les deux chutes de tension diode (2Vγ) dans un pont de Graetz, contrairement au redressement simple alternance (une seule chute)</li>
        <li>Dimensionner RS en oubliant le courant de charge en plus du courant Zener nécessaire à la régulation</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un redressement double alternance filtré par un condensateur alimente une charge tirant 100 mA, avec C=1000 µF, sur le secteur 50 Hz. L'ondulation résiduelle vaut environ :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln3e1" value="wrong"> 2 V</label>
          <label class="option"><input type="radio" name="eln3e1" value="right"> 1 V</label>
          <label class="option"><input type="radio" name="eln3e1" value="wrong"> 0,1 V</label>
          <label class="option"><input type="radio" name="eln3e1" value="wrong"> 5 V</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln3e1','eln3fb1','Correct — ΔV=I/(2fC)=0,1/(2×50×1000e-6)=0,1/0,1=1 V.','Utilise ΔV=I/(2fC) car c\'est un redressement DOUBLE alternance.')">Vérifier</button>
        <div class="feedback" id="eln3fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour réduire l'ondulation résiduelle d'une alimentation filtrée, à courant de charge fixé, il faut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln3e2" value="wrong"> diminuer la capacité C</label>
          <label class="option"><input type="radio" name="eln3e2" value="right"> augmenter la capacité C</label>
          <label class="option"><input type="radio" name="eln3e2" value="wrong"> diminuer la fréquence du secteur</label>
          <label class="option"><input type="radio" name="eln3e2" value="wrong"> retirer le pont de diodes</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln3e2','eln3fb2','Correct — ΔV est inversement proportionnelle à C : plus C est grand, plus il stocke d\'énergie et lisse la tension entre deux pics.','Regarde la formule ΔV≈I/(2fC) : C est au dénominateur.')">Vérifier</button>
        <div class="feedback" id="eln3fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Dans une régulation Zener, si le courant de charge augmente fortement (sans dépasser les limites), la tension de sortie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln3e3" value="wrong"> augmente proportionnellement</label>
          <label class="option"><input type="radio" name="eln3e3" value="wrong"> chute à zéro</label>
          <label class="option"><input type="radio" name="eln3e3" value="right"> reste quasiment constante, égale à VZ</label>
          <label class="option"><input type="radio" name="eln3e3" value="wrong"> devient négative</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln3e3','eln3fb3','Correct — c\'est tout l\'intérêt de la régulation Zener : tant que IZ reste dans sa plage utile, VS reste fixée à VZ malgré les variations de charge.','C\'est le principe même de la régulation : la sortie reste stable tant que la Zener reste dans sa plage de fonctionnement.')">Vérifier</button>
        <div class="feedback" id="eln3fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Applications de la diode : redressement, filtrage et régulation de tension')] = {
  intro: "Salut, moi c'est Nova ! On est sur les applications de la diode : redressement, filtrage, régulation. Demande-moi la formule de l'ondulation, comment dimensionner une régulation Zener, ou un indice sur un exercice.",
  rules: [
    { test:/redressement simple/i, replies:["Le redressement simple alternance (une diode) ne laisse passer que les alternances positives : simple mais peu efficace, forte ondulation résiduelle après filtrage."] },
    { test:/pont de graetz|redressement double/i, replies:["Le pont de Graetz (4 diodes) redresse les deux alternances : vs≈|ve|−2Vγ (deux diodes conduisent en série à chaque instant), avec une fréquence de sortie doublée."] },
    { test:/ondulation|ripple/i, replies:["Ondulation résiduelle après filtrage par condensateur : ΔV≈I/(fC) en simple alternance, ΔV≈I/(2fC) en double alternance. Plus C est grand ou I faible, plus ΔV est petite."] },
    { test:/zener.*(r[ée]gul|dimension)|r[ée]sistance s[ée]rie/i, replies:["Dimensionnement d'une régulation Zener : RS=(Vin−VZ)/(IZ+Icharge). Il faut vérifier que IZ reste entre IZmin (régulation effective) et IZmax (puissance maximale dissipable)."] },
    { test:/[ée]cr[êe]teur|limiteur/i, replies:["Un écrêteur (une diode en parallèle sur le signal, éventuellement avec une tension de référence) coupe la partie du signal dépassant un seuil — utile pour protéger un circuit ou mettre en forme un signal."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : utilise ΔV=I/(2fC) (double alternance).","Indice niveau 2 : convertis µF en F avant de calculer.","Indice niveau 3 : ΔV=1 V."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : regarde où se trouve C dans la formule de l'ondulation.","Indice niveau 2 : C est au dénominateur.","Indice niveau 3 : augmenter C réduit l'ondulation."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est le principe même de la régulation Zener.","Indice niveau 2 : tant que IZ reste dans sa plage utile...","Indice niveau 3 : la sortie reste quasi constante, égale à VZ."] }
  ]
};

/* =========================== CHAPITRE 4 — Le transistor bipolaire : structure, régimes de fonctionnement et polarisation =========================== */
ELN_CHAPTERS[elnKey('Le transistor bipolaire : structure, régimes de fonctionnement et polarisation')] = {
  objectives: [
    "Décrire la structure NPN/PNP du transistor bipolaire et l'effet transistor",
    "Distinguer les trois régimes de fonctionnement (bloqué, actif, saturé) et leurs conditions",
    "Relier les courants de base, collecteur et émetteur via le gain en courant β",
    "Calculer un point de polarisation par la méthode du pont diviseur de base"
  ],
  prereqs: ["Applications de la diode : redressement, filtrage et régulation de tension"],
  bodyHtml: `
    <p>Le transistor bipolaire à jonctions (BJT) est le composant qui a rendu possible l'amplification électronique moderne. C'est un empilement de trois zones semi-conductrices dopées alternativement, formant deux jonctions PN couplées : c'est ce couplage — et non chaque jonction séparément — qui produit l'« effet transistor ».</p>

    <h3>1. Structure et symboles</h3>
    <table class="mini-table">
      <tr><th>Type</th><th>Structure</th><th>Trois bornes</th></tr>
      <tr><td>NPN</td><td>N (émetteur) – P (base, très fine) – N (collecteur)</td><td rowspan="2">Émetteur (E), Base (B), Collecteur (C)</td></tr>
      <tr><td>PNP</td><td>P (émetteur) – N (base, très fine) – P (collecteur)</td></tr>
    </table>
    <p>La base est extrêmement fine et faiblement dopée par rapport à l'émetteur et au collecteur — c'est cette dissymétrie géométrique qui rend l'effet transistor possible : la plupart des porteurs injectés par l'émetteur traversent la base sans s'y recombiner, et sont happés par le collecteur.</p>

    <h3>2. L'effet transistor (cas NPN)</h3>
    <p>En régime actif, la jonction base-émetteur est polarisée en <strong>direct</strong> (comme une diode passante) et la jonction base-collecteur en <strong>inverse</strong>. La polarisation directe BE injecte massivement des électrons de l'émetteur vers la base ; comme la base est très fine, l'écrasante majorité de ces électrons ne se recombine pas et est happée par le champ inverse de la jonction base-collecteur, rejoignant le collecteur. Seule une infime fraction contribue au courant de base $I_B$.</p>
    <div class="formula-box">$$I_E = I_B + I_C \qquad\qquad I_C = \beta\, I_B \qquad\qquad I_C = \alpha\, I_E \ \text{ avec } \alpha = \frac{\beta}{\beta+1}$$</div>
    <p>Le gain en courant $\beta$ (souvent noté $h_{FE}$ en régime statique) est typiquement compris entre 50 et 300 selon le composant — un paramètre peu reproductible d'un exemplaire à l'autre, ce qui justifiera au chapitre suivant l'intérêt d'une polarisation « stable », peu sensible à sa valeur exacte.</p>

    <h3>3. Les trois régimes de fonctionnement</h3>
    <table class="mini-table">
      <tr><th>Régime</th><th>Jonction BE</th><th>Jonction BC</th><th>Comportement</th></tr>
      <tr><td>Bloqué</td><td>inverse (ou &lt; Vγ)</td><td>inverse</td><td>$I_B=I_C=I_E\approx 0$ — interrupteur ouvert</td></tr>
      <tr><td>Actif (linéaire)</td><td>directe ($V_{BE}\approx 0{,}6$-$0{,}7$ V)</td><td>inverse</td><td>$I_C=\beta I_B$ — zone d'amplification</td></tr>
      <tr><td>Saturé</td><td>directe</td><td>directe</td><td>$V_{CE}\approx V_{CEsat}\approx 0{,}2$ V, $I_C$ limité par le circuit externe (plus $I_C=\beta I_B$) — interrupteur fermé</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Idée clé</span>
      En commutation (interrupteur électronique), on exploite les régimes bloqué/saturé. En amplification, on exploite exclusivement le régime actif — d'où l'importance de bien polariser le transistor pour l'y maintenir en permanence, y compris quand le signal utile varie.
    </div>

    <h3>4. Réseau de caractéristiques de sortie</h3>
    <p>Le réseau $I_C(V_{CE})$, tracé pour différentes valeurs de $I_B$, montre des courbes quasi horizontales en régime actif ($I_C$ peu sensible à $V_{CE}$, imposé essentiellement par $I_B$) qui remontent brutalement vers l'origine dans la zone de saturation ($V_{CE}$ petit).</p>

    <h3>5. Polarisation par pont diviseur de base</h3>
    <p>Pour fixer un point de fonctionnement stable en régime actif, le montage le plus robuste utilise un pont diviseur ($R_1$, $R_2$) sur la base, une résistance de collecteur $R_C$ et une résistance d'émetteur $R_E$ (contre-réaction stabilisatrice) :</p>
    <div class="formula-box">$$V_B \approx V_{CC}\cdot\frac{R_2}{R_1+R_2} \qquad I_E \approx \frac{V_B - V_{BE}}{R_E} \qquad I_C \approx I_E \qquad V_{CE} = V_{CC} - I_C R_C - I_E R_E$$</div>
    <p>Le raisonnement suppose le pont « raide » (le courant tiré par la base est négligeable devant le courant dans le pont), approximation valable si $R_1,R_2 \ll \beta R_E$. L'intérêt majeur : $I_C$ dépend alors presque uniquement de $V_B$, $V_{BE}$ et $R_E$ — trois grandeurs stables — et presque plus de $\beta$, qui varie fortement d'un transistor à l'autre.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>NPN/PNP : trois zones dopées, base fine et faiblement dopée — condition de l'effet transistor. $I_E=I_B+I_C$, $I_C=\beta I_B$</li>
        <li>Trois régimes : bloqué (les deux jonctions en inverse), actif (BE directe, BC inverse — zone d'amplification), saturé (les deux jonctions directes — interrupteur fermé)</li>
        <li>En régime actif : $V_{BE}\approx 0{,}6$-$0{,}7$ V ; en saturé : $V_{CE}\approx 0{,}2$ V (silicium)</li>
        <li>Polarisation par pont diviseur + résistance d'émetteur : rend $I_C$ presque indépendant de β, donc stable malgré la dispersion des transistors et la température</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Croire que $I_C=\beta I_B$ reste valable en régime saturé : dans ce régime, $I_C$ est fixé par le circuit externe, pas par β</li>
        <li>Oublier la condition sur la jonction BC (inverse en actif, directe en saturé) — c'est elle qui distingue les deux régimes, pas seulement l'état de la jonction BE</li>
        <li>Négliger le courant de base devant le courant du pont diviseur sans vérifier la condition $R_1,R_2\ll\beta R_E$</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un transistor NPN a β=100 et IB=20 µA en régime actif. Le courant de collecteur IC vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln4e1" value="wrong"> 100 µA</label>
          <label class="option"><input type="radio" name="eln4e1" value="right"> 2 mA</label>
          <label class="option"><input type="radio" name="eln4e1" value="wrong"> 20 mA</label>
          <label class="option"><input type="radio" name="eln4e1" value="wrong"> 5 mA</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln4e1','eln4fb1','Correct — IC=βIB=100×20µA=2000µA=2 mA.','Applique directement IC=β×IB.')">Vérifier</button>
        <div class="feedback" id="eln4fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un transistor NPN est en régime saturé. On peut affirmer que :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln4e2" value="wrong"> les deux jonctions BE et BC sont polarisées en inverse</label>
          <label class="option"><input type="radio" name="eln4e2" value="right"> les deux jonctions BE et BC sont polarisées en direct</label>
          <label class="option"><input type="radio" name="eln4e2" value="wrong"> seule la jonction BE est polarisée en direct</label>
          <label class="option"><input type="radio" name="eln4e2" value="wrong"> le transistor se comporte comme en régime actif</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln4e2','eln4fb2','Correct — en saturé, BE et BC sont TOUTES DEUX polarisées en direct, ce qui distingue ce régime du régime actif (BC en inverse).','Regarde le tableau des trois régimes : ce qui distingue saturé et actif, c\'est l\'état de la jonction BC.')">Vérifier</button>
        <div class="feedback" id="eln4fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">L'intérêt principal de la polarisation par pont diviseur avec résistance d'émetteur est de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln4e3" value="wrong"> maximiser le gain en tension</label>
          <label class="option"><input type="radio" name="eln4e3" value="right"> rendre IC peu sensible à la dispersion de β</label>
          <label class="option"><input type="radio" name="eln4e3" value="wrong"> supprimer le courant de base</label>
          <label class="option"><input type="radio" name="eln4e3" value="wrong"> augmenter la tension VCE au maximum</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln4e3','eln4fb3','Correct — grâce au pont \'raide\' et à RE, IC≈(VB−VBE)/RE dépend de grandeurs stables et presque plus de β, très variable d\'un transistor à l\'autre.','Relis la section 5 : quel est l\'avantage principal mis en avant pour ce montage de polarisation ?')">Vérifier</button>
        <div class="feedback" id="eln4fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Le transistor bipolaire : structure, régimes de fonctionnement et polarisation')] = {
  intro: "Salut, moi c'est Nova ! On est sur le transistor bipolaire : structure, régimes et polarisation. Demande-moi la différence entre régime actif et saturé, la formule IC=βIB, ou un indice sur un exercice.",
  rules: [
    { test:/effet transistor|structure.*npn|structure.*pnp/i, replies:["Le transistor est un empilement de 3 zones dopées (NPN ou PNP) avec une base très fine et faiblement dopée : c'est cette dissymétrie qui permet à la quasi-totalité des porteurs injectés par l'émetteur d'atteindre le collecteur, sans se recombiner dans la base."] },
    { test:/r[ée]gime bloqu[ée]/i, replies:["Régime bloqué : les deux jonctions (BE et BC) sont en inverse (ou VBE<Vγ). IB=IC=IE≈0 : le transistor se comporte comme un interrupteur ouvert."] },
    { test:/r[ée]gime actif|zone lin[ée]aire/i, replies:["Régime actif : jonction BE directe (VBE≈0,6-0,7V), jonction BC inverse. C'est la seule zone où IC=βIB — la zone utilisée en amplification."] },
    { test:/r[ée]gime satur[ée]|satur[ée]/i, replies:["Régime saturé : les DEUX jonctions (BE et BC) sont directes. VCE tombe à environ 0,2V (VCEsat), et IC n'est plus égal à βIB mais fixé par le circuit externe — le transistor se comporte comme un interrupteur fermé."] },
    { test:/pont diviseur|polarisation.*stable/i, replies:["La polarisation par pont diviseur (R1,R2) + résistance d'émetteur RE fixe VB, donc IE≈(VB−VBE)/RE : IC devient presque indépendant de β, donc stable malgré sa forte dispersion d'un transistor à l'autre."] },
    { test:/b[eê]ta|gain en courant|h_?fe/i, replies:["β (ou hFE) est le gain en courant statique, IC=βIB, typiquement entre 50 et 300 — une valeur peu reproductible, d'où l'intérêt d'une polarisation qui n'en dépend presque pas."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique IC=β×IB.","Indice niveau 2 : β=100, IB=20µA.","Indice niveau 3 : IC=2 mA."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : ce qui distingue saturé et actif, c'est l'état de la jonction BC.","Indice niveau 2 : en saturé, BC passe elle aussi en direct.","Indice niveau 3 : les deux jonctions sont directes."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis l'avantage mis en avant en section 5.","Indice niveau 2 : ça concerne la sensibilité de IC à β.","Indice niveau 3 : IC devient presque indépendant de β."] }
  ]
};

/* =========================== CHAPITRE 5 — Le transistor bipolaire en amplification : modèle petits signaux et montages fondamentaux =========================== */
ELN_CHAPTERS[elnKey('Le transistor bipolaire en amplification : modèle petits signaux et montages fondamentaux')] = {
  objectives: [
    "Justifier la linéarisation autour du point de repos et construire le schéma équivalent petits signaux",
    "Calculer le gain en tension, l'impédance d'entrée et l'impédance de sortie d'un montage émetteur commun",
    "Comparer les trois montages fondamentaux (émetteur commun, collecteur commun, base commune)",
    "Expliquer le rôle des condensateurs de liaison et de découplage"
  ],
  prereqs: ["Le transistor bipolaire : structure, régimes de fonctionnement et polarisation"],
  bodyHtml: `
    <p>Une fois le transistor polarisé en régime actif (chapitre précédent), on peut superposer un petit signal variable au point de repos : c'est le principe de l'amplification. Ce chapitre construit l'outil indispensable à son analyse — le <strong>schéma équivalent petits signaux</strong> — puis l'applique aux trois montages fondamentaux.</p>

    <h3>1. Point de repos et linéarisation</h3>
    <p>Le point de fonctionnement statique (calculé au chapitre 4) — dit <strong>point de repos</strong> ou <strong>point Q</strong> — fixe les valeurs continues $I_{C0}$, $V_{CE0}$, $V_{BE0}$. Si le signal alternatif superposé reste de faible amplitude, la caractéristique exponentielle de la jonction BE peut être <strong>linéarisée</strong> localement autour de ce point : c'est l'approximation « petits signaux », qui permet de traiter le transistor comme un composant linéaire pour l'étude du signal utile (tout en gardant le calcul non linéaire pour la polarisation).</p>

    <h3>2. Schéma équivalent petits signaux simplifié</h3>
    <p>Autour du point de repos, le comportement en petits signaux du transistor bipolaire se résume à deux grandeurs :</p>
    <div class="formula-box">$$g_m = \frac{I_{C0}}{V_T} \quad \text{(transconductance)} \qquad\qquad r_\pi = \frac{\beta}{g_m} = \frac{\beta V_T}{I_{C0}} \quad \text{(résistance d'entrée base-émetteur)}$$</div>
    <p>Le modèle simplifié se lit ainsi : entre base et émetteur, le transistor se comporte comme une résistance $r_\pi$ ; le courant de collecteur en petit signal vaut $i_c = g_m v_{be}$ (source de courant commandée par la tension base-émetteur). On y ajoute souvent $r_o$ (résistance de sortie collecteur-émetteur, très grande, souvent négligée en première approche).</p>
    <div class="key-point">
      <span class="eyebrow">Méthode d'analyse petits signaux</span>
      1) Calculer le point de repos (étude statique). 2) Éteindre les sources continues ($V_{CC}\to 0$, court-circuit) et remplacer les condensateurs de liaison/découplage par des courts-circuits (haute fréquence utile). 3) Remplacer le transistor par son schéma équivalent ($r_\pi$, $g_m v_{be}$). 4) Résoudre le circuit linéaire ainsi obtenu.
    </div>

    <h3>3. Montage émetteur commun</h3>
    <p>C'est le montage amplificateur le plus courant : signal appliqué sur la base, signal de sortie prélevé au collecteur, émetteur commun aux deux mailles (découplé par un condensateur pour le signal alternatif, malgré $R_E$ nécessaire à la polarisation statique).</p>
    <div class="formula-box">$$A_v = \frac{v_s}{v_e} = -g_m (R_C \parallel R_L) \qquad\qquad Z_{in} \approx R_1\parallel R_2\parallel r_\pi \qquad\qquad Z_{out} \approx R_C$$</div>
    <p>Le gain en tension est <strong>négatif</strong> : le signal de sortie est déphasé de 180° par rapport à l'entrée. C'est le montage offrant le meilleur gain en tension, mais avec une impédance d'entrée modérée.</p>

    <h3>4. Montage collecteur commun (émetteur suiveur)</h3>
    <p>Signal appliqué sur la base, signal de sortie prélevé sur l'émetteur (le collecteur, relié directement à $V_{CC}$, est « commun » pour le signal alternatif).</p>
    <div class="formula-box">$$A_v \approx \frac{g_m R_E}{1+g_m R_E} \approx 1^- \qquad\qquad Z_{in} \approx r_\pi + (\beta+1)R_E \ \text{(grande)} \qquad\qquad Z_{out} \approx \frac{r_\pi}{\beta+1} \ \text{(petite)}$$</div>
    <p>Le gain en tension est proche de 1, sans déphasage : ce montage n'amplifie donc pas la tension, mais adapte les impédances (forte impédance d'entrée, faible impédance de sortie) — d'où son usage fréquent comme étage tampon entre deux blocs de circuit.</p>

    <h3>5. Montage base commune</h3>
    <p>Signal appliqué sur l'émetteur, sortie sur le collecteur, base reliée à la masse pour le signal alternatif (découplée par un condensateur). Gain en tension élevé et non inversé, mais impédance d'entrée très faible ($\approx 1/g_m$) : ce montage est surtout utilisé en haute fréquence, où sa très bonne bande passante compense sa faible impédance d'entrée.</p>
    <table class="mini-table">
      <tr><th>Montage</th><th>Gain en tension</th><th>Impédance d'entrée</th><th>Impédance de sortie</th><th>Usage typique</th></tr>
      <tr><td>Émetteur commun</td><td>élevé, négatif (déphasage 180°)</td><td>moyenne</td><td>moyenne à élevée</td><td>amplification de tension</td></tr>
      <tr><td>Collecteur commun</td><td>≈1, positif</td><td>élevée</td><td>faible</td><td>adaptation d'impédance (tampon)</td></tr>
      <tr><td>Base commune</td><td>élevé, positif</td><td>très faible</td><td>élevée</td><td>haute fréquence, amplification de courant→tension</td></tr>
    </table>

    <h3>6. Condensateurs de liaison et de découplage</h3>
    <p>Les <strong>condensateurs de liaison</strong> (en série, à l'entrée et à la sortie) isolent la polarisation continue de l'étage tout en laissant passer le signal alternatif utile. Les <strong>condensateurs de découplage</strong> (en parallèle sur $R_E$ par exemple) court-circuitent une résistance nécessaire à la stabilité du point de repos, mais qui réduirait le gain en alternatif si elle restait active pour le signal.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Modèle petits signaux : $g_m=I_{C0}/V_T$, $r_\pi=\beta/g_m$ ; en analyse dynamique, sources continues éteintes, condensateurs remplacés par des courts-circuits</li>
        <li>Émetteur commun : fort gain en tension négatif $A_v=-g_m(R_C\parallel R_L)$, déphasage 180°</li>
        <li>Collecteur commun (suiveur) : $A_v\approx 1$, forte $Z_{in}$, faible $Z_{out}$ — utilisé comme adaptateur d'impédance</li>
        <li>Base commune : fort gain non inversé, très faible $Z_{in}$ — utilisé en haute fréquence</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Oublier le signe négatif du gain de l'émetteur commun (déphasage de 180°, souvent implicite dans les énoncés qui demandent juste |Av|)</li>
        <li>Confondre le calcul statique (point de repos, tensions/courants continus) et le calcul dynamique petits signaux (sources continues éteintes) : ce sont deux étapes séparées, jamais mélangées</li>
        <li>Oublier de découpler RE par un condensateur : sans découplage, RE reste active en alternatif et réduit fortement le gain de l'émetteur commun</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Le gain en tension d'un montage émetteur commun est généralement :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln5e1" value="right"> négatif (déphasage de 180°)</label>
          <label class="option"><input type="radio" name="eln5e1" value="wrong"> toujours égal à 1</label>
          <label class="option"><input type="radio" name="eln5e1" value="wrong"> positif et inférieur à 1</label>
          <label class="option"><input type="radio" name="eln5e1" value="wrong"> nul en régime linéaire</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln5e1','eln5fb1','Correct — Av=−gm(RC∥RL) : le signe moins traduit le déphasage de 180° entre entrée et sortie, caractéristique de l\'émetteur commun.','Regarde la formule du gain de l\'émetteur commun : quel est le signe devant gm ?')">Vérifier</button>
        <div class="feedback" id="eln5fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Le montage collecteur commun (émetteur suiveur) est surtout utilisé pour :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln5e2" value="wrong"> obtenir le gain en tension le plus élevé possible</label>
          <label class="option"><input type="radio" name="eln5e2" value="right"> adapter les impédances entre deux étages (forte Zin, faible Zout)</label>
          <label class="option"><input type="radio" name="eln5e2" value="wrong"> inverser la phase du signal</label>
          <label class="option"><input type="radio" name="eln5e2" value="wrong"> amplifier fortement en haute fréquence</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln5e2','eln5fb2','Correct — avec Av≈1, ce montage n\'amplifie pas la tension mais sert d\'adaptateur d\'impédance (tampon) entre deux blocs de circuit.','Le gain en tension de ce montage est proche de 1 : à quoi peut-il donc bien servir ?')">Vérifier</button>
        <div class="feedback" id="eln5fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Le rôle d'un condensateur de découplage placé en parallèle sur RE est de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln5e3" value="wrong"> isoler la polarisation continue de l'étage suivant</label>
          <label class="option"><input type="radio" name="eln5e3" value="right"> court-circuiter RE pour le signal alternatif, sans affecter la polarisation continue</label>
          <label class="option"><input type="radio" name="eln5e3" value="wrong"> bloquer complètement le signal alternatif</label>
          <label class="option"><input type="radio" name="eln5e3" value="wrong"> augmenter la valeur effective de RE</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln5e3','eln5fb3','Correct — RE reste nécessaire en continu pour stabiliser le point de repos, mais un condensateur en parallèle la court-circuite en alternatif pour ne pas pénaliser le gain.','Distingue le rôle de RE en continu (stabilité du point de repos) de son effet en alternatif (il réduirait le gain).')">Vérifier</button>
        <div class="feedback" id="eln5fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Le transistor bipolaire en amplification : modèle petits signaux et montages fondamentaux')] = {
  intro: "Salut, moi c'est Nova ! On est sur le transistor en amplification : modèle petits signaux et montages fondamentaux. Demande-moi la différence entre émetteur commun et collecteur commun, ou un indice sur un exercice.",
  rules: [
    { test:/petits signaux|lin[ée]arisation|point de repos/i, replies:["En petits signaux, on linéarise la caractéristique autour du point de repos (calculé en statique) : le transistor devient un composant linéaire caractérisé par gm (transconductance) et rπ (résistance d'entrée base-émetteur)."] },
    { test:/gm|transconductance/i, replies:["gm=IC0/VT : c'est la pente de la caractéristique IC(VBE) au point de repos. Plus IC0 est grand, plus gm est grand, plus le gain potentiel est élevé."] },
    { test:/[ée]metteur commun/i, replies:["Émetteur commun : signal entré sur la base, sorti au collecteur. Gain Av=−gm(RC∥RL), négatif (déphasage 180°) — c'est le montage au meilleur gain en tension."] },
    { test:/collecteur commun|suiveur/i, replies:["Collecteur commun (émetteur suiveur) : Av≈1, forte impédance d'entrée, faible impédance de sortie — utilisé comme adaptateur d'impédance entre deux étages, pas pour amplifier la tension."] },
    { test:/base commune/i, replies:["Base commune : signal entré sur l'émetteur, sorti au collecteur. Gain élevé et non inversé, mais très faible impédance d'entrée (≈1/gm) — utilisé surtout en haute fréquence."] },
    { test:/condensateur.*liaison|condensateur.*d[ée]couplage/i, replies:["Condensateur de liaison : isole la polarisation continue en laissant passer le signal alternatif (en série). Condensateur de découplage : court-circuite une résistance de polarisation (comme RE) pour le signal alternatif seulement (en parallèle)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde le signe devant gm dans la formule du gain.","Indice niveau 2 : c'est un signe moins.","Indice niveau 3 : le gain est négatif, déphasage 180°."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le gain de ce montage est proche de 1.","Indice niveau 2 : à quoi sert un montage qui n'amplifie pas la tension ?","Indice niveau 3 : à adapter les impédances (tampon)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : distingue le rôle continu et le rôle alternatif de RE.","Indice niveau 2 : RE reste utile en continu pour la stabilité.","Indice niveau 3 : le condensateur la court-circuite seulement en alternatif."] }
  ]
};

/* =========================== CHAPITRE 6 — Le transistor à effet de champ : JFET et MOSFET =========================== */
ELN_CHAPTERS[elnKey('Le transistor à effet de champ : JFET et MOSFET')] = {
  objectives: [
    "Décrire le principe de fonctionnement du JFET (canal N ou P, pincement du canal)",
    "Distinguer MOSFET à enrichissement et à déplétion, et leur structure à grille isolée",
    "Identifier les régimes bloqué, ohmique et saturé d'un transistor à effet de champ",
    "Comparer les transistors à effet de champ au transistor bipolaire"
  ],
  prereqs: ["Le transistor bipolaire en amplification : modèle petits signaux et montages fondamentaux"],
  bodyHtml: `
    <p>Contrairement au transistor bipolaire, commandé par un courant de base, le <strong>transistor à effet de champ</strong> (FET) est commandé par une <strong>tension</strong> appliquée sur une électrode de grille qui ne consomme (idéalement) aucun courant. Cette famille regroupe le JFET (jonction) et le MOSFET (grille isolée), aujourd'hui omniprésent dans les circuits intégrés numériques (technologie CMOS).</p>

    <h3>1. Le transistor à effet de champ à jonction (JFET)</h3>
    <p>Un JFET à canal N est constitué d'un barreau de silicium dopé N (le <strong>canal</strong>, reliant deux électrodes appelées <strong>drain</strong> D et <strong>source</strong> S) entouré d'une zone dopée P fortement dopée reliée à une troisième électrode, la <strong>grille</strong> G. La jonction grille-canal, polarisée en inverse ($V_{GS}<0$ pour un canal N), fait pénétrer une zone de charge d'espace dans le canal, qui en réduit la section conductrice effective : plus $|V_{GS}|$ augmente, plus le canal se resserre, jusqu'à un <strong>pincement</strong> complet qui bloque totalement le courant.</p>
    <div class="formula-box">$$I_D = I_{DSS}\left(1 - \frac{V_{GS}}{V_P}\right)^2 \qquad \text{(en régime saturé, loi de Shockley du FET)}$$</div>
    <p>où $I_{DSS}$ est le courant de drain maximal (à $V_{GS}=0$) et $V_P$ la tension de pincement (« pinch-off »), négative pour un canal N.</p>

    <h3>2. Le transistor MOS (MOSFET)</h3>
    <p>Dans un MOSFET, la grille est totalement isolée du canal par une fine couche d'oxyde (silice, $SiO_2$) : le courant de grille est donc quasiment nul en régime statique (impédance d'entrée extrêmement élevée), et la grille commande le canal par simple effet de champ électrostatique à travers l'oxyde, sans jonction PN directement en jeu sur la commande.</p>
    <table class="mini-table">
      <tr><th>Type</th><th>Principe</th><th>État sans tension de grille</th></tr>
      <tr><td>MOSFET à enrichissement</td><td>le canal n'existe pas au repos ; une tension de grille $V_{GS}$ suffisante (au-delà d'un seuil $V_{TH}$) l'induit par accumulation de porteurs sous l'oxyde</td><td>bloqué (normalement ouvert)</td></tr>
      <tr><td>MOSFET à déplétion</td><td>le canal existe physiquement dès la fabrication ; la tension de grille l'élargit ou le rétrécit</td><td>passant (normalement fermé)</td></tr>
    </table>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 70" width="100%">
          <rect x="20" y="30" width="120" height="18" fill="rgba(76,124,255,0.18)" stroke="#4C7CFF" stroke-width="1.2"/>
          <rect x="20" y="20" width="120" height="8" fill="rgba(232,169,58,0.35)" stroke="#E8A93A" stroke-width="1"/>
          <line x1="80" y1="8" x2="80" y2="20" stroke="#2DD4C4" stroke-width="1.6"/>
          <text x="70" y="8" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">G</text>
          <text x="10" y="45" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">S</text>
          <text x="148" y="45" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">D</text>
          <text x="60" y="63" font-family="IBM Plex Mono" font-size="7" fill="#F0555C">oxyde isolant sous la grille</text>
        </svg>
        <span>MOSFET : la grille (G) commande le canal par effet de champ à travers une fine couche d'oxyde isolant, sans contact électrique direct</span>
      </div>
    </div>

    <h3>3. Les trois régimes de fonctionnement</h3>
    <table class="mini-table">
      <tr><th>Régime</th><th>Condition</th><th>Comportement</th></tr>
      <tr><td>Bloqué</td><td>$V_{GS}$ au-delà du pincement (JFET) ou $V_{GS}<V_{TH}$ (MOSFET enrichissement)</td><td>$I_D\approx 0$</td></tr>
      <tr><td>Ohmique (linéaire, ou triode)</td><td>$V_{DS}$ faible</td><td>$I_D$ quasi proportionnel à $V_{DS}$ : le FET se comporte comme une résistance commandée par $V_{GS}$</td></tr>
      <tr><td>Saturé (pincement)</td><td>$V_{DS}$ suffisamment grand</td><td>$I_D$ quasi indépendant de $V_{DS}$, fixé par $V_{GS}$ — zone d'amplification, analogue au régime actif du BJT</td></tr>
    </table>

    <h3>4. Comparaison avec le transistor bipolaire</h3>
    <table class="mini-table">
      <tr><th>Critère</th><th>Transistor bipolaire (BJT)</th><th>Transistor à effet de champ (FET)</th></tr>
      <tr><td>Grandeur de commande</td><td>courant de base $I_B$</td><td>tension de grille $V_{GS}$</td></tr>
      <tr><td>Impédance d'entrée</td><td>modérée ($r_\pi$)</td><td>très élevée (quasi infinie pour un MOSFET)</td></tr>
      <tr><td>Bruit / consommation statique</td><td>consomme un courant de base</td><td>consommation statique quasi nulle sur la grille</td></tr>
      <tr><td>Usage privilégié</td><td>amplification analogique, forte transconductance</td><td>commutation numérique (CMOS), amplification faible bruit, forte impédance d'entrée</td></tr>
    </table>
    <p>Cette impédance d'entrée quasi infinie et cette faible consommation statique expliquent pourquoi le MOSFET est devenu le composant de base de la quasi-totalité des circuits numériques intégrés (technologie CMOS, associant un MOSFET canal N et un MOSFET canal P complémentaires).</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>JFET : jonction grille-canal en inverse, le canal se resserre quand $|V_{GS}|$ augmente jusqu'au pincement complet</li>
        <li>MOSFET : grille isolée par une couche d'oxyde, courant de grille quasi nul, impédance d'entrée très élevée</li>
        <li>MOSFET enrichissement : canal induit par $V_{GS}>V_{TH}$ (normalement bloqué) ; MOSFET déplétion : canal existant, modulé par $V_{GS}$ (normalement passant)</li>
        <li>Trois régimes : bloqué, ohmique ($I_D\propto V_{DS}$), saturé ($I_D$ fixé par $V_{GS}$, zone d'amplification)</li>
        <li>FET vs BJT : commande en tension (pas en courant), impédance d'entrée bien plus élevée, base du CMOS numérique</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre le régime « ohmique » (ou triode) du FET, où $I_D$ dépend de $V_{DS}$, avec le régime saturé, où $I_D$ en est quasi indépendant — c'est l'inverse de l'intuition venant du BJT</li>
        <li>Croire qu'un MOSFET à enrichissement conduit spontanément sans tension de grille : il est au contraire bloqué au repos</li>
        <li>Oublier que la grille d'un MOSFET est isolée : contrairement à la base du BJT, elle ne « consomme » quasiment aucun courant en statique</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Ce qui commande le courant dans un transistor à effet de champ est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln6e1" value="wrong"> un courant de grille</label>
          <label class="option"><input type="radio" name="eln6e1" value="right"> une tension de grille</label>
          <label class="option"><input type="radio" name="eln6e1" value="wrong"> la température ambiante uniquement</label>
          <label class="option"><input type="radio" name="eln6e1" value="wrong"> le courant de drain lui-même</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln6e1','eln6fb1','Correct — contrairement au BJT (commandé en courant de base), le FET est commandé en TENSION de grille, avec un courant de grille quasi nul.','C\'est la différence fondamentale entre BJT et FET : quelle grandeur commande le courant principal ?')">Vérifier</button>
        <div class="feedback" id="eln6fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un MOSFET à enrichissement, sans tension de grille appliquée (VGS=0), est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln6e2" value="right"> bloqué (aucun canal conducteur)</label>
          <label class="option"><input type="radio" name="eln6e2" value="wrong"> parfaitement conducteur (canal maximal)</label>
          <label class="option"><input type="radio" name="eln6e2" value="wrong"> en régime saturé</label>
          <label class="option"><input type="radio" name="eln6e2" value="wrong"> détruit par surtension</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln6e2','eln6fb2','Correct — le canal d\'un MOSFET à enrichissement n\'existe pas au repos : il faut VGS>VTH pour l\'induire. C\'est un composant \'normalement ouvert\'.','Relis la définition du MOSFET à enrichissement : le canal existe-t-il avant application d\'une tension de grille suffisante ?')">Vérifier</button>
        <div class="feedback" id="eln6fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">En régime saturé (zone d'amplification) d'un FET, le courant de drain ID est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln6e3" value="wrong"> proportionnel à VDS</label>
          <label class="option"><input type="radio" name="eln6e3" value="wrong"> nul</label>
          <label class="option"><input type="radio" name="eln6e3" value="right"> quasi indépendant de VDS, fixé essentiellement par VGS</label>
          <label class="option"><input type="radio" name="eln6e3" value="wrong"> égal à IDSS quelle que soit VGS</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln6e3','eln6fb3','Correct — c\'est l\'analogue du plateau des caractéristiques du BJT en régime actif : en saturé, ID dépend de VGS mais très peu de VDS.','Compare avec le régime ohmique : dans quel régime ID cesse-t-il de dépendre fortement de VDS ?')">Vérifier</button>
        <div class="feedback" id="eln6fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Le transistor à effet de champ : JFET et MOSFET')] = {
  intro: "Salut, moi c'est Nova ! On est sur les transistors à effet de champ : JFET et MOSFET. Demande-moi la différence avec le transistor bipolaire, enrichissement vs déplétion, ou un indice sur un exercice.",
  rules: [
    { test:/jfet/i, replies:["Le JFET est commandé par une jonction grille-canal polarisée en inverse : plus |VGS| augmente, plus le canal se resserre, jusqu'au pincement complet qui bloque le courant."] },
    { test:/mosfet/i, replies:["Le MOSFET a une grille isolée du canal par une couche d'oxyde : le courant de grille est quasi nul, l'impédance d'entrée est très élevée. C'est le composant de base du numérique CMOS."] },
    { test:/enrichissement/i, replies:["Un MOSFET à enrichissement n'a pas de canal au repos (VGS=0) : il faut VGS>VTH pour l'induire. Il est normalement bloqué."] },
    { test:/d[ée]pl[ée]tion/i, replies:["Un MOSFET à déplétion a un canal existant dès la fabrication : la tension de grille le module (l'élargit ou le rétrécit), il est normalement passant."] },
    { test:/r[ée]gime ohmique|triode/i, replies:["En régime ohmique (triode), pour VDS faible, ID est quasi proportionnel à VDS : le FET se comporte comme une résistance commandée par VGS."] },
    { test:/r[ée]gime satur[ée].*fet|pincement/i, replies:["En régime saturé (au-delà du pincement), ID devient quasi indépendant de VDS et fixé par VGS — c'est la zone d'amplification, analogue au régime actif du BJT."] },
    { test:/fet.*bjt|bjt.*fet|comparaison/i, replies:["FET vs BJT : le FET est commandé en tension (pas en courant), a une impédance d'entrée bien plus élevée, et consomme quasiment aucun courant statique sur sa grille — d'où son usage dominant en numérique (CMOS)."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : c'est la différence fondamentale avec le BJT.","Indice niveau 2 : le BJT est commandé en courant, le FET en...","Indice niveau 3 : tension de grille."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : le canal existe-t-il au repos dans ce type de MOSFET ?","Indice niveau 2 : non, il faut une tension de grille suffisante.","Indice niveau 3 : le MOSFET à enrichissement est bloqué à VGS=0."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : compare avec le régime ohmique.","Indice niveau 2 : en saturé, ID cesse de dépendre fortement de VDS.","Indice niveau 3 : ID est quasi indépendant de VDS, fixé par VGS."] }
  ]
};

/* =========================== CHAPITRE 7 — L'amplificateur opérationnel : modèle idéal et montages linéaires fondamentaux =========================== */
ELN_CHAPTERS[elnKey('L\'amplificateur opérationnel : modèle idéal et montages linéaires fondamentaux')] = {
  objectives: [
    "Connaître les hypothèses du modèle idéal de l'amplificateur opérationnel (AOP)",
    "Appliquer la règle du court-circuit virtuel en régime de contre-réaction négative",
    "Analyser les montages inverseur, non-inverseur et suiveur, et calculer leur gain",
    "Analyser les montages sommateur inverseur et soustracteur (amplificateur différentiel)"
  ],
  prereqs: ["Le transistor à effet de champ : JFET et MOSFET"],
  bodyHtml: `
    <p>L'amplificateur opérationnel (AOP, ou « ampli-op ») est un circuit intégré combinant de nombreux transistors (souvent des étages à base de BJT et de FET, vus dans les chapitres précédents), pour former un amplificateur différentiel de très fort gain. Associé à quelques résistances en contre-réaction, il permet de réaliser une immense variété de fonctions linéaires — et, comme on le verra au chapitre suivant, non linéaires — avec une précision qui ne dépend presque plus des caractéristiques internes, imprécises, du composant.</p>

    <h3>1. Modèle idéal de l'AOP</h3>
    <table class="mini-table">
      <tr><th>Grandeur</th><th>Valeur idéale</th><th>Valeur réelle typique</th></tr>
      <tr><td>Gain différentiel en boucle ouverte $A_0$</td><td>infini</td><td>$10^5$ à $10^6$</td></tr>
      <tr><td>Impédance d'entrée</td><td>infinie</td><td>$10^6$ à $10^{12}$ Ω (bien plus pour un AOP à entrées MOSFET)</td></tr>
      <tr><td>Impédance de sortie</td><td>nulle</td><td>quelques dizaines d'ohms</td></tr>
      <tr><td>Bande passante</td><td>infinie</td><td>limitée (produit gain-bande constant)</td></tr>
      <tr><td>Courants d'entrée $i_+,i_-$</td><td>nuls</td><td>quelques pA à quelques centaines de nA</td></tr>
    </table>
    <p>L'AOP amplifie la différence entre ses deux entrées : $v_s = A_0(v_+ - v_-)$. Comme $A_0$ est immense, la sortie sature (bute sur les tensions d'alimentation) dès que $v_+-v_-$ dépasse quelques microvolts — <strong>sauf</strong> si le montage comporte une <strong>contre-réaction négative</strong> (une partie de la sortie renvoyée sur l'entrée $-$), qui force l'AOP à s'auto-réguler pour maintenir $v_+\approx v_-$.</p>

    <h3>2. La règle d'or (régime linéaire, avec contre-réaction négative)</h3>
    <div class="key-point">
      <span class="eyebrow">Règle du court-circuit virtuel</span>
      Pour un AOP idéal en contre-réaction négative, fonctionnant en régime linéaire (non saturé) : (1) $i_+=i_-=0$ (aucun courant n'entre dans les entrées) ; (2) $v_+=v_-$ (les deux entrées sont au même potentiel, dit « virtuel » puisqu'elles ne sont pas physiquement reliées).
    </div>
    <p>Cette règle simplissime permet de résoudre presque tous les montages fondamentaux sans jamais manipuler $A_0$ explicitement.</p>

    <h3>3. Montage inverseur</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 160 90" width="100%">
          <path d="M60,20 L60,60 L110,40 Z" fill="none" stroke="#4C7CFF" stroke-width="1.4"/>
          <text x="63" y="32" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">−</text>
          <text x="63" y="55" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">+</text>
          <line x1="15" y1="28" x2="45" y2="28" stroke="#EAF0FB" stroke-width="1.2"/>
          <text x="18" y="24" font-family="IBM Plex Mono" font-size="7" fill="#E8A93A">R1</text>
          <line x1="45" y1="28" x2="60" y2="28" stroke="#EAF0FB" stroke-width="1.2"/>
          <path d="M45,15 L75,15" stroke="#2DD4C4" stroke-width="1.2"/>
          <line x1="45" y1="15" x2="45" y2="28" stroke="#2DD4C4" stroke-width="1.2"/>
          <text x="50" y="12" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">R2 (contre-réaction)</text>
          <line x1="75" y1="15" x2="110" y2="15" stroke="#2DD4C4" stroke-width="1.2"/>
          <line x1="110" y1="15" x2="110" y2="40" stroke="#2DD4C4" stroke-width="1.2"/>
          <line x1="60" y1="55" x2="20" y2="55" stroke="#EAF0FB" stroke-width="1"/>
          <line x1="110" y1="40" x2="140" y2="40" stroke="#EAF0FB" stroke-width="1.2"/>
        </svg>
        <span>Montage inverseur : entrée sur R1 (vers l'entrée −), R2 en contre-réaction, entrée + à la masse</span>
      </div>
    </div>
    <p>L'entrée $+$ est reliée à la masse : $v_+=0$, donc par la règle d'or $v_-=0$ (« masse virtuelle »). Comme $i_-=0$, tout le courant venant de $v_e$ à travers $R_1$ traverse aussi $R_2$ : $\dfrac{v_e-0}{R_1}=\dfrac{0-v_s}{R_2}$, d'où :</p>
    <div class="formula-box">$$A_v = \frac{v_s}{v_e} = -\frac{R_2}{R_1} \qquad\qquad Z_{in} = R_1$$</div>

    <h3>4. Montage non-inverseur</h3>
    <p>L'entrée $+$ reçoit directement $v_e$ ; $R_1$ et $R_2$ forment un pont diviseur entre la sortie et la masse, dont le point milieu attaque l'entrée $-$. La règle d'or ($v_-=v_+=v_e$) donne directement :</p>
    <div class="formula-box">$$A_v = \frac{v_s}{v_e} = 1 + \frac{R_2}{R_1} \qquad\qquad Z_{in} \to \infty \ \text{(idéalement)}$$</div>
    <p>Le gain est toujours supérieur ou égal à 1, et non inversé. L'impédance d'entrée est celle, très élevée, de l'AOP lui-même (l'entrée $+$ n'est chargée par aucune résistance côté source).</p>

    <h3>5. Montage suiveur (buffer)</h3>
    <p>Cas particulier du non-inverseur avec $R_2=0$ (sortie directement reliée à l'entrée $-$) : $A_v=1$. Comme le collecteur commun du chapitre 5, il sert d'adaptateur d'impédance quasi parfait (impédance d'entrée quasi infinie, de sortie quasi nulle), sans les limitations en gain du montage à transistor seul.</p>

    <h3>6. Montage sommateur inverseur</h3>
    <p>Plusieurs résistances d'entrée $R_1,R_2,\dots$ convergent vers l'entrée $-$ (masse virtuelle), avec une résistance de contre-réaction $R_f$ commune :</p>
    <div class="formula-box">$$v_s = -R_f\left(\frac{v_1}{R_1}+\frac{v_2}{R_2}+\dots\right)$$</div>

    <h3>7. Montage soustracteur (amplificateur différentiel)</h3>
    <p>En combinant une entrée inverseuse et une entrée non-inverseuse (avec des résistances appariées $R_1=R_3$ et $R_2=R_4$), on obtient un montage qui amplifie la seule différence des deux tensions d'entrée :</p>
    <div class="formula-box">$$v_s = \frac{R_2}{R_1}(v_2 - v_1)$$</div>
    <p>Ce montage est à la base de l'amplificateur d'instrumentation, essentiel pour amplifier de faibles signaux différentiels (capteurs) en rejetant le bruit commun aux deux entrées.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Règle d'or (contre-réaction négative, régime linéaire) : $i_+=i_-=0$ et $v_+=v_-$</li>
        <li>Inverseur : $A_v=-R_2/R_1$, $Z_{in}=R_1$. Non-inverseur : $A_v=1+R_2/R_1$, $Z_{in}$ très élevée. Suiveur : $A_v=1$</li>
        <li>Sommateur inverseur : $v_s=-R_f\sum(v_i/R_i)$. Soustracteur : $v_s=(R_2/R_1)(v_2-v_1)$</li>
        <li>Sans contre-réaction négative, l'AOP sature quasi instantanément dès que $v_+\neq v_-$ (gain en boucle ouverte immense)</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la règle du court-circuit virtuel à un montage sans contre-réaction négative (par exemple un comparateur) : elle n'est valable qu'en régime linéaire</li>
        <li>Oublier le signe négatif du gain inverseur, ou au contraire l'ajouter par erreur au gain non-inverseur (qui est positif et toujours ≥1)</li>
        <li>Confondre masse virtuelle (potentiel nul par la règle d'or, mais aucun courant n'y circule directement vers la masse réelle) et masse réelle</li>
      </ul>
    </div>

    <div class="sim-box">
      <span class="eyebrow">🔬 Calculateur — gains inverseur / non-inverseur</span>
      <p style="color:var(--ink-soft); font-size:0.9rem; margin:4px 0 0;">Entre R1 et R2 : le calculateur donne simultanément le gain du montage inverseur et celui du montage non-inverseur.</p>
      <div class="sim-controls">
        <label>R₁ (Ω) : <input type="number" id="elnAopR1" value="1000" style="width:70px;" oninput="updateElnAopGain()"></label>
        <label>R₂ (Ω) : <input type="number" id="elnAopR2" value="10000" style="width:70px;" oninput="updateElnAopGain()"></label>
        <div class="sim-readout" id="elnAopReadout" style="margin-top:8px;"></div>
      </div>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un montage inverseur a R1=2 kΩ et R2=20 kΩ. Son gain en tension vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln7e1" value="wrong"> 10</label>
          <label class="option"><input type="radio" name="eln7e1" value="right"> −10</label>
          <label class="option"><input type="radio" name="eln7e1" value="wrong"> 0,1</label>
          <label class="option"><input type="radio" name="eln7e1" value="wrong"> 11</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln7e1','eln7fb1','Correct — Av=−R2/R1=−20000/2000=−10.','Applique Av=−R2/R1, sans oublier le signe.')">Vérifier</button>
        <div class="feedback" id="eln7fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans un montage non-inverseur avec R1=1 kΩ et R2=9 kΩ, le gain en tension vaut :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln7e2" value="wrong"> 9</label>
          <label class="option"><input type="radio" name="eln7e2" value="wrong"> −9</label>
          <label class="option"><input type="radio" name="eln7e2" value="right"> 10</label>
          <label class="option"><input type="radio" name="eln7e2" value="wrong"> −10</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln7e2','eln7fb2','Correct — Av=1+R2/R1=1+9000/1000=1+9=10.','Applique Av=1+R2/R1 : n\'oublie pas le \'1+\' caractéristique du non-inverseur.')">Vérifier</button>
        <div class="feedback" id="eln7fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">La règle du court-circuit virtuel (v+=v−, i+=i−=0) s'applique :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln7e3" value="wrong"> à tout montage utilisant un AOP, sans condition</label>
          <label class="option"><input type="radio" name="eln7e3" value="right"> uniquement en régime linéaire, avec contre-réaction négative</label>
          <label class="option"><input type="radio" name="eln7e3" value="wrong"> uniquement quand la sortie est saturée</label>
          <label class="option"><input type="radio" name="eln7e3" value="wrong"> uniquement pour le montage suiveur</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln7e3','eln7fb3','Correct — sans contre-réaction négative (par exemple en comparateur), l\'AOP fonctionne en régime saturé et la règle du court-circuit virtuel ne s\'applique plus.','Repense à la condition posée juste avant l\'énoncé de la règle d\'or.')">Vérifier</button>
        <div class="feedback" id="eln7fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('L\'amplificateur opérationnel : modèle idéal et montages linéaires fondamentaux')] = {
  intro: "Salut, moi c'est Nova ! On est sur l'amplificateur opérationnel : modèle idéal et montages fondamentaux. Demande-moi la règle du court-circuit virtuel, le gain d'un inverseur, ou un indice sur un exercice.",
  rules: [
    { test:/mod[eè]le id[ée]al|caract[ée]ristiques.*aop/i, replies:["AOP idéal : gain en boucle ouverte infini, impédance d'entrée infinie, impédance de sortie nulle, courants d'entrée nuls."] },
    { test:/court.circuit virtuel|r[eè]gle d.or/i, replies:["La règle d'or (AOP idéal, contre-réaction négative, régime linéaire) : i+=i−=0 et v+=v−. C'est l'outil qui permet de résoudre presque tous les montages fondamentaux."] },
    { test:/inverseur/i, replies:["Montage inverseur : Av=−R2/R1, Zin=R1. L'entrée + est à la masse, donc l'entrée − est une masse virtuelle."] },
    { test:/non.inverseur/i, replies:["Montage non-inverseur : Av=1+R2/R1 (toujours ≥1, positif), Zin très élevée. L'entrée + reçoit directement ve."] },
    { test:/suiveur|buffer/i, replies:["Le montage suiveur (Av=1, R2=0) sert d'adaptateur d'impédance quasi parfait : forte impédance d'entrée, quasi nulle en sortie."] },
    { test:/sommateur/i, replies:["Le sommateur inverseur : vs=−Rf·Σ(vi/Ri) — chaque entrée est pondérée par sa propre résistance d'entrée."] },
    { test:/soustracteur|diff[ée]rentiel/i, replies:["Le soustracteur (amplificateur différentiel) : vs=(R2/R1)(v2−v1), avec résistances appariées. Base de l'amplificateur d'instrumentation."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique Av=−R2/R1.","Indice niveau 2 : R1=2kΩ, R2=20kΩ.","Indice niveau 3 : Av=−10."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : applique Av=1+R2/R1.","Indice niveau 2 : n'oublie pas le +1.","Indice niveau 3 : Av=10."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : repense à la condition posée avant la règle d'or.","Indice niveau 2 : elle nécessite un régime particulier de fonctionnement.","Indice niveau 3 : régime linéaire, avec contre-réaction négative."] }
  ]
};

/* =========================== CHAPITRE 8 — Montages non linéaires, filtres actifs et introduction à l'électronique numérique =========================== */
ELN_CHAPTERS[elnKey('Montages non linéaires, filtres actifs et introduction à l\'électronique numérique')] = {
  objectives: [
    "Analyser le fonctionnement du comparateur, de l'intégrateur et du dérivateur à AOP",
    "Concevoir un filtre actif passe-bas du premier ordre à AOP",
    "Connaître les portes logiques de base et leur table de vérité",
    "Appliquer les lois de base de l'algèbre de Boole, y compris les lois de De Morgan"
  ],
  prereqs: ["L'amplificateur opérationnel : modèle idéal et montages linéaires fondamentaux"],
  bodyHtml: `
    <p>Ce dernier chapitre du module ouvre deux directions complémentaires : d'une part les montages à AOP qui exploitent volontairement une saturation (comparateur) ou des éléments réactifs (intégrateur, dérivateur, filtre actif), d'autre part une première incursion dans l'<strong>électronique numérique</strong>, où l'information n'est plus une tension continue mais un état logique binaire.</p>

    <h3>1. Le comparateur</h3>
    <p>Un AOP utilisé <strong>sans</strong> contre-réaction négative (boucle ouverte, ou contre-réaction positive) ne respecte plus la règle du court-circuit virtuel : le gain en boucle ouverte étant immense, la sortie bascule quasi instantanément à sa valeur de saturation positive ou négative selon le signe de $v_+-v_-$.</p>
    <div class="formula-box">$$v_s = \begin{cases} +V_{sat} & \text{si } v_+ > v_- \\ -V_{sat} & \text{si } v_+ < v_- \end{cases}$$</div>
    <p>C'est le principe de base de tout circuit qui doit détecter un franchissement de seuil (alarme, mise en forme de signal, conversion analogique-numérique élémentaire).</p>

    <h3>2. L'intégrateur et le dérivateur à AOP</h3>
    <p>En remplaçant la résistance de contre-réaction du montage inverseur par un condensateur (intégrateur) ou en remplaçant la résistance d'entrée par un condensateur (dérivateur), et en réappliquant la règle d'or (masse virtuelle), on obtient :</p>
    <div class="formula-box">$$v_s(t) = -\frac{1}{RC}\int_0^t v_e(\tau)\,d\tau \quad \text{(intégrateur)} \qquad\qquad v_s(t) = -RC\,\frac{dv_e}{dt} \quad \text{(dérivateur)}$$</div>
    <p>L'intégrateur, très utilisé (générateurs de rampe, filtres), est cependant sensible à la dérive lente de la tension de sortie (offset intégré au cours du temps) ; le dérivateur amplifie fortement le bruit haute fréquence et est rarement utilisé seul en pratique sans limitation de bande passante.</p>

    <h3>3. Filtre actif passe-bas du premier ordre</h3>
    <p>En associant une résistance $R_1$ en entrée et une cellule $R_2\parallel C$ en contre-réaction d'un montage inverseur, on obtient un filtre actif passe-bas : aux basses fréquences, le condensateur se comporte comme un circuit ouvert (gain $-R_2/R_1$, comme un inverseur classique) ; aux hautes fréquences, son impédance chute et court-circuite progressivement $R_2$, réduisant le gain.</p>
    <div class="formula-box">$$A_v(j\omega) = -\frac{R_2}{R_1}\cdot\frac{1}{1+j\omega R_2 C} \qquad\qquad f_c = \frac{1}{2\pi R_2 C} \quad \text{(fréquence de coupure à −3 dB)}$$</div>
    <p>Contrairement à un filtre passif RC, le filtre actif conserve un gain réglable en basse fréquence ($-R_2/R_1$) tout en présentant une faible impédance de sortie (celle de l'AOP), ce qui évite qu'un étage suivant ne vienne perturber la réponse en fréquence.</p>

    <h3>4. Introduction à l'électronique numérique : signaux logiques</h3>
    <p>En électronique numérique, une tension n'est plus interprétée par sa valeur exacte mais par son appartenance à l'un de deux états logiques : « 0 » (niveau bas) ou « 1 » (niveau haut). Les <strong>portes logiques</strong> réalisent les opérations de l'algèbre de Boole sur ces états.</p>
    <table class="mini-table">
      <tr><th>Porte</th><th>Opération</th><th>Table de vérité (a, b → s)</th></tr>
      <tr><td>NON (NOT)</td><td>$s=\bar{a}$</td><td>0→1 ; 1→0</td></tr>
      <tr><td>ET (AND)</td><td>$s=a\cdot b$</td><td>s=1 seulement si a=1 ET b=1</td></tr>
      <tr><td>OU (OR)</td><td>$s=a+b$</td><td>s=1 si a=1 OU b=1 (ou les deux)</td></tr>
      <tr><td>NON-ET (NAND)</td><td>$s=\overline{a\cdot b}$</td><td>s=0 seulement si a=1 ET b=1</td></tr>
      <tr><td>NON-OU (NOR)</td><td>$s=\overline{a+b}$</td><td>s=1 seulement si a=0 ET b=0</td></tr>
      <tr><td>OU-EXCLUSIF (XOR)</td><td>$s=a\oplus b$</td><td>s=1 si a et b sont différents</td></tr>
    </table>

    <h3>5. Éléments d'algèbre de Boole</h3>
    <p>L'algèbre de Boole permet de simplifier une expression logique avant sa réalisation matérielle, exactement comme on simplifie une expression algébrique. Les <strong>lois de De Morgan</strong> sont particulièrement utiles pour transformer une fonction en n'utilisant qu'un seul type de porte (NAND ou NOR seulement, technologiquement pratique) :</p>
    <div class="formula-box">$$\overline{a\cdot b} = \bar{a} + \bar{b} \qquad\qquad \overline{a+b} = \bar{a}\cdot\bar{b}$$</div>
    <div class="key-point">
      <span class="eyebrow">Idée clé</span>
      Les portes NAND et NOR sont dites « universelles » : n'importe quelle fonction logique, aussi complexe soit-elle, peut être réalisée en n'utilisant que des portes NAND (ou que des portes NOR) — un résultat direct des lois de De Morgan, très exploité en conception de circuits intégrés.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Comparateur : AOP sans contre-réaction négative, sortie saturée à $\pm V_{sat}$ selon le signe de $v_+-v_-$</li>
        <li>Intégrateur : $v_s=-\frac{1}{RC}\int v_e\,dt$ (R et C échangés par rapport à l'inverseur : C en contre-réaction). Dérivateur : $v_s=-RC\,dv_e/dt$ (C en entrée)</li>
        <li>Filtre actif passe-bas : $A_v=-\frac{R_2}{R_1}\cdot\frac{1}{1+j\omega R_2C}$, fréquence de coupure $f_c=1/(2\pi R_2C)$</li>
        <li>Portes logiques de base : NOT, AND, OR, NAND, NOR, XOR — lois de De Morgan : $\overline{ab}=\bar a+\bar b$ et $\overline{a+b}=\bar a\bar b$. NAND et NOR sont des portes universelles</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Appliquer la règle du court-circuit virtuel à un comparateur : sans contre-réaction négative, l'AOP est saturé, pas en régime linéaire</li>
        <li>Confondre AND et OR dans une table de vérité : AND exige que TOUTES les entrées soient à 1, OR se contente qu'UNE SEULE le soit</li>
        <li>Se tromper dans les lois de De Morgan : la barre globale se distribue sur chaque terme ET l'opérateur change (ET devient OU, et réciproquement)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un AOP utilisé en comparateur (sans contre-réaction négative), avec v+ &lt; v−, a une sortie qui :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln8e1" value="wrong"> vaut v+−v− exactement</label>
          <label class="option"><input type="radio" name="eln8e1" value="right"> sature à −Vsat</label>
          <label class="option"><input type="radio" name="eln8e1" value="wrong"> sature à +Vsat</label>
          <label class="option"><input type="radio" name="eln8e1" value="wrong"> reste nulle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln8e1','eln8fb1','Correct — puisque v+&lt;v−, le gain immense en boucle ouverte fait basculer la sortie vers sa saturation NÉGATIVE.','Regarde la formule du comparateur : quel cas correspond à v+&lt;v− ?')">Vérifier</button>
        <div class="feedback" id="eln8fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Pour une porte NAND à deux entrées, la sortie vaut 0 uniquement quand :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln8e2" value="wrong"> a=0 et b=0</label>
          <label class="option"><input type="radio" name="eln8e2" value="wrong"> a=1 ou b=1</label>
          <label class="option"><input type="radio" name="eln8e2" value="right"> a=1 et b=1</label>
          <label class="option"><input type="radio" name="eln8e2" value="wrong"> a≠b</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln8e2','eln8fb2','Correct — NAND est la négation de AND : sa sortie est 0 exactement quand AND vaudrait 1, c\'est-à-dire quand a=1 ET b=1.','NAND = NON(AND). Dans quel cas AND vaut-il 1 ?')">Vérifier</button>
        <div class="feedback" id="eln8fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">D'après les lois de De Morgan, $\overline{a+b}$ est égal à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln8e3" value="wrong"> $\bar{a}+\bar{b}$</label>
          <label class="option"><input type="radio" name="eln8e3" value="right"> $\bar{a}\cdot\bar{b}$</label>
          <label class="option"><input type="radio" name="eln8e3" value="wrong"> $a\cdot b$</label>
          <label class="option"><input type="radio" name="eln8e3" value="wrong"> $a+b$</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln8e3','eln8fb3','Correct — la barre se distribue et l\'opérateur change : NON(a OU b) = NON(a) ET NON(b).','Applique la loi de De Morgan : la barre globale se distribue sur chaque terme, et OU devient ET.')">Vérifier</button>
        <div class="feedback" id="eln8fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Montages non linéaires, filtres actifs et introduction à l\'électronique numérique')] = {
  intro: "Salut, moi c'est Nova, dernier chapitre du module Électronique ! On voit le comparateur, l'intégrateur/dérivateur, le filtre actif, et une intro au numérique. Demande-moi les lois de De Morgan, la table de vérité d'une porte, ou un indice sur un exercice.",
  rules: [
    { test:/comparateur/i, replies:["Le comparateur est un AOP SANS contre-réaction négative : la sortie sature à +Vsat si v+>v−, à −Vsat si v+<v−. La règle du court-circuit virtuel ne s'applique pas ici."] },
    { test:/int[ée]grateur/i, replies:["L'intégrateur à AOP (condensateur en contre-réaction) : vs(t)=−(1/RC)∫ve dt. Utilisé pour générer des rampes, mais sensible à la dérive lente de sortie."] },
    { test:/d[ée]rivateur/i, replies:["Le dérivateur à AOP (condensateur en entrée) : vs(t)=−RC·dve/dt. Amplifie fortement le bruit haute fréquence, rarement utilisé seul en pratique."] },
    { test:/filtre actif|passe.bas/i, replies:["Filtre actif passe-bas du 1er ordre à AOP : Av=−(R2/R1)/(1+jωR2C), fréquence de coupure fc=1/(2πR2C). Conserve un gain réglable, contrairement à un simple filtre RC passif."] },
    { test:/porte.*(and|et)\b/i, replies:["La porte AND (ET) : sortie=1 seulement si TOUTES les entrées sont à 1."] },
    { test:/porte.*(or|ou)\b/i, replies:["La porte OR (OU) : sortie=1 si AU MOINS UNE entrée est à 1."] },
    { test:/nand/i, replies:["NAND = NON(AND) : sortie=0 seulement quand toutes les entrées sont à 1, sortie=1 sinon."] },
    { test:/nor/i, replies:["NOR = NON(OR) : sortie=1 seulement quand toutes les entrées sont à 0."] },
    { test:/xor|exclusif/i, replies:["XOR (OU exclusif) : sortie=1 si les entrées sont DIFFÉRENTES l'une de l'autre."] },
    { test:/de morgan/i, replies:["Lois de De Morgan : NON(a ET b) = NON(a) OU NON(b), et NON(a OU b) = NON(a) ET NON(b). La barre se distribue et l'opérateur change de nature."] },
    { test:/porte universelle/i, replies:["NAND et NOR sont des portes universelles : n'importe quelle fonction logique peut être réalisée en n'utilisant que des portes NAND (ou que des NOR), grâce aux lois de De Morgan."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : regarde la formule du comparateur.","Indice niveau 2 : quel cas correspond à v+<v− ?","Indice niveau 3 : la sortie sature à −Vsat."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : NAND est la négation de AND.","Indice niveau 2 : dans quel cas AND vaut-il 1 ?","Indice niveau 3 : a=1 et b=1 (NAND vaut alors 0)."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : applique la loi de De Morgan sur NON(a OU b).","Indice niveau 2 : la barre se distribue sur chaque terme.","Indice niveau 3 : l'opérateur OU devient ET : ā·b̄."] }
  ]
};

/* =========================== CHAPITRE 9 — Les quadripôles : représentations matricielles et association =========================== */
ELN_CHAPTERS[elnKey('Les quadripôles : représentations matricielles et association')] = {
  objectives: [
    "Définir un quadripôle et ses quatre variables électriques (V1, I1, V2, I2)",
    "Connaître les quatre représentations matricielles usuelles (impédance Z, admittance Y, hybride H, transfert ABCD)",
    "Calculer gain en tension, impédance d'entrée et impédance de sortie à partir d'une représentation donnée",
    "Choisir la représentation adaptée pour associer des quadripôles en série, en parallèle ou en cascade"
  ],
  prereqs: ["Montages non linéaires, filtres actifs et introduction à l'électronique numérique"],
  bodyHtml: `
    <p>Jusqu'ici, chaque montage (émetteur commun, filtre actif...) a été étudié « à la main », circuit par circuit. Le formalisme du <strong>quadripôle</strong> (ou « réseau deux ports ») permet de traiter n'importe quel circuit linéaire — aussi complexe soit-il à l'intérieur — comme une boîte noire caractérisée par une simple matrice, reliant ses grandeurs d'entrée à ses grandeurs de sortie. C'est l'outil qui permet de caractériser un amplificateur, de mettre en cascade plusieurs étages, ou de modéliser un filtre sans reconstruire son schéma interne à chaque fois.</p>

    <h3>1. Définition et variables d'un quadripôle</h3>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 200 90" width="100%">
          <rect x="60" y="20" width="80" height="50" fill="rgba(76,124,255,0.12)" stroke="#4C7CFF" stroke-width="1.4"/>
          <text x="80" y="50" font-family="IBM Plex Mono" font-size="10" fill="#EAF0FB">Q</text>
          <line x1="10" y1="30" x2="60" y2="30" stroke="#EAF0FB" stroke-width="1.2"/>
          <line x1="10" y1="60" x2="60" y2="60" stroke="#EAF0FB" stroke-width="1.2"/>
          <line x1="140" y1="30" x2="190" y2="30" stroke="#EAF0FB" stroke-width="1.2"/>
          <line x1="140" y1="60" x2="190" y2="60" stroke="#EAF0FB" stroke-width="1.2"/>
          <text x="12" y="24" font-family="IBM Plex Mono" font-size="8" fill="#E8A93A">I1 →</text>
          <text x="12" y="80" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">V1</text>
          <text x="150" y="24" font-family="IBM Plex Mono" font-size="8" fill="#2DD4C4">→ I2</text>
          <text x="165" y="80" font-family="IBM Plex Mono" font-size="8" fill="#EAF0FB">V2</text>
        </svg>
        <span>Un quadripôle Q relie linéairement ses quatre grandeurs de bornes : tension et courant d'entrée (V1, I1), tension et courant de sortie (V2, I2)</span>
      </div>
    </div>
    <p>Un quadripôle possède deux « ports » (entrée et sortie), chacun défini par une tension et un courant. Pour un quadripôle <strong>linéaire</strong> (aucune source interne autonome), deux de ces quatre grandeurs suffisent à déterminer les deux autres, via une relation matricielle : c'est le choix de la paire de grandeurs « indépendantes » qui définit la représentation utilisée.</p>

    <h3>2. Représentation impédance (matrice Z)</h3>
    <p>Les tensions sont exprimées en fonction des courants :</p>
    <div class="formula-box">$$\\begin{pmatrix} V_1 \\\\ V_2 \\end{pmatrix} = \\begin{pmatrix} Z_{11} & Z_{12} \\\\ Z_{21} & Z_{22} \\end{pmatrix} \\begin{pmatrix} I_1 \\\\ I_2 \\end{pmatrix}$$</div>
    <p>$Z_{11}$ est l'impédance d'entrée à sortie ouverte ($I_2=0$), $Z_{22}$ l'impédance de sortie à entrée ouverte, $Z_{12}$ et $Z_{21}$ les impédances de transfert (couplage entrée-sortie). Cette représentation est naturelle pour l'association <strong>série</strong> de deux quadripôles.</p>

    <h3>3. Représentation admittance (matrice Y)</h3>
    <p>Les courants sont exprimés en fonction des tensions — la démarche duale de la précédente :</p>
    <div class="formula-box">$$\\begin{pmatrix} I_1 \\\\ I_2 \\end{pmatrix} = \\begin{pmatrix} Y_{11} & Y_{12} \\\\ Y_{21} & Y_{22} \\end{pmatrix} \\begin{pmatrix} V_1 \\\\ V_2 \\end{pmatrix}$$</div>
    <p>Naturelle pour l'association <strong>parallèle</strong> de deux quadripôles.</p>

    <h3>4. Représentation hybride (matrice H)</h3>
    <p>Mélange une entrée en courant et une sortie en tension — le choix le plus utilisé pour caractériser un transistor bipolaire en petits signaux, précisément parce que l'entrée base-émetteur se pilote naturellement en courant et la sortie collecteur-émetteur en tension :</p>
    <div class="formula-box">$$\\begin{pmatrix} V_1 \\\\ I_2 \\end{pmatrix} = \\begin{pmatrix} h_{11} & h_{12} \\\\ h_{21} & h_{22} \\end{pmatrix} \\begin{pmatrix} I_1 \\\\ V_2 \\end{pmatrix}$$</div>
    <p>Pour un transistor bipolaire monté en émetteur commun, on retrouve les paramètres $h_{ie}=h_{11}$ (résistance d'entrée, identifiable à $r_\\pi$ du chapitre 5), $h_{fe}=h_{21}$ (gain en courant, identifiable à $\\beta$), $h_{oe}=h_{22}$ (admittance de sortie, liée à $1/r_o$) et $h_{re}=h_{12}$ (réaction interne, souvent négligeable). Le modèle petits signaux du chapitre 5 est donc un cas particulier de représentation hybride.</p>

    <h3>5. Représentation transfert (matrice de chaîne, ou ABCD)</h3>
    <p>Exprime les grandeurs d'entrée en fonction des grandeurs de sortie (convention $I_2$ sortant) :</p>
    <div class="formula-box">$$\\begin{pmatrix} V_1 \\\\ I_1 \\end{pmatrix} = \\begin{pmatrix} A & B \\\\ C & D \\end{pmatrix} \\begin{pmatrix} V_2 \\\\ -I_2 \\end{pmatrix}$$</div>
    <p>Son intérêt majeur apparaît pour la mise en <strong>cascade</strong> : la matrice de chaîne de l'association de deux quadripôles est simplement le <strong>produit matriciel</strong> des matrices ABCD de chacun, dans l'ordre où ils sont chaînés — beaucoup plus simple que de recombiner des impédances à chaque étage.</p>

    <h3>6. Grandeurs caractéristiques déduites d'une représentation</h3>
    <p>Une fois le quadripôle chargé par une impédance $R_L$ en sortie, on peut extraire, par exemple à partir de la représentation Z :</p>
    <div class="formula-box">$$Z_{in} = Z_{11} - \\frac{Z_{12}Z_{21}}{Z_{22}+R_L} \\qquad\\qquad A_v = \\frac{V_2}{V_1} = \\frac{Z_{21}R_L}{Z_{11}(Z_{22}+R_L)-Z_{12}Z_{21}}$$</div>
    <p>Le terme correctif en $Z_{12}Z_{21}$ traduit le couplage entrée-sortie : si $Z_{12}=0$ (quadripôle « unilatéral », comme un amplificateur idéal sans réaction interne), $Z_{in}=Z_{11}$ simplement — c'est l'hypothèse implicitement faite dans les calculs simplifiés des chapitres précédents.</p>

    <h3>7. Association de quadripôles</h3>
    <table class="mini-table">
      <tr><th>Association</th><th>Condition de mise en œuvre</th><th>Règle de combinaison</th></tr>
      <tr><td>Série</td><td>entrées en série entre elles, sorties en série entre elles</td><td>matrices Z : $Z_{tot}=Z_A+Z_B$</td></tr>
      <tr><td>Parallèle</td><td>entrées en parallèle, sorties en parallèle</td><td>matrices Y : $Y_{tot}=Y_A+Y_B$</td></tr>
      <tr><td>Cascade (chaîne)</td><td>la sortie de A alimente l'entrée de B</td><td>matrices ABCD : $T_{tot}=T_A \\cdot T_B$ (produit matriciel, dans l'ordre)</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Idée clé</span>
      Chaque représentation matricielle est optimisée pour un type d'association précis : choisir la bonne représentation transforme un calcul de circuit potentiellement lourd en une simple addition ou un simple produit de matrices.
    </div>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Un quadripôle linéaire relie ses 4 grandeurs de bornes (V1, I1, V2, I2) par une matrice 2×2, dont le choix dépend de la paire de variables prise comme entrée</li>
        <li>4 représentations : Z (tensions en fonction des courants, adaptée à l'association série), Y (courants en fonction des tensions, adaptée au parallèle), H (hybride, utilisée pour le transistor bipolaire — $h_{ie}\\approx r_\\pi$, $h_{fe}\\approx\\beta$), ABCD (transfert, adaptée à la cascade)</li>
        <li>$Z_{in}=Z_{11}-\\dfrac{Z_{12}Z_{21}}{Z_{22}+R_L}$ : si $Z_{12}=0$ (pas de réaction interne), $Z_{in}=Z_{11}$ simplement</li>
        <li>Association : série → matrices Z s'additionnent ; parallèle → matrices Y s'additionnent ; cascade → matrices ABCD se multiplient</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Additionner des matrices Y pour une association série (c'est l'inverse : Z s'additionne en série, Y s'additionne en parallèle)</li>
        <li>Oublier le terme correctif $Z_{12}Z_{21}$ dans $Z_{in}$ en présence d'une réaction interne non négligeable : $Z_{in}\\neq Z_{11}$ en général</li>
        <li>Multiplier les matrices ABCD dans le mauvais ordre : l'ordre du produit doit respecter l'ordre physique du chaînage (le premier quadripôle traversé à gauche)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Pour associer deux quadripôles en série (entrées en série, sorties en série), la représentation la plus directe à utiliser est :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln9e1" value="wrong"> la représentation admittance Y</label>
          <label class="option"><input type="radio" name="eln9e1" value="right"> la représentation impédance Z</label>
          <label class="option"><input type="radio" name="eln9e1" value="wrong"> la représentation hybride H</label>
          <label class="option"><input type="radio" name="eln9e1" value="wrong"> peu importe, toutes sont équivalentes en pratique</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln9e1','eln9fb1','Correct — pour une association série, les matrices Z s\\'additionnent directement : c\\'est la représentation la plus adaptée.','Quelle représentation permet une simple ADDITION de matrices pour une mise en série ?')">Vérifier</button>
        <div class="feedback" id="eln9fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Dans la représentation hybride H d'un transistor bipolaire en émetteur commun, le paramètre h21 (hfe) correspond à :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln9e2" value="wrong"> la résistance d'entrée base-émetteur</label>
          <label class="option"><input type="radio" name="eln9e2" value="right"> le gain en courant, identifiable à β</label>
          <label class="option"><input type="radio" name="eln9e2" value="wrong"> l'admittance de sortie</label>
          <label class="option"><input type="radio" name="eln9e2" value="wrong"> la réaction interne de sortie vers l'entrée</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln9e2','eln9fb2','Correct — hfe=h21 est le gain en courant du transistor en émetteur commun, identifiable au β du modèle petits signaux du chapitre 5.','Repense au modèle petits signaux du transistor bipolaire (chapitre 5) : quel paramètre y jouait le rôle de gain en courant ?')">Vérifier</button>
        <div class="feedback" id="eln9fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Pour mettre en cascade deux quadripôles (la sortie du premier alimentant l'entrée du second), la matrice de chaîne de l'ensemble s'obtient par :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln9e3" value="wrong"> l'addition des matrices ABCD</label>
          <label class="option"><input type="radio" name="eln9e3" value="right"> le produit matriciel des matrices ABCD, dans l'ordre du chaînage</label>
          <label class="option"><input type="radio" name="eln9e3" value="wrong"> la moyenne des matrices ABCD</label>
          <label class="option"><input type="radio" name="eln9e3" value="wrong"> l'inverse de la matrice ABCD du premier quadripôle</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln9e3','eln9fb3','Correct — c\\'est justement l\\'intérêt de la représentation ABCD : la matrice de chaîne totale est le produit matriciel, dans l\\'ordre physique du chaînage.','C\\'est l\\'intérêt principal de la représentation ABCD, mis en avant dans la section 5 : quelle opération matricielle remplace-t-elle ?')">Vérifier</button>
        <div class="feedback" id="eln9fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Les quadripôles : représentations matricielles et association')] = {
  intro: "Salut, moi c'est Nova ! On est sur les quadripôles : matrices Z, Y, H, ABCD, et leur association. Demande-moi quelle matrice utiliser pour telle association, ou un indice sur un exercice.",
  rules: [
    { test:/matrice z|repr[ée]sentation imp[ée]dance/i, replies:["La représentation Z exprime V1 et V2 en fonction de I1 et I2. Elle est adaptée à l'association SÉRIE de quadripôles (les matrices Z s'additionnent)."] },
    { test:/matrice y|repr[ée]sentation admittance/i, replies:["La représentation Y exprime I1 et I2 en fonction de V1 et V2. Elle est adaptée à l'association PARALLÈLE de quadripôles (les matrices Y s'additionnent)."] },
    { test:/matrice h|repr[ée]sentation hybride/i, replies:["La représentation hybride H mélange entrée en courant et sortie en tension. C'est la représentation naturelle du transistor bipolaire : h11≈rπ, h21≈β (voir chapitre 5)."] },
    { test:/matrice abcd|repr[ée]sentation.*transfert|matrice.*cha[iî]ne/i, replies:["La représentation ABCD (matrice de chaîne) exprime les grandeurs d'entrée en fonction des grandeurs de sortie. Son intérêt : pour une CASCADE de quadripôles, la matrice totale est le PRODUIT des matrices ABCD, dans l'ordre du chaînage."] },
    { test:/association.*s[ée]rie|s[ée]rie.*quadrip/i, replies:["Association série : les matrices Z s'additionnent, Ztot=ZA+ZB."] },
    { test:/association.*parall[eè]le|parall[eè]le.*quadrip/i, replies:["Association parallèle : les matrices Y s'additionnent, Ytot=YA+YB."] },
    { test:/association.*cascade|cascade.*quadrip/i, replies:["Association cascade : les matrices ABCD se multiplient dans l'ordre du chaînage, Ttot=TA·TB."] },
    { test:/zin|imp[ée]dance d.entr[ée]e.*quadrip/i, replies:["Zin=Z11−Z12Z21/(Z22+RL). Si Z12=0 (pas de réaction interne), Zin=Z11 simplement — c'est l'hypothèse implicite des calculs simplifiés vus dans les chapitres précédents."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : quelle représentation s'ADDITIONNE pour une mise en série ?","Indice niveau 2 : ce sont les impédances qui s'additionnent en série (comme des résistances en série).","Indice niveau 3 : la représentation impédance Z."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : repense au modèle petits signaux du chapitre 5.","Indice niveau 2 : quel paramètre y jouait le rôle de gain en courant ?","Indice niveau 3 : h21=hfe correspond à β."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : c'est l'intérêt principal de la représentation ABCD.","Indice niveau 2 : quelle opération matricielle remplace-t-elle ?","Indice niveau 3 : le produit matriciel, dans l'ordre du chaînage."] }
  ]
};

/* =========================== CHAPITRE 10 — Filtres actifs d'ordre supérieur, diagrammes de Bode et gabarits =========================== */
ELN_CHAPTERS[elnKey('Filtres actifs d\'ordre supérieur, diagrammes de Bode et gabarits')] = {
  objectives: [
    "Tracer et interpréter un diagramme de Bode asymptotique (gain en dB, phase) d'un filtre du premier ordre",
    "Relier l'ordre d'un filtre à la pente asymptotique de son gain et à sa sélectivité",
    "Décrire la structure de Sallen-Key d'un filtre actif du second ordre et le rôle du facteur de qualité Q",
    "Comprendre la notion de gabarit et l'introduction aux filtres de Butterworth"
  ],
  prereqs: ["Les quadripôles : représentations matricielles et association"],
  bodyHtml: `
    <p>Le filtre actif passe-bas du premier ordre vu au chapitre 8 n'est qu'un point de départ : la plupart des applications réelles (audio, instrumentation, télécommunications) exigent une sélectivité bien supérieure, obtenue en augmentant l'<strong>ordre</strong> du filtre. Ce chapitre introduit les outils — diagramme de Bode, facteur de qualité, gabarit — qui permettent de spécifier et concevoir un filtre répondant à un cahier des charges précis.</p>

    <h3>1. Rappel : diagramme de Bode d'un filtre du premier ordre</h3>
    <p>Le diagramme de Bode représente le gain en décibels $G_{dB}=20\\log_{10}|A_v(j\\omega)|$ et la phase $\\varphi$ en fonction de $\\log(f)$. Pour le filtre passe-bas du premier ordre du chapitre 8 ($f_c=1/(2\\pi R_2C)$) :</p>
    <div class="formula-box">$$G_{dB}(f) \\approx \\begin{cases} 20\\log_{10}\\left|\\dfrac{R_2}{R_1}\\right| & \\text{si } f \\ll f_c \\quad \\text{(plateau)} \\\\[6pt] G_{dB}(f_c) - 20\\log_{10}\\left(\\dfrac{f}{f_c}\\right) & \\text{si } f \\gg f_c \\quad \\text{(pente −20 dB/décade)} \\end{cases}$$</div>
    <div class="illus-row">
      <div class="illus-item">
        <svg viewBox="0 0 180 90" width="100%">
          <line x1="15" y1="70" x2="170" y2="70" stroke="#EAF0FB" stroke-width="1"/>
          <line x1="15" y1="15" x2="15" y2="70" stroke="#EAF0FB" stroke-width="1"/>
          <path d="M15,30 L80,30 L165,65" stroke="#4C7CFF" stroke-width="1.6" fill="none"/>
          <line x1="80" y1="30" x2="80" y2="70" stroke="#E8A93A" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="65" y="80" font-family="IBM Plex Mono" font-size="7" fill="#E8A93A">fc</text>
          <text x="20" y="26" font-family="IBM Plex Mono" font-size="7" fill="#4C7CFF">plateau (gain constant)</text>
          <text x="95" y="60" font-family="IBM Plex Mono" font-size="7" fill="#2DD4C4">pente −20n dB/décade</text>
        </svg>
        <span>Diagramme de Bode asymptotique : plateau en basse fréquence, pente −20n dB/décade au-delà de fc (n = ordre du filtre)</span>
      </div>
    </div>
    <p>À la fréquence de coupure exacte, le gain réel est inférieur de 3 dB au plateau (d'où l'appellation « fréquence de coupure à −3 dB ») ; l'approximation asymptotique (deux droites) est cependant suffisante pour la plupart des raisonnements qualitatifs.</p>

    <h3>2. Ordre d'un filtre et sélectivité</h3>
    <p>Un filtre d'<strong>ordre $n$</strong> présente, loin de sa fréquence de coupure, une pente asymptotique de $-20n$ dB par décade (pour un passe-bas) ou $+20n$ dB par décade (pour un passe-haut). Plus $n$ est grand, plus la transition entre bande passante et bande atténuée est raide : le filtre est plus <strong>sélectif</strong>, mais aussi plus complexe (davantage de composants réactifs, davantage d'étages).</p>
    <table class="mini-table">
      <tr><th>Ordre</th><th>Pente asymptotique (passe-bas)</th><th>Complexité</th></tr>
      <tr><td>1</td><td>−20 dB/décade</td><td>1 cellule RC, transition douce</td></tr>
      <tr><td>2</td><td>−40 dB/décade</td><td>1 cellule à 2 réactifs (Sallen-Key), transition plus nette</td></tr>
      <tr><td>$n$ (général)</td><td>−20n dB/décade</td><td>souvent réalisé par mise en cascade de cellules du 1er et du 2ᵉ ordre</td></tr>
    </table>

    <h3>3. Filtre actif du second ordre : structure de Sallen-Key</h3>
    <p>La structure de <strong>Sallen-Key</strong> réalise un filtre actif du second ordre à l'aide d'un seul AOP (monté en suiveur ou en non-inverseur à gain modéré) et d'un réseau de deux résistances et deux condensateurs. Sa fonction de transfert générale se met sous la forme canonique :</p>
    <div class="formula-box">$$H(j\\omega) = \\frac{H_0}{1 + \\dfrac{j}{Q}\\dfrac{\\omega}{\\omega_0} - \\left(\\dfrac{\\omega}{\\omega_0}\\right)^2}$$</div>
    <p>où $H_0$ est le gain en bande passante, $\\omega_0=2\\pi f_0$ la pulsation propre (analogue à la fréquence de coupure) et $Q$ le <strong>facteur de qualité</strong>, qui caractérise la forme de la réponse au voisinage de $f_0$.</p>

    <h3>4. Rôle du facteur de qualité Q</h3>
    <table class="mini-table">
      <tr><th>Valeur de Q</th><th>Comportement de la réponse</th></tr>
      <tr><td>$Q < 0{,}5$</td><td>réponse apériodique (équivalente à deux filtres du 1er ordre en cascade, pas de résonance)</td></tr>
      <tr><td>$Q = 1/\\sqrt{2} \\approx 0{,}707$</td><td>réponse « maximally flat » (Butterworth) : la plus plate possible en bande passante, sans surtension</td></tr>
      <tr><td>$Q > 0{,}707$</td><td>résonance : surtension du gain au voisinage de $f_0$, d'autant plus marquée que Q est grand</td></tr>
    </table>
    <div class="key-point">
      <span class="eyebrow">Idée clé</span>
      Le facteur de qualité Q joue, pour un filtre du second ordre, un rôle analogue à celui du facteur de qualité d'un circuit RLC en régime sinusoïdal forcé (vu en Électrocinétique) : il quantifie l'acuité de la résonance autour de la fréquence propre.
    </div>

    <h3>5. Notion de gabarit</h3>
    <p>Un <strong>gabarit</strong> traduit un cahier des charges fréquentiel sous forme graphique : une zone interdite au tracé du gain, définie par exemple par une fréquence de coupure, une atténuation minimale à respecter au-delà d'une certaine fréquence (bande atténuée), et une ondulation maximale tolérée en bande passante. Concevoir un filtre consiste alors à trouver l'ordre et la structure qui font passer la courbe de gain <strong>en dehors</strong> de la zone interdite, avec la plus faible complexité possible.</p>

    <h3>6. Introduction aux filtres de Butterworth</h3>
    <p>Le filtre de <strong>Butterworth</strong> est conçu pour offrir la réponse la plus plate possible en bande passante (« maximally flat », aucune ondulation), au prix d'une transition moins raide, à ordre égal, qu'un filtre de Chebyshev (qui tolère une légère ondulation en bande passante en échange d'une coupure plus nette). Un filtre de Butterworth d'ordre $n$ se réalise en pratique par la mise en cascade de $\\lfloor n/2 \\rfloor$ cellules de Sallen-Key du second ordre (chacune avec son propre facteur de qualité $Q$, différent d'une cellule à l'autre), plus éventuellement une cellule du premier ordre si $n$ est impair.</p>
  `,
  extraHtml: `
    <div class="recap-box">
      <span class="eyebrow">✦ L'essentiel à retenir</span>
      <ul>
        <li>Diagramme de Bode : gain en dB $=20\\log_{10}|A_v|$, pente asymptotique $-20n$ dB/décade au-delà de $f_c$ pour un filtre passe-bas d'ordre $n$</li>
        <li>Plus l'ordre est élevé, plus le filtre est sélectif (transition raide), mais plus il est complexe à réaliser</li>
        <li>Sallen-Key : filtre actif du second ordre à un seul AOP, caractérisé par $f_0$ et le facteur de qualité $Q$</li>
        <li>$Q<0{,}5$ : apériodique ; $Q=0{,}707$ : Butterworth (maximally flat) ; $Q>0{,}707$ : résonance (surtension)</li>
        <li>Un gabarit spécifie une zone interdite (fréquence de coupure, atténuation minimale, ondulation maximale) ; Butterworth privilégie la platitude, Chebyshev la raideur de coupure au prix d'une ondulation</li>
      </ul>
    </div>
    <div class="mistakes-box">
      <span class="eyebrow">⚠ Erreurs fréquentes</span>
      <ul>
        <li>Confondre la fréquence de coupure $f_c$ (filtre du 1er ordre) et la fréquence propre $f_0$ (filtre du 2ᵉ ordre) : au voisinage de $f_0$, la réponse peut présenter une résonance selon $Q$, ce qui n'a pas d'équivalent au 1er ordre</li>
        <li>Croire qu'un ordre plus élevé est toujours préférable : il augmente aussi la complexité (nombre de composants, sensibilité aux tolérances) — le choix résulte d'un compromis dicté par le gabarit</li>
        <li>Oublier que la pente asymptotique de $-20n$ dB/décade n'est qu'une approximation loin de $f_c$ ou $f_0$ : au voisinage immédiat, la courbe réelle diffère (arrondie, éventuellement en résonance)</li>
      </ul>
    </div>

    <div class="exercises">
      <span class="eyebrow">Exercices</span>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 1</span>
        <p class="q">Un filtre passe-bas d'ordre 3 présente, loin de sa fréquence de coupure, une pente asymptotique de :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln10e1" value="wrong"> −20 dB/décade</label>
          <label class="option"><input type="radio" name="eln10e1" value="wrong"> −40 dB/décade</label>
          <label class="option"><input type="radio" name="eln10e1" value="right"> −60 dB/décade</label>
          <label class="option"><input type="radio" name="eln10e1" value="wrong"> −3 dB/décade</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln10e1','eln10fb1','Correct — la pente vaut −20n dB/décade, donc pour n=3 : −60 dB/décade.','Applique la règle générale : pente=−20×n dB/décade, avec n=3.')">Vérifier</button>
        <div class="feedback" id="eln10fb1"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 2</span>
        <p class="q">Un filtre de Sallen-Key du second ordre a un facteur de qualité Q=2. Sa réponse en fréquence présente :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln10e2" value="wrong"> une réponse apériodique, sans particularité</label>
          <label class="option"><input type="radio" name="eln10e2" value="wrong"> exactement la réponse de Butterworth</label>
          <label class="option"><input type="radio" name="eln10e2" value="right"> une résonance, avec une surtension du gain autour de f0</label>
          <label class="option"><input type="radio" name="eln10e2" value="wrong"> un gain nul en toute fréquence</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln10e2','eln10fb2','Correct — Q=2 est bien supérieur à 0,707 : la réponse présente une résonance marquée, avec une surtension du gain près de f0.','Compare Q=2 au seuil de 0,707 : dans quelle catégorie ce Q se situe-t-il ?')">Vérifier</button>
        <div class="feedback" id="eln10fb2"></div>
      </div>
      <div class="exercise-card">
        <span class="eyebrow">Exercice 3</span>
        <p class="q">Par rapport à un filtre de Chebyshev de même ordre, un filtre de Butterworth privilégie :</p>
        <div class="options">
          <label class="option"><input type="radio" name="eln10e3" value="right"> une réponse la plus plate possible en bande passante, sans ondulation</label>
          <label class="option"><input type="radio" name="eln10e3" value="wrong"> la transition la plus raide possible, au prix d'une ondulation</label>
          <label class="option"><input type="radio" name="eln10e3" value="wrong"> un gain toujours supérieur à celui de Chebyshev</label>
          <label class="option"><input type="radio" name="eln10e3" value="wrong"> l'absence totale de fréquence de coupure</label>
        </div>
        <button class="btn btn-primary" onclick="checkAnswerGeneric('eln10e3','eln10fb3','Correct — Butterworth est la réponse \\'maximally flat\\' (aucune ondulation en bande passante), au prix d\\'une transition moins raide que Chebyshev à ordre égal.','Relis la dernière section : quel est le compromis fait par Butterworth, à la différence de Chebyshev ?')">Vérifier</button>
        <div class="feedback" id="eln10fb3"></div>
      </div>
    </div>
  `
};

ELN_NOVA_KB[elnKey('Filtres actifs d\'ordre supérieur, diagrammes de Bode et gabarits')] = {
  intro: "Salut, moi c'est Nova ! Dernier chapitre du module : filtres d'ordre supérieur, Bode, Sallen-Key et gabarits. Demande-moi le rôle du facteur de qualité Q, ce qu'est un gabarit, ou un indice sur un exercice.",
  rules: [
    { test:/bode|gain en db|d[ée]cibel/i, replies:["Le diagramme de Bode trace le gain en dB (=20log10|Av|) et la phase en fonction de log(f). Pour un filtre d'ordre n, la pente asymptotique loin de la coupure est de −20n dB/décade (passe-bas)."] },
    { test:/ordre d.un filtre|s[ée]lectivit[ée]/i, replies:["L'ordre n d'un filtre fixe sa pente asymptotique (−20n dB/décade pour un passe-bas) : plus n est grand, plus la transition entre bande passante et bande atténuée est raide (filtre sélectif), mais plus le filtre est complexe."] },
    { test:/sallen.key/i, replies:["La structure de Sallen-Key réalise un filtre actif du second ordre avec un seul AOP et un réseau de 2 résistances + 2 condensateurs. Elle est caractérisée par sa fréquence propre f0 et son facteur de qualité Q."] },
    { test:/facteur de qualit[ée]|\bq\b.*filtre/i, replies:["Le facteur de qualité Q d'un filtre du 2nd ordre : Q<0,5 → réponse apériodique ; Q=0,707 (1/√2) → réponse Butterworth (maximally flat) ; Q>0,707 → résonance avec surtension du gain autour de f0."] },
    { test:/gabarit/i, replies:["Un gabarit traduit un cahier des charges fréquentiel (fréquence de coupure, atténuation minimale, ondulation tolérée) sous forme d'une zone interdite au tracé du gain : concevoir le filtre, c'est trouver l'ordre/structure qui évite cette zone."] },
    { test:/butterworth/i, replies:["Le filtre de Butterworth offre la réponse la plus plate possible en bande passante (aucune ondulation), au prix d'une transition moins raide que Chebyshev à ordre égal."] },
    { test:/chebyshev/i, replies:["Le filtre de Chebyshev tolère une légère ondulation en bande passante, en échange d'une transition plus raide qu'un Butterworth de même ordre."] },
    { test:/exercice\s*1/i, hint:true, replies:["Pour l'exercice 1 : applique pente=−20×n dB/décade.","Indice niveau 2 : n=3 ici.","Indice niveau 3 : −60 dB/décade."] },
    { test:/exercice\s*2/i, hint:true, replies:["Pour l'exercice 2 : compare Q=2 au seuil 0,707.","Indice niveau 2 : Q=2 est bien supérieur à ce seuil.","Indice niveau 3 : c'est une réponse résonante, avec surtension."] },
    { test:/exercice\s*3/i, hint:true, replies:["Pour l'exercice 3 : relis le compromis fait par Butterworth.","Indice niveau 2 : il privilégie la platitude, pas la raideur.","Indice niveau 3 : réponse la plus plate possible, sans ondulation."] }
  ]
};

/* fusionne le module Électronique dans les registres globaux */
Object.assign(MATH_TOOLS_CHAPTERS, ELN_CHAPTERS);
Object.assign(NOVA_KB, ELN_NOVA_KB);